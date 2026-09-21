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

/** 字符数上限。中文按 1 字符计（`String.length` 对 BMP 字符即字符数）。 */
export const MEM_LIMIT = 3500;

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
 * 检查并打印一行结论。返回 `{ chars, limit, over }`（文件不存在时 `chars: null`）。
 * **只打印**：不抛错、不改调用方的失败计数 —— 要不要当失败由调用方自己决定。
 */
export function checkMemorySize(root, { prefix = "" } = {}) {
  const chars = memoryChars(root);
  if (chars === null) return { chars: null, limit: MEM_LIMIT, over: false };
  const over = chars > MEM_LIMIT;
  if (over) {
    console.log(`${prefix}⚠ MEMORY.md ${chars} 字符 / 上限 ${MEM_LIMIT}`
      + " —— 超出部分会被静默截断注入。请蒸馏：细节迁 REFERENCE-mechanics.md，只留判据。");
  } else {
    console.log(`${prefix}· 记忆体积 MEMORY.md ${chars} / ${MEM_LIMIT} 字符`);
  }
  return { chars, limit: MEM_LIMIT, over };
}
