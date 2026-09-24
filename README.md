> 当前范围（2026-09-24）：**RSS 采集全部停用**，每日自动采集只剩人物 · Icons（最多 1 篇）。线上 13 篇 = 成长 4（Dan Koe + Paul Graham 三篇社区译本）+ 人物 5（Anne Hathaway + Icons 4）+ 足球 4（2026-09-17 的存量投入，RSS 已停采）。**AI 栏目（Offbook Press 官方中英双语 5 期）与人物「梅根·福克斯」1 篇已于 2026-09-24 一并下架**（用户决定，全库 19 → 13 篇；AI 通道 `tools/offbook.mjs` 的 `ESSAYS` 已摘空）。旧明星采集停用。人物配置与维护见 [人物栏目说明](PEOPLE-COLUMN.md)。

# 词阅 WordLens

四级词库查义 + 英文原刊双语阅读。纯静态 Web 应用，零依赖、零构建、可离线，手机浏览器打开即用。

在线地址：https://shjdd134.github.io/ciyue/

## 功能

- **四级词库查义**：保留完整词库、音标、词根词缀、真实例句；正文**任意单词可点查释义**
- **原刊精读**：逐句点读、逐句对照译文、整段显译、生词一键收藏；词库外词弹轻量释义卡
- **阅读生词本**：只收集阅读中遇到的词，支持从「我的」或文章内打开查看
- **阅读记录**：记录打开过的文章、最近阅读时间、完成状态和百分比；可按状态/关键词筛选，点击现有文章直接续读
- **内容栏目**：足球 / 成长（英文长文，整篇收录）/ 寓言 / 人物 · Icons（公开原刊全文与摄影）；**每日自动采集现在只更新人物（最多 1 篇）**——足球 RSS 已于 2026-09-17 停采（存量足球文 4 篇仍在线上），成长现有内容不动，旧明星采集停用。**AI 栏目（Offbook Press 官方中英双语）已于 2026-09-24 整栏下架**，入口与文章一并撤除
- **本地优先**：阅读进度只存在浏览器本地，可导出 / 导入备份；错误格式会被拒绝，不会覆盖现有记录
- **离线阅读**：首次在线打开后自动预热应用壳和数据资源，Service Worker 当前版本优先并保留旧版本回退
- **三套配色**：深色 / 浅色 / 纸质

## 数据来源与版权

本项目是**个人非商业学习项目**——不售卖、不投放广告、不提供付费服务。所有第三方数据版权归各自权利人所有。

### 单词语料

词库分**两层**，共 4,082 词。分层的起因：四级核心库默认你已经掌握中学词汇，而这个前提对不少用户并不成立 —— 实测核心库缺 2,000+ 个中学词，且集中在 `lecture` / `campus` / `vocabulary` / `period` 这类校园与考试场景词（它们在通用新闻语料里天然低频，被「语料词频」这道筛子整片滤掉）。

| 层 | 规模 | 口径 | 脚本 |
| --- | --- | --- | --- |
| **基础层**（先学） | 2,069 | (初中 ∪ 高中词库) − 核心层 − 纯功能词 | `tools/build-words-mid.mjs` |
| **核心层**（后学） | 2,013 | 见下 | `tools/build-core-vocab.mjs` |

核心层从四级大纲（4454 词）按三条并集筛出：

| 口径 | 说明 |
| --- | --- |
| ① 语料高频 | ECDICT 当代语料词频 f ≤ 2500（5 万词级语料统计） |
| ② 真题高频 | [liut969/CET](https://github.com/liut969/CET)《英语四级真题高频词汇》1250 词（近 5 年 30 套真题逐词统计） |
| ③ 手工精编 | 项目早期精编的 30 个词（词根词缀 / 同根词 / 助记） |
| ④ 通用高频向缺口词 | 冲刺池反查：通用语料 f ≤ 2500 但词表漏掉的 20 词（perspective / revenue / context …），2026-09-11 定口径 |

已剔除纯功能词（the / of / to …）。另用真题表反查并补回了原词库缺失的常用词（people / part / pay 这类约 80 词）。

基础层里 333 个词带**真题高频**标记（真题表出现次数 / 试卷词频），在基础层内优先排 —— 它们考试真的会考到。

| 数据 | 来源 | 许可 |
| --- | --- | --- |
| 词频、音标、词形变化、考纲标签、点词释义 | [ECDICT](https://github.com/skywind3000/ECDICT) | MIT |
| 常见词表（判断词库外的词是否常见，依据同一套词频） | [ECDICT](https://github.com/skywind3000/ECDICT) | MIT |
| 真题词频（核心词筛选依据） | [liut969/CET](https://github.com/liut969/CET) | 作者免费公开 |
| 试卷词频（真题高频标记依据） | [exam-data/CETVocabulary](https://github.com/exam-data/CETVocabulary) | 数据 CC BY-NC-SA 4.0 / 代码 MIT |
| 中学分级词库（基础层） | [KyleBing/english-vocabulary](https://github.com/KyleBing/english-vocabulary) | 作者声明供学习使用 |
| 单词例句与中文对照 | [KyleBing/english-vocabulary](https://github.com/KyleBing/english-vocabulary) | 作者声明供学习使用 |
| 双语例句补充 | [Tatoeba](https://tatoeba.org)（经 manythings.org 打包） | CC-BY 2.0 |
| 兜底例句 | 本项目文章库的原刊原句 | 见下 |

例句生成逻辑见 `tools/build-examples.mjs`：按「分级词典词库 → Tatoeba → 原刊原句」的优先级取第一条，只填补没有例句的词。

### 阅读文章

足球文章曾来自 Sky Sports、FourFourTwo RSS，**该源已于 2026-09-17 停采并撤下全部足球文**（原因见下）；成长现有文章来自此前的公开 RSS，当前暂停新增；寓言为公版文本；人物 · Icons 来自 AnOther、Vogue、British Vogue 等媒体公开页面。人物正文按原刊段落提取，广告、导航和推广块过滤，图片保留来源与摄影署名，正文页保留指向原文的外链。

**足球为何停采**：同一个来源好坏混杂，只能事后质检剔。停采前最后一篇 `ft-manchester-united-…` 的正文 21 段里，**前 10 段全是 FourFourTwo 会员/订阅推广模板**（"Fancy some of this?" / "Your membership journey starts here." / "Quick quizzes for football fans." …），只有后 11 段是报道；而同一批的 `ft-arsenal-…` 却是正常转会报道。长度与形态闸对这种整句级推广毫无办法，收益不抵维护成本。停采后 `tools/ingest.mjs` 的 `FEEDS` 为空，文章入口只剩人物通道。

人物图片说明保留英文原文，阅读页中的词可直接点查；赞达亚在人物排除名单中，不会进入候选或文章库。

### 译文

新增文章的机器翻译优先使用 DeepL，失败项交给已配置的阿里云百炼 Qwen-MT（默认 `qwen-mt-plus`）；不再使用有道或 MyMemory。DeepL 接收文章标题、来源及前后句作为上下文，Qwen-MT 将这些背景通过 `translation_options.domains` 传入，每次只翻译一个句子以保持对齐。缓存按文章、文本方案版本隔离，记录引擎及 Qwen 模型，拒绝来源不明和停用引擎的缓存。后处理只做格式清理，足球老板/主帅等术语由英文条件规则校正；译文会做句数、空译、原文回显和数字告警检查，Qwen-MT 标记为截断的结果不会采用。仍未译出的句子保持空串，未通过完整性门槛的文章不入库。存量文章不会因为新增引擎而自动重译；译文仅作阅读辅助，准确性仍需人工抽查。单词例句中文来自上述开源词库。

#### 配置阿里云百炼翻译

接入只运行在本地 Node 抓取脚本及 GitHub Actions，浏览器直接读取生成的译文，不使用 API Key。需要北京地域的百炼 API Key，普通阿里云 AccessKey 不适用。

1. 本地执行 `powershell -NoProfile -File tools/set-qwen-key.ps1`，在隐藏输入提示中粘贴 Key。保存到 `tools/.dashscope-key`，已加入 Git 忽略和 API 发布脚本禁止上传名单。该项目文件优先于全局 `DASHSCOPE_API_KEY`，避免其他项目的旧变量覆盖。
2. 执行 `node tools/qwen-mt-check.mjs` 只检查配置；加 `--live` 才请求一个示例句，不修改文章或共享缓存。
3. 每日自动更新需要在仓库 Actions Secret 中配置 `DASHSCOPE_API_KEY`。可选仓库变量 `QWEN_MT_MODEL` 支持 `qwen-mt-plus` / `qwen-mt-flash` / `qwen-mt-lite`；`DASHSCOPE_BASE_URL` 默认 `https://dashscope.aliyuncs.com/compatible-mode/v1`，也支持北京业务空间专属域名。

北京地域新人免费额度有效期为 90 天，不能仅凭 Key 判断余额或剩余有效期。仅想使用免费额度时，在百炼控制台为所选模型开启“免费额度用完即停”；已认证账户未开启时，额度用尽会自动按量付费。调用使用实时 API，未使用不抵扣新人免费额度的云端 Batch API。参见[百炼免费额度说明](https://help.aliyun.com/zh/model-studio/new-free-quota)。

#### 用 TTime 做人工校译

TTime 是桌面端的划词翻译和 OCR 工具，不作为 PWA 的运行时依赖。可以按下面的流程把它当作第二审校界面：

1. 运行 `node tools/spot-check.mjs --all`，打开生成的 `tools/_spot/<日期>/index.html`，先看机器预检标出的数字、否定和专名问题。
2. 在 TTime 设置中配置 DeepL；如果要做独立对照，另选 OpenAI、Gemini 或 Google 翻译，不要把同一个 DeepL 结果当作复核证据。TTime 支持划词翻译（默认 `Alt + E`）和截图 OCR（默认 `Alt + Shift + W`），可逐句选中英文后对照，也可核对配图里的文字。
3. 确认是稳定的术语问题时，加入 `tools/term-glossary.json`，先运行 `node tools/fix-cn.mjs --dry`，确认范围后再落盘；标题问题放进 `tools/translate-titles.mjs` 的校对表。单句人工判断仍要在抽查报告中记录。
4. 修改后运行 `node tools/mt-test.mjs && node tools/text-test.mjs && node tools/spot-check.mjs --all`，再进行发布前的完整质检。

TTime 的源码适合作为桌面翻译/OCR 交互参考。当前公开仓库是 Electron 桌面应用，未提供可直接供本站调用的批量翻译接口；仓库许可证还对商用和运营类似服务附加了授权条件，因此这里采用人工校译流程，不复制其源码或把它嵌进站点。

> **如任何权利人认为本项目使用的内容不当，请提 Issue 联系，我们会立即下架相关内容。**

## 目录结构

```
assets/          前端资源（HTML/CSS/JS + 数据）
  app.js           应用主逻辑（视图、词库查义、阅读与导航）
  styles.css       全部样式
  data.js          词库与文章主数据
  data-examples.js 单词例句库（自动生成）
  data-ecdict.js   ECDICT 词元数据（自动生成）
  data-tapdict.js  点词翻译层：阅读页任意单词查义（自动生成）
  data-article-metrics.js  文章统计预计算（自动生成，首屏使用）
  data-wordfreq.js 常见词表：判断词库外的词算不算低频（自动生成）
  data-source-health.js  RSS/正文/图片来源健康度（自动生成）
tools/           数据管线与回归测试（Node，无依赖）
  build-examples.mjs  生成例句库
  build-wordfreq.mjs  生成常见词表（词库换代后须重跑）
  build-tapdict.mjs   生成点词翻译层（词库换代后须重跑）
  build-article-metrics.mjs  生成首屏文章统计（文章库变更后须重跑）
  ingest.mjs          RSS 抓取 + 评分 + 翻译
  lib-mt.mjs          带文章上下文与隔离缓存的翻译引擎
  mt-test.mjs         翻译上下文 / 缓存隔离回归
  text-test.mjs       译文原样回显过滤回归
  classics-test.mjs   明星经典图集偏好排序回归
  recommend.mjs       质量/难度/服务端推荐分与来源健康度规则
  recommend-test.mjs  推荐规则单元测试
  qc.mjs              内容质检 + 推荐评分门禁
  spot-check.mjs      人工抽查材料生成（对照页 + 高信噪比预检，语义层必须人看）
  lib-release.mjs     发布批次快照与完整回滚（数据 + 图片）
  lib-tree.mjs        本地工作树 / 远端仓库对账共用库（blob sha1 比对 + 封面引用集合计算）
  publish.mjs         发布：计划 → 暂存校验 → 提交，产出批次清单；含远端残留自动清理（见 HANDOFF §4）
  rollback.mjs        回滚到指定批次
  tree-diff.mjs       本地工作树 vs 远端仓库逐文件对账，判断「该推什么」（别信 git status）
  release-test.mjs    发布可靠性回归（完整回滚 / 置顶豁免 / 校验门禁 / 清单基线 / LATEST 指针 / 批次自愈）
  remote-sweep-test.mjs  远端残留自动清理回归（keeper 豁免 / 删除前备份 / 无凭据降级）
  examples-test.mjs   例句按需加载回归（首次 / 复用 / 失败重试 / 加载中换词）
  sw-test.js          Service Worker 离线与缓存路径回归
  qc-test.mjs         质检门禁语义回归（空清单不算通过）
  push-test.mjs       上传清单闸门回归（点名文件缺失必须中止）
  smoke.js / nav-test.js / audit.js  回归测试
.github/workflows/daily.yml   每日自动更新
```

## 难度与学习量

文章卡上给的是**两个互不替代的数字**，因为「要背多少词」和「读起来卡不卡」是两件事：

- **需学 N 词**：这篇里属于四级词库、你还没标认识的词有多少个（按词形归一去重）。它随你的学习进度下降。
- **低频词 X%**：正文里语料词频排在 2500 名之后的词占全部词数的比例。它是**文本自身**的属性，与你的进度无关 —— 你把全文的词都标了「认识」，这个数字也不会降，所以叫「低频词」而不是「陌生词」。用来判断篇幅难度和预计阅读时长。想知道「还有多少词要学」，看「需学 N 词」。

两个数字都按词形归一到原形再统计（`performing` / `performs` / `performed` 算同一个词），句中人名与机构名不计入。

## 阅读体验（排版 / 字号 / 位置）

阅读页的三件事在 2026-09-14 重做了一轮，目标是「一段话能连读、不用反复调字号、查完词不用找原句」。

- **正文按原文段落连续排版**。段落是一个文本流，句子是内联 `span`，句间只有一个空格，换行由行宽决定；旧结构是「每句一个块级元素」，一段话被排成竖排的句子清单。逐句译文仍是块级，插在该句下方。首字下沉与段间装饰点已删除。
- **朗读按钮只在选中句子时出现**（点一下句子即选中，桌面也可悬停看到）；旧版每句都挂一个半透明喇叭，长文里满屏小图标。
- **左右留白只有一个来源**：`.read-scroll` 上的 `--rd-pad`（22px）。此前 `.read-scroll` 的 20px 与 `.read-body` 的 24px 叠加，手机上一行正文两侧各让掉 40px。
- **字号三档**：英文 19 / 21 / 24px，行高按 1.7 倍取整（32 / 36 / 41px）；中文字号同比跟进（14 / 15.5 / 17px），不再固定 13.5px。
- **阅读设置面板**（正文右下「Aa」）把字号、中文对照、底色三组摊开直接点选，改动即时作用于正文并可当场预览，选完自动记住。旧版只有一个「点一下轮一档」的字号按钮。
- **不丢阅读位置**：记的是「哪一句 + 它当时的屏幕位置」（句子坐标 `data-pi`/`data-si` + 偏移），不是滚动距离。改字号、展开/收起中文对照、退出再进入，都按这个锚点把同一句放回原处；**每篇文章各存一份**续读位置。
- 正文里的 `&` 不再被分词拆成实体（`&amp;` 里的 `amp` 曾被包成可点词，页面上就显示成 `&amp;`）。

段落分组来自原文 HTML。存量成长稿中，能按原文定位的段落已合并；另有 1 篇源站链接失效、无法恢复连续段落的稿件已下架。成长 RSS 继续暂停新增，避免同类不可读页面再次进入阅读库。

已知小瑕疵：选中的句子正好占满一行时，行内喇叭会换行到下一行（不影响朗读）。第二轮交互版会改成「选中句工具条」，把这个行内图标换掉。

## 首屏与按需加载

首屏只加载阅读与推荐真正需要的数据。**单词例句库 `data-examples.js`（560KB / gzip 225KB）
不在此列** —— 它只在词卡点开「更多」后才可能被看到：

- 轻卡（词 / 音标 / 短释义 / 收藏）不碰例句库，所以第一次查词是即时的；
- 点「更多」才去取，同一个 Promise 复用，连续查词不会重复请求；
- 取不到时占位变成「重试」按钮，**查词本身不受影响**；
- 例句到达后按词就地填进当前词卡；这中间换了词或关掉词卡，旧例句不会被塞到新词卡上。

前提是**例句不参与任何计算**：难度、估时、推荐排序都不读它。这条有回归守着
（`tools/audit.js` 的 `[G8]`：摘掉全部例句后全库逐篇的指标与推荐分都不变）。

点词大表 `data-tapdict.js`（约 3.0MB）已移到**进入阅读页后按需加载**；首页使用构建期生成的
`data-article-metrics.js` 显示词数、需学词数和低频词占比，因此首屏不再为点词解析下载大表。
点词表加载失败时，四级词库查词仍可用；文章统计不会因懒加载而漂移。

## 本地预览

```bash
python -m http.server 8123
# 打开 http://localhost:8123
```

调试参数：`?theme=dark|light`、`?v=home|discover|read|me`

## 自动更新与回滚

`.github/workflows/daily.yml` 每日北京时间 07:00 执行：存量阅读质量清理、发现人物候选并发布已审核人物稿（RSS 采集已全部停用）→ 来源健康度记录 → 内容质检 → 资源瘦身 → 回归测试 → 部署 GitHub Pages。

每次更新都会先生成一个**批次**：变更前快照（数据文件 + 全部配图）→ 待发布数据写入暂存区 → 校验正文完整性与所有被引用图片 → 全部通过才落盘。任何一步失败，数据与图片一起回滚到更新前状态，线上不受影响。

推送清单以**上次成功发布的状态**为基线（`.bak/published.json`，由推送脚本在成功后写入），所以「先改好文件、再跑发布」的改动一定会进清单；清单里点名的文件若本地缺失，推送会在联网之前直接中止，不会出现正文传了、配图没传却报成功。发布时还会对账一次远端树，自动清掉「撤栏目 / 撤功能」遗留的孤儿文件；**仍被远端文章引用的封面一律保留**（那多半是每日管线刚抓来的），删任何文件前都会先备份到 `.bak/deleted-<日期>/`。

```bash
node tools/publish.mjs --dry     # 只看本次发布计划，不写文件（含远端残留对账）
node tools/tree-diff.mjs         # 本地工作树 vs 远端逐文件对账，判断「该推什么」
node tools/rollback.mjs --list   # 列出可回滚的批次
node tools/rollback.mjs latest   # 完整回滚（数据 + 图片，含本次新建的配图）
node tools/release-test.mjs      # 发布可靠性回归（自带还原保护）
node tools/remote-sweep-test.mjs # 远端残留自动清理回归（keeper 豁免 / 删除前备份 / 无凭据降级）
node tools/sw-test.js            # Service Worker 离线/缓存路径
node tools/push-test.mjs         # 上传清单闸门（缺文件必须中止）
node tools/mt-test.mjs && node tools/text-test.mjs && node tools/classics-test.mjs  # 抓取/翻译专项回归
```

成长 / 寓言属常青栏目，不受时效淘汰；当前成长只保留存量、不参与每日抓取。需要长期保留的单篇文章可以单独加保留标记。

## 免责声明

本项目仅供个人学习与研究使用，**不得用于任何商业用途**。使用者应自行确保其使用行为符合当地法律法规及各数据来源的服务条款。
