/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 24 篇，英文正文来自公开 RSS 的真实报道原文，未做改写；
 * 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：Sky Sports / HistoryExtra / Smithsonian Magazine / Aesop's Fables (1912) / Mental Floss / TechCrunch AI / AI News / FourFourTwo / ELLE / Harper's Bazaar
 */

const ARTICLES_EXTRA = [
  {
    "id": "fab-the-fox-and-the-grapes",
    "cat": "寓言",
    "title": "The Fox And The Grapes",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fab-the-fox-and-the-grapes.jpg",
    "paras": [
      {
        "en": "A hungry Fox saw some fine bunches of Grapes hanging from a vine that was trained along a high trellis, and did his best to reach them by jumping as high as he could into the air.",
        "cn": "一只饥肠辘辘的狐狸看到几串饱满的葡萄挂在沿着高高的棚架攀爬的藤蔓上，便竭尽全力，拼命往空中一跃，想够到那些葡萄。"
      },
      {
        "en": "But it was all in vain, for they were just out of reach: so he gave up trying, and walked away with an air of dignity and unconcern, remarking, \"I thought those Grapes were ripe, but I see now they are quite sour.\"",
        "cn": "但这一切都是徒劳的，因为那些葡萄就在咫尺之外却够不着：于是他放弃了尝试，神情庄重而淡然地走开了，并说道：“我原以为那些葡萄已经熟了，但现在看来它们还挺酸的。”"
      }
    ],
    "titleZh": "《狐狸与葡萄》"
  },
  {
    "id": "fab-the-fox-and-the-crow",
    "cat": "寓言",
    "title": "The Fox And The Crow",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/fab-the-fox-and-the-crow.jpg",
    "paras": [
      {
        "en": "A Crow was sitting on a branch of a tree with a piece of cheese in her beak when a Fox observed her and set his wits to work to discover some way of getting the cheese.",
        "cn": "一只乌鸦叼着一块奶酪坐在树枝上，这时一只狐狸发现了它，便绞尽脑汁想方设法要弄到那块奶酪。"
      },
      {
        "en": "Coming and standing under the tree he looked up and said, \"What a noble bird I see above me!",
        "cn": "他走到树下站定，抬头望了望，说道：“我头顶上这只鸟多么高贵啊！”"
      },
      {
        "en": "Her beauty is without equal, the hue of her plumage exquisite.",
        "cn": "她的美貌无与伦比，羽毛的色泽极为精美。"
      },
      {
        "en": "If only her voice is as sweet as her looks are fair, she ought without doubt to be Queen of the Birds.\" The Crow was hugely flattered by this, and just to show the Fox that she could sing she gave a loud caw.",
        "cn": "“如果她的歌声能像她的容貌一样动听，她无疑该是‘鸟中之王’了。”乌鸦听了这话，受宠若惊，为了向狐狸证明自己会唱歌，便放声呱呱叫了起来。"
      },
      {
        "en": "Down came the cheese, of course, and the Fox, snatching it up, said, \"You have a voice, madam, I see: what you want is wits.\"",
        "cn": "奶酪自然就掉了下来，狐狸一把抓起奶酪，说道：“夫人，我看您倒是有个好嗓子：您缺的可是机智。”"
      }
    ],
    "titleZh": "《狐狸与乌鸦》"
  },
  {
    "id": "fab-the-crow-and-the-pitcher",
    "cat": "寓言",
    "title": "The Crow And The Pitcher",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fab-the-crow-and-the-pitcher.jpg",
    "paras": [
      {
        "en": "A thirsty Crow found a Pitcher with some water in it, but so little was there that, try as she might, she could not reach it with her beak, and it seemed as though she would die of thirst within sight of the remedy.",
        "cn": "一只口渴的乌鸦发现了一个装有少许水的罐子，但水实在太少，无论它怎么努力，都无法用喙舀到水，眼看解渴之物就在眼前，它却似乎要渴死了。"
      },
      {
        "en": "At last she hit upon a clever plan.",
        "cn": "最后，她想出了一个好主意。"
      },
      {
        "en": "She began dropping pebbles into the Pitcher, and with each pebble the water rose a little higher until at last it reached the brim, and the knowing bird was enabled to quench her thirst.",
        "cn": "她开始往水罐里往里扔小石子，每扔进一颗，水面就微微上升一点，直到最后水漫过罐沿，那只聪明的鸟儿这才得以解渴。"
      },
      {
        "en": "Necessity is the mother of invention.",
        "cn": "需要是发明之母。"
      },
      {
        "en": "Moral: Necessity is the mother of invention.",
        "cn": "寓意：需要是发明之母。"
      }
    ],
    "titleZh": "《乌鸦与水罐》"
  },
  {
    "id": "fab-the-north-wind-and-the-sun",
    "cat": "寓言",
    "title": "The North Wind And The Sun",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/fab-the-north-wind-and-the-sun.jpg",
    "paras": [
      {
        "en": "A dispute arose between the North Wind and the Sun, each claiming that he was stronger than the other.",
        "cn": "北风和太阳之间发生了一场争执，双方都声称自己比对方更强。"
      },
      {
        "en": "At last they agreed to try their powers upon a traveller, to see which could soonest strip him of his cloak.",
        "cn": "最后，他们同意试一试各自的能力，看谁能最快把那名旅人的斗篷脱下来。"
      },
      {
        "en": "The North Wind had the first try; and, gathering up all his force for the attack, he came whirling furiously down upon the man, and caught up his cloak as though he would wrest it from him by one single effort: but the harder he blew, the more closely the man wrapped it round himself.",
        "cn": "北风率先发起进攻；他聚集起全部力量，狂风大作地向那人扑去，猛地卷起他的斗篷，仿佛要一鼓作气将其夺走；但他吹得越猛，那人就裹得越紧。"
      },
      {
        "en": "Then came the turn of the Sun.",
        "cn": "接着轮到太阳了。"
      },
      {
        "en": "At first he beamed gently upon the traveller, who soon unclasped his cloak and walked on with it hanging loosely about his shoulders: then he shone forth in his full strength, and the man, before he had gone many steps, was glad to throw his cloak right off and complete his journey more lightly clad.",
        "cn": "起初，阳光温柔地照在旅人身上，他随即解开斗篷，让它松松垮垮地披在肩上继续前行；随后，阳光以最炽烈的光芒照耀下来，那人还没走几步，便欣然脱下斗篷，轻装上阵继续了旅程。"
      },
      {
        "en": "Persuasion is better than force",
        "cn": "说服胜过强迫"
      },
      {
        "en": "Moral: Persuasion is better than force",
        "cn": "寓意：说服胜于强迫"
      }
    ],
    "titleZh": "《北风与太阳》"
  },
  {
    "id": "fab-the-hare-and-the-tortoise",
    "cat": "寓言",
    "title": "The Hare And The Tortoise",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/fab-the-hare-and-the-tortoise.jpg",
    "paras": [
      {
        "en": "A Hare was one day making fun of a Tortoise for being so slow upon his feet.",
        "cn": "有一天，一只野兔取笑一只乌龟跑得太慢。"
      },
      {
        "en": "\"Wait a bit,\" said the Tortoise; \"I'll run a race with you, and I'll wager that I win.\" \"Oh, well,\" replied the Hare, who was much amused at the idea, \"let's try and see\"; and it was soon agreed that the fox should set a course for them, and be the judge.",
        "cn": "“等一下，”乌龟说，“我跟你赛跑，我敢打赌我会赢。”“哦，好吧，”野兔回答道，这个主意让他觉得很有趣，“那就试试看吧”；两人很快达成一致，由狐狸为他们设定赛道，并担任裁判。"
      },
      {
        "en": "When the time came both started off together, but the Hare was soon so far ahead that he thought he might as well have a rest: so down he lay and fell fast asleep.",
        "cn": "到了起跑的时候，两只动物一起出发，但野兔很快就遥遥领先，觉得不妨休息一下：于是它躺了下来，酣然入睡。"
      },
      {
        "en": "Meanwhile the Tortoise kept plodding on, and in time reached the goal.",
        "cn": "与此同时，乌龟依然一步一个脚印地向前爬行，最终到达了终点。"
      },
      {
        "en": "At last the Hare woke up with a start, and dashed on at his fastest, but only to find that the Tortoise had already won the race.",
        "cn": "最后，野兔猛地惊醒，以最快的速度冲了出去，却发现乌龟早已赢得了比赛。"
      },
      {
        "en": "Slow and steady wins the race.",
        "cn": "稳扎稳打，终会成功。"
      },
      {
        "en": "Moral: Slow and steady wins the race.",
        "cn": "寓意：稳扎稳打，终能获胜。"
      }
    ],
    "titleZh": "《龟兔赛跑》"
  },
  {
    "id": "fab-the-fox-and-the-stork",
    "cat": "寓言",
    "title": "The Fox And The Stork",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/fab-the-fox-and-the-stork.jpg",
    "paras": [
      {
        "en": "A Fox invited a Stork to dinner, at which the only fare provided was a large flat dish of soup.",
        "cn": "一只狐狸邀请一只鹳来吃晚饭，席上唯一的一道菜就是一大盘汤。"
      },
      {
        "en": "The Fox lapped it up with great relish, but the Stork with her long bill tried in vain to partake of the savoury broth.",
        "cn": "狐狸津津有味地喝了个精光，而长喙的鹳却怎么也无法品尝到这美味的汤。"
      },
      {
        "en": "Her evident distress caused the sly Fox much amusement.",
        "cn": "她那显而易见的痛苦让狡猾的狐狸乐不可支。"
      },
      {
        "en": "But not long after the Stork invited him in turn, and set before him a pitcher with a long and narrow neck, into which she could get her bill with ease.",
        "cn": "但没过多久，鹳鸟也邀请他进去，并在他面前放了一个长颈窄口的罐子，她的喙可以轻松伸进去。"
      },
      {
        "en": "Thus, while she enjoyed her dinner, the Fox sat by hungry and helpless, for it was impossible for him to reach the tempting contents of the vessel.",
        "cn": "因此，当她享用晚餐时，那只狐狸却饿着肚子无助地坐在一旁，因为它根本无法够到碗里那些诱人的食物。"
      }
    ],
    "titleZh": "《狐狸与鹳》"
  },
  {
    "id": "fab-the-dog-and-the-shadow",
    "cat": "寓言",
    "title": "The Dog And The Shadow",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/fab-the-dog-and-the-shadow.jpg",
    "paras": [
      {
        "en": "A Dog was crossing a plank bridge over a stream with a piece of meat in his mouth, when he happened to see his own reflection in the water.",
        "cn": "一只狗嘴里叼着一块肉，正穿过一座架在小溪上的木板桥，这时它偶然在水里看到了自己的倒影。"
      },
      {
        "en": "He thought it was another dog with a piece of meat twice as big; so he let go his own, and flew at the other dog to get the larger piece.",
        "cn": "他以为那是另一只狗叼着一块大两倍的肉；于是他松开了自己嘴里的那块，猛扑向那只狗，想抢到那块更大的肉。"
      },
      {
        "en": "But, of course, all that happened was that he got neither; for one was only a shadow, and the other was carried away by the current.",
        "cn": "不过，当然，结果是他两样都没得到；因为一个只是影子，另一个则被水流冲走了。"
      }
    ],
    "titleZh": "《狗与影子》"
  },
  {
    "id": "fab-the-town-mouse-and-the-country-mouse",
    "cat": "寓言",
    "title": "The Town Mouse And The Country Mouse",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/fab-the-town-mouse-and-the-country-mouse.jpg",
    "paras": [
      {
        "en": "A Town Mouse and a Country Mouse were acquaintances, and the Country Mouse one day invited his friend to come and see him at his home in the fields.",
        "cn": "一只城里老鼠和一只乡下老鼠是熟人，有一天，乡下老鼠邀请他的朋友去田野里的家里做客。"
      },
      {
        "en": "The Town Mouse came, and they sat down to a dinner of barleycorns and roots, the latter of which had a distinctly earthy flavour.",
        "cn": "城里那只老鼠来了，它们坐下来享用了一顿由大麦粒和根茎组成的晚餐，其中根茎带着一股明显的泥土味。"
      },
      {
        "en": "The fare was not much to the taste of the guest, and presently he broke out with \"My poor dear friend, you live here no better than the ants.",
        "cn": "这顿饭并不太合客人的口味，过了一会儿，他脱口而出：“我可怜的朋友啊，你在这里的生活条件还不如蚂蚁呢。”"
      },
      {
        "en": "Now, you should just see how I fare!",
        "cn": "现在，你就等着瞧我表现如何吧！"
      },
      {
        "en": "My larder is a regular horn of plenty.",
        "cn": "我的食品储藏室简直就像一个丰饶角。"
      },
      {
        "en": "You must come and stay with me, and I promise you you shall live on the fat of the land.\" So when he returned to town he took the Country Mouse with him, and showed him into a larder containing flour and oatmeal and figs and honey and dates.",
        "cn": "“你一定要来和我住在一起，我向你保证，你定能过上衣食无忧的生活。”于是，当他回到镇上时，便把那只乡下老鼠带在身边，领他走进了一个储藏室，里面装满了面粉、燕麦片、无花果、蜂蜜和椰枣。"
      },
      {
        "en": "The Country Mouse had never seen anything like it, and sat down to enjoy the luxuries his friend provided: but before they had well begun, the door of the larder opened and some one came in.",
        "cn": "乡下老鼠从未见过这样的景象，便坐下来享受朋友提供的奢华待遇；但他们刚要开始，食品储藏室的门就开了，有人走了进来。"
      },
      {
        "en": "The two Mice scampered off and hid themselves in a narrow and exceedingly uncomfortable hole.",
        "cn": "两只老鼠蹦蹦跳跳地跑开了，躲进了一个狭窄且极其不舒服的洞里。"
      },
      {
        "en": "Presently, when all was quiet, they ventured out again; but some one else came in, and off they scuttled again.",
        "cn": "此时，当一切都安静下来时，它们又冒着风险溜了出去；但又有人进来了，它们便再次仓皇逃窜。"
      },
      {
        "en": "This was too much for the visitor.",
        "cn": "这对这位访客来说实在太过分了。"
      },
      {
        "en": "\"Good-bye,\" said he, \"I'm off.",
        "cn": "“再见，”他说，“我要走了。"
      },
      {
        "en": "You live in the lap of luxury, I can see, but you are surrounded by dangers; whereas at home I can enjoy my simple dinner of roots and corn in peace.\"",
        "cn": "“我看你过着奢华的生活，但四面八方都危机四伏；而在家里，我却能安然享用那顿由根茎和玉米组成的简朴晚餐。”"
      }
    ],
    "titleZh": "《城里老鼠和乡下老鼠》"
  },
  {
    "id": "fab-the-grasshopper-and-the-ants",
    "cat": "寓言",
    "title": "The Grasshopper And The Ants",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/fab-the-grasshopper-and-the-ants.jpg",
    "paras": [
      {
        "en": "One fine day in winter some Ants were busy drying their store of corn, which had got rather damp during a long spell of rain.",
        "cn": "冬日的一个晴朗日子里，几只蚂蚁正忙着晾晒它们储存的玉米，这些玉米在连日阴雨中已经有些受潮了。"
      },
      {
        "en": "Presently up came a Grasshopper and begged them to spare her a few grains, \"For,\" she said, \"I'm simply starving.\" The Ants stopped work for a moment, though this was against their principles.",
        "cn": "这时，一只蚱蜢跑过来，恳求它们分给她几粒粮食，“因为，”她说，“我真的饿坏了。”蚂蚁们虽然这违背了它们的原则，但还是停下手头的工作片刻。"
      },
      {
        "en": "\"May we ask,\" said they, \"what you were doing with yourself all last summer?",
        "cn": "“请问，”他们说，“去年整个夏天你都在忙些什么？”"
      },
      {
        "en": "Why didn't you collect a store of food for the winter?\" \"The fact is,\" replied the Grasshopper, \"I was so busy singing that I hadn't the time.\" \"If you spent the summer singing,\" replied the Ants, \"you can't do better than spend the winter dancing.\" And they chuckled and went on with their work.",
        "cn": "“你为什么不储备些过冬的食物呢？”“其实，”蚱蜢回答道，“我光顾着唱歌，根本没时间储备。”“既然你整个夏天都在唱歌，”蚂蚁们回答道，“那冬天跳舞也不错嘛。”说完，它们咯咯地笑了起来，继续干活。"
      }
    ],
    "titleZh": "蚱蜢和蚂蚁"
  },
  {
    "id": "fab-the-ass-in-the-lion-s-skin",
    "cat": "寓言",
    "title": "The Ass In The Lion'S Skin",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fab-the-ass-in-the-lion-s-skin.jpg",
    "paras": [
      {
        "en": "An Ass found a Lion's Skin, and dressed himself up in it.",
        "cn": "一头驴子捡到一张狮皮，便把它披在身上。"
      },
      {
        "en": "Then he went about frightening every one he met, for they all took him to be a lion, men and beasts alike, and took to their heels when they saw him coming.",
        "cn": "随后，他四处游荡，吓唬他遇到的每个人，因为无论人还是兽，都把他当成了狮子，一见他走来便纷纷逃窜。"
      },
      {
        "en": "Elated by the success of his trick, he loudly brayed in triumph.",
        "cn": "因这招大获成功而欣喜若狂，他得意洋洋地大声嘶叫起来。"
      },
      {
        "en": "The Fox heard him, and recognised him at once for the Ass he was, and said to him, \"Oho, my friend, it's you, is it?",
        "cn": "狐狸听见了他的声音，立刻认出他就是那头驴，便对他说：“哦呵，朋友，原来是你啊？”"
      },
      {
        "en": "I, too, should have been afraid if I hadn't heard your voice.\"",
        "cn": "“要不是听见你的声音，我本该害怕的。”"
      }
    ],
    "titleZh": "披着狮子皮的驴"
  },
  {
    "id": "fab-the-miser",
    "cat": "寓言",
    "title": "The Miser",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/fab-the-miser.jpg",
    "paras": [
      {
        "en": "A Miser sold everything he had, and melted down his hoard of gold into a single lump, which he buried secretly in a field.",
        "cn": "一个吝啬鬼变卖了所有家当，将囤积的黄金熔成一块，然后悄悄埋在田里。"
      },
      {
        "en": "Every day he went to look at it, and would sometimes spend long hours gloating over his treasure.",
        "cn": "他每天都会去看看它，有时还会花上好几个小时，得意洋洋地欣赏自己的宝贝。"
      },
      {
        "en": "One of his men noticed his frequent visits to the spot, and one day watched him and discovered his secret.",
        "cn": "他手下的一名部下注意到他经常去那个地方，有一天便暗中观察他，从而发现了他的秘密。"
      },
      {
        "en": "Waiting his opportunity, he went one night and dug up the gold and stole it.",
        "cn": "他伺机而动，某天晚上挖出了那批黄金并将其偷走。"
      },
      {
        "en": "Next day the Miser visited the place as usual, and, finding his treasure gone, fell to tearing his hair and groaning over his loss.",
        "cn": "第二天，吝啬鬼像往常一样来到那里，发现自己的财宝不翼而飞，便捶胸顿足，为这笔损失哀叹不已。"
      },
      {
        "en": "In this condition he was seen by one of his neighbours, who asked him what his trouble was.",
        "cn": "就在这时，一位邻居看见了他，便问他出了什么事。"
      },
      {
        "en": "The Miser told him of his misfortune; but the other replied, \"Don't take it so much to heart, my friend; put a brick into the hole, and take a look at it every day: you won't be any worse off than before, for even when you had your gold it was of no earthly use to you.\"",
        "cn": "吝啬鬼向他倾诉了自己的不幸；但对方回答道：“别太放在心上，我的朋友；往那个洞里塞块砖头，每天去看看：你的处境不会比以前更糟，毕竟就算你还有那金子，对你来说也毫无用处。”"
      }
    ],
    "titleZh": "《吝啬鬼》"
  },
  {
    "id": "fab-the-dog-in-the-manger",
    "cat": "寓言",
    "title": "The Dog In The Manger",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/fab-the-dog-in-the-manger.jpg",
    "paras": [
      {
        "en": "A Dog was lying in a Manger on the hay which had been put there for the cattle, and when they came and tried to eat, he growled and snapped at them and wouldn't let them get at their food.",
        "cn": "一只狗躺在马槽里，躺在原本为牲畜准备的干草上；当牲畜们过来试图吃草时，它便低吼着朝它们扑咬，不让它们靠近食物。"
      },
      {
        "en": "\"What a selfish beast,\" said one of them to his companions; \"he can't eat himself and yet he won't let those eat who can.\"",
        "cn": "“真是个自私的家伙，”其中一人对同伴们说，“他自己吃不完，却不让那些能吃的人吃。”"
      }
    ],
    "titleZh": "驴口狗"
  },
  {
    "id": "fab-the-wolf-and-the-crane",
    "cat": "寓言",
    "title": "The Wolf And The Crane",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/fab-the-wolf-and-the-crane.jpg",
    "paras": [
      {
        "en": "A Wolf once got a bone stuck in his throat.",
        "cn": "有只狼的喉咙里曾卡住了一块骨头。"
      },
      {
        "en": "So he went to a Crane and begged her to put her long bill down his throat and pull it out.",
        "cn": "于是，他去找了一只鹤，恳求它把长喙伸进他的喉咙里，把东西拽出来。"
      },
      {
        "en": "\"I'll make it worth your while,\" he added.",
        "cn": "“我会让你觉得这笔交易很划算的，”他补充道。"
      },
      {
        "en": "The Crane did as she was asked, and got the bone out quite easily.",
        "cn": "鹤照着吩咐做了，很轻松地就把骨头取了出来。"
      },
      {
        "en": "The Wolf thanked her warmly, and was just turning away, when she cried, \"What about that fee of mine?\" \"Well, what about it?\" snapped the Wolf, baring his teeth as he spoke; \"you can go about boasting that you once put your head into a Wolf's mouth and didn't get it bitten off.",
        "cn": "狼热切地感谢了她，正要转身离开时，她突然喊道：“那我的报酬呢？”“呃，那又怎样？”狼不耐烦地咆哮道，说话时还露出了獠牙；“你可以到处吹嘘，说你曾经把头伸进狼嘴里，却没被咬掉。”"
      },
      {
        "en": "What more do you want?\"",
        "cn": "“你还想要什么？”"
      }
    ],
    "titleZh": "《狼与鹤》"
  },
  {
    "id": "fab-the-two-pots",
    "cat": "寓言",
    "title": "The Two Pots",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/fab-the-two-pots.jpg",
    "paras": [
      {
        "en": "Two Pots, one of earthenware and the other of brass, were carried away down a river in flood.",
        "cn": "两个陶罐——一个是陶制的，另一个是黄铜制的——被汹涌的河水冲走了。"
      },
      {
        "en": "The Brazen Pot urged his companion to keep close by his side, and he would protect him.",
        "cn": "“铜锅”催促同伴紧跟在他身边，说他会保护他。"
      },
      {
        "en": "The other thanked him, but begged him not to come near him on any account: \"For that,\" he said, \"is just what I am most afraid of.",
        "cn": "另一个人向他道了谢，但恳求他无论如何都不要靠近自己：“因为，”他说，“这正是我最害怕的。”"
      },
      {
        "en": "One touch from you and I should be broken in pieces.\" Equals make the best friends.",
        "cn": "“你只要轻轻一碰，我就会粉身碎骨。”志同道合的人才是最好的朋友。"
      },
      {
        "en": "Moral: Equals make the best friends.",
        "cn": "寓意：志同道合的人才是最好的朋友。"
      }
    ],
    "titleZh": "《两个锅》"
  },
  {
    "id": "fab-the-monkey-and-the-dolphin",
    "cat": "寓言",
    "title": "The Monkey And The Dolphin",
    "source": "Aesop's Fables (1912) · 1912",
    "date": "1912",
    "minutes": 2,
    "url": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/fab-the-monkey-and-the-dolphin.jpg",
    "paras": [
      {
        "en": "When people go on a voyage they often take with them lap-dogs or monkeys as pets to wile away the time.",
        "cn": "人们出航时，常会带上宠物狗或猴子来打发时间。"
      },
      {
        "en": "Thus it fell out that a man returning to Athens from the East had a pet Monkey on board with him.",
        "cn": "事情是这样的：有位从东方返回雅典的人，船上带了一只宠物猴子。"
      },
      {
        "en": "As they neared the coast of Attica a great storm burst upon them, and the ship capsized.",
        "cn": "当他们接近阿提卡海岸时，一场大风暴突然袭来，船只翻了。"
      },
      {
        "en": "All on board were thrown into the water, and tried to save themselves by swimming, the Monkey among the rest.",
        "cn": "船上所有人都被抛入水中，纷纷下水游泳求生，猴子也在其中。"
      },
      {
        "en": "A Dolphin saw him, and, supposing him to be a man, took him on his back and began swimming towards the shore.",
        "cn": "一只海豚看见了他，误以为他是个人，便把他驮在背上，朝岸边游去。"
      },
      {
        "en": "When they got near the Piraeus, which is the port of Athens, the Dolphin asked the Monkey if he was an Athenian.",
        "cn": "当他们靠近比雷埃夫斯——也就是雅典的港口——时，海豚问猴子他是不是雅典人。"
      },
      {
        "en": "The Monkey replied that he was, and added that he came of a very distinguished family.",
        "cn": "猴子回答说确实如此，并补充道，他出身于一个非常显赫的家族。"
      },
      {
        "en": "\"Then, of course, you know the Piraeus,\" continued the Dolphin.",
        "cn": "“那么，你当然知道比雷埃夫斯了，”海豚接着说道。"
      },
      {
        "en": "The Monkey thought he was referring to some high official or other, and replied, \"Oh, yes, he's a very old friend of mine.\" At that, detecting his hypocrisy, the Dolphin was so disgusted that he dived below the surface, and the unfortunate Monkey was quickly drowned.",
        "cn": "猴子以为海豚说的是某个高官之类的人物，便回答道：“哦，是的，他是我的一位老朋友。”海豚听后识破了他的虚伪，感到十分厌恶，便潜入水下，那只倒霉的猴子很快便淹死了。"
      }
    ],
    "titleZh": "猴子和海豚"
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
        "img": "assets/covers/ft-footballers-give-me-hundreds-of-thousands-of-p-1.jpg",
        "cap": "\"We've got the stairs, leading up to the bedrooms...\" (Image credit: Getty Images)"
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
        "img": "assets/covers/ft-footballers-give-me-hundreds-of-thousands-of-p-2.jpg",
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
        "cap": "Friday Football Quiz (Image credit: Getty Images)"
      },
      {
        "img": "assets/covers/ft-friday-football-quiz-episode-132-can-you-get-2-2.jpg",
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
        "img": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh-1.jpg",
        "cap": "Charlton Athletic's win at West Ham United was one of the shock results of the Championship season (Image cred"
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
        "img": "assets/covers/ft-why-2026-27-will-be-one-of-the-best-championsh-2.jpg",
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
        "cap": "Image: Lewis Hall has agreed a new long-term deal at St James'"
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
        "img": "assets/covers/ft-bukayo-saka-is-the-standout-attacking-option-r-1.jpg",
        "cap": "Bukayo Saka (Image credit: Getty Images)"
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
        "img": "assets/covers/ft-bukayo-saka-is-the-standout-attacking-option-r-2.jpg",
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
        "en": "Please logout and then login again, you will then be prompted to enter your display name.",
        "cn": "请先退出登录，然后重新登录，系统会提示您输入显示名称。"
      },
      {
        "en": "FourFourTwo is part of Future plc, an international media group and leading digital publisher.",
        "cn": "《FourFourTwo》隶属于Future plc，这是一家国际媒体集团，也是领先的数字出版商。"
      }
    ]
  }
];
/* 2026-09-12 人工清理：足球仅保留 2026-09-11 当天 9 篇，AI/明星全部清空（每日管线会按配额回补），寓言保留。 */

/* 合并进 ARTICLES（按 url / id 去重，避免和 data.js 里的文章重复） */
if (typeof ARTICLES !== "undefined" && typeof ARTICLES.push === "function") {
  const _haveUrl = new Set(ARTICLES.map(a => a.url));
  const _haveId = new Set(ARTICLES.map(a => a.id));
  ARTICLES_EXTRA.forEach(a => {
    if (!_haveUrl.has(a.url) && !_haveId.has(a.id)) ARTICLES.push(a);
  });
}
