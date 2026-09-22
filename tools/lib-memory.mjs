/* 词阅 WordLens —— 记忆体积护栏（唯一一把尺子）
 *
 * `MEMORY.md` 每轮对话都要**整份注入上下文、有硬上限**；超了会**静默截断**（不报错）。
 * 而截掉的恰恰是文件末尾那几节 —— 于是「我读到的」和「文件里有的」不一致，且不自知。
 * 2026-09-21 实测：16,602 字节被截在「四、方法论红线」第 1 条，后面两整节
 * （方法论红线 / 回归与发布）没进上下文，而当轮恰好要动发布流程 —— 那两节正是发布红线。
 *
 * 这个模块只做一件事：**把一个看不见的降级，变成一行看得见的 WARN。**
 * 故意只打印、不计数、不抛错 —— 笔记长度不属于发布内容，发布流程不该因为这个判自己失败。
 * 超限时的动作是「蒸馏」：细节迁 `REFERENCE-mechanics.md`，`MEMORY.md` 只留判据。
 *
 * 为什么两个调用点共用这一个实现：`.workbuddy/` 在 `.gitignore` 里，CI 检出后没有这个目录，
 * `daily.mjs` 在 runner 上自然跳过；`release.mjs` 是**人工发布入口**，是真正会被执行到的那一处。
 * 别在两个脚本里各写一遍同一个判据 —— 那正是 REFERENCE §三 的「同一个概念只能有一把尺子」。
 */
import fs from "node:fs";
import path from "node:path";

/** 字符数上限（硬闸）。超过 = 注入时**静默截断**，截掉的正是文件末尾那几节。
 *  中文按 1 字符计（`String.length` 对 BMP 字符即字符数）。 */
export const MEM_LIMIT = 3500;

/** 蒸馏目标水位 —— **蒸馏的验收标准是「回到这里」，不是「刚过闸」。**
 *
 *  2026-09-22 晚查清「为什么一直满」：闸门只有一档，账面只有「超 / 没超」两态，
 *  于是**「余量 20 字符」与「余量 1,396 字符」在日志里是同一行绿**。
 *  上一次蒸馏（09-22）把 3,595 压到 3,480 —— 距上限只剩 20 字符，
 *  而这里一条红线普遍 60—150 字符 → **下一次往里加一行就必然再次超限**。
 *  所以「修过一次还满」不是没修干净，是**验收标准定在了闸门线上**。
 *
 *  余量 700 ≈ 一轮中等工作日的自然增长（09-21→09-22 是重工作日，约 +1,400/1.5 天）。
 *  留够它，预警才能早于悬崖响。 */
export const MEM_TARGET = 2800;

/** 预警线：到这一档不算「超限」（还没截断），但**已经装不下下一批红线**。
 *  取「余量 ≈ 300 字符 ≈ 两三条红线」—— 到这个水位该先蒸馏再干活。 */
export const MEM_SOFT = 3200;

/** 相对仓库根的位置。`MEMORY.md` 与它旁边的 `REFERENCE-mechanics.md` 是分层关系：
 *  前者是「每轮注入的判据索引」，后者是「按需查阅的细节」。**超限时把细节搬去后者，不是删。** */
export const MEM_REL = path.join(".workbuddy", "memory", "MEMORY.md");

/** 读 `MEMORY.md` 的字符数。文件不存在（CI / 新克隆 / 目录被清）返回 `null`。 */
export function memoryChars(root) {
  const f = path.join(root, MEM_REL);
  if (!fs.existsSync(f)) return null;
  return fs.readFileSync(f, "utf8").length;
}

/**
 * 检查并打印一行结论。返回 `{ chars, limit, target, over, near }`（文件不存在时 `chars: null`）。
 *
 * 三档（**中间那档是 2026-09-22 新加的**，见 `MEM_SOFT` 的说明）：
 *   `over`  超闸门 → 已经被截断，必须蒸馏
 *   `near`  貼上限 → **还没截断**，但下一批红线就会顶过去，先蒸馏再干活
 *   `ok`    正常   → 只报体量
 * 注意 `over` 与 `near` 都打 `⚠` —— 两者都要求动作；区别写在同一行文案里，
 * 因为「已经截断」和「马上要截断」对未来一轮是**同一个后果**。
 *
 * **只打印**：不抛错、不改调用方的失败计数 —— 要不要当失败由调用方自己决定。
 */
export function checkMemorySize(root, { prefix = "" } = {}) {
  const chars = memoryChars(root);
  if (chars === null) {
    return { chars: null, limit: MEM_LIMIT, target: MEM_TARGET, over: false, near: false };
  }
  const over = chars > MEM_LIMIT;
  const near = !over && chars > MEM_SOFT;
  if (over) {
    console.log(`${prefix}⚠ MEMORY.md ${chars} 字符 / 上限 ${MEM_LIMIT}`
      + " —— 超出部分会被静默截断注入。请蒸馏：细节迁 REFERENCE-mechanics.md，只留判据。");
  } else if (near) {
    console.log(`${prefix}⚠ 记忆体积 MEMORY.md ${chars} / ${MEM_LIMIT} 字符`
      + ` —— 距上限仅 ${MEM_LIMIT - chars} 字符，下一批红线就会把它顶过闸门（**现在还没截断**）。`
      + `先蒸馏回目标水位 ${MEM_TARGET} 再干活。`);
  } else {
    console.log(`${prefix}· 记忆体积 MEMORY.md ${chars} / ${MEM_LIMIT} 字符（目标水位 ${MEM_TARGET}）`);
  }
  return { chars, limit: MEM_LIMIT, target: MEM_TARGET, over, near };
}
