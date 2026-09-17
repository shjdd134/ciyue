/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 2 篇；RSS 文章保留来源英文，中文为机器翻译学习注释。
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
