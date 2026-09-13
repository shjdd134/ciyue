# 词阅 WordLens — Agent 交接手册

> 本文档写给接手本项目的 AI agent / 开发者。读完这一篇即可独立接管全部日常运维与功能开发。

## 0. 项目定位

**词阅 WordLens**：在线英语精读 App（备考 CET-4），零依赖纯静态 HTML/CSS/JS + Service Worker，手机壳布局。
- **线上**：https://shjdd134.github.io/ciyue/ （GitHub Pages，`shjdd134/ciyue` 仓库 main 分支）
- **当前工作树状态（2026-09-13）**：SW 策略 v43，词库全库 **4,082 词**（基础层 2,069 + 核心层 2,013），文章 **11 篇**（足球 2、AI 3、成长 3、明星 3；寓言入口保留但本次没有可用新来源），旧文章已按 `--replace` 清空并替换。11 篇均有封面（10 篇文章自带封面 + 1 篇由封面索引映射），另有点词翻译层约 38,267 词（阅读页任意单词点击查义）。缓存优先/1 小时新鲜窗/304 协商回落 + 保留上一代缓存作回退；v43 为移除旧背词状态后的发布缓存版本
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
│   ├── data-articles-extra.js  抓取文章正文
│   ├── data-covers.js          封面索引
│   ├── data-source-health.js  RSS/正文/图片来源健康度（自动生成）
│   ├── covers/                 文章配图（jpg，已压缩）
│   └── data-articles-archive.js 归档文章（不加载，仅存档）
└── tools/                      全部工具链（Node mjs / JS、少量 py）
    ├── build-core-vocab.mjs    生成核心层词库（四个数据源并集）
    ├── build-words-mid.mjs     生成基础层词库
    ├── _build-ecdict.mjs       生成 data-ecdict.js（依赖 .ecdict-blob.json 88MB）
    ├── build-tapdict.mjs       生成 data-tapdict.js 点词翻译层（同依赖 .ecdict-blob.json；词库换代后必须重跑，排除表=当前词库）
    ├── build-examples.mjs      生成 data-examples.js（依赖 .examples-cache/ 44MB）
    ├── ingest.mjs              文章抓取（RSS→翻译→落库），--append/--replace --quota --limit --days
    ├── recommend.mjs           推荐评分与来源健康度纯规则层
    ├── recommend-test.mjs      推荐评分/熔断恢复单元测试
    ├── daily.mjs               GitHub Actions 每日更新入口（定时抓新文章）
    ├── translate-titles.mjs    标题中文翻译回填（--dry / --redo / --only）
    ├── lib-mt.mjs              翻译共用库：DeepL 主力→有道兜底→MyMemory 末位
    ├── lib-text.mjs            文本清洗共用库（占位符/广告段/缩写/命名实体）
    ├── text-scan.js / fix-text.mjs  正文体检与回填
    ├── audit.js                回归①：数据与逻辑断言（130+ 条）
    ├── nav-test.js             回归②：导航流 19 条
    ├── smoke.js                回归③：加载链冒烟
    ├── qc.mjs                  文章质量体检（时效/封面/段数/推荐评分门禁）
    ├── _api-push.mjs           ★ 部署推送（Git Data API 增量提交，见 §4）
    ├── _cred-get.py            读取 GitHub 凭据（Windows 凭据管理器，勿删）
    ├── .deepl-key              DeepL Free API key（明文，勿提交、勿外传）
    ├── .ecdict-blob.json       ECDICT 全量语料 88MB（gitignored，词库重建必需）
    ├── .examples-cache/        例句/词表多源缓存 44MB（gitignored，重建必需）
    ├── .mt-cache.json          翻译缓存 500KB
    └── _aesop-raw.html         寓言源（Gutenberg #11339），_ingest-fables.mjs 用
```

## 2. 铁律（违反即坏，历史踩坑都在这）

1. **加载链顺序不可乱**（index.html 全 defer）：`data.js → data-words-bulk-a.js → data-words-full.js → data-words-mid.js → data-articles-extra.js → data-examples.js → data-ecdict.js → data-tapdict.js → app.js`。背词/复习功能已移除，`vendor-fsrs.js` 不在加载链且缺失属于预期；新增数据脚本必须带 defer 且插在依赖它之前的位置。
2. **词库重建链顺序不可乱**：`build-core-vocab.mjs → build-words-mid.mjs → _build-ecdict.mjs → build-examples.mjs`（后两者把词表作为输入刷新元数据/例句）。
3. **语料词频不能当排序主轴**。实测把 the/and/league 顶到前排、难度单调性 100%→51%。现行排序 = ①层（基础层先、核心层后）②层内真题高频（hf/cv 标记）整块提前 ③语料词频爬坡 ④每 20 词单元内 FNV-1a 确定性打散。单元打散必须**层内**做。
4. **绝不能用 ECDICT 的 `t` 考纲标签**判定词的学历层级——那是覆盖关系不是学历关系（compensate f=5037 也挂着 gk）。判层唯一依据 `list==="中学基础"`。
5. **涉及静态资源结构变更时递增 sw.js 缓存名** `wordlens-cache-vN`；普通内容更新由缓存的后台协商完成。若用户仍看到旧页面，先硬刷新一次。
6. **英文正文禁改写**，只做清洗（lib-text.mjs）；标题翻译的人工校对表在 translate-titles.mjs 的 TITLE_FIXES。
7. 基础层词的例句兜底字段是 `collocation`/`collocationCn`（源词典只给短语无完整句），不是所有词都有 `example`。
8. 文章 `paras` 兼容两种形状：旧文章使用 `{en,cn}`，新抓取文章使用 `{sentences:[{en,cn},...]}`；图片块仍为 `{img,cap}`。使用 `--replace` 更新时不要把旧文章重新混回结果。

## 3. 词库口径（改动前必读）

- **核心层 2,013 词** 四源并集：① ECDICT 语料 f≤2500 ② liut969/CET 真题高频 1250 词（经词形还原）③ data.js 手工精编 30 词（全保留，词根词缀助记是招牌内容）④ `tools/.examples-cache/cet4-gaps-general.json` 通用高频向缺口 20 词（2026-09-11 用户拍板口径：**只收通用语料高频的缺口词，真题高频但通用语料中低频的 201 词明确不收**，勿再问）。
- **基础层 2,069 词** = (初中 ∪ 高中) − 核心层 − 功能词。
- 背词、复习、快筛和学习起点功能已移除；四级词库及阅读页点词查义、生词本仍保留。
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
# 抓新文章（足球/AI/明星/成长走 RSS，寓言走公版静态导入）
node tools/ingest.mjs --append --quota "足球=3,AI=3,明星=2,成长=2" --limit 10 --days 30   # --dry 预览；全量替换用 --replace
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

- ✅ 已上线：两层词库 4,082 词、通用高频缺口 20 词（v28）、点词翻译层（v30，阅读页任意单词点击查义：词库词完整卡可入生词本，词库外词轻量卡只给释义）、阅读页同一篇文章的重渲染保留滚动位置（v33）、文章替换与配图清理、成长栏目与配图修复（v35-v39）、SW 缓存优先与「上次读到」（v37）、批次化段落兼容（新抓取文章按段分组；app.js / ingest / 清洗 / 质检链双格式兼容）、推荐与阅读反馈、每日自动更新。背词/复习/快筛/学习起点入口与交互已移除；保留词库、点词查义、已认识标记和阅读生词本。历史备份中的 studied/wrong/daily/fsrs/studyDays 仅作导入兼容，读取后不再进入运行状态。2026-09-13 已按 `--replace` 清空旧文章并按既有规则更新为 11 篇。
- ✅ 推荐系统阶段 1：新抓文章写入质量分、基础难度分和服务端初始分；质量低于 65 不进入候选池；RSS/正文/图片健康度独立记录，RSS/正文连续失败 3 次熔断、连续成功 3 次恢复。历史文章暂不回写评分字段，保持数据不迁移。
- ⏳ **L3「真题高频验收」队列未接入**：数据 `tools/.examples-cache/cet4-sprint.json`（2159 词冲刺池）已入库，产品设想是考前验收模式（不背只测），未写任何前端代码。
- ⏳ 观察项：足球栏目每日管线只保留近 3 天的效果；qc F2 时效 40 天比配额宽。
- 设计基调：零依赖、单文件 app.js、手机优先；改动保持这个形态，别引入框架/构建步骤。

## 7. 快速自检（接手后先跑一遍）

```bash
node tools/audit.js        # 期望当前 114/0 fail
node tools/nav-test.js     # 期望当前 18/0
node tools/smoke.js        # 跑通不抛错；打印统计 JSON（含 TAPDICT_size 38267）
python -m http.server 8123 # 浏览器打开 localhost:8123 应正常渲染
```
