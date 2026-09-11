/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 77 篇，英文正文来自公开 RSS 的真实报道原文，未做改写；
 * 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：Sky Sports / HistoryExtra / Smithsonian Magazine / CBS News / ABC News / ELLE / Vogue / Who What Wear / Harper's Bazaar / Cosmopolitan / Variety
 */

const ARTICLES_EXTRA = [

  {
    "id": "ft-premier-league-fixtures-bumper-festive-period-",
    "cat": "足球",
    "title": "Premier League fixtures: Bumper festive period announced",
    "titleZh": "英超赛程：盛大的节日赛程宣布",
    "source": "Sky Sports · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://www.skysports.com/football/news/11095/13583921/premier-league-christmas-fixtures-boxing-day-and-festive-schedule-announced-as-29-matches-shown-live-on-sky-sports",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-premier-league-fixtures-bumper-festive-period-.jpg",
    "paras": [
      {
        "en": "Sky Sports will show 29 matches between December 26 and January 7; The Premier League announced the festive fixtures early as it \"gives supporters more than three months' notice to plan and make travel arrangements\"",
        "cn": "天空体育将在12月26日至1月7日期间播出29场比赛；英超提前公布了节日赛程，因为它“给了球迷三个多月的时间来计划和安排旅行”。"
      },
      {
        "img": "assets/covers/ft-premier-league-fixtures-bumper-festive-period--1.jpg",
        "cap": "Image: Watch the Premier League festive fixtures live on Sky Sports"
      },
      {
        "en": "The Premier League's festive fixtures have been announced for this season - with 29 matches available to watch live on Sky Sports between Boxing Day and January 7.",
        "cn": "本赛季英超联赛的节日赛程已经公布，从节礼日到1月7日，天空体育将有29场比赛可供观看。"
      },
      {
        "en": "England's top-flight have announced the festive fixtures more than three months in advance as it \"gives supporters notice to plan and make travel arrangements for a particularly busy time of the year\".",
        "cn": "英格兰顶级联赛提前三个多月宣布了节日赛程，因为这“给了球迷一个通知，让他们在一年中特别繁忙的时候计划和安排旅行”。"
      },
      {
        "en": "It also follows consultation with the Football Supporters' Association and representatives from club Fan Advisory Boards.",
        "cn": "这也是在与足球支持者协会和俱乐部球迷顾问委员会的代表进行磋商之后做出的决定。"
      },
      {
        "en": "There will be seven Premier League matches on Boxing Day this year, with Hull City vs Liverpool - kicking off at 5.30pm - and Newcastle vs Man City - kicking off at 8pm - featuring as a live Sky Sports double header.",
        "cn": "今年节礼日将有七场英超比赛，赫尔城vs利物浦，下午5:30开球，纽卡斯尔vs曼城，晚上8点开球，这是天空体育直播的两场比赛。"
      },
      {
        "en": "A triple header on Sky Sports then follows on Super Sunday on December 27, with Frank Lampard taking on Chelsea as Coventry boss at 2pm.",
        "cn": "天空体育将在12月27日的超级星期日上演三场头球，兰帕德将在下午2点作为考文垂主帅迎战切尔西。"
      },
      {
        "en": "That match is then followed by Manchester United vs Nottingham Forest at 4.30pm, then Crystal Palace vs Arsenal at 7pm.",
        "cn": "这场比赛之后是下午4:30的曼联对阵诺丁汉森林，然后是晚上7点的水晶宫对阵阿森纳。"
      },
      {
        "en": "Every Premier League club has been given at least 60 hours between their Christmas and New Year fixtures.",
        "cn": "每家英超俱乐部在圣诞和新年赛程之间至少有60个小时的休息时间。"
      },
      {
        "en": "There are two festive midweek rounds of Premier League fixtures when every match will be broadcast live on Sky Sports.",
        "cn": "英超联赛周中有两轮喜庆的比赛，每场比赛都将在天空体育进行直播。"
      },
      {
        "en": "Bournemouth transfers, latest news, rumours and gossip: Live updates, goals and highlights",
        "cn": "伯恩茅斯转会，最新消息，谣言和八卦：实时更新，进球和亮点"
      },
      {
        "en": "Henrik Pedersen proving the critics wrong as Sheffield Wednesday surge out of the blocks",
        "cn": "亨里克·彼得森证明了那些批评的人是错的，谢菲尔德星期三队在比赛中突飞猛冲"
      },
      {
        "en": "Tottenham transfer news, rumours and gossip: Live updates and latest on deals, signings, loans and contracts",
        "cn": "热刺转会新闻，谣言和八卦：实时更新和最新的交易，签约，贷款和合同"
      },
      {
        "img": "assets/covers/ft-premier-league-fixtures-bumper-festive-period--2.jpg",
        "cap": ""
      },
      {
        "en": "Crystal Palace transfers, latest news, rumours and gossip: Live updates, goals and highlights",
        "cn": "水晶宫转会，最新消息，谣言和八卦：实时更新，进球和亮点"
      },
      {
        "en": "The first takes place between Tuesday December 29 and Wednesday December 30.",
        "cn": "第一次是在12月29日星期二到12月30日星期三之间。"
      },
      {
        "en": "The other takes place between Tuesday January 5 and Thursday January 7.",
        "cn": "另一个时间是1月5日星期二到1月7日星期四。"
      },
      {
        "en": "And in the weekend in between, Sky Sports will be showing Leeds vs Everton on Friday Night Football on New Year's Day, then Bournemouth vs Aston Villa on January 3 for Saturday Night Football at 5.30pm.",
        "cn": "在这期间的周末，天空体育将在新年当天播放利兹对埃弗顿的周五晚间足球比赛，然后在1月3日下午5:30播放伯恩茅斯对阿斯顿维拉的周六晚间足球比赛。"
      },
      {
        "en": "That weekend's Super Sunday sees Chelsea vs Newcastle at 2pm, then Man City vs Tottenham at 4.30pm.",
        "cn": "那个周末的“超级星期天”是下午2点切尔西vs纽卡斯尔，下午4点半曼城vs热刺。"
      },
      {
        "en": "Broadcast selections for November and early December will be announced before October 19.",
        "cn": "11月和12月初的选播名单将在19日之前公布。"
      }
    ]
  },
  {
    "id": "ft-pl-predictions-hull-s-run-can-t-continue-at-ch",
    "cat": "足球",
    "title": "PL Predictions: Hull's run can't continue at Chelsea, can it? Oh, it can",
    "titleZh": "PL 预测：赫尔城在切尔西的表现不能继续下去了，是吗？哦，可以",
    "source": "Sky Sports · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.skysports.com/football/news/11095/13583782/premier-league-predictions-jones-knows-best-bets-hulls-run-cant-continue-at-chelsea-can-it-oh-it-can",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-pl-predictions-hull-s-run-can-t-continue-at-ch.jpg",
    "paras": [
      {
        "en": "Our football betting expert Lewis Jones is back to preview the weekend card; Watch Tottenham vs Everton, Coventry vs Brighton, Manchester United vs Manchester City & Leeds vs Newcastle live on Sky Sports | Play Super 6 to win £1m!",
        "cn": "我们的足球博彩专家刘易斯·琼斯回来预演周末卡；观看热刺对埃弗顿，考文垂对布莱顿，曼联对曼城和利兹对纽卡斯尔的天空体育直播。玩超级6赢得100万英镑！"
      },
      {
        "img": "assets/covers/ft-pl-predictions-hull-s-run-can-t-continue-at-ch-1.jpg",
        "cap": ""
      },
      {
        "en": "Our top tipster Lewis Jones, aka Jones Knows, provides his analysis and betting insight across the weekend Premier League action.",
        "cn": "我们的顶级线人刘易斯·琼斯，又名琼斯知道，提供他的分析和投注洞察整个周末英超联赛的行动。"
      },
      {
        "en": "Oliver Glanser's record against Unai Emery is an unusually strong tactical head-to-head that is more than just a cute statistic.",
        "cn": "奥利弗·格兰瑟对阵乌奈·埃梅里的记录是一场异常强大的肉搏战，而不仅仅是一个可爱的数据。"
      },
      {
        "en": "Glasner is unbeaten in seven meeting with Emery, winning five and what gives this angle extra robustness is across the last five league meetings Glasner's team are creating 2.47 expected goals per 90.",
        "cn": "格拉斯纳在与埃默里的七次交锋中保持不败，赢了五场，在过去的五次联赛中，格拉斯纳的球队每90分钟创造2.47个预期进球，这让这个角度更加坚固。"
      },
      {
        "en": "He knows how to crack Emery's tactical plan as Glasner's teams are extremely comfortable allowing the opponent possession before attacking the spaces created when the opponent overcommits.",
        "cn": "他知道如何破解埃梅里的战术计划，因为格拉斯纳的球队在进攻对手过度投入时创造的空间之前，总是让对手拥有控球权。"
      },
      {
        "en": "This Glasner hold over Emery isn't factored enough into the match pricing so the draw no bet on Forest at 5/4 with Sky Bet is a touch generous.",
        "cn": "格拉斯纳对埃梅里的控制并没有充分考虑到比赛的定价，所以天空博彩以5/4的赔率赌福里斯特的平局是相当慷慨的。"
      },
      {
        "en": "Week 3 @SkySportsPL Predictions & Best Bet results: Leif Davis to score or assist 4/1 ❌ Brentford/Brentford 9/4 ❌ Aston Villa to win 17/20 ❌ P+L -3 Season P+L +3.47 5/10 correct results 2/10 correct scores pic.twitter.com/3tM4kQYwOK",
        "cn": "第三周@SkySportsPL预测和最佳投注结果：莱夫·戴维斯得分或助攻4/1❌布伦特福德/布伦特福德9/4❌阿斯顿维拉获胜17/20❌P+L -3赛季P+L +3.47 5/10正确结果2/10正确分数pic.twitter.com/3tM4kQYwOK"
      },
      {
        "en": "Brentford have been all the rage with the betting markets over the first three games with the belief that Keith Andrews has improved them over the summer, although a few fingers were burnt, my included, with their lacklustre showing in the 1-1 with Sunderland last weekend.",
        "cn": "在前三场比赛中，布伦特福德一直在博彩市场上大放异彩，他们相信基思·安德鲁斯在整个夏天都改善了他们的表现，尽管上周末他们在1-1桑德兰的比赛中表现平平，但也有一些人受到了伤害，包括我的。"
      },
      {
        "en": "The sample size is small but there seems more aggression and pressing about Brentford this season with a rise in their high turnovers per 90 of 3.1 and 6.2 more fouls committed per 90.",
        "cn": "样本规模很小，但本赛季布伦特福德似乎更具侵略性和压力，他们每90分钟的最高失误增加了3.1次，每90分钟的犯规增加了6.2次。"
      },
      {
        "en": "Vitaly Janelt has been responsible for a lot of that upsurge, making 10 fouls in four games and being booked in all three Premier League games.",
        "cn": "维塔利·贾内尔特对这场热潮负有很大的责任，他在四场比赛中犯规10次，并且在三场英超比赛中都吃到了黄牌。"
      },
      {
        "en": "Up against Adam Scott, who draws over two fouls per game, and Justin Kluivert who was fouled three times at Newcastle, he's going to be in the firing line for fouls.",
        "cn": "面对场均犯规超过两次的亚当·斯科特和在纽卡斯尔被犯规三次的贾斯汀·克鲁伊维特，他将在犯规的火线上。"
      },
      {
        "en": "The 7/4 for him to make two or more fouls is a lovely slice of value.",
        "cn": "对于他来说，7/4的两次或两次以上的犯规是一个可爱的价值。"
      },
      {
        "en": "Hull arrive at Stamford Bridge with seven points from three games and three consecutive clean sheets.",
        "cn": "赫尔三场比赛积7分，连续三场零封，来到斯坦福桥。"
      },
      {
        "en": "It's been jaw dropping the way they have adapted their game to this level of football.",
        "cn": "他们让自己的比赛适应这种水平的足球的方式令人惊叹。"
      },
      {
        "en": "And, this isn't a promoted side accidentally stumbling into three clean sheets.",
        "cn": "而且，这不是一支升班马不小心三次失球的球队。"
      },
      {
        "en": "They are a well-oiled machine without the ball.",
        "cn": "他们是一个没有球的运转良好的机器。"
      },
      {
        "en": "Yes, their expected goals numbers suggest they've ridden their luck to some degree - but this has been an impressive display of defensive organisation, which isn't a new trait.",
        "cn": "是的，他们的预期进球数表明他们在某种程度上依靠了运气——但这是一个令人印象深刻的防守组织展示，这并不是一个新特点。"
      },
      {
        "en": "In their last 16 league games where they've enjoyed less than 45 per cent of the ball and started the match bigger than 2/1, they've conceded just nine goals, losing just two of those games, with those matches averaging a lowly 1.7 goals per game ratio.",
        "cn": "在过去的16场联赛中，他们的控球率低于45%，开局比分大于2比1，他们只丢了9个球，只输了2场，这些比赛的场均进球率只有1.7个。"
      },
      {
        "en": "In that 16-game run they've conceded just two first-half goals.",
        "cn": "在这16场比赛中，他们上半场只丢了两个球。"
      },
      {
        "en": "Can they stop this Chelsea attack?",
        "cn": "他们能阻止切尔西的进攻吗？"
      },
      {
        "en": "It's a fascinating match-up and the way the market is predicting attack to outgun defence with the expected goals line almost at 3.25 based on the odds I'd be wanting to row against that at the prices and give Hull more a chance than the 11/1 away win suggests.",
        "cn": "这是一场令人着迷的比赛，市场预测进攻比防守多，预期进球数几乎是3.25，基于赔率，我想以价格来反对，给赫尔城更多的机会，而不是11/1的客场胜利。"
      },
      {
        "en": "Getting Evens through the BuildABet function for under 1.5 first-half goals paired with under 3.5 total goals looks a shrewd play based on Hull's ability to make games so difficult no matter who the opponent are.",
        "cn": "通过BuildABet功能，上半场进球数在1.5个以下，总进球数在3.5个以下，这看起来是一种精明的发挥，因为赫尔城无论对手是谁，都能让比赛变得如此困难。"
      }
    ]
  },
  {
    "id": "ft-de-zerbi-was-the-key-fernandes-on-his-spurs-sw",
    "cat": "足球",
    "title": "De Zerbi 'was the key' - Fernandes on his Spurs switch and trophy ambitions",
    "titleZh": "德泽比“是关键”——费尔南德斯谈他转投热刺和夺冠野心",
    "source": "Sky Sports · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://www.skysports.com/football/news/11095/13584072/matheus-fernandes-interview-spurs-midfielder-on-the-passion-of-head-coach-roberto-de-zerbi-and-trophy-ambitions",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/ft-de-zerbi-was-the-key-fernandes-on-his-spurs-sw.jpg",
    "paras": [
      {
        "en": "Tottenham searching for first goal and first win of the Premier League season but £85m Matheus Fernandes says the squad with \"a lot of quality\" is aiming to fight for trophies; watch Tottenham vs Everton live on Sky from 5pm on Saturday; kick-off 5.30pm",
        "cn": "托特纳姆热刺正在寻找英超赛季的首球和首胜，但身价8500万英镑的马修斯·费尔南德斯表示，这支“实力很强”的球队的目标是为奖杯而战；从周六下午5点开始在天空电视台观看热刺对埃弗顿的直播；开球5.30点"
      },
      {
        "en": "Spurs may have failed to win any of their first three Premier League games this season, but summer signing Matheus Fernandes is convinced he has joined a squad set to start fighting for trophies.",
        "cn": "热刺本赛季的前三场英超比赛可能一场都没赢，但是夏天签下的费尔南德斯相信他已经加入了一支为奖杯而战的球队。"
      },
      {
        "en": "The £85m midfielder was wanted by a list of clubs after impressing for West Ham last season, with Man Utd keen on a deal but ultimately unable to go head-to-head with Spurs on the fee.",
        "cn": "这位身价8500万英镑的中场球员在上赛季对西汉姆联队表现出色后，曾被多家俱乐部看上，曼联希望与他达成交易，但最终无法在转会费上与热刺展开正面交锋。"
      },
      {
        "en": "For Fernandes, it was his conversations with head coach Roberto De Zerbi which persuaded him the north London project was for him.",
        "cn": "对于费尔南德斯来说，是他和主教练罗伯托·德泽比的谈话说服了他北伦敦的计划是适合他的。"
      },
      {
        "en": "\"I spoke with the Mister and he was the key for this decision,\" Fernandes told Sky Sports ahead of the Saturday Night Football clash with Everton.",
        "cn": "“我和先生谈过了，他是这个决定的关键，”费尔南德斯在周六晚与埃弗顿的比赛前告诉天空体育。"
      },
      {
        "en": "\"You can feel when you speak with him, the energy, the passion about football.",
        "cn": "“当你和他交谈时，你能感受到他对足球的能量和激情。"
      },
      {
        "en": "\"He spoke with me, he spoke with my dad, he spoke with my mum.",
        "cn": "“他和我谈过，他和我爸爸谈过，他和我妈妈谈过。"
      },
      {
        "en": "So it was not just about me, it was about the people around me.",
        "cn": "所以这不仅仅是关于我，也是关于我周围的人。"
      },
      {
        "en": "He said to my dad, 'we'll take care' [of] me.",
        "cn": "他对我爸爸说，‘我们会照顾好我的’。"
      },
      {
        "en": "You can feel on the pitch, off the pitch as well.",
        "cn": "你在场上和场下都能感受到。"
      },
      {
        "en": "And I'm very happy to work with him.\"",
        "cn": "我很高兴和他一起工作。”"
      },
      {
        "en": "Fernandes made his feelings for De Zerbi clear to the Spurs boss himself when the deal was done.",
        "cn": "在交易完成后，费尔南德斯向热刺主帅表达了他对德泽比的感情。"
      },
      {
        "en": "\"The first day of the pre-season, I met him and he was very happy.",
        "cn": "“季前赛的第一天，我见到了他，他很高兴。"
      },
      {
        "en": "I was very happy as well for playing for him.",
        "cn": "我也很高兴为他效力。"
      },
      {
        "en": "I said, 'Look, I chose Tottenham because one of the biggest parts was you'.\"",
        "cn": "我说，‘看，我选择热刺是因为你是最重要的一部分。’”"
      },
      {
        "en": "It wasn't just De Zerbi's way with words.",
        "cn": "这不仅仅是德泽比的语言方式。"
      },
      {
        "en": "The Italian's style of football also impressed Fernandes.",
        "cn": "意大利人的足球风格也给费尔南德斯留下了深刻的印象。"
      },
      {
        "en": "\"For me as a midfielder, I like so much,\" he said.",
        "cn": "“作为一名中场球员，我非常喜欢，”他说。"
      },
      {
        "en": "Fernandes believes the quality of the Spurs squad can raise his own level of performance, too.",
        "cn": "费尔南德斯相信热刺的阵容也能提高他自己的表现水平。"
      },
      {
        "en": "\"I believe that I can be a much better player than I was last season,\" said the 22-year-old Portuguese, who recorded three goals and four assists in the Premier League for the Hammers.",
        "cn": "“我相信我可以成为一个比上赛季更好的球员，”这位22岁的葡萄牙人说，他在英超联赛中为铁锤帮贡献了3个进球和4次助攻。"
      },
      {
        "en": "\"If you look at the squad, it's a big team with big players, important players, players with experience, players with a lot of quality.",
        "cn": "“如果你看看这支球队，你会发现这是一支拥有大牌球员、重要球员、有经验的球员、有实力的球员的强队。"
      },
      {
        "en": "So, when you play with better players, I think you play better.",
        "cn": "所以，当你和更好的球员一起打球时，我认为你会打得更好。"
      },
      {
        "en": "So, I believe that I can be much better.\"",
        "cn": "所以，我相信我可以做得更好。”"
      },
      {
        "en": "Spurs' players have been unable to turn that perception into more than one point so far.",
        "cn": "到目前为止，热刺的球员们还无法将这种感觉转化为一分以上。"
      }
    ]
  },
  {
    "id": "ft-papers-zubimendi-may-push-to-leave-arsenal",
    "cat": "足球",
    "title": "Papers: Zubimendi may push to leave Arsenal",
    "titleZh": "报纸：祖比门迪可能会离开阿森纳",
    "source": "Sky Sports · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://www.skysports.com/football/news/11095/13584130/arsenal-transfer-news-martin-zubimendi-may-push-to-leave-premier-league-champions-paper-talk",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-papers-zubimendi-may-push-to-leave-arsenal.jpg",
    "paras": [
      {
        "en": "Latest transfer news and headlines include: Everton unlikely to move for free agent Anthony Martial despite striker woes; Richarlison is seeking to terminate his contract at Tottenham",
        "cn": "最新的转会新闻和头条新闻包括：埃弗顿不太可能引进自由球员安东尼·马夏尔，尽管前锋陷入困境；理查利森正在寻求终止他在热刺的合同"
      },
      {
        "img": "assets/covers/ft-papers-zubimendi-may-push-to-leave-arsenal-1.jpg",
        "cap": ""
      },
      {
        "en": "Martin Zubimendi may push to leave Arsenal in January after losing his starting sport under Mikel Arteta.",
        "cn": "马丁·祖比门迪可能会在一月份离开阿森纳，因为他在阿尔特塔手下失去了首发位置。"
      },
      {
        "en": "Chelsea and Madrid are reportedly interested in the Spanish international, 27.",
        "cn": "据报道，切尔西和马德里对这名27岁的西班牙国脚很感兴趣。"
      },
      {
        "en": "Everton have played down the possibility of a move for free agent Anthony Martial.",
        "cn": "埃弗顿淡化了引进自由球员马夏尔的可能性。"
      },
      {
        "en": "The former Manchester United striker, 30, most recently played in Mexico for Monterrey.",
        "cn": "这位30岁的前曼联前锋最近在墨西哥的蒙特雷队踢球。"
      },
      {
        "en": "Chelsea's majority owners, Clearlake Capital, are closing in on an agreement to buy out co-owners Todd Boehly and Mark Walter.",
        "cn": "切尔西的大股东明湖资本（Clearlake Capital）即将达成一项协议，收购共同所有者托德·伯利（Todd Boehly）和马克·沃尔特（Mark Walter）的全部股权。"
      },
      {
        "en": "Richarlison is seeking to terminate his contract at Tottenham after being left out of their Premier League squad.",
        "cn": "在被排除在英超大名单之外后，理查利森正在寻求终止他在热刺的合同。"
      },
      {
        "en": "Sunderland and Aston Villa summer striker target Kevin Viveros, is set to sign a new contract with Brazilian club Athletico Paranaense.",
        "cn": "桑德兰和阿斯顿维拉的夏季射手凯文·维维罗斯将与巴西帕拉纳斯竞技俱乐部签订一份新合同。"
      },
      {
        "en": "Follow Sky Sports on WhatsApp for the latest sports news, videos, features, analysis and much more",
        "cn": "在WhatsApp上关注天空体育，获取最新的体育新闻、视频、功能、分析等"
      },
      {
        "en": "Leicester City are heading towards financial 'Armageddon' without fresh capital and improved results, says their prospective new owner Talksport",
        "cn": "莱斯特城未来的新东家Talksport表示，在没有新资本和改善业绩的情况下，莱斯特城正走向财务“末日”"
      },
      {
        "en": "Paper Talk is a review of the sports headlines from the national newspapers, every Monday to Friday, live on Sky Sports News from 10.30pm.",
        "cn": "Paper Talk是每周一至周五晚上10:30在天空体育新闻直播的全国性报纸的体育头条评论。"
      },
      {
        "en": "Catch up on the latest news with the Paper Talk podcast.",
        "cn": "通过Paper Talk播客了解最新消息。"
      },
      {
        "en": "US Open chief Craig Tiley has vowed to keep same day and night format despite Ben Shelton beating Carlos Alcaraz at 3.33am local time.",
        "cn": "尽管本·谢尔顿在当地时间凌晨3点33分击败卡洛斯·阿尔卡拉兹，但美网公开赛主席克雷格·泰利誓言将保持同样的昼夜赛制。"
      },
      {
        "img": "assets/covers/ft-papers-zubimendi-may-push-to-leave-arsenal-2.jpg",
        "cap": ""
      }
    ]
  },
  {
    "id": "ft-mcinnes-rangers-must-get-fans-on-side-in-old-f",
    "cat": "足球",
    "title": "McInnes: Rangers must get fans on side in Old Firm cup clash",
    "titleZh": "麦金尼斯：流浪者队必须在老公司杯的比赛中赢得球迷的支持",
    "source": "Sky Sports · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.skysports.com/football/news/11095/13584014/derek-mcinnes-says-rangers-must-get-fans-on-side-against-celtic-in-league-cup-and-sets-target-to-become-relevant-again",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/ft-mcinnes-rangers-must-get-fans-on-side-in-old-f.jpg",
    "paras": [
      {
        "en": "Rangers host Celtic at Ibrox in Sunday's League Cup quarter-final in manager Derek McInnes' first Old Firm as manager; there will be no away fans after SPFL ruling; Celtic have won all six league games heading into clash while Rangers have four consecutive Premiership wins after poor start",
        "cn": "周日联赛杯四分之一决赛，流浪者队将在伊布罗克斯主场迎战凯尔特人队，这是德里克·麦金尼斯执教的第一个老东家；苏格兰足球联盟裁决后将不会有客场球迷；凯尔特人已经赢得了联赛前的六场比赛，而流浪者则在开局不佳的情况下取得了联赛的四连胜"
      },
      {
        "en": "Derek McInnes wants Rangers to \"bring the crowd with us\" in Sunday's Old Firm clash at Ibrox.",
        "cn": "德里克·麦金尼斯希望流浪者队在周日在伊布罗克斯与老公司的比赛中“把观众带到我们身边”。"
      },
      {
        "en": "The anxiety from the Light Blues legions, which has been prevalent in some games in Govan, resurfaced on Wednesday night as the home side struggled in the second half of the Scottish Premiership clash against St Mirren after missing a host of chances before the break.",
        "cn": "在苏格兰联赛对阵圣米伦的比赛中，主队在中场休息前错过了很多机会，下半场比赛中表现不佳，在戈文的一些比赛中，蓝军军团的焦虑情绪再次浮现。"
      },
      {
        "en": "However, a pressure valve was released when substitute Bojan Miovski scored in stoppage time for a crucial 1-0 win to make it four victories in a row for McInnes and his side.",
        "cn": "然而，替补上场的博扬·米沃夫斯基在补时阶段的进球帮助球队以1-0取得了关键的胜利，从而为麦金尼斯和他的球队取得了四连胜。"
      },
      {
        "img": "assets/covers/ft-mcinnes-rangers-must-get-fans-on-side-in-old-f-1.jpg",
        "cap": "Image: Bojan Miovski scored a stoppage-time winner against St Mirren"
      },
      {
        "en": "Only Rangers fans are allowed in the 50,000-capacity Ibrox for the League Cup quarter-final against Celtic at the order of the authorities amid a ticket allocation spat between the two Glasgow giants.",
        "cn": "联赛杯1 / 4决赛对阵凯尔特人的比赛中，只有流浪者队的球迷才可以进入可容纳5万人的伊布罗克斯球场观看比赛。"
      },
      {
        "en": "Former Rangers midfielder McInnes, looking forward to his first Old Firm game as boss, is hoping for positivity from the Gers supporters.",
        "cn": "前流浪者队中场麦金尼斯期待着他作为主教练的第一场老东家比赛，他希望从热刺的支持者那里得到积极的态度。"
      },
      {
        "en": "\"You're not going to play Celtic and dominate the game for 90 minutes.",
        "cn": "“你不可能在对阵凯尔特人的90分钟里统治比赛。"
      },
      {
        "en": "We'll have spells, they'll have spells, it's just the way it is.",
        "cn": "我们有咒语，他们也有咒语，事情就是这样。"
      },
      {
        "en": "\"I think it's important that we tap into having that 50,000 behind us and be behind the players, support them, have their backs, not be on their backs and really make it as tough for Celtic as possible.",
        "cn": "“我认为重要的是，我们要充分利用这5万球迷的支持，支持他们，支持他们，而不是让他们背上背，让凯尔特人尽可能地艰难。"
      },
      {
        "en": "\"We've got our part to play in that and I felt that if we can capitalise on good play and good opportunities, which we didn't do last night and we didn't do against Motherwell (also won 1-0) obviously, if we can get ourselves in front, give the crowd something to get behind, then I think the strength of our club can be shown.",
        "cn": "“我们已经做好了自己的工作，我觉得如果我们能利用好比赛和机会，这是我们昨晚没有做到的，我们在对阵马瑟韦尔的比赛中也没有做到（我们也以1比0获胜），如果我们能领先，给观众一些支持，那么我认为我们俱乐部的实力可以展示出来。”"
      },
      {
        "en": "\"I think if the 50,000 can be utilised and we can have the strength of performance in the team that will help the team, it will be difficult to stop.",
        "cn": "“我认为，如果这5万名球员能够得到充分利用，并且我们能够在球队中发挥作用，这将有助于球队，这将很难停止。”"
      },
      {
        "en": "\"There's been a lot of frustration over a period of time at the club and it's up to us to try and show that we're going to deliver something a bit different.",
        "cn": "“一段时间以来，俱乐部经历了很多挫折，这取决于我们的努力，并表明我们将提供一些不同的东西。"
      },
      {
        "en": "\"We recognise Celtic are a good team who have been the main title winners and the team that's picked up more trophies than any other club in recent years.",
        "cn": "“我们认识到凯尔特人是一支优秀的球队，他们是主要的冠军得主，也是近年来获得奖杯最多的球队。"
      },
      {
        "en": "\"We just want to make sure that we give ourselves a chance to be relevant domestically again in terms of winning trophies, and Sunday gives us a chance to take a step towards that.\"",
        "cn": "“我们只是想确保我们给自己一个在国内赢得奖杯的机会，周日给了我们一个朝着这个目标迈出一步的机会。”"
      },
      {
        "en": "Greek outfit Aris Thessaloniki are in talks to sign Rangers defender John Souttar.",
        "cn": "希腊球队Aris Thessaloniki正在洽谈签下流浪者后卫John Souttar。"
      },
      {
        "en": "The 29-year-old signed a new deal until 2027 earlier this year, with Rangers retaining the option to extend that by a further 12 months.",
        "cn": "今年早些时候，这位29岁的球员与流浪者队签订了一份到2027年的新合同，流浪者队保留了再延长12个月的选择权。"
      },
      {
        "en": "However, Sky Sports News reported during the summer transfer window that the Scotland international has been made surplus to requirements at Ibrox.",
        "cn": "然而，天空体育在夏季转会窗口报道，苏格兰国脚已经超出了伊布罗克斯的需求。"
      },
      {
        "en": "Souttar was left out of the club's pre-season trip to Spain and has not featured under new boss McInnes.",
        "cn": "苏塔没有参加俱乐部季前赛的西班牙之旅，也没有在新主帅麦金尼斯的带领下出场。"
      },
      {
        "en": "\"There's a bit of interest in him from one or two clubs.",
        "cn": "“有一两个俱乐部对他有兴趣。"
      },
      {
        "en": "One club maybe a bit further down the line than the other but I think it's something that could develop.",
        "cn": "一个俱乐部可能比另一个走得更远，但我认为这是可以发展的。"
      }
    ]
  },
  {
    "id": "ft-chelsea-hit-six-second-half-goals-to-see-off-l",
    "cat": "足球",
    "title": "Chelsea hit SIX second-half goals to see off Leeds in Carabao Cup classic",
    "titleZh": "在卡拉宝杯的经典比赛中，切尔西在下半场打进6个球，将利兹联淘汰出局",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.skysports.com/football/chelsea-vs-leeds-united/report/577586",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-chelsea-hit-six-second-half-goals-to-see-off-l.jpg",
    "paras": [
      {
        "en": "Report and free match highlights from the Carabao Cup third-round tie between Chelsea and Leeds at Stamford Bridge; Blues net six second-half goals with Cole Palmer, Danny Welbeck, Pedro Neto and Valentin Barco on target",
        "cn": "切尔西和利兹在斯坦福桥的第三轮对阵卡拉宝杯的比赛报告和免费比赛亮点；蓝军在下半场与科尔·帕尔默、丹尼·韦尔贝克、佩德罗·内托和瓦伦丁·巴科进球"
      },
      {
        "en": "An incredible second-half comeback including six goals in 41 minutes saw Chelsea finally blow away Leeds 6-3 in one of the all-time Carabao Cup classics at Stamford Bridge.",
        "cn": "令人难以置信的下半场复出，包括在41分钟内的6个进球，切尔西终于在斯坦福桥的历史卡拉宝杯经典之一中以6比3击败了利兹队。"
      },
      {
        "en": "The Blues found themselves two goals behind when Brenden Aaronson struck after 47 minutes to add to Tarik Muharemovic's opener, and it appeared Xabi Alonso's first real cup test would end in disappointment - despite the half-time introduction of Cole Palmer, Morgan Rogers, Pedro Neto and Reece James.",
        "cn": "布兰登·亚伦森（Brenden Aaronson）在47分钟后击中塔里克·穆哈雷莫维奇（Tarik Muharemovic）的揭幕战后，蓝军发现自己落后了两个进球，尽管科尔·帕尔默（Cole Palmer）、摩根·罗杰斯（Morgan Rogers）、佩德罗·内托（Pedro Neto）和里斯·詹姆斯（Reece James）中场休息，但似乎萨比·阿隆索"
      },
      {
        "en": "A Palmer penalty turned the game on its head suddenly after Pep Chavarria was caught by Dan James, but it was Rogers who inspired the comeback, making four of Chelsea's six goals.",
        "cn": "佩普·查瓦里亚（Pep Chavarria）被丹·詹姆斯（Dan James）抓住后，帕尔默（Palmer）的点球突然扭转了局面，但正是罗杰斯（Rogers）激发了复出，在切尔西的六个进球中"
      },
      {
        "en": "Three of those assists - for Palmer's second, Neto's strike and the first of two for Danny Welbeck - came as Chelsea netted three times more in 12 minutes, including Welbeck's fourth which should have given them breathing space when he fired through Michael Zetterer's legs.",
        "cn": "其中三次助攻-帕尔默的第二次助攻，内托的罢工和丹尼·韦尔贝克的两次助攻中的第一次助攻-切尔西在12分钟内获得了三倍以上的成绩，其中包括韦尔贝克的第四次助攻，当他射穿迈克尔·泽特勒的腿时，应该给他们喘息的空间。"
      },
      {
        "en": "Not for the first time in Alonso's short reign however, chaos once again reigned over control as Leeds continued to create chances before Dominic Calvert-Lewin pulled them back to within a goal with 15 minutes to go.",
        "cn": "然而，在阿隆索短暂的统治期间，混乱再次统治了控制权，因为利兹在多米尼克·卡尔弗特-莱温（Dominic Calvert-Lewin）将他们拉回15分钟内的目标之前继续创造机会。"
      },
      {
        "en": "It was still uncertain that Chelsea had finally sealed their progress when Valentin Barco blasted them 5-3 up from close range from another Rogers assist, but they could finally rest easy in added time - and extinguish Leeds' commendable never-say-die attitude - when Welbeck nodded Barco's wildly mishit effort beyond Zetterer.",
        "cn": "当瓦伦丁·巴科（Valentin Barco）从另一位罗杰斯（Rogers）助手的近距离以5比3击败他们时，切尔西最终是否已经封锁了他们的进步仍不确定，但当韦尔贝克（Welbeck）点头点头时，他们终于可以在额外的时间内轻松休息，并消除利兹（Leeds）值得称赞的永不言败的态度。"
      },
      {
        "en": "If there was ever a goal to sum up a game, this was it.",
        "cn": "如果有一个目标来总结一场比赛，那就是它。"
      },
      {
        "en": "Alonso was handed another clear indication of where his side remain lacking - but for now, chaos isn't serving them too badly.",
        "cn": "阿隆索得到了另一个明确的迹象，表明他的球队仍然缺乏-但目前，混乱并没有为他们服务得太糟糕。"
      },
      {
        "en": "\"We played with confidence, there was not even a chance for them, then the referee decided to give a penalty.",
        "cn": "“我们充满信心地踢球，他们甚至没有机会，然后裁判决定点球。"
      },
      {
        "en": "\"Nobody was asking for it, all of a sudden their players came into the game.",
        "cn": "“没有人要求它，突然他们的球员进入了比赛。"
      },
      {
        "en": "The momentum was on their side.",
        "cn": "势头是站在他们一边的。"
      },
      {
        "en": "Situations can change the whole momentum of the game.\"",
        "cn": "形势可以改变整个游戏的势头。”"
      },
      {
        "en": "Things weren't going the way we planned, so we had to change.",
        "cn": "事情没有按照我们的计划进行，所以我们不得不做出改变。"
      },
      {
        "en": "I take responsibility with the first half.",
        "cn": "我对上半场负责。"
      },
      {
        "en": "The crowd were great, with the atmosphere [pushing the players on].",
        "cn": "人群很棒，气氛[推动球员前进]。"
      },
      {
        "en": "\"I like that [the substitutes] were ready before the game.",
        "cn": "“我喜欢[替补队员]在比赛前就已经准备好了。"
      },
      {
        "en": "They knew they weren't starting and they were ready to make an impact.",
        "cn": "他们知道自己还没有开始，他们已经准备好产生影响。"
      },
      {
        "en": "\"When you put together a team that hardly plays together, it is difficult to play at this level when [Leeds] are intense.\"",
        "cn": "“当你组建一支几乎无法一起比赛的球队时，当[利兹]非常激烈时，很难在这个级别上比赛。”"
      },
      {
        "en": "Me and Morgan Rogers, Joao Pedro, the attacking players.",
        "cn": "我和摩根·罗杰斯，乔奥·佩德罗，进攻球员。"
      },
      {
        "en": "\"We've still got a bit to go, but we're getting results and that's the main thing.\"",
        "cn": "“我们还有一段路要走，但我们正在取得成果，这是最重要的。”"
      },
      {
        "en": "Mike Penders is called into action twice in a matter of seconds to deny Muharemovic and Aaronson with a superb double save.",
        "cn": "Mike Penders在几秒钟内两次被要求采取行动，以拒绝Muharemovic和Aaronson的精彩双扑救。"
      },
      {
        "en": "From the second of two subsequent corners, Muharemovic rises highest at the back post to nod the opener back inside the opposite corner.",
        "cn": "从接下来的两个角落中的第二个角落，穆哈雷莫维奇在后柱上升得最高，向对角内的揭幕战点头。"
      },
      {
        "en": "Palmer, Rogers, James and Neto are introduced for Estevao, Jamie Gittens, Malo Gusto and 16-year-old debutant Reggie Watson.",
        "cn": "为Estevao、Jamie Gittens、Malo Gusto和16岁的Reggie Watson介绍Palmer、Rogers、James和Neto。"
      }
    ]
  },
  {
    "id": "ft-poch-i-hope-to-return-to-premier-league-in-fut",
    "cat": "足球",
    "title": "Poch: I hope to return to Premier League in future",
    "titleZh": "波帅：希望将来能重返英超",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.skysports.com/football/news/11095/13583564/mauricio-pochettino-ex-tottenham-and-chelsea-boss-hopes-to-return-to-premier-league-in-future",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/ft-poch-i-hope-to-return-to-premier-league-in-fut.jpg",
    "paras": [
      {
        "en": "Mauricio Pochettino speaks to Sky Sports News' Gail Davis in an exclusive interview; ex-Tottenham and Chelsea boss reveals hope of returning to Premier League in future; last month, the Argentine signed a new four-year deal to continue as the manager of the USA men's team",
        "cn": "毛里西奥·波切蒂诺（Mauricio Pochettino）在接受天空体育新闻（Sky Sports News）的盖尔·戴维斯（Gail Davis）独家采访时表示；前托特纳姆热刺和切尔西主帅透露了未来重返英超联赛的希望；上个月，阿根廷人签署了一份新的四年合同，继续担任美国男子队的经理"
      },
      {
        "en": "Mauricio Pochettino has always been good company - warm, engaging and likeable.",
        "cn": "Mauricio Pochettino一直是好伙伴--热情、迷人、可爱。"
      },
      {
        "en": "Having had a few weeks to reset away from the spotlight, there were enthusiastic hugs all round for the Sky Sports News team as we all swapped summer stories.",
        "cn": "在离开聚光灯几周后，天空体育新闻团队充满了热情的拥抱，因为我们都交换了夏天的故事。"
      },
      {
        "en": "His, though, has been rather busier than ours.",
        "cn": "不过，他比我们更忙。"
      },
      {
        "en": "The former Tottenham boss guided the USA team to the last 16 of the World Cup, where the host nation's dreams of victory came to a crashing halt against Belgium, but that barely tells the story of an extraordinary few weeks for the Argentine.",
        "cn": "这位前托特纳姆热刺主帅带领美国队参加了世界杯的最后16场比赛，东道国的胜利梦想在对阵比利时的比赛中戛然而止，但这几乎没有讲述阿根廷人非凡的几周的故事。"
      },
      {
        "en": "There was Donald Trump - there was always going to be - and the changing-room team talk.",
        "cn": "唐纳德·特朗普（Donald Trump）-总是会有-和更衣室团队的谈话。"
      },
      {
        "en": "There was Trump, FIFA and Folarin Balogun's suspension of his suspension, and along the way, Pochettino became something of a fashion icon.",
        "cn": "特朗普、国际足联和Folarin Balogun暂停了他的停赛，一路上，波切蒂诺成为了一个时尚偶像。"
      },
      {
        "en": "Then a few weeks later, another significant headline - Pochettino had, a little surprisingly perhaps, signed for four more years with the USA.",
        "cn": "然后几周后，另一个重要的头条新闻-波切蒂诺与美国签订了四年的合同，也许有点令人惊讶。"
      },
      {
        "en": "I smile before jesting, and Pochettino just laughs and says he's ready.",
        "cn": "我在开玩笑之前微笑，波切蒂诺只是笑着说他已经准备好了。"
      },
      {
        "en": "His reflections on the World Cup seem like as good a place to get going.",
        "cn": "他对世界杯的思考似乎是一个很好的去处。"
      },
      {
        "img": "assets/covers/ft-poch-i-hope-to-return-to-premier-league-in-fut-1.jpg",
        "cap": "Image: Pochettino had to cope with the Folarin Balogun suspension saga at the World Cup"
      },
      {
        "en": "For Pochettino, the biggest takeaway is how much he and his coaching staff, including his long-term lieutenant Jesus Perez, have learned.",
        "cn": "对于Pochettino来说，最大的收获是他和他的教练组，包括他的长期副手Jesus Perez ，学到了多少东西。"
      },
      {
        "en": "\"We are much better coaches now,\" he insists.",
        "cn": "“我们现在是更好的教练，”他坚持说。"
      },
      {
        "en": "It is revealing because the World Cup has reinforced his appetite to keep learning and evolving.",
        "cn": "这很有启发性，因为世界杯增强了他不断学习和发展的胃口。"
      },
      {
        "en": "He talks about the importance of the smallest details, the difficulty of getting every decision right and the challenge of translating his ideas to a group of players who spend far less time together than a club side.",
        "cn": "他谈到了最小细节的重要性，做出正确决定的难度，以及将他的想法转化为一群在一起的时间远远少于俱乐部球员的球员所面临的挑战。"
      },
      {
        "en": "He adds, \"Everything needs to be perfect.\"",
        "cn": "他补充说：“一切都需要完美。”"
      },
      {
        "en": "There were times during the tournament when life must have felt a little wild, I suggest.",
        "cn": "我建议，在比赛期间，生活一定感觉有点狂野。"
      },
      {
        "en": "There's managing at the World Cup, then there's managing at a home World Cup for a nation whose President rather enjoys the spotlight.",
        "cn": "在世界杯上进行管理，然后在一个主场世界杯上为一个总统更喜欢聚光灯的国家进行管理。"
      },
      {
        "en": "Unsurprisingly, Pochettino chooses his words carefully, focusing on the support and backing Trump gave the side.",
        "cn": "不出所料，波切蒂诺谨慎地选择了他的话，专注于特朗普的支持和支持。"
      },
      {
        "en": "At the time, he was asked about his role in getting the Balogun suspension suspended, and he admitted the \"politics and manipulation\" did overshadow the game against Belgium.",
        "cn": "当时，他被问及他在暂停Balogun停赛中的作用，他承认“政治和操纵”确实掩盖了对比利时的比赛。"
      },
      {
        "en": "Pochettino understood the anger around the situation, but his role was much simpler - \"If you pay attention to the noise, you become crazy.\" FIFA allowed Balogun to play and he says, \"When the letter arrived the day before the game confirming Balogun was available, the decision was straightforward.\"",
        "cn": "波切蒂诺理解周围的愤怒，但他的角色要简单得多-- “如果你注意噪音，你就疯了。“国际足联允许Balogun参加比赛，他说，”当比赛前一天收到确认Balogun可用的信时，决定很简单。“"
      },
      {
        "en": "Balogun has been in the headlines again over the past few weeks after his proposed move from Monaco to Everton collapsed late on Deadline Day.",
        "cn": "Balogun在截止日期当天晚些时候从摩纳哥搬到埃弗顿的提议崩溃后，过去几周再次成为头条新闻。"
      },
      {
        "en": "Pochettino has not spoken to him yet.",
        "cn": "波切蒂诺还没有和他说过话。"
      },
      {
        "en": "He has deliberately given him some space because he knows it would have been a difficult situation.",
        "cn": "他故意给他一些空间，因为他知道这将是一个困难的局面。"
      },
      {
        "en": "He would, he says, have liked to see Balogun playing in the Premier League.",
        "cn": "他说，他本来希望看到Balogun参加英超联赛。"
      }
    ]
  },
  {
    "id": "ft-papers-liverpool-eye-january-swoop-for-chelsea",
    "cat": "足球",
    "title": "Papers: Liverpool eye January swoop for Chelsea and Man Utd midfield target",
    "titleZh": "报纸：利物浦瞄准一月份的切尔西和曼联中场目标",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 2,
    "url": "https://www.skysports.com/football/news/11095/13583799/liverpool-transfer-news-as-roma-midfielder-manu-kone-on-anfield-radar-ahaed-of-january-transfer-window-paper-talk",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/ft-papers-liverpool-eye-january-swoop-for-chelsea.jpg",
    "paras": [
      {
        "en": "Latest transfer news and headlines include: Newcastle could still sell Lewis Hall next summer despite a reported new deal; Nottingham Forest may revive their interest in Lucas Bergval in January",
        "cn": "最新的转会新闻和头条新闻包括：尽管有新交易的报道，纽卡斯尔明年夏天仍可能出售刘易斯·霍尔；诺丁汉森林可能会在1月份恢复对卢卡斯·伯格瓦尔的兴趣"
      },
      {
        "img": "assets/covers/ft-papers-liverpool-eye-january-swoop-for-chelsea-1.jpg",
        "cap": ""
      },
      {
        "en": "Liverpool have placed AS Roma midfielder Manu Koné on their radar as they consider potential January reinforcements.",
        "cn": "利物浦已经把罗马中场马努·科内放在了他们的雷达上，因为他们考虑了1月份的潜在增援。"
      },
      {
        "en": "Liverpool have plans to sign another midfielder next summer, which would push Argentina international Alexis Mac Allister further down the pecking order at Anfield.",
        "cn": "利物浦计划明年夏天签下另一名中场球员，这将使阿根廷国脚亚历克西斯·麦克·阿利斯特在安菲尔德的排名进一步下降。"
      },
      {
        "en": "Newcastle could still sell Lewis Hall next summer despite the 22-year-old England left-back reportedly agreeing a new contract with the Magpies until 2031.",
        "cn": "尽管据报道，这位22岁的英格兰左后卫与喜鹊队达成了直到2031年的新合同，但纽卡斯尔仍有可能在明年夏天出售刘易斯·霍尔。"
      },
      {
        "en": "Lewis Hall' s new Newcastle United contract will not include a release clause.",
        "cn": "刘易斯·霍尔（Lewis Hall）的新纽卡斯尔联队合同将不包括解除条款。"
      },
      {
        "en": "Kendry Páez is not currently part of Chelsea 's first-team plans following the early termination of his loan spell at River Plate last month.",
        "cn": "Kendry Páez上个月在River Plate的租借期提前结束后，目前不属于切尔西的一线队计划。"
      },
      {
        "en": "Paper Talk is a review of the sports headlines from the national newspapers, every Monday to Friday, live on Sky Sports News from 10.30pm.",
        "cn": "Paper Talk是每周一至周五晚上10:30在天空体育新闻直播的全国性报纸的体育头条评论。"
      },
      {
        "en": "Catch up on the latest news with the Paper Talk podcast.",
        "cn": "通过Paper Talk播客了解最新消息。"
      },
      {
        "en": "Nottingham Forest could revive their interest in Tottenham midfielder Lucas Bergvall in January.",
        "cn": "诺丁汉森林可能会在一月份恢复他们对托特纳姆热刺中场球员卢卡斯·伯格瓦尔的兴趣。"
      },
      {
        "en": "- Telegraph Ryan Giggs believes JJ Gabriel is a \"generational talent\" who reminds him of Wayne Rooney, but he's urged the Manchester United youngster to remain patient for his first-team breakthrough.",
        "cn": "-《每日电讯报》瑞安·吉格斯（Ryan Giggs）认为，JJ加布里埃尔（JJ Gabriel）是一位“世代相传的天才”，让他想起了韦恩·鲁尼（Wayne Rooney），但他敦促这位曼联年轻人对他的一线队突破保持耐心。"
      },
      {
        "en": "Barcelona are looking to sell Frenkie de Jong when the January transfer window opens.",
        "cn": "巴塞罗那希望在1月转会窗口打开时出售Frenkie de Jong。"
      },
      {
        "en": "Follow Sky Sports on WhatsApp for the latest sports news, videos, features, analysis and much more",
        "cn": "在WhatsApp上关注天空体育，获取最新的体育新闻、视频、功能、分析等"
      },
      {
        "en": "Rangers summer signing Daisuke Yokota - who was ruled out of the St Mirren game through injury - is also set to undergo surgery and the Japanese winger is also facing a lengthy period out.",
        "cn": "流浪者队夏季签约横田大辅-因受伤被排除在圣米伦比赛之外-也将接受手术，这位日本边锋也面临着漫长的时期。"
      },
      {
        "en": "David Martindale has pledged he won't be stepping back into the Livingston dugout long-term.",
        "cn": "大卫·马丁代尔（David Martindale）承诺，他不会长期退回利文斯顿防空洞。"
      },
      {
        "img": "assets/covers/ft-papers-liverpool-eye-january-swoop-for-chelsea-2.jpg",
        "cap": ""
      }
    ]
  },
  {
    "id": "ft-baur-s-first-celtic-goal-secures-victory-again",
    "cat": "足球",
    "title": "Baur's first Celtic goal secures victory against St Johnstone",
    "titleZh": "鲍尔的第一个进球确保了凯尔特人对圣约翰斯通的胜利",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 3,
    "url": "https://www.skysports.com/football/st-johnstone-vs-celtic/report/558350",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/ft-baur-s-first-celtic-goal-secures-victory-again.jpg",
    "paras": [
      {
        "en": "Report as Celtic beat St Johnstone 1-0 at McDiarmid Park; Mika Baur scores his first Hoops goal to secure the victory; Martin O'Neill's side have won all six of their Scottish Premiership games this season",
        "cn": "报道称，凯尔特人在麦克迪尔米德公园以1比0击败圣约翰斯通；米卡·鲍尔打进了他的第一个篮球进球，以确保胜利；马丁·奥尼尔的球队本赛季赢得了苏格兰超级联赛的所有六场比赛"
      },
      {
        "en": "Mika Baur scored his first Celtic goal as they extended the winning start to their latest Scottish Premiership title defence to six games.",
        "cn": "米卡·鲍尔（Mika Baur）打进了他的第一个凯尔特人进球，因为他们将获胜的开局扩展到他们最新的苏格兰超级联赛冠军防守，"
      },
      {
        "en": "With a Europa League tie and an Old Firm cup and league double coming up, Martin O'Neill made five changes as Kasper Hogh returned from injury and Sam Johnstone took over in goal.",
        "cn": "随着欧罗巴联赛平局和老公司杯和联赛双打的到来，马丁·奥尼尔（Martin O'Neill）做出了五项改变，卡斯珀·霍格（Kasper Hogh）因伤复出，萨姆·约翰斯通（Sam Johnstone）接"
      },
      {
        "en": "The on-loan keeper produced a huge save to deny Joel Cotterill - on his first St Johnstone start - as the hosts enjoyed the best of the chances.",
        "cn": "这位租借守门员做出了巨大的挽救，否认了Joel Cotterill -在他的第一次圣约翰斯通开始时-因为房东们享受到了最好的机会。"
      },
      {
        "en": "The defending champions did take the lead after the break as Baur tapped in from Haissem Hassan's cross.",
        "cn": "休息后，卫冕冠军确实取得了领先，鲍尔从海塞姆·哈桑的十字架上踢了进来。"
      },
      {
        "en": "The Egypt international was later denied his first goal with the ball ruled out of play before Hogh sent it back in for him to score.",
        "cn": "这位埃及国脚后来被拒绝了他的第一个进球，球被排除在外，然后霍格将球送回给他进球。"
      },
      {
        "en": "The Premiership newcomers were unbeaten at McDiarmid Park this season and had chances to take something, but the champions held on to stay five points clear of second-placed Rangers at the top of the table.",
        "cn": "英超新人本赛季在麦克迪尔米德公园保持不败，并有机会取得一些成绩，但冠军们保持着五分的优势，远离排名第二的流浪者队。"
      },
      {
        "en": "Although far from their convincing best, the Hoops did enough to close out their 13th win in a row in total stretching back to the closing weeks of last season.",
        "cn": "虽然远非他们令人信服的最佳成绩，但篮筐队已经做了足够的努力，在上赛季的最后几周结束了连续第13场胜利。"
      },
      {
        "en": "O'Neill's men are now five points clear of second-placed Rangers, who they also face in their next Premiership match a week on Sunday, live on Sky Sports.",
        "cn": "奥尼尔的球员现在比排名第二的流浪者队落后5分，他们也在周日的下一场英超比赛中面对天空体育。"
      },
      {
        "en": "A strong stop from the Saints goalkeeper, turning the ball past as Celtic push for an early opener.",
        "cn": "圣徒守门员强有力的一站，在凯尔特人推动早期揭幕战时，将球转过身去。"
      },
      {
        "en": "Cotterill meets Alic's low cross.",
        "cn": "Cotterill与Alic的低十字架相遇。"
      },
      {
        "en": "He looks certain to score but Johnstone palms over.",
        "cn": "他看起来肯定会得分，但约翰斯通手掌在身上。"
      },
      {
        "en": "McGregor's shot is deflected past by Campbell.",
        "cn": "麦格雷戈的镜头被坎贝尔挡过去了。"
      },
      {
        "en": "The corner comes in and Steward punches it clear.",
        "cn": "拐角进来了，管家把拳头打得很清楚。"
      },
      {
        "en": "Diabate's effort for the hosts is hooked off the line by Donovan.",
        "cn": "Diabate为房东所做的努力被Donovan迷住了。"
      },
      {
        "en": "A brilliant cross into the box from Tounekti is headed past by Diabate.",
        "cn": "一个来自Tounekti的辉煌十字架被Diabate带到了盒子里。"
      },
      {
        "en": "McAlear beats McGregor and sets up Steven, but his effort is straight at Celtic keeper Johnstone.",
        "cn": "McAlear击败了McGregor并设置了Steven ，但他的努力是直接在凯尔特人守门员Johnstone。"
      },
      {
        "en": "Baur taps in from Hassan's low cross for his first Celtic goal.",
        "cn": "鲍尔从哈桑的低位十字架上踢出他的第一个凯尔特人进球。"
      },
      {
        "en": "Celtic have the ball in the net but it won't stand.",
        "cn": "凯尔特人有球在网中，但它不会站立。"
      },
      {
        "en": "Hogh headed it back into Hassan to smash in, but it had gone out of play before he sent it in.",
        "cn": "霍格把它送回哈桑那里砸了进去，但在他把它送进去之前，它已经失灵了。"
      },
      {
        "en": "Hogh lays the ball off to Hassan but his curling effort is pushed past by Steward.",
        "cn": "Hogh将球交给了Hassan ，但他的冰壶努力被Steward推倒了。"
      },
      {
        "en": "Brilliant from Forrest, denied by Steward.",
        "cn": "来自福雷斯特的辉煌，被管家否认。"
      },
      {
        "en": "He twists and turns on the edge of the box before his effort is palmed away.",
        "cn": "他扭动着盒子的边缘，然后他的努力就消失了。"
      },
      {
        "en": "His shot comes in but Steward sends it out for a corner.",
        "cn": "他的投篮进来了，但Steward将其发送到角落。"
      }
    ]
  },
  {
    "id": "ft-rangers-snatch-late-win-over-st-mirren-as-sub-",
    "cat": "足球",
    "title": "Rangers snatch late win over St Mirren as sub Miovski extends winning run",
    "titleZh": "流浪者队在最后时刻战胜圣米伦队，米奥夫斯基延续了连胜势头",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.skysports.com/football/rangers-vs-st-mirren/report/558349",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/ft-rangers-snatch-late-win-over-st-mirren-as-sub-.jpg",
    "paras": [
      {
        "en": "Report as Bojan Miovski's stoppage-time dink snatched victory after St Mirren had passed up the game's biggest chance through Fraser Taylor; Rangers move above St Mirren in the Scottish Premiership",
        "cn": "据报道，在圣米伦（St Mirren）通过弗雷泽·泰勒（Fraser Taylor）放弃了比赛的最大机会之后，博扬·米奥夫斯基（Bojan Miovski）的停赛时间获得了胜利；流浪者队在苏格兰超级联赛中超越了圣米"
      },
      {
        "en": "Bojan Miovski's cute dink in stoppage time sealed a dramatic 1-0 victory for Rangers over St Mirren and extended their winning run to four games in the Scottish Premiership.",
        "cn": "博扬·米奥夫斯基（Bojan Miovski）在停赛时间的可爱表演使流浪者队以1比0击败圣米伦队，并将他们在苏格兰超级联赛中的胜利延长至四场比赛。"
      },
      {
        "en": "The substitute raced onto Ryan Naderi's flick-on from Ivor Pandur's long ball before lifting a delightful lob over the goalkeeper to send Ibrox wild after a drab 90 minutes.",
        "cn": "替补队员从Ivor Pandur的长球中冲上Ryan Naderi的轻弹，然后在守门员身上举起一个令人愉快的球，在单调的90分钟后将Ibrox送到野外。"
      },
      {
        "en": "It looked for all the world that Derek McInnes' side were set to be frustrated after struggling to break down a resolute St Mirren side who packed a punch of their own.",
        "cn": "它寻找德里克·麦金尼斯（Derek McInnes）的一方在努力打破一个坚定的圣米伦（St Mirren）方面之后会感到沮丧。"
      },
      {
        "en": "St Mirren could easily have taken all three points, having created the clearest chance of the game when Fraser Taylor was sent through one-on-one with Pandur.",
        "cn": "当弗雷泽·泰勒（Fraser Taylor）与潘杜尔（Pandur）进行一对一的比赛时，圣米伦（St Mirren）本可以轻松拿下这三分，创造了比赛中最明显的机会"
      },
      {
        "en": "In a miss that would prove costly, the forward had time to pick his spot, but his effort was too close to the Rangers goalkeeper, who made a comfortable save.",
        "cn": "在一场代价高昂的失误中，前锋有时间选择自己的位置，但他的努力与流浪者队的守门员过于接近，后者进行了舒适的扑救。"
      },
      {
        "en": "The victory moves Rangers above St Mirren and into second in the Scottish Premiership, with the visitors suffering a second consecutive league defeat after their 2-1 loss to Celtic last time out.",
        "cn": "这场胜利使流浪者队在圣米伦之上，在苏格兰超级联赛中排名第二，游客在上次以2-1输给凯尔特人队后连续第二次遭遇联赛失利。"
      },
      {
        "en": "Rangers had to cope without captain and striker Lawrence Shankland, who missed out through injury, with Ryan Naderi starting in his place.",
        "cn": "流浪者不得不在没有队长和前锋劳伦斯·尚克兰德的情况下应对，劳伦斯·尚克兰德因伤缺席比赛，瑞安·纳德里（Ryan Naderi）开始取代他。"
      },
      {
        "en": "But it was another substitute who provided the decisive moment as Miovski produced a composed finish to ensure Rangers' momentum under McInnes continues.",
        "cn": "但这是另一位替补球员提供了决定性的时刻，因为Miovski创造了一个沉着的结局，以确保流浪者队在麦金尼斯的带领下继续保持势头。"
      },
      {
        "en": "Rangers turn their attention to a huge double-header against Celtic, with the sides first meeting in the League Cup quarter-finals before renewing hostilities in the Scottish Premiership at Parkhead.",
        "cn": "流浪者将注意力转向对凯尔特人的巨大双头，双方在联赛杯四分之一决赛中首次会面，然后在Parkhead的苏格兰超级联赛中再次发生敌对行动。"
      },
      {
        "en": "He meets a Bouanani cross from the right and nods towards goal but Jacob Chapman produces a super stop.",
        "cn": "他接到布阿纳尼从右路传中的球，头球攻门，但雅各布·查普曼做出了精彩扑救。"
      },
      {
        "en": "The St Mirren stopper is in inspired form.",
        "cn": "St Mirren瓶塞的灵感来源。"
      },
      {
        "en": "He first gets down to a Gassama strike from the edge of the area.",
        "cn": "他首先从该地区的边缘开始加萨马罢工。"
      },
      {
        "en": "Bouanani rushes in to gobble up the rebound but that's saved too!",
        "cn": "Bouanani冲进来吞噬了反弹，但这也挽救了！"
      },
      {
        "en": "Pandur comes up on top in a one-on-one as Fraser spurns the chance of the game.",
        "cn": "Pandur在一对一的比赛中名列前茅，因为Fraser拒绝了比赛的机会。"
      },
      {
        "en": "Naderi flicks on a long ball into Miovski's path, who's then one-on-one with Chapman.",
        "cn": "Naderi在Miovski的路径上弹了一个长球，然后与Chapman一对一。"
      },
      {
        "en": "The St Mirren 'keeper rushes out and is beaten with a cute dink.",
        "cn": "圣米伦（St Mirren）的守门员冲了出去，被一个可爱的丁克殴打。"
      },
      {
        "en": "The way we moved the ball, the aggression and the chances we created, we should have done so much better.",
        "cn": "我们移动球的方式，我们创造的侵略性和机会，我们应该做得更好。"
      },
      {
        "en": "For an hour I was really pleased with the performance.",
        "cn": "有一个小时，我对表演非常满意。"
      },
      {
        "en": "Then for 20 to 25 minutes we were guilty of so many bad decisions, but we found a way to win.",
        "cn": "然后在20到25分钟的时间里，我们做出了很多糟糕的决定，但我们找到了获胜的方法。"
      },
      {
        "en": "\"I couldn't be more pleased with my players for their perseverance and sheer will to keep going.",
        "cn": "“我对我的球员的毅力和继续前进的纯粹意愿感到非常满意。"
      },
      {
        "en": "When you get a late winner, it illustrates the strength, fitness and character of the team.",
        "cn": "当你得到一个迟到的获胜者时，它说明了团队的力量、健康和品格。"
      },
      {
        "en": "\"Four wins out of four; I think it's six out of seven.",
        "cn": "“四场四胜；我认为是七场六胜。"
      },
      {
        "en": "We're making good steps but we'd like to be able to win a bit more comfortably and at more ease.",
        "cn": "我们正在迈出良好的步伐，但我们希望能够更舒适、更轻松地赢得比赛。"
      }
    ]
  },
  {
    "id": "ft-can-carrick-afford-to-rotate-before-manchester",
    "cat": "足球",
    "title": "Can Carrick afford to rotate before Manchester derby?",
    "titleZh": "曼市德比前，卡里克还敢轮换吗？",
    "source": "Sky Sports · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 3,
    "url": "https://www.skysports.com/football/news/11095/13582686/manchester-uniteds-squad-depth-analysed-as-gary-neville-claims-michael-carrick-is-under-pressure-ahead-of-champions-league-return",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/ft-can-carrick-afford-to-rotate-before-manchester.jpg",
    "paras": [
      {
        "en": "Manchester United return to the Champions League on Thursday night to face Azerbaijan side Sabah; with a Manchester derby three days later, Michael Carrick may need to utilise his squad; Sky Sports' Callum Bishop analyses if the squad is ready to compete on all fronts",
        "cn": "曼联周四晚上重返欧洲冠军联赛，面对阿塞拜疆方面的沙巴；三天后，迈克尔·卡里克可能需要利用他的阵容；天空体育的卡勒姆·毕晓普（Callum Bishop）分析了球队是否准备好在各个方面进行比赛"
      },
      {
        "img": "assets/covers/ft-can-carrick-afford-to-rotate-before-manchester-1.jpg",
        "cap": ""
      },
      {
        "en": "\"It puts a bit of pressure on United.",
        "cn": "“这给曼联带来了一些压力。"
      },
      {
        "en": "They've got City next week and European games starting in midweek.\"",
        "cn": "他们下周有曼城，欧洲比赛将在周中开始。”"
      },
      {
        "en": "Prophetic words from Gary Neville in the wake of Manchester United's 2-2 draw with Everton.",
        "cn": "加里·内维尔（Gary Neville）在曼联2-2战平埃弗顿之后的预言。"
      },
      {
        "en": "While it may only be September, he's not wrong.",
        "cn": "虽然可能只有9月，但他没有错。"
      },
      {
        "en": "Pressure is on Michael Carrick and suddenly, this week already feels season-defining.",
        "cn": "迈克尔·卡里克（Michael Carrick）承受着压力，突然之间，本周已经感觉到了赛季的定义。"
      },
      {
        "en": "When the 2026/27 Premier League fixture list came out, United were deemed to have had the statistically easiest opening six games.",
        "cn": "当2026/27赛季英超联赛名单公布时，曼联被认为是统计上最容易开启六场比赛的球队。"
      },
      {
        "en": "Halfway through, they have dropped more points than they have gained.",
        "cn": "中途，他们的得分比他们获得的要多。"
      },
      {
        "en": "It only gets tougher from this point on.",
        "cn": "从这一点开始，它只会变得更加艰难。"
      },
      {
        "en": "As Neville rightly points out, United kickstart their Champions League campaign on Thursday night against Azerbaijan champions Sabah, before the first Manchester derby of the season three days later.",
        "cn": "正如内维尔正确指出的那样，曼联在周四晚上对阵阿塞拜疆冠军沙巴的比赛中开始了他们的冠军联赛，然后在三天后的本赛季首次曼彻斯特德比之前。"
      },
      {
        "en": "Given the nature of the two opponents, you would imagine Carrick will be thinking of rotating on Thursday.",
        "cn": "鉴于两名对手的性质，你可以想象卡里克将在周四考虑轮换。"
      },
      {
        "en": "That makes it the first time we really see what his squad, rather than his preferred XI, has to offer.",
        "cn": "这使我们第一次真正看到他的阵容，而不是他的首选XI ，所提供的。"
      },
      {
        "en": "But does he have a good enough crop?",
        "cn": "但他有足够好的作物吗？"
      },
      {
        "en": "The general consensus is that United's business in the transfer market has left them short, with a squad that is unable to cope with three games per week due to an over-reliance on the same names.",
        "cn": "普遍的共识是曼联在转会市场的业务使他们短缺，由于过度依赖相同的名字，球队每周无法应付三场比赛。"
      },
      {
        "en": "According to Transfermarkt, United actually have the second biggest squad in the Premier League.",
        "cn": "根据Transfermarkt的说法，曼联实际上拥有英超联赛中第二大阵容。"
      },
      {
        "en": "However, the balance of that squad is what creates the problem.",
        "cn": "然而，该阵容的平衡是造成问题的原因。"
      },
      {
        "en": "They rank highest with their depth in forward areas.",
        "cn": "它们在前方区域的深度排名最高。"
      },
      {
        "en": "However, they rank eighth in midfield and 10th in defence.",
        "cn": "然而，他们在中场排名第八，在防守方面排名第十。"
      },
      {
        "en": "Take a deeper look into specialist positions and you find they are ninth in right-back depth and 18th at left-back, a position that is constantly being discussed due to Luke Shaw's injury history.",
        "cn": "深入研究专家位置，您会发现他们在右后卫深度排名第九，在左后卫排名第18 ，由于Luke Shaw的伤病史，这一位置不断被讨论。"
      },
      {
        "en": "They can only blame themselves for that problem, mind you.",
        "cn": "请注意，他们只能把这个问题归咎于自己。"
      },
      {
        "en": "Only Everton and Liverpool have placed less emphasis on investment in their backline than the Red Devils since 2022.",
        "cn": "自2022年以来，只有埃弗顿和利物浦比红魔更不重视投资。"
      },
      {
        "img": "assets/covers/ft-can-carrick-afford-to-rotate-before-manchester-2.jpg",
        "cap": ""
      },
      {
        "en": "The other is the gulf in quality between the starting XI and the team after changes are made.",
        "cn": "另一个是变更后首发XI和球队之间的质量差距。"
      },
      {
        "en": "Despite financial restrictions that appear to be imposed within the club, you can't hide from the fact they have the highest net spend of any Premier League side since 2022.",
        "cn": "尽管俱乐部内部似乎施加了财务限制，但自2022年以来，他们的净支出一直是英超联赛中最高的。"
      },
      {
        "en": "Yet, said spending still hasn't built a unit that has genuine competition for places.",
        "cn": "然而，他说，支出仍然没有建立一个真正有竞争力的单位。"
      }
    ]
  },
  {
    "id": "ft-man-utd-put-four-past-sabah-on-champions-leagu",
    "cat": "足球",
    "title": "Man Utd put four past Sabah on Champions League return",
    "titleZh": "曼联在欧冠赛场上四次击败沙巴",
    "source": "Sky Sports · 2026-09-08",
    "date": "2026-09-08",
    "minutes": 4,
    "url": "https://www.skysports.com/football/manchester-united-vs-sabah/report/577612",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/ft-man-utd-put-four-past-sabah-on-champions-leagu.jpg",
    "paras": [
      {
        "en": "Report as Man Utd beat Sabah FC 4-0 at Old Trafford in the Champions League; first-half goals from Matheus Cunha, Bruno Fernandes and Benjamin Sesko took the game away from their opponents before Lisandro Martinez made it four after the break",
        "cn": "报道曼联在老特拉福德4-0击败沙巴FC；上半场库尼亚、费尔南德斯和塞斯科的进球帮助球队战胜了对手，中场休息后，马丁内斯打进了第4球"
      },
      {
        "img": "assets/covers/ft-man-utd-put-four-past-sabah-on-champions-leagu-1.jpg",
        "cap": "Image: Youri Tielemans celebrates with Bruno Fernandes during the win over Sabah"
      },
      {
        "en": "Manchester United made a winning return to the Champions League as they beat Sabah FC in style with a 4-0 victory at Old Trafford.",
        "cn": "曼联在老特拉福德球场以4-0大胜沙巴队，成功重返欧冠赛场。"
      },
      {
        "en": "The Azerbaijani side started brightly but Matheus Cunha converted Patrick Dorgu's 27th-minute cross and, although Joy-Lance Mickels should have levelled, two goals late in the first half from Bruno Fernandes and Benjamin Sesko put United in total control.",
        "cn": "阿塞拜疆队开局不错，但库尼亚在第27分钟接应了多尔古的传中，尽管米克尔斯本可以扳平比分，但上半场后半段布鲁诺·费尔南德斯和本杰明·塞斯科的两粒进球让曼联完全控制了比分。"
      },
      {
        "en": "Michael Carrick made changes in the second half with the points secure but there was still time for Lisandro Martinez to smash home from close range after some flashy play from Joshua Zirkzee, who produced an eye-catching cameo.",
        "cn": "迈克尔·卡里克在下半场做出了一些改变，确保了积分，但在约书亚·齐克切的精彩发挥后，马丁内斯仍然有时间近距离破门，齐克切也有一个引人注目的客串。"
      },
      {
        "en": "With goal difference a potentially significant factor in the league phase of this Champions League format, this was a fine night's work on their return.",
        "cn": "在欧冠赛制的联赛阶段，净胜球是一个潜在的重要因素，这对他们的回归来说是一个美好的夜晚。"
      },
      {
        "en": "It is Atletico Madrid away next in Europe but there are bigger matters to attend to before that.",
        "cn": "接下来在欧洲的比赛是马德里竞技，但在那之前还有更重要的事情要做。"
      },
      {
        "en": "It is over 1000 days since United competed in a Champions League game but this, their 300th in Europe's premier club competition, was not too taxing for Carrick's men.",
        "cn": "曼联已经1000多天没有参加欧冠比赛了，但这是他们在欧洲顶级俱乐部比赛中的第300场比赛，对卡里克的队员来说并不是太繁重。"
      },
      {
        "en": "It will be tougher against rivals Manchester City on Sunday - but so will his team selection.",
        "cn": "周日对阵对手曼城的比赛将更加艰难，但他的阵容选择也将更加艰难。"
      },
      {
        "en": "Fernandes starred again and the sight of him combining with the equally intelligent Youri Tielemans for United's second was encouraging.",
        "cn": "费尔南德斯再次成为主力，他和同样聪明的蒂勒曼斯一起打进了曼联的第二个进球，这令人鼓舞。"
      },
      {
        "en": "The Belgian produced perhaps his best 45 minutes at Old Trafford.",
        "cn": "比利时人在老特拉福德打出了他最好的45分钟。"
      },
      {
        "en": "But others pressed their case too.",
        "cn": "但其他人也坚持自己的观点。"
      },
      {
        "en": "Sesko scored after coming off the bench against Everton and looked sharp here in his first start of the season.",
        "cn": "在对阵埃弗顿的比赛中，塞斯科替补出场，他在本赛季的第一次首发中表现出色。"
      },
      {
        "en": "With Marcus Rashford also available, and Cunha getting a confidence-boosting goal, there are some interesting decisions ahead for the United boss.",
        "cn": "拉什福德也可以上场，库尼亚也取得了一个提升信心的进球，曼联主帅将面临一些有趣的决定。"
      },
      {
        "en": "Dorgu enjoyed himself at left-back with Luke Shaw missing from the squad but he was able to play as a de facto winger given United's superiority.",
        "cn": "在卢克·肖缺阵的情况下，多古在左后卫的位置上表现得很好，但鉴于曼联的优势，他能够胜任边锋的位置。"
      },
      {
        "en": "It will be more challenging against City's attack but Carrick and his players go into that with confidence restored.",
        "cn": "面对曼城的进攻会更有挑战性，但卡里克和他的球员们会恢复信心。"
      },
      {
        "en": "\"I think it was kind of what we set out to achieve, good performance, individually and collectively throughout the game, the boys that started, the boys that came on pitch, clean sheet, goals, exciting football.",
        "cn": "“我认为这是我们想要达到的目标，在整场比赛中，无论是个人还是集体，都表现出色，小伙子们首发，小伙子们上场，零失球，进球，令人兴奋的足球。"
      },
      {
        "en": "\"Results-wise, it has not been the start that what we wanted.",
        "cn": "“结果方面，这并不是我们想要的开始。"
      },
      {
        "en": "We wanted more points in the league.",
        "cn": "我们想在联赛中得到更多的积分。"
      },
      {
        "en": "But performance-wise, it has been a lot of things we are looking for.",
        "cn": "但在性能方面，我们一直在寻找很多东西。"
      },
      {
        "en": "\"Collectively, as a team, we have done a lot of the right things and that is why were are excited about what the season will bring.",
        "cn": "“作为一个团队，我们做了很多正确的事情，这就是为什么我们对新赛季的到来感到兴奋。"
      },
      {
        "en": "It is really encouraging for me.\"",
        "cn": "这对我来说真的很鼓舞人心。”"
      },
      {
        "en": "\"He definitely offers a different kind of threat, that is the beauty of it really, we know what Ben gives us and there are not many who can give us what he gives us.",
        "cn": "“他绝对提供了一种不同的威胁，这就是它的美妙之处，我们知道本给了我们什么，没有几个人能给我们他给我们的。”"
      },
      {
        "en": "Speed, physicality, ability to play on the last line and run in behind.",
        "cn": "速度，身体素质，在最后一条线上的能力，以及在后面奔跑的能力。"
      },
      {
        "en": "\"I didn't feel like we were shaking or scared, we tried to play, for the whole 90 minutes we did that.",
        "cn": "“我不觉得我们在颤抖或害怕，我们努力比赛，整整90分钟我们都在这样做。"
      }
    ]
  },
  {
    "id": "his-the-bayeux-tapestry-has-returned-to-the-uk-and",
    "cat": "历史",
    "title": "The Bayeux Tapestry has returned to the UK – and this is how you can see it",
    "titleZh": "贝叶挂毯重返英国——你可以这样看到它",
    "source": "HistoryExtra · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.historyextra.com/period/medieval/bayeux-tapestry-british-museum-exhibition-tickets/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/his-the-bayeux-tapestry-has-returned-to-the-uk-and.jpg",
    "paras": [
      {
        "en": "Would you like to receive offers from our publisher, Immediate Media, and carefully selected partners?",
        "cn": "您想收到我们的出版商、即时媒体和精心挑选的合作伙伴的报价吗？"
      },
      {
        "en": "One of the medieval world’s greatest surviving treasures is now on display in London.",
        "cn": "中世纪世界现存最伟大的宝藏之一现在正在伦敦展出。"
      },
      {
        "en": "David Musgrove reveals everything you need to know about the British Museum’s landmark Bayeux Tapestry exhibition, including details of tickets, how the embroidery is being displayed, and the key scenes you should look out for",
        "cn": "大卫·马斯格罗夫向你揭示了大英博物馆标志性的贝叶挂毯展览的一切，包括门票的细节，刺绣是如何展示的，以及你应该注意的关键场景"
      },
      {
        "en": "The Bayeux Tapestry is being displayed in the UK as part of a landmark exhibition at the British Museum in London.",
        "cn": "贝叶挂毯作为伦敦大英博物馆标志性展览的一部分正在英国展出。"
      },
      {
        "en": "The embroidery is normally housed at the Bayeux Tapestry Museum in Normandy, but a historic agreement was reached with the French government for the artefact to be loaned to the UK while its home museum undergoes renovation.",
        "cn": "这幅刺绣作品通常存放在诺曼底的贝叶挂毯博物馆，但与法国政府达成了一项历史性协议，在其本国博物馆进行翻修时，这幅艺术品将被借给英国。"
      },
      {
        "en": "Running for 10 months, the exhibition offers a once-in-a-generation opportunity for audiences to see the Tapestry in the British capital.",
        "cn": "为期10个月的展览为观众提供了一个千载难逢的机会，让他们在英国首都看到挂毯。"
      },
      {
        "en": "The Bayeux Tapestry exhibition opened at the Sainsbury Exhibitions Gallery at the British Museum on 10 September 2026 and will run until 11 July 2027.",
        "cn": "贝叶挂毯展览于2026年9月10日在大英博物馆的塞恩斯伯里展览馆开幕，将持续到2027年7月11日。"
      },
      {
        "en": "For the first time, the Tapestry is being displayed flat and in one continuous length inside a specially constructed showcase, allowing visitors to appreciate its full scale and intricate detail as never before.",
        "cn": "这是挂毯第一次在一个特别建造的展柜里以一个连续的长度平面展示，让游客前所未有地欣赏它的完整尺寸和复杂的细节。"
      },
      {
        "en": "Tickets for the exhibition are available via the British Museum website.",
        "cn": "展览的门票可通过大英博物馆网站购买。"
      },
      {
        "en": "Tickets are being released in phases, with the next batch available to book from 21 October 2026.",
        "cn": "门票将分阶段发售，下一批门票将于2026年10月21日开始接受预订。"
      },
      {
        "en": "There will be further releases into 2027 for dates between January and July 2027.",
        "cn": "在2027年1月到7月之间还会有更多的电影上映。"
      },
      {
        "en": "Tickets range in price from £25 to £33, through a tiered pricing structure based on the day and time of visit.",
        "cn": "门票价格从25英镑到33英镑不等，根据参观日期和时间分层定价。"
      },
      {
        "en": "Children under 16 go free if accompanied by paying adults.",
        "cn": "16岁以下的儿童在付费成人陪同下免费。"
      },
      {
        "en": "The exhibition not only presents the Bayeux Tapestry in its entirety, but also sets it within the wider context of 11th-century England and Normandy.",
        "cn": "这次展览不仅完整地展示了贝叶挂毯，还将其置于11世纪英格兰和诺曼底的更广泛背景下。"
      },
      {
        "en": "Objects from the British Museum’s own collection and other significant loans from across the UK and Europe are displayed, offering fresh perspectives on the people and events depicted in the embroidery.",
        "cn": "展品包括大英博物馆自己收藏的物品，以及从英国和欧洲各地借来的其他重要物品，为刺绣中描绘的人物和事件提供了新的视角。"
      },
      {
        "en": "Key highlights include the Junius 11 manuscript, which influenced the Tapestry’s design.",
        "cn": "关键亮点包括影响挂毯设计的Junius 11手稿。"
      },
      {
        "en": "The Bayeux Tapestry exhibition is already proving to be one of the most popular in the museum’s history.",
        "cn": "贝叶挂毯展览已经被证明是博物馆历史上最受欢迎的展览之一。"
      },
      {
        "en": "Alongside the Tapestry itself, visitors can explore a range of digital elements designed to enhance understanding and engagement.",
        "cn": "除了挂毯本身，游客还可以探索一系列旨在增强理解和参与的数字元素。"
      },
      {
        "en": "Curators are hosting talks and special events throughout the exhibition run, while a programme of activities for schools and families ensures the Tapestry’s story reaches the widest possible audience.",
        "cn": "策展人在整个展览期间举办讲座和特别活动，同时为学校和家庭举办活动，确保挂毯的故事尽可能多地吸引观众。"
      },
      {
        "en": "To coincide with the exhibition, the British Museum is also publishing a range of books for readers of all ages.",
        "cn": "为了配合这次展览，大英博物馆还为各个年龄段的读者出版了一系列书籍。"
      },
      {
        "en": "As you walk the length of the Tapestry, look out for its most famous episodes: King Edward the Confessor ’s deathbed scene; Harold Godwinson ’s fateful oath to William; the appearance of Halley’s Comet as an omen; the mustering of Norman ships; and the climactic battle of Hastings, where Harold is slain.",
        "cn": "当你走在挂毯上时，要注意它最著名的几集：忏悔者爱德华国王的临终场景；哈罗德·戈德温森对威廉的致命誓言；哈雷彗星的出现是一种预兆；诺曼船只的集结；以及黑斯廷斯战役的高潮哈罗德被杀"
      },
      {
        "en": "The Tapestry’s borders are filled with animals, fables and mischievous details that invite close inspection.",
        "cn": "挂毯的边缘布满了动物、寓言和恶作剧的细节，需要仔细观察。"
      },
      {
        "en": "Its ambiguous storytelling and sparse Latin captions leave much open to interpretation, making every visit a chance to discover new perspectives on this epic tale of conquest and change.",
        "cn": "它模棱两可的故事叙述和稀疏的拉丁字幕留下了很多可供解释的空间，使每次访问都有机会发现这个征服和变革的史诗故事的新视角。"
      },
      {
        "img": "assets/covers/his-the-bayeux-tapestry-has-returned-to-the-uk-and-1.jpg",
        "cap": "The British Museum’s blockbuster exhibition featuring the Bayeux Tapestry opened on 10 September 2026 | Credit"
      },
      {
        "en": "This page contains HistoryExtra content provided by Google reCAPTCHA.",
        "cn": "此页面包含谷歌reCAPTCHA提供的额外内容。"
      }
    ]
  },
  {
    "id": "his-ale-terror-and-a-martyr-s-death-what-not-to-mi",
    "cat": "历史",
    "title": "Ale, terror and a martyr's death: what not to miss on the Bayeux Tapestry",
    "titleZh": "啤酒、恐怖与殉道者之死：贝叶挂毯上不容错过的东西",
    "source": "HistoryExtra · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.historyextra.com/membership/ale-terror-and-a-martyrs-death-what-not-to-miss-on-the-bayeux-tapestry/",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/his-ale-terror-and-a-martyr-s-death-what-not-to-mi.jpg",
    "paras": [
      {
        "en": "Would you like to receive offers from our publisher, Immediate Media, and carefully selected partners?",
        "cn": "您想收到我们的出版商、即时媒体和精心挑选的合作伙伴的报价吗？"
      },
      {
        "en": "Heading to the British Museum to see the Bayeux Tapestry for yourself?",
        "cn": "想亲自去大英博物馆看贝叶挂毯吗？"
      },
      {
        "en": "David Musgrove and Michael Lewis reveal the 10 things you simply must do when experiencing the world’s most famous embroidery in all its glory",
        "cn": "大卫·马斯格罗夫和迈克尔·刘易斯揭示了在体验世界上最著名的刺绣的荣耀时，你必须做的10件事"
      },
      {
        "en": "It’s a once-in-a-lifetime opportunity – or, really, once in a millennium: the chance to admire the Bayeux Tapestry in the land of its creation.",
        "cn": "这是一个千载难逢的机会，或者说，千载难逢：有机会在贝叶挂毯的诞生地欣赏它。"
      },
      {
        "en": "This account of the events leading up to and during the Norman conquest of 1066 was probably made in England in the 1070s – and its arrival at the British Museum, where it’s on display until 11 July 2027, marks probably the first time since that it’s crossed the Channel.",
        "cn": "这本关于1066年诺曼征服之前和期间发生的事件的记载可能是在20世纪70年代的英国制作的，它被送到大英博物馆，在那里展出到2027年7月11日，这可能是它第一次横渡英吉利海峡。"
      },
      {
        "en": "Strictly speaking, the Tapestry is an embroidery – because the woollen threads of its design are stitched onto the linen backing cloth rather than being woven as one.",
        "cn": "严格来说，挂毯是一种刺绣，因为其设计的羊毛线是缝在亚麻底布上的，而不是织成一体的。"
      },
      {
        "en": "But it takes its name from the French tapisserie, meaning ‘wall hanging’.",
        "cn": "但它的名字来自法语tapisserie，意思是“挂在墙上”。"
      },
      {
        "en": "It was first documented in a 1476 inventory of the treasures of Bayeux Cathedral, and it’s been in Bayeux ever since, bar a couple of brief sojourns elsewhere.",
        "cn": "它最早被记录在1476年巴叶大教堂的宝藏清单中，从那以后它就一直在巴叶，除了在其他地方短暂停留过几次。"
      },
      {
        "en": "This astonishing artwork is 68.3 metres long and half a metre high.",
        "cn": "这幅惊人的艺术品长68.3米，高半米。"
      },
      {
        "en": "Running mostly from left to right, it tells the story in the style of a graphic novel across a central frieze, with short Latin captions.",
        "cn": "它主要从左到右，用图画小说的风格在中间的楣边讲述故事，配上简短的拉丁文字说明。"
      },
      {
        "en": "The story focuses on the interplay between Earl Harold of Wessex (later King Harold II of England) and Duke William of Normandy (later William I), and culminates in the battle of Hastings and Harold’s death.",
        "cn": "故事集中在威塞克斯的哈罗德伯爵（后来的英格兰国王哈罗德二世）和诺曼底的威廉公爵（后来的威廉一世）之间的相互作用，并在黑斯廷斯战役和哈罗德的死亡中达到高潮。"
      },
      {
        "en": "Above and below the action are borders populated by animals, birds, mythical creatures, decorative devices and mini scenes that may or may not relate to the main narrative.",
        "cn": "行动的上方和下方是由动物、鸟类、神话生物、装饰装置和迷你场景组成的边界，这些场景可能与主要叙事有关，也可能与主要叙事无关。"
      },
      {
        "en": "At the British Museum, for the first time in decades – possibly in its history – the Tapestry is being displayed in a single length, lying flat, providing the most intimate perspective since it was first put on permanent public display in 1842.",
        "cn": "在大英博物馆，这是几十年来——可能是它的历史上——第一次以单一的长度平放，提供了自1842年首次永久公开展出以来最亲密的视角。"
      },
      {
        "en": "Before then – since at least the late 1720s – it was rolled out only for antiquarian and guest visitors.",
        "cn": "在此之前，至少从18世纪20年代末开始，它只对古董商和游客开放。"
      },
      {
        "en": "In Bayeux between 1983 and 2025, it was shown in a U-shaped case.",
        "cn": "在1983年至2025年的巴叶，它被展示在一个u形的盒子里。"
      },
      {
        "en": "The flat presentation in London, requested by the French state, is designed to minimise stress on the fabric.",
        "cn": "应法国政府的要求，在伦敦的平面展示是为了尽量减少对织物的压力。"
      },
      {
        "en": "It is unlikely to be displayed the way it was in Bayeux again.",
        "cn": "它不太可能像在巴叶那样再次被展示。"
      },
      {
        "en": "As you survey the Tapestry, imagine how it might have been viewed in the 11th century.",
        "cn": "当你审视这幅挂毯时，想象一下在11世纪人们是如何看待它的。"
      },
      {
        "en": "Was it meant to hang around the nave of a Norman cathedral, perhaps the edifice in Bayeux, newly consecrated in 1077?",
        "cn": "它是打算挂在诺曼大教堂的中殿附近吗？也许是1077年新落成的巴叶（Bayeux）大教堂？"
      },
      {
        "en": "Was it instead intended to be draped along the walls of a great hall?",
        "cn": "它是打算挂在大厅的墙上吗？"
      },
      {
        "en": "The scale of the embroidery suggests that it was designed for a large audience, but the lighting in medieval buildings would have been dim, and the Tapestry may have been displayed only on special occasions, as was recorded in the 1476 inventory.",
        "cn": "刺绣的规模表明，它是为大量观众设计的，但中世纪建筑的照明可能会很昏暗，而且挂毯可能只在特殊场合展示，正如1476年库存中所记录的那样。"
      },
      {
        "en": "The Latin captions above the scenes are terse, offering little more than names and places.",
        "cn": "场景上方的拉丁文字幕很简洁，除了名字和地点之外，几乎没有别的说明。"
      },
      {
        "en": "This has led some historians to suggest that the Tapestry was designed to be accompanied by a guide, who would have narrated the story to viewers as they walked along.",
        "cn": "这使得一些历史学家提出，挂毯的设计是由一个导游陪同的，他会在观众走过的时候向他们讲述故事。"
      },
      {
        "en": "In this way, it functioned as a visual prompt and a mnemonic device, inviting its audience to engage with the drama of 1066 in a uniquely immersive way.",
        "cn": "通过这种方式，它起到了视觉提示和记忆装置的作用，邀请观众以一种独特的沉浸式方式参与到1066年的戏剧中。"
      }
    ]
  },
  {
    "id": "his-a-i-may-have-solved-a-longstanding-math-proble",
    "cat": "历史",
    "title": "A.I. May Have Solved a Longstanding Math Problem With a Million-Dollar Prize. It Ignited a Controversy Over Who Gets Credit",
    "titleZh": "人工智能可能解决了一个长期存在的数学问题，并获得了100万美元的奖金。这引发了一场关于谁得到了荣誉的争议",
    "source": "Smithsonian Magazine · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/ai-may-have-solved-a-longstanding-math-problem-with-a-million-dollar-prize-it-ignited-a-controversy-over-who-gets-credit-180989472/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/his-a-i-may-have-solved-a-longstanding-math-proble.jpg",
    "paras": [
      {
        "en": "The Navier-Stokes problem, a famous theoretical math problem regarding the movement of fluids, has stumped mathematicians for almost 200 years.",
        "cn": "纳维-斯托克斯问题是一个关于流体运动的著名理论数学问题，困扰了数学家近200年。"
      },
      {
        "en": "At the turn of the 21st century, the Clay Mathematics Institute decided that it would award $1 million to whoever solved it.",
        "cn": "在21世纪之交，克莱数学研究所决定给解决这个问题的人奖励100万美元。"
      },
      {
        "en": "Twenty-six years later, a solution may have finally come to light—but it wasn’t a mathematician who came up with it.",
        "cn": "26年后，一个解决方案可能终于浮出水面——但提出它的不是数学家。"
      },
      {
        "en": "On Tuesday, OpenAI, the developer of ChatGPT, announced in a blog post that an “internal OpenAI system” had just found a solution to the longstanding puzzle.",
        "cn": "周二，ChatGPT的开发者OpenAI在一篇博客文章中宣布，一个“内部OpenAI系统”刚刚找到了解决这个长期难题的方法。"
      },
      {
        "en": "The company used around 10,000 artificial intelligence “agents,” or bots, that worked largely autonomously on the Navier-Stokes equations for 88 hours, using computational power that likely cost millions of dollars.",
        "cn": "该公司使用了大约1万个人工智能“代理”或机器人，它们在很大程度上自主地在纳维-斯托克斯方程上工作了88个小时，使用的计算能力可能耗资数百万美元。"
      },
      {
        "en": "OpenAI’s breakthrough is the latest indication that A.I.",
        "cn": "OpenAI的突破是人工智能的最新迹象"
      },
      {
        "en": "models can crack mathematical conundrums that have long eluded humans.",
        "cn": "模型可以破解长期困扰人类的数学难题。"
      },
      {
        "en": "“It’s undeniable that symbolically, it’s a big moment—and the next in a natural chain of big moments,” Timothy Gowers, a mathematician at the Collège de France, tells the Wall Street Journal ’s Ben Cohen, though he notes he hasn’t read OpenAI’s paper regarding the achievement yet.",
        "cn": "法兰西学院的数学家蒂莫西•高尔斯告诉《华尔街日报》的本•科恩：“不可否认，从象征意义上讲，这是一个重大时刻，而且是一系列重大时刻的下一个。”不过，他指出，他还没有阅读OpenAI关于这一成就的论文。"
      },
      {
        "en": "But the feat has also sparked a controversy: While the Navier-Stokes problem may have been solved by A.I., the achievement has become contentious because of a possible association with the work of two human researchers—one of whom is employed by OpenAI’s rival company Anthropic.",
        "cn": "但这一成就也引发了争议：虽然纳维-斯托克斯问题可能是由人工智能解决的，但这一成就引发了争议，因为它可能与两名人类研究人员的工作有关，其中一名研究人员受雇于OpenAI的竞争对手Anthropic公司。"
      },
      {
        "en": "This story starts some 200 years ago, when Claude-Louis Navier and George Gabriel Stokes wrote equations to describe how fluids move.",
        "cn": "这个故事始于大约200年前，当时克劳德-路易斯·纳维尔和乔治·加布里埃尔·斯托克斯写了一些方程来描述流体的运动。"
      },
      {
        "en": "Since then, mathematicians have been investigating whether these equations work in all situations or whether they allow for a theoretical case in which a small part of the fluid moves infinitely quickly and the solution breaks down—or “blows up.”",
        "cn": "从那时起，数学家们一直在研究这些方程是否适用于所有情况，或者它们是否允许一种理论情况，在这种情况下，一小部分流体无限快速地运动，溶液就会破裂或“爆炸”。"
      },
      {
        "en": "So, in its simplest terms, the problem is a yes or no question—to solve it, one must either prove that the equations always result in smooth solutions or find one specific situation where they don’t.",
        "cn": "所以，用最简单的术语来说，这个问题是一个“是”或“否”的问题——要解决它，你必须要么证明这些方程总是得到平滑的解，要么找到一个它们不是平滑解的特定情况。"
      },
      {
        "en": "OpenAI claims to have found one such “blowup” scenario, involving a vortex of fluid that spirals inward and becomes stretched out, like spaghetti.",
        "cn": "OpenAI声称已经发现了一个这样的“爆炸”场景，包括一个向内螺旋并伸展的流体漩涡，就像意大利面一样。"
      },
      {
        "en": "The company says it verified its A.I.",
        "cn": "该公司表示，它已经验证了自己的人工智能"
      },
      {
        "en": "agents’ work with a programming language called Lean.",
        "cn": "代理人使用一种叫做精益的编程语言工作。"
      },
      {
        "en": "We’re sharing a solution to the Navier-Stokes Millennium Prize Problem, one of the deepest problems at the frontier of mathematics.",
        "cn": "我们正在分享一个解决纳维-斯托克斯千年奖问题的方法，这是数学前沿最深奥的问题之一。"
      },
      {
        "en": "The proof was produced by a group of agents, using an OpenAI next-generation model significantly more capable than GPT-6 Astra.",
        "cn": "证据是由一组代理使用比GPT-6 Astra更强大的OpenAI下一代模型制作的。"
      },
      {
        "en": "Navier-Stokes might seem like a wildly theoretical consideration, far removed from the daily life of the average person.",
        "cn": "纳维-斯托克斯似乎是一种疯狂的理论考虑，与普通人的日常生活相去甚远。"
      },
      {
        "en": "Its equations assume that fluids are smooth and continuous, while in the real world, of course, they are made of atoms and molecules.",
        "cn": "它的方程假设流体是光滑和连续的，而在现实世界中，它们当然是由原子和分子组成的。"
      },
      {
        "en": "(This means that no “blowup” scenario could happen in real life.) Still, the equations involved with the problem are used in the field of fluid dynamics for applications such as designing aircraft and creating climate models.",
        "cn": "（这意味着在现实生活中不可能发生“爆炸”场景。）尽管如此，与该问题相关的方程仍被用于流体动力学领域的应用，如设计飞机和创建气候模型。"
      },
      {
        "en": "Because of the longstanding interest in these equations, Navier-Stokes, officially called the Navier-Stokes existence and smoothness problem, is one of seven mathematical problems with a $1 million award offered for each solution—they’re known collectively as the Millennium Prize Problems.",
        "cn": "由于长期以来对这些方程的兴趣，纳维-斯托克斯问题，正式名称为纳维-斯托克斯存在性和平滑性问题，是七个数学问题之一，每个解决方案都有100万美元的奖金——它们被统称为千年奖问题。"
      },
      {
        "en": "“These questions are lighthouses,” Terence Tao, a mathematician at the University of California, Los Angeles, tells the New York Times ’ Cade Metz.",
        "cn": "“这些问题是灯塔，”加州大学洛杉矶分校的数学家特伦斯·陶告诉《纽约时报》的凯德·梅斯。"
      }
    ]
  },
  {
    "id": "his-girl-scouts-of-america-announces-a-first-for-i",
    "cat": "历史",
    "title": "Girl Scouts of America Announces a First for Its Iconic Cookie Lineup—One Created Exclusively for Dogs",
    "titleZh": "美国女童子军宣布了其标志性饼干系列的第一款产品——一款专为狗狗设计的饼干",
    "source": "Smithsonian Magazine · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/girl-scouts-of-america-announces-a-first-for-its-iconic-cookie-lineup-one-created-exclusively-for-dogs-180989479/",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/his-girl-scouts-of-america-announces-a-first-for-i.jpg",
    "paras": [
      {
        "en": "One of America’s most famous cookie lines is expanding to accommodate canine palates, as the Girl Scouts of the USA (GSUSA) prepares to launch a brand-new variety made especially for dogs.",
        "cn": "美国最著名的饼干系列之一正在扩大规模，以适应狗的口味，因为美国女童子军（GSUSA）准备推出一种专门为狗制作的全新品种。"
      },
      {
        "en": "Set to debut in January, the cookie—called Patch Pals —will be blueberry muffin-flavored.",
        "cn": "这款名为Patch Pals的饼干将于明年1月上市，是蓝莓松饼口味的。"
      },
      {
        "en": "Each cookie will bear one of four designs that represent classic Girl Scout patches: a compass, a trefoil, a heart or a ball.",
        "cn": "每块饼干上都有四种图案中的一种，代表着经典的女童子军徽章：指南针、三叶草、心形或球形。"
      },
      {
        "en": "Created in collaboration with Bark, a New York-based dog toy and treat company, the cookie was “inspired by Girl Scouts’ deep love for their dogs” and intended to “celebrate the bond between people and their pups,” according to a GSUSA statement.",
        "cn": "根据GSUSA的一份声明，这款饼干是与总部位于纽约的狗狗玩具和零食公司Bark合作推出的，“灵感来自女童子军对他们的狗狗的深爱”，旨在“庆祝人和他们的小狗之间的纽带”。"
      },
      {
        "en": "Inclusion is a major focus of next year’s offerings.",
        "cn": "包容性是明年产品的主要焦点。"
      },
      {
        "en": "Patch Pals will be joined by Sparkables, the scouts’ first allergy-friendly cookie, as new additions to a lineup of beloved, time-honored classics that include Samoas, Tagalongs and Thin Mints.",
        "cn": "除了Patch Pals之外，童子军的第一款防过敏饼干Sparkables也将加入其中，成为包括Samoas、tagalong和Thin Mints在内的深受喜爱、历史悠久的经典产品系列的新成员。"
      },
      {
        "en": "“Inspired by Girl Scouts around the country who have advocated for expanding the cookie lineup to meet the diverse needs of their communities, Patch Pals and Girl Scout Sparkables offer new ways for more girls, families and beloved pets to participate in the Girl Scout Cookie Program—while staying true to what makes the tradition special,” reads the statement.",
        "cn": "声明中写道：“全国各地的女童子军都提倡扩大饼干阵容，以满足社区的多样化需求，受到这些女童子军的启发，Patch Pals和女童子军Sparkables为更多的女孩、家庭和心爱的宠物提供了新的方式来参与女童子军饼干计划，同时保持了传统的特殊性。”"
      },
      {
        "en": "During World War II, sugar, flour and butter shortages meant that Girl Scouts had to sell calendars instead of cookies to raise funds.",
        "cn": "在第二次世界大战期间，糖、面粉和黄油的短缺意味着女童子军不得不出售日历而不是饼干来筹集资金。"
      },
      {
        "en": "Girl Scout cookies have been baked and bought across the country for more than a century.",
        "cn": "一个多世纪以来，全国各地都在烘烤和购买女童子军饼干。"
      },
      {
        "en": "The practice began in 1917, five years after the organization’s founding, when the Mistletoe Troop of Muskogee, Oklahoma, sold cookies in the local high school cafeteria to raise money for gifts that were later sent to soldiers from the state.",
        "cn": "这种做法始于1917年，也就是该组织成立后的第5年，当时俄克拉荷马州马斯科吉的槲寄生部队（Mistletoe Troop）在当地高中的自助餐厅出售饼干，为后来送给该州士兵的礼物筹集资金。"
      },
      {
        "en": "A sculpture of a Girl Scout and a small exhibit, installed at Muskogee’s Three Rivers Museum, commemorate the troop and the tradition’s humble beginnings.",
        "cn": "在马斯科吉的三河博物馆（Three Rivers Museum），有一座女童子军的雕塑和一个小型展览，纪念这支部队和这一传统的卑微起源。"
      },
      {
        "en": "In 1922, the first standardized recipe for Girl Scout sugar cookies was published in the July edition of the American Girl magazine.",
        "cn": "1922年，女童子军糖饼干的第一个标准化配方发表在7月版的《美国女孩》杂志上。"
      },
      {
        "en": "A cup each of butter and sugar, two tablespoons of milk, two eggs, a teaspoon of vanilla, two cups of flour and two teaspoons of baking powder were enough to make six to seven dozen cookies; each dozen sold for 25 to 30 cents.",
        "cn": "黄油和糖各一杯、两汤匙牛奶、两个鸡蛋、一茶匙香草、两杯面粉和两茶匙发酵粉，足够做六到七打饼干；每打售价25至30美分。"
      },
      {
        "en": "This is your chance to show how much Scouting means to you,” read a message accompanying the insert.",
        "cn": "这是你展示童军运动对你有多重要的机会。”"
      },
      {
        "img": "assets/covers/his-girl-scouts-of-america-announces-a-first-for-i-1.jpg",
        "cap": "Four Girl Scout Brownies sample homemade cookies in this 1952 photograph from the U.S. Army archives. Public d"
      },
      {
        "en": "Recipes and designs were further refined through the 1930s as the cookies’ popularity grew among both troops and sweet-toothed gourmands.",
        "cn": "20世纪30年代，随着饼干在军队和爱吃甜食的美食家中越来越受欢迎，食谱和设计得到了进一步完善。"
      },
      {
        "en": "Marketing and production were gradually streamlined, and the cookies evolved from being home-baked to produced by commercial bakers.",
        "cn": "销售和生产逐渐简化，饼干从家庭烘焙演变为商业面包师生产。"
      },
      {
        "en": "Sales boomed following World War II, and new flavors were introduced: By the 1960s, a consistent rotation of five cookies featured Chocolate Mints (now known as Thin Mints); Savannahs; Chocolate and Vanillas; Scot-Teas; and Shortbreads.",
        "cn": "第二次世界大战后，饼干的销量激增，新的口味也开始出现：到20世纪60年代，连续推出了五款巧克力薄荷饼干（现在被称为薄薄荷饼干）；大草原;巧克力和香草；Scot-Teas;和酥饼。"
      },
      {
        "en": "Subsequent decades have seen the emergence of new varieties, some with fiercely defended regional names —allegiances that speak to the cookies’ nostalgic weight and popularity.",
        "cn": "在接下来的几十年里，新品种不断涌现，其中一些品种有着严格捍卫的地区名称——这种忠诚说明了这种饼干的怀旧重量和受欢迎程度。"
      },
      {
        "en": "“The cookies sold by my daughter’s Girl Scout troop are now called ‘Caramel deLites’ instead of ‘Samoas.’ Why?” Carrie Stetler wrote in a Star-Ledger op-ed in 2008.",
        "cn": "“我女儿的女童子军卖的饼干现在叫‘焦糖deLites’，而不是‘Samoas’。“为什么?”2008年，Carrie Stetler在Star-Ledger的专栏中写道。"
      },
      {
        "en": "“I’m outraged—yes, outraged—that Girl Scout cookies have new names.”",
        "cn": "“我很生气——是的，很生气——女童子军饼干有了新名字。”"
      },
      {
        "en": "Despite the occasional naming controversy, some 200 million Girl Scout cookies are sold annually, the Associated Press ’ Dee-Ann Durbin reports.",
        "cn": "据美联社的迪安·德宾报道，尽管偶尔会有命名争议，但每年仍有大约2亿块女童子军饼干售出。"
      }
    ]
  },
  {
    "id": "his-australia-s-second-smallest-rock-wallaby-reapp",
    "cat": "历史",
    "title": "Australia’s Second-Smallest Rock-Wallaby Reappears in a Region Where It Had Not Been Seen for 50 Years",
    "titleZh": "澳大利亚第二小岩袋鼠重新出现在一个50年来没有出现过的地区",
    "source": "Smithsonian Magazine · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/australias-second-smallest-rock-wallaby-reappears-in-a-region-where-it-had-not-been-seen-for-50-years-180989469/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/his-australia-s-second-smallest-rock-wallaby-reapp.jpg",
    "paras": [
      {
        "en": "The second-smallest rock-wallaby in the world is about as long as a loaf of bread.",
        "cn": "世界上第二小的岩袋鼠只有一块面包那么长。"
      },
      {
        "en": "On its strong hind legs, it hops around rocky outcrops, cliffs and crevices, using the rough pads on its feet to grip sheer rock.",
        "cn": "它用强壮的后腿在露出地面的岩石、悬崖和裂缝间跳跃，用脚上粗糙的脚垫抓住陡峭的岩石。"
      },
      {
        "en": "By day, the species stays hidden from predators, and by night, it comes out to feed.",
        "cn": "白天，这个物种隐藏起来躲避捕食者，晚上，它出来觅食。"
      },
      {
        "en": "This secretive and rarely seen creature, called the nabarlek, is endangered, put at risk by shifting fire regimes and introduced predators.",
        "cn": "这种神秘而罕见的生物，被称为纳巴莱克，是濒临灭绝的，由于火灾制度的改变和掠食者的引入而处于危险之中。"
      },
      {
        "en": "But in a small spot of hope for the marsupial, Australian conservationists and the Dambimangari Aboriginal Corporation recently captured the species on camera at two sites in Western Australia where it had not been scientifically recorded before.",
        "cn": "但有袋动物的一线希望在于，澳大利亚自然资源保护主义者和丹比曼加里原住民公司最近在西澳大利亚州的两个地点用相机捕捉到了这个物种，在此之前，它们没有被科学记录过。"
      },
      {
        "en": "Both lie in a remote region where the nabarlek had not been documented for 50 years.",
        "cn": "它们都位于一个偏远的地区，在那里，纳巴勒克已经有50年没有文献记载了。"
      },
      {
        "en": "“This is very exciting and great news for the species,” Larissa Potter, a senior field ecologist with the Australian Wildlife Conservancy, says in a statement.",
        "cn": "澳大利亚野生动物保护协会的资深野外生态学家拉里萨·波特在一份声明中说：“这对这个物种来说是非常令人兴奋和伟大的消息。”"
      },
      {
        "en": "“It’s also reassuring, as it indicates that this threatened wallaby is persisting …",
        "cn": "“这也令人放心，因为这表明这种受到威胁的小袋鼠正在持续存在……"
      },
      {
        "en": "in places we didn’t previously know about.”",
        "cn": "在我们以前不知道的地方。”"
      },
      {
        "en": "The nabarlek is the only wallaby that can continually replace its molar teeth throughout its life, rather like a shark.",
        "cn": "纳巴莱克是唯一一种可以在一生中不断更换臼齿的小袋鼠，就像鲨鱼一样。"
      },
      {
        "en": "Potter tells Smithsonian magazine that this unique trait may be linked to its diet of tough shrubs and grasses.",
        "cn": "波特告诉《史密森尼》杂志，这种独特的特征可能与它以坚韧的灌木和草为食有关。"
      },
      {
        "en": "Finding a nabarlek is difficult.",
        "cn": "找到一个纳巴莱克是很困难的。"
      },
      {
        "en": "And once scientists have detected a wallaby that fits the animal’s description, verifying that it’s the target species is no easy task, either.",
        "cn": "一旦科学家发现了符合动物描述的小袋鼠，验证它是目标物种也不是一件容易的事。"
      },
      {
        "en": "The nabarlek looks nearly identical to the monjon (another small rock-wallaby that shares its range), and its genes very closely resemble those of the short-eared rock-wallaby.",
        "cn": "纳巴勒克看起来几乎和獴（另一种分布范围相同的小岩袋鼠）一模一样，它的基因也和短耳岩袋鼠非常相似。"
      },
      {
        "en": "So, to confirm their discovery, the team took multiple steps, using both camera trap imagery and genetic analysis to rule out the presence of these other creatures.",
        "cn": "因此，为了证实他们的发现，研究小组采取了多个步骤，使用相机陷阱图像和基因分析来排除这些其他生物的存在。"
      },
      {
        "img": "assets/covers/his-australia-s-second-smallest-rock-wallaby-reapp-1.jpg",
        "cap": "An endangered nabarlek, photographed by a motion sensor camera on the Indigenous lands of Dambeemangaddee Coun"
      },
      {
        "en": "First, they set out five cameras that operated at night, triggered by the motion of nearby animals.",
        "cn": "首先，他们设置了五台夜间运行的摄像机，由附近动物的动作触发。"
      },
      {
        "en": "They looked through the resulting photos to determine that the short-eared rock-wallaby is not found at the sites, assuring them that its similar-looking DNA would not be confused with that of the nabarlek.",
        "cn": "他们查看了结果照片，确定短耳岩小袋鼠没有出现在这些地点，并向他们保证，短耳岩小袋鼠的相似DNA不会与纳巴莱克的DNA混淆。"
      },
      {
        "en": "The short-eared rock-wallaby can easily be dismissed with images, because it doesn’t look the same as the nabarlek.",
        "cn": "短耳岩袋鼠很容易被图片所忽视，因为它看起来和纳巴莱克不一样。"
      },
      {
        "en": "Then, to make sure that the photographed wallabies were indeed nabarlek rather than the roughly identical monjon, researchers collected scat samples from the site to analyze their DNA.",
        "cn": "然后，为了确保拍摄到的小袋鼠确实是纳巴莱克而不是大致相同的獴，研究人员从现场收集了粪便样本来分析它们的DNA。"
      },
      {
        "en": "These results came back with positive news for conservation: The elusive nabarlek had been found.",
        "cn": "这些结果为自然保护带来了积极的消息：难以捉摸的纳巴莱克被发现了。"
      },
      {
        "en": "On paper, the nabarlek’s range includes parts of northern and northwestern Australia.",
        "cn": "理论上，纳巴莱克的活动范围包括澳大利亚北部和西北部的部分地区。"
      },
      {
        "en": "“However, within this broad distribution, the number of locations where the species has been recorded is small,” Potter tells Smithsonian magazine.",
        "cn": "“然而，在这个广泛的分布中，物种被记录的地点很少，”波特告诉史密森尼杂志。"
      },
      {
        "en": "“And they have not been recorded from some areas for a long time.”",
        "cn": "“有些地区很长时间没有记录了。”"
      },
      {
        "en": "For instance, in the Victoria River District, a pastoral area in the Northern Territory of Australia, the nabarlek hasn’t been seen for 170 years—so researchers assume that there, it is locally extinct.",
        "cn": "例如，在维多利亚河地区，澳大利亚北部的一个牧区，已经有170年没有看到纳巴莱克了，所以研究人员认为，在那里，它已经在当地灭绝了。"
      }
    ]
  },
  {
    "id": "his-the-life-of-agatha-christie-the-world-s-best-s",
    "cat": "历史",
    "title": "The Life of Agatha Christie, the World’s Best-Selling Novelist, Goes Under the Microscope at the British Library",
    "titleZh": "世界最畅销小说家阿加莎·克里斯蒂的一生在大英图书馆的显微镜下展出",
    "source": "Smithsonian Magazine · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/the-life-of-agatha-christie-the-worlds-best-selling-novelist-goes-under-the-microscope-at-the-british-library-180989480/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/his-the-life-of-agatha-christie-the-world-s-best-s.jpg",
    "paras": [
      {
        "en": "“My darling, what a journey!” Agatha Christie wrote in a letter to her husband in 1930.",
        "cn": "“亲爱的，这是一次怎样的旅行啊！”1930年，阿加莎·克里斯蒂在给丈夫的一封信中写道："
      },
      {
        "en": "The novelist was describing an eventful trip on the luxurious Orient Express, the 20th-century passenger train that ran between Paris and Istanbul.",
        "cn": "这位小说家正在描述乘坐豪华的东方快车（Orient Express）的一次多事之旅，这列火车是20世纪在巴黎和伊斯坦布尔之间行驶的客运列车。"
      },
      {
        "en": "Within four years, it would become the setting of Christie’s most famous novel: the tenth installment in her Hercule Poirot series, Murder on the Orient Express.",
        "cn": "四年之内，这里成为了克里斯蒂最著名的小说：她的赫尔克里·波洛系列的第十部《东方快车谋杀案》的背景。"
      },
      {
        "en": "Christie fans will soon be able to lay eyes on rare letters like this one, as well as some of her notebooks, photos, other personal belongings and manuscript drafts.",
        "cn": "克里斯蒂的粉丝很快就能看到像这封这样的罕见信件，以及她的一些笔记本、照片、其他私人物品和手稿草稿。"
      },
      {
        "en": "“ Agatha Christie: A World of Mystery,” opening next month at the British Library, in London, includes never-before-seen artifacts from the rollicking life of literature’s “Queen of Crime.”",
        "cn": "《阿加莎·克里斯蒂：神秘的世界》（Agatha Christie: A World of Mystery）将于下月在伦敦的大英图书馆（British Library）开幕，展出了这位文学“犯罪女王”欢乐生活中从未见过的文物。"
      },
      {
        "en": "“Her impact on crime fiction as a genre has been immense,” exhibition curator Lucy Rowland says in a statement from the library.",
        "cn": "“她对犯罪小说的影响是巨大的，”展览策展人露西·罗兰在图书馆的一份声明中说。"
      },
      {
        "en": "“This exhibition will take visitors back to Christie’s childhood and explore her journey to becoming an iconic writer, while celebrating how adaptations of her novels for stage and screen continue to enthrall audiences today, over 50 years after her death.”",
        "cn": "“这次展览将带参观者回到克里斯蒂的童年，探索她成为一名标志性作家的历程，同时庆祝她的小说被改编成舞台和银幕，在她去世50多年后的今天，如何继续吸引观众。”"
      },
      {
        "img": "assets/covers/his-the-life-of-agatha-christie-the-world-s-best-s-1.jpg",
        "cap": "A December 1930 letter from Christie to her second husband, the archaeologist Max Mallowan, describing her ret"
      },
      {
        "en": "Christie is the best-selling novelist of all time: Her books have sold at least one billion copies in English and a billion more in other languages.",
        "cn": "克里斯蒂是有史以来最畅销的小说家：她的英文书销量至少10亿本，其他语言的书销量也超过10亿本。"
      },
      {
        "en": "Countless film adaptations of her work were made throughout the 20th century, and they’re still coming.",
        "cn": "整个20世纪，根据她的作品改编的电影不计其数，而且还在不断出现。"
      },
      {
        "en": "Murder on the Orient Express became a Hollywood blockbuster in 2017, and Death on the Nile followed in 2022.",
        "cn": "2017年，《东方快车谋杀案》成为好莱坞大片，2022年，《尼罗河上的惨案》紧随其后。"
      },
      {
        "en": "“There’s something to be said about the mystery novel being something you can escape into,” publisher David Brawn told All Things Considered in 2020, on the 100th anniversary of the publication of Christie’s first book.",
        "cn": "2020年，在佳士得第一本书出版100周年之际，出版商大卫·布朗对《万物思虑》（All Things Considered）说：“悬疑小说是一种你可以逃避的东西。”"
      },
      {
        "en": "“All good mystery novels end up with some kind of happy ending.",
        "cn": "“所有优秀的推理小说都以某种大团圆结局告终。"
      },
      {
        "en": "The perpetrators are found out and locked away, and you've had a very enjoyable experience helping to solve the puzzles.”",
        "cn": "罪犯被发现并被关起来，你在帮助解决谜题的过程中获得了非常愉快的体验。”"
      },
      {
        "en": "“A World of Mystery” will take visitors on an immersive tour of Christie’s life, which began in 1890 in Devon, England.",
        "cn": "“神秘的世界”将带领游客沉浸在克里斯蒂的生活中，他从1890年开始在英格兰德文郡生活。"
      },
      {
        "en": "In the first of five sections, library-goers will explore the quintessential setting of many of Christie’s works, the English country house, and get a glimpse of a developing writer.",
        "cn": "在五个部分的第一部分，图书馆的读者将探索克里斯蒂许多作品的典型背景，英国乡村别墅，并瞥见一个发展中的作家。"
      },
      {
        "en": "They’ll see the typescript of Christie’s unpublished short story “ The House of Beauty,” which she wrote at age 18.",
        "cn": "他们将看到克里斯蒂未发表的短篇小说《美丽之家》（the House of Beauty）的打字稿，这是她18岁时写的。"
      },
      {
        "en": "A notebook from Arthur Conan Doyle detailing Detective Sherlock Holmes ’ mystery-solving methods, as well as crime writer Dorothy L.",
        "cn": "阿瑟·柯南·道尔的一本笔记本详细描述了侦探夏洛克·福尔摩斯的破案方法，以及犯罪作家多萝西·L。"
      },
      {
        "en": "Sayers ’ feedback on some of Christie’s work, will also be on display.",
        "cn": "塞耶斯对佳士得部分作品的反馈也将展出。"
      },
      {
        "en": "Christie wasn’t just a writer, though.",
        "cn": "不过，克里斯蒂不仅仅是一位作家。"
      },
      {
        "en": "She had many identities and passions, which the exhibition aims to illuminate.",
        "cn": "她有许多身份和激情，这次展览旨在阐明这些。"
      },
      {
        "en": "After the country house, visitors will walk through a dispensary filled with various poisons that feature in Christie’s novels and learn about her work as a pharmacy dispenser during World War I.",
        "cn": "在乡村别墅之后，游客将穿过一个药房，里面摆满了克里斯蒂小说中出现的各种毒药，并了解她在第一次世界大战期间作为药房配药员的工作。"
      },
      {
        "en": "An Orient Express -inspired train carriage will then highlight Christie’s penchant for “closed circle” mysteries and detail her globe-trotting adventures, including surfing in Hawaii.",
        "cn": "然后，一节以东方快车为灵感的火车车厢将突出克里斯蒂对“封闭圈子”之谜的嗜好，并详细介绍她的环球旅行经历，包括在夏威夷冲浪。"
      },
      {
        "en": "Next, a constructed dig site will evoke Christie’s time spent photographing and supporting the work of archaeologists in the Middle East.",
        "cn": "接下来，一个已建成的挖掘地点将唤起克里斯蒂拍摄和支持中东考古学家工作的时间。"
      },
      {
        "en": "In the final section, visitors will be transported to London’s 1950s West End and examine how the novelist adapted her stories for the stage.",
        "cn": "在展览的最后一部分，参观者将被带到20世纪50年代的伦敦西区，并研究这位小说家是如何将她的故事改编成舞台的。"
      }
    ]
  },
  {
    "id": "his-this-hospital-ship-sank-off-albania-s-coast-du",
    "cat": "历史",
    "title": "This Hospital Ship Sank Off Albania's Coast During World War II. Now, It’s Teeming With Marine Life",
    "titleZh": "这艘医疗船在第二次世界大战期间在阿尔巴尼亚海岸沉没。现在，这里充满了海洋生物",
    "source": "Smithsonian Magazine · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/this-hospital-ship-sank-off-albania-coast-during-world-war-ii-now-its-teeming-with-marine-life-180989468/",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/his-this-hospital-ship-sank-off-albania-s-coast-du.jpg",
    "paras": [
      {
        "en": "In 1941, enemy fire sank an Italian hospital ship off the coast of Albania.",
        "cn": "1941年，一艘意大利医院船在阿尔巴尼亚海岸附近沉没。"
      },
      {
        "en": "Now, more than eight decades later, the wreck is teeming with marine life, researchers report in a paper published July 26 in the journal Frontiers in Ocean Sustainability.",
        "cn": "研究人员在7月26日发表在《海洋可持续发展前沿》（Frontiers in Ocean Sustainability）杂志上的一篇论文中报告说，现在，80多年过去了，沉船上充满了海洋生物。"
      },
      {
        "en": "The ship, called the Po, was evacuating wounded Italian soldiers from Albania’s Vlora Bay on the night of March 14, 1941, when it was struck by a torpedo from a British Swordfish bomber.",
        "cn": "这艘名为Po的船于1941年3月14日晚上从阿尔巴尼亚的Vlora湾撤离受伤的意大利士兵，当时它被英国箭鱼轰炸机的鱼雷击中。"
      },
      {
        "en": "The Po quickly began taking on water and sank within about ten minutes, killing 23 of the 240 people aboard, including three Italian Red Cross workers.",
        "cn": "Po很快开始进水，并在大约十分钟内沉没，造成船上240人中的23人死亡，其中包括三名意大利红十字会工作人员。"
      },
      {
        "en": "Edda Ciano, the daughter of Italian dictator Benito Mussolini and the wife of Italian foreign minister Galeazzo Ciano, was among the survivors.",
        "cn": "埃达·奇亚诺（Edda Ciano）是意大利独裁者贝尼托·墨索里尼（Benito Mussolini）的女儿，也是意大利外交部长加莱阿佐·奇亚诺（Galeazzo Ciano）的妻子"
      },
      {
        "en": "During World War II, h ospital ships were protected under international humanitarian law.",
        "cn": "在第二次世界大战期间，战舰受到国际人道主义法的保护。"
      },
      {
        "en": "They were required to be painted white with green bands and red crosses and illuminated at night.",
        "cn": "他们被要求被漆成白色，带有绿色条带和红色十字架，并在夜间照明。"
      },
      {
        "en": "On the night the Po sank, however, its lights had intentionally been kept off to avoid drawing attention to other ships anchored in the bay.",
        "cn": "然而，在Po沉没的那天晚上，它的灯被故意关闭，以避免引起停泊在海湾的其他船只的注意。"
      },
      {
        "en": "Today, the 443-foot-long shipwreck lies within the Karaburun-Sazan Marine Protected Area, submerged about 108 to 121 feet deep.",
        "cn": "今天，这艘443英尺长的沉船位于Karaburun-Sazan海洋保护区内，水深约108至121英尺。"
      },
      {
        "en": "Discovered by divers in 2005, it rests on a gently inclined shelf less than a mile off the coast.",
        "cn": "它由潜水员于2005年发现，坐落在离海岸不到一英里的平缓倾斜的架子上。"
      },
      {
        "en": "The vessel is well preserved, with ceramic tiles still lining its bathrooms, fans still hanging from its ceilings and teak tables still “intact, clean and perfectly aligned with each other” on the bridge deck, Cesare Balzi wrote for X-Ray Mag in 2018.",
        "cn": "切萨雷·巴尔齐（Cesare Balzi）在2018年的《X-Ray Mag》杂志上写道，这艘船保存完好，浴室里仍然铺着瓷砖，风扇仍然悬挂在天花板上，柚木桌子仍然“完好无损，干净整洁，彼此完美对齐”。"
      },
      {
        "en": "Researchers were curious to know how the wreckage was affecting the local marine ecosystem.",
        "cn": "研究人员想知道残骸是如何影响当地海洋生态系统的。"
      },
      {
        "en": "Between June 2022 and September 2024, they made 32 scientific dives to the Po, which they studied using high-resolution sonar surveys and 3D photography.",
        "cn": "在2022年6月至2024年9月期间，他们对Po进行了32次科学潜水，他们使用高分辨率声纳调查和3D摄影进行了研究。"
      },
      {
        "img": "assets/covers/his-this-hospital-ship-sank-off-albania-s-coast-du-1.jpg",
        "cap": "The 443-foot-long shipwreck lies within the Karaburun-Sazan Marine Protected Area. Mauro Pazzi"
      },
      {
        "en": "In total, the researchers observed 151 species, ranging from common fish to invertebrates and mammals.",
        "cn": "研究人员总共观察了151种物种，从普通鱼类到无脊椎动物和哺乳动物。"
      },
      {
        "en": "The findings suggest that the Po has transformed into an artificial reef, providing habitat and shelter for a diverse range of marine life.",
        "cn": "研究结果表明，Po已经变成了一个人工珊瑚礁，为各种海洋生物提供了栖息地和庇护所。"
      },
      {
        "en": "“The structure may provide an occasional nursery area for coastal fish, support cephalopod reproduction and function as a temporary resting site for severely endangered marine mammals,” the researchers write in the paper.",
        "cn": "研究人员在论文中写道：“该结构可能为沿海鱼类提供偶尔的育苗区，支持头足类繁殖，并作为严重濒危海洋哺乳动物的临时休息场所。”"
      },
      {
        "en": "They found that sponges, sea squirts, mussels, oysters and algae covered most of the vessel’s surface, while amberjacks, sea bass, wrasse, scorpionfish, goby and other species of fish floated in and around the ship.",
        "cn": "他们发现，海绵、海鞘、贻贝、牡蛎和藻类覆盖了船舶的大部分表面，而琥珀杰克鱼、海鲈、皱纹鱼、蝎子鱼、高比鱼和其他鱼类则漂浮在船内和周围。"
      },
      {
        "en": "Scientists also spotted squid egg clusters attached to the vessel.",
        "cn": "科学家们还发现了附着在船上的鱿鱼卵簇。"
      },
      {
        "en": "“The metal sheets provide a hard substrate for marine life to grow on,” lead author Simone Modugno, a marine biologist with the Institute for Research, Development and Experimentation on the Environment and Territory, tells BBC Wildlife magazine ’s Helen Pilcher.",
        "cn": "“金属板为海洋生物的生长提供了坚硬的基础，”环境与领土研究、开发和实验研究所的海洋生物学家Simone Modugno告诉英国广播公司野生动物杂志的海伦·皮尔彻。"
      },
      {
        "en": "Additionally, researchers observed a rare Mediterranean monk seal resting in the vessel—the first sighting of the endangered species in Vlora Bay since 1996.",
        "cn": "此外，研究人员观察到一只罕见的地中海僧海豹在船上休息，这是自1996年以来首次在Vlora湾发现这种濒危物种。"
      },
      {
        "en": "This finding suggests that the marine mammals may be seeking refuge on artificial reefs like the Po as their natural habitat is increasingly threatened by human activities.",
        "cn": "这一发现表明，海洋哺乳动物可能正在Po等人工珊瑚礁上寻求庇护，因为它们的自然栖息地越来越受到人类活动的威胁。"
      },
      {
        "en": "An estimated 444 to 600 mature Mediterranean monk seals remain in the Mediterranean Sea and small areas of the Atlantic Ocean near northwest Africa.",
        "cn": "估计有444至600只成熟的地中海僧海豹留在地中海和非洲西北部附近的大西洋小区域。"
      },
      {
        "en": "The population is gradually growing, but the species is still considered vulnerable by the International Union for Conservation of Nature and endangered under the Endangered Species Act.",
        "cn": "人口正在逐渐增长，但该物种仍被国际自然保护联盟视为脆弱物种，并根据《濒危物种法》濒临灭绝。"
      },
      {
        "en": "Mediterranean monk seals spend most of their time in water, but they waddle onto land periodically to rest and give birth.",
        "cn": "地中海僧海豹大部分时间都在水中度过，但它们会定期徘徊在陆地上休息和分娩。"
      }
    ]
  },
  {
    "id": "his-the-real-story-behind-the-uprising-and-the-138",
    "cat": "历史",
    "title": "The Real Story Behind 'The Uprising' and the 1381 Peasants' Revolt, When Thousands Marched on London to Demand a Fairer Society",
    "titleZh": "《起义》背后的真实故事：1381 年农民起义，数千人进军伦敦要求更公平的社会",
    "source": "Smithsonian Magazine · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/history/the-real-story-behind-the-uprising-and-the-1381-peasants-revolt-when-thousands-marched-on-london-to-demand-a-fairer-society-180989464/",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/his-the-real-story-behind-the-uprising-and-the-138.jpg",
    "paras": [
      {
        "en": "Paul Greengrass’ new film stars Andrew Garfield as a fictionalized, unnamed farmer who leads a rebellion against unfair taxes and the system of serfdom",
        "cn": "保罗·格林格拉斯（Paul Greengrass）的新电影明星安德鲁·加菲尔德（Andrew Garfield）是一个虚构的、未透露姓名的农民，他领导了一场反对不公平税收和农奴制度的叛乱"
      },
      {
        "en": "The Tower of London has protected England’s capital since it was first built in the 1070s, withstanding medieval sieges and World War II bombing raids alike.",
        "cn": "伦敦塔自1070年代首次建成以来一直保护着英格兰的首都，经受住了中世纪的围攻和第二次世界大战的轰炸。"
      },
      {
        "en": "On a June day in 1381, however, rebels breached the Tower for the first and only time in its history.",
        "cn": "然而，在1381年6月的一天，叛乱分子在其历史上第一次也是唯一一次突破了这座塔。"
      },
      {
        "en": "Once inside the fortress, the insurgents exacted revenge on their enemies, dragging some of the kingdom’s most powerful men out to an execution block and chopping off their heads.",
        "cn": "一旦进入堡垒，叛乱分子就向他们的敌人进行报复，将一些王国最强大的人拖到处决区并砍下他们的头。"
      },
      {
        "en": "This unprecedented act of violence took place at the height of the Peasants’ Revolt, a mass uprising sparked by the imposition of a poll tax —the third of its kind in four years.",
        "cn": "这种前所未有的暴力行为发生在农民起义的高峰期，这是四年来第三次征收人头税引发的大规模起义。"
      },
      {
        "en": "England had been at war with France for nearly five decades, and officials needed more money to pay for the kingdom’s armies and defenses.",
        "cn": "英格兰与法国交战了近五十年，官员们需要更多的钱来支付王国的军队和国防费用。"
      },
      {
        "en": "The tax was “an unevenly distributed one,” asking more of the lower classes than the wealthy, and it was “very badly administered,” Andrew Prescott, a historian at the University of Glasgow, tells Smithsonian magazine.",
        "cn": "格拉斯哥大学(University of Glasgow)历史学家安德鲁·普雷斯科特(Andrew Prescott)告诉《史密森尼》(Smithsonian)杂志，这项税收“分配不均”，对下层阶级的要求高于对富人的要求，而且“管理非常糟糕”。"
      },
      {
        "en": "“That poor administration helped trigger the revolt,” which ultimately evolved from a protest against unfair taxes into a broader push for a more equitable society.",
        "cn": "“那个糟糕的政府帮助引发了叛乱”，最终从对不公平税收的抗议演变为对更公平社会的更广泛推动。"
      },
      {
        "img": "assets/covers/his-the-real-story-behind-the-uprising-and-the-138-1.jpg",
        "cap": "A late 15th-century depiction of the Tower of London and its keep, the White Tower Public domain via Wikimedia"
      },
      {
        "en": "The insurgents’ demands ranged from the abolition of serfdom to the redistribution of the church’s riches.",
        "cn": "叛乱分子的要求从废除农奴制到重新分配教会的财富不等。"
      },
      {
        "en": "Although the rebellion failed to achieve any of its stated goals, it inspired subsequent “large-scale popular uprisings with a political aim,” Prescott says.",
        "cn": "普雷斯科特说，尽管叛乱未能实现其任何既定目标，但它激发了随后的“有政治目的的大规模民众起义”。"
      },
      {
        "en": "As Dan Jones, author of Summer of Blood: England’s First Revolution, tells Smithsonian, after 1381, it became “if not impossible, then highly inadvisable, to ignore the effects of policy on ordinary people.”",
        "cn": "正如《血之夏：英格兰的第一次革命》一书的作者丹·琼斯（Dan Jones）告诉史密森尼，1381年后，“如果不是不可能的话，那么忽视政策对普通人的影响是非常不明智的。”"
      },
      {
        "en": "A new film by Paul Greengrass, a veteran director of tense action films including Captain Phillips and The Bourne Ultimatum, reimagines the Peasants’ Revolt from the perspectives of those who participated in it.",
        "cn": "保罗·格林格拉斯（Paul Greengrass）是包括《菲利普斯船长》（Captain Phillips）和《伯恩最后通牒》（The Bourne Ultimatum）在内的紧张动作电影的资深导演，他拍摄的一部新电影从参与者的角度重新构想了农民起义。"
      },
      {
        "en": "Titled The Uprising, the movie stars Andrew Garfield as the Ploughman, a fictionalized everyman who takes up arms against the corrupt politicians advising England’s 14-year-old king, Richard II.",
        "cn": "这部名为《起义》（The Uprising）的电影由安德鲁·加菲尔德（Andrew Garfield）饰演犁人（Ploughman），这是一个虚构的普通人，他拿起武器对抗为英格兰14岁的国王理查二世（Richard II）提供"
      },
      {
        "en": "Greengrass follows the Ploughman and his fellow insurgents as they make their way to London for a climactic face-to-face meeting with the young monarch.",
        "cn": "Greengrass跟随Ploughman和他的叛乱分子同伴前往伦敦，与年轻的君主面对面会面。"
      },
      {
        "en": "“I didn’t want to tell [this story] through the names we remember,” like rebel leader Wat Tyler (played by Cosmo Jarvis ) and his comrade, the bombastic priest John Ball (Jamie Bell), Greengrass says in a director’s statement.",
        "cn": "Greengrass在一份导演声明中说：“我不想通过我们记住的名字来讲述[这个故事] ，”就像叛军领导人Wat Tyler （由Cosmo Jarvis扮演）和他的同志，夸张的牧师John Ball （Jamie Bell）。"
      },
      {
        "en": "Instead, he wanted to focus on “someone history never named at all: a farmer, the first man to raise his hand in Essex.",
        "cn": "相反，他想专注于“一个从未命名过的历史人物：一个农民，第一个在埃塞克斯举手的人。"
      },
      {
        "en": "I wanted him to stand for all the ordinary people who actually rose up and paid the price for it.”",
        "cn": "我希望他能代表所有真正站起来为此付出代价的普通人。”"
      },
      {
        "en": "Here’s what you need to know about the real history behind The Uprising ahead of the film’s arrival in theaters across the United States on September 10.",
        "cn": "以下是电影于9月10日抵达美国各地影院之前，您需要了解的《起义》背后的真实历史。"
      },
      {
        "en": "Greengrass first learned about the Peasants’ Revolt as a schoolchild.",
        "cn": "格林格拉斯从小就开始了解农民起义。"
      },
      {
        "en": "During the Covid-19 pandemic, he saw parallels between the ongoing crisis and the Black Death, which killed an estimated 30 to 50 percent of England’s population just a few decades before the uprising.",
        "cn": "在新冠肺炎疫情期间，他看到了持续的危机与黑死病之间的相似之处，黑死病在起义前几十年杀死了估计30%至50%的英格兰人口。"
      },
      {
        "en": "The bubonic plague contributed to a growing sense of dissatisfaction in the country in the mid-14th century.",
        "cn": "在14世纪中叶，腺鼠疫导致了该国日益增长的不满情绪。"
      },
      {
        "en": "At the time, all property in England legally belonged to the king, who granted lesser lords the right to lease land to tenants “in return for certain services and restrictions on their freedom,” Prescott says.",
        "cn": "当时，英格兰的所有财产在法律上都属于国王，国王授予较小的领主向租户出租土地的权利，“以换取某些服务和对其自由的限制”，普雷斯科特说。"
      }
    ]
  },
  {
    "id": "his-world-s-largest-collection-of-serial-killer-mu",
    "cat": "历史",
    "title": "World’s Largest Collection of Serial Killer ‘Murderabilia,’ From John Wayne Gacy to H.H. Holmes, Opens in Chicago",
    "titleZh": "全球最大的连环杀手“谋杀纪念品”收藏展在芝加哥开幕，从约翰·韦恩·盖西到 H.H. 福尔摩斯",
    "source": "Smithsonian Magazine · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/worlds-largest-collection-of-serial-killer-murderabilia-from-john-wayne-gacy-to-hh-holmes-opens-in-chicago-180989461/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/his-world-s-largest-collection-of-serial-killer-mu.jpg",
    "paras": [
      {
        "en": "A harrowing curation of artifacts linked to the world’s most notorious serial killers—including the “Killer Clown” John Wayne Gacy and H.H.",
        "cn": "一系列与世界上最臭名昭著的连环杀手有关的文物，包括“杀手小丑”约翰·韦恩·盖西（John Wayne Gacy）和H.H."
      },
      {
        "en": "Holmes of The Devil in the White City infamy—anchors a new exhibition, now open in Chicago.",
        "cn": "因《白城恶魔》而臭名昭著的福尔摩斯——是芝加哥正在举办的新展览的核心人物。"
      },
      {
        "en": "Spanning a massive, 21,000-square-foot space, “ Serial Killer: The Exhibition ” brings together more than 2,000 items that confront myth with true crime’s gruesome reality.",
        "cn": "“连环杀手：展览”占地21,000平方英尺，汇集了2,000多件物品，将神话与真实犯罪的可怕现实相结合。"
      },
      {
        "en": "Displays spotlight personal belongings, investigative evidence, authentic artworks and other “murderabilia” that offer an uncanny peek into the lives of roughly 150 killers from dozens of countries who devised and committed unthinkable crimes.",
        "cn": "展示聚光灯下的个人物品、调查证据、真实的艺术品和其他“谋杀品”，让人们惊奇地窥见来自数十个国家的大约150名凶手的生活，这些凶手策划并犯下了不可思议的罪行。"
      },
      {
        "en": "“These are all original,” exhibition consultant John Borowski, a filmmaker and an author who specializes in serial killer histories, tells Fox 32 Chicago ’s Leslie Moreno.",
        "cn": "“这些都是原创的，”电影制片人兼作家约翰·博罗夫斯基（John Borowski）告诉福克斯32芝加哥的莱斯利·莫雷诺（Leslie Moreno）。"
      },
      {
        "en": "“Nowhere in the world are you going to see an exhibit like this with artifacts from so many serial killers under one roof.”",
        "cn": "“世界上没有任何地方会在一个屋檐下看到这样的展览，里面有这么多连环杀手的文物。”"
      },
      {
        "img": "assets/covers/his-world-s-largest-collection-of-serial-killer-mu-1.jpg",
        "cap": ""
      },
      {
        "en": "Perhaps Chicago’s most well-known serial killer, Gacy features prominently in the exhibition.",
        "cn": "也许是芝加哥最著名的连环杀手，盖西在展览中占据突出地位。"
      },
      {
        "en": "Throughout the 1970s, Gacy—who worked as a birthday party clown alternately named Pogo and Patches— killed at least 33 teenage boys and young men after luring them to his home on the outskirts of the city, where he buried the remains of 29 of his victims in his basement’s crawl space.",
        "cn": "在整个20世纪70年代，Gacy曾担任生日派对小丑，交替命名为Pogo和Patches ，他将至少33名十几岁的男孩和年轻人引诱到他位于城市郊区的家中，在那里他将29名受害者的遗体埋葬在地下室的爬行空间中。"
      },
      {
        "en": "Gacy was sentenced to death in 1980, though he spent the next 14 years appealing his sentence.",
        "cn": "盖西于1980年被判处死刑，尽管他花了接下来的14年时间对他的判决提出上诉。"
      },
      {
        "en": "While on death row, he became a prolific painter and made more than $30,000 selling his canvases, which often featured clowns and skulls, the Los Angeles Times ’ Stephen Braun reported in 1994, the year Gacy was executed.",
        "cn": "《洛杉矶时报》的斯蒂芬·布劳恩（Stephen Braun）在1994年报道说，在死囚区，他成为一名多产的画家，卖掉画布赚了3万多$ ，画布上经常有小丑和头骨。"
      },
      {
        "en": "Some of Gacy’s paintings featured in the exhibition, on show for the first time, come from people who knew him personally.",
        "cn": "展览中首次展出的盖西的一些画作来自认识他的人。"
      },
      {
        "en": "I’m not selling them, because I would hate to profit,” Karen Conti, a lawyer who was part of Gacy’s legal team during his death row appeals, tells the Chicago Sun-Times ’ Selena Fragassi.",
        "cn": "我不会卖掉它们，因为我不想从中获利。”凯伦·孔蒂（Karen Conti）是一名律师，在盖西的死囚上诉期间是盖西法律团队的一员，她告诉《芝加哥太阳时报》的塞琳娜·弗拉加西（Selena Fragassi）。"
      },
      {
        "en": "“I just didn’t know what to do with them.”",
        "cn": "“我只是不知道该怎么办。”"
      },
      {
        "en": "For 30 years, Conti kept three paintings Gacy had given her face down in a closet.",
        "cn": "30年来，孔蒂一直把盖西给她的三幅画放在壁橱里。"
      },
      {
        "en": "Two depict variations of clowns and skulls, while the third is a coastal landscape with a low-hanging moon and red trees beside open water.",
        "cn": "两幅描绘了小丑和头骨的变体，而第三幅是沿海景观，在开阔的水域旁边有一个低垂的月亮和红色的树木。"
      },
      {
        "en": "“He said it was mysterious, just like he is,” Conti says.",
        "cn": "“他说这很神秘，就像他一样，”Conti说。"
      },
      {
        "en": "The exhibition dedicates displays to other local killers, including Holmes, who, as one of America’s first serial killers, used his “ Murder Castle ” hotel to claim victims’ lives during the 1893 Chicago World’s Fair.",
        "cn": "该展览致力于展示其他当地杀手，包括福尔摩斯，他作为美国最早的连环杀手之一，在1893年芝加哥世界博览会期间使用他的“谋杀城堡”酒店夺走了受害者的生命。"
      },
      {
        "en": "Lesser-known featured Chicago killers include Richard Speck; the satanic Ripper Crew cult; and Tillie Klimek, known as Chicago’s “Black Widow,” who claimed to have had precognitive dreams of the deaths of her husbands, whom, in reality, she poisoned.",
        "cn": "鲜为人知的芝加哥杀手包括理查德·斯佩克（Richard Speck）、撒旦式的开膛手船员邪教（Ripper Crew cult）和被称为芝加哥“黑寡妇”的蒂莉·克莱梅克（Tillie Klimek），她声称自己曾梦到丈夫的死亡，而实际上，她的丈夫是被毒死的。"
      },
      {
        "en": "Although Robert Ressler, an FBI investigator, is largely credited with having coined the term \"serial killer,\" Ernst Gennat of the Berlin Criminal Police used the German translation, \" serienm&ouml;rder,\" in a 1930 article.",
        "cn": "尽管联邦调查局调查员罗伯特·雷斯勒（Robert Ressler）在很大程度上创造了“连环杀手”一词，但柏林刑事警察局的恩斯特·根纳特（Ernst Gennat）在1930年的一篇文章中使用了德语翻译“serienmörder”。"
      },
      {
        "en": "Billed as the world’s largest private collection of serial killer artifacts, the exhibition toured Europe before arriving stateside, where it made its first stop in Atlanta.",
        "cn": "该展览被誉为世界上最大的连环杀手文物私人收藏，在抵达美国之前在欧洲巡回展出，并在亚特兰大首次停留。"
      },
      {
        "en": "More than 500,000 visitors worldwide have visited the installation.",
        "cn": "全球已有超过50万名参观者参观了该装置。"
      },
      {
        "en": "Its Chicago stop, which opened to the public over Labor Day weekend, runs through January.",
        "cn": "芝加哥站在劳动节周末向公众开放，一直持续到1月。"
      },
      {
        "en": "“One thing that this exhibition, myself included, is totally against is anything glorifying or glamorizing” serial killers, Bill Kimberlin, a true-crime researcher and collector, tells WGN Radio 720 ’s Wendy Snyder.",
        "cn": "连环杀手比尔·金伯利林（Bill Kimberlin）是真正的犯罪研究者和收藏家，他告诉WGN Radio 720的温迪·斯奈德（Wendy Snyder）：“这个展览，包括我自己在内，完全反对任何美化或美化”的连环杀手。"
      }
    ]
  },
  {
    "id": "his-india-s-forgotten-ww1-heroes-why-it-s-taken-a-",
    "cat": "历史",
    "title": "India’s forgotten WW1 heroes: why it’s taken a century for these soldiers to be recognised",
    "titleZh": "印度被遗忘的一战英雄：为什么这些士兵过了一个世纪才被认可",
    "source": "HistoryExtra · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 3,
    "url": "https://www.historyextra.com/membership/indias-forgotten-ww1-heroes-why-its-taken-a-century-for-these-soldiers-to-be-recognised/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/his-india-s-forgotten-ww1-heroes-why-it-s-taken-a-.jpg",
    "paras": [
      {
        "en": "Kavita Puri on the century-long effort to right a First World War injustice",
        "cn": "Kavita Puri讲述了长达一个世纪的努力，以纠正第一次世界大战的不公正"
      },
      {
        "en": "Amandeep Madra remembers his father telling him, almost in passing, that his uncle (Amandeep’s great uncle) had served with the British during the First World War.",
        "cn": "阿曼迪普·马德拉（Amandeep Madra）记得父亲几乎是顺带地告诉他，他的叔叔（阿曼迪普的叔祖父）曾在第一次世界大战期间与英国人一起服役。"
      },
      {
        "en": "He had been blinded by sandstorms in Iraq; as a boy, Amandeep’s father had accompanied his uncle to Rupar in Ambala, in undivided India, to collect his army pension.",
        "cn": "他在伊拉克被沙尘暴弄瞎了眼睛；当阿曼迪普还是个孩子的时候，他的父亲曾陪同叔叔去印度未分裂的安巴拉的鲁帕尔领取他的军队养老金。"
      },
      {
        "en": "And this wasn’t ancient history, it was inside my own father’s lifetime,” Amandeep told me.",
        "cn": "这不是古老的历史，这是我父亲一生的经历，”阿曼迪普告诉我。"
      },
      {
        "en": "Amandeep was born and grew up in Britain in the 1970s, his parents having come over in the postwar years.",
        "cn": "阿曼迪普上世纪70年代在英国出生和长大，他的父母在战后的岁月里来到英国。"
      },
      {
        "en": "He never forgot that conversation with his father.",
        "cn": "他从未忘记和父亲的那次谈话。"
      },
      {
        "en": "Anecdotally, he knew a record had been kept of every man that served in the First World War from Punjab, where his family were from.",
        "cn": "有趣的是，他知道有一份记录保存着每一个在第一次世界大战中服役的人都来自旁遮普，他的家人来自那里。"
      },
      {
        "en": "“It felt almost mythical,” says Amandeep.",
        "cn": "“感觉就像神话一样，”阿曼迪普说。"
      },
      {
        "en": "“Something everyone had heard of, but no one had actually seen.”",
        "cn": "“每个人都听说过，但没有人真正见过。”"
      },
      {
        "en": "In the basement of Lahore Museum in Pakistan were 34 black, leather-bound registers gathering dust.",
        "cn": "在巴基斯坦拉合尔博物馆（Lahore Museum）的地下室里，有34本黑色皮革装订的登记簿落满了灰尘。"
      },
      {
        "en": "They had been there largely undisturbed for nearly 100 years, until Amandeep Madra contacted them.",
        "cn": "在Amandeep Madra联系他们之前，他们在那里生活了将近100年。"
      },
      {
        "en": "Working with the University of Greenwich in the UK, it took Amandeep some years to gain their trust, permission and pull the money together in order for the museum to eventually photograph every single one of the 26,000 pages.",
        "cn": "阿曼迪普与英国格林威治大学（University of Greenwich）合作，花了数年时间才获得他们的信任、许可，并筹集了资金，最终博物馆才能拍摄2.6万页的每一页。"
      },
      {
        "en": "One of the first full registers Amandeep asked for was for Ambala, his family’s district.",
        "cn": "阿曼迪普要求的第一批完整的选民之一是他家所在的安巴拉区。"
      },
      {
        "en": "When the museum sent a printout, he located his father’s village.",
        "cn": "当博物馆寄来打印件时，他找到了父亲的村庄。"
      },
      {
        "en": "There he found the name of his great uncle, Bishen Singh, son of Jatti.",
        "cn": "在那里，他找到了他的叔祖父，贾蒂的儿子毕申·辛格的名字。"
      },
      {
        "en": "It was an emotional moment for the family.",
        "cn": "对这个家庭来说，这是一个激动人心的时刻。"
      },
      {
        "en": "Amandeep’s mother was tearful at seeing the names written down, but also knowing her husband, Amandeep’s father, was no longer alive to see it.",
        "cn": "阿曼迪普的母亲看到写在上面的名字时泪流满面，但也知道她的丈夫，阿曼迪普的父亲，已经不在人世了。"
      },
      {
        "en": "More and more printouts were sent from Lahore.",
        "cn": "越来越多的打印材料从拉合尔寄来。"
      },
      {
        "en": "There were thousands of names in the registers, mostly written in dark ink.",
        "cn": "登记簿上有成千上万的名字，大多是用深色墨水写的。"
      },
      {
        "en": "They listed the soldier’s rank, the village they came from, their caste, any injuries, and if they died.",
        "cn": "他们列出了士兵的军衔，他们来自的村庄，他们的种姓，是否受伤，是否死亡。"
      },
      {
        "en": "The registers had been put together by the Punjab government in 1919–20 after the war.",
        "cn": "这些登记簿是旁遮普政府在战后的1919年至1920年间整理的。"
      },
      {
        "en": "It is believed they were compiled for postwar pensions and other veterans’ benefits.",
        "cn": "据信，这些数据是为战后养老金和其他退伍军人福利编制的。"
      },
      {
        "en": "The part that Amandeep and the University of Greenwich team of researchers were looking at was the subset of the register of those who died during the war.",
        "cn": "阿曼迪普和格林尼治大学的研究小组所关注的部分是战争期间死亡人员登记册的一部分。"
      },
      {
        "en": "They compared the names against the Commonwealth War Grave Commission’s (CWGC) own lists.",
        "cn": "他们将这些名字与英联邦战争坟墓委员会（CWGC）自己的名单进行了比较。"
      }
    ]
  },
  {
    "id": "his-the-bayeux-tapestry-what-is-it-why-was-it-made",
    "cat": "历史",
    "title": "The Bayeux Tapestry: what is it, why was it made and what story does it tell?",
    "titleZh": "贝叶挂毯：它是什么，为什么制作它，它讲述了什么故事？",
    "source": "HistoryExtra · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.historyextra.com/membership/5-bayeux-tapestry-facts-what-is-it-why-was-it-made-and-what-story-does-it-tell/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/his-the-bayeux-tapestry-what-is-it-why-was-it-made.jpg",
    "paras": [
      {
        "en": "The Bayeux Tapestry is one of the most famous and recognisable historic documents in the world, telling the story of the Norman Conquest of England in 1066, with a focus on the battle of Hastings and the showdown between William of Normandy and King Harold II.",
        "cn": "贝叶挂毯是世界上最著名和最知名的历史文献之一，讲述了1066年诺曼征服英格兰的故事，重点讲述了黑斯廷斯战役以及诺曼底的威廉和国王哈罗德二世之间的对决。"
      },
      {
        "en": "As part of his HistoryExtra Academy series on the embroidery, Dr David Musgrove examines the history of the tapestry, the story it tells, who made it and whether it's reliable as a historical source…",
        "cn": "作为他关于刺绣的历史系列的一部分，大卫·马斯格罗夫博士研究了挂毯的历史，它讲述的故事，它的制造者，以及它作为历史来源是否可靠……"
      },
      {
        "en": "The Bayeux Tapestry tells one of the most famous stories in British history – that of the Norman Conquest of England in 1066, particularly the battle of Hastings, which took place on 14 October 1066.",
        "cn": "贝叶挂毯讲述了英国历史上最著名的故事之一——1066年诺曼人征服英格兰的故事，尤其是1066年10月14日发生的黑斯廷斯战役。"
      },
      {
        "en": "The Bayeux Tapestry is not a tapestry at all, but rather an embroidery.",
        "cn": "贝叶挂毯根本不是挂毯，而是一种刺绣。"
      },
      {
        "en": "It is some 68m long and is composed of several panels that were produced separately and then eventually sewn together to form one long whole.",
        "cn": "它长约68米，由几块面板组成，这些面板分别生产，然后最终缝合在一起形成一个长整体。"
      },
      {
        "en": "It was most likely made in England by English embroiderers, and while we do not have a precise date for when the Bayeux Tapestry was created, the academic consensus is that it must have been produced very soon after the events it depicts.",
        "cn": "它很可能是由英国的刺绣工在英格兰制作的，虽然我们没有确切的日期来确定贝叶挂毯是什么时候制作的，但学术界的共识是，它一定是在它描绘的事件发生后不久制作的。"
      },
      {
        "en": "The action actually starts a couple of years before the set-piece battle of Hastings, with a discussion between England’s King, Edward the Confessor, and his leading noble (who was also his brother-in-law), Harold Godwinson.",
        "cn": "故事发生在黑斯廷斯战役前几年，英国国王忏悔者爱德华和他的贵族领袖（也是他的姐夫）哈罗德·戈德温森之间的讨论。"
      },
      {
        "en": "The upshot of that conversation is that Harold sets off on a ship to France.",
        "cn": "谈话的结果是哈罗德乘船去了法国。"
      },
      {
        "en": "He is shipwrecked and captured by a local nobleman there, and then is transferred into the hands of the powerful Duke William of Normandy.",
        "cn": "他遭遇海难，被当地的一个贵族抓获，然后被转移到强大的诺曼底公爵威廉的手中。"
      },
      {
        "en": "Curiously, they then head off together on a military adventure in Brittany, which Harold seems to enthusiastically take part in.",
        "cn": "奇怪的是，他们随后一起前往布列塔尼进行军事冒险，哈罗德似乎热情地参加了这次冒险。"
      },
      {
        "en": "Harold’s time in Normandy ends with him making an oath to William on holy relics.",
        "cn": "哈罗德在诺曼底的时光以他对着圣物向威廉宣誓结束"
      },
      {
        "en": "The tapestry does not explain precisely what the nature of the oath is, but other Norman-inclined sources tell us that Harold was swearing to be William’s man in England and to uphold his bid to be king on Edward’s death.",
        "cn": "挂毯上并没有准确地解释誓言的性质，但其他倾向于诺曼的资料告诉我们，哈罗德在英格兰发誓要做威廉的人，并在爱德华死后坚持他的王位。"
      },
      {
        "en": "Harold then goes back to England and has another meeting with Edward the Confessor.",
        "cn": "哈罗德随后回到英格兰，与忏悔者爱德华再次会面。"
      },
      {
        "en": "We don’t know what they talk about, but it’s presumably discussing his stay in Normandy.",
        "cn": "我们不知道他们谈了些什么，但大概是在讨论他在诺曼底的逗留。"
      },
      {
        "en": "Then Edward dies, and Harold is declared king by the English nobles.",
        "cn": "后来爱德华去世，哈罗德被英国贵族宣布为国王。"
      },
      {
        "en": "A comet shoots through the sky, which is deemed to be a bad omen for Harold.",
        "cn": "一颗彗星划过天空，这被认为是哈罗德的不祥之兆。"
      },
      {
        "en": "Then the action swings back to Normandy.",
        "cn": "然后剧情又回到了诺曼底。"
      },
      {
        "en": "William hears of Harold’s accession and immediately starts building a fleet.",
        "cn": "威廉听到哈罗德即位的消息，立即开始组建舰队。"
      },
      {
        "en": "The ships cross the Channel and the Norman army establishes itself on English soil.",
        "cn": "船队越过英吉利海峡，诺曼军队在英国领土上建立了自己的军队。"
      },
      {
        "en": "They are shown pillaging, feasting and fortifying their position.",
        "cn": "他们掠夺，盛宴和巩固他们的地位。"
      },
      {
        "en": "Then we get to the battle of Hastings itself, which is portrayed in considerable detail.",
        "cn": "接下来是黑斯廷斯战役，书中对其进行了相当详细的描述。"
      },
      {
        "en": "The upshot of course is that King Harold is slain, with the defeated Englishmen being shown fleeing the field in the last scene of the tapestry.",
        "cn": "当然，结局是哈罗德国王被杀，战败的英国人在挂毯的最后一幕逃离战场。"
      },
      {
        "en": "The ending is abrupt and many people have pondered on whether the tapestry was not actually finished, or has lost its final frames at some point over the centuries.",
        "cn": "结局很突然，许多人都在想，这幅挂毯到底是没有完成，还是几个世纪以来的某个时候失去了最后的画框。"
      },
      {
        "en": "If so, the end panels might have shown William being crowned king of England, as that was the ultimate consequence of the Conquest.",
        "cn": "如果是这样，最后的镶板可能显示威廉被加冕为英格兰国王，因为这是征服的最终结果。"
      }
    ]
  },
  {
    "id": "his-young-elizabeth-i-the-making-of-a-queen",
    "cat": "历史",
    "title": "Young Elizabeth I: the making of a queen",
    "titleZh": "年轻的伊丽莎白一世：成为女王",
    "source": "HistoryExtra · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 2,
    "url": "https://www.historyextra.com/membership/elizabeth-i-episode-one/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/his-young-elizabeth-i-the-making-of-a-queen.jpg",
    "paras": [
      {
        "en": "Nicola Tallis explores Elizabeth I’s early years to reveal how her formative experiences influenced the monarch she later became",
        "cn": "尼古拉·塔利斯探索了伊丽莎白一世的早年生活，揭示了她的成长经历是如何影响她后来成为君主的"
      },
      {
        "en": "Elizabeth I is one of history's most iconic monarchs, but her path to the throne was anything but secure.",
        "cn": "伊丽莎白一世是历史上最具标志性的君主之一，但她登上王位的道路却并不安全。"
      },
      {
        "en": "In this first episode of our four-part Sunday Series on the 16th-century royal, Rachel Dinning is joined by historian Nicola Tallis to explore Elizabeth’s turbulent early years – from the execution of her mother, Anne Boleyn, to the political and personal dangers she faced as she navigated childhood, illegitimacy, and the treacherous Tudor succession.",
        "cn": "在我们关于16世纪王室的四集周日系列节目的第一集中，雷切尔·丁宁和历史学家尼古拉·塔利斯一起探索了伊丽莎白动荡的早年——从她母亲安妮·博林的处决，到她在童年时期面临的政治和个人危险，私生子，以及都铎王朝的危险继承。"
      },
      {
        "en": "Together, they uncover how these formative experiences helped shape the woman who would become a formidable queen.",
        "cn": "他们一起揭示了这些形成性的经历如何帮助塑造了这位将成为令人敬畏的女王的女人。"
      },
      {
        "en": "Want to know more about Elizabeth I and her remarkable reign?",
        "cn": "想知道更多关于伊丽莎白一世和她卓越的统治吗？"
      },
      {
        "en": "Rachel Dinning rounds up essential reading from the HistoryExtra archive that explores Elizabeth's early life, rise to power, and the legacy that made her one of England’s most iconic monarchs.",
        "cn": "雷切尔·丁宁从HistoryExtra的档案中收集了一些重要的读物，这些读物探索了伊丽莎白的早期生活，掌权的过程，以及使她成为英格兰最具代表性的君主之一的遗产。"
      },
      {
        "en": "Rachel Dinning is digital editor (engagement and video) at HistoryExtra",
        "cn": "雷切尔·丁宁是HistoryExtra的数字编辑（参与和视频）"
      },
      {
        "en": "This page contains HistoryExtra content provided by Google reCAPTCHA.",
        "cn": "此页面包含谷歌reCAPTCHA提供的额外内容。"
      },
      {
        "en": "We ask for your permission before anything is loaded, as Google reCAPTCHA may use cookies and other technologies.",
        "cn": "在加载任何内容之前，我们都会请求您的许可，因为谷歌reCAPTCHA可能会使用cookie和其他技术。"
      },
      {
        "en": "To view this content, choose 'Accept and continue' to allow Google reCAPTCHA and its required purposes.",
        "cn": "要查看此内容，请选择“接受并继续”以允许谷歌reCAPTCHA及其所需目的。"
      }
    ]
  },
  {
    "id": "his-stealing-candy-from-children-splash-proof-urin",
    "cat": "历史",
    "title": "Stealing Candy From Children, Splash-Proof Urinals and Buried Panties, Oh My! Here Are the Winners of the 2026 Ig Nobel Prizes",
    "titleZh": "从孩子手里抢糖、防溅小便池和埋起来的内裤，天哪！2026 年搞笑诺贝尔奖得主揭晓",
    "source": "Smithsonian Magazine · 2026-09-08",
    "date": "2026-09-08",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/stealing-candy-from-children-splash-proof-urinals-and-buried-panties-oh-my-here-are-the-winners-of-the-2026-ig-nobel-prizes-180989463/",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/his-stealing-candy-from-children-splash-proof-urin.jpg",
    "paras": [
      {
        "en": "You’re probably familiar with the Nobel Prizes, some of the most prestigious awards.",
        "cn": "您可能熟悉诺贝尔奖，这是一些最负盛名的奖项。"
      },
      {
        "en": "While the world eagerly awaits who will earn those prizes this year, some researchers are currently celebrating the winners of playful—yet still scholarly—parody awards: the Ig Nobel Prizes, which were announced on September 3.",
        "cn": "虽然全世界都在热切地等待今年谁将获得这些奖项，但一些研究人员目前正在庆祝9月3日宣布的搞笑但仍然是学术模仿奖的获奖者：搞笑诺贝尔奖。"
      },
      {
        "en": "Organized by the company Improbable Research, the spoof awards were designed to “honor achievements so surprising that they make people laugh, then think,” per their website.",
        "cn": "这些欺骗性奖项由Improbable Research公司组织，旨在“表彰令人惊讶的成就，让人们发笑，然后思考”，根据他们的网站。"
      },
      {
        "en": "Winning work highlighted during the 36th annual award ceremony included hilarious research on the aerodynamics of nose blowing, gently stepping on venomous snakes, confirming that teenagers do indeed smell worse than babies and other side-splitting scientific undertakings.",
        "cn": "第36届年度颁奖典礼上突出的获奖作品包括关于吹鼻子的空气动力学的热闹研究，轻轻踩在毒蛇身上，证实青少年确实比婴儿更难闻，以及其他侧面分裂的科学事业。"
      },
      {
        "en": "“This year’s award winners took seemingly far-fetched ideas and turned them into legitimate research projects,” Carly Anne York, an animal behaviorist and physiologist at Lenoir-Rhyne University, tells CNN ’s Jack Guy.",
        "cn": "Lenoir-Rhyne大学的动物行为学家和生理学家卡莉·安妮·约克（Carly Anne York）告诉美国有线电视新闻网（CNN）的杰克·盖伊（Jack Guy）：“今年的获奖者把看似牵强附会的想法变成了合法的研究项目。”"
      },
      {
        "en": "“And yes, these are legitimate scientific endeavors.” York was not involved with the Ig Nobels, but she has spotlighted funny scientific work in her book The Salmon Cannon and the Levitating Frog: And Other Serious Discoveries of Silly Science.",
        "cn": "“是的，这些都是合法的科学努力。“约克没有参与搞笑诺贝尔奖，但她在《鲑鱼大炮和悬浮青蛙：和其他愚蠢科学的严肃发现》一书中重点介绍了有趣的科学工作。"
      },
      {
        "en": "Here are the projects that won the ten categories of the 2026 Ig Nobel Prizes.",
        "cn": "以下是获得2026年搞笑诺贝尔奖十大奖项的项目。"
      },
      {
        "en": "While kissing might sound like an easy dynamic to describe, the winners of the Ig Nobel Biomechanics Prize came up with a precise definition: “a non-agonistic interaction involving directed, intraspecific, oral-oral contact with some movement of the lips/mouthparts and no food transfer.” The explanation was included in a study published in the January 2026 issue of the journal Evolution and Human Behavior.",
        "cn": "虽然接吻听起来很容易描述，但搞笑诺贝尔生物力学奖的获奖者提出了一个精确的定义：“一种非对抗性的互动，涉及定向、种内、口腔与嘴唇/口器运动的接触，没有食物转移。“这项解释发表在2026年1月出版的《进化与人类行为》杂志上的一项研究中。"
      },
      {
        "en": "“My jaw hit the floor when I got the phone call” about the award, Matilda Brindle, an evolutionary biologist at the University of Oxford in England who worked on the research, tells Nature ’s Chris Simms.",
        "cn": "英国牛津大学的进化生物学家玛蒂尔达·布林德尔（Matilda Brindle）告诉《自然》杂志的克里斯·西姆斯（Chris Simms），“当我接到关于该奖项的电话时，我的下巴掉在地板上”。"
      },
      {
        "en": "“It’s certainly one of my proudest life achievements.”",
        "cn": "“这无疑是我一生中最自豪的成就之一。”"
      },
      {
        "en": "In the study, “we’ve shown that animals kiss and when it could have evolved in the primates,” she says.",
        "cn": "她说：“在这项研究中，我们已经证明了动物接吻以及它何时可以在灵长类动物中进化。”"
      },
      {
        "en": "“The obvious next step is understanding why.",
        "cn": "“显而易见的下一步是了解原因。"
      },
      {
        "en": "If this award helps spark more curiosity about this sort of question, then that’s a pretty wonderful outcome.”",
        "cn": "如果这个奖项有助于激发人们对这类问题的好奇心，那么这是一个非常好的结果。”"
      },
      {
        "en": "Underwear buried to test soil quality and urinals scientifically designed to prevent splashing were among the projects honoured as the Ig Nobel prizes again put a spotlight on the quirky side of science.",
        "cn": "埋葬以测试土壤质量的内衣和科学设计以防止飞溅的小便池是获得荣誉的项目之一，因为搞笑诺贝尔奖再次将焦点放在科学的古怪方面。"
      },
      {
        "en": "An older study—with more alarming findings—won the Ig Nobel Economics Prize.",
        "cn": "一项具有更令人担忧的发现的较早研究获得了搞笑诺贝尔经济学奖。"
      },
      {
        "en": "In 2012, researchers reported that higher-class individuals are more likely to engage in unethical behaviors, like taking candy meant for children.",
        "cn": "2012年，研究人员报告说，高阶层的人更有可能从事不道德的行为，比如吃儿童糖果。"
      },
      {
        "en": "Wealthier individuals were also more likely to lie at work and cheat during games.",
        "cn": "较富有的人也更有可能在工作中撒谎，在游戏中作弊。"
      },
      {
        "en": "“The general pattern seems to be that with wealth and rising power, you become less engaged with the needs of others and less burdened by the needs of social relationships,” study co-author Paul Piff, a social psychologist at the University of California, Irvine, tells the Guardian ’s Ian Sample.",
        "cn": "研究报告的共同作者、加州大学欧文分校的社会心理学家保罗·皮夫（Paul Piff）告诉《卫报》的伊恩·样本（Ian Sample）：“一般的模式似乎是，随着财富和权力的不断崛起，你对他人的需求的参与度降低，而对社会关系的需求的负担减轻。”"
      },
      {
        "en": "The recipients of the Ig Nobel Chemistry Prize, however, conducted research concerning much smaller individuals: cockroaches.",
        "cn": "然而，Ig诺贝尔化学奖的获得者对更小的个体进行了研究：蟑螂。"
      },
      {
        "en": "In a 2016 study, scientists found that milk proteins from a species of cockroach that gives live birth carry three times as much energy as milk proteins from cows.",
        "cn": "在2016年的一项研究中，科学家们发现，一种活产蟑螂的乳蛋白所携带的能量是奶牛乳蛋白的三倍。"
      },
      {
        "en": "Speaking of bodily fluids, research on nose-blowing won the Ig Nobel Medicine Prize.",
        "cn": "说到体液，关于流鼻涕的研究获得了Ig诺贝尔医学奖。"
      }
    ]
  },
  {
    "id": "his-thieves-broke-into-a-french-museum-and-made-of",
    "cat": "历史",
    "title": "Thieves Broke Into a French Museum and Made Off With Renoir Paintings Worth More Than $2.5 Million",
    "titleZh": "窃贼闯入法国一家博物馆，偷走了价值250多万美元的雷诺阿画作",
    "source": "Smithsonian Magazine · 2026-09-08",
    "date": "2026-09-08",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/thieves-broke-into-a-french-museum-and-made-off-with-renoir-paintings-worth-more-than-25-million-180989462/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/his-thieves-broke-into-a-french-museum-and-made-of.jpg",
    "paras": [
      {
        "en": "In France’s latest art heist, two thieves broke into Pierre-Auguste Renoir ’s house and stole four of his paintings.",
        "cn": "在法国最近的艺术品盗窃案中，两名小偷闯入皮埃尔-奥古斯特·雷诺阿的家中，偷走了他的四幅画。"
      },
      {
        "en": "The burglars entered Cagnes-sur-Mer’s Renoir Museum, housed in the estate where the famed Impressionist spent the last decade of his life, before sunrise this morning.",
        "cn": "在今天早晨日出之前，窃贼进入了梅尔河畔卡涅的雷诺阿博物馆，该博物馆位于著名印象派画家雷诺阿度过生命最后十年的地方。"
      },
      {
        "en": "“They were equipped with an electric knife or a metal saw—whatever you prefer to call it—and they cut through the bolts holding the frames of Renoir’s works in place,” Bryan Masson, the mayor of Cagnes-sur-Mer, told reporters, per ABC News ’ Kevin Shalvey.",
        "cn": "据ABC新闻的凯文·沙维报道，滨海卡涅市长布莱恩·马森告诉记者：“他们配备了一把电动刀或一把金属锯——不管你喜欢怎么称呼它——他们把雷诺阿作品框架固定的螺栓切断了。”"
      },
      {
        "en": "“The police intervention and the museum’s alarms caused the robbers to rush and steal only 4 of the 12 works from the Renoir Museum.”",
        "cn": "警察的介入和博物馆的警报使得劫匪们冲了过去，只偷走了雷诺阿博物馆12件作品中的4件。”"
      },
      {
        "en": "The four stolen works were Portrait of Madame Stephen Pichon (1895), Coco Reading (1905), Madame Colonna Romano (1910) and Young Woman at the Well (1886).",
        "cn": "被盗的四幅作品分别是《斯蒂芬·皮雄夫人的肖像》（1895年）、《可可·雷丁》（1905年）、《科隆娜·罗马诺夫人》（1910年）和《井边的年轻女子》（1886年）。"
      },
      {
        "en": "The latter pair remain at large.",
        "cn": "后两人仍然在逃。"
      },
      {
        "en": "The missing art was on loan to the Renoir Museum and belongs to the Musée d’Orsay, in Paris.",
        "cn": "这幅失踪的艺术品是租借给雷诺阿博物馆的，属于巴黎的mussame d 'Orsay。"
      },
      {
        "img": "assets/covers/his-thieves-broke-into-a-french-museum-and-made-of-1.jpg",
        "cap": "The thieves made off with Young Woman at the Well (1886), which is worth about $230,000. Pierre-Auguste Renoir"
      },
      {
        "en": "Caroline d’Amat, Cagnes-sur-Mer’s deputy mayor, tells CNN ’s Jack Guy and Saskya Vandoorne that Madame Colonna Romano is worth more than $2.3 million, while Young Woman is worth about $230,000.",
        "cn": "滨海卡涅斯副市长卡洛琳·达马特告诉CNN的杰克·盖伊和萨斯基亚·凡多恩，科隆娜·罗马诺夫人的身价超过230万美元，而年轻女子的身价约为23万美元。"
      },
      {
        "en": "Before the two abandoned paintings were recovered, the mayor’s office had valued the thieves’ haul at some $10 million, reports Agence France-Presse.",
        "cn": "据法新社报道，在这两幅被遗弃的画作被找回之前，市长办公室估计窃贼的赃款约为1000万美元。"
      },
      {
        "en": "Authorities attribute the robbers’ bungle to the museum’s security system and the quick response of local police.",
        "cn": "当局将劫匪的失误归咎于博物馆的安全系统和当地警方的快速反应。"
      },
      {
        "en": "“At 5:53 a.m., just five minutes later, our municipal police were on the scene.”",
        "cn": "“早上5点53分，仅仅5分钟后，我们市警察就到了现场。”"
      },
      {
        "en": "Renoir, born in France in 1841, was one of Impressionism’s founding artists.",
        "cn": "雷诺阿1841年出生于法国，是印象派的奠基人之一。"
      },
      {
        "en": "Known for soft-focus portraits of women and girls, like Coco Reading and A Girl With a Watering Can (1876), the artist left Paris for the warmer climate of southern France at the advice of doctors treating his rheumatoid arthritis.",
        "cn": "这位艺术家以柔和的女性和女孩肖像而闻名，如《读书的可可》和《拿水壶的女孩》（1876），他听从医生的建议，离开巴黎前往气候温暖的法国南部，治疗他的风湿性关节炎。"
      },
      {
        "en": "In 1907, he and his wife, Aline, purchased and developed a hilltop estate in Cagnes-sur-Mer dotted with olive, orange and fig trees.",
        "cn": "1907年，他和妻子艾琳（Aline）在滨海卡涅（Cagnes-sur-Mer）购买并开发了一处山顶地产，其间点缀着橄榄树、橘子树和无花果树。"
      },
      {
        "en": "Though his mobility was restricted, Renoir painted there until his death, in 1919.",
        "cn": "尽管行动不便，雷诺阿仍在那里作画，直到1919年去世。"
      },
      {
        "en": "In 1960, Renoir’s son Claude sold the estate to the village of Cagnes, which turned it into a museum.",
        "cn": "1960年，雷诺阿的儿子克劳德将庄园卖给了卡涅斯村，并将其改建为博物馆。"
      },
      {
        "en": "Today, the museum displays original furniture and objects that belonged to the Impressionist, including his easel and wheelchair.",
        "cn": "今天，博物馆展示了属于印象派的原始家具和物品，包括他的画架和轮椅。"
      },
      {
        "en": "Its collection comprises photographs and letters, 13 original paintings, and about 40 sculptures.",
        "cn": "它的藏品包括照片和信件，13幅原画和大约40件雕塑。"
      },
      {
        "en": "“Attacking the Renoir Museum is attacking a part of the history and heritage of Cagnes-sur-Mer,” Masson told reporters, per BBC News ’ Michael Sheils McNamee and Tiffany Wertheimer.",
        "cn": "“攻击雷诺阿博物馆就是攻击滨海卡涅的一部分历史和遗产，”马森告诉记者，据BBC新闻的迈克尔·谢尔斯·麦克纳米和蒂凡尼·韦特海默报道。"
      },
      {
        "en": "The Renoir Museum burglary joins a growing roster of recent art thefts in Europe.",
        "cn": "雷诺阿博物馆的盗窃案是欧洲近年来不断增多的艺术品盗窃案之一。"
      },
      {
        "en": "In last year’s infamous Louvre heist, scootering criminals fled with French crown jewels.",
        "cn": "在去年臭名昭著的卢浮宫抢劫案中，犯罪分子骑着摩托车带着法国皇冠珠宝逃跑。"
      },
      {
        "en": "This spring, thieves stole $10 million worth of paintings by Renoir, Henri Matisse and Paul Cézanne from an Italian museum.",
        "cn": "今年春天，窃贼从一家意大利博物馆偷走了价值1000万美元的雷诺阿（Renoir）、亨利·马蒂斯（Henri Matisse）和保罗·卡萨姆（Paul csamzanne）的画作。"
      }
    ]
  },
  {
    "id": "his-these-adorable-critically-endangered-pygmy-rac",
    "cat": "历史",
    "title": "These Adorable, Critically Endangered Pygmy Raccoons in Cozumel Are Teaching One Another to Turn Trash Into Toy Balls",
    "titleZh": "科苏梅尔这群可爱又极度濒危的侏儒浣熊，正互相教对方把垃圾变成玩具球",
    "source": "Smithsonian Magazine · 2026-09-08",
    "date": "2026-09-08",
    "minutes": 4,
    "url": "https://www.smithsonianmag.com/smart-news/these-adorable-critically-endangered-pygmy-raccoons-in-cozumel-are-teaching-one-another-to-turn-trash-into-toy-balls-180989459/",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/his-these-adorable-critically-endangered-pygmy-rac.jpg",
    "paras": [
      {
        "en": "Fewer than 200 mature individuals roam the island in the Caribbean Sea, off the east coast of the Yucatán Peninsula.",
        "cn": "不到200只成年个体在Yucatán半岛东海岸的加勒比海岛屿上游荡。"
      },
      {
        "en": "These pint-size, critically endangered mammals—which reside only in Cozumel—are known for sifting through trash cans to scavenge for leftovers.",
        "cn": "这些只生活在科苏梅尔的极度濒危的小型哺乳动物以在垃圾桶里搜寻剩饭剩菜而闻名。"
      },
      {
        "en": "In January, however, one young raccoon was seen bypassing the food scraps, instead plucking a receipt from a waste bin.",
        "cn": "然而，今年1月，人们看到一只小浣熊绕过食物残渣，而是从垃圾箱里拿出一张收据。"
      },
      {
        "en": "She then carried the slip of paper to a bowl of water, dunked it repeatedly, and rolled it between her front paws and against the sand until it formed a compact, gritty ball.",
        "cn": "然后，她把纸条拿到一碗水里，反复浸泡，用前爪在沙子上滚来滚去，直到它变成一个致密的沙砾球。"
      },
      {
        "en": "She began batting and chasing her creation across the ground.",
        "cn": "她开始在地上击球和追逐她的创作。"
      },
      {
        "en": "Now, in a study published on 25 August in the journal Wild, researchers report that this playful habit was not an isolated quirk but a skill passed among members of a pygmy raccoon family.",
        "cn": "现在，在8月25日发表在《野生》杂志上的一项研究中，研究人员报告说，这种顽皮的习惯并不是一个孤立的怪癖，而是侏儒浣熊家族成员之间传递的一种技能。"
      },
      {
        "en": "Material culture describes physical objects and resources such as tools, clothing, toys and furniture that a group creates, uses and leaves behind to define its way of life.",
        "cn": "物质文化描述了一个群体创造、使用和留下的物理对象和资源，如工具、服装、玩具和家具，以定义其生活方式。"
      },
      {
        "en": "Members of a group learn to make or use these items by observing others.",
        "cn": "一个小组的成员通过观察其他人来学习制作或使用这些物品。"
      },
      {
        "en": "In the animal world, researchers often focus on tool use for a practical purpose, study co-author Nessie O’Neil, a biologist at Miami University in Ohio, writes on her blog.",
        "cn": "研究报告的合著者、俄亥俄州迈阿密大学的生物学家尼西·奥尼尔在她的博客上写道，在动物世界，研究人员经常把重点放在实用的工具使用上。"
      },
      {
        "en": "Chimpanzees are known to extract insects with sticks, for example, and dolphins forage with the help of sea sponges.",
        "cn": "例如，黑猩猩用棍棒提取昆虫，海豚在海绵的帮助下觅食。"
      },
      {
        "en": "Fabricating an object purely for play is exceptionally rare across the animal kingdom.",
        "cn": "在动物王国里，纯粹为了玩耍而制造物品是非常罕见的。"
      },
      {
        "en": "Pygmy raccoons, also called Cozumel raccoons, weigh between six and nine pounds, around the same as a newborn human baby.",
        "cn": "侏儒浣熊，也叫科苏梅尔浣熊，体重在6到9磅之间，和一个新生的人类婴儿差不多。"
      },
      {
        "en": "Mainland raccoons, on the other hand, typically weigh between 15 and 40 pounds.",
        "cn": "另一方面，大陆浣熊的体重通常在15到40磅之间。"
      },
      {
        "en": "Yet as O’Neil logged 64 hours of field observations, the activity transformed into a family pastime.",
        "cn": "然而，随着奥尼尔记录了64个小时的实地观察，这项活动变成了一项家庭消遣。"
      },
      {
        "en": "The pioneer raccoon’s sister was the first to learn the procedure and make her own balls.",
        "cn": "这只浣熊的妹妹是第一个学习这个过程并自己做球的。"
      },
      {
        "en": "Their mother attempted to make a ball too but quickly abandoned the task.",
        "cn": "他们的母亲也想做一个球，但很快就放弃了这项任务。"
      },
      {
        "en": "She may have quit, in part, because she had previously consumed an ounce of a margarita, which seemed to lower her dexterity, the authors write in the paper.",
        "cn": "作者在论文中写道，她戒烟的部分原因可能是她之前喝过一盎司的玛格丽塔酒，这似乎降低了她的灵活性。"
      },
      {
        "en": "The team watched the siblings play “soccer” with each other and their mother, and in one instance, with two juvenile Cozumel dwarf coatis.",
        "cn": "研究小组观察了这对兄弟姐妹和它们的母亲一起踢“足球”，有一次，他们还和两只科苏梅尔矮长鼻浣熊幼崽一起踢足球。"
      },
      {
        "en": "Study co-author Michelle Szydlowski, an anthrozoologist at Miami University, notes that the ball-building behavior makes sense with raccoon biology.",
        "cn": "该研究的合著者、迈阿密大学的人类动物学家米歇尔·希德洛夫斯基（Michelle Szydlowski）指出，浣熊造球的行为在生物学上是有道理的。"
      },
      {
        "en": "“It shouldn’t be surprising that raccoons are where we’re seeing this, just because they’re so tactile; they see with their hands,” she tells New Scientist ’s Matt von Hippel.",
        "cn": "“浣熊出现在我们看到的地方并不奇怪，因为它们有很强的触觉；他们用手看东西，”她告诉《新科学家》的马特·冯·希佩尔。"
      },
      {
        "en": "This jolly discovery has a poignant undertone.",
        "cn": "这一令人愉快的发现暗含着辛酸的意味。"
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
