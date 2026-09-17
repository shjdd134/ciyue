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
