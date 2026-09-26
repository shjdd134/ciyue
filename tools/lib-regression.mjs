/* 词阅 WordLens —— 回归清单（**只有这一份**）
 *
 * 为什么单独成模块（2026-09-22 晚）：
 * `daily.mjs` 第 5 步与 `release.mjs --full` 原本**各存了一份同样的数组**，
 * 靠一句注释「这份清单与 daily.mjs 第 5 步保持同步」维系。而当晚加了 `memory-test.mjs` 之后，
 * 我只加进了 daily 那份 —— `release --full`（**人工发布入口，真正会被执行到的那一处**）
 * 一声不响地没跑它，输出里连一行都没有。
 * **注释不是同步机制。** 两份清单 = REF §三「同一个概念只能有一把尺子」的又一个反例。
 *
 * 唯一的合法差异是「哪些测试已经在别处跑过」，它是**数据**（见下方 `RELEASE_STEP4_COVERED`），
 * 不是两份手抄的名单。
 */

/** 全量回归清单。顺序即输出顺序。**加测试只改这里一处。** */
export const REGRESSION_TESTS = [
  "content-scope-test.mjs",
  "sentence-alignment-test.mjs",
  "people-test.mjs",
  "recommend-test.mjs",
  "mt-test.mjs",
  "text-test.mjs",
  "classics-test.mjs",
  "audit.js",
  "nav-test.js",
  "deeplink-test.mjs",
  "smoke.js",
  "text-scan.js",
  "sw-test.js",
  "qc-test.mjs",
  "title-test.mjs",
  "cache-version-test.mjs",
  "push-test.mjs",
  "remote-sweep-test.mjs",
  "examples-test.mjs",
  "verify-live-test.mjs",
  "guards-test.mjs",
  "version-test.mjs",
  "doc-numbers-test.mjs",
  "memory-test.mjs",
];

/* ---------- 唯一合法差异：release 第 4 步已覆盖的项 ----------
 * release.mjs 的发布闸门（第 4 步）已经把这两条跑过一遍，`--full` 再跑一次没有额外信息：
 *   version-test.mjs      —— 资源版本号守卫的负向测试（第 4 步「资源版本」）
 *   doc-numbers-test.mjs  —— 文档数字联动校验的负向测试（第 4 步「文档数字」）
 * ★ 这两项**不能不跑**，只是「跑过一次了」。所以它们是「release 侧排除」，不是「从清单里删」：
 *   删掉就等于让 `daily.mjs` 也失去它们。
 * ★ 反过来，`daily.mjs` 侧**故意**不跑 `doc-numbers.mjs`（它硬校验 HANDOFF §0.1 的篇数/句词数，
 *   每日抓到新文章必然改篇数 → 放进去会让 daily 每天判自己失败并回滚）。 */
export const RELEASE_STEP4_COVERED = ["version-test.mjs", "doc-numbers-test.mjs"];

/** `release.mjs --full` 实际要跑的清单 = 全量 − 第 4 步已覆盖。 */
export const releaseList = () => REGRESSION_TESTS.filter(t => !RELEASE_STEP4_COVERED.includes(t));
