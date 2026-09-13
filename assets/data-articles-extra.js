/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 11 篇，英文正文来自公开 RSS 的真实报道原文，未做改写；
 * 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：Farnam Street / Psyche / FourFourTwo / TechCrunch AI / Vanity Fair / Rolling Stone / Harper's Bazaar / AI News
 */

const ARTICLES_EXTRA = [
  {
    "id": "gr-roblox-ceo-how-to-make-better-decisions-by-fix",
    "cat": "成长",
    "title": "Roblox CEO: How to Make Better Decisions by Fixing Yourself First",
    "titleZh": "Roblox 首席执行官：如何通过先完善自己来做出更好的决策",
    "source": "Farnam Street · 2026-08-13",
    "date": "2026-08-13",
    "minutes": 3,
    "url": "https://fs.blog/knowledge-project-podcast/david-baszucki/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/gr-roblox-ceo-how-to-make-better-decisions-by-fix.jpg",
    "scoreVersion": "v2",
    "qualityScore": 100,
    "qualityBand": "formal",
    "difficultyBaseScore": 64.43,
    "serverScore": 80.67,
    "paras": [
      {
        "sentences": [
          {
            "en": "David Baszucki is the co-founder and CEO of Roblox, a platform built around a simple idea: give people the tools and incentives to create together.",
            "cn": "大卫·巴祖基是Roblox的联合创始人兼首席执行官，该平台基于一个简单的理念：为用户提供工具和激励，让他们能够共同进行创作。"
          }
        ]
      },
      {
        "img": "assets/covers/gr-roblox-ceo-how-to-make-better-decisions-by-fix-1.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-roblox-ceo-how-to-make-better-decisions-by-fix-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-roblox-ceo-how-to-make-better-decisions-by-fix-3.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-roblox-ceo-how-to-make-better-decisions-by-fix-4.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "In this short conversation, he shares how a health decision saved his son’s life and how it changed how he eats, why bureaucracy compounds unless you actively destroy it, monitoring your mind before making decisions, and why the best products often improve by removing complexity.",
            "cn": "在这段简短的对话中，他讲述了一个健康决策如何挽救了儿子的生命，以及这如何改变了他自己的饮食习惯；解释了为何官僚主义会不断累积——除非你主动打破它；探讨了在做出决策前如何观察自己的思维状态；并阐述了为何最好的产品往往通过消除复杂性而得到改进。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "+ Members get the longer, extended version of this conversation, with additional content not included in the public release.",
            "cn": "+ 会员可获取本次对话的加长版，其中包含公开版本中未收录的额外内容。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "++ Note: Shane and guests may hold positions in assets discussed in this episode.",
            "cn": "++ 注：肖恩及其嘉宾可能持有本期节目中讨论的资产。"
          },
          {
            "en": "This podcast is not investment advice, and is intended for informational and entertainment purposes only.",
            "cn": "本播客不构成投资建议，仅供参考和娱乐之用。"
          },
          {
            "en": "Nothing in this conversation should be considered investment advice, financial guidance, or a recommendation to buy or sell any security.",
            "cn": "本对话中的任何内容均不应被视为投资建议、财务指导，或对买卖任何证券的推荐。"
          },
          {
            "en": "Always do your own due diligence or consult with a qualified financial advisor before making investment decisions.",
            "cn": "在做出投资决策之前，请务必自行进行尽职调查，或咨询合格的财务顾问。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "++ Note: This episode discusses health and medical topics for informational purposes only.",
            "cn": "++ 注：本期节目讨论健康和医疗相关话题，仅供参考。"
          },
          {
            "en": "Shane and his guest are not medical professionals, and nothing in this conversation should be considered medical advice.",
            "cn": "谢恩及其嘉宾均非医疗专业人士，本对话中的任何内容均不应被视为医疗建议。"
          },
          {
            "en": "Please do your own research and consult a qualified healthcare professional before making decisions about your health.",
            "cn": "在就健康问题做出决定之前，请自行进行调研，并咨询合格的医疗保健专业人员。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Head over to the Members Only area to access transcripts and other Member Only content.",
            "cn": "请前往“会员专区”，查看文字记录及其他仅限会员的内容。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This summer, I’m revisiting one of my favorite episodes.",
            "cn": "今年夏天，我打算重温我最喜欢的其中一集。"
          },
          {
            "en": "If you haven’t heard it, now is the time.",
            "cn": "如果你还没听过，现在正是时候。"
          },
          {
            "en": "If you have, it’s a classic and …",
            "cn": "如果你看过，那这可是部经典之作，而且……"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Rockefeller became the richest man the world had ever known by thinking differently about business, competition, and family.",
            "cn": "洛克菲勒之所以能成为有史以来最富有的人，是因为他对商业、竞争和家庭有着与众不同的见解。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It drifts there one comfortable lie at a time.",
            "cn": "它就这样一次又一次地飘向那里，每个谎言都让人感到舒适。"
          },
          {
            "en": "Kaz Nejatian took over Opendoor when it was just months away from …",
            "cn": "当Opendoor距离……仅剩几个月时，卡兹·内贾蒂安接手了该公司……"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A podcast about mastering the best of what other people have already figured out.",
            "cn": "一档关于如何掌握他人已总结出的最佳经验的播客。"
          },
          {
            "en": "The Knowledge Project focuses on insights and lessons that never expire.",
            "cn": "“知识项目”致力于发掘那些永不过时的见解和经验教训。"
          },
          {
            "en": "You’ll walk away from every episode with actionable insights that help you get better results and live a more meaningful life.",
            "cn": "每集节目结束后，你都会收获切实可行的见解，这些见解将帮助你取得更好的成果，过上更有意义的生活。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Farnam Street participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising commissions by linking to Amazon.",
            "cn": "Farnam Street 参与了亚马逊服务有限责任公司（Amazon Services LLC）的联盟计划，该计划是一项联盟广告计划，旨在通过网站链接至亚马逊，为网站提供赚取广告佣金的途径。"
          }
        ]
      }
    ]
  },
  {
    "id": "gr-why-women-s-laughter-has-long-been-treated-as-",
    "cat": "成长",
    "title": "Why women’s laughter has long been treated as a threat",
    "titleZh": "为什么女性的笑声长期以来一直被视为一种威胁",
    "source": "Psyche · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 14,
    "url": "https://psyche.co/ideas/why-womens-laughter-has-long-been-treated-as-a-threat",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/gr-why-women-s-laughter-has-long-been-treated-as-.jpg",
    "scoreVersion": "v2",
    "qualityScore": 100,
    "qualityBand": "formal",
    "difficultyBaseScore": 69.32,
    "serverScore": 79.2,
    "paras": [
      {
        "sentences": [
          {
            "en": "is a researcher at the Communication and Society Research Centre, Portugal, where he studies how media and emotions shape society.",
            "cn": "是葡萄牙“传播与社会研究中心”的一名研究员，主要研究媒体和情感如何塑造社会。"
          },
          {
            "en": "He is an editor of the journal Humanities and Social Sciences Communications, where he is currently co-editing the collection ‘Cultural Perspectives in Emotions Research’.",
            "cn": "他是《人文与社会科学通讯》期刊的编辑，目前正在该期刊上与他人共同主编题为“情感研究中的文化视角”的专题文集。"
          },
          {
            "en": "He is also the author of the books A Cultural History of Laughter (Routledge, 2024) and The Future of Television (2024), and the article ‘ What Is Laughter?",
            "cn": "他还著有《笑的文化史》（劳特利奇出版社，2024年）和《电视的未来》（2024年）等书籍，以及题为《什么是笑？》的文章。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "My grandmother, Tina, was born in the 1930s in a small village in northern Portugal.",
            "cn": "我的祖母蒂娜于20世纪30年代出生在葡萄牙北部的一个小村庄里。"
          },
          {
            "en": "Widowed young, she was forced to raise 13 children on her own.",
            "cn": "她年少丧偶，被迫独自抚养13个孩子。"
          },
          {
            "en": "She wore black until almost the end of her life.",
            "cn": "她几乎直到生命最后时刻都穿着黑色衣服。"
          },
          {
            "en": "In my childhood memories, her face had only two expressions: ‘sad’ and ‘stern’.",
            "cn": "在我儿时的记忆里，她的脸上只有两种表情：“悲伤”和“严厉”。"
          },
          {
            "en": "The first was constant; the second appeared whenever she scolded us.",
            "cn": "前者是恒常的；后者则总是在她训斥我们时出现。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I grew up without ever seeing her laugh.",
            "cn": "我从小到大从未见过她笑。"
          },
          {
            "en": "As a child, I assumed this was natural.",
            "cn": "小时候，我以为这是理所当然的。"
          },
          {
            "en": "Silence and emotional restraint seemed woven into her character.",
            "cn": "沉默与情感克制似乎已融入她的性格之中。"
          },
          {
            "en": "Only later did I begin to understand that this was not merely a trait of my grandmother’s, but the result of wider beliefs and social expectations that, for generations, deprived many women of the freedom to express something that had belonged to them since birth: their laughter.",
            "cn": "直到后来，我才开始明白，这不仅仅是我祖母的个人特质，更是更广泛的观念和社会期望所致——这些观念和期望几代以来，剥夺了许多女性表达一种自出生起就属于她们的东西的自由：那就是她们的笑声。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I have often returned to those childhood memories of her lack of laughter.",
            "cn": "我常常回想起那些童年记忆中她鲜少欢笑的场景。"
          },
          {
            "en": "They stayed with me so deeply that, years later, they became the starting point for my PhD research into how laughter is shaped by culture and media.",
            "cn": "这些经历给我留下了如此深刻的印象，以至于多年后，它们成为了我博士研究的起点——该研究探讨了文化与媒体如何塑造笑声。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I was living and studying in London, I remember having many conversations with friends (and friends of friends) about their own memories of non-laughing grandmothers.",
            "cn": "在伦敦生活和求学期间，我记得曾与许多朋友（以及朋友的朋友）聊过他们对那些不爱笑的祖母的回忆。"
          },
          {
            "en": "I found echoes of my own story in accounts from Saudi Arabia, Japan and many other countries around the world: stories of grandmothers who were permanently serious, or of other women whose laughter was absent, inappropriate or out of place.",
            "cn": "我在来自沙特阿拉伯、日本以及世界各地许多其他国家的叙述中，看到了自己故事的影子：那些永远板着脸的祖母，或是那些笑声缺失、不合时宜或显得格格不入的女性的故事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Of the many accounts I have gathered, one stands out.",
            "cn": "在我收集的众多记录中，有一则尤为引人注目。"
          },
          {
            "en": "A Spanish friend told me that her grandmother began to laugh only after developing dementia.",
            "cn": "一位西班牙朋友告诉我，她的祖母直到患上痴呆症后才开始笑。"
          },
          {
            "en": "‘I preferred that version of her,’ she confessed.",
            "cn": "“我更喜欢她那个样子，”她坦白道。"
          },
          {
            "en": "‘She stopped being rigid; she began to laugh and became more light-hearted.’",
            "cn": "“她不再那么拘谨了；她开始笑，也变得轻松自在起来。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We may think of laughter as one of the simplest human impulses – spontaneous, joyful, harmless.",
            "cn": "我们可能会认为笑是人类最简单的本能之一——自然而然、充满喜悦、无害。"
          },
          {
            "en": "So how did women’s laughter, especially in Europe, come to be treated with such deep suspicion?",
            "cn": "那么，女性的笑声——尤其是欧洲女性的笑声——为何会遭到如此深重的怀疑呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "O ver the years, I have heard many explanations.",
            "cn": "这些年来，我听过许多种解释。"
          },
          {
            "en": "Some have argued that prohibitions on laughter were a Latin or Catholic inheritance – and one that did not affect only women.",
            "cn": "有人认为，禁止大笑的规定是拉丁文化或天主教的遗风——而且这种规定不仅影响女性。"
          },
          {
            "en": "For a long time, social norms spread by the Church suggested that positive emotional responses, like laughter, expressed a temporary enjoyment of worldly things and, therefore, a visible threat to moral purity.",
            "cn": "长期以来，教会所倡导的社会规范认为，诸如笑声之类的积极情感反应，体现了对世俗事物的暂时享受，因此是对道德纯洁性的明显威胁。"
          },
          {
            "en": "In the eyes of the medieval Church, as Umberto Eco suggests in his novel The Name of the Rose (1980), laughter could be seen as a kind of daytime orgasm or ejaculation, the waking counterpart to the nocturnal emissions (ie, wet dreams) that doctrine excused as involuntary, and a shameful public display of earthly pleasure, uncontrolled by spiritual discipline.",
            "cn": "正如翁贝托·埃科在其小说《玫瑰的名字》（1980年）所指出的那样，笑被视为一种白天的性高潮或射精，是教义中被视为非自愿的“遗精”（即春梦）在清醒状态下的对应表现，也是对世俗欢愉的一种可耻的公开展示，无法通过精神修养加以控制。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Women’s emotional expressions in general, and their laughter in particular, have often been policed more closely than men’s.",
            "cn": "总体而言，女性的情感表达——尤其是她们的笑声——往往比男性受到更严格的约束。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To understand this history, it is worth looking at some of the pillars that shaped the Western feminine emotional ideal.",
            "cn": "要理解这段历史，有必要考察一下塑造西方女性情感理想的一些支柱。"
          },
          {
            "en": "Athenagoras of Athens, who lived around 115 to 190 CE, argued that a man should approach a woman in the same way a farmer approaches the land: not for pleasure, but only to sow his seed.",
            "cn": "生活于公元115年至190年左右的雅典的阿提纳戈拉斯认为，男人对待女人应该像农夫对待土地一样：不是为了寻求欢愉，而仅仅是为了播下种子。"
          },
          {
            "en": "In his view, woman was merely ‘ground’ – something that does not desire, does not feel, does not choose, and exists only to reproduce.",
            "cn": "在他看来，女人不过是“土壤”——一种没有欲望、没有感觉、没有选择，仅为繁衍而存在的事物。"
          },
          {
            "en": "We are speaking here of the feminine ideal in intimate life, but the same ideas applied socially.",
            "cn": "我们这里谈论的是亲密关系中的女性理想，但同样的理念在社会层面也适用。"
          },
          {
            "en": "At one point, the Archbishop of Constantinople John Chrysostom, who lived around 347 to 407 CE, observed that women barely dared to laugh in the presence of their husbands.",
            "cn": "君士坦丁堡大主教约翰·金口（约公元347年至407年）曾指出，当时妇女在丈夫面前几乎不敢笑。"
          },
          {
            "en": "He even expressed discomfort at seeing them do so during his sermons.",
            "cn": "他甚至对他们在自己讲道时这样做感到不快。"
          },
          {
            "en": "It is therefore unsurprising that later manuals, such as Le Ménagier de Paris ( c 1393) and The Ladies’ Book of Etiquette, and Manual of Politeness (1860), promoted a feminine ideal in which laughing freely and openly could not, ultimately, exist within society.",
            "cn": "因此，后来的一些手册，例如《巴黎女主人的手册》（约1393年）和《女士礼仪与待人接物指南》（1860年），所倡导的女性理想中，自由而开朗地大笑这种行为，归根结底是无法在社会中存在的，这也就不足为奇了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Stories about the risks deprived women of laughter not only in public, but also in their own homes",
            "cn": "关于风险的种种传言，不仅让妇女在公共场合无法开怀大笑，甚至在家中也无法尽情欢笑"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When we look at the Western tradition of writers and thinkers – especially those who were influenced by Plato – we frequently find laughter associated with a loss of control and distance from reason and sacred things.",
            "cn": "当我们审视西方作家和思想家的传统——尤其是那些受柏拉图影响的人——时，我们经常发现，笑被视为一种失控的表现，以及与理性及神圣事物的疏离。"
          },
          {
            "en": "In a world organised through hierarchies, where man owed reverence to God and woman to man, female laughter was seen as a threat to that order.",
            "cn": "在一个由等级制度构成的世界里，男人应当敬畏上帝，女人则应当敬畏男人，女性的笑声被视为对这种秩序的威胁。"
          },
          {
            "en": "The fact that women’s laughter continues to be more heavily scrutinised today suggests that traces of this medieval vision still remain.",
            "cn": "如今，女性的笑声依然受到更严苛的审视，这一事实表明，中世纪的这种观念仍留有痕迹。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maggie Hennefeld, professor of cultural studies and comparative literature at the University of Minnesota, notes that between the mid-19th and early 20th centuries, accounts circulated claiming that hundreds of women had died from laughter.",
            "cn": "明尼苏达大学文化研究与比较文学教授玛吉·亨内菲尔德指出，在19世纪中叶至20世纪初期间，曾有传闻称数百名妇女因大笑而死。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It is easy to imagine the impact of such painful stories.",
            "cn": "不难想象这些令人痛心的故事会产生怎样的影响。"
          },
          {
            "en": "Undoubtedly, such stories about the risks of laughter deprived women of laughter not only in public, but also in their own homes.",
            "cn": "毫无疑问，这些关于笑声风险的故事，不仅让女性在公共场合不敢大笑，甚至在家中也无法开怀大笑。"
          },
          {
            "en": "Many must have lived in fear of laughing, since – according to those narratives – the consequences could be fatal.",
            "cn": "许多人一定曾因害怕发笑而活在恐惧之中，因为——根据那些叙述——发笑的后果可能是致命的。"
          },
          {
            "en": "Some women, according to certain accounts, died simply for laughing at jokes about mothers- in-law.",
            "cn": "据某些记载，有些妇女仅仅因为笑话了关于婆婆的笑话，就因此丧命。"
          }
        ]
      },
      {
        "img": "assets/covers/gr-why-women-s-laughter-has-long-been-treated-as--1.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-why-women-s-laughter-has-long-been-treated-as--2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-why-women-s-laughter-has-long-been-treated-as--3.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "In the study ‘Gender and the Evaluation of Humor at Work’ (2019), Jonathan B Evans and colleagues found that, in the workplace, making others laugh tends to increase men’s status while diminishing that of women.",
            "cn": "在题为《性别与职场幽默评价》（2019）的研究中，乔纳森·B·埃文斯及其同事发现，在职场中，逗人发笑往往会提升男性的地位，而降低女性的地位。"
          },
          {
            "en": "As for laughter itself, something similar occurs in public life.",
            "cn": "至于笑声本身，在公共生活中也会出现类似的情况。"
          },
          {
            "en": "In contemporary political contexts, figures such as Hillary Clinton and Kamala Harris have been repeatedly scrutinised for their laughter, in a way that is rarely applied to their male counterparts.",
            "cn": "在当代政治语境中，希拉里·克林顿和卡玛拉·哈里斯等女性政界人士的笑声屡屡遭到审视，而这种审视方式却极少用于她们的男性同行。"
          },
          {
            "en": "Few people today would openly tell women not to laugh or make others laugh.",
            "cn": "如今，很少有人会公开告诉女性不要笑，或者不要逗别人笑。"
          },
          {
            "en": "Yet both actions still seem to disturb a masculinised atmosphere whose pressure may not always be immediately obvious but is still felt in certain places and by certain people.",
            "cn": "然而，这两项行为似乎仍扰乱了那种充满男性气概的氛围——这种氛围所带来的压力虽未必总是显而易见，但在某些场合、对某些人而言，依然能感受到。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In Laughter (1900), Henri Bergson suggests that laughter marks the breaking of social rigidity and exposes the artificiality of social norms.",
            "cn": "亨利·柏格森在《笑》（1900年）一书中指出，笑标志着社会僵化的打破，并揭示了社会规范的人为性。"
          },
          {
            "en": "We might therefore understand laughter as the sound of that rigidity giving way, like glass breaking.",
            "cn": "因此，我们可以将笑声理解为那种僵硬感崩解时发出的声音，就像玻璃破碎的声音一样。"
          },
          {
            "en": "The person who laughs at the way things are is able to momentarily step outside the established order and, from that position, reveal how constructed it really is: a peasant laughing at a king, a worker laughing at a boss, a woman laughing at a world that expects her to be silent.",
            "cn": "那些对现状发笑的人，能够暂时跳出既定的秩序，并从这一立场揭示出这种秩序实际上是何等人为构建的：一个农民嘲笑国王，一个工人嘲笑老板，一个女人嘲笑那个要求她保持沉默的世界。"
          },
          {
            "en": "In such moments, human nature asserts itself over social constructions, and whatever hierarchies were in place are briefly suspended.",
            "cn": "在这样的时刻，人性会凌驾于社会建构之上，无论此前存在着怎样的等级制度，都会暂时搁置。"
          },
          {
            "en": "Perhaps that is why, throughout history, laughter in general, and women’s laughter in particular, has unsettled so many people.",
            "cn": "也许正因如此，纵观历史，笑声——尤其是女人的笑声——才让如此多的人感到不安。"
          },
          {
            "en": "Laughter is, after all, the sound of social rigidity cracking under the pressure of human nature.",
            "cn": "归根结底，笑声正是社会僵化在人性压力的作用下裂开时发出的声音。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "T hough laughter has historically been seen as dangerous and unsettling, it has firmly established itself in the modern world.",
            "cn": "尽管历史上人们一直认为笑是危险且令人不安的，但它在现代社会中已稳固地确立了自己的地位。"
          },
          {
            "en": "This change has been generated, in part, by the rise of new forms of media.",
            "cn": "这一变化在一定程度上是由新媒体形式的兴起所推动的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the early 20th century, cinema emerged as a powerful tool for weakening older fears around laughter and unleashing its liberating force.",
            "cn": "20世纪初，电影作为一种强大的工具应运而生，它既消解了人们对笑声的旧有恐惧，又释放了笑声所蕴含的解放力量。"
          },
          {
            "en": "Women attending movies during that period could see, with their own eyes, people like them laughing on screen.",
            "cn": "那个时期去看电影的女性能够亲眼看到银幕上与自己相似的人开怀大笑。"
          },
          {
            "en": "They watched them laugh without any negative consequence befalling them and, more importantly, without succumbing to a laughter-induced death.",
            "cn": "他们看着那些人开怀大笑，却没有遭遇任何不良后果，更重要的是，他们也没有因大笑而死。"
          },
          {
            "en": "In this way, the laughter present in cinema was important for many women who, symbolically at least, did not yet know what laughter really was.",
            "cn": "正因如此，电影中的笑声对许多女性而言意义重大——至少在象征意义上，她们当时还不知道笑声的真正含义。"
          },
          {
            "en": "And comedy films brought a new and uplifting message of hope, power and prominence to laughter, the opposite of what had often been heard until then.",
            "cn": "而喜剧电影则为笑声赋予了充满希望、力量与光辉的崭新而振奋人心的内涵，这与此前人们常听到的观点截然相反。"
          },
          {
            "en": "This was true for both women and men, but especially for women, whose laughter had been more restricted.",
            "cn": "这一点对男女双方都适用，但对女性而言尤为明显，因为她们的笑声一直受到更多限制。"
          },
          {
            "en": "The arrival of comedies on television only accelerated this process.",
            "cn": "电视上喜剧节目的出现只是加速了这一进程。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Morning talk shows filled with small acts of silliness played a crucial role in my grandmother’s transformation",
            "cn": "那些充满各种小把戏的早间脱口秀节目，在我祖母的转变过程中起到了至关重要的作用"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Think of the laughter running through the US TV comedy I Love Lucy in the 1950s, the Mexican comedy El Chavo del Ocho in the 1970s, or the British comedy Keeping Up Appearances in the 1990s.",
            "cn": "试想一下，20世纪50年代美国情景喜剧《我爱露西》（I Love Lucy）、70年代墨西哥喜剧《八号街的小伙子》（El Chavo del Ocho）以及90年代英国喜剧《维持体面》（Keeping Up Appearances）中那此起彼伏的欢笑声。"
          },
          {
            "en": "Think also of the many daytime talk shows that proliferated across television screens around the world in the late 20th century, where laughter and tears are as common as words.",
            "cn": "再想想20世纪末在全球电视荧屏上如雨后春笋般涌现的众多日间脱口秀节目，在那里，欢笑与泪水与言语一样司空见惯。"
          },
          {
            "en": "What elite culture has often dismissed as frivolous media content – easy laughter, excessive emotionality – has played an important role in the democratisation of emotions in general, and laughter in particular, in the past century.",
            "cn": "那些常被精英文化视为轻浮的媒体内容——轻松的笑声、过度的情感表达——在过去一个世纪里，对情感（尤其是笑）的民主化起到了重要作用。"
          },
          {
            "en": "For millions of people, the arrival of cinema, radio, television and, more recently, social media has served as a source of emotional literacy in both personal and social life.",
            "cn": "对数以百万计的人来说，电影、广播、电视以及近年来兴起的社交媒体的出现，已成为他们在个人生活和社会生活中培养情感素养的重要来源。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As for my grandmother, her beliefs deprived her for practically her entire life not only of comfortable access to the social world but, above all, of a genuine connection to her own emotional world.",
            "cn": "至于我的祖母，她的信仰不仅使她几乎在整个生命中都无法自如地融入社会，更重要的是，还使她无法与自己的情感世界建立真正的联系。"
          },
          {
            "en": "Only later in life did she truly begin to laugh.",
            "cn": "直到晚年，她才真正开始开怀大笑。"
          },
          {
            "en": "What helped was her favourite television programmes – morning talk shows filled with recipes, domestic advice, laughter and small acts of silliness – which played a crucial role in that transformation.",
            "cn": "起作用的是她最喜欢的电视节目——那些充满食谱、家务建议、欢笑和些许滑稽举动的晨间脱口秀——这些节目在那次转变中发挥了关键作用。"
          },
          {
            "en": "Through the easy laughter she consumed, she slowly learned to laugh without fear or embarrassment.",
            "cn": "在那些轻松的笑声中，她渐渐学会了毫无畏惧、不觉尴尬地开怀大笑。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That daily exposure helped free her from the constraints of a certain cultural and religious pressure she never knew how to name, but which had kept her enclosed within herself, distant from her own body and her own nature.",
            "cn": "这种日常的接触帮助她摆脱了某种文化与宗教压力的束缚——她虽不知该如何命名这种压力，但正是它让她一直封闭在自己的内心世界里，与自己的身体和本性疏远。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I cannot say exactly when I first saw her laugh openly.",
            "cn": "我无法确切地说出第一次看到她开怀大笑是在什么时候。"
          },
          {
            "en": "It was in hospital, when I asked whether the hotel service was good enough for her requirements.",
            "cn": "当时我在医院里，问她酒店的服务是否能满足她的要求。"
          },
          {
            "en": "It was not a good joke, I know, but it was enough to make her laugh.",
            "cn": "我知道这并不是个好笑话，但足以让她笑出声来。"
          },
          {
            "en": "And laugh she did – without embarrassment, without covering her face, without fear of dying.",
            "cn": "她确实笑了——毫无尴尬，没有捂住脸，也不怕死。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When early cinema weaponised the sight of women’s laughter, it borrowed from flawed psychiatric ideas about female hysteria",
            "cn": "当早期电影将女性的笑声作为一种武器时，它借鉴了关于女性歇斯底里的、存在缺陷的精神病学理论。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You don’t have to wait to be amused, there are ways to train yourself to enjoy the ‘cheap medicine’ of laughter every day",
            "cn": "你不必坐等欢乐降临，可以通过一些方法来训练自己，每天享受这种“廉价良药”——笑声。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Women have been witty and bawdy throughout history.",
            "cn": "纵观历史，女性一直以机智和风趣著称。"
          },
          {
            "en": "It’s only recently that men haven’t been able to see their funny side",
            "cn": "直到最近，男性才开始无法看到自己幽默的一面"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "On stage as Mr Fruit Salad, I’ve seen for myself the power of the bizarre and ridiculous to convey what words can’t",
            "cn": "作为“水果沙拉先生”登台表演时，我亲眼见证了怪诞与荒谬所蕴含的力量——它们能传达出语言无法表达的情感"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "At a Texas convent, what could a sublimely uncouth sister in her mid-80s teach me about helping people?",
            "cn": "在德克萨斯州的一座修道院里，一位80多岁、举止极其粗鲁的修女，能教给我什么关于帮助他人的道理呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maintaining a long and happy relationship requires a specific skillset.",
            "cn": "要维持一段长久而幸福的关系，需要掌握特定的技能。"
          },
          {
            "en": "Learning to laugh at yourself and together is key",
            "cn": "学会自嘲并一起开怀大笑是关键"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Misanthropic female novelists and their characters make me hopeful for a future in which we shrug off feminine perfection",
            "cn": "那些厌世的女性小说家及其笔下的人物，让我对未来充满希望——在那样的未来里，我们将摆脱对女性“完美”的束缚。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Snow White, Rapunzel, Cinderella – the old fairy tales are full of female lust and hope, and most were told by women",
            "cn": "白雪公主、长发公主、灰姑娘——这些古老的童话中充满了女性的渴望与希望，而且其中大多数都是由女性讲述的"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Psyche is published by registered charity Aeon Media Group Ltd in association with Aeon America, a 501(c)(3) charity.",
            "cn": "《Psyche》由注册慈善机构 Aeon Media Group Ltd 出版，并由 501(c)(3) 慈善机构 Aeon America 协办。"
          }
        ]
      }
    ]
  },
  {
    "id": "gr-greg-brockman-inside-the-72-hours-that-almost-",
    "cat": "成长",
    "title": "Greg Brockman: Inside the 72 Hours That Almost Killed OpenAI",
    "titleZh": "格雷格·布罗克曼：《几乎让 OpenAI 覆灭的72小时内幕》",
    "source": "Farnam Street · 2026-04-22",
    "date": "2026-04-22",
    "minutes": 3,
    "url": "https://fs.blog/knowledge-project-podcast/greg-brockman/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/gr-greg-brockman-inside-the-72-hours-that-almost-.jpg",
    "scoreVersion": "v2",
    "qualityScore": 100,
    "qualityBand": "formal",
    "difficultyBaseScore": 71.41,
    "serverScore": 78.58,
    "paras": [
      {
        "sentences": [
          {
            "en": "Greg Brockman is the co-founder and President of OpenAI, the company behind ChatGPT and GPT-5.",
            "cn": "格雷格·布罗克曼是OpenAI的联合创始人兼总裁，该公司正是ChatGPT和GPT-5的开发者。"
          },
          {
            "en": "He was the first engineer at Stripe before leaving in 2015 to help start OpenAI.",
            "cn": "他是Stripe的第一位工程师，后于2015年离职，协助创立了OpenAI。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In this rare conversation, Greg goes inside the moments that built, and nearly broke, the most important AI company in the world.",
            "cn": "在这场难得的对话中，格雷格深入剖析了那些既造就了这家全球最重要的AI公司，又险些将其摧毁的关键时刻。"
          }
        ]
      },
      {
        "img": "assets/covers/gr-greg-brockman-inside-the-72-hours-that-almost--1.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-greg-brockman-inside-the-72-hours-that-almost--2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-greg-brockman-inside-the-72-hours-that-almost--3.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-greg-brockman-inside-the-72-hours-that-almost--4.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "Greg explains how the original Napa offsite produced the three-step technical plan OpenAI has followed for a decade and the real reason OpenAI had to abandon its pure nonprofit structure.",
            "cn": "格雷格解释了最初那次在纳帕举行的闭门会议如何制定出了OpenAI过去十年一直遵循的三步技术计划，以及OpenAI不得不放弃其纯非营利组织结构的真正原因。"
          },
          {
            "en": "He then walks through the 72 hours after Sam Altman was fired: where he was when he got the board call, why he quit the same day, how the “Phoenix” backup company was designed at Sam’s house the next morning, and the moment Ilya Sutskever’s tweet changed everything.",
            "cn": "随后，他详细讲述了萨姆·阿尔特曼被解雇后的72小时：他接到董事会电话时身在何处，为何当天就辞职，次日清晨在萨姆家中是如何构思出“凤凰”这一备用方案的，以及伊利亚·苏茨克维尔的那条推文如何改变了一切。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "From there, the conversation turns forward: whether we’re in a global AI race, how much of OpenAI’s own code is now written by AI (“it’s hard to know what percent is not “), why OpenAI stopped showing reasoning traces, what a compute-constrained world means for who gets access to AGI, and Greg’s answer to the question everyone is really asking: What happens to your job?",
            "cn": "随后，话题转向了未来：我们是否正处于一场全球人工智能竞赛之中，OpenAI 当前有多少代码是由人工智能编写的（“很难说有多少百分比不是由 AI 编写的”），OpenAI 为何停止展示推理轨迹，在计算资源受限的世界中，谁能获得通用人工智能（AGI）的访问权限，以及格雷格对大家真正关心的问题给出的答案：你的工作会怎样？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Head over to the Members Only area to access transcripts and other Member Only content.",
            "cn": "请前往“会员专区”，查看文字记录及其他仅限会员的内容。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "David Baszucki is the co-founder and CEO of Roblox, a platform built around a simple idea: give people the tools and incentives to create …",
            "cn": "大卫·巴祖基（David Baszucki）是Roblox的联合创始人兼首席执行官，该平台基于一个简单的理念：为用户提供创作所需的工具和激励……"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This summer, I’m revisiting one of my favorite episodes.",
            "cn": "今年夏天，我打算重温我最喜欢的其中一集。"
          },
          {
            "en": "If you haven’t heard it, now is the time.",
            "cn": "如果你还没听过，现在正是时候。"
          },
          {
            "en": "If you have, it’s a classic and …",
            "cn": "如果你看过，那这可是部经典之作，而且……"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Rockefeller became the richest man the world had ever known by thinking differently about business, competition, and family.",
            "cn": "洛克菲勒之所以能成为有史以来最富有的人，是因为他对商业、竞争和家庭有着与众不同的见解。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A podcast about mastering the best of what other people have already figured out.",
            "cn": "一档关于如何掌握他人已总结出的最佳经验的播客。"
          },
          {
            "en": "The Knowledge Project focuses on insights and lessons that never expire.",
            "cn": "“知识项目”致力于发掘那些永不过时的见解和经验教训。"
          },
          {
            "en": "You’ll walk away from every episode with actionable insights that help you get better results and live a more meaningful life.",
            "cn": "每集节目结束后，你都会收获切实可行的见解，这些见解将帮助你取得更好的成果，过上更有意义的生活。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Farnam Street participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising commissions by linking to Amazon.",
            "cn": "Farnam Street 参与了亚马逊服务有限责任公司（Amazon Services LLC）的联盟计划，该计划是一项联盟广告计划，旨在通过网站链接至亚马逊，为网站提供赚取广告佣金的途径。"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-it-s-nearly-50-years-we-ve-been-in-liverpool-n",
    "cat": "足球",
    "title": "\"It’s nearly 50 years we’ve been in Liverpool now. We’ve always been made to feel welcome. Our children grew up here and loved it – it’s a great city and it’s just got even better” Kenny Dalglish on his remarkable career and connection to Merseyside",
    "titleZh": "我们来到利物浦已经快50年了。这里的人们一直让我们感到宾至如归。我们的孩子在这里长大，也非常喜欢这里——这是一座伟大的城市，而且现在变得越来越好了。”肯尼·达格利什谈及自己非凡的职业生涯以及与默西塞德郡的深厚渊源",
    "source": "FourFourTwo · 2026-09-13",
    "date": "2026-09-13",
    "minutes": 3,
    "url": "https://www.fourfourtwo.com/person/player/its-nearly-50-years-weve-been-in-liverpool-now-weve-always-been-made-to-feel-welcome-kenny-dalglish-on-his-remarkable-career",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/ft-it-s-nearly-50-years-we-ve-been-in-liverpool-n.jpg",
    "scoreVersion": "v2",
    "qualityScore": 96.99,
    "qualityBand": "formal",
    "difficultyBaseScore": 64.94,
    "serverScore": 78.41,
    "paras": [
      {
        "sentences": [
          {
            "en": "Double glory in 1986, including the much less iconic Canon League First Division trophy",
            "cn": "1986年双喜临门，其中包括那座远不如其他奖杯具有标志性的佳能联赛甲级联赛奖杯"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Dalglish stepped up after Hillsborough, when the club and mourning families needed him most of all",
            "cn": "希尔斯堡惨案发生后，当俱乐部和遇难者家属最需要他的时候，达格利什挺身而出。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Kenny Dalglish after being reappointed as Liverpool boss in January 2011",
            "cn": "肯尼·达格利什于2011年1月再次被任命为利物浦主帅后"
          }
        ]
      },
      {
        "img": "assets/covers/ft-it-s-nearly-50-years-we-ve-been-in-liverpool-n-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/ft-it-s-nearly-50-years-we-ve-been-in-liverpool-n-4.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "The best features, fun and footballing quizzes, straight to your inbox every week.",
            "cn": "每周精选内容、趣味活动和足球问答，直接送达您的收件箱。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Fantastic football content straight to your inbox!",
            "cn": "精彩足球内容直达您的收件箱！"
          },
          {
            "en": "From the latest transfer news, quizzes, videos, features and interviews with the biggest names in the game, plus lots more.",
            "cn": "涵盖最新的转会新闻、趣味问答、视频、专题报道以及对足坛巨星的专访，还有更多精彩内容。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Get full access to premium articles, exclusive features and a growing list of member rewards.",
            "cn": "即可畅享所有优质文章、独家专题以及日益丰富的会员福利。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Kenny Dalglish was a legend as both a player and a manager, but he remains as modest as ever.",
            "cn": "肯尼·达格利什无论作为球员还是教练都是传奇人物，但他依然像往常一样谦逊。"
          },
          {
            "en": "FFT speaks to the man known as King Kenny about a career that brought trophy after trophy",
            "cn": "《FFT》杂志采访了这位被称为“肯尼王”的传奇人物，回顾了他那座接一座奖杯的辉煌职业生涯"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you purchase through links on our site, we may earn an affiliate commission.",
            "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Growing up in Glasgow during the 1950s, just a few square feet of grass could feel like Hampden Park.",
            "cn": "在20世纪50年代的格拉斯哥长大时，哪怕只有几平方英尺的草地，也会让人感觉仿佛置身于汉普登公园。"
          },
          {
            "en": "Not far from his family home in the impoverished neighbourhood of Milton, a young Kenny Dalglish would spend countless hours kicking a football around one such tiny patch with his father Bill.",
            "cn": "在米尔顿那个贫困社区的家中不远处，年轻的肯尼·达格利什曾与父亲比尔一起，在这样一块狭小的空地上踢球，度过了无数个小时。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "An engineer by trade, Bill would take his son to his two places of worship at weekends – the Protestant church and Ibrox.",
            "cn": "比尔是一名工程师，每逢周末，他都会带儿子去他常去的两个“礼拜场所”——新教教堂和伊布罗克斯球场。"
          },
          {
            "en": "When Kenny was 14, his family moved home, to his great delight, into the shadow of the latter.",
            "cn": "肯尼14岁那年，全家搬回了老家，这让他欣喜万分，新家就坐落在那座建筑的阴影之下。"
          },
          {
            "en": "\"My dad took me to Rangers from an early age – that never caused me any bother later on, you have to support someone when you're a kid,\" Dalglish tells FourFourTwo, looking back on his childhood.",
            "cn": "“我父亲从小就带我去看流浪者队的比赛——这后来从未给我带来任何困扰，毕竟小时候总得支持哪支球队嘛，”达格利什在接受《FourFourTwo》采访时回忆起自己的童年时光。"
          },
          {
            "en": "This year a documentary about his life was released, created by Asif Kapadia, the maker of documentary films Senna, Amy and Diego Maradona.",
            "cn": "今年，一部关于他生平的纪录片上映了，该片由曾执导过纪录片《塞纳》、《艾米》和《迭戈·马拉多纳》的阿西夫·卡帕迪亚执导。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Dalglish's kickabouts as a youngster paid off.",
            "cn": "达格利什年少时踢球练功的经历终于得到了回报。"
          },
          {
            "en": "By the time he'd left school to work as an apprentice joiner, he was being touted as a rising talent in Scottish football.",
            "cn": "在他从学校毕业去当木工学徒的时候，他已被誉为苏格兰足坛的一颗新星。"
          },
          {
            "en": "Turning out at weekends for Glasgow United, scouts from West Ham and Liverpool visited.",
            "cn": "周末代表格拉斯哥联队出战时，西汉姆联和利物浦的球探前来观摩。"
          },
          {
            "en": "His next stop lay in his home city – but not at the stadium he could see from his bedroom window.",
            "cn": "他的下一站是他的家乡——但并不是从他卧室窗户就能望见的那个体育场。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"One day we played Celtic's young boys,\" Dalglish remembers.",
            "cn": "“有天我们和凯尔特人队的青年队打了一场比赛，”达格利什回忆道。"
          },
          {
            "en": "\"Among those watching was their first-team manager, Jock Stein.",
            "cn": "“在场观众中，还有他们的第一队主教练乔克·斯坦。"
          },
          {
            "en": "He liked the wee No.4 – thankfully, that was me.\"",
            "cn": "“他喜欢那个小小的4号——谢天谢地，那正是我。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Stein's assistant, Sean Fallon, paid a visit to the Dalglish family home and, surrounded by Rangers memorabilia all over the walls, asked Bill and wife Cathy if their son would be interested in joining the Catholic juggernauts.",
            "cn": "斯坦的助手肖恩·法伦造访了达格利什家的住宅，在四面墙上挂满流浪者队纪念品的环绕下，他询问比尔和妻子凯茜，他们的儿子是否有兴趣加入这支天主教劲旅。"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-why-2026-27-will-be-one-of-the-best-championsh",
    "cat": "足球",
    "title": "Why 2026/27 will be one of the best Championship seasons ever",
    "titleZh": "为什么2026/27赛季将成为英冠历史上最精彩的赛季之一",
    "source": "FourFourTwo · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 4,
    "url": "https://www.fourfourtwo.com/competition/why-this-could-be-one-of-the-best-championship-seasons-ever",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh.jpg",
    "scoreVersion": "v2",
    "qualityScore": 100,
    "qualityBand": "formal",
    "difficultyBaseScore": 72.71,
    "serverScore": 78.19,
    "paras": [
      {
        "sentences": [
          {
            "en": "Coventry City finished 11 points clear at the top of the Championship last season",
            "cn": "上赛季，考文垂城以11分的优势领跑英冠积分榜"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "West Ham United are starting to click after a slow start to the campaign",
            "cn": "西汉姆联队在赛季初表现低迷后，如今开始渐入佳境"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Middlesbrough manager Kim Hellberg is aiming to mount a promotion push",
            "cn": "米德尔斯堡主教练金·赫尔贝格正致力于带领球队冲击升级"
          }
        ]
      },
      {
        "img": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh-4.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "The best features, fun and footballing quizzes, straight to your inbox every week.",
            "cn": "每周精选内容、趣味活动和足球问答，直接送达您的收件箱。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Fantastic football content straight to your inbox!",
            "cn": "精彩足球内容直达您的收件箱！"
          },
          {
            "en": "From the latest transfer news, quizzes, videos, features and interviews with the biggest names in the game, plus lots more.",
            "cn": "涵盖最新的转会新闻、趣味问答、视频、专题报道以及对足坛巨星的专访，还有更多精彩内容。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Get full access to premium articles, exclusive features and a growing list of member rewards.",
            "cn": "即可畅享所有优质文章、独家专题以及日益丰富的会员福利。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The early weeks of the Championship campaign have been full of goals and shock results - if that continues, it will be a season for the ages",
            "cn": "英冠联赛开赛以来的几周里，进球如潮，冷门频出——如果这种势头持续下去，这必将是一个载入史册的赛季"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you purchase through links on our site, we may earn an affiliate commission.",
            "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The Championship is often branded as the most competitive and unpredictable league in world football.",
            "cn": "英冠联赛常被誉为世界足坛竞争最激烈、最难以预测的联赛。"
          },
          {
            "en": "Except that's not always the case.",
            "cn": "不过，情况并非总是如此。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Parachute payments have skewed the odds in favour of the clubs relegated from the Premier League - in each of the past six seasons, at least one of the automatic promotion places have been filled by a team who spent the previous campaign in the top flight.",
            "cn": "“降级补偿金”使英超降级球队的晋级几率有所提升——在过去的六个赛季中，每个赛季至少有一个直接升级名额被上一赛季还在顶级联赛效力的球队占据。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That trend could continue this term but it doesn't feel like a foregone conclusion, while the play-off and relegation pictures are equally exciting.",
            "cn": "这一趋势在本赛季可能会延续，但似乎并非板上钉钉，而季后赛和保级战的形势同样扣人心弦。"
          },
          {
            "en": "Ladies and gentlemen, this could be the most on-brand Championship season for some time.",
            "cn": "女士们、先生们，这或许是近来最符合该联赛品牌调性的冠军赛季。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Last season's Championship was a tough act to follow.",
            "cn": "上赛季的英冠联赛表现实在令人难以超越。"
          },
          {
            "en": "Coventry City lifted the title to return to the Premier League after 25 years away, Hull City won the play-offs despite starting the campaign as one of the favourites to go down, and Leicester City suffered a shock second relegation in a row.",
            "cn": "考文垂城队夺冠，时隔25年重返英超；赫尔城队尽管在赛季初被视为降级热门之一，但最终赢得了升级附加赛；而莱斯特城队则遭遇了令人震惊的连续第二个赛季降级。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Furthermore, the teams who came down from the Premier League were not as dominant as in previous years.",
            "cn": "此外，从英超降级的球队也没有往年那样占据绝对优势。"
          },
          {
            "en": "Ipswich Town were the only member of that trio to gain promotion, finishing second behind Coventry, and their total of 84 points ended a run of five seasons where one of the three relegated clubs reached 90 points or more in their first campaign back in the Championship.",
            "cn": "伊普斯维奇镇是这三支球队中唯一成功升入英冠的球队，他们以第二名的成绩紧随考文垂之后，而他们总共拿到的84分，也终结了此前连续五个赛季中，每赛季都有降级球队在重返英冠的首个赛季中拿到90分或以上的纪录。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Meanwhile, the three teams promoted from League One - Birmingham City, Wrexham and Charlton Athletic - all stayed up, the third year in a row in which that has happened.",
            "cn": "与此同时，从英甲升级的三支球队——伯明翰城、雷克瑟姆和查尔顿竞技——均成功保级，这是连续第三年出现这种情况。"
          },
          {
            "en": "Despite all of that, this season is shaping up to be even better.",
            "cn": "尽管如此，本赛季看起来会更加精彩。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If it's goals you want, there have already been lots of them.",
            "cn": "如果你想看进球，那已经有很多了。"
          },
          {
            "en": "The league average of 2.89 goals per game ahead of Wednesday night's fixtures is higher than the average across a 46-match campaign in any of the past 20 years, on account of there being several teams who are great at scoring goals but not so good at keeping them out.",
            "cn": "在周三晚的比赛开始前，联赛场均进球数为2.89个，这一数据高于过去20年中任何一个46轮赛季的场均进球数，这主要是因为有几支球队虽然擅长进球，但在防守方面却表现欠佳。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Meanwhile, the old adage that anyone can beat anyone in the Championship appears truer than ever.",
            "cn": "与此同时，“英冠联赛中任何球队都有可能击败任何对手”这一老生常谈，如今似乎比以往任何时候都更贴切。"
          },
          {
            "en": "Some teams' results have fluctuated wildly, including Charlton winning at West Ham United but losing 4-0 at Stoke City, Blackburn Rovers stunning Middlesbrough only to fall to defeat at previously pointless Preston North End, and Millwall beating Bristol City, Norwich City and Bolton Wanderers by a combined score of 9-0, but losing to Southampton and Wrexham 8-1 on aggregate.",
            "cn": "一些球队的战绩起伏剧烈，包括查尔顿客场战胜西汉姆联，却在斯托克城主场0-4告负，布莱克本流浪者队先是爆冷击败米德尔斯堡，随后却输给了此前未得分的普雷斯顿北端队；米尔沃尔队虽然以总比分9-0先后击败了布里斯托尔城、诺维奇城和博尔顿流浪者队，但总比分8-1不敌南安普顿和雷克瑟姆。"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-openai-s-sam-altman-says-it-would-be-ill-advis",
    "cat": "AI",
    "title": "OpenAI’s Sam Altman says it would be ‘ill-advised’ to go public in 2026",
    "titleZh": "OpenAI 的萨姆·阿尔特曼表示，2026年上市将“不妥",
    "source": "TechCrunch AI · 2026-09-12",
    "date": "2026-09-12",
    "minutes": 2,
    "url": "https://techcrunch.com/2026/09/12/openais-sam-altman-says-it-would-be-ill-advised-to-go-public-in-2026/",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/ai-openai-s-sam-altman-says-it-would-be-ill-advis.jpg",
    "scoreVersion": "v2",
    "qualityScore": 95.74,
    "qualityBand": "formal",
    "difficultyBaseScore": 71.57,
    "serverScore": 75.55,
    "paras": [
      {
        "sentences": [
          {
            "en": "While OpenAI has filed confidentially for an IPO, the company will not be going public this year, according to CEO Sam Altman.",
            "cn": "尽管OpenAI已秘密提交了IPO申请，但据首席执行官萨姆·阿尔特曼称，该公司今年不会上市。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Altman was interviewed recently by Fortune editor in chief Alyson Shontell; amidst the fallout from the OpenAI-HuggingFace hack, as well as broader discussions about AI safety, Shontell asked whether OpenAI still feels pressure to “move really fast” due to its IPO plans.",
            "cn": "阿尔特曼最近接受了《财富》杂志总编辑艾莉森·肖内尔的采访；在OpenAI和HuggingFace遭遇黑客攻击引发的余波，以及关于人工智能安全性的更广泛讨论之际，肖内尔询问OpenAI是否仍因IPO计划而感到必须“快速推进”的压力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“We’re not rushing into an IPO,” Altman said.",
            "cn": "“我们不会仓促进行首次公开募股，”阿尔特曼说道。"
          },
          {
            "en": "“I actually think that given everything happening with safety, right now would be an ill-advised moment to go public.”",
            "cn": "“实际上，考虑到目前围绕安全问题发生的一切，我认为现在上市并非明智之举。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Instead, he insisted that OpenAI will go public “when we’re ready, which is when the business is ready, when we feel ready from what the moment is like in society with this technology.” When pressed on whether that means the IPO isn’t happening in 2026, Altman replied, “I would say not 2026, yeah.",
            "cn": "相反，他坚持认为，OpenAI将在“我们准备好的时候”上市，“也就是业务准备就绪时，以及我们认为从社会对这项技术的接受程度来看时机成熟时。”当被追问这是否意味着2026年不会进行IPO时，阿尔特曼回答道：“我只能说不会在2026年，是的。”"
          },
          {
            "en": "We’ve got a lot of stuff to do.”",
            "cn": "“我们还有很多事情要做。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The New York Times reported in June that although OpenAI had hired bankers and lawyers with the goal of going public in the third or fourth quarter of 2026, the company was leaning toward 2027 due to the volatility of tech stocks and its own financial challenges.",
            "cn": "《纽约时报》6月报道称，尽管OpenAI已聘请银行家和律师，计划于2026年第三或第四季度上市，但鉴于科技股行情波动以及公司自身面临的财务挑战，该公司目前倾向于将上市时间推迟至2027年。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Last day to book an exhibit table is September 18.",
            "cn": "预订展位的截止日期是9月18日。"
          },
          {
            "en": "Don’t miss out on high-impact leads, investor access, and a brand spotlight in Disrupt’s Expo Hall.",
            "cn": "千万不要错过在Disrupt展览厅中获取高价值潜在客户、接触投资者以及让品牌大放异彩的机会。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Every weekday and Sunday, you can get the best of TechCrunch’s coverage.",
            "cn": "每个工作日和周日，您都可以阅读TechCrunch的精选报道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "TechCrunch Mobility is your destination for transportation news and insight.",
            "cn": "TechCrunch Mobility 是您获取交通新闻和行业洞察的首选平台。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Startups are the core of TechCrunch, so get our best coverage delivered weekly.",
            "cn": "初创企业是TechCrunch的核心，因此请订阅我们的每周精选报道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Provides movers and shakers with the info they need to start their day.",
            "cn": "为社会各界的领军人物提供开启新的一天所需的信息。"
          }
        ]
      },
      {
        "img": "assets/covers/ai-openai-s-sam-altman-says-it-would-be-ill-advis-1.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/ai-openai-s-sam-altman-says-it-would-be-ill-advis-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/ai-openai-s-sam-altman-says-it-would-be-ill-advis-3.jpg",
        "cap": ""
      }
    ]
  },
  {
    "id": "st-sean-penn-wants-jared-kushner-and-ivanka-trump",
    "cat": "明星",
    "title": "Sean Penn Wants Jared Kushner and Ivanka Trump To Watch His New Documentary, Black Sunflowers",
    "titleZh": "肖恩·潘希望贾里德·库什纳和伊万卡·特朗普观看他的新纪录片《黑向日葵》",
    "source": "Vanity Fair · 2026-09-12",
    "date": "2026-09-12",
    "minutes": 14,
    "url": "https://www.vanityfair.com/story/sean-penn-interview-black-sunflowers",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/st-sean-penn-wants-jared-kushner-and-ivanka-trump.jpg",
    "scoreVersion": "v2",
    "qualityScore": 91.74,
    "qualityBand": "formal",
    "difficultyBaseScore": 62.67,
    "serverScore": 75.42,
    "paras": [
      {
        "sentences": [
          {
            "en": "At Friday’s premiere of Marcus Haney’s documentary about youth living in Ukraine during wartime, executive producer Sean Penn referred to the film as “a call to human arms.” In Black Sunflowers, Haney follows a group of young people whose lives are tied together by two things— the war in Ukraine and rave culture.",
            "cn": "在周五举行的马库斯·哈尼执导的纪录片首映式上，该片讲述了战时生活于乌克兰的年轻人，执行制片人肖恩·潘将这部影片称为“对人类的号召”。在《黑向日葵》中，哈尼跟随了一群年轻人，他们的生活因两件事紧密相连——乌克兰战争和狂欢文化。"
          },
          {
            "en": "Haney’s camera follows the kids, some of whom are as young as 18, into battle, onto the dance floor, having political conversations with their grandparents, watching Donald Trump get elected, watching Trump and Vice President JD Vance meet with President Volodymyr Zelensky, and fall in love.",
            "cn": "汉尼的镜头跟随这些孩子们——其中一些年仅18岁——踏上战场，踏上舞池，与祖父母探讨政治话题，目睹唐纳德·特朗普当选，见证特朗普和副总统J·D·万斯会见总统沃洛迪米尔·泽连斯基，并坠入爱河。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Some of the characters are soldiers, some are artists, some believe it is their duty to fight in this war while others are not sure that is the way through this conflict.",
            "cn": "有些角色是士兵，有些是艺术家；有些人认为参战是他们的职责，而另一些人则不确定这是否是解决这场冲突的正确途径。"
          },
          {
            "en": "There is a constant hum of war in the background of every scene, whether it be drone strikes or stray gunfire.",
            "cn": "在每一幕的背景中，都回荡着战争的低鸣，无论是无人机空袭还是零星的枪声。"
          },
          {
            "en": "Many of the kids in the documentary went from the COVID-19 pandemic straight into the war with Russia.",
            "cn": "纪录片中的许多孩子，刚经历了新冠疫情，随即又卷入了与俄罗斯的战争。"
          },
          {
            "en": "They seem incredibly adult, and then they go on social media or FaceTime their boyfriend.",
            "cn": "他们看起来非常成熟，可转眼间却又上社交媒体，或者用FaceTime和男朋友视频通话。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Haney’s film is a brisk 95 minutes but it packs a punch.",
            "cn": "汉尼的这部电影时长仅95分钟，节奏明快，却极具冲击力。"
          },
          {
            "en": "The day after the premiere (post after-party and an after after party), I sat down with Haney and Penn to discuss the film and what they hope audiences will glean from this unique perspective.",
            "cn": "首映式结束的第二天（经历了首映派对和后续派对之后），我与汉尼和彭坐下来，共同探讨了这部电影，以及他们希望观众能从这一独特视角中获得什么。"
          }
        ]
      },
      {
        "img": "assets/covers/st-sean-penn-wants-jared-kushner-and-ivanka-trump-3.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "Vanity Fair: The movie grapples with the sense of hope, and some of the kids have it and some seem devoid of it.",
            "cn": "《名利场》：这部电影探讨了希望这一主题，有些孩子怀有希望，有些则似乎完全失去了希望。"
          },
          {
            "en": "After filming this movie, how do you feel personally about the situation in Ukraine and for these kids?",
            "cn": "拍摄完这部电影后，你个人对乌克兰的局势以及这些孩子的情况有什么看法？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Marcus Haney: I don't know the answer to that.",
            "cn": "马库斯·哈尼：我不知道答案。"
          },
          {
            "en": "I feel like I know less than I did when I was first going in.",
            "cn": "我觉得我现在知道的还不如刚开始接触时多。"
          },
          {
            "en": "It's not going to stop until [Russian President Vladimir] Putin stops it or is forcibly stopped.",
            "cn": "除非[俄罗斯总统弗拉基米尔·]普京亲自叫停，或者被强行制止，否则这种情况不会停止。"
          },
          {
            "en": "When you talk to [people], especially military, they don't have any anticipation of it stopping soon.",
            "cn": "当你和[人们]交谈时，尤其是军方人员，他们根本不认为这种情况会很快结束。"
          },
          {
            "en": "So when you hear these kids talk who are fighting on the front lines, they see this as a war they might be potentially fighting their whole lives.",
            "cn": "所以，当你听到这些身处前线战斗的年轻人说话时，你会发现他们把这场战争看作是一场可能要打一辈子的战争。"
          },
          {
            "en": "And that colors how I might interpret that.",
            "cn": "这也影响了我对这一问题的解读方式。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Sean Penn: I have to be very careful with words like victory and defining that as one of the kids' positions.",
            "cn": "肖恩·潘：对于“胜利”这样的词，我必须非常谨慎，不能将其定义为孩子们所持的一种立场。"
          },
          {
            "en": "In terms of victory, that got done a long time ago.",
            "cn": "就胜利而言，那早已实现。"
          },
          {
            "en": "Ukrainians represented anything worth having hope for humanity over and over again.",
            "cn": "乌克兰人一次又一次地展现了人类值得寄予希望的一切。"
          },
          {
            "en": "What military resolution will happen is not really something for anybody to comment on.",
            "cn": "将采取何种军事解决方案，其实并不是任何人可以置喙的事情。"
          },
          {
            "en": "To me, this movement, these kids, and their very embrace of what we're calling hope or lack thereof is the hope.",
            "cn": "对我来说，这一运动、这些年轻人，以及他们对所谓“希望”或“绝望”的拥抱本身，就是希望。"
          },
          {
            "en": "What's happening in the world has never happened before.",
            "cn": "世界上正在发生的事情是前所未有的。"
          },
          {
            "en": "And I, of course, talk partly about the influence of social media and all of that technology in general.",
            "cn": "当然，我所谈论的在一定程度上也涉及社交媒体以及各类技术所带来的影响。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Do you feel the kids in the documentary lost some currency on social media after the first two years?",
            "cn": "你觉得纪录片里的这些孩子在前两年之后，在社交媒体上的热度是否有所下降？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Haney: Way beyond social media.",
            "cn": "哈尼：远远超出了社交媒体的范畴。"
          },
          {
            "en": "Hard donations, support from other countries, including the United States, of course.",
            "cn": "实物捐赠，以及包括美国在内的其他国家的支持。"
          },
          {
            "en": "But it started off, donations are a great measure of just seeing how much the world's plugged in and it's like a cliff drop.",
            "cn": "但一开始，捐款确实是一个很好的指标，可以直观地反映出全世界参与的程度，而现在捐款额却像从悬崖上坠落一样骤降。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I would say this without a bias, in there is a perversion of leadership.",
            "cn": "我这么说绝无偏见，因为那里存在着一种领导力的扭曲。"
          },
          {
            "en": "They've made such chaotic choices and we can Monday-morning quarterback a lot of things.",
            "cn": "他们做了一系列如此混乱的决定，而我们现在可以对很多事情事后诸葛亮一番。"
          },
          {
            "en": "Confusion and manufactured crises and distraction is now systemic from the top of the world.",
            "cn": "如今，从世界最高层开始，混乱、人为制造的危机和转移视线的手段已成系统性问题。"
          },
          {
            "en": "Of the world banking structure.",
            "cn": "关于全球银行业结构。"
          },
          {
            "en": "Of the world military structures.",
            "cn": "关于世界各国的军事结构。"
          },
          {
            "en": "Certainly of the world humanitarian structures and of the fourth estate.",
            "cn": "当然，包括世界人道主义机构和第四权力。"
          },
          {
            "en": "So it goes back to 'how's any of this going to get better'?",
            "cn": "所以问题又回到了“这一切究竟怎么才能好转？”"
          },
          {
            "en": "And this movie, it’s so much more of a documentary.",
            "cn": "而且这部电影，其实更像是一部纪录片。"
          },
          {
            "en": "This is what I think is great cinema, it should be next to Apocalypse Now or Five Easy Pieces.",
            "cn": "这就是我认为的伟大电影，它应该与《现代启示录》或《五段小品》齐名。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Imagine the wildfires in the Pacific Palisades.",
            "cn": "试想一下太平洋帕利塞兹的野火。"
          },
          {
            "en": "Everybody reaches out to each other.",
            "cn": "大家互相伸出援手。"
          },
          {
            "en": "The horror of it, the immediate horror, goes on for five days and then you just have Gaza West in the Palisades to look at and say, “oh my God, how's California going to fix this?” America's not very good, often not very good at embracing its greatest aspects of the time.",
            "cn": "这种恐怖，这种即刻的恐怖，持续了五天，之后你只能望着帕利塞兹的“加沙西区”，感叹道：“天哪，加利福尼亚州该怎么解决这个问题？”美国并不擅长——往往并不擅长——接纳那个时代最辉煌的一面。"
          },
          {
            "en": "They wait till it trends and proves itself before they say, \"Hey, that's great.\"",
            "cn": "他们要等到某件事成为热门趋势并证明了自己的价值，才会说：“嘿，这太棒了。”"
          }
        ]
      },
      {
        "img": "assets/covers/st-sean-penn-wants-jared-kushner-and-ivanka-trump-4.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "In the middle of the film, Trump revokes USAID and you see how it affects the gay soldier and then the people who use the grants for amputees.",
            "cn": "影片过半时，特朗普撤销了美国国际开发署（USAID）的资助，观众可以看到这给那位同性恋士兵以及依靠这笔拨款的截肢者带来了怎样的影响。"
          },
          {
            "en": "Do you think that is one of his greatest crimes as president?",
            "cn": "你认为这是他担任总统期间犯下的最严重的罪行之一吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I mean, a kind way to put it would be negligent homicide, but we've been told not to use those terms.",
            "cn": "我的意思是，委婉一点的说法可以是“过失致死”，但我们被告知不要使用这些术语。"
          },
          {
            "en": "It's not polite, which is ironic.",
            "cn": "这不礼貌，这真讽刺。"
          },
          {
            "en": "We are accepting a great degree of denial and we still believe that we're bulletproof.",
            "cn": "我们对这种否认态度宽容以待，却依然自以为刀枪不入。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The kids sort of have a funny reaction to Trump when they watch him.",
            "cn": "孩子们看特朗普的时候，反应有点儿滑稽。"
          },
          {
            "en": "What was the Ukrainian youth's overall attitude toward him?",
            "cn": "乌克兰青年对他总体上持什么态度？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Haney: I was really surprised at how receptive they were to Trump in the beginning, and it all comes into that one quote, \"I'll end the war in 24 hours.\" So when you, as a Ukrainian, you're not growing up with the context, the nuance of growing up in America and Trump every day.",
            "cn": "哈尼：起初他们对特朗普如此热情，这真的让我很惊讶，而这一切都归结于那句名言：“我将在24小时内结束这场战争。”所以，作为一名乌克兰人，你并没有在美国长大，无法体会到每天生活在特朗普时代所特有的背景和细微差别。"
          },
          {
            "en": "When you hear that in the news as a Ukrainian, that's the best thing you could possibly hear.",
            "cn": "作为一名乌克兰人，当你在新闻中听到这一消息时，这绝对是你能听到的最好的消息。"
          },
          {
            "en": "That's salvation, that's the end of the war.",
            "cn": "那就是救赎，那就是战争的终结。"
          },
          {
            "en": "So for them, that stuck above everything.",
            "cn": "因此，对他们来说，这一点比其他一切都重要。"
          },
          {
            "en": "And there was this huge, “Okay, hold on.",
            "cn": "然后突然冒出一句：“好了，等等。”"
          },
          {
            "en": "If that's what he's saying, that's the best we've been told by far.”",
            "cn": "“如果这就是他的意思，那这绝对是我们迄今为止听到的最好的说法。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So there's this kind of rallying behind Trump, and then it became evident, this guy's absolutely full of shit.",
            "cn": "所以当时大家都在支持特朗普，后来才发现，这家伙简直满嘴胡说八道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This meeting with Zelensky, Trump and Vance was embarrassing to watch in the theater.",
            "cn": "在影院里观看泽连斯基、特朗普和万斯这次会面，实在令人尴尬。"
          },
          {
            "en": "Did that change things on the ground?",
            "cn": "这在实地改变了什么吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And it was after that was when I went into the bunker with them.",
            "cn": "正是那之后，我才和他们一起进了掩体。"
          },
          {
            "en": "Me being there makes them less safe.",
            "cn": "我的存在反而让他们感到不安全。"
          },
          {
            "en": "There was a lot of thoughts that night of post-Trump.",
            "cn": "那晚，关于“后特朗普时代”，我思绪万千。"
          },
          {
            "en": "That was a crystallizing moment for Ukraine.",
            "cn": "那对乌克兰来说是一个决定性的时刻。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A guy said to me early on, at the beginning of the war, disillusionment is a national pastime.",
            "cn": "战争初期，有个人对我说过，幻灭是一种国民消遣。"
          },
          {
            "en": "There was so much criticism going on about Zelensky not kissing the ring and saying thank you again and again.",
            "cn": "当时有很多人批评泽连斯基没有“亲吻戒指”，也没有一再表示感谢。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Penn: No, even I was even seeing it on CNN.",
            "cn": "彭恩：不，就连我都在CNN上看到了。"
          },
          {
            "en": "It wasn't the only one, but it was there.",
            "cn": "虽然不止这一件，但它确实在那里。"
          },
          {
            "en": "There was nothing that was going to change the outcome of that meeting.",
            "cn": "没有任何事情能改变那次会议的结果。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Would you want the Trump administration to watch this movie, and has Zelensky seen the film?",
            "cn": "你希望特朗普政府观看这部电影吗？泽连斯基看过这部电影了吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Haney: I mean, I want everyone possible to watch the film.",
            "cn": "哈尼：我的意思是，我希望尽可能多的人能看这部电影。"
          },
          {
            "en": "I don't know if they're in a place where they could be self-reflective enough to watch the film.",
            "cn": "我不知道他们是否处于能够足够自我反思、从而观看这部电影的状态。"
          },
          {
            "en": "I would love if there was any shot of having any impact on that.",
            "cn": "如果能对这件事产生任何影响，那我真是太高兴了。"
          },
          {
            "en": "Yeah, of course I'd want the Trumps to watch this.",
            "cn": "是啊，我当然希望特朗普一家能看看这个。"
          },
          {
            "en": "But I don't have much faith and if nothing else has encouraged self-reflection, I don't know if this would.",
            "cn": "但我并没有多少信心，而且如果其他事情都没能促使我进行自我反思的话，我也不知道这件事能否做到。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Penn: I’d like to see [Jared] Kushner and Ivanka Trump watch it.",
            "cn": "彭恩：我希望[贾里德]·库什纳和伊万卡·特朗普能看看这个。"
          },
          {
            "en": "This film makes no effort to attack any president.",
            "cn": "这部电影丝毫没有意图攻击任何一位总统。"
          },
          {
            "en": "And these kids' stories are so familiar that there's no reason not to present something that lets somebody connect and have a chance to reflect.",
            "cn": "而且这些孩子的故事如此贴近生活，因此完全有理由呈现一些能让人们产生共鸣、并借此反思的内容。"
          },
          {
            "en": "We know what we think mostly about leadership, but I'm willing to be wrong anytime he wants.",
            "cn": "我们大多知道自己对领导力的看法，但我随时愿意承认自己错了，只要他愿意。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We're entering the midterms and the next presidential election.",
            "cn": "我们即将迎来中期选举和下一届总统大选。"
          },
          {
            "en": "Do you think the Democrats will prioritize this as an issue?",
            "cn": "你认为民主党会将此作为优先议题吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Penn: I am not confident in the Democrats at large.",
            "cn": "彭恩：我对民主党整体并不抱有信心。"
          },
          {
            "en": "I think most of our politicians prioritize what’s trending.",
            "cn": "我认为，我们大多数政客都更重视热门话题。"
          },
          {
            "en": "Not everything our government does is on government, right?",
            "cn": "我们政府做的不是每一件事都与政府有关，对吧？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I couldn't help but feel like the Ukrainian youth has such moral certainty.",
            "cn": "我不禁觉得，乌克兰的年轻人有着如此坚定的道德信念。"
          },
          {
            "en": "And then I thought about us Americans, and it's like, are we just entitled brats?",
            "cn": "然后我想到我们这些美国人，不禁想：我们难道就是一群自以为是的小混蛋吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Penn: A lot of us, but not all.",
            "cn": "彭恩：我们当中很多人，但并非所有人。"
          },
          {
            "en": "Leadership means something, right?",
            "cn": "领导力总该有些意义吧？"
          },
          {
            "en": "You can even look at somebody like Charlie Kirk.",
            "cn": "你甚至可以看看查理·柯克这样的人。"
          },
          {
            "en": "If there's some young, great human leader out there at some university who's articulate and gives a shit—and there are—who sees this movie and could light their fire.",
            "cn": "如果某所大学里有位年轻而杰出的学生领袖，口才了得且真正关心此事——这样的学生确实存在——看到这部电影后，或许能点燃他们的热情。"
          },
          {
            "en": "We still have kids that could be those kids if we would remember our courage in all aspects.",
            "cn": "如果我们能在各个方面都重拾勇气，那么现在仍有孩子可以成为当年那样的孩子。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Haney: If we were put in the same situation, would we rise to the occasion like Ukrainians would?",
            "cn": "哈尼：如果我们也面临同样的情况，我们会像乌克兰人那样挺身而出吗？"
          },
          {
            "en": "This is a question I ask myself personally all the time while making this film.",
            "cn": "这是我在拍摄这部电影时，自己经常问自己的一个问题。"
          },
          {
            "en": "None of these kids ever saw themselves as becoming soldiers.",
            "cn": "这些孩子中，没有一个曾想过自己会成为士兵。"
          },
          {
            "en": "I think that's so important to understand.",
            "cn": "我认为理解这一点非常重要。"
          },
          {
            "en": "So if I put myself in those shoes, if we are being invaded and we were outnumbered and my home was being threatened, my family was being threatened, my freedom was being threatened, who am I?",
            "cn": "那么，如果我设身处地想想，如果我们正遭受入侵，且处于人数劣势，我的家园、我的家人、我的自由都面临威胁，那我究竟是谁？"
          },
          {
            "en": "I think that's one of the questions I'd like for people to ask.",
            "cn": "我觉得这是我希望大家能提出的问题之一。"
          },
          {
            "en": "And my answer is I wouldn't know until that moment.",
            "cn": "而我的回答是，直到那一刻我才会有答案。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Sean, you want to get this movie out there.",
            "cn": "肖恩，你得把这部电影推向市场。"
          },
          {
            "en": "You want to get this message out there.",
            "cn": "你想把这个消息传出去。"
          },
          {
            "en": "You didn't go to the Oscars, yet you won.",
            "cn": "你没去奥斯卡颁奖典礼，却获奖了。"
          },
          {
            "en": "Do you think the Oscars stage would have been a place to speak about Ukraine?",
            "cn": "你认为奥斯卡颁奖典礼的舞台是否适合谈论乌克兰问题？"
          },
          {
            "en": "Do you think it would have been received?",
            "cn": "你觉得它会受到欢迎吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Penn: When I see value added in something that is bigger than me, I do it.",
            "cn": "彭恩：当我发现某件事能为比我更宏大的目标创造价值时，我就会去做。"
          },
          {
            "en": "I've been quite outspoken on Ukraine.",
            "cn": "在乌克兰问题上，我一直直言不讳。"
          },
          {
            "en": "I'm uncomfortable in the setting [of the Academy Awards].",
            "cn": "我在[奥斯卡颁奖典礼]的这种氛围下感到不自在。"
          },
          {
            "en": "I am Switzerland on those who choose to speak politically there and those who don't.",
            "cn": "对于那些选择在瑞士发表政治言论的人，以及那些不发表政治言论的人，我持中立态度。"
          },
          {
            "en": "I realized in my 60s that I'm not good in crowds of more than eight, not because I'm avoiding the bad people or the superficiality of Hollywood, but because there's too many people in the room I want to say hi to and I can't.",
            "cn": "到了六十多岁，我才意识到自己不擅长应对超过八人的聚会，这并不是因为我想避开那些坏人，也不是因为好莱坞的虚伪，而是因为房间里有太多我想打个招呼的人，却无法一一打招呼。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And so I was in Ukraine at the time [of the Oscars].",
            "cn": "所以，当时[奥斯卡颁奖典礼举行时]，我正在乌克兰。"
          },
          {
            "en": "I had great excitement about it.",
            "cn": "我对此感到非常兴奋。"
          },
          {
            "en": "I would have liked to have seen somebody who wouldn't have represented a redundancy as I might have at that moment.",
            "cn": "我当时真希望看到一个不会像我那样显得多余的人。"
          },
          {
            "en": "But it's hard to find the knockout of punches.",
            "cn": "但很难找到一记能一击致胜的重拳。"
          },
          {
            "en": "I didn't have this film to articulate what I was processing.",
            "cn": "当时我没有这部电影来表达我当时所思所想。"
          },
          {
            "en": "If I did, I would have gone there and done that and experienced the anxiety of social circumstances and self-consciousness of cameras.",
            "cn": "如果我真那样做了，我本该去那里，亲身经历一下社交场合带来的焦虑，以及面对镜头时的局促不安。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Haney: I'd hazard a guess that Sean being [in] Ukraine at the time might have spoken more than him speaking at the Academy Awards.",
            "cn": "哈尼：我敢打赌，肖恩当时身在乌克兰这件事，可能比他在奥斯卡颁奖典礼上的发言更能引起关注。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The scene where the missile strikes nearby the bunker.",
            "cn": "导弹击中掩体附近的场景。"
          },
          {
            "en": "Would you go back and film scenes like that again?",
            "cn": "你会回去重新拍摄那样的场景吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was beyond hell and I was scared for my life.",
            "cn": "那简直比地狱还要可怕，我当时吓得要命。"
          },
          {
            "en": "And I really, throughout my career, there's always this line and I thrive on dancing right on that line.",
            "cn": "而且，在我整个职业生涯中，始终存在这样一条界线，而我正是靠在界线上游走才如鱼得水。"
          },
          {
            "en": "That was past the line and I had a lot of time in there after that strike to contemplate a lot of things.",
            "cn": "那已经越界了，在那次犯规之后，我在场上还有很长时间可以思考很多事情。"
          },
          {
            "en": "They, and I, take constipation pills to reduce having to go above and use the bathroom outside.",
            "cn": "他们和我一样，都吃通便药，这样就不用频繁上厕所，也不用跑出去上厕所了。"
          },
          {
            "en": "It's so horrendous at the same time, six hours on, six hours off, the rotations they do.",
            "cn": "同时，这种轮班制度也太可怕了——工作六小时，休息六小时，他们就是这么轮班的。"
          },
          {
            "en": "When they're off, they're sleeping or they're [being] kids again: on TikTok sharing memes, teaching me about American memes, catching me up on pop culture in America while.",
            "cn": "休息的时候，他们要么在睡觉，要么又像个孩子一样：在TikTok上分享梗图，教我了解美国网络梗，顺便跟我聊聊美国的流行文化。"
          },
          {
            "en": "They go back to being 18 years old again.",
            "cn": "他们仿佛又回到了18岁。"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-y-combinator-s-garry-tan-wants-us-open-weight-",
    "cat": "AI",
    "title": "Y Combinator’s Garry Tan wants US open-weight AI labs to ‘distill’ frontier models, too",
    "titleZh": "Y Combinator 的加里·谭希望美国的开放式 AI 实验室也能对前沿模型进行“提炼",
    "source": "TechCrunch AI · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 3,
    "url": "https://techcrunch.com/2026/09/11/y-combinators-garry-tan-wants-u-s-open-weight-ai-labs-to-distill-frontier-models-too/",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/ai-y-combinator-s-garry-tan-wants-us-open-weight-.jpg",
    "scoreVersion": "v2",
    "qualityScore": 92.49,
    "qualityBand": "formal",
    "difficultyBaseScore": 65.46,
    "serverScore": 75.1,
    "paras": [
      {
        "sentences": [
          {
            "en": "When it comes to Chinese AI labs using distillation techniques to extract knowledge from frontier model makers, Y Combinator CEO Garry Tan is hoping regulators stay out of it.",
            "cn": "关于中国的人工智能实验室利用知识蒸馏技术从前沿模型开发者那里提取知识一事，Y Combinator首席执行官加里·谭希望监管机构不要介入。"
          },
          {
            "en": "In fact, he thinks U.S. AI labs should perhaps play the same game.",
            "cn": "事实上，他认为美国的人工智能实验室或许也应该采取同样的策略。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“I would do nothing,” he told CNBC in an interview earlier this week.",
            "cn": "“我什么也不会做，”他本周早些时候在接受CNBC采访时说道。"
          },
          {
            "en": "“We could argue that there should be an American distillation regime.”",
            "cn": "“我们可以认为，美国应当建立一套蒸馏制度。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He elaborated to TechCrunch that this means he wants smaller, American open-weight AI labs to use the same kind of training techniques on American frontier AI labs, giving the U.S. a more robust set of open-weight options that aren’t Chinese.",
            "cn": "他向TechCrunch进一步解释说，这意味着他希望规模较小的美国开放权重AI实验室能够在美国前沿AI实验室中采用同类训练技术，从而为美国提供一套更强大的、非中国来源的开放权重选项。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Distillation is when a model maker extensively prompts another model in order to learn how it works and reasons.",
            "cn": "所谓“蒸馏”，是指一个模型生成器通过对另一个模型进行大量提示，从而学习其运作原理和推理过程。"
          },
          {
            "en": "It is commonly, and legitimately, used by AI labs to help train new models.",
            "cn": "人工智能实验室通常会将它用于训练新模型，这种做法是合理的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Anthropic this week released its second report alleging that Chinese labs are engaged in “illicit distillation attacks,” hiding their identities to distill without permission and relying on fraud and stolen credentials to do so.",
            "cn": "Anthropic本周发布了第二份报告，指控中国实验室从事“非法蒸馏攻击”，通过隐瞒身份在未经许可的情况下进行蒸馏，并依靠欺诈和盗取的凭证来实施这些行为。"
          },
          {
            "en": "Anthropic CEO Dario Amodei had previously publicly called on U.S. regulators to crack down on distillation.",
            "cn": "Anthropic首席执行官达里奥·阿莫迪此前曾公开呼吁美国监管机构打击“蒸馏”行为。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s notable that the commander of Silicon Valley’s prestigious and prolific startup accelerator doesn’t agree.",
            "cn": "值得注意的是，这家位于硅谷、声誉卓著且成果丰硕的初创企业加速器的负责人并不认同这一观点。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To be clear, Tan isn’t advocating for American AI labs to use stolen credentials to distill.",
            "cn": "需要明确的是，谭并不是在提倡美国的人工智能实验室使用被盗的凭证来进行数据提炼。"
          },
          {
            "en": "He wants them to be free to come in the front door.",
            "cn": "他希望他们能自由地从正门进来。"
          },
          {
            "en": "In fact, his argument is twofold.",
            "cn": "事实上，他的论点包含两方面。"
          },
          {
            "en": "He feels it’s an overreach for AI labs to dictate what their customers can do with the information their models share with them.",
            "cn": "他认为，人工智能实验室规定客户如何使用其模型与他们共享的信息，这是越权之举。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He also notes that the proprietary AI labs didn’t ask permission when they vacuumed up as much human knowledge as they could to train their models.",
            "cn": "他还指出，这些私营人工智能实验室在尽可能多地吸纳人类知识来训练其模型时，并未征得许可。"
          },
          {
            "en": "They famously ingested plenty of copyrighted material without the permission of those intellectual property holders.",
            "cn": "众所周知，他们未经这些知识产权持有人许可，大量使用了受版权保护的作品。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Tan, who is himself such an avid AI user that he once described himself as having cyber psychosis, wants to see a balance between open-weight AI labs and frontier labs.",
            "cn": "谭本人就是一位狂热的人工智能用户，他曾自嘲患有“网络精神病”，他希望在开放式人工智能实验室与前沿实验室之间找到平衡。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“They are at the frontier and driving it forward.",
            "cn": "“他们身处前沿，并正在推动其发展。"
          },
          {
            "en": "We want that to be fundable, and be a great business model ongoing,” he told CNBC.",
            "cn": "“我们希望该项目能够获得融资，并成为一个可持续发展的优秀商业模式，”他告诉CNBC。"
          },
          {
            "en": "“You want open weight models to give people freedom and access.”",
            "cn": "“你希望开放重量级车型能给人们带来自由和便利。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To him, the true AI doomer scenario is for all the immense power of frontier AI to wind up in the hands of a single powerful, proprietary provider.",
            "cn": "在他看来，真正的AI末日情景，是前沿AI的全部巨大力量最终落入一家强大且垄断的市场主导者之手。"
          },
          {
            "en": "“The nightmare scenario, the doomer scenario for AI is that there’s just one company,” he said.",
            "cn": "“人工智能领域的噩梦情景、末日情景，就是只有一家公司，”他说。"
          },
          {
            "en": "“It has the best access to capital.",
            "cn": "“它的融资渠道最为畅通。"
          },
          {
            "en": "It has the best AI researchers.",
            "cn": "它拥有最顶尖的人工智能研究人员。"
          }
        ]
      }
    ]
  },
  {
    "id": "st-the-family-stone-sequel-in-the-works-with-most",
    "cat": "明星",
    "title": "‘The Family Stone’ Sequel in the Works With Most of Original Cast Returning",
    "titleZh": "《家庭石》续集正在筹备中，原班人马大多将回归",
    "source": "Rolling Stone · 2026-09-12",
    "date": "2026-09-12",
    "minutes": 2,
    "url": "https://www.rollingstone.com/tv-movies/tv-movie-news/the-family-stone-sequel-original-cast-returning-1235625801/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/st-the-family-stone-sequel-in-the-works-with-most.jpg",
    "scoreVersion": "v2",
    "qualityScore": 96.74,
    "qualityBand": "formal",
    "difficultyBaseScore": 76.56,
    "serverScore": 74.75,
    "paras": [
      {
        "sentences": [
          {
            "en": "The beloved comedy-drama The Family Stone will receive a sequel 20 years later, with many of its original stars — Rachel McAdams, Claire Danes, Sarah Jessica Parker, and more — set to return for The Families Stone.",
            "cn": "备受喜爱的喜剧剧情片《斯通一家》将在20年后推出续集，原班主演中的许多演员——包括瑞秋·麦克亚当斯、克莱尔·丹尼斯、莎拉·杰西卡·帕克等——都将回归出演《斯通一家2》。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Searchlight Pictures officially announced the sequel to the 2005 film — which has become a holiday classic over the past two decades — on Saturday, while also confirming that Family Stone co-stars Dermot Mulroney, Craig T.",
            "cn": "周六，Searchlight Pictures 正式宣布了这部2005年电影的续集——该片在过去二十年间已成为一部节日经典——同时还确认了《家庭石》的两位主演德莫特·穆罗尼和克雷格·T."
          },
          {
            "en": "Nelson, Luke Wilson, Elizabeth Reaser, and Paul Schneider would reprise their roles, Variety reports.",
            "cn": "据《综艺》报道，纳尔逊、卢克·威尔逊、伊丽莎白·里瑟和保罗·施耐德将再次出演各自的角色。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“It’s a comedy with a dash of tragedy — the kind of thing that usually makes me puke,” Peter Travers wrote in his Rolling Stone review of the film in 2005.",
            "cn": "“这是一部夹杂着一丝悲剧色彩的喜剧——这种片子通常会让我反胃，”彼得·特拉弗斯在2005年为《滚石》杂志撰写的影评中写道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Thomas Bezucha, who wrote and directed the original, will return to those roles for The Families Stone.",
            "cn": "曾担任原版编剧和导演的托马斯·贝祖卡，将在《斯通一家》中再次担纲这两项职务。"
          },
          {
            "en": "Soon after the death of Keaton in October 2025, Bezucha revealed that he was working on a sequel to the movie.",
            "cn": "2025年10月基顿去世后不久，贝祖卡透露他正在筹备该片的续集。"
          },
          {
            "en": "“I've been haunted by the loss of Sybil for months now while I worked on it, and so this was a blow on a tender bruise already,\" Bezucha said.",
            "cn": "“在创作这部作品的这几个月里，西比尔的离世一直萦绕在我心头，因此这无异于在原本就敏感的伤口上又补了一刀，”贝祖查说道。"
          },
          {
            "en": "\"Mentally, I've been spending time in that house where I've been missing her for a while already.\"",
            "cn": "“在心理上，我一直待在那栋房子里，已经有一段时间在想念她了。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Luke Wilson confirmed earlier this year that a sequel was in the works, telling Entertainment Weekly of the script, “Tom Bezucha is a great writer and a great director, and I read the script, and it's really funny, and it's so nice that everybody wants to work together again.",
            "cn": "卢克·威尔逊今年早些时候证实续集正在筹备中，他在接受《娱乐周刊》采访时谈到剧本时说：“汤姆·贝祖查是一位出色的编剧和导演，我读过剧本，真的很搞笑，而且大家都能再次合作，这真是太好了。”"
          },
          {
            "en": "After the death of Diane Keaton, it'll be even more meaningful because she was so great to be around on the first one.\"",
            "cn": "“在黛安·基顿去世之后，这部电影会显得更加意义非凡，因为在拍摄第一部时，和她共事真是太棒了。”"
          }
        ]
      },
      {
        "img": "assets/covers/st-the-family-stone-sequel-in-the-works-with-most-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/st-the-family-stone-sequel-in-the-works-with-most-3.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/st-the-family-stone-sequel-in-the-works-with-most-4.jpg",
        "cap": ""
      }
    ]
  },
  {
    "id": "st-katie-holmes-and-jason-bard-yarmosky-nail-coup",
    "cat": "明星",
    "title": "Katie Holmes and Jason Bard Yarmosky Nail Couple Dressing With Yet Another Matching Moment",
    "titleZh": "凯蒂·霍尔姆斯和杰森·巴德·亚莫斯基再次以一套情侣装惊艳亮相，完美演绎了情侣穿搭",
    "source": "Harper's Bazaar · 2026-09-12",
    "date": "2026-09-12",
    "minutes": 2,
    "url": "https://www.harpersbazaar.com/celebrity/latest/a73698771/katie-holmes-jason-bard-yarmosky-couple-style-nyfw-photos/",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/st-katie-holmes-and-jason-bard-yarmosky-nail-coup.jpg",
    "scoreVersion": "v2",
    "qualityScore": 93.74,
    "qualityBand": "formal",
    "difficultyBaseScore": 70.24,
    "serverScore": 74.55,
    "paras": [
      {
        "sentences": [
          {
            "en": "K atie Holmes and Jason Bard Yarmosky can’t stop matching.",
            "cn": "凯蒂·霍尔姆斯和杰森·巴德·亚莫斯基总是穿得一模一样。"
          },
          {
            "en": "The couple, who went public with their relationship two months ago at a July screening of The Invite, have quickly synced their wardrobes.",
            "cn": "这对情侣于两个月前在7月举行的电影《The Invite》首映礼上公开了恋情，随后很快便在穿搭上达成了默契。"
          },
          {
            "en": "And this week, they’ve been coordinating for New York Fashion Week.",
            "cn": "本周，他们一直在为纽约时装周进行筹备工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After appearances at Cult Gaia’s September 9 show and the Net-a-Porter “Incredible Women” cocktail party on the 10th, the new couple stepped out for Calvin Klein on Friday, September 11.",
            "cn": "在出席了9月9日Cult Gaia的时装秀以及10日Net-a-Porter举办的“非凡女性”鸡尾酒会后，这对新晋情侣于9月11日星期五现身Calvin Klein的活动现场。"
          },
          {
            "en": "Here, at the Spring/Summer 2027 runway presentation, they played with neutrals, keeping things firmly in the white-and-beige palette.",
            "cn": "在这次2027年春夏时装秀上，设计师们巧妙运用中性色，将整体色调牢牢锁定在白色与米色之间。"
          }
        ]
      },
      {
        "img": "assets/covers/st-katie-holmes-and-jason-bard-yarmosky-nail-coup-1.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "Holmes, who has (almost) become just as known for her growing collection of easy button-downs as she is for Dawson’s Creek, started things off with a bright-white dress shirt.",
            "cn": "霍姆斯——她因日益丰富的简约衬衫收藏而（几乎）与《飞越情海》中的知名度不相上下——以一件亮白色的衬衫拉开了序幕。"
          },
          {
            "en": "She tucked one half of the piece into a long textured off-white skirt, designed with a super high-rise waist and full silhouette, and left the other loose.",
            "cn": "她将上衣的一半塞进一条长款、带有纹理的米白色半身裙里——这条裙子采用超高腰设计，廓形宽松——另一半则自然垂落。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The actor paired the look with matching pointed-toe slip-on shoes, crafted with the same textured feel, and carried a structured black clutch for a bit of contrast.",
            "cn": "这位演员搭配了一双同款尖头套脚鞋，鞋面采用相同的纹理质感，并手拿一款廓形利落的黑色手拿包，以营造出些许对比感。"
          },
          {
            "en": "As for her jewelry, she kept things minimal, leaving her ears and neck bare.",
            "cn": "至于首饰，她选择简约风格，耳朵和脖子都未佩戴任何饰品。"
          }
        ]
      },
      {
        "img": "assets/covers/st-katie-holmes-and-jason-bard-yarmosky-nail-coup-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/st-katie-holmes-and-jason-bard-yarmosky-nail-coup-3.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "Next to her, Yarmosky went with an off-white crewneck sweater and tan pinstripe trousers, designed with pleat detailing and long, wide legs, from which shiny black dress shoes peeked out.",
            "cn": "在她身旁，亚莫斯基身穿一件米白色圆领毛衣，搭配一条浅棕色细条纹长裤——这条长裤采用褶裥设计，裤腿修长宽大，从裤脚处露出一双闪亮的黑色正装鞋。"
          }
        ]
      },
      {
        "img": "assets/covers/st-katie-holmes-and-jason-bard-yarmosky-nail-coup-4.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "Later, the artist changed into an all-black monochrome look (sweater, trousers, shoes) for the Gemma Chan x Bloomingdale’s x Cultured Dinner, while Holmes kept her Calvin Klein fit on.",
            "cn": "随后，这位艺人换上了一身全黑的单色装扮（毛衣、长裤、鞋子），出席了Gemma Chan × Bloomingdale’s × Cultured晚宴，而霍姆斯则继续身着Calvin Klein的装扮。"
          }
        ]
      },
      {
        "img": "assets/covers/st-katie-holmes-and-jason-bard-yarmosky-nail-coup-5.jpg",
        "cap": ""
      }
    ]
  },
  {
    "id": "ai-arm-launches-total-design-for-physical-ai-and-",
    "cat": "AI",
    "title": "Arm launches Total Design for Physical AI and robotics framework",
    "titleZh": "Arm 推出面向物理人工智能和机器人技术的“全面设计”框架",
    "source": "AI News · 2026-09-08",
    "date": "2026-09-08",
    "minutes": 4,
    "url": "https://www.artificialintelligence-news.com/news/arm-total-design-for-physical-ai-and-robotics-framework/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/ai-arm-launches-total-design-for-physical-ai-and-.jpg",
    "scoreVersion": "v2",
    "qualityScore": 91.74,
    "qualityBand": "formal",
    "difficultyBaseScore": 66.42,
    "serverScore": 74.29,
    "paras": [
      {
        "sentences": [
          {
            "en": "Arm has launched Arm Total Design for Physical AI alongside a new robotics framework to establish common standards across automated systems.",
            "cn": "Arm 推出了“Arm Total Design for Physical AI”以及一个新的机器人框架，旨在为自动化系统确立共同标准。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Physical industries – spanning mining, agriculture, manufacturing, and global transport – account for trillions of dollars in economic activity and an estimated $200 billion annual compute opportunity by the 2030s.",
            "cn": "实体产业——涵盖采矿、农业、制造业和全球运输——产生的经济活动规模达数万亿美元，预计到2030年代将带来2000亿美元的年度计算需求。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To address engineering fragmentation across these sectors, Arm is convening more than 80 partner organisations spanning software, hardware, and AI.",
            "cn": "为解决这些领域中存在的工程割裂问题，Arm 正召集来自软件、硬件和人工智能领域的 80 多家合作伙伴组织。"
          },
          {
            "en": "Initial ecosystem participants include AWS, ECARX, Hugging Face, Liquid AI, NXP, PlusAI, PSYONIC, QNX, Qwen, Siemens, and Unitree Robotics.",
            "cn": "首批生态系统参与者包括 AWS、ECARX、Hugging Face、Liquid AI、恩智浦（NXP）、PlusAI、PSYONIC、QNX、Qwen、西门子（Siemens）和 Unitree Robotics。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The initiative targets physical systems that combine AI models, runtime software, compute silicon, sensors, and actuators to sense, reason, and act in operational environments.",
            "cn": "该计划旨在研发能够将人工智能模型、运行时软件、计算芯片、传感器和执行器相结合的物理系统，使其在运行环境中实现感知、推理和行动。"
          },
          {
            "en": "Hardware manufacturers and software developers require standardised baselines to reduce integration risk, optimise compute workloads, and move from proof-of-concept testing to deployment at scale.",
            "cn": "硬件制造商和软件开发商需要标准化的基准，以降低集成风险、优化计算工作负载，并从概念验证测试过渡到大规模部署。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Robotics currently lacks a common method to describe, compare, and communicate system capabilities, according to an architectural manifesto (PDF) published by Arm chief architect Richard Grisenthwaite.",
            "cn": "据Arm首席架构师理查德·格里森斯韦特（Richard Grisenthwaite）发布的一份架构宣言（PDF）称，机器人领域目前缺乏一种通用的方法来描述、比较和传达系统能力。"
          },
          {
            "en": "This fragmentation makes robotic systems harder to design, integrate, and scale across industrial deployments.",
            "cn": "这种碎片化使得机器人系统的设计、集成以及在工业应用中的扩展变得更加困难。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In response, Arm has introduced the Robotics Capability Framework as a collaborative starting point for a shared technical vocabulary, patterned after the SAE Levels used for driving automation.",
            "cn": "为此，Arm推出了“机器人能力框架”（Robotics Capability Framework），将其作为建立共同技术术语体系的合作起点，该框架借鉴了驾驶自动化领域使用的SAE等级标准。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Arm’s new framework categorises robotic systems across progressing tiers of operational sophistication, mapping machines from reactive setups to context-aware, cognitive, and self-improving systems.",
            "cn": "Arm的新框架根据操作复杂程度的递进等级对机器人系统进行了分类，将机器从被动响应型系统划分为情境感知型、认知型和自我优化型系统。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Each capability tier links real-world use cases to machine behaviours, outputs, and hardware constraints.",
            "cn": "每个能力层都将现实世界中的用例与机器行为、输出结果和硬件限制联系起来。"
          },
          {
            "en": "These criteria establish parameters for system latency, compute placement, memory allocation, power constraints, determinism, and safety standards.",
            "cn": "这些标准为系统延迟、计算资源调度、内存分配、功耗限制、确定性以及安全标准确立了相关参数。"
          }
        ]
      },
      {
        "img": "assets/covers/ai-arm-launches-total-design-for-physical-ai-and--1.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "Arm developed the initial baseline using feedback from across the robotics sector.",
            "cn": "Arm 根据来自整个机器人行业的反馈，制定了初步基准。"
          },
          {
            "en": "Participating organisations contributing to the framework include Anaxi Labs, ANYbotics, FMC³ Robotics, Fourier, GALBOT, Gravis Robotics, Lenovo, McKinsey, and Robotec.ai.",
            "cn": "参与该框架建设的机构包括：Anaxi Labs、ANYbotics、FMC³ Robotics、Fourier、GALBOT、Gravis Robotics、联想、麦肯锡和Robotec.ai。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Arm Total Design for Physical AI extends a collaborative development structure previously used for cloud AI infrastructure.",
            "cn": "Arm 面向物理人工智能的整体设计（Total Design for Physical AI）扩展了此前用于云人工智能基础设施的协作开发架构。"
          },
          {
            "en": "The programme brings together AI models, virtual platforms, digital twins, sensors, compute silicon, and software stacks to enable earlier development and testing cycles.",
            "cn": "该计划整合了人工智能模型、虚拟平台、数字孪生、传感器、计算芯片和软件堆栈，从而实现更早的开发和测试周期。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Autonomous transport and robotics face common technical requirements across sensory perception, AI processing, real-time control, safety, and power-efficient compute.",
            "cn": "自动驾驶和机器人技术在感知、人工智能处理、实时控制、安全以及节能计算等方面面临着共同的技术要求。"
          },
          {
            "en": "Arm demonstrated this collaborative methodology in the automotive sector alongside AWS, Google, HERE, RemotiveLabs, and Siemens.",
            "cn": "Arm 与 AWS、Google、HERE、RemotiveLabs 和西门子携手，在汽车领域展示了这一协作方法。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The participating automotive companies developed an integrated digital cockpit reference solution.",
            "cn": "参与的汽车企业共同开发了一套集成式数字座舱参考方案。"
          },
          {
            "en": "This environment enabled software engineering teams to develop, test, and validate complex automotive code on the Arm Zena CSS platform prior to physical silicon availability.",
            "cn": "该环境使软件工程团队能够在实体芯片问世之前，就在 Arm Zena CSS 平台上开发、测试和验证复杂的汽车代码。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Arm is now soliciting technical contributions from the wider engineering community to expand the Robotics Capability Framework as physical AI implementations progress.",
            "cn": "随着物理人工智能的实施不断推进，Arm 目前正向更广泛的工程界征集技术贡献，以扩展其机器人能力框架。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Learn more about physical AI during the Physical AI Expo held in Amsterdam, London, and North America.",
            "cn": "在阿姆斯特丹、伦敦和北美举办的“物理人工智能博览会”上，深入了解物理人工智能。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "See also: NVIDIA Jetson Orin Nano 2 brings physical AI to drones and robots",
            "cn": "另请参阅：NVIDIA Jetson Orin Nano 2 为无人机和机器人带来物理人工智能"
          }
        ]
      },
      {
        "img": "assets/covers/ai-arm-launches-total-design-for-physical-ai-and--2.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "AI News is powered by TechForge Media.",
            "cn": "AI News 由 TechForge Media 提供支持。"
          }
        ]
      }
    ]
  }
];

/* 合并进 ARTICLES（按 url / id 去重，避免和 data.js 里的文章重复） */
if (typeof ARTICLES !== "undefined" && typeof ARTICLES.push === "function") {
  const _haveUrl = new Set(ARTICLES.map(a => a.url));
  const _haveId = new Set(ARTICLES.map(a => a.id));
  ARTICLES_EXTRA.forEach(a => {
    if (!_haveUrl.has(a.url) && !_haveId.has(a.id)) ARTICLES.push(a);
  });
}
