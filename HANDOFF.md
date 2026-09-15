# 词阅 WordLens — Agent 交接手册

> 本文档写给接手本项目的 AI agent / 开发者。读完这一篇即可独立接管全部日常运维与功能开发。

## 0. 项目定位

**词阅 WordLens**：在线英语精读 App（备考 CET-4），零依赖纯静态 HTML/CSS/JS + Service Worker，手机壳布局。
- **线上**：https://shjdd134.github.io/ciyue/ （GitHub Pages，`shjdd134/ciyue` 仓库 main 分支）
- **当前工作树状态（2026-09-14 晚）**：SW 策略 v43，资源版本号 `?v=46`（2026-09-14 阅读体验一轮后从 44 提升），词库全库 **4,082 词**（基础层 2,069 + 核心层 2,013），文章 **40 篇**（足球 2、AI 3、成长 11、明星 24 —— 明星已改为历史通道经典专题，见下；寓言入口保留但当前清空）。误执行 `--replace` 后已从远端事故前版本恢复原有 11 篇成长文章及配图。缓存优先/1 小时新鲜窗/304 协商回落 + 保留上一代缓存作回退；v43 为移除旧背词状态后的发布缓存版本

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
    ├── publish.mjs             ★ 发布：计划 → 暂存校验 → 提交，产出批次清单
    ├── rollback.mjs            ★ 回滚 CLI（--list / latest / 指定批次）
    ├── release-test.mjs        ★ 发布可靠性回归（完整回滚 / 置顶豁免 / 校验门禁 / 清单基线 / 批次自愈，自还原）
    ├── examples-test.mjs       例句按需加载回归（首次 / 复用 / 失败重试 / 加载中换词）
    ├── spot-check.mjs          人工抽查材料：逐句对照页 + 四项高信噪比预检（输出 tools/_spot/）
    ├── _regroup-paras.mjs      一次性修复（2026-09-14）：按原文 HTML 把「一句一段」的旧文重分组；
    │                           只改分组不改文字（写盘前校验 en/cn 序列一致），--dry / --apply / --show / --only
    ├── sw-test.js              Service Worker 离线与缓存路径回归（离线无缓存不能交出 undefined）
    ├── qc-test.mjs             质检门禁语义回归（空清单 / 目标 id 不存在都不算通过）
    ├── push-test.mjs           上传清单闸门回归（清单点名文件缺失必须在联网前中止）
    ├── translate-titles.mjs    标题中文翻译回填（--dry / --redo / --only）
    ├── lib-mt.mjs              翻译共用库：DeepL 主力→有道兜底→MyMemory 末位（文章上下文 + 隔离缓存）
    ├── mt-test.mjs             翻译上下文 / 缓存隔离回归
    ├── text-test.mjs           译文原样回显过滤回归
    ├── classics-test.mjs       明星经典图集偏好排序回归
    ├── lib-text.mjs            文本清洗共用库（占位符/广告段/缩写/命名实体）
    ├── text-scan.js / fix-text.mjs  正文体检与回填
    ├── audit.js                回归①：数据与逻辑断言（140+ 条）
    ├── nav-test.js             回归②：导航流 18 条
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
11. **发布相关改动的验收标准是 `node tools/release-test.mjs` 全绿**（当前 26/26；`sw-test.js` 8/8、`qc-test.mjs` 5/5、`push-test.mjs` 5/5、`examples-test.mjs` 28/28 管失败与边界路径）。它自带还原保护，可以放心在有改动的树上跑，但它会把你的改动一并还原，所以跑之前先提交或另存。
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

## 5. 日常操作

```bash
# 抓新文章（足球/AI/明星/成长走 RSS，寓言走公版静态导入）
node tools/ingest.mjs --append --quota "足球=3,AI=3,明星=2,成长=2" --limit 10 --days 30   # --dry 预览；全量替换用 --replace
node tools/translate-titles.mjs --dry        # 标题翻译回填
node tools/text-scan.js --full               # 正文体检；有问题则 fix-text.mjs --dry 后去掉 --dry
node tools/qc.mjs --ids-file .tmp/new-ids.txt  # 文章质量体检（不带参数会直接报错）

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
node tools/sw-test.js                        # SW 离线/缓存路径，期望 8/8
node tools/qc-test.mjs                       # 质检门禁语义，期望 5/5
node tools/push-test.mjs                     # 上传清单闸门，期望 5/5

# 词库改动后完整重建（顺序见铁律 2）+ 词频表与点词层重跑（排除表=当前词库）+ 回归
node tools/build-wordfreq.mjs && node tools/build-tapdict.mjs
node tools/audit.js && node tools/nav-test.js && node tools/smoke.js
```

- 每日自动更新由 GitHub Actions（`.github/workflows/daily.yml`）定时跑 `daily.mjs`，无需人工干预。
- 可用源清单与被墙名单（BBC/Guardian/NPR 可用性等）写在 `ingest.mjs` FEEDS 注释与会话记忆里； ESPN/Smithsonian 需 Googlebot UA。
- 改数据源后记得同步：build 脚本顶部注释 + README「数据来源」段 + App「关于」区块。

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
- ⏳ **P0 之后的两轮（用户 2026-09-14 规划）**：P0 一轮**已上线**（`854e2e0`，见上）；
  第二轮交互版（紧凑查词卡不遮暗全文、选中句工具条给出明确「译文」入口、生词标记强度三档、已认识词恢复普通颜色）；
  第三轮外围（缩短文章头部、读完优先进下一篇、桌面可调宽度居中正文）。
  验收方式用户定的是**同一篇长文试读 15–20 分钟**，比较「是否频繁调字号 / 查完词是否要找回原句 / 是否误触 / 是否容易读累」，**阅读速度只作参考**。
- ⏳ **旧文可能有整句漏译（2026-09-14 发现，未处理）**：对照原文 HTML 抽查 thedankoe 那篇，
  原文 105 个 `<p>` 拆句约 207 句，而已发布数据只有 182 句；抽查到原文 "I didn't want to be an NPC."
  在已发布数据中不存在。这不是排版问题，是旧管线的内容丢失，属第三轮内容质量。核实方法：
  按 `_regroup-paras.mjs` 的定位逻辑逐句比对原文，统计每篇缺失句数与缺失位置。
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
node tools/audit.js         # 期望当前 182/0 fail（含 G2 难度口径、G3 推荐稳定、G4 生词本按词匹配、G5 时长记账、G6 更新通知、R 阅读排版与句子锚点）
node tools/nav-test.js      # 期望当前 18/0
node tools/smoke.js         # 跑通不抛错；打印统计 JSON（含 TAPDICT_size 38267、COMMON_WORDS_size 242）
node tools/release-test.mjs # 期望 26/26（自带还原保护；含清单基线、LATEST 悬空回落、发布基线还原、测试批次自愈）
node tools/sw-test.js       # 期望 8/8（离线无缓存必须给 Response，不能是 undefined）
node tools/qc-test.mjs      # 期望 5/5（空清单/目标 id 不存在都不能算通过）
node tools/push-test.mjs    # 期望 9/9（清单点名但本地不存在必须联网前 exit 2；--manifest 与 --files 并用时清单要合并）
node tools/examples-test.mjs # 期望 28/28（例句库按需加载：首次/复用/失败重试/换词竞态）
node tools/text-scan.js     # 通过（乱码/漏译/结构；段数会随段落分组变化，2026-09-14 后为 997）
python -m http.server 8123  # 浏览器打开 localhost:8123 应正常渲染
```
