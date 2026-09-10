/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 60 篇，英文正文来自公开 RSS 的真实报道原文，未做改写；
 * 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：Sky Sports / Smithsonian Magazine / CBS News / ELLE / Variety / Vogue / Harper's Bazaar / Cosmopolitan / Who What Wear / HistoryExtra / ABC News
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
      },
      {
        "img": "assets/covers/ft-premier-league-fixtures-bumper-festive-period--2.jpg",
        "cap": ""
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
        "img": "assets/covers/his-thieves-broke-into-a-french-museum-and-made-of-1.jpg",
        "cap": "The thieves made off with Young Woman at the Well (1886), which is worth about $230,000. Pierre-Auguste Renoir"
      },
      {
        "en": "The missing art was on loan to the Renoir Museum and belongs to the Musée d’Orsay, in Paris.",
        "cn": "这幅失踪的艺术品是租借给雷诺阿博物馆的，属于巴黎的mussame d 'Orsay。"
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
  },
  {
    "id": "pol-trump-jokes-about-trying-to-redo-huge-luka-don",
    "cat": "时政",
    "title": "Trump jokes about trying to \"redo\" huge Luka Dončić trade in Dallas speech",
    "titleZh": "特朗普在达拉斯演讲中开玩笑，说想“重做”东契奇那笔大交易",
    "source": "CBS News · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://www.cbsnews.com/news/trump-luka-doncic-trade-redo-dallas-speech/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/pol-trump-jokes-about-trying-to-redo-huge-luka-don.jpg",
    "paras": [
      {
        "en": "President Trump's rally-style speech at the Republican National Committee midterm convention touched on oil, Iran, immigration, the economy — and the polarizing NBA trade that sent superstar guard Luka Dončić from the Dallas Mavericks to the Los Angeles Lakers last year.",
        "cn": "特朗普总统在共和党全国委员会中期大会上的集会式演讲涉及石油、伊朗、移民、经济，以及去年将超级明星后卫Luka Dončić从达拉斯小牛队送到洛杉矶湖人队的两极分化NBA交易。"
      },
      {
        "en": "\"I must tell you, I don't understand the trade.",
        "cn": "“我必须告诉你，我不明白这笔交易。"
      },
      {
        "en": "That trade is not good,\" he said late Wednesday at the American Airlines Center, the Dallas Mavericks' home arena.",
        "cn": "这种交易并不好，”他在周三晚些时候在达拉斯小牛队的主场美国航空中心说道。"
      },
      {
        "en": "The president continued: \"It's not going to go down as the greatest trade in the history of sports.",
        "cn": "总统继续说道：“它不会成为体育史上最伟大的贸易。"
      },
      {
        "en": "It might go down as the worst trade in the history of sports,\" before conceding that the Boston Red Sox's decision to ship pitcher Babe Ruth to the New York Yankees more than a century ago likely still deserved that dubious distinction.",
        "cn": "“这笔交易可能会被载入体育史册，成为最糟糕的交易，”但他随后承认，一个多世纪前波士顿红袜队将投手贝比·鲁斯交易到纽约洋基队的决定，可能仍然配得上这个令人质疑的“殊荣”。"
      },
      {
        "en": "\"Maybe we could redo that trade.",
        "cn": "“或许我们可以重新进行那笔交易。”"
      },
      {
        "en": "But that one, I didn't quite get,\" Mr. Trump said.",
        "cn": "但是那个，我没有完全理解，”特朗普说。"
      },
      {
        "en": "He then resumed talking about U.S. oil production and Iran.",
        "cn": "然后，他继续谈论美国的石油生产和伊朗。"
      },
      {
        "en": "In a bombshell midseason transaction early last year, the Mavericks sent Dončić and two other players to the Lakers, principally in exchange for Anthony Davis and a 2029 first-round draft pick.",
        "cn": "在去年初的一次重磅炸弹赛季中期交易中，小牛队将Dončić和其他两名球员送到了湖人队，主要是为了换取安东尼·戴维斯和2029年的首轮选秀权。"
      },
      {
        "en": "The trade drew consternation from many Dallas fans who were critical of the team's decision to trade away the now-27-year-old face of the franchise.",
        "cn": "这笔交易引起了许多达拉斯球迷的惊愕，他们批评球队决定放弃现年27岁的特许经营权。"
      },
      {
        "img": "assets/covers/pol-trump-jokes-about-trying-to-redo-huge-luka-don-1.jpg",
        "cap": "Los Angeles Lakers guard Luka Dončić, right, prepares to shoot against Chicago Bulls forward Jalen Smith, left"
      },
      {
        "en": "The Mavericks are owned primarily by the family of Miriam Adelson, a GOP megadonor who controls the Las Vegas Sands casino company and is close with Mr. Trump.",
        "cn": "小牛队主要由Miriam Adelson家族拥有，Miriam Adelson是共和党巨头，控制着拉斯维加斯金沙赌场公司，与特朗普先生关系密切。"
      },
      {
        "en": "It's not the first time he has used the presidential bully pulpit to weigh in on a hot-button sports debate.",
        "cn": "这不是他第一次利用总统欺凌讲坛参与热门体育辩论。"
      },
      {
        "en": "He has repeatedly criticized the NFL's new rules for kickoffs, and in a Truth Social post last year, he lamented the fact that quarterback Shedeur Sanders wasn't selected in the first few rounds of the NFL draft.",
        "cn": "他一再批评NFL的新开球规则，在去年的Truth Social帖子中，他感叹四分卫Shedeur Sanders没有在NFL选秀的前几轮中被选中。"
      },
      {
        "en": "\"What is wrong with NFL owners, are they STUPID?\" the president wrote.",
        "cn": "“NFL老板有什么问题，他们愚蠢吗？”总统写道。"
      },
      {
        "en": "\"He should be 'picked' IMMEDIATELY by a team that wants to WIN.\" (Sanders, the son of former NFL player Deion Sanders, was picked up by the Cleveland Browns later in the draft.)",
        "cn": "“他应该立即被一支想要获胜的球队'挑选'。“ （桑德斯是前NFL球员Deion Sanders的儿子，后来在选秀中被克利夫兰布朗队选中。）"
      },
      {
        "en": "Over the summer, Mr. Trump asked FIFA to review its one-match suspension of star U.S. forward Folarin Balogun during the World Cup.",
        "cn": "今年夏天，特朗普要求国际足联审查其在世界杯期间对美国前锋Folarin Balogun的一场比赛停赛。"
      },
      {
        "en": "The international soccer organization reversed the red card suspension, though Mr. Trump said he didn't order FIFA to do so.",
        "cn": "国际足球组织撤销了红牌停赛，尽管特朗普表示他没有命令国际足联这样做。"
      }
    ]
  },
  {
    "id": "pol-trump-pitches-5-000-checks-but-only-if-gop-win",
    "cat": "时政",
    "title": "Trump pitches $5,000 checks, but only if GOP wins House and Senate",
    "titleZh": "特朗普承诺发 5000 美元支票，前提是共和党拿下参众两院",
    "source": "CBS News · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.cbsnews.com/news/trump-dividends-5000-checks-rnc-midterm-convention/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/pol-trump-pitches-5-000-checks-but-only-if-gop-win.jpg",
    "paras": [
      {
        "en": "President Trump vowed Wednesday to send a $5,000 \"dividend\" to every American citizen after the midterms, but only if Republicans hold onto control of the House and Senate.",
        "cn": "特朗普总统周三发誓要在中期选举后向每个美国公民发放5000 $的“红利”，但前提是共和党人继续控制众议院和参议院。"
      },
      {
        "en": "The announcement came almost an hour into Mr. Trump's speech to the Republican National Committee's first-of-its-kind midterm convention in Dallas, as he seeks to rally Republican voters and fight significant political headwinds in the November elections.",
        "cn": "特朗普在共和党全国委员会(Republican National Committee)首次在达拉斯举行的中期大会上发表讲话近一个小时后宣布了这一消息，他试图在11月的选举中团结共和党选民，并与重大的政治阻力作斗争。"
      },
      {
        "en": "The president did not offer details on how the payments — which he dubbed \"Trump Dividends\" — would work, including whether he plans to ask Congress to authorize the checks.",
        "cn": "总统没有提供有关付款（他称之为“特朗普股息”）如何运作的细节，包括他是否计划要求国会授权支票。"
      },
      {
        "en": "He has floated the idea of cutting checks to U.S. citizens in the past, proposing $2,000 dividends funded by tariffs last year.",
        "cn": "他过去曾提出过削减美国公民支票的想法，去年提出了由关税资助的2,000 $股息。"
      },
      {
        "en": "Mr. Trump argued the payments would be a consequence of the country's \"tremendous economic success,\" and suggested they could be funded partially by his administration's tariffs on foreign goods.",
        "cn": "特朗普认为，这些付款将是该国“巨大经济成功”的结果，并暗示这些付款可以部分由其政府对外国商品征收的关税提供资金。"
      },
      {
        "en": "The U.S. has brought in just under $500 billion in tariff and excise tax revenue since the start of last year, according to the Bipartisan Policy Center.",
        "cn": "根据两党政策中心的数据，自去年年初以来，美国的关税和消费税收入略低于5000亿美元。"
      },
      {
        "en": "More than $100 billion has been refunded due to a Supreme Court ruling earlier this year that struck down many of the administration's tariffs.",
        "cn": "由于最高法院今年早些时候的一项裁决取消了政府的许多关税，已退还了超过1000亿美元$。"
      },
      {
        "en": "Sending out $5,000 checks to all of America's approximately 245 million adult citizens could cost upwards of $1 trillion.",
        "cn": "向美国所有约2.45亿成年公民发送5,000美元的支票可能花费超过1万亿美元。"
      },
      {
        "en": "There is some precedent for broad-based payments to U.S. households.",
        "cn": "向美国家庭提供基础广泛的支付有一些先例。"
      },
      {
        "en": "In 2020 and 2021, Congress allowed the Biden and first Trump administrations to send out several rounds of checks to American households in an effort to stimulate the COVID-ravaged economy.",
        "cn": "在2020年和2021年，国会允许拜登和第一任特朗普政府向美国家庭发放几轮支票，以刺激受新冠病毒蹂躏的经济。"
      },
      {
        "en": "But any economic stimulus program runs the risk of causing inflation to spike, and many economists believe the pandemic-era stimulus was at least partially responsible for the rise in consumer prices that ensued over the following years.",
        "cn": "但任何经济刺激计划都有导致通货膨胀飙升的风险，许多经济学家认为，疫情时期的刺激措施至少部分导致了随后几年消费价格的上涨。"
      },
      {
        "en": "During Wednesday's speech, Mr. Trump likened the payments to his Trump Account child investment funds, which were authorized by Congress, and last year's \"warrior dividend\" bonuses to U.S. service members, which were funded through a military housing supplement approved by lawmakers.",
        "cn": "在周三的演讲中，特朗普将这些款项比作国会授权的特朗普账户儿童投资基金，以及去年向美国军人提供的“勇士红利”奖金，这些奖金是通过立法者批准的军事住房补贴提供资金的。"
      },
      {
        "en": "Mr. Trump is seeking to rally Republicans ahead of the midterms, vowing during Wednesday's speech to campaign for vulnerable GOP lawmakers, and urging voters to treat the November elections as a referendum on his presidency.",
        "cn": "特朗普正在寻求在中期选举之前召集共和党人，在周三的演讲中誓言要为弱势的共和党议员竞选，并敦促选民将11月的选举视为对他的总统职位的公投。"
      },
      {
        "en": "\"I'm asking you to pretend that I'm on the ballot …",
        "cn": "“我要你假装我在选票上……"
      },
      {
        "en": "just one more time,\" Mr. Trump said, repeating a line he has used several times in recent weeks.",
        "cn": "只是再一次，”特朗普先生说，重复了他最近几周多次使用的一句话。"
      },
      {
        "en": "But Republicans are facing down voters' historical tendency to reject the party that controls the White House in the midterms.",
        "cn": "但共和党人正在面对选民在中期选举中拒绝控制白宫的政党的历史倾向。"
      },
      {
        "en": "Mr. Trump's own lagging approval rating could also be a drag on the party, with Democrats seeking to capitalize on the Iran war's unpopularity and voters' unhappiness with the Trump administration's handling of the economy.",
        "cn": "特朗普自己落后的支持率也可能拖累该党，民主党人试图利用伊朗战争的不受欢迎以及选民对特朗普政府处理经济的不满。"
      },
      {
        "en": "Mr. Trump acknowledged that historical trend, saying, \"the midterms are not supposed to be won by the sitting president,\" but \"we're going to change that.\"",
        "cn": "特朗普承认了这一历史趋势，他说，“中期选举不应该由现任总统赢得”，但“我们将改变这种状况”。"
      },
      {
        "en": "He told the audience he views about 35 House and Senate districts as especially crucial, and vowed to \"go to every one of those states,\" holding both in-person rallies and telephone town halls.",
        "cn": "他告诉听众，他认为大约35个众议院和参议院选区特别重要，并发誓要“去每一个州”，同时举行面对面的集会和电话市政厅。"
      },
      {
        "en": "Many candidates likely also want access to the president's nine-figure super PAC war chest.",
        "cn": "许多候选人可能也希望获得总统九位数的超级PAC战争基金。"
      },
      {
        "en": "The president hit many of his familiar rally points during the speech, touting his record on border security, last year's tax legislation, his tariff-heavy approach to trade and his White House renovation kick — including his planned ballroom.",
        "cn": "总统在演讲中击中了他许多熟悉的集会点，吹嘘他在边境安全方面的记录，去年的税收立法，他的关税沉重的贸易方式以及他的白宫翻新计划—包括他计划的宴会厅。"
      }
    ]
  },
  {
    "id": "pol-federal-judge-backs-missouri-s-new-house-map-a",
    "cat": "时政",
    "title": "Federal judge backs Missouri's new House map after Supreme Court rebuffs case",
    "titleZh": "在最高法院驳回案件后，联邦法官支持密苏里州新的众议院地图",
    "source": "CBS News · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.cbsnews.com/news/supreme-court-missouri-new-house-map-republicans/",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/pol-federal-judge-backs-missouri-s-new-house-map-a.jpg",
    "paras": [
      {
        "en": "A federal judge ruled Tuesday that Missouri should use a new congressional map that favors Republicans for now, hours after the U.S. Supreme Court left in place a ruling from the state's highest court directing Missouri to use an older map.",
        "cn": "一名联邦法官周二裁定，密苏里州应该使用目前有利于共和党人的新国会地图，此前美国最高法院在该州最高法院的裁决中指示密苏里州使用旧地图。"
      },
      {
        "en": "The Supreme Court rebuffed an appeal from Missouri officials who wanted to use new congressional districts backed by President Trump in the November election, marking a defeat for Republicans who had hoped the new map could help them hold on to their slim House majority.",
        "cn": "最高法院驳回了密苏里州官员的上诉，他们希望在11月的选举中使用特朗普总统支持的新国会选区，这标志着共和党人的失败，他们希望新地图可以帮助他们保持微弱的众议院多数席位。"
      },
      {
        "en": "The justices let stand a decision by Missouri's top court, which said the new districts cannot be used in the November elections because they were superseded by a citizen petition demanding a statewide vote.",
        "cn": "法官们接受了密苏里州最高法院的决定，该法院表示，新选区不能在11月的选举中使用，因为它们被公民请愿书所取代，公民请愿书要求在全州范围内进行投票。"
      },
      {
        "en": "But shortly after, U.S. District Judge Stephen Clark issued a temporary restraining order in a separate challenge to Missouri's Supreme Court decision, writing that the plaintiffs faced \"irreparable harm\" otherwise because \"many Missouri voters would have to cast their general-election votes for candidates whom they had no role in nominating.\"",
        "cn": "但此后不久，美国地区法官斯蒂芬·克拉克（Stephen Clark）在对密苏里州最高法院裁决的单独质疑中发布了一项临时限制令，他写道，原告面临“不可弥补的伤害”，否则因为“许多密苏里州选民将不得不投票给他们在提名中没有角色的候选人。”"
      },
      {
        "en": "Clark's decision was appealed late Tuesday by People not Politicians, a Missouri group against the redistricting effort.",
        "cn": "周二晚些时候，密苏里州的一个团体People not Politicians对克拉克的决定提出上诉，反对重新划分选区的努力。"
      },
      {
        "en": "On Wednesday, however, the U.S. Court of Appeals for the 8th Circuit rejected the request for a temporary stay of Clark's ruling, writing that the appeals court either lacks \"jurisdiction over the appeal or, based on the briefing we have so far, the stay factors have not been met.\"",
        "cn": "然而，周三，美国第八巡回上诉法院驳回了暂停克拉克裁决的请求，写道，上诉法院要么缺乏“对上诉的管辖权，要么根据我们迄今为止的简报，暂停因素尚未得到满足。”"
      },
      {
        "en": "Immediately following the 8th Circuit Court's ruling, People not Politicians appealed the case to the U.S. Supreme Court.",
        "cn": "在第八巡回法院作出裁决后，People not Politicians立即向美国最高法院提出上诉。"
      },
      {
        "en": "Justice Brett Kavanaugh has requested a response from the plaintiffs in the lawsuit — the proponents of the new redistricting map — by Thursday morning.",
        "cn": "大法官布雷特·卡瓦诺（Brett Kavanaugh）已要求原告在周四上午之前做出回应，原告是新重新划分地图的支持者。"
      },
      {
        "en": "Meanwhile, Clark late Wednesday also rejected an emergency request to issue a stay of his temporary restraining order that reinstated the new map.",
        "cn": "与此同时，克拉克周三晚些时候还拒绝了紧急请求，要求暂停恢复新地图的临时限制令。"
      },
      {
        "en": "His decision has added further confusion about which boundaries will be used in November.",
        "cn": "他的决定进一步混淆了11月将使用哪些边界。"
      },
      {
        "en": "The new House maps, passed by the state legislature last year, would dramatically redraw longtime Democratic Rep. Emanuel Cleaver's Kansas City-area district, making it GOP-leaning.",
        "cn": "去年由州议会通过的新众议院地图将大幅重绘长期的民主党众议员，伊曼纽尔·克利弗（Emanuel Cleaver）位于堪萨斯城（Kansas City）地区，倾向于共和党。"
      },
      {
        "en": "Missouri's new districts were used in the August primaries.",
        "cn": "密苏里州的新区被用于8月初选。"
      },
      {
        "en": "But the Missouri Supreme Court ruled last week that the state must revert to districts adopted after the last census.",
        "cn": "但密苏里州最高法院上周裁定，该州必须恢复上次人口普查后采用的地区。"
      },
      {
        "en": "Republican state Attorney General Catherine Hanaway, who appealed to the U.S. Supreme Court, had argued it would violate federal rights to switch districts for voters between the primary and general elections.",
        "cn": "共和党州检察长凯瑟琳·哈纳韦（Catherine Hanaway）向美国最高法院提出上诉，称在初选和大选之间切换选区的联邦权利受到侵犯。"
      },
      {
        "en": "She also said it would cause confusion.",
        "cn": "她还说这会造成混乱。"
      },
      {
        "en": "\"A federal-election-administration disaster is unfolding in Missouri,\" Hanaway wrote in an emergency application for the U.S. Supreme Court to put the ruling on hold, warning it could lead to \"unprecedented chaos\" and render the primary \"utterly pointless.\"",
        "cn": "“密苏里州正在发生联邦选举行政灾难，”Hanaway在一份紧急申请中写道，要求美国最高法院搁置裁决，并警告说，这可能导致“前所未有的混乱”，并使主要的“毫无意义”。"
      },
      {
        "en": "She continued: \"Looking forwards, the State is genuinely unsure whether it can switch its governing congressional map in time to run a timely federal election.\"",
        "cn": "她继续说道：“展望未来，该州真的不确定是否能及时改变其执政的国会地图，以便及时举行联邦选举。”"
      },
      {
        "en": "Richard Von Glahn, who sued over the new maps, urged the U.S. Supreme Court not to intervene, writing that the state \"waited as long as possible to manufacture the present dispute over Missouri's congressional districting map\" by not moving to reject the petition for a referendum until last month.",
        "cn": "对新地图提起诉讼的理查德·冯·格拉恩（Richard Von Glahn）敦促美国最高法院不要干预，他写道，该州“尽可能长时间地等待制造目前关于密苏里州国会选区地图的争议”，直到上个月才采取行动拒绝公投请愿书。"
      },
      {
        "en": "Hanaway's request for the U.S. Supreme Court to step in was rejected by Kavanaugh on Tuesday.",
        "cn": "Hanaway要求美国最高法院介入的请求周二被Kavanaugh拒绝。"
      }
    ]
  },
  {
    "id": "pol-fetterman-appears-at-rnc-midterm-convention-in",
    "cat": "时政",
    "title": "Fetterman appears at RNC midterm convention in surprise video",
    "titleZh": "费特曼出现在共和党全国委员会中期会议上",
    "source": "CBS News · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://www.cbsnews.com/news/fetterman-video-rnc-republican-gop-midterm-convention-video-trump-steel-mccormick/",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/pol-fetterman-appears-at-rnc-midterm-convention-in.jpg",
    "paras": [
      {
        "en": "John Fetterman appeared in a surprise video at the Republican Party's midterm convention on Wednesday, as he becomes increasingly isolated from his own party.",
        "cn": "约翰·费特曼（John Fetterman）周三在共和党中期大会上出现了一段令人惊讶的视频，因为他越来越孤立于自己的政党。"
      },
      {
        "en": "\"Why am I here talking to you today?",
        "cn": "“我今天在这里跟你说话干什么？"
      },
      {
        "en": "Because, well, I'm a common-sense Democrat,\" the Pennsylvania senator said in a one-minute prerecorded video introducing GOP Sen. Dave McCormick of Pennsylvania.",
        "cn": "因为，好吧，我是一个常识性的民主党人，”这位宾夕法尼亚州参议员在介绍共和党参议员的一分钟预先录制的视频中说，宾夕法尼亚州的Dave McCormick。"
      },
      {
        "en": "\"I'm always going to stand with America.",
        "cn": "“我将永远与美国站在一起。"
      },
      {
        "en": "I'm always going to reject the extremes in socialism and that anti-American way of life.\"",
        "cn": "我总是会拒绝极端的社会主义和反美生活方式。”"
      },
      {
        "en": "Standing in front of Western Pennsylvania's Mon Valley Works steel mill, Fetterman said, \"we'll work with President Trump to fight and defend the steel way of life right here in the Steel Valley.\"",
        "cn": "Fetterman站在宾夕法尼亚州西部的Mon Valley Works钢铁厂前说：“我们将与特朗普总统合作，在钢铁谷与钢铁生活方式进行斗争和捍卫。”"
      },
      {
        "en": "\"How great is John Fetterman?\" McCormick said after taking the stage, praising the Democrat for his \"friendship\" and \"courage.\"",
        "cn": "“John Fetterman有多棒？“麦考密克在登台后说，称赞民主党人的“友谊”和“勇气”。"
      },
      {
        "en": "In a statement provided to CBS News after the video aired, Fetterman said that he was \"a lifelong Democrat who votes overwhelmingly with my party — and should the Senate flip in November, I will still be the 51st vote that I ran on.\"",
        "cn": "在视频播出后向哥伦比亚广播公司新闻提供的一份声明中，费特曼说，他是“终身民主党人，以压倒性优势投票支持我的政党—如果参议院在11月份翻转，我仍将是我参加的第51次投票。"
      },
      {
        "img": "assets/covers/pol-fetterman-appears-at-rnc-midterm-convention-in-1.jpg",
        "cap": "Sen. John Fetterman, a Pennsylvania Democrat, delivers a video message during the Republican National Committe"
      },
      {
        "en": "Mr. Trump cleared the way last year for U.S. Steel to be acquired by Japan-based Nippon Steel.",
        "cn": "特朗普去年为美国钢铁(U.S. Steel)被日本新日铁(Nippon Steel)收购扫清了道路。"
      },
      {
        "en": "The president and members of both parties, including Fetterman, had initially opposed Nippon's efforts to buy the iconic Pittsburgh-based steelmaker, but Mr. Trump ultimately signed off on an agreement that he argued would result in tens of billions in new investments in U.S. Steel and grant the federal government a \"golden share\" in the company.",
        "cn": "总统和包括Fetterman在内的双方成员最初反对日本收购这家总部位于匹兹堡的标志性钢铁制造商的努力，但特朗普最终签署了一项协议，他认为该协议将导致对美国钢铁公司进行数百亿美元的新投资，并授予联邦政府该公司的“黄金份额”。"
      },
      {
        "en": "Fetterman has, at times, distanced himself from the Democrats, backing Mr. Trump's strategy in Iran and breaking with congressional Democrats in last year's government shutdown fight.",
        "cn": "费特曼有时会与民主党人保持距离，支持特朗普在伊朗问题上的战略，并在去年的政府停摆斗争中与国会民主党人决裂。"
      },
      {
        "en": "After Mr. Trump won the 2024 election, Fetterman became the first Senate Democrat to meet with the incoming president at his Palm Beach residence.",
        "cn": "在特朗普赢得2024年大选后，费特曼成为第一位在棕榈滩住所会见新任总统的参议院民主党人。"
      },
      {
        "en": "\"I think it's pretty reasonable that if the president would like to have a conversation — or invite someone to have a conversation — to have it.",
        "cn": "“我认为，如果总统想进行对话—或邀请某人进行对话—进行对话是非常合理的。"
      },
      {
        "en": "And no one is my gatekeeper,\" Fetterman told CBS News in January 2025.",
        "cn": "没有人是我的守门人，”Fetterman在2025年1月告诉哥伦比亚广播公司新闻。"
      },
      {
        "en": "He has denied that he is considering switching parties.",
        "cn": "他否认他正在考虑换党派。"
      },
      {
        "en": "In an op-ed in May, he said, \"I'd be a terrible Republican who still votes overwhelmingly with Democrats.\" But he said his red line is if the Democratic Party becomes \"the anti-Israel party.\"",
        "cn": "在5月的一篇专栏文章中，他说：“我将是一个糟糕的共和党人，仍然以压倒性的优势投票给民主党人。但他表示，他的红线是民主党是否成为“反以色列政党”。"
      },
      {
        "en": "If Fetterman were to switch parties, it would be harder for Democrats to reclaim the Senate majority.",
        "cn": "如果费特曼转换政党，民主党人将更难夺回参议院多数席位。"
      },
      {
        "en": "Democrats currently need to flip four seats in November to win control.",
        "cn": "民主党目前需要在11月份翻转四个席位才能赢得控制权。"
      }
    ]
  },
  {
    "id": "pol-rhode-island-governor-projected-to-lose-democr",
    "cat": "时政",
    "title": "Rhode Island governor projected to lose Democratic primary to former CVS executive",
    "titleZh": "罗德岛州州长预计将在民主党初选中输给前 CVS 高管",
    "source": "CBS News · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://www.cbsnews.com/news/rhode-island-governor-race-results-helena-foulkes-dan-mckee/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/pol-rhode-island-governor-projected-to-lose-democr.jpg",
    "paras": [
      {
        "en": "Former CVS executive Helena Foulkes defeated Rhode Island Gov. Dan McKee in the Democratic primary on Wednesday night, The Associated Press projects.",
        "cn": "前CVS高管海伦娜·福克斯击败了罗德岛州州长，Dan McKee将在周三晚上的民主党初选中胜出，美联社报道。"
      },
      {
        "en": "With roughly half of all votes counted at around 8:30 p.m. ET, Foulkes led McKee 62.3% to 37.7%.",
        "cn": "美国东部时间晚上8点30分左右，大约一半的选票已经清点完毕，福克斯以62.3%对37.7%领先麦基。"
      },
      {
        "en": "Rhode Island is a reliably Democratic state, and hasn't elected a Republican statewide since 2006, making Foulkes the favorite to win in November.",
        "cn": "罗德岛州是一个可靠的民主党州，自2006年以来，该州还没有选出过共和党人，这使得福克斯最有可能在11月获胜。"
      },
      {
        "en": "Aaron Guckian and Elaine Pelino are facing off for the Republican nomination.",
        "cn": "亚伦·古吉安和伊莱恩·佩利诺将为共和党提名展开竞争。"
      },
      {
        "en": "McKee is the first sitting governor anywhere in the country to lose a primary in eight years.",
        "cn": "麦基是八年来首位在初选中失利的在任州长。"
      },
      {
        "en": "McKee, previously the lieutenant governor, was elevated to the top job after former Gov. Gina Raimondo became commerce secretary during the Biden administration.",
        "cn": "麦基之前是副州长，在前任州长之后被提升为最高职位，吉娜·雷蒙多在拜登政府期间担任商务部长。"
      },
      {
        "en": "He was elected for a full term in 2022 and has served as governor for five years.",
        "cn": "他于2022年当选，并担任了5年的州长。"
      },
      {
        "en": "McKee's first full term has been plagued by the closure of the Washington Bridge, which was shut down in December 2023 after broken anchor rods were discovered.",
        "cn": "麦基的第一个完整任期一直受到华盛顿大桥关闭的困扰，该大桥于2023年12月因发现锚杆断裂而关闭。"
      },
      {
        "en": "Rebuilding the bridge — a crucial link between the state capital of Providence and its eastern suburbs — is now estimated to cost $427 million and is scheduled to be completed in November 2028.",
        "cn": "这座连接州首府普罗维登斯和东部郊区的桥梁目前估计耗资4.27亿美元，计划于2028年11月完工。"
      },
      {
        "en": "The original price tag for the project was $368 million and was supposed to be finished this past August.",
        "cn": "该项目最初的价格为3.68亿美元，原定于今年8月完工。"
      },
      {
        "en": "Foulkes has never served in public office, but she has political ties.",
        "cn": "福克斯从未担任过公职，但她有政治关系。"
      },
      {
        "en": "Her uncle and grandfather, Chris and Thomas Dodd, were both senators, and she was endorsed by former House Speaker Nancy Pelosi, who was her mother's college roommate.",
        "cn": "她的叔叔和祖父克里斯·多德（Chris Dodd）和托马斯·多德（Thomas Dodd）都是参议员，她得到了前众议院议长南希·佩洛西（Nancy Pelosi）的支持，佩洛西是她母亲的大学室友。"
      },
      {
        "en": "She ran for governor in 2022 but lost to McKee in the Democratic primary.",
        "cn": "她在2022年竞选州长，但在民主党初选中输给了麦基。"
      },
      {
        "en": "The former CVS pharmacy executive has campaigned on housing and affordability, some of the most resonant issues in the midterm elections.",
        "cn": "这位前CVS制药公司高管的竞选主题是住房和可负担性，这是中期选举中最容易引起共鸣的一些问题。"
      },
      {
        "en": "She has cited her 25-year career as evidence that she can make healthcare more accessible.",
        "cn": "她以自己25年的职业生涯为例，证明她可以让医疗服务更容易获得。"
      },
      {
        "en": "Foulkes has pitched raising Medicaid reimbursement rates, and she's proposed a tax on millionaires, which would allot money to build over 20,000 homes by adding an additional 3% tax on incomes over $1 million.",
        "cn": "福克斯提议提高医疗补助报销率，她还提议对百万富翁征税，这将通过对超过100万美元的收入额外征收3%的税来分配建造2万多套住房的资金。"
      }
    ]
  },
  {
    "id": "pol-u-s-destroys-another-alleged-drug-boat-as-rubi",
    "cat": "时政",
    "title": "U.S. destroys another alleged drug boat as Rubio defends deadly strikes",
    "titleZh": "美国再摧毁一艘疑似运毒船，卢比奥为致命打击辩护",
    "source": "CBS News · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.cbsnews.com/news/us-destroys-alleged-drug-boat-rubio-defends-deadly-strikes/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/pol-u-s-destroys-another-alleged-drug-boat-as-rubi.jpg",
    "paras": [
      {
        "en": "Secretary of State Marco Rubio defended controversial strikes on suspected drug-trafficking boats during a visit to Ecuador on Wednesday, arguing Latin American cartels would \"eat these countries alive\" if left unchecked.",
        "cn": "美国国务卿卢比奥星期三在访问厄瓜多尔期间为有争议的打击涉嫌贩毒船只的行动进行了辩护，他说，如果不加以控制，拉美贩毒集团将“把这些国家活活吃掉”。"
      },
      {
        "en": "Hours later, the U.S. military confirmed it conducted another deadly strike in the Caribbean Sea.",
        "cn": "几小时后，美国军方证实在加勒比海进行了另一次致命袭击。"
      },
      {
        "en": "Hailing a new generation of conservative leaders emerging across the region who are allied with President Trump, Rubio said Washington was finding partners willing to be \"very aggressive\" against criminal groups.",
        "cn": "卢比奥称赞该地区新一代与特朗普总统结盟的保守派领导人，他说，华盛顿正在寻找愿意对犯罪集团“非常积极”的合作伙伴。"
      },
      {
        "en": "Since Mr. Trump returned to power, the U.S. has conducted airstrikes against vessels plying known trafficking routes in the Caribbean and eastern Pacific.",
        "cn": "自特朗普重新掌权以来，美国对在加勒比海和东太平洋航行的已知贩运路线的船只进行了空袭。"
      },
      {
        "en": "According to Pentagon figures, the operations have killed more than 200 people.",
        "cn": "根据五角大楼的数据，这些行动已经造成200多人死亡。"
      },
      {
        "en": "Rights groups, fishermen and their relatives have questioned the campaign, alleging vessels were targeted without sufficient evidence of links to trafficking.",
        "cn": "人权组织、渔民及其亲属对这一行动提出质疑，声称船只在没有充分证据证明与贩运有关的情况下就成为目标。"
      },
      {
        "en": "Experts have also questioned whether they do anything to curb the flow of cocaine and other drugs to the United States -- the world's largest consumer.",
        "cn": "专家们还质疑他们是否采取了任何措施来遏制可卡因和其他毒品流入美国——世界上最大的消费国。"
      },
      {
        "en": "Speaking after talks with President Daniel Noboa in Quito, Rubio said the operations would continue.",
        "cn": "卢比奥在基多与总统丹尼尔·诺波亚会谈后表示，行动将继续进行。"
      },
      {
        "en": "\"If you don't confront these groups, they will eat these countries alive,\" he warned.",
        "cn": "他警告说：“如果你不对抗这些组织，它们会把这些国家活活吃掉。”"
      },
      {
        "en": "\"It's like a cancer that continues to grow until you don't literally have a state anymore.\"",
        "cn": "“这就像一种癌症，它会继续生长，直到你不再有一个真正的州。”"
      },
      {
        "en": "\"I'm glad that we have leaders in this region that are serious about going after these groups, because if we didn't, we would have failed country after failed country.\"",
        "cn": "“我很高兴我们这个地区的领导人认真对待这些组织，因为如果我们不这样做，我们就会让一个又一个失败的国家失败。”"
      },
      {
        "en": "In recent weeks there have been signs of a shift in tactics, with joint U.S.-Ecuador patrols removing crews from at least six boats before sinking the vessels.",
        "cn": "最近几周有迹象表明，美国和厄瓜多尔的联合巡逻队在击沉船只之前，已经将至少六艘船上的船员撤离。"
      },
      {
        "en": "Last week, the U.S. military intercepted and sank a vessel that was allegedly being used to support at-sea drug trafficking by the Ecuadorian criminal organization Los Choneros.",
        "cn": "上周，美国军方拦截并击沉了一艘据称被厄瓜多尔犯罪组织洛斯Choneros用来支持海上贩毒的船只。"
      },
      {
        "en": "It came after a similar operation that destroyed another vessel linked to the gang, one of Ecuador's main drug trafficking and extortion groups.",
        "cn": "此前，一项类似的行动摧毁了另一艘与该团伙有关的船只，该团伙是厄瓜多尔主要的毒品贩运和勒索组织之一。"
      },
      {
        "en": "Rubio said decisions were made case by case and depended on the threat posed by a vessel, its location and local laws.",
        "cn": "卢比奥说，决定是根据具体情况做出的，取决于船只构成的威胁、位置和当地法律。"
      },
      {
        "en": "\"When you're conducting a joint operation in territorial waters, you have to reach an understanding as to how those operations are going to occur,\" he said.",
        "cn": "“当你在领海进行联合行动时，你必须就这些行动将如何进行达成谅解，”他说。"
      },
      {
        "en": "Asked whether vessels would continue to be destroyed, Rubio replied: \"Well again, it depends, and we still blow up ships.\"",
        "cn": "当被问及船只是否会继续被摧毁时，卢比奥回答说：“好吧，这要看情况，我们仍然会炸毁船只。”"
      },
      {
        "en": "Later Wednesday, the U.S. military's Southern Command (SOUTHCOM) said American forces executed a \"lethal kinetic strike on a go-fast vessel operating along established narco-trafficking routes in the Caribbean.\"",
        "cn": "星期三晚些时候，美军南方司令部说，美军“对一艘在加勒比地区沿既定毒品走私路线行驶的快速船只进行了致命的动力打击”。"
      },
      {
        "en": "The operation \"killed three narco-terrorists,\" SOUTHCOM posted on X along with black-and-white footage of a ship exploding in the water and bursting into flames.",
        "cn": "南方司令部在X上发布了这次行动“杀死了三名毒品恐怖分子”，并附上了一艘船在水中爆炸并起火的黑白画面。"
      },
      {
        "img": "assets/covers/pol-u-s-destroys-another-alleged-drug-boat-as-rubi-1.jpg",
        "cap": "U.S. forces executed a \"lethal kinetic strike on a go-fast vessel operating along established narco-traffickin"
      },
      {
        "en": "In Ecuador alone, more than 25,000 people have been murdered in the last three years as drug gangs have vied for control of trafficking routes.",
        "cn": "仅在厄瓜多尔，在过去三年中，由于贩毒团伙争夺对贩运路线的控制，已有2.5万多人被谋杀。"
      },
      {
        "en": "\"We are talking about terrorists who, in many cases, possess weapons and equipment resembling the national armies of certain countries,\" Rubio said.",
        "cn": "卢比奥说：“我们谈论的是恐怖分子，他们在很多情况下拥有类似某些国家军队的武器和装备。"
      },
      {
        "en": "Earlier this year, American commandos joined Ecuadorian troops in a joint mission aimed at dismantling a suspected criminal hub operated by an alleged narco-terrorist organization along the country's coast.",
        "cn": "今年早些时候，美国突击队与厄瓜多尔军队一起执行了一项联合任务，目的是拆除该国沿海地区一个涉嫌由贩毒恐怖组织运营的犯罪中心。"
      },
      {
        "en": "Criminal gang violence continues unabated in Ecuador following the recapture in June 2025 of the country's biggest drug lord, Adolfo Mac&iacute;as after his escape from a maximum-security prison in 2024.",
        "cn": "厄瓜多尔最大的毒枭Adolfo maciacute于2024年从最高安全级别的监狱越狱后，于2025年6月被重新抓获，此后该国的犯罪团伙暴力活动有增无减。"
      }
    ]
  },
  {
    "id": "pol-gold-star-family-calls-on-army-to-release-prob",
    "cat": "时政",
    "title": "Gold Star family calls on Army to release probe of deadly attack on Kuwait base",
    "titleZh": "金星家族呼吁军方公布对科威特基地致命袭击的调查结果",
    "source": "CBS News · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.cbsnews.com/news/cody-khork-gold-star-family-kuwait-base-strike-demand-release-internal-probe-iran-war/",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/pol-gold-star-family-calls-on-army-to-release-prob.jpg",
    "paras": [
      {
        "en": "Fresh off his return from a deployment in Poland, Army Reserve Capt. Cody Khork was eager to find another assignment overseas with his fiancée.",
        "cn": "陆军预备役上尉科迪·霍克（Cody Khork）刚从波兰的部署中回来，就渴望与未婚妻一起在海外找到另一项任务。"
      },
      {
        "en": "They found that opportunity with the Iowa-based 103rd Sustainment Command, where Khork would serve as deputy force protection officer for nine months at Camp Arifjan in Kuwait.",
        "cn": "他们在爱荷华州的第103维持司令部找到了这个机会，霍尔克将在科威特的阿里夫詹营地担任9个月的副部队保护官。"
      },
      {
        "en": "In February, the couple — along with most other service members stationed at the base — were moved off post in preparation for Operation Epic Fury.",
        "cn": "今年2月，这对夫妇和驻扎在基地的大多数其他军人一起离开了岗位，为“史诗之怒”行动做准备。"
      },
      {
        "en": "While his fiancée was moved out of the country, Khork was among a few dozen specialists moved to a tactical operations center at the Port of Shuaiba.",
        "cn": "当他的未婚妻被转移到国外时，霍尔克是被转移到帅巴港战术行动中心的几十名专家之一。"
      },
      {
        "en": "On March 1, one day into the Iran war, an Iranian Shahed drone struck Khork's position, killing him and five other American troops.",
        "cn": "3月1日，伊朗战争开始的第一天，一架伊朗Shahed无人机袭击了霍克的阵地，杀死了他和其他五名美国士兵。"
      },
      {
        "en": "\"I just never thought it would happen,\" Jim Khork, Cody's father, told CBS News.",
        "cn": "“我从没想过会发生这种事，”科迪的父亲吉姆·霍克告诉CBS新闻。"
      },
      {
        "img": "assets/covers/pol-gold-star-family-calls-on-army-to-release-prob-1.jpg",
        "cap": "An undated photo of U.S. Army Reserve Capt. Cody Khork, who was killed in an Iranian drone strike on a U.S. ta"
      },
      {
        "en": "Jim Khork, along with his wife, Stacey, sat down for an exclusive interview with CBS News to share more about their grief, but also their frustrations about what they consider is a lack of accountability for military shortcomings ahead of the deadly attack.",
        "cn": "吉姆·霍克（Jim Khork）和他的妻子斯泰西（Stacey）坐下来接受了哥伦比亚广播公司新闻频道（CBS News）的独家采访，分享了更多他们的悲伤，但也表达了他们的沮丧，他们认为在致命袭击发生之前，军方的缺陷缺乏问责制。"
      },
      {
        "en": "The Army confirmed to the Khorks and CBS News that its probe into the deadly Iranian attack was completed in early July, but they have yet to release it.",
        "cn": "美国陆军向霍克和哥伦比亚广播公司证实，对伊朗致命袭击的调查已于7月初完成，但他们尚未公布调查结果。"
      },
      {
        "en": "In a statement to CBS News, an Army spokesperson asked for \"patience.\"",
        "cn": "在哥伦比亚广播公司新闻的一份声明中，一名陆军发言人要求“耐心”。"
      },
      {
        "en": "\"The U.S. Army is committed to transparency and respecting the privacy of our Gold Star Families.",
        "cn": "“美国陆军致力于透明度和尊重我们的金星家庭的隐私。"
      },
      {
        "en": "Out of respect for the primary next of kin, who are currently being scheduled for briefs on the official findings of the completed investigation, we will not comment on specific details, individual accounts, or leaked portions of the report at this time,\" the statement said.",
        "cn": "“出于对主要亲属的尊重，他们目前正被安排听取有关完成调查的官方结果的简报，我们目前不会对具体细节、个人账户或报告中泄露的部分发表评论，”声明说。"
      },
      {
        "en": "The Khorks said Cody, as a force protection officer, had delivered repeated warnings to the unit's leader, Brig.",
        "cn": "霍克夫妇说，科迪作为一名部队保护官员，曾多次向该部队的领导人布里格？"
      },
      {
        "en": "Gen. Clint Barnes, about the risk that Iran would attack their location, which was roughly 65 miles from the border.",
        "cn": "克林特·巴恩斯（Clint Barnes）将军谈到了伊朗可能袭击他们的地点的风险，他们的地点距离边境大约65英里。"
      },
      {
        "en": "Multiple sources told CBS News that Army intelligence warned as early as January that Iran would attack the Port of Shuaiba in a potential war.",
        "cn": "多个消息来源告诉哥伦比亚广播公司新闻，陆军情报部门早在1月份就警告说，伊朗将在一场潜在的战争中袭击帅巴港。"
      },
      {
        "en": "On March 1, while members of the unit holed up in a bunker amid air sirens, Cody's family said many survivors of the attack and other officers on the ground told them Cody advised Barnes that the unit should remain there, even amid periods of calm.",
        "cn": "3月1日，科迪的家人说，当这支部队的成员在空中警报声中躲在一个地堡里时，科迪的家人说，许多袭击的幸存者和地面上的其他军官告诉他们，科迪建议巴恩斯，即使在平静时期，这支部队也应该留在那里。"
      },
      {
        "en": "\"The general kept asking Cody to call an 'all clear,'\" his father told CBS News.",
        "cn": "他的父亲告诉哥伦比亚广播公司新闻：“将军一直让科迪报‘安全警报’。”"
      },
      {
        "en": "\"A captain can only tell the general 'no' so many times.\"",
        "cn": "“一个上尉只能对将军说这么多次‘不’。”"
      },
      {
        "en": "Barnes did not respond to multiple requests for comment, while a spokeswoman for the 103rd Sustainment Command directed all questions to the Pentagon.",
        "cn": "巴恩斯没有回应多次置评请求，而第103维持司令部的一名女发言人则将所有问题都转给了五角大楼。"
      },
      {
        "en": "\"My son died unnecessarily,\" Stacey Khork added.",
        "cn": "“我儿子不必要地死去了，”斯泰西·霍克补充道。"
      },
      {
        "en": "I hate to use the word murder because it's strong, but if a loved one of yours was murdered, our justice system is built to have accountability and to have atonement for that and for the grief of the family.\"",
        "cn": "我讨厌使用谋杀这个词，因为它很强烈，但如果你所爱的人被谋杀了，我们的司法系统是为了追究责任，为家庭的悲痛赎罪而建立的。”"
      },
      {
        "img": "assets/covers/pol-gold-star-family-calls-on-army-to-release-prob-2.jpg",
        "cap": "Jim and Stacey Khork, the parents of Army Reserve Capt. Cody Khork, who was killed in an Iranian drone strike "
      },
      {
        "en": "U.S. Army Central and Third Army ordered the Pentagon probe \"to determine the facts and circumstances\" of the Iranian attack.",
        "cn": "美国陆军中央和第三军命令五角大楼调查伊朗袭击的“事实和情况”。"
      },
      {
        "en": "But before the review was underway, a CBS News investigation began shedding light on what several survivors of the attack described as \"strategic failures\" ahead of, during and after the strike.",
        "cn": "但在审查开始之前，哥伦比亚广播公司新闻频道（CBS News）的一项调查开始揭示了几名袭击幸存者所说的在袭击之前、期间和之后的“战略失败”。"
      }
    ]
  },
  {
    "id": "pol-why-some-key-gop-candidates-are-skipping-trump",
    "cat": "时政",
    "title": "Why some key GOP candidates are skipping Trump-backed midterm convention",
    "titleZh": "为什么一些关键的共和党候选人不参加特朗普支持的中期大会",
    "source": "CBS News · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.cbsnews.com/news/trump-gop-convention-republican-house-senate-candidates/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/pol-why-some-key-gop-candidates-are-skipping-trump.jpg",
    "paras": [
      {
        "en": "Dallas — President Trump calls this week's Republican National Committee midterm convention a \"rally like never before,\" and an opportunity to celebrate his administration's first two years ahead of the November elections.",
        "cn": "达拉斯——特朗普总统称本周的共和党全国委员会中期会议是一次“前所未有的集会”，也是在11月大选之前庆祝共和党执政两周年的机会。"
      },
      {
        "en": "But the convention is taking place as the GOP faces headwinds over the unpopular war in Iran, and Mr. Trump's approval ratings have continued to slip.",
        "cn": "但大会召开之际，共和党正因不受欢迎的伊朗战争而面临阻力，特朗普的支持率也在持续下滑。"
      },
      {
        "en": "While the president may say he's reserving the stage for Republican candidates in competitive races, CBS News has learned dozens in the closest contests nationwide are expected to be no-shows.",
        "cn": "虽然总统可能会说，他在竞争激烈的竞选中为共和党候选人保留舞台，但CBS新闻了解到，在全国范围内最接近的竞争中，预计有数十人不会出现。"
      },
      {
        "en": "Republican leaders and Trump allies are gathering for two days at a downtown Dallas arena, and are holding other off-site donor events and discussions centered around topics like domestic energy production.",
        "cn": "共和党领导人和特朗普的盟友将在达拉斯市中心的一个体育馆举行为期两天的聚会，并举行其他场外捐赠活动和讨论，主题包括国内能源生产。"
      },
      {
        "en": "Loyal Trump supporters are coughing up five-digit sums to their respective national fundraising committees for a ticket.",
        "cn": "特朗普的忠实支持者向各自的国家筹款委员会支付了五位数的金额，以获得一张门票。"
      },
      {
        "en": "But other Republicans running in competitive races are opting to save the money and campaign in their home districts or states.",
        "cn": "但是参加竞争激烈的竞选的其他共和党人选择节省资金，在他们的家乡选区或州竞选。"
      },
      {
        "en": "Five told CBS News they would not be going to Dallas, while the vast majority, 51 candidates, did not reply to CBS News' queries.",
        "cn": "其中5人告诉CBS新闻，他们不会去达拉斯，而绝大多数候选人（51人）没有回答CBS新闻的提问。"
      },
      {
        "en": "Still, more than two dozen are scheduled to speak at the event, according to the RNC.",
        "cn": "尽管如此，据共和党全国委员会称，仍有20多人计划在这次活动上发言。"
      },
      {
        "en": "\"Our bosses are back home,\" said Republican Rep. Brian Fitzpatrick, who is running for reelection in a Pennsylvania district Mr. Trump won by fewer than 300 votes in 2024 and is not planning to attend the convention.",
        "cn": "共和党众议员奥巴马说：“我们主帅们已经回家了，布莱恩·菲茨帕特里克（Brian Fitzpatrick）正在宾夕法尼亚州竞选连任，特朗普在2024年以不到300票的优势获胜，他不打算参加大会。"
      },
      {
        "en": "\"Times are tough, and we need to be listening to everything they're saying about the struggles that they're encountering in their budgets and their kitchen table and their businesses, healthcare and act on it.",
        "cn": "“时局艰难，我们需要倾听他们所说的一切，关于他们在预算、餐桌、生意、医疗方面遇到的困难，并采取行动。"
      },
      {
        "en": "That's the way the system's supposed to work …",
        "cn": "这就是这个系统应该运行的方式……"
      },
      {
        "en": "not going to some convention center holding signs up.\"",
        "cn": "而不是去某个会议中心举着标语。”"
      },
      {
        "en": "National parties historically hold nominating conventions every four years.",
        "cn": "国家政党历来每四年举行一次提名大会。"
      },
      {
        "en": "Not since 1982, when Democrats last held a midterm confab, has either party met this way during the off-year elections.",
        "cn": "自1982年民主党上一次举行中期会议以来，两党还没有在非年度选举中以这种方式举行过会议。"
      },
      {
        "en": "The Dallas event, at the American Airlines Center, is expected to look more like a highly produced, extended political rally headlined by Mr. Trump than a typical convention, where the party would conduct official business such as formally selecting a presidential nominee.",
        "cn": "达拉斯的这次活动在美国航空中心（American Airlines Center）举行，预计看起来更像是一场以特朗普为主角的高度制作的长篇政治集会，而不是一场典型的大会，该党将在大会上处理正式选出总统候选人等官方事务。"
      },
      {
        "en": "But there are thousands of balloons in nets already hoisted into the arena ceiling, a sign they'll likely come tumbling down during Thursday's convention finale.",
        "cn": "但是已经有成千上万的气球挂在球馆的天花板上，这表明它们可能会在周四的大会结束时掉下来。"
      },
      {
        "en": "For candidates running in places where Mr. Trump is popular, it's an opportunity to capitalize on the president's unparalleled ability to turn out the base.",
        "cn": "对于在特朗普受欢迎的地方竞选的候选人来说，这是一个利用特朗普无与伦比的拉票能力的机会。"
      },
      {
        "en": "\"I think it's going to highlight all the wins that we've provided for the American people,\" said GOP Rep. Andrew Clyde, who represents a deep-red district in Georgia.",
        "cn": "“我认为这将突出我们为美国人民提供的所有胜利，”共和党众议员奥巴马说，安德鲁·克莱德，他代表乔治亚州一个深红色选区。"
      },
      {
        "en": "\"I think it's important that the American people revisit what this Congress has done, and show the difference between what the Democrats would have done if they were in charge and what the Republicans have done since we've been in charge.\"",
        "cn": "“我认为重要的是，美国人民应该重新审视本届国会所做的事情，并展示出如果民主党掌权，他们会做什么，而自从我们掌权以来，共和党人所做的事情之间的区别。”"
      },
      {
        "en": "Mr. Trump has sought to energize his supporters ahead of the midterms, encouraging them to \"pretend I'm on the ballot.\" The midterm convention could echo that strategy: He plans to attend both nights of the event, with his keynote address slated for Wednesday.",
        "cn": "特朗普试图在中期选举前激励他的支持者，鼓励他们“假装我在选票上”。中期代表大会可能会呼应这一策略：他计划参加两个晚上的活动，并定于周三发表主题演讲。"
      }
    ]
  },
  {
    "id": "pol-volunteer-firefighter-dies-in-turkey-while-tac",
    "cat": "时政",
    "title": "Volunteer firefighter dies in Turkey while tackling wildfire, 8 people injured",
    "titleZh": "土耳其一名志愿消防员在救火时死亡，8人受伤",
    "source": "ABC News · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 2,
    "url": "https://abcnews.com/International/wireStory/volunteer-firefighter-dies-turkey-tackling-wildfire-8-people-136298369",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/pol-volunteer-firefighter-dies-in-turkey-while-tac.jpg",
    "paras": [
      {
        "img": "assets/covers/pol-volunteer-firefighter-dies-in-turkey-while-tac-1.jpg",
        "cap": ""
      },
      {
        "en": "ANKARA, Turkey -- A volunteer firefighter died on Wednesday in Turkey after helping local emergency services tackle a large wildfire in the Mediterranean coastal province of Antalya, an official said.",
        "cn": "土耳其安卡拉——一名官员表示，周三，土耳其一名志愿消防员在帮助当地紧急服务部门扑灭地中海沿岸省份安塔利亚的一场大火后死亡。"
      },
      {
        "en": "The fire broke out on Monday in Antalya’s Aksu district and, fanned by strong winds, quickly spread into the neighboring Kepez district, forcing hundreds of residents from their homes.",
        "cn": "大火于周一在安塔利亚的阿克苏地区爆发，并在强风的推动下迅速蔓延到邻近的Kepez地区，迫使数百名居民离开家园。"
      },
      {
        "en": "The cause of the wildfire is not known.",
        "cn": "野火的原因尚不清楚。"
      },
      {
        "en": "Hasan Kahya, an Aksu resident who was helping firefighters tackle the blaze, suffered a heart attack after being affected by the smoke and later died in hospital, the district’s mayor, Isa Yildirim, said.",
        "cn": "阿克苏市长伊萨·耶尔德勒姆说，阿克苏居民哈桑·卡亚（Hasan Kahya）当时正在帮助消防员灭火，他在受到烟雾影响后心脏病发作，后来在医院去世。"
      },
      {
        "en": "Two people were hospitalized with burns to their legs on Tuesday, while six others were treated for smoke inhalation.",
        "cn": "周二，两人因腿部烧伤住院，另有六人因吸入烟雾而接受治疗。"
      },
      {
        "en": "More than 100 dogs were evacuated from an animal shelter in Aksu.",
        "cn": "阿克苏一家动物收容所疏散了100多只狗。"
      },
      {
        "en": "Turkey’s forestry directorate said efforts to bring the blaze under control were continuing on Wednesday, adding that the fire’s intensity had been “reduced.” At least three firefighting planes, nine helicopters, 169 fire extinguishing trucks and more than 1,000 firefighters were deployed, the state-run Anadolu Agency reported.",
        "cn": "土耳其林业局表示，周三仍在继续努力控制火势，并补充说火势已经“减弱”。据国营的阿纳多卢通讯社报道，至少有三架消防飞机，九架直升机，169辆消防车和1000多名消防员被部署。"
      },
      {
        "en": "Separately, firefighters were also tackling a wildfire in the district of Kozan, in the southern Adana province, where hundreds of residents have been evacuated, the forestry directorate said.",
        "cn": "另外，林业局表示，消防队员还在阿达纳省南部的Kozan地区扑灭野火，数百名居民已被疏散。"
      },
      {
        "en": "A volunteer firefighter died on Wednesday in Turkey after helping local emergency services tackle a large wildfire in the Mediterranean coastal province of Antalya, an official said.",
        "cn": "土耳其一位官员说，一名志愿消防员周三在帮助当地紧急服务部门扑灭地中海沿岸省份安塔利亚的一场大火后死亡。"
      }
    ]
  },
  {
    "id": "bz-these-conditioners-transform-fine-strands-into",
    "cat": "时尚",
    "title": "These Conditioners Transform Fine Strands Into Full, Healthy Hair",
    "titleZh": "这些护发素能把细软发变成浓密健康发",
    "source": "ELLE · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://www.elle.com/beauty/hair/g68059219/conditioner-for-fine-hair/",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/bz-these-conditioners-transform-fine-strands-into.jpg",
    "paras": [
      {
        "en": "Every item on this page was chosen by an ELLE editor.",
        "cn": "此页面上的每个项目都由ELLE编辑器选择。"
      },
      {
        "en": "We may earn commission on some of the items you choose to buy.",
        "cn": "我们可能会从您选择购买的某些商品中赚取佣金。"
      },
      {
        "en": "If you have fine hair, you know the struggle: One wrong conditioner and your strands fall flat before you even leave the house.",
        "cn": "如果你的头发很细，你就知道如何挣扎：一个错误的护发素和你的绳子在你离开房子之前就掉平了。"
      },
      {
        "en": "The right formula, however, can make all the difference by adding hydration without heaviness, taming frizz without stealing volume, and leaving your hair soft, shiny, and full of life.",
        "cn": "然而，正确的配方可以通过增加水分而不会产生沉重感，驯服卷曲而不会窃取体积，并让您的头发柔软，有光泽，充满活力。"
      },
      {
        "en": "Thin hair is nothing to be ashamed of.",
        "cn": "稀疏的头发没什么好羞耻的。"
      },
      {
        "en": "Some people are born with it, while others experience thinning as they age due to anything from genetics and stress to hormonal changes or even over-styling.",
        "cn": "有些人天生就患有这种疾病，而另一些人则会因为遗传、压力、荷尔蒙变化甚至过度造型等因素而随着年龄的增长而变薄。"
      },
      {
        "en": "Fortunately, thousands of products—including conditioners—can make fine hair look fuller after just one wash and grow in thicker from the root.",
        "cn": "幸运的是，成千上万的产品（包括护发素）只需洗一次即可使细发看起来更饱满，并从根部生长得更厚。"
      },
      {
        "en": "“Conditioners for fine hair help by coating the strands without weighing them down, giving them a smoother texture, more shine, and a fuller appearance,” says Rogerio Cavalcante, a celebrity hairstylist and the founder of Brazil Edition.",
        "cn": "名人发型师、巴西版创始人Rogerio Cavalcante表示：“精细发型的护发素可以在不影响发丝重量的情况下对发丝进行涂层，使其质地更顺畅、更光泽、外观更饱满。”"
      },
      {
        "en": "“Some lightweight conditioners even contain proteins or thickening agents that plump up the strands, making hair thicker and healthier.”",
        "cn": "“一些轻质护发素甚至含有蛋白质或增稠剂，使头发更浓密、更健康。”"
      },
      {
        "en": "Fine hair can get weighed down easily, so a conditioner that detangles, adds softness, and boosts shine—while keeping hair light and airy—is a game changer.",
        "cn": "细腻的头发很容易被压垮，因此，一款能够解缠、增加柔软度和增强光泽的护发素，同时保持头发轻盈和通风，是一款改变游戏规则的护发素。"
      },
      {
        "en": "Whether you’re looking for instant post-wash volume or on a longer-term mission to thicker tresses, you’ve come to the right place.",
        "cn": "无论您是在寻找即时洗涤量，还是在寻找更厚的长期任务，您都来对地方了。"
      },
      {
        "en": "ELLE editors put top brands to the test.",
        "cn": "ELLE编辑对顶级品牌进行了测试。"
      },
      {
        "en": "Plus, I asked Cavalcante for his expert suggestions and read through hundreds of customer reviews.",
        "cn": "此外，我向Cavalcante征求了他的专家建议，并阅读了数百条客户评价。"
      },
      {
        "en": "Ahead, find the 10 best conditioners for fine hair.",
        "cn": "提前找到10种最适合细头发的护发素。"
      },
      {
        "en": "The Ouai Fine Hair Conditioner is a fine-haired girl’s dream.",
        "cn": "Ouai Fine护发素是美发女孩的梦想。"
      },
      {
        "en": "The formula plumps up your tresses for voluminous locks that last and provides fuller strands from the inside out.",
        "cn": "该配方为您的长裤增添了丰富的锁，可以持续使用，并从内到外提供更饱满的锁链。"
      },
      {
        "en": "Key ingredients like biotin, keratin, and chia seed oil reduce frizz, thicken hair, and strengthen your ends.",
        "cn": "生物素、角蛋白和奇亚籽油等关键成分可以减少毛躁，使头发更浓密，并强健发梢。"
      },
      {
        "en": "Customer review: “The best conditioner for fine hair that I have found.",
        "cn": "客户评价：“我找到的最好的细发护发素。"
      },
      {
        "en": "Pricey, yes, but definitely worth it.",
        "cn": "价格昂贵，是的，但绝对值得。"
      },
      {
        "en": "Ouai conditioner is a lightweight, lightly scented product that adds softness, bounce, and volume as described.",
        "cn": "OUAI护发素是一款轻盈、香味轻盈的产品，可增加柔软度、弹性和体积感。"
      },
      {
        "en": "It is made with ingredients to keep hair healthy and strong.",
        "cn": "它由保持头发健康和强壮的成分制成。"
      },
      {
        "en": "Just a small amount is necessary so it should last a long time.",
        "cn": "只需要少量，所以应该能持续很长时间。"
      },
      {
        "en": "If you’re looking to add some serious body to your hair in just one wash, the Olaplex Nº5 Fine Bond Maintenance Conditioner was made for you.",
        "cn": "如果您想在一次洗涤中为您的头发增添一些严肃的身材，Olaplex Nº5精细粘合维护护发素就是为您量身定做的。"
      }
    ]
  },
  {
    "id": "fs-giovanna-flores-spring-2027-ready-to-wear",
    "cat": "时尚",
    "title": "Giovanna Flores Spring 2027 Ready-to-Wear",
    "titleZh": "Giovanna Flores 2027 春季成衣",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.vogue.com/fashion-shows/spring-2027-ready-to-wear/giovanna-flores",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/fs-giovanna-flores-spring-2027-ready-to-wear.jpg",
    "paras": [
      {
        "en": "“It just feels like summer in a really nice, wholesome, sweet way.",
        "cn": "“感觉就像夏天一样美好、健康、甜蜜。"
      },
      {
        "en": "I felt that energy a lot in these pieces,” said Giovanna Flores of her unconstrained and dreamy spring collection.",
        "cn": "我在这些作品中感受到了很多能量，”乔凡娜·弗洛雷斯（Giovanna Flores）谈起她无拘无束、梦幻般的春季系列时说。"
      },
      {
        "en": "Summer is more than a season, it is also a state of mind equated with freedom, light, openness, and adventure—all qualities that animate this designer’s off-beat work.",
        "cn": "夏天不仅仅是一个季节，它也是一种精神状态，等同于自由、光明、开放和冒险——所有这些品质都为这位设计师的另类作品注入了活力。"
      },
      {
        "en": "She unexpectedly became fashion’s indie It Girl this year after Chloë Sevigny (a long time supporter), Ayo Edebiri, and Greta Lee stepped out in her one-of-a-kind crafty looks, which communicate an unexpected kind of glamour and assert the individuality of the wearer.",
        "cn": "在Chloë Sevigny（她的长期支持者）、Ayo Edebiri和Greta Lee推出她独一无二的精致造型后，她意外地成为了今年时尚界的独立It Girl，这种造型传达了一种意想不到的魅力，并彰显了穿着者的个性。"
      },
      {
        "en": "Asked to explain the appeal of her work Flores replied: “It’s hard for me to say, but I try to keep this rawness about everything where it does feel like a balance in tension in things.",
        "cn": "当被要求解释她的作品的吸引力时，弗洛雷斯回答说：“这对我来说很难说，但我试图保持这种对一切事物的原始，它确实感觉像是事物紧张的平衡。"
      },
      {
        "en": "And I think sometimes the phases between draping, patterns, muslin, final fabric, every step dilutes something, so every phase sort of tones the final outcome down a bit.",
        "cn": "我认为有时候从垂饰、图案、薄纱到最后的织物，每一步都会淡化一些东西，所以每一步都会让最后的结果淡一些。"
      },
      {
        "en": "And also this is my situation right now: I do everything.",
        "cn": "这也是我现在的处境：我什么都做。"
      },
      {
        "en": "I have an assistant help here and there, but most people have people for different steps.",
        "cn": "我这里有一个助手，那里有一个助手，但大多数人都有不同步骤的人。"
      },
      {
        "en": "You see one person’s hand and I think that must show.” It does, and at a time when there is an appetite for things analog as opposed to algorithmic.",
        "cn": "你看到一个人的手，我认为这必须显示出来。”确实如此，而且在人们对模拟而非算法的东西有兴趣的时候。"
      },
      {
        "en": "Flores’s freeform garments, which seem to document the flow state of her creativity, can feel as if they are in a state of becoming, a positive attribute.",
        "cn": "弗洛雷斯的自由造型服装似乎记录了她创造力的流动状态，让人感觉它们处于一种形成的状态，这是一种积极的属性。"
      },
      {
        "en": "They carry with them a sense of possibility.",
        "cn": "他们带着一种可能性的感觉。"
      },
      {
        "en": "Non-standard sizes allow the wearer to adjust them as they want; some pieces can be worn front-to back.",
        "cn": "非标准尺码允许穿着者根据自己的需要进行调整；有些衣服可以前后穿。"
      },
      {
        "en": "This designer builds her garments through deconstruction and collage.",
        "cn": "这位设计师通过解构和拼贴来设计她的服装。"
      },
      {
        "en": "The most dramatic example of the latter was a long dress in the primary colors Ellsworth Kelly loved (red, green, blue) with romantic white sleeves and a draped, almost bustled low back.",
        "cn": "后者最引人注目的例子是一件长裙，用的是埃尔斯沃斯·凯利（Ellsworth Kelly）喜欢的三原色（红、绿、蓝），搭配浪漫的白色袖子和褶皱的低背。"
      },
      {
        "en": "In this pick-and-mix collection, it functioned like an eye-opening sour candy.",
        "cn": "在这个精选混合系列中，它就像一个大开眼界的酸糖。"
      },
      {
        "en": "Its opposite was a “skeleton” dress made of different styles of slips made of over-locked tulle in different, transparent colors.",
        "cn": "与之相对的是一种“骨架”连衣裙，由不同风格的裙摆制成，裙摆由不同颜色的透明薄纱制成。"
      },
      {
        "en": "Continuing this idea of color bleeds, a T-shirt was emboldened with stuffed shoulder pads that let the filling color “seep” through.",
        "cn": "延续了这种颜色会流血的理念，t恤大胆地采用了填充物垫肩，让填充物的颜色“渗透”进来。"
      },
      {
        "en": "In Flores’s hands things that really shouldn’t work somehow do.",
        "cn": "在弗洛雷斯的手中，本来不该起作用的东西却莫名其妙地起了作用。"
      },
      {
        "en": "Take a dress with a shiny, even gaudy, metallic pink stretch front and cotton back in shades of magenta (there was a lot of back action for spring).",
        "cn": "比如一件有光泽的、甚至是俗艳的金属粉色弹性前襟和深浅品红的棉质后腰的连衣裙（春季有很多后腰的动作）。"
      },
      {
        "en": "“I think it’s a mix of some of the stuff that I would think was the tackiest things ever, ” she said of the collection.",
        "cn": "“我认为它混合了一些我认为是有史以来最俗气的东西，”她谈到这个系列时说。"
      },
      {
        "en": "“ I don’t know why lately that’s what I’m drawn to, it’s like a challenge.” Flores’s work is evidence that limitations can bolster creativity.",
        "cn": "“我不知道为什么最近我对这个很感兴趣，这就像一个挑战。”弗洛雷斯的工作证明，限制可以促进创造力。"
      },
      {
        "en": "Her main hurdle is finding ways to work with found materials.",
        "cn": "她的主要障碍是找到使用现有材料的方法。"
      },
      {
        "en": "For spring she used lawn chair webbing for structure and decoration.",
        "cn": "在春天，她用草坪椅织带作为结构和装饰。"
      }
    ]
  },
  {
    "id": "fs-dua-lipa-and-callum-turner-bring-their-newlywe",
    "cat": "时尚",
    "title": "Dua Lipa and Callum Turner Bring Their Newlywed Energy to New York Fashion Week",
    "titleZh": "杜阿·利帕与卡勒姆·特纳带着新婚甜蜜现身纽约时装周",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://www.vogue.com/article/dua-lipa-and-callum-turner-bring-their-newlywed-energy-to-new-york-fashion-week",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fs-dua-lipa-and-callum-turner-bring-their-newlywe.jpg",
    "paras": [
      {
        "en": "It was a glittering start to New York Fashion Week, with plenty of stars stepping out for Bulgari’s Serpenti Infiniti after-party.",
        "cn": "纽约时装周有了一个闪亮的开端，许多明星都出席了宝格丽（Bulgari）的Serpenti Infiniti晚会。"
      },
      {
        "en": "Dua Lipa and Callum Turner, of course, are as reliable for keeping the vibes high as they are for their respective pop and film superstardom.",
        "cn": "当然，杜瓦·利帕和卡勒姆·特纳在保持高人气方面是可靠的，就像他们各自的流行音乐和电影超级明星一样。"
      },
      {
        "en": "It’s been a whirlwind few months for the couple, who married in Sicily back in June and have barely touched the ground since.",
        "cn": "对这对夫妇来说，这几个月就像旋风一样，他们六月份在西西里岛结婚，从那以后几乎没有接触过地面。"
      },
      {
        "en": "There was a honeymoon across Italy; Lipa helming her Sunny Hill Festival before putting in some studio time in Stockholm —hopefully cooking up the soundtrack to summer 2027; and Turner promoting One Night Only while, allegedly, testing for the small matter of becoming the next James Bond.",
        "cn": "我们在意大利度了蜜月；利帕在斯德哥尔摩的录音室工作之前，正在主持她的Sunny Hill音乐节，希望能为2027年夏天制作配乐；特纳在宣传《007：只爱一夜》的同时，据称是在为成为下一个詹姆斯·邦德这件小事做测试。"
      },
      {
        "img": "assets/covers/fs-dua-lipa-and-callum-turner-bring-their-newlywe-2.jpg",
        "cap": ""
      },
      {
        "en": "Last night at the Boom Boom Room, Lipa and Turner joined a starry crowd that also included Anne Hathaway and Hudson Williams.",
        "cn": "昨晚在Boom Boom Room，利帕和特纳和安妮·海瑟薇、哈德森·威廉姆斯等明星一起亮相。"
      },
      {
        "en": "The pop star wore a cream embellished bodysuit with tailored black trousers and black pointed pumps, punctuated by a leopard-print Giuseppe Zanotti purse.",
        "cn": "这位流行歌手穿着奶油色装饰的紧身衣，搭配量身定制的黑色长裤和黑色尖头高跟鞋，外加一个Giuseppe Zanotti豹纹钱包。"
      },
      {
        "en": "Her brunette hair was worn glossy and straight, while bronzed makeup made the most of what remains of her seemingly endless vacation tan.",
        "cn": "她乌黑的头发梳得又直又亮，古铜色的妆容充分利用了她似乎无穷无尽的假期晒黑的余韵。"
      },
      {
        "en": "Turner, meanwhile, kept things understated in a navy shirt and matching trousers with white sneakers.",
        "cn": "与此同时，特纳低调地穿了一件海军蓝衬衫，搭配长裤和白色运动鞋。"
      },
      {
        "en": "The couple made their return to the red carpet as newlyweds last month for the premiere of Turner’s latest film, One Night Only.",
        "cn": "上个月，这对夫妇以新婚夫妇的身份重返红毯，参加了特纳最新电影《只有一夜》的首映式。"
      },
      {
        "en": "Lipa kept things classic in a plunging black Ferragamo dress, finished with another suite of Bulgari Serpenti jewelry.",
        "cn": "丽帕身着菲拉格慕深紫色的黑色连衣裙，保持了经典的风格，最后还佩戴了一套宝格丽蛇形珠宝。"
      },
      {
        "en": "For the most part, though, Lipa and Turner’s first summer as husband and wife has been spent in easy, beach-ready vacation clothes: colorful bikinis, breezy separates, and ruffled Chloé sets among them.",
        "cn": "不过，利帕和特纳成为夫妻后的第一个夏天，大部分时间都是穿着轻松、适合去海滩的度假服装度过的：色彩鲜艳的比基尼、清爽的单品和褶皱的chloe套装。"
      },
      {
        "en": "The bikinis may finally be heading back into storage, but if last night is anything to go by, Lipa’s fashion month wardrobe is more than ready to take over.",
        "cn": "比基尼可能终于要回到仓库了，但如果昨晚的事情可以借鉴的话，Lipa的时装月衣橱已经准备好接管了。"
      }
    ]
  },
  {
    "id": "fs-arab-fashion-council-s-amina-taher-on-where-du",
    "cat": "时尚",
    "title": "Arab Fashion Council’s Amina Taher on Where Dubai Fashion Week Stands Today",
    "titleZh": "阿拉伯时装委员会的 Amina Taher 谈迪拜时装周的现状",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.vogue.com/article/arab-fashion-councils-amina-taher-on-where-dubai-fashion-week-stands-today",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/fs-arab-fashion-council-s-amina-taher-on-where-du.jpg",
    "paras": [
      {
        "en": "Dubai is often considered the fashion capital of the Gulf region.",
        "cn": "迪拜通常被认为是海湾地区的时尚之都。"
      },
      {
        "en": "It was, until recently, a large part of the industry’s highest-growth story, with the Gulf on track to outpace nearly every other market in 2025, according to Bain & Co. Then came the Iran-US conflict, and Dubai found itself exposed.",
        "cn": "贝恩咨询公司（Bain & Co.）的数据显示，到2025年，海湾地区的增长速度将超过几乎所有其他市场。随后，伊朗和美国爆发冲突，迪拜发现自己暴露在了危机之中。"
      },
      {
        "en": "Despite the turmoil, which heavily interrupted travel, the region’s response has been to carry on with business as usual.",
        "cn": "尽管动荡严重影响了旅游，但该地区的应对措施是照常营业。"
      },
      {
        "en": "There’s some newness this time.",
        "cn": "这次有一些新奇之处。"
      },
      {
        "en": "The Arab Fashion Council appointed its first chairwoman, Amina Taher, in July, and the fashion week has shifted from September to October, now taking place from October 22 to 26.",
        "cn": "今年7月，阿拉伯时装委员会任命了第一任主席阿米娜·塔希尔（Amina Taher），时装周也从9月改到了10月，改为10月22日至26日举行。"
      },
      {
        "en": "DFW is the headline event of the Arab Fashion Council (AFC), which was founded by its CEO, Jacob Abrian, in 2014, with a mandate to represent fashion across the 22 countries of the Arab League.",
        "cn": "DFW是阿拉伯时尚理事会（AFC）的头条活动，AFC由其首席执行官雅各布·阿布里安（Jacob Abrian）于2014年创立，其使命是代表阿拉伯联盟22个国家的时尚。"
      },
      {
        "en": "Emirati executive Taher, who is well-respected in the Arab business community, was appointed as its first chairwoman to work alongside Abrian, who remains involved in making Dubai the Gulf’s definitive fashion week.",
        "cn": "阿联酋高管塔希尔在阿拉伯商界颇受尊敬，她被任命为首位与阿布里安共事的董事长。阿布里安仍在努力将迪拜打造为海湾地区最具影响力的时装周。"
      },
      {
        "img": "assets/covers/fs-arab-fashion-council-s-amina-taher-on-where-du-1.jpg",
        "cap": ""
      },
      {
        "en": "Taher formerly served as chief marketing officer of Wio Bank, the UAE’s first digital-only bank, as well as VP of marketing, brand and sponsorships at Etihad Airways.",
        "cn": "Taher曾担任阿联酋首家纯数字银行Wio Bank的首席营销官，以及阿提哈德航空营销、品牌和赞助副总裁。"
      },
      {
        "en": "Since her appointment, DFW has moved to align itself more closely with international buying cycles, Taher says: Ramadan 2027 falls in early February, roughly 10 days earlier than in 2026, and a September show would have sat too far ahead of that window to function as a real buying moment.",
        "cn": "塔希尔说，自从她上任以来，DFW已经开始与国际购买周期更紧密地保持一致：2027年的斋月在2月初，比2026年提前了大约10天，而9月份的时装秀可能会比那个窗口提前得太远，无法成为真正的购买时刻。"
      },
      {
        "en": "As Taher settles into her role during a challenging time for the local industry, she speaks to Vogue about her other plans for the fashion council and what to expect from Dubai Fashion Week SS27.",
        "cn": "在当地行业面临挑战的时期，Taher逐渐适应了自己的角色，她向《Vogue》讲述了她对时尚委员会的其他计划，以及对迪拜SS27时装周的期待。"
      },
      {
        "en": "Vogue: How did the appointment come about, and what was the conversation that convinced you to take it on?",
        "cn": "《Vogue》：这次约见是怎么来的？是什么样的谈话让你决定接下这个工作的？"
      },
      {
        "en": "It came from a shared belief that AFC is ready for its next chapter, one focused on scale and long-term impact.",
        "cn": "这源于一个共同的信念，即亚足联已经为下一个篇章做好了准备，一个专注于规模和长期影响的篇章。"
      },
      {
        "en": "What drew me in was the opportunity to build more of the infrastructure around the regional talent, connecting fashion to business, investment and international markets.",
        "cn": "吸引我的是有机会围绕地区人才建立更多的基础设施，将时尚与商业、投资和国际市场联系起来。"
      },
      {
        "en": "We see enormous potential here, and I wanted to be part of building what comes next.",
        "cn": "我们在这里看到了巨大的潜力，我想成为未来发展的一部分。"
      },
      {
        "en": "I don’t think fashion needs another person who only understands fashion.",
        "cn": "我不认为时尚需要另一个只懂时尚的人。"
      },
      {
        "en": "It needs people who understand how to turn creativity into sustainable businesses and institutions.",
        "cn": "它需要懂得如何将创造力转化为可持续发展的企业和机构的人。"
      },
      {
        "en": "My background has taught me to think about audiences, capital, growth and long-term value, while respecting the cultural power of fashion.",
        "cn": "我的背景教会了我在尊重时尚文化力量的同时，思考受众、资本、增长和长期价值。"
      },
      {
        "img": "assets/covers/fs-arab-fashion-council-s-amina-taher-on-where-du-2.jpg",
        "cap": ""
      },
      {
        "en": "Vogue: With fashion month about to start, where do you see Dubai Fashion Week sitting on the global calendar, and what are its strengths and weaknesses?",
        "cn": "《Vogue》：随着时装月即将开始，你认为迪拜时装周在全球日历上的位置是什么？它的优势和劣势是什么？"
      },
      {
        "en": "The global fashion industry needs new markets, new consumers, and new creative voices.",
        "cn": "全球时尚产业需要新的市场、新的消费者和新的创意声音。"
      },
      {
        "en": "It gives the industry access to something they don’t have in the same combination, the Middle East, Asia, capital, consumers, and culture in one market.",
        "cn": "它让行业能够接触到中东、亚洲、资本、消费者和文化在同一个市场中所不具备的东西。"
      }
    ]
  },
  {
    "id": "fs-here-s-what-elegance-will-look-like-in-2027-ac",
    "cat": "时尚",
    "title": "Here's What Elegance Will Look Like in 2027, According to Ralph Lauren",
    "titleZh": "拉夫·劳伦眼中 2027 年的优雅长这样",
    "source": "Who What Wear · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.whowhatwear.com/fashion/runway/ralph-lauren-new-york-fashion-week-spring-summer-2027",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/fs-here-s-what-elegance-will-look-like-in-2027-ac.jpg",
    "paras": [
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "img": "assets/covers/fs-here-s-what-elegance-will-look-like-in-2027-ac-1.jpg",
        "cap": "(Image credit: Ralph Lauren)"
      },
      {
        "en": "Next year is Ralph Lauren 's milestone 60th anniversary.",
        "cn": "明年是拉夫·劳伦60周年的里程碑。"
      },
      {
        "en": "It's hard to believe that Ralph Lauren (the man) has remained at the helm of his namesake brand for its entire six-decade-and-counting run, but alas, there he was taking a bow at the end of today's runway show.",
        "cn": "很难相信拉尔夫·劳伦（Ralph Lauren）在他的同名品牌60多年的历史中一直掌舵，但可惜的是，他在今天的时装秀结束时鞠躬谢幕。"
      },
      {
        "en": "So what does the beloved American designer have up his sleeve this time?",
        "cn": "那么，这位受人喜爱的美国设计师这次又有什么锦囊妙计呢？"
      },
      {
        "en": "\"Spring 2027 is an irreverent take on romance that creates a new elegance,\" Lauren stated in the show notes.",
        "cn": "“2027年春季是对浪漫的不敬，创造了一种新的优雅，”劳伦在节目说明中说。"
      },
      {
        "en": "\"It's about ways of dressing that celebrate ingenuity, originality, and character—the freedom and fun of creating a style that is truly personal.\"",
        "cn": "“这是一种庆祝独创性、独创性和个性的着装方式——创造真正个人风格的自由和乐趣。”"
      },
      {
        "en": "An intricate woven construction lightens a fluffy, ombr&eacute; shearling vest.",
        "cn": "一个复杂的编织结构减轻了蓬松，ombr毛背心。"
      },
      {
        "en": "'Spritz and tumble' laundering rumples full-skirted dresses.",
        "cn": "“喷淋和翻滚”洗涤会弄皱长裙。"
      },
      {
        "en": "Hand-painted and burnout techniques make for highs and lows of color intensity, giving silk lames and velvets an aged patina.",
        "cn": "手绘和烧光技术使色彩强度高低起伏，使丝绸和天鹅绒呈现出一种古老的光泽。"
      },
      {
        "en": "One skirt's embroidery was wrought in gesso-painted thread; the oversized sequins of another were coated to dull their shine.",
        "cn": "一条裙子的刺绣是用石膏彩绘线绣的；另一件的超大亮片被涂上了一层，以减弱它们的光泽。"
      },
      {
        "en": "And an intricate spray-paint process imbued silk brocade with an impressionistic mystique.\"",
        "cn": "复杂的喷漆工艺使丝绸锦缎充满了印象派的神秘感。”"
      },
      {
        "en": "The show notes highlighted some of the collection's best clothes meant to be worn after dark: \"Evening offers a bounty of options: fluid wrap dress, engineered with only a single seam; shimmering navy tank dress covered in micro sequins that release into fringe over trousers; poetic, embroidered velvet robe over ethereal white blouse and gesso-painted floral-print jeans.\"",
        "cn": "秀场说明重点介绍了该系列中一些适合在天黑后穿的最佳服装：“晚上有很多选择：流畅的裹身裙，只有一条缝；闪闪发光的海军蓝背心裙，上面镶着微亮片，露出裤子的流苏；诗情画意的刺绣天鹅绒长袍，飘逸的白色衬衫和石膏印花牛仔裤。”"
      },
      {
        "img": "assets/covers/fs-here-s-what-elegance-will-look-like-in-2027-ac-2.jpg",
        "cap": ""
      },
      {
        "en": "\"In an homage to the first suit Ralph Lauren designed for women, two stark, sharp pantsuits were built in an Italian menswear facility, where the focus is on highly defined structure,\" the brand explained in the show notes.",
        "cn": "“为了向拉夫·劳伦为女性设计的第一套西装致敬，两套鲜明、利落的长裤套装是在意大利的一家男装工厂生产的，那里的重点是高度明确的结构，”该品牌在时装秀说明中解释道。"
      },
      {
        "en": "This collection reminded our editors of some of Ralph Lauren's most enduring shows of the past, including spring/summer 2003.",
        "cn": "这个系列让我们的编辑想起了拉夫·劳伦过去最经久不衰的几场秀，包括2003年春夏。"
      },
      {
        "en": "Over 20 years ago, Natalia Vodianova (pictured below, left side) wore a long coat with delicate florals in between pastel stripes, while today's show featured a similar Bridgerton -worthy jacket that was cropped in the front and long in the back.",
        "cn": "20多年前，娜塔莉亚·沃佳诺娃（natalie Vodianova）（下图左）穿了一件在柔和条纹之间点缀着精致花朵的长外套，而今天的秀场上，她穿了一件类似于布里奇顿风格的外套，前襟剪短，后襟修长。"
      },
      {
        "en": "Ralph Lauren thinks your 2027 jeans should be ripped, faded, baggy, and low-slung.",
        "cn": "拉夫·劳伦认为2027年的牛仔裤应该是破洞的、褪色的、宽松的、低腰的。"
      },
      {
        "en": "Straw boater hats were some of my favorite accessories this season, but I also appreciated the impressive range of chic brooches, floral scarves, white handbags, oversized clutches, lace-up flats, delicate strappy heels, and more.",
        "cn": "草帽是这一季我最喜欢的配饰之一，但我也很欣赏那些令人印象深刻的别致胸针、花围巾、白色手袋、超大手包、系带平底鞋、精致的绑带高跟鞋等等。"
      },
      {
        "en": "And don't forget about the jewelry.",
        "cn": "别忘了珠宝。"
      },
      {
        "en": "Chandelier earrings were the perfect match for many of Ralph Lauren's most elegant evening looks.",
        "cn": "枝形吊灯耳环是拉夫·劳伦许多最优雅的晚装的完美搭配。"
      },
      {
        "en": "Erin got her start as a Who What Wear intern in 2011—back when the site only published a single story per day.",
        "cn": "2011年，艾琳开始在“谁穿什么”（Who What Wear）实习，当时该网站每天只发布一篇文章。"
      },
      {
        "en": "(We have since increased that number twentyfold.) She graduated magna cum laude from USC and lives in Los Angeles.",
        "cn": "（自那以后，我们把这个数字增加了20倍。）她以优异成绩毕业于南加州大学，现居洛杉矶。"
      }
    ]
  },
  {
    "id": "fs-not-simple-not-minimalist-in-fall-2026-it-s-ab",
    "cat": "时尚",
    "title": "Not Simple, Not Minimalist—In Fall 2026, It's About This Lavish-Looking Fashion Trend",
    "titleZh": "不简单，也不极简——2026 秋季的奢华风趋势",
    "source": "Who What Wear · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://www.whowhatwear.com/fashion/shopping/opulent-eveningwear-trend-fall-2026",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/fs-not-simple-not-minimalist-in-fall-2026-it-s-ab.jpg",
    "paras": [
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "img": "assets/covers/fs-not-simple-not-minimalist-in-fall-2026-it-s-ab-1.jpg",
        "cap": "(Image credit: @meganadelaide; Zara; Rabanne/Launchmetrics Spotlight)"
      },
      {
        "en": "This season, decadence is having a moment.",
        "cn": "这一季，颓废盛行。"
      },
      {
        "en": "On the fall/winter 2026 runways we saw a movement towards an overtly opulent aesthetic where designers from Dior to Conner Ives, embraced richly detailed textures, brocade, embroidery, rich color, tapestry, fringe, velvet, silk, and sumptuous evening bags—looks reminiscent of the glamorous roaring twenties—and pieces that feel like modern heirlooms.",
        "cn": "在2026年秋冬秀场上，我们看到了一种明显的华丽美学的运动，从迪奥到康纳艾夫斯的设计师们，拥抱了丰富细节的纹理、锦缎、刺绣、丰富的色彩、挂毯、流苏、天鹅绒、丝绸和奢华的晚装包——看起来让人想起迷人的二十年代——以及感觉像现代传家宝的作品。"
      },
      {
        "en": "And while there's always a time and place for hyper minimalist styles, this season simple silhouettes are taking a backseat in exchange for opulence.",
        "cn": "虽然超级极简风格总有合适的时间和地点，但这一季，简单的轮廓让位于富裕。"
      },
      {
        "en": "So how does that translate into our own wardrobes?",
        "cn": "那么这又如何影响我们自己的着装呢？"
      },
      {
        "en": "Luckily, all our favorite retailers from Zara to Reformation have been quick to offer their takes on the trend.",
        "cn": "幸运的是，从Zara到Reformation，所有我们喜欢的零售商都迅速对这一趋势发表了自己的看法。"
      },
      {
        "en": "If you want to add a lavish touch to your fall 2026 wardrobes, think about investing in a brocade or jacquard coat, an embroidered satin skirt, or a going out top with embellished details.",
        "cn": "如果你想为2026年的秋季衣橱增添奢华的色彩，可以考虑买一件锦缎或提花大衣，一件绣花缎子裙子，或者一件带有装饰细节的外出上衣。"
      },
      {
        "en": "Keep scrolling below for plenty of lavish and luxe-looking picks (for every budget) that you can easily integrate into your own wardrobe this season.",
        "cn": "继续往下看，你可以在这个季节轻松地将大量奢华和看起来奢华的选择（适用于各种预算）融入自己的衣橱。"
      },
      {
        "img": "assets/covers/fs-not-simple-not-minimalist-in-fall-2026-it-s-ab-2.jpg",
        "cap": ""
      },
      {
        "en": "I have a feeling this beautiful beaded Zara skirt won't stay in stock for long.",
        "cn": "我有一种感觉，这条漂亮的扎拉珠裙不会在库存中停留太久。"
      },
      {
        "en": "This necklace will look stunning with simple sweaters and opulent dresses alike.",
        "cn": "这条项链搭配简单的毛衣和华丽的裙子都很漂亮。"
      },
      {
        "en": "I've already spotted this stunner of a skirt on fashion people all over Instagram.",
        "cn": "我已经在Instagram上的时尚人士身上看到了这条漂亮的裙子。"
      },
      {
        "en": "Judith Jones is the associate shopping director at Who What Wear and has worked in fashion for over a decade.",
        "cn": "朱迪思·琼斯（Judith Jones）是Who What Wear的副购物总监，在时尚界工作了十多年。"
      },
      {
        "en": "She specializes in shopping content and trend stories with high-affiliate impact.",
        "cn": "她专注于具有高关联影响力的购物内容和趋势故事。"
      },
      {
        "en": "She shares the coolest, most desirable fashion market finds and brands for every budget.",
        "cn": "她分享了最酷、最令人向往的时尚市场发现和各种预算的品牌。"
      },
      {
        "en": "Previous to working in fashion, Judith worked as a TV host on the PBS travel show Globe Trekker (airing on Netflix and Amazon Prime) sharing her passion for travel and culture.",
        "cn": "在从事时尚工作之前，朱迪思曾在美国公共广播公司（PBS）的旅游节目《环球旅行者》（Globe Trekker）中担任电视主持人（在Netflix和亚马逊Prime上播出），分享她对旅游和文化的热情。"
      },
      {
        "en": "Who What Wear is part of Future US Inc, an international media group and leading digital publisher.",
        "cn": "Who What Wear是未来美国公司的一部分，未来美国公司是一家国际媒体集团和领先的数字出版商。"
      }
    ]
  },
  {
    "id": "fs-the-british-fashion-council-appoints-pavita-co",
    "cat": "时尚",
    "title": "The British Fashion Council Appoints Pavita Cooper as Chair",
    "titleZh": "英国时尚协会任命帕维塔·库珀为主席",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.vogue.com/article/the-british-fashion-council-appoints-pavita-cooper-as-chair",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/fs-the-british-fashion-council-appoints-pavita-co.jpg",
    "paras": [
      {
        "en": "Longstanding board advisor and diversity, equality, and inclusion (DEI) specialist Pavita Cooper has been named the British Fashion Council’s (BFC) new chair, following the announcement of David Pemsel’s pending departure.",
        "cn": "继大卫·彭塞尔即将离职的消息宣布后，长期担任董事会顾问、多元化、平等和包容（DEI）专家的帕维塔·库珀被任命为英国时装协会（BFC）新任主席。"
      },
      {
        "en": "Cooper will assume her new post on October 1, with Pemsel stepping down on September 30 after a decade-long stint on the executive board, with four years as chair.",
        "cn": "库珀将于10月1日上任，而彭塞尔将于9月30日卸任，此前他在执行董事会工作了10年，并担任了四年主席。"
      },
      {
        "en": "In her new role, Cooper will advocate for fashion as a financial and cultural asset to the UK, as well as its strong global reach, working with the BFC’s board, executive leaders, and the industry at large to foster a stronger ecosystem for homegrown talent, enterprise and business, encouraging international expansion.",
        "cn": "在她的新角色中，库珀将倡导时尚作为英国的金融和文化资产，以及其强大的全球影响力，与BFC董事会，执行领导人和整个行业合作，为本土人才，企业和商业建立更强大的生态系统，鼓励国际扩张。"
      },
      {
        "en": "Current executive board member Caroline Issa has been appointed as deputy chair, a new post put in place to support and vouch for the UK’s designer community, drawing on her relationships across the sector.",
        "cn": "现任执行董事会成员卡洛琳·伊萨（Caroline Issa）被任命为副主席，这是一个新的职位，旨在利用她在整个行业的关系，为英国的设计师群体提供支持和担保。"
      },
      {
        "en": "The BFC board approved the hire on August 25.",
        "cn": "BFC董事会于8月25日批准了这一聘用。"
      },
      {
        "en": "“I am honored to take on the role of chair of the British Fashion Council,” Cooper said in a statement.",
        "cn": "库珀在一份声明中说：“我很荣幸能担任英国时尚协会主席。”"
      },
      {
        "en": "“My priority will be to champion fashion as an important driver of UK growth and help strengthen the environment in which British designers, entrepreneurs and businesses can start, scale and compete globally.",
        "cn": "“我的首要任务是将时尚作为英国增长的重要驱动力，并帮助加强英国设计师、企业家和企业可以在全球范围内创业、扩大规模和竞争的环境。”"
      },
      {
        "en": "Laura Weir leads a talented and dedicated team.",
        "cn": "劳拉·威尔领导着一支才华横溢、敬业的团队。"
      },
      {
        "en": "I look forward to working with them and the board.",
        "cn": "我期待着与他们和董事会合作。"
      },
      {
        "en": "I would also like to thank David Pemsel for his exceptional service to the BFC and the fashion industry.”",
        "cn": "我还要感谢David Pemsel为BFC和时尚界做出的杰出贡献。”"
      },
      {
        "en": "With strong experience in cross-sector advisory, Cooper has worked between business, government and culture.",
        "cn": "库博拥有丰富的跨部门咨询经验，曾在商业、政府和文化领域工作。"
      },
      {
        "en": "Her appointment chimes with the BFC’s ongoing mission to better influence policymakers and government, raise investment, and spotlight fashion’s role in the region’s economy and culture.",
        "cn": "她的任命与BFC的持续使命相一致，即更好地影响政策制定者和政府，增加投资，并突出时尚在该地区经济和文化中的作用。"
      },
      {
        "en": "Cooper is currently UK chair for the 30% Club — a voluntary organization committed to improving women’s representation on company boards — and has advised on DEI across various global businesses, working alongside C-suite leaders on gender and race, in particular.",
        "cn": "库珀目前是30%俱乐部（一个致力于提高女性在公司董事会中的代表性的自愿组织）的英国主席，并为各种全球企业的DEI提供建议，特别是在性别和种族问题上与高级管理层领导人合作。"
      },
      {
        "en": "She also sits on the board for the King’s Trust, a vocational scheme for disadvantaged young people, and the Old Vic, a non-profit theater in London.",
        "cn": "她还是国王信托基金（一个针对弱势年轻人的职业计划）和老维克剧院（一个位于伦敦的非营利性剧院）的董事会成员。"
      },
      {
        "en": "Cooper has held senior leadership roles in talent and organizational development across companies including Shell, Barclays, Christie’s, and Lloyds, with a firm grasp on hiring.",
        "cn": "库珀曾在壳牌（Shell）、巴克莱（Barclays）、佳士得（Christie’s）和劳埃德（Lloyds）等公司担任人才和组织发展方面的高级领导职务，对招聘有着深刻的把握。"
      },
      {
        "en": "She joins the BFC — a non-profit organization funded via government support, patronage, and member fees — during a transition spearheaded by CEO Laura Weir.",
        "cn": "她在首席执行官劳拉·威尔的领导下过渡期间加入了BFC——一个由政府支持、赞助和会员费资助的非营利组织。"
      },
      {
        "en": "For her 2030 strategy — a four-year plan signed off by Pemsel — Weir is focusing on decentralizing fashion from London, creating longer-term support, and better evidencing the BFC’s impact to secure investment and partners.",
        "cn": "对于她的2030年战略——一个由彭塞尔签署的四年计划——韦尔的重点是将时尚从伦敦分散开来，创造长期支持，并更好地证明BFC对确保投资和合作伙伴的影响。"
      },
      {
        "en": "The strategy outlines a DEI goal led by social mobility and better access to the BFC’s prize program, which the organization plans to bolster through data collection, research papers, and the implementation of industry guidance toolkits.",
        "cn": "该战略概述了以社会流动性和更好地参与BFC奖励计划为主导的DEI目标，该组织计划通过数据收集、研究论文和实施行业指导工具包来支持这一目标。"
      },
      {
        "en": "Here, Cooper’s expertise could prove valuable.",
        "cn": "在这方面，库珀的专业知识可能是有价值的。"
      },
      {
        "en": "“We are delighted to welcome Pavita as chair of the BFC board.",
        "cn": "“我们很高兴欢迎Pavita成为BFC董事会主席。"
      },
      {
        "en": "As we focus on delivering our BFC 2030 strategy, Pavita’s experience, perspective, and understanding of government and policy will be an important complement to our board,” said Weir.",
        "cn": "随着我们专注于实现BFC 2030战略，Pavita的经验、观点以及对政府和政策的理解将成为我们董事会的重要补充，”Weir说。"
      },
      {
        "en": "“Alongside Caroline Issa as deputy chair, who brings her deep industry expertise and is firmly connected to the fashion community on the ground, we have a powerful combination of insight, influence, and industry experience to help the BFC team deliver in service of British fashion.”",
        "cn": "“卡洛琳•伊萨是BFC的副主席，她拥有深厚的行业专业知识，与时尚界有着紧密的联系。我们拥有强大的洞察力、影响力和行业经验，可以帮助BFC团队为英国时尚服务。”"
      }
    ]
  },
  {
    "id": "fs-monique-lhuillier-spring-2027-ready-to-wear",
    "cat": "时尚",
    "title": "Monique Lhuillier Spring 2027 Ready-to-Wear",
    "titleZh": "Monique Lhuillier 2027 春季成衣",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.vogue.com/fashion-shows/spring-2027-ready-to-wear/monique-lhuillier",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/fs-monique-lhuillier-spring-2027-ready-to-wear.jpg",
    "paras": [
      {
        "en": "No designer wants their clothes to be associated with the word “fussy,” but it’s a hard adjective to avoid in the world of evening wear or gala attire.",
        "cn": "没有设计师希望自己的服装与“挑剔”这个词联系在一起，但在晚礼服或晚会服装的世界里，这是一个很难避免的形容词。"
      },
      {
        "en": "When you’re decked out in full sequins or a sweeping train, it hardly conveys the idea of effortless chic.",
        "cn": "当你穿着亮片或拖地长裙时，很难传达出毫不费力的时髦。"
      },
      {
        "en": "But this season, Monique Lhuillier—who is adept at occasion dressing—was up to the challenge.",
        "cn": "但这一季，擅长场合着装的Monique lhuillier迎接了挑战。"
      },
      {
        "en": "She aimed to simplify and strip down her signature assortment of cocktail dresses and gowns, wondering if her fanciful creations could be less, well, froo-froo.",
        "cn": "她的目标是简化和精简她标志性的各种鸡尾酒礼服和礼服，想知道她的幻想创作是否可以少一些，嗯，froo-froo。"
      },
      {
        "en": "“Spring was all about modern, dark romance,” said the designer.",
        "cn": "“春天充满了现代、黑暗的浪漫，”设计师说。"
      },
      {
        "en": "For years now, Lhuillier has built a customer base around her embroidered or floral-print dresses or sweeping evening gowns, and there was no shortage of that drama for spring—but if you looked closer, you could see her clear attempts at stripping things back and refining.",
        "cn": "多年来，Lhuillier已经围绕她的刺绣或印花连衣裙或拖尾晚礼服建立了一个客户群，春季也不乏这种戏剧性——但如果你仔细观察，你会发现她明显在尝试剥离和提炼东西。"
      },
      {
        "en": "She focused largely on draping this season, finding beauty in the strong silhouettes she could craft with a singular roll of fabric.",
        "cn": "这一季，她主要专注于垂饰，用一卷单一的面料打造出鲜明的轮廓，从中寻找美。"
      },
      {
        "en": "“I really found joy in the draping,” she said.",
        "cn": "“我真的在窗帘上找到了乐趣，”她说。"
      },
      {
        "en": "“I wanted silhouettes that felt Grecian.” Her opening number for the collection was a simple cobalt-blue jersey gown draped off the shoulder, and finished with a high leg slit.",
        "cn": "“我想要希腊风格的轮廓。”她为这个系列设计的第一件礼服是一件简单的钴蓝色针织礼服，披在肩上，最后在腿上开了一个高叉。"
      },
      {
        "en": "A formal-feeling design, in something as comfortable as a T-shirt.",
        "cn": "一种正式感的设计，像t恤一样舒适。"
      },
      {
        "en": "She followed it up with a chiffon sky-blue gown, complete with a fitted strapless bodice and detachable shoulder cape.",
        "cn": "随后，她又穿了一件天蓝色雪纺礼服，搭配合身的无肩带紧身胸衣和可拆卸的披肩。"
      },
      {
        "en": "Many of her gowns this season had such versatile styling approaches, featuring removable capes or jackets that completed the look, if desired.",
        "cn": "她这一季的许多礼服都采用了这种百搭的造型方法，如果需要的话，还可以用可拆卸的斗篷或夹克来完成整个造型。"
      },
      {
        "en": "It was nice to have the option.",
        "cn": "有选择的感觉真好。"
      },
      {
        "en": "Still, some of her pieces required being more fully committed, like the black, squared-neck gown finished with oversized-pearl shoulder straps.",
        "cn": "不过，她的一些作品需要更充分的投入，比如用超大珍珠肩带装饰的黑色方领礼服。"
      },
      {
        "en": "It would be a wearable workout—the fashion equivalent of doing a weighted shoulder press.",
        "cn": "这将是一种可穿戴的锻炼——相当于做负重肩推的时尚运动。"
      },
      {
        "en": "Streamlining may have been the focus this season, but as someone who specializes in glamour, Lhuillier couldn’t resist letting her over-the-top side come out to play.",
        "cn": "流线型可能是这一季的焦点，但作为一个擅长魅力的人，Lhuillier忍不住让她夸张的一面发挥出来。"
      },
      {
        "en": "Her more intricate offerings included a strapless pink mini dress with metallic-foiled raffia accents all over it for texture—a more lightweight answer to covering it in crystals or beads.",
        "cn": "她更精致的作品包括一件粉色无肩带迷你裙，上面装饰着金属箔的荷叶花，以营造质感——这是一件用水晶或珠子覆盖的更轻巧的衣服。"
      },
      {
        "en": "Bond Girl-worthy creations included a slinky, gold-sequin number with an asymmetric knotted tie.",
        "cn": "邦女郎风格的设计包括一件紧身的金色亮片礼服，搭配一条不对称的打结领带。"
      },
      {
        "en": "Perhaps more dated, or certainly not for everyone, were her explosions of tulle, including a full-on red mermaid strapless gown, with sheer hints of pink tulle peeking through the underlay.",
        "cn": "也许更过时的是她对薄纱的大爆炸，或者肯定不适合所有人，包括一件全身红色美人鱼无肩带礼服，衬底中透出一丝粉色薄纱。"
      },
      {
        "en": "When Lhuillier found a balance of simple-yet-striking, it worked much more effectively.",
        "cn": "当Lhuillier找到了简单与引人注目之间的平衡时，它的工作效率就高得多。"
      },
      {
        "en": "Her take on the enduring ’90s slip dress, in a silver-champagne combo, featured beads that beautifully accentuated the natural lines of the body.",
        "cn": "她将90年代经久不衰的吊带裙设计成银色香槟色的组合，用珠子漂亮地突出了身体的自然线条。"
      },
      {
        "en": "She also designed a tulle T-shirt gown covered in a grid arrangement of beads—almost resembling tweed.",
        "cn": "她还设计了一件薄纱t恤礼服，上面覆盖着网格状的珠子——几乎像粗花呢。"
      },
      {
        "en": "“It felt effortless, like an essential in a woman’s closet,” said Lhuillier.",
        "cn": "“它感觉毫不费力，就像女人衣橱里的必需品，”卢里耶说。"
      },
      {
        "en": "Forget a basic white tee: In her eyes, you need a totally bedazzled floor-length one.",
        "cn": "忘记一件普通的白t恤吧：在她眼里，你需要一件完全令人眼花缭乱的及地t恤。"
      }
    ]
  },
  {
    "id": "fs-3-1-phillip-lim-spring-2027-ready-to-wear",
    "cat": "时尚",
    "title": "3.1 Phillip Lim Spring 2027 Ready-to-Wear",
    "titleZh": "3.1 Phillip Lim 2027 春季成衣",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://www.vogue.com/fashion-shows/spring-2027-ready-to-wear/3-1-phillip-lim",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fs-3-1-phillip-lim-spring-2027-ready-to-wear.jpg",
    "paras": [
      {
        "en": "Michelle Rhee’s spring collection comes at a particularly great time, after a rainy summer in New York.",
        "cn": "米歇尔·李（Michelle Rhee）的春季系列在纽约一个多雨的夏天之后，恰逢其时。"
      },
      {
        "en": "Next March, we can only anticipate even more, but luckily for customers that’s also when the spring collections will be in stores.",
        "cn": "明年3月，我们只能期待更多，但对顾客来说幸运的是，那也是春季系列上市的时候。"
      },
      {
        "en": "To combat those gloomy days ahead, Rhee wanted to add a bit of color and whimsy to their closets.",
        "cn": "为了对抗那些阴郁的日子，李想给他们的衣橱增添一点色彩和奇思妙想。"
      },
      {
        "en": "Most New Yorkers might opt for a trench or a functional raincoat, but for those seeking some new outerwear, 3.1 Phillip Lim offers a delightful periwinkle vinyl jacket.",
        "cn": "大多数纽约人可能会选择风衣或功能性雨衣，但对于那些想要一些新外套的人来说，3.1 Phillip Lim提供了一件讨人喜欢的长春花乙烯基夹克。"
      },
      {
        "en": "“It functions as rainwear and is made of a technical fabric, but the jacket actually has a leathery cool look to it,” said Rhee.",
        "cn": "他说：“它的功能是雨衣，由一种技术面料制成，但这件夹克实际上有一种皮革般的酷感。”"
      },
      {
        "en": "The best part: it even comes with a matching skirt to make your full look as waterproof as possible (and fashionable), but it will pair well with jeans and slacks or whatever else you might already have in your closet.",
        "cn": "最棒的是：它甚至可以搭配一条裙子，让你看起来尽可能防水（和时尚），但它也可以和牛仔裤、休闲裤或任何你衣橱里已经有的东西搭配。"
      },
      {
        "en": "And for when that rain finally passes and the sun begins to shine, there will be plenty of gingham skirts and nylon dresses.",
        "cn": "因为当雨终于过去，太阳开始照耀时，将会有很多格子裙和尼龙裙。"
      },
      {
        "en": "But one of the collection’s best pieces was the lightweight denim biker jacket, which will come in two washes.",
        "cn": "但该系列最好的单品之一是轻便的牛仔机车夹克，可洗两次。"
      },
      {
        "en": "The lightweight fabric gives it the perfect slouchy look once worn, making it the perfect transitional piece to take you from spring to summer and even to fall.",
        "cn": "轻薄的面料让它穿上后看起来完美慵懒，使它成为从春天到夏天甚至秋天的完美过渡单品。"
      },
      {
        "img": "assets/covers/fs-3-1-phillip-lim-spring-2027-ready-to-wear-1.jpg",
        "cap": "Look 1"
      },
      {
        "img": "assets/covers/fs-3-1-phillip-lim-spring-2027-ready-to-wear-2.jpg",
        "cap": "Look 2"
      }
    ]
  },
  {
    "id": "fs-let-s-add-some-chic-staples-to-your-closet-sty",
    "cat": "时尚",
    "title": "Let's Add Some Chic Staples to Your Closet—Stylish Fall Items From J.Crew, Aritzia, and Gap",
    "titleZh": "给衣橱添几件时髦基本款——J.Crew、Aritzia 和 Gap 的秋季精选",
    "source": "Who What Wear · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://www.whowhatwear.com/fashion/shopping/best-fall-fashion-j-crew-aritzia-gap",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fs-let-s-add-some-chic-staples-to-your-closet-sty.jpg",
    "paras": [
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "img": "assets/covers/fs-let-s-add-some-chic-staples-to-your-closet-sty-1.jpg",
        "cap": "(Image credit: Aritzia)"
      },
      {
        "en": "Alright, fashion friends, let's continue building that chic fall wardrobe, shall we?",
        "cn": "好了，时尚的朋友们，让我们继续打造时髦的秋季衣橱，好吗？"
      },
      {
        "en": "I'm dedicating this edit to the potential staples (re: versatile pieces) I recently found from J.Crew, Aritzia, and Gap.",
        "cn": "我把这篇编辑献给了我最近从J.Crew、arizia和Gap找到的潜在的主食（关于：百搭单品）。"
      },
      {
        "en": "Each of these retailers offers modern and relevant fall pieces that stylish people (ahem, you) will want to wear.",
        "cn": "这些零售商都提供时尚人士（嗯哼，你）想要穿的时髦和相关的秋季单品。"
      },
      {
        "en": "There's obviously an abundance of gorgeous knits, including cashmere and quarter-zip ups.",
        "cn": "显然，这里有大量华丽的针织衫，包括羊绒和四分之一拉链。"
      },
      {
        "en": "You'll also notice cool jackets, trousers to dress up or down, and cute tees.",
        "cn": "你还会注意到很酷的夹克、穿搭或穿搭的裤子和可爱的t恤。"
      },
      {
        "img": "assets/covers/fs-let-s-add-some-chic-staples-to-your-closet-sty-2.jpg",
        "cap": ""
      },
      {
        "en": "Bobby Schuessler is a fashion editor with over 15 years of editorial experience covering shopping, style, and beauty.",
        "cn": "Bobby Schuessler是一位时尚编辑，拥有超过15年的购物，时尚和美容编辑经验。"
      },
      {
        "en": "He's spent over a decade at Who What Wear, currently leading the shopping team to deliver highly covetable and convertible content.",
        "cn": "他在Who What Wear工作了十多年，目前领导购物团队提供非常令人垂涎和可转换的内容。"
      },
      {
        "en": "He creates data-driven shopping guides featuring top retailers like Nordstrom, Shopbop, and Net-a-Porter and is at the forefront of Who What Wear's shopping tentpole strategies, including Amazon Prime Day.",
        "cn": "他创建了以数据为导向的购物指南，推荐诺德斯特龙、Shopbop和Net-a-Porter等顶级零售商，并在“谁穿什么”（Who What Wear）购物战略的最前沿，包括亚马逊Prime Day。"
      },
      {
        "en": "He also works on branded content initiatives, with brands including Gucci, Nordstrom, Sunglass Hut, Cartier, and Old Navy.",
        "cn": "他还参与品牌内容项目，合作品牌包括Gucci、Nordstrom、Sunglass Hut、Cartier和Old Navy。"
      },
      {
        "en": "He also appears on camera in video and shopping livestream franchises, and is the star of Who What Wear's scripted show, Retail Therapy.",
        "cn": "他还出现在视频和购物直播特许经营的镜头前，并且是谁穿的脚本节目“零售疗法”的明星。"
      },
      {
        "en": "Who What Wear is part of Future US Inc, an international media group and leading digital publisher.",
        "cn": "Who What Wear是未来美国公司的一部分，未来美国公司是一家国际媒体集团和领先的数字出版商。"
      }
    ]
  },
  {
    "id": "fs-i-could-write-a-book-on-fall-nail-trends-these",
    "cat": "时尚",
    "title": "I Could Write a Book on Fall Nail Trends—These Are the 2026 Looks I'm Most Excited For",
    "titleZh": "秋季美甲趋势我能写一本书——这几款 2026 造型最让我期待",
    "source": "Who What Wear · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.whowhatwear.com/beauty/nails/fall-nail-trends-2026",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/fs-i-could-write-a-book-on-fall-nail-trends-these.jpg",
    "paras": [
      {
        "en": "It's True: These 10 End-of-Summer Nail Colors Scream \"I Have Impeccable Taste\"",
        "cn": "这是真的：这10种夏末指甲颜色表明“我的品味无可挑剔”"
      },
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "img": "assets/covers/fs-i-could-write-a-book-on-fall-nail-trends-these-1.jpg",
        "cap": "(Image credit: @matejanova; @harrietwestmoreland; @iramshelton; @themaniclub )"
      },
      {
        "en": "My all-time favorite manicure season is here!",
        "cn": "我最喜欢的美甲季节到了！"
      },
      {
        "en": "Nothing against spring pastels or vibrant, summer vacation-ready polishes, but a moody, fall mani just does something to my psyche.",
        "cn": "没有什么可以反对春天的柔和色调，也没有什么可以反对充满活力的暑假指甲油，但是一个忧郁的秋天指甲油确实会让我的心灵受到影响。"
      },
      {
        "en": "I can't help but feel cooler with a rich coat of espresso, navy, or olive on my nails.",
        "cn": "在指甲上涂上浓咖啡、海军蓝或橄榄色，我忍不住觉得更凉爽。"
      },
      {
        "en": "A deeper shade also elevates my outfits to the nth degree—even more so if I opt for a chic, artful design —so I've been collecting inspo for months in preparation for the first kiss of brisk fall air.",
        "cn": "更深的颜色也会让我的服装提升到第n级——如果我选择别致、巧妙的设计，效果会更明显——所以我几个月来一直在收集灵感，为秋天清新空气的初吻做准备。"
      },
      {
        "en": "It may be 81&deg;F as I type this sentence, but hey, it's officially September, baby!",
        "cn": "当我打出这句话的时候，可能是华氏81度，但是，嘿，已经是九月了，宝贝！"
      },
      {
        "en": "Below, find the seven trends I personally can't wait to wear this season.",
        "cn": "以下是我个人迫不及待想要在本季穿的七种流行趋势。"
      },
      {
        "en": "Oh, and because I'm genuinely obsessed with gathering as many fashion-forward, non-basic nail ideas as possible, I asked two celebrity manicurists to weigh in on their predictions.",
        "cn": "哦，因为我真的很着迷于收集尽可能多的时尚前卫、非基本的美甲点子，所以我请了两位名人美甲师来发表他们的预测。"
      },
      {
        "en": "Keep scrolling for the ultimate fall nail field guide.",
        "cn": "继续滚动查看最终的秋季指甲现场指南。"
      },
      {
        "img": "assets/covers/fs-i-could-write-a-book-on-fall-nail-trends-these-2.jpg",
        "cap": ""
      },
      {
        "en": "According to celebrity manicurist Stephanie Stone, understated metallic shades (think soft pewter, rose gold, brown chrome, etc.) will dominate the fall 2026 season.",
        "cn": "据知名美甲师斯蒂芬妮·斯通称，低调的金属色调（比如柔和的锡白色、玫瑰金、棕铬色等）将主导2026年秋季。"
      },
      {
        "en": "\"We still have our deep hues in rotation, but the fresh, glitzy formulas help keep the look both modern and timeless,\" she shares.",
        "cn": "她分享说：“我们仍然在轮换使用深色调，但新鲜、耀眼的配方有助于保持时尚和永恒的外观。”"
      },
      {
        "en": "To hop on the trend, either opt for a burnished polish (like Essie's Gel Couture Liquid Diamonds collection) or simply add a chrome topper to any rich shade you please.",
        "cn": "想要跟上潮流，要么选择抛光的指甲油（比如Essie的凝胶高级定制液体钻石系列），要么简单地在任何你喜欢的颜色上加一层镀铬。"
      },
      {
        "en": "I'm personally partial to this smoky brown moment above from celebrity manicurist Iram Shelton, who simply used OPI's Hot Toddy Naughty",
        "cn": "我个人偏爱上面这张由名人美甲师伊拉姆·谢尔顿（Iram Shelton）制作的烟熏棕色，他只是用了OPI的Hot Toddy Naughty"
      },
      {
        "en": "As the leaves turn, it only feels natural to coat your tips in shades of gold, amber, and brown.",
        "cn": "随着树叶的转动，你的指尖自然而然地涂上金色、琥珀色和棕色。"
      },
      {
        "en": "Why not lean into the fall classics?",
        "cn": "为什么不学学秋季经典呢？"
      },
      {
        "en": "\"We have our fall favorites for a reason,\" Stone says.",
        "cn": "“我们选出秋季最受欢迎的作品是有原因的，”斯通说。"
      },
      {
        "en": "\"They help us get into the spirit of the seasonal change.\" Still, if you're hoping to spice things up a bit, feel free to alternate colors like the photo above.",
        "cn": "“它们帮助我们进入季节变化的精神。”不过，如果你希望给事情增添一点情趣，可以像上面的照片一样随意更换颜色。"
      },
      {
        "en": "An ombr&eacute; moment never fails to turn heads.",
        "cn": "一个热闹的时刻总能吸引人们的目光。"
      },
      {
        "en": "\"I loved seeing all of the dark plums and reds trickle in a little earlier this year during high summer,\" shares celebrity manicurist Holly Falcone, co-founder of Celisse Nails.",
        "cn": "Celisse Nails的联合创始人、知名美甲师霍莉·法尔科内（Holly Falcone）分享道：“我喜欢在今年早些时候的盛夏看到所有的深色李子和红色指甲油慢慢流入。”"
      },
      {
        "en": "I concur—there's just something so cool about an off-season, \"Summerween\" manicure.",
        "cn": "我同意——淡季的“夏夜”美甲真是太酷了。"
      },
      {
        "en": "( Hailey Bieber and Charli XCX would also agree.) \"I think that dark trend will stay but evolve into almost-black blues, browns, and, of course, black,\" Falcone continues.",
        "cn": "（海莉·比伯和查莉·XCX也会同意。）法尔科内继续说道：“我认为深色的趋势会继续下去，但会演变成近乎黑色的蓝色、棕色，当然还有黑色。”"
      },
      {
        "en": "For those with an aversion to jet-black manicures ( they're polarizing, I get it), I suggest going the deep, midnight navy route.",
        "cn": "对于那些厌恶黑色指甲的人（我明白他们的看法两极分化），我建议他们选择深蓝色的午夜路线。"
      },
      {
        "en": "When it comes to more underrated fall shades, Falcone is quick to call out \"fantasy pearls.\" You might associate them more with summer months—as these shades do have a seashell-like iridescence —but more neutral players like white and pink look chic year-round.",
        "cn": "当谈到更被低估的秋季色调时，法尔科内很快就提出了“梦幻珍珠”。你可能会把它们与夏季联系在一起——因为这些颜色确实有贝壳般的彩虹色——但白色和粉色等更中性的颜色全年都很时髦。"
      }
    ]
  },
  {
    "id": "fs-in-the-days-after-september-11-i-began-my-nove",
    "cat": "时尚",
    "title": "In the Days After September 11, I Began My Novel About “the Time Before”",
    "titleZh": "在911之后的日子里，我开始写一部关于“以前”的小说",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.vogue.com/article/claire-messud-september-11",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fs-in-the-days-after-september-11-i-began-my-nove.jpg",
    "paras": [
      {
        "en": "We lived in Northampton, MA; I’d just begun my second year as a visiting writer at Amherst College; our daughter Livia, our first child, was only seven weeks old.",
        "cn": "我们住在马萨诸塞州的北安普顿；我刚开始在阿默斯特学院做访问作家的第二年；我们的女儿利维娅，我们的第一个孩子，只有七周大。"
      },
      {
        "en": "September 11 was a Tuesday; I had no classes; our first babysitter was to arrive in the late morning, to spend the day and get to know us all.",
        "cn": "9月11日是星期二；我没有课；我们的第一个保姆会在上午晚些时候到达，花一天的时间来了解我们所有人。"
      },
      {
        "en": "I woke before my husband, James, before the baby—not early; we’d been up in the night—and went to the kitchen to make coffee.",
        "cn": "我醒得比我丈夫詹姆斯早，比孩子早——不早；我们通宵未眠，去厨房煮咖啡。"
      },
      {
        "en": "I turned on the radio, NPR: the local station frequently played music, cheaper than airing national shows, but they carried the 9 a.m. five-minute national news.",
        "cn": "我打开了美国国家公共电台（NPR）的广播：地方电台经常播放音乐，比播放全国性节目便宜，但他们播放早上9点的5分钟全国性新闻。"
      },
      {
        "en": "The report announced that a “light aircraft” had crashed into the North Tower, unexpected because visibility was so good.",
        "cn": "报告称，一架“轻型飞机”撞上了北塔，由于能见度非常好，这是出乎意料的。"
      },
      {
        "en": "But then the second plane hit while the news was still on air, and the five-minute newscast grew longer, and longer.",
        "cn": "但是，当新闻还在播出时，第二架飞机坠毁了，五分钟的新闻广播变得越来越长。"
      },
      {
        "en": "“Wake up, wake up,” I called to my husband as I ran back down the hallway to our bedroom.",
        "cn": "“醒醒，醒醒，”我朝丈夫喊道，一边顺着走廊跑回我们的卧室。"
      },
      {
        "en": "“Something terrible has happened.” Though we didn’t yet know quite what had happened, we knew at once that it was monumental.",
        "cn": "“发生了可怕的事情。”虽然我们还不完全知道发生了什么事，但我们立刻知道这是件大事。"
      },
      {
        "en": "By the time Argelia, our new babysitter, arrived, Livia was washed, dressed, and fed.",
        "cn": "当我们的新保姆阿格利亚来的时候，利维娅已经洗好了衣服，吃饱了饭。"
      },
      {
        "en": "At the back of our railroad apartment, the radio blared; at the front, in the living room, CNN ran the same footage over and over.",
        "cn": "在我们铁路公寓的后面，收音机响了起来；在前面，在客厅里，CNN一遍又一遍地播放着同样的镜头。"
      },
      {
        "en": "Argelia sat in front of the television and wept: Her father had been killed in the Mexico City earthquake in 1985 when she was a child, and watching the footage, she relived that experience.",
        "cn": "阿格利亚坐在电视机前哭泣：她的父亲在1985年墨西哥城地震中丧生，当时她还是个孩子，看着镜头，她重温了那次经历。"
      },
      {
        "en": "James and I wept too, uncomprehending—the flames, the smoke, above all the people jumping.",
        "cn": "詹姆斯和我也哭了，无法理解——火焰，烟雾，最重要的是人们跳了起来。"
      },
      {
        "en": "Those images remain seared in my mind: faced with the choice between the burning building and hurling themselves to certain death, they chose to jump.",
        "cn": "那些画面仍然在我的脑海中挥之不去：面对着火的大楼和将自己扔向死亡之间的选择，他们选择了跳下去。"
      },
      {
        "en": "A pyrrhic choice, but a choice.",
        "cn": "这是一个得不偿失的选择，但也是一个选择。"
      },
      {
        "en": "We’d just returned from New York the previous day: We’d been there for our friends’ Sunday wedding, the reception at an elegant club in midtown.",
        "cn": "前一天我们刚从纽约回来：我们去那里参加朋友的周日婚礼，在市中心一家优雅的俱乐部举行的招待会。"
      },
      {
        "en": "Livia wore a white dress with blue ribbons that my mother had saved from my infancy.",
        "cn": "利维娅穿着一件带蓝丝带的白裙子，那是我母亲从我小时候给我留的。"
      },
      {
        "en": "She was very popular among the aspiring grandmas, who all wanted to hold her.",
        "cn": "她很受那些有抱负的奶奶们的欢迎，她们都想抱她。"
      },
      {
        "en": "The actor Sam Waterston, also a guest, amiably stroked her head.",
        "cn": "同样是嘉宾的演员萨姆·沃特斯顿（Sam Waterston）亲切地抚摸着她的头。"
      },
      {
        "en": "At one point James hastily changed her diaper on a table in a niche in the library, a transgression that we laughed about afterwards.",
        "cn": "有一次，詹姆斯在图书馆壁龛里的一张桌子上匆忙地换了尿布，这是我们后来嘲笑的违规行为。"
      },
      {
        "en": "After supper, we danced with Livia in our arms.",
        "cn": "晚饭后，我们搂着利维娅跳舞。"
      },
      {
        "en": "The bride and groom beamed throughout, so happy.",
        "cn": "新郎新娘自始至终都面带笑容，非常幸福。"
      },
      {
        "en": "We were all young and full of hope.",
        "cn": "我们都很年轻，充满希望。"
      },
      {
        "en": "We drove home on the morning of Monday, September 10.",
        "cn": "9月10日，星期一早上，我们开车回家。"
      },
      {
        "en": "After harrowing hours in front of the television—the third plane crash, in Pennsylvania; the towers falling, one after the other; the constant replays of the same horrifying footage; the pervasive chaos—we turned it off and went for a walk.",
        "cn": "在电视机前痛苦地看了几个小时后——第三架飞机坠毁，在宾夕法尼亚州；塔楼一个接一个地倒塌；不断重播同样的恐怖镜头；无处不在的混乱——我们关掉电视，出去散步。"
      }
    ]
  },
  {
    "id": "fs-on-her-upcoming-debut-album-sophia-stel-makes-",
    "cat": "时尚",
    "title": "On Her Upcoming Debut Album, Sophia Stel Makes Peace With Being Perceived",
    "titleZh": "在她即将推出的首张专辑中，索菲亚·斯特尔与被感知和平相处",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://www.vogue.com/article/sophia-stel-debut-album-announcement",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/fs-on-her-upcoming-debut-album-sophia-stel-makes-.jpg",
    "paras": [
      {
        "en": "Sophia Stel has a very specific memory from last year’s Paris Fashion Week.",
        "cn": "索菲亚·斯特尔（Sophia Stel）对去年的巴黎时装周有着非常特别的记忆。"
      },
      {
        "en": "She was suddenly moving through unfamiliar, decidedly more glamorous rooms than she was used to, and walking the runway for Ann Demeulemeester—but she was also broke.",
        "cn": "她突然在陌生的房间里走动，显然比她习惯的房间更迷人，并为安·德梅斯特（Ann demeulemeester）走秀——但她也破产了。"
      },
      {
        "en": "“I really only had one outfit, and it’s black and navy, which is supposedly against the rules,” she remembers, as we catch up at the end of summer in east London over coffee.",
        "cn": "夏末，我们在伦敦东部喝着咖啡聊天，她回忆道：“我真的只有一套衣服，是黑色和海军蓝的，这应该是违反规定的。”"
      },
      {
        "en": "“I actually think black and navy look amazing together.” The tension of it all fed directly into “On My Dick,” the opening track of her debut album, The Greatest Album of All Time, and what she calls an “all-out diss track” about people who were more in it for clout and the money she didn’t have.",
        "cn": "“实际上我觉得黑色和海军蓝搭配在一起很好看。”这种紧张感直接体现在她的首张专辑《有史以来最伟大的专辑》（The Greatest album of all Time）的首歌《On My Dick》中。这首歌被她称为是一首“全面抨击”的歌曲，讲述的是那些在这首歌中更多地追求影响力和金钱的人，而她没有。"
      },
      {
        "en": "“I had a lot of frustration and such bad imposter syndrome.”",
        "cn": "“我很沮丧，还得了严重的冒充者综合症。”"
      },
      {
        "en": "The title of the record—announced today—is a dare to herself.",
        "cn": "今天宣布的专辑名称是对她自己的一次挑战。"
      },
      {
        "en": "“One of my greatest struggles—and why it took me so long to start releasing music when I’d been making it for so long—is confidence,” the 27-year-old artist and producer says.",
        "cn": "这位27岁的艺术家兼制作人说：“我最大的挣扎之一——也是为什么我花了这么长时间才开始发行我已经做了这么久的音乐——就是自信。”"
      },
      {
        "en": "“Ultimately, the reason this album is called The Greatest Album of All Time is because it’s about this decision to be kind of absurdly confident.”",
        "cn": "“最终，这张专辑被称为有史以来最伟大的专辑的原因是因为它是关于一种荒谬的自信的决定。”"
      },
      {
        "en": "Due October 16 via A24 Music, the 10-track self-produced record follows Stel’s 2024 debut EP, Object Permanence, and this year’s How to Win At Solitaire.",
        "cn": "这张10首曲目的自制专辑将于10月16日通过A24 Music发行，继斯泰尔2024年的首张EP《Object Permanence》和今年的《How to Win At Solitaire》之后。"
      },
      {
        "en": "Born in Victoria, B.C., and shaped by years working in Vancouver’s club scene (there, she worked a number of non-creative jobs to get by), she made music on the side for many years before her emotionally electrifying, genre-hopscotching songs began finding an audience.",
        "cn": "她出生在不列颠哥伦比亚省的维多利亚，在温哥华的俱乐部工作多年（在那里，她做了许多非创造性的工作来维持生计），在她激动人心、风格多变的歌曲开始找到听众之前，她做了很多年的兼职音乐。"
      },
      {
        "en": "In the past year, she made that aforementioned runway debut, opened for Lorde, and embarked on her first headline tour, going from barely traveling to crossing the Atlantic regularly.",
        "cn": "在过去的一年里，她完成了前面提到的t台首秀，为洛德（Lorde）做了开场秀，并开始了她的第一次头条巡演，从几乎不旅行到定期横渡大西洋。"
      },
      {
        "en": "“I’d never been to Europe until this time last year, and I’ve been over 10 times since,” she says.",
        "cn": "她说：“直到去年这个时候，我才去过欧洲，从那以后我已经去过10多次了。”"
      },
      {
        "en": "“I lived my life in one sort of way for quite a long time, and then things really flipped.",
        "cn": "“在很长一段时间里，我一直以一种方式生活，然后事情真的发生了变化。"
      },
      {
        "en": "I found myself in all of these new spaces and having new types of experiences.”",
        "cn": "我发现自己置身于所有这些新空间中，拥有全新的体验。”"
      },
      {
        "en": "The Greatest Album of All Time is Stel’s attempt to capture that whiplash while it is still happening.",
        "cn": "史上最伟大的专辑是斯泰尔试图捕捉到的鞭打，当它还在发生。"
      },
      {
        "en": "She finished the album only days before our conversation, having told A24 she wanted to keep making it throughout the year so it could remain “a response to what was going on in real time.”",
        "cn": "就在我们谈话的前几天，她完成了这张专辑，她告诉A24，她希望全年都能继续制作，这样它就可以保持“对实时发生的事情的回应”。"
      },
      {
        "en": "“Each song carries a different place in that journey for me,” she says.",
        "cn": "她说：“对我来说，每首歌都代表着这段旅程中不同的地方。”"
      },
      {
        "en": "“To me, this record is probably the closest I’ve come to making…",
        "cn": "“对我来说，这张唱片可能是我最接近的唱片了……"
      },
      {
        "en": "It’s really not a musical, but it feels like that to me.” Ethereal, elusive synths interweave with melancholic live strings, jumping to dream-pop guitars and Euro rave climaxes blunted by distorted percussion—it’s Stel’s sound at its most ambitious and assured yet.",
        "cn": "这真的不是一部音乐剧，但对我来说就是这样。”空灵、难以捉摸的合成器与忧郁的现场弦乐交织在一起，跳跃到梦幻流行吉他和欧洲狂欢的高潮，被扭曲的打击乐器削弱了——这是斯泰尔最雄心勃勃、最自信的声音。"
      },
      {
        "en": "Its themes—of turbulent relationships and meandering life paths, toxic patterns and the euphoria found in everyday moments—are expressed with diaristic intimacy.",
        "cn": "它的主题——动荡的人际关系和曲折的人生道路，有毒的模式和在日常生活中发现的欣快感——通过日记式的亲密表达出来。"
      },
      {
        "en": "The first song she made was the hypnotic “Like A Kite,” written around a year ago and almost abandoned after she got stuck on its second verse.",
        "cn": "她创作的第一首歌是催眠曲《像风筝一样》（Like A Kite），这首歌写于大约一年前，在第二节陷入困境后几乎被放弃。"
      },
      {
        "en": "“The feeling has to hit,” she says.",
        "cn": "她说：“这种感觉必须要有冲击力。”"
      },
      {
        "en": "“Often I’ll try to write about something and make 10 songs, and then one will be the one where I feel like I’ve finally captured it.” It became one of the record’s throbbing arteries, with its body-high bass and vulnerable lines about giving into curious new feelings.",
        "cn": "“我经常会尝试写一些东西，然后做10首歌，然后有一首我觉得我终于抓住了它。”这首歌成为了这张唱片跳动的动脉之一，它低沉的低音和关于屈服于新奇的新感觉的脆弱的台词。"
      }
    ]
  },
  {
    "id": "fs-pen-lope-cruz-s-milky-manicure-sets-the-tone-f",
    "cat": "时尚",
    "title": "Penélope Cruz’s “Milky” Manicure Sets the Tone for Fall",
    "titleZh": "pensamlope Cruz 的“乳白色”美甲为秋季定下基调",
    "source": "Vogue · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://www.vogue.com/article/penelope-cruzs-milky-manicure-sets-the-tone-for-fall",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/fs-pen-lope-cruz-s-milky-manicure-sets-the-tone-f.jpg",
    "paras": [
      {
        "en": "Ask any fan of clean girl beauty—there are subtle differences to each and every trending neutral manicure, from soap nails to princess nails, glass manicure, and beyond.",
        "cn": "问任何一个喜欢干净女孩美的人——每一种流行的中性美甲都有细微的区别，从肥皂指甲到公主指甲，玻璃指甲等等。"
      },
      {
        "en": "We’ve returned to Jennifer Lopez’s 2023 wedding manicure—called the milky manicure —with a new twist.",
        "cn": "我们回到了詹妮弗·洛佩兹2023年的婚礼美甲——被称为乳白色美甲——以新的方式。"
      },
      {
        "en": "When Penélope Cruz arrived at the Venice Film Festival earlier this week, her nails were painted in a look reminiscent of the milky manicure trend.",
        "cn": "本周早些时候，佩恩·科鲁兹出现在威尼斯电影节上，她的指甲被涂成一种让人想起乳白色美甲潮流的样子。"
      },
      {
        "en": "First created and painted by celebrity manicurist Tom Bachik, Lopez’s take on the look was simply a sheer white wash across the nails.",
        "cn": "洛佩兹的妆容最初是由明星美甲师汤姆·巴克设计和绘制的，只是在指甲上涂上一层纯粹的白色。"
      },
      {
        "en": "Cruz’s long, almond nails were slightly warmer and pinker in shade—a look that’s both versatile and flattering.",
        "cn": "克鲁兹的长杏仁指甲在色调上略显温暖和粉红色，这种造型既百搭又讨人喜欢。"
      },
      {
        "en": "Cruz’s go-to manicurist, Lucero Hurtado, recently shared during an interview with Vanity Fair Spain that soft, milky shades and clean finishes are continuing to go strong as one of the biggest nail trends of 2026.",
        "cn": "克鲁兹的御用美甲师卢塞罗·赫尔塔多（Lucero Hurtado）最近在接受《名利场》（Vanity Fair）西班牙版采访时表示，柔和的乳白色色调和干净的指甲油将继续成为2026年最大的美甲趋势之一。"
      },
      {
        "en": "“A well-groomed manicure is a silent form of communication,” Hurtado said of the look.",
        "cn": "“精心修剪的指甲是一种无声的交流方式，”赫尔塔多说。"
      },
      {
        "en": "And if this manicure could talk, it would say “I’m ready for anything.”",
        "cn": "如果这个美甲会说话，它会说：“我已经准备好做任何事了。”"
      },
      {
        "img": "assets/covers/fs-pen-lope-cruz-s-milky-manicure-sets-the-tone-f-2.jpg",
        "cap": ""
      },
      {
        "en": "Have a beauty or wellness trend you're curious about?",
        "cn": "你对美容或健康趋势感到好奇吗？"
      },
      {
        "en": "Send Vogue' s senior beauty & wellness editor an email at beauty@vogue.com.",
        "cn": "给《Vogue》的资深美容与健康编辑发邮件至beauty@vogue.com。"
      },
      {
        "en": "Have a beauty or wellness trend you’re curious about?",
        "cn": "你对美容或健康趋势感到好奇吗？"
      },
      {
        "en": "Email Margaux at beauty@vogue.com.",
        "cn": "电邮至beauty@vogue.com。"
      },
      {
        "en": "The Vogue Runway app has expanded!",
        "cn": "《Vogue Runway》应用扩展了！"
      },
      {
        "en": "Update to the latest version to see all Vogue content, as well as new features like our Runway Genius quiz, Group Chats, and posts from Vogue contributors.",
        "cn": "更新到最新版本可以看到《Vogue》的所有内容，以及我们的Runway Genius测试、群聊和《Vogue》撰稿人的帖子等新功能。"
      },
      {
        "en": "Become a Vogue Business Member —the ultimate resource for fashion and beauty industry professionals.",
        "cn": "成为时尚商务会员-时尚和美容行业专业人士的终极资源。"
      },
      {
        "en": "Never miss a story: Add Vogue.com to your preferred sources in Google.",
        "cn": "永远不会错过一个故事：在谷歌中将Vogue.com添加到您的首选来源。"
      }
    ]
  },
  {
    "id": "bz-ralph-lauren-s-american-classics-take-a-walk-o",
    "cat": "时尚",
    "title": "Ralph Lauren’s American Classics Take a Walk on the Romantic Side",
    "titleZh": "拉尔夫·劳伦的美式经典走上浪漫路线",
    "source": "ELLE · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.elle.com/runway/a73526575/ralph-lauren-spring-2027-review/",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/bz-ralph-lauren-s-american-classics-take-a-walk-o.jpg",
    "paras": [
      {
        "en": "For spring/summer 2027, the designer revisited his signature codes with an irreverent new mood.",
        "cn": "2027年春夏，这位设计师以一种不敬的新心情重新审视了他的标志性代码。"
      },
      {
        "en": "Self-reference can be tricky territory, especially for a designer with an archive as deep as Ralph Lauren ’s.",
        "cn": "自我参考可能是一个棘手的领域，尤其是对于像拉尔夫·劳伦（Ralph Lauren）这样拥有深厚档案的设计师来说。"
      },
      {
        "en": "But for his spring/summer 2027 collection, the stalwart designer revisited his signatures while finding new ways to cut, layer, and style the classics.",
        "cn": "但在他的2027年春夏系列中，这位坚定的设计师重新审视了他的签名，同时寻找了切割、分层和风格经典的新方法。"
      },
      {
        "en": "This afternoon, Lauren drew an intimate but expectedly A-list crowd inside an Italian Renaissance Revival landmark building in Manhattan’s Tribeca neighborhood.",
        "cn": "今天下午，Lauren在曼哈顿翠贝卡（Tribeca）街区的一座意大利文艺复兴复兴时期的地标性建筑内吸引了一群亲密但令人期待的一线人群。"
      },
      {
        "en": "As guests like Viola Davis, Meghann Fahy, and Cynthia Erivo settled into their seats, the show opened with a head-to-toe white look.",
        "cn": "随着Viola Davis、Meghann Fahy和Cynthia Erivo等嘉宾入座，节目以从头到脚的白色开场。"
      },
      {
        "en": "It was a familiar Lauren move, and a fitting way to begin a collection that would take a knowing walk through the archive.",
        "cn": "这是一个熟悉的劳伦举动，也是开始收藏的合适方式，可以在档案馆中进行一次明智的漫步。"
      },
      {
        "en": "What came next was a wide-ranging interpretation of Lauren’s world, moving from elevated “going out” looks to polished prep, with suiting at its sharpest.",
        "cn": "接下来是对Lauren的世界进行了广泛的解释，从高端的“走出去”外观转变为抛光的准备，以最锋利的姿态穿着。"
      },
      {
        "en": "Together, they recalled the six-decade-old codes that have made his brand a New York Fashion Week fixture—and, more broadly, a shorthand for American style.",
        "cn": "他们一起回顾了六十年来使他的品牌成为纽约时装周常客，以及更广泛意义上成为美国风格的代名词的准则。"
      },
      {
        "en": "While Lauren is most associated with a particular kind of polished Americana, he wasn’t afraid to show his more rebellious side.",
        "cn": "虽然Lauren与某种特定的抛光美式风格联系最紧密，但他并不害怕表现出自己更叛逆的一面。"
      },
      {
        "en": "Distressed denim was slung low on the hips and paired with a midriff-baring jacket lined with a shearling collar.",
        "cn": "做旧的牛仔布挂在臀部低处，搭配一件衬有羊毛领的裸露夹克。"
      },
      {
        "en": "Elsewhere, a slim jacquard jacket, cut away with a tail at the back, and a blouse finished with a ruffled Victorian collar added a touch of Old World romanticism.",
        "cn": "在其他地方，一件修身的提花夹克，背面有一条尾巴，一件衬衫饰有折边的维多利亚时代领子，增添了一丝旧世界的浪漫主义。"
      },
      {
        "en": "In the collection’s show notes, the designer cited an “irreverent take on romance,” an ethos that carried through to both the silhouette and styling.",
        "cn": "在系列的展览笔记中，设计师引用了“对浪漫的不敬”，这种精神贯穿于轮廓和造型中。"
      },
      {
        "en": "Trousers were draped with ease, many of them worn with cummerbunds and fringed scarves affixed low on the waist.",
        "cn": "裤子披得很轻松，其中许多都穿着腰部较低的cummerbunds和流苏围巾。"
      },
      {
        "en": "Evening wear struck a similar balance.",
        "cn": "晚装达到了类似的平衡。"
      },
      {
        "en": "The silhouettes were familiar—fluid dresses, velvet robes, and shimmering separates—but new techniques gave them a looseness and texture that felt of the moment.",
        "cn": "轮廓是熟悉的-流畅的连衣裙，天鹅绒长袍和闪闪发光的分离物-但新技术给了他们一种松散和质地的感觉。"
      },
      {
        "en": "Sequins dissolved into fringe, single-seam construction allowed one wrap dress to fall around the body with effortless ease, and “spritz and tumble” dresses had an intentional wrinkled consistency.",
        "cn": "亮片溶解在流苏中，单缝结构使一件裹身连衣裙可以毫不费力地轻松落在身体周围，“spritz and tumble”连衣裙具有故意起皱的一致性。"
      },
      {
        "en": "“It’s about ways of dressing that celebrate ingenuity, originality, and character—the freedom and fun of creating a style that is truly personal,” Lauren continued.",
        "cn": "Lauren继续说道：「这是关于庆祝独创性、独创性和个性的着装方式--创造真正个性化风格的自由和乐趣。」"
      },
      {
        "en": "In his world, there is always room to make the classics your own.",
        "cn": "在他的世界里，总有空间让经典成为你自己的。"
      },
      {
        "en": "Matthew Velasco is the Fashion News Editor at ELLE.",
        "cn": "Matthew Velasco是ELLE的时尚新闻编辑。"
      },
      {
        "en": "Based in New York City, he previously worked as a News Writer at W magazine and an Assistant Editor at V magazine.",
        "cn": "他以前在纽约市工作，曾在W杂志担任新闻撰稿人，在V杂志担任助理编辑。"
      },
      {
        "en": "Outside of fashion, he enjoys interior design, tennis (both watching and playing), and a jam-packed antique store.",
        "cn": "除了时尚之外，他还喜欢室内设计、网球（观看比赛）和一家拥挤的古董店。"
      },
      {
        "en": "We may earn commission from links on this page, but we only recommend products we back.",
        "cn": "我们可能会通过此页面上的链接赚取佣金，但我们只推荐我们退回的产品。"
      }
    ]
  },
  {
    "id": "fs-rom-com-ponytails-and-afterglow-blush-are-here",
    "cat": "时尚",
    "title": "Rom-Com Ponytails and Afterglow Blush Are Here for Fall",
    "titleZh": "浪漫喜剧式马尾与余晖腮红，今秋正当红",
    "source": "ELLE · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 2,
    "url": "https://www.elle.com/beauty/hair/a73655203/cult-gaia-spring-2027-runway-beauty-look-hair-makeup-trend/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/fs-rom-com-ponytails-and-afterglow-blush-are-here.jpg",
    "paras": [
      {
        "en": "If you were having the most incredible day of your life, that would include a good hair day, the kind that only comes around “twice a year,” according to hairstylist Karim Belghiran.",
        "cn": "根据发型师Karim Belghiran的说法，如果你度过了生命中最不可思议的一天，那就包括一个“一年两次”的美发日。"
      },
      {
        "en": "This elusive look is exactly what inspired Belghiran for Cult Gaia’s spring/summer 2027 show.",
        "cn": "这种难以捉摸的造型正是Belghiran为Cult Gaia 2027年春夏时装秀的灵感来源。"
      },
      {
        "en": "“A dream girl having the day of her dreams,” he says, like a main character in a romance book, which is why we coined the look a “Rom-Com Ponytail.” “You wake up and everything feels effortless and flawless.”",
        "cn": "“一个梦想中的女孩拥有她梦想中的一天，”他说，就像浪漫小说中的主角一样，这就是为什么我们创造了“浪漫喜剧马尾辫”的外观。“一觉醒来，你会觉得一切都毫不费力，完美无瑕。”"
      },
      {
        "en": "To emulate this ease, Belghiran created loose, knotted ponytails in two different styles.",
        "cn": "为了模仿这种轻松，Belghiran创造了两种不同风格的宽松打结马尾。"
      },
      {
        "en": "“One is a straight infinity knot with no tension,” he says.",
        "cn": "“一个是没有张力的直无限大的结，”他说。"
      },
      {
        "en": "The other is even more fanciful and framed with tousled waves.",
        "cn": "另一幅则更加奇特，画着乱蓬蓬的波浪。"
      },
      {
        "en": "It’s the kind of style you might expect a leading love interest like Andie Anderson or Anna Scott to step out in.",
        "cn": "这是一种你可能会期待像安迪·安德森或安娜·斯科特这样的主要恋爱对象出现的风格。"
      },
      {
        "en": "Or Lili Reinhart, who’s currently channeling iconic rom-com characters on a press tour for her newest movie, The Love Hypothesis, and is wearing similarly tousled hairstyles.",
        "cn": "还有莉莉·莱因哈特（Lili Reinhart），她最近在新片《爱情假设》（The Love Hypothesis）的巡回宣传活动中扮演了经典的浪漫喜剧角色，她也梳着类似的蓬乱发型。"
      },
      {
        "en": "At Cult Gaia, the lovergirl energy didn’t end with the undone ponytails, either.",
        "cn": "在《盖娅崇拜》中，情人的能量并没有随着松开的马尾辫而结束。"
      },
      {
        "en": "Raoul Alejandre upped the ante with a blush-forward makeup look.",
        "cn": "拉乌尔·亚历杭德雷（Raoul Alejandre）用一副绯红的妆容加大了赌注。"
      },
      {
        "en": "“The makeup is inspired by rolling around in the sheets with a lover in the south of Europe or a tropical place,” he says.",
        "cn": "他说：“这款化妆品的灵感来自与南欧或热带地区的恋人在床单上打滚。”"
      },
      {
        "en": "“That tan has been building up throughout the week.",
        "cn": "她说：“整个星期，皮肤都在晒黑。"
      },
      {
        "en": "It’s turned a little freckle-y in some instances.” To achieve this, Alejandre settled on berry-toned cheeks that weren’t too pink.",
        "cn": "在某些情况下，它变得有点雀斑。”为了做到这一点，亚历杭德雷选择了不太粉的浆果色脸颊。"
      },
      {
        "en": "One thing is clear: This fall, it’s all about romance.",
        "cn": "有一件事很清楚：今年秋天，一切都是关于浪漫的。"
      },
      {
        "en": "As Belghiran says: “You’ll feel so good that you’re almost about to fly.”",
        "cn": "正如Belghiran所说：“你会感觉很好，就像要飞起来一样。”"
      }
    ]
  },
  {
    "id": "fs-can-exosomes-really-help-with-hair-growth-here",
    "cat": "时尚",
    "title": "Can Exosomes Really Help With Hair Growth? Here’s What You Need to Know",
    "titleZh": "外泌体真的能帮助头发生长吗？以下是你需要知道的",
    "source": "ELLE · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.elle.com/beauty/hair/a73580303/exosomes-for-hair-growth/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/fs-can-exosomes-really-help-with-hair-growth-here.jpg",
    "paras": [
      {
        "en": "If you’re in the know about beauty trends, you’ve likely heard plenty about exosomes over the past few years.",
        "cn": "如果你对美容趋势有所了解，那么在过去的几年里，你可能听说过很多关于外泌体的事情。"
      },
      {
        "en": "Touted for their potential to help rejuvenate and heal the skin, including after surgery, it was only a matter of time before they crossed over into the realm of hair care, too.",
        "cn": "它们被吹捧有潜力帮助皮肤恢复活力和愈合，包括在手术后，它们也会进入护发领域，这只是时间问题。"
      },
      {
        "en": "After all, full, thick-looking strands start at the root, which is precisely what a growing number of over-the-counter, exosome-based hair serums claim to support.",
        "cn": "毕竟，浓密的头发是从发根开始的，而这正是越来越多的非处方、基于外泌体的头发精华液所声称的。"
      },
      {
        "en": "Ahead, we spoke with a dermatologist and two plastic surgeons to separate fact from fiction.",
        "cn": "在此之前，我们采访了一位皮肤科医生和两位整形外科医生，以区分事实和虚构。"
      },
      {
        "en": "Exosomes, or extracellular vesicles, are essentially “tiny membrane-bound packets that cells release to communicate with one another,” says New York-based plastic surgeon Dr. Yael Halaas.",
        "cn": "外泌体，或细胞外囊泡，本质上是“细胞释放的微小膜结合包，用于相互交流，”纽约整形外科医生耶尔·哈拉斯博士说。"
      },
      {
        "en": "“They carry proteins, growth factors, lipids, and genetic material, such as messenger RNA and microRNA.",
        "cn": "“它们携带蛋白质、生长因子、脂质和遗传物质，如信使RNA和微RNA。"
      },
      {
        "en": "When a neighboring cell takes up an exosome, it receives a set of instructions that can change how that cell behaves.”",
        "cn": "当邻近细胞吸收外泌体时，它会收到一组可以改变细胞行为的指令。”"
      },
      {
        "en": "“In laboratory and early clinical work, exosomes appear to calm inflammatory signaling that can contribute to thinning, support the dermal papilla cells that regulate the hair cycle, and encourage follicles to re-enter the active growth phase,” she continues.",
        "cn": "“在实验室和早期临床工作中，外泌体似乎可以平息导致头发变薄的炎症信号，支持调节头发周期的真皮乳头细胞，并鼓励毛囊重新进入活跃的生长阶段，”她继续说。"
      },
      {
        "en": "“They’re one of the more exciting areas in hair regeneration research because they potentially influence multiple components of the follicular microenvironment at once, rather than only targeting a single pathway.”",
        "cn": "“它们是头发再生研究中更令人兴奋的领域之一，因为它们有可能同时影响毛囊微环境的多个组成部分，而不是只针对单一途径。”"
      },
      {
        "en": "“Depending on where they’re derived from, they can also contain 15 to 20 times as many growth factors and cellular signals as certain other regenerative therapies,” adds New Jersey-based facial plastic surgeon Dr. Jeffrey B.",
        "cn": "新泽西的面部整形外科医生Jeffrey B.说：“根据它们的来源，它们所含的生长因子和细胞信号是其他再生疗法的15到20倍。”"
      },
      {
        "en": "He points to popular platelet-rich plasma (PRP) as one such therapy, which uses concentrated platelets from a patient’s own blood to stimulate weakened follicles.",
        "cn": "他指出，流行的富血小板血浆（PRP）就是一种这样的治疗方法，它使用患者自身血液中的浓缩血小板来刺激衰弱的卵泡。"
      },
      {
        "en": "In contrast, exosomes can be harvested directly from plants or from donated animal or human cell tissue—including bone marrow and blood, but most commonly fat, amniotic fluid, and placental tissue, Dr. Wise says.",
        "cn": "怀斯博士说，相比之下，外泌体可以直接从植物或捐赠的动物或人类细胞组织中获取，包括骨髓和血液，但最常见的是脂肪、羊水和胎盘组织。"
      },
      {
        "en": "“Human and animal-derived exosomes have more direct clinical evidence for hair growth,” explains Dr. Kobets.",
        "cn": "“人类和动物来源的外泌体对毛发生长有更直接的临床证据，”Kobets博士解释说。"
      },
      {
        "en": "“Plant-derived vesicles may ultimately be easier to standardize and formulate into consumer products, but the clinical evidence is earlier.”",
        "cn": "“植物来源的囊泡最终可能更容易标准化并配制成消费品，但临床证据还很早。”"
      },
      {
        "en": "Put another way: “Human cells speak the language human follicles understand,” Dr. Halaas says.",
        "cn": "换句话说：“人类细胞会说人类卵泡能理解的语言，”哈拉斯博士说。"
      },
      {
        "en": "“The tradeoff is donor variability and higher manufacturing complexity, as well as greater regulatory scrutiny.",
        "cn": "“权衡的是供体的可变性和更高的制造复杂性，以及更严格的监管审查。"
      },
      {
        "en": "Plant-derived exosome-like vesicles are easier to produce consistently and carry no risk of human pathogen transmission.",
        "cn": "植物来源的外泌体样囊泡更容易持续生产，并且没有人类病原体传播的风险。"
      },
      {
        "en": "There is at least one randomized controlled trial of a plant extract exosome formulation showing a real increase in hair counts, but the signaling overlap with human follicle biology is less well characterized.”",
        "cn": "至少有一项植物提取物外泌体配方的随机对照试验显示，毛发数量确实增加了，但与人类毛囊生物学的信号重叠却没有得到很好的表征。”"
      },
      {
        "en": "Dr. Halaas also mentions that products containing biomimetic or lab-engineered vesicles are becoming a third category of exosome therapy that hair-growth consumers will start to see more of.",
        "cn": "哈拉斯博士还提到，含有仿生或实验室设计的囊泡的产品正在成为第三类外泌体疗法，头发生长的消费者将开始更多地看到这种疗法。"
      },
      {
        "en": "“These are designed to mimic exosome structure without being harvested from any donor cells at all, trading some biological complexity for very high batch-to-batch consistency,” she notes.",
        "cn": "她指出：“这些设计是为了模拟外泌体结构，而根本不需要从任何供体细胞中获取，以一些生物复杂性换取非常高的批间一致性。”"
      },
      {
        "en": "Because these products are not standardized, quality and sourcing can vary significantly.",
        "cn": "由于这些产品没有标准化，质量和来源可能会有很大差异。"
      }
    ]
  },
  {
    "id": "fs-beat-the-frizz-with-these-expert-loved-leave-i",
    "cat": "时尚",
    "title": "Beat The Frizz With These Expert-Loved Leave-In Conditioners",
    "titleZh": "用这些专家喜爱的免洗护发素来赶走头发的毛躁",
    "source": "ELLE · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.elle.com/beauty/hair/a73485781/best-leave-in-conditioner-for-frizzy-hair/",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/fs-beat-the-frizz-with-these-expert-loved-leave-i.jpg",
    "paras": [
      {
        "en": "Hair experts chime in with their favorite leave-in conditioners from amika, Rōz, and more.",
        "cn": "美发专家也从amika、Rōz等网站上推荐了他们最喜欢的免洗护发素。"
      },
      {
        "en": "Sure, it’s not exactly ideal and can sometimes signal a larger issue, like dryness, breakage, or humidity, but not all frizz is bad.",
        "cn": "当然，这并不完全是理想的，有时可能预示着一个更大的问题，比如干燥、破损或潮湿，但并不是所有的毛躁都是不好的。"
      },
      {
        "en": "Frizz can even add a bit of movement or volume to your hair.",
        "cn": "卷毛甚至可以让你的头发看起来更有动感和丰盈。"
      },
      {
        "en": "“It’s more about keeping the hair hydrated, manageable, and healthy depending on the style you’re trying to create,” explains celebrity hair stylist Jenny Cho.",
        "cn": "名人发型师珍妮·赵解释说：“根据你想打造的发型，更重要的是保持头发的水分、易打理和健康。”"
      },
      {
        "en": "“Frizz and dryness often go hand in hand,” says celebrity hairstylist Sabrina Rowe.",
        "cn": "名人发型师萨布丽娜·罗说：“毛躁和干燥常常相伴而行。”"
      },
      {
        "en": "“So adding hydration and conditioning can help the hair look and feel smoother and make it easier to manage.” According to Rowe, a leave-in isn’t just a styling product—it’s an “additional aid to the conditioning process.” It should give the hair moisture and slip, leaving it softer without weighing it down.",
        "cn": "“所以补充水分和护发素可以帮助头发看起来和感觉更光滑，更容易打理。”根据罗的说法，免洗护发素不仅仅是一种造型产品，它还是“护发过程的额外辅助”。它应该给头发保湿和滑溜，使头发更柔软而不会使头发下垂。"
      },
      {
        "en": "“The right leave-in can help encourage your natural texture while keeping it hydrated, controlled, and polished,” Cho says.",
        "cn": "Cho说：“正确的免洗可以帮助促进你的自然质地，同时保持水分、控制和光滑。”"
      },
      {
        "en": "“A good leave-in creates a better foundation for whatever you’re doing next, whether you’re air-drying, wearing your natural texture, blowing the hair out, or going into additional styling products,” says Rowe.",
        "cn": "罗说：“一个好的留发膏可以为你接下来做的任何事情打下更好的基础，无论是风干、保持自然发质、吹散头发，还是使用其他造型产品。”"
      },
      {
        "en": "“But first and foremost, it should leave the hair feeling better conditioned and more manageable—otherwise, what’s the point of leaving it in?”",
        "cn": "“但最重要的是，它应该让头发感觉更好，更容易打理——否则，留着头发有什么意义呢？”"
      },
      {
        "en": "You can’t just buy any leave-in conditioner, though.",
        "cn": "不过，你不能随便买免洗护发素。"
      },
      {
        "en": "Frizz is caused by a variety of different things: humidity, breakage, or just the general curl of your hair.",
        "cn": "毛躁是由各种不同的原因造成的：湿度、断裂，或者只是头发的一般卷曲。"
      },
      {
        "en": "The best leave-in conditioner for you will target and fix that cause.",
        "cn": "最好的免洗护发素会针对并解决这个问题。"
      },
      {
        "en": "Whether you’ve got heat damage or just don’t want to deal with the humidity clinging to your every strand, we sourced the seven best leave-in conditioners for all kinds of frizzy hair.",
        "cn": "无论你是受到了热损伤，还是只是不想处理每根头发上的湿气，我们都为你挑选了七种最好的免洗护发素，适用于各种卷曲的头发。"
      },
      {
        "en": "A blend of oils and honey creates a lightweight formula that defines curls while locking in moisture.",
        "cn": "油和蜂蜜的混合物创造了一个轻量级的配方，定义卷发，同时锁住水分。"
      },
      {
        "en": "Simply massage into your hair and allow it to enhance what’s already there.",
        "cn": "简单地按摩你的头发，让它增强已经存在的东西。"
      },
      {
        "en": "Expert review: “I don’t want controlling frizz to mean suppressing someone’s curl pattern or taking away all of their volume.",
        "cn": "专家评论：“我不希望控制头发卷曲意味着抑制某人的卷发模式，或者把他们的头发全部卷掉。"
      },
      {
        "en": "Ingredients like camellia japonica seed oil, argan oil, and kelp extract make UNOVE’s Ampule Treatment especially great for rehydrating and repairing thick, coarse, and damaged hair.",
        "cn": "山茶花籽油、摩洛哥坚果油和海带提取物等成分使UNOVE的安珀护理产品特别适合滋润和修复浓密、粗糙和受损的头发。"
      },
      {
        "en": "It works like a spray, meaning it’s super lightweight and doesn’t require any washing.",
        "cn": "它像喷雾一样工作，这意味着它非常轻，不需要任何洗涤。"
      },
      {
        "en": "Key Ingredients: Camellia japonica seed oil, argan oil, and kelp extract Sizes: 6.76 fl oz",
        "cn": "主要成分：山茶籽油，摩洛哥坚果油，海带提取物；大小：6.76液盎司"
      },
      {
        "en": "Expert review: “It’s great for detangling and helps with adding softness; it also minimizes frizz while also giving heat protection, which is important to me because so many of us are using a blow dryer and hot tools after we wash our hair.",
        "cn": "专家点评：“能很好地梳理头发，并有助于增加柔软度；它还能最大限度地减少毛躁，同时提供热保护，这对我来说很重要，因为我们很多人在洗完头发后都会使用吹风机和热工具。"
      },
      {
        "en": "I especially like this type of leave-in for damaged, color-treated, or heat-styled hair because you get that conditioning without having to use a heavy cream.” — Jenny Cho, celebrity hair stylist",
        "cn": "对于受损、染发或烫发的头发，我特别喜欢这种留发方式，因为你不需要使用浓奶油就能得到护发效果。”- Jenny Cho，明星发型师"
      }
    ]
  },
  {
    "id": "fs-the-20-best-square-nail-designs-to-try-this-fa",
    "cat": "时尚",
    "title": "The 20 Best Square Nail Designs to Try This Fall",
    "titleZh": "今年秋天值得一试的 20 款最佳方形美甲",
    "source": "Harper's Bazaar · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.harpersbazaar.com/beauty/nails/g73644875/amal-clooney-short-nail-ideas/",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/fs-the-20-best-square-nail-designs-to-try-this-fa.jpg",
    "paras": [
      {
        "en": "Whether you’re switching to a neatly clipped finish for fall or have always preferred a flattering, minimalist nail shape, short nails have emerged as this season’s most unexpected manicure trend.",
        "cn": "不管你是想在秋天把指甲修剪得整整齐齐，还是一直喜欢讨人喜欢、极简主义的指甲形状，短指甲已经成为本季最意想不到的美甲趋势。"
      },
      {
        "en": "After years of maximalist talons dominating both the red carpet and the runway, a sleek shape that barely extends past your fingertips is now the chicest way to style your nails in 2026, as Amal Clooney proved during a recent appearance in Venice.",
        "cn": "阿迈勒·克鲁尼（Amal Clooney）最近在威尼斯的一次亮相证明，多年来，极简主义风格的指甲在红毯和t台上一直占据主导地位，如今，2026年最时尚的指甲造型是略过指尖的光滑造型。"
      },
      {
        "en": "Clooney became the latest celebrity to embrace the natural-manicure trend yesterday, showcasing a set of freshly trimmed, milky-pink nails while sailing into the destination.",
        "cn": "克鲁尼昨天成为最新一个拥抱自然美甲潮流的名人，他在前往目的地时展示了一组刚修剪过的乳白色指甲。"
      },
      {
        "en": "“While we love a long and bold statement nail look, the short manicure remains a timeless classic, offering an understated, chic, and, frankly, more practical alternative to length,” says Daisy Kalnina, founder of The Gel Bottle.",
        "cn": "the Gel Bottle的创始人黛西·卡尔尼娜（Daisy Kalnina）说：“虽然我们喜欢大胆的长指甲，但短指甲仍然是永恒的经典，它提供了一种低调、别致、坦率地说，比长指甲更实用的选择。”"
      },
      {
        "en": "“To perfect the look, it’s all about shape and prep.",
        "cn": "“想要完美的造型，关键在于造型和准备。"
      },
      {
        "en": "File the nail into your preferred shape; soft “squoval” or rounded work well to complement the natural curve of your fingertip, and always push back and perfectly tidy the cuticle area —this instantly elongates the nail bed and maximises the canvas, even when the length is minimal.”",
        "cn": "把钉子锉成你喜欢的形状；柔软的“方形”或圆形指甲可以很好地配合指尖的自然曲线，并且总是向后推，完美地整理角质层区域——这样可以立即拉长指甲床，最大化指甲长度，即使指甲长度很短。”"
      },
      {
        "en": "When it comes to trends, short nails are not exempt from fleeting patterns and coveted fall colors.",
        "cn": "说到流行趋势，短指甲也不能幸免于转瞬即逝的图案和令人垂涎的秋天颜色。"
      },
      {
        "en": "Below, Kalnina outlines the leading trends to note for the season.",
        "cn": "下面，Kalnina概述了本季的主要趋势。"
      },
      {
        "en": "“For the upcoming season, we’re seeing a massive surge toward deep, comforting color palettes,” she says.",
        "cn": "她说：“在即将到来的一季，我们将看到人们对深色调、舒适色调的大量偏好。”"
      },
      {
        "en": "“Browns are proving undeniably popular, ranging from rich espresso and chocolates, including Brunette, Chocolate, and Mocha (all in our top searches for October), along with cooler, creamy tones like Suede.",
        "cn": "毫无疑问，棕色很受欢迎，从浓咖啡和巧克力，包括褐发、巧克力和摩卡（都在我们10月份的热门搜索榜上），还有凉爽的奶油色，比如麂皮。"
      },
      {
        "en": "These shades are versatile and luxurious, and they look incredible on all skin tones.",
        "cn": "这些颜色是通用的和豪华的，他们看起来不可思议的所有肤色。"
      },
      {
        "en": "Beyond browns, deep, vampy reds and burgundies remain popular for this time of year, but we’re also seeing a lot of metallic accents.",
        "cn": "除了棕色，深沉的、吸血鬼般的红色和勃艮第色在每年的这个时候仍然很受欢迎，但我们也看到了很多金属色调。"
      },
      {
        "en": "For short nails, we love a perfectly executed, solid-toned mani for a polished, minimalist aesthetic that works every time.”",
        "cn": "对于短指甲，我们喜欢完美的、纯色调的指甲，这是一种抛光的、极简主义的美学，每次都能奏效。”"
      },
      {
        "en": "Below, find the 20 best short nail designs for a tidy, modern manicure that doesn’t compromise on comfort or convenience.",
        "cn": "下面是20种最好的短指甲设计，让你既整洁又现代，又不牺牲舒适和方便。"
      },
      {
        "en": "A fine, chocolate-toned French tip puts a playful twist on this ever-timeless nail design.",
        "cn": "精致的巧克力色法式指甲为这款永不过时的美甲设计增添了俏皮的色彩。"
      },
      {
        "en": "Elevate your bare manicure with a sheer wash of rose-hued color; it adds a healthy tint and shine to otherwise pared-back tips.",
        "cn": "用玫瑰色的纯水洗一下你裸露的指甲；它可以为原本稀疏的头发增添健康的色泽和光泽。"
      },
      {
        "en": "Tortoiseshell nails are perfect for autumn.",
        "cn": "玳瑁甲非常适合秋天。"
      },
      {
        "en": "Get creative with this classic style by adding a matte top coat or gold accents for a delicate, modern update.",
        "cn": "通过添加哑光面漆或金色口音来获得这种经典风格的创意，以获得精致，现代的更新。"
      },
      {
        "en": "If noir nails veer too gothic, try an ultra-deep adjacent shade for a rich color that looks sophisticated and glossy.",
        "cn": "如果黑色指甲太过哥特式，那就试试超深的相邻色调，这样颜色会显得丰富而有光泽。"
      },
      {
        "en": "Pay extra attention to your cuticles during the colder months when skin becomes prone to dryness and flaking.",
        "cn": "在寒冷的月份要特别注意你的角质层，因为皮肤容易干燥和脱落。"
      },
      {
        "en": "A simple, glazed manicure will maintain your nails’ health while giving a chic polish to any look.",
        "cn": "简单的上釉美甲既能保持指甲健康，又能给任何造型带来别致的光泽。"
      },
      {
        "en": "A copper-toned manicure is the most elevated autumn choice when it comes to modern metallic shades.",
        "cn": "说到现代金属色调，古铜色的美甲是秋天最高贵的选择。"
      }
    ]
  },
  {
    "id": "fs-two-tone-shoes-will-always-be-elegant",
    "cat": "时尚",
    "title": "Two-Tone Shoes Will Always Be Elegant",
    "titleZh": "双色的鞋子永远是优雅的",
    "source": "Harper's Bazaar · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 2,
    "url": "https://www.harpersbazaar.com/fashion/trends/a73607538/cap-toe-shoes-trend/",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/fs-two-tone-shoes-will-always-be-elegant.jpg",
    "paras": [
      {
        "en": "In 1957, Gabrielle Chanel introduced a shoe that would go on to become an emblem of the house and an icon in the fashion world: the two-tone slingback pump.",
        "cn": "1957年，加布里埃尔·香奈儿（Gabrielle Chanel）推出了一款鞋，它后来成为了香奈儿的标志和时尚界的标志：双色露跟鞋。"
      },
      {
        "en": "The premise behind the sleek style—which was brought to life in collaboration with shoemaker Massaro—was that beige leather elongates the legs, while a black tip makes the foot appear smaller.",
        "cn": "这款与鞋匠马萨罗（massaro）合作推出的时尚款式背后的前提是，米色皮革拉长了腿，而黑色鞋头使脚看起来更小。"
      },
      {
        "en": "Nearly 70 years later, the two-tone motif still telegraphs a sense of everyday elegance.",
        "cn": "近70年后，双色主题仍然传达出日常优雅的感觉。"
      },
      {
        "en": "Ferragamo’s Maximilian Davis offered pointed pumps that “ recall nautical codes \" with their cream-and-black color schemes, while Isabel Marant took a splashier stance by splicing together colorful shades of snakeskin-embossed leather.",
        "cn": "菲拉格慕（Ferragamo）的马西米利安·戴维斯（Maximilian Davis）推出了奶油色和黑色配色的尖头高跟鞋，“让人想起航海规则”，而伊莎贝尔·玛兰（Isabel Marant）则采取了更引人注目的姿态，将色彩缤纷的蛇皮浮雕皮革拼接在一起。"
      },
      {
        "en": "Of course, numerous brands have reinterpreted the two-tone shoe over the last several decades.",
        "cn": "当然，在过去的几十年里，许多品牌重新诠释了双色鞋。"
      },
      {
        "en": "Ballet flats are a popular silhouette, but slingbacks and traditional pumps are also in frequent rotation.",
        "cn": "芭蕾平底鞋是流行的款式，但露跟鞋和传统的高跟鞋也经常出现。"
      },
      {
        "en": "The same goes for palette and texture, with materials like tweed, suede, and patent leather designed in varying color combinations.",
        "cn": "色调和质地也是如此，粗花呢、麂皮和漆皮等材料设计成不同的颜色组合。"
      },
      {
        "en": "For more than 150 years, Harper’s Bazaar has been the preeminent fashion, beauty, and lifestyle resource for women at every age.",
        "cn": "150多年来，《时尚芭莎》一直是各年龄段女性卓越的时尚、美容和生活方式资源。"
      },
      {
        "en": "We cover what’s new and what’s next in fashion by working with the world’s leading authorities in ready-to-wear, footwear, accessories, and more.",
        "cn": "我们通过与成衣、鞋类、配饰等领域的世界领先权威机构合作，报道时尚领域的新动向和新趋势。"
      },
      {
        "en": "Every story we publish has been thoroughly researched and vetted by our team of editors and industry experts.",
        "cn": "我们发布的每一个故事都经过我们的编辑团队和行业专家的彻底研究和审查。"
      }
    ]
  },
  {
    "id": "fs-the-biggest-hair-color-trends-of-fall-2026-are",
    "cat": "时尚",
    "title": "The Biggest Hair Color Trends of Fall 2026 Are Lived-in and Low-Maintenance, According to Pros",
    "titleZh": "专业人士说，2026 秋季最大的染发趋势是免打理",
    "source": "Cosmopolitan · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.cosmopolitan.com/style-beauty/beauty/a73643155/fall-hair-color-trends-2026/",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/fs-the-biggest-hair-color-trends-of-fall-2026-are.jpg",
    "paras": [
      {
        "en": "Listen, if it’s not broke, don’t fix it.",
        "cn": "听着，如果没坏，就别修。"
      },
      {
        "en": "That’s my motto when it comes to hair color these days.",
        "cn": "这是我最近在染发方面的座右铭。"
      },
      {
        "en": "But fall has me changing my tune.",
        "cn": "但是秋天让我改变了我的调子。"
      },
      {
        "en": "Lived-in, smudgy vibes are taking over, hairstylist Meri Kate O’Connor tells me, making way for fall hair color trends that don’t require nearly as much salon maintenance.",
        "cn": "发型师梅里·凯特·奥康纳（Meri Kate O’connor）告诉我，居家、邋遢的氛围正在占据主导地位，让位于不需要那么多美发沙龙保养的秋季染发趋势。"
      },
      {
        "en": "“We’re seeing more blended looks that seamlessly add depth, warmth, and dimension—kind of like enhancing what you already have to match the season,” she says.",
        "cn": "她说：“我们看到越来越多的混合造型无缝地增加了深度、温暖和空间感——有点像为搭配这个季节而强化你已有的服装。”"
      },
      {
        "en": "If I don’t have to spend as much time in the chair, then why not reimagine my color for the cooler weather?",
        "cn": "如果我不必花那么多时间坐在椅子上，那么为什么不重新想象一下我的颜色，以适应凉爽的天气呢？"
      },
      {
        "en": "No matter your color, O’Connor says that glossy hair will be key to transitioning your hue for fall.",
        "cn": "奥康纳说，不管你的肤色是什么，有光泽的头发将是秋季转变色调的关键。"
      },
      {
        "en": "“Everyone’s obsessed with shiny, glossy-looking hair this season, which can make color look better and hair healthier overall,” she explains.",
        "cn": "她解释说：“这个季节每个人都痴迷于有光泽、有光泽的头发，这可以让头发的颜色看起来更好，整体上更健康。”"
      },
      {
        "en": "From spicy copper to pop star pink to maple cream blonde, fall’s biggest hair colors are right around the corner.",
        "cn": "从辣铜色到流行粉色再到枫奶油金色，秋天最流行的发色即将到来。"
      },
      {
        "en": "I polled some of the biggest hair colorists in the business on what they’re excited about (and already getting requests for).",
        "cn": "我调查了业内一些最大的染发师，问他们最感兴趣的是什么（以及已经收到的要求）。"
      },
      {
        "en": "“Spiced Smudge is really a response to the shift we’re seeing away from overly bright, high-maintenance color,” says hairstylist Sara Botsford.",
        "cn": "发型师萨拉·博茨福德说：“我们看到，过度鲜艳、需要保养的头发颜色越来越少，香料涂抹是对这种趋势的回应。”"
      },
      {
        "en": "“Clients still want dimension, but they want it to feel richer, softer, and more expensive,” she adds, which is exactly where the “spiced smudge” technique comes from.",
        "cn": "她补充说：“客户仍然想要尺寸，但他们希望感觉更丰富、更柔软、更昂贵。”这正是“香料涂抹”技术的来源。"
      },
      {
        "en": "It’s a warmer take on the classic root smudge (which allows your hair to grow out more evenly with less maintenance).",
        "cn": "它比传统的发根涂抹更温暖（发根涂抹可以让你的头发长得更均匀，更少保养）。"
      },
      {
        "en": "“It’s warm without being overly copper and dimensional without needing to be blonde, which makes it incredibly wearable,” Botsford says.",
        "cn": "博茨福德说：“它既温暖，又不会过于古铜色，也不需要金黄色，这让它非常适合穿。”"
      },
      {
        "en": "“The key is keeping depth at the base and weaving warmth through the mids and ends so the color feels melted together instead of striped or overly highlighted.” In her salon in Denver, CO, she opts for Redken Shades ALK and Cover Fusion (which is great for grays).",
        "cn": "“关键是在底部保持深度，在中间和末端编织温暖，这样颜色就会融合在一起，而不是条纹或过分突出。”在她位于科罗拉多州丹佛市的沙龙里，她选择了Redken Shades ALK和Cover Fusion（非常适合灰色）。"
      },
      {
        "en": "“I always recommend bringing inspiration photos, but also talking about how warm you’re comfortable going,” she says.",
        "cn": "她说：“我总是建议你带上一些鼓舞人心的照片，但同时也要告诉他们你感到有多温暖。”"
      },
      {
        "en": "“Your stylist can customize the exact spice level to complement your skin tone, starting level, and maintenance goals.”",
        "cn": "“你的发型师可以根据你的肤色、初始水平和保养目标定制准确的香料水平。”"
      },
      {
        "en": "Dimensional blondes and brondes are high on the list for fall, according to O’Connor.",
        "cn": "奥康纳说，多维度的金发女郎和青铜色女郎是秋季的热门人选。"
      },
      {
        "en": "“we are moving away from summer blonde now,” she says.",
        "cn": "她说：“我们现在正在远离夏日金发。”"
      },
      {
        "en": "“Gold, honey, and caramel tones are a nice way to tone down brighter, cooler blondes while still staying blonde into the fall.”",
        "cn": "“金色、蜂蜜色和焦糖色都是让金发更亮、更酷的好方法，同时在秋天也能保持金发。”"
      },
      {
        "en": "This creamy, dark-blonde shade on Kristen Bell totally fits the bill.",
        "cn": "克里斯汀·贝尔身上这款奶油色的深金色眼影完全符合她的要求。"
      },
      {
        "en": "Ask your stylist for a smudgey root (this will majorly extend your time between salon visits), then “ask for blended dimension, i.e. lowlights, in a shade or two darker than what you have and a warmer-toned gloss,” says O’Connor.",
        "cn": "让你的发型师把头发弄脏一点（这将大大延长你两次去沙龙的时间），然后“要求混合色调，比如浅色的，比你现有的颜色深一两层，颜色更暖一点，”奥康纳说。"
      },
      {
        "en": "“This will change up your color while still keeping it natural and not being drastic.”",
        "cn": "“这会改变你的肤色，同时保持自然而不夸张。”"
      }
    ]
  },
  {
    "id": "fs-jennifer-aniston-s-japanese-manicure-is-the-ch",
    "cat": "时尚",
    "title": "Jennifer Aniston’s Japanese Manicure Is the Chicest Low-Maintenance Nail Trend of 2026—Here’s How to Recreate the Look",
    "titleZh": "詹妮弗·安妮斯顿的日式美甲是 2026 最火的免打理趋势——教你复刻",
    "source": "Cosmopolitan · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 3,
    "url": "https://www.cosmopolitan.com/style-beauty/beauty/a73657889/jennifer-aniston-japanese-manicure/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fs-jennifer-aniston-s-japanese-manicure-is-the-ch.jpg",
    "paras": [
      {
        "en": "Jennifer Aniston has spent decades cementing herself as the hair muse—from 'The Rachel' to her famously glossy, face-framing layers.",
        "cn": "珍妮弗·安妮斯顿（Jennifer Aniston）花了几十年时间巩固自己的发型缪斯地位——从“瑞秋”（the Rachel）到她那出了名的有光泽的、修饰脸型的分层发型。"
      },
      {
        "en": "But her latest beauty move has officially put her on nail-muse duty, too.",
        "cn": "但她最近的美容举动也让她正式承担起美甲缪斯的责任。"
      },
      {
        "en": "Honestly, is there anything this woman can't do?",
        "cn": "老实说，这女人有什么做不到的吗？"
      },
      {
        "en": "The look in question came to us when the actor was spotted filming for The Morning Show in Times Square.",
        "cn": "当这位演员在时代广场拍摄《晨间秀》时，我们发现了他的造型。"
      },
      {
        "en": "Short, natural, and buffed to a healthy-looking sheen.",
        "cn": "短的，自然的，被打磨成健康的光泽。"
      },
      {
        "en": "So, in other words, very Jen An.",
        "cn": "所以，换句话说，非常珍安。"
      },
      {
        "en": "Now, unlike your standard polish or gel appointment, this centuries-old Japanese technique is less about adding color and more about making your actual nails look ridiculously healthy and shiny.",
        "cn": "现在，与你的标准指甲油或凝胶预约不同，这种有几个世纪历史的日本技术不是为了增加颜色，而是为了让你的指甲看起来健康而闪亮。"
      },
      {
        "en": "The nails are shaped, the cuticles tidied, and the surface gently buffed before a mineral-rich paste and powder are worked into the nail.",
        "cn": "指甲被塑形，角质层被整理，表面被轻轻打磨，然后一种富含矿物质的膏体和粉末被加工到指甲上。"
      },
      {
        "en": "Now, because there's no UV lamp, gel, or elaborate nail art involved, it's surprisingly easy to recreate at home.",
        "cn": "现在，由于不需要紫外线灯、凝胶或复杂的美甲工艺，在家就可以轻松制作。"
      },
      {
        "en": "Invest in a decent nail-care kit with a buffer, cuticle tools, and nail oil, and you can give yourself the same glossy set without booking an appointment.",
        "cn": "买一个像样的指甲护理包，里面有缓冲液、角质层工具和指甲油，你可以不用预约就能让自己拥有同样有光泽的指甲。"
      },
      {
        "en": "Kate Middleton is also a fan of the barely-there finish, proving that sometimes the chicest nail statement is simply...having very nice nails.",
        "cn": "凯特·米德尔顿（Kate Middleton）也喜欢几乎不留尾饰，这证明有时候最时髦的美甲风格很简单……指甲很漂亮。"
      },
      {
        "en": "At this point, I've given you two celebrity endorsements, nail-health benefits, longevity, and the promise of doing it from your sofa.",
        "cn": "在这一点上，我给了你两个名人代言，指甲健康的好处，长寿，并承诺在你的沙发上做。"
      },
      {
        "en": "So, really, what more excuse do you need?",
        "cn": "所以，说真的，你还需要什么借口？"
      },
      {
        "en": "Lia Mappoura (she/her) is the Beauty Writer at Cosmopolitan UK, with over four years of experience reporting across the brand's print, social, video and digital platforms.",
        "cn": "Lia Mappoura（她/她）是《Cosmopolitan》英国版的美妆撰稿人，在该品牌的印刷、社交、视频和数字平台上拥有超过四年的报道经验。"
      },
      {
        "en": "Lia covers everything from emerging trend analysis to viral celebrity hair and makeup moments, making her an expert at spotting the season’s next big beauty look (before it takes over social media feeds).",
        "cn": "Lia涵盖了从新兴趋势分析到走红的明星发型和化妆瞬间的所有内容，使她成为发现本季下一个大美女造型的专家（在它占领社交媒体之前）。"
      },
      {
        "en": "In 2025, she was named The Rising Media Star at the Love Perfume Awards with The Perfume Shop, recognised for her outstanding digital fragrance content and for building genuine authority within the space.",
        "cn": "2025年，她与The Perfume Shop一起被评为“爱香水奖”（Love Perfume Awards）的冉冉升起的媒体之星，因其出色的数字香水内容和在该领域建立真正的权威而得到认可。"
      },
      {
        "en": "She is passionate about challenging outdated beauty stereotypes, championing inclusive representation in beauty, and educating readers on the trends, products and conversations shaping the industry today.",
        "cn": "她热衷于挑战过时的美容刻板印象，倡导包容性的美容代表，并向读者介绍当今塑造行业的趋势、产品和对话。"
      },
      {
        "en": "Follow her on Instagram or find her on LinkedIn.",
        "cn": "在Instagram上关注她，或者在LinkedIn上找到她。"
      }
    ]
  },
  {
    "id": "fs-safe-word-the-best-jewelry-launches-of-septemb",
    "cat": "时尚",
    "title": "Safe Word: The Best Jewelry Launches of September 2026",
    "titleZh": "暗号：2026 年 9 月最佳珠宝新品",
    "source": "ELLE · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.elle.com/fashion/jewelry/a73455762/best-jewelry-launches-september-2026/",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/fs-safe-word-the-best-jewelry-launches-of-septemb.jpg",
    "paras": [
      {
        "en": "Safe Word is a series highlighting the latest trends in the jewelry market, keeping you up to date on all things that sparkle and shine.",
        "cn": "安全词汇是一个系列，突出了珠宝市场的最新趋势，让你在所有闪耀和闪耀的东西上保持最新。"
      },
      {
        "en": "As summer comes to a close and we look toward fall, jewelry designers are celebrating major milestones and finding fresh ways to breathe new life into familiar signatures.",
        "cn": "随着夏天的结束，我们期待着秋天，珠宝设计师们正在庆祝重要的里程碑，并寻找新的方法为熟悉的签名注入新的生命。"
      },
      {
        "en": "September is all about exploring color, contrast, and nature, as some of the industry’s most recognizable motifs are reimagined through unexpected materials and techniques.",
        "cn": "九月的主题是探索色彩、对比和自然，因为一些业内最知名的主题通过意想不到的材料和技术被重新想象。"
      },
      {
        "en": "To begin, Van Cleef & Arpels gives its iconic Alhambra a vibrant update with translucent pink enamel, while Boucheron returns to its archives with “Lierre de Paris,” transforming Frédéric Boucheron’s beloved ivy motif into diamond-pavéd designs.",
        "cn": "首先，梵克雅宝（Van Cleef & Arpels）用半透明的粉色珐琅对其标志性的阿尔罕布拉宫（Alhambra）进行了充满活力的更新，而宝诗龙（Boucheron）则以“Lierre de Paris”回归其档案，将fracimdsamric Boucheron心爱的常春藤图案转化为钻石pavemadrid设计。"
      },
      {
        "en": "Pearls meet their dark side in Melanie Georgacopoulos’s “Eclipse” collection, which pairs luminous pearls with contrasting onyx, while Robinson Pelham celebrates its 30th anniversary with a month-long residency at TROVE in New York, showcasing everything from archival ’90s designs to one-of-a-kind pieces and new collections.",
        "cn": "在Melanie Georgacopoulos的“Eclipse”系列中，珍珠展现了它们的阴面，该系列将发光的珍珠与对比鲜明的缟玛石搭配在一起。Robinson Pelham在纽约TROVE举办了为期一个月的驻地展，庆祝其30周年纪念，展示了从90年代的档案设计到独一无二的作品和新系列。"
      },
      {
        "en": "Gucci revisits its equestrian roots with a new Horsebit fine jewelry and watch collection, giving the iconic house code a fresh update in diamonds and gold, while Louis Vuitton brings a bold dose of color to its signature Tambour Spin Time with five new additions to the permanent collection.",
        "cn": "古驰（Gucci）以全新的Horsebit高级珠宝和腕表系列重温其马术渊源，以钻石和黄金为标志性的品牌代码进行了全新的更新，而路易威登（Louis Vuitton）则为其标志性的Tambour Spin Time带来了大胆的色彩，为其永久系列增添了五款新产品。"
      },
      {
        "en": "Finally, ME+EM expands its accessories world with Atelier.",
        "cn": "最后，ME+EM通过Atelier拓展了其配件领域。"
      },
      {
        "en": "From anniversary celebrations to colorful updates, September is shaping up to be an exciting month in jewelry.",
        "cn": "从周年庆典到丰富多彩的更新，9月将成为珠宝界令人兴奋的一个月。"
      },
      {
        "en": "Van Cleef & Arpels is giving its iconic Alhambra motif a vibrant new look.",
        "cn": "梵克雅宝（Van Cleef & Arpels）赋予其标志性的阿尔罕布拉（Alhambra）主题一个充满活力的新面貌。"
      },
      {
        "en": "First introduced in 1968 and inspired by the four-leaf clover, the house signature has been reimagined over the decades in everything from mother-of-pearl and onyx to guilloché gold.",
        "cn": "该品牌于1968年首次推出，灵感来自四叶草，几十年来，从珍珠母贝、玛瑙到guilloché金，该品牌的标志被重新设计。"
      },
      {
        "en": "Now the maison is bringing a fresh burst of color to the collection with five new Vintage Alhambra and Magic Alhambra designs crafted in translucent pink enamel.",
        "cn": "现在，该品牌为该系列带来了全新的色彩，推出了五款全新的复古阿尔罕布拉和魔法阿尔罕布拉设计，采用半透明的粉红色珐琅制作。"
      },
      {
        "en": "Developed over several years in Van Cleef & Arpels’ workshops using a technique inspired by the 17th-century “gold-ruby” process, the vivid hue gets its color from fine gold particles rather than pigments.",
        "cn": "梵克雅宝（Van Cleef & Arpels）的工作室用了几年的时间，采用了一种受17世纪“金红宝石”工艺启发的技术，这种鲜艳的色调是由精细的金颗粒而不是颜料产生的。"
      },
      {
        "en": "Tiny bubbles give each motif added depth, while curved surfaces enhance the enamel’s light-reflecting finish.",
        "cn": "微小的气泡增加了每个图案的深度，而弯曲的表面增强了珐琅的反射光效果。"
      },
      {
        "en": "The five new pieces—a long necklace, necklace, pendant, bracelet, and earrings—pair the house’s lucky clover with a bold wash of pink that feels both fresh and unmistakably Alhambra.",
        "cn": "这五件新品——长项链、项链、吊坠、手镯和耳环——将房子的幸运三叶草与大胆的粉色搭配在一起，既新鲜又明确无误。"
      },
      {
        "en": "ME+EM is expanding its accessories lineup with “Atelier,” a new 15-piece jewelry collection that brings the brand’s signature approach to functional dressing into the jewelry box.",
        "cn": "ME+EM正以“Atelier”扩大其配饰阵容，这是一个新的15件珠宝系列，将该品牌的标志性功能装扮方法带入首饰盒。"
      },
      {
        "en": "Designed in London and handmade in Italy from 24K gold plate, the collection pairs sculptural shapes with clever details designed to offer multiple ways to wear each piece.",
        "cn": "该系列在伦敦设计，在意大利手工制作，采用24K金板材，将雕塑形状与巧妙的细节搭配在一起，为每件作品提供多种佩戴方式。"
      },
      {
        "en": "Detachable pendant earrings can be transformed into three different styles.",
        "cn": "可拆卸的吊坠耳环可以变成三种不同的风格。"
      },
      {
        "en": "Adjustable necklaces adapt to different necklines, while pared-back cuffs, stacking rings, and necklaces are made for easy layering.",
        "cn": "可调节的项链适应不同的领口，而缩减袖口，堆叠戒指，项链是为了方便分层。"
      },
      {
        "en": "Launching this September, the collection offers a polished finishing touch designed to move effortlessly between outfits.",
        "cn": "该系列将于今年9月推出，提供了一种精致的画龙点睛的设计，可以毫不费力地在不同的服装之间切换。"
      },
      {
        "en": "Louis Vuitton is bringing bold color to its watchmaking lineup with five new Tambour Spin Time references joining the permanent collection.",
        "cn": "路易威登（Louis Vuitton）为其制表系列带来了大胆的色彩，五款新的Tambour Spin Time系列加入了其永久系列。"
      },
      {
        "en": "Originally introduced in 2009, the Spin Time takes inspiration from the mechanical departure boards once found in airports and train stations, translating their movement onto the wrist through 12 rotating cubes that mark the passing hours.",
        "cn": "Spin Time最初于2009年推出，灵感来自机场和火车站的机械出发板，通过12个旋转立方体将其运动转化为手腕，标志着过去的时间。"
      },
      {
        "en": "The latest lineup plays with color and material through deep green, iridescent Australian opal, signature blue, salmon, and precious metals including white gold, rose gold, and platinum.",
        "cn": "最新的系列在颜色和材质上发挥了作用，包括深绿色、彩虹色澳大利亚蛋白石、标志性蓝色、鲑鱼色以及白金、玫瑰金和铂金等贵金属。"
      }
    ]
  },
  {
    "id": "fs-see-every-major-red-carpet-look-from-the-2026-",
    "cat": "时尚",
    "title": "See Every Major Red Carpet Look From the 2026 Venice Film Festival",
    "titleZh": "看看2026年威尼斯电影节的每一个主要红毯造型",
    "source": "ELLE · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 3,
    "url": "https://www.elle.com/fashion/celebrity-style/a73571699/all-the-looks-photos-venice-film-festival-2026/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/fs-see-every-major-red-carpet-look-from-the-2026-.jpg",
    "paras": [
      {
        "en": "We rounded up the best-dressed stars and buzziest designer looks from the Lido.",
        "cn": "我们从丽都酒店收集了最佳着装明星和最时髦的设计师造型。"
      },
      {
        "en": "There’s something about the Venice Film Festival that makes every red carpet entrance feel especially cinematic.",
        "cn": "威尼斯电影节有一种特殊的感觉，让每一次红毯亮相都显得特别电影化。"
      },
      {
        "en": "Maybe it’s the water taxis, the grand palazzos, or the fact that the festival has long attracted stars with a taste for fashion as considered as the films they’re there to promote.",
        "cn": "也许是因为水上出租车，也许是因为宏伟的宫殿，也许是因为这个电影节长期以来一直吸引着那些对时尚有品味的明星，就像他们在那里宣传的电影一样。"
      },
      {
        "en": "This year, the 83rd Venice Film Festival welcomes a typically starry lineup, from Penélope Cruz and Javier Bardem to Dakota Johnson, Alicia Vikander, and Robert Pattinson.",
        "cn": "今年，第83届威尼斯电影节迎来了典型的明星阵容，从彭文杰·克鲁兹、哈维尔·巴登到达科塔·约翰逊、艾丽西亚·维坎德和罗伯特·帕丁森。"
      },
      {
        "en": "The slate, as usual, features awards-season hopefuls from leading auteurs, including Martin McDonagh’s dark comedy Wild Horse Nine, Bucking Fastard with real-life sisters Rooney and Kate Mara, and Florian Zeller’s Bunker, starring Cruz and Bardem.",
        "cn": "和往常一样，今年的提名名单上有很多大导演的热门作品，包括马丁·麦克唐纳执导的黑色喜剧《野马九号》、现实生活中的姐妹鲁尼和凯特·玛拉主演的《巴克·法斯塔德》，以及克鲁兹和巴登主演的弗洛里安·泽勒执导的《邦克》。"
      },
      {
        "en": "George Clooney—whose trips to Venice with his wife, international human rights lawyer Amal Clooney, are always a sight to behold—is set to receive the Golden Lion for Lifetime Achievement, as is actress Ellen Burstyn.",
        "cn": "乔治·克鲁尼和他的妻子，国际人权律师阿迈勒·克鲁尼的威尼斯之行总是引人注目。乔治·克鲁尼将获得金狮奖终身成就奖，女演员艾伦·伯斯汀也将获得此奖。"
      },
      {
        "en": "Maggie Gyllenhaal will lead this year’s jury, which includes composer and artist Daniel Blumberg, French director and screenwriter Xavier Giannoli, and producer Johnnie To.",
        "cn": "玛吉·吉伦哈尔将领导今年的评审团，评审团成员包括作曲家兼艺术家丹尼尔·布隆伯格、法国导演兼编剧泽维尔·扬诺里和制片人杜琪峰。"
      },
      {
        "en": "Gyllenhaal’s directorial debut, The Lost Daughter, won Best Screenplay at the festival in 2021.",
        "cn": "吉伦哈尔的导演处女作《迷失的女儿》在2021年的电影节上获得了最佳剧本奖。"
      },
      {
        "en": "As always, the 2026 red carpet is sure to be one worth watching.",
        "cn": "一如既往，2026年的红毯肯定是值得一看的。"
      },
      {
        "en": "Not only are major stars from the worlds of fashion and film due to attend, but in recent years, the festival has become a place where designers can preview their latest collections before fashion month officially begins.",
        "cn": "不仅有来自时尚界和电影界的主要明星出席，而且近年来，这个节日已经成为设计师们在时装月正式开始之前预览他们最新作品的地方。"
      },
      {
        "en": "In 2025, Louise Trotter, Jonathan Anderson, and Matthieu Blazy all offered early looks at their creations for Bottega Veneta, Dior, and Chanel.",
        "cn": "2025年，路易斯·特罗特、乔纳森·安德森和马修·布拉齐都抢先展示了他们为宝缇嘉、迪奥和香奈儿设计的作品。"
      },
      {
        "en": "Might Pieter Mulier’s new vision for Versace continue to take shape on the red carpet?",
        "cn": "彼得·穆利尔（Pieter Mulier）对范思哲（Versace）的新设想会在红毯上继续成形吗？"
      },
      {
        "en": "In vintage Dolce & Gabbana at The Echo Chamber screening on September 6.",
        "cn": "9月6日，杜嘉班纳在回声室的放映会上。"
      },
      {
        "en": "Pattinson in Dior and a Jaeger-LeCoultre watch, and Waterhouse in Saint Laurent at the Primetime screening on September 5.",
        "cn": "帕丁森在9月5日的黄金时段放映会上身穿迪奥和积家手表，沃特豪斯身穿圣罗兰。"
      },
      {
        "en": "Peltz Beckham in Balenciaga at the Kinéo Awards red carpet on September 5.",
        "cn": "9月5日，佩尔茨·贝克汉姆身着Balenciaga服装出席金萨梅奖红毯。"
      },
      {
        "en": "In Chanel at the Mr. Nelson, Did You Kill People?",
        "cn": "在纳尔逊先生的香奈儿，你杀人了吗？"
      }
    ]
  },
  {
    "id": "fs-all-of-the-beauty-looks-from-practical-magic-2",
    "cat": "时尚",
    "title": "All of the Beauty Looks From Practical Magic 2, Then vs. Now",
    "titleZh": "《魔法俏佳人 2》的全部妆造：今昔对比",
    "source": "ELLE · 2026-09-09",
    "date": "2026-09-09",
    "minutes": 4,
    "url": "https://www.elle.com/beauty/a73588022/practical-magic-2-beauty-looks-then-now-differences-photos/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/fs-all-of-the-beauty-looks-from-practical-magic-2.jpg",
    "paras": [
      {
        "en": "From ’90s curls to protection plaits, the sequel’s glam is full of nods to the original.",
        "cn": "从90年代的卷发到护发辫，续集的魅力充满了对第一部的致敬。"
      },
      {
        "en": "Some movie moments age like fine wine, as do the characters and real-life actors in them.",
        "cn": "一些电影时刻像美酒一样陈年，其中的角色和现实生活中的演员也是如此。"
      },
      {
        "en": "Case in point: Practical Magic and the Owens sisters.",
        "cn": "举个例子：实用魔术和欧文斯姐妹。"
      },
      {
        "en": "Twenty-eight years after the original cult classic debuted, Sandra Bullock and Nicole Kidman have reprised their roles as Sally Owens and Gillian Owens in Practical Magic 2.",
        "cn": "这部经典电影上映28年后，桑德拉·布洛克和妮可·基德曼在《实用魔法2》中再次饰演莎莉·欧文斯和吉莉安·欧文斯。"
      },
      {
        "en": "Nearly three decades later, the pair look as though they’ve drunk a youth potion.",
        "cn": "近三十年后，这对夫妇看起来好像喝了青春药水。"
      },
      {
        "en": "A few other beloved characters from the original have returned for the sequel alongside some new favorites, and the beauty looks then and now are spellbinding.",
        "cn": "原作中一些受人喜爱的角色也在续集中回归，还有一些新宠，无论是当时还是现在，美丽的外表都令人着迷。"
      },
      {
        "en": "At the 1998 premiere, Sandra Bullock complemented her Dolce & Gabbana LBD with side-slicked bangs that grazed her eyebrows and a flipped-up lob.",
        "cn": "在1998年的首映式上，桑德拉·布洛克（Sandra Bullock）为她的杜嘉班纳（Dolce & Gabbana）LBD配上了擦过眉毛的侧刘海和翻转的高吊头。"
      },
      {
        "en": "premiere, Mara Roszak, hairstylist and founder of RŌZ Haircare, crafted a softly waved style with smooth ends that drew inspo from Bullock’s custom Louis Vuitton dress, specifically its “architectural, distinctly modern silhouette,” as Roszak describes it.",
        "cn": "发型师、RŌZ Haircare的创始人玛拉·罗斯扎克（Mara Roszak）制作了一款柔和的卷发，发梢光滑，灵感来自布洛克的路易威登定制礼服，尤其是用罗斯扎克的话来说，它的“建筑风格、鲜明的现代轮廓”。"
      },
      {
        "en": "“The hair was built to match: a soft, structured wave with a deep side part that read modern and subtly sculpted, polished yet still soft, with a cool edge,” Roszak said.",
        "cn": "罗斯扎克说：“我的头发是这样设计的：柔软、有结构的波浪，侧面较深的部分看起来很现代，造型微妙，光滑但仍然柔软，边缘很酷。”"
      },
      {
        "en": "To create the style, she prepped Bullock’s damp hair with a combination of RŌZ Santa Lucia Styling Oil and the RŌZ Milk Hair Serum before blow-drying with a round brush.",
        "cn": "为了打造这种造型，她用RŌZ圣卢西亚造型油和RŌZ牛奶护发精华液为布洛克潮湿的头发做了准备，然后用圆刷吹干。"
      },
      {
        "en": "To set the loose wave, Roszak used a 1.5-inch barrel curling iron, wrapping small sections away from the face to keep the wave modern rather than overly curled.",
        "cn": "为了做出蓬松的卷发，罗斯扎克用了一个1.5英寸的卷发棒，把头发从脸上绕开一小段，使波浪保持现代，而不是过度卷曲。"
      },
      {
        "en": "The ends were left uncurled and sleek to echo the clean lines of the dress.",
        "cn": "发梢没有卷曲，线条流畅，与裙子的简洁线条相呼应。"
      },
      {
        "en": "Makeup for all of the cast, including Bullock’s, mostly leaned soft and muted.",
        "cn": "包括布洛克在内的所有演员的妆容都很柔和。"
      },
      {
        "en": "Makeup artist Sabrina Bedrani painted very light pink shades on Bullock’s cheeks and lips and went heavier and darker with the eyeliner and mascara, being careful to keep the eye look out of smoky territory.",
        "cn": "化妆师萨布丽娜·贝德拉尼在布洛克的脸颊和嘴唇上涂了浅粉色，然后用眼线笔和睫毛膏涂得更浓更黑，小心翼翼地让眼睛看起来不像烟熏的区域。"
      },
      {
        "en": "Kidman’s most obvious transformation between Practical Magic 1 and 2 is the switch from red to blonde hair.",
        "cn": "基德曼在《实用魔法》第1集和第2集中最明显的变化就是从红头发变成了金发。"
      },
      {
        "en": "She also grew out the signature Gillian Owens bangs.",
        "cn": "她还留起了标志性的吉莉安·欧文斯刘海。"
      },
      {
        "en": "Kidman’s 2026 premiere hair look was styled by Adir Abergel, who said, “The goal was undone in the best way — loose, full curls with a ton of body, a high-shine finish, and that deep side part that gives the whole look a sexier, more grown-out blowout feel.” The style, Abergel adds, was “a nod to the free-spirited sister from the original film, reset for the present.”",
        "cn": "基德曼2026年首映式的发型是由阿迪尔·阿伯格尔设计的，他说：“我们的目标是以最好的方式完成的——蓬松、丰满的卷发，高光泽的卷发，深侧的头发让整个造型更性感、更蓬松。”阿伯格尔补充说，这种风格是“对原版电影中自由奔放的妹妹的致敬，为现在重新设定。”"
      },
      {
        "en": "After carving out a deep side part, Abergel used the ghd Speed hairdryer and a round brush to smooth out Kidman’s damp hair and create lift and volume.",
        "cn": "在剪出较深的侧分后，阿伯格尔用ghd Speed吹风机和圆刷把基德曼潮湿的头发弄平，让头发蓬松起来。"
      },
      {
        "en": "Once dry, he worked in small-to-medium sections using the ghd Chronos Curve Grand Iron to wind the hair in a consistent direction to build a full, voluminous curl pattern “reminiscent of Nicole’s own ’90s curls — defined but never stiff, with real body behind it,” says Abergel.",
        "cn": "一旦头发干了，他就用gd Chronos Curve Grand Iron把头发分小到中等大小的部分以一致的方向卷起来，形成一个丰满的卷发图案，“让人想起妮可自己90年代的卷发——轮廓分明，但从不僵硬，背后有真实的身体，”阿伯格尔说。"
      },
      {
        "en": "After letting each curl cool completely, he raked through the hair with fingers (not a brush) to open the curl into a soft, sexy blowout shape without losing definition.",
        "cn": "让每一卷头发完全冷却后，他用手指（不是梳子）拨弄头发，使卷发柔软、性感，又不失轮廓。"
      },
      {
        "en": "For makeup, Gucci Westman used a selection of Clé de Peau Beauté on Kidman.",
        "cn": "在化妆方面，古驰·韦斯特曼为基德曼使用了精选的Clé de Peau Beauté。"
      },
      {
        "en": "On her lids, Westman pulled shades from two Eye Color Quads: 4 Ocean Sunrise and 8 Warm Ocean Sunset.",
        "cn": "在她的眼睑上，韦斯特曼用了两种颜色的眼影：4海洋日出和8温暖海洋日落。"
      }
    ]
  },
  {
    "id": "et-woody-norman-malachi-kirby-tuppence-middleton-",
    "cat": "娱乐",
    "title": "Woody Norman, Malachi Kirby, Tuppence Middleton, Conrad Khan, Kola Bokinni to Star in Urban Horror Thriller ‘Skag & Bone’; Featuristic Produces, UTA on Board (EXCLUSIVE)",
    "titleZh": "伍迪·诺曼、玛拉基·柯比、塔彭丝·米德尔顿、康拉德·汗、科拉·博基尼将主演都市恐怖惊悚片《Skag & Bone》；Featuristic 制作，UTA 代理（独家）",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://variety.com/2026/film/global/urban-horror-thriller-skag-bone-cast-1236856168/",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/et-woody-norman-malachi-kirby-tuppence-middleton-.jpg",
    "paras": [
      {
        "en": "Julien Loeffler and James Kermack will produce through their production company Featuristic Films.",
        "cn": "Julien Loeffler和James Kermack将通过他们的制作公司Featuristic Films进行制作。"
      },
      {
        "en": "Norman will lead the film as Younger, a 16-year-old rehoused with his mother, Maria (played by Middleton), on the notorious Stonemore Estate.",
        "cn": "诺曼将主演这部电影，扮演16岁的扬格，与他的母亲玛丽亚（由米德尔顿饰演）一起在臭名昭著的斯通莫尔庄园重新安置。"
      },
      {
        "en": "After a debilitating stroke leaves Maria unable to work, Younger is forced to become both provider and protector.",
        "cn": "在衰弱的中风使Maria无法工作后，Younger被迫成为提供者和保护者。"
      },
      {
        "en": "While attempting to navigate the estate's unforgiving world alongside his cousin Caleb (played by Khan), Younger is drawn into the orbit of local drug lord Anton (played by Bokinni).",
        "cn": "在试图与他的堂兄Caleb （由Khan扮演）一起在庄园的无情世界中航行时，Younger被吸引到当地毒枭Anton （由Bokinni扮演）的轨道上。"
      },
      {
        "en": "Anton offers him protection, money and a possible escape from Stonemore, while an enigmatic local preacher (played by Kirby), presents him with a very different path.",
        "cn": "安东为他提供了保护、金钱和逃离斯通莫尔的可能性，而一位神秘的当地传教士（由柯比扮演）则为他提供了一条截然不同的道路。"
      },
      {
        "en": "Norman received BAFTA and Critics Choice Award nominations for his breakout performance opposite Joaquin Phoenix in Mike Mills' A24 drama \"C'mon C'mon.\" His subsequent credits include Netflix's \"The Electric State,\" horror feature \"Cobweb\" and Paul Greengrass' next film \"The Uprising,\" where Norman stars alongside Andrew Garfield.",
        "cn": "诺曼因在迈克·米尔斯（Mike Mills）的A24电视剧《来吧来吧》（C 'mon C' mon）中与华金·菲尼克斯（Joaquin Phoenix）对阵的突破性表演而获得BAFTA和评论家选择奖提名。他随后的作品包括Netflix的“The Electric State”，恐怖片“Cobweb”和Paul Greengrass的下一部电影“The Uprising”，Norman与Andrew Garfield一起出演。"
      },
      {
        "en": "Kirby won the BAFTA Television Award for best supporting actor for his performance as Darcus Howe in Steve McQueen's \"Small Axe: Mangrove.\" He currently stars opposite Stephen Graham in Steven Knight's period drama \"A Thousand Blows\" for Disney+, and previously led the miniseries \"Roots.\"",
        "cn": "柯比凭借在史蒂夫·麦奎因的《小斧头：红树林》中饰演的达克斯·豪获得了英国电影和电视艺术学院奖最佳男配角。他目前在迪士尼+的史蒂芬·奈特的历史剧《千击》中与斯蒂芬·格雷厄姆演对手戏，之前还主演了迷你剧《根》。"
      },
      {
        "en": "Khan earned BAFTA and British Independent Film Award nominations for his breakout role in Henry Blake's \"County Lines.\" His credits also include the final season of \"Peaky Blinders,\" in which he played Duke Shelby, and BBC crime drama \"Baptiste.\"",
        "cn": "可汗凭借在亨利·布莱克的《郡界》中的突破性角色获得了英国电影学院奖和英国独立电影奖提名。他还出演过《剃刀党》（Peaky Blinders）的最后一季，他在其中饰演杜克·谢尔比（Duke Shelby），以及BBC的犯罪剧《巴蒂斯特》（Baptiste）。"
      },
      {
        "en": "Bokinni is best known for playing AFC Richmond captain Isaac McAdoo in the Emmy-winning Apple TV+ comedy \"Ted Lasso.” His additional credits include Netflix's \"Black Mirror,\" BBC drama \"The Split\" and Sky's \"Top Boy.\"",
        "cn": "Bokinni最出名的角色是在获得艾美奖的Apple TV+喜剧《Ted Lasso》中扮演AFC里士满队长艾萨克·麦卡杜。他的其他作品包括Netflix的《黑镜》，BBC的电视剧《分裂》和Sky的《Top Boy》。"
      },
      {
        "en": "Featuristic Films' recent credits include underwater survival thriller \"Breathe Deep,\" starring Ingrid Torelli (\"Late Night With the Devil\"), Michiel Huisman (\"The Haunting of Hill House\") and Avani Gregg (\"Spider Island\"), and crime drama “Salvable,” starring Shia LaBeouf (\"Fury\"), Toby Kebbell (\"RocknRolla\") and James Cosmo (\"Braveheart\").",
        "cn": "故事片最近的作品包括水下生存惊悚片《深呼吸》，由英格丽·托雷利（《与魔鬼的深夜》）、迈克尔·豪斯曼（《鬼屋惊魂》）和阿瓦尼·格雷格（《蜘蛛岛》）主演，以及犯罪片《可救之星》，由希亚·拉博夫（《愤怒》）、托比·凯贝尔（《摇滚》）和詹姆斯·科斯莫（《勇敢的心》）主演。"
      },
      {
        "en": "“‘Skag & Bone' is a deeply human coming-of-age story trapped inside a relentless urban nightmare,\" Boru said.",
        "cn": "“《Skag & Bone》是一个深刻的人类成长故事，被困在无情的城市噩梦中，”博鲁说。"
      },
      {
        "en": "\"At its heart is a boy being forced to grow up too quickly in a world that has abandoned him.",
        "cn": "“故事的核心是一个男孩被迫在一个抛弃他的世界中过快成长。"
      },
      {
        "en": "Woody possesses the rare combination of vulnerability, intelligence and strength that Younger demands, while Malachi, Conrad, Kola and Tuppence bring extraordinary weight and complexity to the forces shaping his life.",
        "cn": "伍迪拥有杨格所要求的脆弱、智慧和力量的罕见结合，而玛拉基、康拉德、科拉和塔彭丝则给塑造他生活的力量带来了非凡的重量和复杂性。"
      }
    ]
  },
  {
    "id": "et-telekom-srbija-s-content-head-on-blueprint-for",
    "cat": "娱乐",
    "title": "Telekom Srbija’s Content Head on Blueprint for Turning Serbian Production Powerhouse Into Global Player",
    "titleZh": "Telekom Srbija 内容主管谈把塞尔维亚制片实力推向全球的蓝图",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://variety.com/2026/tv/global/telekom-srbija-content-head-serbian-production-powerhouse-1236851472/",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/et-telekom-srbija-s-content-head-on-blueprint-for.jpg",
    "paras": [
      {
        "en": "Telecommunications giant Telekom Srbija is looking to position itself as not only the leading production hub in Serbia but a regional juggernaut for the countries of the former Yugoslavia, exporting local content while attracting international productions to the Balkan nation.",
        "cn": "电信巨头塞尔维亚电信（Telekom Srbija）正在寻求将自己定位为不仅是塞尔维亚领先的生产中心，而且是前南斯拉夫国家的地区巨头，在向巴尔干国家出口本地内容的同时吸引国际制作。"
      },
      {
        "en": "That output was part of a production boom in a country that's been the dominant hub of film and television production in the Balkan region since the break-up of the former Yugoslavia.",
        "cn": "自前南斯拉夫解体以来，这个国家一直是巴尔干地区电影和电视制作的主要中心，这些产出是该国制作繁荣的一部分。"
      },
      {
        "en": "In recent years, the Serbian industry has grown by leaps and bounds, thanks in large part to competition between the telecom heavyweight and rivals including United Media and public broadcaster Radio Television of Serbia.",
        "cn": "近年来，塞尔维亚的电信行业突飞猛进，这在很大程度上要归功于电信巨头与包括联合媒体和塞尔维亚公共广播公司广播电视在内的竞争对手之间的竞争。"
      },
      {
        "en": "For Martinović, that period has witnessed a transition at Telekom Srbija from a \"traditional ecosystem\" for film and TV content to \"a very open-minded and sophisticated regional production ecosystem in the last eight or nine years.\"",
        "cn": "在martinoviki看来，这段时间见证了Srbija电信从“传统的电影和电视内容生态系统”向“一个非常开放和成熟的区域生产生态系统”的转变。"
      },
      {
        "en": "Such series illustrate what Martinović characterizes as a strategy \"to make choices more wisely and make choices more oriented to potential international partnerships and potential distribution to international markets.\" One of the company's most successful shows, the spy thriller \"Civil Servant\" (pictured), which is now entering its fourth season, has sold to Disney+ Hotstar in India,",
        "cn": "这些系列说明了martinoviki所描述的战略“更明智地做出选择，做出更面向潜在国际合作伙伴和潜在国际市场分销的选择。”该公司最成功的节目之一，间谍惊悚剧《公务员》（如图），现在已经进入第四季，已经卖给了印度的迪士尼+ Hotstar。"
      },
      {
        "en": "Next up is perhaps the company’s biggest gamble to date: the English-language, post-apocalyptic thriller \"Sanctuary,\" featuring \"The Handmaid's Tale\" star Nina Kiri.",
        "cn": "下一部可能是该公司迄今为止最大的赌博：由《使女的故事》影星妮娜·基里主演的后启示录惊悚片《避难所》（Sanctuary）。"
      },
      {
        "en": "Martinović describes the film, which is directed by Filip Kovačević (\"Incarnation\") and has been acquired for North America by Vertical, as \"a huge risk and a huge challenge\" for the company.",
        "cn": "马蒂诺维奇认为这部电影对公司来说是“巨大的风险和巨大的挑战”。这部电影由执导过《化身》（Incarnation）的菲利普·科瓦切维奇（Filip Kovačević）执导，已被Vertical公司收购到北美市场。"
      },
      {
        "en": "\"It's very challenging, not only in the sense of authenticity, but also financing,\" she says, adding that \"international partners and distributors recognizing the value of that project\" has been a boon for its backers.",
        "cn": "她说：“这非常具有挑战性，不仅在真实性方面，在融资方面也是如此。”她补充说，“国际合作伙伴和分销商认识到这个项目的价值”，这对它的支持者来说是一个福音。"
      },
      {
        "en": "It also illustrates how Telekom Srbija is punching above its weight, according to Martinović.",
        "cn": "马蒂诺维奇表示，这也说明了塞尔维亚电信是如何超越自身能力的。"
      },
      {
        "en": "\"We are completely aware that we come from a small country,\" she says.",
        "cn": "她说：“我们完全意识到我们来自一个小国。"
      },
      {
        "img": "assets/covers/et-telekom-srbija-s-content-head-on-blueprint-for-1.jpg",
        "cap": "Telekom Srbija’s Aleksandra Martinović Courtesy Telekom Srbija"
      },
      {
        "en": "Along with its prolific production arm, TS Media, Telekom Srbija is betting big on its streaming platform, MOVE — described by Martinović as a \"regional Balkan Netflix\" — while also \"investing more in every element of the production chain,\" most notably with the acquisition earlier this year of the Belgrade-based Firefly Studios.",
        "cn": "与其多产的制作部门TS Media一起，塞尔维亚电信在其流媒体平台MOVE（被martinoviki描述为“巴尔干地区的Netflix”）上押下了重金，同时也“在生产链的每一个环节都加大了投资”，最引人注目的是今年早些时候收购了总部位于贝尔格莱德的Firefly Studios。"
      },
      {
        "en": "\"We have a [360-degree] approach regarding production,\" says Martinović.",
        "cn": "martinoviki说：“我们有360度的生产方法。"
      },
      {
        "en": "\"It's production, distribution, offering infrastructure through our Firefly Studios, and, of course, selling our own content to international partners.\"",
        "cn": "“它包括制作、发行、通过我们的Firefly Studios提供基础设施，当然，还包括向国际合作伙伴出售我们自己的内容。”"
      },
      {
        "en": "This has been a tumultuous time in Serbia, which has faced roiling protests for nearly two years in the wake of a devastating train station tragedy that claimed 16 lives.",
        "cn": "在塞尔维亚，这是一个动荡的时期。在造成16人死亡的火车站悲剧发生后，近两年来，塞尔维亚一直面临着激烈的抗议活动。"
      },
      {
        "en": "The turbulence has spread to the country's film and television industries, with many professionals claiming they've been shut out by state-backed media over their political beliefs.",
        "cn": "这场动荡已经蔓延到中国的影视行业，许多专业人士称，他们因为自己的政治信仰而被国有媒体拒之门外。"
      },
      {
        "en": "Martinović rejects such criticism.",
        "cn": "马蒂诺维奇驳斥了这种批评。"
      },
      {
        "en": "\"We are completely aware of the social and political situation, but it doesn't affect our general strategy,\" she says.",
        "cn": "“我们完全了解社会和政治形势，但这并不影响我们的总体战略，”她说。"
      },
      {
        "en": "\"We are fighting for the whole creative industry in Serbia.",
        "cn": "“我们正在为塞尔维亚的整个创意产业而战。"
      },
      {
        "en": "And we open the door for the whole creative industry in Serbia through international projects, through selling our own projects to international broadcasters, through trying to attract international partners…to come here and see what we have to offer.",
        "cn": "我们通过国际项目，通过向国际广播公司出售我们自己的项目，通过努力吸引国际合作伙伴……来这里看看我们能提供什么，为塞尔维亚的整个创意产业敞开大门。"
      }
    ]
  },
  {
    "id": "et-former-telepool-chief-yoko-higuchi-zitzmann-fi",
    "cat": "娱乐",
    "title": "Former Telepool Chief Yoko Higuchi-Zitzmann, Filmmaker Mark Wachholz Launch AI Production Company Dreamkite Studios (EXCLUSIVE)",
    "titleZh": "前 Telepool 掌门人 Yoko Higuchi-Zitzmann 与制片人 Mark Wachholz 创立 AI 制作公司 Dreamkite Studios（独家）",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://variety.com/2026/film/global/yoko-higuchi-zitzmann-mark-wachholz-dreamkite-studios-1236855876/",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/et-former-telepool-chief-yoko-higuchi-zitzmann-fi.jpg",
    "paras": [
      {
        "en": "Higuchi-Zitzmann, the company's CEO and founder, is one of Germany's most internationally experienced media executives and producers.",
        "cn": "公司首席执行官兼创始人Higuchi-Zitzmann是德国最具国际经验的媒体高管和制作人之一。"
      },
      {
        "en": "She served as CEO of Telepool, then part of Will Smith's Westbrook.",
        "cn": "她曾担任Telepool的首席执行官，然后是威尔·史密斯饰演的威斯布鲁克的一部分。"
      },
      {
        "en": "Before that, she was managing director of Matthias Schweigh&ouml;fer's Pantaleon Films and head of international acquisitions, sales and co-productions at Constantin Film.",
        "cn": "在此之前，她曾担任马蒂亚斯·施维希（Matthias schweighfer）旗下Pantaleon Films的董事总经理，以及康斯坦丁影业（Constantin Film）的国际收购、销售和联合制作主管。"
      },
      {
        "en": "Her career includes internationally successful titles including the Oscar-winning \"La Vie En Rose,\" \"Asterix at the Olympic Games,\" \"My Blind Date With Life,\" which sold to 54 countries, and the RTL+ event series \"Herzogpark.\"",
        "cn": "她的职业生涯包括获得奥斯卡奖的《玫瑰人生》、《奥运会上的阿斯特里克斯》、在54个国家销售的《我与生命的相亲》以及RTL+活动系列《赫尔佐格公园》等在国际上取得成功的作品。"
      },
      {
        "en": "His 2025 AI film \"The Cinema That Never Was\" attracted attention from leading filmmakers such as Alex Proyas and John Gaeta, and won major international AI film awards, including Grand Prizes at the Omni International AI Film Festival, whose jury was headed by George Miller, and the Artefact AI Film Festival, chaired by C&eacute;dric Klapisch.",
        "cn": "他的2025年人工智能电影《从未有过的电影》吸引了亚历克斯·普罗亚斯和约翰·盖塔等知名电影人的关注，并获得了主要的国际人工智能电影奖项，包括由乔治·米勒担任评审团主席的Omni国际人工智能电影节的大奖，以及由德里克·克拉皮什担任主席的人工智能电影节。"
      },
      {
        "en": "At Dreamkite, Wachholz will \"shape the studio's core creative and aesthetic vision and develop ambitious original projects together with its international network of AI filmmakers and creative talent,\" the company said.",
        "cn": "该公司表示，在Dreamkite，Wachholz将“塑造工作室的核心创意和美学愿景，并与AI电影制作人和创意人才的国际网络一起开发雄心勃勃的原创项目”。"
      },
      {
        "en": "Dreamkite Studios brings together exceptional creative talent, premium IP and cutting-edge technology to build a new generation of European entertainment.",
        "cn": "Dreamkite Studios汇集了杰出的创意人才，优质IP和尖端技术，以建立新一代的欧洲娱乐。"
      },
      {
        "en": "We want to use this technology responsibly, strengthen European sovereignty and create stories that inspire audiences around the world.\"",
        "cn": "我们希望负责任地使用这项技术，加强欧洲主权，并创造能够激励全世界观众的故事。”"
      },
      {
        "en": "Wachholz added: \"A new world needs new stories.",
        "cn": "Wachholz补充道：“一个新的世界需要新的故事。"
      },
      {
        "en": "We are living in a time of rapid transformation and increasing speculation — about the present, the future, what we thought was true and what we hold dear.",
        "cn": "我们生活在一个快速变革和越来越多的猜测的时代——关于现在，关于未来，关于我们认为是真的，关于我们珍视的东西。"
      },
      {
        "en": "Stories are humanity's way of capturing reality, creating truth and generating meaning.",
        "cn": "故事是人类捕捉现实、创造真理和产生意义的一种方式。"
      },
      {
        "en": "AI technology finally allows us to become much more ambitious, independent, and bold in the worlds we create and the projects we imagine.",
        "cn": "人工智能技术最终让我们在我们创造的世界和我们想象的项目中变得更加雄心勃勃、独立和大胆。"
      },
      {
        "en": "At Dreamkite, we believe that the future of cinematic storytelling has only just begun.\"",
        "cn": "在Dreamkite，我们相信电影叙事的未来才刚刚开始。”"
      },
      {
        "en": "Sylvia Nitzsche: A Berlin-based director and creative technologist specializing in AI-supported storytelling.",
        "cn": "西尔维娅·尼采：柏林导演和创意技术专家，专门从事人工智能支持的故事讲述。"
      },
      {
        "en": "Her work includes projects for clients such as Axel Springer and Universal Music.",
        "cn": "她的工作包括为阿克塞尔b施普林格和环球音乐等客户提供项目。"
      },
      {
        "en": "Albert Bozesan: A Munich-based filmmaker, writer and former head of creative technology at Storybook Studios.",
        "cn": "Albert Bozesan：慕尼黑电影制作人，作家，Storybook Studios前创意技术主管。"
      },
      {
        "en": "His work spans bestselling audio storytelling, animation and AI-based productions, including \"Space Vets\" and \"Tarmac.\"",
        "cn": "他的作品涵盖了畅销的有声故事、动画和基于人工智能的作品，包括《太空兽医》（Space Vets）和《停机坪》（Tarmac）。"
      },
      {
        "en": "Florian Meimberg: A commercials director and early pioneer of AI-driven filmmaking.",
        "cn": "弗洛里安·梅姆伯格：广告导演，人工智能驱动电影制作的早期先驱。"
      },
      {
        "en": "After 12 years as a creative director at agencies including BBDO, he developed hybrid AI productions for major brands including Persil and Lidl.",
        "cn": "在BBDO等代理公司担任创意总监12年之后，他为宝莹（Persil）和Lidl等主要品牌开发了混合人工智能产品。"
      },
      {
        "en": "Shamila Lengsfeld: A German-Iranian director, AI filmmaker and creative technologist.",
        "cn": "莎米拉·朗斯菲尔德：德裔伊朗导演、人工智能电影制作人和创意技术专家。"
      },
      {
        "en": "Her superheroine short film \"Blake\" is now being developed by Dreamkite as an original series.",
        "cn": "她的超级女英雄短片“布莱克”现在正在Dreamkite作为原创系列开发。"
      },
      {
        "en": "PROJECTS IN DEVELOPMENT Dreamkite launches with a slate of original AI-native and hybrid projects currently in development.",
        "cn": "Dreamkite推出了一系列目前正在开发的原始ai原生和混合项目。"
      }
    ]
  },
  {
    "id": "et-ted-lasso-star-nick-mohammed-to-host-the-trait",
    "cat": "娱乐",
    "title": "‘Ted Lasso’ Star Nick Mohammed to Host ‘The Traitors’ Stage Play in London",
    "titleZh": "《泰德·拉索》主演尼克·穆罕默德将在伦敦主持舞台剧《叛徒》",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://variety.com/2026/theater/news/ted-lasso-nick-mohammed-host-the-traitors-stage-play-1236857067/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/et-ted-lasso-star-nick-mohammed-to-host-the-trait.jpg",
    "paras": [
      {
        "en": "Nick Mohammed will play the host in “ The Traitors – Acts of Betrayal,” the West End stage adaptation of the hit competition format, after a video in which Claudia Winkleman swore him in to the role, producers Studio Lambert and Neal Street Productions have revealed.",
        "cn": "兰伯特工作室和尼尔街制作公司透露，尼克·穆罕默德将在《叛徒-背叛行为》中扮演主持人，这是伦敦西区舞台上改编的热门比赛形式，克劳迪娅·温克尔曼在一段视频中宣誓让他出演这个角色。"
      },
      {
        "en": "The creative team includes production designer Ben Stones, with Mark Henderson on lighting, Alexandra Faye Braithwaite on sound, Kate Prince as choreographer, Martin Lowe writing the music and Stuart Burt CDG CSA as casting director.",
        "cn": "创意团队包括制作设计师本·斯通，马克·亨德森担任灯光，亚历山德拉·费·布雷斯韦特担任音效，凯特·普林斯担任舞蹈指导，马丁·洛担任音乐编剧，斯图尔特·伯特担任选角导演。"
      },
      {
        "en": "Mohammed, known for playing Nate in “Ted Lasso” and Zafar Jaffrey in “Slow Horses,” was a finalist on the first season of “The Celebrity Traitors.” Winkleman hosts “The Traitors” and “The Celebrity Traitors” on BBC One and iPlayer, and filmed the oath video with Mohammed at Ardross Castle in the Scottish Highlands, the setting used for the BBC version of the show.",
        "cn": "穆罕默德因在《泰德·拉索》（Ted Lasso）中饰演内特（Nate）和在《慢马》（Slow Horses）中饰演扎法尔·贾弗里（Zafar Jaffrey）而闻名，他曾入围《名人叛徒》（the Celebrity叛徒）第一季的决赛。Winkleman在bbcone和iPlayer上主持了“叛徒”和“名人叛徒”节目，并在苏格兰高地的阿德罗斯城堡与穆罕默德一起拍摄了宣誓视频，这是BBC版本的节目。"
      },
      {
        "en": "Mohammed said: “At first, I didn’t want to believe that a series of fictional plays based on ‘The Traitors’ could ever contain as many brilliant twists and turns as the real thing – or be quite as compelling.",
        "cn": "默罕默德说：“一开始，我不愿意相信根据《叛徒》改编的一系列虚构戏剧会像真实故事一样包含那么多精彩的转折，或者像真实故事一样引人入胜。"
      },
      {
        "en": "But John Finnemore has crafted an absolute masterpiece: a cycle of five plays that are each as funny as they are moving, and of course, deeply, deeply unpredictable.",
        "cn": "但约翰·芬尼莫尔创作了一部绝对的杰作：一部由五部戏剧组成的戏剧循环，每部戏剧既有趣又感人，当然，也非常非常不可预测。"
      },
      {
        "en": "And under the direction of the brilliant Robert Hastie, I couldn’t be more delighted to be joining such an original and wildly ambitious show.",
        "cn": "在才华横溢的罗伯特·海斯蒂的指导下，我非常高兴能加入这样一部原创而雄心勃勃的电视剧。"
      },
      {
        "en": "To take on Claudia’s role, as it were, is not just a privilege but a real challenge as an actor – I simply don’t have enough hair.",
        "cn": "能出演克劳迪娅这个角色，可以说，不仅是一种特权，而且对演员来说是一个真正的挑战——我就是没有足够的头发。"
      },
      {
        "en": "But I will do my utmost not to disappoint.",
        "cn": "但我会尽我最大的努力不让你失望。"
      },
      {
        "en": "Either way, this time round, I promise not to let down the whole nation right at the very end.",
        "cn": "无论如何，这一次，我保证不会在最后一刻让整个国家失望。"
      },
      {
        "en": "“The Traitors” format was created and developed by IDTV in cooperation with RTL Creative Unit and is distributed by All3Media International, part of Banijay Entertainment, which also handles the show’s licensing program.",
        "cn": "《叛徒》由IDTV与RTL Creative Unit合作制作和开发，由Banijay Entertainment旗下的All3Media International发行，该公司还负责该节目的授权项目。"
      },
      {
        "en": "More than 40 territories across six continents have commissioned local versions of the format, and rights for the stage production were negotiated through All3Media International.",
        "cn": "六大洲的40多个地区已委托制作该格式的本地版本，舞台制作的版权是通过All3Media国际公司协商的。"
      },
      {
        "en": "Studio Lambert, an All3Media company, is also behind “Gogglebox,” “The Circle” and “Race Across the World.” Neal Street Productions, a Banijay Entertainment company, was founded in 2003; its founders are Sam Mendes, Pippa Harris and Caro Newling.",
        "cn": "All3Media公司旗下的兰伯特工作室（Studio Lambert）还制作了《Gogglebox》、《The Circle》和《Race Across World》。Neal Street Productions，Banijay娱乐公司，成立于2003年；它的创始人是萨姆·门德斯、皮帕·哈里斯和卡罗·纽林。"
      },
      {
        "en": "The company’s credits include “Call the Midwife” and the film “1917.”",
        "cn": "公司的作品包括《呼叫助产士》（Call The Midwife）和电影《1917》（1917）。"
      }
    ]
  },
  {
    "id": "et-okada-junichi-hosted-the-floor-quiz-format-ret",
    "cat": "娱乐",
    "title": "Okada Junichi-Hosted ‘The Floor’ Quiz Format Returns to Nippon TV for Season 2 in Japan (EXCLUSIVE)",
    "titleZh": "冈田准一主持的《The Floor》第二季回归日本电视台（独家）",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://variety.com/2026/tv/news/okada-junichi-the-floor-nippon-tv-season-2-1236856898/",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/et-okada-junichi-hosted-the-floor-quiz-format-ret.jpg",
    "paras": [
      {
        "en": "Nippon TV has ordered a second season of Talpa Studios ‘ game show “ The Floor ” in Japan, building on the format’s first full adaptation in Asia.",
        "cn": "日本电视台（Nippon TV）订购了日本Talpa Studios的游戏节目《The Floor》第二季，这是该节目在亚洲首次全面改编。"
      },
      {
        "en": "Nanzai Misaki, creative director at Nippon TV, said the Japanese version of “The Floor” brings together top comedians, celebrities, YouTubers and Olympic medalists for head-to-head battles to stay in the game.",
        "cn": "日本电视台（Nippon TV）的创意总监三崎南宰（Nanzai Misaki）表示，日本版的《the Floor》汇集了顶级喜剧演员、名人、youtube网红和奥运奖牌获得者，他们将进行肉搏战，以留在游戏中。"
      },
      {
        "en": "“Knowledge alone is not enough – it also takes unwavering mental strength, strategic thinking, and the ability to make split-second decisions under pressure,” she said.",
        "cn": "她说：“光有知识是不够的，还需要坚定的精神力量、战略思维和在压力下瞬间做出决定的能力。”"
      },
      {
        "en": "“I am truly delighted to bring audiences the genuine emotion and human drama that only a competition as intense as ‘The Floor’ can draw out of its contestants.”",
        "cn": "“我很高兴能给观众带来真正的情感和人类的戏剧，只有像《地板》这样激烈的比赛才能激发出参赛者的情感。”"
      },
      {
        "en": "“The Floor” has now sold in more than 30 territories worldwide for Talpa Studios, the independent production company founded by John de Mol.",
        "cn": "由约翰·德·摩尔（John de Mol）创立的独立制片公司Talpa Studios出品的《地板》目前已在全球30多个地区销售。"
      },
      {
        "en": "Its non-scripted portfolio also includes “The Quiz With Balls,” “Caught in the Middle,” “The Alliance” and “The Tribute – Battle of the Bands,” alongside co-developed titles such as “Trivial Pursuit,” “99 to Beat,” “Let’s Play Ball,” “Most Wanted” and “A Party to Die For.”",
        "cn": "该公司的非剧本作品还包括《The Quiz With Balls》、《Caught in The Middle》、《The Alliance》和《The Tribute - Battle of The Bands》，以及合作开发的《Trivial Pursuit》、《99 to Beat》、《Let 's Play Ball》、《Most Wanted》和《A Party to Die For》。"
      },
      {
        "en": "Nippon TV, which owns streaming platform Hulu in Japan, holds full ownership of nearly 90% of its content IP and has expanded its international footprint through anime, ready-made programs, formats and co-productions.",
        "cn": "Nippon TV在日本拥有流媒体平台Hulu，拥有其近90%的内容IP的全部所有权，并通过动漫、现成节目、格式和联合制作扩大了其国际足迹。"
      },
      {
        "en": "The broadcaster launched in-house production arm Gyokuro Studio in 2025, alongside a Los Angeles business office handling co-development and sales for the U.S. and Latin America.",
        "cn": "该广播公司于2025年成立了内部制作部门Gyokuro Studio，并在洛杉矶设立了一个业务办公室，负责美国和拉丁美洲的联合开发和销售。"
      },
      {
        "en": "Sebastian van Barneveld, director of global distribution at Talpa Studios, said, “A second season in Japan is an exceptional achievement and something we’re incredibly proud of.",
        "cn": "Talpa Studios全球发行总监Sebastian van Barneveld表示：“第二季在日本上映是一项非凡的成就，我们为此感到非常自豪。"
      },
      {
        "en": "Japan is one of the world’s most competitive entertainment markets, where recommissions for international formats are far from guaranteed.",
        "cn": "日本是世界上竞争最激烈的娱乐市场之一，在那里，国际节目的佣金远没有得到保证。"
      },
      {
        "en": "Seeing ‘The Floor’ return so quickly is a fantastic endorsement of the format’s universal appeal and a testament to the outstanding collaboration with Nippon TV.”",
        "cn": "看到《地板》如此迅速地回归，是对该格式的普遍吸引力的绝佳认可，也是与日本电视台出色合作的证明。”"
      }
    ]
  },
  {
    "id": "et-yehuda-levi-to-star-in-cross-border-action-thr",
    "cat": "娱乐",
    "title": "Yehuda Levi to Star in Cross-Border Action Thriller ‘The Escape’ for Keshet (EXCLUSIVE)",
    "titleZh": "耶胡达·列维将主演跨境动作惊悚片《越狱》（独家报道）",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 2,
    "url": "https://variety.com/2026/tv/global/yehuda-levi-the-escape-keshet-1236855808/",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/et-yehuda-levi-to-star-in-cross-border-action-thr.jpg",
    "paras": [
      {
        "en": "Yehuda Levi (\"A Body that Works\") stars in a new international action-thriller \"The Escape\" for Keshet International.",
        "cn": "耶胡达·利瓦伊（《有效的身体》）主演了凯舍特国际公司的一部新的国际动作惊悚片《越狱》。"
      },
      {
        "en": "Set deep in the Colombian jungle, the eight-episode series, titled \"Ha'Bricha\" in Hebrew, centers around the scion of a religious cult leader who manages to flee but is forced to leave behind his wife and child.",
        "cn": "这部八集的剧集以哥伦比亚丛林深处为背景，希伯来语名为“Ha’bricha”，故事围绕着一个邪教领袖的后代展开，他设法逃离，但被迫留下妻子和孩子。"
      },
      {
        "en": "\"The Escape\" will premiere in Israel on Keshet 12 later this year.",
        "cn": "《越狱》将于今年晚些时候在以色列开播。"
      },
      {
        "en": "Keshet International is globally distributing the tape and format.",
        "cn": "凯舍特国际公司正在全球分销磁带和格式。"
      },
      {
        "en": "“Doron, Yoav and Ariel have created a thrilling, emotionally charged series that combines a deeply human story with cinematic scale,\" said Karni Ziv, head of drama at Keshet 12.",
        "cn": "“多伦、约阿夫和阿里尔创造了一部惊心动魄、充满情感的电视剧，将深刻的人类故事与电影规模相结合，”凯舍特12的戏剧主管卡尼·齐夫说。"
      },
      {
        "en": "\"At its heart, it’s a story about family, freedom and the courage to challenge everything you’ve ever known.”",
        "cn": "“从本质上讲，这是一个关于家庭、自由和挑战一切已知事物的勇气的故事。”"
      },
      {
        "en": "\"The Escape\" is a Keshet Media Group production in association with Reisdor Productions for Keshet 12, produced by SE Films and Reisdor.",
        "cn": "“The Escape”是凯舍特传媒集团与瑞斯多制作公司联合制作的凯舍特12，由SE电影和瑞斯多制作。"
      },
      {
        "en": "Yaki Reisner and Shalom Eisenbach exec produce alongside Keshet Media Group's Avi Nir, Keshet International's Keren Shahar, and Keshet 12's Karni Ziv, Yuval Horowitz and Eze Sakson.",
        "cn": "Yaki Reisner和Shalom Eisenbach与kesheet Media Group的Avi Nir，kesheet International的Keren Shahar以及kesheet 12的Karni Ziv，Yuval Horowitz和Eze Sakson一起执行制作。"
      },
      {
        "en": "\"The Escape\" is the latest in an ambitious international slate for Keshet International, which is part of Keshet Media Group, including Claire Danes starrer \"Lovesick\" for Netflix, recently-released international thriller \"Unconditional\" for Apple TV and \"Save the Date,\" from showrunner Dana Fox, which has come out of the company's -look scripted deal with Sony Pictures Television.",
        "cn": "《越狱》是凯舍特传媒集团旗下凯舍特国际公司雄心勃勃的国际计划中的最新一部，其中包括克莱尔·丹尼斯主演的Netflix的《相思》，最近在苹果电视上上映的国际惊悚片《无条件》，以及由制片人达纳·福克斯主演的《拯救约会》，这部电影是该公司与索尼影视公司签订的剧本协议。"
      }
    ]
  },
  {
    "id": "et-toronto-platform-pick-angh-with-shetland-star-",
    "cat": "娱乐",
    "title": "Toronto Platform Pick ‘Angh,’ With ‘Shetland’ Star Douglas Henshall, Boards Jungle Book Studio for World Sales, Unveils Clip (EXCLUSIVE)",
    "titleZh": "多伦多平台挑选《Angh》，与《设得兰群岛》明星道格拉斯·亨舍尔合作，为《丛林之书》工作室的全球销售发布剪辑（独家）",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 3,
    "url": "https://variety.com/2026/film/festivals/angh-douglas-henshall-jungle-book-studio-toronto-platform-1236855800/",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/et-toronto-platform-pick-angh-with-shetland-star-.jpg",
    "paras": [
      {
        "en": "Jungle Book Studio has taken international sales rights to “ Angh,” the debut feature from Nagaland filmmaker Theja Rio.",
        "cn": "《丛林之书》工作室获得了那加兰邦电影制作人Theja b里约热内卢的处女作《Angh》的国际销售权。"
      },
      {
        "en": "The film is world premiering at the Toronto Film Festival.",
        "cn": "这部电影在多伦多电影节上全球首映。"
      },
      {
        "en": "Rio trained at the U.K.’s National Film and Television School and previously made a short film of the same name, which was honored with the Special Jury Award at Clermont-Ferrand.",
        "cn": "里约热内卢曾在英国国家电影电视学院接受培训，此前曾制作过一部同名短片，并获得克莱蒙费朗电影节评审团特别奖。"
      },
      {
        "en": "His short “Ade (On a Sunday)” premiered at the International Film Festival Rotterdam and claimed the best film prize at the MAMI Mumbai Film Festival.",
        "cn": "他的短片《星期日》在鹿特丹国际电影节首映，并在MAMI孟买电影节上获得最佳电影奖。"
      },
      {
        "en": "The film is produced by Nancy Nisa Beso through her shingle Winter Hymns Films and Rio through his Undercover Squirrel outfit.",
        "cn": "这部电影由南希·尼萨·贝索（Nancy Nisa Beso）通过她的新公司Winter hyms Films制作，并通过他的卧底松鼠服装制作b里约热内卢。"
      },
      {
        "en": "Jungle Book Studio founder Gaurav Dhingra serves as executive producer in addition to handling world sales.",
        "cn": "《奇幻森林》工作室的创始人Gaurav dininggra除了负责全球销售之外，还担任执行制片人。"
      },
      {
        "en": "Beso added: “This film comes from a strong desire to tell stories that are ours.",
        "cn": "贝索补充说：“这部电影来自于一种强烈的愿望，那就是讲述属于我们的故事。"
      },
      {
        "en": "‘Angh’ is our way of honoring our people, preserving the stories carried by our ancestors, and reclaiming our own narrative while allowing it to find its place on the global stage.",
        "cn": "“Angh”是我们尊重我们的人民的方式，保存我们祖先所携带的故事，并在允许它在全球舞台上找到自己的位置的同时，恢复我们自己的叙述。"
      },
      {
        "en": "Theja has brought an extraordinary depth of vision and sensitivity to this story, and it has been deeply meaningful to build this film alongside him.”",
        "cn": "Theja为这个故事带来了非凡的深度和敏感性，和他一起制作这部电影非常有意义。”"
      },
      {
        "en": "Dhingra brings more than two decades of producing experience to Jungle Book Studio’s sales operation.",
        "cn": "丁格拉为《奇幻森林》工作室的销售运营带来了20多年的制作经验。"
      },
      {
        "en": "His previous credits include “Faith Connections,” which sold in more than 20 territories following its Toronto premiere; “Angry Indian Goddesses,” released theatrically in more than 67 countries and licensed worldwide by Netflix; “Beyond the Known World,” the first official India-New Zealand co-production; and “Stolen,” a Venice selection that received a global release on Prime Video.",
        "cn": "他之前的作品包括《信仰联系》（Faith Connections），在多伦多首映后在20多个地区销售；《愤怒的印度女神》（Angry Indian goddess）在超过67个国家上映，由Netflix在全球范围内授权；《超越已知世界》（Beyond the Known World），这是印度和新西兰首次正式合作制作的影片；威尼斯精选影片《偷走》（Stolen）在Prime Video上全球上映。"
      },
      {
        "en": "“‘Angh’ is a spectacular amalgamation of a global cinematic aesthetic and a deeply rooted Nagamese ethos,” said Dhingra.",
        "cn": "丁格拉说：“《昂》是全球电影美学和根深蒂固的南加精神的壮观融合。”"
      },
      {
        "en": "“With both its director Theja Rio and producer Nancy Beso hailing from Nagaland, the film eschews the ‘outsider gaze’ and the pitfalls of Orientalist exoticisation, authentically anchoring its narrative in an Indigenous cultural lens shaped by lived experience.",
        "cn": "导演Theja b里约热内卢和制片人Nancy Beso都来自那加兰邦，这部电影避开了“局外人的目光”和东方主义异国情调的陷阱，真实地将其叙事固定在由生活经历塑造的土著文化镜头中。"
      },
      {
        "en": "An Indigenous story told by Indigenous filmmakers, ‘Angh’ represents some of the most exciting cinema emerging from India’s margins, with the potential to become a torchbearer for a new, truly global Indian cinema.",
        "cn": "《Angh》是一部由本土电影人讲述的本土故事，它代表了一些从印度边缘崛起的最令人兴奋的电影，有可能成为一个全新的、真正全球化的印度电影的火炬手。"
      },
      {
        "en": "As a world sales company, Jungle Book Studio can already envision ‘Angh’ setting the international buyers’ circuit alight and sparking a buzz across territories.",
        "cn": "作为一家全球销售公司，《奇幻森林》工作室已经预见到《Angh》将点燃国际买家的热情，并在各个地区掀起热潮。"
      },
      {
        "en": "We are thrilled to champion this cinematic supernova and take it to audiences worldwide.”",
        "cn": "我们很高兴能支持这部电影超新星，并把它带给全世界的观众。”"
      },
      {
        "img": "assets/covers/et-toronto-platform-pick-angh-with-shetland-star--1.jpg",
        "cap": ""
      }
    ]
  },
  {
    "id": "et-k2-media-capital-launches-at-toronto-market-wi",
    "cat": "娱乐",
    "title": "K2 Media Capital Launches at Toronto Market With a Slate of Cross-Border IP Projects (EXCLUSIVE)",
    "titleZh": "K2 Media Capital 在多伦多市场推出一系列跨境 IP 项目（独家）",
    "source": "Variety · 2026-09-10",
    "date": "2026-09-10",
    "minutes": 4,
    "url": "https://variety.com/2026/film/markets-festivals/k2-media-capital-toronto-market-cross-border-ip-projects-1236855881/",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/et-k2-media-capital-launches-at-toronto-market-wi.jpg",
    "paras": [
      {
        "en": "Gayathiri Guliani and Uzair Merchant are unveiling K2 Media Capital, a new entertainment investment and production venture, at the Toronto Film Festival market.",
        "cn": "Gayathiri Guliani和Uzair Merchant在多伦多电影节市场上推出了K2 Media Capital，这是一家新的娱乐投资和制作企业。"
      },
      {
        "en": "The company aims to identify, finance and produce high-value intellectual property that crosses borders and formats.",
        "cn": "该公司旨在识别、资助和生产跨国界和格式的高价值知识产权。"
      },
      {
        "en": "The company describes its process as a chain that starts with creating IP and moves through development, packaging, financing and production before reaching distribution and exploitation across multiple formats, with no fixed medium preferred.",
        "cn": "该公司将其流程描述为一个链条，从创建IP开始，经过开发、包装、融资和制作，最后到达多种形式的分销和开发，没有固定的媒介。"
      },
      {
        "en": "A project might end up as a film, a TV series, a streaming title, a book, a game, a soundtrack, a licensed product or an immersive experience, wherever it fits best internationally.",
        "cn": "一个项目最终可能会变成电影、电视剧、流媒体标题、书籍、游戏、配乐、授权产品或沉浸式体验，只要它最适合国际市场。"
      },
      {
        "en": "Uzair Merchant, partner at K2, said: “I have spent much of my career creating worlds, developing stories and exploring how technology can expand the way audiences experience them.",
        "cn": "K2的合伙人乌扎尔·麦钱特说：“我职业生涯的大部分时间都在创造世界，发展故事，探索技术如何扩展观众的体验方式。"
      },
      {
        "en": "K2 gives us the opportunity to take that creative thinking and build a much larger ecosystem around it, one where original IP can be developed with both creative ambition and commercial foresight.",
        "cn": "K2让我们有机会利用这种创造性思维，并围绕它建立一个更大的生态系统，在这个生态系统中，原创IP可以同时具有创造性的雄心和商业远见。"
      },
      {
        "en": "We don’t want to simply make content.",
        "cn": "我们不想简单地制作内容。"
      },
      {
        "en": "We want to build worlds, own and develop IP, create franchises and give creators a pathway from an idea to a global entertainment asset.”",
        "cn": "我们希望创造游戏世界，拥有并开发IP，创造特许经营权，并为创作者提供一条将想法转变为全球娱乐资产的道路。”"
      },
      {
        "en": "The venture has brought in an advisory board whose members work across intellectual-property and entertainment law, filmmaking, screenwriting and franchise development on one side, and international production, finance, media strategy, technology and distribution on the other.",
        "cn": "这家合资企业还引入了一个顾问委员会，其成员一方面涉及知识产权和娱乐法律、电影制作、剧本创作和特许经营开发，另一方面涉及国际制作、金融、媒体战略、技术和发行。"
      },
      {
        "en": "Board members are based in Hollywood, Asia, the Middle East and other production hubs, and will help K2 vet and build out opportunities as they move from initial rights work through financing, production, partnerships and monetization.",
        "cn": "董事会成员分布在好莱坞、亚洲、中东和其他制作中心，他们将帮助K2在从最初的版权工作到融资、制作、合作和货币化的过程中寻找和创造机会。"
      },
      {
        "en": "At the market, K2 intends to open talks with potential partners spanning the industry: sales agents, distributors, investors, family offices and media funds on the financing side, and studios, streamers, broadcasters, production companies, publishers, gaming firms, technology companies and licensing partners on the content and distribution side.",
        "cn": "在市场上，K2打算与整个行业的潜在合作伙伴展开谈判：销售代理、分销商、投资者、家族理财室和媒体基金（融资方面），以及工作室、流媒体、广播公司、制作公司、出版商、游戏公司、技术公司和内容和分销方面的授权合作伙伴。"
      },
      {
        "en": "The list of deal types on offer runs from project financing and co-production partnerships to IP acquisition, option rights, licensing, merchandising and publishing and gaming tie-ins, plus format and adaptation rights, along with global distribution and sales opportunities and potential immersive and technology collaborations.",
        "cn": "该公司提供的交易类型包括项目融资、合作制作伙伴关系、IP收购、选择权、授权、商品销售、发行和游戏捆绑、格式和改编权、全球分销和销售机会以及潜在的沉浸式和技术合作。"
      },
      {
        "en": "“K2 is about creating a pipeline rather than chasing individual projects,” said Guliani.",
        "cn": "“K2是关于建立管道，而不是追逐单个项目，”古利亚尼说。"
      },
      {
        "en": "“We want to build a portfolio of IP where creativity, ownership, capital and global market access work together.",
        "cn": "“我们希望建立一个知识产权组合，将创造力、所有权、资本和全球市场准入结合在一起。"
      },
      {
        "en": "Toronto is the first major international platform where we are opening that conversation.”",
        "cn": "多伦多是我们开启这一对话的第一个主要国际平台。”"
      },
      {
        "en": "Merchant said nothing exists in isolation, and that he believes the future of storytelling works the same way.",
        "cn": "麦钱特说，没有什么是孤立存在的，他相信未来讲故事的方式也是如此。"
      },
      {
        "en": "“K2 is about building a new ecosystem where artists can own the worlds they create, where technology amplifies rather than replaces imagination, and where culturally authentic stories rooted in science, philosophy and human experience can travel beyond borders,” he said.",
        "cn": "他说：“K2是关于建立一个新的生态系统，在这个生态系统中，艺术家可以拥有他们创造的世界，技术可以放大而不是取代想象力，根植于科学、哲学和人类经验的文化真实故事可以跨越国界。”"
      },
      {
        "en": "“The future isn’t just about creating content.",
        "cn": "“未来不仅仅是创造内容。"
      },
      {
        "en": "It’s about creating universes that artists can own, audiences can inhabit, and cultures can see themselves within.”",
        "cn": "这是关于创造一个艺术家可以拥有、观众可以居住、文化可以看到自己的宇宙。”"
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
