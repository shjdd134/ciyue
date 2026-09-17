# 人物 · Icons

2026-09-15 新增。选题面向欧洲女演员、模特、人物经历与摄影专题。旧明星入口、足球和 AI 采集继续停用。

## 阅读体验

人物页提供公开原刊正文的中英对照、原刊图片和来源入口。正文按原刊段落保存；广告、导航、订阅提示和推广图片过滤，原刊站点的登录/订阅限制不会被绕过。点词、朗读、中文对照和本站续读记录均可用。

首批为海瑟薇（Vogue）、塞隆（AnOther Magazine）和贝鲁奇（British Vogue），图片按原刊公开页面完整保存。每天最多新增 1 篇，以 UTC 日期 addedAt 计数；旧导读迁移为全文时不受该新增配额影响。（配额由 `PEOPLE_CONFIG.dailyLimit = 1` 决定，`content-scope-test.mjs` 有断言守着 —— 早前本文写的「2 篇」是旧值。）

赞达亚（Zendaya）在明确排除名单中，发现链接、选题评分和在线内容测试三处过滤，不得自动恢复。

## 配置与排序

`tools/people-config.json` 集中维护人物偏好、排除名单、来源、图数门槛及权重。

- 核心：AnOther Magazine、W Magazine、Vanity Fair。
- 补充：Numéro、Vogue / British Vogue、Interview Magazine。
- 至少 4 张独立配图；按原刊公开页面保存全部通过过滤的图片。订阅广告、商品推广图、同一照片不同裁切不计入数量。照片检查尺寸、真实解码，压缩到 240 KB 以下，阅读页保持原比例。
- 标题须命中偏好人物；购物、美甲、护肤商品和单套造型标题过滤。测得正文至少 450 英文词，并有经历、作品、角色等线索。未定位正文容器、未确认英文、有访问限制、页面出现“继续阅读”截断提示时暂缓。发布前保存正文指纹、段落数和图片清单，变化后必须重新复核。

权重：人物偏好 30、摄影 20、故事 20、英语 20、兴趣 10。当前是可解释规则分：偏好表、图片数量、正文主题线索、语言和篇幅，**不是 AI 审美判断，也不是翻译质量认证**。

## 自动任务与审核

daily 在成长采集后运行人物候选发现与已审核队列发布。无合格内容就不新增，不凑数。

1. `node tools/people.mjs --discover`：各来源轮流发现链接，最多测量 12 个候选；写 `.tmp/people/candidates.json`，日志输出候选 URL、分数与暂缓原因。配置来源不等于所有页面都已支持，运行报告会区分可用与未识别。
2. 把选中的文章加入 `tools/people-reviewed.json`，填写原刊标题的准确中文与摄影署名，审核状态先为 pending。
3. `node tools/people.mjs --prepare`：下载原刊与照片至 `.tmp/people/`，不改文章库；使用 `--cached` 可复用已保存 HTML。Windows 可用 PYTHON 环境变量指定 Python；Actions 使用已有 Python/Pillow。
4. 看原刊核对正文边界，逐张看图片，剔除广告和错图后才能批准。运行 `node tools/people-review.mjs` 同步 prepared.json 中的 fingerprint 与照片原始字节哈希 photoHashes；未核对不得把 review 状态改为 approved。哈希用于发现后续变更，不代替复核。
5. `node tools/people.mjs --publish-reviewed`：重新取页面，核对文字/照片指纹，逐段翻译并发布 `readingMode:full` 原刊内容；本地已有快照时可加 `--cached`。首次运行会把旧导读迁移为全文；后续每日最多新增 1 篇。原刊变化时暂缓该候选，保留旧库。

**发现与已审核队列发布自动运行，新增候选的选题和导读复核仍需人工或代理完成。** 队列用完会停在候选阶段，不保证每天新增文章，不能宣称每天全自动生成两篇。

## 首批来源

- [Anne Hathaway / Vogue](https://www.vogue.com/article/anne-hathaway-august-cover-2025-interview)
- [Charlize Theron / AnOther](https://www.anothermag.com/fashion-beauty/16962/charlize-theron-interview-another-magazine-apex)
- [Monica Bellucci / British Vogue](https://www.vogue.co.uk/arts-and-lifestyle/article/monica-bellucci-interview)

## 验证与发布

运行 people-test、content-scope-test、qc --all、audit、nav-test、smoke，检查人物入口、署名、原文按钮、全文段落与返回分类。沿用发布 manifest，并显式补齐新代码、配置、审核队列、图片脚本与文档。原始 HTML、大图及复核截图仅保留在 `.tmp/`，不公开提交。

成长类全文提取与翻译仍按 WORKBUDDY-OPTIMIZATION-PLAN.md 修复。本次新栏目不代表那项修复已经完成。
