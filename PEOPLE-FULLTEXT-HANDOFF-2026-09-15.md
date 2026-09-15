# 人物栏目原刊全文抓取交接档案（2026-09-15）

## 目标

将“人物 / Beautiful People”栏目调整为以下行为：

- 抓取公开可访问的原刊文章正文和原刊图片。
- 只过滤广告、导航、订阅提示、推荐卡片等页面噪声；不绕过登录、付费墙或访问控制。
- 保留原文段落顺序、图片顺序和图片署名信息，中文翻译作为阅读辅助。
- 不收录 Zendaya；足球、AI、旧明星栏目已停用。
- 文章阅读模式必须是全文，支持阅读记录继续阅读。

## 当前结论

本地代码层面的抓取、正文选择、广告过滤、图片去重、截断检测、全文数据结构和发布校验已经完成；实际数据迁移和远程发布尚未完成。

> ⚠️ **2026-09-15 晚核对修正**（以下三句原描述与实测不符，已改正；其余段落保持不变）
>
> ① **原文写「远程仓库当前没有被本次工作修改」——错。** 远端 `main` 当时已是 `a0009649`「chore: remove unwanted article categories and add WorkBuddy plan」（2026-09-15 06:13Z）。线上实际是 **11 篇、全部成长**；明星 24 篇与足球、AI 栏目已从线上撤下。本地发布基线 `.bak/published.json` 与该 commit 一致（articles=11），**健康、未被 release-test 污染**。
>
> ② **原文写「当前环境无法完成外网图片下载」——错**，真因是下载通道本身坏了，见下节「当前阻塞」。
>
> ③ 同一轮已清理远端 **40 张零引用孤儿封面**（撤下栏目的遗留资产，commit `6767378`）；删前 40 张已备份到 `.bak/orphan-covers-2026-09-15/`（含 manifest 与逐张文件），需要可回捞。
>
> ④ 判断「哪些改动还没推上去」**不要用 `git status`**：本仓库本地索引落后，`D assets/covers/*.jpg`、`?? tools/publish.mjs` 这类条目**大多是假象**（实测 `data-tapdict.js` / `data-wordfreq.js` / `data-source-health.js` 标着 `??` 却在远端、sha 一致）。要对账就用远端树（`git/trees/main?recursive=1`）逐文件比 sha1。

工作区本来就有未提交改动，请勿执行 `git reset --hard`、`git clean` 或覆盖式回滚。

目前 `assets/data-articles-extra.js` 里仍有 2 篇旧的人物指南文章，Monica 的全文尚未写入数据文件，因此 `node tools/content-scope-test.mjs` 当前唯一失败项是“人物栏目必须发布原刊全文”。这表示迁移尚未执行，不是应当隐藏的测试问题。

## 已验证的原文快照

快照位于 `.tmp/people/`，该目录是临时缓存，不需要提交。

下表是**修完分句器与图注提取之后**的实测值（2026-09-15 晚）。词数一列与发布正文**完全一致**（`qc` 拿发布后的 paragraphs 复算，差 0）。修正前的旧值是 Anne 3,811 / Charlize 3,867 / Monica 964 —— 那些数字把 figure 内的图注算进了正文，实际没进正文流。

| 人物 | 原刊 | 英文词数 | 文本块 | 图片 | 当前状态 |
| --- | --- | ---: | ---: | ---: | --- |
| Anne Hathaway | Vogue | 3,623 | 38 | 9 | 全文与 9 张图全部就位，8 条图注已挂上 |
| Charlize Theron | AnOther Magazine | 3,892 | 62 | 15 | 全文与 15 张图全部就位，15 条图注已挂上 |
| Monica Bellucci | British Vogue | 915 | 12 | 4 | 全文与 4 张图全部就位，3 条图注已挂上 |

三篇的解析结果均未触发截断标记，正文选择器会在多个 `<article>` 容器中选择可读英文词数最多的内容，而不是盲选第一个容器。人工复核（正文边界 / 图片归属 / 署名 / 有无广告混入 / 有无截断）于 2026-09-15 晚完成，三篇均为原刊本人专题大片、无广告与推荐图混入。

## 已完成的代码修复

- `tools/lib-people.mjs`
  - 改用正文可读性评分选择文章容器。
  - 过滤脚本、样式、导航、广告、订阅和推荐内容。
  - 保留正文和图片的文档顺序，输出 `blocks`。
  - 提取原文句子，保留句子边界供翻译和校验使用。
  - 提取 og:image、figure 等图片，过滤广告图片路径并去重。
  - 检测 `continue reading`、`sign in to continue`、`read more` 等截断信号。
  - 输出 `sourceTextHash`、`sourceTextWords`、`sourceParagraphs`、`sourceImages`。
  - **（2026-09-15 晚）分句器改与 `lib-text.mjs` 共用 `ABBR` 缩写表**：原先那份本地实现没有缩写保护，`8 a.m. to 6 p.m.` 被劈成 `"8 a."` / `"m."` / `"to 6 p."` / `"m."` 四个碎片，碎片没有可译内容、译文原样退回英文，被 `qc` 的 F4「译文与原文相同」抓住；`[Laughs.]` 也会切出只剩标点的 `"]"`，现在这类无字母碎片粘回上一句（粘右括号时不补空格，保持 `[Laughs.]` 原样）。
  - **（同轮）图注改读 `<figure>` 里的 `<p>`**：British Vogue / Vogue 把图注写在 `<p>` 而不是 `<figcaption>`，只认后者会让图注**两处同时出事**——既进不了 `blocks`（阅读页少 8 条说明，Anne 那篇蒸发 188 词），又被 `<p>` 扫描算进正文词数（Monica 报 964、实际只有 915，差的 49 正是 3 条图注）。
  - **（同轮）`words` 改成量 `blocks` 的文本块**：`qc` 是拿**发布后的 paragraphs** 复算词数的，先在 `<p>` 上量、再把 figure 里的 `<p>` 排除，两把尺子必然对不上。改完后三篇的 `sourceTextWords` 与发布正文**差 0**。

- `tools/people.mjs`
  - 支持 `--discover`、`--prepare`、`--publish-reviewed` 和 `--cached`。
  - 全文文章使用 `readingMode: "full"`、`contentStatus: "complete"`、`extractorVersion: "people-full-v1"`。
  - 翻译所有原文句子，保持原文段落和图片顺序。
  - 旧指南文章会被同指纹的全文文章替换；未来同指纹全文会跳过重复发布。
  - 图片失败会汇总所有缺失 URL，便于重试。

- ~~`tools/people-download.ps1`~~ **已删除（2026-09-15 晚）**
  - 它用 `Invoke-WebRequest`，在本机写不出非空文件，是下面「下载全挂」的真凶；修掉下载通道后就是死代码，留着只会让下一个人重踩一遍。现在 `download()` 统一走 Node `fetch` + `redirect:'follow'`。

- `tools/people-review.mjs`
  - 只同步已经人工确认的队列项的最新指纹和图片哈希。
  - 不会自动批准未经审核的文章。

- `tools/people-config.json`
  - 版本为 `people-v2-full`，人物图片上限记录为 24。

- `tools/people-reviewed.json`
  - 已更新 Anne Hathaway、Charlize Theron、Monica Bellucci 的原刊标题和中文标题。
  - 全文图片下载完成后必须重新同步指纹和图片哈希。

- `tools/qc.mjs`
  - 全文模式要求 `complete`、全文审核范围、原文哈希和足够正文词数，并核对实际英文词数。

- `tools/people-test.mjs`
  - 已覆盖 Zendaya 排除、采访者标题排除、广告图过滤、图片去重、文档块、广告/导航过滤、句子保留、截断检测和多容器选择。

- `assets/app.js`
  - 人物卡片显示“原刊全文”和图片数量。
  - 阅读页显示原刊全文说明和来源页入口。

- `PEOPLE-COLUMN.md`、`README.md`、`WORKBUDDY-OPTIMIZATION-PLAN.md`
  - 已更新人物全文抓取、广告过滤、审核和发布流程。

## 下载阻塞已修（2026-09-15 晚，真因不是网络，是下载器）

修之前 `node tools/people.mjs --prepare --cached` 的失败清单：

- Anne 缺失 1 张（og:image）：
  `https://assets.vogue.com/photos/685995d4bf4ab2b24cabdbb3/master/w_960,c_limit/VO0825_CoverStory_09.jpg`
- Charlize 缺失 7 张（`images-prod.anothermag.com` 那批，前 4 个）：
  - `https://images-prod.anothermag.com/2000/azure/another-prod/460/9/469955.jpg`
  - `https://images-prod.anothermag.com/2000/azure/another-prod/460/9/469956.jpg`
  - `https://images-prod.anothermag.com/2000/azure/another-prod/460/9/469957.jpg`
  - `https://images-prod.anothermag.com/2000/azure/another-prod/460/9/469958.jpg`

失败原因**不是「当前环境无法完成外网图片下载」**——那是误判。真因是**图片下载通道两条路都断了**：

1. `people.mjs` 的 `download()` 在 `win32` 下**无条件**调用 `tools/people-download.ps1`，**没有 fetch 回落**；
2. 该脚本用 `Invoke-WebRequest`，在本机**写不出非空文件**，直接 throw `downloader produced no non-empty file`；
3. 非 win32 分支虽然后备了 Node `fetch`，却写成 `redirect:'error'` —— Vogue / AnOther 的静态图会先 302 到 CDN，这条回落一样必挂。

**反证**：`curl -L -o .tmp/probe/anne9.jpg "https://assets.vogue.com/…/VO0825_CoverStory_09.jpg"` → **HTTP 200 / 95,061 字节**，正常落盘。所以外网是通的。

**实际采用的修法**：`download()` 统一走 Node `fetch` + `redirect:'follow'`（8MB 上限、白名单校验、空响应直接报错保留），**不分平台**；`tools/people-download.ps1` 删除。实测 `fetch(redirect:'follow')` 对两家 CDN 全部 200（95KB / 79KB / 50KB / 60KB / 79KB）。没采用「先 PS 再回落」是因为 PowerShell 那条路在本机已经证明不可用，留双通道只是把故障点留着。

⚠️ **验证下载时不要写 `/tmp` 或 `/dev/null`**：沙箱会拦这类写入，`curl` 报 `client returned ERROR on write` 且 `-w "%{size_download}"` 显示 0 —— 这个症状和「外网被墙」长得一模一样，很容易误判。务必写进项目目录再看真实字节数。

另：压图步骤依赖 Pillow，**默认 `python` 没装**（`ModuleNotFoundError: No module named 'PIL'`），执行时必须显式指定 `PYTHON=`，路径见下节。

## 接手后的执行顺序

在网络和自动审核可用的环境中，从项目根目录执行：

```powershell
$env:PYTHON='C:\Users\sekiro\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
node tools/people.mjs --prepare --cached
```

准备成功后，人工查看三篇文章的正文边界、图片是否属于原刊文章、图片署名和是否仍混入广告；确认无误后执行：

```powershell
node tools/people-review.mjs
node tools/people.mjs --publish-reviewed --cached
```

然后运行完整验证：

```powershell
node tools/qc.mjs --all
node tools/content-scope-test.mjs
node tools/audit.js
node tools/nav-test.js
node tools/smoke.js
node tools/people-test.mjs
node tools/push-test.mjs
node tools/mt-test.mjs
node tools/text-test.mjs
node tools/verify-ui.js
git diff --check
```

如果 `content-scope-test` 仍失败，先检查 `assets/data-articles-extra.js` 是否已经把 3 篇人物文章写成全文；不要把旧指南数据标记为全文来掩盖问题。

通过本地验证后，按项目既有发布流程创建 batch 并推送：

```powershell
node tools/publish.mjs --batch <batch-id>
$env:GITHUB_TOKEN = (python tools/_cred-get.py git)
node tools/_api-push.mjs 'feat: 人物栏目原刊全文' --manifest auto
```

推送后必须核对远程 main 的提交、GitHub Actions 状态和图片资产覆盖率。`--manifest auto` 是必要的，因为新增图片可能是未跟踪文件，单看 `git status` 不足以确认发布清单完整。

## 验收标准

- 3 篇人物文章都为 `readingMode: "full"` 且 `contentStatus: "complete"`。
- 每篇文章都有 `sourceTextHash`、`sourceTextWords`、`sourceParagraphs`、`sourceImages`。
- 实际英文正文词数与记录值相差不超过 5%。
- 正文中没有广告、导航、订阅提示、推荐卡片或明显截断提示。
- 图片数量与封面及正文图片清单一致，所有图片都能在 `assets/covers/` 找到。
- `qc`、`content-scope-test`、`audit`、`nav-test`、`smoke` 和相关测试全部通过。
- 远程 main、Actions 和图片资产覆盖率均已核对。

## 不要做的事

- 不要提交 `.tmp/people/` 临时快照。
- 不要重置或清理当前工作区的其他未提交修改。
- 不要绕过登录、付费墙、验证码或访问控制。
- 不要在缺图、正文截断或审核哈希未同步时发布。
- 不要把翻译文本当成原文完整性的证明；结构 QC 和翻译 QA 需要分别检查标题、数量、否定、主语、遗漏和截断。

