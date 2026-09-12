/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 20 篇，英文正文来自公开 RSS 的真实报道原文，未做改写；
 * 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：Aesop's Fables (1912) / Sky Sports / FourFourTwo / Dan Koe / Farnam Street / More To That / Ness Labs / Harper's Bazaar UK / Vanity Fair / TechCrunch AI
 */

const ARTICLES_EXTRA = [
  {
    "id": "ft-liverpool-held-at-anfield-as-fulham-pick-up-fi",
    "cat": "足球",
    "title": "Liverpool held at Anfield as Fulham pick up first point",
    "titleZh": "利物浦在安菲尔德被逼平，富勒姆收获首个积分",
    "source": "Sky Sports · 2026-09-12",
    "date": "2026-09-12",
    "minutes": 2,
    "url": "https://www.skysports.com/football/liverpool-vs-fulham/report/559480",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-liverpool-held-at-anfield-as-fulham-pick-up-fi.jpg",
    "paras": [
      {
        "en": "Report and free match highlights as Liverpool and Fulham played out a goalless draw at Anfield; Victor Munoz hit the bar as Bradley Barcola made his first Premier League start; Fulham end losing streak under Alvaro Arbeloa; Third draw in four for Andoni Iraola",
        "cn": "利物浦与富勒姆在安菲尔德战成0-0平局，本文将带来赛后报道及免费比赛集锦；维克多·穆尼奥斯一记射门击中横梁，布拉德利·巴尔科拉则迎来了个人英超首秀；富勒姆在阿尔瓦罗·阿尔贝洛亚麾下终结了连败；安东尼·伊拉奥拉执教的球队近四场比赛中第三次战平。"
      },
      {
        "img": "assets/covers/ft-liverpool-held-at-anfield-as-fulham-pick-up-fi-1.jpg",
        "cap": "Image: Oscar Bobb of Fulham is challenged by Milos Kerkez of Liverpool in the stalemate"
      },
      {
        "en": "Liverpool were held to a frustrating goalless draw as Fulham picked up their first point of the Premier League season at Anfield.",
        "cn": "利物浦在安菲尔德被富勒姆逼平，双方以0比0战平，这让利物浦感到十分沮丧，而富勒姆则在英超本赛季中拿到了首个积分。"
      },
      {
        "en": "Liverpool, who gave a first Premier League start to Bradley Barcola, were a little sluggish in their use of the ball from the outset after their exertions against Atletico Madrid.",
        "cn": "利物浦让布拉德利·巴尔科拉首次在英超首发，但在经历了与马德里竞技的激烈较量后，球队开场后在控球方面显得有些迟缓。"
      },
      {
        "en": "Alisson's error was almost punished by Goncalo Garcia but Jeremy Jacquet cleared.",
        "cn": "阿利松的失误险些被贡萨洛·加西亚抓住机会得分，但杰里米·雅克及时解围。"
      },
      {
        "en": "The Reds did come close to the breakthrough when Victor Munoz headed against the crossbar midway through the first half.",
        "cn": "红军确实曾非常接近打破僵局——上半场中段，维克多·穆尼奥斯的一记头球击中了横梁。"
      },
      {
        "en": "But Fulham enjoyed plenty of possession despite coming into this in poor form having lost their first three under Alvaro Arbeloa.",
        "cn": "尽管富勒姆在阿尔瓦罗·阿尔贝洛亚执教期间遭遇三连败，状态欠佳，但本场比赛他们仍占据了大量控球权。"
      },
      {
        "en": "They had the clearer chances in the second half too, Josh King forcing Alisson to tip the ball wide before Rodrigo Muniz should have finished when fed by fellow substitute Kevin as Fulham pushed for an unlikely winner.",
        "cn": "下半场他们同样创造了更明显的得分机会：乔什·金迫使阿利松将球托出底线，随后罗德里戈·穆尼兹在替补登场的凯文送出传球后本应破门得分——当时富勒姆正全力争取一个看似难以实现的制胜球。"
      },
      {
        "en": "Alexander Isak glanced wide at the other end in stoppage time.",
        "cn": "伤停补时阶段，亚历山大·伊萨克在另一端的一脚射门偏出球门。"
      },
      {
        "en": "The result means that Andoni Iraola is still searching for his first Premier League win at Anfield and has now drawn three of his first four games in the competition as Liverpool boss.",
        "cn": "这一结果意味着，安多尼·伊拉奥拉仍在寻求自己在安菲尔德的首场英超胜利，而他执教利物浦以来，前四场英超比赛中有三场以平局收场。"
      },
      {
        "en": "The positives here all belonged to the ex-Red Arbeloa.",
        "cn": "此处的亮点全都归功于前红军球员阿尔贝洛亚。"
      },
      {
        "img": "assets/covers/ft-liverpool-held-at-anfield-as-fulham-pick-up-fi-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/ft-liverpool-held-at-anfield-as-fulham-pick-up-fi-3.jpg",
        "cap": ""
      }
    ]
  },
  {
    "id": "ft-merson-spurs-man-city-and-man-utd-have-definin",
    "cat": "足球",
    "title": "Merson: Spurs, Man City and Man Utd have defining games this weekend",
    "titleZh": "默森：热刺，曼城和曼联本周末都将迎来决定性的比赛",
    "source": "Sky Sports · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 3,
    "url": "https://www.skysports.com/football/news/11095/13582801/spurs-man-city-and-man-utd-face-defining-premier-league-matches-this-weekend-says-paul-merson",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-merson-spurs-man-city-and-man-utd-have-definin.jpg",
    "paras": [
      {
        "en": "Winless Tottenham take on Everton on Saturday in what will be a big game for Roberto De Zerbi's side and their confidence; the Manchester derby takes place on Sunday; watch Spurs vs Everton and Manchester United vs Manchester City live on Sky Sports this weekend",
        "cn": "本周末，至今未尝胜绩的托特纳姆热刺将迎战埃弗顿，这对罗伯托·德泽尔比执教的球队及其士气而言将是一场关键战役；周日将上演曼彻斯特德比；本周末，敬请通过天空体育直播观看热刺对阵埃弗顿以及曼联对阵曼城的比赛"
      },
      {
        "img": "assets/covers/ft-merson-spurs-man-city-and-man-utd-have-definin-1.jpg",
        "cap": ""
      },
      {
        "en": "In his latest Sky Sports column, Paul Merson says Tottenham, Manchester City and Manchester United all have defining matches this weekend, even though it is early in the season.",
        "cn": "保罗·默森在最新一期《天空体育》专栏中指出，尽管赛季尚处初期，但托特纳姆热刺、曼城和曼联本周末都将迎来决定性的比赛。"
      },
      {
        "en": "Spurs are still without a win or a goal in the Premier League after three games and will play against an unbeaten Everton team on Saturday Night Football, live on Sky Sports, in front of their expectant fans.",
        "cn": "热刺在英超联赛前三轮仍未取得胜利，也未攻入一球，他们将在“周六夜赛”中迎战保持不败的埃弗顿队，比赛将由天空体育进行现场直播，届时热刺的球迷们将满怀期待地观看这场比赛。"
      },
      {
        "en": "Meanwhile on Sunday, the Manchester derby takes place as Michael Carrick's inconsistent United team take on a City side facing their first big test in the post-Pep Guardiola era.",
        "cn": "与此同时，周日将上演曼彻斯特德比，迈克尔·卡里克执教的状态起伏不定的曼联队将迎战曼城队——后者将在佩普·瓜迪奥拉离任后的时代迎来首场重大考验。"
      },
      {
        "en": "Spurs have to beat Everton this weekend.",
        "cn": "热刺本周末必须战胜埃弗顿。"
      },
      {
        "en": "It's a cup final for them - I'd go as far as to say this is their season on the line.",
        "cn": "对他们来说，这场比赛就像是一场杯赛决赛——我甚至敢说，这场比赛将决定他们整个赛季的成败。"
      },
      {
        "en": "If they lose to Everton, then you starting thinking: this is going to be another grind of a season.",
        "cn": "如果他们输给埃弗顿，那你就会开始想：这又将是一个艰难的赛季。"
      },
      {
        "en": "You would start really, really worrying as a Tottenham fan.",
        "cn": "作为托特纳姆热刺的球迷，你肯定会开始非常、非常担心了。"
      },
      {
        "en": "But if they go and beat Everton, you start going two games without a defeat, they'll be on four points.",
        "cn": "但如果他们去客场击败埃弗顿，球队将连续两场不败，届时他们的积分将达到4分。"
      },
      {
        "en": "Then all of a sudden you can build from there.",
        "cn": "然后，你就能以此为基础，继续推进了。"
      },
      {
        "en": "It's not as big as the Spurs vs Everton game on the final day of last season.",
        "cn": "这场比赛的关注度不如上赛季最后一轮马刺对阵埃弗顿的那场。"
      },
      {
        "en": "If they lost that game, they were going to Lincoln.",
        "cn": "如果他们输掉那场比赛，就得去林肯了。"
      },
      {
        "en": "But, at the moment, I just don't see this team putting five or six wins on the trot together.",
        "cn": "不过，就目前来看，我实在无法想象这支球队能连赢五六场。"
      },
      {
        "en": "So this is a big football match.",
        "cn": "所以这是一场重要的足球比赛。"
      },
      {
        "en": "The start Spurs have had is Brentford away, Newcastle at home and Nottingham Forest away.",
        "cn": "热刺赛季初的赛程是客场对阵布伦特福德、主场迎战纽卡斯尔，以及客场对阵诺丁汉森林。"
      },
      {
        "en": "If they lose to Everton and have one point from four games, you start to worry.",
        "cn": "如果他们输给埃弗顿，而且四场比赛只拿到1分，那你就得开始担心了。"
      },
      {
        "en": "If they beat Everton, then they've got every chance of beating Aston Villa at home next week.",
        "cn": "如果他们能击败埃弗顿，那么下周主场对阵阿斯顿维拉时，他们就有十足的胜算。"
      },
      {
        "en": "If they don't beat Everton, they're not beating Villa.",
        "cn": "如果他们不能战胜埃弗顿，就别指望能战胜维拉了。"
      },
      {
        "en": "When you win football matches, you expect to win the one after.",
        "cn": "当你赢下一场足球比赛后，自然会期待下一场也能获胜。"
      },
      {
        "en": "But if you don't, the confidence goes.",
        "cn": "但如果你不这样做，自信就会消失。"
      },
      {
        "en": "Man Utd have got the Manchester derby - and their season is in the balance too.",
        "cn": "曼联将迎战曼彻斯特德比——而他们的赛季前景也悬而未决。"
      },
      {
        "en": "If you beat Man City, you're flying.",
        "cn": "如果击败了曼城，那你就势如破竹了。"
      },
      {
        "en": "If you get beat by Man City, here we go again.",
        "cn": "要是输给曼城，那又来这套了。"
      },
      {
        "en": "It would be one point from two games including the Everton game.",
        "cn": "包括对阵埃弗顿的比赛在内，两场比赛将积1分。"
      }
    ]
  },
  {
    "id": "ft-rogers-and-palmer-helping-each-other-thrive",
    "cat": "足球",
    "title": "Rogers and Palmer helping each other thrive",
    "titleZh": "罗杰斯和帕尔默相互扶持，共同进步",
    "source": "Sky Sports · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 3,
    "url": "https://www.skysports.com/football/news/11095/13584004/cole-palmer-and-morgan-rogers-becoming-one-of-premier-leagues-most-dangerous-double-acts-the-radar",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/ft-rogers-and-palmer-helping-each-other-thrive.jpg",
    "paras": [
      {
        "en": "Cole Palmer and Morgan Rogers combined to deadly effect for Chelsea against Leeds; The Radar column looks at how their on-pitch relationship is flourishing under Xabi Alonso; Alex Scott's strong start to the season for Bournemouth also features",
        "cn": "在切尔西对阵利兹联的比赛中，科尔·帕尔默和摩根·罗杰斯联手发挥了致命作用；“雷达”专栏探讨了在哈维·阿隆索的带领下，两人在场上的默契如何日益提升；此外，还介绍了亚历克斯·斯科特在本赛季为伯恩茅斯开局表现强劲的情况。"
      },
      {
        "img": "assets/covers/ft-rogers-and-palmer-helping-each-other-thrive-1.jpg",
        "cap": ""
      },
      {
        "en": "Welcome to The Radar, a Sky Sports column in which Nick Wright uses a blend of data and opinion to shed light on need-to-know Premier League stories.",
        "cn": "欢迎阅读《雷达》（The Radar），这是天空体育的一档专栏，尼克·赖特（Nick Wright）在其中结合数据与观点，深入剖析英超联赛中不容错过的热点新闻。"
      },
      {
        "en": "🔺 Palmer-Rogers double act analysed 🔺 Scott starring for Bournemouth 🔺 Crystal Palace's tough-tackler",
        "cn": "🔺 帕尔默-罗杰斯搭档分析 🔺 斯科特在伯恩茅斯大放异彩 🔺 水晶宫的强硬铲球手"
      },
      {
        "en": "Morgan Rogers was bemused when he found out Cole Palmer was man of the match in Chelsea's win over Leeds.",
        "cn": "当摩根·罗杰斯得知科尔·帕尔默在切尔西战胜利兹联的比赛中当选全场最佳球员时，他感到有些困惑。"
      },
      {
        "en": "\"I got four assists,\" he pleaded.",
        "cn": "“我送出了四次助攻，”他辩解道。"
      },
      {
        "en": "\"I'll say you should have had it,\" replied a smirking Palmer.",
        "cn": "“我倒觉得你本该得到它的，”帕尔默咧嘴一笑，回答道。"
      },
      {
        "en": "I'm just a bystander,\" added Rogers.",
        "cn": "“我只是个旁观者，”罗杰斯补充道。"
      },
      {
        "en": "The amusing exchange, captured by the Sky Sports cameras before their interview, showed the chemistry between the pair.",
        "cn": "这段有趣的互动被天空体育的摄像机在采访开始前捕捉到，展现了两人之间的默契。"
      },
      {
        "en": "It can be seen on the pitch too.",
        "cn": "这一点在赛场上也能看出来。"
      },
      {
        "en": "Do they feel like they've been playing together forever?",
        "cn": "他们是否觉得自己好像一直在一起打球？"
      },
      {
        "en": "\"We pretty much have,\" answered Rogers.",
        "cn": "“我们基本上已经做到了，”罗杰斯回答道。"
      },
      {
        "en": "Close friends and former team-mates in England and Manchester City's youth teams, Rogers and Palmer have picked up where they left off at Chelsea, wreaking havoc either side of Joao Pedro and providing a combined 11 goals and assists in five games so far.",
        "cn": "罗杰斯和帕尔默在英格兰和曼城青训队时期便是挚友兼前队友，如今在切尔西他们重拾昔日默契，在若昂·佩德罗两侧大肆制造威胁，迄今五场比赛中已合力贡献了11个进球和助攻。"
      },
      {
        "en": "Their half-time introductions inspired Chelsea's comeback on Wednesday.",
        "cn": "周三，中场休息时的球员介绍激励了切尔西完成逆转。"
      },
      {
        "en": "After Rogers had ingeniously flicked the ball off his backside to set up Palmer's equaliser, the pair could be seen combining in the lead-up to Chelsea's third and sixth goals too.",
        "cn": "在罗杰斯巧妙地用臀部一磕将球传给帕尔默，助其扳平比分后，两人还在切尔西的第三球和第六球攻入前的配合中展现了默契。"
      },
      {
        "en": "Those combinations have become a theme.",
        "cn": "这些组合已成为一种主题。"
      },
      {
        "en": "Across Chelsea's five games so far, Rogers has played nearly twice as many passes to Palmer than any other player, with 19, while only defender Josh Acheampong has received more passes from Palmer, on 15.",
        "cn": "在切尔西迄今为止的五场比赛中，罗杰斯传给帕尔默的球数（19次）几乎是其他任何球员的两倍，而只有后卫乔什·阿切安蓬从帕尔默那里接到的传球次数（15次）比他更多。"
      },
      {
        "en": "They have only directly combined for one goal, surprisingly.",
        "cn": "出人意料的是，他们两人直接配合仅打入一球。"
      },
      {
        "en": "But that total could easily be higher.",
        "cn": "但这一总数很可能更高。"
      },
      {
        "en": "In the 4-3 win over Brighton, they took it in turns to tee each other up, only to be denied by last-ditch blocks.",
        "cn": "在4比3战胜布莱顿的比赛中，他们轮流为彼此送出助攻，却屡屡被对方在最后关头封堵。"
      },
      {
        "en": "In their opener against Fulham, Rogers created three shooting chances for Palmer but he couldn't capitalise.",
        "cn": "在对阵富勒姆的揭幕战中，罗杰斯为帕尔默创造了三次射门机会，但他未能把握住。"
      },
      {
        "en": "In total, they have created nine chances for each other, which is more than twice as many as any other two players in the Premier League, ahead of five pairings, among them Palmer and Joao Pedro and Antoine Semenyo and Erling Haaland, on four.",
        "cn": "两人总共为彼此创造了9次得分机会，这一数字是英超其他任何一对球员的两倍多，领先于另外五对组合——其中包括帕尔默和若昂·佩德罗、安托万·塞梅尼奥和埃尔林·哈兰德（均为4次）。"
      },
      {
        "en": "Although most expected Palmer to be the provider for Rogers, it has more commonly been the other way around so far.",
        "cn": "尽管大多数人原本预计帕尔默会为罗杰斯送出助攻，但到目前为止，情况往往恰恰相反。"
      },
      {
        "en": "Palmer finished last season with a run of one goal in 13 games but has four in five this term, his threat increased thanks in part to his new team-mate.",
        "cn": "帕尔默上赛季最后13场比赛仅打入1球，但本赛季前5场比赛已攻入4球，他的威胁性有所提升，这在一定程度上要归功于他的新队友。"
      },
      {
        "en": "Rogers explained how they intended to help each other after his arrival.",
        "cn": "罗杰斯解释了在他抵达后，他们打算如何互相帮助。"
      }
    ]
  },
  {
    "id": "ft-no-wins-and-no-goals-how-concerned-should-spur",
    "cat": "足球",
    "title": "No wins and no goals - how concerned should Spurs be to PL season start?",
    "titleZh": "未尝胜绩且一球未进——热刺对英超赛季开局该有多担心？",
    "source": "Sky Sports · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 4,
    "url": "https://www.skysports.com/football/news/11095/13583499/how-concerned-should-big-spending-tottenham-be-after-winless-and-goalless-start-to-premier-league-season",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/ft-no-wins-and-no-goals-how-concerned-should-spur.jpg",
    "paras": [
      {
        "en": "Spurs are yet to win or score in the Premier League this season despite a big summer of spending; Roberto De Zerbi's side also failed to have a shot on target last weekend; watch Tottenham vs Everton on Saturday, live on Sky Sports Premier League from 5pm; kick-off 5.30pm",
        "cn": "尽管今夏大手笔引援，热刺本赛季在英超联赛中仍未取得胜利或进球；罗伯托·德泽尔比执教的球队上周末甚至未能完成一次射正；周六下午5点起，敬请通过Sky Sports Premier League直播观看托特纳姆热刺对阵埃弗顿的比赛；比赛将于下午5点30分开球"
      },
      {
        "img": "assets/covers/ft-no-wins-and-no-goals-how-concerned-should-spur-1.jpg",
        "cap": "Image: Tottenham are yet to win or score in the Premier League this season"
      },
      {
        "en": "It has been a winless and goalless start to the new Premier League season for big-spending Tottenham.",
        "cn": "对于大手笔引援的托特纳姆热刺来说，新赛季的英超联赛开局至今未尝胜绩，且一球未进。"
      },
      {
        "en": "Last weekend's 0-0 draw at Nottingham Forest saw Spurs fail to have a shot on target for the first time in a league game in over four years as they battled to their first point of the season.",
        "cn": "上周末客场对阵诺丁汉森林的比赛中，热刺以0-0战平对手，这是他们四年来首次在联赛中未能完成一次射正，最终艰难地拿到了本赛季的首个积分。"
      },
      {
        "en": "Roberto De Zerbi's new-look side are yet to click after a £332m summer outlay which saw 10 new players arrive.",
        "cn": "罗伯托·德泽尔比率领的这支焕然一新的球队，在今夏斥资3.32亿英镑引进10名新援后，至今仍未形成默契。"
      },
      {
        "en": "Having made their worst start to a league season since 2008, Spurs go in search of their first victory on Saturday as they host Everton, live on Sky Sports.",
        "cn": "热刺迎来了自2008年以来最糟糕的联赛开局，他们将于周六主场迎战埃弗顿，力争取得赛季首胜，本场比赛将在天空体育进行现场直播。"
      },
      {
        "en": "Here, Sky Sports News' Tottenham reporter Michael Bridge answers your questions, while we also look at the stats behind their start and hear your thoughts on their opening three league games...",
        "cn": "在此，天空体育新闻的托特纳姆热刺记者迈克尔·布里奇将为您解答疑问；同时，我们还将分析球队开局阶段的各项数据，并听取大家对球队联赛前三场比赛的看法……"
      },
      {
        "en": "It's only three games, and Spurs would've taken a draw at Nottingham Forest.",
        "cn": "毕竟才三场比赛，而且热刺在诺丁汉森林的比赛中本会接受平局的结果。"
      },
      {
        "en": "It's a hard place to go under a very good manager in Oliver Glasner.",
        "cn": "在奥利弗·格拉斯纳这位非常出色的主教练麾下，这确实是个难以应对的局面。"
      },
      {
        "en": "\"I was at the Brentford game where Spurs were well beaten.",
        "cn": "“我当时在布伦特福德的比赛现场，热刺在那场比赛中惨败。”"
      },
      {
        "en": "I can fully appreciate that Tottenham being under-prepared is unacceptable, so I'll flip it round and say Brentford gave Spurs a good hiding and they fully deserved their win.",
        "cn": "我完全理解托特纳姆热刺准备不足是不可接受的，所以我要换个说法：布伦特福德狠狠教训了热刺，他们完全配得上这场胜利。"
      },
      {
        "en": "\"Newcastle could have gone either way, but Spurs weren't clinical enough.",
        "cn": "“纽卡斯尔的比赛结果本可能朝任何一方发展，但热刺的把握机会能力不够强。”"
      },
      {
        "en": "But the reason why I'm not concerned is that it's still so early in the season.",
        "cn": "但我之所以不担心，是因为赛季才刚刚开始。"
      },
      {
        "en": "\"The last three games have shown me a little bit of a realisation that you can't expect it all to click so quickly when there have been so many incomings and departures.\"",
        "cn": "“最近的三场比赛让我多少意识到，当球队人员流动如此频繁时，不能指望一切能这么快就磨合到位。”"
      },
      {
        "en": "\"De Zerbi absolutely did not have any complaints about the medical team.",
        "cn": "“德泽尔比对医疗团队绝对没有任何不满。”"
      },
      {
        "en": "He's working closely with the medical team.",
        "cn": "他正在与医疗团队密切合作。"
      },
      {
        "en": "\"Let's not forget that in the last couple of seasons Spurs have suffered an injury crisis, with key players missing an entire season.",
        "cn": "“别忘了，在过去的几个赛季里，热刺曾遭遇伤病危机，多名主力球员因此缺席了整个赛季。”"
      },
      {
        "en": "\"Tottenham Hotspur have worked hard over the last few months to ensure that this doesn't happen again, including an investigation which looked into whether the pitch had a bearing on such serious injuries.",
        "cn": "“托特纳姆热刺在过去几个月里付出了巨大努力，以确保此类事件不再发生，其中包括一项调查，旨在查明球场状况是否与这些严重伤情有关。”"
      },
      {
        "en": "\"To clarify, De Zerbi doesn't want to take players off at certain minutes, but he's instructed to do so by his medical staff.",
        "cn": "“需要澄清的是，德泽尔比并不想在特定时间将球员换下，而是根据医疗团队的指示才这么做的。”"
      },
      {
        "en": "\"He's not challenging them or being divisive.",
        "cn": "“他既没有挑战他们，也没有制造分裂。"
      },
      {
        "en": "They are ensuring that De Zerbi has these players for the long term to hopefully prevent situations like Mohammed Kudus and James Maddison from occurring again.\"",
        "cn": "“他们正确保德泽尔比能长期留住这些球员，以期避免穆罕默德·库杜斯和詹姆斯·马迪森那样的情况再次发生。”"
      },
      {
        "en": "\"If it wasn't for De Zerbi, there'd have been a very high chance Tottenham would be in the Championship right now.",
        "cn": "“要不是德泽尔比，热刺现在很有可能已经在英冠了。”"
      },
      {
        "en": "\"Spurs have given De Zerbi the keys to mould the squad how he sees fit.",
        "cn": "“热刺已赋予德泽尔比全权，让他按照自己的想法打造球队。”"
      },
      {
        "en": "I'm of the opinion that he has earned the right to have those keys.",
        "cn": "我认为他已经赢得了拥有那些钥匙的权利。"
      },
      {
        "en": "\"He has made tough decisions, including allowing Luka Vuskovic to go to Brighton and to bring in Jan Paul van Hecke for a big fee despite him having a year to go on his contract.",
        "cn": "“他做出了许多艰难的决定，包括放行卢卡·武斯科维奇转会布莱顿，以及尽管扬·保罗·范·赫克的合同还剩一年，仍以高价将其引进。”"
      }
    ]
  },
  {
    "id": "ft-footballers-give-me-hundreds-of-thousands-of-p",
    "cat": "足球",
    "title": "‘Footballers give me hundreds of thousands of pounds to buy houses for them’ Homes Under the Hammer TV star and ex-Manchester United striker Dion Dublin reveals Wrexham project",
    "titleZh": "足球运动员们给我几十万英镑，让我帮他们买房”——电视节目《Homes Under the Hammer》的明星，前曼联前锋迪翁·都柏林透露了雷克瑟姆项目",
    "source": "FourFourTwo · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 4,
    "url": "https://www.fourfourtwo.com/person/footballers-give-me-hundreds-of-thousands-of-pounds-to-buy-houses-for-them-homes-under-the-hammer-tv-star-and-ex-manchester-united-striker-dion-dublin-reveals-wrexham-project",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-footballers-give-me-hundreds-of-thousands-of-p.jpg",
    "paras": [
      {
        "en": "Dublin often found himself in the PrimeLocation inside the penalty area during his playing days",
        "cn": "在球员时代，都柏林经常能在禁区内占据绝佳位置"
      },
      {
        "en": "The best features, fun and footballing quizzes, straight to your inbox every week.",
        "cn": "每周精选内容、趣味活动和足球问答，直接送达您的收件箱。"
      },
      {
        "en": "Fantastic football content straight to your inbox!",
        "cn": "精彩足球内容直达您的收件箱！"
      },
      {
        "en": "From the latest transfer news, quizzes, videos, features and interviews with the biggest names in the game, plus lots more.",
        "cn": "涵盖最新的转会新闻、趣味问答、视频、专题报道以及对足坛巨星的专访，还有更多精彩内容。"
      },
      {
        "en": "Get full access to premium articles, exclusive features and a growing list of member rewards.",
        "cn": "即可畅享所有优质文章、独家专题以及日益丰富的会员福利。"
      },
      {
        "en": "Former Manchester United striker Dion Dublin has revealed his latest venture: building and managing property portfolios for professional footballers",
        "cn": "前曼联前锋迪翁·都柏林透露了他的最新事业：为职业足球运动员构建和管理房地产投资组合"
      },
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "en": "The Homes Under the Hammer presenter, who since hanging up his boots has transitioned from Premier League goalscoring to real estate expertise and punditry, is using his industry knowledge to help fellow players secure their financial futures.",
        "cn": "这位《Homes Under the Hammer》节目的主持人，自挂靴后便从英超射手转型为房地产专家和评论员，如今正利用自己的行业知识帮助前队友们保障未来的财务安全。"
      },
      {
        "en": "Speaking exclusively to FourFourTwo, Dublin disclosed how older players regularly approach him with substantial sums, relying on his team to locate and manage brick-and-mortar investments.",
        "cn": "在接受《FourFourTwo》独家采访时，都柏林透露，一些年长的球员经常带着大笔资金找他，希望依靠他的团队来寻找并管理实体投资项目。"
      },
      {
        "en": "\"Where there's some bad, there's also good too, but come and speak to Dion!",
        "cn": "“有坏的一面，自然也有好的一面，不过还是来跟迪昂聊聊吧！"
      },
      {
        "en": "I'll hook you up,\" Dublin said.",
        "cn": "“我来帮你搞定，”都柏林说道。"
      },
      {
        "img": "assets/covers/ft-footballers-give-me-hundreds-of-thousands-of-p-1.jpg",
        "cap": "Dublin often found himself in the PrimeLocation inside the penalty area during his playing days (Image credit:"
      },
      {
        "en": "\"I'm already doing it for some of the older players, without mentioning any names.",
        "cn": "“我已经在为一些老队员这么做了，不过就不点名了。”"
      },
      {
        "en": "They come straight to me and my estate agent.",
        "cn": "他们直接找我和我的房产经纪人。"
      },
      {
        "en": "' Dion, I've got a couple of hundred grand, can you do something for me?'\"",
        "cn": "“迪翁，我手头有几十万，你能帮我办点事吗？”"
      },
      {
        "en": "Dublin has focused much of his property enterprise in North Wales, specifically around the Wrexham area, where attention surrounding the now-Championship level football club has fuelled a market boom.",
        "cn": "都柏林将其房地产业务的大部分集中在北威尔士，特别是雷克瑟姆地区，那里围绕着如今已升入英冠联赛的足球俱乐部所引发的热潮，推动了当地房地产市场的繁荣。"
      },
      {
        "img": "assets/covers/ft-footballers-give-me-hundreds-of-thousands-of-p-2.jpg",
        "cap": "Executive Producers Rob Mac and Ryan Reynolds attend an FYC red carpet event for FX's Welcome to Wrexham in Lo"
      },
      {
        "en": "\"I've got a few of them houses in Wrexham now, which is a bit of a hot spot with all the attention around the football club.",
        "cn": "“我现在在雷克瑟姆有几套房子，那里因为足球俱乐部备受关注，成了一个热门地区。”"
      },
      {
        "en": "What we then do is manage and maintain the properties and [the players] get a bit of passive income.\"",
        "cn": "“接下来，我们会负责管理和维护这些房产，而[玩家]则能获得一些被动收入。”"
      },
      {
        "en": "Having spent years in the game, Dublin is familiar with traditional footballer enclaves like Knutsford, Wilmslow, and Alderley Edge, noting they are 'all beautiful areas to live in but very expensive.' However, he advises buyers to look at adjacent locations for better value.",
        "cn": "在足球界打拼多年，都柏林对克努茨福德、威尔姆斯洛和奥尔德利埃奇等传统足球运动员聚居地十分熟悉，他指出这些地方“都是宜居的美丽区域，但房价非常高”。不过，他建议购房者将目光投向周边地区，以获得更高的性价比。"
      },
      {
        "en": "\"Cheshire can be expensive but if you look at places on the outskirts like Congleton and other places just off the M6 they can be incredible as well, so you don't have to go for the top end.\"",
        "cn": "“切斯特郡的房价可能比较高，但如果你看看康格尔顿等郊区，以及M6高速公路沿线其他地方，那里的房源同样非常不错，所以不必非得选择最昂贵的房源。”"
      },
      {
        "en": "Dublin's regular travels across the country to carry out television duties takes him to locations like Stoke, Walsall, Lincoln, and Grimsby, but all that has done is reinforced his belief that hidden gems exist everywhere.",
        "cn": "都柏林为了履行电视工作职责，经常在全国各地奔波，足迹遍布斯托克、沃尔索尔、林肯和格里姆斯比等地，但这一切反而让他更加确信，处处都有不为人知的宝藏。"
      },
      {
        "en": "\"My advice is to try and find those places but most importantly find the place that works for you.",
        "cn": "“我的建议是，试着去寻找这些地方，但最重要的是找到最适合你的那个地方。"
      },
      {
        "img": "assets/covers/ft-footballers-give-me-hundreds-of-thousands-of-p-3.jpg",
        "cap": "72 goals in 162 games for Coventry. You could say that was the Rightmove (Image credit: Alamy)"
      },
      {
        "en": "\"I think if you're investing in property then you need to look anywhere north of London and Watford and you might have a chance to get a bit of value for your money.",
        "cn": "“我认为，如果你打算投资房产，就该把目光投向伦敦和沃特福德以北的任何地方，这样或许能让你的钱花得物有所值。”"
      },
      {
        "en": "\"That said, if you've got a load of money, then you could afford to do it down in London.",
        "cn": "“话虽如此，如果你手头宽裕的话，那你完全可以在伦敦做这件事。”"
      },
      {
        "en": "The further north you go, the more bargains you're going to get, but you won't be living in London.\"",
        "cn": "“你往北走得越远，能淘到的便宜货就越多，但你就不能住在伦敦了。”"
      }
    ]
  },
  {
    "id": "ft-friday-football-quiz-episode-132-can-you-get-2",
    "cat": "足球",
    "title": "Friday Football Quiz, episode 132: Can you get 20 correct answers?",
    "titleZh": "周五足球问答，第132期：你能答对20道题吗？",
    "source": "FourFourTwo · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 3,
    "url": "https://www.fourfourtwo.com/quiz/friday-football-quiz-110926",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/ft-friday-football-quiz-episode-132-can-you-get-2.jpg",
    "paras": [
      {
        "en": "The best features, fun and footballing quizzes, straight to your inbox every week.",
        "cn": "每周精选内容、趣味活动和足球问答，直接送达您的收件箱。"
      },
      {
        "en": "Fantastic football content straight to your inbox!",
        "cn": "精彩足球内容直达您的收件箱！"
      },
      {
        "en": "From the latest transfer news, quizzes, videos, features and interviews with the biggest names in the game, plus lots more.",
        "cn": "涵盖最新的转会新闻、趣味问答、视频、专题报道以及对足坛巨星的专访，还有更多精彩内容。"
      },
      {
        "en": "Get full access to premium articles, exclusive features and a growing list of member rewards.",
        "cn": "即可畅享所有优质文章、独家专题以及日益丰富的会员福利。"
      },
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "img": "assets/covers/ft-friday-football-quiz-episode-132-can-you-get-2-1.jpg",
        "cap": "(Image credit: Getty Images)"
      },
      {
        "en": "Do you know who replaced Antonio Conte as Chelsea manager, who won the Best Goalkeeper gong at the 2002 World Cup, what West Ham United removed from their badge 10 years ago and where Osasuna are based?",
        "cn": "你知道谁接替了安东尼奥·孔蒂成为切尔西主教练？谁在2002年世界杯上获得了最佳门将奖？西汉姆联10年前从队徽上移除了什么？奥萨苏纳的所在地在哪里？"
      },
      {
        "en": "Course you do: and now's your time to prove it with another Friday Football Quiz, back for a 132nd edition with 20 questions ready whenever you are.",
        "cn": "当然了：现在正是你大显身手的时候——又一期“周五足球问答”回归了，这是第132期，20道题目已准备就绪，随时等你来挑战。"
      },
      {
        "en": "Moving from Friday teasers to big-money transfers, opening-day history, and international immortality, we've got a fresh line-up of Kwizly -powered quizzes to carry on with, if you'd like?",
        "cn": "从周五的预告片，到天价转会、揭幕战历史，再到国际足坛的传奇人物，我们准备了一系列由Kwizly提供支持的全新问答题，您想继续挑战吗？"
      },
      {
        "en": "We're launching straight into big-money Anfield blockbusters and opening-weekend folklore.",
        "cn": "我们将直接迎来安菲尔德那些高额转会费的重量级对决，以及开赛周末的经典传奇。"
      },
      {
        "en": "First, test your knowledge of Merseyside transfer strategy by naming Liverpool's 50 most expensive signings ever, tracing the record-breaking fees that brought world-class talent to Anfield across the modern era.",
        "cn": "首先，通过列举利物浦队史上转会费最高的50名球员，来检验你对默西塞德郡转会策略的了解，追溯现代足球史上那些创下转会费纪录、将世界级球星带到安菲尔德的交易。"
      },
      {
        "en": "Once you've audited Liverpool's spending history, travel back through over three decades of kickoff drama to name the first goalscorer of every Premier League season since 1992-93, a ruthless trial of opening-day trivia that separates casual observers from deep-cut archival scholars.",
        "cn": "在审视完利物浦的开支历史后，不妨回溯三十余年的赛季揭幕战，列出自1992-93赛季以来每个英超赛季的首个进球者——这是一场对揭幕战冷知识的严苛考验，能将普通观众与深耕档案的学者区分开来。"
      },
      {
        "en": "Next, name every England player with over 50 caps, honouring the half-century mainstays who anchored the national team across generations.",
        "cn": "接下来，请列举所有代表英格兰队出场超过50次的球员，以此向这些跨越数代、为国家队立下汗马功劳的“半世纪元老”们致敬。"
      },
      {
        "en": "After celebrating those Three Lions icons, scale the ultimate heights of the global game to identify every Ballon d'Or winner to have won the World Cup, celebrating the exclusive pantheon of legends who achieved both individual perfection and ultimate international glory.",
        "cn": "在致敬了这些“三狮军团”的传奇人物之后，让我们将目光投向世界足坛的巅峰，盘点所有曾荣膺金球奖并夺得世界杯冠军的球员，向这一群既实现了个人完美，又赢得了国际足坛至高荣耀的传奇巨星们致敬。"
      },
      {
        "img": "assets/covers/ft-friday-football-quiz-episode-132-can-you-get-2-2.jpg",
        "cap": ""
      },
      {
        "en": "Mark White is the Digital Content Editor at FourFourTwo.",
        "cn": "马克·怀特是《FourFourTwo》的数字内容编辑。"
      },
      {
        "en": "During his time on the brand, Mark has written three cover features on Mikel Arteta, Martin Odegaard and the Invincibles, and has written pieces on subjects ranging from Sir Bobby Robson's time at Barcelona to the career of Robinho.",
        "cn": "在为该品牌供职期间，马克曾撰写过三篇封面专题报道，分别聚焦米克尔·阿尔特塔、马丁·厄德高和“不败之师”，还撰写过许多文章，主题涵盖从鲍比·罗布森爵士在巴塞罗那的执教岁月到罗比尼奥的职业生涯等方方面面。"
      },
      {
        "en": "An encyclopedia of football trivia and collector of shirts, he first joined the team back in 2020 as a staff writer.",
        "cn": "他不仅是一位足球冷知识百科全书，还热衷于收藏球衣，于2020年首次以专职撰稿人的身份加入本团队。"
      },
      {
        "en": "Please logout and then login again, you will then be prompted to enter your display name.",
        "cn": "请先退出登录，然后重新登录，系统会提示您输入显示名称。"
      },
      {
        "en": "FourFourTwo is part of Future plc, an international media group and leading digital publisher.",
        "cn": "《FourFourTwo》隶属于Future plc，这是一家国际媒体集团，也是领先的数字出版商。"
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
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh.jpg",
    "paras": [
      {
        "en": "Coventry City finished 11 points clear at the top of the Championship last season",
        "cn": "上赛季，考文垂城以11分的优势领跑英冠积分榜"
      },
      {
        "en": "West Ham United are starting to click after a slow start to the campaign",
        "cn": "西汉姆联队在赛季初表现低迷后，如今开始渐入佳境"
      },
      {
        "en": "Middlesbrough manager Kim Hellberg is aiming to mount a promotion push",
        "cn": "米德尔斯堡主教练金·赫尔贝格正致力于带领球队冲击升级"
      },
      {
        "en": "The best features, fun and footballing quizzes, straight to your inbox every week.",
        "cn": "每周精选内容、趣味活动和足球问答，直接送达您的收件箱。"
      },
      {
        "en": "Fantastic football content straight to your inbox!",
        "cn": "精彩足球内容直达您的收件箱！"
      },
      {
        "en": "From the latest transfer news, quizzes, videos, features and interviews with the biggest names in the game, plus lots more.",
        "cn": "涵盖最新的转会新闻、趣味问答、视频、专题报道以及对足坛巨星的专访，还有更多精彩内容。"
      },
      {
        "en": "Get full access to premium articles, exclusive features and a growing list of member rewards.",
        "cn": "即可畅享所有优质文章、独家专题以及日益丰富的会员福利。"
      },
      {
        "en": "The early weeks of the Championship campaign have been full of goals and shock results - if that continues, it will be a season for the ages",
        "cn": "英冠联赛开赛以来的几周里，进球如潮，冷门频出——如果这种势头持续下去，这必将是一个载入史册的赛季"
      },
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "en": "The Championship is often branded as the most competitive and unpredictable league in world football.",
        "cn": "英冠联赛常被誉为世界足坛竞争最激烈、最难以预测的联赛。"
      },
      {
        "en": "Except that's not always the case.",
        "cn": "不过，情况并非总是如此。"
      },
      {
        "en": "Parachute payments have skewed the odds in favour of the clubs relegated from the Premier League - in each of the past six seasons, at least one of the automatic promotion places have been filled by a team who spent the previous campaign in the top flight.",
        "cn": "“降级补偿金”使英超降级球队的晋级几率有所提升——在过去的六个赛季中，每个赛季至少有一个直接升级名额被上一赛季还在顶级联赛效力的球队占据。"
      },
      {
        "en": "That trend could continue this term but it doesn't feel like a foregone conclusion, while the play-off and relegation pictures are equally exciting.",
        "cn": "这一趋势在本赛季可能会延续，但似乎并非板上钉钉，而季后赛和保级战的形势同样扣人心弦。"
      },
      {
        "en": "Ladies and gentlemen, this could be the most on-brand Championship season for some time.",
        "cn": "女士们、先生们，这或许是近来最符合该联赛品牌调性的冠军赛季。"
      },
      {
        "img": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh-1.jpg",
        "cap": "Coventry City finished 11 points clear at the top of the Championship last season (Image credit: Getty Images)"
      },
      {
        "en": "Last season's Championship was a tough act to follow.",
        "cn": "上赛季的英冠联赛表现实在令人难以超越。"
      },
      {
        "en": "Coventry City lifted the title to return to the Premier League after 25 years away, Hull City won the play-offs despite starting the campaign as one of the favourites to go down, and Leicester City suffered a shock second relegation in a row.",
        "cn": "考文垂城队夺冠，时隔25年重返英超；赫尔城队尽管在赛季初被视为降级热门之一，但最终赢得了升级附加赛；而莱斯特城队则遭遇了令人震惊的连续第二个赛季降级。"
      },
      {
        "en": "Furthermore, the teams who came down from the Premier League were not as dominant as in previous years.",
        "cn": "此外，从英超降级的球队也没有往年那样占据绝对优势。"
      },
      {
        "en": "Ipswich Town were the only member of that trio to gain promotion, finishing second behind Coventry, and their total of 84 points ended a run of five seasons where one of the three relegated clubs reached 90 points or more in their first campaign back in the Championship.",
        "cn": "伊普斯维奇镇是这三支球队中唯一成功升入英冠的球队，他们以第二名的成绩紧随考文垂之后，而他们总共拿到的84分，也终结了此前连续五个赛季中，每赛季都有降级球队在重返英冠的首个赛季中拿到90分或以上的纪录。"
      },
      {
        "img": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh-2.jpg",
        "cap": "West Ham United are starting to click after a slow start to the campaign (Image credit: Getty Images)"
      },
      {
        "en": "Meanwhile, the three teams promoted from League One - Birmingham City, Wrexham and Charlton Athletic - all stayed up, the third year in a row in which that has happened.",
        "cn": "与此同时，从英甲升级的三支球队——伯明翰城、雷克瑟姆和查尔顿竞技——均成功保级，这是连续第三年出现这种情况。"
      },
      {
        "en": "Despite all of that, this season is shaping up to be even better.",
        "cn": "尽管如此，本赛季看起来会更加精彩。"
      },
      {
        "en": "If it's goals you want, there have already been lots of them.",
        "cn": "如果你想看进球，那已经有很多了。"
      },
      {
        "en": "The league average of 2.89 goals per game ahead of Wednesday night's fixtures is higher than the average across a 46-match campaign in any of the past 20 years, on account of there being several teams who are great at scoring goals but not so good at keeping them out.",
        "cn": "在周三晚的比赛开始前，联赛场均进球数为2.89个，这一数据高于过去20年中任何一个46轮赛季的场均进球数，这主要是因为有几支球队虽然擅长进球，但在防守方面却表现欠佳。"
      },
      {
        "en": "Meanwhile, the old adage that anyone can beat anyone in the Championship appears truer than ever.",
        "cn": "与此同时，“英冠联赛中任何球队都有可能击败任何对手”这一老生常谈，如今似乎比以往任何时候都更贴切。"
      },
      {
        "en": "Some teams' results have fluctuated wildly, including Charlton winning at West Ham United but losing 4-0 at Stoke City, Blackburn Rovers stunning Middlesbrough only to fall to defeat at previously pointless Preston North End, and Millwall beating Bristol City, Norwich City and Bolton Wanderers by a combined score of 9-0, but losing to Southampton and Wrexham 8-1 on aggregate.",
        "cn": "一些球队的战绩起伏剧烈，包括查尔顿客场战胜西汉姆联，却在斯托克城主场0-4告负，布莱克本流浪者队先是爆冷击败米德尔斯堡，随后却输给了此前未得分的普雷斯顿北端队；米尔沃尔队虽然以总比分9-0先后击败了布里斯托尔城、诺维奇城和博尔顿流浪者队，但总比分8-1不敌南安普顿和雷克瑟姆。"
      }
    ]
  },
  {
    "id": "ft-hall-signs-new-deal-at-newcastle-after-man-utd",
    "cat": "足球",
    "title": "Hall signs new deal at Newcastle after Man Utd interest",
    "titleZh": "在曼联表达兴趣后，霍尔与纽卡斯尔签下新合同",
    "source": "Sky Sports · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 4,
    "url": "https://www.skysports.com/football/news/11095/13584251/lewis-hall-newcastle-united-left-back-signs-long-term-contract-at-st-james-park",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/ft-hall-signs-new-deal-at-newcastle-after-man-utd.jpg",
    "paras": [
      {
        "en": "Newcastle left-back Lewis Hall has penned a new long-term deal at St James' Park; the England international had been attracting interest from Man Utd in the summer; Hall, 22, joined the Magpies from Chelsea in August 2023 and since made 106 appearances for the club",
        "cn": "纽卡斯尔左后卫刘易斯·霍尔已在圣詹姆斯公园球场签下了一份新的长期合同；这位英格兰国脚今夏曾引起曼联的关注；现年22岁的霍尔于2023年8月从切尔西加盟“喜鹊”队，此后已为俱乐部出场106次"
      },
      {
        "img": "assets/covers/ft-hall-signs-new-deal-at-newcastle-after-man-utd-1.jpg",
        "cap": "Image: Lewis Hall has signed a new Newcastle deal"
      },
      {
        "en": "The England international has committed to a new deal at St James' Park despite Manchester United showing an interest in him during the summer transfer window.",
        "cn": "尽管曼联在夏季转会窗口期间曾对他表示过兴趣，但这位英格兰国脚仍与圣詹姆斯公园球场续签了新合同。"
      },
      {
        "en": "The 22-year-old left-back joined the Magpies from Chelsea in August 2023 and since made 106 appearances for the club, including playing in every round of their successful 2024/25 Carabao Cup campaign, only to miss the final with injury.",
        "cn": "这位22岁的左后卫于2023年8月从切尔西转会至纽卡斯尔联，此后为俱乐部出场106次，其中包括在球队夺冠的2024/25赛季卡拉宝杯中每轮比赛均有出场，仅因伤缺席了决赛。"
      },
      {
        "en": "We are delighted to announce that Lewis Hall has signed a new long-term contract at St. James' Park 🙌 The 22-year-old has become a key part of the first team squad in recent seasons, making 107 appearances since first arriving at his boyhood club in August 2023.",
        "cn": "我们非常高兴地宣布，刘易斯·霍尔已在圣詹姆斯公园球场签下了一份新的长期合同 🙌 这位22岁的球员在最近几个赛季已成为一线队的重要一员，自2023年8月首次加盟他儿时支持的俱乐部以来，已出场107次。"
      },
      {
        "en": "Speaking to Newcastle's website, Hall said: \"I'm absolutely delighted.",
        "cn": "在接受纽卡斯尔官网采访时，霍尔表示：“我感到非常高兴。”"
      },
      {
        "en": "It's an absolute pleasure to play for this club and to represent the supporters.",
        "cn": "能为这家俱乐部效力并代表球迷们出战，我感到无比荣幸。"
      },
      {
        "en": "I know how much it means to them.",
        "cn": "我知道这对他们来说意义重大。"
      },
      {
        "en": "\"The fanbase and the support we get here, whether it's at St. James' Park or away, it's the best in the league in my opinion.",
        "cn": "“无论是在圣詹姆斯公园球场还是客场，我们在这里拥有的球迷群体以及所获得的支持，在我看来都是联赛中最好的。”"
      },
      {
        "en": "To be able to bring joy to their faces, it's a big thing for me.",
        "cn": "能让他们脸上露出笑容，对我来说意义重大。"
      },
      {
        "en": "\"I obviously have a family connection with the club, which is incredibly important to us all.",
        "cn": "“我显然与这家俱乐部有着家族渊源，这对我们所有人来说都极其重要。"
      },
      {
        "en": "One of the main reasons I play is to make my family proud, and I know how much it means to them to watch me playing for Newcastle United.",
        "cn": "我踢球的主要原因之一，就是让家人为我感到骄傲，而且我知道，看到我为纽卡斯尔联队效力，对他们来说意义重大。"
      },
      {
        "img": "assets/covers/ft-hall-signs-new-deal-at-newcastle-after-man-utd-2.jpg",
        "cap": "Image: Lewis Hall joined the Magpies from Chelsea in Sept 2023"
      },
      {
        "en": "\"It's a really good place to be.",
        "cn": "“这里真是个好地方。"
      },
      {
        "en": "It's really pleasing with how we've started the season, especially with the new gaffer and coaching staff coming in, and I think we can go on to achieve really big things.\"",
        "cn": "“我们本赛季的开局表现确实令人欣喜，尤其是新主帅和教练组刚刚上任，我认为我们今后定能取得非凡的成就。”"
      },
      {
        "en": "Meanwhile, Newcastle head coach, Matthias Jaissle, said of Hall: \"I have been impressed with Lewis since I arrived.",
        "cn": "与此同时，纽卡斯尔主教练马蒂亚斯·雅伊斯勒在谈到霍尔时表示：“自从我来到这里以来，刘易斯就给我留下了深刻的印象。”"
      },
      {
        "en": "He is a very important player for us and for what we are building here, so this is exciting news.",
        "cn": "他对我们以及我们正在这里打造的球队来说都是一位非常重要的球员，所以这真是个令人振奋的消息。"
      },
      {
        "en": "\"The combination of his ability and his profile make him an ideal fit for our squad, and his mentality is exactly what you want in a young player.",
        "cn": "“他的能力与个人特质相结合，使他成为我们球队的理想人选，而且他的心态正是我们对年轻球员所期望的。”"
      },
      {
        "en": "He wants to learn every day and he wants to be better in every match.",
        "cn": "他希望每天都能学习，也希望在每一场比赛中都表现得更好。"
      },
      {
        "en": "\"Lewis covers ground in a way that few players can.",
        "cn": "“刘易斯在场上的跑动范围之广，是其他球员难以企及的。”"
      },
      {
        "en": "He defends with maturity and intelligence, and his technical level means he can support the team higher up the pitch.",
        "cn": "他在防守端表现得成熟且机智，而凭借出色的技术水平，他还能在前场为球队提供支持。"
      },
      {
        "en": "\"What excites me most is that I believe the best is still to come from Lewis.",
        "cn": "“最让我兴奋的是，我相信刘易斯最好的表现还在后头。”"
      },
      {
        "en": "He has a lot of room to develop, and I am looking forward to working with him as he grows with us.\"",
        "cn": "“他还有很大的成长空间，我很期待能与他共事，见证他与我们共同成长。”"
      },
      {
        "en": "Super 6 are starting the season by guaranteeing a £1,000,000 winner!",
        "cn": "Super 6 以保证一名中奖者可获得 1,000,000 英镑的奖金拉开本赛季的序幕！"
      }
    ]
  },
  {
    "id": "ft-bukayo-saka-is-the-standout-attacking-option-r",
    "cat": "足球",
    "title": "'Bukayo Saka is the standout attacking option right now with strong fixtures and penalty duty' Expert tips for playing the perfect FPL Wildcard in Gameweek 4",
    "titleZh": "布卡约·萨卡目前是进攻端最突出的选择，不仅赛程有利，还负责主罚点球。”专家支招：如何在第4轮完美使用 FPL“万能卡",
    "source": "FourFourTwo · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 4,
    "url": "https://www.fourfourtwo.com/tactic/bukayo-saka-is-the-standout-attacking-option-right-now-with-strong-fixtures-and-penalty-duty-expert-tips-for-playing-the-perfect-fpl-wildcard-in-gameweek-4",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/ft-bukayo-saka-is-the-standout-attacking-option-r.jpg",
    "paras": [
      {
        "en": "The best features, fun and footballing quizzes, straight to your inbox every week.",
        "cn": "每周精选内容、趣味活动和足球问答，直接送达您的收件箱。"
      },
      {
        "en": "Fantastic football content straight to your inbox!",
        "cn": "精彩足球内容直达您的收件箱！"
      },
      {
        "en": "From the latest transfer news, quizzes, videos, features and interviews with the biggest names in the game, plus lots more.",
        "cn": "涵盖最新的转会新闻、趣味问答、视频、专题报道以及对足坛巨星的专访，还有更多精彩内容。"
      },
      {
        "en": "Get full access to premium articles, exclusive features and a growing list of member rewards.",
        "cn": "即可畅享所有优质文章、独家专题以及日益丰富的会员福利。"
      },
      {
        "en": "In the fourth instalment of a new Fantasy Football advice column, one of the world's highest-ranking FPL players, BigManBakar, shares Gameweek 4 tips",
        "cn": "在全新《梦幻足球》建议专栏的第四期中，全球排名靠前的FPL玩家之一BigManBakar将分享第4轮的建议"
      },
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "en": "If Gameweek 3 was the week of the Wildcard, Gameweek 4 is the natural follow up window for those who held off.",
        "cn": "如果说第3轮是“万能卡”大放异彩的一周，那么对于那些此前按兵不动的人来说，第4轮自然就是接续使用“万能卡”的最佳时机。"
      },
      {
        "en": "The transfer window is firmly shut, minutes are becoming clearer by the week and the fixture picture is sharp enough to build a squad with genuine long term conviction.",
        "cn": "转会窗口已彻底关闭，每周的出场时间安排都日益明朗，赛程安排也足够清晰，足以组建一支真正具有长期发展前景的阵容。"
      },
      {
        "img": "assets/covers/ft-bukayo-saka-is-the-standout-attacking-option-r-1.jpg",
        "cap": "Bart Verbruggen (Image credit: Getty Images)"
      },
      {
        "en": "In goal, Bart Verbruggen is the standout budget option.",
        "cn": "在门将位置上，巴特·维尔布鲁根是性价比最高的选择。"
      },
      {
        "en": "He's reliable, consistent for save points and probably the best of the cheaper goalkeeper options available this season.",
        "cn": "他表现可靠，总能做出关键扑救，很可能是在本赛季可选的低价门将中表现最佳的一位。"
      },
      {
        "en": "The backup slot can honestly be filled by any £4.0m goalkeeper from a team you are unlikely to triple up on, as there are no truly nailed-on options at that price point right now.",
        "cn": "说实话，替补门将的位置完全可以由任何一位身价400万英镑、且你不太可能在同一支球队中拥有三名该队球员的门将来填补，因为目前在这个价位上并没有真正稳如磐石的人选。"
      },
      {
        "img": "assets/covers/ft-bukayo-saka-is-the-standout-attacking-option-r-2.jpg",
        "cap": "Ezri Konsa (Image credit: Getty Images)"
      },
      {
        "en": "The defensive unit leans into three teams with strong fixture runs and players who bring more than just clean sheet potential.",
        "cn": "防守阵容主要由三支球队组成，这些球队不仅赛程有利，而且阵中球员不仅具备保持零封的能力，更能为球队带来更多贡献。"
      },
      {
        "en": "Riccardo Calafiori and Ezri Konsa give double Arsenal coverage in the best defensive unit in the league, with Konsa remaining an absolute steal following the Mosquera injury situation.",
        "cn": "里卡多·卡拉菲奥里和埃兹里·孔萨在联赛最佳后防线中为阿森纳提供双重保障，在莫斯克拉受伤的情况下，孔萨依然堪称一笔绝对的超值引援。"
      },
      {
        "en": "Tarik Muharemovic has been a defensive contributions machine for Leeds United, brings aerial threat from set pieces and represents reasonable value for his price.",
        "cn": "塔里克·穆哈雷莫维奇是利兹联队的一台防守“得分机器”，在定位球中具备头球威胁，且以他的身价而言，性价比相当不错。"
      },
      {
        "en": "Luka Vuskovic is probably the most secure Brighton defender for the long term, offering similar set piece threat and a solid record for defensive returns.",
        "cn": "卢卡·武斯科维奇可能是布莱顿长期来看最稳健的后卫，他不仅在定位球进攻中同样具有威胁，防守端的表现也十分稳健。"
      },
      {
        "en": "Finally, Jan Paul van Hecke rotates really well with the rest of the defence, is particularly strong in home fixtures and carries good aerial ability from dead ball situations.",
        "cn": "最后，扬·保罗·范·赫克与后防线其他队员的配合非常默契，在主场比赛中表现尤为出色，并且在定位球进攻中拥有出色的争顶能力。"
      },
      {
        "img": "assets/covers/ft-bukayo-saka-is-the-standout-attacking-option-r-3.jpg",
        "cap": "Cole Palmer (Image credit: Getty Images)"
      },
      {
        "en": "The midfield is where this squad truly shines.",
        "cn": "中场才是这支球队真正大放异彩的地方。"
      },
      {
        "en": "Bukayo Saka looks sharp, his minutes appear very secure and with penalty duties and a run of strong fixtures ahead, he is the standout Arsenal attacking option to own right now.",
        "cn": "布卡约·萨卡状态正佳，他的出场时间似乎非常有保障，加上他负责主罚点球，且接下来将迎来一系列强敌对决，他无疑是目前阿森纳阵中最值得入手的进攻球员。"
      },
      {
        "en": "Cole Palmer and Morgan Rogers give strong Chelsea representation from a side that has looked genuinely dangerous under Xabi Alonso, with neither carrying any European fixture concerns to threaten their minutes.",
        "cn": "科尔·帕尔默和摩根·罗杰斯在切尔西阵中表现抢眼，这支球队在哈维·阿隆索的带领下展现出了真正的威胁，而且两人都不必担心欧战赛事会影响他们的出场时间。"
      },
      {
        "en": "Palmer at home to Hull this week is the optimal captaincy choice on paper, particularly in a gameweek where Manchester United host Manchester City.",
        "cn": "从纸面实力来看，帕尔默本周主场迎战赫尔城是最佳队长人选，尤其是在本轮曼联主场迎战曼城的情况下。"
      },
      {
        "en": "Dominik Szoboszlai is the set-and-forget Liverpool hold, confirmed on penalties and guaranteed minutes for the foreseeable future.",
        "cn": "多米尼克·索博斯莱是利物浦队中那名“买入后无需操心”的球员，他在点球大战中证明了自己的价值，在可预见的未来也能保证获得上场时间。"
      },
      {
        "en": "Regan Slater rounds out the midfield as a budget filler who enables the rest of the squad through his low price point and will rarely if ever need to come off the bench.",
        "cn": "雷根·斯莱特作为一名经济实惠的补强球员，完善了中场阵容——他凭借低廉的身价为球队其他成员提供了支持，且几乎不需要替补登场。"
      },
      {
        "en": "Up front, Erling Haaland is essential cover for the captaincy in Gameweeks 5 and 7, where he looks comfortably the best armband option on paper.",
        "cn": "在锋线上，埃尔林·哈兰德是第5轮和第7轮队长人选的必备备选，从纸面实力来看，他显然是最佳队长人选。"
      },
      {
        "en": "Joao Pedro has been in the top three FPL point scorers among forwards across the opening three gameweeks, carries no European football and looks like one of the most stable and consistent picks in the game right now.",
        "cn": "在前三轮比赛中，若昂·佩德罗一直位列前锋中FPL积分榜前三名，他没有参加欧洲赛事，目前看来是游戏中最为稳定且表现最一致的选择之一。"
      }
    ]
  },
  {
    "id": "ft-quickfire-quiz-200-can-you-answer-10-questions",
    "cat": "足球",
    "title": "Quickfire Quiz 200: Can you answer 10 questions in 90 seconds?",
    "titleZh": "第200期快速问答：你能90秒内答对10道题吗？",
    "source": "FourFourTwo · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 2,
    "url": "https://www.fourfourtwo.com/quiz/quickfire-quiz-200",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/ft-quickfire-quiz-200-can-you-answer-10-questions.jpg",
    "paras": [
      {
        "en": "The best features, fun and footballing quizzes, straight to your inbox every week.",
        "cn": "每周精选内容、趣味活动和足球问答，直接送达您的收件箱。"
      },
      {
        "en": "Fantastic football content straight to your inbox!",
        "cn": "精彩足球内容直达您的收件箱！"
      },
      {
        "en": "From the latest transfer news, quizzes, videos, features and interviews with the biggest names in the game, plus lots more.",
        "cn": "涵盖最新的转会新闻、趣味问答、视频、专题报道以及对足坛巨星的专访，还有更多精彩内容。"
      },
      {
        "en": "Get full access to premium articles, exclusive features and a growing list of member rewards.",
        "cn": "即可畅享所有优质文章、独家专题以及日益丰富的会员福利。"
      },
      {
        "en": "Tackle these 10 football trivia questions about Clarence Seedorf, MCOs, legendary managers, and more!",
        "cn": "来挑战这10道关于克拉伦斯·西多夫、MCO、传奇主帅等足球冷知识的问题吧！"
      },
      {
        "en": "When you purchase through links on our site, we may earn an affiliate commission.",
        "cn": "当您通过我们网站上的链接购买时，我们可能会获得附属佣金。"
      },
      {
        "img": "assets/covers/ft-quickfire-quiz-200-can-you-answer-10-questions-1.jpg",
        "cap": "(Image credit: Getty Images)"
      },
      {
        "en": "It's FourFourTwo Quickfire Quiz number 200.",
        "cn": "这是《FourFourTwo》第200期“快问快答”栏目。"
      },
      {
        "en": "Two whole thousands of football trivia questions, and we're not stopping here either.",
        "cn": "整整两千道足球冷知识题，而且我们还不会就此止步。"
      },
      {
        "en": "Help us blow out the candles by answering today's questions!",
        "cn": "请回答今天的问题，帮我们吹灭蜡烛吧！"
      },
      {
        "img": "assets/covers/ft-quickfire-quiz-200-can-you-answer-10-questions-2.jpg",
        "cap": "(Image credit: Future)"
      },
      {
        "en": "FourFourTwo has a vast vault of football quizzes and they're all courtesy of Kwizly.",
        "cn": "《FourFourTwo》拥有海量的足球问答题库，这些内容均由Kwizly提供。"
      },
      {
        "en": "First up, can you name the three most expensive Premier League signings of every summer since 1992 and every team in the top two tiers of women's football in England?",
        "cn": "首先，你能说出自1992年以来每个夏季转会窗英超最昂贵的三大引援，以及英格兰女子足球前两级联赛中的所有球队吗？"
      },
      {
        "en": "While you're in transfer mode, we also want you to show off your knowledge of the 50 most expensive signings ever made by Barcelona or Real Madrid.",
        "cn": "既然你正在关注转会动态，我们也希望你能展示一下你对巴塞罗那或皇家马德里历史上50笔最昂贵转会交易的了解。"
      },
      {
        "en": "We have some questions about the Premier League's most celebrated one-season wonders, the players who came and went in the blink of an eye but made a big impression while they were in the spotlight.",
        "cn": "我们想探讨一下英超历史上那些最负盛名的“一季之星”——这些球员转瞬即逝，却在聚光灯下留下了深刻的印象。"
      },
      {
        "en": "There are a couple of quizzes that ask you to put some groups of four into the correct order – one about players and their Premier League appearances, the other about teams and their titles.",
        "cn": "有几道测验题要求你将几个由四个项目组成的组别按正确顺序排列——一道是关于球员及其英超出场记录的，另一道是关于球队及其夺冠记录的。"
      },
      {
        "en": "Can you name every team in the Football League right now?",
        "cn": "你能说出目前英格兰足球联赛中所有的球队吗？"
      },
      {
        "en": "There's only one way to find out.",
        "cn": "只有一种方法能弄清楚。"
      },
      {
        "en": "Lastly, if you're a players expert rather than a teams nut, our latest career paths quiz is for you.",
        "cn": "最后，如果你更关注球员而非球队，那么我们最新的职业发展路径测评正是为你准备的。"
      },
      {
        "en": "How many of those 100 career paths can you identify?",
        "cn": "在这100种职业发展路径中，你能认出多少种？"
      },
      {
        "img": "assets/covers/ft-quickfire-quiz-200-can-you-answer-10-questions-3.jpg",
        "cap": ""
      },
      {
        "en": "Please logout and then login again, you will then be prompted to enter your display name.",
        "cn": "请先退出登录，然后重新登录，系统会提示您输入显示名称。"
      },
      {
        "en": "FourFourTwo is part of Future plc, an international media group and leading digital publisher.",
        "cn": "《FourFourTwo》隶属于Future plc，这是一家国际媒体集团，也是领先的数字出版商。"
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
    "id": "gr-never-forget-what-matters-with-dr-david-urbans",
    "cat": "成长",
    "title": "Never forget what matters with Dr David Urbansky, founder of Linkflare",
    "titleZh": "与 Linkflare 创始人大卫·乌尔班斯基博士一起，永远不要忘记什么才是最重要的",
    "source": "Ness Labs · 2026-09-08",
    "date": "2026-09-08",
    "minutes": 22,
    "url": "https://nesslabs.com/linkflare-featured-tool?utm_source=rss&utm_medium=rss&utm_campaign=linkflare-featured-tool",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/gr-never-forget-what-matters-with-dr-david-urbans.jpg",
    "paras": [
      {
        "en": "Welcome to this edition of our Tools for Thought series, where we interview founders on a mission to help us think better and work smarter.",
        "cn": "欢迎阅读本期“思考工具”系列，我们将采访那些致力于帮助我们更好地思考、更聪明地工作的创始人。"
      },
      {
        "en": "Dr David Urbansky is the founder of Linkflare, a universal bookmark manager that helps you save links, read distraction-free, and never forget the information that matters to you.",
        "cn": "大卫·乌尔班斯基博士是 Linkflare 的创始人，这是一款通用书签管理器，可帮助您保存链接、在无干扰的环境中阅读，并确保您永远不会遗忘那些对您重要的信息。"
      },
      {
        "en": "In this interview, we talked about why saving information is not the same as remembering it, how to turn bookmarks into useful knowledge, why spaced repetition belongs in a bookmarking tool, how automation can reduce the work of organizing information, why personal knowledge may matter even more in the age of AI, and much more.",
        "cn": "在这篇访谈中，我们探讨了以下问题：为何保存信息不等于记住信息；如何将书签转化为有用的知识；为何间隔重复功能应成为书签工具的一部分；自动化如何减少整理信息的工作量；为何在人工智能时代，个人知识可能显得更为重要；以及更多相关话题。"
      },
      {
        "img": "assets/covers/gr-never-forget-what-matters-with-dr-david-urbans-1.jpg",
        "cap": ""
      },
      {
        "en": "Hi David, thank you for joining us.",
        "cn": "嗨，大卫，感谢你加入我们。"
      },
      {
        "en": "You believe that bookmarks should be more than a collection of saved links.",
        "cn": "你认为书签不应该仅仅是一堆保存的链接。"
      },
      {
        "en": "I’m the kind of person who keeps lists of everything.",
        "cn": "我就是那种凡事都要列清单的人。"
      },
      {
        "en": "I’ve been running my life on David Allen’s Getting Things Done for years, so I have to-do lists, someday-maybe lists, lists of things to remember.",
        "cn": "多年来，我一直按照大卫·艾伦的《搞定》来规划生活，因此我制作了待办事项清单、“有朝一日或许会做”清单以及需要记住的事情清单。"
      },
      {
        "en": "And it doesn’t stop at tasks: movies I want to watch, recipes I want to try, books, places we might visit one day.",
        "cn": "而且这不仅仅限于待办事项：我想看的电影、想尝试的食谱、书籍，还有我们将来可能去的地方。"
      },
      {
        "en": "Capturing things is how I close open loops.",
        "cn": "记录事物是我完成未完成事项的方式。"
      },
      {
        "en": "Once something is written down, my head can let it go.",
        "cn": "只要把事情写下来，我脑子里就能放下了。"
      },
      {
        "en": "The problem was never the capturing, it was where everything ended up.",
        "cn": "问题从来不在于捕捉，而在于最终这些东西都去了哪里。"
      },
      {
        "en": "The movies lived in watchlists on three different streaming platforms.",
        "cn": "这些电影被收藏在三个不同流媒体平台的“待看列表”中。"
      },
      {
        "en": "The recipes sat in chat threads.",
        "cn": "这些食谱就放在聊天记录里。"
      },
      {
        "en": "Interesting quotes and facts went into a notebook or onto sticky notes, and book takeaways into OneNote, where I’ve kept my lists for twenty years now.",
        "cn": "有趣的引语和事实我会记在笔记本上或便签上，而读书心得则记录在OneNote里——我在那里整理这些清单已经二十年了。"
      },
      {
        "en": "Every app is happy to hold its own little list.",
        "cn": "每个应用都乐于拥有自己的一份小清单。"
      },
      {
        "en": "None of them talk to each other, and none of them care whether you ever come back.",
        "cn": "他们彼此之间都不说话，而且谁也不在乎你是否还会回来。"
      },
      {
        "en": "But coming back is the whole point.",
        "cn": "但归来才是重点。"
      },
      {
        "en": "A bookmark is a small promise to your future self: I will read this, cook this, remember this.",
        "cn": "书签是对未来自己的一个小小承诺：我会读这本书、做这道菜、记住这一点。"
      },
      {
        "en": "Most tools let you break that promise silently.",
        "cn": "大多数工具都会让你在不知不觉中违背这一承诺。"
      },
      {
        "en": "I’d finish a book full of ideas, write down the takeaways, and six months later I couldn’t find the notes, let alone remember the ideas.",
        "cn": "我读完一本充满灵感的书后，会把收获写下来，但半年后却找不到那些笔记，更别说还记得那些想法了。"
      },
      {
        "en": "Saving something feels productive in the moment, but saving is not remembering.",
        "cn": "保存某样东西在当下会让人觉得很有成就感，但保存并不等于记住。"
      },
      {
        "en": "That gap between what I collected and what I could actually find and use again bothered me for a very long time.",
        "cn": "我收集到的东西与实际能找到并再次利用的东西之间的差距，长期以来一直困扰着我。"
      },
      {
        "en": "My whole career has been about teaching machines to read the web.",
        "cn": "我的整个职业生涯都致力于教机器阅读网络内容。"
      },
      {
        "en": "I did my PhD on web content extraction and assessment, and afterwards I built data APIs for developers.",
        "cn": "我的博士研究课题是网页内容提取与评估，之后我为开发人员构建了数据API。"
      },
      {
        "en": "The biggest one, spoonacular, takes recipes and food content and turns them into structured information: ingredients, amounts, nutrition, cooking times.",
        "cn": "其中最大的平台“Spoonacular”会将食谱和美食内容转化为结构化信息：包括食材、用量、营养成分和烹饪时间。"
      },
      {
        "en": "So for about fifteen years my job was helping companies turn messy web pages into clean data they could build products on.",
        "cn": "因此，在过去的十五年里，我的工作就是帮助企业将杂乱无章的网页转化为结构清晰的数据，以便他们能够在此基础上开发产品。"
      },
      {
        "en": "Meanwhile, my own saved knowledge was a junk drawer.",
        "cn": "与此同时，我保存下来的知识就像一个杂物抽屉。"
      },
      {
        "en": "My bookmarks were plain URL strings.",
        "cn": "我的书签只是普通的URL字符串。"
      },
      {
        "en": "My reading backlog lived in Pocket.",
        "cn": "我的待读书单都保存在Pocket里。"
      },
      {
        "en": "My lists were scattered across half a dozen apps.",
        "cn": "我的待办事项清单分散在六款应用里。"
      },
      {
        "en": "At some point the irony became hard to ignore: I was pointing extraction technology at the web all day for other people’s products, and never at the thing I personally cared about most, which is my own library.",
        "cn": "不知从何时起，这种讽刺变得难以忽视：我整天都在用数据提取技术处理网络上的内容，为他人的产品服务，却从未将它用于我个人最在乎的东西——那就是我自己的代码库。"
      },
      {
        "en": "Pocket shutting down was the final push.",
        "cn": "Pocket 关闭成了压垮骆驼的最后一根稻草。"
      },
      {
        "en": "I had years of saved reading in there, and suddenly the platform underneath it was simply gone.",
        "cn": "那里存着我多年来积累的阅读资料，可突然间，支撑它们的平台就这么消失了。"
      },
      {
        "en": "That made something very clear to me: what we save is only as durable as the app we save it into.",
        "cn": "这让我深刻认识到：我们保存的内容能否持久，完全取决于我们用来保存它的应用程序的稳定性。"
      },
      {
        "en": "So I built Linkflare, which is essentially everything I know about understanding web content, pointed at your personal library.",
        "cn": "于是，我开发了Linkflare——它基本上凝聚了我对理解网络内容的所有认知，并将其应用于你的个人书库。"
      },
      {
        "en": "When you save a link, the system should understand what it is, pull out the parts that matter, and help you actually come back to it.",
        "cn": "当你保存一个链接时，系统应该能识别其内容，提取关键信息，并帮助你日后轻松返回该链接。"
      },
      {
        "en": "Most bookmarking tools are good at saving content.",
        "cn": "大多数书签工具都擅长保存内容。"
      },
      {
        "en": "Linkflare seems much more focused on what happens after you save them.",
        "cn": "Linkflare 似乎更关注保存后的情况。"
      },
      {
        "en": "Can you tell us more about that?",
        "cn": "你能详细说说吗？"
      },
      {
        "en": "The question I find much more interesting is what all those saved things should turn into later.",
        "cn": "我觉得更有趣的问题是，所有这些保存下来的东西以后会变成什么样。"
      },
      {
        "en": "Sometimes the answer is very practical.",
        "cn": "有时答案非常务实。"
      },
      {
        "en": "My fiancée and I save recipes all week, and on the weekend they become an actual meal plan instead of a pile of screenshots.",
        "cn": "我和未婚妻整周都在收藏食谱，到了周末，这些食谱就变成了一份真正的餐单，而不是一堆截图。"
      },
      {
        "en": "Before a movie night we don’t scroll through streaming menus for half an hour, we open our shared watch list, sort by rating and pick something.",
        "cn": "在电影之夜开始前，我们不会花半小时在流媒体菜单里翻来翻去，而是打开我们的共享观看列表，按评分排序，然后选一部片子。"
      },
      {
        "en": "And when friends are over, there’s even a little movie-night voting mode, so everyone gets a say.",
        "cn": "当朋友来家里做客时，甚至还有一个“电影之夜”投票模式，这样大家都能发表意见。"
      },
      {
        "en": "None of that works if a bookmark is just a dead string.",
        "cn": "如果书签只是一个无意义的字符串，那么这些方法统统行不通。"
      },
      {
        "en": "But the deeper answer is about memory.",
        "cn": "但更深层的答案与记忆有关。"
      },
      {
        "en": "When I read an article and highlight the two paragraphs that actually matter, those highlights shouldn’t be buried in an archive.",
        "cn": "当我阅读一篇文章并标记出其中真正重要的两段内容时，这些标记不应被埋没在存档中。"
      },
      {
        "en": "In Linkflare they can become knowledge cards, small pieces of knowledge in your own words, still connected to their source.",
        "cn": "在Linkflare中，它们可以转化为“知识卡片”——用你自己的话表述的简短知识片段，同时仍与来源保持关联。"
      },
      {
        "en": "And because knowledge fades when you never meet it again, spaced repetition is built in: the app resurfaces your cards for a short review right around the time you’d otherwise forget them.",
        "cn": "而且，由于知识一旦不再接触就会逐渐淡忘，因此该应用内置了间隔复习功能：就在你即将忘记这些卡片的时候，应用会重新展示它们，供你进行简短复习。"
      },
      {
        "en": "The reviewing happens in the same place as the collecting, with no extra app in between.",
        "cn": "评审与收集在同一个地方进行，中间无需额外的应用程序。"
      },
      {
        "en": "Save something in two seconds, actually read it, connect it to what you know, and remember it.",
        "cn": "花两秒钟记下某件事，真正读一读，将其与已知知识联系起来，然后记住它。"
      },
      {
        "en": "Most tools stop after the first step.",
        "cn": "大多数工具在完成第一步后就会停止。"
      },
      {
        "en": "People already have browser bookmarks, read-later apps, notes, and knowledge-management tools.",
        "cn": "人们已经拥有浏览器书签、稍后阅读应用、笔记和知识管理工具。"
      },
      {
        "en": "What do you think is missing from that workflow?",
        "cn": "你觉得这个工作流程中还缺了什么？"
      },
      {
        "en": "Each of those tools holds one shard of the workflow.",
        "cn": "这些工具中的每一个都承载着工作流中的一块碎片。"
      },
      {
        "en": "Browser bookmarks are just a title and a URL, no context, no memory.",
        "cn": "浏览器书签仅仅包含一个标题和一个网址，没有上下文，也没有记忆。"
      },
      {
        "en": "Read-later apps quietly fill up with things you’re never going to read.",
        "cn": "“稍后阅读”类应用里悄无声息地堆满了你永远不会去读的内容。"
      },
      {
        "en": "Notes apps hold pasted links nobody ever clicks again.",
        "cn": "备忘录应用里存着那些没人会再点击的已粘贴链接。"
      },
      {
        "en": "And the knowledge-management tools are wonderful for your own thinking, but they’re an awkward home for the constant stream of things you find.",
        "cn": "知识管理工具虽然对个人思考大有裨益，但对于你不断发现的各种信息流来说，却并不是一个理想的归宿。"
      },
      {
        "en": "The way I’d put it: Obsidian is where your own thoughts live.",
        "cn": "如果让我来形容的话：Obsidian 就是你思想栖息的地方。"
      },
      {
        "en": "Linkflare is where the web’s knowledge lives, and gets remembered.",
        "cn": "Linkflare 是网络知识的栖息地，也是知识被铭记的地方。"
      },
      {
        "en": "They complement each other well.",
        "cn": "它们相得益彰。"
      },
      {
        "en": "If something looks interesting, I save it and close the tab with a clear conscience, because I know I’ll find it again.",
        "cn": "如果有什么东西看起来很有意思，我会把它保存下来，然后心安理得地关闭标签页，因为我知道我以后还能找到它。"
      },
      {
        "en": "Let’s talk about how Linkflare works in more detail.",
        "cn": "让我们更详细地谈谈Linkflare的工作原理。"
      },
      {
        "en": "What does the experience look like for someone using it day to day?",
        "cn": "对于日常使用者来说，这种体验是怎样的？"
      },
      {
        "img": "assets/covers/gr-never-forget-what-matters-with-dr-david-urbans-2.jpg",
        "cap": ""
      },
      {
        "en": "During the day, saving is a reflex.",
        "cn": "白天，省钱已成为一种本能。"
      },
      {
        "en": "I come across a paper or a blog post, click the browser extension, done.",
        "cn": "我看到一篇论文或博客文章，点击浏览器扩展程序，就搞定了。"
      },
      {
        "en": "My fiancée sends me a recipe on TikTok, I share it to Linkflare, and it extracts the actual recipe out of the video: ingredients, steps, servings.",
        "cn": "我的未婚妻在TikTok上发给我一个食谱，我把它分享到Linkflare，它就能从视频中提取出具体的食谱内容：食材、步骤、份量。"
      },
      {
        "en": "There’s an oven-baked Big Mac wrap in my account right now that started as a TikTok video she sent me, and we’ve cooked it many times since.",
        "cn": "我账号里现在有一道烤箱版巨无霸卷饼，最初是她发给我的一个TikTok视频，从那以后我们已经做过很多次了。"
      },
      {
        "en": "I hear about a film, save it from IMDb, and it lands in the watch list with its rating and where it’s streaming.",
        "cn": "我听说了一部电影，从IMDb上保存下来，它就会连同评分和播放平台信息一起被加入到“待看列表”中。"
      },
      {
        "en": "The important part is that Linkflare does the librarian work to save time.",
        "cn": "关键在于，Linkflare 承担了图书管理员的工作，从而节省了时间。"
      },
      {
        "en": "It recognizes what kind of thing you saved, an article, a recipe, a movie, a place, fills in the right metadata, and my rules do the filing.",
        "cn": "它能识别你保存的是什么内容——文章、食谱、电影还是地点——并自动填写相应的元数据，然后由我设定的规则来完成归档。"
      },
      {
        "en": "Videos, for example, go automatically into my inbox to watch later.",
        "cn": "例如，视频会自动进入我的收件箱，供我稍后观看。"
      },
      {
        "en": "In the evening I read saved articles in the clean reader view, or I have one read aloud to me while I go for a walk.",
        "cn": "晚上，我会在“Clean Reader”视图中阅读收藏的文章，或者一边散步一边听其中一篇被朗读出来。"
      },
      {
        "en": "Whatever I highlight along the way is waiting for me afterwards, ready to become something more permanent.",
        "cn": "无论我在途中标注了什么，事后都会在那里等着我，随时准备变成更持久的存在。"
      },
      {
        "en": "One of the distinctive ideas in Linkflare is that different bookmarks become useful in different ways.",
        "cn": "Linkflare 的一大独特理念在于，不同的书签会以不同的方式发挥作用。"
      },
      {
        "en": "A recipe and a movie need different things from a bookmarking tool.",
        "cn": "食谱和电影对书签工具的需求各不相同。"
      },
      {
        "en": "“I’ll cook this” needs different help than “I’ll watch this” or “I’ll read this”, so Linkflare treats them differently.",
        "cn": "“我来做这个”需要的帮助与“我来看这个”或“我来读这个”不同，因此Linkflare会区别对待它们。"
      },
      {
        "en": "When you save something, it figures out what it is and enriches it.",
        "cn": "当你保存某样东西时，它会识别出这是什么，并对其进行丰富。"
      },
      {
        "en": "Recipes get ingredients, cooking times and nutrition information, even when the source is a video with no written recipe anywhere.",
        "cn": "即使来源是一段没有任何书面食谱的视频，系统也能提取其中的食材、烹饪时间和营养信息。"
      },
      {
        "en": "Movies and shows get the director, the IMDb rating and where you can currently stream them.",
        "cn": "电影和电视剧会显示导演、IMDb评分以及目前可以在哪些平台观看。"
      },
      {
        "en": "Books get the author and page count, places get a map, products get the current price and can alert you when it drops.",
        "cn": "书籍会显示作者和页数，地点会显示地图，商品会显示当前价格，并在价格下降时向您发送提醒。"
      },
      {
        "en": "Articles get a reading time, a distraction-free reader, and audio if you’d rather listen than read.",
        "cn": "文章会显示预计阅读时间，并提供无干扰阅读模式；如果您更喜欢听而不是读，还可以收听音频。"
      },
      {
        "en": "That metadata is exactly what makes a collection useful later.",
        "cn": "正是这些元数据，才使得该收藏集在日后变得有用。"
      },
      {
        "en": "When we can’t decide what to watch, I sort our watch list by IMDb rating and we pick from the top.",
        "cn": "当我们不知道看什么好时，我会按IMDb评分对我们的待看清单进行排序，然后从排在前面的片子中挑选。"
      },
      {
        "en": "When I want to bake something ambitious on a weekend, I check the time first: there’s a sourdough bread in my account that takes 60 hours from start to finish.",
        "cn": "每当我想在周末做些比较费工夫的烘焙时，我都会先看看时间：我的食谱里有一款酸面团面包，从开始到完成需要60个小时。"
      },
      {
        "en": "That’s exactly the kind of thing you’d never find again in a chat thread.",
        "cn": "这正是你在聊天帖子里再也找不到的那种内容。"
      },
      {
        "en": "And none of it costs you anything at save time: you press one button and the rest fills itself in.",
        "cn": "而且这一切在节省时间方面完全不花你一分钱：你只需按一下按钮，其余的就会自动填好。"
      },
      {
        "img": "assets/covers/gr-never-forget-what-matters-with-dr-david-urbans-3.jpg",
        "cap": ""
      },
      {
        "en": "You offer quite a bit of automation, from metadata and AI tagging to organization rules.",
        "cn": "你们提供了相当多的自动化功能，从元数据和人工智能标注到整理规则。"
      },
      {
        "en": "How do you balance automation with letting people organize things their own way?",
        "cn": "如何在自动化与让人们按自己的方式进行组织之间取得平衡？"
      },
      {
        "en": "My rule is that automation prepares and the user decides.",
        "cn": "我的原则是：自动化负责准备，用户负责决策。"
      },
      {
        "en": "Linkflare fills in everything it can on its own: the type, the metadata, a preview image, tags if you turn on automatic tagging.",
        "cn": "Linkflare 会自动填写所有能填的内容：类型、元数据、预览图，以及（如果您启用了自动标记功能）标签。"
      },
      {
        "en": "But every field it writes is editable, so it never turns into a black box.",
        "cn": "但它写入的每个字段都是可编辑的，因此它永远不会变成一个“黑匣子”。"
      },
      {
        "en": "On top of that there’s automation you author yourself, which I like even better: rules.",
        "cn": "除此之外，还有你可以自己编写的自动化功能，而我更喜欢的是：规则。"
      },
      {
        "en": "“Everything from YouTube goes to the inbox.” “Recipes go into Cooking.” You describe the rule once and the filing happens forever after.",
        "cn": "“YouTube 上的所有内容都会进入收件箱。”“食谱会进入‘烹饪’文件夹。”你只需设置一次规则，之后文件就会自动归档。"
      },
      {
        "en": "And when the built-in metadata isn’t enough, you can define your own structured fields, a number, a date, a text, whatever matches how you think, and filter and sort by them like everything else.",
        "cn": "如果内置的元数据不够用，你可以定义自己的结构化字段——无论是数字、日期还是文本，只要符合你的思维方式即可——并像处理其他内容一样，根据这些字段进行筛选和排序。"
      },
      {
        "en": "I tried hard not to impose my own organizational religion on anyone.",
        "cn": "我竭力避免将我自己的组织理念强加于人。"
      },
      {
        "en": "Some people maintain a meticulous tree of collections, others throw everything into one big pool and rely on search and filters.",
        "cn": "有些人会精心维护一个分类树，而另一些人则把所有内容都扔进一个大池子里，依靠搜索和筛选功能。"
      },
      {
        "en": "The point is that organizing never becomes a second job.",
        "cn": "关键在于，整理工作绝不会变成一份第二份工作。"
      },
      {
        "en": "You already did the interesting part when you decided something was worth keeping.",
        "cn": "当你决定某样东西值得保留时，有趣的部分就已经完成了。"
      },
      {
        "en": "Linkflare has spaced repetition built in, which most people associate with flashcard apps and language learning.",
        "cn": "Linkflare 内置了间隔重复功能，大多数人通常会将其与闪卡应用和语言学习联系在一起。"
      },
      {
        "en": "Why bring memory practice into a bookmarking tool?",
        "cn": "为什么要将记忆练习功能加入书签工具中？"
      },
      {
        "en": "Because the forgetting curve doesn’t care where you learned something.",
        "cn": "因为遗忘曲线并不在乎你是在哪里学到的。"
      },
      {
        "en": "Read a brilliant article on Monday, and by Friday most of it is gone.",
        "cn": "周一读了一篇精彩的文章，到了周五，内容却已大半忘光了。"
      },
      {
        "en": "That’s just how memory works when you never revisit material.",
        "cn": "如果你从未重温过这些内容，记忆就是这样运作的。"
      },
      {
        "en": "That always struck me as a waste.",
        "cn": "我一直觉得这很浪费。"
      },
      {
        "en": "We put real effort into finding and reading good things, and then let almost all of it evaporate.",
        "cn": "我们费尽心思去发掘和阅读好内容，却让其中绝大多数都付诸东流。"
      },
      {
        "en": "There are excellent flashcard apps, but hardly anyone sits down after reading an article to author flashcards about it.",
        "cn": "虽然有不少优秀的单词卡应用，但几乎没有人会在读完一篇文章后特意坐下来制作相关的单词卡。"
      },
      {
        "en": "So in practice, spaced repetition stays locked inside vocabulary drills and exam prep, while the knowledge we deliberately gather as adults gets nothing.",
        "cn": "因此，实际上，间隔复习法仍局限于词汇练习和考试准备之中，而我们成年后有意识地积累的知识却未能从中受益。"
      },
      {
        "en": "While you read in Linkflare, you highlight.",
        "cn": "在 Linkflare 中阅读时，你可以进行高亮标注。"
      },
      {
        "en": "Highlights and takeaways become knowledge cards, which you organize into topics.",
        "cn": "重点内容和要点会转化为知识卡片，你可以将它们按主题进行整理。"
      },
      {
        "en": "Any card you want to keep, you toggle into review, and the review queue does the rest: it brings each card back right around the time you’d otherwise forget it, at growing intervals.",
        "cn": "任何你想保留的卡片，只需切换到“复习”模式，剩下的就交给复习队列来处理：它会以逐渐拉长的间隔，在你快要忘记的时候将每张卡片重新展示给你。"
      },
      {
        "en": "You can grade yourself, or have Linkflare generate a quiz question about the card and evaluate your answer.",
        "cn": "你可以自己打分，也可以让Linkflare根据该卡片生成一道测验题，并评估你的答案。"
      },
      {
        "en": "Reviewing your own material also feels completely different from studying somebody else’s deck.",
        "cn": "复习自己的资料，与学习别人的讲义相比，感觉也截然不同。"
      },
      {
        "en": "You picked every single card, so every question is about something you once cared enough to save.",
        "cn": "你抽中了每一张卡片，所以每个问题都关乎你曾经足够在乎而保存下来的某样东西。"
      },
      {
        "en": "A few minutes between two work sessions.",
        "cn": "两次工作会议之间的几分钟。"
      },
      {
        "en": "It never feels like homework, but fun and thanks to some AI always different and fresh.",
        "cn": "这完全不像是在做作业，反而很有趣，而且多亏了人工智能，每次体验都不同且充满新鲜感。"
      },
      {
        "img": "assets/covers/gr-never-forget-what-matters-with-dr-david-urbans-4.jpg",
        "cap": ""
      },
      {
        "en": "With search engines and AI assistants one keystroke away, some people would argue we don’t need to remember anything anymore.",
        "cn": "既然只需按一下键盘就能使用搜索引擎和人工智能助手，有些人会认为我们已经不需要记住任何东西了。"
      },
      {
        "en": "Why do you think internalizing knowledge still matters?",
        "cn": "你认为为什么内化知识仍然很重要？"
      },
      {
        "en": "Knowledge you carry is the only knowledge you can think with.",
        "cn": "你所掌握的知识，是你唯一能够用来思考的知识。"
      },
      {
        "en": "Connections don’t happen in a database, they happen in your head.",
        "cn": "联系并非发生在数据库中，而是发生在你的脑海里。"
      },
      {
        "en": "You notice that an idea in an article contradicts something from a book you read last year, or that a concept from biology maps beautifully onto a problem at work.",
        "cn": "你会发现，某篇文章中的一个观点与去年读过的一本书中的内容相矛盾，或者生物学中的某个概念与工作中遇到的问题完美契合。"
      },
      {
        "en": "If neither of them is in your memory, no search engine will produce that spark for you.",
        "cn": "如果这两者都不在你记忆中，那么没有任何搜索引擎能为你点燃那道火花。"
      },
      {
        "en": "Everyone can look facts up now, which is exactly why carrying knowledge has become rarer and more interesting.",
        "cn": "如今人人都能查阅事实，正因如此，掌握知识才变得愈发罕见，也愈发引人入胜。"
      },
      {
        "en": "The most interesting person in the room isn’t the one who can google or ChatGPT fastest.",
        "cn": "房间里最有趣的人，并不是那个能最快使用谷歌或ChatGPT的人。"
      },
      {
        "en": "It’s the person who can tell you the story behind the fact, connect it to what you just said, and pull in something surprising from a completely different field.",
        "cn": "这样的人能够为你讲述事实背后的故事，将其与你刚才所说的话联系起来，并从一个完全不同的领域中引入一些出人意料的观点。"
      },
      {
        "en": "That’s taking advantage of your curious mind.",
        "cn": "这就是在利用你那颗好奇的心。"
      },
      {
        "en": "I actually think AI assistants make remembering more valuable, not less.",
        "cn": "其实我认为，AI助手让记忆变得更有价值，而不是更不值钱。"
      },
      {
        "en": "When answers are cheap, what sets people apart is judgment, taste, and the things they really know.",
        "cn": "当答案唾手可得时，区分人们的是判断力、品味以及他们真正掌握的知识。"
      },
      {
        "en": "The assistants are great at retrieving.",
        "cn": "这些助手在检索方面非常出色。"
      },
      {
        "en": "The connecting and the doubting still happen in a human head, and they work with whatever you’ve actually retained.",
        "cn": "这种联系与怀疑依然发生在人的脑海中，并且会基于你实际记住的内容进行运作。"
      },
      {
        "en": "Curious people and lifelong learners, first of all.",
        "cn": "首先，是那些充满好奇心的人和终身学习者。"
      },
      {
        "en": "People who read and watch and save a lot, and want it to make them smarter, which only works if you remember any of it later.",
        "cn": "那些大量阅读、观看和收藏内容，并希望借此让自己变得更聪明的人——但这只有在你日后还能记得其中任何一部分时才有效。"
      },
      {
        "en": "They’re the ones who get the most out of highlights, knowledge cards, and the review queue.",
        "cn": "正是他们最能充分利用重点标注、知识卡片和复习队列。"
      },
      {
        "en": "If you recognize yourself in the mess I described earlier — movie lists on the streaming platforms, books in one app, recipes in chat threads, articles in a read-it-later tool, notes in a PKM system — Linkflare is one tidy home for all of those lists.",
        "cn": "如果你发现自己正处于我刚才描述的那种混乱状态——流媒体平台上的电影清单、某个应用里的书籍、聊天记录中的食谱、稍后阅读工具里的文章、个人知识管理（PKM）系统中的笔记——那么 Linkflare 就是将所有这些清单整合到一个整洁空间的理想之选。"
      },
      {
        "en": "No clutter, and everything stays findable.",
        "cn": "没有杂乱，所有东西都能轻松找到。"
      },
      {
        "en": "Some of the most-used collections in my own household are the shared ones.",
        "cn": "在我家，使用频率最高的收藏品中，有些是大家共用的。"
      },
      {
        "en": "Everything I’ve described is from my real account, but here’s a bit more of it.",
        "cn": "我刚才描述的都是我真实账户的情况，不过这里还有一点补充。"
      },
      {
        "en": "The daily backbone is the inbox: newsletters and feeds land there, and I work through it in idle moments.",
        "cn": "收件箱是我日常工作的核心：新闻通讯和资讯都会发送到那里，我会在闲暇时逐一处理。"
      },
      {
        "en": "Our watch list currently holds about sixty movies and shows, sorted by IMDb rating, which has ended more than one “what should we watch” discussion in under a minute.",
        "cn": "我们的待看清单目前收录了大约六十部电影和电视剧，按IMDb评分排序，这让“我们看什么好”的讨论往往在不到一分钟内就有了定论。"
      },
      {
        "en": "Recipes my fiancée and I save during the week turn into the weekend’s cooking.",
        "cn": "我和未婚妻在工作日收藏的食谱，到了周末就会变成我们的烹饪菜单。"
      },
      {
        "en": "When we plan a trip, everything goes into a vacation collection, sights, restaurants, hotels, so the itinerary basically assembles itself.",
        "cn": "每当我们计划旅行时，所有内容都会被整理到一个“度假收藏”中，包括景点、餐厅、酒店等，因此行程基本上会自动规划出来。"
      },
      {
        "en": "The collection I cherish most is the one we share for our son: things we’d like to get him, places we want to take him.",
        "cn": "我最珍视的收藏，是我们为儿子共同整理的那份清单：我们想给他买的东西，以及想带他去的地方。"
      },
      {
        "en": "Either of us saves something in passing, and both of us see it.",
        "cn": "我们中任何一个人都会在路过时顺手拿走某样东西，而我们俩都看到了。"
      },
      {
        "en": "On the knowledge side, I turn book takeaways and article highlights into knowledge cards.",
        "cn": "在知识方面，我会将书籍的要点和文章的重点整理成知识卡片。"
      },
      {
        "en": "My review habit is nothing heroic: around ten cards a week, in the moments between work sessions when I would otherwise just check email.",
        "cn": "我的复习习惯没什么了不起的：每周大约十张卡片，就在工作间隙——如果不是这样，我大概只会去查查邮件。"
      },
      {
        "en": "And lately, because Linkflare has an MCP server, I sometimes let Claude quiz me on my own cards in the middle of a work day.",
        "cn": "而且最近，因为Linkflare有一台MCP服务器，我有时会在工作日的中间让克劳德用我自己的卡片考考我。"
      },
      {
        "en": "Being interrogated by my own library is still a slightly surreal experience.",
        "cn": "被自己图书馆盘问，仍然是一种略显超现实的体验。"
      },
      {
        "en": "And since we’re at Ness Labs: the highlight in the screenshot below is from one of yours, “The Omnipotence Dilemma”, a line about committing to your curiosity instead of chasing every thread at once — more or less the philosophy behind the whole product.",
        "cn": "既然提到了Ness Labs：下图截图中的亮点出自你们的一篇文章《全能困境》，其中有一句提到要专注于自己的好奇心，而不是同时追逐每一个线索——这基本上就是整个产品背后的理念。"
      },
      {
        "en": "Any highlight can be turned into a share card like that straight from the app.",
        "cn": "任何精彩片段都可以直接在应用中像这样转换成分享卡。"
      },
      {
        "en": "Looking ahead, how do you see Linkflare and personal knowledge management evolving over the next few years?",
        "cn": "展望未来，您认为Linkflare和个人知识管理在未来几年内将如何发展？"
      },
      {
        "en": "The second: your library should start working for you.",
        "cn": "第二点：你的书库应该开始为你服务。"
      },
      {
        "en": "Linkflare has an MCP server, which means AI assistants can, with your permission, search your bookmarks, save new ones, and quiz you on your knowledge cards.",
        "cn": "Linkflare 拥有一个 MCP 服务器，这意味着在征得您同意的情况下，AI 助手可以搜索您的书签、保存新书签，并就您的知识卡片向您提问。"
      },
      {
        "en": "I find that direction far more interesting than generic chatbots, because this assistant knows what you’ve collected over the years, not just the internet at large.",
        "cn": "我觉得这种方向比普通的聊天机器人有趣得多，因为这个助手知道你这些年来收集了什么，而不仅仅是互联网上的内容。"
      },
      {
        "en": "“What was that article about sleep I saved last year, and what did I highlight in it?” should simply have an answer.",
        "cn": "“我去年保存的那篇关于睡眠的文章讲了什么，里面我标注了哪些内容？”这个问题本该有个简单的答案。"
      },
      {
        "en": "Beyond that, I want the connections to get deeper.",
        "cn": "除此之外，我还希望这种联系能更加深入。"
      },
      {
        "en": "The tool should notice that something you save today relates to something you highlighted months ago, and tell you.",
        "cn": "该工具应该能察觉到，你今天保存的内容与几个月前标记的内容有关联，并提醒你。"
      },
      {
        "en": "I think the next years of personal knowledge management will be less about capturing more, because everyone has capture solved, and much more about resurfacing better — showing you the right memory at the moment you can use it, from a library you own.",
        "cn": "我认为，未来几年个人知识管理将不再侧重于“捕捉更多信息”——因为信息捕捉的问题已经得到了解决——而是更侧重于“更好地重新呈现”——从你拥有的知识库中，在你需要的时候向你展示恰到好处的记忆。"
      },
      {
        "en": "Thank you so much for your time, David!",
        "cn": "大卫，非常感谢您抽出时间！"
      },
      {
        "en": "Where can people learn more about Linkflare?",
        "cn": "大家可以在哪里了解更多关于Linkflare的信息？"
      },
      {
        "en": "Everything starts on our website, and you can use it for free.",
        "cn": "一切都始于我们的网站，您可以免费使用它。"
      },
      {
        "en": "I’m on X and on Bluesky as well, and I’d love to hear how you organize your corner of the web.",
        "cn": "我既在X上，也在Bluesky上，很想听听你是如何整理你那片网络空间的。"
      },
      {
        "en": "For Ness Labs readers we’ve set up something small: the code NESSLABS gets you 30 days of Linkflare Pro for free.",
        "cn": "我们为Ness Labs的读者准备了一份小礼物：使用优惠码NESSLABS，即可免费获得30天的Linkflare Pro服务。"
      },
      {
        "en": "And if you only try one thing, make it a tiny experiment, in proper Ness Labs fashion: for one week, save everything interesting into the inbox instead of leaving tabs open, and spend five minutes a day reviewing what you captured.",
        "cn": "如果你只能尝试一件事，那就按照Ness Labs一贯的风格，做个小小的实验：在一周内，把所有有趣的内容都保存到收件箱里，而不是让标签页一直保持打开状态，然后每天花五分钟回顾你收集的内容。"
      },
      {
        "en": "Watch what it does to your focus, and to how much you remember.",
        "cn": "观察它对你的专注力以及记忆量的影响。"
      },
      {
        "en": "As a knowledge worker, your brain is your most important tool.",
        "cn": "作为一名知识工作者，你的大脑是你最重要的工具。"
      },
      {
        "en": "Learn how to develop an experimental mindset and think like a scientist by reading Tiny Experiments.",
        "cn": "通过阅读《微型实验》，学习如何培养实验思维，像科学家一样思考。"
      },
      {
        "en": "Want to invest into your productivity and your mental health?",
        "cn": "想提升工作效率并改善心理健康吗？"
      },
      {
        "en": "Join the Ness Labs learning community with online courses, workshops, and 1:1 matching.",
        "cn": "加入 Ness Labs 学习社区，参与在线课程、研讨会和一对一匹配活动。"
      },
      {
        "en": "The Ness Letters are packed with science-backed strategies to be more productive and creative without sacrificing your mental health.",
        "cn": "《内斯信件》中充满了经科学验证的策略，帮助你在不损害心理健康的前提下，提升工作效率和创造力。"
      },
      {
        "en": "Ness Labs provides content, coaching, courses and community to help makers put their minds at work.",
        "cn": "Ness Labs 提供内容、指导、课程和社区，帮助创客发挥创造力。"
      },
      {
        "en": "Apply evidence-based strategies to your daily life, run your own tiny experiments, and connect with fellow curious minds.",
        "cn": "将循证策略应用到日常生活中，开展自己的微型实验，并与其他充满好奇心的人交流。"
      }
    ]
  },
  {
    "id": "st-a-new-photo-exhibit-asks-a-heartbreaking-quest",
    "cat": "明星",
    "title": "A New Photo Exhibit Asks a Heartbreaking Question: What If Emmett Till Had Lived?",
    "titleZh": "一场新的摄影展提出了一个令人心碎的问题：如果埃米特·蒂尔还活着会怎样？",
    "source": "Vanity Fair · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 8,
    "url": "https://www.vanityfair.com/story/if-emmett-till-lived-photos",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/st-a-new-photo-exhibit-asks-a-heartbreaking-quest.jpg",
    "paras": [
      {
        "en": "Since his lynching in 1955, Emmett Till has been a symbol of the civil rights movement and a face for the countless Black men slain in racially motivated attacks.",
        "cn": "自1955年遭私刑处决以来，埃米特·蒂尔一直是民权运动的象征，也是无数在种族主义袭击中遇害的黑人男性的代表。"
      },
      {
        "en": "But while the 14-year-old’s kidnapping and murder has inspired a number of films and documentaries, Dr. Sarah Elizabeth Lewis—a professor of humanities, African studies, and African American studies at Harvard—wanted to approach Till’s legacy in a new way: not as a case to be investigated, but as an example of the promise the world loses to every act of racist violence.",
        "cn": "尽管这名14岁少年被绑架并遇害的事件曾启发了多部电影和纪录片的创作，但哈佛大学人文学科、非洲研究及非裔美国人研究教授莎拉·伊丽莎白·刘易斯博士希望以一种崭新的方式来探讨蒂尔留下的遗产：不是将其视为一个待调查的案件，而是将其视为一个例证——每一次种族主义暴力行为，都会让世界失去一份希望。"
      },
      {
        "en": "“We are in an era where we are challenged to see the facts of history, to see what's in front of us,” Lewis tells Vanity Fair.",
        "cn": "“我们正处于一个时代，在这个时代里，我们面临着直面历史事实、看清眼前事物的挑战，”刘易斯对《名利场》杂志说道。"
      },
      {
        "en": "She does just that in What If Emmett Till Lived?, a multi-artist exhibit at Columbia College Chicago’s Museum of Contemporary Photography (MoCP) that Lewis curated under the guidance of Reverend Wheeler Parker, Jr.—Till’s best friend, cousin, and witness to his abduction.",
        "cn": "她在《如果埃米特·蒂尔还活着会怎样？》中正是这样做的。这是一场由多位艺术家参与的展览，在芝加哥哥伦比亚学院当代摄影博物馆（MoCP）举办，由刘易斯在小惠勒·帕克牧师的指导下策划——帕克牧师是蒂尔最好的朋友、表亲，也是他被绑架事件的目击者。"
      },
      {
        "en": "On August 24, 1955, Chicago native Till was visiting relatives near Money, Mississippi, when he was accused of whistling at a white woman, shopkeeper Carolyn Bryant.",
        "cn": "1955年8月24日，出生于芝加哥的蒂尔在密西西比州莫尼附近探亲时，被指控向一名白人妇女——店主卡罗琳·布莱恩特——吹口哨。"
      },
      {
        "en": "Four nights later, on August 28, Emmett Till was kidnapped, tortured, and shot in the head for that alleged transgression.",
        "cn": "四天后的8月28日，埃米特·蒂尔因那项所谓的“越界行为”遭到绑架、酷刑折磨，并被一枪击中头部。"
      },
      {
        "en": "His abductors, Roy Bryant and J.",
        "cn": "绑架他的人是罗伊·布莱恩特和J."
      },
      {
        "en": "Milam— who admitted their crimes but were never convicted for them—threw his body into the Tallahatchie River, weighing it down with a cotton-gin fan.",
        "cn": "米拉姆——他虽然承认了自己的罪行，但从未因此被定罪——将尸体扔进了塔拉哈奇河，并在尸体上绑了一台棉花机风扇作为配重。"
      },
      {
        "img": "assets/covers/st-a-new-photo-exhibit-asks-a-heartbreaking-quest-3.jpg",
        "cap": ""
      },
      {
        "en": "When his body was found, Emmett’s mother, Mamie Till-Mobley, insisted on an open-casket funeral.",
        "cn": "当埃米特的遗体被发现时，他的母亲玛米·蒂尔-莫布利坚持要举行露棺葬礼。"
      },
      {
        "en": "She hoped that the horrifying image of his grotesquely brutalized head might reach people the way words have not.",
        "cn": "她希望他那被残忍摧残得面目全非的头部所呈现出的骇人景象，能像文字无法做到的那样打动人们。"
      },
      {
        "en": "“A photograph was what would be required to transform witnessing in society,” Lewis said—and indeed, the funeral photos had a tremendous impact at the time when news outlets published them.",
        "cn": "“要改变社会中的见证方式，就需要一张照片，”刘易斯说——事实上，当新闻媒体刊登这些葬礼照片时，它们确实产生了巨大的影响。"
      },
      {
        "en": "“For me, there can be no more important question than asking, ‘What does seeing the truth require today?’”",
        "cn": "“对我来说，没有什么问题比‘今天要看清真相需要什么’更重要了。”"
      },
      {
        "en": "What galvanized her to launch this project was the resistance, even now, to acknowledging the details of Till’s case.",
        "cn": "促使她启动这个项目的，正是人们至今仍不愿承认蒂尔案具体细节的抵触态度。"
      },
      {
        "en": "One example: a memorial placed at Graball Landing near Glendora, Mississippi, where Till’s body was pulled from the river, has been the site of countless acts of vandalism.",
        "cn": "举个例子：位于密西西比州格伦多拉附近格拉巴尔登陆点的纪念碑——蒂尔的遗体正是从那里被从河中打捞上来的——曾多次遭到破坏。"
      },
      {
        "en": "A visit to the monument “constructed an urgency in me to do my part to honor Emmett Till's life,” says Lewis.",
        "cn": "“参观这座纪念碑让我产生了一种紧迫感，想要尽自己的一份力量来纪念埃米特·蒂尔的一生，”刘易斯说道。"
      },
      {
        "en": "But she was coming from a place beyond mourning and despair.",
        "cn": "但她所处的境地已超越了悲伤与绝望。"
      },
      {
        "en": "“He’s become a symbol,” she says, “but we’ve never given ourselves a means to envision his right to life.” So Lewis sought to build one for him, using photos by artists in MoCP’s permanent collection—including ones by Annie Leibovitz, Francesco Scavullo, Bruce Davidson, and about 110 others.",
        "cn": "“他已成为一个象征，”她说，“但我们从未找到一种方式来设想他拥有生存的权利。”于是，刘易斯试图为他构建这样一种途径，利用芝加哥摄影博物馆（MoCP）永久馆藏中艺术家的照片——其中包括安妮·莱博维茨、弗朗切斯科·斯卡武洛、布鲁斯·戴维森等约110位艺术家的作品。"
      },
      {
        "en": "For months on end, Lewis would take a seat, set an intention, and scan through images until she lost focus.",
        "cn": "好几个月来，刘易斯总是坐下来，设定一个目标，然后翻看图片，直到注意力开始涣散。"
      },
      {
        "en": "She went through 18,000 photographs, choosing images without considering the identity of each individual artist.",
        "cn": "她翻看了18,000张照片，在挑选照片时并未考虑每位艺术家的身份。"
      },
      {
        "en": "She also invoked the departed: “I’m not afraid to say I really asked for guidance from Till and from Mamie Till-Mobley.",
        "cn": "她还提到了已故的亲人：“我不怕说，我确实向蒂尔和玛米·蒂尔-莫布利寻求过指引。”"
      },
      {
        "en": "I really asked for a sign of what was meant to represent his unlived life, and really, that’s maybe for another kind of interview.",
        "cn": "我确实曾请求他给我一个象征他那段未曾经历过的人生的事物，不过说真的，这或许该留待另一次访谈再谈了。"
      },
      {
        "en": "But it shocked me how precise the feedback was.”",
        "cn": "“但反馈竟然如此精准，这让我大吃一惊。”"
      },
      {
        "img": "assets/covers/st-a-new-photo-exhibit-asks-a-heartbreaking-quest-4.jpg",
        "cap": ""
      },
      {
        "en": "Once Lewis had winnowed the images down to a manageable number, she met with Parker to make the final picks.",
        "cn": "当刘易斯将图片筛选到一个可控的数量后，她便与帕克会面，共同确定了最终选定的一批。"
      },
      {
        "en": "“He lives with that survivor’s guilt,” Lewis says of the 87-year-old clergyman, who has dedicated his life to keeping Till’s memory alive.",
        "cn": "“他一直背负着那种幸存者内疚感，”刘易斯这样评价这位87岁的牧师，他毕生致力于让蒂尔的精神永存。"
      },
      {
        "en": "“He is the last living eyewitness.",
        "cn": "“他是现存的最后一位目击者。"
      },
      {
        "en": "He bears the testimony of the story that’s never been acknowledged by the official record.”",
        "cn": "“他见证了那个从未被官方记录所承认的故事。”"
      },
      {
        "en": "The exhibit’s choices aren’t necessarily what you’d expect from a project related to one of the most notable tragedies in modern American life.",
        "cn": "该展览的选题，未必是人们对一个与现代美国历史上最引人注目的悲剧之一相关的项目所抱有的预期。"
      },
      {
        "en": "It and its companion piece, a photo and essay collection called If Emmett Till Lived: A Creative Monument, express messages of hope and positivity, a rare and almost counterintuitive tactic for a death as horrific as Till’s.",
        "cn": "该作品及其配套作品——一部名为《如果埃米特·蒂尔还活着：一座创意纪念碑》的照片与随笔集——传递着希望与积极向上的信息，对于蒂尔这样惨烈的死亡事件而言，这是一种罕见且几乎违背直觉的做法。"
      },
      {
        "en": "We see photos of children playing alongside images of a cup of coffee or a scoop of ice cream; a father playing with a baby is followed by an image of former president Barack Obama.",
        "cn": "我们看到孩子们玩耍的照片与一杯咖啡或一勺冰淇淋的图片并列；一张父亲和婴儿玩耍的照片之后，紧接着是一张前总统巴拉克·奥巴马的照片。"
      },
      {
        "en": "“What I was asking in every turn is, does this represent a pathway, a life option?” Lewis says.",
        "cn": "“我一直在问的是，这是否代表了一条出路，一种人生选择？”刘易斯说。"
      },
      {
        "en": "“Does this represent opportunity?",
        "cn": "“这是否意味着机遇？"
      },
      {
        "en": "So you see, in many cases, proxies for Till.”",
        "cn": "所以你看，在许多情况下，这些都是蒂尔的代理人。”"
      },
      {
        "en": "That so many images are simple, relatable scenes is intentional, Lewis says.",
        "cn": "刘易斯表示，这么多画面都是简单、贴近生活的场景，这是有意为之。"
      },
      {
        "en": "“It represents, ultimately, the fact that Emmett Till’s story represents all of ours, and that our lives represent his.”",
        "cn": "“归根结底，这说明埃米特·蒂尔的故事代表了我们所有人的故事，而我们的人生也代表着他的故事。”"
      },
      {
        "en": "Peter Cochrane, one of the artists whose work Lewis chose, says he understands her reasoning.",
        "cn": "彼得·科克伦是刘易斯选中作品的艺术家之一，他表示理解她的考量。"
      },
      {
        "en": "“Photographs used in journalism, videos, etc., can strike a chord initially, but then we grow sort of tired of them—I’m thinking of the sort of horrors that have been documented,” he says.",
        "cn": "“新闻报道、视频等中使用的照片，起初或许能引起共鸣，但随后我们便会感到有些厌倦——我想到的正是那些被记录下来的惨状，”他说。"
      },
      {
        "en": "“We just become sort of inured.”",
        "cn": "“我们只是变得有点麻木了。”"
      },
      {
        "en": "“Then, there are images in our sort of artistic and social canon that just stick with us forever, right?",
        "cn": "“此外，在我们的艺术和社会经典中，有些画面会永远留在我们心中，对吧？"
      },
      {
        "en": "You see them once, and you’ll never forget them,” Cochrane continues.",
        "cn": "“你只要见过他们一次，就永远不会忘记他们，”科克伦接着说道。"
      },
      {
        "en": "“I think that’s a lot of what Sarah Lewis was drawn to in these.”",
        "cn": "“我觉得这正是莎拉·刘易斯对这些作品着迷的主要原因。”"
      },
      {
        "en": "Call it guidance from beyond; call it the ghost in the machine.",
        "cn": "管它叫来自彼岸的指引，还是机器中的幽灵。"
      },
      {
        "en": "But whatever was guiding Lewis seemed to agree with Cochrane about tragedy’s numbing effect.",
        "cn": "但无论是什么在指引刘易斯，他似乎都认同科克伦关于悲剧具有麻木效应的观点。"
      },
      {
        "en": "“There were moments where an image, because these are civil rights photographs, was of explicit violence.",
        "cn": "“有些时候，由于这些是民权运动的照片，画面中会出现露骨的暴力场景。"
      },
      {
        "en": "I would look at it, and there were many times where something would glitch on the computer, and it would not get in.”",
        "cn": "“我看着它，很多时候电脑会出现故障，导致数据无法导入。”"
      },
      {
        "en": "It’s hard to think about Till and not feel despair, especially for someone who’s paying attention to the news.",
        "cn": "一想到蒂尔，就很难不感到绝望，特别是对于那些关注新闻的人来说。"
      },
      {
        "en": "But Lewis hopes the exhibit can counteract despair with the reminder that living in “generation time”—a longer span than just a few years—is important.",
        "cn": "但刘易斯希望，通过提醒人们“世代时间”（其跨度远不止几年）的重要性，此次展览能够抵消这种绝望情绪。"
      },
      {
        "en": "Du Bois, the first Black person to earn a PhD at Harvard.",
        "cn": "杜波依斯，首位在哈佛大学获得博士学位的黑人。"
      },
      {
        "en": "“He needed to be able to maintain his fortitude because of what was going to come.",
        "cn": "“鉴于即将发生的事情，他必须保持坚韧不拔的意志。”"
      },
      {
        "en": "We're going to have another flourishing, another time.”",
        "cn": "“我们还会迎来另一个繁荣时期，另一个时代。”"
      },
      {
        "en": "“Generation time requires keeping an eye on two things at once,” Lewis continues.",
        "cn": "“生成时间需要同时关注两件事，”刘易斯接着说。"
      },
      {
        "en": "“You know what’s required for the moment, and what’s required for the era, and the era requires endurance.",
        "cn": "“你知道当下需要什么，也知道这个时代需要什么，而这个时代需要的是坚韧。”"
      },
      {
        "en": "That’s what I owe to my ancestors.",
        "cn": "这就是我对祖先应尽的责任。"
      },
      {
        "en": "That’s what I owe to the future.”",
        "cn": "“这就是我对未来应尽的责任。”"
      },
      {
        "en": "opened at MoCP on September 10 and will run until December 19, 2026.",
        "cn": "该展览于9月10日在MoCP开幕，将持续至2026年12月19日。"
      },
      {
        "en": "Its companion publication, If Emmett Till Lived: A Creative Monument, is available now.",
        "cn": "其配套出版物《如果埃米特·蒂尔还活着：一座创意纪念碑》现已上市。"
      }
    ]
  },
  {
    "id": "st-tribeca-is-new-york-s-new-gallery-mecca",
    "cat": "明星",
    "title": "Tribeca Is New York’s New Gallery Mecca",
    "titleZh": "翠贝卡已成为纽约新的画廊圣地",
    "source": "Vanity Fair · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 14,
    "url": "https://www.vanityfair.com/style/tribeca-galleries",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/st-tribeca-is-new-york-s-new-gallery-mecca.jpg",
    "paras": [
      {
        "img": "assets/covers/st-tribeca-is-new-york-s-new-gallery-mecca-3.jpg",
        "cap": ""
      },
      {
        "en": "Read True Colors: Inside the global deals and colorful critiques that make the art world go round, with a weekly guide to the must-see openings, auctions, and fairs.",
        "cn": "阅读《True Colors》：深入了解推动艺术界运转的全球交易与丰富多彩的评论，并获取每周必看的展览开幕、拍卖和艺术博览会指南。"
      },
      {
        "en": "It’s time to proclaim a new preeminent gallery district in New York.",
        "cn": "是时候宣布纽约出现一个崭新的顶尖画廊区了。"
      },
      {
        "en": "It is finally, actually, all happening in Tribeca.",
        "cn": "说到底，这一切其实都在翠贝卡上演。"
      },
      {
        "en": "Just this past Wednesday night, at least 70 major blue-chip gallery shows opened in or near the neighborhood—nearly all of them within a few blocks of one another.",
        "cn": "就在上周三晚上，该社区内及周边至少有70场大型蓝筹画廊展览开幕——其中几乎所有展览都集中在相距仅几个街区范围内。"
      },
      {
        "en": "We’ve come a long way from the days when this area was called the Triangle Below Canal.",
        "cn": "与这片区域曾被称为“运河以南三角区”的年代相比，我们已经走了很长一段路。"
      },
      {
        "en": "In some ways, the gallery world’s migration has been a slow burn.",
        "cn": "从某些方面来看，画廊界的迁移是一个缓慢而持续的过程。"
      },
      {
        "en": "I’ve been tracking galleries opening in Tribeca since at least 2016, when Stefania Bortolami told me she was ditching Chelsea for downtown, and doing so without a twinge of regret.",
        "cn": "我追踪翠贝卡地区画廊的开业情况至少可以追溯到2016年，当时斯特法尼亚·博尔托拉米告诉我，她要离开切尔西搬到市中心，而且对此毫无遗憾。"
      },
      {
        "en": "“I’m pretty happy to be going away from Chelsea.",
        "cn": "“能离开切尔西，我感到相当高兴。"
      },
      {
        "en": "This whole block is going to be torn down to become condos.",
        "cn": "整个街区都将被拆除，改建为公寓楼。"
      },
      {
        "en": "It’s insane—not only here, but every block,” she told me a decade ago.",
        "cn": "“简直太疯狂了——不仅这里，每个街区都是如此，”她十年前对我说。"
      },
      {
        "en": "“I know there are some galleries that need to move from Chelsea,” Bortolami said in 2016.",
        "cn": "“我知道有些画廊需要搬离切尔西，”博尔托拉米在2016年说道。"
      },
      {
        "en": "“Already, from the moment when I said I was interested in this space, I got a lot of calls.”",
        "cn": "“其实，从我表示对这个空间感兴趣的那一刻起，我就接到了很多电话。”"
      },
      {
        "en": "They moved in waves, with a major spike happening after the pandemic.",
        "cn": "他们呈波浪式迁入，其中在疫情之后出现了一次大幅增长。"
      },
      {
        "en": "In the past few years, though, a larger number of truly global art-selling concerns have claimed a foothold in Tribeca.",
        "cn": "不过，在过去的几年里，越来越多的真正具有全球影响力的艺术品销售机构已在翠贝卡站稳了脚跟。"
      },
      {
        "en": "When Marian Goodman finally gave up its 57th Street location in 2024, it opted to move downtown rather than to the West Side, taking over a gigantic building on Broadway and renovating it top to bottom.",
        "cn": "2024年，当玛丽安·古德曼画廊最终放弃其位于57街的展馆时，它选择迁往市中心而非西区，接手了百老汇上一栋巨型建筑，并对之进行了彻底翻新。"
      },
      {
        "en": "In 2022, Pace opened a gallery that would be run solely by its founder, Arne Glimcher.",
        "cn": "2022年，佩斯画廊开设了一家由其创始人阿恩·格利姆彻独立运营的画廊。"
      },
      {
        "en": "David Zwirner opened a kunsthalle called 52 Walker in 2021; this year, he’s converted the space into a full-blown outpost of his mega-gallery, and next week he will open a show of new paintings by Emma McIntyre.",
        "cn": "大卫·兹维纳于2021年开设了一家名为“52 Walker”的艺术中心；今年，他将该空间改造成了其大型画廊的一个正式分支机构，并将于下周举办艾玛·麦金太尔的新画作展。"
      },
      {
        "en": "Later this year, Karma, which also has spaces in Chelsea and Los Angeles, will open an outpost on White Street in Tribeca.",
        "cn": "今年晚些时候，Karma（该品牌在切尔西和洛杉矶也设有门店）将在翠贝卡的白街开设一家分店。"
      },
      {
        "en": "Other gallery openings, I’m told, are yet to be announced.",
        "cn": "据我所知，其他画廊的开幕活动尚未公布。"
      },
      {
        "en": "The economics of this operation do confuse me.",
        "cn": "这项行动的经济效益确实让我感到困惑。"
      },
      {
        "en": "As anyone who shops at Meadow Lane knows, Tribeca is one of the most expensive neighborhoods in Manhattan, which puts it high on the list for the priciest patch of dirt anywhere.",
        "cn": "正如任何在梅多巷购物的人都知道的那样，翠贝卡是曼哈顿最昂贵的社区之一，这使得它在“全球最昂贵的土地”排行榜上名列前茅。"
      },
      {
        "en": "Crypto-loving billionaire Michael Novogratz lives in Tribeca.",
        "cn": "热爱加密货币的亿万富翁迈克尔·诺沃格拉茨住在翠贝卡。"
      },
      {
        "en": "So does Mukesh Ambani, the Indian businessman worth $120 billion, who’s turning 11 Hubert Street into the largest apartment in New York City.",
        "cn": "身家1200亿美元的印度商人穆凯什·安巴尼也是如此，他正在将休伯特街11号改造成纽约市最大的公寓。"
      },
      {
        "en": "Indeed, Bortolami told me in 2016 that even back then, she wasn’t getting a price cut by moving out of Chelsea—her Tribeca rent was the same, though the space was bigger.",
        "cn": "事实上，博尔托拉米在2016年曾告诉我，即使在那时，她搬离切尔西也并未因此获得租金减免——她在翠贝卡的租金与之前相同，尽管住处面积更大。"
      },
      {
        "en": "But remarkably, even as the last half-decade has made city living comically unsustainable—bodegas are selling Diet Cokes for $4—rents in Tribeca have stayed relatively stable.",
        "cn": "但令人惊讶的是，尽管过去这五年里城市生活变得荒谬地难以维持——小杂货店里一罐健怡可乐都要卖4美元——翠贝卡的房租却一直保持相对稳定。"
      },
      {
        "en": "This data point is coming from no lesser authority than Jonathan Travis, the real estate agent who, during the pandemic, brokered deals for one gallerist after another looking for spaces in Tribeca.",
        "cn": "这一数据来源于权威人士乔纳森·特拉维斯——这位房地产经纪人在疫情期间，为一位又一位在翠贝卡寻找展厅的画廊主促成了交易。"
      },
      {
        "en": "On the lease-signing side, there’s no one more integral to the whole migration.",
        "cn": "在租赁签约方面，没有人比他更对整个迁移过程至关重要。"
      },
      {
        "en": "“Rents on the big ground-floor spaces have not really moved drastically at all since 2020,” Travis tells me, though he mentioned that the inventory of “high-quality large spaces” has been low since day one.",
        "cn": "“自2020年以来，大型底层商铺的租金其实并没有出现太大波动，”特拉维斯告诉我，不过他提到，“优质大型商铺”的供应量从一开始就一直很低。"
      },
      {
        "en": "Now all of those spaces have been snapped up by dealers ready for the spotlight, hell-bent on competing in what’s now the most concentrated art-viewing hopscotch in Manhattan.",
        "cn": "如今，这些展位已被经销商们一抢而空，他们摩拳擦掌，准备大放异彩，并决心在这条如今已成为曼哈顿艺术观赏最密集的“跳房子”路线中一决高下。"
      },
      {
        "en": "And the energy gets pretty bonkers with 70 openings raging at the same time.",
        "cn": "而且，当70场开幕式同时如火如荼地进行时，现场气氛简直热得发狂。"
      },
      {
        "en": "“Tribeca as a neighborhood is absolutely a global arts powerhouse now, with foot traffic that rivals anywhere in the world when the galleries have coordinated openings,” Travis says.",
        "cn": "“特里贝卡作为一個社区，如今绝对是全球艺术重镇，每当各画廊联合举办开幕活动时，这里的人流量足以与世界任何地方媲美，”特拉维斯说。"
      },
      {
        "en": "“I’ve even seen lines to get into galleries.”",
        "cn": "“我甚至还看到过人们排队进画廊。”"
      },
      {
        "img": "assets/covers/st-tribeca-is-new-york-s-new-gallery-mecca-4.jpg",
        "cap": ""
      },
      {
        "en": "As of this month, the neighborhood even has a local artists canteen.",
        "cn": "从本月起，这个社区甚至还开了一家本地艺术家食堂。"
      },
      {
        "en": "Not The Odeon—though The Odeon is still a perfect restaurant and just a convenient stroll away from the Tribeca gallery network.",
        "cn": "不是“奥德翁”——尽管“奥德翁”依然是一家完美的餐厅，而且距离翠贝卡画廊群只需步行片刻即可到达。"
      },
      {
        "en": "That restaurant is Faux, a neo-bistro that opened a few days ago on Church Street—just steps away from many galleries on White Street.",
        "cn": "那家餐厅名叫“Faux”，是一家新派小酒馆，几天前在教堂街开业——距离怀特街上的许多画廊仅几步之遥。"
      },
      {
        "en": "Among media and dining-out types, Faux’s not an unknown entity.",
        "cn": "在媒体界和餐饮爱好者中，Faux 并非无名之辈。"
      },
      {
        "en": "It’s the work of 23-year-old former Balthazar staffer George McNally, son of Keith McNally, the I Regret Almost Everything author who kicked off his Gotham-conquering run by opening, you guessed it, The Odeon, back in 1980, along with his brother Brian McNally and his then wife Lynn Wagenknecht, who still owns it solo.",
        "cn": "这是23岁的前巴尔塔扎尔餐厅员工乔治·麦克纳利的作品，他是《我几乎后悔一切》一书的作者基思·麦克纳利的儿子——基思正是通过开设（你猜对了）1980年，他与兄弟布莱恩·麦克纳利以及当时的妻子琳恩·瓦根克内希特共同开设了“奥德翁”餐厅，由此开启了他在哥谭市的征服之旅——而琳恩至今仍是该餐厅的唯一所有者。"
      },
      {
        "en": "Faux channels the vibe of another McNally property: Lucky Strike, a place I loved that doubled as SoHo’s art world anchor restaurant before all the galleries moved to Chelsea.",
        "cn": "Faux 营造出麦克纳利旗下另一家餐厅的氛围：Lucky Strike——那是我非常喜欢的一家餐厅，在所有画廊迁往切尔西之前，它曾是苏活区艺术界的标志性餐厅。"
      },
      {
        "en": "“Eric Fischl went there for lunch with Ralph Gibson.",
        "cn": "“埃里克·菲施尔和拉尔夫·吉布森一起去那里吃了午饭。"
      },
      {
        "en": "They had a standing thing,” gallerist Jeffrey Deitch told me while mourning Lucky Strike after it closed in 2020.",
        "cn": "“他们一直有个惯例，”画廊主杰弗里·迪奇在2020年“幸运一击”画廊关闭后，一边悼念它一边对我说。"
      },
      {
        "en": "“I used to go there to have a few beers in the evenings with Jeff Koons.",
        "cn": "“我以前经常晚上和杰夫·昆斯一起去那里喝几杯啤酒。”"
      },
      {
        "en": "George McNally’s restaurant isn’t a carbon copy of Keith’s.",
        "cn": "乔治·麦克纳利的餐厅并不是基思餐厅的复制品。"
      },
      {
        "en": "It’s got funky paintings-on-tile of tarot cards, tables without white tablecloths, and paperback-size menus.",
        "cn": "这里有风格独特的塔罗牌瓷砖画，没有铺白色桌布的餐桌，还有平装书大小的菜单。"
      },
      {
        "en": "McNally didn’t exactly plan to open Faux in this new gallery district.",
        "cn": "麦克纳利原本并没有打算在这个新兴的画廊区开设“Faux”画廊。"
      },
      {
        "en": "But as he told me Tuesday, its location is pretty fortuitous.",
        "cn": "但他周二告诉我，这个地点选得相当巧。"
      },
      {
        "en": "He’s already in talks to host private post-opening celebration dinners at Faux’s downstairs bar, which doubles as a vaulted private dining room.",
        "cn": "他目前正在商谈，计划在Faux餐厅楼下的酒吧——该处同时也是一间拱顶私人包厢——举办开业后的私人庆祝晚宴。"
      },
      {
        "en": "Not that you need a buyout: Among those seated at the two dozen tables Tuesday night were the painters Adam Alessi, Tristan Unrau, and Dustin Hodges, along with dealers Sebastian Gladstone and George Newall and the esteemed ventriloquist Sophie Becker.",
        "cn": "倒也不是说你需要被收购：周二晚上，坐在这二十几张桌子旁的人中，有画家亚当·阿莱西、特里斯坦·乌恩劳和达斯汀·霍奇斯，还有画商塞巴斯蒂安·格拉德斯通和乔治·纽厄尔，以及备受尊敬的腹语艺术家索菲·贝克尔。"
      },
      {
        "en": "When McNally was sitting at our perfectly rickety table, I said that the place looked like it had been here forever.",
        "cn": "当麦克纳利坐在我们那张摇摇欲坠的桌子旁时，我说这地方看起来好像一直都在这里一样。"
      },
      {
        "en": "“That’s the highest compliment anyone could give me,” he said.",
        "cn": "“这是任何人能给予我的最高赞誉，”他说。"
      },
      {
        "en": "On Wednesday I made a quick trip to SoHo, where Rita Ackermann was opening a show at the Hauser & Wirth space on Wooster Street—just a block from what was once Andrea Rosen’s gallery in the ’90s.",
        "cn": "周三，我匆匆去了趟苏活区，里塔·阿克曼正在伍斯特街的豪瑟沃斯画廊举办个展开幕式——那里距离90年代安德里亚·罗森的画廊旧址仅一个街区之遥。"
      },
      {
        "en": "During a brief, rare tour of the new show before doors opened to the public, Ackermann said she had her first New York solo show with Rosen in 1994.",
        "cn": "在向公众开放前的一次简短而难得的展览导览中，阿克曼表示，她于1994年与罗森合作举办了她在纽约的首场个展。"
      },
      {
        "en": "Several of the people there for the tour had also been present way back when—like Chloë Sevigny, who told me she met Ackermann when she was 18 and used to walk into Rosen’s gallery three times a day.",
        "cn": "参加此次导览的几位来宾当年也曾到场——比如克洛伊·塞维尼，她告诉我，自己18岁时就认识了阿克曼，那时她每天都要去罗森的画廊三次。"
      },
      {
        "en": "Then I headed toward Tribeca—and past the Celine store, which was giving out hot dogs with “Celine” written on them in mustard.",
        "cn": "随后，我朝翠贝卡走去——路过一家Celine专卖店，店里正在派发热狗，热狗上用芥末写着“Celine”字样。"
      },
      {
        "en": "I also passed dealer Garth Greenan’s new two-prong SoHo foothold, a pair of elegant ground-floor spaces on Greene Street.",
        "cn": "我还路过了画廊主加思·格里南在苏豪区新开设的两处据点——格林街上两处位于一楼的优雅空间。"
      },
      {
        "en": "The gallery is showing work by the legendary Rosalyn Drexler, a bodybuilder, wrestler, novelist, playwright, and film critic for Vogue, who died last year at the age of 98.",
        "cn": "该画廊正在展出传奇人物罗莎琳·德雷克斯勒的作品。她曾是健美运动员、摔跤手、小说家、剧作家，也是《Vogue》杂志的影评人，去年以98岁高龄去世。"
      },
      {
        "en": "And then I crossed the Rubicon of Canal Street into Tribeca, where art viewers thronged down Broadway and peeled off toward galleries in every direction.",
        "cn": "随后，我跨过卡纳尔街这条“鲁比康河”，进入了翠贝卡区，那里艺术爱好者们挤满了百老汇大街，随后向四面八方的画廊散去。"
      },
      {
        "en": "I was blown away by everything happening at Maxwell Graham, which just moved to the top floor of the building adjacent to Cortlandt Alley—one of the most sui generis edifices downtown, with a hand-cranked elevator and all sorts of secret entrances and exits.",
        "cn": "麦克斯韦·格雷厄姆（Maxwell Graham）那里发生的一切让我惊叹不已。这家店刚刚搬到了科特兰特巷（Cortlandt Alley）旁边那栋大楼的顶层——那是市中心最具独特风格的建筑之一，配有手摇电梯，还有各种各样的秘密出入口。"
      },
      {
        "en": "Graham’s new space is generously proportioned, and the inaugural show features Michael E.",
        "cn": "格雷厄姆的新展厅空间宽敞，首展将展出迈克尔·E.的作品。"
      },
      {
        "en": "Smith, the enigmatic poet-artist who sculpts with light and makes balletic, strange ready-mades from everyday objects.",
        "cn": "史密斯，这位神秘的诗人兼艺术家，他以光为媒介进行雕塑创作，并利用日常物品制作出宛如芭蕾舞般奇特的现成品。"
      },
      {
        "en": "Smith is having a banner year, with a solo show at Graham and a survey at MASS MoCA, plus an exhibition at Waldo, Tobias Czudej’s seasonal space in an out-there part of Maine.",
        "cn": "史密斯今年可谓风头正劲，不仅在格雷厄姆画廊举办了个人展，还在马萨诸塞州当代艺术博物馆（MASS MoCA）举办了回顾展，此外还在托比亚斯·楚德伊位于缅因州偏远地区的季节性展馆“沃尔多”举办了展览。"
      },
      {
        "en": "On Wednesday the place was packed—who needs painting when there’s capital-C conceptual art?",
        "cn": "周三那里人满为患——既然有大写的“C”概念艺术，谁还需要绘画呢？"
      },
      {
        "en": "Down the street was Ellie Rines Gallery, formerly known as 56 Henry, which just moved to Tribeca and debuted with a massive installation by Christopher K.",
        "cn": "街对面是埃莉·莱恩斯画廊（Ellie Rines Gallery），该画廊前身为“56亨利”（56 Henry），刚刚搬迁至翠贝卡（Tribeca），并以克里斯托弗·K（Christopher K）的一件大型装置作品作为新址首展。"
      },
      {
        "en": "The new ground-floor space is, by my eyeball estimate, about 10 times the size of the old gallery—but just as before, you’re bound to run into some unexpected art people if you sneak into the back room.",
        "cn": "据我目测，新的一楼空间大约是旧画廊的10倍大——但和以前一样，如果你悄悄溜进后屋，肯定会遇到一些意想不到的艺术圈人士。"
      },
      {
        "en": "I walked in to see a giant Cynthia Talmadge on the wall, with Cecily Brown sitting in front of it and 291 Agency cofounder Andrea Crane talking to artist Jo Messer.",
        "cn": "我一走进来，就看到墙上挂着一幅巨大的辛西娅·塔尔马奇的作品，塞西莉·布朗正坐在画前，而291 Agency的联合创始人安德烈娅·克雷恩则正与艺术家乔·梅瑟交谈。"
      },
      {
        "en": "Nearby, I enjoyed Matt McCormick’s paintings installed inside the façade of a SoCal corner store at Ruttkowski;68.",
        "cn": "在附近，我欣赏了马特·麦考密克的画作，这些作品陈列在Ruttkowski街68号一家南加州街角小店的立面内。"
      },
      {
        "en": "At Chapter NY I loved new work by Alix Vernet.",
        "cn": "在Chapter NY，我非常喜欢阿里克斯·韦尔内的新作。"
      },
      {
        "en": "She’s made sculptures from the aluminum condenser coils inside discarded AC units, the guts of the cooling machines that have been weathered by New York City elements.",
        "cn": "她利用废弃空调机内的铝制冷凝器盘管——这些曾经受纽约市风吹日晒的制冷设备内部部件——创作了雕塑作品。"
      },
      {
        "en": "As the press release puts it, they’re “more photographs than ready-mades,” as they process passing time by accumulating dust particles.",
        "cn": "正如新闻稿所言，这些作品“与其说是现成品，不如说是摄影作品”，它们通过积聚灰尘颗粒来展现流逝的时间。"
      },
      {
        "en": "But of course, there were painting shows to see as well.",
        "cn": "当然，还有一些画展值得一看。"
      },
      {
        "en": "Herman Cherry, the late Abstract Expressionist painter who was brought into The Club in the 1950s by Philip Guston, has works looking fresh as ever at Sebastian Gladstone.",
        "cn": "已故的抽象表现主义画家赫尔曼·切里（Herman Cherry）于1950年代由菲利普·古斯顿（Philip Guston）引荐加入“俱乐部”（The Club），其作品在塞巴斯蒂安·格拉德斯通画廊（Sebastian Gladstone）展出时，依然显得鲜活如初。"
      },
      {
        "en": "I was very intrigued by Mia Goldstein’s paintings—paintings of paintings, really, on view at The Journal Gallery.",
        "cn": "米娅·戈尔茨坦的画作让我着实着迷——说白了，那是在《The Journal》画廊展出的“画中画”。"
      },
      {
        "en": "Claire Oswalt had an opening at Broadway Gallery.",
        "cn": "克莱尔·奥斯瓦尔特在百老汇画廊举办了开幕展。"
      },
      {
        "en": "Alexander Gray had an expansive survey of Melvin Edwards, who died earlier this year.",
        "cn": "亚历山大·格雷曾举办过一场规模宏大的梅尔文·爱德华兹回顾展，后者于今年早些时候去世。"
      },
      {
        "en": "I was most delighted by the Carroll Dunham show at Matthew Brown, a suite of new paintings where Dunham fully bets on himself—making some of his most out-there but oddly endearing work.",
        "cn": "马修·布朗画廊举办的卡罗尔·邓汉姆个展让我欣喜不已。这组新作中，邓汉姆完全放手一搏——创作出了一些他最天马行空却又奇妙地令人喜爱作品。"
      },
      {
        "en": "Word is that several have been snapped up by big institutions, as they should be.",
        "cn": "据说其中几家已被大型机构抢购一空，这也理所应当。"
      },
      {
        "en": "It still felt strange to see such a show in Tribeca rather than Chelsea, where so many canonical painting exhibitions have been staged in the last 30 years.",
        "cn": "在翠贝卡而非切尔西看到这样的展览，总让人觉得有些奇怪——毕竟过去30年来，切尔西举办过如此多的经典绘画展。"
      },
      {
        "en": "In the back of the gallery, where a bunch of absolutely insane Dunham works on paper hung salon-style on the walls, Brown conceded that a show of such scale and historical oomph could have fit at a Chelsea gallery—but it’s also inspiring to him that this neighborhood is ready for a big Carroll Dunham show.",
        "cn": "在画廊的后方，一堆绝对疯狂的卡罗尔·邓汉姆纸上作品以沙龙式风格悬挂在墙上。布朗承认，这样规模宏大且极具历史分量的展览本可以放在切尔西的画廊里举办——但这个街区已经准备好举办一场大型的卡罗尔·邓汉姆展览，这一点也让他深受鼓舞。"
      },
      {
        "en": "Brown also hosted a dinner for Dunham at Il Buco Alimentari, Donna Leonard’s offshoot of the beloved Bond Street Il Buco.",
        "cn": "布朗还在“Il Buco Alimentari”为邓纳姆举办了一场晚宴，这家餐厅是唐娜·伦纳德在备受喜爱的邦德街“Il Buco”餐厅基础上开设的分店。"
      },
      {
        "en": "An entire generation of artists circulated through the restaurant’s two stories: Dana Schutz and Ryan Johnson, Huma Bhabha, Joe Bradley and Valentina Akerman, Mel Kendrick, Louise Lawler, Alexis Rockman, Amy Sillman.",
        "cn": "整整一代艺术家都曾在这家餐厅的两层楼里穿梭往来：达娜·舒茨和瑞安·约翰逊、胡玛·巴布哈、乔·布拉德利和瓦伦蒂娜·阿克曼、梅尔·肯德里克、路易丝·劳勒、亚历克西斯·罗克曼、艾米·西尔曼。"
      },
      {
        "en": "Of course, the artist Laurie Simmons, Dunham’s wife, was there, along with their children, Lena and Cyrus.",
        "cn": "当然，艺术家劳里·西蒙斯——邓汉姆的妻子——也出席了活动，他们的孩子莉娜和赛勒斯也一同到场。"
      },
      {
        "en": "Jerry Saltz went looking for pizza and found it, while Roberta Smith sat at a table with former New Museum director Lisa Phillips.",
        "cn": "杰里·萨尔茨去寻找披萨，结果找到了；而罗伯塔·史密斯则与新博物馆前馆长丽莎·菲利普斯同桌而坐。"
      },
      {
        "en": "Later, Phillips told me about the show she curated at her old stomping grounds on the Bowery—a show about the Bowery.",
        "cn": "后来，菲利普斯向我讲述了她在鲍威里老据点策划的那场展览——一场以鲍威里为主题的展览。"
      },
      {
        "en": "Along with the legends was a new generation of artists, including Unrau, Alessi, Ohad Meromi, and a number of artists from Brown’s stable: Uri Aran, Olivia van Kuiken, Blair Whiteford.",
        "cn": "与这些传奇人物一同崭露头角的，还有新一代艺术家，包括乌恩劳（Unrau）、阿莱西（Alessi）、奥哈德·梅罗米（Ohad Meromi），以及布朗旗下的一批艺术家：乌里·阿兰（Uri Aran）、奥利维亚·范·库伊肯（Olivia van Kuiken）、布莱尔·怀特福德（Blair Whiteford）。"
      },
      {
        "en": "Dinner ended, but no one really said goodbye.",
        "cn": "晚餐结束了，但没人真正道别。"
      },
      {
        "en": "Despite the Tribeca takeover, everyone was planning to storm Chelsea for another set of openings on Thursday.",
        "cn": "尽管翠贝卡活动已经开始，大家还是计划在周四蜂拥前往切尔西，参加另一场开幕活动。"
      }
    ]
  },
  {
    "id": "st-the-best-emmy-awards-dresses-of-all-time",
    "cat": "明星",
    "title": "The Best Emmy Awards Dresses of All Time",
    "titleZh": "艾美奖史上最美的礼服",
    "source": "Vanity Fair · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 2,
    "url": "https://www.vanityfair.com/photos/best-emmys-dresses-in-history",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/st-the-best-emmy-awards-dresses-of-all-time.jpg",
    "paras": [
      {
        "en": "At the Emmy Awards, the stars of television’s small screen often come wearing some big dresses.",
        "cn": "在艾美奖颁奖典礼上，电视荧屏上的明星们常常身着华丽的礼服亮相。"
      },
      {
        "en": "In the 1950s and ’60s, celebrities like Lucille Ball arrived on red carpets at LA landmarks like the Paul R.",
        "cn": "在20世纪50年代和60年代，露西尔·鲍尔等名人曾现身于洛杉矶地标建筑——如保罗·R.——的红毯上。"
      },
      {
        "en": "Williams –designed Ambassador Hotel or the Hollywood Palladium in custom gowns by their studio’s costume designers or other private high-end dressmakers.",
        "cn": "无论是威廉姆斯设计的“大使酒店”，还是好莱坞帕拉迪姆剧院，她们身着由其工作室的服装设计师或其他私人高端裁缝量身定制的礼服。"
      },
      {
        "en": "Come the 2000s, nearly every major European fashion house is clamoring to style the year’s nominees…and send out a press release as well as an Instagram post once they do.",
        "cn": "进入21世纪后，几乎每一家欧洲大型时装屋都争先恐后地为当年的提名者打造造型……一旦完成，便会发布新闻稿并在Instagram上发帖。"
      },
      {
        "en": "So out of a sea of stylish looks, which dresses stand out as some of the best in Emmys history?",
        "cn": "那么，在众多时尚造型中，哪些礼服堪称艾美奖历史上最出色的代表？"
      },
      {
        "en": "There’s Ball in the height of ’60s glamour in a feather caftan, and Jane Seymour in an oh-so-’80s sequined gown, which she wore when winning outstanding supporting actress in a miniseries for Onassis: The Richest Man in the World.",
        "cn": "鲍尔身着一件羽毛长袍，尽显60年代的迷人风采；而简·西摩则身着一件极具80年代风格的亮片礼服——她正是穿着这件礼服，凭借《奥纳西斯：世界首富》一剧荣获迷你剧类最佳女配角奖。"
      },
      {
        "en": "In the ’90s and early 2000s, Sarah Jessica Parker cemented herself as a bona fide fashion darling, wearing looks from designers like Oscar de La Renta and Chanel.",
        "cn": "在90年代和21世纪初，莎拉·杰西卡·帕克凭借身着奥斯卡·德拉伦塔和香奈儿等设计师品牌的造型，确立了自己作为当之无愧的时尚宠儿的地位。"
      },
      {
        "en": "And in recent years, celebrities like Zendaya and Anya Taylor-Joy have embraced full European couture, trains and all.",
        "cn": "近年来，赞达亚和安雅·泰勒-乔伊等明星纷纷穿上了完整的欧洲高级定制礼服，连拖尾也不例外。"
      },
      {
        "en": "Then there are the risk-takers.",
        "cn": "还有那些敢于冒险的人。"
      },
      {
        "en": "Aubrey Plaza dared to don Loewe’s Post-it note dress.",
        "cn": "奥布里·普拉扎大胆地穿上了Loewe的便利贴连衣裙。"
      },
      {
        "en": "Emma Corrin wore a delightfully bizarre Miu Miu ensemble in 2021.",
        "cn": "2021年，艾玛·科林身着一套妙趣横生又略显奇特的Miu Miu套装。"
      },
      {
        "en": "Kiernan Shipka, meanwhile, eschewed a ball gown for a Dior Couture minidress worn over a pair of black pants—an even bolder choice when you consider the Mad Men star was only 15 years old.",
        "cn": "与此同时，基尔南·希普卡没有选择礼服，而是身着迪奥高定（Dior Couture）迷你连衣裙，内搭一条黑色长裤——考虑到这位《广告狂人》女星当时才15岁，这一选择显得尤为大胆。"
      },
      {
        "en": "Ahead of the 2026 Emmy Awards, here are the best dresses in Emmys history.",
        "cn": "在2026年艾美奖颁奖典礼即将举行之际，以下是艾美奖历史上最精彩的礼服。"
      }
    ]
  },
  {
    "id": "st-salma-hayek-pinault-paris-hilton-and-simone-bi",
    "cat": "明星",
    "title": "Salma Hayek Pinault, Paris Hilton, and Simone Biles Brought the Party to Kering’s Caring for Women Dinner",
    "titleZh": "萨尔玛·海耶克·皮诺，帕丽斯·希尔顿和西蒙娜·拜尔斯为开云集团的“关爱女性”晚宴增添了热闹氛围",
    "source": "Vanity Fair · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 9,
    "url": "https://www.vanityfair.com/story/salma-hayek-pinault-paris-hilton-simone-biles-kering-foundation-dinner",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/st-salma-hayek-pinault-paris-hilton-and-simone-bi.jpg",
    "paras": [
      {
        "en": "Colman Domingo, Pamela Anderson, Simone Biles, and more A-listers gathered under the glow of natural candlelight for an extravagant dinner at The Pool in Manhattan on Thursday, united for an evening to end violence against women and children.",
        "cn": "周四，科尔曼·多明戈、帕梅拉·安德森、西蒙娜·拜尔斯等众多一线明星齐聚曼哈顿的“The Pool”餐厅，在自然烛光映照下共进了一场盛大的晚宴，齐心协力呼吁终结针对妇女和儿童的暴力行为。"
      },
      {
        "en": "Salma Hayek Pinault has hosted the Kering Foundation’s Caring for Women dinner with her husband, Francois-Henri Pinault, since 2022.",
        "cn": "自2022年以来，萨尔玛·海耶克·皮诺一直与丈夫弗朗索瓦-亨利·皮诺共同主持开云基金会举办的“关爱女性”晚宴。"
      },
      {
        "en": "This year, the duo celebrated an important milestone: five years of bringing together high-profile stars from fashion, entertainment, art, and philanthropy to spotlight mission-driven organizations.",
        "cn": "今年，这对搭档迎来了一个重要的里程碑：五年来，他们一直致力于汇聚时尚、娱乐、艺术和慈善界的名流，以聚焦那些以使命为导向的组织。"
      },
      {
        "en": "“They do the work,” Hayek Pinault told VF about the foundations highlighted at the dinner that raised more than $5 million.",
        "cn": "“是他们付出了努力，”海耶克·皮诺在接受《VF》杂志采访时谈到，在此次筹款晚宴上受到关注的慈善基金会共筹集了超过500万美元。"
      },
      {
        "en": "“Awareness is important, but I really think it’s a little boring.",
        "cn": "“提高意识固然重要，但我真的觉得这有点无聊。”"
      },
      {
        "en": "You gotta do something, you know?",
        "cn": "你得做点什么，懂吗？"
      },
      {
        "en": "An endless stream of stars joined her at the historic restaurant for the dinner— Benicio Del Toro, Paris Hilton, Rita Ora, Alex Consani, Camila Morrone, Julianne Moore, Dakota Johnson, and Martha Stewart.",
        "cn": "众多明星纷至沓来，与她一同在这家历史悠久的餐厅共进晚餐——贝尼西奥·德尔·托罗、帕丽斯·希尔顿、丽塔·奥拉、亚历克斯·康萨尼、卡米拉·莫罗内、朱丽安·摩尔、达科塔·约翰逊和玛莎·斯图尔特。"
      },
      {
        "en": "Domingo sipped a Tommy’s Margarita while he prepared to host the dinner.",
        "cn": "多明戈一边小口抿着一杯“汤米”玛格丽特，一边准备主持晚宴。"
      },
      {
        "en": "“Last time I sat next to Diane von Furstenberg, and I thought I was in a dream the entire time because she really is that legend,” he told VF.",
        "cn": "“上次我坐在黛安·冯芙丝汀伯格旁边，当时感觉整个过程就像在做梦一样，因为她确实是位传奇人物，”他告诉《VF》杂志。"
      },
      {
        "en": "Domingo said that the event was especially impactful during New York Fashion Week, when a lot of eyes are on the fashion and entertainment industry.",
        "cn": "多明戈表示，在纽约时装周期间，当时尚和娱乐行业备受瞩目时，这场活动的影响尤为深远。"
      },
      {
        "en": "“This room is very important because people leave their legacy and what they do behind,” he said.",
        "cn": "“这个房间非常重要，因为人们会在这里留下自己的遗产和生平事迹，”他说。"
      },
      {
        "img": "assets/covers/st-salma-hayek-pinault-paris-hilton-and-simone-bi-3.jpg",
        "cap": ""
      },
      {
        "en": "As 1920s-esque jazz hits wafted from the speakers—including, ironically enough, Sweet Charity ’s “Hey, Big Spender”—Moore entered in an off-the-shoulder black gown with a feathery draping skirt.",
        "cn": "当扬声器中飘出20世纪20年代风格的爵士乐金曲——其中颇具讽刺意味的是，还包括《甜心慈善家》中的《嘿，大花钱》——摩尔身着一件露肩黑色长裙，裙摆如羽毛般垂坠，款款走入现场。"
      },
      {
        "en": "Consani, too, sported feathers—a striking cobalt blue feathered gown by Gucci.",
        "cn": "康萨尼也身着羽毛装——一件由古驰设计的醒目的钴蓝色羽毛长裙。"
      },
      {
        "en": "Biles was also struggling with her outfit, a strapless black gown with opera gloves to match.",
        "cn": "拜尔斯还对自己的这身装扮有些不适应——那是一件无肩带的黑色长礼服，搭配了相配的歌剧手套。"
      },
      {
        "en": "At only four feet eight, she was tripping.",
        "cn": "她只有四英尺八英寸高，走路时总是绊倒。"
      },
      {
        "en": "“I should literally just wear a shorter dress,” she said.",
        "cn": "“我真的应该穿一条更短的裙子，”她说。"
      },
      {
        "en": "As the cohosts slipped away from the cocktail hour to pose for photos in another, quieter back room, guests began to mingle.",
        "cn": "当两位联合主持人悄悄离开鸡尾酒会现场，前往另一间更安静的后厅拍照时，宾客们开始互相寒暄。"
      },
      {
        "en": "Biles was quickly approached by Paris Hilton’s husband Carter Reum and invited to a house party.",
        "cn": "巴黎·希尔顿的丈夫卡特·鲁姆很快上前搭话，邀请拜尔斯参加一场家庭派对。"
      },
      {
        "en": "“We opened a 10,000-square-foot longevity center in our house,” he said, which has been drawing athletes to come by.",
        "cn": "“我们在自家开设了一家面积为10,000平方英尺的长寿中心，”他说，这处中心一直吸引着运动员前来。"
      },
      {
        "en": "He took Biles’s agent’s phone and said he’d enter his name as “Paris Hilton’s husband.”",
        "cn": "他拿过拜尔斯的经纪人的手机，说要把自己的名字填成“帕丽斯·希尔顿的丈夫”。"
      },
      {
        "en": "(Biles admitted to VF that she had “no idea” what a longevity center was: “I need to google it.”)",
        "cn": "（拜尔斯向《VF》杂志坦言，她“完全不知道”长寿中心是什么：“我得去谷歌搜一下。”）"
      },
      {
        "en": "Biles, who was attending the event for the first time, said she was excited to be in a room of powerful women.",
        "cn": "首次出席该活动的拜尔斯表示，能置身于一群杰出女性之中，她感到非常兴奋。"
      },
      {
        "en": "“Parasocially, you know [the guests].",
        "cn": "“从社交角度来说，你认识[这些客人]。”"
      },
      {
        "en": "But I’m meeting them in person, some of them for the first time, and it’s always exciting because I feel like we come from so many different worlds and backgrounds.”",
        "cn": "“但我会亲自与他们见面，其中有些人还是第一次见面，这总是让人兴奋，因为我觉得我们来自如此不同的世界和背景。”"
      },
      {
        "en": "Hilton was especially eager for what followed the dinner—she would, in fact, be DJ’ing at the event’s first after-party.",
        "cn": "希尔顿对晚宴之后的活动尤为期待——事实上，她将在本次活动的首场派对上担任DJ。"
      },
      {
        "en": "“I’m just excited to see all my friends and just all to be here for such an amazing cause to support women.",
        "cn": "“我只是很高兴能见到所有朋友，而且大家都能齐聚一堂，为这样一项支持女性的伟大事业贡献力量。”"
      },
      {
        "en": "It’s so important,” she told VF.",
        "cn": "“这太重要了，”她对《VF》杂志说道。"
      },
      {
        "en": "“It’s a thing that I do all the time.”",
        "cn": "“这是我经常做的一件事。”"
      },
      {
        "en": "After a sampling of crab cakes, crunchy yellowfin tuna, and plenty of Champagne, the guests milled into a larger atrium where the dinner kicked off.",
        "cn": "品尝了蟹肉饼、香脆的黄鳍金枪鱼和大量香槟后，宾客们纷纷涌入一个更大的中庭，晚宴就在那里拉开帷幕。"
      },
      {
        "en": "Pinault launched the Kering Foundation in the mid-2000s as the philanthropic arm of Kering, the luxury holding company that owns fashion houses like Gucci, Saint Laurent, and Balenciaga.",
        "cn": "皮诺于2000年代中期创立了开云基金会，作为奢侈品控股公司开云的慈善机构，该集团旗下拥有古驰、圣罗兰和巴宝莉等时尚品牌。"
      },
      {
        "en": "The foundation operates in the UK, US, France, Italy, Mexico, and South Korea to end intergenerational gender-based violence and childhood sexual violence.",
        "cn": "该基金会在英国、美国、法国、意大利、墨西哥和韩国开展工作，致力于消除代际性别暴力和针对儿童的性暴力。"
      },
      {
        "en": "“When you have Simone Biles, when you have Pamela Anderson, Dakota Johnson, being there and with their name fully associated with the cause of fighting violence against women, it makes a difference,” Pinault told VF in advance of the event.",
        "cn": "“当西蒙娜·拜尔斯、帕梅拉·安德森和达科塔·约翰逊亲临现场，并将自己的名字与反对针对妇女的暴力这一事业紧密联系在一起时，这确实能产生影响，”皮诺在活动开始前对《VF》杂志说道。"
      },
      {
        "img": "assets/covers/st-salma-hayek-pinault-paris-hilton-and-simone-bi-4.jpg",
        "cap": ""
      },
      {
        "en": "“When we started [the foundation] back in 2007, the situation was different.",
        "cn": "“2007年我们刚成立[该基金会]时，情况还不一样。"
      },
      {
        "en": "But not that the situation was easier.",
        "cn": "但这并不意味着情况就轻松了。"
      },
      {
        "en": "No one was talking about that, to be honest,” Pinault said about his focus on gender-based violence.",
        "cn": "“说实话，当时没人谈论这个，”皮诺在谈到自己对基于性别的暴力问题的关注时说道。"
      },
      {
        "en": "“What drove me to choose that cause for the group was that it was taboo.",
        "cn": "“促使我为这个团体选择那个事业的原因，正是因为它属于禁忌话题。”"
      },
      {
        "en": "And thanks to Salma I was discovering the reality of the situation.”",
        "cn": "“多亏了萨尔玛，我才逐渐看清了事情的真相。”"
      },
      {
        "en": "Pinault said new challenges are emerging, particularly on social media.",
        "cn": "皮诺表示，新的挑战正在涌现，特别是在社交媒体上。"
      },
      {
        "en": "“What’s happening online in terms of violence on women, it’s crazy,” he said, later adding in his speech that one in three women and girls will experience physical or sexual violence in their lifetimes.",
        "cn": "“网络上针对妇女的暴力行为简直令人发指，”他说，并在随后的演讲中补充道，每三名妇女和女童中就有一人在一生中会遭遇身体或性暴力。"
      },
      {
        "en": "“Over the past year, we have seen a dramatic rise in gender-based violence enabled by technology,” he told the crowd.",
        "cn": "“过去一年里，我们看到借助技术手段实施的基于性别的暴力事件急剧增加，”他对在场人群说道。"
      },
      {
        "en": "“This can lead men, especially young men, to believe that misogyny is simply part of manhood.",
        "cn": "“这可能会让男性，尤其是年轻男性，认为厌女症不过是男子气概的一部分。"
      },
      {
        "en": "This, too, cannot become the new normal.”",
        "cn": "“这同样也不能成为‘新常态’。”"
      },
      {
        "en": "The 2026 honorees were Activating Change, a nonprofit aimed at ending violence against deaf people and individuals with disabilities; Fondo Semillas, a Mexican feminist nonprofit organization; the New York Women’s Foundation, a grant-making organization that invests in community-led solutions; and JBWS,",
        "cn": "2026年的获奖机构包括：致力于消除针对聋人和残障人士的暴力的非营利组织“Activating Change”；墨西哥的女权非营利组织“Fondo Semillas”；致力于投资社区主导解决方案的资助机构“纽约妇女基金会”；以及JBWS，"
      },
      {
        "en": "a New Jersey–based nonprofit countering domestic violence (“I feel like I’ve been in a dream from the time I got the call,” Diane Williams, the president and CEO, told VF.",
        "cn": "一家总部位于新泽西州的致力于打击家庭暴力的非营利组织（“从接到电话的那一刻起，我就感觉自己仿佛置身梦中，”该组织总裁兼首席执行官黛安·威廉姆斯对《VF》杂志说道。）"
      },
      {
        "en": "Other attendees included Tarana Burke, who started the MeToo movement in 2006 before it became a viral hashtag in 2017.",
        "cn": "其他与会者还包括塔拉娜·伯克，她于2006年发起了“MeToo”运动，该运动在2017年成为风靡一时的网络话题标签。"
      },
      {
        "en": "“The real question is not what MeToo has done.",
        "cn": "“真正的问题并不在于‘MeToo’运动带来了什么。"
      },
      {
        "en": "It’s what MeToo has made possible, and that’s a very different framing,” she said.",
        "cn": "“正是‘我也是’运动让这一切成为可能，而这是一种截然不同的叙事框架，”她说。"
      },
      {
        "en": "It doesn’t feel good every day.",
        "cn": "并不是每天都感觉很好。"
      },
      {
        "en": "It feels like the world is on fire.",
        "cn": "感觉整个世界都像着了火似的。"
      },
      {
        "en": "But I’m really clear that we are in this moment because we are winning.”",
        "cn": "“但我非常清楚，我们之所以能走到今天这一步，是因为我们正在取得胜利。”"
      },
      {
        "en": "Pinault took a moment to honor Gloria Steinem, who died earlier this month.",
        "cn": "皮诺特特意花了一点时间，向本月早些时候去世的格洛丽亚·斯泰纳姆致敬。"
      },
      {
        "en": "She was a cohost during the very first gala, he said.",
        "cn": "他说，她在首届晚会上担任了联合主持人。"
      },
      {
        "en": "After an array of heartfelt speeches, guests enjoyed a three-course meal complete with steak, buttery garlic rolls, roasted potatoes, and petit fours for dessert.",
        "cn": "在一系列发自肺腑的致辞之后，宾客们享用了一顿三道菜的晚餐，包括牛排、黄油蒜香面包卷、烤土豆，以及作为甜点的迷你点心。"
      },
      {
        "en": "To further support the cause, a slew of wine-merry guests began bidding on the lots from the auction—including $165,000 for three collages from Lorna Simpson, who met Hayek Pinault earlier that spring (“she’s just an amazing, magnetic, fascinating person,” Simpson told VF ).",
        "cn": "为了进一步支持这项事业，一大批兴致高昂的宾客开始竞拍拍卖会上的拍品——其中包括以16.5万美元拍下的三幅洛娜·辛普森的拼贴画，她早在当年的早春就曾与海耶克·皮诺会面（“她真是个了不起、极具魅力且引人入胜的人，”辛普森对《Vogue》杂志说道）。"
      },
      {
        "en": "Other auction items included a $45,000 two-hour weeknight journey at Dataland, the first museum of AI images.",
        "cn": "其他拍卖品还包括在“数据乐园”（Dataland）——首家人工智能图像博物馆——进行的一次为期两小时的周中夜间之旅，价格为45,000美元。"
      },
      {
        "en": "A computer-generated painting—in which the biometric signals of attendees would be translated into brushstrokes—was included in the package.",
        "cn": "该套装中还包含一幅计算机生成的画作——其中，参与者的生物特征信号会被转化为笔触。"
      },
      {
        "en": "A palmetto diamond necklace sold for $130,000 (“I feel like you jumped into the 100s, so that can’t be the only gas in the tank,” the auctioneer joked to one of the highest bidders).",
        "cn": "一条棕榈树钻石项链以13万美元成交（“我觉得你直接跳到了10万美元以上，所以这肯定不是你唯一的底气，”拍卖师对其中一位最高出价者开玩笑说）。"
      },
      {
        "en": "Polo player Nacho Figueras got onstage with the auctioneer to convince people to bid on his lot—time spent at his luxury Argentina horse stables.",
        "cn": "马球运动员纳乔·菲格拉斯与拍卖师一同登台，劝说大家竞拍他的拍品——在阿根廷他那座豪华马厩中度过的一段时光。"
      },
      {
        "en": "As the crowd started bidding, Hayek Pinault began to yell: “Go get those horses!”",
        "cn": "随着人群开始竞拍，海耶克·皮诺开始大喊：“去把那些马弄来！”"
      },
      {
        "en": "After the dinner, guests strode onto the dance floor for a performance by Rita Ora, who had changed into a glimmering white dress and massive diamond earrings that hung like little chandeliers.",
        "cn": "晚宴结束后，宾客们大步走向舞池，欣赏丽塔·奥拉的表演。此时她已换上一袭闪闪发光的白色礼服，耳畔佩戴着巨大的钻石耳环，宛如小巧的枝形吊灯般垂落。"
      },
      {
        "en": "She started the concert with her own rendition of “I Am Woman.”",
        "cn": "她以一曲自创版本的《I Am Woman》拉开了演唱会的序幕。"
      },
      {
        "en": "Soon, Hilton—complete with bedazzled black headphones, sunglasses, and a thick diamond choker—started DJ’ing.",
        "cn": "不久，希尔顿——戴着镶满亮片的黑色耳机、墨镜，还戴着一条粗大的钻石项圈——开始打碟了。"
      },
      {
        "en": "Hayek Pinault jumped up to the DJ booth to dance, swinging her hands up high while Timbaland’s “Give It to Me” blasted through the speakers.",
        "cn": "当蒂姆巴兰德的《Give It to Me》从扬声器中震耳欲聋地响起时，海耶克·皮诺特一跃跳上DJ台开始跳舞，双手高高挥舞。"
      }
    ]
  },
  {
    "id": "st-the-original-practical-magic-director-griffin-",
    "cat": "明星",
    "title": "The Original ‘Practical Magic’ Director, Griffin Dunne, Shares How His Personal Tragedy Influenced the Film",
    "titleZh": "原版《魔法奇缘》导演格里芬·邓恩讲述个人悲剧如何影响了这部电影",
    "source": "Vanity Fair · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 12,
    "url": "https://www.vanityfair.com/story/practical-magic-griffin-dunne-private-tragedy",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/st-the-original-practical-magic-director-griffin-.jpg",
    "paras": [
      {
        "en": "At some point in the 1990s, the owners and corporate sponsors of One Times Square, the triangular skyscraper famous for its New Year’s Eve ball drop atop the giddy duo of Andy Cohen and Anderson Cooper, recognized that their location caught the eye of nearly every pedestrian below.",
        "cn": "20世纪90年代的某个时候，“时代广场一号”（One Times Square）的业主和企业赞助商们意识到，这座以新年除夕夜在安迪·科恩和安德森·库珀这对令人眼花缭乱的搭档头顶上进行的“降球”仪式而闻名的三角形摩天大楼，其地理位置吸引了下方几乎每一位行人的目光。"
      },
      {
        "en": "There, they erected one of the first computer-controlled LED billboards to promote everything from cars and fashion designers to albums and Hollywood blockbusters.",
        "cn": "在那里，他们竖起了一块最早的计算机控制的LED广告牌之一，用于宣传从汽车、时装设计师到专辑以及好莱坞大片等各类内容。"
      },
      {
        "en": "Having a studio pay an exorbitant fee for 30 seconds on a 25-story billboard made of 8,692 pixels meant that the studio believed in whatever movie they were hawking.",
        "cn": "一家制片公司愿意为在由8,692个像素组成的25层楼高广告牌上投放30秒广告支付高昂费用，这说明该制片公司对他们正在宣传的电影充满信心。"
      },
      {
        "en": "It’s a filmmaker’s dream to imagine their work lit up sky-high, illuminating one of the world’s most famous intersections.",
        "cn": "对于电影人来说，想象自己的作品高悬天际，照亮世界上最著名的十字路口之一，这无疑是他们的梦想。"
      },
      {
        "img": "assets/covers/st-the-original-practical-magic-director-griffin--2.jpg",
        "cap": ""
      },
      {
        "en": "The other day, hoofing it to the Brill Building from the R stop, I saw, on an even bigger LED screen, a digital poster for Practical Magic —same artwork, same font, same cast, only this time there was a huge-ass “2” behind it.",
        "cn": "前几天，我从R线车站步行前往布里尔大厦时，看到一块更大的LED屏幕上播放着《魔法奇缘》的电子海报——画面、字体和演员阵容都和之前一模一样，只是这次海报后面多了一个超大的“2”。"
      },
      {
        "en": "This conjured, dare I say, a “spell” of memories from the time I spent bringing Alice Hoffman ’s magical novel to life.",
        "cn": "这让我回想起——如果可以这么说的话——一段“魔幻”般的回忆，那是我将爱丽丝·霍夫曼那部充满魔力的小说搬上银幕时所经历的时光。"
      },
      {
        "en": "Since “magic” was in the title of Robin Swicord’s script, I expected to hate it as well.",
        "cn": "既然罗宾·斯威科德的剧本标题里有“魔法”二字，我本以为自己也会讨厌这部剧本。"
      },
      {
        "en": "My loathing for top hats and concealed rabbits started when a magician at my birthday party called on me to participate in a card trick.",
        "cn": "我对高顶礼帽和藏在帽子里的小兔子的厌恶，始于我生日派对上，一位魔术师邀请我参与一个纸牌魔术。"
      },
      {
        "en": "I couldn’t follow his instructions and ruined his bit, only to be laughed at mercilessly by the other kids.",
        "cn": "我没能照他的吩咐去做，搞砸了他的表演，结果被其他孩子嘲笑得体无完肤。"
      },
      {
        "en": "Ever since, witches, wizards, and dragons have bored me silly.",
        "cn": "从那以后，女巫、巫师和龙就让我觉得无聊透顶。"
      },
      {
        "en": "But Sandy Bullock was attached, and possibly Nicole Kidman, so I gave Swicord’s script and Hoffman’s book two serious reads to find a way into a story that might speak to me.",
        "cn": "但桑迪·布洛克已确定参演，妮可·基德曼可能也会加盟，所以我认真通读了两遍斯维科德的剧本和霍夫曼的原著，希望能找到切入点，让这个故事打动我。"
      },
      {
        "img": "assets/covers/st-the-original-practical-magic-director-griffin--3.jpg",
        "cap": ""
      },
      {
        "en": "The idea of hanging with Sandy was almost motivation enough.",
        "cn": "光是能和桑迪一起玩这个想法，就几乎足以成为动力了。"
      },
      {
        "en": "Apparently, it was her idea that I direct.",
        "cn": "显然，让我来执导是她的主意。"
      },
      {
        "en": "We’d hit it off at a Sundance party, and she’d seen my short film that premiered there.",
        "cn": "我们在圣丹斯电影节的一场派对上一见如故，而且她看过我在那里首映的短片。"
      },
      {
        "en": "Later, I would fly to London to meet Nicole on one of her rare days off from shooting Stanley Kubrick’s Eyes Wide Shut.",
        "cn": "后来，我飞往伦敦，趁妮可拍摄斯坦利·库布里克的《大开眼界》期间难得的休息日之一，与她见面。"
      },
      {
        "en": "Instead of pitching my take on Practical Magic, I used our time to interrogate her about working with Kubrick.",
        "cn": "我没有谈论自己对《魔法奇缘》的看法，而是利用这段时间向她详细询问了与库布里克合作的情况。"
      },
      {
        "en": "After our lunch, I gave Nic a chaste kiss on the cheek before she stepped into a waiting car, both of us unaware that paparazzi were lurking.",
        "cn": "午餐结束后，我在妮可的脸颊上轻轻吻了一下，随后她便走上了等候的汽车，当时我们俩都不知道有狗仔队正潜伏在附近。"
      },
      {
        "en": "The next morning, one of the British tabloids had a grainy shot of me leaning into Nic’s face for what looked like a real make-out session, under a headline blaring something like, “Who is This Cad Nicole Is Cheating on Tom Cruise With?”",
        "cn": "第二天早上，一家英国小报刊登了一张我俯身凑近尼克脸庞、看起来像是在热吻的模糊照片，标题赫然写着：“妮可背着汤姆·克鲁斯出轨的这个渣男是谁？”"
      },
      {
        "img": "assets/covers/st-the-original-practical-magic-director-griffin--4.jpg",
        "cap": ""
      },
      {
        "en": "On my second, more in-depth reading of Hoffman’s novel, I found certain themes that ran parallel to my life story, themes I might have understood more than most, which became my gateway to embracing the unpredictable, terrifying, and wondrous belief in magic.",
        "cn": "在第二次更深入地阅读霍夫曼的小说时，我发现其中某些主题与我的生活经历相呼应，这些主题或许比常人更能引起我的共鸣，也正是这些主题，让我得以拥抱那种充满不可预测性、令人恐惧却又充满奇迹的对魔法的信仰。"
      },
      {
        "en": "The most glaring comparison I originally overlooked was a throughline of trauma that haunted three generations of Owens women.",
        "cn": "我最初忽略了最显而易见的对比，那就是那条贯穿三代欧文斯女性、如影随形的创伤主线。"
      },
      {
        "en": "From grandmother to grandchild, these three sets of two sisters were powerful characters possessed with passion, willfulness, bravery, and devotion to each other.",
        "cn": "从祖母到孙女，这三对姐妹都性格鲜明，充满激情、倔强、勇敢，并且彼此深情相守。"
      },
      {
        "en": "Powerful women raised me, and my mother raised a fearless daughter.",
        "cn": "是那些坚强的女性将我养育成人，而我的母亲则养育了一个无所畏惧的女儿。"
      },
      {
        "en": "My grandmother was from Mexican aristocracy, and her passion drove her to ditch her fiancé at the altar to marry my gringo grandad across the border.",
        "cn": "我的祖母出身于墨西哥贵族家庭，正是这份激情促使她在婚礼仪式上抛下未婚夫，越过边境嫁给了我的“格林戈”祖父。"
      },
      {
        "en": "She was a tough old bird who’d been stung by scorpions so many times she was immune to their pain.",
        "cn": "她是个硬气的老娘们，被蝎子蛰过无数次，早已对那种疼痛免疫了。"
      },
      {
        "en": "She raised her only child, my mother, on a cattle ranch in the border town of Nogales, Arizona.",
        "cn": "她在亚利桑那州诺加莱斯这个边境小镇的一个牧场里，抚养了她唯一的女儿——我的母亲。"
      },
      {
        "en": "My mother had a lonely childhood.",
        "cn": "我母亲的童年很孤独。"
      },
      {
        "en": "Her only companions were characters from her favorite books and a collection of Deutsche Grammophon records she begged her father to buy when he was in Tucson.",
        "cn": "她唯一的伴侣，就是她最喜欢的书中的角色，以及一套她曾央求父亲在图森时为她买来的德意志留声机唱片。"
      },
      {
        "en": "Only mariachi music brought her out of her shell, and when I was a child, I remember her singing along to lyrics she knew by heart about sad cowboys and two-timing women.",
        "cn": "只有玛利亚奇音乐才能让她敞开心扉，我记得小时候，她常跟着那些她烂熟于心的歌词哼唱，歌里唱的都是悲伤的牛仔和背叛男人的女人。"
      },
      {
        "en": "Her only daughter, my little sister, was named Dominique, and though she’d never been stung by scorpions, she and her abuela never suffered fools.",
        "cn": "她唯一的女儿，也就是我的妹妹，名叫多米尼克；虽然她从未被蝎子蛰过，但她和她的阿布埃拉从不迁就蠢人。"
      },
      {
        "en": "My sister’s love for family, friends, and animals was intransigent, and her boundless curiosity taught her to master gourmet dishes and the Italian language, and blessed her with an empathy that could detect a suffering soul like a dog whistle only she could hear.",
        "cn": "我姐姐对家人、朋友和动物的爱坚定不移，她那无穷无尽的好奇心不仅让她精通了美食烹饪和意大利语，还赋予了她一种同理心——这种同理心能像只有她才能听见的狗哨一样，敏锐地察觉到受苦的灵魂。"
      },
      {
        "en": "I now find myself a father to a fourth-generation daughter who is as strong-willed, animal-loving, empathetic, and sometimes as intimidating as the three women that came before her.",
        "cn": "如今，我已成为一名父亲，我的女儿是家族中的第四代传人，她意志坚定、热爱动物、富有同理心，有时甚至和她之前的三位女性一样令人望而生畏。"
      },
      {
        "en": "The Owens women discuss at length a “curse” that’s been passed down for centuries.",
        "cn": "欧文斯家的女性们详细讨论了这一流传了几个世纪的“诅咒”。"
      },
      {
        "en": "While mulling my decision to take on the movie, I heard someone on talk radio use the phrase “generational trauma.” It occurred to me that a curse is similar to trauma passed from one generation to the next.",
        "cn": "在权衡是否接拍这部电影时，我听到某档脱口秀广播节目中有人提到“代际创伤”这个词。这让我联想到，诅咒与代代相传的创伤颇为相似。"
      },
      {
        "en": "The women in my family had their share of trauma, though it wasn’t passed in descending order.",
        "cn": "我家族中的女性都经历过各自的创伤，尽管这些创伤并非按父系传承下来。"
      },
      {
        "en": "My mother stopped singing with mariachis when Multiple Sclerosis robbed her of her voice and the use of her legs.",
        "cn": "当多发性硬化症夺走了母亲的嗓音和行走能力后，她便不再与玛丽亚奇乐队一起唱歌了。"
      },
      {
        "en": "My grandmother’s remaining years were spent sick with worry for her and an illogical guilt that she was somehow responsible.",
        "cn": "我祖母晚年一直病恹恹的，既为自己忧心忡忡，又因觉得自己不知为何要为此负责而感到一种不合逻辑的内疚。"
      },
      {
        "en": "She fortunately didn’t live to see what happened to her granddaughter.",
        "cn": "幸运的是，她没活到看到孙女的下场。"
      },
      {
        "en": "What became the ultimate “curse” on our family that mirrored that of Hoffman’s novel was the theme of domestic violence.",
        "cn": "最终成为我们家族“诅咒”的——这与霍夫曼小说中的情节如出一辙——正是家庭暴力这一主题。"
      },
      {
        "en": "On October 30, 1982, Dominique was strangled by an ex-boyfriend she’d broken up with after his first attempt to wrap his fingers around her throat.",
        "cn": "1982年10月30日，多米尼克被一名前男友勒死——此前，当该男子第一次试图用手指掐住她的喉咙时，她便与他分手了。"
      },
      {
        "en": "There was a trial for the killer that resulted in an obscenely light sentence.",
        "cn": "凶手接受了审判，但最终被判处了一项轻得离谱的刑罚。"
      },
      {
        "en": "In my family, it was feared that both the murder and the verdict would hasten my mother’s passing.",
        "cn": "在我家，大家担心这起谋杀案和判决都会加速我母亲的离世。"
      },
      {
        "en": "But like the Owens sisters, she turned tragedy into a form of power, founding an organization called Justice for Homicide Victims that protected the rights of victims and passed legislation that’s now enforced in 25 states.",
        "cn": "但就像欧文斯姐妹一样，她将悲剧转化为一种力量，创立了一个名为“谋杀案受害者正义”的组织，致力于维护受害者的权益，并推动通过了相关立法，该立法目前已在25个州生效。"
      },
      {
        "en": "When it was time to promote a memoir I’d written about my family in 2024, I had never publicly addressed this terrible chapter in our lives, and to my knowledge, neither the cast nor anyone involved with Practical Magic were aware of it.",
        "cn": "2024年，当我开始宣传自己撰写的一部关于家人的回忆录时，我从未公开谈及我们生活中这段可怕的经历，据我所知，《魔法奇缘》的演员以及所有相关人员对此都一无所知。"
      },
      {
        "en": "It wasn’t until I imagined actually filming Jimmy Angelov trying to choke the life out of Gillian Owens—which I thought would mirror my sister’s real-life terror in her last moments, though that didn’t need imagining because I’d already lived with the thought of it for years—that I not only wanted to direct the movie, but needed to.",
        "cn": "直到我设想实际拍摄吉米·安杰洛夫试图掐死吉莉安·欧文斯的情景——我以为这会映射出我姐姐临终时刻真实的恐惧，尽管这其实无需想象，因为我早已与这个念头共处多年——我才意识到，我不仅想执导这部电影，而且必须执导。"
      },
      {
        "en": "I kept it to myself at the time, but the night we shot Gillian’s attack in the back seat of that car—watching Nicole’s surrender to unspeakable fear, her desperate fight to live—remains the most emotionally grueling experience I’ve ever had on a set.",
        "cn": "当时我没对人提起，但在那辆车的后座拍摄吉莉安遭到袭击的那一晚——看着妮可屈服于难以言喻的恐惧，以及她为求生而进行的绝望挣扎——至今仍是我的演艺生涯中在片场经历过的最令人心力交瘁的体验。"
      },
      {
        "en": "Alternatively, the gory scenes of the Owens girls putting needles in Jimmy’s eyes (which the studio made me soften) and burying his corpse in a rose garden, then finally killing him for good, I’ll remember as one of the more satisfying times I’ve spent on a set.",
        "cn": "不过，欧文斯姐妹将针刺入吉米眼睛（这段镜头制片方让我处理得没那么血腥）以及将他的尸体埋在玫瑰园里，最后彻底杀死他的那些血腥场面，却是我在片场度过的最令人满足的时刻之一，至今记忆犹新。"
      },
      {
        "en": "I don’t want to leave the impression I was some haunted director hauling around ghosts from my past.",
        "cn": "我不想给人留下这样的印象，仿佛我是个被过去阴影纠缠的导演，总是把那些往事像幽灵一样拽在身后。"
      },
      {
        "en": "My memories are of silly times with Sandy and Nicole and how much we made each other laugh.",
        "cn": "我记忆中的那些时光，是和桑迪、妮可一起度过的那些傻乎乎的时光，以及我们彼此逗得开怀大笑的情景。"
      },
      {
        "en": "Working with Nic was like driving a Lamborghini that could shift from unbreakable speed to idling like a purring lioness.",
        "cn": "与尼克共事，就像驾驶一辆兰博基尼——它既能以势不可挡的速度疾驰，又能像一只轻声低吼的母狮般平稳怠速。"
      },
      {
        "en": "I’m particularly proud of introducing the Croatian actor Goran Visnjic (known as the “Tom Cruise of Dubrovnik”) to American audiences.",
        "cn": "我特别自豪能将克罗地亚演员戈兰·维斯尼奇（人称“杜布罗夫尼克的汤姆·克鲁斯”）介绍给美国观众。"
      },
      {
        "en": "One of the few liberties I took with Hoffman’s novel was changing Jimmy from a Southern redneck to an Eastern European with a Transylvanian twist.",
        "cn": "我在霍夫曼的小说中做出的为数不多的改动之一，就是把吉米从一个南方乡巴佬改成了一个带有特兰西瓦尼亚色彩的东欧人。"
      },
      {
        "en": "Speaking of Tom Cruise, while shooting outdoors in Friday Harbor, Washington, production came to a halt because a plane kept flying overhead doing endless loop-de-loops.",
        "cn": "说到汤姆·克鲁斯，他在华盛顿州弗里戴港进行户外拍摄时，由于一架飞机不断在头顶盘旋并反复做着翻筋斗，导致拍摄被迫暂停。"
      },
      {
        "en": "Calls were made to the nearest airport to shoo the plane away, until Nicole said shyly, “Oh, that’s just Tom,” her husband at the time, “he’ll tire out soon.” I realized I was watching an aerial version of John Cusack holding up a boombox from Say Anything.",
        "cn": "大家纷纷给最近的机场打电话，想把那架飞机赶走，直到妮可羞涩地说：“哦，那只是汤姆，”她当时的丈夫，“他很快就会累的。”我这才意识到，自己看到的竟是电影《说出你的愿望》中约翰·库萨克高举音响那幕的空中版。"
      },
      {
        "en": "There were two surprising things about Practical Magic.",
        "cn": "《魔法奇缘》有两处令人意外的地方。"
      },
      {
        "en": "One was its lackluster response during its release.",
        "cn": "其中之一是该作品在发布时反响平平。"
      },
      {
        "en": "It depressed me so much that on a flight to New York, when the attendant announced they would be showing it, I sighed audibly, “Just my luck.” The second surprise has been the ever-growing love that generations of audiences have shown for the movie since.",
        "cn": "这让我感到非常沮丧，以至于在飞往纽约的航班上，当空乘人员宣布将播放这部电影时，我忍不住叹了口气：“真是倒霉。”第二个惊喜是，自那以后，几代观众对这部电影的喜爱之情与日俱增。"
      },
      {
        "en": "I hadn’t seen the film in decades until last year, when I rewatched it on a book tour in Australia for a Q&A.",
        "cn": "几十年来我都没看过这部电影，直到去年，我在澳大利亚进行新书巡回宣传时，为了参加一场问答环节，才重新观看了这部电影。"
      },
      {
        "en": "The theater was packed with little girls and women of all ages who had clearly seen the movie many times.",
        "cn": "剧院里挤满了小女孩和各年龄段的女性，她们显然都看过这部电影很多次了。"
      },
      {
        "en": "They yelled back their favorite lines to the screen and danced to “Lime and the Coconut” like it was The Rocky Horror Picture Show.",
        "cn": "他们对着屏幕大声喊出自己最喜欢的台词，还随着《Lime and the Coconut》的旋律翩翩起舞，仿佛置身于《洛基恐怖秀》的现场一般。"
      },
      {
        "en": "It’s a rare moment in one’s career to be part of a movie that has such beloved characters that people demand a sequel to find out what happened to everybody.",
        "cn": "在演艺生涯中，能参与一部拥有如此深受观众喜爱的角色的电影，以至于人们纷纷呼吁拍摄续集来了解大家后来如何了，这实属难得。"
      },
      {
        "en": "Susanne Bier is a masterful director and seems a perfect choice to balance the dark and light tones that audiences are more accepting of in films than when we test-screened the original.",
        "cn": "苏珊娜·比尔是一位技艺精湛的导演，似乎是平衡影片中明暗基调的绝佳人选——与我们当初试映原版时相比，观众如今对这种明暗基调的接受度更高了。"
      },
      {
        "en": "I’ve enjoyed reading the lovely things Sandy has said about working with me.",
        "cn": "我很高兴读到了桑迪对我俩合作所说的那些暖心话。"
      },
      {
        "en": "In fact, the other morning she told The New York Times, “We couldn’t have made the second one if Griffin hadn’t made the first one and set the tone.” What’s as rare as a movie being franchised is people in our business as classy as Sandra.",
        "cn": "事实上，前几天早上她对《纽约时报》说：“如果不是格里芬拍了第一部并奠定了基调，我们就不可能拍出第二部。”像电影能推出系列作品一样罕见的是，我们这个行业里还有像桑德拉这样有风度的人。"
      },
      {
        "en": "I could not be more curious to find out what mischief she and Nicole have brewing 28 years later.",
        "cn": "我实在太好奇了，想知道28年后她和妮可又在策划什么恶作剧。"
      }
    ]
  },
  {
    "id": "ai-mecka-ai-nears-500m-valuation-in-sequoia-led-d",
    "cat": "AI",
    "title": "Mecka AI nears $500M valuation in Sequoia-led deal amid rush for robot training data",
    "titleZh": "在机器人训练数据争夺战愈演愈烈的背景下，Mecka AI 在红杉资本领投的融资中估值逼近5亿美元",
    "source": "TechCrunch AI · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 4,
    "url": "https://techcrunch.com/2026/09/11/mecka-ai-nears-500m-valuation-in-sequoia-led-deal-amid-rush-for-robot-training-data/",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/ai-mecka-ai-nears-500m-valuation-in-sequoia-led-d.jpg",
    "paras": [
      {
        "en": "Mecka AI, a startup that collects and analyzes human motion data to train humanoid robots and other robotics, is nearing a new round led by Sequoia Capital at a valuation of about $500 million, according to two people with knowledge of the deal.",
        "cn": "据两位知情人士透露，初创公司Mecka AI通过收集和分析人体运动数据来训练类人机器人及其他机器人，目前正接近完成由红杉资本领投的新一轮融资，估值约为5亿美元。"
      },
      {
        "en": "The new financing comes just three months after Mecka announced that it raised $60 million in a round led by Framework Ventures that included participation from Menlo Ventures, SV Angel, and Kindred Ventures.",
        "cn": "此次新融资距离Mecka宣布完成由Framework Ventures领投、Menlo Ventures、SV Angel和Kindred Ventures跟投的6000万美元融资仅三个月。"
      },
      {
        "en": "TechCrunch has not learned the precise size of the new round.",
        "cn": "TechCrunch 尚未获悉本轮融资的具体规模。"
      },
      {
        "en": "The terms of the deal are not final and could still change.",
        "cn": "该交易的条款尚未最终确定，仍可能发生变化。"
      },
      {
        "en": "Mecka AI didn’t respond to a request for comment.",
        "cn": "Mecka AI 未就置评请求作出回应。"
      },
      {
        "en": "Mecka AI was co-founded in 2024 by four entrepreneurs, including Canadians Josh Gao and Mogen Cheng, who previously built a restaurant fintech startup, and Jason Chong, who joined Coinbase after it acquired his crypto exchange.",
        "cn": "Mecka AI 由四位企业家于 2024 年联合创立，其中包括加拿大人 Josh Gao 和 Mogen Cheng——他们此前曾创办过一家餐饮金融科技初创公司——以及 Jason Chong，他在自己的加密货币交易所被 Coinbase 收购后加入了该公司。"
      },
      {
        "en": "Duy Nguyen, the only non-Canadian on the team, focuses on operations at Mecka.",
        "cn": "杜伊·阮是团队中唯一的非加拿大籍成员，主要负责Mecka的运营工作。"
      },
      {
        "en": "The four co-founders don’t have backgrounds in robotics.",
        "cn": "这四位联合创始人都没有机器人技术的背景。"
      },
      {
        "en": "But they did recognize that there was a dearth of physical-world data and realized that capturing real-world interactions was the primary bottleneck holding back general-purpose robots, including humanoids.",
        "cn": "但他们确实认识到，物理世界数据匮乏，并意识到捕捉现实世界的交互是阻碍通用机器人（包括类人机器人）发展的主要瓶颈。"
      },
      {
        "en": "Mecka, which derives its name from “mecha,” a fictional giant robot controlled by humans, set out to do for robotics what Scale AI, Mercor, Surge, and other human data companies have done for LLMs.",
        "cn": "Mecka（其名称源自“mecha”——一种由人类操控的虚构巨型机器人）致力于在机器人领域取得与Scale AI、Mercor、Surge等人类数据公司在大语言模型（LLMs）领域所取得的成就相媲美的成果。"
      },
      {
        "en": "The startup pays people to record themselves performing everyday tasks — like making coffee or fixing cars — using body sensors and smartphones.",
        "cn": "这家初创公司付钱给人们，让他们使用身体传感器和智能手机录制自己完成日常任务的过程——比如煮咖啡或修车。"
      },
      {
        "en": "As of early June, Mecka was projecting that it would end 2026 at an annual run rate of $100 million, Gao told Fortune when the startup announced its previous fundraise.",
        "cn": "高在接受《财富》杂志采访时表示，截至6月初，Mecka预计到2026年底，其年化营收将达到1亿美元。当时，这家初创公司刚刚宣布了上一轮融资。"
      },
      {
        "en": "While Mecka AI hasn’t publicly disclosed its customer list, many robotics companies and AI labs rely on real-world data captured through this “egocentric” approach, alongside other physical data collection methods like teleoperation, to build their models.",
        "cn": "尽管Mecka AI尚未公开其客户名单，但许多机器人公司和人工智能实验室在构建模型时，既依赖通过这种“以自我为中心”的方法采集的真实世界数据，也依赖远程操作等其他物理数据采集方法。"
      },
      {
        "en": "Other startups collecting real-world data for robot training include XDOF, which TechCrunch reported last week was nearing a new round at a $1.2 billion valuation, as well as human-data platforms expanding beyond LLMs, such as Scale AI and Micro1.",
        "cn": "其他为机器人训练收集真实世界数据的初创公司还包括XDOF——据TechCrunch上周报道，该公司估值已达12亿美元，即将完成新一轮融资——以及Scale AI和Micro1等业务范围已超出大型语言模型（LLMs）的人类数据平台。"
      },
      {
        "en": "When you purchase through links in our articles, we may earn a small commission.",
        "cn": "当您通过我们文章中的链接进行购买时，我们可能会获得一小笔佣金。"
      },
      {
        "en": "This doesn’t affect our editorial independence.",
        "cn": "这不会影响我们的编辑独立性。"
      },
      {
        "en": "Marina Temkin is a venture capital and startups reporter at TechCrunch.",
        "cn": "玛丽娜·特姆金是TechCrunch的一名风险投资和初创企业记者。"
      },
      {
        "en": "Prior to joining TechCrunch, she wrote about VC for PitchBook and Venture Capital Journal.",
        "cn": "在加入TechCrunch之前，她曾为PitchBook和《风险投资杂志》撰写关于风险投资的文章。"
      },
      {
        "en": "Earlier in her career, Marina was a financial analyst and earned a CFA charterholder designation.",
        "cn": "在职业生涯早期，玛丽娜曾担任财务分析师，并获得了特许金融分析师（CFA）资格认证。"
      },
      {
        "en": "You can contact or verify outreach from Marina by emailing marina.temkin@techcrunch.com or via encrypted message at +1 347-683-3909 on Signal.",
        "cn": "您可以通过发送电子邮件至 marina.temkin@techcrunch.com，或通过 Signal 应用向 +1 347-683-3909 发送加密消息，联系 Marina 或核实其联系。"
      },
      {
        "en": "Last day to book an exhibit table is September 18.",
        "cn": "预订展位的截止日期是9月18日。"
      },
      {
        "en": "Don’t miss out on high-impact leads, investor access, and a brand spotlight in Disrupt’s Expo Hall.",
        "cn": "千万不要错过Disrupt展览厅里那些极具影响力的潜在客户、与投资者的接触机会以及品牌展示的良机。"
      },
      {
        "en": "ID verification giant IDScan confirms data breach with more than 150 million driver’s licenses stolen Zack Whittaker",
        "cn": "身份验证巨头IDScan确认发生数据泄露事件，逾1.5亿份驾驶证信息被盗 扎克·惠特克"
      },
      {
        "en": "OpenAI fought dirty on career-making math problem, says NYU mathematician Russell Brandom",
        "cn": "纽约大学数学家拉塞尔·布兰多姆称，OpenAI在一道可能改变职业生涯的数学题上使了下作手段"
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
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/ai-y-combinator-s-garry-tan-wants-us-open-weight-.jpg",
    "paras": [
      {
        "en": "When it comes to Chinese AI labs using distillation techniques to extract knowledge from frontier model makers, Y Combinator CEO Garry Tan is hoping regulators stay out of it.",
        "cn": "关于中国的人工智能实验室利用知识蒸馏技术从前沿模型开发者那里提取知识一事，Y Combinator首席执行官加里·谭希望监管机构不要插手。"
      },
      {
        "en": "In fact, he thinks U.S. AI labs should perhaps play the same game.",
        "cn": "事实上，他认为美国的人工智能实验室或许也该采取同样的策略。"
      },
      {
        "en": "“I would do nothing,” he told CNBC in an interview earlier this week.",
        "cn": "“我什么也不会做，”他本周早些时候在接受CNBC采访时说道。"
      },
      {
        "en": "“We could argue that there should be an American distillation regime.”",
        "cn": "“我们可以认为，美国应该建立一套蒸馏制度。”"
      },
      {
        "en": "He elaborated to TechCrunch that this means he wants smaller, American open-weight AI labs to use the same kind of training techniques on American frontier AI labs, giving the U.S. a more robust set of open-weight options that aren’t Chinese.",
        "cn": "他向TechCrunch进一步解释说，这意味着他希望规模较小的美国开放权重AI实验室能够在美国前沿AI实验室中采用同类训练技术，从而为美国提供一套更强大的、非中国来源的开放权重选项。"
      },
      {
        "en": "Distillation is when a model maker extensively prompts another model in order to learn how it works and reasons.",
        "cn": "所谓“蒸馏”，是指一个模型生成器通过对另一个模型进行大量提示，从而学习该模型的工作原理和推理方式。"
      },
      {
        "en": "It is commonly, and legitimately, used by AI labs to help train new models.",
        "cn": "人工智能实验室通常会将其用于训练新模型，这种做法是合理的。"
      },
      {
        "en": "Anthropic this week released its second report alleging that Chinese labs are engaged in “illicit distillation attacks,” hiding their identities to distill without permission and relying on fraud and stolen credentials to do so.",
        "cn": "Anthropic本周发布了第二份报告，指控中国实验室从事“非法提取攻击”，通过隐藏身份在未经许可的情况下进行数据提取，并依靠欺诈和盗取的凭证来实施此类行为。"
      },
      {
        "en": "Anthropic CEO Dario Amodei had previously publicly called on U.S. regulators to crack down on distillation.",
        "cn": "Anthropic首席执行官达里奥·阿莫德伊此前曾公开呼吁美国监管机构严厉打击“蒸馏”行为。"
      },
      {
        "en": "It’s notable that the commander of Silicon Valley’s prestigious and prolific startup accelerator doesn’t agree.",
        "cn": "值得注意的是，硅谷这家声名显赫且成果丰硕的初创企业加速器的负责人并不认同这一观点。"
      },
      {
        "en": "To be clear, Tan isn’t advocating for American AI labs to use stolen credentials to distill.",
        "cn": "需要明确的是，谭并不主张美国的人工智能实验室利用被盗的凭证进行数据提炼。"
      },
      {
        "en": "He wants them to be free to come in the front door.",
        "cn": "他希望他们能自由地从前门进来。"
      },
      {
        "en": "In fact, his argument is twofold.",
        "cn": "事实上，他的论点包括两方面。"
      },
      {
        "en": "He feels it’s an overreach for AI labs to dictate what their customers can do with the information their models share with them.",
        "cn": "他认为，人工智能实验室要求客户必须按照其规定来使用模型与客户共享的信息，这是一种越权行为。"
      },
      {
        "en": "He also notes that the proprietary AI labs didn’t ask permission when they vacuumed up as much human knowledge as they could to train their models.",
        "cn": "他还指出，这些私营人工智能实验室在尽可能多地吸收人类知识来训练其模型时，并未征得许可。"
      },
      {
        "en": "They famously ingested plenty of copyrighted material without the permission of those intellectual property holders.",
        "cn": "众所周知，他们未经这些知识产权所有者许可，大量使用了受版权保护的内容。"
      },
      {
        "en": "Tan, who is himself such an avid AI user that he once described himself as having cyber psychosis, wants to see a balance between open-weight AI labs and frontier labs.",
        "cn": "谭本人就是一位狂热的人工智能用户，他曾形容自己患有“网络精神病”，他希望在开放式人工智能实验室与前沿实验室之间找到平衡。"
      },
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
      },
      {
        "en": "To him, the true AI doomer scenario is for all the immense power of frontier AI to wind up in the hands of a single powerful, proprietary provider.",
        "cn": "在他看来，真正的AI末日情景是：前沿AI的全部强大力量最终落入一家拥有强大实力的专有服务提供商之手。"
      },
      {
        "en": "“The nightmare scenario, the doomer scenario for AI is that there’s just one company,” he said.",
        "cn": "“对于人工智能而言，最糟糕的情况、最悲观的预测就是只有一家公司，”他说。"
      },
      {
        "en": "“It has the best access to capital.",
        "cn": "“它的融资渠道最为便利。"
      },
      {
        "en": "It has the best AI researchers.",
        "cn": "它拥有最顶尖的人工智能研究人员。"
      }
    ]
  },
  {
    "id": "ai-kimi-maker-moonshot-ai-targets-2b-in-annual-re",
    "cat": "AI",
    "title": "Kimi-maker Moonshot AI targets $2B in annual revenue",
    "titleZh": "Kimi 开发公司 Moonshot AI 计划实现20亿美元的年营收",
    "source": "TechCrunch AI · 2026-09-11",
    "date": "2026-09-11",
    "minutes": 2,
    "url": "https://techcrunch.com/2026/09/11/kimi-maker-moonshot-ai-targets-2-billion-in-annual-revenue/",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/ai-kimi-maker-moonshot-ai-targets-2b-in-annual-re.jpg",
    "paras": [
      {
        "en": "One of China’s most prominent AI labs, Moonshot AI, believes it can turn its popular open-weight model into serious sales growth.",
        "cn": "中国最知名的人工智能实验室之一——Moonshot AI——认为，其广受欢迎的开放式权重模型能够为其带来显著的销售增长。"
      },
      {
        "en": "On Friday, Bloomberg reported that the lab is targeting $2 billion in annualized revenue by the end of the year, double the company’s reported revenue run rate for August.",
        "cn": "周五，彭博社报道称，该实验室的目标是在年底前实现20亿美元的年化营收，这一数字是该公司8月份报告的营收运行率的两倍。"
      },
      {
        "en": "It’s an aggressive goal that reflects the success of the company’s K3 model since its release this summer.",
        "cn": "这是一个雄心勃勃的目标，反映了该公司K3车型自今年夏天上市以来的成功。"
      },
      {
        "en": "While K3’s usage figures have declined slightly in recent months, OpenRouter data currently shows as many as 300 billion tokens being generated each day by K3 models on the system.",
        "cn": "尽管K3的使用量在最近几个月略有下降，但OpenRouter的数据目前显示，系统上的K3模型每天生成的代币数量高达3000亿枚。"
      },
      {
        "en": "Moonshot’s projected revenue is still dwarfed by that of OpenAI and Anthropic, which recent reports put at $40 billion and $65 billion, respectively.",
        "cn": "Moonshot的预计营收仍远不及OpenAI和Anthropic，据最新报道，这两家公司的营收分别达到400亿美元和650亿美元。"
      },
      {
        "en": "Because Moonshot’s model weights are freely available, the company has far lower margins than its closed-weight competitors.",
        "cn": "由于Moonshot的模型权重是公开可用的，因此该公司的利润率远低于那些采用闭源权重的竞争对手。"
      },
      {
        "en": "The rising projections show there’s still money to be made from open-weight AI models, even if they’re not as lucrative as closed-weight frontier models.",
        "cn": "不断上升的预测数据显示，尽管开放权重的人工智能模型不如封闭权重的前沿模型那么赚钱，但从中仍可获利。"
      },
      {
        "en": "Still, Moonshot’s model development practices remain controversial — if not downright illegal.",
        "cn": "尽管如此，Moonshot的模型开发做法仍备受争议——甚至可以说完全违法。"
      },
      {
        "en": "Earlier this week, Anthropic accused the company of a long-running model distillation campaign that routed nearly 300,000 requests from Kimi directly to Claude Opus, effectively serving Opus in place of Kimi’s own models.",
        "cn": "本周早些时候，Anthropic指控该公司长期开展模型蒸馏活动，将近30万次来自Kimi的请求直接转发至Claude Opus，实际上是用Opus取代了Kimi自身的模型。"
      },
      {
        "en": "In total, more than 23 million responses were collected from Anthropic models for use in Moonshot’s training, the company alleged.",
        "cn": "据该公司称，共从Anthropic模型中收集了超过2300万条回复，用于Moonshot的训练。"
      },
      {
        "en": "Last day to book an exhibit table is September 18.",
        "cn": "预订展位的截止日期是9月18日。"
      },
      {
        "en": "Don’t miss out on high-impact leads, investor access, and a brand spotlight in Disrupt’s Expo Hall.",
        "cn": "千万不要错过Disrupt展览厅里那些极具影响力的潜在客户、与投资者的接触机会以及品牌展示的良机。"
      },
      {
        "en": "Every weekday and Sunday, you can get the best of TechCrunch’s coverage.",
        "cn": "每个工作日和周日，您都能阅读到TechCrunch的精选报道。"
      },
      {
        "en": "TechCrunch Mobility is your destination for transportation news and insight.",
        "cn": "TechCrunch Mobility 是您获取交通领域新闻和洞察的理想平台。"
      },
      {
        "en": "Startups are the core of TechCrunch, so get our best coverage delivered weekly.",
        "cn": "初创企业是TechCrunch的核心，因此请订阅我们的每周精选报道。"
      },
      {
        "en": "Provides movers and shakers with the info they need to start their day.",
        "cn": "为各界领军人物提供开启新一天所需的资讯。"
      },
      {
        "img": "assets/covers/ai-kimi-maker-moonshot-ai-targets-2b-in-annual-re-1.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/ai-kimi-maker-moonshot-ai-targets-2b-in-annual-re-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/ai-kimi-maker-moonshot-ai-targets-2b-in-annual-re-3.jpg",
        "cap": ""
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
