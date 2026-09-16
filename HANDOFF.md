> 2026-09-16 当前策略：每日自动采集只跑足球 RSS 与人物审核队列；成长存量保留但 RSS 暂停，AI 与旧明星采集停用。人物明确排除赞达亚。见 [PEOPLE-COLUMN.md](PEOPLE-COLUMN.md)。用户已授权本项目修改验证后直接推送 main。

# 词阅 WordLens — Agent 交接手册

> 本文档写给接手本项目的 AI agent / 开发者。读完这一篇即可独立接管全部日常运维与功能开发。

## 0. 项目定位

**词阅 WordLens**：在线英语精读 App（备考 CET-4），零依赖纯静态 HTML/CSS/JS + Service Worker，手机壳布局。
- **线上**：https://shjdd134.github.io/ciyue/ （GitHub Pages，`shjdd134/ciyue` 仓库 main 分支）
- **当前工作树状态（2026-09-14 晚）**：SW 策略 v43，资源版本号 `?v=46`（2026-09-14 阅读体验一轮后从 44 提升），词库全库 **4,082 词**（基础层 2,069 + 核心层 2,013），文章 **40 篇**（足球 2、AI 3、成长 11、明星 24 —— 明星已改为历史通道经典专题，见下；寓言入口保留但当前清空）。误执行 `--replace` 后已从远端事故前版本恢复原有 11 篇成长文章及配图。缓存优先/1 小时新鲜窗/304 协商回落 + 保留上一代缓存作回退；v43 为移除旧背词状态后的发布缓存版本
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
    ├── lib-mt.mjs              翻译共用库：DeepL 主力→有道兜底→MyMemory 末位（文章上下文 + 版本化缓存 + 引擎记录）
    ├── mt-test.mjs             翻译上下文 / 缓存隔离 / 源语言与引擎元数据回归
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
