# 词阅 WordLens

四级核心词记忆 + 英文原刊双语阅读。纯静态 Web 应用，零依赖、零构建、可离线，手机浏览器打开即用。

在线地址：https://shjdd134.github.io/ciyue/

## 功能

- **翻卡记词**：中英互译、发音、词根词缀、真实例句；会 / 模糊 / 不会三档作答
- **FSRS 间隔重复**：按记忆曲线安排复习，错词自动进入队列
- **原刊精读**：逐句点读、逐句对照译文、整段显译、生词一键收藏
- **六个栏目**：时尚 / 足球 / 时政 / 历史 / AI / 寓言
- **本地优先**：学习进度只存在浏览器本地，可导出 / 导入备份
- **三套配色**：深色 / 浅色 / 纸质

## 数据来源与版权

本项目是**个人非商业学习项目**——不售卖、不投放广告、不提供付费服务。所有第三方数据版权归各自权利人所有。

### 单词语料

词库为**约 2000 个四级核心词**，从四级大纲（4454 词）按三条并集筛出，口径见 `tools/build-core-vocab.mjs`：

| 口径 | 说明 |
| --- | --- |
| ① 语料高频 | ECDICT 当代语料词频 f ≤ 2500（5 万词级语料统计） |
| ② 真题高频 | [liut969/CET](https://github.com/liut969/CET)《英语四级真题高频词汇》1250 词（近 5 年 30 套真题逐词统计） |
| ③ 手工精编 | 项目早期精编的 30 个词（词根词缀 / 同根词 / 助记） |

已剔除纯功能词（the / of / to …）。另用真题表反查并补回了原词库缺失的常用词（people / part / pay 这类约 80 词）。

| 数据 | 来源 | 许可 |
| --- | --- | --- |
| 词频、音标、词形变化、考纲标签 | [ECDICT](https://github.com/skywind3000/ECDICT) | MIT |
| 真题词频（核心词筛选依据） | [liut969/CET](https://github.com/liut969/CET) | 作者免费公开 |
| 单词例句与中文对照 | [KyleBing/english-vocabulary](https://github.com/KyleBing/english-vocabulary) | 作者声明供学习使用 |
| 双语例句补充 | [Tatoeba](https://tatoeba.org)（经 manythings.org 打包） | CC-BY 2.0 |
| 兜底例句 | 本项目文章库的原刊原句 | 见下 |

例句生成逻辑见 `tools/build-examples.mjs`：按「分级词典词库 → Tatoeba → 原刊原句」的优先级取第一条，只填补没有例句的词。

### 阅读文章

文章正文与配图来自各媒体**公开的 RSS 订阅源**，仅作个人语言学习之用，正文页保留指向原文的外链。涉及的媒体包括 Vogue、ELLE、Harper's Bazaar、Sky Sports、ESPN、Smithsonian Magazine、HistoryExtra、TechCrunch 等，版权归原媒体所有。

### 译文

文章译文由机器翻译（有道 / DeepL）生成，仅作阅读辅助，不保证准确性；单词例句中文来自上述开源词库，非机器生成。

> **如任何权利人认为本项目使用的内容不当，请提 Issue 联系，我们会立即下架相关内容。**

## 目录结构

```
assets/          前端资源（HTML/CSS/JS + 数据）
  app.js           应用主逻辑（视图、FSRS 调度、导航）
  styles.css       全部样式
  data.js          词库与文章主数据
  data-examples.js 单词例句库（自动生成）
  data-ecdict.js   ECDICT 词元数据（自动生成）
tools/           数据管线与回归测试（Node，无依赖）
  build-examples.mjs  生成例句库
  ingest.mjs          RSS 抓取 + 翻译
  qc.mjs              内容质检
  smoke.js / nav-test.js / audit.js  回归测试
.github/workflows/daily.yml   每日自动更新
```

## 本地预览

```bash
python -m http.server 8123
# 打开 http://localhost:8123
```

调试参数：`?theme=dark|light`、`?v=home|study|discover|read|me`、`?v=study&flip=1`、`?v=study&w=<word>`

## 自动更新

`.github/workflows/daily.yml` 每日北京时间 07:00 执行：抓取新文章 → 内容质检 → 资源瘦身 → 回归测试 → 部署 GitHub Pages。

## 免责声明

本项目仅供个人学习与研究使用，**不得用于任何商业用途**。使用者应自行确保其使用行为符合当地法律法规及各数据来源的服务条款。
