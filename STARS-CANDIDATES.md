# 明星栏目 · 历史通道候选清单（2026-09-14 定稿）

> 由 `node tools/fetch-classics.mjs --months 8` 生成于 2026/9/14 21:00:15。
> **这一步不写库、不发线上**——先看货对不对，再决定是否接入管线。

## 0. 本次扫描

- 货源：Vogue US `/slideshow/` · British Vogue `/gallery/`，sitemap 按最近 **8** 个月分片
- 全量 URL **1292** 条 → 命中经典回顾型 **60** 条（slug 命中女性名单 **43** · 待人工确认 **15** · 已排除男性 **2**）
- 实测 **58** 条：跨站重复归并 **3** 条 · 提取失败 **0** 条 · 请求失败 **0** 条

**口径**（两个坑写在这里防复发）：

- 图数 = 正文容器内 `<figure>` 的个数，**不是 `<img>` 标签数**。Vogue slideshow 的 `<img>` 只有 7 个而 `<figure>` 有 16 个（用 `<picture>` + `<source srcset>`），数 `<img>` 会低估一半；也不能全文数——相关文章推荐位会混进来，实测出现过「单篇 589 张图」的假值。
- 「≤2005」= 图注含 2005 年及以前的**张数**，不是去重后的年份个数。按年份数算会把产量低估一个数量级。

**入选门槛**（全过，见第 1 节）：名单确认女性 · 图注带 ≤2005 年份的图 ≥10 张 · 同一人物只留一篇 · 图 ≥6 张 · 正文 ≥80 词 且 正文+图注 ≥300 词

**「图注人物」列**：从图注里实际识别到的人物性别分布。slug 命中女性名单 **不等于**这一篇里只有女性——影展回顾那类常常男女同框。

---

## 1. 入选池 · 24 条（2026-09-14 定稿）

**这就是要接进明星栏目的名单。** 四条硬规则：

1. **名单确认女性** —— 主题型群像不收。栏目定位是「按人物精选」，威尼斯影展／Met Gala／模特封面那类不属于，用户已明确排除。
2. **图注带 ≤2005 年份的图 ≥10 张** —— 这才是「旧照回顾」。判断的是照片拍摄年代，不是文章发布日期：今天发的九十年代影像照样入选。
3. **同一人物只留一篇**（取早期影像多的那版）—— 同栏目连出同一人两篇会掉体验。
4. **文字够读**：图 ≥6 张 + **正文 ≥80 词 且 正文+图注 ≥300 词**。

> 第 4 条 2026-09-14 从「正文 ≥300 词」改过来。原因是**门槛标错了对象**：旧线是照新闻文章定的，而 Vogue 经典回顾的本体是图集——正文中位数只有 185 词，图注中位数 362 词，把「这张旧照是谁、哪年、穿的什么」讲清楚的正是图注。只按正文卡，29 条满足全部内容规则的候选里只剩 3 条（碧昂丝 45 图 / 41 张早期影像，正文 178 词 + 图注 641 词，被判「文字太薄」）。改后 24 人 / 26 条。

> ⚠️ 但要知道代价：**图注在阅读页渲染成 `<figcaption>`，不进句子流 —— 不可点读、没有中文译文**。所以一篇的「中英对照」只有那 80—250 词的导语，其余是英文图注。要让图注也变成可点读的正文字，属展示层改造（第三阶段），已记录待办。

| slug | 图 | 图注 | 带年代 | ≤2005 | 正文词 | 图注词 | 图注人物 |
|---|---|---|---|---|---|---|---|
| [`diana-princess-of-wales-style-evolution`](https://www.vogue.com/slideshow/diana-princess-of-wales-style-evolution) | **54** | 53 | 53 | **53** | 482 | 1692 | 女 30（+9男） |
| [`45-throwback-photos-of-a-young-beyonce`](https://www.vogue.com/slideshow/45-throwback-photos-of-a-young-beyonce) | **45** | 45 | 45 | **41** | 178 | 641 | 女 7（+1男） |
| [`vintage-pictures-barbra-streisand-young`](https://www.vogue.com/slideshow/vintage-pictures-barbra-streisand-young) | **29** | 29 | 29 | **29** | 92 | 1019 | 女 6（+2男） |
| [`29-vintage-photos-of-victoria-beckham`](https://www.vogue.com/slideshow/29-vintage-photos-of-victoria-beckham) | **29** | 29 | 28 | **28** | 238 | 373 | 女 1（+1男） |
| [`young-princess-anne-photos`](https://www.vogue.com/slideshow/young-princess-anne-photos) | **24** | 24 | 24 | **24** | 140 | 365 | 女 3（+2男） |
| [`vintage-photos-of-halle-berry`](https://www.vogue.com/slideshow/vintage-photos-of-halle-berry) | **24** | 23 | 23 | **22** | 108 | 469 | 女 2 |
| [`vintage-pictures-of-meryl-streep-young`](https://www.vogue.com/slideshow/vintage-pictures-of-meryl-streep-young) | **23** | 23 | 22 | **22** | 148 | 412 | 仅男 1 |
| [`vintage-pictures-of-charlotte-rampling`](https://www.vogue.com/slideshow/vintage-pictures-of-charlotte-rampling) | **22** | 22 | 21 | **21** | 322 | 278 | 未识别 |
| [`vintage-photos-salma-hayek`](https://www.vogue.com/slideshow/vintage-photos-salma-hayek) | **21** | 21 | 21 | **21** | 219 | 386 | 女 3（+2男） |
| [`vintage-photos-of-natalie-portman`](https://www.vogue.com/slideshow/vintage-photos-of-natalie-portman) | **21** | 21 | 21 | **21** | 220 | 420 | 女 1（+3男） |
| [`sarah-jessica-parker-through-the-years`](https://www.vogue.com/slideshow/sarah-jessica-parker-through-the-years) | **20** | 20 | 20 | **20** | 145 | 692 | 女 3 |
| [`vintage-photos-of-sandra-bullock`](https://www.vogue.com/slideshow/vintage-photos-of-sandra-bullock) | **20** | 19 | 19 | **19** | 164 | 331 | 仅男 1 |
| [`luminous-photos-of-a-young-penelope-cruz`](https://www.vogue.com/slideshow/luminous-photos-of-a-young-penelope-cruz) | **18** | 18 | 18 | **18** | 217 | 348 | 女 1 |
| [`vintage-photos-of-madonna`](https://www.vogue.com/slideshow/vintage-photos-of-madonna) | **18** | 17 | 17 | **17** | 210 | 389 | 女 6 |
| [`17-striking-throwback-photos-of-a-young-cate-blanchett`](https://www.vogue.com/slideshow/17-striking-throwback-photos-of-a-young-cate-blanchett) | **17** | 17 | 17 | **17** | 153 | 441 | 女 2 |
| [`martha-stewart-young-vintage-photos`](https://www.vogue.com/slideshow/martha-stewart-young-vintage-photos) | **31** | 29 | 16 | **16** | 597 | 832 | 女 16 |
| [`charlize-theron-in-the-1990s`](https://www.vogue.com/slideshow/charlize-theron-in-the-1990s) | **17** | 16 | 16 | **16** | 171 | 240 | 女 1 |
| [`throwback-photos-of-renee-zellweger`](https://www.vogue.com/slideshow/throwback-photos-of-renee-zellweger) | **15** | 15 | 15 | **15** | 185 | 507 | 女 2 |
| [`23-vintage-photos-of-elizabeth-taylor-in-the-summer`](https://www.vogue.com/slideshow/23-vintage-photos-of-elizabeth-taylor-in-the-summer) | **23** | 22 | 14 | **14** | 116 | 312 | 女 14 |
| [`18-vintage-photos-of-audrey-hepburns-idyllic-summertime-style`](https://www.vogue.com/slideshow/18-vintage-photos-of-audrey-hepburns-idyllic-summertime-style) | **18** | 18 | 13 | **13** | 236 | 304 | 女 1 |
| [`15-best-style-moments-joan-rivers`](https://www.vogue.com/slideshow/15-best-style-moments-joan-rivers) | **15** | 15 | 15 | **13** | 163 | 194 | 女 3（+1男） |
| [`michelle-yeoh-vintage-photos`](https://www.vogue.com/slideshow/michelle-yeoh-vintage-photos) | **14** | 13 | 13 | **13** | 135 | 264 | 女 2 |
| [`young-rose-byrne`](https://www.vogue.co.uk/gallery/young-rose-byrne) | **20** | 20 | 19 | **12** | 222 | 316 | 女 3（+2男） |
| [`reese-witherspoon-beauty-looks-90s`](https://www.vogue.com/slideshow/reese-witherspoon-beauty-looks-90s) | **11** | 11 | 11 | **11** | 196 | 190 | 未识别 |

<details><summary>图注样本（判断内容质量用）</summary>

**`diana-princess-of-wales-style-evolution`**
- Photo: Getty Images 1980 A 19-year-old Diana Spencer wore a red blazer, pinstripe skit, and black sweater on the streets of London’s Chelsea neighborhood, where she worked at a nursery schoo
- Photo: Getty Images 1981 Lady Diana wore a cobalt blue Cojana suit with a white pussy-bow blouse to stroll the grounds of Buckingham Palace during the announcement of her engagement to Princ
- Photo: Getty Images 1981 The pink alpaca sweater Diana wore at Balmoral ahead of her wedding to Prince Charles was purchased for around £ 5.75 ($8) in London at a Peruvian shop. The almost-P

**`45-throwback-photos-of-a-young-beyonce`**
- Photo: Getty Images 1990 A nine-year-old Beyoncé and four-year-old Solange celebrating Christmas at home.
- Photo: Getty Images 1997 Destiny’s Child in a recording studio in southwest Houston.
- Photo: Getty Images 1998 Beyoncé performing with Destiny’s Child at halftime during a game between the New York Giants and the New York Jets.

**`vintage-pictures-barbra-streisand-young`**
- Photo: Getty Images Early 1960s Born in Brooklyn on April 24, 1942, Barbra Streisand began her music career in the early 1960s, stringing together gigs at New York nightclubs while she audit
- Photo: Getty Images 1963 With Judy Garland on The Judy Garland Show, where the two performed a stirring rendition of the 1929 standard “Happy Days Are Here Again” crossed with Harold Arlen a
- Photo: Getty Images Early 1960s Modeling a vintage coat from her wardrobe. “I haunt local thrift shops and offbeat stores. You can find more interesting clothes there,” she told Cue magazine

**`29-vintage-photos-of-victoria-beckham`**
- Photo: Getty Images 1996 A young VB has her photo taken in Paris.
- Photo: Getty Images 1996 A Spice Girls sojourn to Miami, sans Geri Halliwell.
- Photo: Getty Images 1995 Hanging with Anna Friel at a party.

**`young-princess-anne-photos`**
- Photo: Getty Images 1950 Queen Elizabeth II holds a newborn Princess Anne.
- Photo: Getty Images 1951 Princess Anne as a baby, with her parents and older brother, Charles.
- Photo: Getty Images 1951 Giggling on her mother’s lap, besides Charles, during a portrait session.

**`vintage-photos-of-halle-berry`**
- Photo: Getty Images 1986 A 19-year-old Berry—who, as Miss Ohio, was the first runner-up for Miss USA in 1986—poses with Miss Georgia, Tami Tesch, the second runner-up; Miss Texas, Christy Fi
- Photo: Getty Images 1986 Berry, now 20, amid other contestants for Miss World in London.
- Photo: Getty Images 1989 With Deborah Tucker, Alison Elliott, and Leah Remini in a promotional shot for the ABC TV sitcom Living Dolls, which gave Berry her first acting role. (The show was 

</details>

### 1a. 同人物去重合并（2 条）

同一个人各发了两篇（复古照一篇 + 近期妆容盘点一篇），只留早期影像多的：

| 被合并 | 人物 | 保留 |
|---|---|---|
| `most-iconic-photographs-of-princess-diana` | princess diana | `diana-princess-of-wales-style-evolution` |
| `victoria-beckham-best-beauty-looks-to-date` | victoria beckham | `29-vintage-photos-of-victoria-beckham` |

### 1b. 文字太薄，先不入池（3 条）

图和早期影像都达标，但正文 <80 词或正文+图注 <300 词。**这是英语学习站的实际约束** —— 文字太少，点词查义、逐句对照都没多少可查的：

| slug | 图 | 图注 | 带年代 | ≤2005 | 正文词 | 图注词 | 图注人物 |
|---|---|---|---|---|---|---|---|
| [`vintage-pictures-jennifer-coolidge`](https://www.vogue.com/slideshow/vintage-pictures-jennifer-coolidge) | **12** | 12 | 12 | **12** | 91 | 204 | 未识别 |
| [`cameron-diaz-beauty-looks`](https://www.vogue.co.uk/gallery/cameron-diaz-beauty-looks) | **25** | 25 | 25 | **14** | 129 | 105 | 女 1 |
| [`jerry-hall-british-vogue-1970s-norman-parkinson`](https://www.vogue.co.uk/gallery/jerry-hall-british-vogue-1970s-norman-parkinson) | **10** | 10 | 10 | **10** | 256 | 30 | 未识别 |

### 1c. 被早期影像门槛挡下（11 条，已确认删除）

图反而更多（22—37 张），但图注带 ≤2005 年份的图 <10 张。**按拍摄年代判断它们不是旧照回顾** —— 是「历代妆容／造型盘点」，年份集中在近几年。这正是「不能按图片数量入选」的证据：图数最多的几条恰恰不是想要的。

| slug | 图 | 图注 | 带年代 | ≤2005 | 正文词 | 图注词 | 图注人物 |
|---|---|---|---|---|---|---|---|
| [`angelina-jolie-beauty-looks`](https://www.vogue.co.uk/gallery/angelina-jolie-beauty-looks) | **19** | 18 | 18 | **8** | 186 | 294 | 女 1 |
| [`bella-hadid-cannes-best-moments`](https://www.vogue.com/slideshow/bella-hadid-cannes-best-moments) | **32** | 32 | 30 | **7** | 438 | 394 | 未识别 |
| [`vintage-photos-of-a-young-dolly-parton`](https://www.vogue.com/slideshow/vintage-photos-of-a-young-dolly-parton) | **19** | 19 | 8 | **7** | 185 | 639 | 女 1 |
| [`25-vintage-photos-of-jackie-kennedy-summering-in-hyannis-port-massachusetts`](https://www.vogue.com/slideshow/25-vintage-photos-of-jackie-kennedy-summering-in-hyannis-port-massachusetts) | **25** | 25 | 6 | **6** | 299 | 453 | 女 14 |
| [`beyonce-best-beauty-looks`](https://www.vogue.co.uk/gallery/beyonce-best-beauty-looks) | **28** | 28 | 28 | **5** | 156 | 463 | 女 3 |
| [`madonna-2000s-fashion`](https://www.vogue.co.uk/gallery/madonna-2000s-fashion) | **11** | 11 | 11 | **1** | 259 | 42 | 女 1 |
| [`ariana-grande-best-outfits-of-all-time`](https://www.vogue.com/slideshow/ariana-grande-best-outfits-of-all-time) | **37** | 37 | 0 | **0** | 266 | 114 | 未识别 |
| [`zendaya-best-beauty-looks`](https://www.vogue.co.uk/gallery/zendaya-best-beauty-looks) | **31** | 31 | 31 | **0** | 211 | 604 | 女 14 |
| [`taylor-swift-beauty-looks`](https://www.vogue.co.uk/beauty/gallery/taylor-swift-beauty-looks) | **26** | 25 | 25 | **0** | 156 | 508 | 未识别 |
| [`zoe-kravitz-best-beauty-looks`](https://www.vogue.co.uk/gallery/zoe-kravitz-best-beauty-looks) | **22** | 21 | 21 | **0** | 249 | 321 | 未识别 |
| [`daisy-edgar-jones-beauty-looks`](https://www.vogue.co.uk/gallery/daisy-edgar-jones-beauty-looks) | **15** | 14 | 14 | **0** | 164 | 206 | 未识别 |

### 1d. 图不足 6 张（0 条）

无。

### 1e. 主题型群像（15 条，已排除）

slug 里没有具体人物，是群像／活动／时装类回顾。**若这组里出现具体人物名，说明 `FEMALE` 名单漏了人 —— 补进名单即可自动归位。**

| slug | 图 | 图注 | 带年代 | ≤2005 | 正文词 | 图注词 | 图注人物 |
|---|---|---|---|---|---|---|---|
| [`venice-film-festival-throwback-photos-from-the-90s-and-early-aughts`](https://www.vogue.com/slideshow/venice-film-festival-throwback-photos-from-the-90s-and-early-aughts) | **39** | 38 | 38 | **38** | 188 | 782 | 女 17（+3男） |
| [`best-venice-film-festival-looks-of-all-time`](https://www.vogue.com/slideshow/best-venice-film-festival-looks-of-all-time) | **100** | 99 | 99 | **23** | 266 | 514 | 女 49（+1男） |
| [`oscars-nominees-luncheon-throwback-photos`](https://www.vogue.co.uk/gallery/oscars-nominees-luncheon-throwback-photos) | **22** | 22 | 22 | **22** | 158 | 687 | 女 7 |
| [`most-iconic-moments-from-venice-film-festival`](https://www.vogue.co.uk/arts-and-lifestyle/gallery/most-iconic-moments-from-venice-film-festival) | **21** | 21 | 21 | **21** | 108 | 377 | 女 7（+1男） |
| [`notting-hill-carnival-archive-pictures`](https://www.vogue.co.uk/gallery/notting-hill-carnival-archive-pictures) | **63** | 60 | 19 | **19** | 423 | 675 | 未识别 |
| [`the-best-met-gala-looks-of-all-time`](https://www.vogue.co.uk/gallery/the-best-met-gala-looks-of-all-time) | **100** | 100 | 100 | **18** | 376 | 852 | 女 53（+4男） |
| [`archive-vogue-model-covers`](https://www.vogue.co.uk/arts-and-lifestyle/gallery/archive-vogue-model-covers) | **19** | 19 | 19 | **12** | 169 | 478 | 女 8 |
| [`best-1990s-oscars-dresses`](https://www.vogue.co.uk/gallery/best-1990s-oscars-dresses) | **10** | 10 | 10 | **10** | 118 | 806 | 女 10 |
| [`the-brits-through-the-years`](https://www.vogue.co.uk/gallery/the-brits-through-the-years) | **14** | 12 | 12 | **9** | 748 | 1503 | 混合 6女/5男 |
| [`best-met-gala-debuts-of-all-time`](https://www.vogue.co.uk/gallery/best-met-gala-debuts-of-all-time) | **36** | 36 | 36 | **7** | 255 | 1044 | 女 17（+1男） |
| [`best-throwback-tennis-dresses`](https://www.vogue.co.uk/gallery/best-throwback-tennis-dresses) | **19** | 19 | 19 | **6** | 175 | 187 | 未识别 |
| [`wimbledon-best-beauty-looks`](https://www.vogue.co.uk/gallery/wimbledon-best-beauty-looks) | **55** | 54 | 44 | **1** | 132 | 1010 | 女 16 |
| [`justin-bieber-hailey-bieber-mismatched-couple-style-through-the-years`](https://www.vogue.com/slideshow/justin-bieber-hailey-bieber-mismatched-couple-style-through-the-years) | **26** | 25 | 25 | **0** | 340 | 78 | 未识别 |
| [`2006-cannes-film-festival-red-carpet-throwback`](https://www.vogue.com/slideshow/2006-cannes-film-festival-red-carpet-throwback) | **26** | 22 | 0 | **0** | 529 | 114 | 女 13 |
| [`did-grandmother-know-best-designers-reimagined-1950s-stoles-and-shrugs-for-fall`](https://www.vogue.com/slideshow/did-grandmother-know-best-designers-reimagined-1950s-stoles-and-shrugs-for-fall) | **22** | 0 | 0 | **0** | 129 | 0 | 未识别 |

### 1f. ⚠ 提取失败（0 条）

**不是这些专题图少，是解析没吃下它们的页面模板**（老版 Vogue 的图 URL 不带扩展名，被白名单滤成 0 张 —— `25-vintage-photos-of-jackie-kennedy…` 就这么当过「0 张图」）。已修；若再次出现，说明又出了新模板。

无。

### 1g. 跨站重复，已归并（3 条）

同一条内容在美版与英版各发一次。**两个「看起来该管用」的指纹都实测失效**：图注文本两站各写各的、图片 id 交集为 0（各传一份副本）。只能用「同一人物 + 图数接近 + 年代集合重合」判，保留更全的那版。入库时**必须去重**，否则栏目里会出现两篇一样的。

| 重复条目 | 归并到 |
|---|---|
| `young-beyonce-knowles-pictures` | `45-throwback-photos-of-a-young-beyonce` |
| `young-dolly-parton-photos` | `vintage-photos-of-a-young-dolly-parton` |
| `reese-witherspoon-beauty-looks-90s` | `reese-witherspoon-beauty-looks-90s` |

---

## 2. 关键词层已排除（不进检测）

- **男性人物 2 条**：vintage-pictures-of-hugh-grant · vintage-pictures-of-harrison-ford
- **商业活动／生活方式**：关键词排除（party / opening / launch / dinner / collection / runway / shopping…）。实测这类占 Vogue slideshow 的 **54%** —— 不主动排除的话，抓回来的大半是品牌派对与开业酒会。
- **近期红毯／周更栏目**：`of-the-week`、`best-dressed`、以及 slug 里带近三年年份的。实测 `all-the-best-looks-from-the-2026-venice-film-festival` 有 100 张图但 0 张早期影像 —— 是今年红毯，不是回顾。

## 3. 下一步

名单已定稿。接下来接入已上线的采集与发布管线：
1. `tools/ingest.mjs` —— 历史通道源（sitemap）+ `cap` 进库 + 明星图上限 4→16 + ≥6 张有效图门槛。
2. `tools/recommend.mjs` —— 图片从软加分改成硬门槛。
3. `tools/publish.mjs` —— 经典专题长期保留（`pin` 或把「明星」加进常青栏目）。
