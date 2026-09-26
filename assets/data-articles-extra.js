/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 15 篇；RSS 文章保留来源英文，中文为机器翻译学习注释。
 * 人物类由 tools/people.mjs 写入公开原刊正文与图片；广告/导航块过滤，来源与署名保留。
 * 每篇保留 url 外链可溯源。来源：Dan Koe / Vogue / The Players' Tribune / Paul Graham / AnOther Magazine / Interview Magazine / W Magazine
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
            "cn": "并不是因为我觉得他们做不到，而是因为有太多时候，同一个人会说：‘真盼着能早点瘦下来，这样就能重新开始享受生活了。’虽然我不想让你失望，但如果你不终身坚持那种让你成功减重的生活方式，",
            "alignedParts": [
              {
                "en": "Not because I don’t think they are capable, but because there are too many times when that same person says “they can’t wait until they’re done losing weight so they can start to enjoy life again.”",
                "cn": "并不是因为我觉得他们做不到，而是因为有太多时候，同一个人会说：‘真盼着能早点瘦下来，这样就能重新开始享受生活了。’"
              },
              {
                "en": "I hate to break it to you, but if you don’t adopt the lifestyle that led to you losing the weight, for life,",
                "cn": "虽然我不想让你失望，但如果你不终身坚持那种让你成功减重的生活方式，"
              }
            ]
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
      }
    ],
    "translationReview": "2026-09-26：局部校正译文串句，并核对显示句对。"
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
            "cn": "‘如果拿到这个角色，我就得把自己变成大卫可以雕琢的素材。’也就是说，她必须成为一位令人信服的全球流行巨星：既能戴着头饰、穿着高跟鞋完成复杂的舞蹈，又能诠释安东诺夫和查莉·XCX为她创作的歌曲。",
            "alignedParts": [
              {
                "en": "“If I got the part, I would have to become material David could craft with.”",
                "cn": "‘如果拿到这个角色，我就得把自己变成大卫可以雕琢的素材。’"
              },
              {
                "en": "In essence, she had to make herself into a credible global pop star, one capable of executing complex choreography in a headdress and high heels and channeling the songs that Antonoff and Charli XCX were writing on her behalf.",
                "cn": "也就是说，她必须成为一位令人信服的全球流行巨星：既能戴着头饰、穿着高跟鞋完成复杂的舞蹈，又能诠释安东诺夫和查莉·XCX为她创作的歌曲。"
              }
            ]
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
            "cn": "你并不‘差’。你只是个初学者。",
            "alignedParts": [
              {
                "en": "You’re not ‘bad.’",
                "cn": "你并不‘差’。"
              },
              {
                "en": "You’re just a beginner.",
                "cn": "你只是个初学者。"
              }
            ]
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
            "cn": "这就是训练的目的，让安妮不再困在自己的思绪里。’也让海瑟薇允许自己变得混乱、粗俗、情绪化，最重要的是——不完美。",
            "alignedParts": [
              {
                "en": "That was the training, getting Annie out of her head.”",
                "cn": "这就是训练的目的，让安妮不再困在自己的思绪里。’"
              },
              {
                "en": "And giving Hathaway permission to be messy, vulgar, temperamental, and—above all—imperfect.",
                "cn": "也让海瑟薇允许自己变得混乱、粗俗、情绪化，最重要的是——不完美。"
              }
            ]
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
            "cn": "我的气息，全都卡住了……’她做了一个喉咙被扼住的手势。",
            "alignedParts": [
              {
                "en": "All my breath, it was stuck….”",
                "cn": "我的气息，全都卡住了……’"
              },
              {
                "en": "She makes a strangling gesture.",
                "cn": "她做了一个喉咙被扼住的手势。"
              }
            ]
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
            "cn": "那些音我能够唱到，但是……’海瑟薇又弹了一次那个低音，让声音持续回响。",
            "alignedParts": [
              {
                "en": "And I can touch those notes, but….”",
                "cn": "那些音我能够唱到，但是……’"
              },
              {
                "en": "Hathaway plays the low note again, letting it sustain.",
                "cn": "海瑟薇又弹了一次那个低音，让声音持续回响。"
              }
            ]
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
            "cn": "她最近才开始关注Criterion Channel，正在加紧补看艺术电影的经典之作。"
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
            "cn": "但早在她与维塔莱站在舞蹈室里、尝试‘打开胸腔’之前，这段旅程就已经开始了。要走到那一步，她必须先愿意找回被自己锁在内心的东西。",
            "alignedParts": [
              {
                "en": "But that journey began well before she found herself in a dance studio with Vitale, trying to “crack open her thoracic.”",
                "cn": "但早在她与维塔莱站在舞蹈室里、尝试‘打开胸腔’之前，这段旅程就已经开始了。"
              },
              {
                "en": "To arrive there, she had to want to find what she had locked away inside.",
                "cn": "要走到那一步，她必须先愿意找回被自己锁在内心的东西。"
              }
            ]
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
            "cn": "该片由A24出品，歌曲由杰克·安东诺夫和查莉·XCX操刀，配角阵容包括FKA twigs、 亨特·谢弗和凯亚·格伯，因此也是一部非常酷的电影，但请注意：如果你期待的是《美国甜心小姐》的虚构版，或者类似的作品，那就别指望了。"
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
            "cn": "‘有一次，安妮崩溃了，说：我必须道歉，因为我觉得接下来从我身上释放出来的东西会伤害你。’‘米凯拉握着她的手说：我爱你，我相信你。’洛维回忆道。",
            "alignedParts": [
              {
                "en": "“At one point Annie broke down and said, ‘I have to apologize, because I think what’s going to come out of me will hurt you.’",
                "cn": "‘有一次，安妮崩溃了，说：我必须道歉，因为我觉得接下来从我身上释放出来的东西会伤害你。’"
              },
              {
                "en": "And Michaela took her hands and said, ‘I love you, I trust you,’ ” Lowery recalls.",
                "cn": "‘米凯拉握着她的手说：我爱你，我相信你。’洛维回忆道。"
              }
            ]
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
            "cn": "关于《圣母玛利亚》的制作，我确实了解到最离奇的一点是：开拍时连一首歌曲都没准备好。"
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
            "cn": "有了洛维和戴格勒的构想，再加上她自己提出的‘发根受损的金发’造型，她知道这个角色该是什么样子。她也理解《圣母玛利亚》如何契合时代精神、模糊流行偶像与神祇的界限；她能想象角色内心的冲突，因为那与她自己在公众注视下成长时经历的冲突相近。",
            "alignedParts": [
              {
                "en": "She knew what she looked like, thanks to Lowery and Daigeler’s vision and her own contribution of “blond with fried roots.”",
                "cn": "有了洛维和戴格勒的构想，再加上她自己提出的‘发根受损的金发’造型，她知道这个角色该是什么样子。"
              },
              {
                "en": "And she grasped how Mother Mary fit into the zeitgeist, blurring the line between pop idol and actual deity, and she could imagine the character’s internal conflicts, as they were adjacent to ones she herself had navigated, coming of age in the public eye.",
                "cn": "她也理解《圣母玛利亚》如何契合时代精神、模糊流行偶像与神祇的界限；她能想象角色内心的冲突，因为那与她自己在公众注视下成长时经历的冲突相近。"
              }
            ]
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
            "cn": "似乎正是谷仓里的那段舞蹈，让《圣母玛利亚》的音乐风格最终定型。"
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
            "cn": "她非常迷人。’不过肖沃尔特接着解释，一旦越过她的精致、从容和活力，‘她还有一个大多数人看不到的侧面。",
            "alignedParts": [
              {
                "en": "She’s very glamorous.”",
                "cn": "她非常迷人。’"
              },
              {
                "en": "Once you get past the polish and the poise and the buoyancy, however, Showalter goes on to explain, “there’s a whole other side to her most people don’t get to see.",
                "cn": "不过肖沃尔特接着解释，一旦越过她的精致、从容和活力，‘她还有一个大多数人看不到的侧面。"
              }
            ]
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
            "cn": "‘玩UNO、有空就烘焙、教孩子在公寓里运篮球而不打扰邻居……’这些信息通过另一项似乎也是她的主要休闲活动的方式传给了我：发短信。",
            "alignedParts": [
              {
                "en": "“Uno games, baking when there’s time, teaching the kids to dribble a basketball in the apartment without upsetting the neighbors….”",
                "cn": "‘玩UNO、有空就烘焙、教孩子在公寓里运篮球而不打扰邻居……’"
              },
              {
                "en": "This information came to me in the form of what seems to be another of her great leisure pursuits: text messaging.",
                "cn": "这些信息通过另一项似乎也是她的主要休闲活动的方式传给了我：发短信。"
              }
            ]
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
            "cn": "但海瑟薇在家时，她‘非常、非常感激丈夫是个好厨师，而且习惯早起。’（她特意强调，这只是他众多优点中的两项。）这些并不是什么惊人新闻。",
            "alignedParts": [
              {
                "en": "But when Hathaway is home, she’s “so, so grateful [her] husband is a great cook and an early riser.”",
                "cn": "但海瑟薇在家时，她‘非常、非常感激丈夫是个好厨师，而且习惯早起。’"
              },
              {
                "en": "(Among his many other wonderful qualities, she takes pains to note.) There’s no breaking news here.",
                "cn": "（她特意强调，这只是他众多优点中的两项。）这些并不是什么惊人新闻。"
              }
            ]
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
            "cn": "在新泽西长大的她，一直因为自己无法发出那种‘轻松而有力的声音’而感到沮丧。后来，收拾东西准备一起去相机店时，她向我讲起童年尝试管弦乐的经历；她曾认真投入，‘直到表演吞噬了一切。’从一开始，她就想吹小号。",
            "alignedParts": [
              {
                "en": "And growing up in New Jersey, she’d always been frustrated that she couldn’t produce the same “effortless, powerful sound.”",
                "cn": "在新泽西长大的她，一直因为自己无法发出那种‘轻松而有力的声音’而感到沮丧。"
              },
              {
                "en": "Later, packing up for our field trip to the camera store, she told me about her childhood forays into the world of orchestral music, a serious pursuit “until acting swallowed everything.”",
                "cn": "后来，收拾东西准备一起去相机店时，她向我讲起童年尝试管弦乐的经历；她曾认真投入，‘直到表演吞噬了一切。’"
              },
              {
                "en": "Right from the start, she wanted to play the trumpet.",
                "cn": "从一开始，她就想吹小号。"
              }
            ]
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
            "cn": "学年结束时，我去找老师，解释了自己的处境，并问：如果我能说服妈妈，现在换乐器还来得及吗？’她继续说着，同时戴上墨镜和帽子，进入不易被认出的状态。",
            "alignedParts": [
              {
                "en": "And at the end of the year I went to my teacher and explained my predicament and asked, Is it too late to switch if I can convince my mom?”",
                "cn": "学年结束时，我去找老师，解释了自己的处境，并问：如果我能说服妈妈，现在换乐器还来得及吗？’"
              },
              {
                "en": "She continues talking as she slips into incognito mode—sunglasses, cap.",
                "cn": "她继续说着，同时戴上墨镜和帽子，进入不易被认出的状态。"
              }
            ]
          },
          {
            "en": "“And he said, Well, there’s summer school.",
            "cn": "“他说：‘好吧，还有暑期班呢。’"
          },
          {
            "en": "And so I go home and I lay out this whole plan to my mom, and finally she realized, I really did mean it, I just wanted to play trumpet—am I shouting?” She’s not, but she apologizes anyway.",
            "cn": "于是我回家，把整个计划讲给妈妈听，她终于明白我是认真的，我就是想吹小号——我是不是喊得太响了？’她并没有喊，但还是道了歉。",
            "alignedParts": [
              {
                "en": "And so I go home and I lay out this whole plan to my mom, and finally she realized, I really did mean it, I just wanted to play trumpet—am I shouting?”",
                "cn": "于是我回家，把整个计划讲给妈妈听，她终于明白我是认真的，我就是想吹小号——我是不是喊得太响了？’"
              },
              {
                "en": "She’s not, but she apologizes anyway.",
                "cn": "她并没有喊，但还是道了歉。"
              }
            ]
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
            "en": "Produced by AL Studio.",
            "cn": "由AL Studio制作。"
          },
          {
            "en": "Special thanks to Central Park Conservancy, to 610 Loft & Garden at Rockefeller Center, and The Bouwerie.",
            "cn": "特别鸣谢中央公园保护协会、洛克菲勒中心610 Loft & Garden以及The Bouwerie。"
          }
        ]
      }
    ],
    "translationReview": "2026-09-26：局部校正译文串句，并核对显示句对。"
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
            "cn": "我是个非常耿直的人。"
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
            "cn": "说真的，我倒没觉得他会是个坏人。"
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
            "cn": "拉希姆和我很有默契，因为我们差不多同时来到曼城，而且当时媒体上关于我们的负面报道很多。"
          },
          {
            "en": "They said I was “the Chelsea reject.” They said Raheem was this flashy guy who left Liverpool for money.",
            "cn": "他们说我是‘切尔西弃将’。他们说拉希姆是个爱炫耀、为了钱离开利物浦的家伙。",
            "alignedParts": [
              {
                "en": "They said I was “the Chelsea reject.”",
                "cn": "他们说我是‘切尔西弃将’。"
              },
              {
                "en": "They said Raheem was this flashy guy who left Liverpool for money.",
                "cn": "他们说拉希姆是个爱炫耀、为了钱离开利物浦的家伙。"
              }
            ]
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
            "cn": "我不难搞啊。"
          },
          {
            "en": "This is ridiculous.",
            "cn": "太可笑了吧。"
          },
          {
            "en": "These people don’t even know me!",
            "cn": "这些人根本就不认识我！"
          },
          {
            "en": "But honestly, when you read about other players, it influences the way you think.",
            "cn": "但是说实话，当你读到关于其他人的东西的时候，这些东西会对你的看法多少有些影响。"
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
            "cn": "所以当我认识Raheem之后，我们在训练之后会聊聊天之类的，然后我想：“等等，这家伙挺酷的啊？"
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
            "cn": "慢慢地，我和Raheem变得更加要好，因为我们各自的儿子差不多同时出生，他们会经常一起玩耍。"
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
            "cn": "有一天，我们俩在聊天，然后Raheem说：“伙计，在遇见你之前，我以为你是个非常不同的一个人。"
          },
          {
            "en": "I thought you were going to be really distant and shy.",
            "cn": "我以为你会很疏远、很害羞。"
          },
          {
            "en": "But you’re actually quite funny.”",
            "cn": "但其实你挺幽默的。”"
          },
          {
            "en": "I said, “I have a dry humor.”",
            "cn": "我说：“我擅长冷幽默。”"
          },
          {
            "en": "He said, “ Well dry.”",
            "cn": "他说：“确实，非常冷。”"
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
            "cn": "我说：“说实话？"
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
            "cn": "我也看着他说：“怎么了？"
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
            "cn": "如果是聊足球？"
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
            "cn": "这就是我的性格。"
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
            "cn": "我没有过PlayStation游戏机。"
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
            "cn": "足球场下，我是个很内向的人。"
          },
          {
            "en": "I wouldn’t say one word to you.",
            "cn": "我一句话都不会跟你说。"
          },
          {
            "en": "But on the pitch, I was so flammable.",
            "cn": "但到了球场上，我却一点就着。"
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
            "cn": "年轻的时候……"
          },
          {
            "en": "well, you don’t understand that people can take it the wrong way.",
            "cn": "嗯，你不明白别人可能会误解你。"
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
            "cn": "问题是，即使在家乡，我也已经很害羞了。"
          },
          {
            "en": "At Genk, I was the new kid from the other side of the country who spoke in a funny dialect.",
            "cn": "到了亨克，我更是一个从国家另一头来的新孩子，还说着奇怪的方言。"
          },
          {
            "en": "It was lonely, for sure.",
            "cn": "当时确实很孤独。"
          },
          {
            "en": "I didn’t really learn to have a social life, because the only day we had off was Sunday, and that was my opportunity to travel home to see my family.",
            "cn": "我没怎么学会与人交往，因为我们只有周日休息，而那是我回家探望家人的机会。"
          },
          {
            "en": "So my first two years at the academy were probably the loneliest years I’ll ever live.",
            "cn": "所以，在青训营的头两年，可能是我一生中最孤独的两年。"
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
            "cn": "所有烦恼、所有情绪，都会消失。"
          },
          {
            "en": "When I’m playing football, everything is good.",
            "cn": "只要在踢球，一切就都很好。"
          },
          {
            "en": "If you want to call it an obsession, then maybe it is my obsession.",
            "cn": "如果你想把这称作痴迷，那也许它就是我的痴迷。"
          },
          {
            "en": "Quite simply, it is my life.",
            "cn": "简单地说，足球就是我的生命。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The first year, I lived in a boarding house, where I had this tiny room with a bed and a desk and a sink.",
            "cn": "第一年，我住在宿舍里，房间很小，里面只有一张床、一张桌子和一个洗手池。"
          },
          {
            "en": "The next year, I was able to live with a foster family that the club paid to take in young players.",
            "cn": "第二年，我得以住进一个寄宿家庭，俱乐部付钱请他们照顾年轻球员。"
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
            "cn": "一年过去了，我在学校表现不错，球也踢得很好。"
          },
          {
            "en": "No fights.",
            "cn": "没有打架。"
          },
          {
            "en": "No problems.",
            "cn": "没有惹麻烦。"
          },
          {
            "en": "At the end of the year, I packed my bags and said goodbye to my foster family.",
            "cn": "学年结束时，我收拾好行李，向寄宿家庭道别。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They said, “We’ll see you after the break.",
            "cn": "他们说：“假期结束后再见。"
          },
          {
            "en": "Have a good summer.”",
            "cn": "祝你暑假愉快。”"
          },
          {
            "en": "But then as soon as I got back to my parents’ house, I walked in the door and could see that my mother was crying.",
            "cn": "但回到父母家时，我刚进门，就看见母亲在哭。"
          },
          {
            "en": "I thought maybe somebody had died or something.",
            "cn": "我还以为有人去世了，或者出了类似的事。"
          },
          {
            "en": "I said, “What’s the problem?”",
            "cn": "我问：“怎么了？”"
          },
          {
            "en": "And my mother said the words that probably shaped my whole life.",
            "cn": "然后，母亲说出了那句可能塑造了我整个人生的话。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She said, “They don’t want you to come back.”",
            "cn": "她说：“他们不想让你回去了。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I said, “What are you talking about?”",
            "cn": "我说：“你在说什么？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She said, “The foster family don’t want you there anymore.”",
            "cn": "她说：“那个寄宿家庭不想再让你住在那里了。”"
          },
          {
            "en": "I said, “What?",
            "cn": "我说：“什么？"
          },
          {
            "en": "Why?”",
            "cn": "为什么？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She said, “Because of who you are.",
            "cn": "她说：“因为你的性格。"
          },
          {
            "en": "They said you’re too quiet.",
            "cn": "他们说你太安静了。"
          },
          {
            "en": "They can’t interact with you.",
            "cn": "没办法和你互动。"
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
            "cn": "我只是呆在自己的房间里面。"
          },
          {
            "en": "I never bothered anyone.",
            "cn": "不招惹任何人。"
          },
          {
            "en": "They waved goodbye to me like everything was fine.",
            "cn": "他们刚刚还和没事人一样和我道别。"
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
            "cn": "我必须要去住另外一个宿舍，而且还不是一个很好的一个宿舍。"
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
            "cn": "我记得自己看着母亲哭，然后抓起了足球。"
          },
          {
            "en": "I went outside to this fence where I’d always played by myself as a kid.",
            "cn": "我走到屋外，来到那道栅栏旁，小时候我总是一个人在那里踢球。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One thing really stuck with me.",
            "cn": "有一句话让我久久无法忘记。"
          },
          {
            "en": "“Because of who you are.”",
            "cn": "“因为你这个人。”"
          },
          {
            "en": "The words kept repeating in my head.",
            "cn": "那些话一直在我脑海里反复回响。"
          },
          {
            "en": "I kicked the ball against the fence for hours, and I remember at some point I actually said out loud, “Everything is going to be O.K.",
            "cn": "我冲着栅栏踢了很久的球，我记得自己还对自己说：“没事的。"
          },
          {
            "en": "In two months, I’m going to be in the first team.",
            "cn": "两个月后，我就能到一队。"
          },
          {
            "en": "No matter what, I am not coming back home a failure.",
            "cn": "无论如何，我都不会以一个失败者的身份回到家。"
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
            "cn": "呼——。"
          },
          {
            "en": "I had so much fire inside me.",
            "cn": "我心里面充满了斗志。"
          },
          {
            "en": "It was mad.",
            "cn": "简直像疯了一样。"
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
            "cn": "我们周五晚上有场比赛。"
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
            "cn": "两个月之内，我进了一队。"
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
            "cn": "我们当时只是想让你周一到周五去宿舍！"
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
            "cn": "也许我本该觉得好笑，但当时我一点也笑不出来。"
          },
          {
            "en": "They had really hurt me.",
            "cn": "他们确实深深伤害了我。"
          },
          {
            "en": "So I said, “No.",
            "cn": "所以我说：“不。"
          },
          {
            "en": "You threw me in the garbage.",
            "cn": "你们曾把我像垃圾一样扔掉。"
          },
          {
            "en": "Now I’m doing well and you want me back?”",
            "cn": "现在我表现好了，你们又想让我回去？”"
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
            "cn": "但随后穆里尼奥给我发短信：“你要留下来。"
          },
          {
            "en": "I want you to be part of this team.”",
            "cn": "我希望你成为这支球队的一员。”"
          },
          {
            "en": "So I thought, O.K., great.",
            "cn": "于是我想：“这很好。"
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
            "cn": "赛季前四场比赛，我有两场首发，我觉得自己踢得还可以。"
          },
          {
            "en": "Not brilliant, but pretty good.",
            "cn": "算不上出色，但也挺不错。"
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
            "cn": "我也没有得到任何的解释。"
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
            "cn": "我想，大多数球迷不知道的是：当你在俱乐部失宠时，训练中得到的关注也会大大减少。"
          },
          {
            "en": "At some clubs, it’s like you don’t exist anymore.",
            "cn": "在有些俱乐部，你简直像是不存在了。"
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
            "cn": "他面前放了一些纸，念道：“1次助攻。"
          },
          {
            "en": "Zero goals.",
            "cn": "0进球。"
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
            "cn": "然后，他开始念其他进攻球员的数据——威廉、奥斯卡、马塔、许尔勒。"
          },
          {
            "en": "And it’s like — five goals, 10 assists, whatever.",
            "cn": "大概是五个进球、十次助攻之类的。"
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
            "cn": "那真是个奇怪的时刻。"
          },
          {
            "en": "We had a bit of a conversation about me going back out on loan.",
            "cn": "我们讨论了一下我再次被租借出去之类的。"
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
            "cn": "我说得非常坦率。"
          },
          {
            "en": "I said, “I feel like the club doesn’t really want me here.",
            "cn": "我说：“我感觉俱乐部并不是真的想留下我。"
          },
          {
            "en": "I want to play football.",
            "cn": "我想要踢球。"
          },
          {
            "en": "I’d rather you sell me.”",
            "cn": "我宁愿你把我卖掉。”"
          },
          {
            "en": "I think José was a bit disappointed, but to be fair to him, I think he also understood that I absolutely needed to play.",
            "cn": "我想当时穆里尼奥可能有些失望，但是公平地讲，他可能也明白我必须要得到上场踢球的机会。"
          },
          {
            "en": "So the club ended up selling me, and there was no big problem at all.",
            "cn": "球队最后把我交易出去了，这一切并没有什么大问题。"
          },
          {
            "en": "Chelsea got more than double the price they paid for me, and I got into a much better situation at Wolfsburg.",
            "cn": "切尔西得到的转会费，比当初买下我时花的钱的两倍还多；而我在沃尔夫斯堡的处境也好了很多。"
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
            "cn": "但并不仅仅是足球生涯上的改变。"
          },
          {
            "en": "It was also because I had my (future) wife by my side.",
            "cn": "而是那个时候我还得到了（未来的）妻子的陪伴。"
          },
          {
            "en": "She helped me grow in ways that I’ve probably never expressed out loud — even to her.",
            "cn": "她在许多方面帮助我成长，而这些我大概从未说出口——甚至没有亲口对她说过。"
          },
          {
            "en": "This is such an embarrassing story that I hesitate to tell it!",
            "cn": "这个故事实在太让人脸红了，我真的不太想说。"
          },
          {
            "en": "But since I promised you honesty, then I guess I have to.",
            "cn": "不过，既然答应了要坦诚，我想就得讲出来。"
          },
          {
            "en": "And it’s pretty funny, anyway.",
            "cn": "反正这个故事也挺好笑的。"
          },
          {
            "en": "It started with a tweet.",
            "cn": "一切始于一条推文。"
          },
          {
            "en": "I only had a few thousand followers at the time, because I was still on loan at Werder Bremen.",
            "cn": "当时我只有几千个粉丝，因为我还被租借在云达不来梅。"
          },
          {
            "en": "So I tweeted something about a match or whatever, and this pretty girl favorited it.",
            "cn": "我发了一条关于比赛的推特，然后这个漂亮的姑娘点了赞。"
          },
          {
            "en": "I was single at the time, and my friend noticed it.",
            "cn": "我当时正好单身，然后我的朋友看到了。"
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
            "cn": "我当时真的对他说：“不，不，不。"
          },
          {
            "en": "Come on.",
            "cn": "别闹了。"
          },
          {
            "en": "People don’t like me.",
            "cn": "大家都不喜欢我。"
          },
          {
            "en": "They don’t get me.",
            "cn": "他们不理解我。"
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
            "cn": "结果他抓起我的电话，开始编辑一段信息。"
          },
          {
            "en": "He showed me the phone and said, “Come on, can I hit send?”",
            "cn": "他把手机给我看，说：“来吧，我能点发送了吗？”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was probably on the floor, cringing, but for some reason I said, “O.K.",
            "cn": "我大概已经尴尬得倒在地上了，可不知为什么，我还是说：“好吧。"
          },
          {
            "en": "fine, send it.”",
            "cn": "行，发吧。”"
          },
          {
            "en": "Says it all, no?",
            "cn": "这就说明一切了，不是吗？"
          },
          {
            "en": "I’m supposed to be this big footballer, and I didn’t even have the heart to slide into my future wife’s DMs!",
            "cn": "我好歹也算个有名的球员，居然连给未来的妻子发条私信的勇气都没有！"
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
            "cn": "我们在接下来几个月短信交流中了解了彼此。"
          },
          {
            "en": "It’s a lot easier for me once I get to know someone, so after that, I was good.",
            "cn": "对我来说，当我对别人有了一定的了解之后，我会放松很多。"
          },
          {
            "en": "It really was a beautiful thing.",
            "cn": "这是一个美好的故事。"
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
            "cn": "我们一直同舟共济。"
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
            "cn": "这对我来说倒很容易！"
          },
          {
            "en": "Every single day, literally for three weeks, my agent was saying, “It’s on.",
            "cn": "整整三个星期，每一天，我的经纪人都在说：“转会有戏。"
          },
          {
            "en": "Wait, it’s off.",
            "cn": "哦不，好像不行。"
          },
          {
            "en": "It’s on.",
            "cn": "哦，没问题了。"
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
            "cn": "我们不知道该怎么办。"
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
            "cn": "然后她疼痛难耐，开始流血。"
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
            "cn": "前一分钟，你还在担心足球俱乐部转会的事情。"
          },
          {
            "en": "And then, all of a sudden, your world is upside down.",
            "cn": "下一分钟，你的整个世界都要坍塌了。"
          },
          {
            "en": "Thank God, in the end, everything was O.K.",
            "cn": "谢天谢地，最后一切都没事。"
          },
          {
            "en": "with our son.",
            "cn": "我们的儿子平安无事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I don’t know what I would’ve done without him in my life.",
            "cn": "如果生命中没有他，我不知道自己会怎么办。"
          },
          {
            "en": "Everything good that’s ever happened to me in football, it’s nothing compared to my wife and my kids.",
            "cn": "我在足球生涯里遇到过的所有美好事情，都无法与妻子和孩子相比。"
          },
          {
            "en": "That was the third life-changing moment for me, because it made me realize that football is not life or death.",
            "cn": "那是第三个改变我人生的时刻，因为它让我意识到，足球并不是生死攸关的事。"
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
            "cn": "当我们组建家庭、我来到曼城踢球之后，一切都开始腾飞。"
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
            "cn": "因为他不仅仅是想要赢球。"
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
            "cn": "我记得我和Pep的第一次会面，他让我坐下来，说道：Kevin 你听着。"
          },
          {
            "en": "You can be — easily — a top five player in the world.",
            "cn": "你完全可以——轻轻松松地——成为世界前五的球员。"
          },
          {
            "en": "Top five.",
            "cn": "世界前五。"
          },
          {
            "en": "Easily.”",
            "cn": "轻轻松松。”"
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
            "cn": "真的是非常天才的做法。"
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
            "cn": "很多时候，足球充满了负面情绪和恐惧。"
          },
          {
            "en": "But with Pep, it’s about extreme positivity.",
            "cn": "但在佩普这里，一切都极其积极。"
          },
          {
            "en": "He sets goals that are so high that they’re almost impossible to reach.",
            "cn": "他设定的目标高得几乎不可能实现。"
          },
          {
            "en": "He is a tactical master, yes.",
            "cn": "没错，他是战术大师。"
          },
          {
            "en": "There’s no doubt about this.",
            "cn": "这一点毫无疑问。"
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
            "cn": "坐在场下观看比赛对我来说简直比酷刑还难过。"
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
            "cn": "我妻子说我这个人好像有点问题。"
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
            "cn": "但在这个赛季早些时候，我在对富勒姆的比赛中伤了膝盖，韧带也有损伤。"
          },
          {
            "en": "The doctors told me that I was going to have to be in a brace for a bit.",
            "cn": "医生告诉我，得佩戴一段时间的支具。"
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
            "cn": "她说：“一切都好。"
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
            "cn": "然后，真的，我一下子哭了出来。"
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
            "cn": "婚礼、葬礼、孩子出生？"
          },
          {
            "en": "It’s nothing.",
            "cn": "都没什么。"
          },
          {
            "en": "I’m a rock.",
            "cn": "我坚如磐石。"
          },
          {
            "en": "But if you take football away from me?",
            "cn": "但要是你不让我踢球？"
          },
          {
            "en": "Forget it.",
            "cn": "那就别提了。"
          },
          {
            "en": "I can’t cope.",
            "cn": "我受不了。"
          },
          {
            "en": "In the end, this project at City is about more than winning.",
            "cn": "说到底，曼城的这项事业，意义不只是赢球。"
          },
          {
            "en": "It’s about a certain way of playing and an overall philosophy.",
            "cn": "它关乎一种特定的踢球方式，以及一整套足球理念。"
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
            "cn": "能够踢简单无杂物的足球，实际上是这个世界上最难的事情。"
          },
          {
            "en": "But when it’s rolling?",
            "cn": "但是当我们进入这个状态？"
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
            "cn": "当我们在曼城发挥出最佳水平，踢得行云流水时，就像……"
          },
          {
            "en": "what’s the word for it?",
            "cn": "那个词怎么说来着？"
          },
          {
            "en": "You know, when you meditate?",
            "cn": "你知道，就是冥想时的那种感觉？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Nirvana.",
            "cn": "涅槃。"
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
    ],
    "cover": "linear-gradient(135deg,#10B981,#047857)",
    "gradient": "linear-gradient(135deg,#10B981,#047857)",
    "translationReview": "2026-09-26：按英文原句校正中英配对；保留原文与段落位置。",
    "translationCredit": "中文译文：The Players’ Tribune 官方中文译本；词阅已按英文原句校正错位及部分译文（2026-09-26）。"
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
    ],
    "cover": "linear-gradient(135deg,#10B981,#047857)",
    "gradient": "linear-gradient(135deg,#10B981,#047857)"
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
            "cn": "人们问我：‘你见过莱奥在场上做的最不可思议的事是什么？’他们希望我讲他连过三名防守球员的故事。",
            "cnEdited": true,
            "alignedParts": [
              {
                "en": "People ask me, “What’s the most incredible thing I’ve seen Leo do on the pitch?”",
                "cn": "人们问我：‘你见过莱奥在场上做的最不可思议的事是什么？’"
              },
              {
                "en": "And they expect me to tell them about him dribbling three defenders.",
                "cn": "他们希望我讲他连过三名防守球员的故事。"
              }
            ]
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
      }
    ],
    "cover": "linear-gradient(135deg,#10B981,#047857)",
    "gradient": "linear-gradient(135deg,#10B981,#047857)",
    "translationReview": "2026-09-26：局部校正译文串句，并核对显示句对。"
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
    ],
    "cover": "linear-gradient(135deg,#10B981,#047857)",
    "gradient": "linear-gradient(135deg,#10B981,#047857)"
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
    "coverImg": "assets/covers/gr-pg-what-youll-wish-youd-known.jpg",
    "translationCredit": "中文译文：lzwjava / paul-graham-essays-cn（GitHub 社区译本，CC BY-SA 4.0）；词阅已按英文原句校正错位及部分译文（2026-09-26）。",
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
            "cn": "他们想知道你是什么样的人，这个问题只是为了让你开口。"
          },
          {
            "en": "They ask it the way you might poke a hermit crab in a tide pool, to see what it does.",
            "cn": "他们这样问，就像你拨弄潮池里的一只寄居蟹，想看看它会有什么反应。"
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
            "cn": "医生的工作，并不像电视里描绘的那样。"
          },
          {
            "en": "Fortunately you can also watch real doctors, by volunteering in hospitals. [1]",
            "cn": "幸好，你可以去医院做志愿者，观察真正的医生。[1]"
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
            "cn": "然而每年五月，全国各地的演讲者都会开始发表那套标准毕业演说，主题就是：不要放弃梦想。"
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
            "cn": "大多数传记只会加深这种错觉：一方面，传记作者难免陷入崇拜；另一方面，由于已经知道结局，他们会不自觉地简化情节，直到主人公的一生看起来仿佛命中注定，不过是某种与生俱来的天才逐渐展开。"
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
            "cn": "这也是我们喜欢相信天才存在的一个原因。"
          },
          {
            "en": "It gives us an excuse for being lazy.",
            "cn": "它给了我们偷懒的借口。"
          },
          {
            "en": "If these guys were able to do what they did only because of some magic Shakespeareness or Einsteinness, then it's not our fault if we can't do something as good.",
            "cn": "如果这些人能取得成就，只是因为某种神奇的“莎士比亚特质”或“爱因斯坦特质”，那么我们做不到同样好，就不是我们的错。"
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
            "cn": "到这里，我们已把标准毕业演说从‘不要放弃梦想’改成了‘别人能做的，你也能做。’但还需要进一步修正。",
            "alignedParts": [
              {
                "en": "So far we've cut the Standard Graduation Speech down from \"don't give up on your dreams\" to \"what someone else can do, you can do.\"",
                "cn": "到这里，我们已把标准毕业演说从‘不要放弃梦想’改成了‘别人能做的，你也能做。’"
              },
              {
                "en": "But it needs to be cut still further.",
                "cn": "但还需要进一步修正。"
              }
            ]
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
            "cn": "如果一个身高只有四英尺的人，志向是去NBA打球，我再对他说“只要真心努力，你什么都能做到”，就会觉得自己很傻。[2]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We need to cut the Standard Graduation Speech down to, \"what someone else with your abilities can do, you can do; and don't underestimate your abilities.\" But as so often happens, the closer you get to the truth, the messier your sentence gets.",
            "cn": "我们需要把标准毕业演说改成：‘和你能力相当的人能做到的，你也能做到；而且不要低估自己的能力。’但就像常有的情况一样，越接近真相，句子就越不简洁。",
            "alignedParts": [
              {
                "en": "We need to cut the Standard Graduation Speech down to, \"what someone else with your abilities can do, you can do; and don't underestimate your abilities.\"",
                "cn": "我们需要把标准毕业演说改成：‘和你能力相当的人能做到的，你也能做到；而且不要低估自己的能力。’"
              },
              {
                "en": "But as so often happens, the closer you get to the truth, the messier your sentence gets.",
                "cn": "但就像常有的情况一样，越接近真相，句子就越不简洁。"
              }
            ]
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
            "cn": "更糟的是，它仍然没有告诉你该做什么。"
          },
          {
            "en": "Someone with your abilities?",
            "cn": "一个和你能力相当的人？"
          },
          {
            "en": "What are your abilities?",
            "cn": "你的能力究竟是什么？"
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
            "cn": "按照毕业演说的思路，你先决定二十年后要到达哪里，再问：为了到那里，我现在应该做什么？"
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
            "cn": "滑翔机没有发动机，因此逆风飞行时，会损失很多高度。"
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
            "cn": "实际上，‘保持上风’可以归结为‘攻克难题’。你今天就可以开始。",
            "alignedParts": [
              {
                "en": "In practice, \"stay upwind\" reduces to \"work on hard problems.\"",
                "cn": "实际上，‘保持上风’可以归结为‘攻克难题’。"
              },
              {
                "en": "And you can start today.",
                "cn": "你今天就可以开始。"
              }
            ]
          },
          {
            "en": "I wish I'd grasped that in high school.",
            "cn": "我真希望自己高中时就明白这一点。"
          },
          {
            "en": "Most people like to be good at what they do.",
            "cn": "大多数人都希望擅长自己做的事。"
          },
          {
            "en": "In the so-called real world this need is a powerful force.",
            "cn": "在所谓的现实世界里，这种需要是一股强大的动力。"
          },
          {
            "en": "But high school students rarely benefit from it, because they're given a fake thing to do.",
            "cn": "但高中生很少能从中受益，因为安排给他们的并不是真正的事业。"
          },
          {
            "en": "When I was in high school, I let myself believe that my job was to be a high school student.",
            "cn": "高中时，我让自己相信，我的工作就是当一名高中生。"
          },
          {
            "en": "And so I let my need to be good at what I did be satisfied by merely doing well in school.",
            "cn": "因此，只要在学校表现好，我就满足了自己“要把事情做好”的需要。"
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
            "cn": "这类事情很少能直接变成大学申请表上的一项。"
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
            "cn": "在大多数大学，决定是否录取你的不是教授，而是招生人员；后者的才智远不能与教授相比。"
          },
          {
            "en": "They're the NCOs of the intellectual world.",
            "cn": "他们是知识界的士官。"
          },
          {
            "en": "They can't tell how smart you are.",
            "cn": "他们无法判断你到底有多聪明。"
          },
          {
            "en": "The mere existence of prep schools is proof of that.",
            "cn": "大学预备学校的存在本身，就证明了这一点。"
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
            "cn": "你的那种不适，与真人秀制作人或烟草业高管感受到的不适是一样的。"
          },
          {
            "en": "And you don't even get paid a lot.",
            "cn": "而你甚至还拿不到高薪。"
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
            "cn": "所以我干脆放弃了。"
          },
          {
            "en": "Obviously the world sucked, so why bother?",
            "cn": "这个世界显然糟透了，何必费心？"
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
            "cn": "作为一份日常工作，它其实相当不错。"
          },
          {
            "en": "You're done at 3 o'clock, and you can even work on your own stuff while you're there.",
            "cn": "下午三点就结束了，而且在学校时，你甚至也能做自己的事情。"
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
            "cn": "这个观念的一个扭曲版本，以‘激情’之名进入了流行文化。我最近看到一则服务员招聘广告，要求应聘者‘对服务充满激情’。我真正说的那种兴趣，并不是端盘子时能够拥有的。",
            "alignedParts": [
              {
                "en": "A distorted version of this idea has filtered into popular culture under the name \"passion.\"",
                "cn": "这个观念的一个扭曲版本，以‘激情’之名进入了流行文化。"
              },
              {
                "en": "I recently saw an ad for waiters saying they wanted people with a \"passion for service.\"",
                "cn": "我最近看到一则服务员招聘广告，要求应聘者‘对服务充满激情’。"
              },
              {
                "en": "The real thing is not something one could have for waiting on tables.",
                "cn": "我真正说的那种兴趣，并不是端盘子时能够拥有的。"
              }
            ]
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
            "cn": "其中一位，四年前婚礼上分给他负责的那一半感谢信，到现在还没寄出去。"
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
            "cn": "你觉得莎士比亚是在咬紧牙关、勤勤恳恳地努力创作“伟大文学”吗？"
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
            "cn": "对爱因斯坦来说，关键时刻是他看着麦克斯韦方程组，心想：“这里到底是怎么回事？”"
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
            "cn": "为什么后卫就不能也进球呢？"
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
            "cn": "想让一个大想法出现在脑海里，方法不是四处寻找大想法，而是在感兴趣的工作上投入大量时间，同时保持足够开放的头脑，让大想法有机会落脚。"
          },
          {
            "en": "Einstein, Ford, and Beckenbauer all used this recipe.",
            "cn": "爱因斯坦、福特和贝肯鲍尔，用的都是这个办法。"
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
            "cn": "选一个不到一个月就能完成的项目，而且要确保你有条件把它做完。"
          },
          {
            "en": "Do something hard enough to stretch you, but only just, especially at first.",
            "cn": "做一件刚好能让你有所突破的难事，不要难得太过，尤其是刚开始时。"
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
            "cn": "如果“为学校而做”会限制你，或让项目变得像苦差事，那么不把它当作学校项目来做，可能反而更好。"
          },
          {
            "en": "Involve your friends if you want, but not too many, and only if they're not flakes.",
            "cn": "愿意的话，可以邀请朋友加入，但人不要太多，而且只邀请靠谱的人。"
          },
          {
            "en": "Friends offer moral support (few startups are started by one person), but secrecy also has its advantages.",
            "cn": "朋友能提供精神支持，鲜有创业公司完全由一个人创立；不过，保密也有它的好处。"
          },
          {
            "en": "There's something pleasing about a secret project.",
            "cn": "秘密进行一个项目，有一种特别的乐趣。"
          },
          {
            "en": "And you can take more risks, because no one will know if you fail.",
            "cn": "而且，你能承担更多风险，因为就算失败，也不会有人知道。"
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
            "cn": "最重要的是，你要对项目感到兴奋，因为你正是通过做它来学习的。"
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
            "cn": "高中时，我曾模仿读过的著名作家作品，写一些“存在主义”短篇小说。"
          },
          {
            "en": "My stories didn't have a lot of plot, but they were very deep.",
            "cn": "我的文章并没有很多情节，但它们内涵很深。"
          },
          {
            "en": "And they were less work to write than entertaining ones would have been.",
            "cn": "而且，比起写引人入胜的故事，写这些故事更省力。"
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
            "cn": "很多名人都是如此；在短期内，作品质量只是决定名气的一个小因素。"
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
            "cn": "许多项目的一个关键环节，是找到好书；这本身几乎就算一个项目。"
          },
          {
            "en": "Most books are bad.",
            "cn": "大多数书都不好。"
          },
          {
            "en": "Nearly all textbooks are bad.",
            "cn": "几乎所有教科书都不好。"
          },
          {
            "en": "[9] So don't assume a subject is to be learned from whatever book on it happens to be closest.",
            "cn": "[9]所以，不要以为随手最近的那本相关书，就是学习某个学科应该用的书。"
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
            "cn": "你可能会想：我只是个未成年人，没有钱，得住在家里，整天听从大人的安排。"
          },
          {
            "en": "Well, most adults labor under restrictions just as cumbersome, and they manage to get things done.",
            "cn": "可是，大多数成年人也承受着同样繁重的限制，他们仍然设法把事情做成。"
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
            "cn": "[1]一位医生朋友提醒我，即使去医院做志愿者，也可能让你形成不准确的印象。"
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
            "cn": "[2]他最有希望的办法，大概是当上独裁者，再威胁NBA让他上场。"
          },
          {
            "en": "So far the closest anyone has come is Secretary of Labor.",
            "cn": "迄今为止，最接近这种情况的人，做到的是劳工部长。"
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
            "cn": "高中的问题在于，你的同伴是由年龄和地理位置的偶然性决定的，而不是你因为尊重他们的判断力而自己挑选的。"
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
            "cn": "你可以带一本笔记本记录想法，但除此之外什么都不要有：朋友、电视、音乐、电话、即时通讯、邮件、网络、游戏、书籍、报纸或杂志。"
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
            "cn": "[6]我并不是说，大学预备学校的唯一作用就是蒙骗招生人员。"
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
            "cn": "也有人可能会说，大学预备学校的学生学得更多，因此本来就是更好的大学申请者。"
          },
          {
            "en": "But this seems empirically false.",
            "cn": "但这实际上是错的。"
          },
          {
            "en": "What you learn in even the best high school is rounding error compared to what you learn in college.",
            "cn": "与大学里学到的东西相比，即使在最好的高中学到的内容，也不过相当于一点舍入误差。"
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
            "cn": "主要是因为漠不关心。"
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
            "cn": "塞缪尔·约翰逊说：‘除了傻瓜，没有人会不为钱而写作。’（很多人希望他只是在夸张。）",
            "alignedParts": [
              {
                "en": "Samuel Johnson said \"no man but a blockhead ever wrote except for money.\"",
                "cn": "塞缪尔·约翰逊说：‘除了傻瓜，没有人会不为钱而写作。’"
              },
              {
                "en": "(Many hope he was exaggerating.)",
                "cn": "（很多人希望他只是在夸张。）"
              }
            ]
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[9] Even college textbooks are bad.",
            "cn": "[9]就连大学教科书也不好。"
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
            "cn": "如果一群真正的成年人突然发现自己被困在高中里，他们做的第一件事，大概就是成立工会，与校方重新协商所有规则。"
          },
          {
            "en": "Thanks to Ingrid Bassett, Trevor Blackwell, Rich Draves, Dan Giffin, Sarah Harlin, Jessica Livingston, Jackie McDonough, Robert Morris, Mark Nitzberg, Lisa Randall, and Aaron Swartz for reading drafts of this, and to many others for talking to me about high school.",
            "cn": "感谢 Ingrid Bassett、Trevor Blackwell、Rich Draves、Dan Giffin、Sarah Harlin、Jessica Livingston、Jackie McDonough、Robert Morris、Mark Nitzberg、Lisa Randall 和 Aaron Swartz 阅读本文草稿，也感谢许多其他人与我谈论高中生活。"
          }
        ]
      }
    ],
    "translationReview": "2026-09-26：按英文原句校正中英配对；保留原文与段落位置。"
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
    "coverImg": "assets/covers/gr-pg-how-to-do-what-you-love.jpg",
    "translationCredit": "中文学习译文：词阅逐句重译（2026-09-26）；原收录译本署名：王亮（2006）。",
    "paras": [
      {
        "sentences": [
          {
            "en": "To do something well you have to like it.",
            "cn": "要把一件事做好，你必须喜欢它。"
          },
          {
            "en": "That idea is not exactly novel.",
            "cn": "这个想法并不新鲜。"
          },
          {
            "en": "We've got it down to four words: \"Do what you love.\" But it's not enough just to tell people that.",
            "cn": "我们把它概括成四个英文单词：‘Do what you love（做你热爱的事）。’但只是这样告诉人们还不够。",
            "alignedParts": [
              {
                "en": "We've got it down to four words: \"Do what you love.\"",
                "cn": "我们把它概括成四个英文单词：‘Do what you love（做你热爱的事）。’"
              },
              {
                "en": "But it's not enough just to tell people that.",
                "cn": "但只是这样告诉人们还不够。"
              }
            ]
          },
          {
            "en": "Doing what you love is complicated.",
            "cn": "做自己热爱的事并不简单。"
          },
          {
            "en": "The very idea is foreign to what most of us learn as kids.",
            "cn": "这个观念本身，就与我们大多数人从小接受的教育格格不入。"
          },
          {
            "en": "When I was a kid, it seemed as if work and fun were opposites by definition.",
            "cn": "我小时候觉得，工作和乐趣似乎天生就是对立的。"
          },
          {
            "en": "Life had two states: some of the time adults were making you do things, and that was called work; the rest of the time you could do what you wanted, and that was called playing.",
            "cn": "生活分成两种状态：有时大人让你做事，那叫工作；其余时间你可以做自己想做的事，那叫玩耍。"
          },
          {
            "en": "Occasionally the things adults made you do were fun, just as, occasionally, playing wasn't — for example, if you fell and hurt yourself.",
            "cn": "偶尔，大人让你做的事也很有趣；同样，玩耍偶尔也会不开心，比如摔倒受伤的时候。"
          },
          {
            "en": "But except for these few anomalous cases, work was pretty much defined as not-fun.",
            "cn": "但除了这些少见的例外，工作基本上就等于不好玩。"
          },
          {
            "en": "And it did not seem to be an accident.",
            "cn": "而且，这似乎不是偶然。"
          },
          {
            "en": "School, it was implied, was tedious because it was preparation for grownup work.",
            "cn": "大人隐含的意思是：上学之所以枯燥，是因为它在为成年后的工作做准备。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The world then was divided into two groups, grownups and kids.",
            "cn": "于是，世界被分成两类人：大人和孩子。"
          },
          {
            "en": "Grownups, like some kind of cursed race, had to work.",
            "cn": "大人像某种受了诅咒的族群，必须工作。"
          },
          {
            "en": "Kids didn't, but they did have to go to school, which was a dilute version of work meant to prepare us for the real thing.",
            "cn": "孩子不用工作，但必须上学；上学就是简化版的工作，用来为将来的真正工作做准备。"
          },
          {
            "en": "Much as we disliked school, the grownups all agreed that grownup work was worse, and that we had it easy.",
            "cn": "尽管我们不喜欢上学，大人却一致认为成年人的工作更糟，而我们已经很轻松了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Teachers in particular all seemed to believe implicitly that work was not fun.",
            "cn": "尤其是老师，似乎都默认工作没有乐趣。"
          },
          {
            "en": "Which is not surprising: work wasn't fun for most of them.",
            "cn": "这并不奇怪：对他们中的大多数人来说，工作确实没有乐趣。"
          },
          {
            "en": "Why did we have to memorize state capitals instead of playing dodgeball?",
            "cn": "为什么我们必须背诵各州首府，而不能去玩躲避球？"
          },
          {
            "en": "For the same reason they had to watch over a bunch of kids instead of lying on a beach.",
            "cn": "原因就和他们必须看管一群孩子、而不能躺在海滩上一样。"
          },
          {
            "en": "You couldn't just do what you wanted.",
            "cn": "你不能想做什么就做什么。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I'm not saying we should let little kids do whatever they want.",
            "cn": "我不是说应该让小孩子为所欲为。"
          },
          {
            "en": "They may have to be made to work on certain things.",
            "cn": "有些事情，可能确实需要要求他们去做。"
          },
          {
            "en": "But if we make kids work on dull stuff, it might be wise to tell them that tediousness is not the defining quality of work, and indeed that the reason they have to work on dull stuff now is so they can work on more interesting stuff later. [ 1 ]",
            "cn": "但如果我们让孩子做枯燥的事，最好告诉他们：枯燥并不是工作的本质；事实上，现在做这些枯燥的事，正是为了将来能做更有趣的事。[1]"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Once, when I was about 9 or 10, my father told me I could be whatever I wanted when I grew up, so long as I enjoyed it.",
            "cn": "我大约九岁或十岁时，父亲曾告诉我，只要我喜欢，长大后想做什么都可以。"
          },
          {
            "en": "I remember that precisely because it seemed so anomalous.",
            "cn": "我之所以记得那么清楚，正是因为这句话听起来太反常了。"
          },
          {
            "en": "It was like being told to use dry water.",
            "cn": "那就像有人叫你使用干燥的水一样。"
          },
          {
            "en": "Whatever I thought he meant, I didn't think he meant work could literally be fun — fun like playing.",
            "cn": "无论我当时怎样理解他的话，都没想到他是说工作真的可以有趣——像玩耍一样有趣。"
          },
          {
            "en": "It took me years to grasp that.",
            "cn": "我花了好多年才明白这一点。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "By high school, the prospect of an actual job was on the horizon.",
            "cn": "到了高中，真正参加工作已经是可以预见的事了。"
          },
          {
            "en": "Adults would sometimes come to speak to us about their work, or we would go to see them at work.",
            "cn": "大人有时会来给我们讲他们的工作，或者我们去看他们工作。"
          },
          {
            "en": "It was always understood that they enjoyed what they did.",
            "cn": "大家总是默认，他们喜欢自己做的事。"
          },
          {
            "en": "In retrospect I think one may have: the private jet pilot.",
            "cn": "现在回想起来，我觉得其中一个人可能确实喜欢：那位私人飞机飞行员。"
          },
          {
            "en": "But I don't think the bank manager really did.",
            "cn": "但我不认为那位银行经理真的喜欢自己的工作。"
          },
          {
            "en": "The main reason they all acted as if they enjoyed their work was presumably the upper-middle class convention that you're supposed to.",
            "cn": "他们都表现得喜欢自己的工作，主要原因大概是中上层阶级的惯例：你就应该喜欢它。"
          },
          {
            "en": "It would not merely be bad for your career to say that you despised your job, but a social faux-pas.",
            "cn": "说自己厌恶工作，不仅不利于职业发展，也会被视为社交上的失礼。"
          },
          {
            "en": "Why is it conventional to pretend to like what you do?",
            "cn": "为什么假装喜欢自己的工作会成为一种惯例？"
          },
          {
            "en": "The first sentence of this essay explains that.",
            "cn": "本文的第一句话就解释了这一点。"
          },
          {
            "en": "If you have to like something to do it well, then the most successful people will all like what they do.",
            "cn": "如果必须喜欢一件事才能把它做好，那么最成功的人就都会喜欢自己做的事。"
          },
          {
            "en": "That's where the upper-middle class tradition comes from.",
            "cn": "中上层阶级的这项传统，就是这么来的。"
          },
          {
            "en": "Just as houses all over America are full of chairs that are, without the owners even knowing it, nth-degree imitations of chairs designed 250 years ago for French kings, conventional attitudes about work are, without the owners even knowing it, nth-degree imitations of the attitudes of people who've done great things.",
            "cn": "就像美国各地的家里都有各种椅子，主人却不知道它们是两百五十年前为法国国王设计的椅子的多重仿制品一样，人们对工作的惯常态度，也是在不知不觉中对成就非凡之人的态度做出的多重模仿。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What a recipe for alienation.",
            "cn": "这简直是在制造疏离感。"
          },
          {
            "en": "By the time they reach an age to think about what they'd like to do, most kids have been thoroughly misled about the idea of loving one's work.",
            "cn": "到了开始思考自己想做什么的年纪，大多数孩子对“热爱工作”这个观念已经受到了彻底的误导。"
          },
          {
            "en": "School has trained them to regard work as an unpleasant duty.",
            "cn": "学校训练他们把工作看成一种不愉快的义务。"
          },
          {
            "en": "Having a job is said to be even more onerous than schoolwork.",
            "cn": "据说，上班甚至比做功课还要辛苦。"
          },
          {
            "en": "And yet all the adults claim to like what they do.",
            "cn": "可所有大人又都声称喜欢自己做的事。"
          },
          {
            "en": "You can't blame kids for thinking \"I am not like these people; I am not suited to this world.\"",
            "cn": "你不能怪孩子们会想：“我和这些人不一样；我不适合这个世界。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Actually they've been told three lies: the stuff they've been taught to regard as work in school is not real work; grownup work is not (necessarily) worse than schoolwork; and many of the adults around them are lying when they say they like what they do.",
            "cn": "事实上，他们听到了三个谎言：学校里那些被教作“工作”的事情并不是真正的工作；成年人的工作不一定比功课更糟；身边很多大人说自己喜欢工作，其实是在撒谎。"
          },
          {
            "en": "The most dangerous liars can be the kids' own parents.",
            "cn": "最危险的说谎者，可能正是孩子自己的父母。"
          },
          {
            "en": "If you take a boring job to give your family a high standard of living, as so many people do, you risk infecting your kids with the idea that work is boring.",
            "cn": "如果你像很多人那样，为了让家人过上优裕的生活而选择一份无聊的工作，就可能把“工作很无聊”这个观念传给孩子。"
          },
          {
            "en": "[ 2 ] Maybe it would be better for kids in this one case if parents were not so unselfish.",
            "cn": "[2]也许唯独在这件事上，父母不那么无私，反而对孩子更好。"
          },
          {
            "en": "A parent who set an example of loving their work might help their kids more than an expensive house. [ 3 ]",
            "cn": "父母以身作则地热爱自己的工作，可能比一栋昂贵的房子更能帮助孩子。[3]"
          },
          {
            "en": "It was not till I was in college that the idea of work finally broke free from the idea of making a living.",
            "cn": "直到上大学，我才终于把工作这个概念与谋生这个概念分开。"
          },
          {
            "en": "Then the important question became not how to make money, but what to work on.",
            "cn": "于是，重要的问题不再是怎样赚钱，而是要做什么工作。"
          },
          {
            "en": "Ideally these coincided, but some spectacular boundary cases (like Einstein in the patent office) proved they weren't identical.",
            "cn": "理想情况下，两者是一致的；但一些引人注目的特殊例子，比如在专利局工作的爱因斯坦，证明它们并不是一回事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The definition of work was now to make some original contribution to the world, and in the process not to starve.",
            "cn": "这时，我对工作的定义变成了：为世界做出某种原创的贡献，同时不让自己饿肚子。"
          },
          {
            "en": "But after the habit of so many years my idea of work still included a large component of pain.",
            "cn": "但多年来形成的习惯，让我对工作的理解仍然包含着大量痛苦。"
          },
          {
            "en": "Work still seemed to require discipline, because only hard problems yielded grand results, and hard problems couldn't literally be fun.",
            "cn": "工作似乎仍然需要自律，因为只有难题才能带来重大的成果，而难题不可能真的有趣。"
          },
          {
            "en": "Surely one had to force oneself to work on them.",
            "cn": "人当然得强迫自己去解决它们。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you think something's supposed to hurt, you're less likely to notice if you're doing it wrong.",
            "cn": "如果你觉得一件事理应让人痛苦，那么做错时，你反而不容易察觉。"
          },
          {
            "en": "That about sums up my experience of graduate school.",
            "cn": "这大致概括了我的研究生经历。"
          },
          {
            "en": "How much are you supposed to like what you do?",
            "cn": "你究竟应该有多喜欢自己做的事？"
          },
          {
            "en": "Unless you know that, you don't know when to stop searching.",
            "cn": "如果不知道答案，你就不知道什么时候该停止寻找。"
          },
          {
            "en": "And if, like most people, you underestimate it, you'll tend to stop searching too early.",
            "cn": "而如果你像大多数人一样低估了这种喜欢的程度，就容易过早停止寻找。"
          },
          {
            "en": "You'll end up doing something chosen for you by your parents, or the desire to make money, or prestige — or sheer inertia.",
            "cn": "最后，你做的事可能是父母替你选的，也可能是赚钱的欲望、名望，或纯粹的惯性替你选的。"
          },
          {
            "en": "Here's an upper bound: Do what you love doesn't mean, do what you would like to do most this second .",
            "cn": "先说上限：做自己热爱的事，并不等于做此时此刻最想做的事。"
          },
          {
            "en": "Even Einstein probably had moments when he wanted to have a cup of coffee, but told himself he ought to finish what he was working on first.",
            "cn": "即使爱因斯坦，大概也有想喝杯咖啡，却告诉自己应该先完成手头工作的时刻。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It used to perplex me when I read about people who liked what they did so much that there was nothing they'd rather do.",
            "cn": "过去，读到有人如此喜欢自己的工作，以至于什么别的事都不想做时，我总是很困惑。"
          },
          {
            "en": "There didn't seem to be any sort of work I liked that much.",
            "cn": "似乎没有哪种工作能让我喜欢到那种程度。"
          },
          {
            "en": "If I had a choice of (a) spending the next hour working on something or (b) be teleported to Rome and spend the next hour wandering about, was there any sort of work I'd prefer?",
            "cn": "如果可以选择：（a）接下来一小时做某项工作，或者（b）瞬间来到罗马，花一小时四处闲逛，有哪种工作会让我更愿意选择吗？"
          },
          {
            "en": "Honestly, no.",
            "cn": "老实说，没有。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But the fact is, almost anyone would rather, at any given moment, float about in the Caribbean, or have sex, or eat some delicious food, than work on hard problems.",
            "cn": "但事实上，在任意一个时刻，几乎所有人都宁愿在加勒比海漂游、享受性爱，或品尝美食，而不是解决难题。"
          },
          {
            "en": "The rule about doing what you love assumes a certain length of time.",
            "cn": "“做你热爱的事”这条原则，预设了一个时间跨度。"
          },
          {
            "en": "It doesn't mean, do what will make you happiest this second, but what will make you happiest over some longer period, like a week or a month.",
            "cn": "它并不是让你做此刻最开心的事，而是让你做在一段较长时间内——比如一周或一个月——最让你开心的事。"
          },
          {
            "en": "Unproductive pleasures pall eventually.",
            "cn": "不产生任何成果的享乐，最终都会令人厌倦。"
          },
          {
            "en": "After a while you get tired of lying on the beach.",
            "cn": "躺在海滩上待久了，你也会腻。"
          },
          {
            "en": "If you want to stay happy, you have to do something.",
            "cn": "要想持续快乐，你就得做点事情。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As a lower bound, you have to like your work more than any unproductive pleasure.",
            "cn": "再说下限：你必须喜欢自己的工作，胜过任何不产生实际成果的享乐。"
          },
          {
            "en": "You have to like what you do enough that the concept of \"spare time\" seems mistaken.",
            "cn": "你要喜欢自己做的事，喜欢到觉得“业余时间”这个概念本身都有点不对。"
          },
          {
            "en": "Which is not to say you have to spend all your time working.",
            "cn": "这并不是说，你必须把所有时间都用来工作。"
          },
          {
            "en": "You can only work so much before you get tired and start to screw up.",
            "cn": "工作一段时间后，你总会疲倦，开始出错。"
          },
          {
            "en": "Then you want to do something else — even something mindless.",
            "cn": "这时你会想做些别的事，甚至是不需要动脑子的事。"
          },
          {
            "en": "But you don't regard this time as the prize and the time you spend working as the pain you endure to earn it.",
            "cn": "但你不会把这段时间当成奖赏，也不会把工作时间看成为了换取奖赏而忍受的痛苦。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I put the lower bound there for practical reasons.",
            "cn": "我把下限定在那里，是出于实际考虑。"
          },
          {
            "en": "If your work is not your favorite thing to do, you'll have terrible problems with procrastination.",
            "cn": "如果工作不是你最喜欢做的事，你就会遭遇严重的拖延问题。"
          },
          {
            "en": "You'll have to force yourself to work, and when you resort to that the results are distinctly inferior.",
            "cn": "你将不得不强迫自己工作，而一旦需要这样做，成果就会明显逊色。"
          },
          {
            "en": "To be happy I think you have to be doing something you not only enjoy, but admire.",
            "cn": "我认为，要想快乐，你做的事不仅要让你喜欢，也要让你欣赏。"
          },
          {
            "en": "You have to be able to say, at the end, wow, that's pretty cool.",
            "cn": "做完之后，你得能够说：“哇，这可真酷。”"
          },
          {
            "en": "This doesn't mean you have to make something.",
            "cn": "这并不意味着你一定要制造出什么东西。"
          },
          {
            "en": "If you learn how to hang glide, or to speak a foreign language fluently, that will be enough to make you say, for a while at least, wow, that's pretty cool.",
            "cn": "学会驾驶悬挂式滑翔机，或流利地说一门外语，就足以让你至少在一段时间内感叹：“哇，这可真酷。”"
          },
          {
            "en": "What there has to be is a test.",
            "cn": "必须有某种检验成果的方式。"
          },
          {
            "en": "So one thing that falls just short of the standard, I think, is reading books.",
            "cn": "因此，我认为读书就略微达不到这个标准。"
          },
          {
            "en": "Except for some books in math and the hard sciences, there's no test of how well you've read a book, and that's why merely reading books doesn't quite feel like work.",
            "cn": "除了一些数学和硬科学书籍，很难检验你究竟读得有多好，所以仅仅读书不太像是在工作。"
          },
          {
            "en": "You have to do something with what you've read to feel productive.",
            "cn": "你得用读到的东西做些什么，才会觉得自己有所产出。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I think the best test is one Gino Lee taught me: to try to do things that would make your friends say wow.",
            "cn": "我觉得最好的检验方法，是吉诺·李教给我的：试着做一些能让朋友惊叹“哇”的事。"
          },
          {
            "en": "But it probably wouldn't start to work properly till about age 22, because most people haven't had a big enough sample to pick friends from before then.",
            "cn": "但这大概要到二十二岁左右才真正奏效，因为在此之前，大多数人接触过的人还不够多，选择朋友的范围还不够广。"
          },
          {
            "en": "What you should not do, I think, is worry about the opinion of anyone beyond your friends.",
            "cn": "我认为，你不该在意朋友以外的人怎么看。"
          },
          {
            "en": "You shouldn't worry about prestige.",
            "cn": "你不该在意名望。"
          },
          {
            "en": "Prestige is the opinion of the rest of the world.",
            "cn": "名望就是世上其他人对你的看法。"
          },
          {
            "en": "When you can ask the opinions of people whose judgement you respect, what does it add to consider the opinions of people you don't even know? [ 4 ]",
            "cn": "既然可以征询那些你尊重其判断力的人的意见，考虑素不相识之人的看法又能增加什么价值呢？[4]"
          },
          {
            "en": "This is easy advice to give.",
            "cn": "提出这条建议很容易。"
          },
          {
            "en": "It's hard to follow, especially when you're young.",
            "cn": "照着做却很难，尤其是在你年轻的时候。"
          },
          {
            "en": "[ 5 ] Prestige is like a powerful magnet that warps even your beliefs about what you enjoy.",
            "cn": "[5]名望就像一块强力磁铁，甚至会扭曲你对自己喜欢什么的判断。"
          },
          {
            "en": "It causes you to work not on what you like, but what you'd like to like.",
            "cn": "它会让你去做的，不是你真正喜欢的事，而是你希望自己能喜欢的事。"
          },
          {
            "en": "That's what leads people to try to write novels, for example.",
            "cn": "比如，这就是一些人想要写小说的原因。"
          },
          {
            "en": "They like reading novels.",
            "cn": "他们喜欢读小说。"
          },
          {
            "en": "They notice that people who write them win Nobel prizes.",
            "cn": "他们发现，写小说的人会获得诺贝尔奖。"
          },
          {
            "en": "What could be more wonderful, they think, than to be a novelist?",
            "cn": "于是他们想，还有什么比当小说家更美好的呢？"
          },
          {
            "en": "But liking the idea of being a novelist is not enough; you have to like the actual work of novel-writing if you're going to be good at it; you have to like making up elaborate lies.",
            "cn": "但仅仅喜欢“成为小说家”这个念头是不够的；想写得好，你必须喜欢实际写小说的过程，必须喜欢编造精巧的虚构故事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Prestige is just fossilized inspiration.",
            "cn": "名望不过是凝固了的灵感。"
          },
          {
            "en": "If you do anything well enough, you'll make it prestigious.",
            "cn": "任何事情，只要你做得足够出色，就能让它获得声望。"
          },
          {
            "en": "Plenty of things we now consider prestigious were anything but at first.",
            "cn": "今天我们认为很有声望的许多事，起初完全不是那样。"
          },
          {
            "en": "Jazz comes to mind — though almost any established art form would do.",
            "cn": "爵士乐就是一个例子，尽管几乎任何一种已经确立地位的艺术形式都可以说明这一点。"
          },
          {
            "en": "So just do what you like, and let prestige take care of itself.",
            "cn": "所以，去做你喜欢的事，让名望顺其自然。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Prestige is especially dangerous to the ambitious.",
            "cn": "对有抱负的人来说，名望尤其危险。"
          },
          {
            "en": "If you want to make ambitious people waste their time on errands, the way to do it is to bait the hook with prestige.",
            "cn": "如果想让有抱负的人把时间浪费在杂务上，就用名望来当鱼饵。"
          },
          {
            "en": "That's the recipe for getting people to give talks, write forewords, serve on committees, be department heads, and so on.",
            "cn": "让人们去做演讲、写序言、担任委员会成员、当系主任等等，用的就是这个办法。"
          },
          {
            "en": "It might be a good rule simply to avoid any prestigious task.",
            "cn": "干脆避开所有能带来名望的差事，或许是条好规则。"
          },
          {
            "en": "If it didn't suck, they wouldn't have had to make it prestigious.",
            "cn": "如果它们本身不糟糕，人们也就不必拿名望来包装它们了。"
          },
          {
            "en": "Similarly, if you admire two kinds of work equally, but one is more prestigious, you should probably choose the other.",
            "cn": "同样，如果你同样欣赏两种工作，但其中一种更有声望，那么你大概应该选择另一种。"
          },
          {
            "en": "Your opinions about what's admirable are always going to be slightly influenced by prestige, so if the two seem equal to you, you probably have more genuine admiration for the less prestigious one.",
            "cn": "你对什么值得欣赏的判断，总会稍微受到名望的影响；因此，如果两者在你看来同样好，你很可能其实更欣赏名望较低的那一种。"
          },
          {
            "en": "The other big force leading people astray is money.",
            "cn": "另一种让人误入歧途的强大力量，是金钱。"
          },
          {
            "en": "Money by itself is not that dangerous.",
            "cn": "金钱本身并没有那么危险。"
          },
          {
            "en": "When something pays well but is regarded with contempt, like telemarketing, or prostitution, or personal injury litigation, ambitious people aren't tempted by it.",
            "cn": "当一份工作报酬丰厚，却被人鄙视，比如电话推销、卖淫或人身伤害诉讼时，有抱负的人不会被它吸引。"
          },
          {
            "en": "That kind of work ends up being done by people who are \"just trying to make a living.\" (Tip: avoid any field whose practitioners say this.) The danger is when money is combined with prestige, as in, say, corporate law, or medicine.",
            "cn": "最后从事这类工作的，是那些‘只是想谋生’的人。（提示：避开从业者会这么说的任何行业。）真正的危险在于金钱和名望结合，例如公司法或医学领域。",
            "alignedParts": [
              {
                "en": "That kind of work ends up being done by people who are \"just trying to make a living.\"",
                "cn": "最后从事这类工作的，是那些‘只是想谋生’的人。"
              },
              {
                "en": "(Tip: avoid any field whose practitioners say this.) The danger is when money is combined with prestige, as in, say, corporate law, or medicine.",
                "cn": "（提示：避开从业者会这么说的任何行业。）真正的危险在于金钱和名望结合，例如公司法或医学领域。"
              }
            ]
          },
          {
            "en": "A comparatively safe and prosperous career with some automatic baseline prestige is dangerously tempting to someone young, who hasn't thought much about what they really like.",
            "cn": "对尚未认真思考自己真正喜欢什么的年轻人来说，一份比较安稳、收入优厚、又自带一定声望的职业，具有危险的诱惑力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The test of whether people love what they do is whether they'd do it even if they weren't paid for it — even if they had to work at another job to make a living.",
            "cn": "检验一个人是否热爱自己的工作，就看即使没有报酬，甚至必须另找一份工作谋生，他是否仍愿意做这件事。"
          },
          {
            "en": "How many corporate lawyers would do their current work if they had to do it for free, in their spare time, and take day jobs as waiters to support themselves?",
            "cn": "如果必须在业余时间免费做现在的工作，白天还要当服务员养活自己，有多少公司律师仍然愿意干？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This test is especially helpful in deciding between different kinds of academic work, because fields vary greatly in this respect.",
            "cn": "这个检验在选择不同学术领域时特别有用，因为各领域在这方面差异很大。"
          },
          {
            "en": "Most good mathematicians would work on math even if there were no jobs as math professors, whereas in the departments at the other end of the spectrum, the availability of teaching jobs is the driver: people would rather be English professors than work in ad agencies, and publishing papers is the way you compete for such jobs.",
            "cn": "即使没有数学教授的职位，大多数优秀数学家仍会研究数学；而在另一端的某些院系，教职机会才是驱动力：人们宁愿当英语教授，也不愿去广告公司工作，发表论文则是竞争这类职位的手段。"
          },
          {
            "en": "Math would happen without math departments, but it is the existence of English majors, and therefore jobs teaching them, that calls into being all those thousands of dreary papers about gender and identity in the novels of Conrad.",
            "cn": "即使没有数学系，数学研究也会存在；但正是英语专业的存在，以及由此产生的教学职位，才催生了成千上万篇研究康拉德小说中性别与身份的乏味论文。"
          },
          {
            "en": "No one does that kind of thing for fun.",
            "cn": "没有人会因为觉得好玩而做这种事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The advice of parents will tend to err on the side of money.",
            "cn": "父母的建议往往会过分偏向赚钱。"
          },
          {
            "en": "It seems safe to say there are more undergrads who want to be novelists and whose parents want them to be doctors than who want to be doctors and whose parents want them to be novelists.",
            "cn": "可以肯定地说，想当小说家却被父母要求当医生的大学生，比想当医生却被父母要求当小说家的大学生更多。"
          },
          {
            "en": "The kids think their parents are \"materialistic.\" Not necessarily.",
            "cn": "孩子觉得父母“物质”。其实未必。"
          },
          {
            "en": "All parents tend to be more conservative for their kids than they would for themselves, simply because, as parents, they share risks more than rewards.",
            "cn": "所有父母在为孩子考虑时，往往比为自己考虑更保守，因为身为父母，他们分担的风险多于回报。"
          },
          {
            "en": "If your eight year old son decides to climb a tall tree, or your teenage daughter decides to date the local bad boy, you won't get a share in the excitement, but if your son falls, or your daughter gets pregnant, you'll have to deal with the consequences.",
            "cn": "如果八岁的儿子决定爬一棵高树，或十几岁的女儿决定和当地的坏小子约会，你分享不到其中的兴奋；可如果儿子摔下来，或女儿怀孕了，你却得承担后果。"
          },
          {
            "en": "With such powerful forces leading us astray, it's not surprising we find it so hard to discover what we like to work on.",
            "cn": "有这么多强大的力量把我们引向歧途，难以发现自己真正喜欢做什么，也就不足为奇了。"
          },
          {
            "en": "Most people are doomed in childhood by accepting the axiom that work = pain.",
            "cn": "大多数人在童年接受“工作等于痛苦”这条公理时，就已注定走偏。"
          },
          {
            "en": "Those who escape this are nearly all lured onto the rocks by prestige or money.",
            "cn": "逃过这一关的人，几乎又都被名望或金钱引向了礁石。"
          },
          {
            "en": "How many even discover something they love to work on?",
            "cn": "究竟有多少人，连自己热爱的工作都能发现呢？"
          },
          {
            "en": "A few hundred thousand, perhaps, out of billions.",
            "cn": "几十亿人中，也许只有几十万人。"
          },
          {
            "en": "It's hard to find work you love; it must be, if so few do.",
            "cn": "找到热爱的工作很难；既然做到的人这么少，它肯定很难。"
          },
          {
            "en": "So don't underestimate this task.",
            "cn": "所以，不要低估这项任务。"
          },
          {
            "en": "And don't feel bad if you haven't succeeded yet.",
            "cn": "如果还没成功，也不必难过。"
          },
          {
            "en": "In fact, if you admit to yourself that you're discontented, you're a step ahead of most people, who are still in denial.",
            "cn": "事实上，如果你能向自己承认不满意现状，就已经比仍在否认这一点的大多数人领先了一步。"
          },
          {
            "en": "If you're surrounded by colleagues who claim to enjoy work that you find contemptible, odds are they're lying to themselves.",
            "cn": "如果周围同事声称喜欢某份你看不起的工作，他们很可能是在自欺欺人。"
          },
          {
            "en": "Not necessarily, but probably.",
            "cn": "不一定如此，但很有可能。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Although doing great work takes less discipline than people think — because the way to do great work is to find something you like so much that you don't have to force yourself to do it — finding work you love does usually require discipline.",
            "cn": "做出伟大的成果，其实没有人们想象的那么需要自律，因为诀窍是找到你足够喜欢、无需强迫自己就会去做的事；但找到热爱的工作，通常确实需要自律。"
          },
          {
            "en": "Some people are lucky enough to know what they want to do when they're 12, and just glide along as if they were on railroad tracks.",
            "cn": "有些人很幸运，十二岁时就知道自己想做什么，此后像沿着铁轨一样顺畅前行。"
          },
          {
            "en": "But this seems the exception.",
            "cn": "但这似乎只是例外。"
          },
          {
            "en": "More often people who do great things have careers with the trajectory of a ping-pong ball.",
            "cn": "更多成就非凡的人，职业轨迹倒像一颗来回弹跳的乒乓球。"
          },
          {
            "en": "They go to school to study A, drop out and get a job doing B, and then become famous for C after taking it up on the side.",
            "cn": "他们入学学习甲，中途退学去做乙，后来又因为业余开始尝试的丙而出名。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Sometimes jumping from one sort of work to another is a sign of energy, and sometimes it's a sign of laziness.",
            "cn": "从一种工作跳到另一种，有时是精力充沛的表现，有时则是懒惰的表现。"
          },
          {
            "en": "Are you dropping out, or boldly carving a new path?",
            "cn": "你是在逃避，还是在勇敢地开辟新路？"
          },
          {
            "en": "You often can't tell yourself.",
            "cn": "你自己也常常分不清。"
          },
          {
            "en": "Plenty of people who will later do great things seem to be disappointments early on, when they're trying to find their niche.",
            "cn": "许多后来取得非凡成就的人，在早期寻找适合自己的位置时，都曾让人失望。"
          },
          {
            "en": "Is there some test you can use to keep yourself honest?",
            "cn": "有没有什么方法，能让你诚实地面对自己？"
          },
          {
            "en": "One is to try to do a good job at whatever you're doing, even if you don't like it.",
            "cn": "一种方法是，无论正在做什么，即使不喜欢，也努力把它做好。"
          },
          {
            "en": "Then at least you'll know you're not using dissatisfaction as an excuse for being lazy.",
            "cn": "这样，你至少知道自己没有把不满意当作偷懒的借口。"
          },
          {
            "en": "Perhaps more importantly, you'll get into the habit of doing things well.",
            "cn": "也许更重要的是，你会养成把事情做好的习惯。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another test you can use is: always produce.",
            "cn": "另一种检验方法是：始终有所产出。"
          },
          {
            "en": "For example, if you have a day job you don't take seriously because you plan to be a novelist, are you producing?",
            "cn": "比如，你因为打算当小说家，而对日常工作不上心；那么，你有在创作吗？"
          },
          {
            "en": "Are you writing pages of fiction, however bad?",
            "cn": "你有没有写下一页页小说，哪怕写得很差？"
          },
          {
            "en": "As long as you're producing, you'll know you're not merely using the hazy vision of the grand novel you plan to write one day as an opiate.",
            "cn": "只要还在产出，你就能知道：自己没有仅仅把“将来要写一部伟大小说”的模糊愿景当作麻醉剂。"
          },
          {
            "en": "The view of it will be obstructed by the all too palpably flawed one you're actually writing.",
            "cn": "因为你眼前正在写的那部缺点无比明显的小说，会挡住那个美好幻影。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Always produce\" is also a heuristic for finding the work you love.",
            "cn": "“始终有所产出”也是寻找热爱工作的一个方法。"
          },
          {
            "en": "If you subject yourself to that constraint, it will automatically push you away from things you think you're supposed to work on, toward things you actually like.",
            "cn": "如果你给自己设下这条约束，它就会自动把你从那些自以为应该做的事，推向你真正喜欢的事。"
          },
          {
            "en": "\"Always produce\" will discover your life's work the way water, with the aid of gravity, finds the hole in your roof.",
            "cn": "“始终有所产出”会帮你找到一生的事业，就像水借助重力，最终找到屋顶上的漏洞一样。"
          },
          {
            "en": "Of course, figuring out what you like to work on doesn't mean you get to work on it.",
            "cn": "当然，弄清自己喜欢做什么，并不意味着你就能去做。"
          },
          {
            "en": "That's a separate question.",
            "cn": "那是另一个问题。"
          },
          {
            "en": "And if you're ambitious you have to keep them separate: you have to make a conscious effort to keep your ideas about what you want from being contaminated by what seems possible. [ 6 ]",
            "cn": "如果你有抱负，就必须把两者分开：有意识地努力，不让“什么看起来可行”污染“自己想要什么”的判断。[6]"
          },
          {
            "en": "It's painful to keep them apart, because it's painful to observe the gap between them.",
            "cn": "把它们分开是痛苦的，因为正视两者之间的差距令人痛苦。"
          },
          {
            "en": "So most people pre-emptively lower their expectations.",
            "cn": "所以，大多数人会预先降低自己的期望。"
          },
          {
            "en": "For example, if you asked random people on the street if they'd like to be able to draw like Leonardo, you'd find most would say something like \"Oh, I can't draw.\" This is more a statement of intention than fact; it means, I'm not going to try.",
            "cn": "比如，随便问路人是否想像达·芬奇那样画画，大多数人可能会说：‘哦，我不会画画。’这与其说是陈述事实，不如说是表明意图：我不打算尝试。",
            "alignedParts": [
              {
                "en": "For example, if you asked random people on the street if they'd like to be able to draw like Leonardo, you'd find most would say something like \"Oh, I can't draw.\"",
                "cn": "比如，随便问路人是否想像达·芬奇那样画画，大多数人可能会说：‘哦，我不会画画。’"
              },
              {
                "en": "This is more a statement of intention than fact; it means, I'm not going to try.",
                "cn": "这与其说是陈述事实，不如说是表明意图：我不打算尝试。"
              }
            ]
          },
          {
            "en": "Because the fact is, if you took a random person off the street and somehow got them to work as hard as they possibly could at drawing for the next twenty years, they'd get surprisingly far.",
            "cn": "因为事实是，随便从街上找个人，让他在接下来的二十年里竭尽全力练习绘画，他会取得令人惊讶的进步。"
          },
          {
            "en": "But it would require a great moral effort; it would mean staring failure in the eye every day for years.",
            "cn": "但这需要极大的意志力，意味着多年来每天都要直面失败。"
          },
          {
            "en": "And so to protect themselves people say \"I can't.\"",
            "cn": "因此，人们为了保护自己，会说：“我做不到。”"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another related line you often hear is that not everyone can do work they love — that someone has to do the unpleasant jobs.",
            "cn": "你还经常会听到一个相关说法：并不是每个人都能做热爱的工作，总得有人去做那些不愉快的工作。"
          },
          {
            "en": "Really?",
            "cn": "真是这样吗？"
          },
          {
            "en": "How do you make them?",
            "cn": "你要怎样强迫他们去做？"
          },
          {
            "en": "In the US the only mechanism for forcing people to do unpleasant jobs is the draft, and that hasn't been invoked for over 30 years.",
            "cn": "在美国，唯一能强迫人们从事不愉快工作的机制是征兵，而这项机制已经三十多年没有启用了。"
          },
          {
            "en": "All we can do is encourage people to do unpleasant work, with money and prestige.",
            "cn": "我们能做的，只是用金钱和名望鼓励人们去做不愉快的工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If there's something people still won't do, it seems as if society just has to make do without.",
            "cn": "如果仍然有些事情没人愿意做，社会似乎也只能在没有这些事情的情况下继续运转。"
          },
          {
            "en": "That's what happened with domestic servants.",
            "cn": "家佣就是这样一个例子。"
          },
          {
            "en": "For millennia that was the canonical example of a job \"someone had to do.\" And yet in the mid twentieth century servants practically disappeared in rich countries, and the rich have just had to do without.",
            "cn": "几千年来，家佣一直是‘总得有人来做’的典型工作。可到了二十世纪中叶，富裕国家的家佣几乎消失了，有钱人也只能适应没有家佣的生活。",
            "alignedParts": [
              {
                "en": "For millennia that was the canonical example of a job \"someone had to do.\"",
                "cn": "几千年来，家佣一直是‘总得有人来做’的典型工作。"
              },
              {
                "en": "And yet in the mid twentieth century servants practically disappeared in rich countries, and the rich have just had to do without.",
                "cn": "可到了二十世纪中叶，富裕国家的家佣几乎消失了，有钱人也只能适应没有家佣的生活。"
              }
            ]
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So while there may be some things someone has to do, there's a good chance anyone saying that about any particular job is mistaken.",
            "cn": "所以，虽然可能有些事情确实必须有人做，但说某一份具体工作必定如此的人，很可能是错的。"
          },
          {
            "en": "Most unpleasant jobs would either get automated or go undone if no one were willing to do them.",
            "cn": "如果没有人愿意做，大多数不愉快的工作，要么会实现自动化，要么就不再有人去做。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There's another sense of \"not everyone can do work they love\" that's all too true, however.",
            "cn": "不过，“不是每个人都能做自己热爱的工作”，还有另一层含义，而且千真万确。"
          },
          {
            "en": "One has to make a living, and it's hard to get paid for doing work you love.",
            "cn": "人必须谋生，而靠自己热爱的工作获得报酬并不容易。"
          },
          {
            "en": "There are two routes to that destination: The organic route: as you become more eminent, gradually to increase the parts of your job that you like at the expense of those you don't.",
            "cn": "通向这个目标有两条路：自然发展路线——随着声望和地位提高，逐渐增加工作中喜欢的部分，减少不喜欢的部分。"
          },
          {
            "en": "The two-job route: to work at things you don't like to get money to work on things you do.",
            "cn": "双工作路线——靠不喜欢的事情赚钱，来支持自己做喜欢的事情。"
          },
          {
            "en": "The organic route is more common.",
            "cn": "自然发展路线更常见。"
          },
          {
            "en": "It happens naturally to anyone who does good work.",
            "cn": "对工作做得好的人来说，它往往自然而然地发生。"
          },
          {
            "en": "A young architect has to take whatever work he can get, but if he does well he'll gradually be in a position to pick and choose among projects.",
            "cn": "年轻建筑师必须接受所有能接到的工作，但如果做得好，慢慢就能挑选项目了。"
          },
          {
            "en": "The disadvantage of this route is that it's slow and uncertain.",
            "cn": "这条路线的缺点是缓慢而且不确定。"
          },
          {
            "en": "Even tenure is not real freedom.",
            "cn": "即使获得终身教职，也不等于真正自由。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The two-job route has several variants depending on how long you work for money at a time.",
            "cn": "双工作路线有几个变体，取决于你每次为赚钱而工作的时间有多长。"
          },
          {
            "en": "At one extreme is the \"day job,\" where you work regular hours at one job to make money, and work on what you love in your spare time.",
            "cn": "一个极端是保留一份日常工作：在固定时间上班赚钱，在业余时间做自己热爱的事。"
          },
          {
            "en": "At the other extreme you work at something till you make enough not to have to work for money again.",
            "cn": "另一个极端是先做某件事，直到赚够钱，此后再也不必为钱工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The two-job route is less common than the organic route, because it requires a deliberate choice.",
            "cn": "双工作路线不如自然发展路线常见，因为它需要有意识地做出选择。"
          },
          {
            "en": "It's also more dangerous.",
            "cn": "它也更危险。"
          },
          {
            "en": "Life tends to get more expensive as you get older, so it's easy to get sucked into working longer than you expected at the money job.",
            "cn": "随着年龄增长，生活开销往往越来越大，因此你很容易陷入为了赚钱而工作的状态，做得比原计划更久。"
          },
          {
            "en": "Worse still, anything you work on changes you.",
            "cn": "更糟的是，任何工作都会改变你。"
          },
          {
            "en": "If you work too long on tedious stuff, it will rot your brain.",
            "cn": "枯燥的事做得太久，会让你的头脑逐渐钝化。"
          },
          {
            "en": "And the best paying jobs are most dangerous, because they require your full attention.",
            "cn": "而报酬最高的工作最危险，因为它们需要你全神贯注。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The advantage of the two-job route is that it lets you jump over obstacles.",
            "cn": "双工作路线的优势，是让你能跨越障碍。"
          },
          {
            "en": "The landscape of possible jobs isn't flat; there are walls of varying heights between different kinds of work.",
            "cn": "职业世界并不是一片平地；不同类型的工作之间，隔着高低不一的墙。"
          },
          {
            "en": "[ 7 ] The trick of maximizing the parts of your job that you like can get you from architecture to product design, but not, probably, to music.",
            "cn": "[7]尽量增加工作中喜欢的部分，这个办法能让你从建筑转向产品设计，却大概不能让你转向音乐。"
          },
          {
            "en": "If you make money doing one thing and then work on another, you have more freedom of choice.",
            "cn": "如果靠做一件事赚钱，再去做另一件事，你就有更多选择自由。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Which route should you take?",
            "cn": "你该走哪条路？"
          },
          {
            "en": "That depends on how sure you are of what you want to do, how good you are at taking orders, how much risk you can stand, and the odds that anyone will pay (in your lifetime) for what you want to do.",
            "cn": "这取决于：你对自己想做什么有多确定，是否擅长服从安排，能承受多大的风险，以及在你有生之年，有人愿意为你想做的事付费的可能性有多大。"
          },
          {
            "en": "If you're sure of the general area you want to work in and it's something people are likely to pay you for, then you should probably take the organic route.",
            "cn": "如果你确定想从事的大致领域，而且这件事很可能有人愿意付费，那么大概应该选择自然发展路线。"
          },
          {
            "en": "But if you don't know what you want to work on, or don't like to take orders, you may want to take the two-job route, if you can stand the risk.",
            "cn": "但如果你还不知道想做什么，或者不喜欢听命于人，并且能够承担风险，那么可以考虑双工作路线。"
          },
          {
            "en": "Don't decide too soon.",
            "cn": "不要太早做决定。"
          },
          {
            "en": "Kids who know early what they want to do seem impressive, as if they got the answer to some math question before the other kids.",
            "cn": "很早就知道自己想做什么的孩子，看起来令人钦佩，仿佛比其他孩子更早解出了数学题。"
          },
          {
            "en": "They have an answer, certainly, but odds are it's wrong.",
            "cn": "他们确实有了一个答案，但那个答案很可能是错的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A friend of mine who is a quite successful doctor complains constantly about her job.",
            "cn": "我有个朋友，是一位相当成功的医生，却经常抱怨工作。"
          },
          {
            "en": "When people applying to medical school ask her for advice, she wants to shake them and yell \"Don't do it!\" (But she never does.) How did she get into this fix?",
            "cn": "申请医学院的人向她请教时，她真想抓住他们摇晃，大喊：‘千万别读！’（但她从来没有真的这样做。）她怎么会陷入这种困境？",
            "alignedParts": [
              {
                "en": "When people applying to medical school ask her for advice, she wants to shake them and yell \"Don't do it!\"",
                "cn": "申请医学院的人向她请教时，她真想抓住他们摇晃，大喊：‘千万别读！’"
              },
              {
                "en": "(But she never does.) How did she get into this fix?",
                "cn": "（但她从来没有真的这样做。）她怎么会陷入这种困境？"
              }
            ]
          },
          {
            "en": "In high school she already wanted to be a doctor.",
            "cn": "高中时，她就想当医生。"
          },
          {
            "en": "And she is so ambitious and determined that she overcame every obstacle along the way — including, unfortunately, not liking it.",
            "cn": "她抱负远大、意志坚定，克服了一路上的所有障碍——不幸的是，也包括“不喜欢这份工作”这个障碍。"
          },
          {
            "en": "Now she has a life chosen for her by a high-school kid.",
            "cn": "现在，她过着一个高中生替她选定的人生。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you're young, you're given the impression that you'll get enough information to make each choice before you need to make it.",
            "cn": "年轻时，你得到的印象是：在必须做出每个选择之前，都会获得足够的信息。"
          },
          {
            "en": "But this is certainly not so with work.",
            "cn": "但选择工作时，显然不是这样。"
          },
          {
            "en": "When you're deciding what to do, you have to operate on ridiculously incomplete information.",
            "cn": "决定做什么时，你掌握的信息少得荒唐。"
          },
          {
            "en": "Even in college you get little idea what various types of work are like.",
            "cn": "即使在大学，你对各种工作的实际样子仍然知之甚少。"
          },
          {
            "en": "At best you may have a couple internships, but not all jobs offer internships, and those that do don't teach you much more about the work than being a batboy teaches you about playing baseball.",
            "cn": "最好的情况，也不过是有几次实习；但并非所有工作都有实习，即使有，你对真正工作的了解，也未必比一个球童对打棒球的了解多多少。"
          },
          {
            "en": "In the design of lives, as in the design of most other things, you get better results if you use flexible media.",
            "cn": "设计人生和设计大多数其他东西一样，采用灵活的方式，往往能得到更好的结果。"
          },
          {
            "en": "So unless you're fairly sure what you want to do, your best bet may be to choose a type of work that could turn into either an organic or two-job career.",
            "cn": "所以，除非你相当确定自己想做什么，否则最好的选择，可能是一份既能走自然发展路线、又能走双工作路线的工作。"
          },
          {
            "en": "That was probably part of the reason I chose computers.",
            "cn": "这大概也是我选择计算机的一部分原因。"
          },
          {
            "en": "You can be a professor, or make a lot of money, or morph it into any number of other kinds of work.",
            "cn": "你可以当教授，也可以赚很多钱，还可以转向许多其他类型的工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It's also wise, early on, to seek jobs that let you do many different things, so you can learn faster what various kinds of work are like.",
            "cn": "刚开始时，寻找能让你接触多种任务的工作也很明智，这样能更快了解不同工作的实际样子。"
          },
          {
            "en": "Conversely, the extreme version of the two-job route is dangerous because it teaches you so little about what you like.",
            "cn": "相反，双工作路线的极端版本很危险，因为它几乎不能帮助你认识自己喜欢什么。"
          },
          {
            "en": "If you work hard at being a bond trader for ten years, thinking that you'll quit and write novels when you have enough money, what happens when you quit and then discover that you don't actually like writing novels?",
            "cn": "如果你努力做了十年债券交易员，想着赚够钱就辞职写小说，可辞职后才发现自己其实不喜欢写小说，那怎么办？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Most people would say, I'd take that problem.",
            "cn": "大多数人会说：“这种烦恼我愿意要。”"
          },
          {
            "en": "Give me a million dollars and I'll figure out what to do.",
            "cn": "给我一百万美元，我自会想清楚做什么。"
          },
          {
            "en": "But it's harder than it looks.",
            "cn": "但这比看起来更难。"
          },
          {
            "en": "Constraints give your life shape.",
            "cn": "约束给生活塑造了形状。"
          },
          {
            "en": "Remove them and most people have no idea what to do: look at what happens to those who win lotteries or inherit money.",
            "cn": "去掉约束，大多数人就不知道该做什么了；看看中彩票或继承财产的人会怎样就知道。"
          },
          {
            "en": "Much as everyone thinks they want financial security, the happiest people are not those who have it, but those who like what they do.",
            "cn": "尽管人人都觉得自己想要经济保障，最快乐的人却不是那些已经拥有经济保障的人，而是喜欢自己所做之事的人。"
          },
          {
            "en": "So a plan that promises freedom at the expense of knowing what to do with it may not be as good as it seems.",
            "cn": "因此，一个承诺带来自由、却让你无法弄清该如何使用自由的计划，可能没有看上去那么好。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Whichever route you take, expect a struggle.",
            "cn": "不论选择哪条路线，都要准备好经历一番挣扎。"
          },
          {
            "en": "Finding work you love is very difficult.",
            "cn": "找到自己热爱的工作非常困难。"
          },
          {
            "en": "Most people fail.",
            "cn": "大多数人都失败了。"
          },
          {
            "en": "Even if you succeed, it's rare to be free to work on what you want till your thirties or forties.",
            "cn": "即使成功，通常也要等到三四十岁，才能自由地做自己想做的工作。"
          },
          {
            "en": "But if you have the destination in sight you'll be more likely to arrive at it.",
            "cn": "但只要看得见目的地，你就更有可能到达。"
          },
          {
            "en": "If you know you can love work, you're in the home stretch, and if you know what work you love, you're practically there.",
            "cn": "如果你知道自己能够热爱工作，就已经进入最后冲刺；如果知道自己热爱的是哪种工作，就几乎已经到达终点了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[ 1 ] Currently we do the opposite: when we make kids do boring work, like arithmetic drills, instead of admitting frankly that it's boring, we try to disguise it with superficial decorations.",
            "cn": "[1]目前我们却反其道而行之：让孩子做枯燥的任务，比如算术练习时，我们不坦率承认它很无聊，而是用表面的装饰来掩盖。"
          },
          {
            "en": "[ 2 ] One father told me about a related phenomenon: he found himself concealing from his family how much he liked his work.",
            "cn": "[2]一位父亲告诉我一个相关现象：他发现自己在向家人隐瞒，他有多喜欢自己的工作。"
          },
          {
            "en": "When he wanted to go to work on a saturday, he found it easier to say that it was because he \"had to\" for some reason, rather than admitting he preferred to work than stay home with them.",
            "cn": "周六想去工作时，他觉得找个理由说自己“不得不去”，比承认自己更愿意工作、而不是待在家里陪他们，要容易一些。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[ 3 ] Something similar happens with suburbs.",
            "cn": "[3]郊区也存在类似的情况。"
          },
          {
            "en": "Parents move to suburbs to raise their kids in a safe environment, but suburbs are so dull and artificial that by the time they're fifteen the kids are convinced the whole world is boring.",
            "cn": "父母搬到郊区，是为了让孩子在安全的环境中长大；但郊区如此单调、如此人工化，以至于孩子到了十五岁，就确信整个世界都很无聊。"
          },
          {
            "en": "[ 4 ] I'm not saying friends should be the only audience for your work.",
            "cn": "[4]我不是说，朋友应该是你作品唯一的受众。"
          },
          {
            "en": "The more people you can help, the better.",
            "cn": "你能帮助的人越多越好。"
          },
          {
            "en": "But friends should be your compass.",
            "cn": "但朋友应该是你的指南针。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "[ 5 ] Donald Hall said young would-be poets were mistaken to be so obsessed with being published.",
            "cn": "[5]唐纳德·霍尔说，年轻的诗歌写作者如此执着于发表作品，是一种错误。"
          },
          {
            "en": "But you can imagine what it would do for a 24 year old to get a poem published in The New Yorker .",
            "cn": "但你可以想象，对一个二十四岁的人来说，在《纽约客》发表一首诗意味着什么。"
          },
          {
            "en": "Now to people he meets at parties he's a real poet.",
            "cn": "现在，聚会上遇见的人会把他当作真正的诗人。"
          },
          {
            "en": "Actually he's no better or worse than he was before, but to a clueless audience like that, the approval of an official authority makes all the difference.",
            "cn": "其实，他既没有比以前更好，也没有更差；但对于那些不懂诗的受众，权威机构的认可却能改变一切。"
          },
          {
            "en": "So it's a harder problem than Hall realizes.",
            "cn": "所以，这个问题比霍尔意识到的更难。"
          },
          {
            "en": "The reason the young care so much about prestige is that the people they want to impress are not very discerning.",
            "cn": "年轻人如此在意名望，是因为他们想打动的人并没有多强的鉴赏力。"
          },
          {
            "en": "[ 6 ] This is isomorphic to the principle that you should prevent your beliefs about how things are from being contaminated by how you wish they were.",
            "cn": "[6]这与另一条原则具有相同的结构：不要让“你希望事情是什么样”污染你对“事情实际上是什么样”的判断。"
          },
          {
            "en": "Most people let them mix pretty promiscuously.",
            "cn": "大多数人会任由这两者随意混在一起。"
          },
          {
            "en": "The continuing popularity of religion is the most visible index of that.",
            "cn": "宗教持续受到欢迎，就是最明显的指标。"
          },
          {
            "en": "[ 7 ] A more accurate metaphor would be to say that the graph of jobs is not very well connected.",
            "cn": "[7]更准确的比喻是：各种工作构成的图，其连接并不充分。"
          },
          {
            "en": "Thanks to Trevor Blackwell, Dan Friedman, Sarah Harlin, Jessica Livingston, Jackie McDonough, Robert Morris, Peter Norvig, David Sloo, and Aaron Swartz for reading drafts of this.",
            "cn": "感谢特雷弗·布莱克韦尔、丹·弗里德曼、莎拉·哈林、杰西卡·利文斯顿、杰姬·麦克多诺、罗伯特·莫里斯、彼得·诺维格、戴维·斯卢和亚伦·斯沃茨阅读本文草稿。"
          }
        ]
      }
    ],
    "translationReview": "2026-09-26：按英文原句校正中英配对；保留原文与段落位置。"
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
    "coverImg": "assets/covers/gr-pg-how-to-do-great-work.jpg",
    "translationCredit": "中文译文：untymen.com（社区译本）；词阅已按英文原句校正错位及部分译文（2026-09-26）。",
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
            "cn": "弄清自己该做什么的方法，就是动手去做。"
          },
          {
            "en": "If you're not sure what to work on, guess.",
            "cn": "如果不确定要做什么，就先猜一个方向。"
          },
          {
            "en": "But pick something and get going.",
            "cn": "但要选定一件事，然后开始行动。"
          },
          {
            "en": "You'll probably guess wrong some of the time, but that's fine.",
            "cn": "有时你可能会猜错，不过这没关系。"
          },
          {
            "en": "It's good to know about multiple things; some of the biggest discoveries come from noticing connections between different fields.",
            "cn": "了解多个领域是好事；有些最重大的发现，正是来自发现不同领域之间的联系。"
          },
          {
            "en": "Develop a habit of working on your own projects.",
            "cn": "养成做自己项目的习惯。"
          },
          {
            "en": "Don't let \"work\" mean something other people tell you to do.",
            "cn": "别让“工作”仅仅意味着别人叫你做的事。"
          },
          {
            "en": "If you do manage to do great work one day, it will probably be on a project of your own.",
            "cn": "如果有一天你真的做出了伟大的成果，很可能是在你自己的项目中。"
          },
          {
            "en": "It may be within some bigger project, but you'll be driving your part of it.",
            "cn": "这个项目也许属于某个更大的项目，但你会主导自己负责的那一部分。"
          },
          {
            "en": "What should your projects be?",
            "cn": "你该做什么项目？"
          },
          {
            "en": "Whatever seems to you excitingly ambitious.",
            "cn": "任何让你因其雄心而感到兴奋的项目。"
          },
          {
            "en": "As you grow older and your taste in projects evolves, exciting and important will converge.",
            "cn": "随着年龄增长、对项目的品味不断变化，“令人兴奋”和“重要”会逐渐重合。"
          },
          {
            "en": "At 7 it may seem excitingly ambitious to build huge things out of Lego, then at 14 to teach yourself calculus, till at 21 you're starting to explore unanswered questions in physics.",
            "cn": "七岁时，用乐高搭建巨大的东西可能令人兴奋；十四岁时是自学微积分；到了二十一岁，则可能开始探索物理学中尚未解答的问题。"
          },
          {
            "en": "But always preserve excitingness.",
            "cn": "但无论何时，都要保留那份兴奋感。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There's a kind of excited curiosity that's both the engine and the rudder of great work.",
            "cn": "有一种令人兴奋的好奇心，既是伟大工作的引擎，也是它的舵。"
          },
          {
            "en": "It will not only drive you, but if you let it have its way, will also show you what to work on.",
            "cn": "它不仅会推动你；如果你让它自由发展，它还会指引你该做什么。"
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
            "cn": "与此同时，你没有在从事大多数其他类型的工作，因此也无从了解它们。"
          },
          {
            "en": "So in the worst case you choose late based on very incomplete information. [ 4 ]",
            "cn": "所以，最坏的情况是：你很晚才做出选择，而且依据的信息还很不完整。[4]"
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
            "cn": "犹豫时，优先选择更有趣的方向。"
          },
          {
            "en": "Fields change as you learn more about them.",
            "cn": "随着了解加深，一个领域在你眼中的样子会发生变化。"
          },
          {
            "en": "What mathematicians do, for example, is very different from what you do in high school math classes.",
            "cn": "比如，数学家做的事，与高中数学课上做的事截然不同。"
          },
          {
            "en": "So you need to give different types of work a chance to show you what they're like.",
            "cn": "因此，你需要给不同类型的工作机会，让它们展现真实的样子。"
          },
          {
            "en": "But a field should become increasingly interesting as you learn more about it.",
            "cn": "不过，随着了解加深，一个领域应该变得越来越有趣。"
          },
          {
            "en": "If it doesn't, it's probably not for you.",
            "cn": "如果没有，它可能就不适合你。"
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
            "cn": "一旦走上那条路，你就迷失了。[6]"
          },
          {
            "en": "There are a lot of forces that will lead you astray when you're trying to figure out what to work on.",
            "cn": "在弄清自己该做什么的过程中，有许多力量会把你引向歧途。"
          },
          {
            "en": "Pretentiousness, fashion, fear, money, politics, other people's wishes, eminent frauds.",
            "cn": "比如矫揉造作、时尚、恐惧、金钱、政治、他人的期望，以及声名显赫的骗子。"
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
            "cn": "我把这种方法称为‘保持上风’。大多数做出伟大成果的人，似乎都是这么做的。",
            "alignedParts": [
              {
                "en": "I call this approach \"staying upwind.\"",
                "cn": "我把这种方法称为‘保持上风’。"
              },
              {
                "en": "This is how most people who've done great work seem to have done it.",
                "cn": "大多数做出伟大成果的人，似乎都是这么做的。"
              }
            ]
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
            "cn": "有时，一个新想法会让你清晨从床上一跃而起，立刻开始工作。"
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
            "cn": "尽量安排好生活，让自己拥有大块连续的工作时间。"
          },
          {
            "en": "You'll shy away from hard tasks if you know you might be interrupted.",
            "cn": "如果知道随时可能被打断，你就会回避困难的任务。"
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
            "cn": "这个门槛在某种意义上是虚高的，因为启动所需的能量大于持续工作所需的能量；因此，为了跨过它，对自己撒个相应程度的谎也无妨。"
          },
          {
            "en": "It's usually a mistake to lie to yourself if you want to do great work, but this is one of the rare cases where it isn't.",
            "cn": "想做出伟大的成果，通常不该自欺欺人，但这正是少数例外之一。"
          },
          {
            "en": "When I'm reluctant to start work in the morning, I often trick myself by saying \"I'll just read over what I've got so far.\" Five minutes later I've found something that seems mistaken or incomplete, and I'm off.",
            "cn": "早晨不想开始工作时，我常常骗自己说：‘我就把已经写好的内容读一遍。’五分钟后，我就发现了错误或不完整的地方，接着便开始干了。",
            "alignedParts": [
              {
                "en": "When I'm reluctant to start work in the morning, I often trick myself by saying \"I'll just read over what I've got so far.\"",
                "cn": "早晨不想开始工作时，我常常骗自己说：‘我就把已经写好的内容读一遍。’"
              },
              {
                "en": "Five minutes later I've found something that seems mistaken or incomplete, and I'm off.",
                "cn": "五分钟后，我就发现了错误或不完整的地方，接着便开始干了。"
              }
            ]
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
            "cn": "所以，按项目拖延不会像按天拖延那样触发警报。"
          },
          {
            "en": "You're too busy to notice it.",
            "cn": "你忙得根本注意不到它。"
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
            "cn": "每天写一页听起来不多，但如果天天坚持，一年就能写出一本书。"
          },
          {
            "en": "That's the key: consistency.",
            "cn": "关键就在这里：持续不断。"
          },
          {
            "en": "People who do great things don't get a lot done every day.",
            "cn": "成就非凡的人，并不是每天都完成很多事情。"
          },
          {
            "en": "They get something done, rather than nothing.",
            "cn": "他们每天都会完成一些事，而不是一事无成。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you do work that compounds, you'll get exponential growth.",
            "cn": "如果你的工作能不断产生复利效应，就会获得指数式增长。"
          },
          {
            "en": "Most people who do this do it unconsciously, but it's worth stopping to think about.",
            "cn": "大多数这样做的人并非有意为之，但这值得停下来想一想。"
          },
          {
            "en": "Learning, for example, is an instance of this phenomenon: the more you learn about something, the easier it is to learn more.",
            "cn": "比如，学习就是这种现象：对某件事了解得越多，继续深入学习就越容易。"
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
            "cn": "指数式增长的问题在于，曲线起初看起来很平。"
          },
          {
            "en": "It isn't; it's still a wonderful exponential curve.",
            "cn": "其实不是，它仍然是一条美妙的指数曲线。"
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
            "cn": "稍微让思绪游走，往往能解决那些正面攻克不了的问题。"
          },
          {
            "en": "You have to be working hard in the normal way to benefit from this phenomenon, though.",
            "cn": "不过，要从这种现象中受益，你也必须以通常的方式努力工作。"
          },
          {
            "en": "You can't just walk around daydreaming.",
            "cn": "你不能只是一边闲逛一边做白日梦。"
          },
          {
            "en": "The daydreaming has to be interleaved with deliberate work that feeds it questions. [ 10 ]",
            "cn": "白日梦必须与有意识的工作交替进行，由后者为它提供问题。[10]"
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
            "cn": "所以，要避免那些把工作挤出关注首位的干扰，否则这种宝贵的思考方式，就会被浪费在干扰上。"
          },
          {
            "en": "(Exception: Don't avoid love.)",
            "cn": "（例外：不要回避爱情。）"
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
            "cn": "不同领域的许多人都做过这种观察，因此值得想想它为什么成立。"
          },
          {
            "en": "It could be because ambition is a phenomenon where almost all the error is in one direction — where almost all the shells that miss the target miss by falling short.",
            "cn": "也许是因为，关于抱负的误差几乎都朝同一个方向：几乎所有没打中目标的炮弹，都是因为射得不够远。"
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
            "cn": "虽然争取做到最好看起来像给自己加上重担，但实际上，最终往往是收益大于负担。"
          },
          {
            "en": "It's exciting, and also strangely liberating.",
            "cn": "它既令人兴奋，又有一种奇妙的解放感。"
          },
          {
            "en": "It simplifies things.",
            "cn": "它让事情变得简单。"
          },
          {
            "en": "In some ways it's easier to try to be the best than to try merely to be good.",
            "cn": "在某些方面，努力成为最好，反而比只求做得不错更容易。"
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
            "cn": "如果你做成了一个雄心勃勃的项目，你就不再是无名小卒；你就是那个把它做成的人。"
          },
          {
            "en": "So just do the work and your identity will take care of itself.",
            "cn": "所以，只管去做，你的身份自会随之确立。"
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
            "cn": "一旦承认自己在某件事上错了，你就自由了。"
          },
          {
            "en": "Till then you have to carry it. [ 13 ]",
            "cn": "在此之前，你都得背着那个错误。[13]"
          },
          {
            "en": "Another more subtle component of earnestness is informality.",
            "cn": "真诚还有一个更微妙的组成部分：不拘形式。"
          },
          {
            "en": "Informality is much more important than its grammatically negative name implies.",
            "cn": "它的重要性远超其字面上的“否定”意味所暗示的。"
          },
          {
            "en": "It's not merely the absence of something.",
            "cn": "它并不只是缺少某种东西。"
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
            "cn": "极客有一种天真而大胆的气质，这正是做出伟大成果所需要的。"
          },
          {
            "en": "It's not learned; it's preserved from childhood.",
            "cn": "它不是后来学会的，而是从童年保留下来的。"
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
            "cn": "两种真诚都可以。"
          },
          {
            "en": "But I doubt it would be possible to do great work without being earnest.",
            "cn": "但我怀疑，不真诚的人能否做出伟大的成果。"
          },
          {
            "en": "It's so hard to do even if you are.",
            "cn": "即使足够真诚，要做到这一点也已经很难了。"
          },
          {
            "en": "You don't have enough margin for error to accommodate the distortions introduced by being affected, intellectually dishonest, orthodox, fashionable, or cool. [ 14 ]",
            "cn": "你没有足够的容错空间，去承受矫揉造作、思想上的不诚实、墨守成规、追逐时尚或装酷所带来的扭曲。[14]"
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
            "cn": "这可能需要一些努力；当某件事需要重做时，维持现状的偏见和懒惰会联手，让你不愿承认这一点。"
          },
          {
            "en": "To beat this ask: If I'd already made the change, would I want to revert to what I have now?",
            "cn": "要克服它们，可以问自己：如果我已经做了这个改变，还会想改回现在的样子吗？"
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
            "cn": "如果用最一般的形式表达想法，它们的正确性会超出你原本设想的范围。"
          },
          {
            "en": "True by itself is not enough, of course.",
            "cn": "当然，仅仅正确还不够。"
          },
          {
            "en": "Great ideas have to be true and new.",
            "cn": "伟大的想法必须既正确，又新颖。"
          },
          {
            "en": "And it takes a certain amount of ability to see new ideas even once you've learned enough to get to one of the frontiers of knowledge.",
            "cn": "即使你已经学到某个知识领域的前沿，要发现新想法，仍然需要一定的能力。"
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
            "cn": "我一直不喜欢‘创作过程’这个说法。它似乎有误导性。",
            "alignedParts": [
              {
                "en": "I've never liked the term \"creative process.\"",
                "cn": "我一直不喜欢‘创作过程’这个说法。"
              },
              {
                "en": "It seems misleading.",
                "cn": "它似乎有误导性。"
              }
            ]
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
            "cn": "原创想法，并不是靠努力想着“我要有原创想法”而来的。"
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
            "cn": "但要获得这种好处，未必需要走很远。"
          },
          {
            "en": "Sometimes it's enough just to go for a walk. [ 16 ]",
            "cn": "有时，只要出去散个步就够了。[16]"
          },
          {
            "en": "It also helps to travel in topic space.",
            "cn": "在不同话题之间游历，也会有帮助。"
          },
          {
            "en": "You'll have more new ideas if you explore lots of different topics, partly because it gives the angle grinder more surface area to work on, and partly because analogies are an especially fruitful source of new ideas.",
            "cn": "探索许多不同的话题，会带来更多新想法；一方面，这给了“角磨机”更大的工作表面；另一方面，类比是新想法特别丰富的来源。"
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
            "cn": "你应该按照一种更接近幂律的方式分配注意力。"
          },
          {
            "en": "[ 17 ] Be professionally curious about a few topics and idly curious about many more.",
            "cn": "[17]对少数话题保持专业层面的好奇，对更多话题保持随意的好奇。"
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
            "cn": "当一个想法既新颖又显而易见时，它很可能是个好想法。"
          },
          {
            "en": "Seeing something obvious sounds easy.",
            "cn": "看见显而易见的东西，听起来很容易。"
          },
          {
            "en": "And yet empirically having new ideas is hard.",
            "cn": "然而，经验表明，产生新想法并不容易。"
          },
          {
            "en": "What's the source of this apparent contradiction?",
            "cn": "这种表面上的矛盾，究竟从何而来？"
          },
          {
            "en": "It's that seeing the new idea usually requires you to change the way you look at the world.",
            "cn": "原因在于，发现新想法通常要求你改变看待世界的方式。"
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
            "cn": "很少有人明白，需要多大程度地打破规则，因为新想法一旦成功，看起来就会保守得多。"
          },
          {
            "en": "They seem perfectly reasonable once you're using the new model of the world they brought with them.",
            "cn": "当你开始使用它们带来的新世界模型时，它们就显得完全合理了。"
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
            "cn": "一个被忽视的想法，往往直到半决赛才被淘汰。"
          },
          {
            "en": "You do see it, subconsciously, but then another part of your subconscious shoots it down because it would be too weird, too risky, too much work, too controversial.",
            "cn": "你的潜意识其实看见了它，但潜意识的另一部分又把它否决了，因为它太古怪、太冒险、太费力，或太有争议。"
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
            "cn": "你也可以反向寻找被忽视的想法：从遮蔽它们的东西入手。"
          },
          {
            "en": "Every cherished but mistaken principle is surrounded by a dead zone of valuable ideas that are unexplored because they contradict it.",
            "cn": "每一个受到珍视却错误的原则周围，都有一片有价值想法的空白地带；只因这些想法与它矛盾，就一直无人探索。"
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
            "cn": "不过，最常见的被忽视的问题，并不是那种明显已经过时的问题。"
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
            "cn": "新物种是如何产生的？"
          },
          {
            "en": "Is the force that makes objects fall to earth the same as the one that keeps planets in their orbits?",
            "cn": "让物体落向地球的力，和让行星保持在轨道上的力，是同一种力吗？"
          },
          {
            "en": "By even asking such questions you were already in excitingly novel territory.",
            "cn": "仅仅提出这样的问题，就已经进入了令人兴奋的全新领域。"
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
            "cn": "为人们创造产品时，不断做出新版本尤其有用：尽快把初版放到用户面前，再根据他们的反应改进。"
          },
          {
            "en": "Begin by trying the simplest thing that could possibly work.",
            "cn": "先尝试最简单、也有可能行得通的方案。"
          },
          {
            "en": "Surprisingly often, it does.",
            "cn": "出人意料的是，它往往真的行得通。"
          },
          {
            "en": "If it doesn't, this will at least get you started.",
            "cn": "即使不行，至少也能让你开始行动。"
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
            "cn": "说‘我们要先做甲，再做乙，最后做丙’，听起来比‘我们试试甲，看看会怎样’更有条理。它确实更有条理，只是效果没那么好。",
            "alignedParts": [
              {
                "en": "It sounds more organized to say \"we're going to do x and then y and then z\" than \"we're going to try x and see what happens.\"",
                "cn": "说‘我们要先做甲，再做乙，最后做丙’，听起来比‘我们试试甲，看看会怎样’更有条理。"
              },
              {
                "en": "And it is more organized ; it just doesn't work as well.",
                "cn": "它确实更有条理，只是效果没那么好。"
              }
            ]
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
            "cn": "年轻人往往拥有优势，却没有意识到。"
          },
          {
            "en": "The biggest is probably time.",
            "cn": "其中最大的优势，大概是时间。"
          },
          {
            "en": "The young have no idea how rich they are in time.",
            "cn": "年轻人不知道，自己在时间上有多富有。"
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
            "cn": "但不知道的东西，只是缺乏经验所带来问题的一半。"
          },
          {
            "en": "The other half is what you do know that ain't so.",
            "cn": "另一半，是那些你自以为知道、其实并不正确的东西。"
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
            "cn": "我们太习惯学校了，会不自觉地把上学等同于学习；但学校其实有各种奇怪的特征，扭曲着我们对学习和思考的认识。"
          },
          {
            "en": "For example, schools induce passivity.",
            "cn": "比如，学校会让人变得被动。"
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
            "cn": "这听起来可能有些牵强，但它不只是一个古怪的思想实验。"
          },
          {
            "en": "It's the truth economically, and in the best case it's the truth intellectually as well.",
            "cn": "从经济关系上说，这就是事实；在最理想的情况下，从知识学习的角度说也是如此。"
          },
          {
            "en": "The best teachers don't want to be your bosses.",
            "cn": "最好的老师并不想当你的老板。"
          },
          {
            "en": "They'd prefer it if you pushed ahead, using them as a source of advice, rather than being pulled by them through the material.",
            "cn": "他们更希望你主动前进，把他们当作建议的来源，而不是被他们拖着学完整套内容。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Schools also give you a misleading impression of what work is like.",
            "cn": "学校还会让你对工作的实际样子产生误解。"
          },
          {
            "en": "In school they tell you what the problems are, and they're almost always soluble using no more than you've been taught so far.",
            "cn": "在学校里，别人告诉你问题是什么，而这些问题几乎总能只用已经教过的知识解决。"
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
            "cn": "不要觉得自己必须依赖某个把关者，给你一个‘重大机会’。即使真是这样，获得机会的最好办法，也应是专心做好工作，而不是追逐有影响力的人。",
            "alignedParts": [
              {
                "en": "Don't think of yourself as dependent on some gatekeeper giving you a \"big break.\"",
                "cn": "不要觉得自己必须依赖某个把关者，给你一个‘重大机会’。"
              },
              {
                "en": "Even if this were true, the best way to get it would be to focus on doing good work rather than chasing influential people.",
                "cn": "即使真是这样，获得机会的最好办法，也应是专心做好工作，而不是追逐有影响力的人。"
              }
            ]
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
            "cn": "刚进入一个领域的人，常常会模仿已有的作品。"
          },
          {
            "en": "There's nothing inherently bad about that.",
            "cn": "这本身并没有什么不好。"
          },
          {
            "en": "There's no better way to learn how something works than by trying to reproduce it.",
            "cn": "想了解某样东西如何运作，没有比尝试复现它更好的方法。"
          },
          {
            "en": "Nor does copying necessarily make your work unoriginal.",
            "cn": "模仿也不一定意味着你的作品没有原创性。"
          },
          {
            "en": "Originality is the presence of new ideas, not the absence of old ones.",
            "cn": "原创性在于新想法的出现，而不在于旧想法的缺席。"
          },
          {
            "en": "There's a good way to copy and a bad way.",
            "cn": "模仿有好的方式，也有坏的方式。"
          },
          {
            "en": "If you're going to copy something, do it openly instead of furtively, or worse still, unconsciously.",
            "cn": "如果要模仿，就公开地模仿，不要偷偷摸摸，更不要在毫无察觉的情况下模仿。"
          },
          {
            "en": "This is what's meant by the famously misattributed phrase \"Great artists steal.\" The really dangerous kind of copying, the kind that gives copying a bad name, is the kind that's done without realizing it, because you're nothing more than a train running on tracks laid down by someone else.",
            "cn": "那句出处经常被误传的名言‘伟大的艺术家偷窃’，说的正是这个意思。真正危险、让模仿背上坏名声的，是无意识的模仿，因为那时你不过是一列在别人铺好的轨道上行驶的火车。",
            "alignedParts": [
              {
                "en": "This is what's meant by the famously misattributed phrase \"Great artists steal.\"",
                "cn": "那句出处经常被误传的名言‘伟大的艺术家偷窃’，说的正是这个意思。"
              },
              {
                "en": "The really dangerous kind of copying, the kind that gives copying a bad name, is the kind that's done without realizing it, because you're nothing more than a train running on tracks laid down by someone else.",
                "cn": "真正危险、让模仿背上坏名声的，是无意识的模仿，因为那时你不过是一列在别人铺好的轨道上行驶的火车。"
              }
            ]
          },
          {
            "en": "But at the other extreme, copying can be a sign of superiority rather than subordination. [ 25 ]",
            "cn": "但在另一个极端，模仿也可能是超越的表现，而不是从属的表现。[25]"
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
            "cn": "项目很少凭空产生。"
          },
          {
            "en": "They're usually a reaction to previous work.",
            "cn": "它们通常是对前人工作的某种回应。"
          },
          {
            "en": "When you're first starting out, you don't have any previous work; if you're going to react to something, it has to be someone else's.",
            "cn": "刚起步时，你还没有自己的旧作品；如果要回应什么，就只能回应别人的作品。"
          },
          {
            "en": "Once you're established, you can react to your own.",
            "cn": "一旦站稳脚跟，就可以回应你自己的作品了。"
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
            "cn": "你所欣赏的事物，有些特征其实是缺陷；它们是克服了这些缺陷才取得成功的。"
          },
          {
            "en": "Indeed, the features that are easiest to imitate are the most likely to be the flaws.",
            "cn": "事实上，最容易模仿的那些特征，最有可能恰恰就是缺陷。"
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
            "cn": "有些有才华的人很讨厌，这有时会让缺乏经验的人误以为，讨人厌是才华的一部分。"
          },
          {
            "en": "It isn't; being talented is merely how they get away with it.",
            "cn": "事实并非如此；才华只是让他们能够这样做而不受惩罚。"
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
            "cn": "如果你所在领域的许多顶尖人物聚集在同一个地方，去那里待一段时间通常是个好主意。"
          },
          {
            "en": "It will increase your ambition, and also, by showing you that these people are human, increase your self-confidence. [ 26 ]",
            "cn": "这会提升你的抱负，也会让你看到这些人同样是普通人，从而增强自信。[26]"
          },
          {
            "en": "If you're earnest you'll probably get a warmer welcome than you might expect.",
            "cn": "如果你足够真诚，受到的欢迎可能会比预期更热烈。"
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
            "cn": "很多项目无法独自完成；即使你做的项目可以独立完成，有人鼓励你、与你交流碰撞想法，也是好事。"
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
            "cn": "有一两个非常出色的同事，胜过整整一栋楼里都只是相当不错的同事。"
          },
          {
            "en": "In fact it's not merely better, but necessary, judging from history: the degree to which great work happens in clusters suggests that one's colleagues often make the difference between doing great work and not.",
            "cn": "事实上，看历史就知道，伟大工作往往成簇出现，这意味着同事往往是成败的关键。"
          },
          {
            "en": "How do you know when you have sufficiently good colleagues?",
            "cn": "怎样才知道你的同事已经足够优秀？"
          },
          {
            "en": "In my experience, when you do, you know.",
            "cn": "依我的经验，真有这样的同事时，你自己会知道。"
          },
          {
            "en": "Which means if you're unsure, you probably don't.",
            "cn": "这意味着如果你不确定，那你可能还没有。"
          },
          {
            "en": "But it may be possible to give a more concrete answer than that.",
            "cn": "不过，也许可以给出一个更具体的答案。"
          },
          {
            "en": "Here's an attempt: sufficiently good colleagues offer surprising insights.",
            "cn": "试着这样说：足够优秀的同事，会提出令你惊讶的见解。"
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
            "cn": "如果选择的是纯粹的工作，工作本身的困难就能成为避开日常生活烦恼的庇护所。"
          },
          {
            "en": "If this is escapism, it's a very productive form of it, and one that has been used by some of the greatest minds in history.",
            "cn": "如果这算逃避现实，那也是一种很有成效的逃避，历史上一些最伟大的头脑都曾采用过。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Morale compounds via work: high morale helps you do good work, which increases your morale and helps you do even better work.",
            "cn": "士气会通过工作产生复利：高士气帮助你做好工作，好工作又提高士气，让你做得更好。"
          },
          {
            "en": "But this cycle also operates in the other direction: if you're not doing good work, that can demoralize you and make it even harder to.",
            "cn": "但这个循环也会反向运转：工作做不好，会打击士气，让你更难做好工作。"
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
            "cn": "如果你是学者，受众可能是同行；如果你从事艺术，受众则可能是通常意义上的观众。"
          },
          {
            "en": "Either way it doesn't need to be big.",
            "cn": "无论哪种，受众都不必很多。"
          },
          {
            "en": "The value of an audience doesn't grow anything like linearly with its size.",
            "cn": "受众的价值，远不是随人数线性增长的。"
          },
          {
            "en": "Which is bad news if you're famous, but good news if you're just starting out, because it means a small but dedicated audience can be enough to sustain you.",
            "cn": "这对名人是坏消息，对刚起步的人却是好消息，因为一小群忠实的受众就可能足以支撑你。"
          },
          {
            "en": "If a handful of people genuinely love what you're doing, that's enough.",
            "cn": "只要有少数人真心热爱你做的事，就够了。"
          },
          {
            "en": "To the extent you can, avoid letting intermediaries come between you and your audience.",
            "cn": "尽可能避免让中间人隔在你和受众之间。"
          },
          {
            "en": "In some types of work this is inevitable, but it's so liberating to escape it that you might be better off switching to an adjacent type if that will let you go direct. [ 28 ]",
            "cn": "某些工作无法避免这种中间环节，但摆脱它是如此自由，以至于如果转到相邻类型的工作能让你直接面对受众，那可能反而更好。[28]"
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
            "cn": "归根结底，士气也有身体层面的基础。"
          },
          {
            "en": "You think with your body, so it's important to take care of it.",
            "cn": "你是在用身体思考，因此照顾好身体很重要。"
          },
          {
            "en": "That means exercising regularly, eating and sleeping well, and avoiding the more dangerous kinds of drugs.",
            "cn": "锻炼、睡眠、饮食、以及远离那些较危险的药物，都很重要。"
          },
          {
            "en": "Running and walking are particularly good forms of exercise because they're good for thinking. [ 29 ]",
            "cn": "跑步和散步尤其适合，因为它们有利于思考。[29]"
          },
          {
            "en": "People who do great work are not necessarily happier than everyone else, but they're happier than they'd be if they didn't.",
            "cn": "做出伟大成果的人，未必比所有其他人更快乐；但一定比他们自己没有做出成果时更快乐。"
          },
          {
            "en": "In fact, if you're smart and ambitious, it's dangerous not to be productive.",
            "cn": "事实上，如果你聪明而且有抱负，没有产出是危险的。"
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
            "cn": "你所尊重的人的意见，是有用的信号。"
          },
          {
            "en": "Fame, which is the opinion of a much larger group you might or might not respect, just adds noise.",
            "cn": "名声则是更大一群人的看法，你未必尊重这些人，它只会增加噪声。"
          },
          {
            "en": "The prestige of a type of work is at best a trailing indicator and sometimes completely mistaken.",
            "cn": "一类工作的声望，充其量只是滞后指标，有时甚至完全错误。"
          },
          {
            "en": "If you do anything well enough, you'll make it prestigious.",
            "cn": "任何事情，只要做得足够好，你就能让它获得声望。"
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
            "cn": "留意一下，“好奇心”这个词已经出现了多少次。"
          },
          {
            "en": "If you asked an oracle the secret to doing great work and the oracle replied with a single word, my bet would be on \"curiosity.\"",
            "cn": "如果你向神谕询问做出伟大成果的秘密，而它只回答一个词，我会押“好奇心”。"
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
            "cn": "好奇心是做出伟大成果的四个步骤的关键：它帮你选择领域，带你到达前沿，让你注意到缺口，并推动你探索这些缺口。"
          },
          {
            "en": "The whole process is a kind of dance with curiosity.",
            "cn": "整个过程，就像与好奇心共舞。"
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
            "cn": "做出伟大成果的因素，就是数学意义上的那些乘数：能力、兴趣、努力和运气。"
          },
          {
            "en": "Luck by definition you can't do anything about, so we can ignore that.",
            "cn": "运气按定义就是你无法控制的，所以可以先不考虑它。"
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
            "cn": "在所有不同类型的工作中，最适合你的那一种，很可能与你非常契合。"
          },
          {
            "en": "Probably a comically close match.",
            "cn": "甚至契合得让人觉得不可思议。"
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
            "cn": "尝试成为牛顿或莎士比亚，似乎太自负了。"
          },
          {
            "en": "It also seems hard; surely if you tried something like that, you'd fail.",
            "cn": "而且看起来太难；真去尝试，肯定会失败。"
          },
          {
            "en": "Presumably the calculation is rarely explicit.",
            "cn": "人们大概很少把这种权衡明确地想出来。"
          },
          {
            "en": "Few people consciously decide not to try to do great work.",
            "cn": "很少有人会有意识地决定，不去尝试做出伟大的成果。"
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
    ],
    "translationReview": "2026-09-26：按英文原句校正中英配对；保留原文与段落位置。"
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
      "sentenceCount": 184,
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
        "sentences": [
          {
            "en": "Rachel Weisz’s Autumn/Winter 2011 cover story for AnOther Magazine featured a Craig McDean shoot inspired by the actor’s favourite choreographer, published alongside a conversation between Weisz and Harland Miller",
            "cn": "瑞秋·怀兹为《AnOther》杂志拍摄的2011年秋冬封面专题，收录了克雷格·麦克迪恩拍摄的一组照片，灵感来自她最喜爱的编舞家，同时刊载了她与哈兰德·米勒的对谈。"
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
        "img": "assets/covers/people-rachel-weisz-archive-1.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398040.jpg"
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
            "cn": "当时我开着一辆黑色捷豹，艾拉悄悄问我能不能带上瑞秋；她自己开的是一辆退役的伦敦出租车，时速一超过五十英里就抖得厉害，让她很不好意思。"
          },
          {
            "en": "It was a slow convoy, but it was, as they say, the beginning of a beautiful friendship.",
            "cn": "那是一支缓慢的车队，但正如人们所说，这正是美好友谊的开端。"
          },
          {
            "en": "I recall a few coffee stops, the night ferry in between and then the morning sun flickering through the silver birch trees that Hitler had planted along the road to Berlin.",
            "cn": "我记得途中停下来喝过几次咖啡，中间坐了夜间渡轮，后来清晨的阳光透过通往柏林的路旁那些希特勒时期种下的银桦树，忽明忽暗地洒落。"
          }
        ],
        "sourceTag": "paragraph"
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
        "sentences": [
          {
            "en": "Harland Miller: Where were we?",
            "cn": "哈兰德·米勒：我们刚才说到哪儿了？"
          }
        ],
        "sourceTag": "paragraph"
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
            "cn": "‘我想，大多数人回顾自己的童年时都会想：呼！"
          },
          {
            "en": "I’m out of that!’ But of course, I grew up in a very nice house in Hampstead Garden Suburb, so what do I know?” – Rachel Weisz",
            "cn": "“我觉得大多数人都会回想起自己的童年，心想：‘呼！终于摆脱了！’但说实话，我在汉普斯特德花园郊区的一栋很不错的房子里长大，所以我又能懂什么呢？”——瑞秋·怀兹"
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
        "img": "assets/covers/people-rachel-weisz-archive-4.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398033.jpg"
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
        "img": "assets/covers/people-rachel-weisz-archive-5.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398032.jpg"
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
        "img": "assets/covers/people-rachel-weisz-archive-6.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398031.jpg"
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
        "sentences": [
          {
            "en": "HM: Well, in the loose semantics of “swing” that’s how I’d interpret “cutting out”, though I love it for that next line: “But my heart won’t buy it.” Because I’m not a fan of suicide.",
            "cn": "HM：嗯，从‘swing’这个词的宽泛含义来看，我会这样理解‘cutting out’，不过我喜欢它是因为下一句：‘但我的心不会接受。’因为我不赞成自杀。",
            "alignedParts": [
              {
                "en": "HM: Well, in the loose semantics of “swing” that’s how I’d interpret “cutting out”, though I love it for that next line: “But my heart won’t buy it.”",
                "cn": "HM：嗯，从‘swing’这个词的宽泛含义来看，我会这样理解‘cutting out’，不过我喜欢它是因为下一句：‘但我的心不会接受。’"
              },
              {
                "en": "Because I’m not a fan of suicide.",
                "cn": "因为我不赞成自杀。"
              }
            ]
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
            "cn": "HM：嗯，他递给我一支烟，我觉得自己在这里说的第一句话不该是‘不’。"
          },
          {
            "en": "And I got a rush like it was my first time – do you remember yours?",
            "cn": "而且我感觉就像第一次一样兴奋——你还记得你第一次吗？"
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
        "img": "assets/covers/people-rachel-weisz-archive-8.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398029.jpg"
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
        "img": "assets/covers/people-rachel-weisz-archive-9.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398028.jpg"
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
        "img": "assets/covers/people-rachel-weisz-archive-10.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398027.jpg"
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
            "cn": "（笑）说来也有趣，我爸爸昨天来参加亨利的五岁生日聚会，一进门就看到了那幅画；他是匈牙利人，于是开始大声念：‘It vas hell……’"
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
            "cn": "你通常会听到‘前拳击手’或‘前总统’，但‘前儿童’有趣的地方在于，只要熬过青春期，谁不都是个前儿童呢！"
          },
          {
            "en": "And I think most people look back on their childhood and think: “Phew!",
            "cn": "而且我觉得大多数人回想起自己的童年时都会想：“呼！终于熬过来了！”"
          },
          {
            "en": "I’m out of that!” But of course, I grew up in a very nice house in Hampstead Garden Suburb, so what do I know?",
            "cn": "我已经走出来了！’当然，我是在汉普斯特德花园郊区一栋很不错的房子里长大的，所以我又能懂多少呢？",
            "alignedParts": [
              {
                "en": "I’m out of that!”",
                "cn": "我已经走出来了！’"
              },
              {
                "en": "But of course, I grew up in a very nice house in Hampstead Garden Suburb, so what do I know?",
                "cn": "当然，我是在汉普斯特德花园郊区一栋很不错的房子里长大的，所以我又能懂多少呢？"
              }
            ]
          }
        ],
        "sourceTag": "paragraph"
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
        "img": "assets/covers/people-rachel-weisz-archive-11.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398026.jpg"
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
        "img": "assets/covers/people-rachel-weisz-archive-12.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398025.jpg"
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
            "cn": "不过有意思的是，布兰妮在唱那些日常话题——男生、感情之类——时，确实变得有些失控，不是吗？"
          },
          {
            "en": "Whereas Bowie, who was talking about marginal stuff, insanity and art, emerged as being quite savvy and together.",
            "cn": "而鲍伊，他谈论的是边缘话题、疯狂与艺术，却表现得相当精明且沉着。"
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
        "sentences": [
          {
            "en": "RW: Which brings me to your painting Incurable Romantic Seeks Dirty Filthy ... ?",
            "cn": "RW：这让我想到你的那幅画《无可救药的浪漫主义者寻找肮脏卑鄙的……》？"
          }
        ],
        "sourceTag": "paragraph"
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
        "img": "assets/covers/people-rachel-weisz-archive-14.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398023.jpg"
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
            "cn": "HM：这让人想到在乡间住着、养几只鸡的画面。"
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
        "img": "assets/covers/people-rachel-weisz-archive-15.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398022.jpg"
      },
      {
        "sentences": [
          {
            "en": "RW: That’s like that game where you ask: “If you were a novel what would you be?” And people say, “Oh yeah, I’d be Tolstoy.” Well, if I was a record, I’d be Beethoven [laughs].",
            "cn": "RW：这就像那个游戏，问你：‘如果你是一本小说，你会是哪一本？’人们会说：‘哦，我肯定选托尔斯泰。’那么，如果我是一张唱片，我会是贝多芬的作品（笑）。",
            "alignedParts": [
              {
                "en": "RW: That’s like that game where you ask: “If you were a novel what would you be?”",
                "cn": "RW：这就像那个游戏，问你：‘如果你是一本小说，你会是哪一本？’"
              },
              {
                "en": "And people say, “Oh yeah, I’d be Tolstoy.”",
                "cn": "人们会说：‘哦，我肯定选托尔斯泰。’"
              },
              {
                "en": "Well, if I was a record, I’d be Beethoven [laughs].",
                "cn": "那么，如果我是一张唱片，我会是贝多芬的作品（笑）。"
              }
            ]
          }
        ],
        "sourceTag": "paragraph"
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
        "img": "assets/covers/people-rachel-weisz-archive-16.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398021.jpg"
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
        "img": "assets/covers/people-rachel-weisz-archive-17.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398020.jpg"
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
            "cn": "一段关系的关键恰恰是不说话。’我当时就想，哇！",
            "alignedParts": [
              {
                "en": "A relationship is all about not speaking.”",
                "cn": "一段关系的关键恰恰是不说话。’"
              },
              {
                "en": "And I thought, wow!",
                "cn": "我当时就想，哇！"
              }
            ]
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
        "img": "assets/covers/people-rachel-weisz-archive-18.jpg",
        "alt": "Rachel Weisz · 图片",
        "cap": "Rachel Weisz for AnOther Magazine Autumn/Winter 2011 Photography by Craig McDean, Styling by Olivier Rizzo",
        "credit": "Craig McDean / AnOther Magazine",
        "sourceUrl": "https://images-prod.anothermag.com/1250/azure/another-prod/390/8/398019.jpg"
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
    ],
    "translationReview": "2026-09-26：局部校正译文串句，并核对显示句对。"
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
      "sentenceCount": 211,
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
            "cn": "鲍威尔：这是我第一次醒来时觉得：‘我有精神去锻炼，可外面天气真糟。’结果我又想：‘算了，我要躺在床上放松。’不过我挺好的。",
            "alignedParts": [
              {
                "en": "POWELL: This is the first time that I’ve woken up where I was like, “I got enough energy to work out and it’s gross outside.”",
                "cn": "鲍威尔：这是我第一次醒来时觉得：‘我有精神去锻炼，可外面天气真糟。’"
              },
              {
                "en": "But instead I was like, “No, I’m going to stay in bed and chill.”",
                "cn": "结果我又想：‘算了，我要躺在床上放松。’"
              },
              {
                "en": "I’m good though.",
                "cn": "不过我挺好的。"
              }
            ]
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
            "cn": "我们看完那部电影后，真的都在说：‘佐伊也太无所畏惧了。’简直不可思议。"
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
            "cn": "我们当时说：‘那根本不像同一个人。’真是太不可思议了。",
            "alignedParts": [
              {
                "en": "We were like, “That’s not the same person.”",
                "cn": "我们当时说：‘那根本不像同一个人。’"
              },
              {
                "en": "It was wild.",
                "cn": "真是太不可思议了。"
              }
            ]
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
            "cn": "多伊奇：不过，想象一下那个年纪的我，那已经是九年前或十年前了。"
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
            "cn": "我觉得制片人能做的最好的事，就是让演员——尤其是兼任制片人的演员——充分感受到：‘放心，这里有我们。’这样他们才能全身心投入角色。"
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
            "cn": "那就是你现在的角色。’这种角色转换挺尴尬的。",
            "alignedParts": [
              {
                "en": "That’s your role now.”",
                "cn": "那就是你现在的角色。’"
              },
              {
                "en": "That gear shift is awkward.",
                "cn": "这种角色转换挺尴尬的。"
              }
            ]
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
            "cn": "多伊奇：妈妈有次对我说：‘我一直觉得，拍电影又养着两个小宝宝时，一天下来，我要么是个好妈妈，要么是个好演员。"
          },
          {
            "en": "I was never both.” I know it’s different than having a child, but it sort of resonates.",
            "cn": "我从来没有同时做好这两件事。’我知道这和养孩子不同，但还是有些共鸣。",
            "alignedParts": [
              {
                "en": "I was never both.”",
                "cn": "我从来没有同时做好这两件事。’"
              },
              {
                "en": "I know it’s different than having a child, but it sort of resonates.",
                "cn": "我知道这和养孩子不同，但还是有些共鸣。"
              }
            ]
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
            "cn": "鲍威尔：我觉得你很了不起，能同时兼顾这么多事，对朋友很好，和家人也很亲近。"
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
            "cn": "多伊奇：能意识到这一点，已经很了不起了。"
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
            "cn": "我曾离家三个月，全神贯注地拍戏，回家后问她：‘你好吗？’她会说：‘我心里有怨气。",
            "alignedParts": [
              {
                "en": "I would come home after being gone for three months, laser focused on shooting, and I’d be like, “How are you?”",
                "cn": "我曾离家三个月，全神贯注地拍戏，回家后问她：‘你好吗？’"
              },
              {
                "en": "She’d be like, “I’m resentful.",
                "cn": "她会说：‘我心里有怨气。"
              }
            ]
          },
          {
            "en": "I needed you at times and you could’ve needed me.",
            "cn": "“有时候我需要你，而你也可能需要我。”"
          },
          {
            "en": "We’re supposed to just jump back in?” Obviously, these aren’t direct quotes.",
            "cn": "难道我们就应该立刻恢复原来的状态吗？’当然，这些并不是逐字引用。",
            "alignedParts": [
              {
                "en": "We’re supposed to just jump back in?”",
                "cn": "难道我们就应该立刻恢复原来的状态吗？’"
              },
              {
                "en": "Obviously, these aren’t direct quotes.",
                "cn": "当然，这些并不是逐字引用。"
              }
            ]
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
            "cn": "我一直在努力更好地兼顾这些事情，真正陪伴别人、给彼此留出空间，同时也设立界限、照顾自己。"
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
            "cn": "我见过一个例子：拍《壮志凌云》时，如果你对汤姆·克鲁斯说句好话，或为他做点什么，不管是什么，第二天就会在自己的休息拖车里看到一封感谢信。"
          },
          {
            "en": "And he’s doing all of it and starring in the movie.It’s that level of thoughtfulness that I’m trying to get to, where you don’t feel overwhelmed by any of this stuff.",
            "cn": "他一边做着这一切，一边还主演着电影。我想达到的，就是这种体贴周到的程度，同时又不会被这些事情压得喘不过气。"
          },
          {
            "en": "You can make it look easy, and you can be thoughtful, and you can be present, you can be a good partner to everyone around you.",
            "cn": "你可以让一切看起来毫不费力，同时保持体贴、专注，成为身边每个人的良伴。"
          },
          {
            "en": "Everybody just wants your time a little bit more, and you just don’t have as much time, and you just have to be deliberate about what you quiet, and what you silence, and what you give your attention to, and what matters.” It’s a hard thing, especially with the pace that you’ve been going recently, to probably quiet anything because there’s just no time.",
            "cn": "每个人都想多占一点你的时间，可你的时间却更少了；你必须有意识地决定，哪些事先放一放、哪些声音先屏蔽，把注意力留给什么，什么才重要。’这很难，尤其按你最近的忙碌节奏，想让任何事情安静下来恐怕都很难，因为实在没有时间。",
            "alignedParts": [
              {
                "en": "Everybody just wants your time a little bit more, and you just don’t have as much time, and you just have to be deliberate about what you quiet, and what you silence, and what you give your attention to, and what matters.”",
                "cn": "每个人都想多占一点你的时间，可你的时间却更少了；你必须有意识地决定，哪些事先放一放、哪些声音先屏蔽，把注意力留给什么，什么才重要。’"
              },
              {
                "en": "It’s a hard thing, especially with the pace that you’ve been going recently, to probably quiet anything because there’s just no time.",
                "cn": "这很难，尤其按你最近的忙碌节奏，想让任何事情安静下来恐怕都很难，因为实在没有时间。"
              }
            ]
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
            "cn": "鲍威尔：哇，佐伊，这真是一次很棒的心理疏导。"
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
            "cn": "多伊奇：是的，确实如此。"
          },
          {
            "en": "And it started because of us, actually this one.",
            "cn": "而且实际上，这部电影的启动正是因为我们。"
          },
          {
            "en": "About four years ago, when Set It Up came out, I know you remember this, Reese Witherspoon tweeted that she saw our movie, and she loved it, and wondered why aren’t there more great feel good romantic movies?",
            "cn": "大约四年前，《Set It Up》上映时——我知道你还记得——瑞茜·威瑟斯彭发推说她看了我们的电影，非常喜欢，还问为什么不能多一些这样令人愉快的浪漫电影。"
          },
          {
            "en": "And again, remember, and this is not to toot our own horn, when Set It Up came out, there was not a single rom-com on the scene.",
            "cn": "而且，记住，这不是我们自夸：《Set It Up》上映时，市面上根本没有什么浪漫喜剧。"
          },
          {
            "en": "Nobody was making rom-coms, nobody wanted to, it was a dirty word, a dirty genre.",
            "cn": "没有人拍浪漫喜剧，也没有人愿意拍，那是个不光彩的词，一个不光彩的类型。"
          },
          {
            "en": "Set It Up came out, was an accidental huge hit for Netflix.",
            "cn": "《Set It Up》上映后，意外成为Netflix的一部大热作品。"
          },
          {
            "en": "A couple weeks after, they were like, “Want to go to New York and do press?” We’re on talk shows and there’s billboards in Times Square and we’re like, “This doesn’t feel normal for a movie after it came out to get this huge push.” After that, it spawned this renaissance of the rom-com.",
            "cn": "几周后，他们问：‘想去纽约做宣传吗？’我们上了谈话节目，时代广场也挂起广告牌，我们心想：‘一部电影上映后才得到这么大力度的推广，这可不常见。’在那之后，它带起了一股浪漫喜剧复兴的潮流。",
            "alignedParts": [
              {
                "en": "A couple weeks after, they were like, “Want to go to New York and do press?”",
                "cn": "几周后，他们问：‘想去纽约做宣传吗？’"
              },
              {
                "en": "We’re on talk shows and there’s billboards in Times Square and we’re like, “This doesn’t feel normal for a movie after it came out to get this huge push.”",
                "cn": "我们上了谈话节目，时代广场也挂起广告牌，我们心想：‘一部电影上映后才得到这么大力度的推广，这可不常见。’"
              },
              {
                "en": "After that, it spawned this renaissance of the rom-com.",
                "cn": "在那之后，它带起了一股浪漫喜剧复兴的潮流。"
              }
            ]
          },
          {
            "en": "And anyway, Reese tweeted she loved it, and that spurred a conversation between her and I, and her company Hello Sunshine, how do we make something that makes people feel good?",
            "cn": "总之，瑞茜在推特上表示她很喜欢这部电影，这促使她和我以及她的公司“阳光灿烂”展开了一次对话：我们该如何打造一部能让人们心情愉悦的作品呢？"
          },
          {
            "en": "Something From Tiffany’s , from my perspective, is less rom-com and more romantic holiday.",
            "cn": "在我看来，《Something From Tiffany’s》与其说是浪漫喜剧，不如说更像一部浪漫的节日电影。"
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
            "cn": "鲍威尔：我当时就抱着电视，哭得稀里哗啦，然后来参加了这次采访。"
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
            "en": "Production: Krista Worby",
            "cn": "制作：克里斯塔·沃比"
          }
        ],
        "sourceTag": "paragraph"
      }
    ],
    "translationReview": "2026-09-26：局部校正译文串句，并核对显示句对。"
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
      "sentenceCount": 187,
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
            "cn": "在喧嚣中心，她静静地怀抱一只雪白的鸽子，身穿亚历山大·麦昆的和服式连衣裙，美得空灵；裙子如此轻薄，雪白的肌肤在裙下若隐若现。她就是好莱坞的新宠——刚刚公布的下一位邦女郎，蕾雅·赛杜……"
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
            "cn": "不过很有趣，瑞秋——也就是克雷格的妻子——也演了那部电影，还有本·威士肖和我，所以它与《007》有不少联系。"
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
            "cn": "LS：两种我都喜欢，但能和才华出众的人一起参与这样的大型国际项目，确实让人非常兴奋。"
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
      }
    ],
    "translationReview": "2026-09-26：局部校正译文串句，并核对显示句对。"
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
        "img": "assets/covers/people-eva-green-tim-burton-1.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ebe3d613c03e1eb6b4_0816.cover_.lo_digital.jpg"
      },
      {
        "sentences": [
          {
            "en": "Eva Green, who has the pale complexion, black hair, and haunted eyes of a goth princess, would prefer not to be thought of as a supernatural creature with evil powers and the ability to conjure the dead.",
            "cn": "伊娃·格林有着哥特公主般苍白的肤色、乌黑的头发和幽邃的眼神，但她并不希望被人当成一个拥有邪恶力量、能够召唤亡灵的超自然生物。"
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
            "cn": "佩雷格林小姐会为了他们杀人。’格林露出一个略带邪气、心照不宣的微笑。",
            "alignedParts": [
              {
                "en": "Miss Peregrine will kill for them.”",
                "cn": "佩雷格林小姐会为了他们杀人。’"
              },
              {
                "en": "Green smiled in a slightly wicked, knowing way.",
                "cn": "格林露出一个略带邪气、心照不宣的微笑。"
              }
            ]
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
        "img": "assets/covers/people-eva-green-tim-burton-2.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ecd3b7a5db18f3afdc_0816.w.MM_.eva_.lo30_View-copyRBG.jpg"
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
        "img": "assets/covers/people-eva-green-tim-burton-3.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ede3d613c03e1eb6b6_0816.w.MM_.eva_.lo30_View2-copy.jpg"
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
            "cn": "我僵住了。’她青春期迷恋的演员，还包括《闪灵》中的杰克·尼科尔森和《巴黎最后的探戈》中的马龙·白兰度。",
            "alignedParts": [
              {
                "en": "I was paralyzed.”",
                "cn": "我僵住了。’"
              },
              {
                "en": "Among her teenage crushes were Jack Nicholson in The Shining and Marlon Brando in Last Tango in Paris.",
                "cn": "她青春期迷恋的演员，还包括《闪灵》中的杰克·尼科尔森和《巴黎最后的探戈》中的马龙·白兰度。"
              }
            ]
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
            "cn": "格林在高中学习戏剧；2003年，在出演数部法国舞台剧并获得莫里哀奖提名后，她颇为机缘巧合地在贝托鲁奇的《The Dreamers》中完成了电影首秀。"
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
        "img": "assets/covers/people-eva-green-tim-burton-4.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ee57dfc3b0230f799d_0816.w.MM_.eva_.lo30_View3-copy.jpg"
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
            "cn": "‘他们最初找到我时，我以为就是让我穿着比基尼、美美地出场，所以说自己不去试镜。"
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
            "cn": "‘而在《Casino Royale》里，我得死去。"
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
        "img": "assets/covers/people-eva-green-tim-burton-5.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370ef9c190ec57ac08222_0816.w.MM_.eva_.lo30_View4.jpg"
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
        "img": "assets/covers/people-eva-green-tim-burton-6.jpg",
        "alt": "Eva Green · 图片",
        "cap": "",
        "credit": "W Magazine",
        "sourceUrl": "https://imgix.bustle.com/wmag/2016/12/16/585370f06666b2eb4762d319_0816.w.MM_.eva_.lo30_View5-copy-copy_RGB.jpg"
      },
      {
        "sentences": [
          {
            "en": "While Burton remained largely faithful to the plot, he did not adhere to Riggs’s rather geriatric depiction of Miss Peregrine.",
            "cn": "虽然伯顿大体上忠于情节，却没有照搬里格斯把佩雷格林小姐描绘得相当年迈的设定。"
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
    ],
    "translationReview": "2026-09-26：局部校正译文串句，并核对显示句对。"
  },
  {
    "id": "fb-marcus-rashford-the-number-9",
    "cat": "足球",
    "pin": true,
    "title": "The Number 9",
    "titleZh": "9号",
    "source": "The Players' Tribune · 2017-03-19",
    "date": "2017-03-19",
    "minutes": 13,
    "url": "https://www.theplayerstribune.com/articles/marcus-rashford-england-national-team",
    "coverImg": "assets/covers/fb-marcus-rashford-the-number-9.jpg",
    "player": "Marcus Rashford",
    "playerZh": "马库斯·拉什福德",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "Growing up in Manchester, my family had a little competition going on.",
            "cn": "我在曼彻斯特长大，那时候家里一直有个小小的较劲。",
            "cnEdited": true
          },
          {
            "en": "Whenever they were buying me a gift for my birthday or for Christmas or whatever, they always knew the easy thing to get me.",
            "cn": "每当他们要给我买生日礼物、圣诞礼物或者随便什么礼物，他们都很清楚送我什么最省事。",
            "cnEdited": true
          },
          {
            "en": "The latest football kit.",
            "cn": "最新款的足球服。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But coming from Manchester, families can be…",
            "cn": "但生在曼彻斯特，一家人也可能……",
            "cnEdited": true
          },
          {
            "en": "divided.",
            "cn": "分成两派。",
            "cnEdited": true
          },
          {
            "en": "At least mine was.",
            "cn": "至少我家就是这样。",
            "cnEdited": true
          },
          {
            "en": "Half my family were United supporters and the other half were City.",
            "cn": "我家一半人是曼联球迷，另一半是曼城球迷。",
            "cnEdited": true
          },
          {
            "en": "So these kits were more than gifts, you know what I mean?",
            "cn": "所以这些球服对我不只是礼物，你懂我的意思吧？",
            "cnEdited": true
          },
          {
            "en": "Especially as I got older and I kept getting better at football, my uncles would buy me the newest red or blue kits to try to bring me over to their side.",
            "cn": "尤其是我越长越大、球越踢越好之后，叔叔们就买最新款的红色或蓝色球服给我，想把我拉到他们那边去。",
            "cnEdited": true
          },
          {
            "en": "It was a bit of a running joke in our family.",
            "cn": "这在我们家算是个百玩不腻的老玩笑。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But there was one kit that I will never forget getting, and it wasn’t United or City.",
            "cn": "但有一件球服我永远不会忘，它既不是曼联的，也不是曼城的。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One night, I came home after a kickabout with my brothers out front.",
            "cn": "一天晚上，我和兄弟们在家门口踢完球回来。",
            "cnEdited": true
          },
          {
            "en": "My uncle was over and he had something for me.",
            "cn": "叔叔正好在我们家，他带了样东西给我。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another football top.",
            "cn": "又是一件足球上衣。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another red football top – he was United all the way.",
            "cn": "又是一件红色的足球上衣——他是彻头彻尾的曼联球迷。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I took it from him and looked at it.",
            "cn": "我从他手里接过来，看了起来。",
            "cnEdited": true
          },
          {
            "en": "And that was when I realized that this one was different.",
            "cn": "就在那一刻我意识到，这件和以前的不一样。",
            "cnEdited": true
          },
          {
            "en": "On the top left of the chest was a crest with three lions and one gold star.",
            "cn": "左胸上是一枚队徽：三狮，外加一颗金星。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "My first England shirt.",
            "cn": "我的第一件英格兰球衣。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I flipped it over to see if it had a number on the back.",
            "cn": "我把它翻过来，看看背面有没有号码。",
            "cnEdited": true
          },
          {
            "en": "(That was always a big deal.)",
            "cn": "（这向来是件大事。）",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And just above that….",
            "cn": "就在号码上方……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "ROONEY",
            "cn": "鲁尼",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was too young to appreciate the England teams of the’90s — guys like Alan Shearer, Teddy Sheringham — so for me, it was all about Rooney.",
            "cn": "90年代的那支英格兰队——阿兰·希勒、泰迪·谢林汉姆他们——我太小了，还谈不上欣赏；对我而言，一切就是鲁尼。",
            "cnEdited": true
          },
          {
            "en": "My earliest memories of the England team are of him and Michael Owen up front together.",
            "cn": "我对英格兰队最早的记忆，就是他和迈克尔·欧文一起顶在最前面。",
            "cnEdited": true
          },
          {
            "en": "Me and my brothers, Dwaine and Dane, would always sit down to watch the England games together.",
            "cn": "我和两个哥哥德韦恩、戴恩，总会坐在一起看英格兰的比赛。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And then, when I was about eight years old my uncle gave me that Rooney kit.",
            "cn": "后来，在我八岁左右那年，叔叔把那件鲁尼球衣给了我。",
            "cnEdited": true
          },
          {
            "en": "As every kid does, when you’re having a kickabout and you’ve got someone’s name on your back, you just try to follow in their footsteps.",
            "cn": "每个孩子都一样：踢球的时候背上印着谁的名字，你就会想沿着谁的脚印走下去。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was a striker, so from that day, I wanted to be just like Rooney.",
            "cn": "我踢的是前锋，所以从那天起，我就想变得跟鲁尼一样。",
            "cnEdited": true
          },
          {
            "en": "And I wanted to play for England.",
            "cn": "也想为英格兰队踢球。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But here’s the other thing about where we grew up in Manchester: The park where we’d all play was on the other side of this busy main road.",
            "cn": "不过，关于我们在曼彻斯特长大的那地方，还有另一件事：我们常去踢球的公园，在一条车来车往的大马路对面。",
            "cnEdited": true
          },
          {
            "en": "And if Dane and Dwaine had already left, my mum would never let me go out alone to cross the road and join them.",
            "cn": "要是戴恩和德韦恩已经先走了，妈妈绝不会让我一个人过马路去找他们。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“You’ll just have to wait here, Marcus,” she’d tell me.",
            "cn": "“那你就在这儿等着吧，马库斯，”她会这么跟我说。",
            "cnEdited": true
          },
          {
            "en": "“ Wait here.”",
            "cn": "“就在这儿等着。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "She wasn’t having it.",
            "cn": "她绝不松口。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Park or no park, it didn’t stop me playing.",
            "cn": "去得了公园也好，去不了也罢，都拦不住我踢球。",
            "cnEdited": true
          },
          {
            "en": "I had this one special football at home with my name in permanent marker on it.",
            "cn": "我在家里有个专属的足球，上面用记号笔写着我的名字。",
            "cnEdited": true
          },
          {
            "en": "I’d just kick it off the walls in my room or down the hallway.",
            "cn": "我就在自己房间里对着墙踢，要么就在走廊里一路踢过去。",
            "cnEdited": true
          },
          {
            "en": "Wherever I could, it didn’t matter.",
            "cn": "哪里能踢就在哪踢，无所谓。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The days I could go to the park with my big brothers were the best, though.",
            "cn": "不过，能跟哥哥们一起去公园的日子才是最棒的。",
            "cnEdited": true
          },
          {
            "en": "I loved competing against the older boys.",
            "cn": "我最喜欢跟大孩子们较量。",
            "cnEdited": true
          },
          {
            "en": "Sometimes, we’d have games out on the green in front of our council estate.",
            "cn": "有时，我们就在公屋前的那片草坪上开赛。",
            "cnEdited": true
          },
          {
            "en": "It was surrounded by houses, so it was cool because we knew that we could always show up at the green and know there’d always be a few kids playing.",
            "cn": "草坪四周都是房子，这样很棒——我们知道无论什么时候去，那里总有几个孩子在踢球。",
            "cnEdited": true
          },
          {
            "en": "We’d even be outside on grey, rainy days — which in Manchester is the majority of the time.",
            "cn": "阴沉沉的下雨天我们也照样在外面——在曼彻斯特，这种天才是常态。",
            "cnEdited": true
          },
          {
            "en": "But in our imaginations, we were Rooney, or Owen, or Rio playing at Wembley for England.",
            "cn": "可在想象里，我们是鲁尼、欧文，或者里奥，正在温布利为英格兰出场。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "These dreams of playing football bonded us together, you know?",
            "cn": "这些踢球的梦把我们绑在了一起，你懂吗？",
            "cnEdited": true
          },
          {
            "en": "Playing out in the garden together, that’s something that lasts a long time.",
            "cn": "一起在院子里踢球——这种东西能留很久。",
            "cnEdited": true
          },
          {
            "en": "The boys from that neighborhood, we’re all still mates — even after some of us got scouted and left for academies, after I left for Manchester United.",
            "cn": "那个街区一起踢球的男孩，到今天都还是哥们儿——哪怕后来有人被球探看中、离开去了青训学院，哪怕我去了曼联。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A lot of people think I came out of nowhere.",
            "cn": "很多人觉得我是凭空冒出来的。",
            "cnEdited": true
          },
          {
            "en": "And to be honest, this past year has gone by so quickly that I still can’t believe it myself sometimes.",
            "cn": "说实话，过去这一年快得不真实，有时连我自己都不敢相信。",
            "cnEdited": true
          },
          {
            "en": "One day during training with United last season, my teammates told me that I’d been selected for the national team to go to Euro 2016.",
            "cn": "上赛季在曼联训练的一天，队友告诉我，我入选了国家队，要去打2016年欧洲杯。",
            "cnEdited": true
          },
          {
            "en": "I literally didn’t believe it.",
            "cn": "我压根没信。",
            "cnEdited": true
          },
          {
            "en": "I thought they were joking.",
            "cn": "我以为他们在开玩笑。",
            "cnEdited": true
          },
          {
            "en": "I’d only just made my debut for Manchester United a few months before.",
            "cn": "毕竟就在几个月前，我才刚完成在曼联的首秀。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Phil Jones came up to me as we were heading into the changing rooms and said, “I’m tellin’ ya mate, you’re going to France.”",
            "cn": "正要进更衣室的时候，菲尔·琼斯凑到我跟前说：“我跟你说啊哥们儿，你要去法国了。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As I made my way into the building, some of the staff were telling me the same thing.",
            "cn": "往楼里走的时候，几个工作人员也在跟我说同样的话。",
            "cnEdited": true
          },
          {
            "en": "When I got my mobile phone out of my locker, there were messages from my friends, my brothers, my mum, all saying the same thing: England!!!!!!!!!!!!!",
            "cn": "从储物柜里拿出手机，朋友、哥哥们、妈妈发来的消息全是同一句话：英格兰！！！！！！！！！！",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "At that point, I was buzzing, but still kind of confused.",
            "cn": "那时候我已经乐疯了，但还是有点发懵。",
            "cnEdited": true
          },
          {
            "en": "And then my manager at the time, Louis van Gaal, walked up to me.",
            "cn": "这时，时任主教练路易斯·范加尔朝我走了过来。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Quick word?”",
            "cn": "“说两句？”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I didn’t know what to think.",
            "cn": "我心里一片茫然。",
            "cnEdited": true
          },
          {
            "en": "I mean, I had expected to play with the under-21s, but what he told me was massive.",
            "cn": "我是说，我本来以为是要跟U21队去，但他告诉我这件事完全不是一个量级。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“The national team phoned,” he said.",
            "cn": "“国家队来电话了，”他说。",
            "cnEdited": true
          },
          {
            "en": "“Go and enjoy yourself.”",
            "cn": "“去享受吧。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That was it.",
            "cn": "就这一句。",
            "cnEdited": true
          },
          {
            "en": "I was going to France.",
            "cn": "我要去法国了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "All the days (and nights) leading up to your England debut, you can’t stop trying to imagine what it’s going to be like.",
            "cn": "在英格兰首秀到来之前的那些白天（和夜晚），你会忍不住一直去想，那到底会是什么样子。",
            "cnEdited": true
          },
          {
            "en": "You play it through in your head over and over again.",
            "cn": "你会在脑子里一遍又一遍地预演。",
            "cnEdited": true
          },
          {
            "en": "You think about the pitch.",
            "cn": "你会想到那片球场。",
            "cnEdited": true
          },
          {
            "en": "You think about walking into the changing room.",
            "cn": "会想到走进更衣室的样子。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But whatever you expect, it’s never going to be like that.",
            "cn": "但无论你怎么设想，真实的那天都不会是你想的那样。",
            "cnEdited": true
          },
          {
            "en": "It’s never going to be like how you dreamed.",
            "cn": "永远不会和你梦里的相同。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s so much better than that.",
            "cn": "它比梦里好太多了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I walked into the changing room for our friendly against Australia last May and saw all the shirts hanging up at each of the lockers.",
            "cn": "去年五月，对澳大利亚的热身赛，我走进更衣室，看到每个储物柜前都挂着球衣。",
            "cnEdited": true
          },
          {
            "en": "I remember looking around for mine…",
            "cn": "我记得自己四下找着我的那件……",
            "cnEdited": true
          },
          {
            "en": "and then I saw it.",
            "cn": "然后，我看见了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Red football top.",
            "cn": "红色的足球上衣。",
            "cnEdited": true
          },
          {
            "en": "With a crest on the left chest.",
            "cn": "左胸一枚队徽。",
            "cnEdited": true
          },
          {
            "en": "Three lions.",
            "cn": "三狮。",
            "cnEdited": true
          },
          {
            "en": "One gold star.",
            "cn": "一颗金星。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Man.",
            "cn": "我的天。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I flipped it around.",
            "cn": "我把它翻了过来。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And just above that….",
            "cn": "就在号码上方……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "RASHFORD",
            "cn": "拉什福德",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I kind of laughed and said to myself like, No more dreaming now.",
            "cn": "我差点笑出来，心里跟自己说：现在不用再做梦了。",
            "cnEdited": true
          },
          {
            "en": "You’re playing for England.",
            "cn": "你在为英格兰队踢球了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Three minutes into the match, I scored my first England goal.",
            "cn": "开场三分钟，我打进了我的第一个英格兰队进球。",
            "cnEdited": true
          },
          {
            "en": "How can I describe that?",
            "cn": "那种感觉该怎么形容？",
            "cnEdited": true
          },
          {
            "en": "This is going to be impossible.",
            "cn": "我看是形容不出来了。",
            "cnEdited": true
          },
          {
            "en": "It’s like….",
            "cn": "就像是……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As soon as the ball goes in the back of the net, it’s like something goes off in your head.",
            "cn": "皮球一钻进网窝，你脑子里就像有什么东西炸开了一样。",
            "cnEdited": true
          },
          {
            "en": "It’s a moment you hold on to, but at the same time, as soon as you’ve done it once, you just want to do it again and again and again.",
            "cn": "那一刻你会一直攥在手心，可与此同时，只要进过一次，你就会想再来一次、再一次、一次又一次。",
            "cnEdited": true
          },
          {
            "en": "You crave the feeling.",
            "cn": "你会渴望那种感觉。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "At the start of the second half, there was another moment I’ll never forget.",
            "cn": "下半场刚开始，又有了一个我永远忘不了的时刻。",
            "cnEdited": true
          },
          {
            "en": "Number 19 got subbed into the match, and all of a sudden I was sharing the pitch with Rooney…",
            "cn": "19号替补登场，忽然之间，我就和鲁尼同场竞技了……",
            "cnEdited": true
          },
          {
            "en": "for England.",
            "cn": "代表英格兰。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Massive.",
            "cn": "意义太大了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m even on the pitch when he scores our second goal.",
            "cn": "我们第二球破门的时候，我甚至就在场上。",
            "cnEdited": true
          },
          {
            "en": "I’m not out on the green at the council estate, or watching England on telly.",
            "cn": "我不是在公屋区的草坪上，也不是在电视机前看英格兰。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’m right next to him.",
            "cn": "我就站在他旁边。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That was special.",
            "cn": "那真的太特别了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I know the comparisons that have been made between the two of us.",
            "cn": "我知道人们拿我们俩作过的比较。",
            "cnEdited": true
          },
          {
            "en": "I know the expectations that people have of me.",
            "cn": "我知道人们对我抱着怎样的期望。",
            "cnEdited": true
          },
          {
            "en": "For me, I’m just focused on improving my game however I can.",
            "cn": "对我来说，我只专注于一件事：用一切办法提高自己的球技。",
            "cnEdited": true
          },
          {
            "en": "And being around Wayne and training with him has been massive for that.",
            "cn": "而能待在韦恩身边、跟他一起训练，对此帮助巨大。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He speaks to me a lot about the game — the positions he’s been in, the situations he’s had to deal with.",
            "cn": "关于比赛，他常跟我聊——聊他踢过的位置，聊他应对过的局面。",
            "cnEdited": true
          },
          {
            "en": "I first met Wayne after my debut for United.",
            "cn": "我第一次见韦恩，是在我完成曼联首秀之后。",
            "cnEdited": true
          },
          {
            "en": "He was injured at the time, but he came into the changing room after the game, walked straight up to me and said congratulations.",
            "cn": "他当时正伤着，可赛后还是来到更衣室，径直走到我跟前，说了声祝贺。",
            "cnEdited": true
          },
          {
            "en": "It may seem like a small thing, but it wasn’t.",
            "cn": "这听起来像件小事，但它不是。",
            "cnEdited": true
          },
          {
            "en": "It meant a lot to me.",
            "cn": "它对我意义重大。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And honestly, that’s how it’s been with Wayne.",
            "cn": "说实话，跟韦恩相处一直是这样。",
            "cnEdited": true
          },
          {
            "en": "He’s just a really relaxed guy.",
            "cn": "他就是个特别放松随意的人。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Just go out and play,” he’ll tell me.",
            "cn": "“上场去踢就行，”他这样跟我说。",
            "cnEdited": true
          },
          {
            "en": "“Don’t feel nervous.",
            "cn": "“别紧张。",
            "cnEdited": true
          },
          {
            "en": "Play your own game and feel free on the pitch.”",
            "cn": "踢你自己的球，在场上自在地发挥。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And that’s Wayne.",
            "cn": "韦恩就是这样。",
            "cnEdited": true
          },
          {
            "en": "You’re not necessarily going to get a big speech.",
            "cn": "他不一定会给你来一段长篇讲话。",
            "cnEdited": true
          },
          {
            "en": "But he’s been through so much that he knows exactly what’s needed at the time.",
            "cn": "但他经历过太多，所以确切知道当下需要什么。",
            "cnEdited": true
          },
          {
            "en": "When we were knocked out by Iceland at Euros, it was a massive disappointment.",
            "cn": "欧洲杯上被冰岛淘汰那回，大家都失望透顶。",
            "cnEdited": true
          },
          {
            "en": "We were all sitting around in the dressing room after the match, not sure what to think.",
            "cn": "赛后大家坐在更衣室里，谁也不知道该怎么想。",
            "cnEdited": true
          },
          {
            "en": "But then Wayne gets up.",
            "cn": "可就在这时，韦恩站了起来。",
            "cnEdited": true
          },
          {
            "en": "And he says one thing.",
            "cn": "他说了一句话。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Keep your head up.",
            "cn": "“把头抬起来。",
            "cnEdited": true
          },
          {
            "en": "We’ve got a lot to fight for in the future.”",
            "cn": "未来还有很多值得我们去拼的东西。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But he says it to each individual person.",
            "cn": "而且他是把这句话说给每一个人听。",
            "cnEdited": true
          },
          {
            "en": "One by one, he goes up to us and looks us in the eye.",
            "cn": "他一个一个走到我们面前，看着我们的眼睛。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Keep your head up.",
            "cn": "“把头抬起来。",
            "cnEdited": true
          },
          {
            "en": "Look forward.”",
            "cn": "向前看。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So that’s where we are now.",
            "cn": "所以，这就是我们现在的状态。",
            "cnEdited": true
          },
          {
            "en": "Our heads are up and we’re fighting for the future.",
            "cn": "我们抬着头，为未来而战。",
            "cnEdited": true
          },
          {
            "en": "I know I’m young — the whole squad is quite young — but we want to make history in the time we’ve got.",
            "cn": "我知道自己还年轻——整支队伍都很年轻——但我们要用拥有的这段时间去创造历史。",
            "cnEdited": true
          },
          {
            "en": "We know that when people look back on our team, it’s the trophies that they are going to judge us on.",
            "cn": "我们知道，将来人们回看我们这支球队时，评判我们的将是奖杯。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So it’s important that we bring pride back to our country.",
            "cn": "所以，把骄傲重新带回这个国家，对我们来说很重要。",
            "cnEdited": true
          },
          {
            "en": "We know that’s what supporters have been waiting for as well.",
            "cn": "我们也知道，球迷们等的就是这个。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’ve already gone through obstacles myself.",
            "cn": "我自己也已经翻越过一道坎了。",
            "cnEdited": true
          },
          {
            "en": "I didn’t get the call-up for the first World Cup qualifier.",
            "cn": "第一场世界杯预选赛，我没被征召。",
            "cnEdited": true
          },
          {
            "en": "But you expect obstacles and you have to get past them – I scored a hat-trick for the Under-21s that week.",
            "cn": "但挫折本来就该在预料之中，你必须迈过去——那一周，我在U21队上演了帽子戏法。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "My head’s up.",
            "cn": "我抬着头。",
            "cnEdited": true
          },
          {
            "en": "I’m looking forward.",
            "cn": "我向前看。",
            "cnEdited": true
          },
          {
            "en": "And I can’t wait to play away in Germany and then get to Wembley for our first home match — and first World Cup qualifier — of the year.",
            "cn": "我已经等不及要在德国打客场，然后再到温布利，打我们今年的第一个主场——也是今年的第一场世界杯预选赛。",
            "cnEdited": true
          },
          {
            "en": "As a kid, I never got to go to a match at Wembley.",
            "cn": "小时候，我从没能去温布利看一场比赛。",
            "cnEdited": true
          },
          {
            "en": "I only saw it on the TV in my mum’s house.",
            "cn": "我只在妈妈家的电视上看过它。",
            "cnEdited": true
          },
          {
            "en": "Just like I dreamed of the day I’d get to play for England, I dreamed of the day I’d get to play at Wembley.",
            "cn": "就像我梦想着为英格兰出场的那个日子一样，我也梦想着站上温布利的那个日子。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And when I finally did, it wasn’t like I had dreamed.",
            "cn": "而当我终于站上去时，那里并不像我梦见的那样。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It was so much better than that.",
            "cn": "那里比梦里好太多了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When I got out onto the pitch, I just kept looking down at the grass and thinking, Man, it’s perfect.",
            "cn": "走上球场的时候，我一直低头看着草皮，心想：我的天，太完美了。",
            "cnEdited": true
          },
          {
            "en": "Every single blade is the same height.",
            "cn": "每一根草都剪得一样高。",
            "cnEdited": true
          },
          {
            "en": "This is a long way from the garden outside the council estate.",
            "cn": "这里离公屋外那个院子，已经很远很远了。",
            "cnEdited": true
          }
        ]
      }
    ]
  },
  {
    "id": "gr-james-clear-diderot-effect",
    "cat": "成长",
    "title": "The Diderot Effect: Why We Want Things We Don’t Need — And What to Do About It",
    "titleZh": "狄德罗效应：我们为什么想要自己不需要的东西——以及怎么办",
    "source": "James Clear · 2015-10-06",
    "date": "2015-10-06",
    "minutes": 11,
    "url": "https://jamesclear.com/diderot-effect",
    "coverImg": "assets/covers/gr-james-clear-diderot-effect.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "The famous French philosopher Denis Diderot lived nearly his entire life in poverty, but that all changed in 1765.",
            "cn": "著名的法国哲学家丹尼斯·狄德罗几乎一辈子都活在贫困里，但这一切在1765年改变了。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Diderot was 52 years old and his daughter was about to be married, but he could not afford to provide a dowry.",
            "cn": "那年狄德罗52岁，女儿即将出嫁，他却拿不出一份嫁妆。",
            "cnEdited": true
          },
          {
            "en": "Despite his lack of wealth, Diderot’s name was well-known because he was the co-founder and writer of Encyclopédie, one of the most comprehensive encyclopedias of the time.",
            "cn": "尽管并不富裕，狄德罗的名字却广为人知，因为他是《百科全书》（Encyclopédie）的联合创始人兼撰稿人——那是当时最全面的百科全书之一。",
            "cnEdited": true
          },
          {
            "en": "When Catherine the Great, the Empress of Russia, heard of Diderot’s financial troubles she offered to buy his library from him for £1000 GBP, which is approximately $50,000 USD in 2015 dollars.",
            "cn": "俄国女皇叶卡捷琳娜大帝听说了狄德罗的财务困境，提出用1000英镑买下他的藏书——大约相当于2015年的5万美元。",
            "cnEdited": true
          },
          {
            "en": "Suddenly, Diderot had money to spare.",
            "cn": "突然间，狄德罗有了闲钱。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Shortly after this lucky sale, Diderot acquired a new scarlet robe.",
            "cn": "这笔幸运的卖出之后不久，狄德罗添置了一件新的猩红色睡袍。",
            "cnEdited": true
          },
          {
            "en": "That’s when everything went wrong.",
            "cn": "一切就是从那时开始走偏的。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The Diderot Effect",
            "cn": "狄德罗效应",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Diderot’s scarlet robe was beautiful.",
            "cn": "狄德罗的猩红色睡袍漂亮极了。",
            "cnEdited": true
          },
          {
            "en": "So beautiful, in fact, that he immediately noticed how out of place it seemed when surrounded by the rest of his common possessions.",
            "cn": "漂亮到什么程度呢——他立刻发现，周围那些寻常旧物，在它旁边全都显得格格不入。",
            "cnEdited": true
          },
          {
            "en": "In his words, there was “no more coordination, no more unity, no more beauty” between his robe and the rest of his items.",
            "cn": "用他自己的话说，这件睡袍和他的其余物件之间“再也谈不上协调，谈不上统一，谈不上美”。",
            "cnEdited": true
          },
          {
            "en": "The philosopher soon felt the urge to buy some new things to match the beauty of his robe.",
            "cn": "这位哲学家很快就萌生了冲动，想买些新东西来配得上这件睡袍的美。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He replaced his old rug with a new one from Damascus.",
            "cn": "他用一条从大马士革买来的新地毯，换掉了旧地毯。",
            "cnEdited": true
          },
          {
            "en": "He decorated his home with beautiful sculptures and a better kitchen table.",
            "cn": "他用精美的雕塑和一张更好的餐桌装点家。",
            "cnEdited": true
          },
          {
            "en": "He bought a new mirror to place above the mantle and his “straw chair was relegated to the antechamber by a leather chair.”",
            "cn": "他买了一面新镜子挂到壁炉架上方，他那把“草椅被一把皮椅挤到了前厅”。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "These reactive purchases have become known as the Diderot Effect.",
            "cn": "这些应激式的购买，后来被称为“狄德罗效应”。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The Diderot Effect states that obtaining a new possession often creates a spiral of consumption which leads you to acquire more new things.",
            "cn": "狄德罗效应说的是：得到一件新物品，往往会引发一场消费螺旋，让你不断购入更多新东西。",
            "cnEdited": true
          },
          {
            "en": "As a result, we end up buying things that our previous selves never needed to feel happy or fulfilled.",
            "cn": "结果，我们会买下以前的自己从来不曾需要、也照样快乐满足的东西。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Denis Diderot as depicted by Louis-Michel van Loo in 1767.",
            "cn": "路易-米歇尔·范·卢1767年笔下的丹尼斯·狄德罗。",
            "cnEdited": true
          },
          {
            "en": "In this painting Diderot is wearing a robe similar to the one that prompted his famous essay on the Diderot Effect.",
            "cn": "画中的狄德罗穿着一件睡袍，与促成他写下那篇著名“狄德罗效应”文章的那件相似。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Why We Want Things We Don’t Need",
            "cn": "我们为什么想要自己不需要的东西",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Like many others, I have fallen victim to the Diderot Effect.",
            "cn": "和许多人一样，我也栽在过狄德罗效应手里。",
            "cnEdited": true
          },
          {
            "en": "I recently bought a new car and I ended up purchasing all sorts of additional things to go inside it.",
            "cn": "我最近买了辆新车，结果为车里添置了一堆别的东西。",
            "cnEdited": true
          },
          {
            "en": "I bought a tire pressure gauge, a car charger for my cell phone, an extra umbrella, a first aid kit, a pocket knife, a flashlight, emergency blankets, and even a seatbelt cutting tool.",
            "cn": "我买了胎压计、手机车载充电器、一把备用伞、一个急救包、一把折刀、一支手电筒、应急保温毯，甚至还有一个安全带切割器。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Allow me to point out that I owned my previous car for nearly 10 years and at no point did I feel that any of the previously mentioned items were worth purchasing.",
            "cn": "必须说明：上一辆车我开了将近10年，上面提到的那些东西，我从没觉得有哪一样值得买。",
            "cnEdited": true
          },
          {
            "en": "And yet, after getting my shiny new car, I found myself falling into the same consumption spiral as Diderot.",
            "cn": "然而，亮闪闪的新车一到手，我发现自己掉进了和狄德罗一模一样的消费螺旋。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You can spot similar behaviors in many other areas of life:",
            "cn": "生活中的许多其他方面，你都能看到类似的行为：",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You buy a new dress and now you have to get shoes and earrings to match.",
            "cn": "你买了一条新裙子，接着就得买相配的鞋和耳环。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You buy a CrossFit membership and soon you’re paying for foam rollers, knee sleeves, wrist wraps, and paleo meal plans.",
            "cn": "你办了CrossFit会员卡，很快又为泡沫轴、护膝、护腕和原始饮食餐单掏钱。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You buy your kid an American Girl doll and find yourself purchasing more accessories than you ever knew existed for dolls.",
            "cn": "你给女儿买了个美国女孩牌娃娃，然后发现自己在买那些你从不知道娃娃还会有的配件。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You buy a new couch and suddenly you’re questioning the layout of your entire living room.",
            "cn": "你买了张新沙发，突然就开始怀疑整个客厅的布局。",
            "cnEdited": true
          },
          {
            "en": "Those chairs?",
            "cn": "那些椅子？",
            "cnEdited": true
          },
          {
            "en": "That coffee table?",
            "cn": "那张咖啡桌？",
            "cnEdited": true
          },
          {
            "en": "That rug?",
            "cn": "那块地毯？",
            "cnEdited": true
          },
          {
            "en": "They all gotta go.",
            "cn": "全都得换。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Life has a natural tendency to become filled with more.",
            "cn": "生活天然有一种被塞得越来越满的倾向。",
            "cnEdited": true
          },
          {
            "en": "We are rarely looking to downgrade, to simplify, to eliminate, to reduce.",
            "cn": "我们很少想着降级、简化、清除、缩减。",
            "cnEdited": true
          },
          {
            "en": "Our natural inclination is always to accumulate, to add, to upgrade, and to build upon.",
            "cn": "我们的天然倾向总是累积、添加、升级、叠加。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the words of sociology professor Juliet Schor, “the pressure to upgrade our stock of stuff is relentlessly unidirectional, always ascending.”",
            "cn": "用社会学教授朱丽叶·肖尔的话说：“升级我们手中物件的压力是单向的、不知疲倦的，永远向上。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Mastering the Diderot Effect",
            "cn": "驾驭狄德罗效应",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The Diderot Effect tells us that your life is only going to have more things fighting to get in it, so you need to understand how to curate, eliminate, and focus on the things that matter.",
            "cn": "狄德罗效应告诉我们，闯进你生活的东西只会越来越多，所以你得懂得如何筛选、剔除，把注意力放在真正要紧的事物上。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Reduce exposure.",
            "cn": "减少接触。",
            "cnEdited": true
          },
          {
            "en": "Nearly every habit is initiated by a trigger or cue.",
            "cn": "几乎每一个习惯都是由某个触发点或提示引发的。",
            "cnEdited": true
          },
          {
            "en": "One of the quickest ways to reduce the power of the Diderot Effect is to avoid the habit triggers that cause it in the first place.",
            "cn": "削弱狄德罗效应最快的办法之一，就是从一开始就避开引发它的那些习惯触发点。",
            "cnEdited": true
          },
          {
            "en": "Unsubscribe from commercial emails.",
            "cn": "退订商业推广邮件。",
            "cnEdited": true
          },
          {
            "en": "Call the magazines that send you catalogs and opt out of their mailings.",
            "cn": "给给你寄商品目录的杂志社打电话，退出他们的邮寄名单。",
            "cnEdited": true
          },
          {
            "en": "Meet friends at the park rather than the mall.",
            "cn": "和朋友约在公园见面，而不是商场。",
            "cnEdited": true
          },
          {
            "en": "Block your favorite shopping websites using tools like Freedom .",
            "cn": "用 Freedom 这类工具屏蔽你最喜欢的购物网站。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Buy items that fit your current system.",
            "cn": "购买与你现有体系相配的物品。",
            "cnEdited": true
          },
          {
            "en": "You don’t have to start from scratch each time you buy something new.",
            "cn": "每次买新东西，你不必都从头开始。",
            "cnEdited": true
          },
          {
            "en": "When you purchase new clothes, look for items that work well with your current wardrobe.",
            "cn": "买新衣服时，找那些能和你现有衣橱搭配的款式。",
            "cnEdited": true
          },
          {
            "en": "When you upgrade to new electronics, get things that play nicely with your current pieces so you can avoid buying new chargers, adapters, or cables.",
            "cn": "升级电子产品时，选能和你现有设备兼容的，免得再买新的充电器、转接器或数据线。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Set self-imposed limits.",
            "cn": "给自己设限。",
            "cnEdited": true
          },
          {
            "en": "Live a carefully constrained life by creating limitations for you to operate within.",
            "cn": "通过给自己划定活动的边界，过一种精心约束的生活。",
            "cnEdited": true
          },
          {
            "en": "Juliet Schor provides a great example with this quote…",
            "cn": "朱丽叶·肖尔用一个例子把这一点讲得很好……",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Imagine the following.",
            "cn": "“设想一下。",
            "cnEdited": true
          },
          {
            "en": "A community group in your town organizes parents to sign a pledge agreeing to spend no more than $50 on athletic shoes for their children.",
            "cn": "你镇上的一个社区团体组织家长们签署承诺书，同意给孩子买运动鞋不超过50美元。",
            "cnEdited": true
          },
          {
            "en": "The staff at your child’s day-care center requests a $75 limit on spending for birthday parties.",
            "cn": "你孩子日托中心的工作人员提议，生日派对的花费上限为75美元。",
            "cnEdited": true
          },
          {
            "en": "The local school board rallies community support behind a switch to school uniforms.",
            "cn": "当地教育委员会发动社区支持，让孩子们改穿校服。",
            "cnEdited": true
          },
          {
            "en": "The PTA gets 8o percent of parents to agree to limit their children’s television watching to no more than one hour per day.",
            "cn": "家长教师协会让80%的家长同意，把孩子看电视的时间限制在每天不超过一小时。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Do you wish someone in your community or at your children’s school would take the lead in these or similar efforts?",
            "cn": "你希望你的社区里、你孩子的学校里，有人带头做这些或类似的努力吗？",
            "cnEdited": true
          },
          {
            "en": "I think millions of American parents do.",
            "cn": "我想，数以百万计的美国家长都希望。",
            "cnEdited": true
          },
          {
            "en": "Television, shoes, clothes, birthday parties, athletic uniforms-these are areas where many parents feel pressured into allowing their children to consume at a level beyond what they think is best, want to spend, or can comfortably afford.”",
            "cn": "电视、鞋、衣服、生日派对、运动队服——在这么多事情上，许多家长都迫于压力，允许孩子消费到超出自己认为合适的程度、超出自己想花的钱、超出自己能从容负担的水平。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "—Juliet Schor, The Overspent American",
            "cn": "——朱丽叶·肖尔，《过度消费的美国人》",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Buy One, Give One.",
            "cn": "买一件，送出一件。",
            "cnEdited": true
          },
          {
            "en": "Each time you make a new purchase, give something away.",
            "cn": "每做一笔新的消费，就送出去一件旧物。",
            "cnEdited": true
          },
          {
            "en": "Get a new TV?",
            "cn": "买了新电视？",
            "cnEdited": true
          },
          {
            "en": "Give your old one away rather than moving it to another room.",
            "cn": "把旧的送人，别把它挪到另一个房间。",
            "cnEdited": true
          },
          {
            "en": "The idea is to prevent your number of items from growing.",
            "cn": "关键是别让你的物品数量增长。",
            "cnEdited": true
          },
          {
            "en": "Always be curating your life to include only the things that bring you joy and happiness.",
            "cn": "永远把生活整理成只包含那些给你带来快乐与幸福的东西。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Go one month without buying something new.",
            "cn": "整整一个月不买新东西。",
            "cnEdited": true
          },
          {
            "en": "Don’t allow yourself to buy any new items for one month.",
            "cn": "整整一个月，不许自己买任何新物品。",
            "cnEdited": true
          },
          {
            "en": "Instead of buying a new lawn mower, rent one from a neighbor.",
            "cn": "不买新割草机，向邻居租一台。",
            "cnEdited": true
          },
          {
            "en": "Get your new shirt from the thrift store rather than the department store.",
            "cn": "新衬衫去二手店买，不去百货商场。",
            "cnEdited": true
          },
          {
            "en": "The more we restrict ourselves, the more resourceful we become .",
            "cn": "我们越是自我约束，就越有办法。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Let go of wanting things.",
            "cn": "放下“想要”这件事。",
            "cnEdited": true
          },
          {
            "en": "There will never be a level where you will be done wanting things.",
            "cn": "“想要”永远没有做完的一天。",
            "cnEdited": true
          },
          {
            "en": "There is always something to upgrade to.",
            "cn": "总会有下一样可以升级的东西。",
            "cnEdited": true
          },
          {
            "en": "Get a new Honda?",
            "cn": "买了辆新本田？",
            "cnEdited": true
          },
          {
            "en": "You can upgrade to a Mercedes.",
            "cn": "你可以升级成奔驰。",
            "cnEdited": true
          },
          {
            "en": "Get a new Mercedes?",
            "cn": "买了辆新奔驰？",
            "cnEdited": true
          },
          {
            "en": "You can upgrade to a Bentley.",
            "cn": "你可以升级成宾利。",
            "cnEdited": true
          },
          {
            "en": "Get a new Bentley?",
            "cn": "买了辆新宾利？",
            "cnEdited": true
          },
          {
            "en": "You can upgrade to a Ferrari.",
            "cn": "你可以升级成法拉利。",
            "cnEdited": true
          },
          {
            "en": "Get a new Ferrari?",
            "cn": "买了辆新法拉利？",
            "cnEdited": true
          },
          {
            "en": "Have you thought about buying a private plane?",
            "cn": "想过买架私人飞机吗？",
            "cnEdited": true
          },
          {
            "en": "Realize that wanting is just an option your mind provides, not an order you have to follow.",
            "cn": "要明白，“想要”只是你的头脑提供的一个选项，不是你必须服从的命令。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "How to Overcome the Consumption Tendency",
            "cn": "如何克服消费倾向",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Our natural tendency is to consume more, not less.",
            "cn": "我们的天然倾向是消费更多，而不是更少。",
            "cnEdited": true
          },
          {
            "en": "Given this tendency, I believe that taking active steps to reduce the flow of unquestioned consumption makes our lives better.",
            "cn": "正因如此，我相信主动减少“不经思考的消费”的流量，会让我们的生活更好。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Personally, my goal is not to reduce life to the fewest amount of things, but to fill it with the optimal amount of things.",
            "cn": "就我个人而言，我的目标不是把生活压缩到物件最少，而是用最优数量的物件把它填满。",
            "cnEdited": true
          },
          {
            "en": "I hope this article will help you consider how to do the same.",
            "cn": "我希望这篇文章能帮你也想一想，怎样做到同样的事。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In Diderot’s words, “Let my example teach you a lesson.",
            "cn": "用狄德罗自己的话说：“让我的例子给你上一课。",
            "cnEdited": true
          },
          {
            "en": "Poverty has its freedoms; opulence has its obstacles.”",
            "cn": "贫困自有它的自由；富足自有它的障碍。”",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Footnotes",
            "cn": "脚注",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In addition to her payment for the library, Catherine the Great asked Diderot to keep the books until she needed them and offered to pay him a yearly salary to act as her librarian.",
            "cn": "除了买书的钱，叶卡捷琳娜大帝还请狄德罗把书留着、等她需要时再取，并答应每年付他一笔薪金，请他担任她的图书管理员。",
            "cnEdited": true
          },
          {
            "en": "( Source )",
            "cn": "（来源）",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Diderot’s scarlet robe is frequently described as a gift from a friend.",
            "cn": "狄德罗的猩红色睡袍常被说成是一位朋友送的礼物。",
            "cnEdited": true
          },
          {
            "en": "However, I could find no original source claiming it was a gift nor any mention of the friend who supplied the robe.",
            "cn": "然而，我找不到任何原始出处说它是礼物，也找不到任何提到那位赠袍朋友的记载。",
            "cnEdited": true
          },
          {
            "en": "If you happen to know any historians specializing in robe acquisitions, feel free to point them my way so we can clarify the mystery of the source of Diderot’s famous scarlet robe.",
            "cn": "如果你恰好认识专攻“睡袍来源考”的历史学家，欢迎把他们引荐给我，好让我们解开狄德罗那件著名猩红睡袍的来源之谜。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The quotes from Denis Diderot in this article come from his essay, “ Regrets for my Old Dressing Gown .”",
            "cn": "本文引用的狄德罗的话，出自他的文章《旧睡袍的遗憾》（Regrets for my Old Dressing Gown）。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Some readers have pointed out that my purchases were smart, not unnecessary.",
            "cn": "一些读者指出，我买的东西都很明智，并非多余。",
            "cnEdited": true
          },
          {
            "en": "This might be true, but it is still an example of the Diderot Effect.",
            "cn": "这也许没错，但它仍然是狄德罗效应的一个例子。",
            "cnEdited": true
          },
          {
            "en": "Just to clarify: The Diderot Effect simply means that when we obtain a new item when tend to acquire additional ones.",
            "cn": "澄清一下：狄德罗效应只是说，当我们得到一件新物品时，往往会接着购入更多。",
            "cnEdited": true
          },
          {
            "en": "It’s not a value judgment that only applies to unnecessary purchases.",
            "cn": "它不是一条只适用于“不必要消费”的价值判断。",
            "cnEdited": true
          },
          {
            "en": "So, even if my purchases were smart, I still feel victim to buying more things once I made an initial purchase.",
            "cn": "所以，就算我买的都是明智之物，在第一笔消费之后，我仍然落入了继续购买更多的窠臼。",
            "cnEdited": true
          },
          {
            "en": "Of course, the Diderot Effect often results in unnecessary purchases, which is why I focused on that angle in this article.",
            "cn": "当然，狄德罗效应确实常常导致不必要的购买，这也是本文聚焦这个角度的原因。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“ The Overspent American: Why We Want What We Don’t Need ” by Juliet Schor.",
            "cn": "朱丽叶·肖尔所著《过度消费的美国人：为什么我们想要我们不需要的东西》。",
            "cnEdited": true
          },
          {
            "en": "Chapter 6.",
            "cn": "第6章。",
            "cnEdited": true
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Thanks to my friend Joshua Becker for originally sparking my interest in the Diderot Effect by writing his own article on the topic.",
            "cn": "感谢我的朋友约书亚·贝克尔——他写的那篇同主题文章，最早点燃了我对狄德罗效应的兴趣。",
            "cnEdited": true
          }
        ]
      }
    ]
  },
  {
    "id": "gr-aeon-instrumentalisation",
    "cat": "成长",
    "title": "Instrumentalisation is making everything a means to an end",
    "titleZh": "工具化，正在让一切沦为达成目的的手段",
    "source": "Aeon · 2026-02-24",
    "date": "2026-02-24",
    "minutes": 33,
    "url": "https://aeon.co/essays/instrumentalisation-is-making-everything-a-means-to-an-end",
    "coverImg": "assets/covers/gr-aeon-instrumentalisation.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "For decades, films out of the Metro-Goldwyn-Mayer Studios have opened with Leo the roaring lion, garlanded with the motto Ars gratia artis : art for art’s sake.",
            "cn": "几十年来，米高梅出品的电影都以咆哮的雄狮里奥开场，环绕着一句箴言：Ars gratia artis——为艺术而艺术。"
          },
          {
            "en": "Given that MGM is a money-making behemoth, we might doubt the sincerity of this high-minded sentiment.",
            "cn": "考虑到米高梅是一头赚钱的巨兽，我们难免怀疑这份高尚情怀有几分真诚。"
          },
          {
            "en": "Still, along with the contested goal of moral improvement, it certainly expresses one of the few legitimate reasons why people should make movies.",
            "cn": "尽管如此，与\"道德提升\"那个颇有争议的目标一道，它确实道出了人们拍电影为数不多的正当理由之一。"
          },
          {
            "en": "Art for the sake of anything else – profit, self-promotion, propaganda – isn’t really art at all, or at least not in its purest sense.",
            "cn": "为了别的任何东西而艺术——为了利润、为了自我推销、为了宣传——都算不上真正的艺术，至少不是最纯粹意义上的艺术。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It therefore came as a bit of a shock to see a recent advert for the National Art Pass, which gives holders free or discounted entry to galleries and museums around the United Kingdom.",
            "cn": "因此，当我看到最近一则全国艺术通票（National Art Pass）的广告时，多少有些震惊——这张通票能让持票人免费或优惠参观全英国的画廊和博物馆。"
          },
          {
            "en": "The tag line ‘See more.",
            "cn": "广告语\"看更多。"
          },
          {
            "en": "Live more’ sounded right: art does indeed enrich our lives.",
            "cn": "活更多\"听起来没错：艺术确实丰富我们的生活。"
          },
          {
            "en": "But it turned out that the ‘more’ here was purely quantitative, not qualitative.",
            "cn": "但结果发现，这里的\"更多\"纯粹是数量上的，而不是质量上的。"
          },
          {
            "en": "‘Grow some years onto your life with art,’ proclaimed the main slogan, followed by: ‘Spending time in galleries and museums could help you live longer.’ Art not for art’s sake, but for your heart’s sake, the fleshy not the spiritual one at that.",
            "cn": "\"用艺术为生命添上几个年头\"——主口号如此宣告，接着是：\"在画廊和博物馆里度过时光，或有助于你活得更久。\"艺术不再为艺术本身，而是为你的心脏——还是那颗肉做的心脏，不是精神意义上的那颗。"
          },
          {
            "en": "This messaging around the arts has become ubiquitous, with Arts Council England promoting the idea that ‘engaging in creative and cultural activities has proven health benefits for individuals and communities.’",
            "cn": "围绕艺术的这类信息已无处不在，英格兰艺术委员会就在推广这样一种说法：\"参与创意和文化活动，对个人与社区的健康益处已获证实。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I may have been shocked by the poster, but I was not surprised by it.",
            "cn": "海报让我震惊，但并不让我意外。"
          },
          {
            "en": "For a long time, I have been privately lamenting the instrumentalisation of everything: how nothing seems to be of value in itself anymore but is only seen as useful in the service of some utilitarian function.",
            "cn": "很长时间以来，我一直在私下哀叹一件事：万物的工具化——似乎再没有什么东西因其自身而有价值，一切都只在服务于某种功利功能时才被视为有用。"
          },
          {
            "en": "I first got wind of this lamentable trend in 2010, when I had the misfortune to review Gretchen Rubin’s book The Happiness Project (2009), an account of a year in relentless pursuit of the happy life.",
            "cn": "我最早注意到这股令人痛心的风潮是在2010年。当时我有幸（不如说不幸）评审格雷琴·鲁宾（Gretchen Rubin）的《幸福计划》（The Happiness Project，2009）——一部为期一年、一刻不停地追逐幸福生活的记录。"
          },
          {
            "en": "One passage struck me so hard I can almost recall it word for word today.",
            "cn": "其中一段击中了我，以致今天我几乎能一字不差地背出来。"
          },
          {
            "en": "A day with her husband gets off to a sticky start but, following an apology, Rubin writes: ‘We hugged – for at least six seconds, which, I happened to know from my research, is the minimum time necessary to promote the flow of oxytocin and serotonin, mood-boosting chemicals that promote bonding.",
            "cn": "与她丈夫的一天开局别扭，但一次道歉之后，鲁宾写道：\"我们拥抱了——至少六秒钟。碰巧从我的研究里我知道，这是催产素和血清素开始流动所需的最短时间，而它们正是促进联结、改善情绪的化学物质。"
          },
          {
            "en": "The moment of tension passed.’",
            "cn": "紧张的时刻过去了。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I was left with the chilling image of a woman holding her husband not only out of love or affection but in order to release hormones and reduce her stress.",
            "cn": "留给我的，是一个寒意彻骨的画面：一个女人拥抱着丈夫，不只是出于爱与感情，而是为了释放激素、给自己减压。"
          },
          {
            "en": "Those sentences highlighted how her happiness project had led her to do everything with the improvement of her mood in mind.",
            "cn": "这几句话突显了她的\"幸福计划\"如何让她做每件事时都惦记着改善自己的情绪。"
          },
          {
            "en": "Nothing else seemed to matter as much, even truth.",
            "cn": "似乎再没有别的什么同样要紧——哪怕是真实。"
          },
          {
            "en": "At the end of her year-long experiment in treating herself as a felicific machine, she reflected on what had or had not changed.",
            "cn": "在把自己当作一台幸福机器进行了一年实验的结尾，她回顾了哪些东西变了、哪些没变。"
          },
          {
            "en": "‘Maybe I was seeing what I wanted to see,’ she wondered, only to add: ‘Maybe, but who cares?’ Whatever makes you feel better, true or not.",
            "cn": "\"也许我看到的是我想看到的东西，\"她自问，随即补上一句：\"也许是吧，可谁在乎呢？\"只要让你感觉更好，真假有什么关系。"
          }
        ]
      },
      {
        "img": "assets/covers/gr-aeon-instrumentalisation-1.jpg",
        "cap": "Walking Man II (1960) by Alberto Giacometti at the National Gallery of Art, Washington, DC. Courtesy Billy Liar/Flickr",
        "capCn": "《行走的人 II》（Walking Man II，1960），阿尔贝托·贾科梅蒂（Alberto Giacometti），藏于美国华盛顿特区国家美术馆。图源：Billy Liar/Flickr"
      },
      {
        "sentences": [
          {
            "en": "In the years between witnessing hugging for happiness and creativity for longevity, I have seen countless other examples of all that is good in life being promoted not for their own sake but for the material benefits they bring.",
            "cn": "从\"为幸福而拥抱\"到\"为长寿而创意\"，这些年里，我见过数不清的例子：生活中一切美好的事物，被推广的理由都不是它们本身，而是它们带来的物质好处。"
          },
          {
            "en": "This instrumentalisation has become normalised so insidiously that we don’t even notice that it is odd, let alone wrong.",
            "cn": "这种工具化被常态化得如此隐秘，以至于我们甚至不再觉得它有什么奇怪，更不必说有什么不对。"
          },
          {
            "en": "Nor do we seem to be aware of quite how pervasive it is.",
            "cn": "我们似乎也没有意识到它蔓延得有多广。"
          },
          {
            "en": "Yet its effects are profound, leading us to lose sight again and again of what is truly of value in life.",
            "cn": "然而它的影响深远，让我们一次又一次地看不清人生中真正有价值的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Before offering a diagnosis for what has gone wrong and how to cure it, I need to defend the seemingly hyperbolic claim that everything is becoming instrumentalised.",
            "cn": "在给出问题的诊断与疗法之前，我需要先为一个看似夸张的论断辩护：一切都在被工具化。"
          },
          {
            "en": "Far from being a rhetorical exaggeration, I genuinely find it difficult to think of anything worthwhile that at least some people have not been advocating for its utilitarian benefits before mentioning any of its intrinsic merits.",
            "cn": "这绝非修辞上的夸大——我由衷地发现，自己很难想出任何有价值的东西：至少某些人在提到它的内在优点之前，不曾先鼓吹它的功利好处。"
          },
          {
            "en": "Take churchgoing.",
            "cn": "以上教堂为例。"
          },
          {
            "en": "Most believers hold that worship is a devotional duty rather than a pragmatic means of getting into heaven.",
            "cn": "大多数信徒认为，敬拜是一种虔敬的义务，而不是一种挤进天堂的实用手段。"
          },
          {
            "en": "Today, however, it is not uncommon to hear even Christians, such as Deborah Jenkins in Premier Christianity magazine, pointing to research that: ‘Being part of a church community can lengthen life, reduce depression and promote positive mental health.’ A book I flicked through today advocated prayer for physical health, pointing to a study that ‘found significant medical benefits on the cardiovascular system, blood, as well as muscle and bone resulting from the solat daily prayer.’ Of course, if challenged, none would say these are the best reasons to practise religion.",
            "cn": "然而今天，就连基督徒也常常援引研究说，比如《Premier Christianity》杂志上的黛博拉·詹金斯（Deborah Jenkins）：\"参与教会共同体，可以延年益寿、减少抑郁、促进积极的心理健康。\"我今天就随手翻到一本书，鼓吹为了身体健康而祷告，引用的研究\"发现每日礼拜式的祈祷对心血管系统、血液以及肌肉和骨骼都有显著的医学益处\"。当然，若被质问，没有人会说这些是信教的最好理由。"
          },
          {
            "en": "But it doesn’t stop them offering these reasons as very good ones.",
            "cn": "但这并不妨碍他们把这些理由当作很好的理由来提供。"
          },
          {
            "en": "Furthermore, they are more credible and certainly more scientific than claims that an all-loving creator god really thinks it’s important how you spend your Sunday mornings.",
            "cn": "更何况，比起\"一位全爱的造物主真的在乎你周日早晨怎么过\"这类说法，这些理由更可信、也更科学。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "More profanely, we are even given instrumental reasons to orgasm.",
            "cn": "说得更世俗些，我们甚至连高潮都被赋予了工具性的理由。"
          },
          {
            "en": "A headline from The Telegraph in 2015 – ‘An Orgasm A Day Could Keep Prostate Cancer Away, Scientists Claim’ – summed up a now-widely shared belief that one of the best reasons for a man to have sex or masturbate is not pleasure, intimacy or the release of sexual tension but to protect his health.",
            "cn": "《每日电讯报》2015年的一条标题——\"科学家声称：每天一次高潮或有助远离前列腺癌\"——概括了一种如今流传甚广的信念：男人做爱或自慰的最佳理由之一，不是愉悦、亲密或性张力的释放，而是保护健康。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You could play a very long game of suggesting things people value in their own right in the hope of finding one that hasn’t been praised for its health, wealth or wellbeing advantages.",
            "cn": "你可以玩一个很长的游戏：列举人们因其自身而珍视的东西，指望找到一样还不曾被称赞过健康、财富或幸福红利的。"
          },
          {
            "en": "Your search would be in vain.",
            "cn": "你的搜寻注定徒劳。"
          },
          {
            "en": "The Opera North website lists 10 benefits of singing, and only one – it lets you express yourself – has anything to do with art and creativity.",
            "cn": "北方歌剧院的官网列出了唱歌的10大好处，其中只有一条——让你表达自己——与艺术和创造力沾边。"
          },
          {
            "en": "The others include ‘makes you feel better’, ‘enhances lung function’, ‘helps you beat stress and relax’, ‘helps improve memory’, ‘can help when life gets tough’ and ‘boosts your confidence’.",
            "cn": "其余的包括\"让你感觉更好\"\"增强肺功能\"\"帮你减压放松\"\"有助于改善记忆\"\"生活艰难时能帮到你\"和\"提升你的自信\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Many people who advocate for reconnecting with nature do so with reasons that are designed to appeal to the very same utilitarian, self-centred hedonism that is to blame for humanity losing touch with the Earth in the first place.",
            "cn": "许多倡导\"重新与自然连接\"的人，用来打动人的理由，恰恰诉诸同一种功利、自我中心的享乐主义——而最初让人与地球失去联结的，正是这种享乐主义。"
          },
          {
            "en": "The National Trust talks of how ‘walking in nature can help wellbeing’ while the growing popularity of ‘forest bathing’ encourages us to use woodland as though it were a kind of literal walk-in clinic.",
            "cn": "国民信托说\"在自然中行走有助于身心健康\"，而日益流行的\"森林浴\"则鼓励我们把林地当作一种字面意义上的、走进去的诊所来使用。"
          },
          {
            "en": "These would-be advocates for nature seem to miss the irony that if we go out among the trees because of what they can do for us, we’re going with the same exploitative, extractive mindset as those who log them.",
            "cn": "这些自然的准代言人似乎没意识到其中的讽刺：如果我们走进树林是因为它们能为我们做什么，那么我们带着的，恰恰是与砍伐者相同的剥削式、攫取式心态。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Even philosophy , the disinterested pursuit of wisdom, has fallen prey to the curse of instrumentalisation.",
            "cn": "连哲学——这种不求回报的智慧追求——也沦为工具化诅咒的猎物。"
          },
          {
            "en": "It is no longer enough for universities to say that their programmes allow you to explore some of the most fundamental questions of existence.",
            "cn": "对大学来说，说自己的课程让你得以探索存在最根本的那些问题，已经不够了。"
          },
          {
            "en": "Now the questions are of a decidedly more bottom-line sort: how will philosophy help you buy a house or build your pension pot?",
            "cn": "如今的问题有着鲜明的底线色彩：哲学如何帮你买房？如何充实你的养老金？"
          },
          {
            "en": "Philosophy is routinely sold as a trainer of ‘transferable thinking skills’, and it’s clear where these most transfer to: the world of work.",
            "cn": "哲学被例行公事地包装成\"可迁移思维技能\"的训练营，而这些技能最明显迁移到哪里，一目了然：职场。"
          },
          {
            "en": "The Faculty of Philosophy at the University of Cambridge has a whole webpage devoted to five resumé-friendly skills it teaches: intellectual, communication, organisational, interpersonal and research.",
            "cn": "剑桥大学哲学系有一整个网页，专门介绍它教给你的五项适合写进简历的技能：智识、沟通、组织、人际和研究。"
          }
        ]
      },
      {
        "img": "assets/covers/gr-aeon-instrumentalisation-2.jpg",
        "cap": "Photo by ideath/Flickr",
        "capCn": "摄影：ideath/Flickr"
      },
      {
        "sentences": [
          {
            "en": "Instrumentalisation is most pernicious when it applies to things we do with and for others.",
            "cn": "工具化最毒害人心之处，在于它作用于我们与他人共同做、为他人做的事。"
          },
          {
            "en": "Immanuel Kant saw it as a ‘categorical imperative’ – an absolute demand of morality – to ‘treat humanity, whether in your own person or in the person of any other, always at the same time as an end, never merely as a means.’ The words we use to describe the instrumentalisation of others echo how corrupting we think it is: dehumanisation, objectification, exploitation.",
            "cn": "伊曼努尔·康德视之为一条\"绝对命令\"——道德的绝对要求——\"你要如此行动，即无论是你自己的人格中的人性，还是任何他人的人格中的人性，你在任何时候都同时当作目的，绝不能仅仅当作手段。\"我们用来描述\"把他人工具化\"的那些词，呼应着我们认为它有多败坏：非人化、物化、剥削。"
          },
          {
            "en": "That is why the instrumentalisation of social connection is immoral as well as self-defeating.",
            "cn": "正因如此，把社会连接工具化，既是不道德的，也是自拆台脚的。"
          },
          {
            "en": "If we start to foreground what social relationships do for us, we treat the other people involved as mere tools for self-advancement.",
            "cn": "如果我们开始把社会关系能为\"我\"做什么摆在第一位，我们就是在把关系中的其他人当作自我晋升的工具。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I haven’t even begun to exhaust the list of activities that have become routinely instrumentalised.",
            "cn": "我甚至还没开始列完那些被例行公事般工具化的活动。"
          },
          {
            "en": "Among those we could add are gardening, playing sport, camping, swimming, campaigning, community volunteer work, baking bread, crafts, keeping a diary, laughing, saying ‘thank you’.",
            "cn": "可以加进来的还有：园艺、运动、露营、游泳、社会运动、社区志愿服务、烤面包、手工、写日记、大笑、说\"谢谢\"。"
          },
          {
            "en": "We increasingly ask not what is good about them but what good they can do for us.",
            "cn": "我们越来越不问它们好在哪儿，而是问它们能为我们做什么。"
          },
          {
            "en": "And by ‘good’ we mean health, wealth and worldly success.",
            "cn": "而这里的\"好\"，指的是健康、财富与世俗意义上的成功。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Those who love nature, art, learning, friendship and so on for their own sake may find it distasteful to spotlight their instrumental benefits, but what is the harm in doing so?",
            "cn": "那些因其本身而热爱自然、艺术、学习与友谊的人，也许觉得突出它们的工具性好处令人生厌——但这么做究竟有什么害处？"
          },
          {
            "en": "After all, someone living an instrumentalised life and someone who is not might be doing exactly the same things.",
            "cn": "毕竟，一个把生活工具化的人和一个没有的人，可能在做着一模一样的事。"
          },
          {
            "en": "This objection misses the fact that a good life does not only depend on what we do, but how we do it.",
            "cn": "这种反驳漏掉了这样一个事实：好的生活不只取决于我们做什么，还取决于我们怎么做。"
          },
          {
            "en": "Two people with the same cultural calendars may go to the same exhibitions, watch the same films and listen to the same music, but if their motivations are fundamentally different then so are the worlds they inhabit.",
            "cn": "两个人可以有相同的文化日程表——看同样的展览、同样的电影、听同样的音乐——但如果他们的动机根本不同，他们栖居的世界也就根本不同。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To understand why, we have to go back to the basic question of why anything has value.",
            "cn": "要理解为什么会这样，我们必须回到那个最基本的问题：任何东西的价值从何而来。"
          },
          {
            "en": "In the Nicomachean Ethics , Aristotle was one of the first but certainly not the last to observe that we do some things as means to ends and other things as ends in themselves.",
            "cn": "在《尼各马可伦理学》里，亚里士多德最早指出——后来者不绝——我们做有些事是作为通向目的的手段，做另一些事则是以自身为目的。"
          },
          {
            "en": "Only the latter have intrinsic value, while means to ends have mere extrinsic value.",
            "cn": "只有后者具有内在价值，而通往目的的手段只具有外在价值。"
          },
          {
            "en": "If we ask where the ultimate value in life lies, it is clearly in things with intrinsic value.",
            "cn": "如果我们追问，人生终极的价值在哪里，答案显然在于有内在价值的事物。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This piece of wisdom is so uncontroversial it could be dismissed as platitudinous.",
            "cn": "这条智慧毫无争议，甚至可以被斥为老生常谈。"
          },
          {
            "en": "But it merits repeating across the ages and across all our life stages because it is so easy to be sucked away from what has real value by purely instrumental goods.",
            "cn": "但它值得被代代重复、在我们生命的每个阶段重复，因为我们太容易被纯粹工具性的好处吸走，离开那些真正有价值的东西。"
          },
          {
            "en": "Money is of course the clearest example.",
            "cn": "钱当然是最典型的例子。"
          },
          {
            "en": "Money is important only for what it can buy and can be used to obtain many of the things we most value.",
            "cn": "钱的重要性只在于它能买到什么；它可以用来换来我们最珍视的许多东西。"
          },
          {
            "en": "Yet it seems all too human to try to accumulate more and more of it, never believing one has enough, diverting us from time with loved ones and cherished activities.",
            "cn": "然而，想要积累得越来越多、永远觉得自己不够，这似乎是人之常情——而它让我们偏离了与所爱之人共处的时光，偏离了那些我们珍视的活动。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Pursuing extrinsic rather than intrinsic goods is a common-enough mistake.",
            "cn": "追逐外在价值而非内在价值，是一个足够常见的错误。"
          },
          {
            "en": "But the instrumentalisation of everything takes it one step further.",
            "cn": "但\"万物工具化\"把这个错误又推进了一步。"
          },
          {
            "en": "It doesn’t just distract us from all the things that are good in themselves; it strips these very things of their intrinsic value and turns them into mere means to ends.",
            "cn": "它不只是让我们分心、离开那些本身即善的事物；它剥掉这些事物自身的内在价值，把它们变成通向目的的纯粹手段。"
          },
          {
            "en": "Worse, these ends are not even of value in themselves.",
            "cn": "更糟的是，这些目的本身也并没有价值。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Think about what instrumentalisation serves: health, wealth and psychological wellbeing.",
            "cn": "想想工具化服务于什么：健康、财富、心理幸福感。"
          },
          {
            "en": "These are all so obviously desirable that it’s easy to miss the fact that none have intrinsic value.",
            "cn": "这些东西全都显而易见地令人向往，以至于我们很容易漏掉一个事实：它们没有一个具有内在价值。"
          },
          {
            "en": "That is clearly true of wealth, but it is equally true of mental and physical health.",
            "cn": "财富如此，心理与身体的健康也同样如此。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Take bodily health first.",
            "cn": "先说身体健康。"
          },
          {
            "en": "We often talk about it as if it were the most important thing of all.",
            "cn": "我们常常把健康说成好像是天底下最重要的东西。"
          },
          {
            "en": "That’s why Augusten Burroughs’s quote ‘When you have your health, you have everything’ has a healthy life as an internet meme.",
            "cn": "这就是为什么奥古斯滕·巴勒斯（Augusten Burroughs）那句\"只要你还有健康，你就拥有一切\"能成为流行一时的网络格言。"
          },
          {
            "en": "But we don’t prize health for its own sake.",
            "cn": "但我们珍视健康，并不是为了健康本身。"
          },
          {
            "en": "We value it for two reasons.",
            "cn": "我们看重它有两个理由。"
          },
          {
            "en": "One is that the alternative usually involves pain and suffering, which are bad in themselves and so to be avoided.",
            "cn": "其一，失去健康通常意味着疼痛与苦楚，而它们本身即是坏的，所以要避免。"
          },
          {
            "en": "The other is that, with health, we are more able to do the things that bring meaning to our lives.",
            "cn": "其二，有了健康，我们才更有能力去做那些为生活带来意义的事。"
          },
          {
            "en": "But a healthy life devoid of love, meaningful activity or experiences would be empty.",
            "cn": "但一种没有爱、没有有意义的活动与体验的健康生活，会是空洞的。"
          },
          {
            "en": "Indeed, many people with chronic illness surprise themselves and others when they discover that, actually, their health is not the most important thing after all.",
            "cn": "事实上，许多慢性病患者让自己和旁人吃惊的是：他们发现，健康终究不是最重要的东西。"
          },
          {
            "en": "In sickness, they see more clearly what matters and find that it is better to be, say, ill and loved than in good health and loathed.",
            "cn": "在疾病中，他们把要紧的事看得更清楚，并且发现，比如，带病而被爱着，好过健康而被厌恶着。"
          },
          {
            "en": "As one wheelchair-using study participant told Elizabeth Lindsey, an associate professor of nursing: ‘I can live life to the fullest, even if I have no physical ability, I can still live life to the fullest because where I am living, life is from within.’ Physical health is important only as a foundation to make it easier for us to appreciate the things that really matter.",
            "cn": "正如一位坐轮椅的研究参与者对护理学副教授伊丽莎白·林赛（Elizabeth Lindsey）所说：\"我可以活得无比充盈。哪怕我毫无身体能力，我仍然可以把生活过到最满，因为我所在的地方，生命由内而生。\"身体健康之所以重要，只在于它是地基，让我们更容易珍视那些真正要紧的东西。"
          },
          {
            "en": "Indeed, Lindsey talks of ‘health within illness’, arguing that health in its fullest sense is not the absence of illness.",
            "cn": "事实上，林赛谈的是\"疾病之内的健康\"，她主张，最完整意义上的健康并不是没有疾病。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Even mental health is not important in itself.",
            "cn": "连心理健康本身也不是终极重要的。"
          },
          {
            "en": "Mental illness is intrinsically bad, since it is suffering without gain.",
            "cn": "精神疾病本身是坏的，因为那是有苦无获的受难。"
          },
          {
            "en": "But being in good mental health, like being in good physical health, is just an enabler of what is more fundamentally valuable.",
            "cn": "但良好的心理状态，一如良好的身体状态，只是那些更根本价值之物的使能者。"
          },
          {
            "en": "Even some mental distress is not intrinsically bad.",
            "cn": "甚至某些心理痛苦也并非本质为坏。"
          },
          {
            "en": "It is a good thing that we grieve as it shows that our emotions are functioning correctly when bad things happen to the people who matter to us.",
            "cn": "我们会悲伤，这是一件好事——因为它说明，当坏事情降临到我们所在乎的人身上，我们的情绪运转正常。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Not even happiness, perhaps the most commonly claimed benefit of instrumentalisation, is an intrinsic good.",
            "cn": "就连幸福——工具化最常被标榜的好处——也不是内在的善。"
          },
          {
            "en": "It is not good if someone feels happy to see people they prejudicially hate suffer.",
            "cn": "如果一个人因为看到自己偏见所恨的人受苦而快乐，这并不是好。"
          },
          {
            "en": "It would not be good to live life in a chemical cloud of bliss, content but disengaged from the real world.",
            "cn": "生活在一片化学的极乐云雾里，心满意足却与真实世界脱节，这并不是好。"
          },
          {
            "en": "It is not good to live happily in the illusion of a strong relationship when your partner is cheating behind your back.",
            "cn": "当伴侣在背后不忠时，你却在一段\"牢固关系\"的幻觉中幸福度日，这并不是好。"
          },
          {
            "en": "Blissful ignorance may sometimes be better than painful knowledge, but that does not make it good.",
            "cn": "极乐的无知有时好过痛苦的知识，但这并不使它成为好。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So what is good in itself, if not health, wealth and mental wellbeing?",
            "cn": "那么，如果不是健康、财富与心理幸福感，究竟什么才是本身即善的？"
          },
          {
            "en": "Philosophers have repeatedly made the mistake of trying to identify one thing as the summum bonum , the ‘ultimate good’ for humankind.",
            "cn": "哲学家们一再犯这样一个错误：试图指认唯一的某样东西作为人类的 summum bonum——\"至善\"。"
          },
          {
            "en": "For Aristotle, it was intellectual contemplation; for the Buddhists, elimination of suffering; for Kant, a good will; for utilitarians, happiness.",
            "cn": "在亚里士多德那里，是理智的沉思；在佛教徒那里，是灭除苦难；在康德那里，是善良意志；在功利主义者那里，是幸福。"
          },
          {
            "en": "But there seems no reason to try to narrow down what is intrinsically valuable to one state or activity.",
            "cn": "但似乎没有理由非要把内在有价值的东西窄化为某一种状态或活动。"
          },
          {
            "en": "Aristotle was more on point when he identified flourishing as the highest good for humanity, erring only when he became too prescriptive about what flourishing demands.",
            "cn": "亚里士多德更切中要害的说法，是把\"繁荣/盛放\"（flourishing）指认为人类的至善——他只在过于规定\"繁荣需要什么\"的时候出了错。"
          },
          {
            "en": "We flourish when our lives are ones of engagement with things that are valuable for their own sakes and not for any other.",
            "cn": "当我们的生活与那些因其自身而有价值（而非为任何别的理由）的事物持续交会时，我们就是在盛放。"
          },
          {
            "en": "Flourishing takes as many forms as human beings do.",
            "cn": "盛放有多少种形态，人就有多少种形态。"
          },
          {
            "en": "Friedrich Nietzsche thought that life without music would be a mistake, but it wouldn’t be for someone who is left cold by it.",
            "cn": "弗里德里希·尼采认为，没有音乐的人生将是一场错误；但对一个对音乐无感的人来说，它并不是。"
          },
          {
            "en": "The idea that ultimate value in life comes from things with intrinsic value is a pluralistic one.",
            "cn": "\"人生的终极价值来自具有内在价值的事物\"——这个观念是多元的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Intrinsic human goods include all the things that make life worth living without need of any further justification.",
            "cn": "人类的内在之善，包括所有那些无需进一步辩护就让生活值得过下去的东西。"
          },
          {
            "en": "To ask of them ‘What’s the point?’ would be to miss the point.",
            "cn": "对它们追问\"这有什么用？\"，恰恰错过了要点。"
          },
          {
            "en": "They are the point.",
            "cn": "它们就是要点。"
          },
          {
            "en": "We cannot give arguments for why they are valuable; we can only describe what makes them valuable and hope others recognise their worth.",
            "cn": "我们无法论证它们为什么有价值；我们只能描述是什么使它们有价值，并希望他人认出它们的分量。"
          },
          {
            "en": "For example, we can say that a day spent in the forest should be appreciated first and foremost because it makes us recognise the wonder of being alive and marvel at the natural world .",
            "cn": "比如，我们可以说：在森林里度过的一天，首先值得被欣赏，是因为它让我们认出\"活着\"这件事的惊奇，让我们对自然世界惊叹不已。"
          },
          {
            "en": "To play or watch a sport is to participate in or witness the struggle and delight of attempting to bring mind and body together more seamlessly than in the rest of life.",
            "cn": "参与或观看一项运动，就是参与或见证这样一种挣扎与欢喜：试图让身体与心智的接合，比生活中其余时刻更加严丝合缝。"
          },
          {
            "en": "Learning a foreign language is a gateway into another culture that allows you to communicate with members of it and access its literature and media.",
            "cn": "学一门外语，是进入另一种文化的门径，让你得以与其中的人交流，读到它的文学、看到它的媒体。"
          },
          {
            "en": "All these things enrich our lives and broaden our experience, which is valuable even if it doesn’t add a second to your lifespan or delay dementia by a day.",
            "cn": "所有这些都在丰富我们的生活、拓宽我们的经验——这本身就是有价值的，哪怕它没给你的寿命添上一秒，也没让痴呆晚来一天。"
          },
          {
            "en": "If you see them as a means to boost your mental, emotional or physical strength for future times that may or may not be as meaningful, you are taking your focus away from what is valuable here and now.",
            "cn": "如果你把它们看作提升自己心理、情绪或身体力量的手段，为了那些或许有意义、或许无意义的将来——那么，你正在把注意力从此时此地有价值的东西上移开。"
          },
          {
            "en": "Life isn’t a training for the future.",
            "cn": "生活不是为未来做的训练。"
          },
          {
            "en": "It’s a game that’s already started, and time is running out.",
            "cn": "它是一场已经开始的比赛，而时间正在耗尽。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The distinction between intrinsic and extrinsic goods may be conceptually sharp, but in the real world it quickly becomes less clear-cut.",
            "cn": "内在价值与外在价值的区分在概念上或许锋利，但在真实世界里，它很快变得不再泾渭分明。"
          },
          {
            "en": "Most obviously, many things can be both intrinsically and extrinsically valuable, as is the case for all the things that I argued have been wrongly instrumentalised.",
            "cn": "最明显的是，许多事物可以同时具有内在与外在价值——我前面论证过被错误工具化的那些事物，皆属此类。"
          },
          {
            "en": "Instrumentalisation does not create extrinsic value, it merely elevates it above what is intrinsically valuable.",
            "cn": "工具化并不创造外在价值，它只是把外在价值抬高到内在价值之上。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Nor is it always the case that intrinsic trumps extrinsic value.",
            "cn": "内在价值也并非永远胜过外在价值。"
          },
          {
            "en": "Human beings have practical needs, and it can be more important to earn money, chop wood or hunt food than to read a novel or play with your grandchildren.",
            "cn": "人有现实的生存需要，有时候，挣钱、劈柴、猎取食物，比读一本小说或陪孙辈玩耍更要紧。"
          },
          {
            "en": "Many things have to be done for instrumental purposes, and to occupy yourself only with what is intrinsically worthwhile would be an exceptional privilege, an indulgence, or both.",
            "cn": "许多事不得不为工具性的目的而做；只让自己浸在内在有价值之事里，会是一种罕见的特权、一种放纵，或兼而有之。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Furthermore, not all extrinsic goods are created equal.",
            "cn": "此外，外在价值也并非千篇一律。"
          },
          {
            "en": "Some serve ultimate value more closely than others.",
            "cn": "有些手段比别的手段更贴近终极价值。"
          },
          {
            "en": "Flattering the boss to win favour to earn money to spend on things of true value takes us far from what is most important in life with no guarantee we will get back to it.",
            "cn": "奉承老板以邀宠、为挣钱、去买那些真正有价值的东西——这条链条把我们带离生命中最重要的东西，还不保证回得来。"
          },
          {
            "en": "Studying ethics, in contrast, is in a sense a means to an end of living well, but the end is so close to hand that it almost counts as good in itself.",
            "cn": "相比之下，研究伦理学，在某种意义上也是通向\"好好生活\"这一目的的手段，但这个目的近在咫尺，以至于它几乎本身就称得上是善。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This is why I think the debate over ‘art for art’s sake’ versus ‘art as a didactic tool’ is somewhat misguided.",
            "cn": "正因如此，我认为\"为艺术而艺术\"与\"艺术作为教化工具\"之争有些找错了靶子。"
          },
          {
            "en": "Some art, especially instrumental music and abstract painting, can and should be appreciated only for its own sake.",
            "cn": "有些艺术——尤其是纯音乐与抽象绘画——可以而且应当只为它自身而被欣赏。"
          },
          {
            "en": "But much literature, film and drama can give us insight into ethics, politics and the human heart.",
            "cn": "但许多文学、电影与戏剧，能够给我们关于伦理、政治与人心的洞见。"
          },
          {
            "en": "All such understanding helps us to live better and attend more to what truly matters, in our lives and those of others.",
            "cn": "所有这样的理解，都帮助我们活得更好，把更多注意力放在真正要紧的事上——无论是自己的生活还是他人的生活。"
          },
          {
            "en": "Such art can be seen as a means to the end of moral education, but in good art, means and ends are so closely tied that the distinction seems artificial.",
            "cn": "这类艺术可以被视为通向道德教育这一目的的手段；但在好的艺术里，手段与目的联结得如此紧密，以至于这种区分显得造作。"
          },
          {
            "en": "For instance, any account of why Anton Chekhov was such a great playwright could not separate his stagecraft and the humanity of what it represents.",
            "cn": "比如，任何关于安东·契诃夫何以是伟大剧作家的论述，都无法把他的舞台技艺与他所呈现的人性拆开来谈。"
          },
          {
            "en": "The problem with much didactic art is not that it contains lessons but that they are conveyed so crudely.",
            "cn": "许多说教艺术的问题不在于它含有教诲，而在于这些教诲被传达得如此笨拙。"
          },
          {
            "en": "Such works are not just bad art but poor pedagogical tools.",
            "cn": "这样的作品不只是坏艺术，也是糟糕的教学工具。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The relationship between intrinsic and extrinsic value is complex, and one of the problems of instrumentalisation is that it seeks to flatten and simplify it.",
            "cn": "内在价值与外在价值的关系是复杂的，而工具化的问题之一，就是它试图把这层关系压平、简化。"
          },
          {
            "en": "It encourages us to identify what is most useful, and then separate it from, and prioritise it above, what is of ultimate value.",
            "cn": "它怂恿我们识别出什么最有用，然后把它分离出来，置于终极价值之上。"
          },
          {
            "en": "In doing so, it often diminishes or destroys the very benefits it promises to maximise.",
            "cn": "这样做的时候，它常常削弱甚至摧毁它许诺要最大化的那些好处本身。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Take social connection.",
            "cn": "以社会连接为例。"
          },
          {
            "en": "I have just heard of a study that says that doing anything – even reading – is better for us when we do it with others than alone.",
            "cn": "我刚听说一项研究，说做任何事情——哪怕读书——与他人一起做都好过独自做。"
          },
          {
            "en": "This message is now widely broadcast and understood, so people know that conviviality is important for their mental and physical health.",
            "cn": "这类信息如今被广泛传播、广为接受，于是人们都知道：热闹的交往对身心健康很重要。"
          },
          {
            "en": "But one of the most valuable features of friendship and community is how they take us out of concern for ourselves and make us more aware of the needs of others.",
            "cn": "但友谊与共同体最有价值的特点之一，恰恰是它们把我们从对自己的关切中带出来，让我们更清楚地看见他人的需要。"
          },
          {
            "en": "To get the most out of socialising we need to do it in the right spirit, choosing to be with other people because we care for them and they for us, because we find them stimulating, because we enjoy being part of a collective experience or endeavour.",
            "cn": "要想从社交中获得最大收获，我们必须以对的精神去社交：选择与别人相处，是因为我们在乎他们、他们也在乎我们，是因为他们让我们如沐春风，是因为我们享受成为一段共同经历或共同事业的一部分。"
          },
          {
            "en": "So if we choose to mingle only for reasons of our personal wellbeing, we are probably not going to get the benefits that socialising usually brings.",
            "cn": "所以，如果我们只是出于个人福祉的原因去与人来往，我们多半得不到社交通常带来的那些好处。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Instrumentalisation has the illusion of efficiency because it promotes the direct pursuit of practical things that we all want.",
            "cn": "工具化有一种效率的错觉，因为它怂恿我们直接追求那些人人都想要的实际东西。"
          },
          {
            "en": "But often this turns out to be counterproductive.",
            "cn": "但这常常被证明是适得其反的。"
          },
          {
            "en": "More often than not, you will fail to get the claimed benefits of an activity if getting them becomes your primary motivation.",
            "cn": "在多数情形下，如果一项活动的好处本身成了你的首要动机，你反而得不到那些好处。"
          },
          {
            "en": "What look like shortcuts turn out to be short circuits, undermining what they seek to achieve.",
            "cn": "那些看似捷径的东西，结果证明是短路：它们破坏的，正是它们想达成的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If instrumentalisation is such a profound mistake, why have we made it?",
            "cn": "如果工具化是一个如此深刻的错误，我们为什么还会犯？"
          },
          {
            "en": "After all, we do not deliberately set out to strip meaning from our most valued activities or treat friends as psychic enhancers.",
            "cn": "毕竟，我们并不是蓄意要剥离自己最珍视的活动中的意义，也不是刻意要把朋友当作心理增强剂。"
          },
          {
            "en": "Instrumentalisation has its roots in several connected features of Western modernity.",
            "cn": "工具化的根，扎在西方现代性的几个彼此勾连的特征里。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The Enlightenment brought to fruition an idea of the primacy of the sovereign, autonomous individual, one that had deep roots in classical and Christian thought.",
            "cn": "启蒙运动让一个理念结出了果实：主权性的、自主的个体至高无上——这个理念在古典思想与基督教思想中都有很深的根。"
          },
          {
            "en": "Over the centuries, this idea has become a kind of common sense.",
            "cn": "几个世纪以来，这个理念已然成了一种常识。"
          },
          {
            "en": "Each person is supposed to be the master of their own destiny, the author of their own life story.",
            "cn": "每个人都被视为自己命运的主人、自己生命故事的作者。"
          },
          {
            "en": "Self-expression and self-determination are seen as essential for being an authentic self.",
            "cn": "自我表达与自我决定，被看作成为一个真实自我的必要条件。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Enlightenment thinkers were correct to promote greater individual freedom in an age when power was wielded by the few over a subjugated majority.",
            "cn": "在权力由少数人施加于被征服多数的时代，启蒙思想家们倡导更大的个人自由，是对的。"
          },
          {
            "en": "But human beings are also social animals and can never be entirely autonomous.",
            "cn": "但人也是社会性动物，永远不可能完全自主。"
          },
          {
            "en": "Modernity’s mistake is to lose sight of this, placing all the emphasis on personal liberty and not enough on our interdependence.",
            "cn": "现代性的错误在于丢失了这一点：把全部重心放在个人自由上，对我们彼此的相互依存却着墨太少。"
          },
          {
            "en": "This has led to an exaggeration of the importance of autonomy that has pushed the prizing of individuality too far.",
            "cn": "这导致对自主性的重要性的一种夸张，把对个体性的珍视推得过远。"
          },
          {
            "en": "The result is atomisation: a world in which our separateness from others has become excessive.",
            "cn": "其结果是原子化：在这个世界里，我们与他人的分离变得过度了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This atomised world has several features, all of which encourage instrumentalisation.",
            "cn": "这个原子化的世界有几个特征，全都在助长工具化。"
          },
          {
            "en": "First, it promotes an illusion of control.",
            "cn": "第一，它助长一种掌控的错觉。"
          },
          {
            "en": "Encouraged to feel autonomous, we lose sight of the fact that there is much over which we have no power.",
            "cn": "被鼓励去感到自主的我们，看不见这样一个事实：有太多事情并不在我们的权力之内。"
          },
          {
            "en": "The world unfolds, opening up opportunities and throwing spanners in the works in equally random measure.",
            "cn": "世界自行展开，随机地既打开机会，也往齿轮里扔扳手。"
          },
          {
            "en": "We are not even in full control of ourselves.",
            "cn": "我们甚至不能完全掌控自己。"
          },
          {
            "en": "We had no say in our fundamental constitutions: our dispositions, personalities, gifts and limitations.",
            "cn": "对我们的根本构成——气质、性格、天赋与局限——我们从未有过发言权。"
          },
          {
            "en": "We have no direct access to the hidden springs of thought and volition and cannot just choose what we like or what we believe.",
            "cn": "我们无法直接触及思想与意志的隐秘泉眼，不能想喜欢什么就喜欢什么，想相信什么就相信什么。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But primed to think of ourselves as free and autonomous, we imagine that we can manipulate the world to achieve whatever we want.",
            "cn": "但被预设去把自己看作自由而自主的我们，想象自己可以操纵世界，以达成任何我们想要的东西。"
          },
          {
            "en": "Happiness, health and success are all ours for the taking, just as long as we make the right choices.",
            "cn": "幸福、健康、成功，统统唾手可得——只要我们做出正确的选择。"
          },
          {
            "en": "And so the world becomes a series of levers to be pulled and buttons to be pushed, all to yield to our wills.",
            "cn": "于是，世界变成了一排排等待被扳动的杠杆、一颗颗等待被按下的按钮，一切都得屈服于我们的意志。"
          },
          {
            "en": "In short, everything can and must be a means to whatever ends we choose, because that is what we think self-determination requires.",
            "cn": "简言之，一切都可以、也必须成为通向我们选定目的的手段，因为在我们看来，自我决定就要求如此。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the era of late capitalism, our autonomous agency has increasingly been expressed through our status as consumers.",
            "cn": "在晚期资本主义时代，我们自主的行动力越来越通过消费者身份来表达。"
          },
          {
            "en": "Freedom is above all the choice of how to spend our money, with the promise that everything we need can be obtained in exchange for cash.",
            "cn": "自由首先是选择怎么花钱，并伴有一个承诺：我们需要的一切都能用现金换来。"
          },
          {
            "en": "The consumer mindset has affected how we relate to everything, not just the things we buy.",
            "cn": "这种消费者心态已经改变了我们与一切事物打交道的方式——不只是我们买的东西。"
          },
          {
            "en": "The result is that the world has become essentially transactional, meaning that everything is an instrument for getting something else.",
            "cn": "结果是，世界在本质上变得交易化了：一切都是获得别的东西的工具。"
          },
          {
            "en": "It is no coincidence that dating apps give the impression that we are shopping for partners because we approach even relationships with the consumer framing.",
            "cn": "交友软件给我们购物选伴侣般的印象，绝非偶然——因为我们正是带着消费者的框架去对待连人本身的关系。"
          },
          {
            "en": "Politics has also become a trade for votes in which the electorate and politicians believe that the winner takes all, like the highest bidder in an auction, and damn those who backed the losing side.",
            "cn": "政治也变成了一场选票的交易：选民与政客都相信赢者通吃，就像拍卖会上出价最高的人，至于支持落败一方的人，管他去死。"
          },
          {
            "en": "Democracy should be a way of managing competing demands, not giving the winners everything they want.",
            "cn": "民主应当是管理相争诉求的方式，而不是让赢家拿走他们想要的一切。"
          },
          {
            "en": "Voting should be about having your say, not getting your way.",
            "cn": "投票本应是让你有发言权，而不是让你得偿所愿。"
          },
          {
            "en": "But in the new consumer mindset, votes buy power, they no longer mandate responsibility.",
            "cn": "但在新的消费者心态里，选票购买的是权力，不再是责任的授权。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another deep cultural source of instrumentalisation is the reductionism that has surreptitiously seeped into our culture from natural science.",
            "cn": "工具化的另一个深层文化源头，是从自然科学悄悄渗入我们文化的还原论。"
          },
          {
            "en": "Reductionism is the idea that the way to understand how things work is to break them down into their constitutive parts.",
            "cn": "还原论是这样一种观念：要理解事物如何运作，就把它拆解成构成它的部件。"
          },
          {
            "en": "It’s an idea that served natural science well for centuries.",
            "cn": "几个世纪以来，这个理念很好地服务于自然科学。"
          },
          {
            "en": "But a clue as to its limitations comes in its relative failure in the social sciences.",
            "cn": "但它在社会科学中的相对失灵，暗示了它的局限。"
          },
          {
            "en": "Economies, societies and psychologies cannot be explained by simple mechanistic processes.",
            "cn": "经济体、社会与心灵，无法用简单的机械过程来解释。"
          },
          {
            "en": "We have learned that, even in the natural sciences, you can explain only so much by taking things apart, and that it is equally – sometimes more – important to see how systems work as a whole.",
            "cn": "我们已经明白：即便在自然科学里，靠拆解所能解释的也只有这么多；同样重要的——有时更重要——是看清系统作为整体如何运作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Behind much instrumentalisation is a crude reductionism that ignores systems and focuses on elements within it.",
            "cn": "工具化背后，常常站着一种粗糙的还原论：无视系统，只盯住系统中的元素。"
          },
          {
            "en": "The richness of an experience, such as being in the outdoors, is reduced to a means to stimulate blood flow or release hormones.",
            "cn": "一种体验的丰富性——比如置身户外——被还原为促进血液循环或释放激素的手段。"
          },
          {
            "en": "Art, which stirs a large variety of often conflicting emotions, is prized purely for its capacity to evoke certain good ones.",
            "cn": "艺术本会搅动多种多样、常常相互冲突的情绪，却被只因为它能唤起某些\"好\"情绪而受推崇。"
          },
          {
            "en": "Social bonds, which cause pain and heartache as well as joy, are reduced to sources of emotional support.",
            "cn": "社会联结既带来欢乐，也带来痛苦与心碎，却被还原为情绪支持的来源。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Combine an inflated belief in personal autonomy, a transactional consumer mentality and a reductionist attitude to how things work, and it is inevitable that we treat the world as a collection of resources we can plunder to promote our own wellbeing.",
            "cn": "把对个人自主的膨胀信念、交易化的消费者心态、以及看待事物如何运作的还原论态度合在一起，我们就不可避免地把世界当作一堆可以攫取的资源，用来增进自身的福祉。"
          },
          {
            "en": "The tragedy is that when we do so, we neglect rather than serve our deepest needs.",
            "cn": "悲剧在于：当我们这样做时，我们忽视的恰恰是——而非成全了——我们最深的需求。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "What would our culture look like if we were to reverse the instrumentalisation of everything?",
            "cn": "如果我们逆转这万物的工具化，我们的文化会是什么样子？"
          },
          {
            "en": "Of course, we would still do many things as means to ends.",
            "cn": "当然，我们仍会把许多事作为通向目的的手段来做。"
          },
          {
            "en": "We would also be happy to agree that many of the good things in life bring us instrumental benefits too.",
            "cn": "我们也会乐于承认：生活中许多好东西同样带给我们工具性的好处。"
          },
          {
            "en": "But we would see these as welcome side-effects, not their purposes.",
            "cn": "但我们会把这些看作受欢迎的副作用，而不是它们的目的。"
          },
          {
            "en": "A deinstrumentalised world would be one in which we would attend more to what is of value right here, right now.",
            "cn": "一个去工具化的世界，是一个我们更关注此时此地之价值的世界。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Take friendship.",
            "cn": "以友谊为例。"
          },
          {
            "en": "The personal benefits we get from others are real, but they should not be the reason for being with them.",
            "cn": "我们从他人那里得到的个人好处是真实的，但它们不应当是我们与之相处的理由。"
          },
          {
            "en": "Relationships are valuable because we value the people in them, not because spending time with them releases endorphins in our brains.",
            "cn": "关系之所以珍贵，是因为我们珍视关系中的人，而不是因为与他们共度时光会在我们脑内释放内啡肽。"
          },
          {
            "en": "David Hume corrected this error more than two centuries ago when he wrote: ‘I feel a pleasure in doing good to my friend, because I love him; but do not love him for the sake of that pleasure.’ To reject instrumentalisation is to understand that feeling good often follows from living well, but it is not what living well consists in.",
            "cn": "大卫·休谟在两个多世纪前就纠正过这个错误，他写道：\"我为朋友做好事，从中感到快乐，是因为我爱他；但我并不是为了那份快乐才爱他。\"拒绝工具化，就是理解到：感觉良好往往伴随着好好生活而来，但它并不是好好生活的构成本身。"
          }
        ]
      }
    ]
  },
  {
    "id": "gr-psyche-pretesting",
    "cat": "成长",
    "title": "The ‘secret strategy’ that could boost your ability to learn",
    "titleZh": "提升学习能力的「秘密策略」",
    "source": "Psyche · 2024-11-12",
    "date": "2024-11-12",
    "minutes": 12,
    "url": "https://psyche.co/ideas/the-secret-strategy-that-could-boost-your-ability-to-learn",
    "coverImg": "assets/covers/gr-psyche-pretesting.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "It may sound illogical, but growing evidence shows the benefits of testing yourself before you start learning new material",
            "cn": "听起来不合逻辑，但越来越多的证据表明，在开始学习新内容之前先考一考自己，大有好处。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Imagine you are planning to learn about the solar system but, before you start, your teacher gives you a multiple-choice quiz on the topic.",
            "cn": "想象一下：你打算学习太阳系的知识，但还没开始，老师就先给你做了一套关于这个主题的选择题测验。"
          },
          {
            "en": "You haven’t learned a single fact about the solar system yet, so the questions, such as ‘Which of our dwarf planets is not a plutoid?’ or ‘Which planet is the least dense in the solar system?’, leave you staring blankly.",
            "cn": "你对太阳系还一无所知，所以诸如\"我们的矮行星中哪一颗不是类冥天体？\"或\"太阳系中哪颗行星密度最小？\"这样的问题，只会让你一脸茫然。"
          },
          {
            "en": "Naturally, you are bound to make mistakes.",
            "cn": "当然，你注定会答错一片。"
          },
          {
            "en": "You might understandably feel that this guessing in the dark is a complete waste of time.",
            "cn": "你大概会觉得这种摸黑瞎猜完全是浪费时间——这也情有可原。"
          },
          {
            "en": "In fact, it’s not – a growing body of research shows this early test can significantly enhance your later learning.",
            "cn": "事实上并非如此——越来越多的研究表明，这次提前的测验能显著提升你之后的学习效果。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The potential of tests, not just for assessment, but also for learning, dates back at least as far as the 1920s when the psychologist Sidney Pressey developed his innovative typewriter-turned-testing machine.",
            "cn": "测验的潜力不只在于评估，还在于促进学习——这一思路至少可以追溯到20世纪20年代，当时心理学家西德尼·普雷西（Sidney Pressey）发明了一台由打字机改造而来的新颖测试机。"
          },
          {
            "en": "The machine presented a question with several possible answers, requiring students to press a key to submit their response.",
            "cn": "这台机器会呈现一道题和几个备选答案，学生需要按键提交自己的回答。"
          },
          {
            "en": "Pressey’s innovation was a feature that held the question in place until the correct answer was chosen, transforming the test into a learning experience.",
            "cn": "普雷西的创新在于一个功能：题目会一直留在机器上，直到选出正确答案为止——这让测验本身变成了一次学习体验。"
          },
          {
            "en": "Although it wasn’t widely adopted, his work anticipated what is now known about the huge benefits of testing for improving learning.",
            "cn": "尽管这台机器没有被广泛采用，但他的工作预示了如今我们已知的测验对提升学习的巨大好处。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The virtues of testing for improving recall and deepening learning have been widely researched, but the vast majority of studies have focused on the benefit of tests taken after studying.",
            "cn": "测验在改善记忆、深化学习方面的优点已被广泛研究，但绝大多数研究关注的都是学习之后的测验带来的好处。"
          },
          {
            "en": "Research from the 1960s was among the earliest to highlight the benefits of testing before learning – what is now called the ‘pretesting effect’ – and in recent years there has been a surge of interest in this counterintuitive effect.",
            "cn": "20世纪60年代的研究最早凸显了学习之前测验的好处——也就是如今所称的\"前测效应\"（pretesting effect）——而近年来，这种反直觉的效应引发了爆发式的关注。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Here’s what experiments into the pretesting effect typically look like.",
            "cn": "有关前测效应的实验通常是这样做的。"
          },
          {
            "en": "All participants eventually study the same new information, but half are asked to answer anywhere from one to several dozen questions about the material before they have had a chance to study it – usually without feedback on their largely incorrect guesses.",
            "cn": "所有参与者最终都会学习同样的新材料，但其中一半人要在学习之前先回答一道到几十道与材料相关的问题——通常也不会有人告诉他们，那些大多错误的猜测究竟对不对。"
          },
          {
            "en": "After all of the participants have studied the material, everyone then takes a final test to assess how well they’ve learned.",
            "cn": "等所有参与者都学完材料后，所有人再参加一次最终测试，以评估学习效果。"
          },
          {
            "en": "Even though that pretest might seem pointless (why spend valuable learning time making wrong guesses?), over and over again, experiments suggest that it is time well spent.",
            "cn": "尽管前测看上去毫无意义（为什么要用宝贵的学习时间去做错误的猜测？），实验却一再表明，这段时间花得值。"
          },
          {
            "en": "The pretest group typically outperforms the control group.",
            "cn": "前测组的表现通常好于对照组。"
          },
          {
            "en": "Even incorrect guessing followed by studying benefits learning.",
            "cn": "即便是猜错了再学习，也对学习有益。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "These benefits apply to simple materials, such as word pairs, and more complex ones, such as reading passages about physics or oceanography, watching videos on history or information theory, or attending live research-methods lectures.",
            "cn": "这些好处既适用于单词对这样的简单材料，也适用于更复杂的材料——比如阅读物理或海洋学的文章、观看历史或信息论的视频，或者现场听研究方法课。"
          },
          {
            "en": "And this holds true for children learning about space exploration and undergraduates studying psychology; in the laboratory and in the classroom; and whether answers are scribbled with a pen on paper or guessed on one’s laptop.",
            "cn": "无论是学太空探索的孩子还是学心理学的大学生；无论在实验室还是在课堂上；无论用笔在纸上写答案还是在笔记本电脑上猜答案——效果都成立。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Researchers believe pretesting is beneficial because it improves the way that we process the to-be-learned material.",
            "cn": "研究者认为，前测之所以有益，是因为它改善了我们对将学材料的加工方式。"
          },
          {
            "en": "‘We could talk for hours about the mechanism,’ says Steven Pan, a cognitive scientist at the National University of Singapore, who recently co-authored a review of the pretesting effect.",
            "cn": "\"关于其中的机制，我们能聊上好几个小时，\"新加坡国立大学的认知科学家史蒂文·潘（Steven Pan）说，他最近与人合写了一篇关于前测效应的综述。"
          },
          {
            "en": "‘Making a guess might trigger things.",
            "cn": "\"做出猜测可能会触发一些反应。"
          },
          {
            "en": "Make you more curious.’",
            "cn": "让你更好奇。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Increased attention to the to-be-learned material could be another factor.",
            "cn": "对将学材料投入更多注意，可能是另一个因素。"
          },
          {
            "en": "Pan and his colleagues have observed reduced mind-wandering after pretesting, and other researchers have shown that participants’ eyes focus more on sentences related to the questions they received in advance.",
            "cn": "潘和他的同事观察到，前测之后走神的情况减少了；其他研究者则发现，参与者的目光会更集中于与事先拿到的问题相关的句子。"
          },
          {
            "en": "Other potential mechanisms include an improved motivation to learn and that pretesting acts as a metacognitive ‘reality check’, highlighting what you do and do not know and encouraging you to fill in knowledge gaps.",
            "cn": "其他可能的机制还包括：学习动机的增强；以及前测扮演了元认知层面的\"现实检验\"角色——让你看清自己知道什么、不知道什么，促使你去填补知识空白。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Whatever the mechanism is, when you later need that information, you’re more likely to recall it after a pretest than if you had simply read it.",
            "cn": "无论机制为何，当你之后需要用到那条信息时，做过前测比只是单纯读过，更可能把它回忆起来。"
          },
          {
            "en": "As Pan explains: ‘If you have only read [the learning material], your chance of recalling that information is not zero, but it’s typically going to be less than if you had to make a guess first.’",
            "cn": "正如潘所解释的：\"如果你只是读过（学习材料），你回忆起那条信息的概率不是零，但通常会低于先做过一次猜测的情况。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Studies show that the benefits of pretesting can persist from one day to one week to several weeks, indicating that the advantages of a pretest extend well beyond the initial minutes following studying and that true learning is taking place.",
            "cn": "研究显示，前测的好处可以持续一天、一周乃至数周，这说明前测的优势远不止学习结束后的最初几分钟，而是发生了真正的学习。"
          },
          {
            "en": "What’s more, newer research suggests that the effect may actually grow stronger over time, meaning its potency could have been underestimated in the many studies that only measured learning shortly after the study session.",
            "cn": "更何况，较新的研究提示，这一效应可能随时间推移而变得更强——也就是说，在那些只在学完后不久就测量学习效果的众多研究里，它的威力可能被低估了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you want to try pretesting for yourself, keep in mind that it works best when the questions are focused on information that will be covered in what you’re about to learn.",
            "cn": "如果你想亲自试试前测，请记住：当问题聚焦于你即将学习的内容时，它最有效。"
          },
          {
            "en": "Though access to correct answers isn’t necessary for pretesting, feedback can still shape your learning experience and might be especially helpful when engaging with more complex learning materials.",
            "cn": "虽然前测并不需要你拿到正确答案，但反馈仍然能塑造你的学习体验，在学习更复杂的材料时可能尤其有用。"
          },
          {
            "en": "Faria Sana, a cognitive scientist at Athabasca University, explains that, in these cases, ‘feedback can scaffold learning and ensure that learners don’t reinforce errors.’",
            "cn": "阿萨巴斯卡大学的认知科学家法里亚·萨纳（Faria Sana）解释说，在这些情况下，\"反馈可以为学习搭起脚手架，确保学习者不会把错误固化下来\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Also, note that the benefits of pretesting can diminish when there is a delay between the test and the learning session.",
            "cn": "另外要注意，如果测验与学习之间隔了一段时间，前测的好处就会打折扣。"
          },
          {
            "en": "So make sure you take the pre-quiz shortly before engaging with the learning material.",
            "cn": "所以，务必在开始学习材料之前不久完成前测小测。"
          },
          {
            "en": "For example, if you’re about to watch a video, take a moment to answer a few pretest questions right before hitting that play button.",
            "cn": "比如，如果你正要看一个视频，就在按下播放键之前，花点时间答几道前测题。"
          },
          {
            "en": "For longer or more complex materials – such as an entire book chapter or a lengthier video – try guessing the answers to a few questions before each chapter section or video segment.",
            "cn": "对于更长或更复杂的材料——比如整章书或较长的视频——试着在每一节或每一段开始前，先猜一猜几个问题的答案。"
          },
          {
            "en": "This way, your guesses will be made shortly before you encounter the answers.",
            "cn": "这样，你的猜测就会恰好赶在遇到答案之前发生。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As for where to source your questions, you could consider using the questions that are often found at the end of textbook chapters or provided at the end of a lecture (be that online, or at a learning institution).",
            "cn": "至于去哪里找题目，你可以用教材章末常见的练习题，或者课程结尾给出的题目（无论线上课程还是教育机构里的课程）。"
          },
          {
            "en": "Another approach, if you’re studying from a book, is to ‘glance through and try to guess from the headings what information will be there.",
            "cn": "另一种办法，如果你读的是书，就是\"大致翻一遍，试着从标题猜猜里面会写些什么。"
          },
          {
            "en": "And then read and discover what’s actually in there,’ recommends Pan.",
            "cn": "然后再读，看看里面实际讲了什么。\"潘如此建议。"
          },
          {
            "en": "Alternatively, Sana suggests that you can ‘turn learning objectives into questions and attempt to answer them before exploring the content’ or you could generate your own questions based on what you expect to learn.",
            "cn": "或者，萨纳建议，你可以\"把学习目标变成问题，在探索内容之前先试着回答\"，也可以根据你预期要学的东西自己出题。"
          },
          {
            "en": "Pan adds: ‘You can even ask an artificial intelligence agent to help generate practice questions for you, then engage in pretesting with those questions.’",
            "cn": "潘补充道：\"你甚至可以让人工智能帮你生成练习题，然后用这些题来做前测。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The types of questions you choose can also influence the benefits you reap.",
            "cn": "你选择的题型也会影响你能收获多少好处。"
          },
          {
            "en": "Pretesting has been shown to work with a variety of question types, including multiple-choice, short-answer and fill-in-the-blank questions.",
            "cn": "已有证明，前测对多种题型都有效，包括选择题、简答题和填空题。"
          },
          {
            "en": "However, when learning similar and therefore easily confused material, such as distinguishing between the eight wrist bones or the various moons of Saturn, question type can make a difference.",
            "cn": "不过，当学习相似因而容易混淆的材料时——比如分辨八块腕骨，或土星那些形形色色的卫星——题型就可能带来差别。"
          },
          {
            "en": "A 2016 study found that including incorrect but closely related answer options in a multiple-choice test format can help direct your attention more broadly – both to the information necessary to answer the specific pretest questions and to the information related to the incorrect alternatives.",
            "cn": "2016年的一项研究发现，在选择题里放入错误但密切相关的备选项，能把你的注意力引向更广的范围——既指向回答具体前测题所需的信息，也指向与那些错误选项相关的信息。"
          },
          {
            "en": "Then, when you begin studying the learning material, this brief exposure to related information will help you notice and remember it better.",
            "cn": "这样，等你开始学习材料时，这些对相关信息的短暂接触会帮你更好地注意并记住它们。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For example, before reading a study text about Saturn, you might first answer a multiple-choice pretest that included a question about its moons (‘What is Saturn’s largest moon?",
            "cn": "比如，在读一篇关于土星的学习文章之前，你可以先做一道含有土星卫星问题的选择题前测，题目是：\"土星最大的卫星是哪一颗？"
          },
          {
            "en": "a.",
            "cn": "甲、"
          },
          {
            "en": "Titan, b.",
            "cn": "土卫六（Titan）；乙、"
          },
          {
            "en": "Rhea, c.",
            "cn": "土卫五（Rhea）；丙、"
          },
          {
            "en": "Mimas; answer: Titan).",
            "cn": "土卫一（Mimas）。答案：土卫六。"
          },
          {
            "en": "This would prompt you to pay more attention to information about the largest moon (ie, Titan) and also to information about the other moons.",
            "cn": "这会促使你更加关注关于最大卫星（即土卫六）的信息，同时也会更关注其他卫星的信息。"
          },
          {
            "en": "‘Then, if you were asked about the second-largest moon later, you would be better equipped to answer “Rhea”,’ explains Jeri Little, a cognitive scientist at California State University, East Bay and co-author of the study.",
            "cn": "\"之后如果问到第二大的卫星，你会更有把握答出'土卫五'，\"该研究的合著者、加州州立大学东湾分校的认知科学家杰丽·利特尔（Jeri Little）解释道。"
          },
          {
            "en": "In contrast, it would be less effective to take a pretest that required only short-answer questions.",
            "cn": "相比之下，只用简答题做前测，效果就没那么好。"
          },
          {
            "en": "This would focus your attention solely on the specific question and its answer, making those questions less effective for promoting the learning of related material.",
            "cn": "它只会把你的注意力集中在那道题及其答案上，对促进相关材料的学习就没那么有效。"
          },
          {
            "en": "For example, if your pretest included the question ‘What is Saturn’s largest moon?’ in a short-answer format, the pretesting effect would be limited to the correct answer (ie, Titan) without broadening your attention to think about Mimas or Rhea.",
            "cn": "比如，如果你的前测用简答题问\"土星最大的卫星是什么？\"，前测效应就会局限于正确答案（即土卫六），而不会把你的注意力扩展到土卫一或土卫五上。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Scientists see pretesting as particularly useful for learning concrete concepts or facts, such as ‘Titan is Saturn’s largest moon.’ Although research has shown that pretesting can extend to procedural knowledge – such as the recent study in which individuals who attempted a medical procedure before watching a training video subsequently performed the procedure more quickly and with fewer errors than those who only watched the video – this area of research is in its early stages.",
            "cn": "科学家认为，前测对学习具体概念或事实尤其有用，比如\"土卫六是土星最大的卫星\"。尽管研究显示前测也能延伸到程序性知识——比如最近有一项研究：先尝试操作某项医疗程序再看教学视频的人，之后执行该程序比只看视频的人更快、更少出错——但这一研究领域还处于早期阶段。"
          },
          {
            "en": "Another guessing-based strategy that has proven effective, often in group learning, is known as ‘productive failure’.",
            "cn": "另一种已证明有效的、基于猜测的策略常用于小组学习，名叫\"有效失败\"（productive failure）。"
          },
          {
            "en": "In subjects like mathematics, it involves encouraging learners to attempt solving problems before receiving formal instruction – and again there’s evidence that this form of guessing can result in better outcomes than instruction alone.",
            "cn": "在数学这类学科中，它鼓励学习者在接受正式讲解之前先尝试解题——同样有证据表明，这种形式的猜比起单纯听讲能带来更好的结果。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Pretesting, a strategy with almost no downsides, is unlikely to detract from any traditional post-learning tests you take and will likely improve your overall learning process.",
            "cn": "前测几乎没有坏处，不太可能拖累你之后参加的任何传统测验，反而可能改善你的整体学习过程。"
          },
          {
            "en": "Given all the evidence for pretesting, you might wonder why it isn’t more commonly used.",
            "cn": "面对前测的种种证据，你也许会问：它为什么没有被更广泛地使用？"
          },
          {
            "en": "The truth is, we often fail to recognise just how helpful pretesting can be, even after experiencing its benefits firsthand.",
            "cn": "真相是，即便亲身受益之后，我们也常常意识不到前测到底有多大帮助。"
          },
          {
            "en": "That’s why Pan calls it a ‘secret strategy’.",
            "cn": "所以潘把它称为一个\"秘密策略\"。"
          },
          {
            "en": "In his teaching, he likes to open with a thoughtful question to ‘spark thinking about the lesson that is to follow’.",
            "cn": "在教学中，他喜欢用一个引人深思的问题开场，\"为接下来的课程点燃思考\"。"
          },
          {
            "en": "With growing evidence in its favour, why not join Pan and others and give this secret strategy a try?",
            "cn": "支持它的证据越来越多，何不加入潘和其他人的行列，亲自试试这个秘密策略？"
          }
        ]
      }
    ]
  },
  {
    "id": "gr-sivers-building-without-predicting",
    "cat": "成长",
    "title": "Building without predicting",
    "titleZh": "不靠预测来建造",
    "source": "Derek Sivers · 2026-08-18",
    "date": "2026-08-18",
    "minutes": 9,
    "url": "https://sive.rs/fit",
    "coverImg": "assets/covers/gr-sivers-building-without-predicting.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "On a podcast , I briefly mentioned that I’m building my dream house without predicting - by living in a bare cabin in the woods, then adding only what I find I actually need .",
            "cn": "在一个播客里，我顺口提到自己正在不靠预测地建造梦想中的房子——先住进林间一间空荡荡的小木屋，然后只添置我发现自己真正需要的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Apparently it was intriguing, because since then, it’s been my most frequently asked question: “How’s your house going?” I didn’t think this would interest total strangers, but enough people have asked, so here’s the story.",
            "cn": "看来这话引起了大家的兴趣，因为从那以后，被问得最多的就是它：\"你的房子建得怎么样了？\"我原以为陌生人不会对此感兴趣，但问的人实在不少，于是就有了这篇文章。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I hope you can apply it metaphorically to your own projects or life choices.",
            "cn": "希望你能把它当作一个隐喻，用在自己的项目或人生选择上。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It starts with a maxim:",
            "cn": "一切始于一句格言："
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "All buildings are predictions.",
            "cn": "所有的建筑都是预测。"
          },
          {
            "en": "All predictions are wrong.",
            "cn": "所有的预测都是错的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "How do you build without predicting?",
            "cn": "不做预测，怎么建造？"
          },
          {
            "en": "Defer decisions.",
            "cn": "推迟决定。"
          },
          {
            "en": "Start using what’s there.",
            "cn": "先用起现成的东西。"
          },
          {
            "en": "Discover actual needs.",
            "cn": "发现真实的需求。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When you catch yourself thinking “We’ll need this,” stop and say, “Let’s find out what we really need.”",
            "cn": "当你发现自己冒出\"我们会需要这个\"的念头时，停下来，改口说：\"先弄清楚我们到底需要什么。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A fabled example: They built a new park and argued about where to put the walkways.",
            "cn": "一个经典案例：人们新建了一座公园，为步道修在哪里争论不休。"
          },
          {
            "en": "Around the edges?",
            "cn": "沿着边缘？"
          },
          {
            "en": "Through the middle?",
            "cn": "穿过中央？"
          },
          {
            "en": "The winning answer: Open the park with no walkways .",
            "cn": "最优答案是：公园开放时一条步道都不修。"
          },
          {
            "en": "After a year, look where people have been walking.",
            "cn": "一年之后，去看看人们都从哪里走。"
          },
          {
            "en": "Find paths where the grass is worn away.",
            "cn": "找到那些草被踩秃的地方。"
          },
          {
            "en": "Pave there.",
            "cn": "就在那里铺路。"
          },
          {
            "en": "Don’t predict.",
            "cn": "不要预测。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’ve preached that idea for decades.",
            "cn": "这个理念我已经讲了十几年。"
          },
          {
            "en": "Then a few years ago, I bought a piece of land for dirt cheap here in New Zealand - just 30 minutes away - and applied that idea to building a home for me and my son.",
            "cn": "几年前，我在新西兰以极便宜的价钱买下一块地——离这里只有30分钟路程——并把那个理念用在了为我和儿子建房子这件事上。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "How do you build a home without predicting?",
            "cn": "不靠预测，怎么建一个家？"
          },
          {
            "en": "By living in an unfurnished, unfinished place, adding only what you’ve proven you need or want.",
            "cn": "住进一个没有家具、尚未完工的地方，只添置那些你已证明自己需要或想要的东西。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s a fun philosophical experiment, testing what you really need.",
            "cn": "这是一场有趣的哲学实验：检验你到底需要什么。"
          },
          {
            "en": "Especially when costs are high, it raises the bar on that word: “need”.",
            "cn": "尤其当代价高昂时，它会抬高\"需要\"这个词的门槛。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "(Note: I will say “I” and “my”, but my teenage son was very involved in most of these decisions, and loves this place even more than I do.)",
            "cn": "（说明：下文我会说\"我\"和\"我的\"，但其实大多数决定都有我十几岁儿子的深度参与，他比我更喜欢这个地方。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "My land is an off-grid forest valley with a creek running through the middle.",
            "cn": "我的地是一处离网的森林山谷，一条小溪从中间流过。"
          },
          {
            "en": "No buildings, no electricity or services.",
            "cn": "没有建筑，没有电，也没有任何市政管线。"
          },
          {
            "en": "Just land.",
            "cn": "只有土地。"
          },
          {
            "en": "So I really started from scratch.",
            "cn": "所以我是真正从零开始的。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For two years, before building anything, we spent time there in all seasons, finding our favorite spots.",
            "cn": "动工之前的两年里，我们四季都去那里待，寻找自己最喜欢的角落。"
          },
          {
            "en": "We built a path through our forest.",
            "cn": "我们在林子里修了一条小径。"
          },
          {
            "en": "Twice, we came face-to-face with a wild boar .",
            "cn": "有两次，我们和一头野猪打了照面。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I slept outside, so I know I need a roof, walls, and great insulation - about 4 by 8 meters.",
            "cn": "我睡过露天，所以我知道自己需要屋顶、墙和很好的保温——大约4米乘8米。"
          },
          {
            "en": "I bought a used, pre-made, well-insulated 4 by 8 cabin .",
            "cn": "我买了一间二手的预制小木屋，4米乘8米，保温很好。"
          },
          {
            "en": "Because they were on a clearance sale, I bought three more, so now we have four adjacent cabins for four purposes:",
            "cn": "因为赶上清仓甩卖，我又买了三间——现在我们有四间相邻的小木屋，派四种用场："
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "for sleeping",
            "cn": "一间用来睡觉"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "for me (where I spend most waking hours)",
            "cn": "一间给我（我大部分清醒的时间都在这里度过）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "for him (where my son does whatever he wants)",
            "cn": "一间给他（我儿子想干什么就干什么的地方）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "for storage or future living.",
            "cn": "一间储物，或留作日后的住处。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I love the isolation of purposes.",
            "cn": "我喜欢这种用途分离。"
          },
          {
            "en": "When I go into my cabin, it’s time to work.",
            "cn": "走进我的小屋，就是工作时间。"
          },
          {
            "en": "When we go into the sleeping cabin, it’s time for bed.",
            "cn": "走进睡觉的小屋，就该上床了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I slept on the floor, so I know I need a mattress and blankets.",
            "cn": "我睡过地板，所以我知道自己需要床垫和毯子。"
          },
          {
            "en": "I bought a mattress and blankets and started living there .",
            "cn": "我买了床垫和毯子，开始住在那里。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I tried living without electricity, then planned on going solar-only, but I decided to get fast fiber internet.",
            "cn": "我试过不用电生活，后来计划只用太阳能，但最终还是决定接入高速光纤网络。"
          },
          {
            "en": "Since I was digging a trench for the fiber optic cables to run from the road to my house, it made sense to get electric service.",
            "cn": "反正要为光纤挖一条从公路通到房子的沟渠，顺便接通电也很合理。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "These ideas are from the book “How Buildings Learn” by Stewart Brand .",
            "cn": "这些想法来自斯图尔特·布兰德（Stewart Brand）的《建筑如何学习》（How Buildings Learn）一书。"
          },
          {
            "en": "For 20 years, it’s been a huge influence on my code, my life choices, and now on building my home.",
            "cn": "二十年来，它深刻影响了我的代码、我的人生选择，如今又影响着我如何建造自己的家。"
          },
          {
            "en": "If you find this fascinating or crazy, go read that book .",
            "cn": "如果你觉得这一切迷人也够疯狂，去读读那本书吧。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It makes a powerful point about water:",
            "cn": "书里关于水有一个非常有力的论点："
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "“Water consumes wood, erodes masonry, corrodes metals, peels paint, and expands when it freezes.",
            "cn": "\"水吞噬木头，侵蚀砖石，锈蚀金属，剥落油漆，冻结时还会膨胀。"
          },
          {
            "en": "It warps, swells, discolors, rusts, loosens, mildews, and stinks.",
            "cn": "它让房屋扭曲、鼓胀、变色、生锈、松动、发霉、发臭。"
          },
          {
            "en": "Houses deteriorate from the bathroom out.”",
            "cn": "房子是从浴室开始烂掉的。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Heeding his warning, I made a rule of no water inside .",
            "cn": "我听从了他的警告，定下一条规矩：屋里不放水。"
          },
          {
            "en": "Anything with water stays outside the cabins.",
            "cn": "凡是带水的东西，都留在小屋之外。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Outdoor showers, I’ve always loved, so now it’s all I’ve got.",
            "cn": "户外淋浴我一直很喜欢，所以现在我就只有它了。"
          },
          {
            "en": "A simple hose shower that runs the water through a heater.",
            "cn": "一根简单的软管淋浴，让水流经加热器。"
          },
          {
            "en": "Uncovered, so at night I shower while looking at the stars.",
            "cn": "没有顶棚，所以夜里我可以边淋浴边看星星。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Outdoor kitchen, holding an umbrella while cooking in the rain, proved I needed a roof.",
            "cn": "户外厨房——在雨里打着伞做饭——证明了我需要一个屋顶。"
          },
          {
            "en": "Thin walls and a floating roof so the wind can circulate but keeps away the rain.",
            "cn": "薄墙加悬浮式屋顶，风可以流通，雨却进不来。"
          },
          {
            "en": "Wonderful except in winter, but a few minutes of cold hands are worth it for no fumes or smoke in the home.",
            "cn": "除了冬天都很好受；手上冷几分钟，换来家里没有油烟和烟气，值了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Outdoor bathroom, can I handle that?",
            "cn": "户外厕所，我能受得了吗？"
          },
          {
            "en": "I tried peeing outside for a month and it was fine.",
            "cn": "我试着在户外小便了一个月，完全没问题。"
          },
          {
            "en": "I built the same structure as the kitchen.",
            "cn": "我建了和厨房一样的结构。"
          },
          {
            "en": "It’s actually really nice in there in a rainstorm.",
            "cn": "暴雨天人待在里面其实特别舒服。"
          },
          {
            "en": "Got a composting toilet instead of flushing, which saves a lot of water.",
            "cn": "用堆肥马桶代替冲水马桶，省下大量的水。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Remember, my land is “off-grid” so I have no water supply, and no wastewater service.",
            "cn": "别忘了，我的地是\"离网\"的，所以没有供水，也没有污水处理服务。"
          },
          {
            "en": "My only water source is collecting the rain from my roof.",
            "cn": "我唯一的水源是收集屋顶上的雨水。"
          },
          {
            "en": "Gutters and tanks, and good water filtration.",
            "cn": "排水槽、储水罐，再加上良好的过滤。"
          },
          {
            "en": "Later I added a reverse osmosis water filter for drinking.",
            "cn": "后来又添了一台反渗透净水器，专门管饮用水。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Another nice thing about having the cabins, kitchen, and bathroom all separated, is that it keeps you going outside almost every hour .",
            "cn": "小屋、厨房、厕所彼此分开还有个好处：几乎每个钟头你都得出门走一趟。"
          },
          {
            "en": "It snaps you out of your thoughts and into the real physical world of trees, birds, wind and weather.",
            "cn": "它把你从思绪里拽出来，拉进树木、飞鸟、风与天气这个真实的物理世界。"
          },
          {
            "en": "Every night at dusk, the owls start their beautiful “hoo-hoo ...",
            "cn": "每天黄昏，猫头鹰就开始了它们那动听的\"呜呼、呜呼……"
          },
          {
            "en": "hoo-hoo”.",
            "cn": "呜呼\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This is a cold dark valley so I wanted a sauna for sanity, pleasure, and health.",
            "cn": "这是一个又冷又暗的山谷，所以我想要一间桑拿房——为了清醒、愉悦和健康。"
          },
          {
            "en": "Glenn Auerbach from Sauna Times designed a great little two-person sauna for us.",
            "cn": "Sauna Times 的格伦·奥尔巴赫（Glenn Auerbach）为我们设计了一间很棒的小型双人桑拿房。"
          },
          {
            "en": "Now it’s my nightly ritual : Hot sauna, 82°C for 21 minutes , then shower, then bed.",
            "cn": "现在这是我每晚的仪式：82摄氏度的热桑拿蒸21分钟，然后冲澡，然后睡觉。"
          },
          {
            "en": "Coming straight from the sauna makes the outdoor shower more appealing on cold nights.",
            "cn": "冷夜里从桑拿房出来直接去冲户外淋浴，反而更叫人期待。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I hate hanging laundry, so I got a washer and dryer.",
            "cn": "我讨厌晾衣服，所以买了洗衣机和烘干机。"
          },
          {
            "en": "But I’m happy to do dishes, so no dishwasher.",
            "cn": "但我很乐意洗碗，所以没买洗碗机。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Do I need hot water in the sink?",
            "cn": "水槽需要热水吗？"
          },
          {
            "en": "I went without it for a year, and found I never needed hot water - only cold or boiling.",
            "cn": "我一年没用热水，结果发现自己从来不需要温水——要么冷水，要么滚水。"
          },
          {
            "en": "So instead of an expensive water heater, I keep a kettle by the sink for dishes and tea.",
            "cn": "于是我没有买昂贵的热水器，而是在水槽边放一把水壶，洗碗泡茶都用它。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And no built-in appliances - only portable, for easy changes.",
            "cn": "也不用任何嵌入式电器——只买可移动的，方便日后调整。"
          },
          {
            "en": "I design for maintenance, not appearances, so all conduit and pipes are exposed.",
            "cn": "我按\"易于维护\"而不是\"好看\"来设计，所以所有线管和管道都是明装的。"
          },
          {
            "en": "Nothing hidden.",
            "cn": "什么都不藏。"
          },
          {
            "en": "That said, I planted privacy bushes around the perimeter, since, y’know, I like to shower naked.",
            "cn": "话虽如此，我在四周种了一圈绿篱——毕竟，你懂的，我喜欢光着身子洗澡。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The story continues, but that’s enough.",
            "cn": "故事还在继续，但写到这里就够了。"
          },
          {
            "en": "For each choice , like where to put lights, the process is:",
            "cn": "每一个选择——比如灯装在哪里——流程都是这样："
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Try to do without it.",
            "cn": "先试试没有它行不行。"
          },
          {
            "en": "Stop here if possible.",
            "cn": "如果可以，就到此为止。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Try a cheap portable fix , like a flashlight or lantern.",
            "cn": "再试一个便宜的、可移动的替代方案，比如手电筒或提灯。"
          },
          {
            "en": "Stop here if possible.",
            "cn": "能到此为止，就到此为止。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Test a simple flexible solution, easy to maintain and change.",
            "cn": "然后试一种简单灵活、易于维护和更换的方案。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We’ve been living here full-time for a year and it’s really ideal.",
            "cn": "我们已经在这里全职住了一年，真的非常理想。"
          },
          {
            "en": "It feels like custom tailored clothing .",
            "cn": "感觉就像量身定制的衣服。"
          },
          {
            "en": "Instead of generic “one size fits all”, it’s a house that perfectly fits our unique preferences and values.",
            "cn": "不是通用的\"均码\"，而是一栋完全贴合我们独特偏好与价值观的房子。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A neighbor came by for the first time and really hated it , getting all upset and yelling, saying I was crazy for not having his preferred comforts.",
            "cn": "一位邻居第一次来做客，非常看不惯，气得大喊大叫，说我没有他喜欢的那些舒适设施，简直是疯了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I love that this home feels wrong for others, and just right for us .",
            "cn": "我喜欢这栋房子在别人眼里的\"不对劲\"，和在我们眼里的\"刚刚好\"。"
          },
          {
            "en": "(Kind of like my software and other life choices .) It’s a fun ongoing experiment and reminder to challenge all predictions .",
            "cn": "（有点像我的软件和其他人生选择。）这是一场持续进行的有趣实验，也提醒我去挑战一切预测。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "(I have not taken any photos of the house, because I don’t care how it looks, and I almost never take photos of anything.)",
            "cn": "（我没有拍过房子的照片，因为我不在乎它长什么样，而且我几乎从不给任何东西拍照。）"
          }
        ]
      }
    ]
  },
  {
    "id": "so-bbc-kindness-trolls",
    "cat": "社会",
    "title": "‘It feels like a calling’: The internet vigilantes who weaponise kindness",
    "titleZh": "「这像一种使命」：把善意变成武器的网络义警",
    "source": "BBC Future · 2026-09-22",
    "date": "2026-09-22",
    "minutes": 10,
    "url": "https://www.bbc.com/future/article/20260922-kindness-trolls-the-internet-vigilantes-who-weaponise-kindness",
    "coverImg": "assets/covers/so-bbc-kindness-trolls.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "Social media is often seen as a mirror for human cruelty.",
            "cn": "社交媒体常被看作人性之恶的一面镜子。"
          },
          {
            "en": "One man built a TikTok army of 500,000 to fix it.",
            "cn": "有一个人组建了一支50万人的 TikTok 大军来改变这一点。"
          },
          {
            "en": "Their weapon: kindness.",
            "cn": "他们的武器是：善意。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Every day, Laura Tigeleiro of Staten Island, New York, would open TikTok to a sea of hatred.",
            "cn": "每天，纽约州斯塔滕岛的劳拉·蒂格莱罗（Laura Tigeleiro）打开 TikTok，扑面而来的都是仇恨。"
          },
          {
            "en": "\"Everyone was making fun of my eye,\" she says.",
            "cn": "\"大家都在取笑我的眼睛，\"她说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Tigeleiro has multiple sclerosis, an autoimmune disease that's made one of her piercing blue eyes droop sideways.",
            "cn": "蒂格莱罗患有多发性硬化症，一种自身免疫疾病，让她一只澄澈的蓝眼睛向一侧下垂。"
          },
          {
            "en": "\"I just wanted to share healthy recipes, and maybe make some friends,\" she says.",
            "cn": "\"我只是想分享一些健康食谱，也许交几个朋友，\"她说。"
          },
          {
            "en": "\"But they said terrible things.",
            "cn": "\"可他们说了一些很难听的话。"
          },
          {
            "en": "It really hurt.\" Then, last March, her phone exploded, and everything changed.",
            "cn": "真的很受伤。\"然后，去年三月，她的手机爆了，一切都变了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One of her videos had gone viral, with over 15,000 friendly comments.",
            "cn": "她的一条视频走红了，收到一万五千多条友善的评论。"
          },
          {
            "en": "\"I didn't know what was going on.",
            "cn": "\"我不知道发生了什么。"
          },
          {
            "en": "I was shocked,\" says Tigeleiro.",
            "cn": "我惊呆了，\"蒂格莱罗说。"
          },
          {
            "en": "Days later, she figured it out: she was under attack by the Kindness Mob.",
            "cn": "几天后她才弄明白：她被\"善意暴徒\"（Kindness Mob）\"围攻\"了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The Kindness Mob is a TikTok channel run by Tyler Brickley, a digital marketer from Kansas City, US, who started the project in 2023.",
            "cn": "\"善意暴徒\"是一个 TikTok 频道，运营者是美国堪萨斯城的数字营销人泰勒·布里克利（Tyler Brickley），他在2023年发起了这个项目。"
          },
          {
            "en": "\"It's a form of trolling,\" he says.",
            "cn": "\"这是一种'黑'人的形式，\"他说。"
          },
          {
            "en": "Every day, Brickley points his half-a-million followers at someone who's being bullied or overlooked, and has them flood the target with kind comments.",
            "cn": "每天，布里克利都会把这50万粉丝的火力对准某个正在被欺凌或被忽视的人，让他们用善意的评论把对方淹没。"
          },
          {
            "en": "\"We're hijacking the machinery of online harassment,\" like coordination and anonymity, and using them for benevolence.",
            "cn": "\"我们是在劫持网络骚扰的机器\"——比如组织性和匿名性——然后把这些机器用来行善。"
          },
          {
            "en": "\"And I gotta say, it works.\"",
            "cn": "\"而且我得说，真的管用。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There's something more interesting here than people being nice.",
            "cn": "这里有些比\"人们对人和气\"更有意思的东西。"
          },
          {
            "en": "When the mob descends, the bullying often stops, sometimes forever.",
            "cn": "当\"暴徒\"们从天而降，欺凌常常就此停止，有时是永远停止。"
          },
          {
            "en": "It's an example of what scholars call \"social contagion theory\", where positive or negative behaviour spreads from person to person like a virus.",
            "cn": "这是学者们所说的\"社会传染理论\"的一个例子：正面或负面的行为，会像病毒一样在人与人之间传播。"
          },
          {
            "en": "Leading researchers tell me Brickley's movement demonstrates how we might change the tide not just of an internet platform, but perhaps an entire culture.",
            "cn": "多位顶尖研究者告诉我，布里克利的运动证明了：我们或许不仅能扭转一个互联网平台的风向，甚至可能扭转一整个文化。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"This type of online behaviour is wonderful, but of course, we need more,\" says Nicholas Christakis, professor of social and natural science at Yale University.",
            "cn": "\"这类网上行为很美好，当然，我们需要更多，\"耶鲁大学社会与自然科学教授尼古拉斯·克里斯塔基斯（Nicholas Christakis）说。"
          },
          {
            "en": "\"It's possible that this Kindness Mob is creating an opportunity for people to take initial steps towards the more substantial contributions we'll have to make if we're going to correct the deficiencies in our society.\"",
            "cn": "\"这支善意暴徒有可能正在创造一个机会，让人们迈出最初的一步，走向那些更有分量的贡献——如果我们要纠正这个社会的种种缺陷，这些贡献是必须的。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"On 1 January 2023, I was thinking about momentum,\" says Brickley.",
            "cn": "\"2023年1月1日，我在琢磨'势头'这件事，\"布里克利说。"
          },
          {
            "en": "\"It just feels like a lot of people leaving negative comments don't really mean it\".",
            "cn": "\"很多留下恶评的人，感觉并不是真的恶意\"。"
          },
          {
            "en": "They're following a crowd.",
            "cn": "他们只是在跟风。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"That was the lightbulb moment,\" Brickley says.",
            "cn": "\"那就是灵光一现的时刻，\"布里克利说。"
          },
          {
            "en": "\"I thought, what if I start a channel where I get 10 people in a little club, and we flood the comments with positivity to tip the scales?\"",
            "cn": "\"我想，要是我开一个频道，拉10个人组成一个小俱乐部，用善意的评论去刷屏，会怎么样？\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Ten was modest.",
            "cn": "十个人，只是个小起点。"
          },
          {
            "en": "By Brickley's count, he's organised 350 mobs, and the average video gets 1,000 comments.",
            "cn": "据布里克利统计，他已经组织了350次\"围攻\"，平均每条视频能收到1000条评论。"
          },
          {
            "en": "Successful posts generate tens of thousands or more, and pull in millions of views.",
            "cn": "成功的帖子能收到数以万计甚至更多的评论，并带来数百万的浏览量。"
          },
          {
            "en": "In one recent mob, the celebrity socialite Paris Hilton joined in.",
            "cn": "在最近的一次行动中，名媛帕丽斯·希尔顿（Paris Hilton）也加入了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Often, the mobsters discover they love the account they're attacking and stick around.",
            "cn": "很多时候，这些\"暴徒\"会发现自己喜欢上了被\"围攻\"的账号，从此留了下来。"
          },
          {
            "en": "It changes people's lives.",
            "cn": "这会改变人的生活。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Renee Penick, a grandmother from Ohio, US, says she was at her husband's hospital bed when the Mob visited.",
            "cn": "美国俄亥俄州一位祖母蕾妮·佩尼克（Renee Penick）说，暴徒们\"造访\"她时，她正守在丈夫的病床边。"
          },
          {
            "en": "It gave her strength in a crisis and built an entire community around her videos.",
            "cn": "那在危机中给了她力量，并为她的视频建立起一整个社群。"
          },
          {
            "en": "Nocturne, a musician from upstate New York, says the mob brought her so many new fans that she's about to go on tour.",
            "cn": "来自纽约州北部的音乐人诺克恩（Nocturne）说，那次\"围攻\"给她带来了太多新粉丝，她即将开启巡演。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After Brickley turned his army on Tigeleiro, she gained so many new followers that TikTok started paying her.",
            "cn": "布里克利的大军转向蒂格莱罗之后，她涨了太多粉，TikTok 都开始给她付钱了。"
          },
          {
            "en": "She says she made enough money to buy her family a much-needed new car.",
            "cn": "她说自己赚到的钱足够给家里买一辆急需的新车。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"I dreamed of a better life, and Tyler gave me that chance,\" Tigeleiro says.",
            "cn": "\"我梦想过更好的生活，泰勒给了我这个机会，\"蒂格莱罗说。"
          },
          {
            "en": "\"I owe it all to him, but he'd disagree with that.\"",
            "cn": "\"这一切都归功于他——但他不会同意这个说法。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Brickley, meanwhile, goes out of his way to keep the work hidden from the Kindness Mob's targets.",
            "cn": "而布里克利则刻意让这一切避开\"善意暴徒\"行动对象的视线。"
          },
          {
            "en": "\"We're not the point of the story.",
            "cn": "\"我们不是故事的重点。"
          },
          {
            "en": "The point is to remove the distraction, to get all these hateful comments out of the way so the person's content can shine through.\"",
            "cn": "重点是移走干扰，把那些恶评统统清开，让这个人的内容得以发光。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "When people talk to me about the darkness that's so familiar online, they describe the internet like a mirror – a system that simply reflects the natural cruelty of the human spirit.",
            "cn": "当人们跟我谈起网络上那种再熟悉不过的黑暗时，他们把互联网描述成一面镜子——一个只会映照人性天然之恶的系统。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "However, Christakis says that's a misread of what's happening on social media.",
            "cn": "然而克里斯塔基斯说，这是对社交媒体上真实情况的误读。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Yes, we humans evolved to be mendacious and tribal, and evil and harmful,\" he says.",
            "cn": "\"是的，我们人类在演化中确实变得虚伪而部落化，会作恶、会伤害人，\"他说。"
          },
          {
            "en": "\"But equally, we evolved to be good; to manifest qualities of love and friendship, and kindness and teaching.\"",
            "cn": "\"但同样地，我们也在演化中变得善良；我们会展现爱、友谊、善意与互助。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "As Christakis argues in his book Blueprint: The Evolutionary Origins of a Good Society, these good qualities must outweigh the bad in our natural state.",
            "cn": "正如克里斯塔基斯在《蓝图：好社会的演化起源》（Blueprint: The Evolutionary Origins of a Good Society）一书中所论证的，在自然状态下，这些好的品质必定压过坏的。"
          },
          {
            "en": "Otherwise, humans would have learned to live in isolation rather than in societies where we're constantly exposed to each other.",
            "cn": "否则，人类早该学会离群索居，而不是生活在彼此不断互动的社会里。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Social media hijacks these ancient, friendly, pro-social qualities\", he says, both by introducing anonymity, and through algorithms that highlight conflict and strife to drive engagement and keep us staring at our phones.",
            "cn": "\"社交媒体劫持了这些古老的、友善的、亲社会的品质\"，他说——一方面引入匿名，另一方面用算法放大冲突与争斗来驱动用户参与，让我们盯着手机不放。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In other words, Christakis says the Kindness Mob's work is sidestepping the perverse influence of social media and encouraging a more \"natural\" kind of pleasant interaction.",
            "cn": "换句话说，克里斯塔基斯认为，善意暴徒做的事，是在绕开社交媒体的扭曲影响，鼓励一种更\"自然\"的愉快互动。"
          },
          {
            "en": "After all, most adults wouldn't waltz into a stranger's house and insult their appearance, the way so many people do in the comments of a video.",
            "cn": "毕竟，大多数成年人不会径直闯进陌生人的家里羞辱对方的长相——可那么多人每天在网上就这么干。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It could have positive knock-on effects.",
            "cn": "这可能带来正向的连锁效应。"
          },
          {
            "en": "\" We showed experimentally that you can create these cascades of kindness,\" says Christakis of his research.",
            "cn": "\"我们用实验证明：你可以制造出善意的级联，\"克里斯塔基斯谈到他的研究时说。"
          },
          {
            "en": "\"You are kind to Susie, Susie's kind to Betty, and Betty's kind to Tommy.",
            "cn": "\"你对苏茜好，苏茜就对贝蒂好，贝蒂就对汤米好。"
          },
          {
            "en": "So, how Betty treats Tommy depends on how you treated Susie, even though neither you nor I ever interacted with Betty or Tommy.\"",
            "cn": "于是，贝蒂怎么对待汤米，取决于你怎么对待苏茜——尽管你和我都从未跟贝蒂或汤米打过交道。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "On an internet that can seem filled with nastiness, Christakis says the Kindness Mob has stumbled onto a solution that's backed by science.",
            "cn": "在一片看似乌烟瘴气的互联网上，克里斯塔基斯说，善意暴徒误打误撞发现了一个真正重要的东西。"
          },
          {
            "en": "When people stop engaging with trolls and connect with each other instead, research shows that trolls may change their behaviour.",
            "cn": "研究表明，当人们不再与喷子纠缠、转而彼此联结时，喷子们可能会改变自己的行为。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Someone, however, needs to carry the burden of orchestrating all the kindness.",
            "cn": "然而，总得有人承担起调度这一切善意的重担。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In September 2025, Brickley's following grew from 30,000 to 200,000 all at once.",
            "cn": "2025年9月，布里克利的粉丝数一夜之间从3万涨到20万。"
          },
          {
            "en": "\"It was very exciting,\" he says, but it came with a toll.",
            "cn": "\"非常振奋，\"他说，但代价也随之而来。"
          },
          {
            "en": "\"One day I was staring at my phone, and I thought, I just can't do this.\"",
            "cn": "\"有一天我盯着手机，心想：我真的做不动了。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The project isn't lucrative.",
            "cn": "这个项目并不赚钱。"
          },
          {
            "en": "TikTok pays accounts with big followings, but in August, Brickley says he made $39 (about £29).",
            "cn": "TikTok 会给大账号付钱，但布里克利说，八月份他只赚了39美元（约29英镑）。"
          },
          {
            "en": "Instead, he's driven by a sense of personal responsibility.",
            "cn": "驱动他的，是一种个人责任感。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Every day, fans nominate anywhere from 20 to 100 people for potential mobs with a form on the Kindness Mob's website .",
            "cn": "每天，粉丝通过\"善意暴徒\"网站上的一张表格，提名20到100个潜在的\"围攻\"对象。"
          },
          {
            "en": "But the audience's attention is finite and Brickley only posts one mob a day.",
            "cn": "但受众的注意力是有限的，布里克利每天只发一次\"围攻\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"It means there are 20 people showing up on my doorstep every day,\" Brickley says, all of them suffering from deliberate cruelty.",
            "cn": "\"这意味着每天有20个人站在我家门口，\"布里克利说，他们都在遭受蓄意的残忍对待。"
          },
          {
            "en": "\"And I have to turn 19 of them away, and the next day there's 20 more.\" Eventually, the burden was so overwhelming he had to take a few months off.",
            "cn": "\"而我不得不把其中19个拒之门外，第二天，又来20个。\"最终，这份重担压得他不得不休息了几个月。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "To release some of the emotional weight, Brickley had to reframe the project in his mind.",
            "cn": "为了卸下一些情绪重量，布里克利不得不在心里重新定义这个项目。"
          },
          {
            "en": "He couldn't directly help each person in need, but the mob could pick one each day to use as a lesson.",
            "cn": "他无法直接帮助每一个需要帮助的人，但暴徒们可以每天挑一个人，当作一堂课来对待。"
          },
          {
            "en": "He also organised some volunteers to share logistical work.",
            "cn": "他还组织了一些志愿者来分担事务性工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"I've been studying internet culture professionally for two decades, and things like this have a very limited shelf life,\" says professor Alice Marwick, director of research at the Data and Society Research Institute.",
            "cn": "\"我研究互联网文化已经二十年了，是拿它当职业来做的，这类事情的生命周期非常有限，\"数据与社会研究所（Data and Society Research Institute）研究主任、教授爱丽丝·马威克（Alice Marwick）说。"
          },
          {
            "en": "\"Usually, the person behind them gets burned out in a year or two and it goes away.\"",
            "cn": "\"通常，这类项目背后的人会在一两年内被耗竭，然后它就消失了。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Social media platforms bear a huge responsibility for user behaviour, Marwick says, but you can't just blame algorithms.",
            "cn": "马威克说，社交媒体平台对用户行为负有巨大责任，但你不能只怪算法。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"What we need is a larger shift in social norms around how we treat people online,\" she says.",
            "cn": "\"我们需要的是社会规范的更大转变——关于我们该如何在网上对待他人，\"她说。"
          },
          {
            "en": "\"I like the idea of amplifying pro-social behaviour online.",
            "cn": "\"我喜欢放大网上亲社会行为的想法。"
          },
          {
            "en": "Whether or not it moves the needle much remains to be seen.\"",
            "cn": "至于它能否真正撬动局面，还有待观察。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Last autumn, Brickley had back surgery.",
            "cn": "去年秋天，布里克利接受了背部手术。"
          },
          {
            "en": "\"When I woke up, my wife was being all cagey and weird.",
            "cn": "\"我醒来时，我妻子神神秘秘、怪怪的。"
          },
          {
            "en": "Finally, she said, 'Just check your phone',\" he says.",
            "cn": "最后她说：'你自己看手机吧'，\"他说。"
          },
          {
            "en": "She'd stepped outside the hospital room to post a TikTok.",
            "cn": "她溜出病房，发了一条 TikTok。"
          },
          {
            "en": "Brickley himself was being mobbed.",
            "cn": "布里克利自己被\"围攻\"了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"There were like 1,000 comments.",
            "cn": "\"大概有1000条评论。"
          },
          {
            "en": "I was reading through them, just sobbing.",
            "cn": "我一条条读过去，一直在哭。"
          },
          {
            "en": "Ugly crying,\" Brickley says.",
            "cn": "哭得稀里哗啦，\"布里克利说。"
          },
          {
            "en": "\"I just realised this is real.",
            "cn": "\"我只是意识到：这一切是真的。"
          },
          {
            "en": "It can really help.",
            "cn": "它真的能帮到人。"
          },
          {
            "en": "So many things crystallised for me in that moment.\" He's gone back to the comments time and again for strength.",
            "cn": "那一刻，很多事情在我心里豁然开朗。\"此后他一次次回到那些评论里汲取力量。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"It feels like a calling,\" Brickley says.",
            "cn": "\"这感觉像是一种使命，\"布里克利说。"
          },
          {
            "en": "\"The Kindness Mob is just one step.",
            "cn": "\"善意暴徒只是第一步。"
          },
          {
            "en": "But kindness, for everyone, always, feels like a good place to start.",
            "cn": "而善意——给每个人的、永远的善意——感觉像是一个很好的起点。\""
          }
        ]
      }
    ],
    "pin": true
  },
  {
    "id": "tech-npr-navier-stokes",
    "cat": "科技",
    "title": "AI solved one of math's hardest problems. Humanity learned nothing (so far)",
    "titleZh": "AI 解出了数学最难的难题之一，人类（暂时）却一无所获",
    "source": "NPR · 2026-09-22",
    "date": "2026-09-22",
    "minutes": 9,
    "url": "https://www.npr.org/2026/09/22/nx-s1-5968588/openai-navier-stokes-problem-mathematicians-learn-little",
    "coverImg": "assets/covers/tech-npr-navier-stokes.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "When OpenAI announced its AI had solved one of the world's toughest math problems earlier this month, its tone was celebratory:",
            "cn": "本月早些时候，当 OpenAI 宣布其人工智能解出了世界上最难的数学问题之一时，它的语气是庆祝式的："
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"A major goal of our work is to empower scientists to advance research and technology that benefits all of humanity,\" the company wrote in a statement on September 8.",
            "cn": "\"我们工作的一个主要目标，是赋能科学家去推进造福全人类的研究与技术，\"该公司在9月8日的一份声明中写道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But mathematicians say that, so far, humanity has learned very little from the solution the company's AI model purportedly found.",
            "cn": "但数学家们说，到目前为止，人类从该公司 AI 模型据称找到的那个解中，学到的少之又少。"
          },
          {
            "en": "Although they believe the proof to be technically correct, the dense, 166-page manuscript drafted by AI is proving to be a difficult read.",
            "cn": "尽管他们相信这份证明在技术上是正确的，但这份由 AI 起草、密密麻麻166页的手稿，读起来实在艰难。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"So far it's been very difficult to really extract any human understanding from this new AI proof,\" said James Maynard, a mathematician at the University of Oxford.",
            "cn": "\"到目前为止，要想从这份新的 AI 证明中真正提取出任何人类可理解的东西，都非常困难，\"牛津大学数学家詹姆斯·梅纳德（James Maynard）说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"The paper is not written for humans,\" said Javier Gómez-Serrano, a mathematician at Brown University who uses AI in his own research.",
            "cn": "\"这篇论文不是写给人看的，\"布朗大学数学家哈维尔·戈麦斯-塞拉诺（Javier Gómez-Serrano）说，他自己在研究中使用 AI。"
          },
          {
            "en": "He said he believes the proof could help advance the field after \"some serious re-writing,\" but \"as of today, the paper doesn't teach us much.\"",
            "cn": "他说，他相信这份证明在\"经过认真重写之后\"能推动这个领域进步，但\"截至今天，这篇论文教不了我们太多东西\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The solution came as AI appears to be rapidly gaining mathematical insights.",
            "cn": "这个解出炉之际，AI 看上去正在快速积累数学洞见。"
          },
          {
            "en": "AI has exploded onto the math scene over the past six months, academic mathematicians contacted by NPR said.",
            "cn": "接受 NPR 采访的学院派数学家们说，过去六个月，AI 在数学界横空出世。"
          },
          {
            "en": "For the first time, large language models appear capable of producing real results that could lead to new mathematical discoveries.",
            "cn": "大型语言模型首次显得有能力产出真正可能催生新数学发现的成果。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But few see OpenAI's announcement, which came as human mathematicians were closing in on a solution, as an example of how AI and mathematicians can work together.",
            "cn": "但几乎没有人把 OpenAI 的公告——它发布时，人类数学家正接近一个解——看作 AI 与数学家如何协作的范例。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"This whole episode could have been a wonderful proof-of-concept of the power of collaboration between humans and AI,\" said Maynard, who signed a statement by 25 winners of the prestigious Fields Medal.",
            "cn": "\"整个这件事本来可以成为人机协作力量的一个绝佳概念验证，\"梅纳德说。他签署了一份由25位菲尔兹奖得主联名的声明。"
          },
          {
            "en": "The statement, which was published September 11, decried \"misaligned goals\" between the AI companies and the mathematics community.",
            "cn": "这份于9月11日发表的声明，谴责了 AI 公司与数学共同体之间的\"目标错位\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Unfortunately, because of the decisions of humans involved, it became this scrappy, messy battle,\" he said.",
            "cn": "\"遗憾的是，由于相关人员的种种决定，它变成了一场乱糟糟的混战，\"他说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In response on Monday, OpenAI announced the establishment an \"independent mathematics advisory group\" to help with the review and dissemination of new results.",
            "cn": "作为回应，OpenAI 周一宣布成立一个\"独立数学顾问组\"，协助新成果的评审与传播。"
          },
          {
            "en": "However, the company added the group would not have a say in how quickly OpenAI pursued new findings: \"Importantly, the group will not be responsible for advising us on how to pace our internal progress on mathematics,\" it wrote.",
            "cn": "不过，该公司补充说，这个小组无权过问 OpenAI 以多快的速度追逐新发现：\"重要的是，该小组将不负责就我们在数学上的内部推进节奏提供建议，\"它写道。"
          }
        ]
      },
      {
        "head": 3,
        "sentences": [
          {
            "en": "Rush to discovery",
            "cn": "争相抢答"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The problem OpenAI apparently solved is considered among the most important unanswered questions in mathematics.",
            "cn": "OpenAI 声称解出的这个问题，被视为数学界最重要的未解问题之一。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Known as the \"Navier-Stokes problem,\" it concerns a set of equations used to describe the flow of fluids.",
            "cn": "它被称为\"纳维-斯托克斯问题\"（Navier-Stokes problem），关乎一组用来描述流体流动的方程。"
          },
          {
            "en": "The equations are used every day across physics and engineering, said Tristan Buckmaster, a mathematician at New York University.",
            "cn": "这些方程每天都被用在物理和工程的各个领域，纽约大学数学家特里斯坦·巴克马斯特（Tristan Buckmaster）说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And yet, at a fundamental level, researchers really don't understand why they work.",
            "cn": "然而，在最根本的层面上，研究者其实并不真正理解它们为什么成立。"
          },
          {
            "en": "Buckmaster says that getting deeper insights into Navier-Stokes would likely yield \"a new toolkit to understand complicated solutions to fluids.\" That in turn could lead to better models of things like turbulence in fluids and lift in aircraft.",
            "cn": "巴克马斯特说，对纳维-斯托克斯方程获得更深的洞见，很可能带来\"一套理解流体复杂解的新工具箱\"。这又可能带来更好的模型——比如流体的湍流，或飞机的升力。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In order to find a better version of Navier-Stokes, researchers had been looking for scenarios where the equations \"broke down,\" or stopped working.",
            "cn": "为了找到纳维-斯托克斯方程的一个更好的版本，研究者们一直在寻找方程\"崩溃\"或失效的场景。"
          },
          {
            "en": "Describing such scenarios became one of the $1 million Millenium Prize Problems, which were established in 2000 by the Clay Mathematics Institute.",
            "cn": "描述这样的场景，成了千禧年大奖难题之一——那是克雷数学研究所2000年设立、每题奖金100万美元的七道难题。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Mathematicians had been working towards an answer to the Navier-Stokes problem for years, and the community could sense they were getting close.",
            "cn": "数学家们朝着纳维-斯托克斯问题的答案努力多年，整个共同体都能感觉到他们正在接近。"
          },
          {
            "en": "\"Among the seven Millennium Problems …",
            "cn": "\"在七道千禧年难题之中……"
          },
          {
            "en": "Everyone agreed that this would be the next one that got solved,\" said Martin Hairer, a mathematician at EPFL, a top European technical university located in Lausanne, Switzerland who also signed the statement.",
            "cn": "所有人都同意，下一个被解出来的就是它，\"洛桑联邦理工学院（EPFL）——位于瑞士洛桑的一所欧洲顶尖理工院校——的数学家马丁·海雷尔（Martin Hairer）说。他也在声明上签了名。"
          },
          {
            "en": "(Hairer was also named a member of OpenAI's independent panel on Monday.)",
            "cn": "（周一，海雷尔还被点名为 OpenAI 独立小组的成员。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Buckmaster and his collaborator, Levent Alpöge at Anthropic, were among the human mathematicians who were inching closer to finding a scenario where the equations stopped working.",
            "cn": "巴克马斯特和他的合作者、Anthropic 的莱文特·阿尔珀格（Levent Alpöge），正是当时正逐步逼近\"找到方程失效场景\"的人类数学家。"
          },
          {
            "en": "The two were using AI tools, including OpenAI's chatbot to work towards a solution.",
            "cn": "两人当时也在使用 AI 工具——包括 OpenAI 的聊天机器人——朝着一个解推进。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Then OpenAI caught wind that the problem might soon be solved.",
            "cn": "随后，OpenAI 风闻这个问题可能很快被解决。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"On Tuesday, September 1, we heard rumors that two Millennium Prize problems had been resolved,\" the company wrote in its September 8 statement.",
            "cn": "\"9月1日周二，我们听到传闻说，两道千禧年大奖难题已经被解决，\"该公司在9月8日的声明中写道。"
          },
          {
            "en": "\"Inspired by these rumors and by the step change in performance of our internal model, we launched an effort to evaluate it on all open Millennium Prize problems and a few other high-impact problems.\"",
            "cn": "\"受这些传闻以及我们内部模型性能跃升的鼓舞，我们发起了一项行动，在所有悬而未决的千禧年难题以及其他一些高影响问题上评估它。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The company marshalled some 10,000 AI agents to work on the Navier-Stokes problem.",
            "cn": "该公司调集了约1万个 AI 智能体来攻克纳维-斯托克斯问题。"
          },
          {
            "en": "The agents worked for 88 hours, using around 130 billion output tokens, or units of text and characters generated by the model.",
            "cn": "这些智能体连续工作88小时，消耗约1300亿个输出 token——也就是模型生成的文本与字符单位。"
          },
          {
            "en": "According to OpenAI's pricing for its most advanced publicly available model, the solution to the Navier-Stokes problem cost the company somewhere around $6-$10 million to compute.",
            "cn": "按照 OpenAI 对其最先进的公开可用模型的定价，解出纳维-斯托克斯问题花费了该公司大约600万至1000万美元的算力成本。"
          },
          {
            "en": "(Overall, the company says it used 300 billion tokens, closer to $15-20 million, looking for solutions.)",
            "cn": "（总体而言，该公司说它为寻找各个解共使用了3000亿 token，接近1500万至2000万美元。）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The announcement of OpenAI's solution sparked controversy after Buckmaster issued a public statement describing how the company had approached him.",
            "cn": "OpenAI 的解一经宣布便引发争议——起因是巴克马斯特发表公开声明，讲述了该公司是如何接近他的。"
          },
          {
            "en": "According to Buckmaster, they said they would put him on their paper if he dropped Alpöge, his collaborator at rival company Anthropic.",
            "cn": "据巴克马斯特说，对方表示，只要他抛弃在竞争对手 Anthropic 的合作者阿尔珀格，就把他署名进他们的论文。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Buckmaster told NPR he believes OpenAI was tipped off to the approach he and Alpöge were using to try and find the solution to Navier-Stokes.",
            "cn": "巴克马斯特告诉 NPR，他相信 OpenAI 获得了内线消息，得知了他和阿尔珀格为寻找纳维-斯托克斯问题的解所采用的方法。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"There's so much circumstantial evidence that they had far more knowledge of what we were doing than they let on,\" he said.",
            "cn": "\"旁证太多了——他们对我们正在做的事情的了解，远超他们承认的程度，\"他说。"
          },
          {
            "en": "He added that the word \"they\" doesn't necessarily mean a person.",
            "cn": "他补充说，\"他们\"这个词未必指某个人。"
          },
          {
            "en": "\"It could mean the agents,\" he said.",
            "cn": "\"也可能指那些智能体，\"他说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "OpenAI has denied that they used Buckmaster and Alpöge's prompts or proofs in its search for a solution.",
            "cn": "OpenAI 否认在寻找解的过程中使用了巴克马斯特和阿尔珀格的提示词或证明。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Regardless, the hurried results seem muddled.",
            "cn": "不管怎样，这份赶工出来的结果显得杂乱无章。"
          },
          {
            "en": "Several mathematicians who looked at OpenAI's paper said it was virtually unreadable.",
            "cn": "几位看过 OpenAI 论文的数学家说，它几乎没法读。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"It's a terribly written paper,\" Buckmaster said.",
            "cn": "\"这是一篇写得很糟的论文，\"巴克马斯特说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"The paper doesn't explain what parts are important.",
            "cn": "\"论文没有解释哪些部分是重要的。"
          },
          {
            "en": "What parts are routine?",
            "cn": "哪些部分是例行公事？"
          },
          {
            "en": "How does the idea feed into other places?\" added Gómez-Serrano.",
            "cn": "这个想法又能接续到哪些别的地方？\"戈麦斯-塞拉诺补充道。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Buckmaster said that OpenAI's decision to rush out an answer forced him to publish his own heavily AI-influenced preliminary results.",
            "cn": "巴克马斯特说，OpenAI 抢时间发布答案的决定，迫使他发表了自己那份深受 AI 影响的初步结果。"
          },
          {
            "en": "Those too, he said, are not very well written.",
            "cn": "他说，那份东西写得也不算好。"
          },
          {
            "en": "\"Everything was rushed out,\" he said.",
            "cn": "\"一切都被赶工出来了，\"他说。"
          },
          {
            "en": "\"It's still not at the level I'm happy with, but at least the introduction has all the key ideas.\"",
            "cn": "\"它仍然没达到我满意的水准，但至少导言里有全部的关键想法。\""
          }
        ]
      },
      {
        "head": 3,
        "sentences": [
          {
            "en": "Computers check computers",
            "cn": "电脑验电脑"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "While OpenAI's 166-page proof is taking weeks to untangle, few mathematicians believe it's wrong.",
            "cn": "当 OpenAI 这份166页的证明还需要数周时间来厘清时，几乎没有数学家认为它是错的。"
          },
          {
            "en": "That's because in addition to publishing the proof, the company also produced a piece of computer code called a Lean formalization.",
            "cn": "这是因为，除了发布证明本身，该公司还产出了一段被称为 Lean 形式化的计算机代码。"
          },
          {
            "en": "Lean is a programming language used in mathematics to check if proofs are correct.",
            "cn": "Lean 是数学中用来检验证明是否正确的一种编程语言。"
          },
          {
            "en": "If the code can be compiled, then the proof is considered complete.",
            "cn": "如果代码能够编译通过，这份证明就被视为完整。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The Lean code produced by OpenAI's tools did compile as expected, Gómez-Serrano said.",
            "cn": "戈麦斯-塞拉诺说，OpenAI 工具产出的 Lean 代码如期编译通过了。"
          },
          {
            "en": "Based on that, \"the community seems to have the consensus that it is correct.\"",
            "cn": "基于这一点，\"共同体似乎已有共识：它是正确的。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Gómez-Serrano, Buckmaster and other mathematicians contacted by NPR all said they envisioned a future for AI in mathematics.",
            "cn": "戈麦斯-塞拉诺、巴克马斯特以及接受 NPR 采访的其他数学家都说，他们预见 AI 在数学中有一席之地。"
          },
          {
            "en": "The field is open to new tools, in part because for decades, it's ceded much of the day-to-day computations required for making advancements to computers.",
            "cn": "这个领域对新工具是开放的，部分原因在于：几十年来，数学早已把推进研究所需的大部分日常计算让渡给了计算机。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "But this episode is a reminder that mathematics is about more than just finding a solution, said Maynard.",
            "cn": "但这一幕提醒我们：数学不只是找到一个解，梅纳德说。"
          },
          {
            "en": "\"It wasn't about only answering this problem, it was about the human understanding behind it,\" he said.",
            "cn": "\"这不只是回答这个问题，而是它背后的人类理解，\"他说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "OpenAI said it hopes its new mathematics advisory group will help improve the dissemination of new results from the company in the future.",
            "cn": "OpenAI 表示，希望它新的数学顾问组将来能帮助改善该公司新成果的传播。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Working with this group is a first step,\" it wrote.",
            "cn": "\"与这个小组合作是第一步，\"它写道。"
          },
          {
            "en": "\"We want mathematicians to be at the center of shaping the answers.\"",
            "cn": "\"我们希望数学家们能站在塑造这些答案的中心。\""
          }
        ]
      }
    ],
    "pin": true
  },
  {
    "id": "hist-bbc-markov-umbrella",
    "cat": "历史",
    "title": "‘Eliminate him without trace’: The poison-tipped umbrella that pointed to a KGB murder – on British soil",
    "titleZh": "「不留痕迹地除掉他」：那把毒伞，指向发生在英国国土上的一桩 KGB 谋杀",
    "source": "BBC Culture · 2026-09-04",
    "date": "2026-09-04",
    "minutes": 10,
    "url": "https://www.bbc.com/culture/article/20260904-the-poison-tipped-umbrella-that-pointed-to-a-kgb-murder",
    "coverImg": "assets/covers/hist-bbc-markov-umbrella.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "In London, 7 September 1978, Georgi Markov was killed with an umbrella, in what is suspected to have been a political poisoning by the KGB. He died four days later.",
            "cn": "1978年9月7日，伦敦，格奥尔基·马尔科夫（Georgi Markov）被一把雨伞杀害——这被怀疑是克格勃（KGB）策划的一起政治投毒。四天后他身亡。"
          },
          {
            "en": "The following year, Markov's widow and elder brother told the BBC's Panorama that they were warned about the murder plot just months before – by an anonymous man.",
            "cn": "第二年，马尔科夫的遗孀和哥哥告诉 BBC《全景》节目：就在遇害前几个月，曾有一个匿名男子向他们预警过这桩谋杀阴谋。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"He'd felt a jab in his thigh.",
            "cn": "\"他感到大腿被刺了一下。"
          },
          {
            "en": "And he'd looked round, and there'd been a man behind him who'd apologised and dropped an umbrella.\" These are the words of Annabel Markov, talking about her husband Georgi Markov, a Bulgarian dissident, journalist and writer.",
            "cn": "他回过头，身后有个男人道了歉，然后丢下一把伞走开了。\"说这话的是安娜贝尔·马尔科夫（Annabel Markov），她谈的是自己的丈夫——保加利亚持不同政见者、记者、作家格奥尔基·马尔科夫。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "On 7 September 1978, 49-year-old Markov was waiting at a bus stop on Waterloo Bridge in central London when he said he'd been stabbed with an umbrella.",
            "cn": "1978年9月7日，49岁的马尔科夫正在伦敦市中心滑铁卢桥上的一个公交站候车，他说自己就是那时被雨伞刺中的。"
          },
          {
            "en": "Four days later he died in hospital, with doctors initially diagnosing blood poisoning.",
            "cn": "四天后他在医院去世，医生最初的诊断是败血症。"
          },
          {
            "en": "Yet detectives soon realised it had been a political murder, one that had used a highly sophisticated technique that also targeted another Bulgarian exile.",
            "cn": "然而侦探们很快意识到，这是一场政治谋杀——其手法高度精密，而同样的手法也瞄准了另一名保加利亚流亡者。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Markov's widow and elder brother told the BBC's Panorama in 1979 how an anonymous man warned them that Markov was going to be poisoned, months before his death.",
            "cn": "1979年，马尔科夫的遗孀和哥哥向 BBC《全景》节目讲述了：一位匿名男子如何在马尔科夫死前几个月警告他们，他将被人下毒。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And interviews with the former head of a KGB assassination squad and a former colonel in the Bulgarian secret service, both then talking publicly for the first time, placed the assassination at the highest levels of the Bulgarian and Soviet governments.",
            "cn": "而对克格勃一支暗杀小队前负责人和保加利亚秘密机关一名前上校的采访——两人当时都是首次公开开口——把这场暗杀指向了保加利亚和苏联政府的最高层。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In the days following Markov's death, Britain's anti-terrorist squad found a clue that convinced them that he had been the victim of a unique murder plot.",
            "cn": "马尔科夫死后数日，英国反恐小组发现了一条线索，使他们确信：他是一场独一无二的谋杀阴谋的受害者。"
          },
          {
            "en": "\"At Scotland Yard's forensic laboratory, the chief scientific officer examined a minute metal object that had been found in Markov's thigh,\" said Panorama reporter Michael Cockerell.",
            "cn": "\"在苏格兰场的法医实验室里，首席科学官检查了在马尔科夫大腿里发现的一个微小金属物体，\"《全景》节目记者迈克尔·科克雷尔（Michael Cockerell）说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"Under the microscope, it was clear that the object was an extraordinarily sophisticated pellet, no bigger than a pinhead.",
            "cn": "\"在显微镜下，显而易见，这个物体是一枚异常精密的弹丸，比针头还小。"
          },
          {
            "en": "It had four tiny holes passing through that the forensic experts were convinced had contained an infinitesimally tiny amount of a lethally toxic poison.\"",
            "cn": "上面穿有四个微孔，法医专家确信，其中曾装有剂量微乎其微、却足以致死的一种剧毒毒物。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Scientists at Porton Down, the top-secret British chemical and microbiological warfare research establishment, believed that what had killed Markov was the highly lethal toxin ricin.",
            "cn": "波顿唐（Porton Down）——英国绝密的化学与微生物战研究机构——的科学家们相信，杀死马尔科夫的是毒性极强的毒素蓖麻毒素（ricin）。"
          },
          {
            "en": "According to Panorama, it had never before been used for murder in Britain.",
            "cn": "据《全景》节目所述，此前它从未在英国被用于谋杀。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It emerged that another Bulgarian exile might have been attacked in a similar way 10 days before Markov was stabbed.",
            "cn": "人们随后发现，在马尔科夫遇刺前10天，另一名保加利亚流亡者可能也遭到了类似袭击。"
          },
          {
            "en": "Vladimir Kostov had felt a sharp pain in his back as he was leaving the Paris Metro with his wife.",
            "cn": "弗拉迪米尔·科斯托夫（Vladimir Kostov）和妻子走出巴黎地铁时，感到背部一阵剧痛。"
          },
          {
            "en": "He had a high fever for three days but recovered.",
            "cn": "他发了三天高烧，但康复了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After hearing of Markov's death, Kostov had his back X-rayed, which revealed a tiny metal object.",
            "cn": "听闻马尔科夫的死讯后，科斯托夫给后背拍了X光片，发现了一个微小的金属物体。"
          },
          {
            "en": "At a clinic in Paris, a surgeon operated on him under the eye of a French police officer wearing a surgical mask and gown.",
            "cn": "在巴黎的一家诊所里，一名外科医生为他做手术，一名戴口罩和手术服的法国警察在一旁盯着。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"The surgeon had to be extremely careful.",
            "cn": "\"外科医生必须极其小心。"
          },
          {
            "en": "He removed the metal pellet without touching it at all,\" Kostov told the BBC. It was then given to a Scotland Yard inspector and taken to England for analysis.",
            "cn": "他取出那枚金属弹丸时完全没有用手碰它，\"科斯托夫告诉 BBC。弹丸随后交给一名苏格兰场督察，被带回英国分析。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Using a high-powered scanning electron microscope, Scotland Yard metallurgists analysed the pellet removed from Kostov's back, finding that it was identical to the one found in Markov.",
            "cn": "苏格兰场的冶金学家用高功率扫描电子显微镜分析了从科斯托夫背部取出的弹丸，发现它与在马尔科夫体内发现的那枚一模一样。"
          },
          {
            "en": "\"Both pellets weighed exactly the same,\" said Cockerell.",
            "cn": "\"两枚弹丸的重量分毫不差，\"科克雷尔说。"
          },
          {
            "en": "\"The holes were in the same places, and both were made of a rare platinum iridium alloy that the human body does not reject.\"",
            "cn": "\"小孔的位置相同，而且都由一种人体不排异的稀有铂铱合金制成。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Toxicologists at Porton Down found ricin antibodies in Kostov's flesh and concluded he'd survived because there hadn't been enough poison in the pellet.",
            "cn": "波顿唐的毒理学家在科斯托夫的组织里找到了蓖麻毒素抗体，并得出结论：他能活下来，是因为弹丸里的毒不够。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The sophisticated technique used – and evidence of coordinated attacks – convinced Scotland Yard that a state secret service organisation had played a role in Markov's death.",
            "cn": "所用手法的精密程度——以及遭到协同袭击的证据——让苏格兰场确信，某国特工机构参与了马尔科夫之死。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "A novelist and playwright previously acclaimed in his native country, moving within the government elite there, Markov had defected from then-communist Bulgaria in 1969.",
            "cn": "马尔科夫曾是本国备受赞誉的小说家和剧作家，出入政府精英圈层；1969年，他从当时的共产党执政的保加利亚叛逃西方。"
          },
          {
            "en": "After settling in the UK, he'd become an outspoken opponent of the Bulgarian government, working for the BBC's World Service as well as Radio Free Europe (RFE), a US state-funded media organisation.",
            "cn": "定居英国后，他成为保加利亚政府直言不讳的批评者，为 BBC 世界服务台以及自由欧洲电台（RFE）——一家美国官方资助的媒体机构——工作。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Annabel Markov said that they had received warnings of a plot to kill her husband, telling the BBC that a man had contacted Georgi in May 1978.",
            "cn": "安娜贝尔·马尔科夫说，他们曾收到过有人阴谋杀害她丈夫的警告，并告诉 BBC：1978年5月，一名男子接触了格奥尔基。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"They spoke Bulgarian all evening.",
            "cn": "\"整个晚上他们都在用保加利亚语交谈。"
          },
          {
            "en": "Every so often Georgi would turn to me and say in English, 'this is extraordinary what this man's saying'.\" According to Annabel, the anonymous man said that the decision had been taken at the highest political level in Bulgaria to kill him, because of the outspoken broadcasts Georgi was writing for RFE.",
            "cn": "每隔一会儿，格奥尔基就会转向我，用英语说：'这个人说的话太不可思议了'。\"据安娜贝尔说，那名匿名男子告诉他：保加利亚最高政治层已经做出决定，要杀掉他——因为他为自由欧洲电台撰写了那些直言不讳的广播稿。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Markov's brother Nikola backed this up, revealing that he had received a call in September 1977.",
            "cn": "马尔科夫的哥哥尼古拉（Nikola）证实了这一点：他透露自己在1977年9月接到过一个电话。"
          },
          {
            "en": "\"A man phoned me saying the decision has been taken to kill Georgi, to eliminate him without trace,\" he told the BBC.",
            "cn": "\"一个男人打电话给我，说已经做出决定要杀掉格奥尔基，要消灭他，不留痕迹，\"他告诉 BBC。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"At first, I didn't believe it.",
            "cn": "\"起初我不相信。"
          },
          {
            "en": "It seemed absurd, impossible.",
            "cn": "这听起来荒唐透顶，绝无可能。"
          },
          {
            "en": "But the man gave me quite specific details about which there could be no doubt.",
            "cn": "但那人给了我一些相当具体的细节，让人无从怀疑。"
          },
          {
            "en": "He told me Georgi would definitely be poisoned at the first opportunity…",
            "cn": "他告诉我，格奥尔基一有机会就一定会被下毒……"
          },
          {
            "en": "that a sort of poison or some sort of bacteria, he didn't know exactly which, had already been brought out to Western Europe.\"",
            "cn": "还说某种毒药或某种细菌——他说不清具体是哪种——已经被带到了西欧。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After moving to the UK, Markov remained a celebrity at home through his talks on RFE, broadcasting weekly programmes about what life was really like at the upper echelons of Bulgarian society.",
            "cn": "移居英国后，马尔科夫依然借助在自由欧洲电台的讲话在祖国声名不减，每周广播节目，讲述保加利亚社会上层真实的生活图景。"
          },
          {
            "en": "One of his broadcasts was called Life Behind the Curtains, referring to the little curtains on the side and back of every official black Mercedes.",
            "cn": "他有一档节目名叫《帷幕之后的生活》（Life Behind the Curtains），说的是每辆官方黑色奔驰车侧面和后窗挂着的那些小帘子。"
          },
          {
            "en": "He presented a gossipy but damning picture of the misuse of absolute power in the country, with stories about nepotism, financial abuse and corruption.",
            "cn": "他描绘了一幅八卦性质却极具杀伤力的图景，直指这个国家绝对权力的滥用，讲裙带关系、财务舞弊与腐败的故事。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "While the Bulgarian government officially denied that Markov's broadcasts had any influence, the BBC found that the Bulgarian president, Todor Zhivkov, took particularly strong exception to a revealing series of Markov's talks called My Meetings with Todor Zhivkov.",
            "cn": "虽然保加利亚政府官方否认马尔科夫的广播有任何影响，但 BBC 发现，保加利亚总统托多尔·日夫科夫（Todor Zhivkov）对马尔科夫那组尤其具有揭露性的讲话《我与托多尔·日夫科夫的会面》（My Meetings with Todor Zhivkov）反应格外强烈。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "\"We have heard that he was quite furious about Markov's talks concerning the meetings with him,\" said a Bulgarian broadcaster for RFE, Kyril Panov.",
            "cn": "\"我们听说，他对马尔科夫那些讲述与他见面的谈话相当震怒，\"自由欧洲电台的保加利亚播音员基里尔·帕诺夫（Kyril Panov）说。"
          },
          {
            "en": "\"[Markov] was talking about things which are, so to speak, taboo in Bulgaria, things which the regime prefers not to talk about and that the public should not know.\"",
            "cn": "\"（马尔科夫）谈论的那些事，可以说是保加利亚的禁忌——是这个政权不愿谈、也不该让公众知道的事。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Zhivkov had ruled Bulgaria since 1956 – and had very close ties to the Soviet Union, describing the relationship between the two countries as like two lungs in the same body, fed by the same bloodstream.",
            "cn": "日夫科夫自1956年起统治保加利亚——他与苏联关系极为密切，曾把两国关系比作同一身体里的两片肺，由同一股血液滋养。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Experts believed that the Soviets must have been involved in Markov's murder.",
            "cn": "专家们相信，苏联方面必定参与了马尔科夫的谋杀。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Stefan Sverdlov, a colonel in the Bulgarian secret police until he defected in 1971, told the BBC in 1979: \"Every department of the Darzhavna Sigurnost [Bulgarian secret service] is controlled by an advisor from the Russian KGB, sometimes known as an uncle, who reports directly to Moscow…",
            "cn": "斯特凡·斯维尔德洛夫（Stefan Sverdlov）原是保加利亚秘密警察上校，1971年叛逃；他1979年告诉 BBC：\"保加利亚国家安全局（Darzhavna Sigurnost）的每一个部门，都由一名俄国人克格勃的顾问控制，有时被称为'叔叔'，他直接向莫斯科汇报……"
          },
          {
            "en": "It's inconceivable that this could have been done without the Russians knowing about it.\"",
            "cn": "如果没有俄国人的知情，这种事根本不可想象。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "And according to the former head of an assassination squad for the KGB, the method pointed to Soviet involvement.",
            "cn": "而据克格勃一支暗杀小队的前负责人说，这种作案手法本身就指向苏联的介入。"
          },
          {
            "en": "\"The technique is…",
            "cn": "\"这套技术……"
          },
          {
            "en": "almost ridiculously sophisticated,\" said Nikolai Khokhlov.",
            "cn": "精密得近乎荒唐，\"尼古拉·霍赫洛夫（Nikolai Khokhlov）说。"
          },
          {
            "en": "\"That tells me that the officers who were planning that operation tried to please someone on the highest level.\" The fatal attack on Markov was carried out on Zhivkov's birthday.",
            "cn": "\"这告诉我，策划这次行动的特工是想讨好最高层的某个人。\"对马尔科夫的致命袭击，就发生在日夫科夫的生日当天。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "After the fall of the Soviet Union, it emerged that the KGB had developed an umbrella that could inject ricin pellets into a victim.",
            "cn": "苏联解体后，人们得知：克格勃研制过一种能把蓖麻毒素弹丸注入人体的雨伞。"
          },
          {
            "en": "And two former KGB officers who defected later said their organisation assisted in the murder, although it was carried out by an Italian criminal codenamed Piccadilly.",
            "cn": "而两名后来叛逃的前克格勃官员说，他们的机构协助了这桩谋杀——尽管动手执行的是一名代号\"皮卡迪利\"（Piccadilly）的意大利罪犯。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "No one has ever been charged for Markov's assassination.",
            "cn": "马尔科夫遇刺一案，从未有人被起诉。"
          },
          {
            "en": "Bulgaria closed the case in 2013 , due to a lack of suspects, but it remains an open inquiry in the UK.",
            "cn": "保加利亚方面于2013年因缺少嫌疑人结案；但在英国，此案至今仍是未决的调查。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It would have benefited the Soviets in more than one way, as former KGB officer Khokhlov told the BBC in 1979 – beyond the physical death, it would have had a great psychological impact on dissenters abroad.",
            "cn": "对苏联人来说，这桩谋杀的收益不止一重：正如前克格勃军官霍赫洛夫1979年告诉 BBC 的——超越了肉体死亡本身，它还会对海外的异见者产生巨大的心理冲击。"
          },
          {
            "en": "\"The fear that they're not protected by distance, they're not protected by the security systems of the West\", he said.",
            "cn": "\"让他们害怕：距离保护不了他们，西方的安全体系也保护不了他们\"，他说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "He continued: \"The action is like coming behind someone and whispering in his ear, 'We can get you any time we want.",
            "cn": "他接着说：\"这种行动就像绕到一个人身后，在他耳边低语：'只要我们想，随时可以抓到你。"
          },
          {
            "en": "We can kill you.'\"",
            "cn": "我们可以杀死你。'\""
          }
        ]
      }
    ],
    "pin": true
  },
  {
    "id": "gr-greatergood-rustout",
    "cat": "成长",
    "title": "You Might Be Experiencing Rustout, Not Burnout, at Work",
    "titleZh": "你在工作中经历的也许不是倦怠，而是「生锈」",
    "source": "Greater Good · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 12,
    "url": "https://greatergood.berkeley.edu/article/item/you_might_be_experiencing_rustout_not_burnout_at_work",
    "coverImg": "assets/covers/gr-greatergood-rustout.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "Some forms of distress at work are easy to recognize because they interrupt someone’s daily performance and the work of those around them: For example, a person on your team becomes visibly exhausted, they are irritable, or they’re frequently absent.",
            "cn": "有些职场痛苦很容易辨认，因为它们会打断当事人和他周围人的日常工作：比如，团队里有人明显疲惫不堪、烦躁易怒，或者频繁缺勤。"
          },
          {
            "en": "But other forms of distress are harder to see precisely because the work continues uninterrupted.",
            "cn": "但另一些痛苦更难看见，恰恰是因为工作还在不间断地进行。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s common to talk about burnout at work and to recognize it in others and in ourselves.",
            "cn": "我们常谈起职场倦怠，也能在别人和自己身上认出它。"
          },
          {
            "en": "But a new paper of mine with David S. Smith examines a less visible and less understood form of disengagement at work: rustout.",
            "cn": "但我和大卫·S·史密斯（David S. Smith）新写的一篇论文，考察了一种更难看见、也更少被理解的职场游离状态：锈钝（rustout）。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Rustout, as we studied it, often involves being underutilized, intellectually stagnating, and feeling a deep-seated sense of unfulfillment.",
            "cn": "在我们的研究中，锈钝通常表现为：大材小用、智识上停滞不前，以及一种深植于心的不满足感。"
          },
          {
            "en": "It can arise when people feel their work no longer offers enough meaning or challenge to keep them intellectually and creatively engaged.",
            "cn": "当人们觉得工作不再提供足够的意义或挑战、无法让他们的智识与创造力保持投入时，它就可能出现。"
          },
          {
            "en": "But because it’s different from burnout, the solutions are also different—both for individuals and for organizations.",
            "cn": "但因为它与倦怠不同，解决之道也不同——对个人如此，对组织亦然。"
          }
        ]
      },
      {
        "head": 2,
        "sentences": [
          {
            "en": "Rustout vs. burnout",
            "cn": "锈钝对比倦怠"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "I’ve presented this research at numerous conferences, and each time I have been approached by professionals who say, “That’s what I’ve been going through, but I never had a name for it until now.”",
            "cn": "我在许多会议上报告过这项研究，每一次都有从业者来找我，说：\"这正是我一直在经历的事，只是直到今天才知道它的名字。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "These people, young and older, are committed to their work, they are hardworking, and they haven’t stopped caring.",
            "cn": "这些人无论年轻年长，都忠于自己的工作，勤奋肯干，从未停止在乎。"
          },
          {
            "en": "It is often the case that they care very much, and they meet expectations set before them.",
            "cn": "常见的情况是：他们非常在乎，并且达成了外界对他们的期待。"
          },
          {
            "en": "They are often the ones who are called upon because they are reliable and highly conscientious.",
            "cn": "也常常是他们被点名找上门——因为他们可靠、尽责心极强。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you look around your workplace, you probably know many people who fit this bill.",
            "cn": "看看你的工作场所，你大概能想到很多符合这个画像的人。"
          },
          {
            "en": "The problem is not a loss of effort on the part of the individual; it is a breakdown in the relationship between effort and meaningful work.",
            "cn": "问题不在于个人不再努力；而在于努力与有意义的工作之间的关系断裂了。"
          },
          {
            "en": "From my study of this topic, rustout is really about the decline in professional vitality, when a person’s capacities are not used in ways that feel meaningful to them.",
            "cn": "根据我对这一课题的研究，锈钝真正关乎职业活力的衰退——当一个人的能力无法以他自己觉得有意义的方式被使用时。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In our research, participants described experiences shaped by administrative overload, reduced autonomy, and a misalignment between their professional aspirations and assigned tasks.",
            "cn": "在我们的研究中，受访者描述的体验带着这样的烙印：行政事务超载、自主权缩水，以及职业抱负与分派任务之间的错位。"
          },
          {
            "en": "Many people highlighted feeling professionally stuck: “Sadly, the elements I love about the job . . .",
            "cn": "许多人强调自己有一种职业上的困滞感：\"遗憾的是，这份工作里我热爱的那些部分……"
          },
          {
            "en": "are often overshadowed by the other administrative aspects of the role,” “I feel like I’m feeding the machine,” and “I’m a square peg in a round hole.”",
            "cn": "常常被这个岗位行政性的一面盖过\"\"我觉得自己在给机器喂料\"\"我是圆孔里的方钉\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They highlighted a sense that the work they were doing no longer drew sufficiently on their talents: “The better you are at it, the more of the administrative side of the job you get.",
            "cn": "他们突出强调了一种感觉：自己做的工作，已经无法充分发挥他们的才干：\"你干得越好，分到的行政杂务就越多。"
          },
          {
            "en": "It’s lacking opportunities to be creative.”",
            "cn": "缺少的正是发挥创造力的机会。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Rustout can be quite psychologically disorienting.",
            "cn": "锈钝在心理上可能相当令人迷失。"
          },
          {
            "en": "From the outside, a person may appear successful and competent.",
            "cn": "从外表看，这个人也许显得成功而能干。"
          },
          {
            "en": "There is no question about their productivity; they meet set targets, but could do so “with [their] eyes closed.” However, they may feel increasingly detached from the work that once animated them.",
            "cn": "他的生产力毫无问题；既定目标都能完成，甚至能\"闭着眼睛\"完成。然而，他可能感到自己与那份曾经令他生龙活虎的工作日渐疏离。"
          },
          {
            "en": "Their distress isn’t dramatic; it’s a slow process of psychological erosion.",
            "cn": "他的痛苦并不戏剧化；那是一场缓慢的心理侵蚀。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In many ways, rustout overlaps with burnout, but they are not the same.",
            "cn": "在很多方面，锈钝与倦怠重叠，但两者并不相同。"
          },
          {
            "en": "Burnout involves prolonged negative stress that isn’t adequately managed.",
            "cn": "倦怠源于长期得不到充分调适的负面压力。"
          },
          {
            "en": "It’s about too much—working too much, caring too much, too much pressure, and too little time to recuperate.",
            "cn": "它关乎\"太多\"——工作太多、在乎太多、压力太大，而恢复的时间太少。"
          },
          {
            "en": "In contrast, rustout is associated with too little positive stress or challenge over time, too little stimulation, and limited opportunities for individual growth.",
            "cn": "相比之下，锈钝与长期的正向压力或挑战太少、刺激太少、个人成长机会有限相关。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "However, while burnout is part of organizations’ mental health literacy, rustout rarely gets a mention.",
            "cn": "然而，倦怠已是组织心理健康常识的一部分，锈钝却很少被提起。"
          },
          {
            "en": "And this is problematic—both for the individual and the organization.",
            "cn": "这就成了问题——对个人和对组织都是。"
          },
          {
            "en": "“I often feel I have produced nothing at the end of the week, and there is no sense of development,” one person said.",
            "cn": "\"我常常觉得一周结束之际自己什么也没产出，也毫无成长感，\"一位受访者说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Some will stay in their roles out of a sense of duty (and for other practical reasons like salary or seniority), but others will choose to leave.",
            "cn": "有些人出于责任感留在岗位上（也因为薪水、资历这类现实原因），但另一些人会选择离开。"
          },
          {
            "en": "Another said, “I am functioning at my job, but I’m not thriving, and I am looking elsewhere.”",
            "cn": "另一位说：\"我在应付这份工作，但并没有蓬勃发展，我正在看别处的机会。\""
          }
        ]
      },
      {
        "head": 2,
        "sentences": [
          {
            "en": "Why don’t we talk about rustout?",
            "cn": "我们为什么不谈锈钝？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Rustout often hides behind competence, and the reliable person is often given more of the same work.",
            "cn": "锈钝常常藏在\"能干\"背后，而可靠的人往往被派给更多同样的活儿。"
          },
          {
            "en": "The person who does not complain is assumed to be coping and doing OK. The person who stabilizes others and is a good team player is rarely asked whether they themselves feel developed or challenged.",
            "cn": "不抱怨的人，被默认为应付得来、过得不错。那个安抚他人、善于团队协作的人，很少有人问一句：他自己是否感到有所成长、受到挑战。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One person said, “I have no experience of ever having a conversation with anyone around it.",
            "cn": "一位受访者说：\"我从来没有和任何人谈起过这件事。"
          },
          {
            "en": "No line manager ever named it, it has never been mentioned in a communal setting or in a one-to-one setting. . . .",
            "cn": "没有一位直属上司点破过它，它从未在集体场合或一对一的场合被提起……"
          },
          {
            "en": "No one has ever asked, ‘Do you feel fulfilled or do you feel you have opportunities to use your skills and talents in a meaningful way?’”",
            "cn": "从没有人问过：'你觉得充实吗？你觉得有机会把自己的技能与才华用得有意义吗？'\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s easy to see how doing overtime and being dependable can become a trap.",
            "cn": "加班加点、可靠耐用如何变成一个陷阱，不难想见。"
          },
          {
            "en": "Eventually, the employee becomes valued less for what they might become and more for what they can continue to absorb—they won’t “rock the boat” by opening the can of worms that is their dissatisfaction.",
            "cn": "到头来，这名员工的价值，越来越不在于他可能成为什么，而在于他还能继续吸收多少——他们不愿打开自己不满的这罐\"乱麻\"，去搅动现状。"
          },
          {
            "en": "“You put up, and shut up,” one person said.",
            "cn": "\"你忍着，然后闭嘴，\"一位受访者说。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Meanwhile, many workplaces are organized to detect individual or team shortcomings (or failure) more readily than stagnation.",
            "cn": "与此同时，许多职场的设计，让个体或团队的短板（或失败）比停滞更容易被察觉。"
          },
          {
            "en": "If someone stops performing, the problem becomes visible.",
            "cn": "如果有人不再出活儿，问题立刻可见。"
          },
          {
            "en": "However, if someone continues to perform while becoming inwardly disengaged, the organization may see no problem at all.",
            "cn": "然而，如果有人持续出活儿、内心却已游离，组织可能根本看不到问题。"
          },
          {
            "en": "And if anyone notices their dissatisfaction, they may not openly discuss it, as another of my interviewees reported.",
            "cn": "而且，即便有人察觉到他的不满，也未必会摆到台面上谈——我的另一位受访者这样说。"
          },
          {
            "en": "“It suits everyone not to talk about it; when everyone is working and doing their jobs—then don’t disturb anything.",
            "cn": "\"不谈对大家都好；大家都在工作、都在干自己的活儿——那就别打乱什么。"
          },
          {
            "en": "Everything is cosy.”",
            "cn": "一切都其乐融融。\""
          }
        ]
      },
      {
        "head": 2,
        "sentences": [
          {
            "en": "How rustout arises",
            "cn": "锈钝如何产生"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Participants experiencing rustout described barriers that limited their ability to use their strengths or pursue professional growth, which are particularly important for having a sense of meaning and fulfillment at work.",
            "cn": "正在经历锈钝的受访者描述了种种壁垒：它们限制了他们发挥所长或追求职业成长，而这两者对工作中的意义感与满足感尤为重要。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For many people, their working life gives them a sense of identity and purpose, but when work no longer offers that sense of meaning, their relationship with the job can become fractured or feel “off.” In some cases, they can’t put their finger on what is happening, and that might be why I often hear after presentations, “I never had a name for it.”",
            "cn": "对许多人来说，工作生活赋予他们身份感与目的感；一旦工作不再提供那种意义感，他们与工作的关系就会开裂，或变得\"不对劲\"。有些时候，他们说不清到底哪里出了问题——这可能就是为什么我在报告之后常听到一句：\"我一直不知道它叫什么。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Naming rustout won’t solve the issue, but it can help the person to understand why they feel underutilized or dissatisfied.",
            "cn": "给锈钝命名并不能解决问题，但它能帮助人们理解自己为什么会感到大材小用或心有不甘。"
          },
          {
            "en": "Naming rustout can help people understand this isn’t a personal failure but an experience that is shaped by the design or conditions of work (much like burnout).",
            "cn": "命名锈钝可以帮助人们明白：这不是个人的失败，而是由工作的设计或条件塑造的体验（与倦怠一样）。"
          },
          {
            "en": "It is also shaped by the culture of work, particularly when there is a resistance to change or a failure to see the value in helping people to flourish.",
            "cn": "它同样由职场文化塑造——尤其当组织抗拒改变、或看不到帮助员工蓬勃发展的价值时。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "From my discussions with participants and colleagues about rustout, it is clear that it isn’t a pre-retirement phenomenon.",
            "cn": "从我与受访者和同事们关于锈钝的讨论来看，它显然不是一种\"退休前现象\"。"
          },
          {
            "en": "It seems to arise for those who are experienced, perhaps mid-career, and those who have been in their role for a long time.",
            "cn": "它似乎发生在那些经验丰富、或许正值职业生涯中期、在一个岗位干了很久的人身上。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "One participant explained, “I have been doing [this role] for years.",
            "cn": "一位受访者解释说：\"这份工作我已经做了很多年。"
          },
          {
            "en": "There must be better ways to organize things to ensure the expertise of experienced staff is used in more effective ways.” Others said, “It’s the seven-, eight-, nine-year mark when there isn’t an opportunity to be stimulated,” and “It’s the seven-year itch, you’ve been doing something creative and then you reach a point where you are doing the same thing on repeat.”",
            "cn": "一定有更好的组织方式，能让资深员工的专业知识发挥更大效用。\"另一些人说：\"到了第七、第八、第九个年头，却没有任何被激发的机会\"，还有人说：\"这就是七年之痒——你一直在做有创造性的事，然后到了某个节点，你开始原地转圈，重复同样的事。\""
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "In such ways, we can’t dismiss rustout as a consequence of aging in the workplace.",
            "cn": "由此看来，我们不能把锈钝斥为职场年龄增长的自然结果。"
          },
          {
            "en": "It can happen whenever people are pigeonholed into a system that no longer offers them meaningful development.",
            "cn": "只要一个人被困在一个不再提供有意义成长的系统里，它就可能发生。"
          },
          {
            "en": "Although some repetition and routine are an expected part of every job, there should also be a sense that your abilities and talents matter in your role.",
            "cn": "虽然一定的重复与例行公事是每份工作应有的组成部分，但也应该让人感到：在你的岗位上，你的能力和才干是重要的。"
          },
          {
            "en": "That there is a future and something exciting to work toward.",
            "cn": "应该有未来，有令人兴奋的方向可以奔赴。"
          }
        ]
      },
      {
        "head": 2,
        "sentences": [
          {
            "en": "What to do if you are rusting out",
            "cn": "如果你正在锈钝，该怎么办"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "The language of burnout has helped many people name distress that had previously been normalized or dismissed.",
            "cn": "倦怠这套语言帮助许多人道出了此前被正常化、被忽视的痛苦。"
          },
          {
            "en": "It has also helped organizations take workplace well-being more seriously.",
            "cn": "它也促使组织更认真地对待职场福祉。"
          },
          {
            "en": "But any dominant mental health vocabulary can become limiting when it starts to stand in for the whole field of experience.",
            "cn": "但任何一套占主导地位的心理健康词汇，一旦开始代表全部经验领域，就会变得狭隘。"
          },
          {
            "en": "If burnout is the only category available for occupational distress, then recovery is often imagined in terms of rest and resilience.",
            "cn": "如果倦怠是职业痛苦唯一的可选类别，那么康复往往只会被想象成休息与韧性。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "They may be necessary, but they are not always sufficient.",
            "cn": "它们也许是必要的，但并不总是足够的。"
          },
          {
            "en": "A person experiencing rustout may not simply need less work; they may need different work: work that restores their sense of intellectual engagement and curiosity.",
            "cn": "经历锈钝的人，需要的可能不只是更少的工作，而是不同的工作：能唤回他的智识投入与好奇心的工作。"
          },
          {
            "en": "As Maya Angelou once said, “We aren’t designed to be static”—that could apply to all aspects of life, including the workplace.",
            "cn": "正如玛雅·安杰卢（Maya Angelou）所说：\"我们不是被设计来静止不动的\"——这句话适用于生活的方方面面，包括职场。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you are experiencing rustout, it would be good to do an inventory of what is happening for you.",
            "cn": "如果你正在经历锈钝，不妨盘点一下自己的现状。"
          },
          {
            "en": "Do you feel fulfilled in your role?",
            "cn": "你在现在的岗位上感到充实吗？"
          },
          {
            "en": "Do you have opportunities to use your talents?",
            "cn": "你有机会发挥自己的才干吗？"
          },
          {
            "en": "Do you gain some sense of meaning from your role?",
            "cn": "你能从工作中获得某种意义感吗？"
          },
          {
            "en": "Are there ways to seek renewal in your work?",
            "cn": "有没有在工作里寻求更新的办法？"
          },
          {
            "en": "What might this look like, and can you have this conversation with your line manager or boss?",
            "cn": "那会是什么样子？你能不能和直属上司或老板谈谈这些？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "For organizations, the questions are also direct.",
            "cn": "对组织来说，问题同样直截了当。"
          },
          {
            "en": "Look around your team.",
            "cn": "看看你的团队。"
          },
          {
            "en": "Are you giving your most dependable employees opportunities for development?",
            "cn": "你有没有给最可靠的员工提供发展的机会？"
          },
          {
            "en": "Do you continually lean on their “safe pair of hands” because it is easier than asking someone else to learn the ropes?",
            "cn": "你是否一直在依赖他们那双\"可靠的手\"，因为这样比为别人省事——不必让新人从头学起？"
          },
          {
            "en": "Are you willing to put the conversation about professional dissatisfaction on the table?",
            "cn": "你愿不愿意把职业不满这个话题摆上桌面？"
          },
          {
            "en": "How can you help your team to flourish?",
            "cn": "你如何帮助你的团队蓬勃发展？"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "That is the unsettling truth at the heart of the rustout.",
            "cn": "这就是锈钝核心处那个令人不安的真相。"
          },
          {
            "en": "A person can be conscientious yet disengaged, reliable yet underused, competent but unfulfilled.",
            "cn": "一个人可以尽责却游离，可靠却被大材小用，能干却不满足。"
          },
          {
            "en": "They can be good at their job and still feel themselves receding from it.",
            "cn": "他可以很擅长自己的工作，却同时感到自己正在从这份工作中退场。"
          },
          {
            "en": "The silence around rustout allows it to thrive, which is why I often hear the same response after conference presentations: “I thought it was just me.” I think there is a particular loneliness in that sentence, the loneliness of continuing to do the work, while privately wondering why it no longer feels like yours.",
            "cn": "环绕锈钝的沉默让它得以蔓延——这就是为什么会议报告之后我常听到同一句回应：\"我以为只有我这样。\"我觉得这句话里有一种特别的孤独：继续做着那份工作，私下却在想，为什么它不再像是自己的了。"
          }
        ]
      }
    ]
  },
  {
    "id": "gr-psyche-relationship-ambivalence",
    "cat": "成长",
    "title": "What does it mean to have relationship ambivalence?",
    "titleZh": "对一段关系既爱又厌，意味着什么？",
    "source": "Psyche · 2026-09-22",
    "date": "2026-09-22",
    "minutes": 11,
    "url": "https://psyche.co/ideas/what-does-it-mean-to-have-relationship-ambivalence",
    "coverImg": "assets/covers/gr-psyche-relationship-ambivalence.jpg",
    "translation_type": "ciyue_edited",
    "paras": [
      {
        "sentences": [
          {
            "en": "When a relationship provokes both strong positive and negative feelings in you, it can take a toll – here’s what’s going on",
            "cn": "当一段关系同时激起你强烈的好感与恶感，它是会消耗人的——这里讲讲这到底是怎么回事"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "We tend to talk about our relationships as either satisfying or unsatisfying, healthy or toxic.",
            "cn": "我们谈论自己的关系时，总爱二选一：满意或不满意，健康或有毒。"
          },
          {
            "en": "This either/or perspective shapes a lot of relationship advice, and filters through to the ways many of us chat about our relationship dilemmas with friends.",
            "cn": "这种非此即彼的视角塑造了大量关于关系的建议，也渗透进我们许多人向朋友倾诉关系难题的方式里。"
          },
          {
            "en": "But the reality is that many of our most consequential relationships in life are both positive and negative at the same time (or neither positive nor negative – which I’ll come back to later).",
            "cn": "但现实是，我们生命中许多最重要的关系，是同时既正面又负面的（或者既不正面也不负面——这一点我后面还会谈到）。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You can love your partner tremendously and hate their lack of responsibility.",
            "cn": "你可以深爱你的伴侣，又痛恨他缺乏责任感。"
          },
          {
            "en": "You can feel deeply grateful to your in-laws for all the support they offer while at the same time feeling extremely annoyed by their intrusiveness.",
            "cn": "你可以对岳家、婆家提供的种种支持深怀感激，同时又为他们的处处干涉恼火不已。"
          },
          {
            "en": "You can admire your boss’s effectiveness and be irritated by their micromanaging.",
            "cn": "你可以佩服上司的干练，又被他的事事插手弄得烦躁。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "My colleagues and I recently put forward a new four-quadrant framework for how people evaluate their relationships.",
            "cn": "我和同事们最近提出了一个评估人际关系的新四象限框架。"
          },
          {
            "en": "The experiences I just described would fall into the ambivalent quadrant, which is characterised by having both strong positive and negative feelings toward another person at the same time.",
            "cn": "我刚描述的这些体验就落在\"矛盾心理\"（ambivalent）那一象限，它的特征是对同一个人同时怀有强烈的正面和负面感受。"
          },
          {
            "en": "The other quadrants are feeling mostly positive, mostly negative or indifferent.",
            "cn": "另外三个象限分别是：以正面为主、以负面为主，以及无感。"
          },
          {
            "en": "We believe that ambivalence in relationships has been largely overlooked up until now, even though it’s such a common and consequential experience.",
            "cn": "我们认为，关系中的矛盾心理尽管如此常见、影响如此之大，却在此前基本被忽视了。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "It’s important to say that being in an ambivalent relationship is not the same as finding it mildly satisfying – the distinctive nature of these relationships is that you experience strong positive feelings and strong negative feelings.",
            "cn": "需要说明的是，身处一段矛盾的关系，并不等于对它还算满意——这类关系的独特之处在于，你会同时体验到强烈的正面感受和强烈的负面感受。"
          },
          {
            "en": "It’s also important to distinguish ambivalence from indifference, which occurs when neither positive nor negative feelings are strong and the relationship instead feels emotionally neutral.",
            "cn": "同样重要的是要把矛盾心理与冷漠（indifference）区分开：冷漠是正面与负面感受都不强烈，这段关系在情感上近乎中性。"
          },
          {
            "en": "In other words, ambivalence is ‘I care a lot, but I’m torn,’ while indifference is closer to ‘I’m not especially drawn in, upset, or emotionally invested.’",
            "cn": "换句话说，矛盾是\"我很在乎，但我被撕扯着\"，而冷漠更接近\"我既不特别投入，也不特别沮丧，没有任何情感押注\"。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "How does ambivalence arise in relationships?",
            "cn": "矛盾心理是如何在关系中产生的？"
          },
          {
            "en": "Certainly, some relationships are a mixed package from their very beginning: offering great warmth and connection alongside quirks, costs or complications that never quite disappear.",
            "cn": "当然，有些关系从一开始就是一个混合包裹：它给出巨大的温暖与联结，同时也附带那些从未彻底消失的怪癖、代价或麻烦。"
          },
          {
            "en": "Since their start, they stir both gratitude and frustration, attraction and hesitation.",
            "cn": "从一开始，它们就同时搅动着感激与沮丧、吸引与犹豫。"
          },
          {
            "en": "But ambivalence can also grow over time.",
            "cn": "但矛盾心理也会随着时间生长。"
          },
          {
            "en": "Relationships evolve and studies show that even relationships that start out mostly positive (such as romantic relationships) often accumulate negative feelings as life unfolds and significant challenges emerge.",
            "cn": "关系会演变，而研究表明，即使一开始以正面为主的关系（比如恋爱关系），也会随着生活的展开和重大挑战的出现，累积起负面感受。"
          },
          {
            "en": "Partners change, circumstances shift, responsibilities grow heavier.",
            "cn": "伴侣会变，境遇会变，责任会越来越重。"
          },
          {
            "en": "What once felt effortless now involves compromises, mismatched needs or recurring patterns we didn’t see in the early glow.",
            "cn": "曾经毫不费力的事，如今充满了妥协、错位的需求，或是在早期光环里看不见的、反复出现的模式。"
          },
          {
            "en": "When these negative feelings first emerge, the positive ones do not suddenly dissipate, thus creating ambivalence.",
            "cn": "当这些负面感受初次浮现时，正面感受并不会骤然消散——矛盾心理由此产生。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Think about a relationship in your own life that leaves you feeling torn.",
            "cn": "想一想你自己生活中那段让你倍感撕扯的关系。"
          },
          {
            "en": "Maybe you care deeply about this person and value the bond, yet also feel hurt, frustrated or disappointed by them.",
            "cn": "也许你深切在乎这个人、珍视这份联结，却也常被他伤害、惹恼或失望。"
          },
          {
            "en": "If that feels unsettling, our findings suggest there is a reason: people are often distressed by the mixed feelings of relationship ambivalence.",
            "cn": "如果这让你感到不安，我们的研究结果表明这是有原因的：关系矛盾心理带来的复杂感受，常常令人痛苦。"
          },
          {
            "en": "We do not want to feel pulled in opposite directions about someone who matters to us.",
            "cn": "对一个对我们重要的人，我们不愿感到自己被拉向两个相反的方向。"
          },
          {
            "en": "In fact, our studies (and research by others) have shown that ambivalence in romantic relationships undermines both relationship quality and personal wellbeing.",
            "cn": "事实上，我们的研究（以及其他人的研究）都显示，亲密关系中的矛盾心理会同时损害关系质量和个人幸福感。"
          },
          {
            "en": "And the strain is not only psychological: experiencing ambivalence has been linked to higher blood pressure, greater inflammation and other early markers of cardiovascular risk.",
            "cn": "而且这种消耗不只是心理上的：处于矛盾心理状态，已被发现与更高的血压、更严重的炎症以及其他心血管风险的早期指标相关。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "Despite this tension, we’ve found that ambivalence doesn’t tend to mean that people check out of a relationship – if anything, it often means the opposite.",
            "cn": "尽管有这些撕扯，我们发现矛盾心理并不意味着人们会从关系中抽身离开——如果说有什么倾向，它往往意味着相反的结果。"
          },
          {
            "en": "When someone feels both pulled in and pushed away, they tend to stay mentally busy trying to ‘solve’ the ambivalence: they want to either like or dislike someone; they want to figure out whether the relationship is worth investment or whether it is best to pull away.",
            "cn": "当一个人既被吸引又被推拒时，他的头脑往往忙着去\"解决\"这种矛盾：他想么喜欢这个人，要么讨厌这个人；他想弄清楚这段关系值不值得投入，还是趁早抽身为好。"
          },
          {
            "en": "In fact, in our studies we found that the more ambivalence someone experiences in a romantic relationship, the more they think and ruminate about it.",
            "cn": "事实上，在我们的研究中我们发现：一个人在亲密关系中体验到的矛盾心理越多，他对这段关系的思考和反刍就越多。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "These ruminative thoughts tend to swing in two directions.",
            "cn": "这些反刍式的念头往往在两个方向上摇摆。"
          },
          {
            "en": "At times they are constructive and people think about ways to improve things, fix patterns, reconnect.",
            "cn": "有时它们是建设性的：人们会想怎么改善、怎么修正模式、怎么重新联结。"
          },
          {
            "en": "Other times, their thoughts are pretty destructive, focusing on all the difficulties, problems and flaws of the relationships.",
            "cn": "另一些时候，这些念头相当具有破坏性，聚焦于这段关系的所有困难、问题和缺陷。"
          },
          {
            "en": "That same push‑pull shows up in behaviour.",
            "cn": "同样的推拉也体现在行为上。"
          },
          {
            "en": "Some days people act warmly and constructively, trying to connect with the other person.",
            "cn": "有些日子，人们表现得温暖而有建设性，努力与对方建立联结。"
          },
          {
            "en": "On other days, people are destructive, by withdrawing or blaming and criticising others.",
            "cn": "另一些日子，人们则具有破坏性——退缩，或者指责、批评对方。"
          },
          {
            "en": "And in our studies that have tracked people over time, we see that ambivalence reliably produces these swings, making people fluctuate substantially between these two different types of thoughts and behaviours on a daily basis.",
            "cn": "在那些对人们进行长期追踪的研究中，我们看到矛盾心理会稳定地制造这种摇摆，让人每天在这两类截然不同的想法和行为之间大幅波动。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "So feeling ambivalent does not seem like a walk in the woods.",
            "cn": "所以，心怀矛盾看来并不是一次轻松的林间漫步。"
          },
          {
            "en": "It is stressful and consequential for how people behave in their relationship.",
            "cn": "它是有压力的，也实实在在地影响着人们在关系中的行为。"
          },
          {
            "en": "And what about the person on the receiving end?",
            "cn": "那么，处在接受端的那个人的感受呢？"
          },
          {
            "en": "What happens when your partner has both strong positive and strong negative feelings toward you: one day they want to connect, the next they pull back or critique, and the cycle repeats?",
            "cn": "当你的伴侣对你同时怀有强烈的好感与恶感——今天想靠近，明天就疏远或挑剔，循环往复——会发生什么？"
          },
          {
            "en": "Being on the receiving end of those mixed signals can feel destabilising.",
            "cn": "不断接收这些混杂的信号，会让人觉得天旋地转。"
          },
          {
            "en": "And those shifts – from connection to distance, from support to irritation – aren’t just confusing; they can take a toll on the sense of safety and stability in the relationship.",
            "cn": "而这些摇摆——从联结到疏远，从支持到烦躁——不只是令人困惑；它们会侵蚀这段关系里的安全感与稳定感。"
          },
          {
            "en": "In fact, in our studies , we find that recipients of ambivalence often experience their partner as unpredictable and hard to read.",
            "cn": "事实上，在我们的研究中，处于矛盾心理接受端的人，常常觉得自己的伴侣难以预测、难以读懂。"
          },
          {
            "en": "That uncertainty doesn’t just chip away at relationship quality, it also affects the wellbeing of the recipient of the ambivalence.",
            "cn": "这种不确定性不只是蚕食关系质量，它也影响被矛盾波及者的身心健康。"
          },
          {
            "en": "Recipients report feeling more stressed, in a more negative mood, and less satisfied with their lives overall.",
            "cn": "接受端的人报告说，自己压力更大、情绪更消极，对生活的整体满意度也更低。"
          },
          {
            "en": "It’s clear that ambivalence isn’t a solo experience, it tends to spill over, influencing (and potentially damaging) the person on the other side of the relationship, too.",
            "cn": "显然，矛盾心理不是一个人的独角戏——它往往会外溢，波及（甚至伤害）关系另一端的那个人的感受。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If you recognise these descriptions of relationship ambivalence including the challenges involved, you might be wondering if there’s anything you can do about it.",
            "cn": "如果你在上述对关系矛盾心理的描述（包括其中的种种困境）里认出了自己，你也许想知道：对此能做点什么吗？"
          },
          {
            "en": "There’s no quick fix, but there is some good news.",
            "cn": "没有速效药，但有一些好消息。"
          },
          {
            "en": "First, ambivalence means that the relationship matters to you.",
            "cn": "首先，矛盾心理意味着这段关系对你很重要。"
          },
          {
            "en": "Mixed feelings – strong positives and strong negatives – show up only when someone is important to us.",
            "cn": "混合的感受——强烈的正面与强烈的负面——只会在一个人对我们很重要的时候出现。"
          },
          {
            "en": "If the relationship didn’t matter to you, you wouldn’t feel torn; you would feel indifferent.",
            "cn": "如果这段关系对你无关紧要，你不会感到撕扯；你会无感。"
          },
          {
            "en": "Indifference is the state where even the negative feelings have faded – you’re no longer frustrated or hurt, you’ve simply stopped noticing.",
            "cn": "冷漠是连负面感受都已褪去的状态——你不再沮丧，不再受伤，你只是不再注意了。"
          },
          {
            "en": "So ambivalence, uncomfortable as it is, signals that this is still a meaningful relationship.",
            "cn": "所以，矛盾心理虽然令人不适，却表明这仍是一段有意义的关系。"
          },
          {
            "en": "Second, ambivalence makes you reflect on the relationship.",
            "cn": "其次，矛盾心理促使你反思这段关系。"
          },
          {
            "en": "You are involved, you want to understand what is going on, and decide what should happen next.",
            "cn": "你是投入其中的，你想弄明白发生了什么，并决定接下来该怎么办。"
          },
          {
            "en": "Ambivalence is an important signal that shows you that a rewarding and valuable relationship poses significant costs too, nudging you to ask whether to repair, recalibrate or step back.",
            "cn": "矛盾心理是一个重要的信号：它告诉你，一段有回报、有价值的关系同时也意味着不小的代价，它推着你去追问——是修复，是重新调整，还是退后一步。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "All this means that if you are now recognising for the first time that a significant relationship in your life is ambivalent for you, this awareness is already an important first step.",
            "cn": "这一切意味着，如果你此刻第一次意识到：自己生命中某段重要的关系让你心怀矛盾，那么这份觉察本身已经是重要的第一步。"
          },
          {
            "en": "Becoming aware of your mixed feelings creates an opportunity to reflect on the relationship.",
            "cn": "觉察到自己的复杂感受，为反思这段关系创造了机会。"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "This is a good moment to intervene and influence what happens next.",
            "cn": "此时正是介入并影响后续走向的好时机。"
          },
          {
            "en": "After all, if you are having these mixed feelings, it means two helpful conditions are present:",
            "cn": "毕竟，你之所以有这些复杂感受，说明两个有利条件已经具备："
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "There’s still some positivity to build on.",
            "cn": "其一，还有一些积极面可供依托。"
          },
          {
            "en": "The relationship has rewards; the task is to reduce the negativity, not to build positivity from scratch; and",
            "cn": "这段关系仍有回报；要做的功课是减少消极，而不是从零开始建立积极；并且"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "You are still engaged.",
            "cn": "其二，你仍然是投入的。"
          },
          {
            "en": "You care, you’re motivated, and you’re open to making things better – whether through conversation, reflection, counselling or other forms of support (in other words, you are not in the indifferent quadrant of our framework, which would be worse news for the relationship!)",
            "cn": "你在乎，你有动力，你也愿意把事情变好——无论是通过交谈、反思、心理咨询还是其他形式的支持（换句话说，你还不在我们框架里的冷漠象限——那对这段关系来说是更坏的消息！）"
          }
        ]
      },
      {
        "sentences": [
          {
            "en": "If negativity comes to overwhelm the positives – or if you find yourself starting to drift into indifference – then your window for change will have narrowed.",
            "cn": "如果负面感受最终压过了正面感受——或者你发现自己开始滑向冷漠——那么你做出改变的窗口就会变窄。"
          },
          {
            "en": "Ambivalence, in contrast, sits in a workable in‑between zone, where effort still has room to make a difference.",
            "cn": "相比之下，矛盾心理恰好坐落在一个仍可着力的中间地带，努力还有空间改变现状。"
          },
          {
            "en": "It can be a moment to approach the other person, communicate your needs, and see whether you can find ways together that allow the relationship to improve.",
            "cn": "它可以成为一个契机：走近对方，说出你的需要，看看你们能否一起找到让关系变好的办法。"
          },
          {
            "en": "After all, ambivalence is the emotional equivalent of a blinking yellow light: not a stop, not a go, but an invitation to pay attention.",
            "cn": "毕竟，矛盾心理在情绪上正是一盏闪烁的黄灯：不是停，不是行，而是一个提醒你留心的邀请。"
          },
          {
            "en": "And with the right attention, many relationships can still find their better path.",
            "cn": "只要给以恰当的关注，许多关系依然能找到更好的那条路。"
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
