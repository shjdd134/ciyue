/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 14 篇；RSS 文章保留来源英文，中文为机器翻译学习注释。
 * 人物类由 tools/people.mjs 写入公开原刊正文与图片；广告/导航块过滤，来源与署名保留。
 * 每篇保留 url 外链可溯源。来源：Dan Koe / Vogue
 *
 * 通道：人物 reviewed queue（tools/people.mjs）。足球 / 成长 RSS 与 AI / 旧明星历史通道均已停用 ——
 *       2026-09-17 起 FEEDS 为空，本脚本不再抓取任何 RSS；仍保留 --prune / --refill /
 *       --dump-* 这些**不依赖 FEEDS** 的存量维护入口。
 * pin: true 的专题不按 30 天过期，且不占栏目配额。
 */

const ARTICLES_EXTRA = [
  {
    "id": "gr-how-to-fix-your-entire-life-in-1-day",
    "cat": "成长",
    "title": "How to fix your entire life in 1 day",
    "titleZh": "如何在一天内彻底改变你的人生",
    "source": "Dan Koe · 2025-12-23",
    "date": "2025-12-23",
    "minutes": 36,
    "url": "https://letters.thedankoe.com/p/how-to-fix-your-entire-life-in-1",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/gr-how-to-fix-your-entire-life-in-1-day.jpg",
    "paras": [
      {
        "sentences": [
          {
            "en": "do this before 2026",
            "cn": "在2026年之前做到这一点"
          }
        ]
      },
      {
        "en": "You’re probably going to quit your new years resolution.",
        "cn": "你很可能最终会放弃你的新年决心。"
      },
      {
        "sentences": [
          {
            "en": "And that’s okay.",
            "cn": "这没关系。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Most people do (studies show 80-90% failure rates) because most people don’t actually want to change on a deep, internal level.",
            "cn": "大多数人确实如此（研究表明失败率在80%至90%之间），因为大多数人实际上并不想在内心深处真正做出改变。"
          },
          {
            "en": "That is, they go about changing their life in the completely wrong way.",
            "cn": "也就是说，他们改变生活的方式完全错了。"
          },
          {
            "en": "They create a new years resolution because everyone else does – humans want to impress others more than they want to impress themselves...",
            "cn": "他们制定新年计划，只是因为其他人都在这么做——人类想要给别人留下好印象，远胜于想要让自己满意……"
          },
          {
            "en": "we create a superficial meaning out of status games – but they don’t meet the requirements for true change, which goes a lot deeper than convincing yourself you’re going to be more disciplined or productive this year.",
            "cn": "我们从“地位游戏”中创造出一种肤浅的意义——但这些并不能满足真正改变的要求，真正的改变远比说服自己“今年要更有纪律性或更高效”要深得多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m not here to talk down on you.",
            "cn": "我来这里不是为了贬低你。"
          },
          {
            "en": "I’ve quit 10 times more goals than I’ve set.",
            "cn": "我放弃的目标数量是我设定目标数量的10倍。"
          },
          {
            "en": "I think that should be the case for most people.",
            "cn": "我认为对大多数人来说应该就是这样。"
          },
          {
            "en": "But the fact that people try to change their lives and utterly fail almost every time holds true.",
            "cn": "但人们试图改变生活却几乎每次都彻底失败这一事实，确实如此。"
          },
          {
            "en": "So much so that it’s a meme for the gym to be crowded during January and return back to normal in February.",
            "cn": "甚至已经形成了一种网络梗：一月份健身房总是人满为患，到了二月份又恢复如常。"
          }
        ]
      },
      {
        "en": "However, as much as I think new years resolutions are stupid, it’s always wise to reflect on the life you hate so you can launch yourself toward something that much better, as we will discuss.",
        "cn": "不过，尽管我觉得新年决心很蠢，但正如我们将要讨论的那样，反思自己讨厌的生活总是明智之举，这样你才能朝着更美好的未来迈进。"
      },
      {
        "sentences": [
          {
            "en": "Human nature is a b*tch, and the worst feeling is when you make a promise to yourself and can’t help but break it.",
            "cn": "人性真是个婊子，最糟糕的感觉莫过于对自己许下承诺，却又情不自禁地违背了它。"
          },
          {
            "en": "You start to feel helpless, and if you don’t know what you’re doing, you may continue the cycle for years on end: always wanting to change, but never being able to.",
            "cn": "你会开始感到无助，如果不知道该怎么做，这种循环可能会持续好几年：总是想改变，却始终无法做到。"
          }
        ]
      },
      {
        "en": "So whether you want to start the business, transform your body, or take the risk toward a more meaningful life without quitting after 2 weeks, I want to share 7 ideas you probably haven’t heard before on behavior change, psychology, and productivity so you can do just that in 2026.",
        "cn": "因此，无论你是想创业、塑造身材，还是愿意冒险追求更有意义的生活（而不是两周后就半途而废），我都想与你分享7个关于行为改变、心理学和效率提升的见解——这些内容你可能从未听过——希望你能借此在2026年实现这些目标。"
      },
      {
        "sentences": [
          {
            "en": "This will be comprehensive.",
            "cn": "这将是一个全面的探讨。"
          }
        ]
      },
      {
        "en": "This isn’t one of those letters that you read through and forget about.",
        "cn": "这可不是那种读完就忘的信。"
      },
      {
        "en": "This is something you will want to bookmark, take notes on, and set aside time to think about.",
        "cn": "这篇文章值得你收藏、做笔记，并专门抽出时间来思考。"
      },
      {
        "en": "The protocol at the end – to dig deep into your psyche and uncover what you truly want in life – will take about a full day to complete, with effects that last far longer than that.",
        "cn": "文末介绍的这个流程——深入探索你的内心，发掘你对人生的真正渴望——大约需要一整天的时间来完成，而其效果将远不止于此。"
      },
      {
        "img": "assets/covers/gr-how-to-fix-your-entire-life-in-1-day-1.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "All I ask is that you dedicate your full attention to this.",
            "cn": "我只希望你能全神贯注地做这件事。"
          },
          {
            "en": "If you get bored skip to the next section and go back to fill in the blanks if you need to.",
            "cn": "如果你觉得无聊，可以跳到下一节，如有需要，再回来填空。"
          }
        ]
      },
      {
        "en": "I – You aren’t where you want to be because you aren’t the person who would be there",
        "cn": "I——你之所以没能达到理想的状态，是因为你还不是那个能达到理想状态的人"
      },
      {
        "en": "When it comes to New Year’s resolutions, people only focus on one of the two requirements for success:",
        "cn": "说到新年决心，人们往往只关注成功所需的两个条件中的一个："
      },
      {
        "en": "Changing your actions to make progress toward the goal (least important, second order)",
        "cn": "改变你的行为，以朝目标推进（最不重要，第二序）"
      },
      {
        "en": "Changing who you are so that your behavior naturally follows (most important, first order)",
        "cn": "改变你是什么样的人，让行为自然而然地随之改变（最重要，第一序）"
      },
      {
        "en": "Most people set a surface-level goal, hype themselves up to remain disciplined for the first few weeks, then go back to their old ways without much struggle, because they were trying to build a great life on a rotting foundation.",
        "cn": "大多数人只会设定一个肤浅的目标，在前几周靠自我激励来保持自律，随后便毫不费力地故态复萌，因为他们试图在腐朽的地基上建造美好的人生。"
      },
      {
        "en": "If this doesn’t make sense, let’s run through an example.",
        "cn": "如果这听起来不太通顺，让我们通过一个例子来解释一下。"
      },
      {
        "sentences": [
          {
            "en": "Think of somebody successful.",
            "cn": "试着想想某个成功人士。"
          }
        ]
      },
      {
        "en": "It can be a bodybuilder with a great physique, a founder/CEO worth hundreds of millions, or a charismatic dude who can chat up a group without a shred of anxiety entering his mind space.",
        "cn": "他可能是身材健美的健美运动员，身家数亿的创始人/CEO，也可能是那位能从容不迫地与一群人畅谈、心中毫无焦虑的魅力型人物。"
      },
      {
        "sentences": [
          {
            "en": "Do you think the bodybuilder has to “grind” to eat healthy?",
            "cn": "你认为健美运动员必须“拼命努力”才能吃得健康吗？"
          },
          {
            "en": "Does the CEO have to discipline themselves to show up and lead the team?",
            "cn": "首席执行官是否必须严格要求自己，坚持到岗并领导团队？"
          },
          {
            "en": "To you, it may seem like that on the surface, but the truth is that they can’t see themselves living any other way.",
            "cn": "在你看来，表面上或许是这样，但事实是，他们无法想象自己过着其他样子的生活。"
          },
          {
            "en": "The bodybuilder has to grind to eat unhealthily.",
            "cn": "而健美运动员要吃不健康的东西，反倒得硬撑着。"
          },
          {
            "en": "The CEO has to force themself to lie in bed past their alarm clock, and they hate every second of it.",
            "cn": "这位首席执行官不得不强迫自己躺在床上，直到闹钟响了之后，而他讨厌这每一秒。"
          }
        ]
      },
      {
        "en": "To some people, my own lifestyle seems a bit extreme and disciplined.",
        "cn": "在某些人眼里，我的生活方式似乎有些极端且纪律严明。"
      },
      {
        "img": "assets/covers/gr-how-to-fix-your-entire-life-in-1-day-2.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "To me, it’s natural, and I don’t say that to contrast it with any other kind of lifestyle.",
            "cn": "对我来说，这是很自然的事，我这么说并不是为了把它与任何其他生活方式加以对比。"
          },
          {
            "en": "I simply enjoy living this way.",
            "cn": "我就是喜欢这种生活方式。"
          },
          {
            "en": "When my mom tells me that I should take a break, go out, and have some fun...",
            "cn": "每当我妈妈告诉我，我应该休息一下，出去走走，放松一下……"
          },
          {
            "en": "I hold my tongue from telling her, “If I weren’t having fun, why would I be doing what I’m doing?”",
            "cn": "我忍住了没对她说：“如果我不觉得开心，我为什么要这么做呢？”"
          }
        ]
      },
      {
        "en": "Do not take this next sentence lightly.",
        "cn": "请不要轻视接下来这句话。"
      },
      {
        "en": "If you want a specific outcome in life, you must have the lifestyle that creates that outcome long before you reach it.",
        "cn": "如果你想在生活中获得特定的结果，就必须在达到那个结果之前很久，就养成能够带来这种结果的生活方式。"
      },
      {
        "sentences": [
          {
            "en": "If someone says they want to lose 30 pounds, I often don’t believe them.",
            "cn": "如果有人说想减掉30磅，我通常不会相信。"
          },
          {
            "en": "Not because I don’t think they are capable, but because there are too many times when that same person says “they can’t wait until they’re done losing weight so they can start to enjoy life again.” I hate to break it to you, but if you don’t adopt the lifestyle that led to you losing the weight, for life,",
            "cn": "并不是因为我觉得他们做不到，而是因为有太多时候，同一个人会说：“真盼着能早点瘦下来，这样就能重新开始享受生活了。”虽然我不想让你失望，但如果你不终身坚持那种让你成功减重的生活方式，"
          },
          {
            "en": "and find a reason with a higher gravitational pull than the one tying you to your previous ways, then you will go straight back to where you started, and you can unhappily say that you wasted the resource you will never get back: time.",
            "cn": "而且如果你找不到一个理由，其吸引力比将你束缚在旧习惯中的那种更强，那么你就会直接回到原点，届时你只能遗憾地承认，自己浪费了永远无法挽回的资源：时间。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you truly change yourself, all of your habits that don’t move the needle toward your goal become disgusting, because you have a deep and profound awareness of what kind of life those actions compound into.",
            "cn": "当你真正改变自己时，所有无法推动你向目标迈进的习惯都会让你感到厌恶，因为你深刻而透彻地意识到，这些行为日积月累会造就怎样的生活。"
          },
          {
            "en": "You are okay with your current standards because you are not fully aware of what they are or what they lead to.",
            "cn": "你之所以能接受自己目前的标准，是因为你并没有完全意识到这些标准究竟是什么，以及它们会带来什么后果。"
          },
          {
            "en": "We will discuss how to uncover this, but we need to build up to that.",
            "cn": "我们将讨论如何查明这一点，但需要先逐步铺垫。"
          },
          {
            "en": "You say you want to change.",
            "cn": "你说你想改变。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You say you want to “become financially free” and “get healthy,” but your actions show otherwise for a reason.",
            "cn": "你说你想“实现财务自由”和“保持健康”，但你的行为却表明事实并非如此，这自有其原因。"
          },
          {
            "en": "And it goes a lot deeper than you think.",
            "cn": "而且，这远比你想象的要深得多。"
          }
        ]
      },
      {
        "en": "II – You aren’t where you want to be because you don’t want to be there",
        "cn": "II——你之所以没能到达理想的位置，是因为你根本不想去那里"
      },
      {
        "sentences": [
          {
            "en": "Trust only movement.",
            "cn": "只相信行动。"
          }
        ]
      },
      {
        "img": "assets/covers/gr-how-to-fix-your-entire-life-in-1-day-3.jpg",
        "cap": ""
      },
      {
        "en": "Life happens at the level of events, not of words.",
        "cn": "生活发生在事件层面，而非言语层面。"
      },
      {
        "sentences": [
          {
            "en": "Trust movement.",
            "cn": "相信行动。"
          }
        ]
      },
      {
        "en": "If you want to change who you are, you must understand how the mind works so that you can start to reprogram it.",
        "cn": "如果你想改变自己，就必须了解心智的运作方式，这样才能开始对它重新编程。"
      },
      {
        "sentences": [
          {
            "en": "The first step to understanding the mind is to understand that all behavior is goal-oriented.",
            "cn": "理解心智的第一步，是认识到所有行为都是目标导向的。"
          },
          {
            "en": "When you think about it, this is kinda obvious, but when we dig into it, most people don’t want to hear it.",
            "cn": "仔细想想，这其实挺显而易见的，但一旦深入探讨，大多数人却不愿听。"
          }
        ]
      },
      {
        "en": "You take a step forward because you want to reach a certain location.",
        "cn": "你迈出一步，是因为你想抵达某个地方。"
      },
      {
        "en": "You scratch your nose because you want to make the itch go away.",
        "cn": "你挠鼻子，是因为你想让那股痒感消失。"
      },
      {
        "sentences": [
          {
            "en": "Those ones are clear, but most of the time, your goals are unconscious.",
            "cn": "这些目标很明确，但大多数时候，你的目标是潜意识的。"
          },
          {
            "en": "You may not realize that when you sit on the couch in the middle of the day, you are trying to burn time before your next responsibility, as one simple example.",
            "cn": "你可能没有意识到——举个简单的例子——当你在白天坐在沙发上时，其实是在消磨时间，等着下一件事到来。"
          }
        ]
      },
      {
        "en": "On an even more unconscious and complex level, you pursue goals that can harm you, but you justify your actions in a way that is socially acceptable and doesn’t make you seem like a loser.",
        "cn": "在更深层、更复杂的潜意识层面，你会追求那些可能伤害自己的目标，但你会以一种社会上能被接受、且不会让你显得像个失败者的方式来为自己的行为辩解。"
      },
      {
        "sentences": [
          {
            "en": "As an example, if you can’t stop procrastinating your work, you may justify it with the fact that you “lack discipline,” but in reality, you are attempting to achieve a goal like you always are.",
            "cn": "举个例子，如果你总是拖延工作，可能会以“缺乏自律”为借口来为自己开脱，但实际上，你和往常一样，仍在努力实现某个目标。"
          },
          {
            "en": "In this case, that goal could be to protect yourself from the judgment that comes from finishing and sharing your work.",
            "cn": "在这种情况下，这个目标可能是为了避免因完成并分享自己的作品而招致的评判。"
          }
        ]
      },
      {
        "en": "If you say you want to quit your dead-end job, but stay in it without any real reason, you may start to think you don’t have enough courage, or that you were never really a “risk taker,” but the truth is that you are pursuing the goal of safety, predictability, and an excuse to not look like a failure to everyone else in your life who also works a dead-end job.",
        "cn": "如果你嘴上说想辞掉这份死胡同般的工作，却又在没有正当理由的情况下继续留任，你可能会开始认为自己不够勇敢，或者觉得自己从来就不是一个“敢于冒险的人”，但事实是，你追求的不过是安全感、可预测性，以及一个借口——这样在生活中那些同样从事死胡同工作的人眼中，你就不会显得像个失败者。"
      },
      {
        "en": "The lesson here is that real change requires changing your goals.",
        "cn": "这里要汲取的教训是：真正的改变需要改变你的目标。"
      },
      {
        "img": "assets/covers/gr-how-to-fix-your-entire-life-in-1-day-4.jpg",
        "cap": ""
      },
      {
        "sentences": [
          {
            "en": "I don’t mean setting some surface level goal because the act of doing that serves an unconscious goal that is actually harming you.",
            "cn": "我并不是说要设定一些肤浅的目标，因为这样做实际上是在为一个潜意识中的目标服务，而这个目标反而会伤害你。"
          },
          {
            "en": "That’s been ran through enough in the productivity space.",
            "cn": "在生产力领域，这一点已经被讨论得够多了。"
          },
          {
            "en": "I mean changing your point of view.",
            "cn": "我的意思是改变你的观点。"
          },
          {
            "en": "Because that’s what a goal is.",
            "cn": "因为，这正是目标的本质。"
          },
          {
            "en": "A goal is a projection into the future that acts as a lens of perception which allows you to notice information, ideas, and resources that aid in you achieving that goal.",
            "cn": "目标是对未来的展望，它如同一个认知的透镜，让你能够注意到有助于实现该目标的信息、想法和资源。"
          }
        ]
      },
      {
        "en": "Now let’s dig a bit deeper, because if you don’t understand this, it only becomes more difficult to get out.",
        "cn": "现在让我们深入探讨一下，因为如果你不理解这一点，想要摆脱困境只会变得更加困难。"
      },
      {
        "en": "III – You aren’t where you want to be because you’re afraid to be there",
        "cn": "III——你之所以没能到达理想之地，是因为你害怕抵达那里"
      },
      {
        "sentences": [
          {
            "en": "The important thing for you to remember is that it does not matter in the least how you got the idea or where it came from.",
            "cn": "你需要记住的一点是，这个想法是如何产生的、从哪里来的，这些都完全不重要。"
          },
          {
            "en": "You may never have met a professional hypnotist.",
            "cn": "你可能从未见过专业的催眠师。"
          },
          {
            "en": "You may never have been formally hypnotized.",
            "cn": "你可能从未接受过正式的催眠。"
          },
          {
            "en": "But if you have accepted an idea - from yourself, your teachers, your parents, friends, advertisements, from any other source - and further, if you are firmly convinced that idea is true, it has the same power over you as the hypnotist’s words have over the hypnotized subject.",
            "cn": "但是，如果你已经接受了一个观念——无论这个观念来自你自己、老师、父母、朋友、广告，还是其他任何来源——而且，如果你坚信这个观念是正确的，那么它对你的影响力，就如同催眠师的话语对被催眠者所产生的影响一样。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Here’s how you’ve become who you are today, and how you will become who you will be tomorrow.",
            "cn": "这就是你如何成为今天的自己，以及你将如何成为明天的自己。"
          },
          {
            "en": "This is the anatomy of identity:",
            "cn": "这就是身份的构成："
          },
          {
            "en": "You want to achieve a goal",
            "cn": "你想实现一个目标"
          }
        ]
      },
      {
        "en": "You perceive reality through the lens of that goal",
        "cn": "你通过那个目标的视角来感知现实"
      },
      {
        "en": "You only notice “important” information and ideas that allows you to achieve that goal (learning)",
        "cn": "你只会注意到那些能帮助你实现该目标（学习）的“重要”信息和观点。"
      },
      {
        "en": "You act toward that goal and receive feedback that you are progressing toward it",
        "cn": "你朝着这个目标采取行动，并收到反馈，得知自己正在朝着该目标迈进"
      },
      {
        "en": "You repeat that behavior until it becomes automatic and unconscious (conditioning)",
        "cn": "你不断重复这种行为，直到它成为一种自动且无意识的反应（条件反射）"
      },
      {
        "en": "That behavior becomes a part of who you think you are (”I am the type of person who...”)",
        "cn": "这种行为会成为你自我认知的一部分（“我就是那种……的人”）。"
      },
      {
        "en": "You defend your identity to maintain psychological consistency",
        "cn": "你捍卫自己的身份认同，是为了维持心理的一致性"
      },
      {
        "en": "Your identity shapes new goals, restarting the cycle, and if that identity is disadvantageous toward a good life, this gets bad very quick",
        "cn": "你的身份会塑造新的目标，从而重新启动这一循环；如果这种身份不利于过上美好生活，情况就会很快变得糟糕。"
      },
      {
        "en": "The unfortunate reality is that you must break the cycle between steps 6 and 7, but this process starts when you are a child.",
        "cn": "不幸的是，现实情况是，你必须打破第6步和第7步之间的循环，但这个过程早在你还是孩子的时候就已经开始了。"
      },
      {
        "sentences": [
          {
            "en": "You have the goal of survival.",
            "cn": "你的目标是生存。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You are dependent on your parents to teach you how to survive.",
            "cn": "你依赖父母教你如何生存。"
          },
          {
            "en": "You had to conform.",
            "cn": "你不得不随波逐流。"
          },
          {
            "en": "And since the way most people teach is through reward and punishment, unless you adopt their beliefs and values, you will be punished.",
            "cn": "而且，由于大多数人都是通过奖惩的方式来教育他人的，因此，除非你接受他们的信念和价值观，否则就会受到惩罚。"
          },
          {
            "en": "You don’t actually think for yourself until you see through this.",
            "cn": "除非看透这一点，否则你其实并没有真正独立思考。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But your parents have also gone through this process throughout their entire lives.",
            "cn": "但你的父母也一直在这一过程中度过他们的一生。"
          },
          {
            "en": "That’s where it can get dangerous.",
            "cn": "这正是危险所在。"
          },
          {
            "en": "Your parents, unless they broke the pattern themselves, were conditioned by the culturally accepted ideas of success from the Industrial age.",
            "cn": "你的父母——除非他们自己打破了这种模式——否则都受工业时代那些被文化认可的成功观念所塑造。"
          },
          {
            "en": "They also carry the best and worst conditioning from their parents and their parents’ parents.",
            "cn": "他们还背负着来自父母乃至祖父母的最好与最坏的条件反射。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To take it a layer deeper, once you fulfill your physical survival needs (which is quite easy to do in today’s world, you’re practically born into safety), you start to survive on the conceptual or ideological level.",
            "cn": "再深入一层来看，一旦满足了生理上的生存需求（在当今世界，这相当容易，你几乎是从安全环境中出生的），你就开始在概念或意识形态层面寻求生存了。"
          },
          {
            "en": "You may not try to protect and reproduce your body, but you absolutely protect and reproduce your mind.",
            "cn": "你或许不会试图保护和延续自己的身体，但你绝对会保护和延续自己的心灵。"
          },
          {
            "en": "It’s not difficult to see the war of ideas on the internet, and the participants are individual and group identities.",
            "cn": "在互联网上，不难看到一场思想之战，而参与者则是个人和群体的身份认同。"
          }
        ]
      },
      {
        "en": "When your body feels threatened, you go into fight or flight.",
        "cn": "当你的身体感到受到威胁时，你会进入“战斗或逃跑”状态。"
      },
      {
        "en": "When your identity feels threatened, the same thing happens.",
        "cn": "当你的身份认同感到受到威胁时，同样的情况也会发生。"
      },
      {
        "sentences": [
          {
            "en": "If you are heavily identified with a political ideology (by the process we talked about just before), you will feel threatened when someone challenges your beliefs.",
            "cn": "如果你（通过我们刚才讨论过的过程）对某种政治意识形态产生了强烈的认同感，那么当有人质疑你的信念时，你就会感到受到威胁。"
          },
          {
            "en": "You literally feel the stress.",
            "cn": "你确实能切身感受到这种压力。"
          },
          {
            "en": "You feel, emotionally, like you were just slapped in the face.",
            "cn": "从情感上来说，你感觉就像刚被人扇了一巴掌。"
          },
          {
            "en": "Since most people don’t analyze their emotions for truth, you tend to get stuck in echo chambers and double down on claims that harm yourself and others.",
            "cn": "由于大多数人不会深入剖析自己的情绪以探求真相，因此人们往往会陷入“回音室”，并愈发坚持那些既伤害自己又伤害他人的说法。"
          }
        ]
      },
      {
        "en": "If you were raised in a religious household, and did not think for yourself, you will fight and attack others who threaten your psychological safety within that little bubble.",
        "cn": "如果你是在一个虔诚的宗教家庭中长大的，且从未独立思考过，那么当有人威胁到你在那个小圈子里的心理安全时，你就会与之对抗并攻击对方。"
      },
      {
        "en": "The same thing happens when you unconsciously see yourself as a lawyer, a gamer, or somebody else who would not take the actions to achieve a better life.",
        "cn": "当你下意识地把自己看作一名律师、一名游戏玩家，或是其他不会采取行动来改善生活的人时，也会发生同样的情况。"
      },
      {
        "en": "IV – The life you want lies within a specific level of mind",
        "cn": "IV——你所向往的生活，存在于特定的心智层级之中"
      },
      {
        "en": "The mind evolves through predictable stages over time.",
        "cn": "随着时间的推移，思维会经历可预测的阶段而不断演进。"
      },
      {
        "sentences": [
          {
            "en": "When you’re born, you’re like a little survival sponge that absorbs whatever beliefs you can (which are heavily dictated by your culture) so that you can feel safe and secure.",
            "cn": "人一出生，就像一块小小的“生存海绵”，会尽可能地吸收各种信念（这些信念在很大程度上受文化影响），以此获得安全感。"
          },
          {
            "en": "And if you don’t be careful, your mind may crystalize and it may make it difficult to live a meaningful life.",
            "cn": "而且，如果你不留心，你的心智可能会固化，让你难以过上有意义的生活。"
          }
        ]
      },
      {
        "en": "This has been documented enough in models like Maslow’s Hierarchy, Greuter’s stages of ego development, and Spiral Dynamics, each building off of one another, but it’s also not difficult to observe in society.",
        "cn": "马斯洛需求层次理论、格鲁特自我发展阶段理论以及螺旋动力学等模型对此已有充分论述，这些理论彼此相互承前启后，但在社会中也不难观察到这种现象。"
      },
      {
        "en": "I’ve talked about these many times, and synthesized them into my own Human 3.0 model, but here’s the 80/20 of the 9 stages of ego development as a refresher (because repetition helps reveal things you didn’t notice before, and there are new people reading these letters):",
        "cn": "我曾多次谈及这些内容，并将其整合到我自己的“人类3.0”模型中，但为了让大家温故知新，这里简要概述一下自我发展九个阶段中的80/20原则（因为重复有助于发现之前未曾注意到的细节，而且也有新读者在阅读这些信件）："
      },
      {
        "sentences": [
          {
            "en": "Impulsive — No separation between impulse and action.",
            "cn": "冲动——冲动与行动之间没有界限。"
          },
          {
            "en": "Black and white thinking.",
            "cn": "非黑即白的思维方式。"
          },
          {
            "en": "I.e. A toddler hits when angry because the feeling and the behavior are the same thing.",
            "cn": "也就是说，幼儿生气时会打人，因为对他们来说，情绪和行为是同一回事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Self-Protective — The world is dangerous and you learn to look out for yourself.",
            "cn": "自我保护——这个世界充满危险，你学会了保护自己。"
          },
          {
            "en": "I.e. A kid learns to hide report cards, lie about chores, and figure out what adults want to hear.",
            "cn": "也就是说，一个孩子学会了藏起成绩单、谎报家务完成情况，并摸清大人们想听什么。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Conformist — You are your group and its rules feel like reality itself.",
            "cn": "顺从者——你就是你所在的群体，而该群体的规则在你看来就是现实本身。"
          },
          {
            "en": "I.e. Someone who genuinely cannot fathom why anyone would vote differently than their family or group.",
            "cn": "也就是说，有人真的无法理解，为什么有人会在投票时与自己的家人或群体持不同意见。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Self-Aware — You notice you have an inner life that doesn’t match the exterior.",
            "cn": "自我觉察——你意识到自己的内心世界与外表并不一致。"
          },
          {
            "en": "I.e. Sitting in church and realizing you’re not sure you believe what everyone around you seems to believe, but not knowing what to do with that feeling yet.",
            "cn": "也就是说，坐在教堂里，你意识到自己并不确定是否相信周围人似乎都相信的东西，但又不知道该如何处理这种感觉。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Conscientious — You build your own system of principles and hold yourself accountable to them.",
            "cn": "尽责——你建立起自己的一套原则体系，并恪守这些原则。"
          },
          {
            "en": "I.e. Leaving your family’s religion after careful study and adopting a personal philosophy you can defend, or building a career plan with clear milestones because you believe the right effort yields the right results.",
            "cn": "也就是说，经过仔细研究后脱离家族宗教，转而采纳一种你能捍卫的个人哲学；或者制定包含明确里程碑的职业规划，因为你相信正确的努力会带来正确的结果。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Individualist — You see that your principles were shaped by context and start holding them more loosely.",
            "cn": "个人主义者——你意识到自己的原则是由具体情境所塑造的，于是开始对这些原则持更开放的态度。"
          },
          {
            "en": "I.e. Realizing your political views have more to do with where you grew up than objective truth, or noticing that your ambitious career goals were really about earning your father’s approval.",
            "cn": "也就是说，意识到自己的政治观点更多取决于成长环境，而非客观真理；或者察觉到自己雄心勃勃的职业目标，其实是为了赢得父亲的认可。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Strategist — You work with systems while aware of your own involvement in them.",
            "cn": "战略家——你在与系统打交道的同时，也意识到自己身处其中。"
          },
          {
            "en": "I.e. Leading an organization while actively questioning your own blind spots, or engaging in politics knowing your perspective is partial and shaped by bias you can’t fully see.",
            "cn": "也就是说，在领导一个组织的同时积极审视自身的盲点，或者在参与政治博弈时，明知自己的视角是片面的，且受到自身未能完全察觉的偏见所影响。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Construct-Aware — You see all frameworks, including your identity, as useful fictions.",
            "cn": "构造觉知——你将所有框架，包括你的身份认同，都视为有用的虚构。"
          },
          {
            "en": "I.e. Holding your spiritual beliefs with metaphorically not literally, knowing the map is not the territory, or watching yourself play the role of “founder” or “thought leader” with a kind of gentle amusement.",
            "cn": "也就是说，将精神信仰视为隐喻而非字面意义；明白“地图并非领土”；或是带着一种温和的自嘲，观察自己扮演“创始人”或“思想领袖”的角色。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Unitive — Separation between self and life dissolves.",
            "cn": "合一——自我与生命之间的隔阂消融。"
          },
          {
            "en": "I.e. Work, rest, and play feel like the same thing.",
            "cn": "也就是说，工作、休息和玩乐感觉上并无二致。"
          },
          {
            "en": "There’s no one left who needs to become something, just presence responding to what arises.",
            "cn": "已经没有人需要成为什么了，只有当下的存在，对所生起的一切作出回应。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For most people reading this, I would assume you hover between 4 and 8, which is a huge gap.",
            "cn": "对于正在阅读本文的大多数人来说，我猜你们大致处在第 4 到第 8 阶段之间，这中间的跨度可不小。"
          },
          {
            "en": "Those closer to 8 are reading this are doing so to either learn something or pass time.",
            "cn": "那些接近第 8 阶段、正在阅读本文的人，要么是为了学点东西，要么是为了打发时间。"
          },
          {
            "en": "Those closer to 4 are really looking for a change.",
            "cn": "那些更接近第 4 阶段的人，才是在真正寻求改变。"
          },
          {
            "en": "You feel like you are meant for more, but you can’t make sense of everything yet, because there’s obviously a lot at play.",
            "cn": "你觉得自己注定能成就更大的事业，但目前还无法理清头绪，因为显然有太多因素在起作用。"
          }
        ]
      },
      {
        "en": "The good thing is, it doesn’t really matter what stage you are in, because moving through any of them follows a pattern.",
        "cn": "好在，无论你处于哪个阶段其实都无所谓，因为跨越任何一个阶段都遵循着一种规律。"
      },
      {
        "en": "V – Intelligence is the ability to get what you want out of life",
        "cn": "V——智慧就是从生活中获得你想要的东西的能力"
      },
      {
        "en": "The only real test of intelligence is if you get what you want out of life.",
        "cn": "衡量智力的唯一真正标准，在于你能否从生活中获得自己想要的东西。"
      },
      {
        "en": "There is a formula for success.",
        "cn": "成功是有公式可循的。"
      },
      {
        "sentences": [
          {
            "en": "One ingredient is agency.",
            "cn": "其中一个要素是能动性。"
          }
        ]
      },
      {
        "en": "One ingredient is opportunity (which many people like to mistake as “privilege” - because they the other ingredients).",
        "cn": "其中一个要素是机会（许多人常将其误认为“特权”——因为他们缺乏其他要素）。"
      },
      {
        "en": "The last ingredient is intelligence.",
        "cn": "最后一个要素就是“智慧”。"
      },
      {
        "en": "If you have high agency but low opportunity, it doesn’t matter how likely you are to act toward a goal, because it isn’t a goal that will bear much fruit.",
        "cn": "如果你拥有高能动性却机会稀少，那么你为实现目标采取行动的可能性有多大并不重要，因为那并不是一个能结出多少果实的目标。"
      },
      {
        "en": "If you have opportunity and agency but low intelligence, then you will never be fully able to benefit from that opportunity.",
        "cn": "如果你既有机会也有能动性，但智慧不足，那么你就永远无法充分利用那份机会。"
      },
      {
        "sentences": [
          {
            "en": "First, we’ve talked about agency before here.",
            "cn": "首先，我们之前在这里已经讨论过“能动性”这一概念。"
          },
          {
            "en": "In terms of opportunity, I can’t tell you to change your physical location, but if you don’t see the abundance of digital opportunity right in front of you, I don’t know what to tell you.",
            "cn": "说到机遇，我不能建议你改变地理位置，但如果你连眼前这些数不胜数的数字化机遇都视而不见，那我真不知道该怎么跟你说才好了。"
          }
        ]
      },
      {
        "en": "With that said, I want to focus on what intelligence is in the context of these two other ingredients and this letter.",
        "cn": "话虽如此，我想重点探讨一下，在其他这两个要素以及这封信的语境下，“智慧”究竟意味着什么。"
      },
      {
        "en": "Cybernetics comes from the greek word kybernetikos which means “to steer” or “good at steering.”",
        "cn": "控制论源自希腊语单词“kybernetikos”，意为“掌舵”或“擅长掌舵”。"
      },
      {
        "en": "It’s also known as “the art of getting what you want.”",
        "cn": "它也被称为“获得所求之物的艺术”。"
      },
      {
        "en": "So, if Naval’s definition of intelligence is getting what you want out of life, understanding cybernetics helps you do that much faster.",
        "cn": "因此，如果纳瓦尔对智慧的定义就是从生活中获得你想要的东西，那么了解控制论能帮你更快地做到这一点。"
      },
      {
        "en": "Cybernetics illustrates the properties of intelligent systems.",
        "cn": "控制论阐明了智能系统的特性。"
      },
      {
        "sentences": [
          {
            "en": "To have a goal.",
            "cn": "确立目标。"
          },
          {
            "en": "Act toward that goal.",
            "cn": "朝着该目标采取行动。"
          },
          {
            "en": "Sense where you are.",
            "cn": "感知自身所处的位置。"
          },
          {
            "en": "Compare it to the goal.",
            "cn": "将其与目标进行对比。"
          }
        ]
      },
      {
        "en": "And act again based on that feedback.",
        "cn": "并根据这一反馈再次采取行动。"
      },
      {
        "en": "You can judge intelligence based on the system’s ability to iterate and persist with trial and error.",
        "cn": "可以根据系统在试错过程中进行迭代和坚持的能力来判断其智能水平。"
      },
      {
        "sentences": [
          {
            "en": "A ship blown off course that corrects toward its destination.",
            "cn": "一艘因风吹偏离航向后，又重新调整航向驶向目的地的船。"
          },
          {
            "en": "A thermostat sensing a change in heat and turning on.",
            "cn": "温控器感应到温度变化后启动。"
          },
          {
            "en": "The pancreas excreting insulin after blood glucose spikes.",
            "cn": "血糖骤升后，胰腺会分泌胰岛素。"
          }
        ]
      },
      {
        "en": "What does this have to do with getting what you want out of life?",
        "cn": "这与实现你的人生目标有什么关系呢？"
      },
      {
        "en": "Acting, sensing, comparing, and understanding the system from a meta-perspective is fundamental to high intelligence.",
        "cn": "从元视角去行动、感知、比较并理解系统，是高智慧的基础。"
      },
      {
        "sentences": [
          {
            "en": "High intelligence is the ability to iterate, persist, and understand the big picture.",
            "cn": "高智慧指的是迭代、坚持并把握全局的能力。"
          },
          {
            "en": "The mark of low intelligence is the inability to learn from your mistakes.",
            "cn": "低智慧的一个标志，就是无法从错误中吸取教训。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Low-intelligence people get stuck on problems rather than solving them.",
            "cn": "低智慧的人会困在问题里，而不是去解决它。"
          },
          {
            "en": "They hit a roadblock and quit.",
            "cn": "他们一遇到障碍就放弃了。"
          },
          {
            "en": "Like a writer who fails to build a readership and quits because they lack the ability to try new things, experiment, and figure out a process that works for them (to think that there isn’t an effective process you can create is verifiably false, no matter your limiting beliefs, hence being low intelligence.)",
            "cn": "（认为不存在你能创造出来的有效方法，这种想法是可被证伪的谬误——无论你抱有什么样的限制性信念，这正是智慧低下的表现。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "High intelligence is realizing any problem can be solved on a large enough timescale.",
            "cn": "高智慧是意识到：只要时间跨度足够长，任何问题都能被解决。"
          },
          {
            "en": "The reality is that you can achieve any goal you set your mind to.",
            "cn": "事实上，只要你下定决心，任何目标都能实现。"
          },
          {
            "en": "This isn’t something that can be disproven within reason.",
            "cn": "这并非在合理范围内能够被证伪的事情。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Intelligence is realizing that there is a series of choices you can make which lead to achieving the goal you want.",
            "cn": "智慧在于意识到，你可以做出一系列选择，从而实现你想要的目标。"
          },
          {
            "en": "You understand that ideas are hierarchical and that you can’t go from papyrus to Google docs in one fell swoop.",
            "cn": "你明白，想法是有层次的，不可能一蹴而就地从纸莎草纸直接跳到谷歌文档。"
          },
          {
            "en": "Even if that goal is impossible right now, you simply don’t have the resources – which may be invented over the next few years – to achieve that thing.",
            "cn": "即使这个目标目前还无法实现，你也根本没有实现它的资源——不过这些资源也许会在未来几年内被发明出来。"
          }
        ]
      },
      {
        "en": "When I talk about “goals,” and as I will continue repeating, I am not speaking from the typical lens of self-help, although that’s a helpful lens to adopt at times.",
        "cn": "当我谈论“目标”时——而且我今后也会不断重申这一点——我并不是从典型的自我帮助视角出发，尽管这种视角有时确实很有帮助。"
      },
      {
        "sentences": [
          {
            "en": "I am speaking from the lens of teleology or the Greek kosmos – that everything serves a purpose.",
            "cn": "我是从目的论或希腊语中的“kosmos”（即万物皆有其目的）这一视角来谈的。"
          },
          {
            "en": "That everything is a part of a greater whole.",
            "cn": "万物都是一个更大整体的一部分。"
          }
        ]
      },
      {
        "en": "Goals determine how you see the world.",
        "cn": "目标决定了你如何看待世界。"
      },
      {
        "en": "Goals determine what you consider “success” or “failure.”",
        "cn": "目标决定了你如何定义“成功”或“失败”。"
      },
      {
        "en": "You can try to “enjoy the journey,” but if you pursue the wrong goal, you will not enjoy it.",
        "cn": "你可以试着“享受这段旅程”，但如果追求的是错误的目标，你就无法享受其中。"
      },
      {
        "en": "Your mind is the operating system for reality.",
        "cn": "你的思维是现实的操作系统。"
      },
      {
        "en": "That system is composed of goals.",
        "cn": "该系统由目标构成。"
      },
      {
        "sentences": [
          {
            "en": "For most people, those goals are assigned to them.",
            "cn": "对大多数人来说，这些目标是别人为他们设定的。"
          },
          {
            "en": "Programmed like lines of code in your psyche.",
            "cn": "像代码行一样被编程到你的潜意识中。"
          },
          {
            "en": "Go to school.",
            "cn": "去上学。"
          },
          {
            "en": "Get the job.",
            "cn": "找到工作。"
          },
          {
            "en": "Get offended.",
            "cn": "感到委屈。"
          },
          {
            "en": "Play victim.",
            "cn": "扮演受害者。"
          },
          {
            "en": "Retire at 65.",
            "cn": "65岁退休。"
          }
        ]
      },
      {
        "en": "A known path that doesn’t work.",
        "cn": "一条众所周知却行不通的道路。"
      },
      {
        "sentences": [
          {
            "en": "To become more intelligent, you must:",
            "cn": "要想变得更聪明，你必须："
          },
          {
            "en": "Reject the known path",
            "cn": "摒弃这条众所周知的道路"
          },
          {
            "en": "Dive into the unknown",
            "cn": "投身未知"
          }
        ]
      },
      {
        "en": "Set new, higher goals to expand your mind",
        "cn": "设定新的、更高的目标来拓展你的思维"
      },
      {
        "en": "Embrace the chaos and allow for growth",
        "cn": "拥抱混乱，为成长留出空间"
      },
      {
        "en": "Study the generalized principles of nature",
        "cn": "研究自然的普遍规律"
      },
      {
        "sentences": [
          {
            "en": "Become a deep generalist",
            "cn": "成为一名深度通才"
          }
        ]
      },
      {
        "en": "That leads us into the next section perfectly.",
        "cn": "这将完美地引出下一部分。"
      },
      {
        "en": "VI – How to launch into a completely new life (in 1 day)",
        "cn": "VI——如何（在一天内）开启崭新的人生"
      },
      {
        "en": "The best periods of my life always came after a period of getting absolutely fed up with the lack of progress I was making.",
        "cn": "我人生中最美好的时光，总是出现在我对自己的停滞不前感到彻底厌倦之后。"
      },
      {
        "sentences": [
          {
            "en": "How do you dig into your mind?",
            "cn": "你是如何深入探索自己的内心的？"
          }
        ]
      },
      {
        "en": "How do you become aware of your conditioning?",
        "cn": "如何觉察自己的条件反射？"
      },
      {
        "en": "How do you reach profound insights and truths that change the trajectory of your life?",
        "cn": "如何获得能够改变人生轨迹的深刻见解和真理？"
      },
      {
        "en": "Through the simple, but often painful act of questioning.",
        "cn": "通过这种简单却往往痛苦的自问过程。"
      },
      {
        "sentences": [
          {
            "en": "Something that so few people do, and you can tell by how they speak or give their thoughts on a specific topic.",
            "cn": "这是极少有人会做的事，从他们说话的方式或对某个具体话题的看法中就能看出来。"
          },
          {
            "en": "Questioning is thinking, and very few people do it.",
            "cn": "质疑就是思考，而能做到这一点的人寥寥无几。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I want to give you a comprehensive protocol that you can use every year to reset your life and launch into a season of intense progress.",
            "cn": "我想向你提供一套全面的方案，你可以每年使用它来重置生活，并开启一段飞速进步的时期。"
          },
          {
            "en": "This protocol helps you ask the right questions.",
            "cn": "这套方案能帮你提出正确的问题。"
          }
        ]
      },
      {
        "en": "These questions will cover the macro to the micro: where you want to be, what you need to do to get there, and what you can do immediately to start moving the needle toward that reality.",
        "cn": "这些问题将涵盖从宏观到微观的各个层面：你希望达到什么目标，为了实现这一目标需要做什么，以及你可以立即采取哪些行动来推动这一目标的实现。"
      },
      {
        "sentences": [
          {
            "en": "This will require one full day to complete, so I recommend you follow along with the exact protocol.",
            "cn": "这需要一整天才能完成，因此我建议你严格按照该流程操作。"
          },
          {
            "en": "You will need a pen, paper, and an open mind.",
            "cn": "你需要一支笔、一张纸和一颗开放的心。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I observe patterns in people who successfully flip their identity, it happens fast after a build up of tension.",
            "cn": "当我观察那些成功转换身份的人的模式时，发现这种转变往往是在紧张情绪逐渐积累之后迅速发生的。"
          },
          {
            "en": "Specifically, I’ve noticed 3 phases that people then to go through.",
            "cn": "具体来说，我注意到人们通常会经历以下三个阶段。"
          }
        ]
      },
      {
        "en": "Dissonance – They feel like they don’t belong in their current life, and become sufficiently fed up with their lack of progress.",
        "cn": "不协调感——他们觉得自己不属于当下的人生，并对自身缺乏进步感到十分厌倦。"
      },
      {
        "en": "Uncertainty – They don’t know what comes next, so they either experiment or get lost and feel worse.",
        "cn": "不确定性——他们不知道接下来会发生什么，因此要么尝试探索，要么迷失方向，从而感到更加糟糕。"
      },
      {
        "en": "Discovery – They discover what they want to pursue and make 6 years of progress in 6 months.",
        "cn": "探索——他们发现自己想要追求的目标，并在6个月内取得了相当于6年的进步。"
      },
      {
        "en": "So, our goal with this protocol is to help you reach the point of dissonance, navigate through uncertainty, and discover what it truly is that you want to achieve, so much so that the clarity is overwhelming and distractions no longer hold their weight.",
        "cn": "因此，这套方案的目标是帮你抵达「不协调感」的临界点，穿过不确定性，发现自己真正想要实现的是什么——直到这份清晰强烈到让干扰再也站不住脚。"
      },
      {
        "sentences": [
          {
            "en": "This protocol is structured so that it can be completed in one day.",
            "cn": "本方案的设计旨在确保其可在一天内完成。"
          },
          {
            "en": "In the morning, you do a psychological excavation to uncover your own hidden motives.",
            "cn": "早上，你要进行一次心理探索，以发掘自己隐藏的动机。"
          },
          {
            "en": "During the day, you prompt yourself with interrupts to keep you out of autopilot and contemplate your life.",
            "cn": "白天，你可以通过一些“中断”来提醒自己，避免陷入“自动驾驶”状态，并思考自己的人生。"
          },
          {
            "en": "At night, you synthesize the insights into a direction you will start to move in tomorrow.",
            "cn": "到了晚上，你会将这些洞见整合成一个方向，明天便开始朝着这个方向前进。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I cannot guarantee that this will work for everyone, because I cannot guarantee that everyone reading this is in the right chapter of their own story that would make these points impactful.",
            "cn": "我无法保证这对每个人都有效，因为我无法保证每位阅读本文的人都正处于自己人生故事中那个能让这些观点产生深远影响的阶段。"
          },
          {
            "en": "You can’t place the climax at the start of the book and expect it to be interesting.",
            "cn": "你不能把高潮放在书的开头，还指望它会引人入胜。"
          },
          {
            "en": "Part 1) Morning – Psychological Excavation – Vision & Anti-Vision",
            "cn": "第一部分）早晨——心理挖掘——愿景与反愿景"
          }
        ]
      },
      {
        "en": "First we must create a new frame, or lens of perception, for your mind to operate from.",
        "cn": "首先，我们必须为你的思维建立一个新的框架，或者说一种新的认知视角，作为其运作的基础。"
      },
      {
        "sentences": [
          {
            "en": "This is like creating a new shell, leaving your old one, and slowly growing into it over time.",
            "cn": "这就像是创造一个新的外壳，抛开旧的，然后随着时间的推移慢慢适应它。"
          },
          {
            "en": "It won’t feel like it fits at first.",
            "cn": "起初可能会觉得不太合适。"
          },
          {
            "en": "That’s a good thing.",
            "cn": "这反而是件好事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Set aside 15-30 minutes (the length of one YouTube video...",
            "cn": "请预留15-30分钟（相当于一部YouTube视频的时长……"
          },
          {
            "en": "you can do it) to think about and answer these questions.",
            "cn": "（你可以做到的）思考并回答这些问题。"
          },
          {
            "en": "Do not attempt to outsource this contemplation to AI.",
            "cn": "切勿试图将这种思考外包给人工智能。"
          },
          {
            "en": "I want you to break past the limiter that is on your mind.",
            "cn": "我希望你能突破心中那道限制。"
          },
          {
            "en": "If you can’t answer these immediately, come back to them later.",
            "cn": "如果你无法立即回答这些问题，稍后再回来看看。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What is the dull and persistent dissatisfaction you’ve learned to live with?",
            "cn": "你已经学会与之共处的那种沉闷而持久的不满是什么？"
          },
          {
            "en": "Not the deep suffering but what you’ve learned to tolerate.",
            "cn": "不是那种深切的痛苦，而是你已经学会忍受的。"
          },
          {
            "en": "(If you don’t hate it, you will tolerate it)",
            "cn": "（如果你不讨厌它，你就会容忍它）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What do you complain about repeatedly but never actually change?",
            "cn": "你总是在抱怨什么，却始终没有真正改变？"
          },
          {
            "en": "Write down the three complaints you’ve voiced most often in the past year.",
            "cn": "请写下过去一年里你最常提到的三条抱怨。"
          }
        ]
      },
      {
        "en": "For each complaint: What would someone who watched your behavior (not your words) conclude that you actually want?",
        "cn": "对于每一条抱怨：如果一个人只观察你的行为（而非你的言语），他会认为你真正想要的是什么？"
      },
      {
        "en": "What truth about your current life would be unbearable to admit to someone you deeply respect?",
        "cn": "关于你当前的生活，有什么真相是你无法向自己深为敬重的人坦白的？"
      },
      {
        "sentences": [
          {
            "en": "Those questions are meant to make you aware of the pain in your current life.",
            "cn": "这些问题旨在让你意识到自己当前生活中所经历的痛苦。"
          },
          {
            "en": "Now, we need to turn those into what I call an “anti-vision,” which is a brutal awareness of the life you do not want to live.",
            "cn": "现在，我们需要将这些转化为我所谓的“反愿景”，即对你不想过的那种生活的残酷认知。"
          },
          {
            "en": "That way, you can use that negative energy to aim your efforts in a positive direction and act from a place of intrinsic motivation.",
            "cn": "这样一来，你就可以利用这种负面能量，将努力导向积极的方向，并基于内在动机采取行动。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If absolutely nothing changes for the next five years, describe an average Tuesday.",
            "cn": "如果未来五年一切都保持不变，请描述一个普通的星期二。"
          },
          {
            "en": "Where do you wake up?",
            "cn": "你会在哪里醒来？"
          },
          {
            "en": "What does your body feel like?",
            "cn": "身体感觉如何？"
          },
          {
            "en": "What’s the first thing you think about?",
            "cn": "你首先会想到什么？"
          },
          {
            "en": "Who’s around you?",
            "cn": "你身边都有谁？"
          },
          {
            "en": "What do you do between 9am and 6pm?",
            "cn": "上午9点到下午6点之间，你都在做什么？"
          },
          {
            "en": "How do you feel at 10pm?",
            "cn": "晚上10点时，你的感受如何？"
          },
          {
            "en": "Now do it but for ten years.",
            "cn": "现在试着想象一下，但时间跨度延长至十年。"
          },
          {
            "en": "What have you missed?",
            "cn": "你错过了什么？"
          },
          {
            "en": "What opportunities closed?",
            "cn": "哪些机会已经错过了？"
          },
          {
            "en": "Who gave up on you?",
            "cn": "谁对你失去了信心？"
          }
        ]
      },
      {
        "en": "What do people say about you when you’re not in the room?",
        "cn": "当你不在场时，大家会怎么评价你？"
      },
      {
        "sentences": [
          {
            "en": "You’re at the end of your life.",
            "cn": "你已到了生命的尽头。"
          },
          {
            "en": "You lived the safe version.",
            "cn": "你过了一生中“安全”的那种生活。"
          },
          {
            "en": "You never broke the pattern.",
            "cn": "你从未打破过这种模式。"
          },
          {
            "en": "What was the cost?",
            "cn": "为此付出了什么代价？"
          },
          {
            "en": "What did you never let yourself feel, try, or become?",
            "cn": "你曾经不曾允许自己去感受、尝试或成为什么？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Who in your life is already living the future you just described?",
            "cn": "在你身边，有谁已经过上了你刚才描述的那种未来生活？"
          },
          {
            "en": "Someone five, ten, twenty years ahead on the same trajectory?",
            "cn": "在同一发展轨迹上，比我们领先五、十、二十年的人？"
          },
          {
            "en": "What do you feel when you think about becoming them?",
            "cn": "一想到要成为他们那样的人，你有什么感受？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What identity would you have to give up to actually change?",
            "cn": "为了真正改变，你必须放弃怎样的身份？"
          },
          {
            "en": "(”I am the type of person who...”) What would it cost you socially to no longer be that person?",
            "cn": "（“我属于那种……的人”）如果不再做那样的人，你在社交方面会付出什么代价？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What is the most embarrassing reason you haven’t changed?",
            "cn": "你至今仍未改变的最尴尬的原因是什么？"
          },
          {
            "en": "The one that makes you sound weak, scared, or lazy rather than reasonable?",
            "cn": "那种让你听起来显得软弱、胆怯或懒惰，而不是合情合理的那种？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If your current behavior is a form of self-protection, what exactly are you protecting?",
            "cn": "如果你的当前行为是一种自我保护，那么你究竟在保护什么呢？"
          },
          {
            "en": "And what is that protection costing you?",
            "cn": "那么，这种保护要让你付出多少代价呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you answered those truthfully, and if you are in the right chapter of your life, you will feel a deep sense of dis-ease and possibly disgust for how you are currently living.",
            "cn": "如果你如实回答了这些问题，而且正处于人生的正确阶段，那么你会对自己当前的生活方式感到一种深深的不安，甚至可能产生厌恶之情。"
          },
          {
            "en": "Now, we need to orient that energy in a positive direction.",
            "cn": "现在，我们需要将这种能量引导到积极的方向上。"
          },
          {
            "en": "We need to create a minimum viable vision, because your vision is like a product.",
            "cn": "我们需要制定一个“最小可行愿景”，因为你的愿景就像一款产品。"
          },
          {
            "en": "It starts out unclear, but with time and experience, it grows stronger and more potent.",
            "cn": "起初它并不明显，但随着时间的推移和经验的积累，它会变得越来越强烈、越来越有力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Forget practicality for a minute.",
            "cn": "暂时抛开实用性不谈。"
          },
          {
            "en": "If you could snap your fingers and be living a different life in three years, not what’s realistic, what you actually want?",
            "cn": "如果你能一挥手，三年后就过上截然不同的人生——不考虑现实情况，而是你真正想要的——会是怎样的？"
          },
          {
            "en": "What does an average Tuesday look like?",
            "cn": "一个普通的星期二通常是怎样的？"
          },
          {
            "en": "Same level of detail as question 5.",
            "cn": "详细程度与第5题相同。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What would you have to believe about yourself for that life to feel natural rather than forced?",
            "cn": "你必须对自己抱有什么样的信念，才能让那种生活感觉自然而然，而不是勉强为之？"
          },
          {
            "en": "Write the identity statement: “I am the type of person who...”",
            "cn": "写下这段自我认同陈述：“我是一个……的人。”"
          }
        ]
      },
      {
        "en": "What is one thing you would do this week if you were already that person?",
        "cn": "如果你已经是那样的人了，这周你会做的一件事是什么？"
      },
      {
        "en": "Answer all of those first thing in the morning tomorrow.",
        "cn": "明天一早醒来，请先回答所有这些问题。"
      },
      {
        "sentences": [
          {
            "en": "Part 2) Throughout The Day – Interrupting Autopilot – Breaking Unconscious Patterns",
            "cn": "第二部分）全天实践——中断自动驾驶模式——打破无意识的模式"
          }
        ]
      },
      {
        "en": "These journaling exercises are cute, but we want real change.",
        "cn": "这些日记练习虽然有趣，但我们想要的是真正的改变。"
      },
      {
        "en": "Frankly, that’s not going to happen if you don’t break the current unconscious patterns that are keeping you the same.",
        "cn": "坦白说，如果你不打破那些让你停滞不前的现有潜意识模式，这种情况是不会发生的。"
      },
      {
        "sentences": [
          {
            "en": "Throughout the day, I want you to contemplate on everything you journaled in part one.",
            "cn": "今天一整天，我希望你能仔细思考你在第一部分日记中写下的所有内容。"
          },
          {
            "en": "Beyond that, I don’t want you to forget to contemplate.",
            "cn": "除此之外，我不希望你忘记静心思考。"
          },
          {
            "en": "Please take this seriously.",
            "cn": "请认真对待这件事。"
          },
          {
            "en": "You aren’t going to change by doing the same thing for the rest of your life.",
            "cn": "如果你一辈子都做着同样的事情，你就无法改变自己。"
          },
          {
            "en": "You need to consciously force a pattern break.",
            "cn": "你需要有意识地打破这种模式。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Take the time right now to create reminders or calendar events in your phone.",
            "cn": "现在就花点时间在手机上设置提醒或日历事件吧。"
          },
          {
            "en": "Include the question in the reminder or event so that you can immediately start thinking about it.",
            "cn": "将问题添加到提醒或事件中，这样你就可以立即开始思考这个问题。"
          }
        ]
      },
      {
        "en": "The more random and non-conflicting with your schedule there are, the better.",
        "cn": "这类安排越随机、与你的日程安排冲突越少，就越好。"
      },
      {
        "en": "11:00am: What am I avoiding right now by doing what I’m doing?",
        "cn": "上午11:00：我此刻做这些事，究竟是在逃避什么？"
      },
      {
        "en": "1:30pm: If someone filmed the last two hours, what would they conclude I want from my life?",
        "cn": "下午1:30：如果有人录下了过去这两个小时，他们会得出什么结论，认为我的人生追求是什么？"
      },
      {
        "en": "3:15pm: Am I moving toward the life I hate or the life I want?",
        "cn": "下午3:15：我是在走向自己讨厌的生活，还是自己想要的生活？"
      },
      {
        "en": "5:00pm: What’s the most important thing I’m pretending isn’t important?",
        "cn": "下午5:00：我假装不重要的事情中，哪一件才是最重要的？"
      },
      {
        "sentences": [
          {
            "en": "7:30pm: What did I do today out of identity protection rather than genuine desire?",
            "cn": "晚上7:30：今天我做了哪些事，是出于保护个人身份的目的，而不是出于真正的意愿？"
          },
          {
            "en": "(Hint: it’s most things you do)",
            "cn": "（提示：这几乎就是你所做的所有事情）"
          }
        ]
      },
      {
        "en": "9:00pm: When did I feel most alive today?",
        "cn": "晚上9:00：今天什么时候我感觉最充满活力？"
      },
      {
        "sentences": [
          {
            "en": "When did I feel most dead?",
            "cn": "什么时候我感觉最像个行尸走肉？"
          }
        ]
      },
      {
        "en": "To add a bit more fuel to the fire, schedule these questions during times where you are either commuting, walking, or lying around.",
        "cn": "为了让事情更添一把火，不妨在通勤、散步或闲躺时安排这些提问。"
      },
      {
        "en": "What would change if I stopped needing people to see me as [the identity you wrote in question 10]?",
        "cn": "如果我不再需要别人把我看作[你在第10题中写下的身份]，情况会有什么变化？"
      },
      {
        "en": "Where in my life am I trading aliveness for safety?",
        "cn": "在我的生活中，我正在哪里用“活力”来换取“安全”？"
      },
      {
        "en": "What’s the smallest version of the person I want to become that I could be tomorrow?",
        "cn": "明天，我能成为的、理想中那个自己的最小版本是什么？"
      },
      {
        "sentences": [
          {
            "en": "Part 3) Evening – Synthesizing Insight – Entering A Season Of Progress",
            "cn": "第三部分）傍晚——整合洞见——迈入进步的阶段"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you followed that process, I would be surprised if you didn’t have at least one profound insight that could alter the course of your life.",
            "cn": "如果你按照那个流程操作，如果最终没有获得至少一个足以改变你人生轨迹的深刻见解，我反而会感到惊讶。"
          },
          {
            "en": "Now, we need to make those known, integrate them into who we are, and act on them to begin solidifying our journey to a new level of mind.",
            "cn": "现在，我们需要让这些洞见变得清晰，把它们融入我们的内在，并付诸行动，开始巩固我们迈向更高心智层级的旅程。"
          }
        ]
      },
      {
        "en": "After today, what feels most true about why you’ve been stuck?",
        "cn": "经过今天，关于你为何陷入停滞，什么感觉最真实？"
      },
      {
        "sentences": [
          {
            "en": "What is the actual enemy?",
            "cn": "真正的敌人究竟是什么？"
          },
          {
            "en": "Name it clearly.",
            "cn": "请明确指出它的名字。"
          },
          {
            "en": "Not circumstances.",
            "cn": "不是环境。"
          },
          {
            "en": "Not other people.",
            "cn": "不是别人。"
          }
        ]
      },
      {
        "en": "The internal pattern or belief that has been running the show.",
        "cn": "一直主导着一切的内在模式或信念。"
      },
      {
        "sentences": [
          {
            "en": "Write a single sentence that captures what you refuse to let your life become.",
            "cn": "请用一句话概括你绝不允许自己的人生变成什么样。"
          },
          {
            "en": "This is your anti-vision compressed.",
            "cn": "这是你那“反愿景”的浓缩版。"
          },
          {
            "en": "It should make you feel something when you read it.",
            "cn": "读到这里，你应该会有所感触。"
          }
        ]
      },
      {
        "en": "Write a single sentence that captures what you’re building toward, knowing it will evolve.",
        "cn": "请用一句话概括你正在努力实现的目标，同时要明白这个目标会不断演变。"
      },
      {
        "sentences": [
          {
            "en": "This is your vision MVP.",
            "cn": "这就是你的愿景最小可行产品（MVP）。"
          }
        ]
      },
      {
        "en": "Lastly, we need to create goals.",
        "cn": "最后，我们需要设定目标。"
      },
      {
        "sentences": [
          {
            "en": "Again, these aren’t goals that you set for the sake of achievement, because goals are just projections.",
            "cn": "同样，这些并不是为了达成而设定的目标，因为目标只不过是预设的设想罢了。"
          },
          {
            "en": "They are unreliable and make you feel bound to something that will inevitably change.",
            "cn": "它们不可靠，会让你感觉被束缚在某种注定会改变的事物上。"
          },
          {
            "en": "Instead, think of goals as a point of view.",
            "cn": "相反，不妨将目标视为一种视角。"
          },
          {
            "en": "A lens that you can exchange to enter the right state of mind to perform the action that will lead away from the life you don’t want.",
            "cn": "一种可以更换的视角，让你进入正确的心理状态，从而采取行动，摆脱你不想要的生活。"
          },
          {
            "en": "Do not worry about some kind of finish line, because as we will find, it doesn’t exist.",
            "cn": "别担心什么“终点线”，因为正如我们将要发现的那样，它根本不存在。"
          },
          {
            "en": "Enjoyment is found in progress.",
            "cn": "乐趣在于进步。"
          }
        ]
      },
      {
        "en": "One-year lens: What would have to be true in one year for you to know you’ve broken the old pattern?",
        "cn": "「一年视角」：一年之后必须发生什么，你才能确定自己已经打破了旧的模式？"
      },
      {
        "sentences": [
          {
            "en": "One concrete thing.",
            "cn": "一件具体的事情。"
          }
        ]
      },
      {
        "en": "One-month lens: What would have to be true in one month for the one-year lens to remain possible?",
        "cn": "「一个月视角」：一个月内必须发生什么，才能让「一年视角」依然成立？"
      },
      {
        "en": "Daily lens: What are 2-3 actions you can timeblock tomorrow that the person you’re becoming would simply do?",
        "cn": "「每日视角」：明天你可以用时间块安排哪 2-3 个行动，是「正在成为的你」自然而然就会去做的？"
      },
      {
        "sentences": [
          {
            "en": "Hopefully it was helpful.",
            "cn": "希望这些内容对你有所帮助。"
          }
        ]
      },
      {
        "en": "But we have one last piece to lock it all in.",
        "cn": "但我们还有最后一步，将这一切牢牢锁定。"
      },
      {
        "sentences": [
          {
            "en": "VII – Turn Your Life Into A Video Game",
            "cn": "第七章——将生活变成电子游戏"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The optimal state of inner experience is one in which there is order in consciousness.",
            "cn": "内在体验的最佳状态，是意识中存在秩序的状态。"
          },
          {
            "en": "This happens when psychic energy—or attention—is invested in realistic goals, and when skills match the opportunities for action.",
            "cn": "当心理能量——或注意力——投入到切合实际的目标上，且技能与行动机会相匹配时，就会出现这种情况。"
          },
          {
            "en": "The pursuit of a goal brings order in awareness because a person must concentrate attention on the task at hand and momentarily forget everything else.",
            "cn": "追求目标能使意识变得有条理，因为人必须将注意力集中在眼前的任务上，暂时忘却其他一切。"
          }
        ]
      },
      {
        "en": "You now have all of the components that lead to a good life.",
        "cn": "现在，你已经拥有了通往美好生活的所有要素。"
      },
      {
        "sentences": [
          {
            "en": "Now, it may be helpful to organize all of your insights into one coherent plan.",
            "cn": "现在，将所有见解整理成一个连贯的计划可能会有所帮助。"
          },
          {
            "en": "Pull out a new page and write down these 6 components:",
            "cn": "翻到新的一页，写下以下6个要素："
          }
        ]
      },
      {
        "en": "Anti-vision – What is the bane of my existence, or the life I never want to experience again?",
        "cn": "反愿景——我生命中的祸根是什么，也就是那种我再也不愿经历的生活？"
      },
      {
        "en": "Vision – What is the ideal life that I think I want and can improve as I work toward it?",
        "cn": "愿景——我认为自己想要的理想生活是什么？在为之奋斗的过程中，我又能如何不断完善它？"
      },
      {
        "en": "1 year goal – What will my life look like in 1 year time, and is that closer to the life I want?",
        "cn": "1年目标——1年后我的生活会是什么样子？这离我理想中的生活更近了吗？"
      },
      {
        "sentences": [
          {
            "en": "1 month project – What do I need to learn?",
            "cn": "为期1个月的项目——我需要学习什么？"
          },
          {
            "en": "What skills do I need to acquire?",
            "cn": "我需要掌握哪些技能？"
          },
          {
            "en": "What can I build that will move me closer to the one year goal?",
            "cn": "我能做些什么，才能让自己更接近这一年的目标？"
          }
        ]
      },
      {
        "en": "Daily levers – What are the priority, needle-moving tasks that bring my project closer to completion?",
        "cn": "每日杠杆——哪些是关键任务，能实实在在推动我的项目接近完成？"
      },
      {
        "en": "Constraints – What am I not willing to sacrifice to achieve my vision from the ground up?",
        "cn": "限制条件——为了从零开始实现我的愿景，有哪些是我不愿意牺牲的？"
      },
      {
        "sentences": [
          {
            "en": "Why is this so powerful?",
            "cn": "为什么这种方法如此有效？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Because these components literally create your own little world.",
            "cn": "因为这些组件确实能为你打造一个属于你自己的小世界。"
          },
          {
            "en": "If you are meant to pursue this hierarchy of goals at this stage of your life, you will have no other option but to become obsessed.",
            "cn": "如果你注定要在人生的这个阶段追求这一系列目标，那么你别无选择，只能对此痴迷不已。"
          },
          {
            "en": "You will feel the pull to something greater.",
            "cn": "你会感到一种被更宏大的事物所吸引的力量。"
          },
          {
            "en": "You will not see anything else as an option.",
            "cn": "你不会看到其他任何选项。"
          }
        ]
      },
      {
        "en": "You turn your life into a video game.",
        "cn": "你将把生活变成一款电子游戏。"
      },
      {
        "sentences": [
          {
            "en": "Because games are the poster child for obsession, enjoyment, and flow states.",
            "cn": "因为游戏正是痴迷、乐趣和心流状态的典型代表。"
          },
          {
            "en": "They have all the components that lead to focus and clarity, so if we reverse engineer what those components are, we can live in a state of deeper enjoyment, less distractions, and more success.",
            "cn": "它们具备所有有助于集中注意力、保持思维清晰的关键要素，因此，如果我们反向推导出这些要素，就能进入一种享受更深、分心更少、成功更多的状态。"
          },
          {
            "en": "Your vision is how you win.",
            "cn": "你的愿景就是你的制胜之道。"
          }
        ]
      },
      {
        "en": "At least until the game evolves.",
        "cn": "至少在游戏演变之前是如此。"
      },
      {
        "sentences": [
          {
            "en": "Your anti-vision is what’s at stake.",
            "cn": "你的反愿景就是你押上的赌注。"
          },
          {
            "en": "What happens if you lose or give up.",
            "cn": "如果你失败或放弃了，会发生什么？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Your 1 year goal is the mission.",
            "cn": "你的1年目标就是使命。"
          },
          {
            "en": "This is your sole priority in life.",
            "cn": "这就是你生命中唯一的优先事项。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Your 1 month project is the boss fight.",
            "cn": "你这个为期1个月的项目就是与BOSS的对决。"
          },
          {
            "en": "How you gain XP and acquire loot.",
            "cn": "如何获得经验值和战利品。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Your daily levers are the quests.",
            "cn": "你的每日杠杆就是任务。"
          },
          {
            "en": "The daily process that unlocks new opportunities.",
            "cn": "那个能解锁新机会的日常流程。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Your constraints are the rules.",
            "cn": "你的限制就是规则。"
          },
          {
            "en": "The limitations that encourage creativity.",
            "cn": "那些激发创造力的限制。"
          }
        ]
      },
      {
        "en": "All of these act as a concentric set of circles, like a forcefield, that guard your mind from distractions and shiny objects.",
        "cn": "所有这些就像一组同心圆，如同一个力场，保护你的思维免受干扰和诱惑的侵扰。"
      },
      {
        "en": "The more you play the game, the stronger this force becomes, and soon enough it becomes who you are, and you wouldn’t have it any other way.",
        "cn": "你玩得越多，这种力量就越发强大，很快它就成了你的一部分，而你也会乐在其中，别无他求。"
      },
      {
        "sentences": [
          {
            "en": "Discussion about this post",
            "cn": "关于这篇帖子的讨论"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Ready for more?",
            "cn": "准备好了解更多了吗？"
          }
        ]
      }
    ]
  },
  {
    "id": "people-anne-hathaway-mother-mary",
    "cat": "人物",
    "title": "Anne Hathaway Opens Up About the Most Challenging Role of Her Career",
    "titleZh": "安妮·海瑟薇谈职业生涯中最具挑战的角色",
    "url": "https://www.vogue.com/article/anne-hathaway-august-cover-2025-interview",
    "source": "Vogue",
    "date": "2025-07-07",
    "addedAt": "2026-09-15",
    "pin": true,
    "readingMode": "full",
    "contentStatus": "complete",
    "extractorVersion": "people-full-v1",
    "person": "Anne Hathaway",
    "personZh": "安妮·海瑟薇",
    "photoCount": 9,
    "photoCredit": "Annie Leibovitz / Vogue",
    "peopleScore": 100,
    "peopleScoreParts": {
      "person": 1,
      "photography": 1,
      "story": 1,
      "english": 1,
      "interest": 1
    },
    "peopleVersion": "people-v2-full",
    "review": {
      "status": "approved",
      "visualChecked": true,
      "guideChecked": true,
      "articleChecked": true,
      "at": "2026-09-15T11:57:57.355Z",
      "scope": "full-original-text-and-photos",
      "fingerprint": "4dcfb2a2115c7c63665a296842560ba9fd98af52279e8f3a32edb9865824dc19",
      "photoHashes": [
        "77d6f9ca7cb18f375da82f5d47c52e32ce7a837b60e5acef4fde217a376a387e",
        "6229e3ceed3e5164bf2da91f434aabddbee69031083c10d0519aaa965f82ef56",
        "93e4a4c0edfb4615a1ab9d573ef8ffb22731a461fe24ca4177a3c29cbcc5f096",
        "657f7c933efdd1a8afe7484fc027b2923ff11ecd3be567fd5fe87e57cf793601",
        "3b3e389dd7e241b7fc3d0b1ef2137122c78a8cc75cda45b1d5ba6283986f62f4",
        "05cef36bf92845a7df9451ad821695626cb193940aa52cf829ce9f6c0f0f5739",
        "c2193424c11f67c10154e8fec5fb14f2275e1576672ee2d2ccaa2f4d77d613ae",
        "b301c2bd3b860d8a3f3ba8a6b2203fa16852a1ea399f87a7aa6cbd3f1bc017d0",
        "fcc0bbf48b6061871d7cc98741ff56a2a13704dcd3dcaaa003cfab3ff572d9fe"
      ]
    },
    "fingerprint": "4dcfb2a2115c7c63665a296842560ba9fd98af52279e8f3a32edb9865824dc19",
    "sourceTextHash": "1928f69783a5551ae890ef5b2e802622a7e71562b42ad6e7ee77949fb96b300a",
    "sourceTextWords": 3623,
    "sourceParagraphs": 38,
    "sourceImages": 9,
    "coverImg": "assets/covers/people-anne-hathaway-mother-mary-0.jpg",
    "cover": "linear-gradient(135deg,#eadbcc,#855349)",
    "gradient": "linear-gradient(135deg,#eadbcc,#855349)",
    "photoSources": [
      "https://assets.vogue.com/photos/685995ef4c58215d1df8d3e7/16:9/w_1280,c_limit/VO0825_Cover_logo.jpg",
      "https://assets.vogue.com/photos/685995d4fd3cb6364abedc95/master/w_960,c_limit/VO0825_CoverStory_01.jpg",
      "https://assets.vogue.com/photos/685995d441d9e4045e437043/master/w_960,c_limit/VO0825_CoverStory_02.jpg",
      "https://assets.vogue.com/photos/685995d4c93e475c4d4e20f0/master/w_960,c_limit/VO0825_CoverStory_03.jpg",
      "https://assets.vogue.com/photos/685995d45ab364d88c7d0ac4/master/w_960,c_limit/VO0825_CoverStory_04.jpg",
      "https://assets.vogue.com/photos/685995d612b3276db9d30615/master/w_960,c_limit/VO0825_CoverStory_05.jpg",
      "https://assets.vogue.com/photos/685aad6eafc82a7e943bc0ad/master/w_960,c_limit/VO0825_CoverStory_06.jpg",
      "https://assets.vogue.com/photos/685995d482bc010538714d16/master/w_960,c_limit/VO0825_CoverStory_07.jpg",
      "https://assets.vogue.com/photos/685995d4bf4ab2b24cabdbb3/master/w_960,c_limit/VO0825_CoverStory_09.jpg"
    ],
    "paras": [
      {
        "sentences": [
          {
            "en": "Anne Hathaway is screaming.",
            "cn": "安妮·海瑟薇正在尖叫。"
          },
          {
            "en": "Eyes wild, skin aflame.",
            "cn": "眼神狂野，面颊通红。"
          },
          {
            "en": "Cresting, her voice vaults to a frequency you figure could shatter glass.",
            "cn": "随着情绪达到顶峰，她的嗓音飙升至一种你觉得足以震碎玻璃的频率。"
          },
          {
            "en": "“How was that?” she asks Jack Antonoff, lowering her headphones.",
            "cn": "“感觉怎么样？”她问杰克·安东诺夫，同时摘下耳机。"
          },
          {
            "en": "“Try another one?”",
            "cn": "“再试一次？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Sure, let’s go again,” Antonoff replies, fiddling with various buttons and levers on his monumental recording console.",
            "cn": "“当然，再来一次，”安东诺夫回答道，一边摆弄着他那台庞大录音控制台上的各种按钮和操纵杆。"
          },
          {
            "en": "“One more like that.",
            "cn": "“再来一次，像那样。”"
          },
          {
            "en": "Keep it frightening.”",
            "cn": "“要保持那种令人毛骨悚然的感觉。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Got it: hounds of hell,” says Hathaway, nodding.",
            "cn": "“明白了：地狱猎犬，”海瑟薇点点头说道。"
          },
          {
            "en": "Ever the diligent student.",
            "cn": "一如既往地勤奋。"
          },
          {
            "en": "Then she turns to me, mischievous.",
            "cn": "接着，她调皮地转向我。"
          },
          {
            "en": "“I have no idea where all this anger is coming from….”",
            "cn": "“我完全不知道这股愤怒是从哪里来的……”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Hathaway and Antonoff are spending this first balmy spring Saturday tucked away at a Manhattan studio because they are in the final stages of transforming famously plucky Anne Hathaway, movie star with a megawatt smile, into a moody pop diva.",
            "cn": "海瑟薇和安东诺夫正躲在曼哈顿的一间录音棚里，度过这个初春首个温暖的周六，因为他们正处于将那位以坚韧不拔著称、笑容灿烂如阳光的电影明星安妮·海瑟薇，蜕变为一位情绪多变的流行天后的最后阶段。"
          },
          {
            "en": "She’s dropped her two sons off at Little League and come here in low-glam mode (Knicks jersey, jeans) to record songs for David Lowery’s upcoming film Mother Mary, in which Hathaway plays the title character—a sort of Gaga–Taylor Swift hybrid who is, uh, having a moment.",
            "cn": "她刚把两个儿子送到少年棒球联盟的训练场，便以低调随性的装扮（尼克斯队球衣、牛仔裤）来到这里，为大卫·洛维即将上映的电影《圣母玛利亚》录制歌曲。在片中，海瑟薇饰演的正是同名主角——一个融合了Lady Gaga和泰勒·斯威夫特特质的角色，她正……嗯，处于事业的某个特殊时刻。"
          },
          {
            "en": "And not “having a moment” in the sense of basking in the glow of public adoration, but something more like its opposite.",
            "cn": "这里的“正经历一段特殊时期”并非指沉浸在公众的崇拜光环中，而是更接近于其相反的状态。"
          },
          {
            "en": "Searching for her own center and finding only darkness, she has fled her tour and sought out the old friend (played by Michaela Coel) who helped craft her all-consuming public persona in the first place.",
            "cn": "在寻找自我内心的过程中却只发现一片黑暗，她逃离了巡演，去找那位老朋友（由米凯拉·科尔饰演），正是她当初帮助塑造了那个占据她全部生活的公众形象。"
          },
          {
            "en": "It’s a strange, indelible film—which won’t surprise anyone familiar with Lowery’s previous work ( The Green Knight, A Ghost Story ).",
            "cn": "这是一部诡异而令人难忘的电影——对于熟悉洛维此前作品（《绿骑士》、《鬼故事》）的人来说，这并不令人意外。"
          },
          {
            "en": "Hathaway coveted the part, she says, and it wound up challenging her more than any previous role.",
            "cn": "她说，她曾非常渴望获得这个角色，而这个角色最终给她的挑战比以往任何一个角色都要大。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“What struck me right away, reading the script, is that you can’t ‘perform’ Mother Mary,” says Hathaway.",
            "cn": "“读剧本时，我立刻意识到，圣母玛利亚这个角色是无法‘演’出来的，”海瑟薇说道。"
          },
          {
            "en": "“If I got the part, I would have to become material David could craft with.” In essence, she had to make herself into a credible global pop star, one capable of executing complex choreography in a headdress and high heels and channeling the songs that Antonoff and Charli XCX were writing on her behalf.",
            "cn": "“如果我拿到了这个角色，我就必须成为大卫可以加以雕琢的素材。”归根结底，她必须把自己打造成一位令人信服的全球流行巨星——一位既能戴着头饰、穿着高跟鞋完成复杂的舞蹈编排，又能完美诠释安东诺夫和查莉·XCX为她量身创作的歌曲的明星。"
          },
          {
            "en": "But preparing for all of this wasn’t simply a matter of dance practice or learning to sing by seething and sneering and, yes, sometimes screaming.",
            "cn": "但为这一切做准备，绝不仅仅是练习舞蹈，或是通过怒火中烧、冷笑——是的，有时甚至尖叫——来学习唱歌那么简单。"
          },
          {
            "en": "“I had to submit to being a beginner,” she explains.",
            "cn": "“我必须甘当新手，”她解释道。"
          },
          {
            "en": "“The humility of that—showing up every day knowing you’re going to suck.",
            "cn": "“这种谦卑感——每天到片场时都清楚自己会演得很糟糕。"
          },
          {
            "en": "And it has to be okay.",
            "cn": "而且必须接受这一点。”"
          },
          {
            "en": "You’re not ‘bad.’ You’re just a beginner.",
            "cn": "你并不“差”。你只是个初学者。"
          },
          {
            "en": "Getting to that mindset—I had to shed some things that were hard to shed.",
            "cn": "要达到这种心态——我不得不抛开一些难以割舍的东西。"
          },
          {
            "en": "It was welcome.",
            "cn": "这确实是件值得高兴的事。"
          },
          {
            "en": "But it was hard, the way transformational experiences can be hard.”",
            "cn": "“但这确实很艰难，就像所有能带来蜕变的经历一样艰难。”"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-1.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "WOMEN OF THE HOUR Hathaway photographed at The Metropolitan Museum of Art with 19th-century masterworks by John Singer Sargent (left) and Édouard Manet (right). The Met’s exhibition Sargent and Paris is on display through August 3, 2025.",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685995d4fd3cb6364abedc95/master/w_960,c_limit/VO0825_CoverStory_01.jpg"
      },
      {
        "sentences": [
          {
            "en": "Hathaway radiates enthusiasm.",
            "cn": "海瑟薇浑身散发着热情。"
          },
          {
            "en": "It seems to be her default setting.",
            "cn": "这似乎就是她的常态。"
          },
          {
            "en": "She’s aglow as she talks about struggling through nearly two years of daily dance training, 8 a.m. to 6 p.m. to start, plus singing lessons that instigated a minor identity crisis—not to mention navigating a long shoot in and around Cologne, Germany, that every participant I spoke to for this story agrees was intense.",
            "cn": "当她谈到自己如何坚持了近两年的每日舞蹈训练——起初每天从早上8点练到下午6点，再加上曾引发她轻微身份危机的声乐课程时，脸上洋溢着光彩——更不用说在德国科隆及周边地区进行的漫长拍摄了，我为此报道采访过的每一位参与者都一致认为那段经历异常艰苦。"
          },
          {
            "en": "The point is, she came out the other side remade.",
            "cn": "关键在于，她最终蜕变重生。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“I’d say, You have to show me how you’re feeling with your body,” recalls choreographer Dani Vitale.",
            "cn": "“我会说：‘你必须用身体向我展现你的感受，’”编舞家丹尼·维塔莱回忆道。"
          },
          {
            "en": "“You can’t tell me you’re angry; show me.",
            "cn": "“你不能只是告诉我你生气了，要让我看出来。"
          },
          {
            "en": "Proprioception.",
            "cn": "本体感觉。"
          },
          {
            "en": "That was the training, getting Annie out of her head.” And giving Hathaway permission to be messy, vulgar, temperamental, and—above all—imperfect.",
            "cn": "“这就是训练，让‘安妮’从脑海中消失。”并允许海瑟薇展现出邋遢、粗俗、脾气暴躁的一面，最重要的是——不完美。"
          },
          {
            "en": "“I remember that first day, being like, Oh no.",
            "cn": "“我记得第一天，当时心想：‘哦，不。’”"
          },
          {
            "en": "Because she’s like a doll, you know?",
            "cn": "因为她就像个洋娃娃一样，你知道的？”"
          },
          {
            "en": "So pretty, so graceful.",
            "cn": "那么漂亮，那么优雅。"
          },
          {
            "en": "I thought, Oh God, I have to break this person.",
            "cn": "我当时心想：‘天哪，我得把这个人“摧毁”才行。’”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“I finally learned how to breathe,” says Hathaway of her sessions—ongoing—with Vitale.",
            "cn": "“我终于学会了如何呼吸，”海瑟薇在谈到她与维塔莱仍在进行的训练课程时说道。"
          },
          {
            "en": "“My body was so locked up—I literally couldn’t take a deep breath.",
            "cn": "“我的身体紧绷得像块石头——我真的连深呼吸都做不到。”"
          },
          {
            "en": "I’d been trying to open that space for years and I thought it was physically impossible.",
            "cn": "我多年来一直试图打开那个空间，却以为这在生理上根本不可能。”"
          },
          {
            "en": "All my breath, it was stuck….” She makes a strangling gesture.",
            "cn": "“我所有的气息，都卡住了……”她做了一个窒息的手势。"
          },
          {
            "en": "A bit later, recalling her frustrations with her vocal coach, she stops mid-anecdote to strike a low note on the keyboard beside her.",
            "cn": "稍后，当她回忆起与声乐教练之间的摩擦时，她讲到一半便停了下来，在身旁的键盘上弹了一个低音。"
          },
          {
            "en": "Idly, I assume.",
            "cn": "我随口猜测道。"
          },
          {
            "en": "Then she explains that, just as she was reaching her breaking point, she was instructed to lie on the floor “and make sounds until something felt true.”",
            "cn": "随后她解释说，就在她快要崩溃的时候，教练让她躺在地板上，“发出声音，直到感觉对了为止。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“My whole life, I’ve been up here,” Hathaway continues, tapping a high note on the keyboard.",
            "cn": "“我这一生，一直都在这里，”海瑟薇继续说道，同时在键盘上弹出一个高音。"
          },
          {
            "en": "“Soprano.",
            "cn": "“女高音。"
          },
          {
            "en": "My mom’s a soprano—a beautiful singer.",
            "cn": "我妈妈是女高音——一位美妙的歌手。"
          },
          {
            "en": "And I can touch those notes, but….” Hathaway plays the low note again, letting it sustain.",
            "cn": "“我能触及那些音符，但……”海瑟薇再次奏出那个低音，让它持续回响。"
          },
          {
            "en": "“It turns out, I’m down here.",
            "cn": "“结果发现，我其实在这里。”"
          },
          {
            "en": "That’s where I like to live.”",
            "cn": "“那正是我喜欢的生活方式。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Here’s the thing about Anne Hathaway: She is incredibly nice.",
            "cn": "关于安妮·海瑟薇，有一点必须说明：她真的非常亲切。"
          },
          {
            "en": "That sounds like faint praise, but spending time with her made me question whether I’d ever met a truly nice person.",
            "cn": "这听起来像是敷衍的赞美，但与她相处后，我不禁怀疑自己是否曾真正遇见过一个心地善良的人。"
          },
          {
            "en": "I know many kind people—but you can be kind and also sometimes snarky, impatient, aggrieved, aloof, and so on, and no, I am not talking about myself.",
            "cn": "我认识许多善良的人——但一个人可以既善良，有时又尖酸刻薄、不耐烦、心怀不满、冷漠疏离等等，不，我并不是在说我自己。"
          },
          {
            "en": "But Anne Hathaway is kind and nice, and I kept waiting for her mask to slip, for her to do something not nice, but she never did.",
            "cn": "但安妮·海瑟薇确实善良又亲切，我一直在等待她面具滑落，期待她做出些不友善的举动，但她始终没有。"
          },
          {
            "en": "Not from the moment she greeted me with the kind of muscular embrace usually reserved for a long-lost loved one.",
            "cn": "从她用那种通常只留给久别重逢的挚爱才有的有力拥抱迎接我的那一刻起，就从未有过。"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-2.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "FREE MOVEMENT At the Whitney Museum of American Art with Franz Kline’s 1956 painting Mahoning.",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685995d441d9e4045e437043/master/w_960,c_limit/VO0825_CoverStory_02.jpg"
      },
      {
        "sentences": [
          {
            "en": "“No, that’s Annie,” attests Gucci Westman, Hathaway’s frequent makeup artist and friend, known as “Auntie Gucci” to Hathaway’s sons Jonathan, nine, and Jack, five.",
            "cn": "“不，那是安妮，”古驰·韦斯特曼证实道。她是海瑟薇的常任化妆师兼好友，在海瑟薇的儿子——9岁的乔纳森和5岁的杰克——眼中，她被称为“古驰阿姨”。"
          },
          {
            "en": "“Like, she doesn’t gossip.",
            "cn": "“比如，她从不八卦。"
          },
          {
            "en": "It just doesn’t occur to her to be catty—and then you don’t want to be catty around her.",
            "cn": "她根本不会去想那些刻薄的话——所以你也不想在她面前说刻薄的话。"
          },
          {
            "en": "I don’t want to give the impression she’s not fun to hang out with,” Westman quickly adds, going on to say that she and Hathaway “have the best time” vintage shopping (in Japan, recently) and are often mulling home decor, which makes sense, inasmuch as Westman was the previous tenant of Hathaway’s Manhattan home.",
            "cn": "“我不想给人留下她不好相处的印象，” 韦斯特曼随即补充道，并提到她和海瑟薇最近在日本“玩得特别开心”，一起淘古着，还经常讨论家居装饰——这也很合理，毕竟韦斯特曼曾是海瑟薇那套曼哈顿公寓的前房客。"
          },
          {
            "en": "“She’s funny, she’s curious—that’s the main word I’d use to describe her.",
            "cn": "“她风趣，她充满好奇——这是我用来形容她的主要词汇。"
          },
          {
            "en": "I just mean she looks for the good in people.”",
            "cn": "“我的意思是，她总是能看到别人好的一面。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“You see how she treats everyone—and it’s everyone —she’s so kind,” confirms Bradley Cooper, who got to know Hathaway when their Manhattan-based families wound up forming one of the world’s most glamorous COVID pods.",
            "cn": "“你看她对待每个人的方式——真的是每个人——她都特别善良，”布拉德利·库珀证实道。他与海瑟薇相识于曼哈顿，当时两家人的家庭意外组成了世界上最耀眼的“防疫小圈子”之一。"
          },
          {
            "en": "“We started hanging out as parents, having dance parties with children in my kitchen, and I fell in love with both of them,” says Cooper, referring to Hathaway and her husband of a dozen years, Adam Shulman.",
            "cn": "“我们最初是以父母的身份相处的，常在我家厨房里和孩子们一起跳舞，结果我不仅爱上了她，也爱上了她的丈夫，”库珀说道，他所指的是海瑟薇及其结婚十二年的丈夫亚当·舒尔曼。"
          },
          {
            "en": "He seems a bit in awe of their marriage, describing it as “an emblem for that kind of commitment,” in that they “enrich” each other.",
            "cn": "他对两人的婚姻似乎颇为钦佩，称其为“那种承诺的象征”，因为他们彼此“丰富”了对方。"
          },
          {
            "en": "Which, sadly, is not terribly normal—though, according to Cooper, pretty much everything else about the Hathaway-Shulman household is.",
            "cn": "遗憾的是，这并不太寻常——不过据库珀所说，海瑟薇-舒尔曼家里的其他方面几乎都很正常。"
          },
          {
            "en": "“I hate to use that word.",
            "cn": "“我不喜欢用那个词。"
          },
          {
            "en": "But you’ve met Anne: She’s very present and grounded, I’ll put it that way.",
            "cn": "但你见过安妮：她非常专注且脚踏实地，我就这么说吧。"
          },
          {
            "en": "And kind,” he repeats, before allowing that Hathaway has daggers out in one regard: “She’s viciously intelligent.” Okay.",
            "cn": "“而且很善良，”他重复道，随后承认海瑟薇在某一方面确实锋芒毕露：“她聪明得令人发指。”好吧。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "On meeting, Hathaway hugs me, compliments my perfume, identifies it as one she used to wear, then confesses that she’s an occasional late-night lurker on perfume Reddit.",
            "cn": "见面时，海瑟薇拥抱了我，称赞我的香水，说那是她以前用过的一款，然后坦言自己偶尔会在深夜潜水浏览Reddit上的香水板块。"
          },
          {
            "en": "She insists on getting me water—herself.",
            "cn": "她坚持要亲自给我倒水。"
          },
          {
            "en": "She invites me to sit next to her while she screams into Antonoff’s microphone.",
            "cn": "她邀请我坐在她旁边，而她则对着安东诺夫的麦克风放声高歌。"
          },
          {
            "en": "She peppers me with questions about my work, my life.",
            "cn": "她连珠炮似地问我关于工作和生活的问题。"
          },
          {
            "en": "And when she notices there’s a photo of the filmmaker Chantal Akerman on my tote bag, she flips out.",
            "cn": "当她注意到我的托特包上印着电影导演尚塔尔·阿克曼的照片时，她顿时兴奋不已。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“No way.",
            "cn": "“不会吧。"
          },
          {
            "en": "No way.",
            "cn": "不会吧。"
          },
          {
            "en": "Spooky action, this is crazy,” she says, eyes agog.",
            "cn": "“太不可思议了，简直太疯狂了，”她瞪大眼睛说道。"
          },
          {
            "en": "“Because you have to understand, I just watched one of her films, Saute ma Ville, for the first time last night.",
            "cn": "“因为你要明白，我昨晚才第一次看了她的电影《跳出我的城市》。”"
          },
          {
            "en": "” There’s a fair amount to unpack here.",
            "cn": "” 这里值得细细品味的地方还不少。"
          },
          {
            "en": "I’ll start with “spooky action.”",
            "cn": "我先从“幽灵般的远距离作用”说起。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The phrase “spooky action at a distance” refers to quantum entanglement, wherein particles remote from each other are mysteriously linked.",
            "cn": "“幽灵般的远距离作用”这一术语指的是量子纠缠，即相距遥远的粒子之间会产生神秘的联系。"
          },
          {
            "en": "In Mother Mary, “Spooky Action” is the name of one of the titular pop star’s songs; it also describes the relationship between Hathaway’s Mary and Coel’s fashion designer character, Sam.",
            "cn": "在电影《圣母玛利亚》中，“诡异作用”既是片中同名流行歌手的歌曲名称之一，也描述了海瑟薇饰演的玛丽与科尔饰演的时装设计师萨姆之间的关系。"
          },
          {
            "en": "(“A creative connection that’s also a spiritual connection, or maybe they’re the same thing,” is how Coel encapsulates it.) The reason for Hathaway flipping out, though, is that ever since she signed on to Mother Mary, her life has been pervaded by the uncanny—spooky action to which director Lowery also attests.",
            "cn": "（“这是一种既是创作上的联结，也是精神上的联结，或者说两者本就是一体的，”科尔如此概括道。） 不过，海瑟薇之所以会情绪失控，是因为自从她签约出演《圣母玛利亚》以来，她的生活便一直充斥着超自然现象——导演洛维也证实了这种“诡异的现象”。"
          },
          {
            "en": "“This film was a doorway into believing, yes, there’s more out there,” he says.",
            "cn": "“这部电影是一扇通往信仰的大门，它让我相信，是的，世上还有更多我们未知的奥秘，”他说。"
          },
          {
            "en": "I should note that neither Lowery nor Hathaway comes across as woo-woo.",
            "cn": "我得说明一下，洛维和海瑟薇都丝毫没有那种“玄学”的感觉。"
          },
          {
            "en": "But on a regular basis now, Hathaway says she gets little pokes from the universe, like the coincidence of seeing Chantal Akerman’s face on my tote.",
            "cn": "但海瑟薇表示，如今她经常会收到来自宇宙的“小提示”，比如偶然在我的托特包上看到尚塔尔·阿克曼的脸。"
          },
          {
            "en": "Which she interprets as a prompt to watch more of Akerman’s films—in a theater, she clarifies.",
            "cn": "她将此解读为一种提示，要她多看一些阿克曼的电影——她特别强调，必须是在电影院里看。"
          },
          {
            "en": "“ Jeanne Dielman doesn’t seem like the kind of movie you watch at home, after the kids are in bed.”",
            "cn": "“《珍妮·迪尔曼》看起来不像那种等孩子们睡着后在家观看的电影。”"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-3.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "SET IN STONE Hathaway flanked by more Sargent masterpieces at The Met. Bvlgari High Jewelry ring.",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685995d4c93e475c4d4e20f0/master/w_960,c_limit/VO0825_CoverStory_03.jpg"
      },
      {
        "sentences": [
          {
            "en": "There are ways, Hathaway admits, that she feels like a beginner at film, never mind that she’s been a familiar face at multiplexes since she was in her teens.",
            "cn": "海瑟薇承认，在某些方面，她感觉自己就像电影界的初学者，尽管她从十几岁起就已成为多厅影院里的熟面孔。"
          },
          {
            "en": "A recent convert to the Criterion Channel, she’s playing catch-up on the art house greats.",
            "cn": "她最近才开始关注“Criterion频道”，正在加紧补看艺术电影的经典之作。"
          },
          {
            "en": "Her interest in cameras and lenses is new.",
            "cn": "她对相机和镜头的兴趣是最近才萌生的。"
          },
          {
            "en": "And acting—even that’s terra incognita, her process evolving in a manner that dovetails with her self-discovery through dance.",
            "cn": "而表演——就连这对于她来说也是一片未知的领域，她的表演过程不断演变，与她通过舞蹈进行的自我探索相辅相成。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“When I worked with James Gray on Armageddon Time, he’d say, ‘Don’t ever try to nail it,’ ” recalls Hathaway.",
            "cn": "“当我和詹姆斯·格雷合作《末日时刻》时，他常说：‘千万别试图把角色演得完美无缺，’”海瑟薇回忆道。"
          },
          {
            "en": "Meaning, don’t plot out your performance; don’t target emotional beats.",
            "cn": "也就是说，不要预先规划表演；不要刻意追求情感高潮。"
          },
          {
            "en": "“And when you impose your shape on a performance, when there’s that scaffolding, it’s less risky,” she goes on to explain.",
            "cn": "“当你用既定的框架来塑造表演时，当有那样的支撑结构时，风险就会小一些，”她继续解释道。"
          },
          {
            "en": "“But what James wanted was a degree of transparency.",
            "cn": "“但詹姆斯想要的是一种透明感。"
          },
          {
            "en": "And that experience—it was pivotal.”",
            "cn": "“而那次经历——堪称转折点。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maybe it was working with Gray, maybe it was turning 40—they occurred one after the other—but something sprung loose in Hathaway in 2022.",
            "cn": "也许是因为与格雷的合作，也许是因为年满40岁——这两件事接踵而至——但2022年，海瑟薇内心深处似乎被解开了某种枷锁。"
          },
          {
            "en": "Consider a few of the next films she made: Eileen, in which she plays a queer-coded Hitchcockian bombshell with a dark secret; the May-December(ish) romance The Idea of You, which sees her climax on camera; and Mother Mary.",
            "cn": "不妨看看她接下来参演的几部电影：《艾琳》，她在片中饰演一位暗藏黑暗秘密、带有酷儿暗示的希区柯克式性感尤物；《对你的想象》，这部讲述“五月与十二月”（或类似）年龄差距的爱情片中，她甚至在镜头前达到了高潮；以及《圣母玛利亚》。"
          },
          {
            "en": "Consider, as well, her relationship with the brand Versace, also cemented over this period: Has Anne Hathaway ever looked sexier or edgier than in that draped chain mail dress she wore to the Bvlgari High Jewelry launch in Venice two years ago, or modeling in the Versace Icons campaigns?",
            "cn": "此外，不妨也看看她与范思哲（Versace）品牌的关系——这段关系同样是在这一时期建立并巩固的：安妮·海瑟薇是否曾比两年前在威尼斯宝格丽（Bvlgari）高级珠宝发布会上身穿那件褶裥链甲礼服时，或是为范思哲“Icons”系列广告大片走秀时，显得更加性感或前卫？"
          },
          {
            "en": "Clearly, she’s been getting in touch with aspects of her libidinal self.",
            "cn": "显然，她正在与自己性欲层面的自我建立联系。"
          },
          {
            "en": "Feeling, not thinking.",
            "cn": "感受，而非思考。"
          },
          {
            "en": "Proprioception, speaking the language of the body, rather than using words.",
            "cn": "本体感觉，即用身体语言而非言语来表达。"
          },
          {
            "en": "But that journey began well before she found herself in a dance studio with Vitale, trying to “crack open her thoracic.” To arrive there, she had to want to find what she had locked away inside.",
            "cn": "但这一旅程早在她与维塔莱一起在舞蹈室里尝试“打开胸腔”之前就已开始。为了达到那个境界，她必须渴望发掘自己内心深处那些被深锁的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Hathaway started working with her longtime stylist, Erin Walsh, when she was pregnant with her younger son, Jack.",
            "cn": "怀着小儿子杰克时，海瑟薇开始与她的长期造型师艾琳·沃尔什合作。"
          },
          {
            "en": "“It’s interesting to meet a woman at that moment in her life because she’s powerful and vulnerable at the same time, and also at the peak of a certain kind of embodiment,” Walsh says, going on to note that she sees similarities with Hathaway today.",
            "cn": "“在人生的那个阶段遇见一位女性很有意思，因为她既强大又脆弱，同时也正处于某种身体表现力的巅峰，”沃尔什说道，并接着指出她看到了与如今海瑟薇的相似之处。"
          },
          {
            "en": "“I liken it to owning your sexuality, what it does when you step into that.",
            "cn": "“我把它比作拥抱自己的性感，当你真正融入其中时，会发生什么变化。"
          },
          {
            "en": "She moves differently.",
            "cn": "她的举止与众不同。"
          },
          {
            "en": "That’s the easiest way to explain it.”",
            "cn": "“这就是最简单的解释方式。”"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-4.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "HEY, LADY Hathaway considers Amy Sherald’s Michelle LaVaughn Robinson Obama, 2018, at the Whitney Museum of American Art, New York.",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685995d45ab364d88c7d0ac4/master/w_960,c_limit/VO0825_CoverStory_04.jpg"
      },
      {
        "sentences": [
          {
            "en": "A woman who is in a moment of transition—powerful, vulnerable, embodied in a new way.",
            "cn": "一位正处于转型期的女性——既强大又脆弱，以一种崭新的方式展现自我。"
          },
          {
            "en": "Only now, she’s giving birth to herself.",
            "cn": "直到此刻，她才真正重生。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’ve been tiptoeing around this, but now I’ll just come out and say it: Mother Mary is a very weird movie.",
            "cn": "我之前一直对此讳莫如深，但现在我还是直说吧：《圣母玛利亚》是一部非常怪异的电影。"
          },
          {
            "en": "It’s produced by A24, features songs by Jack Antonoff and Charli XCX, and the supporting cast includes FKA twigs, Hunter Schafer, and Kaia Gerber, so it is also a very cool movie, but be forewarned, if you’re anticipating a fictionalized version of Miss Americana, or something like that, forget it.",
            "cn": "该片由A24出品，配乐由杰克·安东诺夫和查莉·XCX操刀，配角阵容包括FKA twigs、 亨特·谢弗和凯亚·格伯，因此也是一部非常酷的电影，但请注意：如果你期待的是《美国小姐》的虚构版，或者类似的作品，那就别指望了。"
          },
          {
            "en": "Much of the story turns on the making of a dress—which is spectacular—and most of the film is just Anne Hathaway and Michaela Coel hanging out in a barn.",
            "cn": "故事的大部分情节围绕着一件礼服的制作展开——这件礼服确实令人惊叹——而影片的大部分时间里，安妮·海瑟薇和米凯拉·科尔只是在谷仓里闲逛。"
          },
          {
            "en": "There are also concert sequences that pay off Hathaway’s dance training (and show off Bina Daigeler’s next-level costume design), as well as a couple demented flashbacks.",
            "cn": "此外还有几场演唱会场景，充分展现了海瑟薇的舞蹈训练成果（同时也彰显了比娜·戴格勒超凡脱俗的服装设计），以及几段令人毛骨悚然的闪回片段。"
          },
          {
            "en": "But really, the movie is made out of whatever magic Hathaway, Coel, and Lowery managed to conjure in that 13th-century barn near Bonn, day after day after day after day.",
            "cn": "但说到底，这部电影的魔力，正是源于海瑟薇、科尔和洛维在波恩附近那座13世纪谷仓里，日复一日、日复一日、日复一日所创造出的奇妙氛围。"
          },
          {
            "en": "It’s possible that everyone on the shoot went temporarily, mildly insane.",
            "cn": "说不定，片场里的每个人当时都暂时、轻微地发疯了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“It felt like shooting Apocalypse Now, ” says Lowery of a pivotal sequence near the end of the film.",
            "cn": "“感觉就像在拍《现代启示录》，”洛维谈到影片结尾处的一段关键场景时说道。"
          },
          {
            "en": "“At one point Annie broke down and said, ‘I have to apologize, because I think what’s going to come out of me will hurt you.’ And Michaela took her hands and said, ‘I love you, I trust you,’ ” Lowery recalls.",
            "cn": "“有一次，安妮崩溃了，说：‘我必须向你道歉，因为我觉得我接下来要说的话会伤害到你。’米凯拉握住她的手说：‘我爱你，我相信你，’ ”洛维回忆道。"
          },
          {
            "en": "“We were in various stages of that for about a week, shooting that scene.”",
            "cn": "“我们花了大约一周时间，在拍摄那场戏时经历了这个过程的不同阶段。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“David’s writing is so vivid—we were forced into an intensity,” says Coel, who blew off steam by going to Cologne’s techno clubs.",
            "cn": "“大卫的剧本如此生动——我们被逼入了一种极致的张力之中，”科尔说道，她曾通过去科隆的电子音乐俱乐部来释放压力。"
          },
          {
            "en": "Eventually, she convinced Hathaway to join her.",
            "cn": "最终，她说服了海瑟薇加入其中。"
          },
          {
            "en": "“It’s very brave work that she’s done.",
            "cn": "“她完成的是一项非常勇敢的表演。"
          },
          {
            "en": "Look at that dance in the barn—it’s scary,” she adds, referring to one of the film’s arresting moments, a solo performance by Hathaway of surpassing emotional nudity.",
            "cn": "“看看谷仓里的那段舞蹈——那简直令人胆战心惊，”她补充道，指的是影片中一个引人入胜的场景：海瑟薇那段情感赤裸到极致的独舞。"
          },
          {
            "en": "“The physicality she had to learn in preparation for this job—and it’s not just us in the barn, it’s the crew, it’s the producers, and so of course this day was terrifying, a little monster on her shoulder, but no one realized until after the first take.",
            "cn": "“为了准备这个角色，她必须掌握的肢体技巧——这不仅是我们这些在谷仓里的人，还包括剧组和制片人，所以那天当然令人恐惧，仿佛肩上趴着一只小怪物，但直到第一个镜头拍完后，大家才意识到这一点。"
          },
          {
            "en": "And then to keep doing it—take after take.",
            "cn": "然后还要坚持下去——一遍又一遍。"
          },
          {
            "en": "That requires a lot of strength.",
            "cn": "这需要巨大的力量。"
          },
          {
            "en": "Gallons and tons.”",
            "cn": "“加仑和吨。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“The crew, these massive German men, they all broke into tears when she was done,” recalls Vitale, who choreographed the dance.",
            "cn": "“剧组里那些魁梧的德国大汉，当她跳完时，全都潸然泪下，”负责编舞的维塔莱回忆道。"
          },
          {
            "en": "“It was the craziest day.",
            "cn": "“那真是最疯狂的一天。"
          },
          {
            "en": "I mean, everyone got challenged.",
            "cn": "我的意思是，每个人都面临了挑战。"
          },
          {
            "en": "But it made us all super close.",
            "cn": "但这让我们所有人都变得非常亲密。"
          },
          {
            "en": "It’s like David started a cult by accident.”",
            "cn": "“这简直就像大卫无意间创立了一个邪教。”"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-5.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "PUTTING DOWN ROOTS On her home life in Manhattan: “Uno games, baking when there’s time, teaching the kids to dribble a basketball in the apartment without upsetting the neighbors….”",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685995d612b3276db9d30615/master/w_960,c_limit/VO0825_CoverStory_05.jpg"
      },
      {
        "sentences": [
          {
            "en": "Call it the spooky-action cult.",
            "cn": "不妨称之为“幽灵般作用教派”。"
          },
          {
            "en": "According to Vitale, she, Hathaway, Coel, Schafer, twigs, and Gerber maintain their Mother Mary group chat.",
            "cn": "据维塔莱透露，她、海瑟薇、科尔、谢弗、特威格斯和格伯一直保持着“圣母玛利亚”群聊。"
          },
          {
            "en": "Maybe they discuss the stuff everyone clammed up about when they talked to me.",
            "cn": "也许她们正在讨论那些大家在跟我交谈时都三缄其口的話題。"
          },
          {
            "en": "I don’t mean they went silent about anything specific—more like there’s a general air of “What happened on Mother Mary stays on Mother Mary.",
            "cn": "我并不是说她们对任何具体的事情都三缄其口——更像是存在一种“在‘圣母玛利亚’群里发生的事，就留在‘圣母玛利亚’群里”的普遍氛围。"
          },
          {
            "en": "” At a certain point, conversations hit a wall, or, as in my wonderful chat with costume designer Daigeler, U-turn back to friendlier subjects, like getting Iris van Herpen to design the film’s all-important frock, or Issey Miyake references in the pleating.",
            "cn": "” 谈话到了一定程度就会陷入僵局，或者，就像我与服装设计师戴格勒的那次精彩对话一样，话题会突然转向更轻松的话题，比如邀请伊里斯·范·赫彭设计影片中那件至关重要的礼服，或者褶皱设计中对三宅一生风格的致敬。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The craziest fact I did manage to learn about the making of Mother Mary is that zero songs were ready to go at the time shooting commenced.",
            "cn": "关于《圣母玛利亚》的制作，我确实了解到最离奇的一点是：开拍时连一首配乐都没准备好。"
          },
          {
            "en": "As in, Hathaway had no idea what this fictional global pop star she was playing sounded like.",
            "cn": "也就是说，海瑟薇完全不知道自己饰演的这位虚构的全球流行巨星声音是什么样的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She knew what she looked like, thanks to Lowery and Daigeler’s vision and her own contribution of “blond with fried roots.” And she grasped how Mother Mary fit into the zeitgeist, blurring the line between pop idol and actual deity, and she could imagine the character’s internal conflicts, as they were adjacent to ones she herself had navigated, coming of age in the public eye.",
            "cn": "多亏了洛维和戴格勒的构想，以及她自己贡献的“发根焦黄的金发”造型，她清楚自己该呈现出怎样的形象。 她深谙“圣母玛利亚”如何契合时代精神，模糊了流行偶像与真正神明之间的界限；她也能设身处地地体会这个角色的内心冲突，因为这些冲突与她自己曾在公众视线中成长时所经历的如出一辙。"
          },
          {
            "en": "Where is the boundary between public and private?",
            "cn": "公共与私人的界限在哪里？"
          },
          {
            "en": "Between the life and the art?",
            "cn": "生活与艺术之间呢？"
          },
          {
            "en": "But music?",
            "cn": "但音乐呢？"
          },
          {
            "en": "No.",
            "cn": "不。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“It was so confusing,” says Hathaway, with the glow of someone who has been surprised with an extraordinary gift.",
            "cn": "“那真是让人摸不着头脑，”海瑟薇说道，脸上洋溢着仿佛意外收到一份非凡礼物般的喜悦。"
          },
          {
            "en": "And that’s how she means it.",
            "cn": "她正是这个意思。"
          },
          {
            "en": "“I had to learn….",
            "cn": "“我不得不学习……"
          },
          {
            "en": "Because if I’d had the music a year before we ever turned a camera on, I would have tattooed every note of it on my soul, and there would have been a whole process, very specific.",
            "cn": "因为如果能在开机前一年拿到乐谱，我本会将每一个音符都铭刻在灵魂深处，而且会经历一个非常具体、完整的准备过程。"
          },
          {
            "en": "And that was not available to me.",
            "cn": "而我并没有这样的机会。"
          },
          {
            "en": "In the end,” she continues, “I am very grateful I could not take control.”",
            "cn": "“归根结底，”她继续说道，“我非常庆幸自己当时无法掌控全局。”"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-6.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "GREEN DAY “You see how she treats everyone—and it’s everyone, ” says her friend Bradley Cooper. “She’s so kind.”",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685aad6eafc82a7e943bc0ad/master/w_960,c_limit/VO0825_CoverStory_06.jpg"
      },
      {
        "sentences": [
          {
            "en": "It seems to have been that dance in the barn that locked the Mother Mary sound into place.",
            "cn": "似乎正是谷仓里的那段舞蹈，让“Mother Mary”的音乐风格最终定型。"
          },
          {
            "en": "As Charli XCX explains in an email, she and Antonoff were looking at footage from the shoot, and its gothic, “almost Poe-like” tone had already begun to shift their direction; then they saw the dance number.",
            "cn": "正如查莉·XCX在电子邮件中所解释的那样，她和安东诺夫当时正在观看拍摄花絮，其中那种哥特式的、“几乎像爱伦·坡作品一样”的基调已经开始改变他们的创作方向；随后，他们看到了那段舞蹈片段。"
          },
          {
            "en": "“And Anne’s movement was super graphic, very thrashing and jerky and bold in this super magical and scary way,” Charli writes.",
            "cn": "“安妮的肢体动作极具画面感，既激烈又断续，大胆中透着一种既神奇又令人恐惧的特质，”查莉写道。"
          },
          {
            "en": "“It felt volatile and gripping, so Jack and I went away and thought about that.”",
            "cn": "“那种感觉既充满爆发力又引人入胜，所以杰克和我回去仔细思考了一番。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So, in a sense, you might say Hathaway cowrote her Mother Mary songs.",
            "cn": "因此，从某种意义上说，你可以认为海瑟薇是“圣母玛利亚”歌曲的合著者。"
          },
          {
            "en": "Or at the very least, inspired a few of the screams.",
            "cn": "或者至少，为其中几段尖叫声提供了灵感。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was too nice to stay indoors, so Hathaway and I decided to walk to Adorama, a camera shop in Chelsea.",
            "cn": "天气太好了，实在不适合待在室内，于是海瑟薇和我决定步行去切尔西的一家相机店——Adorama。"
          },
          {
            "en": "She’s been getting into photography—tinkering for now, though she likes the idea of wandering the streets with a vintage Rolleiflex, the camera Vivian Maier used, snapping candids while no one’s looking.",
            "cn": "她最近迷上了摄影——虽然目前还只是在摸索阶段，但她很喜欢这个想法：拿着维维安·迈尔用过的复古罗莱flex相机在街上闲逛，趁没人注意时抓拍生活瞬间。"
          },
          {
            "en": "Fat chance.",
            "cn": "这可能性微乎其微。"
          },
          {
            "en": "On the 15-minute trek over she was asked for three autographs and two selfies—she obliged, very nicely, of course—and we also got papped.",
            "cn": "在这15分钟的步行途中，有人向她索要了三次签名和两次合影——她当然都很亲切地应允了——而我们也被狗仔拍到了。"
          },
          {
            "en": "This while she was doing her best to be discreet—bug-eye sunglasses, baseball cap.",
            "cn": "尽管她当时竭力保持低调——戴着大眼镜片太阳镜，头戴棒球帽。"
          },
          {
            "en": "Anne Hathaway has been famous for a long time.",
            "cn": "安妮·海瑟薇成名已久。"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-7.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "TAKING A BOW “She’s a curious person and she’s still learning and growing, and you have to be sort of humble to come in with that attitude,” says the director Michael Showalter.",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685995d482bc010538714d16/master/w_960,c_limit/VO0825_CoverStory_07.jpg"
      },
      {
        "sentences": [
          {
            "en": "Indeed, Hathaway’s 25 years of celebrity were a key reason Lowery wanted her for Mother Mary: She is nearly unique among actresses of her age range and stature in being able to bring a certain iconic aura to the role.",
            "cn": "事实上，海瑟薇25年的演艺生涯正是洛维选择她饰演圣母玛利亚的关键原因：在同年龄段和同等地位的女演员中，她几乎是唯一能为这个角色注入某种标志性气场的人。"
          },
          {
            "en": "Lowery’s intention was to subvert and manipulate that aura.",
            "cn": "洛维的意图正是要颠覆并驾驭这种气场。"
          },
          {
            "en": "But there are plenty of people—36 million following Hathaway on Instagram, to start—who very much like Anne Hathaway, star, and who want her to sparkle just as she always has.",
            "cn": "但仍有许多人——仅Instagram上就有3600万粉丝关注海瑟薇——非常喜欢这位明星安妮·海瑟薇，并希望她能像往常一样闪耀。"
          },
          {
            "en": "Vivacious, Valentino-glam Anne.",
            "cn": "那个活泼开朗、身着瓦伦蒂诺华服的安妮。"
          },
          {
            "en": "And Hathaway isn’t opposed to that, up to a point.",
            "cn": "在某种程度上，海瑟薇并不反对这一点。"
          },
          {
            "en": "She is still close to Valentino and his partner, Giancarlo Giammetti; she will undoubtedly wear the label again.",
            "cn": "她与瓦伦蒂诺及其合伙人詹卡洛·贾梅蒂的关系依然密切；她无疑会再次身着该品牌的服装。"
          },
          {
            "en": "Two of the upcoming films on her slate, The Devil Wears Prada 2 and The Princess Diaries 3, see her reprising beloved roles.",
            "cn": "在她即将上映的电影中，《穿普拉达的女王2》和《公主日记3》这两部作品中，她将再次饰演深受观众喜爱的角色。"
          },
          {
            "en": "She’s also reteaming with the Idea of You director Michael Showalter for the thriller Verity, based on Colleen Hoover’s bestseller, and reuniting with her Interstellar director Christopher Nolan to take one of the starriest roles in his very starry adaptation of The Odyssey.",
            "cn": "她还将与《对你的想象》导演迈克尔·肖沃尔特再度合作，拍摄根据科琳·胡佛畅销小说改编的惊悚片《真相》，并重聚《星际穿越》导演克里斯托弗·诺兰，在后者群星云集的《奥德赛》改编版中担纲其中一个最耀眼的角色。"
          },
          {
            "en": "(Other key cast includes Matt Damon, Tom Holland, and Zendaya.) This is all stuff she knows how to do.",
            "cn": "（其他主要演员包括马特·达蒙、汤姆·霍兰德和赞达亚。）这些她都驾轻就熟。"
          },
          {
            "en": "What she also wants are more opportunities to submit—her word—to the unknown.",
            "cn": "她还渴望获得更多机会去‘臣服’——这是她自己的说法——于未知。"
          },
          {
            "en": "To begin, and begin, and begin.",
            "cn": "开始，开始，再开始。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“She’s a curious person and she’s still learning and growing, and you have to be sort of humble to come in with that attitude,” says Showalter.",
            "cn": "“她是一个充满好奇心的人，仍在不断学习和成长，要怀着这样的态度投入工作，就必须保持某种程度的谦逊，”肖沃尔特说道。"
          },
          {
            "en": "“Which is refreshing in an A-list actor.",
            "cn": "“对于一位一线女星来说，这确实令人耳目一新。"
          },
          {
            "en": "And that is your first impression: star.",
            "cn": "这就是你的第一印象：明星。"
          },
          {
            "en": "She’s very glamorous.” Once you get past the polish and the poise and the buoyancy, however, Showalter goes on to explain, “there’s a whole other side to her most people don’t get to see.",
            "cn": "“她非常迷人。”不过，肖沃尔特接着解释道，一旦你穿透了她的光鲜、从容和活力，“她还有另一面，这是大多数人无缘得见的。”"
          },
          {
            "en": "And it’s intrinsic to who she is.",
            "cn": "而这正是她本真的一部分。"
          },
          {
            "en": "It fills out the picture.”",
            "cn": "“这才让她的形象更加立体。”"
          }
        ]
      },
      {
        "img": "assets/covers/people-anne-hathaway-mother-mary-8.jpg",
        "alt": "Anne Hathaway · 图片",
        "cap": "NEXT STEPS Two of the upcoming films on Hathaway’s slate, The Devil Wears Prada 2 and The Princess Diaries 3, see her reprising beloved roles.",
        "credit": "Annie Leibovitz / Vogue",
        "sourceUrl": "https://assets.vogue.com/photos/685995d4bf4ab2b24cabdbb3/master/w_960,c_limit/VO0825_CoverStory_09.jpg"
      },
      {
        "sentences": [
          {
            "en": "Here’s some stuff you might not know about Anne Hathaway.",
            "cn": "以下是关于安妮·海瑟薇的一些鲜为人知的事。"
          },
          {
            "en": "It’s not the stuff Showalter is talking about, just some things I’ve learned or observed.",
            "cn": "这并不是肖沃尔特所提到的那些事，只是我了解或观察到的一些情况。"
          },
          {
            "en": "She played basketball growing up and she’s crazy about the Knicks.",
            "cn": "她小时候打过篮球，而且对尼克斯队痴迷不已。"
          },
          {
            "en": "Like, so crazy that the closest she came to being not-nice to me was furrowing her brow in grave disappointment that I wasn’t following the Knicks’ exciting postseason run.",
            "cn": "她对尼克斯队的痴迷程度之深，甚至到了这种地步：她对我最接近“不友好”的反应，就是因为我没关注尼克斯队激动人心的季后赛征程，而她因此严重失望地皱起了眉头。"
          },
          {
            "en": "Leisure-wise, “hanging out” is mostly what she likes to do: chill with her kids, her husband, her friends.",
            "cn": "说到休闲，她最喜欢做的就是“闲逛”：和孩子们、丈夫以及朋友们一起放松。"
          },
          {
            "en": "“Uno games, baking when there’s time, teaching the kids to dribble a basketball in the apartment without upsetting the neighbors….” This information came to me in the form of what seems to be another of her great leisure pursuits: text messaging.",
            "cn": "“玩UNO牌、有空时做烘焙、教孩子们在公寓里运球却不打扰邻居……”这些信息是以她另一项似乎很棒的休闲活动——发短信——的形式传到我手上的。"
          },
          {
            "en": "That’s a joke, sort of.",
            "cn": "这算是开个玩笑吧，算是。"
          },
          {
            "en": "She’s insanely busy at the moment so a lot of her life, I’m guessing, is mediated through her phone.",
            "cn": "她目前忙得不可开交，所以我猜，她生活的很大一部分都是通过手机来维系的。"
          },
          {
            "en": "But when Hathaway is home, she’s “so, so grateful [her] husband is a great cook and an early riser.” (Among his many other wonderful qualities, she takes pains to note.) There’s no breaking news here.",
            "cn": "但当海瑟薇在家时，她“真的、真的非常感激[她的]丈夫既是个出色的厨师，又是个早起的人。”（她特意指出，这只是他众多优秀品质中的一项。）这并不是什么新闻。"
          },
          {
            "en": "The news is the way she’s breathing it all in.",
            "cn": "真正值得关注的是她如何将这一切尽收眼底。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was when I met Hathaway at the recording studio that she’d first mentioned her mother’s singing voice; according to Hathaway, she can really belt.",
            "cn": "就在我在录音棚见到海瑟薇时，她第一次提到了母亲的歌声；据海瑟薇说，她母亲的嗓音真的非常洪亮。"
          },
          {
            "en": "And growing up in New Jersey, she’d always been frustrated that she couldn’t produce the same “effortless, powerful sound.” Later, packing up for our field trip to the camera store, she told me about her childhood forays into the world of orchestral music, a serious pursuit “until acting swallowed everything.” Right from the start, she wanted to play the trumpet.",
            "cn": "在新泽西长大的她，一直为自己无法奏出那种“行云流水般又充满力量的声音”而感到沮丧。 后来，当我们收拾东西准备去照相馆参观时，她向我讲述了她童年时涉足管弦乐世界的经历——那曾是一段认真的追求，“直到演艺事业吞噬了一切”。从一开始，她就想吹小号。"
          },
          {
            "en": "Her mother said no.",
            "cn": "她母亲还是拒绝了。”"
          },
          {
            "en": "“And I said, Why?",
            "cn": "“我又问：‘为什么？’”"
          },
          {
            "en": "And she said because of my braces.",
            "cn": "她说，是因为我戴着牙套。”"
          },
          {
            "en": "She said, You can play flute.",
            "cn": "她说：‘你可以吹长笛。’"
          },
          {
            "en": "And I told her, But I don’t like the flute….”",
            "cn": "“我跟她说了，‘可是我不喜欢吹长笛……’”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For a year, Hathaway was made to play flute.",
            "cn": "整整一年，海瑟薇都被迫学习长笛。"
          },
          {
            "en": "“It was awful.",
            "cn": "“那简直太糟糕了。”"
          },
          {
            "en": "And I was bad.",
            "cn": "而且我弹得很差。"
          },
          {
            "en": "And at the end of the year I went to my teacher and explained my predicament and asked, Is it too late to switch if I can convince my mom?” She continues talking as she slips into incognito mode—sunglasses, cap.",
            "cn": "“年底的时候，我去找老师，向他说明了我的困境，然后问：‘如果我能说服妈妈，现在转学还来得及吗？’”她一边说着，一边切换到“隐身模式”——戴上墨镜，拉上帽子。"
          },
          {
            "en": "“And he said, Well, there’s summer school.",
            "cn": "“他说：‘好吧，还有暑期班呢。’"
          },
          {
            "en": "And so I go home and I lay out this whole plan to my mom, and finally she realized, I really did mean it, I just wanted to play trumpet—am I shouting?” She’s not, but she apologizes anyway.",
            "cn": "于是我回到家，把整个计划都告诉了妈妈，她终于意识到，我是认真的，我只是想吹小号——“我是不是在吼？”她其实并没有吼，但还是道了歉。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“It’s good this room is soundproof,” Hathaway adds with a laugh, tapping the foam padding on the wall with a slender, manicured finger before walking out the door.",
            "cn": "“幸好这间屋子是隔音的，”海瑟薇笑着补充道，用她那纤细修长、修剪整齐的手指轻敲了一下墙上的泡沫衬垫，然后走向门口。"
          },
          {
            "en": "“I get passionate and then I get loud.”",
            "cn": "“我一旦投入，就会情不自禁地大声说话。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In this story: hair, Orlando Pita; makeup, Gucci Westman; manicurist, Jin Soon Choi; tailors, Raul Zevallos and Matthew Neff for Carol Ai Studio.",
            "cn": "本篇特辑：发型设计：奥兰多·皮塔；化妆：古驰·韦斯特曼；美甲师：崔珍顺；裁缝：拉乌尔·泽瓦洛斯和马修·内夫（代表Carol Ai Studio）。"
          },
          {
            "en": "Produced by AL Studio.",
            "cn": "由AL Studio制作。"
          },
          {
            "en": "Set Design: Mary Howard.",
            "cn": "布景设计：玛丽·霍华德。"
          },
          {
            "en": "Special thanks to Central Park Conservancy, to 610 Loft & Garden at Rockefeller Center, and The Bouwerie.",
            "cn": "特别鸣谢中央公园保护协会、洛克菲勒中心610 Loft & Garden以及The Bouwerie。"
          }
        ]
      }
    ]
  },
  {
    "id": "fb-kevin-de-bruyne-let-me-talk",
    "cat": "足球",
    "pin": true,
    "title": "Let Me Talk",
    "titleZh": "听我说",
    "source": "The Players' Tribune · 2019-04-15",
    "date": "2019-04-15",
    "minutes": 28,
    "url": "https://www.theplayerstribune.com/articles/kevin-de-bruyne-man-city-let-me-talk",
    "coverImg": "assets/covers/fb-kevin-de-bruyne-let-me-talk.jpg",
    "player": "Kevin De Bruyne",
    "playerZh": "凯文·德布劳内",
    "translation_type": "official",
    "official_source_url": "https://www.theplayerstribune.com/articles/kevin-de-bruyne-man-city-chinese-let-me-talk",
    "paras": [
      {
        "sentences": [
          {
            "en": "I am a brutally honest person.",
            "cn": "我是个非常耿直的人，"
          },
          {
            "en": "So I will let you in on a little secret.",
            "cn": "所以让我先告诉你一个小秘密。"
          },
          {
            "en": "Before I came to Manchester City, I didn’t really know what to make of this Raheem Sterling guy.",
            "cn": "在我到曼城之前，我真的不知道斯特林这家伙会是个什么样的人。"
          },
          {
            "en": "I had never met him, and from what I’d read about him in the English press, I thought he was going to be a very different character.",
            "cn": "我从来没有见过他，根据我在英国媒体上读到关于他的种种，我以为他会是个完全不同的人。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I thought.…",
            "cn": "我以为…"
          },
          {
            "en": "Well.…",
            "cn": "嗯…"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I didn’t think he’d be a bad guy, really.",
            "cn": "我到没想他会是个“坏”家伙。"
          },
          {
            "en": "But the tabloids were always claiming that he was arrogant.",
            "cn": "但是媒体总是说他是如何的高傲自大之类的。"
          },
          {
            "en": "So I guess I thought he’d be…",
            "cn": "所以我就以为他会是…"
          },
          {
            "en": "what do the English call it?",
            "cn": "英国人是怎么说来着？"
          },
          {
            "en": "A bit of a dickhead, maybe?",
            "cn": "也许，有点“混蛋”？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Raheem and I have this strong connection, because we arrived at City around the same time, and there was a lot of negativity about us in the press.",
            "cn": "也许，有点“混蛋”？Raheem和我之间有着很强的联系，我们俩同时加盟曼城，媒体对我们有很多负面的报道。"
          },
          {
            "en": "They said I was “the Chelsea reject.” They said Raheem was this flashy guy who left Liverpool for money.",
            "cn": "当时的我被称做“切尔西弃将”，Raheem被标榜为一个爱炫耀的家伙，离开利物浦就是为了钱。"
          },
          {
            "en": "They said we were difficult characters.",
            "cn": "人们说我们俩是难相处的人。"
          },
          {
            "en": "Of course, when you read this stuff about yourself, you think, Me?",
            "cn": "当然了，当你读到这些关于你自己的话，你会想：“我？"
          },
          {
            "en": "I’m not difficult.",
            "cn": "我不难搞啊，"
          },
          {
            "en": "This is ridiculous.",
            "cn": "太可笑了吧，"
          },
          {
            "en": "These people don’t even know me!",
            "cn": "这些人根本就不认识我！"
          },
          {
            "en": "But honestly, when you read about other players, it influences the way you think.",
            "cn": "”但是说实话，当你读到关于其他人的东西的时候，这些东西会对你的看法多少有些影响，"
          },
          {
            "en": "You can’t help it.",
            "cn": "这是无法控制的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then I got to City and I actually met Raheem, and we’d talk a bit after training, and I thought, Wait, this guy seems really cool?",
            "cn": "所以当我认识Raheem之后，我们在训练之后会聊聊天之类的，然后我想：“等等，这家伙挺酷的啊，"
          },
          {
            "en": "What’s the story here?",
            "cn": "到底怎么回事？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Truthfully, I don’t have many close friends — inside or outside of football.",
            "cn": "说实话，无论是足球场上下，我没有特别多非常要好的朋友。"
          },
          {
            "en": "It takes me a really long time to open up to people.",
            "cn": "我是个慢热的人，总是需要很长时间才能对外人敞开心扉。"
          },
          {
            "en": "But over time, I got closer to Raheem, because our sons were born around the same time, so they would always play together.",
            "cn": "慢慢的，我和Raheem变得更加要好，因为我们各自的儿子差不多同时出生，他们会经常一起玩耍。"
          },
          {
            "en": "I really got to know Raheem, and I recognized what a smart and genuine person he is.",
            "cn": "当我更加了解Raheem之后,我意识到他是多么聪明和真实的一个人。"
          },
          {
            "en": "He couldn’t be more different from what the tabloids were saying.",
            "cn": "他简直和媒体上描述的太不一样了。"
          },
          {
            "en": "This is the real truth: Raheem is one of the nicest, most humble guys I’ve met in football.",
            "cn": "这绝对是事实：Raheem是足球圈里面我见过的，最友好最谦虚的人之一。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Anyway, one day we were talking and Raheem said something like, “Mate, I thought you were going to be well different, before I met you.",
            "cn": "有一天，我们俩在聊天，然后Raheem说：“伙计，在遇见你之前，我以为你是个非常不同的一个人，"
          },
          {
            "en": "I thought you were going to be really distant and shy.",
            "cn": "我以为你会个高冷害羞的人。"
          },
          {
            "en": "But you’re actually quite funny.”",
            "cn": "但是你其实很幽默。"
          },
          {
            "en": "I said, “I have a dry humor.”",
            "cn": "”我说：“我的都是冷幽默”“嗯，"
          },
          {
            "en": "He said, “ Well dry.”",
            "cn": "非常冷”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then he said, “So what did you think I’d be like?”",
            "cn": "然后他问“你当时觉得我会是什么样的？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I said, “Honestly?",
            "cn": "“说实话？"
          },
          {
            "en": "I thought you were going to be really arrogant!”",
            "cn": "我以为你会是特别高傲自大的一个人”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He looked at me like, “Mate!”",
            "cn": "他瞪着我叫到：“你这家伙！”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And I looked at him like, “What?",
            "cn": "我回瞪的他说：“怎么了？"
          },
          {
            "en": "You thought I was going to be weird!”",
            "cn": "你还不是觉得我会是个古怪的人么!”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s a great lesson, I think.",
            "cn": "这件事情是个很好的教训。"
          },
          {
            "en": "In my experience, footballers can be a lot different than you expect, especially if you really get to know them.",
            "cn": "就我自己的经验，足球运动员们可能会和你想象的非常不一样，尤其是在你对他更加的了解之后。"
          },
          {
            "en": "This is definitely true for me as well.",
            "cn": "就我自己而言，也是一样的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I can understand why Raheem thought I was going to be difficult.",
            "cn": "我能理解为什么Raheem会觉得我可能比较难相处。"
          },
          {
            "en": "Since I was 16 years old, there was a cloud that followed me around.",
            "cn": "从我16岁那年开始，就有这么个“乌云”似的东西压着我。"
          },
          {
            "en": "I’ll tell you the story, but please understand that talking about myself is pretty much the hardest thing in the world for me.",
            "cn": "我来讲讲这个故事，但是请你理解，谈论我自己，对我来讲是世界上最困难的事情。"
          },
          {
            "en": "Football?",
            "cn": "如果是聊足球，"
          },
          {
            "en": "I could talk to you for hours about it.",
            "cn": "我可以讲好几个小时。"
          },
          {
            "en": "But anything personal, it’s tough for me.",
            "cn": "但是讲任何关于我个人的事情，对我来说都很难。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s just my nature.",
            "cn": "这就是我的性格，"
          },
          {
            "en": "I’m sure some people reading can relate to this.",
            "cn": "我相信在读这篇文章的一些人会有同感。"
          },
          {
            "en": "Since I was a boy, I’ve always been extremely quiet, extremely shy.",
            "cn": "我从小就是个很安静，很害羞的人。"
          },
          {
            "en": "Didn’t have a PlayStation.",
            "cn": "我没有过PlayStation游戏机，"
          },
          {
            "en": "Didn’t have many close friends.",
            "cn": "没有什么要好的朋友。"
          },
          {
            "en": "The way that I expressed myself was through football, and I was very content with that.",
            "cn": "但是能通过足球表达自己，对我来说已经心满意足。"
          },
          {
            "en": "Off the pitch, I was very introverted.",
            "cn": "足球场下，我是个很内向的人，"
          },
          {
            "en": "I wouldn’t say one word to you.",
            "cn": "没什么话。但是在场上，"
          },
          {
            "en": "But on the pitch, I was so flammable.",
            "cn": "我却是个“一触即发”的人。"
          },
          {
            "en": "I know everyone had a laugh about that clip of me yelling at David Silva to “LET ME TALK!” and all that.",
            "cn": "我知道很多人都觉得那个我冲着大卫席尔瓦喊“听我说！”的视频很搞笑。"
          },
          {
            "en": "But that’s probably quite tame compared to when I was a kid.",
            "cn": "但是说实话那个视频里面的我和我小时候的脾气，根本没法比。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you’re young…",
            "cn": "当你年幼的时候，"
          },
          {
            "en": "well, you don’t understand that people can take it the wrong way.",
            "cn": "人们会误解这种性格，"
          },
          {
            "en": "I learned this the hard way, for sure.",
            "cn": "而我也是经历了很多,才慢慢明白这一点。"
          },
          {
            "en": "When I was 14, I made a decision that really changed my life.",
            "cn": "我14岁的时候，做了一个改变我人生的决定。"
          },
          {
            "en": "I had the opportunity to go to the football academy in Genk, so I moved by myself from one side of Belgium to the other.",
            "cn": "当时有个加入Genk俱乐部训练营的机会，所以我当时从比利时的一端搬到了另外一端。"
          },
          {
            "en": "It was two hours away from home, but I told my parents that I wanted to go.",
            "cn": "虽然离家2个小时，但是我还是告诉我的父母我想去。"
          },
          {
            "en": "The problem was that I was already shy in my hometown.",
            "cn": "离开家这个决定完全是我自己的。"
          },
          {
            "en": "At Genk, I was the new kid from the other side of the country who spoke in a funny dialect.",
            "cn": "但是问题是，我本身就已经很内向了，在Genk，我又是个从远方来的，讲着可笑口音的新来的家伙。"
          },
          {
            "en": "It was lonely, for sure.",
            "cn": "当时确实很孤独，"
          },
          {
            "en": "I didn’t really learn to have a social life, because the only day we had off was Sunday, and that was my opportunity to travel home to see my family.",
            "cn": "真的。在训练学校的前两年是我这辈子最最孤独的两年。我没有像其他孩子一样的社交生活，"
          },
          {
            "en": "So my first two years at the academy were probably the loneliest years I’ll ever live.",
            "cn": "因为我们只有周日休息，所以我只有那一天可以回家看我的家人。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maybe some people will think this was all a bit crazy, like, Why would you even do this at 14 years old?",
            "cn": "也许有些人会觉得这很难理解，你才14岁，为什么要这么做呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The only answer I can give you is that when I was playing football, everything went away.",
            "cn": "我能解释的就是，当我踢球的时候，所有其他的东西都消失不见了。"
          },
          {
            "en": "Any problem I had, anything I was feeling, it all disappeared.",
            "cn": "我所有的问题和苦恼，都会消失。踢球的时候，"
          },
          {
            "en": "When I’m playing football, everything is good.",
            "cn": "所有的一切都是美好的。"
          },
          {
            "en": "If you want to call it an obsession, then maybe it is my obsession.",
            "cn": "如果你觉得这是种痴迷，那也许没错，"
          },
          {
            "en": "Quite simply, it is my life.",
            "cn": "足球就是我最痴迷的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The first year, I lived in a boarding house, where I had this tiny room with a bed and a desk and a sink.",
            "cn": "简单来说，足球就是我的一切。第一年的时候，我住在一个宿舍一样的地方，一个很小的房间，一张床，一个桌子，"
          },
          {
            "en": "The next year, I was able to live with a foster family that the club paid to take in young players.",
            "cn": "一个洗手池。第二年的时候，我搬到了一个俱乐部安排的寄宿家庭。"
          },
          {
            "en": "Me and two other players moved in with them, and it helped me live a more normal life.",
            "cn": "我和另外两个球员搬入了那个家，那让我能够过上更加正常的生活。"
          },
          {
            "en": "I still stayed by myself most of the time, but I thought everything was O.K.",
            "cn": "我仍然独来独往，但是我没觉得有任何问题。"
          },
          {
            "en": "The year went by, and I was doing well in school, doing well in football.",
            "cn": "一年过去了，我在学校表现也不错，"
          },
          {
            "en": "No fights.",
            "cn": "球踢的也很好，"
          },
          {
            "en": "No problems.",
            "cn": "没有打架，"
          },
          {
            "en": "At the end of the year, I packed my bags and said goodbye to my foster family.",
            "cn": "没有闯祸。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They said, “We’ll see you after the break.",
            "cn": "学期结束后，"
          },
          {
            "en": "Have a good summer.”",
            "cn": "我收拾了自己的东西，"
          },
          {
            "en": "But then as soon as I got back to my parents’ house, I walked in the door and could see that my mother was crying.",
            "cn": "和自己的寄宿家庭道别。他们说：“暑假愉快，我们假期之后见。"
          },
          {
            "en": "I thought maybe somebody had died or something.",
            "cn": "”但是当我刚进家门的时候，"
          },
          {
            "en": "I said, “What’s the problem?”",
            "cn": "我就能看出来我的母亲在哭泣。"
          },
          {
            "en": "And my mother said the words that probably shaped my whole life.",
            "cn": "我以为家里有亲人去世了。“怎么了？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She said, “They don’t want you to come back.”",
            "cn": "然后我母亲说了改变我一生的话："
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I said, “What are you talking about?”",
            "cn": "她说：“他们不想要你了。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She said, “The foster family don’t want you there anymore.”",
            "cn": "我问“你在说什么？”她说："
          },
          {
            "en": "I said, “What?",
            "cn": "“你的寄宿家庭，"
          },
          {
            "en": "Why?”",
            "cn": "他们不想你回去了。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She said, “Because of who you are.",
            "cn": "“什么？为什么？”她说：“因为你这个人。"
          },
          {
            "en": "They said you’re too quiet.",
            "cn": "他们说你太安静了，"
          },
          {
            "en": "They can’t interact with you.",
            "cn": "没办法和你互动，"
          },
          {
            "en": "They said you were difficult.”",
            "cn": "他们说你太难相处了。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was really shocked.",
            "cn": "我很惊讶。"
          },
          {
            "en": "It felt like such a personal thing.",
            "cn": "那感觉是个非常私人的问题。"
          },
          {
            "en": "The family never said anything to my face.",
            "cn": "寄宿家庭从来没有当我面提起过。"
          },
          {
            "en": "There was never any problems.",
            "cn": "我从没觉得有什么问题。"
          },
          {
            "en": "I stayed to myself in my room.",
            "cn": "我只是呆在自己的房间里面，"
          },
          {
            "en": "I never bothered anyone.",
            "cn": "不招惹任何人。"
          },
          {
            "en": "They waved goodbye to me like everything was fine.",
            "cn": "他们刚刚还和没事人一样和我道别，"
          },
          {
            "en": "And then they informed the club that they didn’t want me anymore.",
            "cn": "结果他们却和俱乐部说他们不再要我了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was actually a huge issue for my career, because I was not a big star or anything, and suddenly the club thought I was a problem.",
            "cn": "这一下子成为了我的足球生涯中很大的一个难题，因为我本来就不是俱乐部的尖子，这下子俱乐部还会觉得我这个人有问题。"
          },
          {
            "en": "They informed my parents that they didn’t want to pay for another foster family.",
            "cn": "所以他们告诉我的父母，他们不愿意花钱再为我找另外一个寄宿家庭了。"
          },
          {
            "en": "I was going to have to go to another boarding house and live there — and not like a fancy one.",
            "cn": "我必须要去住另外一个宿舍，而且还不是一个很好的一个宿舍，"
          },
          {
            "en": "It was more like a place for troubled kids.",
            "cn": "那是为问题孩子准备的宿舍。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I remember watching my mom crying, and just grabbing the ball.",
            "cn": "我记得我的母亲哭着，我抓起一个足球跑了出去，"
          },
          {
            "en": "I went outside to this fence where I’d always played by myself as a kid.",
            "cn": "到了我儿时经常踢球的一个栅栏边上。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One thing really stuck with me.",
            "cn": "这句话在我脑海中萦绕了很久很久。"
          },
          {
            "en": "“Because of who you are.”",
            "cn": "“因为你这个人。”"
          },
          {
            "en": "The words kept repeating in my head.",
            "cn": "这句话在我脑海中萦绕了很久很久。",
            "cnShared": true
          },
          {
            "en": "I kicked the ball against the fence for hours, and I remember at some point I actually said out loud, “Everything is going to be O.K.",
            "cn": "我冲着栅栏踢了很久的球，我记得自己还对自己说：“没事的，"
          },
          {
            "en": "In two months, I’m going to be in the first team.",
            "cn": "两个月后，我就能到一队。"
          },
          {
            "en": "No matter what, I am not coming back home a failure.",
            "cn": "无论如何，我都不会以一个失败者的身份回到家，"
          },
          {
            "en": "No matter what.”",
            "cn": "不会的。”"
          },
          {
            "en": "I went back to Genk after the summer break, and I had just been moved up to the second team.",
            "cn": "暑假之后我回到Genk, 当时我刚刚被升到二队。"
          },
          {
            "en": "I was a nobody, really.",
            "cn": "我是个无名小卒，真的。"
          },
          {
            "en": "But I was training like…",
            "cn": "但是我当时拼了命的训练…"
          },
          {
            "en": "pfffff.",
            "cn": "真的。"
          },
          {
            "en": "I had so much fire inside me.",
            "cn": "我心里面充满了斗志。"
          },
          {
            "en": "It was mad.",
            "cn": "我心里面充满了斗志。",
            "cnShared": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I remember the exact moment everything changed.",
            "cn": "我清晰的记得那个改变一切的时刻。"
          },
          {
            "en": "We played on a Friday night.",
            "cn": "我们周五晚上有场比赛，"
          },
          {
            "en": "I started on the bench.",
            "cn": "我一开始是在替补席上。"
          },
          {
            "en": "When I came on in the second half, I just went crazy.",
            "cn": "下半场我上场之后，我整个人都疯狂了。"
          },
          {
            "en": "One goal.",
            "cn": "然后，我踢进了…第一个进球。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They don’t want you anymore.",
            "cn": "“他们不要你了…”"
          },
          {
            "en": "Two goals.",
            "cn": "第二个进球。"
          },
          {
            "en": "Too quiet.",
            "cn": "“你太安静了…”"
          },
          {
            "en": "Three goals.",
            "cn": "第三个进球。"
          },
          {
            "en": "Too difficult.",
            "cn": "“你太难相处了…”"
          },
          {
            "en": "Four goals.",
            "cn": "第四个进球。"
          },
          {
            "en": "They don’t want you anymore.",
            "cn": "“他们不要你了…”"
          },
          {
            "en": "Five goals.",
            "cn": "第五个进球。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Because of who you are.",
            "cn": "“因为你这个人…”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I scored five goals in one half.",
            "cn": "我在半场进了5个球。"
          },
          {
            "en": "After that, you could see the change in everybody around the club.",
            "cn": "那之后，你能看到俱乐部所有人的改变。"
          },
          {
            "en": "I earned a spot on the first team within two months.",
            "cn": "两个月之内，我进了一队，"
          },
          {
            "en": "I think I beat my goal by a few days.",
            "cn": "好像比我自己的目标早了几天。"
          },
          {
            "en": "And then, of course, the club told my family that they wanted to pay for a foster family again.",
            "cn": "很显然那个时候，俱乐部也给我的父母打电话说他们会付钱再给我找一个寄宿家庭。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s funny to see the change in how people treat you in football when you’re doing well.",
            "cn": "在足球中，当你表现出色的时候人们对你的态度的转变，真的很可笑。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One day, the foster parents actually showed up at the club, and the woman came up to me like everything was a big misunderstanding.",
            "cn": "有一天，我之前的那个寄宿家庭的夫妇来到了俱乐部，那个女士表现的好像一切都是一个很大的误会似的。"
          },
          {
            "en": "She said something like, “We wanted you to come back!",
            "cn": "她说什么“我们想要你回到我们家里！"
          },
          {
            "en": "We just wanted you to go to the boarding house during the week!",
            "cn": "我们当时只是想让你周一到周五去宿舍，"
          },
          {
            "en": "You can stay with us on weekends!”",
            "cn": "周末你可以住到家里来啊！”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maybe I should’ve found it funny, but at the time it wasn’t funny to me.",
            "cn": "也许我当时应该把那当成玩笑话就完了，但是那个时候，"
          },
          {
            "en": "They had really hurt me.",
            "cn": "我真的不觉得可笑。"
          },
          {
            "en": "So I said, “No.",
            "cn": "他们真的伤害了我。"
          },
          {
            "en": "You threw me in the garbage.",
            "cn": "所以我当时也非常的直白，"
          },
          {
            "en": "Now I’m doing well and you want me back?”",
            "cn": "对他们说“你们把我扔到了垃圾堆里不是么？现在我表现好了，你想要我回去？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the end, I should have just said thank you.",
            "cn": "其实，我似乎应该就说一句谢谢。"
          },
          {
            "en": "That experience was the fuel for my career.",
            "cn": "那个经历是改变我职业生涯的助力。"
          },
          {
            "en": "But, unfortunately, that cloud still followed me around for a long time.",
            "cn": "但是同时，那件事情也像乌云一样压抑了我很长时间。"
          },
          {
            "en": "When I was a young player at Genk, and even when I signed for Chelsea, you would read stories in the Belgian press about how I was a difficult person, and they would always bring up the story of my foster family.",
            "cn": "当我成为Genk的一名年轻球员，甚至是签约切尔西之后，你都能在比利时的媒体上读到我是多么难相处的一个人，然后关于我和寄宿家庭的这个故事，总是被提及。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s true that I can blow up sometimes, especially on the pitch.",
            "cn": "确实，有的时候我在场上会发脾气。"
          },
          {
            "en": "I tend to hold things inside, and then bang — I lose my head.",
            "cn": "我通常都把事情憋在心里，然后突然一下子都释放出来。"
          },
          {
            "en": "Usually five seconds later, I’m calm again.",
            "cn": "5秒钟之后，我又会冷静下来。"
          },
          {
            "en": "But I feel a little bit misunderstood.",
            "cn": "总之有的时候我会觉得被误解。"
          },
          {
            "en": "Everything I’ve ever done in football really comes down to one thing — I want to play.",
            "cn": "我所做的关乎足球的一切，其实都归根结底于一个事情：我想要踢球。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I was at Chelsea, there was so much in the press about my relationship with José Mourinho.",
            "cn": "我在切尔西的时候，关于我和穆里尼奥的关系总是会有很多报道。"
          },
          {
            "en": "But the truth is that I only ever spoke to him twice.",
            "cn": "但是事情的真相是，我总共只和他说过两次话。"
          },
          {
            "en": "The plan was always for me to go on loan for a bit.",
            "cn": "本来计划就是我会被租借出去一段时间。"
          },
          {
            "en": "So I went to Werder Bremen in 2012, and that season went great.",
            "cn": "所以我在2012年去了不来梅，而且那个赛季很不错。"
          },
          {
            "en": "When I came back to Chelsea the next summer, a few German clubs wanted to sign me.",
            "cn": "那个夏天我回到切尔西的时候，有好几个德国的俱乐部想要我。"
          },
          {
            "en": "Klopp wanted me to come to Borussia Dortmund, and they played the kind of football that I enjoy.",
            "cn": "Klopp想要我去多特蒙德，而且他们的打法是我很喜欢的。"
          },
          {
            "en": "So I thought maybe Chelsea would let me go.",
            "cn": "所以我想着可能切尔西会让我去。"
          },
          {
            "en": "But then Mourinho texted me, “You are staying.",
            "cn": "然后穆里尼奥发短信给我说："
          },
          {
            "en": "I want you to be part of this team.”",
            "cn": "“你留下吧，我想要你成为这支队伍的一员。"
          },
          {
            "en": "So I thought, O.K., great.",
            "cn": "”于是我想：“这很好，"
          },
          {
            "en": "I’m in his plans.",
            "cn": "我在他的计划中。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I arrived for preseason, the vibe was good.",
            "cn": "赛季前报到的之后，一开始整个气氛都很不错。"
          },
          {
            "en": "I started two of the first four games of the season, and I thought I played O.K.",
            "cn": "我在前四场比赛中，有两场都是首发，我觉得自己表现还可以。虽然不能说非常的出色，"
          },
          {
            "en": "Not brilliant, but pretty good.",
            "cn": "但是感觉还可以。"
          },
          {
            "en": "After the fourth game, that was it.",
            "cn": "第四场比赛之后，一切就戛然而止了。"
          },
          {
            "en": "I was on the bench, and I never really got a chance again.",
            "cn": "我开始在替补席上，然后就再没有得到什么机会。"
          },
          {
            "en": "I didn’t get an explanation.",
            "cn": "我也没有得到任何的解释，"
          },
          {
            "en": "I was just out of favor for some reason.",
            "cn": "我就一下子不在考虑之中了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And, of course, I made some mistakes myself.",
            "cn": "当然了，我自己也有很多失误。"
          },
          {
            "en": "I was a bit naive about the way that you have to handle yourself as a Premier League footballer.",
            "cn": "我当时对如何做一个英超球员，有着很天真的想法。"
          },
          {
            "en": "What I think most fans don’t realize is that when you’re out of favor at a club, you don’t get nearly the same attention during training.",
            "cn": "球迷不知道的是，如果你在一个俱乐部失宠了，你在训练的时候也不会得到很多的关注。在很多俱乐部，"
          },
          {
            "en": "At some clubs, it’s like you don’t exist anymore.",
            "cn": "甚至你会觉得自己根本不存在了一样。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If it happened to me now, it wouldn’t be a problem.",
            "cn": "如果这发生在现在的我身上，可能不会是大的问题。"
          },
          {
            "en": "I know enough to be able to train on my own and take care of myself.",
            "cn": "我现在知道如何自己训练和照顾自己。"
          },
          {
            "en": "But when you’re 21, you don’t understand what it takes.",
            "cn": "但是当你21岁的时候，对这一切并不太明白。"
          },
          {
            "en": "When I got another chance to play, against Swindon Town in the Cup, I wasn’t in good shape.",
            "cn": "当我在杯赛对阵Swindon Town 又得到一个上场机会的时候，我本身状态并不好。"
          },
          {
            "en": "And then that was pretty much it for me.",
            "cn": "然后那之后，一切基本就结束了。"
          },
          {
            "en": "José called me into his office in December, and it was probably the second big life-changing moment for me.",
            "cn": "穆里尼奥在12月的时候把我叫到办公室，那可能是我这辈子第二个重大的时刻。"
          },
          {
            "en": "He had some papers in front of him, and he said, “One assist.",
            "cn": "他面前放了一些纸，念道：“1次助攻，"
          },
          {
            "en": "Zero goals.",
            "cn": "0进球，"
          },
          {
            "en": "Ten recoveries.”",
            "cn": "10次反抢。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It took me a minute to understand what he was doing.",
            "cn": "我过了一阵才反应过来他在说什么。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then he started reading the stats of the other attacking forwards — Willian, Oscar, Mata, Schürrle.",
            "cn": "然后他开始读其他几个前锋的数据 – Willian, Oscar, Mata, Schürrle.他们的数据都是“5个进球，"
          },
          {
            "en": "And it’s like — five goals, 10 assists, whatever.",
            "cn": "10次助攻” 等等。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "José was just kind of waiting for me to say something, and finally I said, “But…",
            "cn": "穆里尼奥一直等着我说点什么，终于我开口说 “但是…"
          },
          {
            "en": "some of these guys have played 15, 20 games.",
            "cn": "他们踢了15，20场球。"
          },
          {
            "en": "I’ve only played three.",
            "cn": "我才踢了3场。"
          },
          {
            "en": "So it’s going to be different, no?”",
            "cn": "所以这没法比较，不是吗？"
          },
          {
            "en": "It was so strange.",
            "cn": "”那真是个奇怪的时刻。"
          },
          {
            "en": "We had a bit of a conversation about me going back out on loan.",
            "cn": "我们讨论了一下我再次被租借出去之类的，"
          },
          {
            "en": "And Mata was also out of favor at the time, so José said, “Well, you know, if Mata leaves, then you will be the fifth choice instead of sixth.”",
            "cn": "当时Mata似乎也不太被看好，所以穆里尼奥说：“如果Mata离开，那你就是我的前锋第五选择，而不是第六个。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was completely honest.",
            "cn": "我当时又是非常的直白的说："
          },
          {
            "en": "I said, “I feel like the club doesn’t really want me here.",
            "cn": "“我觉得球队并不太想要我在这。"
          },
          {
            "en": "I want to play football.",
            "cn": "我想要踢球，"
          },
          {
            "en": "I’d rather you sell me.”",
            "cn": "所以我宁愿你把我卖了。"
          },
          {
            "en": "I think José was a bit disappointed, but to be fair to him, I think he also understood that I absolutely needed to play.",
            "cn": "”我想当时穆里尼奥可能有些失望，但是公平的讲，他可能也明白我必须要得到上场踢球的机会。"
          },
          {
            "en": "So the club ended up selling me, and there was no big problem at all.",
            "cn": "球队最后把我交易出去了，这一切并没有什么大问题。"
          },
          {
            "en": "Chelsea got more than double the price they paid for me, and I got into a much better situation at Wolfsburg.",
            "cn": "切尔西得到了当时引进我时两倍的价格，而我在沃尔夫斯堡得到了更多的机会。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Everything changed then.",
            "cn": "所有一切就在那个时候改变了。"
          },
          {
            "en": "But not just because of football.",
            "cn": "但并不仅仅是足球生涯上的改变，"
          },
          {
            "en": "It was also because I had my (future) wife by my side.",
            "cn": "而是那个时候我还得到了（未来的）妻子的陪伴，"
          },
          {
            "en": "She helped me grow in ways that I’ve probably never expressed out loud — even to her.",
            "cn": "甚至是对她，我也没有表达过她对我的成长的帮助的感谢。"
          },
          {
            "en": "This is such an embarrassing story that I hesitate to tell it!",
            "cn": "这个故事实在太让人脸红了，我真的不太想说。"
          },
          {
            "en": "But since I promised you honesty, then I guess I have to.",
            "cn": "但是既然我已经向你保证了我要完全诚实，"
          },
          {
            "en": "And it’s pretty funny, anyway.",
            "cn": "那我就必须说一说。"
          },
          {
            "en": "It started with a tweet.",
            "cn": "这真的是个可笑的故事。"
          },
          {
            "en": "I only had a few thousand followers at the time, because I was still on loan at Werder Bremen.",
            "cn": "一切都源于一个Tweet. 我当时在推特上只有几千个粉丝，因为我当时还在不来梅租借中。"
          },
          {
            "en": "So I tweeted something about a match or whatever, and this pretty girl favorited it.",
            "cn": "我发了一条关于比赛的推特，然后这个漂亮的姑娘点了赞。"
          },
          {
            "en": "I was single at the time, and my friend noticed it.",
            "cn": "我当时正好单身，然后我的朋友看到了，"
          },
          {
            "en": "So he said, “She looks like a nice girl, no?",
            "cn": "他说，“她看起来是个不错的女孩不是吗？"
          },
          {
            "en": "You should send her a message.”",
            "cn": "你应该给她发个消息。"
          },
          {
            "en": "And I literally said to him, “No, no, no.",
            "cn": "”我对他说，"
          },
          {
            "en": "Come on.",
            "cn": "“哦不不不，"
          },
          {
            "en": "People don’t like me.",
            "cn": "拉倒吧。"
          },
          {
            "en": "They don’t get me.",
            "cn": "没人喜欢我，"
          },
          {
            "en": "She won’t respond.”",
            "cn": "她不会回复我的。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So he grabbed my phone and started tapping out a message.",
            "cn": "结果他抓起我的电话，开始编辑一段信息，"
          },
          {
            "en": "He showed me the phone and said, “Come on, can I hit send?”",
            "cn": "然后我给我看了一眼说，“我可以点发送吗？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was probably on the floor, cringing, but for some reason I said, “O.K.",
            "cn": "我当时估计躺在地上，浑身上下都不自在，但是不知道为什么，"
          },
          {
            "en": "fine, send it.”",
            "cn": "我竟然说“好吧，"
          },
          {
            "en": "Says it all, no?",
            "cn": "发吧。"
          },
          {
            "en": "I’m supposed to be this big footballer, and I didn’t even have the heart to slide into my future wife’s DMs!",
            "cn": "”你能明白我当时有多怂吗？我这么一个足球运动员，但是我连一个给我未来妻子发信息的胆量都没有！"
          },
          {
            "en": "I didn’t dare!",
            "cn": "我真的没有胆！"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But thankfully, he sent the message for me, and she responded.",
            "cn": "庆幸的是，我的朋友帮我发了那条信息，而且她回复了。"
          },
          {
            "en": "We got to know each other over text for a few months.",
            "cn": "我们在接下来几个月短信交流中了解了彼此，"
          },
          {
            "en": "It’s a lot easier for me once I get to know someone, so after that, I was good.",
            "cn": "对我来说，当我对别人有了一定的了解之后，我会放松很多。"
          },
          {
            "en": "It really was a beautiful thing.",
            "cn": "这是一个美好的故事，"
          },
          {
            "en": "She changed my life in so many ways.",
            "cn": "她改变了我的人生。"
          },
          {
            "en": "Honestly, I don’t know what I would do without her.",
            "cn": "我不知道没有她，我该怎么办。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "People throw around this label of “WAGs,” and I think it’s really a shame.",
            "cn": "人们总是用这个“WAGs”这个词，我觉得这个标签让人感觉不太好。"
          },
          {
            "en": "Because my wife, she’s the most important person in my life.",
            "cn": "我的妻子，她是我生命中最最重要的人。"
          },
          {
            "en": "She sacrificed everything to move away with me when she was 19 years old, to help me follow my dream.",
            "cn": "她在19岁的时候牺牲了一切和我一起搬到远方，为了我能追寻自己的梦想。"
          },
          {
            "en": "We’ve been on this journey together.",
            "cn": "我们一直同舟共济，"
          },
          {
            "en": "I look up to her, in a way.",
            "cn": "在某种程度上来讲，我很敬佩她。"
          },
          {
            "en": "She got me to come out of my shell with people a lot, and the way she’s handled everything is remarkable, really.",
            "cn": "她让我能够在外人面前放开很多，还有她面对一切的方式，我觉得非常的佩服，真的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We had just found out that she was pregnant with our first child during the transfer window in 2015.",
            "cn": "2015年转会期的时候，我们刚刚得知她怀了我们的第一个孩子。"
          },
          {
            "en": "Manchester City, PSG and Bayern were all interested in me.",
            "cn": "曼城，巴黎圣日尔曼，还有拜仁当时都对我感兴趣。"
          },
          {
            "en": "It was an extremely stressful time.",
            "cn": "那是个很令人紧张的一段时间。"
          },
          {
            "en": "We were just starting our family, and we had no idea whether the transfer would go through, or where we’d be living.",
            "cn": "我们刚刚开始组建自己的家庭，但是我们不知道转会是否会成功，也不知道我们会在哪里安家。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Personally, I wanted to go to City.",
            "cn": "我个人来讲，我想要去曼城。"
          },
          {
            "en": "I had Vinny Kompany texting me, telling me all about the project, saying that I would love it.",
            "cn": "当时Vinny Kompany发短信给我，给我讲了很多球队的计划，他说我一定会喜欢的。"
          },
          {
            "en": "And I just felt really good about the club.",
            "cn": "我当时就对球队的印象和感觉非常好。"
          },
          {
            "en": "But I also didn’t want to be disrespectful to Wolfsburg because I genuinely loved my time there.",
            "cn": "但是我也不想对沃尔夫斯堡队有任何的不尊重，因为我真心的很享受我在那里的时光。"
          },
          {
            "en": "So I just tried to shut my mouth and wait.",
            "cn": "所以我决定不要多说什么，静静的等待。"
          },
          {
            "en": "Easy for me!",
            "cn": "这对我来讲，"
          },
          {
            "en": "Every single day, literally for three weeks, my agent was saying, “It’s on.",
            "cn": "小菜一碟。整整三周，每一天，我的经纪人都会说：“没问题的，"
          },
          {
            "en": "Wait, it’s off.",
            "cn": "哦不，好像不行。"
          },
          {
            "en": "It’s on.",
            "cn": "哦，没问题了，"
          },
          {
            "en": "Wait, it’s off again.”",
            "cn": "哦不，好像又不行了。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The stress really had an effect on my wife.",
            "cn": "那段时间的紧张对我妻子的影响不小。"
          },
          {
            "en": "One morning we woke up and she was really, really ill.",
            "cn": "有一天早晨我们醒来，她当时病的很厉害。"
          },
          {
            "en": "We didn’t know what to do.",
            "cn": "我们不知道该怎么办，"
          },
          {
            "en": "We were worried that maybe there was something wrong with the baby.",
            "cn": "很担心也许是孩子出了什么问题。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then she was in a lot of pain, and she was bleeding.",
            "cn": "然后她疼痛难耐，开始流血，"
          },
          {
            "en": "We had no idea what was happening, so we rushed to the hospital.",
            "cn": "我们不知道到底发生了什么，所以赶紧去了医院。"
          },
          {
            "en": "We were worried that maybe she’d lost the baby.",
            "cn": "我们很担心也许我们会失去这个孩子。"
          },
          {
            "en": "It was the worst moment of my life, no question.",
            "cn": "那绝对是我这辈子最难过的时刻。"
          },
          {
            "en": "You’re just sitting there, helpless.",
            "cn": "因为你只能无助的坐在那里。"
          },
          {
            "en": "One minute, all you’re thinking about is a football transfer.",
            "cn": "前一分钟，你还在担心足球俱乐部转会的事情，"
          },
          {
            "en": "And then, all of a sudden, your world is upside down.",
            "cn": "下一分钟，你的整个世界都要坍塌了。"
          },
          {
            "en": "Thank God, in the end, everything was O.K.",
            "cn": "好在我们的儿子并无大碍。如果没有他，"
          },
          {
            "en": "with our son.",
            "cn": "我真的不知道该怎么办。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I don’t know what I would’ve done without him in my life.",
            "cn": "在足球中发生所有美妙的东西，"
          },
          {
            "en": "Everything good that’s ever happened to me in football, it’s nothing compared to my wife and my kids.",
            "cn": "都没有办法和我的妻子还有孩子们比较。那是我生命中第三个重要时刻，"
          },
          {
            "en": "That was the third life-changing moment for me, because it made me realize that football is not life or death.",
            "cn": "因为它让我意识到，足球并不是关乎生死的什么东西。"
          },
          {
            "en": "I think I was probably too consumed by football for the first 23 years of my life.",
            "cn": "我觉得在我前23年的生命中，对于足球太过于痴迷了。"
          },
          {
            "en": "But when I met my wife, and especially after our first son was born, I was not doing it alone anymore.",
            "cn": "当我遇见我的妻子之后，尤其是我们的第一个儿子出生之后，我明白我并不是一个人在奋斗了。"
          },
          {
            "en": "When we started our family and I came to play for City, everything just took off.",
            "cn": "当我们开始有了自己的家庭，当我加盟曼城的时候，这一切才刚刚开始。"
          },
          {
            "en": "Especially when Pep arrived that second season.",
            "cn": "尤其是当Pep在第二年来到曼城之后."
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Pep and I share a similar mentality.",
            "cn": "Pep和我的思想很接近。"
          },
          {
            "en": "To be fair, he’s even more intense about football than I am.",
            "cn": "说实话，他比我对足球更加的痴迷。"
          },
          {
            "en": "He’s so, so stressed — all the time.",
            "cn": "他真的每时每刻，都非常非常的紧绷。"
          },
          {
            "en": "However much mental stress we are under as players, I think he is under twice as much.",
            "cn": "无论我们作为一个球员有着多少的思想压力，他可能承受的是双倍的压力。"
          },
          {
            "en": "Because he is not just interested in winning.",
            "cn": "因为他不仅仅是想要赢球，"
          },
          {
            "en": "He wants perfection.",
            "cn": "他还追逐完美。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The first meeting I ever had with Pep, he sat me down and he said, “Kevin, listen.",
            "cn": "我记得我和Pep的第一次会面，他让我坐下来，说道：Kevin 你听着，"
          },
          {
            "en": "You can be — easily — a top five player in the world.",
            "cn": "你绝对，绝对！能够成为世界前五的球员。"
          },
          {
            "en": "Top five.",
            "cn": "世界前五，"
          },
          {
            "en": "Easily.”",
            "cn": "绝对的。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was shocked.",
            "cn": "我惊讶极了。"
          },
          {
            "en": "But when Pep said it with so much belief, it changed my whole mentality.",
            "cn": "但是当Pep以一种令人信服的口吻说出那些话的时候，我的整个思想都被改变了。"
          },
          {
            "en": "It was kind of genius, I think.",
            "cn": "真的是非常天才的做法，"
          },
          {
            "en": "Because I felt like I had to prove him right, instead of prove him wrong.",
            "cn": "因为那之后我很想要证明他是正确的，而不是证明他是错误的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Most of the time, football is about negativity and fear.",
            "cn": "很多时候，足球充斥着悲观的事情，"
          },
          {
            "en": "But with Pep, it’s about extreme positivity.",
            "cn": "或者是恐惧。但是就Pep而言，"
          },
          {
            "en": "He sets goals that are so high that they’re almost impossible to reach.",
            "cn": "足球是极其正能量的东西。他的目标总是非常的高，"
          },
          {
            "en": "He is a tactical master, yes.",
            "cn": "以至于难以实现。"
          },
          {
            "en": "There’s no doubt about this.",
            "cn": "他是个战术大师，没错。"
          },
          {
            "en": "But what people on the outside don’t see is the pressure he puts on himself to try to achieve perfection.",
            "cn": "但是外界的人们看不到为了追逐完美他给自己的压力有多大。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This season has not been easy for me.",
            "cn": "这个赛季对我来说并不容易。"
          },
          {
            "en": "The injuries and the matches that I’ve missed have been extremely difficult for me, mentally.",
            "cn": "伤病和缺席比赛对我来说是非常痛苦的事情。"
          },
          {
            "en": "Sitting and watching a match from the stands is basically worse than torture for me.",
            "cn": "坐在场下观看比赛对我来说简直比酷刑还难过，"
          },
          {
            "en": "I can’t cope.",
            "cn": "我真的受不了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Actually, my wife says that there’s something wrong with me.",
            "cn": "我妻子说我这个人好像有点问题，"
          },
          {
            "en": "We’ve been together almost seven years, and she had never seen me cry.",
            "cn": "因为我们在一起7年了，但是她从来没有见到我哭。"
          },
          {
            "en": "Even at funerals, I don’t cry.",
            "cn": "就算是在葬礼上，我也不会流泪。"
          },
          {
            "en": "But then earlier this season, I injured my knee against Fulham, and there was some ligament damage.",
            "cn": "但是赛季前段时间，当我在对阵富汉姆时受伤之后，"
          },
          {
            "en": "The doctors told me that I was going to have to be in a brace for a bit.",
            "cn": "医生说我的韧带受伤，医生告诉我必须要带固定器一段时间。"
          },
          {
            "en": "This is always a nightmare, when you can’t even put on your underwear without help.",
            "cn": "连内衣都没有办法自己穿上，是个噩梦般的事情。"
          },
          {
            "en": "But this was really terrible timing, because my wife had just given birth to our second son the day before.",
            "cn": "而且时机简直不能更加糟糕了，因为我的妻子在前一天才刚刚生了我们第二个儿子。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Actually, she had just arrived home from the hospital when I called her on FaceTime to tell her the news.",
            "cn": "实际上，在我打电话告诉她我受伤的时候，她才刚刚从医院回到家。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I said, “How’s the baby?",
            "cn": "我说：“孩子怎么样？"
          },
          {
            "en": "How’s everything?”",
            "cn": "一切都好吧？"
          },
          {
            "en": "She said, “Everything is fine.",
            "cn": "”她说：“一切都好，"
          },
          {
            "en": "Are you crying?”",
            "cn": "你在哭吗？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I had a little tear in my eye, I guess.",
            "cn": "我当时可能眼里有些泪水。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I said, “Well, I have some bad news.",
            "cn": "我说：“我有个坏消息。"
          },
          {
            "en": "It’s my knee again.",
            "cn": "我的膝盖又受伤了。"
          },
          {
            "en": "I’m going to be in a brace for a while.",
            "cn": "我要带固定器一段时间。"
          },
          {
            "en": "So I guess you’re going to have to take care of three babies now.”",
            "cn": "所以你要照顾三个婴儿了。"
          },
          {
            "en": "And then, literally, I broke down in tears.",
            "cn": "”然后，真的，我一下子哭了出来，"
          },
          {
            "en": "I couldn’t help it.",
            "cn": "无法控制般的。"
          },
          {
            "en": "I don’t know if it was the emotion of our son being born, or knowing that I was going to miss some more matches, or maybe both.",
            "cn": "我不知道是因为我们的儿子的出生我太感动了，还是因为我知道我会错过很多比赛，或者两者都有。"
          },
          {
            "en": "But I’m on FaceTime, on that stupid front-facing camera, looking ridiculous, just sobbing.",
            "cn": "不管因为什么，那个时候我冲着那可恶的前置摄像头，很难堪的抽泣着。"
          },
          {
            "en": "My wife couldn’t believe it.",
            "cn": "我的妻子简直不敢相信她的眼睛。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She was like, “You didn’t even cry at our wedding!",
            "cn": "她说：“我们的婚礼上你都没哭！"
          },
          {
            "en": "You didn’t even cry when your sons were born!",
            "cn": "你儿子们出生的时候你都没哭过！"
          },
          {
            "en": "One was born literally YESTERDAY!”",
            "cn": "有一个昨天才出生，昨天！”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think that says it all, really.",
            "cn": "这可能胜过千言万语吧。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Weddings, funerals, births?",
            "cn": "婚礼，"
          },
          {
            "en": "It’s nothing.",
            "cn": "葬礼，"
          },
          {
            "en": "I’m a rock.",
            "cn": "孩子出生？"
          },
          {
            "en": "But if you take football away from me?",
            "cn": "这些对我来说都不足以让我流泪，"
          },
          {
            "en": "Forget it.",
            "cn": "我很坚强。"
          },
          {
            "en": "I can’t cope.",
            "cn": "但是如果你说我没法踢球？"
          },
          {
            "en": "In the end, this project at City is about more than winning.",
            "cn": "我真的受不了。说起来，曼城正在经历的这股势头，"
          },
          {
            "en": "It’s about a certain way of playing and an overall philosophy.",
            "cn": "远远超过了只是对赢球的追逐。它还关乎一种特定的打法和足球哲学。"
          },
          {
            "en": "This is why we get up every morning, why we obsess over so much detail in our work, why we try to push ourselves to the limits.",
            "cn": "这就是我们每天早晨睁开眼的动力，这就是为什么我们对每一个细节都那么在意，这就是为什么我们将自己推到极限。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To play simple football is actually the hardest thing in the world.",
            "cn": "能够踢简单无杂物的足球，实际上是这个世界上最难的事情，"
          },
          {
            "en": "But when it’s rolling?",
            "cn": "但是当我们进入这个状态，"
          },
          {
            "en": "For me, it’s the most joy that I can have in life.",
            "cn": "对我来说，就是生命中最大的幸福感。"
          },
          {
            "en": "So whether or not we achieve the impossible, this wave we’ve been on — it should be appreciated by anyone who truly loves football, I think.",
            "cn": "无论我们能否实现那些不可能，我们正在经历的这股势头，每一个喜欢足球的人都应该珍惜和享受。"
          },
          {
            "en": "When we play our best at City, when we’re fluid it’s like…",
            "cn": "当我们在曼城踢出我们的最高水平的足球，当一切都行云流水，"
          },
          {
            "en": "what’s the word for it?",
            "cn": "这就像…那个词是什么来着？"
          },
          {
            "en": "You know, when you meditate?",
            "cn": "当你冥想的时候？涅磐。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Nirvana.",
            "cn": "对，"
          },
          {
            "en": "It’s really like nirvana for me.",
            "cn": "就像涅磐重生一样。"
          },
          {
            "en": "And I guess I’m a bit of a different kind of person, in that way, expressing myself mostly through football.",
            "cn": "好吧，我可能确实是个不太一样的一个人，大部分时候，我只通过足球来表达自己。"
          },
          {
            "en": "But that’s my story.",
            "cn": "但是这就是我的故事。"
          },
          {
            "en": "Thanks for letting me tell it.",
            "cn": "谢谢你们让我来讲我自己的故事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Thanks for letting me talk.",
            "cn": "谢谢你们听我说。"
          }
        ]
      }
    ]
  },
  {
    "id": "fb-cristiano-ronaldo-madrid-my-story",
    "cat": "足球",
    "pin": true,
    "title": "Madrid: My Story",
    "titleZh": "马德里：我的故事",
    "source": "The Players' Tribune · 2017-10-02",
    "date": "2017-10-02",
    "minutes": 14,
    "url": "https://www.theplayerstribune.com/articles/cristiano-ronaldo-madrid-english",
    "coverImg": "assets/covers/fb-cristiano-ronaldo-madrid-my-story.jpg",
    "player": "Cristiano Ronaldo",
    "playerZh": "克里斯蒂亚诺·罗纳尔多",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "There is a strong memory I have from when I was 7 years old.",
            "cn": "有一段记忆，从我七岁那年起就一直很清晰。",
            "cnEdited": true
          },
          {
            "en": "It is so clear to me that I can picture it right now, and it makes me feel warm.",
            "cn": "清晰到我此刻都能在脑海里看见它，一想起来心里就暖暖的。",
            "cnEdited": true
          },
          {
            "en": "It has to do with my family.",
            "cn": "它和我的家人有关。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I had just started playing real football.",
            "cn": "我刚开始踢真正的足球。",
            "cnEdited": true
          },
          {
            "en": "Before, I was just playing in the streets of Madeira with my friends.",
            "cn": "在那之前，我只是和朋友们在马德拉的街头瞎踢。",
            "cnEdited": true
          },
          {
            "en": "And when I say the street, I don’t mean an empty road.",
            "cn": "我说“街头”，可不是指什么空旷的小路。",
            "cnEdited": true
          },
          {
            "en": "I really mean a street.",
            "cn": "就是货真价实的大马路。",
            "cnEdited": true
          },
          {
            "en": "We didn’t have goals or anything, and we had to stop the game whenever the cars would drive by.",
            "cn": "我们没有球门，什么都没有，一到有汽车开过来，就得停下比赛让路。",
            "cnEdited": true
          },
          {
            "en": "I was completely happy doing that every day, but my father was the kitman for CF Andorinha — and he kept encouraging me to go and play for the youth team.",
            "cn": "那样的日子我每天都过得开心极了。不过我父亲是安多里尼亚俱乐部的装备管理员，他一直鼓励我去青训队踢球。",
            "cnEdited": true
          },
          {
            "en": "I knew it would make him really proud, so I went.",
            "cn": "我知道那样他会非常自豪，于是我就去了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The first day, there were a lot of rules that I didn’t understand, but I loved it.",
            "cn": "第一天，有好多规矩我都搞不明白，但我爱上了那里。",
            "cnEdited": true
          },
          {
            "en": "I got addicted to the structure and the feeling of winning.",
            "cn": "我迷上了那种秩序感，还有赢球的感觉。",
            "cnEdited": true
          },
          {
            "en": "My father was on the sidelines at every match with his big beard and his work trousers.",
            "cn": "每场比赛，我父亲都站在场边，留着大胡子，穿着干活的裤子。",
            "cnEdited": true
          },
          {
            "en": "He loved it.",
            "cn": "他爱极了这一切。",
            "cnEdited": true
          },
          {
            "en": "But my mother and my sisters had no interest in football.",
            "cn": "可我妈妈和姐姐们对足球毫无兴趣。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So every night at dinner, my father kept trying to recruit them to come see me play.",
            "cn": "于是每天晚饭时，我父亲都在动员她们来看我比赛。",
            "cnEdited": true
          },
          {
            "en": "It was like he was my first agent.",
            "cn": "简直就像他是我的第一个经纪人。",
            "cnEdited": true
          },
          {
            "en": "I remember coming home from the matches with him and he’d say, “Cristiano scored a goal!”",
            "cn": "我记得赛后跟他一起回家，他一进门就说：“克里斯蒂亚诺进了一个球！”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They would say, “Oh, great.”",
            "cn": "她们就说：“哦，挺好。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But they didn’t really get excited, you know?",
            "cn": "但你知道的，她们其实并不兴奋。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then he would come home the next time and say, “Cristiano scored two goals!”",
            "cn": "下次他回到家又会说：“克里斯蒂亚诺进了两个球！”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Still no excitement.",
            "cn": "还是没有兴奋。",
            "cnEdited": true
          },
          {
            "en": "They would just say, “Oh, that’s really nice, Cris.”",
            "cn": "她们只会说：“哦，真不错，小克。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So what could I do?",
            "cn": "那我还能怎么办？",
            "cnEdited": true
          },
          {
            "en": "I just kept scoring and scoring.",
            "cn": "我只有不停地进球、再进球。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One night, my father came home and said, “Cristiano scored three goals!",
            "cn": "一天晚上，我父亲回来说：“克里斯蒂亚诺进了三个球！",
            "cnEdited": true
          },
          {
            "en": "He was unbelievable!",
            "cn": "他简直不可思议！",
            "cnEdited": true
          },
          {
            "en": "You have to come see him play!”",
            "cn": "你们一定得去看看他踢球！”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But still, I would look to the sidelines before every match and see my dad standing there alone.",
            "cn": "可即便如此，每次比赛前我望向场边，看到的还是爸爸孤零零站在那里的身影。",
            "cnEdited": true
          },
          {
            "en": "Then one day — I will never forget this image — I was warming up and looked over and I saw my mom and sisters sitting together on the bleachers.",
            "cn": "直到有一天——这个画面我永远忘不了——我正在热身，一抬头，看见妈妈和姐姐们一起坐在看台上。",
            "cnEdited": true
          },
          {
            "en": "They looked…",
            "cn": "那样子……",
            "cnEdited": true
          },
          {
            "en": "how do I say this?",
            "cn": "我该怎么说呢？",
            "cnEdited": true
          },
          {
            "en": "They looked cozy.",
            "cn": "看起来其乐融融。",
            "cnEdited": true
          },
          {
            "en": "They were kind of huddled close together, and they were not clapping or yelling, they were just waving to me, like I was in a parade or something.",
            "cn": "她们紧紧挨在一起坐着，没有鼓掌，也没有喊叫，只是朝我挥手，好像我是在参加什么游行似的。",
            "cnEdited": true
          },
          {
            "en": "They definitely looked like they had never been to a football match before.",
            "cn": "一看就知道，她们以前从来没看过足球比赛。",
            "cnEdited": true
          },
          {
            "en": "But they were there.",
            "cn": "但她们来了。",
            "cnEdited": true
          },
          {
            "en": "That’s all I cared about.",
            "cn": "这才是我在乎的全部。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I felt so good in that moment.",
            "cn": "那一刻我感觉太好了。",
            "cnEdited": true
          },
          {
            "en": "It meant a lot to me.",
            "cn": "那对我意义重大。",
            "cnEdited": true
          },
          {
            "en": "It was like something switched inside of me.",
            "cn": "就像心里有什么东西被点亮了。",
            "cnEdited": true
          },
          {
            "en": "I was really proud.",
            "cn": "我无比自豪。",
            "cnEdited": true
          },
          {
            "en": "At that time, we didn’t have much money.",
            "cn": "那时候，我们家没什么钱。",
            "cnEdited": true
          },
          {
            "en": "Life was a struggle back then in Madeira.",
            "cn": "那些年在马德拉，日子过得很难。",
            "cnEdited": true
          },
          {
            "en": "I was playing in whatever old boots my brother passed down to me or my cousins gave me.",
            "cn": "我踢球穿的都是哥哥传给我的、或者表哥们给的旧球鞋。",
            "cnEdited": true
          },
          {
            "en": "But when you’re a kid, you don’t care about money.",
            "cn": "可小孩子不在乎钱。",
            "cnEdited": true
          },
          {
            "en": "You care about a certain feeling.",
            "cn": "小孩子在乎的是某一种感觉。",
            "cnEdited": true
          },
          {
            "en": "And on that day, this feeling, it was very strong.",
            "cn": "而那一天，那种感觉特别强烈。",
            "cnEdited": true
          },
          {
            "en": "I felt protected and loved.",
            "cn": "我感到被守护，被疼爱。",
            "cnEdited": true
          },
          {
            "en": "In Portuguese, we say menino querido da família.",
            "cn": "用葡萄牙语说，叫 menino querido da família——全家人捧在手心里的宝贝。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I look back on the memory with nostalgia, because that period of my life turned out to be short.",
            "cn": "如今回首这段记忆，满心眷恋，因为我人生中的那段时光，后来证明非常短暂。",
            "cnEdited": true
          },
          {
            "en": "Football gave me everything, but it also took me far away from home before I was really ready.",
            "cn": "足球给了我一切，但它也在我还没真正准备好的时候，就把我带离了家乡。",
            "cnEdited": true
          },
          {
            "en": "When I was 11 years old, I moved from the island to the academy at Sporting Lisbon, and it was the most difficult time in my life.",
            "cn": "十一岁那年，我从岛上搬去里斯本竞技的青训学院，那是我人生中最难熬的一段日子。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s crazy for me to think about now.",
            "cn": "现在想起来都觉得不可思议。",
            "cnEdited": true
          },
          {
            "en": "My son, Cristiano Jr., is 7 years old as I’m writing this.",
            "cn": "我写这篇文字的时候，我的儿子小克里斯蒂亚诺正好七岁。",
            "cnEdited": true
          },
          {
            "en": "And I just think about how I would feel, packing up a bag for him in four years and sending him to Paris or London.",
            "cn": "我一想到四年后要给他收拾行李、把他送去巴黎或伦敦，自己会是什么心情——",
            "cnEdited": true
          },
          {
            "en": "It seems impossible.",
            "cn": "简直不可能。",
            "cnEdited": true
          },
          {
            "en": "And I’m sure it seemed impossible for my parents to do with me.",
            "cn": "我敢肯定，当年我父母送我走的时候，也是同样的心情。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But it was my opportunity to pursue my dream.",
            "cn": "但那是我追逐梦想的机会。",
            "cnEdited": true
          },
          {
            "en": "So they let me go, and I went.",
            "cn": "于是他们放我走，我也就走了。",
            "cnEdited": true
          },
          {
            "en": "I cried almost every day.",
            "cn": "我几乎每天都哭。",
            "cnEdited": true
          },
          {
            "en": "I was still in Portugal, but it was like moving to another country.",
            "cn": "我明明还在葡萄牙，却像是搬到了另一个国家。",
            "cnEdited": true
          },
          {
            "en": "The accent made it like a completely different language.",
            "cn": "口音的差异，让那里的话听起来像另一种语言。",
            "cnEdited": true
          },
          {
            "en": "The culture was different.",
            "cn": "文化也不一样。",
            "cnEdited": true
          },
          {
            "en": "I didn’t know anybody, and it was extremely lonely.",
            "cn": "我谁都不认识，孤独极了。",
            "cnEdited": true
          },
          {
            "en": "My family could only afford to come visit me every four months or so.",
            "cn": "家里负担不起太多路费，大约每四个月才能来看我一次。",
            "cnEdited": true
          },
          {
            "en": "I was missing them so much that every day was painful.",
            "cn": "我太想他们了，每一天都是煎熬。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Football kept me going.",
            "cn": "是足球支撑着我走下去。",
            "cnEdited": true
          },
          {
            "en": "I knew I was doing things on the field that the other kids at the academy couldn’t do.",
            "cn": "我知道，我在场上能做到的事，学院里的其他孩子做不到。",
            "cnEdited": true
          },
          {
            "en": "I remember the first time I heard one of the kids say to another kid, “Did you see what he did?",
            "cn": "我记得头一回听到一个孩子跟另一个孩子说：“你看见他刚才那下了吗？",
            "cnEdited": true
          },
          {
            "en": "This guy is a beast.”",
            "cn": "这家伙是个猛兽。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I started hearing it all the time.",
            "cn": "后来这样的话我听得越来越多。",
            "cnEdited": true
          },
          {
            "en": "Even from the coaches.",
            "cn": "连教练们都这么说。",
            "cnEdited": true
          },
          {
            "en": "But then somebody would always say, “Yeah but it’s a shame he’s so small.”",
            "cn": "可总有人来一句：“是啊，可惜他太瘦小了。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And it’s true, I was skinny.",
            "cn": "确实，我那时候瘦得皮包骨。",
            "cnEdited": true
          },
          {
            "en": "I had no muscle.",
            "cn": "一身没有几两肌肉。",
            "cnEdited": true
          },
          {
            "en": "So I made a decision at 11 years old.",
            "cn": "于是在十一岁那年，我做了一个决定。",
            "cnEdited": true
          },
          {
            "en": "I knew I had a lot of talent, but I decided that I was going to work harder than everybody.",
            "cn": "我知道自己天赋不错，但我决定要比所有人都更刻苦。",
            "cnEdited": true
          },
          {
            "en": "I was going to stop playing like a kid.",
            "cn": "我不再像个孩子那样踢球。",
            "cnEdited": true
          },
          {
            "en": "I was going to stop acting like a kid.",
            "cn": "也不再像个孩子那样过日子。",
            "cnEdited": true
          },
          {
            "en": "I was going to train like I could be the best in the world.",
            "cn": "我要按“世界最佳”的标准来训练自己。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I don’t know where this feeling came from.",
            "cn": "我说不清这种感觉从哪儿来。",
            "cnEdited": true
          },
          {
            "en": "It was just inside of me.",
            "cn": "它就是长在我身体里。",
            "cnEdited": true
          },
          {
            "en": "It’s like a hunger that never goes away.",
            "cn": "它像一种永远不会消失的饥饿感。",
            "cnEdited": true
          },
          {
            "en": "When you lose, it’s like you’re starving.",
            "cn": "输球的时候，你饿得发慌。",
            "cnEdited": true
          },
          {
            "en": "When you win, it’s still like you’re starving, but you ate a little crumb.",
            "cn": "赢球的时候，你依然饿，只是刚咽下一点面包屑。",
            "cnEdited": true
          },
          {
            "en": "This is the only way I can explain it.",
            "cn": "我只能这样解释它。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I started sneaking out of the dormitory at night to go work out.",
            "cn": "我开始半夜偷偷溜出宿舍去加练。",
            "cnEdited": true
          },
          {
            "en": "I got bigger and faster.",
            "cn": "我变得更强壮，也更快了。",
            "cnEdited": true
          },
          {
            "en": "And then I would walk onto the field — and the people who used to whisper, “Yeah, but he’s so skinny”?",
            "cn": "然后当我走上球场——那些曾经嘀咕“是啊，可惜他太瘦了”的人——",
            "cnEdited": true
          },
          {
            "en": "Now they would be looking at me like it was the end of the world.",
            "cn": "如今看我的眼神，就像世界末日来了似的。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I was 15, I turned to some of my teammates during training.",
            "cn": "十五岁那年，有一次训练，我转身对几个队友说：",
            "cnEdited": true
          },
          {
            "en": "I remember it so clearly.",
            "cn": "我记得清清楚楚。",
            "cnEdited": true
          },
          {
            "en": "I said to them, “I’ll be the best in the world one day.”",
            "cn": "我对他们说：“总有一天，我会成为世界最佳。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They were kind of laughing about it.",
            "cn": "他们听了直想笑。",
            "cnEdited": true
          },
          {
            "en": "I wasn’t even on Sporting’s first team yet, but I had that belief.",
            "cn": "我当时连里斯本竞技一队都还没进，但我就是有这份信念。",
            "cnEdited": true
          },
          {
            "en": "I really meant it.",
            "cn": "我是认真的。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I started playing professionally at 17, my mother could barely watch because of the stress.",
            "cn": "十七岁我开始踢职业比赛，我妈紧张得几乎不敢看。",
            "cnEdited": true
          },
          {
            "en": "She would come to watch me play at the old Estádio José Alvalade, and she got so nervous during big games that she passed out a few times.",
            "cn": "她会来老阿尔瓦拉德球场看我踢球，大赛时紧张到晕过去好几次。",
            "cnEdited": true
          },
          {
            "en": "Seriously, she passed out.",
            "cn": "真的，她晕过去了。",
            "cnEdited": true
          },
          {
            "en": "The doctors started prescribing her sedatives just for my matches.",
            "cn": "后来医生干脆开始给她开镇静剂，专门对付我的比赛。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I would say to her, “Remember when you didn’t care about football?”",
            "cn": "我会对她说：“还记得你以前对足球毫不感兴趣的时候吗？”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I started dreaming bigger and bigger.",
            "cn": "我的梦想越来越大。",
            "cnEdited": true
          },
          {
            "en": "I wanted to play for the national team, and I wanted to play for Manchester, because I watched the Premier League on TV all the time.",
            "cn": "我想进国家队，我想去曼联，因为我成天在电视上看英超。",
            "cnEdited": true
          },
          {
            "en": "I was mesmerized by how fast the game moved and the songs that the crowds would sing.",
            "cn": "那种比赛节奏之快、看台上球迷歌声之响，让我着了迷。",
            "cnEdited": true
          },
          {
            "en": "The atmosphere was so moving to me.",
            "cn": "那种氛围太打动我了。",
            "cnEdited": true
          },
          {
            "en": "When I became a player for Manchester, it was a very proud moment for me, but I think it was an even prouder moment for my family.",
            "cn": "当我成为曼联的一员，那是我无比自豪的时刻，但我想，那一刻我家人比我更自豪。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "At first, winning trophies was very emotional for me.",
            "cn": "一开始，捧起奖杯会让我激动不已。",
            "cnEdited": true
          },
          {
            "en": "I remember when I won my first Champions League trophy at Manchester, it was an overwhelming feeling.",
            "cn": "我记得在曼联第一次捧起欧冠奖杯，那种感觉排山倒海。",
            "cnEdited": true
          },
          {
            "en": "Same thing with my first Ballon d’Or.",
            "cn": "第一次拿金球奖也是一样。",
            "cnEdited": true
          },
          {
            "en": "But my dreams kept getting bigger.",
            "cn": "但我的梦想一直在变大。",
            "cnEdited": true
          },
          {
            "en": "That’s the point of dreams, right?",
            "cn": "梦想的意义不就在这儿吗？",
            "cnEdited": true
          },
          {
            "en": "I had always admired Madrid, and I wanted a new challenge.",
            "cn": "我一直仰慕马德里，我想要新的挑战。",
            "cnEdited": true
          },
          {
            "en": "I wanted to win trophies at Madrid, and break all the records, and become a club legend.",
            "cn": "我想在马德里捧杯，想打破所有纪录，想成为俱乐部的传奇。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Over the past eight years, I have achieved incredible things at Madrid.",
            "cn": "过去八年，我在马德里做到了很多不可思议的事。",
            "cnEdited": true
          },
          {
            "en": "But to be honest, winning trophies later on in my career has become a different kind of emotion.",
            "cn": "但说实话，到了职业生涯后期，捧杯对我来说已经变成了另一种滋味。",
            "cnEdited": true
          },
          {
            "en": "Especially in these last two years.",
            "cn": "尤其是最近这两年。",
            "cnEdited": true
          },
          {
            "en": "At Madrid, if you don’t win everything, other people consider it a failure.",
            "cn": "在马德里，只要不是赢得一切，别人就会认为你失败了。",
            "cnEdited": true
          },
          {
            "en": "This is the expectation of greatness.",
            "cn": "这就是人们对伟大理所当然的期待。",
            "cnEdited": true
          },
          {
            "en": "This is my job.",
            "cn": "这就是我的工作。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But when you are a father, it is a completely different feeling.",
            "cn": "但当你成为一个父亲，那是完全另一种感觉。",
            "cnEdited": true
          },
          {
            "en": "A feeling that I cannot describe.",
            "cn": "一种我无法描述的感觉。",
            "cnEdited": true
          },
          {
            "en": "This is why my time in Madrid has been special.",
            "cn": "这就是我在马德里的岁月如此特别的原因。",
            "cnEdited": true
          },
          {
            "en": "I have been a footballer, yes, but also a father.",
            "cn": "我是一名球员，没错，但我也是一位父亲。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There is a moment with my son that I will always remember so clearly.",
            "cn": "有一个和儿子在一起的瞬间，我永远记得清清楚楚。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I think about it, I feel warm.",
            "cn": "一想起来，心里就暖。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was the moment on the field after we won the last Champions League final in Cardiff.",
            "cn": "那是我们在加的夫赢下上一届欧冠决赛之后、球场上的那一刻。",
            "cnEdited": true
          },
          {
            "en": "We made history that night.",
            "cn": "那一晚我们创造了历史。",
            "cnEdited": true
          },
          {
            "en": "When I was on the pitch after the final whistle, it felt like I had sent a message to the world.",
            "cn": "终场哨响后站在球场上，我感觉自己向全世界发出了一声宣告。",
            "cnEdited": true
          },
          {
            "en": "But then my son came on the field to celebrate with me…",
            "cn": "然后我儿子跑进场里跟我一起庆祝……",
            "cnEdited": true
          },
          {
            "en": "and it was like the snap of a finger.",
            "cn": "就像打了个响指。",
            "cnEdited": true
          },
          {
            "en": "Suddenly, the entire emotion changed.",
            "cn": "一瞬间，所有的情绪都变了。",
            "cnEdited": true
          },
          {
            "en": "He was running around with Marcelo’s son.",
            "cn": "他跟马塞洛的儿子到处疯跑。",
            "cnEdited": true
          },
          {
            "en": "We held the trophy together.",
            "cn": "我们一起捧着奖杯。",
            "cnEdited": true
          },
          {
            "en": "Then we walked around the field, hand in hand.",
            "cn": "然后我们手牵着手，绕着球场走。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It is a joy that I did not understand until I was a father.",
            "cn": "那种快乐，直到我自己当了父亲才懂。",
            "cnEdited": true
          },
          {
            "en": "There are so many emotions happening simultaneously that you cannot describe the feeling in words.",
            "cn": "太多种情绪同时涌上来，你根本没法用语言形容。",
            "cnEdited": true
          },
          {
            "en": "The only thing I can compare it to is how I felt when I was warming up in Madeira and I saw my mother and sister huddled together in the stands.",
            "cn": "唯一能拿来比拟的，就是当年在马德拉热身时，我看见妈妈和姐姐们紧紧挨坐在看台上的那种感觉。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When we returned to the Bernabeu to celebrate, Cristiano Jr. and Marcelito were playing around on the field in front of all the fans.",
            "cn": "我们回到伯纳乌庆祝的那天，小克里斯蒂亚诺和小马塞洛就在全场球迷面前的球场上追逐嬉闹。",
            "cnEdited": true
          },
          {
            "en": "It was a much different scene than when I was playing in the streets at his age, but I hope that the feeling for my son is the same as it was for me.",
            "cn": "这跟他这个年纪的我在街头踢球的场景完全不同，但我希望儿子心中的感觉，和当年的我是一样的。",
            "cnEdited": true
          },
          {
            "en": "Menino querido da família.",
            "cn": "menino querido da família——全家捧在手心里的宝贝。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After 400 matches with Madrid, winning is still my ultimate ambition.",
            "cn": "为马德里踢了四百场比赛之后，胜利依然是我最大的野心。",
            "cnEdited": true
          },
          {
            "en": "I think I was born like that.",
            "cn": "我想我天生就是这样。",
            "cnEdited": true
          },
          {
            "en": "But the feeling after I win has definitely changed.",
            "cn": "但赢球之后的感觉，确实变了。",
            "cnEdited": true
          },
          {
            "en": "This is a new chapter in my life.",
            "cn": "这是我人生的新篇章。",
            "cnEdited": true
          },
          {
            "en": "I had a special message engraved on my new boots.",
            "cn": "我在新球鞋上刻了一句特别的话。",
            "cnEdited": true
          },
          {
            "en": "It’s right on the heel, and the words are the last thing that I read before I lace them up and go to the tunnel.",
            "cn": "就刻在鞋跟上，系好鞋带走向球员通道之前，我读的最后一句就是它。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It is like a final reminder…",
            "cn": "像是最后的提醒……",
            "cnEdited": true
          },
          {
            "en": "a final motivation.",
            "cn": "也是最后的动力。",
            "cnEdited": true
          },
          {
            "en": "It says, “El sueño del niño.”",
            "cn": "上面写着：“El sueño del niño。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The dream of the child.",
            "cn": "孩子的梦。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maybe now you understand.",
            "cn": "也许你现在明白了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the end, of course — my mission is the same as it has always been.",
            "cn": "当然，说到底——我的使命从未变过。",
            "cnEdited": true
          },
          {
            "en": "I want to continue to break records at Madrid.",
            "cn": "我要继续在马德里打破纪录。",
            "cnEdited": true
          },
          {
            "en": "I want to win the most titles possible.",
            "cn": "我要赢得能赢的每一座奖杯。",
            "cnEdited": true
          },
          {
            "en": "This is just my nature.",
            "cn": "这就是我的天性。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But what means the most to me about my time in Madrid, and what I will tell my grandchildren about when I am 95 years old, is the feeling of walking around the pitch as a champion, hand in hand with my son.",
            "cn": "但我在马德里的岁月里最珍贵的、等我九十五岁时会讲给孙辈们听的，是作为冠军、牵着儿子的手绕场而行的那种感觉。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I hope we will do it again.",
            "cn": "我希望我们还能再来一次。",
            "cnEdited": true
          }
        ]
      }
    ]
  },
  {
    "id": "fb-gerard-pique-a-long-story",
    "cat": "足球",
    "pin": true,
    "title": "A Long Story",
    "titleZh": "说来话长",
    "source": "The Players' Tribune · 2018-03-22",
    "date": "2018-03-22",
    "minutes": 30,
    "url": "https://www.theplayerstribune.com/articles/gerard-pique-a-long-story",
    "coverImg": "assets/covers/fb-gerard-pique-a-long-story.jpg",
    "player": "Gerard Piqué",
    "playerZh": "杰拉德·皮克",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "I’m going to let you in on a little inside information.",
            "cn": "我要跟你们说一点内部消息。",
            "cnEdited": true
          },
          {
            "en": "Everybody knows that footballers have text groups on WhatsApp.",
            "cn": "大家都知道，球员们 WhatsApp 上都有各种小群。",
            "cnEdited": true
          },
          {
            "en": "I have one just for my friends from home, and I have another just for my Barca teammates.",
            "cn": "我有一个只有老家朋友们的群，还有一个只有巴萨队友的群。",
            "cnEdited": true
          },
          {
            "en": "But my favorite one might surprise you.",
            "cn": "但我最喜欢的一个群，可能会让你们吃惊。",
            "cnEdited": true
          },
          {
            "en": "Earlier this season, when we were already 8 or 9 points clear of Real Madrid in the league, I started a special group for some of the guys on the Spanish national team who play for Real Madrid and Barcelona.",
            "cn": "本赛季早些时候，当我们已经在联赛里领先皇马八九分的时候，我建了一个特别的群，把西班牙国家队里效力皇马和巴萨的几个家伙都拉了进去。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you only read what the media says, you would think that we hate one another.",
            "cn": "如果你只看媒体怎么写，你会以为我们互相恨透了对方。",
            "cnEdited": true
          },
          {
            "en": "But, in fact, we all get along really well, and we text back and forth about tactics and football philosophies and even the books we’re reading.",
            "cn": "但事实上，我们处得非常好，会在群里聊战术、聊足球哲学，甚至连最近在读什么书都聊。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "….",
            "cn": "……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "….",
            "cn": "……",
            "cnEdited": true
          },
          {
            "en": "No, come on, of course I’m joking!",
            "cn": "不，得了吧，我当然是开玩笑的！",
            "cnEdited": true
          },
          {
            "en": "All we do in that group is talk shit to one another about Barça and Real!",
            "cn": "那个群里我们干的事，就是互相损巴萨和皇马！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s the best.",
            "cn": "太好玩了。",
            "cnEdited": true
          },
          {
            "en": "We’re just like little kids.",
            "cn": "我们就像一群小孩子。",
            "cnEdited": true
          },
          {
            "en": "And the truth is, it’s especially hilarious for me right now, because now we’re up 15 points on Real in the league.",
            "cn": "而且说实话，现在这个节点对我来说尤其好笑，因为我们在联赛里已经领先皇马15分了。",
            "cnEdited": true
          },
          {
            "en": "So I’m getting very creative in my responses.",
            "cn": "所以我回消息的创意，是越来越足了。",
            "cnEdited": true
          },
          {
            "en": "Last season, when the Real guys were winning everything, they were feeling pretty good.",
            "cn": "上赛季皇马那帮人赢麻了的时候，他们感觉相当良好。",
            "cnEdited": true
          },
          {
            "en": "They were talking shit constantly whenever I saw them at national team training.",
            "cn": "国家队集训一见面，他们就逮着机会不停地损我。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Man, every time they won a match last season, they were posting shirtless photos on Instagram from the locker room.",
            "cn": "兄弟，上赛季他们每赢一场球，就在 Instagram 上发更衣室里的裸上身合照。",
            "cnEdited": true
          },
          {
            "en": "Remember that?",
            "cn": "还记得吗？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They were smiling and flexing their muscles like The Rock and saying #HalaMadrid and posting little trophy emojis.",
            "cn": "他们笑着秀肌肉，跟巨石强森似的，配文 #HalaMadrid，再发几个小奖杯的表情。",
            "cnEdited": true
          },
          {
            "en": "This season, though, it’s a different vibe.",
            "cn": "不过这个赛季，画风变了。",
            "cnEdited": true
          },
          {
            "en": "All their Instagram photos are looking very somber.",
            "cn": "他们的 Instagram 照片看上去非常沉重。",
            "cnEdited": true
          },
          {
            "en": "“3 points today.",
            "cn": "“今天拿下3分。",
            "cnEdited": true
          },
          {
            "en": "We must keep working harder!”",
            "cn": "我们必须更加努力！”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So I’m texting them in the WhatsApp group, “Come on guys, why so serious?!”",
            "cn": "于是我在 WhatsApp 群里问他们：“各位各位，干嘛这么严肃呀？！”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then I put a little crying emoji, and a laughing emoji.",
            "cn": "然后我再补一个小声哭泣的表情，和一个笑哭的表情。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I even made a special name for the group.",
            "cn": "我甚至给那个群起了个专用名。",
            "cnEdited": true
          },
          {
            "en": "It’s called: CONGRATULATIONS.",
            "cn": "叫：CONGRATULATIONS（恭喜恭喜）。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I can joke around with those guys, because they are my brothers on the Spanish national team.",
            "cn": "我能跟那帮家伙开玩笑，因为他们在西班牙国家队是我的兄弟。",
            "cnEdited": true
          },
          {
            "en": "We might hate each other’s clubs, but we are all playing for the same country, with the same dream, and that’s something that I’m very, very proud of.",
            "cn": "我们或许恨死了对方的俱乐部，但我们为同一个国家而战，怀着同一个梦想，这一点让我非常、非常自豪。",
            "cnEdited": true
          },
          {
            "en": "Ever since I was a little boy watching Luis Enrique bleed all over his jersey at the’94 World Cup, my dream was to play for the national team.",
            "cn": "从小看着路易斯·恩里克在94年世界杯上球衣浸满鲜血的样子，我的梦想就是为国家队效力。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m extremely proud to wear the badge every four years at the World Cup.",
            "cn": "每四年能披上国家队战袍征战世界杯，我自豪至极。",
            "cnEdited": true
          },
          {
            "en": "Maybe that will surprise some people.",
            "cn": "这可能会让一些人吃惊。",
            "cnEdited": true
          },
          {
            "en": "If you watch television in Madrid, they’ll tell you a very different story about me.",
            "cn": "如果你在马德里看电视，他们会讲一个关于我的完全不同的故事。",
            "cnEdited": true
          },
          {
            "en": "They’ll say that I’m a traitor, and that I want to tear the country apart because of my public support for the Catalan people’s right to vote in the independence referendum.",
            "cn": "他们会说我是叛徒，说我因为公开支持加泰罗尼亚人民投票独立的权利，就想撕裂这个国家。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I have never even commented on how I would vote.",
            "cn": "可我连自己会投哪一票都从没公开评论过。",
            "cnEdited": true
          },
          {
            "en": "I am not trying to be a politician and sway people.",
            "cn": "我不是要当政治家，也不是要左右别人。",
            "cnEdited": true
          },
          {
            "en": "What I believe is irrelevant.",
            "cn": "我信什么并不重要。",
            "cnEdited": true
          },
          {
            "en": "I am just one opinion out of millions.",
            "cn": "我只是几百万种意见中的一种。",
            "cnEdited": true
          },
          {
            "en": "But what I do believe is that the 7.5 million people from my homeland of Catalonia have the right to vote on this question in a peaceful manner.",
            "cn": "但我确实相信，我家乡加泰罗尼亚的750万人，有权利以和平的方式就这个问题投票。",
            "cnEdited": true
          },
          {
            "en": "The issue is very complicated, and it requires a lot of thought and debate.",
            "cn": "这个问题非常复杂，需要大量的思考与辩论。",
            "cnEdited": true
          },
          {
            "en": "It’s a tricky position for me to be in, personally, because the happiest moment of my life was winning the World Cup for Spain, but on the other hand, being Catalan is in my blood.",
            "cn": "就我个人而言，这是个为难处境：因为我人生中最幸福的时刻，是为西班牙赢得世界杯；可另一方面，加泰罗尼亚人在我的血液里。",
            "cnEdited": true
          },
          {
            "en": "That’s my people, my heritage, my land.",
            "cn": "那是我的同胞，我的传承，我的土地。",
            "cnEdited": true
          },
          {
            "en": "And when 80% of people in Catalonia say they want the right to vote, I believe they should be heard.",
            "cn": "当加泰罗尼亚80%的人说他们想要投票的权利，我认为他们应该被倾听。",
            "cnEdited": true
          },
          {
            "en": "If that opinion makes my own countrymen dislike me…",
            "cn": "如果这个立场让我自己的同胞讨厌我……",
            "cnEdited": true
          },
          {
            "en": "well, I am perfectly tranquil with that thought.",
            "cn": "好吧，这个念头我也完全安然。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s funny, I noticed some people in America have started telling the NBA players to “just shut up and dribble” when they express their opinions on real problems in society.",
            "cn": "有意思的是，我注意到美国已经有人开始对NBA球员说“你只管闭嘴运你的球”，不让他们对社会上的真实问题发表看法。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s ridiculous, no?",
            "cn": "很荒谬，不是吗？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s the same here in Spain.",
            "cn": "西班牙这里也一个样。",
            "cnEdited": true
          },
          {
            "en": "They say, “Just shut up and play football.",
            "cn": "他们说：“你只管闭嘴踢球。",
            "cnEdited": true
          },
          {
            "en": "It’s all you know.”",
            "cn": "你懂的只有足球。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Sorry, but I will not just shut up and play.",
            "cn": "抱歉，我不会闭嘴，也不会只顾踢球。",
            "cnEdited": true
          },
          {
            "en": "It’s not all I know.",
            "cn": "足球不是我懂的全部。",
            "cnEdited": true
          },
          {
            "en": "There’s a lot more depth to footballers than most people realize, and I think it’s important that we express ourselves and our views.",
            "cn": "球员的内心远比大多数人以为的丰富，我认为我们表达自己和自己的观点很重要。",
            "cnEdited": true
          },
          {
            "en": "Footballers are human beings, and that is something that is being lost in the media world that we live in today.",
            "cn": "球员也是人——在今天的媒体世界里，这一点正在被遗忘。",
            "cnEdited": true
          },
          {
            "en": "There are things going on in our lives that the public has no idea about.",
            "cn": "我们的生活里发生着许多公众完全不知道的事。",
            "cnEdited": true
          },
          {
            "en": "Yes, you can google match results, and you can google transfer rumors, but you can’t google how a person feels, or what motivates them, or what they fear.",
            "cn": "是的，你可以谷歌比赛结果，可以谷歌转会传闻，但你谷歌不到一个人的感受、他的动力，或者他的恐惧。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Let me give you some examples from my own life.",
            "cn": "让我拿自己人生里的一些例子来说吧。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I look back on the last 10 years of my career, and I’ve won the World Cup, the Champions League, La Liga, the Spanish Cup…",
            "cn": "回望我职业生涯的这十年，我拿过世界杯、欧冠、西甲、国王杯……",
            "cnEdited": true
          },
          {
            "en": "I’ve won it all, as I like to remind my Madrid friends on WhatsApp?",
            "cn": "该拿的我都拿遍了——这一点我很乐意在 WhatsApp 上提醒我的皇马朋友们？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But 10 years ago, I was almost f***ed.",
            "cn": "但十年前，我差点就完蛋了。",
            "cnEdited": true
          },
          {
            "en": "My whole life could have turned out very different if it wasn’t for Sir Alex Ferguson.",
            "cn": "如果不是亚历克斯·弗格森爵士，我整个人生可能是完全另一个样子。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I arrived at Manchester United a boy, and I left a man.",
            "cn": "我以一个男孩的身份来到曼联，离开时已经是个男人。",
            "cnEdited": true
          },
          {
            "en": "It was a crazy time for me, because I had never been away from home before.",
            "cn": "那段时间对我来说是疯狂的，因为我之前从来没有离开过家。",
            "cnEdited": true
          },
          {
            "en": "I spent my first 17 years growing up in Spain in Barcelona’s youth academy, and it almost felt like I was playing for the local school team or something.",
            "cn": "我人生的前十七年在西班牙巴塞罗那的青训学院里长大，在那里踢球几乎就像在校队踢着玩。",
            "cnEdited": true
          },
          {
            "en": "I knew everybody there, and I was close to my family.",
            "cn": "那里的人我全都认识，家人也近在身边。",
            "cnEdited": true
          },
          {
            "en": "So, to me, football was just fun.",
            "cn": "所以对我来说，足球就是纯粹的乐趣。",
            "cnEdited": true
          },
          {
            "en": "I didn’t understand the business side of the game at all.",
            "cn": "这门生意的另一面，我完全不懂。",
            "cnEdited": true
          },
          {
            "en": "Then I arrived at United, and honestly, it was a complete shock.",
            "cn": "然后我到了曼联，说实话，受到了彻底的冲击。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One of my very first matches at Old Trafford, we were in the dressing room getting ready, and I was nervous as hell.",
            "cn": "我在老特拉福德的头几场比赛之一，我们在更衣室里做准备，我紧张得要死。",
            "cnEdited": true
          },
          {
            "en": "Imagine it — I’m 18 years old, and I’m sitting in that little dressing room putting on my socks next to Ruud Van Nistelrooy and Ryan Giggs and Rio Ferdinand.",
            "cn": "想象一下——我十八岁，坐在那间小更衣室里穿球袜，旁边是范尼斯特鲁伊、瑞恩·吉格斯和里奥·费迪南德。",
            "cnEdited": true
          },
          {
            "en": "I wanted to be invisible.",
            "cn": "我恨不得自己隐身。",
            "cnEdited": true
          },
          {
            "en": "I was thinking, Just do your job and go unnoticed.",
            "cn": "我心想：做好你的事，别被人注意到。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So we’re sitting there waiting for the gaffer to come in and speak to us, and I’m literally sitting right next to Roy Keane.",
            "cn": "我们坐在那儿等主教练进来训话，而我就坐在罗伊·基恩的正旁边。",
            "cnEdited": true
          },
          {
            "en": "The dressing room is so small that our legs are almost touching.",
            "cn": "那间更衣室小到我们的腿几乎要碰到一起。",
            "cnEdited": true
          },
          {
            "en": "There’s no space at all.",
            "cn": "一点空隙都没有。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s dead quiet.",
            "cn": "鸦雀无声。",
            "cnEdited": true
          },
          {
            "en": "All of a sudden, you could hear this little vibration.",
            "cn": "突然，你听见一阵轻微的震动声。",
            "cnEdited": true
          },
          {
            "en": "Very soft.",
            "cn": "很轻很轻。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Bzzzzzz……",
            "cn": "嗡嗡嗡……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "…………..",
            "cn": "…………",
            "cnEdited": true
          },
          {
            "en": "Bzzzzzzz.",
            "cn": "嗡嗡嗡。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Roy is looking around the room.",
            "cn": "罗伊环视整间屋子。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Bzzzzzzz…..",
            "cn": "嗡嗡嗡嗡……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Oh, shit.",
            "cn": "坏了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I realize it’s me.",
            "cn": "我发现是我。",
            "cnEdited": true
          },
          {
            "en": "It’s my cell phone.",
            "cn": "是我的手机。",
            "cnEdited": true
          },
          {
            "en": "I left it on vibrate, and it’s in the pocket of my pants, stuffed in the clothes bag that’s hanging right behind Roy’s head.",
            "cn": "我忘了关，调的震动，手机在裤子口袋里，裤子塞在衣物袋里，而那个袋子就挂在罗伊脑袋后面。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Roy can’t find where the noise is coming from.",
            "cn": "罗伊找不到声音是从哪来的。",
            "cnEdited": true
          },
          {
            "en": "Now he’s looking around the room like a maniac.",
            "cn": "这下他像个疯子一样满屋子看。",
            "cnEdited": true
          },
          {
            "en": "His eyes are darting everywhere, and he’s trying to figure it out.",
            "cn": "他的眼珠子四处乱转，拼命想搞明白。",
            "cnEdited": true
          },
          {
            "en": "You know the famous scene with Jack Nicholson in The Shining, when he bursts through the door?",
            "cn": "你知道《闪灵》里杰克·尼科尔森破门而入的那个著名镜头吗？",
            "cnEdited": true
          },
          {
            "en": "That’s what he looked like.",
            "cn": "他当时就是那副样子。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He screams out to everybody, “Whose phone is that?!”",
            "cn": "他对着所有人吼：“那是谁的手机？！”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Silence.",
            "cn": "一片寂静。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He asks again.",
            "cn": "他又问了一遍。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Silence.",
            "cn": "寂静。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He asks a third time.",
            "cn": "他问了第三遍。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Whose.",
            "cn": "“那。",
            "cnEdited": true
          },
          {
            "en": "Bloody.",
            "cn": "到底。",
            "cnEdited": true
          },
          {
            "en": "F*****g.",
            "cn": "是TM的。",
            "cnEdited": true
          },
          {
            "en": "Phone.",
            "cn": "谁的。",
            "cnEdited": true
          },
          {
            "en": "Is.",
            "cn": "手机。",
            "cnEdited": true
          },
          {
            "en": "That?!”",
            "cn": "？！”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Finally, I spoke up, like a little boy.",
            "cn": "最后，我像个小学生一样开了口。",
            "cnEdited": true
          },
          {
            "en": "Very softly, I said, “I’m so sorry.",
            "cn": "声音小得很，我说：“对不起。",
            "cnEdited": true
          },
          {
            "en": "It’s mine.”",
            "cn": "是我的。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Roy put his arm around me, and he laughed, and he told me not to worry about it.",
            "cn": "罗伊搂住我，笑了起来，叫我别放在心上。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "….",
            "cn": "……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "….",
            "cn": "……",
            "cnEdited": true
          },
          {
            "en": "No, come on, of course I’m joking!",
            "cn": "不，得了吧，我当然是开玩笑的！",
            "cnEdited": true
          },
          {
            "en": "Roy lost his mind!",
            "cn": "罗伊炸了！",
            "cnEdited": true
          },
          {
            "en": "He went nuts in front of everybody!",
            "cn": "他当着所有人的面暴怒！",
            "cnEdited": true
          },
          {
            "en": "It was incredible.",
            "cn": "场面太震撼了。",
            "cnEdited": true
          },
          {
            "en": "I almost shit myself.",
            "cn": "我差点尿裤子。",
            "cnEdited": true
          },
          {
            "en": "But it was a good lesson.",
            "cn": "但那是很好的一课。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Now, in 2018, everything is different.",
            "cn": "现在，2018年，一切都不同了。",
            "cnEdited": true
          },
          {
            "en": "All these kids are on their iPhones before the matches.",
            "cn": "比赛前孩子们都捧着 iPhone。",
            "cnEdited": true
          },
          {
            "en": "But back then, in 2006?",
            "cn": "但在那时候，2006年？",
            "cnEdited": true
          },
          {
            "en": "It was a different world.",
            "cn": "是完全不同的世界。",
            "cnEdited": true
          },
          {
            "en": "You didn’t do that.",
            "cn": "你不能那么干。",
            "cnEdited": true
          },
          {
            "en": "Especially not at United.",
            "cn": "在曼联尤其不能。",
            "cnEdited": true
          },
          {
            "en": "Not in Roy’s dressing room.",
            "cn": "在罗伊的更衣室里更不能。",
            "cnEdited": true
          },
          {
            "en": "It was one of a thousand mistakes that I made when I was at United.",
            "cn": "那只是我在曼联犯下的一千个错误之一。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It wasn’t just the football that was difficult.",
            "cn": "难的不只是足球。",
            "cnEdited": true
          },
          {
            "en": "It was the language and the culture and the loneliness.",
            "cn": "还有语言、文化，和孤独。",
            "cnEdited": true
          },
          {
            "en": "The isolation was the worst part.",
            "cn": "孤立无援是最难熬的部分。",
            "cnEdited": true
          },
          {
            "en": "Being away from your family at 17, and being surrounded by grown men, by legends, by a manager like Sir Alex…",
            "cn": "十七岁就离开家人，身边全是成年人、传奇球星，还有弗格森爵士那样的主教练……",
            "cnEdited": true
          },
          {
            "en": "it was very complicated.",
            "cn": "那种滋味非常复杂。",
            "cnEdited": true
          },
          {
            "en": "When people wonder why talented young footballers don’t make it abroad, I can assure you it usually doesn’t have anything to do with their technical quality.",
            "cn": "当人们疑惑为什么有天赋的年轻球员出国就踢不出来，我可以向你保证：通常跟他们的技术水平毫无关系。",
            "cnEdited": true
          },
          {
            "en": "There’s always a lot more going on that you don’t see.",
            "cn": "总有很多你看不见的东西在起作用。",
            "cnEdited": true
          },
          {
            "en": "The first two years I was in England, there were so many nights when I would come home from training and in Manchester it would already be dark outside at four in the afternoon, and I would be in my flat all alone.",
            "cn": "在英格兰的头两年，有太多这样的夜晚：训练完回到家，曼彻斯特下午四点天已经黑透了，我一个人待在公寓里。",
            "cnEdited": true
          },
          {
            "en": "It was depressing.",
            "cn": "非常压抑。",
            "cnEdited": true
          },
          {
            "en": "Then, of course, my mother would call me, and I’d lie and say, “Oh no, it’s going great, Mum.",
            "cn": "然后当然，我妈会打电话来，我撒谎说：“没事，一切都好，妈。",
            "cnEdited": true
          },
          {
            "en": "Everything is great.”",
            "cn": "好得很。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But it wasn’t going great.",
            "cn": "但其实一点也不好。",
            "cnEdited": true
          },
          {
            "en": "It was shit.",
            "cn": "糟糕透了。",
            "cnEdited": true
          },
          {
            "en": "I wanted to quit and come home to Spain.",
            "cn": "我想过放弃，回西班牙老家。",
            "cnEdited": true
          },
          {
            "en": "I remember during that time, my father always said something to me that was extremely important.",
            "cn": "我记得那段时间，我父亲总对我说一句话，那句话对我极其重要。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’d complain to him, “I don’t know, Dad.",
            "cn": "我跟他抱怨：“我不知道，爸。",
            "cnEdited": true
          },
          {
            "en": "The manager doesn’t trust me.",
            "cn": "主教练不信任我。",
            "cnEdited": true
          },
          {
            "en": "These guys are so strong.",
            "cn": "这帮人身体太壮了。",
            "cnEdited": true
          },
          {
            "en": "I’m miserable.”",
            "cn": "我很痛苦。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And he would say, “Well, you know what?",
            "cn": "而他会说：“哎，你知道吗？",
            "cnEdited": true
          },
          {
            "en": "Maybe today was bad.",
            "cn": "也许今天很糟。",
            "cnEdited": true
          },
          {
            "en": "But the sun will always rise again tomorrow.”",
            "cn": "但太阳明天总会照常升起。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I don’t know why, but it made me feel better.",
            "cn": "不知为什么，这让我好受多了。",
            "cnEdited": true
          },
          {
            "en": "It kept me going.",
            "cn": "它支撑着我走下去。",
            "cnEdited": true
          },
          {
            "en": "And I was very lucky, because, as naive as I was, and as raw as I was, Sir Alex was phenomenal to me from the very first day.",
            "cn": "我也非常幸运，因为尽管我那时又天真又毛糙，弗格森爵士从第一天起就对我好得不得了。",
            "cnEdited": true
          },
          {
            "en": "The best managers all have this quality — even when they’re not playing you, and even when they’re hard on you — they make you believe that they really care about you.",
            "cn": "最好的主教练都有这个特质——哪怕不让你上场，哪怕对你很严厉——他们都能让你相信，他们是真心在乎你的。",
            "cnEdited": true
          },
          {
            "en": "Sir Alex was like a second father to me.",
            "cn": "对我来说，弗格森就像第二个父亲。",
            "cnEdited": true
          },
          {
            "en": "He made me earn it, but eventually he gave me my chance.",
            "cn": "他让我一步步去挣，但最终他给了我机会。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In 2007, after two years in England, he told me that I was going to play about 25 games that season.",
            "cn": "2007年，在英格兰待了两年之后，他告诉我，那个赛季我会踢大约25场球。",
            "cnEdited": true
          },
          {
            "en": "Everything started well.",
            "cn": "一开始一切顺利。",
            "cnEdited": true
          },
          {
            "en": "I was getting to play a bit alongside Rio.",
            "cn": "我开始能跟里奥搭档着打一些比赛。",
            "cnEdited": true
          },
          {
            "en": "And then, in November, we went to play in Bolton.",
            "cn": "然后，11月，我们去博尔顿打客场。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Shit…",
            "cn": "糟了……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I can still picture the ball floating in the air.",
            "cn": "我到现在还能想起那个球飘在空中的样子。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was a set piece.",
            "cn": "那是个定位球。",
            "cnEdited": true
          },
          {
            "en": "I was supposed to be marking Nicolas Anelka.",
            "cn": "我本该盯防尼古拉·阿内尔卡。",
            "cnEdited": true
          },
          {
            "en": "Bolton chipped the ball into the box, and I thought, I’m going to be aggressive.",
            "cn": "博尔顿把球吊进禁区，我心想，我要主动出击。",
            "cnEdited": true
          },
          {
            "en": "I jumped up to head the ball away, and I completely missed it.",
            "cn": "我跳起来想头球解围，结果完全顶空了。",
            "cnEdited": true
          },
          {
            "en": "It was like something out of a nightmare.",
            "cn": "就像噩梦里的场景。",
            "cnEdited": true
          },
          {
            "en": "The ball just…",
            "cn": "那个球就……",
            "cnEdited": true
          },
          {
            "en": "kept floating.",
            "cn": "一直飘着。",
            "cnEdited": true
          },
          {
            "en": "It was that yellow and purple Premier League ball.",
            "cn": "就是那种黄紫相间的英超用球。",
            "cnEdited": true
          },
          {
            "en": "Remember that one?",
            "cn": "还记得那个球吗？",
            "cnEdited": true
          },
          {
            "en": "It floated right over my head like a balloon.",
            "cn": "它像个气球一样，从我头顶飘了过去。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I landed and turned around in horror.",
            "cn": "我落地，惊恐地回头。",
            "cnEdited": true
          },
          {
            "en": "Anelka controlled the ball and scored easily.",
            "cn": "阿内尔卡停球，轻松破门。",
            "cnEdited": true
          },
          {
            "en": "We ended up losing 1-0, and it was my fault.",
            "cn": "我们最后0比1输了，那是我的错。",
            "cnEdited": true
          },
          {
            "en": "As a young defender, when you make a mistake like that, the manager simply cannot trust you anymore.",
            "cn": "作为一个年轻后卫，当你犯下那种错误，主教练就再也无法信任你了。",
            "cnEdited": true
          },
          {
            "en": "Even if he wants to trust you, he can’t.",
            "cn": "哪怕他想信任你，也做不到了。",
            "cnEdited": true
          },
          {
            "en": "I could tell, literally at the moment that Anelka controlled the ball, that I had lost the faith of Sir Alex, and probably the faith of most United fans.",
            "cn": "阿内尔卡停球的那一刻我就知道，我失去了弗格森爵士的信任，很可能也失去了大多数曼联球迷的信任。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Sir Alex promised me 25 games that season, and I ended up getting 12.",
            "cn": "弗格森爵士答应过那个赛季给我25场，最后我只踢了12场。",
            "cnEdited": true
          },
          {
            "en": "It was an extremely difficult time.",
            "cn": "那是极其难熬的一段时间。",
            "cnEdited": true
          },
          {
            "en": "That mistake felt like the end of my career.",
            "cn": "那次失误感觉就像职业生涯的终结。",
            "cnEdited": true
          },
          {
            "en": "It ended up being the beginning of it, but only because of what Sir Alex Ferguson did for me.",
            "cn": "结果它成了职业生涯的开端——而这全靠弗格森爵士为我做的事。",
            "cnEdited": true
          },
          {
            "en": "You see, toward the end of that season, my agent told me that Barcelona were interested in bringing me back.",
            "cn": "你看，那个赛季快结束时，我的经纪人告诉我，巴萨有意把我带回去了。",
            "cnEdited": true
          },
          {
            "en": "Truthfully, I could not believe it.",
            "cn": "说实话，我根本不敢相信。",
            "cnEdited": true
          },
          {
            "en": "My exact words to him were, “That doesn’t make sense.",
            "cn": "我对他说的原话是：“这不合理。",
            "cnEdited": true
          },
          {
            "en": "I’m not playing at United, so why would they want me?”",
            "cn": "我在曼联都踢不上球，他们要我干嘛？”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And he said, “Well, they know you.",
            "cn": "而他说：“哎，他们了解你。",
            "cnEdited": true
          },
          {
            "en": "They believe in you.”",
            "cn": "他们相信你。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Of course, I was thrilled.",
            "cn": "我当然欣喜若狂。",
            "cnEdited": true
          },
          {
            "en": "I wanted to go home.",
            "cn": "我想回家。",
            "cnEdited": true
          },
          {
            "en": "But I knew that I had to have a very difficult conversation with Sir Alex.",
            "cn": "但我知道，我必须跟弗格森爵士谈一次非常艰难的话。",
            "cnEdited": true
          },
          {
            "en": "There was no buyout clause in my contract, and United could set whatever price they wanted, so I had to convince him to let me go.",
            "cn": "我的合同里没有买断条款，曼联想开什么价就开什么价，所以我必须说服他放我走。",
            "cnEdited": true
          },
          {
            "en": "It was one of the hardest conversations of my life, because he took such great care of me.",
            "cn": "那是我人生中最艰难的对话之一，因为他此前待我那么好。",
            "cnEdited": true
          },
          {
            "en": "But I walked into his office, and I was honest with him.",
            "cn": "但我走进他的办公室，对他坦白了。",
            "cnEdited": true
          },
          {
            "en": "I said, “Listen, I feel like I’ve lost your trust.",
            "cn": "我说：“听着，我感觉我已经失去了您的信任。",
            "cnEdited": true
          },
          {
            "en": "Barcelona is my home.",
            "cn": "巴萨是我的家。",
            "cnEdited": true
          },
          {
            "en": "I want to go back.",
            "cn": "我想回去。",
            "cnEdited": true
          },
          {
            "en": "I hope you will let me go.”",
            "cn": "我希望您放我走。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We had a long conversation, and he decided that I was sincere, and he agreed to let me leave at the end of the season.",
            "cn": "我们谈了很久，他认定我是真诚的，同意赛季末放我离开。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But that’s not the end of our story.",
            "cn": "但我们的故事还没完。",
            "cnEdited": true
          },
          {
            "en": "Football can be very complicated.",
            "cn": "足球可以是件非常复杂的事。",
            "cnEdited": true
          },
          {
            "en": "At the end of that season, guess who we had to face in the semi finals of the Champions League?",
            "cn": "那个赛季末，猜猜我们在欧冠半决赛碰上的是谁？",
            "cnEdited": true
          },
          {
            "en": "Of course, it was Barcelona.",
            "cn": "当然是巴萨。",
            "cnEdited": true
          },
          {
            "en": "I had no real chance of playing.",
            "cn": "我根本没有上场的机会。",
            "cnEdited": true
          },
          {
            "en": "I was the third-choice centre back.",
            "cn": "我是第三号中卫。",
            "cnEdited": true
          },
          {
            "en": "But right before the first leg at the Camp Nou, Nemanja Vidić came down with an injury.",
            "cn": "可就在诺坎普首回合开打之前，内马尼亚·维迪奇伤了。",
            "cnEdited": true
          },
          {
            "en": "All of a sudden, I was going to have to step up and play in front of 90,000 people, against my boyhood club.",
            "cn": "突然之间，我得站出来，在九万人面前，对阵我少年时代的俱乐部。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was excited, nervous, shocked…",
            "cn": "我又兴奋，又紧张，又震惊……",
            "cnEdited": true
          },
          {
            "en": "everything.",
            "cn": "什么情绪都有。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Before the match, we had our usual two-hour siesta at the hotel.",
            "cn": "赛前我们在酒店照例午休两个小时。",
            "cnEdited": true
          },
          {
            "en": "Of course, I couldn’t sleep.",
            "cn": "我当然睡不着。",
            "cnEdited": true
          },
          {
            "en": "All of a sudden, there’s a knock at the door, and I look out the little hole…",
            "cn": "突然有人敲门，我从门上的小孔往外看……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s not the maid.",
            "cn": "不是客房服务员。",
            "cnEdited": true
          },
          {
            "en": "It’s Sir Alex.",
            "cn": "是弗格森爵士。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I knew something was going on, because he never came to see players before the match.",
            "cn": "我知道出事了，因为他从不在赛前找球员。",
            "cnEdited": true
          },
          {
            "en": "I opened the door and he said, “Gerard, I regret to inform you that I can’t play you today.",
            "cn": "我打开门，他说：“杰拉德，我很遗憾地通知你，今天我不能派你上场。",
            "cnEdited": true
          },
          {
            "en": "The deal is almost done.",
            "cn": "转会快谈成了。",
            "cnEdited": true
          },
          {
            "en": "If I play you, and you have a bad game, they’ll say it’s because you’re headed to Barcelona.",
            "cn": "如果我让你上场，你又踢砸了，人们会说你是因为要去巴萨。",
            "cnEdited": true
          },
          {
            "en": "So I can’t put you in.",
            "cn": "所以我不能用你。",
            "cnEdited": true
          },
          {
            "en": "I just want you to know why.”",
            "cn": "我只是想让你知道原因。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The truth is, I was pretty devastated.",
            "cn": "说实话，我相当崩溃。",
            "cnEdited": true
          },
          {
            "en": "Even though I wanted to go home, I was ready to give everything for United and Sir Alex in that match.",
            "cn": "虽然我想回家，但那场比赛我本已准备好为曼联、为弗格森爵士拼上一切。",
            "cnEdited": true
          },
          {
            "en": "It was my dream to play at the Camp Nou in the Champions League.",
            "cn": "在诺坎普踢欧冠是我的梦想。",
            "cnEdited": true
          },
          {
            "en": "It hurt very badly.",
            "cn": "那一下真的很痛。",
            "cnEdited": true
          },
          {
            "en": "But in the end, Sir Alex made the right decision.",
            "cn": "但到头来，弗格森爵士做了正确的决定。",
            "cnEdited": true
          },
          {
            "en": "Everything worked out for the best for everyone.",
            "cn": "结果对每个人都好。",
            "cnEdited": true
          },
          {
            "en": "We got a 0-0 draw at the Camp Nou, and then we eliminated Barca at Old Trafford.",
            "cn": "我们在诺坎普0比0逼平，然后在老特拉福德淘汰了巴萨。",
            "cnEdited": true
          },
          {
            "en": "We went on to win both the Champions League and the Premier League, and I was able to go home under very good circumstances.",
            "cn": "我们接着把欧冠和英超都收入囊中，而我也能在非常体面的处境下回家。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Because of Sir Alex, I experienced one of the rarest things in football.",
            "cn": "因为弗格森爵士，我经历了足球世界里最罕见的事情之一。",
            "cnEdited": true
          },
          {
            "en": "I left in the best way possible.",
            "cn": "我以最好的方式离开。",
            "cnEdited": true
          },
          {
            "en": "It didn’t feel like it at the time, but that mistake against Bolton was the best thing to happen in my life.",
            "cn": "当时不觉得，但对博尔顿的那次失误，是我人生中发生的最好的事。",
            "cnEdited": true
          },
          {
            "en": "In the end, Barcelona paid only $5 million for me.",
            "cn": "最后，巴萨只花了500万美元就把我签了回来。",
            "cnEdited": true
          },
          {
            "en": "I arrived as the fourth-choice center back.",
            "cn": "我回来时是第四号中卫。",
            "cnEdited": true
          },
          {
            "en": "No one expected much from me.",
            "cn": "没人对我抱什么期望。",
            "cnEdited": true
          },
          {
            "en": "But thanks to Pep Guardiola’s football brain and his belief in me, I was playing alongside Carles Puyol by the end of the season.",
            "cn": "但多亏瓜迪奥拉的足球头脑和他对我的信任，赛季末我已经在和卡莱斯·普约尔搭档了。",
            "cnEdited": true
          },
          {
            "en": "Carles took me under his wing and was a huge influence on me.",
            "cn": "卡莱斯把我护在翅膀底下，对我影响巨大。",
            "cnEdited": true
          },
          {
            "en": "I learned so much from him, and we formed a partnership that extended to the Spanish national team.",
            "cn": "我从他身上学到太多，我们的搭档关系一直延续到西班牙国家队。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you would have told me when I returned to Barcelona that, in two years, I would be standing next to Puyol lifting the World Cup trophy, I would have thought you were absolutely crazy.",
            "cn": "如果我回巴萨的时候你告诉我：两年后，我会站在普约尔身边举起世界杯——我一定觉得你彻底疯了。",
            "cnEdited": true
          },
          {
            "en": "But football is a funny business, and that is exactly what happened.",
            "cn": "但足球就是这么有意思的行当，事情恰恰就这样发生了。",
            "cnEdited": true
          },
          {
            "en": "That’s how quickly everything changed for me.",
            "cn": "我的境遇变化就是这么快。",
            "cnEdited": true
          },
          {
            "en": "And it really makes me think about fate.",
            "cn": "这真的让我思考命运。",
            "cnEdited": true
          },
          {
            "en": "If I don’t make that mistake against Bolton, does it work out that way?",
            "cn": "如果我没有在对博尔顿的比赛里犯那个错，事情还会这样发展吗？",
            "cnEdited": true
          },
          {
            "en": "If Sir Alex decides to keep me on for another season to get a bigger transfer fee for me, does it work out that way?",
            "cn": "如果弗格森爵士为了多卖我一笔转会费而把我多留一个赛季，事情还会这样发展吗？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There are so many things that happen in a footballer’s life that people don’t see.",
            "cn": "球员的人生里有太多人们看不见的事。",
            "cnEdited": true
          },
          {
            "en": "And that’s why I’m writing this.",
            "cn": "这正是我写下这些的原因。",
            "cnEdited": true
          },
          {
            "en": "And that is why I need to tell you another quick story…",
            "cn": "这也是为什么我还需要再给你讲一个小故事……",
            "cnEdited": true
          },
          {
            "en": "Because, as I said, football is very complicated.",
            "cn": "因为正如我说的，足球非常复杂。",
            "cnEdited": true
          },
          {
            "en": "It’s not like the movies.",
            "cn": "它不像电影。",
            "cnEdited": true
          },
          {
            "en": "When I was 24 years old, I was on top of the world.",
            "cn": "二十四岁那年，我站在世界之巅。",
            "cnEdited": true
          },
          {
            "en": "I had won everything — La Liga, Champions League, World Cup.",
            "cn": "我什么都赢过了——西甲、欧冠、世界杯。",
            "cnEdited": true
          },
          {
            "en": "I was playing under a genius manager in Pep Guardiola, who really believed in me from the moment I arrived.",
            "cn": "我在一个天才主教练瓜迪奥拉手下踢球，他从我到来的那一刻就真的信任我。",
            "cnEdited": true
          },
          {
            "en": "I was playing for the club I had loved since I was a boy.",
            "cn": "我效力的是我从小爱着的俱乐部。",
            "cnEdited": true
          },
          {
            "en": "It was perfect.",
            "cn": "一切完美。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And then…",
            "cn": "然后……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I had the worst season of my career.",
            "cn": "我迎来了职业生涯最糟糕的一个赛季。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Everything seemed to fall apart in 2012.",
            "cn": "2012年，一切仿佛崩塌了。",
            "cnEdited": true
          },
          {
            "en": "I don’t know why.",
            "cn": "我不知道为什么。",
            "cnEdited": true
          },
          {
            "en": "Perhaps I had lost the fear that drove me to that level.",
            "cn": "也许我丢失了那股把我推到那个高度的恐惧感。",
            "cnEdited": true
          },
          {
            "en": "But for whatever reason, I started questioning myself.",
            "cn": "但不管什么原因，我开始怀疑自己。",
            "cnEdited": true
          },
          {
            "en": "As the season went on, Pep started to lose faith in me.",
            "cn": "随着赛季推进，瓜迪奥拉开始对我失去信心。",
            "cnEdited": true
          },
          {
            "en": "For the first three seasons, we had a phenomenal relationship.",
            "cn": "头三个赛季，我们的关系好得不得了。",
            "cnEdited": true
          },
          {
            "en": "I still revere Pep as a manager.",
            "cn": "至今我仍敬重瓜帅这个教练。",
            "cnEdited": true
          },
          {
            "en": "But the truth is, it was an extremely hard time.",
            "cn": "但说实话，那是一段极其艰难的时期。",
            "cnEdited": true
          },
          {
            "en": "He wanted his players to be obsessed with football 24 hours a day, and at that point in my life, I didn’t understand it.",
            "cn": "他要球员一天24小时都为足球痴迷，而在人生的那个阶段，我不理解这一点。",
            "cnEdited": true
          },
          {
            "en": "I wasn’t as committed to that philosophy.",
            "cn": "我没有那么认同那套哲学。",
            "cnEdited": true
          },
          {
            "en": "Pep simply didn’t trust me anymore, and the crucial moment was when he decided not to play me against Real Madrid in the league.",
            "cn": "瓜帅就是不再信任我了，关键时刻是他决定在联赛里对皇马不让我上场。",
            "cnEdited": true
          },
          {
            "en": "That was crushing to me.",
            "cn": "那对我打击巨大。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I started to think, Is this it?",
            "cn": "我开始想：就这样了吗？",
            "cnEdited": true
          },
          {
            "en": "Is the dream of playing for Barca over?",
            "cn": "为巴萨踢球的梦就这么结束了？",
            "cnEdited": true
          },
          {
            "en": "Is this how fast it can go away?",
            "cn": "一切消逝得能这么快？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then, in the second leg of the Champions League semifinal against Chelsea, something pretty crazy happened.",
            "cn": "然后，欧冠半决赛对切尔西的第二回合，一件相当疯狂的事发生了。",
            "cnEdited": true
          },
          {
            "en": "Another turn of fate.",
            "cn": "又一次命运的转弯。",
            "cnEdited": true
          },
          {
            "en": "We had lost 1–0 in the first leg at Stamford Bridge, and I didn’t play.",
            "cn": "首回合我们在斯坦福桥0比1输了，我没有上场。",
            "cnEdited": true
          },
          {
            "en": "Pep started me in the second leg at the Camp Nou to try to turn things around, but I honestly cannot tell you anything about the match.",
            "cn": "第二回合在诺坎普，瓜帅让我首发，想力挽狂澜——但说实话，那场比赛的任何事我都讲不出来。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Early on in the game, our keeper, Víctor Valdés, accidentally kneed me in the head during a clearance.",
            "cn": "比赛early阶段，我们的门将维克托·巴尔德斯解围时一膝盖撞在我头上。",
            "cnEdited": true
          },
          {
            "en": "I was knocked completely unconscious.",
            "cn": "我彻底失去了意识。",
            "cnEdited": true
          },
          {
            "en": "When I got to my feet, I stayed in the game somehow, and I know that I ran around for about 10 minutes, but I truly cannot remember anything that happened.",
            "cn": "我爬起来，不知怎么继续留在场上，我知道自己又跑了大概十分钟，但我真的完全不记得发生了什么。",
            "cnEdited": true
          },
          {
            "en": "Eventually, the doctor noticed that I was struggling and they pulled me out and put me on a stretcher and rushed me to the hospital.",
            "cn": "最后队医看出我不对劲，把我抬上担架，火速送去了医院。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I woke up the next day, and I couldn’t remember anything from the match.",
            "cn": "第二天醒来，比赛的事我一点都想不起来。",
            "cnEdited": true
          },
          {
            "en": "I couldn’t even remember who won.",
            "cn": "我连谁赢了都不记得。",
            "cnEdited": true
          },
          {
            "en": "I was in a complete fog.",
            "cn": "整个人一片迷雾。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It turns out, the match ended 2–2, and we were knocked out.",
            "cn": "后来才知道，那场球2比2，我们被淘汰了。",
            "cnEdited": true
          },
          {
            "en": "Within a few days, Pep announced his departure from Barca.",
            "cn": "几天之内，瓜帅宣布离开巴萨。",
            "cnEdited": true
          },
          {
            "en": "It felt like an era was coming to an end, and I thought that perhaps my time was up, too.",
            "cn": "感觉一个时代要落幕了，我寻思也许我的时代也到头了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That season really made me think about my career, and my life.",
            "cn": "那个赛季真的让我重新审视我的职业生涯，和我的人生。",
            "cnEdited": true
          },
          {
            "en": "It was a wake-up call.",
            "cn": "它是一记警钟。",
            "cnEdited": true
          },
          {
            "en": "When our team was playing for it all, Pep didn’t believe in me anymore.",
            "cn": "当球队为一切而战的时候，瓜帅不再相信我。",
            "cnEdited": true
          },
          {
            "en": "Then, when he finally turned to me, I got knocked out cold.",
            "cn": "等他终于肯用我的时候，我被打得不省人事。",
            "cnEdited": true
          },
          {
            "en": "Sometimes I think about what would have happened if I had woken up the next day and found out that we had gone through against Chelsea.",
            "cn": "有时我会想，如果第二天醒来，我得知我们淘汰了切尔西晋级了，会怎么样。",
            "cnEdited": true
          },
          {
            "en": "I was out with a head injury for weeks, so I definitely wouldn’t have played in the final.",
            "cn": "我因为头部伤势缺席了几周，决赛我肯定打不了。",
            "cnEdited": true
          },
          {
            "en": "Maybe we would have won the Champions League.",
            "cn": "也许我们会赢下那届欧冠。",
            "cnEdited": true
          },
          {
            "en": "Maybe Pep would have decided to stay at Barca.",
            "cn": "也许瓜帅会决定留在巴萨。",
            "cnEdited": true
          },
          {
            "en": "Maybe he never would have regained his trust in me.",
            "cn": "也许他永远不会重新信任我。",
            "cnEdited": true
          },
          {
            "en": "Maybe I would be at another club right now.",
            "cn": "也许我现在人在另一家俱乐部。",
            "cnEdited": true
          },
          {
            "en": "Instead, Tito Vilanova arrived as the manager the next season, and he gave me a chance to regain my place.",
            "cn": "现实是，下一个赛季蒂托·比拉诺瓦来了，他给了我夺回位置的机会。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There are so many moments like this that happen during a long career that make you think about fate, and chance, and how things could have gone differently.",
            "cn": "漫长的职业生涯里，有太多这样的时刻，让你思考命运、机缘，以及事情本可能怎样不同。",
            "cnEdited": true
          },
          {
            "en": "But that’s not what we read in the headlines.",
            "cn": "但这不是头条里的世界。",
            "cnEdited": true
          },
          {
            "en": "In the headlines, things are simple.",
            "cn": "在头条里，事情都很简单。",
            "cnEdited": true
          },
          {
            "en": "In real life, the most interesting things are happening beneath the surface.",
            "cn": "在真实生活里，最有意思的东西都藏在表面之下。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For example, people often ask me what it has been like playing with Messi for so many years.",
            "cn": "举个例子，人们总问我，和梅西一起踢了这么多年球是什么感受。",
            "cnEdited": true
          },
          {
            "en": "If I had to explain it in one sentence: He is an alien.",
            "cn": "如果要我用一句话解释：他是外星人。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He is not from this planet.",
            "cn": "他不是这个星球的人。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He’s the only player that I can recall seeing play for the first time, way back when we were 13 years old, and saying to myself, “Oh, this kid comes from somewhere else.",
            "cn": "他是我唯一记得的、第一次看就让我对自己说“哦，这孩子是从别处来的”的球员——那时我们才十三岁。",
            "cnEdited": true
          },
          {
            "en": "This is not human.”",
            "cn": "这不是人类。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He is an assassin.",
            "cn": "他是个刺客。",
            "cnEdited": true
          },
          {
            "en": "He’s the greatest I’ve ever seen.",
            "cn": "他是我见过最伟大的球员。",
            "cnEdited": true
          },
          {
            "en": "But, you see, it’s not about the way he attacks.",
            "cn": "但你看，关键不在他的进攻。",
            "cnEdited": true
          },
          {
            "en": "People ask me, “What’s the most incredible thing I’ve seen Leo do on the pitch?” And they expect me to tell them about him dribbling three defenders.",
            "cn": "人们问我：“你在场上见过莱奥做的最不可思议的事是什么？”他们期待我讲他连过三名后卫的故事。",
            "cnEdited": true
          },
          {
            "en": "And trust me, I have plenty of those stories.",
            "cn": "放心，那种故事我有一箩筐。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But for me, the reason that I know he’s from another planet is because of what happens when he doesn’t have the ball.",
            "cn": "但对我来说，我知道他来自另一个星球的证据，是他无球时发生的事。",
            "cnEdited": true
          },
          {
            "en": "Perhaps you can’t see it on TV, but I can see it on the pitch.",
            "cn": "在电视上你也许看不见，但在球场上我看得见。",
            "cnEdited": true
          },
          {
            "en": "You have to see his face when he’s sprinting to win the ball back from a defender.",
            "cn": "你必须看他的脸——当他冲刺着从后卫脚下把球抢回来的时候。",
            "cnEdited": true
          },
          {
            "en": "He has a look in his eyes that I haven’t ever seen in another footballer.",
            "cn": "他眼里的那种神情，我在任何别的球员身上都没见过。",
            "cnEdited": true
          },
          {
            "en": "It is what makes him so great.",
            "cn": "这正是他伟大的原因。",
            "cnEdited": true
          },
          {
            "en": "He is not interested in the spectacle.",
            "cn": "他对表演没有兴趣。",
            "cnEdited": true
          },
          {
            "en": "He rarely even does stepovers.",
            "cn": "他甚至很少踩单车。",
            "cnEdited": true
          },
          {
            "en": "He’s cut from a different cloth.",
            "cn": "他根本就不是同一种材料造出来的。",
            "cnEdited": true
          },
          {
            "en": "His greatness is in his obsession with winning the ball.",
            "cn": "他的伟大，藏在他对抢回皮球的痴迷里。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maybe that doesn’t make for a great headline.",
            "cn": "也许这上不了大标题。",
            "cnEdited": true
          },
          {
            "en": "But when I think about Messi’s true magic, it’s not in something you can find on YouTube.",
            "cn": "但当我想到梅西真正的魔力，它不是你在 YouTube 上能搜到的东西。",
            "cnEdited": true
          },
          {
            "en": "It’s about a subtle expression in his eyes.",
            "cn": "它在他眼里一闪而过的细微神情。",
            "cnEdited": true
          },
          {
            "en": "His greatness would take me another 5,000 words to explain.",
            "cn": "他的伟大够我再写五千字。",
            "cnEdited": true
          },
          {
            "en": "Perhaps in another article!",
            "cn": "也许下篇文章再写吧！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And that brings me back to the beginning.",
            "cn": "这又把话题带回了开头。",
            "cnEdited": true
          },
          {
            "en": "As I get older and prepare for the final World Cup of my career, I have been thinking about my place in the world.",
            "cn": "年纪渐长，着手准备职业生涯最后一届世界杯，我一直在思考自己在这个世界上的位置。",
            "cnEdited": true
          },
          {
            "en": "I have been thinking about how I got here, and what else I want to accomplish in life.",
            "cn": "我一直在想我是怎么走到今天的，以及这辈子我还想完成什么。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As athletes, I believe that we should use our platform to connect with people and let them into our lives and into our minds a little bit more.",
            "cn": "作为运动员，我认为我们应该善用自己的平台，和人们连接，让他们更多走进我们的生活、我们的头脑。",
            "cnEdited": true
          },
          {
            "en": "I think this mentality is needed now more than ever.",
            "cn": "我觉得这种心态现在比以往任何时候都更需要。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you watch television in Madrid, the media will tell you that everyone in Barcelona is trying to destroy the country.",
            "cn": "如果你在马德里看电视，媒体会告诉你，巴塞罗那的所有人都在试图毁掉这个国家。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you watch television in Barcelona, they will tell you that everyone in Madrid is trying to oppress the people.",
            "cn": "如果你在巴塞罗那看电视，他们会告诉你，马德里的所有人都在试图压迫人民。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Everyone is the bad guy now, depending on where you watch TV.",
            "cn": "现在，坏人在哪边都有，就看你电视开在哪个台。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They say the national team is in turmoil because of political differences.",
            "cn": "他们说国家队因为政治分歧陷入动荡。",
            "cnEdited": true
          },
          {
            "en": "In truth, we almost never talk about politics.",
            "cn": "实际上，我们几乎从不聊政治。",
            "cnEdited": true
          },
          {
            "en": "I’m too busy telling the Real guys that they’re f***ed in the league, and they’re too busy talking to me about refereeing conspiracies!",
            "cn": "我忙着告诉皇马那帮人这赛季你们完蛋了，他们也忙着跟我掰扯裁判阴谋论呢！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’ve been a footballer for more than half my life.",
            "cn": "我当球员的时间，已经超过人生的一半。",
            "cnEdited": true
          },
          {
            "en": "I’m 31 years old now.",
            "cn": "我今年31岁。",
            "cnEdited": true
          },
          {
            "en": "I used to say that I would be retired by 30.",
            "cn": "我从前总说自己三十岁就退役。",
            "cnEdited": true
          },
          {
            "en": "Honestly, do you know what keeps me going?",
            "cn": "说实话，你知道是什么让我继续踢下去吗？",
            "cnEdited": true
          },
          {
            "en": "It’s the experiences I’ve had in the locker rooms.",
            "cn": "是我在更衣室里经历的那些事。",
            "cnEdited": true
          },
          {
            "en": "It’s getting to know footballing geniuses like Messi, and Puyol, and Neymar, and Roy Keane (even though he almost murdered me).",
            "cn": "是能够认识梅西、普约尔、内马尔这样的足球天才，还有罗伊·基恩（尽管他差点杀了我）。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the end, football is a long trip.",
            "cn": "说到底，足球是一场漫长的旅行。",
            "cnEdited": true
          },
          {
            "en": "You win.",
            "cn": "你会赢。",
            "cnEdited": true
          },
          {
            "en": "You lose.",
            "cn": "你会输。",
            "cnEdited": true
          },
          {
            "en": "You embarrass yourself.",
            "cn": "你会出丑。",
            "cnEdited": true
          },
          {
            "en": "You make mistakes.",
            "cn": "你会犯错。",
            "cnEdited": true
          },
          {
            "en": "You laugh, you cry.",
            "cn": "你笑，你哭。",
            "cnEdited": true
          },
          {
            "en": "You do dumb things to pass the time.",
            "cn": "你干各种傻事打发时间。",
            "cnEdited": true
          },
          {
            "en": "Maybe you and your teammates even set an assistant coach’s motorcycle on fire (before buying him a brand new one, of course…",
            "cn": "说不定你们全队还会把助理教练的摩托车点着了火（当然，事后又给他买了辆全新的……",
            "cnEdited": true
          },
          {
            "en": "I’ll leave that story for another time!)",
            "cn": "这个故事改天再讲！）",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Hopefully, you grow from a boy to a man.",
            "cn": "但愿你从一个男孩长成了一个男人。",
            "cnEdited": true
          },
          {
            "en": "This is what makes sports beautiful, for me.",
            "cn": "这就是体育之于我的美。",
            "cnEdited": true
          },
          {
            "en": "It’s all just one long story.",
            "cn": "这一切，本就是一个漫长的故事。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Welcome to The Players’ Tribune Global.",
            "cn": "欢迎来到《球员论坛报》全球版。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One of my goals is to never shut up.",
            "cn": "我的目标之一，是永远不闭嘴。",
            "cnEdited": true
          }
        ]
      }
    ]
  },
  {
    "id": "fb-martin-odegaard-north-london-forever",
    "cat": "足球",
    "pin": true,
    "title": "North London Forever",
    "titleZh": "北伦敦，永远",
    "source": "The Players' Tribune · 2023-02-09",
    "date": "2023-02-09",
    "minutes": 29,
    "url": "https://www.theplayerstribune.com/posts/martin-odegaard-arsenal-soccer-norway-premier-league",
    "coverImg": "assets/covers/fb-martin-odegaard-north-london-forever.jpg",
    "player": "Martin Ødegaard",
    "playerZh": "马丁·厄德高",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "I’ve always had this weird connection to Arsenal.",
            "cn": "我和阿森纳之间一直有一种奇妙的缘分。",
            "cnEdited": true
          },
          {
            "en": "It started long before I signed.",
            "cn": "它在我签约之前很久就开始了。",
            "cnEdited": true
          },
          {
            "en": "I don’t even really know how to explain it, except with one little story.",
            "cn": "除了用一个小故事来讲，我实在不知道该怎么解释。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’ve never been that much into video games.",
            "cn": "我从来不算沉迷电子游戏。",
            "cnEdited": true
          },
          {
            "en": "I am of that generation that always played outside, but the one exception was FIFA.",
            "cn": "我们这一代人总是在外面野，唯一的例外是 FIFA。",
            "cnEdited": true
          },
          {
            "en": "I mostly played Career Mode.",
            "cn": "我基本只玩生涯模式。",
            "cnEdited": true
          },
          {
            "en": "You know, where you get to be the manager?",
            "cn": "就是你可以当主教练的那个模式？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The club I always chose to manage was Arsenal.",
            "cn": "我一直选来执教的俱乐部，是阿森纳。",
            "cnEdited": true
          },
          {
            "en": "They were my FIFA team.",
            "cn": "那是我的 FIFA 主队。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Growing up in Norway, I watched a lot of Premier League and I just had this good feeling about Arsenal.",
            "cn": "在挪威长大，我看了很多英超，对阿森纳就是有一种莫名的好感。",
            "cnEdited": true
          },
          {
            "en": "I’d seen clips of Thierry Henry and the Invincibles.",
            "cn": "我看过蒂埃里·亨利和那支“不败之师”的集锦。",
            "cnEdited": true
          },
          {
            "en": "I knew the club had a history of developing playmakers like Fabregas, Nasri, Özil — really smart, technical players, who were good on the ball and played the difficult passes.",
            "cn": "我知道这家俱乐部有培养法布雷加斯、纳斯里、厄齐尔这类组织者的传统——都是那种聪明、有技术、球粘在脚上、敢传刁钻直塞的球员。",
            "cnEdited": true
          },
          {
            "en": "My kind of players.",
            "cn": "正是我喜欢的类型。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As I got older, around the 2015 edition, I started actually appearing in FIFA.",
            "cn": "等我大一些，大约在 FIFA 2015 那一代，我自己开始真的出现在游戏里了。",
            "cnEdited": true
          },
          {
            "en": "I didn’t look much like me at first.",
            "cn": "一开始长得不太像我。",
            "cnEdited": true
          },
          {
            "en": "I think I was like a 67 overall, but I was actually in the game and it was a big deal.",
            "cn": "我记得总评大概是 67，但我是真的进了游戏，这可是件大事。",
            "cnEdited": true
          },
          {
            "en": "So, naturally, one of the first things I did when I was pretending to be Arsène Wenger on Career Mode was to buy myself.",
            "cn": "所以很自然，当我在生涯模式里扮演温格时，最先做的几件事之一，就是把我自己买进来。",
            "cnEdited": true
          },
          {
            "en": "Haha!",
            "cn": "哈哈！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Me and Arsenal.",
            "cn": "我和阿森纳。",
            "cnEdited": true
          },
          {
            "en": "It just seemed like a good match in my head.",
            "cn": "在我脑子里，这两者就是般配的。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That special connection turned into a reality when I signed here two years ago.",
            "cn": "两年前我签约到这里，这份奇妙的缘分变成了现实。",
            "cnEdited": true
          },
          {
            "en": "It was a decision that changed my life around.",
            "cn": "这是一个改变了我人生的决定。",
            "cnEdited": true
          },
          {
            "en": "I come into training smiling every day.",
            "cn": "我每天都是笑着走进训练基地的。",
            "cnEdited": true
          },
          {
            "en": "But my story is definitely not Career Mode.",
            "cn": "但我的故事，肯定不是生涯模式。",
            "cnEdited": true
          },
          {
            "en": "This has been a very different journey to how I imagined it on FIFA.",
            "cn": "这一路走来，和在 FIFA 里想象的完全不同。",
            "cnEdited": true
          },
          {
            "en": "In real life, you can’t just select where you want to go and everything will be perfect.",
            "cn": "现实生活里，你没法选好目的地，然后就一切完美。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "People always want to know what it was like for me growing up as a teenager in Norway with all that crazy hype.",
            "cn": "人们总想知道，一个挪威少年顶着那么疯狂的热度长大，是什么滋味。",
            "cnEdited": true
          },
          {
            "en": "And, to be honest, I don’t know how to answer that.",
            "cn": "说实话，我不知道该怎么回答。",
            "cnEdited": true
          },
          {
            "en": "It’s strange to say but, at the time, it felt…",
            "cn": "说来奇怪，在当时的我看来，那一切……",
            "cnEdited": true
          },
          {
            "en": "normal.",
            "cn": "很平常。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think I was too young — maybe a little too naive?",
            "cn": "我想我那时太小了——也许是有点太天真？",
            "cnEdited": true
          },
          {
            "en": "— to fully understand, you know?",
            "cn": "——还没法完全明白，你懂吗？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think people imagine that I had to avoid everything they were saying about me in the press and live in a bubble, but I didn’t.",
            "cn": "我以为大家会想象我不得不躲开媒体上关于我的一切言论，活在泡泡里，但我没有。",
            "cnEdited": true
          },
          {
            "en": "I actually used to read everything they wrote about me.",
            "cn": "我其实把媒体写的关于我的东西全读了。",
            "cnEdited": true
          },
          {
            "en": "I would literally sit down and read the newspapers.",
            "cn": "我真的会坐下来，一份一份读报纸。",
            "cnEdited": true
          },
          {
            "en": "But I read them like, O.K., cool.",
            "cn": "但我读起来的反应是：哦，挺好。",
            "cnEdited": true
          },
          {
            "en": "That’s nice.",
            "cn": "不错嘛。",
            "cnEdited": true
          },
          {
            "en": "And that was it.",
            "cn": "然后就没有然后了。",
            "cnEdited": true
          },
          {
            "en": "I moved on.",
            "cn": "该干嘛干嘛。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I had a good family around me, good friends, a good life.",
            "cn": "我有很好的家人在身边，很好的朋友，很好的生活。",
            "cnEdited": true
          },
          {
            "en": "I was just a kid who loved football.",
            "cn": "我就是一个爱踢球的孩子。",
            "cnEdited": true
          },
          {
            "en": "Proper, proper loved it.",
            "cn": "是真心的、发自己内心的爱。",
            "cnEdited": true
          },
          {
            "en": "I was obsessed.",
            "cn": "我痴迷于此。",
            "cnEdited": true
          },
          {
            "en": "There was an artificial pitch right next to my house in Drammen — literally 100 metres away — and I lived there for my entire childhood.",
            "cn": "在德拉门我家旁边就有一块人工草皮球场——真的就一百米——我在那里度过了整个童年。",
            "cnEdited": true
          },
          {
            "en": "Sometimes when I go back home now, I see kids on that same pitch just chatting, taking shots casually and I’m like, what are you doing?!",
            "cn": "现在有时回老家，我看见孩子们在那块球场上闲聊，随意颠两脚射门，我心想：你们在干嘛？！",
            "cnEdited": true
          },
          {
            "en": "That’s not how my friends and I played.",
            "cn": "我和朋友们可不是这么踢的。",
            "cnEdited": true
          },
          {
            "en": "We were out there playing tournaments, one-on-ones until it got dark.",
            "cn": "我们在那儿打锦标赛、单挑单挑再单挑，一直到天黑。",
            "cnEdited": true
          },
          {
            "en": "This was serious.",
            "cn": "这是很认真的事。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was also lucky that I had my dad, Hans Erik.",
            "cn": "我还有一个幸运之处：我有我爸爸，汉斯·埃里克。",
            "cnEdited": true
          },
          {
            "en": "He was my club coach at my childhood club Drammen Strong and then at Strømsgodset until I was 13 and my personal coach from when I was a baby.",
            "cn": "他是我童年俱乐部德拉门斯特朗的教练，后来直到我十三岁一直带斯特罗姆加德，而从我还在襁褓里时起，他就是我的私人教练。",
            "cnEdited": true
          },
          {
            "en": "He’d played in the top division in Norway as a midfielder, so if I wasn’t playing with my friends, I was training with him.",
            "cn": "他当过挪威顶级联赛的中场，所以只要我没在跟朋友们踢球，我就在跟他训练。",
            "cnEdited": true
          },
          {
            "en": "Really training.",
            "cn": "是很认真的那种训练。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maybe you think you know the story?",
            "cn": "也许你以为你知道这个故事？",
            "cnEdited": true
          },
          {
            "en": "Pushy dad making his son practice every day.",
            "cn": "逼着儿子天天练球的虎爸。",
            "cnEdited": true
          },
          {
            "en": "But actually it was the opposite.",
            "cn": "其实恰恰相反。",
            "cnEdited": true
          },
          {
            "en": "I was the one pushing him.",
            "cn": "是我追着他要练。",
            "cnEdited": true
          },
          {
            "en": "He knew things the other parents didn't.",
            "cn": "他知道别的家长不知道的东西。",
            "cnEdited": true
          },
          {
            "en": "So I wanted him to teach me, to give me an edge.",
            "cn": "所以我想让他教我，让我比别人多一点优势。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He was particularly obsessed with me developing my awareness and quick feet.",
            "cn": "他特别执着于练我的观察意识和脚下频率。",
            "cnEdited": true
          },
          {
            "en": "He was always getting me to look over my shoulder before receiving the ball.",
            "cn": "接球前回头的观察，是他一直逼着我养成的习惯。",
            "cnEdited": true
          },
          {
            "en": "In winter, when we couldn’t play outside, he took me to the indoor sports hall and we would do drills where he’d play the ball off a bench and it would bounce back to me.",
            "cn": "冬天没法在室外踢，他就带我去室内体育馆，做那种他把球往长凳上一踢、球反弹回来的练习。",
            "cnEdited": true
          },
          {
            "en": "He would come up behind, pressing me from one side and I had to look and adjust before receiving it.",
            "cn": "他会从背后上来，从一侧逼抢我，我必须先观察、再调整，然后才能接球。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "These days, when you see me turn away from a defender, using that touch and quick reading of the game, that’s the sports hall.",
            "cn": "如今你们看到我背身摆脱防守队员，用那种触球和对比赛的快速阅读——那就是那间体育馆。",
            "cnEdited": true
          },
          {
            "en": "That’s my dad.",
            "cn": "那就是我爸。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was so focused on being the best at that time.",
            "cn": "那时候我满脑子只想做到最好。",
            "cnEdited": true
          },
          {
            "en": "I knew I was talented but I wasn’t getting ahead of myself.",
            "cn": "我知道自己有天赋，但我没有飘飘然。",
            "cnEdited": true
          },
          {
            "en": "I was just enjoying playing with my friends for my hometown club.",
            "cn": "我只是在享受和朋友们一起为家乡俱乐部踢球。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then things started progressing really fast.",
            "cn": "然后一切都开始加速。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I was 13, I made my debut for Strømsgodset.",
            "cn": "十三岁，我完成了斯特罗姆加德的首秀。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I was 15, I became the youngest player to play for the Norway national team.",
            "cn": "十五岁，我成了代表挪威国家队出场的最年轻球员。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That’s when things really went crazy.",
            "cn": "从那时起，一切真的疯狂起来。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I remember coming on for the last 20 minutes of a Euro 2016 qualifier against Bulgaria at the Ullevaal Stadion in Oslo and the whole stadium, more than 20,000 people, going mad.",
            "cn": "我记得2016年欧洲杯预选赛对保加利亚，在奥斯陆的乌勒瓦尔球场，我第70分钟左右替补登场，全场两万多人瞬间疯狂。",
            "cnEdited": true
          },
          {
            "en": "Every time I touched the ball, they cheered.",
            "cn": "我每次触球，他们都在欢呼。",
            "cnEdited": true
          },
          {
            "en": "I can still hear that sound.",
            "cn": "那个声音我到现在都记得。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The thing is, in Norway, we hadn’t had a “superstar” in such a long time that the fans were a little desperate and when they started hearing this talk about this young guy from Drammen, they just wanted to believe it, even if they didn't actually know if I was any good.",
            "cn": "事情是这样的：挪威已经太久没有出过“超级巨星”了，球迷们有点饥渴；当他们开始听到关于这个德拉门小伙子的传闻，他们就是想相信，哪怕他们其实并不确定我到底行不行。",
            "cnEdited": true
          },
          {
            "en": "It added to this strange hype.",
            "cn": "这又给那股奇怪的热度添了一把火。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And then the hype just builds more hype, and suddenly you’re linked with Real Madrid.",
            "cn": "然后热度会生出更多热度，突然之间，你就和皇马联系在一起了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "My dad handled everything with the clubs, and there were a lot.",
            "cn": "和各家俱乐部的接洽都由我爸打理，找上门的非常多。",
            "cnEdited": true
          },
          {
            "en": "We went to Bayern, Dortmund, Man Utd, Liverpool, Madrid, Arsenal too.",
            "cn": "我们去过拜仁、多特蒙德、曼联、利物浦、皇马，也有阿森纳。",
            "cnEdited": true
          },
          {
            "en": "We got flown around in private planes and made to feel special.",
            "cn": "我们坐私人飞机飞来飞去，处处被当成贵客。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m not just saying this…",
            "cn": "我不是在夸张……",
            "cnEdited": true
          },
          {
            "en": "I was actually close to choosing Arsenal.",
            "cn": "我当时真的很接近选阿森纳。",
            "cnEdited": true
          },
          {
            "en": "When we went there, I got to train at London Colney.",
            "cn": "我们去那里的时候，我在伦敦科尔尼训练基地训练过。",
            "cnEdited": true
          },
          {
            "en": "I met Arsène Wenger.",
            "cn": "我见到了温格。",
            "cnEdited": true
          },
          {
            "en": "He took me and Dad out for dinner.",
            "cn": "他还带我和我爸出去吃了顿饭。",
            "cnEdited": true
          },
          {
            "en": "That was cool, but strange too.",
            "cn": "很酷，但也很奇怪。",
            "cnEdited": true
          },
          {
            "en": "It’s Arsène Wenger, you know?",
            "cn": "那可是温格啊，你懂吗？",
            "cnEdited": true
          },
          {
            "en": "He’s this legend I grew up watching on TV, and now I’m sitting across from him eating steak.",
            "cn": "他是我在电视上看大的传奇，现在我却坐在他对面吃牛排。",
            "cnEdited": true
          },
          {
            "en": "I was so nervous I was just sitting there thinking, Is he analysing me right now?",
            "cn": "我紧张得要命，坐在那儿满脑子想的是：他是不是正在分析我？",
            "cnEdited": true
          },
          {
            "en": "Is he going to judge me if I eat the fries?",
            "cn": "我要是吃了薯条，他会给我打低分吗？",
            "cnEdited": true
          },
          {
            "en": "Maybe I should just leave them.",
            "cn": "要不我还是别碰了。",
            "cnEdited": true
          },
          {
            "en": "Hahaha!",
            "cn": "哈哈哈！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So, why Real Madrid then?",
            "cn": "那么，为什么最后是皇马？",
            "cnEdited": true
          },
          {
            "en": "I talked about it a lot with my dad and the rest of my family.",
            "cn": "我和我爸、和全家人反复讨论过。",
            "cnEdited": true
          },
          {
            "en": "In the end, Madrid is Madrid.",
            "cn": "说到底，皇马就是皇马。",
            "cnEdited": true
          },
          {
            "en": "They were the Champions League holders with the best players in the world.",
            "cn": "他们是欧冠卫冕冠军，拥有世界上最强的球员。",
            "cnEdited": true
          },
          {
            "en": "Back then, I loved Isco — he was so smooth on the ball.",
            "cn": "那时候我很喜欢伊斯科——他拿球那么丝滑。",
            "cnEdited": true
          },
          {
            "en": "Another one of my kind of players!",
            "cn": "又是一个我喜欢的类型！",
            "cnEdited": true
          },
          {
            "en": "But the really key thing about Madrid’s offer was that they had a B team where I could play competitive football immediately.",
            "cn": "但皇马这份报价里真正关键的东西，是他们的B队——我可以立刻踢上有竞争力的正式比赛。",
            "cnEdited": true
          },
          {
            "en": "And the manager of that team?",
            "cn": "而那支球队的教练是谁？",
            "cnEdited": true
          },
          {
            "en": "Zinedine Zidane.",
            "cn": "齐内丁·齐达内。",
            "cnEdited": true
          },
          {
            "en": "It felt like the total package.",
            "cn": "感觉这就是一份完美套餐。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Before we officially told them, I remember sitting with my dad on the sofa watching a Real Madrid game on TV.",
            "cn": "在正式答复之前，我记得我和我爸坐在沙发上，看皇马的比赛。",
            "cnEdited": true
          },
          {
            "en": "At one point, he turned to me with his phone in his hand like, “Is it time?",
            "cn": "看着看着，他忽然拿着手机转向我：“是时候了吗？",
            "cnEdited": true
          },
          {
            "en": "Should we tell them?”",
            "cn": "咱们告诉他们吧？”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We’d been speaking about the decision for so long, as it was so hard to turn down all these other amazing clubs.",
            "cn": "这个决定我们已经讨论了很久，因为拒绝那些同样出色的俱乐部实在太难。",
            "cnEdited": true
          },
          {
            "en": "But then we did it.",
            "cn": "然后我们就发了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He’d had the draft saved in his phone for like a week or two already.",
            "cn": "那条信息在他手机里存了大概一两个星期。",
            "cnEdited": true
          },
          {
            "en": "This really simple message.",
            "cn": "非常简单的一句话。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was something like: “Martin has decided he wants to come, if you still want him.”",
            "cn": "大意是：“马丁决定要来，如果你们还要他的话。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I just told him, “Send it.”",
            "cn": "我只跟他说：“发吧。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Let’s talk about my presentation day.",
            "cn": "来说说我的亮相日吧。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m actually cringing thinking about it now…",
            "cn": "现在想起来我都会脚趾抠地……",
            "cnEdited": true
          },
          {
            "en": "but I know a lot of people talked about this at the time.",
            "cn": "但我知道当时很多人都在议论这件事。",
            "cnEdited": true
          },
          {
            "en": "I was basically a meme.",
            "cn": "我基本上成了一个表情包。",
            "cnEdited": true
          },
          {
            "en": "So let me clear up what happened.",
            "cn": "那让我来还原一下当时发生了什么。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They sent a plane to pick us up from Norway in the morning.",
            "cn": "早上他们派了一架飞机来挪威接我们。",
            "cnEdited": true
          },
          {
            "en": "Really early.",
            "cn": "非常早。",
            "cnEdited": true
          },
          {
            "en": "So, I wake up but I’m still half asleep.",
            "cn": "我醒了，但还半睡半醒。",
            "cnEdited": true
          },
          {
            "en": "My hair is all over the place.",
            "cn": "头发炸得到处都是。",
            "cnEdited": true
          },
          {
            "en": "I didn’t have time to shower.",
            "cn": "来不及洗澡。",
            "cnEdited": true
          },
          {
            "en": "I just put on whatever clothes I could grab quickly, throw something smarter into a bag and we take the flight.",
            "cn": "我随手抓了几件衣服套上，往包里塞了件稍微体面的，就上了飞机。",
            "cnEdited": true
          },
          {
            "en": "I figure that once I arrive at the hotel in Madrid I can get changed, take a shower, prepare myself, you know?",
            "cn": "我心想，等到了马德里的酒店，我可以换衣服、洗个澡、收拾一下自己，对吧？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But then we land, we get off the plane and I realise they are taking us directly to the training ground to do the medical and then the press conference.",
            "cn": "结果飞机落地，下了舷梯我才发现，他们要直接带我们去训练基地体检，然后开发布会。",
            "cnEdited": true
          },
          {
            "en": "No hotel stop.",
            "cn": "酒店？没有这一站。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And I’m like, Wait, we’re doing this now?",
            "cn": "我心想：等等，现在就来吗？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Suddenly, I’m sitting next to Madrid legend Emilio Butragueño — who’s wearing a really smart suit, of course — and they are introducing me to the world.",
            "cn": "突然之间，我坐在皇马传奇布特拉格诺旁边——他当然穿着一身非常精神的西装——他们正在把我介绍给全世界。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I know you’ve seen the pictures.",
            "cn": "我知道你们看过那些照片。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Me, in this old stripey jumper, not even showered, trying to flatten my hair with my hands.",
            "cn": "我，穿着那件旧条纹毛衣，澡都没洗，用手拼命压着头发。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This was the biggest day of my life, images going all over the world.",
            "cn": "那是我人生中最大的一天，照片传遍了全世界。",
            "cnEdited": true
          },
          {
            "en": "I’m supposed to be this player that Real Madrid has beaten everyone to sign and I look like a random school kid they just pulled from the stadium tour.",
            "cn": "我本该是那个皇马力压群雄签下的天才，看上去却像他们刚从球场参观团里随便拉来的中学生。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Butragueño is introducing me and in my head I’m like:",
            "cn": "布特拉格诺在做介绍，我心里想的是：",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "God, I wish I’d changed my jumper.",
            "cn": "天哪，真希望我换了件毛衣。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Someone could’ve told me.",
            "cn": "怎么没人提醒我一声。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Why didn’t anyone tell me????",
            "cn": "为什么没有任何人告诉我？？？",
            "cnEdited": true
          },
          {
            "en": "Hahaha!",
            "cn": "哈哈哈！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The other thing I’m thinking about at that moment, sitting there in front of all these people, is my Confirmation.",
            "cn": "那一刻，坐在这么多人面前，我脑子里想的另一件事，是我的坚振礼。",
            "cnEdited": true
          },
          {
            "en": "If you don’t know, it’s a common ceremony for kids in Norway to go through where you celebrate becoming an adult.",
            "cn": "如果你不了解，这是挪威孩子都会经历的一种成人仪式。",
            "cnEdited": true
          },
          {
            "en": "I did mine when I was 15.",
            "cn": "我十五岁时办的。",
            "cnEdited": true
          },
          {
            "en": "It’s just for family and close friends and it’s normal that at the end of the event, the kid gets up to do a short speech to thank everyone for coming.",
            "cn": "只有家人和好友参加，按惯例仪式的最后，过礼的孩子要站起来做个简短致辞，感谢大家的到来。",
            "cnEdited": true
          },
          {
            "en": "Except at mine, I froze.",
            "cn": "可轮到我的时候，我僵住了。",
            "cnEdited": true
          },
          {
            "en": "I was too shy to speak in front of my family — the people I’m most comfortable with!",
            "cn": "在最让我放松的人——我的家人——面前，我居然紧张得说不出话！",
            "cnEdited": true
          },
          {
            "en": "I was confident on the football pitch, but speaking in front of people?",
            "cn": "在球场上我信心十足，可要当众讲话？",
            "cnEdited": true
          },
          {
            "en": "No way.",
            "cn": "没门。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One year later, I’m front and centre at a Real Madrid press conference.",
            "cn": "一年之后，我就坐在了皇马发布会的正中央。",
            "cnEdited": true
          },
          {
            "en": "In this stripey jumper.",
            "cn": "穿着那件条纹毛衣。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Haha can you imagine??",
            "cn": "哈哈你能想象吗？？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was so out of my comfort zone.",
            "cn": "我完全不在自己的舒适区。",
            "cnEdited": true
          },
          {
            "en": "You can see the fear in my face.",
            "cn": "你能从我脸上看到恐惧。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When it’s my turn to speak, I have these big headphones on and I’m practically whispering in Norwegian like, “Uh yeah…",
            "cn": "轮到我发言时，我戴着巨大的同传耳机，用挪威语小声嘀咕：“呃，好的……",
            "cnEdited": true
          },
          {
            "en": "It’s a great pleasure.",
            "cn": "我很荣幸。",
            "cnEdited": true
          },
          {
            "en": "Ummm, I’m very proud.…”",
            "cn": "嗯……我非常骄傲……”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But in a weird way, I think that moment actually helped a lot of people’s perceptions of me.",
            "cn": "但说来奇怪，我觉得那个瞬间反而改变了很多人对我的看法。",
            "cnEdited": true
          },
          {
            "en": "As soon as you get famous, people expect you to be a certain way.",
            "cn": "人一出名，别人就会期待你按某种方式活着。",
            "cnEdited": true
          },
          {
            "en": "Like you’re this superhero, who can do anything.",
            "cn": "好像你是个无所不能的超级英雄。",
            "cnEdited": true
          },
          {
            "en": "You can play football, so you also must be able to speak well, be confident, give everything of yourself at all times.",
            "cn": "你会踢球，所以你也必须会讲话、必须自信、必须随时随地掏出全部的自己。",
            "cnEdited": true
          },
          {
            "en": "But that’s not realistic.",
            "cn": "可这不现实。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think that press conference helped people connect to what I was going through.",
            "cn": "我觉得那场发布会让人们理解了我当时的处境。",
            "cnEdited": true
          },
          {
            "en": "I was just this shy little kid.",
            "cn": "我只是一个害羞的小孩。",
            "cnEdited": true
          },
          {
            "en": "I mean, have you met a 16-year-old recently?",
            "cn": "这么说吧，你最近见过十六岁的孩子吗？",
            "cnEdited": true
          },
          {
            "en": "They felt for me and saw how normal I was.",
            "cn": "他们心疼我，也看到了我有多普通。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A few days after the presentation, I went into training for the first time and, honestly, that was just surreal.",
            "cn": "亮相几天后，我第一次去一线队训练，说实话，那感觉超现实。",
            "cnEdited": true
          },
          {
            "en": "I’m not old enough to drive, so my dad actually has to bring me in to play with Isco and Ronaldo and Ramos and Modric and Bale and Benzema, like he’s dropping me off at school.",
            "cn": "我还没到开车的年纪，得由我爸送我去和伊斯科、C罗、拉莫斯、莫德里奇、贝尔、本泽马一起训练，就像送我上学一样。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "All I’m thinking is about how these guys will treat me when I walk into their dressing room.",
            "cn": "我满脑子想的都是：走进他们的更衣室时，这些大人物会怎么对我。",
            "cnEdited": true
          },
          {
            "en": "This little kid who didn’t speak any Spanish.",
            "cn": "一个西班牙语都不会说的小屁孩。",
            "cnEdited": true
          },
          {
            "en": "But they were all very kind, and the ones who spoke English — Kroos, Modric, Ronaldo — took extra care of me in the beginning.",
            "cn": "但他们都非常友善，会说英语的那几个——克罗斯、莫德里奇、C罗——一开始还格外照顾我。",
            "cnEdited": true
          },
          {
            "en": "They gave me advice and helped me a lot.",
            "cn": "他们给我建议，帮了我很多。",
            "cnEdited": true
          },
          {
            "en": "But honestly I don’t think any of them were particularly worried about a 16-year-old from Norway taking their place in the team.",
            "cn": "不过说实话，我想他们谁也没怎么担心过一个来自挪威的十六岁小孩会抢走他们的位置。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We made this plan with the club that I would train every day with the first team but get regular game time with the B team.",
            "cn": "我们和俱乐部定了一个计划：我每天跟一线队训练，但定期跟B队打比赛。",
            "cnEdited": true
          },
          {
            "en": "It seemed like a smart plan at the time, but it worked out that I ended up not finding my place with either group.",
            "cn": "当时看着很聪明，结果却是我两边都没找到归属。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "With the B team, I wasn’t with them regularly so I didn’t find that connection.",
            "cn": "在B队，我不常在，融不进那个集体。",
            "cnEdited": true
          },
          {
            "en": "In the first team, I was just some kid who came to train.",
            "cn": "在一线队，我只是个来训练的小孩。",
            "cnEdited": true
          },
          {
            "en": "I wasn’t involved in matches.",
            "cn": "比赛没有我的份。",
            "cnEdited": true
          },
          {
            "en": "I felt a bit like an outsider.",
            "cn": "我有点像个局外人。",
            "cnEdited": true
          },
          {
            "en": "I was stuck in between.",
            "cn": "我卡在中间。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I stopped playing with the spark that was typical of my game.",
            "cn": "我踢球失去了那种标志性的火花。",
            "cnEdited": true
          },
          {
            "en": "I went a bit too safe for a time.",
            "cn": "有段时间我踢得太过保守。",
            "cnEdited": true
          },
          {
            "en": "I was worrying more about not making mistakes than actually playing my game.",
            "cn": "我更怕犯错，而不是去做自己真正擅长的事。",
            "cnEdited": true
          },
          {
            "en": "And my game was always about making a difference.",
            "cn": "而我的足球，从来都是关于改变比赛的。",
            "cnEdited": true
          },
          {
            "en": "Playing the difficult pass.",
            "cn": "传出那些刁钻的球。",
            "cnEdited": true
          },
          {
            "en": "I can understand why it happened now.",
            "cn": "现在我理解这一切是怎么发生的了。",
            "cnEdited": true
          },
          {
            "en": "I was still a little kid, but I’ve learned that you have to be ruthless.",
            "cn": "那时我还是个小孩，但我后来懂得：你必须狠。",
            "cnEdited": true
          },
          {
            "en": "You have to not give a f***.",
            "cn": "你必须豁出去，谁的脸色都不看。",
            "cnEdited": true
          },
          {
            "en": "You have to show the real you on the pitch.",
            "cn": "你必须把真实的自己亮在球场上。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After a couple of years, I just wasn’t progressing.",
            "cn": "几年过去，我没有进步。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The press came after me for not immediately living up to the hype.",
            "cn": "媒体开始围攻我，因为我没有立刻兑现那些吹捧。",
            "cnEdited": true
          },
          {
            "en": "I was an easy target.",
            "cn": "我是个好靶子。",
            "cnEdited": true
          },
          {
            "en": "If you really know me, you know I smile a lot, but I think from the outside sometimes my face looks more grumpy than I actually am!",
            "cn": "如果你真的了解我，你知道我其实很爱笑，但我猜从外面看，我的脸有时显得比实际更臭！",
            "cnEdited": true
          },
          {
            "en": "It made it easier for them to write about how I was struggling to adapt.",
            "cn": "这让他们写“我难以适应”更容易了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I remember reading a headline like: “NOW IT’S MAKE OR BREAK TIME FOR MARTIN ØDEGAARD”",
            "cn": "我记得读过一个大标题：“马丁·厄德高，现在是成是败的关键时刻”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And I’m like, make or break?",
            "cn": "我心想：成或败？",
            "cnEdited": true
          },
          {
            "en": "I’m 18 years old!",
            "cn": "我才十八岁！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Maybe if I’d been Spanish, I might have been given a bit more time to grow.",
            "cn": "如果我是个西班牙球员，也许人们会多给我一些成长的时间。",
            "cnEdited": true
          },
          {
            "en": "Honestly, I don’t know.",
            "cn": "说实话，我不知道。",
            "cnEdited": true
          },
          {
            "en": "In the end, it’s just the nature of the hype machine.",
            "cn": "说到底，这就是热度机器的天性。",
            "cnEdited": true
          },
          {
            "en": "There is no in-between in modern football.",
            "cn": "现代足球里没有中间地带。",
            "cnEdited": true
          },
          {
            "en": "You’re either the best signing in history, or you’re sh**.",
            "cn": "你要么是史上最佳签约，要么就是垃圾。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Listen, I want to make it clear that I am not complaining about my time at Real Madrid.",
            "cn": "听着，我想说清楚：我不是在抱怨皇马时光。",
            "cnEdited": true
          },
          {
            "en": "Not at all.",
            "cn": "完全没有。",
            "cnEdited": true
          },
          {
            "en": "Going to Madrid was a good thing for me.",
            "cn": "去马德里对我来说是好事。",
            "cnEdited": true
          },
          {
            "en": "I learned so much about what it takes to reach the top.",
            "cn": "关于登顶需要付出什么，我学到了太多。",
            "cnEdited": true
          },
          {
            "en": "I watched, trained and learned from the best players in the world, my idols.",
            "cn": "我观察着、训练着，向世界上最强的球员、我的偶像们学习。",
            "cnEdited": true
          },
          {
            "en": "I played at the Bernabéu.",
            "cn": "我在伯纳乌踢过球。",
            "cnEdited": true
          },
          {
            "en": "I learned to be tough and to face challenges.",
            "cn": "我学会了坚强，学会了直面挑战。",
            "cnEdited": true
          },
          {
            "en": "It’s part of who I am now.",
            "cn": "这已经是我的一部分。",
            "cnEdited": true
          },
          {
            "en": "It’s the reason I’m where I am today.",
            "cn": "正因如此，我才有今天。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But when things got tough, I never lost sight of the bigger picture.",
            "cn": "但当日子变得艰难时，我从未丢掉对大局的判断。",
            "cnEdited": true
          },
          {
            "en": "In my head I was always like, How can I change?",
            "cn": "我心里始终想的是：我怎么改变？",
            "cnEdited": true
          },
          {
            "en": "How can I get better?",
            "cn": "我怎么变强？",
            "cnEdited": true
          },
          {
            "en": "Because in the end, I will never be the guy who is happy to just train at the biggest club and maybe get a few minutes here and there.",
            "cn": "因为说到底，我永远不会做那种“在最大的俱乐部训练训练、偶尔捞几分钟上场就很满足”的人。",
            "cnEdited": true
          },
          {
            "en": "I was always thinking about what I needed to do to be the best version of me I could be.",
            "cn": "我一直在想，要怎样做才能成为最好的自己。",
            "cnEdited": true
          },
          {
            "en": "That’s why I needed to move on.",
            "cn": "这就是我必须继续前进的原因。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Back when I was coming up in Norway, it seemed like I had all the options in the world.",
            "cn": "当年在挪威蹿红的时候，我似乎手握全世界的选项。",
            "cnEdited": true
          },
          {
            "en": "Only a couple of years later, I had to come to terms with the fact that clubs weren’t lining up for me anymore.",
            "cn": "仅仅几年之后，我就不得不接受：俱乐部们已经不再排着队要我了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you’re playing Career Mode and you go from Real Madrid to Heerenveen, maybe you think something has gone wrong.",
            "cn": "如果你在生涯模式里从皇马转会去海伦芬，也许你会觉得哪里出问题了。",
            "cnEdited": true
          },
          {
            "en": "No offence to the Dutch league!",
            "cn": "没有冒犯荷甲的意思！",
            "cnEdited": true
          },
          {
            "en": "But honestly, for me, it was a fantastic experience.",
            "cn": "但说实话，对我而言，那是一段绝佳的经历。",
            "cnEdited": true
          },
          {
            "en": "I got to play regularly at first-team level, which was exactly what I needed.",
            "cn": "我获得了一线队的稳定出场，这正是我需要的。",
            "cnEdited": true
          },
          {
            "en": "I owe a lot to my loans at Heerenveen, where I grew as a person, and Vitesse, where I grew as a player.",
            "cn": "我很感激在海伦芬和维特斯的租借——在海伦芬我作为一个人成长了，在维特斯我作为一名球员成长了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "At Heerenveen, I got my driving licence (I didn’t need my dad taking me to training anymore), I learned to be by myself and to take responsibility.",
            "cn": "在海伦芬，我考下了驾照（再也不用我爸送我去训练了），学会了独立生活、自己扛责任。",
            "cnEdited": true
          },
          {
            "en": "Then at Vitesse, I met the manager Leonid Slutsky.",
            "cn": "然后到了维特斯，我遇到了主教练莱昂尼德·斯卢茨基。",
            "cnEdited": true
          },
          {
            "en": "He was amazing.",
            "cn": "他非常出色。",
            "cnEdited": true
          },
          {
            "en": "He believed in my ability without asking me to be magical every time.",
            "cn": "他相信我的能力，却从不要求我每次都变魔术。",
            "cnEdited": true
          },
          {
            "en": "He improved my decision making and teamwork.",
            "cn": "他提升了我的决策和团队配合。",
            "cnEdited": true
          },
          {
            "en": "Soon I was finding the difficult passes again.",
            "cn": "很快，我又开始传出那些刁钻的球了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After two and a half seasons on loan in the Netherlands, I was ready to come back to La Liga and settle down at Real Sociedad for at least two seasons.",
            "cn": "在荷兰租借的两个半赛季之后，我已经准备好回到西甲，在皇家社会安顿下来，至少踢两个赛季。",
            "cnEdited": true
          },
          {
            "en": "In the end, it didn’t work out that way.",
            "cn": "最终，事情没有按那个剧本走。",
            "cnEdited": true
          },
          {
            "en": "It’s an amazing club in a beautiful part of the world, with fans that are so connected to their team.",
            "cn": "那是一家了不起的俱乐部，坐落在世界上一片美丽的角落，球迷和球队血肉相连。",
            "cnEdited": true
          },
          {
            "en": "In a way, the Basque culture is more like Norway.",
            "cn": "某种意义上，巴斯克文化更像挪威。",
            "cnEdited": true
          },
          {
            "en": "People are more reserved on the outside but once they take you into their hearts, they are so caring and protective.",
            "cn": "人们外表比较内敛，可一旦你走进他们心里，他们无比体贴、无比护短。",
            "cnEdited": true
          },
          {
            "en": "You become one of their own.",
            "cn": "你会成为“他们自己人”。",
            "cnEdited": true
          },
          {
            "en": "I loved that.",
            "cn": "我爱极了这一点。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was playing well and I was really happy there, but after a year when Madrid called I thought, I have to take this chance now.",
            "cn": "我踢得很好，在那里非常开心，但一年后皇马来电话时，我心想：这个机会我现在必须抓住。",
            "cnEdited": true
          },
          {
            "en": "This is the dream I’ve been following since I was 16.",
            "cn": "这是我从十六岁起就追随的梦想。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I had a good connection with Zidane from when he coached the B team and he took good care of me, so I wanted to believe it would work out this time.",
            "cn": "我和齐达内在他带B队时就关系很好，他一直很照顾我，所以我愿意相信这一次会成。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But then I got COVID.",
            "cn": "但我得了新冠。",
            "cnEdited": true
          },
          {
            "en": "I started the first two games of that season in 2020-21, but I wasn’t fully recovered.",
            "cn": "2020-21赛季的前两场我都是首发，但我没有完全恢复。",
            "cnEdited": true
          },
          {
            "en": "I didn’t perform at my best and after that, I didn’t get many more chances.",
            "cn": "我没能拿出最好的状态，之后机会就变得寥寥。",
            "cnEdited": true
          },
          {
            "en": "Almost nothing.",
            "cn": "几乎为零。",
            "cnEdited": true
          },
          {
            "en": "Meanwhile, I’m watching Real Sociedad on TV thinking, I could’ve still been there.",
            "cn": "与此同时，我在电视上看皇家社会的比赛，心想：我本来还可以留在那儿的。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was thinking about this a lot.",
            "cn": "这个问题我想了很久。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I spoke to my agent ahead of the January transfer window, “Look, we need to do something…",
            "cn": "一月转会窗之前我跟经纪人说：“听着，我们得做点什么……",
            "cnEdited": true
          },
          {
            "en": "I didn’t come back to just be there.",
            "cn": "我回来不是为了坐着的。",
            "cnEdited": true
          },
          {
            "en": "I came back here to play.",
            "cn": "我回来是为了上场。",
            "cnEdited": true
          },
          {
            "en": "I need to play and keep improving.”",
            "cn": "我需要比赛，需要持续进步。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He tried to calm me down, telling me we’d just cancelled one contract to come back to Madrid.",
            "cn": "他想让我冷静，说我们刚毁约了一次才回的马德里。",
            "cnEdited": true
          },
          {
            "en": "I’d always said I wanted stability and now five months later I wanted to move again?",
            "cn": "我一直说要稳定，结果五个月后又要走？",
            "cnEdited": true
          },
          {
            "en": "But I had made up my mind.",
            "cn": "但我已经拿定了主意。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I can only thank Madrid for investing in a 16-year-old kid.",
            "cn": "对于皇马在一个十六岁孩子身上的投入，我只有感激。",
            "cnEdited": true
          },
          {
            "en": "Everybody had good intentions and I don’t blame anyone, but I needed to find a place where I could settle.",
            "cn": "每个人都出于好意，我不怪任何人，但我需要找到一个能扎根的地方。",
            "cnEdited": true
          },
          {
            "en": "I needed to find an actual home.",
            "cn": "我需要一个真正的家。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I found it in North London.",
            "cn": "我在北伦敦找到了它。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Career Mode.",
            "cn": "生涯模式。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This little memory in the back of my mind just flashed up the second my agent mentioned that Arsenal were interested.",
            "cn": "经纪人一提到阿森纳有意，我脑海深处的那段小记忆就闪了出来。",
            "cnEdited": true
          },
          {
            "en": "It just felt right.",
            "cn": "就是觉得对了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I spoke to Mikel Arteta on a Zoom call and he told me all about the project.",
            "cn": "我和米克尔·阿尔特塔视频通话，他给我讲了整个计划。",
            "cnEdited": true
          },
          {
            "en": "At the time, Arsenal were not doing well.",
            "cn": "那时阿森纳处境不好。",
            "cnEdited": true
          },
          {
            "en": "They were way down like 15th in the table, but that meeting…",
            "cn": "联赛排名掉到了第十五左右，但那次谈话……",
            "cnEdited": true
          },
          {
            "en": "Honestly, I challenge anyone to come away from a meeting with Arteta and not believe everything he tells you.",
            "cn": "说实话，我敢向任何人挑战：跟阿尔特塔谈完，你不可能不信他说的一切。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He is next level.",
            "cn": "他是另一个级别的。",
            "cnEdited": true
          },
          {
            "en": "It's hard to explain.",
            "cn": "很难解释。",
            "cnEdited": true
          },
          {
            "en": "He’s passionate, he’s intense and sometimes, yeah, he’s a bit crazy…",
            "cn": "他有激情、有强度，有时候，嗯，是有点疯……",
            "cnEdited": true
          },
          {
            "en": "but when he speaks, you understand that whatever he says will happen, will happen.",
            "cn": "但当他开口，你会明白：他说会发生的事，就会发生。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He told me his plan, everything he was building towards.",
            "cn": "他跟我讲了计划，讲了他正在打造的一切。",
            "cnEdited": true
          },
          {
            "en": "He knew exactly what needed to change at the club.",
            "cn": "他很清楚俱乐部哪里需要改变。",
            "cnEdited": true
          },
          {
            "en": "He told me all about these amazing young players in the squad — Saka, Martinelli, Smith Rowe, etc., etc. He told me how he wanted me to fit in and how I was going to improve.",
            "cn": "他给我讲了队里那些出色的年轻人——萨卡、马丁内利、史密斯·罗，等等等等。他讲了想让我怎样融入，我会怎样进步。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I got this strong feeling that he was onto something really special.",
            "cn": "我有一种强烈的预感：他正在成就一番真正特别的事业。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Not that I needed any more convincing but I also got so many messages from Arsenal fans on Instagram telling me to sign.",
            "cn": "倒不需要更多说服，Instagram 上还有成千上万的阿森纳球迷给我发消息催我签约。",
            "cnEdited": true
          },
          {
            "en": "Not just me, my whole family, friends and everyone I follow!",
            "cn": "不只是我，我全家人、朋友们、我关注的所有人都在收！",
            "cnEdited": true
          },
          {
            "en": "It’s such an amazing, active fan base.",
            "cn": "这球迷群体真是又热情又活跃。",
            "cnEdited": true
          },
          {
            "en": "Random people I know would show me how the comments on their posts were full of stuff like “Tell Martin to sign for Arsenal.”",
            "cn": "我认识的一些普通人会给我看，他们帖子底下的评论全都是“让马丁签阿森纳”。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That was just…",
            "cn": "那感觉真是……",
            "cnEdited": true
          },
          {
            "en": "Wow.",
            "cn": "哇。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I have to say, the fans have been amazing since I’ve been here.",
            "cn": "我必须说，自从我来到这里，球迷一直太棒了。",
            "cnEdited": true
          },
          {
            "en": "Maybe some people think that doesn't matter to us as players, but it matters.",
            "cn": "也许有人觉得这对我们球员不重要，但它重要。",
            "cnEdited": true
          },
          {
            "en": "At the Emirates, every time you make a tackle to knock the ball out for a throw-in, the whole stadium cheers like you've scored a goal.",
            "cn": "在酋长球场，哪怕你只是一次把球铲出边线的防守，全场都会像你进球一样欢呼。",
            "cnEdited": true
          },
          {
            "en": "They give you this confidence that you can do anything.",
            "cn": "他们给你一种“你什么都能做到”的自信。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "At the end of my first season here in 2020-21, when we finished eighth, it seemed like no one at the club lost faith in what we were doing.",
            "cn": "我在这里的第一个赛季，2020-21赛季末我们排第八，俱乐部里似乎没有人对我们正在做的事失去信心。",
            "cnEdited": true
          },
          {
            "en": "Everyone believed in us.",
            "cn": "所有人都相信我们。",
            "cnEdited": true
          },
          {
            "en": "It was all part of the plan.",
            "cn": "这都是计划的一部分。",
            "cnEdited": true
          },
          {
            "en": "Even last season when things got really tough.",
            "cn": "哪怕上赛季那么艰难的时候也一样。",
            "cnEdited": true
          },
          {
            "en": "Obviously, we took it hard losing out on Champions League qualification when it was in our hands like that, but we learned from that experience.",
            "cn": "显然，眼看着欧冠资格攥在手里却最终错失，我们都很痛苦，但我们从那段经历里学到了东西。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We came back closer, stronger, hungrier.",
            "cn": "我们以更团结、更强壮、更饥饿的姿态回归。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We’re in the title race now, but there’s a long way to go and, trust me, no one is thinking about May yet.",
            "cn": "现在我们在争冠行列，但路还很长，相信我，还没有人开始想五月的事。",
            "cnEdited": true
          },
          {
            "en": "It’s a cliché but we are taking it game by game, training session by training session.",
            "cn": "话虽老套，我们就是一场一场地踢，一练一练地练。",
            "cnEdited": true
          },
          {
            "en": "One piece at a time.",
            "cn": "一块砖一块砖地砌。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I will say this, though, if there’s anyone left who still doesn’t fully believe in this team, take it from me: there are no limits on what we can achieve.",
            "cn": "不过我要说：如果还有人没有完全相信这支球队，听我一句——我们能达到的高度没有上限。",
            "cnEdited": true
          },
          {
            "en": "No one can tell me otherwise.",
            "cn": "谁说什么我都不能同意。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m so proud to be captain of this club and I feel like I’m going to be here a long time.",
            "cn": "能担任这家俱乐部的队长，我无比自豪，而且我感觉自己会在这里待很久。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After the win over West Ham on Boxing Day, I got the chance to speak to Wenger — it was the first time he’d been back to the Emirates since 2018, and the first time I’d seen him since that steak and fries all those years ago.",
            "cn": "节礼日赢下西汉姆之后，我有机会和温格聊了聊——那是2018年以来他第一次回到酋长球场，也是自当年那顿牛排薯条之后，我第一次见他。",
            "cnEdited": true
          },
          {
            "en": "We had a good chat and he mentioned that he’d kept a close eye on my career even after I chose Madrid.",
            "cn": "我们聊得很愉快。他说即使在我选择皇马之后，他也一直关注着我的职业生涯。",
            "cnEdited": true
          },
          {
            "en": "He was honest and said that at one point he was actually worried about the way things were going for me, but now he’s so happy to see me doing well in the right environment.",
            "cn": "他很坦诚，说有一阵子他真的为我的处境担心过，但现在看到我在对的环境里过得很好，他非常高兴。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He’d recognised something.",
            "cn": "他看出了某种东西。",
            "cnEdited": true
          },
          {
            "en": "Ever since I left Norway, it’s like everything has felt sort of temporary.",
            "cn": "离开挪威之后，一切都像是临时性的。",
            "cnEdited": true
          },
          {
            "en": "I haven’t had that stability, that real deep connection, until now, and that’s so important.",
            "cn": "我始终没有那种稳定感、那种真正深层的联结，直到现在——而这太重要了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Whenever I lead the team out at the Emirates, I have this moment to myself.",
            "cn": "每当我在酋长球场率队出场，我都有一个属于自己的瞬间。",
            "cnEdited": true
          },
          {
            "en": "I want to really feel that atmosphere, that electricity from the fans.",
            "cn": "我想真正去感受那种氛围，球迷带来的那种电流。",
            "cnEdited": true
          },
          {
            "en": "I always listen as they play North London Forever over the speakers and I start singing along under my breath.",
            "cn": "当扬声器里响起 North London Forever，我总会跟着轻声哼唱。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I get goosebumps every time.",
            "cn": "每次都起鸡皮疙瘩。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I close my eyes, and I think about myself as a kid out on the artificial pitch in Drammen.",
            "cn": "我闭上眼睛，想起小时候那个在德拉门人工球场上的自己。",
            "cnEdited": true
          },
          {
            "en": "If you’d have shown that kid a snapshot of this moment and told him this was in his future?",
            "cn": "如果你把此刻的画面拿给那个孩子看，告诉他这会是他未来的一部分？",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He would have died for this.",
            "cn": "为了这个，他什么都愿意。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s been a hell of a long road, but I’m living my dream.",
            "cn": "这是一条长得要命的路，但我正活在自己的梦里。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m home.",
            "cn": "我到家了。",
            "cnEdited": true
          },
          {
            "en": "And the best is yet to come.",
            "cn": "而最好的，还在后面。",
            "cnEdited": true
          }
        ]
      }
    ]
  },
  {
    "id": "gr-pg-what-youll-wish-youd-known",
    "cat": "成长",
    "title": "What You'll Wish You'd Known",
    "titleZh": "你希望高中时就知道的事",
    "source": "Paul Graham · 2005-01-01",
    "date": "2005-01-01",
    "minutes": 22,
    "url": "https://www.paulgraham.com/hs.html",
    "cover": "linear-gradient(135deg,#fde68a 0%,#d97706 100%)",
    "gradient": "linear-gradient(135deg,#fde68a 0%,#d97706 100%)",
    "coverImg": null,
    "translationCredit": "中文译文：lzwjava / paul-graham-essays-cn（GitHub 社区译本，CC BY-SA 4.0）",
    "paras": [
      {
        "sentences": [
          {
            "en": "(I wrote this talk for a high school.",
            "cn": "（我给一个高中写了这篇文章。"
          },
          {
            "en": "I never actually gave it, because the school authorities vetoed the plan to invite me.)",
            "cn": "但我没真正去演讲过，因为学校负责人取消了邀请我）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I said I was speaking at a high school, my friends were curious.",
            "cn": "当我说我要去一个高中演讲时，我的朋友们都很好奇。"
          },
          {
            "en": "What will you say to high school students?",
            "cn": "你会跟高中生说些什么？"
          },
          {
            "en": "So I asked them, what do you wish someone had told you in high school?",
            "cn": "所以，我问他们，你会希望你在高中的时候有人能告诉你什么？"
          },
          {
            "en": "Their answers were remarkably similar.",
            "cn": "他们的答案惊人的相似。"
          },
          {
            "en": "So I'm going to tell you what we all wish someone had told us.",
            "cn": "所以我将要告诉你们，我们都希望有人能早点告诉我们的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I'll start by telling you something you don't have to know in high school: what you want to do with your life.",
            "cn": "开始的时候，先告诉你在高中并不需要知道的东西：你以后打算干什么？"
          },
          {
            "en": "People are always asking you this, so you think you're supposed to have an answer.",
            "cn": "人们总是这样问你，所以你想你要有个答案。"
          },
          {
            "en": "But adults ask this mainly as a conversation starter.",
            "cn": "但成年人大多数这样问主要是为了挑起话头。"
          },
          {
            "en": "They want to know what sort of person you are, and this question is just to get you talking.",
            "cn": "他们想知道你到底是个怎样的人，这个问题只是让你开口说话。他们问你的方式，"
          },
          {
            "en": "They ask it the way you might poke a hermit crab in a tide pool, to see what it does.",
            "cn": "就好像你用棍子戳一戳潮水里的寄生蟹（藏在贝壳里的一种螃蟹），看看它有什么反应。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If I were back in high school and someone asked about my plans, I'd say that my first priority was to learn what the options were.",
            "cn": "如果我回到高中，有人问起我的未来计划，我会说，我首要的事情就是去弄懂有哪些选择。"
          },
          {
            "en": "You don't need to be in a rush to choose your life's work.",
            "cn": "你不必急于选择一辈子的事业。"
          },
          {
            "en": "What you need to do is discover what you like.",
            "cn": "你需要做的是发现你喜爱的是什么。"
          },
          {
            "en": "You have to work on stuff you like if you want to be good at what you do.",
            "cn": "如果你希望把你的事业做好的话，你不得不去做你喜欢的事情。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It might seem that nothing would be easier than deciding what you like, but it turns out to be hard, partly because it's hard to get an accurate picture of most jobs.",
            "cn": "这看起来没有什么比发现自己喜爱的事情还更简单了，但事实上很困难，一部分原因是对大多数职业你很难有个准确的认识。"
          },
          {
            "en": "Being a doctor is not the way it's portrayed on TV.",
            "cn": "从事医生的职业，和电视里演的可不一样。幸运地是，"
          },
          {
            "en": "Fortunately you can also watch real doctors, by volunteering in hospitals. [1]",
            "cn": "通过在医院里当义工，你可以观察到真正的医生。[1]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But there are other jobs you can't learn about, because no one is doing them yet.",
            "cn": "但有一些其它的工作你是没法了解的，因为还没有人去从事呢。"
          },
          {
            "en": "Most of the work I've done in the last ten years didn't exist when I was in high school.",
            "cn": "在过去十年里我大部分所干的工作，在我高中的时候压根还没有出现。"
          },
          {
            "en": "The world changes fast, and the rate at which it changes is itself speeding up.",
            "cn": "世界变化得很快，同时变化的速率也在加快。"
          },
          {
            "en": "In such a world it's not a good idea to have fixed plans.",
            "cn": "在这样的世界里，有确定的计划并不是好主意。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And yet every May, speakers all over the country fire up the Standard Graduation Speech, the theme of which is: don't give up on your dreams.",
            "cn": "然而每年的五月份，全世界的演说家在各个高中发表毕业演讲，主题是：不要放弃你的梦想。"
          },
          {
            "en": "I know what they mean, but this is a bad way to put it, because it implies you're supposed to be bound by some plan you made early on.",
            "cn": "我知道他们想要表达什么意思，但这样表达很糟糕，因为这暗示了你应该固定在一个很早就想好了的计划。"
          },
          {
            "en": "The computer world has a name for this: premature optimization.",
            "cn": "计算机的世界对此有个专业的词：过早优化。"
          },
          {
            "en": "And it is synonymous with disaster.",
            "cn": "它几乎是灾难的同义词。"
          },
          {
            "en": "These speakers would do better to say simply, don't give up.",
            "cn": "这些演说家还不如简简单单地说“不要放弃”来得更好呢。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What they really mean is, don't get demoralized.",
            "cn": "他们真正的意思是：不要消沉意志。"
          },
          {
            "en": "Don't think that you can't do what other people can.",
            "cn": "不要认为你不能做到别人能做到的事情。"
          },
          {
            "en": "And I agree you shouldn't underestimate your potential.",
            "cn": "我同意你不应该低估你的潜能。"
          },
          {
            "en": "People who've done great things tend to seem as if they were a race apart.",
            "cn": "做出伟大事业的人看起来像是另一种人类。"
          },
          {
            "en": "And most biographies only exaggerate this illusion, partly due to the worshipful attitude biographers inevitably sink into, and partly because, knowing how the story ends, they can't help streamlining the plot till it seems like the subject's life was a matter of destiny, the mere unfolding of some innate genius.",
            "cn": "大多数传记也夸大了这种错觉，一部分是因为传记作者不可避免地陷入对主人公的崇拜，另外一部分原因是，知道故事的结局，并不能串起所有的情节，除非主人公的人生看起来像某种命运，是某些内在的天才禀赋的简单展开而已。"
          },
          {
            "en": "In fact I suspect if you had the sixteen year old Shakespeare or Einstein in school with you, they'd seem impressive, but not totally unlike your other friends.",
            "cn": "事实上，如果16岁的莎士比亚或爱因斯坦和你一个学校，我怀疑他们看起来可能令人印象深刻，但并不完全和你的其他朋友不一样。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Which is an uncomfortable thought.",
            "cn": "这多么令人不安。"
          },
          {
            "en": "If they were just like us, then they had to work very hard to do what they did.",
            "cn": "如果他们和你我一样，那他们不得不付出极大的努力去取得他们的成就。"
          },
          {
            "en": "And that's one reason we like to believe in genius.",
            "cn": "而这就是我们相信天才的原因：我们可以为懒惰找借口。"
          },
          {
            "en": "It gives us an excuse for being lazy.",
            "cn": "如果这些人能取得他们的成就，"
          },
          {
            "en": "If these guys were able to do what they did only because of some magic Shakespeareness or Einsteinness, then it's not our fault if we can't do something as good.",
            "cn": "仅仅是因为某些神奇的莎士比亚气息或者爱因斯坦气息，所以我们不能取得同样伟大的成就并不是我们的错。"
          },
          {
            "en": "I'm not saying there's no such thing as genius.",
            "cn": "我不是在说世上完全没有天才这种东西。"
          },
          {
            "en": "But if you're trying to choose between two theories and one gives you an excuse for being lazy, the other one is probably right.",
            "cn": "但如果你必须从两个理论中做出选择，一个理论给你懒惰的理由，那么另外一个理论更可能是正确的选择。"
          },
          {
            "en": "So far we've cut the Standard Graduation Speech down from \"don't give up on your dreams\" to \"what someone else can do, you can do.\" But it needs to be cut still further.",
            "cn": "目前为止，我们可以把毕业演讲从“不要放弃你的梦想”分解成“其他人可以做到的，你也行”。但仍然可以继续分解。"
          },
          {
            "en": "There is some variation in natural ability.",
            "cn": "天生的能力多多少少有差异。"
          },
          {
            "en": "Most people overestimate its role, but it does exist.",
            "cn": "虽然很多人都高估了它，但确实存在。"
          },
          {
            "en": "If I were talking to a guy four feet tall whose ambition was to play in the NBA, I'd feel pretty stupid saying, you can do anything if you really try. [2]",
            "cn": "如果一个1米6的人的梦想是去 NBA 打球，我对他说，“只要你努力你就能做到”，我会感觉特别傻。[2]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We need to cut the Standard Graduation Speech down to, \"what someone else with your abilities can do, you can do; and don't underestimate your abilities.\" But as so often happens, the closer you get to the truth, the messier your sentence gets.",
            "cn": "我们需要把毕业演讲分解成，“有着和你能力相同的人可以做到的，你也可以做到；同时不要低估你的能力。”这就像经常发生的一样，你越接近真理，你的句子变得越长。"
          },
          {
            "en": "We've taken a nice, neat (but wrong) slogan, and churned it up like a mud puddle.",
            "cn": "我们把一个优美简洁(但错误)的口号，搅拌成了一堆烂泥。"
          },
          {
            "en": "It doesn't make a very good speech anymore.",
            "cn": "但没有把这个演讲变得更好。"
          },
          {
            "en": "But worse still, it doesn't tell you what to do anymore.",
            "cn": "糟糕的是，依然没有告诉你该做什么。和你有同等能力的人？"
          },
          {
            "en": "Someone with your abilities?",
            "cn": "你的能力是什么？"
          },
          {
            "en": "What are your abilities?",
            "cn": "保持上风"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think the solution is to work in the other direction.",
            "cn": "我想，解决的方案是反方向去行动。"
          },
          {
            "en": "Instead of working back from a goal, work forward from promising situations.",
            "cn": "与其从一个目标倒退着去行动，不如一直往有前途的方向前进。"
          },
          {
            "en": "This is what most successful people actually do anyway.",
            "cn": "这其实也是大多数成功者的做法。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the graduation-speech approach, you decide where you want to be in twenty years, and then ask: what should I do now to get there?",
            "cn": "临近毕业演讲时，你决定了未来的20年你将要去哪里，然后问：我怎样做才能到达那里？"
          },
          {
            "en": "I propose instead that you don't commit to anything in the future, but just look at the options available now, and choose those that will give you the most promising range of options afterward.",
            "cn": "我建议你不要对未来做出任何承诺，而是看看目前有哪些选项，然后挑那些能让你前途最广阔的选项。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's not so important what you work on, so long as you're not wasting your time.",
            "cn": "你现在做什么并不重要，只要你没有在浪费时间。"
          },
          {
            "en": "Work on things that interest you and increase your options, and worry later about which you'll take.",
            "cn": "做那些最吸引你的事情，增加选项，之后再忧虑到底要选哪个。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Suppose you're a college freshman deciding whether to major in math or economics.",
            "cn": "假如你是大一新生，正在犹豫该修数学还是经济。"
          },
          {
            "en": "Well, math will give you more options: you can go into almost any field from math.",
            "cn": "那么，数学或者能给你更多的选择：修了数学后，你几乎可以进入任何领域。"
          },
          {
            "en": "If you major in math it will be easy to get into grad school in economics, but if you major in economics it will be hard to get into grad school in math.",
            "cn": "如果你主修数学，你很容易去读经济方面的研究生。但如果你修的是经济，会很难考取数学方面的研究生。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Flying a glider is a good metaphor here.",
            "cn": "滑翔机在这里是个好比喻。"
          },
          {
            "en": "Because a glider doesn't have an engine, you can't fly into the wind without losing a lot of altitude.",
            "cn": "滑翔机没有发动机，所以你要降低很多高度才能在空中滑翔。"
          },
          {
            "en": "If you let yourself get far downwind of good places to land, your options narrow uncomfortably.",
            "cn": "如果你离理想的着落地点太远的下风位置，你的选择余地就比较狭窄了。"
          },
          {
            "en": "As a rule you want to stay upwind.",
            "cn": "所以作为原则，你要始终处于上风位。"
          },
          {
            "en": "So I propose that as a replacement for \"don't give up on your dreams.\" Stay upwind.",
            "cn": "所以我建议，替代“不要放弃你的梦想”的是“保持上风”。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "How do you do that, though?",
            "cn": "那你怎么做呢？"
          },
          {
            "en": "Even if math is upwind of economics, how are you supposed to know that as a high school student?",
            "cn": "即使数学要比经济学占上风一点，你作为一个高中生又怎么能知道呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Well, you don't, and that's what you need to find out.",
            "cn": "嗯，你确实不知道，这就是你要自己搞明白的。"
          },
          {
            "en": "Look for smart people and hard problems.",
            "cn": "去寻找聪明人和困难的问题。"
          },
          {
            "en": "Smart people tend to clump together, and if you can find such a clump, it's probably worthwhile to join it.",
            "cn": "聪明人倾向于扎堆，如果你能找到发现这样一个群体，那加入他们是值得的。"
          },
          {
            "en": "But it's not straightforward to find these, because there is a lot of faking going on.",
            "cn": "但并不容易真的找到，因为这里有一些虚假的类似群体。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To a newly arrived undergraduate, all university departments look much the same.",
            "cn": "对一个新来的大学生来说，所有的大学院系都看起来差不多。"
          },
          {
            "en": "The professors all seem forbiddingly intellectual and publish papers unintelligible to outsiders.",
            "cn": "教授们看起来很有才智，发表了很多对外行来说无法理解的论文。"
          },
          {
            "en": "But while in some fields the papers are unintelligible because they're full of hard ideas, in others they're deliberately written in an obscure way to seem as if they're saying something important.",
            "cn": "但当有些论文看起来难懂是因为它们遍布着复杂的想法时，另外一些论文故意写得很费解，让它们看起来像是在讲着很重要的东西。"
          },
          {
            "en": "This may seem a scandalous proposition, but it has been experimentally verified, in the famous Social Text affair.",
            "cn": "这看起来是诽谤的主张，但实验性地被证明了，在著名的 Social Text 事件中。"
          },
          {
            "en": "Suspecting that the papers published by literary theorists were often just intellectual-sounding nonsense, a physicist deliberately wrote a paper full of intellectual-sounding nonsense, and submitted it to a literary theory journal, which published it.",
            "cn": "因为怀疑文学理论杂志社出版的论文都是一些看起来很高深的但毫无意义的东西，一个物理学家故意写了一篇看起来很高深但毫无意义的论文，发给了一个文学理论杂志社，杂志社发表了它。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The best protection is always to be working on hard problems.",
            "cn": "最好的自我保护方法总是去钻研困难的问题。"
          },
          {
            "en": "Writing novels is hard.",
            "cn": "写小说是困难的。"
          },
          {
            "en": "Reading novels isn't.",
            "cn": "读小说不是。"
          },
          {
            "en": "Hard means worry: if you're not worrying that something you're making will come out badly, or that you won't be able to understand something you're studying, then it isn't hard enough.",
            "cn": "困难意味着焦虑：如果你并没有担心你做出来的东西会很糟糕，或者没有在担心理解不了正在学习的东西，那就不够难。"
          },
          {
            "en": "There has to be suspense.",
            "cn": "焦虑是一定要有的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Well, this seems a grim view of the world, you may think.",
            "cn": "所以，你或许想，这真是一个无情的世界。"
          },
          {
            "en": "What I'm telling you is that you should worry?",
            "cn": "我正在告诉你的是你应该焦虑吗？"
          },
          {
            "en": "Yes, but it's not as bad as it sounds.",
            "cn": "是的，但并不像听起来那么糟糕。"
          },
          {
            "en": "It's exhilarating to overcome worries.",
            "cn": "战胜焦虑是令人兴奋的。"
          },
          {
            "en": "You don't see faces much happier than people winning gold medals.",
            "cn": "你不可能看见比获得奥运金牌的人更开心的笑脸了。"
          },
          {
            "en": "And you know why they're so happy?",
            "cn": "你知道他们为什么如此开心吗？"
          },
          {
            "en": "Relief.",
            "cn": "压力的释放。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I'm not saying this is the only way to be happy.",
            "cn": "我并不是在说这是唯一的开心方式。"
          },
          {
            "en": "Just that some kinds of worry are not as bad as they sound.",
            "cn": "只不过在说有些焦虑并不像听起来那么糟糕。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In practice, \"stay upwind\" reduces to \"work on hard problems.\" And you can start today.",
            "cn": "野心实际中，“保持上风”可以分解为“钻研困难的问题”。"
          },
          {
            "en": "I wish I'd grasped that in high school.",
            "cn": "你今天就可以开始。"
          },
          {
            "en": "Most people like to be good at what they do.",
            "cn": "我真希望我高中的时候就知道这个。"
          },
          {
            "en": "In the so-called real world this need is a powerful force.",
            "cn": "大多数人都希望擅长自己的工作。"
          },
          {
            "en": "But high school students rarely benefit from it, because they're given a fake thing to do.",
            "cn": "在所谓的真实世界，这个欲望是强大的动力。"
          },
          {
            "en": "When I was in high school, I let myself believe that my job was to be a high school student.",
            "cn": "但高中生没有从中受益，因为他们被要求去做无意义的东西。当我在高中的时候，"
          },
          {
            "en": "And so I let my need to be good at what I did be satisfied by merely doing well in school.",
            "cn": "我让自己相信我的工作是当个好高中生。所以，我的欲望就止步于把学校的功课学好。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you'd asked me in high school what the difference was between high school kids and adults, I'd have said it was that adults had to earn a living.",
            "cn": "如果你问高中时候的我，高中年纪的孩子和成人的区别是什么，我会说，成人需要谋生。"
          },
          {
            "en": "Wrong.",
            "cn": "错。"
          },
          {
            "en": "It's that adults take responsibility for themselves.",
            "cn": "而是成人必须要为自己负责。"
          },
          {
            "en": "Making a living is only a small part of it.",
            "cn": "谋生只是一小部分。"
          },
          {
            "en": "Far more important is to take intellectual responsibility for oneself.",
            "cn": "远为重要的是，为自己的智力负责。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If I had to go through high school again, I'd treat it like a day job.",
            "cn": "如果我重新回到高中时光，我会把它当做是白天的日常工作。"
          },
          {
            "en": "I don't mean that I'd slack in school.",
            "cn": "我并不是说我会在学校混日子。"
          },
          {
            "en": "Working at something as a day job doesn't mean doing it badly.",
            "cn": "当做日常工作并不是说随便应付。"
          },
          {
            "en": "It means not being defined by it.",
            "cn": "而是说不要被它局限了。"
          },
          {
            "en": "I mean I wouldn't think of myself as a high school student, just as a musician with a day job as a waiter doesn't think of himself as a waiter.",
            "cn": "我意思是我不会认为自己仅仅是个高中生，像一个白天有份服务员工作的音乐家并不会把他自己当做服务员。"
          },
          {
            "en": "[3] And when I wasn't working at my day job I'd start trying to do real work.",
            "cn": "[3]然后当我完成日常工作后，我开始我真正的工作了。"
          },
          {
            "en": "When I ask people what they regret most about high school, they nearly all say the same thing: that they wasted so much time.",
            "cn": "当我问起人们对高中时期最后悔的事情的时候，他们所有人都在说着同样的事情：他们浪费了太多的时间。"
          },
          {
            "en": "If you're wondering what you're doing now that you'll regret most later, that's probably it. [4]",
            "cn": "如果你想知道你现在做的什么事情会是你以后最后悔的，那很可能是这个。[4]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Some people say this is inevitable — that high school students aren't capable of getting anything done yet.",
            "cn": "有些人说这是不可避免的——高中生还没有能力做成什么事情呢。"
          },
          {
            "en": "But I don't think this is true.",
            "cn": "但我认为不对。"
          },
          {
            "en": "And the proof is that you're bored.",
            "cn": "证据是你开始感到无聊。"
          },
          {
            "en": "You probably weren't bored when you were eight.",
            "cn": "你很可能八岁的时候从不感觉无聊。"
          },
          {
            "en": "When you're eight it's called \"playing\" instead of \"hanging out,\" but it's the same thing.",
            "cn": "当你八岁的时候，叫“玩耍”而不是“打发时间”，但事实上是同一个东西。"
          },
          {
            "en": "And when I was eight, I was rarely bored.",
            "cn": "当我八岁的时候，我几乎从不无聊。"
          },
          {
            "en": "Give me a back yard and a few other kids and I could play all day.",
            "cn": "给我一片后花园和几个小伙伴，我能玩上一整天。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The reason this got stale in middle school and high school, I now realize, is that I was ready for something else.",
            "cn": "我现在意识到了，在中学或高中感觉到无聊的原因是，我已经准备好干点其它事情了。"
          },
          {
            "en": "Childhood was getting old.",
            "cn": "童年已经老了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I'm not saying you shouldn't hang out with your friends — that you should all become humorless little robots who do nothing but work.",
            "cn": "我可不是说你不应该和你朋友出去玩打发时间——像机器般的不懂得开玩笑的整天工作着。"
          },
          {
            "en": "Hanging out with friends is like chocolate cake.",
            "cn": "出去和朋友浪就像巧克力蛋糕。"
          },
          {
            "en": "You enjoy it more if you eat it occasionally than if you eat nothing but chocolate cake for every meal.",
            "cn": "比起你每一顿都吃巧克力蛋糕来说，你偶尔吃一吃可能更享受。"
          },
          {
            "en": "No matter how much you like chocolate cake, you'll be pretty queasy after the third meal of it.",
            "cn": "不管你多么喜欢巧克力蛋糕，吃到第三顿的时候，你会感觉相当反胃。"
          },
          {
            "en": "And that's what the malaise one feels in high school is: mental queasiness. [5]",
            "cn": "这就是一个高中生能在学校里感觉到的那种无聊乏味：精神上的反胃。[5]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You may be thinking, we have to do more than get good grades.",
            "cn": "你或许在想，除了好成绩，我们还要做其它事情。"
          },
          {
            "en": "We have to have extracurricular activities.",
            "cn": "我们有课外活动。"
          },
          {
            "en": "But you know perfectly well how bogus most of these are.",
            "cn": "但你很清楚大多数这些课外活动多没意义。"
          },
          {
            "en": "Collecting donations for a charity is an admirable thing to do, but it's not hard.",
            "cn": "组织给慈善机构的捐钱活动很令人赞赏，但并不难。"
          },
          {
            "en": "It's not getting something done.",
            "cn": "这并没有做成真正的事情。"
          },
          {
            "en": "What I mean by getting something done is learning how to write well, or how to program computers, or what life was really like in preindustrial societies, or how to draw the human face from life.",
            "cn": "我说的做成真正的事情是说，学习如何把文章写好，或者如何编程，或者去了解工业时代之前的生活是怎样的，或者如何描绘生活中的人脸。"
          },
          {
            "en": "This sort of thing rarely translates into a line item on a college application.",
            "cn": "这样的事情很少能写进大学申请里。腐败"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's dangerous to design your life around getting into college, because the people you have to impress to get into college are not a very discerning audience.",
            "cn": "围绕着进入大学的目标，来规划你的人生很危险，因为你要去打动的人并不是很有洞察力的听众。"
          },
          {
            "en": "At most colleges, it's not the professors who decide whether you get in, but admissions officers, and they are nowhere near as smart.",
            "cn": "在大多数大学，并不是教授来决定是否录取你，而是录取办公室的老师，"
          },
          {
            "en": "They're the NCOs of the intellectual world.",
            "cn": "这些人可和聪明毫不相干。"
          },
          {
            "en": "They can't tell how smart you are.",
            "cn": "他们是智力世界里较低等的人群。"
          },
          {
            "en": "The mere existence of prep schools is proof of that.",
            "cn": "他们并不能判断你有多聪明。预科学校就是证据。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Few parents would pay so much for their kids to go to a school that didn't improve their admissions prospects.",
            "cn": "如果没有增加孩子的入学希望的话，很少的家长会为孩子付那么多钱去上预科学校。"
          },
          {
            "en": "Prep schools openly say this is one of their aims.",
            "cn": "预科学校公开地宣称，这就是他们的目标之一。"
          },
          {
            "en": "But what that means, if you stop to think about it, is that they can hack the admissions process: that they can take the very same kid and make him seem a more appealing candidate than he would if he went to the local public school. [6]",
            "cn": "但如果你停下来想的话，这意味着他们有办法对大学录取耍手段：他们能把同样的孩子，让他变成更有吸引力的候选人，比起他去上当地的公立高中来说。[6]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Right now most of you feel your job in life is to be a promising college applicant.",
            "cn": "现在你们中大多数都会觉得生活中主要的职责，就是让自己成为更有前途的大学候选人。"
          },
          {
            "en": "But that means you're designing your life to satisfy a process so mindless that there's a whole industry devoted to subverting it.",
            "cn": "但这意味着你正在让你的生活去取悦这样一个欠考虑的制度——有整套的产业链来愚弄它。"
          },
          {
            "en": "No wonder you become cynical.",
            "cn": "难怪你成了愤世嫉俗的人。"
          },
          {
            "en": "The malaise you feel is the same that a producer of reality TV shows or a tobacco industry executive feels.",
            "cn": "你感觉到的无聊乏味正是电视广告编剧或者烟草产业的经理感觉到的那样。"
          },
          {
            "en": "And you don't even get paid a lot.",
            "cn": "而且，你并没有薪水。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So what do you do?",
            "cn": "所以那该怎么做呢？"
          },
          {
            "en": "What you should not do is rebel.",
            "cn": "不应该做的是叛逆。"
          },
          {
            "en": "That's what I did, and it was a mistake.",
            "cn": "这是当时我做的，但我觉得这错了。"
          },
          {
            "en": "I didn't realize exactly what was happening to us, but I smelled a major rat.",
            "cn": "我当时并没有意识到正在发生什么，我只是感觉有东西不对劲。"
          },
          {
            "en": "And so I just gave up.",
            "cn": "所以我干脆放弃了。显然地，"
          },
          {
            "en": "Obviously the world sucked, so why bother?",
            "cn": "世界糟透了，为什么要去理睬它？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I discovered that one of our teachers was herself using Cliff's Notes, it seemed par for the course.",
            "cn": "我发现我们的一个老师，他自己也在用小说精析(译者注：读这个就能应付考试，可以跳过教纲指定的原著)。"
          },
          {
            "en": "Surely it meant nothing to get a good grade in such a class.",
            "cn": "这意味着在这样的课程里取得好成绩毫无意义。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In retrospect this was stupid.",
            "cn": "回想起来，这很愚蠢。"
          },
          {
            "en": "It was like someone getting fouled in a soccer game and saying, hey, you fouled me, that's against the rules, and walking off the field in indignation.",
            "cn": "这好像某人在足球场上被坑了一把然后说，嘿，你坑了我，这是犯规的，然后愤怒地离开球场。"
          },
          {
            "en": "Fouls happen.",
            "cn": "犯规经常发生。"
          },
          {
            "en": "The thing to do when you get fouled is not to lose your cool.",
            "cn": "当你被犯规的时候，不要失去你的风度。"
          },
          {
            "en": "Just keep playing.",
            "cn": "继续比赛。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "By putting you in this situation, society has fouled you.",
            "cn": "放在这里，社会对你“犯规”了。"
          },
          {
            "en": "Yes, as you suspect, a lot of the stuff you learn in your classes is crap.",
            "cn": "是的，就像你怀疑的那样，大部分你在课堂上学到的都是胡扯。"
          },
          {
            "en": "And yes, as you suspect, the college admissions process is largely a charade.",
            "cn": "而且，就像你怀疑的那样，大学的录取也是一场戏。"
          },
          {
            "en": "But like many fouls, this one was unintentional.",
            "cn": "但就像其它犯规一样，这个也是无意的。"
          },
          {
            "en": "[7] So just keep playing.",
            "cn": "[7]所以要继续比赛。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Rebellion is almost as stupid as obedience.",
            "cn": "叛逆就像服从一样愚蠢。"
          },
          {
            "en": "In either case you let yourself be defined by what they tell you to do.",
            "cn": "两种情况，要么你去做他们要你去做的，要么偏偏不去做，你都被局限了。"
          },
          {
            "en": "The best plan, I think, is to step onto an orthogonal vector.",
            "cn": "我想最好的方法是，踏入一个正交向量。"
          },
          {
            "en": "Don't just do what they tell you, and don't just refuse to.",
            "cn": "不要仅仅去做他们告诉你的，也不要单纯地拒绝。"
          },
          {
            "en": "Instead treat school as a day job.",
            "cn": "相反，把学校当做日常工作。"
          },
          {
            "en": "As day jobs go, it's pretty sweet.",
            "cn": "当干完白天的日常工作后，会是多么美好。"
          },
          {
            "en": "You're done at 3 o'clock, and you can even work on your own stuff while you're there.",
            "cn": "下午三点钟就没课了，你可以继续呆在那里干你真正的工作。好奇心"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And what's your real job supposed to be?",
            "cn": "那你真正的工作应该是怎样的呢？"
          },
          {
            "en": "Unless you're Mozart, your first task is to figure that out.",
            "cn": "除非你是莫扎特这样的天才，否则首要的就是去弄明白。"
          },
          {
            "en": "What are the great things to work on?",
            "cn": "有什么值得做的伟大事业呢？"
          },
          {
            "en": "Where are the imaginative people?",
            "cn": "想象力丰富的人在哪里？"
          },
          {
            "en": "And most importantly, what are you interested in?",
            "cn": "更重要地是，你的兴趣何在？"
          },
          {
            "en": "The word \"aptitude\" is misleading, because it implies something innate.",
            "cn": "“天资”这个词有点误导人，它暗示了某种天生的能力。"
          },
          {
            "en": "The most powerful sort of aptitude is a consuming interest in some question, and such interests are often acquired tastes.",
            "cn": "最强大的天资就是对某些问题有着持续的兴趣，这样的兴趣往往是可以后天习得的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A distorted version of this idea has filtered into popular culture under the name \"passion.\" I recently saw an ad for waiters saying they wanted people with a \"passion for service.\" The real thing is not something one could have for waiting on tables.",
            "cn": "这个观点变形的一种版本，名字叫“激情”，渗透到了流行文化中。我最近看到招聘服务员的一则广告，他们想要那些“对服务充满激情”的人。实际上，这里不是一个人可以在餐桌边服务的时候拥有的态度。"
          },
          {
            "en": "And passion is a bad word for it.",
            "cn": "激情这个词放在这里并不好。"
          },
          {
            "en": "A better name would be curiosity.",
            "cn": "更好的名字是好奇。"
          },
          {
            "en": "Kids are curious, but the curiosity I mean has a different shape from kid curiosity.",
            "cn": "孩子们是好奇的，但我说的好奇心和孩子们的好奇心有一些外在的差异。"
          },
          {
            "en": "Kid curiosity is broad and shallow; they ask why at random about everything.",
            "cn": "孩子的好奇心虽宽却浅，他们对万事万物都随机性地问为什么。"
          },
          {
            "en": "In most adults this curiosity dries up entirely.",
            "cn": "对大部分成年人，这样的好奇心都枯竭了。"
          },
          {
            "en": "It has to: you can't get anything done if you're always asking why about everything.",
            "cn": "不得不这样：如果你一直对各种东西在问为什么，你无法完成任何事情。"
          },
          {
            "en": "But in ambitious adults, instead of drying up, curiosity becomes narrow and deep.",
            "cn": "但对于有野心的成年人来说，好奇心没有枯竭，而是变得收缩和深入。"
          },
          {
            "en": "The mud flat morphs into a well.",
            "cn": "泥塘变成了深井。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Curiosity turns work into play.",
            "cn": "好奇心把工作变成了游戏。"
          },
          {
            "en": "For Einstein, relativity wasn't a book full of hard stuff he had to learn for an exam.",
            "cn": "对于爱因斯坦来说，相对论并不是一本复杂难懂的书，必须去学会好能应付考试。"
          },
          {
            "en": "It was a mystery he was trying to solve.",
            "cn": "而是他尝试去破解的谜题。"
          },
          {
            "en": "So it probably felt like less work to him to invent it than it would seem to someone now to learn it in a class.",
            "cn": "所以对他而言，去发明它，比起要在教室里学会这套理论的学生来说，更像游戏一些。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One of the most dangerous illusions you get from school is the idea that doing great things requires a lot of discipline.",
            "cn": "另外一个你在学校里学到的危险错觉是，做出杰出的工作需要大量的自制力。"
          },
          {
            "en": "Most subjects are taught in such a boring way that it's only by discipline that you can flog yourself through them.",
            "cn": "大多数课程都是以很无聊的方式来教学，所以你不得不通过自制力来鞭策自己去通过。"
          },
          {
            "en": "So I was surprised when, early in college, I read a quote by Wittgenstein saying that he had no self-discipline and had never been able to deny himself anything, not even a cup of coffee.",
            "cn": "所以当我刚进大学的时候，读到 Wittgenstein 说的一句话：他几乎毫无自制力，从来无法克制任何东西，哪怕尽管是一杯咖啡，我大为惊奇。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Now I know a number of people who do great work, and it's the same with all of them.",
            "cn": "现在我认识了很多做出杰出工作的人了，这对他们来说同样适用。"
          },
          {
            "en": "They have little discipline.",
            "cn": "他们没有多少自制力。"
          },
          {
            "en": "They're all terrible procrastinators and find it almost impossible to make themselves do anything they're not interested in.",
            "cn": "他们全都是超级可怕的拖延症患者，发现几乎没有办法让他们去做任何不感兴趣的事情。"
          },
          {
            "en": "One still hasn't sent out his half of the thank-you notes from his wedding, four years ago.",
            "cn": "有一位还没发出他四年前举办的婚礼的答谢卡，"
          },
          {
            "en": "Another has 26,000 emails in her inbox.",
            "cn": "另一位邮箱里有 26000 封邮件。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I'm not saying you can get away with zero self-discipline.",
            "cn": "我没有在说你可以一点自制力都没有。"
          },
          {
            "en": "You probably need about the amount you need to go running.",
            "cn": "你需要的量能支撑你去跑步就行了。"
          },
          {
            "en": "I'm often reluctant to go running, but once I do, I enjoy it.",
            "cn": "我通常很不愿意去跑步，但我一旦去跑了，我会乐在其中。"
          },
          {
            "en": "And if I don't run for several days, I feel ill.",
            "cn": "如果我几天没跑，我会觉得自己病怏怏的。"
          },
          {
            "en": "It's the same with people who do great things.",
            "cn": "这对做出杰出工作的人同样使用。"
          },
          {
            "en": "They know they'll feel bad if they don't work, and they have enough discipline to get themselves to their desks to start working.",
            "cn": "如果不工作的话，他们知道自己会感觉很糟糕，同时他们有着足够的自制力让自己走到桌子前开始干活。"
          },
          {
            "en": "But once they get started, interest takes over, and discipline is no longer necessary.",
            "cn": "但一旦他们开始干活，兴趣开始支配他们，不再需要自律。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Do you think Shakespeare was gritting his teeth and diligently trying to write Great Literature?",
            "cn": "你是否认为莎士比亚一边咬牙切齿，一边勤奋地写着 Great Literature 吗？"
          },
          {
            "en": "Of course not.",
            "cn": "当然不。"
          },
          {
            "en": "He was having fun.",
            "cn": "他在找乐子。"
          },
          {
            "en": "That's why he's so good.",
            "cn": "这就是为什么他如此杰出。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you want to do good work, what you need is a great curiosity about a promising question.",
            "cn": "如果你想做出杰出的工作，所有你需要的是对一个很有前景的问题有着巨大的好奇心。"
          },
          {
            "en": "The critical moment for Einstein was when he looked at Maxwell's equations and said, what the hell is going on here?",
            "cn": "对爱因斯坦来说，最关键的时刻是当他看着麦克斯韦的平衡方程式，心里嘀咕着，这究竟是怎么回事？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It can take years to zero in on a productive question, because it can take years to figure out what a subject is really about.",
            "cn": "需要很多年的时间全神贯注于一个有前景的问题，因为需要很多年来搞清楚一个课题究竟是探讨什么的。"
          },
          {
            "en": "To take an extreme example, consider math.",
            "cn": "举个极端的例子，想想数学。"
          },
          {
            "en": "Most people think they hate math, but the boring stuff you do in school under the name \"mathematics\" is not at all like what mathematicians do.",
            "cn": "大多数人都认为他们讨厌数学，但你在学校里学的那个冠以“数学”之名的玩意儿和数学家研究的东西完全不同。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The great mathematician G. H. Hardy said he didn't like math in high school either.",
            "cn": "伟大的数学家 G.H. Hardy 说他在中学时代也不喜欢数学。"
          },
          {
            "en": "He only took it up because he was better at it than the other students.",
            "cn": "他去学仅仅是因为他比其他同学要更擅长些。"
          },
          {
            "en": "Only later did he realize math was interesting — only later did he start to ask questions instead of merely answering them correctly.",
            "cn": "直到后来他才意识到数学是有趣的——后来他才开始问问题，而不是仅仅去正确地回答它们。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When a friend of mine used to grumble because he had to write a paper for school, his mother would tell him: find a way to make it interesting.",
            "cn": "当我的一个朋友过去因为他要写作业而嘀咕抱怨时，他妈妈告诉他：去找一个方法让写作业变得有趣。"
          },
          {
            "en": "That's what you need to do: find a question that makes the world interesting.",
            "cn": "这也是你需要去做的：去找到一个问题，让世界变得有趣。"
          },
          {
            "en": "People who do great things look at the same world everyone else does, but notice some odd detail that's compellingly mysterious.",
            "cn": "做出杰出工作的人和其他人看到的是同样的世界，但注意到了一些古怪的细节，那些细节有着难以抗拒的魔力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And not only in intellectual matters.",
            "cn": "然而不单单是知识上。"
          },
          {
            "en": "Henry Ford's great question was, why do cars have to be a luxury item?",
            "cn": "亨利·福特的伟大问题是，为什么汽车一定要是奢侈品呢？"
          },
          {
            "en": "What would happen if you treated them as a commodity?",
            "cn": "如果你把它们做成普通商品会怎么样？"
          },
          {
            "en": "Franz Beckenbauer's was, in effect, why does everyone have to stay in his position?",
            "cn": "贝肯鲍尔（足球皇帝）的问题是，为什么每个人都得留在自己的位置上呢？"
          },
          {
            "en": "Why can't defenders score goals too?",
            "cn": "为什么后卫不能也去射门呢？当下"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If it takes years to articulate great questions, what do you do now, at sixteen?",
            "cn": "如果需要很多年来精确表达伟大的问题，那 16 岁的你应该怎么做呢？"
          },
          {
            "en": "Work toward finding one.",
            "cn": "努力去寻找一个。"
          },
          {
            "en": "Great questions don't appear suddenly.",
            "cn": "伟大的问题不会突然出现。"
          },
          {
            "en": "They gradually congeal in your head.",
            "cn": "它们渐渐地凝结在你的脑中。"
          },
          {
            "en": "And what makes them congeal is experience.",
            "cn": "让它们凝结的是经历。"
          },
          {
            "en": "So the way to find great questions is not to search for them — not to wander about thinking, what great discovery shall I make?",
            "cn": "所以去寻找伟大的问题的方法不是去故意寻觅他们——不是去想，我有没什么伟大的发现呢？"
          },
          {
            "en": "You can't answer that; if you could, you'd have made it.",
            "cn": "你不能回答；如果你能回答，你早就发现了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The way to get a big idea to appear in your head is not to hunt for big ideas, but to put in a lot of time on work that interests you, and in the process keep your mind open enough that a big idea can take roost.",
            "cn": "让伟大的点子出现在你脑海里的方法不是去寻觅，而是投入大量的时间去做你感兴趣的事情，过程中保持开放的大脑以至于伟大的点子能生根发芽。爱因斯坦，"
          },
          {
            "en": "Einstein, Ford, and Beckenbauer all used this recipe.",
            "cn": "福特和贝肯鲍尔都是用的这个方法。"
          },
          {
            "en": "They all knew their work like a piano player knows the keys.",
            "cn": "他们很清楚他们的工作，就像钢琴家一样很清楚琴键。"
          },
          {
            "en": "So when something seemed amiss to them, they had the confidence to notice it.",
            "cn": "如果看起来有什么差错的时候，他们有信心去把握住。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Put in time how and on what?",
            "cn": "那投入大量时间去做什么以及怎么做呢？"
          },
          {
            "en": "Just pick a project that seems interesting: to master some chunk of material, or to make something, or to answer some question.",
            "cn": "挑个自己感兴趣的项目就行了：精通一些知识，或者创造点东西，或者去解决某些问题。"
          },
          {
            "en": "Choose a project that will take less than a month, and make it something you have the means to finish.",
            "cn": "挑选一个项目不需要一个月的时间，然后创造点你能完成的东西。"
          },
          {
            "en": "Do something hard enough to stretch you, but only just, especially at first.",
            "cn": "做那些难到突破你极限的事情，至少初期要这样。"
          },
          {
            "en": "If you're deciding between two projects, choose whichever seems most fun.",
            "cn": "如果你正在两个项目中抉择，去挑最有趣的那个。"
          },
          {
            "en": "If one blows up in your face, start another.",
            "cn": "如果一个项目搞砸了，开始另外一个。"
          },
          {
            "en": "Repeat till, like an internal combustion engine, the process becomes self-sustaining, and each project generates the next one.",
            "cn": "持续如此，像内燃机一样，这过程是自我持续的，每个项目都孕育着下一个项目。"
          },
          {
            "en": "(This could take years.)",
            "cn": "（这需要好几年时间）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It may be just as well not to do a project \"for school,\" if that will restrict you or make it seem like work.",
            "cn": "或许最好不要去做学校的项目，如果那会限制你，或者让你感觉像在应付老师一样。如果你想，"
          },
          {
            "en": "Involve your friends if you want, but not too many, and only if they're not flakes.",
            "cn": "可以拉上你的朋友们，但不要太多，而且仅当他们不是一时热血而已。"
          },
          {
            "en": "Friends offer moral support (few startups are started by one person), but secrecy also has its advantages.",
            "cn": "朋友们更多的是精神支持（很少的创业公司是一个人创立的），"
          },
          {
            "en": "There's something pleasing about a secret project.",
            "cn": "但秘密进行同样有它的好处。"
          },
          {
            "en": "And you can take more risks, because no one will know if you fail.",
            "cn": "秘密进行一个项目某些方面是很爽的。如果你失败了，没有人会知道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Don't worry if a project doesn't seem to be on the path to some goal you're supposed to have.",
            "cn": "不要担心一个项目看起来没有在通向你最终的目标的道路上。"
          },
          {
            "en": "Paths can bend a lot more than you think.",
            "cn": "这道路可能远比你想象的更曲折。"
          },
          {
            "en": "So let the path grow out the project.",
            "cn": "所以，让道路从项目中生长出来。"
          },
          {
            "en": "The most important thing is to be excited about it, because it's by doing that you learn.",
            "cn": "最重要的是一路上，你在不断学习。"
          },
          {
            "en": "Don't disregard unseemly motivations.",
            "cn": "不要忽视看起来不好的动机。"
          },
          {
            "en": "One of the most powerful is the desire to be better than other people at something.",
            "cn": "其中强大的一个动机是想要在某些方面胜过别人的愿望。"
          },
          {
            "en": "Hardy said that's what got him started, and I think the only unusual thing about him is that he admitted it.",
            "cn": "Hardy 说这就是让他开始去学数学的原因，我想这里唯一不同寻常之处就是他竟然承认了这一点。"
          },
          {
            "en": "Another powerful motivator is the desire to do, or know, things you're not supposed to.",
            "cn": "另外一个强大的动机是渴望去做或搞清楚你并没有要求去做或弄懂的。"
          },
          {
            "en": "Closely related is the desire to do something audacious.",
            "cn": "类似的动机还有渴望去做某些大胆放肆的事。"
          },
          {
            "en": "Sixteen year olds aren't supposed to write novels.",
            "cn": "没有人要求 16岁的人会写小说。"
          },
          {
            "en": "So if you try, anything you achieve is on the plus side of the ledger; if you fail utterly, you're doing no worse than expectations. [8]",
            "cn": "但如果你试了，任何你做成的都是给你加分了；如果最终失败了，你也不会比期望的更差。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Beware of bad models.",
            "cn": "小心坏榜样。"
          },
          {
            "en": "Especially when they excuse laziness.",
            "cn": "尤其是他们为懒惰找了借口的时候。"
          },
          {
            "en": "When I was in high school I used to write \"existentialist\" short stories like ones I'd seen by famous writers.",
            "cn": "当我在高中的时候，我常常写“现实主义”的短文，像很有名气的作家写的那样。"
          },
          {
            "en": "My stories didn't have a lot of plot, but they were very deep.",
            "cn": "我的文章并没有很多情节，但它们内涵很深。"
          },
          {
            "en": "And they were less work to write than entertaining ones would have been.",
            "cn": "它们比写幽默讽刺的文章花费更少的精力。"
          },
          {
            "en": "I should have known that was a danger sign.",
            "cn": "我本应该知道这是一个危险的信号。"
          },
          {
            "en": "And in fact I found my stories pretty boring; what excited me was the idea of writing serious, intellectual stuff like the famous writers.",
            "cn": "而且事实上我发现的文章相当无聊；当时让我兴奋的是，我在想我可以像那些著名作家一样写些严肃高深的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Now I have enough experience to realize that those famous writers actually sucked.",
            "cn": "现在我有足够的经验说那些很有名气的作家其实真的很逊。"
          },
          {
            "en": "Plenty of famous people do; in the short term, the quality of one's work is only a small component of fame.",
            "cn": "很多著名人物也是这样；简而言之，一个人的作品质量，只是决定他的名气大小的一小部分。"
          },
          {
            "en": "I should have been less worried about doing something that seemed cool, and just done something I liked.",
            "cn": "我本应该不那么担心自己写些看起来很酷的东西，去做自己喜欢的事。"
          },
          {
            "en": "That's the actual road to coolness anyway.",
            "cn": "这才是通向“酷”的真正道路。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A key ingredient in many projects, almost a project on its own, is to find good books.",
            "cn": "很多项目的一个关键因素，也占了一个项目的大部分的是，"
          },
          {
            "en": "Most books are bad.",
            "cn": "去找好的书。"
          },
          {
            "en": "Nearly all textbooks are bad.",
            "cn": "大多数书都很糟糕。"
          },
          {
            "en": "[9] So don't assume a subject is to be learned from whatever book on it happens to be closest.",
            "cn": "差不多所有的教科书都是糟糕的。[9]所以不要假设一个学科可以从教科书上学到。"
          },
          {
            "en": "You have to search actively for the tiny number of good books.",
            "cn": "你不得不积极地去寻找一小部分的好书。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The important thing is to get out there and do stuff.",
            "cn": "重要的是走出来去做东西。"
          },
          {
            "en": "Instead of waiting to be taught, go out and learn.",
            "cn": "与其等着被教，不如主动去学。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Your life doesn't have to be shaped by admissions officers.",
            "cn": "你的人生不该被招生办公室的老师决定。"
          },
          {
            "en": "It could be shaped by your own curiosity.",
            "cn": "而应该被你自己的好奇心决定。"
          },
          {
            "en": "It is for all ambitious adults.",
            "cn": "有野心的成年人就是这样的。"
          },
          {
            "en": "And you don't have to wait to start.",
            "cn": "你不需要等待出发。"
          },
          {
            "en": "In fact, you don't have to wait to be an adult.",
            "cn": "实际上，你不需要等待成为一个成年人。"
          },
          {
            "en": "There's no switch inside you that magically flips when you turn a certain age or graduate from some institution.",
            "cn": "你身体里没有切换开关，等你到达某个年龄或者从某个机构毕业的时候，让你神奇地改变。"
          },
          {
            "en": "You start being an adult when you decide to take responsibility for your life.",
            "cn": "当你决定为你的人生负责的时候，你就变为成年人了。"
          },
          {
            "en": "You can do that at any age. [10]",
            "cn": "在任何年龄，你都可以这么做。[10]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This may sound like bullshit.",
            "cn": "这听起来纯属屁话。"
          },
          {
            "en": "I'm just a minor, you may think, I have no money, I have to live at home, I have to do what adults tell me all day long.",
            "cn": "你或许想，我仅仅是个微小的个体，我没钱，我必须要呆在家里，我必须要做大人们叫我去做的事情。"
          },
          {
            "en": "Well, most adults labor under restrictions just as cumbersome, and they manage to get things done.",
            "cn": "很好，大部分成年人都在某些约束下拘束地劳动，但他们想办法去做成事情。"
          },
          {
            "en": "If you think it's restrictive being a kid, imagine having kids.",
            "cn": "如果你觉得作为一个孩子有诸多约束的话，想想自己有孩子时。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The only real difference between adults and high school kids is that adults realize they need to get things done, and high school kids don't.",
            "cn": "成年人和高中生孩子的唯一真正的区别是，成年人意识到了他们必须把事情搞定，但高中生没意识到。"
          },
          {
            "en": "That realization hits most people around 23.",
            "cn": "这种领悟一般是在 23 岁的时候降临到大多数人身上。"
          },
          {
            "en": "But I'm letting you in on the secret early.",
            "cn": "但我现在提前告诉你这个秘密。"
          },
          {
            "en": "So get to work.",
            "cn": "所以，开始干吧。"
          },
          {
            "en": "Maybe you can be the first generation whose greatest regret from high school isn't how much time you wasted.",
            "cn": "或许你们可以成为高中毕业后不会遗憾浪费了如此多的时间的第一代人。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[1] A doctor friend warns that even this can give an inaccurate picture.",
            "cn": "[1] 一个医生朋友提醒说去医生当志愿者都未必能知道医生到达是干什么的。"
          },
          {
            "en": "\"Who knew how much time it would take up, how little autonomy one would have for endless years of training, and how unbelievably annoying it is to carry a beeper?\"",
            "cn": "“谁知道一个人需要如此多的时间，如此少的自由来去应对长年累月的医学培训，又有谁知道整天带着传呼机是多么难以置信的烦人？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[2] His best bet would probably be to become dictator and intimidate the NBA into letting him play.",
            "cn": "[2] 这个1米6的男孩最好的打算或许是成为独裁者，去恐吓 NBA 让他进去打球。"
          },
          {
            "en": "So far the closest anyone has come is Secretary of Labor.",
            "cn": "因为多年来最靠近这个的就是劳动委员会。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[3] A day job is one you take to pay the bills so you can do what you really want, like play in a band, or invent relativity.",
            "cn": "[3] 白天的日常工作就是那些你能赚够钱养活自己去做你真正喜欢的事情，像在乐队里弹唱或者发明相对论。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Treating high school as a day job might actually make it easier for some students to get good grades.",
            "cn": "把高中当做日常工作或许对一些学生来说更容易去取得好成绩。"
          },
          {
            "en": "If you treat your classes as a game, you won't be demoralized if they seem pointless.",
            "cn": "如果你把课堂当做一种游戏，当它们看起来毫无意义的时候你不会沮丧。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "However bad your classes, you need to get good grades in them to get into a decent college.",
            "cn": "然而无论你的课程多么糟糕，你需要取得好成绩来进入好大学。"
          },
          {
            "en": "And that is worth doing, because universities are where a lot of the clumps of smart people are these days.",
            "cn": "这是值得做的，因为目前而言，大学是许多聪明人扎堆的地方。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[4] The second biggest regret was caring so much about unimportant things.",
            "cn": "[4]第二个最大的遗憾就是太在乎根本不重要的东西。"
          },
          {
            "en": "And especially about what other people thought of them.",
            "cn": "尤其是在乎其他人怎么看待你。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think what they really mean, in the latter case, is caring what random people thought of them.",
            "cn": "我想后者，他们的真正意思是，无论什么人对你的看法，你都在乎。"
          },
          {
            "en": "Adults care just as much what other people think, but they get to be more selective about the other people.",
            "cn": "成年人也在乎别的人咋想，但他们对别的人更加精挑细选。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I have about thirty friends whose opinions I care about, and the opinion of the rest of the world barely affects me.",
            "cn": "我大概有三十个朋友的意见可以在乎，世界上其他人的意见很少能影响我。"
          },
          {
            "en": "The problem in high school is that your peers are chosen for you by accidents of age and geography, rather than by you based on respect for their judgement.",
            "cn": "高中的问题是，你的同学都是随机选给你的，来自不同的地方，而不是根据你的判断，你自己挑选的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[5] The key to wasting time is distraction.",
            "cn": "[5]浪费时间的关键在于分心。"
          },
          {
            "en": "Without distractions it's too obvious to your brain that you're not doing anything with it, and you start to feel uncomfortable.",
            "cn": "如果没有分心，对你的大脑来说你并没有在做什么事情，你开始感觉不舒服。"
          },
          {
            "en": "If you want to measure how dependent you've become on distractions, try this experiment: set aside a chunk of time on a weekend and sit alone and think.",
            "cn": "如果你想测量下你多么依赖分心，尝试这个实验：拿出周末的一段时间，独自坐着思考。"
          },
          {
            "en": "You can have a notebook to write your thoughts down in, but nothing else: no friends, TV, music, phone, IM, email, Web, games, books, newspapers, or magazines.",
            "cn": "你可以有个笔记本来写下你的想法，但没有其它的东西：没有朋友，电视，音乐，手机，聊天工具，邮件，网页，游戏，数，报纸或杂志。"
          },
          {
            "en": "Within an hour most people will feel a strong craving for distraction.",
            "cn": "不用一个小时，大多数人都会对分心非常渴望。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[6] I don't mean to imply that the only function of prep schools is to trick admissions officers.",
            "cn": "[6]我没有在暗示预科学校的作用就仅仅是耍弄招生办公室的老师，"
          },
          {
            "en": "They also generally provide a better education.",
            "cn": "他们通常也提供了更好的教育。"
          },
          {
            "en": "But try this thought experiment: suppose prep schools supplied the same superior education but had a tiny (.001) negative effect on college admissions.",
            "cn": "但实验性地想想如果预科学校提供同样优越的教育，但对大学申请有很小(0.001)的负面影响。"
          },
          {
            "en": "How many parents would still send their kids to them?",
            "cn": "有多少家长愿意把他们的孩子送去呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It might also be argued that kids who went to prep schools, because they've learned more, are better college candidates.",
            "cn": "或许有人会争论想去上预科学校的孩子，因为他们想学得更多，所以本来就是更好的大学候选人。"
          },
          {
            "en": "But this seems empirically false.",
            "cn": "但这实际上是错的。"
          },
          {
            "en": "What you learn in even the best high school is rounding error compared to what you learn in college.",
            "cn": "尽管你在最好的高中，教的东西相对于大学里教的几乎是错的。"
          },
          {
            "en": "Public school kids arrive at college with a slight disadvantage, but they start to pull ahead in the sophomore year.",
            "cn": "公立学校到大学有一点点的劣势，但他们在第二年的时候开始迎头而上。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "(I'm not saying public school kids are smarter than preppies, just that they are within any given college.",
            "cn": "（我没有在说公立学校的孩子都比预科学校的孩子更聪明，仅是说在同一所大学。"
          },
          {
            "en": "That follows necessarily if you agree prep schools improve kids' admissions prospects.)",
            "cn": "如果你同意预科学校增加了孩子被录取的希望，那么便会有这个结论。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[7] Why does society foul you?",
            "cn": "[7]为什么社会愚弄你呢？"
          },
          {
            "en": "Indifference, mainly.",
            "cn": "大体上是无意的。"
          },
          {
            "en": "There are simply no outside forces pushing high school to be good.",
            "cn": "没有外在的力量来推动高中变得更好。"
          },
          {
            "en": "The air traffic control system works because planes would crash otherwise.",
            "cn": "航空运输控制系统运行得很好，否则飞机会发生坠机。"
          },
          {
            "en": "Businesses have to deliver because otherwise competitors would take their customers.",
            "cn": "公司必须交付产品，否则竞争对手会夺走客户。"
          },
          {
            "en": "But no planes crash if your school sucks, and it has no competitors.",
            "cn": "但如果你的学校很糟糕，不会坠机，也没有竞争对手。"
          },
          {
            "en": "High school isn't evil; it's random; but random is pretty bad.",
            "cn": "高中并不是有罪的；它是随机的；随机的通常很糟糕。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[8] And then of course there is money.",
            "cn": "[8]另外一个动机是钱。"
          },
          {
            "en": "It's not a big factor in high school, because you can't do much that anyone wants.",
            "cn": "在高中并不是一个强大的因素，因为你还不能做很多人想要的东西。"
          },
          {
            "en": "But a lot of great things were created mainly to make money.",
            "cn": "不过很多杰出的东西大体上都是为了钱才被创造出来的。"
          },
          {
            "en": "Samuel Johnson said \"no man but a blockhead ever wrote except for money.\" (Many hope he was exaggerating.)",
            "cn": "Samuel Johnson 说过“只有傻瓜才不会为了钱而去写作。”（很多人希望他夸大了。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[9] Even college textbooks are bad.",
            "cn": "[9]尽管大学教科书很糟糕。"
          },
          {
            "en": "When you get to college, you'll find that (with a few stellar exceptions) the textbooks are not written by the leading scholars in the field they describe.",
            "cn": "当你去大学的时候，你也会发现教科书（除了一些）并不是相关领域的前沿学者写的。"
          },
          {
            "en": "Writing college textbooks is unpleasant work, done mostly by people who need the money.",
            "cn": "写大学教科书不是一个愉快的工作，大体上是那些需要钱的人写的。"
          },
          {
            "en": "It's unpleasant because the publishers exert so much control, and there are few things worse than close supervision by someone who doesn't understand what you're doing.",
            "cn": "不愉快是因为出版商施加了很多的限制，然而几乎没有什么东西比密切的又不懂你的工作的监管更糟糕了。"
          },
          {
            "en": "This phenomenon is apparently even worse in the production of high school textbooks.",
            "cn": "高中教科书的出版中，这个现象就更严重了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[10] Your teachers are always telling you to behave like adults.",
            "cn": "[10]你们的老师总是告诉你们要表现得像个成年人。"
          },
          {
            "en": "I wonder if they'd like it if you did.",
            "cn": "我想知道他们是否真的希望如此。"
          },
          {
            "en": "You may be loud and disorganized, but you're very docile compared to adults.",
            "cn": "你们或许大声争吵没有纪律，但你们比起成年人来说温顺太多。"
          },
          {
            "en": "If you actually started acting like adults, it would be just as if a bunch of adults had been transposed into your bodies.",
            "cn": "如果你们真的表现得像个成年人，像是一群成年人转移到你们的身体里。"
          },
          {
            "en": "Imagine the reaction of an FBI agent or taxi driver or reporter to being told they had to ask permission to go the bathroom, and only one person could go at a time.",
            "cn": "想象一下FBI特工或出租车司机或者记者被告知说，你们必须经过同意才能上厕所，而且必须每次去一个。"
          },
          {
            "en": "To say nothing of the things you're taught.",
            "cn": "更不用说你被教的知识了。"
          },
          {
            "en": "If a bunch of actual adults suddenly found themselves trapped in high school, the first thing they'd do is form a union and renegotiate all the rules with the administration.",
            "cn": "如果一群成年人发现他们被困在一所高中里，第一件他们会做的事就是成立工会，"
          },
          {
            "en": "Thanks to Ingrid Bassett, Trevor Blackwell, Rich Draves, Dan Giffin, Sarah Harlin, Jessica Livingston, Jackie McDonough, Robert Morris, Mark Nitzberg, Lisa Randall, and Aaron Swartz for reading drafts of this, and to many others for talking to me about high school.",
            "cn": "和学校负责人重新谈判一下管理规定。感谢 Ingrid Bassett, Trevor Blackwell, Rich Draves, Dan Giffin, Sarah Harlin, Jessica Livingston, Jackie McDonough, Robert Morris, Mark Nitzberg, Lisa Randall, 和 Aaron Swartz 读了初稿，还有其他和我聊高中的人。"
          }
        ]
      }
    ]
  },
  {
    "id": "gr-pg-how-to-do-what-you-love",
    "cat": "成长",
    "title": "How to Do What You Love",
    "titleZh": "如何做你热爱的事",
    "source": "Paul Graham · 2006-01-01",
    "date": "2006-01-01",
    "minutes": 19,
    "url": "https://www.paulgraham.com/love.html",
    "cover": "linear-gradient(135deg,#fecaca 0%,#dc2626 100%)",
    "gradient": "linear-gradient(135deg,#fecaca 0%,#dc2626 100%)",
    "coverImg": null,
    "translationCredit": "中文译文：王亮（2006，社区公认译本）",
    "paras": [
      {
        "sentences": [
          {
            "en": "To do something well you have to like it.",
            "cn": "喜欢一件事才能做好它，"
          },
          {
            "en": "That idea is not exactly novel.",
            "cn": "这可不是什么新想法，"
          },
          {
            "en": "We've got it down to four words: \"Do what you love.\" But it's not enough just to tell people that.",
            "cn": "用4个字概括：\"Do what you love.\"（“做你喜欢的事”）。"
          },
          {
            "en": "Doing what you love is complicated.",
            "cn": "然而，知易行难。"
          },
          {
            "en": "The very idea is foreign to what most of us learn as kids.",
            "cn": "小时候没有人告诉我们这些。"
          },
          {
            "en": "When I was a kid, it seemed as if work and fun were opposites by definition.",
            "cn": "当我还是个孩子的时候，以为工作和娱乐截然不同。"
          },
          {
            "en": "Life had two states: some of the time adults were making you do things, and that was called work; the rest of the time you could do what you wanted, and that was called playing.",
            "cn": "生活分成两部分：有时候大人给点活干；剩下的时间就去玩，随心所欲。"
          },
          {
            "en": "Occasionally the things adults made you do were fun, just as, occasionally, playing wasn't — for example, if you fell and hurt yourself.",
            "cn": "偶尔，大人让做的事居然挺有趣，而玩也会有不开心的时候，"
          },
          {
            "en": "But except for these few anomalous cases, work was pretty much defined as not-fun.",
            "cn": "比如摔倒受伤。但这种情况不多见，"
          },
          {
            "en": "And it did not seem to be an accident.",
            "cn": "通常，干活都没啥意思。"
          },
          {
            "en": "School, it was implied, was tedious because it was preparation for grownup work.",
            "cn": "既然上学是为了工作，那它肯定也很枯燥。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The world then was divided into two groups, grownups and kids.",
            "cn": "生活有工作和娱乐两种状态，相应地，"
          },
          {
            "en": "Grownups, like some kind of cursed race, had to work.",
            "cn": "人被分成两种，大人和孩子。"
          },
          {
            "en": "Kids didn't, but they did have to go to school, which was a dilute version of work meant to prepare us for the real thing.",
            "cn": "大人要辛苦地工作，孩子虽然不用工作，但他们得去学校学做一些简单的事，为将来打基础。"
          },
          {
            "en": "Much as we disliked school, the grownups all agreed that grownup work was worse, and that we had it easy.",
            "cn": "就像孩子们不喜欢学校一样，大人们也都不爱工作，这似乎显而易见。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Teachers in particular all seemed to believe implicitly that work was not fun.",
            "cn": "老师尤其相信工作没有乐趣可言，这并不奇怪，"
          },
          {
            "en": "Which is not surprising: work wasn't fun for most of them.",
            "cn": "因为绝大多数教师没体会过教书的乐趣。"
          },
          {
            "en": "Why did we have to memorize state capitals instead of playing dodgeball?",
            "cn": "就像孩子们不能玩躲球游戏(dodgeball)，"
          },
          {
            "en": "For the same reason they had to watch over a bunch of kids instead of lying on a beach.",
            "cn": "非要背各个省的省会一样，老师也不得不看着这些孩子，不能躺在海滩。"
          },
          {
            "en": "You couldn't just do what you wanted.",
            "cn": "谁都不能想干什么就干什么。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I'm not saying we should let little kids do whatever they want.",
            "cn": "这么说并不代表我认为允许孩子自做主张是对的，"
          },
          {
            "en": "They may have to be made to work on certain things.",
            "cn": "他们总得学会点什么。"
          },
          {
            "en": "But if we make kids work on dull stuff, it might be wise to tell them that tediousness is not the defining quality of work, and indeed that the reason they have to work on dull stuff now is so they can work on more interesting stuff later. [ 1 ]",
            "cn": "但是，如果大人告诉孩子“工作不都是这么枯燥，现在之所以要做些很闷的事，恰恰是为了以后可以选择能带来乐趣的工作”[1]是不是效果更好呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Once, when I was about 9 or 10, my father told me I could be whatever I wanted when I grew up, so long as I enjoyed it.",
            "cn": "在我9岁或者10岁的时候，父亲曾告诉我，只要我喜欢，长大了干什么都行。这话我记得很清楚，"
          },
          {
            "en": "I remember that precisely because it seemed so anomalous.",
            "cn": "因为听起来好像有人告诉我水是干的一样怪异。"
          },
          {
            "en": "It was like being told to use dry water.",
            "cn": "虽然我不敢肯定父亲想告诉我什么，"
          },
          {
            "en": "Whatever I thought he meant, I didn't think he meant work could literally be fun — fun like playing.",
            "cn": "但肯定不是说工作能像娱乐一样带来乐趣。过了好多年，"
          },
          {
            "en": "It took me years to grasp that.",
            "cn": "我才弄明白这一点。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "By high school, the prospect of an actual job was on the horizon.",
            "cn": "很多人读完高中就开始工作了，所以，"
          },
          {
            "en": "Adults would sometimes come to speak to us about their work, or we would go to see them at work.",
            "cn": "大人会在孩子读高中的时候向他们讲些工作上的事，也允许孩子跑去看他们工作的样子。"
          },
          {
            "en": "It was always understood that they enjoyed what they did.",
            "cn": "那时我总觉得大人都很喜欢各自的工作，"
          },
          {
            "en": "In retrospect I think one may have: the private jet pilot.",
            "cn": "现在回头想想，也许只有私人飞行员才真正喜欢，"
          },
          {
            "en": "But I don't think the bank manager really did.",
            "cn": "但银行经理肯定不喜欢他的那份工作。"
          },
          {
            "en": "The main reason they all acted as if they enjoyed their work was presumably the upper-middle class convention that you're supposed to.",
            "cn": "有一种说法，中高层人士都喜欢自己的工作。于是，人们都装模作样喜欢自己的工作，仿佛自己是中高层人士中的一员，"
          },
          {
            "en": "It would not merely be bad for your career to say that you despised your job, but a social faux-pas.",
            "cn": "否则不仅会影响其职业生涯，而且显得没有教养。"
          },
          {
            "en": "Why is it conventional to pretend to like what you do?",
            "cn": "为什么人们都要装作喜欢自己的工作？"
          },
          {
            "en": "The first sentence of this essay explains that.",
            "cn": "本文第一句话可以解释这一点。"
          },
          {
            "en": "If you have to like something to do it well, then the most successful people will all like what they do.",
            "cn": "如果一个人只能做好他喜欢的事情，那么，有些人能成功，就是因为喜欢自己的工作。"
          },
          {
            "en": "That's where the upper-middle class tradition comes from.",
            "cn": "这就是中上层阶级传统的由来。"
          },
          {
            "en": "Just as houses all over America are full of chairs that are, without the owners even knowing it, nth-degree imitations of chairs designed 250 years ago for French kings, conventional attitudes about work are, without the owners even knowing it, nth-degree imitations of the attitudes of people who've done great things.",
            "cn": "如同在美国，家家户户都有250年前法国国王用椅的不同程度的仿制品一样（尽管主人可能并不太清楚），人们对工作的态度也是在不同程度上、有意无意地模仿成功人士。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What a recipe for alienation.",
            "cn": "假装喜欢自己的工作的做法必定把孩子弄得精神错乱，"
          },
          {
            "en": "By the time they reach an age to think about what they'd like to do, most kids have been thoroughly misled about the idea of loving one's work.",
            "cn": "等他们到了开始思考喜欢什么工作的年龄，绝大多数人已经完全被这种“干一行爱一行”的观点所误导。"
          },
          {
            "en": "School has trained them to regard work as an unpleasant duty.",
            "cn": "一方面，学校教导他们工作是一种责任，但毫无乐趣可言，"
          },
          {
            "en": "Having a job is said to be even more onerous than schoolwork.",
            "cn": "工作甚至比上学还辛苦。"
          },
          {
            "en": "And yet all the adults claim to like what they do.",
            "cn": "另一方面，身边的大人却口口声声说他们喜欢工作。"
          },
          {
            "en": "You can't blame kids for thinking \"I am not like these people; I am not suited to this world.\"",
            "cn": "孩子们会想：“我和他们不一样，我不属于这个世界。”这不是孩子的错。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Actually they've been told three lies: the stuff they've been taught to regard as work in school is not real work; grownup work is not (necessarily) worse than schoolwork; and many of the adults around them are lying when they say they like what they do.",
            "cn": "学校和大人们不一致的说法使孩子们错误地认为：学校里学会做的事情并不是真正的工作；工作不比学习更糟；要么那些说喜欢工作的大人都在说谎。然而，三种说法全是错误的。"
          },
          {
            "en": "The most dangerous liars can be the kids' own parents.",
            "cn": "最危险的谎言来自孩子的父母。"
          },
          {
            "en": "If you take a boring job to give your family a high standard of living, as so many people do, you risk infecting your kids with the idea that work is boring.",
            "cn": "如果某人选择无聊的工作是为了让全家人生活得好一点――很多人也真的是这么做的――那么他的孩子很可能受其影响，也认为工作挺无聊的。"
          },
          {
            "en": "[ 2 ] Maybe it would be better for kids in this one case if parents were not so unselfish.",
            "cn": "[2]而如果父母能为自己多考虑考虑（选择自己喜欢的工作，尽管以牺牲全家人的生活质量为代价――译者注），教出来的孩子反而会好一些。"
          },
          {
            "en": "A parent who set an example of loving their work might help their kids more than an expensive house. [ 3 ]",
            "cn": "热爱工作的父母对子女的影响是昂贵的房子无法带来的。[3]"
          },
          {
            "en": "It was not till I was in college that the idea of work finally broke free from the idea of making a living.",
            "cn": "读大学时，我才明白养家糊口不是工作的唯一目的。"
          },
          {
            "en": "Then the important question became not how to make money, but what to work on.",
            "cn": "选择什么工作要比赚多少钱重要。"
          },
          {
            "en": "Ideally these coincided, but some spectacular boundary cases (like Einstein in the patent office) proved they weren't identical.",
            "cn": "虽然人们一般认为工作就是为了生存，但也有特别值得一提的故事（比如说爱因斯坦在专利局上班）说明，事实并非总是如此。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The definition of work was now to make some original contribution to the world, and in the process not to starve.",
            "cn": "如今，工作的目的是为世界做出贡献，同时也要能够生存。"
          },
          {
            "en": "But after the habit of so many years my idea of work still included a large component of pain.",
            "cn": "可是这么多年来，我一直无法改变自己的错误想法，认为工作中令人痛苦的事情很多。"
          },
          {
            "en": "Work still seemed to require discipline, because only hard problems yielded grand results, and hard problems couldn't literally be fun.",
            "cn": "工作中仍然需要不断钻研，所谓“天将降大任于斯人也，必先苦其心智，劳其筋骨……”。"
          },
          {
            "en": "Surely one had to force oneself to work on them.",
            "cn": "所以，人们不得不强迫自己做这些工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you think something's supposed to hurt, you're less likely to notice if you're doing it wrong.",
            "cn": "如果认为工作注定是件痛苦的事，当工作中出现错误就觉察不出来。"
          },
          {
            "en": "That about sums up my experience of graduate school.",
            "cn": "这就是我在研究生院学习期间的思考所得。"
          },
          {
            "en": "How much are you supposed to like what you do?",
            "cn": "一个人能够喜欢工作到什么程度呢？"
          },
          {
            "en": "Unless you know that, you don't know when to stop searching.",
            "cn": "如果他不知道这个问题的答案，就不知道该在什么时候停止寻找。"
          },
          {
            "en": "And if, like most people, you underestimate it, you'll tend to stop searching too early.",
            "cn": "另外，如果他像其他人那样，低估了对工作的热爱之情，又会过早地停止寻找。"
          },
          {
            "en": "You'll end up doing something chosen for you by your parents, or the desire to make money, or prestige — or sheer inertia.",
            "cn": "他或者会听从父母的安排，或者去追名逐利，又或者什么也不做。"
          },
          {
            "en": "Here's an upper bound: Do what you love doesn't mean, do what you would like to do most this second .",
            "cn": "一方面，“做你喜欢做的事”不意味着做此时此刻最想做的事，"
          },
          {
            "en": "Even Einstein probably had moments when he wanted to have a cup of coffee, but told himself he ought to finish what he was working on first.",
            "cn": "即便是爱因斯坦也会有想喝咖啡的时候，但他会告诫自己先完成手头的工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It used to perplex me when I read about people who liked what they did so much that there was nothing they'd rather do.",
            "cn": "我总是无法理解有些人非常喜欢自己的工作以至于其它的事都不想做，"
          },
          {
            "en": "There didn't seem to be any sort of work I liked that much.",
            "cn": "因为我从来没有如此喜欢过一份工作。"
          },
          {
            "en": "If I had a choice of (a) spending the next hour working on something or (b) be teleported to Rome and spend the next hour wandering about, was there any sort of work I'd prefer?",
            "cn": "如果我可以选择(a)花一小时做点什么，或者(b)瞬间转移(teleport)到罗马，然后在那里闲逛一小时。我会更喜欢哪一个呢？"
          },
          {
            "en": "Honestly, no.",
            "cn": "说实话，都不喜欢。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But the fact is, almost anyone would rather, at any given moment, float about in the Caribbean, or have sex, or eat some delicious food, than work on hard problems.",
            "cn": "然而，在某些特定的时刻，几乎每个人都会倾向去Carribbean飘流、做爱、或者享用美食，而不是去解决难题。"
          },
          {
            "en": "The rule about doing what you love assumes a certain length of time.",
            "cn": "做自己喜欢的事是有时间范围的。"
          },
          {
            "en": "It doesn't mean, do what will make you happiest this second, but what will make you happiest over some longer period, like a week or a month.",
            "cn": "不能是只在某一刻特别想做的事，必须要持续一段较长的时间，比如一个星期或者一个月。"
          },
          {
            "en": "Unproductive pleasures pall eventually.",
            "cn": "没有成果的快乐是无法持续的，"
          },
          {
            "en": "After a while you get tired of lying on the beach.",
            "cn": "如果厌倦了躺在沙滩上，"
          },
          {
            "en": "If you want to stay happy, you have to do something.",
            "cn": "而又想保持快乐，就得做点事情出来。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As a lower bound, you have to like your work more than any unproductive pleasure.",
            "cn": "另一方面，必须得喜欢工作多一点，喜欢享受少一点，"
          },
          {
            "en": "You have to like what you do enough that the concept of \"spare time\" seems mistaken.",
            "cn": "要有不做点事就闲得难受的劲头。"
          },
          {
            "en": "Which is not to say you have to spend all your time working.",
            "cn": "当然也不能没日没夜地工作，"
          },
          {
            "en": "You can only work so much before you get tired and start to screw up.",
            "cn": "可以坚持工作直到疲劳为止，"
          },
          {
            "en": "Then you want to do something else — even something mindless.",
            "cn": "然后可能想做点别的，甚至只是发呆。"
          },
          {
            "en": "But you don't regard this time as the prize and the time you spend working as the pain you endure to earn it.",
            "cn": "但不要把这种时刻当成一种奖励，或者辛苦工作的补偿。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I put the lower bound there for practical reasons.",
            "cn": "我这么说是有原因的，"
          },
          {
            "en": "If your work is not your favorite thing to do, you'll have terrible problems with procrastination.",
            "cn": "如果一个人在做着自己并不喜欢的工作，那么不会有什么成就，"
          },
          {
            "en": "You'll have to force yourself to work, and when you resort to that the results are distinctly inferior.",
            "cn": "因为强迫自己工作不可能比别人做得好。"
          },
          {
            "en": "To be happy I think you have to be doing something you not only enjoy, but admire.",
            "cn": "要想工作得快乐，不仅要做自己喜欢的事，而且是令人佩服的事，"
          },
          {
            "en": "You have to be able to say, at the end, wow, that's pretty cool.",
            "cn": "是那种做完可以说“哇，太酷了”的工作。"
          },
          {
            "en": "This doesn't mean you have to make something.",
            "cn": "不一定非得制造点什么出来，"
          },
          {
            "en": "If you learn how to hang glide, or to speak a foreign language fluently, that will be enough to make you say, for a while at least, wow, that's pretty cool.",
            "cn": "学会开滑翔机，说一口流利的外语，都足以让人感觉很酷，至少是那一刻。"
          },
          {
            "en": "What there has to be is a test.",
            "cn": "可以用这种方法来测试自己。"
          },
          {
            "en": "So one thing that falls just short of the standard, I think, is reading books.",
            "cn": "我认为读书就不符合这一标准。"
          },
          {
            "en": "Except for some books in math and the hard sciences, there's no test of how well you've read a book, and that's why merely reading books doesn't quite feel like work.",
            "cn": "除了某些数学书或者实用科学书籍，很难准确说读完一本书后的感受，这也是为什么读书和工作不太一样。"
          },
          {
            "en": "You have to do something with what you've read to feel productive.",
            "cn": "只有在实践中运用了读到的知识，才会感觉有收获。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think the best test is one Gino Lee taught me: to try to do things that would make your friends say wow.",
            "cn": "Gino Lee告诉过我一个好方法――做一件能让你的朋友说“哇”的事情。"
          },
          {
            "en": "But it probably wouldn't start to work properly till about age 22, because most people haven't had a big enough sample to pick friends from before then.",
            "cn": "但这可能不适用于22岁以下的人，因为他们认识的人太少，碰不到真正的朋友。"
          },
          {
            "en": "What you should not do, I think, is worry about the opinion of anyone beyond your friends.",
            "cn": "我认为，一个人不应该在乎别人的看法，除非是他的朋友。"
          },
          {
            "en": "You shouldn't worry about prestige.",
            "cn": "不要想着出名，不必太在意众人的意见。"
          },
          {
            "en": "Prestige is the opinion of the rest of the world.",
            "cn": "能够得到尊敬的人的意见就够了，"
          },
          {
            "en": "When you can ask the opinions of people whose judgement you respect, what does it add to consider the opinions of people you don't even know? [ 4 ]",
            "cn": "何必在乎那些根本就不认识的人呢？[4]"
          },
          {
            "en": "This is easy advice to give.",
            "cn": "说起来容易做起来难，"
          },
          {
            "en": "It's hard to follow, especially when you're young.",
            "cn": "对孩子来说更是如此。[5]"
          },
          {
            "en": "[ 5 ] Prestige is like a powerful magnet that warps even your beliefs about what you enjoy.",
            "cn": "出名极具诱惑力，甚至可以让人放弃其所爱，"
          },
          {
            "en": "It causes you to work not on what you like, but what you'd like to like.",
            "cn": "转而去做一些他渴望喜欢的事情。"
          },
          {
            "en": "That's what leads people to try to write novels, for example.",
            "cn": "比如，有些人之所以写小说，"
          },
          {
            "en": "They like reading novels.",
            "cn": "是因为他们喜欢读小说，"
          },
          {
            "en": "They notice that people who write them win Nobel prizes.",
            "cn": "而且发现写小说可以得诺贝尔奖，"
          },
          {
            "en": "What could be more wonderful, they think, than to be a novelist?",
            "cn": "于是乎他们会想，难道还会有什么工作比成为一名作家更好吗？"
          },
          {
            "en": "But liking the idea of being a novelist is not enough; you have to like the actual work of novel-writing if you're going to be good at it; you have to like making up elaborate lies.",
            "cn": "比如，有些人之所以写小说，是因为他们喜欢读小说，而且发现写小说可以得诺贝尔奖，于是乎他们会想，难道还会有什么工作比成为一名作家更好吗？但是，渴望成为一名作家还不够，还要喜欢写作，喜欢编故事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Prestige is just fossilized inspiration.",
            "cn": "精诚所至，金石为开。"
          },
          {
            "en": "If you do anything well enough, you'll make it prestigious.",
            "cn": "把一件事做到最好，就能赢得声望。"
          },
          {
            "en": "Plenty of things we now consider prestigious were anything but at first.",
            "cn": "然而，做某些工作会带来声望是后来才有的，"
          },
          {
            "en": "Jazz comes to mind — though almost any established art form would do.",
            "cn": "爵士乐就是一个例子，其它成熟的艺术形式也是如此。"
          },
          {
            "en": "So just do what you like, and let prestige take care of itself.",
            "cn": "所以，尽管去做喜欢的事吧，声望自会随之而来。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Prestige is especially dangerous to the ambitious.",
            "cn": "声望对于雄心勃勃的人来说是最危险的诱惑，"
          },
          {
            "en": "If you want to make ambitious people waste their time on errands, the way to do it is to bait the hook with prestige.",
            "cn": "想让这种人办事，只需向其保证一定的声望即可，"
          },
          {
            "en": "That's the recipe for getting people to give talks, write forewords, serve on committees, be department heads, and so on.",
            "cn": "比如让其做演讲、作序、服务于某个委员会、以及做个部门头头，等等。"
          },
          {
            "en": "It might be a good rule simply to avoid any prestigious task.",
            "cn": "所以最好的建议就是不要做这类工作，"
          },
          {
            "en": "If it didn't suck, they wouldn't have had to make it prestigious.",
            "cn": "如果它有趣的话，人们就无需使其听上去很美了。"
          },
          {
            "en": "Similarly, if you admire two kinds of work equally, but one is more prestigious, you should probably choose the other.",
            "cn": "同理，如果同样喜欢两种工作，其中一种会带来更大的声望，那么就选择另外一个。"
          },
          {
            "en": "Your opinions about what's admirable are always going to be slightly influenced by prestige, so if the two seem equal to you, you probably have more genuine admiration for the less prestigious one.",
            "cn": "声望会一点点地改变人们的爱好，所以如果自己无法区分的话，那么很可能真正喜欢的是不引人注目的那个。"
          },
          {
            "en": "The other big force leading people astray is money.",
            "cn": "金钱同样使人堕落。钱本身并不危险，"
          },
          {
            "en": "Money by itself is not that dangerous.",
            "cn": "有些工作虽然可以挣很多钱，"
          },
          {
            "en": "When something pays well but is regarded with contempt, like telemarketing, or prostitution, or personal injury litigation, ambitious people aren't tempted by it.",
            "cn": "却被人瞧不起，比如电话推销、卖淫、或者人身伤害诉讼。做这种工作的人最终会是那些“只求生存”的人（建议："
          },
          {
            "en": "That kind of work ends up being done by people who are \"just trying to make a living.\" (Tip: avoid any field whose practitioners say this.) The danger is when money is combined with prestige, as in, say, corporate law, or medicine.",
            "cn": "如果某个行业的从业者这么说，不要做这个行当），有追求的人才不会被其诱惑。真正的危险来自于名利双收的职业，例如从事企业法律或者医学工作。一份既有保障又有前途的工作，"
          },
          {
            "en": "A comparatively safe and prosperous career with some automatic baseline prestige is dangerously tempting to someone young, who hasn't thought much about what they really like.",
            "cn": "再加上一点可以不劳而获的声望，才是对青年人最大的威胁，因为他们还没开始思考什么是他们真正喜欢的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The test of whether people love what they do is whether they'd do it even if they weren't paid for it — even if they had to work at another job to make a living.",
            "cn": "要想知道一个人是否喜欢他正在做的事，就看他会不会无偿地工作，即使不得不做另一份工作以求生存。"
          },
          {
            "en": "How many corporate lawyers would do their current work if they had to do it for free, in their spare time, and take day jobs as waiters to support themselves?",
            "cn": "究竟有多少企业律师愿意在非工作时间免费做他们正在做的工作，而以日常工作糊口呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This test is especially helpful in deciding between different kinds of academic work, because fields vary greatly in this respect.",
            "cn": "这种方法对于选择从事哪种学术研究工作特别有帮助，"
          },
          {
            "en": "Most good mathematicians would work on math even if there were no jobs as math professors, whereas in the departments at the other end of the spectrum, the availability of teaching jobs is the driver: people would rather be English professors than work in ad agencies, and publishing papers is the way you compete for such jobs.",
            "cn": "因为不同领域之间的差别非常大。大多数优秀的数学家即使当不了数学教授也愿意从事数学研究，另一种情况恰恰相反，有人发表论文，就是想做英语教授，而不是在广告机构工作。"
          },
          {
            "en": "Math would happen without math departments, but it is the existence of English majors, and therefore jobs teaching them, that calls into being all those thousands of dreary papers about gender and identity in the novels of Conrad.",
            "cn": "即使没有数学系也会有人研究数学，但是如果没有英语专业，以及教学职位的存在，又怎么会有人长篇累牍地发表论文，研究Conrad小说中人物的性别和身分呢？"
          },
          {
            "en": "No one does that kind of thing for fun.",
            "cn": "没人会觉得研究这些东西很有趣。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The advice of parents will tend to err on the side of money.",
            "cn": "做父母的往往会看重金钱。可以放心地说，"
          },
          {
            "en": "It seems safe to say there are more undergrads who want to be novelists and whose parents want them to be doctors than who want to be doctors and whose parents want them to be novelists.",
            "cn": "孩子想当作家而父母想让其当医生的多，孩子想当医生而父母让其当作家的少。"
          },
          {
            "en": "The kids think their parents are \"materialistic.\" Not necessarily.",
            "cn": "孩子认为父母太“实际”，其实未必。"
          },
          {
            "en": "All parents tend to be more conservative for their kids than they would for themselves, simply because, as parents, they share risks more than rewards.",
            "cn": "所有的父母对待孩子要比对待自己更慎重，因为作为父母，他们承担风险，却得不到好处。"
          },
          {
            "en": "If your eight year old son decides to climb a tall tree, or your teenage daughter decides to date the local bad boy, you won't get a share in the excitement, but if your son falls, or your daughter gets pregnant, you'll have to deal with the consequences.",
            "cn": "如果八岁的儿子打算爬树，或者10来岁的女儿要和坏男孩约会，父母无法体会孩子的兴奋，但是如果儿子从树上掉下来，或者女儿怀孕了，却要父母出面收场。"
          },
          {
            "en": "With such powerful forces leading us astray, it's not surprising we find it so hard to discover what we like to work on.",
            "cn": "慎重面对如此危险的诱惑，很难找到喜欢的工作就不奇怪了。大多数人从小就相信工作是受罪，"
          },
          {
            "en": "Most people are doomed in childhood by accepting the axiom that work = pain.",
            "cn": "不信邪的人也都栽在了名利的诱惑上。"
          },
          {
            "en": "Those who escape this are nearly all lured onto the rocks by prestige or money.",
            "cn": "那么到底有多少人最终找到了他们所热爱的工作呢？"
          },
          {
            "en": "How many even discover something they love to work on?",
            "cn": "10 万，或者 10 亿。找到自己爱干的工作是很难的。"
          },
          {
            "en": "A few hundred thousand, perhaps, out of billions.",
            "cn": "大多数人做不到的事肯定很难，"
          },
          {
            "en": "It's hard to find work you love; it must be, if so few do.",
            "cn": "所以，不要低估它的难度，同时，也不要因为暂时没有找到而气馁。"
          },
          {
            "en": "So don't underestimate this task.",
            "cn": "其实，"
          },
          {
            "en": "And don't feel bad if you haven't succeeded yet.",
            "cn": "只要敢于承认自己对工作的不满，"
          },
          {
            "en": "In fact, if you admit to yourself that you're discontented, you're a step ahead of most people, who are still in denial.",
            "cn": "就比很多人更可能成功了，那些人还在自欺欺人呢。如果周围的同事都说工作得很开心，"
          },
          {
            "en": "If you're surrounded by colleagues who claim to enjoy work that you find contemptible, odds are they're lying to themselves.",
            "cn": "而自己却对这份工作一点也看不上眼，那也许是同事在自己骗自己，虽然未必都是，"
          },
          {
            "en": "Not necessarily, but probably.",
            "cn": "但可能性很大。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Although doing great work takes less discipline than people think — because the way to do great work is to find something you like so much that you don't have to force yourself to do it — finding work you love does usually require discipline.",
            "cn": "做大事不像人们想像的那样艰苦，因为只有喜欢自己工作的人才能成就大事，他们根本不需要勉强自己，但是，寻找爱好的过程却得非常认真。"
          },
          {
            "en": "Some people are lucky enough to know what they want to do when they're 12, and just glide along as if they were on railroad tracks.",
            "cn": "有些人特别幸运，他们 12 岁就知道自己想做什么，然后沿着这条路茁壮成长。"
          },
          {
            "en": "But this seems the exception.",
            "cn": "但这样的人毕竟是少数，"
          },
          {
            "en": "More often people who do great things have careers with the trajectory of a ping-pong ball.",
            "cn": "对于更多成就大事的人来说，"
          },
          {
            "en": "They go to school to study A, drop out and get a job doing B, and then become famous for C after taking it up on the side.",
            "cn": "其职业生涯就像乒乓球的轨迹，他们在学校里学 A，工作后做完全不相关的 B，最后成名于 C。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Sometimes jumping from one sort of work to another is a sign of energy, and sometimes it's a sign of laziness.",
            "cn": "有时候，更换工作是精力旺盛的表现，但也可能是因为懒惰。通常，"
          },
          {
            "en": "Are you dropping out, or boldly carving a new path?",
            "cn": "你无法区分自己究竟是掉队了，"
          },
          {
            "en": "You often can't tell yourself.",
            "cn": "还是在另辟蹊径，"
          },
          {
            "en": "Plenty of people who will later do great things seem to be disappointments early on, when they're trying to find their niche.",
            "cn": "即使许多成就大事的人，在最初寻找人生定位时往往很失望。"
          },
          {
            "en": "Is there some test you can use to keep yourself honest?",
            "cn": "有什么方法可以让自己保持诚实吗？"
          },
          {
            "en": "One is to try to do a good job at whatever you're doing, even if you don't like it.",
            "cn": "一种方法是无论做什么都要做好它，即使不喜欢。"
          },
          {
            "en": "Then at least you'll know you're not using dissatisfaction as an excuse for being lazy.",
            "cn": "这样至少知道自己不是在为懒惰找借口。"
          },
          {
            "en": "Perhaps more importantly, you'll get into the habit of doing things well.",
            "cn": "更重要的是，往往会养成把事做好的习惯。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another test you can use is: always produce.",
            "cn": "另一种方法是“坚持实践”。"
          },
          {
            "en": "For example, if you have a day job you don't take seriously because you plan to be a novelist, are you producing?",
            "cn": "例如，如果想成为一名作家，又不想因为日常工作而浪费精力，"
          },
          {
            "en": "Are you writing pages of fiction, however bad?",
            "cn": "那么，就要坚持练习写作。"
          },
          {
            "en": "As long as you're producing, you'll know you're not merely using the hazy vision of the grand novel you plan to write one day as an opiate.",
            "cn": "尽管写得不好，但还是要坚持写。只要坚持实践，就会知道想成为作家是不是想想而已。"
          },
          {
            "en": "The view of it will be obstructed by the all too palpably flawed one you're actually writing.",
            "cn": "如果写的东西实在糟糕，选择这份工作就不现实。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Always produce\" is also a heuristic for finding the work you love.",
            "cn": "坚持实践是一种启发式的方法，"
          },
          {
            "en": "If you subject yourself to that constraint, it will automatically push you away from things you think you're supposed to work on, toward things you actually like.",
            "cn": "可以帮助找到喜爱的工作，甄别出那些本以为会做好的工作，最终选择真正喜欢的，"
          },
          {
            "en": "\"Always produce\" will discover your life's work the way water, with the aid of gravity, finds the hole in your roof.",
            "cn": "就好像水在地球引力的作用下可以找到屋顶的漏洞一样。"
          },
          {
            "en": "Of course, figuring out what you like to work on doesn't mean you get to work on it.",
            "cn": "当然，明白喜欢什么工作并不意味着能够以它为工作，"
          },
          {
            "en": "That's a separate question.",
            "cn": "这是两码事。"
          },
          {
            "en": "And if you're ambitious you have to keep them separate: you have to make a conscious effort to keep your ideas about what you want from being contaminated by what seems possible. [ 6 ]",
            "cn": "有追求的人更要把两者分清楚，喜欢做什么和能做成什么是不一样的。"
          },
          {
            "en": "It's painful to keep them apart, because it's painful to observe the gap between them.",
            "cn": "[ 6 ]这一点看得越清楚，内心就会越痛苦，"
          },
          {
            "en": "So most people pre-emptively lower their expectations.",
            "cn": "很多人因此降低标准。"
          },
          {
            "en": "For example, if you asked random people on the street if they'd like to be able to draw like Leonardo, you'd find most would say something like \"Oh, I can't draw.\" This is more a statement of intention than fact; it means, I'm not going to try.",
            "cn": "例如，如果在街上随便找人问问，他们能否和 Leonardo 画得一样好，就会发现很多人说他们根本不会画画。这更像是一种心理暗示，而不是事实。"
          },
          {
            "en": "Because the fact is, if you took a random person off the street and somehow got them to work as hard as they possibly could at drawing for the next twenty years, they'd get surprisingly far.",
            "cn": "他实际想说，我不会去干那个。因为如果想方设法让他做画 20 年，他会为自己获得的成就而吃惊。"
          },
          {
            "en": "But it would require a great moral effort; it would mean staring failure in the eye every day for years.",
            "cn": "当然那需要非常刻苦，可能要在头几年每天都得面对失败。"
          },
          {
            "en": "And so to protect themselves people say \"I can't.\"",
            "cn": "所以如果有人说“我不行”，不要相信他。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another related line you often hear is that not everyone can do work they love — that someone has to do the unpleasant jobs.",
            "cn": "另一个经常听到的说法是，不能每个人都做自己喜欢的事，总得有人做令人讨厌的工作。"
          },
          {
            "en": "Really?",
            "cn": "真的吗？"
          },
          {
            "en": "How do you make them?",
            "cn": "这个结论是如何得出的呢？"
          },
          {
            "en": "In the US the only mechanism for forcing people to do unpleasant jobs is the draft, and that hasn't been invoked for over 30 years.",
            "cn": "在美国，唯一强迫人的方式是征兵，但我们已经 30 年没有这么做过了，"
          },
          {
            "en": "All we can do is encourage people to do unpleasant work, with money and prestige.",
            "cn": "而是一直利用名利吸引人工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If there's something people still won't do, it seems as if society just has to make do without.",
            "cn": "如果仍然有些事没人愿意做，那么人们就不得不自己做，过去发生在家奴身上的事就是这样。"
          },
          {
            "en": "That's what happened with domestic servants.",
            "cn": "家奴的工作是经典的例子，"
          },
          {
            "en": "For millennia that was the canonical example of a job \"someone had to do.\" And yet in the mid twentieth century servants practically disappeared in rich countries, and the rich have just had to do without.",
            "cn": "在公元 10 世纪时，似乎那份工作总得有人来做。然而在 20 世纪中期，发达国家已经没有仆人了，有钱人得自己干活。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So while there may be some things someone has to do, there's a good chance anyone saying that about any particular job is mistaken.",
            "cn": "所以，也许有些事情总得有人做，但是谈到具体的某项工作时这么说就不合适了。"
          },
          {
            "en": "Most unpleasant jobs would either get automated or go undone if no one were willing to do them.",
            "cn": "糟糕的工作可以自动化完成，或者根本就不做，如果没人愿意做的话。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There's another sense of \"not everyone can do work they love\" that's all too true, however.",
            "cn": "有一种情况确实不是每个人都可以做他喜欢做的工作。"
          },
          {
            "en": "One has to make a living, and it's hard to get paid for doing work you love.",
            "cn": "人首先要生存，做自己喜欢的工作会很难赚到钱。"
          },
          {
            "en": "There are two routes to that destination: The organic route: as you become more eminent, gradually to increase the parts of your job that you like at the expense of those you don't.",
            "cn": "这时有两条路可以走：成长渐进法：随着能力的增强、名气的增大，逐渐放弃不喜欢的工作，选择喜欢的工作。"
          },
          {
            "en": "The two-job route: to work at things you don't like to get money to work on things you do.",
            "cn": "齐头并进法：做不喜欢的工作赚钱，以便做自己喜欢的事情。"
          },
          {
            "en": "The organic route is more common.",
            "cn": "成长渐进法更常用，"
          },
          {
            "en": "It happens naturally to anyone who does good work.",
            "cn": "工作做得好的人一般选这种方法。"
          },
          {
            "en": "A young architect has to take whatever work he can get, but if he does well he'll gradually be in a position to pick and choose among projects.",
            "cn": "年轻的建筑师开始时不得不什么活都干，等到他做得很好之后就可以挑选项目了。"
          },
          {
            "en": "The disadvantage of this route is that it's slow and uncertain.",
            "cn": "这种方法也有不好的地方，就是太慢，而且不确定，"
          },
          {
            "en": "Even tenure is not real freedom.",
            "cn": "即使是终身聘用也无法做到真正的自由。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The two-job route has several variants depending on how long you work for money at a time.",
            "cn": "齐头并进法有多种做法，取决于需要用多少时间赚钱。"
          },
          {
            "en": "At one extreme is the \"day job,\" where you work regular hours at one job to make money, and work on what you love in your spare time.",
            "cn": "一个极端是白天上班，靠一份工作时间固定的工作赚钱，而在闲暇时光做自己喜欢做的事。"
          },
          {
            "en": "At the other extreme you work at something till you make enough not to have to work for money again.",
            "cn": "另一个极端是先拼命赚钱，直到不再为钱发愁。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The two-job route is less common than the organic route, because it requires a deliberate choice.",
            "cn": "齐头并进法用的人比较少，因为需要事先做好周全的打算，"
          },
          {
            "en": "It's also more dangerous.",
            "cn": "而且这种方法更危险。"
          },
          {
            "en": "Life tends to get more expensive as you get older, so it's easy to get sucked into working longer than you expected at the money job.",
            "cn": "随着年龄的增长，对生活的要求也越高，所以为了赚到足够的钱，可能需要比预期更长的时间工作。"
          },
          {
            "en": "Worse still, anything you work on changes you.",
            "cn": "更糟的是，人可能会被工作内容改变。"
          },
          {
            "en": "If you work too long on tedious stuff, it will rot your brain.",
            "cn": "如果做无聊的事情太久，脑子可能就锈掉了。"
          },
          {
            "en": "And the best paying jobs are most dangerous, because they require your full attention.",
            "cn": "钱给的越多的工作越危险，因为需要付出全部的精力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The advantage of the two-job route is that it lets you jump over obstacles.",
            "cn": "齐头并进法的好处是可以让人摆脱障碍 [ 7 ]。"
          },
          {
            "en": "The landscape of possible jobs isn't flat; there are walls of varying heights between different kinds of work.",
            "cn": "职业发展不都是一片坦徒，不同工作之间的差距变化很大。"
          },
          {
            "en": "[ 7 ] The trick of maximizing the parts of your job that you like can get you from architecture to product design, but not, probably, to music.",
            "cn": "从结构设计工作转行到产品设计工作还有可能，要转向音乐方面就不太可能了。"
          },
          {
            "en": "If you make money doing one thing and then work on another, you have more freedom of choice.",
            "cn": "有两份工作的人多一分选择，尽管其中一份只为赚钱。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Which route should you take?",
            "cn": "到底该选哪条路走呢？"
          },
          {
            "en": "That depends on how sure you are of what you want to do, how good you are at taking orders, how much risk you can stand, and the odds that anyone will pay (in your lifetime) for what you want to do.",
            "cn": "这取决于你是否明确想做什么，是否擅长分清主次，能承担多大的风险，以及是否有人愿意为你喜欢做的事情付钱。"
          },
          {
            "en": "If you're sure of the general area you want to work in and it's something people are likely to pay you for, then you should probably take the organic route.",
            "cn": "如果知道自己想干什么，也知道有人愿意为此付钱，那么就选择成长渐进法。如果还不了解自己想干什么，"
          },
          {
            "en": "But if you don't know what you want to work on, or don't like to take orders, you may want to take the two-job route, if you can stand the risk.",
            "cn": "或者不喜欢非黑即白的二元逻辑，那么可以选择齐头并进法，只要你能承担由此带来的风险。"
          },
          {
            "en": "Don't decide too soon.",
            "cn": "不要太早下决定。"
          },
          {
            "en": "Kids who know early what they want to do seem impressive, as if they got the answer to some math question before the other kids.",
            "cn": "很小就知道自己未来做什么的孩子似乎让人印象深刻，就像他们比其他孩子更善于做数学题目一样。"
          },
          {
            "en": "They have an answer, certainly, but odds are it's wrong.",
            "cn": "可惜，他们得到的答案往往是错误的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A friend of mine who is a quite successful doctor complains constantly about her job.",
            "cn": "我有一位非常成功的医生朋友，她不停地抱怨自己的工作。"
          },
          {
            "en": "When people applying to medical school ask her for advice, she wants to shake them and yell \"Don't do it!\" (But she never does.) How did she get into this fix?",
            "cn": "当有人向她咨询申请医学院事宜的时候，她很想握着他们的手说“不要去”（但是她从没这么做过）。她怎么会这样呢？"
          },
          {
            "en": "In high school she already wanted to be a doctor.",
            "cn": "她在高中的时候就想成为医生，"
          },
          {
            "en": "And she is so ambitious and determined that she overcame every obstacle along the way — including, unfortunately, not liking it.",
            "cn": "而且她雄心勃勃信誓旦旦，克服了所有的困难，令人遗憾的是，"
          },
          {
            "en": "Now she has a life chosen for her by a high-school kid.",
            "cn": "她甚至克服了对这份工作的厌烦。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you're young, you're given the impression that you'll get enough information to make each choice before you need to make it.",
            "cn": "结果，她现在的生活实际上是一名高中生为她做出的选择。"
          },
          {
            "en": "But this is certainly not so with work.",
            "cn": "年轻的时候，"
          },
          {
            "en": "When you're deciding what to do, you have to operate on ridiculously incomplete information.",
            "cn": "我们相信有足够的信息事先做出选择，工作却是个例外。"
          },
          {
            "en": "Even in college you get little idea what various types of work are like.",
            "cn": "试图做出选择时，手上只有少得可怜的信息。"
          },
          {
            "en": "At best you may have a couple internships, but not all jobs offer internships, and those that do don't teach you much more about the work than being a batboy teaches you about playing baseball.",
            "cn": "即使上了大学，我们也很少知道工作到底是个什么样子。最好的情况也就是做过几次实习生，但不是所有的工作都提供实习机会，"
          },
          {
            "en": "In the design of lives, as in the design of most other things, you get better results if you use flexible media.",
            "cn": "而那些提供实习的工作，也不会教你太多东西，就好像做球童不可能学会打棒球一样。"
          },
          {
            "en": "So unless you're fairly sure what you want to do, your best bet may be to choose a type of work that could turn into either an organic or two-job career.",
            "cn": "人生规划和其它规划一样，多尝试会有更好的结果。所以，除非十分确定，最好还是选择一份可以应用成长渐进法或齐头并进法的工作。"
          },
          {
            "en": "That was probably part of the reason I chose computers.",
            "cn": "这也是我选择计算机行业的部分原因。"
          },
          {
            "en": "You can be a professor, or make a lot of money, or morph it into any number of other kinds of work.",
            "cn": "在这个行当，做教授也行，想赚很多钱也行，也可以向一些相关专业转行。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's also wise, early on, to seek jobs that let you do many different things, so you can learn faster what various kinds of work are like.",
            "cn": "尽早从事涵盖面较广的工作也是很明智的，这样就可以很快知道各种工作都是做什么的。"
          },
          {
            "en": "Conversely, the extreme version of the two-job route is dangerous because it teaches you so little about what you like.",
            "cn": "相反，极端的齐头并进法很危险，因为无法得知自己喜欢什么。"
          },
          {
            "en": "If you work hard at being a bond trader for ten years, thinking that you'll quit and write novels when you have enough money, what happens when you quit and then discover that you don't actually like writing novels?",
            "cn": "如果一个人做了十年的债券交易商，当他攒够了钱决定不再继续而转行写小说时，却发现自己并不是真得喜欢写小说，却已为时已晚。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Most people would say, I'd take that problem.",
            "cn": "多数人都会说，这好办，"
          },
          {
            "en": "Give me a million dollars and I'll figure out what to do.",
            "cn": "给我一百万，我就能弄明白该做什么。"
          },
          {
            "en": "But it's harder than it looks.",
            "cn": "但是说起来容易做起来难，"
          },
          {
            "en": "Constraints give your life shape.",
            "cn": "环境塑造人，"
          },
          {
            "en": "Remove them and most people have no idea what to do: look at what happens to those who win lotteries or inherit money.",
            "cn": "离开了自己生活的环境，多数人都会不知所措，看看那些中了彩票或继承了大笔财产的人就知道了。"
          },
          {
            "en": "Much as everyone thinks they want financial security, the happiest people are not those who have it, but those who like what they do.",
            "cn": "就像每个人都说他们在意财务安全，然而最快乐人不是那些拥有它的人，"
          },
          {
            "en": "So a plan that promises freedom at the expense of knowing what to do with it may not be as good as it seems.",
            "cn": "而是那些喜欢他们在做的事的人。这么看来，有一份明确的计划未必是件好事情。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Whichever route you take, expect a struggle.",
            "cn": "选择哪条路，是要经历一番思想斗争的。"
          },
          {
            "en": "Finding work you love is very difficult.",
            "cn": "找到喜欢做的工作很难，"
          },
          {
            "en": "Most people fail.",
            "cn": "大多数人都没能做到这一点。"
          },
          {
            "en": "Even if you succeed, it's rare to be free to work on what you want till your thirties or forties.",
            "cn": "即使能做到，也要等到三、四十岁。"
          },
          {
            "en": "But if you have the destination in sight you'll be more likely to arrive at it.",
            "cn": "但是，只要有这个愿望，就很可能会实现。"
          },
          {
            "en": "If you know you can love work, you're in the home stretch, and if you know what work you love, you're practically there.",
            "cn": "如果知道自己会喜欢工作，就胜利在望了，如果知道自己具体爱做什么工作，就已经实现了这个目标。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[ 1 ] Currently we do the opposite: when we make kids do boring work, like arithmetic drills, instead of admitting frankly that it's boring, we try to disguise it with superficial decorations.",
            "cn": "感谢 Trevor Blackwell, Dan Friedman, Sarah Harlin, Jessica Livingston, Jackie McDonough, Robert Morris, Peter Norvig, David Sloo, 以及 Aaron Swartz 阅读本文初稿。[ 1 ] 现在，我们做的恰恰相反：当我们让孩子做无聊的事情，比如算术练习，我们没有坦白地说它很无趣，而是假装它很有趣。"
          },
          {
            "en": "[ 2 ] One father told me about a related phenomenon: he found himself concealing from his family how much he liked his work.",
            "cn": "[ 2 ] 有位父亲告诉我一个相关的现象：他特意向家人隐瞒有多爱自己的工作，"
          },
          {
            "en": "When he wanted to go to work on a saturday, he found it easier to say that it was because he \"had to\" for some reason, rather than admitting he preferred to work than stay home with them.",
            "cn": "当他周末想去工作时，发现说一些不得不去的借口很容易，而不原意承认自己更原意工作，而不是和家人待在一起。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[ 3 ] Something similar happens with suburbs.",
            "cn": "[ 3 ] 郊区的情况也差不多。"
          },
          {
            "en": "Parents move to suburbs to raise their kids in a safe environment, but suburbs are so dull and artificial that by the time they're fifteen the kids are convinced the whole world is boring.",
            "cn": "父母搬到郊区，为了他们的孩子生活在安全的环境，但是郊区索然无味，不够自然，十几岁的孩子会以为整个世界都是这个样子。"
          },
          {
            "en": "[ 4 ] I'm not saying friends should be the only audience for your work.",
            "cn": "[ 4 ] 我并不是说只能跟朋友说这些事情，"
          },
          {
            "en": "The more people you can help, the better.",
            "cn": "帮忙的人越多越好，"
          },
          {
            "en": "But friends should be your compass.",
            "cn": "但是朋友的意见最重要。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[ 5 ] Donald Hall said young would-be poets were mistaken to be so obsessed with being published.",
            "cn": "[ 5 ] Donald Hall 说，那些有望成为诗人的年轻人错误地执迷于发布作品。"
          },
          {
            "en": "But you can imagine what it would do for a 24 year old to get a poem published in The New Yorker .",
            "cn": "但是你可以想象，如果一个二十四岁的年轻人在“纽约客”杂志上发表一首诗，那会是什么情形，"
          },
          {
            "en": "Now to people he meets at parties he's a real poet.",
            "cn": "他会在聚会上被当成真正的诗人，"
          },
          {
            "en": "Actually he's no better or worse than he was before, but to a clueless audience like that, the approval of an official authority makes all the difference.",
            "cn": "尽管他和从前没什么两样。但是，对于其他不知情的人，能不能在权威杂志上发表文章是有很大不同的。"
          },
          {
            "en": "So it's a harder problem than Hall realizes.",
            "cn": "所以说，实际情况比 Hall 认为的要困难。"
          },
          {
            "en": "The reason the young care so much about prestige is that the people they want to impress are not very discerning.",
            "cn": "年轻人之所以特别在乎名气，是因为他们想打动的那些大人往往搞不清楚状况。"
          },
          {
            "en": "[ 6 ] This is isomorphic to the principle that you should prevent your beliefs about how things are from being contaminated by how you wish they were.",
            "cn": "[ 6 ] 就像我们要警惕，事情不会因为我们希望它发展成什么样子就会成什么样子，"
          },
          {
            "en": "Most people let them mix pretty promiscuously.",
            "cn": "这是同样的道理。"
          },
          {
            "en": "The continuing popularity of religion is the most visible index of that.",
            "cn": "很多人分不清两者之间的区别，"
          },
          {
            "en": "[ 7 ] A more accurate metaphor would be to say that the graph of jobs is not very well connected.",
            "cn": "宗教越来越受欢迎就是证据之一。"
          },
          {
            "en": "Thanks to Trevor Blackwell, Dan Friedman, Sarah Harlin, Jessica Livingston, Jackie McDonough, Robert Morris, Peter Norvig, David Sloo, and Aaron Swartz for reading drafts of this.",
            "cn": "[ 7 ] 一个更形象的隐喻是，以各种工作为节点的图，并没有连通得很好。分享：喜欢0"
          }
        ]
      }
    ]
  },
  {
    "id": "gr-pg-how-to-do-great-work",
    "cat": "成长",
    "title": "How to Do Great Work",
    "titleZh": "如何成就卓越",
    "source": "Paul Graham · 2023-07-01",
    "date": "2023-07-01",
    "minutes": 48,
    "url": "https://www.paulgraham.com/greatwork.html",
    "cover": "linear-gradient(135deg,#bfdbfe 0%,#2563eb 100%)",
    "gradient": "linear-gradient(135deg,#bfdbfe 0%,#2563eb 100%)",
    "coverImg": null,
    "translationCredit": "中文译文：untymen.com（社区译本）",
    "paras": [
      {
        "sentences": [
          {
            "en": "If you collected lists of techniques for doing great work in a lot of different fields, what would the intersection look like?",
            "cn": "试想，若将各个领域成就卓越的方法收集起来，它们的交集会呈现出怎样的面貌？"
          },
          {
            "en": "I decided to find out by making it.",
            "cn": "为了寻找答案，我决定尝试梳理一番。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Partly my goal was to create a guide that could be used by someone working in any field.",
            "cn": "我的初衷是为各行各业的从业者提供一份通用指南。"
          },
          {
            "en": "But I was also curious about the shape of the intersection.",
            "cn": "但我同样好奇，这些方法的交集究竟为何物？"
          },
          {
            "en": "And one thing this exercise shows is that it does have a definite shape; it's not just a point labelled \"work hard.\"",
            "cn": "梳理之后，我发现其轮廓十分清晰，绝非“努力工作”这四个字所能概括。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The following recipe assumes you're very ambitious.",
            "cn": "下文是写给那些有雄心壮志之人看的。"
          },
          {
            "en": "The first step is to decide what to work on.",
            "cn": "第一步是决定“做什么”。"
          },
          {
            "en": "The work you choose needs to have three qualities: it has to be something you have a natural aptitude for, that you have a deep interest in, and that offers scope to do great work.",
            "cn": "你选择的工作需同时满足三个条件：天赋：你本就擅长此事；热情：你对它有着极深厚的兴趣；潜力：它拥有成就卓越的广阔空间。"
          },
          {
            "en": "In practice you don't have to worry much about the third criterion.",
            "cn": "实际上，你大可不必过分纠结第三点。"
          },
          {
            "en": "Ambitious people are if anything already too conservative about it.",
            "cn": "有雄心的人往往容易低估自己，行事偏于保守。"
          },
          {
            "en": "So all you need to do is find something you have an aptitude for and great interest in. [ 1 ]",
            "cn": "因此，只需专注于前两点：找到那些既能发挥你天赋，又能让你深深着迷的事。[1]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That sounds straightforward, but it's often quite difficult.",
            "cn": "这听起来简单，行之维艰。"
          },
          {
            "en": "When you're young you don't know what you're good at or what different kinds of work are like.",
            "cn": "年轻时，你往往既不了解自己的长处，也不清楚各种工作的真实面貌。"
          },
          {
            "en": "Some kinds of work you end up doing may not even exist yet.",
            "cn": "有些工作甚至尚未诞生。"
          },
          {
            "en": "So while some people know what they want to do at 14, most have to figure it out.",
            "cn": "虽有人早在 14 岁便笃定方向，但大多数人仍需在摸索中寻找答案。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The way to figure out what to work on is by working.",
            "cn": "弄清“做什么”的办法，就是动手去做。若不确定，"
          },
          {
            "en": "If you're not sure what to work on, guess.",
            "cn": "不妨先猜一个，然后付诸行动。猜错也无妨。"
          },
          {
            "en": "But pick something and get going.",
            "cn": "涉猎多领域大有裨益，"
          },
          {
            "en": "You'll probably guess wrong some of the time, but that's fine.",
            "cn": "因为伟大的发现往往诞生于不同领域的碰撞之中。"
          },
          {
            "en": "It's good to know about multiple things; some of the biggest discoveries come from noticing connections between different fields.",
            "cn": "养成做“个人项目”的习惯。别把“工作”狭隘地理解为他人指派的任务。"
          },
          {
            "en": "Develop a habit of working on your own projects.",
            "cn": "若哪天你真做出了不起的成就，"
          },
          {
            "en": "Don't let \"work\" mean something other people tell you to do.",
            "cn": "它很可能源自你自己的项目。"
          },
          {
            "en": "If you do manage to do great work one day, it will probably be on a project of your own.",
            "cn": "哪怕它隶属于某个大工程，你也必须是那一小块领地的绝对主宰。"
          },
          {
            "en": "It may be within some bigger project, but you'll be driving your part of it.",
            "cn": "项目该怎么选？选那些既让你兴奋、又足以承载野心的。"
          },
          {
            "en": "What should your projects be?",
            "cn": "随着年龄增长，"
          },
          {
            "en": "Whatever seems to you excitingly ambitious.",
            "cn": "你的品味会进化，"
          },
          {
            "en": "As you grow older and your taste in projects evolves, exciting and important will converge.",
            "cn": "“令人兴奋”和“重要”这两点终将合流。"
          },
          {
            "en": "At 7 it may seem excitingly ambitious to build huge things out of Lego, then at 14 to teach yourself calculus, till at 21 you're starting to explore unanswered questions in physics.",
            "cn": "7 岁时，用乐高搭建巨型城堡可能就是野心；14 岁时是自学微积分；到了 21 岁，则是探索物理学中的未解之谜。但无论何时，"
          },
          {
            "en": "But always preserve excitingness.",
            "cn": "请务必呵护那份兴奋感。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There's a kind of excited curiosity that's both the engine and the rudder of great work.",
            "cn": "有一种令人兴奋的好奇心，它既是成就卓越的引擎，"
          },
          {
            "en": "It will not only drive you, but if you let it have its way, will also show you what to work on.",
            "cn": "也是舵手。只要追随它，它不仅会驱动你前行，还会指引你的去向。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What are you excessively curious about — curious to a degree that would bore most other people?",
            "cn": "有什么事是旁人倍感无聊，你却兴致盎然的？"
          },
          {
            "en": "That's what you're looking for.",
            "cn": "这就是你要找的答案。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Once you've found something you're excessively interested in, the next step is to learn enough about it to get you to one of the frontiers of knowledge.",
            "cn": "一旦锁定了那个让你极度着迷的领域，下一步就是通过学习，抵达人类知识的疆界。"
          },
          {
            "en": "Knowledge expands fractally, and from a distance its edges look smooth, but once you learn enough to get close to one, they turn out to be full of gaps.",
            "cn": "知识具有分形（Fractal）结构：远观轮廓平滑，一旦你掌握了足够多的知识并逼近边界，就会发现那里其实布满了缺口。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The next step is to notice them.",
            "cn": "接下来的任务便是去“看见”这些缺口。"
          },
          {
            "en": "This takes some skill, because your brain wants to ignore such gaps in order to make a simpler model of the world.",
            "cn": "这需要技巧，因为大脑为了构建简化的世界模型，倾向于忽略它们。"
          },
          {
            "en": "Many discoveries have come from asking questions about things that everyone else took for granted. [ 2 ]",
            "cn": "许多伟大的发现，正是源于对既定认知的质疑。[2]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If the answers seem strange, so much the better.",
            "cn": "如果答案看起来很怪异，那再好不过。"
          },
          {
            "en": "Great work often has a tincture of strangeness.",
            "cn": "伟大的工作往往都带有一丝奇异色彩。"
          },
          {
            "en": "You see this from painting to math.",
            "cn": "无论是绘画还是数学，都是如此。"
          },
          {
            "en": "It would be affected to try to manufacture it, but if it appears, embrace it.",
            "cn": "不必刻意猎奇，但若它自然出现，请欣然拥抱。"
          },
          {
            "en": "Boldly chase outlier ideas, even if other people aren't interested in them — in fact, especially if they aren't.",
            "cn": "大胆追逐那些“离群”的想法，即使——或者说尤其是——其他人都不感兴趣时。"
          },
          {
            "en": "If you're excited about some possibility that everyone else ignores, and you have enough expertise to say precisely what they're all overlooking, that's as good a bet as you'll find. [ 3 ]",
            "cn": "如果你对某种可能性感到兴奋，而旁人视而不见，且你有足够的专业知识指出他们的疏漏，那么这很可能就是你一直在寻找的最佳良机。[3]"
          },
          {
            "en": "Four steps: choose a field, learn enough to get to the frontier, notice gaps, explore promising ones.",
            "cn": "选定领域；学至前沿；发现缺口；探索有希望的缺口。"
          },
          {
            "en": "This is how practically everyone who's done great work has done it, from painters to physicists.",
            "cn": "从画家到物理学家，几乎所有成就卓越者都遵循此道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Steps two and four will require hard work.",
            "cn": "第二步和第四步需要艰苦卓绝的努力。"
          },
          {
            "en": "It may not be possible to prove that you have to work hard to do great things, but the empirical evidence is on the scale of the evidence for mortality.",
            "cn": "虽然未必能从逻辑上证明“卓越必须苦干”，但经验法则就如同生老病死般确凿。"
          },
          {
            "en": "That's why it's essential to work on something you're deeply interested in.",
            "cn": "正因如此，你必须从事自己深感兴趣的工作。"
          },
          {
            "en": "Interest will drive you to work harder than mere diligence ever could.",
            "cn": "比起纯粹的勤奋，兴趣才是驱动你全力以赴的更强动力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The three most powerful motives are curiosity, delight, and the desire to do something impressive.",
            "cn": "好奇心、愉悦感，以及成就伟业的渴望，是三股最强大的驱动力。"
          },
          {
            "en": "Sometimes they converge, and that combination is the most powerful of all.",
            "cn": "当这三者交汇，爆发出的能量将无穷无尽。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The big prize is to discover a new fractal bud.",
            "cn": "终极奖赏在于发现一个新的“分形芽”。"
          },
          {
            "en": "You notice a crack in the surface of knowledge, pry it open, and there's a whole world inside.",
            "cn": "你在知识的表面窥见一道裂缝，撬开它，里面竟藏着一个全新的世界。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Let's talk a little more about the complicated business of figuring out what to work on.",
            "cn": "让我们深入审视“决定做什么”这道难题。"
          },
          {
            "en": "The main reason it's hard is that you can't tell what most kinds of work are like except by doing them.",
            "cn": "其棘手之处在于，除了亲身试错，你很难真正洞悉一份工作的全貌。"
          },
          {
            "en": "Which means the four steps overlap: you may have to work at something for years before you know how much you like it or how good you are at it.",
            "cn": "这意味着前述的四个步骤往往是交织重叠的：你可能需要投入数年，方能知晓自己是否真心喜爱、或擅长某事。"
          },
          {
            "en": "And in the meantime you're not doing, and thus not learning about, most other kinds of work.",
            "cn": "而在此时段内，你无暇旁骛，自然也就无从了解其他选项。最坏的情况莫过于，"
          },
          {
            "en": "So in the worst case you choose late based on very incomplete information. [ 4 ]",
            "cn": "当你终于做出选择时，赖以决策的信息依然残缺不全。[4]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The nature of ambition exacerbates this problem.",
            "cn": "野心的本质加剧了这一困境。"
          },
          {
            "en": "Ambition comes in two forms, one that precedes interest in the subject and one that grows out of it.",
            "cn": "野心分两种：一种先于兴趣存在，一种由兴趣滋生。"
          },
          {
            "en": "Most people who do great work have a mix, and the more you have of the former, the harder it will be to decide what to do.",
            "cn": "大多数成就卓越者兼而有之，但前一种野心越重，决策便越难。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The educational systems in most countries pretend it's easy.",
            "cn": "各国教育系统大多对这一难题粉饰太平。"
          },
          {
            "en": "They expect you to commit to a field long before you could know what it's really like.",
            "cn": "它们强迫你在窥见学科全貌之前便选定方向。"
          },
          {
            "en": "And as a result an ambitious person on an optimal trajectory will often read to the system as an instance of breakage.",
            "cn": "结果导致，一个本在最优路径上行进的有志青年，往往被系统判定为“异类”或“残次品”。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It would be better if they at least admitted it — if they admitted that the system not only can't do much to help you figure out what to work on, but is designed on the assumption that you'll somehow magically guess as a teenager.",
            "cn": "若教育系统能坦诚相告就好了——承认它不仅爱莫能助，其设计初衷更是建立在“青少年能奇迹般猜对方向”这一假设之上。"
          },
          {
            "en": "They don't tell you, but I will: when it comes to figuring out what to work on, you're on your own.",
            "cn": "它们不会告诉你，但我会：在决定“做什么”这件事上，你只能孤军奋战。"
          },
          {
            "en": "Some people get lucky and do guess correctly, but the rest will find themselves scrambling diagonally across tracks laid down on the assumption that everyone does.",
            "cn": "有些人运气好猜对了，而剩下的人，只能在一条预设所有人都已选对的轨道上，逆势横穿，踉跄前行。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What should you do if you're young and ambitious but don't know what to work on?",
            "cn": "如果你年轻、雄心勃勃却又迷茫无措，该怎么办？"
          },
          {
            "en": "What you should not do is drift along passively, assuming the problem will solve itself.",
            "cn": "最忌讳的便是随波逐流，妄想问题会自行消解。"
          },
          {
            "en": "You need to take action.",
            "cn": "你必须行动。"
          },
          {
            "en": "But there is no systematic procedure you can follow.",
            "cn": "但这并无标准定式。"
          },
          {
            "en": "When you read biographies of people who've done great work, it's remarkable how much luck is involved.",
            "cn": "读读伟人传记，你会惊讶地发现“运气”占据了多大比重。"
          },
          {
            "en": "They discover what to work on as a result of a chance meeting, or by reading a book they happen to pick up.",
            "cn": "一次偶遇、一本闲书，都可能成为指路明灯。"
          },
          {
            "en": "So you need to make yourself a big target for luck, and the way to do that is to be curious.",
            "cn": "因此，你需要让自己成为好运容易命中的“靶子”，而方法就是保持好奇。"
          },
          {
            "en": "Try lots of things, meet lots of people, read lots of books, ask lots of questions. [ 5 ]",
            "cn": "多尝试，多见人，多读书，多提问。[5]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When in doubt, optimize for interestingness.",
            "cn": "犹豫不决时，"
          },
          {
            "en": "Fields change as you learn more about them.",
            "cn": "优先选择“有趣”的那个。"
          },
          {
            "en": "What mathematicians do, for example, is very different from what you do in high school math classes.",
            "cn": "随着了解深入，领域面貌也会随之改变。数学家真正所做的工作，"
          },
          {
            "en": "So you need to give different types of work a chance to show you what they're like.",
            "cn": "与高中数学课截然不同。所以，给不同类型的工作一个展露真容的机会。"
          },
          {
            "en": "But a field should become increasingly interesting as you learn more about it.",
            "cn": "如果你学得越多越觉有趣，那便对了；"
          },
          {
            "en": "If it doesn't, it's probably not for you.",
            "cn": "反之，它可能并非良配。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Don't worry if you find you're interested in different things than other people.",
            "cn": "若你的兴趣点异于常人，别担心。"
          },
          {
            "en": "The stranger your tastes in interestingness, the better.",
            "cn": "品味越怪，越是好事。"
          },
          {
            "en": "Strange tastes are often strong ones, and a strong taste for work means you'll be productive.",
            "cn": "怪诞的品味通常意味着强烈的热爱，而热爱是高效产出的前提。"
          },
          {
            "en": "And you're more likely to find new things if you're looking where few have looked before.",
            "cn": "况且，在人迹罕至之地，你更有可能发现新大陆。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One sign that you're suited for some kind of work is when you like even the parts that other people find tedious or frightening.",
            "cn": "判断你是否适合某项工作的一个试金石是：哪怕是旁人觉得枯燥甚至畏惧的部分，你也乐在其中。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But fields aren't people; you don't owe them any loyalty.",
            "cn": "但领域不是人，你无需对它们“忠诚”。"
          },
          {
            "en": "If in the course of working on one thing you discover another that's more exciting, don't be afraid to switch.",
            "cn": "若在研究某事的过程中发现了更令人兴奋的新方向，别害怕，尽管去追。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you're making something for people, make sure it's something they actually want.",
            "cn": "如果你的工作是创造事物，请确保那是人们真正想要的。"
          },
          {
            "en": "The best way to do this is to make something you yourself want.",
            "cn": "最佳捷径便是做你自己想用的东西。"
          },
          {
            "en": "Write the story you want to read; build the tool you want to use.",
            "cn": "写你想读的故事，造你想用的工具。"
          },
          {
            "en": "Since your friends probably have similar interests, this will also get you your initial audience.",
            "cn": "既然你的朋友往往与你志趣相投，这也能助你获得最初的用户群。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This should follow from the excitingness rule.",
            "cn": "这其实契合了“兴奋感法则”。"
          },
          {
            "en": "Obviously the most exciting story to write will be the one you want to read.",
            "cn": "显而易见，写起来最让你兴奋的故事，正是你自己最想读的那一个。"
          },
          {
            "en": "The reason I mention this case explicitly is that so many people get it wrong.",
            "cn": "我之所以特意强调此点，是因为太多人本末倒置。"
          },
          {
            "en": "Instead of making what they want, they try to make what some imaginary, more sophisticated audience wants.",
            "cn": "他们不去做自己想要的，而是试图迎合某个想象中更为“高深”的受众群体。"
          },
          {
            "en": "And once you go down that route, you're lost. [ 6 ]",
            "cn": "一旦踏上这条歧途，你便离迷失不远了。"
          },
          {
            "en": "There are a lot of forces that will lead you astray when you're trying to figure out what to work on.",
            "cn": "[6]在寻路途中，有太多力量试图引你偏航：自命不凡、盲目跟风、恐惧心理、金钱诱惑、政治因素、"
          },
          {
            "en": "Pretentiousness, fashion, fear, money, politics, other people's wishes, eminent frauds.",
            "cn": "他人期许，以及那些赫赫有名的欺世盗名之徒。"
          },
          {
            "en": "But if you stick to what you find genuinely interesting, you'll be proof against all of them.",
            "cn": "但只要坚守你真正感兴趣的事物，这一切都无法撼动你。"
          },
          {
            "en": "If you're interested, you're not astray.",
            "cn": "只要兴趣尚存，你就未曾迷路。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Following your interests may sound like a rather passive strategy, but in practice it usually means following them past all sorts of obstacles.",
            "cn": "循兴趣而行，初听似乎是被动的策略，但在实践中，这往往意味着你要追随兴趣，跨越重重阻碍。"
          },
          {
            "en": "You usually have to risk rejection and failure.",
            "cn": "你常需直面被拒与失败的风险。"
          },
          {
            "en": "So it does take a good deal of boldness.",
            "cn": "因此，这实则需要极大的 胆识。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But while you need boldness, you don't usually need much planning.",
            "cn": "胆识虽不可或缺，周详的规划却往往多余。"
          },
          {
            "en": "In most cases the recipe for doing great work is simply: work hard on excitingly ambitious projects, and something good will come of it.",
            "cn": "多数情况下，成就卓越的秘诀非常简单：在那些既令人兴奋又充满野心的项目上努力工作，好事自会发生。"
          },
          {
            "en": "Instead of making a plan and then executing it, you just try to preserve certain invariants.",
            "cn": "与其制定缜密的计划并刻板执行，不如坚守几条核心的“不变量”（invariants）。"
          },
          {
            "en": "The trouble with planning is that it only works for achievements you can describe in advance.",
            "cn": "规划的弊病在于，它仅适用于那些可被预先定义的成就。"
          },
          {
            "en": "You can win a gold medal or get rich by deciding to as a child and then tenaciously pursuing that goal, but you can't discover natural selection that way.",
            "cn": "若你立志夺得金牌或发家致富，凭坚韧执行确有望达成；但你无法以此发现“自然选择”定律。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think for most people who want to do great work, the right strategy is not to plan too much.",
            "cn": "我认为对于大多数渴望成就卓越的人来说，最佳策略是 切勿过度规划。"
          },
          {
            "en": "At each stage do whatever seems most interesting and gives you the best options for the future.",
            "cn": "在每一阶段，只做当时觉得最有趣、且最能为未来增加选项的事。"
          },
          {
            "en": "I call this approach \"staying upwind.\" This is how most people who've done great work seem to have done it.",
            "cn": "我称之为“保持上风”（staying upwind）。这似乎是大多数成就卓越者不约而同走出的路径。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Even when you've found something exciting to work on, working on it is not always straightforward.",
            "cn": "即使找到了令人兴奋的方向，实际执行起来也未必总是一帆风顺。"
          },
          {
            "en": "There will be times when some new idea makes you leap out of bed in the morning and get straight to work.",
            "cn": "有时，新想法会让你清晨一跃而起，迫不及待地开工；"
          },
          {
            "en": "But there will also be plenty of times when things aren't like that.",
            "cn": "但也不乏万事滞涩的时刻。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You don't just put out your sail and get blown forward by inspiration.",
            "cn": "你不能指望升起帆，便坐等灵感之风送你抵达终点。"
          },
          {
            "en": "There are headwinds and currents and hidden shoals.",
            "cn": "海上有逆风、暗流，亦有暗礁。"
          },
          {
            "en": "So there's a technique to working, just as there is to sailing.",
            "cn": "工作如航海，是讲究技术的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For example, while you must work hard, it's possible to work too hard, and if you do that you'll find you get diminishing returns: fatigue will make you stupid, and eventually even damage your health.",
            "cn": "例如，虽需努力，但也存在“过犹不及”一说。一旦越界，便会出现边际效益递减：疲劳会让你变得迟钝，甚至损害健康。"
          },
          {
            "en": "The point at which work yields diminishing returns depends on the type.",
            "cn": "边际效益递减的临界点取决于工作类型。"
          },
          {
            "en": "Some of the hardest types you might only be able to do for four or five hours a day.",
            "cn": "对于那些最耗神的工作，你一天的高效时间或许只有四五个小时。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Ideally those hours will be contiguous.",
            "cn": "理想情况下，这些时间应是连续的。"
          },
          {
            "en": "To the extent you can, try to arrange your life so you have big blocks of time to work in.",
            "cn": "生活安排应尽量留出大块的整段时间。若预感到随时会被打断，"
          },
          {
            "en": "You'll shy away from hard tasks if you know you might be interrupted.",
            "cn": "你就会下意识地规避那些艰难的任务。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It will probably be harder to start working than to keep working.",
            "cn": "“启动”往往比“持续”更难。"
          },
          {
            "en": "You'll often have to trick yourself to get over that initial threshold.",
            "cn": "你经常需要哄骗自己一下，以跨过最初的门槛。"
          },
          {
            "en": "Don't worry about this; it's the nature of work, not a flaw in your character.",
            "cn": "别担心，这是工作的固有属性，并非你性格有缺。"
          },
          {
            "en": "Work has a sort of activation energy, both per day and per project.",
            "cn": "工作存在一种“活化能”（activation energy），无论是按天还是按项目计算皆是如此。"
          },
          {
            "en": "And since this threshold is fake in the sense that it's higher than the energy required to keep going, it's ok to tell yourself a lie of corresponding magnitude to get over it.",
            "cn": "既然此门槛在某种意义上是虚构的（因为启动所需的能量高于维持运转所需的能量），那么为了跨越它，"
          },
          {
            "en": "It's usually a mistake to lie to yourself if you want to do great work, but this is one of the rare cases where it isn't.",
            "cn": "撒一个等量的谎亦无不可。若想成就伟大的工作，自欺欺人通常是大忌，但这是一个罕见的例外。"
          },
          {
            "en": "When I'm reluctant to start work in the morning, I often trick myself by saying \"I'll just read over what I've got so far.\" Five minutes later I've found something that seems mistaken or incomplete, and I'm off.",
            "cn": "若我清晨不愿开工，常骗自己说：“我就把现有的稿子读一遍。” 五分钟后，我不免发现些许错误或遗漏，工作也就自然而然地启动了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Similar techniques work for starting new projects.",
            "cn": "类似的技巧也适用于启动新项目。"
          },
          {
            "en": "It's ok to lie to yourself about how much work a project will entail, for example.",
            "cn": "比如，对所需的工作量撒点谎也无伤大雅。"
          },
          {
            "en": "Lots of great things began with someone saying \"How hard could it be?\"",
            "cn": "许多伟大的成就都始于这句名言：“这能有多难？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This is one case where the young have an advantage.",
            "cn": "这是年轻人拥有优势的一个特例。"
          },
          {
            "en": "They're more optimistic, and even though one of the sources of their optimism is ignorance, in this case ignorance can sometimes beat knowledge.",
            "cn": "他们更乐观，虽说这种乐观部分源于无知，但在此刻，无知有时竟能胜过博学。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Try to finish what you start, though, even if it turns out to be more work than you expected.",
            "cn": "不过，一旦开始，就要尽力完成，哪怕工作量超出了预期。"
          },
          {
            "en": "Finishing things is not just an exercise in tidiness or self-discipline.",
            "cn": "善始善终不仅关乎整洁与自律。"
          },
          {
            "en": "In many projects a lot of the best work happens in what was meant to be the final stage.",
            "cn": "在许多项目中，最精彩的发现往往诞生于原以为是收尾的阶段。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another permissible lie is to exaggerate the importance of what you're working on, at least in your own mind.",
            "cn": "另一个被允许的谎言是，夸大你手头工作的重要性——至少在你自己心里。"
          },
          {
            "en": "If that helps you discover something new, it may turn out not to have been a lie after all. [ 7 ]",
            "cn": "如果这能助你发现新事物，那它最终可能就不再是一个谎言了。[7]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Since there are two senses of starting work — per day and per project — there are also two forms of procrastination.",
            "cn": "既然工作的启动可分为“按日”和“按项目”两类，拖延症便也有两种形式。"
          },
          {
            "en": "Per-project procrastination is far the more dangerous.",
            "cn": "其中，“项目型拖延”尤为凶险。"
          },
          {
            "en": "You put off starting that ambitious project from year to year because the time isn't quite right.",
            "cn": "你年复一年地推迟那个宏大的计划，总以此际“时机未到”自我开脱。"
          },
          {
            "en": "When you're procrastinating in units of years, you can get a lot not done. [ 8 ]",
            "cn": "一旦拖延的单位变成了“年”，你错失的将不可估量。[8]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One reason per-project procrastination is so dangerous is that it usually camouflages itself as work.",
            "cn": "“项目型拖延”之所以致命，因其常披着“工作”的外衣。"
          },
          {
            "en": "You're not just sitting around doing nothing; you're working industriously on something else.",
            "cn": "你并非游手好闲，甚至可能正兢兢业业地处理着其他琐事。"
          },
          {
            "en": "So per-project procrastination doesn't set off the alarms that per-day procrastination does.",
            "cn": "因此，它不会像“按日拖延”那样触发警报。你太忙了，"
          },
          {
            "en": "You're too busy to notice it.",
            "cn": "以至于根本没意识到自己在拖延。"
          },
          {
            "en": "The way to beat it is to stop occasionally and ask yourself: Am I working on what I most want to work on?",
            "cn": "破解之法是时不时停下来自问：我正在做那件我最想做的事吗？"
          },
          {
            "en": "When you're young it's ok if the answer is sometimes no, but this gets increasingly dangerous as you get older. [ 9 ]",
            "cn": "年轻时，答“否”尚可原谅；但随着年岁渐长，这个答案将愈发危险。[9]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Great work usually entails spending what would seem to most people an unreasonable amount of time on a problem.",
            "cn": "伟大的工作，往往意味着在一个问题上投入常人眼中“不合理”的时间。"
          },
          {
            "en": "You can't think of this time as a cost, or it will seem too high.",
            "cn": "你不能将其视作代价，否则这笔账未免太不划算。"
          },
          {
            "en": "You have to find the work sufficiently engaging as it's happening.",
            "cn": "你必须在过程中就感受到其迷人之处。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There may be some jobs where you have to work diligently for years at things you hate before you get to the good part, but this is not how great work happens.",
            "cn": "诚然，有些工作需先忍受多年的枯燥方能苦尽甘来，但这并非成就卓越的通途。"
          },
          {
            "en": "Great work happens by focusing consistently on something you're genuinely interested in.",
            "cn": "卓越源于持续专注于你真正感兴趣的事物。"
          },
          {
            "en": "When you pause to take stock, you're surprised how far you've come.",
            "cn": "当你驻足回望，往往会惊讶于自己竟已行进至此。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The reason we're surprised is that we underestimate the cumulative effect of work.",
            "cn": "我们之所以惊讶，是因为低估了工作的累积之功。"
          },
          {
            "en": "Writing a page a day doesn't sound like much, but if you do it every day you'll write a book a year.",
            "cn": "日写一页书听起来微不足道，但坚持一年便是一部书稿。关键在于："
          },
          {
            "en": "That's the key: consistency.",
            "cn": "持之以恒 （Consistency）。"
          },
          {
            "en": "People who do great things don't get a lot done every day.",
            "cn": "成大事者并非日日操劳过度，而是日日未曾间断，"
          },
          {
            "en": "They get something done, rather than nothing.",
            "cn": "而非三天打鱼两天晒网。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you do work that compounds, you'll get exponential growth.",
            "cn": "若你从事的是具有复利效应的工作，"
          },
          {
            "en": "Most people who do this do it unconsciously, but it's worth stopping to think about.",
            "cn": "将收获指数级的爆发。大多数人是在无意识中做到的，"
          },
          {
            "en": "Learning, for example, is an instance of this phenomenon: the more you learn about something, the easier it is to learn more.",
            "cn": "但这值得我们驻足深思。学习便是此例：知之愈多，学之愈易。"
          },
          {
            "en": "Growing an audience is another: the more fans you have, the more new fans they'll bring you.",
            "cn": "积累受众亦是如此：粉丝越多，带来的新粉丝便越多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The trouble with exponential growth is that the curve feels flat in the beginning.",
            "cn": "指数增长的陷阱在于，曲线初期看似平缓。实则不然，"
          },
          {
            "en": "It isn't; it's still a wonderful exponential curve.",
            "cn": "它依然是美妙的指数曲线。"
          },
          {
            "en": "But we can't grasp that intuitively, so we underrate exponential growth in its early stages.",
            "cn": "但我们的直觉无法捕捉微小的起势，因此往往低估了初期的增长。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Something that grows exponentially can become so valuable that it's worth making an extraordinary effort to get it started.",
            "cn": "具有指数潜力的事物价值连城，值得付出非凡努力去启动。"
          },
          {
            "en": "But since we underrate exponential growth early on, this too is mostly done unconsciously: people push through the initial, unrewarding phase of learning something new because they know from experience that learning new things always takes an initial push, or they grow their audience one fan at a time because they have nothing better to do.",
            "cn": "但正因初期常被看轻，这通常也是在无意识中完成的：人们熬过学习新知初期那段毫无回报的阶段，是因经验告知这只是暂时；或者他们一个接一个地积累粉丝，仅仅是因为当时无事可做。"
          },
          {
            "en": "If people consciously realized they could invest in exponential growth, many more would do it.",
            "cn": "若人们能有意识地认知到投资“指数级增长”的价值，定会有更多人投身其中。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Work doesn't just happen when you're trying to.",
            "cn": "工作并不止于伏案苦干之时。"
          },
          {
            "en": "There's a kind of undirected thinking you do when walking or taking a shower or lying in bed that can be very powerful.",
            "cn": "当你散步、沐浴或安寝时，发散的思维往往力大无穷。"
          },
          {
            "en": "By letting your mind wander a little, you'll often solve problems you were unable to solve by frontal attack.",
            "cn": "让思绪片刻游离，常能解开正面强攻无解的难题。但是，若想从中受益，"
          },
          {
            "en": "You have to be working hard in the normal way to benefit from this phenomenon, though.",
            "cn": "先决条件是常态化的努力工作。你不能光是漫无目的地做白日梦。"
          },
          {
            "en": "You can't just walk around daydreaming.",
            "cn": "白日梦必须与“刻意工作”交替进行，"
          },
          {
            "en": "The daydreaming has to be interleaved with deliberate work that feeds it questions. [ 10 ]",
            "cn": "因为后者负责为前者提供素材与问题。[10]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Everyone knows to avoid distractions at work, but it's also important to avoid them in the other half of the cycle.",
            "cn": "众皆知工作时需心无旁骛，殊不知在循环的另一半（休息/发散）中避免分心同样关键。"
          },
          {
            "en": "When you let your mind wander, it wanders to whatever you care about most at that moment.",
            "cn": "当思绪游离，它会飘向你此刻最挂怀之事。"
          },
          {
            "en": "So avoid the kind of distraction that pushes your work out of the top spot, or you'll waste this valuable type of thinking on the distraction instead.",
            "cn": "因此，切勿让琐事将“工作”挤出你大脑关注度的榜首，否则你便将这宝贵的思维模式浪费在鸡毛蒜皮上了。（唯一的例外是："
          },
          {
            "en": "(Exception: Don't avoid love.)",
            "cn": "切莫回避爱情。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Consciously cultivate your taste in the work done in your field.",
            "cn": "要有意识地培养对本领域工作的品味。"
          },
          {
            "en": "Until you know which is the best and what makes it so, you don't know what you're aiming for.",
            "cn": "直至知晓何为最佳、因何最佳，方知瞄准何处。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And that is what you're aiming for, because if you don't try to be the best, you won't even be good.",
            "cn": "这必须是你的目标，因为若不试着成为最佳，你甚至连“好”都做不到。"
          },
          {
            "en": "This observation has been made by so many people in so many different fields that it might be worth thinking about why it's true.",
            "cn": "这一现象在众多领域被反复验证，值得深思。或许是因为在“野心”这件事上，"
          },
          {
            "en": "It could be because ambition is a phenomenon where almost all the error is in one direction — where almost all the shells that miss the target miss by falling short.",
            "cn": "几乎所有的误差都是单向的——几乎所有脱靶的子弹皆因射程不够（而非瞄得太高）。"
          },
          {
            "en": "Or it could be because ambition to be the best is a qualitatively different thing from ambition to be good.",
            "cn": "或许是因为“想成为最好”与“想做得不错”有着质的区别。"
          },
          {
            "en": "Or maybe being good is simply too vague a standard.",
            "cn": "又或许仅仅是因为“做得不错”这一标准太过模糊。"
          },
          {
            "en": "Probably all three are true. [ 11 ]",
            "cn": "大概三者皆有之。[11]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Fortunately there's a kind of economy of scale here.",
            "cn": "所幸，此处存在一种规模经济。"
          },
          {
            "en": "Though it might seem like you'd be taking on a heavy burden by trying to be the best, in practice you often end up net ahead.",
            "cn": "虽说试图成为最好像是负重前行，但实则净收益往往更高。它令人兴奋，更反而带来一种奇异的自由感。"
          },
          {
            "en": "It's exciting, and also strangely liberating.",
            "cn": "它让事情变得简单。"
          },
          {
            "en": "It simplifies things.",
            "cn": "从某种角度看，"
          },
          {
            "en": "In some ways it's easier to try to be the best than to try merely to be good.",
            "cn": "试图成为最佳，反倒比试图仅仅做得不错要容易得多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One way to aim high is to try to make something that people will care about in a hundred years.",
            "cn": "一个拔高目标的方法是：试着做出百年之后人们依然在乎的东西。"
          },
          {
            "en": "Not because their opinions matter more than your contemporaries', but because something that still seems good in a hundred years is more likely to be genuinely good.",
            "cn": "这并非因为后人的看法比同时代人更重要，而是因为经得起百年考验的东西，更可能是真正的好东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Don't try to work in a distinctive style.",
            "cn": "不要刻意追求独特的风格。"
          },
          {
            "en": "Just try to do the best job you can; you won't be able to help doing it in a distinctive way.",
            "cn": "你只需全力以赴做到最好，独特的风格自然会随之而来，你想拦都拦不住。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Style is doing things in a distinctive way without trying to.",
            "cn": "所谓的“风格”，就是你在不经意间做事的独特方式。"
          },
          {
            "en": "Trying to is affectation.",
            "cn": "刻意为之，那是 矫揉造作 （Affectation）。"
          },
          {
            "en": "Affectation is in effect to pretend that someone other than you is doing the work.",
            "cn": "矫揉造作，本质上是在假装“不是你”的人在做这份工作。"
          },
          {
            "en": "You adopt an impressive but fake persona, and while you're pleased with the impressiveness, the fakeness is what shows in the work. [ 12 ]",
            "cn": "你戴上了一副令人印象深刻但虚假的面具。虽然你对那副面具很满意，但最终显露在作品里的，只有那份“虚假”。"
          },
          {
            "en": "The temptation to be someone else is greatest for the young.",
            "cn": "[12]年轻人最容易陷入这种诱惑，想变成别人。"
          },
          {
            "en": "They often feel like nobodies.",
            "cn": "因为他们觉得自己是个无名小卒。"
          },
          {
            "en": "But you never need to worry about that problem, because it's self-solving if you work on sufficiently ambitious projects.",
            "cn": "但你完全不必为此焦虑，只要你致力于足够有野心的项目，这个问题便会迎刃而解。"
          },
          {
            "en": "If you succeed at an ambitious project, you're not a nobody; you're the person who did it.",
            "cn": "一旦你在这样的项目上取得成功，你就不再是无名小卒，"
          },
          {
            "en": "So just do the work and your identity will take care of itself.",
            "cn": "而是“那个做成了这件事的人”。只管去做，你的身份自然会确立。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Avoid affectation\" is a useful rule so far as it goes, but how would you express this idea positively?",
            "cn": "“避免矫揉造作”是个有用的负面规则，但如果我们要用正面的语言来表达呢？"
          },
          {
            "en": "How would you say what to be, instead of what not to be?",
            "cn": "如果不说“不要做什么”，而说“要做什么”呢？"
          },
          {
            "en": "The best answer is earnest.",
            "cn": "最好的答案是：真诚 （Earnest）。"
          },
          {
            "en": "If you're earnest you avoid not just affectation but a whole set of similar vices.",
            "cn": "如果你足够真诚，你不仅能避免矫揉造作，还能避开一大堆类似的毛病。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The core of being earnest is being intellectually honest.",
            "cn": "真诚的核心是 智识上的诚实 （Intellectual Honesty）。"
          },
          {
            "en": "We're taught as children to be honest as an unselfish virtue — as a kind of sacrifice.",
            "cn": "小时候，我们被教育诚实是一种无私的美德，是一种牺牲。"
          },
          {
            "en": "But in fact it's a source of power too.",
            "cn": "但事实上，诚实也是一种力量的源泉。"
          },
          {
            "en": "To see new ideas, you need an exceptionally sharp eye for the truth.",
            "cn": "要发现新观点，你需要一双极其锐利、能洞察真相的眼睛。"
          },
          {
            "en": "You're trying to see more truth than others have seen so far.",
            "cn": "你正试图看到别人未曾看到的真相。"
          },
          {
            "en": "And how can you have a sharp eye for the truth if you're intellectually dishonest?",
            "cn": "如果你在智识上不诚实，又怎能拥有这双锐眼？"
          },
          {
            "en": "One way to avoid intellectual dishonesty is to maintain a slight positive pressure in the opposite direction.",
            "cn": "避免智识不诚实的一个方法是，在反方向上保持一点“正压”。"
          },
          {
            "en": "Be aggressively willing to admit that you're mistaken.",
            "cn": "要极其主动地承认自己的错误。"
          },
          {
            "en": "Once you've admitted you were mistaken about something, you're free.",
            "cn": "一旦承认了某个错误，你就自由了；"
          },
          {
            "en": "Till then you have to carry it. [ 13 ]",
            "cn": "否则，你得一直背着它。"
          },
          {
            "en": "Another more subtle component of earnestness is informality.",
            "cn": "[13]真诚的另一个更微妙的成分是 不拘形式 （Informality）。"
          },
          {
            "en": "Informality is much more important than its grammatically negative name implies.",
            "cn": "它的重要性远超其字面上的“否定”意味所暗示的。"
          },
          {
            "en": "It's not merely the absence of something.",
            "cn": "它不仅仅是指某种规矩的 缺失，"
          },
          {
            "en": "It means focusing on what matters instead of what doesn't.",
            "cn": "而是指：专注于重要之事，忽略无关紧要之事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What formality and affectation have in common is that as well as doing the work, you're trying to seem a certain way as you're doing it.",
            "cn": "形式主义和矫揉造作的共同点在于：你在做事的同时，还试图在做的过程中表现出某种特定的样子。"
          },
          {
            "en": "But any energy that goes into how you seem comes out of being good.",
            "cn": "但任何用于“装样子”的能量，都是从“把事做好”的能量中抽走的。"
          },
          {
            "en": "That's one reason nerds have an advantage in doing great work: they expend little effort on seeming anything.",
            "cn": "这就是为什么极客（Nerds）在成就卓越方面拥有优势：他们很少花心思去装样子。"
          },
          {
            "en": "In fact that's basically the definition of a nerd.",
            "cn": "事实上，这基本就是“极客”的定义。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Nerds have a kind of innocent boldness that's exactly what you need in doing great work.",
            "cn": "极客拥有一种天真的莽撞，这正是成就卓越所急需的。这种特质不是学来的，"
          },
          {
            "en": "It's not learned; it's preserved from childhood.",
            "cn": "而是从童年保留下来的。"
          },
          {
            "en": "So hold onto it.",
            "cn": "所以，请守住它。"
          },
          {
            "en": "Be the one who puts things out there rather than the one who sits back and offers sophisticated-sounding criticisms of them.",
            "cn": "做一个把东西做出来并公之于众的人，而不是坐在后面发表高深批评的人。"
          },
          {
            "en": "\"It's easy to criticize\" is true in the most literal sense, and the route to great work is never easy.",
            "cn": "“批评很容易”这句话在字面意义上也是对的，通往卓越的道路从来都不容易。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There may be some jobs where it's an advantage to be cynical and pessimistic, but if you want to do great work it's an advantage to be optimistic, even though that means you'll risk looking like a fool sometimes.",
            "cn": "也许在某些工作中，愤世嫉俗和悲观主义是优势，但如果你想成就卓越，乐观才是优势，哪怕这意味着你有时候看起来像个傻瓜。"
          },
          {
            "en": "There's an old tradition of doing the opposite.",
            "cn": "古老的传统总是教导我们要反其道而行之。"
          },
          {
            "en": "The Old Testament says it's better to keep quiet lest you look like a fool.",
            "cn": "《旧约》说要保持沉默，以免看起来像个傻瓜。"
          },
          {
            "en": "But that's advice for seeming smart.",
            "cn": "但那是教你如何 显得 聪明。"
          },
          {
            "en": "If you actually want to discover new things, it's better to take the risk of telling people your ideas.",
            "cn": "如果你真的想发现新事物，最好还是冒点险，把你的想法告诉别人。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Some people are naturally earnest, and with others it takes a conscious effort.",
            "cn": "有些人天生真诚，有些人则需要刻意练习。"
          },
          {
            "en": "Either kind of earnestness will suffice.",
            "cn": "无论哪种都行。但我怀疑，"
          },
          {
            "en": "But I doubt it would be possible to do great work without being earnest.",
            "cn": "如果不真诚，很难成就卓越。因为这本来就很难。"
          },
          {
            "en": "It's so hard to do even if you are.",
            "cn": "如果你还要背负矫揉造作、智识不诚实、"
          },
          {
            "en": "You don't have enough margin for error to accommodate the distortions introduced by being affected, intellectually dishonest, orthodox, fashionable, or cool. [ 14 ]",
            "cn": "墨守成规、追逐时尚或装酷带来的扭曲，你根本没有足够的容错空间。[14]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Great work is consistent not only with who did it, but with itself.",
            "cn": "卓越的作品不仅与其作者保持一致，其内部也必须协调统一。"
          },
          {
            "en": "It's usually all of a piece.",
            "cn": "它通常是一个整体。"
          },
          {
            "en": "So if you face a decision in the middle of working on something, ask which choice is more consistent.",
            "cn": "所以，如果在工作中面临抉择，问问自己：哪个选择能让整体更协调？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You may have to throw things away and redo them.",
            "cn": "你可能需要把做好的东西扔掉重来。"
          },
          {
            "en": "You won't necessarily have to, but you have to be willing to.",
            "cn": "不一定非得这么做，但你必须 愿意 这么做。"
          },
          {
            "en": "And that can take some effort; when there's something you need to redo, status quo bias and laziness will combine to keep you in denial about it.",
            "cn": "这需要勇气；当你需要重做时，现状偏见（Status quo bias）和懒惰会联手让你否认这一需求。为了战胜它们，"
          },
          {
            "en": "To beat this ask: If I'd already made the change, would I want to revert to what I have now?",
            "cn": "问自己：如果我已经做出了改变，我还愿意改回现在的样子吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Have the confidence to cut.",
            "cn": "要有 做减法 （Cut）的自信。"
          },
          {
            "en": "Don't keep something that doesn't fit just because you're proud of it, or because it cost you a lot of effort.",
            "cn": "不要仅仅因为你为之感到自豪，或付出了巨大努力，就保留那些不合适的部分。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Indeed, in some kinds of work it's good to strip whatever you're doing to its essence.",
            "cn": "实际上，在某些工作中，将要做的事情剥离到只剩本质是件好事。"
          },
          {
            "en": "The result will be more concentrated; you'll understand it better; and you won't be able to lie to yourself about whether there's anything real there.",
            "cn": "结果会更浓缩，你会理解得更透彻，而且你无法再欺骗自己这里面是否有真材实料。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Mathematical elegance may sound like a mere metaphor, drawn from the arts.",
            "cn": "数学上的优雅 （Mathematical Elegance）听起来像是一个源自艺术的隐喻。"
          },
          {
            "en": "That's what I thought when I first heard the term \"elegant\" applied to a proof.",
            "cn": "当我第一次听到用“优雅”来形容数学证明时，我也是这么想的。"
          },
          {
            "en": "But now I suspect it's conceptually prior — that the main ingredient in artistic elegance is mathematical elegance.",
            "cn": "但我现在怀疑，它在概念上其实是先于艺术的——艺术优雅的主要成分其实就是数学优雅。"
          },
          {
            "en": "At any rate it's a useful standard well beyond math.",
            "cn": "无论如何，这是一个超越数学领域的有用标准。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Elegance can be a long-term bet, though.",
            "cn": "不过，追求优雅可能是一项长期赌注。"
          },
          {
            "en": "Laborious solutions will often have more prestige in the short term.",
            "cn": "从短期看，费力的解决方案往往更具声望。"
          },
          {
            "en": "They cost a lot of effort and they're hard to understand, both of which impress people, at least temporarily.",
            "cn": "它们耗费巨大心力，且难以理解，这两点都能唬住人——至少暂时能。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Whereas some of the very best work will seem like it took comparatively little effort, because it was in a sense already there.",
            "cn": "相反，一些最顶尖的工作看起来似乎没费什么劲，因为它在某种意义上 本来就在那里。"
          },
          {
            "en": "It didn't have to be built, just seen.",
            "cn": "它不需要被建造，只需要被看见。"
          },
          {
            "en": "It's a very good sign when it's hard to say whether you're creating something or discovering it.",
            "cn": "当你很难分清你是在创造还是在发现时，这是一个非常好的信号。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you're doing work that could be seen as either creation or discovery, err on the side of discovery.",
            "cn": "当你做的工作既可被视为创造也可被视为发现时，倾向于将其视为发现。"
          },
          {
            "en": "Try thinking of yourself as a mere conduit through which the ideas take their natural shape.",
            "cn": "试着把自己想象成一个管道，思想通过你呈现出它们自然的形状。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "(Strangely enough, one exception is the problem of choosing a problem to work on.",
            "cn": "（奇怪的是，唯一的例外是“选择做什么”这个问题。"
          },
          {
            "en": "This is usually seen as search, but in the best case it's more like creating something.",
            "cn": "这通常被视为一种搜索，但在最好的情况下，它更像是一种创造。"
          },
          {
            "en": "In the best case you create the field in the process of exploring it.)",
            "cn": "在最好的情况下，你在探索的过程中创造了这个领域。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Similarly, if you're trying to build a powerful tool, make it gratuitously unrestrictive.",
            "cn": "同样，如果你试图构建一个强大的工具，要让它毫无理由地不设限。"
          },
          {
            "en": "A powerful tool almost by definition will be used in ways you didn't expect, so err on the side of eliminating restrictions, even if you don't know what the benefit will be.",
            "cn": "一个强大的工具，几乎根据定义，都会被用于你意想不到的方式。所以，哪怕你不知道好处是什么，也要倾向于消除限制。"
          },
          {
            "en": "Great work will often be tool-like in the sense of being something others build on.",
            "cn": "伟大的工作往往具有工具属性，即它是其他人构建事物的基石。"
          },
          {
            "en": "So it's a good sign if you're creating ideas that others could use, or exposing questions that others could answer.",
            "cn": "所以，如果你正在创造别人可以使用的想法，或者提出别人可以回答的问题，这是个好兆头。"
          },
          {
            "en": "The best ideas have implications in many different areas.",
            "cn": "最好的想法在许多不同领域都有其含义。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you express your ideas in the most general form, they'll be truer than you intended.",
            "cn": "如果你能以最通用的形式表达你的想法，"
          },
          {
            "en": "True by itself is not enough, of course.",
            "cn": "它们将比你预期的更加真实。"
          },
          {
            "en": "Great ideas have to be true and new.",
            "cn": "当然，仅仅真实是不够的。"
          },
          {
            "en": "And it takes a certain amount of ability to see new ideas even once you've learned enough to get to one of the frontiers of knowledge.",
            "cn": "伟大的想法必须既真实又新颖。即使你学到了知识前沿，想要看到新想法，也需要一定的能力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In English we give this ability names like originality, creativity, and imagination.",
            "cn": "在英语中，我们将这种能力称为 原创性 （Originality）、创造力 （Creativity）和 想象力 （Imagination）。"
          },
          {
            "en": "And it seems reasonable to give it a separate name, because it does seem to some extent a separate skill.",
            "cn": "给它一个单独的名字是合理的，因为它确实在一定程度上是一项独立的技能。"
          },
          {
            "en": "It's possible to have a great deal of ability in other respects — to have a great deal of what's often called technical ability — and yet not have much of this.",
            "cn": "一个人可能在其他方面能力超群——拥有极高的 技术 能力——但这方面却很匮乏。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I've never liked the term \"creative process.\" It seems misleading.",
            "cn": "我从来不喜欢“创造过程”这个词。它具有误导性。"
          },
          {
            "en": "Originality isn't a process, but a habit of mind.",
            "cn": "原创性不是一个过程，而是一种思维习惯。"
          },
          {
            "en": "Original thinkers throw off new ideas about whatever they focus on, like an angle grinder throwing off sparks.",
            "cn": "原创的思想者无论关注什么，都会迸发出新想法，就像角磨机飞溅出火花一样。"
          },
          {
            "en": "They can't help it.",
            "cn": "他们忍不住要这么做。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If the thing they're focused on is something they don't understand very well, these new ideas might not be good.",
            "cn": "如果他们关注的是自己不太了解的事物，这些新想法可能并不怎么样。"
          },
          {
            "en": "One of the most original thinkers I know decided to focus on dating after he got divorced.",
            "cn": "我认识的一位最具原创性的思想者，在离婚后决定研究约会。"
          },
          {
            "en": "He knew roughly as much about dating as the average 15 year old, and the results were spectacularly colorful.",
            "cn": "他对约会的了解大概和普通 15 岁少年差不多，结果虽然丰富多彩，却也令人啼笑皆非。"
          },
          {
            "en": "But to see originality separated from expertise like that made its nature all the more clear.",
            "cn": "但这让我们更清楚地看到：原创性是可以与专业知识分离的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I don't know if it's possible to cultivate originality, but there are definitely ways to make the most of however much you have.",
            "cn": "我不知道原创性是否可以培养，但肯定有办法让你现有的原创性发挥最大价值。"
          },
          {
            "en": "For example, you're much more likely to have original ideas when you're working on something.",
            "cn": "例如，当你在做具体工作时，比空想更容易产生原创想法。"
          },
          {
            "en": "Original ideas don't come from trying to have original ideas.",
            "cn": "原创想法不是通过“试图有原创想法”得来的，"
          },
          {
            "en": "They come from trying to build or understand something slightly too difficult. [ 15 ]",
            "cn": "而是通过“试图建立或理解某个稍微有点难度的东西”得来的。[15]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Talking or writing about the things you're interested in is a good way to generate new ideas.",
            "cn": "谈论或写作 你感兴趣的事情，是产生新想法的好方法。"
          },
          {
            "en": "When you try to put ideas into words, a missing idea creates a sort of vacuum that draws it out of you.",
            "cn": "当你试图将思想转化为语言时，缺失的想法会形成某种真空，把它从你的脑海中吸出来。"
          },
          {
            "en": "Indeed, there's a kind of thinking that can only be done by writing.",
            "cn": "事实上，有一种思考只能通过写作来完成。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Changing your context can help.",
            "cn": "改变环境 也有帮助。"
          },
          {
            "en": "If you visit a new place, you'll often find you have new ideas there.",
            "cn": "到一个新地方，你常会发现新想法。"
          },
          {
            "en": "The journey itself often dislodges them.",
            "cn": "旅途本身往往能把它们震出来。"
          },
          {
            "en": "But you may not have to go far to get this benefit.",
            "cn": "你不必跑很远，有时散个步就够了。"
          },
          {
            "en": "Sometimes it's enough just to go for a walk. [ 16 ]",
            "cn": "[16]在 话题空间 （Topic space）里旅行也有用。"
          },
          {
            "en": "It also helps to travel in topic space.",
            "cn": "如果你探索许多不同的话题，"
          },
          {
            "en": "You'll have more new ideas if you explore lots of different topics, partly because it gives the angle grinder more surface area to work on, and partly because analogies are an especially fruitful source of new ideas.",
            "cn": "你会拥有更多新想法。部分原因是这给了“角磨机”更大的接触面积，部分原因是 类比 （Analogies）是新想法极其丰沃的来源。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Don't divide your attention evenly between many topics though, or you'll spread yourself too thin.",
            "cn": "不过，不要把注意力 平均 分配给许多话题，那样你会过于分散。"
          },
          {
            "en": "You want to distribute it according to something more like a power law.",
            "cn": "你应该按照类似 幂律 （Power law）的方式分配：对少数几个话题保持专业性的好奇，"
          },
          {
            "en": "[ 17 ] Be professionally curious about a few topics and idly curious about many more.",
            "cn": "对许多其他话题保持闲散的好奇。[17]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Curiosity and originality are closely related.",
            "cn": "好奇心与原创性密切相关。"
          },
          {
            "en": "Curiosity feeds originality by giving it new things to work on.",
            "cn": "好奇心通过提供新素材来滋养原创性。"
          },
          {
            "en": "But the relationship is closer than that.",
            "cn": "但它们的关系比这更紧密。"
          },
          {
            "en": "Curiosity is itself a kind of originality; it's roughly to questions what originality is to answers.",
            "cn": "好奇心本身就是一种原创性；它对于问题的作用，就像原创性对于答案的作用。"
          },
          {
            "en": "And since questions at their best are a big component of answers, curiosity at its best is a creative force.",
            "cn": "既然最好的问题本身就是答案的重要组成部分，那么最好的好奇心本质上就是一种创造力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Having new ideas is a strange game, because it usually consists of seeing things that were right under your nose.",
            "cn": "获得新想法是一个奇怪的游戏，因为它通常意味着 看到那些就在你鼻子底下的东西。"
          },
          {
            "en": "Once you've seen a new idea, it tends to seem obvious.",
            "cn": "一旦看到了新想法，它往往显得显而易见。"
          },
          {
            "en": "Why did no one think of this before?",
            "cn": "为什么以前没人想到呢？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When an idea seems simultaneously novel and obvious, it's probably a good one.",
            "cn": "当一个想法看起来既新颖又显而易见时，"
          },
          {
            "en": "Seeing something obvious sounds easy.",
            "cn": "它很可能是一个好想法。"
          },
          {
            "en": "And yet empirically having new ideas is hard.",
            "cn": "看到显而易见的东西听起来很容易。"
          },
          {
            "en": "What's the source of this apparent contradiction?",
            "cn": "但经验告诉我们，获得新想法很难。"
          },
          {
            "en": "It's that seeing the new idea usually requires you to change the way you look at the world.",
            "cn": "这种矛盾的根源是什么？原因在于，看到新想法通常需要你 改变看世界的方式。"
          },
          {
            "en": "We see the world through models that both help and constrain us.",
            "cn": "我们通过模型来看世界，这些模型既帮助了我们，也限制了我们。"
          },
          {
            "en": "When you fix a broken model, new ideas become obvious.",
            "cn": "当你修复了一个破碎的模型，新想法就会变得显而易见。"
          },
          {
            "en": "But noticing and fixing a broken model is hard.",
            "cn": "但 发现并修复破碎的模型是很难的。"
          },
          {
            "en": "That's how new ideas can be both obvious and yet hard to discover: they're easy to see after you do something hard.",
            "cn": "这就是为什么新想法既显而易见又难以发现：在你做了一件困难的事情（修复模型）之后，它们才变得容易看见。"
          },
          {
            "en": "One way to discover broken models is to be stricter than other people.",
            "cn": "发现破碎模型的一个方法是 比别人更严谨 （Stricter）。"
          },
          {
            "en": "Broken models of the world leave a trail of clues where they bash against reality.",
            "cn": "破碎的世界模型在与现实碰撞时会留下一串线索。"
          },
          {
            "en": "Most people don't want to see these clues.",
            "cn": "大多数人不想看到这些线索。"
          },
          {
            "en": "It would be an understatement to say that they're attached to their current model; it's what they think in; so they'll tend to ignore the trail of clues left by its breakage, however conspicuous it may seem in retrospect.",
            "cn": "说他们依恋现有模型都算是轻描淡写了；那是他们思考的依凭；所以他们倾向于忽略模型破裂留下的线索，无论事后看来这些线索有多么显眼。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To find new ideas you have to seize on signs of breakage instead of looking away.",
            "cn": "要发现新想法，你必须 抓住这些破裂的迹象，而不是把视线移开。"
          },
          {
            "en": "That's what Einstein did.",
            "cn": "这就是爱因斯坦所做的。"
          },
          {
            "en": "He was able to see the wild implications of Maxwell's equations not so much because he was looking for new ideas as because he was stricter.",
            "cn": "他能看到麦克斯韦方程组的疯狂含义，与其说是因为他在寻找新想法，不如说是因为他更严谨。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The other thing you need is a willingness to break rules.",
            "cn": "你需要具备的另一种特质是 打破规则的意愿。"
          },
          {
            "en": "Paradoxical as it sounds, if you want to fix your model of the world, it helps to be the sort of person who's comfortable breaking rules.",
            "cn": "这听起来很矛盾，但如果你想修复世界模型，最好做一个乐于打破规则的人。"
          },
          {
            "en": "From the point of view of the old model, which everyone including you initially shares, the new model usually breaks at least implicit rules.",
            "cn": "从旧模型的角度看（这也是包括你在内的所有人最初持有的观点），新模型通常打破了至少某些隐形规则。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Few understand the degree of rule-breaking required, because new ideas seem much more conservative once they succeed.",
            "cn": "很少有人理解这种“破坏”需要达到什么程度，因为新想法一旦成功，"
          },
          {
            "en": "They seem perfectly reasonable once you're using the new model of the world they brought with them.",
            "cn": "看起来就保守多了。一旦你使用了新模型，它们看起来就完全合理。"
          },
          {
            "en": "But they didn't at the time; it took the greater part of a century for the heliocentric model to be generally accepted, even among astronomers, because it felt so wrong.",
            "cn": "但在当时并非如此；日心说花了将近一个世纪才被普遍接受，甚至在天文学家中间也是如此，因为它当时感觉太“错”了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Indeed, if you think about it, a good new idea has to seem bad to most people, or someone would have already explored it.",
            "cn": "事实上，如果你仔细想想，一个好的新想法必须在大多数人看来是“坏”的，否则早就有人去探索了。"
          },
          {
            "en": "So what you're looking for is ideas that seem crazy, but the right kind of crazy.",
            "cn": "所以你要寻找的是那些 看起来疯狂，但疯狂得恰到好处的想法。"
          },
          {
            "en": "How do you recognize these?",
            "cn": "怎么辨别呢？"
          },
          {
            "en": "You can't with certainty.",
            "cn": "你无法确切知道。"
          },
          {
            "en": "Often ideas that seem bad are bad.",
            "cn": "通常看起来坏的想法就是坏的。"
          },
          {
            "en": "But ideas that are the right kind of crazy tend to be exciting; they're rich in implications; whereas ideas that are merely bad tend to be depressing.",
            "cn": "但是，“好”的疯狂想法往往令人兴奋，充满潜在含义；而仅仅是“坏”的想法往往令人沮丧。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There are two ways to be comfortable breaking rules: to enjoy breaking them, and to be indifferent to them.",
            "cn": "有两种方式可以让你从容地打破规则：一种是 享受 打破规则，一种是 漠视 规则。"
          },
          {
            "en": "I call these two cases being aggressively and passively independent-minded.",
            "cn": "我称之为“攻击性” （Aggressively）和 “被动性”（Passively）的独立思考。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The aggressively independent-minded are the naughty ones.",
            "cn": "攻击性的独立思考者 是淘气包。"
          },
          {
            "en": "Rules don't merely fail to stop them; breaking rules gives them additional energy.",
            "cn": "规则不仅无法阻止他们，打破规则反而给了他们额外的能量。"
          },
          {
            "en": "For this sort of person, delight at the sheer audacity of a project sometimes supplies enough activation energy to get it started.",
            "cn": "对于这类人，仅仅是对项目“胆大包天”的喜悦，有时就足以提供启动所需的活化能。"
          },
          {
            "en": "The other way to break rules is not to care about them, or perhaps even to know they exist.",
            "cn": "另一种打破规则的方式是不在乎它们，甚至不知道它们的存在。"
          },
          {
            "en": "This is why novices and outsiders often make new discoveries; their ignorance of a field's assumptions acts as a source of temporary passive independent-mindedness.",
            "cn": "这就是为什么 新手和局外人 经常会有新发现；他们对领域内既定假设的无知，成为了一种暂时的、被动的独立思考源泉。"
          },
          {
            "en": "Aspies also seem to have a kind of immunity to conventional beliefs.",
            "cn": "阿斯伯格综合征（Aspies）患者似乎也对传统观念有一种免疫力。"
          },
          {
            "en": "Several I know say that this helps them to have new ideas.",
            "cn": "我认识好几个这样的人，他们说这对产生新想法很有帮助。"
          },
          {
            "en": "Strictness plus rule-breaking sounds like a strange combination.",
            "cn": "严谨 + 打破规则，这听起来像是一个奇怪的组合。"
          },
          {
            "en": "In popular culture they're opposed.",
            "cn": "在流行文化中，这两者是对立的。"
          },
          {
            "en": "But popular culture has a broken model in this respect.",
            "cn": "但这正是流行文化的模型破碎之处。"
          },
          {
            "en": "It implicitly assumes that issues are trivial ones, and in trivial matters strictness and rule-breaking are opposed.",
            "cn": "它隐含地假设问题都是琐碎的；在琐碎的事情上，严谨和打破规则确实是对立的。"
          },
          {
            "en": "But in questions that really matter, only rule-breakers can be truly strict.",
            "cn": "但在真正重要的问题上，只有打破规则者才能做到真正的严谨。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "An overlooked idea often doesn't lose till the semifinals.",
            "cn": "一个被忽视的好点子，往往能撑过初赛，"
          },
          {
            "en": "You do see it, subconsciously, but then another part of your subconscious shoots it down because it would be too weird, too risky, too much work, too controversial.",
            "cn": "却输在半决赛。你的潜意识其实看到了它，但随即把它枪毙了——因为它太怪异、太冒险、太费劲，或者太具争议性。"
          },
          {
            "en": "This suggests an exciting possibility: if you could turn off such filters, you could see more new ideas.",
            "cn": "这暗示了一个令人兴奋的可能性：如果你能关掉这些潜意识过滤器，你就能看到更多新想法。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One way to do that is to ask what would be good ideas for someone else to explore.",
            "cn": "一个欺骗潜意识的方法是问自己：如果是别人来做，什么是一个好点子？"
          },
          {
            "en": "Then your subconscious won't shoot them down to protect you.",
            "cn": "这样你的潜意识就不会为了保护你而枪毙它。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You could also discover overlooked ideas by working in the other direction: by starting from what's obscuring them.",
            "cn": "你也可以反其道而行之：从那些“遮蔽物”入手。每一个被奉为圭臬但实际上错误的原则周围，"
          },
          {
            "en": "Every cherished but mistaken principle is surrounded by a dead zone of valuable ideas that are unexplored because they contradict it.",
            "cn": "都环绕着一片“死角”——那里充满了因与原则相悖而未被探索的宝贵想法。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Religions are collections of cherished but mistaken principles.",
            "cn": "宗教 就是这类原则的集合。"
          },
          {
            "en": "So anything that can be described either literally or metaphorically as a religion will have valuable unexplored ideas in its shadow.",
            "cn": "任何可以被字面上或隐喻上称为“宗教”的东西，在其阴影下都藏着未被挖掘的宝藏。"
          },
          {
            "en": "Copernicus and Darwin both made discoveries of this type. [ 18 ]",
            "cn": "哥白尼和达尔文都做出了这类发现。[18]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What are people in your field religious about, in the sense of being too attached to some principle that might not be as self-evident as they think?",
            "cn": "在你所处的领域，人们对什么东西持有“宗教般”的执念？有什么原则是他们深信不疑，但其实并非不证自明的？"
          },
          {
            "en": "What becomes possible if you discard it?",
            "cn": "如果你抛弃它，会有什么新的可能？"
          },
          {
            "en": "People show much more originality in solving problems than in deciding which problems to solve.",
            "cn": "人们在 解决问题 时表现出的原创性，远超在 决定解决什么问题 时。"
          },
          {
            "en": "Even the smartest can be surprisingly conservative when deciding what to work on.",
            "cn": "即使是最聪明的人，在选题时也保守得惊人。"
          },
          {
            "en": "People who'd never dream of being fashionable in any other way get sucked into working on fashionable problems.",
            "cn": "那些在其他方面绝不随大流的人，却常常被吸进“时髦问题”的黑洞。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One reason people are more conservative when choosing problems than solutions is that problems are bigger bets.",
            "cn": "人们在选题上保守，部分是因为 问题是更大的赌注。"
          },
          {
            "en": "A problem could occupy you for years, while exploring a solution might only take days.",
            "cn": "一个问题可能占据你数年光阴，而探索一个解决方案可能只需几天。"
          },
          {
            "en": "But even so I think most people are too conservative.",
            "cn": "但即便如此，大多数人还是太保守了。"
          },
          {
            "en": "They're not merely responding to risk, but to fashion as well.",
            "cn": "他们不仅是在规避风险，更是在追逐时尚。"
          },
          {
            "en": "Unfashionable problems are undervalued.",
            "cn": "不时髦的问题被严重低估了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One of the most interesting kinds of unfashionable problem is the problem that people think has been fully explored, but hasn't.",
            "cn": "最有趣的一种不时髦问题是：那些人们以为已经被研究透了，其实并没有的问题。"
          },
          {
            "en": "Great work often takes something that already exists and shows its latent potential.",
            "cn": "伟大的工作往往是发掘既有事物的潜在价值。"
          },
          {
            "en": "Durer and Watt both did this.",
            "cn": "丢勒（Durer）和瓦特（Watt）都是如此。"
          },
          {
            "en": "So if you're interested in a field that others think is tapped out, don't let their skepticism deter you.",
            "cn": "如果你对某个别人认为已经“枯竭”的领域感兴趣，别让他们的怀疑劝退你。"
          },
          {
            "en": "People are often wrong about this.",
            "cn": "在这件事上，大家通常是错的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Working on an unfashionable problem can be very pleasing.",
            "cn": "研究不时髦的问题是一种愉悦的体验。"
          },
          {
            "en": "There's no hype or hurry.",
            "cn": "没有炒作，没有匆忙。"
          },
          {
            "en": "Opportunists and critics are both occupied elsewhere.",
            "cn": "投机者和批评家都忙着去别处凑热闹。"
          },
          {
            "en": "The existing work often has an old-school solidity.",
            "cn": "现有的工作往往带有一种老派的坚实感。"
          },
          {
            "en": "And there's a satisfying sense of economy in cultivating ideas that would otherwise be wasted.",
            "cn": "而且，利用那些本会被浪费的想法，会给你一种令人满足的“经济感”。"
          },
          {
            "en": "But the most common type of overlooked problem is not explicitly unfashionable in the sense of being out of fashion.",
            "cn": "但最常见的“被忽视问题”，并非显而易见地“不时髦”，"
          },
          {
            "en": "It just doesn't seem to matter as much as it actually does.",
            "cn": "它只是 看起来没那么重要。"
          },
          {
            "en": "How do you find these?",
            "cn": "如何找到它们？"
          },
          {
            "en": "By being self-indulgent — by letting your curiosity have its way, and tuning out, at least temporarily, the little voice in your head that says you should only be working on \"important\" problems.",
            "cn": "做一个自我放纵的人 ——让你的好奇心做主，暂时屏蔽脑子里那个告诉你只做“重要”工作的声音。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You do need to work on important problems, but almost everyone is too conservative about what counts as one.",
            "cn": "你确实需要解决重要问题，但几乎所有人对“重要”的定义都太保守了。"
          },
          {
            "en": "And if there's an important but overlooked problem in your neighborhood, it's probably already on your subconscious radar screen.",
            "cn": "如果你身边有一个重要但被忽视的问题，它很可能已经出现在你潜意识的雷达上了。"
          },
          {
            "en": "So try asking yourself: if you were going to take a break from \"serious\" work to work on something just because it would be really interesting, what would you do?",
            "cn": "试着问自己：如果你要从“正经”工作中抽身，纯粹为了好玩去做点什么，你会做什么？"
          },
          {
            "en": "The answer is probably more important than it seems.",
            "cn": "答案可能比看起来重要得多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Originality in choosing problems seems to matter even more than originality in solving them.",
            "cn": "选题的原创性比解题的原创性更重要。"
          },
          {
            "en": "That's what distinguishes the people who discover whole new fields.",
            "cn": "这正是开创全新领域之人的独特之处。"
          },
          {
            "en": "So what might seem to be merely the initial step — deciding what to work on — is in a sense the key to the whole game.",
            "cn": "因此，决定“做什么”这看似只是初始的一步，在某种意义上却是整场游戏的关键。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Few grasp this.",
            "cn": "很少有人理解这一点。"
          },
          {
            "en": "One of the biggest misconceptions about new ideas is about the ratio of question to answer in their composition.",
            "cn": "关于新想法最大的误解之一，就是关于“问题”和“答案”的比例。"
          },
          {
            "en": "People think big ideas are answers, but often the real insight was in the question.",
            "cn": "人们以为大想法是答案，但通常，真正的洞见在于问题。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Part of the reason we underrate questions is the way they're used in schools.",
            "cn": "我们低估问题，部分归咎于学校的教育方式。"
          },
          {
            "en": "In schools they tend to exist only briefly before being answered, like unstable particles.",
            "cn": "在学校里，问题就像不稳定的粒子，刚出现就被答案消灭了。"
          },
          {
            "en": "But a really good question can be much more than that.",
            "cn": "但一个真正的好问题远不止于此。"
          },
          {
            "en": "A really good question is a partial discovery.",
            "cn": "一个好问题，本身就是部分的发现。"
          },
          {
            "en": "How do new species arise?",
            "cn": "“新物种是如何产生的？"
          },
          {
            "en": "Is the force that makes objects fall to earth the same as the one that keeps planets in their orbits?",
            "cn": "”“让苹果落地的力与维系行星运转的力是同一种力吗？” 仅仅是提出这些问题，"
          },
          {
            "en": "By even asking such questions you were already in excitingly novel territory.",
            "cn": "你就已经踏入了激动人心的新领域。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Unanswered questions can be uncomfortable things to carry around with you.",
            "cn": "随身携带未解之谜可能会让人不舒服。"
          },
          {
            "en": "But the more you're carrying, the greater the chance of noticing a solution — or perhaps even more excitingly, noticing that two unanswered questions are the same.",
            "cn": "但你带着的谜题越多，发现答案的机会就越大——甚至更令人兴奋的是，你会发现两个未解之谜原来是同一个问题。"
          },
          {
            "en": "Sometimes you carry a question for a long time.",
            "cn": "有些问题你可能要背负很久。"
          },
          {
            "en": "Great work often comes from returning to a question you first noticed years before — in your childhood, even — and couldn't stop thinking about.",
            "cn": "伟大的工作往往源于回归你多年前——甚至童年时——注意到的那个问题。"
          },
          {
            "en": "People talk a lot about the importance of keeping your youthful dreams alive, but it's just as important to keep your youthful questions alive. [ 19 ]",
            "cn": "人们常说要守护年轻时的梦想，但守护年轻时的问题同样重要。[19]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This is one of the places where actual expertise differs most from the popular picture of it.",
            "cn": "这是真正的专家与大众印象最不同的地方。"
          },
          {
            "en": "In the popular picture, experts are certain.",
            "cn": "大众眼里的专家是确定的。"
          },
          {
            "en": "But actually the more puzzled you are, the better, so long as (a) the things you're puzzled about matter, and (b) no one else understands them either.",
            "cn": "但实际上，你越困惑越好，只要：(a) 让你困惑的事很重要，且 (b) 没人懂它。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Think about what's happening at the moment just before a new idea is discovered.",
            "cn": "想一想新想法诞生前的那一刻。"
          },
          {
            "en": "Often someone with sufficient expertise is puzzled about something.",
            "cn": "通常是一个拥有足够专业知识的人对某事感到困惑。"
          },
          {
            "en": "Which means that originality consists partly of puzzlement — of confusion!",
            "cn": "这意味着，原创性部分构筑于困惑之上！"
          },
          {
            "en": "You have to be comfortable enough with the world being full of puzzles that you're willing to see them, but not so comfortable that you don't want to solve them. [ 20 ]",
            "cn": "你必须能够接受世界充满谜团，并愿意看见它们，但又不能接受它们一直无解。[20]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's a great thing to be rich in unanswered questions.",
            "cn": "“富拥”未解之谜是件好事。"
          },
          {
            "en": "And this is one of those situations where the rich get richer, because the best way to acquire new questions is to try answering existing ones.",
            "cn": "这是“富者越富”的场景之一，因为获取新问题的最好方法就是尝试回答旧问题。"
          },
          {
            "en": "Questions don't just lead to answers, but also to more questions.",
            "cn": "问题不仅通向答案，更通向更多的问题。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The best questions grow in the answering.",
            "cn": "最好的问题是在回答的过程中长大的。"
          },
          {
            "en": "You notice a thread protruding from the current paradigm and try pulling on it, and it just gets longer and longer.",
            "cn": "你注意到现有范式中露出了一个小线头，试着拉了一下，结果它越拉越长。"
          },
          {
            "en": "So don't require a question to be obviously big before you try answering it.",
            "cn": "所以，别指望在动手前就确定一个问题是否足够“大”。"
          },
          {
            "en": "You can rarely predict that.",
            "cn": "你很难预测。"
          },
          {
            "en": "It's hard enough even to notice the thread, let alone to predict how much will unravel if you pull on it.",
            "cn": "能注意到线头已属不易，更别提预测拉出来会有多长了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's better to be promiscuously curious — to pull a little bit on a lot of threads, and see what happens.",
            "cn": "最好保持一种“滥情”的好奇心（Promiscuously curious）——随处拉拉线头，看看会发生什么。"
          },
          {
            "en": "Big things start small.",
            "cn": "大事往往起于微末。"
          },
          {
            "en": "The initial versions of big things were often just experiments, or side projects, or talks, which then grew into something bigger.",
            "cn": "许多宏大项目的初版只是一个实验、一个副业，或一次谈话。"
          },
          {
            "en": "So start lots of small things.",
            "cn": "所以，多开几个小头。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Being prolific is underrated.",
            "cn": "多产（Prolific）被低估了。"
          },
          {
            "en": "The more different things you try, the greater the chance of discovering something new.",
            "cn": "你尝试的东西越多，发现新事物的概率就越大。"
          },
          {
            "en": "Understand, though, that trying lots of things will mean trying lots of things that don't work.",
            "cn": "但要明白，尝试多意味着失败多。"
          },
          {
            "en": "You can't have a lot of good ideas without also having a lot of bad ones. [ 21 ]",
            "cn": "你不可能只拥有很多好主意，而不伴随着很多坏主意。"
          },
          {
            "en": "Though it sounds more responsible to begin by studying everything that's been done before, you'll learn faster and have more fun by trying stuff.",
            "cn": "[21]虽然“先把前人的研究都看完再动手”听起来更负责任，但 通过动手尝试，你学得更快，也更有趣。"
          },
          {
            "en": "And you'll understand previous work better when you do look at it.",
            "cn": "而且等你回过头看前人的工作时，你会理解得更透彻。"
          },
          {
            "en": "So err on the side of starting.",
            "cn": "所以，宁可贸然开始。"
          },
          {
            "en": "Which is easier when starting means starting small; those two ideas fit together like two puzzle pieces.",
            "cn": "当“开始”意味着“从小做起”时，这就更容易了；这两个理念就像两块拼图一样契合。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "How do you get from starting small to doing something great?",
            "cn": "如何从小事变成大事？"
          },
          {
            "en": "By making successive versions.",
            "cn": "通过版本的迭代。"
          },
          {
            "en": "Great things are almost always made in successive versions.",
            "cn": "伟大的事物几乎都是迭代出来的。"
          },
          {
            "en": "You start with something small and evolve it, and the final version is both cleverer and more ambitious than anything you could have planned.",
            "cn": "你从一个小东西开始，不断进化，最终版本将比你计划的任何东西都更聪明、更宏大。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's particularly useful to make successive versions when you're making something for people — to get an initial version in front of them quickly, and then evolve it based on their response.",
            "cn": "当你为用户创造产品时，迭代尤为重要——尽快把初版推到他们面前，根据反馈进化。先尝试最简单、最可能行得通的方法。"
          },
          {
            "en": "Begin by trying the simplest thing that could possibly work.",
            "cn": "令人惊讶的是，它往往真的行得通。"
          },
          {
            "en": "Surprisingly often, it does.",
            "cn": "即使不行，"
          },
          {
            "en": "If it doesn't, this will at least get you started.",
            "cn": "至少你已经上路了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Don't try to cram too much new stuff into any one version.",
            "cn": "别试图在一个版本里塞进太多新东西。"
          },
          {
            "en": "There are names for doing this with the first version (taking too long to ship) and the second (the second system effect), but these are both merely instances of a more general principle.",
            "cn": "这在第一版叫“发版太慢”，在第二版叫“第二系统效应”（Second-system effect），但这都是同一个原则的体现。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "An early version of a new project will sometimes be dismissed as a toy.",
            "cn": "新项目的早期版本有时会被贬低为“玩具”。"
          },
          {
            "en": "It's a good sign when people do this.",
            "cn": "如果有人这么说，那是好兆头。"
          },
          {
            "en": "That means it has everything a new idea needs except scale, and that tends to follow. [ 22 ]",
            "cn": "这意味着它具备了新想法所需的一切，除了规模，而规模往往随之而来。[22]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The alternative to starting with something small and evolving it is to plan in advance what you're going to do.",
            "cn": "“从小做起、持续进化”的对立面是“预先规划”。"
          },
          {
            "en": "And planning does usually seem the more responsible choice.",
            "cn": "规划通常看起来更负责任。"
          },
          {
            "en": "It sounds more organized to say \"we're going to do x and then y and then z\" than \"we're going to try x and see what happens.\" And it is more organized ; it just doesn't work as well.",
            "cn": "说“我们要先做x，再做y，最后做z”听起来比“我们要试下x，看看会发生什么”更有条理。它确实更有条理，只是效果没那么好。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Planning per se isn't good.",
            "cn": "规划本身不是好事。"
          },
          {
            "en": "It's sometimes necessary, but it's a necessary evil — a response to unforgiving conditions.",
            "cn": "它有时是必要的，但是一种“必要的恶”——是对无情条件的妥协。"
          },
          {
            "en": "It's something you have to do because you're working with inflexible media, or because you need to coordinate the efforts of a lot of people.",
            "cn": "是因为你使用的媒介不灵活，或者你需要协调大量人员，才不得不规划。"
          },
          {
            "en": "If you keep projects small and use flexible media, you don't have to plan as much, and your designs can evolve instead.",
            "cn": "如果你保持项目小巧并使用灵活的媒介，你就不必做那么多规划，你的设计可以自由进化。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Take as much risk as you can afford.",
            "cn": "在你能承受的范围内，尽可能多冒险。"
          },
          {
            "en": "In an efficient market, risk is proportionate to reward, so don't look for certainty, but for a bet with high expected value.",
            "cn": "在一个有效的市场里，风险与回报成正比。别寻求确定性，去寻求那些期望值高（High Expected Value）的赌注。"
          },
          {
            "en": "If you're not failing occasionally, you're probably being too conservative.",
            "cn": "如果你没有偶尔失败，说明你太保守了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Though conservatism is usually associated with the old, it's the young who tend to make this mistake.",
            "cn": "虽然保守通常与老年人联系在一起，但这往往是年轻人的通病。"
          },
          {
            "en": "Inexperience makes them fear risk, but it's when you're young that you can afford the most.",
            "cn": "经验不足让他们害怕风险，但 年轻正是你最输得起的时候。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Even a project that fails can be valuable.",
            "cn": "即使失败的项目也是有价值的。"
          },
          {
            "en": "In the process of working on it, you'll have crossed territory few others have seen, and encountered questions few others have asked.",
            "cn": "在做的过程中，你穿越了无人涉足的领地，遇到了别人未曾问过的问题。"
          },
          {
            "en": "And there's probably no better source of questions than the ones you encounter in trying to do something slightly too hard.",
            "cn": "没有什么比“试图解决稍稍超出能力范围的问题”更能产生好问题了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Use the advantages of youth when you have them, and the advantages of age once you have those.",
            "cn": "年轻时利用年轻的优势，年老时利用年老的优势。"
          },
          {
            "en": "The advantages of youth are energy, time, optimism, and freedom.",
            "cn": "年轻的优势：精力、时间、乐观、自由。"
          },
          {
            "en": "The advantages of age are knowledge, efficiency, money, and power.",
            "cn": "年老的优势：知识、效率、金钱、权力。"
          },
          {
            "en": "With effort you can acquire some of the latter when young and keep some of the former when old.",
            "cn": "努力在年轻时获取一些后者，在年老时保留一些前者。"
          },
          {
            "en": "The old also have the advantage of knowing which advantages they have.",
            "cn": "年长者还有一个优势：他们清楚自己拥有哪些优势。"
          },
          {
            "en": "The young often have them without realizing it.",
            "cn": "虽然他们往往不自知。"
          },
          {
            "en": "The biggest is probably time.",
            "cn": "年轻人最大的优势恐怕是时间，"
          },
          {
            "en": "The young have no idea how rich they are in time.",
            "cn": "只是他们往往意识不到自己拥有多少时间。"
          },
          {
            "en": "The best way to turn this time to advantage is to use it in slightly frivolous ways: to learn about something you don't need to know about, just out of curiosity, or to try building something just because it would be cool, or to become freakishly good at something.",
            "cn": "利用时间的最好方式是稍微“挥霍”一下：出于好奇去学点没用的东西，或者纯粹为了耍帅造个东西，或者在某件小事上练到极致。"
          },
          {
            "en": "That \"slightly\" is an important qualification.",
            "cn": "“稍微”是个重要的限定词。"
          },
          {
            "en": "Spend time lavishly when you're young, but don't simply waste it.",
            "cn": "年轻时要大方地花时间，但别浪费。"
          },
          {
            "en": "There's a big difference between doing something you worry might be a waste of time and doing something you know for sure will be.",
            "cn": "“担心可能是浪费时间”和“明知是浪费时间”有天壤之别。"
          },
          {
            "en": "The former is at least a bet, and possibly a better one than you think. [ 23 ]",
            "cn": "前者至少是个赌注，而且往往胜算比你想的大。[23]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The most subtle advantage of youth, or more precisely of inexperience, is that you're seeing everything with fresh eyes.",
            "cn": "年轻（或者说缺乏经验）最微妙的优势是：你拥有一双新鲜的眼睛。"
          },
          {
            "en": "When your brain embraces an idea for the first time, sometimes the two don't fit together perfectly.",
            "cn": "当你的大脑第一次接触一个概念时，有时它们并不完全契合。"
          },
          {
            "en": "Usually the problem is with your brain, but occasionally it's with the idea.",
            "cn": "通常问题出在你的大脑，但偶尔，问题出在概念上。"
          },
          {
            "en": "A piece of it sticks out awkwardly and jabs you when you think about it.",
            "cn": "某个部分尴尬地凸出来，扎了你一下。"
          },
          {
            "en": "People who are used to the idea have learned to ignore it, but you have the opportunity not to. [ 24 ]",
            "cn": "习惯了这个概念的人学会了忽略它，但你有机会不忽略。[24]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So when you're learning about something for the first time, pay attention to things that seem wrong or missing.",
            "cn": "所以，当你初次学习某样东西时，留意那些看起来不对劲或缺失的地方。"
          },
          {
            "en": "You'll be tempted to ignore them, since there's a 99% chance the problem is with you.",
            "cn": "你会倾向于忽略它们，因为 99% 的概率是你错了。"
          },
          {
            "en": "And you may have to set aside your misgivings temporarily to keep progressing.",
            "cn": "为了继续学习，你可能得暂时把疑虑搁置。"
          },
          {
            "en": "But don't forget about them.",
            "cn": "但别忘了它们。"
          },
          {
            "en": "When you've gotten further into the subject, come back and check if they're still there.",
            "cn": "等你掌握了更多知识，回过头来检查它们是否还在。"
          },
          {
            "en": "If they're still viable in the light of your present knowledge, they probably represent an undiscovered idea.",
            "cn": "如果还在，那可能就是一个未被发现的想法。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One of the most valuable kinds of knowledge you get from experience is to know what you don't have to worry about.",
            "cn": "经验带来的最有价值的知识之一，是知道 什么不必担心。"
          },
          {
            "en": "The young know all the things that could matter, but not their relative importance.",
            "cn": "年轻人知道所有可能重要的事情，但不知道权重的分配。"
          },
          {
            "en": "So they worry equally about everything, when they should worry much more about a few things and hardly at all about the rest.",
            "cn": "所以他们对所有事都同样担心，而实际上他们应该极度关注少数几件事，忽略其余的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But what you don't know is only half the problem with inexperience.",
            "cn": "缺乏经验的另一半问题是："
          },
          {
            "en": "The other half is what you do know that ain't so.",
            "cn": "你知道的很多东西并不是真的。"
          },
          {
            "en": "You arrive at adulthood with your head full of nonsense — bad habits you've acquired and false things you've been taught — and you won't be able to do great work till you clear away at least the nonsense in the way of whatever type of work you want to do.",
            "cn": "成年时，你的脑子里塞满了废话——养成的坏习惯、被灌输的错误观念。在你清除掉那些阻碍你工作的废话之前，你无法成就卓越。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Much of the nonsense left in your head is left there by schools.",
            "cn": "脑子里的大部分废话是学校留下的。"
          },
          {
            "en": "We're so used to schools that we unconsciously treat going to school as identical with learning, but in fact schools have all sorts of strange qualities that warp our ideas about learning and thinking.",
            "cn": "我们太习惯于学校，以至于下意识地把“上学”等同于“学习”。但实际上，学校扭曲了我们对学习和思考的认知。例如，"
          },
          {
            "en": "For example, schools induce passivity.",
            "cn": "学校诱导 被动性。"
          },
          {
            "en": "Since you were a small child, there was an authority at the front of the class telling all of you what you had to learn and then measuring whether you did.",
            "cn": "从小就有权威告诉你学什么，然后测试你学没学。"
          },
          {
            "en": "But neither classes nor tests are intrinsic to learning; they're just artifacts of the way schools are usually designed.",
            "cn": "但上课和考试并非学习的本质，它们只是学校设计的产物。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The sooner you overcome this passivity, the better.",
            "cn": "越早克服这种被动性越好。"
          },
          {
            "en": "If you're still in school, try thinking of your education as your project, and your teachers as working for you rather than vice versa.",
            "cn": "如果你还在上学，试着把教育看作 你的项目，老师是为你工作的，而不是反过来。"
          },
          {
            "en": "That may seem a stretch, but it's not merely some weird thought experiment.",
            "cn": "最好的老师不希望做你的老板，他们更希望你冲在前面，"
          },
          {
            "en": "It's the truth economically, and in the best case it's the truth intellectually as well.",
            "cn": "把他们当作顾问，而不是让他们拖着你走。这听起来可能有些牵强，"
          },
          {
            "en": "The best teachers don't want to be your bosses.",
            "cn": "但这不仅仅是个古怪的思想实验。"
          },
          {
            "en": "They'd prefer it if you pushed ahead, using them as a source of advice, rather than being pulled by them through the material.",
            "cn": "从经济角度看这是事实，在最好的情况下，从智识角度看这也是事实。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Schools also give you a misleading impression of what work is like.",
            "cn": "学校还给你一种关于工作的错误印象："
          },
          {
            "en": "In school they tell you what the problems are, and they're almost always soluble using no more than you've been taught so far.",
            "cn": "问题是确定的，且仅靠你所学的知识就总是有解的。而在现实生活中，"
          },
          {
            "en": "In real life you have to figure out what the problems are, and you often don't know if they're soluble at all.",
            "cn": "你必须自己找出问题是什么，而且往往不知道它是否有解。"
          },
          {
            "en": "But perhaps the worst thing schools do to you is train you to win by hacking the test.",
            "cn": "最糟糕的是，学校训练你 通过“破解考试”来获胜。"
          },
          {
            "en": "You can't do great work by doing that.",
            "cn": "你无法通过这种方式成就卓越。"
          },
          {
            "en": "You can't trick God.",
            "cn": "你骗不了上帝（God / 自然规律）。"
          },
          {
            "en": "So stop looking for that kind of shortcut.",
            "cn": "别再找捷径了。"
          },
          {
            "en": "The way to beat the system is to focus on problems and solutions that others have overlooked, not to skimp on the work itself.",
            "cn": "击败系统的办法是专注于别人忽视的问题和解决方案，而不是在工作本身上偷工减料。"
          },
          {
            "en": "Don't think of yourself as dependent on some gatekeeper giving you a \"big break.\" Even if this were true, the best way to get it would be to focus on doing good work rather than chasing influential people.",
            "cn": "别指望哪个“守门人”给你一个“大机会”。即使这是真的，获得它的最好方式也是专注于做出好作品，而不是追逐权贵。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And don't take rejection by committees to heart.",
            "cn": "别把委员会的拒绝放在心上。"
          },
          {
            "en": "The qualities that impress admissions officers and prize committees are quite different from those required to do great work.",
            "cn": "打动招生办或奖项评委的特质，与成就卓越所需的特质截然不同。"
          },
          {
            "en": "The decisions of selection committees are only meaningful to the extent that they're part of a feedback loop, and very few are.",
            "cn": "选拔委员会的决定只有在作为反馈循环的一部分时才有意义，而这种情况极少见。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "People new to a field will often copy existing work.",
            "cn": "关于模仿：新手模仿现有作品没问题。"
          },
          {
            "en": "There's nothing inherently bad about that.",
            "cn": "这是学习的最好方式。"
          },
          {
            "en": "There's no better way to learn how something works than by trying to reproduce it.",
            "cn": "模仿并不一定意味着缺乏原创性。"
          },
          {
            "en": "Nor does copying necessarily make your work unoriginal.",
            "cn": "原创性是新想法的出现，"
          },
          {
            "en": "Originality is the presence of new ideas, not the absence of old ones.",
            "cn": "而不是旧想法的缺席。模仿有好坏之分。"
          },
          {
            "en": "There's a good way to copy and a bad way.",
            "cn": "要模仿，就光明正大地模仿，"
          },
          {
            "en": "If you're going to copy something, do it openly instead of furtively, or worse still, unconsciously.",
            "cn": "别偷偷摸摸，更别在无意识中模仿。"
          },
          {
            "en": "This is what's meant by the famously misattributed phrase \"Great artists steal.\" The really dangerous kind of copying, the kind that gives copying a bad name, is the kind that's done without realizing it, because you're nothing more than a train running on tracks laid down by someone else.",
            "cn": "这就是那句被误传的名言“伟大的艺术家偷窃”的真意。真正危险的模仿是无意识的模仿，因为那意味着你只是一列跑在别人铺好的轨道上的火车。但走向另一个极端，"
          },
          {
            "en": "But at the other extreme, copying can be a sign of superiority rather than subordination. [ 25 ]",
            "cn": "模仿也可能是一种优越而非从属的标志。[25]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In many fields it's almost inevitable that your early work will be in some sense based on other people's.",
            "cn": "在许多领域，你的早期作品在某种程度上基于他人的作品几乎是不可避免的。"
          },
          {
            "en": "Projects rarely arise in a vacuum.",
            "cn": "项目很少在真空中产生，"
          },
          {
            "en": "They're usually a reaction to previous work.",
            "cn": "它们通常是对前人工作的某种回应。"
          },
          {
            "en": "When you're first starting out, you don't have any previous work; if you're going to react to something, it has to be someone else's.",
            "cn": "当你刚起步时，你没有任何以前的作品；如果你要回应什么，那只能是别人的作品。一旦你立足稳了，"
          },
          {
            "en": "Once you're established, you can react to your own.",
            "cn": "你就可以回应你自己的作品了。"
          },
          {
            "en": "But while the former gets called derivative and the latter doesn't, structurally the two cases are more similar than they seem.",
            "cn": "虽然前者被称为“衍生品”而后者不是，但从结构上看，这两种情况比看起来要相似得多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Oddly enough, the very novelty of the most novel ideas sometimes makes them seem at first to be more derivative than they are.",
            "cn": "奇怪的是，最新颖的想法，其新颖之处有时反而使它们最初看起来比实际更具衍生性。"
          },
          {
            "en": "New discoveries often have to be conceived initially as variations of existing things, even by their discoverers , because there isn't yet the conceptual vocabulary to express them.",
            "cn": "新发现往往最初必须被构想为现有事物的变体——甚至对发现者本人也是如此——因为当时还不存在表达它们的全新概念词汇。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There are definitely some dangers to copying, though.",
            "cn": "不过，模仿确实存在风险。"
          },
          {
            "en": "One is that you'll tend to copy old things — things that were in their day at the frontier of knowledge, but no longer are.",
            "cn": "一种风险是你会倾向于模仿旧东西——那些在其时代处于知识前沿，但现在已不再前沿的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And when you do copy something, don't copy every feature of it.",
            "cn": "此外，当你模仿某样东西时，不要模仿它的每一个特征。"
          },
          {
            "en": "Some will make you ridiculous if you do.",
            "cn": "有些特征如果你照搬，会让你显得很荒谬。"
          },
          {
            "en": "Don't copy the manner of an eminent 50 year old professor if you're 18, for example, or the idiom of a Renaissance poem hundreds of years later.",
            "cn": "例如，如果你才18岁，不要模仿一位著名的50岁教授的举止；或者在几百年后模仿文艺复兴时期诗歌的措辞。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Some of the features of things you admire are flaws they succeeded despite.",
            "cn": "你所钦佩的事物中，有些特征其实是瑕疵，"
          },
          {
            "en": "Indeed, the features that are easiest to imitate are the most likely to be the flaws.",
            "cn": "它是 尽管 有这些瑕疵才成功的。实际上，最容易模仿的特征，往往就是那些瑕疵。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This is particularly true for behavior.",
            "cn": "在行为举止上尤其如此。"
          },
          {
            "en": "Some talented people are jerks, and this sometimes makes it seem to the inexperienced that being a jerk is part of being talented.",
            "cn": "有些才华横溢的人是混蛋（Jerks），这有时会让缺乏经验的人误以为“做个混蛋”是“才华横溢”的一部分。并不是；"
          },
          {
            "en": "It isn't; being talented is merely how they get away with it.",
            "cn": "才华横溢只是他们能以此行事而不被惩罚的资本。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One of the most powerful kinds of copying is to copy something from one field into another.",
            "cn": "最强有力的模仿之一，是将某个领域的模式复制到另一个领域。"
          },
          {
            "en": "History is so full of chance discoveries of this type that it's probably worth giving chance a hand by deliberately learning about other kinds of work.",
            "cn": "历史充满了这类偶然发现，所以值得我们可以通过刻意学习其他类型的工作，助“偶然”一臂之力。"
          },
          {
            "en": "You can take ideas from quite distant fields if you let them be metaphors.",
            "cn": "如果你允许它们成为隐喻，你可以从非常遥远的领域汲取灵感。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Negative examples can be as inspiring as positive ones.",
            "cn": "反面教材和正面教材一样能给人以此启发。"
          },
          {
            "en": "In fact you can sometimes learn more from things done badly than from things done well; sometimes it only becomes clear what's needed when it's missing.",
            "cn": "事实上，你有时从做得糟糕的事情中学到的，比从做得好的事情中学到的更多；有时只有当某样东西缺失时，你才清楚什么是必须的。"
          },
          {
            "en": "If a lot of the best people in your field are collected in one place, it's usually a good idea to visit for a while.",
            "cn": "前往人才聚集地如果你所在领域里许多最优秀的人都聚集在同一个地方，去那里待一阵子通常是个好主意。"
          },
          {
            "en": "It will increase your ambition, and also, by showing you that these people are human, increase your self-confidence. [ 26 ]",
            "cn": "这会提升你的野心，同时，通过让你看到这些人也是凡人，进而增强你的自信。"
          },
          {
            "en": "If you're earnest you'll probably get a warmer welcome than you might expect.",
            "cn": "[26]如果你足够真诚，你受到的欢迎可能会比你预期的更热烈。"
          },
          {
            "en": "Most people who are very good at something are happy to talk about it with anyone who's genuinely interested.",
            "cn": "大多数在某方面非常出色的人，都乐于与任何真正感兴趣的人讨论它。"
          },
          {
            "en": "If they're really good at their work, then they probably have a hobbyist's interest in it, and hobbyists always want to talk about their hobbies.",
            "cn": "如果他们真的很擅长自己的工作，那么他们很可能对它有着业余爱好者般的热情，而业余爱好者总是想谈论他们的爱好。"
          },
          {
            "en": "It may take some effort to find the people who are really good, though.",
            "cn": "不过，找到那些真正优秀的人可能需要费点功夫。"
          },
          {
            "en": "Doing great work has such prestige that in some places, particularly universities, there's a polite fiction that everyone is engaged in it.",
            "cn": "因为成就卓越拥有极高的声望，所以在某些地方——特别是大学里——存在一种“礼貌的虚构故事”，假装每个人都在从事卓越的工作。"
          },
          {
            "en": "And that is far from true.",
            "cn": "但这远非事实。"
          },
          {
            "en": "People within universities can't say so openly, but the quality of the work being done in different departments varies immensely.",
            "cn": "大学内部的人不能公开这么说，但不同部门所做工作的质量差异巨大。"
          },
          {
            "en": "Some departments have people doing great work; others have in the past; others never have.",
            "cn": "有些部门有人在做伟大的工作；有些部门过去有过；而有些部门从未有过。"
          },
          {
            "en": "Seek out the best colleagues.",
            "cn": "关于同事：寻找最好的同事。"
          },
          {
            "en": "There are a lot of projects that can't be done alone, and even if you're working on one that can be, it's good to have other people to encourage you and to bounce ideas off.",
            "cn": "很多项目无法独自完成。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Colleagues don't just affect your work, though; they also affect you.",
            "cn": "同事不仅影响工作，更影响你。"
          },
          {
            "en": "So work with people you want to become like, because you will.",
            "cn": "所以，和你想成为的人一起工作，因为你会变成他们。"
          },
          {
            "en": "Quality is more important than quantity in colleagues.",
            "cn": "在同事的选择上，质量重于数量。"
          },
          {
            "en": "It's better to have one or two great ones than a building full of pretty good ones.",
            "cn": "拥有一两个顶尖同事，胜过一楼不错的同事。"
          },
          {
            "en": "In fact it's not merely better, but necessary, judging from history: the degree to which great work happens in clusters suggests that one's colleagues often make the difference between doing great work and not.",
            "cn": "事实上，看历史就知道，伟大工作往往成簇出现，这意味着同事往往是成败的关键。"
          },
          {
            "en": "How do you know when you have sufficiently good colleagues?",
            "cn": "你怎么知道同事是否足够优秀？依我的经验，"
          },
          {
            "en": "In my experience, when you do, you know.",
            "cn": "当你拥有这样的同事时，你自然会知道。"
          },
          {
            "en": "Which means if you're unsure, you probably don't.",
            "cn": "这意味着如果你不确定，那你可能还没有。"
          },
          {
            "en": "But it may be possible to give a more concrete answer than that.",
            "cn": "如果要给出一个更具体的答案，我会试着这样说："
          },
          {
            "en": "Here's an attempt: sufficiently good colleagues offer surprising insights.",
            "cn": "足够优秀的同事能提供令人惊讶的见解。"
          },
          {
            "en": "They can see and do things that you can't.",
            "cn": "他们能看到并做到你无法做到的事。"
          },
          {
            "en": "So if you have a handful of colleagues good enough to keep you on your toes in this sense, you're probably over the threshold.",
            "cn": "所以，如果你有几个能在这种意义上让你保持警觉的同事，你就可能已经跨过了那个门槛。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Most of us can benefit from collaborating with colleagues, but some projects require people on a larger scale, and starting one of those is not for everyone.",
            "cn": "我们大多数人都能从与同事的合作中受益，但有些项目需要更大规模的人员协作，启动这类项目并不适合所有人。"
          },
          {
            "en": "If you want to run a project like that, you'll have to become a manager, and managing well takes aptitude and interest like any other kind of work.",
            "cn": "如果你想运作那样的项目，你就必须成为一名管理者，而管理像其他工作一样，需要天赋和兴趣。"
          },
          {
            "en": "If you don't have them, there is no middle path: you must either force yourself to learn management as a second language, or avoid such projects. [ 27 ]",
            "cn": "如果你不具备这些，就没有中间道路：你必须要么强迫自己将管理作为第二语言来学习，要么彻底避开此类项目。[27]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Husband your morale.",
            "cn": "呵护你的士气（Morale）。"
          },
          {
            "en": "It's the basis of everything when you're working on ambitious projects.",
            "cn": "当你致力于雄心勃勃的项目时，士气是基础。"
          },
          {
            "en": "You have to nurture and protect it like a living organism.",
            "cn": "你必须像呵护生命体一样呵护它。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Morale starts with your view of life.",
            "cn": "士气源于你的人生观。"
          },
          {
            "en": "You're more likely to do great work if you're an optimist, and more likely to if you think of yourself as lucky than if you think of yourself as a victim.",
            "cn": "如果你是乐观主义者，如果你觉得自己幸运而不是受害者，你更可能成就卓越。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Indeed, work can to some extent protect you from your problems.",
            "cn": "工作在某种程度上能保护你。"
          },
          {
            "en": "If you choose work that's pure, its very difficulties will serve as a refuge from the difficulties of everyday life.",
            "cn": "如果你选择的工作是纯粹的，"
          },
          {
            "en": "If this is escapism, it's a very productive form of it, and one that has been used by some of the greatest minds in history.",
            "cn": "它的困难本身就是逃避日常生活烦恼的避难所。这是一种非常高效的“逃避现实”。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Morale compounds via work: high morale helps you do good work, which increases your morale and helps you do even better work.",
            "cn": "士气通过工作产生复利：高士气帮你做好工作，"
          },
          {
            "en": "But this cycle also operates in the other direction: if you're not doing good work, that can demoralize you and make it even harder to.",
            "cn": "好工作提升士气。但反向循环也成立。"
          },
          {
            "en": "Since it matters so much for this cycle to be running in the right direction, it can be a good idea to switch to easier work when you're stuck, just so you start to get something done.",
            "cn": "所以，当你卡住时，转去做点容易的事，哪怕只是为了让那个正向循环转起来。"
          },
          {
            "en": "One of the biggest mistakes ambitious people make is to allow setbacks to destroy their morale all at once, like a balloon bursting.",
            "cn": "别让挫折一次性摧毁你的士气。"
          },
          {
            "en": "You can inoculate yourself against this by explicitly considering setbacks a part of your process.",
            "cn": "把挫折明确地视为过程的一部分。"
          },
          {
            "en": "Solving hard problems always involves some backtracking.",
            "cn": "解决难题总是包含“回溯”（Backtracking）。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Doing great work is a depth-first search whose root node is the desire to.",
            "cn": "成就卓越是一个 以欲望为根节点（Root node）的深度优先搜索（Depth-first search）。"
          },
          {
            "en": "So \"If at first you don't succeed, try, try again\" isn't quite right.",
            "cn": "所以“如果第一次没成功，就试了再试”是不准确的。"
          },
          {
            "en": "It should be: If at first you don't succeed, either try again, or backtrack and then try again.",
            "cn": "应该是：“如果第一次没成功，要么重试，要么回溯一步再试。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Never give up\" is also not quite right.",
            "cn": "“永不放弃”也不完全对。"
          },
          {
            "en": "Obviously there are times when it's the right choice to eject.",
            "cn": "有时弹射逃生是正确选择。"
          },
          {
            "en": "A more precise version would be: Never let setbacks panic you into backtracking more than you need to.",
            "cn": "更精确的版本是：别让挫折恐吓你，导致你回溯得比必要的更远。"
          },
          {
            "en": "Corollary: Never abandon the root node.",
            "cn": "推论：永远别抛弃根节点。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's not necessarily a bad sign if work is a struggle, any more than it's a bad sign to be out of breath while running.",
            "cn": "工作痛苦不一定是坏事，就像跑步喘不上气不一定是坏事一样。"
          },
          {
            "en": "It depends how fast you're running.",
            "cn": "这取决于你跑得有多快。"
          },
          {
            "en": "So learn to distinguish good pain from bad.",
            "cn": "要学会区分“好的痛苦”和“坏的痛苦”。"
          },
          {
            "en": "Good pain is a sign of effort; bad pain is a sign of damage.",
            "cn": "前者是努力的标志，后者是损伤的信号。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "An audience is a critical component of morale.",
            "cn": "观众 是士气的关键。"
          },
          {
            "en": "If you're a scholar, your audience may be your peers; in the arts, it may be an audience in the traditional sense.",
            "cn": "即使是很小的观众群也足够了。受众的价值绝非随规模线性增长。"
          },
          {
            "en": "Either way it doesn't need to be big.",
            "cn": "这对于名流来说是坏消息，"
          },
          {
            "en": "The value of an audience doesn't grow anything like linearly with its size.",
            "cn": "但对于刚起步的你来说是好消息，"
          },
          {
            "en": "Which is bad news if you're famous, but good news if you're just starting out, because it means a small but dedicated audience can be enough to sustain you.",
            "cn": "因为这意味着如果有一小群人真心热爱你的所作所为，那就够了。"
          },
          {
            "en": "If a handful of people genuinely love what you're doing, that's enough.",
            "cn": "尽可能避开中间人，直接面对观众。"
          },
          {
            "en": "To the extent you can, avoid letting intermediaries come between you and your audience.",
            "cn": "摆脱中间人是如此自由，"
          },
          {
            "en": "In some types of work this is inevitable, but it's so liberating to escape it that you might be better off switching to an adjacent type if that will let you go direct. [ 28 ]",
            "cn": "以至于如果切换到某个相邻的领域能让你直接面对观众，那么这或许是更好的选择。[28]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The people you spend time with will also have a big effect on your morale.",
            "cn": "你花时间相处的人也会对你的士气产生巨大影响。"
          },
          {
            "en": "You'll find there are some who increase your energy and others who decrease it, and the effect someone has is not always what you'd expect.",
            "cn": "你会发现，有些人能增加你的能量，而有些人则会消耗它；这种影响往往并不符合你的预期。"
          },
          {
            "en": "Seek out the people who increase your energy and avoid those who decrease it.",
            "cn": "寻找那些能增加你能量的人，避开那些消耗你能量的人。"
          },
          {
            "en": "Though of course if there's someone you need to take care of, that takes precedence.",
            "cn": "当然，如果有你需要照顾的人（这属于责任），则另当别论。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Don't marry someone who doesn't understand that you need to work, or sees your work as competition for your attention.",
            "cn": "别和不理解你“必须工作”的人结婚、或者将你的工作视为争夺你注意力的对手的人结婚。"
          },
          {
            "en": "If you're ambitious, you need to work; it's almost like a medical condition; so someone who won't let you work either doesn't understand you, or does and doesn't care.",
            "cn": "如果你野心勃勃，工作对你来说就像某种病症。如果伴侣不让你工作，要么是他们不懂你，要么是懂但不在乎。"
          },
          {
            "en": "Ultimately morale is physical.",
            "cn": "归根结底，"
          },
          {
            "en": "You think with your body, so it's important to take care of it.",
            "cn": "士气是生理性的。你是在用身体思考。"
          },
          {
            "en": "That means exercising regularly, eating and sleeping well, and avoiding the more dangerous kinds of drugs.",
            "cn": "锻炼、睡眠、饮食、以及远离那些较危险的药物，都很重要。"
          },
          {
            "en": "Running and walking are particularly good forms of exercise because they're good for thinking. [ 29 ]",
            "cn": "跑步和散步是尤为适宜的运动，因为它们有助于思考。"
          },
          {
            "en": "People who do great work are not necessarily happier than everyone else, but they're happier than they'd be if they didn't.",
            "cn": "[29]成就卓越的人不一定比其他人更快乐，"
          },
          {
            "en": "In fact, if you're smart and ambitious, it's dangerous not to be productive.",
            "cn": "但 比“没能成就卓越的自己”更快乐。"
          },
          {
            "en": "People who are smart and ambitious but don't achieve much tend to become bitter.",
            "cn": "聪明且野心勃勃的人，如果无所建树，往往会变得苦涩。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's ok to want to impress other people, but choose the right people.",
            "cn": "想要打动别人没问题，但要选对人。"
          },
          {
            "en": "The opinion of people you respect is signal.",
            "cn": "你尊敬的人的意见是 信号 （Signal），"
          },
          {
            "en": "Fame, which is the opinion of a much larger group you might or might not respect, just adds noise.",
            "cn": "名声（大众的意见）只是 噪声 （Noise）。某种工作的 声望 （Prestige）充其量只是一个滞后指标，"
          },
          {
            "en": "The prestige of a type of work is at best a trailing indicator and sometimes completely mistaken.",
            "cn": "有时甚至是完全错误的。如果你把任何事情做得足够好，"
          },
          {
            "en": "If you do anything well enough, you'll make it prestigious.",
            "cn": "你就能让它变得有声望。"
          },
          {
            "en": "So the question to ask about a type of work is not how much prestige it has, but how well it could be done.",
            "cn": "所以，关于某种工作，你要问的问题不是它有多少声望，而是 它能被做得多好。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Competition can be an effective motivator, but don't let it choose the problem for you; don't let yourself get drawn into chasing something just because others are.",
            "cn": "不要被竞争驱使去追逐别人都在追逐的东西。"
          },
          {
            "en": "In fact, don't let competitors make you do anything much more specific than work harder.",
            "cn": "竞争最好的作用是让你更努力，而不是帮你做选择。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Curiosity is the best guide.",
            "cn": "好奇心是最好的向导。"
          },
          {
            "en": "Your curiosity never lies, and it knows more than you do about what's worth paying attention to.",
            "cn": "你的好奇心从不撒谎，它比你更清楚什么值得关注。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Notice how often that word has come up.",
            "cn": "注意到了吗？"
          },
          {
            "en": "If you asked an oracle the secret to doing great work and the oracle replied with a single word, my bet would be on \"curiosity.\"",
            "cn": "“好奇心”这个词出现了多少次。如果问神谕（Oracle）成就卓越的秘密，我敢打赌答案只有一个词：好奇心。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That doesn't translate directly to advice.",
            "cn": "但这不能直接转化为建议。"
          },
          {
            "en": "It's not enough just to be curious, and you can't command curiosity anyway.",
            "cn": "光有好奇心不够，你也没法命令好奇心产生。"
          },
          {
            "en": "But you can nurture it and let it drive you.",
            "cn": "但你可以呵护它，让它驱动你。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Curiosity is the key to all four steps in doing great work: it will choose the field for you, get you to the frontier, cause you to notice the gaps in it, and drive you to explore them.",
            "cn": "好奇心贯穿成就卓越的全部四步：它为你选择领域，带你抵达前沿，让你发现缺口，并驱使你去探索。整个过程，"
          },
          {
            "en": "The whole process is a kind of dance with curiosity.",
            "cn": "就是一场与好奇心的共舞。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Believe it or not, I tried to make this essay as short as I could.",
            "cn": "不管你信不信，我已经尽力把这篇文章写短了。"
          },
          {
            "en": "But its length at least means it acts as a filter.",
            "cn": "但它的长度至少起到了过滤器的作用。"
          },
          {
            "en": "If you made it this far, you must be interested in doing great work.",
            "cn": "如果你读到了这里，你一定对成就卓越很感兴趣。"
          },
          {
            "en": "And if so you're already further along than you might realize, because the set of people willing to want to is small.",
            "cn": "如果是这样，你已经比你意识到的领先了一大截，因为 愿意去“想要”的人并不多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The factors in doing great work are factors in the literal, mathematical sense, and they are: ability, interest, effort, and luck.",
            "cn": "成就卓越的因素在数学意义上就是这几项：能力（ability）、兴趣、努力、"
          },
          {
            "en": "Luck by definition you can't do anything about, so we can ignore that.",
            "cn": "运气。运气无法控制，我们可以忽略。"
          },
          {
            "en": "And we can assume effort, if you do in fact want to do great work.",
            "cn": "既然你想成就卓越，努力也是默认值。"
          },
          {
            "en": "So the problem boils down to ability and interest.",
            "cn": "所以问题归结为：天赋 和 兴趣。"
          },
          {
            "en": "Can you find a kind of work where your ability and interest will combine to yield an explosion of new ideas?",
            "cn": "你能找到那个让你的天赋和兴趣结合并引爆新想法的工作吗？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Here there are grounds for optimism.",
            "cn": "我们要保持乐观。"
          },
          {
            "en": "There are so many different ways to do great work, and even more that are still undiscovered.",
            "cn": "成就卓越的方式千千万，未被发现的更多。"
          },
          {
            "en": "Out of all those different types of work, the one you're most suited for is probably a pretty close match.",
            "cn": "在所有这些类型中，最适合你的那个，哪怕不是完美契合，"
          },
          {
            "en": "Probably a comically close match.",
            "cn": "也可能是 可笑地契合。"
          },
          {
            "en": "It's just a question of finding it, and how far into it your ability and interest can take you.",
            "cn": "问题只在于找到它，并看看你的天赋和兴趣能带你走多远。"
          },
          {
            "en": "And you can only answer that by trying.",
            "cn": "你只有试了才知道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Many more people could try to do great work than do.",
            "cn": "很多人本可以尝试，却止步不前。"
          },
          {
            "en": "What holds them back is a combination of modesty and fear.",
            "cn": "阻碍他们的是 谦逊 和 恐惧 的混合体。"
          },
          {
            "en": "It seems presumptuous to try to be Newton or Shakespeare.",
            "cn": "试图成为牛顿或莎士比亚似乎太狂妄了；"
          },
          {
            "en": "It also seems hard; surely if you tried something like that, you'd fail.",
            "cn": "而且看起来太难了，"
          },
          {
            "en": "Presumably the calculation is rarely explicit.",
            "cn": "肯定会失败。"
          },
          {
            "en": "Few people consciously decide not to try to do great work.",
            "cn": "这种计算通常不是显性的，"
          },
          {
            "en": "But that's what's going on subconsciously; they shy away from the question.",
            "cn": "而是潜意识里发生的——他们回避了这个问题。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So I'm going to pull a sneaky trick on you.",
            "cn": "所以我要对你耍个花招。"
          },
          {
            "en": "Do you want to do great work, or not?",
            "cn": "你想成就卓越，还是不想？"
          },
          {
            "en": "Now you have to decide consciously.",
            "cn": "现在你必须有意识地做决定了。"
          },
          {
            "en": "Sorry about that.",
            "cn": "抱歉逼你一把。"
          },
          {
            "en": "I wouldn't have done it to a general audience.",
            "cn": "如果是一般观众我不会这么做。"
          },
          {
            "en": "But we already know you're interested.",
            "cn": "但我们知道，你感兴趣。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Don't worry about being presumptuous.",
            "cn": "别担心狂妄。"
          },
          {
            "en": "You don't have to tell anyone.",
            "cn": "你不必告诉任何人。"
          },
          {
            "en": "And if it's too hard and you fail, so what?",
            "cn": "如果太难失败了，那又怎样？"
          },
          {
            "en": "Lots of people have worse problems than that.",
            "cn": "很多人有比这更糟糕的问题。"
          },
          {
            "en": "In fact you'll be lucky if it's the worst problem you have.",
            "cn": "事实上，如果这是你最大的问题，那你算幸运的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Yes, you'll have to work hard.",
            "cn": "是的，你得努力工作。"
          },
          {
            "en": "But again, lots of people have to work hard.",
            "cn": "但还是那句话，很多人都在努力工作。"
          },
          {
            "en": "And if you're working on something you find very interesting, which you necessarily will if you're on the right path, the work will probably feel less burdensome than a lot of your peers'.",
            "cn": "如果你在做自己觉得非常有趣的事——若你在正确的道路上，这几乎是必然的——那这种工作大概率比你同龄人的工作要轻松得多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The discoveries are out there, waiting to be made.",
            "cn": "那些伟大的发现就在那里，等待着被看见。"
          },
          {
            "en": "Why not by you?",
            "cn": "为什么不是你呢？"
          }
        ]
      }
    ]
  },
  {
    "id": "people-rachel-weisz-archive",
    "cat": "人物",
    "title": "From the Archive: Rachel Weisz Quizzed by Artist and Writer Harland Miller",
    "titleZh": "档案回顾：蕾切尔·薇兹对谈艺术家哈兰·米勒",
    "url": "https://www.anothermag.com/fashion-beauty/12535/rachel-weisz-interviewed-by-artist-and-writer-harland-miller-aw11-cover-story",
    "source": "AnOther Magazine",
    "date": "2020-05-22",
    "addedAt": "2026-09-18",
    "pin": true,
    "readingMode": "full",
    "contentStatus": "complete",
    "extractorVersion": "people-full-v1",
    "person": "Rachel Weisz",
    "personZh": "蕾切尔·薇兹",
    "photoCount": 19,
    "photoCredit": "Craig McDean / AnOther Magazine",
    "peopleScore": 98.5,
    "peopleScoreParts": {
      "person": 0.95,
      "photography": 1,
      "story": 1,
      "english": 1,
      "interest": 1
    },
    "peopleVersion": "people-v2-full",
    "review": {
      "status": "approved",
      "visualChecked": true,
      "guideChecked": true,
      "articleChecked": true,
      "at": "2026-09-18T07:32:27.278Z",
      "scope": "full-original-text-and-photos",
      "fingerprint": "1701fa879c13d8c9b94956d0ae3b6681614f6e48a532f8359f1ad24a37fe68f1",
      "photoHashes": [
        "5980d4f238d6e6467f0ffc4a22cefa1aa20054715eacab9b0df8929f9c32c350",
        "34f5ac53ed54dc0aa2ed2a0bd55b6a2346f957be10af07c1539731d8fa3074bf",
        "a6e7f2c7ad136d3d12cb101929bbde7d8f021b7840ad6266a5118fcb45da2c32",
        "d6f35dde6d60dea36a027561efb9978b91565ef108e2afbb07be7602a40af6f1",
        "8c4cf2e2c412c6c03d16cd10a16e26aca348ca04882d5eafe475722d2110518a",
        "fd4499944b6a44702232103ad63bb18c047694694c9a9125654a1be3f0e5dc94",
        "51d040b82b7ea072f007e9253eea21e7e071061330f4328adfdc91c287c65294",
        "c9a1f5e54806c3178cb16399726b0948e111cc9b159ede21b924d14b003d2f8e",
        "7adb3a25d875f1322e2e965f2fb98315fb6a7ff011ddf493dd00e839585175be",
        "1cda464dde1413afc5fdf5052448a03d8853f8ca3efc3b58b5ee196532a8588a",
        "d5635f95f452c508b5a7618180d4702f5bb690501ee7ba0996f93aa52d964437",
        "2865cb8bc70e080da91a579d4da0846c429021e3bd2a78650631b1ee4c628e0f",
        "072e2476ea2ac02ceaa9b384b9e30f94920613b997ea1b6c1f79c8c58076ab58",
        "23f9f9b74e268a86d4cb15a473321ece134e2598ae02d547710ed3e2323951de",
        "84933c1022dbb7e3f05c5bbdec2993c8fee1fac4f9d187408ea7369d4f1daaa6",
        "b0a85c3aedcaf6d7808c5fb6a9b917d1d7d3e38b8da9752922dc1d4cf1864301",
        "bf7480e799708d5109f28f77e6f603cf3aaf7968c810dde61f8a5b4896997056",
        "8ad915db73b73ed16c0dd91f74863ba620f9d565016ecf489533105362a8f9e3",
        "85691391c30add775db08f96f8b22e96c093606b39f06c3e809d15b78d5b9f24"
      ]
    },
    "translation": {
      "status": "machine-checked",
      "issues": [],
      "sentenceCount": 185,
      "providers": {
        "qwen-mt": 136,
        "deepl": 49
      },
      "cacheNamespace": "people-full-v2"
    },
    "fingerprint": "1701fa879c13d8c9b94956d0ae3b6681614f6e48a532f8359f1ad24a37fe68f1",
    "sourceTextHash": "fb62eb5d28714084127e601d05d6d49de8c4453fa864a3e56f03efe7c8975bcf",
    "sourceTextWords": 2880,
    "sourceParagraphs": 84,
    "sourceImages": 19,
    "coverImg": "assets/covers/people-rachel-weisz-archive-0.jpg",
    "cover": "linear-gradient(135deg,#eadbcc,#855349)",
    "gradient": "linear-gradient(135deg,#eadbcc,#855349)",
    "photoSources": [
      "https://images-prod.anothermag.com/765/216-274-765-510/azure/another-prod/390/8/398041.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398040.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398039.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398034.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398033.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398032.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398031.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398030.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398029.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398028.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398027.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398026.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398025.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398024.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398023.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398022.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398021.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398020.jpg",
      "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398019.jpg"
    ],
    "paras": [
      {
        "img": "assets/covers/people-rachel-weisz-archive-0.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/765/216-274-765-510/azure/another-prod/390/8/398041.jpg"
      },
      {
        "sentences": [
          {
            "en": "Rachel Weisz’s Autumn/Winter 2011 cover story for AnOther Magazine featured a Craig McDean shoot inspired by the actor’s favourite choreographer, published alongside a conversation between Weisz and Harland Miller",
            "cn": "瑞秋·怀兹在《AnOther》杂志2011年秋冬季的封面故事中，拍摄了一组由克雷格·麦克迪恩执导、灵感源自她最喜爱的编舞家的照片，并与艺术家兼作家哈兰德·米勒进行了一场对话。她是全球顶级电影导演和时装设计师的宠儿，但在是否迎合好莱坞模式这个问题上，这位英国女演员却打破了常规。在这组为《AnOther》拍摄的剧照中，瑞秋·怀兹受到了后现代舞蹈传奇人物皮娜·鲍什的启发。以复杂角色和多变才华著称的她，手头已有至少八部重磅影片，但这位41岁的奥斯卡奖得主始终与好莱坞保持距离，选择将生活重心放在纽约，并凭借在伦敦舞台上的出色表现屡获殊荣。"
          }
        ],
        "sourceTag": "heading"
      },
      {
        "sentences": [
          {
            "en": "She’s the darling of the world’s greatest film directors and fashion designers, but when it comes to fitting the Hollywood mould, the British actress tears up the rule book.",
            "cn": "她是全球最顶尖的电影导演和时装设计师们的宠儿，但谈到迎合好莱坞的刻板印象时，这位英国女演员却彻底打破了常规。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Rachel Weisz was inspired by postmodern dance legend Pina Bausch in these stills, taken from a film made for AnOther.",
            "cn": "这些剧照取自为《AnOther》拍摄的一部影片，灵感来自后现代舞蹈传奇人物皮娜·鲍什。"
          },
          {
            "en": "Known for her complex roles and chameleon talent, the actress has no less than eight major films in the pipeline, but the 41-year-old Oscar-winner has always kept her distance from Hollywood, choosing to base herself in New York and collecting accolades for her performances on the London stage.",
            "cn": "这位女演员以其复杂的角色和多变的演技而闻名，目前已有不下八部重磅影片在筹备中，但这位41岁的奥斯卡奖得主始终与好莱坞保持距离，选择将生活重心放在纽约，并凭借在伦敦舞台上的出色表现屡获殊荣。"
          },
          {
            "en": "AnOther asked artist and writer Harland Miller, best known for his large-scale paintings based on Penguin paperbacks, to interview Weisz for our cover story.",
            "cn": "AnOther杂志请艺术家兼作家哈兰德·米勒——他以基于企鹅丛书平装本的大型绘画作品而闻名——为我们的封面故事采访瑞秋·怀兹。"
          },
          {
            "en": "It’s not the first time they’ve met, as Miller recalls …",
            "cn": "正如米勒所回忆的那样，这并不是他们第一次见面……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "After the Berlin wall fell I had decided to move there.",
            "cn": "柏林墙倒塌后，我决定搬到那里去。"
          },
          {
            "en": "Coincidentally a friend – “crazy Ella” – was driving out there from London the same weekend, and on an impulse her friend Rachel came along.",
            "cn": "巧合的是，一位朋友——“疯狂的艾拉”——那个周末正从伦敦开车前往那里，而她的朋友瑞秋一时兴起也一同前往。"
          },
          {
            "en": "I drove a black Jag at the time and Ella discreetly asked if Rachel could come with me; Ella drove a decommissioned London taxi and was embarrassed by how much it vibrated at anything over 50.",
            "cn": "当时我开着一辆黑色捷豹，艾拉悄悄地问我，瑞秋能不能跟我一起坐；她自己开的是辆退役的伦敦出租车，一超过50英里时速就抖得厉害，让她很不好意思。车队开得很慢，但正如人们所说，那正是我们一段美好友谊的开端。我记得途中停了几次喝咖啡，中间还乘了一趟夜渡轮，后来清晨的阳光透过希特勒沿通往柏林的道路栽下的那些银桦树洒了下来。"
          },
          {
            "en": "It was a slow convoy, but it was, as they say, the beginning of a beautiful friendship.",
            "cn": "那是一支缓慢的车队，但正如人们所说，这正是美好友谊的开端。"
          },
          {
            "en": "I recall a few coffee stops, the night ferry in between and then the morning sun flickering through the silver birch trees that Hitler had planted along the road to Berlin.",
            "cn": "我记得途中停了几次喝咖啡，中间还乘了一趟夜渡轮，然后清晨的阳光透过希特勒沿通往柏林的道路种植的银桦树斑驳洒落。现在回想起来，最让我印象深刻的是，瑞秋对那个周末迅速变得一团糟的状况表现得多么随和、多么适应自如。我借住的索菲恩大街上的公寓钥匙并没有像约定的那样放在门垫下。为了商量下一步该怎么办，我们去了家酒吧，结果喝醉了——我还把钱包弄丢了，接下来的一段时间里都没怎么吃东西。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-1.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398040.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-2.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398039.jpg"
      },
      {
        "sentences": [
          {
            "en": "What strikes me now, looking back, is how amiable and adaptable Rachel was to the way the weekend quickly fell apart.",
            "cn": "如今回想起来，最令我印象深刻的是，面对那个周末计划的迅速崩塌，瑞秋表现得是多么随和且善于应变。"
          },
          {
            "en": "The key for the apartment I was borrowing on Sophienstraße was not under the mat as promised.",
            "cn": "我借住的索菲恩大街公寓的钥匙，并没有像约定的那样放在门垫下面。"
          },
          {
            "en": "Contemplating the next move we went to a bar and got drunk – I lost my wallet and a period of not eating ensued.",
            "cn": "在考虑下一步该怎么做时，我们去了家酒吧喝得酩酊大醉——我弄丢了钱包，随后便有一段时间没吃东西。"
          },
          {
            "en": "Low blood sugar kicked in and turned everything black.",
            "cn": "低血糖发作，眼前顿时一片漆黑。"
          },
          {
            "en": "I’ve got a hazy memory of killing time in a succession of all-night bars.",
            "cn": "我依稀记得，后来在一家又一家通宵营业的酒吧里消磨了时间。"
          },
          {
            "en": "At some stage I seemed to come round from a trance into an empty club.",
            "cn": "不知何时，我仿佛从恍惚中回过神来，发现自己身处一家空荡荡的俱乐部里。"
          },
          {
            "en": "On the dance floor two figures silhouetted against a strobe light were headbanging to a heavy metal track – I hunted around for Rachel to say “Let’s get out of here”, only to discover that she was one of the two dancers.",
            "cn": "舞池里，两道剪影在频闪灯下随着一首重金属歌曲猛烈甩头——我四处张望，想找瑞秋说“咱们走吧”，结果发现她竟然就是那两名舞者之一。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-3.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398034.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-4.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398033.jpg"
      },
      {
        "sentences": [
          {
            "en": "I remember coming out into daylight and going to a café for breakfast.",
            "cn": "我记得走出室内，天已大亮，我们便去了一家咖啡馆吃早餐。"
          },
          {
            "en": "Afterwards Rachel somehow managed to make a telephone call (not that easy in East Berlin in those days) and was suddenly having to fly back to London.",
            "cn": "后来，瑞秋不知怎么设法打了个电话（在当时的东柏林可不那么容易），结果突然就得飞回伦敦。"
          },
          {
            "en": "After we dropped her at Tegel airport I realised she hadn’t really explained why she’d had to dash.",
            "cn": "在泰格尔机场把她送下飞机后，我才意识到她并没有真正解释自己为何要匆匆离开。"
          },
          {
            "en": "A characteristic reticence I soon discovered, when it comes to talking about herself.",
            "cn": "我很快发现，她一向在谈论自己时显得格外低调。"
          },
          {
            "en": "I vaguely got that it was something work related – an audition, a break – and I didn’t see her again for a year.",
            "cn": "我隐约知道那似乎与工作有关——可能是试镜，也可能是休息——之后整整一年都没再见到她。"
          },
          {
            "en": "But all things considered I’m imagining it went OK.",
            "cn": "不过综合来看，我想应该一切顺利吧。"
          },
          {
            "en": "Glancing at Rachel’s upcoming films, she’ll play a political activist in David Hare’s spy thriller Page Eight , step into the shoes of real-life Nebraskan cop Kathryn Bolkovac in Whistleblower , star in Jim Sheridan’s mystery Dream House and be directed by cinematic legend Terrence Malick in his follow up to Tree of Life.",
            "cn": "看看瑞秋即将上映的几部电影，她在大卫·哈雷的间谍惊悚片《第八页》中将饰演一名政治活动家，在《举报人》中将扮演真实存在的内布拉斯加州女警凯瑟琳·博尔科瓦克，在吉姆·谢里丹的悬疑片《梦幻之家》中担任主演，并在特伦斯·马利克这位电影大师继《生命之树》之后的新作中接受他的执导。"
          },
          {
            "en": "We met in Rachel’s New York apartment, where she lives with her young son, Henry.",
            "cn": "我们在瑞秋位于纽约的公寓里见面，她和年幼的儿子亨利住在这里。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-5.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398032.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-6.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398031.jpg"
      },
      {
        "sentences": [
          {
            "en": "Harland Miller: Where were we?",
            "cn": "哈兰德·米勒：我们刚才说到哪儿了？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Rachel Weisz: You were saying it’s a long walk up from the street if you don’t take the lift …",
            "cn": "瑞秋·怀兹：你刚才说，如果不坐电梯的话，从街上走上来可真够远的……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: It is a long way up, but at least you can’t hear the buzz of the tattoo gun from here.",
            "cn": "HM：虽然楼梯很长，但至少从这里听不到纹身机的嗡嗡声。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Oh, the tattoo shop downstairs!",
            "cn": "RW：哦，楼下的纹身店！"
          },
          {
            "en": "Don’t you like the sound?",
            "cn": "你不觉得那个声音很好听吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: No – it makes me want to get another tattoo, and one’s fine.",
            "cn": "HM：不——这让我想再纹一个，不过一个就够了。"
          },
          {
            "en": "Have you still got your ladder tattoo on your hip?",
            "cn": "你臀部上的梯子纹身还在吗？"
          },
          {
            "en": "That seems quite appropriate living all the way up here.",
            "cn": "“住在这栋楼的最顶层，这个纹身看起来还挺合适的。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "“I think most people look back on their childhood and think: ‘Phew!",
            "cn": "“我觉得大多数人都会回想起自己的童年，心想：‘呼！总算摆脱了！’不过当然，我在汉普斯特德花园郊区的一栋很不错的房子里长大，所以我又能懂什么呢？”——瑞秋·怀兹"
          },
          {
            "en": "I’m out of that!’ But of course, I grew up in a very nice house in Hampstead Garden Suburb, so what do I know?” – Rachel Weisz",
            "cn": "“我觉得大多数人都会回想起自己的童年，心想：‘呼！终于摆脱了！’但说实话，我在汉普斯特德花园郊区的一栋很不错的房子里长大，所以我又能懂什么呢？”——瑞秋·怀兹"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Yes, they don’t go away.",
            "cn": "RW：是的，它们不会消失。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: But you can laser them now.",
            "cn": "HM：不过现在可以用激光去除它们了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Yeah but why would I?",
            "cn": "RW：是啊，但我为什么要这么做呢？"
          },
          {
            "en": "I mean, those were the greatest times.",
            "cn": "我的意思是，那些真是最美好的时光。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: I should explain that after you left Cambridge you formed a theatre group with Sacha Hails and Rose Garnett and the play Slight Possession , which used a step ladder as a prop, was a play you took to Edinburgh Festival, which you also wrote and put on, right?",
            "cn": "HM：我得说明一下，你离开剑桥后，和萨莎·海尔斯以及罗斯·加内特组建了一个剧团，还把一部名为《轻微占有》的戏剧带到了爱丁堡艺术节。那部戏里用了一把折叠梯作为道具，而且还是你自己编剧并执导的，对吧？我想，一切就是从那里开始的。"
          },
          {
            "en": "Where it all began I guess.",
            "cn": "我想，一切就是从那里开始的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: That’s right, and actually I was thinking of adding to the tattoo somehow …",
            "cn": "RW：没错，其实我还在想要不要在纹身里再加点什么……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-7.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398030.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-8.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398029.jpg"
      },
      {
        "sentences": [
          {
            "en": "HM: A snake maybe?",
            "cn": "HM：也许来条蛇？那样就能形成一种阴阳平衡的感觉了。"
          },
          {
            "en": "That would create quite a yin-yang thing.",
            "cn": "那会形成一种很明显的阴阳效果。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Yeah – now that I’m so balanced!",
            "cn": "RW：是啊——现在我可平衡多了！"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: [Laughs] But what else were we saying … ?",
            "cn": "HM：[笑] 那我们刚才说到哪儿了……？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: I was saying I’d love a cigarette, and you were saying you’d had one in Beirut recently – your first in five years.",
            "cn": "RW：我当时说好想抽支烟，你则说你最近在贝鲁特抽了一支——那是你五年来的第一支。怎么回事？"
          },
          {
            "en": "How come?",
            "cn": "怎么会呢？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: I was having an exhibition there and had dinner with the minister of culture – a fabulous guy with an amazing voice and –",
            "cn": "HM：我当时在那里办展览，还和文化部长一起吃了顿饭——他是个很棒的人，嗓音特别好，而且——"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Voice?",
            "cn": "RW：声音？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Yeah, when I entered his place he was singing a Sinatra song, That’s Life .",
            "cn": "HM：是啊，我一走进他家，他就唱着一首辛纳屈的歌，《这就是生活》。"
          },
          {
            "en": "It’s a great song ...",
            "cn": "这是一首很棒的歌……"
          },
          {
            "en": "about suicide, I believe.",
            "cn": "据我所知，这是一首关于自杀的歌。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: I don’t know it.",
            "cn": "RW：我不认识这首歌。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Yeah you do.",
            "cn": "HM：是啊，你当然知道。"
          },
          {
            "en": "“That’s life / and I can’t deny it / many times I’ve thought of cutting out / but my heart won’t buy it ... ”",
            "cn": "“这就是生活／我无法否认／我曾多次想过要了断一切／但我的心不愿接受……”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Do you think he’s definitely talking about suicide?",
            "cn": "RW：你觉得他肯定是在说自杀吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-9.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398028.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-10.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398027.jpg"
      },
      {
        "sentences": [
          {
            "en": "HM: Well, in the loose semantics of “swing” that’s how I’d interpret “cutting out”, though I love it for that next line: “But my heart won’t buy it.” Because I’m not a fan of suicide.",
            "cn": "HM：嗯，在“摇摆乐”的宽泛语义里，我就是这样理解“cutting out”的，不过我特别喜欢后面那句：“But my heart won’t buy it.” 因为我不赞成自杀。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: No.",
            "cn": "RW：不。"
          },
          {
            "en": "No!",
            "cn": "不！"
          },
          {
            "en": "Never, as a mum I shrink from it.",
            "cn": "作为一位母亲，我对此感到畏惧。"
          },
          {
            "en": "But tell me, why were you smoking at the minister of culture’s house?",
            "cn": "不过告诉我，你为什么会在文化部长家抽烟？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Well he offered me one, and I thought the first thing I say here shouldn’t be “no”.",
            "cn": "HM：嗯，他给了我一支烟，我想我在这里说的第一句话总不该是“不”吧。然后我感觉一阵兴奋，就像第一次抽烟一样——你还记得你第一次抽烟时的感觉吗？"
          },
          {
            "en": "And I got a rush like it was my first time – do you remember yours?",
            "cn": "而且我感觉就像第一次一样兴奋——你还记得你第一次吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: It was in the Odeon ...",
            "cn": "RW：那是在奥德翁电影院……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: The Odeon?",
            "cn": "HM：奥德翁影院？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "“I thought Bowie was a poet in touch with God.",
            "cn": "“我认为鲍伊是一位与上帝心意相通的诗人。”"
          },
          {
            "en": "For me, he really dramatised not belonging in a really powerful and poetic way and when you’re 14 and you feel grotesque, it’s like: ‘I’ve found a friend’” – Rachel Weisz",
            "cn": "“对我来说，他以一种非常有力且富有诗意的方式，将那种格格不入的感觉演绎得淋漓尽致；当你14岁时觉得自己怪异得离谱，那感觉就像是：‘我找到一个知己了’”——瑞秋·薇兹"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: You used to be able to smoke in cinemas, didn’t you?",
            "cn": "RW：以前在电影院里可以抽烟，对吧？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: [Laughs] Yeah sure, when they were one and six.",
            "cn": "HM：[笑] 是啊，当时票价还是一先令六便士呢。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Well I was very young – I’d sneaked in to see Reds .",
            "cn": "RW：当时我还很小——我是偷偷溜进去看《红潮》的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: That Warren Beatty film?",
            "cn": "HM：是那部沃伦·比蒂的电影吗？"
          },
          {
            "en": "Wasn’t there some hoo-ha about it?",
            "cn": "当时不是还因此闹过一番风波吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: It was the most expensive movie ever made – then – which is kind of ironic since it was about going to Russia to fight for communism.",
            "cn": "RW：那部电影是当时有史以来制作成本最高的电影——这多少有些讽刺，因为它讲的正是去俄罗斯为共产主义而战的故事。"
          },
          {
            "en": "I watched it again recently – without cigarettes – and Diane Keaton was incredible.",
            "cn": "最近我又重温了这部电影——这次没有香烟的镜头——黛安·基顿的表演简直太棒了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-11.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398026.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-12.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398025.jpg"
      },
      {
        "sentences": [
          {
            "en": "HM: Was it to do with the way actors use cigarettes that made you pick it up?",
            "cn": "HM：你开始抽烟是因为受演员抽烟方式的影响吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: No, it was just ...",
            "cn": "RW：不，只是……"
          },
          {
            "en": "expected.",
            "cn": "理所当然。"
          },
          {
            "en": "I remember after school, there was a line of phone boxes on Edgware road, and that’s where everyone used to smoke.",
            "cn": "我记得放学后，埃奇韦尔路上有一排电话亭，大家以前都在那里抽烟。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Yeah, I remember phone boxes smelt of smoke ...",
            "cn": "HM：是啊，我记得电话亭里总弥漫着烟味……"
          },
          {
            "en": "and piss too, actually.",
            "cn": "而且还有尿味，真的。"
          },
          {
            "en": "I always associated that smell with being in love.",
            "cn": "我总是把那种味道和恋爱联系在一起。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Seriously?",
            "cn": "RW：真的吗？"
          },
          {
            "en": "How come?",
            "cn": "怎么会呢？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Well, when I first moved to London my girlfriend was back in Leeds – and there was no phone in my digs, so I’d go to the nearest phone box.",
            "cn": "HM：嗯，我刚搬到伦敦时，我女朋友还在利兹——而且我住的地方没有电话，所以我得去最近的公用电话亭。"
          },
          {
            "en": "You get that overly romantic sense of yourself when you’re in love don’t you – you’re walking down a deserted street, but you’re more than someone going to the pub, you are a person who is “In Love”.",
            "cn": "恋爱的时候，你总会觉得自己格外浪漫，对吧——你走在一条空荡荡的街上，可你不仅仅是个要去酒吧的人，而是一个“正在恋爱中”的人。"
          },
          {
            "en": "And you haul open the door to the phone box and ...",
            "cn": "你猛地拉开电话亭的门，然后……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: It smells of piss?",
            "cn": "RW：闻起来有尿味？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Yeah, and those things get mixed up in your head.",
            "cn": "HM：是啊，那些事在你脑子里就混在一起了。"
          },
          {
            "en": "But talking of formative experiences, you have a painting on your wall that reads: It Was Hell Says Former Child.",
            "cn": "不过说到那些塑造人生的经历，你墙上有一幅画，上面写着：“曾是地狱，一位前孩子的说法。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Yeah – you painted it!",
            "cn": "RW：是啊——是你画的！"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: I know, but I was wondering – maybe this is intrusive – but was it?",
            "cn": "HM：我知道，不过我在想——也许这有点唐突——但那段经历真的算是“地狱”吗？"
          },
          {
            "en": "Hell, I mean?",
            "cn": "我的意思是，地狱吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Oh!",
            "cn": "RW：哦！"
          },
          {
            "en": "[Laughs] You know, it’s funny because my Dad came over yesterday for Henry’s fifth birthday and he walked in and saw the painting and he’s Hungarian, and he started reading out loud: “It vas hell ...",
            "cn": "[笑] 你知道吗，真有趣，我爸爸昨天来参加亨利的五岁生日聚会，一进门就看到了那幅画。他是匈牙利人，于是开始大声念起来：“It vas hell ...” 可当他刚要念第二句时，话就卡在嘴边了，我这才意识到，这句话其实也可以被理解为一种直接的责备呢［笑］。不过嘛，我只是觉得挺好笑的。我们通常会听到“前拳击手”或“前总统”，可说到“前孩子”，只要熬过了青春期，谁不是个“前孩子”呢！而且我觉得，大多数人都会在回想自己的童年时心想：“呼——！”"
          },
          {
            "en": "” and as he began the second line it just died on his lips and I realised it could be read as a direct reproach [laughs].",
            "cn": "“当他开始读第二行时，话到嘴边就咽了回去，我这才意识到，这句话也可以被理解为一种直接的责备[笑]。”"
          },
          {
            "en": "But no, I just think it’s funny.",
            "cn": "不过，我只是觉得这挺有趣的。"
          },
          {
            "en": "You normally hear about a “former boxer” or “president” but the thing about a “former child” is, anyone who makes it past adolescence is a former child!",
            "cn": "你通常会听到“前拳击手”或“前总统”，但说到“前孩子”，其实只要熬过了青春期，谁不是“前孩子”呢！而且我觉得大多数人回想起自己的童年时都会想：“呼——总算摆脱了！”不过话说回来，我在汉普斯特德花园郊区的一栋很不错的房子里长大，所以我又能懂什么呢？HM：我一直对那一系列画作很感兴趣，想知道人们为什么会选择那样的标题。这些标题往往非常私人化，仿佛就是他们自己的故事。"
          },
          {
            "en": "And I think most people look back on their childhood and think: “Phew!",
            "cn": "而且我觉得大多数人回想起自己的童年时都会想：“呼！终于熬过来了！”"
          },
          {
            "en": "I’m out of that!” But of course, I grew up in a very nice house in Hampstead Garden Suburb, so what do I know?",
            "cn": "“我终于摆脱那段时光了！”不过话说回来，我在汉普斯特德花园郊区的一栋很不错的房子里长大，所以我又能懂什么呢？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-13.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398024.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-14.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398023.jpg"
      },
      {
        "sentences": [
          {
            "en": "HM: I’m always interested with that series of paintings, why people choose the titles they do.",
            "cn": "HM：我一直对那一系列画作很感兴趣，想知道人们为什么会选择那些标题。通常这些标题都很私人化，仿佛就是他们自己的故事。"
          },
          {
            "en": "It’s usually very personal, like it’s literally their story.",
            "cn": "它通常非常私人化，就像真的是他们的故事一样。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Yes, because the scale implies something quite epic about the subject.",
            "cn": "RW：是的，因为这种规模让人觉得主题颇具史诗感。"
          },
          {
            "en": "But actually, I thought it was about your childhood.",
            "cn": "不过，我还以为那是关于你的童年呢。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Well again, my childhood in Whitby was really idyllic.",
            "cn": "HM：嗯，再说一次，我在惠特比的童年确实非常美好。"
          },
          {
            "en": "Problems began later when I started wearing women’s clothes.",
            "cn": "问题是在我开始穿女装之后才出现的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: [Laughs] You wrote that book, Slow Down Arthur , about that whole time of dressing up – they’re making a film of it now?",
            "cn": "RW：[笑] 你写了那本书《慢下来，亚瑟》，讲的就是那段穿女装的时光——现在他们正在拍这部电影吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: It’s coming to a cinema not very near you, not very soon.",
            "cn": "HM：这部电影不会在离你很近的电影院上映，而且短期内也不会。"
          },
          {
            "en": "Development – as I’m sure you’re aware, is a bit of a roller coaster – one minute it’s happening, the next not.",
            "cn": "开发过程——正如你所知——就像坐过山车一样，时而进展顺利，时而又停滞不前。"
          },
          {
            "en": "But the story itself is timeless, so I know it will happen.",
            "cn": "但故事本身是永恒的，所以我知道它终会实现。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "“If I was a record, I’d be Beethoven.",
            "cn": "“如果我是一张唱片，我会是贝多芬。"
          },
          {
            "en": "It’s very raw and passionate, it makes you want to get out there and do your thing” – Rachel Weisz",
            "cn": "“它非常率真而充满激情，让人忍不住想走出去，做点自己的事。”——瑞秋·怀兹"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: I’m thinking it’s really relevant actually, in that today people have these comparatively sophisticated lifestyles and music is simply a part of that lifestyle – like a mood enhancer – so it’d be quite shocking to an audience now to see how then music wasn’t just a part of your lifestyle, it was your lifestyle.",
            "cn": "RW：我觉得这其实非常贴切，因为如今人们的生活方式相对更加精致，而音乐只是这种生活方式的一部分——就像一种提升情绪的工具——所以，如果让现在的观众看到，在过去音乐不仅仅是你生活方式的一部分，它就是你的生活方式，一定会感到相当震惊。你书中的角色齐格飞把这一点发挥到了极致，不是吗？他甚至觉得自己就是鲍伊。我的意思是，我一直认为鲍伊是一位与上帝相通的诗人……"
          },
          {
            "en": "Ziggy, the character in your book, takes that very far doesn’t he?",
            "cn": "你书中的齐格gy这个角色把这一点发挥得淋漓尽致，不是吗？"
          },
          {
            "en": "He thinks he’s Bowie.",
            "cn": "他认为自己就是鲍伊。"
          },
          {
            "en": "I mean, I thought Bowie was a poet in touch with God.",
            "cn": "我的意思是，我一直认为鲍伊是一位与上帝相通的诗人。"
          },
          {
            "en": "For me, he really dramatised not belonging in a really powerful and poetic way and when you’re 14 and you feel grotesque, it’s like: “I’ve found a friend!”",
            "cn": "对我来说，他以一种非常有力且富有诗意的方式，将“格格不入”这一主题演绎得淋漓尽致。当你14岁、觉得自己很怪异时，就会觉得：“我找到一个朋友了！”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Yeah – if you didn’t fit in back then, Bowie was your man.",
            "cn": "HM：是啊——如果你那时候格格不入，鲍伊就是你的偶像。"
          },
          {
            "en": "But I think it’s a universal story too; Ziggy’s imagination never really accepts his lot and so he creates an alternative world.",
            "cn": "不过，我觉得这也是一个普世的故事；齐格gy的想象力始终无法接受自己的命运，于是他创造了一个属于自己的世界。"
          },
          {
            "en": "People are still doing it now through, erm ...",
            "cn": "人们现在仍然在通过，嗯……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Britney Spears maybe?",
            "cn": "RW：也许是布兰妮·斯皮尔斯？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Maybe – and if you identify with Britney, God bless you, but I think that’s more to do with celebrity than art.",
            "cn": "HM：也许吧——如果你觉得自己和布兰妮很像，那真为你感到高兴，不过我觉得这更多是关于名人效应，而不是艺术。"
          },
          {
            "en": "Interestingly though, Britney did actually unhinge while singing about the everyday stuff didn’t she; guys, relationships …",
            "cn": "不过有趣的是，布兰妮在唱那些日常话题时确实有点失控，不是吗？比如男生、感情……而鲍伊虽然谈论的是边缘话题、疯狂与艺术，却显得相当清醒且理智。"
          },
          {
            "en": "Whereas Bowie, who was talking about marginal stuff, insanity and art, emerged as being quite savvy and together.",
            "cn": "而鲍伊，他谈论的是边缘话题、疯狂与艺术，却表现得相当精明且沉着。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Which brings me to your painting Incurable Romantic Seeks Dirty Filthy ... ?",
            "cn": "RW：这让我想到你的那幅画《无可救药的浪漫主义者寻找肮脏卑鄙的……》？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-15.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398022.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-16.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398021.jpg"
      },
      {
        "sentences": [
          {
            "en": "HM: ...",
            "cn": "HM：……"
          },
          {
            "en": "Whore .",
            "cn": "妓女。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Yeah, but not the wording, the design you used – it reminds me of an R.D.",
            "cn": "RW：是的，不过不是你用的措辞，而是那个设计——它让我想起了R.D."
          },
          {
            "en": "Laing book.",
            "cn": "莱恩的书。"
          },
          {
            "en": "His whole theory about schizophrenia, was that schizo madness was a sane reaction to an insane world.",
            "cn": "他关于精神分裂症的整个理论是，精神分裂症的疯狂是对一个疯狂世界的理智反应。"
          },
          {
            "en": "So his theory is, it’s being sane to be insane ...",
            "cn": "所以他的理论是，发疯其实是一种理智……"
          },
          {
            "en": "do you know what I mean?",
            "cn": "你明白我的意思吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Yeah ...",
            "cn": "HM：是啊……"
          },
          {
            "en": "but I’m in two minds [laughs].",
            "cn": "但我对此有些犹豫不决[笑]。"
          },
          {
            "en": "But let’s talk about a movie that is coming to a cinema near you – Whistleblower ?",
            "cn": "不过，我们来聊聊一部即将登陆您附近影院的电影——《吹哨人》？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Well, it’s a true story about Kathy Bolkovac, who I play, a cop from Nebraska, who was sent to the former Yugoslavia to work as part of the UN task force, basically police officers from around the world who were sent to Bosnia to restore law and order.",
            "cn": "RW：嗯，这是一个关于凯西·博尔科瓦克的真实故事——我饰演的就是她，一位来自内布拉斯加州的警察，被派往前南斯拉夫，作为联合国特遣队的一员工作，该特遣队基本上是由来自世界各地的警察组成，被派往波斯尼亚以恢复法律和秩序。"
          },
          {
            "en": "These people get diplomatic immunity, which means they can do whatever the hell they like, and so a really disturbing lawlessness ensued, in that, there were so many men stationed there, they basically needed sex.",
            "cn": "这些人享有外交豁免权，这意味着他们可以为所欲为，于是随之而来的是令人不安的无法无天——因为驻扎在那里的男性数量庞大，他们基本上需要性服务。"
          },
          {
            "en": "So this huge sex trafficking industry came about to service them, but it wasn’t like professional prostitutes came in, did their tricks and left.",
            "cn": "于是，一个庞大的性交易产业应运而生，旨在为他们提供服务，但这绝非职业妓女进门、提供服务后便离开那般简单。"
          },
          {
            "en": "These girls were captives – they were kept in cages like animals, and conditioned through physical and psychological torture to the point where they wouldn’t even think about trying to escape.",
            "cn": "这些女孩是被囚禁的——她们像动物一样被关在笼子里，并通过身体和心理上的折磨被驯服，以至于连逃跑的念头都不会再有。"
          },
          {
            "en": "It’s a really tough story, but what I loved about it is this woman Kathy Bolkovac.",
            "cn": "这是一个非常艰难的故事，但我最喜欢的是凯西·博尔科瓦克这位女性。"
          },
          {
            "en": "Everyone else turned a blind eye.",
            "cn": "其他人都视而不见。"
          },
          {
            "en": "I probably would have too …",
            "cn": "我大概也会吧……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: You think?",
            "cn": "HM：你觉得呢？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: I wouldn’t even know where to start ...",
            "cn": "RW：我甚至都不知道该从哪里入手……"
          },
          {
            "en": "but Kathy Bolkovac, because she was a cop and had this character where if she saw corruption she had to sort it out, started making trouble, big trouble because the UN were basically sanctioning it all, covertly, using UN trucks to bring these girls over the border, and she just blew the whistle.",
            "cn": "但凯西·博尔科瓦克不同，她是一名警察，性格使然，只要发现腐败现象就必须予以纠正。于是她开始惹上麻烦，而且是大麻烦，因为联合国实际上在暗中纵容这一切，甚至利用联合国的卡车把这些女孩偷运过境，而她却毅然揭发了真相。她并不是那种自以为是的道德家。她只是在履行自己的职责，为此不惜冒着生命危险——天哪，她居然还活着，真是令人惊叹。"
          },
          {
            "en": "She’s not a do-gooder moralist.",
            "cn": "她不是那种自以为是的道德家。"
          },
          {
            "en": "She was doing her job, and she completely risked her life – my God, it’s amazing she’s still alive.",
            "cn": "她在履行自己的职责，而且她完全冒着生命危险——天哪，她居然还活着，真是太不可思议了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: I guess the question would be, why not make a documentary about it?",
            "cn": "HM：我想问题可能是，为什么不拍一部关于这件事的纪录片呢？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Sure, and my answer would be, it’s a hugely important issue, but it’s also a character study of this woman who is at the centre of it: what would it be like to be like that?",
            "cn": "RW：当然，我的回答是，这确实是一个极其重要的议题，但同时这也是对那位身处事件核心的女性的一次人物刻画：那样的人生会是什么样呢？我可完全不是那种人，我可是个凡事都图个清静的人。"
          },
          {
            "en": "I’m nothing like that, anything for a quiet life.",
            "cn": "我可完全不是那样的人，我可是个喜欢过安稳日子的人。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: That conjures visions of a place in the country, keeping chickens.",
            "cn": "HM：这让人联想到乡间的一处居所，养着几只鸡。离住在哥谭市中心、纹身店楼上的生活可就远了。"
          },
          {
            "en": "The furthest away from living in the middle of Gotham City above a tattoo parlour.",
            "cn": "离住在哥谭市市中心、纹身店楼上的生活最远。"
          },
          {
            "en": "If this street were an album, I think it would be something like Appetite for Destruction .",
            "cn": "如果这条街是一张专辑，我觉得它会像《毁灭欲》那样。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: That’s like that game where you ask: “If you were a novel what would you be?” And people say, “Oh yeah, I’d be Tolstoy.” Well, if I was a record, I’d be Beethoven [laughs].",
            "cn": "RW：这就像那种游戏，你会问：“如果你是一本小说，你会是什么？”然后大家会说：“哦，那我肯定是托尔斯泰。”嗯，如果我是一张唱片，那我就是贝多芬（笑）。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-17.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398020.jpg"
      },
      {
        "img": "assets/covers/people-rachel-weisz-archive-18.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398019.jpg"
      },
      {
        "sentences": [
          {
            "en": "HM: Well, Beethoven’s quite similar to heavy rock.",
            "cn": "HM：嗯，贝多芬确实有点像重摇滚。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: It is – it’s very raw and passionate, it makes you want to just get out there and do your thing!",
            "cn": "RW：确实如此——它非常原始而充满激情，让人忍不住想走出去，做点什么！"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: I know what you mean – I feel capable of doing things when I’m listening to a bit of Ludwig van, that I immediately don’t feel capable of anymore when the record finishes.",
            "cn": "HM：我明白你的意思——听一点贝多芬的时候，我觉得自己能做很多事情，可等唱片一放完，我就立刻觉得自己又做不到那些事了。"
          },
          {
            "en": "But I’m wondering, is there a connection here between the rawness and passion of Beethoven and your love of fellow German Pina Bausch, who I know was the inspiration for the photos that will accompany this conversation?",
            "cn": "不过我想知道，贝多芬作品中的那种原始与激情，是否与你对同为德国人的皮娜·鲍什的热爱有关？据我所知，她正是将要伴随这次对话的那些照片的灵感来源。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: It’s a coincidence.",
            "cn": "RW：这只是个巧合。"
          },
          {
            "en": "AnOther came up with it as a premise not knowing that she’s my favourite choreographer – I’ve been a huge fan since I first saw her work at Edinburgh Festival.",
            "cn": "AnOther在提出这个想法时并不知道她是我的最爱的编舞家——自从我在爱丁堡艺术节上第一次看到她的作品以来，我就一直是她的超级粉丝。"
          },
          {
            "en": "In fact, I much prefer to watch a Pina Bausch performance than most plays or films.",
            "cn": "事实上，我更喜欢看皮娜·鲍什的演出，而不是大多数戏剧或电影。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Really?",
            "cn": "HM：真的吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Oh yeah.",
            "cn": "RW：哦，是的。"
          },
          {
            "en": "It’s like, “stop talking”, you know?",
            "cn": "“就是‘别说话’，你知道吧？”"
          },
          {
            "en": "No words.",
            "cn": "没有言语。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Well she wasn’t a big talker herself, was she?",
            "cn": "HM：嗯，她自己也不太爱说话，是吧？"
          },
          {
            "en": "She never really tried to explain her work, which ironically gave rise to quite a lot of heated debate ...",
            "cn": "她从未真正试图解释自己的作品，这反而引发了不少激烈的争论……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: Well there’s a lot of violence and sexuality and what she called “the pornography of pain” in her portrayal of human relations.",
            "cn": "RW：嗯，她的作品中有很多暴力、性以及她所谓的“痛苦的色情化”元素，用来表现人际关系。人们在精神上互相折磨，这也让一些评论家感到不安，因为她从未明确说明自己的道德立场。"
          },
          {
            "en": "People fucking with each other’s heads, and it alarmed some critics that she never made it clear where she was coming from, morally.",
            "cn": "人们互相玩弄心理，而她从未明确表明自己的道德立场，这让一些评论家感到不安。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Sure, but I remember at Sadler’s Wells thinking it was actually funny – compounded by the fact that nobody else was laughing.",
            "cn": "HM：没错，但我记得在萨德勒斯韦尔斯剧院时，我觉得这其实挺好笑的——尤其是当时周围没人笑。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: No, I think you’re right – it’s definitely funny, again I think that’s because there’s no words.",
            "cn": "RW：不，我觉得你说得对——这确实很有趣，我还是觉得是因为没有台词。"
          },
          {
            "en": "Which reminds me, the other night I went to see this Marina Abramovic performance …",
            "cn": "这让我想起，前几天晚上我去看了玛丽娜·阿布拉莫维奇的那场表演……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Where she sits in a chair and people sit opposite her and she just looks into your eyes for however long you can take it for?",
            "cn": "HM：就是她坐在椅子上，人们坐在她对面，她就一直盯着你的眼睛看，直到你受不了为止？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "RW: A minute or a day, and she’s been doing it for months now.",
            "cn": "RW：无论是一分钟还是一天，她已经这样坚持好几个月了。"
          },
          {
            "en": "Anyway, my friend knows her, and we met her in the loos, and Marina said to her – in her very Serbian accent – “Darling, the thing I learnt is don’t speak!",
            "cn": "总之，我有个朋友认识她，我们在洗手间碰到了她，玛丽娜用她那浓重的塞尔维亚口音对她说：“亲爱的，我学到的一点就是：别说话！"
          },
          {
            "en": "Just don’t speak – it ruins a relationship.",
            "cn": "别说话——这会毁掉一段感情。"
          },
          {
            "en": "A relationship is all about not speaking.” And I thought, wow!",
            "cn": "“一段关系的关键就在于不说话。”我心想，哇！"
          },
          {
            "en": "That’s so great!",
            "cn": "这太棒了！"
          },
          {
            "en": "Not that I’m not loving this conversation …",
            "cn": "倒不是说我不喜欢这次对话……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "HM: Fuck, my relationship must be in tatters then.",
            "cn": "HM：操，那我的感情肯定已经一团糟了。"
          },
          {
            "en": "But listen, as injunctions go, it’s clear we should stop now.",
            "cn": "不过，话说回来，既然已有禁令，显然我们现在就该停手了。"
          },
          {
            "en": "Let’s quit while we’re behind.",
            "cn": "趁现在还来得及，还是收手吧。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Hair: Esther Langham; Make-up: Mark Carrasquillo; Set design: Stefan Beckman at Exposure NY; B2Pro AC: Derek Nelson; B2ProFocus puller: Brendan Stumpf; B2Pro VTR: Enrique Castillo; B2Pro DIT: Alexandra Mulcahy; Manicure: Elle for Essie at The Wall Group; Photographic assistants: Chris Ferretti, Huan Daong-Nguyen; Styling assistants: Shola Rothenberg, Kacie Hansborough; Hair assistant: Marcos Diaz; Make-up assistant: Ariel Yeh; Set design assistants: Kelsey Hall, Jamen Whitlock; Production: Kate Collings-Post at North Six; Production assistants: Wendell Vaughan, Kevin Kendrick, Taylor Burgess, Corey Williams.",
            "cn": "发型：埃丝特·兰汉姆；化妆：马克·卡拉斯基略；布景设计：Exposure NY 的斯特凡·贝克曼； B2Pro助理摄像：德里克·尼尔森；B2Pro对焦员：布伦丹·斯图姆普；B2Pro录像师：恩里克·卡斯蒂略；B2Pro数字影像技术员：亚历山德拉·穆尔卡希；美甲：艾尔（代表Essie，隶属于The Wall Group）；摄影助理：克里斯·费雷蒂、胡安·道恩-阮； 造型助理：肖拉·罗滕伯格、凯西·汉斯伯勒；发型助理：马科斯·迪亚兹；化妆助理：阿里尔·叶；布景设计助理：凯尔西·霍尔、杰门·惠特洛克；制作：北六工作室的凯特·科林斯-波斯特；制作助理：温德尔·沃恩、凯文·肯德里克、泰勒·伯吉斯、科里·威廉姆斯。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "This story originally appeared in the Autumn/Winter 2011 issue of AnOther Magazine.",
            "cn": "本文最初发表于《AnOther Magazine》2011年秋冬刊。"
          }
        ],
        "sourceTag": "paragraph"
      }
    ]
  },
  {
    "id": "people-megan-fox-interview",
    "cat": "人物",
    "title": "Megan Fox",
    "titleZh": "梅根·福克斯专访",
    "url": "https://www.interviewmagazine.com/film/megan-fox-2",
    "source": "Interview Magazine",
    "date": "2010-06-02",
    "addedAt": "2026-09-18",
    "pin": true,
    "readingMode": "full",
    "contentStatus": "complete",
    "extractorVersion": "people-full-v1",
    "person": "Megan Fox",
    "personZh": "梅根·福克斯",
    "photoCount": 8,
    "photoCredit": "Craig McDean / Interview Magazine",
    "peopleScore": 97,
    "peopleScoreParts": {
      "person": 0.9,
      "photography": 1,
      "story": 1,
      "english": 1,
      "interest": 1
    },
    "peopleVersion": "people-v2-full",
    "review": {
      "status": "approved",
      "visualChecked": true,
      "guideChecked": true,
      "articleChecked": true,
      "at": "2026-09-18T07:32:27.278Z",
      "scope": "full-original-text-and-photos",
      "fingerprint": "78c25f75b57893bbfeaafabbd8d4e021f972818d12876367fd23467008b676b9",
      "photoHashes": [
        "e96f9a91d8e9fa07b5247e005f7826dc9756110324642b098c32700d2a13d587",
        "4142fbcf227c916f9c47995872e50440b75580252ad7f320aef7546ec48cc7d9",
        "2a6b5b1ab19cab83a4f5e060d14cd8e8b63378d7135a5ad7ff9280af9154c5cf",
        "6f0a03a3948c07f3608eac2b1989caaf15a412a1dc1cbe6d7e8a60d94cdb230d",
        "e969091a5d920fe65f1aa04e862acbf57ccca2c7e6a672e8c2aec72986fb0c76",
        "eeaf27f2f96f13b8f1908a3fdbc002ca44bc5ffafa404169c30e3dbdd954f2df",
        "be8a6371433c38a8ebf7571e55f610f36d54037cd252a9e91a2c3143de627522",
        "07283f61c0dd2ac86f76a40bc831fb5c831d3646d943763a77128aa7ebdb38ce"
      ]
    },
    "translation": {
      "status": "machine-checked",
      "issues": [
        "第 170 句数字待核对：2, 3"
      ],
      "sentenceCount": 203,
      "providers": {
        "qwen-mt": 171,
        "deepl": 32
      },
      "cacheNamespace": "people-full-v2"
    },
    "fingerprint": "78c25f75b57893bbfeaafabbd8d4e021f972818d12876367fd23467008b676b9",
    "sourceTextHash": "f4c51edae0df7516165ed9031dcd7bb8600b54aee15955ed25f15cf68b218cfd",
    "sourceTextWords": 3045,
    "sourceParagraphs": 58,
    "sourceImages": 8,
    "coverImg": "assets/covers/people-megan-fox-interview-0.jpg",
    "cover": "linear-gradient(135deg,#eadbcc,#855349)",
    "gradient": "linear-gradient(135deg,#eadbcc,#855349)",
    "photoSources": [
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-3_103242449093.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-1_103203615724.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-4_103259708332.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-7_103352931370-1000x655.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-3_103242449093-1000x655.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-6_10333362362-1000x655.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-2_103226729384-1000x655.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-8_103409418564.jpg"
    ],
    "paras": [
      {
        "sentences": [
          {
            "en": "Photographed by Craig McDean",
            "cn": "由克雷格·麦克迪恩拍摄"
          }
        ],
        "sourceTag": "heading"
      },
      {
        "img": "assets/covers/people-megan-fox-interview-1.jpg",
        "alt": "Megan Fox · 图片",
        "cap": "",
        "credit": "Craig McDean / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-1_103203615724.jpg"
      },
      {
        "img": "assets/covers/people-megan-fox-interview-2.jpg",
        "alt": "Megan Fox · 图片",
        "cap": "",
        "credit": "Craig McDean / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-4_103259708332.jpg"
      },
      {
        "sentences": [
          {
            "en": "When you’re a young woman in Hollywood who, like Megan Fox, has had a kind of sudden, massive fameconferred upon you—a fame that some argue is not necessarily commensurate with your work or even your talent—you have several options: You can move quickly to cash in on your popularity (e.g. make a record, launch a clothing line, do a reality show); you can go out of your way to make penance for your “unearned” success by signing on for serious projects of a certain artistic or social quality that are ultimately neither very artistic nor very social and don’t actually make any money (it’s very important that they don’t make any money—even accidentally); you can freak out, act out, and burn out; you can reject it all and run away and hide; or you can very quickly become hardened by the entire process.",
            "cn": "当你像梅根·福克斯那样，是好莱坞的一位年轻女性，突然获得了巨大的名声——这种名声在一些人看来并不完全与你的作品甚至才华相称——你有几种选择：你可以迅速利用自己的人气赚钱（比如出唱片、推出服装系列、参加真人秀）；你可以刻意通过参与一些标榜艺术或社会价值的严肃项目来“赎罪”，尽管这些项目最终既不怎么有艺术性，也不怎么关注社会问题，而且根本赚不到钱（重要的是，它们连意外赚钱都不行）；你可以情绪失控、行为过激，最终耗尽自己；你可以彻底拒绝这一切，逃离并躲起来；或者你也可以很快对整个过程变得麻木。总之，虽然立刻成名确实有一些显而易见的好处（比如赚点钱、获得一定的影响力、免费喝维他命水），但那些老套的应对方式却并不那么吸引人。24岁时，福克斯已经出演了两部票房大片——迈克尔·贝执导的CGI机器人巨制《变形金刚》（2007年）及其续集《变形金刚2：复仇之战》，这两部电影在全球累计票房超过15亿美元。"
          },
          {
            "en": "In short, while there are obvious perks to immediate, quaking celebrity (e.g. some money, a certain amount of power, free Vitaminwater), the well-worn escape routes are not entirely appealing.",
            "cn": "总之，尽管突如其来的巨大名气确实有一些显而易见的好处（比如赚点钱、掌握一定权力、还能免费喝维他命水），但那些老套的应对方式却并不那么吸引人。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "At the age of 24, Fox has already appeared in two blockbuster movies—Michael Bay’s CGI-robot juggernaut Transformers (2007), and its sequel, Transformers: Revenge of the Fallen —which, combined, have grossed more than $1.5billion worldwide.",
            "cn": "年仅24岁的福克斯，已参演了两部票房大片——迈克尔·贝执导的CGI机器人巨制《变形金刚》（2007年）及其续集《变形金刚2：复仇之战》，这两部影片在全球累计票房超过15亿美元。"
          },
          {
            "en": "Over the last few years, she has also done a series of other non- Transformers films, including How to Lose Friends and Alienate People (2008), and the campyDiablo Cody–written thriller Jennifer’s Body —the bulk of which have quickly wilted at the box office.",
            "cn": "过去几年里，她还参演了一系列非《变形金刚》的电影，包括《如何交朋友并影响他人》（2008年）以及由黛波拉·卡基编剧的怪诞惊悚片《珍妮弗的肉体》，但这些影片大多在票房上迅速失利。"
          },
          {
            "en": "But Fox’s penchant for offering up certain intimate-seeming details of her life in interviews—such as the same-sex romance that she once claimed to have had with a stripper named Nikita, or the location of her boyfriend Brian Austin Green’s name on her body she had tattooed (it’s in her lower swimsuit area)—has provided an entertaining sideshow.",
            "cn": "但福克斯在采访中乐于透露一些看似私密的生活细节——比如她曾声称与一名名叫尼基塔的脱衣舞女发生过同性恋情，或者她将男友布莱恩·奥斯汀·格林的名字纹在了自己身体上的位置（就在她的泳装下缘）——这些都为公众提供了一出有趣的“花边”节目。她还常常不请自来地提到一些名人名字：“要是能当安吉丽娜·朱莉的女朋友，我就会非常开心。”“我想吃罗伯特·帕丁森。”“奥利维亚·王尔德太性感了，性感得让我恨不得徒手掐死一头山牛。”多年来，关于流行文化运作方式的深刻洞见一直认为：名人的本质在于形象，而我们往往先将他们捧上天，再把他们打落尘埃。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "She’s also good about unprompted name-checks (“If I could just be Angelina [Jolie]’s girlfriend, I would be so happy.” “I want to eat Robert Pattinson.” “Olivia Wilde is so sexy she makes me want to strangle a mountain ox with my bare hands.”)",
            "cn": "她也很擅长在采访中不请自来地提到一些名人名字（“要是能当安吉丽娜·朱莉的女朋友，我就会非常开心。”“我想吃罗伯特·帕丁森。”“奥利维亚·王尔德太性感了，性感得让我想徒手掐死一头山牛。”）"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-megan-fox-interview-3.jpg",
        "alt": "Megan Fox · 图片",
        "cap": "",
        "credit": "Craig McDean / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-7_103352931370-1000x655.jpg"
      },
      {
        "sentences": [
          {
            "en": "For years, the great revelatory insights about the way pop culture works were that celebrity is about image and that we like to build people up in order to bring them down.",
            "cn": "多年来，关于流行文化运作方式的深刻洞见一直是：名人就是形象，而我们喜欢先捧高他们，再将他们打落谷底。"
          },
          {
            "en": "But for an actress like Fox, who came of age in the era of reality TV, social media, and second-to-second news cycles, these aspects of celebrity mythmaking (and breaking) are almost elementary.",
            "cn": "但对于像福克斯这样在真人秀、社交媒体和分秒必争的新闻周期时代成长起来的女演员来说，这些关于名人神话的构建与破除的方面几乎已是常识。"
          },
          {
            "en": "Fox herself has acknowledged as much, offering that some of the more outrageous things she has said in interviews were purely for effect, because—as an aforementioned a young actress in Hollywood who has had conferred upon her sudden, massive fame—she knows that she is playing a role, that we live in a culture evermore about images, sound bites, and archetypes, and she has decided that she needs to manipulate the system in order to avoid being consumed by it.",
            "cn": "福克斯本人也承认了这一点，她表示自己在采访中说过的一些颇为离谱的话纯粹是为了制造效果，因为——正如前面提到的那位在好莱坞一举成名的年轻女演员——她清楚自己正在扮演一个角色，我们生活在一个愈发注重形象、简短言论和典型化人物的文化里，而她也决定必须设法驾驭这个体系，以免被它吞噬。这固然有些玩世不恭，而且她确实是在自我塑造（正如大多数名人一样），但在福克斯身上，她所打造的人设以及她似乎处理自身名气的方式，都透露出一种深层的自我保护意识在起作用。福克斯会说一些惊人之语……"
          },
          {
            "en": "It’s somewhat cynical, yes, and true that she is self-invented (as most famous people are), but in Fox’s case, the persona she has created and the way she has seemed to process her own fame hints at an underlying element of self-preservation at work.",
            "cn": "是的，这多少有些玩世不恭，而且她确实也是自我塑造出来的（正如大多数名人一样），但在福克斯的例子中，她所塑造的人设以及她似乎处理自身名气的方式，都暗示着一种潜在的自我保护机制在起作用。"
          },
          {
            "en": "Fox says outrageous things.",
            "cn": "福克斯说一些耸人听闻的话。"
          },
          {
            "en": "She takes sexy pictures.",
            "cn": "她拍性感照片。"
          },
          {
            "en": "She looks good on film.",
            "cn": "她在镜头前看起来很美。"
          },
          {
            "en": "But she doesn’t try to pull at your heartstrings by pretending to bare her soul.",
            "cn": "但她并不会假装敞开心扉来博取观众的同情。"
          },
          {
            "en": "She doesn’t attempt to demystify herself through overexplanation.",
            "cn": "她并不试图通过过多的解释来揭开自己的神秘面纱。"
          },
          {
            "en": "She doesn’t try to really prove anything to you.",
            "cn": "她并没有刻意向你证明什么。"
          },
          {
            "en": "She just gives you what she thinks you want and keeps the important stuff for herself.",
            "cn": "她只是给你她认为你想要的东西，而把重要的东西留给自己。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Fox’s next two films— Jonah Hex , with Josh Brolin, Michael Fassbender, and John Malkovich, and Passion Play , with Mickey Rourke and Bill Murray—are both departures, the former a sci-fi comic-book Western about a horrifically scarred cowboy with a spiritual hole in his heart, the latter a magical-realist drama in which Fox’s character sprouts wings at puberty and is drafted into a traveling circus.",
            "cn": "福克斯接下来的两部电影——与乔什·布洛林、迈克尔·法斯宾德和约翰·马尔科维奇合作的《乔纳·赫克斯》， 以及与米基·洛克和比尔·默里合作的《激情戏》——都标志着她风格的转变：前者是一部科幻漫画风格的西部片，讲述了一位脸上布满恐怖疤痕、内心却充满精神空洞的牛仔；后者则是一部魔幻现实主义剧作，片中福克斯饰演的角色在青春期长出翅膀，随后被征召加入了一支巡回马戏团。"
          },
          {
            "en": "“I want to do different things,” said Fox, calling one early-May afternoon from Los Angeles, where she was busy preparing to film the third installment of Transformers .",
            "cn": "“我想尝试不同的东西，”福克斯说道。5月初的一个下午，她从洛杉矶打来电话，当时她正忙于为《变形金刚》第三部的拍摄做准备。"
          },
          {
            "en": "“I mean, Transformers is enormous, but it’s exhausting because it’s just this huge, huge machine,” she continued.",
            "cn": "“我的意思是，《变形金刚》规模确实庞大，但它也令人筋疲力尽，因为这简直就是一台庞大得惊人的机器，”她继续说道。"
          },
          {
            "en": "“The studio, the director—everyone has so much power in this project that the actors are sort of very small in the midst of this very large movie.” Days later, it was announced that Fox would no longer be a part of Transformers 3 .",
            "cn": "“制片方、导演——在这个项目中，每个人都有很大的话语权，演员在这样一部规模庞大的电影里显得相当渺小。”几天后，宣布福克斯将不再出演《变形金刚3》。"
          },
          {
            "en": "In a statement, she said that it was her decision, though some reports cited her rumored frosty relationship with Bay as the primary reason for her exit.",
            "cn": "在一份声明中，她表示这是自己的决定，不过有报道称，她与贝伊之间传闻不和的关系是她退出的主要原因。"
          },
          {
            "en": "(In an interview last year, she described Bay as a “tyrant” and, for typical Foxian effect, likened his on-set workaday methods to those of Napoleon and Hitler.)",
            "cn": "（在去年的一次采访中，她将贝伊形容为“暴君”，并以福克斯式的典型风格，将其片场的日常工作方式比作拿破仑和希特勒的做法。）"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-megan-fox-interview-4.jpg",
        "alt": "Megan Fox · 图片",
        "cap": "",
        "credit": "Craig McDean / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-3_103242449093-1000x655.jpg"
      },
      {
        "sentences": [
          {
            "en": "Now, as the door closes on Transformers , Fox is imagining a very different kind of career—and life—beyond it.",
            "cn": "如今，随着《变形金刚》系列的大门逐渐关闭，福克斯正憧憬着一个截然不同的职业生涯——以及人生。"
          },
          {
            "en": "To ensure we provided her with an ample foil, we recruited comedian Zach Galifianakis to interview her for this story—and he boldly went where few men have gone before.",
            "cn": "为了给她提供一个恰到好处的对比，我们请来了喜剧演员扎克·加利法纳基斯为这篇报道采访她——而他更是大胆地涉足了鲜有人敢涉足的领域。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "One final note: At the end of the photo shoot that accompanies this interview, which took place at the Chateau Marmont in L.A., Fox asked if she could keep the head of the mannequin seen in the story, which was made to look exactly like her, as a souvenir.",
            "cn": "最后一点：在这次采访的拍摄结束后，地点在洛杉矶的马蒙城堡酒店，福克斯问是否可以把照片中那个与她长得一模一样的假人头留作纪念品。当有人担心酒店外蹲守的狗仔可能会拍到她离开时，表面上是抱着自己的头时，福克斯并没有退缩。她也没有停下来担心小报会如何利用这样一张照片，或者人们会说些什么。"
          },
          {
            "en": "When the concern was raised that the paparazzi perched outside the hotel might get a picture of her leaving, ostensibly, carrying her own head , Fox didn’t blanch.",
            "cn": "当有人担心酒店外蹲守的狗仔队可能会拍到她离开时的画面——表面上看，她似乎正提着自己的头——福克斯却毫不在意。"
          },
          {
            "en": "She didn’t stop and worry about what the tabloids might do with such an image, what people might say.",
            "cn": "她并没有停下来担心小报会拿这样的照片做什么，或者人们会怎么说。"
          },
          {
            "en": "I mean, what would the caption be?",
            "cn": "我的意思是，标题会是什么？"
          },
          {
            "en": "She didn’t wring her hands or furrow her brow.",
            "cn": "她既没有紧张得搓手，也没有皱起眉头。"
          },
          {
            "en": "She just threw her head in a shopping bag and went on her way.",
            "cn": "她只是把头塞进一个购物袋里，然后继续往前走。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "ZACH GALIFIANAKIS: Megan?",
            "cn": "扎克·加利法纳基斯：梅根？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "MEGAN FOX: Yeah?",
            "cn": "梅根·福克斯：嗯？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: This is Zach . . .",
            "cn": "加利法纳基斯：这是扎克……嗯，加利法纳基斯。"
          },
          {
            "en": "um, Galifianakis.",
            "cn": "嗯，加利法纳基斯。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: How are you?",
            "cn": "福克斯：你好吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: I’m splendid.",
            "cn": "加利法纳基斯：我很好。"
          },
          {
            "en": "How are you?",
            "cn": "你好吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I’m great.",
            "cn": "福克斯：我很好。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: So before we begin, I wanted to thank you for allowing me to interview you.",
            "cn": "加利法纳基斯：所以在开始之前，我想感谢你让我来采访你。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I mean, it’s probably going to be awkward.",
            "cn": "FOX：我的意思是，这可能会有点尴尬。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: Well, no.",
            "cn": "加利法纳基斯：嗯，不。"
          },
          {
            "en": "It definitely will be.",
            "cn": "肯定会的。"
          },
          {
            "en": "My forte is awkwardness.",
            "cn": "我的强项就是尴尬。"
          },
          {
            "en": "But I don’t want it to be purposely awkward.",
            "cn": "但我不想让它故意变得尴尬。"
          },
          {
            "en": "Let’s make it organically awkward.",
            "cn": "让我们让它自然地变得尴尬吧。"
          },
          {
            "en": "You know, because we’ve never met before.",
            "cn": "你知道吗，因为我们以前从未见过面。"
          },
          {
            "en": "So maybe we’ll—I’m already talking too much. . . .",
            "cn": "所以也许我们会——我已经说得太多了……"
          },
          {
            "en": "Maybe it will be nice and smooth.",
            "cn": "也许会很顺利。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I think it’s possible.",
            "cn": "福克斯：我觉得有可能。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: Let’s start out with something simple.",
            "cn": "加利法纳基斯：我们先从简单的问题开始吧。"
          },
          {
            "en": "Where are you?",
            "cn": "你在哪里？"
          },
          {
            "en": "Are you at your house in L.A.?",
            "cn": "你在洛杉矶的家里吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: No.",
            "cn": "福克斯：不。"
          },
          {
            "en": "I was at my house, but we had to go pick up Brian’s son from school.",
            "cn": "我本来在家，但我们得去学校接布莱恩的儿子。"
          },
          {
            "en": "Now I’m on my cell phone.",
            "cn": "我现在在用手机。"
          },
          {
            "en": "It’s AT&T, so hopefully I won’t drop you.",
            "cn": "这是AT&T的网络，所以希望不会掉线。"
          },
          {
            "en": "But there’s a good chance that will happen.",
            "cn": "不过很有可能会掉线。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: I’m at a sidewalk café in New York.",
            "cn": "加利法纳基斯：我在纽约的一家街边咖啡馆。"
          },
          {
            "en": "I’m trying to get recognized.",
            "cn": "我正在努力让人认出我来。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I find that it’s easier to disguise yourself when you go to Florida or places like that, because no one is expecting to see a celebrity there.",
            "cn": "FOX：我发现，去佛罗里达州或类似的地方时，更容易把自己伪装起来，因为那里没人会想到会遇到名人。只要戴上帽子和眼镜，几乎没人会多看你一眼——毕竟，你为什么会出现在佛罗里达呢？人们总觉得，如果你是名人，就一定在好莱坞。但在纽约和洛杉矶这样的地方，大家都知道你住在那里，也知道你在试图伪装自己，所以总有人盯着你看。有时候，干脆不戴帽子和眼镜反而更好。"
          },
          {
            "en": "When you throw on a hat and glasses, no one really looks at you twice—because why would you be in Florida?",
            "cn": "当你戴上帽子和眼镜时，几乎没人会多看你两眼——因为谁会想到你会在佛罗里达呢？"
          },
          {
            "en": "People just assume that if you’re famous, you’re in Hollywood.",
            "cn": "人们总觉得，如果你是名人，你就应该在好莱坞。"
          },
          {
            "en": "But in places like New York and L.A., they know that you live there and that you’re trying to disguise yourself, so people are always looking.",
            "cn": "但在纽约和洛杉矶这样的地方，人们知道你住在那里，也知道你在试图伪装自己，所以总是盯着你看。"
          },
          {
            "en": "It’s almost better to not wear a hat and glasses.",
            "cn": "不戴帽子和眼镜反而更好。"
          },
          {
            "en": "I’ve actually stopped tinting my windows because the paparazzi look for trucks and cars with supertinted windows.",
            "cn": "我其实已经不再给车窗贴深色膜了，因为狗仔队专门找那些车窗贴得特别黑的卡车和轿车。"
          },
          {
            "en": "In New York, especially, so much of your life is spent on the streets.",
            "cn": "尤其是在纽约，你生活的很大一部分时间都在街上度过。"
          },
          {
            "en": "You don’t always want to be driving around in an SUV with a security guard.",
            "cn": "你并不总是想开着一辆配有保安的SUV到处跑。"
          },
          {
            "en": "You want to be able to walk to a restaurant; you want to go and do things.",
            "cn": "你想能够步行去餐厅；你想出去做点事情。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: I’ve been here for four hours.",
            "cn": "加利法纳基斯：我在这儿已经四个小时了。还没人认出我，真让人扫兴。"
          },
          {
            "en": "No one has recognized me, which is a real bummer.",
            "cn": "没有人认出我，真是太扫兴了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: [ laughs ] Yeah.",
            "cn": "福克斯：[笑] 是啊。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: When you walk the red carpet and you see all of these paparazzi animals taking your picture, what do you think?",
            "cn": "加利法纳基斯：当你走红毯时，看到那些狗仔队像野兽一样给你拍照，你会怎么想？"
          },
          {
            "en": "Do you think, “I’m just a tool for the Hollywood system.",
            "cn": "你会不会想：“我只是好莱坞体系的一个工具。”"
          },
          {
            "en": "I’m just here so an executive can buy another Bentley”?",
            "cn": "“我来这里只是为了给某个高管买下另一辆宾利吗？”"
          },
          {
            "en": "Are we just puppets?",
            "cn": "我们只是傀儡吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I don’t really resent being on the red carpet as much as I do having to deal with the paparazzi.",
            "cn": "福克斯：我其实并不怎么介意走红毯，真正让我恼火的是不得不应付那些狗仔队。"
          },
          {
            "en": "That actually makes me angry.",
            "cn": "这反而让我很生气。"
          },
          {
            "en": "The photographers on the red carpet—that’s their job.",
            "cn": "红毯上的摄影师——那只是他们的本职工作。"
          },
          {
            "en": "They’re usually pretty respectful, so I don’t mind.",
            "cn": "他们通常都挺有礼貌的，所以我并不介意。"
          },
          {
            "en": "I mean, I’m not pretentious enough to just sit around and think about how I’m a tool for the whole Hollywood machine.",
            "cn": "我的意思是，我倒没那么自命不凡，不会整天坐着琢磨自己不过是整个好莱坞机器的一颗螺丝钉。"
          },
          {
            "en": "But it has crossed my mind.",
            "cn": "不过，我确实想过这个问题。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-megan-fox-interview-5.jpg",
        "alt": "Megan Fox · 图片",
        "cap": "",
        "credit": "Craig McDean / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-6_10333362362-1000x655.jpg"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: If I were you, I wouldn’t eat a banana in public because of what they might say in a caption.",
            "cn": "加利菲亚纳基斯：要是我是你，我可不会在公共场合吃香蕉，就怕他们给配文写什么。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: Yes, there is that.",
            "cn": "福克斯：是啊，确实如此。"
          },
          {
            "en": "Every time I leave the house or we go anywhere, there is that paranoia.",
            "cn": "每次我出门或我们去任何地方，都会有那种疑神疑鬼的感觉。"
          },
          {
            "en": "We always have to watch for specific cars and specific signs that we’re being photographed.",
            "cn": "我们总是得留意特定的车辆和某些迹象，以防被偷拍。"
          },
          {
            "en": "The other day, I was having a private conversation on my phone, and I had to step out of my car to go into a Rite Aid.",
            "cn": "前几天，我正在用手机进行私下通话，不得不下车走进一家Rite Aid药店。"
          },
          {
            "en": "And there were like six photographers in the bushes photographing me the whole time.",
            "cn": "当时灌木丛里大概有六名摄影师，全程都在拍我。"
          },
          {
            "en": "It’s weird.",
            "cn": "这很奇怪。"
          },
          {
            "en": "It is overwhelming.",
            "cn": "这让人感到不堪重负。"
          },
          {
            "en": "At times it’s jarring.",
            "cn": "有时会让人感到刺眼。"
          },
          {
            "en": "You never know when someone is videotaping you or trying to capture your image.",
            "cn": "你永远不知道什么时候有人在拍你视频，或者试图捕捉你的影像。"
          },
          {
            "en": "I see how it makes some people crazy.",
            "cn": "我明白这会让一些人感到抓狂。"
          },
          {
            "en": "It’s a strange thing.",
            "cn": "这真是一件奇怪的事。"
          },
          {
            "en": "But I am really lucky.",
            "cn": "但我真的很幸运。"
          },
          {
            "en": "I don’t understand it.",
            "cn": "我不明白。"
          },
          {
            "en": "I don’t know how any of this has happened.",
            "cn": "我不知道这一切是怎么发生的。"
          },
          {
            "en": "I mean, I don’t sit around and say, “Gosh, I have to do this movie with this person.” I really, honestly, am much more focused on my personal life.",
            "cn": "我的意思是，我并不会整天坐着说：“天哪，我得和这个人一起拍这部电影。”说实话，我真的更关注自己的个人生活。我真的很想在某个时候组建一个家庭。这并不是说我就不重视事业——当然不是。我只是到了这样一个阶段，想多花些时间待在家里，陪伴家人。如果遇到很棒的项目，我当然会接下它。但我并没有主动去寻找什么特定的机会。"
          },
          {
            "en": "I’d really like to have a family at some point.",
            "cn": "我真的很想在某个时候有个家庭。"
          },
          {
            "en": "Not that I’m not focused on my career—of course I am.",
            "cn": "并不是我不关注自己的事业——当然我会关注。"
          },
          {
            "en": "But I’m just at that place where I want to spend some time at home and on my family.",
            "cn": "但我只是处于这样一个阶段，我想花些时间待在家里，陪伴家人。"
          },
          {
            "en": "And if a great project comes my way, then of course I’ll take it.",
            "cn": "如果有个很棒的项目找上门，我当然会接。"
          },
          {
            "en": "But I’m not actively out seeking something specific.",
            "cn": "不过我并不是在主动寻找什么具体的工作。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: [ outside again, wind noise ] The wind is blowing very hard in New York right now, so I’ve got to try to duck into a place where it’s not so windy.",
            "cn": "加利法纳基斯：[又到了户外，风声] 纽约现在的风特别大，所以我得找个不太刮风的地方躲一躲。那么告诉我，当别人问你那个问题时，你会不会觉得很烦？"
          },
          {
            "en": "So tell me, does it drive you crazy when people ask you that question?",
            "cn": "所以，当别人问你那个问题时，你会觉得很烦吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: What question?",
            "cn": "福克斯：什么问题？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: The question about this machine that you are a part of that forces you to go out and answer other ridiculous questions?",
            "cn": "加利法纳基斯：就是那个关于你所参与的这个“机器”的问题，它迫使你不得不出去回答其他一些荒谬的问题？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: Yeah, sometimes.",
            "cn": "福克斯：是啊，有时候。"
          },
          {
            "en": "I know you can’t really put actors or celebrities into two categories, but I’m going to right now: There are the people who really, really enjoy being celebrities, and then there are the people who came by it maybe by accident.",
            "cn": "我知道你其实很难把演员或名人分成两类，但我现在就试试：一类是那些非常非常喜欢当名人的，另一类则是可能纯属偶然才成为名人的。我就是那种极其注重个人隐私的人，所以我特别讨厌接受采访。因为就我到目前为止与媒体打交道的经历而言，我说的每一句话，无论本意多么单纯，似乎都会被扭曲、炒作，最后变成一些荒谬的新闻报道。"
          },
          {
            "en": "I’m one of those people who fiercely guards their privacy, so I hate doing interviews.",
            "cn": "我是那种非常注重保护个人隐私的人，所以我很讨厌接受采访。"
          },
          {
            "en": "Because just in terms of the experience I’ve had with the media so far, almost everything I say, no matter how innocent my intentions are, seems to get sort of manipulated and sensationalized and turned into some ridiculous news story.",
            "cn": "因为就我迄今为止与媒体打交道的经历而言，我说的几乎每一句话，无论我的本意多么单纯，似乎都会被某种方式地篡改、夸大，最终变成一则荒谬的新闻报道。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-megan-fox-interview-6.jpg",
        "alt": "Megan Fox · 图片",
        "cap": "",
        "credit": "Craig McDean / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-2_103226729384-1000x655.jpg"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: But that’s for people, selfishly, to sell their magazines and their products.",
            "cn": "加利法纳基斯：但那都是为了人们自私地推销他们的杂志和产品。"
          },
          {
            "en": "People don’t know that, for example, you could be doing an interview about candles, and you could say, “I like it when something is waxy and hot.” But then that gets taken out of context.",
            "cn": "人们并不知道，比如，你可能在接受一场关于蜡烛的采访时说：“我喜欢那种又蜡又烫的东西。”但这句话随后就会被断章取义。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: It just happens so much that I don’t want to open my mouth or speak anymore, because everything I say becomes scandalous.",
            "cn": "FOX：这种事情发生得太多了，以至于我都不想再开口说话了，因为我一说些什么就会被炒作成丑闻。这让人筋疲力尽。所以我有点厌倦了。我不看自己的相关新闻，所以每天都有什么报道我都不知道——只有当事情严重到需要采取紧急措施时，我的公关才会打电话给我，让我们赶紧处理一下负面影响。不过我觉得，如果说有什么的话，我反而把情况弄得更糟了。过去我一直不太愿意分享关于自己的任何真实信息，也不太愿意让别人真正了解我的生活，所以我有时候会说些话，故意让大家摸不着头脑，以为那才是我生活的真实样子。"
          },
          {
            "en": "It wears you out.",
            "cn": "这让人筋疲力尽。"
          },
          {
            "en": "So I’m a bit jaded.",
            "cn": "所以我有点厌倦了。"
          },
          {
            "en": "I don’t read my own press, so I don’t know what’s being reported on a daily basis—I only hear about things when they reach a sort of Def-Con status and my publicist calls me because we have to do some damage control.",
            "cn": "我不看自己的媒体报道，所以每天都有什么报道我都不知道——只有当事情严重到需要采取紧急应对措施时，我的公关才会打电话给我，让我们赶紧处理一下。"
          },
          {
            "en": "But I do feel like, if anything, I’ve sort of made it worse.",
            "cn": "不过我觉得，如果说有什么的话，我反而让情况变得更糟了。"
          },
          {
            "en": "In the past I’ve been reluctant to share any bits of truth about myself or to really let people in on my reality, so I have said some things to throw people off the scent of what’s really going on in my life.",
            "cn": "过去，我一直不太愿意分享关于自己的任何真相，也不太想让人们真正了解我的真实生活，所以我曾说过一些话，试图让他们偏离对我生活的真实看法。"
          },
          {
            "en": "So I have sort of aided the media in printing these misconceptions, which I regret.",
            "cn": "所以，我在某种程度上助长了媒体刊登这些误解，对此我感到后悔。"
          },
          {
            "en": "I’ve just come to the realization at this point that if I don’t feel like sharing, then I’m just not going to share.",
            "cn": "我刚刚意识到，如果我不想分享，那我就不会去分享。"
          },
          {
            "en": "But I’m not going to go out of my way to mislead people or keep them at a distance, because that doesn’t really get me anywhere either.",
            "cn": "但我不会刻意去误导别人，也不会刻意与人保持距离，因为那样对我也毫无益处。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: It’s American society.",
            "cn": "加利法纳基斯：这就是美国社会。"
          },
          {
            "en": "American society loves to prop people up and then take them down.",
            "cn": "美国社会喜欢把人捧上天，然后再打下来。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I agree with you.",
            "cn": "福克斯：我同意你的看法。"
          },
          {
            "en": "That’s why I’ve always at least tried to be self-deprecating when I say anything about myself.",
            "cn": "这就是为什么每当谈到自己时，我至少都会尽量自嘲一下。"
          },
          {
            "en": "As long as you set the bar low, it will keep people from putting you on a pedestal, so they can’t knock you off.",
            "cn": "只要你把标准定得低一些，人们就不会把你捧上神坛，也就无法把你打下来。"
          },
          {
            "en": "That’s been my plan all along, but it slipped away from me—because once you let the words go, you have no control over how they’re printed or what the media does with them.",
            "cn": "这一直是我一直以来的计划，但它从我手中溜走了——因为一旦你把话说出去，你就无法控制它们是如何被刊登的，也无法控制媒体会如何利用这些话。"
          },
          {
            "en": "So there’s no point in trying to make plans or to control it.",
            "cn": "所以，试图制定计划或试图控制它都没有意义。"
          },
          {
            "en": "When we were making the first Transformers —because it’s a movie about robots that’s based on a cartoon—I don’t think any of us realized that it would have the audience that it had.",
            "cn": "在拍摄第一部《变形金刚》时——因为这是一部基于动画片的机器人电影——我觉得我们谁都没有意识到它会拥有那样的观众群体。我真的觉得我们谁都没有预料到它会如此火爆。第二部的首映票房创下了影史最高纪录之一，真是不可思议。我从未想过自己会参与这样一个票房大片系列，更别说是那种能赚到那么多钱的系列了。"
          },
          {
            "en": "I just don’t think any of us expected it to be this huge.",
            "cn": "我只是觉得我们谁也没想到它会这么火。"
          },
          {
            "en": "The second one had one of the biggest openings of all time, which is crazy.",
            "cn": "第二部的首映票房创下了影史最高纪录之一，这真是太疯狂了。"
          },
          {
            "en": "I didn’t ever anticipate being part of a blockbuster franchise, let alone one that’s made the kind of money that those movies made.",
            "cn": "我从未想过自己会成为一部超级大片系列的一部分，更别说是那种票房如此惊人的系列了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-megan-fox-interview-7.jpg",
        "alt": "Megan Fox · 图片",
        "cap": "",
        "credit": "Craig McDean / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2010/06/img-megan-fox-8_103409418564.jpg"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: So what’s your favorite color?",
            "cn": "加利法纳基斯：那你最喜欢什么颜色？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: Green.",
            "cn": "福克斯：绿色。"
          },
          {
            "en": "What’s yours?",
            "cn": "你的呢？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: Specifically, it’s olive green.",
            "cn": "加利法纳基斯：具体来说，是橄榄绿。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: That’s really specific.",
            "cn": "福克斯：这可真具体啊。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: Well, this isn’t how I chose my favorite color, but I read somewhere that smart people tend toward green.",
            "cn": "加利菲亚纳基斯：嗯，我选最喜欢的颜色倒不是这么决定的，但我曾在某处读到，聪明人往往偏爱绿色。"
          },
          {
            "en": "So that’s good for both of us.",
            "cn": "所以这对我们俩来说都是好事。"
          },
          {
            "en": "Do you color anything green because you like it?",
            "cn": "你会因为喜欢而把什么东西涂成绿色吗？"
          },
          {
            "en": "Are your walls painted green?",
            "cn": "你的墙壁是绿色的吗？"
          },
          {
            "en": "Is your car green?",
            "cn": "你的车是绿色的吗？"
          },
          {
            "en": "And I don’t mean “eco” green—the color green.",
            "cn": "而且我说的不是“环保”的绿色——而是绿色这种颜色。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: No.",
            "cn": "福克斯：不。"
          },
          {
            "en": "I don’t have any green walls or cars or furniture at the moment.",
            "cn": "目前我家里没有绿色的墙壁、汽车或家具。"
          },
          {
            "en": "But if I’m going to draw a picture, I will usually go for the green crayon or colored pencil or marker.",
            "cn": "但如果我要画画的话，通常会选绿色的蜡笔、彩色铅笔或记号笔。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: I have a green 1998 Subaru.",
            "cn": "加利菲亚纳基斯：我有一辆1998年的绿色斯巴鲁。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: My dad drives a Subaru.",
            "cn": "FOX：我爸爸开一辆斯巴鲁。"
          },
          {
            "en": "I think it might be a Forester.",
            "cn": "我想那可能是一辆森林人。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: The Forester is a very good car.",
            "cn": "加利法纳基斯：森林人是一款非常好的车。"
          },
          {
            "en": "It gets good gas mileage.",
            "cn": "它的油耗很低。"
          },
          {
            "en": "Good for your dad.",
            "cn": "对你爸爸来说挺好的。"
          },
          {
            "en": "Now we’re getting somewhere.",
            "cn": "现在我们有点进展了。"
          },
          {
            "en": "Just out of curiosity, what kind of toothpaste do you use?",
            "cn": "只是好奇一下，你用什么牌子的牙膏？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I guess it kind of depends on where I last went grocery shopping.",
            "cn": "FOX：我想这得看我上次去哪家超市买牙膏了。"
          },
          {
            "en": "Crest Vivid White is a good toothpaste.",
            "cn": "佳洁士炫白牙膏是款不错的牙膏。"
          },
          {
            "en": "But I also use Tom’s of Maine.",
            "cn": "不过我也用汤姆的缅因牌牙膏。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: Tom’s of Maine is what I use.",
            "cn": "加利法纳基斯：我用的就是汤姆牌缅因牙膏。"
          },
          {
            "en": "I also use their condoms.",
            "cn": "我也用他们的安全套。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: [ Laughs ] Are they eco-friendly?",
            "cn": "福克斯：[笑] 它们是环保的吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: I just imagine these old grandma and grandpa people in Maine making condoms.",
            "cn": "加利法纳基斯：我就想象缅因州那些老奶奶和老爷爷在做安全套。"
          },
          {
            "en": "“These are made out of rubber trees. . .",
            "cn": "“这些是用橡胶树做的……”"
          },
          {
            "en": ".” [ Fox laughs ] Speaking of which, what is the tenderest moment you’ve ever had with one of your grandparents?",
            "cn": "“说到这个，你和祖父母之间最温馨的时刻是什么？”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: Most of my grandparents died when I was really young.",
            "cn": "FOX：我大多数的祖父母在我很小的时候就去世了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: Oh, I’m sorry.",
            "cn": "加利法纳基斯：哦，真抱歉。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: No, it’s okay.",
            "cn": "FOX：不，没关系。"
          },
          {
            "en": "I don’t know how tender this is, but my mother’s mother always favored me for some reason—out of all her grandchildren.",
            "cn": "我不知道这算不算很温馨，但我妈妈的妈妈不知为何总是特别偏爱我——在她所有的孙辈中。"
          },
          {
            "en": "When I was really young, maybe 2 or 3, I used to always ask her to get down on the floor and play My Little Pony or whatever I was into at the time, and as an excuse she would tell me that she had a bone in her knee.",
            "cn": "当我还是个很小的孩子，大概两三岁的时候，我总是让她坐在地板上和我一起玩《小马宝莉》，或者玩我当时喜欢的其他玩具。她每次都会找个借口，说自己的膝盖里有一根骨头。又过了三年我才明白，其实我们每个人的膝盖里都有骨头。于是我就直接揭穿了她，我记得她当时真的被我逗笑了。她就是我的奶奶，也就是我妈妈的妈妈……[交通噪音] 你听起来好像正处在一场飓风当中呢。"
          },
          {
            "en": "It took me another three years to figure out that we all have bones in our knees.",
            "cn": "我又过了三年才明白，我们每个人的膝盖里都有骨头。"
          },
          {
            "en": "So I eventually called her out on it, and I remember her being genuinely amused with me.",
            "cn": "所以我最终揭穿了她，我记得她真的被我逗笑了。"
          },
          {
            "en": "That was Nanny, my mom’s mom. . . .",
            "cn": "那是奶奶，我妈妈的妈妈……"
          },
          {
            "en": "[ traffic noise ] You sound like you’re in the middle of a hurricane.",
            "cn": "[交通噪音] 你听起来好像正处在飓风中心。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: I left the café, and now I’m in a vacuum-cleaner shop.",
            "cn": "加利法纳基斯：我离开了咖啡馆，现在正站在一家吸尘器店里。"
          },
          {
            "en": "Is that inconvenient?",
            "cn": "那不方便吗？"
          },
          {
            "en": "No, I’m running across the street right now.",
            "cn": "不，我现在正跑过马路。"
          },
          {
            "en": "I don’t know what street I’m on, but I’m ducking into a bar called Paddy Maguire’s Ale House. . . .",
            "cn": "我不知道自己在哪条街上，但我正跑进一家名叫帕迪·麦圭尔啤酒屋的酒吧……"
          },
          {
            "en": "[ bar noise ] Now I’m inside, but I’m out of breath. . . .",
            "cn": "[酒吧噪音] 现在我在酒吧里，但已经喘不过气来了……"
          },
          {
            "en": "[ to bartender ] Can I order a beer?",
            "cn": "[对酒保] 我可以点一杯啤酒吗？"
          },
          {
            "en": "[ bar noise ] Actually, now I’m moving to another place because in that last place there were a lot of old people who smelled bad. . . .",
            "cn": "[酒吧噪音] 实际上，我现在正要去另一个地方，因为刚才那个地方有很多老人，而且味道不太好闻……"
          },
          {
            "en": "[ street noise ] Now I’m at another outdoor café.",
            "cn": "[街道噪音] 现在我在另一家露天咖啡馆。"
          },
          {
            "en": "Hold on one second—[ to server ] Hello, how are you?",
            "cn": "等一下——[对服务员] 你好，最近怎么样？"
          },
          {
            "en": "[ noise ] Do you have a draft of some sort?",
            "cn": "[吧台声] 请问有生啤吗？"
          },
          {
            "en": "[ server’s voice: “Guinness, Stella, Harp . .",
            "cn": "[服务员的声音：“健力士、史蒂拉、哈普……”]"
          },
          {
            "en": ".” ] Harp will work.",
            "cn": "“哈普啤酒就行。”"
          },
          {
            "en": "Thank you.",
            "cn": "谢谢。"
          },
          {
            "en": "[ to Fox ] Sorry.",
            "cn": "[对福克斯] 对不起。"
          },
          {
            "en": "I needed to order a beer.",
            "cn": "我得点杯啤酒。"
          },
          {
            "en": "So what’s your idea of the perfect meal?",
            "cn": "那么，你心目中的完美餐点是什么？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: This is a good question, because there are a couple of different types of food I eat a lot.",
            "cn": "FOX：这是个好问题，因为我经常吃几种不同的食物。"
          },
          {
            "en": "I was raised in the South, in Tennessee, so I’m going to go with comfort food, soul food.",
            "cn": "我在南方的田纳西州长大，所以我会选择一些让人感到舒适、充满家乡味道的食物。"
          },
          {
            "en": "I would probably start with collard greens and candied baby carrots and then have some biscuits and white gravy—and for dessert, probably blackberry cobbler.",
            "cn": "我可能会先来点羽衣甘蓝和糖渍小胡萝卜，然后再吃点饼干配白汁，最后再以黑莓酥饼作甜点。"
          },
          {
            "en": "Having been in a relationship since I was 18, I’m very domestic, but I don’t enjoy cooking for myself.",
            "cn": "自从18岁开始谈恋爱以来，我一直很会料理家务，但我不喜欢给自己做饭。我并不介意为别人做饭——而且我很乐意为布莱恩和他的朋友们做。不过我不喜欢打扫卫生或洗碗，尽管我倒不介意洗衣服。"
          },
          {
            "en": "I don’t mind cooking for other people—and I like doing it for Brian and his friends.",
            "cn": "我不介意为别人做饭——而且我喜欢给布莱恩和他的朋友们做。"
          },
          {
            "en": "But I don’t like cleaning or washing dishes, although I don’t mind doing laundry.",
            "cn": "不过我不喜欢打扫卫生或洗碗，虽然我并不介意洗衣服。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GALIFIANAKIS: As a cook, what’s your specialty?",
            "cn": "加利法纳基斯：作为厨师，你的拿手菜是什么？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "FOX: I’m not a great cook, so I pretty much stick to the basics.",
            "cn": "福克斯：我厨艺不算好，所以基本只做些简单的菜。"
          },
          {
            "en": "I can do a pretty good chocolate-chip pancake.",
            "cn": "我能做一份相当不错的巧克力豆煎饼。"
          },
          {
            "en": "I can do a decent smoothie because when I was 15, I worked in a smoothie shop. . . .",
            "cn": "我能做一杯不错的冰沙，因为15岁的时候，我曾在一家冰沙店工作过……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "This is an excerpt of the cover story.",
            "cn": "这是封面故事的节选。"
          },
          {
            "en": "To read the full Megan Fox interview pick up a copy of Interview .",
            "cn": "要阅读完整的梅根·福克斯专访，请购买《Interview》杂志。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Zach Galifianakis a comedian and actor whose credits include The Hangover and Bored to Death.",
            "cn": "扎克·加利菲安纳基斯，一位喜剧演员兼演员，其代表作包括《宿醉》和《无聊至死》。"
          }
        ],
        "sourceTag": "paragraph"
      }
    ]
  },
  {
    "id": "people-zoey-deutch-rom-com",
    "cat": "人物",
    "title": "Zoey Deutch and Glen Powell Are Reviving the Rom-Com",
    "titleZh": "佐伊·多伊奇与格伦·鲍威尔：正在复兴爱情喜剧",
    "url": "https://www.interviewmagazine.com/film/zoey-deutch-and-glen-powell-are-reviving-the-rom-com",
    "source": "Interview Magazine",
    "date": "2022-12-14",
    "addedAt": "2026-09-18",
    "pin": true,
    "readingMode": "full",
    "contentStatus": "complete",
    "extractorVersion": "people-full-v1",
    "person": "Zoey Deutch",
    "personZh": "佐伊·多伊奇",
    "photoCount": 8,
    "photoCredit": "Christian Coppola / Interview Magazine",
    "peopleScore": 93,
    "peopleScoreParts": {
      "person": 0.9,
      "photography": 1,
      "story": 0.8,
      "english": 1,
      "interest": 1
    },
    "peopleVersion": "people-v2-full",
    "review": {
      "status": "approved",
      "visualChecked": true,
      "guideChecked": true,
      "articleChecked": true,
      "at": "2026-09-18T07:32:27.278Z",
      "scope": "full-original-text-and-photos",
      "fingerprint": "49a5f6a54ac1ecfee477335230c28a54a28f92c5c49c9775a2534b3a008234b9",
      "photoHashes": [
        "be2161d49cd48b1a9df548a19d4b3ea8e800a9ac0ab27c0d7e9928383aadce3c",
        "b38cf3c118d7ce6dad391552e4784367450288de621e76b271d941510d9538f0",
        "095225757843b93d53fbc85c150da4f366bd3385450c5c4b9e14d3acf1ba8a6f",
        "1f075d578baa7a72998da27f491813d8dfffc4c00897ac1ca0cf880f56a87125",
        "7a6fb4c30fdf128493352f60d8efa5765cb7352a109ac8b89c8ce1c7ad68dc55",
        "3b36c367412cbc85cbff415b2ac5a7e6a2ee2b0606198a100094e83e0bff28f8",
        "15b0361f0be0f9b5755cf34ec4c3da17757f5e17e56e95b3fdb794af79fdc531",
        "4c4d832c78b76ff15d03f12a2c2bc3ad0f2aa94b6bf023135aa70f2d15f66a67"
      ]
    },
    "translation": {
      "status": "machine-checked",
      "issues": [
        "第 84 句数字待核对：10",
        "第 207 句数字待核对：00"
      ],
      "sentenceCount": 217,
      "providers": {
        "qwen-mt": 173,
        "deepl": 44
      },
      "cacheNamespace": "people-full-v2"
    },
    "fingerprint": "49a5f6a54ac1ecfee477335230c28a54a28f92c5c49c9775a2534b3a008234b9",
    "sourceTextHash": "b35162debda062a1e7e8ed5b9689b0bede14213a511e000fd8bcc8d90f16dc7d",
    "sourceTextWords": 2953,
    "sourceParagraphs": 65,
    "sourceImages": 8,
    "coverImg": "assets/covers/people-zoey-deutch-rom-com-0.jpg",
    "cover": "linear-gradient(135deg,#eadbcc,#855349)",
    "gradient": "linear-gradient(135deg,#eadbcc,#855349)",
    "photoSources": [
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790004-scaled-e1671048240715.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790001-1019x1536.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790003-1019x1536.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790004-scaled.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790006-1019x1536.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790007-1019x1536.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790008-1019x1536.jpg",
      "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790010-1019x1536.jpg"
    ],
    "paras": [
      {
        "sentences": [
          {
            "en": "Photographed by Christian Coppola",
            "cn": "由克里斯蒂安·科波拉拍摄"
          }
        ],
        "sourceTag": "heading"
      },
      {
        "sentences": [
          {
            "en": "Styled by Mimi Wade",
            "cn": "由米米·韦德担任造型"
          }
        ],
        "sourceTag": "heading"
      },
      {
        "img": "assets/covers/people-zoey-deutch-rom-com-1.jpg",
        "alt": "Zoey Deutch · 图片",
        "cap": "",
        "credit": "Christian Coppola / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790001-1019x1536.jpg"
      },
      {
        "sentences": [
          {
            "en": "It seems like Zoey Deutch is everywhere these days.",
            "cn": "最近，佐伊·德尚似乎无处不在。"
          },
          {
            "en": "Between the meet-cute comedy Set It Up, the biting social media satire Not Okay, and crime thriller The Outfit , the Los Angeles native has found herself at the center of an impressively diverse slate of films as of late.",
            "cn": "从一见钟情的喜剧《Set It Up》、犀利的社交媒体讽刺片《Not Okay》，到犯罪惊悚片《The Outfit》，这位洛杉矶本地人最近发现自己置身于一系列令人印象深刻且风格各异的电影项目之中。"
          },
          {
            "en": "Her newest project to hit streaming is Something From Tiffany’s , a sweet holiday romance, produced by Reese Witherspoon and adapted from the novel by Melissa Hill.",
            "cn": "她最新登陆流媒体平台的作品是《蒂芙尼的礼物》（Something From Tiffany’s），这是一部温馨的节日爱情片，由瑞茜·威瑟斯彭监制，改编自梅丽莎·希尔的同名小说。"
          },
          {
            "en": "To help her make sense of the madness, Deutch called up her former Set It Up beau Glen Powell, currently starring in the film Devotion , to talk about finding that elusive work/life balance, the peaks and pitfalls of working with your heroes, and driving the rom-com renaissance together.",
            "cn": "为了理清这片混乱，德尤奇联系了曾在《Set It Up》中与她搭档的旧识格伦·鲍威尔——他目前正在出演电影《Devotion》——两人聊了聊如何寻找那难以捉摸的工作与生活平衡、与偶像合作时的巅峰与陷阱，以及如何共同推动浪漫喜剧的复兴。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "GLEN POWELL: Hey.",
            "cn": "格伦·鲍威尔：嗨。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "ZOEY DEUTCH: Oh my God.",
            "cn": "佐伊·德乌奇：天哪。"
          },
          {
            "en": "Are you exhausted, Glen?",
            "cn": "格伦，你累了吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: This is the first time that I’ve woken up where I was like, “I got enough energy to work out and it’s gross outside.” But instead I was like, “No, I’m going to stay in bed and chill.” I’m good though.",
            "cn": "鲍威尔：这是我第一次醒来时心想：“我有足够的精力去锻炼了，而且外面天气糟透了。”但我转念又想：“不，我要赖在床上放松一下。”不过我挺好的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: I feel terrible that I’m taking an hour of your time.",
            "cn": "德奇：真不好意思，占用了你一个小时的时间。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: No, I’m so happy we’re doing this.",
            "cn": "鲍威尔：不，我真的很高兴能和你聊聊。"
          },
          {
            "en": "We’re the tail end of it.",
            "cn": "我们算是收尾了。"
          },
          {
            "en": "You’re about to start your press gauntlet, and I’m just wrapping up mine.",
            "cn": "你马上就要开始密集的媒体采访了，而我刚好要结束我的部分。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Oh my God, your movie is so beautiful.",
            "cn": "德utch：天哪，你的电影太美了。"
          },
          {
            "en": "I know how long you’ve been working on it, and how hard you worked on it.",
            "cn": "我知道你为此花了多长时间，也有多努力。"
          },
          {
            "en": "It’s insane.",
            "cn": "太疯狂了。"
          },
          {
            "en": "What, in 2018 or something, 2017 [when you started]?",
            "cn": "你是2018年左右开始的吗，还是2017年？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: 2016 I read the book.",
            "cn": "POWELL：2016年我读了那本书。"
          },
          {
            "en": "Yeah, so it’s taken a long time.",
            "cn": "是啊，所以花了好长时间。"
          },
          {
            "en": "And it’s actually crazy, I was thinking about it.",
            "cn": "而且这真的挺不可思议的，我刚才还在想呢。"
          },
          {
            "en": "When I was shooting that movie, you were starting rehearsals for The Outfit .",
            "cn": "当我拍那部电影的时候，你正开始为《The Outfit》排练。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Yeah.",
            "cn": "德utch：是的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: And I remember that conversation we had when I was down there.",
            "cn": "POWELL：我记得那次我们在下面聊的那场对话。"
          },
          {
            "en": "We were talking about all the games that you were playing, but we were both scared to go into it.",
            "cn": "我们当时在聊你玩的各种游戏，但我们都害怕真正投入其中。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Yeah.",
            "cn": "德utch：是的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Now, being on the other side of it.",
            "cn": "POWELL：现在，我已经站在了另一边。"
          },
          {
            "en": "Because I remember being like, I don’t know if I have what it takes to do this movie.",
            "cn": "因为我记得当时想，我不知道自己有没有能力拍这部电影。"
          },
          {
            "en": "You felt the same way about The Outfit.",
            "cn": "你对《The Outfit》也有同样的感觉。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Yeah.",
            "cn": "德utch：是的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: And The Outfit is fantastic.",
            "cn": "POWELL：而且《The Outfit》非常棒。"
          },
          {
            "en": "It’s a good movie.",
            "cn": "这是一部好电影。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Thank you.",
            "cn": "德utch：谢谢。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: In terms of this journey where we both are, how are you feeling about where you are in this whole thing?",
            "cn": "POWELL：就我们俩目前的这段旅程而言，你觉得你现在处于什么状态？"
          },
          {
            "en": "I think it was a fun check in a couple years ago to talk about that, and then just being here where you have three movies coming out in the same year, it’s bananas.",
            "cn": "我觉得几年前聊聊那段经历挺有意思的，而现在你竟然一年就有三部电影上映，真是不可思议。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Isn’t it interesting how that happens?",
            "cn": "德utch：这不是很有趣吗，事情就是这样发生的？"
          },
          {
            "en": "I just put my head down, was just trying to work and get things made, and do things I was excited and passionate about, and then it happened that they all aligned in the way that they were supposed to.",
            "cn": "我只是埋头苦干，努力工作、推动项目进展，并参与那些让我感到兴奋和充满热情的事情，结果这些事情竟然在同一年里恰好都如期上映了。"
          },
          {
            "en": "I’m so grateful because I feel like I was able to exercise a lot of different muscles that I hadn’t in a long time, obviously because we were all unable to be on set.",
            "cn": "我非常感激，因为我觉得自己得以锻炼了许多许久未用的“肌肉”，这显然是因为我们大家都无法到片场拍摄。"
          },
          {
            "en": "It was cool to go from The Outfit, where I was intimidated to work with these great stage actors, one of the greatest actors of all time.",
            "cn": "从《The Outfit》开始，我感到有些紧张，因为要和这些杰出的舞台演员、甚至是史上最伟大的演员之一合作。"
          },
          {
            "en": "It triggered the “insecure I have an eighth grade education and no theater background” in me.",
            "cn": "这让我内心深处那个“觉得自己只有初中学历、没有戏剧背景而很不自信”的部分被触动了。"
          },
          {
            "en": "And then to go from that to Not Okay, which I produced, and I had been working on for a while, and it was a really fun, high octane, loud and insane character, to Something from Tiffany’s , which was so sweet, and lovely, and feel good, and really healing in so many ways after doing Not Okay .",
            "cn": "然后，我又从那部我担任制片、筹备已久的《Not Okay》——一个非常有趣、节奏明快、喧闹又疯狂的角色——转到了《Something from Tiffany’s》，这部电影既甜蜜又温馨，让人感觉很好，在拍完《Not Okay》之后，在很多方面都让我得到了治愈。虽然听起来有点自我陶醉，但确实如此。是的，如果要总结我现在的心情，我觉得自己比以往任何时候都更加感恩，真的很感恩。"
          },
          {
            "en": "As self indulgent as that sounds, it was.",
            "cn": "听起来虽然有点自我陶醉，但确实如此。"
          },
          {
            "en": "Yeah, I guess if I were to summarize how I feel at this moment, I feel really grateful, more than ever.",
            "cn": "是啊，我想如果要总结我现在的心情，那就是比以往任何时候都更加感激。真的很感激。那你呢，感觉怎么样？"
          },
          {
            "en": "Really grateful.",
            "cn": "真的很感激。"
          },
          {
            "en": "Yeah, how do you feel?",
            "cn": "是啊，你感觉怎么样？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-zoey-deutch-rom-com-2.jpg",
        "alt": "Zoey Deutch · 图片",
        "cap": "",
        "credit": "Christian Coppola / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790003-1019x1536.jpg"
      },
      {
        "sentences": [
          {
            "en": "POWELL: It’s crazy because Rick [Linklater] and I just finished a movie down in New Orleans.",
            "cn": "POWELL：太疯狂了，我和里克·莱特（Rick Linklater）刚刚在新奥尔良拍完一部电影。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: I know.",
            "cn": "德utch：我知道。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: We watched Not Okay together while we were down there.",
            "cn": "POWELL：我们在新奥尔良的时候一起看了《Not Okay》。"
          },
          {
            "en": "We finished the movie and legitimately we were both like, “Zoey is freaking fearless.” It’s crazy.",
            "cn": "我们把那部电影看完了，说真的，我们俩都惊呼：“佐伊真是太敢演了。”太不可思议了。那个角色在方方面面都毫不掩饰、无所顾忌。你看《The Outfit》，再看《Not Okay》，然后又看《Something From Tiffany’s》，这些角色之间根本没有任何共同点。我们当时就说：“这根本不是同一个人啊。”真是让人惊讶。我们俩都特别佩服，因为很多演员往往会自我放纵，总想着讨人喜欢，总想选那些符合某种特定形象的角色，而你在那个角色里却完全不在乎别人是否喜欢你，这种表现实在太酷了。"
          },
          {
            "en": "That character is unapologetic in every way.",
            "cn": "那个角色在方方面面都毫不掩饰。"
          },
          {
            "en": "When you look at The Outfit, and then you look at Not Okay, and then you look at Something From Tiffany’s , there’s literally no common thread in terms of character.",
            "cn": "当你看看《The Outfit》，再看看《Not Okay》，然后再看看《Something From Tiffany’s》时，这些角色之间真的没有任何共同点。"
          },
          {
            "en": "We were like, “That’s not the same person.” It was wild.",
            "cn": "我们当时就说：“那根本不是同一个人。”真是太不可思议了。"
          },
          {
            "en": "We were both just so impressed because every actor can be so indulgent, and wanting to be likable, and wanting to choose characters that are this and this, and you were so likable because you didn’t care about being liked in that role.",
            "cn": "我们都感到非常佩服，因为每位演员都可能很自我放纵，总想让自己讨人喜欢，总想挑选那些“这样、那样”的角色；而你却那么讨人喜欢，因为在那个角色里，你根本不在乎别人是否喜欢你。看到这一点真是太酷了。"
          },
          {
            "en": "It was such a cool thing to see.",
            "cn": "看到这一点真是太酷了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: I will take it from the man who is the most likable person on planet Earth.",
            "cn": "德utch：那我就听这位地球上最讨人喜欢的人的评价吧。你对“讨人喜欢”的标准很可靠，所以我就照单全收了。谢谢。"
          },
          {
            "en": "Your barometer for likability is trustworthy, so I’ll take it.",
            "cn": "你的“讨喜度”标准很可靠，所以我就信了。"
          },
          {
            "en": "Thank you.",
            "cn": "谢谢。"
          },
          {
            "en": "How did that movie go?",
            "cn": "那部电影拍得怎么样？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Oh my God!",
            "cn": "POWELL：天哪！"
          },
          {
            "en": "It’s going to be crazy.",
            "cn": "那会很疯狂的。"
          },
          {
            "en": "Rick seems really excited.",
            "cn": "Rick看起来真的很兴奋。"
          },
          {
            "en": "I talked to him yesterday about it, but that was another one where going back to our conversation where we talked about just throwing yourself into the deep end and doing things that scare you, that’s a movie where I’m playing 12 different characters.",
            "cn": "我昨天跟他聊了聊这件事，但那又是一次让我们回到之前那段对话的时候——我们当时谈到要勇敢地跳进深水区，去做那些让自己害怕的事。那是一部我饰演12个不同角色的电影。这部电影是我和他们一起编剧并制作的，我们全程都在一线奋战。我记得那种感觉，就像在《忠勇之家》开拍前一样，心里会想：“希望我能做到。希望我足够胜任。”"
          },
          {
            "en": "I wrote it and produced it with them and we were in the trenches the whole time.",
            "cn": "我与他们共同编剧并担任制片人，整个制作过程我们始终身处一线。"
          },
          {
            "en": "I remember the feeling, again the same feeling right before Devotion , where you go, “I hope this is in me.",
            "cn": "我记得那种感觉，还是和《Devotion》演出前一模一样，你会想：“希望我身上有这种感觉。”"
          },
          {
            "en": "I hope I’m good enough for this.”",
            "cn": "“希望我够格做这件事。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: I guess that people say you’re always supposed to feel that way.",
            "cn": "德奇：我想大家总说人应该一直有这种感觉。"
          },
          {
            "en": "It’s definitely daunting.",
            "cn": "这确实让人望而生畏。"
          },
          {
            "en": "People can say whatever they want about us, but we hustle.",
            "cn": "别人爱怎么说我们都行，但我们一直在拼命努力。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: There is no doubt.",
            "cn": "鲍威尔：毫无疑问。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: When I think about us meeting each other.How old were you?",
            "cn": "德奇：回想我们初次相遇的时候，你多大？"
          },
          {
            "en": "I was 19.",
            "cn": "我当时19岁。"
          },
          {
            "en": "I was 19 or 20, and you were 25?",
            "cn": "我当时19或20岁，而你25岁？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: 25.",
            "cn": "鲍威尔：25岁。"
          },
          {
            "en": "Yeah, something like that.",
            "cn": "是啊，大概就是这样。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Yeah, Austin.",
            "cn": "德奇：是啊，奥斯汀。"
          },
          {
            "en": "Making Everybody Wants Some!!",
            "cn": "拍摄《Everybody Wants Some!!》"
          },
          {
            "en": "Just the sheer ambition we both shared, and the curiosity, and the interest to create, and to make things, and to work.",
            "cn": "就是我们俩共同拥有的那种十足的雄心，还有那份好奇心，以及对创作、对制作事物、对工作的兴趣。看到你做了这么多，真的很酷。我们也做了这么多。"
          },
          {
            "en": "It’s just really cool to see how much you’ve done.",
            "cn": "看到你做了这么多，真是太酷了。"
          },
          {
            "en": "We’ve done.",
            "cn": "我们做到了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-zoey-deutch-rom-com-3.jpg",
        "alt": "Zoey Deutch · 图片",
        "cap": "",
        "credit": "Christian Coppola / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790004-scaled.jpg"
      },
      {
        "sentences": [
          {
            "en": "POWELL: I remember there was a moment where you were always fearless.",
            "cn": "POWELL：我记得有一段时间，你总是无所畏惧。"
          },
          {
            "en": "I remember you came in, and just with a force, you just came into the bunk room, you were talking to everybody.",
            "cn": "我记得你走进来时，带着一股气势，直接进了宿舍，跟每个人都在说话。我们当时就说：“哇，这姑娘真有劲儿，谁都拦不住她。”"
          },
          {
            "en": "We were like, “Damn, that girl’s got force.",
            "cn": "我们当时都说：“天哪，那女孩真有气势。”"
          },
          {
            "en": "That girl’s not going to be stopped.”",
            "cn": "“那个女孩是不会被阻止的。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Imagining though myself at that age, it was nine years ago or 10.",
            "cn": "DEUTCH：不过，回想一下我那个年纪，那是九年前还是十年前呢？我也记不太清了，但真的挺有趣的。当时我显然在过度表现，想让大家觉得我特别坚强、能独当一面，因为我是12个男生中唯一的女生。我们的导游是我以前从未合作过的人，我当时感到非常不自信。"
          },
          {
            "en": "I don’t know how long ago it was really, but it’s just so funny too.",
            "cn": "我也不太清楚那到底是多久以前的事了，不过想想也挺有趣的。"
          },
          {
            "en": "I was obviously overcompensating and trying to be perceived as being super tough, and I could handle myself because I was the only girl amongst 12 guys.",
            "cn": "我当时显然在过度表现，想让人觉得我特别坚强，而且我也确实能应付自如，因为我是12个男生中唯一的女生。我们的导游是我以前从未合作过的人，当时我觉得自己很没安全感。"
          },
          {
            "en": "Our tour director, I hadn’t ever worked with anyone in that space.",
            "cn": "我们的导游，我以前从未在那个领域与任何人合作过。"
          },
          {
            "en": "I felt so insecure.",
            "cn": "我感到非常不自信。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Other people, fastball is probably their sweet spot, but for me, it’s not.",
            "cn": "POWELL：对其他人来说，快速球可能是他们的拿手好戏，但对我来说不是。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: With these two movies that you’ve done most recently, what has been your journey, and you were kind of just talking about this, with calibrating, giving it a hundred percent as a producer or a writer and then the day that you get on set, letting go of that?",
            "cn": "德utch：就你最近拍的这两部电影而言，你的经历是怎样的？你刚才也提到过，既要以百分之百的投入去当制片人或编剧，到了开拍那天又要学会放手。那么，那些原本你应该亲自负责的事，你会交给谁去做呢？因为我在这方面就很难做到。我在片场时总想百分之百地做好制片人，也想百分之百地演好演员，但这是绝对不可能的。"
          },
          {
            "en": "Who do you give out the things that you would’ve otherwise been in charge of?",
            "cn": "你会把那些原本由你负责的事情交给谁呢？"
          },
          {
            "en": "Because I have a difficult time with that.",
            "cn": "因为我在这方面很吃力。"
          },
          {
            "en": "I want to be a hundred percent producer and a hundred percent actor when I’m on set, and you absolutely cannot.",
            "cn": "我想在片场百分之百地当制片人，也百分之百地当演员，但你根本做不到。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: No, but I think a lot of that trust comes down to hiring.",
            "cn": "POWELL：不，但我认为，这种信任很大程度上取决于招聘。"
          },
          {
            "en": "For instance, on Something From Tiffany’s , you’re with one of the best production companies in town.",
            "cn": "例如，在《Something From Tiffany’s》这部作品中，你与当地最优秀的制片公司之一合作。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Everybody was incredible.",
            "cn": "德意志：每个人都非常出色。"
          },
          {
            "en": "It was a me problem of relinquishing control.",
            "cn": "那是一个我如何放手的问题。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: I had a conversation with [Jonathan] Majors about this on Devotion .",
            "cn": "POWELL：我在《忠誠》拍摄期间曾与[乔纳森]·梅杰斯就此聊过。"
          },
          {
            "en": "I think the best thing a producer can do, is make sure that an actor, especially an actor/producer feels absolutely like, “Hey, we got this” so they can dive into that role.",
            "cn": "我觉得制片人能做的最好的事，就是让演员，尤其是身兼演员与制片人的演员，完全有那种“嘿，我们没问题”的感觉，这样他们就能全身心投入到角色中去。我甚至还记得在拍上一部电影时，有一次特别尴尬：我们一直在改剧本、改剧本、再改剧本，还要处理制片方面的各种问题，结果他居然直接说：“嘿，你得停一停，专心当个演员吧。”"
          },
          {
            "en": "I even remember with Rick, it was an awkward point on this last movie where we’re rewriting, rewriting, rewriting, and we’re putting out fires on the producing side, and then he’s literally like, “Hey, you need to stop.",
            "cn": "我甚至还记得和里克一起拍这部电影时，有个很尴尬的阶段：我们一直在改剧本、改剧本、再改剧本，还要处理制片方面的问题，结果他居然直接说：“嘿，你得停下来了。现在就专心演戏吧，那是你的角色。”那种角色切换真的挺别扭的。"
          },
          {
            "en": "Just be an actor.",
            "cn": "只要当好演员就好。"
          },
          {
            "en": "That’s your role now.” That gear shift is awkward.",
            "cn": "“那就是你现在该做的事了。”那种角色转换确实有点尴尬。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-zoey-deutch-rom-com-4.jpg",
        "alt": "Zoey Deutch · 图片",
        "cap": "",
        "credit": "Christian Coppola / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790006-1019x1536.jpg"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: My mom said one time she was like, “I always felt like when I was making movies and I had two babies, I was either a great mom one day or a great actress.",
            "cn": "DEUTCH：我妈妈有一次跟我说：“我总觉得，当我拍电影、同时还要照顾两个孩子的时候，要么有一天我是位好妈妈，要么有一天我是位好演员。我从来没有同时做到这两点。”我知道这和生孩子不一样，但这句话多少让我感同身受。总得有所取舍，那么什么才是当务之急呢？当然是表演。可当你太过于珍视某样东西时，攥得太紧，它就会在你手中裂开；攥得太松，它又会掉在地上。"
          },
          {
            "en": "I was never both.” I know it’s different than having a child, but it sort of resonates.",
            "cn": "“我从来不是两者兼得。”我知道这和生孩子不一样，但多少还是能引起共鸣。总得有所取舍，那么什么才是当务之急呢？当然是表演。可当你过于珍视某样东西时，攥得太紧，它就会在你手中裂开；攥得太松，它又会掉在地上。"
          },
          {
            "en": "Something’s got to give, and what’s the priority?",
            "cn": "总得有所取舍，那么什么才是优先的呢？"
          },
          {
            "en": "It’s of course, the performance.",
            "cn": "当然，是表演。"
          },
          {
            "en": "But when you love something, hold it too tight, it cracks in your hand.",
            "cn": "但当你过于珍视某样东西时，握得太紧，它就会在你手中裂开。"
          },
          {
            "en": "Hold it too loose, it falls on the ground.",
            "cn": "如果握得太松，它就会掉在地上。"
          },
          {
            "en": "How do you hold the cup just enough that it just stays in your hand?",
            "cn": "你怎么才能把杯子拿得恰到好处，让它稳稳地待在手里？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: I feel like you have been amazing with the fact that you spin all these plates, and you’re a good friend to people, you’re close with your family.",
            "cn": "POWELL：我觉得你真的很了不起，能把这么多事情都兼顾好，对朋友很贴心，和家人也很亲近。这是我人生中第一次觉得有些事情开始顾不上了。我不知道你是不是也有这种感觉，当你想同时做很多事情的时候。我一直在琢磨，你是怎么在“丢盘子”的同时还能对自己保持满意呢？"
          },
          {
            "en": "This is the first time in my life where I feel like plates are dropping.I don’t know if you feel like that, when you try to do a million things.",
            "cn": "这是我人生中第一次觉得“盘子”在掉下来。我不知道你是不是也有这种感觉，当你试图同时做很多事情的时候。"
          },
          {
            "en": "I’m trying to figure out, how are you okay with yourself while dropping plates?",
            "cn": "我在想，当你把盘子都掉在地上时，你是怎么对自己还觉得没问题的？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: That’s amazing awareness.",
            "cn": "德utch：这真是了不起的自知之明。"
          },
          {
            "en": "I totally understand that.",
            "cn": "我完全理解这一点。"
          },
          {
            "en": "I’m really bad at spinning all the plates while I’m shooting.",
            "cn": "我在拍摄时真的很不擅长同时兼顾所有事情。"
          },
          {
            "en": "I’m very close with my sister, I’m very close with my family, as you are.",
            "cn": "我和我姐姐关系很亲密，我和我的家人也一样亲密。"
          },
          {
            "en": "I would come home after being gone for three months, laser focused on shooting, and I’d be like, “How are you?” She’d be like, “I’m resentful.",
            "cn": "我会在外出拍摄三个月后回家，那时我全神贯注于工作，然后我会问：“你好吗？”她就会说：“我很不满。有些时候我需要你，而你也可能需要我。我们难道就应该立刻回到从前的状态吗？”当然，这些并不是原话。我只是从那次对话中体会到：你不能指望一回来，一切就都恢复如初。“如果你在工作时无法为我留出空间，这是你需要坦诚沟通的事情，我们也必须讨论这个问题，但别回来后还期待一切都能百分之百和以前一样。”这一点对我来说真的很难接受。"
          },
          {
            "en": "I needed you at times and you could’ve needed me.",
            "cn": "“有时候我需要你，而你也可能需要我。”"
          },
          {
            "en": "We’re supposed to just jump back in?” Obviously, these aren’t direct quotes.",
            "cn": "“我们难道就该直接回到从前吗？”显然，这些并不是原话。"
          },
          {
            "en": "This is an idea of what I took from the conversation was that you can’t expect to come back and everything be back to the way that it was.",
            "cn": "我从那次谈话中得到的一个想法是，你不能指望一回来，一切就都恢复到原来的样子。"
          },
          {
            "en": "“If you cannot hold space for me while you are working, that’s something you need to be able to relay and we have to be able to talk about that, but don’t come back and expect that everything’s going to be a hundred percent the same,” which was really hard for me to grasp.",
            "cn": "“如果你在工作时无法为我留出空间，那这是你需要能够传达出来的事情，我们也必须能够就此沟通，但别回来就指望一切都会百分之百和以前一样。”这一点对我来说真的很难理解。"
          },
          {
            "en": "I’ve been trying to do a better job of spinning those plates better and being present and holding space, while also having boundaries and taking care of myself.",
            "cn": "我一直在努力更好地平衡各项事务，同时保持专注、给予彼此空间，也设定界限、照顾好自己。这对我来说是最大的挑战，毕竟谁都想把一切都做到位。我知道你也想拥有一切：既拥有良好的人际关系、亲密的伴侣关系和真挚的友谊，又不失进取心。而且我们连孩子都没有呢，真是的。鲍威尔：这也是让我真正感到害怕的一点。"
          },
          {
            "en": "Which is the ultimate challenge, as someone who wants to have it all right.",
            "cn": "对于一个想要面面俱到的人来说，这确实是最大的挑战。"
          },
          {
            "en": "I know you want to have it all.",
            "cn": "我知道你也想兼顾一切。"
          },
          {
            "en": "You want to have great relationships, and partnership, and friendships, while also being ambitious?",
            "cn": "你想拥有美满的人际关系、伴侣关系和友谊，同时又充满野心？"
          },
          {
            "en": "And we don’t even have kids, fuck.",
            "cn": "而且我们连孩子都没有，真他妈的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: That’s the other thing that actually scares me.",
            "cn": "鲍威尔：这其实是我真正感到害怕的另一件事。"
          },
          {
            "en": "That’s a thing that’s not even on the horizon and I feel like I don’t even have time.",
            "cn": "这事连地平线上都还没出现，我就感觉自己根本没时间了。"
          },
          {
            "en": "How does someone like Reese do that?",
            "cn": "像瑞茜这样的人是怎么做到的？"
          },
          {
            "en": "She spins a lot of plates.",
            "cn": "她确实身兼数职。"
          },
          {
            "en": "Did she give you any advice on that?",
            "cn": "她在这方面有没有给你什么建议？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: I would love to ask her how she does it.",
            "cn": "德utch：我真想问问她是怎么做到的。"
          },
          {
            "en": "One thing I will say at least that I’ve observed from her, similar to what you said, it’s about who you hire.",
            "cn": "至少有一点是我从她身上观察到的，和你说的很像，那就是你雇用什么样的人。"
          },
          {
            "en": "Reese is somebody who I’ve witnessed is so fantastic at hiring the best of the best and letting them do their jobs.",
            "cn": "赖斯是我亲眼见过的，非常善于招聘最优秀的人才，并让他们放手去做自己工作的人。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Yeah.",
            "cn": "POWELL：是啊。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: People are empowered by that.",
            "cn": "德utch：人们因此而获得了更多自主权。"
          },
          {
            "en": "Of course, when you are trusted, and you are able to do your job well, and not micromanaged.",
            "cn": "当然，当你被信任、能够把工作做好，而且不会受到事无巨细的管理时。"
          },
          {
            "en": "She has an extraordinary team around her and I think that there has to be a lot in that.",
            "cn": "她身边有一支非凡的团队，我觉得这背后一定有很多原因。"
          },
          {
            "en": "I need to expand and grow because I want to and I have so many things that I want to do, and I just can’t do it alone.",
            "cn": "我需要拓展和成长，因为我愿意这样做，而且我有很多想做的事情，但我一个人根本做不到。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-zoey-deutch-rom-com-5.jpg",
        "alt": "Zoey Deutch · 图片",
        "cap": "",
        "credit": "Christian Coppola / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790007-1019x1536.jpg"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Definitely not.",
            "cn": "POWELL：绝对不是。"
          },
          {
            "en": "It’s one thing that I’ve seen, like Cruise on Top Gun , if you say a nice thing to Tom, if you do something for him, whatever, you’ll see a thank you note in your trailer the next day.",
            "cn": "我见过一个例子，就像汤姆·克鲁斯在《壮志凌云》里那样：如果你对他说句好话，或者为他做点什么，不管是什么，第二天你就会在自己的化妆车里收到一封感谢信。而他不仅把所有事情都做到了，还主演了整部电影。这就是我想达到的那种体贴程度——让你不会被这些事情压得喘不过气来。你可以让一切看起来轻松自如，同时又不失体贴、保持专注，成为身边每个人的好伙伴。每个人都只是想多占用你一点时间，而你的时间却越来越有限，所以你必须慎重地决定哪些事情要放慢节奏，哪些要暂时搁置，把注意力放在真正重要的事情上。尤其是在最近这种快节奏的生活中，要做到这一点真的很难，因为根本没时间。"
          },
          {
            "en": "And he’s doing all of it and starring in the movie.It’s that level of thoughtfulness that I’m trying to get to, where you don’t feel overwhelmed by any of this stuff.",
            "cn": "而且他不仅把所有事情都做到了，还主演了这部电影。我正努力达到那种细致入微的境界：在面对这一切时，你不会感到不堪重负。你可以让一切看起来轻松自如，同时保持体贴、专注，并成为身边每个人的良伴。每个人都只是希望你能多花一点时间陪伴他们，而你的时间却越来越有限，因此你必须慎重地决定哪些事情要放慢节奏，哪些要暂时搁置，把注意力放在真正重要的事情上。尤其是在最近这种快节奏的生活中，要做到“安静”下来实在很难，因为根本没时间。"
          },
          {
            "en": "You can make it look easy, and you can be thoughtful, and you can be present, you can be a good partner to everyone around you.",
            "cn": "你可以让一切看起来毫不费力，同时保持体贴、专注，成为身边每个人的良伴。"
          },
          {
            "en": "Everybody just wants your time a little bit more, and you just don’t have as much time, and you just have to be deliberate about what you quiet, and what you silence, and what you give your attention to, and what matters.” It’s a hard thing, especially with the pace that you’ve been going recently, to probably quiet anything because there’s just no time.",
            "cn": "“每个人都想多占用你一点时间，而你的可用时间却越来越少，你必须有意识地决定哪些事情要放慢节奏、哪些需要暂时搁置、把注意力放在哪里、什么才是真正重要的。”尤其是在最近这种快节奏的生活中，要做到让一切慢下来真的很难，因为根本没时间。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: I don’t know.",
            "cn": "德utch：我不知道。"
          },
          {
            "en": "Last night I got home from [Jimmy] Kimmel [Live!] and I had a lot to do, but I came home, and I immediately decorated the tree, and then I went to dinner with my partner and our friends, and then I walked my dog.",
            "cn": "“昨晚我从《吉米·坎摩尔直播秀》回来，还有很多事要做，但我一到家就立刻把圣诞树装饰好了，然后和伴侣以及朋友们一起吃了顿晚餐，最后还遛了遛狗。我觉得自己还是能找到不少安静的时间，也许我只是有点懒吧。我也不太确定。嗯，确实很有道理。人越大，周围的声音似乎就越吵闹。”"
          },
          {
            "en": "I feel like there’s a lot of quiet time I find, maybe I’m just lazy.",
            "cn": "我觉得自己能找到不少安静的时间，也许我只是有点懒吧。"
          },
          {
            "en": "I don’t know.",
            "cn": "我不知道。"
          },
          {
            "en": "Yeah, definitely that makes a lot of sense.",
            "cn": "是啊，这确实很有道理。"
          },
          {
            "en": "The bigger you get, the louder things get.",
            "cn": "你越是长大，事情就变得越喧嚣。"
          },
          {
            "en": "It’s interesting you say that because you’ve always been such a thoughtful person.",
            "cn": "你这么说很有意思，因为你一直是个很体贴的人。"
          },
          {
            "en": "You always remember everybody’s name, you always remember their cousins, dogs, even their dog’s favorite toy.",
            "cn": "你总是记得每个人的名字，也总是记得他们的堂兄表妹、狗，甚至他们家狗最喜欢玩的玩具。"
          },
          {
            "en": "You remember details and really care too.",
            "cn": "你还记得很多细节，而且真的很在乎。"
          },
          {
            "en": "It’s not strategic and it’s felt.",
            "cn": "这并不是出于策略，而是发自内心的。"
          },
          {
            "en": "In an industry where there’s a lot of strategy, and there’s a lot of games being played, and a lot of politics, you genuinely care.",
            "cn": "在这个行业里，策略很多，游戏规则层出不穷，政治斗争也十分复杂，而你却真心实意地关心他人。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Wow, this has been a great therapy session, Zoey.",
            "cn": "POWELL：哇，这真是一次很棒的倾诉，Zoey。我真的很需要这样一次交流。好吧，那我们来聊聊你的电影吧，因为我真的超喜欢它。"
          },
          {
            "en": "I really, really needed it.",
            "cn": "我真的、真的太需要了。"
          },
          {
            "en": "All right, well let’s talk about your movie because I fricking loved it.",
            "cn": "好吧，那我们来聊聊你的电影吧，因为我真的超喜欢。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Yeah.",
            "cn": "德utch：是的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Tell me, this is your fourth movie you produced, right?",
            "cn": "POWELL：告诉我，这是你制作的第四部电影，对吧？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Yes, it is.",
            "cn": "德utch：是的，确实如此。"
          },
          {
            "en": "And it started because of us, actually this one.",
            "cn": "而且实际上，这部电影的启动正是因为我们。"
          },
          {
            "en": "About four years ago, when Set It Up came out, I know you remember this, Reese Witherspoon tweeted that she saw our movie, and she loved it, and wondered why aren’t there more great feel good romantic movies?",
            "cn": "大约四年前，《怦然心动》上映时，我记得你还记得吧，瑞茜·威瑟斯彭在推特上说她看了我们的电影，非常喜欢，并且疑惑为什么没有更多这样让人感觉美好的浪漫喜剧？还有，你要记住，这可不是在自吹自擂，《怦然心动》上映时，市场上根本没有一部浪漫喜剧。没人拍浪漫喜剧，也没人愿意拍，那是个不受欢迎的类型。结果，《怦然心动》一上映，居然成了Netflix的一次意外大热。"
          },
          {
            "en": "And again, remember, and this is not to toot our own horn, when Set It Up came out, there was not a single rom-com on the scene.",
            "cn": "还有，大家还记得吧，这可不是在自吹自擂，当《为你打造》上映时，当时市场上根本没有一部浪漫喜剧。没人拍浪漫喜剧，也没人愿意拍，这个类型一度成了“不入流”的代名词。结果，《为你打造》一上映，居然成了Netflix的一次意外大热。"
          },
          {
            "en": "Nobody was making rom-coms, nobody wanted to, it was a dirty word, a dirty genre.",
            "cn": "没有人拍浪漫喜剧，也没有人愿意拍，那是个不光彩的词，一个不光彩的类型。"
          },
          {
            "en": "Set It Up came out, was an accidental huge hit for Netflix.",
            "cn": "《租个男友来搭戏》上映后，意外成为Netflix的一部大热影片。"
          },
          {
            "en": "A couple weeks after, they were like, “Want to go to New York and do press?” We’re on talk shows and there’s billboards in Times Square and we’re like, “This doesn’t feel normal for a movie after it came out to get this huge push.” After that, it spawned this renaissance of the rom-com.",
            "cn": "几周后，他们问：“想去纽约做宣传吗？”我们上了脱口秀节目，时代广场还出现了广告牌，我们心想：“一部电影在上映后还能得到这么大的推广，这感觉不太正常啊。”之后，这股势头催生了浪漫喜剧的复兴。总之，瑞茜发推特说她很喜欢这部电影，这促使她和我以及她的公司Hello Sunshine展开了一次对话：我们怎样才能拍出一部让人感到开心的作品呢？在我看来，《Something From Tiffany’s》与其说是浪漫喜剧，不如说更像一部浪漫的节日片。"
          },
          {
            "en": "And anyway, Reese tweeted she loved it, and that spurred a conversation between her and I, and her company Hello Sunshine, how do we make something that makes people feel good?",
            "cn": "总之，瑞茜在推特上表示她很喜欢这部电影，这促使她和我以及她的公司“阳光灿烂”展开了一次对话：我们该如何打造一部能让人们心情愉悦的作品呢？"
          },
          {
            "en": "Something From Tiffany’s , from my perspective, is less rom-com and more romantic holiday.",
            "cn": "在我看来，《Something From Tiffany’s》与其说是浪漫喜剧，不如说更像一部浪漫的节日电影。它就是那种让人感觉美好、温暖、积极的影片，是每年圣诞节都会去看的那类电影。"
          },
          {
            "en": "It’s just feel-good, and warm, and positive, and the movie that you go to watch year after year during Christmas.",
            "cn": "它只是一部让人感觉良好、温馨、积极的电影，是每年圣诞节都会去看的那部。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-zoey-deutch-rom-com-6.jpg",
        "alt": "Zoey Deutch · 图片",
        "cap": "",
        "credit": "Christian Coppola / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790008-1019x1536.jpg"
      },
      {
        "sentences": [
          {
            "en": "POWELL: That is wild.",
            "cn": "POWELL：这也太离谱了。"
          },
          {
            "en": "I remember meeting Reese at a party, who said she loved Set It Up .",
            "cn": "我记得在一次聚会上遇到瑞茜，她告诉我她很喜欢《怦然心动》。"
          },
          {
            "en": "I was so shocked that Reese Witherspoon was talking to me, that I got unbelievably awkward, and I don’t even remember what I said.",
            "cn": "我当时震惊得不得了，因为瑞茜·威瑟斯彭居然在跟我说话，结果我尴尬得不行，连自己都说了些什么都不记得了。"
          },
          {
            "en": "I just blacked out.",
            "cn": "我刚才完全懵了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Of course.",
            "cn": "德utch：当然。"
          },
          {
            "en": "I still black out.",
            "cn": "我现在还是会突然脑子一片空白。"
          },
          {
            "en": "I have no cool.",
            "cn": "我一点都不酷。"
          },
          {
            "en": "She must think I’m crazy because the way that I text her—I’m casual, and then I see her in person and I’m like looking at my shoes.",
            "cn": "她肯定觉得我疯了，因为我发短信给她的方式——平时很随性，可一见到她本人，我却像在盯着自己的鞋看一样。"
          },
          {
            "en": "You’re so beautiful.",
            "cn": "你真美。"
          },
          {
            "en": "Totally a different vibe when there’s a computer in front of me, versus when there’s the Reese Witherspoon, who is my idol in every way, shape, or form.",
            "cn": "当我面对电脑时，和面对瑞茜·威瑟斯彭时，那种感觉完全不同——她是我在各个方面、各个层面的偶像。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: It looked like a very wonderful experience.",
            "cn": "鲍威尔：那看起来真是段美妙的经历。"
          },
          {
            "en": "There’s a glow to that movie and a glow to everyone in that movie, that seems like there’s genuine warmth in it.",
            "cn": "那部电影散发着光芒，片中每个人都闪耀着光芒，仿佛其中蕴含着真挚的温暖。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: It was so lovely.",
            "cn": "德奇：那场戏真的很美。"
          },
          {
            "en": "Were you okay by the way seeing me kiss another guy?",
            "cn": "话说回来，看到我亲另一个男人，你没问题吧？"
          },
          {
            "en": "Was that hard for you?",
            "cn": "这对你来说很难吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: [Laughs] No, no, no.",
            "cn": "鲍威尔：[笑] 不，不，不。"
          },
          {
            "en": "I wasn’t okay with it.",
            "cn": "我确实无法接受。"
          },
          {
            "en": "The fact that I even had to stomach through this movie, you doing a rom-com with another man was really tough for me.",
            "cn": "我甚至得硬着头皮看这部电影，你和另一个男人拍浪漫喜剧，这对我来说真的很难熬。"
          },
          {
            "en": "But look, again, I root for you.",
            "cn": "不过，我还是要为你加油。"
          },
          {
            "en": "It’s just seeing your ex run off and be happy.",
            "cn": "就是看到你的前任跑开，还过得很快乐。"
          },
          {
            "en": "It always hurts.",
            "cn": "这总是让人难受。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: You’re a great man for being able to handle it.",
            "cn": "德utch：你能处理好这件事，你真是个了不起的人。"
          },
          {
            "en": "I don’t know if I could do it for you.",
            "cn": "我不知道我能不能为你做到这一点。"
          },
          {
            "en": "It might be too hard.",
            "cn": "这可能太难了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: It was me just holding onto the TV and just crying hard tears and then getting on this interview.",
            "cn": "POWELL：我当时就抱着电视，哭得稀里哗啦的，然后又来参加这个采访。[笑] 总之，我真是太为你骄傲了。你的电影太棒了。你今年拍的三部电影都特别出色。我也要振作起来。等你从宣传行程中喘口气后，咱们真得好好聚一聚。"
          },
          {
            "en": "[Laughs] Anyway, I’m so freaking proud of you.",
            "cn": "[笑] 总之，我真为你感到骄傲。"
          },
          {
            "en": "Your movie’s fantastic.",
            "cn": "你的电影太棒了。"
          },
          {
            "en": "All three of your movies this year are fantastic.",
            "cn": "你今年的三部电影都很棒。"
          },
          {
            "en": "I’m coming up from this.",
            "cn": "我正在从这件事中走出来。"
          },
          {
            "en": "After you come up for air from your press tour, let’s actually kick it.",
            "cn": "等你从宣传行程中喘口气后，咱们真得好好聚聚。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: Yes.",
            "cn": "德utch：好的。"
          },
          {
            "en": "Love you.",
            "cn": "爱你。"
          },
          {
            "en": "Thank you for doing this.",
            "cn": "谢谢你做这件事。"
          },
          {
            "en": "I know you have so much going on.",
            "cn": "我知道你最近忙得不可开交。"
          },
          {
            "en": "I’m really proud of you.",
            "cn": "我真的很为你骄傲。"
          },
          {
            "en": "And are you going to something tomorrow?",
            "cn": "那你明天有什么安排吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Got a car pick up at 3:00 A.M. tomorrow.",
            "cn": "POWELL：我明天凌晨3点要去提车。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "DEUTCH: You are a rockstar.",
            "cn": "德utch：你就是个摇滚明星。"
          },
          {
            "en": "Go get them.",
            "cn": "去搞定它们吧。"
          },
          {
            "en": "I love you.",
            "cn": "我爱你。"
          },
          {
            "en": "I’m very proud of you.",
            "cn": "我为你感到非常自豪。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "POWELL: Love you, proud of you.",
            "cn": "POWELL：爱你，为你骄傲。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-zoey-deutch-rom-com-7.jpg",
        "alt": "Zoey Deutch · 图片",
        "cap": "",
        "credit": "Christian Coppola / Interview Magazine",
        "sourceUrl": "https://www.interviewmagazine.com/wp-content/uploads/2022/12/004033790010-1019x1536.jpg"
      },
      {
        "sentences": [
          {
            "en": "Hair: Bridget Brager",
            "cn": "发型：布里吉特·布拉格"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Makeup: Alex Babsky using Dior Beauty",
            "cn": "妆容：亚历克斯·巴布斯基，使用迪奥美妆"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Production: Krista Worby",
            "cn": "制作：克里斯塔·沃比"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Manicure: Emu Kudo",
            "cn": "美甲：Emu Kudo"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Fashion Assistant: Leila Kyriacos",
            "cn": "时尚助理：莱拉·基里亚科斯"
          }
        ],
        "sourceTag": "paragraph"
      }
    ]
  },
  {
    "id": "people-lea-seydoux-bond-girl",
    "cat": "人物",
    "title": "Léa Seydoux on Being a Modern Bond Girl",
    "titleZh": "蕾雅·赛杜谈成为现代邦女郎",
    "url": "https://www.anothermag.com/fashion-beauty/7971/lea-seydoux-on-being-a-modern-bond-girl",
    "source": "AnOther Magazine",
    "date": "2015-10-29",
    "addedAt": "2026-09-18",
    "pin": true,
    "readingMode": "full",
    "contentStatus": "complete",
    "extractorVersion": "people-full-v1",
    "person": "Léa Seydoux",
    "personZh": "蕾雅·赛杜",
    "photoCount": 5,
    "photoCredit": "Collier Schorr / AnOther Magazine",
    "peopleScore": 91,
    "peopleScoreParts": {
      "person": 0.95,
      "photography": 0.625,
      "story": 1,
      "english": 1,
      "interest": 1
    },
    "peopleVersion": "people-v2-full",
    "review": {
      "status": "approved",
      "visualChecked": true,
      "guideChecked": true,
      "articleChecked": true,
      "at": "2026-09-18T07:32:27.278Z",
      "scope": "full-original-text-and-photos",
      "fingerprint": "30c9d5ec4083c7f4d72a461281f5cb33ab0b98de7845ab2fbf4fdff93516a9ae",
      "photoHashes": [
        "567e074986c8a3d95b6bd69e649a009778d073f26f4f4579beb0f208d3252540",
        "cb7ddb5bfec9a93f009bd28a6b647cc22e1c7d6b43ac5bd5a314d38fae0bbc83",
        "1759db025368acae6494dffcc62e9cdd082a0dc8e0a0a50f13b7d9957690b7fa",
        "2eff6df045925b67406f2cc45b5ad4f213ac3476adb0100d69198689640f2393",
        "b81b1a41a1a70c802132cc7116747776433d2ba70a574853c0538c193ea9dbe0"
      ]
    },
    "translation": {
      "status": "machine-checked",
      "issues": [
        "第 49 句数字待核对：100"
      ],
      "sentenceCount": 188,
      "providers": {
        "qwen-mt": 169,
        "deepl": 19
      },
      "cacheNamespace": "people-full-v2"
    },
    "fingerprint": "30c9d5ec4083c7f4d72a461281f5cb33ab0b98de7845ab2fbf4fdff93516a9ae",
    "sourceTextHash": "53a2fcea2a32a52e5e279f60f48b830da4e75e331fa3a5235d0c56fc1587c289",
    "sourceTextWords": 1827,
    "sourceParagraphs": 55,
    "sourceImages": 5,
    "coverImg": "assets/covers/people-lea-seydoux-bond-girl-0.jpg",
    "cover": "linear-gradient(135deg,#eadbcc,#855349)",
    "gradient": "linear-gradient(135deg,#eadbcc,#855349)",
    "photoSources": [
      "https://images-prod.anothermag.com/685/515-89-685-456/azure/another-prod/330/7/337140.jpg",
      "https://images-prod.anothermag.com/800/azure/another-prod/340/8/348857.jpg",
      "https://images-prod.anothermag.com/1200/azure/another-prod/340/8/348858.jpg",
      "https://images-prod.anothermag.com/620/azure/another-prod/340/8/348859.jpg",
      "https://images-prod.anothermag.com/620/azure/another-prod/340/8/348860.jpg"
    ],
    "paras": [
      {
        "img": "assets/covers/people-lea-seydoux-bond-girl-0.jpg",
        "alt": "Léa Seydoux · 图片",
        "cap": "",
        "credit": "Collier Schorr / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/685/515-89-685-456/azure/another-prod/330/7/337140.jpg"
      },
      {
        "sentences": [
          {
            "en": "As the captivating star makes her Bond debut in Spectre, we recall her full interview from AnOther Magazine S/S15",
            "cn": "随着这位迷人女星在《007：幽灵党》中首次亮相邦德女郎，我们重温了她刊登于《AnOther Magazine》2015春夏刊的完整专访。"
          }
        ],
        "sourceTag": "heading"
      },
      {
        "sentences": [
          {
            "en": "Inside London’s Spring Studios a perfect storm of assistants, publicists, make-up artists, animal handlers and world-class imagemakers is swirling.",
            "cn": "在伦敦的Spring Studios内，一场由助理、公关、化妆师、动物驯养员以及世界一流摄影师共同掀起的“完美风暴”正席卷而来。"
          },
          {
            "en": "At its calm centre, cradling a snow white dove, ethereally beautiful in an Alexander McQueen kimono dress so delicate her alabaster skin flickers beneath, is Hollywood’s newest asset: recently unveiled Bond-girl-in-waiting, Léa Seydoux ...",
            "cn": "在那片喧嚣的中心，怀抱一只雪白的鸽子、身着一袭亚历山大·麦昆和服裙的她美得宛如仙子，裙子如此轻盈，以至于她那象牙色的肌肤仿佛在微微闪烁——她正是好莱坞的新宠：刚刚亮相、即将成为邦女郎的蕾雅·赛杜…… 蕾雅在韦斯·安德森、伍迪·艾伦和昆汀·塔伦蒂诺等导演的影片中塑造的那些小巧而精致的片段，以及她为普拉达最新香水“Candy”拍摄的广告大片，使她成为法国最受追捧的明星之一。她在同志爱情片《蓝色是最温暖的颜色》中凭借细腻入微的表演荣获金棕榈奖，但这部电影也因导演阿卜杜拉提夫·凯奇什极为严苛的拍摄手法——包括历时十天拍摄的露骨性爱场景——而备受争议，这也让她赢得了全球范围内的赞誉。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Léa’s small but perfectly formed vignettes in films for directors including Wes Anderson, Woody Allen and Quentin Tarantino, as well as her campaigns for Prada’s latest fragrance Candy, have made her one of France’s most in-demand exports.",
            "cn": "莉亚在韦斯·安德森、伍迪·艾伦和昆汀·塔伦蒂诺等导演的电影中出演了几个虽短小却极为精彩的片段，再加上她为普拉达最新香水“Candy”拍摄的广告大片，使她成为法国最受追捧的明星之一。"
          },
          {
            "en": "Her nuanced Palme d’Or-winning performance in the lesbian love story Blue is the Warmest Colour , which became mired in controversy surrounding director Abdellatif Kechiche’s extremely demanding techniques, including graphic sex scenes shot over 10 days, brought her world-wide acclaim.",
            "cn": "她在同志爱情片《蓝色是最温暖的颜色》中凭借细腻的表演荣获金棕榈奖，但该片因导演阿卜杜拉蒂夫·凯奇什极为严苛的拍摄手法——包括历时10天拍摄的露骨性爱场景——而陷入争议，这也为她赢得了全球范围内的赞誉。"
          },
          {
            "en": "Next year, as well as Spectre , Sam Mendes’s follow-up to Skyfall opposite Daniel Craig, she will appear in cult Greek director Yorgos Lanthimos’s The Lobster , an “unconventional love story” set in a dystopian future where singletons who don’t find a mate within 45 days are transformed into wild beasts.",
            "cn": "明年，除了萨姆·门德斯执导、丹尼尔·克雷格主演的《007：幽灵党》之外，她还将出演希腊导演尤格斯·兰西莫斯的电影《龙虾》，这是一部设定在反乌托邦未来的世界中的“非传统爱情故事”，在其中，如果单身者在45天内找不到伴侣，就会被变成野兽。"
          },
          {
            "en": "Two weeks after the cover shoot, Léa, in an animal-print puffer jacket, jeans and trainers, is tired but elated after her first day of Bond filming at Pinewood Studios.",
            "cn": "封面拍摄两周后，莉娅身穿一件动物纹路的羽绒服、牛仔裤和运动鞋，在松林制片厂度过了她的第一天邦德电影拍摄，虽然疲惫但心情愉悦。"
          },
          {
            "en": "As she defrosts from a particularly cold December evening in a cosy drawing room at London’s Covent Garden Hotel, we speak about Alexander McQueen, love, Nietzsche, children, her modern take on the Bond Girl, and how acting is akin to an “appointment with death”.",
            "cn": "在伦敦考文特花园酒店一间温馨的客厅里，她正从一个格外寒冷的十二月夜晚中缓过神来，我们聊起了亚历山大·麦昆、爱情、尼采、孩子，以及她对邦女郎这一角色的现代诠释，还有表演如何如同一场“与死亡的约会”。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-lea-seydoux-bond-girl-1.jpg",
        "alt": "Léa Seydoux · 图片",
        "cap": "Léa wears floral embroidered organza kimono dress by Alexander McQueen Photography by Collier Schorr, Styling by Katie Shillingford",
        "credit": "Collier Schorr / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/800/azure/another-prod/340/8/348857.jpg"
      },
      {
        "sentences": [
          {
            "en": "Nancy Waters: So you just wrapped the first day of filming on the new Bond film, Spectre , at Pinewood Studios.",
            "cn": "南希·沃特斯：那么，你刚刚在松林制片厂结束了新邦德电影《007：幽灵党》的首日拍摄。成为最新的邦女郎是什么感觉？"
          },
          {
            "en": "What’s it like to be the newest Bond girl?",
            "cn": "作为最新的邦女郎是什么感觉？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Léa Seydoux: I am very lucky.",
            "cn": "莱娅·塞杜：我非常幸运。"
          },
          {
            "en": "I was a fan, like everybody.",
            "cn": "我和大家一样，也是个粉丝。"
          },
          {
            "en": "We all love James Bond, right?",
            "cn": "我们都喜欢詹姆斯·邦德，对吧？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Daniel Craig is a great Bond.",
            "cn": "NW：丹尼尔·克雷格是个很棒的邦德。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Yes…",
            "cn": "是的……"
          },
          {
            "en": "There’s something physical and at the same time something sensitive.",
            "cn": "既有力量感，又很细腻。"
          },
          {
            "en": "That’s the way he is in real life as well.",
            "cn": "他现实生活里也是这样的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: What kind of Bond girl is Léa Seydoux?",
            "cn": "NW：莱娅·塞杜是怎样的邦女郎？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: She will be different...",
            "cn": "LS：她会有所不同……"
          },
          {
            "en": "She’s tougher, and more sensitive as well.",
            "cn": "她既更坚强，也更敏感。"
          },
          {
            "en": "She’s a modern woman in that way.",
            "cn": "从那方面来说，她是个现代女性。"
          },
          {
            "en": "She takes her destiny in her own hands.",
            "cn": "她掌握着自己的命运。"
          },
          {
            "en": "She’s not passive.",
            "cn": "她并不被动。"
          },
          {
            "en": "She’s French, but I don’t think it’s very important that she’s French.",
            "cn": "她是法国人，但我觉得她是不是法国人并不太重要。"
          },
          {
            "en": "I can say she falls in love with Bond…",
            "cn": "我可以说她爱上了邦德……"
          },
          {
            "en": "That’s probably too much!",
            "cn": "那可能有点过头了！"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Do you have an all-time favourite Bond girl?",
            "cn": "NW：你有没有最喜欢的邦女郎？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Eva Green.",
            "cn": "LS：伊娃·格林。"
          },
          {
            "en": "She has this mystery, but also an awkwardness that I like.",
            "cn": "她身上有一种神秘感，同时也有一种让我喜欢的不自在。"
          },
          {
            "en": "She’s not a stereotype.",
            "cn": "她不是刻板印象。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Do you have fight scenes?",
            "cn": "NW：你有打斗场面吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Yes!",
            "cn": "LS：是的！"
          },
          {
            "en": "It is really fun.",
            "cn": "这真的很有趣。"
          },
          {
            "en": "You have to train.",
            "cn": "你必须训练。"
          },
          {
            "en": "But it’s very amusing.",
            "cn": "但它非常有趣。"
          },
          {
            "en": "You feel like a kid.",
            "cn": "你感觉自己像个孩子。"
          },
          {
            "en": "The casting is very exciting.",
            "cn": "选角过程非常令人兴奋。"
          },
          {
            "en": "It’s very chic.",
            "cn": "它非常时尚。"
          },
          {
            "en": "It’s going to be very witty; people are smart, with that English sense of humour that we all like in Bond films.",
            "cn": "它会非常机智幽默；演员们都很聪明，带着我们都喜欢的邦德电影中那种英式幽默感。"
          },
          {
            "en": "It’s a blockbuster, but the writing is very intelligent.",
            "cn": "这是一部大片，但剧本非常聪明。"
          },
          {
            "en": "It’s on the edge.",
            "cn": "它很前卫。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: You’ve just finished filming Lobster , by Dogtooth director Yorgos Lanthimos.",
            "cn": "NW：你刚刚拍完了由《狗牙》导演约格斯·兰西莫斯执导的电影《龙虾》。"
          },
          {
            "en": "Reading the notes, it’s set in a dystopian future where single people are arrested and transferred to a creepy hotel and obliged to find a mate in 45 days.",
            "cn": "根据资料，这部电影设定在一个反乌托邦的未来：单身人士会被逮捕并送往一家阴森的酒店，必须在45天内找到伴侣。如果失败，他们就会被变成动物，放逐到森林里。"
          },
          {
            "en": "If they fail, they are transformed into an animal and released into the woods.",
            "cn": "如果他们失败，就会被变成一种动物，然后放归到树林里。"
          },
          {
            "en": "Sounds like quite a different film to Spectre .",
            "cn": "听起来和《007：幽灵党》很不一样。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Yes!",
            "cn": "LS：是的！"
          },
          {
            "en": "But it’s funny, because Rachel [Weisz, Craig’s wife], is in it, and Ben Whishaw and me, so there is a lot of connection to Bond.",
            "cn": "不过挺有意思的，因为瑞秋·怀兹（克雷格的妻子）也在里面，还有本·威士肖和我，所以跟《007》还是有不少关联的。我当时在片场见到丹尼尔，他来探班看瑞秋。我还以为自己会出演《007》，但当时也没百分百确定。在那种荒郊野外碰到他，还挺有趣的。"
          },
          {
            "en": "I actually met Daniel when he came on the shoot to see Rachel.",
            "cn": "我其实是在丹尼尔来片场看瑞秋的时候见到他的。"
          },
          {
            "en": "I thought I was going to do Bond, but I wasn’t 100 per cent sure then.",
            "cn": "我以为自己会出演邦德电影，但当时我还不太确定。"
          },
          {
            "en": "It was funny to meet him in the middle of nowhere.",
            "cn": "在荒郊野外见到他，真有意思。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-lea-seydoux-bond-girl-2.jpg",
        "alt": "Léa Seydoux · 图片",
        "cap": "Léa wears 3D floral chiffon dress by Alexander McQueen Photography by Collier Schorr, Styling by Katie Shillingford",
        "credit": "Collier Schorr / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1200/azure/another-prod/340/8/348858.jpg"
      },
      {
        "sentences": [
          {
            "en": "NW: Do you prefer working on blockbusters or art-house films?",
            "cn": "NW：您更喜欢拍商业大片还是艺术电影？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I like both, but it’s very thrilling to work on such a big international project with very talented people.",
            "cn": "LS：我都喜欢，但能参与这样一个由众多才华横溢的人共同打造的大型国际项目，真的非常令人兴奋。这里汇聚了最顶尖的人才。身边总是有最优秀的人，这感觉很好。我确信这部电影会非常棒。剧本很棒，服装也很出色……能参与一部你已经知道会成为经典之作的电影，真的很不错。这是一个绝佳的机会。"
          },
          {
            "en": "It’s the crème de la crème.",
            "cn": "这简直是精英中的精英。"
          },
          {
            "en": "It’s always nice to be surrounded by the best.",
            "cn": "能被最优秀的人包围，总是件很棒的事。"
          },
          {
            "en": "I am sure the film is going to be awesome.",
            "cn": "我确信这部电影一定会很棒。"
          },
          {
            "en": "The script is great, the costumes…",
            "cn": "剧本很棒，服装……"
          },
          {
            "en": "It’s nice to work on a film you already know is going to be iconic.",
            "cn": "能参与一部你早就知道会成为经典的电影，感觉真好。"
          },
          {
            "en": "It’s a great chance.",
            "cn": "这是一个绝佳的机会。"
          },
          {
            "en": "But I also like small films.",
            "cn": "不过我也喜欢小成本电影。"
          },
          {
            "en": "I’m not attached to comfort.",
            "cn": "我不追求舒适。"
          },
          {
            "en": "When I act, I don’t need a trailer…",
            "cn": "演戏的时候，我不需要化妆车……"
          },
          {
            "en": "It’s nice to have, but I think you’re always homeless in front of the camera.",
            "cn": "有当然很好，但我觉得在镜头前你总是像个无家可归的人。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Who is working on the Bond costumes?",
            "cn": "NW：邦德的服装是谁设计的？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Her name is Jany Temime.",
            "cn": "LS：她的名字叫贾妮·特梅姆。"
          },
          {
            "en": "She only works for big productions.",
            "cn": "她只给大型制作工作。"
          },
          {
            "en": "It’s nice to have a French partner!",
            "cn": "有个法国合作伙伴真不错！"
          },
          {
            "en": "My character is going to be very chic.",
            "cn": "我的角色会非常时尚。"
          },
          {
            "en": "Not overdressed.",
            "cn": "不过分打扮。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: What is your personal connection with McQueen?",
            "cn": "NW：你与麦昆有什么个人渊源？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I love McQueen.",
            "cn": "LS：我爱麦昆。"
          },
          {
            "en": "He was a real artist.",
            "cn": "他是一位真正的艺术家。"
          },
          {
            "en": "And I love what Sarah is doing with the house now…",
            "cn": "而且我喜欢萨拉现在为这个品牌所做的一切……"
          },
          {
            "en": "I just bought a coat.",
            "cn": "我刚买了一件外套。"
          },
          {
            "en": "Black, in fake fur, very soft.",
            "cn": "黑色的，用人造毛皮做的，非常柔软。"
          },
          {
            "en": "He was political as well.",
            "cn": "他也很有政治意识。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: He was also a storyteller.",
            "cn": "NW：他也是一位讲故事的人。"
          },
          {
            "en": "Is that part of what drew you to acting?",
            "cn": "那是不是吸引你投身表演的原因之一？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I fell in love with an actor, that’s why I wanted to become an actress.",
            "cn": "LS：我爱上了一位演员，这就是我想成为演员的原因。"
          },
          {
            "en": "It was an inspiration.",
            "cn": "那是一种激励。"
          },
          {
            "en": "He was like a role model, but in the sense that I created him in my mind, and he became a reason to act.",
            "cn": "他就像一个榜样，但严格来说，是我自己在脑海中塑造了他，而他成了我投身表演的理由。"
          },
          {
            "en": "I felt he had a message.",
            "cn": "我觉得他传递了一种信息。"
          },
          {
            "en": "I think you feel you are somebody when you are young, then you have to try to make that person exist.",
            "cn": "我觉得年轻的时候，你会觉得自己是个重要的人，然后你就得努力让那个“自己”真正存在。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: So you felt acting was always your destiny?",
            "cn": "NW：所以你觉得演戏一直是你的命运吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: It’s a little mystic, acting.",
            "cn": "LS：表演有点神秘。"
          },
          {
            "en": "It’s not tangible.",
            "cn": "它不是有形的。"
          },
          {
            "en": "It’s about how to explain, or how to catch something.",
            "cn": "这关乎如何表达，或如何捕捉某种东西。"
          },
          {
            "en": "That’s what I love about it.",
            "cn": "这就是我喜欢的地方。"
          },
          {
            "en": "Even big stars are always freaking out when they have to act, because it’s like an appointment with yourself.",
            "cn": "即使是大明星，在需要表演时也总是感到紧张，因为那就像与自己的一次约会。"
          },
          {
            "en": "A stage director once said to me it’s like an appointment with death in a way.",
            "cn": "一位舞台导演曾对我说，这在某种程度上就像与死亡的约会。"
          },
          {
            "en": "You’re confronting nothingness.",
            "cn": "你在直面虚无。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: You never know what’s going to happen.",
            "cn": "NW：你永远不知道会发生什么。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: That’s what I love about it.",
            "cn": "LS：这就是我喜欢它的原因。"
          },
          {
            "en": "You never know if you’re going to make it.",
            "cn": "你永远不知道自己能不能成功。"
          },
          {
            "en": "It’s scary but very exciting.",
            "cn": "这很吓人，但也非常令人兴奋。"
          },
          {
            "en": "When you succeed you feel a great joy.",
            "cn": "当你成功时，你会感到无比的喜悦。"
          },
          {
            "en": "At the end of a scene, for example, especially emotional scenes.",
            "cn": "比如在一场戏的结尾，尤其是那些情感丰富的场景。"
          },
          {
            "en": "When you can express it in your own way, it’s even better.",
            "cn": "当你能以自己的方式表达出来时，就更好了。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Maybe like finding the missing word, or the perfect expression of an idea when you write.",
            "cn": "NW：也许就像在写作时找到那个缺失的词，或者找到表达某个想法的完美方式。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Yes.",
            "cn": "是的。"
          },
          {
            "en": "To touch the truth is very difficult.",
            "cn": "触及真相是非常困难的。"
          },
          {
            "en": "When you have it…",
            "cn": "当你拥有它的时候……"
          },
          {
            "en": "I think sometimes cinema is even more realistic than reality.",
            "cn": "我觉得有时候电影甚至比现实还要真实。"
          },
          {
            "en": "Truly great cinema.",
            "cn": "真正伟大的电影。"
          },
          {
            "en": "I feel I’m more intense in my films than I am in real life.",
            "cn": "我觉得在电影里，我比现实生活中更加投入。"
          },
          {
            "en": "Or maybe I have the possibility in my films to express myself, because in life you feel judged.",
            "cn": "或者，我在电影里有机会表达自己，因为在现实生活中你会感到被评判。"
          },
          {
            "en": "In a film you’re able to express all your fears and your craziness.",
            "cn": "在电影里，你能够表达所有的恐惧与疯狂。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: What draws you to the world of Prada?",
            "cn": "NW：是什么吸引你进入普拉达的世界？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I feel very close in my personality to Prada.",
            "cn": "LS：我觉得我的性格与普拉达非常契合。"
          },
          {
            "en": "It’s a femininity that’s complex; there is contradiction.",
            "cn": "这是一种复杂的女性气质，其中蕴含着矛盾。"
          },
          {
            "en": "It suits modern women today.",
            "cn": "它很适合当今的现代女性。"
          },
          {
            "en": "She really invented something.",
            "cn": "她确实创造了一些东西。"
          },
          {
            "en": "It’s not a stereotyped femininity.",
            "cn": "这不是一种刻板的女性气质。"
          },
          {
            "en": "She’s very secretive, but I like that!",
            "cn": "她很神秘，但我喜欢这样！"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-lea-seydoux-bond-girl-3.jpg",
        "alt": "Léa Seydoux · 图片",
        "cap": "Léa wears oversized patchwork coat by Maison Martin Margiela; Leather socks by Jil Sander Photography by Collier Schorr, Styling by Katie Shillingford",
        "credit": "Collier Schorr / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/620/azure/another-prod/340/8/348859.jpg"
      },
      {
        "sentences": [
          {
            "en": "NW: Do you have any style icons?",
            "cn": "NW：你有喜欢的时尚偶像吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I think I have my own style…",
            "cn": "LS：我觉得我有自己的风格……"
          },
          {
            "en": "I’m not afraid of having my own taste.",
            "cn": "我不害怕拥有自己的品味。"
          },
          {
            "en": "I’m not chic, I have contradiction.",
            "cn": "我不算时尚，我身上有矛盾。"
          },
          {
            "en": "I loved Carolyn Bessette Kennedy, she was so chic.",
            "cn": "我非常喜欢卡罗琳·贝塞特-肯尼迪，她真是太有品位了。"
          },
          {
            "en": "Extremely chic.",
            "cn": "极其时髦。"
          },
          {
            "en": "Audrey Hepburn.",
            "cn": "奥黛丽·赫本。"
          },
          {
            "en": "Marilyn Monroe in her jeans, Grace Kelly…",
            "cn": "穿牛仔裤的玛丽莲·梦露、格蕾丝·凯利……"
          },
          {
            "en": "You couldn’t dress like Grace Kelly now though, you would look like a grandma!",
            "cn": "不过现在你要是像格蕾丝·凯利那样穿，就会像个老奶奶！"
          },
          {
            "en": "But it suited her so well.",
            "cn": "但那身打扮真的很适合她。"
          },
          {
            "en": "Now there’s a new femininity that we have invented.",
            "cn": "现在，我们创造了一种全新的女性气质。"
          },
          {
            "en": "You can’t just be desirable.",
            "cn": "光是让人心动是不够的。"
          },
          {
            "en": "We have a few things to take care of.",
            "cn": "我们还有几件事需要处理。"
          },
          {
            "en": "Jobs, kids, family…",
            "cn": "工作、孩子、家庭……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: You come from a large family, right?",
            "cn": "NW：你来自一个大家庭，对吧？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Yes, seven, but we don’t all have the same mother and father.",
            "cn": "LS：是的，七口人，但我们并非都来自同一对父母。"
          },
          {
            "en": "It’s a big family, we are very close.",
            "cn": "这是一个大家庭，我们关系非常亲密。"
          },
          {
            "en": "But at Christmas there’s two parts, one with mother, one with father.",
            "cn": "不过圣诞节时我们会分两拨过节，一拨和妈妈过，一拨和爸爸过。"
          },
          {
            "en": "I would love to have a few children.",
            "cn": "我很想生几个孩子。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Do you think you will stay in Paris?",
            "cn": "NW：你觉得你会留在巴黎吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Yes.",
            "cn": "是的。"
          },
          {
            "en": "It’s easy in Paris to travel.",
            "cn": "在巴黎出行很方便。"
          },
          {
            "en": "It’s a good centre point.",
            "cn": "它是一个很好的中心点。"
          },
          {
            "en": "And I like to walk around the streets, the shops, the restaurants.",
            "cn": "而且我喜欢在街上、商店和餐馆里逛一逛。"
          },
          {
            "en": "I always go to the same Japanese ones.",
            "cn": "我总是去同几家日本餐馆。"
          },
          {
            "en": "French food is too heavy all the time!",
            "cn": "法国菜总是太油腻了！"
          },
          {
            "en": "Cheese, bread, croissants…",
            "cn": "奶酪、面包、羊角面包……"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: But there is a much healthier relationship with food there.",
            "cn": "NW：不过那里的饮食关系要健康得多。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I think they are not psychotic with food.",
            "cn": "LS：我觉得他们对食物并不那么偏执。"
          },
          {
            "en": "The more you are obsessed with food the more you get fat.",
            "cn": "你越是痴迷于食物，就越容易发胖。"
          },
          {
            "en": "In Paris you just eat when you’re hungry and that’s it.",
            "cn": "在巴黎，你饿了就吃，仅此而已。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-lea-seydoux-bond-girl-4.jpg",
        "alt": "Léa Seydoux · 图片",
        "cap": "Léa wears printed silk and cotton dress by Dior Photography by Collier Schorr, Styling by Katie Shillingford",
        "credit": "Collier Schorr / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/620/azure/another-prod/340/8/348860.jpg"
      },
      {
        "sentences": [
          {
            "en": "NW: Do you live in the past, the present or the future?",
            "cn": "NW：你活在过去、现在还是未来？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I try to be in the present, the past and the future.",
            "cn": "LS：我尽量活在当下、过去和未来。"
          },
          {
            "en": "Otherwise I would feel already dead.",
            "cn": "否则我会觉得自己已经死了。"
          },
          {
            "en": "When you act you really feel in the present.",
            "cn": "当你表演时，你真的会感受到当下。"
          },
          {
            "en": "It saves me, in a way.",
            "cn": "在某种程度上，这救了我。"
          },
          {
            "en": "It’s hard for me to think about the future.",
            "cn": "我很难去想未来。"
          },
          {
            "en": "It creates a lot of anxiety.",
            "cn": "它会带来很多焦虑。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: What’s the best advice you’ve ever been given?",
            "cn": "NW：你得到过的最好建议是什么？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Become who you are.",
            "cn": "LS：成为你自己。"
          },
          {
            "en": "Nietzsche told me that!",
            "cn": "尼采告诉过我！"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Do you have a current obsession?",
            "cn": "NW：你最近有什么迷恋的事情吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I have lots of obsessions…",
            "cn": "LS：我有很多迷恋的东西……"
          },
          {
            "en": "Having a child.",
            "cn": "生孩子。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Is that on the horizon?",
            "cn": "NW：那件事会在不久的将来发生吗？"
          },
          {
            "en": "You’re seeing someone?",
            "cn": "你在和谁约会吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: Yes, but he is younger than me.",
            "cn": "莱娅·塞杜：是的，但他比我年轻。"
          },
          {
            "en": "He said yes.",
            "cn": "他说可以。"
          },
          {
            "en": "But I just have to find the moment.",
            "cn": "但我还得找个合适的时机。"
          },
          {
            "en": "You can’t always think about your career, you have to think about your personal life.",
            "cn": "你不能总是想着事业，也要考虑自己的生活。"
          },
          {
            "en": "I like to see all these actresses with kids, it’s really something that has changed.",
            "cn": "我喜欢看到这些有孩子的女演员，这确实是一种变化。"
          },
          {
            "en": "It’s very much valued to be a mother.",
            "cn": "做母亲是非常受重视的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Are you interested in design?",
            "cn": "NW：你对设计感兴趣吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I’m an aesthete.",
            "cn": "LS：我是个唯美主义者。"
          },
          {
            "en": "I’m extremely sensitive to objects.",
            "cn": "我对物品极其敏感。"
          },
          {
            "en": "This is why I am a materialist.",
            "cn": "这就是为什么我是一个唯物主义者。"
          },
          {
            "en": "It’s something I have inherited from my mother, and my father.",
            "cn": "这是我从母亲和父亲那里继承来的。"
          },
          {
            "en": "My family is very into objects, they have amazing taste.",
            "cn": "我的家人非常喜欢各种物品，他们的品味非常棒。"
          },
          {
            "en": "Very strong taste.",
            "cn": "品味非常强烈。"
          },
          {
            "en": "My home is a mix of African, romantic, vintage.",
            "cn": "我的家是非洲风、浪漫风和复古风的混合。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: And art?",
            "cn": "NW：那艺术呢？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I love painting.",
            "cn": "LS：我爱绘画。"
          },
          {
            "en": "I find it more real than photography.",
            "cn": "我觉得它比摄影更真实。"
          },
          {
            "en": "I love van Gogh.",
            "cn": "我爱梵高。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "NW: Are you a difficult person to have a relationship with?",
            "cn": "NW：你是一个难相处的人吗？"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "LS: I think I am quite easy.",
            "cn": "LS：我觉得我挺容易相处的。"
          },
          {
            "en": "Maybe I am sometimes in my own world.",
            "cn": "也许我有时候会沉浸在自己的世界里。"
          },
          {
            "en": "Some people might not like it.",
            "cn": "有些人可能不喜欢这样。"
          },
          {
            "en": "But it’s part of me.",
            "cn": "但那是我的一部分。"
          },
          {
            "en": "I am caring.",
            "cn": "我很关心他人。"
          },
          {
            "en": "I have defects, but I think people can live with them.",
            "cn": "我有缺点，但我觉得人们可以接受这些缺点。"
          },
          {
            "en": "When I love, I really, truly love.",
            "cn": "当我爱的时候，我是真心实意地爱。"
          },
          {
            "en": "I think that’s the most important thing.",
            "cn": "我认为那是最重要的。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "This story first appeared in the Spring/Summer 2015 edition of AnOther Magazine.",
            "cn": "本故事首次刊登于《AnOther Magazine》2015年春夏刊。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Hair Mark Hampton at Julian Watson Agency for Toni & Guy Hair Meet Wardrobe; Make-up Petros Petrohilos at Streeters using Chanel S 2015 and Chanel Body Excellence; Manicure Sophy Robson at Streeters; Set design Janina Pedan at The Magnet Agency; lighting director Christian Bragg; Photographic assitants Robert Willey, Jori Komulainen; Digital tech Jax Harney; Styling assitants Isabelle Sayer, Kelly-Ann Hughes; Hair assistant Sophie Anderson; Make-up assistant Riona O'Sullivan; Set design assistant Amy Stickland; Production Sylvia Farago Ltd",
            "cn": "发型：马克·汉普顿，由朱利安·沃森经纪公司为Toni & Guy Hair Meet Wardrobe提供；妆容：佩特罗斯·佩特罗希洛斯，由Streeters团队采用香奈儿S 2015系列及香奈儿Body Excellence系列产品打造；美甲：索菲·罗布森，由Streeters团队完成；场景设计：贾妮娜·佩丹，由The Magnet Agency负责；灯光指导：克里斯蒂安·布拉格；摄影助理：罗伯特·威利、约里·科穆莱宁；数字技术：贾克斯·哈尼；造型助理：伊莎贝尔·塞耶、凯莉-安·休斯；发型助理：索菲·安德森；化妆助理：里奥娜·奥沙利文；场景设计助理：艾米·斯蒂克兰德；制作：Sylvia Farago Ltd。"
          }
        ],
        "sourceTag": "paragraph"
      }
    ]
  },
  {
    "id": "people-eva-green-tim-burton",
    "cat": "人物",
    "title": "Tim Burton’s New Muse Eva Green Swoops Into the Spotlight",
    "titleZh": "蒂姆·伯顿的新缪斯：伊娃·格林闪亮登场",
    "url": "https://www.wmagazine.com/story/eva-green-actress-tim-burton-film",
    "source": "W Magazine",
    "date": "2016-06-27",
    "addedAt": "2026-09-18",
    "pin": true,
    "readingMode": "full",
    "contentStatus": "complete",
    "extractorVersion": "people-full-v1",
    "person": "Eva Green",
    "personZh": "伊娃·格林",
    "photoCount": 7,
    "photoCredit": "W Magazine",
    "peopleScore": 91,
    "peopleScoreParts": {
      "person": 0.95,
      "photography": 0.875,
      "story": 0.75,
      "english": 1,
      "interest": 1
    },
    "peopleVersion": "people-v2-full",
    "review": {
      "status": "approved",
      "visualChecked": true,
      "guideChecked": true,
      "articleChecked": true,
      "at": "2026-09-18T07:32:27.278Z",
      "scope": "full-original-text-and-photos",
      "fingerprint": "3e1490ad11ec74b71c698009d4af3d863101f33c8934055d2067e539b7608227",
      "photoHashes": [
        "3e5142d1def259bcd41eb9616288a08f5594c01e950705a7625b0a07c4dc8c0c",
        "780ae0dd62a953db485337702777b278ece588c28db0a5bac00ebf96ba8ff6fe",
        "1d7053f4352c0816240abd15481d97fa80169e283927126574172a14bd882821",
        "d337bc94c71ad301450d2862c630471cdace45e063770c1fbca909aa42916553",
        "a815cf76f16e4579ef0d74f3f92b9da2cc49b8da468567aae83b3781ddce4654",
        "992ad534d1be96d2051f123408dfcb3c3e73275d81872b4246fff4e886e0bc26",
        "bc69140affdd3dce4e6766dc30e1b9a9485239e35cdb8fca4466fe83a8641100"
      ]
    },
    "translation": {
      "status": "machine-checked",
      "issues": [],
      "sentenceCount": 72,
      "providers": {
        "qwen-mt": 71,
        "deepl": 1
      },
      "cacheNamespace": "people-full-v2"
    },
    "fingerprint": "3e1490ad11ec74b71c698009d4af3d863101f33c8934055d2067e539b7608227",
    "sourceTextHash": "f6e6a5fe7efd768be4605c7acf0c3a124ab90d3463851e2443a160cf266bb20c",
    "sourceTextWords": 1123,
    "sourceParagraphs": 10,
    "sourceImages": 7,
    "coverImg": "assets/covers/people-eva-green-tim-burton-0.jpg",
    "cover": "linear-gradient(135deg,#eadbcc,#855349)",
    "gradient": "linear-gradient(135deg,#eadbcc,#855349)",
    "photoSources": [
      "https://imgix.bustle.com/wmag/2016/12/16/58540202c7188f9b26c951c4_0816.w.MM_.eva_.lo30_View5-copy-copy_RGB.jpg",
      "https://imgix.bustle.com/wmag/2016/12/16/585370ebe3d613c03e1eb6b4_0816.cover_.lo_digital.jpg",
      "https://imgix.bustle.com/wmag/2016/12/16/585370ecd3b7a5db18f3afdc_0816.w.MM_.eva_.lo30_View-copyRBG.jpg",
      "https://imgix.bustle.com/wmag/2016/12/16/585370ede3d613c03e1eb6b6_0816.w.MM_.eva_.lo30_View2-copy.jpg",
      "https://imgix.bustle.com/wmag/2016/12/16/585370ee57dfc3b0230f799d_0816.w.MM_.eva_.lo30_View3-copy.jpg",
      "https://imgix.bustle.com/wmag/2016/12/16/585370ef9c190ec57ac08222_0816.w.MM_.eva_.lo30_View4.jpg",
      "https://imgix.bustle.com/wmag/2016/12/16/585370f06666b2eb4762d319_0816.w.MM_.eva_.lo30_View5-copy-copy_RGB.jpg"
    ],
    "paras": [
      {
        "sentences": [
          {
            "en": "W’s August 2016 cover star talks about playing a Bond girl in “Casino Royale,” a medium in “Penny Dreadful,” and the titular character in the upcoming film, “Miss Peregrine’s Home for Peculiar Children.”",
            "cn": "W杂志2016年8月号的封面人物谈到了她在《皇家赌场》中饰演邦女郎、在《地狱之轮》中扮演灵媒，以及在即将上映的电影《怪屋女孩》中饰演女主角的经历。"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "img": "assets/covers/people-eva-green-tim-burton-0.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/58540202c7188f9b26c951c4_0816.w.MM_.eva_.lo30_View5-copy-copy_RGB.jpg"
      },
      {
        "sentences": [
          {
            "en": "Eva Green, who has the pale complexion, black hair, and haunted eyes of a goth princess, would prefer not to be thought of as a supernatural creature with evil powers and the ability to conjure the dead.",
            "cn": "拥有哥特公主般苍白肤色、黑色秀发和幽邃眼神的伊娃·格林，宁愿人们不要把她看作一个拥有邪恶力量、能召唤亡灵的超自然生物。“人们总把我想象成那种来自异世界的人，”这位女演员在春末一个反常的寒冷多风的日子里说道。36岁的格林刚从她出生并长大的巴黎飞抵纽约。尽管她热情开朗，穿着牛仔裤和白色衬衫显得平易近人，但很难不让人联想到她所饰演的那些角色。"
          },
          {
            "en": "“People have this image of me as being otherworldly,” said the actress on an unseasonably cold and stormy day in late spring.",
            "cn": "“人们总把我想象成一个超自然的存在，”这位女演员在春末一个反常的寒冷多风的日子里说道。"
          },
          {
            "en": "Green, 36, had just flown to New York from Paris, where she was born and raised.",
            "cn": "36岁的格林刚从她出生并长大的巴黎飞到纽约。"
          },
          {
            "en": "Although she was warm and forthcoming and appeared down-to-earth in jeans and a white button-down shirt, it was hard not to think of her as the characters she plays.",
            "cn": "尽管她穿着牛仔裤和白色衬衫，显得亲切随和、脚踏实地，但人们还是很难不把她与她所饰演的角色联系起来。"
          },
          {
            "en": "There’s the psychologically scarred Vanessa Ives in the Showtime series Penny Dreadful, who speaks Verbis Diablo and is caught up in a fraught romance with a werewolf in 19th-century London.",
            "cn": "在Showtime剧集《潘妮·德雷德福尔》中，有那位心理受创的凡妮莎·艾夫斯，她会说“恶魔之语”，并在19世纪的伦敦与一只狼人陷入一段充满波折的恋情。"
          },
          {
            "en": "And then there is the title role in Tim Burton’s Miss Peregrine’s Home for Peculiar Children, out in September.",
            "cn": "还有蒂姆·伯顿执导的《怪屋女孩》中的主角，该片将于九月上映。"
          },
          {
            "en": "Green is perfectly cast as the time-traveling, pipe-smoking orphanage director who can transform into a falcon and is the caretaker of boys and girls with extraordinary gifts.",
            "cn": "格林完美地诠释了这位能够变身成猎鹰、善于操控时间，并肩负着照顾拥有非凡天赋的男孩女孩们重任的、抽着烟斗的孤儿院院长。"
          },
          {
            "en": "“Miss Peregrine is like a dark Mary Poppins,” Green said.",
            "cn": "“佩雷格林小姐就像一个黑暗版的玛丽·波平斯，”格林说道。"
          },
          {
            "en": "“She has the ability to manipulate time and uses her powers to protect the children.",
            "cn": "“她拥有操控时间的能力，并利用自己的力量保护那些孩子。”"
          },
          {
            "en": "Miss Peregrine will kill for them.” Green smiled in a slightly wicked, knowing way.",
            "cn": "“佩雷格林小姐会为孩子们不惜一切。”格林露出一丝狡黠而心照不宣的微笑。"
          },
          {
            "en": "“And she does!",
            "cn": "“而且她确实会！这很有趣。”"
          },
          {
            "en": "Which was fun.”",
            "cn": "“这很有趣。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Eva Green, W’s August 2016 Cover Star, Is Not Afraid of the Dark",
            "cn": "Eva Green，W杂志2016年8月封面人物，并不惧怕黑暗"
          }
        ],
        "sourceTag": "heading"
      },
      {
        "img": "assets/covers/people-eva-green-tim-burton-1.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ebe3d613c03e1eb6b4_0816.cover_.lo_digital.jpg"
      },
      {
        "img": "assets/covers/people-eva-green-tim-burton-2.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ecd3b7a5db18f3afdc_0816.w.MM_.eva_.lo30_View-copyRBG.jpg"
      },
      {
        "img": "assets/covers/people-eva-green-tim-burton-3.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ede3d613c03e1eb6b6_0816.w.MM_.eva_.lo30_View2-copy.jpg"
      },
      {
        "img": "assets/covers/people-eva-green-tim-burton-4.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ee57dfc3b0230f799d_0816.w.MM_.eva_.lo30_View3-copy.jpg"
      },
      {
        "img": "assets/covers/people-eva-green-tim-burton-5.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ef9c190ec57ac08222_0816.w.MM_.eva_.lo30_View4.jpg"
      },
      {
        "img": "assets/covers/people-eva-green-tim-burton-6.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370f06666b2eb4762d319_0816.w.MM_.eva_.lo30_View5-copy-copy_RGB.jpg"
      },
      {
        "sentences": [
          {
            "en": "Green’s enthusiasm for the strange, coupled with an odd shyness, intrigued Burton, who met her five years ago, when he cast her in Dark Shadows as Angelique Bouchard, a stunning, seductive witch.",
            "cn": "格林对怪异事物的热情，加上她那股奇特的羞怯，让伯顿颇为 intrigued。五年前，伯顿在《黑暗阴影》中选中她饰演安吉莉克·布沙尔——一位美艳而诱人的女巫。"
          },
          {
            "en": "In one particularly memorable scene, she and Johnny Depp bounce off the walls as they alternate between kissing and trying to murder each other.",
            "cn": "在其中一个尤为令人难忘的场景中，她与约翰尼·德普在房间里来回弹跳，一会儿亲吻，一会儿又试图互相谋杀。"
          },
          {
            "en": "“It was Eva’s idea to wear bright red underwear,” Burton told me, calling from London, where he was finishing editing Miss Peregrine’s Home…",
            "cn": "“穿亮红色内衣是伊娃的主意，”伯顿从伦敦打来电话告诉我，当时他正在那里完成《怪屋女孩》的后期剪辑……"
          },
          {
            "en": "“Eva was not instantly knowable.",
            "cn": "“伊娃并非一眼就能看透的人。"
          },
          {
            "en": "There was something private and mysterious about her, and that’s not common in this day and age.",
            "cn": "“她身上有一种私密而神秘的气质，这在当今社会并不常见。”"
          },
          {
            "en": "People think she’s ‘dark,’ but she’s more interesting than that.",
            "cn": "人们认为她“阴暗”，但她比这更有趣。"
          },
          {
            "en": "People assume I’m dark too, but I’m really not.",
            "cn": "人们也以为我很“黑暗”，但我其实并不是。"
          },
          {
            "en": "Is it just because I wear dark clothing?",
            "cn": "“难道就因为我穿深色衣服吗？”"
          },
          {
            "en": "Do people want me to be in a white suit, like Mr. Roarke from Fantasy Island ?!",
            "cn": "人们难道希望我穿一身白西装，像《梦幻岛》里的罗克先生那样吗？！"
          },
          {
            "en": "Eva faces the same dilemma.",
            "cn": "伊娃也面临着同样的困境。"
          },
          {
            "en": "We share a complicated way of looking at things.",
            "cn": "我们看待事物的方式很复杂。"
          },
          {
            "en": "We both have an interest in the unusual.”",
            "cn": "“我们俩都对不寻常的事物感兴趣。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "As a child, it was Green’s dream to work with Burton.",
            "cn": "小时候，格林的梦想就是能与伯顿合作。"
          },
          {
            "en": "Despite being introverted, she always wanted to act.",
            "cn": "尽管性格内向，她一直想当演员。"
          },
          {
            "en": "Her father, Walter Green, is a dentist, and her mother, Marlène Jobert, had a very successful acting career—starring in Jean-Luc Godard’s Masculin Féminin as well as other nouvelle vague classics.",
            "cn": "她的父亲沃尔特·格林是一名牙医，她的母亲玛琳·若贝尔则有着非常成功的演艺生涯，曾主演让-吕克·戈达尔的《男性·女性》以及其他新浪潮经典影片。"
          },
          {
            "en": "Jobert stopped working to raise Eva and her fraternal twin sister, Joy.",
            "cn": "乔贝尔特为了抚养伊娃和她的异卵双胞胎妹妹乔伊，停止了工作。"
          },
          {
            "en": "“I was not popular in school,” Green recalled.",
            "cn": "“我在学校并不受欢迎，”格林回忆道。"
          },
          {
            "en": "“I was a real geek, hugging the walls.",
            "cn": "“我是个真正的书呆子，总是贴着墙走。”"
          },
          {
            "en": "I blushed whenever the teacher would ask me a question.",
            "cn": "每当老师问我问题时，我都会脸红。"
          },
          {
            "en": "I was paralyzed.” Among her teenage crushes were Jack Nicholson in The Shining and Marlon Brando in Last Tango in Paris.",
            "cn": "“我整个人都僵住了。”她青少年时期的偶像包括《闪灵》中的杰克·尼科尔森和《巴黎最后的探戈》中的马龙·白兰度。"
          },
          {
            "en": "“I love Nicholson when he goes crazy with the ax!” she said, laughing at the memory.",
            "cn": "“我喜欢尼科尔森在拿着斧头发疯的时候！”她一边回忆一边笑着说。"
          },
          {
            "en": "“And when I was 15, I had an enormous poster of Last Tango in Paris on my wall.",
            "cn": "“在我15岁那年，我房间里墙上贴着一张巨大的《巴黎最后的探戈》海报。”"
          },
          {
            "en": "I was obsessed with the director, Bernardo Bertolucci.”",
            "cn": "“我迷上了导演贝纳尔多·贝托鲁奇。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Green studied drama in high school and in 2003, having performed in several French theater productions and been nominated for a Molière Award, she made her film debut, rather fortuitously, in Bertolucci’s The Dreamers.",
            "cn": "格林在高中时学习戏剧，2003年，她在多部法国话剧中有过演出，并曾获得莫里哀奖提名，随后颇为幸运地在贝托鲁奇的《梦之安魂曲》中完成了她的电影首秀。这部电影以1968年巴黎学生运动为背景，讲述了一对半乱伦的双胞胎兄妹（一男一女）迷恋电影的故事，他们在父母外出期间邀请一位美国男孩到他们宽敞的公寓里同住。影片的大部分时间里，格林都赤裸出镜，这似乎为她的职业生涯开启了一个新的趋势。"
          },
          {
            "en": "Set against a backdrop of the 1968 Paris student riots, the movie follows a pair of semi-incestuous twins (a brother and sister) who are enthralled by movies and invite an American boy to stay with them in their sprawling apartment while their parents are away.",
            "cn": "影片以1968年巴黎学生运动为背景，讲述了一对因电影而着迷的半乱伦兄妹，他们在父母外出期间，邀请一位美国男孩到他们宽敞的公寓里同住。"
          },
          {
            "en": "For much of the film, Green is gloriously naked, which seemed to start a trend in her career.",
            "cn": "在影片的大部分时间里，格林都赤裸出镜，这似乎为她的职业生涯开启了一种趋势。"
          },
          {
            "en": "“It is very paradoxical,” she told me.",
            "cn": "“这非常矛盾，”她对我说。"
          },
          {
            "en": "“I am so shy, and, at the same time, I kind of expose myself literally to thousands of people.",
            "cn": "“我非常害羞，但与此同时，我又在字面上把自己暴露在成千上万的人面前。”"
          },
          {
            "en": "I don’t really understand why I do that.",
            "cn": "我真的不明白自己为什么要做那种事。"
          },
          {
            "en": "I need to go through therapy!”",
            "cn": "“我需要去做心理治疗！”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "After The Dreamers, Green was consistently cast as a tough, smart—sexy—woman of mystery.",
            "cn": "在《梦之安魂曲》之后，格林总是被选饰演那种坚强、聪明——又性感——充满神秘感的女性角色。"
          },
          {
            "en": "Even in Casino Royale (2006), in which she plays the Bond Girl Vesper Lynd, she comes across as secretive and complex.",
            "cn": "即便在《皇家赌场》（2006）中，她饰演的邦德女郎维斯珀·林德，也给人一种神秘而复杂的印象。"
          },
          {
            "en": "“At first, when they approached me, I thought it would be me wearing a bikini and being beautiful, so I said I wouldn’t audition.",
            "cn": "“一开始，他们找上我时，我以为自己会穿着比基尼、美美地出场，所以我表示不会去试镜。后来他们把剧本发给我，我才发现邦德是在爱上我的角色——她既敏感又充满秘密。这一点我能理解。”格林顿了顿，接着说：“而且在《007：大战皇家赌场》里，我得死。我在很多电影里都会死。我也不知道为什么——这算是我职业生涯中比较特别的一点吧。我想，这大概是在为那不可避免的结局做一次大彩排。”"
          },
          {
            "en": "Then they sent me the script, and I saw that Bond was falling in love with my character—that she was sensitive and full of secrets.",
            "cn": "然后他们把剧本发给我，我看到邦德正在爱上我的角色——她既敏感又充满秘密。"
          },
          {
            "en": "I could understand that.” Green paused.",
            "cn": "“我能够理解这一点。”格林停顿了一下。"
          },
          {
            "en": "“And in Casino Royale, I had to die.",
            "cn": "“而在《皇家赌场》中，我不得不死。我在很多电影里都会死。我也不知道为什么——这算是我职业生涯中比较特别的一点。我想，这大概是在为那不可避免的结局做一次大排练吧。”"
          },
          {
            "en": "I die in a lot of movies.",
            "cn": "我在很多电影里都会死。"
          },
          {
            "en": "I don’t know why—it’s one of the unusual things about my career.",
            "cn": "我不知道为什么——这算是我职业生涯中一件不太寻常的事。"
          },
          {
            "en": "I guess it’s a big rehearsal for the inevitable.”",
            "cn": "“我想，这大概是在为不可避免的结局做一次大排练吧。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "For Casino Royale, Green perfected her English, which she speaks with a faint British accent.",
            "cn": "为了《007：大战皇家赌场》，格林把英语练得更加纯熟，她说话时带着一丝淡淡的英式口音。"
          },
          {
            "en": "Soon after, she began getting roles in big Hollywood productions like the sequel to 300 (in which she has another noteworthy sex/fight scene, and appears mostly topless) and Sin City: A Dame to Kill For (in which her nudity is a weapon she uses to seduce and kill).",
            "cn": "不久之后，她开始在一些好莱坞大片中获得角色，比如《300勇士：帝国崛起》（其中她又有一场引人注目的性爱/打斗戏，并且大部分时间都是上身裸露）以及《罪恶之城2》（在该片中，她的裸露成为她用来诱惑并杀人的武器）。"
          },
          {
            "en": "Then there is the nightmare-inducing Penny Dreadful.",
            "cn": "还有那部令人做噩梦的《潘妮·德雷德福》。"
          },
          {
            "en": "Green, who was nominated for a Golden Globe for her work on the series, swears that she is not psychologically burdened by that role.",
            "cn": "因在该剧中表现出色而获得金球奖提名的格林坚称，那个角色并未给她带来心理负担。"
          },
          {
            "en": "“It’s very freeing to be possessed,” she said, sounding cheerful.",
            "cn": "“被附身的感觉非常自由，”她笑着说。"
          },
          {
            "en": "“I find playing Vanessa to be like taking a drug.",
            "cn": "“我觉得扮演凡妮莎就像吸毒一样。"
          },
          {
            "en": "Sometimes exhausting, but also jubilating.”",
            "cn": "“有时很累，但也令人欣喜。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "Becoming a falcon for Burton was also liberating in its own way.",
            "cn": "为伯顿饰演一只猎鹰也以自己的方式让人感到解放。"
          },
          {
            "en": "Miss Peregrine’s Home…",
            "cn": "《佩雷格林小姐的奇异之家》…"
          },
          {
            "en": "is based on the best-selling young adult novel by Ransom Riggs.",
            "cn": "改编自兰索姆·里格斯的畅销青少年小说。"
          },
          {
            "en": "The peculiar children all have special talents—for instance, one can control fire, another has incredible physical strength.",
            "cn": "那些怪孩子们都拥有特殊天赋——例如，有人能操控火焰，另一个人则力大无穷。"
          },
          {
            "en": "“People want the kids to have superpowers, but these are kids who have afflictions,” Burton said.",
            "cn": "“人们希望这些孩子拥有超能力，但其实他们是身患某种‘病症’的孩子，”伯顿说道。"
          },
          {
            "en": "“That’s why I loved the book.",
            "cn": "“这就是我为什么喜欢这本书。”"
          },
          {
            "en": "These kids feel different rather than ‘super,’ and the movie speaks to that difference.”",
            "cn": "“这些孩子与众不同，而不是‘超能力’，电影正是在讲述这种差异。”"
          }
        ],
        "sourceTag": "paragraph"
      },
      {
        "sentences": [
          {
            "en": "While Burton remained largely faithful to the plot, he did not adhere to Riggs’s rather geriatric depiction of Miss Peregrine.",
            "cn": "虽然伯顿在很大程度上忠实于原作情节，但他并未遵循里格斯对佩雷格林小姐那略显老态的刻画。相反，他将她想象成一位奇异的美人——他把她想象成了伊娃。“你知道吗，玛丽·波平斯他妈的就很怪异，”伯顿说，“而佩雷格林小姐则是那个怪异角色中最怪异的版本。在这个角色上，我只想到一个人。”"
          },
          {
            "en": "Instead, he imagined her as a strange beauty—he imagined her as Eva.",
            "cn": "相反，他把她想象成一位奇异的美人——他把她想象成了伊娃。"
          },
          {
            "en": "“You know, Mary Poppins is fucking weird,” Burton said.",
            "cn": "“你知道吗，玛丽·波平斯他妈的很怪异，”伯顿说。"
          },
          {
            "en": "“And Miss Peregrine is the weirdest version of that weird character.",
            "cn": "“而佩雷格林小姐则是那个古怪角色中最古怪的版本。”"
          },
          {
            "en": "There was only one person I could see in that role.”",
            "cn": "“那个角色我只想到一个人。”"
          }
        ],
        "sourceTag": "paragraph"
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
