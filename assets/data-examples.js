/* 词阅 WordLens —— 真实例句（自动生成，请勿手改；运行 node tools/build-examples.mjs 重新生成）
 *
 * 来源：文章库里 1628 段真实报道原文 + 逐句译文。逐句翻译的副产品是第 N 个英文句子
 * 对得上第 N 个中文句子（实测 95.7% 段落完全对齐，对不齐的整段放弃），于是
 * 「英文原句 + 它在同一篇文章里的译文」就是成对的真实例句——没有一句是机器造的。
 *
 * 共 2007 条，只用来填补没有例句的词；人工撰写的例句永远优先，不会被覆盖。
 */
const WORD_EXAMPLES = {
  "pull": {
    "en": "On her lids, Westman pulled shades from two Eye Color Quads: 4 Ocean Sunrise and 8 Warm Ocean Sunset.",
    "cn": "在她的眼睑上，韦斯特曼用了两种颜色的眼影：4海洋日出和8温暖海洋日落。",
    "src": "ELLE · 2026-09-09"
  },
  "pump": {
    "en": "Ballet flats are a popular silhouette, but slingbacks and traditional pumps are also in frequent rotation.",
    "cn": "芭蕾平底鞋是流行的款式，但露跟鞋和传统的高跟鞋也经常出现。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "punch": {
    "en": "It also illustrates how Telekom Srbija is punching above its weight, according to Martinović.",
    "cn": "马蒂诺维奇表示，这也说明了塞尔维亚电信是如何超越自身能力的。",
    "src": "Variety · 2026-09-10"
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
    "en": "The other is the gulf in quality between the starting XI and the team after changes are made.",
    "cn": "另一个是变更后首发XI和球队之间的质量差距。",
    "src": "Sky Sports · 2026-09-09"
  },
  "qualify": {
    "en": "In the Premier League last season, 96 qualifying players put up better per-minute attacking numbers.",
    "cn": "上赛季英超有 96 名符合资格球员的每分钟进攻数据比他更高。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "puzzle": {
    "en": "In their absence, Xabi Alonso paired Reece James with Romeo Lavia, but even when Caicedo returns to fitness, the Chelsea manager has a puzzle to solve before settling on his best midfield two.",
    "cn": "在两人缺阵的情况下，阿隆索让里斯·詹姆斯和拉维亚搭档，但即便凯塞多伤愈复出，主帅也要面对如何确定中场双后腰的问题。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "publish": {
    "en": "Every story we publish has been thoroughly researched and vetted by our team of editors and industry experts.",
    "cn": "我们发布的每一个故事都经过我们的编辑团队和行业专家的彻底研究和审查。",
    "src": "Harper's Bazaar · 2026-09-09"
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
  "purse": {
    "en": "The pop star wore a cream embellished bodysuit with tailored black trousers and black pointed pumps, punctuated by a leopard-print Giuseppe Zanotti purse.",
    "cn": "这位流行歌手穿着奶油色装饰的紧身衣，搭配量身定制的黑色长裤和黑色尖头高跟鞋，外加一个Giuseppe Zanotti豹纹钱包。",
    "src": "Vogue · 2026-09-10"
  },
  "purpose": {
    "en": "To view this content, choose 'Accept and continue' to allow Google reCAPTCHA and its required purposes.",
    "cn": "要查看此内容，请选择“接受并继续”以允许谷歌reCAPTCHA及其所需目的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "purple": {
    "en": "When David and Victoria Beckham wed in 1999, it was the nuptials (and matching purple outfits) heard around the world.",
    "cn": "1999年大卫·贝克汉姆和维多利亚·贝克汉姆结婚时，全世界都听到了他们的婚礼（以及配套的紫色礼服）。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "purity": {
    "en": "There’s little to no research proving these molecules are safe or effective and no assurance from the FDA about their identity, purity or strength.",
    "cn": "几乎没有研究证明这些分子是安全或有效的，FDA也不能保证它们的特性、纯度或强度。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "push": {
    "en": "A strong stop from the Saints goalkeeper, turning the ball past as Celtic push for an early opener.",
    "cn": "圣徒守门员强有力的一站，在凯尔特人推动早期揭幕战时，将球转过身去。",
    "src": "Sky Sports · 2026-09-09"
  },
  "quarter": {
    "en": "There's obviously an abundance of gorgeous knits, including cashmere and quarter-zip ups.",
    "cn": "显然，这里有大量华丽的针织衫，包括羊绒和四分之一拉链。",
    "src": "Who What Wear · 2026-09-10"
  },
  "psychological": {
    "en": "The psychological thriller, which stars both Cruz and Bardem (and earned them a 16-minute standing ovation at the premiere), made its debut on Tuesday night, and the couple coordinated in elegant looks to celebrate.",
    "cn": "这部心理惊悚片由克鲁兹和巴登共同主演（在首映式上他们起立鼓掌了16分钟），于周二晚上首播，这对夫妇以优雅的造型配合庆祝。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "project": {
    "en": "The original price tag for the project was $368 million and was supposed to be finished this past August.",
    "cn": "该项目最初的价格为3.68亿美元，原定于今年8月完工。",
    "src": "CBS News · 2026-09-10"
  },
  "promise": {
    "en": "Either way, this time round, I promise not to let down the whole nation right at the very end.",
    "cn": "无论如何，这一次，我保证不会在最后一刻让整个国家失望。",
    "src": "Variety · 2026-09-10"
  },
  "promising": {
    "en": "Today, they’re sold via polished websites with a medical gloss, with each peptide promising to deliver a remarkable benefit, such as weight loss, younger-looking skin or muscle repair.",
    "cn": "如今，它们通过带有医学光泽的抛光网站出售，每种肽都有望带来显着的好处，例如减肥、年轻的皮肤或肌肉修复。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "promote": {
    "en": "Maybe it’s the water taxis, the grand palazzos, or the fact that the festival has long attracted stars with a taste for fashion as considered as the films they’re there to promote.",
    "cn": "也许是因为水上出租车，也许是因为宏伟的宫殿，也许是因为这个电影节长期以来一直吸引着那些对时尚有品味的明星，就像他们在那里宣传的电影一样。",
    "src": "ELLE · 2026-09-09"
  },
  "prompt": {
    "en": "In this way, it functioned as a visual prompt and a mnemonic device, inviting its audience to engage with the drama of 1066 in a uniquely immersive way.",
    "cn": "通过这种方式，它起到了视觉提示和记忆装置的作用，邀请观众以一种独特的沉浸式方式参与到1066年的戏剧中。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "proof": {
    "en": "\"Producing the film was an enormous undertaking, but also proof that genre cinema of this scale can come from this part of Europe,\" he said.",
    "cn": "他说：“制作这部电影是一项艰巨的任务，但也证明了这种规模的流派电影可以来自欧洲的这一部分。",
    "src": "Variety · 2026-09-10"
  },
  "property": {
    "en": "The company aims to identify, finance and produce high-value intellectual property that crosses borders and formats.",
    "cn": "该公司旨在识别、资助和生产跨国界和格式的高价值知识产权。",
    "src": "Variety · 2026-09-10"
  },
  "propose": {
    "en": "He has floated the idea of cutting checks to U.S. citizens in the past, proposing $2,000 dividends funded by tariffs last year.",
    "cn": "他过去曾提出过削减美国公民支票的想法，去年提出了由关税资助的2,000 $股息。",
    "src": "CBS News · 2026-09-10"
  },
  "province": {
    "en": "A volunteer firefighter died on Wednesday in Turkey after helping local emergency services tackle a large wildfire in the Mediterranean coastal province of Antalya, an official said.",
    "cn": "土耳其一位官员说，一名志愿消防员周三在帮助当地紧急服务部门扑灭地中海沿岸省份安塔利亚的一场大火后死亡。",
    "src": "ABC News · 2026-09-09"
  },
  "provided": {
    "en": "This page contains HistoryExtra content provided by Google reCAPTCHA.",
    "cn": "此页面包含谷歌reCAPTCHA提供的额外内容。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "provide": {
    "en": "The formula plumps up your tresses for voluminous locks that last and provides fuller strands from the inside out.",
    "cn": "该配方为您的长裤增添了丰富的锁，可以持续使用，并从内到外提供更饱满的锁链。",
    "src": "ELLE · 2026-09-10"
  },
  "prove": {
    "en": "The Bayeux Tapestry exhibition is already proving to be one of the most popular in the museum’s history.",
    "cn": "贝叶挂毯展览已经被证明是博物馆历史上最受欢迎的展览之一。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "proud": {
    "en": "\"We're incredibly proud of what the team created and excited for the film to now begin its journey to audiences around the world.\"",
    "cn": "“我们为团队的创作感到无比自豪，并为这部电影现在开始面向全球观众的旅程感到兴奋。",
    "src": "Variety · 2026-09-10"
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
  "protection": {
    "en": "The Khorks said Cody, as a force protection officer, had delivered repeated warnings to the unit's leader, Brig.",
    "cn": "霍克夫妇说，科迪作为一名部队保护官员，曾多次向该部队的领导人布里格？",
    "src": "CBS News · 2026-09-10"
  },
  "protect": {
    "en": "During World War II, h ospital ships were protected under international humanitarian law.",
    "cn": "在第二次世界大战期间，战舰受到国际人道主义法的保护。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "protein": {
    "en": "“They carry proteins, growth factors, lipids, and genetic material, such as messenger RNA and microRNA.",
    "cn": "“它们携带蛋白质、生长因子、脂质和遗传物质，如信使RNA和微RNA。",
    "src": "ELLE · 2026-09-09"
  },
  "rainy": {
    "en": "Michelle Rhee’s spring collection comes at a particularly great time, after a rainy summer in New York.",
    "cn": "米歇尔·李（Michelle Rhee）的春季系列在纽约一个多雨的夏天之后，恰逢其时。",
    "src": "Vogue · 2026-09-10"
  },
  "raise": {
    "en": "Instead, he wanted to focus on “someone history never named at all: a farmer, the first man to raise his hand in Essex.",
    "cn": "相反，他想专注于“一个从未命名过的历史人物：一个农民，第一个在埃塞克斯举手的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rake": {
    "en": "After letting each curl cool completely, he raked through the hair with fingers (not a brush) to open the curl into a soft, sexy blowout shape without losing definition.",
    "cn": "让每一卷头发完全冷却后，他用手指（不是梳子）拨弄头发，使卷发柔软、性感，又不失轮廓。",
    "src": "ELLE · 2026-09-09"
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
  "rapid": {
    "en": "We are living in a time of rapid transformation and increasing speculation — about the present, the future, what we thought was true and what we hold dear.",
    "cn": "我们生活在一个快速变革和越来越多的猜测的时代——关于现在，关于未来，关于我们认为是真的，关于我们珍视的东西。",
    "src": "Variety · 2026-09-10"
  },
  "rare": {
    "en": "Fabricating an object purely for play is exceptionally rare across the animal kingdom.",
    "cn": "在动物王国里，纯粹为了玩耍而制造物品是非常罕见的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "rat": {
    "en": "Mr. Trump's own lagging approval rating could also be a drag on the party, with Democrats seeking to capitalize on the Iran war's unpopularity and voters' unhappiness with the Trump administration's handling of the economy.",
    "cn": "特朗普自己落后的支持率也可能拖累该党，民主党人试图利用伊朗战争的不受欢迎以及选民对特朗普政府处理经济的不满。",
    "src": "CBS News · 2026-09-10"
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
  "ray": {
    "en": "The vessel is well preserved, with ceramic tiles still lining its bathrooms, fans still hanging from its ceilings and teak tables still “intact, clean and perfectly aligned with each other” on the bridge deck, Cesare Balzi wrote for X-Ray Mag in 2018.",
    "cn": "切萨雷·巴尔齐（Cesare Balzi）在2018年的《X-Ray Mag》杂志上写道，这艘船保存完好，浴室里仍然铺着瓷砖，风扇仍然悬挂在天花板上，柚木桌子仍然“完好无损，干净整洁，彼此完美对齐”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "realm": {
    "en": "Touted for their potential to help rejuvenate and heal the skin, including after surgery, it was only a matter of time before they crossed over into the realm of hair care, too.",
    "cn": "它们被吹捧有潜力帮助皮肤恢复活力和愈合，包括在手术后，它们也会进入护发领域，这只是时间问题。",
    "src": "ELLE · 2026-09-09"
  },
  "really": {
    "en": "These types of wingers had never really existed before, but now they were more important than anyone else.",
    "cn": "这种类型的边锋以前几乎不存在，但现在他们成了场上最重要的角色。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "reality": {
    "en": "Stories are humanity's way of capturing reality, creating truth and generating meaning.",
    "cn": "故事是人类捕捉现实、创造真理和产生意义的一种方式。",
    "src": "Variety · 2026-09-10"
  },
  "real": {
    "en": "Some movie moments age like fine wine, as do the characters and real-life actors in them.",
    "cn": "一些电影时刻像美酒一样陈年，其中的角色和现实生活中的演员也是如此。",
    "src": "ELLE · 2026-09-09"
  },
  "ready": {
    "en": "It came from a shared belief that AFC is ready for its next chapter, one focused on scale and long-term impact.",
    "cn": "这源于一个共同的信念，即亚足联已经为下一个篇章做好了准备，一个专注于规模和长期影响的篇章。",
    "src": "Vogue · 2026-09-10"
  },
  "rain": {
    "en": "And for when that rain finally passes and the sun begins to shine, there will be plenty of gingham skirts and nylon dresses.",
    "cn": "因为当雨终于过去，太阳开始照耀时，将会有很多格子裙和尼龙裙。",
    "src": "Vogue · 2026-09-10"
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
    "en": "Plus, I asked Cavalcante for his expert suggestions and read through hundreds of customer reviews.",
    "cn": "此外，我向Cavalcante征求了他的专家建议，并阅读了数百条客户评价。",
    "src": "ELLE · 2026-09-10"
  },
  "reach": {
    "en": "\"When you're conducting a joint operation in territorial waters, you have to reach an understanding as to how those operations are going to occur,\" he said.",
    "cn": "“当你在领海进行联合行动时，你必须就这些行动将如何进行达成谅解，”他说。",
    "src": "CBS News · 2026-09-10"
  },
  "queen": {
    "en": "Together, they uncover how these formative experiences helped shape the woman who would become a formidable queen.",
    "cn": "他们一起揭示了这些形成性的经历如何帮助塑造了这位将成为令人敬畏的女王的女人。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "question": {
    "en": "The look in question came to us when the actor was spotted filming for The Morning Show in Times Square.",
    "cn": "当这位演员在时代广场拍摄《晨间秀》时，我们发现了他的造型。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "quick": {
    "en": "Luckily, all our favorite retailers from Zara to Reformation have been quick to offer their takes on the trend.",
    "cn": "幸运的是，从Zara到Reformation，所有我们喜欢的零售商都迅速对这一趋势发表了自己的看法。",
    "src": "Who What Wear · 2026-09-10"
  },
  "quickly": {
    "en": "\"At its heart is a boy being forced to grow up too quickly in a world that has abandoned him.",
    "cn": "“故事的核心是一个男孩被迫在一个抛弃他的世界中过快成长。",
    "src": "Variety · 2026-09-10"
  },
  "quit": {
    "en": "She may have quit, in part, because she had previously consumed an ounce of a margarita, which seemed to lower her dexterity, the authors write in the paper.",
    "cn": "作者在论文中写道，她戒烟的部分原因可能是她之前喝过一盎司的玛格丽塔酒，这似乎降低了她的灵活性。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "quite": {
    "en": "“I lived my life in one sort of way for quite a long time, and then things really flipped.",
    "cn": "“在很长一段时间里，我一直以一种方式生活，然后事情真的发生了变化。",
    "src": "Vogue · 2026-09-10"
  },
  "quiz": {
    "en": "Update to the latest version to see all Vogue content, as well as new features like our Runway Genius quiz, Group Chats, and posts from Vogue contributors.",
    "cn": "更新到最新版本可以看到《Vogue》的所有内容，以及我们的Runway Genius测试、群聊和《Vogue》撰稿人的帖子等新功能。",
    "src": "Vogue · 2026-09-10"
  },
  "race": {
    "en": "But other Republicans running in competitive races are opting to save the money and campaign in their home districts or states.",
    "cn": "但是参加竞争激烈的竞选的其他共和党人选择节省资金，在他们的家乡选区或州竞选。",
    "src": "CBS News · 2026-09-09"
  },
  "raid": {
    "en": "The Tower of London has protected England’s capital since it was first built in the 1070s, withstanding medieval sieges and World War II bombing raids alike.",
    "cn": "伦敦塔自1070年代首次建成以来一直保护着英格兰的首都，经受住了中世纪的围攻和第二次世界大战的轰炸。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "railroad": {
    "en": "At the back of our railroad apartment, the radio blared; at the front, in the living room, CNN ran the same footage over and over.",
    "cn": "在我们铁路公寓的后面，收音机响了起来；在前面，在客厅里，CNN一遍又一遍地播放着同样的镜头。",
    "src": "Vogue · 2026-09-10"
  },
  "radio": {
    "en": "At the back of our railroad apartment, the radio blared; at the front, in the living room, CNN ran the same footage over and over.",
    "cn": "在我们铁路公寓的后面，收音机响了起来；在前面，在客厅里，CNN一遍又一遍地播放着同样的镜头。",
    "src": "Vogue · 2026-09-10"
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
  "program": {
    "en": "But any economic stimulus program runs the risk of causing inflation to spike, and many economists believe the pandemic-era stimulus was at least partially responsible for the rise in consumer prices that ensued over the following years.",
    "cn": "但任何经济刺激计划都有导致通货膨胀飙升的风险，许多经济学家认为，疫情时期的刺激措施至少部分导致了随后几年消费价格的上涨。",
    "src": "CBS News · 2026-09-10"
  },
  "porter": {
    "en": "He creates data-driven shopping guides featuring top retailers like Nordstrom, Shopbop, and Net-a-Porter and is at the forefront of Who What Wear's shopping tentpole strategies, including Amazon Prime Day.",
    "cn": "他创建了以数据为导向的购物指南，推荐诺德斯特龙、Shopbop和Net-a-Porter等顶级零售商，并在“谁穿什么”（Who What Wear）购物战略的最前沿，包括亚马逊Prime Day。",
    "src": "Who What Wear · 2026-09-10"
  },
  "portion": {
    "en": "Out of respect for the primary next of kin, who are currently being scheduled for briefs on the official findings of the completed investigation, we will not comment on specific details, individual accounts, or leaked portions of the report at this time,\" the statement said.",
    "cn": "“出于对主要亲属的尊重，他们目前正被安排听取有关完成调查的官方结果的简报，我们目前不会对具体细节、个人账户或报告中泄露的部分发表评论，”声明说。",
    "src": "CBS News · 2026-09-10"
  },
  "portrait": {
    "en": "The four stolen works were Portrait of Madame Stephen Pichon (1895), Coco Reading (1905), Madame Colonna Romano (1910) and Young Woman at the Well (1886).",
    "cn": "被盗的四幅作品分别是《斯蒂芬·皮雄夫人的肖像》（1895年）、《可可·雷丁》（1905年）、《科隆娜·罗马诺夫人》（1910年）和《井边的年轻女子》（1886年）。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "position": {
    "en": "On March 1, one day into the Iran war, an Iranian Shahed drone struck Khork's position, killing him and five other American troops.",
    "cn": "3月1日，伊朗战争开始的第一天，一架伊朗Shahed无人机袭击了霍克的阵地，杀死了他和其他五名美国士兵。",
    "src": "CBS News · 2026-09-10"
  },
  "positive": {
    "en": "I'm as positive as I have been for three, four, five years about Chelsea, because I think they're going in the right direction.",
    "cn": "我对切尔西的态度比过去三、四、五年都要积极，因为我认为他们正在走在正确的方向上。",
    "src": "ESPN · Mark White · 2026-09-07"
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
  "possible": {
    "en": "Soft, hazy, deliciously milky, the look takes the classic French and somehow makes it even more wearable, which I didn’t think was possible.",
    "cn": "柔和、朦胧、美味的乳白色，这款妆容融合了经典的法式风格，让它更耐穿，这在我看来是不可能的。",
    "src": "Cosmopolitan · 2026-09-09"
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
    "en": "Kidman’s most obvious transformation between Practical Magic 1 and 2 is the switch from red to blonde hair.",
    "cn": "基德曼在《实用魔法》第1集和第2集中最明显的变化就是从红头发变成了金发。",
    "src": "ELLE · 2026-09-09"
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
  "powder": {
    "en": "The nails are shaped, the cuticles tidied, and the surface gently buffed before a mineral-rich paste and powder are worked into the nail.",
    "cn": "指甲被塑形，角质层被整理，表面被轻轻打磨，然后一种富含矿物质的膏体和粉末被加工到指甲上。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "port": {
    "en": "Multiple sources told CBS News that Army intelligence warned as early as January that Iran would attack the Port of Shuaiba in a potential war.",
    "cn": "多个消息来源告诉哥伦比亚广播公司新闻，陆军情报部门早在1月份就警告说，伊朗将在一场潜在的战争中袭击帅巴港。",
    "src": "CBS News · 2026-09-10"
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
  "plunge": {
    "en": "Lipa kept things classic in a plunging black Ferragamo dress, finished with another suite of Bulgari Serpenti jewelry.",
    "cn": "丽帕身着菲拉格慕深紫色的黑色连衣裙，保持了经典的风格，最后还佩戴了一套宝格丽蛇形珠宝。",
    "src": "Vogue · 2026-09-10"
  },
  "plus": {
    "en": "For non-penalty xG plus xA, a rate of 0.5 per 90 minutes is a decent rule of thumb for above-average production.",
    "cn": "对于非点球的预期进球加助攻，每 90 分钟 0.5 是一个不错的「高于平均水准」的参考线。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "point": {
    "en": "Arsenal join Manchester City as the only two sides to take maximum points from their first three league games.",
    "cn": "阿森纳与曼城成为前 3 轮 联赛仅有的两支全取 9 分的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "poison": {
    "en": "Lesser-known featured Chicago killers include Richard Speck; the satanic Ripper Crew cult; and Tillie Klimek, known as Chicago’s “Black Widow,” who claimed to have had precognitive dreams of the deaths of her husbands, whom, in reality, she poisoned.",
    "cn": "鲜为人知的芝加哥杀手包括理查德·斯佩克（Richard Speck）、撒旦式的开膛手船员邪教（Ripper Crew cult）和被称为芝加哥“黑寡妇”的蒂莉·克莱梅克（Tillie Klimek），她声称自己曾梦到丈夫的死亡，而实际上，她的丈夫是被毒死的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "police": {
    "en": "Authorities attribute the robbers’ bungle to the museum’s security system and the quick response of local police.",
    "cn": "当局将劫匪的失误归咎于博物馆的安全系统和当地警方的快速反应。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "policy": {
    "en": "The U.S. has brought in just under $500 billion in tariff and excise tax revenue since the start of last year, according to the Bipartisan Policy Center.",
    "cn": "根据两党政策中心的数据，自去年年初以来，美国的关税和消费税收入略低于5000亿美元。",
    "src": "CBS News · 2026-09-10"
  },
  "polish": {
    "en": "A simple, glazed manicure will maintain your nails’ health while giving a chic polish to any look.",
    "cn": "简单的上釉美甲既能保持指甲健康，又能给任何造型带来别致的光泽。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "population": {
    "en": "The population is gradually growing, but the species is still considered vulnerable by the International Union for Conservation of Nature and endangered under the Endangered Species Act.",
    "cn": "人口正在逐渐增长，但该物种仍被国际自然保护联盟视为脆弱物种，并根据《濒危物种法》濒临灭绝。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "popular": {
    "en": "Ballet flats are a popular silhouette, but slingbacks and traditional pumps are also in frequent rotation.",
    "cn": "芭蕾平底鞋是流行的款式，但露跟鞋和传统的高跟鞋也经常出现。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "pop": {
    "en": "From spicy copper to pop star pink to maple cream blonde, fall’s biggest hair colors are right around the corner.",
    "cn": "从辣铜色到流行粉色再到枫奶油金色，秋天最流行的发色即将到来。",
    "src": "Cosmopolitan · 2026-09-09"
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
    "en": "Clark's decision was appealed late Tuesday by People not Politicians, a Missouri group against the redistricting effort.",
    "cn": "周二晚些时候，密苏里州的一个团体People not Politicians对克拉克的决定提出上诉，反对重新划分选区的努力。",
    "src": "CBS News · 2026-09-10"
  },
  "political": {
    "en": "\"We are completely aware of the social and political situation, but it doesn't affect our general strategy,\" she says.",
    "cn": "“我们完全了解社会和政治形势，但这并不影响我们的总体战略，”她说。",
    "src": "Variety · 2026-09-10"
  },
  "primary": {
    "en": "McKee is the first sitting governor anywhere in the country to lose a primary in eight years.",
    "cn": "麦基是八年来首位在初选中失利的在任州长。",
    "src": "CBS News · 2026-09-10"
  },
  "prime": {
    "en": "Previous to working in fashion, Judith worked as a TV host on the PBS travel show Globe Trekker (airing on Netflix and Amazon Prime) sharing her passion for travel and culture.",
    "cn": "在从事时尚工作之前，朱迪思曾在美国公共广播公司（PBS）的旅游节目《环球旅行者》（Globe Trekker）中担任电视主持人（在Netflix和亚马逊Prime上播出），分享她对旅游和文化的热情。",
    "src": "Who What Wear · 2026-09-10"
  },
  "prince": {
    "en": "The creative team includes production designer Ben Stones, with Mark Henderson on lighting, Alexandra Faye Braithwaite on sound, Kate Prince as choreographer, Martin Lowe writing the music and Stuart Burt CDG CSA as casting director.",
    "cn": "创意团队包括制作设计师本·斯通，马克·亨德森担任灯光，亚历山德拉·费·布雷斯韦特担任音效，凯特·普林斯担任舞蹈指导，马丁·洛担任音乐编剧，斯图尔特·伯特担任选角导演。",
    "src": "Variety · 2026-09-10"
  },
  "princess": {
    "en": "Ask any fan of clean girl beauty—there are subtle differences to each and every trending neutral manicure, from soap nails to princess nails, glass manicure, and beyond.",
    "cn": "问任何一个喜欢干净女孩美的人——每一种流行的中性美甲都有细微的区别，从肥皂指甲到公主指甲，玻璃指甲等等。",
    "src": "Vogue · 2026-09-10"
  },
  "print": {
    "en": "The pop star wore a cream embellished bodysuit with tailored black trousers and black pointed pumps, punctuated by a leopard-print Giuseppe Zanotti purse.",
    "cn": "这位流行歌手穿着奶油色装饰的紧身衣，搭配量身定制的黑色长裤和黑色尖头高跟鞋，外加一个Giuseppe Zanotti豹纹钱包。",
    "src": "Vogue · 2026-09-10"
  },
  "prison": {
    "en": "Criminal gang violence continues unabated in Ecuador following the recapture in June 2025 of the country's biggest drug lord, Adolfo Mac&iacute;as after his escape from a maximum-security prison in 2024.",
    "cn": "厄瓜多尔最大的毒枭Adolfo maciacute于2024年从最高安全级别的监狱越狱后，于2025年6月被重新抓获，此后该国的犯罪团伙暴力活动有增无减。",
    "src": "CBS News · 2026-09-10"
  },
  "private": {
    "en": "Billed as the world’s largest private collection of serial killer artifacts, the exhibition toured Europe before arriving stateside, where it made its first stop in Atlanta.",
    "cn": "该展览被誉为世界上最大的连环杀手文物私人收藏，在抵达美国之前在欧洲巡回展出，并在亚特兰大首次停留。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "privilege": {
    "en": "To take on Claudia’s role, as it were, is not just a privilege but a real challenge as an actor – I simply don’t have enough hair.",
    "cn": "能出演克劳迪娅这个角色，可以说，不仅是一种特权，而且对演员来说是一个真正的挑战——我就是没有足够的头发。",
    "src": "Variety · 2026-09-10"
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
  "profit": {
    "en": "She also sits on the board for the King’s Trust, a vocational scheme for disadvantaged young people, and the Old Vic, a non-profit theater in London.",
    "cn": "她还是国王信托基金（一个针对弱势年轻人的职业计划）和老维克剧院（一个位于伦敦的非营利性剧院）的董事会成员。",
    "src": "Vogue · 2026-09-10"
  },
  "professional": {
    "en": "Become a Vogue Business Member —the ultimate resource for fashion and beauty industry professionals.",
    "cn": "成为时尚商务会员-时尚和美容行业专业人士的终极资源。",
    "src": "Vogue · 2026-09-10"
  },
  "production": {
    "en": "Julien Loeffler and James Kermack will produce through their production company Featuristic Films.",
    "cn": "Julien Loeffler和James Kermack将通过他们的制作公司Featuristic Films进行制作。",
    "src": "Variety · 2026-09-10"
  },
  "primarily": {
    "en": "The Mavericks are owned primarily by the family of Miriam Adelson, a GOP megadonor who controls the Las Vegas Sands casino company and is close with Mr. Trump.",
    "cn": "小牛队主要由Miriam Adelson家族拥有，Miriam Adelson是共和党巨头，控制着拉斯维加斯金沙赌场公司，与特朗普先生关系密切。",
    "src": "CBS News · 2026-09-10"
  },
  "product": {
    "en": "Ouai conditioner is a lightweight, lightly scented product that adds softness, bounce, and volume as described.",
    "cn": "OUAI护发素是一款轻盈、香味轻盈的产品，可增加柔软度、弹性和体积感。",
    "src": "ELLE · 2026-09-10"
  },
  "process": {
    "en": "And an intricate spray-paint process imbued silk brocade with an impressionistic mystique.\"",
    "cn": "复杂的喷漆工艺使丝绸锦缎充满了印象派的神秘感。",
    "src": "Who What Wear · 2026-09-10"
  },
  "procedure": {
    "en": "The pioneer raccoon’s sister was the first to learn the procedure and make her own balls.",
    "cn": "这只浣熊的妹妹是第一个学习这个过程并自己做球的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "problem": {
    "en": "Name your problem, and you can probably find a peptide—with a cryptic moniker like BPC-157 or GHK-Cu—that promises to help.",
    "cn": "说出您的问题，您可能会发现一种多肽-具有BPC-157或GHK-Cu等神秘绰号-有望提供帮助。",
    "src": "Smithsonian Magazine · 2026-09-09"
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
    "en": "The original price tag for the project was $368 million and was supposed to be finished this past August.",
    "cn": "该项目最初的价格为3.68亿美元，原定于今年8月完工。",
    "src": "CBS News · 2026-09-10"
  },
  "preparation": {
    "en": "In February, the couple — along with most other service members stationed at the base — were moved off post in preparation for Operation Epic Fury.",
    "cn": "今年2月，这对夫妇和驻扎在基地的大多数其他军人一起离开了岗位，为“史诗之怒”行动做准备。",
    "src": "CBS News · 2026-09-10"
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
  "precise": {
    "en": "It was most likely made in England by English embroiderers, and while we do not have a precise date for when the Bayeux Tapestry was created, the academic consensus is that it must have been produced very soon after the events it depicts.",
    "cn": "它很可能是由英国的刺绣工在英格兰制作的，虽然我们没有确切的日期来确定贝叶挂毯是什么时候制作的，但学术界的共识是，它一定是在它描绘的事件发生后不久制作的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "precious": {
    "en": "The latest lineup plays with color and material through deep green, iridescent Australian opal, signature blue, salmon, and precious metals including white gold, rose gold, and platinum.",
    "cn": "最新的系列在颜色和材质上发挥了作用，包括深绿色、彩虹色澳大利亚蛋白石、标志性蓝色、鲑鱼色以及白金、玫瑰金和铂金等贵金属。",
    "src": "ELLE · 2026-09-09"
  },
  "previously": {
    "en": "But it previously did seem like teams had begun to realise that dribbling skill isn't worth much on its own.",
    "cn": "但以前，球队确实开始意识到，单靠过人技巧本身价值有限。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "previous": {
    "en": "We’d just returned from New York the previous day: We’d been there for our friends’ Sunday wedding, the reception at an elegant club in midtown.",
    "cn": "前一天我们刚从纽约回来：我们去那里参加朋友的周日婚礼，在市中心一家优雅的俱乐部举行的招待会。",
    "src": "Vogue · 2026-09-10"
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
  "pretend": {
    "en": "\"I'm asking you to pretend that I'm on the ballot …",
    "cn": "“我要你假装我在选票上…",
    "src": "CBS News · 2026-09-10"
  },
  "pressure": {
    "en": "Pressure is on Michael Carrick and suddenly, this week already feels season-defining.",
    "cn": "迈克尔·卡里克（Michael Carrick）承受着压力，突然之间，本周已经感觉到了赛季的定义。",
    "src": "Sky Sports · 2026-09-09"
  },
  "president": {
    "en": "Speaking after talks with President Daniel Noboa in Quito, Rubio said the operations would continue.",
    "cn": "卢比奥在基多与总统丹尼尔·诺波亚会谈后表示，行动将继续进行。",
    "src": "CBS News · 2026-09-10"
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
    "en": "It would be a wearable workout—the fashion equivalent of doing a weighted shoulder press.",
    "cn": "这将是一种可穿戴的锻炼——相当于做负重肩推的时尚运动。",
    "src": "Vogue · 2026-09-10"
  },
  "reason": {
    "en": "“Ultimately, the reason this album is called The Greatest Album of All Time is because it’s about this decision to be kind of absurdly confident.”",
    "cn": "“最终，这张专辑被称为有史以来最伟大的专辑的原因是因为它是关于一种荒谬的自信的决定。",
    "src": "Vogue · 2026-09-10"
  },
  "river": {
    "en": "Kendry Páez is not currently part of Chelsea 's first-team plans following the early termination of his loan spell at River Plate last month.",
    "cn": "Kendry Páez上个月在River Plate的租借期提前结束后，目前不属于切尔西的一线队计划。",
    "src": "Sky Sports · 2026-09-09"
  },
  "roar": {
    "en": "On the fall/winter 2026 runways we saw a movement towards an overtly opulent aesthetic where designers from Dior to Conner Ives, embraced richly detailed textures, brocade, embroidery, rich color, tapestry, fringe, velvet, silk, and sumptuous evening bags—looks reminiscent of the glamorous roaring twenties—and pieces that feel like modern heirlooms.",
    "cn": "在2026年秋冬秀场上，我们看到了一种明显的华丽美学的运动，从迪奥到康纳艾夫斯的设计师们，拥抱了丰富细节的纹理、锦缎、刺绣、丰富的色彩、挂毯、流苏、天鹅绒、丝绸和奢华的晚装包——看起来让人想起迷人的二十年代——以及感觉像现代传家宝的作品。",
    "src": "Who What Wear · 2026-09-10"
  },
  "robber": {
    "en": "Authorities attribute the robbers’ bungle to the museum’s security system and the quick response of local police.",
    "cn": "当局将劫匪的失误归咎于博物馆的安全系统和当地警方的快速反应。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "robe": {
    "en": "The silhouettes were familiar—fluid dresses, velvet robes, and shimmering separates—but new techniques gave them a looseness and texture that felt of the moment.",
    "cn": "轮廓是熟悉的-流畅的连衣裙，天鹅绒长袍和闪闪发光的分离物-但新技术给了他们一种松散和质地的感觉。",
    "src": "ELLE · 2026-09-09"
  },
  "rock": {
    "en": "The 255 egg fragments at the center of the discovery were uncovered in 2020 and 2024 in the Chorrillo Formation, a rock formation on the southern tip of Argentina.",
    "cn": "发现中心的255个鸡蛋碎片于2020年和2024年在阿根廷南端的一个岩层Chorrillo地层中被发现。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "rod": {
    "en": "McKee's first full term has been plagued by the closure of the Washington Bridge, which was shut down in December 2023 after broken anchor rods were discovered.",
    "cn": "麦基的第一个完整任期一直受到华盛顿大桥关闭的困扰，该大桥于2023年12月因发现锚杆断裂而关闭。",
    "src": "CBS News · 2026-09-10"
  },
  "role": {
    "en": "“I am honored to take on the role of chair of the British Fashion Council,” Cooper said in a statement.",
    "cn": "库珀在一份声明中说：“我很荣幸能担任英国时尚协会主席。",
    "src": "Vogue · 2026-09-10"
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
    "en": "With roughly half of all votes counted at around 8:30 p.m. ET, Foulkes led McKee 62.3% to 37.7%.",
    "cn": "美国东部时间晚上8点30分左右，大约一半的选票已经清点完毕，福克斯以62.3%对37.7%领先麦基。",
    "src": "CBS News · 2026-09-10"
  },
  "rotation": {
    "en": "\"We still have our deep hues in rotation, but the fresh, glitzy formulas help keep the look both modern and timeless,\" she shares.",
    "cn": "她分享说：“我们仍然在轮换使用深色调，但新鲜、耀眼的配方有助于保持时尚和永恒的外观。",
    "src": "Who What Wear · 2026-09-10"
  },
  "rotate": {
    "en": "Given the nature of the two opponents, you would imagine Carrick will be thinking of rotating on Thursday.",
    "cn": "鉴于两名对手的性质，你可以想象卡里克将在周四考虑轮换。",
    "src": "Sky Sports · 2026-09-09"
  },
  "rival": {
    "en": "“We’re seeing a new rival or parallel health system emerge,” says Daniel Carpenter, chair of the government department at Harvard University and an expert in FDA regulation, “built on self-diagnosis and easy access to a wide range of treatments.”",
    "cn": "哈佛大学政府部门主席、FDA监管专家丹尼尔·卡彭特（Daniel Carpenter）说：“我们正在看到一个新的竞争对手或平行的卫生系统出现，它建立在自我诊断和容易获得各种治疗的基础上。",
    "src": "Smithsonian Magazine · 2026-09-09"
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
    "en": "It’s a warmer take on the classic root smudge (which allows your hair to grow out more evenly with less maintenance).",
    "cn": "它比传统的发根涂抹更温暖（发根涂抹可以让你的头发长得更均匀，更少保养）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "room": {
    "en": "If I walk into a room, and I don’t give a shit what anyone thinks about me, I’m gonna have a good time.",
    "cn": "如果我走进一个房间，我不在乎别人怎么看我，我就会玩得很开心。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "roof": {
    "en": "“Nowhere in the world are you going to see an exhibit like this with artifacts from so many serial killers under one roof.”",
    "cn": "“世界上没有任何地方会在一个屋檐下看到这样的展览，里面有这么多连环杀手的文物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "romantic": {
    "en": "The most dramatic example of the latter was a long dress in the primary colors Ellsworth Kelly loved (red, green, blue) with romantic white sleeves and a draped, almost bustled low back.",
    "cn": "后者最引人注目的例子是一件长裙，用的是埃尔斯沃斯·凯利（Ellsworth Kelly）喜欢的三原色（红、绿、蓝），搭配浪漫的白色袖子和褶皱的低背。",
    "src": "Vogue · 2026-09-10"
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
  "return": {
    "en": "We’ve returned to Jennifer Lopez’s 2023 wedding manicure—called the milky manicure —with a new twist.",
    "cn": "我们回到了詹妮弗·洛佩兹2023年的婚礼美甲——被称为乳白色美甲——以新的方式。",
    "src": "Vogue · 2026-09-10"
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
  "reverse": {
    "en": "The international soccer organization reversed the red card suspension, though Mr. Trump said he didn't order FIFA to do so.",
    "cn": "国际足球组织撤销了红牌停赛，尽管特朗普表示他没有命令国际足联这样做。",
    "src": "CBS News · 2026-09-10"
  },
  "review": {
    "en": "Plus, I asked Cavalcante for his expert suggestions and read through hundreds of customer reviews.",
    "cn": "此外，我向Cavalcante征求了他的专家建议，并阅读了数百条客户评价。",
    "src": "ELLE · 2026-09-10"
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
  "ribbon": {
    "en": "Livia wore a white dress with blue ribbons that my mother had saved from my infancy.",
    "cn": "利维娅穿着一件带蓝丝带的白裙子，那是我母亲从我小时候给我留的。",
    "src": "Vogue · 2026-09-10"
  },
  "ring": {
    "en": "Adjustable necklaces adapt to different necklines, while pared-back cuffs, stacking rings, and necklaces are made for easy layering.",
    "cn": "可调节的项链适应不同的领口，而缩减袖口，堆叠戒指，项链是为了方便分层。",
    "src": "ELLE · 2026-09-09"
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
  "ride": {
    "en": "From coordinating red-carpet looks to indulging in sunset gondola rides, the entertainment industry’s favorite pairs have been making the most of their time in Italy—and it’s easy to see why.",
    "cn": "从协调的红毯造型到沉迷于日落缆车，娱乐圈最受欢迎的一对情侣在意大利度过了最愉快的时光，原因很容易理解。",
    "src": "Harper's Bazaar · 2026-09-09"
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
  "route": {
    "en": "For those with an aversion to jet-black manicures ( they're polarizing, I get it), I suggest going the deep, midnight navy route.",
    "cn": "对于那些厌恶黑色指甲的人（我明白他们的看法两极分化），我建议他们选择深蓝色的午夜路线。",
    "src": "Who What Wear · 2026-09-10"
  },
  "routine": {
    "en": "Ahead, Beckham tells us about the original Italian getaway that inspired the new scent, the wellness routine she and David do daily together, and the city that may inspire her next hit scent.",
    "cn": "接下来，贝克汉姆向我们讲述了激发新香水灵感的意大利之旅，她和大卫每天一起做的健康运动，以及可能激发她下一款热门香水灵感的城市。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "row": {
    "en": "In time, a tightly fitted row of single-peaked teeth came into view, Dąbrowski tells Roman Skiba of the Polish Press Agency (PAP).",
    "cn": "Dąbrowski告诉波兰新闻社（PAP）的Roman Skiba ，随着时间的推移，一排紧密贴合的单峰牙齿出现在视野中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "same": {
    "en": "Merchant said nothing exists in isolation, and that he believes the future of storytelling works the same way.",
    "cn": "麦钱特说，没有什么是孤立存在的，他相信未来讲故事的方式也是如此。",
    "src": "Variety · 2026-09-10"
  },
  "sample": {
    "en": "“The general pattern seems to be that with wealth and rising power, you become less engaged with the needs of others and less burdened by the needs of social relationships,” study co-author Paul Piff, a social psychologist at the University of California, Irvine, tells the Guardian ’s Ian Sample.",
    "cn": "研究报告的共同作者、加州大学欧文分校的社会心理学家保罗·皮夫（Paul Piff）告诉《卫报》的伊恩·样本（Ian Sample）：“一般的模式似乎是，随着财富和权力的不断崛起，你对他人的需求的参与度降低，而对社会关系的需求的负担减轻。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "sand": {
    "en": "“Buried in sand, soil, or vegetation, the nest would stay humid or damp enough for the eggs to survive,” says Zelenitsky.",
    "cn": "Zelenitsky说：“巢穴被埋在沙子、土壤或植被中，会保持潮湿或潮湿，足以让卵子存活下来。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "saturday": {
    "en": "And in the weekend in between, Sky Sports will be showing Leeds vs Everton on Friday Night Football on New Year's Day, then Bournemouth vs Aston Villa on January 3 for Saturday Night Football at 5.30pm.",
    "cn": "在这期间的周末，天空体育将在新年当天播放利兹对埃弗顿的周五晚间足球比赛，然后在1月3日下午5:30播放伯恩茅斯对阿斯顿维拉的周六晚间足球比赛。",
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
    "en": "Odegaard's goal, fired in following a quick one-two with substitute Christos Tzolis, finally broke the deadlock but Noni Madueke, another substitute, missed a one-on-one chance with Tzolis's follow-up blocked on the line, leaving Arsenal to suffer a late scare.",
    "cn": "厄德高的目标是与替补球员克里斯托斯·佐利斯（Christos Tzolis）进行快速一对二的比赛，最终打破了僵局，但另一名替补球员诺尼·马杜埃克（Noni Madueke）错过了一对一的机会，佐利斯的后续行动被挡在了线上，使阿森纳遭受了晚些时候的恐慌。",
    "src": "Sky Sports · 2026-09-09"
  },
  "sale": {
    "en": "Jungle Book Studio founder Gaurav Dhingra serves as executive producer in addition to handling world sales.",
    "cn": "《奇幻森林》工作室的创始人Gaurav dininggra除了负责全球销售之外，还担任执行制片人。",
    "src": "Variety · 2026-09-10"
  },
  "scale": {
    "en": "It came from a shared belief that AFC is ready for its next chapter, one focused on scale and long-term impact.",
    "cn": "这源于一个共同的信念，即亚足联已经为下一个篇章做好了准备，一个专注于规模和长期影响的篇章。",
    "src": "Vogue · 2026-09-10"
  },
  "say": {
    "en": "“For the upcoming season, we’re seeing a massive surge toward deep, comforting color palettes,” she says.",
    "cn": "她说：“在即将到来的一季，我们将看到人们对深色调、舒适色调的大量偏好。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "saw": {
    "en": "Alonso's 3-5-2 system saw Josh Acheampong, Maxence Lacroix and Wesley Fofana start in the back three -- with Pedro Neto and Jorrel Hato as wing-backs.",
    "cn": "阿隆索排出的 3-5-2 阵型中，约书亚·阿查姆庞、拉克鲁瓦和福法纳组成三中卫，佩德罗·内托和哈托担任翼卫。",
    "src": "ESPN · Mark White · 2026-09-07"
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
    "en": "But the Missouri Supreme Court ruled last week that the state must revert to districts adopted after the last census.",
    "cn": "但密苏里州最高法院上周裁定，该州必须恢复上次人口普查后采用的地区。",
    "src": "CBS News · 2026-09-10"
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
  "resume": {
    "en": "He then resumed talking about U.S. oil production and Iran.",
    "cn": "然后，他继续谈论美国的石油生产和伊朗。",
    "src": "CBS News · 2026-09-10"
  },
  "saint": {
    "en": "A strong stop from the Saints goalkeeper, turning the ball past as Celtic push for an early opener.",
    "cn": "圣徒守门员强有力的一站，在凯尔特人推动早期揭幕战时，将球转过身去。",
    "src": "Sky Sports · 2026-09-09"
  },
  "sail": {
    "en": "Clooney became the latest celebrity to embrace the natural-manicure trend yesterday, showcasing a set of freshly trimmed, milky-pink nails while sailing into the destination.",
    "cn": "克鲁尼昨天成为最新一个拥抱自然美甲潮流的名人，他在前往目的地时展示了一组刚修剪过的乳白色指甲。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "safe": {
    "en": "Show the following inspiration photos to your nail tech, choose a sheer milky polish, and you’ll be in safe hands.",
    "cn": "把下面的灵感照片给你的美甲师看，选择一种纯乳状的指甲油，你就会很安全。",
    "src": "Cosmopolitan · 2026-09-09"
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
    "en": "\"We have a [360-degree] approach regarding production,\" says Martinović.",
    "cn": "martinoviki说：“我们有360度的生产方法。",
    "src": "Variety · 2026-09-10"
  },
  "regarding": {
    "en": "\"We have a [360-degree] approach regarding production,\" says Martinović.",
    "cn": "martinoviki说：“我们有360度的生产方法。",
    "src": "Variety · 2026-09-10"
  },
  "region": {
    "en": "Despite the turmoil, which heavily interrupted travel, the region’s response has been to carry on with business as usual.",
    "cn": "尽管动荡严重影响了旅游，但该地区的应对措施是照常营业。",
    "src": "Vogue · 2026-09-10"
  },
  "register": {
    "en": "In the basement of Lahore Museum in Pakistan were 34 black, leather-bound registers gathering dust.",
    "cn": "在巴基斯坦拉合尔博物馆（Lahore Museum）的地下室里，有34本黑色皮革装订的登记簿落满了灰尘。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "regular": {
    "en": "Whether you’re a gel-x devotee or you’re committed to a regular manicure, cloudy French tips can be done with any type of polish.",
    "cn": "无论你是美甲啫喱爱好者还是普通美甲爱好者，多云的法式美甲都可以用任何类型的指甲油来完成。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "regularly": {
    "en": "In the past year, she made that aforementioned runway debut, opened for Lorde, and embarked on her first headline tour, going from barely traveling to crossing the Atlantic regularly.",
    "cn": "在过去的一年里，她完成了前面提到的t台首秀，为洛德（Lorde）做了开场秀，并开始了她的第一次头条巡演，从几乎不旅行到定期横渡大西洋。",
    "src": "Vogue · 2026-09-10"
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
    "en": "Dua Lipa and Callum Turner, of course, are as reliable for keeping the vibes high as they are for their respective pop and film superstardom.",
    "cn": "当然，杜瓦·利帕和卡勒姆·特纳在保持高人气方面是可靠的，就像他们各自的流行音乐和电影超级明星一样。",
    "src": "Vogue · 2026-09-10"
  },
  "relevant": {
    "en": "Each of these retailers offers modern and relevant fall pieces that stylish people (ahem, you) will want to wear.",
    "cn": "这些零售商都提供时尚人士（嗯哼，你）想要穿的时髦和相关的秋季单品。",
    "src": "Who What Wear · 2026-09-10"
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
  "reject": {
    "en": "Hanaway's request for the U.S. Supreme Court to step in was rejected by Kavanaugh on Tuesday.",
    "cn": "Hanaway要求美国最高法院介入的请求周二被Kavanaugh拒绝。",
    "src": "CBS News · 2026-09-10"
  },
  "reinforce": {
    "en": "It is revealing because the World Cup has reinforced his appetite to keep learning and evolving.",
    "cn": "这很有启发性，因为世界杯增强了他不断学习和发展的胃口。",
    "src": "Sky Sports · 2026-09-09"
  },
  "relative": {
    "en": "Rights groups, fishermen and their relatives have questioned the campaign, alleging vessels were targeted without sufficient evidence of links to trafficking.",
    "cn": "人权组织、渔民及其亲属对这一行动提出质疑，声称船只在没有充分证据证明与贩运有关的情况下就成为目标。",
    "src": "CBS News · 2026-09-10"
  },
  "reliance": {
    "en": "Arsenal's set-piece prowess is well documented, to the extent that they have been criticised for an over-reliance on dead-ball situations to win tight games.",
    "cn": "阿森纳的定位球能力人尽皆知，甚至有人批评他们过分依赖定位球来赢下胶着比赛。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "reasonable": {
    "en": "\"I think it's pretty reasonable that if the president would like to have a conversation — or invite someone to have a conversation — to have it.",
    "cn": "“我认为，如果总统想进行对话—或邀请某人进行对话—进行对话是非常合理的。",
    "src": "CBS News · 2026-09-10"
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
  "recall": {
    "en": "Together, they recalled the six-decade-old codes that have made his brand a New York Fashion Week fixture—and, more broadly, a shorthand for American style.",
    "cn": "他们一起回顾了六十年来使他的品牌成为纽约时装周常客，以及更广泛意义上成为美国风格的代名词的准则。",
    "src": "ELLE · 2026-09-09"
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
    "en": "I'm dedicating this edit to the potential staples (re: versatile pieces) I recently found from J.Crew, Aritzia, and Gap.",
    "cn": "我把这篇编辑献给了我最近从J.Crew、arizia和Gap找到的潜在的主食（关于：百搭单品）。",
    "src": "Who What Wear · 2026-09-10"
  },
  "reception": {
    "en": "We’d just returned from New York the previous day: We’d been there for our friends’ Sunday wedding, the reception at an elegant club in midtown.",
    "cn": "前一天我们刚从纽约回来：我们去那里参加朋友的周日婚礼，在市中心一家优雅的俱乐部举行的招待会。",
    "src": "Vogue · 2026-09-10"
  },
  "recommend": {
    "en": "“I always recommend bringing inspiration photos, but also talking about how warm you’re comfortable going,” she says.",
    "cn": "她说：“我总是建议你带上一些鼓舞人心的照片，但同时也要告诉他们你感到有多温暖。",
    "src": "Cosmopolitan · 2026-09-09"
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
    "en": "Tiny bubbles give each motif added depth, while curved surfaces enhance the enamel’s light-reflecting finish.",
    "cn": "微小的气泡增加了每个图案的深度，而弯曲的表面增强了珐琅的反射光效果。",
    "src": "ELLE · 2026-09-09"
  },
  "refine": {
    "en": "For years now, Lhuillier has built a customer base around her embroidered or floral-print dresses or sweeping evening gowns, and there was no shortage of that drama for spring—but if you looked closer, you could see her clear attempts at stripping things back and refining.",
    "cn": "多年来，Lhuillier已经围绕她的刺绣或印花连衣裙或拖尾晚礼服建立了一个客户群，春季也不乏这种戏剧性——但如果你仔细观察，你会发现她明显在尝试剥离和提炼东西。",
    "src": "Vogue · 2026-09-10"
  },
  "reference": {
    "en": "Self-reference can be tricky territory, especially for a designer with an archive as deep as Ralph Lauren ’s.",
    "cn": "自我参考可能是一个棘手的领域，尤其是对于像拉尔夫·劳伦（Ralph Lauren）这样拥有深厚档案的设计师来说。",
    "src": "ELLE · 2026-09-09"
  },
  "reel": {
    "en": "Enough teams have spent lots of money on these highlight-reel-but-no-end-product wingers over the past three seasons that it has to mean something.",
    "cn": "过去三个赛季，已经有足够多的球队在这些「集锦精彩但产量不佳」的边锋身上砸下重金，这一定有意义。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "reduce": {
    "en": "Key ingredients like biotin, keratin, and chia seed oil reduce frizz, thicken hair, and strengthen your ends.",
    "cn": "生物素、角蛋白和奇亚籽油等关键成分可以减少毛躁，使头发更浓密，并强健发梢。",
    "src": "ELLE · 2026-09-10"
  },
  "red": {
    "en": "Kidman’s most obvious transformation between Practical Magic 1 and 2 is the switch from red to blonde hair.",
    "cn": "基德曼在《实用魔法》第1集和第2集中最明显的变化就是从红头发变成了金发。",
    "src": "ELLE · 2026-09-09"
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
    "en": "She also designed a tulle T-shirt gown covered in a grid arrangement of beads—almost resembling tweed.",
    "cn": "她还设计了一件薄纱t恤礼服，上面覆盖着网格状的珠子——几乎像粗花呢。",
    "src": "Vogue · 2026-09-10"
  },
  "reserve": {
    "en": "Fresh off his return from a deployment in Poland, Army Reserve Capt. Cody Khork was eager to find another assignment overseas with his fiancée.",
    "cn": "陆军预备役上尉科迪·霍克（Cody Khork）刚从波兰的部署中回来，就渴望与未婚妻一起在海外找到另一项任务。",
    "src": "CBS News · 2026-09-10"
  },
  "residence": {
    "en": "After Mr. Trump won the 2024 election, Fetterman became the first Senate Democrat to meet with the incoming president at his Palm Beach residence.",
    "cn": "在特朗普赢得2024年大选后，费特曼成为第一位在棕榈滩住所会见新任总统的参议院民主党人。",
    "src": "CBS News · 2026-09-10"
  },
  "resident": {
    "en": "The fire broke out on Monday in Antalya’s Aksu district and, fanned by strong winds, quickly spread into the neighboring Kepez district, forcing hundreds of residents from their homes.",
    "cn": "大火于周一在安塔利亚的阿克苏地区爆发，并在强风的推动下迅速蔓延到邻近的Kepez地区，迫使数百名居民离开家园。",
    "src": "ABC News · 2026-09-09"
  },
  "resist": {
    "en": "Streamlining may have been the focus this season, but as someone who specializes in glamour, Lhuillier couldn’t resist letting her over-the-top side come out to play.",
    "cn": "流线型可能是这一季的焦点，但作为一个擅长魅力的人，Lhuillier忍不住让她夸张的一面发挥出来。",
    "src": "Vogue · 2026-09-10"
  },
  "resolution": {
    "en": "Between June 2022 and September 2024, they made 32 scientific dives to the Po, which they studied using high-resolution sonar surveys and 3D photography.",
    "cn": "在2022年6月至2024年9月期间，他们对Po进行了32次科学潜水，他们使用高分辨率声纳调查和3D摄影进行了研究。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "resource": {
    "en": "Become a Vogue Business Member —the ultimate resource for fashion and beauty industry professionals.",
    "cn": "成为时尚商务会员-时尚和美容行业专业人士的终极资源。",
    "src": "Vogue · 2026-09-10"
  },
  "respect": {
    "en": "\"The U.S. Army is committed to transparency and respecting the privacy of our Gold Star Families.",
    "cn": "“美国陆军致力于透明度和尊重我们的金星家庭的隐私。",
    "src": "CBS News · 2026-09-10"
  },
  "restrain": {
    "en": "Meanwhile, Clark late Wednesday also rejected an emergency request to issue a stay of his temporary restraining order that reinstated the new map.",
    "cn": "与此同时，克拉克周三晚些时候还拒绝了紧急请求，要求暂停恢复新地图的临时限制令。",
    "src": "CBS News · 2026-09-10"
  },
  "restore": {
    "en": "According to the synopsis, \"Sanctuary\" is set on a post-apocalyptic Earth, where the discovery of a cryogenically suspended woman provokes fear in a desperate village, sending a young warrior and the mysterious woman on a quest for a lost city and answers that could restore humanity.",
    "cn": "根据剧情大纲，《庇护所》设定在一个后世界末日的地球上，一个被低温悬浮的女人的发现在一个绝望的村庄引发了恐惧，派遣一个年轻的战士和一个神秘的女人去寻找一个失落的城市，寻找可以恢复人类的答案。",
    "src": "Variety · 2026-09-10"
  },
  "rest": {
    "en": "Discovered by divers in 2005, it rests on a gently inclined shelf less than a mile off the coast.",
    "cn": "它由潜水员于2005年发现，坐落在离海岸不到一英里的平缓倾斜的架子上。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "response": {
    "en": "Despite the turmoil, which heavily interrupted travel, the region’s response has been to carry on with business as usual.",
    "cn": "尽管动荡严重影响了旅游，但该地区的应对措施是照常营业。",
    "src": "Vogue · 2026-09-10"
  },
  "respond": {
    "en": "Barnes did not respond to multiple requests for comment, while a spokeswoman for the 103rd Sustainment Command directed all questions to the Pentagon.",
    "cn": "巴恩斯没有回应多次置评请求，而第103维持司令部的一名女发言人则将所有问题都转给了五角大楼。",
    "src": "CBS News · 2026-09-10"
  },
  "respective": {
    "en": "Loyal Trump supporters are coughing up five-digit sums to their respective national fundraising committees for a ticket.",
    "cn": "特朗普的忠实支持者向各自的国家筹款委员会支付了五位数的金额，以获得一张门票。",
    "src": "CBS News · 2026-09-09"
  },
  "responsible": {
    "en": "But any economic stimulus program runs the risk of causing inflation to spike, and many economists believe the pandemic-era stimulus was at least partially responsible for the rise in consumer prices that ensued over the following years.",
    "cn": "但任何经济刺激计划都有导致通货膨胀飙升的风险，许多经济学家认为，疫情时期的刺激措施至少部分导致了随后几年消费价格的上涨。",
    "src": "CBS News · 2026-09-10"
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
  "render": {
    "en": "\"A federal-election-administration disaster is unfolding in Missouri,\" Hanaway wrote in an emergency application for the U.S. Supreme Court to put the ruling on hold, warning it could lead to \"unprecedented chaos\" and render the primary \"utterly pointless.\"",
    "cn": "“密苏里州正在发生联邦选举行政灾难，”Hanaway在一份紧急申请中写道，要求美国最高法院搁置裁决，并警告说，这可能导致“前所未有的混乱”，并使主要的“毫无意义”。",
    "src": "CBS News · 2026-09-10"
  },
  "remove": {
    "en": "In recent weeks there have been signs of a shift in tactics, with joint U.S.-Ecuador patrols removing crews from at least six boats before sinking the vessels.",
    "cn": "最近几周有迹象表明，美国和厄瓜多尔的联合巡逻队在击沉船只之前，已经将至少六艘船上的船员撤离。",
    "src": "CBS News · 2026-09-10"
  },
  "remind": {
    "en": "This collection reminded our editors of some of Ralph Lauren's most enduring shows of the past, including spring/summer 2003.",
    "cn": "这个系列让我们的编辑想起了拉夫·劳伦过去最经久不衰的几场秀，包括2003年春夏。",
    "src": "Who What Wear · 2026-09-10"
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
    "en": "Her brunette hair was worn glossy and straight, while bronzed makeup made the most of what remains of her seemingly endless vacation tan.",
    "cn": "她乌黑的头发梳得又直又亮，古铜色的妆容充分利用了她似乎无穷无尽的假期晒黑的余韵。",
    "src": "Vogue · 2026-09-10"
  },
  "remain": {
    "en": "Alonso was handed another clear indication of where his side remain lacking - but for now, chaos isn't serving them too badly.",
    "cn": "阿隆索得到了另一个明确的迹象，表明他的球队仍然缺乏-但目前，混乱并没有为他们服务得太糟糕。",
    "src": "Sky Sports · 2026-09-09"
  },
  "religious": {
    "en": "Set deep in the Colombian jungle, the eight-episode series, titled \"Ha'Bricha\" in Hebrew, centers around the scion of a religious cult leader who manages to flee but is forced to leave behind his wife and child.",
    "cn": "这部八集的剧集以哥伦比亚丛林深处为背景，希伯来语名为“Ha’bricha”，故事围绕着一个邪教领袖的后代展开，他设法逃离，但被迫留下妻子和孩子。",
    "src": "Variety · 2026-09-10"
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
    "en": "The Khorks said Cody, as a force protection officer, had delivered repeated warnings to the unit's leader, Brig.",
    "cn": "霍克夫妇说，科迪作为一名部队保护官员，曾多次向该部队的领导人布里格？",
    "src": "CBS News · 2026-09-10"
  },
  "republican": {
    "en": "But Republicans are facing down voters' historical tendency to reject the party that controls the White House in the midterms.",
    "cn": "但共和党人正在面对选民在中期选举中拒绝控制白宫的政党的历史倾向。",
    "src": "CBS News · 2026-09-10"
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
  "represent": {
    "en": "In a statement provided to Variety, the company said that \"Sanctuary\" \"represents a notable shift in scale and ambition for Serbian production.\"",
    "cn": "在提供给Variety的一份声明中，该公司表示，“Sanctuary”“代表了塞尔维亚生产规模和雄心的显着转变。",
    "src": "Variety · 2026-09-10"
  },
  "report": {
    "en": "The report announced that a “light aircraft” had crashed into the North Tower, unexpected because visibility was so good.",
    "cn": "报告称，一架“轻型飞机”撞上了北塔，由于能见度非常好，这是出乎意料的。",
    "src": "Vogue · 2026-09-10"
  },
  "reply": {
    "en": "Five told CBS News they would not be going to Dallas, while the vast majority, 51 candidates, did not reply to CBS News' queries.",
    "cn": "其中5人告诉CBS新闻，他们不会去达拉斯，而绝大多数候选人（51人）没有回答CBS新闻的提问。",
    "src": "CBS News · 2026-09-09"
  },
  "replace": {
    "en": "Chelsea's plan was to replace Enzo with Monaco's Lamine Camara, but a deal for the Senegal international collapsed late on deadline day.",
    "cn": "切尔西原本计划用摩纳哥的卡马拉替代恩佐，但这位塞内加尔国脚的交易在转会截止日临近时告吹。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
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
  "scent": {
    "en": "Ouai conditioner is a lightweight, lightly scented product that adds softness, bounce, and volume as described.",
    "cn": "OUAI护发素是一款轻盈、香味轻盈的产品，可增加柔软度、弹性和体积感。",
    "src": "ELLE · 2026-09-10"
  },
  "plenty": {
    "en": "If you’re in the know about beauty trends, you’ve likely heard plenty about exosomes over the past few years.",
    "cn": "如果你对美容趋势有所了解，那么在过去的几年里，你可能听说过很多关于外泌体的事情。",
    "src": "ELLE · 2026-09-09"
  },
  "might": {
    "en": "It’s the kind of style you might expect a leading love interest like Andie Anderson or Anna Scott to step out in.",
    "cn": "这是一种你可能会期待像安迪·安德森或安娜·斯科特这样的主要恋爱对象出现的风格。",
    "src": "ELLE · 2026-09-09"
  },
  "mile": {
    "en": "Discovered by divers in 2005, it rests on a gently inclined shelf less than a mile off the coast.",
    "cn": "它由潜水员于2005年发现，坐落在离海岸不到一英里的平缓倾斜的架子上。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "military": {
    "en": "Hours later, the U.S. military confirmed it conducted another deadly strike in the Caribbean Sea.",
    "cn": "几小时后，美国军方证实在加勒比海进行了另一次致命袭击。",
    "src": "CBS News · 2026-09-10"
  },
  "milk": {
    "en": "In a 2016 study, scientists found that milk proteins from a species of cockroach that gives live birth carry three times as much energy as milk proteins from cows.",
    "cn": "在2016年的一项研究中，科学家们发现，一种活产蟑螂的乳蛋白所携带的能量是奶牛乳蛋白的三倍。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "mill": {
    "en": "Standing in front of Western Pennsylvania's Mon Valley Works steel mill, Fetterman said, \"we'll work with President Trump to fight and defend the steel way of life right here in the Steel Valley.\"",
    "cn": "Fetterman站在宾夕法尼亚州西部的Mon Valley Works钢铁厂前说：“我们将与特朗普总统合作，在钢铁谷与钢铁生活方式进行斗争和捍卫。",
    "src": "CBS News · 2026-09-10"
  },
  "million": {
    "en": "Arsenal pursued a deal for Rogers for much of the summer but never believed he was worth £117 million.",
    "cn": "阿森纳整个夏天都在追逐罗杰斯，但始终认为他不值 1.17 亿英镑。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "mind": {
    "en": "Those images remain seared in my mind: faced with the choice between the burning building and hurling themselves to certain death, they chose to jump.",
    "cn": "那些画面仍然在我的脑海中挥之不去：面对着火的大楼和将自己扔向死亡之间的选择，他们选择了跳下去。",
    "src": "Vogue · 2026-09-10"
  },
  "mineral": {
    "en": "The nails are shaped, the cuticles tidied, and the surface gently buffed before a mineral-rich paste and powder are worked into the nail.",
    "cn": "指甲被塑形，角质层被整理，表面被轻轻打磨，然后一种富含矿物质的膏体和粉末被加工到指甲上。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "minister": {
    "en": "Edda Ciano, the daughter of Italian dictator Benito Mussolini and the wife of Italian foreign minister Galeazzo Ciano, was among the survivors.",
    "cn": "埃达·奇亚诺（Edda Ciano）是意大利独裁者贝尼托·墨索里尼（Benito Mussolini）的女儿，也是意大利外交部长加莱阿佐·奇亚诺（Galeazzo Ciano）的妻子",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "mission": {
    "en": "Whether you’re looking for instant post-wash volume or on a longer-term mission to thicker tresses, you’ve come to the right place.",
    "cn": "无论您是在寻找即时洗涤量，还是在寻找更厚的长期任务，您都来对地方了。",
    "src": "ELLE · 2026-09-10"
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
  "mist": {
    "en": "Well, then they will be very excited to know we’ve got lots more Portofino ’97 coming very soon—a hair mist, body lotion.",
    "cn": "那他们会很兴奋的知道我们很快就会有更多的97年波托菲诺——发胶，身体乳。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "midnight": {
    "en": "For those with an aversion to jet-black manicures ( they're polarizing, I get it), I suggest going the deep, midnight navy route.",
    "cn": "对于那些厌恶黑色指甲的人（我明白他们的看法两极分化），我建议他们选择深蓝色的午夜路线。",
    "src": "Who What Wear · 2026-09-10"
  },
  "medium": {
    "en": "Once dry, he worked in small-to-medium sections using the ghd Chronos Curve Grand Iron to wind the hair in a consistent direction to build a full, voluminous curl pattern “reminiscent of Nicole’s own ’90s curls — defined but never stiff, with real body behind it,” says Abergel.",
    "cn": "一旦头发干了，他就用gd Chronos Curve Grand Iron把头发分小到中等大小的部分以一致的方向卷起来，形成一个丰满的卷发图案，“让人想起妮可自己90年代的卷发——轮廓分明，但从不僵硬，背后有真实的身体，”阿伯格尔说。",
    "src": "ELLE · 2026-09-09"
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
  "melt": {
    "en": "The look skips any stark white lines, no ultra-defined tips; instead, Pamela’s manicure appears to feature a sheer, milky base that melts into diffused white tips, creating a blurred, almost cloud-like finish.",
    "cn": "这款妆容没有任何明显的白线，也没有超细的唇尖；相反，帕梅拉的美甲似乎以透明的乳白色底妆为特色，融化成扩散的白色尖端，创造出一种模糊的、几乎像云一样的效果。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "member": {
    "en": "Members of a group learn to make or use these items by observing others.",
    "cn": "一个小组的成员通过观察其他人来学习制作或使用这些物品。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "memory": {
    "en": "Sophia Stel has a very specific memory from last year’s Paris Fashion Week.",
    "cn": "索菲亚·斯特尔（Sophia Stel）对去年的巴黎时装周有着非常特别的记忆。",
    "src": "Vogue · 2026-09-10"
  },
  "mental": {
    "en": "“Knowledge alone is not enough – it also takes unwavering mental strength, strategic thinking, and the ability to make split-second decisions under pressure,” she said.",
    "cn": "她说：“光有知识是不够的，还需要坚定的精神力量、战略思维和在压力下瞬间做出决定的能力。",
    "src": "Variety · 2026-09-10"
  },
  "mention": {
    "en": "Dr. Halaas also mentions that products containing biomimetic or lab-engineered vesicles are becoming a third category of exosome therapy that hair-growth consumers will start to see more of.",
    "cn": "哈拉斯博士还提到，含有仿生或实验室设计的囊泡的产品正在成为第三类外泌体疗法，头发生长的消费者将开始更多地看到这种疗法。",
    "src": "ELLE · 2026-09-09"
  },
  "menu": {
    "en": "Peptides seem like they’re everywhere: on social media, on medical spa menus and beyond.",
    "cn": "多肽似乎无处不在：社交媒体、医疗水疗菜单等。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "merchant": {
    "en": "Merchant said nothing exists in isolation, and that he believes the future of storytelling works the same way.",
    "cn": "麦钱特说，没有什么是孤立存在的，他相信未来讲故事的方式也是如此。",
    "src": "Variety · 2026-09-10"
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
  "middle": {
    "en": "But the Arsenal attack down both flanks and through the middle looked extremely dangerous at the Stadio Diego Armando Maradona.",
    "cn": "但是阿森纳在迭戈·阿曼多·马拉多纳体育场的侧翼和中间进攻看起来非常危险。",
    "src": "Sky Sports · 2026-09-09"
  },
  "messenger": {
    "en": "“They carry proteins, growth factors, lipids, and genetic material, such as messenger RNA and microRNA.",
    "cn": "“它们携带蛋白质、生长因子、脂质和遗传物质，如信使RNA和微RNA。",
    "src": "ELLE · 2026-09-09"
  },
  "message": {
    "en": "A few years ago, these drugs belonged to the world of bodybuilder message boards and the dark web.",
    "cn": "几年前，这些药物属于健美留言板和暗网的世界。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "metal": {
    "en": "The latest lineup plays with color and material through deep green, iridescent Australian opal, signature blue, salmon, and precious metals including white gold, rose gold, and platinum.",
    "cn": "最新的系列在颜色和材质上发挥了作用，包括深绿色、彩虹色澳大利亚蛋白石、标志性蓝色、鲑鱼色以及白金、玫瑰金和铂金等贵金属。",
    "src": "ELLE · 2026-09-09"
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
  "movement": {
    "en": "Frizz can even add a bit of movement or volume to your hair.",
    "cn": "卷毛甚至可以让你的头发看起来更有动感和丰盈。",
    "src": "ELLE · 2026-09-09"
  },
  "movie": {
    "en": "Some movie moments age like fine wine, as do the characters and real-life actors in them.",
    "cn": "一些电影时刻像美酒一样陈年，其中的角色和现实生活中的演员也是如此。",
    "src": "ELLE · 2026-09-09"
  },
  "much": {
    "en": "The way we moved the ball, the aggression and the chances we created, we should have done so much better.",
    "cn": "我们移动球的方式，我们创造的侵略性和机会，我们应该做得更好。",
    "src": "Sky Sports · 2026-09-09"
  },
  "multiple": {
    "en": "Multiple sources told CBS News that Army intelligence warned as early as January that Iran would attack the Port of Shuaiba in a potential war.",
    "cn": "多个消息来源告诉哥伦比亚广播公司新闻，陆军情报部门早在1月份就警告说，伊朗将在一场潜在的战争中袭击帅巴港。",
    "src": "CBS News · 2026-09-10"
  },
  "mute": {
    "en": "Makeup for all of the cast, including Bullock’s, mostly leaned soft and muted.",
    "cn": "包括布洛克在内的所有演员的妆容都很柔和。",
    "src": "ELLE · 2026-09-09"
  },
  "must": {
    "en": "But the Missouri Supreme Court ruled last week that the state must revert to districts adopted after the last census.",
    "cn": "但密苏里州最高法院上周裁定，该州必须恢复上次人口普查后采用的地区。",
    "src": "CBS News · 2026-09-10"
  },
  "museum": {
    "en": "The Bayeux Tapestry exhibition is already proving to be one of the most popular in the museum’s history.",
    "cn": "贝叶挂毯展览已经被证明是博物馆历史上最受欢迎的展览之一。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "muscle": {
    "en": "Today, they’re sold via polished websites with a medical gloss, with each peptide promising to deliver a remarkable benefit, such as weight loss, younger-looking skin or muscle repair.",
    "cn": "如今，它们通过带有医学光泽的抛光网站出售，每种肽都有望带来显着的好处，例如减肥、年轻的皮肤或肌肉修复。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "murder": {
    "en": "In Ecuador alone, more than 25,000 people have been murdered in the last three years as drug gangs have vied for control of trafficking routes.",
    "cn": "仅在厄瓜多尔，在过去三年中，由于贩毒团伙争夺对贩运路线的控制，已有2.5万多人被谋杀。",
    "src": "CBS News · 2026-09-10"
  },
  "music": {
    "en": "Her work includes projects for clients such as Axel Springer and Universal Music.",
    "cn": "她的工作包括为阿克塞尔b施普林格和环球音乐等客户提供项目。",
    "src": "Variety · 2026-09-10"
  },
  "mostly": {
    "en": "And then Mbaye played only 900 mostly sub minutes for the best team in the world.",
    "cn": "而姆巴耶在世界上最好的球队只踢了大约 900 分钟，大多是替补时间。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "mix": {
    "en": "“I think it’s a mix of some of the stuff that I would think was the tackiest things ever, ” she said of the collection.",
    "cn": "“我认为它混合了一些我认为是有史以来最俗气的东西，”她谈到这个系列时说。",
    "src": "Vogue · 2026-09-10"
  },
  "modern": {
    "en": "Get creative with this classic style by adding a matte top coat or gold accents for a delicate, modern update.",
    "cn": "通过添加哑光面漆或金色口音来获得这种经典风格的创意，以获得精致，现代的更新。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "moisture": {
    "en": "A blend of oils and honey creates a lightweight formula that defines curls while locking in moisture.",
    "cn": "油和蜂蜜的混合物创造了一个轻量级的配方，定义卷发，同时锁住水分。",
    "src": "ELLE · 2026-09-09"
  },
  "molecule": {
    "en": "There’s little to no research proving these molecules are safe or effective and no assurance from the FDA about their identity, purity or strength.",
    "cn": "几乎没有研究证明这些分子是安全或有效的，FDA也不能保证它们的特性、纯度或强度。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "moment": {
    "en": "I'm personally partial to this smoky brown moment above from celebrity manicurist Iram Shelton, who simply used OPI's Hot Toddy Naughty",
    "cn": "我个人偏爱上面这张由名人美甲师伊拉姆·谢尔顿（Iram Shelton）制作的烟熏棕色，他只是用了OPI的Hot Toddy Naughty",
    "src": "Who What Wear · 2026-09-10"
  },
  "monday": {
    "en": "Paper Talk is a review of the sports headlines from the national newspapers, every Monday to Friday, live on Sky Sports News from 10.30pm.",
    "cn": "Paper Talk是每周一至周五晚上10:30在天空体育新闻直播的全国性报纸的体育头条评论。",
    "src": "Sky Sports · 2026-09-09"
  },
  "money": {
    "en": "It stars Kiri alongside Dutch actor Jonas Smulders (\"Luka,\" \"Paradise Drifters\") and Serbia's Darko Perić (\"Money Heist\").",
    "cn": "它与荷兰演员Jonas Smulders （“Luka”，“天堂流浪者”）和塞尔维亚的Darko Perić （“金钱抢劫”）一起出演。",
    "src": "Variety · 2026-09-10"
  },
  "most": {
    "en": "Elizabeth I is one of history's most iconic monarchs, but her path to the throne was anything but secure.",
    "cn": "伊丽莎白一世是历史上最具标志性的君主之一，但她登上王位的道路却并不安全。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "morning": {
    "en": "The look in question came to us when the actor was spotted filming for The Morning Show in Times Square.",
    "cn": "当这位演员在时代广场拍摄《晨间秀》时，我们发现了他的造型。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "more": {
    "en": "These types of wingers had never really existed before, but now they were more important than anyone else.",
    "cn": "这种类型的边锋以前几乎不存在，但现在他们成了场上最重要的角色。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "mother": {
    "en": "Livia wore a white dress with blue ribbons that my mother had saved from my infancy.",
    "cn": "利维娅穿着一件带蓝丝带的白裙子，那是我母亲从我小时候给我留的。",
    "src": "Vogue · 2026-09-10"
  },
  "mood": {
    "en": "For spring/summer 2027, the designer revisited his signature codes with an irreverent new mood.",
    "cn": "2027年春夏，这位设计师以一种不敬的新心情重新审视了他的标志性代码。",
    "src": "ELLE · 2026-09-09"
  },
  "month": {
    "en": "Pay extra attention to your cuticles during the colder months when skin becomes prone to dryness and flaking.",
    "cn": "在寒冷的月份要特别注意你的角质层，因为皮肤容易干燥和脱落。",
    "src": "Harper's Bazaar · 2026-09-09"
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
    "en": "McKee is the first sitting governor anywhere in the country to lose a primary in eight years.",
    "cn": "麦基是八年来首位在初选中失利的在任州长。",
    "src": "CBS News · 2026-09-10"
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
    "en": "It’s the kind of style you might expect a leading love interest like Andie Anderson or Anna Scott to step out in.",
    "cn": "这是一种你可能会期待像安迪·安德森或安娜·斯科特这样的主要恋爱对象出现的风格。",
    "src": "ELLE · 2026-09-09"
  },
  "lover": {
    "en": "“The makeup is inspired by rolling around in the sheets with a lover in the south of Europe or a tropical place,” he says.",
    "cn": "他说：“这款化妆品的灵感来自与南欧或热带地区的恋人在床单上打滚。",
    "src": "ELLE · 2026-09-09"
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
  "loyal": {
    "en": "Loyal Trump supporters are coughing up five-digit sums to their respective national fundraising committees for a ticket.",
    "cn": "特朗普的忠实支持者向各自的国家筹款委员会支付了五位数的金额，以获得一张门票。",
    "src": "CBS News · 2026-09-09"
  },
  "lucky": {
    "en": "The five new pieces—a long necklace, necklace, pendant, bracelet, and earrings—pair the house’s lucky clover with a bold wash of pink that feels both fresh and unmistakably Alhambra.",
    "cn": "这五件新品——长项链、项链、吊坠、手镯和耳环——将房子的幸运三叶草与大胆的粉色搭配在一起，既新鲜又明确无误。",
    "src": "ELLE · 2026-09-09"
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
  "magic": {
    "en": "Case in point: Practical Magic and the Owens sisters.",
    "cn": "举个例子：实用魔术和欧文斯姐妹。",
    "src": "ELLE · 2026-09-09"
  },
  "luxury": {
    "en": "It’s about never compromising, and I think this is the ultimate in luxury—from the juice to how unique it is.",
    "cn": "这是关于永不妥协，我认为这是奢侈品的终极——从果汁到它的独特之处。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "magazine": {
    "en": "Based in New York City, he previously worked as a News Writer at W magazine and an Assistant Editor at V magazine.",
    "cn": "他以前在纽约市工作，曾在W杂志担任新闻撰稿人，在V杂志担任助理编辑。",
    "src": "ELLE · 2026-09-09"
  },
  "mainland": {
    "en": "Mainland raccoons, on the other hand, typically weigh between 15 and 40 pounds.",
    "cn": "另一方面，大陆浣熊的体重通常在15到40磅之间。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "lord": {
    "en": "While attempting to navigate the estate's unforgiving world alongside his cousin Caleb (played by Khan), Younger is drawn into the orbit of local drug lord Anton (played by Bokinni).",
    "cn": "在试图与他的堂兄Caleb （由Khan扮演）一起在庄园的无情世界中航行时，Younger被吸引到当地毒枭Anton （由Bokinni扮演）的轨道上。",
    "src": "Variety · 2026-09-10"
  },
  "loose": {
    "en": "To emulate this ease, Belghiran created loose, knotted ponytails in two different styles.",
    "cn": "为了模仿这种轻松，Belghiran创造了两种不同风格的宽松打结马尾。",
    "src": "ELLE · 2026-09-09"
  },
  "liquid": {
    "en": "To hop on the trend, either opt for a burnished polish (like Essie's Gel Couture Liquid Diamonds collection) or simply add a chrome topper to any rich shade you please.",
    "cn": "想要跟上潮流，要么选择抛光的指甲油（比如Essie的凝胶高级定制液体钻石系列），要么简单地在任何你喜欢的颜色上加一层镀铬。",
    "src": "Who What Wear · 2026-09-10"
  },
  "list": {
    "en": "They listed the soldier’s rank, the village they came from, their caste, any injuries, and if they died.",
    "cn": "他们列出了士兵的军衔，他们来自的村庄，他们的种姓，是否受伤，是否死亡。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "listen": {
    "en": "\"Times are tough, and we need to be listening to everything they're saying about the struggles that they're encountering in their budgets and their kitchen table and their businesses, healthcare and act on it.",
    "cn": "“时局艰难，我们需要倾听他们所说的一切，关于他们在预算、餐桌、生意、医疗方面遇到的困难，并采取行动。",
    "src": "CBS News · 2026-09-09"
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
  "living": {
    "en": "We are living in a time of rapid transformation and increasing speculation — about the present, the future, what we thought was true and what we hold dear.",
    "cn": "我们生活在一个快速变革和越来越多的猜测的时代——关于现在，关于未来，关于我们认为是真的，关于我们珍视的东西。",
    "src": "Variety · 2026-09-10"
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
    "en": "Cruz’s long, almond nails were slightly warmer and pinker in shade—a look that’s both versatile and flattering.",
    "cn": "克鲁兹的长杏仁指甲在色调上略显温暖和粉红色，这种造型既百搭又讨人喜欢。",
    "src": "Vogue · 2026-09-10"
  },
  "lock": {
    "en": "A blend of oils and honey creates a lightweight formula that defines curls while locking in moisture.",
    "cn": "油和蜂蜜的混合物创造了一个轻量级的配方，定义卷发，同时锁住水分。",
    "src": "ELLE · 2026-09-09"
  },
  "location": {
    "en": "Gen. Clint Barnes, about the risk that Iran would attack their location, which was roughly 65 miles from the border.",
    "cn": "克林特·巴恩斯（Clint Barnes）将军谈到了伊朗可能袭击他们的地点的风险，他们的地点距离边境大约65英里。",
    "src": "CBS News · 2026-09-10"
  },
  "locate": {
    "en": "When the museum sent a printout, he located his father’s village.",
    "cn": "当博物馆寄来打印件时，他找到了父亲的村庄。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "local": {
    "en": "Rubio said decisions were made case by case and depended on the threat posed by a vessel, its location and local laws.",
    "cn": "卢比奥说，决定是根据具体情况做出的，取决于船只构成的威胁、位置和当地法律。",
    "src": "CBS News · 2026-09-10"
  },
  "log": {
    "en": "Yet as O’Neil logged 64 hours of field observations, the activity transformed into a family pastime.",
    "cn": "然而，随着奥尼尔记录了64个小时的实地观察，这项活动变成了一项家庭消遣。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "maintain": {
    "en": "A simple, glazed manicure will maintain your nails’ health while giving a chic polish to any look.",
    "cn": "简单的上釉美甲既能保持指甲健康，又能给任何造型带来别致的光泽。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "maintenance": {
    "en": "It’s a warmer take on the classic root smudge (which allows your hair to grow out more evenly with less maintenance).",
    "cn": "它比传统的发根涂抹更温暖（发根涂抹可以让你的头发长得更均匀，更少保养）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "mate": {
    "en": "Arteta also highlighted how fresh combinations with team-mates are playing a part.",
    "cn": "Arteta还强调了与队友的新组合是如何发挥作用的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "material": {
    "en": "The same goes for palette and texture, with materials like tweed, suede, and patent leather designed in varying color combinations.",
    "cn": "色调和质地也是如此，粗花呢、麂皮和漆皮等材料设计成不同的颜色组合。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "matter": {
    "en": "No matter your color, O’Connor says that glossy hair will be key to transitioning your hue for fall.",
    "cn": "奥康纳说，不管你的肤色是什么，有光泽的头发将是秋季转变色调的关键。",
    "src": "Cosmopolitan · 2026-09-09"
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
    "en": "“What’s in the package may not actually be what is on the outside of the label,” Doroshow adds.",
    "cn": "Doroshow补充道：“包装中的东西实际上可能不是标签外面的东西。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "maybe": {
    "en": "Maybe Chelsea will need to actually recruit more players as they move on through the next year or two with Alonso.",
    "cn": "也许切尔西真的需要在阿隆索麾下继续前行的一两年里，再引进更多球员。",
    "src": "ESPN · Mark White · 2026-09-07"
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
  "mechanical": {
    "en": "Originally introduced in 2009, the Spin Time takes inspiration from the mechanical departure boards once found in airports and train stations, translating their movement onto the wrist through 12 rotating cubes that mark the passing hours.",
    "cn": "Spin Time最初于2009年推出，灵感来自机场和火车站的机械出发板，通过12个旋转立方体将其运动转化为手腕，标志着过去的时间。",
    "src": "ELLE · 2026-09-09"
  },
  "match": {
    "en": "Turner, meanwhile, kept things understated in a navy shirt and matching trousers with white sneakers.",
    "cn": "与此同时，特纳低调地穿了一件海军蓝衬衫，搭配长裤和白色运动鞋。",
    "src": "Vogue · 2026-09-10"
  },
  "meanwhile": {
    "en": "Turner, meanwhile, kept things understated in a navy shirt and matching trousers with white sneakers.",
    "cn": "与此同时，特纳低调地穿了一件海军蓝衬衫，搭配长裤和白色运动鞋。",
    "src": "Vogue · 2026-09-10"
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
  "masterpiece": {
    "en": "But John Finnemore has crafted an absolute masterpiece: a cycle of five plays that are each as funny as they are moving, and of course, deeply, deeply unpredictable.",
    "cn": "但约翰·芬尼莫尔创作了一部绝对的杰作：一部由五部戏剧组成的戏剧循环，每部戏剧既有趣又感人，当然，也非常非常不可预测。",
    "src": "Variety · 2026-09-10"
  },
  "manufacture": {
    "en": "“The tradeoff is donor variability and higher manufacturing complexity, as well as greater regulatory scrutiny.",
    "cn": "“权衡的是供体的可变性和更高的制造复杂性，以及更严格的监管审查。",
    "src": "ELLE · 2026-09-09"
  },
  "many": {
    "en": "Trousers were draped with ease, many of them worn with cummerbunds and fringed scarves affixed low on the waist.",
    "cn": "裤子披得很轻松，其中许多都穿着腰部较低的cummerbunds和流苏围巾。",
    "src": "ELLE · 2026-09-09"
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
    "en": "There’s something about the Venice Film Festival that makes every red carpet entrance feel especially cinematic.",
    "cn": "威尼斯电影节有一种特殊的感觉，让每一次红毯亮相都显得特别电影化。",
    "src": "ELLE · 2026-09-09"
  },
  "majority": {
    "en": "If Fetterman were to switch parties, it would be harder for Democrats to reclaim the Senate majority.",
    "cn": "如果费特曼转换政党，民主党人将更难夺回参议院多数席位。",
    "src": "CBS News · 2026-09-10"
  },
  "major": {
    "en": "Toronto is the first major international platform where we are opening that conversation.”",
    "cn": "多伦多是我们开启这一对话的第一个主要国际平台。",
    "src": "Variety · 2026-09-10"
  },
  "map": {
    "en": "Meanwhile, Clark late Wednesday also rejected an emergency request to issue a stay of his temporary restraining order that reinstated the new map.",
    "cn": "与此同时，克拉克周三晚些时候还拒绝了紧急请求，要求暂停恢复新地图的临时限制令。",
    "src": "CBS News · 2026-09-10"
  },
  "march": {
    "en": "Next March, we can only anticipate even more, but luckily for customers that’s also when the spring collections will be in stores.",
    "cn": "明年3月，我们只能期待更多，但对顾客来说幸运的是，那也是春季系列上市的时候。",
    "src": "Vogue · 2026-09-10"
  },
  "mass": {
    "en": "This unprecedented act of violence took place at the height of the Peasants’ Revolt, a mass uprising sparked by the imposition of a poll tax —the third of its kind in four years.",
    "cn": "这种前所未有的暴力行为发生在农民起义的高峰期，这是四年来第三次征收人头税引发的大规模起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "marriage": {
    "en": "If you’re wondering about the secret to 27 years of marriage, Victoria Beckham just hinted at the answer with her newest fragrance.",
    "cn": "如果你想知道27年婚姻的秘密，维多利亚·贝克汉姆用她最新的香水暗示了答案。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "market": {
    "en": "“We want to build a portfolio of IP where creativity, ownership, capital and global market access work together.",
    "cn": "“我们希望建立一个知识产权组合，将创造力、所有权、资本和全球市场准入结合在一起。",
    "src": "Variety · 2026-09-10"
  },
  "mark": {
    "en": "The ambitious, English-language feature marks a big swing for Telekom Srbija's TS Media.",
    "cn": "这个雄心勃勃的英语功能标志着Telekom Srbija的TS Media的一个大转变。",
    "src": "Variety · 2026-09-10"
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
  "married": {
    "en": "It’s been a whirlwind few months for the couple, who married in Sicily back in June and have barely touched the ground since.",
    "cn": "对这对夫妇来说，这几个月就像旋风一样，他们六月份在西西里岛结婚，从那以后几乎没有接触过地面。",
    "src": "Vogue · 2026-09-10"
  },
  "myself": {
    "en": "I found myself in all of these new spaces and having new types of experiences.”",
    "cn": "我发现自己置身于所有这些新空间中，拥有全新的体验。",
    "src": "Vogue · 2026-09-10"
  },
  "mysterious": {
    "en": "“He said it was mysterious, just like he is,” Conti says.",
    "cn": "“他说这很神秘，就像他一样，”Conti说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "mystery": {
    "en": "\"The time is near enough so the events that led to the collapse of civilization are still relevant, but far enough that they have been shrouded in mystery and myth,\" the director said.",
    "cn": "这位导演说：“时间已经足够接近，导致文明崩溃的事件仍然是相关的，但足够远，它们已经笼罩在神秘和神话之中。",
    "src": "Variety · 2026-09-10"
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
    "en": "World sales are being handled by Sublimity, which has also secured several other international deals.",
    "cn": "Sublimity正在处理全球销售，该公司还获得了其他几项国际交易。",
    "src": "Variety · 2026-09-10"
  },
  "otherwise": {
    "en": "Elevate your bare manicure with a sheer wash of rose-hued color; it adds a healthy tint and shine to otherwise pared-back tips.",
    "cn": "用玫瑰色的纯水洗一下你裸露的指甲；它可以为原本稀疏的头发增添健康的色泽和光泽。",
    "src": "Harper's Bazaar · 2026-09-09"
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
    "en": "Beso added: “This film comes from a strong desire to tell stories that are ours.",
    "cn": "贝索补充说：“这部电影来自于一种强烈的愿望，那就是讲述属于我们的故事。",
    "src": "Variety · 2026-09-10"
  },
  "ourselves": {
    "en": "\"The way we competed, attitude, courage, the way we imposed ourselves on the game, the quality we showed to break them down, which is very difficult to do.",
    "cn": "“我们的竞争方式，态度，勇气，我们在比赛中强加给自己的方式，我们展示的打破他们的质量，这是非常困难的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "outcome": {
    "en": "If this award helps spark more curiosity about this sort of question, then that’s a pretty wonderful outcome.”",
    "cn": "如果这个奖项有助于激发人们对这类问题的好奇心，那么这是一个非常好的结果。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "overall": {
    "en": "“Everyone’s obsessed with shiny, glossy-looking hair this season, which can make color look better and hair healthier overall,” she explains.",
    "cn": "她解释说：“这个季节每个人都痴迷于有光泽、有光泽的头发，这可以让头发的颜色看起来更好，整体上更健康。",
    "src": "Cosmopolitan · 2026-09-09"
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
    "en": "Outside of fashion, he enjoys interior design, tennis (both watching and playing), and a jam-packed antique store.",
    "cn": "除了时尚之外，他还喜欢室内设计、网球（观看比赛）和一家拥挤的古董店。",
    "src": "ELLE · 2026-09-09"
  },
  "output": {
    "en": "That output was part of a production boom in a country that's been the dominant hub of film and television production in the Balkan region since the break-up of the former Yugoslavia.",
    "cn": "自前南斯拉夫解体以来，这个国家一直是巴尔干地区电影和电视制作的主要中心，这些产出是该国制作繁荣的一部分。",
    "src": "Variety · 2026-09-10"
  },
  "outline": {
    "en": "Below, Kalnina outlines the leading trends to note for the season.",
    "cn": "下面，Kalnina概述了本季的主要趋势。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "outstanding": {
    "en": "Seeing ‘The Floor’ return so quickly is a fantastic endorsement of the format’s universal appeal and a testament to the outstanding collaboration with Nippon TV.”",
    "cn": "看到《地板》如此迅速地回归，是对该格式的普遍吸引力的绝佳认可，也是与日本电视台出色合作的证明。",
    "src": "Variety · 2026-09-10"
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
    "en": "Toronto is the first major international platform where we are opening that conversation.”",
    "cn": "多伦多是我们开启这一对话的第一个主要国际平台。",
    "src": "Variety · 2026-09-10"
  },
  "operate": {
    "en": "Later Wednesday, the U.S. military's Southern Command (SOUTHCOM) said American forces executed a \"lethal kinetic strike on a go-fast vessel operating along established narco-trafficking routes in the Caribbean.\"",
    "cn": "星期三晚些时候，美军南方司令部说，美军“对一艘在加勒比地区沿既定毒品走私路线行驶的快速船只进行了致命的动力打击”。",
    "src": "CBS News · 2026-09-10"
  },
  "operation": {
    "en": "Dhingra brings more than two decades of producing experience to Jungle Book Studio’s sales operation.",
    "cn": "丁格拉为《奇幻森林》工作室的销售运营带来了20多年的制作经验。",
    "src": "Variety · 2026-09-10"
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
  "oppose": {
    "en": "The president and members of both parties, including Fetterman, had initially opposed Nippon's efforts to buy the iconic Pittsburgh-based steelmaker, but Mr. Trump ultimately signed off on an agreement that he argued would result in tens of billions in new investments in U.S. Steel and grant the federal government a \"golden share\" in the company.",
    "cn": "总统和包括Fetterman在内的双方成员最初反对日本收购这家总部位于匹兹堡的标志性钢铁制造商的努力，但特朗普最终签署了一项协议，他认为该协议将导致对美国钢铁公司进行数百亿美元的新投资，并授予联邦政府该公司的“黄金份额”。",
    "src": "CBS News · 2026-09-10"
  },
  "opposite": {
    "en": "Its opposite was a “skeleton” dress made of different styles of slips made of over-locked tulle in different, transparent colors.",
    "cn": "与之相对的是一种“骨架”连衣裙，由不同风格的裙摆制成，裙摆由不同颜色的透明薄纱制成。",
    "src": "Vogue · 2026-09-10"
  },
  "ordinary": {
    "en": "I wanted him to stand for all the ordinary people who actually rose up and paid the price for it.”",
    "cn": "我希望他能代表所有真正站起来为此付出代价的普通人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "order": {
    "en": "The international soccer organization reversed the red card suspension, though Mr. Trump said he didn't order FIFA to do so.",
    "cn": "国际足球组织撤销了红牌停赛，尽管特朗普表示他没有命令国际足联这样做。",
    "src": "CBS News · 2026-09-10"
  },
  "organization": {
    "en": "She joins the BFC — a non-profit organization funded via government support, patronage, and member fees — during a transition spearheaded by CEO Laura Weir.",
    "cn": "她在首席执行官劳拉·威尔的领导下过渡期间加入了BFC——一个由政府支持、赞助和会员费资助的非营利组织。",
    "src": "Vogue · 2026-09-10"
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
  "orbit": {
    "en": "While attempting to navigate the estate's unforgiving world alongside his cousin Caleb (played by Khan), Younger is drawn into the orbit of local drug lord Anton (played by Bokinni).",
    "cn": "在试图与他的堂兄Caleb （由Khan扮演）一起在庄园的无情世界中航行时，Younger被吸引到当地毒枭Anton （由Bokinni扮演）的轨道上。",
    "src": "Variety · 2026-09-10"
  },
  "overseas": {
    "en": "Fresh off his return from a deployment in Poland, Army Reserve Capt. Cody Khork was eager to find another assignment overseas with his fiancée.",
    "cn": "陆军预备役上尉科迪·霍克（Cody Khork）刚从波兰的部署中回来，就渴望与未婚妻一起在海外找到另一项任务。",
    "src": "CBS News · 2026-09-10"
  },
  "pink": {
    "en": "From spicy copper to pop star pink to maple cream blonde, fall’s biggest hair colors are right around the corner.",
    "cn": "从辣铜色到流行粉色再到枫奶油金色，秋天最流行的发色即将到来。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "pipeline": {
    "en": "“K2 is about creating a pipeline rather than chasing individual projects,” said Guliani.",
    "cn": "“K2是关于建立管道，而不是追逐单个项目，”古利亚尼说。",
    "src": "Variety · 2026-09-10"
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
  "plane": {
    "en": "But then the second plane hit while the news was still on air, and the five-minute newscast grew longer, and longer.",
    "cn": "但是，当新闻还在播出时，第二架飞机坠毁了，五分钟的新闻广播变得越来越长。",
    "src": "Vogue · 2026-09-10"
  },
  "please": {
    "en": "Now, when it comes to relationships, I prefer my lines considerably clearer (no situationships for me, please).",
    "cn": "现在，当涉及到人际关系时，我更喜欢我的线条清晰得多（请不要给我任何情况）。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "plate": {
    "en": "Designed in London and handmade in Italy from 24K gold plate, the collection pairs sculptural shapes with clever details designed to offer multiple ways to wear each piece.",
    "cn": "该系列在伦敦设计，在意大利手工制作，采用24K金板材，将雕塑形状与巧妙的细节搭配在一起，为每件作品提供多种佩戴方式。",
    "src": "ELLE · 2026-09-09"
  },
  "plastic": {
    "en": "Ahead, we spoke with a dermatologist and two plastic surgeons to separate fact from fiction.",
    "cn": "在此之前，我们采访了一位皮肤科医生和两位整形外科医生，以区分事实和虚构。",
    "src": "ELLE · 2026-09-09"
  },
  "plant": {
    "en": "Plant-derived exosome-like vesicles are easier to produce consistently and carry no risk of human pathogen transmission.",
    "cn": "植物来源的外泌体样囊泡更容易持续生产，并且没有人类病原体传播的风险。",
    "src": "ELLE · 2026-09-09"
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
  "philosophy": {
    "en": "“K2 is about building a new ecosystem where artists can own the worlds they create, where technology amplifies rather than replaces imagination, and where culturally authentic stories rooted in science, philosophy and human experience can travel beyond borders,” he said.",
    "cn": "他说：“K2是关于建立一个新的生态系统，在这个生态系统中，艺术家可以拥有他们创造的世界，技术可以放大而不是取代想象力，根植于科学、哲学和人类经验的文化真实故事可以跨越国界。",
    "src": "Variety · 2026-09-10"
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
    "en": "They’ll also analyze genetic material in the skulls and teeth to determine genders and species, and attempt to discern the teeth owners’ diets through analysis of wear patterns and levels of strontium, carbon and nitrogen isotopes in the enamel.",
    "cn": "他们还将分析头骨和牙齿中的遗传物质，以确定性别和物种，并试图通过分析牙釉质中的磨损模式和锶、碳和氮同位素水平来辨别牙齿主人的饮食。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "own": {
    "en": "But it previously did seem like teams had begun to realise that dribbling skill isn't worth much on its own.",
    "cn": "但以前，球队确实开始意识到，单靠过人技巧本身价值有限。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "ownership": {
    "en": "“We want to build a portfolio of IP where creativity, ownership, capital and global market access work together.",
    "cn": "“我们希望建立一个知识产权组合，将创造力、所有权、资本和全球市场准入结合在一起。",
    "src": "Variety · 2026-09-10"
  },
  "physical": {
    "en": "Material culture describes physical objects and resources such as tools, clothing, toys and furniture that a group creates, uses and leaves behind to define its way of life.",
    "cn": "物质文化描述了一个群体创造、使用和留下的物理对象和资源，如工具、服装、玩具和家具，以定义其生活方式。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "pile": {
    "en": "This suggests the giant creatures incubated their eggs using a technique shared by modern crocodiles—using piles of rotting vegetation for heat.",
    "cn": "这表明巨型生物使用现代鳄鱼共用的技术孵化卵子-使用成堆的腐烂植被来加热。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "piece": {
    "en": "Non-standard sizes allow the wearer to adjust them as they want; some pieces can be worn front-to back.",
    "cn": "非标准尺码允许穿着者根据自己的需要进行调整；有些衣服可以前后穿。",
    "src": "Vogue · 2026-09-10"
  },
  "picture": {
    "en": "Teenagers and retirees alike broadcast before-and-after pictures and trade their “ stacks,” or custom combinations of peptides, like recipes.",
    "cn": "青少年和退休人员都会播放之前和之后的图片，并交换他们的“堆栈”，或肽的定制组合，如食谱。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "pick": {
    "en": "In this pick-and-mix collection, it functioned like an eye-opening sour candy.",
    "cn": "在这个精选混合系列中，它就像一个大开眼界的酸糖。",
    "src": "Vogue · 2026-09-10"
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
  "network": {
    "en": "At Dreamkite, Wachholz will \"shape the studio's core creative and aesthetic vision and develop ambitious original projects together with its international network of AI filmmakers and creative talent,\" the company said.",
    "cn": "该公司表示，在Dreamkite，Wachholz将“塑造工作室的核心创意和美学愿景，并与AI电影制作人和创意人才的国际网络一起开发雄心勃勃的原创项目”。",
    "src": "Variety · 2026-09-10"
  },
  "neutral": {
    "en": "Ask any fan of clean girl beauty—there are subtle differences to each and every trending neutral manicure, from soap nails to princess nails, glass manicure, and beyond.",
    "cn": "问任何一个喜欢干净女孩美的人——每一种流行的中性美甲都有细微的区别，从肥皂指甲到公主指甲，玻璃指甲等等。",
    "src": "Vogue · 2026-09-10"
  },
  "never": {
    "en": "It’s about never compromising, and I think this is the ultimate in luxury—from the juice to how unique it is.",
    "cn": "这是关于永不妥协，我认为这是奢侈品的终极——从果汁到它的独特之处。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "new": {
    "en": "Every Premier League club has been given at least 60 hours between their Christmas and New Year fixtures.",
    "cn": "每家英超俱乐部在圣诞和新年赛程之间至少有60个小时的休息时间。",
    "src": "Sky Sports · 2026-09-10"
  },
  "news": {
    "en": "Follow Sky Sports on WhatsApp for the latest sports news, videos, features, analysis and much more",
    "cn": "在WhatsApp上关注天空体育，获取最新的体育新闻、视频、功能、分析等",
    "src": "Sky Sports · 2026-09-09"
  },
  "newspaper": {
    "en": "Paper Talk is a review of the sports headlines from the national newspapers, every Monday to Friday, live on Sky Sports News from 10.30pm.",
    "cn": "Paper Talk是每周一至周五晚上10:30在天空体育新闻直播的全国性报纸的体育头条评论。",
    "src": "Sky Sports · 2026-09-09"
  },
  "next": {
    "en": "Maybe Chelsea will need to actually recruit more players as they move on through the next year or two with Alonso.",
    "cn": "也许切尔西真的需要在阿隆索麾下继续前行的一两年里，再引进更多球员。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "nice": {
    "en": "“Gold, honey, and caramel tones are a nice way to tone down brighter, cooler blondes while still staying blonde into the fall.”",
    "cn": "“金色、蜂蜜色和焦糖色都是让金发更亮、更酷的好方法，同时在秋天也能保持金发。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "noise": {
    "en": "When scouting a player, there's a lot of noise behind the conversion of shots into goals and passes into goals.",
    "cn": "在球探评估球员时，射门转化为进球、传球转化为进球的过程充满干扰。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "nod": {
    "en": "From ’90s curls to protection plaits, the sequel’s glam is full of nods to the original.",
    "cn": "从90年代的卷发到护发辫，续集的魅力充满了对第一部的致敬。",
    "src": "ELLE · 2026-09-09"
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
    "en": "Many candidates likely also want access to the president's nine-figure super PAC war chest.",
    "cn": "许多候选人可能也希望获得总统九位数的超级PAC战争基金。",
    "src": "CBS News · 2026-09-10"
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
  "nail": {
    "en": "When it comes to trends, short nails are not exempt from fleeting patterns and coveted fall colors.",
    "cn": "说到流行趋势，短指甲也不能幸免于转瞬即逝的图案和令人垂涎的秋天颜色。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "name": {
    "en": "Instead, he wanted to focus on “someone history never named at all: a farmer, the first man to raise his hand in Essex.",
    "cn": "相反，他想专注于“一个从未命名过的历史人物：一个农民，第一个在埃塞克斯举手的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "nation": {
    "en": "Either way, this time round, I promise not to let down the whole nation right at the very end.",
    "cn": "无论如何，这一次，我保证不会在最后一刻让整个国家失望。",
    "src": "Variety · 2026-09-10"
  },
  "national": {
    "en": "The necklace is a unique archaeological find, Gralak tells National Geographic Poland ’s Joanna Lamparska.",
    "cn": "Gralak告诉国家地理波兰的Joanna Lamparska ，这条项链是一个独特的考古发现。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "native": {
    "en": "PROJECTS IN DEVELOPMENT Dreamkite launches with a slate of original AI-native and hybrid projects currently in development.",
    "cn": "Dreamkite推出了一系列目前正在开发的原始ai原生和混合项目。",
    "src": "Variety · 2026-09-10"
  },
  "natural": {
    "en": "As the leaves turn, it only feels natural to coat your tips in shades of gold, amber, and brown.",
    "cn": "随着树叶的转动，你的指尖自然而然地涂上金色、琥珀色和棕色。",
    "src": "Who What Wear · 2026-09-10"
  },
  "nature": {
    "en": "\"The intent was to make an entertaining genre film that explores the cyclical nature of history and the individual’s role inside it.\"",
    "cn": "“目的是制作一部有趣的流派电影，探索历史的周期性和个人在其中的角色。",
    "src": "Variety · 2026-09-10"
  },
  "naughty": {
    "en": "I'm personally partial to this smoky brown moment above from celebrity manicurist Iram Shelton, who simply used OPI's Hot Toddy Naughty",
    "cn": "我个人偏爱上面这张由名人美甲师伊拉姆·谢尔顿（Iram Shelton）制作的烟熏棕色，他只是用了OPI的Hot Toddy Naughty",
    "src": "Who What Wear · 2026-09-10"
  },
  "need": {
    "en": "It needs people who understand how to turn creativity into sustainable businesses and institutions.",
    "cn": "它需要懂得如何将创造力转化为可持续发展的企业和机构的人。",
    "src": "Vogue · 2026-09-10"
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
  "necessary": {
    "en": "Just a small amount is necessary so it should last a long time.",
    "cn": "只需要少量，所以应该能持续很长时间。",
    "src": "ELLE · 2026-09-10"
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
  "navy": {
    "en": "He also works on branded content initiatives, with brands including Gucci, Nordstrom, Sunglass Hut, Cartier, and Old Navy.",
    "cn": "他还参与品牌内容项目，合作品牌包括Gucci、Nordstrom、Sunglass Hut、Cartier和Old Navy。",
    "src": "Who What Wear · 2026-09-10"
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
    "en": "There's obviously an abundance of gorgeous knits, including cashmere and quarter-zip ups.",
    "cn": "显然，这里有大量华丽的针织衫，包括羊绒和四分之一拉链。",
    "src": "Who What Wear · 2026-09-10"
  },
  "occasion": {
    "en": "But this season, Monique Lhuillier—who is adept at occasion dressing—was up to the challenge.",
    "cn": "但这一季，擅长场合着装的Monique lhuillier迎接了挑战。",
    "src": "Vogue · 2026-09-10"
  },
  "occasional": {
    "en": "“The structure may provide an occasional nursery area for coastal fish, support cephalopod reproduction and function as a temporary resting site for severely endangered marine mammals,” the researchers write in the paper.",
    "cn": "研究人员在论文中写道：“该结构可能为沿海鱼类提供偶尔的育苗区，支持头足类繁殖，并作为严重濒危海洋哺乳动物的临时休息场所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "occur": {
    "en": "\"When you're conducting a joint operation in territorial waters, you have to reach an understanding as to how those operations are going to occur,\" he said.",
    "cn": "“当你在领海进行联合行动时，你必须就这些行动将如何进行达成谅解，”他说。",
    "src": "CBS News · 2026-09-10"
  },
  "ocean": {
    "en": "On her lids, Westman pulled shades from two Eye Color Quads: 4 Ocean Sunrise and 8 Warm Ocean Sunset.",
    "cn": "在她的眼睑上，韦斯特曼用了两种颜色的眼影：4海洋日出和8温暖海洋日落。",
    "src": "ELLE · 2026-09-09"
  },
  "october": {
    "en": "Broadcast selections for November and early December will be announced before October 19.",
    "cn": "11月和12月初的选播名单将在19日之前公布。",
    "src": "Sky Sports · 2026-09-10"
  },
  "old": {
    "en": "But 29-year-old Alisha Boe, star of Apple TV’s The Buccaneers, absolutely knows how to party.",
    "cn": "但是29岁的阿丽莎·波伊，苹果电视节目《海盗》的明星，绝对知道如何开派对。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "oil": {
    "en": "Key ingredients like biotin, keratin, and chia seed oil reduce frizz, thicken hair, and strengthen your ends.",
    "cn": "生物素、角蛋白和奇亚籽油等关键成分可以减少毛躁，使头发更浓密，并强健发梢。",
    "src": "ELLE · 2026-09-10"
  },
  "often": {
    "en": "It’s a dark and sultry gourmand, often photographed with leather jackets and glossy lips.",
    "cn": "这是一个黑暗而闷热的美食家，经常穿着皮夹克和光滑的嘴唇拍照。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "office": {
    "en": "We see it as a stand-alone franchise now, so I’m glad to hear that it’s gone down well in the office.",
    "cn": "我们现在将其视为一款独立游戏，所以我很高兴听到它在办公室取得了成功。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "offer": {
    "en": "Luckily, all our favorite retailers from Zara to Reformation have been quick to offer their takes on the trend.",
    "cn": "幸运的是，从Zara到Reformation，所有我们喜欢的零售商都迅速对这一趋势发表了自己的看法。",
    "src": "Who What Wear · 2026-09-10"
  },
  "officer": {
    "en": "Taher formerly served as chief marketing officer of Wio Bank, the UAE’s first digital-only bank, as well as VP of marketing, brand and sponsorships at Etihad Airways.",
    "cn": "Taher曾担任阿联酋首家纯数字银行Wio Bank的首席营销官，以及阿提哈德航空营销、品牌和赞助副总裁。",
    "src": "Vogue · 2026-09-10"
  },
  "observation": {
    "en": "Yet as O’Neil logged 64 hours of field observations, the activity transformed into a family pastime.",
    "cn": "然而，随着奥尼尔记录了64个小时的实地观察，这项活动变成了一项家庭消遣。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "november": {
    "en": "His decision has added further confusion about which boundaries will be used in November.",
    "cn": "他的决定进一步混淆了11月将使用哪些边界。",
    "src": "CBS News · 2026-09-10"
  },
  "novel": {
    "en": "Running mostly from left to right, it tells the story in the style of a graphic novel across a central frieze, with short Latin captions.",
    "cn": "它主要从左到右，用图画小说的风格在中间的楣边讲述故事，配上简短的拉丁文字说明。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "notice": {
    "en": "You'll also notice cool jackets, trousers to dress up or down, and cute tees.",
    "cn": "你还会注意到很酷的夹克、穿搭或穿搭的裤子和可爱的t恤。",
    "src": "Who What Wear · 2026-09-10"
  },
  "nothing": {
    "en": "His team would feed him the ball, he'd keep beating his man, and then the cross would inevitably lead to nothing.",
    "cn": "队友不断给他喂球，他一次次过掉对手，最后这脚传中却总是毫无结果。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "now": {
    "en": "We see it as a stand-alone franchise now, so I’m glad to hear that it’s gone down well in the office.",
    "cn": "我们现在将其视为一款独立游戏，所以我很高兴听到它在办公室取得了成功。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "not": {
    "en": "If I don’t have to spend as much time in the chair, then why not reimagine my color for the cooler weather?",
    "cn": "如果我不必花那么多时间坐在椅子上，那么为什么不重新想象一下我的颜色，以适应凉爽的天气呢？",
    "src": "Cosmopolitan · 2026-09-09"
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
  "north": {
    "en": "The report announced that a “light aircraft” had crashed into the North Tower, unexpected because visibility was so good.",
    "cn": "报告称，一架“轻型飞机”撞上了北塔，由于能见度非常好，这是出乎意料的。",
    "src": "Vogue · 2026-09-10"
  },
  "note": {
    "en": "\"Spring 2027 is an irreverent take on romance that creates a new elegance,\" Lauren stated in the show notes.",
    "cn": "“2027年春季是对浪漫的不敬，创造了一种新的优雅，”劳伦在节目说明中说。",
    "src": "Who What Wear · 2026-09-10"
  },
  "once": {
    "en": "Each was drilled through at the root, and their arrangement suggests they were once strung together on a now-decayed rope.",
    "cn": "每个人都在根部钻孔，他们的安排表明他们曾经被一根现在腐烂的绳子串在一起。",
    "src": "Smithsonian Magazine · 2026-09-09"
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
  "nylon": {
    "en": "And for when that rain finally passes and the sun begins to shine, there will be plenty of gingham skirts and nylon dresses.",
    "cn": "因为当雨终于过去，太阳开始照耀时，将会有很多格子裙和尼龙裙。",
    "src": "Vogue · 2026-09-10"
  },
  "nursery": {
    "en": "“The structure may provide an occasional nursery area for coastal fish, support cephalopod reproduction and function as a temporary resting site for severely endangered marine mammals,” the researchers write in the paper.",
    "cn": "研究人员在论文中写道：“该结构可能为沿海鱼类提供偶尔的育苗区，支持头足类繁殖，并作为严重濒危海洋哺乳动物的临时休息场所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "numerous": {
    "en": "Of course, numerous brands have reinterpreted the two-tone shoe over the last several decades.",
    "cn": "当然，在过去的几十年里，许多品牌重新诠释了双色鞋。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "number": {
    "en": "Bond Girl-worthy creations included a slinky, gold-sequin number with an asymmetric knotted tie.",
    "cn": "邦女郎风格的设计包括一件紧身的金色亮片礼服，搭配一条不对称的打结领带。",
    "src": "Vogue · 2026-09-10"
  },
  "schedule": {
    "en": "Still, more than two dozen are scheduled to speak at the event, according to the RNC.",
    "cn": "尽管如此，据共和党全国委员会称，仍有20多人计划在这次活动上发言。",
    "src": "CBS News · 2026-09-09"
  },
  "scheme": {
    "en": "She also sits on the board for the King’s Trust, a vocational scheme for disadvantaged young people, and the Old Vic, a non-profit theater in London.",
    "cn": "她还是国王信托基金（一个针对弱势年轻人的职业计划）和老维克剧院（一个位于伦敦的非营利性剧院）的董事会成员。",
    "src": "Vogue · 2026-09-10"
  },
  "tremendous": {
    "en": "Mr. Trump argued the payments would be a consequence of the country's \"tremendous economic success,\" and suggested they could be funded partially by his administration's tariffs on foreign goods.",
    "cn": "特朗普认为，这些付款将是该国“巨大经济成功”的结果，并暗示这些付款可以部分由其政府对外国商品征收的关税提供资金。",
    "src": "CBS News · 2026-09-10"
  },
  "trend": {
    "en": "If you’re in the know about beauty trends, you’ve likely heard plenty about exosomes over the past few years.",
    "cn": "如果你对美容趋势有所了解，那么在过去的几年里，你可能听说过很多关于外泌体的事情。",
    "src": "ELLE · 2026-09-09"
  },
  "trial": {
    "en": "There is at least one randomized controlled trial of a plant extract exosome formulation showing a real increase in hair counts, but the signaling overlap with human follicle biology is less well characterized.”",
    "cn": "至少有一项植物提取物外泌体配方的随机对照试验显示，毛发数量确实增加了，但与人类毛囊生物学的信号重叠却没有得到很好的表征。",
    "src": "ELLE · 2026-09-09"
  },
  "trim": {
    "en": "Clooney became the latest celebrity to embrace the natural-manicure trend yesterday, showcasing a set of freshly trimmed, milky-pink nails while sailing into the destination.",
    "cn": "克鲁尼昨天成为最新一个拥抱自然美甲潮流的名人，他在前往目的地时展示了一组刚修剪过的乳白色指甲。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "trip": {
    "en": "“While Portofino ’97 is all about falling in love and the rush of infatuation, Hotel Portofino is inspired by the same trip [David and I took] in 1997, but this is a new chapter about staying in love and the deeper echo of enduring love,” she tells Bazaar of her newest extrait fragrance in the Victoria Beckham Beauty lineup, Hotel Portofino extrait perfume.",
    "cn": "“虽然97年的波托菲诺是关于坠入爱河和迷恋的，但波托菲诺酒店的灵感来自于1997年（大卫和我）的同一次旅行，但这是一个关于保持爱和持久爱的更深回声的新篇章，”她告诉芭莎，她在维多利亚·贝克汉姆美容系列中最新的高级香水，波托菲诺酒店香水。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "troop": {
    "en": "On March 1, one day into the Iran war, an Iranian Shahed drone struck Khork's position, killing him and five other American troops.",
    "cn": "3月1日，伊朗战争开始的第一天，一架伊朗Shahed无人机袭击了霍克的阵地，杀死了他和其他五名美国士兵。",
    "src": "CBS News · 2026-09-10"
  },
  "tropical": {
    "en": "“The makeup is inspired by rolling around in the sheets with a lover in the south of Europe or a tropical place,” he says.",
    "cn": "他说：“这款化妆品的灵感来自与南欧或热带地区的恋人在床单上打滚。",
    "src": "ELLE · 2026-09-09"
  },
  "trousers": {
    "en": "Trousers were draped with ease, many of them worn with cummerbunds and fringed scarves affixed low on the waist.",
    "cn": "裤子披得很轻松，其中许多都穿着腰部较低的cummerbunds和流苏围巾。",
    "src": "ELLE · 2026-09-09"
  },
  "true": {
    "en": "It's True: These 10 End-of-Summer Nail Colors Scream \"I Have Impeccable Taste\"",
    "cn": "这是真的：这10种夏末指甲颜色表明“我的品味无可挑剔”",
    "src": "Who What Wear · 2026-09-10"
  },
  "tumble": {
    "en": "'Spritz and tumble' laundering rumples full-skirted dresses.",
    "cn": "“喷淋和翻滚”洗涤会弄皱长裙。",
    "src": "Who What Wear · 2026-09-10"
  },
  "tuesday": {
    "en": "Hanaway's request for the U.S. Supreme Court to step in was rejected by Kavanaugh on Tuesday.",
    "cn": "Hanaway要求美国最高法院介入的请求周二被Kavanaugh拒绝。",
    "src": "CBS News · 2026-09-10"
  },
  "try": {
    "en": "If noir nails veer too gothic, try an ultra-deep adjacent shade for a rich color that looks sophisticated and glossy.",
    "cn": "如果黑色指甲太过哥特式，那就试试超深的相邻色调，这样颜色会显得丰富而有光泽。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "truth": {
    "en": "Stories are humanity's way of capturing reality, creating truth and generating meaning.",
    "cn": "故事是人类捕捉现实、创造真理和产生意义的一种方式。",
    "src": "Variety · 2026-09-10"
  },
  "trust": {
    "en": "Working with the University of Greenwich in the UK, it took Amandeep some years to gain their trust, permission and pull the money together in order for the museum to eventually photograph every single one of the 26,000 pages.",
    "cn": "阿曼迪普与英国格林威治大学（University of Greenwich）合作，花了数年时间才获得他们的信任、许可，并筹集了资金，最终博物馆才能拍摄2.6万页的每一页。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "truly": {
    "en": "\"It's about ways of dressing that celebrate ingenuity, originality, and character—the freedom and fun of creating a style that is truly personal.\"",
    "cn": "“这是一种庆祝独创性、独创性和个性的着装方式——创造真正个人风格的自由和乐趣。",
    "src": "Who What Wear · 2026-09-10"
  },
  "tree": {
    "en": "Two depict variations of clowns and skulls, while the third is a coastal landscape with a low-hanging moon and red trees beside open water.",
    "cn": "两幅描绘了小丑和头骨的变体，而第三幅是沿海景观，在开阔的水域旁边有一个低垂的月亮和红色的树木。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "treatment": {
    "en": "Ingredients like camellia japonica seed oil, argan oil, and kelp extract make UNOVE’s Ampule Treatment especially great for rehydrating and repairing thick, coarse, and damaged hair.",
    "cn": "山茶花籽油、摩洛哥坚果油和海带提取物等成分使UNOVE的安珀护理产品特别适合滋润和修复浓密、粗糙和受损的头发。",
    "src": "ELLE · 2026-09-09"
  },
  "track": {
    "en": "Due October 16 via A24 Music, the 10-track self-produced record follows Stel’s 2024 debut EP, Object Permanence, and this year’s How to Win At Solitaire.",
    "cn": "这张10首曲目的自制专辑将于10月16日通过A24 Music发行，继斯泰尔2024年的首张EP《Object Permanence》和今年的《How to Win At Solitaire》之后。",
    "src": "Vogue · 2026-09-10"
  },
  "trade": {
    "en": "The president continued: \"It's not going to go down as the greatest trade in the history of sports.",
    "cn": "总统继续说道：“它不会成为体育史上最伟大的贸易。",
    "src": "CBS News · 2026-09-10"
  },
  "traditional": {
    "en": "For Martinović, that period has witnessed a transition at Telekom Srbija from a \"traditional ecosystem\" for film and TV content to \"a very open-minded and sophisticated regional production ecosystem in the last eight or nine years.\"",
    "cn": "在martinoviki看来，这段时间见证了Srbija电信从“传统的电影和电视内容生态系统”向“一个非常开放和成熟的区域生产生态系统”的转变。",
    "src": "Variety · 2026-09-10"
  },
  "train": {
    "en": "When you’re decked out in full sequins or a sweeping train, it hardly conveys the idea of effortless chic.",
    "cn": "当你穿着亮片或拖地长裙时，很难传达出毫不费力的时髦。",
    "src": "Vogue · 2026-09-10"
  },
  "traitor": {
    "en": "Nick Mohammed will play the host in “ The Traitors – Acts of Betrayal,” the West End stage adaptation of the hit competition format, after a video in which Claudia Winkleman swore him in to the role, producers Studio Lambert and Neal Street Productions have revealed.",
    "cn": "兰伯特工作室和尼尔街制作公司透露，尼克·穆罕默德将在《叛徒-背叛行为》中扮演主持人，这是伦敦西区舞台上改编的热门比赛形式，克劳迪娅·温克尔曼在一段视频中宣誓让他出演这个角色。",
    "src": "Variety · 2026-09-10"
  },
  "transfer": {
    "en": "Crystal Palace transfers, latest news, rumours and gossip: Live updates, goals and highlights",
    "cn": "水晶宫转会，最新消息，谣言和八卦：实时更新，进球和亮点",
    "src": "Sky Sports · 2026-09-10"
  },
  "transform": {
    "en": "Detachable pendant earrings can be transformed into three different styles.",
    "cn": "可拆卸的吊坠耳环可以变成三种不同的风格。",
    "src": "ELLE · 2026-09-09"
  },
  "transformation": {
    "en": "Experts say the peptide boom offers a window into a larger transformation in American health care: a shift from a market driven by diagnoses to one driven by demand, in which medicine is increasingly viewed as a consumer good—an Amazon-like product delivered to your doorstep.",
    "cn": "专家表示，多肽繁荣为美国医疗保健行业的更大转型提供了一个窗口：从由诊断驱动的市场转向由需求驱动的市场，在这个市场中，医药越来越被视为一种消费品--一种类似亚马逊的产品，送货上门。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "treat": {
    "en": "Two people were hospitalized with burns to their legs on Tuesday, while six others were treated for smoke inhalation.",
    "cn": "周二，两人因腿部烧伤住院，另有六人因吸入烟雾而接受治疗。",
    "src": "ABC News · 2026-09-09"
  },
  "treasure": {
    "en": "One of the medieval world’s greatest surviving treasures is now on display in London.",
    "cn": "中世纪世界现存最伟大的宝藏之一现在正在伦敦展出。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "travel": {
    "en": "Previous to working in fashion, Judith worked as a TV host on the PBS travel show Globe Trekker (airing on Netflix and Amazon Prime) sharing her passion for travel and culture.",
    "cn": "在从事时尚工作之前，朱迪思曾在美国公共广播公司（PBS）的旅游节目《环球旅行者》（Globe Trekker）中担任电视主持人（在Netflix和亚马逊Prime上播出），分享她对旅游和文化的热情。",
    "src": "Who What Wear · 2026-09-10"
  },
  "trap": {
    "en": "“‘Skag & Bone' is a deeply human coming-of-age story trapped inside a relentless urban nightmare,\" Boru said.",
    "cn": "“《Skag & Bone》是一个深刻的人类成长故事，被困在无情的城市噩梦中，”博鲁说。",
    "src": "Variety · 2026-09-10"
  },
  "transparent": {
    "en": "Its opposite was a “skeleton” dress made of different styles of slips made of over-locked tulle in different, transparent colors.",
    "cn": "与之相对的是一种“骨架”连衣裙，由不同风格的裙摆制成，裙摆由不同颜色的透明薄纱制成。",
    "src": "Vogue · 2026-09-10"
  },
  "transmission": {
    "en": "Plant-derived exosome-like vesicles are easier to produce consistently and carry no risk of human pathogen transmission.",
    "cn": "植物来源的外泌体样囊泡更容易持续生产，并且没有人类病原体传播的风险。",
    "src": "ELLE · 2026-09-09"
  },
  "translation": {
    "en": "Although Robert Ressler, an FBI investigator, is largely credited with having coined the term \"serial killer,\" Ernst Gennat of the Berlin Criminal Police used the German translation, \" serienm&ouml;rder,\" in a 1930 article.",
    "cn": "尽管联邦调查局调查员罗伯特·雷斯勒（Robert Ressler）在很大程度上创造了“连环杀手”一词，但柏林刑事警察局的恩斯特·根纳特（Ernst Gennat）在1930年的一篇文章中使用了德语翻译“serienmörder”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "translate": {
    "en": "So how does that translate into our own wardrobes?",
    "cn": "那么这又如何影响我们自己的着装呢？",
    "src": "Who What Wear · 2026-09-10"
  },
  "turbulent": {
    "en": "Its themes—of turbulent relationships and meandering life paths, toxic patterns and the euphoria found in everyday moments—are expressed with diaristic intimacy.",
    "cn": "它的主题——动荡的人际关系和曲折的人生道路，有毒的模式和在日常生活中发现的欣快感——通过日记式的亲密表达出来。",
    "src": "Vogue · 2026-09-10"
  },
  "turn": {
    "en": "Depending on where you look and when, crosses get turned into goals somewhere between 1% and 3% of the time.",
    "cn": "无论你参考哪个数据、哪段时间，传中转化为进球的比例都只有 1% 到 3%。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "understand": {
    "en": "It needs people who understand how to turn creativity into sustainable businesses and institutions.",
    "cn": "它需要懂得如何将创造力转化为可持续发展的企业和机构的人。",
    "src": "Vogue · 2026-09-10"
  },
  "understanding": {
    "en": "Alongside the Tapestry itself, visitors can explore a range of digital elements designed to enhance understanding and engagement.",
    "cn": "除了挂毯本身，游客还可以探索一系列旨在增强理解和参与的数字元素。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "undertake": {
    "en": "\"Producing the film was an enormous undertaking, but also proof that genre cinema of this scale can come from this part of Europe,\" he said.",
    "cn": "他说：“制作这部电影是一项艰巨的任务，但也证明了这种规模的流派电影可以来自欧洲的这一部分。",
    "src": "Variety · 2026-09-10"
  },
  "undertaking": {
    "en": "Winning work highlighted during the 36th annual award ceremony included hilarious research on the aerodynamics of nose blowing, gently stepping on venomous snakes, confirming that teenagers do indeed smell worse than babies and other side-splitting scientific undertakings.",
    "cn": "第36届年度颁奖典礼上突出的获奖作品包括关于吹鼻子的空气动力学的热闹研究，轻轻踩在毒蛇身上，证实青少年确实比婴儿更难闻，以及其他侧面分裂的科学事业。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "undoubtedly": {
    "en": "“I think our fragrances are very unique, interesting, and undoubtedly ours; there’s a strangeness that is very on brand—it’s almost addictive, as well,” Beckham says.",
    "cn": "“我认为我们的香水非常独特、有趣，毫无疑问是我们的；有一种与品牌密切相关的陌生感——几乎让人上瘾，”贝克汉姆说。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "unexpected": {
    "en": "September is all about exploring color, contrast, and nature, as some of the industry’s most recognizable motifs are reimagined through unexpected materials and techniques.",
    "cn": "九月的主题是探索色彩、对比和自然，因为一些业内最知名的主题通过意想不到的材料和技术被重新想象。",
    "src": "ELLE · 2026-09-09"
  },
  "unfair": {
    "en": "Paul Greengrass’ new film stars Andrew Garfield as a fictionalized, unnamed farmer who leads a rebellion against unfair taxes and the system of serfdom",
    "cn": "保罗·格林格拉斯（Paul Greengrass）的新电影明星安德鲁·加菲尔德（Andrew Garfield）是一个虚构的、未透露姓名的农民，他领导了一场反对不公平税收和农奴制度的叛乱",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "union": {
    "en": "The population is gradually growing, but the species is still considered vulnerable by the International Union for Conservation of Nature and endangered under the Endangered Species Act.",
    "cn": "人口正在逐渐增长，但该物种仍被国际自然保护联盟视为脆弱物种，并根据《濒危物种法》濒临灭绝。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "unique": {
    "en": "“I think our fragrances are very unique, interesting, and undoubtedly ours; there’s a strangeness that is very on brand—it’s almost addictive, as well,” Beckham says.",
    "cn": "“我认为我们的香水非常独特、有趣，毫无疑问是我们的；有一种与品牌密切相关的陌生感——几乎让人上瘾，”贝克汉姆说。",
    "src": "Harper's Bazaar · 2026-09-09"
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
  "unlike": {
    "en": "Now, unlike your standard polish or gel appointment, this centuries-old Japanese technique is less about adding color and more about making your actual nails look ridiculously healthy and shiny.",
    "cn": "现在，与你的标准指甲油或凝胶预约不同，这种有几个世纪历史的日本技术不是为了增加颜色，而是为了让你的指甲看起来健康而闪亮。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "university": {
    "en": "Study co-author Michelle Szydlowski, an anthrozoologist at Miami University, notes that the ball-building behavior makes sense with raccoon biology.",
    "cn": "该研究的合著者、迈阿密大学的人类动物学家米歇尔·希德洛夫斯基（Michelle Szydlowski）指出，浣熊造球的行为在生物学上是有道理的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "universe": {
    "en": "It’s about creating universes that artists can own, audiences can inhabit, and cultures can see themselves within.”",
    "cn": "这是关于创造一个艺术家可以拥有、观众可以居住、文化可以看到自己的宇宙。",
    "src": "Variety · 2026-09-10"
  },
  "universal": {
    "en": "Her work includes projects for clients such as Axel Springer and Universal Music.",
    "cn": "她的工作包括为阿克塞尔b施普林格和环球音乐等客户提供项目。",
    "src": "Variety · 2026-09-10"
  },
  "turkey": {
    "en": "A volunteer firefighter died on Wednesday in Turkey after helping local emergency services tackle a large wildfire in the Mediterranean coastal province of Antalya, an official said.",
    "cn": "土耳其一位官员说，一名志愿消防员周三在帮助当地紧急服务部门扑灭地中海沿岸省份安塔利亚的一场大火后死亡。",
    "src": "ABC News · 2026-09-09"
  },
  "twenty": {
    "en": "Twenty-eight years after the original cult classic debuted, Sandra Bullock and Nicole Kidman have reprised their roles as Sally Owens and Gillian Owens in Practical Magic 2.",
    "cn": "这部经典电影上映28年后，桑德拉·布洛克和妮可·基德曼在《实用魔法2》中再次饰演莎莉·欧文斯和吉莉安·欧文斯。",
    "src": "ELLE · 2026-09-09"
  },
  "twice": {
    "en": "Mike Penders is called into action twice in a matter of seconds to deny Muharemovic and Aaronson with a superb double save.",
    "cn": "Mike Penders在几秒钟内两次被要求采取行动，以拒绝Muharemovic和Aaronson的精彩双扑救。",
    "src": "Sky Sports · 2026-09-09"
  },
  "twist": {
    "en": "We’ve returned to Jennifer Lopez’s 2023 wedding manicure—called the milky manicure —with a new twist.",
    "cn": "我们回到了詹妮弗·洛佩兹2023年的婚礼美甲——被称为乳白色美甲——以新的方式。",
    "src": "Vogue · 2026-09-10"
  },
  "two": {
    "en": "Dhingra brings more than two decades of producing experience to Jungle Book Studio’s sales operation.",
    "cn": "丁格拉为《奇幻森林》工作室的销售运营带来了20多年的制作经验。",
    "src": "Variety · 2026-09-10"
  },
  "type": {
    "en": "It may be 81&deg;F as I type this sentence, but hey, it's officially September, baby!",
    "cn": "当我打出这句话的时候，可能是华氏81度，但是，嘿，已经是九月了，宝贝！",
    "src": "Who What Wear · 2026-09-10"
  },
  "typical": {
    "en": "The Dallas event, at the American Airlines Center, is expected to look more like a highly produced, extended political rally headlined by Mr. Trump than a typical convention, where the party would conduct official business such as formally selecting a presidential nominee.",
    "cn": "达拉斯的这次活动在美国航空中心（American Airlines Center）举行，预计看起来更像是一场以特朗普为主角的高度制作的长篇政治集会，而不是一场典型的大会，该党将在大会上处理正式选出总统候选人等官方事务。",
    "src": "CBS News · 2026-09-09"
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
    "en": "After a debilitating stroke leaves Maria unable to work, Younger is forced to become both provider and protector.",
    "cn": "在衰弱的中风使Maria无法工作后，Younger被迫成为提供者和保护者。",
    "src": "Variety · 2026-09-10"
  },
  "ultimately": {
    "en": "It’s important when working with Jérôme [Epinette] to be very honest to create ultimately what I want and what I desire.",
    "cn": "在与Jérôme （Epinette）合作时，非常诚实地创造出我想要的和我想要的东西是很重要的。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "ultimate": {
    "en": "If so, the end panels might have shown William being crowned king of England, as that was the ultimate consequence of the Conquest.",
    "cn": "如果是这样，最后的镶板可能显示威廉被加冕为英格兰国王，因为这是征服的最终结果。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "toy": {
    "en": "Material culture describes physical objects and resources such as tools, clothing, toys and furniture that a group creates, uses and leaves behind to define its way of life.",
    "cn": "物质文化描述了一个群体创造、使用和留下的物理对象和资源，如工具、服装、玩具和家具，以定义其生活方式。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "town": {
    "en": "He told the audience he views about 35 House and Senate districts as especially crucial, and vowed to \"go to every one of those states,\" holding both in-person rallies and telephone town halls.",
    "cn": "他告诉听众，他认为大约35个众议院和参议院选区特别重要，并发誓要“去每一个州”，同时举行面对面的集会和电话市政厅。",
    "src": "CBS News · 2026-09-10"
  },
  "tower": {
    "en": "On a June day in 1381, however, rebels breached the Tower for the first and only time in its history.",
    "cn": "然而，在1381年6月的一天，叛乱分子在其历史上第一次也是唯一一次突破了这座塔。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "them": {
    "en": "Non-standard sizes allow the wearer to adjust them as they want; some pieces can be worn front-to back.",
    "cn": "非标准尺码允许穿着者根据自己的需要进行调整；有些衣服可以前后穿。",
    "src": "Vogue · 2026-09-10"
  },
  "themselves": {
    "en": "It’s about creating universes that artists can own, audiences can inhabit, and cultures can see themselves within.”",
    "cn": "这是关于创造一个艺术家可以拥有、观众可以居住、文化可以看到自己的宇宙。",
    "src": "Variety · 2026-09-10"
  },
  "then": {
    "en": "Before then – since at least the late 1720s – it was rolled out only for antiquarian and guest visitors.",
    "cn": "在此之前，至少从18世纪20年代末开始，它只对古董商和游客开放。",
    "src": "HistoryExtra · 2026-09-10"
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
    "en": "\"I think they can finish second -- third is the absolute lowest I can see Chelsea finishing,\" Neville added.",
    "cn": "内维尔补充道：「我认为他们能拿到亚军，第三将是切尔西能拿到的最低名次。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "thick": {
    "en": "After all, full, thick-looking strands start at the root, which is precisely what a growing number of over-the-counter, exosome-based hair serums claim to support.",
    "cn": "毕竟，浓密的头发是从发根开始的，而这正是越来越多的非处方、基于外泌体的头发精华液所声称的。",
    "src": "ELLE · 2026-09-09"
  },
  "thin": {
    "en": "Some people are born with it, while others experience thinning as they age due to anything from genetics and stress to hormonal changes or even over-styling.",
    "cn": "有些人天生就患有这种疾病，而另一些人则会因为遗传、压力、荷尔蒙变化甚至过度造型等因素而随着年龄的增长而变薄。",
    "src": "ELLE · 2026-09-10"
  },
  "thing": {
    "en": "Frizz is caused by a variety of different things: humidity, breakage, or just the general curl of your hair.",
    "cn": "毛躁是由各种不同的原因造成的：湿度、断裂，或者只是头发的一般卷曲。",
    "src": "ELLE · 2026-09-09"
  },
  "think": {
    "en": "If I walk into a room, and I don’t give a shit what anyone thinks about me, I’m gonna have a good time.",
    "cn": "如果我走进一个房间，我不在乎别人怎么看我，我就会玩得很开心。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "thousand": {
    "en": "There were thousands of names in the registers, mostly written in dark ink.",
    "cn": "登记簿上有成千上万的名字，大多是用深色墨水写的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "thought": {
    "en": "\"I just never thought it would happen,\" Jim Khork, Cody's father, told CBS News.",
    "cn": "“我从没想过会发生这种事，”科迪的父亲吉姆·霍克告诉CBS新闻。",
    "src": "CBS News · 2026-09-10"
  },
  "though": {
    "en": "Gacy was sentenced to death in 1980, though he spent the next 14 years appealing his sentence.",
    "cn": "盖西于1980年被判处死刑，尽管他花了接下来的14年时间对他的判决提出上诉。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "those": {
    "en": "To combat those gloomy days ahead, Rhee wanted to add a bit of color and whimsy to their closets.",
    "cn": "为了对抗那些阴郁的日子，李想给他们的衣橱增添一点色彩和奇思妙想。",
    "src": "Vogue · 2026-09-10"
  },
  "third": {
    "en": "\"I think they can finish second -- third is the absolute lowest I can see Chelsea finishing,\" Neville added.",
    "cn": "内维尔补充道：「我认为他们能拿到亚军，第三将是切尔西能拿到的最低名次。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "this": {
    "en": "Get creative with this classic style by adding a matte top coat or gold accents for a delicate, modern update.",
    "cn": "通过添加哑光面漆或金色口音来获得这种经典风格的创意，以获得精致，现代的更新。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "thread": {
    "en": "One skirt's embroidery was wrought in gesso-painted thread; the oversized sequins of another were coated to dull their shine.",
    "cn": "一条裙子的刺绣是用石膏彩绘线绣的；另一件的超大亮片被涂上了一层，以减弱它们的光泽。",
    "src": "Who What Wear · 2026-09-10"
  },
  "their": {
    "en": "Julien Loeffler and James Kermack will produce through their production company Featuristic Films.",
    "cn": "Julien Loeffler和James Kermack将通过他们的制作公司Featuristic Films进行制作。",
    "src": "Variety · 2026-09-10"
  },
  "temporary": {
    "en": "But shortly after, U.S. District Judge Stephen Clark issued a temporary restraining order in a separate challenge to Missouri's Supreme Court decision, writing that the plaintiffs faced \"irreparable harm\" otherwise because \"many Missouri voters would have to cast their general-election votes for candidates whom they had no role in nominating.\"",
    "cn": "但此后不久，美国地区法官斯蒂芬·克拉克（Stephen Clark）在对密苏里州最高法院裁决的单独质疑中发布了一项临时限制令，他写道，原告面临“不可弥补的伤害”，否则因为“许多密苏里州选民将不得不投票给他们在提名中没有角色的候选人。",
    "src": "CBS News · 2026-09-10"
  },
  "ten": {
    "en": "Here are the projects that won the ten categories of the 2026 Ig Nobel Prizes.",
    "cn": "以下是获得2026年搞笑诺贝尔奖十大奖项的项目。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "tenant": {
    "en": "At the time, all property in England legally belonged to the king, who granted lesser lords the right to lease land to tenants “in return for certain services and restrictions on their freedom,” Prescott says.",
    "cn": "当时，英格兰的所有财产在法律上都属于国王，国王授予较小的领主向租户出租土地的权利，“以换取某些服务和对其自由的限制”，普雷斯科特说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tendency": {
    "en": "But Republicans are facing down voters' historical tendency to reject the party that controls the White House in the midterms.",
    "cn": "但共和党人正在面对选民在中期选举中拒绝控制白宫的政党的历史倾向。",
    "src": "CBS News · 2026-09-10"
  },
  "tennis": {
    "en": "Outside of fashion, he enjoys interior design, tennis (both watching and playing), and a jam-packed antique store.",
    "cn": "除了时尚之外，他还喜欢室内设计、网球（观看比赛）和一家拥挤的古董店。",
    "src": "ELLE · 2026-09-09"
  },
  "tense": {
    "en": "A new film by Paul Greengrass, a veteran director of tense action films including Captain Phillips and The Bourne Ultimatum, reimagines the Peasants’ Revolt from the perspectives of those who participated in it.",
    "cn": "保罗·格林格拉斯（Paul Greengrass）是包括《菲利普斯船长》（Captain Phillips）和《伯恩最后通牒》（The Bourne Ultimatum）在内的紧张动作电影的资深导演，他拍摄的一部新电影从参与者的角度重新构想了农民起义。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "that": {
    "en": "\"He's got that edge and different relationships around him as well and that helps,\" said the Gunners boss.",
    "cn": "“他周围有这种优势和不同的关系，这很有帮助，”枪手主帅说。",
    "src": "Sky Sports · 2026-09-09"
  },
  "thank": {
    "en": "I would also like to thank David Pemsel for his exceptional service to the BFC and the fashion industry.”",
    "cn": "我还要感谢David Pemsel为BFC和时尚界做出的杰出贡献。",
    "src": "Vogue · 2026-09-10"
  },
  "than": {
    "en": "Only Everton and Liverpool have placed less emphasis on investment in their backline than the Red Devils since 2022.",
    "cn": "自2022年以来，只有埃弗顿和利物浦比红魔更不重视投资。",
    "src": "Sky Sports · 2026-09-09"
  },
  "territory": {
    "en": "Self-reference can be tricky territory, especially for a designer with an archive as deep as Ralph Lauren ’s.",
    "cn": "自我参考可能是一个棘手的领域，尤其是对于像拉尔夫·劳伦（Ralph Lauren）这样拥有深厚档案的设计师来说。",
    "src": "ELLE · 2026-09-09"
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
    "en": "Rubio said decisions were made case by case and depended on the threat posed by a vessel, its location and local laws.",
    "cn": "卢比奥说，决定是根据具体情况做出的，取决于船只构成的威胁、位置和当地法律。",
    "src": "CBS News · 2026-09-10"
  },
  "threaten": {
    "en": "This finding suggests that the marine mammals may be seeking refuge on artificial reefs like the Po as their natural habitat is increasingly threatened by human activities.",
    "cn": "这一发现表明，海洋哺乳动物可能正在Po等人工珊瑚礁上寻求庇护，因为它们的自然栖息地越来越受到人类活动的威胁。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "three": {
    "en": "Include his three assists and that adds up to 0.25 non-penalty goals plus assists per 90 minutes with the Toffees.",
    "cn": "加上 3 个助攻，他在埃弗顿的场均非点球进球加助攻也只有 0.25。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "today": {
    "en": "Today, the 443-foot-long shipwreck lies within the Karaburun-Sazan Marine Protected Area, submerged about 108 to 121 feet deep.",
    "cn": "今天，这艘443英尺长的沉船位于Karaburun-Sazan海洋保护区内，水深约108至121英尺。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "toe": {
    "en": "As guests like Viola Davis, Meghann Fahy, and Cynthia Erivo settled into their seats, the show opened with a head-to-toe white look.",
    "cn": "随着Viola Davis、Meghann Fahy和Cynthia Erivo等嘉宾入座，节目以从头到脚的白色开场。",
    "src": "ELLE · 2026-09-09"
  },
  "together": {
    "en": "\"When you put together a team that hardly plays together, it is difficult to play at this level when [Leeds] are intense.\"",
    "cn": "“当你组建一支几乎无法一起比赛的球队时，当[利兹]非常激烈时，很难在这个级别上比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "ton": {
    "en": "A copper-toned manicure is the most elevated autumn choice when it comes to modern metallic shades.",
    "cn": "说到现代金属色调，古铜色的美甲是秋天最高贵的选择。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "tone": {
    "en": "A copper-toned manicure is the most elevated autumn choice when it comes to modern metallic shades.",
    "cn": "说到现代金属色调，古铜色的美甲是秋天最高贵的选择。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "too": {
    "en": "They hope, too, to discover whether the additional skulls belonged to people who were intentionally decapitated.",
    "cn": "他们也希望发现额外的头骨是否属于被故意斩首的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tool": {
    "en": "Invest in a decent nail-care kit with a buffer, cuticle tools, and nail oil, and you can give yourself the same glossy set without booking an appointment.",
    "cn": "买一个像样的指甲护理包，里面有缓冲液、角质层工具和指甲油，你可以不用预约就能让自己拥有同样有光泽的指甲。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "tour": {
    "en": "Billed as the world’s largest private collection of serial killer artifacts, the exhibition toured Europe before arriving stateside, where it made its first stop in Atlanta.",
    "cn": "该展览被誉为世界上最大的连环杀手文物私人收藏，在抵达美国之前在欧洲巡回展出，并在亚特兰大首次停留。",
    "src": "Smithsonian Magazine · 2026-09-09"
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
  "topic": {
    "en": "Republican leaders and Trump allies are gathering for two days at a downtown Dallas arena, and are holding other off-site donor events and discussions centered around topics like domestic energy production.",
    "cn": "共和党领导人和特朗普的盟友将在达拉斯市中心的一个体育馆举行为期两天的聚会，并举行其他场外捐赠活动和讨论，主题包括国内能源生产。",
    "src": "CBS News · 2026-09-09"
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
  "throw": {
    "en": "It all made sense that the brand would kick off a new scent by, well, throwing its own party.",
    "cn": "这一切都说得通，该品牌将通过举办自己的派对来启动一款新香水。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "through": {
    "en": "Tickets range in price from £25 to £33, through a tiered pricing structure based on the day and time of visit.",
    "cn": "门票价格从25英镑到33英镑不等，根据参观日期和时间分层定价。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "thrill": {
    "en": "We are thrilled to champion this cinematic supernova and take it to audiences worldwide.”",
    "cn": "我们很高兴能支持这部电影超新星，并把它带给全世界的观众。",
    "src": "Variety · 2026-09-10"
  },
  "throughout": {
    "en": "“That tan has been building up throughout the week.",
    "cn": "她说：“整个星期，皮肤都在晒黑。",
    "src": "ELLE · 2026-09-09"
  },
  "tie": {
    "en": "Bond Girl-worthy creations included a slinky, gold-sequin number with an asymmetric knotted tie.",
    "cn": "邦女郎风格的设计包括一件紧身的金色亮片礼服，搭配一条不对称的打结领带。",
    "src": "Vogue · 2026-09-10"
  },
  "tissue": {
    "en": "By linking up various amino acids in sequence, the body produces peptides that carry out a wide range of functions, including immune support, tissue repair and appetite control.",
    "cn": "通过按顺序连接各种氨基酸，人体产生具有多种功能的肽，包括免疫支持、组织修复和食欲控制。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "tip": {
    "en": "As the leaves turn, it only feels natural to coat your tips in shades of gold, amber, and brown.",
    "cn": "随着树叶的转动，你的指尖自然而然地涂上金色、琥珀色和棕色。",
    "src": "Who What Wear · 2026-09-10"
  },
  "tiny": {
    "en": "Tiny bubbles give each motif added depth, while curved surfaces enhance the enamel’s light-reflecting finish.",
    "cn": "微小的气泡增加了每个图案的深度，而弯曲的表面增强了珐琅的反射光效果。",
    "src": "ELLE · 2026-09-09"
  },
  "tidy": {
    "en": "Below, find the 20 best short nail designs for a tidy, modern manicure that doesn’t compromise on comfort or convenience.",
    "cn": "下面是20种最好的短指甲设计，让你既整洁又现代，又不牺牲舒适和方便。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "time": {
    "en": "If I don’t have to spend as much time in the chair, then why not reimagine my color for the cooler weather?",
    "cn": "如果我不必花那么多时间坐在椅子上，那么为什么不重新想象一下我的颜色，以适应凉爽的天气呢？",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "tight": {
    "en": "Arsenal's set-piece prowess is well documented, to the extent that they have been criticised for an over-reliance on dead-ball situations to win tight games.",
    "cn": "阿森纳的定位球能力人尽皆知，甚至有人批评他们过分依赖定位球来赢下胶着比赛。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "until": {
    "en": "They had been there largely undisturbed for nearly 100 years, until Amandeep Madra contacted them.",
    "cn": "在Amandeep Madra联系他们之前，他们在那里生活了将近100年。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "white": {
    "en": "They were required to be painted white with green bands and red crosses and illuminated at night.",
    "cn": "他们被要求被漆成白色，带有绿色条带和红色十字架，并在夜间照明。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "who": {
    "en": "Judith Jones is the associate shopping director at Who What Wear and has worked in fashion for over a decade.",
    "cn": "朱迪思·琼斯（Judith Jones）是Who What Wear的副购物总监，在时尚界工作了十多年。",
    "src": "Who What Wear · 2026-09-10"
  },
  "whole": {
    "en": "Quality was always important, but we took it to a whole other level with this fragrance.",
    "cn": "质量一直都很重要，但我们用这款香水把它提升到了一个全新的水平。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "whom": {
    "en": "Lesser-known featured Chicago killers include Richard Speck; the satanic Ripper Crew cult; and Tillie Klimek, known as Chicago’s “Black Widow,” who claimed to have had precognitive dreams of the deaths of her husbands, whom, in reality, she poisoned.",
    "cn": "鲜为人知的芝加哥杀手包括理查德·斯佩克（Richard Speck）、撒旦式的开膛手船员邪教（Ripper Crew cult）和被称为芝加哥“黑寡妇”的蒂莉·克莱梅克（Tillie Klimek），她声称自己曾梦到丈夫的死亡，而实际上，她的丈夫是被毒死的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "whose": {
    "en": "There's managing at the World Cup, then there's managing at a home World Cup for a nation whose President rather enjoys the spotlight.",
    "cn": "在世界杯上进行管理，然后在一个主场世界杯上为一个总统更喜欢聚光灯的国家进行管理。",
    "src": "Sky Sports · 2026-09-09"
  },
  "why": {
    "en": "And the key to one is (1) good people, and (2) feeling good about yourself, which is why she loves Black Opium Pink Glaze.",
    "cn": "而其中的关键是(1)善良的人，(2)自我感觉良好，这就是她喜欢黑鸦片粉釉的原因。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "wind": {
    "en": "The fire broke out on Monday in Antalya’s Aksu district and, fanned by strong winds, quickly spread into the neighboring Kepez district, forcing hundreds of residents from their homes.",
    "cn": "大火于周一在安塔利亚的阿克苏地区爆发，并在强风的推动下迅速蔓延到邻近的Kepez地区，迫使数百名居民离开家园。",
    "src": "ABC News · 2026-09-09"
  },
  "win": {
    "en": "We're making good steps but we'd like to be able to win a bit more comfortably and at more ease.",
    "cn": "我们正在迈出良好的步伐，但我们希望能够更舒适、更轻松地赢得比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "will": {
    "en": "No matter your color, O’Connor says that glossy hair will be key to transitioning your hue for fall.",
    "cn": "奥康纳说，不管你的肤色是什么，有光泽的头发将是秋季转变色调的关键。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "willing": {
    "en": "Havertz might never have entirely convinced as a centre-forward -- which is partly why Chelsea were willing to move him out and Arsenal signed Viktor Gyökeres last summer.",
    "cn": "哈弗茨从未能彻底证明自己是一名合格的中锋——这也是切尔西愿意将他放走、阿森纳去年夏天签下维克托·约克雷斯的原因之一。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "winter": {
    "en": "A take on one of the designer’s Fall/Winter 2026 looks, the gown featured familiar buttons and fringe detailing on the waist.",
    "cn": "这款礼服借鉴了这位设计师2026年秋冬的一款造型，腰上有熟悉的纽扣和流苏细节。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "wednesday": {
    "en": "That trade is not good,\" he said late Wednesday at the American Airlines Center, the Dallas Mavericks' home arena.",
    "cn": "这种交易并不好，”他在周三晚些时候在达拉斯小牛队的主场美国航空中心说道。",
    "src": "CBS News · 2026-09-10"
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
    "en": "It's not the first time he has used the presidential bully pulpit to weigh in on a hot-button sports debate.",
    "cn": "这不是他第一次利用总统欺凌讲坛参与热门体育辩论。",
    "src": "CBS News · 2026-09-10"
  },
  "weight": {
    "en": "It also illustrates how Telekom Srbija is punching above its weight, according to Martinović.",
    "cn": "马蒂诺维奇表示，这也说明了塞尔维亚电信是如何超越自身能力的。",
    "src": "Variety · 2026-09-10"
  },
  "welcome": {
    "en": "They tied the knot in July 2010 and have since welcomed two children: 15-year-old son Leo Encinas Cruz, and 13-year-old daughter Luna Encinas Cruz.",
    "cn": "他们于2010年7月结婚，之后迎来了两个孩子：15岁的儿子里奥·恩西纳斯·克鲁兹和13岁的女儿露娜·恩西纳斯·克鲁兹。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "well": {
    "en": "“The tradeoff is donor variability and higher manufacturing complexity, as well as greater regulatory scrutiny.",
    "cn": "“权衡的是供体的可变性和更高的制造复杂性，以及更严格的监管审查。",
    "src": "ELLE · 2026-09-09"
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
    "en": "They hope, too, to discover whether the additional skulls belonged to people who were intentionally decapitated.",
    "cn": "他们也希望发现额外的头骨是否属于被故意斩首的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "wherever": {
    "en": "A project might end up as a film, a TV series, a streaming title, a book, a game, a soundtrack, a licensed product or an immersive experience, wherever it fits best internationally.",
    "cn": "一个项目最终可能会变成电影、电视剧、流媒体标题、书籍、游戏、配乐、授权产品或沉浸式体验，只要它最适合国际市场。",
    "src": "Variety · 2026-09-10"
  },
  "where": {
    "en": "Alonso was handed another clear indication of where his side remain lacking - but for now, chaos isn't serving them too badly.",
    "cn": "阿隆索得到了另一个明确的迹象，表明他的球队仍然缺乏-但目前，混乱并没有为他们服务得太糟糕。",
    "src": "Sky Sports · 2026-09-09"
  },
  "when": {
    "en": "When you’re decked out in full sequins or a sweeping train, it hardly conveys the idea of effortless chic.",
    "cn": "当你穿着亮片或拖地长裙时，很难传达出毫不费力的时髦。",
    "src": "Vogue · 2026-09-10"
  },
  "while": {
    "en": "The Greatest Album of All Time is Stel’s attempt to capture that whiplash while it is still happening.",
    "cn": "史上最伟大的专辑是斯泰尔试图捕捉到的鞭打，当它还在发生。",
    "src": "Vogue · 2026-09-10"
  },
  "whatever": {
    "en": "It’ll work with your favorite autumn knit, that little black dress, jeans, and a tee, or whatever else your fall wardrobe throws at you.",
    "cn": "它可以搭配你最喜欢的秋季针织衫、小黑裙、牛仔裤和t恤，或者你秋天衣橱里的任何其他衣服。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "what": {
    "en": "Judith Jones is the associate shopping director at Who What Wear and has worked in fashion for over a decade.",
    "cn": "朱迪思·琼斯（Judith Jones）是Who What Wear的副购物总监，在时尚界工作了十多年。",
    "src": "Who What Wear · 2026-09-10"
  },
  "western": {
    "en": "Standing in front of Western Pennsylvania's Mon Valley Works steel mill, Fetterman said, \"we'll work with President Trump to fight and defend the steel way of life right here in the Steel Valley.\"",
    "cn": "Fetterman站在宾夕法尼亚州西部的Mon Valley Works钢铁厂前说：“我们将与特朗普总统合作，在钢铁谷与钢铁生活方式进行斗争和捍卫。",
    "src": "CBS News · 2026-09-10"
  },
  "west": {
    "en": "And the season before wasn't too different: his 75 take-ons ranked fourth behind Doku, West Ham's Mohammed Kudus, and Liverpool's Salah.",
    "cn": "前一个赛季也差不多：他的 75 次成功突破排名第四，仅次于多库、西汉姆的库杜斯和利物浦的萨拉赫。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "wrap": {
    "en": "To set the loose wave, Roszak used a 1.5-inch barrel curling iron, wrapping small sections away from the face to keep the wave modern rather than overly curled.",
    "cn": "为了做出蓬松的卷发，罗斯扎克用了一个1.5英寸的卷发棒，把头发从脸上绕开一小段，使波浪保持现代，而不是过度卷曲。",
    "src": "ELLE · 2026-09-09"
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
  "write": {
    "en": "In the animal world, researchers often focus on tool use for a practical purpose, study co-author Nessie O’Neil, a biologist at Miami University in Ohio, writes on her blog.",
    "cn": "研究报告的合著者、俄亥俄州迈阿密大学的生物学家尼西·奥尼尔在她的博客上写道，在动物世界，研究人员经常把重点放在实用的工具使用上。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "writer": {
    "en": "Albert Bozesan: A Munich-based filmmaker, writer and former head of creative technology at Storybook Studios.",
    "cn": "Albert Bozesan：慕尼黑电影制作人，作家，Storybook Studios前创意技术主管。",
    "src": "Variety · 2026-09-10"
  },
  "writing": {
    "en": "But shortly after, U.S. District Judge Stephen Clark issued a temporary restraining order in a separate challenge to Missouri's Supreme Court decision, writing that the plaintiffs faced \"irreparable harm\" otherwise because \"many Missouri voters would have to cast their general-election votes for candidates whom they had no role in nominating.\"",
    "cn": "但此后不久，美国地区法官斯蒂芬·克拉克（Stephen Clark）在对密苏里州最高法院裁决的单独质疑中发布了一项临时限制令，他写道，原告面临“不可弥补的伤害”，否则因为“许多密苏里州选民将不得不投票给他们在提名中没有角色的候选人。",
    "src": "CBS News · 2026-09-10"
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
  "youth": {
    "en": "Nearly three decades later, the pair look as though they’ve drunk a youth potion.",
    "cn": "近三十年后，这对夫妇看起来好像喝了青春药水。",
    "src": "ELLE · 2026-09-09"
  },
  "wound": {
    "en": "The ship, called the Po, was evacuating wounded Italian soldiers from Albania’s Vlora Bay on the night of March 14, 1941, when it was struck by a torpedo from a British Swordfish bomber.",
    "cn": "这艘名为Po的船于1941年3月14日晚上从阿尔巴尼亚的Vlora湾撤离受伤的意大利士兵，当时它被英国箭鱼轰炸机的鱼雷击中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "yourself": {
    "en": "And the key to one is (1) good people, and (2) feeling good about yourself, which is why she loves Black Opium Pink Glaze.",
    "cn": "而其中的关键是(1)善良的人，(2)自我感觉良好，这就是她喜欢黑鸦片粉釉的原因。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "your": {
    "en": "Frizz is caused by a variety of different things: humidity, breakage, or just the general curl of your hair.",
    "cn": "毛躁是由各种不同的原因造成的：湿度、断裂，或者只是头发的一般卷曲。",
    "src": "ELLE · 2026-09-09"
  },
  "young": {
    "en": "Its dental charms came from large mammals, like wolves, deer, young bears or maybe even humans, Dąbrowski tells PAP.",
    "cn": "Dąbrowski告诉PAP ，它的牙齿魅力来自大型哺乳动物，如狼、鹿、小熊甚至人类。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "you": {
    "en": "\"At its heart, it’s a story about family, freedom and the courage to challenge everything you’ve ever known.”",
    "cn": "“从本质上讲，这是一个关于家庭、自由和挑战一切已知事物的勇气的故事。",
    "src": "Variety · 2026-09-10"
  },
  "yours": {
    "en": "I hate to use the word murder because it's strong, but if a loved one of yours was murdered, our justice system is built to have accountability and to have atonement for that and for the grief of the family.\"",
    "cn": "我讨厌使用谋杀这个词，因为它很强烈，但如果你所爱的人被谋杀了，我们的司法系统是为了追究责任，为家庭的悲痛赎罪而建立的。",
    "src": "CBS News · 2026-09-10"
  },
  "would": {
    "en": "I would also like to thank David Pemsel for his exceptional service to the BFC and the fashion industry.”",
    "cn": "我还要感谢David Pemsel为BFC和时尚界做出的杰出贡献。",
    "src": "Vogue · 2026-09-10"
  },
  "worthy": {
    "en": "Over 20 years ago, Natalia Vodianova (pictured below, left side) wore a long coat with delicate florals in between pastel stripes, while today's show featured a similar Bridgerton -worthy jacket that was cropped in the front and long in the back.",
    "cn": "20多年前，娜塔莉亚·沃佳诺娃（natalie Vodianova）（下图左）穿了一件在柔和条纹之间点缀着精致花朵的长外套，而今天的秀场上，她穿了一件类似于布里奇顿风格的外套，前襟剪短，后襟修长。",
    "src": "Who What Wear · 2026-09-10"
  },
  "wonder": {
    "en": "If you’re wondering about the secret to 27 years of marriage, Victoria Beckham just hinted at the answer with her newest fragrance.",
    "cn": "如果你想知道27年婚姻的秘密，维多利亚·贝克汉姆用她最新的香水暗示了答案。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "woman": {
    "en": "“Black Opium to me really describes the most unapologetic, unafraid, cool woman,” she says.",
    "cn": "她说：“对我来说，黑鸦片确实描述了最无所畏惧、最冷酷的女人。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "witness": {
    "en": "For Martinović, that period has witnessed a transition at Telekom Srbija from a \"traditional ecosystem\" for film and TV content to \"a very open-minded and sophisticated regional production ecosystem in the last eight or nine years.\"",
    "cn": "在martinoviki看来，这段时间见证了Srbija电信从“传统的电影和电视内容生态系统”向“一个非常开放和成熟的区域生产生态系统”的转变。",
    "src": "Variety · 2026-09-10"
  },
  "withstand": {
    "en": "The Tower of London has protected England’s capital since it was first built in the 1070s, withstanding medieval sieges and World War II bombing raids alike.",
    "cn": "伦敦塔自1070年代首次建成以来一直保护着英格兰的首都，经受住了中世纪的围攻和第二次世界大战的轰炸。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "without": {
    "en": "“It’s warm without being overly copper and dimensional without needing to be blonde, which makes it incredibly wearable,” Botsford says.",
    "cn": "博茨福德说：“它既温暖，又不会过于古铜色，也不需要金黄色，这让它非常适合穿。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "with": {
    "en": "But the hosts struck back with strikes from Kai Havertz and Martin Ødegaard -- and could have scored more.",
    "cn": "但主队凭借凯·哈弗茨和马丁·厄德高的进球反超比分——他们本可以进更多球。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "wise": {
    "en": "In contrast, exosomes can be harvested directly from plants or from donated animal or human cell tissue—including bone marrow and blood, but most commonly fat, amniotic fluid, and placental tissue, Dr. Wise says.",
    "cn": "怀斯博士说，相比之下，外泌体可以直接从植物或捐赠的动物或人类细胞组织中获取，包括骨髓和血液，但最常见的是脂肪、羊水和胎盘组织。",
    "src": "ELLE · 2026-09-09"
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
  "worst": {
    "en": "It might go down as the worst trade in the history of sports,\" before conceding that the Boston Red Sox's decision to ship pitcher Babe Ruth to the New York Yankees more than a century ago likely still deserved that dubious distinction.",
    "cn": "“这笔交易可能会被载入体育史册，成为最糟糕的交易，”但他随后承认，一个多世纪前波士顿红袜队将投手贝比·鲁斯交易到纽约洋基队的决定，可能仍然配得上这个令人质疑的“殊荣”。",
    "src": "CBS News · 2026-09-10"
  },
  "worse": {
    "en": "Winning work highlighted during the 36th annual award ceremony included hilarious research on the aerodynamics of nose blowing, gently stepping on venomous snakes, confirming that teenagers do indeed smell worse than babies and other side-splitting scientific undertakings.",
    "cn": "第36届年度颁奖典礼上突出的获奖作品包括关于吹鼻子的空气动力学的热闹研究，轻轻踩在毒蛇身上，证实青少年确实比婴儿更难闻，以及其他侧面分裂的科学事业。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "world": {
    "en": "Jungle Book Studio founder Gaurav Dhingra serves as executive producer in addition to handling world sales.",
    "cn": "《奇幻森林》工作室的创始人Gaurav dininggra除了负责全球销售之外，还担任执行制片人。",
    "src": "Variety · 2026-09-10"
  },
  "workshop": {
    "en": "Developed over several years in Van Cleef & Arpels’ workshops using a technique inspired by the 17th-century “gold-ruby” process, the vivid hue gets its color from fine gold particles rather than pigments.",
    "cn": "梵克雅宝（Van Cleef & Arpels）的工作室用了几年的时间，采用了一种受17世纪“金红宝石”工艺启发的技术，这种鲜艳的色调是由精细的金颗粒而不是颜料产生的。",
    "src": "ELLE · 2026-09-09"
  },
  "worker": {
    "en": "The Po quickly began taking on water and sank within about ten minutes, killing 23 of the 240 people aboard, including three Italian Red Cross workers.",
    "cn": "Po很快开始进水，并在大约十分钟内沉没，造成船上240人中的23人死亡，其中包括三名意大利红十字会工作人员。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "work": {
    "en": "With strong experience in cross-sector advisory, Cooper has worked between business, government and culture.",
    "cn": "库博拥有丰富的跨部门咨询经验，曾在商业、政府和文化领域工作。",
    "src": "Vogue · 2026-09-10"
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
  "weapon": {
    "en": "\"We are talking about terrorists who, in many cases, possess weapons and equipment resembling the national armies of certain countries,\" Rubio said.",
    "cn": "卢比奥说：“我们谈论的是恐怖分子，他们在很多情况下拥有类似某些国家军队的武器和装备。",
    "src": "CBS News · 2026-09-10"
  },
  "valley": {
    "en": "In Silicon Valley, devotees have gathered at peptide parties to drink, dance and inject themselves with these chemicals—all in pursuit of sharper minds and more sculpted bodies.",
    "cn": "在硅谷，奉献者聚集在多肽派对上喝酒、跳舞和注射这些化学物质--所有这些都是为了追求更敏锐的头脑和更精致的身体。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "valuable": {
    "en": "Here, Cooper’s expertise could prove valuable.",
    "cn": "在这方面，库珀的专业知识可能是有价值的。",
    "src": "Vogue · 2026-09-10"
  },
  "value": {
    "en": "The company aims to identify, finance and produce high-value intellectual property that crosses borders and formats.",
    "cn": "该公司旨在识别、资助和生产跨国界和格式的高价值知识产权。",
    "src": "Variety · 2026-09-10"
  },
  "van": {
    "en": "Van Cleef & Arpels is giving its iconic Alhambra motif a vibrant new look.",
    "cn": "梵克雅宝（Van Cleef & Arpels）赋予其标志性的阿尔罕布拉（Alhambra）主题一个充满活力的新面貌。",
    "src": "ELLE · 2026-09-09"
  },
  "vanity": {
    "en": "Cruz’s go-to manicurist, Lucero Hurtado, recently shared during an interview with Vanity Fair Spain that soft, milky shades and clean finishes are continuing to go strong as one of the biggest nail trends of 2026.",
    "cn": "克鲁兹的御用美甲师卢塞罗·赫尔塔多（Lucero Hurtado）最近在接受《名利场》（Vanity Fair）西班牙版采访时表示，柔和的乳白色色调和干净的指甲油将继续成为2026年最大的美甲趋势之一。",
    "src": "Vogue · 2026-09-10"
  },
  "variety": {
    "en": "Variety has been given access to an exclusive teaser for the film, which you can watch here",
    "cn": "Variety已获得该电影的独家预告片，您可以在此处观看",
    "src": "Variety · 2026-09-10"
  },
  "various": {
    "en": "But within the last few years, peptides have become a much broader phenomenon, not just taken for self-optimization but for treating chronic pain and various other conditions.",
    "cn": "但在过去几年中，多肽已成为一种更广泛的现象，不仅用于自我优化，还用于治疗慢性疼痛和各种其他疾病。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "vary": {
    "en": "Because these products are not standardized, quality and sourcing can vary significantly.",
    "cn": "由于这些产品没有标准化，质量和来源可能会有很大差异。",
    "src": "ELLE · 2026-09-09"
  },
  "vast": {
    "en": "Five told CBS News they would not be going to Dallas, while the vast majority, 51 candidates, did not reply to CBS News' queries.",
    "cn": "其中5人告诉CBS新闻，他们不会去达拉斯，而绝大多数候选人（51人）没有回答CBS新闻的提问。",
    "src": "CBS News · 2026-09-09"
  },
  "veteran": {
    "en": "It is believed they were compiled for postwar pensions and other veterans’ benefits.",
    "cn": "据信，这些数据是为战后养老金和其他退伍军人福利编制的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "vest": {
    "en": "An intricate woven construction lightens a fluffy, ombr&eacute; shearling vest.",
    "cn": "一个复杂的编织结构减轻了蓬松，ombr毛背心。",
    "src": "Who What Wear · 2026-09-10"
  },
  "vessel": {
    "en": "Asked whether vessels would continue to be destroyed, Rubio replied: \"Well again, it depends, and we still blow up ships.\"",
    "cn": "当被问及船只是否会继续被摧毁时，卢比奥回答说：“好吧，这要看情况，我们仍然会炸毁船只。",
    "src": "CBS News · 2026-09-10"
  },
  "very": {
    "en": "It’s important when working with Jérôme [Epinette] to be very honest to create ultimately what I want and what I desire.",
    "cn": "在与Jérôme （Epinette）合作时，非常诚实地创造出我想要的和我想要的东西是很重要的。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "vertical": {
    "en": "Vertical has acquired U.S. distribution rights to \"Sanctuary,\" an English-language, post-apocalyptic thriller starring \"The Handmaid's Tale's\" Nina Kiri.",
    "cn": "Vertical已获得“Sanctuary”的美国发行权，这是一部由“The Handmaid's Tale”的Nina Kiri主演的英语后世界末日惊悚片。",
    "src": "Variety · 2026-09-10"
  },
  "venture": {
    "en": "Gayathiri Guliani and Uzair Merchant are unveiling K2 Media Capital, a new entertainment investment and production venture, at the Toronto Film Festival market.",
    "cn": "Gayathiri Guliani和Uzair Merchant在多伦多电影节市场上推出了K2 Media Capital，这是一家新的娱乐投资和制作企业。",
    "src": "Variety · 2026-09-10"
  },
  "velvet": {
    "en": "Hand-painted and burnout techniques make for highs and lows of color intensity, giving silk lames and velvets an aged patina.",
    "cn": "手绘和烧光技术使色彩强度高低起伏，使丝绸和天鹅绒呈现出一种古老的光泽。",
    "src": "Who What Wear · 2026-09-10"
  },
  "version": {
    "en": "For all of the emphasis on pressing and possessing, this shift was the defining feature of the 21st century version of the sport.",
    "cn": "无论外界如何强调逼抢和控球，这种转变都是 21 世纪足球的标志性特征。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "vacation": {
    "en": "Nothing against spring pastels or vibrant, summer vacation-ready polishes, but a moody, fall mani just does something to my psyche.",
    "cn": "没有什么可以反对春天的柔和色调，也没有什么可以反对充满活力的暑假指甲油，但是一个忧郁的秋天指甲油确实会让我的心灵受到影响。",
    "src": "Who What Wear · 2026-09-10"
  },
  "upon": {
    "en": "Lavia would be the most obvious partner for Caicedo, but the Belgium international has had such an injury-hit time at Chelsea that the 22-year-old cannot yet be relied upon to be a first-choice starter.",
    "cn": "拉维亚本该是凯塞多最明显的搭档，但这位比利时国脚在切尔西饱受伤病困扰，年仅 22 岁的他还不能被视为可靠的首发。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "upper": {
    "en": "Spotted: Pamela Anderson in New York City's Upper East Side, with a manicure so good it deserves its own anonymous tip line.",
    "cn": "现场报道：帕梅拉·安德森（Pamela Anderson）在纽约上东区，她的指甲修得太好了，应该有自己的匿名举报热线。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "upward": {
    "en": "Sending out $5,000 checks to all of America's approximately 245 million adult citizens could cost upwards of $1 trillion.",
    "cn": "向美国所有约2.45亿成年公民发送5,000美元的支票可能花费超过1万亿美元。",
    "src": "CBS News · 2026-09-10"
  },
  "upwards": {
    "en": "Sending out $5,000 checks to all of America's approximately 245 million adult citizens could cost upwards of $1 trillion.",
    "cn": "向美国所有约2.45亿成年公民发送5,000美元的支票可能花费超过1万亿美元。",
    "src": "CBS News · 2026-09-10"
  },
  "urge": {
    "en": "Mr. Trump is seeking to rally Republicans ahead of the midterms, vowing during Wednesday's speech to campaign for vulnerable GOP lawmakers, and urging voters to treat the November elections as a referendum on his presidency.",
    "cn": "特朗普正在寻求在中期选举之前召集共和党人，在周三的演讲中誓言要为弱势的共和党议员竞选，并敦促选民将11月的选举视为对他的总统职位的公投。",
    "src": "CBS News · 2026-09-10"
  },
  "usually": {
    "en": "It’s usually harder for such large animals to find the resources needed to survive and reproduce in such a climate.",
    "cn": "这种大型动物通常很难找到在这种气候下生存和繁殖所需的资源。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "used": {
    "en": "It's not the first time he has used the presidential bully pulpit to weigh in on a hot-button sports debate.",
    "cn": "这不是他第一次利用总统欺凌讲坛参与热门体育辩论。",
    "src": "CBS News · 2026-09-10"
  },
  "use": {
    "en": "Scientists, in turn, have developed synthetic copies or modified cousins of these peptides to use as medications.",
    "cn": "反过来，科学家们开发了这些肽的合成拷贝或修饰表亲，用作药物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "usual": {
    "en": "The slate, as usual, features awards-season hopefuls from leading auteurs, including Martin McDonagh’s dark comedy Wild Horse Nine, Bucking Fastard with real-life sisters Rooney and Kate Mara, and Florian Zeller’s Bunker, starring Cruz and Bardem.",
    "cn": "和往常一样，今年的提名名单上有很多大导演的热门作品，包括马丁·麦克唐纳执导的黑色喜剧《野马九号》、现实生活中的姐妹鲁尼和凯特·玛拉主演的《巴克·法斯塔德》，以及克鲁兹和巴登主演的弗洛里安·泽勒执导的《邦克》。",
    "src": "ELLE · 2026-09-09"
  },
  "waist": {
    "en": "A take on one of the designer’s Fall/Winter 2026 looks, the gown featured familiar buttons and fringe detailing on the waist.",
    "cn": "这款礼服借鉴了这位设计师2026年秋冬的一款造型，腰上有熟悉的纽扣和流苏细节。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "wait": {
    "en": "Below, find the seven trends I personally can't wait to wear this season.",
    "cn": "以下是我个人迫不及待想要在本季穿的七种流行趋势。",
    "src": "Who What Wear · 2026-09-10"
  },
  "wake": {
    "en": "Prophetic words from Gary Neville in the wake of Manchester United's 2-2 draw with Everton.",
    "cn": "加里·内维尔（Gary Neville）在曼联2-2战平埃弗顿之后的预言。",
    "src": "Sky Sports · 2026-09-09"
  },
  "walk": {
    "en": "It was a familiar Lauren move, and a fitting way to begin a collection that would take a knowing walk through the archive.",
    "cn": "这是一个熟悉的劳伦举动，也是开始收藏的合适方式，可以在档案馆中进行一次明智的漫步。",
    "src": "ELLE · 2026-09-09"
  },
  "wall": {
    "en": "But it takes its name from the French tapisserie, meaning ‘wall hanging’.",
    "cn": "但它的名字来自法语tapisserie，意思是“挂在墙上”。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "want": {
    "en": "To combat those gloomy days ahead, Rhee wanted to add a bit of color and whimsy to their closets.",
    "cn": "为了对抗那些阴郁的日子，李想给他们的衣橱增添一点色彩和奇思妙想。",
    "src": "Vogue · 2026-09-10"
  },
  "war": {
    "en": "Many candidates likely also want access to the president's nine-figure super PAC war chest.",
    "cn": "许多候选人可能也希望获得总统九位数的超级PAC战争基金。",
    "src": "CBS News · 2026-09-10"
  },
  "warm": {
    "en": "“I always recommend bringing inspiration photos, but also talking about how warm you’re comfortable going,” she says.",
    "cn": "她说：“我总是建议你带上一些鼓舞人心的照片，但同时也要告诉他们你感到有多温暖。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "warmth": {
    "en": "“We’re seeing more blended looks that seamlessly add depth, warmth, and dimension—kind of like enhancing what you already have to match the season,” she says.",
    "cn": "她说：“我们看到越来越多的混合造型无缝地增加了深度、温暖和空间感——有点像为搭配这个季节而强化你已有的服装。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "warn": {
    "en": "\"If you don't confront these groups, they will eat these countries alive,\" he warned.",
    "cn": "他警告说：“如果你不对抗这些组织，它们会把这些国家活活吃掉。",
    "src": "CBS News · 2026-09-10"
  },
  "wash": {
    "en": "But one of the collection’s best pieces was the lightweight denim biker jacket, which will come in two washes.",
    "cn": "但该系列最好的单品之一是轻便的牛仔机车夹克，可洗两次。",
    "src": "Vogue · 2026-09-10"
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
  "weaken": {
    "en": "He points to popular platelet-rich plasma (PRP) as one such therapy, which uses concentrated platelets from a patient’s own blood to stimulate weakened follicles.",
    "cn": "他指出，流行的富血小板血浆（PRP）就是一种这样的治疗方法，它使用患者自身血液中的浓缩血小板来刺激衰弱的卵泡。",
    "src": "ELLE · 2026-09-09"
  },
  "weak": {
    "en": "Chelsea are back, but they're still weak at the back.",
    "cn": "切尔西已经卷土重来，但防线依旧脆弱。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "way": {
    "en": "Mr. Trump cleared the way last year for U.S. Steel to be acquired by Japan-based Nippon Steel.",
    "cn": "特朗普去年为美国钢铁(U.S. Steel)被日本新日铁(Nippon Steel)收购扫清了道路。",
    "src": "CBS News · 2026-09-10"
  },
  "wave": {
    "en": "The other is even more fanciful and framed with tousled waves.",
    "cn": "另一幅则更加奇特，画着乱蓬蓬的波浪。",
    "src": "ELLE · 2026-09-09"
  },
  "waterproof": {
    "en": "The best part: it even comes with a matching skirt to make your full look as waterproof as possible (and fashionable), but it will pair well with jeans and slacks or whatever else you might already have in your closet.",
    "cn": "最棒的是：它甚至可以搭配一条裙子，让你看起来尽可能防水（和时尚），但它也可以和牛仔裤、休闲裤或任何你衣橱里已经有的东西搭配。",
    "src": "Vogue · 2026-09-10"
  },
  "water": {
    "en": "The Po quickly began taking on water and sank within about ten minutes, killing 23 of the 240 people aboard, including three Italian Red Cross workers.",
    "cn": "Po很快开始进水，并在大约十分钟内沉没，造成船上240人中的23人死亡，其中包括三名意大利红十字会工作人员。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "watch": {
    "en": "Variety has been given access to an exclusive teaser for the film, which you can watch here",
    "cn": "Variety已获得该电影的独家预告片，您可以在此处观看",
    "src": "Variety · 2026-09-10"
  },
  "vote": {
    "en": "With roughly half of all votes counted at around 8:30 p.m. ET, Foulkes led McKee 62.3% to 37.7%.",
    "cn": "美国东部时间晚上8点30分左右，大约一半的选票已经清点完毕，福克斯以62.3%对37.7%领先麦基。",
    "src": "CBS News · 2026-09-10"
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
    "src": "Sky Sports · 2026-09-09"
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
    "en": "Erin got her start as a Who What Wear intern in 2011—back when the site only published a single story per day.",
    "cn": "2011年，艾琳开始在“谁穿什么”（Who What Wear）实习，当时该网站每天只发布一篇文章。",
    "src": "Who What Wear · 2026-09-10"
  },
  "vision": {
    "en": "Might Pieter Mulier’s new vision for Versace continue to take shape on the red carpet?",
    "cn": "彼得·穆利尔（Pieter Mulier）对范思哲（Versace）的新设想会在红毯上继续成形吗？",
    "src": "ELLE · 2026-09-09"
  },
  "voluntary": {
    "en": "Cooper is currently UK chair for the 30% Club — a voluntary organization committed to improving women’s representation on company boards — and has advised on DEI across various global businesses, working alongside C-suite leaders on gender and race, in particular.",
    "cn": "库珀目前是30%俱乐部（一个致力于提高女性在公司董事会中的代表性的自愿组织）的英国主席，并为各种全球企业的DEI提供建议，特别是在性别和种族问题上与高级管理层领导人合作。",
    "src": "Vogue · 2026-09-10"
  },
  "volume": {
    "en": "Expert review: “I don’t want controlling frizz to mean suppressing someone’s curl pattern or taking away all of their volume.",
    "cn": "专家评论：“我不希望控制头发卷曲意味着抑制某人的卷发模式，或者把他们的头发全部卷掉。",
    "src": "ELLE · 2026-09-09"
  },
  "visible": {
    "en": "This boom is even more visible online: As of May, peptide-related hashtags had generated more than 130,000 Instagram posts and 230 million TikTok views.",
    "cn": "这种热潮在网上更加明显：截至5月，与多肽相关的标签已经产生了超过13万个Instagram帖子和2.3亿次TikTok浏览量。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "voice": {
    "en": "The global fashion industry needs new markets, new consumers, and new creative voices.",
    "cn": "全球时尚产业需要新的市场、新的消费者和新的创意声音。",
    "src": "Vogue · 2026-09-10"
  },
  "vivid": {
    "en": "Developed over several years in Van Cleef & Arpels’ workshops using a technique inspired by the 17th-century “gold-ruby” process, the vivid hue gets its color from fine gold particles rather than pigments.",
    "cn": "梵克雅宝（Van Cleef & Arpels）的工作室用了几年的时间，采用了一种受17世纪“金红宝石”工艺启发的技术，这种鲜艳的色调是由精细的金颗粒而不是颜料产生的。",
    "src": "ELLE · 2026-09-09"
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
  "television": {
    "en": "Rio trained at the U.K.’s National Film and Television School and previously made a short film of the same name, which was honored with the Special Jury Award at Clermont-Ferrand.",
    "cn": "里约热内卢曾在英国国家电影电视学院接受培训，此前曾制作过一部同名短片，并获得克莱蒙费朗电影节评审团特别奖。",
    "src": "Variety · 2026-09-10"
  },
  "telephone": {
    "en": "He told the audience he views about 35 House and Senate districts as especially crucial, and vowed to \"go to every one of those states,\" holding both in-person rallies and telephone town halls.",
    "cn": "他告诉听众，他认为大约35个众议院和参议院选区特别重要，并发誓要“去每一个州”，同时举行面对面的集会和电话市政厅。",
    "src": "CBS News · 2026-09-10"
  },
  "skin": {
    "en": "Pay extra attention to your cuticles during the colder months when skin becomes prone to dryness and flaking.",
    "cn": "在寒冷的月份要特别注意你的角质层，因为皮肤容易干燥和脱落。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "skirt": {
    "en": "One skirt's embroidery was wrought in gesso-painted thread; the oversized sequins of another were coated to dull their shine.",
    "cn": "一条裙子的刺绣是用石膏彩绘线绣的；另一件的超大亮片被涂上了一层，以减弱它们的光泽。",
    "src": "Who What Wear · 2026-09-10"
  },
  "sky": {
    "en": "She followed it up with a chiffon sky-blue gown, complete with a fitted strapless bodice and detachable shoulder cape.",
    "cn": "随后，她又穿了一件天蓝色雪纺礼服，搭配合身的无肩带紧身胸衣和可拆卸的披肩。",
    "src": "Vogue · 2026-09-10"
  },
  "sleeve": {
    "en": "So what does the beloved American designer have up his sleeve this time?",
    "cn": "那么，这位受人喜爱的美国设计师这次又有什么锦囊妙计呢？",
    "src": "Who What Wear · 2026-09-10"
  },
  "slightly": {
    "en": "Cruz’s long, almond nails were slightly warmer and pinker in shade—a look that’s both versatile and flattering.",
    "cn": "克鲁兹的长杏仁指甲在色调上略显温暖和粉红色，这种造型既百搭又讨人喜欢。",
    "src": "Vogue · 2026-09-10"
  },
  "smile": {
    "en": "I smile before jesting, and Pochettino just laughs and says he's ready.",
    "cn": "我在开玩笑之前微笑，波切蒂诺只是笑着说他已经准备好了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "small": {
    "en": "\"We are completely aware that we come from a small country,\" she says.",
    "cn": "她说：“我们完全意识到我们来自一个小国。",
    "src": "Variety · 2026-09-10"
  },
  "skill": {
    "en": "What Ronaldo and Messi did -- and made everyone else realise -- is that you could take those same winger skills, the speed and technical brilliance, and turn it into something even better.",
    "cn": "C 罗和梅西所做的事情——也让所有人认识到——是同样的边锋技术、速度和天赋，可以演化成更可怕的东西。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "slit": {
    "en": "However, while the runway set saw long sleeves and a knee-length skirt, the actor’s version was defined by its sleeveless scoop neckline and floor-length gown, which was cut with a thigh-high slit.",
    "cn": "然而，虽然t台的造型是长袖和及膝裙，但这位演员的版本则是无袖露领和及地礼服，礼服的剪裁是及膝的开叉。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "slip": {
    "en": "Her take on the enduring ’90s slip dress, in a silver-champagne combo, featured beads that beautifully accentuated the natural lines of the body.",
    "cn": "她将90年代经久不衰的吊带裙设计成银色香槟色的组合，用珠子漂亮地突出了身体的自然线条。",
    "src": "Vogue · 2026-09-10"
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
  "silent": {
    "en": "“A well-groomed manicure is a silent form of communication,” Hurtado said of the look.",
    "cn": "“精心修剪的指甲是一种无声的交流方式，”赫尔塔多说。",
    "src": "Vogue · 2026-09-10"
  },
  "silk": {
    "en": "And an intricate spray-paint process imbued silk brocade with an impressionistic mystique.\"",
    "cn": "复杂的喷漆工艺使丝绸锦缎充满了印象派的神秘感。",
    "src": "Who What Wear · 2026-09-10"
  },
  "silver": {
    "en": "Her take on the enduring ’90s slip dress, in a silver-champagne combo, featured beads that beautifully accentuated the natural lines of the body.",
    "cn": "她将90年代经久不衰的吊带裙设计成银色香槟色的组合，用珠子漂亮地突出了身体的自然线条。",
    "src": "Vogue · 2026-09-10"
  },
  "similar": {
    "en": "It came after a similar operation that destroyed another vessel linked to the gang, one of Ecuador's main drug trafficking and extortion groups.",
    "cn": "此前，一项类似的行动摧毁了另一艘与该团伙有关的船只，该团伙是厄瓜多尔主要的毒品贩运和勒索组织之一。",
    "src": "CBS News · 2026-09-10"
  },
  "similarly": {
    "en": "Or Lili Reinhart, who’s currently channeling iconic rom-com characters on a press tour for her newest movie, The Love Hypothesis, and is wearing similarly tousled hairstyles.",
    "cn": "还有莉莉·莱因哈特（Lili Reinhart），她最近在新片《爱情假设》（The Love Hypothesis）的巡回宣传活动中扮演了经典的浪漫喜剧角色，她也梳着类似的蓬乱发型。",
    "src": "ELLE · 2026-09-09"
  },
  "simple": {
    "en": "When Lhuillier found a balance of simple-yet-striking, it worked much more effectively.",
    "cn": "当Lhuillier找到了简单与引人注目之间的平衡时，它的工作效率就高得多。",
    "src": "Vogue · 2026-09-10"
  },
  "simplify": {
    "en": "She aimed to simplify and strip down her signature assortment of cocktail dresses and gowns, wondering if her fanciful creations could be less, well, froo-froo.",
    "cn": "她的目标是简化和精简她标志性的各种鸡尾酒礼服和礼服，想知道她的幻想创作是否可以少一些，嗯，froo-froo。",
    "src": "Vogue · 2026-09-10"
  },
  "simply": {
    "en": "To take on Claudia’s role, as it were, is not just a privilege but a real challenge as an actor – I simply don’t have enough hair.",
    "cn": "能出演克劳迪娅这个角色，可以说，不仅是一种特权，而且对演员来说是一个真正的挑战——我就是没有足够的头发。",
    "src": "Variety · 2026-09-10"
  },
  "since": {
    "en": "“I’d never been to Europe until this time last year, and I’ve been over 10 times since,” she says.",
    "cn": "她说：“直到去年这个时候，我才去过欧洲，从那以后我已经去过10多次了。",
    "src": "Vogue · 2026-09-10"
  },
  "size": {
    "en": "Key Ingredients: Camellia japonica seed oil, argan oil, and kelp extract Sizes: 6.76 fl oz",
    "cn": "主要成分：山茶籽油，摩洛哥坚果油，海带提取物；大小：6.76液盎司",
    "src": "ELLE · 2026-09-09"
  },
  "six": {
    "en": "Two people were hospitalized with burns to their legs on Tuesday, while six others were treated for smoke inhalation.",
    "cn": "周二，两人因腿部烧伤住院，另有六人因吸入烟雾而接受治疗。",
    "src": "ABC News · 2026-09-09"
  },
  "situation": {
    "en": "\"I don't know the amount of chances and situations we generated but the performance doesn't reflect the result.",
    "cn": "“我不知道我们创造了多少机会和情况，但表现并不能反映结果。",
    "src": "Sky Sports · 2026-09-09"
  },
  "sit": {
    "en": "Mr. Trump acknowledged that historical trend, saying, \"the midterms are not supposed to be won by the sitting president,\" but \"we're going to change that.\"",
    "cn": "特朗普承认了这一历史趋势，他说，“中期选举不应该由现任总统赢得”，但“我们将改变这种状况”。",
    "src": "CBS News · 2026-09-10"
  },
  "sister": {
    "en": "Case in point: Practical Magic and the Owens sisters.",
    "cn": "举个例子：实用魔术和欧文斯姐妹。",
    "src": "ELLE · 2026-09-09"
  },
  "sink": {
    "en": "In recent weeks there have been signs of a shift in tactics, with joint U.S.-Ecuador patrols removing crews from at least six boats before sinking the vessels.",
    "cn": "最近几周有迹象表明，美国和厄瓜多尔的联合巡逻队在击沉船只之前，已经将至少六艘船上的船员撤离。",
    "src": "CBS News · 2026-09-10"
  },
  "singular": {
    "en": "She focused largely on draping this season, finding beauty in the strong silhouettes she could craft with a singular roll of fabric.",
    "cn": "这一季，她主要专注于垂饰，用一卷单一的面料打造出鲜明的轮廓，从中寻找美。",
    "src": "Vogue · 2026-09-10"
  },
  "single": {
    "en": "Erin got her start as a Who What Wear intern in 2011—back when the site only published a single story per day.",
    "cn": "2011年，艾琳开始在“谁穿什么”（Who What Wear）实习，当时该网站每天只发布一篇文章。",
    "src": "Who What Wear · 2026-09-10"
  },
  "site": {
    "en": "The site is known for a Roman-era cemetery that dates back to the fourth or fifth century C.E.",
    "cn": "该遗址以罗马时代的墓地而闻名，其历史可追溯到公元四或五世纪。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "smoke": {
    "en": "James and I wept too, uncomprehending—the flames, the smoke, above all the people jumping.",
    "cn": "詹姆斯和我也哭了，无法理解——火焰，烟雾，最重要的是人们跳了起来。",
    "src": "Vogue · 2026-09-10"
  },
  "smooth": {
    "en": "After carving out a deep side part, Abergel used the ghd Speed hairdryer and a round brush to smooth out Kidman’s damp hair and create lift and volume.",
    "cn": "在剪出较深的侧分后，阿伯格尔用ghd Speed吹风机和圆刷把基德曼潮湿的头发弄平，让头发蓬松起来。",
    "src": "ELLE · 2026-09-09"
  },
  "sometime": {
    "en": "Sure, it’s not exactly ideal and can sometimes signal a larger issue, like dryness, breakage, or humidity, but not all frizz is bad.",
    "cn": "当然，这并不完全是理想的，有时可能预示着一个更大的问题，比如干燥、破损或潮湿，但并不是所有的毛躁都是不好的。",
    "src": "ELLE · 2026-09-09"
  },
  "sometimes": {
    "en": "Sure, it’s not exactly ideal and can sometimes signal a larger issue, like dryness, breakage, or humidity, but not all frizz is bad.",
    "cn": "当然，这并不完全是理想的，有时可能预示着一个更大的问题，比如干燥、破损或潮湿，但并不是所有的毛躁都是不好的。",
    "src": "ELLE · 2026-09-09"
  },
  "son": {
    "en": "In 1960, Renoir’s son Claude sold the estate to the village of Cagnes, which turned it into a museum.",
    "cn": "1960年，雷诺阿的儿子克劳德将庄园卖给了卡涅斯村，并将其改建为博物馆。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "song": {
    "en": "“Each song carries a different place in that journey for me,” she says.",
    "cn": "她说：“对我来说，每首歌都代表着这段旅程中不同的地方。",
    "src": "Vogue · 2026-09-10"
  },
  "soon": {
    "en": "Soon, the researchers will use radiocarbon dating to figure out the skeleton’s exact age.",
    "cn": "很快，研究人员将使用放射性碳年代测定来确定骨骼的确切年龄。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "sophisticated": {
    "en": "If noir nails veer too gothic, try an ultra-deep adjacent shade for a rich color that looks sophisticated and glossy.",
    "cn": "如果黑色指甲太过哥特式，那就试试超深的相邻色调，这样颜色会显得丰富而有光泽。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "sort": {
    "en": "“I lived my life in one sort of way for quite a long time, and then things really flipped.",
    "cn": "“在很长一段时间里，我一直以一种方式生活，然后事情真的发生了变化。",
    "src": "Vogue · 2026-09-10"
  },
  "sound": {
    "en": "Yes, I realise I sound like your grandpa right now.",
    "cn": "是的，我知道我现在听起来像你的爷爷。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "sour": {
    "en": "In this pick-and-mix collection, it functioned like an eye-opening sour candy.",
    "cn": "在这个精选混合系列中，它就像一个大开眼界的酸糖。",
    "src": "Vogue · 2026-09-10"
  },
  "spanish": {
    "en": "The Spanish actors—who have been married for over 16 years and have worked together for nearly double that time—were on the clock in Venice, promoting their latest joint project, French filmmaker Florian Zeller’s Bunker.",
    "cn": "这对西班牙演员——他们已经结婚16年了，在一起工作的时间几乎是这16年的两倍——在威尼斯忙着宣传他们最新的合作项目，法国电影制片人弗洛里安·泽勒的《地堡》。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "span": {
    "en": "His work spans bestselling audio storytelling, animation and AI-based productions, including \"Space Vets\" and \"Tarmac.\"",
    "cn": "他的作品涵盖了畅销的有声故事、动画和基于人工智能的作品，包括《太空兽医》（Space Vets）和《停机坪》（Tarmac）。",
    "src": "Variety · 2026-09-10"
  },
  "something": {
    "en": "There’s something about the Venice Film Festival that makes every red carpet entrance feel especially cinematic.",
    "cn": "威尼斯电影节有一种特殊的感觉，让每一次红毯亮相都显得特别电影化。",
    "src": "ELLE · 2026-09-09"
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
    "en": "G ossip Cosmo Girl here, your one and only source into the scandalous lives of Manhattan’s elite...",
    "cn": "《时尚天后》在此，这是你了解曼哈顿名流们绯闻的唯一渠道…",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "someone": {
    "en": "And the hunter was someone important, Dąbrowski tells PAP, like a family clan leader.",
    "cn": "Dąbrowski告诉PAP ，猎人是一个重要的人物，就像一个家族领袖。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "somehow": {
    "en": "Soft, hazy, deliciously milky, the look takes the classic French and somehow makes it even more wearable, which I didn’t think was possible.",
    "cn": "柔和、朦胧、美味的乳白色，这款妆容融合了经典的法式风格，让它更耐穿，这在我看来是不可能的。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "socialism": {
    "en": "I'm always going to reject the extremes in socialism and that anti-American way of life.\"",
    "cn": "我总是会拒绝极端的社会主义和反美生活方式。",
    "src": "CBS News · 2026-09-10"
  },
  "social": {
    "en": "\"We are completely aware of the social and political situation, but it doesn't affect our general strategy,\" she says.",
    "cn": "“我们完全了解社会和政治形势，但这并不影响我们的总体战略，”她说。",
    "src": "Variety · 2026-09-10"
  },
  "soccer": {
    "en": "The team watched the siblings play “soccer” with each other and their mother, and in one instance, with two juvenile Cozumel dwarf coatis.",
    "cn": "研究小组观察了这对兄弟姐妹和它们的母亲一起踢“足球”，有一次，他们还和两只科苏梅尔矮长鼻浣熊幼崽一起踢足球。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "society": {
    "en": "“That poor administration helped trigger the revolt,” which ultimately evolved from a protest against unfair taxes into a broader push for a more equitable society.",
    "cn": "“那个糟糕的政府帮助引发了叛乱”，最终从对不公平税收的抗议演变为对更公平社会的更广泛推动。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "soft": {
    "en": "Makeup for all of the cast, including Bullock’s, mostly leaned soft and muted.",
    "cn": "包括布洛克在内的所有演员的妆容都很柔和。",
    "src": "ELLE · 2026-09-09"
  },
  "some": {
    "en": "He has deliberately given him some space because he knows it would have been a difficult situation.",
    "cn": "他故意给他一些空间，因为他知道这将是一个困难的局面。",
    "src": "Sky Sports · 2026-09-09"
  },
  "solve": {
    "en": "In their absence, Xabi Alonso paired Reece James with Romeo Lavia, but even when Caicedo returns to fitness, the Chelsea manager has a puzzle to solve before settling on his best midfield two.",
    "cn": "在两人缺阵的情况下，阿隆索让里斯·詹姆斯和拉维亚搭档，但即便凯塞多伤愈复出，主帅也要面对如何确定中场双后腰的问题。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "solution": {
    "en": "Valentín Barco is the other possible solution, but the Argentina midfielder has no Premier League experience having arrived from Strasbourg this summer, so again, he would be a gamble for Alonso.",
    "cn": "巴尔科是另一种可能的选择，但这位今夏从斯特拉斯堡加盟的阿根廷中场没有英超经验，对阿隆索而言同样是一场赌博。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "solid": {
    "en": "For short nails, we love a perfectly executed, solid-toned mani for a polished, minimalist aesthetic that works every time.”",
    "cn": "对于短指甲，我们喜欢完美的、纯色调的指甲，这是一种抛光的、极简主义的美学，每次都能奏效。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "soldier": {
    "en": "The ship, called the Po, was evacuating wounded Italian soldiers from Albania’s Vlora Bay on the night of March 14, 1941, when it was struck by a torpedo from a British Swordfish bomber.",
    "cn": "这艘名为Po的船于1941年3月14日晚上从阿尔巴尼亚的Vlora湾撤离受伤的意大利士兵，当时它被英国箭鱼轰炸机的鱼雷击中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "soil": {
    "en": "“Buried in sand, soil, or vegetation, the nest would stay humid or damp enough for the eggs to survive,” says Zelenitsky.",
    "cn": "Zelenitsky说：“巢穴被埋在沙子、土壤或植被中，会保持潮湿或潮湿，足以让卵子存活下来。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "spark": {
    "en": "As a world sales company, Jungle Book Studio can already envision ‘Angh’ setting the international buyers’ circuit alight and sparking a buzz across territories.",
    "cn": "作为一家全球销售公司，《奇幻森林》工作室已经预见到《Angh》将点燃国际买家的热情，并在各个地区掀起热潮。",
    "src": "Variety · 2026-09-10"
  },
  "signature": {
    "en": "For spring/summer 2027, the designer revisited his signature codes with an irreverent new mood.",
    "cn": "2027年春夏，这位设计师以一种不敬的新心情重新审视了他的标志性代码。",
    "src": "ELLE · 2026-09-09"
  },
  "sign": {
    "en": "When Rogers signed with Chelsea, he declared he was joining the biggest team in London.",
    "cn": "罗杰斯加盟切尔西时曾说，他加盟的是伦敦最大的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "seek": {
    "en": "Most New Yorkers might opt for a trench or a functional raincoat, but for those seeking some new outerwear, 3.1 Phillip Lim offers a delightful periwinkle vinyl jacket.",
    "cn": "大多数纽约人可能会选择风衣或功能性雨衣，但对于那些想要一些新外套的人来说，3.1 Phillip Lim提供了一件讨人喜欢的长春花乙烯基夹克。",
    "src": "Vogue · 2026-09-10"
  },
  "seem": {
    "en": "Premier League teams seem like they've forgotten what their wingers are supposed to do.",
    "cn": "但英超球队似乎已经忘了他们的边锋本该做什么。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "select": {
    "en": "He has repeatedly criticized the NFL's new rules for kickoffs, and in a Truth Social post last year, he lamented the fact that quarterback Shedeur Sanders wasn't selected in the first few rounds of the NFL draft.",
    "cn": "他一再批评NFL的新开球规则，在去年的Truth Social帖子中，他感叹四分卫Shedeur Sanders没有在NFL选秀的前几轮中被选中。",
    "src": "CBS News · 2026-09-10"
  },
  "selection": {
    "en": "Broadcast selections for November and early December will be announced before October 19.",
    "cn": "11月和12月初的选播名单将在19日之前公布。",
    "src": "Sky Sports · 2026-09-10"
  },
  "self": {
    "en": "What unlocks it is being a person who isn’t going to be self-conscious and not thinking about what everyone else is thinking about you.",
    "cn": "打开它的是做一个不自我意识的人，不去想别人怎么看你。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "sell": {
    "en": "Barcelona are looking to sell Frenkie de Jong when the January transfer window opens.",
    "cn": "巴塞罗那希望在1月转会窗口打开时出售Frenkie de Jong。",
    "src": "Sky Sports · 2026-09-09"
  },
  "senate": {
    "en": "If Fetterman were to switch parties, it would be harder for Democrats to reclaim the Senate majority.",
    "cn": "如果费特曼转换政党，民主党人将更难夺回参议院多数席位。",
    "src": "CBS News · 2026-09-10"
  },
  "send": {
    "en": "Send Vogue' s senior beauty & wellness editor an email at beauty@vogue.com.",
    "cn": "给《Vogue》的资深美容与健康编辑发邮件至beauty@vogue.com。",
    "src": "Vogue · 2026-09-10"
  },
  "senior": {
    "en": "Send Vogue' s senior beauty & wellness editor an email at beauty@vogue.com.",
    "cn": "给《Vogue》的资深美容与健康编辑发邮件至beauty@vogue.com。",
    "src": "Vogue · 2026-09-10"
  },
  "sense": {
    "en": "The bubonic plague contributed to a growing sense of dissatisfaction in the country in the mid-14th century.",
    "cn": "在14世纪中叶，腺鼠疫导致了该国日益增长的不满情绪。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "service": {
    "en": "In February, the couple — along with most other service members stationed at the base — were moved off post in preparation for Operation Epic Fury.",
    "cn": "今年2月，这对夫妇和驻扎在基地的大多数其他军人一起离开了岗位，为“史诗之怒”行动做准备。",
    "src": "CBS News · 2026-09-10"
  },
  "serve": {
    "en": "He was elected for a full term in 2022 and has served as governor for five years.",
    "cn": "他于2022年当选，并担任了5年的州长。",
    "src": "CBS News · 2026-09-10"
  },
  "serious": {
    "en": "If you’re looking to add some serious body to your hair in just one wash, the Olaplex Nº5 Fine Bond Maintenance Conditioner was made for you.",
    "cn": "如果您想在一次洗涤中为您的头发增添一些严肃的身材，Olaplex Nº5精细粘合维护护发素就是为您量身定做的。",
    "src": "ELLE · 2026-09-10"
  },
  "seed": {
    "en": "Key Ingredients: Camellia japonica seed oil, argan oil, and kelp extract Sizes: 6.76 fl oz",
    "cn": "主要成分：山茶籽油，摩洛哥坚果油，海带提取物；大小：6.76液盎司",
    "src": "ELLE · 2026-09-09"
  },
  "series": {
    "en": "Her superheroine short film \"Blake\" is now being developed by Dreamkite as an original series.",
    "cn": "她的超级女英雄短片“布莱克”现在正在Dreamkite作为原创系列开发。",
    "src": "Variety · 2026-09-10"
  },
  "september": {
    "en": "From anniversary celebrations to colorful updates, September is shaping up to be an exciting month in jewelry.",
    "cn": "从周年庆典到丰富多彩的更新，9月将成为珠宝界令人兴奋的一个月。",
    "src": "ELLE · 2026-09-09"
  },
  "separately": {
    "en": "It is some 68m long and is composed of several panels that were produced separately and then eventually sewn together to form one long whole.",
    "cn": "它长约68米，由几块面板组成，这些面板分别生产，然后最终缝合在一起形成一个长整体。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "separate": {
    "en": "Ahead, we spoke with a dermatologist and two plastic surgeons to separate fact from fiction.",
    "cn": "在此之前，我们采访了一位皮肤科医生和两位整形外科医生，以区分事实和虚构。",
    "src": "ELLE · 2026-09-09"
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
    "en": "We see enormous potential here, and I wanted to be part of building what comes next.",
    "cn": "我们在这里看到了巨大的潜力，我想成为未来发展的一部分。",
    "src": "Vogue · 2026-09-10"
  },
  "secure": {
    "en": "World sales are being handled by Sublimity, which has also secured several other international deals.",
    "cn": "Sublimity正在处理全球销售，该公司还获得了其他几项国际交易。",
    "src": "Variety · 2026-09-10"
  },
  "school": {
    "en": "Rio trained at the U.K.’s National Film and Television School and previously made a short film of the same name, which was honored with the Special Jury Award at Clermont-Ferrand.",
    "cn": "里约热内卢曾在英国国家电影电视学院接受培训，此前曾制作过一部同名短片，并获得克莱蒙费朗电影节评审团特别奖。",
    "src": "Variety · 2026-09-10"
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
  "scream": {
    "en": "It's True: These 10 End-of-Summer Nail Colors Scream \"I Have Impeccable Taste\"",
    "cn": "这是真的：这10种夏末指甲颜色表明“我的品味无可挑剔”",
    "src": "Who What Wear · 2026-09-10"
  },
  "screen": {
    "en": "Pattinson in Dior and a Jaeger-LeCoultre watch, and Waterhouse in Saint Laurent at the Primetime screening on September 5.",
    "cn": "帕丁森在9月5日的黄金时段放映会上身穿迪奥和积家手表，沃特豪斯身穿圣罗兰。",
    "src": "ELLE · 2026-09-09"
  },
  "sea": {
    "en": "Hours later, the U.S. military confirmed it conducted another deadly strike in the Caribbean Sea.",
    "cn": "几小时后，美国军方证实在加勒比海进行了另一次致命袭击。",
    "src": "CBS News · 2026-09-10"
  },
  "section": {
    "en": "To set the loose wave, Roszak used a 1.5-inch barrel curling iron, wrapping small sections away from the face to keep the wave modern rather than overly curled.",
    "cn": "为了做出蓬松的卷发，罗斯扎克用了一个1.5英寸的卷发棒，把头发从脸上绕开一小段，使波浪保持现代，而不是过度卷曲。",
    "src": "ELLE · 2026-09-09"
  },
  "secretary": {
    "en": "McKee, previously the lieutenant governor, was elevated to the top job after former Gov. Gina Raimondo became commerce secretary during the Biden administration.",
    "cn": "麦基之前是副州长，在前任州长之后被提升为最高职位，吉娜·雷蒙多在拜登政府期间担任商务部长。",
    "src": "CBS News · 2026-09-10"
  },
  "second": {
    "en": "After 77 seconds here, the Blues looked like they had made the right call as Rogers fired the visitors ahead.",
    "cn": "开场 77 秒之后，罗杰斯为客队先拔头筹，蓝军看上去做出了正确选择。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "security": {
    "en": "The president hit many of his familiar rally points during the speech, touting his record on border security, last year's tax legislation, his tariff-heavy approach to trade and his White House renovation kick — including his planned ballroom.",
    "cn": "总统在演讲中击中了他许多熟悉的集会点，吹嘘他在边境安全方面的记录，去年的税收立法，他的关税沉重的贸易方式以及他的白宫翻新计划—包括他计划的宴会厅。",
    "src": "CBS News · 2026-09-10"
  },
  "season": {
    "en": "“For the upcoming season, we’re seeing a massive surge toward deep, comforting color palettes,” she says.",
    "cn": "她说：“在即将到来的一季，我们将看到人们对深色调、舒适色调的大量偏好。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "search": {
    "en": "Chelsea mustered little in search of an equaliser before David Raya was forced into a fine late save from substitute Estêvão.",
    "cn": "切尔西没有组织起像样的反扑，倒是替补出场的埃斯特旺在最后阶段的射门迫使大卫·拉亚做出精彩扑救。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "seal": {
    "en": "An estimated 444 to 600 mature Mediterranean monk seals remain in the Mediterranean Sea and small areas of the Atlantic Ocean near northwest Africa.",
    "cn": "估计有444至600只成熟的地中海僧海豹留在地中海和非洲西北部附近的大西洋小区域。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "seat": {
    "en": "As guests like Viola Davis, Meghann Fahy, and Cynthia Erivo settled into their seats, the show opened with a head-to-toe white look.",
    "cn": "随着Viola Davis、Meghann Fahy和Cynthia Erivo等嘉宾入座，节目以从头到脚的白色开场。",
    "src": "ELLE · 2026-09-09"
  },
  "setting": {
    "en": "(The dreamy canals are, after all, the perfect setting for a bit of romance.)",
    "cn": "（毕竟，梦幻般的运河是浪漫的完美场所。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "settle": {
    "en": "As Taher settles into her role during a challenging time for the local industry, she speaks to Vogue about her other plans for the fashion council and what to expect from Dubai Fashion Week SS27.",
    "cn": "在当地行业面临挑战的时期，Taher逐渐适应了自己的角色，她向《Vogue》讲述了她对时尚委员会的其他计划，以及对迪拜SS27时装周的期待。",
    "src": "Vogue · 2026-09-10"
  },
  "ship": {
    "en": "Asked whether vessels would continue to be destroyed, Rubio replied: \"Well again, it depends, and we still blow up ships.\"",
    "cn": "当被问及船只是否会继续被摧毁时，卢比奥回答说：“好吧，这要看情况，我们仍然会炸毁船只。",
    "src": "CBS News · 2026-09-10"
  },
  "shirt": {
    "en": "She also designed a tulle T-shirt gown covered in a grid arrangement of beads—almost resembling tweed.",
    "cn": "她还设计了一件薄纱t恤礼服，上面覆盖着网格状的珠子——几乎像粗花呢。",
    "src": "Vogue · 2026-09-10"
  },
  "shoe": {
    "en": "Of course, numerous brands have reinterpreted the two-tone shoe over the last several decades.",
    "cn": "当然，在过去的几十年里，许多品牌重新诠释了双色鞋。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "shoot": {
    "en": "A comet shoots through the sky, which is deemed to be a bad omen for Harold.",
    "cn": "一颗彗星划过天空，这被认为是哈罗德的不祥之兆。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "shop": {
    "en": "Bobby Schuessler is a fashion editor with over 15 years of editorial experience covering shopping, style, and beauty.",
    "cn": "Bobby Schuessler是一位时尚编辑，拥有超过15年的购物，时尚和美容编辑经验。",
    "src": "Who What Wear · 2026-09-10"
  },
  "shopping": {
    "en": "Bobby Schuessler is a fashion editor with over 15 years of editorial experience covering shopping, style, and beauty.",
    "cn": "Bobby Schuessler是一位时尚编辑，拥有超过15年的购物，时尚和美容编辑经验。",
    "src": "Who What Wear · 2026-09-10"
  },
  "short": {
    "en": "When it comes to trends, short nails are not exempt from fleeting patterns and coveted fall colors.",
    "cn": "说到流行趋势，短指甲也不能幸免于转瞬即逝的图案和令人垂涎的秋天颜色。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "shortage": {
    "en": "For years now, Lhuillier has built a customer base around her embroidered or floral-print dresses or sweeping evening gowns, and there was no shortage of that drama for spring—but if you looked closer, you could see her clear attempts at stripping things back and refining.",
    "cn": "多年来，Lhuillier已经围绕她的刺绣或印花连衣裙或拖尾晚礼服建立了一个客户群，春季也不乏这种戏剧性——但如果你仔细观察，你会发现她明显在尝试剥离和提炼东西。",
    "src": "Vogue · 2026-09-10"
  },
  "shortcoming": {
    "en": "Jim Khork, along with his wife, Stacey, sat down for an exclusive interview with CBS News to share more about their grief, but also their frustrations about what they consider is a lack of accountability for military shortcomings ahead of the deadly attack.",
    "cn": "吉姆·霍克（Jim Khork）和他的妻子斯泰西（Stacey）坐下来接受了哥伦比亚广播公司新闻频道（CBS News）的独家采访，分享了更多他们的悲伤，但也表达了他们的沮丧，他们认为在致命袭击发生之前，军方的缺陷缺乏问责制。",
    "src": "CBS News · 2026-09-10"
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
  "shine": {
    "en": "Elevate your bare manicure with a sheer wash of rose-hued color; it adds a healthy tint and shine to otherwise pared-back tips.",
    "cn": "用玫瑰色的纯水洗一下你裸露的指甲；它可以为原本稀疏的头发增添健康的色泽和光泽。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "shut": {
    "en": "McKee's first full term has been plagued by the closure of the Washington Bridge, which was shut down in December 2023 after broken anchor rods were discovered.",
    "cn": "麦基的第一个完整任期一直受到华盛顿大桥关闭的困扰，该大桥于2023年12月因发现锚杆断裂而关闭。",
    "src": "CBS News · 2026-09-10"
  },
  "show": {
    "en": "\"Spring 2027 is an irreverent take on romance that creates a new elegance,\" Lauren stated in the show notes.",
    "cn": "“2027年春季是对浪漫的不敬，创造了一种新的优雅，”劳伦在节目说明中说。",
    "src": "Who What Wear · 2026-09-10"
  },
  "shift": {
    "en": "“Spiced Smudge is really a response to the shift we’re seeing away from overly bright, high-maintenance color,” says hairstylist Sara Botsford.",
    "cn": "发型师萨拉·博茨福德说：“我们看到，过度鲜艳、需要保养的头发颜色越来越少，香料涂抹是对这种趋势的回应。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "shall": {
    "en": "Alright, fashion friends, let's continue building that chic fall wardrobe, shall we?",
    "cn": "好了，时尚的朋友们，让我们继续打造时髦的秋季衣橱，好吗？",
    "src": "Who What Wear · 2026-09-10"
  },
  "shade": {
    "en": "These shades are versatile and luxurious, and they look incredible on all skin tones.",
    "cn": "这些颜色是通用的和豪华的，他们看起来不可思议的所有肤色。",
    "src": "Harper's Bazaar · 2026-09-09"
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
  "signal": {
    "en": "“In laboratory and early clinical work, exosomes appear to calm inflammatory signaling that can contribute to thinning, support the dermal papilla cells that regulate the hair cycle, and encourage follicles to re-enter the active growth phase,” she continues.",
    "cn": "“在实验室和早期临床工作中，外泌体似乎可以平息导致头发变薄的炎症信号，支持调节头发周期的真皮乳头细胞，并鼓励毛囊重新进入活跃的生长阶段，”她继续说。",
    "src": "ELLE · 2026-09-09"
  },
  "share": {
    "en": "She shares the coolest, most desirable fashion market finds and brands for every budget.",
    "cn": "她分享了最酷、最令人向往的时尚市场发现和各种预算的品牌。",
    "src": "Who What Wear · 2026-09-10"
  },
  "shelter": {
    "en": "The findings suggest that the Po has transformed into an artificial reef, providing habitat and shelter for a diverse range of marine life.",
    "cn": "研究结果表明，Po已经变成了一个人工珊瑚礁，为各种海洋生物提供了栖息地和庇护所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "shell": {
    "en": "Cooper has held senior leadership roles in talent and organizational development across companies including Shell, Barclays, Christie’s, and Lloyds, with a firm grasp on hiring.",
    "cn": "库珀曾在壳牌（Shell）、巴克莱（Barclays）、佳士得（Christie’s）和劳埃德（Lloyds）等公司担任人才和组织发展方面的高级领导职务，对招聘有着深刻的把握。",
    "src": "Vogue · 2026-09-10"
  },
  "sheet": {
    "en": "“The metal sheets provide a hard substrate for marine life to grow on,” lead author Simone Modugno, a marine biologist with the Institute for Research, Development and Experimentation on the Environment and Territory, tells BBC Wildlife magazine ’s Helen Pilcher.",
    "cn": "“金属板为海洋生物的生长提供了坚硬的基础，”环境与领土研究、开发和实验研究所的海洋生物学家Simone Modugno告诉英国广播公司野生动物杂志的海伦·皮尔彻。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "shape": {
    "en": "From anniversary celebrations to colorful updates, September is shaping up to be an exciting month in jewelry.",
    "cn": "从周年庆典到丰富多彩的更新，9月将成为珠宝界令人兴奋的一个月。",
    "src": "ELLE · 2026-09-09"
  },
  "shed": {
    "en": "But before the review was underway, a CBS News investigation began shedding light on what several survivors of the attack described as \"strategic failures\" ahead of, during and after the strike.",
    "cn": "但在审查开始之前，哥伦比亚广播公司新闻频道（CBS News）的一项调查开始揭示了几名袭击幸存者所说的在袭击之前、期间和之后的“战略失败”。",
    "src": "CBS News · 2026-09-10"
  },
  "she": {
    "en": "In the study, “we’ve shown that animals kiss and when it could have evolved in the primates,” she says.",
    "cn": "她说：“在这项研究中，我们已经证明了动物接吻以及它何时可以在灵长类动物中进化。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "sharp": {
    "en": "Excavations in Poland have unearthed a 5,000-year-old grave, complete with a man’s skeleton, two other skulls, amber beads, a flint knife, a stone ax and a necklace made of 42 sharp teeth.",
    "cn": "波兰的挖掘工作发现了一座5000年前的坟墓，其中包括一具男子骨骼、另外两具头骨、琥珀珠、一把火石刀、一把石斧和一条由42颗锋利的牙齿制成的项链。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "lip": {
    "en": "It’s a dark and sultry gourmand, often photographed with leather jackets and glossy lips.",
    "cn": "这是一个黑暗而闷热的美食家，经常穿着皮夹克和光滑的嘴唇拍照。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "sparkle": {
    "en": "Safe Word is a series highlighting the latest trends in the jewelry market, keeping you up to date on all things that sparkle and shine.",
    "cn": "安全词汇是一个系列，突出了珠宝市场的最新趋势，让你在所有闪耀和闪耀的东西上保持最新。",
    "src": "ELLE · 2026-09-09"
  },
  "speak": {
    "en": "Speaking after talks with President Daniel Noboa in Quito, Rubio said the operations would continue.",
    "cn": "卢比奥在基多与总统丹尼尔·诺波亚会谈后表示，行动将继续进行。",
    "src": "CBS News · 2026-09-10"
  },
  "sum": {
    "en": "The state of winger play in 2026 is best summed up by Manchester City's move for Iliman Ndiaye.",
    "cn": "2026 年边锋生态的最好写照，就是曼城签下伊利曼·恩迪亚耶。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "summer": {
    "en": "Michelle Rhee’s spring collection comes at a particularly great time, after a rainy summer in New York.",
    "cn": "米歇尔·李（Michelle Rhee）的春季系列在纽约一个多雨的夏天之后，恰逢其时。",
    "src": "Vogue · 2026-09-10"
  },
  "sunday": {
    "en": "Chelsea took the lead early on at the Premier League champions on Sunday through Morgan Rogers.",
    "cn": "周日做客英超卫冕冠军的比赛中，切尔西凭借摩根·罗杰斯的闪击早早取得领先。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "sunny": {
    "en": "There was a honeymoon across Italy; Lipa helming her Sunny Hill Festival before putting in some studio time in Stockholm —hopefully cooking up the soundtrack to summer 2027; and Turner promoting One Night Only while, allegedly, testing for the small matter of becoming the next James Bond.",
    "cn": "我们在意大利度了蜜月；利帕在斯德哥尔摩的录音室工作之前，正在主持她的Sunny Hill音乐节，希望能为2027年夏天制作配乐；特纳在宣传《007：只爱一夜》的同时，据称是在为成为下一个詹姆斯·邦德这件小事做测试。",
    "src": "Vogue · 2026-09-10"
  },
  "sunrise": {
    "en": "The burglars entered Cagnes-sur-Mer’s Renoir Museum, housed in the estate where the famed Impressionist spent the last decade of his life, before sunrise this morning.",
    "cn": "在今天早晨日出之前，窃贼进入了梅尔河畔卡涅的雷诺阿博物馆，该博物馆位于著名印象派画家雷诺阿度过生命最后十年的地方。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "sunset": {
    "en": "From coordinating red-carpet looks to indulging in sunset gondola rides, the entertainment industry’s favorite pairs have been making the most of their time in Italy—and it’s easy to see why.",
    "cn": "从协调的红毯造型到沉迷于日落缆车，娱乐圈最受欢迎的一对情侣在意大利度过了最愉快的时光，原因很容易理解。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "super": {
    "en": "It works like a spray, meaning it’s super lightweight and doesn’t require any washing.",
    "cn": "它像喷雾一样工作，这意味着它非常轻，不需要任何洗涤。",
    "src": "ELLE · 2026-09-09"
  },
  "surprising": {
    "en": "Organized by the company Improbable Research, the spoof awards were designed to “honor achievements so surprising that they make people laugh, then think,” per their website.",
    "cn": "这些欺骗性奖项由Improbable Research公司组织，旨在“表彰令人惊讶的成就，让人们发笑，然后思考”，根据他们的网站。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "surprise": {
    "en": "John Fetterman appeared in a surprise video at the Republican Party's midterm convention on Wednesday, as he becomes increasingly isolated from his own party.",
    "cn": "约翰·费特曼（John Fetterman）周三在共和党中期大会上出现了一段令人惊讶的视频，因为他越来越孤立于自己的政党。",
    "src": "CBS News · 2026-09-10"
  },
  "surgery": {
    "en": "Touted for their potential to help rejuvenate and heal the skin, including after surgery, it was only a matter of time before they crossed over into the realm of hair care, too.",
    "cn": "它们被吹捧有潜力帮助皮肤恢复活力和愈合，包括在手术后，它们也会进入护发领域，这只是时间问题。",
    "src": "ELLE · 2026-09-09"
  },
  "surgeon": {
    "en": "Exosomes, or extracellular vesicles, are essentially “tiny membrane-bound packets that cells release to communicate with one another,” says New York-based plastic surgeon Dr. Yael Halaas.",
    "cn": "外泌体，或细胞外囊泡，本质上是“细胞释放的微小膜结合包，用于相互交流，”纽约整形外科医生耶尔·哈拉斯博士说。",
    "src": "ELLE · 2026-09-09"
  },
  "surface": {
    "en": "They found that sponges, sea squirts, mussels, oysters and algae covered most of the vessel’s surface, while amberjacks, sea bass, wrasse, scorpionfish, goby and other species of fish floated in and around the ship.",
    "cn": "他们发现，海绵、海鞘、贻贝、牡蛎和藻类覆盖了船舶的大部分表面，而琥珀杰克鱼、海鲈、皱纹鱼、蝎子鱼、高比鱼和其他鱼类则漂浮在船内和周围。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "suit": {
    "en": "She posed with her husband, who was dressed in a classic navy-blue suit.",
    "cn": "她和丈夫合影，丈夫穿着一套经典的海军蓝西装。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "supreme": {
    "en": "Immediately following the 8th Circuit Court's ruling, People not Politicians appealed the case to the U.S. Supreme Court.",
    "cn": "在第八巡回法院作出裁决后，People not Politicians立即向美国最高法院提出上诉。",
    "src": "CBS News · 2026-09-10"
  },
  "suppose": {
    "en": "Premier League teams seem like they've forgotten what their wingers are supposed to do.",
    "cn": "但英超球队似乎已经忘了他们的边锋本该做什么。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "support": {
    "en": "Sylvia Nitzsche: A Berlin-based director and creative technologist specializing in AI-supported storytelling.",
    "cn": "西尔维娅·尼采：柏林导演和创意技术专家，专门从事人工智能支持的故事讲述。",
    "src": "Variety · 2026-09-10"
  },
  "supplement": {
    "en": "During Wednesday's speech, Mr. Trump likened the payments to his Trump Account child investment funds, which were authorized by Congress, and last year's \"warrior dividend\" bonuses to U.S. service members, which were funded through a military housing supplement approved by lawmakers.",
    "cn": "在周三的演讲中，特朗普将这些款项比作国会授权的特朗普账户儿童投资基金，以及去年向美国军人提供的“勇士红利”奖金，这些奖金是通过立法者批准的军事住房补贴提供资金的。",
    "src": "CBS News · 2026-09-10"
  },
  "supper": {
    "en": "After supper, we danced with Livia in our arms.",
    "cn": "晚饭后，我们搂着利维娅跳舞。",
    "src": "Vogue · 2026-09-10"
  },
  "sure": {
    "en": "The task for Alonso is clear -- tighten up at the back to make sure Chelsea push for the title.",
    "cn": "阿隆索的任务很明确——必须加强防守，才能让切尔西真正具备争冠实力。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "surprisingly": {
    "en": "Now, because there's no UV lamp, gel, or elaborate nail art involved, it's surprisingly easy to recreate at home.",
    "cn": "现在，由于不需要紫外线灯、凝胶或复杂的美甲工艺，在家就可以轻松制作。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "study": {
    "en": "In the study, “we’ve shown that animals kiss and when it could have evolved in the primates,” she says.",
    "cn": "她说：“在这项研究中，我们已经证明了动物接吻以及它何时可以在灵长类动物中进化。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "stuff": {
    "en": "“I think it’s a mix of some of the stuff that I would think was the tackiest things ever, ” she said of the collection.",
    "cn": "“我认为它混合了一些我认为是有史以来最俗气的东西，”她谈到这个系列时说。",
    "src": "Vogue · 2026-09-10"
  },
  "style": {
    "en": "To emulate this ease, Belghiran created loose, knotted ponytails in two different styles.",
    "cn": "为了模仿这种轻松，Belghiran创造了两种不同风格的宽松打结马尾。",
    "src": "ELLE · 2026-09-09"
  },
  "subsequent": {
    "en": "From the second of two subsequent corners, Muharemovic rises highest at the back post to nod the opener back inside the opposite corner.",
    "cn": "从接下来的两个角落中的第二个角落，穆哈雷莫维奇在后柱上升得最高，向对角内的揭幕战点头。",
    "src": "Sky Sports · 2026-09-09"
  },
  "substitute": {
    "en": "Chelsea mustered little in search of an equaliser before David Raya was forced into a fine late save from substitute Estêvão.",
    "cn": "切尔西没有组织起像样的反扑，倒是替补出场的埃斯特旺在最后阶段的射门迫使大卫·拉亚做出精彩扑救。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "suburb": {
    "en": "Rebuilding the bridge — a crucial link between the state capital of Providence and its eastern suburbs — is now estimated to cost $427 million and is scheduled to be completed in November 2028.",
    "cn": "这座连接州首府普罗维登斯和东部郊区的桥梁目前估计耗资4.27亿美元，计划于2028年11月完工。",
    "src": "CBS News · 2026-09-10"
  },
  "sufficient": {
    "en": "Rights groups, fishermen and their relatives have questioned the campaign, alleging vessels were targeted without sufficient evidence of links to trafficking.",
    "cn": "人权组织、渔民及其亲属对这一行动提出质疑，声称船只在没有充分证据证明与贩运有关的情况下就成为目标。",
    "src": "CBS News · 2026-09-10"
  },
  "suffer": {
    "en": "After those two, there is England veteran Jordan Henderson, now 36, who is still sidelined with the broken wrist suffered when falling over an advertising board at the World Cup.",
    "cn": "除了他们两人之外，还有 36 岁的英格兰老将亨德森，他因在世界杯期间撞到广告牌手腕骨折，目前仍在养伤。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "suddenly": {
    "en": "She was suddenly moving through unfamiliar, decidedly more glamorous rooms than she was used to, and walking the runway for Ann Demeulemeester—but she was also broke.",
    "cn": "她突然在陌生的房间里走动，显然比她习惯的房间更迷人，并为安·德梅斯特（Ann demeulemeester）走秀——但她也破产了。",
    "src": "Vogue · 2026-09-10"
  },
  "sudden": {
    "en": "\"Nobody was asking for it, all of a sudden their players came into the game.",
    "cn": "“没有人要求它，突然他们的球员进入了比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "suggest": {
    "en": "There were times during the tournament when life must have felt a little wild, I suggest.",
    "cn": "我建议，在比赛期间，生活一定感觉有点狂野。",
    "src": "Sky Sports · 2026-09-09"
  },
  "such": {
    "en": "And under the direction of the brilliant Robert Hastie, I couldn’t be more delighted to be joining such an original and wildly ambitious show.",
    "cn": "在才华横溢的罗伯特·海斯蒂的指导下，我非常高兴能加入这样一部原创而雄心勃勃的电视剧。",
    "src": "Variety · 2026-09-10"
  },
  "succession": {
    "en": "The Gunners should have won by a bigger margin but missed a succession of chances before Odegaard crashed a low shot in off the post from the edge of the box following intricate build-up.",
    "cn": "枪手本应以更大的优势获胜，但错过了一系列机会，然后厄德高在错综复杂的积累后从禁区边缘击中了低射门。",
    "src": "Sky Sports · 2026-09-09"
  },
  "successful": {
    "en": "Her career includes internationally successful titles including the Oscar-winning \"La Vie En Rose,\" \"Asterix at the Olympic Games,\" \"My Blind Date With Life,\" which sold to 54 countries, and the RTL+ event series \"Herzogpark.\"",
    "cn": "她的职业生涯包括获得奥斯卡奖的《玫瑰人生》、《奥运会上的阿斯特里克斯》、在54个国家销售的《我与生命的相亲》以及RTL+活动系列《赫尔佐格公园》等在国际上取得成功的作品。",
    "src": "Variety · 2026-09-10"
  },
  "success": {
    "en": "You know, the success of that fragrance has really blown us all away.",
    "cn": "你知道吗，那款香水的成功真的让我们大吃一惊。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "take": {
    "en": "The defending champions did take the lead after the break as Baur tapped in from Haissem Hassan's cross.",
    "cn": "休息后，卫冕冠军确实取得了领先，鲍尔从海塞姆·哈桑的十字架上踢了进来。",
    "src": "Sky Sports · 2026-09-09"
  },
  "tale": {
    "en": "Vertical has acquired U.S. distribution rights to \"Sanctuary,\" an English-language, post-apocalyptic thriller starring \"The Handmaid's Tale's\" Nina Kiri.",
    "cn": "Vertical已获得“Sanctuary”的美国发行权，这是一部由“The Handmaid's Tale”的Nina Kiri主演的英语后世界末日惊悚片。",
    "src": "Variety · 2026-09-10"
  },
  "talent": {
    "en": "Laura Weir leads a talented and dedicated team.",
    "cn": "劳拉·威尔领导着一支才华横溢、敬业的团队。",
    "src": "Vogue · 2026-09-10"
  },
  "talk": {
    "en": "There was Donald Trump - there was always going to be - and the changing-room team talk.",
    "cn": "唐纳德·特朗普（Donald Trump）-总是会有-和更衣室团队的谈话。",
    "src": "Sky Sports · 2026-09-09"
  },
  "tame": {
    "en": "The right formula, however, can make all the difference by adding hydration without heaviness, taming frizz without stealing volume, and leaving your hair soft, shiny, and full of life.",
    "cn": "然而，正确的配方可以通过增加水分而不会产生沉重感，驯服卷曲而不会窃取体积，并让您的头发柔软，有光泽，充满活力。",
    "src": "ELLE · 2026-09-10"
  },
  "tan": {
    "en": "Her brunette hair was worn glossy and straight, while bronzed makeup made the most of what remains of her seemingly endless vacation tan.",
    "cn": "她乌黑的头发梳得又直又亮，古铜色的妆容充分利用了她似乎无穷无尽的假期晒黑的余韵。",
    "src": "Vogue · 2026-09-10"
  },
  "tank": {
    "en": "The show notes highlighted some of the collection's best clothes meant to be worn after dark: \"Evening offers a bounty of options: fluid wrap dress, engineered with only a single seam; shimmering navy tank dress covered in micro sequins that release into fringe over trousers; poetic, embroidered velvet robe over ethereal white blouse and gesso-painted floral-print jeans.\"",
    "cn": "秀场说明重点介绍了该系列中一些适合在天黑后穿的最佳服装：“晚上有很多选择：流畅的裹身裙，只有一条缝；闪闪发光的海军蓝背心裙，上面镶着微亮片，露出裤子的流苏；诗情画意的刺绣天鹅绒长袍，飘逸的白色衬衫和石膏印花牛仔裤。",
    "src": "Who What Wear · 2026-09-10"
  },
  "tap": {
    "en": "The defending champions did take the lead after the break as Baur tapped in from Haissem Hassan's cross.",
    "cn": "休息后，卫冕冠军确实取得了领先，鲍尔从海塞姆·哈桑的十字架上踢了进来。",
    "src": "Sky Sports · 2026-09-09"
  },
  "tape": {
    "en": "Keshet International is globally distributing the tape and format.",
    "cn": "凯舍特国际公司正在全球分销磁带和格式。",
    "src": "Variety · 2026-09-10"
  },
  "target": {
    "en": "The best leave-in conditioner for you will target and fix that cause.",
    "cn": "最好的免洗护发素会针对并解决这个问题。",
    "src": "ELLE · 2026-09-09"
  },
  "task": {
    "en": "The task for Alonso is clear -- tighten up at the back to make sure Chelsea push for the title.",
    "cn": "阿隆索的任务很明确——必须加强防守，才能让切尔西真正具备争冠实力。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "taste": {
    "en": "Maybe it’s the water taxis, the grand palazzos, or the fact that the festival has long attracted stars with a taste for fashion as considered as the films they’re there to promote.",
    "cn": "也许是因为水上出租车，也许是因为宏伟的宫殿，也许是因为这个电影节长期以来一直吸引着那些对时尚有品味的明星，就像他们在那里宣传的电影一样。",
    "src": "ELLE · 2026-09-09"
  },
  "tax": {
    "en": "The U.S. has brought in just under $500 billion in tariff and excise tax revenue since the start of last year, according to the Bipartisan Policy Center.",
    "cn": "根据两党政策中心的数据，自去年年初以来，美国的关税和消费税收入略低于5000亿美元。",
    "src": "CBS News · 2026-09-10"
  },
  "telegraph": {
    "en": "Nearly 70 years later, the two-tone motif still telegraphs a sense of everyday elegance.",
    "cn": "近70年后，双色主题仍然传达出日常优雅的感觉。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "teenager": {
    "en": "Teenagers and retirees alike broadcast before-and-after pictures and trade their “ stacks,” or custom combinations of peptides, like recipes.",
    "cn": "青少年和退休人员都会播放之前和之后的图片，并交换他们的“堆栈”，或肽的定制组合，如食谱。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "technology": {
    "en": "Albert Bozesan: A Munich-based filmmaker, writer and former head of creative technology at Storybook Studios.",
    "cn": "Albert Bozesan：慕尼黑电影制作人，作家，Storybook Studios前创意技术主管。",
    "src": "Variety · 2026-09-10"
  },
  "technique": {
    "en": "Hand-painted and burnout techniques make for highs and lows of color intensity, giving silk lames and velvets an aged patina.",
    "cn": "手绘和烧光技术使色彩强度高低起伏，使丝绸和天鹅绒呈现出一种古老的光泽。",
    "src": "Who What Wear · 2026-09-10"
  },
  "team": {
    "en": "Every story we publish has been thoroughly researched and vetted by our team of editors and industry experts.",
    "cn": "我们发布的每一个故事都经过我们的编辑团队和行业专家的彻底研究和审查。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "technical": {
    "en": "“It functions as rainwear and is made of a technical fabric, but the jacket actually has a leathery cool look to it,” said Rhee.",
    "cn": "他说：“它的功能是雨衣，由一种技术面料制成，但这件夹克实际上有一种皮革般的酷感。",
    "src": "Vogue · 2026-09-10"
  },
  "tail": {
    "en": "Elsewhere, a slim jacquard jacket, cut away with a tail at the back, and a blouse finished with a ruffled Victorian collar added a touch of Old World romanticism.",
    "cn": "在其他地方，一件修身的提花夹克，背面有一条尾巴，一件衬衫饰有折边的维多利亚时代领子，增添了一丝旧世界的浪漫主义。",
    "src": "ELLE · 2026-09-09"
  },
  "swear": {
    "en": "The tapestry does not explain precisely what the nature of the oath is, but other Norman-inclined sources tell us that Harold was swearing to be William’s man in England and to uphold his bid to be king on Edward’s death.",
    "cn": "挂毯上并没有准确地解释誓言的性质，但其他倾向于诺曼的资料告诉我们，哈罗德在英格兰发誓要做威廉的人，并在爱德华死后坚持他的王位。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "sweater": {
    "en": "This necklace will look stunning with simple sweaters and opulent dresses alike.",
    "cn": "这条项链搭配简单的毛衣和华丽的裙子都很漂亮。",
    "src": "Who What Wear · 2026-09-10"
  },
  "suspend": {
    "en": "At the time, he was asked about his role in getting the Balogun suspension suspended, and he admitted the \"politics and manipulation\" did overshadow the game against Belgium.",
    "cn": "当时，他被问及他在暂停Balogun停赛中的作用，他承认“政治和操纵”确实掩盖了对比利时的比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "suspect": {
    "en": "Secretary of State Marco Rubio defended controversial strikes on suspected drug-trafficking boats during a visit to Ecuador on Wednesday, arguing Latin American cartels would \"eat these countries alive\" if left unchecked.",
    "cn": "美国国务卿卢比奥星期三在访问厄瓜多尔期间为有争议的打击涉嫌贩毒船只的行动进行了辩护，他说，如果不加以控制，拉美贩毒集团将“把这些国家活活吃掉”。",
    "src": "CBS News · 2026-09-10"
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
    "en": "If you have fine hair, you know the struggle: One wrong conditioner and your strands fall flat before you even leave the house.",
    "cn": "如果你的头发很细，你就知道如何挣扎：一个错误的护发素和你的绳子在你离开房子之前就掉平了。",
    "src": "ELLE · 2026-09-10"
  },
  "table": {
    "en": "“I always keep my perfume right by the door, like on the entryway table,” Alisha adds.",
    "cn": "“我总是把香水放在门边，比如入口处的桌子上，”阿丽莎补充道。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "system": {
    "en": "That's the way the system's supposed to work …",
    "cn": "这就是这个系统应该运行的方式…",
    "src": "CBS News · 2026-09-09"
  },
  "sweet": {
    "en": "It’s an irresistibly sweet perfume with strawberry, coffee, vanilla, and jasmine—and it’s just begging to be worn on a night out.",
    "cn": "这是一款令人难以抗拒的甜味香水，混合了草莓、咖啡、香草和茉莉花的香味，适合晚上外出时使用。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "switch": {
    "en": "He has denied that he is considering switching parties.",
    "cn": "他否认他正在考虑换党派。",
    "src": "CBS News · 2026-09-10"
  },
  "swing": {
    "en": "The ambitious, English-language feature marks a big swing for Telekom Srbija's TS Media.",
    "cn": "这个雄心勃勃的英语功能标志着Telekom Srbija的TS Media的一个大转变。",
    "src": "Variety · 2026-09-10"
  },
  "structure": {
    "en": "For spring she used lawn chair webbing for structure and decoration.",
    "cn": "在春天，她用草坪椅织带作为结构和装饰。",
    "src": "Vogue · 2026-09-10"
  },
  "spread": {
    "en": "The turbulence has spread to the country's film and television industries, with many professionals claiming they've been shut out by state-backed media over their political beliefs.",
    "cn": "这场动荡已经蔓延到中国的影视行业，许多专业人士称，他们因为自己的政治信仰而被国有媒体拒之门外。",
    "src": "Variety · 2026-09-10"
  },
  "spring": {
    "en": "I felt that energy a lot in these pieces,” said Giovanna Flores of her unconstrained and dreamy spring collection.",
    "cn": "我在这些作品中感受到了很多能量，”乔凡娜·弗洛雷斯（Giovanna Flores）谈起她无拘无束、梦幻般的春季系列时说。",
    "src": "Vogue · 2026-09-10"
  },
  "square": {
    "en": "Still, some of her pieces required being more fully committed, like the black, squared-neck gown finished with oversized-pearl shoulder straps.",
    "cn": "不过，她的一些作品需要更充分的投入，比如用超大珍珠肩带装饰的黑色方领礼服。",
    "src": "Vogue · 2026-09-10"
  },
  "squirrel": {
    "en": "The film is produced by Nancy Nisa Beso through her shingle Winter Hymns Films and Rio through his Undercover Squirrel outfit.",
    "cn": "这部电影由南希·尼萨·贝索（Nancy Nisa Beso）通过她的新公司Winter hyms Films制作，并通过他的卧底松鼠服装制作b里约热内卢。",
    "src": "Variety · 2026-09-10"
  },
  "stack": {
    "en": "Adjustable necklaces adapt to different necklines, while pared-back cuffs, stacking rings, and necklaces are made for easy layering.",
    "cn": "可调节的项链适应不同的领口，而缩减袖口，堆叠戒指，项链是为了方便分层。",
    "src": "ELLE · 2026-09-09"
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
    "en": "\"The U.S. Army is committed to transparency and respecting the privacy of our Gold Star Families.",
    "cn": "“美国陆军致力于透明度和尊重我们的金星家庭的隐私。",
    "src": "CBS News · 2026-09-10"
  },
  "standard": {
    "en": "Now, unlike your standard polish or gel appointment, this centuries-old Japanese technique is less about adding color and more about making your actual nails look ridiculously healthy and shiny.",
    "cn": "现在，与你的标准指甲油或凝胶预约不同，这种有几个世纪历史的日本技术不是为了增加颜色，而是为了让你的指甲看起来健康而闪亮。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "spray": {
    "en": "It works like a spray, meaning it’s super lightweight and doesn’t require any washing.",
    "cn": "它像喷雾一样工作，这意味着它非常轻，不需要任何洗涤。",
    "src": "ELLE · 2026-09-09"
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
    "en": "Spotted: Pamela Anderson in New York City's Upper East Side, with a manicure so good it deserves its own anonymous tip line.",
    "cn": "现场报道：帕梅拉·安德森（Pamela Anderson）在纽约上东区，她的指甲修得太好了，应该有自己的匿名举报热线。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "sport": {
    "en": "The president continued: \"It's not going to go down as the greatest trade in the history of sports.",
    "cn": "总统继续说道：“它不会成为体育史上最伟大的贸易。",
    "src": "CBS News · 2026-09-10"
  },
  "speaker": {
    "en": "Her uncle and grandfather, Chris and Thomas Dodd, were both senators, and she was endorsed by former House Speaker Nancy Pelosi, who was her mother's college roommate.",
    "cn": "她的叔叔和祖父克里斯·多德（Chris Dodd）和托马斯·多德（Thomas Dodd）都是参议员，她得到了前众议院议长南希·佩洛西（Nancy Pelosi）的支持，佩洛西是她母亲的大学室友。",
    "src": "CBS News · 2026-09-10"
  },
  "special": {
    "en": "Curators are hosting talks and special events throughout the exhibition run, while a programme of activities for schools and families ensures the Tapestry’s story reaches the widest possible audience.",
    "cn": "策展人在整个展览期间举办讲座和特别活动，同时为学校和家庭举办活动，确保挂毯的故事尽可能多地吸引观众。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "specialist": {
    "en": "While his fiancée was moved out of the country, Khork was among a few dozen specialists moved to a tactical operations center at the Port of Shuaiba.",
    "cn": "当他的未婚妻被转移到国外时，霍尔克是被转移到帅巴港战术行动中心的几十名专家之一。",
    "src": "CBS News · 2026-09-10"
  },
  "specialize": {
    "en": "Sylvia Nitzsche: A Berlin-based director and creative technologist specializing in AI-supported storytelling.",
    "cn": "西尔维娅·尼采：柏林导演和创意技术专家，专门从事人工智能支持的故事讲述。",
    "src": "Variety · 2026-09-10"
  },
  "specially": {
    "en": "For the first time, the Tapestry is being displayed flat and in one continuous length inside a specially constructed showcase, allowing visitors to appreciate its full scale and intricate detail as never before.",
    "cn": "这是挂毯第一次在一个特别建造的展柜里以一个连续的长度平面展示，让游客前所未有地欣赏它的完整尺寸和复杂的细节。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "specific": {
    "en": "Sophia Stel has a very specific memory from last year’s Paris Fashion Week.",
    "cn": "索菲亚·斯特尔（Sophia Stel）对去年的巴黎时装周有着非常特别的记忆。",
    "src": "Vogue · 2026-09-10"
  },
  "speech": {
    "en": "President Trump's rally-style speech at the Republican National Committee midterm convention touched on oil, Iran, immigration, the economy — and the polarizing NBA trade that sent superstar guard Luka Dončić from the Dallas Mavericks to the Los Angeles Lakers last year.",
    "cn": "特朗普总统在共和党全国委员会中期大会上的集会式演讲涉及石油、伊朗、移民、经济，以及去年将超级明星后卫Luka Dončić从达拉斯小牛队送到洛杉矶湖人队的两极分化NBA交易。",
    "src": "CBS News · 2026-09-10"
  },
  "speed": {
    "en": "After carving out a deep side part, Abergel used the ghd Speed hairdryer and a round brush to smooth out Kidman’s damp hair and create lift and volume.",
    "cn": "在剪出较深的侧分后，阿伯格尔用ghd Speed吹风机和圆刷把基德曼潮湿的头发弄平，让头发蓬松起来。",
    "src": "ELLE · 2026-09-09"
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
  "split": {
    "en": "“Knowledge alone is not enough – it also takes unwavering mental strength, strategic thinking, and the ability to make split-second decisions under pressure,” she said.",
    "cn": "她说：“光有知识是不够的，还需要坚定的精神力量、战略思维和在压力下瞬间做出决定的能力。",
    "src": "Variety · 2026-09-10"
  },
  "spin": {
    "en": "Louis Vuitton is bringing bold color to its watchmaking lineup with five new Tambour Spin Time references joining the permanent collection.",
    "cn": "路易威登（Louis Vuitton）为其制表系列带来了大胆的色彩，五款新的Tambour Spin Time系列加入了其永久系列。",
    "src": "ELLE · 2026-09-09"
  },
  "spider": {
    "en": "Featuristic Films' recent credits include underwater survival thriller \"Breathe Deep,\" starring Ingrid Torelli (\"Late Night With the Devil\"), Michiel Huisman (\"The Haunting of Hill House\") and Avani Gregg (\"Spider Island\"), and crime drama “Salvable,” starring Shia LaBeouf (\"Fury\"), Toby Kebbell (\"RocknRolla\") and James Cosmo (\"Braveheart\").",
    "cn": "故事片最近的作品包括水下生存惊悚片《深呼吸》，由英格丽·托雷利（《与魔鬼的深夜》）、迈克尔·豪斯曼（《鬼屋惊魂》）和阿瓦尼·格雷格（《蜘蛛岛》）主演，以及犯罪片《可救之星》，由希亚·拉博夫（《愤怒》）、托比·凯贝尔（《摇滚》）和詹姆斯·科斯莫（《勇敢的心》）主演。",
    "src": "Variety · 2026-09-10"
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
    "en": "“I am honored to take on the role of chair of the British Fashion Council,” Cooper said in a statement.",
    "cn": "库珀在一份声明中说：“我很荣幸能担任英国时尚协会主席。",
    "src": "Vogue · 2026-09-10"
  },
  "storage": {
    "en": "The bikinis may finally be heading back into storage, but if last night is anything to go by, Lipa’s fashion month wardrobe is more than ready to take over.",
    "cn": "比基尼可能终于要回到仓库了，但如果昨晚的事情可以借鉴的话，Lipa的时装月衣橱已经准备好接管了。",
    "src": "Vogue · 2026-09-10"
  },
  "store": {
    "en": "Next March, we can only anticipate even more, but luckily for customers that’s also when the spring collections will be in stores.",
    "cn": "明年3月，我们只能期待更多，但对顾客来说幸运的是，那也是春季系列上市的时候。",
    "src": "Vogue · 2026-09-10"
  },
  "story": {
    "en": "“‘Skag & Bone' is a deeply human coming-of-age story trapped inside a relentless urban nightmare,\" Boru said.",
    "cn": "“《Skag & Bone》是一个深刻的人类成长故事，被困在无情的城市噩梦中，”博鲁说。",
    "src": "Variety · 2026-09-10"
  },
  "straight": {
    "en": "McAlear beats McGregor and sets up Steven, but his effort is straight at Celtic keeper Johnstone.",
    "cn": "McAlear击败了McGregor并设置了Steven ，但他的努力是直接在凯尔特人守门员Johnstone。",
    "src": "Sky Sports · 2026-09-09"
  },
  "strap": {
    "en": "For the Bunker photo call, the star wore an ankle-length black number with Blazy’s signature feather accents adorning the straps.",
    "cn": "为了拍摄邦克的照片，这位明星穿了一件及脚踝的黑色礼服，带子上装饰着布拉齐标志性的羽毛。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "strategy": {
    "en": "Fetterman has, at times, distanced himself from the Democrats, backing Mr. Trump's strategy in Iran and breaking with congressional Democrats in last year's government shutdown fight.",
    "cn": "费特曼有时会与民主党人保持距离，支持特朗普在伊朗问题上的战略，并在去年的政府停摆斗争中与国会民主党人决裂。",
    "src": "CBS News · 2026-09-10"
  },
  "straw": {
    "en": "Straw boater hats were some of my favorite accessories this season, but I also appreciated the impressive range of chic brooches, floral scarves, white handbags, oversized clutches, lace-up flats, delicate strappy heels, and more.",
    "cn": "草帽是这一季我最喜欢的配饰之一，但我也很欣赏那些令人印象深刻的别致胸针、花围巾、白色手袋、超大手包、系带平底鞋、精致的绑带高跟鞋等等。",
    "src": "Who What Wear · 2026-09-10"
  },
  "strawberry": {
    "en": "It’s an irresistibly sweet perfume with strawberry, coffee, vanilla, and jasmine—and it’s just begging to be worn on a night out.",
    "cn": "这是一款令人难以抗拒的甜味香水，混合了草莓、咖啡、香草和茉莉花的香味，适合晚上外出时使用。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "stream": {
    "en": "A project might end up as a film, a TV series, a streaming title, a book, a game, a soundtrack, a licensed product or an immersive experience, wherever it fits best internationally.",
    "cn": "一个项目最终可能会变成电影、电视剧、流媒体标题、书籍、游戏、配乐、授权产品或沉浸式体验，只要它最适合国际市场。",
    "src": "Variety · 2026-09-10"
  },
  "strong": {
    "en": "With strong experience in cross-sector advisory, Cooper has worked between business, government and culture.",
    "cn": "库博拥有丰富的跨部门咨询经验，曾在商业、政府和文化领域工作。",
    "src": "Vogue · 2026-09-10"
  },
  "stroke": {
    "en": "After a debilitating stroke leaves Maria unable to work, Younger is forced to become both provider and protector.",
    "cn": "在衰弱的中风使Maria无法工作后，Younger被迫成为提供者和保护者。",
    "src": "Variety · 2026-09-10"
  },
  "stripe": {
    "en": "Over 20 years ago, Natalia Vodianova (pictured below, left side) wore a long coat with delicate florals in between pastel stripes, while today's show featured a similar Bridgerton -worthy jacket that was cropped in the front and long in the back.",
    "cn": "20多年前，娜塔莉亚·沃佳诺娃（natalie Vodianova）（下图左）穿了一件在柔和条纹之间点缀着精致花朵的长外套，而今天的秀场上，她穿了一件类似于布里奇顿风格的外套，前襟剪短，后襟修长。",
    "src": "Who What Wear · 2026-09-10"
  },
  "strip": {
    "en": "She aimed to simplify and strip down her signature assortment of cocktail dresses and gowns, wondering if her fanciful creations could be less, well, froo-froo.",
    "cn": "她的目标是简化和精简她标志性的各种鸡尾酒礼服和礼服，想知道她的幻想创作是否可以少一些，嗯，froo-froo。",
    "src": "Vogue · 2026-09-10"
  },
  "string": {
    "en": "“Although the string or cord connecting them has not survived, there is no doubt that this was an ornament made by human hands.”",
    "cn": "“虽然连接它们的绳子或绳索没有存活下来，但毫无疑问，这是人手制作的装饰品。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "strike": {
    "en": "Martin Odegaard's superb strike gave Arsenal a deserved 1-0 victory over Napoli in their Champions League opener.",
    "cn": "马丁·厄德高（Martin Odegaard）出色的罢工让阿森纳在冠军联赛揭幕战中以1比0战胜了那不勒斯。",
    "src": "Sky Sports · 2026-09-09"
  },
  "stretch": {
    "en": "Excluding penalties, he has found the back of the net 11 times for Everton over that stretch.",
    "cn": "扣除点球，他在埃弗顿这段时间的英超进球只有 11 个。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "stress": {
    "en": "To lose control and to let go of the stress of the day.",
    "cn": "失去控制，释放一天的压力。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "strengthen": {
    "en": "We want to use this technology responsibly, strengthen European sovereignty and create stories that inspire audiences around the world.\"",
    "cn": "我们希望负责任地使用这项技术，加强欧洲主权，并创造能够激励全世界观众的故事。",
    "src": "Variety · 2026-09-10"
  },
  "strength": {
    "en": "When you get a late winner, it illustrates the strength, fitness and character of the team.",
    "cn": "当你得到一个迟到的获胜者时，它说明了团队的力量、健康和品格。",
    "src": "Sky Sports · 2026-09-09"
  },
  "street": {
    "en": "Recently on the streets of NYC, Pamela debuted what might just be the chicest interpretation of a French manicure I’ve seen in a while: cloudy French nails.",
    "cn": "最近在纽约街头，帕梅拉展示了一种可能是我这段时间见过的对法式美甲最优雅的诠释：浑浊的法式指甲。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "steel": {
    "en": "Mr. Trump cleared the way last year for U.S. Steel to be acquired by Japan-based Nippon Steel.",
    "cn": "特朗普去年为美国钢铁(U.S. Steel)被日本新日铁(Nippon Steel)收购扫清了道路。",
    "src": "CBS News · 2026-09-10"
  },
  "steal": {
    "en": "“The police intervention and the museum’s alarms caused the robbers to rush and steal only 4 of the 12 works from the Renoir Museum.”",
    "cn": "警察的介入和博物馆的警报使得劫匪们冲了过去，只偷走了雷诺阿博物馆12件作品中的4件。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "status": {
    "en": "Other researchers, working around the same time in the nearby village of Iwiny, separately unearthed a high-status funerary site filled with beads, axes and flint tools.",
    "cn": "其他研究人员大约在同一时间在附近的Iwiny村工作，分别发掘了一个高地位的葬礼遗址，里面装满了珠子、斧头和燧石工具。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "station": {
    "en": "I turned on the radio, NPR: the local station frequently played music, cheaper than airing national shows, but they carried the 9 a.m. five-minute national news.",
    "cn": "我打开了美国国家公共电台（NPR）的广播：地方电台经常播放音乐，比播放全国性节目便宜，但他们播放早上9点的5分钟全国性新闻。",
    "src": "Vogue · 2026-09-10"
  },
  "stay": {
    "en": "We don’t know what they talk about, but it’s presumably discussing his stay in Normandy.",
    "cn": "我们不知道他们谈了些什么，但大概是在讨论他在诺曼底的逗留。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "stock": {
    "en": "I have a feeling this beautiful beaded Zara skirt won't stay in stock for long.",
    "cn": "我有一种感觉，这条漂亮的扎拉珠裙不会在库存中停留太久。",
    "src": "Who What Wear · 2026-09-10"
  },
  "step": {
    "en": "We're making good steps but we'd like to be able to win a bit more comfortably and at more ease.",
    "cn": "我们正在迈出良好的步伐，但我们希望能够更舒适、更轻松地赢得比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "stimulate": {
    "en": "He points to popular platelet-rich plasma (PRP) as one such therapy, which uses concentrated platelets from a patient’s own blood to stimulate weakened follicles.",
    "cn": "他指出，流行的富血小板血浆（PRP）就是一种这样的治疗方法，它使用患者自身血液中的浓缩血小板来刺激衰弱的卵泡。",
    "src": "ELLE · 2026-09-09"
  },
  "stiff": {
    "en": "Once dry, he worked in small-to-medium sections using the ghd Chronos Curve Grand Iron to wind the hair in a consistent direction to build a full, voluminous curl pattern “reminiscent of Nicole’s own ’90s curls — defined but never stiff, with real body behind it,” says Abergel.",
    "cn": "一旦头发干了，他就用gd Chronos Curve Grand Iron把头发分小到中等大小的部分以一致的方向卷起来，形成一个丰满的卷发图案，“让人想起妮可自己90年代的卷发——轮廓分明，但从不僵硬，背后有真实的身体，”阿伯格尔说。",
    "src": "ELLE · 2026-09-09"
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
    "en": "The Greatest Album of All Time is Stel’s attempt to capture that whiplash while it is still happening.",
    "cn": "史上最伟大的专辑是斯泰尔试图捕捉到的鞭打，当它还在发生。",
    "src": "Vogue · 2026-09-10"
  },
  "commit": {
    "en": "Whether you’re a gel-x devotee or you’re committed to a regular manicure, cloudy French tips can be done with any type of polish.",
    "cn": "无论你是美甲啫喱爱好者还是普通美甲爱好者，多云的法式美甲都可以用任何类型的指甲油来完成。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "committee": {
    "en": "President Trump's rally-style speech at the Republican National Committee midterm convention touched on oil, Iran, immigration, the economy — and the polarizing NBA trade that sent superstar guard Luka Dončić from the Dallas Mavericks to the Los Angeles Lakers last year.",
    "cn": "特朗普总统在共和党全国委员会中期大会上的集会式演讲涉及石油、伊朗、移民、经济，以及去年将超级明星后卫Luka Dončić从达拉斯小牛队送到洛杉矶湖人队的两极分化NBA交易。",
    "src": "CBS News · 2026-09-10"
  },
  "common": {
    "en": "Because, well, I'm a common-sense Democrat,\" the Pennsylvania senator said in a one-minute prerecorded video introducing GOP Sen. Dave McCormick of Pennsylvania.",
    "cn": "因为，好吧，我是一个常识性的民主党人，”这位宾夕法尼亚州参议员在介绍共和党参议员的一分钟预先录制的视频中说，宾夕法尼亚州的Dave McCormick。",
    "src": "CBS News · 2026-09-10"
  },
  "commonly": {
    "en": "In contrast, exosomes can be harvested directly from plants or from donated animal or human cell tissue—including bone marrow and blood, but most commonly fat, amniotic fluid, and placental tissue, Dr. Wise says.",
    "cn": "怀斯博士说，相比之下，外泌体可以直接从植物或捐赠的动物或人类细胞组织中获取，包括骨髓和血液，但最常见的是脂肪、羊水和胎盘组织。",
    "src": "ELLE · 2026-09-09"
  },
  "communicate": {
    "en": "Exosomes, or extracellular vesicles, are essentially “tiny membrane-bound packets that cells release to communicate with one another,” says New York-based plastic surgeon Dr. Yael Halaas.",
    "cn": "外泌体，或细胞外囊泡，本质上是“细胞释放的微小膜结合包，用于相互交流，”纽约整形外科医生耶尔·哈拉斯博士说。",
    "src": "ELLE · 2026-09-09"
  },
  "communication": {
    "en": "“A well-groomed manicure is a silent form of communication,” Hurtado said of the look.",
    "cn": "“精心修剪的指甲是一种无声的交流方式，”赫尔塔多说。",
    "src": "Vogue · 2026-09-10"
  },
  "community": {
    "en": "Current executive board member Caroline Issa has been appointed as deputy chair, a new post put in place to support and vouch for the UK’s designer community, drawing on her relationships across the sector.",
    "cn": "现任执行董事会成员卡洛琳·伊萨（Caroline Issa）被任命为副主席，这是一个新的职位，旨在利用她在整个行业的关系，为英国的设计师群体提供支持和担保。",
    "src": "Vogue · 2026-09-10"
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
  "compel": {
    "en": "Mohammed said: “At first, I didn’t want to believe that a series of fictional plays based on ‘The Traitors’ could ever contain as many brilliant twists and turns as the real thing – or be quite as compelling.",
    "cn": "默罕默德说：“一开始，我不愿意相信根据《叛徒》改编的一系列虚构戏剧会像真实故事一样包含那么多精彩的转折，或者像真实故事一样引人入胜。",
    "src": "Variety · 2026-09-10"
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
  "component": {
    "en": "“They’re one of the more exciting areas in hair regeneration research because they potentially influence multiple components of the follicular microenvironment at once, rather than only targeting a single pathway.”",
    "cn": "“它们是头发再生研究中更令人兴奋的领域之一，因为它们有可能同时影响毛囊微环境的多个组成部分，而不是只针对单一途径。",
    "src": "ELLE · 2026-09-09"
  },
  "complete": {
    "en": "She followed it up with a chiffon sky-blue gown, complete with a fitted strapless bodice and detachable shoulder cape.",
    "cn": "随后，她又穿了一件天蓝色雪纺礼服，搭配合身的无肩带紧身胸衣和可拆卸的披肩。",
    "src": "Vogue · 2026-09-10"
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
    "en": "\"We are completely aware that we come from a small country,\" she says.",
    "cn": "她说：“我们完全意识到我们来自一个小国。",
    "src": "Variety · 2026-09-10"
  },
  "commercial": {
    "en": "Florian Meimberg: A commercials director and early pioneer of AI-driven filmmaking.",
    "cn": "弗洛里安·梅姆伯格：广告导演，人工智能驱动电影制作的早期先驱。",
    "src": "Variety · 2026-09-10"
  },
  "comment": {
    "en": "Barnes did not respond to multiple requests for comment, while a spokeswoman for the 103rd Sustainment Command directed all questions to the Pentagon.",
    "cn": "巴恩斯没有回应多次置评请求，而第103维持司令部的一名女发言人则将所有问题都转给了五角大楼。",
    "src": "CBS News · 2026-09-10"
  },
  "coach": {
    "en": "It is still early in the season, but Arteta will be encouraged by the sight of his coaching coming to the fore in open play.",
    "cn": "赛季才刚刚开始，但阿尔特塔看到球队在运动战中也能展现自己的战术思路，应该会感到欣慰。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "coarse": {
    "en": "Ingredients like camellia japonica seed oil, argan oil, and kelp extract make UNOVE’s Ampule Treatment especially great for rehydrating and repairing thick, coarse, and damaged hair.",
    "cn": "山茶花籽油、摩洛哥坚果油和海带提取物等成分使UNOVE的安珀护理产品特别适合滋润和修复浓密、粗糙和受损的头发。",
    "src": "ELLE · 2026-09-09"
  },
  "coast": {
    "en": "Fewer than 200 mature individuals roam the island in the Caribbean Sea, off the east coast of the Yucatán Peninsula.",
    "cn": "不到200只成年个体在Yucatán半岛东海岸的加勒比海岛屿上游荡。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "coat": {
    "en": "I can't help but feel cooler with a rich coat of espresso, navy, or olive on my nails.",
    "cn": "在指甲上涂上浓咖啡、海军蓝或橄榄色，我忍不住觉得更凉爽。",
    "src": "Who What Wear · 2026-09-10"
  },
  "code": {
    "en": "Together, they recalled the six-decade-old codes that have made his brand a New York Fashion Week fixture—and, more broadly, a shorthand for American style.",
    "cn": "他们一起回顾了六十年来使他的品牌成为纽约时装周常客，以及更广泛意义上成为美国风格的代名词的准则。",
    "src": "ELLE · 2026-09-09"
  },
  "coffee": {
    "en": "I woke before my husband, James, before the baby—not early; we’d been up in the night—and went to the kitchen to make coffee.",
    "cn": "我醒得比我丈夫詹姆斯早，比孩子早——不早；我们通宵未眠，去厨房煮咖啡。",
    "src": "Vogue · 2026-09-10"
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
    "en": "Balogun has been in the headlines again over the past few weeks after his proposed move from Monaco to Everton collapsed late on Deadline Day.",
    "cn": "Balogun在截止日期当天晚些时候从摩纳哥搬到埃弗顿的提议崩溃后，过去几周再次成为头条新闻。",
    "src": "Sky Sports · 2026-09-09"
  },
  "collar": {
    "en": "Distressed denim was slung low on the hips and paired with a midriff-baring jacket lined with a shearling collar.",
    "cn": "做旧的牛仔布挂在臀部低处，搭配一件衬有羊毛领的裸露夹克。",
    "src": "ELLE · 2026-09-09"
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
    "en": "But one of the collection’s best pieces was the lightweight denim biker jacket, which will come in two washes.",
    "cn": "但该系列最好的单品之一是轻便的牛仔机车夹克，可洗两次。",
    "src": "Vogue · 2026-09-10"
  },
  "command": {
    "en": "They found that opportunity with the Iowa-based 103rd Sustainment Command, where Khork would serve as deputy force protection officer for nine months at Camp Arifjan in Kuwait.",
    "cn": "他们在爱荷华州的第103维持司令部找到了这个机会，霍尔克将在科威特的阿里夫詹营地担任9个月的副部队保护官。",
    "src": "CBS News · 2026-09-10"
  },
  "comfortable": {
    "en": "A formal-feeling design, in something as comfortable as a T-shirt.",
    "cn": "一种正式感的设计，像t恤一样舒适。",
    "src": "Vogue · 2026-09-10"
  },
  "comfort": {
    "en": "Below, find the 20 best short nail designs for a tidy, modern manicure that doesn’t compromise on comfort or convenience.",
    "cn": "下面是20种最好的短指甲设计，让你既整洁又现代，又不牺牲舒适和方便。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "come": {
    "en": "Now, when it comes to relationships, I prefer my lines considerably clearer (no situationships for me, please).",
    "cn": "现在，当涉及到人际关系时，我更喜欢我的线条清晰得多（请不要给我任何情况）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "combine": {
    "en": "“Doron, Yoav and Ariel have created a thrilling, emotionally charged series that combines a deeply human story with cinematic scale,\" said Karni Ziv, head of drama at Keshet 12.",
    "cn": "“多伦、约阿夫和阿里尔创造了一部惊心动魄、充满情感的电视剧，将深刻的人类故事与电影规模相结合，”凯舍特12的戏剧主管卡尼·齐夫说。",
    "src": "Variety · 2026-09-10"
  },
  "commerce": {
    "en": "McKee, previously the lieutenant governor, was elevated to the top job after former Gov. Gina Raimondo became commerce secretary during the Biden administration.",
    "cn": "麦基之前是副州长，在前任州长之后被提升为最高职位，吉娜·雷蒙多在拜登政府期间担任商务部长。",
    "src": "CBS News · 2026-09-10"
  },
  "combination": {
    "en": "Arteta also highlighted how fresh combinations with team-mates are playing a part.",
    "cn": "Arteta还强调了与队友的新组合是如何发挥作用的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "color": {
    "en": "“This will change up your color while still keeping it natural and not being drastic.”",
    "cn": "“这会改变你的肤色，同时保持自然而不夸张。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "college": {
    "en": "We lived in Northampton, MA; I’d just begun my second year as a visiting writer at Amherst College; our daughter Livia, our first child, was only seven weeks old.",
    "cn": "我们住在马萨诸塞州的北安普顿；我刚开始在阿默斯特学院做访问作家的第二年；我们的女儿利维娅，我们的第一个孩子，只有七周大。",
    "src": "Vogue · 2026-09-10"
  },
  "conquest": {
    "en": "If so, the end panels might have shown William being crowned king of England, as that was the ultimate consequence of the Conquest.",
    "cn": "如果是这样，最后的镶板可能显示威廉被加冕为英格兰国王，因为这是征服的最终结果。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "conscious": {
    "en": "What unlocks it is being a person who isn’t going to be self-conscious and not thinking about what everyone else is thinking about you.",
    "cn": "打开它的是做一个不自我意识的人，不去想别人怎么看你。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "conservative": {
    "en": "Hailing a new generation of conservative leaders emerging across the region who are allied with President Trump, Rubio said Washington was finding partners willing to be \"very aggressive\" against criminal groups.",
    "cn": "卢比奥称赞该地区新一代与特朗普总统结盟的保守派领导人，他说，华盛顿正在寻找愿意对犯罪集团“非常积极”的合作伙伴。",
    "src": "CBS News · 2026-09-10"
  },
  "consider": {
    "en": "Dubai is often considered the fashion capital of the Gulf region.",
    "cn": "迪拜通常被认为是海湾地区的时尚之都。",
    "src": "Vogue · 2026-09-10"
  },
  "considerable": {
    "en": "Then we get to the battle of Hastings itself, which is portrayed in considerable detail.",
    "cn": "接下来是黑斯廷斯战役，书中对其进行了相当详细的描述。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "constant": {
    "en": "After harrowing hours in front of the television—the third plane crash, in Pennsylvania; the towers falling, one after the other; the constant replays of the same horrifying footage; the pervasive chaos—we turned it off and went for a walk.",
    "cn": "在电视机前痛苦地看了几个小时后——第三架飞机坠毁，在宾夕法尼亚州；塔楼一个接一个地倒塌；不断重播同样的恐怖镜头；无处不在的混乱——我们关掉电视，出去散步。",
    "src": "Vogue · 2026-09-10"
  },
  "content": {
    "en": "He also works on branded content initiatives, with brands including Gucci, Nordstrom, Sunglass Hut, Cartier, and Old Navy.",
    "cn": "他还参与品牌内容项目，合作品牌包括Gucci、Nordstrom、Sunglass Hut、Cartier和Old Navy。",
    "src": "Who What Wear · 2026-09-10"
  },
  "construction": {
    "en": "An intricate woven construction lightens a fluffy, ombr&eacute; shearling vest.",
    "cn": "一个复杂的编织结构减轻了蓬松，ombr毛背心。",
    "src": "Who What Wear · 2026-09-10"
  },
  "construct": {
    "en": "For the first time, the Tapestry is being displayed flat and in one continuous length inside a specially constructed showcase, allowing visitors to appreciate its full scale and intricate detail as never before.",
    "cn": "这是挂毯第一次在一个特别建造的展柜里以一个连续的长度平面展示，让游客前所未有地欣赏它的完整尺寸和复杂的细节。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "contain": {
    "en": "“Some lightweight conditioners even contain proteins or thickening agents that plump up the strands, making hair thicker and healthier.”",
    "cn": "“一些轻质护发素甚至含有蛋白质或增稠剂，使头发更浓密、更健康。",
    "src": "ELLE · 2026-09-10"
  },
  "connection": {
    "en": "His previous credits include “Faith Connections,” which sold in more than 20 territories following its Toronto premiere; “Angry Indian Goddesses,” released theatrically in more than 67 countries and licensed worldwide by Netflix; “Beyond the Known World,” the first official India-New Zealand co-production; and “Stolen,” a Venice selection that received a global release on Prime Video.",
    "cn": "他之前的作品包括《信仰联系》（Faith Connections），在多伦多首映后在20多个地区销售；《愤怒的印度女神》（Angry Indian goddess）在超过67个国家上映，由Netflix在全球范围内授权；《超越已知世界》（Beyond the Known World），这是印度和新西兰首次正式合作制作的影片；威尼斯精选影片《偷走》（Stolen）在Prime Video上全球上映。",
    "src": "Variety · 2026-09-10"
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
  "congress": {
    "en": "The president did not offer details on how the payments — which he dubbed \"Trump Dividends\" — would work, including whether he plans to ask Congress to authorize the checks.",
    "cn": "总统没有提供有关付款（他称之为“特朗普股息”）如何运作的细节，包括他是否计划要求国会授权支票。",
    "src": "CBS News · 2026-09-10"
  },
  "confusion": {
    "en": "His decision has added further confusion about which boundaries will be used in November.",
    "cn": "他的决定进一步混淆了11月将使用哪些边界。",
    "src": "CBS News · 2026-09-10"
  },
  "confirm": {
    "en": "The Army confirmed to the Khorks and CBS News that its probe into the deadly Iranian attack was completed in early July, but they have yet to release it.",
    "cn": "美国陆军向霍克和哥伦比亚广播公司证实，对伊朗致命袭击的调查已于7月初完成，但他们尚未公布调查结果。",
    "src": "CBS News · 2026-09-10"
  },
  "confidence": {
    "en": "\"We played with confidence, there was not even a chance for them, then the referee decided to give a penalty.",
    "cn": "“我们充满信心地踢球，他们甚至没有机会，然后裁判决定点球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "conference": {
    "en": "\"First of all he needs to be available and last year he missed so many games through injuries,\" said Arteta when asked in his post-match press conference about Odegaard's improvement.",
    "cn": "“首先，他需要有空，去年他因伤缺席了很多比赛，”Arteta在赛后新闻发布会上被问及Odegaard的改进时说道。",
    "src": "Sky Sports · 2026-09-09"
  },
  "conduct": {
    "en": "Since Mr. Trump returned to power, the U.S. has conducted airstrikes against vessels plying known trafficking routes in the Caribbean and eastern Pacific.",
    "cn": "自特朗普重新掌权以来，美国对在加勒比海和东太平洋航行的已知贩运路线的船只进行了空袭。",
    "src": "CBS News · 2026-09-10"
  },
  "club": {
    "en": "It also follows consultation with the Football Supporters' Association and representatives from club Fan Advisory Boards.",
    "cn": "这也是在与足球支持者协会和俱乐部球迷顾问委员会的代表进行磋商之后做出的决定。",
    "src": "Sky Sports · 2026-09-10"
  },
  "cloudy": {
    "en": "Recently on the streets of NYC, Pamela debuted what might just be the chicest interpretation of a French manicure I’ve seen in a while: cloudy French nails.",
    "cn": "最近在纽约街头，帕梅拉展示了一种可能是我这段时间见过的对法式美甲最优雅的诠释：浑浊的法式指甲。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "central": {
    "en": "U.S. Army Central and Third Army ordered the Pentagon probe \"to determine the facts and circumstances\" of the Iranian attack.",
    "cn": "美国陆军中央和第三军命令五角大楼调查伊朗袭击的“事实和情况”。",
    "src": "CBS News · 2026-09-10"
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
    "en": "\"We are talking about terrorists who, in many cases, possess weapons and equipment resembling the national armies of certain countries,\" Rubio said.",
    "cn": "卢比奥说：“我们谈论的是恐怖分子，他们在很多情况下拥有类似某些国家军队的武器和装备。",
    "src": "CBS News · 2026-09-10"
  },
  "certainly": {
    "en": "“It’s certainly one of my proudest life achievements.”",
    "cn": "“这无疑是我一生中最自豪的成就之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "chain": {
    "en": "Simply put, peptides are short chains of amino acids—the building blocks of proteins—that carry specific instructions to specific cells.",
    "cn": "简而言之，肽是氨基酸的短链（蛋白质的组成部分），可向特定细胞传递特定的指令。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "chair": {
    "en": "For spring she used lawn chair webbing for structure and decoration.",
    "cn": "在春天，她用草坪椅织带作为结构和装饰。",
    "src": "Vogue · 2026-09-10"
  },
  "chalk": {
    "en": "It used to be: get chalk on your heels, stay wide, wait for a pass, dribble past your full-back, and cross the ball into the big striker in the box.",
    "cn": "从前，边锋的任务是这样的：在鞋底沾满草粉之后，留在边路，等待传球，突破对面的边后卫，然后把球传中给禁区里的高中锋。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "chamber": {
    "en": "In vintage Dolce & Gabbana at The Echo Chamber screening on September 6.",
    "cn": "9月6日，杜嘉班纳在回声室的放映会上。",
    "src": "ELLE · 2026-09-09"
  },
  "champion": {
    "en": "Chelsea took the lead early on at the Premier League champions on Sunday through Morgan Rogers.",
    "cn": "周日做客英超卫冕冠军的比赛中，切尔西凭借摩根·罗杰斯的闪击早早取得领先。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "chance": {
    "en": "Pandur comes up on top in a one-on-one as Fraser spurns the chance of the game.",
    "cn": "Pandur在一对一的比赛中名列前茅，因为Fraser拒绝了比赛的机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "change": {
    "en": "When a neighboring cell takes up an exosome, it receives a set of instructions that can change how that cell behaves.”",
    "cn": "当邻近细胞吸收外泌体时，它会收到一组可以改变细胞行为的指令。",
    "src": "ELLE · 2026-09-09"
  },
  "cheek": {
    "en": "Makeup artist Sabrina Bedrani painted very light pink shades on Bullock’s cheeks and lips and went heavier and darker with the eyeliner and mascara, being careful to keep the eye look out of smoky territory.",
    "cn": "化妆师萨布丽娜·贝德拉尼在布洛克的脸颊和嘴唇上涂了浅粉色，然后用眼线笔和睫毛膏涂得更浓更黑，小心翼翼地让眼睛看起来不像烟熏的区域。",
    "src": "ELLE · 2026-09-09"
  },
  "check": {
    "en": "He has floated the idea of cutting checks to U.S. citizens in the past, proposing $2,000 dividends funded by tariffs last year.",
    "cn": "他过去曾提出过削减美国公民支票的想法，去年提出了由关税资助的2,000 $股息。",
    "src": "CBS News · 2026-09-10"
  },
  "cheat": {
    "en": "Wealthier individuals were also more likely to lie at work and cheat during games.",
    "cn": "较富有的人也更有可能在工作中撒谎，在游戏中作弊。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "chase": {
    "en": "“K2 is about creating a pipeline rather than chasing individual projects,” said Guliani.",
    "cn": "“K2是关于建立管道，而不是追逐单个项目，”古利亚尼说。",
    "src": "Variety · 2026-09-10"
  },
  "charge": {
    "en": "“Doron, Yoav and Ariel have created a thrilling, emotionally charged series that combines a deeply human story with cinematic scale,\" said Karni Ziv, head of drama at Keshet 12.",
    "cn": "“多伦、约阿夫和阿里尔创造了一部惊心动魄、充满情感的电视剧，将深刻的人类故事与电影规模相结合，”凯舍特12的戏剧主管卡尼·齐夫说。",
    "src": "Variety · 2026-09-10"
  },
  "characteristic": {
    "en": "The find may be linked to the Corded Ware culture, named for the twisted-rope impressions that are characteristic of its ceramic pottery.",
    "cn": "这一发现可能与Corded Ware文化有关，Corded Ware文化以陶瓷陶器特有的扭绳印记命名。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "character": {
    "en": "\"It's about ways of dressing that celebrate ingenuity, originality, and character—the freedom and fun of creating a style that is truly personal.\"",
    "cn": "“这是一种庆祝独创性、独创性和个性的着装方式——创造真正个人风格的自由和乐趣。",
    "src": "Who What Wear · 2026-09-10"
  },
  "chapter": {
    "en": "“While Portofino ’97 is all about falling in love and the rush of infatuation, Hotel Portofino is inspired by the same trip [David and I took] in 1997, but this is a new chapter about staying in love and the deeper echo of enduring love,” she tells Bazaar of her newest extrait fragrance in the Victoria Beckham Beauty lineup, Hotel Portofino extrait perfume.",
    "cn": "“虽然97年的波托菲诺是关于坠入爱河和迷恋的，但波托菲诺酒店的灵感来自于1997年（大卫和我）的同一次旅行，但这是一个关于保持爱和持久爱的更深回声的新篇章，”她告诉芭莎，她在维多利亚·贝克汉姆美容系列中最新的高级香水，波托菲诺酒店香水。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "channel": {
    "en": "The ships cross the Channel and the Norman army establishes itself on English soil.",
    "cn": "船队越过英吉利海峡，诺曼军队在英国领土上建立了自己的军队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "cement": {
    "en": "Jennifer Aniston has spent decades cementing herself as the hair muse—from 'The Rachel' to her famously glossy, face-framing layers.",
    "cn": "珍妮弗·安妮斯顿（Jennifer Aniston）花了几十年时间巩固自己的发型缪斯地位——从“瑞秋”（the Rachel）到她那出了名的有光泽的、修饰脸型的分层发型。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "career": {
    "en": "She has cited her 25-year career as evidence that she can make healthcare more accessible.",
    "cn": "她以自己25年的职业生涯为例，证明她可以让医疗服务更容易获得。",
    "src": "CBS News · 2026-09-10"
  },
  "careful": {
    "en": "Makeup artist Sabrina Bedrani painted very light pink shades on Bullock’s cheeks and lips and went heavier and darker with the eyeliner and mascara, being careful to keep the eye look out of smoky territory.",
    "cn": "化妆师萨布丽娜·贝德拉尼在布洛克的脸颊和嘴唇上涂了浅粉色，然后用眼线笔和睫毛膏涂得更浓更黑，小心翼翼地让眼睛看起来不像烟熏的区域。",
    "src": "ELLE · 2026-09-09"
  },
  "carpet": {
    "en": "Might Pieter Mulier’s new vision for Versace continue to take shape on the red carpet?",
    "cn": "彼得·穆利尔（Pieter Mulier）对范思哲（Versace）的新设想会在红毯上继续成形吗？",
    "src": "ELLE · 2026-09-09"
  },
  "carry": {
    "en": "Simply put, peptides are short chains of amino acids—the building blocks of proteins—that carry specific instructions to specific cells.",
    "cn": "简而言之，肽是氨基酸的短链（蛋白质的组成部分），可向特定细胞传递特定的指令。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "case": {
    "en": "Immediately following the 8th Circuit Court's ruling, People not Politicians appealed the case to the U.S. Supreme Court.",
    "cn": "在第八巡回法院作出裁决后，People not Politicians立即向美国最高法院提出上诉。",
    "src": "CBS News · 2026-09-10"
  },
  "cast": {
    "en": "Bringing together an international and domestic cast and a remarkable Serbian crew allowed us to make something that feels both rooted here and genuinely global.\"",
    "cn": "将国际和国内演员以及出色的塞尔维亚工作人员聚集在一起，使我们能够制作出既植根于此又真正全球化的东西。",
    "src": "Variety · 2026-09-10"
  },
  "cell": {
    "en": "Put another way: “Human cells speak the language human follicles understand,” Dr. Halaas says.",
    "cn": "换句话说：“人类细胞会说人类卵泡能理解的语言，”哈拉斯博士说。",
    "src": "ELLE · 2026-09-09"
  },
  "celebrate": {
    "en": "“It’s about ways of dressing that celebrate ingenuity, originality, and character—the freedom and fun of creating a style that is truly personal,” Lauren continued.",
    "cn": "Lauren继续说道：「这是关于庆祝独创性、独创性和个性的着装方式--创造真正个性化风格的自由和乐趣。",
    "src": "ELLE · 2026-09-09"
  },
  "ceiling": {
    "en": "But there are thousands of balloons in nets already hoisted into the arena ceiling, a sign they'll likely come tumbling down during Thursday's convention finale.",
    "cn": "但是已经有成千上万的气球挂在球馆的天花板上，这表明它们可能会在周四的大会结束时掉下来。",
    "src": "CBS News · 2026-09-09"
  },
  "cause": {
    "en": "The best leave-in conditioner for you will target and fix that cause.",
    "cn": "最好的免洗护发素会针对并解决这个问题。",
    "src": "ELLE · 2026-09-09"
  },
  "cathedral": {
    "en": "It was first documented in a 1476 inventory of the treasures of Bayeux Cathedral, and it’s been in Bayeux ever since, bar a couple of brief sojourns elsewhere.",
    "cn": "它最早被记录在1476年巴叶大教堂的宝藏清单中，从那以后它就一直在巴叶，除了在其他地方短暂停留过几次。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "catch": {
    "en": "Catch up on the latest news with the Paper Talk podcast.",
    "cn": "通过Paper Talk播客了解最新消息。",
    "src": "Sky Sports · 2026-09-09"
  },
  "castle": {
    "en": "The exhibition dedicates displays to other local killers, including Holmes, who, as one of America’s first serial killers, used his “ Murder Castle ” hotel to claim victims’ lives during the 1893 Chicago World’s Fair.",
    "cn": "该展览致力于展示其他当地杀手，包括福尔摩斯，他作为美国最早的连环杀手之一，在1893年芝加哥世界博览会期间使用他的“谋杀城堡”酒店夺走了受害者的生命。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "civilization": {
    "en": "\"The time is near enough so the events that led to the collapse of civilization are still relevant, but far enough that they have been shrouded in mystery and myth,\" the director said.",
    "cn": "这位导演说：“时间已经足够接近，导致文明崩溃的事件仍然是相关的，但足够远，它们已经笼罩在神秘和神话之中。",
    "src": "Variety · 2026-09-10"
  },
  "class": {
    "en": "The Arsenal captain oozed class and confidence, demanding the ball then finding the gaps in Napoli's defence and threading passes forward.",
    "cn": "阿森纳队长渗出班级和自信，要求球然后找到那不勒斯的防守和线程向前传球的差距。",
    "src": "Sky Sports · 2026-09-09"
  },
  "clean": {
    "en": "The ends were left uncurled and sleek to echo the clean lines of the dress.",
    "cn": "发梢没有卷曲，线条流畅，与裙子的简洁线条相呼应。",
    "src": "ELLE · 2026-09-09"
  },
  "clear": {
    "en": "\"The general kept asking Cody to call an 'all clear,'\" his father told CBS News.",
    "cn": "他的父亲告诉哥伦比亚广播公司新闻：“将军一直让科迪报‘安全警报’。",
    "src": "CBS News · 2026-09-10"
  },
  "clearly": {
    "en": "“They clearly spent time in higher latitude areas, but until now it wasn’t known whether they were also nesting there.”",
    "cn": "“他们显然在高纬度地区度过了一段时间，但直到现在还不知道他们是否也在那里筑巢。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "cloud": {
    "en": "The look skips any stark white lines, no ultra-defined tips; instead, Pamela’s manicure appears to feature a sheer, milky base that melts into diffused white tips, creating a blurred, almost cloud-like finish.",
    "cn": "这款妆容没有任何明显的白线，也没有超细的唇尖；相反，帕梅拉的美甲似乎以透明的乳白色底妆为特色，融化成扩散的白色尖端，创造出一种模糊的、几乎像云一样的效果。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "clothes": {
    "en": "No designer wants their clothes to be associated with the word “fussy,” but it’s a hard adjective to avoid in the world of evening wear or gala attire.",
    "cn": "没有设计师希望自己的服装与“挑剔”这个词联系在一起，但在晚礼服或晚会服装的世界里，这是一个很难避免的形容词。",
    "src": "Vogue · 2026-09-10"
  },
  "clothe": {
    "en": "No designer wants their clothes to be associated with the word “fussy,” but it’s a hard adjective to avoid in the world of evening wear or gala attire.",
    "cn": "没有设计师希望自己的服装与“挑剔”这个词联系在一起，但在晚礼服或晚会服装的世界里，这是一个很难避免的形容词。",
    "src": "Vogue · 2026-09-10"
  },
  "closely": {
    "en": "Since her appointment, DFW has moved to align itself more closely with international buying cycles, Taher says: Ramadan 2027 falls in early February, roughly 10 days earlier than in 2026, and a September show would have sat too far ahead of that window to function as a real buying moment.",
    "cn": "塔希尔说，自从她上任以来，DFW已经开始与国际购买周期更紧密地保持一致：2027年的斋月在2月初，比2026年提前了大约10天，而9月份的时装秀可能会比那个窗口提前得太远，无法成为真正的购买时刻。",
    "src": "Vogue · 2026-09-10"
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
  "clever": {
    "en": "Designed in London and handmade in Italy from 24K gold plate, the collection pairs sculptural shapes with clever details designed to offer multiple ways to wear each piece.",
    "cn": "该系列在伦敦设计，在意大利手工制作，采用24K金板材，将雕塑形状与巧妙的细节搭配在一起，为每件作品提供多种佩戴方式。",
    "src": "ELLE · 2026-09-09"
  },
  "clock": {
    "en": "The Spanish actors—who have been married for over 16 years and have worked together for nearly double that time—were on the clock in Venice, promoting their latest joint project, French filmmaker Florian Zeller’s Bunker.",
    "cn": "这对西班牙演员——他们已经结婚16年了，在一起工作的时间几乎是这16年的两倍——在威尼斯忙着宣传他们最新的合作项目，法国电影制片人弗洛里安·泽勒的《地堡》。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "city": {
    "en": "Based in New York City, he previously worked as a News Writer at W magazine and an Assistant Editor at V magazine.",
    "cn": "他以前在纽约市工作，曾在W杂志担任新闻撰稿人，在V杂志担任助理编辑。",
    "src": "ELLE · 2026-09-09"
  },
  "citizen": {
    "en": "President Trump vowed Wednesday to send a $5,000 \"dividend\" to every American citizen after the midterms, but only if Republicans hold onto control of the House and Senate.",
    "cn": "特朗普总统周三发誓要在中期选举后向每个美国公民发放5000 $的“红利”，但前提是共和党人继续控制众议院和参议院。",
    "src": "CBS News · 2026-09-10"
  },
  "childhood": {
    "en": "In this first episode of our four-part Sunday Series on the 16th-century royal, Rachel Dinning is joined by historian Nicola Tallis to explore Elizabeth’s turbulent early years – from the execution of her mother, Anne Boleyn, to the political and personal dangers she faced as she navigated childhood, illegitimacy, and the treacherous Tudor succession.",
    "cn": "在我们关于16世纪王室的四集周日系列节目的第一集中，雷切尔·丁宁和历史学家尼古拉·塔利斯一起探索了伊丽莎白动荡的早年——从她母亲安妮·博林的处决，到她在童年时期面临的政治和个人危险，私生子，以及都铎王朝的危险继承。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "child": {
    "en": "We lived in Northampton, MA; I’d just begun my second year as a visiting writer at Amherst College; our daughter Livia, our first child, was only seven weeks old.",
    "cn": "我们住在马萨诸塞州的北安普顿；我刚开始在阿默斯特学院做访问作家的第二年；我们的女儿利维娅，我们的第一个孩子，只有七周大。",
    "src": "Vogue · 2026-09-10"
  },
  "chief": {
    "en": "Taher formerly served as chief marketing officer of Wio Bank, the UAE’s first digital-only bank, as well as VP of marketing, brand and sponsorships at Etihad Airways.",
    "cn": "Taher曾担任阿联酋首家纯数字银行Wio Bank的首席营销官，以及阿提哈德航空营销、品牌和赞助副总裁。",
    "src": "Vogue · 2026-09-10"
  },
  "chocolate": {
    "en": "A fine, chocolate-toned French tip puts a playful twist on this ever-timeless nail design.",
    "cn": "精致的巧克力色法式指甲为这款永不过时的美甲设计增添了俏皮的色彩。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "circular": {
    "en": "Just before wrapping up their work on the Roman graves, the researchers spotted the circular outline of a barrow—an ancient burial mound—Dąbrowski says in a statement from Wrocław Medical University.",
    "cn": "在结束他们对罗马坟墓的工作之前，研究人员在弗罗茨瓦夫医科大学的一份声明中发现了一个古老的坟丘Dąbrowski的圆形轮廓。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "circuit": {
    "en": "As a world sales company, Jungle Book Studio can already envision ‘Angh’ setting the international buyers’ circuit alight and sparking a buzz across territories.",
    "cn": "作为一家全球销售公司，《奇幻森林》工作室已经预见到《Angh》将点燃国际买家的热情，并在各个地区掀起热潮。",
    "src": "Variety · 2026-09-10"
  },
  "cinema": {
    "en": "His 2025 AI film \"The Cinema That Never Was\" attracted attention from leading filmmakers such as Alex Proyas and John Gaeta, and won major international AI film awards, including Grand Prizes at the Omni International AI Film Festival, whose jury was headed by George Miller, and the Artefact AI Film Festival, chaired by C&eacute;dric Klapisch.",
    "cn": "他的2025年人工智能电影《从未有过的电影》吸引了亚历克斯·普罗亚斯和约翰·盖塔等知名电影人的关注，并获得了主要的国际人工智能电影奖项，包括由乔治·米勒担任评审团主席的Omni国际人工智能电影节的大奖，以及由德里克·克拉皮什担任主席的人工智能电影节。",
    "src": "Variety · 2026-09-10"
  },
  "chop": {
    "en": "Once inside the fortress, the insurgents exacted revenge on their enemies, dragging some of the kingdom’s most powerful men out to an execution block and chopping off their heads.",
    "cn": "一旦进入堡垒，叛乱分子就向他们的敌人进行报复，将一些王国最强大的人拖到处决区并砍下他们的头。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "choose": {
    "en": "Show the following inspiration photos to your nail tech, choose a sheer milky polish, and you’ll be in safe hands.",
    "cn": "把下面的灵感照片给你的美甲师看，选择一种纯乳状的指甲油，你就会很安全。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "choice": {
    "en": "Those images remain seared in my mind: faced with the choice between the burning building and hurling themselves to certain death, they chose to jump.",
    "cn": "那些画面仍然在我的脑海中挥之不去：面对着火的大楼和将自己扔向死亡之间的选择，他们选择了跳下去。",
    "src": "Vogue · 2026-09-10"
  },
  "continue": {
    "en": "\"It's like a cancer that continues to grow until you don't literally have a state anymore.\"",
    "cn": "“这就像一种癌症，它会继续生长，直到你不再有一个真正的州。",
    "src": "CBS News · 2026-09-10"
  },
  "departure": {
    "en": "With the departure of Salah from England and Messi and Ronaldo from the international stage, perhaps it's fitting.",
    "cn": "随着萨拉赫离开英格兰，梅西和 C 罗退出国际舞台，这种情况也在情理之中。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "depend": {
    "en": "“It’s more about keeping the hair hydrated, manageable, and healthy depending on the style you’re trying to create,” explains celebrity hair stylist Jenny Cho.",
    "cn": "名人发型师珍妮·赵解释说：“根据你想打造的发型，更重要的是保持头发的水分、易打理和健康。",
    "src": "ELLE · 2026-09-09"
  },
  "depth": {
    "en": "Theja has brought an extraordinary depth of vision and sensitivity to this story, and it has been deeply meaningful to build this film alongside him.”",
    "cn": "Theja为这个故事带来了非凡的深度和敏感性，和他一起制作这部电影非常有意义。",
    "src": "Variety · 2026-09-10"
  },
  "describe": {
    "en": "“Black Opium to me really describes the most unapologetic, unafraid, cool woman,” she says.",
    "cn": "她说：“对我来说，黑鸦片确实描述了最无所畏惧、最冷酷的女人。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "deserve": {
    "en": "It might go down as the worst trade in the history of sports,\" before conceding that the Boston Red Sox's decision to ship pitcher Babe Ruth to the New York Yankees more than a century ago likely still deserved that dubious distinction.",
    "cn": "“这笔交易可能会被载入体育史册，成为最糟糕的交易，”但他随后承认，一个多世纪前波士顿红袜队将投手贝比·鲁斯交易到纽约洋基队的决定，可能仍然配得上这个令人质疑的“殊荣”。",
    "src": "CBS News · 2026-09-10"
  },
  "design": {
    "en": "A fine, chocolate-toned French tip puts a playful twist on this ever-timeless nail design.",
    "cn": "精致的巧克力色法式指甲为这款永不过时的美甲设计增添了俏皮的色彩。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "desirable": {
    "en": "She shares the coolest, most desirable fashion market finds and brands for every budget.",
    "cn": "她分享了最酷、最令人向往的时尚市场发现和各种预算的品牌。",
    "src": "Who What Wear · 2026-09-10"
  },
  "desire": {
    "en": "Beso added: “This film comes from a strong desire to tell stories that are ours.",
    "cn": "贝索补充说：“这部电影来自于一种强烈的愿望，那就是讲述属于我们的故事。",
    "src": "Variety · 2026-09-10"
  },
  "develop": {
    "en": "Her superheroine short film \"Blake\" is now being developed by Dreamkite as an original series.",
    "cn": "她的超级女英雄短片“布莱克”现在正在Dreamkite作为原创系列开发。",
    "src": "Variety · 2026-09-10"
  },
  "determine": {
    "en": "U.S. Army Central and Third Army ordered the Pentagon probe \"to determine the facts and circumstances\" of the Iranian attack.",
    "cn": "美国陆军中央和第三军命令五角大楼调查伊朗袭击的“事实和情况”。",
    "src": "CBS News · 2026-09-10"
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
    "en": "Despite that frailty, former Manchester United defender Neville still believes Chelsea can challenge for the title.",
    "cn": "尽管防线脆弱，前曼联后卫内维尔依然认为切尔西具备争冠实力。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "destroy": {
    "en": "It came after a similar operation that destroyed another vessel linked to the gang, one of Ecuador's main drug trafficking and extortion groups.",
    "cn": "此前，一项类似的行动摧毁了另一艘与该团伙有关的船只，该团伙是厄瓜多尔主要的毒品贩运和勒索组织之一。",
    "src": "CBS News · 2026-09-10"
  },
  "development": {
    "en": "PROJECTS IN DEVELOPMENT Dreamkite launches with a slate of original AI-native and hybrid projects currently in development.",
    "cn": "Dreamkite推出了一系列目前正在开发的原始ai原生和混合项目。",
    "src": "Variety · 2026-09-10"
  },
  "decision": {
    "en": "Then for 20 to 25 minutes we were guilty of so many bad decisions, but we found a way to win.",
    "cn": "然后在20到25分钟的时间里，我们做出了很多糟糕的决定，但我们找到了获胜的方法。",
    "src": "Sky Sports · 2026-09-09"
  },
  "declare": {
    "en": "When Rogers signed with Chelsea, he declared he was joining the biggest team in London.",
    "cn": "罗杰斯加盟切尔西时曾说，他加盟的是伦敦最大的球队。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "deep": {
    "en": "\"We still have our deep hues in rotation, but the fresh, glitzy formulas help keep the look both modern and timeless,\" she shares.",
    "cn": "她分享说：“我们仍然在轮换使用深色调，但新鲜、耀眼的配方有助于保持时尚和永恒的外观。",
    "src": "Who What Wear · 2026-09-10"
  },
  "defence": {
    "en": "The Arsenal captain oozed class and confidence, demanding the ball then finding the gaps in Napoli's defence and threading passes forward.",
    "cn": "阿森纳队长渗出班级和自信，要求球然后找到那不勒斯的防守和线程向前传球的差距。",
    "src": "Sky Sports · 2026-09-09"
  },
  "define": {
    "en": "However, while the runway set saw long sleeves and a knee-length skirt, the actor’s version was defined by its sleeveless scoop neckline and floor-length gown, which was cut with a thigh-high slit.",
    "cn": "然而，虽然t台的造型是长袖和及膝裙，但这位演员的版本则是无袖露领和及地礼服，礼服的剪裁是及膝的开叉。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "democratic": {
    "en": "She ran for governor in 2022 but lost to McKee in the Democratic primary.",
    "cn": "她在2022年竞选州长，但在民主党初选中输给了麦基。",
    "src": "CBS News · 2026-09-10"
  },
  "demand": {
    "en": "Experts say the peptide boom offers a window into a larger transformation in American health care: a shift from a market driven by diagnoses to one driven by demand, in which medicine is increasingly viewed as a consumer good—an Amazon-like product delivered to your doorstep.",
    "cn": "专家表示，多肽繁荣为美国医疗保健行业的更大转型提供了一个窗口：从由诊断驱动的市场转向由需求驱动的市场，在这个市场中，医药越来越被视为一种消费品--一种类似亚马逊的产品，送货上门。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "delight": {
    "en": "And under the direction of the brilliant Robert Hastie, I couldn’t be more delighted to be joining such an original and wildly ambitious show.",
    "cn": "在才华横溢的罗伯特·海斯蒂的指导下，我非常高兴能加入这样一部原创而雄心勃勃的电视剧。",
    "src": "Variety · 2026-09-10"
  },
  "degree": {
    "en": "A deeper shade also elevates my outfits to the nth degree—even more so if I opt for a chic, artful design —so I've been collecting inspo for months in preparation for the first kiss of brisk fall air.",
    "cn": "更深的颜色也会让我的服装提升到第n级——如果我选择别致、巧妙的设计，效果会更明显——所以我几个月来一直在收集灵感，为秋天清新空气的初吻做准备。",
    "src": "Who What Wear · 2026-09-10"
  },
  "definition": {
    "en": "After letting each curl cool completely, he raked through the hair with fingers (not a brush) to open the curl into a soft, sexy blowout shape without losing definition.",
    "cn": "让每一卷头发完全冷却后，他用手指（不是梳子）拨弄头发，使卷发柔软、性感，又不失轮廓。",
    "src": "ELLE · 2026-09-09"
  },
  "delicate": {
    "en": "Straw boater hats were some of my favorite accessories this season, but I also appreciated the impressive range of chic brooches, floral scarves, white handbags, oversized clutches, lace-up flats, delicate strappy heels, and more.",
    "cn": "草帽是这一季我最喜欢的配饰之一，但我也很欣赏那些令人印象深刻的别致胸针、花围巾、白色手袋、超大手包、系带平底鞋、精致的绑带高跟鞋等等。",
    "src": "Who What Wear · 2026-09-10"
  },
  "devil": {
    "en": "Only Everton and Liverpool have placed less emphasis on investment in their backline than the Red Devils since 2022.",
    "cn": "自2022年以来，只有埃弗顿和利物浦比红魔更不重视投资。",
    "src": "Sky Sports · 2026-09-09"
  },
  "devise": {
    "en": "Displays spotlight personal belongings, investigative evidence, authentic artworks and other “murderabilia” that offer an uncanny peek into the lives of roughly 150 killers from dozens of countries who devised and committed unthinkable crimes.",
    "cn": "展示聚光灯下的个人物品、调查证据、真实的艺术品和其他“谋杀品”，让人们惊奇地窥见来自数十个国家的大约150名凶手的生活，这些凶手策划并犯下了不可思议的罪行。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "disaster": {
    "en": "\"A federal-election-administration disaster is unfolding in Missouri,\" Hanaway wrote in an emergency application for the U.S. Supreme Court to put the ruling on hold, warning it could lead to \"unprecedented chaos\" and render the primary \"utterly pointless.\"",
    "cn": "“密苏里州正在发生联邦选举行政灾难，”Hanaway在一份紧急申请中写道，要求美国最高法院搁置裁决，并警告说，这可能导致“前所未有的混乱”，并使主要的“毫无意义”。",
    "src": "CBS News · 2026-09-10"
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
    "en": "Republican leaders and Trump allies are gathering for two days at a downtown Dallas arena, and are holding other off-site donor events and discussions centered around topics like domestic energy production.",
    "cn": "共和党领导人和特朗普的盟友将在达拉斯市中心的一个体育馆举行为期两天的聚会，并举行其他场外捐赠活动和讨论，主题包括国内能源生产。",
    "src": "CBS News · 2026-09-09"
  },
  "distance": {
    "en": "Fetterman has, at times, distanced himself from the Democrats, backing Mr. Trump's strategy in Iran and breaking with congressional Democrats in last year's government shutdown fight.",
    "cn": "费特曼有时会与民主党人保持距离，支持特朗普在伊朗问题上的战略，并在去年的政府停摆斗争中与国会民主党人决裂。",
    "src": "CBS News · 2026-09-10"
  },
  "dissolve": {
    "en": "Sequins dissolved into fringe, single-seam construction allowed one wrap dress to fall around the body with effortless ease, and “spritz and tumble” dresses had an intentional wrinkled consistency.",
    "cn": "亮片溶解在流苏中，单缝结构使一件裹身连衣裙可以毫不费力地轻松落在身体周围，“spritz and tumble”连衣裙具有故意起皱的一致性。",
    "src": "ELLE · 2026-09-09"
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
    "en": "The right formula, however, can make all the difference by adding hydration without heaviness, taming frizz without stealing volume, and leaving your hair soft, shiny, and full of life.",
    "cn": "然而，正确的配方可以通过增加水分而不会产生沉重感，驯服卷曲而不会窃取体积，并让您的头发柔软，有光泽，充满活力。",
    "src": "ELLE · 2026-09-10"
  },
  "diamond": {
    "en": "To hop on the trend, either opt for a burnished polish (like Essie's Gel Couture Liquid Diamonds collection) or simply add a chrome topper to any rich shade you please.",
    "cn": "想要跟上潮流，要么选择抛光的指甲油（比如Essie的凝胶高级定制液体钻石系列），要么简单地在任何你喜欢的颜色上加一层镀铬。",
    "src": "Who What Wear · 2026-09-10"
  },
  "decent": {
    "en": "Invest in a decent nail-care kit with a buffer, cuticle tools, and nail oil, and you can give yourself the same glossy set without booking an appointment.",
    "cn": "买一个像样的指甲护理包，里面有缓冲液、角质层工具和指甲油，你可以不用预约就能让自己拥有同样有光泽的指甲。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "different": {
    "en": "I have an assistant help here and there, but most people have people for different steps.",
    "cn": "我这里有一个助手，那里有一个助手，但大多数人都有不同步骤的人。",
    "src": "Vogue · 2026-09-10"
  },
  "difficulty": {
    "en": "He talks about the importance of the smallest details, the difficulty of getting every decision right and the challenge of translating his ideas to a group of players who spend far less time together than a club side.",
    "cn": "他谈到了最小细节的重要性，做出正确决定的难度，以及将他的想法转化为一群在一起的时间远远少于俱乐部球员的球员所面临的挑战。",
    "src": "Sky Sports · 2026-09-09"
  },
  "director": {
    "en": "Shamila Lengsfeld: A German-Iranian director, AI filmmaker and creative technologist.",
    "cn": "莎米拉·朗斯菲尔德：德裔伊朗导演、人工智能电影制作人和创意技术专家。",
    "src": "Variety · 2026-09-10"
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
  "direct": {
    "en": "“Human and animal-derived exosomes have more direct clinical evidence for hair growth,” explains Dr. Kobets.",
    "cn": "“人类和动物来源的外泌体对毛发生长有更直接的临床证据，”Kobets博士解释说。",
    "src": "ELLE · 2026-09-09"
  },
  "difficult": {
    "en": "He has deliberately given him some space because he knows it would have been a difficult situation.",
    "cn": "他故意给他一些空间，因为他知道这将是一个困难的局面。",
    "src": "Sky Sports · 2026-09-09"
  },
  "dimension": {
    "en": "“We’re seeing more blended looks that seamlessly add depth, warmth, and dimension—kind of like enhancing what you already have to match the season,” she says.",
    "cn": "她说：“我们看到越来越多的混合造型无缝地增加了深度、温暖和空间感——有点像为搭配这个季节而强化你已有的服装。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "dim": {
    "en": "The scale of the embroidery suggests that it was designed for a large audience, but the lighting in medieval buildings would have been dim, and the Tapestry may have been displayed only on special occasions, as was recorded in the 1476 inventory.",
    "cn": "刺绣的规模表明，它是为大量观众设计的，但中世纪建筑的照明可能会很昏暗，而且挂毯可能只在特殊场合展示，正如1476年库存中所记录的那样。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "digital": {
    "en": "Who What Wear is part of Future US Inc, an international media group and leading digital publisher.",
    "cn": "Who What Wear是未来美国公司的一部分，未来美国公司是一家国际媒体集团和领先的数字出版商。",
    "src": "Who What Wear · 2026-09-10"
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
  "cotton": {
    "en": "Take a dress with a shiny, even gaudy, metallic pink stretch front and cotton back in shades of magenta (there was a lot of back action for spring).",
    "cn": "比如一件有光泽的、甚至是俗艳的金属粉色弹性前襟和深浅品红的棉质后腰的连衣裙（春季有很多后腰的动作）。",
    "src": "Vogue · 2026-09-10"
  },
  "could": {
    "en": "Nottingham Forest could revive their interest in Tottenham midfielder Lucas Bergvall in January.",
    "cn": "诺丁汉森林可能会在一月份恢复他们对托特纳姆热刺中场球员卢卡斯·伯格瓦尔的兴趣。",
    "src": "Sky Sports · 2026-09-09"
  },
  "council": {
    "en": "The Arab Fashion Council appointed its first chairwoman, Amina Taher, in July, and the fashion week has shifted from September to October, now taking place from October 22 to 26.",
    "cn": "今年7月，阿拉伯时装委员会任命了第一任主席阿米娜·塔希尔（Amina Taher），时装周也从9月改到了10月，改为10月22日至26日举行。",
    "src": "Vogue · 2026-09-10"
  },
  "count": {
    "en": "There is at least one randomized controlled trial of a plant extract exosome formulation showing a real increase in hair counts, but the signaling overlap with human follicle biology is less well characterized.”",
    "cn": "至少有一项植物提取物外泌体配方的随机对照试验显示，毛发数量确实增加了，但与人类毛囊生物学的信号重叠却没有得到很好的表征。",
    "src": "ELLE · 2026-09-09"
  },
  "country": {
    "en": "\"If you don't confront these groups, they will eat these countries alive,\" he warned.",
    "cn": "他警告说：“如果你不对抗这些组织，它们会把这些国家活活吃掉。",
    "src": "CBS News · 2026-09-10"
  },
  "couple": {
    "en": "It’s been a whirlwind few months for the couple, who married in Sicily back in June and have barely touched the ground since.",
    "cn": "对这对夫妇来说，这几个月就像旋风一样，他们六月份在西西里岛结婚，从那以后几乎没有接触过地面。",
    "src": "Vogue · 2026-09-10"
  },
  "courage": {
    "en": "\"At its heart, it’s a story about family, freedom and the courage to challenge everything you’ve ever known.”",
    "cn": "“从本质上讲，这是一个关于家庭、自由和挑战一切已知事物的勇气的故事。",
    "src": "Variety · 2026-09-10"
  },
  "course": {
    "en": "Dua Lipa and Callum Turner, of course, are as reliable for keeping the vibes high as they are for their respective pop and film superstardom.",
    "cn": "当然，杜瓦·利帕和卡勒姆·特纳在保持高人气方面是可靠的，就像他们各自的流行音乐和电影超级明星一样。",
    "src": "Vogue · 2026-09-10"
  },
  "court": {
    "en": "More than $100 billion has been refunded due to a Supreme Court ruling earlier this year that struck down many of the administration's tariffs.",
    "cn": "由于最高法院今年早些时候的一项裁决取消了政府的许多关税，已退还了超过1000亿美元$。",
    "src": "CBS News · 2026-09-10"
  },
  "cover": {
    "en": "We cover what’s new and what’s next in fashion by working with the world’s leading authorities in ready-to-wear, footwear, accessories, and more.",
    "cn": "我们通过与成衣、鞋类、配饰等领域的世界领先权威机构合作，报道时尚领域的新动向和新趋势。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "credit": {
    "en": "The company’s credits include “Call the Midwife” and the film “1917.”",
    "cn": "公司的作品包括《呼叫助产士》（Call The Midwife）和电影《1917》（1917）。",
    "src": "Variety · 2026-09-10"
  },
  "creature": {
    "en": "Above and below the action are borders populated by animals, birds, mythical creatures, decorative devices and mini scenes that may or may not relate to the main narrative.",
    "cn": "行动的上方和下方是由动物、鸟类、神话生物、装饰装置和迷你场景组成的边界，这些场景可能与主要叙事有关，也可能与主要叙事无关。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "creative": {
    "en": "The global fashion industry needs new markets, new consumers, and new creative voices.",
    "cn": "全球时尚产业需要新的市场、新的消费者和新的创意声音。",
    "src": "Vogue · 2026-09-10"
  },
  "create": {
    "en": "This is the first time that we have created an extrait, so it was a deliberate step up in craft.",
    "cn": "这是我们第一次创造一个外挂，所以这是在工艺上的一个深思熟虑的步骤。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "cream": {
    "en": "Ferragamo’s Maximilian Davis offered pointed pumps that “ recall nautical codes \" with their cream-and-black color schemes, while Isabel Marant took a splashier stance by splicing together colorful shades of snakeskin-embossed leather.",
    "cn": "菲拉格慕（Ferragamo）的马西米利安·戴维斯（Maximilian Davis）推出了奶油色和黑色配色的尖头高跟鞋，“让人想起航海规则”，而伊莎贝尔·玛兰（Isabel Marant）则采取了更引人注目的姿态，将色彩缤纷的蛇皮浮雕皮革拼接在一起。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "cost": {
    "en": "Rebuilding the bridge — a crucial link between the state capital of Providence and its eastern suburbs — is now estimated to cost $427 million and is scheduled to be completed in November 2028.",
    "cn": "这座连接州首府普罗维登斯和东部郊区的桥梁目前估计耗资4.27亿美元，计划于2028年11月完工。",
    "src": "CBS News · 2026-09-10"
  },
  "crash": {
    "en": "The former Tottenham boss guided the USA team to the last 16 of the World Cup, where the host nation's dreams of victory came to a crashing halt against Belgium, but that barely tells the story of an extraordinary few weeks for the Argentine.",
    "cn": "这位前托特纳姆热刺主帅带领美国队参加了世界杯的最后16场比赛，东道国的胜利梦想在对阵比利时的比赛中戛然而止，但这几乎没有讲述阿根廷人非凡的几周的故事。",
    "src": "Sky Sports · 2026-09-09"
  },
  "craft": {
    "en": "This is the first time that we have created an extrait, so it was a deliberate step up in craft.",
    "cn": "这是我们第一次创造一个外挂，所以这是在工艺上的一个深思熟虑的步骤。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "cow": {
    "en": "In a 2016 study, scientists found that milk proteins from a species of cockroach that gives live birth carry three times as much energy as milk proteins from cows.",
    "cn": "在2016年的一项研究中，科学家们发现，一种活产蟑螂的乳蛋白所携带的能量是奶牛乳蛋白的三倍。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "crew": {
    "en": "I'm dedicating this edit to the potential staples (re: versatile pieces) I recently found from J.Crew, Aritzia, and Gap.",
    "cn": "我把这篇编辑献给了我最近从J.Crew、arizia和Gap找到的潜在的主食（关于：百搭单品）。",
    "src": "Who What Wear · 2026-09-10"
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
    "en": "“The right leave-in can help encourage your natural texture while keeping it hydrated, controlled, and polished,” Cho says.",
    "cn": "Cho说：“正确的免洗可以帮助促进你的自然质地，同时保持水分、控制和光滑。",
    "src": "ELLE · 2026-09-09"
  },
  "convention": {
    "en": "National parties historically hold nominating conventions every four years.",
    "cn": "国家政党历来每四年举行一次提名大会。",
    "src": "CBS News · 2026-09-09"
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
  "cook": {
    "en": "There was a honeymoon across Italy; Lipa helming her Sunny Hill Festival before putting in some studio time in Stockholm —hopefully cooking up the soundtrack to summer 2027; and Turner promoting One Night Only while, allegedly, testing for the small matter of becoming the next James Bond.",
    "cn": "我们在意大利度了蜜月；利帕在斯德哥尔摩的录音室工作之前，正在主持她的Sunny Hill音乐节，希望能为2027年夏天制作配乐；特纳在宣传《007：只爱一夜》的同时，据称是在为成为下一个詹姆斯·邦德这件小事做测试。",
    "src": "Vogue · 2026-09-10"
  },
  "cool": {
    "en": "I concur—there's just something so cool about an off-season, \"Summerween\" manicure.",
    "cn": "我同意——淡季的“夏夜”美甲真是太酷了。",
    "src": "Who What Wear · 2026-09-10"
  },
  "corporation": {
    "en": "They date back to about 68 million years ago, when the site, sitting at between 55 degrees and 60 degrees south latitude, had a climate comparable to New York City today, Zelenitsky tells Emily Chung at the Canadian Broadcasting Corporation.",
    "cn": "他们可以追溯到大约6800万年前，当时该遗址位于南纬55度至60度之间，气候与今天的纽约市相当，Zelenitsky告诉加拿大广播公司的Emily Chung。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "corner": {
    "en": "His shot comes in but Steward sends it out for a corner.",
    "cn": "他的投篮进来了，但Steward将其发送到角落。",
    "src": "Sky Sports · 2026-09-09"
  },
  "core": {
    "en": "At Dreamkite, Wachholz will \"shape the studio's core creative and aesthetic vision and develop ambitious original projects together with its international network of AI filmmakers and creative talent,\" the company said.",
    "cn": "该公司表示，在Dreamkite，Wachholz将“塑造工作室的核心创意和美学愿景，并与AI电影制作人和创意人才的国际网络一起开发雄心勃勃的原创项目”。",
    "src": "Variety · 2026-09-10"
  },
  "cord": {
    "en": "The find may be linked to the Corded Ware culture, named for the twisted-rope impressions that are characteristic of its ceramic pottery.",
    "cn": "这一发现可能与Corded Ware文化有关，Corded Ware文化以陶瓷陶器特有的扭绳印记命名。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "copper": {
    "en": "“It’s warm without being overly copper and dimensional without needing to be blonde, which makes it incredibly wearable,” Botsford says.",
    "cn": "博茨福德说：“它既温暖，又不会过于古铜色，也不需要金黄色，这让它非常适合穿。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "cope": {
    "en": "Rangers had to cope without captain and striker Lawrence Shankland, who missed out through injury, with Ryan Naderi starting in his place.",
    "cn": "流浪者不得不在没有队长和前锋劳伦斯·尚克兰德的情况下应对，劳伦斯·尚克兰德因伤缺席比赛，瑞安·纳德里（Ryan Naderi）开始取代他。",
    "src": "Sky Sports · 2026-09-09"
  },
  "coordinate": {
    "en": "The psychological thriller, which stars both Cruz and Bardem (and earned them a 16-minute standing ovation at the premiere), made its debut on Tuesday night, and the couple coordinated in elegant looks to celebrate.",
    "cn": "这部心理惊悚片由克鲁兹和巴登共同主演（在首映式上他们起立鼓掌了16分钟），于周二晚上首播，这对夫妇以优雅的造型配合庆祝。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "crime": {
    "en": "Spanning a massive, 21,000-square-foot space, “ Serial Killer: The Exhibition ” brings together more than 2,000 items that confront myth with true crime’s gruesome reality.",
    "cn": "“连环杀手：展览”占地21,000平方英尺，汇集了2,000多件物品，将神话与真实犯罪的可怕现实相结合。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "criminal": {
    "en": "In last year’s infamous Louvre heist, scootering criminals fled with French crown jewels.",
    "cn": "在去年臭名昭著的卢浮宫抢劫案中，犯罪分子骑着摩托车带着法国皇冠珠宝逃跑。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "cut": {
    "en": "But for his spring/summer 2027 collection, the stalwart designer revisited his signatures while finding new ways to cut, layer, and style the classics.",
    "cn": "但在他的2027年春夏系列中，这位坚定的设计师重新审视了他的签名，同时寻找了切割、分层和风格经典的新方法。",
    "src": "ELLE · 2026-09-09"
  },
  "daily": {
    "en": "Ahead, Beckham tells us about the original Italian getaway that inspired the new scent, the wellness routine she and David do daily together, and the city that may inspire her next hit scent.",
    "cn": "接下来，贝克汉姆向我们讲述了激发新香水灵感的意大利之旅，她和大卫每天一起做的健康运动，以及可能激发她下一款热门香水灵感的城市。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "damage": {
    "en": "Whether you’ve got heat damage or just don’t want to deal with the humidity clinging to your every strand, we sourced the seven best leave-in conditioners for all kinds of frizzy hair.",
    "cn": "无论你是受到了热损伤，还是只是不想处理每根头发上的湿气，我们都为你挑选了七种最好的免洗护发素，适用于各种卷曲的头发。",
    "src": "ELLE · 2026-09-09"
  },
  "damp": {
    "en": "To create the style, she prepped Bullock’s damp hair with a combination of RŌZ Santa Lucia Styling Oil and the RŌZ Milk Hair Serum before blow-drying with a round brush.",
    "cn": "为了打造这种造型，她用RŌZ圣卢西亚造型油和RŌZ牛奶护发精华液为布洛克潮湿的头发做了准备，然后用圆刷吹干。",
    "src": "ELLE · 2026-09-09"
  },
  "dance": {
    "en": "After supper, we danced with Livia in our arms.",
    "cn": "晚饭后，我们搂着利维娅跳舞。",
    "src": "Vogue · 2026-09-10"
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
  "dare": {
    "en": "The title of the record—announced today—is a dare to herself.",
    "cn": "今天宣布的专辑名称是对她自己的一次挑战。",
    "src": "Vogue · 2026-09-10"
  },
  "dark": {
    "en": "There were thousands of names in the registers, mostly written in dark ink.",
    "cn": "登记簿上有成千上万的名字，大多是用深色墨水写的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "data": {
    "en": "The strategy outlines a DEI goal led by social mobility and better access to the BFC’s prize program, which the organization plans to bolster through data collection, research papers, and the implementation of industry guidance toolkits.",
    "cn": "该战略概述了以社会流动性和更好地参与BFC奖励计划为主导的DEI目标，该组织计划通过数据收集、研究论文和实施行业指导工具包来支持这一目标。",
    "src": "Vogue · 2026-09-10"
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
    "en": "Nearly three decades later, the pair look as though they’ve drunk a youth potion.",
    "cn": "近三十年后，这对夫妇看起来好像喝了青春药水。",
    "src": "ELLE · 2026-09-09"
  },
  "death": {
    "en": "Though his mobility was restricted, Renoir painted there until his death, in 1919.",
    "cn": "尽管行动不便，雷诺阿仍在那里作画，直到1919年去世。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "customer": {
    "en": "Customer review: “The best conditioner for fine hair that I have found.",
    "cn": "客户评价：“我找到的最好的细发护发素。",
    "src": "ELLE · 2026-09-10"
  },
  "deal": {
    "en": "Morgan Rogers -- who signed for Chelsea in a £117 million deal after repeated links with a move to Arsenal -- struck inside 77 seconds to put the visitors in front.",
    "cn": "此前曾与阿森纳频繁传出转会绯闻的摩根·罗杰斯，以 1.17 亿英镑转会切尔西，开场仅 77 秒便率先破门。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "deadly": {
    "en": "The Army confirmed to the Khorks and CBS News that its probe into the deadly Iranian attack was completed in early July, but they have yet to release it.",
    "cn": "美国陆军向霍克和哥伦比亚广播公司证实，对伊朗致命袭击的调查已于7月初完成，但他们尚未公布调查结果。",
    "src": "CBS News · 2026-09-10"
  },
  "day": {
    "en": "But Martinez and Lacroix both had an off day at the Emirates as Chelsea's defensive frailties once again highlighted their big weakness.",
    "cn": "但马丁内斯和拉克鲁瓦在酋长球场双双不在状态，切尔西防线的问题再次暴露无遗。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "daughter": {
    "en": "Gyllenhaal’s directorial debut, The Lost Daughter, won Best Screenplay at the festival in 2021.",
    "cn": "吉伦哈尔的导演处女作《迷失的女儿》在2021年的电影节上获得了最佳剧本奖。",
    "src": "ELLE · 2026-09-09"
  },
  "custom": {
    "en": "For Cruz, this meant a red Chanel dress, made custom by Matthieu Blazy.",
    "cn": "对克鲁兹来说，这意味着一件由马修·布拉齐（Matthieu Blazy）定制的红色香奈儿（Chanel）连衣裙。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "curve": {
    "en": "File the nail into your preferred shape; soft “squoval” or rounded work well to complement the natural curve of your fingertip, and always push back and perfectly tidy the cuticle area —this instantly elongates the nail bed and maximises the canvas, even when the length is minimal.”",
    "cn": "把钉子锉成你喜欢的形状；柔软的“方形”或圆形指甲可以很好地配合指尖的自然曲线，并且总是向后推，完美地整理角质层区域——这样可以立即拉长指甲床，最大化指甲长度，即使指甲长度很短。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "crown": {
    "en": "In last year’s infamous Louvre heist, scootering criminals fled with French crown jewels.",
    "cn": "在去年臭名昭著的卢浮宫抢劫案中，犯罪分子骑着摩托车带着法国皇冠珠宝逃跑。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "crowd": {
    "en": "Last night at the Boom Boom Room, Lipa and Turner joined a starry crowd that also included Anne Hathaway and Hudson Williams.",
    "cn": "昨晚在Boom Boom Room，利帕和特纳和安妮·海瑟薇、哈德森·威廉姆斯等明星一起亮相。",
    "src": "Vogue · 2026-09-10"
  },
  "cross": {
    "en": "His team would feed him the ball, he'd keep beating his man, and then the cross would inevitably lead to nothing.",
    "cn": "队友不断给他喂球，他一次次过掉对手，最后这脚传中却总是毫无结果。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "criticize": {
    "en": "He has repeatedly criticized the NFL's new rules for kickoffs, and in a Truth Social post last year, he lamented the fact that quarterback Shedeur Sanders wasn't selected in the first few rounds of the NFL draft.",
    "cn": "他一再批评NFL的新开球规则，在去年的Truth Social帖子中，他感叹四分卫Shedeur Sanders没有在NFL选秀的前几轮中被选中。",
    "src": "CBS News · 2026-09-10"
  },
  "critical": {
    "en": "The trade drew consternation from many Dallas fans who were critical of the team's decision to trade away the now-27-year-old face of the franchise.",
    "cn": "这笔交易引起了许多达拉斯球迷的惊愕，他们批评球队决定放弃现年27岁的特许经营权。",
    "src": "CBS News · 2026-09-10"
  },
  "critic": {
    "en": "Henrik Pedersen proving the critics wrong as Sheffield Wednesday surge out of the blocks",
    "cn": "亨里克·彼得森证明了那些批评的人是错的，谢菲尔德星期三队在比赛中突飞猛冲",
    "src": "Sky Sports · 2026-09-10"
  },
  "crisis": {
    "en": "During the Covid-19 pandemic, he saw parallels between the ongoing crisis and the Black Death, which killed an estimated 30 to 50 percent of England’s population just a few decades before the uprising.",
    "cn": "在新冠肺炎疫情期间，他看到了持续的危机与黑死病之间的相似之处，黑死病在起义前几十年杀死了估计30%至50%的英格兰人口。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "cube": {
    "en": "Originally introduced in 2009, the Spin Time takes inspiration from the mechanical departure boards once found in airports and train stations, translating their movement onto the wrist through 12 rotating cubes that mark the passing hours.",
    "cn": "Spin Time最初于2009年推出，灵感来自机场和火车站的机械出发板，通过12个旋转立方体将其运动转化为手腕，标志着过去的时间。",
    "src": "ELLE · 2026-09-09"
  },
  "curl": {
    "en": "From ’90s curls to protection plaits, the sequel’s glam is full of nods to the original.",
    "cn": "从90年代的卷发到护发辫，续集的魅力充满了对第一部的致敬。",
    "src": "ELLE · 2026-09-09"
  },
  "curious": {
    "en": "Researchers were curious to know how the wreckage was affecting the local marine ecosystem.",
    "cn": "研究人员想知道残骸是如何影响当地海洋生态系统的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "crystal": {
    "en": "Crystal Palace transfers, latest news, rumours and gossip: Live updates, goals and highlights",
    "cn": "水晶宫转会，最新消息，谣言和八卦：实时更新，进球和亮点",
    "src": "Sky Sports · 2026-09-10"
  },
  "cup": {
    "en": "Over the summer, Mr. Trump asked FIFA to review its one-match suspension of star U.S. forward Folarin Balogun during the World Cup.",
    "cn": "今年夏天，特朗普要求国际足联审查其在世界杯期间对美国前锋Folarin Balogun的一场比赛停赛。",
    "src": "CBS News · 2026-09-10"
  },
  "culture": {
    "en": "It gives the industry access to something they don’t have in the same combination, the Middle East, Asia, capital, consumers, and culture in one market.",
    "cn": "它让行业能够接触到中东、亚洲、资本、消费者和文化在同一个市场中所不具备的东西。",
    "src": "Vogue · 2026-09-10"
  },
  "appeal": {
    "en": "Clark's decision was appealed late Tuesday by People not Politicians, a Missouri group against the redistricting effort.",
    "cn": "周二晚些时候，密苏里州的一个团体People not Politicians对克拉克的决定提出上诉，反对重新划分选区的努力。",
    "src": "CBS News · 2026-09-10"
  },
  "appear": {
    "en": "He also appears on camera in video and shopping livestream franchises, and is the star of Who What Wear's scripted show, Retail Therapy.",
    "cn": "他还出现在视频和购物直播特许经营的镜头前，并且是谁穿的脚本节目“零售疗法”的明星。",
    "src": "Who What Wear · 2026-09-10"
  },
  "appearance": {
    "en": "That hit followed his clinching strike against Chelsea in the Premier League on Sunday and takes his total to four goals in five appearances this season across all competitions.",
    "cn": "这一打击是在他周日在英超联赛对阵切尔西的比赛中取得进球之后，并在本赛季的所有比赛中五次出场，他的总进球数达到四球。",
    "src": "Sky Sports · 2026-09-09"
  },
  "apple": {
    "en": "But 29-year-old Alisha Boe, star of Apple TV’s The Buccaneers, absolutely knows how to party.",
    "cn": "但是29岁的阿丽莎·波伊，苹果电视节目《海盗》的明星，绝对知道如何开派对。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "appoint": {
    "en": "They have appointed a top-class manager in Xabi Alonso and recruited well with goalkeeper Martinez, defender Maxence Lacroix and forward Rogers.",
    "cn": "他们任命了哈维·阿隆索这位顶级主帅，并在门将马丁内斯、后卫拉克鲁瓦以及前锋罗杰斯的位置上引援得当。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "appointment": {
    "en": "Her appointment chimes with the BFC’s ongoing mission to better influence policymakers and government, raise investment, and spotlight fashion’s role in the region’s economy and culture.",
    "cn": "她的任命与BFC的持续使命相一致，即更好地影响政策制定者和政府，增加投资，并突出时尚在该地区经济和文化中的作用。",
    "src": "Vogue · 2026-09-10"
  },
  "argue": {
    "en": "Arsenal, the current Premier League champions, can currently argue otherwise and point to a run that now extends to 10 unbeaten league games against Chelsea.",
    "cn": "作为现任英超冠军，阿森纳完全有理由反驳——对切尔西的联赛不败纪录已经扩大到了 10 场。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "area": {
    "en": "He first gets down to a Gassama strike from the edge of the area.",
    "cn": "他首先从该地区的边缘开始加萨马罢工。",
    "src": "Sky Sports · 2026-09-09"
  },
  "approve": {
    "en": "The BFC board approved the hire on August 25.",
    "cn": "BFC董事会于8月25日批准了这一聘用。",
    "src": "Vogue · 2026-09-10"
  },
  "approval": {
    "en": "But the convention is taking place as the GOP faces headwinds over the unpopular war in Iran, and Mr. Trump's approval ratings have continued to slip.",
    "cn": "但大会召开之际，共和党正因不受欢迎的伊朗战争而面临阻力，特朗普的支持率也在持续下滑。",
    "src": "CBS News · 2026-09-09"
  },
  "approach": {
    "en": "Many of her gowns this season had such versatile styling approaches, featuring removable capes or jackets that completed the look, if desired.",
    "cn": "她这一季的许多礼服都采用了这种百搭的造型方法，如果需要的话，还可以用可拆卸的斗篷或夹克来完成整个造型。",
    "src": "Vogue · 2026-09-10"
  },
  "anything": {
    "en": "And if this manicure could talk, it would say “I’m ready for anything.”",
    "cn": "如果这个美甲会说话，它会说：“我已经准备好做任何事了。",
    "src": "Vogue · 2026-09-10"
  },
  "amount": {
    "en": "Just a small amount is necessary so it should last a long time.",
    "cn": "只需要少量，所以应该能持续很长时间。",
    "src": "ELLE · 2026-09-10"
  },
  "amplify": {
    "en": "“K2 is about building a new ecosystem where artists can own the worlds they create, where technology amplifies rather than replaces imagination, and where culturally authentic stories rooted in science, philosophy and human experience can travel beyond borders,” he said.",
    "cn": "他说：“K2是关于建立一个新的生态系统，在这个生态系统中，艺术家可以拥有他们创造的世界，技术可以放大而不是取代想象力，根植于科学、哲学和人类经验的文化真实故事可以跨越国界。",
    "src": "Variety · 2026-09-10"
  },
  "analyse": {
    "en": "Manchester United return to the Champions League on Thursday night to face Azerbaijan side Sabah; with a Manchester derby three days later, Michael Carrick may need to utilise his squad; Sky Sports' Callum Bishop analyses if the squad is ready to compete on all fronts",
    "cn": "曼联周四晚上重返欧洲冠军联赛，面对阿塞拜疆方面的沙巴；三天后，迈克尔·卡里克可能需要利用他的阵容；天空体育的卡勒姆·毕晓普（Callum Bishop）分析了球队是否准备好在各个方面进行比赛",
    "src": "Sky Sports · 2026-09-09"
  },
  "analysis": {
    "en": "Lia covers everything from emerging trend analysis to viral celebrity hair and makeup moments, making her an expert at spotting the season’s next big beauty look (before it takes over social media feeds).",
    "cn": "Lia涵盖了从新兴趋势分析到走红的明星发型和化妆瞬间的所有内容，使她成为发现本季下一个大美女造型的专家（在它占领社交媒体之前）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "anchor": {
    "en": "Holmes of The Devil in the White City infamy—anchors a new exhibition, now open in Chicago.",
    "cn": "因《白城恶魔》而臭名昭著的福尔摩斯——是芝加哥正在举办的新展览的核心人物。",
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
  "angry": {
    "en": "His previous credits include “Faith Connections,” which sold in more than 20 territories following its Toronto premiere; “Angry Indian Goddesses,” released theatrically in more than 67 countries and licensed worldwide by Netflix; “Beyond the Known World,” the first official India-New Zealand co-production; and “Stolen,” a Venice selection that received a global release on Prime Video.",
    "cn": "他之前的作品包括《信仰联系》（Faith Connections），在多伦多首映后在20多个地区销售；《愤怒的印度女神》（Angry Indian goddess）在超过67个国家上映，由Netflix在全球范围内授权；《超越已知世界》（Beyond the Known World），这是印度和新西兰首次正式合作制作的影片；威尼斯精选影片《偷走》（Stolen）在Prime Video上全球上映。",
    "src": "Variety · 2026-09-10"
  },
  "animal": {
    "en": "“Human and animal-derived exosomes have more direct clinical evidence for hair growth,” explains Dr. Kobets.",
    "cn": "“人类和动物来源的外泌体对毛发生长有更直接的临床证据，”Kobets博士解释说。",
    "src": "ELLE · 2026-09-09"
  },
  "ankle": {
    "en": "For the Bunker photo call, the star wore an ankle-length black number with Blazy’s signature feather accents adorning the straps.",
    "cn": "为了拍摄邦克的照片，这位明星穿了一件及脚踝的黑色礼服，带子上装饰着布拉齐标志性的羽毛。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "any": {
    "en": "And it's not even clear that the production -- you know, the part where you turn your play into goals -- drove any kind of premium.",
    "cn": "而且尚不清楚他们的产出——也就是把表现转化为进球的部分——是否真的带来任何溢价。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "answer": {
    "en": "Her more intricate offerings included a strapless pink mini dress with metallic-foiled raffia accents all over it for texture—a more lightweight answer to covering it in crystals or beads.",
    "cn": "她更精致的作品包括一件粉色无肩带迷你裙，上面装饰着金属箔的荷叶花，以营造质感——这是一件用水晶或珠子覆盖的更轻巧的衣服。",
    "src": "Vogue · 2026-09-10"
  },
  "another": {
    "en": "Put another way: “Human cells speak the language human follicles understand,” Dr. Halaas says.",
    "cn": "换句话说：“人类细胞会说人类卵泡能理解的语言，”哈拉斯博士说。",
    "src": "ELLE · 2026-09-09"
  },
  "announce": {
    "en": "The title of the record—announced today—is a dare to herself.",
    "cn": "今天宣布的专辑名称是对她自己的一次挑战。",
    "src": "Vogue · 2026-09-10"
  },
  "among": {
    "en": "Don't be fooled by this result -- Chelsea are back among the Premier League title contenders.",
    "cn": "不要被这场比赛的结果欺骗——切尔西已经重新回到争冠行列。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "arm": {
    "en": "The broadcaster launched in-house production arm Gyokuro Studio in 2025, alongside a Los Angeles business office handling co-development and sales for the U.S. and Latin America.",
    "cn": "该广播公司于2025年成立了内部制作部门Gyokuro Studio，并在洛杉矶设立了一个业务办公室，负责美国和拉丁美洲的联合开发和销售。",
    "src": "Variety · 2026-09-10"
  },
  "around": {
    "en": "When David and Victoria Beckham wed in 1999, it was the nuptials (and matching purple outfits) heard around the world.",
    "cn": "1999年大卫·贝克汉姆和维多利亚·贝克汉姆结婚时，全世界都听到了他们的婚礼（以及配套的紫色礼服）。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "atlantic": {
    "en": "In the past year, she made that aforementioned runway debut, opened for Lorde, and embarked on her first headline tour, going from barely traveling to crossing the Atlantic regularly.",
    "cn": "在过去的一年里，她完成了前面提到的t台首秀，为洛德（Lorde）做了开场秀，并开始了她的第一次头条巡演，从几乎不旅行到定期横渡大西洋。",
    "src": "Vogue · 2026-09-10"
  },
  "atmosphere": {
    "en": "The crowd were great, with the atmosphere [pushing the players on].",
    "cn": "人群很棒，气氛[推动球员前进]。",
    "src": "Sky Sports · 2026-09-09"
  },
  "attach": {
    "en": "Scientists also spotted squid egg clusters attached to the vessel.",
    "cn": "科学家们还发现了附着在船上的鱿鱼卵簇。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "attack": {
    "en": "Gen. Clint Barnes, about the risk that Iran would attack their location, which was roughly 65 miles from the border.",
    "cn": "克林特·巴恩斯（Clint Barnes）将军谈到了伊朗可能袭击他们的地点的风险，他们的地点距离边境大约65英里。",
    "src": "CBS News · 2026-09-10"
  },
  "attend": {
    "en": "I caught up with the actress in London last week, just before attending YSL Beauty’s London Block Party to celebrate the brand’s new fragrance, Black Opium Pink Glaze Eau de Parfum.",
    "cn": "上周，我在伦敦采访了这位女演员，就在参加YSL Beauty的伦敦街区派对之前，该派对是为了庆祝该品牌的新香水Black Opium Pink Glaze Eau de Parfum。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "attention": {
    "en": "On the night the Po sank, however, its lights had intentionally been kept off to avoid drawing attention to other ships anchored in the bay.",
    "cn": "然而，在Po沉没的那天晚上，它的灯被故意关闭，以避免引起停泊在海湾的其他船只的注意。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "attitude": {
    "en": "It was still uncertain that Chelsea had finally sealed their progress when Valentin Barco blasted them 5-3 up from close range from another Rogers assist, but they could finally rest easy in added time - and extinguish Leeds' commendable never-say-die attitude - when Welbeck nodded Barco's wildly mishit effort beyond Zetterer.",
    "cn": "当瓦伦丁·巴科（Valentin Barco）从另一位罗杰斯（Rogers）助手的近距离以5比3击败他们时，切尔西最终是否已经封锁了他们的进步仍不确定，但当韦尔贝克（Welbeck）点头点头时，他们终于可以在额外的时间内轻松休息，并消除利兹（Leeds）值得称赞的永不言败的态度。",
    "src": "Sky Sports · 2026-09-09"
  },
  "autumn": {
    "en": "It’ll work with your favorite autumn knit, that little black dress, jeans, and a tee, or whatever else your fall wardrobe throws at you.",
    "cn": "它可以搭配你最喜欢的秋季针织衫、小黑裙、牛仔裤和t恤，或者你秋天衣橱里的任何其他衣服。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "authority": {
    "en": "We cover what’s new and what’s next in fashion by working with the world’s leading authorities in ready-to-wear, footwear, accessories, and more.",
    "cn": "我们通过与成衣、鞋类、配饰等领域的世界领先权威机构合作，报道时尚领域的新动向和新趋势。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "author": {
    "en": "Study co-author Michelle Szydlowski, an anthrozoologist at Miami University, notes that the ball-building behavior makes sense with raccoon biology.",
    "cn": "该研究的合著者、迈阿密大学的人类动物学家米歇尔·希德洛夫斯基（Michelle Szydlowski）指出，浣熊造球的行为在生物学上是有道理的。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "august": {
    "en": "Missouri's new districts were used in the August primaries.",
    "cn": "密苏里州的新区被用于8月初选。",
    "src": "CBS News · 2026-09-10"
  },
  "audience": {
    "en": "We are thrilled to champion this cinematic supernova and take it to audiences worldwide.”",
    "cn": "我们很高兴能支持这部电影超新星，并把它带给全世界的观众。",
    "src": "Variety · 2026-09-10"
  },
  "attribute": {
    "en": "Flores’s freeform garments, which seem to document the flow state of her creativity, can feel as if they are in a state of becoming, a positive attribute.",
    "cn": "弗洛雷斯的自由造型服装似乎记录了她创造力的流动状态，让人感觉它们处于一种形成的状态，这是一种积极的属性。",
    "src": "Vogue · 2026-09-10"
  },
  "army": {
    "en": "The ships cross the Channel and the Norman army establishes itself on English soil.",
    "cn": "船队越过英吉利海峡，诺曼军队在英国领土上建立了自己的军队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "arrangement": {
    "en": "Sky Sports will show 29 matches between December 26 and January 7; The Premier League announced the festive fixtures early as it \"gives supporters more than three months' notice to plan and make travel arrangements\"",
    "cn": "天空体育将在12月26日至1月7日期间播出29场比赛；英超提前公布了节日赛程，因为它“给了球迷三个多月的时间来计划和安排旅行”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "arrival": {
    "en": "Here’s what you need to know about the real history behind The Uprising ahead of the film’s arrival in theaters across the United States on September 10.",
    "cn": "以下是电影于9月10日抵达美国各地影院之前，您需要了解的《起义》背后的真实历史。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "arrive": {
    "en": "By the time Argelia, our new babysitter, arrived, Livia was washed, dressed, and fed.",
    "cn": "当我们的新保姆阿格利亚来的时候，利维娅已经洗好了衣服，吃饱了饭。",
    "src": "Vogue · 2026-09-10"
  },
  "art": {
    "en": "Now, because there's no UV lamp, gel, or elaborate nail art involved, it's surprisingly easy to recreate at home.",
    "cn": "现在，由于不需要紫外线灯、凝胶或复杂的美甲工艺，在家就可以轻松制作。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "artificial": {
    "en": "The findings suggest that the Po has transformed into an artificial reef, providing habitat and shelter for a diverse range of marine life.",
    "cn": "研究结果表明，Po已经变成了一个人工珊瑚礁，为各种海洋生物提供了栖息地和庇护所。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "artist": {
    "en": "Renoir, born in France in 1841, was one of Impressionism’s founding artists.",
    "cn": "雷诺阿1841年出生于法国，是印象派的奠基人之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "asia": {
    "en": "Nippon TV has ordered a second season of Talpa Studios ‘ game show “ The Floor ” in Japan, building on the format’s first full adaptation in Asia.",
    "cn": "日本电视台（Nippon TV）订购了日本Talpa Studios的游戏节目《The Floor》第二季，这是该节目在亚洲首次全面改编。",
    "src": "Variety · 2026-09-10"
  },
  "assume": {
    "en": "Cooper will assume her new post on October 1, with Pemsel stepping down on September 30 after a decade-long stint on the executive board, with four years as chair.",
    "cn": "库珀将于10月1日上任，而彭塞尔将于9月30日卸任，此前他在执行董事会工作了10年，并担任了四年主席。",
    "src": "Vogue · 2026-09-10"
  },
  "association": {
    "en": "\"The Escape\" is a Keshet Media Group production in association with Reisdor Productions for Keshet 12, produced by SE Films and Reisdor.",
    "cn": "“The Escape”是凯舍特传媒集团与瑞斯多制作公司联合制作的凯舍特12，由SE电影和瑞斯多制作。",
    "src": "Variety · 2026-09-10"
  },
  "associate": {
    "en": "While Lauren is most associated with a particular kind of polished Americana, he wasn’t afraid to show his more rebellious side.",
    "cn": "虽然Lauren与某种特定的抛光美式风格联系最紧密，但他并不害怕表现出自己更叛逆的一面。",
    "src": "ELLE · 2026-09-09"
  },
  "assistant": {
    "en": "I have an assistant help here and there, but most people have people for different steps.",
    "cn": "我这里有一个助手，那里有一个助手，但大多数人都有不同步骤的人。",
    "src": "Vogue · 2026-09-10"
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
  "american": {
    "en": "That trade is not good,\" he said late Wednesday at the American Airlines Center, the Dallas Mavericks' home arena.",
    "cn": "这种交易并不好，”他在周三晚些时候在达拉斯小牛队的主场美国航空中心说道。",
    "src": "CBS News · 2026-09-10"
  },
  "america": {
    "en": "The broadcaster launched in-house production arm Gyokuro Studio in 2025, alongside a Los Angeles business office handling co-development and sales for the U.S. and Latin America.",
    "cn": "该广播公司于2025年成立了内部制作部门Gyokuro Studio，并在洛杉矶设立了一个业务办公室，负责美国和拉丁美洲的联合开发和销售。",
    "src": "Variety · 2026-09-10"
  },
  "account": {
    "en": "Expected goals and assists does a much better job of showing just how dangerous a player was around the goal, since they take into account every shot and every pass a player makes.",
    "cn": "预期进球和预期助攻更能反映球员在禁区附近的威胁，因为它考虑了球员的每一次射门和传球。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "achieve": {
    "en": "Although the rebellion failed to achieve any of its stated goals, it inspired subsequent “large-scale popular uprisings with a political aim,” Prescott says.",
    "cn": "普雷斯科特说，尽管叛乱未能实现其任何既定目标，但它激发了随后的“有政治目的的大规模民众起义”。",
    "src": "Smithsonian Magazine · 2026-09-09"
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
  "act": {
    "en": "\"Times are tough, and we need to be listening to everything they're saying about the struggles that they're encountering in their budgets and their kitchen table and their businesses, healthcare and act on it.",
    "cn": "“时局艰难，我们需要倾听他们所说的一切，关于他们在预算、餐桌、生意、医疗方面遇到的困难，并采取行动。",
    "src": "CBS News · 2026-09-09"
  },
  "action": {
    "en": "Yehuda Levi (\"A Body that Works\") stars in a new international action-thriller \"The Escape\" for Keshet International.",
    "cn": "耶胡达·利瓦伊（《有效的身体》）主演了凯舍特国际公司的一部新的国际动作惊悚片《越狱》。",
    "src": "Variety · 2026-09-10"
  },
  "additional": {
    "en": "Foulkes has pitched raising Medicaid reimbursement rates, and she's proposed a tax on millionaires, which would allot money to build over 20,000 homes by adding an additional 3% tax on incomes over $1 million.",
    "cn": "福克斯提议提高医疗补助报销率，她还提议对百万富翁征税，这将通过对超过100万美元的收入额外征收3%的税来分配建造2万多套住房的资金。",
    "src": "CBS News · 2026-09-10"
  },
  "addition": {
    "en": "Gucci revisits its equestrian roots with a new Horsebit fine jewelry and watch collection, giving the iconic house code a fresh update in diamonds and gold, while Louis Vuitton brings a bold dose of color to its signature Tambour Spin Time with five new additions to the permanent collection.",
    "cn": "古驰（Gucci）以全新的Horsebit高级珠宝和腕表系列重温其马术渊源，以钻石和黄金为标志性的品牌代码进行了全新的更新，而路易威登（Louis Vuitton）则为其标志性的Tambour Spin Time带来了大胆的色彩，为其永久系列增添了五款新产品。",
    "src": "ELLE · 2026-09-09"
  },
  "add": {
    "en": "“What’s in the package may not actually be what is on the outside of the label,” Doroshow adds.",
    "cn": "Doroshow补充道：“包装中的东西实际上可能不是标签外面的东西。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "actually": {
    "en": "“It functions as rainwear and is made of a technical fabric, but the jacket actually has a leathery cool look to it,” said Rhee.",
    "cn": "他说：“它的功能是雨衣，由一种技术面料制成，但这件夹克实际上有一种皮革般的酷感。",
    "src": "Vogue · 2026-09-10"
  },
  "actual": {
    "en": "Among the actual wingers who got consistent playing time, we're left with three -- out of 19 -- who were able to dribble past their defender and turn it into above-average production.",
    "cn": "在真正有稳定出场时间的边锋中，19 人里只有 3 人能够突破对手并转化为高于平均水准的产出。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "actress": {
    "en": "The actress and new face of YSL Beauty’s Black Opium Eau de Parfum told me the green flags she looks for in a good party (just before we went to one together).",
    "cn": "这位女演员兼圣罗兰美妆黑色鸦片香水的新代言人告诉我，她在一个好的派对上最喜欢的绿色旗帜是什么（就在我们一起去派对之前）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "actor": {
    "en": "It stars Kiri alongside Dutch actor Jonas Smulders (\"Luka,\" \"Paradise Drifters\") and Serbia's Darko Perić (\"Money Heist\").",
    "cn": "它与荷兰演员Jonas Smulders （“Luka”，“天堂流浪者”）和塞尔维亚的Darko Perić （“金钱抢劫”）一起出演。",
    "src": "Variety · 2026-09-10"
  },
  "activity": {
    "en": "Curators are hosting talks and special events throughout the exhibition run, while a programme of activities for schools and families ensures the Tapestry’s story reaches the widest possible audience.",
    "cn": "策展人在整个展览期间举办讲座和特别活动，同时为学校和家庭举办活动，确保挂毯的故事尽可能多地吸引观众。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "active": {
    "en": "“In laboratory and early clinical work, exosomes appear to calm inflammatory signaling that can contribute to thinning, support the dermal papilla cells that regulate the hair cycle, and encourage follicles to re-enter the active growth phase,” she continues.",
    "cn": "“在实验室和早期临床工作中，外泌体似乎可以平息导致头发变薄的炎症信号，支持调节头发周期的真皮乳头细胞，并鼓励毛囊重新进入活跃的生长阶段，”她继续说。",
    "src": "ELLE · 2026-09-09"
  },
  "abandon": {
    "en": "\"At its heart is a boy being forced to grow up too quickly in a world that has abandoned him.",
    "cn": "“故事的核心是一个男孩被迫在一个抛弃他的世界中过快成长。",
    "src": "Variety · 2026-09-10"
  },
  "ability": {
    "en": "For candidates running in places where Mr. Trump is popular, it's an opportunity to capitalize on the president's unparalleled ability to turn out the base.",
    "cn": "对于在特朗普受欢迎的地方竞选的候选人来说，这是一个利用特朗普无与伦比的拉票能力的机会。",
    "src": "CBS News · 2026-09-09"
  },
  "able": {
    "en": "Among the actual wingers who got consistent playing time, we're left with three -- out of 19 -- who were able to dribble past their defender and turn it into above-average production.",
    "cn": "在真正有稳定出场时间的边锋中，19 人里只有 3 人能够突破对手并转化为高于平均水准的产出。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "about": {
    "en": "I polled some of the biggest hair colorists in the business on what they’re excited about (and already getting requests for).",
    "cn": "我调查了业内一些最大的染发师，问他们最感兴趣的是什么（以及已经收到的要求）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "above": {
    "en": "James and I wept too, uncomprehending—the flames, the smoke, above all the people jumping.",
    "cn": "詹姆斯和我也哭了，无法理解——火焰，烟雾，最重要的是人们跳了起来。",
    "src": "Vogue · 2026-09-10"
  },
  "absence": {
    "en": "Many believe Chelsea could push Arsenal the closest this season, given an absence of European football and Alonso's encouraging early returns.",
    "cn": "很多人认为切尔西是本赛季最有可能挑战阿森纳的球队，因为蓝军没有欧战任务，而阿隆索的开局令人鼓舞。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "absolute": {
    "en": "But John Finnemore has crafted an absolute masterpiece: a cycle of five plays that are each as funny as they are moving, and of course, deeply, deeply unpredictable.",
    "cn": "但约翰·芬尼莫尔创作了一部绝对的杰作：一部由五部戏剧组成的戏剧循环，每部戏剧既有趣又感人，当然，也非常非常不可预测。",
    "src": "Variety · 2026-09-10"
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
  "accessory": {
    "en": "Finally, ME+EM expands its accessories world with Atelier.",
    "cn": "最后，ME+EM通过Atelier拓展了其配件领域。",
    "src": "ELLE · 2026-09-09"
  },
  "accord": {
    "en": "Still, more than two dozen are scheduled to speak at the event, according to the RNC.",
    "cn": "尽管如此，据共和党全国委员会称，仍有20多人计划在这次活动上发言。",
    "src": "CBS News · 2026-09-09"
  },
  "access": {
    "en": "It gives the industry access to something they don’t have in the same combination, the Middle East, Asia, capital, consumers, and culture in one market.",
    "cn": "它让行业能够接触到中东、亚洲、资本、消费者和文化在同一个市场中所不具备的东西。",
    "src": "Vogue · 2026-09-10"
  },
  "accent": {
    "en": "Beyond browns, deep, vampy reds and burgundies remain popular for this time of year, but we’re also seeing a lot of metallic accents.",
    "cn": "除了棕色，深沉的、吸血鬼般的红色和勃艮第色在每年的这个时候仍然很受欢迎，但我们也看到了很多金属色调。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "academy": {
    "en": "As part of his HistoryExtra Academy series on the embroidery, Dr David Musgrove examines the history of the tapestry, the story it tells, who made it and whether it's reliable as a historical source…",
    "cn": "作为他关于刺绣的历史系列的一部分，大卫·马斯格罗夫博士研究了挂毯的历史，它讲述的故事，它的制造者，以及它作为历史来源是否可靠…",
    "src": "HistoryExtra · 2026-09-09"
  },
  "administration": {
    "en": "More than $100 billion has been refunded due to a Supreme Court ruling earlier this year that struck down many of the administration's tariffs.",
    "cn": "由于最高法院今年早些时候的一项裁决取消了政府的许多关税，已退还了超过1000亿美元$。",
    "src": "CBS News · 2026-09-10"
  },
  "admire": {
    "en": "It’s a once-in-a-lifetime opportunity – or, really, once in a millennium: the chance to admire the Bayeux Tapestry in the land of its creation.",
    "cn": "这是一个千载难逢的机会，或者说，千载难逢：有机会在贝叶挂毯的诞生地欣赏它。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "aim": {
    "en": "Although the rebellion failed to achieve any of its stated goals, it inspired subsequent “large-scale popular uprisings with a political aim,” Prescott says.",
    "cn": "普雷斯科特说，尽管叛乱未能实现其任何既定目标，但它激发了随后的“有政治目的的大规模民众起义”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "air": {
    "en": "But then the second plane hit while the news was still on air, and the five-minute newscast grew longer, and longer.",
    "cn": "但是，当新闻还在播出时，第二架飞机坠毁了，五分钟的新闻广播变得越来越长。",
    "src": "Vogue · 2026-09-10"
  },
  "airline": {
    "en": "The Dallas event, at the American Airlines Center, is expected to look more like a highly produced, extended political rally headlined by Mr. Trump than a typical convention, where the party would conduct official business such as formally selecting a presidential nominee.",
    "cn": "达拉斯的这次活动在美国航空中心（American Airlines Center）举行，预计看起来更像是一场以特朗普为主角的高度制作的长篇政治集会，而不是一场典型的大会，该党将在大会上处理正式选出总统候选人等官方事务。",
    "src": "CBS News · 2026-09-09"
  },
  "alarm": {
    "en": "An older study—with more alarming findings—won the Ig Nobel Economics Prize.",
    "cn": "一项具有更令人担忧的发现的较早研究获得了搞笑诺贝尔经济学奖。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "alike": {
    "en": "This necklace will look stunning with simple sweaters and opulent dresses alike.",
    "cn": "这条项链搭配简单的毛衣和华丽的裙子都很漂亮。",
    "src": "Who What Wear · 2026-09-10"
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
    "en": "Simply massage into your hair and allow it to enhance what’s already there.",
    "cn": "简单地按摩你的头发，让它增强已经存在的东西。",
    "src": "ELLE · 2026-09-09"
  },
  "almost": {
    "en": "As Belghiran says: “You’ll feel so good that you’re almost about to fly.”",
    "cn": "正如Belghiran所说：“你会感觉很好，就像要飞起来一样。",
    "src": "ELLE · 2026-09-09"
  },
  "alone": {
    "en": "In Ecuador alone, more than 25,000 people have been murdered in the last three years as drug gangs have vied for control of trafficking routes.",
    "cn": "仅在厄瓜多尔，在过去三年中，由于贩毒团伙争夺对贩运路线的控制，已有2.5万多人被谋杀。",
    "src": "CBS News · 2026-09-10"
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
  "always": {
    "en": "I'm always going to reject the extremes in socialism and that anti-American way of life.\"",
    "cn": "我总是会拒绝极端的社会主义和反美生活方式。",
    "src": "CBS News · 2026-09-10"
  },
  "ahead": {
    "en": "Ahead, find the 10 best conditioners for fine hair.",
    "cn": "提前找到10种最适合细头发的护发素。",
    "src": "ELLE · 2026-09-10"
  },
  "alternative": {
    "en": "“While we love a long and bold statement nail look, the short manicure remains a timeless classic, offering an understated, chic, and, frankly, more practical alternative to length,” says Daisy Kalnina, founder of The Gel Bottle.",
    "cn": "the Gel Bottle的创始人黛西·卡尔尼娜（Daisy Kalnina）说：“虽然我们喜欢大胆的长指甲，但短指甲仍然是永恒的经典，它提供了一种低调、别致、坦率地说，比长指甲更实用的选择。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "also": {
    "en": "To coincide with the exhibition, the British Museum is also publishing a range of books for readers of all ages.",
    "cn": "为了配合这次展览，大英博物馆还为各个年龄段的读者出版了一系列书籍。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "already": {
    "en": "I polled some of the biggest hair colorists in the business on what they’re excited about (and already getting requests for).",
    "cn": "我调查了业内一些最大的染发师，问他们最感兴趣的是什么（以及已经收到的要求）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "although": {
    "en": "Although far from their convincing best, the Hoops did enough to close out their 13th win in a row in total stretching back to the closing weeks of last season.",
    "cn": "虽然远非他们令人信服的最佳成绩，但篮筐队已经做了足够的努力，在上赛季的最后几周结束了连续第13场胜利。",
    "src": "Sky Sports · 2026-09-09"
  },
  "agreement": {
    "en": "The president and members of both parties, including Fetterman, had initially opposed Nippon's efforts to buy the iconic Pittsburgh-based steelmaker, but Mr. Trump ultimately signed off on an agreement that he argued would result in tens of billions in new investments in U.S. Steel and grant the federal government a \"golden share\" in the company.",
    "cn": "总统和包括Fetterman在内的双方成员最初反对日本收购这家总部位于匹兹堡的标志性钢铁制造商的努力，但特朗普最终签署了一项协议，他认为该协议将导致对美国钢铁公司进行数百亿美元的新投资，并授予联邦政府该公司的“黄金份额”。",
    "src": "CBS News · 2026-09-10"
  },
  "advise": {
    "en": "Titled The Uprising, the movie stars Andrew Garfield as the Ploughman, a fictionalized everyman who takes up arms against the corrupt politicians advising England’s 14-year-old king, Richard II.",
    "cn": "这部名为《起义》（The Uprising）的电影由安德鲁·加菲尔德（Andrew Garfield）饰演犁人（Ploughman），这是一个虚构的普通人，他拿起武器对抗为英格兰14岁的国王理查二世（Richard II）提供",
    "src": "Smithsonian Magazine · 2026-09-09"
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
  "affect": {
    "en": "Hasan Kahya, an Aksu resident who was helping firefighters tackle the blaze, suffered a heart attack after being affected by the smoke and later died in hospital, the district’s mayor, Isa Yildirim, said.",
    "cn": "阿克苏市长伊萨·耶尔德勒姆说，阿克苏居民哈桑·卡亚（Hasan Kahya）当时正在帮助消防员灭火，他在受到烟雾影响后心脏病发作，后来在医院去世。",
    "src": "ABC News · 2026-09-09"
  },
  "ago": {
    "en": "Millions of years ago, during the late Cretaceous, some of the largest dinosaurs ever were laying eggs in surprisingly cold places.",
    "cn": "数百万年前，在白垩纪晚期，一些有史以来最大的恐龙在出奇寒冷的地方产卵。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "aggressive": {
    "en": "Hailing a new generation of conservative leaders emerging across the region who are allied with President Trump, Rubio said Washington was finding partners willing to be \"very aggressive\" against criminal groups.",
    "cn": "卢比奥称赞该地区新一代与特朗普总统结盟的保守派领导人，他说，华盛顿正在寻找愿意对犯罪集团“非常积极”的合作伙伴。",
    "src": "CBS News · 2026-09-10"
  },
  "agent": {
    "en": "“Some lightweight conditioners even contain proteins or thickening agents that plump up the strands, making hair thicker and healthier.”",
    "cn": "“一些轻质护发素甚至含有蛋白质或增稠剂，使头发更浓密、更健康。",
    "src": "ELLE · 2026-09-10"
  },
  "agency": {
    "en": "In time, a tightly fitted row of single-peaked teeth came into view, Dąbrowski tells Roman Skiba of the Polish Press Agency (PAP).",
    "cn": "Dąbrowski告诉波兰新闻社（PAP）的Roman Skiba ，随着时间的推移，一排紧密贴合的单峰牙齿出现在视野中。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "age": {
    "en": "For more than 150 years, Harper’s Bazaar has been the preeminent fashion, beauty, and lifestyle resource for women at every age.",
    "cn": "150多年来，《时尚芭莎》一直是各年龄段女性卓越的时尚、美容和生活方式资源。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "against": {
    "en": "Nothing against spring pastels or vibrant, summer vacation-ready polishes, but a moody, fall mani just does something to my psyche.",
    "cn": "没有什么可以反对春天的柔和色调，也没有什么可以反对充满活力的暑假指甲油，但是一个忧郁的秋天指甲油确实会让我的心灵受到影响。",
    "src": "Who What Wear · 2026-09-10"
  },
  "afterward": {
    "en": "At one point James hastily changed her diaper on a table in a niche in the library, a transgression that we laughed about afterwards.",
    "cn": "有一次，詹姆斯在图书馆壁龛里的一张桌子上匆忙地换了尿布，这是我们后来嘲笑的违规行为。",
    "src": "Vogue · 2026-09-10"
  },
  "afternoon": {
    "en": "This afternoon, Lauren drew an intimate but expectedly A-list crowd inside an Italian Renaissance Revival landmark building in Manhattan’s Tribeca neighborhood.",
    "cn": "今天下午，Lauren在曼哈顿翠贝卡（Tribeca）街区的一座意大利文艺复兴复兴时期的地标性建筑内吸引了一群亲密但令人期待的一线人群。",
    "src": "ELLE · 2026-09-09"
  },
  "after": {
    "en": "His goal, brilliantly taken from the edge of the box after a 29-pass build-up, proved crucial.",
    "cn": "在经历了29次积累之后，他的进球从盒子的边缘出色地被证明是至关重要的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "afraid": {
    "en": "While Lauren is most associated with a particular kind of polished Americana, he wasn’t afraid to show his more rebellious side.",
    "cn": "虽然Lauren与某种特定的抛光美式风格联系最紧密，但他并不害怕表现出自己更叛逆的一面。",
    "src": "ELLE · 2026-09-09"
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
    "en": "As summer comes to a close and we look toward fall, jewelry designers are celebrating major milestones and finding fresh ways to breathe new life into familiar signatures.",
    "cn": "随着夏天的结束，我们期待着秋天，珠宝设计师们正在庆祝重要的里程碑，并寻找新的方法为熟悉的签名注入新的生命。",
    "src": "ELLE · 2026-09-09"
  },
  "bridge": {
    "en": "Chelsea goalkeeper Emiliano Martinez is ex-Arsenal, winger Noni Madueke left Stamford Bridge to join Arsenal, and Declan Rice was released by the Blues as a teenager.",
    "cn": "切尔西门将马丁内斯是前阿森纳球员，边锋马杜埃凯从斯坦福桥转投阿森纳，赖斯则在少年时期就被切尔西放弃。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "brief": {
    "en": "It was first documented in a 1476 inventory of the treasures of Bayeux Cathedral, and it’s been in Bayeux ever since, bar a couple of brief sojourns elsewhere.",
    "cn": "它最早被记录在1476年巴叶大教堂的宝藏清单中，从那以后它就一直在巴叶，除了在其他地方短暂停留过几次。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "bright": {
    "en": "“Spiced Smudge is really a response to the shift we’re seeing away from overly bright, high-maintenance color,” says hairstylist Sara Botsford.",
    "cn": "发型师萨拉·博茨福德说：“我们看到，过度鲜艳、需要保养的头发颜色越来越少，香料涂抹是对这种趋势的回应。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "brilliant": {
    "en": "A brilliant cross into the box from Tounekti is headed past by Diabate.",
    "cn": "一个来自Tounekti的辉煌十字架被Diabate带到了盒子里。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bring": {
    "en": "Louis Vuitton is bringing bold color to its watchmaking lineup with five new Tambour Spin Time references joining the permanent collection.",
    "cn": "路易威登（Louis Vuitton）为其制表系列带来了大胆的色彩，五款新的Tambour Spin Time系列加入了其永久系列。",
    "src": "ELLE · 2026-09-09"
  },
  "brother": {
    "en": "The action actually starts a couple of years before the set-piece battle of Hastings, with a discussion between England’s King, Edward the Confessor, and his leading noble (who was also his brother-in-law), Harold Godwinson.",
    "cn": "故事发生在黑斯廷斯战役前几年，英国国王忏悔者爱德华和他的贵族领袖（也是他的姐夫）哈罗德·戈德温森之间的讨论。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "broad": {
    "en": "There is some precedent for broad-based payments to U.S. households.",
    "cn": "向美国家庭提供基础广泛的支付有一些先例。",
    "src": "CBS News · 2026-09-10"
  },
  "british": {
    "en": "The Bayeux Tapestry is being displayed in the UK as part of a landmark exhibition at the British Museum in London.",
    "cn": "贝叶挂毯作为伦敦大英博物馆标志性展览的一部分正在英国展出。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "brisk": {
    "en": "A deeper shade also elevates my outfits to the nth degree—even more so if I opt for a chic, artful design —so I've been collecting inspo for months in preparation for the first kiss of brisk fall air.",
    "cn": "更深的颜色也会让我的服装提升到第n级——如果我选择别致、巧妙的设计，效果会更明显——所以我几个月来一直在收集灵感，为秋天清新空气的初吻做准备。",
    "src": "Who What Wear · 2026-09-10"
  },
  "broadcast": {
    "en": "There are two festive midweek rounds of Premier League fixtures when every match will be broadcast live on Sky Sports.",
    "cn": "英超联赛周中有两轮喜庆的比赛，每场比赛都将在天空体育进行直播。",
    "src": "Sky Sports · 2026-09-10"
  },
  "brown": {
    "en": "Beyond browns, deep, vampy reds and burgundies remain popular for this time of year, but we’re also seeing a lot of metallic accents.",
    "cn": "除了棕色，深沉的、吸血鬼般的红色和勃艮第色在每年的这个时候仍然很受欢迎，但我们也看到了很多金属色调。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "brand": {
    "en": "It all made sense that the brand would kick off a new scent by, well, throwing its own party.",
    "cn": "这一切都说得通，该品牌将通过举办自己的派对来启动一款新香水。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "bold": {
    "en": "AI technology finally allows us to become much more ambitious, independent, and bold in the worlds we create and the projects we imagine.",
    "cn": "人工智能技术最终让我们在我们创造的世界和我们想象的项目中变得更加雄心勃勃、独立和大胆。",
    "src": "Variety · 2026-09-10"
  },
  "bolt": {
    "en": "“They were equipped with an electric knife or a metal saw—whatever you prefer to call it—and they cut through the bolts holding the frames of Renoir’s works in place,” Bryan Masson, the mayor of Cagnes-sur-Mer, told reporters, per ABC News ’ Kevin Shalvey.",
    "cn": "据ABC新闻的凯文·沙维报道，滨海卡涅市长布莱恩·马森告诉记者：“他们配备了一把电动刀或一把金属锯——不管你喜欢怎么称呼它——他们把雷诺阿作品框架固定的螺栓切断了。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "bond": {
    "en": "If you’re looking to add some serious body to your hair in just one wash, the Olaplex Nº5 Fine Bond Maintenance Conditioner was made for you.",
    "cn": "如果您想在一次洗涤中为您的头发增添一些严肃的身材，Olaplex Nº5精细粘合维护护发素就是为您量身定做的。",
    "src": "ELLE · 2026-09-10"
  },
  "bone": {
    "en": "“We know their bones have turned up in places as far south as Antarctica and southern Argentina, and as far north as Mongolia and Texas,” says Darla Zelenitsky, a study co-author and paleontologist at the University of Calgary in Canada, to Katie Hunt at CNN.",
    "cn": "加拿大卡尔加里大学的研究合著者和古生物学家Darla Zelenitsky对CNN的Katie Hunt说：“我们知道他们的骨头出现在南极洲和阿根廷南部，以及蒙古和德克萨斯州的北部。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "book": {
    "en": "Jungle Book Studio has taken international sales rights to “ Angh,” the debut feature from Nagaland filmmaker Theja Rio.",
    "cn": "《丛林之书》工作室获得了那加兰邦电影制作人Theja b里约热内卢的处女作《Angh》的国际销售权。",
    "src": "Variety · 2026-09-10"
  },
  "border": {
    "en": "Above and below the action are borders populated by animals, birds, mythical creatures, decorative devices and mini scenes that may or may not relate to the main narrative.",
    "cn": "行动的上方和下方是由动物、鸟类、神话生物、装饰装置和迷你场景组成的边界，这些场景可能与主要叙事有关，也可能与主要叙事无关。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "bore": {
    "en": "“To have something polarizing is a compliment because I would always rather be part of the conversation and have something interesting than something boring and safe.”",
    "cn": "“有一些两极分化的东西是一种赞美，因为我总是宁愿成为谈话的一部分，做一些有趣的事情，而不是无聊和安全的事情。",
    "src": "Harper's Bazaar · 2026-09-09"
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
    "en": "In the collection’s show notes, the designer cited an “irreverent take on romance,” an ethos that carried through to both the silhouette and styling.",
    "cn": "在系列的展览笔记中，设计师引用了“对浪漫的不敬”，这种精神贯穿于轮廓和造型中。",
    "src": "ELLE · 2026-09-09"
  },
  "boy": {
    "en": "He had been blinded by sandstorms in Iraq; as a boy, Amandeep’s father had accompanied his uncle to Rupar in Ambala, in undivided India, to collect his army pension.",
    "cn": "他在伊拉克被沙尘暴弄瞎了眼睛；当阿曼迪普还是个孩子的时候，他的父亲曾陪同叔叔去印度未分裂的安巴拉的鲁帕尔领取他的军队养老金。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "box": {
    "en": "His goal, brilliantly taken from the edge of the box after a 29-pass build-up, proved crucial.",
    "cn": "在经历了29次积累之后，他的进球从盒子的边缘出色地被证明是至关重要的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bowl": {
    "en": "She then carried the slip of paper to a bowl of water, dunked it repeatedly, and rolled it between her front paws and against the sand until it formed a compact, gritty ball.",
    "cn": "然后，她把纸条拿到一碗水里，反复浸泡，用前爪在沙子上滚来滚去，直到它变成一个致密的沙砾球。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "bound": {
    "en": "In the basement of Lahore Museum in Pakistan were 34 black, leather-bound registers gathering dust.",
    "cn": "在巴基斯坦拉合尔博物馆（Lahore Museum）的地下室里，有34本黑色皮革装订的登记簿落满了灰尘。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "bottle": {
    "en": "But then you look at the bottle—how beautiful it looks in your bathroom and how it feels when you hold it—and it’s an item that you want to own.",
    "cn": "但当你看到这个瓶子——它放在你的浴室里多么漂亮，你拿着它的感觉多么美妙——你就会想拥有它。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "bow": {
    "en": "It's hard to believe that Ralph Lauren (the man) has remained at the helm of his namesake brand for its entire six-decade-and-counting run, but alas, there he was taking a bow at the end of today's runway show.",
    "cn": "很难相信拉尔夫·劳伦（Ralph Lauren）在他的同名品牌60多年的历史中一直掌舵，但可惜的是，他在今天的时装秀结束时鞠躬谢幕。",
    "src": "Who What Wear · 2026-09-10"
  },
  "brush": {
    "en": "To create the style, she prepped Bullock’s damp hair with a combination of RŌZ Santa Lucia Styling Oil and the RŌZ Milk Hair Serum before blow-drying with a round brush.",
    "cn": "为了打造这种造型，她用RŌZ圣卢西亚造型油和RŌZ牛奶护发精华液为布洛克潮湿的头发做了准备，然后用圆刷吹干。",
    "src": "ELLE · 2026-09-09"
  },
  "call": {
    "en": "Titanosaurs belonged to a group of long-necked and four-legged dinosaurs called sauropods.",
    "cn": "泰坦龙属于一群长颈和四条腿的恐龙，称为蜥脚类恐龙。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "calm": {
    "en": "On March 1, while members of the unit holed up in a bunker amid air sirens, Cody's family said many survivors of the attack and other officers on the ground told them Cody advised Barnes that the unit should remain there, even amid periods of calm.",
    "cn": "3月1日，科迪的家人说，当这支部队的成员在空中警报声中躲在一个地堡里时，科迪的家人说，许多袭击的幸存者和地面上的其他军官告诉他们，科迪建议巴恩斯，即使在平静时期，这支部队也应该留在那里。",
    "src": "CBS News · 2026-09-10"
  },
  "camera": {
    "en": "He also appears on camera in video and shopping livestream franchises, and is the star of Who What Wear's scripted show, Retail Therapy.",
    "cn": "他还出现在视频和购物直播特许经营的镜头前，并且是谁穿的脚本节目“零售疗法”的明星。",
    "src": "Who What Wear · 2026-09-10"
  },
  "camp": {
    "en": "They found that opportunity with the Iowa-based 103rd Sustainment Command, where Khork would serve as deputy force protection officer for nine months at Camp Arifjan in Kuwait.",
    "cn": "他们在爱荷华州的第103维持司令部找到了这个机会，霍尔克将在科威特的阿里夫詹营地担任9个月的副部队保护官。",
    "src": "CBS News · 2026-09-10"
  },
  "campaign": {
    "en": "But other Republicans running in competitive races are opting to save the money and campaign in their home districts or states.",
    "cn": "但是参加竞争激烈的竞选的其他共和党人选择节省资金，在他们的家乡选区或州竞选。",
    "src": "CBS News · 2026-09-09"
  },
  "can": {
    "en": "When a neighboring cell takes up an exosome, it receives a set of instructions that can change how that cell behaves.”",
    "cn": "当邻近细胞吸收外泌体时，它会收到一组可以改变细胞行为的指令。",
    "src": "ELLE · 2026-09-09"
  },
  "canal": {
    "en": "(The dreamy canals are, after all, the perfect setting for a bit of romance.)",
    "cn": "（毕竟，梦幻般的运河是浪漫的完美场所。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "cancer": {
    "en": "\"It's like a cancer that continues to grow until you don't literally have a state anymore.\"",
    "cn": "“这就像一种癌症，它会继续生长，直到你不再有一个真正的州。",
    "src": "CBS News · 2026-09-10"
  },
  "captain": {
    "en": "Rangers had to cope without captain and striker Lawrence Shankland, who missed out through injury, with Ryan Naderi starting in his place.",
    "cn": "流浪者不得不在没有队长和前锋劳伦斯·尚克兰德的情况下应对，劳伦斯·尚克兰德因伤缺席比赛，瑞安·纳德里（Ryan Naderi）开始取代他。",
    "src": "Sky Sports · 2026-09-09"
  },
  "capital": {
    "en": "Running for 10 months, the exhibition offers a once-in-a-generation opportunity for audiences to see the Tapestry in the British capital.",
    "cn": "为期10个月的展览为观众提供了一个千载难逢的机会，让他们在英国首都看到挂毯。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "candy": {
    "en": "In 2012, researchers reported that higher-class individuals are more likely to engage in unethical behaviors, like taking candy meant for children.",
    "cn": "2012年，研究人员报告说，高阶层的人更有可能从事不道德的行为，比如吃儿童糖果。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "candidate": {
    "en": "For candidates running in places where Mr. Trump is popular, it's an opportunity to capitalize on the president's unparalleled ability to turn out the base.",
    "cn": "对于在特朗普受欢迎的地方竞选的候选人来说，这是一个利用特朗普无与伦比的拉票能力的机会。",
    "src": "CBS News · 2026-09-09"
  },
  "canvas": {
    "en": "While on death row, he became a prolific painter and made more than $30,000 selling his canvases, which often featured clowns and skulls, the Los Angeles Times ’ Stephen Braun reported in 1994, the year Gacy was executed.",
    "cn": "《洛杉矶时报》的斯蒂芬·布劳恩（Stephen Braun）在1994年报道说，在死囚区，他成为一名多产的画家，卖掉画布赚了3万多$ ，画布上经常有小丑和头骨。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "burst": {
    "en": "The operation \"killed three narco-terrorists,\" SOUTHCOM posted on X along with black-and-white footage of a ship exploding in the water and bursting into flames.",
    "cn": "南方司令部在X上发布了这次行动“杀死了三名毒品恐怖分子”，并附上了一艘船在水中爆炸并起火的黑白画面。",
    "src": "CBS News · 2026-09-10"
  },
  "building": {
    "en": "We see enormous potential here, and I wanted to be part of building what comes next.",
    "cn": "我们在这里看到了巨大的潜力，我想成为未来发展的一部分。",
    "src": "Vogue · 2026-09-10"
  },
  "build": {
    "en": "Alright, fashion friends, let's continue building that chic fall wardrobe, shall we?",
    "cn": "好了，时尚的朋友们，让我们继续打造时髦的秋季衣橱，好吗？",
    "src": "Who What Wear · 2026-09-10"
  },
  "body": {
    "en": "Yehuda Levi (\"A Body that Works\") stars in a new international action-thriller \"The Escape\" for Keshet International.",
    "cn": "耶胡达·利瓦伊（《有效的身体》）主演了凯舍特国际公司的一部新的国际动作惊悚片《越狱》。",
    "src": "Variety · 2026-09-10"
  },
  "buy": {
    "en": "You can’t just buy any leave-in conditioner, though.",
    "cn": "不过，你不能随便买免洗护发素。",
    "src": "ELLE · 2026-09-09"
  },
  "busy": {
    "en": "England's top-flight have announced the festive fixtures more than three months in advance as it \"gives supporters notice to plan and make travel arrangements for a particularly busy time of the year\".",
    "cn": "英格兰顶级联赛提前三个多月宣布了节日赛程，因为这“给了球迷一个通知，让他们在一年中特别繁忙的时候计划和安排旅行”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "business": {
    "en": "What drew me in was the opportunity to build more of the infrastructure around the regional talent, connecting fashion to business, investment and international markets.",
    "cn": "吸引我的是有机会围绕地区人才建立更多的基础设施，将时尚与商业、投资和国际市场联系起来。",
    "src": "Vogue · 2026-09-10"
  },
  "boat": {
    "en": "Secretary of State Marco Rubio defended controversial strikes on suspected drug-trafficking boats during a visit to Ecuador on Wednesday, arguing Latin American cartels would \"eat these countries alive\" if left unchecked.",
    "cn": "美国国务卿卢比奥星期三在访问厄瓜多尔期间为有争议的打击涉嫌贩毒船只的行动进行了辩护，他说，如果不加以控制，拉美贩毒集团将“把这些国家活活吃掉”。",
    "src": "CBS News · 2026-09-10"
  },
  "board": {
    "en": "“We are delighted to welcome Pavita as chair of the BFC board.",
    "cn": "“我们很高兴欢迎Pavita成为BFC董事会主席。",
    "src": "Vogue · 2026-09-10"
  },
  "base": {
    "en": "His work spans bestselling audio storytelling, animation and AI-based productions, including \"Space Vets\" and \"Tarmac.\"",
    "cn": "他的作品涵盖了畅销的有声故事、动画和基于人工智能的作品，包括《太空兽医》（Space Vets）和《停机坪》（Tarmac）。",
    "src": "Variety · 2026-09-10"
  },
  "bat": {
    "en": "She began batting and chasing her creation across the ground.",
    "cn": "她开始在地上击球和追逐她的创作。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "bathroom": {
    "en": "But then you look at the bottle—how beautiful it looks in your bathroom and how it feels when you hold it—and it’s an item that you want to own.",
    "cn": "但当你看到这个瓶子——它放在你的浴室里多么漂亮，你拿着它的感觉多么美妙——你就会想拥有它。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "battle": {
    "en": "Then we get to the battle of Hastings itself, which is portrayed in considerable detail.",
    "cn": "接下来是黑斯廷斯战役，书中对其进行了相当详细的描述。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "because": {
    "en": "Because these products are not standardized, quality and sourcing can vary significantly.",
    "cn": "由于这些产品没有标准化，质量和来源可能会有很大差异。",
    "src": "ELLE · 2026-09-09"
  },
  "beauty": {
    "en": "The beauty of this particular mani, beyond the fact that it looks expensive as heck, is just how versatile it is.",
    "cn": "除了它看起来贵得离谱之外，这个特殊的美甲的美丽之处在于它是多么的万能。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "beautiful": {
    "en": "I have a feeling this beautiful beaded Zara skirt won't stay in stock for long.",
    "cn": "我有一种感觉，这条漂亮的扎拉珠裙不会在库存中停留太久。",
    "src": "Who What Wear · 2026-09-10"
  },
  "beat": {
    "en": "LONDON -- Martin Ødegaard's 50th-minute strike ensured Arsenal came from behind to beat Chelsea 2-1 at Emirates Stadium on Sunday.",
    "cn": "伦敦——马丁·厄德高在第 50 分钟的劲射，确保阿森纳在周日酋长球场以 2-1 逆转击败切尔西。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "beam": {
    "en": "The bride and groom beamed throughout, so happy.",
    "cn": "新郎新娘自始至终都面带笑容，非常幸福。",
    "src": "Vogue · 2026-09-10"
  },
  "beach": {
    "en": "After Mr. Trump won the 2024 election, Fetterman became the first Senate Democrat to meet with the incoming president at his Palm Beach residence.",
    "cn": "在特朗普赢得2024年大选后，费特曼成为第一位在棕榈滩住所会见新任总统的参议院民主党人。",
    "src": "CBS News · 2026-09-10"
  },
  "bay": {
    "en": "On the night the Po sank, however, its lights had intentionally been kept off to avoid drawing attention to other ships anchored in the bay.",
    "cn": "然而，在Po沉没的那天晚上，它的灯被故意关闭，以避免引起停泊在海湾的其他船只的注意。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "become": {
    "en": "AI technology finally allows us to become much more ambitious, independent, and bold in the worlds we create and the projects we imagine.",
    "cn": "人工智能技术最终让我们在我们创造的世界和我们想象的项目中变得更加雄心勃勃、独立和大胆。",
    "src": "Variety · 2026-09-10"
  },
  "bare": {
    "en": "Distressed denim was slung low on the hips and paired with a midriff-baring jacket lined with a shearling collar.",
    "cn": "做旧的牛仔布挂在臀部低处，搭配一件衬有羊毛领的裸露夹克。",
    "src": "ELLE · 2026-09-09"
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
    "en": "Expert review: “I don’t want controlling frizz to mean suppressing someone’s curl pattern or taking away all of their volume.",
    "cn": "专家评论：“我不希望控制头发卷曲意味着抑制某人的卷发模式，或者把他们的头发全部卷掉。",
    "src": "ELLE · 2026-09-09"
  },
  "baby": {
    "en": "Pygmy raccoons, also called Cozumel raccoons, weigh between six and nine pounds, around the same as a newborn human baby.",
    "cn": "侏儒浣熊，也叫科苏梅尔浣熊，体重在6到9磅之间，和一个新生的人类婴儿差不多。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "back": {
    "en": "Hogh headed it back into Hassan to smash in, but it had gone out of play before he sent it in.",
    "cn": "霍格把它送回哈桑那里砸了进去，但在他把它送进去之前，它已经失灵了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "background": {
    "en": "My background has taught me to think about audiences, capital, growth and long-term value, while respecting the cultural power of fashion.",
    "cn": "我的背景教会了我在尊重时尚文化力量的同时，思考受众、资本、增长和长期价值。",
    "src": "Vogue · 2026-09-10"
  },
  "bang": {
    "en": "At the 1998 premiere, Sandra Bullock complemented her Dolce & Gabbana LBD with side-slicked bangs that grazed her eyebrows and a flipped-up lob.",
    "cn": "在1998年的首映式上，桑德拉·布洛克（Sandra Bullock）为她的杜嘉班纳（Dolce & Gabbana）LBD配上了擦过眉毛的侧刘海和翻转的高吊头。",
    "src": "ELLE · 2026-09-09"
  },
  "band": {
    "en": "Its non-scripted portfolio also includes “The Quiz With Balls,” “Caught in the Middle,” “The Alliance” and “The Tribute – Battle of the Bands,” alongside co-developed titles such as “Trivial Pursuit,” “99 to Beat,” “Let’s Play Ball,” “Most Wanted” and “A Party to Die For.”",
    "cn": "该公司的非剧本作品还包括《The Quiz With Balls》、《Caught in The Middle》、《The Alliance》和《The Tribute - Battle of The Bands》，以及合作开发的《Trivial Pursuit》、《99 to Beat》、《Let 's Play Ball》、《Most Wanted》和《A Party to Die For》。",
    "src": "Variety · 2026-09-10"
  },
  "balloon": {
    "en": "But there are thousands of balloons in nets already hoisted into the arena ceiling, a sign they'll likely come tumbling down during Thursday's convention finale.",
    "cn": "但是已经有成千上万的气球挂在球馆的天花板上，这表明它们可能会在周四的大会结束时掉下来。",
    "src": "CBS News · 2026-09-09"
  },
  "ball": {
    "en": "Naderi flicks on a long ball into Miovski's path, who's then one-on-one with Chapman.",
    "cn": "Naderi在Miovski的路径上弹了一个长球，然后与Chapman一对一。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bag": {
    "en": "On the fall/winter 2026 runways we saw a movement towards an overtly opulent aesthetic where designers from Dior to Conner Ives, embraced richly detailed textures, brocade, embroidery, rich color, tapestry, fringe, velvet, silk, and sumptuous evening bags—looks reminiscent of the glamorous roaring twenties—and pieces that feel like modern heirlooms.",
    "cn": "在2026年秋冬秀场上，我们看到了一种明显的华丽美学的运动，从迪奥到康纳艾夫斯的设计师们，拥抱了丰富细节的纹理、锦缎、刺绣、丰富的色彩、挂毯、流苏、天鹅绒、丝绸和奢华的晚装包——看起来让人想起迷人的二十年代——以及感觉像现代传家宝的作品。",
    "src": "Who What Wear · 2026-09-10"
  },
  "badly": {
    "en": "The tax was “an unevenly distributed one,” asking more of the lower classes than the wealthy, and it was “very badly administered,” Andrew Prescott, a historian at the University of Glasgow, tells Smithsonian magazine.",
    "cn": "格拉斯哥大学(University of Glasgow)历史学家安德鲁·普雷斯科特(Andrew Prescott)告诉《史密森尼》(Smithsonian)杂志，这项税收“分配不均”，对下层阶级的要求高于对富人的要求，而且“管理非常糟糕”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "bad": {
    "en": "Then for 20 to 25 minutes we were guilty of so many bad decisions, but we found a way to win.",
    "cn": "然后在20到25分钟的时间里，我们做出了很多糟糕的决定，但我们找到了获胜的方法。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bed": {
    "en": "File the nail into your preferred shape; soft “squoval” or rounded work well to complement the natural curve of your fingertip, and always push back and perfectly tidy the cuticle area —this instantly elongates the nail bed and maximises the canvas, even when the length is minimal.”",
    "cn": "把钉子锉成你喜欢的形状；柔软的“方形”或圆形指甲可以很好地配合指尖的自然曲线，并且总是向后推，完美地整理角质层区域——这样可以立即拉长指甲床，最大化指甲长度，即使指甲长度很短。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "bee": {
    "en": "The Bayeux Tapestry is being displayed in the UK as part of a landmark exhibition at the British Museum in London.",
    "cn": "贝叶挂毯作为伦敦大英博物馆标志性展览的一部分正在英国展出。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "bill": {
    "en": "This creamy, dark-blonde shade on Kristen Bell totally fits the bill.",
    "cn": "克里斯汀·贝尔身上这款奶油色的深金色眼影完全符合她的要求。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "bit": {
    "en": "\"We've still got a bit to go, but we're getting results and that's the main thing.\"",
    "cn": "“我们还有一段路要走，但我们正在取得成果，这是最重要的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "black": {
    "en": "Lipa kept things classic in a plunging black Ferragamo dress, finished with another suite of Bulgari Serpenti jewelry.",
    "cn": "丽帕身着菲拉格慕深紫色的黑色连衣裙，保持了经典的风格，最后还佩戴了一套宝格丽蛇形珠宝。",
    "src": "Vogue · 2026-09-10"
  },
  "blame": {
    "en": "It’s so easy to blame this generation, but it is technology.",
    "cn": "我们很容易责怪这一代人，但这就是科技。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "blue": {
    "en": "She posed with her husband, who was dressed in a classic navy-blue suit.",
    "cn": "她和丈夫合影，丈夫穿着一套经典的海军蓝西装。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "blow": {
    "en": "He isn't the only expensive winger who dribbles past defenders for fun, blows up YouTube, and fails to turn it into goals, though.",
    "cn": "但他不是唯一一个身价昂贵、过人如麻、却在 YouTube 上爆红却无法将机会转化为进球的边锋。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "blood": {
    "en": "As Dan Jones, author of Summer of Blood: England’s First Revolution, tells Smithsonian, after 1381, it became “if not impossible, then highly inadvisable, to ignore the effects of policy on ordinary people.”",
    "cn": "正如《血之夏：英格兰的第一次革命》一书的作者丹·琼斯（Dan Jones）告诉史密森尼，1381年后，“如果不是不可能的话，那么忽视政策对普通人的影响是非常不明智的。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "block": {
    "en": "I caught up with the actress in London last week, just before attending YSL Beauty’s London Block Party to celebrate the brand’s new fragrance, Black Opium Pink Glaze Eau de Parfum.",
    "cn": "上周，我在伦敦采访了这位女演员，就在参加YSL Beauty的伦敦街区派对之前，该派对是为了庆祝该品牌的新香水Black Opium Pink Glaze Eau de Parfum。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "big": {
    "en": "If we ignore the four wingers who moved from outside of Europe's Big Five top leagues, then we're left with 19 players.",
    "cn": "如果忽略从欧洲五大联赛之外加盟的四名边锋，剩下 19 人。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "blind": {
    "en": "Her career includes internationally successful titles including the Oscar-winning \"La Vie En Rose,\" \"Asterix at the Olympic Games,\" \"My Blind Date With Life,\" which sold to 54 countries, and the RTL+ event series \"Herzogpark.\"",
    "cn": "她的职业生涯包括获得奥斯卡奖的《玫瑰人生》、《奥运会上的阿斯特里克斯》、在54个国家销售的《我与生命的相亲》以及RTL+活动系列《赫尔佐格公园》等在国际上取得成功的作品。",
    "src": "Variety · 2026-09-10"
  },
  "blend": {
    "en": "Ask your stylist for a smudgey root (this will majorly extend your time between salon visits), then “ask for blended dimension, i.e. lowlights, in a shade or two darker than what you have and a warmer-toned gloss,” says O’Connor.",
    "cn": "让你的发型师把头发弄脏一点（这将大大延长你两次去沙龙的时间），然后“要求混合色调，比如浅色的，比你现有的颜色深一两层，颜色更暖一点，”奥康纳说。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "bleed": {
    "en": "Continuing this idea of color bleeds, a T-shirt was emboldened with stuffed shoulder pads that let the filling color “seep” through.",
    "cn": "延续了这种颜色会流血的理念，t恤大胆地采用了填充物垫肩，让填充物的颜色“渗透”进来。",
    "src": "Vogue · 2026-09-10"
  },
  "blaze": {
    "en": "Arsenal attempted 26 shots, their most on record in a Champions League game, worth a whopping 4.05 expected goals but Mikel Merino and Bukayo Saka spurned their best chances of the first half before Piero Hincapie blazed over from close range in the second.",
    "cn": "阿森纳尝试了26次投篮，这是他们在欧冠比赛中最多的一次投篮，价值高达4.05个预期进球，但米克尔·梅里诺和布卡约·萨卡在第二场比赛中从近距离击败皮耶罗·辛卡皮之前，拒绝了他们上半场的最佳机会。",
    "src": "Sky Sports · 2026-09-09"
  },
  "beyond": {
    "en": "The beauty of this particular mani, beyond the fact that it looks expensive as heck, is just how versatile it is.",
    "cn": "除了它看起来贵得离谱之外，这个特殊的美甲的美丽之处在于它是多么的万能。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "believe": {
    "en": "At Dreamkite, we believe that the future of cinematic storytelling has only just begun.\"",
    "cn": "在Dreamkite，我们相信电影叙事的未来才刚刚开始。",
    "src": "Variety · 2026-09-10"
  },
  "belief": {
    "en": "Void's Vukota Antunović added: \"From the beginning, ‘Sanctuary' was driven by a shared belief in the story and the world we were building.",
    "cn": "Void的Vukota Antunović补充道：“从一开始，‘避难所'就是由对这个故事和我们正在建设的世界的共同信念驱动的。",
    "src": "Variety · 2026-09-10"
  },
  "being": {
    "en": "“This will change up your color while still keeping it natural and not being drastic.”",
    "cn": "“这会改变你的肤色，同时保持自然而不夸张。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "bell": {
    "en": "This creamy, dark-blonde shade on Kristen Bell totally fits the bill.",
    "cn": "克里斯汀·贝尔身上这款奶油色的深金色眼影完全符合她的要求。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "begin": {
    "en": "It was a familiar Lauren move, and a fitting way to begin a collection that would take a knowing walk through the archive.",
    "cn": "这是一个熟悉的劳伦举动，也是开始收藏的合适方式，可以在档案馆中进行一次明智的漫步。",
    "src": "ELLE · 2026-09-09"
  },
  "before": {
    "en": "Hogh headed it back into Hassan to smash in, but it had gone out of play before he sent it in.",
    "cn": "霍格把它送回哈桑那里砸了进去，但在他把它送进去之前，它已经失灵了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "beginning": {
    "en": "Void's Vukota Antunović added: \"From the beginning, ‘Sanctuary' was driven by a shared belief in the story and the world we were building.",
    "cn": "Void的Vukota Antunović补充道：“从一开始，‘避难所'就是由对这个故事和我们正在建设的世界的共同信念驱动的。",
    "src": "Variety · 2026-09-10"
  },
  "belong": {
    "en": "Today, the museum displays original furniture and objects that belonged to the Impressionist, including his easel and wheelchair.",
    "cn": "今天，博物馆展示了属于印象派的原始家具和物品，包括他的画架和轮椅。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "below": {
    "en": "Below, find the seven trends I personally can't wait to wear this season.",
    "cn": "以下是我个人迫不及待想要在本季穿的七种流行趋势。",
    "src": "Who What Wear · 2026-09-10"
  },
  "between": {
    "en": "Launching this September, the collection offers a polished finishing touch designed to move effortlessly between outfits.",
    "cn": "该系列将于今年9月推出，提供了一种精致的画龙点睛的设计，可以毫不费力地在不同的服装之间切换。",
    "src": "ELLE · 2026-09-09"
  },
  "better": {
    "en": "\"We have a lot of players that can take the ball there and progress the ball much better than we did in the past,\" Arteta explained.",
    "cn": "“我们有很多球员可以把球带到那里，比过去更好地推进球，”Arteta解释说。",
    "src": "Sky Sports · 2026-09-09"
  },
  "bet": {
    "en": "Along with its prolific production arm, TS Media, Telekom Srbija is betting big on its streaming platform, MOVE — described by Martinović as a \"regional Balkan Netflix\" — while also \"investing more in every element of the production chain,\" most notably with the acquisition earlier this year of the Belgrade-based Firefly Studios.",
    "cn": "与其多产的制作部门TS Media一起，塞尔维亚电信在其流媒体平台MOVE（被martinoviki描述为“巴尔干地区的Netflix”）上押下了重金，同时也“在生产链的每一个环节都加大了投资”，最引人注目的是今年早些时候收购了总部位于贝尔格莱德的Firefly Studios。",
    "src": "Variety · 2026-09-10"
  },
  "best": {
    "en": "The state of winger play in 2026 is best summed up by Manchester City's move for Iliman Ndiaye.",
    "cn": "2026 年边锋生态的最好写照，就是曼城签下伊利曼·恩迪亚耶。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "beloved": {
    "en": "So what does the beloved American designer have up his sleeve this time?",
    "cn": "那么，这位受人喜爱的美国设计师这次又有什么锦囊妙计呢？",
    "src": "Who What Wear · 2026-09-10"
  },
  "distribute": {
    "en": "Keshet International is globally distributing the tape and format.",
    "cn": "凯舍特国际公司正在全球分销磁带和格式。",
    "src": "Variety · 2026-09-10"
  },
  "distribution": {
    "en": "\"It's production, distribution, offering infrastructure through our Firefly Studios, and, of course, selling our own content to international partners.\"",
    "cn": "“它包括制作、发行、通过我们的Firefly Studios提供基础设施，当然，还包括向国际合作伙伴出售我们自己的内容。",
    "src": "Variety · 2026-09-10"
  },
  "hook": {
    "en": "Diabate's effort for the hosts is hooked off the line by Donovan.",
    "cn": "Diabate为房东所做的努力被Donovan迷住了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "hope": {
    "en": "Mauricio Pochettino speaks to Sky Sports News' Gail Davis in an exclusive interview; ex-Tottenham and Chelsea boss reveals hope of returning to Premier League in future; last month, the Argentine signed a new four-year deal to continue as the manager of the USA men's team",
    "cn": "毛里西奥·波切蒂诺（Mauricio Pochettino）在接受天空体育新闻（Sky Sports News）的盖尔·戴维斯（Gail Davis）独家采访时表示；前托特纳姆热刺和切尔西主帅透露了未来重返英超联赛的希望；上个月，阿根廷人签署了一份新的四年合同，继续担任美国男子队的经理",
    "src": "Sky Sports · 2026-09-09"
  },
  "hopeful": {
    "en": "The slate, as usual, features awards-season hopefuls from leading auteurs, including Martin McDonagh’s dark comedy Wild Horse Nine, Bucking Fastard with real-life sisters Rooney and Kate Mara, and Florian Zeller’s Bunker, starring Cruz and Bardem.",
    "cn": "和往常一样，今年的提名名单上有很多大导演的热门作品，包括马丁·麦克唐纳执导的黑色喜剧《野马九号》、现实生活中的姐妹鲁尼和凯特·玛拉主演的《巴克·法斯塔德》，以及克鲁兹和巴登主演的弗洛里安·泽勒执导的《邦克》。",
    "src": "ELLE · 2026-09-09"
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
  "hot": {
    "en": "Expert review: “It’s great for detangling and helps with adding softness; it also minimizes frizz while also giving heat protection, which is important to me because so many of us are using a blow dryer and hot tools after we wash our hair.",
    "cn": "专家点评：“能很好地梳理头发，并有助于增加柔软度；它还能最大限度地减少毛躁，同时提供热保护，这对我来说很重要，因为我们很多人在洗完头发后都会使用吹风机和热工具。",
    "src": "ELLE · 2026-09-09"
  },
  "hundred": {
    "en": "Separately, firefighters were also tackling a wildfire in the district of Kozan, in the southern Adana province, where hundreds of residents have been evacuated, the forestry directorate said.",
    "cn": "另外，林业局表示，消防队员还在阿达纳省南部的Kozan地区扑灭野火，数百名居民已被疏散。",
    "src": "ABC News · 2026-09-09"
  },
  "human": {
    "en": "“I am truly delighted to bring audiences the genuine emotion and human drama that only a competition as intense as ‘The Floor’ can draw out of its contestants.”",
    "cn": "“我很高兴能给观众带来真正的情感和人类的戏剧，只有像《地板》这样激烈的比赛才能激发出参赛者的情感。",
    "src": "Variety · 2026-09-10"
  },
  "huge": {
    "en": "Rangers turn their attention to a huge double-header against Celtic, with the sides first meeting in the League Cup quarter-finals before renewing hostilities in the Scottish Premiership at Parkhead.",
    "cn": "流浪者将注意力转向对凯尔特人的巨大双头，双方在联赛杯四分之一决赛中首次会面，然后在Parkhead的苏格兰超级联赛中再次发生敌对行动。",
    "src": "Sky Sports · 2026-09-09"
  },
  "how": {
    "en": "Nicola Tallis explores Elizabeth I’s early years to reveal how her formative experiences influenced the monarch she later became",
    "cn": "尼古拉·塔利斯探索了伊丽莎白一世的早年生活，揭示了她的成长经历是如何影响她后来成为君主的",
    "src": "HistoryExtra · 2026-09-09"
  },
  "household": {
    "en": "There is some precedent for broad-based payments to U.S. households.",
    "cn": "向美国家庭提供基础广泛的支付有一些先例。",
    "src": "CBS News · 2026-09-10"
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
  "hotel": {
    "en": "The longevity was very important to me, especially when you look at the storytelling from Portofino ’97 to Hotel Portofino.",
    "cn": "这部电影的长期性对我来说非常重要，尤其是当你看从《波托菲诺97》到《波托菲诺酒店》的故事叙述时。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "however": {
    "en": "However, the balance of that squad is what creates the problem.",
    "cn": "然而，该阵容的平衡是造成问题的原因。",
    "src": "Sky Sports · 2026-09-09"
  },
  "honey": {
    "en": "“Gold, honey, and caramel tones are a nice way to tone down brighter, cooler blondes while still staying blonde into the fall.”",
    "cn": "“金色、蜂蜜色和焦糖色都是让金发更亮、更酷的好方法，同时在秋天也能保持金发。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "her": {
    "en": "I felt that energy a lot in these pieces,” said Giovanna Flores of her unconstrained and dreamy spring collection.",
    "cn": "我在这些作品中感受到了很多能量，”乔凡娜·弗洛雷斯（Giovanna Flores）谈起她无拘无束、梦幻般的春季系列时说。",
    "src": "Vogue · 2026-09-10"
  },
  "here": {
    "en": "G ossip Cosmo Girl here, your one and only source into the scandalous lives of Manhattan’s elite...",
    "cn": "《时尚天后》在此，这是你了解曼哈顿名流们绯闻的唯一渠道…",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "herself": {
    "en": "Jennifer Aniston has spent decades cementing herself as the hair muse—from 'The Rachel' to her famously glossy, face-framing layers.",
    "cn": "珍妮弗·安妮斯顿（Jennifer Aniston）花了几十年时间巩固自己的发型缪斯地位——从“瑞秋”（the Rachel）到她那出了名的有光泽的、修饰脸型的分层发型。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "hide": {
    "en": "Despite financial restrictions that appear to be imposed within the club, you can't hide from the fact they have the highest net spend of any Premier League side since 2022.",
    "cn": "尽管俱乐部内部似乎施加了财务限制，但自2022年以来，他们的净支出一直是英超联赛中最高的。",
    "src": "Sky Sports · 2026-09-09"
  },
  "high": {
    "en": "Dimensional blondes and brondes are high on the list for fall, according to O’Connor.",
    "cn": "奥康纳说，多维度的金发女郎和青铜色女郎是秋季的热门人选。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "highly": {
    "en": "He's spent over a decade at Who What Wear, currently leading the shopping team to deliver highly covetable and convertible content.",
    "cn": "他在Who What Wear工作了十多年，目前领导购物团队提供非常令人垂涎和可转换的内容。",
    "src": "Who What Wear · 2026-09-10"
  },
  "hill": {
    "en": "Featuristic Films' recent credits include underwater survival thriller \"Breathe Deep,\" starring Ingrid Torelli (\"Late Night With the Devil\"), Michiel Huisman (\"The Haunting of Hill House\") and Avani Gregg (\"Spider Island\"), and crime drama “Salvable,” starring Shia LaBeouf (\"Fury\"), Toby Kebbell (\"RocknRolla\") and James Cosmo (\"Braveheart\").",
    "cn": "故事片最近的作品包括水下生存惊悚片《深呼吸》，由英格丽·托雷利（《与魔鬼的深夜》）、迈克尔·豪斯曼（《鬼屋惊魂》）和阿瓦尼·格雷格（《蜘蛛岛》）主演，以及犯罪片《可救之星》，由希亚·拉博夫（《愤怒》）、托比·凯贝尔（《摇滚》）和詹姆斯·科斯莫（《勇敢的心》）主演。",
    "src": "Variety · 2026-09-10"
  },
  "home": {
    "en": "The Germany international's dummy gave Ødegaard the space and time to fire home Arsenal's crucial second goal.",
    "cn": "这位德国国脚的一漏，给厄德高赢得了空间和时间，让他打进了阿森纳关键的第二球。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "holy": {
    "en": "Harold’s time in Normandy ends with him making an oath to William on holy relics.",
    "cn": "哈罗德在诺曼底的时光以他对着圣物向威廉宣誓结束",
    "src": "HistoryExtra · 2026-09-09"
  },
  "hole": {
    "en": "On March 1, while members of the unit holed up in a bunker amid air sirens, Cody's family said many survivors of the attack and other officers on the ground told them Cody advised Barnes that the unit should remain there, even amid periods of calm.",
    "cn": "3月1日，科迪的家人说，当这支部队的成员在空中警报声中躲在一个地堡里时，科迪的家人说，许多袭击的幸存者和地面上的其他军官告诉他们，科迪建议巴恩斯，即使在平静时期，这支部队也应该留在那里。",
    "src": "CBS News · 2026-09-10"
  },
  "hold": {
    "en": "She was very popular among the aspiring grandmas, who all wanted to hold her.",
    "cn": "她很受那些有抱负的奶奶们的欢迎，她们都想抱她。",
    "src": "Vogue · 2026-09-10"
  },
  "history": {
    "en": "And this wasn’t ancient history, it was inside my own father’s lifetime,” Amandeep told me.",
    "cn": "这不是古老的历史，这是我父亲一生的经历，”阿曼迪普告诉我。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "historical": {
    "en": "Mr. Trump acknowledged that historical trend, saying, \"the midterms are not supposed to be won by the sitting president,\" but \"we're going to change that.\"",
    "cn": "特朗普承认了这一历史趋势，他说，“中期选举不应该由现任总统赢得”，但“我们将改变这种状况”。",
    "src": "CBS News · 2026-09-10"
  },
  "hire": {
    "en": "The BFC board approved the hire on August 25.",
    "cn": "BFC董事会于8月25日批准了这一聘用。",
    "src": "Vogue · 2026-09-10"
  },
  "hint": {
    "en": "Perhaps more dated, or certainly not for everyone, were her explosions of tulle, including a full-on red mermaid strapless gown, with sheer hints of pink tulle peeking through the underlay.",
    "cn": "也许更过时的是她对薄纱的大爆炸，或者肯定不适合所有人，包括一件全身红色美人鱼无肩带礼服，衬底中透出一丝粉色薄纱。",
    "src": "Vogue · 2026-09-10"
  },
  "hit": {
    "en": "And among those, just five hit the 0.5 benchmark in the season before they moved: Barcola, Outtara, Madueke, Mbaye, and Johnson.",
    "cn": "其中只有 5 人达到了 0.5 的门槛——他们是巴尔科拉、奥塔拉、马杜埃凯、姆巴耶和约翰逊。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "importance": {
    "en": "He talks about the importance of the smallest details, the difficulty of getting every decision right and the challenge of translating his ideas to a group of players who spend far less time together than a club side.",
    "cn": "他谈到了最小细节的重要性，做出正确决定的难度，以及将他的想法转化为一群在一起的时间远远少于俱乐部球员的球员所面临的挑战。",
    "src": "Sky Sports · 2026-09-09"
  },
  "important": {
    "en": "Quality was always important, but we took it to a whole other level with this fragrance.",
    "cn": "质量一直都很重要，但我们用这款香水把它提升到了一个全新的水平。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "impressive": {
    "en": "Martin Odegaard is a player transformed at the start of this season - and Arsenal boss Mikel Arteta puts his captain's impressive form down to fitness and new positioning.",
    "cn": "马丁·厄德高（Martin Odegaard）是本赛季开始时转型的球员，主帅米克尔·阿尔特塔将队长的出色表现归功于健身和新定位。",
    "src": "Sky Sports · 2026-09-09"
  },
  "improve": {
    "en": "Cooper is currently UK chair for the 30% Club — a voluntary organization committed to improving women’s representation on company boards — and has advised on DEI across various global businesses, working alongside C-suite leaders on gender and race, in particular.",
    "cn": "库珀目前是30%俱乐部（一个致力于提高女性在公司董事会中的代表性的自愿组织）的英国主席，并为各种全球企业的DEI提供建议，特别是在性别和种族问题上与高级管理层领导人合作。",
    "src": "Vogue · 2026-09-10"
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
  "income": {
    "en": "Foulkes has pitched raising Medicaid reimbursement rates, and she's proposed a tax on millionaires, which would allot money to build over 20,000 homes by adding an additional 3% tax on incomes over $1 million.",
    "cn": "福克斯提议提高医疗补助报销率，她还提议对百万富翁征税，这将通过对超过100万美元的收入额外征收3%的税来分配建造2万多套住房的资金。",
    "src": "CBS News · 2026-09-10"
  },
  "indian": {
    "en": "An Indigenous story told by Indigenous filmmakers, ‘Angh’ represents some of the most exciting cinema emerging from India’s margins, with the potential to become a torchbearer for a new, truly global Indian cinema.",
    "cn": "《Angh》是一部由本土电影人讲述的本土故事，它代表了一些从印度边缘崛起的最令人兴奋的电影，有可能成为一个全新的、真正全球化的印度电影的火炬手。",
    "src": "Variety · 2026-09-10"
  },
  "india": {
    "en": "An Indigenous story told by Indigenous filmmakers, ‘Angh’ represents some of the most exciting cinema emerging from India’s margins, with the potential to become a torchbearer for a new, truly global Indian cinema.",
    "cn": "《Angh》是一部由本土电影人讲述的本土故事，它代表了一些从印度边缘崛起的最令人兴奋的电影，有可能成为一个全新的、真正全球化的印度电影的火炬手。",
    "src": "Variety · 2026-09-10"
  },
  "independent": {
    "en": "“The Floor” has now sold in more than 30 territories worldwide for Talpa Studios, the independent production company founded by John de Mol.",
    "cn": "由约翰·德·摩尔（John de Mol）创立的独立制片公司Talpa Studios出品的《地板》目前已在全球30多个地区销售。",
    "src": "Variety · 2026-09-10"
  },
  "increasingly": {
    "en": "John Fetterman appeared in a surprise video at the Republican Party's midterm convention on Wednesday, as he becomes increasingly isolated from his own party.",
    "cn": "约翰·费特曼（John Fetterman）周三在共和党中期大会上出现了一段令人惊讶的视频，因为他越来越孤立于自己的政党。",
    "src": "CBS News · 2026-09-10"
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
    "en": "“Wake up, wake up,” I called to my husband as I ran back down the hallway to our bedroom.",
    "cn": "“醒醒，醒醒，”我朝丈夫喊道，一边顺着走廊跑回我们的卧室。",
    "src": "Vogue · 2026-09-10"
  },
  "idea": {
    "en": "Continuing this idea of color bleeds, a T-shirt was emboldened with stuffed shoulder pads that let the filling color “seep” through.",
    "cn": "延续了这种颜色会流血的理念，t恤大胆地采用了填充物垫肩，让填充物的颜色“渗透”进来。",
    "src": "Vogue · 2026-09-10"
  },
  "ideal": {
    "en": "We chatted all things parties and late nights, including the ideal way to end it:",
    "cn": "我们聊了派对和深夜的所有事情，包括理想的结束方式：",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "ignore": {
    "en": "If we ignore the four wingers who moved from outside of Europe's Big Five top leagues, then we're left with 19 players.",
    "cn": "如果忽略从欧洲五大联赛之外加盟的四名边锋，剩下 19 人。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "impact": {
    "en": "But it was Havertz who made the most telling impact, just over three years on from his £67.5 million move across London.",
    "cn": "但真正产生决定性影响的，是三年前以 6750 万英镑跨越伦敦的哈弗茨。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "immediately": {
    "en": "William hears of Harold’s accession and immediately starts building a fleet.",
    "cn": "威廉听到哈罗德即位的消息，立即开始组建舰队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "green": {
    "en": "The actress and new face of YSL Beauty’s Black Opium Eau de Parfum told me the green flags she looks for in a good party (just before we went to one together).",
    "cn": "这位女演员兼圣罗兰美妆黑色鸦片香水的新代言人告诉我，她在一个好的派对上最喜欢的绿色旗帜是什么（就在我们一起去派对之前）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "ground": {
    "en": "She began batting and chasing her creation across the ground.",
    "cn": "她开始在地上击球和追逐她的创作。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "group": {
    "en": "Who What Wear is part of Future US Inc, an international media group and leading digital publisher.",
    "cn": "Who What Wear是未来美国公司的一部分，未来美国公司是一家国际媒体集团和领先的数字出版商。",
    "src": "Who What Wear · 2026-09-10"
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
  "gulf": {
    "en": "Dubai is often considered the fashion capital of the Gulf region.",
    "cn": "迪拜通常被认为是海湾地区的时尚之都。",
    "src": "Vogue · 2026-09-10"
  },
  "guidance": {
    "en": "The strategy outlines a DEI goal led by social mobility and better access to the BFC’s prize program, which the organization plans to bolster through data collection, research papers, and the implementation of industry guidance toolkits.",
    "cn": "该战略概述了以社会流动性和更好地参与BFC奖励计划为主导的DEI目标，该组织计划通过数据收集、研究论文和实施行业指导工具包来支持这一目标。",
    "src": "Vogue · 2026-09-10"
  },
  "guest": {
    "en": "The actor Sam Waterston, also a guest, amiably stroked her head.",
    "cn": "同样是嘉宾的演员萨姆·沃特斯顿（Sam Waterston）亲切地抚摸着她的头。",
    "src": "Vogue · 2026-09-10"
  },
  "growth": {
    "en": "My background has taught me to think about audiences, capital, growth and long-term value, while respecting the cultural power of fashion.",
    "cn": "我的背景教会了我在尊重时尚文化力量的同时，思考受众、资本、增长和长期价值。",
    "src": "Vogue · 2026-09-10"
  },
  "guide": {
    "en": "Keep scrolling for the ultimate fall nail field guide.",
    "cn": "继续滚动查看最终的秋季指甲现场指南。",
    "src": "Who What Wear · 2026-09-10"
  },
  "great": {
    "en": "\"That's great that a lot of very different players got in those situations.",
    "cn": "“在这种情况下，很多不同的球员都得到了很好的表现。",
    "src": "Sky Sports · 2026-09-09"
  },
  "goods": {
    "en": "Mr. Trump argued the payments would be a consequence of the country's \"tremendous economic success,\" and suggested they could be funded partially by his administration's tariffs on foreign goods.",
    "cn": "特朗普认为，这些付款将是该国“巨大经济成功”的结果，并暗示这些付款可以部分由其政府对外国商品征收的关税提供资金。",
    "src": "CBS News · 2026-09-10"
  },
  "govern": {
    "en": "She continued: \"Looking forwards, the State is genuinely unsure whether it can switch its governing congressional map in time to run a timely federal election.\"",
    "cn": "她继续说道：“展望未来，该州真的不确定是否能及时改变其执政的国会地图，以便及时举行联邦选举。",
    "src": "CBS News · 2026-09-10"
  },
  "government": {
    "en": "The registers had been put together by the Punjab government in 1919–20 after the war.",
    "cn": "这些登记簿是旁遮普政府在战后的1919年至1920年间整理的。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "governor": {
    "en": "He was elected for a full term in 2022 and has served as governor for five years.",
    "cn": "他于2022年当选，并担任了5年的州长。",
    "src": "CBS News · 2026-09-10"
  },
  "gown": {
    "en": "Many of her gowns this season had such versatile styling approaches, featuring removable capes or jackets that completed the look, if desired.",
    "cn": "她这一季的许多礼服都采用了这种百搭的造型方法，如果需要的话，还可以用可拆卸的斗篷或夹克来完成整个造型。",
    "src": "Vogue · 2026-09-10"
  },
  "grave": {
    "en": "Excavations in Poland have unearthed a 5,000-year-old grave, complete with a man’s skeleton, two other skulls, amber beads, a flint knife, a stone ax and a necklace made of 42 sharp teeth.",
    "cn": "波兰的挖掘工作发现了一座5000年前的坟墓，其中包括一具男子骨骼、另外两具头骨、琥珀珠、一把火石刀、一把石斧和一条由42颗锋利的牙齿制成的项链。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "grasp": {
    "en": "Cooper has held senior leadership roles in talent and organizational development across companies including Shell, Barclays, Christie’s, and Lloyds, with a firm grasp on hiring.",
    "cn": "库珀曾在壳牌（Shell）、巴克莱（Barclays）、佳士得（Christie’s）和劳埃德（Lloyds）等公司担任人才和组织发展方面的高级领导职务，对招聘有着深刻的把握。",
    "src": "Vogue · 2026-09-10"
  },
  "grandfather": {
    "en": "Her uncle and grandfather, Chris and Thomas Dodd, were both senators, and she was endorsed by former House Speaker Nancy Pelosi, who was her mother's college roommate.",
    "cn": "她的叔叔和祖父克里斯·多德（Chris Dodd）和托马斯·多德（Thomas Dodd）都是参议员，她得到了前众议院议长南希·佩洛西（Nancy Pelosi）的支持，佩洛西是她母亲的大学室友。",
    "src": "CBS News · 2026-09-10"
  },
  "grand": {
    "en": "His 2025 AI film \"The Cinema That Never Was\" attracted attention from leading filmmakers such as Alex Proyas and John Gaeta, and won major international AI film awards, including Grand Prizes at the Omni International AI Film Festival, whose jury was headed by George Miller, and the Artefact AI Film Festival, chaired by C&eacute;dric Klapisch.",
    "cn": "他的2025年人工智能电影《从未有过的电影》吸引了亚历克斯·普罗亚斯和约翰·盖塔等知名电影人的关注，并获得了主要的国际人工智能电影奖项，包括由乔治·米勒担任评审团主席的Omni国际人工智能电影节的大奖，以及由德里克·克拉皮什担任主席的人工智能电影节。",
    "src": "Variety · 2026-09-10"
  },
  "grant": {
    "en": "At the time, all property in England legally belonged to the king, who granted lesser lords the right to lease land to tenants “in return for certain services and restrictions on their freedom,” Prescott says.",
    "cn": "当时，英格兰的所有财产在法律上都属于国王，国王授予较小的领主向租户出租土地的权利，“以换取某些服务和对其自由的限制”，普雷斯科特说。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "hair": {
    "en": "Hair experts chime in with their favorite leave-in conditioners from amika, Rōz, and more.",
    "cn": "美发专家也从amika、Rōz等网站上推荐了他们最喜欢的免洗护发素。",
    "src": "ELLE · 2026-09-09"
  },
  "half": {
    "en": "Havertz's deft flick midway through the second half almost led to another, as Bukayo Saka's subsequent shot was brilliantly turned behind by Martinez.",
    "cn": "下半场中段，哈弗茨又一次轻巧的一蹭险些制造进球，布卡约·萨卡随后的射门被马丁内斯神扑化解。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "have": {
    "en": "\"Last year, to have two shoulder injuries like he did, then a MCL injury he did, it's never easy.",
    "cn": "“去年，像他一样有两个肩膀受伤，然后是他的MCL受伤，这从来都不容易。",
    "src": "Sky Sports · 2026-09-09"
  },
  "head": {
    "en": "Curiously, they then head off together on a military adventure in Brittany, which Harold seems to enthusiastically take part in.",
    "cn": "奇怪的是，他们随后一起前往布列塔尼进行军事冒险，哈罗德似乎热情地参加了这次冒险。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "heading": {
    "en": "Heading to the British Museum to see the Bayeux Tapestry for yourself?",
    "cn": "想亲自去大英博物馆看贝叶挂毯吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "headline": {
    "en": "Then a few weeks later, another significant headline - Pochettino had, a little surprisingly perhaps, signed for four more years with the USA.",
    "cn": "然后几周后，另一个重要的头条新闻-波切蒂诺与美国签订了四年的合同，也许有点令人惊讶。",
    "src": "Sky Sports · 2026-09-09"
  },
  "health": {
    "en": "At this point, I've given you two celebrity endorsements, nail-health benefits, longevity, and the promise of doing it from your sofa.",
    "cn": "在这一点上，我给了你两个名人代言，指甲健康的好处，长寿，并承诺在你的沙发上做。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "healthy": {
    "en": "It is made with ingredients to keep hair healthy and strong.",
    "cn": "它由保持头发健康和强壮的成分制成。",
    "src": "ELLE · 2026-09-10"
  },
  "hear": {
    "en": "William hears of Harold’s accession and immediately starts building a fleet.",
    "cn": "威廉听到哈罗德即位的消息，立即开始组建舰队。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "heart": {
    "en": "Hasan Kahya, an Aksu resident who was helping firefighters tackle the blaze, suffered a heart attack after being affected by the smoke and later died in hospital, the district’s mayor, Isa Yildirim, said.",
    "cn": "阿克苏市长伊萨·耶尔德勒姆说，阿克苏居民哈桑·卡亚（Hasan Kahya）当时正在帮助消防员灭火，他在受到烟雾影响后心脏病发作，后来在医院去世。",
    "src": "ABC News · 2026-09-09"
  },
  "help": {
    "en": "“The right leave-in can help encourage your natural texture while keeping it hydrated, controlled, and polished,” Cho says.",
    "cn": "Cho说：“正确的免洗可以帮助促进你的自然质地，同时保持水分、控制和光滑。",
    "src": "ELLE · 2026-09-09"
  },
  "height": {
    "en": "\"When that happens, [Odegaard] needs to take different heights and angles and positions in order to disorganise the opponent and he's done that really well.\"",
    "cn": "“当这种情况发生时，[Odegaard]需要采取不同的高度、角度和姿势来扰乱对手，他做得非常好。",
    "src": "Sky Sports · 2026-09-09"
  },
  "heavy": {
    "en": "Adults could weigh up to 75 tonnes—over eight times bigger than a Tyrannosaurus rex and 12 times as heavy as an elephant.",
    "cn": "成年人的体重可达75吨，是霸王龙的8倍多，是大象的12倍重。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "heat": {
    "en": "Whether you’ve got heat damage or just don’t want to deal with the humidity clinging to your every strand, we sourced the seven best leave-in conditioners for all kinds of frizzy hair.",
    "cn": "无论你是受到了热损伤，还是只是不想处理每根头发上的湿气，我们都为你挑选了七种最好的免洗护发素，适用于各种卷曲的头发。",
    "src": "ELLE · 2026-09-09"
  },
  "hate": {
    "en": "I hate to use the word murder because it's strong, but if a loved one of yours was murdered, our justice system is built to have accountability and to have atonement for that and for the grief of the family.\"",
    "cn": "我讨厌使用谋杀这个词，因为它很强烈，但如果你所爱的人被谋杀了，我们的司法系统是为了追究责任，为家庭的悲痛赎罪而建立的。",
    "src": "CBS News · 2026-09-10"
  },
  "happen": {
    "en": "\"I just never thought it would happen,\" Jim Khork, Cody's father, told CBS News.",
    "cn": "“我从没想过会发生这种事，”科迪的父亲吉姆·霍克告诉CBS新闻。",
    "src": "CBS News · 2026-09-10"
  },
  "hang": {
    "en": "But it takes its name from the French tapisserie, meaning ‘wall hanging’.",
    "cn": "但它的名字来自法语tapisserie，意思是“挂在墙上”。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "happy": {
    "en": "The bride and groom beamed throughout, so happy.",
    "cn": "新郎新娘自始至终都面带笑容，非常幸福。",
    "src": "Vogue · 2026-09-10"
  },
  "handle": {
    "en": "Mr. Trump's own lagging approval rating could also be a drag on the party, with Democrats seeking to capitalize on the Iran war's unpopularity and voters' unhappiness with the Trump administration's handling of the economy.",
    "cn": "特朗普自己落后的支持率也可能拖累该党，民主党人试图利用伊朗战争的不受欢迎以及选民对特朗普政府处理经济的不满。",
    "src": "CBS News · 2026-09-10"
  },
  "hand": {
    "en": "“Frizz and dryness often go hand in hand,” says celebrity hairstylist Sabrina Rowe.",
    "cn": "名人发型师萨布丽娜·罗说：“毛躁和干燥常常相伴而行。",
    "src": "ELLE · 2026-09-09"
  },
  "halt": {
    "en": "The former Tottenham boss guided the USA team to the last 16 of the World Cup, where the host nation's dreams of victory came to a crashing halt against Belgium, but that barely tells the story of an extraordinary few weeks for the Argentine.",
    "cn": "这位前托特纳姆热刺主帅带领美国队参加了世界杯的最后16场比赛，东道国的胜利梦想在对阵比利时的比赛中戛然而止，但这几乎没有讲述阿根廷人非凡的几周的故事。",
    "src": "Sky Sports · 2026-09-09"
  },
  "hall": {
    "en": "Lewis Hall' s new Newcastle United contract will not include a release clause.",
    "cn": "刘易斯·霍尔（Lewis Hall）的新纽卡斯尔联队合同将不包括解除条款。",
    "src": "Sky Sports · 2026-09-09"
  },
  "harvest": {
    "en": "“These are designed to mimic exosome structure without being harvested from any donor cells at all, trading some biological complexity for very high batch-to-batch consistency,” she notes.",
    "cn": "她指出：“这些设计是为了模拟外泌体结构，而根本不需要从任何供体细胞中获取，以一些生物复杂性换取非常高的批间一致性。",
    "src": "ELLE · 2026-09-09"
  },
  "hard": {
    "en": "Asked to explain the appeal of her work Flores replied: “It’s hard for me to say, but I try to keep this rawness about everything where it does feel like a balance in tension in things.",
    "cn": "当被要求解释她的作品的吸引力时，弗洛雷斯回答说：“这对我来说很难说，但我试图保持这种对一切事物的原始，它确实感觉像是事物紧张的平衡。",
    "src": "Vogue · 2026-09-10"
  },
  "hardly": {
    "en": "\"When you put together a team that hardly plays together, it is difficult to play at this level when [Leeds] are intense.\"",
    "cn": "“当你组建一支几乎无法一起比赛的球队时，当[利兹]非常激烈时，很难在这个级别上比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "individual": {
    "en": "Wealthier individuals were also more likely to lie at work and cheat during games.",
    "cn": "较富有的人也更有可能在工作中撒谎，在游戏中作弊。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "land": {
    "en": "It’s a once-in-a-lifetime opportunity – or, really, once in a millennium: the chance to admire the Bayeux Tapestry in the land of its creation.",
    "cn": "这是一个千载难逢的机会，或者说，千载难逢：有机会在贝叶挂毯的诞生地欣赏它。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "language": {
    "en": "The English-language, post-apocalyptic thriller is directed by Filip Kovačević",
    "cn": "这部英语后世界末日惊悚片由菲利普·科瓦切维奇（Filip Kovačević）执导",
    "src": "Variety · 2026-09-10"
  },
  "large": {
    "en": "ANKARA, Turkey -- A volunteer firefighter died on Wednesday in Turkey after helping local emergency services tackle a large wildfire in the Mediterranean coastal province of Antalya, an official said.",
    "cn": "土耳其安卡拉——一名官员表示，周三，土耳其一名志愿消防员在帮助当地紧急服务部门扑灭地中海沿岸省份安塔利亚的一场大火后死亡。",
    "src": "ABC News · 2026-09-09"
  },
  "largely": {
    "en": "She focused largely on draping this season, finding beauty in the strong silhouettes she could craft with a singular roll of fabric.",
    "cn": "这一季，她主要专注于垂饰，用一卷单一的面料打造出鲜明的轮廓，从中寻找美。",
    "src": "Vogue · 2026-09-10"
  },
  "last": {
    "en": "“I’d never been to Europe until this time last year, and I’ve been over 10 times since,” she says.",
    "cn": "她说：“直到去年这个时候，我才去过欧洲，从那以后我已经去过10多次了。",
    "src": "Vogue · 2026-09-10"
  },
  "law": {
    "en": "The action actually starts a couple of years before the set-piece battle of Hastings, with a discussion between England’s King, Edward the Confessor, and his leading noble (who was also his brother-in-law), Harold Godwinson.",
    "cn": "故事发生在黑斯廷斯战役前几年，英国国王忏悔者爱德华和他的贵族领袖（也是他的姐夫）哈罗德·戈德温森之间的讨论。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "launch": {
    "en": "Launching this September, the collection offers a polished finishing touch designed to move effortlessly between outfits.",
    "cn": "该系列将于今年9月推出，提供了一种精致的画龙点睛的设计，可以毫不费力地在不同的服装之间切换。",
    "src": "ELLE · 2026-09-09"
  },
  "latter": {
    "en": "The most dramatic example of the latter was a long dress in the primary colors Ellsworth Kelly loved (red, green, blue) with romantic white sleeves and a draped, almost bustled low back.",
    "cn": "后者最引人注目的例子是一件长裙，用的是埃尔斯沃斯·凯利（Ellsworth Kelly）喜欢的三原色（红、绿、蓝），搭配浪漫的白色袖子和褶皱的低背。",
    "src": "Vogue · 2026-09-10"
  },
  "latin": {
    "en": "Running mostly from left to right, it tells the story in the style of a graphic novel across a central frieze, with short Latin captions.",
    "cn": "它主要从左到右，用图画小说的风格在中间的楣边讲述故事，配上简短的拉丁文字说明。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "later": {
    "en": "Nearly 70 years later, the two-tone motif still telegraphs a sense of everyday elegance.",
    "cn": "近70年后，双色主题仍然传达出日常优雅的感觉。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "late": {
    "en": "We chatted all things parties and late nights, including the ideal way to end it:",
    "cn": "我们聊了派对和深夜的所有事情，包括理想的结束方式：",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "laugh": {
    "en": "At one point James hastily changed her diaper on a table in a niche in the library, a transgression that we laughed about afterwards.",
    "cn": "有一次，詹姆斯在图书馆壁龛里的一张桌子上匆忙地换了尿布，这是我们后来嘲笑的违规行为。",
    "src": "Vogue · 2026-09-10"
  },
  "lay": {
    "en": "Hogh lays the ball off to Hassan but his curling effort is pushed past by Steward.",
    "cn": "Hogh将球交给了Hassan ，但他的冰壶努力被Steward推倒了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "keep": {
    "en": "\"I couldn't be more pleased with my players for their perseverance and sheer will to keep going.",
    "cn": "“我对我的球员的毅力和继续前进的纯粹意愿感到非常满意。",
    "src": "Sky Sports · 2026-09-09"
  },
  "keeper": {
    "en": "The St Mirren 'keeper rushes out and is beaten with a cute dink.",
    "cn": "圣米伦（St Mirren）的守门员冲了出去，被一个可爱的丁克殴打。",
    "src": "Sky Sports · 2026-09-09"
  },
  "key": {
    "en": "Key highlights include the Junius 11 manuscript, which influenced the Tapestry’s design.",
    "cn": "关键亮点包括影响挂毯设计的Junius 11手稿。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "kick": {
    "en": "The president hit many of his familiar rally points during the speech, touting his record on border security, last year's tax legislation, his tariff-heavy approach to trade and his White House renovation kick — including his planned ballroom.",
    "cn": "总统在演讲中击中了他许多熟悉的集会点，吹嘘他在边境安全方面的记录，去年的税收立法，他的关税沉重的贸易方式以及他的白宫翻新计划—包括他计划的宴会厅。",
    "src": "CBS News · 2026-09-10"
  },
  "kill": {
    "en": "According to Pentagon figures, the operations have killed more than 200 people.",
    "cn": "根据五角大楼的数据，这些行动已经造成200多人死亡。",
    "src": "CBS News · 2026-09-10"
  },
  "kind": {
    "en": "And it's not even clear that the production -- you know, the part where you turn your play into goals -- drove any kind of premium.",
    "cn": "而且尚不清楚他们的产出——也就是把表现转化为进球的部分——是否真的带来任何溢价。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "king": {
    "en": "The upshot of course is that King Harold is slain, with the defeated Englishmen being shown fleeing the field in the last scene of the tapestry.",
    "cn": "当然，结局是哈罗德国王被杀，战败的英国人在挂毯的最后一幕逃离战场。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "kingdom": {
    "en": "England had been at war with France for nearly five decades, and officials needed more money to pay for the kingdom’s armies and defenses.",
    "cn": "英格兰与法国交战了近五十年，官员们需要更多的钱来支付王国的军队和国防费用。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "kitchen": {
    "en": "I woke before my husband, James, before the baby—not early; we’d been up in the night—and went to the kitchen to make coffee.",
    "cn": "我醒得比我丈夫詹姆斯早，比孩子早——不早；我们通宵未眠，去厨房煮咖啡。",
    "src": "Vogue · 2026-09-10"
  },
  "lab": {
    "en": "Dr. Halaas also mentions that products containing biomimetic or lab-engineered vesicles are becoming a third category of exosome therapy that hair-growth consumers will start to see more of.",
    "cn": "哈拉斯博士还提到，含有仿生或实验室设计的囊泡的产品正在成为第三类外泌体疗法，头发生长的消费者将开始更多地看到这种疗法。",
    "src": "ELLE · 2026-09-09"
  },
  "know": {
    "en": "Well, then they will be very excited to know we’ve got lots more Portofino ’97 coming very soon—a hair mist, body lotion.",
    "cn": "那他们会很兴奋的知道我们很快就会有更多的97年波托菲诺——发胶，身体乳。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "lack": {
    "en": "On Wednesday, however, the U.S. Court of Appeals for the 8th Circuit rejected the request for a temporary stay of Clark's ruling, writing that the appeals court either lacks \"jurisdiction over the appeal or, based on the briefing we have so far, the stay factors have not been met.\"",
    "cn": "然而，周三，美国第八巡回上诉法院驳回了暂停克拉克裁决的请求，写道，上诉法院要么缺乏“对上诉的管辖权，要么根据我们迄今为止的简报，暂停因素尚未得到满足。",
    "src": "CBS News · 2026-09-10"
  },
  "knot": {
    "en": "They tied the knot in July 2010 and have since welcomed two children: 15-year-old son Leo Encinas Cruz, and 13-year-old daughter Luna Encinas Cruz.",
    "cn": "他们于2010年7月结婚，之后迎来了两个孩子：15岁的儿子里奥·恩西纳斯·克鲁兹和13岁的女儿露娜·恩西纳斯·克鲁兹。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "knife": {
    "en": "“They were equipped with an electric knife or a metal saw—whatever you prefer to call it—and they cut through the bolts holding the frames of Renoir’s works in place,” Bryan Masson, the mayor of Cagnes-sur-Mer, told reporters, per ABC News ’ Kevin Shalvey.",
    "cn": "据ABC新闻的凯文·沙维报道，滨海卡涅市长布莱恩·马森告诉记者：“他们配备了一把电动刀或一把金属锯——不管你喜欢怎么称呼它——他们把雷诺阿作品框架固定的螺栓切断了。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "kite": {
    "en": "The first song she made was the hypnotic “Like A Kite,” written around a year ago and almost abandoned after she got stuck on its second verse.",
    "cn": "她创作的第一首歌是催眠曲《像风筝一样》（Like A Kite），这首歌写于大约一年前，在第二节陷入困境后几乎被放弃。",
    "src": "Vogue · 2026-09-10"
  },
  "layer": {
    "en": "But for his spring/summer 2027 collection, the stalwart designer revisited his signatures while finding new ways to cut, layer, and style the classics.",
    "cn": "但在他的2027年春夏系列中，这位坚定的设计师重新审视了他的签名，同时寻找了切割、分层和风格经典的新方法。",
    "src": "ELLE · 2026-09-09"
  },
  "license": {
    "en": "“The Traitors” format was created and developed by IDTV in cooperation with RTL Creative Unit and is distributed by All3Media International, part of Banijay Entertainment, which also handles the show’s licensing program.",
    "cn": "《叛徒》由IDTV与RTL Creative Unit合作制作和开发，由Banijay Entertainment旗下的All3Media International发行，该公司还负责该节目的授权项目。",
    "src": "Variety · 2026-09-10"
  },
  "lieutenant": {
    "en": "For Pochettino, the biggest takeaway is how much he and his coaching staff, including his long-term lieutenant Jesus Perez, have learned.",
    "cn": "对于Pochettino来说，最大的收获是他和他的教练组，包括他的长期副手Jesus Perez ，学到了多少东西。",
    "src": "Sky Sports · 2026-09-09"
  },
  "life": {
    "en": "Its themes—of turbulent relationships and meandering life paths, toxic patterns and the euphoria found in everyday moments—are expressed with diaristic intimacy.",
    "cn": "它的主题——动荡的人际关系和曲折的人生道路，有毒的模式和在日常生活中发现的欣快感——通过日记式的亲密表达出来。",
    "src": "Vogue · 2026-09-10"
  },
  "lift": {
    "en": "The substitute raced onto Ryan Naderi's flick-on from Ivor Pandur's long ball before lifting a delightful lob over the goalkeeper to send Ibrox wild after a drab 90 minutes.",
    "cn": "替补队员从Ivor Pandur的长球中冲上Ryan Naderi的轻弹，然后在守门员身上举起一个令人愉快的球，在单调的90分钟后将Ibrox送到野外。",
    "src": "Sky Sports · 2026-09-09"
  },
  "light": {
    "en": "Fine hair can get weighed down easily, so a conditioner that detangles, adds softness, and boosts shine—while keeping hair light and airy—is a game changer.",
    "cn": "细腻的头发很容易被压垮，因此，一款能够解缠、增加柔软度和增强光泽的护发素，同时保持头发轻盈和通风，是一款改变游戏规则的护发素。",
    "src": "ELLE · 2026-09-10"
  },
  "line": {
    "en": "The ends were left uncurled and sleek to echo the clean lines of the dress.",
    "cn": "发梢没有卷曲，线条流畅，与裙子的简洁线条相呼应。",
    "src": "ELLE · 2026-09-09"
  },
  "likely": {
    "en": "Christos Tzolis is likely to be one of those players Arteta is referencing.",
    "cn": "Christos Tzolis很可能是Arteta提到的球员之一。",
    "src": "Sky Sports · 2026-09-09"
  },
  "like": {
    "en": "“I always keep my perfume right by the door, like on the entryway table,” Alisha adds.",
    "cn": "“我总是把香水放在门边，比如入口处的桌子上，”阿丽莎补充道。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "level": {
    "en": "“Your stylist can customize the exact spice level to complement your skin tone, starting level, and maintenance goals.”",
    "cn": "“你的发型师可以根据你的肤色、初始水平和保养目标定制准确的香料水平。",
    "src": "Cosmopolitan · 2026-09-09"
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
  "learn": {
    "en": "Members of a group learn to make or use these items by observing others.",
    "cn": "一个小组的成员通过观察其他人来学习制作或使用这些物品。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "leap": {
    "en": "In recent years, the Serbian industry has grown by leaps and bounds, thanks in large part to competition between the telecom heavyweight and rivals including United Media and public broadcaster Radio Television of Serbia.",
    "cn": "近年来，塞尔维亚的电信行业突飞猛进，这在很大程度上要归功于电信巨头与包括联合媒体和塞尔维亚公共广播公司广播电视在内的竞争对手之间的竞争。",
    "src": "Variety · 2026-09-10"
  },
  "lean": {
    "en": "The new House maps, passed by the state legislature last year, would dramatically redraw longtime Democratic Rep. Emanuel Cleaver's Kansas City-area district, making it GOP-leaning.",
    "cn": "去年由州议会通过的新众议院地图将大幅重绘长期的民主党众议员，伊曼纽尔·克利弗（Emanuel Cleaver）位于堪萨斯城（Kansas City）地区，倾向于共和党。",
    "src": "CBS News · 2026-09-10"
  },
  "leather": {
    "en": "The same goes for palette and texture, with materials like tweed, suede, and patent leather designed in varying color combinations.",
    "cn": "色调和质地也是如此，粗花呢、麂皮和漆皮等材料设计成不同的颜色组合。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "leak": {
    "en": "Out of respect for the primary next of kin, who are currently being scheduled for briefs on the official findings of the completed investigation, we will not comment on specific details, individual accounts, or leaked portions of the report at this time,\" the statement said.",
    "cn": "“出于对主要亲属的尊重，他们目前正被安排听取有关完成调查的官方结果的简报，我们目前不会对具体细节、个人账户或报告中泄露的部分发表评论，”声明说。",
    "src": "CBS News · 2026-09-10"
  },
  "leaf": {
    "en": "First introduced in 1968 and inspired by the four-leaf clover, the house signature has been reimagined over the decades in everything from mother-of-pearl and onyx to guilloché gold.",
    "cn": "该品牌于1968年首次推出，灵感来自四叶草，几十年来，从珍珠母贝、玛瑙到guilloché金，该品牌的标志被重新设计。",
    "src": "ELLE · 2026-09-09"
  },
  "leading": {
    "en": "He's spent over a decade at Who What Wear, currently leading the shopping team to deliver highly covetable and convertible content.",
    "cn": "他在Who What Wear工作了十多年，目前领导购物团队提供非常令人垂涎和可转换的内容。",
    "src": "Who What Wear · 2026-09-10"
  },
  "leader": {
    "en": "And the hunter was someone important, Dąbrowski tells PAP, like a family clan leader.",
    "cn": "Dąbrowski告诉PAP ，猎人是一个重要的人物，就像一个家族领袖。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "lead": {
    "en": "Norman will lead the film as Younger, a 16-year-old rehoused with his mother, Maria (played by Middleton), on the notorious Stonemore Estate.",
    "cn": "诺曼将主演这部电影，扮演16岁的扬格，与他的母亲玛丽亚（由米德尔顿饰演）一起在臭名昭著的斯通莫尔庄园重新安置。",
    "src": "Variety · 2026-09-10"
  },
  "league": {
    "en": "Don't be fooled by this result -- Chelsea are back among the Premier League title contenders.",
    "cn": "不要被这场比赛的结果欺骗——切尔西已经重新回到争冠行列。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "leave": {
    "en": "Hair experts chime in with their favorite leave-in conditioners from amika, Rōz, and more.",
    "cn": "美发专家也从amika、Rōz等网站上推荐了他们最喜欢的免洗护发素。",
    "src": "ELLE · 2026-09-09"
  },
  "left": {
    "en": "Most of the dominance disappeared as soon as the ball left the winger's foot.",
    "cn": "球一旦离开边锋的脚下，那种统治力就消失了。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "let": {
    "en": "We need to keep giving him the ball and letting things happen.\"",
    "cn": "我们需要继续给他球，让事情发生。",
    "src": "Sky Sports · 2026-09-09"
  },
  "lens": {
    "en": "“With both its director Theja Rio and producer Nancy Beso hailing from Nagaland, the film eschews the ‘outsider gaze’ and the pitfalls of Orientalist exoticisation, authentically anchoring its narrative in an Indigenous cultural lens shaped by lived experience.",
    "cn": "导演Theja b里约热内卢和制片人Nancy Beso都来自那加兰邦，这部电影避开了“局外人的目光”和东方主义异国情调的陷阱，真实地将其叙事固定在由生活经历塑造的土著文化镜头中。",
    "src": "Variety · 2026-09-10"
  },
  "leg": {
    "en": "\"The back three, when I watch them, it's almost like their legs aren't connected to their hips and the hips aren't connected to their bodies,\" he said on his Sky Sports podcast.",
    "cn": "他在自己的天空体育播客中说：「看这三中卫比赛，几乎感觉他们的腿和髋关节、髋关节和躯干是断开的。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "length": {
    "en": "Forget a basic white tee: In her eyes, you need a totally bedazzled floor-length one.",
    "cn": "忘记一件普通的白t恤吧：在她眼里，你需要一件完全令人眼花缭乱的及地t恤。",
    "src": "Vogue · 2026-09-10"
  },
  "just": {
    "en": "Arsenal conceded just 27 goals in 38 league games on their way to the title last season.",
    "cn": "阿森纳上赛季以 38 场仅丢 27 球的防守赢得了联赛冠军。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "installation": {
    "en": "More than 500,000 visitors worldwide have visited the installation.",
    "cn": "全球已有超过50万名参观者参观了该装置。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "instance": {
    "en": "The team watched the siblings play “soccer” with each other and their mother, and in one instance, with two juvenile Cozumel dwarf coatis.",
    "cn": "研究小组观察了这对兄弟姐妹和它们的母亲一起踢“足球”，有一次，他们还和两只科苏梅尔矮长鼻浣熊幼崽一起踢足球。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "instant": {
    "en": "Whether you’re looking for instant post-wash volume or on a longer-term mission to thicker tresses, you’ve come to the right place.",
    "cn": "无论您是在寻找即时洗涤量，还是在寻找更厚的长期任务，您都来对地方了。",
    "src": "ELLE · 2026-09-10"
  },
  "instead": {
    "en": "Was it instead intended to be draped along the walls of a great hall?",
    "cn": "它是打算挂在大厅的墙上吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "institute": {
    "en": "“The metal sheets provide a hard substrate for marine life to grow on,” lead author Simone Modugno, a marine biologist with the Institute for Research, Development and Experimentation on the Environment and Territory, tells BBC Wildlife magazine ’s Helen Pilcher.",
    "cn": "“金属板为海洋生物的生长提供了坚硬的基础，”环境与领土研究、开发和实验研究所的海洋生物学家Simone Modugno告诉英国广播公司野生动物杂志的海伦·皮尔彻。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "intellectual": {
    "en": "The venture has brought in an advisory board whose members work across intellectual-property and entertainment law, filmmaking, screenwriting and franchise development on one side, and international production, finance, media strategy, technology and distribution on the other.",
    "cn": "这家合资企业还引入了一个顾问委员会，其成员一方面涉及知识产权和娱乐法律、电影制作、剧本创作和特许经营开发，另一方面涉及国际制作、金融、媒体战略、技术和发行。",
    "src": "Variety · 2026-09-10"
  },
  "interesting": {
    "en": "“To have something polarizing is a compliment because I would always rather be part of the conversation and have something interesting than something boring and safe.”",
    "cn": "“有一些两极分化的东西是一种赞美，因为我总是宁愿成为谈话的一部分，做一些有趣的事情，而不是无聊和安全的事情。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "interest": {
    "en": "Nottingham Forest could revive their interest in Tottenham midfielder Lucas Bergvall in January.",
    "cn": "诺丁汉森林可能会在一月份恢复他们对托特纳姆热刺中场球员卢卡斯·伯格瓦尔的兴趣。",
    "src": "Sky Sports · 2026-09-09"
  },
  "inspire": {
    "en": "This elusive look is exactly what inspired Belghiran for Cult Gaia’s spring/summer 2027 show.",
    "cn": "这种难以捉摸的造型正是Belghiran为Cult Gaia 2027年春夏时装秀的灵感来源。",
    "src": "ELLE · 2026-09-09"
  },
  "intentional": {
    "en": "Sequins dissolved into fringe, single-seam construction allowed one wrap dress to fall around the body with effortless ease, and “spritz and tumble” dresses had an intentional wrinkled consistency.",
    "cn": "亮片溶解在流苏中，单缝结构使一件裹身连衣裙可以毫不费力地轻松落在身体周围，“spritz and tumble”连衣裙具有故意起皱的一致性。",
    "src": "ELLE · 2026-09-09"
  },
  "intense": {
    "en": "“I am truly delighted to bring audiences the genuine emotion and human drama that only a competition as intense as ‘The Floor’ can draw out of its contestants.”",
    "cn": "“我很高兴能给观众带来真正的情感和人类的戏剧，只有像《地板》这样激烈的比赛才能激发出参赛者的情感。",
    "src": "Variety · 2026-09-10"
  },
  "intend": {
    "en": "Was it instead intended to be draped along the walls of a great hall?",
    "cn": "它是打算挂在大厅的墙上吗？",
    "src": "HistoryExtra · 2026-09-10"
  },
  "intelligence": {
    "en": "Woody possesses the rare combination of vulnerability, intelligence and strength that Younger demands, while Malachi, Conrad, Kola and Tuppence bring extraordinary weight and complexity to the forces shaping his life.",
    "cn": "伍迪拥有杨格所要求的脆弱、智慧和力量的罕见结合，而玛拉基、康拉德、科拉和塔彭丝则给塑造他生活的力量带来了非凡的重量和复杂性。",
    "src": "Variety · 2026-09-10"
  },
  "insist": {
    "en": "He insisted Xabi Alonso should focus on reinforcements at the back.",
    "cn": "他坚称哈维·阿隆索应当把补强后防作为首要任务。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "industry": {
    "en": "\"We are fighting for the whole creative industry in Serbia.",
    "cn": "“我们正在为塞尔维亚的整个创意产业而战。",
    "src": "Variety · 2026-09-10"
  },
  "inefficient": {
    "en": "The problem, though, is that even the best crossers are incredibly inefficient.",
    "cn": "问题是，即便是最顶级的传中高手，效率也低得惊人。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "influence": {
    "en": "Nicola Tallis explores Elizabeth I’s early years to reveal how her formative experiences influenced the monarch she later became",
    "cn": "尼古拉·塔利斯探索了伊丽莎白一世的早年生活，揭示了她的成长经历是如何影响她后来成为君主的",
    "src": "HistoryExtra · 2026-09-09"
  },
  "inside": {
    "en": "The formula plumps up your tresses for voluminous locks that last and provides fuller strands from the inside out.",
    "cn": "该配方为您的长裤增添了丰富的锁，可以持续使用，并从内到外提供更饱满的锁链。",
    "src": "ELLE · 2026-09-10"
  },
  "injury": {
    "en": "Odegaard only scored once for Arsenal during an injury-hit 2025/26 campaign but now his stats are up across a range of other attacking metrics, too.",
    "cn": "在一场受伤的2025/26赛季中，厄德高只为阿森纳得分一次，但现在他的统计数据也在一系列其他攻击指标上都有所上升。",
    "src": "Sky Sports · 2026-09-09"
  },
  "initial": {
    "en": "Board members are based in Hollywood, Asia, the Middle East and other production hubs, and will help K2 vet and build out opportunities as they move from initial rights work through financing, production, partnerships and monetization.",
    "cn": "董事会成员分布在好莱坞、亚洲、中东和其他制作中心，他们将帮助K2在从最初的版权工作到融资、制作、合作和货币化的过程中寻找和创造机会。",
    "src": "Variety · 2026-09-10"
  },
  "international": {
    "en": "Jungle Book Studio has taken international sales rights to “ Angh,” the debut feature from Nagaland filmmaker Theja Rio.",
    "cn": "《丛林之书》工作室获得了那加兰邦电影制作人Theja b里约热内卢的处女作《Angh》的国际销售权。",
    "src": "Variety · 2026-09-10"
  },
  "jam": {
    "en": "Cruz and Bardem first met on the 1992 set of Jamón, Jamón, and started dating 15 years later, while filming Vicky Cristina Barcelona in 2008.",
    "cn": "克鲁兹和巴登在1992年的《Jamón，Jamón》片场相识，15年后在2008年拍摄《午夜巴塞罗那》时开始约会。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "january": {
    "en": "There will be further releases into 2027 for dates between January and July 2027.",
    "cn": "在2027年1月到7月之间还会有更多的电影上映。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "japan": {
    "en": "Nippon TV has ordered a second season of Talpa Studios ‘ game show “ The Floor ” in Japan, building on the format’s first full adaptation in Asia.",
    "cn": "日本电视台（Nippon TV）订购了日本Talpa Studios的游戏节目《The Floor》第二季，这是该节目在亚洲首次全面改编。",
    "src": "Variety · 2026-09-10"
  },
  "japanese": {
    "en": "Rangers summer signing Daisuke Yokota - who was ruled out of the St Mirren game through injury - is also set to undergo surgery and the Japanese winger is also facing a lengthy period out.",
    "cn": "流浪者队夏季签约横田大辅-因受伤被排除在圣米伦比赛之外-也将接受手术，这位日本边锋也面临着漫长的时期。",
    "src": "Sky Sports · 2026-09-09"
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
    "en": "Last night at the Boom Boom Room, Lipa and Turner joined a starry crowd that also included Anne Hathaway and Hudson Williams.",
    "cn": "昨晚在Boom Boom Room，利帕和特纳和安妮·海瑟薇、哈德森·威廉姆斯等明星一起亮相。",
    "src": "Vogue · 2026-09-10"
  },
  "joint": {
    "en": "Earlier this year, American commandos joined Ecuadorian troops in a joint mission aimed at dismantling a suspected criminal hub operated by an alleged narco-terrorist organization along the country's coast.",
    "cn": "今年早些时候，美国突击队与厄瓜多尔军队一起执行了一项联合任务，目的是拆除该国沿海地区一个涉嫌由贩毒恐怖组织运营的犯罪中心。",
    "src": "CBS News · 2026-09-10"
  },
  "jolly": {
    "en": "This jolly discovery has a poignant undertone.",
    "cn": "这一令人愉快的发现暗含着辛酸的意味。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "jury": {
    "en": "Maggie Gyllenhaal will lead this year’s jury, which includes composer and artist Daniel Blumberg, French director and screenwriter Xavier Giannoli, and producer Johnnie To.",
    "cn": "玛吉·吉伦哈尔将领导今年的评审团，评审团成员包括作曲家兼艺术家丹尼尔·布隆伯格、法国导演兼编剧泽维尔·扬诺里和制片人杜琪峰。",
    "src": "ELLE · 2026-09-09"
  },
  "jungle": {
    "en": "Set deep in the Colombian jungle, the eight-episode series, titled \"Ha'Bricha\" in Hebrew, centers around the scion of a religious cult leader who manages to flee but is forced to leave behind his wife and child.",
    "cn": "这部八集的剧集以哥伦比亚丛林深处为背景，希伯来语名为“Ha’bricha”，故事围绕着一个邪教领袖的后代展开，他设法逃离，但被迫留下妻子和孩子。",
    "src": "Variety · 2026-09-10"
  },
  "june": {
    "en": "Criminal gang violence continues unabated in Ecuador following the recapture in June 2025 of the country's biggest drug lord, Adolfo Mac&iacute;as after his escape from a maximum-security prison in 2024.",
    "cn": "厄瓜多尔最大的毒枭Adolfo maciacute于2024年从最高安全级别的监狱越狱后，于2025年6月被重新抓获，此后该国的犯罪团伙暴力活动有增无减。",
    "src": "CBS News · 2026-09-10"
  },
  "july": {
    "en": "There will be further releases into 2027 for dates between January and July 2027.",
    "cn": "在2027年1月到7月之间还会有更多的电影上映。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "judge": {
    "en": "A federal judge ruled Tuesday that Missouri should use a new congressional map that favors Republicans for now, hours after the U.S. Supreme Court left in place a ruling from the state's highest court directing Missouri to use an older map.",
    "cn": "一名联邦法官周二裁定，密苏里州应该使用目前有利于共和党人的新国会地图，此前美国最高法院在该州最高法院的裁决中指示密苏里州使用旧地图。",
    "src": "CBS News · 2026-09-10"
  },
  "joy": {
    "en": "“I really found joy in the draping,” she said.",
    "cn": "“我真的在窗帘上找到了乐趣，”她说。",
    "src": "Vogue · 2026-09-10"
  },
  "journey": {
    "en": "\"We're incredibly proud of what the team created and excited for the film to now begin its journey to audiences around the world.\"",
    "cn": "“我们为团队的创作感到无比自豪，并为这部电影现在开始面向全球观众的旅程感到兴奋。",
    "src": "Variety · 2026-09-10"
  },
  "journal": {
    "en": "Now, more than eight decades later, the wreck is teeming with marine life, researchers report in a paper published July 26 in the journal Frontiers in Ocean Sustainability.",
    "cn": "研究人员在7月26日发表在《海洋可持续发展前沿》（Frontiers in Ocean Sustainability）杂志上的一篇论文中报告说，现在，80多年过去了，沉船上充满了海洋生物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "jacket": {
    "en": "You'll also notice cool jackets, trousers to dress up or down, and cute tees.",
    "cn": "你还会注意到很酷的夹克、穿搭或穿搭的裤子和可爱的t恤。",
    "src": "Who What Wear · 2026-09-10"
  },
  "itself": {
    "en": "Alongside the Tapestry itself, visitors can explore a range of digital elements designed to enhance understanding and engagement.",
    "cn": "除了挂毯本身，游客还可以探索一系列旨在增强理解和参与的数字元素。",
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
    "en": "In France’s latest art heist, two thieves broke into Pierre-Auguste Renoir ’s house and stole four of his paintings.",
    "cn": "在法国最近的艺术品盗窃案中，两名小偷闯入皮埃尔-奥古斯特·雷诺阿的家中，偷走了他的四幅画。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "interview": {
    "en": "Mauricio Pochettino speaks to Sky Sports News' Gail Davis in an exclusive interview; ex-Tottenham and Chelsea boss reveals hope of returning to Premier League in future; last month, the Argentine signed a new four-year deal to continue as the manager of the USA men's team",
    "cn": "毛里西奥·波切蒂诺（Mauricio Pochettino）在接受天空体育新闻（Sky Sports News）的盖尔·戴维斯（Gail Davis）独家采访时表示；前托特纳姆热刺和切尔西主帅透露了未来重返英超联赛的希望；上个月，阿根廷人签署了一份新的四年合同，继续担任美国男子队的经理",
    "src": "Sky Sports · 2026-09-09"
  },
  "interpretation": {
    "en": "What came next was a wide-ranging interpretation of Lauren’s world, moving from elevated “going out” looks to polished prep, with suiting at its sharpest.",
    "cn": "接下来是对Lauren的世界进行了广泛的解释，从高端的“走出去”外观转变为抛光的准备，以最锋利的姿态穿着。",
    "src": "ELLE · 2026-09-09"
  },
  "intimate": {
    "en": "This afternoon, Lauren drew an intimate but expectedly A-list crowd inside an Italian Renaissance Revival landmark building in Manhattan’s Tribeca neighborhood.",
    "cn": "今天下午，Lauren在曼哈顿翠贝卡（Tribeca）街区的一座意大利文艺复兴复兴时期的地标性建筑内吸引了一群亲密但令人期待的一线人群。",
    "src": "ELLE · 2026-09-09"
  },
  "justice": {
    "en": "Justice Brett Kavanaugh has requested a response from the plaintiffs in the lawsuit — the proponents of the new redistricting map — by Thursday morning.",
    "cn": "大法官布雷特·卡瓦诺（Brett Kavanaugh）已要求原告在周四上午之前做出回应，原告是新重新划分地图的支持者。",
    "src": "CBS News · 2026-09-10"
  },
  "invest": {
    "en": "If you want to add a lavish touch to your fall 2026 wardrobes, think about investing in a brocade or jacquard coat, an embroidered satin skirt, or a going out top with embellished details.",
    "cn": "如果你想为2026年的秋季衣橱增添奢华的色彩，可以考虑买一件锦缎或提花大衣，一件绣花缎子裙子，或者一件带有装饰细节的外出上衣。",
    "src": "Who What Wear · 2026-09-10"
  },
  "investigation": {
    "en": "But before the review was underway, a CBS News investigation began shedding light on what several survivors of the attack described as \"strategic failures\" ahead of, during and after the strike.",
    "cn": "但在审查开始之前，哥伦比亚广播公司新闻频道（CBS News）的一项调查开始揭示了几名袭击幸存者所说的在袭击之前、期间和之后的“战略失败”。",
    "src": "CBS News · 2026-09-10"
  },
  "item": {
    "en": "Every item on this page was chosen by an ELLE editor.",
    "cn": "此页面上的每个项目都由ELLE编辑器选择。",
    "src": "ELLE · 2026-09-10"
  },
  "italian": {
    "en": "This spring, thieves stole $10 million worth of paintings by Renoir, Henri Matisse and Paul Cézanne from an Italian museum.",
    "cn": "今年春天，窃贼从一家意大利博物馆偷走了价值1000万美元的雷诺阿（Renoir）、亨利·马蒂斯（Henri Matisse）和保罗·卡萨姆（Paul csamzanne）的画作。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "issue": {
    "en": "The former CVS pharmacy executive has campaigned on housing and affordability, some of the most resonant issues in the midterm elections.",
    "cn": "这位前CVS制药公司高管的竞选主题是住房和可负担性，这是中期选举中最容易引起共鸣的一些问题。",
    "src": "CBS News · 2026-09-10"
  },
  "isolate": {
    "en": "The first one was insulin: In the 1920s, scientists isolated the peptide from animal pancreases and began using it to treat Type 1 diabetes.",
    "cn": "第一种是胰岛素：20世纪20年代，科学家从动物胰腺中分离出这种肽，并开始将其用于治疗1型糖尿病。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "island": {
    "en": "Rhode Island is a reliably Democratic state, and hasn't elected a Republican statewide since 2006, making Foulkes the favorite to win in November.",
    "cn": "罗德岛州是一个可靠的民主党州，自2006年以来，该州还没有选出过共和党人，这使得福克斯最有可能在11月获胜。",
    "src": "CBS News · 2026-09-10"
  },
  "involve": {
    "en": "Robert Reisz, a paleontologist at the University of Toronto who was not involved in the study, tells Ivan Semeniuk at the Globe and Mail that the study provides new insight on the dinosaurs' reproductive strategies.",
    "cn": "多伦多大学的古生物学家Robert Reisz没有参与这项研究，他告诉《环球邮报》的Ivan Semeniuk ，这项研究为恐龙的生殖策略提供了新的见解。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "invite": {
    "en": "\"I think it's pretty reasonable that if the president would like to have a conversation — or invite someone to have a conversation — to have it.",
    "cn": "“我认为，如果总统想进行对话—或邀请某人进行对话—进行对话是非常合理的。",
    "src": "CBS News · 2026-09-10"
  },
  "investment": {
    "en": "Gayathiri Guliani and Uzair Merchant are unveiling K2 Media Capital, a new entertainment investment and production venture, at the Toronto Film Festival market.",
    "cn": "Gayathiri Guliani和Uzair Merchant在多伦多电影节市场上推出了K2 Media Capital，这是一家新的娱乐投资和制作企业。",
    "src": "Variety · 2026-09-10"
  },
  "good": {
    "en": "Mauricio Pochettino has always been good company - warm, engaging and likeable.",
    "cn": "Mauricio Pochettino一直是好伙伴--热情、迷人、可爱。",
    "src": "Sky Sports · 2026-09-09"
  },
  "golden": {
    "en": "The scooped pass to release Ben White for the golden chance somehow spurned by Piero Hincapie was one of many examples of his ingenuity against the massed ranks of Napoli players but there were plenty of others.",
    "cn": "皮耶罗·辛卡皮（Piero Hincapie）以某种方式拒绝了释放本·怀特（Ben White）的黄金机会，这是他对那不勒斯球员群体的聪明才智的众多例子之一，但还有很多其他例子。",
    "src": "Sky Sports · 2026-09-09"
  },
  "equality": {
    "en": "Longstanding board advisor and diversity, equality, and inclusion (DEI) specialist Pavita Cooper has been named the British Fashion Council’s (BFC) new chair, following the announcement of David Pemsel’s pending departure.",
    "cn": "继大卫·彭塞尔即将离职的消息宣布后，长期担任董事会顾问、多元化、平等和包容（DEI）专家的帕维塔·库珀被任命为英国时装协会（BFC）新任主席。",
    "src": "Vogue · 2026-09-10"
  },
  "escape": {
    "en": "\"The Escape\" is a Keshet Media Group production in association with Reisdor Productions for Keshet 12, produced by SE Films and Reisdor.",
    "cn": "“The Escape”是凯舍特传媒集团与瑞斯多制作公司联合制作的凯舍特12，由SE电影和瑞斯多制作。",
    "src": "Variety · 2026-09-10"
  },
  "especially": {
    "en": "The longevity was very important to me, especially when you look at the storytelling from Portofino ’97 to Hotel Portofino.",
    "cn": "这部电影的长期性对我来说非常重要，尤其是当你看从《波托菲诺97》到《波托菲诺酒店》的故事叙述时。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "estimate": {
    "en": "During the Covid-19 pandemic, he saw parallels between the ongoing crisis and the Black Death, which killed an estimated 30 to 50 percent of England’s population just a few decades before the uprising.",
    "cn": "在新冠肺炎疫情期间，他看到了持续的危机与黑死病之间的相似之处，黑死病在起义前几十年杀死了估计30%至50%的英格兰人口。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "europe": {
    "en": "Objects from the British Museum’s own collection and other significant loans from across the UK and Europe are displayed, offering fresh perspectives on the people and events depicted in the embroidery.",
    "cn": "展品包括大英博物馆自己收藏的物品，以及从英国和欧洲各地借来的其他重要物品，为刺绣中描绘的人物和事件提供了新的视角。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "everyone": {
    "en": "“Everyone’s obsessed with shiny, glossy-looking hair this season, which can make color look better and hair healthier overall,” she explains.",
    "cn": "她解释说：“这个季节每个人都痴迷于有光泽、有光泽的头发，这可以让头发的颜色看起来更好，整体上更健康。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "every": {
    "en": "There are two festive midweek rounds of Premier League fixtures when every match will be broadcast live on Sky Sports.",
    "cn": "英超联赛周中有两轮喜庆的比赛，每场比赛都将在天空体育进行直播。",
    "src": "Sky Sports · 2026-09-10"
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
    "en": "DFW is the headline event of the Arab Fashion Council (AFC), which was founded by its CEO, Jacob Abrian, in 2014, with a mandate to represent fashion across the 22 countries of the Arab League.",
    "cn": "DFW是阿拉伯时尚理事会（AFC）的头条活动，AFC由其首席执行官雅各布·阿布里安（Jacob Abrian）于2014年创立，其使命是代表阿拉伯联盟22个国家的时尚。",
    "src": "Vogue · 2026-09-10"
  },
  "even": {
    "en": "Chandelier earrings were the perfect match for many of Ralph Lauren's most elegant evening looks.",
    "cn": "枝形吊灯耳环是拉夫·劳伦许多最优雅的晚装的完美搭配。",
    "src": "Who What Wear · 2026-09-10"
  },
  "european": {
    "en": "We want to use this technology responsibly, strengthen European sovereignty and create stories that inspire audiences around the world.\"",
    "cn": "我们希望负责任地使用这项技术，加强欧洲主权，并创造能够激励全世界观众的故事。",
    "src": "Variety · 2026-09-10"
  },
  "evening": {
    "en": "Chandelier earrings were the perfect match for many of Ralph Lauren's most elegant evening looks.",
    "cn": "枝形吊灯耳环是拉夫·劳伦许多最优雅的晚装的完美搭配。",
    "src": "Who What Wear · 2026-09-10"
  },
  "everything": {
    "en": "And also this is my situation right now: I do everything.",
    "cn": "这也是我现在的处境：我什么都做。",
    "src": "Vogue · 2026-09-10"
  },
  "environment": {
    "en": "Still, they found a way to “not only reproduce or nest in the lower latitude environments but also in these higher-latitude environments, which are usually more challenging.\"",
    "cn": "尽管如此，他们还是找到了一种方法，“不仅可以在低纬度环境中繁殖或筑巢，还可以在这些通常更具挑战性的高纬度环境中繁殖或筑巢。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "encourage": {
    "en": "Many believe Chelsea could push Arsenal the closest this season, given an absence of European football and Alonso's encouraging early returns.",
    "cn": "很多人认为切尔西是本赛季最有可能挑战阿森纳的球队，因为蓝军没有欧战任务，而阿隆索的开局令人鼓舞。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "end": {
    "en": "Harold’s time in Normandy ends with him making an oath to William on holy relics.",
    "cn": "哈罗德在诺曼底的时光以他对着圣物向威廉宣誓结束",
    "src": "HistoryExtra · 2026-09-09"
  },
  "ending": {
    "en": "The ending is abrupt and many people have pondered on whether the tapestry was not actually finished, or has lost its final frames at some point over the centuries.",
    "cn": "结局很突然，许多人都在想，这幅挂毯到底是没有完成，还是几个世纪以来的某个时候失去了最后的画框。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "enemy": {
    "en": "In 1941, enemy fire sank an Italian hospital ship off the coast of Albania.",
    "cn": "1941年，一艘意大利医院船在阿尔巴尼亚海岸附近沉没。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "energy": {
    "en": "At Cult Gaia, the lovergirl energy didn’t end with the undone ponytails, either.",
    "cn": "在《盖娅崇拜》中，情人的能量并没有随着松开的马尾辫而结束。",
    "src": "ELLE · 2026-09-09"
  },
  "engineer": {
    "en": "The show notes highlighted some of the collection's best clothes meant to be worn after dark: \"Evening offers a bounty of options: fluid wrap dress, engineered with only a single seam; shimmering navy tank dress covered in micro sequins that release into fringe over trousers; poetic, embroidered velvet robe over ethereal white blouse and gesso-painted floral-print jeans.\"",
    "cn": "秀场说明重点介绍了该系列中一些适合在天黑后穿的最佳服装：“晚上有很多选择：流畅的裹身裙，只有一条缝；闪闪发光的海军蓝背心裙，上面镶着微亮片，露出裤子的流苏；诗情画意的刺绣天鹅绒长袍，飘逸的白色衬衫和石膏印花牛仔裤。",
    "src": "Who What Wear · 2026-09-10"
  },
  "england": {
    "en": "Harold then goes back to England and has another meeting with Edward the Confessor.",
    "cn": "哈罗德随后回到英格兰，与忏悔者爱德华再次会面。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "entire": {
    "en": "In fact, Black Opium’s entire line has always been about this.",
    "cn": "事实上，黑鸦片的整条线都是围绕着这个。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "enthusiastic": {
    "en": "Having had a few weeks to reset away from the spotlight, there were enthusiastic hugs all round for the Sky Sports News team as we all swapped summer stories.",
    "cn": "在离开聚光灯几周后，天空体育新闻团队充满了热情的拥抱，因为我们都交换了夏天的故事。",
    "src": "Sky Sports · 2026-09-09"
  },
  "entertain": {
    "en": "\"The intent was to make an entertaining genre film that explores the cyclical nature of history and the individual’s role inside it.\"",
    "cn": "“目的是制作一部有趣的流派电影，探索历史的周期性和个人在其中的角色。",
    "src": "Variety · 2026-09-10"
  },
  "enter": {
    "en": "The burglars entered Cagnes-sur-Mer’s Renoir Museum, housed in the estate where the famed Impressionist spent the last decade of his life, before sunrise this morning.",
    "cn": "在今天早晨日出之前，窃贼进入了梅尔河畔卡涅的雷诺阿博物馆，该博物馆位于著名印象派画家雷诺阿度过生命最后十年的地方。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "enough": {
    "en": "This has gone on for long enough that it's not just some random quirk.",
    "cn": "这种情况已经持续了足够长的时间，绝不只是偶然。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "enjoy": {
    "en": "There's managing at the World Cup, then there's managing at a home World Cup for a nation whose President rather enjoys the spotlight.",
    "cn": "在世界杯上进行管理，然后在一个主场世界杯上为一个总统更喜欢聚光灯的国家进行管理。",
    "src": "Sky Sports · 2026-09-09"
  },
  "english": {
    "en": "The English-language, post-apocalyptic thriller is directed by Filip Kovačević",
    "cn": "这部英语后世界末日惊悚片由菲利普·科瓦切维奇（Filip Kovačević）执导",
    "src": "Variety · 2026-09-10"
  },
  "expansion": {
    "en": "In her new role, Cooper will advocate for fashion as a financial and cultural asset to the UK, as well as its strong global reach, working with the BFC’s board, executive leaders, and the industry at large to foster a stronger ecosystem for homegrown talent, enterprise and business, encouraging international expansion.",
    "cn": "在她的新角色中，库珀将倡导时尚作为英国的金融和文化资产，以及其强大的全球影响力，与BFC董事会，执行领导人和整个行业合作，为本土人才，企业和商业建立更强大的生态系统，鼓励国际扩张。",
    "src": "Vogue · 2026-09-10"
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
    "en": "I found myself in all of these new spaces and having new types of experiences.”",
    "cn": "我发现自己置身于所有这些新空间中，拥有全新的体验。",
    "src": "Vogue · 2026-09-10"
  },
  "experimental": {
    "en": "By contrast, many peptides available for purchase online are experimental chemicals: They are not approved by the Food and Drug Administration and are openly sold with disclaimers, such as “for research use only.”",
    "cn": "相比之下，许多在线购买的肽是实验性化学品：它们未经美国食品和药物管理局批准，并公开出售免责声明，例如“仅供研究使用”。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "expert": {
    "en": "Experts have also questioned whether they do anything to curb the flow of cocaine and other drugs to the United States -- the world's largest consumer.",
    "cn": "专家们还质疑他们是否采取了任何措施来遏制可卡因和其他毒品流入美国——世界上最大的消费国。",
    "src": "CBS News · 2026-09-10"
  },
  "explain": {
    "en": "“It’s more about keeping the hair hydrated, manageable, and healthy depending on the style you’re trying to create,” explains celebrity hair stylist Jenny Cho.",
    "cn": "名人发型师珍妮·赵解释说：“根据你想打造的发型，更重要的是保持头发的水分、易打理和健康。",
    "src": "ELLE · 2026-09-09"
  },
  "explode": {
    "en": "The operation \"killed three narco-terrorists,\" SOUTHCOM posted on X along with black-and-white footage of a ship exploding in the water and bursting into flames.",
    "cn": "南方司令部在X上发布了这次行动“杀死了三名毒品恐怖分子”，并附上了一艘船在水中爆炸并起火的黑白画面。",
    "src": "CBS News · 2026-09-10"
  },
  "explore": {
    "en": "September is all about exploring color, contrast, and nature, as some of the industry’s most recognizable motifs are reimagined through unexpected materials and techniques.",
    "cn": "九月的主题是探索色彩、对比和自然，因为一些业内最知名的主题通过意想不到的材料和技术被重新想象。",
    "src": "ELLE · 2026-09-09"
  },
  "explosion": {
    "en": "Perhaps more dated, or certainly not for everyone, were her explosions of tulle, including a full-on red mermaid strapless gown, with sheer hints of pink tulle peeking through the underlay.",
    "cn": "也许更过时的是她对薄纱的大爆炸，或者肯定不适合所有人，包括一件全身红色美人鱼无肩带礼服，衬底中透出一丝粉色薄纱。",
    "src": "Vogue · 2026-09-10"
  },
  "export": {
    "en": "Telecommunications giant Telekom Srbija is looking to position itself as not only the leading production hub in Serbia but a regional juggernaut for the countries of the former Yugoslavia, exporting local content while attracting international productions to the Balkan nation.",
    "cn": "电信巨头塞尔维亚电信（Telekom Srbija）正在寻求将自己定位为不仅是塞尔维亚领先的生产中心，而且是前南斯拉夫国家的地区巨头，在向巴尔干国家出口本地内容的同时吸引国际制作。",
    "src": "Variety · 2026-09-10"
  },
  "extraordinary": {
    "en": "Theja has brought an extraordinary depth of vision and sensitivity to this story, and it has been deeply meaningful to build this film alongside him.”",
    "cn": "Theja为这个故事带来了非凡的深度和敏感性，和他一起制作这部电影非常有意义。",
    "src": "Variety · 2026-09-10"
  },
  "expand": {
    "en": "Finally, ME+EM expands its accessories world with Atelier.",
    "cn": "最后，ME+EM通过Atelier拓展了其配件领域。",
    "src": "ELLE · 2026-09-09"
  },
  "exist": {
    "en": "His now-City teammate Jérémy Doku exists in his own ball-carrying world, but Ndiaye ranked second behind him in completed take-ons last season, per the stats app Futi.",
    "cn": "他如今的曼城队友多库在持球推进方面独成一档，而根据数据应用 Futi 的统计，恩迪亚耶上赛季成功突破数仅次于多库。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "example": {
    "en": "The scooped pass to release Ben White for the golden chance somehow spurned by Piero Hincapie was one of many examples of his ingenuity against the massed ranks of Napoli players but there were plenty of others.",
    "cn": "皮耶罗·辛卡皮（Piero Hincapie）以某种方式拒绝了释放本·怀特（Ben White）的黄金机会，这是他对那不勒斯球员群体的聪明才智的众多例子之一，但还有很多其他例子。",
    "src": "Sky Sports · 2026-09-09"
  },
  "examine": {
    "en": "As part of his HistoryExtra Academy series on the embroidery, Dr David Musgrove examines the history of the tapestry, the story it tells, who made it and whether it's reliable as a historical source…",
    "cn": "作为他关于刺绣的历史系列的一部分，大卫·马斯格罗夫博士研究了挂毯的历史，它讲述的故事，它的制造者，以及它作为历史来源是否可靠…",
    "src": "HistoryExtra · 2026-09-09"
  },
  "exactly": {
    "en": "This elusive look is exactly what inspired Belghiran for Cult Gaia’s spring/summer 2027 show.",
    "cn": "这种难以捉摸的造型正是Belghiran为Cult Gaia 2027年春夏时装秀的灵感来源。",
    "src": "ELLE · 2026-09-09"
  },
  "exact": {
    "en": "“Your stylist can customize the exact spice level to complement your skin tone, starting level, and maintenance goals.”",
    "cn": "“你的发型师可以根据你的肤色、初始水平和保养目标定制准确的香料水平。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "exchange": {
    "en": "And while there's always a time and place for hyper minimalist styles, this season simple silhouettes are taking a backseat in exchange for opulence.",
    "cn": "虽然超级极简风格总有合适的时间和地点，但这一季，简单的轮廓让位于富裕。",
    "src": "Who What Wear · 2026-09-10"
  },
  "exhibition": {
    "en": "Perhaps Chicago’s most well-known serial killer, Gacy features prominently in the exhibition.",
    "cn": "也许是芝加哥最著名的连环杀手，盖西在展览中占据突出地位。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "exercise": {
    "en": "So many dominant games from wingers ended up being exercises in frustration.",
    "cn": "所以很多边锋即便统治了比赛，最终也只能无功而返。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "executive": {
    "en": "Higuchi-Zitzmann, the company's CEO and founder, is one of Germany's most internationally experienced media executives and producers.",
    "cn": "公司首席执行官兼创始人Higuchi-Zitzmann是德国最具国际经验的媒体高管和制作人之一。",
    "src": "Variety · 2026-09-10"
  },
  "execute": {
    "en": "For short nails, we love a perfectly executed, solid-toned mani for a polished, minimalist aesthetic that works every time.”",
    "cn": "对于短指甲，我们喜欢完美的、纯色调的指甲，这是一种抛光的、极简主义的美学，每次都能奏效。",
    "src": "Harper's Bazaar · 2026-09-09"
  },
  "exciting": {
    "en": "“They’re one of the more exciting areas in hair regeneration research because they potentially influence multiple components of the follicular microenvironment at once, rather than only targeting a single pathway.”",
    "cn": "“它们是头发再生研究中更令人兴奋的领域之一，因为它们有可能同时影响毛囊微环境的多个组成部分，而不是只针对单一途径。",
    "src": "ELLE · 2026-09-09"
  },
  "eye": {
    "en": "Forget a basic white tee: In her eyes, you need a totally bedazzled floor-length one.",
    "cn": "忘记一件普通的白t恤吧：在她眼里，你需要一件完全令人眼花缭乱的及地t恤。",
    "src": "Vogue · 2026-09-10"
  },
  "draw": {
    "en": "Prophetic words from Gary Neville in the wake of Manchester United's 2-2 draw with Everton.",
    "cn": "加里·内维尔（Gary Neville）在曼联2-2战平埃弗顿之后的预言。",
    "src": "Sky Sports · 2026-09-09"
  },
  "drawing": {
    "en": "Current executive board member Caroline Issa has been appointed as deputy chair, a new post put in place to support and vouch for the UK’s designer community, drawing on her relationships across the sector.",
    "cn": "现任执行董事会成员卡洛琳·伊萨（Caroline Issa）被任命为副主席，这是一个新的职位，旨在利用她在整个行业的关系，为英国的设计师群体提供支持和担保。",
    "src": "Vogue · 2026-09-10"
  },
  "dream": {
    "en": "The Ouai Fine Hair Conditioner is a fine-haired girl’s dream.",
    "cn": "Ouai Fine护发素是美发女孩的梦想。",
    "src": "ELLE · 2026-09-10"
  },
  "dress": {
    "en": "But this season, Monique Lhuillier—who is adept at occasion dressing—was up to the challenge.",
    "cn": "但这一季，擅长场合着装的Monique lhuillier迎接了挑战。",
    "src": "Vogue · 2026-09-10"
  },
  "driver": {
    "en": "“My priority will be to champion fashion as an important driver of UK growth and help strengthen the environment in which British designers, entrepreneurs and businesses can start, scale and compete globally.",
    "cn": "“我的首要任务是将时尚作为英国增长的重要驱动力，并帮助加强英国设计师、企业家和企业可以在全球范围内创业、扩大规模和竞争的环境。",
    "src": "Vogue · 2026-09-10"
  },
  "drop": {
    "en": "Halfway through, they have dropped more points than they have gained.",
    "cn": "中途，他们的得分比他们获得的要多。",
    "src": "Sky Sports · 2026-09-09"
  },
  "drug": {
    "en": "Experts have also questioned whether they do anything to curb the flow of cocaine and other drugs to the United States -- the world's largest consumer.",
    "cn": "专家们还质疑他们是否采取了任何措施来遏制可卡因和其他毒品流入美国——世界上最大的消费国。",
    "src": "CBS News · 2026-09-10"
  },
  "duty": {
    "en": "But her latest beauty move has officially put her on nail-muse duty, too.",
    "cn": "但她最近的美容举动也让她正式承担起美甲缪斯的责任。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "during": {
    "en": "Not since 1982, when Democrats last held a midterm confab, has either party met this way during the off-year elections.",
    "cn": "自1982年民主党上一次举行中期会议以来，两党还没有在非年度选举中以这种方式举行过会议。",
    "src": "CBS News · 2026-09-09"
  },
  "dramatic": {
    "en": "Bojan Miovski's cute dink in stoppage time sealed a dramatic 1-0 victory for Rangers over St Mirren and extended their winning run to four games in the Scottish Premiership.",
    "cn": "博扬·米奥夫斯基（Bojan Miovski）在停赛时间的可爱表演使流浪者队以1比0击败圣米伦队，并将他们在苏格兰超级联赛中的胜利延长至四场比赛。",
    "src": "Sky Sports · 2026-09-09"
  },
  "due": {
    "en": "Due October 16 via A24 Music, the 10-track self-produced record follows Stel’s 2024 debut EP, Object Permanence, and this year’s How to Win At Solitaire.",
    "cn": "这张10首曲目的自制专辑将于10月16日通过A24 Music发行，继斯泰尔2024年的首张EP《Object Permanence》和今年的《How to Win At Solitaire》之后。",
    "src": "Vogue · 2026-09-10"
  },
  "dry": {
    "en": "“Their eggshells were very porous, which means if the eggs were left out in the open, they would lose water, dry out, and the embryos would die,” Zelenitsky explains to CNN.",
    "cn": "Zelenitsky向美国有线电视新闻网解释说：“它们的蛋壳非常多孔，这意味着如果卵子被放在外面，它们会失去水分，变干，胚胎就会死亡。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "district": {
    "en": "One of the first full registers Amandeep asked for was for Ambala, his family’s district.",
    "cn": "阿曼迪普要求的第一批完整的选民之一是他家所在的安巴拉区。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "doctor": {
    "en": "Known for soft-focus portraits of women and girls, like Coco Reading and A Girl With a Watering Can (1876), the artist left Paris for the warmer climate of southern France at the advice of doctors treating his rheumatoid arthritis.",
    "cn": "这位艺术家以柔和的女性和女孩肖像而闻名，如《读书的可可》和《拿水壶的女孩》（1876），他听从医生的建议，离开巴黎前往气候温暖的法国南部，治疗他的风湿性关节炎。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "document": {
    "en": "Flores’s freeform garments, which seem to document the flow state of her creativity, can feel as if they are in a state of becoming, a positive attribute.",
    "cn": "弗洛雷斯的自由造型服装似乎记录了她创造力的流动状态，让人感觉它们处于一种形成的状态，这是一种积极的属性。",
    "src": "Vogue · 2026-09-10"
  },
  "dog": {
    "en": "More than 100 dogs were evacuated from an animal shelter in Aksu.",
    "cn": "阿克苏一家动物收容所疏散了100多只狗。",
    "src": "ABC News · 2026-09-09"
  },
  "dozen": {
    "en": "While his fiancée was moved out of the country, Khork was among a few dozen specialists moved to a tactical operations center at the Port of Shuaiba.",
    "cn": "当他的未婚妻被转移到国外时，霍尔克是被转移到帅巴港战术行动中心的几十名专家之一。",
    "src": "CBS News · 2026-09-10"
  },
  "down": {
    "en": "“Wake up, wake up,” I called to my husband as I ran back down the hallway to our bedroom.",
    "cn": "“醒醒，醒醒，”我朝丈夫喊道，一边顺着走廊跑回我们的卧室。",
    "src": "Vogue · 2026-09-10"
  },
  "double": {
    "en": "With a Europa League tie and an Old Firm cup and league double coming up, Martin O'Neill made five changes as Kasper Hogh returned from injury and Sam Johnstone took over in goal.",
    "cn": "随着欧罗巴联赛平局和老公司杯和联赛双打的到来，马丁·奥尼尔（Martin O'Neill）做出了五项改变，卡斯珀·霍格（Kasper Hogh）因伤复出，萨姆·约翰斯通（Sam Johnstone）接",
    "src": "Sky Sports · 2026-09-09"
  },
  "dose": {
    "en": "Gucci revisits its equestrian roots with a new Horsebit fine jewelry and watch collection, giving the iconic house code a fresh update in diamonds and gold, while Louis Vuitton brings a bold dose of color to its signature Tambour Spin Time with five new additions to the permanent collection.",
    "cn": "古驰（Gucci）以全新的Horsebit高级珠宝和腕表系列重温其马术渊源，以钻石和黄金为标志性的品牌代码进行了全新的更新，而路易威登（Louis Vuitton）则为其标志性的Tambour Spin Time带来了大胆的色彩，为其永久系列增添了五款新产品。",
    "src": "ELLE · 2026-09-09"
  },
  "elect": {
    "en": "Rhode Island is a reliably Democratic state, and hasn't elected a Republican statewide since 2006, making Foulkes the favorite to win in November.",
    "cn": "罗德岛州是一个可靠的民主党州，自2006年以来，该州还没有选出过共和党人，这使得福克斯最有可能在11月获胜。",
    "src": "CBS News · 2026-09-10"
  },
  "election": {
    "en": "Not since 1982, when Democrats last held a midterm confab, has either party met this way during the off-year elections.",
    "cn": "自1982年民主党上一次举行中期会议以来，两党还没有在非年度选举中以这种方式举行过会议。",
    "src": "CBS News · 2026-09-09"
  },
  "elsewhere": {
    "en": "Elsewhere, a slim jacquard jacket, cut away with a tail at the back, and a blouse finished with a ruffled Victorian collar added a touch of Old World romanticism.",
    "cn": "在其他地方，一件修身的提花夹克，背面有一条尾巴，一件衬衫饰有折边的维多利亚时代领子，增添了一丝旧世界的浪漫主义。",
    "src": "ELLE · 2026-09-09"
  },
  "else": {
    "en": "What Ronaldo and Messi did -- and made everyone else realise -- is that you could take those same winger skills, the speed and technical brilliance, and turn it into something even better.",
    "cn": "C 罗和梅西所做的事情——也让所有人认识到——是同样的边锋技术、速度和天赋，可以演化成更可怕的东西。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "emergency": {
    "en": "ANKARA, Turkey -- A volunteer firefighter died on Wednesday in Turkey after helping local emergency services tackle a large wildfire in the Mediterranean coastal province of Antalya, an official said.",
    "cn": "土耳其安卡拉——一名官员表示，周三，土耳其一名志愿消防员在帮助当地紧急服务部门扑灭地中海沿岸省份安塔利亚的一场大火后死亡。",
    "src": "ABC News · 2026-09-09"
  },
  "either": {
    "en": "At Cult Gaia, the lovergirl energy didn’t end with the undone ponytails, either.",
    "cn": "在《盖娅崇拜》中，情人的能量并没有随着松开的马尾辫而结束。",
    "src": "ELLE · 2026-09-09"
  },
  "easy": {
    "en": "It’s so easy to blame this generation, but it is technology.",
    "cn": "我们很容易责怪这一代人，但这就是科技。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "eastern": {
    "en": "Since Mr. Trump returned to power, the U.S. has conducted airstrikes against vessels plying known trafficking routes in the Caribbean and eastern Pacific.",
    "cn": "自特朗普重新掌权以来，美国对在加勒比海和东太平洋航行的已知贩运路线的船只进行了空袭。",
    "src": "CBS News · 2026-09-10"
  },
  "east": {
    "en": "“I really only had one outfit, and it’s black and navy, which is supposedly against the rules,” she remembers, as we catch up at the end of summer in east London over coffee.",
    "cn": "夏末，我们在伦敦东部喝着咖啡聊天，她回忆道：“我真的只有一套衣服，是黑色和海军蓝的，这应该是违反规定的。",
    "src": "Vogue · 2026-09-10"
  },
  "easily": {
    "en": "Keep scrolling below for plenty of lavish and luxe-looking picks (for every budget) that you can easily integrate into your own wardrobe this season.",
    "cn": "继续往下看，你可以在这个季节轻松地将大量奢华和看起来奢华的选择（适用于各种预算）融入自己的衣橱。",
    "src": "Who What Wear · 2026-09-10"
  },
  "earthquake": {
    "en": "Argelia sat in front of the television and wept: Her father had been killed in the Mexico City earthquake in 1985 when she was a child, and watching the footage, she relived that experience.",
    "cn": "阿格利亚坐在电视机前哭泣：她的父亲在1985年墨西哥城地震中丧生，当时她还是个孩子，看着镜头，她重温了那次经历。",
    "src": "Vogue · 2026-09-10"
  },
  "early": {
    "en": "Florian Meimberg: A commercials director and early pioneer of AI-driven filmmaking.",
    "cn": "弗洛里安·梅姆伯格：广告导演，人工智能驱动电影制作的早期先驱。",
    "src": "Variety · 2026-09-10"
  },
  "earth": {
    "en": "According to the synopsis, \"Sanctuary\" is set on a post-apocalyptic Earth, where the discovery of a cryogenically suspended woman provokes fear in a desperate village, sending a young warrior and the mysterious woman on a quest for a lost city and answers that could restore humanity.",
    "cn": "根据剧情大纲，《庇护所》设定在一个后世界末日的地球上，一个被低温悬浮的女人的发现在一个绝望的村庄引发了恐惧，派遣一个年轻的战士和一个神秘的女人去寻找一个失落的城市，寻找可以恢复人类的答案。",
    "src": "Variety · 2026-09-10"
  },
  "economic": {
    "en": "An older study—with more alarming findings—won the Ig Nobel Economics Prize.",
    "cn": "一项具有更令人担忧的发现的较早研究获得了搞笑诺贝尔经济学奖。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "economy": {
    "en": "Her appointment chimes with the BFC’s ongoing mission to better influence policymakers and government, raise investment, and spotlight fashion’s role in the region’s economy and culture.",
    "cn": "她的任命与BFC的持续使命相一致，即更好地影响政策制定者和政府，增加投资，并突出时尚在该地区经济和文化中的作用。",
    "src": "Vogue · 2026-09-10"
  },
  "eighth": {
    "en": "However, they rank eighth in midfield and 10th in defence.",
    "cn": "然而，他们在中场排名第八，在防守方面排名第十。",
    "src": "Sky Sports · 2026-09-09"
  },
  "eight": {
    "en": "Twenty-eight years after the original cult classic debuted, Sandra Bullock and Nicole Kidman have reprised their roles as Sally Owens and Gillian Owens in Practical Magic 2.",
    "cn": "这部经典电影上映28年后，桑德拉·布洛克和妮可·基德曼在《实用魔法2》中再次饰演莎莉·欧文斯和吉莉安·欧文斯。",
    "src": "ELLE · 2026-09-09"
  },
  "egg": {
    "en": "Scientists also spotted squid egg clusters attached to the vessel.",
    "cn": "科学家们还发现了附着在船上的鱿鱼卵簇。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "effort": {
    "en": "An expected goals total of 4.05 showed they should have got far more for their efforts.",
    "cn": "预期目标总数为4.05 ，这表明他们的努力应该得到更多。",
    "src": "Sky Sports · 2026-09-09"
  },
  "educate": {
    "en": "She is passionate about challenging outdated beauty stereotypes, championing inclusive representation in beauty, and educating readers on the trends, products and conversations shaping the industry today.",
    "cn": "她热衷于挑战过时的美容刻板印象，倡导包容性的美容代表，并向读者介绍当今塑造行业的趋势、产品和对话。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "editor": {
    "en": "This collection reminded our editors of some of Ralph Lauren's most enduring shows of the past, including spring/summer 2003.",
    "cn": "这个系列让我们的编辑想起了拉夫·劳伦过去最经久不衰的几场秀，包括2003年春夏。",
    "src": "Who What Wear · 2026-09-10"
  },
  "edition": {
    "en": "“Conditioners for fine hair help by coating the strands without weighing them down, giving them a smoother texture, more shine, and a fuller appearance,” says Rogerio Cavalcante, a celebrity hairstylist and the founder of Brazil Edition.",
    "cn": "名人发型师、巴西版创始人Rogerio Cavalcante表示：“精细发型的护发素可以在不影响发丝重量的情况下对发丝进行涂层，使其质地更顺畅、更光泽、外观更饱满。",
    "src": "ELLE · 2026-09-10"
  },
  "edge": {
    "en": "He twists and turns on the edge of the box before his effort is palmed away.",
    "cn": "他扭动着盒子的边缘，然后他的努力就消失了。",
    "src": "Sky Sports · 2026-09-09"
  },
  "link": {
    "en": "A harrowing curation of artifacts linked to the world’s most notorious serial killers—including the “Killer Clown” John Wayne Gacy and H.H.",
    "cn": "一系列与世界上最臭名昭著的连环杀手有关的文物，包括“杀手小丑”约翰·韦恩·盖西（John Wayne Gacy）和H.H.",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "fact": {
    "en": "Sara Hashemi is a science writer and fact-checker currently based in New York City.",
    "cn": "Sara Hashemi是一位科学作家和事实核查员，目前居住在纽约市。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "french": {
    "en": "The 26-year-old, French-born, Senegalese international is one of the best dribblers in the Premier League, if not the world.",
    "cn": "这位 26 岁、法籍塞内加尔国脚，是英超乃至全世界最顶尖的突破手之一。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "frequently": {
    "en": "I turned on the radio, NPR: the local station frequently played music, cheaper than airing national shows, but they carried the 9 a.m. five-minute national news.",
    "cn": "我打开了美国国家公共电台（NPR）的广播：地方电台经常播放音乐，比播放全国性节目便宜，但他们播放早上9点的5分钟全国性新闻。",
    "src": "Vogue · 2026-09-10"
  },
  "fresh": {
    "en": "Now the maison is bringing a fresh burst of color to the collection with five new Vintage Alhambra and Magic Alhambra designs crafted in translucent pink enamel.",
    "cn": "现在，该品牌为该系列带来了全新的色彩，推出了五款全新的复古阿尔罕布拉和魔法阿尔罕布拉设计，采用半透明的粉红色珐琅制作。",
    "src": "ELLE · 2026-09-09"
  },
  "friday": {
    "en": "And in the weekend in between, Sky Sports will be showing Leeds vs Everton on Friday Night Football on New Year's Day, then Bournemouth vs Aston Villa on January 3 for Saturday Night Football at 5.30pm.",
    "cn": "在这期间的周末，天空体育将在新年当天播放利兹对埃弗顿的周五晚间足球比赛，然后在1月3日下午5:30播放伯恩茅斯对阿斯顿维拉的周六晚间足球比赛。",
    "src": "Sky Sports · 2026-09-10"
  },
  "from": {
    "en": "Some of Gacy’s paintings featured in the exhibition, on show for the first time, come from people who knew him personally.",
    "cn": "展览中首次展出的盖西的一些画作来自认识他的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "fund": {
    "en": "She joins the BFC — a non-profit organization funded via government support, patronage, and member fees — during a transition spearheaded by CEO Laura Weir.",
    "cn": "她在首席执行官劳拉·威尔的领导下过渡期间加入了BFC——一个由政府支持、赞助和会员费资助的非营利组织。",
    "src": "Vogue · 2026-09-10"
  },
  "function": {
    "en": "Since her appointment, DFW has moved to align itself more closely with international buying cycles, Taher says: Ramadan 2027 falls in early February, roughly 10 days earlier than in 2026, and a September show would have sat too far ahead of that window to function as a real buying moment.",
    "cn": "塔希尔说，自从她上任以来，DFW已经开始与国际购买周期更紧密地保持一致：2027年的斋月在2月初，比2026年提前了大约10天，而9月份的时装秀可能会比那个窗口提前得太远，无法成为真正的购买时刻。",
    "src": "Vogue · 2026-09-10"
  },
  "fun": {
    "en": "“It’s about ways of dressing that celebrate ingenuity, originality, and character—the freedom and fun of creating a style that is truly personal,” Lauren continued.",
    "cn": "Lauren继续说道：「这是关于庆祝独创性、独创性和个性的着装方式--创造真正个性化风格的自由和乐趣。",
    "src": "ELLE · 2026-09-09"
  },
  "full": {
    "en": "'Spritz and tumble' laundering rumples full-skirted dresses.",
    "cn": "“喷淋和翻滚”洗涤会弄皱长裙。",
    "src": "Who What Wear · 2026-09-10"
  },
  "freedom": {
    "en": "Summer is more than a season, it is also a state of mind equated with freedom, light, openness, and adventure—all qualities that animate this designer’s off-beat work.",
    "cn": "夏天不仅仅是一个季节，它也是一种精神状态，等同于自由、光明、开放和冒险——所有这些品质都为这位设计师的另类作品注入了活力。",
    "src": "Vogue · 2026-09-10"
  },
  "front": {
    "en": "Take a dress with a shiny, even gaudy, metallic pink stretch front and cotton back in shades of magenta (there was a lot of back action for spring).",
    "cn": "比如一件有光泽的、甚至是俗艳的金属粉色弹性前襟和深浅品红的棉质后腰的连衣裙（春季有很多后腰的动作）。",
    "src": "Vogue · 2026-09-10"
  },
  "free": {
    "en": "Children under 16 go free if accompanied by paying adults.",
    "cn": "16岁以下的儿童在付费成人陪同下免费。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "france": {
    "en": "Renoir, born in France in 1841, was one of Impressionism’s founding artists.",
    "cn": "雷诺阿1841年出生于法国，是印象派的奠基人之一。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "foremost": {
    "en": "“But first and foremost, it should leave the hair feeling better conditioned and more manageable—otherwise, what’s the point of leaving it in?”",
    "cn": "“但最重要的是，它应该让头发感觉更好，更容易打理——否则，留着头发有什么意义呢？",
    "src": "ELLE · 2026-09-09"
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
  "formal": {
    "en": "A formal-feeling design, in something as comfortable as a T-shirt.",
    "cn": "一种正式感的设计，像t恤一样舒适。",
    "src": "Vogue · 2026-09-10"
  },
  "formation": {
    "en": "The 255 egg fragments at the center of the discovery were uncovered in 2020 and 2024 in the Chorrillo Formation, a rock formation on the southern tip of Argentina.",
    "cn": "发现中心的255个鸡蛋碎片于2020年和2024年在阿根廷南端的一个岩层Chorrillo地层中被发现。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "former": {
    "en": "The former CVS pharmacy executive has campaigned on housing and affordability, some of the most resonant issues in the midterm elections.",
    "cn": "这位前CVS制药公司高管的竞选主题是住房和可负担性，这是中期选举中最容易引起共鸣的一些问题。",
    "src": "CBS News · 2026-09-10"
  },
  "fortunately": {
    "en": "Fortunately, thousands of products—including conditioners—can make fine hair look fuller after just one wash and grow in thicker from the root.",
    "cn": "幸运的是，成千上万的产品（包括护发素）只需洗一次即可使细发看起来更饱满，并从根部生长得更厚。",
    "src": "ELLE · 2026-09-10"
  },
  "frame": {
    "en": "The other is even more fanciful and framed with tousled waves.",
    "cn": "另一幅则更加奇特，画着乱蓬蓬的波浪。",
    "src": "ELLE · 2026-09-09"
  },
  "fragment": {
    "en": "In the burial mound’s deeper layers, researchers found a nearly complete adult male skeleton, fragments of two separate adult skulls, amber beads that might have been jewelry, a cutting tool made of flint and an ax of greenish serpentinite.",
    "cn": "在坟丘的深层，研究人员发现了一个几乎完整的成年男性骨骼，两个独立的成年头骨的碎片，可能是珠宝的琥珀珠，一个由燧石制成的切割工具和一把绿色蛇纹石斧头。",
    "src": "Smithsonian Magazine · 2026-09-09"
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
  "frank": {
    "en": "A triple header on Sky Sports then follows on Super Sunday on December 27, with Frank Lampard taking on Chelsea as Coventry boss at 2pm.",
    "cn": "天空体育将在12月27日的超级星期日上演三场头球，兰帕德将在下午2点作为考文垂主帅迎战切尔西。",
    "src": "Sky Sports · 2026-09-10"
  },
  "foundation": {
    "en": "“A good leave-in creates a better foundation for whatever you’re doing next, whether you’re air-drying, wearing your natural texture, blowing the hair out, or going into additional styling products,” says Rowe.",
    "cn": "罗说：“一个好的留发膏可以为你接下来做的任何事情打下更好的基础，无论是风干、保持自然发质、吹散头发，还是使用其他造型产品。",
    "src": "ELLE · 2026-09-09"
  },
  "found": {
    "en": "When Lhuillier found a balance of simple-yet-striking, it worked much more effectively.",
    "cn": "当Lhuillier找到了简单与引人注目之间的平衡时，它的工作效率就高得多。",
    "src": "Vogue · 2026-09-10"
  },
  "forward": {
    "en": "Over the summer, Mr. Trump asked FIFA to review its one-match suspension of star U.S. forward Folarin Balogun during the World Cup.",
    "cn": "今年夏天，特朗普要求国际足联审查其在世界杯期间对美国前锋Folarin Balogun的一场比赛停赛。",
    "src": "CBS News · 2026-09-10"
  },
  "four": {
    "en": "The summer signing has four assists to his name already, with three of those coming for Odegaard goals, including the winner in Naples.",
    "cn": "夏季签约已经有四次助攻，其中三次是Odegaard进球，包括那不勒斯的冠军。",
    "src": "Sky Sports · 2026-09-09"
  },
  "german": {
    "en": "Shamila Lengsfeld: A German-Iranian director, AI filmmaker and creative technologist.",
    "cn": "莎米拉·朗斯菲尔德：德裔伊朗导演、人工智能电影制作人和创意技术专家。",
    "src": "Variety · 2026-09-10"
  },
  "germany": {
    "en": "Higuchi-Zitzmann, the company's CEO and founder, is one of Germany's most internationally experienced media executives and producers.",
    "cn": "公司首席执行官兼创始人Higuchi-Zitzmann是德国最具国际经验的媒体高管和制作人之一。",
    "src": "Variety · 2026-09-10"
  },
  "get": {
    "en": "His reflections on the World Cup seem like as good a place to get going.",
    "cn": "他对世界杯的思考似乎是一个很好的去处。",
    "src": "Sky Sports · 2026-09-09"
  },
  "giant": {
    "en": "I look at the sort of best back three probably that I ever saw which was the Juventus and Italy back three with Andrea Barzagli, Leonardo Bonucci and Giorgio Chiellini -- three real giants.",
    "cn": "我想到我见过的最佳三中卫组合——尤文图斯和意大利队的巴尔扎利、博努奇和基耶利尼——三个真正的高塔。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "gift": {
    "en": "The funky jewelry may have been a collection of hunting trophies or a gift.",
    "cn": "时髦的珠宝可能是一系列狩猎奖杯或礼物。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "girl": {
    "en": "The Ouai Fine Hair Conditioner is a fine-haired girl’s dream.",
    "cn": "Ouai Fine护发素是美发女孩的梦想。",
    "src": "ELLE · 2026-09-10"
  },
  "give": {
    "en": "Van Cleef & Arpels is giving its iconic Alhambra motif a vibrant new look.",
    "cn": "梵克雅宝（Van Cleef & Arpels）赋予其标志性的阿尔罕布拉（Alhambra）主题一个充满活力的新面貌。",
    "src": "ELLE · 2026-09-09"
  },
  "glad": {
    "en": "\"I'm glad that we have leaders in this region that are serious about going after these groups, because if we didn't, we would have failed country after failed country.\"",
    "cn": "“我很高兴我们这个地区的领导人认真对待这些组织，因为如果我们不这样做，我们就会让一个又一个失败的国家失败。",
    "src": "CBS News · 2026-09-10"
  },
  "gold": {
    "en": "According to celebrity manicurist Stephanie Stone, understated metallic shades (think soft pewter, rose gold, brown chrome, etc.) will dominate the fall 2026 season.",
    "cn": "据知名美甲师斯蒂芬妮·斯通称，低调的金属色调（比如柔和的锡白色、玫瑰金、棕铬色等）将主导2026年秋季。",
    "src": "Who What Wear · 2026-09-10"
  },
  "goal": {
    "en": "Bournemouth transfers, latest news, rumours and gossip: Live updates, goals and highlights",
    "cn": "伯恩茅斯转会，最新消息，谣言和八卦：实时更新，进球和亮点",
    "src": "Sky Sports · 2026-09-10"
  },
  "genuine": {
    "en": "In 2025, she was named The Rising Media Star at the Love Perfume Awards with The Perfume Shop, recognised for her outstanding digital fragrance content and for building genuine authority within the space.",
    "cn": "2025年，她与The Perfume Shop一起被评为“爱香水奖”（Love Perfume Awards）的冉冉升起的媒体之星，因其出色的数字香水内容和在该领域建立真正的权威而得到认可。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "glory": {
    "en": "David Musgrove and Michael Lewis reveal the 10 things you simply must do when experiencing the world’s most famous embroidery in all its glory",
    "cn": "大卫·马斯格罗夫和迈克尔·刘易斯揭示了在体验世界上最著名的刺绣的荣耀时，你必须做的10件事",
    "src": "HistoryExtra · 2026-09-10"
  },
  "glitter": {
    "en": "It was a glittering start to New York Fashion Week, with plenty of stars stepping out for Bulgari’s Serpenti Infiniti after-party.",
    "cn": "纽约时装周有了一个闪亮的开端，许多明星都出席了宝格丽（Bulgari）的Serpenti Infiniti晚会。",
    "src": "Vogue · 2026-09-10"
  },
  "game": {
    "en": "Arsenal conceded just 27 goals in 38 league games on their way to the title last season.",
    "cn": "阿森纳上赛季以 38 场仅丢 27 球的防守赢得了联赛冠军。",
    "src": "ESPN · Mark Ogden & James Olley · 2026-09-06"
  },
  "gallery": {
    "en": "The Bayeux Tapestry exhibition opened at the Sainsbury Exhibitions Gallery at the British Museum on 10 September 2026 and will run until 11 July 2027.",
    "cn": "贝叶挂毯展览于2026年9月10日在大英博物馆的塞恩斯伯里展览馆开幕，将持续到2027年7月11日。",
    "src": "HistoryExtra · 2026-09-10"
  },
  "future": {
    "en": "At Dreamkite, we believe that the future of cinematic storytelling has only just begun.\"",
    "cn": "在Dreamkite，我们相信电影叙事的未来才刚刚开始。",
    "src": "Variety · 2026-09-10"
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
  "genius": {
    "en": "Update to the latest version to see all Vogue content, as well as new features like our Runway Genius quiz, Group Chats, and posts from Vogue contributors.",
    "cn": "更新到最新版本可以看到《Vogue》的所有内容，以及我们的Runway Genius测试、群聊和《Vogue》撰稿人的帖子等新功能。",
    "src": "Vogue · 2026-09-10"
  },
  "generation": {
    "en": "Dreamkite Studios brings together exceptional creative talent, premium IP and cutting-edge technology to build a new generation of European entertainment.",
    "cn": "Dreamkite Studios汇集了杰出的创意人才，优质IP和尖端技术，以建立新一代的欧洲娱乐。",
    "src": "Variety · 2026-09-10"
  },
  "general": {
    "en": "\"The general kept asking Cody to call an 'all clear,'\" his father told CBS News.",
    "cn": "他的父亲告诉哥伦比亚广播公司新闻：“将军一直让科迪报‘安全警报’。",
    "src": "CBS News · 2026-09-10"
  },
  "gather": {
    "en": "Oh, and because I'm genuinely obsessed with gathering as many fashion-forward, non-basic nail ideas as possible, I asked two celebrity manicurists to weigh in on their predictions.",
    "cn": "哦，因为我真的很着迷于收集尽可能多的时尚前卫、非基本的美甲点子，所以我请了两位名人美甲师来发表他们的预测。",
    "src": "Who What Wear · 2026-09-10"
  },
  "gaze": {
    "en": "“With both its director Theja Rio and producer Nancy Beso hailing from Nagaland, the film eschews the ‘outsider gaze’ and the pitfalls of Orientalist exoticisation, authentically anchoring its narrative in an Indigenous cultural lens shaped by lived experience.",
    "cn": "导演Theja b里约热内卢和制片人Nancy Beso都来自那加兰邦，这部电影避开了“局外人的目光”和东方主义异国情调的陷阱，真实地将其叙事固定在由生活经历塑造的土著文化镜头中。",
    "src": "Variety · 2026-09-10"
  },
  "father": {
    "en": "Amandeep’s mother was tearful at seeing the names written down, but also knowing her husband, Amandeep’s father, was no longer alive to see it.",
    "cn": "阿曼迪普的母亲看到写在上面的名字时泪流满面，但也知道她的丈夫，阿曼迪普的父亲，已经不在人世了。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "feast": {
    "en": "They are shown pillaging, feasting and fortifying their position.",
    "cn": "他们掠夺，盛宴和巩固他们的地位。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "federal": {
    "en": "She continued: \"Looking forwards, the State is genuinely unsure whether it can switch its governing congressional map in time to run a timely federal election.\"",
    "cn": "她继续说道：“展望未来，该州真的不确定是否能及时改变其执政的国会地图，以便及时举行联邦选举。",
    "src": "CBS News · 2026-09-10"
  },
  "fee": {
    "en": "But then Madueke's fee ranks 10th and Outtara's 17th.",
    "cn": "但马杜埃凯的转会费只能排在第 10，奥塔拉甚至只排第 17。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "few": {
    "en": "Balogun has been in the headlines again over the past few weeks after his proposed move from Monaco to Everton collapsed late on Deadline Day.",
    "cn": "Balogun在截止日期当天晚些时候从摩纳哥搬到埃弗顿的提议崩溃后，过去几周再次成为头条新闻。",
    "src": "Sky Sports · 2026-09-09"
  },
  "fetch": {
    "en": "“This year’s award winners took seemingly far-fetched ideas and turned them into legitimate research projects,” Carly Anne York, an animal behaviorist and physiologist at Lenoir-Rhyne University, tells CNN ’s Jack Guy.",
    "cn": "Lenoir-Rhyne大学的动物行为学家和生理学家卡莉·安妮·约克（Carly Anne York）告诉美国有线电视新闻网（CNN）的杰克·盖伊（Jack Guy）：“今年的获奖者把看似牵强附会的想法变成了合法的研究项目。",
    "src": "Smithsonian Magazine · 2026-09-08"
  },
  "festival": {
    "en": "Gyllenhaal’s directorial debut, The Lost Daughter, won Best Screenplay at the festival in 2021.",
    "cn": "吉伦哈尔的导演处女作《迷失的女儿》在2021年的电影节上获得了最佳剧本奖。",
    "src": "ELLE · 2026-09-09"
  },
  "fellow": {
    "en": "Greengrass follows the Ploughman and his fellow insurgents as they make their way to London for a climactic face-to-face meeting with the young monarch.",
    "cn": "Greengrass跟随Ploughman和他的叛乱分子同伴前往伦敦，与年轻的君主面对面会面。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "feeling": {
    "en": "“But first and foremost, it should leave the hair feeling better conditioned and more manageable—otherwise, what’s the point of leaving it in?”",
    "cn": "“但最重要的是，它应该让头发感觉更好，更容易打理——否则，留着头发有什么意义呢？",
    "src": "ELLE · 2026-09-09"
  },
  "feel": {
    "en": "I can't help but feel cooler with a rich coat of espresso, navy, or olive on my nails.",
    "cn": "在指甲上涂上浓咖啡、海军蓝或橄榄色，我忍不住觉得更凉爽。",
    "src": "Who What Wear · 2026-09-10"
  },
  "feed": {
    "en": "Lia covers everything from emerging trend analysis to viral celebrity hair and makeup moments, making her an expert at spotting the season’s next big beauty look (before it takes over social media feeds).",
    "cn": "Lia涵盖了从新兴趋势分析到走红的明星发型和化妆瞬间的所有内容，使她成为发现本季下一个大美女造型的专家（在它占领社交媒体之前）。",
    "src": "Cosmopolitan · 2026-09-09"
  },
  "fast": {
    "en": "Martin Odegaard scored his fourth goal in five games this season with the winner in Arsenal's 1-0 Champions League victory at Napoli on Wednesday; Gunners captain only scored once in 2025/26 but higher position and fitness have facilitated fast start to the new campaign",
    "cn": "马丁·厄德高（Martin Odegaard）本赛季五场比赛中的第四个进球，赢得了阿森纳周三在那不勒斯1-0冠军联赛的胜利；枪手队长在2025/26赛季只进了一球，但更高的位置和体能有助于快速开始新赛季",
    "src": "Sky Sports · 2026-09-09"
  },
  "fade": {
    "en": "Ralph Lauren thinks your 2027 jeans should be ripped, faded, baggy, and low-slung.",
    "cn": "拉夫·劳伦认为2027年的牛仔裤应该是破洞的、褪色的、宽松的、低腰的。",
    "src": "Who What Wear · 2026-09-10"
  },
  "fail": {
    "en": "An ombr&eacute; moment never fails to turn heads.",
    "cn": "一个热闹的时刻总能吸引人们的目光。",
    "src": "Who What Wear · 2026-09-10"
  },
  "fair": {
    "en": "The exhibition dedicates displays to other local killers, including Holmes, who, as one of America’s first serial killers, used his “ Murder Castle ” hotel to claim victims’ lives during the 1893 Chicago World’s Fair.",
    "cn": "该展览致力于展示其他当地杀手，包括福尔摩斯，他作为美国最早的连环杀手之一，在1893年芝加哥世界博览会期间使用他的“谋杀城堡”酒店夺走了受害者的生命。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "fall": {
    "en": "Each of these retailers offers modern and relevant fall pieces that stylish people (ahem, you) will want to wear.",
    "cn": "这些零售商都提供时尚人士（嗯哼，你）想要穿的时髦和相关的秋季单品。",
    "src": "Who What Wear · 2026-09-10"
  },
  "fashionable": {
    "en": "The best part: it even comes with a matching skirt to make your full look as waterproof as possible (and fashionable), but it will pair well with jeans and slacks or whatever else you might already have in your closet.",
    "cn": "最棒的是：它甚至可以搭配一条裙子，让你看起来尽可能防水（和时尚），但它也可以和牛仔裤、休闲裤或任何你衣橱里已经有的东西搭配。",
    "src": "Vogue · 2026-09-10"
  },
  "fashion": {
    "en": "It would be a wearable workout—the fashion equivalent of doing a weighted shoulder press.",
    "cn": "这将是一种可穿戴的锻炼——相当于做负重肩推的时尚运动。",
    "src": "Vogue · 2026-09-10"
  },
  "fan": {
    "en": "The trade drew consternation from many Dallas fans who were critical of the team's decision to trade away the now-27-year-old face of the franchise.",
    "cn": "这笔交易引起了许多达拉斯球迷的惊愕，他们批评球队决定放弃现年27岁的特许经营权。",
    "src": "CBS News · 2026-09-10"
  },
  "famous": {
    "en": "David Musgrove and Michael Lewis reveal the 10 things you simply must do when experiencing the world’s most famous embroidery in all its glory",
    "cn": "大卫·马斯格罗夫和迈克尔·刘易斯揭示了在体验世界上最著名的刺绣的荣耀时，你必须做的10件事",
    "src": "HistoryExtra · 2026-09-10"
  },
  "family": {
    "en": "Anecdotally, he knew a record had been kept of every man that served in the First World War from Punjab, where his family were from.",
    "cn": "有趣的是，他知道有一份记录保存着每一个在第一次世界大战中服役的人都来自旁遮普，他的家人来自那里。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "far": {
    "en": "That is demonstrated by Odegaard's touches in the opposition box going up from 2.5 per 90 minutes last season to 4.3 per 90 minutes so far this term.",
    "cn": "Odegaard在反对派禁区中的触动从上赛季的每90分钟2.5次上升到本赛季到目前为止的每90分钟4.3次，就证明了这一点。",
    "src": "Sky Sports · 2026-09-09"
  },
  "fiction": {
    "en": "Producer Đorđe Stanković, of Belgrade-based Void Pictures, said that the filmmakers \"set out to make an ambitious science-fiction film from Serbia that could speak to an international audience without losing its own identity.\"",
    "cn": "总部位于贝尔格莱德的Void Pictures制片人Đorđe Stanković表示，电影制片人“着手制作一部来自塞尔维亚的雄心勃勃的科幻电影，可以在不失去自己身份的情况下与国际观众交谈。",
    "src": "Variety · 2026-09-10"
  },
  "field": {
    "en": "The upshot of course is that King Harold is slain, with the defeated Englishmen being shown fleeing the field in the last scene of the tapestry.",
    "cn": "当然，结局是哈罗德国王被杀，战败的英国人在挂毯的最后一幕逃离战场。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "flight": {
    "en": "England's top-flight have announced the festive fixtures more than three months in advance as it \"gives supporters notice to plan and make travel arrangements for a particularly busy time of the year\".",
    "cn": "英格兰顶级联赛提前三个多月宣布了节日赛程，因为这“给了球迷一个通知，让他们在一年中特别繁忙的时候计划和安排旅行”。",
    "src": "Sky Sports · 2026-09-10"
  },
  "float": {
    "en": "They found that sponges, sea squirts, mussels, oysters and algae covered most of the vessel’s surface, while amberjacks, sea bass, wrasse, scorpionfish, goby and other species of fish floated in and around the ship.",
    "cn": "他们发现，海绵、海鞘、贻贝、牡蛎和藻类覆盖了船舶的大部分表面，而琥珀杰克鱼、海鲈、皱纹鱼、蝎子鱼、高比鱼和其他鱼类则漂浮在船内和周围。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "floor": {
    "en": "“The Floor” has now sold in more than 30 territories worldwide for Talpa Studios, the independent production company founded by John de Mol.",
    "cn": "由约翰·德·摩尔（John de Mol）创立的独立制片公司Talpa Studios出品的《地板》目前已在全球30多个地区销售。",
    "src": "Variety · 2026-09-10"
  },
  "fluid": {
    "en": "The silhouettes were familiar—fluid dresses, velvet robes, and shimmering separates—but new techniques gave them a looseness and texture that felt of the moment.",
    "cn": "轮廓是熟悉的-流畅的连衣裙，天鹅绒长袍和闪闪发光的分离物-但新技术给了他们一种松散和质地的感觉。",
    "src": "ELLE · 2026-09-09"
  },
  "fly": {
    "en": "As Belghiran says: “You’ll feel so good that you’re almost about to fly.”",
    "cn": "正如Belghiran所说：“你会感觉很好，就像要飞起来一样。",
    "src": "ELLE · 2026-09-09"
  },
  "football": {
    "en": "Chelsea, who finished 10th last season, have no European football to contend with in this campaign and had won both games before Sunday's London derby.",
    "cn": "切尔西上赛季仅获第 10，本赛季没有欧战任务，在周日这场伦敦德比之前两场比赛全胜。",
    "src": "ESPN · Mark White · 2026-09-07"
  },
  "foot": {
    "en": "Spanning a massive, 21,000-square-foot space, “ Serial Killer: The Exhibition ” brings together more than 2,000 items that confront myth with true crime’s gruesome reality.",
    "cn": "“连环杀手：展览”占地21,000平方英尺，汇集了2,000多件物品，将神话与真实犯罪的可怕现实相结合。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "food": {
    "en": "“If these eggshells belong to colossosaurians, the hatchlings had to have had plenty of nutritious food resources in that environment to start packing on the tonnes to eventually reach their colossal body sizes,” Zelenitsky tells CNN.",
    "cn": "Zelenitsky告诉美国有线电视新闻网（CNN）：“如果这些蛋壳属于巨龙，那么幼崽必须在那种环境中拥有大量营养丰富的食物资源，才能开始积累大量食物，最终达到巨大的体型。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "following": {
    "en": "Despite the uncertainty around them, peptides have garnered a cult following.",
    "cn": "尽管存在不确定性，但多肽已经赢得了狂热的追随者。",
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
  "flat": {
    "en": "If you have fine hair, you know the struggle: One wrong conditioner and your strands fall flat before you even leave the house.",
    "cn": "如果你的头发很细，你就知道如何挣扎：一个错误的护发素和你的绳子在你离开房子之前就掉平了。",
    "src": "ELLE · 2026-09-10"
  },
  "find": {
    "en": "Her main hurdle is finding ways to work with found materials.",
    "cn": "她的主要障碍是找到使用现有材料的方法。",
    "src": "Vogue · 2026-09-10"
  },
  "financial": {
    "en": "In her new role, Cooper will advocate for fashion as a financial and cultural asset to the UK, as well as its strong global reach, working with the BFC’s board, executive leaders, and the industry at large to foster a stronger ecosystem for homegrown talent, enterprise and business, encouraging international expansion.",
    "cn": "在她的新角色中，库珀将倡导时尚作为英国的金融和文化资产，以及其强大的全球影响力，与BFC董事会，执行领导人和整个行业合作，为本土人才，企业和商业建立更强大的生态系统，鼓励国际扩张。",
    "src": "Vogue · 2026-09-10"
  },
  "finance": {
    "en": "The company describes its process as a chain that starts with creating IP and moves through development, packaging, financing and production before reaching distribution and exploitation across multiple formats, with no fixed medium preferred.",
    "cn": "该公司将其流程描述为一个链条，从创建IP开始，经过开发、包装、融资和制作，最后到达多种形式的分销和开发，没有固定的媒介。",
    "src": "Variety · 2026-09-10"
  },
  "final": {
    "en": "The ending is abrupt and many people have pondered on whether the tapestry was not actually finished, or has lost its final frames at some point over the centuries.",
    "cn": "结局很突然，许多人都在想，这幅挂毯到底是没有完成，还是几个世纪以来的某个时候失去了最后的画框。",
    "src": "HistoryExtra · 2026-09-09"
  },
  "finding": {
    "en": "Her main hurdle is finding ways to work with found materials.",
    "cn": "她的主要障碍是找到使用现有材料的方法。",
    "src": "Vogue · 2026-09-10"
  },
  "film": {
    "en": "The film is produced by Nancy Nisa Beso through her shingle Winter Hymns Films and Rio through his Undercover Squirrel outfit.",
    "cn": "这部电影由南希·尼萨·贝索（Nancy Nisa Beso）通过她的新公司Winter hyms Films制作，并通过他的卧底松鼠服装制作b里约热内卢。",
    "src": "Variety · 2026-09-10"
  },
  "figure": {
    "en": "According to Pentagon figures, the operations have killed more than 200 people.",
    "cn": "根据五角大楼的数据，这些行动已经造成200多人死亡。",
    "src": "CBS News · 2026-09-10"
  },
  "fight": {
    "en": "\"We are fighting for the whole creative industry in Serbia.",
    "cn": "“我们正在为塞尔维亚的整个创意产业而战。",
    "src": "Variety · 2026-09-10"
  },
  "fifth": {
    "en": "Former Manchester City playmaker Kevin De Bruyne appeared well placed to equalise when put through for a rare Napoli chance in the final few minutes, but wasted the chance by opting to cross, ensuring Arsenal could celebrate a victorious start to their European campaign and a fifth straight win of the season in all competitions.",
    "cn": "前曼城组织者凯文·德布鲁因（Kevin De Bruyne）在最后几分钟获得罕见的那不勒斯机会时，似乎处于很好的平衡位置，但由于选择交叉而浪费了这个机会，确保阿森纳能够庆祝他们的欧洲战役的胜利开局以及本赛季在所有比赛中的连续第五场胜利。",
    "src": "Sky Sports · 2026-09-09"
  },
  "fill": {
    "en": "As they battled for titles each year under Jurgen Klopp and Pep Guardiola, Liverpool and Manchester City's rosters were filled with wide players who created lots of goals and won lots of games.",
    "cn": "在克洛普和瓜迪奥拉的带领下，利物浦和曼城年年争冠，他们的阵容里都是能创造大量进球、能赢下比赛的边路球员。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "force": {
    "en": "Woody possesses the rare combination of vulnerability, intelligence and strength that Younger demands, while Malachi, Conrad, Kola and Tuppence bring extraordinary weight and complexity to the forces shaping his life.",
    "cn": "伍迪拥有杨格所要求的脆弱、智慧和力量的罕见结合，而玛拉基、康拉德、科拉和塔彭丝则给塑造他生活的力量带来了非凡的重量和复杂性。",
    "src": "Variety · 2026-09-10"
  },
  "fine": {
    "en": "Customer review: “The best conditioner for fine hair that I have found.",
    "cn": "客户评价：“我找到的最好的细发护发素。",
    "src": "ELLE · 2026-09-10"
  },
  "fix": {
    "en": "The company describes its process as a chain that starts with creating IP and moves through development, packaging, financing and production before reaching distribution and exploitation across multiple formats, with no fixed medium preferred.",
    "cn": "该公司将其流程描述为一个链条，从创建IP开始，经过开发、包装、融资和制作，最后到达多种形式的分销和开发，没有固定的媒介。",
    "src": "Variety · 2026-09-10"
  },
  "five": {
    "en": "And among those, just five hit the 0.5 benchmark in the season before they moved: Barcola, Outtara, Madueke, Mbaye, and Johnson.",
    "cn": "其中只有 5 人达到了 0.5 的门槛——他们是巴尔科拉、奥塔拉、马杜埃凯、姆巴耶和约翰逊。",
    "src": "ESPN · Ryan O'Hanlon · 2026-09-08"
  },
  "first": {
    "en": "Some of Gacy’s paintings featured in the exhibition, on show for the first time, come from people who knew him personally.",
    "cn": "展览中首次展出的盖西的一些画作来自认识他的人。",
    "src": "Smithsonian Magazine · 2026-09-09"
  },
  "firm": {
    "en": "With a Europa League tie and an Old Firm cup and league double coming up, Martin O'Neill made five changes as Kasper Hogh returned from injury and Sam Johnstone took over in goal.",
    "cn": "随着欧罗巴联赛平局和老公司杯和联赛双打的到来，马丁·奥尼尔（Martin O'Neill）做出了五项改变，卡斯珀·霍格（Kasper Hogh）因伤复出，萨姆·约翰斯通（Sam Johnstone）接",
    "src": "Sky Sports · 2026-09-09"
  },
  "fire": {
    "en": "Odegaard's goal, fired in following a quick one-two with substitute Christos Tzolis, finally broke the deadlock but Noni Madueke, another substitute, missed a one-on-one chance with Tzolis's follow-up blocked on the line, leaving Arsenal to suffer a late scare.",
    "cn": "厄德高的目标是与替补球员克里斯托斯·佐利斯（Christos Tzolis）进行快速一对二的比赛，最终打破了僵局，但另一名替补球员诺尼·马杜埃克（Noni Madueke）错过了一对一的机会，佐利斯的后续行动被挡在了线上，使阿森纳遭受了晚些时候的恐慌。",
    "src": "Sky Sports · 2026-09-09"
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
