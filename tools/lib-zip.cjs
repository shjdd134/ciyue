/* ZIP 直读 / 改名 / 对账 —— 零依赖，只用 node:zlib。
 *
 * ★ 为什么自己写、既不用现成库也不用 python（2026-09-22 真机白屏事故的根因）：
 *   「尺子会把缺陷改写成正常」这件事，在这个仓库里最贵的一次就发生在这里。
 *   python 的 `zipfile` 在 Windows 上会**静默**把条目名里的 `\` 换成 `/`
 *   （ZipInfo 源码原话：ensure paths always use forward slashes as the directory
 *   separator），而 aapt2 在 Windows 上打 `-A <dir>` 时，**子目录路径写的正是反斜杠**
 *   （实测原字节：`617373657473 2f 617373657473 5c 6170702e6a73` = `assets/` + `assets\app.js`
 *   —— 只有 aapt2 自己拼的那层 `assets/` 是正斜杠，往下一律 `\`）。
 *   于是 build-apk.mjs 那条「白名单 98 项一个不缺」的拆包核对**恒绿**：
 *   期望值来自 `planFiles()`（一串正斜杠字符串），实际值被 python 美化成正斜杠，
 *   两边相等，而 APK 里真实的名字是 `assets/assets\app.js`。
 *
 *   后果不是「看着别扭」而是**整壳白屏**：Android 的 AssetManager 按条目名**精确匹配**
 *   （getAssets().open("assets/app.js") 找的是这个名字本身，不会替你换算分隔符），
 *   所以 98 个 assets 里 96 个取不到。只有顶层无分隔符的 `assets/index.html` 能取到
 *   —— 页面因此「加载成功」，而 body 在源文件里本来就是空的、界面全由 app.js 建出，
 *   于是表现为**白屏**：没有报错、没有红字，只有主题背景色。
 *
 *   所以这个模块的铁律只有一条：**读出来是什么就报什么，一个字节都不许改写**。
 *   它替代了原来那条 python 通路，顺带干掉了「本机没有 python → 整条自检静默跳过」
 *   那个洞（跳过 = 白名单守卫当场失效，而构建照样产出正式 APK）。
 *
 * ★ 为什么改名是「原地等长替换」而不是「重写一个 ZIP」：
 *   `\` 与 `/` 都是 1 字节，所以原地改名字不会移动任何数据 —— 于是
 *   ① resources.arsc 的 STORED + 4 字节对齐原样保留（Android 11+ 的硬要求，重压即崩）；
 *   ② zipalign 的成果不会被破坏（改名发生在 zipalign **之后**、签名**之前**）；
 *   ③ 不需要重算中央目录里的 local header 偏移。自己重写 zip 容器则三条全丢。
 */

"use strict";
const zlib = require("node:zlib");

const SIG_LFH = 0x04034b50;   // local file header
const SIG_CDH = 0x02014b50;   // central directory header
const SIG_EOCD = 0x06054b50;  // end of central directory
const EOCD_MIN = 22;
const MAX_COMMENT = 0xffff;
const BACKSLASH = 0x5c;
const SLASH = 0x2f;

/** 从尾部找 EOCD。注释区最长 65535，所以只回看这么多 —— 越界回看会把 zip 内部
 *  某个恰好等于签名的 4 字节当成 EOCD（假锚点），后续偏移全乱。 */
function findEocd(buf) {
  const lowest = Math.max(0, buf.length - EOCD_MIN - MAX_COMMENT);
  for (let i = buf.length - EOCD_MIN; i >= lowest; i--) {
    if (buf.readUInt32LE(i) === SIG_EOCD) return i;
  }
  throw new Error("不是 ZIP：整个尾部都没有 EOCD 签名");
}

/** 读中央目录，交出**原始**条目名（Buffer 形式给改名用，字符串形式给对账用）。
 *  任何字段越界一律抛错 —— 抛错好过猜，猜出来的名字会让守卫变成假绿。 */
function readEntries(buf) {
  const eocd = findEocd(buf);
  const total = buf.readUInt16LE(eocd + 10);
  const cdSize = buf.readUInt32LE(eocd + 12);
  const cdOff = buf.readUInt32LE(eocd + 16);
  /* Zip64 用 0xFFFF / 0xFFFFFFFF 当哨兵。本项目 APK 106 条目、11MB，永远走不到这里；
     真要走到了必须当场说清，不能按 32 位读出一个荒谬的偏移然后「恰好」解析出一堆垃圾。 */
  if (total === 0xffff || cdSize === 0xffffffff || cdOff === 0xffffffff) {
    throw new Error("ZIP64 归档：本模块只处理非 Zip64，别静默按 32 位读");
  }
  if (cdOff + cdSize > buf.length) {
    throw new Error(`中央目录越界：off ${cdOff} + size ${cdSize} > 文件 ${buf.length}`);
  }
  const entries = [];
  let p = cdOff;
  for (let k = 0; k < total; k++) {
    if (p + 46 > buf.length) throw new Error(`第 ${k} 条中央目录记录越界（偏移 ${p}）`);
    if (buf.readUInt32LE(p) !== SIG_CDH) throw new Error(`第 ${k} 条中央目录签名不对（偏移 ${p}）`);
    const method = buf.readUInt16LE(p + 10);
    const crc = buf.readUInt32LE(p + 16);
    const csize = buf.readUInt32LE(p + 20);
    const usize = buf.readUInt32LE(p + 24);
    const fnLen = buf.readUInt16LE(p + 28);
    const efLen = buf.readUInt16LE(p + 30);
    const cmLen = buf.readUInt16LE(p + 32);
    const lho = buf.readUInt32LE(p + 42);
    const nameBytes = buf.subarray(p + 46, p + 46 + fnLen);
    entries.push({
      /* name 是**原样**解码的字符串。utf8 对 ASCII 名（本仓库全是）与带 UTF-8 标志位的
         名字都正确；极端情况下（无标志位的 GBK 名）会解出替换符 —— 但那种名字本来就
         取不到，而且会在下面的反斜杠 / 白名单对账里露出来，不会被吞掉。 */
      name: nameBytes.toString("utf8"),
      nameBytes,
      method, crc, csize, usize, lho,
      cdNameOffset: p + 46,
    });
    p += 46 + fnLen + efLen + cmLen;
  }
  if (p > cdOff + cdSize) throw new Error("中央目录解析越界：记录长度之和超出 cdSize");
  if (entries.length !== total) throw new Error(`条目数不符：EOCD 说 ${total}，实读 ${entries.length}`);
  return entries;
}

/** 本地头里的那一份名字。ZIP 把名字存两遍（本地头 + 中央目录），Android 读的是中央目录
 *  那一份，但改名必须**两份一起改** —— 只改一份会得到一个自相矛盾的归档，
 *  某些严格的校验器（含 apksigner 的完整性检查）会直接拒绝。 */
function lfhName(buf, entry) {
  const at = entry.lho;
  if (at + 30 > buf.length || buf.readUInt32LE(at) !== SIG_LFH) {
    throw new Error(`条目 ${entry.name} 的本地头签名不对（偏移 ${at}）`);
  }
  const fnLen = buf.readUInt16LE(at + 26);
  return buf.subarray(at + 30, at + 30 + fnLen);
}

/** 取条目内容（method 0 = STORED 直取，8 = deflate 解压）。 */
function readEntryData(buf, entry) {
  const at = entry.lho;
  const efLen = buf.readUInt16LE(at + 28);
  const fnLen = buf.readUInt16LE(at + 26);
  const start = at + 30 + fnLen + efLen;
  const raw = buf.subarray(start, start + entry.csize);
  if (raw.length !== entry.csize) throw new Error(`条目 ${entry.name} 的数据被截断`);
  let data;
  if (entry.method === 0) data = Buffer.from(raw);
  else if (entry.method === 8) data = zlib.inflateRawSync(raw);
  else throw new Error(`条目 ${entry.name} 的压缩方式 ${entry.method} 不支持（只支持 0/8）`);
  if (data.length !== entry.usize) {
    throw new Error(`条目 ${entry.name} 解压后长度不符：${data.length} vs 记录的 ${entry.usize}`);
  }
  return data;
}

/** 按名字取内容；取不到返回 null（调用方自己决定这是不是问题）。 */
function readEntryByName(buf, name) {
  const e = readEntries(buf).find(x => x.name === name);
  return e ? readEntryData(buf, e) : null;
}

/** 原地把条目名里的 `\` 改成 `/`（本地头与中央目录两份都改）。
 *  ★ 只改名字区间内的字节，绝不全文替换 —— 压缩数据里完全可能合法地出现 0x5C。
 *  返回 {fixed, names}；fixed 是改掉的反斜杠个数（0 表示上游已经是对的，不是错）。 */
function normalizeEntryNames(buf) {
  const entries = readEntries(buf);
  let fixed = 0;
  for (const e of entries) {
    const lfh = lfhName(buf, e);
    if (!lfh.equals(e.nameBytes)) {
      throw new Error(`条目 ${e.name} 的两份名字不一致（本地头 ${lfh.length}B / 中央目录 ${e.nameBytes.length}B）`
        + "：先查清楚是谁写坏的，别在这上面继续动刀");
    }
    for (let i = 0; i < e.nameBytes.length; i++) {
      if (e.nameBytes[i] !== BACKSLASH) continue;
      e.nameBytes[i] = SLASH;
      lfh[i] = SLASH;
      fixed++;
    }
  }
  return { fixed, names: entries.map(e => e.name) };
}

/** 产物对账：反斜杠 + 两份名字一致 + 白名单（缺 / 多）。
 *  这是**判据本体**，不是辅助函数 —— audit.js 拿合成 zip 直接喂它，
 *  所以「喂一个含反斜杠的归档进来，它必须报」这件事能被真断言住。
 *  wanted 传 null 则只查归档自身的形状。 */
function auditApk(buf, opts) {
  const o = opts || {};
  const entries = readEntries(buf);
  const names = entries.map(e => e.name);
  const problems = [];

  const bs = names.filter(n => n.indexOf("\\") >= 0);
  if (bs.length) {
    problems.push(`APK 内有 ${bs.length} 个条目名含反斜杠（Android 的 AssetManager 按条目名精确查找，`
      + `一个都取不到）：${bs.slice(0, 3).join("、")}${bs.length > 3 ? " …" : ""}`);
  }

  /* 名字在归档里存两份（本地头 + 中央目录）。Android 读中央目录那一份，所以理论上
     只改一份「也能用」—— 但那是个自相矛盾的归档：严格的校验器会拒绝，而后人再想
     批量改名字时不知道该信哪一份。这里当场拦下，别让它变成下一个「没人敢碰的产物」。 */
  const mismatched = [];
  for (const e of entries) {
    try {
      if (!lfhName(buf, e).equals(e.nameBytes)) mismatched.push(e.name);
    } catch (err) {
      mismatched.push(`${e.name}（本地头读不出：${err.message}）`);
    }
  }
  if (mismatched.length) {
    problems.push(`APK 内有 ${mismatched.length} 个条目的本地头名与中央目录名不一致`
      + `（ZIP 要求两份相同）：${mismatched.slice(0, 3).join("、")}${mismatched.length > 3 ? " …" : ""}`);
  }

  if (o.want) {
    const want = o.want;
    const set = new Set(names);
    const missing = want.filter(f => !set.has("assets/" + f));
    if (missing.length) {
      problems.push(`白名单缺 ${missing.length} 项：${missing.slice(0, 3).join("、")}${missing.length > 3 ? " …" : ""}`);
    }
    /* 反向：壳里出现白名单之外的东西 = 有文件绕过了白名单被打进去（.DS_Store、
       __pycache__、某天新增的调试文件…）。白名单的意义就是「只允许这些」。 */
    const extra = names.filter(n => n.startsWith("assets/") && !want.includes(n.slice("assets/".length)));
    if (extra.length) {
      problems.push(`APK 里有白名单外 ${extra.length} 项：${extra.slice(0, 3).join("、")}${extra.length > 3 ? " …" : ""}`);
    }
  }
  return { entries, names, problems };
}

module.exports = { readEntries, readEntryData, readEntryByName, normalizeEntryNames, auditApk };
