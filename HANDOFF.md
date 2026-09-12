# 词阅 WordLens — Agent 交接手册

> 本文档写给接手本项目的 AI agent / 开发者。读完这一篇即可独立接管全部日常运维与功能开发。

## 0. 项目定位

**词阅 WordLens**：在线英语精读 App（备考 CET-4），零依赖纯静态 HTML/CSS/JS + Service Worker，手机壳布局。
- **线上**：https://shjdd134.github.io/ciyue/ （GitHub Pages，`shjdd134/ciyue` 仓库 main 分支）
- **当前版本**：sw v35，词库全库 **4,082 词**（基础层 2,069 + 核心层 2,013），文章 **34 篇**（足球 9 = 2026-09-11 当天 + **成长 10** = 独立博主长文全文（v35 新增栏目，Dan Koe / Farnam Street / More To That / Ness Labs）+ 寓言 15；AI/明星已清空待每日回补，历史源断供），另有点词翻译层 38,267 词（阅读页任意单词点击查义）
- **运行环境**：Node ≥22（只用内置模块，无 npm 依赖）、Python 3.12+（仅 Pillow 用于压图）。本地起服务任意静态服务器即可，如 `python -m http.server 8123`。

## 1. 目录地图

```
├── index.html                  入口。<script defer> 加载链顺序是铁律，见 §2
├── sw.js                       Service Worker，缓存名 wordlens-vN，改任何静态资源必须 bump
├── manifest.webmanifest        PWA 清单
├── assets/
│   ├── app.js                  全部业务逻辑（单文件 ~2000 行，无框架）
│   ├── styles.css              全部样式
│   ├── vendor-fsrs.js          FSRS 间隔重复算法（vendored，勿动）
│   ├── fonts.css / 字体文件    本地化字体
│   ├── data.js                 内置文章 + WORDS_CORE 手工精编词
│   ├── data-words-bulk-a.js    核心层词库 A 段（生成产物）
│   ├── data-words-full.js      核心层词库 B 段（生成产物）
│   ├── data-words-mid.js       基础层词库（生成产物）
│   ├── data-examples.js        例句库（生成产物，~600KB）
│   ├── data-ecdict.js          ECDICT 元数据 WORD_META（生成产物）
│   ├── data-tapdict.js         点词翻译层 TAPDICT/TAP_REVERSE（生成产物，~2MB，阅读页点词查义）
│   ├── data-articles-extra.js  抓取文章正文
│   ├── data-covers.js          封面索引
│   ├── covers/                 文章配图（jpg，已压缩）
│   └── data-articles-archive.js 归档文章（不加载，仅存档）
└── tools/                      全部工具链（Node mjs / JS、少量 py）
    ├── build-core-vocab.mjs    生成核心层词库（四个数据源并集）
    ├── build-words-mid.mjs     生成基础层词库
    ├── _build-ecdict.mjs       生成 data-ecdict.js（依赖 .ecdict-blob.json 88MB）
    ├── build-tapdict.mjs       生成 data-tapdict.js 点词翻译层（同依赖 .ecdict-blob.json；词库换代后必须重跑，排除表=当前词库）
    ├── build-examples.mjs      生成 data-examples.js（依赖 .examples-cache/ 44MB）
    ├── ingest.mjs              文章抓取（RSS→翻译→落库），--append --quota --limit --days
    ├── daily.mjs               GitHub Actions 每日更新入口（定时抓新文章）
    ├── translate-titles.mjs    标题中文翻译回填（--dry / --redo / --only）
    ├── lib-mt.mjs              翻译共用库：DeepL 主力→有道兜底→MyMemory 末位
    ├── lib-text.mjs            文本清洗共用库（占位符/广告段/缩写/命名实体）
    ├── text-scan.js / fix-text.mjs  正文体检与回填
    ├── audit.js                回归①：数据与逻辑断言（130+ 条）
    ├── nav-test.js             回归②：导航流 19 条
    ├── smoke.js                回归③：加载链冒烟
    ├── qc.mjs                  文章质量体检（时效/封面/段数）
    ├── _api-push.mjs           ★ 部署推送（Git Data API 增量提交，见 §4）
    ├── _cred-get.py            读取 GitHub 凭据（Windows 凭据管理器，勿删）
    ├── .deepl-key              DeepL Free API key（明文，勿提交、勿外传）
    ├── .ecdict-blob.json       ECDICT 全量语料 88MB（gitignored，词库重建必需）
    ├── .examples-cache/        例句/词表多源缓存 44MB（gitignored，重建必需）
    ├── .mt-cache.json          翻译缓存 500KB
    └── _aesop-raw.html         寓言源（Gutenberg #11339），_ingest-fables.mjs 用
```

## 2. 铁律（违反即坏，历史踩坑都在这）

1. **加载链顺序不可乱**（index.html 全 defer）：`data.js → data-words-bulk-a.js → data-words-full.js → data-words-mid.js → data-articles-extra.js → data-examples.js → data-ecdict.js → data-tapdict.js → vendor-fsrs.js → app.js`。新增数据脚本必须带 defer 且插在依赖它之前的位置。
2. **词库重建链顺序不可乱**：`build-core-vocab.mjs → build-words-mid.mjs → _build-ecdict.mjs → build-examples.mjs`（后两者把词表作为输入刷新元数据/例句）。
3. **语料词频不能当排序主轴**。实测把 the/and/league 顶到前排、难度单调性 100%→51%。现行排序 = ①层（基础层先、核心层后）②层内真题高频（hf/cv 标记）整块提前 ③语料词频爬坡 ④每 20 词单元内 FNV-1a 确定性打散。单元打散必须**层内**做。
4. **绝不能用 ECDICT 的 `t` 考纲标签**判定词的学历层级——那是覆盖关系不是学历关系（compensate f=5037 也挂着 gk）。判层唯一依据 `list==="中学基础"`。
5. **改任何静态资源（含数据 js）必须 bump sw.js 缓存名** `wordlens-vN`，否则线上用户永远拿旧缓存。
6. **英文正文禁改写**，只做清洗（lib-text.mjs）；标题翻译的人工校对表在 translate-titles.mjs 的 TITLE_FIXES。
7. 基础层词的例句兜底字段是 `collocation`/`collocationCn`（源词典只给短语无完整句），不是所有词都有 `example`。

## 3. 词库口径（改动前必读）

- **核心层 2,013 词** 四源并集：① ECDICT 语料 f≤2500 ② liut969/CET 真题高频 1250 词（经词形还原）③ data.js 手工精编 30 词（全保留，词根词缀助记是招牌内容）④ `tools/.examples-cache/cet4-gaps-general.json` 通用高频向缺口 20 词（2026-09-11 用户拍板口径：**只收通用语料高频的缺口词，真题高频但通用语料中低频的 201 词明确不收**，勿再问）。
- **基础层 2,069 词** = (初中 ∪ 高中) − 核心层 − 功能词。
- `DAILY_GOAL = 28`（app.js 常量，按 99 天备考期反推）。
- 学习起点/摸底功能已在 sw v29 删除：新词队列恒为全库路径，已会词走首页「快筛」入口（不占每日额度）。
- 数据源许可：KyleBing/english-vocabulary 与 kajweb/dict **无许可证（非商用可接受，商用有风险）**；Tatoeba CC-BY 2.0 可商用需署名；exam-data/CETVocabulary CC BY-NC-SA 4.0。来源声明已写入 README 与 App「关于」。

## 4. 部署（重要：git push 不可用）

**本机 `github.com` 的 git 协议被墙（schannel 中断），所有提交走 Git Data API**：

```bash
GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs "提交信息" --only "assets/app.js,sw.js"
```

- `--only` 是显式白名单，逐个列出改动文件；先 `git config status.showUntrackedFiles all` 再推可避免未跟踪目录被静默跳过，推完改回 `false`。
- 推完用 Actions API 确认 `daily-update` workflow `completed success`。
- ⚠️ 本仓库 git 历史不完整（交接基线 f64e060 只是快照），**远端 shjdd134/ciyue 才是唯一权威**，别用本地历史做 diff 基线——要 diff 线上版本就从 contents API 拉远端文件。
- 仓库 `tools/.examples-cache/` 下三个白名单 json（cet4-hf / cet4-sprint / cet4-gaps-general）随版本走，其余缓存全部 gitignored。
- 凭据：`python tools/_cred-get.py git` 从 Windows 凭据管理器取 GitHub token（本机有效）；DeepL key 在 `tools/.deepl-key`。

## 5. 日常操作

```bash
# 抓新文章（足球/历史/AI/明星走 RSS，寓言走公版静态导入）
node tools/ingest.mjs --append --quota "足球:3,历史:2,AI:3,明星:2" --limit 10 --days 30   # --dry 预览
node tools/translate-titles.mjs --dry        # 标题翻译回填
node tools/text-scan.js --full               # 正文体检；有问题则 fix-text.mjs --dry 后去掉 --dry
node tools/qc.mjs                            # 文章质量体检

# 词库改动后完整重建（顺序见铁律 2）+ 点词层重跑（排除表=当前词库）+ 回归
node tools/build-tapdict.mjs
node tools/audit.js && node tools/nav-test.js && node tools/smoke.js
```

- 每日自动更新由 GitHub Actions（`.github/workflows/daily.yml`）定时跑 `daily.mjs`，无需人工干预。
- 可用源清单与被墙名单（BBC/Guardian/NPR 可用性等）写在 `ingest.mjs` FEEDS 注释与会话记忆里； ESPN/Smithsonian 需 Googlebot UA。
- 改数据源后记得同步：build 脚本顶部注释 + README「数据来源」段 + App「关于」区块。

## 6. 现状与遗留任务

- ✅ 已上线：两层词库 4,082 词、通用高频缺口 20 词（v28）、摸底功能删除（v29）、点词翻译层（v30，阅读页任意单词点击查义：学习词完整卡可入生词本，词库外词轻量卡只给释义不入学习流）、背词队列断点接续 + 阅读页查词卡免整页渲染 + 真机读毕卡不被 .fab-bar 遮挡（v31）、标认识的词不再进背词新词队列与快筛（v32，resumePos/advanceQueue/quick-sieve/首页计数四处同口径）、阅读页同一篇文章的重渲染保留滚动位置（v33，字号/中英对照/护眼/打卡不再甩回开头，靠 .read-scroll[data-art] 前后比对；下一篇/换文仍回顶）、存量文章清理（v34，足球仅留 09-11 当天 9 篇，AI/明星清空，内置种子文删除，管线配额不动照常回补）、成长栏目（v35，独立博主英文长文全文：Dan Koe / Farnam Street / More To That / Ness Labs，`full` 不截断、常青内容 `days` 放宽、扁平 URL `flatUrl`，get() 403 自动降级短 UA；全栏目配图上限 2→4、选文按 RSS 带图数优先，ingest 新增 `--verbose` 逐条跳过原因）、FSRS 复习、每日自动更新。
- ⏳ **L3「真题高频验收」队列未接入**：数据 `tools/.examples-cache/cet4-sprint.json`（2159 词冲刺池）已入库，产品设想是考前验收模式（不背只测），未写任何前端代码。
- ⏳ 观察项：足球栏目每日管线只保留近 3 天的效果；qc F2 时效 40 天比配额宽。
- 设计基调：零依赖、单文件 app.js、手机优先；改动保持这个形态，别引入框架/构建步骤。

## 7. 快速自检（接手后先跑一遍）

```bash
node tools/audit.js        # 期望 144/0 fail
node tools/nav-test.js     # 期望 19/0
node tools/smoke.js        # 跑通不抛错；打印统计 JSON（含 TAPDICT_size 38267）
python -m http.server 8123 # 浏览器打开 localhost:8123 应正常渲染
```
