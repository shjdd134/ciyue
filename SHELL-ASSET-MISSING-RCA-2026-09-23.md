# 壳内资源缺失故障说明（RCA）

**主题：点词词典 `data-tapdict.js` 与例句库 `data-examples.js` 未进入 APK**

| 项 | 值 |
|---|---|
| 文档类型 | 故障说明 + 事实核对报告 |
| 日期 | 2026-09-23 |
| 核对对象 | `outputs/apk/wordlens-1.0.3-release-vc4.apk` |
| 对象指纹 | md5 `57ffa73468d58cd7412f50c4b5684f7e`，11,601,543 字节 |
| 核对方式 | APK 归档直读（`tools/lib-zip.cjs`）、源码与构建脚本逐行核对、线上资源 HTTP 核验 |
| 核对结论 | **故障成立**；原说明的现象与运行环境准确，但**根因表述须修正**，且**影响范围为 2 个文件而非 1 个** |

---

## 一、结论

1. 故障属实：`wordlens-1.0.3-release-vc4.apk` 中确实不存在 `assets/assets/data-tapdict.js`，壳自检红条为该情况的正确上报，不是误报、不是劫持、不是系统故障。
2. **根因须修正**：不是「发布打包时遗漏」，而是 `tools/lib-mobile.cjs` 的资源白名单机制**在设计上无法收录**该文件（白名单只认 `index.html` 的静态引用，而该文件由 `app.js` 在运行期用 JavaScript 拼接路径动态插入）。
3. **影响范围须扩大**：同一根因下另有 `assets/data-examples.js`（573,132 字节）同样未进包。截图仅呈现其中一条，是因为红条首次触发即定稿、不再更新。
4. 上游（工作区与线上站点）两个文件**均完整存在**，生成环节无问题。可修复且修复成本低——不需重跑生成脚本，只需修正白名单机制后重出包。

---

## 二、核对结果

### 2.1 原说明中已核实属实

| 原说明断言 | 核对结论 | 依据 |
|---|---|---|
| 包名 `cn.wordlens.reader` | 属实 | 产物 badging `package: name='cn.wordlens.reader'` |
| 入口 Activity `cn.wordlens.reader.MainActivity` | 属实 | `mobile/android/AndroidManifest.xml`；badging `launchable-activity` |
| 应用名「词阅」 | 属实 | `mobile/android/res/values/strings.xml`；badging `application-label:'词阅'` |
| 版本 1.0.3 / versionCode 4 | 属实 | badging `versionCode='4' versionName='1.0.3'` |
| `assetVersion = "79"` | 属实 | **包内** `assets/assets/data-config.js` 实测为 `assetVersion: "79"` |
| `appassets.wordlens.invalid` 为本地映射占位域名，设计上不解析 | 属实 | `AssetServer.java:42-43`；`.invalid` 为 RFC 2606 保留后缀 |
| 该域名与「断网」无关 | 属实 | `AssetServer.java:78` 外域一律不插手，映射由壳内拦截完成 |
| 壳自检只统计 `<script>` 失败、刻意忽略图片 | 属实 | `mobile/shell-glue.js:269-271`，注释明确写明离线图片会全部失败、计入即成了狼来了 |
| 红条文案格式（标题 + URL + UA） | 属实 | `mobile/shell-glue.js:254-255` |
| 首页不立即加载点词大表，改由 `ensureTapdict()` 按需插入 | 属实 | `assets/app.js:448-470`；`index.html:47` 注释 |
| 加载失败后主程序继续、四级词库查词保留 | 属实 | `ensureTapdict()` 的 `s.onerror` 仅 `s.remove(); resolve(false);` |
| 该文件为构建产物、约 3 MB | 属实 | `tools/build-tapdict.mjs` 生成；实测 3,072,532 字节 |
| APK 内无 `data-tapdict.js` | 属实 | 归档直读 106 条目，JS 类 14 条，无该文件 |
| 文章 `ob-teaching-and-training-disqualified` 存在、元数据可用 | 属实 | 见 `assets/data-articles-extra.js` |

### 2.2 必须修正的断言

**修正一：根因不是「打包时未写入」，而是白名单机制够不着。**

原说明第七节写「发布打包时未将该构建产物写入 `assets/`」，这暗示一次偶发的遗漏。实际是机制性缺陷：

`tools/lib-mobile.cjs` 第 1 行即声明这是**白名单拷贝**。白名单的完整来源定义在第 34-44 行 `planFiles()`：

```
起点：["index.html", "manifest.webmanifest"]
规则①：扫描 index.html 里 src/href="assets/…" 的全部引用（第 37 行正则）
规则②③④：assets/fonts、assets/covers、assets/icons 三个整目录
```

`index.html` 中共 14 个 `<script defer src="assets/…">`（第 30-54 行），**没有一个是 `data-tapdict.js`**（`grep -c tapdict index.html` 结果为 0）。

该文件的引用方式是运行期动态拼接：

```js
// assets/app.js:456，位于 ensureTapdict() 内
s.src = `assets/data-tapdict.js?v=${encodeURIComponent(ASSET_VERSION)}`;
```

**动态拼接的路径不可能被静态正则抽取到**。因此该文件永远不在 `planFiles()` 的输出里，永远不进入 `mobile/www/`，永远不进 APK。这不是遗漏，是设计边界外的盲区——并且它对**任何**未来新增的按需加载资源同样成立。

**修正二：影响范围为两个文件，不是一个。**

`assets/app.js:2896` 与 `2902-2912` 存在同构的第二处按需加载：

```js
const EXAMPLES_FILE = "assets/data-examples.js";
// ensureExamples() 内：
s.src = EXAMPLES_FILE + "?v=" + encodeURIComponent(m ? m[1] : ASSET_VERSION);
```

`index.html:43-44` 的注释亦明确记载「真实例句（560KB）不在首屏……改由 app.js 的 `ensureExamples()` 动态取」。

实测：`mobile/www/assets/` 下 `data-tapdict.js` 与 `data-examples.js` **两者皆不存在**；APK 106 条目中两者皆无。工作区中两者皆存在（分别为 3,072,532 与 573,132 字节）。

截图只呈现 `data-tapdict.js` 一条，原因是 `mobile/shell-glue.js:237` 的红条首触发即置 `window.__wlDiagReported = true` 定稿，后续失败不再追加；且 `ensureExamples()` 只在词卡展开「更多」时调用，尚未触发。**该文件缺失客观存在，只是尚未显形。**

**修正三：映射机制不是 `WebViewAssetLoader`，而是自研拦截器。**

原说明第四节写「由 `WebViewAssetLoader` 一类机制」。实际实现是自研的 `AssetServer.java`，经 `WebViewClient.shouldInterceptRequest` 拦截：

```java
// AssetServer.java:42-43
static final String HOST = "appassets.wordlens.invalid";
static final String BASE = "https://" + HOST + "/";
// AssetServer.java:86
InputStream in = ctx.getAssets().open(rel);
```

且 `AssetServer.java:28-29` 注明这是**刻意**避开 `WebViewAssetLoader` 常用的 `appassets.androidplatform.net`。该区分影响修复路径的判断：修复方向是补齐包内资源，而非调整 `WebViewAssetLoader` 配置。

**修正四：处理建议中「向发布方索取新包」与「已执行生成脚本」两项前提不成立。**

- 上游两个文件在工作区与线上站点**均已存在**，生成环节无缺陷（详见 2.3）。因此「确认已执行生成脚本」不是本次的失败点。
- 本项目为自用项目，构建与发布同源，「向发布方索取」无对象，应表述为「修正机制后重新构建」。

### 2.3 原说明遗漏的关键事实

**（1）上游完整，缺口只在「进包」一步。** 线上站点核验：

| 资源 | HTTP | Content-Length | 与工作区比对 |
|---|---|---|---|
| `assets/data-tapdict.js` | 200 | 3,072,532 | 字节数一致 |
| `assets/data-examples.js` | 200 | — | 存在 |
| `assets/app.js` | 200 | — | 存在 |

即「生成 → 上线网页」链路正常，「打进 APK」链路断裂。这决定了修复方式：无需重跑生成脚本。

**（2）既有守卫对本故障**结构上无效**。** 详见第八节。

**（3）包内数据文件总数与 `www` 目录数一致，没有其他"动态插入"类资源未被纳入本次缺口。** 经全仓库检索 `createElement("script")` / `s.src =`，运行期动态插入本地脚本的位置共两处，即 `ensureTapdict()` 与 `ensureExamples()`。其余缺失项（如 `assets/data-source-health.js`）不被页面引用，不构成功能损缺。

---

## 三、现象说明

进入阅读页《Teaching and Training》后，主界面正常渲染，屏幕顶部出现应用内置资源诊断层：

- 标题：`词阅 · 壳自检`
- 内容：`脚本加载失败 https://appassets.wordlens.invalid/assets/data-tapdict.js?v=79`
- 当前地址：`https://appassets.wordlens.invalid/index.html?v=read&id=ob-teaching-and-training-disqualified`

该区域为应用内诊断层（`mobile/shell-glue.js` 注入），非系统崩溃对话框。文章标题、封面、栏目信息与底部导航均正常显示，表明主脚本已执行，故障范围限于运行期按需加载的单个脚本。

故障链条：

1. `ensureTapdict()` 创建 `<script>`，`src` 指向映射地址下的 `assets/data-tapdict.js?v=79`；
2. `AssetServer` 依映射规则查包内 `assets/assets/data-tapdict.js`；
3. 该文件不存在，拦截返回失败；
4. `<script>` 触发 `error` 事件；
5. `shell-glue.js` 的捕获型 `error` 监听记录并绘制红条。

---

## 四、运行环境

| 项目 | 值 | 核对状态 |
|---|---|---|
| 安装包 | `wordlens-1.0.3-release-vc4.apk` | 已核实（md5 `57ffa73468d58cd7412f50c4b5684f7e`） |
| 应用版本 | `1.0.3`（versionCode 4） | 已核实 |
| 包名 | `cn.wordlens.reader` | 已核实 |
| 入口 Activity | `cn.wordlens.reader.MainActivity` | 已核实 |
| minSdk / targetSdk | 26 / 35 | 已核实 |
| 资源版本 | `assetVersion = "79"` | 已核实（包内 `assets/assets/data-config.js`） |
| 终端 Android 16、WebView/Chrome 151.0.7922.199 | — | **来自现场截图，本机无设备，未独立复核** |
| 机型标识 `V2453A` | — | **来自现场截图，未独立复核** |

终端与 UA 两项仅作为自检输出的现场记录引用。其本身不影响根因判定——故障对象是明确的资源不存在，与内核版本无关（见第九节）。

---

## 五、技术原理

应用为「原生壳 + 内嵌网页」结构。

1. 原生层以 WebView 加载内置静态站点（`assets/index.html` 及配套脚本、样式、封面）。
2. 为使网页中的相对路径 `assets/…` 在 WebView 内以 HTTPS 同源方式访问本地文件，壳将页面置于虚拟主机 `https://appassets.wordlens.invalid/` 下，再由 `AssetServer` 将其映射到 APK 内部的 `assets/`。
3. 因此报错地址的含义是：**请从安装包的 `assets/assets/data-tapdict.js` 提供该脚本**；查询参数 `v=79` 仅作版本标记。

关于点词层的加载时机与数据契约（依 `assets/app.js:433-470`）：

- 不随首屏加载。`index.html:47` 注释：「点词翻译层在进入阅读页后由 app.js 按需加载，首屏不再下载 3MB 大表。」
- 加载成功后向全局写入 `TAPDICT`（词 → `{p: 音标, d: 释义}`）与 `TAP_REVERSE`（变形 → 原形）。
- 失败时 `TAP` / `TAPR` 保持为空，查词回落到四级/学习词表与文章级补充词典，主程序不中断。

---

## 六、根因

**根因：`tools/lib-mobile.cjs` 的资源白名单机制不覆盖「由 JavaScript 运行期拼接路径加载的资源」。**

该文件两条同源断言在生产中均不成立：

| 文件 | 引用方式 | 是否进入白名单 | 是否进入 APK |
|---|---|---|---|
| `assets/data-tapdict.js` | `app.js:456` 动态拼 `s.src` | 否 | 否 |
| `assets/data-examples.js` | `app.js:2912` 动态拼 `s.src` | 否 | 否 |

`planFiles()` 的三条来源（index.html 静态引用、fonts、covers、icons）与这两个文件的引用方式**没有任何交集**，因此它们的缺失是机制必然结果，而非个别遗漏。

同为构建产物、同样不在 `index.html` 中的 `assets/fonts/`、`assets/covers/`、`assets/icons/` 之所以安然无恙，是因为白名单为它们**单列了整目录规则**。按需加载的 `.js` 文件没有获得同等对待——这是缺陷的具体形态。

---

## 七、影响范围

**仍可用**

- 应用启动、栏目浏览、打开文章；
- 首屏已声明加载的词库与文章数据（四级词、中学词、ECDICT 子集、文章补充词表等）；
- 界面主题、字号等不依赖 `TAPDICT` 的功能；
- 朗读（走原生 TTS 垫片 `TtsBridge.java`，与本次失败无直接关联）。

**受损**

- 阅读页点选非学习词、以及复数 / 过去式 / `-ing` 等词形变化形式时，释义可能缺失或无响应；
- 点词层本应覆盖、但不在四级/学习词表中的高频词；
- 词卡展开「更多」时例句库加载失败（`data-examples.js` 缺失的对应症状）；
- 顶部长期显示自检红条，遮挡部分阅读区域。

**不构成**

- 整包无法启动；
- 该篇文章被服务端下架（封面与文案已从本地资源读出）；
- 因 `.invalid` 域名被运营商拦截。

---

## 八、既有守卫为何未拦截

这是本次最值得归档的一条：**该故障对应的守卫本已存在，但它是同义反复、结构上不可能变红。**

`tools/audit.js:2720-2724`：

```js
const plan = libMobile.planFiles();                         // 内部即扫 index.html
const htmlRefs = [...fs.readFileSync('index.html','utf8')   // 守卫又扫同一个文件
  .matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^"]*)?"/g)].map(m => m[1]);
const missing = [...new Set(htmlRefs)].filter(f => !plan.includes(f));
ok('★ 白名单覆盖 index.html 引用的全部 assets（新增资源忘了带 → 这条红）', missing.length === 0);
```

左侧 `planFiles()` 的规则①**就是**扫描 `index.html` 的 `src/href`（`lib-mobile.cjs:37`），右侧守卫用**同一个正则、同一个源文件**再扫一遍，随后断言 `X ⊆ X`。该断言恒为真。

其注释自称「新增资源忘了带 → 这条红」——该保护**不成立**。它只能覆盖「`index.html` 静态引用」这一个子集，而真正的漏洞域是「运行期动态引用」，两个集合完全不相交。

同一形态在 `audit.js:3345-3346` 复现：`apk` 侧「白名单缺项必须报」的期望值同样取自 `planFiles()`，属自我比对。

**结论**：本次故障不是「守卫没写」，而是「守卫与被测对象共用同一个抽取器」，退化为空转。修守卫时须引入**独立于白名单的第二来源**——从运行期代码中抽取动态加载路径，与包内实际条目比对。

---

## 九、可排除项

1. **公网 DNS / 国际网络。** `*.invalid` 为 RFC 2606 保留后缀，本就不解析；壳不依赖该主机解析为真实 IP（`AssetServer.java:78` 明确外域不插手）。
2. **单纯缓存问题。** 缺失对象为安装包内文件。清理 WebView 缓存或强制停止后，同一 APK 仍会请求同一路径并再次失败。
3. **内核或系统版本不兼容。** 失败对象是明确的资源不存在，非脚本语法在内核上报错。终端 UA 仅由自检附带输出，不参与判定。
4. **`v=79` 与页面版本不一致。** 包内 `data-config.js` 为 `79`，14 个首屏脚本查询参数同为 `79`，版本号齐整；问题在于该版本对应的点词表与例句库未随包提供。
5. **生成环节故障。** 工作区与线上站点两个文件均完整，线上 `data-tapdict.js` 的 `Content-Length` 为 3,072,532，与工作区字节数一致。

---

## 十、处理建议

**1. 修正白名单机制（根本处理）**

在 `tools/lib-mobile.cjs` 的 `planFiles()` 中补入运行期按需加载的资源。建议采用「从运行期代码抽取」而非「再写一份硬编码清单」，避免下次新增按需资源时重现同一盲区。至少须覆盖：

- `assets/data-tapdict.js`
- `assets/data-examples.js`

**2. 修正守卫（防止复发）**

在 `tools/audit.js` 的 `[T]` 节引入第二来源：扫描 `assets/app.js` 中动态拼接的本地脚本路径，断言其全部存在于 `planFiles()`/包内条目。当前那条自我比对的断言应一并去除或改为有效形式。

按项目既有规范，新守卫必须做负向测试：注入「移除 `data-tapdict.js` 白名单」的坏样本，确认**只有该条**变红，再还原。

**3. 重新构建安装包**

- 因壳内容变化，须先递增 `mobile/version.json` 的 `versionCode`；
- 出包后按 `wordlens-android-shell-release` 技能第三节的四把尺子核验（原始字节、工具口径、自研直读、对齐与签名）；
- 交付前独立复跑 `apksigner verify --verbose`。

**4. 临时替代（不修复当前 APK）**

上游以纯静态页提供完整资源，可在系统浏览器打开：

https://shjdd134.github.io/ciyue/

网页版按需加载同一套 `data-tapdict.js`（已核验 HTTP 200、3,072,532 字节）。该方式仅绕过缺失文件，不改变 APK 状态。

**5. 不建议作为修复手段**

- 反复开关飞行模式，或仅清缓存后重装同一份 `1.0.3-release-vc4`；
- 修改系统 DNS、为 `.invalid` 配置 hosts；
- 将红条理解为需要重刷系统的严重错误；
- 重跑 `tools/build-tapdict.mjs`（生成产物无缺失，重跑不解决进包问题）。

---

## 十一、验收标准

修复后进入任意阅读页，应同时满足：

1. 顶部不再出现「词阅 · 壳自检 / 脚本加载失败 … `data-tapdict.js`」；
2. 点击非学习词、常见变形词均能还原并给出释义；
3. 词卡展开「更多」时例句正常显示（验证 `data-examples.js` 同时到位）；
4. 包内条目直读可见 `assets/assets/data-tapdict.js` 与 `assets/assets/data-examples.js`。

---

## 附录 A 证据索引

| 事实 | 位置 |
|---|---|
| 包名 / 版本 / 应用名 | `aapt2 dump badging` 产物 |
| 虚拟主机常量 | `mobile/android/src/cn/wordlens/reader/AssetServer.java:42-43` |
| 本地资源读取 | `AssetServer.java:86`（`ctx.getAssets().open(rel)`） |
| 外域不插手 | `AssetServer.java:78` |
| 自检文案 | `mobile/shell-glue.js:254-255` |
| 自检只报 SCRIPT | `mobile/shell-glue.js:266-276`，判据在 `:271` |
| 红条首触发定稿 | `mobile/shell-glue.js:237` |
| 白名单声明 | `tools/lib-mobile.cjs:1`、`:34-44`、正则 `:37` |
| 白名单预告的风险 | `tools/lib-mobile.cjs:8` |
| 点词动态加载 | `assets/app.js:448-470`，`s.src` 在 `:456` |
| 例句动态加载 | `assets/app.js:2896`、`:2902-2912` |
| 首屏不含点词层（注释） | `index.html:47` |
| 首屏不含例句库（注释） | `index.html:43-44` |
| 自比对的守卫 | `tools/audit.js:2720-2724` |
| 同形态守卫 | `tools/audit.js:3345-3346` |
| 包内资源版本 | APK 内 `assets/assets/data-config.js` → `assetVersion: "79"` |
| 包内 JS 条目（14 个，无 tapdict / examples） | `tools/lib-zip.cjs` 直读，106 条目、`problems: []` |
| 上游文件完整性 | 工作区 3,072,532 / 573,132 字节；线上 `Content-Length: 3072532` |

## 附录 B 与原说明的差异台账

| 章节 | 原说明 | 核对后 |
|---|---|---|
| 二 | 运行环境表 | 属实；终端型号与 UA 标注为未独立复核 |
| 四 | 映射由 `WebViewAssetLoader` 一类机制完成 | 修正为自研 `AssetServer.java`，且刻意避开该域名 |
| 五 | 根因 = 发布打包时未将构建产物写入 `assets/` | 修正为白名单机制不覆盖运行期动态引用 |
| 六 | 受损仅点词层 | 增加例句库同样缺失 |
| 七 | 四条可排除项 | 全部成立，另补「生成环节无故障」 |
| 八 | 建议确认已执行生成脚本 | 生成环节无缺陷，该步非失败点；改为修正机制与守卫 |
| 八 | 「向发布方索取新包」 | 自用项目，改为「修正后重新构建」 |
| — | 未涉及 | 新增第八节：既有守卫为同义反复，结构上失效 |
