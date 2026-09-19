> 2026-09-17 当前策略：**RSS 采集已全部停用**（足球于本日停采，全部足球文与封面一并撤下），每日自动采集只剩人物审核队列；成长存量保留但 RSS 暂停，AI 与旧明星采集停用。人物明确排除赞达亚。见 [PEOPLE-COLUMN.md](PEOPLE-COLUMN.md)。用户已授权本项目修改验证后直接推送 main。

# 词阅 WordLens — Agent 交接手册

> 本文档写给接手本项目的 AI agent / 开发者。读完这一篇即可独立接管全部日常运维与功能开发。

## 0. 项目定位

**词阅 WordLens**：在线英语精读 App（备考 CET-4），零依赖纯静态 HTML/CSS/JS + Service Worker，手机壳布局。
- **线上**：https://shjdd134.github.io/ciyue/ （GitHub Pages，`shjdd134/ciyue` 仓库 main 分支）

### 0.1 ★ 权威现状（2026-09-19 — **要看现状只读这一节**）

> 🔴 **这张表由 `node tools/doc-numbers.mjs` 校验**：篇数 / 句词数 / 版本 / 词库是硬校验（对不上 `exit 1`）；
> 基线 commit 是**提示项** —— 每次推送都会改写它，而推送清单从不含本文件（文档要人工跟），
> 硬校验它必然红（2026-09-18 实测）。
> 所以：**改数据就必须改这张表**；**想确认这张表没骗人，跑那个脚本，不要读这张表。**

| 项 | 值 |
| --- | --- |
| 文章 | **14 篇 = 成长 4 + 人物 6 + 足球 4** |
| 句子 / 词数 | **3,913 句 / 54,088 词** |
| 封面 | 65 张（本地 `assets/covers/`；远端 blob 总数请跑 `tree-diff`） |
| 发布基线 | `.bak/published.json` = **`d6851176`**（2026-09-18 15:1x，人物批次 20260918-151030 后） |
| 资源版本 | `?v=60` · SW 缓存名 `wordlens-cache-v60` |
| 词库 | **4,082 词**（基础层 2,069 + 核心层 2,013）· 另有**完整四级大纲 4,544 词**（只服务「词汇高亮范围」的档位，不进查词与学习流） |
| 采集策略 | **RSS 采集已全部停用**；每日自动采集只剩人物审核队列（≤1 篇）。成长 RSS 暂停，AI / 旧明星停用 |
| 成长 4 篇 | Dan Koe：`gr-how-to-fix-your-entire-life-in-1-day`；Paul Graham 三篇（`gr-pg-what-youll-wish-youd-known` / `gr-pg-how-to-do-what-you-love` / `gr-pg-how-to-do-great-work`，社区成熟中译本对齐入库，`translationCredit` 署名：lzwjava / 王亮 / untymen.com） |
| 人物 6 篇 | Anne Hathaway + **Icons 5 篇**（Léa Seydoux / Zoey Deutch / Megan Fox / Eva Green / Rachel Weisz，`readingMode:"full"` 原刊全文，均 `review.status:"approved"`，摄影师署名见 `people-reviewed.json` 的 `photoCredit`） |
| 足球 4 篇 | C罗 Madrid: My Story / 德布劳内 Let Me Talk / 皮克 A Long Story / 厄德高 North London Forever（**精翻 + `pin:true`**，pin 是豁免 30 天过期闸的关键） |
| 寓言 | 入口保留，当前为空 |

**「线上现在有什么」永远以远端树为准**（`node tools/tree-diff.mjs`）。本表只是索引 ——
与远端不一致时**以远端为准**，并回来更正本表。**篇数只信 `tree-diff` 与 `.bak/releases/*` 批次快照，任何文档（含本表）都不可信。**

> ⚠️ **2026-09-18 纠正**：本节原写「9 篇 = 成长 6 + 人物 3 · 足球已全部撤下 · 基线 `f1f601e`」——
> 那是 **09-17 16:27 的快照，此后没再更新**，落后了两个批次。更正经过与时间线见 §0.2 末条。

### 0.2 历史更正记录（**只用于溯源，不要当现状读**）

下面是从 2026-09-14 起的逐批更正链，**每条只在写作那一刻正确**，越往下越新。
读的时候**先看日期** —— 例：**「成长 8 篇」是 09-15 深夜 / 09-16 那一刻的状态**，
09-16 深夜下架 2 篇 Ness Labs 落地页之后就是**成长 6**（现在是 9 篇 = 成长 6 + 人物 3）。
保留这段是因为每批的「为什么这么改」有长期价值；**但现状请回到 §0.1**。

- **2026-09-14 晚**（当时的工作树快照）：SW 策略 v43，资源版本号 `?v=46`，词库全库 **4,082 词**（基础层 2,069 + 核心层 2,013），文章 **40 篇**（足球 2、AI 3、成长 11、明星 24 —— 明星已改为历史通道经典专题；寓言入口保留但当时清空）。误执行 `--replace` 后已从远端事故前版本恢复原有 11 篇成长文章及配图。缓存优先 / 1 小时新鲜窗 / 304 协商回落 + 保留上一代缓存作回退；v43 为移除旧背词状态后的发布缓存版本
  > ⚠️ **2026-09-15 晚更正**：本条是 09-14 晚的快照。09-15 用户拍板撤下明星/足球/AI 采集与内容，
  > 随后人物栏目首批 3 篇原刊全线上线 —— **线上当时为 14 篇 = 11 成长 + 3 人物全文**（Anne Hathaway /
  > Charlize Theron / Monica Bellucci），线上资源版本号 `?v=49`。判断"线上现在有什么"请查远端树，不要读本节旧数字。
  > 撤栏目遗留的 40 张孤儿封面与「冲刺/快筛」2 个文件也已清理，本地与远端工作树逐文件零差异。
  > ⚠️ **2026-09-15 深夜再更正（本批次）**：语义层修复批次下架了 3 篇 fs.blog 播客页
  > （brockman / roblox / brad-jacobs，正文只有导语 + Amazon 联盟声明），
  > **线上现为 11 篇 = 8 成长 + 3 人物全文**，远端 171 个 blob，基线 commit `355b59a`。
  > 成长 8 篇＝Dan Koe×4（含 knowledge-base 全文修复）+ More To That×2 + Ness Labs×2。
  > ⚠️ **2026-09-16 更正（本批次 `3ca7dd8`）**：内容层又修了两轮，主题都是「提取器把真正文当垃圾丢掉」。
  > ① `c6a083c` 修 `CODE_JUNK` 缺词边界（`/function\s*\(/` 命中 `dys·function (`，illness 篇 332 字符正文段被当成 JS 丢掉）。
  > ② 本轮 `3ca7dd8` 收全「清单式文档」：`goodListItem` 纯标签闸词数 5→2；`<p>` 短段标点闸放行带分隔符的引导行
  >   （`1. Rivalrous Dynamics` / `Mind 1.0:` / `Life exhibits a fundamental pattern:`）；
  >   新增「标题档」—— `<h1>/<h2>/<h3>/<h4>` 是作者的结构标题，不再套形态闸
  >   （`looksLikeNav` 曾把 `MIND QUADRANT (Upper Left – Interior Individual)` 判成栏目菜单删掉，kb-human30 因此丢了整个 PART I~VI 骨架）；
  >   提取器补扫 `<h1>`，与 `title` 相同的那条跳过（否则正文开头会把文章标题再念一遍）。
  >   **独立口径复核**（6-gram，不 import 项目代码）：kb-human30 缺口 **2,335 词 → 243 词**，剩下的全是导航 / 页脚 / `Encompasses:` 这类极短标签。
  >   14 份原文新旧规则差分：**fs.blog 播客页与 Ness Labs 落地页零变化**（负向测试通过），合计 +623 句 / +2,324 词；`--refill` 两轮补回 617 + 6 句。
  >   **线上 11 篇 = 成长 8 + 人物 3**，**3,255 句 / 41,100 词**（此前 2,632 句 / 38,774 词）；`audit` 186/0 · `qc --all` 11 合格 / 0 拒收。
  >   判断"线上现在有什么"仍以远端树为准，不要读本节旧数字。
  > ⚠️ **2026-09-16 深夜再更正（本批次 `00ae9f4`）**：下架 2 篇 + 又修 4 处正文丢失。
  >   ① **下架两篇 Ness Labs 厂商访谈落地页**（`*-featured-tool`，首句固定 "Welcome to this edition of our Tools for Thought series…"、
  >   末 4 段固定是 Ness Letters 订阅推广）。它们长度够、结尾不带省略号，所有长度/形态闸都放行，
  >   以「成长」常青栏目身份在线。根治规则加在 `staticSkipReason`（候选层，拦未入库的），
  >   `DROP_LIST` 加两条做存量清理；10 张封面由 `publish.mjs` 归档并从远端删除。
  >   ② **`BOILER /\boptimal experience\b/` 误杀真正文** —— 心流理论核心术语。实测 14 份样本里含该短语的段落只有这 1 条，
  >   该规则从未拦过噪声。改为要求与浏览器语境同现。
  >   ③ **`ABBR` 缩写表漏 `i` 标志** → `I.e. A toddler hits when…` 被切成 4 字符残片加丢掉引导词的半句（dankoe 一处 9 遍）。
  >   补 `i` 的同时**必须移除 `No|Nos`**，否则 `no.`（极常见句末词）被当编号保护，`Oh no. Because…` 粘成一句。
  >   ④ **`SENT_MIN` 12 → 2**：12 挡掉的 28 条里 19 条是真内容（访谈短对话 `No.` / `CT: Exactly.` / `[Laughs.]`、Dan Koe 排比 `Get the job.`）。
  >   ⑤ **`splitSentences` 加整段兜底 `SENT_FLOOR`**：段已过 `goodPara`，断句阶段再按长度筛没有段落上下文，整段被删空等于把自己升级成「筛段落」。
  >   **线上现为 9 篇 = 成长 6 + 人物 3，56 张封面，2,963 句 / 36,216 词**（此前 11 篇 / 3,255 句 / 41,100 词）；
  >   `audit` 186/0 · `qc --all` 9 合格 / 0 拒收 · `text-test` 12/12 · `verify-live` 15/0 · `tree-diff` 零差异。
  >   独立口径复核：kb-human30 缺口 2,335 → **0 词**，全库剩余「句」类缺口 12 条**全是订阅框 / 评论区 / newsletter 推广**，正文零缺失。
  >   **验收正文完整性请用 `tools/audit-coverage.mjs`**（已从 `.tmp/` 固化进 `tools/`，6-gram，不 import 项目代码，原文按 url 现抓 + 缓存）。
  > ⚠️ **2026-09-17 语义审校修复批次**：一轮外部审校报告的复核 + 修复，主题是「**译名方向、重复句、凭空注入的专名**」。
  >   ① **Mother Mary 译名方向反转** —— `term-glossary.json` 原把 A24 影片 *Mother Mary*(2026) 译成《母亲玛丽》，**方向错了**：
  >   通行中文名是《圣母玛利亚》（百度百科该词条「中文名：圣母玛利亚」、豆瓣 subject 36323221；「魅影巨星」是中国台湾译名）。
  >   规则已反转（并去掉 `art` 限定，新文章同样受益），Anne 篇 8 处《母亲玛丽》→《圣母玛利亚》。
  >   **教训（双向）**：专名只能查外部通行译名 —— 那次外部报告靠「描述推理」误报 2 条片名，我靠「默认自己的规则正确」误判了这 1 条，**两边都不能靠推理**。
  >   ② **Channel 规则补漏**：原规则只写 `渠道→通道`，漏了 `频道→通道`（实测漏 3 处，且同篇 #66 又译「通道」＝自相矛盾）。
  >   现一并覆盖 + `unless:"Criterion"`（Anne 篇 `Criterion频道` 是指频道名，必须保留）。**写术语规则要枚举该词的全部错译写法，别只修当时撞见的那一个。**
  >   ③ **删掉凭空注入的《黑客帝国》**：map 篇原文只有 `glitch in the matrix`，译文却加进《黑客帝国》并把 matrix 重定义为「第一/二层的边界」。
  >   ④ **删 8 条重复句**（Monica 6 + Anne 2，含「这位于」那对）：来自 09-15 那次 `--refill` 的 LCS 对齐栽在「同内容不同形状」上。
  >   **2,963 → 2,955 句**；删句会让 F4 闸门失效，`sourceTextWords` 必须同步重算（Anne 3,637→3,623、Monica 1,063→915）。
  >   ⑤ **新增两条守卫 + 负向测试，已进 `daily.mjs` 第 5 步（回归现 20 项）**：
  >   `audit-dups.mjs`（重复句，白名单 `dup-allowlist.json` 12 组 = 10 组 Dan Koe 跨篇页脚 + 2 组 kb 作者有意重复）；
  >   `audit-cn-titles.mjs`（每个《X》必须登记在 `title-map.json` 且**同句英文里有出处**，缺登记＝「未登记」、有登记无出处＝「疑似注入」）；
  >   `guards-test.mjs` **6/6** 负向测试通过（守卫被证明「会响」才可信）。
  >   **两个踩坑记录（写守卫时踩的）**：判重复句必须先把段落的**两种形状**都压平 —— 数据里既有 `{sentences:[{en,cn}…]}` 又有单句段直接 `{en,cn}`（9 篇里 291 句是单句段），
  >   只遍历 `p.sentences` 会静默漏检，重复组数从 8 涨到 20；归一化顺序必须是**引号 → 去标点 → 合并空白**，顺序反了会把 `Bacall , Joan` 变成双空格而凭空造出差异（单这一处漏 4 组）。
  >   ⑥ **下架 CI 每日自动采进来的 2 篇足球文**：`ft-manchester-united-…`（21 段里 10 段是 FourFourTwo 会员/订阅推广模板）、
  >   `ft-arsenal-report-…`（正常转会报道）。按用户决定撤下，线上回到 **9 篇 = 成长 6 + 人物 3**，**2,955 句 / 36,044 词**。
  >   ⑦ **推前必读**：远端 main 可能已被 CI 的 daily 提交推前（48 张封面重抓、`data-source-health.js`、`.mt-cache.json`、`data-article-metrics.js`）。
  >   **这几类属于 CI 自己的产物，本地不要推**，否则会把 pipeline 的新输出回退；`data-article-metrics.js` 例外 —— 正文一改就必须本地重跑 `build-article-metrics.mjs` 再推。
  > ⚠️ **2026-09-17 足球栏目停采 + 存量撤下（紧接上一条）**：足球 RSS 是最后一条还在跑的 RSS 通道，本日停用。
  >   ① **根因层**：`tools/ingest.mjs` 的 `FEEDS` **清空**。数组为空不是错误 —— `main()` 会在
  >   「没有进入候选池的文章」处正常退出（实测 `exit 0`）。
  >   **停采理由（实测，不是口味）**：同一来源好坏混杂。`ft-manchester-united-…`（FourFourTwo）正文 21 段里
  >   **前 10 段全是会员/订阅推广模板**（"Fancy some of this?" / "Your membership journey starts here." /
  >   "Quick quizzes for football fans." / "Explore your membership benefits." …），只有第 11~21 段是报道；
  >   而同批的 `ft-arsenal-…` 是正常转会报道。**整句级推广对长度闸/形态闸完全免疫**，只能事后质检剔。
  >   ② **配置层**：`tools/daily.mjs` 撤掉 `--quota 足球=2`。**保留 `ingest.mjs --append` 调用** ——
  >   它是唯一会写 `data-source-health.js` 的入口（`saveSourceHealth()` 挂在 `job.then()` 上，总会执行），
  >   停采后正需要它把足球来源从健康度里剪掉。
  >   ③ **健康度改为跟随 FEEDS**：`ingest.mjs` 新增反向剪枝 —— `loadSourceHealth()` 会把文件里**全部历史条目**
  >   读进来，原先只有「FEEDS 有的就补上」的加法，于是停采的源永远留在文件里（实测残留 **18 条**死源）。
  >   现在维持「健康度条目 == 当前配置来源」这个不变式，`data-source-health.js` 从 14KB 收敛为
  >   `const DATA_SOURCE_HEALTH = {}`。**安全性**：应用侧 `index.html` / `app.js` / `sw.js` **完全不读**这个文件，
  >   它只是抓取通道的运行状态，不参与任何内容展示。
  >   ④ **存量撤下**：线上 2 篇足球文已随上一批数据推送撤下；这 8 张足球封面本批由 `publish.mjs` 判为孤儿
  >   （`remotePruned: 8` / `remoteKept: 0`）并从远端删除 —— 上一批它们还是「保留」侧，因为当时远端文章仍在引用。
  >   ⑤ **守卫反转（防误加回来）**：`content-scope-test.mjs` 原断言「每日 RSS 只能配足球」→
  >   改为「**FEEDS 必须为空**」+「daily 不得再传 `--quota`」，仍是 **10 项断言全过**。
  >   `spot-check.mjs` 默认抽样从「足球 2 + 人物 1」改为「人物 1」。
  >   ⑥ **文档同步**：`README` 首行 / 内容栏目 / 数据来源（新增「足球为何停采」段）/ daily.yml 段，
  >   与 `ingest.mjs` 的 `FEEDS` 注释、`writeExtra` 头注释、`MAX_INLINE_IMG` 注释。
  >   **线上仍为 9 篇 = 成长 6 + 人物 3，2,955 句 / 36,044 词；封面 56 张**（远端 64 → 56）。
> ⚠️ **2026-09-18 更正（文档层，无代码 / 数据改动）**：§0.1 的「权威现状」表在 09-17 16:27 之后**没再更新**，
>   仍写「9 篇 = 成长 6 + 人物 3 · 足球已全部撤下 · 基线 `f1f601e`」，而实测早已是
>   **6 篇 = 成长 1 + 人物 1 + 足球 4 · 基线 `46648a2`**。**这不是数据错，是文档落后了两个批次。**
>   实测时间线（`.bak/releases/*/before/assets/data-articles-extra.js` 批次快照 —— 全仓库最硬的证据，
>   每批 publish 都会把变更前状态整棵存下来）：
>   ```
>   16:17–16:39  9 篇（成长 6 + 人物 3）
>   16:40–16:57  2 篇   ← 另一 agent 奉用户命「删正文与图片」，用户确认（.workbuddy/memory/2026-09-17.md 第 9 轮）
>   19:38        6 篇   ← 足球四篇精翻 --inject 上线（带 pin:true，豁免 30 天过期闸）
>   19:40        推送 46648a2，verify-live 15/0 全绿
>   ```
>   **6 篇是用户逐批确认的结果，不是事故** —— 足球四篇上线时用户当场问过「怎么是六篇」并接受了解释。
>   → **教训：篇数只信 `tree-diff`（GitHub API 比全仓库）与批次快照；文档表格会漂移，而漂移此前没有任何机制报警。**
>   本轮补上这个机制（三个新工具，未改动任何业务数据）：
>   · `tools/doc-numbers.mjs` —— 把 §0.1 的篇数 / 句词数 / 版本 / 词库 / 基线做**硬校验**，不一致 exit 1；
>     叙述性文档（README）里的数字只列出来供人工核对，**不自动改写**（改叙述句会制造更难发现的错）。
>   · `tools/version.mjs` —— 资源版本号**五处**单一来源，`--bump` / `--sync` / `--check`。
>   · `tools/version-test.mjs` —— **19 项负向测试**。它当场抓出两处**既有校验的盲区**：
>     `sw.js` 头注释还写着 `（v51，阅读界面改版）`、`app.js:11` 的 `ASSET_VERSION` 回退默认值还写 `"51"`，
>     而 `cache-version-test.mjs` 只查 `caches.open`，两处都不看 —— 所以它们长期没人发现。
> ⚠️ **2026-09-19 词汇学习闭环（代码层，数据零改动，commit `8081648`）**：用户提了一份「阅读驱动型词汇学习器」设计文档，要求照此改造。
>   **先盘家底再动手** —— 实测发现文档里约六成诉求**早已在线**：点击查词卡（轻卡 → 更多两级）、词形还原三段式 `resolveToken()`、
>   CET-4 识别与紫色高亮 `.kw`、生词本、已掌握标记 `.known`、单词发音、读句 / 读全文、按文章的查询计数 `LOOKED`。
>   真正缺的是另一半 —— **语境**与**统计**。本轮补的就是这半边：
>   ① **生词条目升级到 v3**：`{word, addedAt, articleId}` 之外补齐 `srcTitle` / `firstCtx{en,cn}` / `seen` / `lookups` /
>      `lastSeenAt` / `articles[]`。三个历史版本逐级补齐，字符串条目与 v2 对象条目都无损升级。
>      **收藏的那一刻就把「你在哪句话里遇见它」一起存下来** —— 复习时回忆的是语境，不是孤零零一个中文释义。
>   ② **遇词统计 `buildEncounter()` + `recordEncounters()`**：渲染正文前扫全文，统计每个学习词在本篇出现几次、首见是哪一句。
>      **幂等键是本篇文章 id（存进条目的 `articles[]`）** —— 切字号 / 标认识 / TAP 词表异步到达引发的重渲染都不会把 `seen` 越加越高。
>      只统计**已在生词本里**的词，localStorage 不会随文章数膨胀。
>   ③ **正文三态标色**，优先级 `已知 .known` > `生词 .wb` > `四级词 .kw`：
>      四级词是紫色字（考试会考），生词是琥珀色块（我不会），已掌握退回灰色常规。本篇出现 ≥2 次的生词点一个小圆点 `.rep`。
>      **只有自己收藏的词才配底色** —— 一篇文章 30% 的字都是彩色就是干扰，不是帮助。
>   ④ **查词卡显示「本句含义」**：词典义之外再给语境义（原句 + 译文，句中目标词标色）；生词卡显示「遇到 N 次 · 查询 M 次 · 来自 K 篇」，
>      展开卡给「第一次遇到」的原句 —— 这就是**多语境重复暴露**。生词卡主按钮换成「我已认识」，不再是「加入生词本」。
>   ⑤ **记词本升级为「我的词汇」**：今日概览三格（新增 / 学习中 / 已掌握）+「需要重点学习」（查过 ≥2 次或遇到 ≥3 次，按查询次数降序）。
>      「遇到 9 次却查了 6 次」才是真正卡住人的词，这比随机推 20 个四级词合理得多。
>   ⑥ **阅读设置新增两组**：四级词高亮开 / 关、朗读口音美 / 英。**关高亮只关四级词的紫字，生词色保留** ——
>      生词是读者自己一个个收的，那是「我的标记」，不该被一个总开关一起抹掉。
>   ⑦ **两个决定不做**：**IndexedDB 不迁移**（localStorage 单状态机是全 app 核心，几千条 ~1MB，远没到 5MB 上限，
>      换 IDB 要把所有状态读写重写一遍，是纯负债）；**Anki 式间隔重复不做**（过度开发，用户文档自己也反对）。
>   ⑧ **守卫 +20 条（`audit.js` 186 → 206）**，每条都配了反例方向。负向测试实测：
>      把 `wb = !known && inNotebook(k)` 的 `known` 去掉 →「已掌握压过生词」精确变红；
>      把 `item.articles.includes(a.id)` 幂等检查去掉 →「记账幂等」精确变红。**守卫被证明会响才算数。**
>   ⑨ **顺手修掉 2 条既有的假红守卫**：`ok(... , S.notebook.includes("perform"))` 与把 `S.notebook` 塞成字符串数组的那两处，
>      断言的是 notebook **存字符串**的旧契约，而 notebook 早已迁移到对象 —— 对对象数组做 `includes(字符串)` 恒为 false，
>      这两条从迁移那天起就在假红（`renderArticleNotebookSheet` 读的是 `item.word`，测试却塞字符串 → 得到 `"undefined"`）。
>      **教训：改数据结构时，断言里的形状也要跟着改，否则守卫变成「永远报警」或「永远沉默」，两种都是失效。**
>   ⑩ **迁移里顺手抓到一个真缺陷**：`normalizeState` 不去重，重复条目会让「移出生词本」删不干净
>      （`nbItem()` 只取第一条，删掉后第二条又冒出来）→ 改为按 `word` 保留最先出现的那条。
>   ⑪ 版本 `v54 → v55`（五处联动）；`release.mjs --full` 全绿（20 项回归）；`audit` 206/0；推 7 个文件（纯 `--files` 路线，无数据变动）。
>
> ⚠️ **2026-09-19 词汇系统收紧（同日稍晚，commit `e4ac8a9`）**：上一轮的方向被否掉一半 ——
>   「不要再扩展统计学习行为」。核心目标收紧成一句话：**高亮可控、查词覆盖广、生词保存轻**。
>   ① **删掉整套遇词统计**：`ENCOUNTER` / `buildEncounter()` / `recordEncounters()` 全部移除，生词条目 v3 → v4
>      `{word, addedAt, articleId, articleTitle, context{en,cn}}`，`seen` / `lookups` / `lastSeenAt` / `articles` 一并丢弃；
>      词汇页的「需要重点学习」「今日概览三格」也删掉，只剩「生词 / 已认识」两个 Tab。
>      那些数字回答不了「这个词是什么、我当时在哪个语境不会」，留着只让系统越来越复杂。
>   ② **高亮从布尔量升级为四档**：`S.kwHighlight` → `S.highlightMode`（`off` / `core` / `cet4` / `all`），
>      旧布尔量按「显示 = core / 隐藏 = off」映射；阅读设置里带一行档位说明。
>   ③ **词表补上完整的第四层**：新建 `assets/data-words-cet4.js`（4,544 词，源自 `tools/.examples-cache/cet4.jsonl`
>      —— 它就是 `build-core-vocab.mjs` 注释里那个「4454 词完整考纲」的源），只服务「全部四级」档。
>      实测「仅大纲独有」1,551 词里 1,516 个 TAPDICT 已可查。
>   ④ **最重要的一处：把高亮与查词彻底解耦** —— 修掉一个影响正文 16% token 的真缺陷。
>      旧实现让 `KW_TRIE` 同时承担高亮过滤（`STOPWORD_HIGHLIGHT` + 长度 < 4）与查词入口，
>      于是 work / get / know / one / life 这批词**两头落空**：既被过滤表挡在 trie 外，
>      又因为是「学习词」被 TAPDICT 的排除表剔除 → 正文里点了没反应。
>      实测修复前点词覆盖率 **83.98%**（54,088 token 中 8,663 个点不动），缺口 Top25 全是最高频的词。
>      现在 trie 只回答「能不能点、点开查什么」，染色由 `highlightSet()` + `isHighlightable()` 单独决定。
>   ⑤ **新增文章级补充词典** `assets/data-articles-words.js`（116 词 / 9.6KB，`tools/build-articles-words.mjs` 生成）：
>      ECDICT 对纯功能词与缩写常常没有语料词频（frq=0），而 `build-tapdict.mjs` 要求 frq 落在 1..50000，
>      `if (!frq) return` 把 are / an / don't / you're / i'm / were 整片丢掉 —— 它们恰是正文里最高频的一类。
>      本层**按文章语料定向补齐**，不放宽全库口径。剔除专名用了双重判据：`isProperNoun` + 「全篇只以大写过」
>      （Anne / Audrey / Barcelona 常常整篇都在句首，前者对句首大写无能为力 —— 首次生成就漏进 3 个人名）。
>      **实测点词覆盖率 84% → 94%（解耦）→ 97.1%（补词）**，余下 2.9% 是专名与拼写怪词，本就该点不动。
>   ⑥ **正文一律可点、但视觉零噪声**：取消 `.kw` / `.tw` 两套 span，统一为基类 `.word`（只给 `cursor: pointer`
>      与悬停反馈），高亮 / 生词 / 已认识都是**附加**类。⚠️ 样式必须写 `.word.wb` —— 三态在 JS 侧互斥（`known > wb > kw`），
>      生词只带 `word + wb`，写成 `.kw.wb` 一条都匹配不上（旧版看着有效，是因为那时生词也挂了 `.kw`）。
>   ⑦ **生词只存短语境**：新增 `clipContext()` —— 句子 ≤ 22 词整句留，更长的裁到目标词前后各 7 词、两端加省略号。
>      **中文译文不跟着裁**：机器翻译按句产出、没有词级对齐，截一半中文只会得到看不懂的半句。
>   ⑧ **查词卡标题显示原文词形**（点 adopted 就显示 adopted），原形只作副行（`原形 adopt · /əˈdɒpt/`）——
>      标题换成词元会让人以为自己点错了。
>   ⑨ **「已掌握」全局改名「已认识」**：没有测试机制支撑「掌握」这个判断，名实要对得上。
>   ⑩ **守卫重做完（`audit.js` 206 → 219）**，新增的强守卫有两条值得记：**点词覆盖率 ≥ 90%**（不依赖任何实现细节，
>      哪一层断掉都会掉数）与**档位单调性**（仅大纲独有词 core 不亮 / cet4 亮；不在大纲的中学词 cet4 不亮 / all 亮）。
>      三条负向测试实测：STOPWORD 过滤塞回 trie → 解耦断言 + 覆盖率**精确变红**（97.1% → 87.1%）；
>      cet4 档取成 `CORE_SET` → 档位断言**精确变红**；去掉截取的长度判断 → 截取断言**精确变红**。
>      另修掉一条**假红守卫**：`.kw.wb` 的 CSS 断言被自己注释里的反例文字顶红 → 断言前先剥掉 CSS 注释（断言该查规则，不该查注释）。
>   ⑪ 版本 `v55 → v56`（五处联动 + 新增两个 script 标签）；`release.mjs --full` 全绿（20 项）；推 11 个文件（纯 `--files` 路线，无数据变动）。
>      ⚠️ 新增数据文件后，`tools/.gitignore` 与 `SNAPSHOT_FILES` **均未改动** —— 这两个文件随首屏加载，属于代码而非批次数据。
>   ⑫ **高亮档位搬到「···」阅读工具面板 + 立下「档位 ↔ 学习记录」边界**（同日第二轮，`audit.js` 219 → 227）：
>      四档从横排 seg 改成**竖排单选**（每档带一句「什么时候该用它」，横排四段塞不下说明文字），
>      并**两处入口共用同一套 markup**（`hlModeList()`）——「Aa 阅读设置」与「··· 阅读工具」；
>      `syncReadSettingsSheet()` 的选择器同步扩到 `.rd-seg, .hl-opt`（只认一种 → 另一处入口点了像没反应）。
>      ★ 定下红线：**切档只改 `S.highlightMode`，绝不触碰 `S.known`**。
>      「词库是系统给你的分类，已认识是用户自己的学习记录；系统分类可以变，用户记录不能跟着丢」——
>      否则用户标了几百个词，换个档位全被重新点亮。已认识**压过生词**也压过高亮：一个词可以同时在
>      生词本（保留语境原句）和已认识列表里，显示必须听已认识的，否则「标了却没生效」。
>      ★ **修掉一条失效守卫**：原先用 `/class="word kw"/` 子串匹配判高亮，只在元素恰好只有
>      `word + kw` 两个类时成立；把高亮表达式里的 `!known && !wb` 删掉后真实类名变成 `word known kw`，
>      子串匹配不上 → 守卫**假绿**（负向测试实测漏报）。改成定位本词 span 取 class 再 split 成 token 判 `kw`。
>      **教训：判 CSS 类要用 token，不要用子串 —— 类的个数会变，子串不会跟着变。**
>      四条负向测试全部精确报红：切档时顺手清 `known` / 高亮表达式去掉 known 压制 /
>      同步选择器漏掉 `.hl-opt` / 选中态圆点规则改名。版本 `v56 → v57`。
>
> ⚠️ **2026-09-19 中文对照改为三档（同日第三轮，`audit.js` 227 → 244）**：用户提「中英对应关系不清楚」，
>   但**前提有误** —— 实测 14 篇里 13 篇本来就是句子级对齐（`.sentence` 内联 + 译文紧随句下），
>   唯一「整段式」的 `gr-how-to-fix-your-entire-life-in-1-day` 也只有 3 段真含多句。
>   真正缺的是**档位语义**：旧布尔 `showCn` 只有「逐句显示 / 隐藏」两档，而「隐藏」档点句**必然弹译文**，
>   纯英文读者躲不开中文。
>   ① `S.showCn` → `S.cnMode`（`off` / `tap` / `all`，默认 `tap`）：**off 与 tap 的唯一差别就是点句弹不弹译文**，
>      这也是 off 档存在的全部理由。迁移：旧 `showCn:true → all`、`false → tap`（**绝不是 off** ——
>      老用户从没选过「关闭」，点句突然看不到中文只会以为坏了）。
>   ② 新增**段级「本段对照」按钮**（只在 tap 档渲染：off 档要保持纯英文干净，all 档已全展开）：
>      展开状态存内存 `paraOpen` 集合、按文章重置 —— 段落索引是**临时阅读状态**，不落 localStorage。
>      收起时必须清掉段内残留 `.peek`，否则收完还留一句中文挂着。
>   ③ 译文节点从 `.sentence` **内部**移到**相邻兄弟**：旧写法是 `<span>` 内套块级元素（内容模型违规、
>      读屏把整段中文算进句子按钮的可访问名称、点中文块误触发选句），peek 选择器随之改为 `.sentence.peek + .cn`。
>   ④ 设置面板三档横排 + `rd-hint` 说明；「译」图标改为 `all ↔ tap` 即时开关（**不循环三档**——
>      循环切换在词汇高亮上已经吃过亏：想回上一档得连点，也不知道后面还有几档）。
>   ★ **守卫当场抓到一个真 bug**：容器 class 的三元少写了一层，`all` 档也带 `cn-tap`
>      （实测 off=`fs-0 no-cn cn-off` · tap=`fs-0 no-cn cn-tap` · all=`fs-0 cn-tap` ❌ → 应为 `fs-0`）。
>   ★ **另一条守卫的判据差点写成假的**：结构断言若用 `</span><span class="cn">` 判「译文是兄弟节点」会**假绿** ——
>      `.para-tts` 的闭合标签恰好长这样。必须用 `</span></span><span class="cn">`（两个连续 `</span>`）。
>   ★ 旧守卫 `/<p class="para">/` 因段落新增 `data-pi` 变红 —— 它是**真守卫**（确实抓到了结构变化），
>      改成 `/<p class="para[^"]*"[^>]*>/` 保留判据强度。
>   四条负向测试全部精确报红（off 档也弹译文 / 译文移回子节点 / 收起不清残留 peek / 迁移错映射到 off）。
>   版本 `v57 → v58`。
>
> ⚠️ **2026-09-19 正文排版：朗读喇叭的隐形占位（同日第四轮，`audit.js` 244 → 245 + 修掉一条把 bug 锁死的守卫）**：
>   用户反馈「不显示中文的情况下还是一大段一大段的」。排查三段走完才见真身：
>   ① `.bak/shape-probe.mjs`（真 app.js 沙箱扫段落形状）—— 14 篇 1,095 段里新格式 979 / 旧格式 116，
>      疑似「多句并成 1 句」只有 8 段 → **数据层干净**；
>   ② jsdom 解析渲染结果 —— 213 段 / 373 句、`.cn` 373 个**全是句子的相邻兄弟**、零空段落、
>      `p` 内无块级子元素 → **结构层干净**；
>   ③ Edge 无头截图（`.bak/preview.mjs` + `--headless=new --screenshot`）**才看到真相**：
>      `for my Barça teammates.      But my` —— 每个句子末尾拖着一块约 **27px 的隐形空白**，
>      句子在行末结束时这块空白被折到下一行行首、把首字推开（新段落首行凭空多 27px 缩进）。
>   根因：`.para-tts`（单句朗读喇叭）用 `opacity: 0` 隐藏 —— **opacity 不改变布局**，
>   `22×22 + margin-left:5px` 的盒子照样在流里占位。改成 `display: none`
>   （`.sentence.sel > .para-tts` 才 `display: inline-flex`）；**不做 hover 展开** ——
>   inline 元素突然出现会让整段重排、文字跟着鼠标跑，会抖。
>   ★ 顺手强化选中反馈：`.sentence.sel` 从「7% 透明度背景」（浅色主题下等于没有确认）改成
>   **inset 左边线 + 9% 底纹**。左边线用 `box-shadow: inset` 而非 `border-left` ——
>   border 会把整段文字挤动一次；inline 元素跨行时每个行盒都画到这条线，整句被一根竖线括起来。
>   另加句末 3px 水平留白（inline 的 `padding-right` 只落在最后一行末尾，不像 `margin` 在每行行首重复缩进）。
>   ★★ **本轮最有价值的发现：一条守卫把这个 bug 锁死了。** 原断言是
>   `/\.para-tts\s*\{[^}]*opacity:\s*0/` —— 锁的是**实现手段**而不是**意图**（「默认看不见」）。
>   opacity 与 display 都能表达「看不见」，但只有后者不破坏布局；守卫把前者钉死，
>   等于**禁止了唯一正确的实现**，它自己成了 bug 的保护伞。
>   改成反向锁：断言 `display: none` 且**禁止 `opacity: 0` 回归**（判定前剥注释 —— 注释里就有这个词）。
>   **教训：守卫要断言可观察的意图，不要断言实现细节；锁错细节的守卫比没有守卫更糟。**
>   ★ 过程踩坑：负向测试的 `restore` 把改动抹掉了 —— `styles.ok.css` 是在**改动前**打的备份，
>   名字叫 ok 内容是旧的。**备份只有打在「已验证通过的版本」上才配叫 ok**，否则 restore 就是回滚。
>   两条负向测试精确报红（喇叭回退 opacity 占位 / 拿掉选中句左边线），还原后逐字节一致。
>   版本 `v58 → v59`。
>   后续（`f24b36f`）：把视觉验证能力**版本化** —— 新增 `tools/render-preview.mjs`
>   （真 app.js 沙箱 → 段落形状统计 + 可截图 HTML，含「选中第 1 句」档）。
>   本机没有 playwright / chromium，**配系统 Edge 无头截图是本项目唯一能看到视觉改动的通道**；
>   不版本化就只能活在某台机器的 `.bak/` 里（同 `tools/diff-files.mjs` 的道理）。
>
> ⑭ **2026-09-19 晚 · 正文「一句一行」试点（`v59 → v60`）**
>   用户诉求：**纯英文档的排版要和中文对照档一致** —— 一句一行、句间留白，
>   看不懂的那句点一下才出译文。此前双语档因为每句跟一个块级译文而自然断行，
>   纯英档句子是 inline、整段连排，同一个 App 两种节奏。
>   做法：**只改 CSS**。`app.js` 加 `PARA_FLOW_ARTICLES` 名单 → 名单内文章的
>   `#read-scroll` 多一个 `.para-flow` 类；`styles.css` 在其作用域内把 `.sentence`
>   转块级、句间 `margin-top: 10px`。**句子在 DOM 里仍是内联 `<span>`**，
>   所以不碰任何结构断言（那条「英文按段落连续排版」的守卫不受影响）。
>   - **段距 18px 一个像素都没动**。第一版样张把句距 20px 和段距 30px 一起拉，
>     观感直接散掉（用户原话「隔得空太大了」）—— 段落间距本来没毛病，就不该动。
>     句距一旦逼近段距（试过 16px），读者分不清哪里是新段。
>   - 译文 `.cn` 下边距在试点内归零（`margin: 6px 0 0`）：不归零则「上句译文 → 下句英文」
>     = 10+10=20px，双语档比纯英档松一截，而两档同节奏正是这次要改的东西。
>   - 选中句的左边线在块级盒里会压在首字上 → 用 `margin-left:-10px` + `padding-left:10px`
>     做装订线（文字逐字不动）。跨行的句子左边线是一条贯穿竖线，比 inline 时代更完整。
>   - 试点范围由 `PARA_FLOW_ARTICLES`（当前 1 篇：`fb-gerard-pique-a-long-story`）控制，
>     **铺开 = 加 id，撤回 = 清空**。
>   - **顺手修了预览工具的一个真缺陷**：`tools/render-preview.mjs` 原先自己手搓容器
>     class（复制了 app.js 的拼接逻辑），加了 `.para-flow` 后它不知道 → 预览里 off/tap
>     仍然连排，看着像功能没生效。改成**从真渲染输出里抽容器 class**（工具的职责是
>     如实呈现，不是复述一遍实现）。
>   - `audit` 245 → **251/0**（新增 6 条：名单非空且 id 真实 / ★ 试点边界 /
>     块级与句距 10px / ★ 段距不动 / 译文 margin 归零 / 装订线）。
>     三条负向测试精确报红（边界失守 · 段距被一起拉大 · 译文 margin 未归零），还原后逐字节一致。

### 0.3 机制速查（不随批次变）

- **段落结构（2026-09-14）**：19 篇共 1,770 句 / 938 个文本段（多句段 462，其中 ≥2 句的 421）+ 配图段 59。
  10 篇成长类旧文已由 `tools/_regroup-paras.mjs` 按原文接回段落边界（只改分组，句/译逐字节不变）；
  仅 `gr-how-to-fix-your-entire-life-in-1-day` 因源链接是失效的 localhost 临时文件仍是 266 个单句段。
  `audit.js` 有一条守卫（单句段占比 > 80% 的文章数必须 ≤ 1），防止将来又被拆回去。
- **发布机制（2026-09-13 重做）**：发布走「计划 → 暂存校验 → 提交」三段，每次生成批次清单（新增/淘汰/保留/置顶/归档图），批次快照含全部图片，回滚数据与图片一起还原。详见 §4
- **难度指标（2026-09-13 重做）**：旧的「生词率」分子分母量纲不一致（去重词数 ÷ 总词数），已拆成「需学词数（去重，随用户进度）」与「低频词占比（按 token，文本固有；刻意不掺用户认识状态）」。详见 §3
- **运行环境**：Node ≥22（只用内置模块，无 npm 依赖）、Python 3.12+（仅 Pillow 用于压图）。本地起服务任意静态服务器即可，如 `python -m http.server 8123`。

## 1. 目录地图

```
├── index.html                  入口。<script defer> 加载链顺序是铁律，见 §2
├── sw.js                       Service Worker，缓存名 wordlens-cache-vN，涉及静态资源结构变更时递增
├── manifest.webmanifest        PWA 清单
├── assets/
│   ├── app.js                  全部业务逻辑（单文件 ~2000 行，无框架）
│   ├── styles.css              全部样式
│   ├── vendor-fsrs.js          历史 FSRS vendor（当前工作树缺失；背词/复习功能已移除，按当前任务不恢复）
│   ├── fonts.css / 字体文件    本地化字体
│   ├── data.js                 内置词库种子 + 分类配置（文章种子当前为空）
│   ├── data-words-bulk-a.js    核心层词库 A 段（生成产物）
│   ├── data-words-full.js      核心层词库 B 段（生成产物）
│   ├── data-words-mid.js       基础层词库（生成产物）
│   ├── data-examples.js        例句库（生成产物，~600KB）
│   ├── data-ecdict.js          ECDICT 元数据 WORD_META（生成产物）
│   ├── data-tapdict.js         点词翻译层 TAPDICT/TAP_REVERSE（生成产物，~2MB，阅读页点词查义）
│   ├── data-wordfreq.js        常见词表 COMMON_WORDS（生成产物，2KB，难度指标用）
│   ├── data-articles-extra.js  抓取文章正文
│   ├── data-covers.js          封面索引
│   ├── data-source-health.js  RSS/正文/图片来源健康度（自动生成）
│   ├── covers/                 文章配图（jpg，已压缩）
│   └── data-articles-archive.js 归档文章（不加载，仅存档）
└── tools/                      全部工具链（Node mjs / JS、少量 py）
    ├── build-core-vocab.mjs    生成核心层词库（四个数据源并集）
    ├── build-words-mid.mjs     生成基础层词库
    ├── _build-ecdict.mjs       生成 data-ecdict.js（依赖 .ecdict-blob.json 88MB）
    ├── build-wordfreq.mjs      生成 data-wordfreq.js 常见词表（同依赖；词库换代后必须重跑）
    ├── build-tapdict.mjs       生成 data-tapdict.js 点词翻译层（同依赖；词库换代后必须重跑）
    ├── build-examples.mjs      生成 data-examples.js（依赖 .examples-cache/ 44MB）
    ├── ingest.mjs              文章抓取（RSS→翻译→落库），--append/--replace --quota --limit --days
    ├── recommend.mjs           推荐评分与来源健康度纯规则层
    ├── recommend-test.mjs      推荐评分/熔断恢复单元测试
    ├── daily.mjs               GitHub Actions 每日更新入口（建批次 → 抓取 → 质检 → 发布 → 回归）
    ├── lib-release.mjs         ★ 批次快照与完整回滚（数据 + 图片）
    ├── lib-tree.mjs            本地工作树 / 远端仓库对账共用库（blob sha1 + 封面引用集合计算）
    ├── publish.mjs             ★ 发布：计划 → 暂存校验 → 提交，产出批次清单；含远端残留自动清理（§4）
    ├── rollback.mjs            ★ 回滚 CLI（--list / latest / 指定批次）
    ├── tree-diff.mjs           本地工作树 vs 远端仓库逐文件对账，判断「该推什么」（别信 git status）
    ├── release-test.mjs        ★ 发布可靠性回归（完整回滚 / 置顶豁免 / 校验门禁 / 清单基线 / 批次自愈，自还原）
    ├── remote-sweep-test.mjs   远端残留自动清理回归（keeper 豁免 / 删除前备份 / 无凭据降级）
    ├── examples-test.mjs       例句按需加载回归（首次 / 复用 / 失败重试 / 加载中换词）
    ├── spot-check.mjs          人工抽查材料：逐句对照页 + 四项高信噪比预检（输出 tools/_spot/）
    ├── _regroup-paras.mjs      一次性修复（2026-09-14）：按原文 HTML 把「一句一段」的旧文重分组；
    │                           只改分组不改文字（写盘前校验 en/cn 序列一致），--dry / --apply / --show / --only
    ├── sw-test.js              Service Worker 离线与缓存路径回归（离线无缓存不能交出 undefined）
    ├── qc-test.mjs             质检门禁语义回归（空清单 / 目标 id 不存在都不算通过）
    ├── push-test.mjs           上传清单闸门回归（清单点名文件缺失必须在联网前中止）
    ├── translate-titles.mjs    标题中文翻译回填（--dry / --redo / --only）
    ├── lib-mt.mjs              翻译共用库：Qwen-MT 优先，DeepL 补齐失败项（2026-09-17 对调；文章上下文 + 版本化缓存 + 引擎/模型记录）；另有 qwen-llm 精翻引擎（编号行协议、对不齐整批作废、缓存按模型隔离，默认不进产线）
    ├── llm-refine.mjs          精翻通道 CLI：单篇 → qwen-max 逐句精翻 → tools/_refine/（已 gitignore）三栏审校草稿，人工确认后才进 build，绝不自动改线上
    ├── mt-test.mjs             翻译上下文 / 缓存隔离 / 源语言与引擎元数据回归（含 qwen-llm 协议测试）
    ├── text-test.mjs           译文原样回显过滤回归
    ├── classics-test.mjs       明星经典图集偏好排序回归
    ├── lib-text.mjs            文本清洗共用库（占位符/广告段/缩写/命名实体）
    ├── text-scan.js / fix-text.mjs  正文体检与回填
    ├── audit.js                回归①：数据与逻辑断言（140+ 条）
    ├── nav-test.js             回归②：导航流 30 条
    ├── smoke.js                回归③：加载链冒烟
    ├── qc.mjs                  文章质量体检（时效/封面/段数/推荐评分门禁）
    ├── _api-push.mjs           ★ 部署推送（Git Data API 增量提交，见 §4）
    ├── _cred-get.py            读取 GitHub 凭据（Windows 凭据管理器，勿删）
    ├── .deepl-key              DeepL Free API key（明文，勿提交、勿外传）
    ├── .dashscope-key          北京百炼 API key（明文，本项目文件优先；勿提交、勿外传）
    ├── .ecdict-blob.json       ECDICT 全量语料 88MB（gitignored，词库/词频/点词层重建必需）
    ├── .examples-cache/        例句/词表多源缓存 44MB（gitignored，重建必需）
    ├── .mt-cache.json          翻译缓存 500KB
    └── _aesop-raw.html         寓言源（Gutenberg #11339），_ingest-fables.mjs 用
```

批次快照落在 `.bak/releases/<批次号>/{before,after,orphans}/`（gitignored，保留最近 10 个）。

## 2. 铁律（违反即坏，历史踩坑都在这）

1. **加载链顺序不可乱**（index.html 全 defer）：`data.js → data-words-bulk-a.js → data-words-full.js → data-words-mid.js → data-articles-extra.js → data-articles-archive.js → data-covers.js → data-examples.js → data-ecdict.js → data-tapdict.js → data-wordfreq.js → app.js`。背词/复习功能已移除，`vendor-fsrs.js` 不在加载链且缺失属于预期；新增数据脚本必须带 defer 且插在依赖它之前的位置。
2. **词库重建链顺序不可乱**：`build-core-vocab.mjs → build-words-mid.mjs → _build-ecdict.mjs → build-wordfreq.mjs → build-examples.mjs`，点词层 `build-tapdict.mjs` 紧随其后（后四者都把词表作为输入刷新元数据/词频/例句）。**`build-wordfreq.mjs` 与 `build-tapdict.mjs` 的排除表都是当前词库，词库换代后不重跑会漏词或错配。**
3. **语料词频不能当排序主轴**。实测把 the/and/league 顶到前排、难度单调性 100%→51%。现行排序 = ①层（基础层先、核心层后）②层内真题高频（hf/cv 标记）整块提前 ③语料词频爬坡 ④每 20 词单元内 FNV-1a 确定性打散。单元打散必须**层内**做。
4. **绝不能用 ECDICT 的 `t` 考纲标签**判定词的学历层级——那是覆盖关系不是学历关系（compensate f=5037 也挂着 gk）。判层唯一依据 `list==="中学基础"`。
5. **静态资源结构变更（增删文件）时把 `?v=` 统一加一**（index.html 里全部引用 + manifest 引用一起改），让所有资源同批换 URL，避免新旧页面代码与数据混用。**但不要改 `sw.js` 的缓存名** —— v42 起策略是 SWR + ETag 协商，按发布改缓存名会每天清空用户缓存、重回冷加载。（本条在 2026-09-13 之前写的是「递增缓存名」，与 sw.js 里的实现相反，已作废。）
6. **英文正文禁改写**，只做清洗（lib-text.mjs）；标题翻译的人工校对表在 translate-titles.mjs 的 TITLE_FIXES。
7. 基础层词的例句兜底字段是 `collocation`/`collocationCn`（源词典只给短语无完整句），不是所有词都有 `example`。
8. 文章 `paras` 兼容两种形状：旧文章使用 `{en,cn}`，新抓取文章使用 `{sentences:[{en,cn},...]}`；图片块仍为 `{img,cap}`。使用 `--replace` 更新时不要把旧文章重新混回结果。
9. **发布只走 `publish.mjs`，不要手改 `data-articles-extra.js`**。它负责出清单、暂存校验、归档孤儿图、写推送清单；绕过它直接删文章，图片不会跟着归档，回滚也就没有依据。
10. **`publish.mjs` 改盘之前，`.bak/releases/<批次>/before/` 必须先存在**。批次由 `daily.mjs` 建（整条管线一个批次），手工单跑 `publish.mjs` 会自建。回滚统一用 `node tools/rollback.mjs <批次|latest>`，它连图片一起还原 —— 别只拷数据文件，那正是 2026-09-13 之前的老毛病。
11. **发布相关改动的验收标准是 `node tools/release-test.mjs` 全绿**（当前 26/26；`sw-test.js` 9/9、`qc-test.mjs` 5/5、`push-test.mjs` 9/9、`remote-sweep-test.mjs` 31/31、`examples-test.mjs` 28/28 管失败与边界路径）。它自带还原保护，可以放心在有改动的树上跑，但它会把你的改动一并还原，所以跑之前先提交或另存。
12. **推送清单的基线是「上次成功发布」而不是批次 `before/`**。`before/` 是 publish 启动那一刻拍的，先改文件再跑发布时它已经包含改动，差异恒为空 —— 这正是「改好了却推不上去」的成因。清单口径看 `.bak/published.json`（由 `_api-push.mjs` 推送成功后写入），手工改完代码走 `--files`，别去改这个文件。
13. 正文里的撇号是排版弯引号 `’`，查词/统计前必须经 `normApos()` 归一再查表；`lemmaCands()` 按直引号 `'` 写的，不归一 `it’s` 会被切成 `it` + `s`。

## 3. 词库口径（改动前必读）

- **核心层 2,013 词** 四源并集：① ECDICT 语料 f≤2500 ② liut969/CET 真题高频 1250 词（经词形还原）③ data.js 手工精编 30 词（全保留，词根词缀助记是招牌内容）④ `tools/.examples-cache/cet4-gaps-general.json` 通用高频向缺口 20 词（2026-09-11 用户拍板口径：**只收通用语料高频的缺口词，真题高频但通用语料中低频的 201 词明确不收**，勿再问）。
- **基础层 2,069 词** = (初中 ∪ 高中) − 核心层 − 功能词。
- 背词、复习、快筛和学习起点功能已移除；四级词库及阅读页点词查义、生词本仍保留。
- 数据源许可：KyleBing/english-vocabulary 与 kajweb/dict **无许可证（非商用可接受，商用有风险）**；Tatoeba CC-BY 2.0 可商用需署名；exam-data/CETVocabulary CC BY-NC-SA 4.0。来源声明已写入 README 与 App「关于」。

## 3b. 难度指标口径（2026-09-13 重做，改之前必读）

旧的「生词率」= 去重后的未认识词库词数 ÷ 正文总词数，分子分母量纲不同：同一个生词
出现 20 次分子只算 1，词库外的词一个不算。它同时驱动难度标签和预计时长，所以两个
展示值都不可靠。现已拆成两个各自自洽的口径（`assets/app.js` 的 `computeArticleMetrics`）：

| 指标 | 口径 | 依赖 | 回答的问题 |
| --- | --- | --- | --- |
| `needLearn` | 词库内、未标认识的词，词形归一去重 | 随 `S.known` 变 | 这篇有多少词要进生词本 |
| `unknownRate` | 低频 token ÷ 全部 token | **与 `S.known` 无关** | 读起来卡不卡（驱动难度档与估时）；对外只叫「低频词占比」，不叫「陌生词比例」——它不随用户认识标记变化 |

- **「低频」= 词元语料词频 f > 2500**。2500 不是新拍的线，就是核心词库「语料高频」那条线。
- 词频来自**两张表，缺一不可**：学习词的 f 在 `WORD_META`，词库外的常见词在
  `COMMON_SET`（`data-wordfreq.js`）。只查 `WORD_META` 会把 `the / of / and` 这类
  被学习词表主动剔除的纯功能词全判成低频 —— 实测生词率会虚高到 88.6%。
- `unknownRate` **刻意不掺 `S.known`**：认识标记要用户手动打，新用户一个都没标，
  掺进去每篇都判「困难」，标签失去区分度。
- 常见词判据不能用 `TAPDICT`：它收的是 f ≤ 50000 的词（3.8 万），门槛太松，
  `ostensibly / perfunctory` 都在里面，等于没筛。
- 专有名词不计入：句中大写按位置判断；**句首大写**无法靠位置判断，改用「大写且
  任何词典都查不到」兜底。跳过专有名词必须用 `continue` 不能用 `return`
  （`return` 会吞掉整句剩余 token，实测让一篇文章从 274 词缩成 27 词）。
- 难度四档阈值（0.12 / 0.17 / 0.24）与 wpm（150 / 120 / 95 / 75）按当前 19 篇
  实测分布标定：低频占比 10.6% ~ 25.8%，中位 13.6%，四档 4 / 10 / 4 / 1。
  **语料结构变化后需要重新标定。**
- 相关回归在 `audit.js` 的 `[G2]` 段，共 13 条断言，改口径必须让它继续全绿。

## 4. 部署（重要：git push 不可用）

**本机 `github.com` 的 git 协议被墙（schannel 中断），所有提交走 Git Data API**：

```bash
# 推荐：直接消费 publish.mjs 产出的批次清单（含 ingest 新增的配图与归档删除项）
GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs "chore: 每日更新" --manifest auto

# 手工改代码时用显式文件清单
GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs "fix: ..." --files "assets/app.js,sw.js"
```

- **优先 `--manifest`**。`--manifest auto` 读 `.bak/releases/LATEST` 指向的批次清单，
  里面的 `push[]` / `delete[]` 是与批次快照对比得出的完整差异，既不漏新图也不会误删。
- `--only` / `--files` 是显式白名单。**不要再依赖 `git status` 回落路径**：porcelain
  默认会折叠未跟踪目录（`?? tools/.examples-cache/`），**而且本仓库的 `.git/config` 一度把
  `status.showUntrackedFiles` 设成 `false` —— 那会让 `git status` 对整个新文件世界闭口不谈**
  （2026-09-13 实测：91 个新文件全部隐身，连"目录被折叠"的警告都不会触发，属于静默漏传）。
  回落路径现已强制 `-uall` 并检测该配置打印警告；该隐患配置已于 2026-09-13 用
  `git config --unset status.showUntrackedFiles` 解除。**别再用裸 `git status` 判断该传什么。**
- 推完用 Actions API 确认 `daily-update` workflow `completed success`。
- ⚠️ 本仓库 git 历史不完整（交接基线 f64e060 只是快照），**远端 shjdd134/ciyue 才是唯一权威**，别用本地历史做 diff 基线——要 diff 线上版本就从 contents API 拉远端文件。
- 仓库 `tools/.examples-cache/` 下三个白名单 json（cet4-hf / cet4-sprint / cet4-gaps-general）随版本走，其余缓存全部 gitignored。
- 凭据：`python tools/_cred-get.py git` 从 Windows 凭据管理器取 GitHub token（本机有效）；DeepL key 在 `tools/.deepl-key`。
- **`.gitignore` 已把抓取残留与会话产物挡在门外**（2026-09-13 补）：`.tmp-*.html`、
  `tools/.remote-articles.js`、`tools/_aesop-raw.html`、`.zcode/`、`.workbuddy/`。
  此前它们只是「未跟踪」，任何人走 git-status 路线 push 都会被一起传上公开仓库；
  `_aesop-raw.html` 另在 `_api-push.mjs` 的 `NEVER_PUSH` 里兜底。**仓库是公开的，新增本地产物先想它该不该入库。**

### 发布与回滚（2026-09-13 重做）

每次改动数据 = 一个**批次**，落在 `.bak/releases/<批次号>/`：

```
batch.json    批次元信息（含「开始时不存在、由本次创建」的文件名，回滚要删掉）
before/       变更前副本，布局与仓库一致（含 assets/covers/ 全量图片）
after/        待发布的新数据（暂存校验用）
orphans/      本次归档的孤儿封面
manifest.json 发布清单：新增/淘汰/保留/置顶/归档图/推送清单
```

`publish.mjs` 三段走：**计划**（出清单）→ **暂存**（新数据写 `after/`，线上不动）→
**校验**（验正文完整 + 所有被引用图片真实存在）→ **提交**。校验不过直接退出码 2，
线上一个字节都不动。孤儿图先复制到 `orphans/`，确认落盘后才删线上文件。

```bash
node tools/publish.mjs --dry                    # 只出计划
node tools/publish.mjs                          # 正式发布（自建批次）
node tools/rollback.mjs --list                  # 列出可用批次
node tools/rollback.mjs latest                  # 回滚（数据 + 图片一起还原）
node tools/release-test.mjs                     # 发布可靠性回归（自带还原保护）
```

**常青栏目与置顶**：成长/寓言不受 30 天时效淘汰，配额用 `--evergreen-per-cat`
（默认 60，新闻类 `--per-cat` 默认 25）。需要永久保留的单篇在文章对象上加
`"pin": true` —— 它既不占配额也不受时效影响，被误删会在校验阶段直接报错拦住。

**批次指针 `LATEST` 会悬空，别直接读它当批次号**：`rollback latest` 取的是
`.bak/releases/LATEST` 指向的批次，但这个指针可能指向一个已经不存在的目录
（批次被回滚、被保留窗口淘汰、或被测试收尾清掉）。`latestBatch()` 现已校验目录真实存在，
失效就回落到磁盘上最新的真实批次；`release-test.mjs` 收尾也会把 `LATEST` 还原成测试前的值
（本来没有就删掉）。想拿"最近批次"一律走 `latestBatch()` 或 `rollback.mjs --list`。

**推送清单基线 `.bak/published.json`（2026-09-13 补）**：`publish.mjs` 出清单时比的是
「远端现在长什么样」，不是本次批次的 `before/`。两者语义不同：

```
before/       本次操作前的状态  → 回滚用（撤销这一次发布）
published     上次推上远端的快照 → 出清单用（远端还缺什么）
```

只按 `before/` 算有个致命情形：先把正文改好、配图补好，再跑 `publish` —— 快照拍到的
已经是改好的样子，差异恒为空，于是「改了却推不上去」。同理 `manifest.added` 以前拿
`keptIds` 和 `list`（自己的超集）比，永远为空。现在两者都对着 `published` 算。
该文件由 `_api-push.mjs` 在**推送成功之后**写入（中止/失败时不写，下次清单仍会带上这些文件）；
首次运行没有基线 → 清单按「远端一无所有」出全量，方向是偏大而不漏，安全。
`release-test.mjs` 的 E 段专门回归这条：改好文件再发布，该文件必须在清单里。

**远端残留自动清理（2026-09-15 补）**：旧 `delete[]` 只算「在 `published.json` 里、但本地盘上没有」。
撤栏目 / 撤功能留下的残留**从来不在基线里**（它们从没被本仓库推上去过），于是对它完全隐形——
两轮实测（撤明星/足球/AI 留下的 40 张孤儿封面、撤「冲刺/快筛」留下的 2 个文件）全是手写清单绕过去的。
现在 `publish.mjs` 出清单时会多拉一次远端 tree，补上「远端有、本地无」的差集。

**裸的差集不能直接删 —— CI 会自己往远端提交。** `daily.yml` 每天抓文章、下封面后 `git add -A`
提交回 main，那些文件同样是「远端有、本地无、又不在基线里」。本地工作区一旦滞后于 CI，
发布会把 CI 刚抓来的文章和封面删光，而这类文件和「该清的残留」在路径上没法区分。判决规则：

```
远端独有文件
  ├─ assets/covers/* 且被【远端文章】引用 → 保留（keeper：多半是 CI 刚抓来的封面）
  ├─ assets/covers/* 且无人引用          → 可清（真孤儿）
  └─ 其余路径（源码 / 脚本 / 数据）      → 可清
```

「远端引用集合」是把**远端那几份数据文件**跑一遍算出来的，和本地的引用计算共用
`lib-tree.mjs` 的同一段代码 —— 两套尺子会让判决错，而且错的方向是**误删 CI 抓的封面**。

配套三件事：

- **删除前自动备份**：`_api-push.mjs` 在删任何文件前，把远端原始内容存到 `.bak/deleted-<日期>/`。
  必须这么做 —— 这些文件不在任何批次的 `before/` 里，`rollback.mjs` 还原不回来，删了只能去 git 历史捞。
- **`--no-remote` 显式关闭**（离线 / CI 场景），`release-test.mjs` 用它隔离：它盯的是本地发布管线，
  不该依赖网络、更不该真的往 `delete[]` 里塞项。远端对账本身由 `remote-sweep-test.mjs` 回归。
- **保留项非空是信号**：说明本地工作区滞后于 CI，这时发布**会覆盖远端的新内容**，
  按提示先 `tree-diff.mjs` 对账再决定。拉不到远端树时一律 fail-soft（跳过，不删任何远端独有文件）。

⚠️ **`--keep-batches` 是给测试用的**：`pruneBatches` 按 id 字典序丢「最旧的」，而 `release-test.mjs`
的两个种子用 `19000101-*`（最小 id）。盘上批次多于 10 个时，测试自己那几次发布就会越界，
把种子乃至**真实批次**当最旧的清掉（2026-09-15 实测：7 真实批次 + 2 种子 + 测试 4 次发布 = 13，
余量一超就掉 3 个）。测试现已把窗口钉死 `--keep-batches 999`，批次清理由 label 认领逻辑负责。

## 5. 日常操作

```bash
# 抓新文章（当前仅足球走 RSS；成长 RSS 暂停，人物走 people.mjs 审核队列，寓言走公版静态导入）
node tools/ingest.mjs --append --quota "足球=2" --limit 10 --days 30   # --dry 预览；全量替换用 --replace
node tools/translate-titles.mjs --dry        # 标题翻译回填
node tools/text-scan.js --full               # 正文体检；有问题则 fix-text.mjs --dry 后去掉 --dry
node tools/qc.mjs --ids-file .tmp/new-ids.txt  # 文章质量体检（不带参数会直接报错）

# 正文补全 / 下架 / 提取器诊断（2026-09-15 语义层修复批次新增）
node tools/ingest.mjs --refill               # 按当前提取器补回漏掉的正文句（只增不改；--dry 先看）
node tools/ingest.mjs --refill --refill-ids monica   # 只处理某篇；会顺带同步人物篇 sourceTextWords 字段
node tools/ingest.mjs --prune                # 按 ingest.mjs 的 DROP_LIST 下架（--dry 先看）
node tools/ingest.mjs --dump-blocks .tmp/orig/x.html   # 用真提取器抽 blocks 打印，查「线上为什么少这句」

# 中文层术语校正（规则表 tools/term-glossary.json，68+ 条）
node tools/fix-cn.mjs --dry                  # 逐条列出会改哪句（先看再改）
node tools/fix-cn.mjs                        # 落盘（幂等：重复执行 0 改动）
node tools/spot-check.mjs                    # 生成人工抽查材料 tools/_spot/<日期>/（语义层只能人看）

# 手工整条走一遍（等价于 Actions 干的事，一步失败自动完整回滚）
node tools/daily.mjs

# 单独发布 / 回滚 / 验收
node tools/publish.mjs --dry                 # 只出计划，不写任何文件
node tools/publish.mjs                       # 正式发布（自建批次）
node tools/rollback.mjs latest               # 回滚到最近批次之前（数据 + 图片 + 本批新建的图）
node tools/release-test.mjs                  # 发布可靠性回归，期望 26/26
node tools/examples-test.mjs                 # 例句按需加载回归，期望 28/28
node tools/mt-test.mjs                       # 翻译上下文 / 缓存隔离回归
node tools/text-test.mjs                     # 原样回显英文拦截回归
node tools/classics-test.mjs                 # 明星经典图集偏好排序回归
node tools/sw-test.js                        # SW 离线/缓存路径，期望 9/9
node tools/qc-test.mjs                       # 质检门禁语义，期望 5/5
node tools/push-test.mjs                     # 上传清单闸门，期望 9/9
node tools/remote-sweep-test.mjs             # 远端残留自动清理，期望 31/31
node tools/verify-live.mjs                   # ★ 推送**之后**核验线上真实产物（别用 curl，见下）
node tools/verify-live.mjs --wait 600        # 推送后立刻跑：等部署/CDN 追平（最多 10 分钟）
node tools/verify-live-test.mjs              # verify-live 的负向回归（本地假站点，不联网），期望 18/18

# 词库改动后完整重建（顺序见铁律 2）+ 词频表与点词层重跑（排除表=当前词库）+ 回归
node tools/build-wordfreq.mjs && node tools/build-tapdict.mjs
node tools/audit.js && node tools/nav-test.js && node tools/smoke.js
```

- 每日自动更新由 GitHub Actions（`.github/workflows/daily.yml`）定时跑 `daily.mjs`，无需人工干预。
- 可用源清单与被墙名单（BBC/Guardian/NPR 可用性等）写在 `ingest.mjs` FEEDS 注释与会话记忆里； ESPN/Smithsonian 需 Googlebot UA。
- **「线上到底是不是这一份」只有一个入口**：`node tools/verify-live.mjs`。三层职责别混：`_api-push.mjs` 推（仓库层·写）、`remote-sweep-test.mjs` 对账远端仓库（仓库层·读·要 token）、`verify-live.mjs` 核验 GitHub Pages（公网层·读·**不要 token**）。**别再手打 curl**：2026-09-15 实测 curl 报 `HTTP=200 bytes=555733` 拿到的却是**截断文件**（正文戛然而止、无收尾 `];`），差一点把「下载被截断」误判成「线上没更新」；curl 在本沙箱写文件还有 `ERROR on write` 的老毛病。本沙箱访问 Pages **单次请求实测约 24s**（延迟高、带宽不缺），所以核验靠并行 + 重试压时间，一轮 20~90s 属正常。它查六类：可达/未截断、篇目与本地一致（含逐字节）、已知坏模式（localhost·书名号·模型名当书名）、`index.html` 版本号与资源清单、`sw.js` 缓存名、配图可达（防封面漏推断图）。`LIVE_BASE=http://127.0.0.1:PORT/` 可核验任意站点 —— `verify-live-test.mjs` 就靠它用三个本地假站点证明这些守卫**该红时会红**。
- 改数据源后记得同步：build 脚本顶部注释 + README「数据来源」段 + App「关于」区块。
- **译名/术语只有一处事实源**：`tools/term-glossary.json`（规则**以英文原句为条件**——同一个中文词可能对应两个英文术语，无条件全局替换必然误伤，见文件内 `$comment`）。改它是改「中文层」而不是改译文：DeepL 现在仍把 "Feed it people" 译成「把它给…看」，重译救不了，只能后处理。`applyGlossary` 在 `ingest.mjs`（增量入库）与 `people.mjs`（人物全文）两条通道上都挂了；足球的老板/主教练规则限定 `ft-` 文章。存量数据用 `fix-cn.mjs` 刷。`audit.js` 的 `[G9]` 会遍历规则表逐条回验已发布数据 —— **新增一条规则就自动多一道守卫**，不需要另写断言。规则里 `to` 包含 `from` 的写法永远不可能幂等，`lib-glossary.mjs` 在加载期直接抛错拦下。

## 6. 现状与遗留任务

- ✅ 已上线：两层词库 4,082 词、通用高频缺口 20 词（v28）、点词翻译层（v30，阅读页任意单词点击查义：词库词完整卡可入生词本，词库外词轻量卡只给释义）、阅读页同一篇文章的重渲染保留滚动位置（v33）、文章替换与配图清理、成长栏目与配图修复（v35-v39）、SW 缓存优先与「上次读到」（v37）、批次化段落兼容（新抓取文章按段分组；app.js / ingest / 清洗 / 质检链双格式兼容）、推荐与阅读反馈、每日自动更新。背词/复习/快筛/学习起点入口与交互已移除；保留词库、点词查义、已认识标记和阅读生词本。历史备份中的 studied/wrong/daily/fsrs/studyDays 仅作导入兼容，读取后不再进入运行状态。2026-09-13 当前工作树已恢复事故前的 11 篇成长文章，并与本次更新的足球 2、AI 3、明星 3 合并为 19 篇；寓言保持清空，待发布。
- ✅ 推荐系统阶段 1：新抓文章写入质量分、基础难度分和服务端初始分；质量低于 65 不进入候选池；RSS/正文/图片健康度独立记录，RSS/正文连续失败 3 次熔断、连续成功 3 次恢复。历史文章暂不回写评分字段，保持数据不迁移。
- ✅ **发布可靠性（2026-09-13）**：三段式发布 + 批次清单 + 暂存校验 + 全量批次快照；
  孤儿图先复制后删除；回滚覆盖数据文件、`sw.js` 与 `covers/` 全部图片；常青栏目
  改用独立配额，新增单篇 `pin: true` 永久保留标记；`_api-push.mjs` 改为消费发布清单，
  不再依赖 `git status` 开关。新增 `lib-release.mjs` / `rollback.mjs` / `release-test.mjs`。
  顺带修掉一个老缺陷：`sw.js` 在仓库根而不是 `assets/`，旧 `daily.mjs` 用
  `path.join(ASSETS,'sw.js')` 备份，文件从来不存在被静默跳过 —— **sw.js 此前从未进过回滚范围**。
  2026-09-13 复查又补两处：① `LATEST` 批次指针会悬空（`latestBatch()` 现校验目录存在并回落，
  `release-test.mjs` 收尾还原指针）；② `.git/config` 里的 `status.showUntrackedFiles=false`
  会让 `git status` 静默隐藏全部新文件，`_api-push.mjs` 回落路径已强制 `-uall` 并检测该配置告警，
  隐患配置已解除。`release-test.mjs` 相应从 11 项扩到 16 项断言。
- ✅ **难度指标口径（2026-09-13）**：生词率拆成「需学词数」与「低频词占比」两个口径；
  新增常见词表 `data-wordfreq.js`（242 词）作为词库外低频词依据；撇号归一修掉
  `it’s` 被切成 `it` + `s` 的问题；首页推荐改为「渲染只读、换一批才翻页」。
  **对外文案统一为「低频词占比」**（原写「陌生词」，但它不掺用户认识标记，叫陌生名不副实）。
- ✅ **发布/缓存/记账失败路径（2026-09-13 第二批）**：这一批修的都是「正常路径能跑、
  失败路径静默出错」的问题，全部补了回归。
  ① **清单基线**：`publish.mjs` 改以 `.bak/published.json`（上次成功发布）为基线，
  修掉「先改文件再发布 → 清单为空 → 改好了推不上去」，`added` 也不再拿自己的超集比而恒为空。
  ② **缺文件中止**：`_api-push.mjs` 清单点名但本地缺失的文件，在取 token / 联网之前 `exit 2`，
  不再只打警告继续提交（避免正文传了、配图没传却报成功）。
  ③ **SW 离线兜底**：`sw.js` 离线且无缓存时原先 `swr()` 解析成 `undefined`，
  `respondWith(undefined)` 变网络错误页，外层 `.catch` 因为是 resolve 而非 reject 救不了；
  现在导航回落离线页、静态资源 504，永不交出 undefined。
  ④ **阅读中更新**：收到 `content-updated` 不再只弹「返回后生效」，改为记 `pendingUpdate`，
  退出阅读页那一刻真正刷新（判断依据改成上一次视图，不再依赖 DOM 探针）。
  ⑤ **阅读时长持续记账**：新增 `secByDay`（秒为口径，`minsByDay` 降为派生镜像，老数据自动迁移），
  离开阅读页/换文章/页面隐藏/每累计 60 秒都结算，打卡只标记「读完」；
  不再 `Math.max(1,…)` 把几乎没读硬记成一分钟。
  ⑥ **质检门禁**：`daily.mjs` 改为数「本批最终留下几篇」，不再拿被剔除过的旧 id 清单复查
  （旧清单里 id 已不存在，qc 会按 0 篇「通过」，全军覆没被误判为全部合格）；
  `qc.mjs` 新增空清单退出 2 与 `--strict-ids`。
  ⑦ **生词本按词匹配**：`本篇生词本` 原用 `text.includes(w)`（收藏 art 误收 party、
  收藏 go 漏掉 went），改用查词同一套分词 + 词形还原。
  ⑧ **批次边界**：批次号同秒冲突改为追加后缀（原实现会 `rmSync` 掉已有快照）；
  `restoreBatch` 现在连本批次新建的封面图一起清理，才算完整还原。
  新增回归：`sw-test.js` 8/8、`qc-test.mjs` 5/5、`push-test.mjs` 5/5，
  `release-test.mjs` 扩到 21/21，`audit.js` 扩到 149 条（新增 G4/G5/G6）。
- 📌 **明确不做长文分章**：用户 2026-09-13 拍板「文章保持全文阅读，不做分批改造」。
  `gr-a-complete-knowledge-base-of-human-3-0`（6,904 词）等长文维持整篇阅读 + 进度条 + 续读位置。
  2026-09-14 再次确认：文章始终保持全文阅读。
- ✅ **明星栏目「历史通道」已上线（2026-09-14 晚，阶段一 + 二全部完成）**。定位是「按偏好人物精选的图文专题」（写真／经典银幕形象／旧照回顾）。
  用户拍板：范围**不锁具体人物**（「大美女」是审美偏好，目标是这类内容）、**开非 RSS 历史通道**、**只收女性**、**图片 A 方案（下载展示）**、**维持 720px**。
  **阶段二落地**：`ingest.mjs --classics`（Vogue 月度 sitemap → 入库带 `pin:true / src / license / yearFrom / person / photoCount`）·
  `recommend.mjs` 明星图片硬门槛 `meetsImageGate`（≥6 图）+ `qualityScore` 新增 `capWords` · 共享口径抽进 `lib-classics.mjs` / `lib-text.mjs`（清单与入库同一把尺子，杜绝「清单说能入、入库却变样」）。
  **文字门槛定稿**：正文 ≥80 词 且 正文+图注 ≥300 词（图注是图集的文字主体，中位数 362 词；在阅读页渲染为纯英文 `<figcaption>`，无译文 —— 让图注进句子流属第三阶段展示层）。
  **已入库 24 篇**（每人一篇，`pin:true` 豁免过期与配额）：戴安娜、维多利亚·贝克汉姆、奥黛丽·赫本、伊丽莎白·泰勒、碧昂丝、芭芭拉·史翠珊、安妮公主、杨紫琼等；每篇 ≤16 图、图注带 ≤2005 年份的早期影像 ≥10 张。旧 3 篇明星娱乐短讯已删（2/3/3 图 + 封面断链）。
  **发布**：批次 20260914-214239（460 项）上线，线上 40 篇（16 RSS + 24 经典专题）。
  ⚠️ **published.json 污染事故与修复**：release-test 把播种值写进 `.bak/published.json`（commit=release-test-seed、463 张封面被记成已发布，实际远端只有 19 篇）——按假基线发布会整体漏推新封面。`tools/repair-published.mjs` 从远端真实树重建基线；**跑完 release-test 后若 commit 字段不是真 sha，先修复再 publish**。
  回归：audit 182/0 · nav 18/0 · qc-test 5/5 · recommend-test 16/0 · release-test 26/26 · sw 8/8 · examples 28/28 · push 9/9。
  **第三阶段（展示层，未动）**：大图卡片、人物筛选、全屏相册、清晰图按需加载、图注进句子流。
  **阶段一备忘**：`tools/fetch-classics.mjs`（sitemap 扫描 → 筛选 → 实测）与清单 `STARS-CANDIDATES.md` / `STARS-CANDIDATES-ZH.md` / `tools/_spot/classics-candidates.json` 保留备查。
  ⚠️ **「图多」不能当入选条件**：初筛里图数最多的几条恰恰不是想要的（爱莉安娜 37 图、赞达亚 31 图、泰勒·斯威夫特 26 图全是「历代妆容盘点」，早期影像 0—8 张）。
  **四个实测踩出来的坑**（已写进 `lib-classics.mjs` 注释）：
  ① 张数必须数正文容器内 `<figure>`，**不是 `<img>`**（Vogue 页面 img 7 个 vs figure 16 个）；
  ② **老版模板图片 URL 没有扩展名**（`…/w_320,c_limit/542247402`），用扩展名白名单过滤会把整篇图集滤成「0 张图」——
  看起来像「这篇图少」，实际是解析器不认识它（`vintage-pictures-of-charlotte-rampling` 22 个 figure 就这么变 0 的）；
  ③ **不能只取第一个 `srcset`**（手机断点 source 排在前，宽度只有 320w）；
  ④ **跨站去重不能靠图注文本或图片 id**——Vogue 美英两版各写各的图注、各传一份图片副本（photo id 交集 0），
  只能用「同一人物 + 图数接近 + 年代集合重合」。
  方案 `STARS-CHANNEL.md`（文首记全部决策 + 定稿过程）、**中文对照 `STARS-CANDIDATES-ZH.md`（每条「是谁」+ 排除原因）**、
  机器清单 `STARS-CANDIDATES.md` + `tools/_spot/classics-candidates.json`（含 `pool[]`，接管线按它走）、
  三人样本 `STARS-SAMPLE.md`、核查脚本 `tools/_spot/*.py`。
  **第二阶段已全部落地并上线**（见上方 ✅ 条目）；文字门槛从初稿的「正文 ≥300 词」按实际数据改为「正文 ≥80 且 正文+图注 ≥300」。
- ✅ **阅读体验基础版（2026-09-14，P0 一轮）**：按「正文连贯 / 查词少打断 / 阅读位置稳定」三项做了一轮。
  改动集中在 `assets/styles.css` + `assets/app.js`，资源版本号随之 `?v=45 → 46`（内容变化靠 SWR 会滞后 1 小时，换 URL 才即时生效）。
  ① **段落连续排版**：`.para` 从「每句一个 flex 块」改成段落级文本流，句子是内联 `.sentence` span，句间只留一个空格；
  删掉 `.para:not(.first)::before`（段间「· · ·」装饰）与 `.para.first .en::first-letter`（首字下沉，它作用在多句段上只会放大一句）。
  逐句译文 `.cn` 在段内是块级，插在该句下方（双语对照不变）。
  ② **朗读按钮只在选中句出现**：`.para-tts` 默认 `opacity:0; pointer-events:none`，点句 → 该句 `.sel`（同时是隐藏中文时的 `.peek`）→ 露出。
  旧版每句一个半透明喇叭，长文里满屏小图标。已知瑕疵：句子正好占满一行时喇叭会换行到下一行（P1 的「选中句工具条」会替换它）。
  ③ **留白/字号单点定义**：`.view.read-scroll{padding:12px 0 110px}` + `.read-scroll{--rd-pad:22px}`，
  正文/标题/读完卡都取 `var(--rd-pad)`。此前 `.read-scroll` 20px 与 `.read-body` 24px **叠加**，手机上每侧 40px；
  选择器写成 `.view.read-scroll` 是为了压过媒体查询里的 `.view{padding:2px 16px 6px}`（同层后置规则会赢）。
  字号改成 CSS 变量 `--rd-en/--rd-en-lh/--rd-cn/--rd-cn-lh`，`fs-0/1/2` 挂在 `#read-scroll` 上：
  19/32、21/36、24/41px，中文同步 14/15.5/17px（原来固定 13.5px，英文放大后双语一重一轻）。
  ④ **阅读设置面板**（FAB 的「Aa」）三组直接点选 + 即时预览：`renderReadSettingsSheet()`；
  改动走 `changeReadSetting()` —— **不重渲整页**（重渲会把位置打回开头），只切 `#read-scroll` 的类与 `.screen` 的 `rt-*`；
  遮罩用 `.sheet-mask.soft`（只压暗不模糊），否则「改一下就看到效果」变成隔毛玻璃猜。
  ⑤ **句子锚点代替滚动距离**：`readAnchor()` 取「第一个底边越过视口上部 22% 的句子」记 `{pi,si,off}`，
  `applyAnchor()` 按 `scrollTop += (句顶 - 容器顶) - off` 还原。`S.readPos[文章id]` 每篇各存一份，
  `resumeAnchor` 优先于旧的 `resumeY`（老数据没有锚点时仍靠它兜底）。落盘时机：离开阅读页 / `pagehide` / 切后台（`flushReadPos()`），
  **不放滚动节流**里 —— 锚点要逐句量 `getBoundingClientRect`，长文 1,500+ 句每 5 秒量一遍会把滚动拖成幻灯片。
  浏览器实测（无头 Edge，`tools/_spot/2026-09-14-reading/` 有截图）：19px → 24px 后锚点句 `pi/si` 不变、偏移漂移 0px；正文左右留白 22px（原 40px）；`overflowX=0`。
  ⑥ **顺手修掉 `highlightEn` 钻进 HTML 实体**：`esc()` 先把 `&` 变 `&amp;`，旧分词会把 `&amp;` 里的 `amp` 当单词包上 span，
  变成 `&<span>amp</span>;` —— 浏览器不认，页面上原样显示 `&amp;`。实测于 Dan Koe 那篇的 "Buddhism & Christianity"（全库只有 2 句含 `&`）。
  现在按 `/(&(?:amp|lt|gt|quot);)/` 切段，实体段整体跳过。
  ⑦ **段落边界数据修复**：19 篇里 11 篇（成长类）是旧管线写的「一句一段」（1,519 个单句段），
  排版层救不回来 —— 对照原文 HTML 核实过：thedankoe 那篇 105 个 `<p>` 里 49 个是多句段，确实被拆过。
  新增一次性工具 `tools/_regroup-paras.mjs`：抓原文 → 归一化后把每句的前 40 字符前缀在原文流里顺序定位 → 同一 `<p>` 内的连续句子合并成 `{sentences:[…]}`。
  **只改分组，不改一个字**：写盘前校验「展开后的 (en, cn) 序列逐字节一致」，不一致就跳过该篇；命中率 < 85% 也跳过（防抓错页）。
  实跑 10 篇：1,254 句命中 1,246（99%），段落数 1,292 → 938（352 个多句段 + 单句段 476 + 配图 59）。
  剩 `gr-how-to-fix-your-entire-life-in-1-day`（266 句）源 URL 是 `http://localhost:8123/.tmp/oneoff/essay.html`（临时文件已不存在），保持单句段 —— 要修得先找到原文。
  写盘用 `createBatch` 建了批次，回滚：`node tools/rollback.mjs 20260914-141505`。
  **踩坑记录**：`_regroup-paras.mjs` 第一版的正则漏了 `(const ARTICLES_EXTRA = )` 那一组，
  写回时把声明头丢了 → 数据文件直接 `ReferenceError`。现在正则与重建方式抄 `ingest.mjs` 的写法，
  且**写盘前先用 `vm` 求值一遍重建结果**（丢声明头这类错误写入时不报错，只在页面加载时炸整站）。
  回归：`audit.js` 149 → **182/0**（新增 `[R]` 段：段落实拍断言 + 锚点数学 + 每篇位置独立 + 实体不被拆），
  `nav-test.js` 18/0、`smoke.js` `missingAssets: []`、`text-scan.js` 通过（段数 1689 → 997）、
  `release-test.mjs` 26/26、`sw-test.js` 8/8、`qc-test.mjs` 5/5、`push-test.mjs` 5/5、`examples-test.mjs` 28/28。
  ⚠️ 开工时 `release-test.mjs` 是 24/26：盘上有一个上一轮跑剩的 **label=publish 的测试批次** + 悬空 `LATEST`，
  按 label 认领的清理逻辑（只认 `release-test`）不认它，`preexisting` 分支又把它当「别人的真实批次」保留。
  清干净后连跑两次均 26/26 —— 但**「测试自建批次」的残留在特定时序下仍无人认领**，见遗留任务。
- ✅ **P0 一轮已上线（2026-09-14，commit `854e2e0`）**：推了 4 个文件 —— `assets/app.js`、`assets/styles.css`、
  `index.html`（`?v=45 → 46`，14 处）、`assets/data-articles-extra.js`（段落重分组）。线上逐字节校验通过
  （`GitHub Pages` 与本地四个文件的 sha1 完全一致；首页 14 处 `?v=46`）。截图留在 `tools/_spot/2026-09-14-reading/`。
- ⚠️ **部署工具的两处修正（2026-09-14，commit `5ca0cb1`，推翻了一条旧习惯）**：
  ① **`--manifest` 与 `--files` 现在可以并用**（合并两份清单）。旧版是 `if/else`，二者互斥 —— 而 `publish.mjs`
  的推送清单只覆盖 `SNAPSHOT_FILES`（数据层），`assets/app.js`、`assets/styles.css`、`index.html` **从来不在其中**，
  所以「批次含数据改动 + 手工改了代码」时只能用 `--files` 发代码、`--manifest` 发数据，**发两次**。
  更隐蔽的是：发布基线里的 `articles[]`（线上该有哪些文章）**只有 `--manifest` 路线会更新**。
  本次先只跑了 `--files`，于是它停在 `release-test` 播种时写的 **3 篇**上；`publish.mjs` 的 `added` / `dropped`
  都是拿 `prev.articles` 比的（`prev.files` 只用来算 push/delete），下次发布会误报「新增 16 篇」。
  已用 `updatePublished()` 把 `articles` 修回 19 篇（不手改 JSON），并把「两类改动一次发布」写成
  `--manifest auto --files "…"`。回归 `push-test.mjs` **5 → 9/9**（新增三条：并用时 `--files` 的文件也要过存在性闸、
  缺文件时点出的正是它、齐全时不被拦）。
  ② **`release-test.mjs` 的一条断言口径错了**：「收尾后 LATEST 还原到测试前的值」原先比
  `latestBatch(ROOT) === latestBefore`，但 `latestBatch()` 在指针缺失时会**回落到最新真实批次**（它的职责），
  于是「测试前本就没有 LATEST 文件」（`latestBefore === null`）时这条**恒不成立**，而实际行为完全正确 ——
  实测在这条上假失败（25/26）。改为直接比对**指针文件内容**（`latestAfter === latestBefore`），修后 26/26。
  顺带核实：那批 `D assets/covers/*.jpg` 的 git status 条目来自**本地落后的索引**（远端 175 个文件、
  `publish.mjs` 报 `coversMissing: []`），**不是**待删文件 —— 正是 `_api-push.mjs` 头部注释警告过的那个坑。

  `gr-a-complete-knowledge-base-of-human-3-0`（6,904 词）等长文维持整篇阅读 + 进度条 + 续读位置。
- ✅ **例句按需加载（2026-09-13 第三批）**：`data-examples.js`（560KB / gzip 225KB）从首屏
  移到按需 —— 它只在词卡展开「更多」后才可能被看到。前提是**它不参与任何计算**：
  `example`/`exampleCn` 无人读，被它覆盖的 `w.source` 也只有词卡 chip 读；实测摘掉后
  19 篇的词数 / 需学 / 低频占比 / 难度档 / 估时 / 推荐分**逐篇不变**（`audit.js` 的 `[G8]`
  钉住这条 —— 将来若有人在指标里读了 `w.example`，首屏不再加载例句库就会让首页悄悄算错，
  那条断言会立刻报警）。
  - 加载器 `ensureExamples()`：同一 Promise 复用（连续查词只插一次 script）；网络失败清缓存
    可重试；脚本到了但没数据判 `failed` 且不重插 —— 重复插会撞它顶层 `const WORD_EXAMPLES`
    的重复声明，只会刷一屏 SyntaxError。
  - 回填 `fillSheetExample()`：按 `data-example-word` 就地替换占位元素，不重渲整张卡。
    竞态由它天然解决：加载期间换词 / 关卡，旧词的回填找不到自己的槽位，插不到新词卡上。
  - 回归 `tools/examples-test.mjs` 28/28：首次 / 重复 / 失败重试 / 加载中换词 /
    例句库里没有的词 / 脚本到了没数据。
- ✅ **测试批次自愈（2026-09-13 第三批）**：实测抓到「一次中断让残留永久累积」——
  `release-test.mjs` 原先只删「测试开始快照之外的」目录，于是上一次被打断留下的测试批次，
  在后续每次运行里都被当成「别人的」保留（盘上积了 3 个，而每次运行都报「收尾干净」）。
  现在按 **label 认领**：`label === "release-test"` 一律清（真实发布 label 是 `publish`，
  不会误伤），并新增两条断言（残留自愈 / 真实批次不被误删）。`publish.mjs` 自建批次在校验
  失败时自清（线上零改动、快照无回滚价值），复用批次仍保留。`release-test.mjs` 26/26。
- ⏳ **测试自建批次的残留认领（2026-09-14 观察到）**：`release-test.mjs` 的 C 段有一处
  `runPublish(["--per-cat","25"])`（**故意不带 `--batch`**，用于验证「自建批次校验失败会自清」），
  `publish.mjs` 自建的批次 label 是 `publish`。清理逻辑按 label 只认 `release-test`，
  而 `preexisting` 分支又会把盘上已存在的 `publish` 批次当「别人的真实批次」保留 ——
  于是特定时序下会留下一个指向已删批次的 `LATEST`（开工时就是 24/26，实测清干净后连跑两次 26/26）。
  想根治：给测试自建的批次传一个可认领的 label（如 `--batch-label`），或让收尾按「本次运行创建过的 id 集合」删除。
  **2026-09-14 又发现同一处播种的第二个副作用**：`release-test` 收尾只还原 `published.json` 的 `files`，
  而它播种进去的 `articles`（当时 3 篇）会随收尾一起被写回 —— 若之后有人只跑 `--files` 推代码，
  这个错误值就一直留在发布基线里（已在部署记录里说明修法：走 `--manifest` 并用，或 `updatePublished()` 修）。
- ✅ **远端残留自动清理（2026-09-15）**：`publish.mjs` 出清单时多拉一次远端 tree，
  把「远端有、本地无」的差集补进 `delete[]` —— 旧算法只算「在 `published.json` 里但本地没有」，
  撤栏目 / 撤功能留下的残留从没进过基线，对它完全隐形（两轮实测：40 张孤儿封面 + 2 个「冲刺/快筛」文件
  全靠手写清单绕过）。判决规则、CI 提交的冲突与配套开关见 §4「远端残留自动清理」。
  新增 `lib-tree.mjs`（本地 / 远端共用的对账库，杜绝「两套尺子」）、`tree-diff.mjs`
  （判断「该推什么」，取代散在 `.tmp/probe/` 的临时脚本）、`remote-sweep-test.mjs`（31 条回归）；
  `_api-push.mjs` 删任何文件前自动备份到 `.bak/deleted-<日期>/`。
  顺手修掉 `release-test.mjs` 的一个假红：它的种子用 `19000101-*`（最小 id），`pruneBatches` 按 id 字典序
  丢「最旧的」，盘上批次一多，测试自己那几次发布就会把种子**乃至真实批次**清掉
  （实测 7 真实 + 2 种子 + 测试 4 次发布 = 13，越界即掉 3 个）——现在把窗口钉死 `--keep-batches 999`。
  回归：release-test 26/26（稳定）· remote-sweep 31/31 · audit 182/0 · nav 30/0 · sw 9/9 · push 9/9。
- ✅ **语义层修复批次（2026-09-15 深夜，用户「按你的意见来全部优化」）**：把当天的语义审计
  （`SEMANTIC-AUDIT-2026-09-15.md`）9 条建议全部落地。四块：
  ① **提取器**：`extractBlocks` 增收 `<li>`/`<h2>`/`<h3>`，`goodPara` 放开 30–70 字短句，
     `navRegions` 换成**深度配对的 `junkRegions`**（旧的非贪婪截断会把导航留成空壳继续漏），
     并补了站点外壳类 BOILER（check your inbox / mindful makers / Amazon 联盟声明…）。
  ② **中文层术语表**：新增 `term-glossary.json` + `lib-glossary.mjs` + `fix-cn.mjs`，
     规则**以英文原句为条件**（「阶段」既是 Phase 的正确译法又是 Level 的错译，无条件替换必误伤）。
     存量刷了 106+ 处 P0/P1（方向反转、release/rally/Recall 多义词、书名号小标题 ×9、
     Level↔层级、flow→心流、Vocation→天职、HUMAN 3.0 模型名不套书名号、片名归一）。
     幂等由 `lib-glossary.mjs` 加载期守卫保证（`to` 含 `from` 的写法直接抛错）。
  ③ **下架**：3 篇 fs.blog Knowledge Project 播客页（只有导语 + Amazon 联盟声明）—— 根因是
     `staticSkipReason` 的播客正则 `/\/podcast\//` 要求斜杠前缀，而实际路径是 `…-podcast/…`，
     **这条规则从来没命中过**；已改为按路径段匹配，并加 `ingest.mjs --prune` + `DROP_LIST` 清存量。
     线上 14 → **11 篇**，远端 186 → 171 个 blob。
  ④ **守卫**：`audit.js [G9]` 三道（术语表逐条回验 / 标题体句子不得套书名号 / 不得出现 localhost 链接），
     用**合成坏样本验证过会失败**（不是只验证「当前通过」）。
  回归：audit **185/0** · nav 30/0 · qc 11 篇 0 拒收 · text-scan 通过 · remote-sweep 31/31（发布后）
  · sw 9/9 · qc-test 5/5 · push 9/9 · examples 28/28 · recommend 16/0 · mt/text/classics/people 全绿。
  预发布期 `remote-sweep-test` 的「本地/远端引用一致」会**故意红一次**（本地已删、远端未推），
  这是预期状态，推送后自动转绿。
- ⏳ **P0 之后的两轮（用户 2026-09-14 规划）**：P0 一轮**已上线**（`854e2e0`，见上）；
  第二轮交互版（紧凑查词卡不遮暗全文、选中句工具条给出明确「译文」入口、生词标记强度三档、已认识词恢复普通颜色）；
  第三轮外围（缩短文章头部、读完优先进下一篇、桌面可调宽度居中正文）。
  验收方式用户定的是**同一篇长文试读 15–20 分钟**，比较「是否频繁调字号 / 查完词是否要找回原句 / 是否误触 / 是否容易读累」，**阅读速度只作参考**。
- ✅ **旧文整句漏译已修复（2026-09-15 语义层批次）**：原发现 thedankoe 一篇原文约 207 句、
  已发布只有 182 句，且 "I didn't want to be an NPC." 整句不在库里。根因有两条：
  ① 提取器只认 `<p>`/`<figure>`，**`<li>`/`<h2>`/`<h3>` 从未抽取**（实测 14 篇共漏 349 块 / 3,069 词）；
  ② `goodPara` 的 70 字符门槛把「以句末标点结尾的 30–70 字短句」整类丢掉（Dan Koe 的招牌短句、
  访谈里的 `<p><strong>Question?</strong></p>` 都栽在这）。修完后用 `ingest.mjs --refill`
  按「只增不改」补译回填：**14 篇共补 434 句（2,076 → 2,510 ），零原句丢失、零坏译**
  （LCS 对齐定位缺失句 + 写盘前断言「库内原句一字不少」，断言不过整篇跳过）。
  验收：`audit.js` 单体段守卫、`text-scan.js`、`qc.mjs --all` 全绿。
- ⏳ **成长栏目人工复核（2026-09-15 起）**：语义层只能人看，机器预检刻意只留高信噪比的
  数字 / 单向否定 / 标题 / 专名清单（放宽到「全部数字 + 双向否定」时命中率 35%，纯噪音 ——
  实测「单位凭空出现」这类新规则在 2,455 句上命中 253 处，全是误报，故不采纳）。
  流程：`node tools/spot-check.mjs` 生成 `tools/_spot/<日期>/`（逐句对照 + 三态模板 + 检查单），
  按检查单逐项过；检查单已补上本批次学到的失败模式（方向/主语反转、多义词按语境取义、术语统一）。
  术语统一这半边现在有机械兜底：`audit.js [G9]` 遍历 `term-glossary.json` 逐条回验。
- ⏳ **L3「真题高频验收」队列未接入**：数据 `tools/.examples-cache/cet4-sprint.json`（2159 词冲刺池）已入库，产品设想是考前验收模式（不背只测），未写任何前端代码。
- ⏳ **内容验收：结构已验干净，语义仍无人看**（标准 2026-09-13 调整）：
  机器能验的已验完 —— `qc.mjs --all` 19 篇合格 0 拒收；en/cn 句数逐篇配平、无重复标题、
  无空译文；W1「译文英文残留」原是误报（统计全部拉丁词，把公司名清单 AWS / Hugging Face /
  Unitree Robotics 判成漏译），已改成只数**小写起头**的词，现在 W1 归零。
  **11 篇成长文章缺 `scoreVersion`，F6 评分门被静默跳过** —— 但这**不等于「质量门全空」**：
  字段、译文结构、编码、封面等检查照跑，只是跳过了评分门槛；而且现有质量分主要来自
  长度 / 来源 / 图片规则，**补上评分也证明不了译文准确**。
  剩余 148 条 W2「段过短」是噪音（成长栏目是播客/访谈转写，短句天然多；真截断表现为
  **尾部缺失**，不是段短）。语义层（标题中译是否对应、人名机构名是否统一、有无整句漏译、
  有无中段截断、数字日期是否译错、配图是否贴在相关段落旁）**只能人工看**。
  抽查标准：先标明每篇是**全文**还是**节选** —— 全文查中间/结尾是否缺失；节选查起止边界
  是否完整、是否明确标注节选；两类都查标题、数字、否定关系、人名一致性、影响理解的错译。
  首轮抽 4 篇（最长成长文 + 另一来源的成长文 + 新闻 + 明星各一篇），报告分
  「通过／发现问题／未核实」三态并保留检查位置与依据。
  **5–10 分钟只能做抽样快检，不能据此保证长文全部准确**；发现系统性问题后再扩大到同源文章。
- ⏳ **首屏仍加载全量数据**：`data-examples.js` 560KB 已移出首屏（见上）；`data-tapdict.js`
  3.0MB 仍在首屏 —— 它**不是「阅读页词典」，而是难度指标的计算依赖**（实测摘掉后 55.8% 的
  token 失去解析、19/19 篇低频占比变化、10/19 篇难度档改变），所以不能简单挪走。离线仍是
  全站缓存、没有「下载本文」入口。
  想再拆，只有两条路：① 构建期预计算（`unknownRate` 是文本属性可离线算，`needLearn` 只需
  本篇去重后的学习词清单，运行时与 `S.known` 求交）；② 把 TAPDICT 按「成员表 / 释义」拆开。
  **无论走哪条，验收硬条件是「结果一致」** —— 用同一套计算函数、拿不同的「已认识词」集合
  对比新旧结果，确认难度、时长与推荐排序符合预期，并给缺预计算字段的旧文章留兼容分支。
  另外：即便指标拆完，**首页能否同时去掉 WORDS / ECDICT，还要单独查搜索、初始化等其它依赖**，
  不能因为「指标独立」就下结论。
  **收益必须同设备同网络前后对比**：同一台手机、同一网络、关缓存跑 3 次取中位数，看
  Network 面板的 transferred 总量与 `DOMContentLoaded`，前后各测一次。
  本机 vm 解析耗时（tapdict 81ms + app.js 108ms ≈ 0.24s）只是 CPU 侧参考，**不能代表手机**，
  更不能拿带宽换算当实测。
- ⏳ 观察项：足球栏目每日管线只保留近 3 天的效果；qc F2 时效 40 天比配额宽。
- 设计基调：零依赖、单文件 app.js、手机优先；改动保持这个形态，别引入框架/构建步骤。

## 7. 快速自检（接手后先跑一遍）

```bash
node tools/audit.js         # 期望当前 186/0 fail（含 G2 难度口径、G3 推荐稳定、G4 生词本按词匹配、G5 时长记账、G6 更新通知、G8 例句不参与计算、G9 术语表残留/标题书名号/localhost 链接、R 阅读排版与句子锚点）
node tools/nav-test.js      # 期望当前 30/0（2026-09-15 起；人物导航 7 条已加，旧口径 18/0）
node tools/smoke.js         # 跑通不抛错；打印统计 JSON（含 TAPDICT_size 38267、COMMON_WORDS_size 242）
node tools/release-test.mjs # 期望 26/26（自带还原保护；含清单基线、LATEST 悬空回落、发布基线还原、测试批次自愈）
node tools/sw-test.js       # 期望 9/9（离线无缓存必须给 Response，不能是 undefined）
node tools/qc-test.mjs      # 期望 5/5（空清单/目标 id 不存在都不能算通过）
node tools/push-test.mjs    # 期望 9/9（清单点名但本地不存在必须联网前 exit 2；--manifest 与 --files 并用时清单要合并）
node tools/remote-sweep-test.mjs # 期望 31/31（远端残留清理：keeper 豁免 / 删除前备份 / 无凭据降级）
node tools/examples-test.mjs # 期望 28/28（例句库按需加载：首次/复用/失败重试/换词竞态）
node tools/verify-live-test.mjs # 期望 18/18（本地假站点证明线上核验该红时会红；不联网）
node tools/text-scan.js     # 通过（乱码/漏译/结构；段数会随段落分组变化，2026-09-15 后为 1008）
python -m http.server 8123  # 浏览器打开 localhost:8123 应正常渲染
```
