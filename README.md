# 词阅 WordLens

四级词库查义 + 英文原刊双语阅读。纯静态 Web 应用，零依赖、零构建、可离线，手机浏览器打开即用。

在线地址：https://shjdd134.github.io/ciyue/

## 功能

- **四级词库查义**：保留完整词库、音标、词根词缀、真实例句；正文**任意单词可点查释义**
- **原刊精读**：逐句点读、逐句对照译文、整段显译、生词一键收藏；词库外词弹轻量释义卡
- **阅读生词本**：只收集阅读中遇到的词，支持从「我的」或文章内打开查看
- **五大内容栏目**：足球 / AI / 成长（博主英文长文，整篇收录）/ 寓言 / 明星
- **本地优先**：学习进度只存在浏览器本地，可导出 / 导入备份
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
| 真题词频（核心词筛选依据） | [liut969/CET](https://github.com/liut969/CET) | 作者免费公开 |
| 试卷词频（真题高频标记依据） | [exam-data/CETVocabulary](https://github.com/exam-data/CETVocabulary) | 数据 CC BY-NC-SA 4.0 / 代码 MIT |
| 中学分级词库（基础层） | [KyleBing/english-vocabulary](https://github.com/KyleBing/english-vocabulary) | 作者声明供学习使用 |
| 单词例句与中文对照 | [KyleBing/english-vocabulary](https://github.com/KyleBing/english-vocabulary) | 作者声明供学习使用 |
| 双语例句补充 | [Tatoeba](https://tatoeba.org)（经 manythings.org 打包） | CC-BY 2.0 |
| 兜底例句 | 本项目文章库的原刊原句 | 见下 |

例句生成逻辑见 `tools/build-examples.mjs`：按「分级词典词库 → Tatoeba → 原刊原句」的优先级取第一条，只填补没有例句的词。

### 阅读文章

文章正文与配图来自各媒体**公开的 RSS 订阅源**，仅作个人语言学习之用，正文页保留指向原文的外链。涉及的媒体包括 Sky Sports、FourFourTwo、Opta Analyst、TechCrunch AI、AI News、ELLE、Harper's Bazaar，以及「成长」栏目的独立博主和长文刊物（Dan Koe、Farnam Street、More To That、Ness Labs、Aeon、Psyche，整篇收录），版权归原媒体和作者所有。Aeon/Psyche 的 RSS 使用须遵守其个人非商业使用条款。

### 译文

文章译文由机器翻译（有道 / DeepL）生成，仅作阅读辅助，不保证准确性；单词例句中文来自上述开源词库，非机器生成。

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
  data-source-health.js  RSS/正文/图片来源健康度（自动生成）
tools/           数据管线与回归测试（Node，无依赖）
  build-examples.mjs  生成例句库
  build-tapdict.mjs   生成点词翻译层
  ingest.mjs          RSS 抓取 + 评分 + 翻译
  recommend.mjs       质量/难度/服务端推荐分与来源健康度规则
  recommend-test.mjs  推荐规则单元测试
  qc.mjs              内容质检 + 推荐评分门禁
  smoke.js / nav-test.js / audit.js  回归测试
.github/workflows/daily.yml   每日自动更新
```

## 本地预览

```bash
python -m http.server 8123
# 打开 http://localhost:8123
```

调试参数：`?theme=dark|light`、`?v=home|discover|read|me`

## 自动更新

`.github/workflows/daily.yml` 每日北京时间 07:00 执行：抓取新文章 → 候选评分与来源健康度记录 → 内容质检 → 资源瘦身 → 回归测试 → 部署 GitHub Pages。

## 免责声明

本项目仅供个人学习与研究使用，**不得用于任何商业用途**。使用者应自行确保其使用行为符合当地法律法规及各数据来源的服务条款。
