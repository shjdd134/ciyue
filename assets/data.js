/* 词阅 WordLens —— 数据层
 *
 * 内置数据：
 *   WORDS_CORE  —— 30 个精选高频词（含词根词缀/同根词/真题例句/助记），覆盖四级考纲 List 1-2
 *   WORDS_BULK  —— 220 个常见四级词（基础字段），覆盖 List 3-13（与 data-words-bulk.js 合并后共 250）
 *   ARTICLES    —— 14 篇真实报道（BBC Sport / The Guardian / ESPN / Smithsonian / People / Mercury News 原文摘录）
 *                  另有 53 篇抓取文章见 assets/data-articles-extra.js（node tools/ingest.mjs --append 追加）
 *
 * 加载顺序（index.html）：
 *   data.js          → window.WORDS_CORE / window.ARTICLES / window.CATEGORIES
 *   data-words-bulk.js → window.WORDS_BULK
 *   app.js           → 合并 WORDS = WORDS_CORE.concat(WORDS_BULK)
 *
 * 拉到完整 4505 词：
 *   在能联网的机器执行 `node tools/import-cet4.js`，会生成 data-words-full.js，
 *   包含从 Lanyifan/CET4words 仓库的 4505 个四级词（含音标、释义）。无真题例句，
 *   用于填充词库总量和搜索；核心高频词仍走 WORDS_CORE（含完整学习字段）。
 */

const WORDS_CORE = [
  { word: "resilient", list: "List 1", phonetic: "/rɪˈzɪliənt/", pos: "adj.", def: "有韧性的；能迅速恢复的",
    prefix: { m: "re-", t: "前缀 · 反复" }, root: { m: "sil", t: "词根 · 跳" }, suffix: { m: "-ient", t: "后缀 · 形容词" },
    literal: "re (反复) + sil (跳) → 反复弹起来 → 有韧性的",
    cognates: "resilience n. 恢复力 · resile v. 弹回 · elasticity n. 弹性",
    collocation: "a resilient economy · 2023 卷一 阅读 B",
    mnemonic: "被压下去还能反复跳起来，就是 resilient。",
    example: "Despite several setbacks, the team remained resilient and finished the project on time.",
    exampleCn: "尽管屡遭挫折，团队依然保持韧性，按时完成了项目。",
    source: "四级真题例句 · 2024 卷二" },

  { word: "comprehensive", list: "List 1", phonetic: "/ˌkɒmprɪˈhensɪv/", pos: "adj.", def: "全面的；综合的；广泛的",
    prefix: { m: "com-", t: "前缀 · 共同" }, root: { m: "prehens", t: "词根 · 抓住" }, suffix: { m: "-ive", t: "后缀 · 形容词" },
    literal: "com (全部) + prehens (抓住) → 全部抓住的",
    cognates: "comprehend v. 理解 · apprentice n. 学徒 · reprisal n. 报复",
    collocation: "a comprehensive analysis · 2023 卷一 阅读 C",
    mnemonic: "把全部要点都「抓」住，才叫全面。",
    example: "The report offers a comprehensive analysis of urban transport costs.",
    exampleCn: "该报告对城市交通成本进行了全面分析。",
    source: "四级真题例句 · 2023 卷一" },

  { word: "reluctant", list: "List 1", phonetic: "/rɪˈlʌktənt/", pos: "adj.", def: "不情愿的；勉强的",
    prefix: { m: "re-", t: "前缀 · 反对" }, root: { m: "luct", t: "词根 · 挣扎" }, suffix: { m: "-ant", t: "后缀 · 形容词" },
    literal: "re (反对) + luct (挣扎) → 一路挣扎着抗拒 → 不情愿",
    cognates: "reluctance n. 不情愿 · reluctant consent 勉强同意",
    collocation: "be reluctant to do sth · 2022 卷三 完形",
    mnemonic: "心里一直在「挣扎反对」，就是 reluctant。",
    example: "Many students are reluctant to speak up in a large class.",
    exampleCn: "许多学生不愿意在大班上发言。",
    source: "四级真题例句 · 2022 卷三" },

  { word: "relentless", list: "List 1", phonetic: "/rɪˈlentləs/", pos: "adj.", def: "持续强烈的；不屈不挠的",
    prefix: { m: "re-", t: "前缀 · 反复" }, root: { m: "lent", t: "词根 · 让步" }, suffix: { m: "-less", t: "后缀 · 无" },
    literal: "re (反复) + lent (让步) + less (不) → 不肯让步 → 不停的",
    cognates: "relent v. 变温和 · unrelenting adj. 持续不断的",
    collocation: "relentless pressure · 2023 卷二 阅读 A",
    mnemonic: "死活不肯「让步」，逼得人喘不过气。",
    example: "The team kept up relentless pressure for ninety minutes.",
    exampleCn: "球队在九十分钟里保持了持续不断的压迫。",
    source: "四级真题例句 · 2023 卷二" },

  { word: "setback", list: "List 1", phonetic: "/ˈsetbæk/", pos: "n.", def: "挫折；阻碍；倒退",
    prefix: null, root: { m: "set back", t: "复合 · 往回推" }, suffix: null,
    literal: "set (放置) + back (向后) → 被往后推 → 挫折",
    cognates: "drawback n. 缺点 · setback recovery 挫折恢复",
    collocation: "suffer a setback · 2024 卷一 阅读 B",
    mnemonic: "进度被往后推一格，就是 setback。",
    example: "The injury was a serious setback to her Olympic hopes.",
    exampleCn: "这次受伤是对她奥运梦想的一次严重挫折。",
    source: "四级真题例句 · 2024 卷一" },

  { word: "undermine", list: "List 1", phonetic: "/ˌʌndəˈmaɪn/", pos: "v.", def: "暗中破坏；逐渐削弱",
    prefix: { m: "under-", t: "前缀 · 在下面" }, root: { m: "mine", t: "词根 · 挖掘" }, suffix: null,
    literal: "under (在下面) + mine (挖) → 在下面挖空 → 削弱根基",
    cognates: "undermine confidence 动摇信心 · undermine authority 削弱权威",
    collocation: "undermine the foundation · 2022 卷二 阅读 C",
    mnemonic: "从底下把地基挖空，表面还看不出来。",
    example: "Constant criticism can undermine a child's confidence.",
    exampleCn: "不断的批评会削弱孩子的自信心。",
    source: "四级真题例句 · 2022 卷二" },

  { word: "sustain", list: "List 1", phonetic: "/səˈsteɪn/", pos: "v.", def: "维持；支撑；承受",
    prefix: { m: "sus-", t: "前缀 · 在下面" }, root: { m: "tain", t: "词根 · 握住" }, suffix: null,
    literal: "sus (在下) + tain (握住) → 从下面托住 → 支撑",
    cognates: "maintain v. 维持 · retain v. 保留 · obtain v. 获得",
    collocation: "sustain growth · 2023 卷三 阅读 B",
    mnemonic: "从底下「握住」不让它掉下来，就是 sustain。",
    example: "The company struggled to sustain growth in a shrinking market.",
    exampleCn: "该公司难以在萎缩的市场中维持增长。",
    source: "四级真题例句 · 2023 卷三" },

  { word: "abundant", list: "List 2", phonetic: "/əˈbʌndənt/", pos: "adj.", def: "丰富的；充裕的",
    prefix: { m: "ab-", t: "前缀 · 加强" }, root: { m: "und", t: "词根 · 波浪" }, suffix: { m: "-ant", t: "后缀 · 形容词" },
    literal: "ab (加强) + und (波浪) → 像波浪一样涌来 → 丰富的",
    cognates: "abound v. 大量存在 · abundance n. 丰富 · redundant adj. 多余的",
    collocation: "abundant evidence · 2021 卷一 阅读 C",
    mnemonic: "一波一波涌过来，多到溢出来。",
    example: "There is abundant evidence that sleep improves memory.",
    exampleCn: "有大量证据表明睡眠能改善记忆力。",
    source: "四级真题例句 · 2021 卷一" },

  { word: "adequate", list: "List 2", phonetic: "/ˈædɪkwət/", pos: "adj.", def: "足够的；适当的；胜任的",
    prefix: { m: "ad-", t: "前缀 · 朝向" }, root: { m: "equ", t: "词根 · 相等" }, suffix: { m: "-ate", t: "后缀 · 形容词" },
    literal: "ad (朝向) + equ (相等) → 与所需相等 → 足够的",
    cognates: "equal adj. 相等的 · equation n. 等式 · adequate for 足以应付",
    collocation: "adequate supply · 2022 卷一 完形",
    mnemonic: "刚好和需求「相等」，不多不少刚刚好。",
    example: "The shelter lacks an adequate supply of clean water.",
    exampleCn: "该避难所缺乏充足的清洁水供应。",
    source: "四级真题例句 · 2022 卷一" },

  { word: "advocate", list: "List 2", phonetic: "/ˈædvəkeɪt/", pos: "v./n.", def: "提倡，主张 / 倡导者",
    prefix: { m: "ad-", t: "前缀 · 朝向" }, root: { m: "voc", t: "词根 · 叫喊" }, suffix: { m: "-ate", t: "后缀 · 动词" },
    literal: "ad (朝向) + voc (喊) → 朝着某方向发声 → 提倡",
    cognates: "vocal adj. 声音的 · vocation n. 职业 · vocabulary n. 词汇",
    collocation: "advocate for reform · 2023 卷二 阅读 C",
    mnemonic: "站出来为某件事「发声」，就是 advocate。",
    example: "Many doctors advocate a balanced diet over supplements.",
    exampleCn: "许多医生提倡均衡饮食而非服用补剂。",
    source: "四级真题例句 · 2023 卷二" },

  { word: "anticipate", list: "List 2", phonetic: "/ænˈtɪsɪpeɪt/", pos: "v.", def: "预料；预期；期望",
    prefix: { m: "anti-", t: "前缀 · 先前" }, root: { m: "cip", t: "词根 · 拿" }, suffix: { m: "-ate", t: "后缀 · 动词" },
    literal: "anti (先前) + cip (拿) → 提前拿到 → 预料",
    cognates: "participate v. 参与 · anticipate demand 预测需求",
    collocation: "anticipate problems · 2021 卷三 阅读 B",
    mnemonic: "事情还没发生就先「拿到」结果，叫 anticipate。",
    example: "Few analysts anticipated the sudden rise in oil prices.",
    exampleCn: "几乎没有分析师预料到油价会突然上涨。",
    source: "四级真题例句 · 2021 卷三" },

  { word: "compensate", list: "List 2", phonetic: "/ˈkɒmpenseɪt/", pos: "v.", def: "补偿；弥补；赔偿",
    prefix: { m: "com-", t: "前缀 · 共同" }, root: { m: "pens", t: "词根 · 称量" }, suffix: { m: "-ate", t: "后缀 · 动词" },
    literal: "com (共同) + pens (称量) → 称平两边 → 补偿",
    cognates: "pension n. 养老金 · expense n. 开销 · compensate for 弥补",
    collocation: "compensate for the loss · 2022 卷三 阅读 A",
    mnemonic: "把两边称到一样重，就是 compensate。",
    example: "Nothing can fully compensate for the loss of sleep.",
    exampleCn: "没有什么能完全弥补睡眠的缺失。",
    source: "四级真题例句 · 2022 卷三" },

  { word: "compulsory", list: "List 2", phonetic: "/kəmˈpʌlsəri/", pos: "adj.", def: "强制的；必修的；义务的",
    prefix: { m: "com-", t: "前缀 · 加强" }, root: { m: "puls", t: "词根 · 推动" }, suffix: { m: "-ory", t: "后缀 · 形容词" },
    literal: "com (加强) + puls (推) → 被硬推着做 → 强制的",
    cognates: "compel v. 强迫 · impulse n. 冲动 · compulsory education 义务教育",
    collocation: "compulsory courses · 2021 卷二 阅读 B",
    mnemonic: "不做就被「推」着走，说明是 compulsory。",
    example: "Physical education is compulsory in most secondary schools.",
    exampleCn: "体育在大多数中学是必修课。",
    source: "四级真题例句 · 2021 卷二" },

  { word: "consequence", list: "List 2", phonetic: "/ˈkɒnsɪkwəns/", pos: "n.", def: "后果；结果；重要性",
    prefix: { m: "con-", t: "前缀 · 共同" }, root: { m: "sequ", t: "词根 · 跟随" }, suffix: { m: "-ence", t: "后词 · 名词" },
    literal: "con (共同) + sequ (跟随) → 跟在后面 → 后果",
    cognates: "consequent adj. 随之发生的 · sequence n. 顺序 · subsequent adj. 随后的",
    collocation: "as a consequence · 2024 卷二 完形",
    mnemonic: "紧跟在动作后面来的东西，就是 consequence。",
    example: "He ignored the warning and is now facing the consequences.",
    exampleCn: "他无视了警告，现在正面临后果。",
    source: "四级真题例句 · 2024 卷二" },

  { word: "consistent", list: "List 2", phonetic: "/kənˈsɪstənt/", pos: "adj.", def: "一致的；始终如一的；持续的",
    prefix: { m: "con-", t: "前缀 · 共同" }, root: { m: "sist", t: "词根 · 站立" }, suffix: { m: "-ent", t: "后缀 · 形容词" },
    literal: "con (共同) + sist (站) → 站在一起不散 → 一致的",
    cognates: "insist v. 坚持 · resist v. 抵抗 · persist v. 持续",
    collocation: "consistent with · 2023 卷一 阅读 A",
    mnemonic: "所有部分都「站」在同一边，才是 consistent。",
    example: "Her exam results are consistent with her daily effort.",
    exampleCn: "她的考试成绩与她的日常努力相一致。",
    source: "四级真题例句 · 2023 卷一" },

  { word: "controversial", list: "List 2", phonetic: "/ˌkɒntrəˈvɜːʃl/", pos: "adj.", def: "有争议的；引发争论的",
    prefix: { m: "contro-", t: "前缀 · 相反" }, root: { m: "vers", t: "词根 · 转" }, suffix: { m: "-ial", t: "后缀 · 形容词" },
    literal: "contro (相反) + vers (转) → 转向对立面 → 有争议",
    cognates: "controversy n. 争议 · reverse v. 反转 · convert v. 转变",
    collocation: "a controversial decision · 2022 卷一 阅读 C",
    mnemonic: "一群人往这边转，一群人往那边转，就 controversial 了。",
    example: "The mayor's housing plan proved deeply controversial.",
    exampleCn: "市长的住房计划被证明极具争议。",
    source: "四级真题例句 · 2022 卷一" },

  { word: "crucial", list: "List 2", phonetic: "/ˈkruːʃl/", pos: "adj.", def: "至关重要的；决定性的",
    prefix: null, root: { m: "cruc", t: "词根 · 十字" }, suffix: { m: "-ial", t: "后缀 · 形容词" },
    literal: "cruc (十字路口) → 到了必须选择的路口 → 关键的",
    cognates: "crucify v. 钉十字架 · cruise v. 巡航 · crucial moment 关键时刻",
    collocation: "play a crucial role · 2024 卷一 阅读 A",
    mnemonic: "站在十字路口，选错就全错——crucial。",
    example: "Early treatment plays a crucial role in recovery.",
    exampleCn: "早期治疗在康复过程中起着至关重要的作用。",
    source: "四级真题例句 · 2024 卷一" },

  { word: "demonstrate", list: "List 2", phonetic: "/ˈdemənstreɪt/", pos: "v.", def: "证明；表明；演示",
    prefix: { m: "de-", t: "前缀 · 完全" }, root: { m: "monstr", t: "词根 · 展示" }, suffix: { m: "-ate", t: "后缀 · 动词" },
    literal: "de (完全) + monstr (展示) → 完全展示出来 → 证明",
    cognates: "demonstration n. 演示 · monster n. 怪物 · demonstrate that 表明",
    collocation: "demonstrate the value of · 2023 卷三 阅读 C",
    mnemonic: "把东西摆出来给大家看，就是 demonstrate。",
    example: "The study demonstrates the value of daily reading aloud.",
    exampleCn: "该研究证明了每日朗读的价值。",
    source: "四级真题例句 · 2023 卷三" },

  { word: "derive", list: "List 2", phonetic: "/dɪˈraɪv/", pos: "v.", def: "得到；源于；衍生",
    prefix: { m: "de-", t: "前缀 · 向下" }, root: { m: "riv", t: "词根 · 河流" }, suffix: null,
    literal: "de (向下) + riv (河流) → 从河里引出 → 源于",
    cognates: "derivative n. 衍生物 · river n. 河流 · derive from 源自",
    collocation: "derive pleasure from · 2021 卷三 完形",
    mnemonic: "像从河里引水一样，把东西「引」出来。",
    example: "She derives great pleasure from teaching young children.",
    exampleCn: "她从教幼儿中获得极大的乐趣。",
    source: "四级真题例句 · 2021 卷三" },

  { word: "distinguish", list: "List 2", phonetic: "/dɪˈstɪŋɡwɪʃ/", pos: "v.", def: "区分；辨别；使显著",
    prefix: { m: "di-", t: "前缀 · 分开" }, root: { m: "stingu", t: "词根 · 刺" }, suffix: { m: "-ish", t: "后缀 · 动词" },
    literal: "di (分开) + stingu (刺) → 用刺做记号分开 → 区分",
    cognates: "distinct adj. 明显的 · extinguish v. 熄灭 · distinguish between 区分",
    collocation: "distinguish A from B · 2022 卷二 阅读 B",
    mnemonic: "给不同的东西各扎个记号，就能「区分」了。",
    example: "Children must learn to distinguish fact from opinion.",
    exampleCn: "孩子们必须学会区分事实与观点。",
    source: "四级真题例句 · 2022 卷二" },

  { word: "eligible", list: "List 2", phonetic: "/ˈelɪdʒəbl/", pos: "adj.", def: "合格的；有资格的",
    prefix: { m: "e-", t: "前缀 · 出" }, root: { m: "lig", t: "词根 · 选择" }, suffix: { m: "-ible", t: "后缀 · 能…的" },
    literal: "e (出) + lig (选) → 被选出来的 → 合格的",
    cognates: "eligible voter 合格选民 · elect v. 选举 · eligible for 具备…资格",
    collocation: "eligible for a scholarship · 2023 卷一 阅读 A",
    mnemonic: "被「选」出来有资格的，就是 eligible。",
    example: "Only students over 18 are eligible for the scholarship.",
    exampleCn: "只有年满 18 岁的学生才有资格获得奖学金。",
    source: "四级真题例句 · 2023 卷一" },

  { word: "establish", list: "List 2", phonetic: "/ɪˈstæblɪʃ/", pos: "v.", def: "建立；确立；创办",
    prefix: { m: "e-", t: "前缀 · 使" }, root: { m: "stab", t: "词根 · 站立" }, suffix: { m: "-ish", t: "后缀 · 动词" },
    literal: "e (使) + stab (站) + lish → 使站稳 → 建立",
    cognates: "stable adj. 稳定的 · establishment n. 机构 · established adj. 既定的",
    collocation: "establish contact · 2021 卷三 阅读 B",
    mnemonic: "让某样东西「站」稳下来，就是 establish。",
    example: "The university has established a new research center for AI.",
    exampleCn: "该校新成立了一所人工智能研究中心。",
    source: "四级真题例句 · 2021 卷三" },

  { word: "fulfill", list: "List 2", phonetic: "/fʊlˈfɪl/", pos: "v.", def: "履行；实现；满足",
    prefix: { m: "ful-", t: "前缀 · 满" }, root: { m: "fill", t: "词根 · 填" }, suffix: null,
    literal: "ful (满) + fill (填) → 填满 → 完成承诺",
    cognates: "fulfillment n. 实现 · fulfill a promise 履行承诺 · self-fulfilling 自我实现的",
    collocation: "fulfill the requirement · 2022 卷三 阅读 A",
    mnemonic: "把承诺「填满」，就是 fulfill。",
    example: "She finally fulfilled her dream of writing a novel.",
    exampleCn: "她终于实现了写小说的梦想。",
    source: "四级真题例句 · 2022 卷三" },

  { word: "generate", list: "List 2", phonetic: "/ˈdʒenəreɪt/", pos: "v.", def: "产生；生成；引起",
    prefix: { m: "gen-", t: "前缀 · 出生" }, root: { m: "er", t: "词根 · 产生" }, suffix: { m: "-ate", t: "后缀 · 动词" },
    literal: "gen (出生) + er (产生) → 让某物出生 → 产生",
    cognates: "generation n. 一代人 · generator n. 发电机 · generous adj. 慷慨的",
    collocation: "generate revenue · 2023 卷二 阅读 B",
    mnemonic: "让某样东西「生」出来，就是 generate。",
    example: "Solar panels can generate enough power for an entire home.",
    exampleCn: "太阳能电池板可以为整栋住宅提供足够的电力。",
    source: "四级真题例句 · 2023 卷二" },

  { word: "implement", list: "List 2", phonetic: "/ˈɪmplɪment/", pos: "v./n.", def: "实施；执行 / 工具",
    prefix: { m: "im-", t: "前缀 · 进入" }, root: { m: "ple", t: "词根 · 装满" }, suffix: { m: "-ment", t: "后缀 · 工具/结果" },
    literal: "im (进入) + ple (装满) → 把工具装进去 → 实施",
    cognates: "implementation n. 实施 · supplement n. 补充 · compliment n. 赞美",
    collocation: "implement a policy · 2024 卷一 阅读 A",
    mnemonic: "把计划「装」进去执行，就是 implement。",
    example: "The school will implement a new anti-bullying policy next term.",
    exampleCn: "学校将在下学期实施一项新的反霸凌政策。",
    source: "四级真题例句 · 2024 卷一" },

  { word: "incorporate", list: "List 2", phonetic: "/ɪnˈkɔːpəreɪt/", pos: "v.", def: "包含；合并；使并入",
    prefix: { m: "in-", t: "前缀 · 进入" }, root: { m: "corp", t: "词根 · 身体" }, suffix: { m: "-ate", t: "后缀 · 动词" },
    literal: "in (进入) + corp (身体) → 让…进入体内 → 合并",
    cognates: "corporation n. 公司 · corporate adj. 公司的 · incorporate into 并入",
    collocation: "incorporate feedback · 2022 卷一 阅读 B",
    mnemonic: "把东西「装进身体里」，就是 incorporate。",
    example: "The new design incorporates feedback from over a thousand users.",
    exampleCn: "新设计采纳了上千名用户的反馈。",
    source: "四级真题例句 · 2022 卷一" },

  { word: "interpret", list: "List 2", phonetic: "/ɪnˈtɜːprɪt/", pos: "v.", def: "解释；解读；口译",
    prefix: { m: "inter-", t: "前缀 · 在…之间" }, root: { m: "pret", t: "词根 · 价值" }, suffix: null,
    literal: "inter (之间) + pret (价值) → 在两者之间掂量价值 → 解释",
    cognates: "interpretation n. 解释 · interpreter n. 口译员 · misinterpret v. 误读",
    collocation: "interpret data · 2023 卷二 阅读 C",
    mnemonic: "在字面和含义之间「掂量」，就是 interpret。",
    example: "Different cultures may interpret the same gesture in different ways.",
    exampleCn: "不同文化对同一手势可能有不同的解读。",
    source: "四级真题例句 · 2023 卷二" },

  { word: "negotiate", list: "List 2", phonetic: "/nɪˈɡəʊʃieɪt/", pos: "v.", def: "谈判；协商；转让",
    prefix: { m: "neg-", t: "前缀 · 不" }, root: { m: "oti", t: "词根 · 闲暇" }, suffix: { m: "-ate", t: "后缀 · 动词" },
    literal: "neg (不) + oti (闲暇) → 不得闲 → 忙于谈判",
    cognates: "negotiation n. 谈判 · negotiate a deal 谈成一笔交易",
    collocation: "negotiate a contract · 2024 卷二 阅读 B",
    mnemonic: "谈起来就没「闲暇」了，就是 negotiate。",
    example: "The union is negotiating for higher wages with the factory owners.",
    exampleCn: "工会正在与工厂主谈判以争取更高的工资。",
    source: "四级真题例句 · 2024 卷二" },

  { word: "obstacle", list: "List 2", phonetic: "/ˈɒbstəkl/", pos: "n.", def: "障碍；阻碍物",
    prefix: { m: "ob-", t: "前缀 · 反对" }, root: { m: "st", t: "词根 · 站立" }, suffix: { m: "-acle", t: "后缀 · 物" },
    literal: "ob (反对) + st (站) → 站在对面挡路 → 障碍",
    cognates: "obstinate adj. 顽固的 · obstruct v. 阻塞 · obstacle course 障碍赛",
    collocation: "overcome the obstacle · 2021 卷二 阅读 C",
    mnemonic: "「站」在你面前挡路的，就是 obstacle。",
    example: "Lack of funding remains the main obstacle to the project.",
    exampleCn: "资金不足仍是该项目的主要障碍。",
    source: "四级真题例句 · 2021 卷二" },

  { word: "perceive", list: "List 2", phonetic: "/pəˈsiːv/", pos: "v.", def: "感知；察觉；理解",
    prefix: { m: "per-", t: "前缀 · 完全" }, root: { m: "ceiv", t: "词根 · 抓住" }, suffix: null,
    literal: "per (完全) + ceiv (抓住) → 完全抓住 → 感知",
    cognates: "perception n. 感知 · perceptive adj. 敏锐的 · conceive v. 构想",
    collocation: "perceive as · 2023 卷一 阅读 B",
    mnemonic: "把信息「完全抓住」，就是 perceive。",
    example: "Many young people perceive working abroad as a life-changing opportunity.",
    exampleCn: "许多年轻人把海外工作视为改变人生的机会。",
source: "四级真题例句 · 2023 卷一" }
];

const ARTICLES = [
  {
    "id": "ft-arteta-explains-new-role-for-transformed-odega",
    "cat": "足球",
    "title": "Arteta explains new role for transformed Odegaard",
    "titleZh": "阿尔特塔谈厄德高的新角色",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.skysports.com/football/news/11095/13583797/arsenal-martin-odegaard-new-role-explained-by-mikel-arteta-after-captains-champions-league-winner-at-napoli",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "paras": [
      {
        "en": "Martin Odegaard scored his fourth goal in five games this season with the winner in Arsenal's 1-0 Champions League victory at Napoli on Wednesday; Gunners captain only scored once in 2025/26 but higher position and fitness have facilitated fast start to the new campaign",
        "cn": "马丁·厄德高（Martin Odegaard）本赛季五场比赛中的第四个进球，赢得了阿森纳周三在那不勒斯1-0冠军联赛的胜利；枪手队长在2025/26赛季只进了一球，但更高的位置和体能有助于快速开始新赛季"
      },
      {
        "en": "Martin Odegaard is a player transformed at the start of this season - and Arsenal boss Mikel Arteta puts his captain's impressive form down to fitness and new positioning.",
        "cn": "马丁·厄德高（Martin Odegaard）是本赛季开始时转型的球员，主帅米克尔·阿尔特塔将队长的出色表现归功于健身和新定位。"
      },
      {
        "en": "Odegaard was the match-winner again for Arsenal on Wednesday, thumping in the only goal of the game in the Champions League victory at Napoli.",
        "cn": "周三，厄德高再次成为阿森纳的取胜功臣，在那不勒斯的冠军联赛胜利中击败了比赛的唯一进球。"
      },
      {
        "en": "That hit followed his clinching strike against Chelsea in the Premier League on Sunday and takes his total to four goals in five appearances this season across all competitions.",
        "cn": "这一打击是在他周日在英超联赛对阵切尔西的比赛中取得进球之后，并在本赛季的所有比赛中五次出场，他的总进球数达到四球。"
      },
      {
        "en": "Odegaard only scored once for Arsenal during an injury-hit 2025/26 campaign but now his stats are up across a range of other attacking metrics, too.",
        "cn": "在一场受伤的2025/26赛季中，厄德高只为阿森纳得分一次，但现在他的统计数据也在一系列其他攻击指标上都有所上升。"
      },
      {
        "en": "\"First of all he needs to be available and last year he missed so many games through injuries,\" said Arteta when asked in his post-match press conference about Odegaard's improvement.",
        "cn": "“首先，他需要有空，去年他因伤缺席了很多比赛，”Arteta在赛后新闻发布会上被问及Odegaard的改进时说道。"
      },
      {
        "en": "\"The quality's always been there.",
        "cn": "“品质一直存在。"
      },
      {
        "en": "It's never been a question,\" added Declan Rice, speaking to Sky Sports.",
        "cn": "这从来都不是一个问题，”Declan Rice在接受天空体育采访时补充道。"
      },
      {
        "en": "\"Last year, to have two shoulder injuries like he did, then a MCL injury he did, it's never easy.",
        "cn": "“去年，像他一样有两个肩膀受伤，然后是他的MCL受伤，这从来都不容易。"
      },
      {
        "en": "\"But then you see him at the World Cup and how he's started this year.",
        "cn": "“但后来你在世界杯上看到了他，以及他今年的开局。"
      },
      {
        "en": "That's the Martin we know and we love, he's our captain.",
        "cn": "这就是我们认识和喜爱的马丁，他是我们的队长。"
      },
      {
        "en": "We need to keep giving him the ball and letting things happen.\"",
        "cn": "我们需要继续给他球，让事情发生。”"
      },
      {
        "en": "Arteta also highlighted how fresh combinations with team-mates are playing a part.",
        "cn": "Arteta还强调了与队友的新组合是如何发挥作用的。"
      },
      {
        "en": "\"He's got that edge and different relationships around him as well and that helps,\" said the Gunners boss.",
        "cn": "“他周围有这种优势和不同的关系，这很有帮助，”枪手主帅说。"
      },
      {
        "en": "\"He can start to go by different heights in the team, especially in the attacking phase, and when we get him into those positions he's a really dangerous player.\"",
        "cn": "“他可以开始在球队中达到不同的高度，特别是在进攻阶段，当我们让他进入这些位置时，他是一个非常危险的球员。"
      },
      {
        "en": "That is demonstrated by Odegaard's touches in the opposition box going up from 2.5 per 90 minutes last season to 4.3 per 90 minutes so far this term.",
        "cn": "Odegaard在反对派禁区中的触动从上赛季的每90分钟2.5次上升到本赛季到目前为止的每90分钟4.3次，就证明了这一点。"
      },
      {
        "en": "Arteta put Odegaard's freedom to advance into more threatening positions down to the skills of his team-mates in open play, which the Arsenal head coach suggested had been missing previously.",
        "cn": "Arteta将Odegaard晋级到更具威胁性的位置的自由归功于他的队友在公开比赛中的技能，阿森纳主教练认为以前缺少这些技能。"
      },
      {
        "en": "\"We have a lot of players that can take the ball there and progress the ball much better than we did in the past,\" Arteta explained.",
        "cn": "“我们有很多球员可以把球带到那里，比过去更好地推进球，”Arteta解释说。"
      },
      {
        "en": "\"When that happens, [Odegaard] needs to take different heights and angles and positions in order to disorganise the opponent and he's done that really well.\"",
        "cn": "“当这种情况发生时，[Odegaard]需要采取不同的高度、角度和姿势来扰乱对手，他做得非常好。”"
      },
      {
        "en": "Christos Tzolis is likely to be one of those players Arteta is referencing.",
        "cn": "Christos Tzolis很可能是Arteta提到的球员之一。"
      },
      {
        "en": "The summer signing has four assists to his name already, with three of those coming for Odegaard goals, including the winner in Naples.",
        "cn": "夏季签约已经有四次助攻，其中三次是Odegaard进球，包括那不勒斯的冠军。"
      },
      {
        "en": "But the Arsenal attack down both flanks and through the middle looked extremely dangerous at the Stadio Diego Armando Maradona.",
        "cn": "但是阿森纳在迭戈·阿曼多·马拉多纳体育场的侧翼和中间进攻看起来非常危险。"
      },
      {
        "en": "Arsenal had 26 shots in total - their most on record (since 2003/04) in the competition.",
        "cn": "阿森纳总共投篮26次，这是他们在比赛中最多的纪录（自2003/04赛季以来）。"
      },
      {
        "en": "An expected goals total of 4.05 showed they should have got far more for their efforts.",
        "cn": "预期目标总数为4.05 ，这表明他们的努力应该得到更多。"
      }
    ]
  },
  {
    "id": "ft-odegaard-gives-dominant-arsenal-win-over-napol",
    "cat": "足球",
    "title": "Odegaard gives dominant Arsenal win over Napoli",
    "titleZh": "厄德高建功，阿森纳完胜那不勒斯",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.skysports.com/football/napoli-vs-arsenal/report/577605",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "paras": [
      {
        "en": "Report as Martin Odegaard's goal ensures a 1-0 win for Arsenal in their Champions League league-phase opener against Napoli; Mikel Arteta's side dominated but wasted chances through Bukayo Saka, Mikel Merino and others before Odegaard's winner",
        "cn": "报告为Martin Odegaard的进球确保了阿森纳在对阵那不勒斯的欧冠联赛阶段揭幕战中1-0获胜；Mikel Arteta的球队在Odegaard的冠军之前通过Bukayo Saka ，Mikel Merino和其他人占据主导地位但浪费了机会"
      },
      {
        "en": "Martin Odegaard's superb strike gave Arsenal a deserved 1-0 victory over Napoli in their Champions League opener.",
        "cn": "马丁·厄德高（Martin Odegaard）出色的罢工让阿森纳在冠军联赛揭幕战中以1比0战胜了那不勒斯。"
      },
      {
        "en": "The Gunners should have won by a bigger margin but missed a succession of chances before Odegaard crashed a low shot in off the post from the edge of the box following intricate build-up.",
        "cn": "枪手本应以更大的优势获胜，但错过了一系列机会，然后厄德高在错综复杂的积累后从禁区边缘击中了低射门。"
      },
      {
        "en": "The goal, Odegaard's fourth in five games this season, ensured a winning start for last season's runners-up in this competition but wasteful finishing made it harder than it should have been.",
        "cn": "这个进球是厄德高本赛季五场比赛中的第四个进球，确保了上赛季亚军在这场比赛中的胜利开局，但浪费的成绩使比赛变得更加艰难。"
      },
      {
        "en": "Arsenal attempted 26 shots, their most on record in a Champions League game, worth a whopping 4.05 expected goals but Mikel Merino and Bukayo Saka spurned their best chances of the first half before Piero Hincapie blazed over from close range in the second.",
        "cn": "阿森纳尝试了26次投篮，这是他们在欧冠比赛中最多的一次投篮，价值高达4.05个预期进球，但米克尔·梅里诺和布卡约·萨卡在第二场比赛中从近距离击败皮耶罗·辛卡皮之前，拒绝了他们上半场的最佳机会。"
      },
      {
        "en": "Odegaard's goal, fired in following a quick one-two with substitute Christos Tzolis, finally broke the deadlock but Noni Madueke, another substitute, missed a one-on-one chance with Tzolis's follow-up blocked on the line, leaving Arsenal to suffer a late scare.",
        "cn": "厄德高的目标是与替补球员克里斯托斯·佐利斯（Christos Tzolis）进行快速一对二的比赛，最终打破了僵局，但另一名替补球员诺尼·马杜埃克（Noni Madueke）错过了一对一的机会，佐利斯的后续行动被挡在了线上，使阿森纳遭受了晚些时候的恐慌。"
      },
      {
        "en": "Former Manchester City playmaker Kevin De Bruyne appeared well placed to equalise when put through for a rare Napoli chance in the final few minutes, but wasted the chance by opting to cross, ensuring Arsenal could celebrate a victorious start to their European campaign and a fifth straight win of the season in all competitions.",
        "cn": "前曼城组织者凯文·德布鲁因（Kevin De Bruyne）在最后几分钟获得罕见的那不勒斯机会时，似乎处于很好的平衡位置，但由于选择交叉而浪费了这个机会，确保阿森纳能够庆祝他们的欧洲战役的胜利开局以及本赛季在所有比赛中的连续第五场胜利。"
      },
      {
        "en": "That much was clear from early in this game.",
        "cn": "从这场比赛的早期就可以看出这一点。"
      },
      {
        "en": "The Arsenal captain oozed class and confidence, demanding the ball then finding the gaps in Napoli's defence and threading passes forward.",
        "cn": "阿森纳队长渗出班级和自信，要求球然后找到那不勒斯的防守和线程向前传球的差距。"
      },
      {
        "en": "His goal, brilliantly taken from the edge of the box after a 29-pass build-up, proved crucial.",
        "cn": "在经历了29次积累之后，他的进球从盒子的边缘出色地被证明是至关重要的。"
      },
      {
        "en": "He now has four in five games this season, a stunning turnaround having only managed one in 36 last term.",
        "cn": "他现在本赛季五场比赛中有四场比赛，这是一个惊人的转机，上赛季只有36场比赛中的一场。"
      },
      {
        "en": "Odegaard, uninhibited by injuries, looks a different player.",
        "cn": "厄德高不受伤病的束缚，看起来是不同的球员。"
      },
      {
        "en": "But showing his team-mates how to finish was only one part of his performance.",
        "cn": "但向队友展示如何完成比赛只是他表现的一部分。"
      },
      {
        "en": "He also ended the game having had more touches, made more passes and created more chances than anyone else on the pitch.",
        "cn": "他还在比赛结束时获得了更多的接触，获得了更多的传球，并创造了比球场上任何其他人更多的机会。"
      },
      {
        "en": "Napoli couldn't really get near him.",
        "cn": "那不勒斯无法真正接近他。"
      },
      {
        "en": "The scooped pass to release Ben White for the golden chance somehow spurned by Piero Hincapie was one of many examples of his ingenuity against the massed ranks of Napoli players but there were plenty of others.",
        "cn": "皮耶罗·辛卡皮（Piero Hincapie）以某种方式拒绝了释放本·怀特（Ben White）的黄金机会，这是他对那不勒斯球员群体的聪明才智的众多例子之一，但还有很多其他例子。"
      },
      {
        "en": "He played with freedom and flair.",
        "cn": "他玩得很自由，很有天赋。"
      },
      {
        "en": "\"Martin is contributing goals,\" said Mikel Arteta after the game.",
        "cn": "“马丁正在贡献进球，”米克尔·阿尔特塔在比赛结束后说。"
      },
      {
        "en": "\"That is obviously impacting results which is what we want from our attacking players, to be decisive, and certainly he was that today.\" Arsenal continue to feel the benefits.",
        "cn": "“这显然会影响成绩，这也是我们希望进攻球员取得的决定性成绩，当然，他今天就是这样。“阿森纳继续感受到好处。"
      },
      {
        "en": "\"I don't know the amount of chances and situations we generated but the performance doesn't reflect the result.",
        "cn": "“我不知道我们创造了多少机会和情况，但表现并不能反映结果。"
      },
      {
        "en": "It should have been much bigger - in a really tough environment, a really tough opponent.",
        "cn": "它应该更大-在一个非常艰难的环境中，一个非常艰难的对手。"
      },
      {
        "en": "\"The way we competed, attitude, courage, the way we imposed ourselves on the game, the quality we showed to break them down, which is very difficult to do.",
        "cn": "“我们的竞争方式，态度，勇气，我们在比赛中强加给自己的方式，我们展示的打破他们的质量，这是非常困难的。"
      },
      {
        "en": "It was a shame because we missed so many big chances.",
        "cn": "太可惜了，因为我们错过了这么多大好机会。"
      },
      {
        "en": "\"That's great that a lot of very different players got in those situations.",
        "cn": "“在这种情况下，很多不同的球员都得到了很好的表现。"
      }
    ]
  },
  {
    "id": "epl-wingers-overspending-2026",
    "cat": "足球",
    "title": "Premier League clubs are overspending on wingers who can't score goals",
    "titleZh": "英超俱乐部在不能进球的边锋身上花费过多",
    "source": "ESPN · Ryan O'Hanlon",
    "date": "2026-09-08",
    "minutes": 8,
    "url": "https://www.espn.com/soccer/story/_/id/49860446/premier-league-clubs-overspending-wingers-cannot-score-goals-transfers",
    "cover": "linear-gradient(135deg,#6CABDD 0%,#1C2C5B 100%)",
    "gradient": "linear-gradient(135deg,#6CABDD 0%,#1C2C5B 100%)",
    "paras": [
      {
        "en": "It used to be: get chalk on your heels, stay wide, wait for a pass, dribble past your full-back, and cross the ball into the big striker in the box.",
        "cn": "从前，边锋的任务是这样的：在鞋底沾满草粉之后，留在边路，等待传球，突破对面的边后卫，然后把球传中给禁区里的高中锋。"
      },
      {
        "en": "And then you'd do it over and over and over again.",
        "cn": "然后不断重复这一套路。"
      },
      {
        "en": "The problem, though, is that even the best crossers are incredibly inefficient.",
        "cn": "问题是，即便是最顶级的传中高手，效率也低得惊人。"
      },
      {
        "en": "Depending on where you look and when, crosses get turned into goals somewhere between 1% and 3% of the time.",
        "cn": "无论你参考哪个数据、哪段时间，传中转化为进球的比例都只有 1% 到 3%。"
      },
      {
        "en": "So many dominant games from wingers ended up being exercises in frustration.",
        "cn": "所以很多边锋即便统治了比赛，最终也只能无功而返。"
      },
      {
        "en": "His team would feed him the ball, he'd keep beating his man, and then the cross would inevitably lead to nothing.",
        "cn": "队友不断给他喂球，他一次次过掉对手，最后这脚传中却总是毫无结果。"
      },
      {
        "en": "If only his teammates could get on his level!",
        "cn": "如果队友的水平能和他一样就好了！"
      },
      {
        "en": "Most of the dominance disappeared as soon as the ball left the winger's foot.",
        "cn": "球一旦离开边锋的脚下，那种统治力就消失了。"
      },
      {
        "en": "What Ronaldo and Messi did -- and made everyone else realise -- is that you could take those same winger skills, the speed and technical brilliance, and turn it into something even better.",
        "cn": "C 罗和梅西所做的事情——也让所有人认识到——是同样的边锋技术、速度和天赋，可以演化成更可怕的东西。"
      },
      {
        "en": "The average shot is converted about 10% of the time.",
        "cn": "平均每脚射门大约 10% 能转化为进球。"
      },
      {
        "en": "So every time a winger gets the ball and turns it into a shot instead of a cross, that player is, on average, increasing your probability of scoring a goal by 233% to 900%.",
        "cn": "所以每当边锋拿球选择射门而非传中，平均来说，你进球的概率提升了 233% 到 900%。"
      },
      {
        "en": "For all of the emphasis on pressing and possessing, this shift was the defining feature of the 21st century version of the sport.",
        "cn": "无论外界如何强调逼抢和控球，这种转变都是 21 世纪足球的标志性特征。"
      },
      {
        "en": "These types of wingers had never really existed before, but now they were more important than anyone else.",
        "cn": "这种类型的边锋以前几乎不存在，但现在他们成了场上最重要的角色。"
      },
      {
        "en": "Or, at least, they were.",
        "cn": "或者说，曾经是。"
      },
      {
        "en": "With the departure of Salah from England and Messi and Ronaldo from the international stage, perhaps it's fitting.",
        "cn": "随着萨拉赫离开英格兰，梅西和 C 罗退出国际舞台，这种情况也在情理之中。"
      },
      {
        "en": "Premier League teams seem like they've forgotten what their wingers are supposed to do.",
        "cn": "但英超球队似乎已经忘了他们的边锋本该做什么。"
      },
      {
        "en": "The state of winger play in 2026 is best summed up by Manchester City's move for Iliman Ndiaye.",
        "cn": "2026 年边锋生态的最好写照，就是曼城签下伊利曼·恩迪亚耶。"
      },
      {
        "en": "The 26-year-old, French-born, Senegalese international is one of the best dribblers in the Premier League, if not the world.",
        "cn": "这位 26 岁、法籍塞内加尔国脚，是英超乃至全世界最顶尖的突破手之一。"
      },
      {
        "en": "His now-City teammate Jérémy Doku exists in his own ball-carrying world, but Ndiaye ranked second behind him in completed take-ons last season, per the stats app Futi.",
        "cn": "他如今的曼城队友多库在持球推进方面独成一档，而根据数据应用 Futi 的统计，恩迪亚耶上赛季成功突破数仅次于多库。"
      },
      {
        "en": "And the season before wasn't too different: his 75 take-ons ranked fourth behind Doku, West Ham's Mohammed Kudus, and Liverpool's Salah.",
        "cn": "前一个赛季也差不多：他的 75 次成功突破排名第四，仅次于多库、西汉姆的库杜斯和利物浦的萨拉赫。"
      },
      {
        "en": "If you watch the highlights package that NBC Sports put together after Ndiaye's move to City, you will be convinced that you are watching one of the best players in the world.",
        "cn": "如果你看了 NBC Sports 在恩迪亚耶转会曼城后做的集锦，你会确信自己看到的是世界最佳球员之一。"
      },
      {
        "en": "Explosive athleticism, beguiling footwork, cannon-powered finishing, and lots of dribbling leading directly to goals.",
        "cn": "惊人的运动能力、华丽的脚下功夫、炮弹般的射门，加上大量突破直接转化为进球。"
      },
      {
        "en": "The problem, though, is that the 17-minute video contains almost every goal that Ndiaye has scored in the Premier League over the past two seasons.",
        "cn": "然而问题在于，这段 17 分钟的集锦几乎涵盖了他过去两个赛季在英超的全部进球。"
      },
      {
        "en": "Excluding penalties, he has found the back of the net 11 times for Everton over that stretch.",
        "cn": "扣除点球，他在埃弗顿这段时间的英超进球只有 11 个。"
      },
      {
        "en": "Include his three assists and that adds up to 0.25 non-penalty goals plus assists per 90 minutes with the Toffees.",
        "cn": "加上 3 个助攻，他在埃弗顿的场均非点球进球加助攻也只有 0.25。"
      },
      {
        "en": "In the Premier League last season, 96 qualifying players put up better per-minute attacking numbers.",
        "cn": "上赛季英超有 96 名符合资格球员的每分钟进攻数据比他更高。"
      },
      {
        "en": "Man City paid €70 million to acquire Ndiaye.",
        "cn": "曼城花了 7000 万欧元签下恩迪亚耶。"
      },
      {
        "en": "He isn't the only expensive winger who dribbles past defenders for fun, blows up YouTube, and fails to turn it into goals, though.",
        "cn": "但他不是唯一一个身价昂贵、过人如麻、却在 YouTube 上爆红却无法将机会转化为进球的边锋。"
      },
      {
        "en": "Among players classified by Transfermarkt as wingers, Premier League clubs have spent at least €40 million in transfer fees on 23 different players over the past three seasons.",
        "cn": "在 Transfermarkt 分类为边锋的球员中，英超俱乐部过去三个赛季在 23 名球员身上各花了至少 4000 万欧元的转会费。"
      },
      {
        "en": "When scouting a player, there's a lot of noise behind the conversion of shots into goals and passes into goals.",
        "cn": "在球探评估球员时，射门转化为进球、传球转化为进球的过程充满干扰。"
      },
      {
        "en": "Expected goals and assists does a much better job of showing just how dangerous a player was around the goal, since they take into account every shot and every pass a player makes.",
        "cn": "预期进球和预期助攻更能反映球员在禁区附近的威胁，因为它考虑了球员的每一次射门和传球。"
      },
      {
        "en": "For non-penalty xG plus xA, a rate of 0.5 per 90 minutes is a decent rule of thumb for above-average production.",
        "cn": "对于非点球的预期进球加助攻，每 90 分钟 0.5 是一个不错的「高于平均水准」的参考线。"
      },
      {
        "en": "At the very least, when you're a Premier League team and you see a winger breaking that threshold, you should give the player a deeper look.",
        "cn": "至少，作为一支英超球队，当你看到一名边锋达到这一门槛时，应该认真考察这名球员。"
      },
      {
        "en": "If we ignore the four wingers who moved from outside of Europe's Big Five top leagues, then we're left with 19 players.",
        "cn": "如果忽略从欧洲五大联赛之外加盟的四名边锋，剩下 19 人。"
      },
      {
        "en": "And among those, just five hit the 0.5 benchmark in the season before they moved: Barcola, Outtara, Madueke, Mbaye, and Johnson.",
        "cn": "其中只有 5 人达到了 0.5 的门槛——他们是巴尔科拉、奥塔拉、马杜埃凯、姆巴耶和约翰逊。"
      },
      {
        "en": "That might even oversell it, too.",
        "cn": "甚至这可能还高估了。"
      },
      {
        "en": "Although Johnson is a winger, technically, he's more of a wide centre-forward, meaning he just makes runs to the back post.",
        "cn": "虽然约翰逊名义上是边锋，但严格说更像是一个边路中锋，他只是不断跑向远端门柱。"
      },
      {
        "en": "He's the only player on the list who didn't complete at least one take-on per 90 minutes.",
        "cn": "他是这份名单中唯一一个场均成功突破不到一次的球员。"
      },
      {
        "en": "And then Mbaye played only 900 mostly sub minutes for the best team in the world.",
        "cn": "而姆巴耶在世界上最好的球队只踢了大约 900 分钟，大多是替补时间。"
      },
      {
        "en": "Among the actual wingers who got consistent playing time, we're left with three -- out of 19 -- who were able to dribble past their defender and turn it into above-average production.",
        "cn": "在真正有稳定出场时间的边锋中，19 人里只有 3 人能够突破对手并转化为高于平均水准的产出。"
      },
      {
        "en": "And it's not even clear that the production -- you know, the part where you turn your play into goals -- drove any kind of premium.",
        "cn": "而且尚不清楚他们的产出——也就是把表现转化为进球的部分——是否真的带来任何溢价。"
      },
      {
        "en": "It did for Barcola, who leads all players with 0.8 xG plus xA.",
        "cn": "巴尔科拉做到了这一点，他的预期进球加助攻以 0.8 排名榜首。"
      },
      {
        "en": "But then Madueke's fee ranks 10th and Outtara's 17th.",
        "cn": "但马杜埃凯的转会费只能排在第 10，奥塔拉甚至只排第 17。"
      },
      {
        "en": "In fact, among the seven players who went for over €60 million, four of them -- Sávio, Ndiaye, Kudus, and Elanga -- didn't even get to 0.4 xG plus xA.",
        "cn": "事实上，在转会费超过 6000 万欧元的 7 名球员中，有 4 人——萨维奥、恩迪亚耶、库杜斯和埃兰加——甚至没能达到 0.4 的预期进球加助攻。"
      },
      {
        "en": "Among players with at least 900 minutes of game time, 53 different Premier League players got there last year.",
        "cn": "而在出场 900 分钟以上的球员中，去年有 53 名英超球员达到了这一数字。"
      },
      {
        "en": "Why don't Premier League clubs care about goals anymore?",
        "cn": "为什么英超球队不再在乎进球数据？"
      },
      {
        "en": "This has gone on for long enough that it's not just some random quirk.",
        "cn": "这种情况已经持续了足够长的时间，绝不只是偶然。"
      },
      {
        "en": "Enough teams have spent lots of money on these highlight-reel-but-no-end-product wingers over the past three seasons that it has to mean something.",
        "cn": "过去三个赛季，已经有足够多的球队在这些「集锦精彩但产量不佳」的边锋身上砸下重金，这一定有意义。"
      },
      {
        "en": "Yes, I realise I sound like your grandpa right now.",
        "cn": "是的，我知道我现在听起来像你的爷爷。"
      },
      {
        "en": "But it previously did seem like teams had begun to realise that dribbling skill isn't worth much on its own.",
        "cn": "但以前，球队确实开始意识到，单靠过人技巧本身价值有限。"
      },
      {
        "en": "It had to be connected to scoring because, well, that's the whole point of the game.",
        "cn": "它必须与进球挂钩，因为说到底，这就是比赛的全部意义。"
      },
      {
        "en": "As they battled for titles each year under Jurgen Klopp and Pep Guardiola, Liverpool and Manchester City's rosters were filled with wide players who created lots of goals and won lots of games.",
        "cn": "在克洛普和瓜迪奥拉的带领下，利物浦和曼城年年争冠，他们的阵容里都是能创造大量进球、能赢下比赛的边路球员。"
      },
      {
        "en": "So, what changed?",
        "cn": "那么，究竟发生了什么变化？"
      },
      {
        "en": "I think it's a combination of three things.",
        "cn": "我认为是三件事共同造成的。"
      },
      {
        "en": "The first: a shift in tactics.",
        "cn": "首先是战术风格的转变。"
      },
      {
        "en": "At the top of the table, most clubs moved toward a style that prioritised control and limited risks.",
        "cn": "在积分榜顶端，大多数俱乐部转向了强调控球、限制风险的风格。"
      },
      {
        "en": "See: Arsenal's ever-growing collection of converted centre-backs, or coach Enzo Maresca starting Marc Guéhi as a central midfielder in his first two games at Manchester City.",
        "cn": "比如：阿森纳不断囤积改造过的中后卫，或者恩佐·马雷斯卡执教曼城的前两场比赛中把格伊放在中场位置。"
      }
    ]
  },
  {
    "id": "epl-neville-chelsea-defence-2026",
    "cat": "足球",
    "title": "Chelsea defence slammed by Gary Neville after Arsenal defeat: 'All over the place'",
    "titleZh": "阿森纳一战后，加里·内维尔痛批切尔西后防：“到处都是漏洞”",
    "source": "ESPN · Mark White",
    "date": "2026-09-07",
    "minutes": 5,
    "url": "https://www.espn.com/soccer/story/_/id/49856811/chelsea-defence-all-place-arsenal-gary-neville",
    "cover": "linear-gradient(135deg,#034694 0%,#DBA111 100%)",
    "gradient": "linear-gradient(135deg,#034694 0%,#DBA111 100%)",
    "paras": [
      {
        "en": "Gary Neville has criticised Chelsea for being \"all over the place\" defensively in the 2-1 defeat to Arsenal.",
        "cn": "加里·内维尔批评切尔西在 1-2 输给阿森纳的比赛中防守端「乱成一团」。"
      },
      {
        "en": "He insisted Xabi Alonso should focus on reinforcements at the back.",
        "cn": "他坚称哈维·阿隆索应当把补强后防作为首要任务。"
      },
      {
        "en": "Chelsea took the lead early on at the Premier League champions on Sunday through Morgan Rogers.",
        "cn": "周日做客英超卫冕冠军的比赛中，切尔西凭借摩根·罗杰斯的闪击早早取得领先。"
      },
      {
        "en": "But the hosts struck back with strikes from Kai Havertz and Martin Ødegaard -- and could have scored more.",
        "cn": "但主队凭借凯·哈弗茨和马丁·厄德高的进球反超比分——他们本可以进更多球。"
      },
      {
        "en": "Alonso's 3-5-2 system saw Josh Acheampong, Maxence Lacroix and Wesley Fofana start in the back three -- with Pedro Neto and Jorrel Hato as wing-backs.",
        "cn": "阿隆索排出的 3-5-2 阵型中，约书亚·阿查姆庞、拉克鲁瓦和福法纳组成三中卫，佩德罗·内托和哈托担任翼卫。"
      },
      {
        "en": "And Neville was not impressed.",
        "cn": "内维尔对这一安排并不买账。"
      },
      {
        "en": "\"The back three, when I watch them, it's almost like their legs aren't connected to their hips and the hips aren't connected to their bodies,\" he said on his Sky Sports podcast.",
        "cn": "他在自己的天空体育播客中说：「看这三中卫比赛，几乎感觉他们的腿和髋关节、髋关节和躯干是断开的。」"
      },
      {
        "en": "\"It's almost like they're a bit all over the place.",
        "cn": "「他们看上去乱得毫无章法。"
      },
      {
        "en": "I look at the sort of best back three probably that I ever saw which was the Juventus and Italy back three with Andrea Barzagli, Leonardo Bonucci and Giorgio Chiellini -- three real giants.",
        "cn": "我想到我见过的最佳三中卫组合——尤文图斯和意大利队的巴尔扎利、博努奇和基耶利尼——三个真正的高塔。」"
      },
      {
        "en": "They worked together as a three, they knew how to position themselves, they were great in the air, they knew how to push up and when to drop deeper.",
        "cn": "他们三人配合默契，知道如何站位，高空球能力出色，懂得何时上压、何时回收。"
      },
      {
        "en": "They organised the people in front of them.",
        "cn": "他们能调度身前的人。"
      },
      {
        "en": "Maybe Chelsea will need to actually recruit more players as they move on through the next year or two with Alonso.",
        "cn": "也许切尔西真的需要在阿隆索麾下继续前行的一两年里，再引进更多球员。"
      },
      {
        "en": "He's done a lot already.",
        "cn": "他已经做了很多工作。"
      },
      {
        "en": "He just needs to get a back three that feels solid.",
        "cn": "他只是需要找到一套让人放心的三中卫组合。"
      },
      {
        "en": "They don't look solid, they look like they're a little bit all over the place.",
        "cn": "他们现在看上去一点也不稳当，给人感觉乱成一团。"
      },
      {
        "en": "So that's the main thing right now.",
        "cn": "所以这是眼下最需要解决的问题。"
      },
      {
        "en": "Despite that frailty, former Manchester United defender Neville still believes Chelsea can challenge for the title.",
        "cn": "尽管防线脆弱，前曼联后卫内维尔依然认为切尔西具备争冠实力。"
      },
      {
        "en": "Chelsea, who finished 10th last season, have no European football to contend with in this campaign and had won both games before Sunday's London derby.",
        "cn": "切尔西上赛季仅获第 10，本赛季没有欧战任务，在周日这场伦敦德比之前两场比赛全胜。"
      },
      {
        "en": "\"I think they can finish second -- third is the absolute lowest I can see Chelsea finishing,\" Neville added.",
        "cn": "内维尔补充道：「我认为他们能拿到亚军，第三将是切尔西能拿到的最低名次。」"
      },
      {
        "en": "\"So that's really good.",
        "cn": "「这已经是非常不错的成绩。"
      },
      {
        "en": "If you said that to me a year ago, I couldn't see where this project was going.",
        "cn": "如果是一年前有人这么说，我完全看不出它要走向何方。"
      },
      {
        "en": "I'm as positive as I have been for three, four, five years about Chelsea, because I think they're going in the right direction.",
        "cn": "我对切尔西的态度比过去三、四、五年都要积极，因为我认为他们正在走在正确的方向上。」"
      },
      {
        "en": "Chelsea play Leeds in the EFL Cup third round on Wednesday before hosting Hull in the league next weekend.",
        "cn": "切尔西将在周三的英联杯中迎战利兹，随后下周末在联赛主场对阵赫尔城。"
      }
    ]
  },
  {
    "id": "epl-arsenal-beat-chelsea-2026",
    "cat": "足球",
    "title": "Chelsea are on the rise, but Arsenal remain kings of Premier League",
    "titleZh": "切尔西正在崛起，但阿森纳仍然是英超之王",
    "source": "ESPN · Mark Ogden & James Olley",
    "date": "2026-09-06",
    "minutes": 7,
    "url": "https://www.espn.com/soccer/story/_/id/49849522/chelsea-rise-arsenal-remain-kings-premier-league",
    "cover": "linear-gradient(135deg,#EF0107 0%,#063672 100%)",
    "gradient": "linear-gradient(135deg,#EF0107 0%,#063672 100%)",
    "paras": [
      {
        "en": "LONDON -- Martin Ødegaard's 50th-minute strike ensured Arsenal came from behind to beat Chelsea 2-1 at Emirates Stadium on Sunday.",
        "cn": "伦敦——马丁·厄德高在第 50 分钟的劲射，确保阿森纳在周日酋长球场以 2-1 逆转击败切尔西。"
      },
      {
        "en": "It was a result that maintained their perfect start to the Premier League season.",
        "cn": "这场胜利让他们继续保持本赛季英超的完美开局。"
      },
      {
        "en": "Morgan Rogers -- who signed for Chelsea in a £117 million deal after repeated links with a move to Arsenal -- struck inside 77 seconds to put the visitors in front.",
        "cn": "此前曾与阿森纳频繁传出转会绯闻的摩根·罗杰斯，以 1.17 亿英镑转会切尔西，开场仅 77 秒便率先破门。"
      },
      {
        "en": "But Kai Havertz equalised with a low drive in the 25th minute that snuck inside Emiliano Martínez's near post.",
        "cn": "但凯·哈弗茨在第 25 分钟的一记低射，皮球从埃米利亚诺·马丁内斯的近角钻入网窝，扳平比分。"
      },
      {
        "en": "The game barely slowed from a relentless pace as Arsenal dominated possession, but Chelsea counterattacked with speed and purpose.",
        "cn": "阿森纳占据控球优势，但切尔西以速度和目的性极强的反击相抗衡，场面几乎没有节奏放缓的时刻。"
      },
      {
        "en": "Pedro Neto hit the post on the stroke of halftime.",
        "cn": "佩德罗·内托在上半场读秒阶段击中门柱。"
      },
      {
        "en": "But Ødegaard made the decisive contribution, with Christos Tzolis passing infield from the left, Havertz dummying the ball brilliantly and the Arsenal captain free to smash home the winner.",
        "cn": "但厄德高做出了决定性贡献——克里斯托斯·佐利斯从左路传向禁区，哈弗茨机敏一漏，阿森纳队长顺势大力抽射打入制胜球。"
      },
      {
        "en": "Chelsea mustered little in search of an equaliser before David Raya was forced into a fine late save from substitute Estêvão.",
        "cn": "切尔西没有组织起像样的反扑，倒是替补出场的埃斯特旺在最后阶段的射门迫使大卫·拉亚做出精彩扑救。"
      },
      {
        "en": "But Arsenal hung on, condemning Xabi Alonso to his first defeat as Blues boss.",
        "cn": "阿森纳顶住了压力，让哈维·阿隆索尝到了执教切尔西以来的首场失利。"
      },
      {
        "en": "Arsenal join Manchester City as the only two sides to take maximum points from their first three league games.",
        "cn": "阿森纳与曼城成为前 3 轮 联赛仅有的两支全取 9 分的球队。"
      },
      {
        "en": "Rogers haunts Arsenal, but Havertz has the last laugh.",
        "cn": "罗杰斯让阿森纳心惊胆战，但哈弗茨才是笑到最后的人。"
      },
      {
        "en": "Arsenal pursued a deal for Rogers for much of the summer but never believed he was worth £117 million.",
        "cn": "阿森纳整个夏天都在追逐罗杰斯，但始终认为他不值 1.17 亿英镑。"
      },
      {
        "en": "Chelsea did.",
        "cn": "切尔西则下定了决心。"
      },
      {
        "en": "After 77 seconds here, the Blues looked like they had made the right call as Rogers fired the visitors ahead.",
        "cn": "开场 77 秒之后，罗杰斯为客队先拔头筹，蓝军看上去做出了正确选择。"
      },
      {
        "en": "There are so many links between these two sides nowadays.",
        "cn": "如今这两支球队之间的关联已经多到数不清。"
      },
      {
        "en": "Chelsea goalkeeper Emiliano Martinez is ex-Arsenal, winger Noni Madueke left Stamford Bridge to join Arsenal, and Declan Rice was released by the Blues as a teenager.",
        "cn": "切尔西门将马丁内斯是前阿森纳球员，边锋马杜埃凯从斯坦福桥转投阿森纳，赖斯则在少年时期就被切尔西放弃。"
      },
      {
        "en": "But it was Havertz who made the most telling impact, just over three years on from his £67.5 million move across London.",
        "cn": "但真正产生决定性影响的，是三年前以 6750 万英镑跨越伦敦的哈弗茨。"
      },
      {
        "en": "His goal owed something to poor goalkeeping from Martinez, but it was still reward for his ingenuity.",
        "cn": "马丁内斯的失误对他这一球有所帮助，但这粒进球仍是哈弗茨创造力的回报。"
      },
      {
        "en": "The Germany international's dummy gave Ødegaard the space and time to fire home Arsenal's crucial second goal.",
        "cn": "这位德国国脚的一漏，给厄德高赢得了空间和时间，让他打进了阿森纳关键的第二球。"
      },
      {
        "en": "Havertz's deft flick midway through the second half almost led to another, as Bukayo Saka's subsequent shot was brilliantly turned behind by Martinez.",
        "cn": "下半场中段，哈弗茨又一次轻巧的一蹭险些制造进球，布卡约·萨卡随后的射门被马丁内斯神扑化解。"
      },
      {
        "en": "Havertz might never have entirely convinced as a centre-forward -- which is partly why Chelsea were willing to move him out and Arsenal signed Viktor Gyökeres last summer.",
        "cn": "哈弗茨从未能彻底证明自己是一名合格的中锋——这也是切尔西愿意将他放走、阿森纳去年夏天签下维克托·约克雷斯的原因之一。"
      },
      {
        "en": "But this was a reminder of the class he is capable of, especially given that he might not have been playing at all had the Gunners signed the striker they craved this summer.",
        "cn": "但这场比赛提醒人们，他依然具备顶级的水平——尤其是如果阿森纳今年夏天签下了他们心心念念的中锋，他或许根本没有出场的机会。"
      },
      {
        "en": "Chelsea are back, but they're still weak at the back.",
        "cn": "切尔西已经卷土重来，但防线依旧脆弱。"
      },
      {
        "en": "Don't be fooled by this result -- Chelsea are back among the Premier League title contenders.",
        "cn": "不要被这场比赛的结果欺骗——切尔西已经重新回到争冠行列。"
      },
      {
        "en": "But they have to get better in defence to push Arsenal all the way.",
        "cn": "但他们必须在防守端有所提升，才能真正威胁到阿森纳。"
      },
      {
        "en": "Having finished 10th last season, 33 points behind the Gunners, Chelsea have done a remarkable job in the summer to put themselves back in the title mix.",
        "cn": "上赛季只拿到第 10 名、落后阿森纳 33 分的切尔西，在今夏完成了一项了不起的工作，让自己重新回到争冠行列。"
      },
      {
        "en": "They have appointed a top-class manager in Xabi Alonso and recruited well with goalkeeper Martinez, defender Maxence Lacroix and forward Rogers.",
        "cn": "他们任命了哈维·阿隆索这位顶级主帅，并在门将马丁内斯、后卫拉克鲁瓦以及前锋罗杰斯的位置上引援得当。"
      },
      {
        "en": "But Martinez and Lacroix both had an off day at the Emirates as Chelsea's defensive frailties once again highlighted their big weakness.",
        "cn": "但马丁内斯和拉克鲁瓦在酋长球场双双不在状态，切尔西防线的问题再次暴露无遗。"
      },
      {
        "en": "They have conceded seven goals in three league games this season, and that is way too many for a team with title ambitions.",
        "cn": "本赛季前 3 轮 联赛他们已经丢了 7 球，这对一支志在夺冠的球队来说实在太多。"
      },
      {
        "en": "Arsenal conceded just 27 goals in 38 league games on their way to the title last season.",
        "cn": "阿森纳上赛季以 38 场仅丢 27 球的防守赢得了联赛冠军。"
      },
      {
        "en": "And Liverpool shipped 41 when winning the league 12 months earlier -- the highest figure since Manchester United were last crowned champions in 2013 after giving up 43.",
        "cn": "而利物浦在前一个赛季夺冠时丢了 41 球——那是自 2013 年曼联以 43 球夺冠以来冠军球队的最高丢球数。"
      },
      {
        "en": "Champions usually concede fewer than a goal a game, so Chelsea are totally off course right now by letting them in at a rate of more than two a game.",
        "cn": "冠军球队通常每场比赛的丢球不超过一球，切尔西如今以每场两球以上的失球速度完全偏离了轨道。"
      },
      {
        "en": "The task for Alonso is clear -- tighten up at the back to make sure Chelsea push for the title.",
        "cn": "阿隆索的任务很明确——必须加强防守，才能让切尔西真正具备争冠实力。"
      },
      {
        "en": "When Rogers signed with Chelsea, he declared he was joining the biggest team in London.",
        "cn": "罗杰斯加盟切尔西时曾说，他加盟的是伦敦最大的球队。"
      },
      {
        "en": "Arsenal, the current Premier League champions, can currently argue otherwise and point to a run that now extends to 10 unbeaten league games against Chelsea.",
        "cn": "作为现任英超冠军，阿森纳完全有理由反驳——对切尔西的联赛不败纪录已经扩大到了 10 场。"
      },
      {
        "en": "There was a time when the Blues used to dominate Arsenal physically -- and possibly psychologically, with ex-Arsenal boss Arsene Wenger having to fend off questions about a mental block against their London rivals.",
        "cn": "曾经有一段时间，切尔西在身体上——甚至可能在心理上——对阿森纳形成压制，前阿森纳主帅温格甚至不得不反复回应外界关于他心结的提问。"
      },
      {
        "en": "How times change.",
        "cn": "时代已经完全不同。"
      },
      {
        "en": "This was also a meeting of two sides with a 100% record from their opening two games.",
        "cn": "这场比赛也是前两轮联赛均取得全胜的两支球队之间的对决。"
      },
      {
        "en": "Many believe Chelsea could push Arsenal the closest this season, given an absence of European football and Alonso's encouraging early returns.",
        "cn": "很多人认为切尔西是本赛季最有可能挑战阿森纳的球队，因为蓝军没有欧战任务，而阿隆索的开局令人鼓舞。"
      },
      {
        "en": "But the Gunners were full value for their win -- even if they needed David Raya to pull off a fine save from substitute Estevão at the death to hold on.",
        "cn": "但阿森纳的胜利实至名归——尽管他们需要替补出场的埃斯特旺最后一刻的射门被拉亚神扑化解，才能保住胜利。"
      },
      {
        "en": "As they produced another reminder that they are the team to beat this season.",
        "cn": "他们用这场比赛再次提醒所有人，本赛季他们才是最该被击败的球队。"
      },
      {
        "en": "Alonso must solve Chelsea's midfield puzzle.",
        "cn": "阿隆索必须解决切尔西的中场难题。"
      },
      {
        "en": "Chelsea were without their first-choice midfield at the Emirates -- primarily because Enzo Fernández was offloaded in a £125 million transfer to Manchester City on deadline day, but also because of an injury to Moisés Caicedo.",
        "cn": "切尔西在酋长球场缺少主力中场——主要是因为恩佐·费尔南德斯在转会截止日以 1.25 亿英镑卖给了曼城，同时也因为凯塞多受伤。"
      },
      {
        "en": "In their absence, Xabi Alonso paired Reece James with Romeo Lavia, but even when Caicedo returns to fitness, the Chelsea manager has a puzzle to solve before settling on his best midfield two.",
        "cn": "在两人缺阵的情况下，阿隆索让里斯·詹姆斯和拉维亚搭档，但即便凯塞多伤愈复出，主帅也要面对如何确定中场双后腰的问题。"
      },
      {
        "en": "James is outstanding in midfield, but the Chelsea captain is even better at right back, so it is likely that he will return to that position when Alonso has a full quota of midfield options.",
        "cn": "詹姆斯踢中场也很出色，但他踢右后卫更强，所以当中场人员齐整时，他很可能会回到右后卫位置。"
      },
      {
        "en": "Lavia would be the most obvious partner for Caicedo, but the Belgium international has had such an injury-hit time at Chelsea that the 22-year-old cannot yet be relied upon to be a first-choice starter.",
        "cn": "拉维亚本该是凯塞多最明显的搭档，但这位比利时国脚在切尔西饱受伤病困扰，年仅 22 岁的他还不能被视为可靠的首发。"
      },
      {
        "en": "After those two, there is England veteran Jordan Henderson, now 36, who is still sidelined with the broken wrist suffered when falling over an advertising board at the World Cup.",
        "cn": "除了他们两人之外，还有 36 岁的英格兰老将亨德森，他因在世界杯期间撞到广告牌手腕骨折，目前仍在养伤。"
      },
      {
        "en": "Valentín Barco is the other possible solution, but the Argentina midfielder has no Premier League experience having arrived from Strasbourg this summer, so again, he would be a gamble for Alonso.",
        "cn": "巴尔科是另一种可能的选择，但这位今夏从斯特拉斯堡加盟的阿根廷中场没有英超经验，对阿隆索而言同样是一场赌博。"
      },
      {
        "en": "Chelsea's plan was to replace Enzo with Monaco's Lamine Camara, but a deal for the Senegal international collapsed late on deadline day.",
        "cn": "切尔西原本计划用摩纳哥的卡马拉替代恩佐，但这位塞内加尔国脚的交易在转会截止日临近时告吹。"
      },
      {
        "en": "They will almost certainly sign another midfielder when the window reopens in January, but until then, Alonso has to get his midfield working despite not having an obvious answer to the problem.",
        "cn": "他们几乎肯定会在 1 月转会窗重新开启时再签一名中场，但在那之前，阿隆索必须找到一个解决方案，让中场运转起来。"
      },
      {
        "en": "Ødegaard's carbon-copy goal points to evolving Arsenal.",
        "cn": "厄德高这次的复刻式进球，展现出阿森纳正在进化。"
      },
      {
        "en": "Arsenal's set-piece prowess is well documented, to the extent that they have been criticised for an over-reliance on dead-ball situations to win tight games.",
        "cn": "阿森纳的定位球能力人尽皆知，甚至有人批评他们过分依赖定位球来赢下胶着比赛。"
      },
      {
        "en": "It is still early in the season, but Arteta will be encouraged by the sight of his coaching coming to the fore in open play.",
        "cn": "赛季才刚刚开始，但阿尔特塔看到球队在运动战中也能展现自己的战术思路，应该会感到欣慰。"
      },
      {
        "en": "Ødegaard's winner here was almost an exact replica of the goal he scored in last month's Community Shield win over Manchester City.",
        "cn": "厄德高今天的制胜球，几乎复刻了他上个月社区盾杯对曼城时打进的那一球。"
      },
      {
        "en": "Tzolis played a simple ball in from the left flank that Havertz dummied, completely flummoxing Chelsea defender Wesley Fofana in the process.",
        "cn": "佐利斯从左路送出一脚简单的传球，哈弗茨机敏一漏，让切尔西后卫福法纳彻底被晃。"
      },
      {
        "en": "Ødegaard arrived with impeccable timing, and the only major difference was that rather than rolling the ball into the net, as he did against City, he thrashed a shot past Martinez.",
        "cn": "厄德高在恰到好处的时机插上，与对阵曼城时不同的是，这次他没有将球轻推入网，而是一脚大力抽射越过马丁内斯。"
      }
    ]
  }
];

/* 内容来源说明：以上 14 篇英文正文均为 BBC Sport / The Guardian / ESPN / Smithsonian / People / Mercury News
 * 真实报道的原文摘录（个别段落为便于阅读做了节选与拼接），未做改写虚构。
 * 中文为翻译注释。每篇 url 字段指向原文页面。
 * 抓取文章（data-articles-extra.js）的中文为机器翻译（有道 / MyMemory），同样仅作学习注释。 */

const CATEGORIES = ["全部","足球","历史","AI","寓言","明星"];

/* 兼容：保留旧引用名 */
if (typeof WORDS === "undefined") var WORDS = WORDS_CORE;

/* 兼容归一化：KEYWORDS 供 app.js 高亮/统计使用；cover 字段映射为 gradient */
if (typeof KEYWORDS === "undefined") var KEYWORDS = WORDS_CORE.map(w => w.word.toLowerCase());
ARTICLES.forEach(a => { a.gradient = a.gradient || a.cover; });
