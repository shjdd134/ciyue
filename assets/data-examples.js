/* 词阅 WordLens —— 真实例句（自动生成，请勿手改；运行 node tools/build-examples.mjs 重新生成）
 *
 * 来源：文章库里 1628 段真实报道原文 + 逐句译文。逐句翻译的副产品是第 N 个英文句子
 * 对得上第 N 个中文句子（实测 95.7% 段落完全对齐，对不齐的整段放弃），于是
 * 「英文原句 + 它在同一篇文章里的译文」就是成对的真实例句——没有一句是机器造的。
 *
 * 共 1300 条，只用来填补没有例句的词；人工撰写的例句永远优先，不会被覆盖。
 */
const WORD_EXAMPLES = {
  "pull": {
    "en": "But the Gunners were full value for their win -- even if they needed David Raya to pull off a fine save from substitute Estevão at the death to hold on.",
    "cn": "但阿森纳的胜利实至名归——尽管他们需要替补出场的埃斯特旺最后一刻的射门被拉亚神扑化解，才能保住胜利。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "punch": {
    "en": "The corner comes in and Steward punches it clear.",
    "cn": "拐角进来了，管家把拳头打得很清楚。",
    "src": "Sky Sports · 2026-09-09"
  },
  "purchase": {
    "en": "In 1907, he and his wife, Aline, purchased and developed a hilltop estate in Cagnes-sur-Mer dotted with olive, orange and fig trees.",
    "cn": "1907年，他和妻子艾琳（Aline）在滨海卡涅（Cagnes-sur-Mer）购买并开发了一处山顶地产，其间点缀着橄榄树、橘子树和无花果树。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "purely": {
    "en": "Fabricating an object purely for play is exceptionally rare across the animal kingdom.",
    "cn": "在动物王国里，纯粹为了玩耍而制造物品是非常罕见的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "quality": {
    "en": "Fernandes believes the quality of the Spurs squad can raise his own level of performance, too.",
    "cn": "费尔南德斯相信热刺的阵容也能提高他自己的表现水平。",
    "src": "Sky Sports · 2026-09-10"
  },
  "qualify": {
    "en": "In the Premier League last season, 96 qualifying players put up better per-minute attacking numbers.",
    "cn": "上赛季英超有 96 名符合资格球员的每分钟进攻数据比他更高。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "puzzle": {
    "en": "The perpetrators are found out and locked away, and you've had a very enjoyable experience helping to solve the puzzles.”",
    "cn": "罪犯被发现并被关起来，你在帮助解决谜题的过程中获得了非常愉快的体验。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "publish": {
    "en": "To coincide with the exhibition, the British Museum is also publishing a range of books for readers of all ages.",
    "cn": "为了配合这次展览，大英博物馆还为各个年龄段的读者出版了一系列书籍。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "put": {
    "en": "In the Premier League last season, 96 qualifying players put up better per-minute attacking numbers.",
    "cn": "上赛季英超有 96 名符合资格球员的每分钟进攻数据比他更高。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "pursuit": {
    "en": "In Silicon Valley, devotees have gathered at peptide parties to drink, dance and inject themselves with these chemicals—all in pursuit of sharper minds and more sculpted bodies.",
    "cn": "在硅谷，奉献者聚集在多肽派对上喝酒、跳舞和注射这些化学物质--所有这些都是为了追求更敏锐的头脑和更精致的身体。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "pursue": {
    "en": "Arsenal pursued a deal for Rogers for much of the summer but never believed he was worth £117 million.",
    "cn": "阿森纳整个夏天都在追逐罗杰斯，但始终认为他不值 1.17 亿英镑。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "purpose": {
    "en": "To view this content, choose 'Accept and continue' to allow Google reCAPTCHA and its required purposes.",
    "cn": "要查看此内容，请选择“接受并继续”以允许谷歌reCAPTCHA及其所需目的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "purity": {
    "en": "There’s little to no research proving these molecules are safe or effective and no assurance from the FDA about their identity, purity or strength.",
    "cn": "几乎没有研究证明这些分子是安全或有效的，FDA也不能保证它们的特性、纯度或强度。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "push": {
    "en": "Martin Zubimendi may push to leave Arsenal in January after losing his starting sport under Mikel Arteta.",
    "cn": "马丁·祖比门迪可能会在一月份离开阿森纳，因为他在阿尔特塔手下失去了首发位置。",
    "src": "Sky Sports · 2026-09-10"
  },
  "quarter": {
    "en": "Rangers turn their attention to a huge double-header against Celtic, with the sides first meeting in the League Cup quarter-finals before renewing hostilities in the Scottish Premiership at Parkhead.",
    "cn": "流浪者将注意力转向对凯尔特人的巨大双头，双方在联赛杯四分之一决赛中首次会面，然后在Parkhead的苏格兰超级联赛中再次发生敌对行动。",
    "src": "Sky Sports · 2026-09-09"
  },
  "publication": {
    "en": "“There’s something to be said about the mystery novel being something you can escape into,” publisher David Brawn told All Things Considered in 2020, on the 100th anniversary of the publication of Christie’s first book.",
    "cn": "2020年，在佳士得第一本书出版100周年之际，出版商大卫·布朗对《万物思虑》（All Things Considered）说：“悬疑小说是一种你可以逃避的东西。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "project": {
    "en": "For Fernandes, it was his conversations with head coach Roberto De Zerbi which persuaded him the north London project was for him.",
    "cn": "对于费尔南德斯来说，是他和主教练罗伯托·德泽比的谈话说服了他北伦敦的计划是适合他的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "promise": {
    "en": "Name your problem, and you can probably find a peptide—with a cryptic moniker like BPC-157 or GHK-Cu—that promises to help.",
    "cn": "说出您的问题，您可能会发现一种多肽-具有BPC-157或GHK-Cu等神秘绰号-有望提供帮助。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "promising": {
    "en": "Today, they’re sold via polished websites with a medical gloss, with each peptide promising to deliver a remarkable benefit, such as weight loss, younger-looking skin or muscle repair.",
    "cn": "如今，它们通过带有医学光泽的抛光网站出售，每种肽都有望带来显着的好处，例如减肥、年轻的皮肤或肌肉修复。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "promote": {
    "en": "And, this isn't a promoted side accidentally stumbling into three clean sheets.",
    "cn": "而且，这不是一支升班马不小心三次失球的球队。",
    "src": "Sky Sports · 2026-09-10"
  },
  "prompt": {
    "en": "In this way, it functioned as a visual prompt and a mnemonic device, inviting its audience to engage with the drama of 1066 in a uniquely immersive way.",
    "cn": "通过这种方式，它起到了视觉提示和记忆装置的作用，邀请观众以一种独特的沉浸式方式参与到1066年的戏剧中。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "proof": {
    "en": "The proof was produced by a group of agents, using an OpenAI next-generation model significantly more capable than GPT-6 Astra.",
    "cn": "证据是由一组代理使用比GPT-6 Astra更强大的OpenAI下一代模型制作的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "property": {
    "en": "At the time, all property in England legally belonged to the king, who granted lesser lords the right to lease land to tenants “in return for certain services and restrictions on their freedom,” Prescott says.",
    "cn": "当时，英格兰的所有财产在法律上都属于国王，国王授予较小的领主向租户出租土地的权利，“以换取某些服务和对其自由的限制”，普雷斯科特说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "propose": {
    "en": "Balogun has been in the headlines again over the past few weeks after his proposed move from Monaco to Everton collapsed late on Deadline Day.",
    "cn": "Balogun在截止日期当天晚些时候从摩纳哥搬到埃弗顿的提议崩溃后，过去几周再次成为头条新闻。",
    "src": "Sky Sports · 2026-09-09"
  },
  "provided": {
    "en": "This page contains HistoryExtra content provided by Google reCAPTCHA.",
    "cn": "此页面包含谷歌reCAPTCHA提供的额外内容。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "provide": {
    "en": "Our top tipster Lewis Jones, aka Jones Knows, provides his analysis and betting insight across the weekend Premier League action.",
    "cn": "我们的顶级线人刘易斯·琼斯，又名琼斯知道，提供他的分析和投注洞察整个周末英超联赛的行动。",
    "src": "Sky Sports · 2026-09-10"
  },
  "prove": {
    "en": "The Bayeux Tapestry exhibition is already proving to be one of the most popular in the museum’s history.",
    "cn": "贝叶挂毯展览已经被证明是博物馆历史上最受欢迎的展览之一。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "public": {
    "en": "Its Chicago stop, which opened to the public over Labor Day weekend, runs through January.",
    "cn": "芝加哥站在劳动节周末向公众开放，一直持续到1月。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "protest": {
    "en": "“That poor administration helped trigger the revolt,” which ultimately evolved from a protest against unfair taxes into a broader push for a more equitable society.",
    "cn": "“那个糟糕的政府帮助引发了叛乱”，最终从对不公平税收的抗议演变为对更公平社会的更广泛推动。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "protect": {
    "en": "During World War II, h ospital ships were protected under international humanitarian law.",
    "cn": "在第二次世界大战期间，战舰受到国际人道主义法的保护。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "protein": {
    "en": "Simply put, peptides are short chains of amino acids—the building blocks of proteins—that carry specific instructions to specific cells.",
    "cn": "简而言之，肽是氨基酸的短链（蛋白质的组成部分），可向特定细胞传递特定的指令。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "raise": {
    "en": "Fernandes believes the quality of the Spurs squad can raise his own level of performance, too.",
    "cn": "费尔南德斯相信热刺的阵容也能提高他自己的表现水平。",
    "src": "Sky Sports · 2026-09-10"
  },
  "range": {
    "en": "The insurgents’ demands ranged from the abolition of serfdom to the redistribution of the church’s riches.",
    "cn": "叛乱分子的要求从废除农奴制到重新分配教会的财富不等。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rank": {
    "en": "They listed the soldier’s rank, the village they came from, their caste, any injuries, and if they died.",
    "cn": "他们列出了士兵的军衔，他们来自的村庄，他们的种姓，是否受伤，是否死亡。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "rare": {
    "en": "Fabricating an object purely for play is exceptionally rare across the animal kingdom.",
    "cn": "在动物王国里，纯粹为了玩耍而制造物品是非常罕见的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "rarely": {
    "en": "This secretive and rarely seen creature, called the nabarlek, is endangered, put at risk by shifting fire regimes and introduced predators.",
    "cn": "这种神秘而罕见的生物，被称为纳巴莱克，是濒临灭绝的，由于火灾制度的改变和掠食者的引入而处于危险之中。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "rate": {
    "en": "For non-penalty xG plus xA, a rate of 0.5 per 90 minutes is a decent rule of thumb for above-average production.",
    "cn": "对于非点球的预期进球加助攻，每 90 分钟 0.5 是一个不错的「高于平均水准」的参考线。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "rather": {
    "en": "That makes it the first time we really see what his squad, rather than his preferred XI, has to offer.",
    "cn": "这使我们第一次真正看到他的阵容，而不是他的首选XI ，所提供的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "ratio": {
    "en": "In their last 16 league games where they've enjoyed less than 45 per cent of the ball and started the match bigger than 2/1, they've conceded just nine goals, losing just two of those games, with those matches averaging a lowly 1.7 goals per game ratio.",
    "cn": "在过去的16场联赛中，他们的控球率低于45%，开局比分大于2比1，他们只丢了9个球，只输了2场，这些比赛的场均进球率只有1.7个。",
    "src": "Sky Sports · 2026-09-10"
  },
  "ray": {
    "en": "The vessel is well preserved, with ceramic tiles still lining its bathrooms, fans still hanging from its ceilings and teak tables still “intact, clean and perfectly aligned with each other” on the bridge deck, Cesare Balzi wrote for X-Ray Mag in 2018.",
    "cn": "切萨雷·巴尔齐（Cesare Balzi）在2018年的《X-Ray Mag》杂志上写道，这艘船保存完好，浴室里仍然铺着瓷砖，风扇仍然悬挂在天花板上，柚木桌子仍然“完好无损，干净整洁，彼此完美对齐”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "really": {
    "en": "These types of wingers had never really existed before, but now they were more important than anyone else.",
    "cn": "这种类型的边锋以前几乎不存在，但现在他们成了场上最重要的角色。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "reality": {
    "en": "Spanning a massive, 21,000-square-foot space, “ Serial Killer: The Exhibition ” brings together more than 2,000 items that confront myth with true crime’s gruesome reality.",
    "cn": "“连环杀手：展览”占地21,000平方英尺，汇集了2,000多件物品，将神话与真实犯罪的可怕现实相结合。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "real": {
    "en": "Its equations assume that fluids are smooth and continuous, while in the real world, of course, they are made of atoms and molecules.",
    "cn": "它的方程假设流体是光滑和连续的，而在现实世界中，它们当然是由原子和分子组成的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "ready": {
    "en": "I smile before jesting, and Pochettino just laughs and says he's ready.",
    "cn": "我在开玩笑之前微笑，波切蒂诺只是笑着说他已经准备好了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "reading": {
    "en": "The four stolen works were Portrait of Madame Stephen Pichon (1895), Coco Reading (1905), Madame Colonna Romano (1910) and Young Woman at the Well (1886).",
    "cn": "被盗的四幅作品分别是《斯蒂芬·皮雄夫人的肖像》（1895年）、《可可·雷丁》（1905年）、《科隆娜·罗马诺夫人》（1910年）和《井边的年轻女子》（1886年）。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "reader": {
    "en": "To coincide with the exhibition, the British Museum is also publishing a range of books for readers of all ages.",
    "cn": "为了配合这次展览，大英博物馆还为各个年龄段的读者出版了一系列书籍。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "read": {
    "en": "This is your chance to show how much Scouting means to you,” read a message accompanying the insert.",
    "cn": "这是你展示童军运动对你有多重要的机会。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "reach": {
    "en": "Curators are hosting talks and special events throughout the exhibition run, while a programme of activities for schools and families ensures the Tapestry’s story reaches the widest possible audience.",
    "cn": "策展人在整个展览期间举办讲座和特别活动，同时为学校和家庭举办活动，确保挂毯的故事尽可能多地吸引观众。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "queen": {
    "en": "Together, they uncover how these formative experiences helped shape the woman who would become a formidable queen.",
    "cn": "他们一起揭示了这些形成性的经历如何帮助塑造了这位将成为令人敬畏的女王的女人。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "question": {
    "en": "If this award helps spark more curiosity about this sort of question, then that’s a pretty wonderful outcome.”",
    "cn": "如果这个奖项有助于激发人们对这类问题的好奇心，那么这是一个非常好的结果。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "quick": {
    "en": "Authorities attribute the robbers’ bungle to the museum’s security system and the quick response of local police.",
    "cn": "当局将劫匪的失误归咎于博物馆的安全系统和当地警方的快速反应。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "quickly": {
    "en": "Their mother attempted to make a ball too but quickly abandoned the task.",
    "cn": "他们的母亲也想做一个球，但很快就放弃了这项任务。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "quit": {
    "en": "She may have quit, in part, because she had previously consumed an ounce of a margarita, which seemed to lower her dexterity, the authors write in the paper.",
    "cn": "作者在论文中写道，她戒烟的部分原因可能是她之前喝过一盎司的玛格丽塔酒，这似乎降低了她的灵活性。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "race": {
    "en": "The substitute raced onto Ryan Naderi's flick-on from Ivor Pandur's long ball before lifting a delightful lob over the goalkeeper to send Ibrox wild after a drab 90 minutes.",
    "cn": "替补队员从Ivor Pandur的长球中冲上Ryan Naderi的轻弹，然后在守门员身上举起一个令人愉快的球，在单调的90分钟后将Ibrox送到野外。",
    "src": "Sky Sports · 2026-09-09"
  },
  "raid": {
    "en": "The Tower of London has protected England’s capital since it was first built in the 1070s, withstanding medieval sieges and World War II bombing raids alike.",
    "cn": "伦敦塔自1070年代首次建成以来一直保护着英格兰的首都，经受住了中世纪的围攻和第二次世界大战的轰炸。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rage": {
    "en": "Brentford have been all the rage with the betting markets over the first three games with the belief that Keith Andrews has improved them over the summer, although a few fingers were burnt, my included, with their lacklustre showing in the 1-1 with Sunderland last weekend.",
    "cn": "在前三场比赛中，布伦特福德一直在博彩市场上大放异彩，他们相信基思·安德鲁斯在整个夏天都改善了他们的表现，尽管上周末他们在1-1桑德兰的比赛中表现平平，但也有一些人受到了伤害，包括我的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "radio": {
    "en": "“One thing that this exhibition, myself included, is totally against is anything glorifying or glamorizing” serial killers, Bill Kimberlin, a true-crime researcher and collector, tells WGN Radio 720 ’s Wendy Snyder.",
    "cn": "连环杀手比尔·金伯利林（Bill Kimberlin）是真正的犯罪研究者和收藏家，他告诉WGN Radio 720的温迪·斯奈德（Wendy Snyder）：“这个展览，包括我自己在内，完全反对任何美化或美化”的连环杀手。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "radar": {
    "en": "Liverpool have placed AS Roma midfielder Manu Koné on their radar as they consider potential January reinforcements.",
    "cn": "利物浦已经把罗马中场马努·科内放在了他们的雷达上，因为他们考虑了1月份的潜在增援。",
    "src": "Sky Sports · 2026-09-09"
  },
  "progress": {
    "en": "\"We have a lot of players that can take the ball there and progress the ball much better than we did in the past,\" Arteta explained.",
    "cn": "“我们有很多球员可以把球带到那里，比过去更好地推进球，”Arteta解释说。",
    "src": "Sky Sports · 2026-09-09"
  },
  "portrait": {
    "en": "The four stolen works were Portrait of Madame Stephen Pichon (1895), Coco Reading (1905), Madame Colonna Romano (1910) and Young Woman at the Well (1886).",
    "cn": "被盗的四幅作品分别是《斯蒂芬·皮雄夫人的肖像》（1895年）、《可可·雷丁》（1905年）、《科隆娜·罗马诺夫人》（1910年）和《井边的年轻女子》（1886年）。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "portuguese": {
    "en": "\"I believe that I can be a much better player than I was last season,\" said the 22-year-old Portuguese, who recorded three goals and four assists in the Premier League for the Hammers.",
    "cn": "“我相信我可以成为一个比上赛季更好的球员，”这位22岁的葡萄牙人说，他在英超联赛中为铁锤帮贡献了3个进球和4次助攻。",
    "src": "Sky Sports · 2026-09-10"
  },
  "position": {
    "en": "They are shown pillaging, feasting and fortifying their position.",
    "cn": "他们掠夺，盛宴和巩固他们的地位。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "positive": {
    "en": "These results came back with positive news for conservation: The elusive nabarlek had been found.",
    "cn": "这些结果为自然保护带来了积极的消息：难以捉摸的纳巴莱克被发现了。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "possess": {
    "en": "For all of the emphasis on pressing and possessing, this shift was the defining feature of the 21st century version of the sport.",
    "cn": "无论外界如何强调逼抢和控球，这种转变都是 21 世纪足球的标志性特征。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "possession": {
    "en": "The game barely slowed from a relentless pace as Arsenal dominated possession, but Chelsea counterattacked with speed and purpose.",
    "cn": "阿森纳占据控球优势，但切尔西以速度和目的性极强的反击相抗衡，场面几乎没有节奏放缓的时刻。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "possibility": {
    "en": "Everton have played down the possibility of a move for free agent Anthony Martial.",
    "cn": "埃弗顿淡化了引进自由球员马夏尔的可能性。",
    "src": "Sky Sports · 2026-09-10"
  },
  "possible": {
    "en": "While there is no direct association between the eggshells and skeletal remains, the authors note in the study, it’s possible they could belong to the same species.",
    "cn": "作者在研究中指出，虽然蛋壳和骨骼遗骸之间没有直接联系，但它们可能属于同一物种。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "possibly": {
    "en": "That mound contained the bones of a calf—possibly a graveside sacrifice.",
    "cn": "那个土堆里有小牛的骨头--可能是墓边的祭品。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "post": {
    "en": "But Kai Havertz equalised with a low drive in the 25th minute that snuck inside Emiliano Martínez's near post.",
    "cn": "但凯·哈弗茨在第 25 分钟的一记低射，皮球从埃米利亚诺·马丁内斯的近角钻入网窝，扳平比分。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "practical": {
    "en": "In the animal world, researchers often focus on tool use for a practical purpose, study co-author Nessie O’Neil, a biologist at Miami University in Ohio, writes on her blog.",
    "cn": "研究报告的合著者、俄亥俄州迈阿密大学的生物学家尼西·奥尼尔在她的博客上写道，在动物世界，研究人员经常把重点放在实用的工具使用上。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "powerful": {
    "en": "He is shipwrecked and captured by a local nobleman there, and then is transferred into the hands of the powerful Duke William of Normandy.",
    "cn": "他遭遇海难，被当地的一个贵族抓获，然后被转移到强大的诺曼底公爵威廉的手中。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "power": {
    "en": "Explosive athleticism, beguiling footwork, cannon-powered finishing, and lots of dribbling leading directly to goals.",
    "cn": "惊人的运动能力、华丽的脚下功夫、炮弹般的射门，加上大量突破直接转化为进球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "pound": {
    "en": "Pygmy raccoons, also called Cozumel raccoons, weigh between six and nine pounds, around the same as a newborn human baby.",
    "cn": "侏儒浣熊，也叫科苏梅尔浣熊，体重在6到9磅之间，和一个新生的人类婴儿差不多。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "potential": {
    "en": "Liverpool have placed AS Roma midfielder Manu Koné on their radar as they consider potential January reinforcements.",
    "cn": "利物浦已经把罗马中场马努·科内放在了他们的雷达上，因为他们考虑了1月份的潜在增援。",
    "src": "Sky Sports · 2026-09-09"
  },
  "plus": {
    "en": "For non-penalty xG plus xA, a rate of 0.5 per 90 minutes is a decent rule of thumb for above-average production.",
    "cn": "对于非点球的预期进球加助攻，每 90 分钟 0.5 是一个不错的「高于平均水准」的参考线。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "point": {
    "en": "Hull arrive at Stamford Bridge with seven points from three games and three consecutive clean sheets.",
    "cn": "赫尔三场比赛积7分，连续三场零封，来到斯坦福桥。",
    "src": "Sky Sports · 2026-09-10"
  },
  "poison": {
    "en": "After the country house, visitors will walk through a dispensary filled with various poisons that feature in Christie’s novels and learn about her work as a pharmacy dispenser during World War I.",
    "cn": "在乡村别墅之后，游客将穿过一个药房，里面摆满了克里斯蒂小说中出现的各种毒药，并了解她在第一次世界大战期间作为药房配药员的工作。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "police": {
    "en": "Authorities attribute the robbers’ bungle to the museum’s security system and the quick response of local police.",
    "cn": "当局将劫匪的失误归咎于博物馆的安全系统和当地警方的快速反应。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "policy": {
    "en": "As Dan Jones, author of Summer of Blood: England’s First Revolution, tells Smithsonian, after 1381, it became “if not impossible, then highly inadvisable, to ignore the effects of policy on ordinary people.”",
    "cn": "正如《血之夏：英格兰的第一次革命》一书的作者丹·琼斯（Dan Jones）告诉史密森尼，1381年后，“如果不是不可能的话，那么忽视政策对普通人的影响是非常不明智的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "polish": {
    "en": "In time, a tightly fitted row of single-peaked teeth came into view, Dąbrowski tells Roman Skiba of the Polish Press Agency (PAP).",
    "cn": "Dąbrowski告诉波兰新闻社（PAP）的Roman Skiba ，随着时间的推移，一排紧密贴合的单峰牙齿出现在视野中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "population": {
    "en": "The population is gradually growing, but the species is still considered vulnerable by the International Union for Conservation of Nature and endangered under the Endangered Species Act.",
    "cn": "人口正在逐渐增长，但该物种仍被国际自然保护联盟视为脆弱物种，并根据《濒危物种法》濒临灭绝。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "popular": {
    "en": "The Bayeux Tapestry exhibition is already proving to be one of the most popular in the museum’s history.",
    "cn": "贝叶挂毯展览已经被证明是博物馆历史上最受欢迎的展览之一。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "poor": {
    "en": "His goal owed something to poor goalkeeping from Martinez, but it was still reward for his ingenuity.",
    "cn": "马丁内斯的失误对他这一球有所帮助，但这粒进球仍是哈弗茨创造力的回报。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "politics": {
    "en": "At the time, he was asked about his role in getting the Balogun suspension suspended, and he admitted the \"politics and manipulation\" did overshadow the game against Belgium.",
    "cn": "当时，他被问及他在暂停Balogun停赛中的作用，他承认“政治和操纵”确实掩盖了对比利时的比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "politician": {
    "en": "Titled The Uprising, the movie stars Andrew Garfield as the Ploughman, a fictionalized everyman who takes up arms against the corrupt politicians advising England’s 14-year-old king, Richard II.",
    "cn": "这部名为《起义》（The Uprising）的电影由安德鲁·加菲尔德（Andrew Garfield）饰演犁人（Ploughman），这是一个虚构的普通人，他拿起武器对抗为英格兰14岁的国王理查二世（Richard II）提供",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "political": {
    "en": "Although the rebellion failed to achieve any of its stated goals, it inspired subsequent “large-scale popular uprisings with a political aim,” Prescott says.",
    "cn": "普雷斯科特说，尽管叛乱未能实现其任何既定目标，但它激发了随后的“有政治目的的大规模民众起义”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "private": {
    "en": "Billed as the world’s largest private collection of serial killer artifacts, the exhibition toured Europe before arriving stateside, where it made its first stop in Atlanta.",
    "cn": "该展览被誉为世界上最大的连环杀手文物私人收藏，在抵达美国之前在欧洲巡回展出，并在亚特兰大首次停留。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "prize": {
    "en": "The recipients of the Ig Nobel Chemistry Prize, however, conducted research concerning much smaller individuals: cockroaches.",
    "cn": "然而，Ig诺贝尔化学奖的获得者对更小的个体进行了研究：蟑螂。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "probability": {
    "en": "So every time a winger gets the ball and turns it into a shot instead of a cross, that player is, on average, increasing your probability of scoring a goal by 233% to 900%.",
    "cn": "所以每当边锋拿球选择射门而非传中，平均来说，你进球的概率提升了 233% 到 900%。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "probably": {
    "en": "Name your problem, and you can probably find a peptide—with a cryptic moniker like BPC-157 or GHK-Cu—that promises to help.",
    "cn": "说出您的问题，您可能会发现一种多肽-具有BPC-157或GHK-Cu等神秘绰号-有望提供帮助。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "production": {
    "en": "And it's not even clear that the production -- you know, the part where you turn your play into goals -- drove any kind of premium.",
    "cn": "而且尚不清楚他们的产出——也就是把表现转化为进球的部分——是否真的带来任何溢价。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "primarily": {
    "en": "Chelsea were without their first-choice midfield at the Emirates -- primarily because Enzo Fernández was offloaded in a £125 million transfer to Manchester City on deadline day, but also because of an injury to Moisés Caicedo.",
    "cn": "切尔西在酋长球场缺少主力中场——主要是因为恩佐·费尔南德斯在转会截止日以 1.25 亿英镑卖给了曼城，同时也因为凯塞多受伤。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "product": {
    "en": "Enough teams have spent lots of money on these highlight-reel-but-no-end-product wingers over the past three seasons that it has to mean something.",
    "cn": "过去三个赛季，已经有足够多的球队在这些「集锦精彩但产量不佳」的边锋身上砸下重金，这一定有意义。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "process": {
    "en": "Tzolis played a simple ball in from the left flank that Havertz dummied, completely flummoxing Chelsea defender Wesley Fofana in the process.",
    "cn": "佐利斯从左路送出一脚简单的传球，哈弗茨机敏一漏，让切尔西后卫福法纳彻底被晃。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "procedure": {
    "en": "The pioneer raccoon’s sister was the first to learn the procedure and make her own balls.",
    "cn": "这只浣熊的妹妹是第一个学习这个过程并自己做球的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "problem": {
    "en": "The problem, though, is that even the best crossers are incredibly inefficient.",
    "cn": "问题是，即便是最顶级的传中高手，效率也低得惊人。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "produce": {
    "en": "He meets a Bouanani cross from the right and nods towards goal but Jacob Chapman produces a super stop.",
    "cn": "他接到布阿纳尼从右路传中的球，头球攻门，但雅各布·查普曼做出了精彩扑救。",
    "src": "Sky Sports · 2026-09-09"
  },
  "priest": {
    "en": "“I didn’t want to tell [this story] through the names we remember,” like rebel leader Wat Tyler (played by Cosmo Jarvis ) and his comrade, the bombastic priest John Ball (Jamie Bell), Greengrass says in a director’s statement.",
    "cn": "Greengrass在一份导演声明中说：“我不想通过我们记住的名字来讲述[这个故事] ，”就像叛军领导人Wat Tyler （由Cosmo Jarvis扮演）和他的同志，夸张的牧师John Ball （Jamie Bell）。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "price": {
    "en": "Tickets range in price from £25 to £33, through a tiered pricing structure based on the day and time of visit.",
    "cn": "门票价格从25英镑到33英镑不等，根据参观日期和时间分层定价。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "premier": {
    "en": "Every Premier League club has been given at least 60 hours between their Christmas and New Year fixtures.",
    "cn": "每家英超俱乐部在圣诞和新年赛程之间至少有60个小时的休息时间。",
    "src": "Sky Sports · 2026-09-10"
  },
  "prefer": {
    "en": "That makes it the first time we really see what his squad, rather than his preferred XI, has to offer.",
    "cn": "这使我们第一次真正看到他的阵容，而不是他的首选XI ，所提供的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "predict": {
    "en": "It's a fascinating match-up and the way the market is predicting attack to outgun defence with the expected goals line almost at 3.25 based on the odds I'd be wanting to row against that at the prices and give Hull more a chance than the 11/1 away win suggests.",
    "cn": "这是一场令人着迷的比赛，市场预测进攻比防守多，预期进球数几乎是3.25，基于赔率，我想以价格来反对，给赫尔城更多的机会，而不是11/1的客场胜利。",
    "src": "Sky Sports · 2026-09-10"
  },
  "precise": {
    "en": "It was most likely made in England by English embroiderers, and while we do not have a precise date for when the Bayeux Tapestry was created, the academic consensus is that it must have been produced very soon after the events it depicts.",
    "cn": "它很可能是由英国的刺绣工在英格兰制作的，虽然我们没有确切的日期来确定贝叶挂毯是什么时候制作的，但学术界的共识是，它一定是在它描绘的事件发生后不久制作的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "presence": {
    "en": "So, to confirm their discovery, the team took multiple steps, using both camera trap imagery and genetic analysis to rule out the presence of these other creatures.",
    "cn": "因此，为了证实他们的发现，研究小组采取了多个步骤，使用相机陷阱图像和基因分析来排除这些其他生物的存在。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "previously": {
    "en": "But it previously did seem like teams had begun to realise that dribbling skill isn't worth much on its own.",
    "cn": "但以前，球队确实开始意识到，单靠过人技巧本身价值有限。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "prevent": {
    "en": "Underwear buried to test soil quality and urinals scientifically designed to prevent splashing were among the projects honoured as the Ig Nobel prizes again put a spotlight on the quirky side of science.",
    "cn": "埋葬以测试土壤质量的内衣和科学设计以防止飞溅的小便池是获得荣誉的项目之一，因为搞笑诺贝尔奖再次将焦点放在科学的古怪方面。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "pretty": {
    "en": "If this award helps spark more curiosity about this sort of question, then that’s a pretty wonderful outcome.”",
    "cn": "如果这个奖项有助于激发人们对这类问题的好奇心，那么这是一个非常好的结果。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "pressure": {
    "en": "Pressure is on Michael Carrick and suddenly, this week already feels season-defining.",
    "cn": "迈克尔·卡里克（Michael Carrick）承受着压力，突然之间，本周已经感觉到了赛季的定义。",
    "src": "Sky Sports · 2026-09-09"
  },
  "president": {
    "en": "There's managing at the World Cup, then there's managing at a home World Cup for a nation whose President rather enjoys the spotlight.",
    "cn": "在世界杯上进行管理，然后在一个主场世界杯上为一个总统更喜欢聚光灯的国家进行管理。",
    "src": "Sky Sports · 2026-09-09"
  },
  "preserve": {
    "en": "The vessel is well preserved, with ceramic tiles still lining its bathrooms, fans still hanging from its ceilings and teak tables still “intact, clean and perfectly aligned with each other” on the bridge deck, Cesare Balzi wrote for X-Ray Mag in 2018.",
    "cn": "切萨雷·巴尔齐（Cesare Balzi）在2018年的《X-Ray Mag》杂志上写道，这艘船保存完好，浴室里仍然铺着瓷砖，风扇仍然悬挂在天花板上，柚木桌子仍然“完好无损，干净整洁，彼此完美对齐”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "present": {
    "en": "The exhibition not only presents the Bayeux Tapestry in its entirety, but also sets it within the wider context of 11th-century England and Normandy.",
    "cn": "这次展览不仅完整地展示了贝叶挂毯，还将其置于11世纪英格兰和诺曼底的更广泛背景下。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "press": {
    "en": "For all of the emphasis on pressing and possessing, this shift was the defining feature of the 21st century version of the sport.",
    "cn": "无论外界如何强调逼抢和控球，这种转变都是 21 世纪足球的标志性特征。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "river": {
    "en": "Kendry Páez is not currently part of Chelsea 's first-team plans following the early termination of his loan spell at River Plate last month.",
    "cn": "Kendry Páez上个月在River Plate的租借期提前结束后，目前不属于切尔西的一线队计划。",
    "src": "Sky Sports · 2026-09-09"
  },
  "robber": {
    "en": "“The police intervention and the museum’s alarms caused the robbers to rush and steal only 4 of the 12 works from the Renoir Museum.”",
    "cn": "警察的介入和博物馆的警报使得劫匪们冲了过去，只偷走了雷诺阿博物馆12件作品中的4件。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "rock": {
    "en": "The short-eared rock-wallaby can easily be dismissed with images, because it doesn’t look the same as the nabarlek.",
    "cn": "短耳岩袋鼠很容易被图片所忽视，因为它看起来和纳巴莱克不一样。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "role": {
    "en": "At the time, he was asked about his role in getting the Balogun suspension suspended, and he admitted the \"politics and manipulation\" did overshadow the game against Belgium.",
    "cn": "当时，他被问及他在暂停Balogun停赛中的作用，他承认“政治和操纵”确实掩盖了对比利时的比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "roll": {
    "en": "Before then – since at least the late 1720s – it was rolled out only for antiquarian and guest visitors.",
    "cn": "在此之前，至少从18世纪20年代末开始，它只对古董商和游客开放。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "roman": {
    "en": "The site is known for a Roman-era cemetery that dates back to the fourth or fifth century C.E.",
    "cn": "该遗址以罗马时代的墓地而闻名，其历史可追溯到公元四或五世纪。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "round": {
    "en": "Chelsea play Leeds in the EFL Cup third round on Wednesday before hosting Hull in the league next weekend.",
    "cn": "切尔西将在周三的英联杯中迎战利兹，随后下周末在联赛主场对阵赫尔城。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "roughly": {
    "en": "Then, to make sure that the photographed wallabies were indeed nabarlek rather than the roughly identical monjon, researchers collected scat samples from the site to analyze their DNA.",
    "cn": "然后，为了确保拍摄到的小袋鼠确实是纳巴莱克而不是大致相同的獴，研究人员从现场收集了粪便样本来分析它们的DNA。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "rough": {
    "en": "On its strong hind legs, it hops around rocky outcrops, cliffs and crevices, using the rough pads on its feet to grip sheer rock.",
    "cn": "它用强壮的后腿在露出地面的岩石、悬崖和裂缝间跳跃，用脚上粗糙的脚垫抓住陡峭的岩石。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "rotate": {
    "en": "Given the nature of the two opponents, you would imagine Carrick will be thinking of rotating on Thursday.",
    "cn": "鉴于两名对手的性质，你可以想象卡里克将在周四考虑轮换。",
    "src": "Sky Sports · 2026-09-09"
  },
  "rival": {
    "en": "It will be tougher against rivals Manchester City on Sunday - but so will his team selection.",
    "cn": "周日对阵对手曼城的比赛将更加艰难，但他的阵容选择也将更加艰难。",
    "src": "Sky Sports · 2026-09-08"
  },
  "rose": {
    "en": "I wanted him to stand for all the ordinary people who actually rose up and paid the price for it.”",
    "cn": "我希望他能代表所有真正站起来为此付出代价的普通人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rope": {
    "en": "Each was drilled through at the root, and their arrangement suggests they were once strung together on a now-decayed rope.",
    "cn": "每个人都在根部钻孔，他们的安排表明他们曾经被一根现在腐烂的绳子串在一起。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "root": {
    "en": "Each was drilled through at the root, and their arrangement suggests they were once strung together on a now-decayed rope.",
    "cn": "每个人都在根部钻孔，他们的安排表明他们曾经被一根现在腐烂的绳子串在一起。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "room": {
    "en": "There was Donald Trump - there was always going to be - and the changing-room team talk.",
    "cn": "唐纳德·特朗普（Donald Trump）-总是会有-和更衣室团队的谈话。",
    "src": "Sky Sports · 2026-09-09"
  },
  "roof": {
    "en": "“Nowhere in the world are you going to see an exhibit like this with artifacts from so many serial killers under one roof.”",
    "cn": "“世界上没有任何地方会在一个屋檐下看到这样的展览，里面有这么多连环杀手的文物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rot": {
    "en": "This suggests the giant creatures incubated their eggs using a technique shared by modern crocodiles—using piles of rotting vegetation for heat.",
    "cn": "这表明巨型生物使用现代鳄鱼共用的技术孵化卵子-使用成堆的腐烂植被来加热。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "risk": {
    "en": "At the top of the table, most clubs moved toward a style that prioritised control and limited risks.",
    "cn": "在积分榜顶端，大多数俱乐部转向了强调控球、限制风险的风格。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "retain": {
    "en": "The 29-year-old signed a new deal until 2027 earlier this year, with Rangers retaining the option to extend that by a further 12 months.",
    "cn": "今年早些时候，这位29岁的球员与流浪者队签订了一份到2027年的新合同，流浪者队保留了再延长12个月的选择权。",
    "src": "Sky Sports · 2026-09-10"
  },
  "return": {
    "en": "Manchester United made a winning return to the Champions League as they beat Sabah FC in style with a 4-0 victory at Old Trafford.",
    "cn": "曼联在老特拉福德球场以4-0大胜沙巴队，成功重返欧冠赛场。",
    "src": "Sky Sports · 2026-09-08"
  },
  "reveal": {
    "en": "It is revealing because the World Cup has reinforced his appetite to keep learning and evolving.",
    "cn": "这很有启发性，因为世界杯增强了他不断学习和发展的胃口。",
    "src": "Sky Sports · 2026-09-09"
  },
  "revenge": {
    "en": "Once inside the fortress, the insurgents exacted revenge on their enemies, dragging some of the kingdom’s most powerful men out to an execution block and chopping off their heads.",
    "cn": "一旦进入堡垒，叛乱分子就向他们的敌人进行报复，将一些王国最强大的人拖到处决区并砍下他们的头。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "review": {
    "en": "Paper Talk is a review of the sports headlines from the national newspapers, every Monday to Friday, live on Sky Sports News from 10.30pm.",
    "cn": "Paper Talk是每周一至周五晚上10:30在天空体育新闻直播的全国性报纸的体育头条评论。",
    "src": "Sky Sports · 2026-09-10"
  },
  "revolt": {
    "en": "Greengrass first learned about the Peasants’ Revolt as a schoolchild.",
    "cn": "格林格拉斯从小就开始了解农民起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "revolution": {
    "en": "As Dan Jones, author of Summer of Blood: England’s First Revolution, tells Smithsonian, after 1381, it became “if not impossible, then highly inadvisable, to ignore the effects of policy on ordinary people.”",
    "cn": "正如《血之夏：英格兰的第一次革命》一书的作者丹·琼斯（Dan Jones）告诉史密森尼，1381年后，“如果不是不可能的话，那么忽视政策对普通人的影响是非常不明智的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "reward": {
    "en": "His goal owed something to poor goalkeeping from Martinez, but it was still reward for his ingenuity.",
    "cn": "马丁内斯的失误对他这一球有所帮助，但这粒进球仍是哈弗茨创造力的回报。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "right": {
    "en": "He meets a Bouanani cross from the right and nods towards goal but Jacob Chapman produces a super stop.",
    "cn": "他接到布阿纳尼从右路传中的球，头球攻门，但雅各布·查普曼做出了精彩扑救。",
    "src": "Sky Sports · 2026-09-09"
  },
  "rise": {
    "en": "From the second of two subsequent corners, Muharemovic rises highest at the back post to nod the opener back inside the opposite corner.",
    "cn": "从接下来的两个角落中的第二个角落，穆哈雷莫维奇在后柱上升得最高，向对角内的揭幕战点头。",
    "src": "Sky Sports · 2026-09-09"
  },
  "rich": {
    "en": "The insurgents’ demands ranged from the abolition of serfdom to the redistribution of the church’s riches.",
    "cn": "叛乱分子的要求从废除农奴制到重新分配教会的财富不等。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rice": {
    "en": "It's never been a question,\" added Declan Rice, speaking to Sky Sports.",
    "cn": "这从来都不是一个问题，”Declan Rice在接受天空体育采访时补充道。",
    "src": "Sky Sports · 2026-09-09"
  },
  "row": {
    "en": "In time, a tightly fitted row of single-peaked teeth came into view, Dąbrowski tells Roman Skiba of the Polish Press Agency (PAP).",
    "cn": "Dąbrowski告诉波兰新闻社（PAP）的Roman Skiba ，随着时间的推移，一排紧密贴合的单峰牙齿出现在视野中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "same": {
    "en": "The short-eared rock-wallaby can easily be dismissed with images, because it doesn’t look the same as the nabarlek.",
    "cn": "短耳岩袋鼠很容易被图片所忽视，因为它看起来和纳巴莱克不一样。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "sample": {
    "en": "The sample size is small but there seems more aggression and pressing about Brentford this season with a rise in their high turnovers per 90 of 3.1 and 6.2 more fouls committed per 90.",
    "cn": "样本规模很小，但本赛季布伦特福德似乎更具侵略性和压力，他们每90分钟的最高失误增加了3.1次，每90分钟的犯规增加了6.2次。",
    "src": "Sky Sports · 2026-09-10"
  },
  "sand": {
    "en": "“Buried in sand, soil, or vegetation, the nest would stay humid or damp enough for the eggs to survive,” says Zelenitsky.",
    "cn": "Zelenitsky说：“巢穴被埋在沙子、土壤或植被中，会保持潮湿或潮湿，足以让卵子存活下来。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "saturday": {
    "en": "\"I spoke with the Mister and he was the key for this decision,\" Fernandes told Sky Sports ahead of the Saturday Night Football clash with Everton.",
    "cn": "“我和先生谈过了，他是这个决定的关键，”费尔南德斯在周六晚与埃弗顿的比赛前告诉天空体育。",
    "src": "Sky Sports · 2026-09-10"
  },
  "save": {
    "en": "Mike Penders is called into action twice in a matter of seconds to deny Muharemovic and Aaronson with a superb double save.",
    "cn": "Mike Penders在几秒钟内两次被要求采取行动，以拒绝Muharemovic和Aaronson的精彩双扑救。",
    "src": "Sky Sports · 2026-09-09"
  },
  "scene": {
    "en": "The Latin captions above the scenes are terse, offering little more than names and places.",
    "cn": "场景上方的拉丁文字幕很简洁，除了名字和地点之外，几乎没有别的说明。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "scare": {
    "en": "\"I didn't feel like we were shaking or scared, we tried to play, for the whole 90 minutes we did that.",
    "cn": "“我不觉得我们在颤抖或害怕，我们努力比赛，整整90分钟我们都在这样做。",
    "src": "Sky Sports · 2026-09-08"
  },
  "scale": {
    "en": "Although the rebellion failed to achieve any of its stated goals, it inspired subsequent “large-scale popular uprisings with a political aim,” Prescott says.",
    "cn": "普雷斯科特说，尽管叛乱未能实现其任何既定目标，但它激发了随后的“有政治目的的大规模民众起义”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "say": {
    "en": "In the study, “we’ve shown that animals kiss and when it could have evolved in the primates,” she says.",
    "cn": "她说：“在这项研究中，我们已经证明了动物接吻以及它何时可以在灵长类动物中进化。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "saw": {
    "en": "Alonso's 3-5-2 system saw Josh Acheampong, Maxence Lacroix and Wesley Fofana start in the back three -- with Pedro Neto and Jorrel Hato as wing-backs.",
    "cn": "阿隆索排出的 3-5-2 阵型中，约书亚·阿查姆庞、拉克鲁瓦和福法纳组成三中卫，佩德罗·内托和哈托担任翼卫。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "scar": {
    "en": "\"I didn't feel like we were shaking or scared, we tried to play, for the whole 90 minutes we did that.",
    "cn": "“我不觉得我们在颤抖或害怕，我们努力比赛，整整90分钟我们都在这样做。",
    "src": "Sky Sports · 2026-09-08"
  },
  "runner": {
    "en": "The goal, Odegaard's fourth in five games this season, ensured a winning start for last season's runners-up in this competition but wasteful finishing made it harder than it should have been.",
    "cn": "这个进球是厄德高本赛季五场比赛中的第四个进球，确保了上赛季亚军在这场比赛中的胜利开局，但浪费的成绩使比赛变得更加艰难。",
    "src": "Sky Sports · 2026-09-09"
  },
  "run": {
    "en": "Its Chicago stop, which opened to the public over Labor Day weekend, runs through January.",
    "cn": "芝加哥站在劳动节周末向公众开放，一直持续到1月。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rumour": {
    "en": "Tottenham transfer news, rumours and gossip: Live updates and latest on deals, signings, loans and contracts",
    "cn": "热刺转会新闻，谣言和八卦：实时更新和最新的交易，签约，贷款和合同",
    "src": "Sky Sports · 2026-09-10"
  },
  "rule": {
    "en": "The Egypt international was later denied his first goal with the ball ruled out of play before Hogh sent it back in for him to score.",
    "cn": "这位埃及国脚后来被拒绝了他的第一个进球，球被排除在外，然后霍格将球送回给他进球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "rush": {
    "en": "“The police intervention and the museum’s alarms caused the robbers to rush and steal only 4 of the 12 works from the Renoir Museum.”",
    "cn": "警察的介入和博物馆的警报使得劫匪们冲了过去，只偷走了雷诺阿博物馆12件作品中的4件。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "royal": {
    "en": "Looking at fossilized titanosaur eggs found in southern Argentina’s Chorrillo Formation, a study published in the journal Royal Society Open Science today offers a new understanding of how dinosaurs survived and reproduced so far from the equator.",
    "cn": "通过观察在阿根廷南部Chorrillo地层中发现的泰坦龙蛋化石，今天发表在《皇家学会开放科学》杂志上的一项研究为恐龙如何在远离赤道的地方生存和繁殖提供了新的认识。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "saint": {
    "en": "A strong stop from the Saints goalkeeper, turning the ball past as Celtic push for an early opener.",
    "cn": "圣徒守门员强有力的一站，在凯尔特人推动早期揭幕战时，将球转过身去。",
    "src": "Sky Sports · 2026-09-09"
  },
  "safe": {
    "en": "There’s little to no research proving these molecules are safe or effective and no assurance from the FDA about their identity, purity or strength.",
    "cn": "几乎没有研究证明这些分子是安全或有效的，FDA也不能保证它们的特性、纯度或强度。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sacrifice": {
    "en": "That mound contained the bones of a calf—possibly a graveside sacrifice.",
    "cn": "那个土堆里有小牛的骨头--可能是墓边的祭品。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "pluck": {
    "en": "In January, however, one young raccoon was seen bypassing the food scraps, instead plucking a receipt from a waste bin.",
    "cn": "然而，今年1月，人们看到一只小浣熊绕过食物残渣，而是从垃圾箱里拿出一张收据。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "result": {
    "en": "\"I don't know the amount of chances and situations we generated but the performance doesn't reflect the result.",
    "cn": "“我不知道我们创造了多少机会和情况，但表现并不能反映结果。",
    "src": "Sky Sports · 2026-09-09"
  },
  "restrict": {
    "en": "Though his mobility was restricted, Renoir painted there until his death, in 1919.",
    "cn": "尽管行动不便，雷诺阿仍在那里作画，直到1919年去世。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "refuge": {
    "en": "This finding suggests that the marine mammals may be seeking refuge on artificial reefs like the Po as their natural habitat is increasingly threatened by human activities.",
    "cn": "这一发现表明，海洋哺乳动物可能正在Po等人工珊瑚礁上寻求庇护，因为它们的自然栖息地越来越受到人类活动的威胁。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "regard": {
    "en": "The Navier-Stokes problem, a famous theoretical math problem regarding the movement of fluids, has stumped mathematicians for almost 200 years.",
    "cn": "纳维-斯托克斯问题是一个关于流体运动的著名理论数学问题，困扰了数学家近200年。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "regarding": {
    "en": "The Navier-Stokes problem, a famous theoretical math problem regarding the movement of fluids, has stumped mathematicians for almost 200 years.",
    "cn": "纳维-斯托克斯问题是一个关于流体运动的著名理论数学问题，困扰了数学家近200年。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "region": {
    "en": "Both lie in a remote region where the nabarlek had not been documented for 50 years.",
    "cn": "它们都位于一个偏远的地区，在那里，纳巴勒克已经有50年没有文献记载了。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "register": {
    "en": "In the basement of Lahore Museum in Pakistan were 34 black, leather-bound registers gathering dust.",
    "cn": "在巴基斯坦拉合尔博物馆（Lahore Museum）的地下室里，有34本黑色皮革装订的登记簿落满了灰尘。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "regulate": {
    "en": "Experts say the peptide craze is part of a broader phenomenon, as patients look beyond the regulated health system to address problems that doctors have struggled to treat",
    "cn": "专家表示，多肽热是一种更广泛现象的一部分，因为患者将目光投向了受监管的卫生系统之外，以解决医生难以治疗的问题",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "regulation": {
    "en": "“We’re seeing a new rival or parallel health system emerge,” says Daniel Carpenter, chair of the government department at Harvard University and an expert in FDA regulation, “built on self-diagnosis and easy access to a wide range of treatments.”",
    "cn": "哈佛大学政府部门主席、FDA监管专家丹尼尔·卡彭特（Daniel Carpenter）说：“我们正在看到一个新的竞争对手或平行的卫生系统出现，它建立在自我诊断和容易获得各种治疗的基础上。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "reign": {
    "en": "Want to know more about Elizabeth I and her remarkable reign?",
    "cn": "想知道更多关于伊丽莎白一世和她卓越的统治吗？",
    "src": "HistoryExtra · 2026-09-09"
  },
  "reliable": {
    "en": "As part of his HistoryExtra Academy series on the embroidery, Dr David Musgrove examines the history of the tapestry, the story it tells, who made it and whether it's reliable as a historical source…",
    "cn": "作为他关于刺绣的历史系列的一部分，大卫·马斯格罗夫博士研究了挂毯的历史，它讲述的故事，它的制造者，以及它作为历史来源是否可靠…",
    "src": "HistoryExtra · 2026-09-09"
  },
  "relevant": {
    "en": "\"We just want to make sure that we give ourselves a chance to be relevant domestically again in terms of winning trophies, and Sunday gives us a chance to take a step towards that.\"",
    "cn": "“我们只是想确保我们给自己一个在国内赢得奖杯的机会，周日给了我们一个朝着这个目标迈出一步的机会。",
    "src": "Sky Sports · 2026-09-10"
  },
  "release": {
    "en": "Tickets are being released in phases, with the next batch available to book from 21 October 2026.",
    "cn": "门票将分阶段发售，下一批门票将于2026年10月21日开始接受预订。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "relationship": {
    "en": "\"He's got that edge and different relationships around him as well and that helps,\" said the Gunners boss.",
    "cn": "“他周围有这种优势和不同的关系，这很有帮助，”枪手主帅说。",
    "src": "Sky Sports · 2026-09-09"
  },
  "relate": {
    "en": "This boom is even more visible online: As of May, peptide-related hashtags had generated more than 130,000 Instagram posts and 230 million TikTok views.",
    "cn": "这种热潮在网上更加明显：截至5月，与多肽相关的标签已经产生了超过13万个Instagram帖子和2.3亿次TikTok浏览量。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "reinforce": {
    "en": "It is revealing because the World Cup has reinforced his appetite to keep learning and evolving.",
    "cn": "这很有启发性，因为世界杯增强了他不断学习和发展的胃口。",
    "src": "Sky Sports · 2026-09-09"
  },
  "reliance": {
    "en": "Arsenal's set-piece prowess is well documented, to the extent that they have been criticised for an over-reliance on dead-ball situations to win tight games.",
    "cn": "阿森纳的定位球能力人尽皆知，甚至有人批评他们过分依赖定位球来赢下胶着比赛。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "rebel": {
    "en": "On a June day in 1381, however, rebels breached the Tower for the first and only time in its history.",
    "cn": "然而，在1381年6月的一天，叛乱分子在其历史上第一次也是唯一一次突破了这座塔。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rebellion": {
    "en": "Paul Greengrass’ new film stars Andrew Garfield as a fictionalized, unnamed farmer who leads a rebellion against unfair taxes and the system of serfdom",
    "cn": "保罗·格林格拉斯（Paul Greengrass）的新电影明星安德鲁·加菲尔德（Andrew Garfield）是一个虚构的、未透露姓名的农民，他领导了一场反对不公平税收和农奴制度的叛乱",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "receipt": {
    "en": "In January, however, one young raccoon was seen bypassing the food scraps, instead plucking a receipt from a waste bin.",
    "cn": "然而，今年1月，人们看到一只小浣熊绕过食物残渣，而是从垃圾箱里拿出一张收据。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "receive": {
    "en": "Would you like to receive offers from our publisher, Immediate Media, and carefully selected partners?",
    "cn": "您想收到我们的出版商、即时媒体和精心挑选的合作伙伴的报价吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "recent": {
    "en": "The Renoir Museum burglary joins a growing roster of recent art thefts in Europe.",
    "cn": "雷诺阿博物馆的盗窃案是欧洲近年来不断增多的艺术品盗窃案之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "recently": {
    "en": "The former Manchester United striker, 30, most recently played in Mexico for Monterrey.",
    "cn": "这位30岁的前曼联前锋最近在墨西哥的蒙特雷队踢球。",
    "src": "Sky Sports · 2026-09-10"
  },
  "record": {
    "en": "Arsenal had 26 shots in total - their most on record (since 2003/04) in the competition.",
    "cn": "阿森纳总共投篮26次，这是他们在比赛中最多的纪录（自2003/04赛季以来）。",
    "src": "Sky Sports · 2026-09-09"
  },
  "reflection": {
    "en": "His reflections on the World Cup seem like as good a place to get going.",
    "cn": "他对世界杯的思考似乎是一个很好的去处。",
    "src": "Sky Sports · 2026-09-09"
  },
  "reflect": {
    "en": "\"I don't know the amount of chances and situations we generated but the performance doesn't reflect the result.",
    "cn": "“我不知道我们创造了多少机会和情况，但表现并不能反映结果。",
    "src": "Sky Sports · 2026-09-09"
  },
  "reference": {
    "en": "Christos Tzolis is likely to be one of those players Arteta is referencing.",
    "cn": "Christos Tzolis很可能是Arteta提到的球员之一。",
    "src": "Sky Sports · 2026-09-09"
  },
  "reel": {
    "en": "Enough teams have spent lots of money on these highlight-reel-but-no-end-product wingers over the past three seasons that it has to mean something.",
    "cn": "过去三个赛季，已经有足够多的球队在这些「集锦精彩但产量不佳」的边锋身上砸下重金，这一定有意义。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "red": {
    "en": "They were required to be painted white with green bands and red crosses and illuminated at night.",
    "cn": "他们被要求被漆成白色，带有绿色条带和红色十字架，并在夜间照明。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "recover": {
    "en": "Before the two abandoned paintings were recovered, the mayor’s office had valued the thieves’ haul at some $10 million, reports Agence France-Presse.",
    "cn": "据法新社报道，在这两幅被遗弃的画作被找回之前，市长办公室估计窃贼的赃款约为1000万美元。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "research": {
    "en": "The research highlights how dinosaurs adapted to environmental conditions, says Zelenitsky to the CBC.",
    "cn": "Zelenitsky向加拿大广播公司表示，这项研究突出了恐龙如何适应环境条件。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "researcher": {
    "en": "The style of the ax, which was chipped from use, led researchers to date the grave to around 2900 B.C.E.",
    "cn": "斧头的风格从使用中被削弱，导致研究人员将坟墓的年代定在公元前2900年左右。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "resemble": {
    "en": "The nabarlek looks nearly identical to the monjon (another small rock-wallaby that shares its range), and its genes very closely resemble those of the short-eared rock-wallaby.",
    "cn": "纳巴勒克看起来几乎和獴（另一种分布范围相同的小岩袋鼠）一模一样，它的基因也和短耳岩袋鼠非常相似。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "resolution": {
    "en": "Between June 2022 and September 2024, they made 32 scientific dives to the Po, which they studied using high-resolution sonar surveys and 3D photography.",
    "cn": "在2022年6月至2024年9月期间，他们对Po进行了32次科学潜水，他们使用高分辨率声纳调查和3D摄影进行了研究。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "resource": {
    "en": "It’s usually harder for such large animals to find the resources needed to survive and reproduce in such a climate.",
    "cn": "这种大型动物通常很难找到在这种气候下生存和繁殖所需的资源。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "restore": {
    "en": "It will be more challenging against City's attack but Carrick and his players go into that with confidence restored.",
    "cn": "面对曼城的进攻会更有挑战性，但卡里克和他的球员们会恢复信心。",
    "src": "Sky Sports · 2026-09-08"
  },
  "rest": {
    "en": "Discovered by divers in 2005, it rests on a gently inclined shelf less than a mile off the coast.",
    "cn": "它由潜水员于2005年发现，坐落在离海岸不到一英里的平缓倾斜的架子上。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "responsible": {
    "en": "Vitaly Janelt has been responsible for a lot of that upsurge, making 10 fouls in four games and being booked in all three Premier League games.",
    "cn": "维塔利·贾内尔特对这场热潮负有很大的责任，他在四场比赛中犯规10次，并且在三场英超比赛中都吃到了黄牌。",
    "src": "Sky Sports · 2026-09-10"
  },
  "requirement": {
    "en": "However, Sky Sports News reported during the summer transfer window that the Scotland international has been made surplus to requirements at Ibrox.",
    "cn": "然而，天空体育在夏季转会窗口报道，苏格兰国脚已经超出了伊布罗克斯的需求。",
    "src": "Sky Sports · 2026-09-10"
  },
  "require": {
    "en": "To view this content, choose 'Accept and continue' to allow Google reCAPTCHA and its required purposes.",
    "cn": "要查看此内容，请选择“接受并继续”以允许谷歌reCAPTCHA及其所需目的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "request": {
    "en": "The flat presentation in London, requested by the French state, is designed to minimise stress on the fabric.",
    "cn": "应法国政府的要求，在伦敦的平面展示是为了尽量减少对织物的压力。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "remove": {
    "en": "Navier-Stokes might seem like a wildly theoretical consideration, far removed from the daily life of the average person.",
    "cn": "纳维-斯托克斯似乎是一种疯狂的理论考虑，与普通人的日常生活相去甚远。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "remote": {
    "en": "Both lie in a remote region where the nabarlek had not been documented for 50 years.",
    "cn": "它们都位于一个偏远的地区，在那里，纳巴勒克已经有50年没有文献记载了。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "remember": {
    "en": "Amandeep Madra remembers his father telling him, almost in passing, that his uncle (Amandeep’s great uncle) had served with the British during the First World War.",
    "cn": "阿曼迪普·马德拉（Amandeep Madra）记得父亲几乎是顺带地告诉他，他的叔叔（阿曼迪普的叔祖父）曾在第一次世界大战期间与英国人一起服役。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "renew": {
    "en": "Rangers turn their attention to a huge double-header against Celtic, with the sides first meeting in the League Cup quarter-finals before renewing hostilities in the Scottish Premiership at Parkhead.",
    "cn": "流浪者将注意力转向对凯尔特人的巨大双头，双方在联赛杯四分之一决赛中首次会面，然后在Parkhead的苏格兰超级联赛中再次发生敌对行动。",
    "src": "Sky Sports · 2026-09-09"
  },
  "remains": {
    "en": "While there is no direct association between the eggshells and skeletal remains, the authors note in the study, it’s possible they could belong to the same species.",
    "cn": "作者在研究中指出，虽然蛋壳和骨骼遗骸之间没有直接联系，但它们可能属于同一物种。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "remain": {
    "en": "Alonso was handed another clear indication of where his side remain lacking - but for now, chaos isn't serving them too badly.",
    "cn": "阿隆索得到了另一个明确的迹象，表明他的球队仍然缺乏-但目前，混乱并没有为他们服务得太糟糕。",
    "src": "Sky Sports · 2026-09-09"
  },
  "remarkable": {
    "en": "Want to know more about Elizabeth I and her remarkable reign?",
    "cn": "想知道更多关于伊丽莎白一世和她卓越的统治吗？",
    "src": "HistoryExtra · 2026-09-09"
  },
  "restriction": {
    "en": "Despite financial restrictions that appear to be imposed within the club, you can't hide from the fact they have the highest net spend of any Premier League side since 2022.",
    "cn": "尽管俱乐部内部似乎施加了财务限制，但自2022年以来，他们的净支出一直是英超联赛中最高的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "repeat": {
    "en": "Morgan Rogers -- who signed for Chelsea in a £117 million deal after repeated links with a move to Arsenal -- struck inside 77 seconds to put the visitors in front.",
    "cn": "此前曾与阿森纳频繁传出转会绯闻的摩根·罗杰斯，以 1.17 亿英镑转会切尔西，开场仅 77 秒便率先破门。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "reproduce": {
    "en": "It’s usually harder for such large animals to find the resources needed to survive and reproduce in such a climate.",
    "cn": "这种大型动物通常很难找到在这种气候下生存和繁殖所需的资源。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "representative": {
    "en": "It also follows consultation with the Football Supporters' Association and representatives from club Fan Advisory Boards.",
    "cn": "这也是在与足球支持者协会和俱乐部球迷顾问委员会的代表进行磋商之后做出的决定。",
    "src": "Sky Sports · 2026-09-10"
  },
  "repair": {
    "en": "By linking up various amino acids in sequence, the body produces peptides that carry out a wide range of functions, including immune support, tissue repair and appetite control.",
    "cn": "通过按顺序连接各种氨基酸，人体产生具有多种功能的肽，包括免疫支持、组织修复和食欲控制。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "report": {
    "en": "However, Sky Sports News reported during the summer transfer window that the Scotland international has been made surplus to requirements at Ibrox.",
    "cn": "然而，天空体育在夏季转会窗口报道，苏格兰国脚已经超出了伊布罗克斯的需求。",
    "src": "Sky Sports · 2026-09-10"
  },
  "replace": {
    "en": "The nabarlek is the only wallaby that can continually replace its molar teeth throughout its life, rather like a shark.",
    "cn": "纳巴莱克是唯一一种可以在一生中不断更换臼齿的小袋鼠，就像鲨鱼一样。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "repeatedly": {
    "en": "She then carried the slip of paper to a bowl of water, dunked it repeatedly, and rolled it between her front paws and against the sand until it formed a compact, gritty ball.",
    "cn": "然后，她把纸条拿到一碗水里，反复浸泡，用前爪在沙子上滚来滚去，直到它变成一个致密的沙砾球。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "reporter": {
    "en": "“Attacking the Renoir Museum is attacking a part of the history and heritage of Cagnes-sur-Mer,” Masson told reporters, per BBC News ’ Michael Sheils McNamee and Tiffany Wertheimer.",
    "cn": "“攻击雷诺阿博物馆就是攻击滨海卡涅的一部分历史和遗产，”马森告诉记者，据BBC新闻的迈克尔·谢尔斯·麦克纳米和蒂凡尼·韦特海默报道。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "plenty": {
    "en": "The scooped pass to release Ben White for the golden chance somehow spurned by Piero Hincapie was one of many examples of his ingenuity against the massed ranks of Napoli players but there were plenty of others.",
    "cn": "皮耶罗·辛卡皮（Piero Hincapie）以某种方式拒绝了释放本·怀特（Ben White）的黄金机会，这是他对那不勒斯球员群体的聪明才智的众多例子之一，但还有很多其他例子。",
    "src": "Sky Sports · 2026-09-09"
  },
  "might": {
    "en": "Navier-Stokes might seem like a wildly theoretical consideration, far removed from the daily life of the average person.",
    "cn": "纳维-斯托克斯似乎是一种疯狂的理论考虑，与普通人的日常生活相去甚远。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "mile": {
    "en": "Discovered by divers in 2005, it rests on a gently inclined shelf less than a mile off the coast.",
    "cn": "它由潜水员于2005年发现，坐落在离海岸不到一英里的平缓倾斜的架子上。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "military": {
    "en": "Curiously, they then head off together on a military adventure in Brittany, which Harold seems to enthusiastically take part in.",
    "cn": "奇怪的是，他们随后一起前往布列塔尼进行军事冒险，哈罗德似乎热情地参加了这次冒险。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "milk": {
    "en": "In a 2016 study, scientists found that milk proteins from a species of cockroach that gives live birth carry three times as much energy as milk proteins from cows.",
    "cn": "在2016年的一项研究中，科学家们发现，一种活产蟑螂的乳蛋白所携带的能量是奶牛乳蛋白的三倍。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "million": {
    "en": "Arsenal pursued a deal for Rogers for much of the summer but never believed he was worth £117 million.",
    "cn": "阿森纳整个夏天都在追逐罗杰斯，但始终认为他不值 1.17 亿英镑。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "mind": {
    "en": "They can only blame themselves for that problem, mind you.",
    "cn": "请注意，他们只能把这个问题归咎于自己。",
    "src": "Sky Sports · 2026-09-09"
  },
  "minister": {
    "en": "Edda Ciano, the daughter of Italian dictator Benito Mussolini and the wife of Italian foreign minister Galeazzo Ciano, was among the survivors.",
    "cn": "埃达·奇亚诺（Edda Ciano）是意大利独裁者贝尼托·墨索里尼（Benito Mussolini）的女儿，也是意大利外交部长加莱阿佐·奇亚诺（Galeazzo Ciano）的妻子",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "missing": {
    "en": "The missing art was on loan to the Renoir Museum and belongs to the Musée d’Orsay, in Paris.",
    "cn": "这幅失踪的艺术品是租借给雷诺阿博物馆的，属于巴黎的mussame d 'Orsay。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "miss": {
    "en": "The missing art was on loan to the Renoir Museum and belongs to the Musée d’Orsay, in Paris.",
    "cn": "这幅失踪的艺术品是租借给雷诺阿博物馆的，属于巴黎的mussame d 'Orsay。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "minute": {
    "en": "Among players with at least 900 minutes of game time, 53 different Premier League players got there last year.",
    "cn": "而在出场 900 分钟以上的球员中，去年有 53 名英超球员达到了这一数字。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "meet": {
    "en": "This was also a meeting of two sides with a 100% record from their opening two games.",
    "cn": "这场比赛也是前两轮联赛均取得全胜的两支球队之间的对决。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "meeting": {
    "en": "This was also a meeting of two sides with a 100% record from their opening two games.",
    "cn": "这场比赛也是前两轮联赛均取得全胜的两支球队之间的对决。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "member": {
    "en": "Members of a group learn to make or use these items by observing others.",
    "cn": "一个小组的成员通过观察其他人来学习制作或使用这些物品。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "mental": {
    "en": "There was a time when the Blues used to dominate Arsenal physically -- and possibly psychologically, with ex-Arsenal boss Arsene Wenger having to fend off questions about a mental block against their London rivals.",
    "cn": "曾经有一段时间，切尔西在身体上——甚至可能在心理上——对阿森纳形成压制，前阿森纳主帅温格甚至不得不反复回应外界关于他心结的提问。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "menu": {
    "en": "Peptides seem like they’re everywhere: on social media, on medical spa menus and beyond.",
    "cn": "多肽似乎无处不在：社交媒体、医疗水疗菜单等。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "microscope": {
    "en": "Zelenitsky and her colleagues then took a closer look at the pores on the eggshells using microscopes and micro-CT scanners.",
    "cn": "然后，Zelenitsky和她的同事们使用显微镜和微型CT扫描仪仔细观察了蛋壳上的毛孔。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "metric": {
    "en": "Odegaard only scored once for Arsenal during an injury-hit 2025/26 campaign but now his stats are up across a range of other attacking metrics, too.",
    "cn": "在一场受伤的2025/26赛季中，厄德高只为阿森纳得分一次，但现在他的统计数据也在一系列其他攻击指标上都有所上升。",
    "src": "Sky Sports · 2026-09-09"
  },
  "metre": {
    "en": "This astonishing artwork is 68.3 metres long and half a metre high.",
    "cn": "这幅惊人的艺术品长68.3米，高半米。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "method": {
    "en": "A notebook from Arthur Conan Doyle detailing Detective Sherlock Holmes ’ mystery-solving methods, as well as crime writer Dorothy L.",
    "cn": "阿瑟·柯南·道尔的一本笔记本详细描述了侦探夏洛克·福尔摩斯的破案方法，以及犯罪作家多萝西·L。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "middle": {
    "en": "But the Arsenal attack down both flanks and through the middle looked extremely dangerous at the Stadio Diego Armando Maradona.",
    "cn": "但是阿森纳在迭戈·阿曼多·马拉多纳体育场的侧翼和中间进攻看起来非常危险。",
    "src": "Sky Sports · 2026-09-09"
  },
  "message": {
    "en": "This is your chance to show how much Scouting means to you,” read a message accompanying the insert.",
    "cn": "这是你展示童军运动对你有多重要的机会。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "metal": {
    "en": "“The metal sheets provide a hard substrate for marine life to grow on,” lead author Simone Modugno, a marine biologist with the Institute for Research, Development and Experimentation on the Environment and Territory, tells BBC Wildlife magazine ’s Helen Pilcher.",
    "cn": "“金属板为海洋生物的生长提供了坚硬的基础，”环境与领土研究、开发和实验研究所的海洋生物学家Simone Modugno告诉英国广播公司野生动物杂志的海伦·皮尔彻。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "mediterranean": {
    "en": "Mediterranean monk seals spend most of their time in water, but they waddle onto land periodically to rest and give birth.",
    "cn": "地中海僧海豹大部分时间都在水中度过，但它们会定期徘徊在陆地上休息和分娩。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "mount": {
    "en": "As yet, these peptides are “completely untested and unregulated,” says Deborah Doroshow, an oncologist and historian at Mount Sinai in New York.",
    "cn": "到目前为止，这些肽“完全未经测试和不受管制”，纽约西奈山的肿瘤学家和历史学家Deborah Doroshow说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "move": {
    "en": "The way we moved the ball, the aggression and the chances we created, we should have done so much better.",
    "cn": "我们移动球的方式，我们创造的侵略性和机会，我们应该做得更好。",
    "src": "Sky Sports · 2026-09-09"
  },
  "movie": {
    "en": "Titled The Uprising, the movie stars Andrew Garfield as the Ploughman, a fictionalized everyman who takes up arms against the corrupt politicians advising England’s 14-year-old king, Richard II.",
    "cn": "这部名为《起义》（The Uprising）的电影由安德鲁·加菲尔德（Andrew Garfield）饰演犁人（Ploughman），这是一个虚构的普通人，他拿起武器对抗为英格兰14岁的国王理查二世（Richard II）提供",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "much": {
    "en": "The way we moved the ball, the aggression and the chances we created, we should have done so much better.",
    "cn": "我们移动球的方式，我们创造的侵略性和机会，我们应该做得更好。",
    "src": "Sky Sports · 2026-09-09"
  },
  "multiple": {
    "en": "So, to confirm their discovery, the team took multiple steps, using both camera trap imagery and genetic analysis to rule out the presence of these other creatures.",
    "cn": "因此，为了证实他们的发现，研究小组采取了多个步骤，使用相机陷阱图像和基因分析来排除这些其他生物的存在。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "must": {
    "en": "There were times during the tournament when life must have felt a little wild, I suggest.",
    "cn": "我建议，在比赛期间，生活一定感觉有点狂野。",
    "src": "Sky Sports · 2026-09-09"
  },
  "museum": {
    "en": "In 1960, Renoir’s son Claude sold the estate to the village of Cagnes, which turned it into a museum.",
    "cn": "1960年，雷诺阿的儿子克劳德将庄园卖给了卡涅斯村，并将其改建为博物馆。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "muscle": {
    "en": "Today, they’re sold via polished websites with a medical gloss, with each peptide promising to deliver a remarkable benefit, such as weight loss, younger-looking skin or muscle repair.",
    "cn": "如今，它们通过带有医学光泽的抛光网站出售，每种肽都有望带来显着的好处，例如减肥、年轻的皮肤或肌肉修复。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "murder": {
    "en": "Murder on the Orient Express became a Hollywood blockbuster in 2017, and Death on the Nile followed in 2022.",
    "cn": "2017年，《东方快车谋杀案》成为好莱坞大片，2022年，《尼罗河上的惨案》紧随其后。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "mister": {
    "en": "\"I spoke with the Mister and he was the key for this decision,\" Fernandes told Sky Sports ahead of the Saturday Night Football clash with Everton.",
    "cn": "“我和先生谈过了，他是这个决定的关键，”费尔南德斯在周六晚与埃弗顿的比赛前告诉天空体育。",
    "src": "Sky Sports · 2026-09-10"
  },
  "motion": {
    "en": "First, they set out five cameras that operated at night, triggered by the motion of nearby animals.",
    "cn": "首先，他们设置了五台夜间运行的摄像机，由附近动物的动作触发。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "mostly": {
    "en": "And then Mbaye played only 900 mostly sub minutes for the best team in the world.",
    "cn": "而姆巴耶在世界上最好的球队只踢了大约 900 分钟，大多是替补时间。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "mix": {
    "en": "Having finished 10th last season, 33 points behind the Gunners, Chelsea have done a remarkable job in the summer to put themselves back in the title mix.",
    "cn": "上赛季只拿到第 10 名、落后阿森纳 33 分的切尔西，在今夏完成了一项了不起的工作，让自己重新回到争冠行列。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "model": {
    "en": "The proof was produced by a group of agents, using an OpenAI next-generation model significantly more capable than GPT-6 Astra.",
    "cn": "证据是由一组代理使用比GPT-6 Astra更强大的OpenAI下一代模型制作的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "modern": {
    "en": "This suggests the giant creatures incubated their eggs using a technique shared by modern crocodiles—using piles of rotting vegetation for heat.",
    "cn": "这表明巨型生物使用现代鳄鱼共用的技术孵化卵子-使用成堆的腐烂植被来加热。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "molecule": {
    "en": "Its equations assume that fluids are smooth and continuous, while in the real world, of course, they are made of atoms and molecules.",
    "cn": "它的方程假设流体是光滑和连续的，而在现实世界中，它们当然是由原子和分子组成的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "moment": {
    "en": "But it was another substitute who provided the decisive moment as Miovski produced a composed finish to ensure Rangers' momentum under McInnes continues.",
    "cn": "但这是另一位替补球员提供了决定性的时刻，因为Miovski创造了一个沉着的结局，以确保流浪者队在麦金尼斯的带领下继续保持势头。",
    "src": "Sky Sports · 2026-09-09"
  },
  "monday": {
    "en": "Paper Talk is a review of the sports headlines from the national newspapers, every Monday to Friday, live on Sky Sports News from 10.30pm.",
    "cn": "Paper Talk是每周一至周五晚上10:30在天空体育新闻直播的全国性报纸的体育头条评论。",
    "src": "Sky Sports · 2026-09-10"
  },
  "money": {
    "en": "England had been at war with France for nearly five decades, and officials needed more money to pay for the kingdom’s armies and defenses.",
    "cn": "英格兰与法国交战了近五十年，官员们需要更多的钱来支付王国的军队和国防费用。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "most": {
    "en": "Elizabeth I is one of history's most iconic monarchs, but her path to the throne was anything but secure.",
    "cn": "伊丽莎白一世是历史上最具标志性的君主之一，但她登上王位的道路却并不安全。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "morning": {
    "en": "The burglars entered Cagnes-sur-Mer’s Renoir Museum, housed in the estate where the famed Impressionist spent the last decade of his life, before sunrise this morning.",
    "cn": "在今天早晨日出之前，窃贼进入了梅尔河畔卡涅的雷诺阿博物馆，该博物馆位于著名印象派画家雷诺阿度过生命最后十年的地方。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "more": {
    "en": "These types of wingers had never really existed before, but now they were more important than anyone else.",
    "cn": "这种类型的边锋以前几乎不存在，但现在他们成了场上最重要的角色。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "mother": {
    "en": "Their mother attempted to make a ball too but quickly abandoned the task.",
    "cn": "他们的母亲也想做一个球，但很快就放弃了这项任务。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "month": {
    "en": "The 29-year-old signed a new deal until 2027 earlier this year, with Rangers retaining the option to extend that by a further 12 months.",
    "cn": "今年早些时候，这位29岁的球员与流浪者队签订了一份到2027年的新合同，流浪者队保留了再延长12个月的选择权。",
    "src": "Sky Sports · 2026-09-10"
  },
  "moon": {
    "en": "Two depict variations of clowns and skulls, while the third is a coastal landscape with a low-hanging moon and red trees beside open water.",
    "cn": "两幅描绘了小丑和头骨的变体，而第三幅是沿海景观，在开阔的水域旁边有一个低垂的月亮和红色的树木。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "medicine": {
    "en": "Speaking of bodily fluids, research on nose-blowing won the Ig Nobel Medicine Prize.",
    "cn": "说到体液，关于流鼻涕的研究获得了Ig诺贝尔医学奖。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "medical": {
    "en": "Peptides seem like they’re everywhere: on social media, on medical spa menus and beyond.",
    "cn": "多肽似乎无处不在：社交媒体、医疗水疗菜单等。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "lose": {
    "en": "Martin Zubimendi may push to leave Arsenal in January after losing his starting sport under Mikel Arteta.",
    "cn": "马丁·祖比门迪可能会在一月份离开阿森纳，因为他在阿尔特塔手下失去了首发位置。",
    "src": "Sky Sports · 2026-09-10"
  },
  "loss": {
    "en": "GLP-1 drugs, medications that are self-injected to support weight loss and lower blood sugar, helped peptides become mainstream.",
    "cn": "GLP-1药物是自我注射以支持减肥和降低血糖的药物，帮助肽成为主流。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "lot": {
    "en": "When scouting a player, there's a lot of noise behind the conversion of shots into goals and passes into goals.",
    "cn": "在球探评估球员时，射门转化为进球、传球转化为进球的过程充满干扰。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "love": {
    "en": "That's the Martin we know and we love, he's our captain.",
    "cn": "这就是我们认识和喜爱的马丁，他是我们的队长。",
    "src": "Sky Sports · 2026-09-09"
  },
  "lovely": {
    "en": "The 7/4 for him to make two or more fouls is a lovely slice of value.",
    "cn": "对于他来说，7/4的两次或两次以上的犯规是一个可爱的价值。",
    "src": "Sky Sports · 2026-09-10"
  },
  "low": {
    "en": "But Kai Havertz equalised with a low drive in the 25th minute that snuck inside Emiliano Martínez's near post.",
    "cn": "但凯·哈弗茨在第 25 分钟的一记低射，皮球从埃米利亚诺·马丁内斯的近角钻入网窝，扳平比分。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "lower": {
    "en": "GLP-1 drugs, medications that are self-injected to support weight loss and lower blood sugar, helped peptides become mainstream.",
    "cn": "GLP-1药物是自我注射以支持减肥和降低血糖的药物，帮助肽成为主流。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "luck": {
    "en": "Yes, their expected goals numbers suggest they've ridden their luck to some degree - but this has been an impressive display of defensive organisation, which isn't a new trait.",
    "cn": "是的，他们的预期进球数表明他们在某种程度上依靠了运气——但这是一个令人印象深刻的防守组织展示，这并不是一个新特点。",
    "src": "Sky Sports · 2026-09-10"
  },
  "main": {
    "en": "\"We've still got a bit to go, but we're getting results and that's the main thing.\"",
    "cn": "“我们还有一段路要走，但我们正在取得成果，这是最重要的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "mail": {
    "en": "Robert Reisz, a paleontologist at the University of Toronto who was not involved in the study, tells Ivan Semeniuk at the Globe and Mail that the study provides new insight on the dinosaurs' reproductive strategies.",
    "cn": "多伦多大学的古生物学家Robert Reisz没有参与这项研究，他告诉《环球邮报》的Ivan Semeniuk ，这项研究为恐龙的生殖策略提供了新的见解。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "machine": {
    "en": "They are a well-oiled machine without the ball.",
    "cn": "他们是一个没有球的运转良好的机器。",
    "src": "Sky Sports · 2026-09-10"
  },
  "magazine": {
    "en": "Potter tells Smithsonian magazine that this unique trait may be linked to its diet of tough shrubs and grasses.",
    "cn": "波特告诉《史密森尼》杂志，这种独特的特征可能与它以坚韧的灌木和草为食有关。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "mainland": {
    "en": "Mainland raccoons, on the other hand, typically weigh between 15 and 40 pounds.",
    "cn": "另一方面，大陆浣熊的体重通常在15到40磅之间。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "lord": {
    "en": "At the time, all property in England legally belonged to the king, who granted lesser lords the right to lease land to tenants “in return for certain services and restrictions on their freedom,” Prescott says.",
    "cn": "当时，英格兰的所有财产在法律上都属于国王，国王授予较小的领主向租户出租土地的权利，“以换取某些服务和对其自由的限制”，普雷斯科特说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "list": {
    "en": "They listed the soldier’s rank, the village they came from, their caste, any injuries, and if they died.",
    "cn": "他们列出了士兵的军衔，他们来自的村庄，他们的种姓，是否受伤，是否死亡。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "literature": {
    "en": "“ Agatha Christie: A World of Mystery,” opening next month at the British Library, in London, includes never-before-seen artifacts from the rollicking life of literature’s “Queen of Crime.”",
    "cn": "《阿加莎·克里斯蒂：神秘的世界》（Agatha Christie: A World of Mystery）将于下月在伦敦的大英图书馆（British Library）开幕，展出了这位文学“犯罪女王”欢乐生活中从未见过的文物。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "little": {
    "en": "The Latin captions above the scenes are terse, offering little more than names and places.",
    "cn": "场景上方的拉丁文字幕很简洁，除了名字和地点之外，几乎没有别的说明。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "live": {
    "en": "Tottenham transfer news, rumours and gossip: Live updates and latest on deals, signings, loans and contracts",
    "cn": "热刺转会新闻，谣言和八卦：实时更新和最新的交易，签约，贷款和合同",
    "src": "Sky Sports · 2026-09-10"
  },
  "loaf": {
    "en": "The second-smallest rock-wallaby in the world is about as long as a loaf of bread.",
    "cn": "世界上第二小的岩袋鼠只有一块面包那么长。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "loan": {
    "en": "Kendry Páez is not currently part of Chelsea 's first-team plans following the early termination of his loan spell at River Plate last month.",
    "cn": "Kendry Páez上个月在River Plate的租借期提前结束后，目前不属于切尔西的一线队计划。",
    "src": "Sky Sports · 2026-09-09"
  },
  "look": {
    "en": "Depending on where you look and when, crosses get turned into goals somewhere between 1% and 3% of the time.",
    "cn": "无论你参考哪个数据、哪段时间，传中转化为进球的比例都只有 1% 到 3%。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "long": {
    "en": "David Martindale has pledged he won't be stepping back into the Livingston dugout long-term.",
    "cn": "大卫·马丁代尔（David Martindale）承诺，他不会长期退回利文斯顿防空洞。",
    "src": "Sky Sports · 2026-09-09"
  },
  "lock": {
    "en": "The perpetrators are found out and locked away, and you've had a very enjoyable experience helping to solve the puzzles.”",
    "cn": "罪犯被发现并被关起来，你在帮助解决谜题的过程中获得了非常愉快的体验。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "location": {
    "en": "“However, within this broad distribution, the number of locations where the species has been recorded is small,” Potter tells Smithsonian magazine.",
    "cn": "“然而，在这个广泛的分布中，物种被记录的地点很少，”波特告诉史密森尼杂志。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "locate": {
    "en": "When the museum sent a printout, he located his father’s village.",
    "cn": "当博物馆寄来打印件时，他找到了父亲的村庄。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "local": {
    "en": "Researchers were curious to know how the wreckage was affecting the local marine ecosystem.",
    "cn": "研究人员想知道残骸是如何影响当地海洋生态系统的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "log": {
    "en": "Yet as O’Neil logged 64 hours of field observations, the activity transformed into a family pastime.",
    "cn": "然而，随着奥尼尔记录了64个小时的实地观察，这项活动变成了一项家庭消遣。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "maintain": {
    "en": "It was a result that maintained their perfect start to the Premier League season.",
    "cn": "这场胜利让他们继续保持本赛季英超的完美开局。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "mate": {
    "en": "Arteta also highlighted how fresh combinations with team-mates are playing a part.",
    "cn": "Arteta还强调了与队友的新组合是如何发挥作用的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "material": {
    "en": "Material culture describes physical objects and resources such as tools, clothing, toys and furniture that a group creates, uses and leaves behind to define its way of life.",
    "cn": "物质文化描述了一个群体创造、使用和留下的物理对象和资源，如工具、服装、玩具和家具，以定义其生活方式。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "mathematical": {
    "en": "Because of the longstanding interest in these equations, Navier-Stokes, officially called the Navier-Stokes existence and smoothness problem, is one of seven mathematical problems with a $1 million award offered for each solution—they’re known collectively as the Millennium Prize Problems.",
    "cn": "由于长期以来对这些方程的兴趣，纳维-斯托克斯问题，正式名称为纳维-斯托克斯存在性和平滑性问题，是七个数学问题之一，每个解决方案都有100万美元的奖金——它们被统称为千年奖问题。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "mathematics": {
    "en": "At the turn of the 21st century, the Clay Mathematics Institute decided that it would award $1 million to whoever solved it.",
    "cn": "在21世纪之交，克莱数学研究所决定给解决这个问题的人奖励100万美元。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "matter": {
    "en": "It is Atletico Madrid away next in Europe but there are bigger matters to attend to before that.",
    "cn": "接下来在欧洲的比赛是马德里竞技，但在那之前还有更重要的事情要做。",
    "src": "Sky Sports · 2026-09-08"
  },
  "mature": {
    "en": "Fewer than 200 mature individuals roam the island in the Caribbean Sea, off the east coast of the Yucatán Peninsula.",
    "cn": "不到200只成年个体在Yucatán半岛东海岸的加勒比海岛屿上游荡。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "maximum": {
    "en": "Arsenal join Manchester City as the only two sides to take maximum points from their first three league games.",
    "cn": "阿森纳与曼城成为前 3 轮 联赛仅有的两支全取 9 分的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "may": {
    "en": "Potter tells Smithsonian magazine that this unique trait may be linked to its diet of tough shrubs and grasses.",
    "cn": "波特告诉《史密森尼》杂志，这种独特的特征可能与它以坚韧的灌木和草为食有关。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "maybe": {
    "en": "One club maybe a bit further down the line than the other but I think it's something that could develop.",
    "cn": "一个俱乐部可能比另一个走得更远，但我认为这是可以发展的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "mayor": {
    "en": "Before the two abandoned paintings were recovered, the mayor’s office had valued the thieves’ haul at some $10 million, reports Agence France-Presse.",
    "cn": "据法新社报道，在这两幅被遗弃的画作被找回之前，市长办公室估计窃贼的赃款约为1000万美元。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "mean": {
    "en": "Although Johnson is a winger, technically, he's more of a wide centre-forward, meaning he just makes runs to the back post.",
    "cn": "虽然约翰逊名义上是边锋，但严格说更像是一个边路中锋，他只是不断跑向远端门柱。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "match": {
    "en": "There are two festive midweek rounds of Premier League fixtures when every match will be broadcast live on Sky Sports.",
    "cn": "英超联赛周中有两轮喜庆的比赛，每场比赛都将在天空体育进行直播。",
    "src": "Sky Sports · 2026-09-10"
  },
  "means": {
    "en": "“Their eggshells were very porous, which means if the eggs were left out in the open, they would lose water, dry out, and the embryos would die,” Zelenitsky explains to CNN.",
    "cn": "Zelenitsky向美国有线电视新闻网解释说：“它们的蛋壳非常多孔，这意味着如果卵子被放在外面，它们会失去水分，变干，胚胎就会死亡。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "meaning": {
    "en": "Although Johnson is a winger, technically, he's more of a wide centre-forward, meaning he just makes runs to the back post.",
    "cn": "虽然约翰逊名义上是边锋，但严格说更像是一个边路中锋，他只是不断跑向远端门柱。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "many": {
    "en": "Then for 20 to 25 minutes we were guilty of so many bad decisions, but we found a way to win.",
    "cn": "然后在20到25分钟的时间里，我们做出了很多糟糕的决定，但我们找到了获胜的方法。",
    "src": "Sky Sports · 2026-09-09"
  },
  "manager": {
    "en": "They have appointed a top-class manager in Xabi Alonso and recruited well with goalkeeper Martinez, defender Maxence Lacroix and forward Rogers.",
    "cn": "他们任命了哈维·阿隆索这位顶级主帅，并在门将马丁内斯、后卫拉克鲁瓦以及前锋罗杰斯的位置上引援得当。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "manage": {
    "en": "He now has four in five games this season, a stunning turnaround having only managed one in 36 last term.",
    "cn": "他现在本赛季五场比赛中有四场比赛，这是一个惊人的转机，上赛季只有36场比赛中的一场。",
    "src": "Sky Sports · 2026-09-09"
  },
  "man": {
    "en": "That weekend's Super Sunday sees Chelsea vs Newcastle at 2pm, then Man City vs Tottenham at 4.30pm.",
    "cn": "那个周末的“超级星期天”是下午2点切尔西vs纽卡斯尔，下午4点半曼城vs热刺。",
    "src": "Sky Sports · 2026-09-10"
  },
  "male": {
    "en": "In the burial mound’s deeper layers, researchers found a nearly complete adult male skeleton, fragments of two separate adult skulls, amber beads that might have been jewelry, a cutting tool made of flint and an ax of greenish serpentinite.",
    "cn": "在坟丘的深层，研究人员发现了一个几乎完整的成年男性骨骼，两个独立的成年头骨的碎片，可能是珠宝的琥珀珠，一个由燧石制成的切割工具和一把绿色蛇纹石斧头。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "make": {
    "en": "We're making good steps but we'd like to be able to win a bit more comfortably and at more ease.",
    "cn": "我们正在迈出良好的步伐，但我们希望能够更舒适、更轻松地赢得比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "majority": {
    "en": "Chelsea's majority owners, Clearlake Capital, are closing in on an agreement to buy out co-owners Todd Boehly and Mark Walter.",
    "cn": "切尔西的大股东明湖资本（Clearlake Capital）即将达成一项协议，收购共同所有者托德·伯利（Todd Boehly）和马克·沃尔特（Mark Walter）的全部股权。",
    "src": "Sky Sports · 2026-09-10"
  },
  "major": {
    "en": "Inclusion is a major focus of next year’s offerings.",
    "cn": "包容性是明年产品的主要焦点。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "march": {
    "en": "The ship, called the Po, was evacuating wounded Italian soldiers from Albania’s Vlora Bay on the night of March 14, 1941, when it was struck by a torpedo from a British Swordfish bomber.",
    "cn": "这艘名为Po的船于1941年3月14日晚上从阿尔巴尼亚的Vlora湾撤离受伤的意大利士兵，当时它被英国箭鱼轰炸机的鱼雷击中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "mass": {
    "en": "This unprecedented act of violence took place at the height of the Peasants’ Revolt, a mass uprising sparked by the imposition of a poll tax —the third of its kind in four years.",
    "cn": "这种前所未有的暴力行为发生在农民起义的高峰期，这是四年来第三次征收人头税引发的大规模起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "market": {
    "en": "The general consensus is that United's business in the transfer market has left them short, with a squad that is unable to cope with three games per week due to an over-reliance on the same names.",
    "cn": "普遍的共识是曼联在转会市场的业务使他们短缺，由于过度依赖相同的名字，球队每周无法应付三场比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "mark": {
    "en": "Chelsea's majority owners, Clearlake Capital, are closing in on an agreement to buy out co-owners Todd Boehly and Mark Walter.",
    "cn": "切尔西的大股东明湖资本（Clearlake Capital）即将达成一项协议，收购共同所有者托德·伯利（Todd Boehly）和马克·沃尔特（Mark Walter）的全部股权。",
    "src": "Sky Sports · 2026-09-10"
  },
  "marine": {
    "en": "Researchers were curious to know how the wreckage was affecting the local marine ecosystem.",
    "cn": "研究人员想知道残骸是如何影响当地海洋生态系统的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "margin": {
    "en": "The Gunners should have won by a bigger margin but missed a succession of chances before Odegaard crashed a low shot in off the post from the edge of the box following intricate build-up.",
    "cn": "枪手本应以更大的优势获胜，但错过了一系列机会，然后厄德高在错综复杂的积累后从禁区边缘击中了低射门。",
    "src": "Sky Sports · 2026-09-09"
  },
  "myself": {
    "en": "“One thing that this exhibition, myself included, is totally against is anything glorifying or glamorizing” serial killers, Bill Kimberlin, a true-crime researcher and collector, tells WGN Radio 720 ’s Wendy Snyder.",
    "cn": "连环杀手比尔·金伯利林（Bill Kimberlin）是真正的犯罪研究者和收藏家，他告诉WGN Radio 720的温迪·斯奈德（Wendy Snyder）：“这个展览，包括我自己在内，完全反对任何美化或美化”的连环杀手。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "mysterious": {
    "en": "“He said it was mysterious, just like he is,” Conti says.",
    "cn": "“他说这很神秘，就像他一样，”Conti说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "mystery": {
    "en": "“A World of Mystery” will take visitors on an immersive tour of Christie’s life, which began in 1890 in Devon, England.",
    "cn": "“神秘的世界”将带领游客沉浸在克里斯蒂的生活中，他从1890年开始在英格兰德文郡生活。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "original": {
    "en": "Its collection comprises photographs and letters, 13 original paintings, and about 40 sculptures.",
    "cn": "它的藏品包括照片和信件，13幅原画和大约40件雕塑。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "ornament": {
    "en": "“Although the string or cord connecting them has not survived, there is no doubt that this was an ornament made by human hands.”",
    "cn": "“虽然连接它们的绳子或绳索没有存活下来，但毫无疑问，这是人手制作的装饰品。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "other": {
    "en": "One club maybe a bit further down the line than the other but I think it's something that could develop.",
    "cn": "一个俱乐部可能比另一个走得更远，但我认为这是可以发展的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "otherwise": {
    "en": "Arsenal, the current Premier League champions, can currently argue otherwise and point to a run that now extends to 10 unbeaten league games against Chelsea.",
    "cn": "作为现任英超冠军，阿森纳完全有理由反驳——对切尔西的联赛不败纪录已经扩大到了 10 场。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "ounce": {
    "en": "She may have quit, in part, because she had previously consumed an ounce of a margarita, which seemed to lower her dexterity, the authors write in the paper.",
    "cn": "作者在论文中写道，她戒烟的部分原因可能是她之前喝过一盎司的玛格丽塔酒，这似乎降低了她的灵活性。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "our": {
    "en": "Would you like to receive offers from our publisher, Immediate Media, and carefully selected partners?",
    "cn": "您想收到我们的出版商、即时媒体和精心挑选的合作伙伴的报价吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "ours": {
    "en": "His, though, has been rather busier than ours.",
    "cn": "不过，他比我们更忙。",
    "src": "Sky Sports · 2026-09-09"
  },
  "ourselves": {
    "en": "\"The way we competed, attitude, courage, the way we imposed ourselves on the game, the quality we showed to break them down, which is very difficult to do.",
    "cn": "“我们的竞争方式，态度，勇气，我们在比赛中强加给自己的方式，我们展示的打破他们的质量，这是非常困难的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "over": {
    "en": "Amandeep was born and grew up in Britain in the 1970s, his parents having come over in the postwar years.",
    "cn": "阿曼迪普上世纪70年代在英国出生和长大，他的父母在战后的岁月里来到英国。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "outskirt": {
    "en": "Throughout the 1970s, Gacy—who worked as a birthday party clown alternately named Pogo and Patches— killed at least 33 teenage boys and young men after luring them to his home on the outskirts of the city, where he buried the remains of 29 of his victims in his basement’s crawl space.",
    "cn": "在整个20世纪70年代，Gacy曾担任生日派对小丑，交替命名为Pogo和Patches ，他将至少33名十几岁的男孩和年轻人引诱到他位于城市郊区的家中，在那里他将29名受害者的遗体埋葬在地下室的爬行空间中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "outside": {
    "en": "“What’s in the package may not actually be what is on the outside of the label,” Doroshow adds.",
    "cn": "Doroshow补充道：“包装中的东西实际上可能不是标签外面的东西。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "outline": {
    "en": "Just before wrapping up their work on the Roman graves, the researchers spotted the circular outline of a barrow—an ancient burial mound—Dąbrowski says in a statement from Wrocław Medical University.",
    "cn": "在结束他们对罗马坟墓的工作之前，研究人员在弗罗茨瓦夫医科大学的一份声明中发现了一个古老的坟丘Dąbrowski的圆形轮廓。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "outstanding": {
    "en": "James is outstanding in midfield, but the Chelsea captain is even better at right back, so it is likely that he will return to that position when Alonso has a full quota of midfield options.",
    "cn": "詹姆斯踢中场也很出色，但他踢右后卫更强，所以当中场人员齐整时，他很可能会回到右后卫位置。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "organize": {
    "en": "Organized by the company Improbable Research, the spoof awards were designed to “honor achievements so surprising that they make people laugh, then think,” per their website.",
    "cn": "这些欺骗性奖项由Improbable Research公司组织，旨在“表彰令人惊讶的成就，让人们发笑，然后思考”，根据他们的网站。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "only": {
    "en": "He now has four in five games this season, a stunning turnaround having only managed one in 36 last term.",
    "cn": "他现在本赛季五场比赛中有四场比赛，这是一个惊人的转机，上赛季只有36场比赛中的一场。",
    "src": "Sky Sports · 2026-09-09"
  },
  "onto": {
    "en": "Mediterranean monk seals spend most of their time in water, but they waddle onto land periodically to rest and give birth.",
    "cn": "地中海僧海豹大部分时间都在水中度过，但它们会定期徘徊在陆地上休息和分娩。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "open": {
    "en": "Holmes of The Devil in the White City infamy—anchors a new exhibition, now open in Chicago.",
    "cn": "因《白城恶魔》而臭名昭著的福尔摩斯——是芝加哥正在举办的新展览的核心人物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "opening": {
    "en": "When the 2026/27 Premier League fixture list came out, United were deemed to have had the statistically easiest opening six games.",
    "cn": "当2026/27赛季英超联赛名单公布时，曼联被认为是统计上最容易开启六场比赛的球队。",
    "src": "Sky Sports · 2026-09-09"
  },
  "operate": {
    "en": "First, they set out five cameras that operated at night, triggered by the motion of nearby animals.",
    "cn": "首先，他们设置了五台夜间运行的摄像机，由附近动物的动作触发。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "opponent": {
    "en": "Given the nature of the two opponents, you would imagine Carrick will be thinking of rotating on Thursday.",
    "cn": "鉴于两名对手的性质，你可以想象卡里克将在周四考虑轮换。",
    "src": "Sky Sports · 2026-09-09"
  },
  "opportunity": {
    "en": "Running for 10 months, the exhibition offers a once-in-a-generation opportunity for audiences to see the Tapestry in the British capital.",
    "cn": "为期10个月的展览为观众提供了一个千载难逢的机会，让他们在英国首都看到挂毯。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "opposite": {
    "en": "From the second of two subsequent corners, Muharemovic rises highest at the back post to nod the opener back inside the opposite corner.",
    "cn": "从接下来的两个角落中的第二个角落，穆哈雷莫维奇在后柱上升得最高，向对角内的揭幕战点头。",
    "src": "Sky Sports · 2026-09-09"
  },
  "ordinary": {
    "en": "I wanted him to stand for all the ordinary people who actually rose up and paid the price for it.”",
    "cn": "我希望他能代表所有真正站起来为此付出代价的普通人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "order": {
    "en": "\"When that happens, [Odegaard] needs to take different heights and angles and positions in order to disorganise the opponent and he's done that really well.\"",
    "cn": "“当这种情况发生时，[Odegaard]需要采取不同的高度、角度和姿势来扰乱对手，他做得非常好。",
    "src": "Sky Sports · 2026-09-09"
  },
  "orange": {
    "en": "In 1907, he and his wife, Aline, purchased and developed a hilltop estate in Cagnes-sur-Mer dotted with olive, orange and fig trees.",
    "cn": "1907年，他和妻子艾琳（Aline）在滨海卡涅（Cagnes-sur-Mer）购买并开发了一处山顶地产，其间点缀着橄榄树、橘子树和无花果树。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "option": {
    "en": "James is outstanding in midfield, but the Chelsea captain is even better at right back, so it is likely that he will return to that position when Alonso has a full quota of midfield options.",
    "cn": "詹姆斯踢中场也很出色，但他踢右后卫更强，所以当中场人员齐整时，他很可能会回到右后卫位置。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "pint": {
    "en": "These pint-size, critically endangered mammals—which reside only in Cozumel—are known for sifting through trash cans to scavenge for leftovers.",
    "cn": "这些只生活在科苏梅尔的极度濒危的小型哺乳动物以在垃圾桶里搜寻剩饭剩菜而闻名。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "pioneer": {
    "en": "The pioneer raccoon’s sister was the first to learn the procedure and make her own balls.",
    "cn": "这只浣熊的妹妹是第一个学习这个过程并自己做球的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "pitch": {
    "en": "He also ended the game having had more touches, made more passes and created more chances than anyone else on the pitch.",
    "cn": "他还在比赛结束时获得了更多的接触，获得了更多的传球，并创造了比球场上任何其他人更多的机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "place": {
    "en": "Gary Neville has criticised Chelsea for being \"all over the place\" defensively in the 2-1 defeat to Arsenal.",
    "cn": "加里·内维尔批评切尔西在 1-2 输给阿森纳的比赛中防守端「乱成一团」。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "plan": {
    "en": "Chelsea's plan was to replace Enzo with Monaco's Lamine Camara, but a deal for the Senegal international collapsed late on deadline day.",
    "cn": "切尔西原本计划用摩纳哥的卡马拉替代恩佐，但这位塞内加尔国脚的交易在转会截止日临近时告吹。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "please": {
    "en": "\"I couldn't be more pleased with my players for their perseverance and sheer will to keep going.",
    "cn": "“我对我的球员的毅力和继续前进的纯粹意愿感到非常满意。",
    "src": "Sky Sports · 2026-09-09"
  },
  "player": {
    "en": "Among players with at least 900 minutes of game time, 53 different Premier League players got there last year.",
    "cn": "而在出场 900 分钟以上的球员中，去年有 53 名英超球员达到了这一数字。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "play": {
    "en": "Chelsea play Leeds in the EFL Cup third round on Wednesday before hosting Hull in the league next weekend.",
    "cn": "切尔西将在周三的英联杯中迎战利兹，随后下周末在联赛主场对阵赫尔城。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "plant": {
    "en": "“That titanosaurs laid eggs at such high latitudes is inherently interesting, especially since the evidence points to mound incubation by plant decay as the main source of heat for these animals,” he says.",
    "cn": "他说：“泰坦龙在如此高的纬度下产卵本身就很有趣，特别是因为有证据表明，植物腐烂造成的土丘孵化是这些动物的主要热源。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "platform": {
    "en": "This kind of “do your own research” theory of medicine is hardly new, but today, there’s more of a platform than ever to cultivate this demand and serve it at scale.",
    "cn": "这种“自己做研究”的医学理论并不是什么新鲜事，但今天，培养这种需求并大规模服务的平台比以往任何时候都多。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "phone": {
    "en": "“My jaw hit the floor when I got the phone call” about the award, Matilda Brindle, an evolutionary biologist at the University of Oxford in England who worked on the research, tells Nature ’s Chris Simms.",
    "cn": "英国牛津大学的进化生物学家玛蒂尔达·布林德尔（Matilda Brindle）告诉《自然》杂志的克里斯·西姆斯（Chris Simms），“当我接到关于该奖项的电话时，我的下巴掉在地板上”。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "phenomenon": {
    "en": "Experts say the peptide craze is part of a broader phenomenon, as patients look beyond the regulated health system to address problems that doctors have struggled to treat",
    "cn": "专家表示，多肽热是一种更广泛现象的一部分，因为患者将目光投向了受监管的卫生系统之外，以解决医生难以治疗的问题",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "phase": {
    "en": "Tickets are being released in phases, with the next batch available to book from 21 October 2026.",
    "cn": "门票将分阶段发售，下一批门票将于2026年10月21日开始接受预订。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "photograph": {
    "en": "Its collection comprises photographs and letters, 13 original paintings, and about 40 sculptures.",
    "cn": "它的藏品包括照片和信件，13幅原画和大约40件雕塑。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "owner": {
    "en": "Leicester City are heading towards financial 'Armageddon' without fresh capital and improved results, says their prospective new owner Talksport",
    "cn": "莱斯特城未来的新东家Talksport表示，在没有新资本和改善业绩的情况下，莱斯特城正走向财务“末日”",
    "src": "Sky Sports · 2026-09-10"
  },
  "own": {
    "en": "But it previously did seem like teams had begun to realise that dribbling skill isn't worth much on its own.",
    "cn": "但以前，球队确实开始意识到，单靠过人技巧本身价值有限。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "physical": {
    "en": "Material culture describes physical objects and resources such as tools, clothing, toys and furniture that a group creates, uses and leaves behind to define its way of life.",
    "cn": "物质文化描述了一个群体创造、使用和留下的物理对象和资源，如工具、服装、玩具和家具，以定义其生活方式。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "piece": {
    "en": "Arsenal's set-piece prowess is well documented, to the extent that they have been criticised for an over-reliance on dead-ball situations to win tight games.",
    "cn": "阿森纳的定位球能力人尽皆知，甚至有人批评他们过分依赖定位球来赢下胶着比赛。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "picture": {
    "en": "Teenagers and retirees alike broadcast before-and-after pictures and trade their “ stacks,” or custom combinations of peptides, like recipes.",
    "cn": "青少年和退休人员都会播放之前和之后的图片，并交换他们的“堆栈”，或肽的定制组合，如食谱。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "pick": {
    "en": "\"We recognise Celtic are a good team who have been the main title winners and the team that's picked up more trophies than any other club in recent years.",
    "cn": "“我们认识到凯尔特人是一支优秀的球队，他们是主要的冠军得主，也是近年来获得奖杯最多的球队。",
    "src": "Sky Sports · 2026-09-10"
  },
  "physician": {
    "en": "According to a recent survey of over 500 physicians, nearly half said a patient had disclosed using an experimental peptide in the past year.",
    "cn": "根据最近对500多名医生的调查，近一半的患者表示在过去一年中曾使用实验肽进行披露。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "one": {
    "en": "Elizabeth I is one of history's most iconic monarchs, but her path to the throne was anything but secure.",
    "cn": "伊丽莎白一世是历史上最具标志性的君主之一，但她登上王位的道路却并不安全。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "nest": {
    "en": "“They clearly spent time in higher latitude areas, but until now it wasn’t known whether they were also nesting there.”",
    "cn": "“他们显然在高纬度地区度过了一段时间，但直到现在还不知道他们是否也在那里筑巢。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "net": {
    "en": "Excluding penalties, he has found the back of the net 11 times for Everton over that stretch.",
    "cn": "扣除点球，他在埃弗顿这段时间的英超进球只有 11 个。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "never": {
    "en": "\"Last year, to have two shoulder injuries like he did, then a MCL injury he did, it's never easy.",
    "cn": "“去年，像他一样有两个肩膀受伤，然后是他的MCL受伤，这从来都不容易。",
    "src": "Sky Sports · 2026-09-09"
  },
  "new": {
    "en": "Every Premier League club has been given at least 60 hours between their Christmas and New Year fixtures.",
    "cn": "每家英超俱乐部在圣诞和新年赛程之间至少有60个小时的休息时间。",
    "src": "Sky Sports · 2026-09-10"
  },
  "news": {
    "en": "Follow Sky Sports on WhatsApp for the latest sports news, videos, features, analysis and much more",
    "cn": "在WhatsApp上关注天空体育，获取最新的体育新闻、视频、功能、分析等",
    "src": "Sky Sports · 2026-09-10"
  },
  "next": {
    "en": "Maybe Chelsea will need to actually recruit more players as they move on through the next year or two with Alonso.",
    "cn": "也许切尔西真的需要在阿隆索麾下继续前行的一两年里，再引进更多球员。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "noise": {
    "en": "When scouting a player, there's a lot of noise behind the conversion of shots into goals and passes into goals.",
    "cn": "在球探评估球员时，射门转化为进球、传球转化为进球的过程充满干扰。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "nod": {
    "en": "It was still uncertain that Chelsea had finally sealed their progress when Valentin Barco blasted them 5-3 up from close range from another Rogers assist, but they could finally rest easy in added time - and extinguish Leeds' commendable never-say-die attitude - when Welbeck nodded Barco's wildly mishit effort beyond Zetterer.",
    "cn": "当瓦伦丁·巴科（Valentin Barco）从另一位罗杰斯（Rogers）助手的近距离以5比3击败他们时，切尔西最终是否已经封锁了他们的进步仍不确定，但当韦尔贝克（Welbeck）点头点头时，他们终于可以在额外的时间内轻松休息，并消除利兹（Leeds）值得称赞的永不言败的态度。",
    "src": "Sky Sports · 2026-09-09"
  },
  "nobody": {
    "en": "\"Nobody was asking for it, all of a sudden their players came into the game.",
    "cn": "“没有人要求它，突然他们的球员进入了比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "noble": {
    "en": "Then Edward dies, and Harold is declared king by the English nobles.",
    "cn": "后来爱德华去世，哈罗德被英国贵族宣布为国王。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "ninth": {
    "en": "Take a deeper look into specialist positions and you find they are ninth in right-back depth and 18th at left-back, a position that is constantly being discussed due to Luke Shaw's injury history.",
    "cn": "深入研究专家位置，您会发现他们在右后卫深度排名第九，在左后卫排名第18 ，由于Luke Shaw的伤病史，这一位置不断被讨论。",
    "src": "Sky Sports · 2026-09-09"
  },
  "nine": {
    "en": "Pygmy raccoons, also called Cozumel raccoons, weigh between six and nine pounds, around the same as a newborn human baby.",
    "cn": "侏儒浣熊，也叫科苏梅尔浣熊，体重在6到9磅之间，和一个新生的人类婴儿差不多。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "night": {
    "en": "They were required to be painted white with green bands and red crosses and illuminated at night.",
    "cn": "他们被要求被漆成白色，带有绿色条带和红色十字架，并在夜间照明。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "nitrogen": {
    "en": "They’ll also analyze genetic material in the skulls and teeth to determine genders and species, and attempt to discern the teeth owners’ diets through analysis of wear patterns and levels of strontium, carbon and nitrogen isotopes in the enamel.",
    "cn": "他们还将分析头骨和牙齿中的遗传物质，以确定性别和物种，并试图通过分析牙釉质中的磨损模式和锶、碳和氮同位素水平来辨别牙齿主人的饮食。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "name": {
    "en": "Instead, he wanted to focus on “someone history never named at all: a farmer, the first man to raise his hand in Essex.",
    "cn": "相反，他想专注于“一个从未命名过的历史人物：一个农民，第一个在埃塞克斯举手的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "nation": {
    "en": "There's managing at the World Cup, then there's managing at a home World Cup for a nation whose President rather enjoys the spotlight.",
    "cn": "在世界杯上进行管理，然后在一个主场世界杯上为一个总统更喜欢聚光灯的国家进行管理。",
    "src": "Sky Sports · 2026-09-09"
  },
  "national": {
    "en": "The necklace is a unique archaeological find, Gralak tells National Geographic Poland ’s Joanna Lamparska.",
    "cn": "Gralak告诉国家地理波兰的Joanna Lamparska ，这条项链是一个独特的考古发现。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "natural": {
    "en": "This finding suggests that the marine mammals may be seeking refuge on artificial reefs like the Po as their natural habitat is increasingly threatened by human activities.",
    "cn": "这一发现表明，海洋哺乳动物可能正在Po等人工珊瑚礁上寻求庇护，因为它们的自然栖息地越来越受到人类活动的威胁。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "nature": {
    "en": "The population is gradually growing, but the species is still considered vulnerable by the International Union for Conservation of Nature and endangered under the Endangered Species Act.",
    "cn": "人口正在逐渐增长，但该物种仍被国际自然保护联盟视为脆弱物种，并根据《濒危物种法》濒临灭绝。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "need": {
    "en": "Maybe Chelsea will need to actually recruit more players as they move on through the next year or two with Alonso.",
    "cn": "也许切尔西真的需要在阿隆索麾下继续前行的一两年里，再引进更多球员。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "necklace": {
    "en": "The necklace is a unique archaeological find, Gralak tells National Geographic Poland ’s Joanna Lamparska.",
    "cn": "Gralak告诉国家地理波兰的Joanna Lamparska ，这条项链是一个独特的考古发现。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "neck": {
    "en": "Titanosaurs belonged to a group of long-necked and four-legged dinosaurs called sauropods.",
    "cn": "泰坦龙属于一群长颈和四条腿的恐龙，称为蜥脚类恐龙。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "nearly": {
    "en": "They had been there largely undisturbed for nearly 100 years, until Amandeep Madra contacted them.",
    "cn": "在Amandeep Madra联系他们之前，他们在那里生活了将近100年。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "nearby": {
    "en": "Other researchers, working around the same time in the nearby village of Iwiny, separately unearthed a high-status funerary site filled with beads, axes and flint tools.",
    "cn": "其他研究人员大约在同一时间在附近的Iwiny村工作，分别发掘了一个高地位的葬礼遗址，里面装满了珠子、斧头和燧石工具。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "near": {
    "en": "The grave was discovered at an archaeological site near Żórawina, in southern Poland.",
    "cn": "这座坟墓是在波兰南部Żórawina附近的一个考古遗址发现的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "normally": {
    "en": "The embroidery is normally housed at the Bayeux Tapestry Museum in Normandy, but a historic agreement was reached with the French government for the artefact to be loaned to the UK while its home museum undergoes renovation.",
    "cn": "这幅刺绣作品通常存放在诺曼底的贝叶挂毯博物馆，但与法国政府达成了一项历史性协议，在其本国博物馆进行翻修时，这幅艺术品将被借给英国。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "obvious": {
    "en": "They will almost certainly sign another midfielder when the window reopens in January, but until then, Alonso has to get his midfield working despite not having an obvious answer to the problem.",
    "cn": "他们几乎肯定会在 1 月转会窗重新开启时再签一名中场，但在那之前，阿隆索必须找到一个解决方案，让中场运转起来。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "obviously": {
    "en": "\"We've got our part to play in that and I felt that if we can capitalise on good play and good opportunities, which we didn't do last night and we didn't do against Motherwell (also won 1-0) obviously, if we can get ourselves in front, give the crowd something to get behind, then I think the strength of our club can be shown.",
    "cn": "“我们已经做好了自己的工作，我觉得如果我们能利用好比赛和机会，这是我们昨晚没有做到的，我们在对阵马瑟韦尔的比赛中也没有做到（我们也以1比0获胜），如果我们能领先，给观众一些支持，那么我认为我们俱乐部的实力可以展示出来。",
    "src": "Sky Sports · 2026-09-10"
  },
  "occasion": {
    "en": "The scale of the embroidery suggests that it was designed for a large audience, but the lighting in medieval buildings would have been dim, and the Tapestry may have been displayed only on special occasions, as was recorded in the 1476 inventory.",
    "cn": "刺绣的规模表明，它是为大量观众设计的，但中世纪建筑的照明可能会很昏暗，而且挂毯可能只在特殊场合展示，正如1476年库存中所记录的那样。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "occasional": {
    "en": "“The structure may provide an occasional nursery area for coastal fish, support cephalopod reproduction and function as a temporary resting site for severely endangered marine mammals,” the researchers write in the paper.",
    "cn": "研究人员在论文中写道：“该结构可能为沿海鱼类提供偶尔的育苗区，支持头足类繁殖，并作为严重濒危海洋哺乳动物的临时休息场所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "ocean": {
    "en": "An estimated 444 to 600 mature Mediterranean monk seals remain in the Mediterranean Sea and small areas of the Atlantic Ocean near northwest Africa.",
    "cn": "估计有444至600只成熟的地中海僧海豹留在地中海和非洲西北部附近的大西洋小区域。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "october": {
    "en": "Broadcast selections for November and early December will be announced before October 19.",
    "cn": "11月和12月初的选播名单将在19日之前公布。",
    "src": "Sky Sports · 2026-09-10"
  },
  "odd": {
    "en": "It's a fascinating match-up and the way the market is predicting attack to outgun defence with the expected goals line almost at 3.25 based on the odds I'd be wanting to row against that at the prices and give Hull more a chance than the 11/1 away win suggests.",
    "cn": "这是一场令人着迷的比赛，市场预测进攻比防守多，预期进球数几乎是3.25，基于赔率，我想以价格来反对，给赫尔城更多的机会，而不是11/1的客场胜利。",
    "src": "Sky Sports · 2026-09-10"
  },
  "old": {
    "en": "Derek McInnes wants Rangers to \"bring the crowd with us\" in Sunday's Old Firm clash at Ibrox.",
    "cn": "德里克·麦金尼斯希望流浪者队在周日在伊布罗克斯与老公司的比赛中“把观众带到我们身边”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "oil": {
    "en": "They are a well-oiled machine without the ball.",
    "cn": "他们是一个没有球的运转良好的机器。",
    "src": "Sky Sports · 2026-09-10"
  },
  "often": {
    "en": "In the animal world, researchers often focus on tool use for a practical purpose, study co-author Nessie O’Neil, a biologist at Miami University in Ohio, writes on her blog.",
    "cn": "研究报告的合著者、俄亥俄州迈阿密大学的生物学家尼西·奥尼尔在她的博客上写道，在动物世界，研究人员经常把重点放在实用的工具使用上。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "observe": {
    "en": "In total, the researchers observed 151 species, ranging from common fish to invertebrates and mammals.",
    "cn": "研究人员总共观察了151种物种，从普通鱼类到无脊椎动物和哺乳动物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "official": {
    "en": "England had been at war with France for nearly five decades, and officials needed more money to pay for the kingdom’s armies and defenses.",
    "cn": "英格兰与法国交战了近五十年，官员们需要更多的钱来支付王国的军队和国防费用。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "offer": {
    "en": "Running for 10 months, the exhibition offers a once-in-a-generation opportunity for audiences to see the Tapestry in the British capital.",
    "cn": "为期10个月的展览为观众提供了一个千载难逢的机会，让他们在英国首都看到挂毯。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "observation": {
    "en": "Yet as O’Neil logged 64 hours of field observations, the activity transformed into a family pastime.",
    "cn": "然而，随着奥尼尔记录了64个小时的实地观察，这项活动变成了一项家庭消遣。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "november": {
    "en": "Broadcast selections for November and early December will be announced before October 19.",
    "cn": "11月和12月初的选播名单将在19日之前公布。",
    "src": "Sky Sports · 2026-09-10"
  },
  "novel": {
    "en": "Running mostly from left to right, it tells the story in the style of a graphic novel across a central frieze, with short Latin captions.",
    "cn": "它主要从左到右，用图画小说的风格在中间的楣边讲述故事，配上简短的拉丁文字说明。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "notice": {
    "en": "Sky Sports will show 29 matches between December 26 and January 7; The Premier League announced the festive fixtures early as it \"gives supporters more than three months' notice to plan and make travel arrangements\"",
    "cn": "天空体育将在12月26日至1月7日期间播出29场比赛；英超提前公布了节日赛程，因为它“给了球迷三个多月的时间来计划和安排旅行”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "nothing": {
    "en": "His team would feed him the ball, he'd keep beating his man, and then the cross would inevitably lead to nothing.",
    "cn": "队友不断给他喂球，他一次次过掉对手，最后这脚传中却总是毫无结果。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "now": {
    "en": "“They clearly spent time in higher latitude areas, but until now it wasn’t known whether they were also nesting there.”",
    "cn": "“他们显然在高纬度地区度过了一段时间，但直到现在还不知道他们是否也在那里筑巢。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "notebook": {
    "en": "A notebook from Arthur Conan Doyle detailing Detective Sherlock Holmes ’ mystery-solving methods, as well as crime writer Dorothy L.",
    "cn": "阿瑟·柯南·道尔的一本笔记本详细描述了侦探夏洛克·福尔摩斯的破案方法，以及犯罪作家多萝西·L。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "not": {
    "en": "Souttar was left out of the club's pre-season trip to Spain and has not featured under new boss McInnes.",
    "cn": "苏塔没有参加俱乐部季前赛的西班牙之旅，也没有在新主帅麦金尼斯的带领下出场。",
    "src": "Sky Sports · 2026-09-10"
  },
  "nose": {
    "en": "Speaking of bodily fluids, research on nose-blowing won the Ig Nobel Medicine Prize.",
    "cn": "说到体液，关于流鼻涕的研究获得了Ig诺贝尔医学奖。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "northwest": {
    "en": "An estimated 444 to 600 mature Mediterranean monk seals remain in the Mediterranean Sea and small areas of the Atlantic Ocean near northwest Africa.",
    "cn": "估计有444至600只成熟的地中海僧海豹留在地中海和非洲西北部附近的大西洋小区域。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "northern": {
    "en": "On paper, the nabarlek’s range includes parts of northern and northwestern Australia.",
    "cn": "理论上，纳巴莱克的活动范围包括澳大利亚北部和西北部的部分地区。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "north": {
    "en": "For Fernandes, it was his conversations with head coach Roberto De Zerbi which persuaded him the north London project was for him.",
    "cn": "对于费尔南德斯来说，是他和主教练罗伯托·德泽比的谈话说服了他北伦敦的计划是适合他的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "note": {
    "en": "Study co-author Michelle Szydlowski, an anthrozoologist at Miami University, notes that the ball-building behavior makes sense with raccoon biology.",
    "cn": "该研究的合著者、迈阿密大学的人类动物学家米歇尔·希德洛夫斯基（Michelle Szydlowski）指出，浣熊造球的行为在生物学上是有道理的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "once": {
    "en": "But Martinez and Lacroix both had an off day at the Emirates as Chelsea's defensive frailties once again highlighted their big weakness.",
    "cn": "但马丁内斯和拉克鲁瓦在酋长球场双双不在状态，切尔西防线的问题再次暴露无遗。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "nowadays": {
    "en": "There are so many links between these two sides nowadays.",
    "cn": "如今这两支球队之间的关联已经多到数不清。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "object": {
    "en": "Today, the museum displays original furniture and objects that belonged to the Impressionist, including his easel and wheelchair.",
    "cn": "今天，博物馆展示了属于印象派的原始家具和物品，包括他的画架和轮椅。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "nowhere": {
    "en": "“Nowhere in the world are you going to see an exhibit like this with artifacts from so many serial killers under one roof.”",
    "cn": "“世界上没有任何地方会在一个屋檐下看到这样的展览，里面有这么多连环杀手的文物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "nursery": {
    "en": "“The structure may provide an occasional nursery area for coastal fish, support cephalopod reproduction and function as a temporary resting site for severely endangered marine mammals,” the researchers write in the paper.",
    "cn": "研究人员在论文中写道：“该结构可能为沿海鱼类提供偶尔的育苗区，支持头足类繁殖，并作为严重濒危海洋哺乳动物的临时休息场所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "number": {
    "en": "“However, within this broad distribution, the number of locations where the species has been recorded is small,” Potter tells Smithsonian magazine.",
    "cn": "“然而，在这个广泛的分布中，物种被记录的地点很少，”波特告诉史密森尼杂志。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "trip": {
    "en": "Souttar was left out of the club's pre-season trip to Spain and has not featured under new boss McInnes.",
    "cn": "苏塔没有参加俱乐部季前赛的西班牙之旅，也没有在新主帅麦金尼斯的带领下出场。",
    "src": "Sky Sports · 2026-09-10"
  },
  "troop": {
    "en": "A sculpture of a Girl Scout and a small exhibit, installed at Muskogee’s Three Rivers Museum, commemorate the troop and the tradition’s humble beginnings.",
    "cn": "在马斯科吉的三河博物馆（Three Rivers Museum），有一座女童子军的雕塑和一个小型展览，纪念这支部队和这一传统的卑微起源。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "true": {
    "en": "Spanning a massive, 21,000-square-foot space, “ Serial Killer: The Exhibition ” brings together more than 2,000 items that confront myth with true crime’s gruesome reality.",
    "cn": "“连环杀手：展览”占地21,000平方英尺，汇集了2,000多件物品，将神话与真实犯罪的可怕现实相结合。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tuesday": {
    "en": "The first takes place between Tuesday December 29 and Wednesday December 30.",
    "cn": "第一次是在12月29日星期二到12月30日星期三之间。",
    "src": "Sky Sports · 2026-09-10"
  },
  "try": {
    "en": "\"There's been a lot of frustration over a period of time at the club and it's up to us to try and show that we're going to deliver something a bit different.",
    "cn": "“一段时间以来，俱乐部经历了很多挫折，这取决于我们的努力，并表明我们将提供一些不同的东西。",
    "src": "Sky Sports · 2026-09-10"
  },
  "trust": {
    "en": "Working with the University of Greenwich in the UK, it took Amandeep some years to gain their trust, permission and pull the money together in order for the museum to eventually photograph every single one of the 26,000 pages.",
    "cn": "阿曼迪普与英国格林威治大学（University of Greenwich）合作，花了数年时间才获得他们的信任、许可，并筹集了资金，最终博物馆才能拍摄2.6万页的每一页。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "tree": {
    "en": "Two depict variations of clowns and skulls, while the third is a coastal landscape with a low-hanging moon and red trees beside open water.",
    "cn": "两幅描绘了小丑和头骨的变体，而第三幅是沿海景观，在开阔的水域旁边有一个低垂的月亮和红色的树木。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "treatment": {
    "en": "“We’re seeing a new rival or parallel health system emerge,” says Daniel Carpenter, chair of the government department at Harvard University and an expert in FDA regulation, “built on self-diagnosis and easy access to a wide range of treatments.”",
    "cn": "哈佛大学政府部门主席、FDA监管专家丹尼尔·卡彭特（Daniel Carpenter）说：“我们正在看到一个新的竞争对手或平行的卫生系统出现，它建立在自我诊断和容易获得各种治疗的基础上。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "trade": {
    "en": "Teenagers and retirees alike broadcast before-and-after pictures and trade their “ stacks,” or custom combinations of peptides, like recipes.",
    "cn": "青少年和退休人员都会播放之前和之后的图片，并交换他们的“堆栈”，或肽的定制组合，如食谱。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tradition": {
    "en": "A sculpture of a Girl Scout and a small exhibit, installed at Muskogee’s Three Rivers Museum, commemorate the troop and the tradition’s humble beginnings.",
    "cn": "在马斯科吉的三河博物馆（Three Rivers Museum），有一座女童子军的雕塑和一个小型展览，纪念这支部队和这一传统的卑微起源。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "train": {
    "en": "The novelist was describing an eventful trip on the luxurious Orient Express, the 20th-century passenger train that ran between Paris and Istanbul.",
    "cn": "这位小说家正在描述乘坐豪华的东方快车（Orient Express）的一次多事之旅，这列火车是20世纪在巴黎和伊斯坦布尔之间行驶的客运列车。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "transfer": {
    "en": "Crystal Palace transfers, latest news, rumours and gossip: Live updates, goals and highlights",
    "cn": "水晶宫转会，最新消息，谣言和八卦：实时更新，进球和亮点",
    "src": "Sky Sports · 2026-09-10"
  },
  "transform": {
    "en": "The findings suggest that the Po has transformed into an artificial reef, providing habitat and shelter for a diverse range of marine life.",
    "cn": "研究结果表明，Po已经变成了一个人工珊瑚礁，为各种海洋生物提供了栖息地和庇护所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "transformation": {
    "en": "Experts say the peptide boom offers a window into a larger transformation in American health care: a shift from a market driven by diagnoses to one driven by demand, in which medicine is increasingly viewed as a consumer good—an Amazon-like product delivered to your doorstep.",
    "cn": "专家表示，多肽繁荣为美国医疗保健行业的更大转型提供了一个窗口：从由诊断驱动的市场转向由需求驱动的市场，在这个市场中，医药越来越被视为一种消费品--一种类似亚马逊的产品，送货上门。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "treat": {
    "en": "The first one was insulin: In the 1920s, scientists isolated the peptide from animal pancreases and began using it to treat Type 1 diabetes.",
    "cn": "第一种是胰岛素：20世纪20年代，科学家从动物胰腺中分离出这种肽，并开始将其用于治疗1型糖尿病。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "treasure": {
    "en": "One of the medieval world’s greatest surviving treasures is now on display in London.",
    "cn": "中世纪世界现存最伟大的宝藏之一现在正在伦敦展出。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "travel": {
    "en": "Sky Sports will show 29 matches between December 26 and January 7; The Premier League announced the festive fixtures early as it \"gives supporters more than three months' notice to plan and make travel arrangements\"",
    "cn": "天空体育将在12月26日至1月7日期间播出29场比赛；英超提前公布了节日赛程，因为它“给了球迷三个多月的时间来计划和安排旅行”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "translation": {
    "en": "Although Robert Ressler, an FBI investigator, is largely credited with having coined the term \"serial killer,\" Ernst Gennat of the Berlin Criminal Police used the German translation, \" serienm&ouml;rder,\" in a 1930 article.",
    "cn": "尽管联邦调查局调查员罗伯特·雷斯勒（Robert Ressler）在很大程度上创造了“连环杀手”一词，但柏林刑事警察局的恩斯特·根纳特（Ernst Gennat）在1930年的一篇文章中使用了德语翻译“serienmörder”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "translate": {
    "en": "He talks about the importance of the smallest details, the difficulty of getting every decision right and the challenge of translating his ideas to a group of players who spend far less time together than a club side.",
    "cn": "他谈到了最小细节的重要性，做出正确决定的难度，以及将他的想法转化为一群在一起的时间远远少于俱乐部球员的球员所面临的挑战。",
    "src": "Sky Sports · 2026-09-09"
  },
  "transport": {
    "en": "In the final section, visitors will be transported to London’s 1950s West End and examine how the novelist adapted her stories for the stage.",
    "cn": "在展览的最后一部分，参观者将被带到20世纪50年代的伦敦西区，并研究这位小说家是如何将她的故事改编成舞台的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "turbulent": {
    "en": "In this first episode of our four-part Sunday Series on the 16th-century royal, Rachel Dinning is joined by historian Nicola Tallis to explore Elizabeth’s turbulent early years – from the execution of her mother, Anne Boleyn, to the political and personal dangers she faced as she navigated childhood, illegitimacy, and the treacherous Tudor succession.",
    "cn": "在我们关于16世纪王室的四集周日系列节目的第一集中，雷切尔·丁宁和历史学家尼古拉·塔利斯一起探索了伊丽莎白动荡的早年——从她母亲安妮·博林的处决，到她在童年时期面临的政治和个人危险，私生子，以及都铎王朝的危险继承。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "turn": {
    "en": "Depending on where you look and when, crosses get turned into goals somewhere between 1% and 3% of the time.",
    "cn": "无论你参考哪个数据、哪段时间，传中转化为进球的比例都只有 1% 到 3%。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "understand": {
    "en": "Alongside the Tapestry itself, visitors can explore a range of digital elements designed to enhance understanding and engagement.",
    "cn": "除了挂毯本身，游客还可以探索一系列旨在增强理解和参与的数字元素。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "understanding": {
    "en": "Alongside the Tapestry itself, visitors can explore a range of digital elements designed to enhance understanding and engagement.",
    "cn": "除了挂毯本身，游客还可以探索一系列旨在增强理解和参与的数字元素。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "undertaking": {
    "en": "Winning work highlighted during the 36th annual award ceremony included hilarious research on the aerodynamics of nose blowing, gently stepping on venomous snakes, confirming that teenagers do indeed smell worse than babies and other side-splitting scientific undertakings.",
    "cn": "第36届年度颁奖典礼上突出的获奖作品包括关于吹鼻子的空气动力学的热闹研究，轻轻踩在毒蛇身上，证实青少年确实比婴儿更难闻，以及其他侧面分裂的科学事业。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "unfair": {
    "en": "Paul Greengrass’ new film stars Andrew Garfield as a fictionalized, unnamed farmer who leads a rebellion against unfair taxes and the system of serfdom",
    "cn": "保罗·格林格拉斯（Paul Greengrass）的新电影明星安德鲁·加菲尔德（Andrew Garfield）是一个虚构的、未透露姓名的农民，他领导了一场反对不公平税收和农奴制度的叛乱",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "unit": {
    "en": "According to Transfermarkt, United actually have the second biggest squad in the Premier League.",
    "cn": "根据Transfermarkt的说法，曼联实际上拥有英超联赛中第二大阵容。",
    "src": "Sky Sports · 2026-09-09"
  },
  "unite": {
    "en": "According to Transfermarkt, United actually have the second biggest squad in the Premier League.",
    "cn": "根据Transfermarkt的说法，曼联实际上拥有英超联赛中第二大阵容。",
    "src": "Sky Sports · 2026-09-09"
  },
  "unlikely": {
    "en": "It is unlikely to be displayed the way it was in Bayeux again.",
    "cn": "它不太可能像在巴叶那样再次被展示。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "university": {
    "en": "“These questions are lighthouses,” Terence Tao, a mathematician at the University of California, Los Angeles, tells the New York Times ’ Cade Metz.",
    "cn": "“这些问题是灯塔，”加州大学洛杉矶分校的数学家特伦斯·陶告诉《纽约时报》的凯德·梅斯。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "turning": {
    "en": "A strong stop from the Saints goalkeeper, turning the ball past as Celtic push for an early opener.",
    "cn": "圣徒守门员强有力的一站，在凯尔特人推动早期揭幕战时，将球转过身去。",
    "src": "Sky Sports · 2026-09-09"
  },
  "twenty": {
    "en": "Twenty-six years later, a solution may have finally come to light—but it wasn’t a mathematician who came up with it.",
    "cn": "26年后，一个解决方案可能终于浮出水面——但提出它的不是数学家。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "twice": {
    "en": "Mike Penders is called into action twice in a matter of seconds to deny Muharemovic and Aaronson with a superb double save.",
    "cn": "Mike Penders在几秒钟内两次被要求采取行动，以拒绝Muharemovic和Aaronson的精彩双扑救。",
    "src": "Sky Sports · 2026-09-09"
  },
  "twist": {
    "en": "He twists and turns on the edge of the box before his effort is palmed away.",
    "cn": "他扭动着盒子的边缘，然后他的努力就消失了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "two": {
    "en": "Arsenal join Manchester City as the only two sides to take maximum points from their first three league games.",
    "cn": "阿森纳与曼城成为前 3 轮 联赛仅有的两支全取 9 分的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "type": {
    "en": "The first one was insulin: In the 1920s, scientists isolated the peptide from animal pancreases and began using it to treat Type 1 diabetes.",
    "cn": "第一种是胰岛素：20世纪20年代，科学家从动物胰腺中分离出这种肽，并开始将其用于治疗1型糖尿病。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "undergo": {
    "en": "Rangers summer signing Daisuke Yokota - who was ruled out of the St Mirren game through injury - is also set to undergo surgery and the Japanese winger is also facing a lengthy period out.",
    "cn": "流浪者队夏季签约横田大辅-因受伤被排除在圣米伦比赛之外-也将接受手术，这位日本边锋也面临着漫长的时期。",
    "src": "Sky Sports · 2026-09-09"
  },
  "under": {
    "en": "During World War II, h ospital ships were protected under international humanitarian law.",
    "cn": "在第二次世界大战期间，战舰受到国际人道主义法的保护。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "uncover": {
    "en": "Together, they uncover how these formative experiences helped shape the woman who would become a formidable queen.",
    "cn": "他们一起揭示了这些形成性的经历如何帮助塑造了这位将成为令人敬畏的女王的女人。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "uncle": {
    "en": "There he found the name of his great uncle, Bishen Singh, son of Jatti.",
    "cn": "在那里，他找到了他的叔祖父，贾蒂的儿子毕申·辛格的名字。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "uncertain": {
    "en": "It was still uncertain that Chelsea had finally sealed their progress when Valentin Barco blasted them 5-3 up from close range from another Rogers assist, but they could finally rest easy in added time - and extinguish Leeds' commendable never-say-die attitude - when Welbeck nodded Barco's wildly mishit effort beyond Zetterer.",
    "cn": "当瓦伦丁·巴科（Valentin Barco）从另一位罗杰斯（Rogers）助手的近距离以5比3击败他们时，切尔西最终是否已经封锁了他们的进步仍不确定，但当韦尔贝克（Welbeck）点头点头时，他们终于可以在额外的时间内轻松休息，并消除利兹（Leeds）值得称赞的永不言败的态度。",
    "src": "Sky Sports · 2026-09-09"
  },
  "unable": {
    "en": "Spurs' players have been unable to turn that perception into more than one point so far.",
    "cn": "到目前为止，热刺的球员们还无法将这种感觉转化为一分以上。",
    "src": "Sky Sports · 2026-09-10"
  },
  "ultimately": {
    "en": "“That poor administration helped trigger the revolt,” which ultimately evolved from a protest against unfair taxes into a broader push for a more equitable society.",
    "cn": "“那个糟糕的政府帮助引发了叛乱”，最终从对不公平税收的抗议演变为对更公平社会的更广泛推动。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "ultimate": {
    "en": "If so, the end panels might have shown William being crowned king of England, as that was the ultimate consequence of the Conquest.",
    "cn": "如果是这样，最后的镶板可能显示威廉被加冕为英格兰国王，因为这是征服的最终结果。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "tower": {
    "en": "On a June day in 1381, however, rebels breached the Tower for the first and only time in its history.",
    "cn": "然而，在1381年6月的一天，叛乱分子在其历史上第一次也是唯一一次突破了这座塔。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "them": {
    "en": "\"We played with confidence, there was not even a chance for them, then the referee decided to give a penalty.",
    "cn": "“我们充满信心地踢球，他们甚至没有机会，然后裁判决定点球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "themselves": {
    "en": "They worked together as a three, they knew how to position themselves, they were great in the air, they knew how to push up and when to drop deeper.",
    "cn": "他们三人配合默契，知道如何站位，高空球能力出色，懂得何时上压、何时回收。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "then": {
    "en": "Before then – since at least the late 1720s – it was rolled out only for antiquarian and guest visitors.",
    "cn": "在此之前，至少从18世纪20年代末开始，它只对古董商和游客开放。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "theoretical": {
    "en": "Since then, mathematicians have been investigating whether these equations work in all situations or whether they allow for a theoretical case in which a small part of the fluid moves infinitely quickly and the solution breaks down—or “blows up.”",
    "cn": "从那时起，数学家们一直在研究这些方程是否适用于所有情况，或者它们是否允许一种理论情况，在这种情况下，一小部分流体无限快速地运动，溶液就会破裂或“爆炸”。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "theory": {
    "en": "This kind of “do your own research” theory of medicine is hardly new, but today, there’s more of a platform than ever to cultivate this demand and serve it at scale.",
    "cn": "这种“自己做研究”的医学理论并不是什么新鲜事，但今天，培养这种需求并大规模服务的平台比以往任何时候都多。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "there": {
    "en": "\"We played with confidence, there was not even a chance for them, then the referee decided to give a penalty.",
    "cn": "“我们充满信心地踢球，他们甚至没有机会，然后裁判决定点球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "these": {
    "en": "A few years ago, these drugs belonged to the world of bodybuilder message boards and the dark web.",
    "cn": "几年前，这些药物属于健美留言板和暗网的世界。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "they": {
    "en": "Countless film adaptations of her work were made throughout the 20th century, and they’re still coming.",
    "cn": "整个20世纪，根据她的作品改编的电影不计其数，而且还在不断出现。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "thing": {
    "en": "\"We've still got a bit to go, but we're getting results and that's the main thing.\"",
    "cn": "“我们还有一段路要走，但我们正在取得成果，这是最重要的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "think": {
    "en": "\"I think they can finish second -- third is the absolute lowest I can see Chelsea finishing,\" Neville added.",
    "cn": "内维尔补充道：「我认为他们能拿到亚军，第三将是切尔西能拿到的最低名次。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "thousand": {
    "en": "There were thousands of names in the registers, mostly written in dark ink.",
    "cn": "登记簿上有成千上万的名字，大多是用深色墨水写的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "though": {
    "en": "Gacy was sentenced to death in 1980, though he spent the next 14 years appealing his sentence.",
    "cn": "盖西于1980年被判处死刑，尽管他花了接下来的14年时间对他的判决提出上诉。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "those": {
    "en": "And among those, just five hit the 0.5 benchmark in the season before they moved: Barcola, Outtara, Madueke, Mbaye, and Johnson.",
    "cn": "其中只有 5 人达到了 0.5 的门槛——他们是巴尔科拉、奥塔拉、马杜埃凯、姆巴耶和约翰逊。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "third": {
    "en": "\"I think they can finish second -- third is the absolute lowest I can see Chelsea finishing,\" Neville added.",
    "cn": "内维尔补充道：「我认为他们能拿到亚军，第三将是切尔西能拿到的最低名次。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "this": {
    "en": "Don't be fooled by this result -- Chelsea are back among the Premier League title contenders.",
    "cn": "不要被这场比赛的结果欺骗——切尔西已经重新回到争冠行列。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "thread": {
    "en": "The Arsenal captain oozed class and confidence, demanding the ball then finding the gaps in Napoli's defence and threading passes forward.",
    "cn": "阿森纳队长渗出班级和自信，要求球然后找到那不勒斯的防守和线程向前传球的差距。",
    "src": "Sky Sports · 2026-09-09"
  },
  "their": {
    "en": "Martin Odegaard's superb strike gave Arsenal a deserved 1-0 victory over Napoli in their Champions League opener.",
    "cn": "马丁·厄德高（Martin Odegaard）出色的罢工让阿森纳在冠军联赛揭幕战中以1比0战胜了那不勒斯。",
    "src": "Sky Sports · 2026-09-09"
  },
  "ten": {
    "en": "Here are the projects that won the ten categories of the 2026 Ig Nobel Prizes.",
    "cn": "以下是获得2026年搞笑诺贝尔奖十大奖项的项目。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "tense": {
    "en": "A new film by Paul Greengrass, a veteran director of tense action films including Captain Phillips and The Bourne Ultimatum, reimagines the Peasants’ Revolt from the perspectives of those who participated in it.",
    "cn": "保罗·格林格拉斯（Paul Greengrass）是包括《菲利普斯船长》（Captain Phillips）和《伯恩最后通牒》（The Bourne Ultimatum）在内的紧张动作电影的资深导演，他拍摄的一部新电影从参与者的角度重新构想了农民起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tenth": {
    "en": "Within four years, it would become the setting of Christie’s most famous novel: the tenth installment in her Hercule Poirot series, Murder on the Orient Express.",
    "cn": "四年之内，这里成为了克里斯蒂最著名的小说：她的赫尔克里·波洛系列的第十部《东方快车谋杀案》的背景。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "that": {
    "en": "\"He's got that edge and different relationships around him as well and that helps,\" said the Gunners boss.",
    "cn": "“他周围有这种优势和不同的关系，这很有帮助，”枪手主帅说。",
    "src": "Sky Sports · 2026-09-09"
  },
  "than": {
    "en": "Only Everton and Liverpool have placed less emphasis on investment in their backline than the Red Devils since 2022.",
    "cn": "自2022年以来，只有埃弗顿和利物浦比红魔更不重视投资。",
    "src": "Sky Sports · 2026-09-09"
  },
  "territory": {
    "en": "For instance, in the Victoria River District, a pastoral area in the Northern Territory of Australia, the nabarlek hasn’t been seen for 170 years—so researchers assume that there, it is locally extinct.",
    "cn": "例如，在维多利亚河地区，澳大利亚北部的一个牧区，已经有170年没有看到纳巴莱克了，所以研究人员认为，在那里，它已经在当地灭绝了。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "term": {
    "en": "David Martindale has pledged he won't be stepping back into the Livingston dugout long-term.",
    "cn": "大卫·马丁代尔（David Martindale）承诺，他不会长期退回利文斯顿防空洞。",
    "src": "Sky Sports · 2026-09-09"
  },
  "test": {
    "en": "The Blues found themselves two goals behind when Brenden Aaronson struck after 47 minutes to add to Tarik Muharemovic's opener, and it appeared Xabi Alonso's first real cup test would end in disappointment - despite the half-time introduction of Cole Palmer, Morgan Rogers, Pedro Neto and Reece James.",
    "cn": "布兰登·亚伦森（Brenden Aaronson）在47分钟后击中塔里克·穆哈雷莫维奇（Tarik Muharemovic）的揭幕战后，蓝军发现自己落后了两个进球，尽管科尔·帕尔默（Cole Palmer）、摩根·罗杰斯（Morgan Rogers）、佩德罗·内托（Pedro Neto）和里斯·詹姆斯（Reece James）中场休息，但似乎萨比·阿隆索",
    "src": "Sky Sports · 2026-09-09"
  },
  "threat": {
    "en": "\"He definitely offers a different kind of threat, that is the beauty of it really, we know what Ben gives us and there are not many who can give us what he gives us.",
    "cn": "“他绝对提供了一种不同的威胁，这就是它的美妙之处，我们知道本给了我们什么，没有几个人能给我们他给我们的。",
    "src": "Sky Sports · 2026-09-08"
  },
  "threaten": {
    "en": "“It’s also reassuring, as it indicates that this threatened wallaby is persisting …",
    "cn": "“这也令人放心，因为这表明这种受到威胁的小袋鼠正在持续存在…",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "three": {
    "en": "Hull arrive at Stamford Bridge with seven points from three games and three consecutive clean sheets.",
    "cn": "赫尔三场比赛积7分，连续三场零封，来到斯坦福桥。",
    "src": "Sky Sports · 2026-09-10"
  },
  "today": {
    "en": "Today, the 443-foot-long shipwreck lies within the Karaburun-Sazan Marine Protected Area, submerged about 108 to 121 feet deep.",
    "cn": "今天，这艘443英尺长的沉船位于Karaburun-Sazan海洋保护区内，水深约108至121英尺。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "together": {
    "en": "\"When you put together a team that hardly plays together, it is difficult to play at this level when [Leeds] are intense.\"",
    "cn": "“当你组建一支几乎无法一起比赛的球队时，当[利兹]非常激烈时，很难在这个级别上比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "too": {
    "en": "They hope, too, to discover whether the additional skulls belonged to people who were intentionally decapitated.",
    "cn": "他们也希望发现额外的头骨是否属于被故意斩首的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tool": {
    "en": "Other researchers, working around the same time in the nearby village of Iwiny, separately unearthed a high-status funerary site filled with beads, axes and flint tools.",
    "cn": "其他研究人员大约在同一时间在附近的Iwiny村工作，分别发掘了一个高地位的葬礼遗址，里面装满了珠子、斧头和燧石工具。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "towards": {
    "en": "Leicester City are heading towards financial 'Armageddon' without fresh capital and improved results, says their prospective new owner Talksport",
    "cn": "莱斯特城未来的新东家Talksport表示，在没有新资本和改善业绩的情况下，莱斯特城正走向财务“末日”",
    "src": "Sky Sports · 2026-09-10"
  },
  "tour": {
    "en": "“A World of Mystery” will take visitors on an immersive tour of Christie’s life, which began in 1890 in Devon, England.",
    "cn": "“神秘的世界”将带领游客沉浸在克里斯蒂的生活中，他从1890年开始在英格兰德文郡生活。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "tough": {
    "en": "It should have been much bigger - in a really tough environment, a really tough opponent.",
    "cn": "它应该更大-在一个非常艰难的环境中，一个非常艰难的对手。",
    "src": "Sky Sports · 2026-09-09"
  },
  "touch": {
    "en": "He also ended the game having had more touches, made more passes and created more chances than anyone else on the pitch.",
    "cn": "他还在比赛结束时获得了更多的接触，获得了更多的传球，并创造了比球场上任何其他人更多的机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "total": {
    "en": "In total, the researchers observed 151 species, ranging from common fish to invertebrates and mammals.",
    "cn": "研究人员总共观察了151种物种，从普通鱼类到无脊椎动物和哺乳动物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "top": {
    "en": "At the top of the table, most clubs moved toward a style that prioritised control and limited risks.",
    "cn": "在积分榜顶端，大多数俱乐部转向了强调控球、限制风险的风格。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "title": {
    "en": "Despite that frailty, former Manchester United defender Neville still believes Chelsea can challenge for the title.",
    "cn": "尽管防线脆弱，前曼联后卫内维尔依然认为切尔西具备争冠实力。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "thursday": {
    "en": "The other takes place between Tuesday January 5 and Thursday January 7.",
    "cn": "另一个时间是1月5日星期二到1月7日星期四。",
    "src": "Sky Sports · 2026-09-10"
  },
  "ticket": {
    "en": "Tickets range in price from £25 to £33, through a tiered pricing structure based on the day and time of visit.",
    "cn": "门票价格从25英镑到33英镑不等，根据参观日期和时间分层定价。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "through": {
    "en": "Chelsea took the lead early on at the Premier League champions on Sunday through Morgan Rogers.",
    "cn": "周日做客英超卫冕冠军的比赛中，切尔西凭借摩根·罗杰斯的闪击早早取得领先。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "throughout": {
    "en": "Countless film adaptations of her work were made throughout the 20th century, and they’re still coming.",
    "cn": "整个20世纪，根据她的作品改编的电影不计其数，而且还在不断出现。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "tie": {
    "en": "With a Europa League tie and an Old Firm cup and league double coming up, Martin O'Neill made five changes as Kasper Hogh returned from injury and Sam Johnstone took over in goal.",
    "cn": "随着欧罗巴联赛平局和老公司杯和联赛双打的到来，马丁·奥尼尔（Martin O'Neill）做出了五项改变，卡斯珀·霍格（Kasper Hogh）因伤复出，萨姆·约翰斯通（Sam Johnstone）接",
    "src": "Sky Sports · 2026-09-09"
  },
  "tissue": {
    "en": "By linking up various amino acids in sequence, the body produces peptides that carry out a wide range of functions, including immune support, tissue repair and appetite control.",
    "cn": "通过按顺序连接各种氨基酸，人体产生具有多种功能的肽，包括免疫支持、组织修复和食欲控制。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tip": {
    "en": "The 255 egg fragments at the center of the discovery were uncovered in 2020 and 2024 in the Chorrillo Formation, a rock formation on the southern tip of Argentina.",
    "cn": "发现中心的255个鸡蛋碎片于2020年和2024年在阿根廷南端的一个岩层Chorrillo地层中被发现。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "time": {
    "en": "The Germany international's dummy gave Ødegaard the space and time to fire home Arsenal's crucial second goal.",
    "cn": "这位德国国脚的一漏，给厄德高赢得了空间和时间，让他打进了阿森纳关键的第二球。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "until": {
    "en": "They had been there largely undisturbed for nearly 100 years, until Amandeep Madra contacted them.",
    "cn": "在Amandeep Madra联系他们之前，他们在那里生活了将近100年。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "white": {
    "en": "Holmes of The Devil in the White City infamy—anchors a new exhibition, now open in Chicago.",
    "cn": "因《白城恶魔》而臭名昭著的福尔摩斯——是芝加哥正在举办的新展览的核心人物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "who": {
    "en": "They hope, too, to discover whether the additional skulls belonged to people who were intentionally decapitated.",
    "cn": "他们也希望发现额外的头骨是否属于被故意斩首的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "whoever": {
    "en": "At the turn of the 21st century, the Clay Mathematics Institute decided that it would award $1 million to whoever solved it.",
    "cn": "在21世纪之交，克莱数学研究所决定给解决这个问题的人奖励100万美元。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "whole": {
    "en": "It had to be connected to scoring because, well, that's the whole point of the game.",
    "cn": "它必须与进球挂钩，因为说到底，这就是比赛的全部意义。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "whom": {
    "en": "But the feat has also sparked a controversy: While the Navier-Stokes problem may have been solved by A.I., the achievement has become contentious because of a possible association with the work of two human researchers—one of whom is employed by OpenAI’s rival company Anthropic.",
    "cn": "但这一成就也引发了争议：虽然纳维-斯托克斯问题可能是由人工智能解决的，但这一成就引发了争议，因为它可能与两名人类研究人员的工作有关，其中一名研究人员受雇于OpenAI的竞争对手Anthropic公司。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "why": {
    "en": "\"Collectively, as a team, we have done a lot of the right things and that is why were are excited about what the season will bring.",
    "cn": "“作为一个团队，我们做了很多正确的事情，这就是为什么我们对新赛季的到来感到兴奋。",
    "src": "Sky Sports · 2026-09-08"
  },
  "wide": {
    "en": "It used to be: get chalk on your heels, stay wide, wait for a pass, dribble past your full-back, and cross the ball into the big striker in the box.",
    "cn": "从前，边锋的任务是这样的：在鞋底沾满草粉之后，留在边路，等待传球，突破对面的边后卫，然后把球传中给禁区里的高中锋。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "winner": {
    "en": "When you get a late winner, it illustrates the strength, fitness and character of the team.",
    "cn": "当你得到一个迟到的获胜者时，它说明了团队的力量、健康和品格。",
    "src": "Sky Sports · 2026-09-09"
  },
  "wing": {
    "en": "Alonso's 3-5-2 system saw Josh Acheampong, Maxence Lacroix and Wesley Fofana start in the back three -- with Pedro Neto and Jorrel Hato as wing-backs.",
    "cn": "阿隆索排出的 3-5-2 阵型中，约书亚·阿查姆庞、拉克鲁瓦和福法纳组成三中卫，佩德罗·内托和哈托担任翼卫。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "window": {
    "en": "Barcelona are looking to sell Frenkie de Jong when the January transfer window opens.",
    "cn": "巴塞罗那希望在1月转会窗口打开时出售Frenkie de Jong。",
    "src": "Sky Sports · 2026-09-09"
  },
  "win": {
    "en": "We're making good steps but we'd like to be able to win a bit more comfortably and at more ease.",
    "cn": "我们正在迈出良好的步伐，但我们希望能够更舒适、更轻松地赢得比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "will": {
    "en": "\"I couldn't be more pleased with my players for their perseverance and sheer will to keep going.",
    "cn": "“我对我的球员的毅力和继续前进的纯粹意愿感到非常满意。",
    "src": "Sky Sports · 2026-09-09"
  },
  "wild": {
    "en": "There were times during the tournament when life must have felt a little wild, I suggest.",
    "cn": "我建议，在比赛期间，生活一定感觉有点狂野。",
    "src": "Sky Sports · 2026-09-09"
  },
  "wife": {
    "en": "Edda Ciano, the daughter of Italian dictator Benito Mussolini and the wife of Italian foreign minister Galeazzo Ciano, was among the survivors.",
    "cn": "埃达·奇亚诺（Edda Ciano）是意大利独裁者贝尼托·墨索里尼（Benito Mussolini）的女儿，也是意大利外交部长加莱阿佐·奇亚诺（Galeazzo Ciano）的妻子",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "widow": {
    "en": "Lesser-known featured Chicago killers include Richard Speck; the satanic Ripper Crew cult; and Tillie Klimek, known as Chicago’s “Black Widow,” who claimed to have had precognitive dreams of the deaths of her husbands, whom, in reality, she poisoned.",
    "cn": "鲜为人知的芝加哥杀手包括理查德·斯佩克（Richard Speck）、撒旦式的开膛手船员邪教（Ripper Crew cult）和被称为芝加哥“黑寡妇”的蒂莉·克莱梅克（Tillie Klimek），她声称自己曾梦到丈夫的死亡，而实际上，她的丈夫是被毒死的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "willing": {
    "en": "Havertz might never have entirely convinced as a centre-forward -- which is partly why Chelsea were willing to move him out and Arsenal signed Viktor Gyökeres last summer.",
    "cn": "哈弗茨从未能彻底证明自己是一名合格的中锋——这也是切尔西愿意将他放走、阿森纳去年夏天签下维克托·约克雷斯的原因之一。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "wednesday": {
    "en": "Henrik Pedersen proving the critics wrong as Sheffield Wednesday surge out of the blocks",
    "cn": "亨里克·彼得森证明了那些批评的人是错的，谢菲尔德星期三队在比赛中突飞猛冲",
    "src": "Sky Sports · 2026-09-10"
  },
  "week": {
    "en": "Pressure is on Michael Carrick and suddenly, this week already feels season-defining.",
    "cn": "迈克尔·卡里克（Michael Carrick）承受着压力，突然之间，本周已经感觉到了赛季的定义。",
    "src": "Sky Sports · 2026-09-09"
  },
  "weekend": {
    "en": "That weekend's Super Sunday sees Chelsea vs Newcastle at 2pm, then Man City vs Tottenham at 4.30pm.",
    "cn": "那个周末的“超级星期天”是下午2点切尔西vs纽卡斯尔，下午4点半曼城vs热刺。",
    "src": "Sky Sports · 2026-09-10"
  },
  "weigh": {
    "en": "Adults could weigh up to 75 tonnes—over eight times bigger than a Tyrannosaurus rex and 12 times as heavy as an elephant.",
    "cn": "成年人的体重可达75吨，是霸王龙的8倍多，是大象的12倍重。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "well": {
    "en": "Perhaps Chicago’s most well-known serial killer, Gacy features prominently in the exhibition.",
    "cn": "也许是芝加哥最著名的连环杀手，盖西在展览中占据突出地位。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "well-known": {
    "en": "Perhaps Chicago’s most well-known serial killer, Gacy features prominently in the exhibition.",
    "cn": "也许是芝加哥最著名的连环杀手，盖西在展览中占据突出地位。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "which": {
    "en": "The style of the ax, which was chipped from use, led researchers to date the grave to around 2900 B.C.E.",
    "cn": "斧头的风格从使用中被削弱，导致研究人员将坟墓的年代定在公元前2900年左右。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "whether": {
    "en": "The ending is abrupt and many people have pondered on whether the tapestry was not actually finished, or has lost its final frames at some point over the centuries.",
    "cn": "结局很突然，许多人都在想，这幅挂毯到底是没有完成，还是几个世纪以来的某个时候失去了最后的画框。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "where": {
    "en": "Alonso was handed another clear indication of where his side remain lacking - but for now, chaos isn't serving them too badly.",
    "cn": "阿隆索得到了另一个明确的迹象，表明他的球队仍然缺乏-但目前，混乱并没有为他们服务得太糟糕。",
    "src": "Sky Sports · 2026-09-09"
  },
  "when": {
    "en": "In the study, “we’ve shown that animals kiss and when it could have evolved in the primates,” she says.",
    "cn": "她说：“在这项研究中，我们已经证明了动物接吻以及它何时可以在灵长类动物中进化。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "while": {
    "en": "While it may only be September, he's not wrong.",
    "cn": "虽然可能只有9月，但他没有错。",
    "src": "Sky Sports · 2026-09-09"
  },
  "whatever": {
    "en": "“They were equipped with an electric knife or a metal saw—whatever you prefer to call it—and they cut through the bolts holding the frames of Renoir’s works in place,” Bryan Masson, the mayor of Cagnes-sur-Mer, told reporters, per ABC News ’ Kevin Shalvey.",
    "cn": "据ABC新闻的凯文·沙维报道，滨海卡涅市长布莱恩·马森告诉记者：“他们配备了一把电动刀或一把金属锯——不管你喜欢怎么称呼它——他们把雷诺阿作品框架固定的螺栓切断了。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "what": {
    "en": "“What’s in the package may not actually be what is on the outside of the label,” Doroshow adds.",
    "cn": "Doroshow补充道：“包装中的东西实际上可能不是标签外面的东西。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "western": {
    "en": "But in a small spot of hope for the marsupial, Australian conservationists and the Dambimangari Aboriginal Corporation recently captured the species on camera at two sites in Western Australia where it had not been scientifically recorded before.",
    "cn": "但有袋动物的一线希望在于，澳大利亚自然资源保护主义者和丹比曼加里原住民公司最近在西澳大利亚州的两个地点用相机捕捉到了这个物种，在此之前，它们没有被科学记录过。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "west": {
    "en": "And the season before wasn't too different: his 75 take-ons ranked fourth behind Doku, West Ham's Mohammed Kudus, and Liverpool's Salah.",
    "cn": "前一个赛季也差不多：他的 75 次成功突破排名第四，仅次于多库、西汉姆的库杜斯和利物浦的萨拉赫。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "wrap": {
    "en": "Just before wrapping up their work on the Roman graves, the researchers spotted the circular outline of a barrow—an ancient burial mound—Dąbrowski says in a statement from Wrocław Medical University.",
    "cn": "在结束他们对罗马坟墓的工作之前，研究人员在弗罗茨瓦夫医科大学的一份声明中发现了一个古老的坟丘Dąbrowski的圆形轮廓。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "wreck": {
    "en": "Now, more than eight decades later, the wreck is teeming with marine life, researchers report in a paper published July 26 in the journal Frontiers in Ocean Sustainability.",
    "cn": "研究人员在7月26日发表在《海洋可持续发展前沿》（Frontiers in Ocean Sustainability）杂志上的一篇论文中报告说，现在，80多年过去了，沉船上充满了海洋生物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "wrist": {
    "en": "After those two, there is England veteran Jordan Henderson, now 36, who is still sidelined with the broken wrist suffered when falling over an advertising board at the World Cup.",
    "cn": "除了他们两人之外，还有 36 岁的英格兰老将亨德森，他因在世界杯期间撞到广告牌手腕骨折，目前仍在养伤。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "writer": {
    "en": "Sara Hashemi is a science writer and fact-checker currently based in New York City.",
    "cn": "Sara Hashemi是一位科学作家和事实核查员，目前居住在纽约市。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "wrong": {
    "en": "Henrik Pedersen proving the critics wrong as Sheffield Wednesday surge out of the blocks",
    "cn": "亨里克·彼得森证明了那些批评的人是错的，谢菲尔德星期三队在比赛中突飞猛冲",
    "src": "Sky Sports · 2026-09-10"
  },
  "year": {
    "en": "Amandeep was born and grew up in Britain in the 1970s, his parents having come over in the postwar years.",
    "cn": "阿曼迪普上世纪70年代在英国出生和长大，他的父母在战后的岁月里来到英国。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "yes": {
    "en": "Yes, I realise I sound like your grandpa right now.",
    "cn": "是的，我知道我现在听起来像你的爷爷。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "wound": {
    "en": "The ship, called the Po, was evacuating wounded Italian soldiers from Albania’s Vlora Bay on the night of March 14, 1941, when it was struck by a torpedo from a British Swordfish bomber.",
    "cn": "这艘名为Po的船于1941年3月14日晚上从阿尔巴尼亚的Vlora湾撤离受伤的意大利士兵，当时它被英国箭鱼轰炸机的鱼雷击中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "yourself": {
    "en": "Heading to the British Museum to see the Bayeux Tapestry for yourself?",
    "cn": "想亲自去大英博物馆看贝叶挂毯吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "your": {
    "en": "And it's not even clear that the production -- you know, the part where you turn your play into goals -- drove any kind of premium.",
    "cn": "而且尚不清楚他们的产出——也就是把表现转化为进球的部分——是否真的带来任何溢价。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "young": {
    "en": "Its dental charms came from large mammals, like wolves, deer, young bears or maybe even humans, Dąbrowski tells PAP.",
    "cn": "Dąbrowski告诉PAP ，它的牙齿魅力来自大型哺乳动物，如狼、鹿、小熊甚至人类。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "you": {
    "en": "When you get a late winner, it illustrates the strength, fitness and character of the team.",
    "cn": "当你得到一个迟到的获胜者时，它说明了团队的力量、健康和品格。",
    "src": "Sky Sports · 2026-09-09"
  },
  "would": {
    "en": "He has deliberately given him some space because he knows it would have been a difficult situation.",
    "cn": "他故意给他一些空间，因为他知道这将是一个困难的局面。",
    "src": "Sky Sports · 2026-09-09"
  },
  "woman": {
    "en": "Caroline d’Amat, Cagnes-sur-Mer’s deputy mayor, tells CNN ’s Jack Guy and Saskya Vandoorne that Madame Colonna Romano is worth more than $2.3 million, while Young Woman is worth about $230,000.",
    "cn": "滨海卡涅斯副市长卡洛琳·达马特告诉CNN的杰克·盖伊和萨斯基亚·凡多恩，科隆娜·罗马诺夫人的身价超过230万美元，而年轻女子的身价约为23万美元。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "withstand": {
    "en": "The Tower of London has protected England’s capital since it was first built in the 1070s, withstanding medieval sieges and World War II bombing raids alike.",
    "cn": "伦敦塔自1070年代首次建成以来一直保护着英格兰的首都，经受住了中世纪的围攻和第二次世界大战的轰炸。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "without": {
    "en": "Rangers had to cope without captain and striker Lawrence Shankland, who missed out through injury, with Ryan Naderi starting in his place.",
    "cn": "流浪者不得不在没有队长和前锋劳伦斯·尚克兰德的情况下应对，劳伦斯·尚克兰德因伤缺席比赛，瑞安·纳德里（Ryan Naderi）开始取代他。",
    "src": "Sky Sports · 2026-09-09"
  },
  "with": {
    "en": "But the hosts struck back with strikes from Kai Havertz and Martin Ødegaard -- and could have scored more.",
    "cn": "但主队凭借凯·哈弗茨和马丁·厄德高的进球反超比分——他们本可以进更多球。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "wise": {
    "en": "But performance-wise, it has been a lot of things we are looking for.",
    "cn": "但在性能方面，我们一直在寻找很多东西。",
    "src": "Sky Sports · 2026-09-08"
  },
  "within": {
    "en": "Today, the 443-foot-long shipwreck lies within the Karaburun-Sazan Marine Protected Area, submerged about 108 to 121 feet deep.",
    "cn": "今天，这艘443英尺长的沉船位于Karaburun-Sazan海洋保护区内，水深约108至121英尺。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "woollen": {
    "en": "Strictly speaking, the Tapestry is an embroidery – because the woollen threads of its design are stitched onto the linen backing cloth rather than being woven as one.",
    "cn": "严格来说，挂毯是一种刺绣，因为其设计的羊毛线是缝在亚麻底布上的，而不是织成一体的。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "worth": {
    "en": "This spring, thieves stole $10 million worth of paintings by Renoir, Henri Matisse and Paul Cézanne from an Italian museum.",
    "cn": "今年春天，窃贼从一家意大利博物馆偷走了价值1000万美元的雷诺阿（Renoir）、亨利·马蒂斯（Henri Matisse）和保罗·卡萨姆（Paul csamzanne）的画作。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "worse": {
    "en": "Winning work highlighted during the 36th annual award ceremony included hilarious research on the aerodynamics of nose blowing, gently stepping on venomous snakes, confirming that teenagers do indeed smell worse than babies and other side-splitting scientific undertakings.",
    "cn": "第36届年度颁奖典礼上突出的获奖作品包括关于吹鼻子的空气动力学的热闹研究，轻轻踩在毒蛇身上，证实青少年确实比婴儿更难闻，以及其他侧面分裂的科学事业。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "world": {
    "en": "A few years ago, these drugs belonged to the world of bodybuilder message boards and the dark web.",
    "cn": "几年前，这些药物属于健美留言板和暗网的世界。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "worker": {
    "en": "The Po quickly began taking on water and sank within about ten minutes, killing 23 of the 240 people aboard, including three Italian Red Cross workers.",
    "cn": "Po很快开始进水，并在大约十分钟内沉没，造成船上240人中的23人死亡，其中包括三名意大利红十字会工作人员。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "work": {
    "en": "Wealthier individuals were also more likely to lie at work and cheat during games.",
    "cn": "较富有的人也更有可能在工作中撒谎，在游戏中作弊。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "word": {
    "en": "Unsurprisingly, Pochettino chooses his words carefully, focusing on the support and backing Trump gave the side.",
    "cn": "不出所料，波切蒂诺谨慎地选择了他的话，专注于特朗普的支持和支持。",
    "src": "Sky Sports · 2026-09-09"
  },
  "tell": {
    "en": "Its dental charms came from large mammals, like wolves, deer, young bears or maybe even humans, Dąbrowski tells PAP.",
    "cn": "Dąbrowski告诉PAP ，它的牙齿魅力来自大型哺乳动物，如狼、鹿、小熊甚至人类。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "valley": {
    "en": "In Silicon Valley, devotees have gathered at peptide parties to drink, dance and inject themselves with these chemicals—all in pursuit of sharper minds and more sculpted bodies.",
    "cn": "在硅谷，奉献者聚集在多肽派对上喝酒、跳舞和注射这些化学物质--所有这些都是为了追求更敏锐的头脑和更精致的身体。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "value": {
    "en": "The 7/4 for him to make two or more fouls is a lovely slice of value.",
    "cn": "对于他来说，7/4的两次或两次以上的犯规是一个可爱的价值。",
    "src": "Sky Sports · 2026-09-10"
  },
  "various": {
    "en": "But within the last few years, peptides have become a much broader phenomenon, not just taken for self-optimization but for treating chronic pain and various other conditions.",
    "cn": "但在过去几年中，多肽已成为一种更广泛的现象，不仅用于自我优化，还用于治疗慢性疼痛和各种其他疾病。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "veteran": {
    "en": "It is believed they were compiled for postwar pensions and other veterans’ benefits.",
    "cn": "据信，这些数据是为战后养老金和其他退伍军人福利编制的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "vessel": {
    "en": "Scientists also spotted squid egg clusters attached to the vessel.",
    "cn": "科学家们还发现了附着在船上的鱿鱼卵簇。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "very": {
    "en": "\"That's great that a lot of very different players got in those situations.",
    "cn": "“在这种情况下，很多不同的球员都得到了很好的表现。",
    "src": "Sky Sports · 2026-09-09"
  },
  "verify": {
    "en": "And once scientists have detected a wallaby that fits the animal’s description, verifying that it’s the target species is no easy task, either.",
    "cn": "一旦科学家发现了符合动物描述的小袋鼠，验证它是目标物种也不是一件容易的事。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "unusually": {
    "en": "Oliver Glanser's record against Unai Emery is an unusually strong tactical head-to-head that is more than just a cute statistic.",
    "cn": "奥利弗·格兰瑟对阵乌奈·埃梅里的记录是一场异常强大的肉搏战，而不仅仅是一个可爱的数据。",
    "src": "Sky Sports · 2026-09-10"
  },
  "upon": {
    "en": "Lavia would be the most obvious partner for Caicedo, but the Belgium international has had such an injury-hit time at Chelsea that the 22-year-old cannot yet be relied upon to be a first-choice starter.",
    "cn": "拉维亚本该是凯塞多最明显的搭档，但这位比利时国脚在切尔西饱受伤病困扰，年仅 22 岁的他还不能被视为可靠的首发。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "usually": {
    "en": "Champions usually concede fewer than a goal a game, so Chelsea are totally off course right now by letting them in at a rate of more than two a game.",
    "cn": "冠军球队通常每场比赛的丢球不超过一球，切尔西如今以每场两球以上的失球速度完全偏离了轨道。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "used": {
    "en": "It used to be: get chalk on your heels, stay wide, wait for a pass, dribble past your full-back, and cross the ball into the big striker in the box.",
    "cn": "从前，边锋的任务是这样的：在鞋底沾满草粉之后，留在边路，等待传球，突破对面的边后卫，然后把球传中给禁区里的高中锋。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "use": {
    "en": "Scientists, in turn, have developed synthetic copies or modified cousins of these peptides to use as medications.",
    "cn": "反过来，科学家们开发了这些肽的合成拷贝或修饰表亲，用作药物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "wake": {
    "en": "Prophetic words from Gary Neville in the wake of Manchester United's 2-2 draw with Everton.",
    "cn": "加里·内维尔（Gary Neville）在曼联2-2战平埃弗顿之后的预言。",
    "src": "Sky Sports · 2026-09-09"
  },
  "walk": {
    "en": "This has led some historians to suggest that the Tapestry was designed to be accompanied by a guide, who would have narrated the story to viewers as they walked along.",
    "cn": "这使得一些历史学家提出，挂毯的设计是由一个导游陪同的，他会在观众走过的时候向他们讲述故事。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "wall": {
    "en": "But it takes its name from the French tapisserie, meaning ‘wall hanging’.",
    "cn": "但它的名字来自法语tapisserie，意思是“挂在墙上”。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "want": {
    "en": "Derek McInnes wants Rangers to \"bring the crowd with us\" in Sunday's Old Firm clash at Ibrox.",
    "cn": "德里克·麦金尼斯希望流浪者队在周日在伊布罗克斯与老公司的比赛中“把观众带到我们身边”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "war": {
    "en": "The registers had been put together by the Punjab government in 1919–20 after the war.",
    "cn": "这些登记簿是旁遮普政府在战后的1919年至1920年间整理的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "warm": {
    "en": "Mauricio Pochettino has always been good company - warm, engaging and likeable.",
    "cn": "Mauricio Pochettino一直是好伙伴--热情、迷人、可爱。",
    "src": "Sky Sports · 2026-09-09"
  },
  "waste": {
    "en": "Report as Martin Odegaard's goal ensures a 1-0 win for Arsenal in their Champions League league-phase opener against Napoli; Mikel Arteta's side dominated but wasted chances through Bukayo Saka, Mikel Merino and others before Odegaard's winner",
    "cn": "报告为Martin Odegaard的进球确保了阿森纳在对阵那不勒斯的欧冠联赛阶段揭幕战中1-0获胜；Mikel Arteta的球队在Odegaard的冠军之前通过Bukayo Saka ，Mikel Merino和其他人占据主导地位但浪费了机会",
    "src": "Sky Sports · 2026-09-09"
  },
  "wealthy": {
    "en": "The tax was “an unevenly distributed one,” asking more of the lower classes than the wealthy, and it was “very badly administered,” Andrew Prescott, a historian at the University of Glasgow, tells Smithsonian magazine.",
    "cn": "格拉斯哥大学(University of Glasgow)历史学家安德鲁·普雷斯科特(Andrew Prescott)告诉《史密森尼》(Smithsonian)杂志，这项税收“分配不均”，对下层阶级的要求高于对富人的要求，而且“管理非常糟糕”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "wealth": {
    "en": "“The general pattern seems to be that with wealth and rising power, you become less engaged with the needs of others and less burdened by the needs of social relationships,” study co-author Paul Piff, a social psychologist at the University of California, Irvine, tells the Guardian ’s Ian Sample.",
    "cn": "研究报告的共同作者、加州大学欧文分校的社会心理学家保罗·皮夫（Paul Piff）告诉《卫报》的伊恩·样本（Ian Sample）：“一般的模式似乎是，随着财富和权力的不断崛起，你对他人的需求的参与度降低，而对社会关系的需求的负担减轻。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "weakness": {
    "en": "But Martinez and Lacroix both had an off day at the Emirates as Chelsea's defensive frailties once again highlighted their big weakness.",
    "cn": "但马丁内斯和拉克鲁瓦在酋长球场双双不在状态，切尔西防线的问题再次暴露无遗。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "weak": {
    "en": "Chelsea are back, but they're still weak at the back.",
    "cn": "切尔西已经卷土重来，但防线依旧脆弱。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "way": {
    "en": "Then for 20 to 25 minutes we were guilty of so many bad decisions, but we found a way to win.",
    "cn": "然后在20到25分钟的时间里，我们做出了很多糟糕的决定，但我们找到了获胜的方法。",
    "src": "Sky Sports · 2026-09-09"
  },
  "water": {
    "en": "The Po quickly began taking on water and sank within about ten minutes, killing 23 of the 240 people aboard, including three Italian Red Cross workers.",
    "cn": "Po很快开始进水，并在大约十分钟内沉没，造成船上240人中的23人死亡，其中包括三名意大利红十字会工作人员。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "watch": {
    "en": "The team watched the siblings play “soccer” with each other and their mother, and in one instance, with two juvenile Cozumel dwarf coatis.",
    "cn": "研究小组观察了这对兄弟姐妹和它们的母亲一起踢“足球”，有一次，他们还和两只科苏梅尔矮长鼻浣熊幼崽一起踢足球。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "violence": {
    "en": "This unprecedented act of violence took place at the height of the Peasants’ Revolt, a mass uprising sparked by the imposition of a poll tax —the third of its kind in four years.",
    "cn": "这种前所未有的暴力行为发生在农民起义的高峰期，这是四年来第三次征收人头税引发的大规模起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "village": {
    "en": "In 1960, Renoir’s son Claude sold the estate to the village of Cagnes, which turned it into a museum.",
    "cn": "1960年，雷诺阿的儿子克劳德将庄园卖给了卡涅斯村，并将其改建为博物馆。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "view": {
    "en": "As you survey the Tapestry, imagine how it might have been viewed in the 11th century.",
    "cn": "当你审视这幅挂毯时，想象一下在11世纪人们是如何看待它的。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "video": {
    "en": "Follow Sky Sports on WhatsApp for the latest sports news, videos, features, analysis and much more",
    "cn": "在WhatsApp上关注天空体育，获取最新的体育新闻、视频、功能、分析等",
    "src": "Sky Sports · 2026-09-10"
  },
  "victory": {
    "en": "Martin Odegaard's superb strike gave Arsenal a deserved 1-0 victory over Napoli in their Champions League opener.",
    "cn": "马丁·厄德高（Martin Odegaard）出色的罢工让阿森纳在冠军联赛揭幕战中以1比0战胜了那不勒斯。",
    "src": "Sky Sports · 2026-09-09"
  },
  "victorious": {
    "en": "Former Manchester City playmaker Kevin De Bruyne appeared well placed to equalise when put through for a rare Napoli chance in the final few minutes, but wasted the chance by opting to cross, ensuring Arsenal could celebrate a victorious start to their European campaign and a fifth straight win of the season in all competitions.",
    "cn": "前曼城组织者凯文·德布鲁因（Kevin De Bruyne）在最后几分钟获得罕见的那不勒斯机会时，似乎处于很好的平衡位置，但由于选择交叉而浪费了这个机会，确保阿森纳能够庆祝他们的欧洲战役的胜利开局以及本赛季在所有比赛中的连续第五场胜利。",
    "src": "Sky Sports · 2026-09-09"
  },
  "victim": {
    "en": "Throughout the 1970s, Gacy—who worked as a birthday party clown alternately named Pogo and Patches— killed at least 33 teenage boys and young men after luring them to his home on the outskirts of the city, where he buried the remains of 29 of his victims in his basement’s crawl space.",
    "cn": "在整个20世纪70年代，Gacy曾担任生日派对小丑，交替命名为Pogo和Patches ，他将至少33名十几岁的男孩和年轻人引诱到他位于城市郊区的家中，在那里他将29名受害者的遗体埋葬在地下室的爬行空间中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "wear": {
    "en": "They’ll also analyze genetic material in the skulls and teeth to determine genders and species, and attempt to discern the teeth owners’ diets through analysis of wear patterns and levels of strontium, carbon and nitrogen isotopes in the enamel.",
    "cn": "他们还将分析头骨和牙齿中的遗传物质，以确定性别和物种，并试图通过分析牙釉质中的磨损模式和锶、碳和氮同位素水平来辨别牙齿主人的饮食。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "visible": {
    "en": "This boom is even more visible online: As of May, peptide-related hashtags had generated more than 130,000 Instagram posts and 230 million TikTok views.",
    "cn": "这种热潮在网上更加明显：截至5月，与多肽相关的标签已经产生了超过13万个Instagram帖子和2.3亿次TikTok浏览量。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "visual": {
    "en": "In this way, it functioned as a visual prompt and a mnemonic device, inviting its audience to engage with the drama of 1066 in a uniquely immersive way.",
    "cn": "通过这种方式，它起到了视觉提示和记忆装置的作用，邀请观众以一种独特的沉浸式方式参与到1066年的戏剧中。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "visitor": {
    "en": "After 77 seconds here, the Blues looked like they had made the right call as Rogers fired the visitors ahead.",
    "cn": "开场 77 秒之后，罗杰斯为客队先拔头筹，蓝军看上去做出了正确选择。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "visit": {
    "en": "More than 500,000 visitors worldwide have visited the installation.",
    "cn": "全球已有超过50万名参观者参观了该装置。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sky": {
    "en": "There are two festive midweek rounds of Premier League fixtures when every match will be broadcast live on Sky Sports.",
    "cn": "英超联赛周中有两轮喜庆的比赛，每场比赛都将在天空体育进行直播。",
    "src": "Sky Sports · 2026-09-10"
  },
  "smile": {
    "en": "I smile before jesting, and Pochettino just laughs and says he's ready.",
    "cn": "我在开玩笑之前微笑，波切蒂诺只是笑着说他已经准备好了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "small": {
    "en": "The nabarlek looks nearly identical to the monjon (another small rock-wallaby that shares its range), and its genes very closely resemble those of the short-eared rock-wallaby.",
    "cn": "纳巴勒克看起来几乎和獴（另一种分布范围相同的小岩袋鼠）一模一样，它的基因也和短耳岩袋鼠非常相似。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "skill": {
    "en": "What Ronaldo and Messi did -- and made everyone else realise -- is that you could take those same winger skills, the speed and technical brilliance, and turn it into something even better.",
    "cn": "C 罗和梅西所做的事情——也让所有人认识到——是同样的边锋技术、速度和天赋，可以演化成更可怕的东西。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "slip": {
    "en": "She then carried the slip of paper to a bowl of water, dunked it repeatedly, and rolled it between her front paws and against the sand until it formed a compact, gritty ball.",
    "cn": "然后，她把纸条拿到一碗水里，反复浸泡，用前爪在沙子上滚来滚去，直到它变成一个致密的沙砾球。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "slow": {
    "en": "The game barely slowed from a relentless pace as Arsenal dominated possession, but Chelsea counterattacked with speed and purpose.",
    "cn": "阿森纳占据控球优势，但切尔西以速度和目的性极强的反击相抗衡，场面几乎没有节奏放缓的时刻。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "significant": {
    "en": "Then a few weeks later, another significant headline - Pochettino had, a little surprisingly perhaps, signed for four more years with the USA.",
    "cn": "然后几周后，另一个重要的头条新闻-波切蒂诺与美国签订了四年的合同，也许有点令人惊讶。",
    "src": "Sky Sports · 2026-09-09"
  },
  "similar": {
    "en": "They looked through the resulting photos to determine that the short-eared rock-wallaby is not found at the sites, assuring them that its similar-looking DNA would not be confused with that of the nabarlek.",
    "cn": "他们查看了结果照片，确定短耳岩小袋鼠没有出现在这些地点，并向他们保证，短耳岩小袋鼠的相似DNA不会与纳巴莱克的DNA混淆。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "simple": {
    "en": "Tzolis played a simple ball in from the left flank that Havertz dummied, completely flummoxing Chelsea defender Wesley Fofana in the process.",
    "cn": "佐利斯从左路送出一脚简单的传球，哈弗茨机敏一漏，让切尔西后卫福法纳彻底被晃。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "simply": {
    "en": "Simply put, peptides are short chains of amino acids—the building blocks of proteins—that carry specific instructions to specific cells.",
    "cn": "简而言之，肽是氨基酸的短链（蛋白质的组成部分），可向特定细胞传递特定的指令。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "since": {
    "en": "Only Everton and Liverpool have placed less emphasis on investment in their backline than the Red Devils since 2022.",
    "cn": "自2022年以来，只有埃弗顿和利物浦比红魔更不重视投资。",
    "src": "Sky Sports · 2026-09-09"
  },
  "size": {
    "en": "These pint-size, critically endangered mammals—which reside only in Cozumel—are known for sifting through trash cans to scavenge for leftovers.",
    "cn": "这些只生活在科苏梅尔的极度濒危的小型哺乳动物以在垃圾桶里搜寻剩饭剩菜而闻名。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "six": {
    "en": "Twenty-six years later, a solution may have finally come to light—but it wasn’t a mathematician who came up with it.",
    "cn": "26年后，一个解决方案可能终于浮出水面——但提出它的不是数学家。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "situation": {
    "en": "He has deliberately given him some space because he knows it would have been a difficult situation.",
    "cn": "他故意给他一些空间，因为他知道这将是一个困难的局面。",
    "src": "Sky Sports · 2026-09-09"
  },
  "sit": {
    "en": "They date back to about 68 million years ago, when the site, sitting at between 55 degrees and 60 degrees south latitude, had a climate comparable to New York City today, Zelenitsky tells Emily Chung at the Canadian Broadcasting Corporation.",
    "cn": "他们可以追溯到大约6800万年前，当时该遗址位于南纬55度至60度之间，气候与今天的纽约市相当，Zelenitsky告诉加拿大广播公司的Emily Chung。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "single": {
    "en": "At the British Museum, for the first time in decades – possibly in its history – the Tapestry is being displayed in a single length, lying flat, providing the most intimate perspective since it was first put on permanent public display in 1842.",
    "cn": "在大英博物馆，这是几十年来——可能是它的历史上——第一次以单一的长度平放，提供了自1842年首次永久公开展出以来最亲密的视角。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "site": {
    "en": "The site is known for a Roman-era cemetery that dates back to the fourth or fifth century C.E.",
    "cn": "该遗址以罗马时代的墓地而闻名，其历史可追溯到公元四或五世纪。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "smooth": {
    "en": "So, in its simplest terms, the problem is a yes or no question—to solve it, one must either prove that the equations always result in smooth solutions or find one specific situation where they don’t.",
    "cn": "所以，用最简单的术语来说，这个问题是一个“是”或“否”的问题——要解决它，你必须要么证明这些方程总是得到平滑的解，要么找到一个它们不是平滑解的特定情况。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "son": {
    "en": "There he found the name of his great uncle, Bishen Singh, son of Jatti.",
    "cn": "在那里，他找到了他的叔祖父，贾蒂的儿子毕申·辛格的名字。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "soon": {
    "en": "Soon, the researchers will use radiocarbon dating to figure out the skeleton’s exact age.",
    "cn": "很快，研究人员将使用放射性碳年代测定来确定骨骼的确切年龄。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sort": {
    "en": "I look at the sort of best back three probably that I ever saw which was the Juventus and Italy back three with Andrea Barzagli, Leonardo Bonucci and Giorgio Chiellini -- three real giants.",
    "cn": "我想到我见过的最佳三中卫组合——尤文图斯和意大利队的巴尔扎利、博努奇和基耶利尼——三个真正的高塔。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "sound": {
    "en": "Yes, I realise I sound like your grandpa right now.",
    "cn": "是的，我知道我现在听起来像你的爷爷。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "spanish": {
    "en": "Chelsea and Madrid are reportedly interested in the Spanish international, 27.",
    "cn": "据报道，切尔西和马德里对这名27岁的西班牙国脚很感兴趣。",
    "src": "Sky Sports · 2026-09-10"
  },
  "something": {
    "en": "There was Trump, FIFA and Folarin Balogun's suspension of his suspension, and along the way, Pochettino became something of a fashion icon.",
    "cn": "特朗普、国际足联和Folarin Balogun暂停了他的停赛，一路上，波切蒂诺成为了一个时尚偶像。",
    "src": "Sky Sports · 2026-09-09"
  },
  "space": {
    "en": "The Germany international's dummy gave Ødegaard the space and time to fire home Arsenal's crucial second goal.",
    "cn": "这位德国国脚的一漏，给厄德高赢得了空间和时间，让他打进了阿森纳关键的第二球。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "southern": {
    "en": "The grave was discovered at an archaeological site near Żórawina, in southern Poland.",
    "cn": "这座坟墓是在波兰南部Żórawina附近的一个考古遗址发现的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "south": {
    "en": "“We know their bones have turned up in places as far south as Antarctica and southern Argentina, and as far north as Mongolia and Texas,” says Darla Zelenitsky, a study co-author and paleontologist at the University of Calgary in Canada, to Katie Hunt at CNN.",
    "cn": "加拿大卡尔加里大学的研究合著者和古生物学家Darla Zelenitsky对CNN的Katie Hunt说：“我们知道他们的骨头出现在南极洲和阿根廷南部，以及蒙古和德克萨斯州的北部。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "source": {
    "en": "As part of his HistoryExtra Academy series on the embroidery, Dr David Musgrove examines the history of the tapestry, the story it tells, who made it and whether it's reliable as a historical source…",
    "cn": "作为他关于刺绣的历史系列的一部分，大卫·马斯格罗夫博士研究了挂毯的历史，它讲述的故事，它的制造者，以及它作为历史来源是否可靠…",
    "src": "HistoryExtra · 2026-09-09"
  },
  "someone": {
    "en": "Instead, he wanted to focus on “someone history never named at all: a farmer, the first man to raise his hand in Essex.",
    "cn": "相反，他想专注于“一个从未命名过的历史人物：一个农民，第一个在埃塞克斯举手的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "somehow": {
    "en": "The scooped pass to release Ben White for the golden chance somehow spurned by Piero Hincapie was one of many examples of his ingenuity against the massed ranks of Napoli players but there were plenty of others.",
    "cn": "皮耶罗·辛卡皮（Piero Hincapie）以某种方式拒绝了释放本·怀特（Ben White）的黄金机会，这是他对那不勒斯球员群体的聪明才智的众多例子之一，但还有很多其他例子。",
    "src": "Sky Sports · 2026-09-09"
  },
  "social": {
    "en": "“The general pattern seems to be that with wealth and rising power, you become less engaged with the needs of others and less burdened by the needs of social relationships,” study co-author Paul Piff, a social psychologist at the University of California, Irvine, tells the Guardian ’s Ian Sample.",
    "cn": "研究报告的共同作者、加州大学欧文分校的社会心理学家保罗·皮夫（Paul Piff）告诉《卫报》的伊恩·样本（Ian Sample）：“一般的模式似乎是，随着财富和权力的不断崛起，你对他人的需求的参与度降低，而对社会关系的需求的负担减轻。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "soccer": {
    "en": "The team watched the siblings play “soccer” with each other and their mother, and in one instance, with two juvenile Cozumel dwarf coatis.",
    "cn": "研究小组观察了这对兄弟姐妹和它们的母亲一起踢“足球”，有一次，他们还和两只科苏梅尔矮长鼻浣熊幼崽一起踢足球。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "society": {
    "en": "Looking at fossilized titanosaur eggs found in southern Argentina’s Chorrillo Formation, a study published in the journal Royal Society Open Science today offers a new understanding of how dinosaurs survived and reproduced so far from the equator.",
    "cn": "通过观察在阿根廷南部Chorrillo地层中发现的泰坦龙蛋化石，今天发表在《皇家学会开放科学》杂志上的一项研究为恐龙如何在远离赤道的地方生存和繁殖提供了新的认识。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "soft": {
    "en": "Known for soft-focus portraits of women and girls, like Coco Reading and A Girl With a Watering Can (1876), the artist left Paris for the warmer climate of southern France at the advice of doctors treating his rheumatoid arthritis.",
    "cn": "这位艺术家以柔和的女性和女孩肖像而闻名，如《读书的可可》和《拿水壶的女孩》（1876），他听从医生的建议，离开巴黎前往气候温暖的法国南部，治疗他的风湿性关节炎。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "some": {
    "en": "Some of Gacy’s paintings featured in the exhibition, on show for the first time, come from people who knew him personally.",
    "cn": "展览中首次展出的盖西的一些画作来自认识他的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "solve": {
    "en": "In their absence, Xabi Alonso paired Reece James with Romeo Lavia, but even when Caicedo returns to fitness, the Chelsea manager has a puzzle to solve before settling on his best midfield two.",
    "cn": "在两人缺阵的情况下，阿隆索让里斯·詹姆斯和拉维亚搭档，但即便凯塞多伤愈复出，主帅也要面对如何确定中场双后腰的问题。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "solution": {
    "en": "We’re sharing a solution to the Navier-Stokes Millennium Prize Problem, one of the deepest problems at the frontier of mathematics.",
    "cn": "我们正在分享一个解决纳维-斯托克斯千年奖问题的方法，这是数学前沿最深奥的问题之一。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "solid": {
    "en": "They don't look solid, they look like they're a little bit all over the place.",
    "cn": "他们现在看上去一点也不稳当，给人感觉乱成一团。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "soil": {
    "en": "“Buried in sand, soil, or vegetation, the nest would stay humid or damp enough for the eggs to survive,” says Zelenitsky.",
    "cn": "Zelenitsky说：“巢穴被埋在沙子、土壤或植被中，会保持潮湿或潮湿，足以让卵子存活下来。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "spark": {
    "en": "But the feat has also sparked a controversy: While the Navier-Stokes problem may have been solved by A.I., the achievement has become contentious because of a possible association with the work of two human researchers—one of whom is employed by OpenAI’s rival company Anthropic.",
    "cn": "但这一成就也引发了争议：虽然纳维-斯托克斯问题可能是由人工智能解决的，但这一成就引发了争议，因为它可能与两名人类研究人员的工作有关，其中一名研究人员受雇于OpenAI的竞争对手Anthropic公司。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "sign": {
    "en": "When Rogers signed with Chelsea, he declared he was joining the biggest team in London.",
    "cn": "罗杰斯加盟切尔西时曾说，他加盟的是伦敦最大的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "seek": {
    "en": "Richarlison is seeking to terminate his contract at Tottenham after being left out of their Premier League squad.",
    "cn": "在被排除在英超大名单之外后，理查利森正在寻求终止他在热刺的合同。",
    "src": "Sky Sports · 2026-09-10"
  },
  "seem": {
    "en": "Premier League teams seem like they've forgotten what their wingers are supposed to do.",
    "cn": "但英超球队似乎已经忘了他们的边锋本该做什么。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "selection": {
    "en": "It will be tougher against rivals Manchester City on Sunday - but so will his team selection.",
    "cn": "周日对阵对手曼城的比赛将更加艰难，但他的阵容选择也将更加艰难。",
    "src": "Sky Sports · 2026-09-08"
  },
  "self": {
    "en": "But within the last few years, peptides have become a much broader phenomenon, not just taken for self-optimization but for treating chronic pain and various other conditions.",
    "cn": "但在过去几年中，多肽已成为一种更广泛的现象，不仅用于自我优化，还用于治疗慢性疼痛和各种其他疾病。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sell": {
    "en": "Barcelona are looking to sell Frenkie de Jong when the January transfer window opens.",
    "cn": "巴塞罗那希望在1月转会窗口打开时出售Frenkie de Jong。",
    "src": "Sky Sports · 2026-09-09"
  },
  "send": {
    "en": "His shot comes in but Steward sends it out for a corner.",
    "cn": "他的投篮进来了，但Steward将其发送到角落。",
    "src": "Sky Sports · 2026-09-09"
  },
  "senior": {
    "en": "“This is very exciting and great news for the species,” Larissa Potter, a senior field ecologist with the Australian Wildlife Conservancy, says in a statement.",
    "cn": "澳大利亚野生动物保护协会的资深野外生态学家拉里萨·波特在一份声明中说：“这对这个物种来说是非常令人兴奋和伟大的消息。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "sense": {
    "en": "The bubonic plague contributed to a growing sense of dissatisfaction in the country in the mid-14th century.",
    "cn": "在14世纪中叶，腺鼠疫导致了该国日益增长的不满情绪。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "serve": {
    "en": "Anecdotally, he knew a record had been kept of every man that served in the First World War from Punjab, where his family were from.",
    "cn": "有趣的是，他知道有一份记录保存着每一个在第一次世界大战中服役的人都来自旁遮普，他的家人来自那里。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "series": {
    "en": "Within four years, it would become the setting of Christie’s most famous novel: the tenth installment in her Hercule Poirot series, Murder on the Orient Express.",
    "cn": "四年之内，这里成为了克里斯蒂最著名的小说：她的赫尔克里·波洛系列的第十部《东方快车谋杀案》的背景。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "september": {
    "en": "The Bayeux Tapestry exhibition opened at the Sainsbury Exhibitions Gallery at the British Museum on 10 September 2026 and will run until 11 July 2027.",
    "cn": "贝叶挂毯展览于2026年9月10日在大英博物馆的塞恩斯伯里展览馆开幕，将持续到2027年7月11日。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "separately": {
    "en": "It is some 68m long and is composed of several panels that were produced separately and then eventually sewn together to form one long whole.",
    "cn": "它长约68米，由几块面板组成，这些面板分别生产，然后最终缝合在一起形成一个长整体。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "separate": {
    "en": "In the burial mound’s deeper layers, researchers found a nearly complete adult male skeleton, fragments of two separate adult skulls, amber beads that might have been jewelry, a cutting tool made of flint and an ax of greenish serpentinite.",
    "cn": "在坟丘的深层，研究人员发现了一个几乎完整的成年男性骨骼，两个独立的成年头骨的碎片，可能是珠宝的琥珀珠，一个由燧石制成的切割工具和一把绿色蛇纹石斧头。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sentence": {
    "en": "Gacy was sentenced to death in 1980, though he spent the next 14 years appealing his sentence.",
    "cn": "盖西于1980年被判处死刑，尽管他花了接下来的14年时间对他的判决提出上诉。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "set": {
    "en": "McAlear beats McGregor and sets up Steven, but his effort is straight at Celtic keeper Johnstone.",
    "cn": "McAlear击败了McGregor并设置了Steven ，但他的努力是直接在凯尔特人守门员Johnstone。",
    "src": "Sky Sports · 2026-09-09"
  },
  "see": {
    "en": "They’ll see the typescript of Christie’s unpublished short story “ The House of Beauty,” which she wrote at age 18.",
    "cn": "他们将看到克里斯蒂未发表的短篇小说《美丽之家》（the House of Beauty）的打字稿，这是她18岁时写的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "secure": {
    "en": "Report as Celtic beat St Johnstone 1-0 at McDiarmid Park; Mika Baur scores his first Hoops goal to secure the victory; Martin O'Neill's side have won all six of their Scottish Premiership games this season",
    "cn": "报道称，凯尔特人在麦克迪尔米德公园以1比0击败圣约翰斯通；米卡·鲍尔打进了他的第一个篮球进球，以确保胜利；马丁·奥尼尔的球队本赛季赢得了苏格兰超级联赛的所有六场比赛",
    "src": "Sky Sports · 2026-09-09"
  },
  "school": {
    "en": "Curators are hosting talks and special events throughout the exhibition run, while a programme of activities for schools and families ensures the Tapestry’s story reaches the widest possible audience.",
    "cn": "策展人在整个展览期间举办讲座和特别活动，同时为学校和家庭举办活动，确保挂毯的故事尽可能多地吸引观众。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "science": {
    "en": "Sara Hashemi is a science writer and fact-checker currently based in New York City.",
    "cn": "Sara Hashemi是一位科学作家和事实核查员，目前居住在纽约市。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "scientific": {
    "en": "Between June 2022 and September 2024, they made 32 scientific dives to the Po, which they studied using high-resolution sonar surveys and 3D photography.",
    "cn": "在2022年6月至2024年9月期间，他们对Po进行了32次科学潜水，他们使用高分辨率声纳调查和3D摄影进行了研究。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "scientist": {
    "en": "Scientists, in turn, have developed synthetic copies or modified cousins of these peptides to use as medications.",
    "cn": "反过来，科学家们开发了这些肽的合成拷贝或修饰表亲，用作药物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "score": {
    "en": "But the hosts struck back with strikes from Kai Havertz and Martin Ødegaard -- and could have scored more.",
    "cn": "但主队凭借凯·哈弗茨和马丁·厄德高的进球反超比分——他们本可以进更多球。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "screen": {
    "en": "“This exhibition will take visitors back to Christie’s childhood and explore her journey to becoming an iconic writer, while celebrating how adaptations of her novels for stage and screen continue to enthrall audiences today, over 50 years after her death.”",
    "cn": "“这次展览将带参观者回到克里斯蒂的童年，探索她成为一名标志性作家的历程，同时庆祝她的小说被改编成舞台和银幕，在她去世50多年后的今天，如何继续吸引观众。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "sea": {
    "en": "Fewer than 200 mature individuals roam the island in the Caribbean Sea, off the east coast of the Yucatán Peninsula.",
    "cn": "不到200只成年个体在Yucatán半岛东海岸的加勒比海岛屿上游荡。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "section": {
    "en": "In the final section, visitors will be transported to London’s 1950s West End and examine how the novelist adapted her stories for the stage.",
    "cn": "在展览的最后一部分，参观者将被带到20世纪50年代的伦敦西区，并研究这位小说家是如何将她的故事改编成舞台的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "second": {
    "en": "After 77 seconds here, the Blues looked like they had made the right call as Rogers fired the visitors ahead.",
    "cn": "开场 77 秒之后，罗杰斯为客队先拔头筹，蓝军看上去做出了正确选择。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "season": {
    "en": "Sesko scored after coming off the bench against Everton and looked sharp here in his first start of the season.",
    "cn": "在对阵埃弗顿的比赛中，塞斯科替补出场，他在本赛季的第一次首发中表现出色。",
    "src": "Sky Sports · 2026-09-08"
  },
  "search": {
    "en": "Chelsea mustered little in search of an equaliser before David Raya was forced into a fine late save from substitute Estêvão.",
    "cn": "切尔西没有组织起像样的反扑，倒是替补出场的埃斯特旺在最后阶段的射门迫使大卫·拉亚做出精彩扑救。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "seal": {
    "en": "Additionally, researchers observed a rare Mediterranean monk seal resting in the vessel—the first sighting of the endangered species in Vlora Bay since 1996.",
    "cn": "此外，研究人员观察到一只罕见的地中海僧海豹在船上休息，这是自1996年以来首次在Vlora湾发现这种濒危物种。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "setting": {
    "en": "In the first of five sections, library-goers will explore the quintessential setting of many of Christie’s works, the English country house, and get a glimpse of a developing writer.",
    "cn": "在五个部分的第一部分，图书馆的读者将探索克里斯蒂许多作品的典型背景，英国乡村别墅，并瞥见一个发展中的作家。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "settle": {
    "en": "In their absence, Xabi Alonso paired Reece James with Romeo Lavia, but even when Caicedo returns to fitness, the Chelsea manager has a puzzle to solve before settling on his best midfield two.",
    "cn": "在两人缺阵的情况下，阿隆索让里斯·詹姆斯和拉维亚搭档，但即便凯塞多伤愈复出，主帅也要面对如何确定中场双后腰的问题。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "ship": {
    "en": "The ships cross the Channel and the Norman army establishes itself on English soil.",
    "cn": "船队越过英吉利海峡，诺曼军队在英国领土上建立了自己的军队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "shoot": {
    "en": "A comet shoots through the sky, which is deemed to be a bad omen for Harold.",
    "cn": "一颗彗星划过天空，这被认为是哈罗德的不祥之兆。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "short": {
    "en": "They’ll see the typescript of Christie’s unpublished short story “ The House of Beauty,” which she wrote at age 18.",
    "cn": "他们将看到克里斯蒂未发表的短篇小说《美丽之家》（the House of Beauty）的打字稿，这是她18岁时写的。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "shot": {
    "en": "Arsenal had 26 shots in total - their most on record (since 2003/04) in the competition.",
    "cn": "阿森纳总共投篮26次，这是他们在比赛中最多的纪录（自2003/04赛季以来）。",
    "src": "Sky Sports · 2026-09-09"
  },
  "should": {
    "en": "It should have been much bigger - in a really tough environment, a really tough opponent.",
    "cn": "它应该更大-在一个非常艰难的环境中，一个非常艰难的对手。",
    "src": "Sky Sports · 2026-09-09"
  },
  "shoulder": {
    "en": "\"Last year, to have two shoulder injuries like he did, then a MCL injury he did, it's never easy.",
    "cn": "“去年，像他一样有两个肩膀受伤，然后是他的MCL受伤，这从来都不容易。",
    "src": "Sky Sports · 2026-09-09"
  },
  "sight": {
    "en": "It is still early in the season, but Arteta will be encouraged by the sight of his coaching coming to the fore in open play.",
    "cn": "赛季才刚刚开始，但阿尔特塔看到球队在运动战中也能展现自己的战术思路，应该会感到欣慰。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "side": {
    "en": "Unsurprisingly, Pochettino chooses his words carefully, focusing on the support and backing Trump gave the side.",
    "cn": "不出所料，波切蒂诺谨慎地选择了他的话，专注于特朗普的支持和支持。",
    "src": "Sky Sports · 2026-09-09"
  },
  "show": {
    "en": "Some of Gacy’s paintings featured in the exhibition, on show for the first time, come from people who knew him personally.",
    "cn": "展览中首次展出的盖西的一些画作来自认识他的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "shift": {
    "en": "This secretive and rarely seen creature, called the nabarlek, is endangered, put at risk by shifting fire regimes and introduced predators.",
    "cn": "这种神秘而罕见的生物，被称为纳巴莱克，是濒临灭绝的，由于火灾制度的改变和掠食者的引入而处于危险之中。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "shame": {
    "en": "It was a shame because we missed so many big chances.",
    "cn": "太可惜了，因为我们错过了这么多大好机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "several": {
    "en": "It is some 68m long and is composed of several panels that were produced separately and then eventually sewn together to form one long whole.",
    "cn": "它长约68米，由几块面板组成，这些面板分别生产，然后最终缝合在一起形成一个长整体。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "seven": {
    "en": "They have conceded seven goals in three league games this season, and that is way too many for a team with title ambitions.",
    "cn": "本赛季前 3 轮 联赛他们已经丢了 7 球，这对一支志在夺冠的球队来说实在太多。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "share": {
    "en": "We’re sharing a solution to the Navier-Stokes Millennium Prize Problem, one of the deepest problems at the frontier of mathematics.",
    "cn": "我们正在分享一个解决纳维-斯托克斯千年奖问题的方法，这是数学前沿最深奥的问题之一。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "shelter": {
    "en": "The findings suggest that the Po has transformed into an artificial reef, providing habitat and shelter for a diverse range of marine life.",
    "cn": "研究结果表明，Po已经变成了一个人工珊瑚礁，为各种海洋生物提供了栖息地和庇护所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sheet": {
    "en": "And, this isn't a promoted side accidentally stumbling into three clean sheets.",
    "cn": "而且，这不是一支升班马不小心三次失球的球队。",
    "src": "Sky Sports · 2026-09-10"
  },
  "shape": {
    "en": "In Bayeux between 1983 and 2025, it was shown in a U-shaped case.",
    "cn": "在1983年至2025年的巴叶，它被展示在一个u形的盒子里。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "she": {
    "en": "Nicola Tallis explores Elizabeth I’s early years to reveal how her formative experiences influenced the monarch she later became",
    "cn": "尼古拉·塔利斯探索了伊丽莎白一世的早年生活，揭示了她的成长经历是如何影响她后来成为君主的",
    "src": "HistoryExtra · 2026-09-09"
  },
  "sharp": {
    "en": "Sesko scored after coming off the bench against Everton and looked sharp here in his first start of the season.",
    "cn": "在对阵埃弗顿的比赛中，塞斯科替补出场，他在本赛季的第一次首发中表现出色。",
    "src": "Sky Sports · 2026-09-08"
  },
  "speak": {
    "en": "\"You can feel when you speak with him, the energy, the passion about football.",
    "cn": "“当你和他交谈时，你能感受到他对足球的能量和激情。",
    "src": "Sky Sports · 2026-09-10"
  },
  "sum": {
    "en": "The state of winger play in 2026 is best summed up by Manchester City's move for Iliman Ndiaye.",
    "cn": "2026 年边锋生态的最好写照，就是曼城签下伊利曼·恩迪亚耶。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "summer": {
    "en": "The summer signing has four assists to his name already, with three of those coming for Odegaard goals, including the winner in Naples.",
    "cn": "夏季签约已经有四次助攻，其中三次是Odegaard进球，包括那不勒斯的冠军。",
    "src": "Sky Sports · 2026-09-09"
  },
  "sunday": {
    "en": "Chelsea took the lead early on at the Premier League champions on Sunday through Morgan Rogers.",
    "cn": "周日做客英超卫冕冠军的比赛中，切尔西凭借摩根·罗杰斯的闪击早早取得领先。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "sunrise": {
    "en": "The burglars entered Cagnes-sur-Mer’s Renoir Museum, housed in the estate where the famed Impressionist spent the last decade of his life, before sunrise this morning.",
    "cn": "在今天早晨日出之前，窃贼进入了梅尔河畔卡涅的雷诺阿博物馆，该博物馆位于著名印象派画家雷诺阿度过生命最后十年的地方。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "super": {
    "en": "A triple header on Sky Sports then follows on Super Sunday on December 27, with Frank Lampard taking on Chelsea as Coventry boss at 2pm.",
    "cn": "天空体育将在12月27日的超级星期日上演三场头球，兰帕德将在下午2点作为考文垂主帅迎战切尔西。",
    "src": "Sky Sports · 2026-09-10"
  },
  "surprising": {
    "en": "Organized by the company Improbable Research, the spoof awards were designed to “honor achievements so surprising that they make people laugh, then think,” per their website.",
    "cn": "这些欺骗性奖项由Improbable Research公司组织，旨在“表彰令人惊讶的成就，让人们发笑，然后思考”，根据他们的网站。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "surprise": {
    "en": "“It shouldn’t be surprising that raccoons are where we’re seeing this, just because they’re so tactile; they see with their hands,” she tells New Scientist ’s Matt von Hippel.",
    "cn": "“浣熊出现在我们看到的地方并不奇怪，因为它们有很强的触觉；他们用手看东西，”她告诉《新科学家》的马特·冯·希佩尔。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "surgery": {
    "en": "Rangers summer signing Daisuke Yokota - who was ruled out of the St Mirren game through injury - is also set to undergo surgery and the Japanese winger is also facing a lengthy period out.",
    "cn": "流浪者队夏季签约横田大辅-因受伤被排除在圣米伦比赛之外-也将接受手术，这位日本边锋也面临着漫长的时期。",
    "src": "Sky Sports · 2026-09-09"
  },
  "surface": {
    "en": "They found that sponges, sea squirts, mussels, oysters and algae covered most of the vessel’s surface, while amberjacks, sea bass, wrasse, scorpionfish, goby and other species of fish floated in and around the ship.",
    "cn": "他们发现，海绵、海鞘、贻贝、牡蛎和藻类覆盖了船舶的大部分表面，而琥珀杰克鱼、海鲈、皱纹鱼、蝎子鱼、高比鱼和其他鱼类则漂浮在船内和周围。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "suppose": {
    "en": "Premier League teams seem like they've forgotten what their wingers are supposed to do.",
    "cn": "但英超球队似乎已经忘了他们的边锋本该做什么。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "support": {
    "en": "Next, a constructed dig site will evoke Christie’s time spent photographing and supporting the work of archaeologists in the Middle East.",
    "cn": "接下来，一个已建成的挖掘地点将唤起克里斯蒂拍摄和支持中东考古学家工作的时间。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "sure": {
    "en": "The task for Alonso is clear -- tighten up at the back to make sure Chelsea push for the title.",
    "cn": "阿隆索的任务很明确——必须加强防守，才能让切尔西真正具备争冠实力。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "surprisingly": {
    "en": "Millions of years ago, during the late Cretaceous, some of the largest dinosaurs ever were laying eggs in surprisingly cold places.",
    "cn": "数百万年前，在白垩纪晚期，一些有史以来最大的恐龙在出奇寒冷的地方产卵。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "study": {
    "en": "An older study—with more alarming findings—won the Ig Nobel Economics Prize.",
    "cn": "一项具有更令人担忧的发现的较早研究获得了搞笑诺贝尔经济学奖。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "style": {
    "en": "Manchester United made a winning return to the Champions League as they beat Sabah FC in style with a 4-0 victory at Old Trafford.",
    "cn": "曼联在老特拉福德球场以4-0大胜沙巴队，成功重返欧冠赛场。",
    "src": "Sky Sports · 2026-09-08"
  },
  "subsequent": {
    "en": "Havertz's deft flick midway through the second half almost led to another, as Bukayo Saka's subsequent shot was brilliantly turned behind by Martinez.",
    "cn": "下半场中段，哈弗茨又一次轻巧的一蹭险些制造进球，布卡约·萨卡随后的射门被马丁内斯神扑化解。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "substitute": {
    "en": "Chelsea mustered little in search of an equaliser before David Raya was forced into a fine late save from substitute Estêvão.",
    "cn": "切尔西没有组织起像样的反扑，倒是替补出场的埃斯特旺在最后阶段的射门迫使大卫·拉亚做出精彩扑救。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "suffer": {
    "en": "After those two, there is England veteran Jordan Henderson, now 36, who is still sidelined with the broken wrist suffered when falling over an advertising board at the World Cup.",
    "cn": "除了他们两人之外，还有 36 岁的英格兰老将亨德森，他因在世界杯期间撞到广告牌手腕骨折，目前仍在养伤。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "suddenly": {
    "en": "A Palmer penalty turned the game on its head suddenly after Pep Chavarria was caught by Dan James, but it was Rogers who inspired the comeback, making four of Chelsea's six goals.",
    "cn": "佩普·查瓦里亚（Pep Chavarria）被丹·詹姆斯（Dan James）抓住后，帕尔默（Palmer）的点球突然扭转了局面，但正是罗杰斯（Rogers）激发了复出，在切尔西的六个进球中",
    "src": "Sky Sports · 2026-09-09"
  },
  "sudden": {
    "en": "\"Nobody was asking for it, all of a sudden their players came into the game.",
    "cn": "“没有人要求它，突然他们的球员进入了比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "suggest": {
    "en": "This has led some historians to suggest that the Tapestry was designed to be accompanied by a guide, who would have narrated the story to viewers as they walked along.",
    "cn": "这使得一些历史学家提出，挂毯的设计是由一个导游陪同的，他会在观众走过的时候向他们讲述故事。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "such": {
    "en": "OpenAI claims to have found one such “blowup” scenario, involving a vortex of fluid that spirals inward and becomes stretched out, like spaghetti.",
    "cn": "OpenAI声称已经发现了一个这样的“爆炸”场景，包括一个向内螺旋并伸展的流体漩涡，就像意大利面一样。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "succession": {
    "en": "The Gunners should have won by a bigger margin but missed a succession of chances before Odegaard crashed a low shot in off the post from the edge of the box following intricate build-up.",
    "cn": "枪手本应以更大的优势获胜，但错过了一系列机会，然后厄德高在错综复杂的积累后从禁区边缘击中了低射门。",
    "src": "Sky Sports · 2026-09-09"
  },
  "take": {
    "en": "The defending champions did take the lead after the break as Baur tapped in from Haissem Hassan's cross.",
    "cn": "休息后，卫冕冠军确实取得了领先，鲍尔从海塞姆·哈桑的十字架上踢了进来。",
    "src": "Sky Sports · 2026-09-09"
  },
  "tale": {
    "en": "Its ambiguous storytelling and sparse Latin captions leave much open to interpretation, making every visit a chance to discover new perspectives on this epic tale of conquest and change.",
    "cn": "它模棱两可的故事叙述和稀疏的拉丁字幕留下了很多可供解释的空间，使每次访问都有机会发现这个征服和变革的史诗故事的新视角。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "talk": {
    "en": "There was Donald Trump - there was always going to be - and the changing-room team talk.",
    "cn": "唐纳德·特朗普（Donald Trump）-总是会有-和更衣室团队的谈话。",
    "src": "Sky Sports · 2026-09-09"
  },
  "tap": {
    "en": "The defending champions did take the lead after the break as Baur tapped in from Haissem Hassan's cross.",
    "cn": "休息后，卫冕冠军确实取得了领先，鲍尔从海塞姆·哈桑的十字架上踢了进来。",
    "src": "Sky Sports · 2026-09-09"
  },
  "target": {
    "en": "Sunderland and Aston Villa summer striker target Kevin Viveros, is set to sign a new contract with Brazilian club Athletico Paranaense.",
    "cn": "桑德兰和阿斯顿维拉的夏季射手凯文·维维罗斯将与巴西帕拉纳斯竞技俱乐部签订一份新合同。",
    "src": "Sky Sports · 2026-09-10"
  },
  "task": {
    "en": "The task for Alonso is clear -- tighten up at the back to make sure Chelsea push for the title.",
    "cn": "阿隆索的任务很明确——必须加强防守，才能让切尔西真正具备争冠实力。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "tax": {
    "en": "It is over 1000 days since United competed in a Champions League game but this, their 300th in Europe's premier club competition, was not too taxing for Carrick's men.",
    "cn": "曼联已经1000多天没有参加欧冠比赛了，但这是他们在欧洲顶级俱乐部比赛中的第300场比赛，对卡里克的队员来说并不是太繁重。",
    "src": "Sky Sports · 2026-09-08"
  },
  "teenager": {
    "en": "Chelsea goalkeeper Emiliano Martinez is ex-Arsenal, winger Noni Madueke left Stamford Bridge to join Arsenal, and Declan Rice was released by the Blues as a teenager.",
    "cn": "切尔西门将马丁内斯是前阿森纳球员，边锋马杜埃凯从斯坦福桥转投阿森纳，赖斯则在少年时期就被切尔西放弃。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "team": {
    "en": "His team would feed him the ball, he'd keep beating his man, and then the cross would inevitably lead to nothing.",
    "cn": "队友不断给他喂球，他一次次过掉对手，最后这脚传中却总是毫无结果。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "technical": {
    "en": "What Ronaldo and Messi did -- and made everyone else realise -- is that you could take those same winger skills, the speed and technical brilliance, and turn it into something even better.",
    "cn": "C 罗和梅西所做的事情——也让所有人认识到——是同样的边锋技术、速度和天赋，可以演化成更可怕的东西。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "swear": {
    "en": "The tapestry does not explain precisely what the nature of the oath is, but other Norman-inclined sources tell us that Harold was swearing to be William’s man in England and to uphold his bid to be king on Edward’s death.",
    "cn": "挂毯上并没有准确地解释誓言的性质，但其他倾向于诺曼的资料告诉我们，哈罗德在英格兰发誓要做威廉的人，并在爱德华死后坚持他的王位。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "survive": {
    "en": "One of the medieval world’s greatest surviving treasures is now on display in London.",
    "cn": "中世纪世界现存最伟大的宝藏之一现在正在伦敦展出。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "survey": {
    "en": "As you survey the Tapestry, imagine how it might have been viewed in the 11th century.",
    "cn": "当你审视这幅挂毯时，想象一下在11世纪人们是如何看待它的。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "struggle": {
    "en": "It looked for all the world that Derek McInnes' side were set to be frustrated after struggling to break down a resolute St Mirren side who packed a punch of their own.",
    "cn": "它寻找德里克·麦金尼斯（Derek McInnes）的一方在努力打破一个坚定的圣米伦（St Mirren）方面之后会感到沮丧。",
    "src": "Sky Sports · 2026-09-09"
  },
  "table": {
    "en": "The Premiership newcomers were unbeaten at McDiarmid Park this season and had chances to take something, but the champions held on to stay five points clear of second-placed Rangers at the top of the table.",
    "cn": "英超新人本赛季在麦克迪尔米德公园保持不败，并有机会取得一些成绩，但冠军们保持着五分的优势，远离排名第二的流浪者队。",
    "src": "Sky Sports · 2026-09-09"
  },
  "system": {
    "en": "On Tuesday, OpenAI, the developer of ChatGPT, announced in a blog post that an “internal OpenAI system” had just found a solution to the longstanding puzzle.",
    "cn": "周二，ChatGPT的开发者OpenAI在一篇博客文章中宣布，一个“内部OpenAI系统”刚刚找到了解决这个长期难题的方法。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "spring": {
    "en": "This spring, thieves stole $10 million worth of paintings by Renoir, Henri Matisse and Paul Cézanne from an Italian museum.",
    "cn": "今年春天，窃贼从一家意大利博物馆偷走了价值1000万美元的雷诺阿（Renoir）、亨利·马蒂斯（Henri Matisse）和保罗·卡萨姆（Paul csamzanne）的画作。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "spur": {
    "en": "Fernandes made his feelings for De Zerbi clear to the Spurs boss himself when the deal was done.",
    "cn": "在交易完成后，费尔南德斯向热刺主帅表达了他对德泽比的感情。",
    "src": "Sky Sports · 2026-09-10"
  },
  "stadium": {
    "en": "LONDON -- Martin Ødegaard's 50th-minute strike ensured Arsenal came from behind to beat Chelsea 2-1 at Emirates Stadium on Sunday.",
    "cn": "伦敦——马丁·厄德高在第 50 分钟的劲射，确保阿森纳在周日酋长球场以 2-1 逆转击败切尔西。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "staff": {
    "en": "For Pochettino, the biggest takeaway is how much he and his coaching staff, including his long-term lieutenant Jesus Perez, have learned.",
    "cn": "对于Pochettino来说，最大的收获是他和他的教练组，包括他的长期副手Jesus Perez ，学到了多少东西。",
    "src": "Sky Sports · 2026-09-09"
  },
  "start": {
    "en": "The other is the gulf in quality between the starting XI and the team after changes are made.",
    "cn": "另一个是变更后首发XI和球队之间的质量差距。",
    "src": "Sky Sports · 2026-09-09"
  },
  "star": {
    "en": "Fernandes starred again and the sight of him combining with the equally intelligent Youri Tielemans for United's second was encouraging.",
    "cn": "费尔南德斯再次成为主力，他和同样聪明的蒂勒曼斯一起打进了曼联的第二个进球，这令人鼓舞。",
    "src": "Sky Sports · 2026-09-08"
  },
  "stand": {
    "en": "Celtic have the ball in the net but it won't stand.",
    "cn": "凯尔特人有球在网中，但它不会站立。",
    "src": "Sky Sports · 2026-09-09"
  },
  "stage": {
    "en": "With the departure of Salah from England and Messi and Ronaldo from the international stage, perhaps it's fitting.",
    "cn": "随着萨拉赫离开英格兰，梅西和 C 罗退出国际舞台，这种情况也在情理之中。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "spot": {
    "en": "Scientists also spotted squid egg clusters attached to the vessel.",
    "cn": "科学家们还发现了附着在船上的鱿鱼卵簇。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sport": {
    "en": "A triple header on Sky Sports then follows on Super Sunday on December 27, with Frank Lampard taking on Chelsea as Coventry boss at 2pm.",
    "cn": "天空体育将在12月27日的超级星期日上演三场头球，兰帕德将在下午2点作为考文垂主帅迎战切尔西。",
    "src": "Sky Sports · 2026-09-10"
  },
  "special": {
    "en": "The scale of the embroidery suggests that it was designed for a large audience, but the lighting in medieval buildings would have been dim, and the Tapestry may have been displayed only on special occasions, as was recorded in the 1476 inventory.",
    "cn": "刺绣的规模表明，它是为大量观众设计的，但中世纪建筑的照明可能会很昏暗，而且挂毯可能只在特殊场合展示，正如1476年库存中所记录的那样。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "specialist": {
    "en": "Take a deeper look into specialist positions and you find they are ninth in right-back depth and 18th at left-back, a position that is constantly being discussed due to Luke Shaw's injury history.",
    "cn": "深入研究专家位置，您会发现他们在右后卫深度排名第九，在左后卫排名第18 ，由于Luke Shaw的伤病史，这一位置不断被讨论。",
    "src": "Sky Sports · 2026-09-09"
  },
  "specialize": {
    "en": "“These are all original,” exhibition consultant John Borowski, a filmmaker and an author who specializes in serial killer histories, tells Fox 32 Chicago ’s Leslie Moreno.",
    "cn": "“这些都是原创的，”电影制片人兼作家约翰·博罗夫斯基（John Borowski）告诉福克斯32芝加哥的莱斯利·莫雷诺（Leslie Moreno）。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "specially": {
    "en": "For the first time, the Tapestry is being displayed flat and in one continuous length inside a specially constructed showcase, allowing visitors to appreciate its full scale and intricate detail as never before.",
    "cn": "这是挂毯第一次在一个特别建造的展柜里以一个连续的长度平面展示，让游客前所未有地欣赏它的完整尺寸和复杂的细节。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "specific": {
    "en": "So, in its simplest terms, the problem is a yes or no question—to solve it, one must either prove that the equations always result in smooth solutions or find one specific situation where they don’t.",
    "cn": "所以，用最简单的术语来说，这个问题是一个“是”或“否”的问题——要解决它，你必须要么证明这些方程总是得到平滑的解，要么找到一个它们不是平滑解的特定情况。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "speed": {
    "en": "Speed, physicality, ability to play on the last line and run in behind.",
    "cn": "速度，身体素质，在最后一条线上的能力，以及在后面奔跑的能力。",
    "src": "Sky Sports · 2026-09-08"
  },
  "spell": {
    "en": "We'll have spells, they'll have spells, it's just the way it is.",
    "cn": "我们有咒语，他们也有咒语，事情就是这样。",
    "src": "Sky Sports · 2026-09-10"
  },
  "spend": {
    "en": "Yet, said spending still hasn't built a unit that has genuine competition for places.",
    "cn": "然而，他说，支出仍然没有建立一个真正有竞争力的单位。",
    "src": "Sky Sports · 2026-09-09"
  },
  "sponge": {
    "en": "Chimpanzees are known to extract insects with sticks, for example, and dolphins forage with the help of sea sponges.",
    "cn": "例如，黑猩猩用棍棒提取昆虫，海豚在海绵的帮助下觅食。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "splash": {
    "en": "Underwear buried to test soil quality and urinals scientifically designed to prevent splashing were among the projects honoured as the Ig Nobel prizes again put a spotlight on the quirky side of science.",
    "cn": "埋葬以测试土壤质量的内衣和科学设计以防止飞溅的小便池是获得荣誉的项目之一，因为搞笑诺贝尔奖再次将焦点放在科学的古怪方面。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "state": {
    "en": "The flat presentation in London, requested by the French state, is designed to minimise stress on the fabric.",
    "cn": "应法国政府的要求，在伦敦的平面展示是为了尽量减少对织物的压力。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "statement": {
    "en": "“Her impact on crime fiction as a genre has been immense,” exhibition curator Lucy Rowland says in a statement from the library.",
    "cn": "“她对犯罪小说的影响是巨大的，”展览策展人露西·罗兰在图书馆的一份声明中说。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "stop": {
    "en": "\"I think if the 50,000 can be utilised and we can have the strength of performance in the team that will help the team, it will be difficult to stop.",
    "cn": "“我认为，如果这5万名球员能够得到充分利用，并且我们能够在球队中发挥作用，这将有助于球队，这将很难停止。",
    "src": "Sky Sports · 2026-09-10"
  },
  "story": {
    "en": "This story starts some 200 years ago, when Claude-Louis Navier and George Gabriel Stokes wrote equations to describe how fluids move.",
    "cn": "这个故事始于大约200年前，当时克劳德-路易斯·纳维尔和乔治·加布里埃尔·斯托克斯写了一些方程来描述流体的运动。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "straight": {
    "en": "McAlear beats McGregor and sets up Steven, but his effort is straight at Celtic keeper Johnstone.",
    "cn": "McAlear击败了McGregor并设置了Steven ，但他的努力是直接在凯尔特人守门员Johnstone。",
    "src": "Sky Sports · 2026-09-09"
  },
  "strategy": {
    "en": "Robert Reisz, a paleontologist at the University of Toronto who was not involved in the study, tells Ivan Semeniuk at the Globe and Mail that the study provides new insight on the dinosaurs' reproductive strategies.",
    "cn": "多伦多大学的古生物学家Robert Reisz没有参与这项研究，他告诉《环球邮报》的Ivan Semeniuk ，这项研究为恐龙的生殖策略提供了新的见解。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "strong": {
    "en": "Oliver Glanser's record against Unai Emery is an unusually strong tactical head-to-head that is more than just a cute statistic.",
    "cn": "奥利弗·格兰瑟对阵乌奈·埃梅里的记录是一场异常强大的肉搏战，而不仅仅是一个可爱的数据。",
    "src": "Sky Sports · 2026-09-10"
  },
  "stroke": {
    "en": "Pedro Neto hit the post on the stroke of halftime.",
    "cn": "佩德罗·内托在上半场读秒阶段击中门柱。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "string": {
    "en": "“Although the string or cord connecting them has not survived, there is no doubt that this was an ornament made by human hands.”",
    "cn": "“虽然连接它们的绳子或绳索没有存活下来，但毫无疑问，这是人手制作的装饰品。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "strike": {
    "en": "LONDON -- Martin Ødegaard's 50th-minute strike ensured Arsenal came from behind to beat Chelsea 2-1 at Emirates Stadium on Sunday.",
    "cn": "伦敦——马丁·厄德高在第 50 分钟的劲射，确保阿森纳在周日酋长球场以 2-1 逆转击败切尔西。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "stretch": {
    "en": "Excluding penalties, he has found the back of the net 11 times for Everton over that stretch.",
    "cn": "扣除点球，他在埃弗顿这段时间的英超进球只有 11 个。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "strength": {
    "en": "\"I think if the 50,000 can be utilised and we can have the strength of performance in the team that will help the team, it will be difficult to stop.",
    "cn": "“我认为，如果这5万名球员能够得到充分利用，并且我们能够在球队中发挥作用，这将有助于球队，这将很难停止。",
    "src": "Sky Sports · 2026-09-10"
  },
  "strictly": {
    "en": "Strictly speaking, the Tapestry is an embroidery – because the woollen threads of its design are stitched onto the linen backing cloth rather than being woven as one.",
    "cn": "严格来说，挂毯是一种刺绣，因为其设计的羊毛线是缝在亚麻底布上的，而不是织成一体的。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "stone": {
    "en": "Gralak says that Stone Age burial mounds typically belonged to patriarchs.",
    "cn": "格拉拉克说，石器时代的古墓通常属于族长。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "stay": {
    "en": "We don’t know what they talk about, but it’s presumably discussing his stay in Normandy.",
    "cn": "我们不知道他们谈了些什么，但大概是在讨论他在诺曼底的逗留。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "step": {
    "en": "\"We just want to make sure that we give ourselves a chance to be relevant domestically again in terms of winning trophies, and Sunday gives us a chance to take a step towards that.\"",
    "cn": "“我们只是想确保我们给自己一个在国内赢得奖杯的机会，周日给了我们一个朝着这个目标迈出一步的机会。",
    "src": "Sky Sports · 2026-09-10"
  },
  "stick": {
    "en": "Chimpanzees are known to extract insects with sticks, for example, and dolphins forage with the help of sea sponges.",
    "cn": "例如，黑猩猩用棍棒提取昆虫，海豚在海绵的帮助下觅食。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "steward": {
    "en": "Hogh lays the ball off to Hassan but his curling effort is pushed past by Steward.",
    "cn": "Hogh将球交给了Hassan ，但他的冰壶努力被Steward推倒了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "still": {
    "en": "Despite that frailty, former Manchester United defender Neville still believes Chelsea can challenge for the title.",
    "cn": "尽管防线脆弱，前曼联后卫内维尔依然认为切尔西具备争冠实力。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "commit": {
    "en": "The sample size is small but there seems more aggression and pressing about Brentford this season with a rise in their high turnovers per 90 of 3.1 and 6.2 more fouls committed per 90.",
    "cn": "样本规模很小，但本赛季布伦特福德似乎更具侵略性和压力，他们每90分钟的最高失误增加了3.1次，每90分钟的犯规增加了6.2次。",
    "src": "Sky Sports · 2026-09-10"
  },
  "company": {
    "en": "Mauricio Pochettino has always been good company - warm, engaging and likeable.",
    "cn": "Mauricio Pochettino一直是好伙伴--热情、迷人、可爱。",
    "src": "Sky Sports · 2026-09-09"
  },
  "comparison": {
    "en": "He says the closest comparison is a necklace unearthed in Wojkowice, composed of just four teeth and dating to the Bronze Age.",
    "cn": "他说，最接近的比较是在Wojkowice出土的项链，仅由四颗牙齿组成，可追溯到青铜时代。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "compete": {
    "en": "\"The way we competed, attitude, courage, the way we imposed ourselves on the game, the quality we showed to break them down, which is very difficult to do.",
    "cn": "“我们的竞争方式，态度，勇气，我们在比赛中强加给自己的方式，我们展示的打破他们的质量，这是非常困难的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "compose": {
    "en": "He says the closest comparison is a necklace unearthed in Wojkowice, composed of just four teeth and dating to the Bronze Age.",
    "cn": "他说，最接近的比较是在Wojkowice出土的项链，仅由四颗牙齿组成，可追溯到青铜时代。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "complete": {
    "en": "He's the only player on the list who didn't complete at least one take-on per 90 minutes.",
    "cn": "他是这份名单中唯一一个场均成功突破不到一次的球员。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "compile": {
    "en": "It is believed they were compiled for postwar pensions and other veterans’ benefits.",
    "cn": "据信，这些数据是为战后养老金和其他退伍军人福利编制的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "competition": {
    "en": "Yet, said spending still hasn't built a unit that has genuine competition for places.",
    "cn": "然而，他说，支出仍然没有建立一个真正有竞争力的单位。",
    "src": "Sky Sports · 2026-09-09"
  },
  "completely": {
    "en": "As yet, these peptides are “completely untested and unregulated,” says Deborah Doroshow, an oncologist and historian at Mount Sinai in New York.",
    "cn": "到目前为止，这些肽“完全未经测试和不受管制”，纽约西奈山的肿瘤学家和历史学家Deborah Doroshow说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "coach": {
    "en": "It is still early in the season, but Arteta will be encouraged by the sight of his coaching coming to the fore in open play.",
    "cn": "赛季才刚刚开始，但阿尔特塔看到球队在运动战中也能展现自己的战术思路，应该会感到欣慰。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "coast": {
    "en": "In 1941, enemy fire sank an Italian hospital ship off the coast of Albania.",
    "cn": "1941年，一艘意大利医院船在阿尔巴尼亚海岸附近沉没。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "coin": {
    "en": "Although Robert Ressler, an FBI investigator, is largely credited with having coined the term \"serial killer,\" Ernst Gennat of the Berlin Criminal Police used the German translation, \" serienm&ouml;rder,\" in a 1930 article.",
    "cn": "尽管联邦调查局调查员罗伯特·雷斯勒（Robert Ressler）在很大程度上创造了“连环杀手”一词，但柏林刑事警察局的恩斯特·根纳特（Ernst Gennat）在1930年的一篇文章中使用了德语翻译“serienmörder”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "cold": {
    "en": "Millions of years ago, during the late Cretaceous, some of the largest dinosaurs ever were laying eggs in surprisingly cold places.",
    "cn": "数百万年前，在白垩纪晚期，一些有史以来最大的恐龙在出奇寒冷的地方产卵。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "collapse": {
    "en": "Chelsea's plan was to replace Enzo with Monaco's Lamine Camara, but a deal for the Senegal international collapsed late on deadline day.",
    "cn": "切尔西原本计划用摩纳哥的卡马拉替代恩佐，但这位塞内加尔国脚的交易在转会截止日临近时告吹。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "colleague": {
    "en": "Zelenitsky and her colleagues then took a closer look at the pores on the eggshells using microscopes and micro-CT scanners.",
    "cn": "然后，Zelenitsky和她的同事们使用显微镜和微型CT扫描仪仔细观察了蛋壳上的毛孔。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "collect": {
    "en": "He had been blinded by sandstorms in Iraq; as a boy, Amandeep’s father had accompanied his uncle to Rupar in Ambala, in undivided India, to collect his army pension.",
    "cn": "他在伊拉克被沙尘暴弄瞎了眼睛；当阿曼迪普还是个孩子的时候，他的父亲曾陪同叔叔去印度未分裂的安巴拉的鲁帕尔领取他的军队养老金。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "collection": {
    "en": "The funky jewelry may have been a collection of hunting trophies or a gift.",
    "cn": "时髦的珠宝可能是一系列狩猎奖杯或礼物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "comfortable": {
    "en": "In a miss that would prove costly, the forward had time to pick his spot, but his effort was too close to the Rangers goalkeeper, who made a comfortable save.",
    "cn": "在一场代价高昂的失误中，前锋有时间选择自己的位置，但他的努力与流浪者队的守门员过于接近，后者进行了舒适的扑救。",
    "src": "Sky Sports · 2026-09-09"
  },
  "come": {
    "en": "By day, the species stays hidden from predators, and by night, it comes out to feed.",
    "cn": "白天，这个物种隐藏起来躲避捕食者，晚上，它出来觅食。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "combine": {
    "en": "Fernandes starred again and the sight of him combining with the equally intelligent Youri Tielemans for United's second was encouraging.",
    "cn": "费尔南德斯再次成为主力，他和同样聪明的蒂勒曼斯一起打进了曼联的第二个进球，这令人鼓舞。",
    "src": "Sky Sports · 2026-09-08"
  },
  "combination": {
    "en": "Arteta also highlighted how fresh combinations with team-mates are playing a part.",
    "cn": "Arteta还强调了与队友的新组合是如何发挥作用的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "conquest": {
    "en": "If so, the end panels might have shown William being crowned king of England, as that was the ultimate consequence of the Conquest.",
    "cn": "如果是这样，最后的镶板可能显示威廉被加冕为英格兰国王，因为这是征服的最终结果。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "conservation": {
    "en": "These results came back with positive news for conservation: The elusive nabarlek had been found.",
    "cn": "这些结果为自然保护带来了积极的消息：难以捉摸的纳巴莱克被发现了。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "consider": {
    "en": "“There’s something to be said about the mystery novel being something you can escape into,” publisher David Brawn told All Things Considered in 2020, on the 100th anniversary of the publication of Christie’s first book.",
    "cn": "2020年，在佳士得第一本书出版100周年之际，出版商大卫·布朗对《万物思虑》（All Things Considered）说：“悬疑小说是一种你可以逃避的东西。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "considerable": {
    "en": "Then we get to the battle of Hastings itself, which is portrayed in considerable detail.",
    "cn": "接下来是黑斯廷斯战役，书中对其进行了相当详细的描述。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "content": {
    "en": "This page contains HistoryExtra content provided by Google reCAPTCHA.",
    "cn": "此页面包含谷歌reCAPTCHA提供的额外内容。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "construct": {
    "en": "Next, a constructed dig site will evoke Christie’s time spent photographing and supporting the work of archaeologists in the Middle East.",
    "cn": "接下来，一个已建成的挖掘地点将唤起克里斯蒂拍摄和支持中东考古学家工作的时间。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "contain": {
    "en": "The problem, though, is that the 17-minute video contains almost every goal that Ndiaye has scored in the Premier League over the past two seasons.",
    "cn": "然而问题在于，这段 17 分钟的集锦几乎涵盖了他过去两个赛季在英超的全部进球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "comrade": {
    "en": "“I didn’t want to tell [this story] through the names we remember,” like rebel leader Wat Tyler (played by Cosmo Jarvis ) and his comrade, the bombastic priest John Ball (Jamie Bell), Greengrass says in a director’s statement.",
    "cn": "Greengrass在一份导演声明中说：“我不想通过我们记住的名字来讲述[这个故事] ，”就像叛军领导人Wat Tyler （由Cosmo Jarvis扮演）和他的同志，夸张的牧师John Ball （Jamie Bell）。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "concern": {
    "en": "The recipients of the Ig Nobel Chemistry Prize, however, conducted research concerning much smaller individuals: cockroaches.",
    "cn": "然而，Ig诺贝尔化学奖的获得者对更小的个体进行了研究：蟑螂。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "condemn": {
    "en": "But Arsenal hung on, condemning Xabi Alonso to his first defeat as Blues boss.",
    "cn": "阿森纳顶住了压力，让哈维·阿隆索尝到了执教切尔西以来的首场失利。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "condition": {
    "en": "The research highlights how dinosaurs adapted to environmental conditions, says Zelenitsky to the CBC.",
    "cn": "Zelenitsky向加拿大广播公司表示，这项研究突出了恐龙如何适应环境条件。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "confidence": {
    "en": "It will be more challenging against City's attack but Carrick and his players go into that with confidence restored.",
    "cn": "面对曼城的进攻会更有挑战性，但卡里克和他的球员们会恢复信心。",
    "src": "Sky Sports · 2026-09-08"
  },
  "conference": {
    "en": "\"First of all he needs to be available and last year he missed so many games through injuries,\" said Arteta when asked in his post-match press conference about Odegaard's improvement.",
    "cn": "“首先，他需要有空，去年他因伤缺席了很多比赛，”Arteta在赛后新闻发布会上被问及Odegaard的改进时说道。",
    "src": "Sky Sports · 2026-09-09"
  },
  "club": {
    "en": "It also follows consultation with the Football Supporters' Association and representatives from club Fan Advisory Boards.",
    "cn": "这也是在与足球支持者协会和俱乐部球迷顾问委员会的代表进行磋商之后做出的决定。",
    "src": "Sky Sports · 2026-09-10"
  },
  "central": {
    "en": "Running mostly from left to right, it tells the story in the style of a graphic novel across a central frieze, with short Latin captions.",
    "cn": "它主要从左到右，用图画小说的风格在中间的楣边讲述故事，配上简短的拉丁文字说明。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "centre": {
    "en": "Havertz might never have entirely convinced as a centre-forward -- which is partly why Chelsea were willing to move him out and Arsenal signed Viktor Gyökeres last summer.",
    "cn": "哈弗茨从未能彻底证明自己是一名合格的中锋——这也是切尔西愿意将他放走、阿森纳去年夏天签下维克托·约克雷斯的原因之一。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "century": {
    "en": "The bubonic plague contributed to a growing sense of dissatisfaction in the country in the mid-14th century.",
    "cn": "在14世纪中叶，腺鼠疫导致了该国日益增长的不满情绪。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "certain": {
    "en": "He looks certain to score but Johnstone palms over.",
    "cn": "他看起来肯定会得分，但约翰斯通手掌在身上。",
    "src": "Sky Sports · 2026-09-09"
  },
  "certainly": {
    "en": "“It’s certainly one of my proudest life achievements.”",
    "cn": "“这无疑是我一生中最自豪的成就之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "champion": {
    "en": "Odegaard was the match-winner again for Arsenal on Wednesday, thumping in the only goal of the game in the Champions League victory at Napoli.",
    "cn": "周三，厄德高再次成为阿森纳的取胜功臣，在那不勒斯的冠军联赛胜利中击败了比赛的唯一进球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "chance": {
    "en": "Pandur comes up on top in a one-on-one as Fraser spurns the chance of the game.",
    "cn": "Pandur在一对一的比赛中名列前茅，因为Fraser拒绝了比赛的机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "change": {
    "en": "The other is the gulf in quality between the starting XI and the team after changes are made.",
    "cn": "另一个是变更后首发XI和球队之间的质量差距。",
    "src": "Sky Sports · 2026-09-09"
  },
  "cheat": {
    "en": "Wealthier individuals were also more likely to lie at work and cheat during games.",
    "cn": "较富有的人也更有可能在工作中撒谎，在游戏中作弊。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "chase": {
    "en": "She began batting and chasing her creation across the ground.",
    "cn": "她开始在地上击球和追逐她的创作。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "characteristic": {
    "en": "The find may be linked to the Corded Ware culture, named for the twisted-rope impressions that are characteristic of its ceramic pottery.",
    "cn": "这一发现可能与Corded Ware文化有关，Corded Ware文化以陶瓷陶器特有的扭绳印记命名。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "channel": {
    "en": "The ships cross the Channel and the Norman army establishes itself on English soil.",
    "cn": "船队越过英吉利海峡，诺曼军队在英国领土上建立了自己的军队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "carriage": {
    "en": "An Orient Express -inspired train carriage will then highlight Christie’s penchant for “closed circle” mysteries and detail her globe-trotting adventures, including surfing in Hawaii.",
    "cn": "然后，一节以东方快车为灵感的火车车厢将突出克里斯蒂对“封闭圈子”之谜的嗜好，并详细介绍她的环球旅行经历，包括在夏威夷冲浪。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "carry": {
    "en": "In a 2016 study, scientists found that milk proteins from a species of cockroach that gives live birth carry three times as much energy as milk proteins from cows.",
    "cn": "在2016年的一项研究中，科学家们发现，一种活产蟑螂的乳蛋白所携带的能量是奶牛乳蛋白的三倍。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "case": {
    "en": "In Bayeux between 1983 and 2025, it was shown in a U-shaped case.",
    "cn": "在1983年至2025年的巴叶，它被展示在一个u形的盒子里。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "celebrate": {
    "en": "Former Manchester City playmaker Kevin De Bruyne appeared well placed to equalise when put through for a rare Napoli chance in the final few minutes, but wasted the chance by opting to cross, ensuring Arsenal could celebrate a victorious start to their European campaign and a fifth straight win of the season in all competitions.",
    "cn": "前曼城组织者凯文·德布鲁因（Kevin De Bruyne）在最后几分钟获得罕见的那不勒斯机会时，似乎处于很好的平衡位置，但由于选择交叉而浪费了这个机会，确保阿森纳能够庆祝他们的欧洲战役的胜利开局以及本赛季在所有比赛中的连续第五场胜利。",
    "src": "Sky Sports · 2026-09-09"
  },
  "cent": {
    "en": "In their last 16 league games where they've enjoyed less than 45 per cent of the ball and started the match bigger than 2/1, they've conceded just nine goals, losing just two of those games, with those matches averaging a lowly 1.7 goals per game ratio.",
    "cn": "在过去的16场联赛中，他们的控球率低于45%，开局比分大于2比1，他们只丢了9个球，只输了2场，这些比赛的场均进球率只有1.7个。",
    "src": "Sky Sports · 2026-09-10"
  },
  "cathedral": {
    "en": "It was first documented in a 1476 inventory of the treasures of Bayeux Cathedral, and it’s been in Bayeux ever since, bar a couple of brief sojourns elsewhere.",
    "cn": "它最早被记录在1476年巴叶大教堂的宝藏清单中，从那以后它就一直在巴叶，除了在其他地方短暂停留过几次。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "catch": {
    "en": "Catch up on the latest news with the Paper Talk podcast.",
    "cn": "通过Paper Talk播客了解最新消息。",
    "src": "Sky Sports · 2026-09-10"
  },
  "castle": {
    "en": "The exhibition dedicates displays to other local killers, including Holmes, who, as one of America’s first serial killers, used his “ Murder Castle ” hotel to claim victims’ lives during the 1893 Chicago World’s Fair.",
    "cn": "该展览致力于展示其他当地杀手，包括福尔摩斯，他作为美国最早的连环杀手之一，在1893年芝加哥世界博览会期间使用他的“谋杀城堡”酒店夺走了受害者的生命。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "class": {
    "en": "The Arsenal captain oozed class and confidence, demanding the ball then finding the gaps in Napoli's defence and threading passes forward.",
    "cn": "阿森纳队长渗出班级和自信，要求球然后找到那不勒斯的防守和线程向前传球的差距。",
    "src": "Sky Sports · 2026-09-09"
  },
  "clean": {
    "en": "\"I think it was kind of what we set out to achieve, good performance, individually and collectively throughout the game, the boys that started, the boys that came on pitch, clean sheet, goals, exciting football.",
    "cn": "“我认为这是我们想要达到的目标，在整场比赛中，无论是个人还是集体，都表现出色，小伙子们首发，小伙子们上场，零失球，进球，令人兴奋的足球。",
    "src": "Sky Sports · 2026-09-08"
  },
  "clear": {
    "en": "Fernandes made his feelings for De Zerbi clear to the Spurs boss himself when the deal was done.",
    "cn": "在交易完成后，费尔南德斯向热刺主帅表达了他对德泽比的感情。",
    "src": "Sky Sports · 2026-09-10"
  },
  "close": {
    "en": "The Tapestry’s borders are filled with animals, fables and mischievous details that invite close inspection.",
    "cn": "挂毯的边缘布满了动物、寓言和恶作剧的细节，需要仔细观察。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "climate": {
    "en": "They date back to about 68 million years ago, when the site, sitting at between 55 degrees and 60 degrees south latitude, had a climate comparable to New York City today, Zelenitsky tells Emily Chung at the Canadian Broadcasting Corporation.",
    "cn": "他们可以追溯到大约6800万年前，当时该遗址位于南纬55度至60度之间，气候与今天的纽约市相当，Zelenitsky告诉加拿大广播公司的Emily Chung。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "cliff": {
    "en": "On its strong hind legs, it hops around rocky outcrops, cliffs and crevices, using the rough pads on its feet to grip sheer rock.",
    "cn": "它用强壮的后腿在露出地面的岩石、悬崖和裂缝间跳跃，用脚上粗糙的脚垫抓住陡峭的岩石。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "city": {
    "en": "The state of winger play in 2026 is best summed up by Manchester City's move for Iliman Ndiaye.",
    "cn": "2026 年边锋生态的最好写照，就是曼城签下伊利曼·恩迪亚耶。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "childhood": {
    "en": "“This exhibition will take visitors back to Christie’s childhood and explore her journey to becoming an iconic writer, while celebrating how adaptations of her novels for stage and screen continue to enthrall audiences today, over 50 years after her death.”",
    "cn": "“这次展览将带参观者回到克里斯蒂的童年，探索她成为一名标志性作家的历程，同时庆祝她的小说被改编成舞台和银幕，在她去世50多年后的今天，如何继续吸引观众。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "chief": {
    "en": "US Open chief Craig Tiley has vowed to keep same day and night format despite Ben Shelton beating Carlos Alcaraz at 3.33am local time.",
    "cn": "尽管本·谢尔顿在当地时间凌晨3点33分击败卡洛斯·阿尔卡拉兹，但美网公开赛主席克雷格·泰利誓言将保持同样的昼夜赛制。",
    "src": "Sky Sports · 2026-09-10"
  },
  "circle": {
    "en": "An Orient Express -inspired train carriage will then highlight Christie’s penchant for “closed circle” mysteries and detail her globe-trotting adventures, including surfing in Hawaii.",
    "cn": "然后，一节以东方快车为灵感的火车车厢将突出克里斯蒂对“封闭圈子”之谜的嗜好，并详细介绍她的环球旅行经历，包括在夏威夷冲浪。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "chop": {
    "en": "Once inside the fortress, the insurgents exacted revenge on their enemies, dragging some of the kingdom’s most powerful men out to an execution block and chopping off their heads.",
    "cn": "一旦进入堡垒，叛乱分子就向他们的敌人进行报复，将一些王国最强大的人拖到处决区并砍下他们的头。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "choice": {
    "en": "Chelsea were without their first-choice midfield at the Emirates -- primarily because Enzo Fernández was offloaded in a £125 million transfer to Manchester City on deadline day, but also because of an injury to Moisés Caicedo.",
    "cn": "切尔西在酋长球场缺少主力中场——主要是因为恩佐·费尔南德斯在转会截止日以 1.25 亿英镑卖给了曼城，同时也因为凯塞多受伤。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "continue": {
    "en": "But it was another substitute who provided the decisive moment as Miovski produced a composed finish to ensure Rangers' momentum under McInnes continues.",
    "cn": "但这是另一位替补球员提供了决定性的时刻，因为Miovski创造了一个沉着的结局，以确保流浪者队在麦金尼斯的带领下继续保持势头。",
    "src": "Sky Sports · 2026-09-09"
  },
  "continuous": {
    "en": "For the first time, the Tapestry is being displayed flat and in one continuous length inside a specially constructed showcase, allowing visitors to appreciate its full scale and intricate detail as never before.",
    "cn": "这是挂毯第一次在一个特别建造的展柜里以一个连续的长度平面展示，让游客前所未有地欣赏它的完整尺寸和复杂的细节。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "departure": {
    "en": "With the departure of Salah from England and Messi and Ronaldo from the international stage, perhaps it's fitting.",
    "cn": "随着萨拉赫离开英格兰，梅西和 C 罗退出国际舞台，这种情况也在情理之中。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "depth": {
    "en": "They rank highest with their depth in forward areas.",
    "cn": "它们在前方区域的深度排名最高。",
    "src": "Sky Sports · 2026-09-09"
  },
  "describe": {
    "en": "This story starts some 200 years ago, when Claude-Louis Navier and George Gabriel Stokes wrote equations to describe how fluids move.",
    "cn": "这个故事始于大约200年前，当时克劳德-路易斯·纳维尔和乔治·加布里埃尔·斯托克斯写了一些方程来描述流体的运动。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "description": {
    "en": "And once scientists have detected a wallaby that fits the animal’s description, verifying that it’s the target species is no easy task, either.",
    "cn": "一旦科学家发现了符合动物描述的小袋鼠，验证它是目标物种也不是一件容易的事。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "design": {
    "en": "Key highlights include the Junius 11 manuscript, which influenced the Tapestry’s design.",
    "cn": "关键亮点包括影响挂毯设计的Junius 11手稿。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "develop": {
    "en": "In the first of five sections, library-goers will explore the quintessential setting of many of Christie’s works, the English country house, and get a glimpse of a developing writer.",
    "cn": "在五个部分的第一部分，图书馆的读者将探索克里斯蒂许多作品的典型背景，英国乡村别墅，并瞥见一个发展中的作家。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "determine": {
    "en": "They looked through the resulting photos to determine that the short-eared rock-wallaby is not found at the sites, assuring them that its similar-looking DNA would not be confused with that of the nabarlek.",
    "cn": "他们查看了结果照片，确定短耳岩小袋鼠没有出现在这些地点，并向他们保证，短耳岩小袋鼠的相似DNA不会与纳巴莱克的DNA混淆。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "detail": {
    "en": "The Tapestry’s borders are filled with animals, fables and mischievous details that invite close inspection.",
    "cn": "挂毯的边缘布满了动物、寓言和恶作剧的细节，需要仔细观察。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "deny": {
    "en": "The on-loan keeper produced a huge save to deny Joel Cotterill - on his first St Johnstone start - as the hosts enjoyed the best of the chances.",
    "cn": "这位租借守门员做出了巨大的挽救，否认了Joel Cotterill -在他的第一次圣约翰斯通开始时-因为房东们享受到了最好的机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "despite": {
    "en": "Despite the uncertainty around them, peptides have garnered a cult following.",
    "cn": "尽管存在不确定性，但多肽已经赢得了狂热的追随者。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "development": {
    "en": "“The metal sheets provide a hard substrate for marine life to grow on,” lead author Simone Modugno, a marine biologist with the Institute for Research, Development and Experimentation on the Environment and Territory, tells BBC Wildlife magazine ’s Helen Pilcher.",
    "cn": "“金属板为海洋生物的生长提供了坚硬的基础，”环境与领土研究、开发和实验研究所的海洋生物学家Simone Modugno告诉英国广播公司野生动物杂志的海伦·皮尔彻。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "decision": {
    "en": "With Marcus Rashford also available, and Cunha getting a confidence-boosting goal, there are some interesting decisions ahead for the United boss.",
    "cn": "拉什福德也可以上场，库尼亚也取得了一个提升信心的进球，曼联主帅将面临一些有趣的决定。",
    "src": "Sky Sports · 2026-09-08"
  },
  "declare": {
    "en": "When Rogers signed with Chelsea, he declared he was joining the biggest team in London.",
    "cn": "罗杰斯加盟切尔西时曾说，他加盟的是伦敦最大的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "defence": {
    "en": "Mika Baur scored his first Celtic goal as they extended the winning start to their latest Scottish Premiership title defence to six games.",
    "cn": "米卡·鲍尔（Mika Baur）打进了他的第一个凯尔特人进球，因为他们将获胜的开局扩展到他们最新的苏格兰超级联赛冠军防守，",
    "src": "Sky Sports · 2026-09-09"
  },
  "demand": {
    "en": "Experts say the peptide boom offers a window into a larger transformation in American health care: a shift from a market driven by diagnoses to one driven by demand, in which medicine is increasingly viewed as a consumer good—an Amazon-like product delivered to your doorstep.",
    "cn": "专家表示，多肽繁荣为美国医疗保健行业的更大转型提供了一个窗口：从由诊断驱动的市场转向由需求驱动的市场，在这个市场中，医药越来越被视为一种消费品--一种类似亚马逊的产品，送货上门。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "degree": {
    "en": "Yes, their expected goals numbers suggest they've ridden their luck to some degree - but this has been an impressive display of defensive organisation, which isn't a new trait.",
    "cn": "是的，他们的预期进球数表明他们在某种程度上依靠了运气——但这是一个令人印象深刻的防守组织展示，这并不是一个新特点。",
    "src": "Sky Sports · 2026-09-10"
  },
  "definitely": {
    "en": "\"He definitely offers a different kind of threat, that is the beauty of it really, we know what Ben gives us and there are not many who can give us what he gives us.",
    "cn": "“他绝对提供了一种不同的威胁，这就是它的美妙之处，我们知道本给了我们什么，没有几个人能给我们他给我们的。",
    "src": "Sky Sports · 2026-09-08"
  },
  "devise": {
    "en": "Displays spotlight personal belongings, investigative evidence, authentic artworks and other “murderabilia” that offer an uncanny peek into the lives of roughly 150 killers from dozens of countries who devised and committed unthinkable crimes.",
    "cn": "展示聚光灯下的个人物品、调查证据、真实的艺术品和其他“谋杀品”，让人们惊奇地窥见来自数十个国家的大约150名凶手的生活，这些凶手策划并犯下了不可思议的罪行。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "disclose": {
    "en": "According to a recent survey of over 500 physicians, nearly half said a patient had disclosed using an experimental peptide in the past year.",
    "cn": "根据最近对500多名医生的调查，近一半的患者表示在过去一年中曾使用实验肽进行披露。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "discover": {
    "en": "Its ambiguous storytelling and sparse Latin captions leave much open to interpretation, making every visit a chance to discover new perspectives on this epic tale of conquest and change.",
    "cn": "它模棱两可的故事叙述和稀疏的拉丁字幕留下了很多可供解释的空间，使每次访问都有机会发现这个征服和变革的史诗故事的新视角。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "discovery": {
    "en": "This jolly discovery has a poignant undertone.",
    "cn": "这一令人愉快的发现暗含着辛酸的意味。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "discuss": {
    "en": "We don’t know what they talk about, but it’s presumably discussing his stay in Normandy.",
    "cn": "我们不知道他们谈了些什么，但大概是在讨论他在诺曼底的逗留。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "discussion": {
    "en": "The action actually starts a couple of years before the set-piece battle of Hastings, with a discussion between England’s King, Edward the Confessor, and his leading noble (who was also his brother-in-law), Harold Godwinson.",
    "cn": "故事发生在黑斯廷斯战役前几年，英国国王忏悔者爱德华和他的贵族领袖（也是他的姐夫）哈罗德·戈德温森之间的讨论。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "disappear": {
    "en": "Most of the dominance disappeared as soon as the ball left the winger's foot.",
    "cn": "球一旦离开边锋的脚下，那种统治力就消失了。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "die": {
    "en": "Then Edward dies, and Harold is declared king by the English nobles.",
    "cn": "后来爱德华去世，哈罗德被英国贵族宣布为国王。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "difference": {
    "en": "With goal difference a potentially significant factor in the league phase of this Champions League format, this was a fine night's work on their return.",
    "cn": "在欧冠赛制的联赛阶段，净胜球是一个潜在的重要因素，这对他们的回归来说是一个美好的夜晚。",
    "src": "Sky Sports · 2026-09-08"
  },
  "different": {
    "en": "\"That's great that a lot of very different players got in those situations.",
    "cn": "“在这种情况下，很多不同的球员都得到了很好的表现。",
    "src": "Sky Sports · 2026-09-09"
  },
  "difficulty": {
    "en": "He talks about the importance of the smallest details, the difficulty of getting every decision right and the challenge of translating his ideas to a group of players who spend far less time together than a club side.",
    "cn": "他谈到了最小细节的重要性，做出正确决定的难度，以及将他的想法转化为一群在一起的时间远远少于俱乐部球员的球员所面临的挑战。",
    "src": "Sky Sports · 2026-09-09"
  },
  "director": {
    "en": "A new film by Paul Greengrass, a veteran director of tense action films including Captain Phillips and The Bourne Ultimatum, reimagines the Peasants’ Revolt from the perspectives of those who participated in it.",
    "cn": "保罗·格林格拉斯（Paul Greengrass）是包括《菲利普斯船长》（Captain Phillips）和《伯恩最后通牒》（The Bourne Ultimatum）在内的紧张动作电影的资深导演，他拍摄的一部新电影从参与者的角度重新构想了农民起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "directly": {
    "en": "Explosive athleticism, beguiling footwork, cannon-powered finishing, and lots of dribbling leading directly to goals.",
    "cn": "惊人的运动能力、华丽的脚下功夫、炮弹般的射门，加上大量突破直接转化为进球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "direction": {
    "en": "I'm as positive as I have been for three, four, five years about Chelsea, because I think they're going in the right direction.",
    "cn": "我对切尔西的态度比过去三、四、五年都要积极，因为我认为他们正在走在正确的方向上。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "difficult": {
    "en": "\"When you put together a team that hardly plays together, it is difficult to play at this level when [Leeds] are intense.\"",
    "cn": "“当你组建一支几乎无法一起比赛的球队时，当[利兹]非常激烈时，很难在这个级别上比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "digital": {
    "en": "Rachel Dinning is digital editor (engagement and video) at HistoryExtra",
    "cn": "雷切尔·丁宁是HistoryExtra的数字编辑（参与和视频）",
    "src": "HistoryExtra · 2026-09-09"
  },
  "care": {
    "en": "Why don't Premier League clubs care about goals anymore?",
    "cn": "为什么英超球队不再在乎进球数据？",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "december": {
    "en": "The first takes place between Tuesday December 29 and Wednesday December 30.",
    "cn": "第一次是在12月29日星期二到12月30日星期三之间。",
    "src": "Sky Sports · 2026-09-10"
  },
  "costly": {
    "en": "In a miss that would prove costly, the forward had time to pick his spot, but his effort was too close to the Rangers goalkeeper, who made a comfortable save.",
    "cn": "在一场代价高昂的失误中，前锋有时间选择自己的位置，但他的努力与流浪者队的守门员过于接近，后者进行了舒适的扑救。",
    "src": "Sky Sports · 2026-09-09"
  },
  "could": {
    "en": "Nottingham Forest could revive their interest in Tottenham midfielder Lucas Bergvall in January.",
    "cn": "诺丁汉森林可能会在一月份恢复他们对托特纳姆热刺中场球员卢卡斯·伯格瓦尔的兴趣。",
    "src": "Sky Sports · 2026-09-09"
  },
  "country": {
    "en": "After the country house, visitors will walk through a dispensary filled with various poisons that feature in Christie’s novels and learn about her work as a pharmacy dispenser during World War I.",
    "cn": "在乡村别墅之后，游客将穿过一个药房，里面摆满了克里斯蒂小说中出现的各种毒药，并了解她在第一次世界大战期间作为药房配药员的工作。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "couple": {
    "en": "It was first documented in a 1476 inventory of the treasures of Bayeux Cathedral, and it’s been in Bayeux ever since, bar a couple of brief sojourns elsewhere.",
    "cn": "它最早被记录在1476年巴叶大教堂的宝藏清单中，从那以后它就一直在巴叶，除了在其他地方短暂停留过几次。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "course": {
    "en": "The upshot of course is that King Harold is slain, with the defeated Englishmen being shown fleeing the field in the last scene of the tapestry.",
    "cn": "当然，结局是哈罗德国王被杀，战败的英国人在挂毯的最后一幕逃离战场。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "cover": {
    "en": "They found that sponges, sea squirts, mussels, oysters and algae covered most of the vessel’s surface, while amberjacks, sea bass, wrasse, scorpionfish, goby and other species of fish floated in and around the ship.",
    "cn": "他们发现，海绵、海鞘、贻贝、牡蛎和藻类覆盖了船舶的大部分表面，而琥珀杰克鱼、海鲈、皱纹鱼、蝎子鱼、高比鱼和其他鱼类则漂浮在船内和周围。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "creature": {
    "en": "Above and below the action are borders populated by animals, birds, mythical creatures, decorative devices and mini scenes that may or may not relate to the main narrative.",
    "cn": "行动的上方和下方是由动物、鸟类、神话生物、装饰装置和迷你场景组成的边界，这些场景可能与主要叙事有关，也可能与主要叙事无关。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "create": {
    "en": "However, the balance of that squad is what creates the problem.",
    "cn": "然而，该阵容的平衡是造成问题的原因。",
    "src": "Sky Sports · 2026-09-09"
  },
  "cost": {
    "en": "The company used around 10,000 artificial intelligence “agents,” or bots, that worked largely autonomously on the Navier-Stokes equations for 88 hours, using computational power that likely cost millions of dollars.",
    "cn": "该公司使用了大约1万个人工智能“代理”或机器人，它们在很大程度上自主地在纳维-斯托克斯方程上工作了88个小时，使用的计算能力可能耗资数百万美元。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "crash": {
    "en": "The former Tottenham boss guided the USA team to the last 16 of the World Cup, where the host nation's dreams of victory came to a crashing halt against Belgium, but that barely tells the story of an extraordinary few weeks for the Argentine.",
    "cn": "这位前托特纳姆热刺主帅带领美国队参加了世界杯的最后16场比赛，东道国的胜利梦想在对阵比利时的比赛中戛然而止，但这几乎没有讲述阿根廷人非凡的几周的故事。",
    "src": "Sky Sports · 2026-09-09"
  },
  "crack": {
    "en": "He knows how to crack Emery's tactical plan as Glasner's teams are extremely comfortable allowing the opponent possession before attacking the spaces created when the opponent overcommits.",
    "cn": "他知道如何破解埃梅里的战术计划，因为格拉斯纳的球队在进攻对手过度投入时创造的空间之前，总是让对手拥有控球权。",
    "src": "Sky Sports · 2026-09-10"
  },
  "crew": {
    "en": "Lesser-known featured Chicago killers include Richard Speck; the satanic Ripper Crew cult; and Tillie Klimek, known as Chicago’s “Black Widow,” who claimed to have had precognitive dreams of the deaths of her husbands, whom, in reality, she poisoned.",
    "cn": "鲜为人知的芝加哥杀手包括理查德·斯佩克（Richard Speck）、撒旦式的开膛手船员邪教（Ripper Crew cult）和被称为芝加哥“黑寡妇”的蒂莉·克莱梅克（Tillie Klimek），她声称自己曾梦到丈夫的死亡，而实际上，她的丈夫是被毒死的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "contrast": {
    "en": "The Żórawina necklace, by contrast, dates back several thousand years earlier, to Poland’s Middle Neolithic period, or the New Stone Age, per the statement.",
    "cn": "相比之下，Żórawina项链可以追溯到几千年前，根据声明，可以追溯到波兰的新石器时代中期，或新石器时代。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "contribute": {
    "en": "\"Martin is contributing goals,\" said Mikel Arteta after the game.",
    "cn": "“马丁正在贡献进球，”米克尔·阿尔特塔在比赛结束后说。",
    "src": "Sky Sports · 2026-09-09"
  },
  "control": {
    "en": "Not for the first time in Alonso's short reign however, chaos once again reigned over control as Leeds continued to create chances before Dominic Calvert-Lewin pulled them back to within a goal with 15 minutes to go.",
    "cn": "然而，在阿隆索短暂的统治期间，混乱再次统治了控制权，因为利兹在多米尼克·卡尔弗特-莱温（Dominic Calvert-Lewin）将他们拉回15分钟内的目标之前继续创造机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "conversation": {
    "en": "The upshot of that conversation is that Harold sets off on a ship to France.",
    "cn": "谈话的结果是哈罗德乘船去了法国。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "convert": {
    "en": "The average shot is converted about 10% of the time.",
    "cn": "平均每脚射门大约 10% 能转化为进球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "correct": {
    "en": "Week 3 @SkySportsPL Predictions & Best Bet results: Leif Davis to score or assist 4/1 ❌ Brentford/Brentford 9/4 ❌ Aston Villa to win 17/20 ❌ P+L -3 Season P+L +3.47 5/10 correct results 2/10 correct scores pic.twitter.com/3tM4kQYwOK",
    "cn": "第三周@SkySportsPL预测和最佳投注结果：莱夫·戴维斯得分或助攻4/1❌布伦特福德/布伦特福德9/4❌阿斯顿维拉获胜17/20❌P+L -3赛季P+L +3.47 5/10正确结果2/10正确分数pic.twitter.com/3tM4kQYwOK",
    "src": "Sky Sports · 2026-09-10"
  },
  "corporation": {
    "en": "But in a small spot of hope for the marsupial, Australian conservationists and the Dambimangari Aboriginal Corporation recently captured the species on camera at two sites in Western Australia where it had not been scientifically recorded before.",
    "cn": "但有袋动物的一线希望在于，澳大利亚自然资源保护主义者和丹比曼加里原住民公司最近在西澳大利亚州的两个地点用相机捕捉到了这个物种，在此之前，它们没有被科学记录过。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "corner": {
    "en": "His shot comes in but Steward sends it out for a corner.",
    "cn": "他的投篮进来了，但Steward将其发送到角落。",
    "src": "Sky Sports · 2026-09-09"
  },
  "cord": {
    "en": "The find may be linked to the Corded Ware culture, named for the twisted-rope impressions that are characteristic of its ceramic pottery.",
    "cn": "这一发现可能与Corded Ware文化有关，Corded Ware文化以陶瓷陶器特有的扭绳印记命名。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "copy": {
    "en": "Christie is the best-selling novelist of all time: Her books have sold at least one billion copies in English and a billion more in other languages.",
    "cn": "克里斯蒂是有史以来最畅销的小说家：她的英文书销量至少10亿本，其他语言的书销量也超过10亿本。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "cope": {
    "en": "Rangers had to cope without captain and striker Lawrence Shankland, who missed out through injury, with Ryan Naderi starting in his place.",
    "cn": "流浪者不得不在没有队长和前锋劳伦斯·尚克兰德的情况下应对，劳伦斯·尚克兰德因伤缺席比赛，瑞安·纳德里（Ryan Naderi）开始取代他。",
    "src": "Sky Sports · 2026-09-09"
  },
  "crime": {
    "en": "“Her impact on crime fiction as a genre has been immense,” exhibition curator Lucy Rowland says in a statement from the library.",
    "cn": "“她对犯罪小说的影响是巨大的，”展览策展人露西·罗兰在图书馆的一份声明中说。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "criminal": {
    "en": "In last year’s infamous Louvre heist, scootering criminals fled with French crown jewels.",
    "cn": "在去年臭名昭著的卢浮宫抢劫案中，犯罪分子骑着摩托车带着法国皇冠珠宝逃跑。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "cut": {
    "en": "“They were equipped with an electric knife or a metal saw—whatever you prefer to call it—and they cut through the bolts holding the frames of Renoir’s works in place,” Bryan Masson, the mayor of Cagnes-sur-Mer, told reporters, per ABC News ’ Kevin Shalvey.",
    "cn": "据ABC新闻的凯文·沙维报道，滨海卡涅市长布莱恩·马森告诉记者：“他们配备了一把电动刀或一把金属锯——不管你喜欢怎么称呼它——他们把雷诺阿作品框架固定的螺栓切断了。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "danger": {
    "en": "In this first episode of our four-part Sunday Series on the 16th-century royal, Rachel Dinning is joined by historian Nicola Tallis to explore Elizabeth’s turbulent early years – from the execution of her mother, Anne Boleyn, to the political and personal dangers she faced as she navigated childhood, illegitimacy, and the treacherous Tudor succession.",
    "cn": "在我们关于16世纪王室的四集周日系列节目的第一集中，雷切尔·丁宁和历史学家尼古拉·塔利斯一起探索了伊丽莎白动荡的早年——从她母亲安妮·博林的处决，到她在童年时期面临的政治和个人危险，私生子，以及都铎王朝的危险继承。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "dangerous": {
    "en": "But the Arsenal attack down both flanks and through the middle looked extremely dangerous at the Stadio Diego Armando Maradona.",
    "cn": "但是阿森纳在迭戈·阿曼多·马拉多纳体育场的侧翼和中间进攻看起来非常危险。",
    "src": "Sky Sports · 2026-09-09"
  },
  "dark": {
    "en": "There were thousands of names in the registers, mostly written in dark ink.",
    "cn": "登记簿上有成千上万的名字，大多是用深色墨水写的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "date": {
    "en": "Soon, the researchers will use radiocarbon dating to figure out the skeleton’s exact age.",
    "cn": "很快，研究人员将使用放射性碳年代测定来确定骨骼的确切年龄。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "decay": {
    "en": "“That titanosaurs laid eggs at such high latitudes is inherently interesting, especially since the evidence points to mound incubation by plant decay as the main source of heat for these animals,” he says.",
    "cn": "他说：“泰坦龙在如此高的纬度下产卵本身就很有趣，特别是因为有证据表明，植物腐烂造成的土丘孵化是这些动物的主要热源。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "decade": {
    "en": "Now, more than eight decades later, the wreck is teeming with marine life, researchers report in a paper published July 26 in the journal Frontiers in Ocean Sustainability.",
    "cn": "研究人员在7月26日发表在《海洋可持续发展前沿》（Frontiers in Ocean Sustainability）杂志上的一篇论文中报告说，现在，80多年过去了，沉船上充满了海洋生物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "death": {
    "en": "Murder on the Orient Express became a Hollywood blockbuster in 2017, and Death on the Nile followed in 2022.",
    "cn": "2017年，《东方快车谋杀案》成为好莱坞大片，2022年，《尼罗河上的惨案》紧随其后。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "deal": {
    "en": "Morgan Rogers -- who signed for Chelsea in a £117 million deal after repeated links with a move to Arsenal -- struck inside 77 seconds to put the visitors in front.",
    "cn": "此前曾与阿森纳频繁传出转会绯闻的摩根·罗杰斯，以 1.17 亿英镑转会切尔西，开场仅 77 秒便率先破门。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "day": {
    "en": "By day, the species stays hidden from predators, and by night, it comes out to feed.",
    "cn": "白天，这个物种隐藏起来躲避捕食者，晚上，它出来觅食。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "crown": {
    "en": "In last year’s infamous Louvre heist, scootering criminals fled with French crown jewels.",
    "cn": "在去年臭名昭著的卢浮宫抢劫案中，犯罪分子骑着摩托车带着法国皇冠珠宝逃跑。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "crowd": {
    "en": "The crowd were great, with the atmosphere [pushing the players on].",
    "cn": "人群很棒，气氛[推动球员前进]。",
    "src": "Sky Sports · 2026-09-09"
  },
  "cross": {
    "en": "A brilliant cross into the box from Tounekti is headed past by Diabate.",
    "cn": "一个来自Tounekti的辉煌十字架被Diabate带到了盒子里。",
    "src": "Sky Sports · 2026-09-09"
  },
  "crisis": {
    "en": "During the Covid-19 pandemic, he saw parallels between the ongoing crisis and the Black Death, which killed an estimated 30 to 50 percent of England’s population just a few decades before the uprising.",
    "cn": "在新冠肺炎疫情期间，他看到了持续的危机与黑死病之间的相似之处，黑死病在起义前几十年杀死了估计30%至50%的英格兰人口。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "curl": {
    "en": "Hogh lays the ball off to Hassan but his curling effort is pushed past by Steward.",
    "cn": "Hogh将球交给了Hassan ，但他的冰壶努力被Steward推倒了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "crystal": {
    "en": "Crystal Palace transfers, latest news, rumours and gossip: Live updates, goals and highlights",
    "cn": "水晶宫转会，最新消息，谣言和八卦：实时更新，进球和亮点",
    "src": "Sky Sports · 2026-09-10"
  },
  "cup": {
    "en": "His reflections on the World Cup seem like as good a place to get going.",
    "cn": "他对世界杯的思考似乎是一个很好的去处。",
    "src": "Sky Sports · 2026-09-09"
  },
  "appear": {
    "en": "Despite financial restrictions that appear to be imposed within the club, you can't hide from the fact they have the highest net spend of any Premier League side since 2022.",
    "cn": "尽管俱乐部内部似乎施加了财务限制，但自2022年以来，他们的净支出一直是英超联赛中最高的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "appearance": {
    "en": "That hit followed his clinching strike against Chelsea in the Premier League on Sunday and takes his total to four goals in five appearances this season across all competitions.",
    "cn": "这一打击是在他周日在英超联赛对阵切尔西的比赛中取得进球之后，并在本赛季的所有比赛中五次出场，他的总进球数达到四球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "appoint": {
    "en": "They have appointed a top-class manager in Xabi Alonso and recruited well with goalkeeper Martinez, defender Maxence Lacroix and forward Rogers.",
    "cn": "他们任命了哈维·阿隆索这位顶级主帅，并在门将马丁内斯、后卫拉克鲁瓦以及前锋罗杰斯的位置上引援得当。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "argue": {
    "en": "Arsenal, the current Premier League champions, can currently argue otherwise and point to a run that now extends to 10 unbeaten league games against Chelsea.",
    "cn": "作为现任英超冠军，阿森纳完全有理由反驳——对切尔西的联赛不败纪录已经扩大到了 10 场。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "area": {
    "en": "“And they have not been recorded from some areas for a long time.”",
    "cn": "“有些地区很长时间没有记录了。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "approve": {
    "en": "By contrast, many peptides available for purchase online are experimental chemicals: They are not approved by the Food and Drug Administration and are openly sold with disclaimers, such as “for research use only.”",
    "cn": "相比之下，许多在线购买的肽是实验性化学品：它们未经美国食品和药物管理局批准，并公开出售免责声明，例如“仅供研究使用”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "analyse": {
    "en": "Manchester United return to the Champions League on Thursday night to face Azerbaijan side Sabah; with a Manchester derby three days later, Michael Carrick may need to utilise his squad; Sky Sports' Callum Bishop analyses if the squad is ready to compete on all fronts",
    "cn": "曼联周四晚上重返欧洲冠军联赛，面对阿塞拜疆方面的沙巴；三天后，迈克尔·卡里克可能需要利用他的阵容；天空体育的卡勒姆·毕晓普（Callum Bishop）分析了球队是否准备好在各个方面进行比赛",
    "src": "Sky Sports · 2026-09-09"
  },
  "analysis": {
    "en": "Our top tipster Lewis Jones, aka Jones Knows, provides his analysis and betting insight across the weekend Premier League action.",
    "cn": "我们的顶级线人刘易斯·琼斯，又名琼斯知道，提供他的分析和投注洞察整个周末英超联赛的行动。",
    "src": "Sky Sports · 2026-09-10"
  },
  "anchor": {
    "en": "On the night the Po sank, however, its lights had intentionally been kept off to avoid drawing attention to other ships anchored in the bay.",
    "cn": "然而，在Po沉没的那天晚上，它的灯被故意关闭，以避免引起停泊在海湾的其他船只的注意。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "ancient": {
    "en": "And this wasn’t ancient history, it was inside my own father’s lifetime,” Amandeep told me.",
    "cn": "这不是古老的历史，这是我父亲一生的经历，”阿曼迪普告诉我。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "angle": {
    "en": "\"When that happens, [Odegaard] needs to take different heights and angles and positions in order to disorganise the opponent and he's done that really well.\"",
    "cn": "“当这种情况发生时，[Odegaard]需要采取不同的高度、角度和姿势来扰乱对手，他做得非常好。",
    "src": "Sky Sports · 2026-09-09"
  },
  "animal": {
    "en": "Above and below the action are borders populated by animals, birds, mythical creatures, decorative devices and mini scenes that may or may not relate to the main narrative.",
    "cn": "行动的上方和下方是由动物、鸟类、神话生物、装饰装置和迷你场景组成的边界，这些场景可能与主要叙事有关，也可能与主要叙事无关。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "any": {
    "en": "\"We recognise Celtic are a good team who have been the main title winners and the team that's picked up more trophies than any other club in recent years.",
    "cn": "“我们认识到凯尔特人是一支优秀的球队，他们是主要的冠军得主，也是近年来获得奖杯最多的球队。",
    "src": "Sky Sports · 2026-09-10"
  },
  "anxiety": {
    "en": "The anxiety from the Light Blues legions, which has been prevalent in some games in Govan, resurfaced on Wednesday night as the home side struggled in the second half of the Scottish Premiership clash against St Mirren after missing a host of chances before the break.",
    "cn": "在苏格兰联赛对阵圣米伦的比赛中，主队在中场休息前错过了很多机会，下半场比赛中表现不佳，在戈文的一些比赛中，蓝军军团的焦虑情绪再次浮现。",
    "src": "Sky Sports · 2026-09-10"
  },
  "answer": {
    "en": "They will almost certainly sign another midfielder when the window reopens in January, but until then, Alonso has to get his midfield working despite not having an obvious answer to the problem.",
    "cn": "他们几乎肯定会在 1 月转会窗重新开启时再签一名中场，但在那之前，阿隆索必须找到一个解决方案，让中场运转起来。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "another": {
    "en": "Harold then goes back to England and has another meeting with Edward the Confessor.",
    "cn": "哈罗德随后回到英格兰，与忏悔者爱德华再次会面。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "announce": {
    "en": "On Tuesday, OpenAI, the developer of ChatGPT, announced in a blog post that an “internal OpenAI system” had just found a solution to the longstanding puzzle.",
    "cn": "周二，ChatGPT的开发者OpenAI在一篇博客文章中宣布，一个“内部OpenAI系统”刚刚找到了解决这个长期难题的方法。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "among": {
    "en": "Don't be fooled by this result -- Chelsea are back among the Premier League title contenders.",
    "cn": "不要被这场比赛的结果欺骗——切尔西已经重新回到争冠行列。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "around": {
    "en": "Despite the uncertainty around them, peptides have garnered a cult following.",
    "cn": "尽管存在不确定性，但多肽已经赢得了狂热的追随者。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "atmosphere": {
    "en": "The crowd were great, with the atmosphere [pushing the players on].",
    "cn": "人群很棒，气氛[推动球员前进]。",
    "src": "Sky Sports · 2026-09-09"
  },
  "attack": {
    "en": "Odegaard only scored once for Arsenal during an injury-hit 2025/26 campaign but now his stats are up across a range of other attacking metrics, too.",
    "cn": "在一场受伤的2025/26赛季中，厄德高只为阿森纳得分一次，但现在他的统计数据也在一系列其他攻击指标上都有所上升。",
    "src": "Sky Sports · 2026-09-09"
  },
  "attend": {
    "en": "It is Atletico Madrid away next in Europe but there are bigger matters to attend to before that.",
    "cn": "接下来在欧洲的比赛是马德里竞技，但在那之前还有更重要的事情要做。",
    "src": "Sky Sports · 2026-09-08"
  },
  "attention": {
    "en": "On the night the Po sank, however, its lights had intentionally been kept off to avoid drawing attention to other ships anchored in the bay.",
    "cn": "然而，在Po沉没的那天晚上，它的灯被故意关闭，以避免引起停泊在海湾的其他船只的注意。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "authority": {
    "en": "Only Rangers fans are allowed in the 50,000-capacity Ibrox for the League Cup quarter-final against Celtic at the order of the authorities amid a ticket allocation spat between the two Glasgow giants.",
    "cn": "联赛杯1 / 4决赛对阵凯尔特人的比赛中，只有流浪者队的球迷才可以进入可容纳5万人的伊布罗克斯球场观看比赛。",
    "src": "Sky Sports · 2026-09-10"
  },
  "author": {
    "en": "Study co-author Michelle Szydlowski, an anthrozoologist at Miami University, notes that the ball-building behavior makes sense with raccoon biology.",
    "cn": "该研究的合著者、迈阿密大学的人类动物学家米歇尔·希德洛夫斯基（Michelle Szydlowski）指出，浣熊造球的行为在生物学上是有道理的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "australia": {
    "en": "On paper, the nabarlek’s range includes parts of northern and northwestern Australia.",
    "cn": "理论上，纳巴莱克的活动范围包括澳大利亚北部和西北部的部分地区。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "august": {
    "en": "Now, in a study published on 25 August in the journal Wild, researchers report that this playful habit was not an isolated quirk but a skill passed among members of a pygmy raccoon family.",
    "cn": "现在，在8月25日发表在《野生》杂志上的一项研究中，研究人员报告说，这种顽皮的习惯并不是一个孤立的怪癖，而是侏儒浣熊家族成员之间传递的一种技能。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "australian": {
    "en": "“This is very exciting and great news for the species,” Larissa Potter, a senior field ecologist with the Australian Wildlife Conservancy, says in a statement.",
    "cn": "澳大利亚野生动物保护协会的资深野外生态学家拉里萨·波特在一份声明中说：“这对这个物种来说是非常令人兴奋和伟大的消息。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "army": {
    "en": "He had been blinded by sandstorms in Iraq; as a boy, Amandeep’s father had accompanied his uncle to Rupar in Ambala, in undivided India, to collect his army pension.",
    "cn": "他在伊拉克被沙尘暴弄瞎了眼睛；当阿曼迪普还是个孩子的时候，他的父亲曾陪同叔叔去印度未分裂的安巴拉的鲁帕尔领取他的军队养老金。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "arrangement": {
    "en": "England's top-flight have announced the festive fixtures more than three months in advance as it \"gives supporters notice to plan and make travel arrangements for a particularly busy time of the year\".",
    "cn": "英格兰顶级联赛提前三个多月宣布了节日赛程，因为这“给了球迷一个通知，让他们在一年中特别繁忙的时候计划和安排旅行”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "arrival": {
    "en": "Here’s what you need to know about the real history behind The Uprising ahead of the film’s arrival in theaters across the United States on September 10.",
    "cn": "以下是电影于9月10日抵达美国各地影院之前，您需要了解的《起义》背后的真实历史。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "arrive": {
    "en": "Billed as the world’s largest private collection of serial killer artifacts, the exhibition toured Europe before arriving stateside, where it made its first stop in Atlanta.",
    "cn": "该展览被誉为世界上最大的连环杀手文物私人收藏，在抵达美国之前在欧洲巡回展出，并在亚特兰大首次停留。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "art": {
    "en": "In France’s latest art heist, two thieves broke into Pierre-Auguste Renoir ’s house and stole four of his paintings.",
    "cn": "在法国最近的艺术品盗窃案中，两名小偷闯入皮埃尔-奥古斯特·雷诺阿的家中，偷走了他的四幅画。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "artificial": {
    "en": "The company used around 10,000 artificial intelligence “agents,” or bots, that worked largely autonomously on the Navier-Stokes equations for 88 hours, using computational power that likely cost millions of dollars.",
    "cn": "该公司使用了大约1万个人工智能“代理”或机器人，它们在很大程度上自主地在纳维-斯托克斯方程上工作了88个小时，使用的计算能力可能耗资数百万美元。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "artist": {
    "en": "Renoir, born in France in 1841, was one of Impressionism’s founding artists.",
    "cn": "雷诺阿1841年出生于法国，是印象派的奠基人之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "assume": {
    "en": "For instance, in the Victoria River District, a pastoral area in the Northern Territory of Australia, the nabarlek hasn’t been seen for 170 years—so researchers assume that there, it is locally extinct.",
    "cn": "例如，在维多利亚河地区，澳大利亚北部的一个牧区，已经有170年没有看到纳巴莱克了，所以研究人员认为，在那里，它已经在当地灭绝了。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "assist": {
    "en": "Include his three assists and that adds up to 0.25 non-penalty goals plus assists per 90 minutes with the Toffees.",
    "cn": "加上 3 个助攻，他在埃弗顿的场均非点球进球加助攻也只有 0.25。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "astonish": {
    "en": "This astonishing artwork is 68.3 metres long and half a metre high.",
    "cn": "这幅惊人的艺术品长68.3米，高半米。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "ask": {
    "en": "One of the first full registers Amandeep asked for was for Ambala, his family’s district.",
    "cn": "阿曼迪普要求的第一批完整的选民之一是他家所在的安巴拉区。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "america": {
    "en": "The exhibition dedicates displays to other local killers, including Holmes, who, as one of America’s first serial killers, used his “ Murder Castle ” hotel to claim victims’ lives during the 1893 Chicago World’s Fair.",
    "cn": "该展览致力于展示其他当地杀手，包括福尔摩斯，他作为美国最早的连环杀手之一，在1893年芝加哥世界博览会期间使用他的“谋杀城堡”酒店夺走了受害者的生命。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "account": {
    "en": "Expected goals and assists does a much better job of showing just how dangerous a player was around the goal, since they take into account every shot and every pass a player makes.",
    "cn": "预期进球和预期助攻更能反映球员在禁区附近的威胁，因为它考虑了球员的每一次射门和传球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "achieve": {
    "en": "\"I think it was kind of what we set out to achieve, good performance, individually and collectively throughout the game, the boys that started, the boys that came on pitch, clean sheet, goals, exciting football.",
    "cn": "“我认为这是我们想要达到的目标，在整场比赛中，无论是个人还是集体，都表现出色，小伙子们首发，小伙子们上场，零失球，进球，令人兴奋的足球。",
    "src": "Sky Sports · 2026-09-08"
  },
  "achievement": {
    "en": "“It’s certainly one of my proudest life achievements.”",
    "cn": "“这无疑是我一生中最自豪的成就之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "across": {
    "en": "But it was Havertz who made the most telling impact, just over three years on from his £67.5 million move across London.",
    "cn": "但真正产生决定性影响的，是三年前以 6750 万英镑跨越伦敦的哈弗茨。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "action": {
    "en": "The action actually starts a couple of years before the set-piece battle of Hastings, with a discussion between England’s King, Edward the Confessor, and his leading noble (who was also his brother-in-law), Harold Godwinson.",
    "cn": "故事发生在黑斯廷斯战役前几年，英国国王忏悔者爱德华和他的贵族领袖（也是他的姐夫）哈罗德·戈德温森之间的讨论。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "add": {
    "en": "Include his three assists and that adds up to 0.25 non-penalty goals plus assists per 90 minutes with the Toffees.",
    "cn": "加上 3 个助攻，他在埃弗顿的场均非点球进球加助攻也只有 0.25。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "adapt": {
    "en": "It's been jaw dropping the way they have adapted their game to this level of football.",
    "cn": "他们让自己的比赛适应这种水平的足球的方式令人惊叹。",
    "src": "Sky Sports · 2026-09-10"
  },
  "actually": {
    "en": "“Something everyone had heard of, but no one had actually seen.”",
    "cn": "“每个人都听说过，但没有人真正见过。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "actual": {
    "en": "Among the actual wingers who got consistent playing time, we're left with three -- out of 19 -- who were able to dribble past their defender and turn it into above-average production.",
    "cn": "在真正有稳定出场时间的边锋中，19 人里只有 3 人能够突破对手并转化为高于平均水准的产出。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "ability": {
    "en": "Speed, physicality, ability to play on the last line and run in behind.",
    "cn": "速度，身体素质，在最后一条线上的能力，以及在后面奔跑的能力。",
    "src": "Sky Sports · 2026-09-08"
  },
  "able": {
    "en": "Dorgu enjoyed himself at left-back with Luke Shaw missing from the squad but he was able to play as a de facto winger given United's superiority.",
    "cn": "在卢克·肖缺阵的情况下，多古在左后卫的位置上表现得很好，但鉴于曼联的优势，他能够胜任边锋的位置。",
    "src": "Sky Sports · 2026-09-08"
  },
  "about": {
    "en": "I'm as positive as I have been for three, four, five years about Chelsea, because I think they're going in the right direction.",
    "cn": "我对切尔西的态度比过去三、四、五年都要积极，因为我认为他们正在走在正确的方向上。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "above": {
    "en": "Among the actual wingers who got consistent playing time, we're left with three -- out of 19 -- who were able to dribble past their defender and turn it into above-average production.",
    "cn": "在真正有稳定出场时间的边锋中，19 人里只有 3 人能够突破对手并转化为高于平均水准的产出。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "absence": {
    "en": "Many believe Chelsea could push Arsenal the closest this season, given an absence of European football and Alonso's encouraging early returns.",
    "cn": "很多人认为切尔西是本赛季最有可能挑战阿森纳的球队，因为蓝军没有欧战任务，而阿隆索的开局令人鼓舞。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "academic": {
    "en": "It was most likely made in England by English embroiderers, and while we do not have a precise date for when the Bayeux Tapestry was created, the academic consensus is that it must have been produced very soon after the events it depicts.",
    "cn": "它很可能是由英国的刺绣工在英格兰制作的，虽然我们没有确切的日期来确定贝叶挂毯是什么时候制作的，但学术界的共识是，它一定是在它描绘的事件发生后不久制作的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "accidental": {
    "en": "“From the very first look, it was clear that this could not have been accidental,” Dąbrowski says in the statement, per TVP World ’s Maria Kamińska.",
    "cn": "根据TVP World的Maria Kamińska的说法，Dąbrowski在声明中说：“从第一眼看来，这显然不是偶然的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "administration": {
    "en": "By contrast, many peptides available for purchase online are experimental chemicals: They are not approved by the Food and Drug Administration and are openly sold with disclaimers, such as “for research use only.”",
    "cn": "相比之下，许多在线购买的肽是实验性化学品：它们未经美国食品和药物管理局批准，并公开出售免责声明，例如“仅供研究使用”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "admire": {
    "en": "It’s a once-in-a-lifetime opportunity – or, really, once in a millennium: the chance to admire the Bayeux Tapestry in the land of its creation.",
    "cn": "这是一个千载难逢的机会，或者说，千载难逢：有机会在贝叶挂毯的诞生地欣赏它。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "aim": {
    "en": "She had many identities and passions, which the exhibition aims to illuminate.",
    "cn": "她有许多身份和激情，这次展览旨在阐明这些。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "air": {
    "en": "They worked together as a three, they knew how to position themselves, they were great in the air, they knew how to push up and when to drop deeper.",
    "cn": "他们三人配合默契，知道如何站位，高空球能力出色，懂得何时上压、何时回收。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "alarm": {
    "en": "An older study—with more alarming findings—won the Ig Nobel Economics Prize.",
    "cn": "一项具有更令人担忧的发现的较早研究获得了搞笑诺贝尔经济学奖。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "alive": {
    "en": "Amandeep’s mother was tearful at seeing the names written down, but also knowing her husband, Amandeep’s father, was no longer alive to see it.",
    "cn": "阿曼迪普的母亲看到写在上面的名字时泪流满面，但也知道她的丈夫，阿曼迪普的父亲，已经不在人世了。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "all": {
    "en": "Gary Neville has criticised Chelsea for being \"all over the place\" defensively in the 2-1 defeat to Arsenal.",
    "cn": "加里·内维尔批评切尔西在 1-2 输给阿森纳的比赛中防守端「乱成一团」。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "allow": {
    "en": "He knows how to crack Emery's tactical plan as Glasner's teams are extremely comfortable allowing the opponent possession before attacking the spaces created when the opponent overcommits.",
    "cn": "他知道如何破解埃梅里的战术计划，因为格拉斯纳的球队在进攻对手过度投入时创造的空间之前，总是让对手拥有控球权。",
    "src": "Sky Sports · 2026-09-10"
  },
  "almost": {
    "en": "The problem, though, is that the 17-minute video contains almost every goal that Ndiaye has scored in the Premier League over the past two seasons.",
    "cn": "然而问题在于，这段 17 分钟的集锦几乎涵盖了他过去两个赛季在英超的全部进球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "along": {
    "en": "There was Trump, FIFA and Folarin Balogun's suspension of his suspension, and along the way, Pochettino became something of a fashion icon.",
    "cn": "特朗普、国际足联和Folarin Balogun暂停了他的停赛，一路上，波切蒂诺成为了一个时尚偶像。",
    "src": "Sky Sports · 2026-09-09"
  },
  "ambition": {
    "en": "They have conceded seven goals in three league games this season, and that is way too many for a team with title ambitions.",
    "cn": "本赛季前 3 轮 联赛他们已经丢了 7 球，这对一支志在夺冠的球队来说实在太多。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "ahead": {
    "en": "With Marcus Rashford also available, and Cunha getting a confidence-boosting goal, there are some interesting decisions ahead for the United boss.",
    "cn": "拉什福德也可以上场，库尼亚也取得了一个提升信心的进球，曼联主帅将面临一些有趣的决定。",
    "src": "Sky Sports · 2026-09-08"
  },
  "also": {
    "en": "“It’s also reassuring, as it indicates that this threatened wallaby is persisting …",
    "cn": "“这也令人放心，因为这表明这种受到威胁的小袋鼠正在持续存在…",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "already": {
    "en": "The summer signing has four assists to his name already, with three of those coming for Odegaard goals, including the winner in Naples.",
    "cn": "夏季签约已经有四次助攻，其中三次是Odegaard进球，包括那不勒斯的冠军。",
    "src": "Sky Sports · 2026-09-09"
  },
  "although": {
    "en": "Although far from their convincing best, the Hoops did enough to close out their 13th win in a row in total stretching back to the closing weeks of last season.",
    "cn": "虽然远非他们令人信服的最佳成绩，但篮筐队已经做了足够的努力，在上赛季的最后几周结束了连续第13场胜利。",
    "src": "Sky Sports · 2026-09-09"
  },
  "agreement": {
    "en": "The embroidery is normally housed at the Bayeux Tapestry Museum in Normandy, but a historic agreement was reached with the French government for the artefact to be loaned to the UK while its home museum undergoes renovation.",
    "cn": "这幅刺绣作品通常存放在诺曼底的贝叶挂毯博物馆，但与法国政府达成了一项历史性协议，在其本国博物馆进行翻修时，这幅艺术品将被借给英国。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "advice": {
    "en": "Known for soft-focus portraits of women and girls, like Coco Reading and A Girl With a Watering Can (1876), the artist left Paris for the warmer climate of southern France at the advice of doctors treating his rheumatoid arthritis.",
    "cn": "这位艺术家以柔和的女性和女孩肖像而闻名，如《读书的可可》和《拿水壶的女孩》（1876），他听从医生的建议，离开巴黎前往气候温暖的法国南部，治疗他的风湿性关节炎。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "adventure": {
    "en": "Curiously, they then head off together on a military adventure in Brittany, which Harold seems to enthusiastically take part in.",
    "cn": "奇怪的是，他们随后一起前往布列塔尼进行军事冒险，哈罗德似乎热情地参加了这次冒险。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "advance": {
    "en": "Arteta put Odegaard's freedom to advance into more threatening positions down to the skills of his team-mates in open play, which the Arsenal head coach suggested had been missing previously.",
    "cn": "Arteta将Odegaard晋级到更具威胁性的位置的自由归功于他的队友在公开比赛中的技能，阿森纳主教练认为以前缺少这些技能。",
    "src": "Sky Sports · 2026-09-09"
  },
  "adult": {
    "en": "Adults could weigh up to 75 tonnes—over eight times bigger than a Tyrannosaurus rex and 12 times as heavy as an elephant.",
    "cn": "成年人的体重可达75吨，是霸王龙的8倍多，是大象的12倍重。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "ago": {
    "en": "If you said that to me a year ago, I couldn't see where this project was going.",
    "cn": "如果是一年前有人这么说，我完全看不出它要走向何方。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "agent": {
    "en": "Everton have played down the possibility of a move for free agent Anthony Martial.",
    "cn": "埃弗顿淡化了引进自由球员马夏尔的可能性。",
    "src": "Sky Sports · 2026-09-10"
  },
  "age": {
    "en": "Gralak says that Stone Age burial mounds typically belonged to patriarchs.",
    "cn": "格拉拉克说，石器时代的古墓通常属于族长。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "against": {
    "en": "Up against Adam Scott, who draws over two fouls per game, and Justin Kluivert who was fouled three times at Newcastle, he's going to be in the firing line for fouls.",
    "cn": "面对场均犯规超过两次的亚当·斯科特和在纽卡斯尔被犯规三次的贾斯汀·克鲁伊维特，他将在犯规的火线上。",
    "src": "Sky Sports · 2026-09-10"
  },
  "after": {
    "en": "Richarlison is seeking to terminate his contract at Tottenham after being left out of their Premier League squad.",
    "cn": "在被排除在英超大名单之外后，理查利森正在寻求终止他在热刺的合同。",
    "src": "Sky Sports · 2026-09-10"
  },
  "again": {
    "en": "Odegaard was the match-winner again for Arsenal on Wednesday, thumping in the only goal of the game in the Champions League victory at Napoli.",
    "cn": "周三，厄德高再次成为阿森纳的取胜功臣，在那不勒斯的冠军联赛胜利中击败了比赛的唯一进球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "average": {
    "en": "The average shot is converted about 10% of the time.",
    "cn": "平均每脚射门大约 10% 能转化为进球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "bread": {
    "en": "The second-smallest rock-wallaby in the world is about as long as a loaf of bread.",
    "cn": "世界上第二小的岩袋鼠只有一块面包那么长。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "break": {
    "en": "At the very least, when you're a Premier League team and you see a winger breaking that threshold, you should give the player a deeper look.",
    "cn": "至少，作为一支英超球队，当你看到一名边锋达到这一门槛时，应该认真考察这名球员。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "breath": {
    "en": "Three of those assists - for Palmer's second, Neto's strike and the first of two for Danny Welbeck - came as Chelsea netted three times more in 12 minutes, including Welbeck's fourth which should have given them breathing space when he fired through Michael Zetterer's legs.",
    "cn": "其中三次助攻-帕尔默的第二次助攻，内托的罢工和丹尼·韦尔贝克的两次助攻中的第一次助攻-切尔西在12分钟内获得了三倍以上的成绩，其中包括韦尔贝克的第四次助攻，当他射穿迈克尔·泽特勒的腿时，应该给他们喘息的空间。",
    "src": "Sky Sports · 2026-09-09"
  },
  "breathe": {
    "en": "Three of those assists - for Palmer's second, Neto's strike and the first of two for Danny Welbeck - came as Chelsea netted three times more in 12 minutes, including Welbeck's fourth which should have given them breathing space when he fired through Michael Zetterer's legs.",
    "cn": "其中三次助攻-帕尔默的第二次助攻，内托的罢工和丹尼·韦尔贝克的两次助攻中的第一次助攻-切尔西在12分钟内获得了三倍以上的成绩，其中包括韦尔贝克的第四次助攻，当他射穿迈克尔·泽特勒的腿时，应该给他们喘息的空间。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bridge": {
    "en": "Chelsea goalkeeper Emiliano Martinez is ex-Arsenal, winger Noni Madueke left Stamford Bridge to join Arsenal, and Declan Rice was released by the Blues as a teenager.",
    "cn": "切尔西门将马丁内斯是前阿森纳球员，边锋马杜埃凯从斯坦福桥转投阿森纳，赖斯则在少年时期就被切尔西放弃。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "brilliant": {
    "en": "A brilliant cross into the box from Tounekti is headed past by Diabate.",
    "cn": "一个来自Tounekti的辉煌十字架被Diabate带到了盒子里。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bring": {
    "en": "\"Collectively, as a team, we have done a lot of the right things and that is why were are excited about what the season will bring.",
    "cn": "“作为一个团队，我们做了很多正确的事情，这就是为什么我们对新赛季的到来感到兴奋。",
    "src": "Sky Sports · 2026-09-08"
  },
  "british": {
    "en": "The Bayeux Tapestry is being displayed in the UK as part of a landmark exhibition at the British Museum in London.",
    "cn": "贝叶挂毯作为伦敦大英博物馆标志性展览的一部分正在英国展出。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "bone": {
    "en": "“We know their bones have turned up in places as far south as Antarctica and southern Argentina, and as far north as Mongolia and Texas,” says Darla Zelenitsky, a study co-author and paleontologist at the University of Calgary in Canada, to Katie Hunt at CNN.",
    "cn": "加拿大卡尔加里大学的研究合著者和古生物学家Darla Zelenitsky对CNN的Katie Hunt说：“我们知道他们的骨头出现在南极洲和阿根廷南部，以及蒙古和德克萨斯州的北部。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "book": {
    "en": "Vitaly Janelt has been responsible for a lot of that upsurge, making 10 fouls in four games and being booked in all three Premier League games.",
    "cn": "维塔利·贾内尔特对这场热潮负有很大的责任，他在四场比赛中犯规10次，并且在三场英超比赛中都吃到了黄牌。",
    "src": "Sky Sports · 2026-09-10"
  },
  "born": {
    "en": "The 26-year-old, French-born, Senegalese international is one of the best dribblers in the Premier League, if not the world.",
    "cn": "这位 26 岁、法籍塞内加尔国脚，是英超乃至全世界最顶尖的突破手之一。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "boss": {
    "en": "But Arsenal hung on, condemning Xabi Alonso to his first defeat as Blues boss.",
    "cn": "阿森纳顶住了压力，让哈维·阿隆索尝到了执教切尔西以来的首场失利。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "both": {
    "en": "Chelsea, who finished 10th last season, have no European football to contend with in this campaign and had won both games before Sunday's London derby.",
    "cn": "切尔西上赛季仅获第 10，本赛季没有欧战任务，在周日这场伦敦德比之前两场比赛全胜。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "box": {
    "en": "His goal, brilliantly taken from the edge of the box after a 29-pass build-up, proved crucial.",
    "cn": "在经历了29次积累之后，他的进球从盒子的边缘出色地被证明是至关重要的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bound": {
    "en": "In the basement of Lahore Museum in Pakistan were 34 black, leather-bound registers gathering dust.",
    "cn": "在巴基斯坦拉合尔博物馆（Lahore Museum）的地下室里，有34本黑色皮革装订的登记簿落满了灰尘。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "call": {
    "en": "Titanosaurs belonged to a group of long-necked and four-legged dinosaurs called sauropods.",
    "cn": "泰坦龙属于一群长颈和四条腿的恐龙，称为蜥脚类恐龙。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "campaign": {
    "en": "Chelsea, who finished 10th last season, have no European football to contend with in this campaign and had won both games before Sunday's London derby.",
    "cn": "切尔西上赛季仅获第 10，本赛季没有欧战任务，在周日这场伦敦德比之前两场比赛全胜。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "can": {
    "en": "The nabarlek is the only wallaby that can continually replace its molar teeth throughout its life, rather like a shark.",
    "cn": "纳巴莱克是唯一一种可以在一生中不断更换臼齿的小袋鼠，就像鲨鱼一样。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "captain": {
    "en": "That's the Martin we know and we love, he's our captain.",
    "cn": "这就是我们认识和喜爱的马丁，他是我们的队长。",
    "src": "Sky Sports · 2026-09-09"
  },
  "candy": {
    "en": "In 2012, researchers reported that higher-class individuals are more likely to engage in unethical behaviors, like taking candy meant for children.",
    "cn": "2012年，研究人员报告说，高阶层的人更有可能从事不道德的行为，比如吃儿童糖果。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "canvas": {
    "en": "While on death row, he became a prolific painter and made more than $30,000 selling his canvases, which often featured clowns and skulls, the Los Angeles Times ’ Stephen Braun reported in 1994, the year Gacy was executed.",
    "cn": "《洛杉矶时报》的斯蒂芬·布劳恩（Stephen Braun）在1994年报道说，在死囚区，他成为一名多产的画家，卖掉画布赚了3万多$ ，画布上经常有小丑和头骨。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "building": {
    "en": "William hears of Harold’s accession and immediately starts building a fleet.",
    "cn": "威廉听到哈罗德即位的消息，立即开始组建舰队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "build": {
    "en": "His goal, brilliantly taken from the edge of the box after a 29-pass build-up, proved crucial.",
    "cn": "在经历了29次积累之后，他的进球从盒子的边缘出色地被证明是至关重要的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "body": {
    "en": "\"The back three, when I watch them, it's almost like their legs aren't connected to their hips and the hips aren't connected to their bodies,\" he said on his Sky Sports podcast.",
    "cn": "他在自己的天空体育播客中说：「看这三中卫比赛，几乎感觉他们的腿和髋关节、髋关节和躯干是断开的。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "busy": {
    "en": "England's top-flight have announced the festive fixtures more than three months in advance as it \"gives supporters notice to plan and make travel arrangements for a particularly busy time of the year\".",
    "cn": "英格兰顶级联赛提前三个多月宣布了节日赛程，因为这“给了球迷一个通知，让他们在一年中特别繁忙的时候计划和安排旅行”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "business": {
    "en": "The general consensus is that United's business in the transfer market has left them short, with a squad that is unable to cope with three games per week due to an over-reliance on the same names.",
    "cn": "普遍的共识是曼联在转会市场的业务使他们短缺，由于过度依赖相同的名字，球队每周无法应付三场比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "base": {
    "en": "Getting Evens through the BuildABet function for under 1.5 first-half goals paired with under 3.5 total goals looks a shrewd play based on Hull's ability to make games so difficult no matter who the opponent are.",
    "cn": "通过BuildABet功能，上半场进球数在1.5个以下，总进球数在3.5个以下，这看起来是一种精明的发挥，因为赫尔城无论对手是谁，都能让比赛变得如此困难。",
    "src": "Sky Sports · 2026-09-10"
  },
  "bat": {
    "en": "She began batting and chasing her creation across the ground.",
    "cn": "她开始在地上击球和追逐她的创作。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "battle": {
    "en": "Then we get to the battle of Hastings itself, which is portrayed in considerable detail.",
    "cn": "接下来是黑斯廷斯战役，书中对其进行了相当详细的描述。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "because": {
    "en": "It had to be connected to scoring because, well, that's the whole point of the game.",
    "cn": "它必须与进球挂钩，因为说到底，这就是比赛的全部意义。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "beat": {
    "en": "As they produced another reminder that they are the team to beat this season.",
    "cn": "他们用这场比赛再次提醒所有人，本赛季他们才是最该被击败的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "bay": {
    "en": "Additionally, researchers observed a rare Mediterranean monk seal resting in the vessel—the first sighting of the endangered species in Vlora Bay since 1996.",
    "cn": "此外，研究人员观察到一只罕见的地中海僧海豹在船上休息，这是自1996年以来首次在Vlora湾发现这种濒危物种。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "become": {
    "en": "OpenAI claims to have found one such “blowup” scenario, involving a vortex of fluid that spirals inward and becomes stretched out, like spaghetti.",
    "cn": "OpenAI声称已经发现了一个这样的“爆炸”场景，包括一个向内螺旋并伸展的流体漩涡，就像意大利面一样。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "await": {
    "en": "While the world eagerly awaits who will earn those prizes this year, some researchers are currently celebrating the winners of playful—yet still scholarly—parody awards: the Ig Nobel Prizes, which were announced on September 3.",
    "cn": "虽然全世界都在热切地等待今年谁将获得这些奖项，但一些研究人员目前正在庆祝9月3日宣布的搞笑但仍然是学术模仿奖的获奖者：搞笑诺贝尔奖。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "award": {
    "en": "You’re probably familiar with the Nobel Prizes, some of the most prestigious awards.",
    "cn": "您可能熟悉诺贝尔奖，这是一些最负盛名的奖项。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "away": {
    "en": "He twists and turns on the edge of the box before his effort is palmed away.",
    "cn": "他扭动着盒子的边缘，然后他的努力就消失了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "back": {
    "en": "Hogh headed it back into Hassan to smash in, but it had gone out of play before he sent it in.",
    "cn": "霍格把它送回哈桑那里砸了进去，但在他把它送进去之前，它已经失灵了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "ball": {
    "en": "Naderi flicks on a long ball into Miovski's path, who's then one-on-one with Chapman.",
    "cn": "Naderi在Miovski的路径上弹了一个长球，然后与Chapman一对一。",
    "src": "Sky Sports · 2026-09-09"
  },
  "badly": {
    "en": "The tax was “an unevenly distributed one,” asking more of the lower classes than the wealthy, and it was “very badly administered,” Andrew Prescott, a historian at the University of Glasgow, tells Smithsonian magazine.",
    "cn": "格拉斯哥大学(University of Glasgow)历史学家安德鲁·普雷斯科特(Andrew Prescott)告诉《史密森尼》(Smithsonian)杂志，这项税收“分配不均”，对下层阶级的要求高于对富人的要求，而且“管理非常糟糕”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "bad": {
    "en": "A comet shoots through the sky, which is deemed to be a bad omen for Harold.",
    "cn": "一颗彗星划过天空，这被认为是哈罗德的不祥之兆。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "bee": {
    "en": "The Bayeux Tapestry is being displayed in the UK as part of a landmark exhibition at the British Museum in London.",
    "cn": "贝叶挂毯作为伦敦大英博物馆标志性展览的一部分正在英国展出。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "billion": {
    "en": "Christie is the best-selling novelist of all time: Her books have sold at least one billion copies in English and a billion more in other languages.",
    "cn": "克里斯蒂是有史以来最畅销的小说家：她的英文书销量至少10亿本，其他语言的书销量也超过10亿本。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "bit": {
    "en": "They don't look solid, they look like they're a little bit all over the place.",
    "cn": "他们现在看上去一点也不稳当，给人感觉乱成一团。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "black": {
    "en": "During the Covid-19 pandemic, he saw parallels between the ongoing crisis and the Black Death, which killed an estimated 30 to 50 percent of England’s population just a few decades before the uprising.",
    "cn": "在新冠肺炎疫情期间，他看到了持续的危机与黑死病之间的相似之处，黑死病在起义前几十年杀死了估计30%至50%的英格兰人口。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "blame": {
    "en": "They can only blame themselves for that problem, mind you.",
    "cn": "请注意，他们只能把这个问题归咎于自己。",
    "src": "Sky Sports · 2026-09-09"
  },
  "blue": {
    "en": "There was a time when the Blues used to dominate Arsenal physically -- and possibly psychologically, with ex-Arsenal boss Arsene Wenger having to fend off questions about a mental block against their London rivals.",
    "cn": "曾经有一段时间，切尔西在身体上——甚至可能在心理上——对阿森纳形成压制，前阿森纳主帅温格甚至不得不反复回应外界关于他心结的提问。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "blow": {
    "en": "He isn't the only expensive winger who dribbles past defenders for fun, blows up YouTube, and fails to turn it into goals, though.",
    "cn": "但他不是唯一一个身价昂贵、过人如麻、却在 YouTube 上爆红却无法将机会转化为进球的边锋。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "block": {
    "en": "Odegaard's goal, fired in following a quick one-two with substitute Christos Tzolis, finally broke the deadlock but Noni Madueke, another substitute, missed a one-on-one chance with Tzolis's follow-up blocked on the line, leaving Arsenal to suffer a late scare.",
    "cn": "厄德高的目标是与替补球员克里斯托斯·佐利斯（Christos Tzolis）进行快速一对二的比赛，最终打破了僵局，但另一名替补球员诺尼·马杜埃克（Noni Madueke）错过了一对一的机会，佐利斯的后续行动被挡在了线上，使阿森纳遭受了晚些时候的恐慌。",
    "src": "Sky Sports · 2026-09-09"
  },
  "big": {
    "en": "If we ignore the four wingers who moved from outside of Europe's Big Five top leagues, then we're left with 19 players.",
    "cn": "如果忽略从欧洲五大联赛之外加盟的四名边锋，剩下 19 人。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "blaze": {
    "en": "Arsenal attempted 26 shots, their most on record in a Champions League game, worth a whopping 4.05 expected goals but Mikel Merino and Bukayo Saka spurned their best chances of the first half before Piero Hincapie blazed over from close range in the second.",
    "cn": "阿森纳尝试了26次投篮，这是他们在欧冠比赛中最多的一次投篮，价值高达4.05个预期进球，但米克尔·梅里诺和布卡约·萨卡在第二场比赛中从近距离击败皮耶罗·辛卡皮之前，拒绝了他们上半场的最佳机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "believe": {
    "en": "Many believe Chelsea could push Arsenal the closest this season, given an absence of European football and Alonso's encouraging early returns.",
    "cn": "很多人认为切尔西是本赛季最有可能挑战阿森纳的球队，因为蓝军没有欧战任务，而阿隆索的开局令人鼓舞。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "belief": {
    "en": "Brentford have been all the rage with the betting markets over the first three games with the belief that Keith Andrews has improved them over the summer, although a few fingers were burnt, my included, with their lacklustre showing in the 1-1 with Sunderland last weekend.",
    "cn": "在前三场比赛中，布伦特福德一直在博彩市场上大放异彩，他们相信基思·安德鲁斯在整个夏天都改善了他们的表现，尽管上周末他们在1-1桑德兰的比赛中表现平平，但也有一些人受到了伤害，包括我的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "being": {
    "en": "So many dominant games from wingers ended up being exercises in frustration.",
    "cn": "所以很多边锋即便统治了比赛，最终也只能无功而返。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "behind": {
    "en": "And the season before wasn't too different: his 75 take-ons ranked fourth behind Doku, West Ham's Mohammed Kudus, and Liverpool's Salah.",
    "cn": "前一个赛季也差不多：他的 75 次成功突破排名第四，仅次于多库、西汉姆的库杜斯和利物浦的萨拉赫。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "behavior": {
    "en": "In 2012, researchers reported that higher-class individuals are more likely to engage in unethical behaviors, like taking candy meant for children.",
    "cn": "2012年，研究人员报告说，高阶层的人更有可能从事不道德的行为，比如吃儿童糖果。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "before": {
    "en": "Hogh headed it back into Hassan to smash in, but it had gone out of play before he sent it in.",
    "cn": "霍格把它送回哈桑那里砸了进去，但在他把它送进去之前，它已经失灵了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "belong": {
    "en": "Today, the museum displays original furniture and objects that belonged to the Impressionist, including his easel and wheelchair.",
    "cn": "今天，博物馆展示了属于印象派的原始家具和物品，包括他的画架和轮椅。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "between": {
    "en": "There will be further releases into 2027 for dates between January and July 2027.",
    "cn": "在2027年1月到7月之间还会有更多的电影上映。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "better": {
    "en": "\"We have a lot of players that can take the ball there and progress the ball much better than we did in the past,\" Arteta explained.",
    "cn": "“我们有很多球员可以把球带到那里，比过去更好地推进球，”Arteta解释说。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bet": {
    "en": "This Glasner hold over Emery isn't factored enough into the match pricing so the draw no bet on Forest at 5/4 with Sky Bet is a touch generous.",
    "cn": "格拉斯纳对埃梅里的控制并没有充分考虑到比赛的定价，所以天空博彩以5/4的赔率赌福里斯特的平局是相当慷慨的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "best": {
    "en": "The 26-year-old, French-born, Senegalese international is one of the best dribblers in the Premier League, if not the world.",
    "cn": "这位 26 岁、法籍塞内加尔国脚，是英超乃至全世界最顶尖的突破手之一。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "hook": {
    "en": "Diabate's effort for the hosts is hooked off the line by Donovan.",
    "cn": "Diabate为房东所做的努力被Donovan迷住了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "hope": {
    "en": "Former Rangers midfielder McInnes, looking forward to his first Old Firm game as boss, is hoping for positivity from the Gers supporters.",
    "cn": "前流浪者队中场麦金尼斯期待着他作为主教练的第一场老东家比赛，他希望从热刺的支持者那里得到积极的态度。",
    "src": "Sky Sports · 2026-09-10"
  },
  "hospital": {
    "en": "In 1941, enemy fire sank an Italian hospital ship off the coast of Albania.",
    "cn": "1941年，一艘意大利医院船在阿尔巴尼亚海岸附近沉没。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "host": {
    "en": "The on-loan keeper produced a huge save to deny Joel Cotterill - on his first St Johnstone start - as the hosts enjoyed the best of the chances.",
    "cn": "这位租借守门员做出了巨大的挽救，否认了Joel Cotterill -在他的第一次圣约翰斯通开始时-因为房东们享受到了最好的机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "how": {
    "en": "Nicola Tallis explores Elizabeth I’s early years to reveal how her formative experiences influenced the monarch she later became",
    "cn": "尼古拉·塔利斯探索了伊丽莎白一世的早年生活，揭示了她的成长经历是如何影响她后来成为君主的",
    "src": "HistoryExtra · 2026-09-09"
  },
  "house": {
    "en": "In France’s latest art heist, two thieves broke into Pierre-Auguste Renoir ’s house and stole four of his paintings.",
    "cn": "在法国最近的艺术品盗窃案中，两名小偷闯入皮埃尔-奥古斯特·雷诺阿的家中，偷走了他的四幅画。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "hour": {
    "en": "For an hour I was really pleased with the performance.",
    "cn": "有一个小时，我对表演非常满意。",
    "src": "Sky Sports · 2026-09-09"
  },
  "however": {
    "en": "However, the balance of that squad is what creates the problem.",
    "cn": "然而，该阵容的平衡是造成问题的原因。",
    "src": "Sky Sports · 2026-09-09"
  },
  "her": {
    "en": "For 30 years, Conti kept three paintings Gacy had given her face down in a closet.",
    "cn": "30年来，孔蒂一直把盖西给她的三幅画放在壁橱里。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "here": {
    "en": "Here are the projects that won the ten categories of the 2026 Ig Nobel Prizes.",
    "cn": "以下是获得2026年搞笑诺贝尔奖十大奖项的项目。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "him": {
    "en": "Harold’s time in Normandy ends with him making an oath to William on holy relics.",
    "cn": "哈罗德在诺曼底的时光以他对着圣物向威廉宣誓结束",
    "src": "HistoryExtra · 2026-09-09"
  },
  "home": {
    "en": "But Ødegaard made the decisive contribution, with Christos Tzolis passing infield from the left, Havertz dummying the ball brilliantly and the Arsenal captain free to smash home the winner.",
    "cn": "但厄德高做出了决定性贡献——克里斯托斯·佐利斯从左路传向禁区，哈弗茨机敏一漏，阿森纳队长顺势大力抽射打入制胜球。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "holy": {
    "en": "Harold’s time in Normandy ends with him making an oath to William on holy relics.",
    "cn": "哈罗德在诺曼底的时光以他对着圣物向威廉宣誓结束",
    "src": "HistoryExtra · 2026-09-09"
  },
  "hold": {
    "en": "This Glasner hold over Emery isn't factored enough into the match pricing so the draw no bet on Forest at 5/4 with Sky Bet is a touch generous.",
    "cn": "格拉斯纳对埃梅里的控制并没有充分考虑到比赛的定价，所以天空博彩以5/4的赔率赌福里斯特的平局是相当慷慨的。",
    "src": "Sky Sports · 2026-09-10"
  },
  "history": {
    "en": "And this wasn’t ancient history, it was inside my own father’s lifetime,” Amandeep told me.",
    "cn": "这不是古老的历史，这是我父亲一生的经历，”阿曼迪普告诉我。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "his": {
    "en": "But it was Havertz who made the most telling impact, just over three years on from his £67.5 million move across London.",
    "cn": "但真正产生决定性影响的，是三年前以 6750 万英镑跨越伦敦的哈弗茨。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "himself": {
    "en": "Dorgu enjoyed himself at left-back with Luke Shaw missing from the squad but he was able to play as a de facto winger given United's superiority.",
    "cn": "在卢克·肖缺阵的情况下，多古在左后卫的位置上表现得很好，但鉴于曼联的优势，他能够胜任边锋的位置。",
    "src": "Sky Sports · 2026-09-08"
  },
  "hit": {
    "en": "And among those, just five hit the 0.5 benchmark in the season before they moved: Barcola, Outtara, Madueke, Mbaye, and Johnson.",
    "cn": "其中只有 5 人达到了 0.5 的门槛——他们是巴尔科拉、奥塔拉、马杜埃凯、姆巴耶和约翰逊。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "important": {
    "en": "And the hunter was someone important, Dąbrowski tells PAP, like a family clan leader.",
    "cn": "Dąbrowski告诉PAP ，猎人是一个重要的人物，就像一个家族领袖。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "impress": {
    "en": "The Italian's style of football also impressed Fernandes.",
    "cn": "意大利人的足球风格也给费尔南德斯留下了深刻的印象。",
    "src": "Sky Sports · 2026-09-10"
  },
  "impressive": {
    "en": "Martin Odegaard is a player transformed at the start of this season - and Arsenal boss Mikel Arteta puts his captain's impressive form down to fitness and new positioning.",
    "cn": "马丁·厄德高（Martin Odegaard）是本赛季开始时转型的球员，主帅米克尔·阿尔特塔将队长的出色表现归功于健身和新定位。",
    "src": "Sky Sports · 2026-09-09"
  },
  "improvement": {
    "en": "\"First of all he needs to be available and last year he missed so many games through injuries,\" said Arteta when asked in his post-match press conference about Odegaard's improvement.",
    "cn": "“首先，他需要有空，去年他因伤缺席了很多比赛，”Arteta在赛后新闻发布会上被问及Odegaard的改进时说道。",
    "src": "Sky Sports · 2026-09-09"
  },
  "incline": {
    "en": "The tapestry does not explain precisely what the nature of the oath is, but other Norman-inclined sources tell us that Harold was swearing to be William’s man in England and to uphold his bid to be king on Edward’s death.",
    "cn": "挂毯上并没有准确地解释誓言的性质，但其他倾向于诺曼的资料告诉我们，哈罗德在英格兰发誓要做威廉的人，并在爱德华死后坚持他的王位。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "include": {
    "en": "Key highlights include the Junius 11 manuscript, which influenced the Tapestry’s design.",
    "cn": "关键亮点包括影响挂毯设计的Junius 11手稿。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "indication": {
    "en": "OpenAI’s breakthrough is the latest indication that A.I.",
    "cn": "OpenAI的突破是人工智能的最新迹象",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "indeed": {
    "en": "Then, to make sure that the photographed wallabies were indeed nabarlek rather than the roughly identical monjon, researchers collected scat samples from the site to analyze their DNA.",
    "cn": "然后，为了确保拍摄到的小袋鼠确实是纳巴莱克而不是大致相同的獴，研究人员从现场收集了粪便样本来分析它们的DNA。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "increase": {
    "en": "So every time a winger gets the ball and turns it into a shot instead of a cross, that player is, on average, increasing your probability of scoring a goal by 233% to 900%.",
    "cn": "所以每当边锋拿球选择射门而非传中，平均来说，你进球的概率提升了 233% 到 900%。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "hunt": {
    "en": "The funky jewelry may have been a collection of hunting trophies or a gift.",
    "cn": "时髦的珠宝可能是一系列狩猎奖杯或礼物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "husband": {
    "en": "Amandeep’s mother was tearful at seeing the names written down, but also knowing her husband, Amandeep’s father, was no longer alive to see it.",
    "cn": "阿曼迪普的母亲看到写在上面的名字时泪流满面，但也知道她的丈夫，阿曼迪普的父亲，已经不在人世了。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "idea": {
    "en": "“This year’s award winners took seemingly far-fetched ideas and turned them into legitimate research projects,” Carly Anne York, an animal behaviorist and physiologist at Lenoir-Rhyne University, tells CNN ’s Jack Guy.",
    "cn": "Lenoir-Rhyne大学的动物行为学家和生理学家卡莉·安妮·约克（Carly Anne York）告诉美国有线电视新闻网（CNN）的杰克·盖伊（Jack Guy）：“今年的获奖者把看似牵强附会的想法变成了合法的研究项目。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "ignore": {
    "en": "If we ignore the four wingers who moved from outside of Europe's Big Five top leagues, then we're left with 19 players.",
    "cn": "如果忽略从欧洲五大联赛之外加盟的四名边锋，剩下 19 人。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "impact": {
    "en": "They knew they weren't starting and they were ready to make an impact.",
    "cn": "他们知道自己还没有开始，他们已经准备好产生影响。",
    "src": "Sky Sports · 2026-09-09"
  },
  "immediately": {
    "en": "William hears of Harold’s accession and immediately starts building a fleet.",
    "cn": "威廉听到哈罗德即位的消息，立即开始组建舰队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "greek": {
    "en": "Greek outfit Aris Thessaloniki are in talks to sign Rangers defender John Souttar.",
    "cn": "希腊球队Aris Thessaloniki正在洽谈签下流浪者后卫John Souttar。",
    "src": "Sky Sports · 2026-09-10"
  },
  "group": {
    "en": "Members of a group learn to make or use these items by observing others.",
    "cn": "一个小组的成员通过观察其他人来学习制作或使用这些物品。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "grow": {
    "en": "The Renoir Museum burglary joins a growing roster of recent art thefts in Europe.",
    "cn": "雷诺阿博物馆的盗窃案是欧洲近年来不断增多的艺术品盗窃案之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "habit": {
    "en": "Now, in a study published on 25 August in the journal Wild, researchers report that this playful habit was not an isolated quirk but a skill passed among members of a pygmy raccoon family.",
    "cn": "现在，在8月25日发表在《野生》杂志上的一项研究中，研究人员报告说，这种顽皮的习惯并不是一个孤立的怪癖，而是侏儒浣熊家族成员之间传递的一种技能。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "guide": {
    "en": "The former Tottenham boss guided the USA team to the last 16 of the World Cup, where the host nation's dreams of victory came to a crashing halt against Belgium, but that barely tells the story of an extraordinary few weeks for the Argentine.",
    "cn": "这位前托特纳姆热刺主帅带领美国队参加了世界杯的最后16场比赛，东道国的胜利梦想在对阵比利时的比赛中戛然而止，但这几乎没有讲述阿根廷人非凡的几周的故事。",
    "src": "Sky Sports · 2026-09-09"
  },
  "great": {
    "en": "Was it instead intended to be draped along the walls of a great hall?",
    "cn": "它是打算挂在大厅的墙上吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "government": {
    "en": "The registers had been put together by the Punjab government in 1919–20 after the war.",
    "cn": "这些登记簿是旁遮普政府在战后的1919年至1920年间整理的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "grave": {
    "en": "Excavations in Poland have unearthed a 5,000-year-old grave, complete with a man’s skeleton, two other skulls, amber beads, a flint knife, a stone ax and a necklace made of 42 sharp teeth.",
    "cn": "波兰的挖掘工作发现了一座5000年前的坟墓，其中包括一具男子骨骼、另外两具头骨、琥珀珠、一把火石刀、一把石斧和一条由42颗锋利的牙齿制成的项链。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "half": {
    "en": "In that 16-game run they've conceded just two first-half goals.",
    "cn": "在这16场比赛中，他们上半场只丢了两个球。",
    "src": "Sky Sports · 2026-09-10"
  },
  "have": {
    "en": "Spurs' players have been unable to turn that perception into more than one point so far.",
    "cn": "到目前为止，热刺的球员们还无法将这种感觉转化为一分以上。",
    "src": "Sky Sports · 2026-09-10"
  },
  "head": {
    "en": "Heading to the British Museum to see the Bayeux Tapestry for yourself?",
    "cn": "想亲自去大英博物馆看贝叶挂毯吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "heading": {
    "en": "Rangers host Celtic at Ibrox in Sunday's League Cup quarter-final in manager Derek McInnes' first Old Firm as manager; there will be no away fans after SPFL ruling; Celtic have won all six league games heading into clash while Rangers have four consecutive Premiership wins after poor start",
    "cn": "周日联赛杯四分之一决赛，流浪者队将在伊布罗克斯主场迎战凯尔特人队，这是德里克·麦金尼斯执教的第一个老东家；苏格兰足球联盟裁决后将不会有客场球迷；凯尔特人已经赢得了联赛前的六场比赛，而流浪者则在开局不佳的情况下取得了联赛的四连胜",
    "src": "Sky Sports · 2026-09-10"
  },
  "headline": {
    "en": "Then a few weeks later, another significant headline - Pochettino had, a little surprisingly perhaps, signed for four more years with the USA.",
    "cn": "然后几周后，另一个重要的头条新闻-波切蒂诺与美国签订了四年的合同，也许有点令人惊讶。",
    "src": "Sky Sports · 2026-09-09"
  },
  "height": {
    "en": "\"He can start to go by different heights in the team, especially in the attacking phase, and when we get him into those positions he's a really dangerous player.\"",
    "cn": "“他可以开始在球队中达到不同的高度，特别是在进攻阶段，当我们让他进入这些位置时，他是一个非常危险的球员。",
    "src": "Sky Sports · 2026-09-09"
  },
  "happen": {
    "en": "We need to keep giving him the ball and letting things happen.\"",
    "cn": "我们需要继续给他球，让事情发生。",
    "src": "Sky Sports · 2026-09-09"
  },
  "hang": {
    "en": "But it takes its name from the French tapisserie, meaning ‘wall hanging’.",
    "cn": "但它的名字来自法语tapisserie，意思是“挂在墙上”。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "happy": {
    "en": "\"The first day of the pre-season, I met him and he was very happy.",
    "cn": "“季前赛的第一天，我见到了他，他很高兴。",
    "src": "Sky Sports · 2026-09-10"
  },
  "hand": {
    "en": "Mainland raccoons, on the other hand, typically weigh between 15 and 40 pounds.",
    "cn": "另一方面，大陆浣熊的体重通常在15到40磅之间。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "hammer": {
    "en": "\"I believe that I can be a much better player than I was last season,\" said the 22-year-old Portuguese, who recorded three goals and four assists in the Premier League for the Hammers.",
    "cn": "“我相信我可以成为一个比上赛季更好的球员，”这位22岁的葡萄牙人说，他在英超联赛中为铁锤帮贡献了3个进球和4次助攻。",
    "src": "Sky Sports · 2026-09-10"
  },
  "hall": {
    "en": "Lewis Hall' s new Newcastle United contract will not include a release clause.",
    "cn": "刘易斯·霍尔（Lewis Hall）的新纽卡斯尔联队合同将不包括解除条款。",
    "src": "Sky Sports · 2026-09-09"
  },
  "land": {
    "en": "It’s a once-in-a-lifetime opportunity – or, really, once in a millennium: the chance to admire the Bayeux Tapestry in the land of its creation.",
    "cn": "这是一个千载难逢的机会，或者说，千载难逢：有机会在贝叶挂毯的诞生地欣赏它。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "last": {
    "en": "Arsenal conceded just 27 goals in 38 league games on their way to the title last season.",
    "cn": "阿森纳上赛季以 38 场仅丢 27 球的防守赢得了联赛冠军。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "later": {
    "en": "“At 5:53 a.m., just five minutes later, our municipal police were on the scene.”",
    "cn": "“早上5点53分，仅仅5分钟后，我们市警察就到了现场。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "late": {
    "en": "Balogun has been in the headlines again over the past few weeks after his proposed move from Monaco to Everton collapsed late on Deadline Day.",
    "cn": "Balogun在截止日期当天晚些时候从摩纳哥搬到埃弗顿的提议崩溃后，过去几周再次成为头条新闻。",
    "src": "Sky Sports · 2026-09-09"
  },
  "laugh": {
    "en": "Rogers haunts Arsenal, but Havertz has the last laugh.",
    "cn": "罗杰斯让阿森纳心惊胆战，但哈弗茨才是笑到最后的人。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "lay": {
    "en": "Christie fans will soon be able to lay eyes on rare letters like this one, as well as some of her notebooks, photos, other personal belongings and manuscript drafts.",
    "cn": "克里斯蒂的粉丝很快就能看到像这封这样的罕见信件，以及她的一些笔记本、照片、其他私人物品和手稿草稿。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "keep": {
    "en": "US Open chief Craig Tiley has vowed to keep same day and night format despite Ben Shelton beating Carlos Alcaraz at 3.33am local time.",
    "cn": "尽管本·谢尔顿在当地时间凌晨3点33分击败卡洛斯·阿尔卡拉兹，但美网公开赛主席克雷格·泰利誓言将保持同样的昼夜赛制。",
    "src": "Sky Sports · 2026-09-10"
  },
  "keeper": {
    "en": "The St Mirren 'keeper rushes out and is beaten with a cute dink.",
    "cn": "圣米伦（St Mirren）的守门员冲了出去，被一个可爱的丁克殴打。",
    "src": "Sky Sports · 2026-09-09"
  },
  "key": {
    "en": "David Musgrove reveals everything you need to know about the British Museum’s landmark Bayeux Tapestry exhibition, including details of tickets, how the embroidery is being displayed, and the key scenes you should look out for",
    "cn": "大卫·马斯格罗夫向你揭示了大英博物馆标志性的贝叶挂毯展览的一切，包括门票的细节，刺绣是如何展示的，以及你应该注意的关键场景",
    "src": "HistoryExtra · 2026-09-10"
  },
  "kick": {
    "en": "There will be seven Premier League matches on Boxing Day this year, with Hull City vs Liverpool - kicking off at 5.30pm - and Newcastle vs Man City - kicking off at 8pm - featuring as a live Sky Sports double header.",
    "cn": "今年节礼日将有七场英超比赛，赫尔城vs利物浦，下午5:30开球，纽卡斯尔vs曼城，晚上8点开球，这是天空体育直播的两场比赛。",
    "src": "Sky Sports · 2026-09-10"
  },
  "kind": {
    "en": "“All good mystery novels end up with some kind of happy ending.",
    "cn": "“所有优秀的推理小说都以某种大团圆结局告终。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "king": {
    "en": "The upshot of course is that King Harold is slain, with the defeated Englishmen being shown fleeing the field in the last scene of the tapestry.",
    "cn": "当然，结局是哈罗德国王被杀，战败的英国人在挂毯的最后一幕逃离战场。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "know": {
    "en": "Here’s what you need to know about the real history behind The Uprising ahead of the film’s arrival in theaters across the United States on September 10.",
    "cn": "以下是电影于9月10日抵达美国各地影院之前，您需要了解的《起义》背后的真实历史。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "knife": {
    "en": "Excavations in Poland have unearthed a 5,000-year-old grave, complete with a man’s skeleton, two other skulls, amber beads, a flint knife, a stone ax and a necklace made of 42 sharp teeth.",
    "cn": "波兰的挖掘工作发现了一座5000年前的坟墓，其中包括一具男子骨骼、另外两具头骨、琥珀珠、一把火石刀、一把石斧和一条由42颗锋利的牙齿制成的项链。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "library": {
    "en": "“ Agatha Christie: A World of Mystery,” opening next month at the British Library, in London, includes never-before-seen artifacts from the rollicking life of literature’s “Queen of Crime.”",
    "cn": "《阿加莎·克里斯蒂：神秘的世界》（Agatha Christie: A World of Mystery）将于下月在伦敦的大英图书馆（British Library）开幕，展出了这位文学“犯罪女王”欢乐生活中从未见过的文物。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "lieutenant": {
    "en": "For Pochettino, the biggest takeaway is how much he and his coaching staff, including his long-term lieutenant Jesus Perez, have learned.",
    "cn": "对于Pochettino来说，最大的收获是他和他的教练组，包括他的长期副手Jesus Perez ，学到了多少东西。",
    "src": "Sky Sports · 2026-09-09"
  },
  "life": {
    "en": "Rachel Dinning rounds up essential reading from the HistoryExtra archive that explores Elizabeth's early life, rise to power, and the legacy that made her one of England’s most iconic monarchs.",
    "cn": "雷切尔·丁宁从HistoryExtra的档案中收集了一些重要的读物，这些读物探索了伊丽莎白的早期生活，掌权的过程，以及使她成为英格兰最具代表性的君主之一的遗产。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "lift": {
    "en": "The substitute raced onto Ryan Naderi's flick-on from Ivor Pandur's long ball before lifting a delightful lob over the goalkeeper to send Ibrox wild after a drab 90 minutes.",
    "cn": "替补队员从Ivor Pandur的长球中冲上Ryan Naderi的轻弹，然后在守门员身上举起一个令人愉快的球，在单调的90分钟后将Ibrox送到野外。",
    "src": "Sky Sports · 2026-09-09"
  },
  "light": {
    "en": "The anxiety from the Light Blues legions, which has been prevalent in some games in Govan, resurfaced on Wednesday night as the home side struggled in the second half of the Scottish Premiership clash against St Mirren after missing a host of chances before the break.",
    "cn": "在苏格兰联赛对阵圣米伦的比赛中，主队在中场休息前错过了很多机会，下半场比赛中表现不佳，在戈文的一些比赛中，蓝军军团的焦虑情绪再次浮现。",
    "src": "Sky Sports · 2026-09-10"
  },
  "line": {
    "en": "Diabate's effort for the hosts is hooked off the line by Donovan.",
    "cn": "Diabate为房东所做的努力被Donovan迷住了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "likely": {
    "en": "Christos Tzolis is likely to be one of those players Arteta is referencing.",
    "cn": "Christos Tzolis很可能是Arteta提到的球员之一。",
    "src": "Sky Sports · 2026-09-09"
  },
  "like": {
    "en": "And the hunter was someone important, Dąbrowski tells PAP, like a family clan leader.",
    "cn": "Dąbrowski告诉PAP ，猎人是一个重要的人物，就像一个家族领袖。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "level": {
    "en": "It's been jaw dropping the way they have adapted their game to this level of football.",
    "cn": "他们让自己的比赛适应这种水平的足球的方式令人惊叹。",
    "src": "Sky Sports · 2026-09-10"
  },
  "least": {
    "en": "He's the only player on the list who didn't complete at least one take-on per 90 minutes.",
    "cn": "他是这份名单中唯一一个场均成功突破不到一次的球员。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "learned": {
    "en": "Greengrass first learned about the Peasants’ Revolt as a schoolchild.",
    "cn": "格林格拉斯从小就开始了解农民起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "leading": {
    "en": "This account of the events leading up to and during the Norman conquest of 1066 was probably made in England in the 1070s – and its arrival at the British Museum, where it’s on display until 11 July 2027, marks probably the first time since that it’s crossed the Channel.",
    "cn": "这本关于1066年诺曼征服之前和期间发生的事件的记载可能是在20世纪70年代的英国制作的，它被送到大英博物馆，在那里展出到2027年7月11日，这可能是它第一次横渡英吉利海峡。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "lead": {
    "en": "It did for Barcola, who leads all players with 0.8 xG plus xA.",
    "cn": "巴尔科拉做到了这一点，他的预期进球加助攻以 0.8 排名榜首。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "league": {
    "en": "Arsenal conceded just 27 goals in 38 league games on their way to the title last season.",
    "cn": "阿森纳上赛季以 38 场仅丢 27 球的防守赢得了联赛冠军。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "keen": {
    "en": "The £85m midfielder was wanted by a list of clubs after impressing for West Ham last season, with Man Utd keen on a deal but ultimately unable to go head-to-head with Spurs on the fee.",
    "cn": "这位身价8500万英镑的中场球员在上赛季对西汉姆联队表现出色后，曾被多家俱乐部看上，曼联希望与他达成交易，但最终无法在转会费上与热刺展开正面交锋。",
    "src": "Sky Sports · 2026-09-10"
  },
  "leave": {
    "en": "Odegaard's goal, fired in following a quick one-two with substitute Christos Tzolis, finally broke the deadlock but Noni Madueke, another substitute, missed a one-on-one chance with Tzolis's follow-up blocked on the line, leaving Arsenal to suffer a late scare.",
    "cn": "厄德高的目标是与替补球员克里斯托斯·佐利斯（Christos Tzolis）进行快速一对二的比赛，最终打破了僵局，但另一名替补球员诺尼·马杜埃克（Noni Madueke）错过了一对一的机会，佐利斯的后续行动被挡在了线上，使阿森纳遭受了晚些时候的恐慌。",
    "src": "Sky Sports · 2026-09-09"
  },
  "left": {
    "en": "Most of the dominance disappeared as soon as the ball left the winger's foot.",
    "cn": "球一旦离开边锋的脚下，那种统治力就消失了。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "letter": {
    "en": "Christie fans will soon be able to lay eyes on rare letters like this one, as well as some of her notebooks, photos, other personal belongings and manuscript drafts.",
    "cn": "克里斯蒂的粉丝很快就能看到像这封这样的罕见信件，以及她的一些笔记本、照片、其他私人物品和手稿草稿。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "let": {
    "en": "We need to keep giving him the ball and letting things happen.\"",
    "cn": "我们需要继续给他球，让事情发生。",
    "src": "Sky Sports · 2026-09-09"
  },
  "leg": {
    "en": "\"The back three, when I watch them, it's almost like their legs aren't connected to their hips and the hips aren't connected to their bodies,\" he said on his Sky Sports podcast.",
    "cn": "他在自己的天空体育播客中说：「看这三中卫比赛，几乎感觉他们的腿和髋关节、髋关节和躯干是断开的。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "length": {
    "en": "As you walk the length of the Tapestry, look out for its most famous episodes: King Edward the Confessor ’s deathbed scene; Harold Godwinson ’s fateful oath to William; the appearance of Halley’s Comet as an omen; the mustering of Norman ships; and the climactic battle of Hastings, where Harold is slain.",
    "cn": "当你走在挂毯上时，要注意它最著名的几集：忏悔者爱德华国王的临终场景；哈罗德·戈德温森对威廉的致命誓言；哈雷彗星的出现是一种预兆；诺曼船只的集结；以及黑斯廷斯战役的高潮哈罗德被杀",
    "src": "HistoryExtra · 2026-09-10"
  },
  "just": {
    "en": "“At 5:53 a.m., just five minutes later, our municipal police were on the scene.”",
    "cn": "“早上5点53分，仅仅5分钟后，我们市警察就到了现场。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "installation": {
    "en": "More than 500,000 visitors worldwide have visited the installation.",
    "cn": "全球已有超过50万名参观者参观了该装置。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "instead": {
    "en": "Was it instead intended to be draped along the walls of a great hall?",
    "cn": "它是打算挂在大厅的墙上吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "interest": {
    "en": "Nottingham Forest could revive their interest in Tottenham midfielder Lucas Bergvall in January.",
    "cn": "诺丁汉森林可能会在一月份恢复他们对托特纳姆热刺中场球员卢卡斯·伯格瓦尔的兴趣。",
    "src": "Sky Sports · 2026-09-09"
  },
  "inspire": {
    "en": "A Palmer penalty turned the game on its head suddenly after Pep Chavarria was caught by Dan James, but it was Rogers who inspired the comeback, making four of Chelsea's six goals.",
    "cn": "佩普·查瓦里亚（Pep Chavarria）被丹·詹姆斯（Dan James）抓住后，帕尔默（Palmer）的点球突然扭转了局面，但正是罗杰斯（Rogers）激发了复出，在切尔西的六个进球中",
    "src": "Sky Sports · 2026-09-09"
  },
  "insist": {
    "en": "He insisted Xabi Alonso should focus on reinforcements at the back.",
    "cn": "他坚称哈维·阿隆索应当把补强后防作为首要任务。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "inefficient": {
    "en": "The problem, though, is that even the best crossers are incredibly inefficient.",
    "cn": "问题是，即便是最顶级的传中高手，效率也低得惊人。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "injury": {
    "en": "Odegaard, uninhibited by injuries, looks a different player.",
    "cn": "厄德高不受伤病的束缚，看起来是不同的球员。",
    "src": "Sky Sports · 2026-09-09"
  },
  "international": {
    "en": "Chelsea and Madrid are reportedly interested in the Spanish international, 27.",
    "cn": "据报道，切尔西和马德里对这名27岁的西班牙国脚很感兴趣。",
    "src": "Sky Sports · 2026-09-10"
  },
  "january": {
    "en": "There will be further releases into 2027 for dates between January and July 2027.",
    "cn": "在2027年1月到7月之间还会有更多的电影上映。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "jaw": {
    "en": "“My jaw hit the floor when I got the phone call” about the award, Matilda Brindle, an evolutionary biologist at the University of Oxford in England who worked on the research, tells Nature ’s Chris Simms.",
    "cn": "英国牛津大学的进化生物学家玛蒂尔达·布林德尔（Matilda Brindle）告诉《自然》杂志的克里斯·西姆斯（Chris Simms），“当我接到关于该奖项的电话时，我的下巴掉在地板上”。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "job": {
    "en": "Having finished 10th last season, 33 points behind the Gunners, Chelsea have done a remarkable job in the summer to put themselves back in the title mix.",
    "cn": "上赛季只拿到第 10 名、落后阿森纳 33 分的切尔西，在今夏完成了一项了不起的工作，让自己重新回到争冠行列。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "join": {
    "en": "Spurs may have failed to win any of their first three Premier League games this season, but summer signing Matheus Fernandes is convinced he has joined a squad set to start fighting for trophies.",
    "cn": "热刺本赛季的前三场英超比赛可能一场都没赢，但是夏天签下的费尔南德斯相信他已经加入了一支为奖杯而战的球队。",
    "src": "Sky Sports · 2026-09-10"
  },
  "jolly": {
    "en": "This jolly discovery has a poignant undertone.",
    "cn": "这一令人愉快的发现暗含着辛酸的意味。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "july": {
    "en": "The Bayeux Tapestry exhibition opened at the Sainsbury Exhibitions Gallery at the British Museum on 10 September 2026 and will run until 11 July 2027.",
    "cn": "贝叶挂毯展览于2026年9月10日在大英博物馆的塞恩斯伯里展览馆开幕，将持续到2027年7月11日。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "joy": {
    "en": "The Azerbaijani side started brightly but Matheus Cunha converted Patrick Dorgu's 27th-minute cross and, although Joy-Lance Mickels should have levelled, two goals late in the first half from Bruno Fernandes and Benjamin Sesko put United in total control.",
    "cn": "阿塞拜疆队开局不错，但库尼亚在第27分钟接应了多尔古的传中，尽管米克尔斯本可以扳平比分，但上半场后半段布鲁诺·费尔南德斯和本杰明·塞斯科的两粒进球让曼联完全控制了比分。",
    "src": "Sky Sports · 2026-09-08"
  },
  "its": {
    "en": "David Musgrove and Michael Lewis reveal the 10 things you simply must do when experiencing the world’s most famous embroidery in all its glory",
    "cn": "大卫·马斯格罗夫和迈克尔·刘易斯揭示了在体验世界上最著名的刺绣的荣耀时，你必须做的10件事",
    "src": "HistoryExtra · 2026-09-10"
  },
  "introduction": {
    "en": "The Blues found themselves two goals behind when Brenden Aaronson struck after 47 minutes to add to Tarik Muharemovic's opener, and it appeared Xabi Alonso's first real cup test would end in disappointment - despite the half-time introduction of Cole Palmer, Morgan Rogers, Pedro Neto and Reece James.",
    "cn": "布兰登·亚伦森（Brenden Aaronson）在47分钟后击中塔里克·穆哈雷莫维奇（Tarik Muharemovic）的揭幕战后，蓝军发现自己落后了两个进球，尽管科尔·帕尔默（Cole Palmer）、摩根·罗杰斯（Morgan Rogers）、佩德罗·内托（Pedro Neto）和里斯·詹姆斯（Reece James）中场休息，但似乎萨比·阿隆索",
    "src": "Sky Sports · 2026-09-09"
  },
  "introduce": {
    "en": "Palmer, Rogers, James and Neto are introduced for Estevao, Jamie Gittens, Malo Gusto and 16-year-old debutant Reggie Watson.",
    "cn": "为Estevao、Jamie Gittens、Malo Gusto和16岁的Reggie Watson介绍Palmer、Rogers、James和Neto。",
    "src": "Sky Sports · 2026-09-09"
  },
  "into": {
    "en": "Naderi flicks on a long ball into Miovski's path, who's then one-on-one with Chapman.",
    "cn": "Naderi在Miovski的路径上弹了一个长球，然后与Chapman一对一。",
    "src": "Sky Sports · 2026-09-09"
  },
  "interview": {
    "en": "Mauricio Pochettino speaks to Sky Sports News' Gail Davis in an exclusive interview; ex-Tottenham and Chelsea boss reveals hope of returning to Premier League in future; last month, the Argentine signed a new four-year deal to continue as the manager of the USA men's team",
    "cn": "毛里西奥·波切蒂诺（Mauricio Pochettino）在接受天空体育新闻（Sky Sports News）的盖尔·戴维斯（Gail Davis）独家采访时表示；前托特纳姆热刺和切尔西主帅透露了未来重返英超联赛的希望；上个月，阿根廷人签署了一份新的四年合同，继续担任美国男子队的经理",
    "src": "Sky Sports · 2026-09-09"
  },
  "intimate": {
    "en": "At the British Museum, for the first time in decades – possibly in its history – the Tapestry is being displayed in a single length, lying flat, providing the most intimate perspective since it was first put on permanent public display in 1842.",
    "cn": "在大英博物馆，这是几十年来——可能是它的历史上——第一次以单一的长度平放，提供了自1842年首次永久公开展出以来最亲密的视角。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "italian": {
    "en": "The Italian's style of football also impressed Fernandes.",
    "cn": "意大利人的足球风格也给费尔南德斯留下了深刻的印象。",
    "src": "Sky Sports · 2026-09-10"
  },
  "investigate": {
    "en": "Since then, mathematicians have been investigating whether these equations work in all situations or whether they allow for a theoretical case in which a small part of the fluid moves infinitely quickly and the solution breaks down—or “blows up.”",
    "cn": "从那时起，数学家们一直在研究这些方程是否适用于所有情况，或者它们是否允许一种理论情况，在这种情况下，一小部分流体无限快速地运动，溶液就会破裂或“爆炸”。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "good": {
    "en": "“All good mystery novels end up with some kind of happy ending.",
    "cn": "“所有优秀的推理小说都以某种大团圆结局告终。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "equation": {
    "en": "Because of the longstanding interest in these equations, Navier-Stokes, officially called the Navier-Stokes existence and smoothness problem, is one of seven mathematical problems with a $1 million award offered for each solution—they’re known collectively as the Millennium Prize Problems.",
    "cn": "由于长期以来对这些方程的兴趣，纳维-斯托克斯问题，正式名称为纳维-斯托克斯存在性和平滑性问题，是七个数学问题之一，每个解决方案都有100万美元的奖金——它们被统称为千年奖问题。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "especially": {
    "en": "\"He can start to go by different heights in the team, especially in the attacking phase, and when we get him into those positions he's a really dangerous player.\"",
    "cn": "“他可以开始在球队中达到不同的高度，特别是在进攻阶段，当我们让他进入这些位置时，他是一个非常危险的球员。",
    "src": "Sky Sports · 2026-09-09"
  },
  "europe": {
    "en": "It is over 1000 days since United competed in a Champions League game but this, their 300th in Europe's premier club competition, was not too taxing for Carrick's men.",
    "cn": "曼联已经1000多天没有参加欧冠比赛了，但这是他们在欧洲顶级俱乐部比赛中的第300场比赛，对卡里克的队员来说并不是太繁重。",
    "src": "Sky Sports · 2026-09-08"
  },
  "everyone": {
    "en": "“Something everyone had heard of, but no one had actually seen.”",
    "cn": "“每个人都听说过，但没有人真正见过。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "every": {
    "en": "Anecdotally, he knew a record had been kept of every man that served in the First World War from Punjab, where his family were from.",
    "cn": "有趣的是，他知道有一份记录保存着每一个在第一次世界大战中服役的人都来自旁遮普，他的家人来自那里。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "ever": {
    "en": "If there was ever a goal to sum up a game, this was it.",
    "cn": "如果有一个目标来总结一场比赛，那就是它。",
    "src": "Sky Sports · 2026-09-09"
  },
  "eventually": {
    "en": "“If these eggshells belong to colossosaurians, the hatchlings had to have had plenty of nutritious food resources in that environment to start packing on the tonnes to eventually reach their colossal body sizes,” Zelenitsky tells CNN.",
    "cn": "Zelenitsky告诉美国有线电视新闻网（CNN）：“如果这些蛋壳属于巨龙，那么幼崽必须在那种环境中拥有大量营养丰富的食物资源，才能开始积累大量食物，最终达到巨大的体型。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "event": {
    "en": "Objects from the British Museum’s own collection and other significant loans from across the UK and Europe are displayed, offering fresh perspectives on the people and events depicted in the embroidery.",
    "cn": "展品包括大英博物馆自己收藏的物品，以及从英国和欧洲各地借来的其他重要物品，为刺绣中描绘的人物和事件提供了新的视角。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "even": {
    "en": "In fact, among the seven players who went for over €60 million, four of them -- Sávio, Ndiaye, Kudus, and Elanga -- didn't even get to 0.4 xG plus xA.",
    "cn": "事实上，在转会费超过 6000 万欧元的 7 名球员中，有 4 人——萨维奥、恩迪亚耶、库杜斯和埃兰加——甚至没能达到 0.4 的预期进球加助攻。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "european": {
    "en": "They've got City next week and European games starting in midweek.\"",
    "cn": "他们下周有曼城，欧洲比赛将在周中开始。",
    "src": "Sky Sports · 2026-09-09"
  },
  "everything": {
    "en": "David Musgrove reveals everything you need to know about the British Museum’s landmark Bayeux Tapestry exhibition, including details of tickets, how the embroidery is being displayed, and the key scenes you should look out for",
    "cn": "大卫·马斯格罗夫向你揭示了大英博物馆标志性的贝叶挂毯展览的一切，包括门票的细节，刺绣是如何展示的，以及你应该注意的关键场景",
    "src": "HistoryExtra · 2026-09-10"
  },
  "environment": {
    "en": "Still, they found a way to “not only reproduce or nest in the lower latitude environments but also in these higher-latitude environments, which are usually more challenging.\"",
    "cn": "尽管如此，他们还是找到了一种方法，“不仅可以在低纬度环境中繁殖或筑巢，还可以在这些通常更具挑战性的高纬度环境中繁殖或筑巢。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "end": {
    "en": "So many dominant games from wingers ended up being exercises in frustration.",
    "cn": "所以很多边锋即便统治了比赛，最终也只能无功而返。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "ending": {
    "en": "The ending is abrupt and many people have pondered on whether the tapestry was not actually finished, or has lost its final frames at some point over the centuries.",
    "cn": "结局很突然，许多人都在想，这幅挂毯到底是没有完成，还是几个世纪以来的某个时候失去了最后的画框。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "energy": {
    "en": "\"You can feel when you speak with him, the energy, the passion about football.",
    "cn": "“当你和他交谈时，你能感受到他对足球的能量和激情。",
    "src": "Sky Sports · 2026-09-10"
  },
  "england": {
    "en": "Harold then goes back to England and has another meeting with Edward the Confessor.",
    "cn": "哈罗德随后回到英格兰，与忏悔者爱德华再次会面。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "enthusiastic": {
    "en": "Having had a few weeks to reset away from the spotlight, there were enthusiastic hugs all round for the Sky Sports News team as we all swapped summer stories.",
    "cn": "在离开聚光灯几周后，天空体育新闻团队充满了热情的拥抱，因为我们都交换了夏天的故事。",
    "src": "Sky Sports · 2026-09-09"
  },
  "enough": {
    "en": "This has gone on for long enough that it's not just some random quirk.",
    "cn": "这种情况已经持续了足够长的时间，绝不只是偶然。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "expect": {
    "en": "An expected goals total of 4.05 showed they should have got far more for their efforts.",
    "cn": "预期目标总数为4.05 ，这表明他们的努力应该得到更多。",
    "src": "Sky Sports · 2026-09-09"
  },
  "expensive": {
    "en": "He isn't the only expensive winger who dribbles past defenders for fun, blows up YouTube, and fails to turn it into goals, though.",
    "cn": "但他不是唯一一个身价昂贵、过人如麻、却在 YouTube 上爆红却无法将机会转化为进球的边锋。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "experience": {
    "en": "\"If you look at the squad, it's a big team with big players, important players, players with experience, players with a lot of quality.",
    "cn": "“如果你看看这支球队，你会发现这是一支拥有大牌球员、重要球员、有经验的球员、有实力的球员的强队。",
    "src": "Sky Sports · 2026-09-10"
  },
  "explain": {
    "en": "“Their eggshells were very porous, which means if the eggs were left out in the open, they would lose water, dry out, and the embryos would die,” Zelenitsky explains to CNN.",
    "cn": "Zelenitsky向美国有线电视新闻网解释说：“它们的蛋壳非常多孔，这意味着如果卵子被放在外面，它们会失去水分，变干，胚胎就会死亡。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "explore": {
    "en": "Rachel Dinning rounds up essential reading from the HistoryExtra archive that explores Elizabeth's early life, rise to power, and the legacy that made her one of England’s most iconic monarchs.",
    "cn": "雷切尔·丁宁从HistoryExtra的档案中收集了一些重要的读物，这些读物探索了伊丽莎白的早期生活，掌权的过程，以及使她成为英格兰最具代表性的君主之一的遗产。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "extra": {
    "en": "Glasner is unbeaten in seven meeting with Emery, winning five and what gives this angle extra robustness is across the last five league meetings Glasner's team are creating 2.47 expected goals per 90.",
    "cn": "格拉斯纳在与埃默里的七次交锋中保持不败，赢了五场，在过去的五次联赛中，格拉斯纳的球队每90分钟创造2.47个预期进球，这让这个角度更加坚固。",
    "src": "Sky Sports · 2026-09-10"
  },
  "express": {
    "en": "The novelist was describing an eventful trip on the luxurious Orient Express, the 20th-century passenger train that ran between Paris and Istanbul.",
    "cn": "这位小说家正在描述乘坐豪华的东方快车（Orient Express）的一次多事之旅，这列火车是20世纪在巴黎和伊斯坦布尔之间行驶的客运列车。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "exist": {
    "en": "His now-City teammate Jérémy Doku exists in his own ball-carrying world, but Ndiaye ranked second behind him in completed take-ons last season, per the stats app Futi.",
    "cn": "他如今的曼城队友多库在持球推进方面独成一档，而根据数据应用 Futi 的统计，恩迪亚耶上赛季成功突破数仅次于多库。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "exhibition": {
    "en": "She had many identities and passions, which the exhibition aims to illuminate.",
    "cn": "她有许多身份和激情，这次展览旨在阐明这些。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "execute": {
    "en": "While on death row, he became a prolific painter and made more than $30,000 selling his canvases, which often featured clowns and skulls, the Los Angeles Times ’ Stephen Braun reported in 1994, the year Gacy was executed.",
    "cn": "《洛杉矶时报》的斯蒂芬·布劳恩（Stephen Braun）在1994年报道说，在死囚区，他成为一名多产的画家，卖掉画布赚了3万多$ ，画布上经常有小丑和头骨。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "eye": {
    "en": "Michael Carrick made changes in the second half with the points secure but there was still time for Lisandro Martinez to smash home from close range after some flashy play from Joshua Zirkzee, who produced an eye-catching cameo.",
    "cn": "迈克尔·卡里克在下半场做出了一些改变，确保了积分，但在约书亚·齐克切的精彩发挥后，马丁内斯仍然有时间近距离破门，齐克切也有一个引人注目的客串。",
    "src": "Sky Sports · 2026-09-08"
  },
  "draw": {
    "en": "Prophetic words from Gary Neville in the wake of Manchester United's 2-2 draw with Everton.",
    "cn": "加里·内维尔（Gary Neville）在曼联2-2战平埃弗顿之后的预言。",
    "src": "Sky Sports · 2026-09-09"
  },
  "drop": {
    "en": "Halfway through, they have dropped more points than they have gained.",
    "cn": "中途，他们的得分比他们获得的要多。",
    "src": "Sky Sports · 2026-09-09"
  },
  "during": {
    "en": "The part that Amandeep and the University of Greenwich team of researchers were looking at was the subset of the register of those who died during the war.",
    "cn": "阿曼迪普和格林尼治大学的研究小组所关注的部分是战争期间死亡人员登记册的一部分。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "dramatic": {
    "en": "Bojan Miovski's cute dink in stoppage time sealed a dramatic 1-0 victory for Rangers over St Mirren and extended their winning run to four games in the Scottish Premiership.",
    "cn": "博扬·米奥夫斯基（Bojan Miovski）在停赛时间的可爱表演使流浪者队以1比0击败圣米伦队，并将他们在苏格兰超级联赛中的胜利延长至四场比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "district": {
    "en": "One of the first full registers Amandeep asked for was for Ambala, his family’s district.",
    "cn": "阿曼迪普要求的第一批完整的选民之一是他家所在的安巴拉区。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "document": {
    "en": "The Bayeux Tapestry is one of the most famous and recognisable historic documents in the world, telling the story of the Norman Conquest of England in 1066, with a focus on the battle of Hastings and the showdown between William of Normandy and King Harold II.",
    "cn": "贝叶挂毯是世界上最著名和最知名的历史文献之一，讲述了1066年诺曼征服英格兰的故事，重点讲述了黑斯廷斯战役以及诺曼底的威廉和国王哈罗德二世之间的对决。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "dozen": {
    "en": "Displays spotlight personal belongings, investigative evidence, authentic artworks and other “murderabilia” that offer an uncanny peek into the lives of roughly 150 killers from dozens of countries who devised and committed unthinkable crimes.",
    "cn": "展示聚光灯下的个人物品、调查证据、真实的艺术品和其他“谋杀品”，让人们惊奇地窥见来自数十个国家的大约150名凶手的生活，这些凶手策划并犯下了不可思议的罪行。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "down": {
    "en": "For 30 years, Conti kept three paintings Gacy had given her face down in a closet.",
    "cn": "30年来，孔蒂一直把盖西给她的三幅画放在壁橱里。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "double": {
    "en": "With a Europa League tie and an Old Firm cup and league double coming up, Martin O'Neill made five changes as Kasper Hogh returned from injury and Sam Johnstone took over in goal.",
    "cn": "随着欧罗巴联赛平局和老公司杯和联赛双打的到来，马丁·奥尼尔（Martin O'Neill）做出了五项改变，卡斯珀·霍格（Kasper Hogh）因伤复出，萨姆·约翰斯通（Sam Johnstone）接",
    "src": "Sky Sports · 2026-09-09"
  },
  "each": {
    "en": "As they battled for titles each year under Jurgen Klopp and Pep Guardiola, Liverpool and Manchester City's rosters were filled with wide players who created lots of goals and won lots of games.",
    "cn": "在克洛普和瓜迪奥拉的带领下，利物浦和曼城年年争冠，他们的阵容里都是能创造大量进球、能赢下比赛的边路球员。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "easily": {
    "en": "St Mirren could easily have taken all three points, having created the clearest chance of the game when Fraser Taylor was sent through one-on-one with Pandur.",
    "cn": "当弗雷泽·泰勒（Fraser Taylor）与潘杜尔（Pandur）进行一对一的比赛时，圣米伦（St Mirren）本可以轻松拿下这三分，创造了比赛中最明显的机会",
    "src": "Sky Sports · 2026-09-09"
  },
  "eighth": {
    "en": "However, they rank eighth in midfield and 10th in defence.",
    "cn": "然而，他们在中场排名第八，在防守方面排名第十。",
    "src": "Sky Sports · 2026-09-09"
  },
  "egg": {
    "en": "The researchers still don’t know what species of titanosaur the eggs belonged to, but teeth also found at the site belonged to colossosaurian titanosaurs.",
    "cn": "研究人员仍然不知道这些卵属于哪种泰坦龙，但在现场发现的牙齿也属于巨型泰坦龙。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "effort": {
    "en": "An expected goals total of 4.05 showed they should have got far more for their efforts.",
    "cn": "预期目标总数为4.05 ，这表明他们的努力应该得到更多。",
    "src": "Sky Sports · 2026-09-09"
  },
  "editor": {
    "en": "Rachel Dinning is digital editor (engagement and video) at HistoryExtra",
    "cn": "雷切尔·丁宁是HistoryExtra的数字编辑（参与和视频）",
    "src": "HistoryExtra · 2026-09-09"
  },
  "edge": {
    "en": "He first gets down to a Gassama strike from the edge of the area.",
    "cn": "他首先从该地区的边缘开始加萨马罢工。",
    "src": "Sky Sports · 2026-09-09"
  },
  "link": {
    "en": "A harrowing curation of artifacts linked to the world’s most notorious serial killers—including the “Killer Clown” John Wayne Gacy and H.H.",
    "cn": "一系列与世界上最臭名昭著的连环杀手有关的文物，包括“杀手小丑”约翰·韦恩·盖西（John Wayne Gacy）和H.H.",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "fact": {
    "en": "In fact, among the seven players who went for over €60 million, four of them -- Sávio, Ndiaye, Kudus, and Elanga -- didn't even get to 0.4 xG plus xA.",
    "cn": "事实上，在转会费超过 6000 万欧元的 7 名球员中，有 4 人——萨维奥、恩迪亚耶、库杜斯和埃兰加——甚至没能达到 0.4 的预期进球加助攻。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "fresh": {
    "en": "Objects from the British Museum’s own collection and other significant loans from across the UK and Europe are displayed, offering fresh perspectives on the people and events depicted in the embroidery.",
    "cn": "展品包括大英博物馆自己收藏的物品，以及从英国和欧洲各地借来的其他重要物品，为刺绣中描绘的人物和事件提供了新的视角。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "friday": {
    "en": "And in the weekend in between, Sky Sports will be showing Leeds vs Everton on Friday Night Football on New Year's Day, then Bournemouth vs Aston Villa on January 3 for Saturday Night Football at 5.30pm.",
    "cn": "在这期间的周末，天空体育将在新年当天播放利兹对埃弗顿的周五晚间足球比赛，然后在1月3日下午5:30播放伯恩茅斯对阿斯顿维拉的周六晚间足球比赛。",
    "src": "Sky Sports · 2026-09-10"
  },
  "from": {
    "en": "Former Rangers midfielder McInnes, looking forward to his first Old Firm game as boss, is hoping for positivity from the Gers supporters.",
    "cn": "前流浪者队中场麦金尼斯期待着他作为主教练的第一场老东家比赛，他希望从热刺的支持者那里得到积极的态度。",
    "src": "Sky Sports · 2026-09-10"
  },
  "function": {
    "en": "Getting Evens through the BuildABet function for under 1.5 first-half goals paired with under 3.5 total goals looks a shrewd play based on Hull's ability to make games so difficult no matter who the opponent are.",
    "cn": "通过BuildABet功能，上半场进球数在1.5个以下，总进球数在3.5个以下，这看起来是一种精明的发挥，因为赫尔城无论对手是谁，都能让比赛变得如此困难。",
    "src": "Sky Sports · 2026-09-10"
  },
  "full": {
    "en": "But the Gunners were full value for their win -- even if they needed David Raya to pull off a fine save from substitute Estevão at the death to hold on.",
    "cn": "但阿森纳的胜利实至名归——尽管他们需要替补出场的埃斯特旺最后一刻的射门被拉亚神扑化解，才能保住胜利。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "freedom": {
    "en": "Arteta put Odegaard's freedom to advance into more threatening positions down to the skills of his team-mates in open play, which the Arsenal head coach suggested had been missing previously.",
    "cn": "Arteta将Odegaard晋级到更具威胁性的位置的自由归功于他的队友在公开比赛中的技能，阿森纳主教练认为以前缺少这些技能。",
    "src": "Sky Sports · 2026-09-09"
  },
  "front": {
    "en": "\"We've got our part to play in that and I felt that if we can capitalise on good play and good opportunities, which we didn't do last night and we didn't do against Motherwell (also won 1-0) obviously, if we can get ourselves in front, give the crowd something to get behind, then I think the strength of our club can be shown.",
    "cn": "“我们已经做好了自己的工作，我觉得如果我们能利用好比赛和机会，这是我们昨晚没有做到的，我们在对阵马瑟韦尔的比赛中也没有做到（我们也以1比0获胜），如果我们能领先，给观众一些支持，那么我认为我们俱乐部的实力可以展示出来。",
    "src": "Sky Sports · 2026-09-10"
  },
  "free": {
    "en": "Children under 16 go free if accompanied by paying adults.",
    "cn": "16岁以下的儿童在付费成人陪同下免费。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "france": {
    "en": "The upshot of that conversation is that Harold sets off on a ship to France.",
    "cn": "谈话的结果是哈罗德乘船去了法国。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "forest": {
    "en": "That match is then followed by Manchester United vs Nottingham Forest at 4.30pm, then Crystal Palace vs Arsenal at 7pm.",
    "cn": "这场比赛之后是下午4:30的曼联对阵诺丁汉森林，然后是晚上7点的水晶宫对阵阿森纳。",
    "src": "Sky Sports · 2026-09-10"
  },
  "form": {
    "en": "Martin Odegaard is a player transformed at the start of this season - and Arsenal boss Mikel Arteta puts his captain's impressive form down to fitness and new positioning.",
    "cn": "马丁·厄德高（Martin Odegaard）是本赛季开始时转型的球员，主帅米克尔·阿尔特塔将队长的出色表现归功于健身和新定位。",
    "src": "Sky Sports · 2026-09-09"
  },
  "formation": {
    "en": "The 255 egg fragments at the center of the discovery were uncovered in 2020 and 2024 in the Chorrillo Formation, a rock formation on the southern tip of Argentina.",
    "cn": "发现中心的255个鸡蛋碎片于2020年和2024年在阿根廷南端的一个岩层Chorrillo地层中被发现。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "former": {
    "en": "The former Manchester United striker, 30, most recently played in Mexico for Monterrey.",
    "cn": "这位30岁的前曼联前锋最近在墨西哥的蒙特雷队踢球。",
    "src": "Sky Sports · 2026-09-10"
  },
  "fox": {
    "en": "“These are all original,” exhibition consultant John Borowski, a filmmaker and an author who specializes in serial killer histories, tells Fox 32 Chicago ’s Leslie Moreno.",
    "cn": "“这些都是原创的，”电影制片人兼作家约翰·博罗夫斯基（John Borowski）告诉福克斯32芝加哥的莱斯利·莫雷诺（Leslie Moreno）。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "fourth": {
    "en": "The goal, Odegaard's fourth in five games this season, ensured a winning start for last season's runners-up in this competition but wasteful finishing made it harder than it should have been.",
    "cn": "这个进球是厄德高本赛季五场比赛中的第四个进球，确保了上赛季亚军在这场比赛中的胜利开局，但浪费的成绩使比赛变得更加艰难。",
    "src": "Sky Sports · 2026-09-09"
  },
  "found": {
    "en": "Renoir, born in France in 1841, was one of Impressionism’s founding artists.",
    "cn": "雷诺阿1841年出生于法国，是印象派的奠基人之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "forward": {
    "en": "They rank highest with their depth in forward areas.",
    "cn": "它们在前方区域的深度排名最高。",
    "src": "Sky Sports · 2026-09-09"
  },
  "four": {
    "en": "\"Four wins out of four; I think it's six out of seven.",
    "cn": "“四场四胜；我认为是七场六胜。",
    "src": "Sky Sports · 2026-09-09"
  },
  "get": {
    "en": "But they have to get better in defence to push Arsenal all the way.",
    "cn": "但他们必须在防守端有所提升，才能真正威胁到阿森纳。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "giant": {
    "en": "I look at the sort of best back three probably that I ever saw which was the Juventus and Italy back three with Andrea Barzagli, Leonardo Bonucci and Giorgio Chiellini -- three real giants.",
    "cn": "我想到我见过的最佳三中卫组合——尤文图斯和意大利队的巴尔扎利、博努奇和基耶利尼——三个真正的高塔。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "give": {
    "en": "At the very least, when you're a Premier League team and you see a winger breaking that threshold, you should give the player a deeper look.",
    "cn": "至少，作为一支英超球队，当你看到一名边锋达到这一门槛时，应该认真考察这名球员。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "goal": {
    "en": "Bournemouth transfers, latest news, rumours and gossip: Live updates, goals and highlights",
    "cn": "伯恩茅斯转会，最新消息，谣言和八卦：实时更新，进球和亮点",
    "src": "Sky Sports · 2026-09-10"
  },
  "glory": {
    "en": "David Musgrove and Michael Lewis reveal the 10 things you simply must do when experiencing the world’s most famous embroidery in all its glory",
    "cn": "大卫·马斯格罗夫和迈克尔·刘易斯揭示了在体验世界上最著名的刺绣的荣耀时，你必须做的10件事",
    "src": "HistoryExtra · 2026-09-10"
  },
  "game": {
    "en": "When the 2026/27 Premier League fixture list came out, United were deemed to have had the statistically easiest opening six games.",
    "cn": "当2026/27赛季英超联赛名单公布时，曼联被认为是统计上最容易开启六场比赛的球队。",
    "src": "Sky Sports · 2026-09-09"
  },
  "future": {
    "en": "Mauricio Pochettino speaks to Sky Sports News' Gail Davis in an exclusive interview; ex-Tottenham and Chelsea boss reveals hope of returning to Premier League in future; last month, the Argentine signed a new four-year deal to continue as the manager of the USA men's team",
    "cn": "毛里西奥·波切蒂诺（Mauricio Pochettino）在接受天空体育新闻（Sky Sports News）的盖尔·戴维斯（Gail Davis）独家采访时表示；前托特纳姆热刺和切尔西主帅透露了未来重返英超联赛的希望；上个月，阿根廷人签署了一份新的四年合同，继续担任美国男子队的经理",
    "src": "Sky Sports · 2026-09-09"
  },
  "further": {
    "en": "Liverpool have plans to sign another midfielder next summer, which would push Argentina international Alexis Mac Allister further down the pecking order at Anfield.",
    "cn": "利物浦计划明年夏天签下另一名中场球员，这将使阿根廷国脚亚历克西斯·麦克·阿利斯特在安菲尔德的排名进一步下降。",
    "src": "Sky Sports · 2026-09-09"
  },
  "gain": {
    "en": "Halfway through, they have dropped more points than they have gained.",
    "cn": "中途，他们的得分比他们获得的要多。",
    "src": "Sky Sports · 2026-09-09"
  },
  "father": {
    "en": "When the museum sent a printout, he located his father’s village.",
    "cn": "当博物馆寄来打印件时，他找到了父亲的村庄。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "feast": {
    "en": "They are shown pillaging, feasting and fortifying their position.",
    "cn": "他们掠夺，盛宴和巩固他们的地位。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "fee": {
    "en": "But then Madueke's fee ranks 10th and Outtara's 17th.",
    "cn": "但马杜埃凯的转会费只能排在第 10，奥塔拉甚至只排第 17。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "few": {
    "en": "Having had a few weeks to reset away from the spotlight, there were enthusiastic hugs all round for the Sky Sports News team as we all swapped summer stories.",
    "cn": "在离开聚光灯几周后，天空体育新闻团队充满了热情的拥抱，因为我们都交换了夏天的故事。",
    "src": "Sky Sports · 2026-09-09"
  },
  "fetch": {
    "en": "“This year’s award winners took seemingly far-fetched ideas and turned them into legitimate research projects,” Carly Anne York, an animal behaviorist and physiologist at Lenoir-Rhyne University, tells CNN ’s Jack Guy.",
    "cn": "Lenoir-Rhyne大学的动物行为学家和生理学家卡莉·安妮·约克（Carly Anne York）告诉美国有线电视新闻网（CNN）的杰克·盖伊（Jack Guy）：“今年的获奖者把看似牵强附会的想法变成了合法的研究项目。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "fellow": {
    "en": "Greengrass follows the Ploughman and his fellow insurgents as they make their way to London for a climactic face-to-face meeting with the young monarch.",
    "cn": "Greengrass跟随Ploughman和他的叛乱分子同伴前往伦敦，与年轻的君主面对面会面。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "feel": {
    "en": "He just needs to get a back three that feels solid.",
    "cn": "他只是需要找到一套让人放心的三中卫组合。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "feedback": {
    "en": "Sayers ’ feedback on some of Christie’s work, will also be on display.",
    "cn": "塞耶斯对佳士得部分作品的反馈也将展出。",
    "src": "Smithsonian Magazine · 2026-09-10"
  },
  "fast": {
    "en": "Martin Odegaard scored his fourth goal in five games this season with the winner in Arsenal's 1-0 Champions League victory at Napoli on Wednesday; Gunners captain only scored once in 2025/26 but higher position and fitness have facilitated fast start to the new campaign",
    "cn": "马丁·厄德高（Martin Odegaard）本赛季五场比赛中的第四个进球，赢得了阿森纳周三在那不勒斯1-0冠军联赛的胜利；枪手队长在2025/26赛季只进了一球，但更高的位置和体能有助于快速开始新赛季",
    "src": "Sky Sports · 2026-09-09"
  },
  "fail": {
    "en": "Spurs may have failed to win any of their first three Premier League games this season, but summer signing Matheus Fernandes is convinced he has joined a squad set to start fighting for trophies.",
    "cn": "热刺本赛季的前三场英超比赛可能一场都没赢，但是夏天签下的费尔南德斯相信他已经加入了一支为奖杯而战的球队。",
    "src": "Sky Sports · 2026-09-10"
  },
  "fan": {
    "en": "Only Rangers fans are allowed in the 50,000-capacity Ibrox for the League Cup quarter-final against Celtic at the order of the authorities amid a ticket allocation spat between the two Glasgow giants.",
    "cn": "联赛杯1 / 4决赛对阵凯尔特人的比赛中，只有流浪者队的球迷才可以进入可容纳5万人的伊布罗克斯球场观看比赛。",
    "src": "Sky Sports · 2026-09-10"
  },
  "famous": {
    "en": "The Bayeux Tapestry tells one of the most famous stories in British history – that of the Norman Conquest of England in 1066, particularly the battle of Hastings, which took place on 14 October 1066.",
    "cn": "贝叶挂毯讲述了英国历史上最著名的故事之一——1066年诺曼人征服英格兰的故事，尤其是1066年10月14日发生的黑斯廷斯战役。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "far": {
    "en": "That is demonstrated by Odegaard's touches in the opposition box going up from 2.5 per 90 minutes last season to 4.3 per 90 minutes so far this term.",
    "cn": "Odegaard在反对派禁区中的触动从上赛季的每90分钟2.5次上升到本赛季到目前为止的每90分钟4.3次，就证明了这一点。",
    "src": "Sky Sports · 2026-09-09"
  },
  "football": {
    "en": "And in the weekend in between, Sky Sports will be showing Leeds vs Everton on Friday Night Football on New Year's Day, then Bournemouth vs Aston Villa on January 3 for Saturday Night Football at 5.30pm.",
    "cn": "在这期间的周末，天空体育将在新年当天播放利兹对埃弗顿的周五晚间足球比赛，然后在1月3日下午5:30播放伯恩茅斯对阿斯顿维拉的周六晚间足球比赛。",
    "src": "Sky Sports · 2026-09-10"
  },
  "food": {
    "en": "“If these eggshells belong to colossosaurians, the hatchlings had to have had plenty of nutritious food resources in that environment to start packing on the tonnes to eventually reach their colossal body sizes,” Zelenitsky tells CNN.",
    "cn": "Zelenitsky告诉美国有线电视新闻网（CNN）：“如果这些蛋壳属于巨龙，那么幼崽必须在那种环境中拥有大量营养丰富的食物资源，才能开始积累大量食物，最终达到巨大的体型。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "follow": {
    "en": "That match is then followed by Manchester United vs Nottingham Forest at 4.30pm, then Crystal Palace vs Arsenal at 7pm.",
    "cn": "这场比赛之后是下午4:30的曼联对阵诺丁汉森林，然后是晚上7点的水晶宫对阵阿森纳。",
    "src": "Sky Sports · 2026-09-10"
  },
  "focus": {
    "en": "He insisted Xabi Alonso should focus on reinforcements at the back.",
    "cn": "他坚称哈维·阿隆索应当把补强后防作为首要任务。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "finally": {
    "en": "An incredible second-half comeback including six goals in 41 minutes saw Chelsea finally blow away Leeds 6-3 in one of the all-time Carabao Cup classics at Stamford Bridge.",
    "cn": "令人难以置信的下半场复出，包括在41分钟内的6个进球，切尔西终于在斯坦福桥的历史卡拉宝杯经典之一中以6比3击败了利兹队。",
    "src": "Sky Sports · 2026-09-09"
  },
  "final": {
    "en": "Rangers host Celtic at Ibrox in Sunday's League Cup quarter-final in manager Derek McInnes' first Old Firm as manager; there will be no away fans after SPFL ruling; Celtic have won all six league games heading into clash while Rangers have four consecutive Premiership wins after poor start",
    "cn": "周日联赛杯四分之一决赛，流浪者队将在伊布罗克斯主场迎战凯尔特人队，这是德里克·麦金尼斯执教的第一个老东家；苏格兰足球联盟裁决后将不会有客场球迷；凯尔特人已经赢得了联赛前的六场比赛，而流浪者则在开局不佳的情况下取得了联赛的四连胜",
    "src": "Sky Sports · 2026-09-10"
  },
  "figure": {
    "en": "And Liverpool shipped 41 when winning the league 12 months earlier -- the highest figure since Manchester United were last crowned champions in 2013 after giving up 43.",
    "cn": "而利物浦在前一个赛季夺冠时丢了 41 球——那是自 2013 年曼联以 43 球夺冠以来冠军球队的最高丢球数。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "fight": {
    "en": "Tottenham searching for first goal and first win of the Premier League season but £85m Matheus Fernandes says the squad with \"a lot of quality\" is aiming to fight for trophies; watch Tottenham vs Everton live on Sky from 5pm on Saturday; kick-off 5.30pm",
    "cn": "托特纳姆热刺正在寻找英超赛季的首球和首胜，但身价8500万英镑的马修斯·费尔南德斯表示，这支“实力很强”的球队的目标是为奖杯而战；从周六下午5点开始在天空电视台观看热刺对埃弗顿的直播；开球5.30点",
    "src": "Sky Sports · 2026-09-10"
  },
  "fill": {
    "en": "As they battled for titles each year under Jurgen Klopp and Pep Guardiola, Liverpool and Manchester City's rosters were filled with wide players who created lots of goals and won lots of games.",
    "cn": "在克洛普和瓜迪奥拉的带领下，利物浦和曼城年年争冠，他们的阵容里都是能创造大量进球、能赢下比赛的边路球员。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "fine": {
    "en": "With goal difference a potentially significant factor in the league phase of this Champions League format, this was a fine night's work on their return.",
    "cn": "在欧冠赛制的联赛阶段，净胜球是一个潜在的重要因素，这对他们的回归来说是一个美好的夜晚。",
    "src": "Sky Sports · 2026-09-08"
  },
  "five": {
    "en": "O'Neill's men are now five points clear of second-placed Rangers, who they also face in their next Premiership match a week on Sunday, live on Sky Sports.",
    "cn": "奥尼尔的球员现在比排名第二的流浪者队落后5分，他们也在周日的下一场英超比赛中面对天空体育。",
    "src": "Sky Sports · 2026-09-09"
  },
  "first": {
    "en": "The Egypt international was later denied his first goal with the ball ruled out of play before Hogh sent it back in for him to score.",
    "cn": "这位埃及国脚后来被拒绝了他的第一个进球，球被排除在外，然后霍格将球送回给他进球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "fire": {
    "en": "Up against Adam Scott, who draws over two fouls per game, and Justin Kluivert who was fouled three times at Newcastle, he's going to be in the firing line for fouls.",
    "cn": "面对场均犯规超过两次的亚当·斯科特和在纽卡斯尔被犯规三次的贾斯汀·克鲁伊维特，他将在犯规的火线上。",
    "src": "Sky Sports · 2026-09-10"
  },
  "finish": {
    "en": "But showing his team-mates how to finish was only one part of his performance.",
    "cn": "但向队友展示如何完成比赛只是他表现的一部分。",
    "src": "Sky Sports · 2026-09-09"
  }
};

if (typeof WORDS !== "undefined") {
  let n = 0;
  for (const w of WORDS) {
    if (w.example) continue;                 // 已有例句不动
    const ex = WORD_EXAMPLES[w.word];
    if (!ex) continue;
    w.example = ex.en;
    w.exampleCn = ex.cn;
    if (!w.source) w.source = ex.src;
    n++;
  }
  if (typeof window !== "undefined") window.__ADDED_EXAMPLES__ = n;
}
