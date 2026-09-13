/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 19 篇；英文正文来自公开 RSS 的真实报道原文，未做改写；
 * 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。
 */

const ARTICLES_EXTRA = [
  {
    "id": "gr-human-3-0-a-map-to-reach-the-top-1",
    "cat": "成长",
    "title": "HUMAN 3.0 – A Map To Reach The Top 1%",
    "titleZh": "HUMAN 3.0——迈入前1%的路线图",
    "source": "Dan Koe · 2025-08-26",
    "date": "2025-08-26",
    "minutes": 28,
    "url": "https://thedankoe.com/letters/human-3-0-a-map-to-reach-the-top-1/",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/gr-human-3-0-a-map-to-reach-the-top-1.jpg",
    "paras": [
      {
        "en": "Join 120,000+ getting mindf*cked every Saturday morning while reading about the mind, the internet, and the future.",
        "cn": "加入超过12万人的行列，每周六早上一边阅读关于心灵、互联网和未来的内容，一边体验脑洞大开的阅读体验。"
      },
      {
        "en": "As corny as this may sound, I’ve always wanted to become a force to be reckoned with.",
        "cn": "虽然这话听起来可能有些老套，但我一直都想成为一个不可小觑的力量。"
      },
      {
        "en": "Not just having a nice and muscular body, but to be fully developed in every domain of life.",
        "cn": "不仅要拥有健美强壮的体魄，还要在生活的各个方面都得到全面发展。"
      },
      {
        "en": "I wanted to become multidimensionally jacked.",
        "cn": "我想要练出多维度的健美身材。"
      },
      {
        "en": "I wanted to max out all of my stats.",
        "cn": "我想把所有属性都练到满级。"
      },
      {
        "en": "I wanted to be a level 100 player.",
        "cn": "我曾想成为一名100级玩家。"
      },
      {
        "en": "Maxed out physicality, intellect, and professions.",
        "cn": "体能、智力及职业技能均已升至满级。"
      },
      {
        "en": "Mind, body, spirit, relationships, money.",
        "cn": "心灵、身体、精神、人际关系、金钱。"
      },
      {
        "en": "As a teenager, I became obsessed with fitness.",
        "cn": "十几岁的时候，我迷上了健身。"
      },
      {
        "en": "Then, I wanted to absorb as much knowledge as possible.",
        "cn": "那时，我想尽可能多地吸收知识。"
      },
      {
        "en": "Then I wanted to be free, so I failed at various business models until I finally made one work.",
        "cn": "后来，我渴望获得自由，于是尝试了各种商业模式，虽然都以失败告终，但最终还是让其中一种成功了。"
      },
      {
        "en": "I’ve had various spiritual and philosophical stints that I believe have helped me see “superficial pursuits” like money and fitness in a completely different light than the average person.",
        "cn": "我曾有过各种灵性与哲学方面的探索，我认为这些经历让我对金钱和健身这类“肤浅的追求”，有了与普通人截然不同的看法。"
      },
      {
        "en": "Over the past 15 years, I’ve researched the depths of psychology, personal development, philosophy, social dynamics, technology, the internet, startups, money, religion, and meaning.",
        "cn": "在过去的15年里，我深入研究了心理学、个人成长、哲学、社会动态、技术、互联网、初创企业、金钱、宗教以及人生意义等领域。"
      },
      {
        "en": "After writing about my findings online for the past 5 years, I’ve noticed critical overlapping patterns that have begun to form a new philosophy for today’s world.",
        "cn": "在过去的5年里，我一直在网上分享自己的研究成果，并注意到一些关键的重叠模式，这些模式正逐渐形成一种适用于当今世界的新哲学。"
      },
      {
        "en": "I want to synthesize everything I’ve learned into one comprehensive map to navigate the modern landscape.",
        "cn": "我想将所学的一切整合成一张全面的地图，以此来探索现代世界。"
      },
      {
        "en": "I want to provide you with the knowledge, skills, and principles that help you escape mediocrity and actualize your highest potential.",
        "cn": "我想向您传授那些能帮助您摆脱平庸、充分发挥自身最大潜能的知识、技能和原则。"
      },
      {
        "en": "I will attempt to make this as non-dogmatic and science-backed as possible, but I also want to get the point across with clarity and conviction.",
        "cn": "我将尽量使这篇文章避免教条主义，并以科学为依据，但同时也希望能够清晰而坚定地表达我的观点。"
      },
      {
        "en": "I plan to write this for today’s world using clear, natural language while simplifying these concepts as best I can so that this doesn’t turn into a forgotten textbook.",
        "cn": "我打算用清晰、自然的语言，结合当今世界的背景来撰写这篇文章，并尽可能简化这些概念，以免这篇文章沦为一本被遗忘的教科书。"
      },
      {
        "en": "For that reason, I am going to speak how I speak and pass the nuance off to you.",
        "cn": "正因如此，我将按照自己的方式表达，至于其中的细微差别，就留给你去体会了。"
      },
      {
        "en": "The nuance and critical thinking always lie with the reader.",
        "cn": "细微之处和批判性思考始终取决于读者。"
      },
      {
        "en": "This will be an ongoing series where we dissect the human experience and reprogram your reality to live the best life possible.",
        "cn": "这是一个持续更新的系列，我们将深入剖析人类的体验，并重新规划你的现实，助你过上最美好的生活。"
      },
      {
        "en": "Much of it will be wrong, and I encourage you to question what I say.",
        "cn": "其中大部分内容可能有误，我鼓励大家对我的说法提出质疑。"
      },
      {
        "en": "In fact, I hope that you can build this out with me.",
        "cn": "其实，我希望你能和我一起把这个项目做起来。"
      },
      {
        "en": "If you talk about HUMAN 3.0 in your own writing or content, I’d love to see it.",
        "cn": "如果你在自己的文章或内容中提到了“HUMAN 3.0”，我很想看看。"
      },
      {
        "en": "Take these ideas and build on them.",
        "cn": "以这些想法为基础，进一步加以拓展。"
      },
      {
        "en": "If you like the H3.0 model, use it.",
        "cn": "如果你喜欢H3.0型号，就用它吧。"
      },
      {
        "en": "Now, there are plenty of incredible models and gurus already out there.",
        "cn": "如今，市面上已经有很多非常出色的模特和专家了。"
      },
      {
        "en": "Spiral Dynamics (psychology), Buddhism & Christianity (meaning), Materialism and Mentalism (nature of reality), eCommerce & consulting (business), Red Pill & Feminism (social dynamics), and so on.",
        "cn": "螺旋动力学（心理学）、佛教与基督教（意义）、唯物主义与唯心主义（现实的本质）、电子商务与咨询（商业）、“红药丸”与女权主义（社会动态）等等。"
      },
      {
        "en": "Anywhere you look, you can find hundreds of models that promise you the answer to all your problems.",
        "cn": "无论你往哪里看，都能找到成百上千种宣称能解决你所有问题的方案。"
      },
      {
        "en": "All have their truths, but the critical flaw is that they are all isolated to one domain of life.",
        "cn": "这些观点都有其道理，但关键的缺陷在于，它们都仅局限于生活的某个领域。"
      },
      {
        "en": "We learn math, English, and science as singular, siloed classes when knowledge is a web.",
        "cn": "我们把数学、英语和科学当作各自独立、互不关联的课程来学习，而知识其实是一张网络。"
      },
      {
        "en": "We dissect frogs in a lab and draw conclusions without considering the entirety of the ecosystem and interconnected relationships from which they come.",
        "cn": "我们在实验室里解剖青蛙，并据此得出结论，却未将它们所处的整个生态系统及其相互关联的生态关系纳入考量。"
      },
      {
        "en": "Beyond that, and for some this is hard to swallow, many spiritual teachers have frail bodies.",
        "cn": "除此之外——虽然对某些人来说这很难接受——许多灵性导师的身体都很虚弱。"
      },
      {
        "en": "Many businessmen can’t maintain relationships.",
        "cn": "许多商人无法维系人际关系。"
      },
      {
        "en": "Many “alpha males” are emotionally unaligned.",
        "cn": "许多“阿尔法男性”在情感上并不协调。"
      },
      {
        "en": "While these are incredible accomplishments in their own regard, it is rare that one is truly self-developed.",
        "cn": "虽然这些成就本身已令人惊叹，但真正完全靠自身努力取得的却凤毛麟角。"
      },
      {
        "en": "Even if these models or gurus do connect multiple domains, like Ancient Greek philosophies, they were often prevalent before the internet, technology, and AI started to change everything.",
        "cn": "即使这些模型或专家确实将多个领域联系在一起，就像古希腊哲学那样，但这些思想往往是在互联网、技术和人工智能开始改变一切之前就已经盛行的。"
      },
      {
        "en": "On a more important note, very few touch on areas such as work and money, which is surprising, as those dominate most people’s minds and lives.",
        "cn": "更重要的是，很少有人涉及工作和金钱等话题，这令人惊讶，因为这些话题占据了大多数人的思想和生活。"
      },
      {
        "en": "Over the coming months (maybe years), we will uncover what it truly means to live life to its fullest.",
        "cn": "在接下来的几个月（也许是几年）里，我们将探索何为真正地活出生命的精彩。"
      },
      {
        "en": "I will not be able to cover all of the details that this model contains in this introduction.",
        "cn": "在这篇简介中，我无法详尽介绍该模型所包含的所有细节。"
      },
      {
        "img": "assets/covers/gr-human-3-0-a-map-to-reach-the-top-1-1.jpg",
        "cap": ""
      },
      {
        "en": "This model offers the big picture.",
        "cn": "该模型提供了全局视角。"
      },
      {
        "en": "It is not a dogmatic set of actionable steps, but a set of guidelines for reaching your maximum potential and bust through mental, physical, spiritual, and vocational plateaus faster.",
        "cn": "这并非一套教条式的可操作步骤，而是一套旨在帮助你发挥最大潜能、更快突破心理、身体、精神及职业发展瓶颈的指导原则。"
      },
      {
        "en": "It orients patterns found across human development and builds on top of various scientific, psychological, spiritual, and vocational models that have already done a lot of the heavy lifting.",
        "cn": "它梳理了人类发展过程中普遍存在的模式，并在各种科学、心理、精神及职业发展模型的基础上进一步深化——这些模型此前已完成了大量基础性工作。"
      },
      {
        "en": "My goal is to take the best parts of the world’s greatest theories and apply them to the life of the individual.",
        "cn": "我的目标是汲取世界最伟大的理论中的精华，并将它们应用于个人的生活。"
      },
      {
        "en": "Once you understand this model, you can begin to map where your current level of development lies within each quadrant (your Archetype) and what your overall development looks like (your Metatype).",
        "cn": "一旦理解了这一模型，你就可以开始确定自己当前的发展水平在每个象限中的位置（即你的“原型”），以及你的整体发展状况（即你的“元类型”）。"
      },
      {
        "en": "Then, you can attempt to move further toward a 3.0+ Level Metatype – one who has maximized all areas of life.",
        "cn": "然后，你可以尝试进一步向3.0级以上的元类型迈进——即在生活的各个方面都已达到极致的人。"
      },
      {
        "en": "We will discuss those later in this letter, but for now, let’s understand the foundation.",
        "cn": "我们将在本信的后文中讨论这些问题，但现在，让我们先了解其基础。"
      },
      {
        "en": "The foundation of Human 3.0 is four quadrants that represent the four domains of life.",
        "cn": "“人类3.0”的基石是四个象限，它们代表了生活的四个领域。"
      },
      {
        "en": "Adapted from Ken Wilber’s AQAL model, the quadrants represent the four fundamental perspectives, creating a generalized map of all knowledge and experience.",
        "cn": "该模型改编自肯·威尔伯的AQAL模型，其四个象限代表了四种基本视角，从而构建了一幅涵盖所有知识与经验的通用图谱。"
      },
      {
        "en": "This map of reality prevents partial thinking and doesn’t reduce problems to one perspective.",
        "cn": "这种对现实的认知框架能够避免片面思考，也不会将问题简化为单一视角。"
      },
      {
        "en": "An internal mental problem may not be best solved by vocational means like getting a new job.",
        "cn": "对于心理上的问题，通过换工作等职业途径可能并非最佳解决方式。"
      },
      {
        "en": "A spiritual problem may not be best solved by bodily means like nutrition.",
        "cn": "精神层面的问题，或许无法通过营养等身体层面的方法得到最佳解决。"
      },
      {
        "en": "A capitalist and Christian are developed in their respective domains, but will experience unnecessary pain when trying to apply their model to problems within other domains.",
        "cn": "资本家和基督徒各自在其所属领域中都已成熟，但当试图将自己的模式应用到其他领域的问题上时，却会经历不必要的痛苦。"
      },
      {
        "en": "Money often doesn’t solve for meaning and vice versa, but that doesn’t mean they aren’t intimately connected.",
        "cn": "金钱往往无法带来意义，反之亦然，但这并不意味着二者之间没有密切的联系。"
      },
      {
        "en": "All of these domains overlap, and by developing yourself in all of the above you begin to live a life where you become in control of your future.",
        "cn": "这些领域彼此交织，只要在上述所有方面不断提升自己，你就能过上掌控自己未来的生活。"
      },
      {
        "en": "Since life, development, and evolution follow a general unfolding toward more chaos or complexity, and ordered structures are created to contain that chaos, we can call the process of life, especially your personal life, “problem solving.”",
        "cn": "既然生命、发展和进化总体上呈现出向更混乱或更复杂的方向演变的趋势，而有序结构的形成正是为了遏制这种混乱，那么我们可以将生命的过程——尤其是你个人的生活——称为“问题解决”。"
      },
      {
        "en": "A seed unfolds until it becomes a flower.",
        "cn": "一颗种子逐渐绽放，最终化作一朵花。"
      },
      {
        "en": "A flower is many times more complex than a seed, and to reach that state, it needs resources from its environment to self-develop.",
        "cn": "花比种子复杂得多，要达到这种状态，它需要从环境中获取资源以实现自我发育。"
      },
      {
        "en": "The seed has the natural desire to grow, and through many courses of evolution, it has solved the problems that have led to many other species of plants dying off.",
        "cn": "种子天生具有生长的本能，并通过多次进化，解决了导致许多其他植物物种灭绝的问题。"
      },
      {
        "en": "One may not think the seed is consciously trying to grow or solve problems.",
        "cn": "人们可能不会认为种子是在有意识地试图生长或解决问题。"
      },
      {
        "en": "Still, through observation and connecting patterns to our personal life, that’s what we would call it, since we have created language.",
        "cn": "尽管如此，通过观察并将这些规律与我们的个人生活联系起来，这就是我们对它的称呼——毕竟，语言是我们创造出来的。"
      },
      {
        "en": "We can start to understand that there is a natural flow of life toward greater complexity.",
        "cn": "我们可以开始理解，生命有着一种自然而然地趋向更高复杂性的发展趋势。"
      },
      {
        "en": "Complexity introduces problems, and to constrain the entropy that stems from complexity, an ordered structure must emerge through creation.",
        "cn": "复杂性会带来问题，为了限制由复杂性所产生的熵，必须通过创造形成一种有序的结构。"
      },
      {
        "en": "In your own personal evolution, you have the desire to reach your potential → you take a step into the unknown and are introduced to complexity → you acquire knowledge and skill to solve problems that prevent forward movement (or stagnate and let chaos consume you) → your identity expands and ascends to a new level → the process repeats unless you get stuck.",
        "cn": "在你的个人成长历程中，你渴望发挥自己的潜能 → 你迈出一步走向未知，从而接触到复杂性 → 你掌握知识和技能，以解决阻碍前进的问题（否则就会停滞不前，任由混乱吞噬自己）→ 你的自我认同得以拓展，并提升到一个新的层次 → 除非你陷入僵局，否则这个过程会不断重复。"
      },
      {
        "en": "This pattern can be noticed across all planes and domains of reality.",
        "cn": "这种规律在现实的所有层面和领域中都可见一斑。"
      },
      {
        "en": "I encourage you to think through more examples, but for the sake of brevity, let’s move on.",
        "cn": "我建议大家再思考一些例子，但为了简明起见，我们继续往下讲。"
      },
      {
        "en": "Within each quadrant, there are 3 macro levels of development that represent low consciousness (1.0), mid consciousness (2.0), and high consciousness (3.0).",
        "cn": "在每个象限内，都有3个宏观发展层次，分别代表低意识（1.0）、中意识（2.0）和高意识（3.0）。"
      },
      {
        "en": "These levels are adapted from various models in developmental psychology, such as Spiral Dynamics and the 9 Stages of Ego Development, which are already well-researched overlays of many psychological theories.",
        "cn": "这些层次借鉴了发展心理学中的多种模型，例如“螺旋动力学”和“自我发展的9个阶段”，这些模型是基于许多心理理论而构建的、已经经过充分研究的框架。"
      },
      {
        "en": "In short, these have shown that our mind (our values, beliefs, and worldview that influence how we think and make decisions) evolves through predictable stages over time.",
        "cn": "简而言之，这些研究表明，我们的思维（即影响我们思考和决策方式的价值观、信念和世界观）会随着时间的推移，经历一系列可预测的阶段而发展。"
      },
      {
        "en": "In a model like Spiral Dynamics, the “spiral” describes how individuals shift focus throughout their development between self and other (like rejecting the community of religion and embracing individual atheism).",
        "cn": "在“螺旋动力学”这样的模型中，“螺旋”描述了个体在发展过程中如何在“自我”与“他人”之间转移关注点（例如，拒绝宗教社群，转而拥抱个人无神论）。"
      },
      {
        "en": "In Human 3.0, this happens when one reaches a new level in a specific quadrant.",
        "cn": "在“人类3.0”中，当一个人在特定象限达到新层次时，就会发生这种情况。"
      },
      {
        "en": "Someone can become an Individualist in Mind, which may cause a shift in focus toward Spirit, where they are still at the Conformist stage and submit to authority.",
        "cn": "一个人可能在思想上成为“个人主义者”，这可能会导致其关注点转向“精神”层面，但此时他仍处于“顺从者”阶段，并服从权威。"
      },
      {
        "en": "The descriptions of each level take different shapes in each quadrant, like how a 3.0 Synthesist in the Vocation quadrant (Lower Right) can effectively leverage AI to pursue their life’s work, while a 1.0 Conformist believes AI is purely evil due to a lack of knowledge, skill, and experience.",
        "cn": "每个层级的描述在各个象限中呈现出不同的形态，例如，位于“志业”象限（右下）的3.0级“综合者”能够有效利用人工智能来追求毕生事业，而1.0级“顺从者”则因缺乏相关知识、技能和经验，认为人工智能纯粹是邪恶的。"
      },
      {
        "en": "In the Body quadrant (Upper Right), a low consciousness individual has no understanding of the nutrition they put in their body, leading to obesity and sloth, because they haven’t acquired the Traits to make better decisions, while a high consciousness individual understands how various nutrients interact with their body and can tweak their diet to help serve their goals.",
        "cn": "在“身体”象限（右上角），意识水平较低的人并不了解自己摄入体内的营养，这会导致肥胖和懒惰，因为他们尚未掌握做出更明智决策的特质；而意识水平较高的人则了解各种营养素如何与身体相互作用，并能调整饮食以助力实现自己的目标。"
      },
      {
        "en": "These levels reflect your complexity of self in any given domain.",
        "cn": "这些层次反映了你在特定领域中的自我复杂性。"
      },
      {
        "en": "The entire Human 3.0 graph represents you.",
        "cn": "整个“Human 3.0”图谱就是你本人的写照。"
      },
      {
        "en": "The more complex you are (by cultivating perspective and expanding consciousness), the more interesting life becomes, because you can choose the challenges you wish to take on.",
        "cn": "你越是变得复杂（通过培养视野和拓展意识），生活就越有趣，因为你可以选择自己想要迎接的挑战。"
      },
      {
        "en": "Like a video game: Level 1 is similar to an NPC or non-player character running on a script, Level 2 is the main character choosing their storyline, and Level 3 is the programmer who can create new games that others also enjoy playing.",
        "cn": "就像一款电子游戏：第1级类似于按照剧本运行的NPC（非玩家角色），第2级是主角选择自己的剧情线，而第3级则是程序员，他能够制作出让其他人也乐在其中的新游戏。"
      },
      {
        "en": "Note: Lower or higher levels are not “bad” or “good,” they are points along someone’s individual journey.",
        "cn": "注：水平高低并非“好”或“坏”，而是个人成长历程中的不同阶段。"
      },
      {
        "en": "A person who is “high consciousness” is not better, just more developed, and that development has it’s obvious perks.",
        "cn": "所谓“高意识”的人并不是比别人优越，只是发展得更成熟一些，而这种发展显然有其好处。"
      },
      {
        "en": "You do not leave any given level.",
        "cn": "你不会离开任何一个关卡。"
      },
      {
        "en": "You transcend and include the one before it.",
        "cn": "你既超越了前一个，又包含了前一个。"
      },
      {
        "en": "You acquire a greater perspective that allows you to leverage the knowledge, skill, and tools that you acquired during the lower stages.",
        "cn": "你会获得更广阔的视野，从而能够充分利用在较低阶段所掌握的知识、技能和工具。"
      },
      {
        "img": "assets/covers/gr-human-3-0-a-map-to-reach-the-top-1-2.jpg",
        "cap": ""
      },
      {
        "en": "Within each level, there are 3 phases of development that one must go through to reach the next level.",
        "cn": "在每个级别中，都有3个发展阶段，必须经历这些阶段才能晋升到下一个级别。"
      },
      {
        "en": "Phases represent vertical development, moving up a level or regressing back down.",
        "cn": "阶段代表垂直发展，即向上提升一个层次或向下退步。"
      },
      {
        "en": "There are 3 general patterns that we can observe when an individual goes through a profound change:",
        "cn": "当一个人经历深刻变化时，我们可以观察到以下3种普遍模式："
      },
      {
        "en": "For terminology’s sake, we can map specific areas of one’s life by appending the phase they are in to the level they are in within a particular domain.",
        "cn": "为了术语的统一，我们可以将一个人所处的特定生活领域，通过在其所在领域的层级后附加其所处的阶段来进行对应。"
      },
      {
        "en": "As an example, “Vocation 2.1” (Level 2, Phase 1) would represent the development of collective exterior consciousness (relationship to systems, structures, and social institutions).",
        "cn": "例如，“天职 2.1”（第 2 级，第 1 阶段）代表集体外部意识的发展（与系统、结构及社会机构的关系）。"
      },
      {
        "en": "The “2” represents the Individualist level, and “.1” represents that they have almost exhausted that stage and must take an uncertain step toward level 3 to discover what lies in their next chapter.",
        "cn": "“2”代表“个人主义”阶段，而“.1”则表示他们已几乎走完该阶段，必须迈出充满不确定性的一步，向第3阶段迈进，以探索自己人生下一章的未知篇章。"
      },
      {
        "en": "For the Vocation quadrant, this could mean that they have pursued a new career, but realized they were climbing the wrong ladder, and need to make a shift toward discovering their calling.",
        "cn": "就“天职”象限而言，这可能意味着他们曾投身于一份新职业，但后来意识到自己走错了方向，因此需要做出调整，去探索自己的天职。"
      },
      {
        "en": "Individuals can easily experience False Transformation during this process.",
        "cn": "在此过程中，个人很容易经历“虚假转变”。"
      },
      {
        "en": "They may feel as if they’ve advanced through each phase to reach a new level, but they are simply imitating what that level of development would look like without the required trait development.",
        "cn": "他们可能觉得自己已经经历了每个阶段，达到了一个新的水平，但实际上他们只是在模仿该发展阶段应有的样子，却缺乏相应的特质发展。"
      },
      {
        "en": "This is self-deception and traps people in their current stage, preventing them from progressing further until they solve the remaining problems that exist at their current level.",
        "cn": "这是一种自我欺骗，会将人们困在当前阶段，使他们无法更进一步，直到解决当前阶段尚存的问题为止。"
      },
      {
        "en": "This False Transformation can happen when one develops themself in one domain (like the domain of mind) and they assume they have advanced in another (like the domain of spirit or vocation).",
        "cn": "当一个人在某个领域（如心灵领域）进行自我发展时，却误以为自己在另一个领域（如精神领域或志业领域）也取得了进步，就会出现这种“虚假转变”。"
      },
      {
        "en": "Individuals can also regress to a lower level during a temporary period of stress or when a problem outside their current level comes into their life.",
        "cn": "在暂时面临压力时，或者当生活中出现超出其当前水平的问题时，个人也可能退回到较低的水平。"
      },
      {
        "en": "This explains why you may look back to a time where “things felt better” and you yearn to bring that sensation back to the present.",
        "cn": "这解释了为什么你会回想起“感觉更好”的时光，并渴望将那种感觉带回当下。"
      },
      {
        "en": "An enjoyable life, as shown in flow psychology and the musings of many philosophers such as Nietzsche, resides in the progression through these phases by overcoming resistance.",
        "cn": "正如“心流心理学”以及尼采等许多哲学家的思考所揭示的那样，愉快的生活在于通过克服阻力，逐步经历这些阶段。"
      },
      {
        "en": "Profound change rarely happens by accident.",
        "cn": "深刻的变革很少是偶然发生的。"
      },
      {
        "en": "When you are intentional about your vision, goals, and priorities without regressing by nature of distractions and comfort, the chaos that would consume most people during these phases becomes tolerable and often the most fulfilling parts of life that you hold close to your heart.",
        "cn": "当你对自己的愿景、目标和优先事项保持明确的意图，不因分心和安逸而退缩时，那些在这些阶段本会吞噬大多数人的混乱便变得可以忍受，甚至往往会成为你珍藏于心、人生中最充实的部分。"
      },
      {
        "en": "At level 3 and beyond, individuals can pursue more complex challenges and simulate these phases for the love of the game (like a CEO who sells their company, becomes depressed, and starts another one from a more enlightened point of view), and since they create the game, it becomes infinite.",
        "cn": "在第3级及以上，玩家可以迎接更复杂的挑战，并出于对游戏的热爱来模拟这些阶段（例如，一位CEO出售了自己的公司，陷入抑郁，随后以更开明的视角创办了新公司），而且由于他们自己创造了游戏，因此游戏变得无穷无尽。"
      },
      {
        "img": "assets/covers/gr-human-3-0-a-map-to-reach-the-top-1-3.jpg",
        "cap": ""
      },
      {
        "en": "Within each phase, there is a threshold of knowledge, experience, and skill that must be acquired before the next levelreveals itself to you.",
        "cn": "在每个阶段中，都存在一个知识、经验和技能的门槛，只有在达到这个门槛后，下一个层次才会向你展现。"
      },
      {
        "en": "While phases represent vertical development, traits represent horizontal development, or navigating the unknown until you have discovered enough to reach the next phase.",
        "cn": "阶段代表纵向发展，而特质则代表横向发展，即在探索未知的过程中不断前行，直到积累了足够的经验，从而进入下一个阶段。"
      },
      {
        "en": "Each quadrant, level, and phase presents different challenges that demand a certain level of skill.",
        "cn": "每个象限、级别和阶段都面临着不同的挑战，需要具备一定水平的技能。"
      },
      {
        "en": "That skill requires experimentation and education.",
        "cn": "掌握这项技能需要通过实践和学习。"
      },
      {
        "en": "One can be knowledgeable in fitness, but without practice and experience, they become the fat personal trainer archetype.",
        "cn": "一个人可能对健身知识了如指掌，但如果没有实践和经验，就会沦为“胖私教”的典型代表。"
      },
      {
        "en": "Their knowledge is admirable, but few people take them seriously, which has it’s pros and cons.",
        "cn": "他们的知识令人钦佩，但很少有人把他们当回事，这既有好处也有坏处。"
      },
      {
        "en": "The trap with both vertical (phases) and horizontal (traits) development is boredom and anxiety.",
        "cn": "既涉及纵向（阶段）发展又涉及横向（特质）发展的这种困境，会带来无聊和焦虑。"
      },
      {
        "en": "If you attempt to jump to a new level of development without the skill and experience to do so, you will become anxious and fail.",
        "cn": "如果你在缺乏相应技能和经验的情况下，试图跃升到一个新的发展阶段，你就会感到焦虑，最终以失败告终。"
      },
      {
        "en": "If you do not attempt to move up a level at all, you will grow bored and resort to comfort and distraction.",
        "cn": "如果你完全不尝试提升一个层次，就会感到厌倦，进而寻求安逸和消遣。"
      },
      {
        "en": "Both boredom and anxiety lead to disorder in the mind and remove you from the unfolding flow of evolution.",
        "cn": "无聊和焦虑都会导致内心混乱，使你脱离不断展开的进化之流。"
      },
      {
        "en": "Your life may seem okay, but everything feels dull and meaningless.",
        "cn": "你的生活看似还不错，但一切都显得平淡无奇、毫无意义。"
      },
      {
        "en": "That leads us into Channels – a way to combat disorder and make substantial progress.",
        "cn": "这便引出了“通道”这一概念——它是一种应对混乱、取得实质性进展的方法。"
      },
      {
        "img": "assets/covers/gr-human-3-0-a-map-to-reach-the-top-1-4.jpg",
        "cap": ""
      },
      {
        "en": "When you reach the Dissonance Phase of any Level, you gain the ability to leverage a “Channel.”",
        "cn": "当你达到任何等级的“不和谐阶段”时，你将获得利用“通道”的能力。"
      },
      {
        "en": "Think of a Channel as an exciting quest in a video game.",
        "cn": "不妨将“频道”看作是电子游戏中一场激动人心的冒险。"
      },
      {
        "en": "A rabbit hole of knowledge or skill.",
        "cn": "知识或技能的“兔子洞”。"
      },
      {
        "en": "When you can’t stop researching a topic or working on a project and time passes by surprisingly quick.",
        "cn": "当你沉迷于研究某个主题或投入某个项目而无法自拔时，时间竟会过得出奇地快。"
      },
      {
        "en": "On the Human 3.0 Graph, you can see that one end of the Channel is in the knowledge Trait while the other is in the skill Trait.",
        "cn": "在“人类 3.0 图谱”上，你可以看到，该通道的一端位于“知识”特质中，另一端则位于“技能”特质中。"
      },
      {
        "en": "Usually, a person becomes “obsessed” with learning or building, and that results in rapid experience gain moving them quickly toward their next Level of development within a specific quadrant.",
        "cn": "通常，一个人会“痴迷”于学习或创造，从而迅速积累经验，快速迈向特定象限内的下一个发展阶段。"
      },
      {
        "en": "First, you must reach the Dissonance phase after you fully acclimate to the Level you are in.",
        "cn": "首先，你必须在完全适应当前等级后，才能进入“不和谐”阶段。"
      },
      {
        "en": "Once you grow tired of where you are, and if you don’t become numb to your problems, you use your distaste as fuel to push into the unknown.",
        "cn": "一旦你对现状感到厌倦，而且没有对问题变得麻木，你就会将这份厌倦化作动力，去探索未知的领域。"
      },
      {
        "en": "You create an aim or vision or goal within a specific quadrant (like Body).",
        "cn": "你在某个特定领域（例如“身体”）内设定一个目标、愿景或目标。"
      },
      {
        "en": "You begin acquiring knowledge and skill.",
        "cn": "你开始掌握知识和技能。"
      },
      {
        "en": "You make mistakes and refine your aim.",
        "cn": "你会在犯错中不断调整目标。"
      },
      {
        "en": "You experiment enough until you find the Channel that you get sucked into.",
        "cn": "你不断尝试，直到找到那个让你沉迷其中的频道。"
      },
      {
        "en": "You can tell someone is in a Channel by how excited they are when they talk about it, like someone who has reached the point of writing a book where the words can’t stop flowing.",
        "cn": "你可以从一个人谈论某个领域时表现出的兴奋程度，判断他是否已沉浸其中——就像一位作家在写作过程中，笔尖的字句源源不断、停不下来那样。"
      },
      {
        "en": "Their skill and knowledge provide a sense of clarity that allows them to shoot forward in progress.",
        "cn": "他们的技能和知识带来一种清晰的认知，使他们能够在进步的道路上大步向前。"
      },
      {
        "en": "When you are in the Dissonance phase, the best advice I can give is to search for excitement and enthusiasm and pursue that without shame, because that shame signals a lower Level of Mind, and you can develop the skill of confidence during that process.",
        "cn": "当你处于“不和谐”阶段时，我能给你的最好建议就是去寻找兴奋感和热情，并毫不羞愧地去追求它们，因为这种羞愧感表明你的“心智层次”较低，而在这个过程中，你可以培养自信的能力。"
      },
      {
        "en": "There are certain tactics to force yourself into a Channel that we will call “Glitches” – like a glitch in the matrix, if the matrix were the boundaries of Level 1 and 2 until you create your own in Level 3.",
        "cn": "有一些策略可以迫使自己进入某个“通道”，我们将这些策略称为“故障”——就像《黑客帝国》中的“故障”一样，如果把第一层和第二层的边界比作“矩阵”，那么在第三层中，你将创造出属于自己的“矩阵”。"
      },
      {
        "en": "Psychedelics can force someone into a mystical experience.",
        "cn": "致幻剂可能会使人经历一种神秘体验。"
      },
      {
        "en": "PEDs can accelerate fitness progress.",
        "cn": "兴奋剂可以加快健身进度。"
      },
      {
        "en": "Moving into an apartment you can’t afford can provide a real deadline, forcing you to learn and do until you make your side business work.",
        "cn": "搬进一套你负担不起的公寓，会给你设定一个真正的最后期限，迫使你不断学习并付诸行动，直到把副业经营起来为止。"
      },
      {
        "en": "AI is the most recent and widely available Glitch that crosses into all domains.",
        "cn": "人工智能是最新且应用最广泛的“故障”现象，它已渗透到各个领域。"
      },
      {
        "en": "It can be used to self-develop or self-destruct rapidly.",
        "cn": "它可以用来快速自我发展，也可以用来快速自我毁灭。"
      },
      {
        "en": "Taste and discerment is required.",
        "cn": "这需要品味和鉴赏力。"
      },
      {
        "en": "AI is only pure good or pure evil from a limited perspective.",
        "cn": "从某种有限的角度来看，人工智能要么是纯粹的善，要么是纯粹的恶。"
      },
      {
        "en": "Be careful with these, as while they accelerate progress, they can be incredibly high risk.",
        "cn": "使用这些时要小心，因为虽然它们能加快进展，但风险可能极高。"
      },
      {
        "en": "For certain people with certain goals, they are smart.",
        "cn": "对于某些怀有特定目标的人来说，他们很聪明。"
      },
      {
        "en": "For most people, especially in Level 1, they are death sentences.",
        "cn": "对大多数人来说，尤其是第一级，这些无异于死刑判决。"
      },
      {
        "en": "Max out your “natural” potential so you have ample experience and don’t get one-shotted.",
        "cn": "充分发挥你的“天然”潜力，这样你就能积累丰富的经验，避免被一击必杀。"
      },
      {
        "en": "Knowledge and skill decrease risk.",
        "cn": "知识和技能能降低风险。"
      },
      {
        "en": "If you feel lost, you are probably in a Dissonance phase, and if you stick it out, you can find your next Channel and fall back in love with life.",
        "cn": "如果你感到迷茫，那你很可能正处于“不和谐”阶段；只要坚持下去，你就能找到下一个“通道”，并重新爱上生活。"
      },
      {
        "en": "In future letters and videos, we can use the Human 3.0 Graph to understand people (like Jordan Peterson, Andrew Tate, or Alan Watts), or to overcome problems in your life, like not being able to make money or find a partner.",
        "cn": "在今后的信件和视频中，我们可以利用“人类3.0图谱”来理解某些人（比如乔丹·彼得森、安德鲁·泰特或艾伦·瓦茨），或者解决你生活中的问题，比如无法赚钱或找不到伴侣。"
      },
      {
        "en": "If you have a specific request for a problem you’re facing or a person you want to understand, reply to this letter.",
        "cn": "如果您对正在面临的问题或想要了解的某个人有具体请求，请回复这封信。"
      },
      {
        "en": "In this model, I’ve included what are called Archetypes and Metatypes.",
        "cn": "在这个模型中，我纳入了所谓的“原型”和“元类型”。"
      },
      {
        "en": "Think of Metatypes as a sort of personality test, but for one’s self-development.",
        "cn": "不妨将“元类型”视为一种性格测试，只不过它是为了个人发展而设计的。"
      },
      {
        "en": "I’ll create a list of Metatypes for a future letter and an AI prompt so you can find your Metatype.",
        "cn": "我将整理一份元类型列表，用于日后的一封信和一个AI提示词，以便你能找到自己的元类型。"
      },
      {
        "en": "In the example above, I am only showing 3 archetypes within each quadrant.",
        "cn": "在上例中，我仅在每个象限内展示了3种原型。"
      },
      {
        "en": "There are many more than that, so please understand that these are not set in stone.",
        "cn": "实际情况远不止这些，因此请理解，这些内容并非一成不变。"
      },
      {
        "en": "I’m just having fun with these.",
        "cn": "我只是在玩玩这些而已。"
      },
      {
        "en": "You’ll notice that there is a general progression from low consciousness to high consciousness as someone develops themself within a quadrant:",
        "cn": "你会发现，当一个人在某个象限中进行自我发展时，其意识水平通常会从低到高逐步提升："
      },
      {
        "en": "NPC → Player → Creator in the Mind quadrant describes someone who stops living by the script they were assigned at birth, starts playing their own game, then creates new games to play (similar to “construct-level” awareness).",
        "cn": "“NPC → 玩家 → 心智中的创造者”这一象限描述了这样一种人：他们不再按照出生时被赋予的剧本生活，开始玩自己的游戏，随后又创造出新的游戏来玩（类似于“构建层面”的觉知）。"
      },
      {
        "en": "Incel → Chad → Sigma or Beta Male → Alpha Male → Sigma Male in the Body quadrant are common archetypes we see in today’s world that you can observe in one’s behavior and appearance.",
        "cn": "“Incel”→“查德”→“西格玛男性”或“贝塔男性”→“阿尔法男性”→“西格玛男性”（在“身体”象限中），这些是当今世界常见的原型，你可以从一个人的行为和外表中观察到它们。"
      },
      {
        "en": "This can correspond with other areas on the graph or have further causes within the same quadrant.",
        "cn": "这可能与图表中的其他区域相对应，也可能在同一象限内存在其他原因。"
      },
      {
        "en": "Like how an Incel typically has higher estrogen levels from diet and environment, and how social structures in the Vocation quadrant have led to processed food and microplastics, which further exacerbate that problem on a mass scale.",
        "cn": "就像“Incel”群体通常因饮食和环境因素导致雌激素水平较高一样，而“职业”象限中的社会结构又催生了加工食品和微塑料，这进一步在更大范围内加剧了这一问题。"
      },
      {
        "en": "Job → Career → Calling is one of many progressions in the Vocation quadrant.",
        "cn": "“工作 → 职业 → 使命”是“职业”象限中的众多发展路径之一。"
      },
      {
        "en": "Relating to work, this can start with anything nowadays.",
        "cn": "就工作而言，如今这可能从任何事情开始。"
      },
      {
        "en": "Some people may not even have a job, or they go into their calling early in life.",
        "cn": "有些人甚至可能没有工作，或者他们很早就投身于自己的志业。"
      },
      {
        "en": "The key insight about the progression through each level is that they start with low consciousness (Conformist) and have the ability to progress to high consciousness (Synthesist).",
        "cn": "关于各层级发展进程的关键见解在于：它们都始于低层次的意识（顺从者），并具备向高层次意识（综合者）发展的能力。"
      },
      {
        "en": "Religion → Atheism → Mysticism in the Spirit quadrant is a common pattern (not the only pattern) that we see in those raised in a strict religious household, leading to rebellion.",
        "cn": "宗教 → 无神论 → 精神象限中的神秘主义，这是我们在那些在严格宗教家庭中长大的人身上常见的模式（并非唯一模式），这种模式往往会导致叛逆。"
      },
      {
        "en": "Then they rediscover a new perspective on God and loop back around to the truths that were contained in Level 1.",
        "cn": "随后，他们重新发现了关于上帝的新视角，并回到了第一级所包含的真理之上。"
      },
      {
        "en": "Ken Wilber’s “pre-trans fallacy” occurs when people confuse pre-rational (Conformist) states with trans-rational (Synthesist) states because both appear “non-rational” from a conventional rational (Individualist) perspective.",
        "cn": "肯·威尔伯所说的“前-超谬误”是指，当人们将前理性（顺从型）状态与超理性（综合型）状态混为一谈时，就会出现这种情况，因为从传统的理性（个人主义）视角来看，这两者都显得“非理性”。"
      },
      {
        "en": "One can elevate a Level 1 primitive state to Level 3 status, and some often reduce genuine Level 3 development to being primitive thinking.",
        "cn": "人们可以将第1级的原始状态提升至第3级，而有些人却常常将真正的第3级发展贬低为原始思维。"
      },
      {
        "en": "In other words, a “bible thumper” with lack of knowledge and experience beyond their childhood conditioning finds it difficult to take a mystic seriously, when the mystic often holds the same truths, but from a more comprehensive perspective.",
        "cn": "换句话说，一个仅凭童年时期的灌输就自诩为“圣经狂热分子”、却缺乏知识和经验的人，往往难以认真对待一位神秘主义者——尽管这位神秘主义者所秉持的真理与前者并无二致，只是视角更为全面。"
      },
      {
        "en": "Of course, this is only one minor example of how developmental progression can play out in the Spirit quadrant.",
        "cn": "当然，这只是“精神象限”中发展进程可能呈现的众多表现形式中的一个微不足道的例子。"
      },
      {
        "en": "There are various patterns across personal relationships, sports, families, scientific or metaphysical beliefs, and more.",
        "cn": "在人际关系、体育、家庭、科学或形而上学的信仰等方面，都存在着各种各样的模式。"
      },
      {
        "en": "There are dozens to hundreds of archetypes within each quadrant, not just the three I displayed in each.",
        "cn": "每个象限中都包含数十至数百种原型，而不仅仅是我在每个象限中展示的那三种。"
      },
      {
        "en": "Now, for the example given above, when we plot points of development within each quadrant, level, phase, and trait, we gain a comprehensive understanding of where a certain individual lies.",
        "cn": "现在，以上面的例子为例，当我们在每个象限、层次、阶段和特质内标出发展点时，就能全面了解某个人所处的位置。"
      },
      {
        "en": "(You can see this in the opaque white shape on the map.)",
        "cn": "（您可以在地图上看到那个不透明的白色形状。）"
      },
      {
        "en": "Then, we can divide by the total amount by 12 (the total number of developmental slices on the graph), resulting in 2.0.",
        "cn": "然后，我们可以将总数除以12（即图表中发展的分段总数），结果为2.0。"
      },
      {
        "en": "In this example, we can create a description for their development within each quadrant as follows:",
        "cn": "在此示例中，我们可以针对每个象限内的开发情况编写如下描述："
      },
      {
        "en": "If we were to map more than just 3 Archetypes per quadrant, this would become a lot more complex and comprehensive, but we will save that for future letters.",
        "cn": "如果我们在每个象限中绘制超过3种原型，情况就会变得复杂得多且更全面，但这部分内容我们留待今后的信中再谈。"
      },
      {
        "en": "Now, if we take those descriptions and merge them into one, we get their Metatype.",
        "cn": "现在，如果我们将这些描述合并为一个，就会得到它们的元类型。"
      },
      {
        "en": "I plan to use AI for this because I don’t want things to be a static “personality test” that puts you in one of 16 generalized boxes.",
        "cn": "我打算用人工智能来实现这一点，因为我不希望它只是一个静态的“性格测试”，把你归入16种笼统的类型之一。"
      },
      {
        "en": "In this case, we can consider this person’s Metatype to be “The Outlier.” In brief, this is someone who has drifted away from mainstream patterns without rebellion, operating from a countercultural lens.",
        "cn": "在这种情况下，我们可以将此人的元类型视为“异类”。简而言之，这是一种既未曾反抗，又已偏离主流模式，并从反文化视角出发行事的人。"
      },
      {
        "en": "They don’t care about their appearance, but this may be False Transformation, as they lack experience in the Body quadrant.",
        "cn": "他们并不在意自己的外表，但这可能是“虚假蜕变”，因为他们在“身体”象限缺乏经验。"
      },
      {
        "en": "This is only the foundation of the Human 3.0 model, so we have a lot more nuance to unpack.",
        "cn": "这仅仅是“人类3.0”模型的基础，因此我们还有许多细节需要深入探讨。"
      },
      {
        "en": "Future-proof yourself with 2-4 premium guides, prompts, and strategies per month.",
        "cn": "每月获取 2 至 4 份优质指南、提示和策略，为未来做好准备。"
      },
      {
        "en": "Find meaning, reinvent yourself, and create your ideal future.",
        "cn": "寻找人生意义，重塑自我，创造你理想中的未来。"
      },
      {
        "en": "I am an author, creator, and founder.",
        "cn": "我是一名作家、创作者和创始人。"
      },
      {
        "en": "As a previous brand advisor for influencers and creators, I now teach writing, discovering your life’s work, and making a creative income.",
        "cn": "作为曾担任网红和内容创作者的品牌顾问，我现在主要教授写作、探索人生志业以及通过创意工作创造收入。"
      },
      {
        "en": "I dive deep into human potential, lifestyle design, and one-person businesses to give you a unique, digestible way of improving your life.",
        "cn": "我深入探讨人类潜能、生活方式设计以及个人创业，旨在为你提供一种独特且易于理解的生活改善之道。"
      },
      {
        "en": "Join 120,000+ changing their life with theory and practice about the mind, the internet, and the future.",
        "cn": "加入超过12万人的行列，通过关于心灵、互联网和未来的理论与实践，改变你的人生。"
      }
    ]
  },
  {
    "id": "gr-how-to-think-like-a-genius-the-map-of-all-know",
    "cat": "成长",
    "title": "How To Think Like A Genius (The Map Of All Knowledge)",
    "titleZh": "如何像天才一样思考（《所有知识地图》）",
    "source": "Dan Koe · 2025-06-26",
    "date": "2025-06-26",
    "minutes": 13,
    "url": "https://thedankoe.com/letters/how-to-think-like-a-genius-the-map-of-all-knowledge/",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/gr-how-to-think-like-a-genius-the-map-of-all-know.jpg",
    "paras": [
      {
        "en": "Join 120,000+ getting mindf*cked every Saturday morning while reading about the mind, the internet, and the future.",
        "cn": "加入超过12万人的行列，每周六早上一边阅读关于心灵、互联网和未来的内容，一边体验脑洞大开的阅读体验。"
      },
      {
        "en": "The mark of a free individual is that they get what they want in life.",
        "cn": "一个自由之人的标志在于，他们能获得自己想要的生活。"
      },
      {
        "en": "This requires them to learn how to learn, how to earn, and how to think.",
        "cn": "这要求他们学会如何学习、如何赚钱以及如何思考。"
      },
      {
        "en": "The last one – how to think – is the most important because your thoughts influence what you learn, how you act, and whether or not you can create a strategy that allows you to achieve the big goals that most people wouldn’t even think to achieve.",
        "cn": "最后一点——如何思考——最为重要，因为你的思维方式会影响你的学习内容、行为方式，以及你能否制定出一种策略，从而实现那些大多数人甚至连想都不敢想的宏伟目标。"
      },
      {
        "en": "In fact, you don’t want to be like most smart people.",
        "cn": "事实上，你并不想变得和大多数聪明人一样。"
      },
      {
        "en": "Smart people often aren’t that smart.",
        "cn": "聪明人往往并没有那么聪明。"
      },
      {
        "en": "They memorize facts to get a secure and high-paying job while overanalyzing the risk of doing what they want.",
        "cn": "他们死记硬背各种知识，只为找到一份稳定且高薪的工作，却对做自己想做的事情所面临的风险过度分析。"
      },
      {
        "en": "Dumb people often run laps around smart people because they take the stupid risks that shift the trajectory of their lives.",
        "cn": "愚蠢的人往往能把聪明人甩在身后，因为他们会冒那些愚蠢的风险，从而改变自己的人生轨迹。"
      },
      {
        "en": "That’s why most people end up in a life they hate and aren’t able to think of a way out.",
        "cn": "这就是为什么大多数人最终过着自己讨厌的生活，却想不出任何出路。"
      },
      {
        "en": "Their mind can’t sift through the overwhelm, anxiety, and stress so it continues to beat them down until they give up completely.",
        "cn": "他们的头脑无法梳理这些压倒性的情绪、焦虑和压力，于是这些情绪便不断将他们压垮，直到他们彻底放弃。"
      },
      {
        "en": "I’ve always admired the articulation of Jordan Peterson, the magic behind Alan Watts, and the clarity of Daniel Schmachtenberger.",
        "cn": "我一直很欣赏乔丹·彼得森的表达能力、艾伦·瓦茨背后的魔力，以及丹尼尔·施马赫滕贝格的思路清晰。"
      },
      {
        "en": "I want to share with you one of the most powerful models that has yet to be conceived.",
        "cn": "我想向大家介绍一种迄今尚未被构想出来、但最具影响力的模型之一。"
      },
      {
        "en": "It’s a synthesis of all of the world’s great philosophies, scientific discoveries, and psychological patterns that, if you spend enough time with it, will radically transform your life.",
        "cn": "这是对全世界所有伟大哲学、科学发现和心理模式的综合总结，只要你花足够的时间去钻研它，它就会彻底改变你的生活。"
      },
      {
        "en": "It doesn’t matter if you’re trying to figure out what you want to do with your life, become a spiritually enlightened monk, or build a billion-dollar company, this model will drastically shorten how quickly you can achieve those things.",
        "cn": "无论你是想弄清楚自己的人生方向，成为一名精神觉醒的僧侣，还是想创立一家市值十亿美元的公司，这个模型都能大幅缩短你实现这些目标所需的时间。"
      },
      {
        "en": "“I don’t have to agree with everything you say, but I should attempt at least to understand it, for the opposite of mutual understanding is, quite simply, war.”",
        "cn": "“我不必认同你说的每一句话，但我至少应该尝试去理解它，因为相互理解的反面，说到底，就是战争。”"
      },
      {
        "en": "This may sound obvious, but you have to think to solve a problem or achieve a goal.",
        "cn": "这听起来可能显而易见，但要想解决问题或实现目标，就必须动脑思考。"
      },
      {
        "en": "Sounds simple, but it’s incredibly complex.",
        "cn": "听起来很简单，但实际上极其复杂。"
      },
      {
        "en": "Most businesses fail because they don’t build a product that actually solves a problem.",
        "cn": "大多数企业之所以失败，是因为它们开发的产品无法真正解决问题。"
      },
      {
        "en": "Most relationships fail because problems are never identified.",
        "cn": "大多数感情之所以失败，是因为问题从未被发现。"
      },
      {
        "en": "Most people fail in general because they simply can’t see a way out of their situation.",
        "cn": "大多数人之所以会失败，通常是因为他们根本看不到摆脱当前困境的出路。"
      },
      {
        "en": "So, if you can improve your thinking, you can solve those problems or achieve those goals faster.",
        "cn": "因此，如果你能提升自己的思维能力，就能更快地解决这些问题或实现这些目标。"
      },
      {
        "en": "When you map that out over a 10-year timeline, it’s not difficult to see that you can achieve 10x more than most people do in their entire lifetime.",
        "cn": "如果你将这一目标规划在10年的时间跨度内，不难发现，你所能取得的成就将比大多数人一生中所取得的还要多10倍。"
      },
      {
        "en": "Let me introduce you to the AQAL model from Ken Wilber, an American Philosopher who made it his life’s work to synthesize all knowledge and experience into one comprehensive theory of everything.",
        "cn": "让我向大家介绍一下肯·威尔伯提出的AQAL模型。这位美国哲学家毕生致力于将所有知识和经验综合成一个包罗万象的万物理论。"
      },
      {
        "img": "assets/covers/gr-how-to-think-like-a-genius-the-map-of-all-know-1.jpg",
        "cap": ""
      },
      {
        "en": "While Wilber has stated that his model is not the end-all be-all, I can confidently say that this model is one of those “hidden gems” that most people don’t care about for the simple reason that they can’t see beyond their own worldview.",
        "cn": "尽管威尔伯曾表示他的模型并非万能之选，但我可以肯定地说，该模型正是那些“隐藏的瑰宝”之一——大多数人之所以不重视它，仅仅是因为他们无法跳出自身的世界观框架。"
      },
      {
        "en": "Wilber found, through decades of study and 3 year sabbaticals, that all knowledge and experience mapped into four interconnected quadrants:",
        "cn": "威尔伯通过数十年的研究和3年的学术休假发现，所有的知识和经验都可以划分为四个相互关联的象限："
      },
      {
        "en": "For becoming a genius-level thinker, the utility of this model is that when you are facing any form of challenge, you can systematically examine it from all four quadrants or perspectives.",
        "cn": "对于想要成为天才级思考者的人来说，该模型的实用之处在于：当你面临任何形式的挑战时，都可以从这四个象限或四个角度对挑战进行系统性的分析。"
      },
      {
        "en": "More importantly, most people only think from one quadrant and preach that as the “one true way.” Capitalists focus on the economic system, lower right.",
        "cn": "更重要的是，大多数人只从其中一个象限来思考，并将其宣扬为“唯一正确的道路”。资本主义者关注的是经济体系，即右下象限。"
      },
      {
        "en": "Scientific materialists focus on matter and behavior, upper right.",
        "cn": "科学唯物主义者关注物质和行为，见右上角。"
      },
      {
        "en": "Religions focus on shared faith, lower left.",
        "cn": "宗教注重共同的信仰，见左下角。"
      },
      {
        "en": "Stoics and Buddhists focus on the internal world, upper left.",
        "cn": "斯多葛学派和佛教徒关注内心世界，位于左上角。"
      },
      {
        "en": "The fact of the matter is that all of these perspectives are valid and overlapping.",
        "cn": "事实上，所有这些观点都是成立的，而且彼此之间存在重叠。"
      },
      {
        "en": "Locking yourself into one dogmatic worldview puts you in a box.",
        "cn": "把自己局限在一种教条式的世界观中，就会把自己困在框框里。"
      },
      {
        "en": "Certain problems are best solved from certain perspectives, and if you can’t access the right one, you will experience unnecessary pain in life.",
        "cn": "某些问题最好从特定的角度来解决，如果你无法找到正确的角度，生活就会变得多此一举地痛苦。"
      },
      {
        "en": "I think it’s safe to say that most people struggle to figure out what they want in life.",
        "cn": "我想可以肯定地说，大多数人都在为弄清楚自己的人生目标而苦恼。"
      },
      {
        "en": "That’s a hard problem that 90% of people get stuck on.",
        "cn": "这是一个难题，90%的人都会在这道题上卡住。"
      },
      {
        "en": "If you’ve heard of the Japanese concept of IKIGAI, think of the AQAL model like that, but on steroids, especially in this context.",
        "cn": "如果你听说过日本的“IKIGAI”概念，不妨把AQAL模型想象成它的加强版，尤其是在这个语境下。"
      },
      {
        "en": "Idiotic thinking is a conversation that turns into an argument and ends fast because you latch onto one answer.",
        "cn": "愚蠢的思维方式是指：一场对话演变成争论，却很快结束，因为你死守着一个答案不放。"
      },
      {
        "en": "Genius thinking is a conversation that accurately covers multiple perspectives and synthesizes their best parts into a clear solution.",
        "cn": "天才的思维是一种能够准确涵盖多种视角，并将这些视角的精华部分融合成一个清晰解决方案的对话。"
      },
      {
        "en": "To begin figuring out what we want out of life, we ask a series of questions within each quadrant in the map of all knowledge and experience.",
        "cn": "为了开始弄清楚我们对生活有何期待，我们会在“知识与经验全图”的每个象限内提出一系列问题。"
      },
      {
        "en": "Here are some examples I came up with (Note that this takes time.",
        "cn": "以下是我想出的几个例子（请注意，这需要时间。"
      },
      {
        "en": "By using this model, you turn the question of “what do I do with my life?” into a comprehensive map that reveals how your authentic self, actual capabilities, personal calling, economic realities, and cultural contexts all interplay.",
        "cn": "通过运用这一模型，你可以将“我该如何规划自己的人生？”这一问题转化为一张全面的地图，展现出你的真实自我、实际能力、个人使命、经济现实以及文化背景之间的相互作用。"
      },
      {
        "en": "Rather than ending up with the answer of “I don’t know” or “I’m not interested in anything,” you may end up with a few realizations.",
        "cn": "与其最终得到“我不知道”或“我对什么都不感兴趣”这样的答案，你可能会从中获得一些启发。"
      },
      {
        "en": "You might discover that the fear of disappointing your parents is hindering your authentic desires.",
        "cn": "你可能会发现，担心让父母失望这种恐惧正在阻碍你追求内心的真实愿望。"
      },
      {
        "en": "You might notice that you procrastinate on certain tasks (to remove from your life or delegate) while you can’t stop talking about other interesting tasks.",
        "cn": "你可能会发现，对于某些任务（应该从生活中剔除或委托他人处理），你会一再拖延，而对于其他有趣的任务，却总是不停地谈论。"
      },
      {
        "en": "You might realize that technology allows you to learn more, do more, and create a career path that wasn’t available in the recent past.",
        "cn": "你可能会意识到，科技让你能够学到更多、做更多，并开辟出一条在不久前还无法想象的职业道路。"
      },
      {
        "en": "Those are deep, life-changing realizations that you may not have come to on your own.",
        "cn": "这些是发人深省、足以改变人生的领悟，而这些领悟你可能无法靠自己去领悟。"
      },
      {
        "en": "You could say that what humans selected for are genetics selected for memetics—our genetics selected for radical neuroplasticity and the capacity to have much more significant software upgrades that could change our capacity without needing hardware upgrades.",
        "cn": "可以说，人类所选择的，其实是基因在模因学层面上所选择的——我们的基因所选择的，是极强的神经可塑性，以及进行更重大的“软件升级”的能力，这种升级无需“硬件升级”就能改变我们的能力。"
      },
      {
        "en": "It made so much sense that it felt like my mind had expanded into a new dimension of thinking.",
        "cn": "这道理太有道理了，让我感觉自己的思维仿佛拓展到了一个全新的维度。"
      },
      {
        "en": "We covered the “All Quadrants” portion of AQAL, but not the “All Levels” portion.",
        "cn": "我们已经讲到了AQAL中的“所有象限”部分，但尚未涉及“所有层次”部分。"
      },
      {
        "en": "All Levels refer to the developmental stages of consciousness that individuals and collectives can evolve through.",
        "cn": "“所有层次”指的是个人和集体能够经历的意识发展阶段。"
      },
      {
        "en": "When it comes to thinking like a genius, this is crucial because most life conflicts or “impossible” problems exist because people are operating from different levels.",
        "cn": "说到像天才一样思考，这一点至关重要，因为大多数生活中的冲突或“无法解决”的问题，都是由于人们所处的思维层次不同而产生的。"
      },
      {
        "en": "We’ve discussed this in depth before when discussing Spiral Dynamics and the 9 Stages of Ego development, so I want to focus on the 4 key levels that will change how you think about the world.",
        "cn": "我们之前在讨论“螺旋动力学”和“自我发展的9个阶段”时已经对此进行了深入探讨，因此我希望重点介绍这4个关键层次，它们将改变你对世界的看法。"
      },
      {
        "img": "assets/covers/gr-how-to-think-like-a-genius-the-map-of-all-know-2.jpg",
        "cap": ""
      },
      {
        "en": "These levels of development illustrate the dominant value systems of a person or culture.",
        "cn": "这些发展水平体现了个人或某种文化中占主导地位的价值体系。"
      },
      {
        "en": "In other words, these levels show what people, cultures, or systems hold as central and important, which influence the decisions that are made and how problems are perceived and solved.",
        "cn": "换句话说，这些层次反映了人们、文化或体系所视为核心和重要的内容，这些内容会影响决策的制定，以及对问题的认知和解决方式。"
      },
      {
        "en": "Most people reside in the first three, while very few – let’s call them geniuses for the sake of this letter – fall into the fourth.",
        "cn": "大多数人属于前三个类别，而极少数人——为了方便本文的表述，我们姑且称他们为“天才”——则属于第四类。"
      },
      {
        "en": "These individuals, cultures, or systems follow established authority and traditions.",
        "cn": "这些个人、文化或体系遵循既定的权威和传统。"
      },
      {
        "en": "Their thinking is black and white.",
        "cn": "他们的思维非黑即白。"
      },
      {
        "en": "There is only “one right way,” and that usually involves obeying a God or conforming to what is right and true.",
        "cn": "只有“唯一正确的方式”，而这通常意味着顺从上帝，或者遵循正确与真理。"
      },
      {
        "en": "They value science, individual achievement, and competition.",
        "cn": "他们重视科学、个人成就和竞争。"
      },
      {
        "en": "You can best identify this level in universities, corporate structures, and self-help teachings.",
        "cn": "在大学、企业组织以及自我提升课程中，最能体现这一层次。"
      },
      {
        "en": "People with a modern worldview are dogmatic about the fact that success should be based on merit and results.",
        "cn": "持有现代世界观的人坚信，成功应当基于才能和成果。"
      },
      {
        "en": "Postmodernists value relativistic thinking.",
        "cn": "后现代主义者推崇相对主义思维。"
      },
      {
        "en": "Include everyone and ensure they are equal.",
        "cn": "让每个人都参与进来，并确保他们享有平等的权利。"
      },
      {
        "en": "With each of these stages, there are good and bad parts, and in today’s world, postmodern thinking has gone pathological, resulting in things like DEI, gender politics, and attempting to dismantle all hierarchies, which is stupid and impossible.",
        "cn": "这些阶段各有优劣，而在当今世界，后现代思想已变得病态，从而催生了DEI、性别政治以及试图推翻所有等级制度等现象——这既愚蠢又不可能实现。"
      },
      {
        "en": "The critical piece of these first 3 stages is that they cannot hold multiple perspectives.",
        "cn": "这前三个阶段的关键在于，它们无法兼顾多种视角。"
      },
      {
        "en": "They are right and you are wrong.",
        "cn": "他们是对的，你是错的。"
      },
      {
        "en": "This makes it difficult for them to think outside of their stage, and even more difficult to solve personal and systemic problems that lead to beneficial progress for humanity.",
        "cn": "这使得他们难以跳出自己的局限去思考，更难以解决那些能够推动人类取得有益进步的个人和系统性问题。"
      },
      {
        "img": "assets/covers/gr-how-to-think-like-a-genius-the-map-of-all-know-3.jpg",
        "cap": ""
      },
      {
        "en": "With enough effort and development, you can reach the stage of second-tier thinking.",
        "cn": "只要付出足够的努力并不断发展，你就能达到“第二层次思维”的阶段。"
      },
      {
        "en": "At this stage, you are able to look backward and pull truths from all prior perspectives, opening up a world of complexity, systems thinking, and awareness.",
        "cn": "在这个阶段，你能够回顾过去，从所有先前的视角中提炼出真理，从而开启一个充满复杂性、系统思维和觉察力的世界。"
      },
      {
        "en": "It’s less about a black and white “I’m right and you’re wrong” and more about a nuanced “the best solution comes from a synthesis of all.” Authority is important, merit is important, equality is important, but many people can hold those contradictions in their minds long enough for them to be reconciled.",
        "cn": "这与其说是黑白分明的“我对，你错”，不如说是更富层次感的“最佳解决方案源于各方观点的融合”。权威很重要，功绩很重要，平等也很重要，但许多人能够将这些矛盾在脑海中并存足够长的时间，直至它们得以调和。"
      },
      {
        "en": "Genius thinkers understand that these are stages, not static identities you have for the rest of your life.",
        "cn": "天才们明白，这些只是人生的不同阶段，而不是你一生中一成不变的身份。"
      },
      {
        "en": "They often act as “translators” between different stages.",
        "cn": "它们通常在不同阶段之间充当“翻译”的角色。"
      },
      {
        "en": "If the problem is business related, they can put on the cap of a CEO and resolve it faster than someone who permanently wears the cap of a bible-thumper for clear reasons.",
        "cn": "如果问题与商业有关，他们可以戴上CEO的帽子，比那些出于显而易见的原因始终戴着“圣经狂热分子”帽子的人更快地解决它。"
      },
      {
        "en": "If the problem is in a personal relationship, mansplaining about female psychology may help, but it isn’t the best substitute for empathy, depending on the context.",
        "cn": "如果问题出在人际关系上，对女性心理进行“男性解释”或许会有帮助，但根据具体情况而定，这并不能完全替代共情。"
      },
      {
        "en": "If the problem is writing on social media to attract and help an audience of self-helpers, you must understand their psychology and the best way to navigate their mind to reach the next level of development.",
        "cn": "如果你的目标是通过社交媒体发文来吸引并帮助那些追求自我提升的人群，你就必须了解他们的心理，并掌握引导他们思维的最佳方式，从而帮助他们迈向更高层次的发展。"
      },
      {
        "en": "When it comes to figuring out what you want in life, accepting that you are in a modern stage of development can allow you to zoom out a layer, notice your shortcomings, and account for them when acting toward a better life.",
        "cn": "在思考自己的人生目标时，承认自己正处于现代发展阶段，能让你从更宏观的角度审视问题，察觉自身的不足，并在为追求更美好生活而行动时加以考量。"
      },
      {
        "en": "My challenge to you is to pursue this knowledge in your own time, by your own curiosity, because it will only enhance your ability to take control of your life.",
        "cn": "我希望你们能利用自己的时间，凭着自己的好奇心去探索这些知识，因为这只会增强你们掌控自己人生的能力。"
      },
      {
        "img": "assets/covers/gr-how-to-think-like-a-genius-the-map-of-all-know-4.jpg",
        "cap": ""
      },
      {
        "en": "Future-proof yourself with 2-4 premium guides, prompts, and strategies per month.",
        "cn": "每月获取 2 至 4 份优质指南、提示和策略，为未来做好准备。"
      },
      {
        "en": "Find meaning, reinvent yourself, and create your ideal future.",
        "cn": "寻找人生意义，重塑自我，创造你理想中的未来。"
      },
      {
        "en": "I am an author, creator, and founder.",
        "cn": "我是一名作家、创作者和创始人。"
      },
      {
        "en": "As a previous brand advisor for influencers and creators, I now teach writing, discovering your life’s work, and making a creative income.",
        "cn": "作为曾担任网红和内容创作者的品牌顾问，我现在主要教授写作、探索人生志业以及通过创意工作创造收入。"
      },
      {
        "en": "I dive deep into human potential, lifestyle design, and one-person businesses to give you a unique, digestible way of improving your life.",
        "cn": "我深入探讨人类潜能、生活方式设计以及个人创业，旨在为你提供一种独特且易于理解的生活改善之道。"
      },
      {
        "en": "Join 120,000+ changing their life with theory and practice about the mind, the internet, and the future.",
        "cn": "加入超过12万人的行列，通过关于心灵、互联网和未来的理论与实践，改变你的人生。"
      }
    ]
  },
  {
    "id": "gr-a-complete-knowledge-base-of-human-3-0",
    "cat": "成长",
    "title": "A Complete Knowledge Base Of HUMAN 3.0",
    "titleZh": "《HUMAN 3.0》完整知识库",
    "source": "Dan Koe · 2025-08-31",
    "date": "2025-08-31",
    "minutes": 51,
    "url": "https://thedankoe.com/letters/a-complete-knowledge-base-of-human-3-0/",
    "cover": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "gradient": "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
    "coverImg": "assets/covers/gr-a-complete-knowledge-base-of-human-3-0.jpg",
    "paras": [
      {
        "en": "Join 120,000+ getting mindf*cked every Saturday morning while reading about the mind, the internet, and the future.",
        "cn": "加入超过12万人的行列，每周六早上一边阅读关于心灵、互联网和未来的内容，一边体验脑洞大开的阅读体验。"
      },
      {
        "en": "I’ve been baffled by the responses everyone has had to it.",
        "cn": "大家对此的反应让我感到困惑。"
      },
      {
        "en": "So I feel like there’s something here.",
        "cn": "所以我觉得这里面有些门道。"
      },
      {
        "en": "In the Metatype prompt, I’ve had people respond that it brought them to tears.",
        "cn": "在“元类型”提示中，有人告诉我，这让他们感动得流下了眼泪。"
      },
      {
        "en": "I wanted to create a knowledge base for H3.0 that I could use to explore various topics and problems with AI.",
        "cn": "我想为 H3.0 创建一个知识库，以便通过它来探索人工智能领域的各种主题和问题。"
      },
      {
        "en": "30 hours of obsession later, I realized a vastly underutilized use case for AI, which is managing large swaths of knowledge that you already have.",
        "cn": "经过30个小时的沉迷探索后，我意识到人工智能有一个被严重低估的应用场景，那就是管理你已经拥有的海量知识。"
      },
      {
        "en": "I could spend 6 months rereading books and studies to find specific quotes like a needle in a haystack, or I could retrieve the exact information I need and work magic with it.",
        "cn": "我可以花6个月的时间重新阅读书籍和研究报告，像在草堆里找针一样寻找具体的引文；或者，我也可以直接获取我需要的准确信息，并用它施展魔法。"
      },
      {
        "en": "The foundational article about HUMAN 3.0 was my own mind’s synthesis of various models I’ve studied previously, but I wanted to see all the connections.",
        "cn": "关于“人类3.0”的那篇奠基性文章，是我对之前研究过的各种模型进行综合整理后的成果，但我希望能看到其中的所有关联。"
      },
      {
        "en": "I knew there was much, much more to the model than what could fit in a nice little article.",
        "cn": "我知道，这个模型所包含的内容远比一篇简短的文章所能涵盖的要多得多。"
      },
      {
        "en": "Now it feels like HUMAN 3.0 is coherent, meaningful, and built on top of theories that I believe are at the leading edge of mind, body, spirit, and vocation.",
        "cn": "现在我觉得“人类3.0”这一理念既连贯又富有深意，而且是建立在我认为处于身心、精神与职业领域最前沿的理论基础之上的。"
      },
      {
        "en": "I am not good at writing skimmable and condensed knowledge (I often can’t shut up about these things, I’ll save that for a book on this), so most of this is with the help of AI, although I have read over it at least 15 times and refined it with my own discernment.",
        "cn": "我不擅长撰写通俗易懂且简明扼要的知识内容（我常常对这些话题滔滔不绝，这部分内容我打算留到以后写书时再详细探讨），因此本文大部分内容是在人工智能的帮助下完成的，不过我已经通读了至少15遍，并根据自己的判断进行了润色。"
      },
      {
        "en": "If you liked the initial HUMAN 3.0 breakdown, I’d encourage you to read this.",
        "cn": "如果你喜欢最初那篇关于HUMAN 3.0的分析，我建议你读读这篇文章。"
      },
      {
        "en": "People think you don’t learn anything with AI, but I think this is the most connections I’ve made in my life between knowledge I’ve previously acquired.",
        "cn": "人们总以为使用人工智能就学不到什么东西，但我觉得，这反倒是我一生中将以往所学知识联系得最紧密的一次。"
      },
      {
        "en": "It was like reading a book that I was able to conjure based on my curiosity.",
        "cn": "这就像是在读一本我凭着好奇心凭空想象出来的书。"
      },
      {
        "en": "However, the primary use case for this knowledge base is to give it to AI and converse with it (paste it into a chat or a project in Claude).",
        "cn": "不过，该知识库的主要用途是将其提供给人工智能，以便与之进行对话（将其粘贴到Claude的聊天窗口或项目中）。"
      },
      {
        "en": "Feed it people you want to understand.",
        "cn": "把它给那些你想了解的人看。"
      },
      {
        "en": "Feed it your current sitaution and watch a path toward your potential reveal itself.",
        "cn": "向它输入你当前的状况，你就会看到通往你潜能的道路逐渐显现。"
      },
      {
        "en": "Copy and paste everything below into AI, or read it, and enjoy (it is very long):",
        "cn": "将以下全部内容复制粘贴到AI中，或者阅读一下，尽情享受吧（内容很长）："
      },
      {
        "en": "HUMAN 3.0 maps human development as systematic problem-solving across four fundamental life dimensions, through three developmental levels consisting of phases and other dynamics, allowing one to maximize their potential.",
        "cn": "“HUMAN 3.0”将人类发展视为贯穿四大基本生活维度的系统性问题解决过程，通过由各个阶段及其他动态要素构成的三个发展层次，帮助人们充分发挥自身潜能。"
      },
      {
        "en": "The Four Quadrants – Life dimensions/perspectives that must all be developed:",
        "cn": "“四大象限”——必须全面发展的生活维度/视角："
      },
      {
        "en": "The Three Levels – Stages of consciousness development within each quadrant:",
        "cn": "三个层次——每个象限内意识发展的阶段："
      },
      {
        "en": "Channels: Periods of intense, obsessive development in specific quadrants – natural acceleration periods that can compress years of growth into months.",
        "cn": "通道：特定象限中出现的一段段激烈而执着的开发期——这是自然的加速期，能够将数年的发展浓缩至数月之内。"
      },
      {
        "en": "Glitches: High-risk accelerants (psychedelics, AI, life crises) that can force rapid development but require strong foundation to integrate safely.",
        "cn": "“故障点”：高风险的催化剂（迷幻剂、人工智能、人生危机），它们虽能推动快速成长，但需要坚实的基础才能安全地将其整合。"
      },
      {
        "en": "Cross-Quadrant Effects: How development in one area cascades to others – both positive spirals (energy → connection → clarity → resources) and negative traps (poverty → stress → isolation → worse poverty).",
        "cn": "跨象限效应：某个领域的发展如何对其他领域产生连锁反应——既包括正向循环（能源 → 联结 → 清晰度 → 资源），也包括恶性循环（贫困 → 压力 → 孤立 → 更深的贫困）。"
      },
      {
        "en": "Lifestyle Archetypes: Common patterns of imbalanced development (Workaholic, Seeker, Optimizer, Athlete, Drifter, Specialist) and their transformation paths.",
        "cn": "生活方式原型：发展失衡的常见模式（工作狂、探索者、优化者、运动型、漂泊者、专家）及其蜕变之路。"
      },
      {
        "en": "Metatypes: How different quadrant combinations create recognizable types (Executive, Warrior Monk, Professor, Entrepreneur, etc.)",
        "cn": "元类型：不同的象限组合如何形成可识别的类型（高管、战士僧侣、教授、企业家等）"
      },
      {
        "en": "The model’s power lies in its practicality: identify your core problem, determine which quadrant is the constraint, apply minimum effective development, and let solutions cascade naturally.",
        "cn": "该模型的优势在于其实用性：找出核心问题，确定哪个象限是制约因素，采取最低限度的有效开发，并让解决方案自然地层层展开。"
      },
      {
        "en": "The goal is designing the right lifestyle – creating a life where work becomes play, health is default, relationships nourish, and meaning is abundant.",
        "cn": "目标是设计出理想的生活方式——创造一种生活，让工作变得像玩耍一样轻松，健康成为常态，人际关系充满滋养，且充满意义。"
      },
      {
        "en": "Before diving into individual development, we must understand the civilizational moment we’re in.",
        "cn": "在深入探讨个人发展之前，我们必须了解我们所处的文明发展阶段。"
      },
      {
        "en": "Daniel Schmachtenberger identifies our time as the “metacrisis”—not just one crisis but the interconnected web of all global crises driven by three generator functions.",
        "cn": "丹尼尔·施马赫滕贝格将我们所处的时代称为“元危机”——这不仅仅是一场危机，而是由三大驱动机制所推动、所有全球危机相互交织而成的网络。"
      },
      {
        "en": "A generator function is a deep structural pattern that creates surface-level problems.",
        "cn": "生成函数是一种深层结构模式，会引发表层问题。"
      },
      {
        "en": "Like a mathematical function that generates a sequence of numbers, these patterns generate the crises we see.",
        "cn": "就像一个生成数列的数学函数一样，这些模式催生了我们所看到的危机。"
      },
      {
        "en": "Treating symptoms without addressing generator functions is like mopping water while the faucet runs.",
        "cn": "只治症状而不解决病因，就像在水龙头开着的时候去擦地一样。"
      },
      {
        "en": "Flow Science Validation: Mihaly Csikszentmihalyi’s research on psychic entropy provides a psychological parallel – without ordering consciousness through engaged action, chaos naturally increases.",
        "cn": "流科学验证：米哈里·契克森米哈赖关于“心理熵”的研究提供了一个心理学上的类比——如果不通过积极行动来整饬意识，混乱就会自然加剧。"
      },
      {
        "en": "The metacrisis represents civilizational psychic entropy, where our collective attention has become disordered, creating systemic dysfunction.",
        "cn": "“元危机”代表着文明层面的心理熵，即我们的集体注意力已陷入混乱，从而导致了系统性失调。"
      },
      {
        "en": "The Assignment vs. Agency Crisis: Most of humanity operates on assignments—goals given by schools, employers, society—rather than self-generated purpose.",
        "cn": "“任务”与“能动性”的危机：人类的大多数人都是按照任务——即学校、雇主或社会赋予的目标——来行动的，而不是基于自我确立的宗旨。"
      },
      {
        "en": "This creates a civilization of low-agency individuals who perpetuate the very systems creating the metacrisis.",
        "cn": "这造就了一个由缺乏自主性的人组成的文明，而这些人却在不断维系着正是导致元危机的那些体系。"
      },
      {
        "en": "When humans follow assignments rather than creating their own path, they become tools that can be replaced, substrate that can be consumed, and rivalrous actors competing for programmed goals.",
        "cn": "当人类只是执行任务，而非开辟自己的道路时，他们便沦为可以被替换的工具、可以被消耗的资源，以及为预设目标而相互竞争的参与者。"
      },
      {
        "en": "Win-lose games where one party’s gain requires another’s loss.",
        "cn": "零和博弈，即一方的获益必然以另一方的损失为代价。"
      },
      {
        "en": "In rivalrous systems, actors compete for scarce resources or positions, creating destructive races.",
        "cn": "在竞争性系统中，参与者为争夺稀缺资源或职位而相互竞争，从而引发破坏性的竞争。"
      },
      {
        "en": "Flow Science Insight: Research shows that flow states naturally create anti-rivalrous dynamics.",
        "cn": "《流动科学洞见》：研究表明，流动状态会自然形成一种非竞争性的动态。"
      },
      {
        "en": "When in flow, people shift from extrinsic competition to intrinsic satisfaction.",
        "cn": "当处于“心流”状态时，人们会从外在的竞争转向内在的满足感。"
      },
      {
        "en": "Csikszentmihalyi found that cultures with more flow activities show greater cooperation and reduced zero-sum thinking.",
        "cn": "奇克森特米哈伊发现，拥有更多“心流”活动的文化中，合作程度更高，零和思维则更少。"
      },
      {
        "en": "The Self-Monetization Principle: When individuals solve their own problems and sell the solutions, they create anti-rivalrous dynamics.",
        "cn": "“自我变现原则”：当个人解决自身问题并出售解决方案时，便会产生非竞争性动态。"
      },
      {
        "en": "Your success literally depends on others’ success because you’re helping them solve problems you’ve already overcome.",
        "cn": "你的成功在某种意义上确实取决于他人的成功，因为你正在帮助他们解决那些你已经克服的问题。"
      },
      {
        "en": "This “you are the niche” approach naturally evolves beyond competition.",
        "cn": "这种“你就是细分市场”的做法自然会超越竞争。"
      },
      {
        "en": "When complex systems consume the foundations they depend on faster than those foundations regenerate.",
        "cn": "当复杂系统消耗其赖以生存的基础的速度，超过了这些基础自我更新的速度时。"
      },
      {
        "en": "The “substrate” is what something needs to exist—soil for plants, attention for media, trust for markets.",
        "cn": "所谓“基质”，就是某物存在所必需的条件——对植物而言是土壤，对媒体而言是关注，对市场而言是信任。"
      },
      {
        "en": "Attention as Psychic Energy: Csikszentmihalyi’s concept of attention as “psychic energy” – the fundamental resource that shapes experience – reveals why attention economy substrate consumption is so damaging.",
        "cn": "注意力作为心理能量：契克森米哈赖将注意力视为“心理能量”——这种塑造体验的基本资源——这一概念揭示了为何“注意力经济”中的底层资源消耗会造成如此大的危害。"
      },
      {
        "en": "We literally deplete our capacity to order consciousness.",
        "cn": "我们实际上耗尽了将意识进行有序组织的能力。"
      },
      {
        "en": "The Work Evolution Solution: The progression from Job (survival mechanism) → Career (development path) → Calling (work you can’t pull away from) addresses substrate consumption by transforming work from extraction to regeneration.",
        "cn": "“工作进化解决方案”：从“工作”（生存机制）→“职业”（发展路径）→“使命”（无法割舍的工作）这一演进过程，通过将工作从“资源榨取”转变为“资源再生”，解决了资源消耗的问题。"
      },
      {
        "en": "When work becomes calling, it generates rather than depletes energy.",
        "cn": "当工作成为使命时，它会带来能量，而不是消耗能量。"
      },
      {
        "en": "Tools and systems that improve themselves at accelerating rates, outpacing human wisdom and institutional adaptation.",
        "cn": "那些以不断加快的速度自我完善的工具和系统，其发展速度已超越人类的智慧和制度的适应能力。"
      },
      {
        "en": "Each generation of technology enables the next, creating exponential curves.",
        "cn": "每一代技术都为下一代技术铺平道路，从而形成指数增长曲线。"
      },
      {
        "en": "The Complexity-Technology Gap: Csikszentmihalyi’s complexity theory (differentiation + integration = growth) shows why exponential technology becomes dangerous – our consciousness complexity grows linearly while technology grows exponentially, creating an ever-widening wisdom gap.",
        "cn": "复杂性与技术之间的鸿沟：契克森米哈赖的复杂性理论（分化＋整合＝成长）揭示了指数级技术为何会变得危险——我们的意识复杂性呈线性增长，而技术却呈指数级增长，从而造成了日益扩大的智慧鸿沟。"
      },
      {
        "en": "Writing as Meta-Skill: In an age of exponential tech, writing becomes the fundamental human skill—it teaching how to think, how to learn, and how to earn.",
        "cn": "写作作为元技能：在技术呈指数级发展的时代，写作已成为人类的一项基本技能——它教会我们如何思考、如何学习以及如何谋生。"
      },
      {
        "en": "As AI makes technical skills commoditized, the ability to think clearly (through writing) and create coherent narratives becomes irreplaceable.",
        "cn": "随着人工智能使技术技能变得司空见惯，通过写作进行清晰思考以及构建连贯叙事的能力变得不可替代。"
      },
      {
        "en": "Without fundamental change, these dynamics push civilization toward two outcomes:",
        "cn": "如果不进行根本性的变革，这些动态将把文明推向两种结局："
      },
      {
        "en": "Catastrophic Collapse: Ecological breakdown, nuclear war, unaligned AI, bioweapons, or cascading infrastructure failure",
        "cn": "灾难性崩溃：生态崩溃、核战争、失控的人工智能、生物武器，或基础设施的连锁故障"
      },
      {
        "en": "Dystopian Control: Total surveillance, digital authoritarianism, permanent inequality, or loss of human agency to AI systems",
        "cn": "反乌托邦式控制：全面监控、数字威权主义、永久性不平等，或是人类自主性被人工智能系统剥夺"
      },
      {
        "en": "Anti-rivalrous dynamics go beyond “win-win” (positive-sum).",
        "cn": "非竞争性动态超越了“双赢”（正和）的范畴。"
      },
      {
        "en": "In anti-rivalrous systems, your success literally requires my success—we’re structurally coupled for mutual thriving.",
        "cn": "在非竞争性系统中，你的成功实际上离不开我的成功——我们从结构上紧密相连，彼此依存，共同繁荣。"
      },
      {
        "en": "The window for creating this third option—an anti-rivalrous, regenerative civilization—is rapidly narrowing.",
        "cn": "创造这一第三种选择——一个非竞争性、具有再生能力的文明——的时机正在迅速缩小。"
      },
      {
        "en": "HUMAN 3.0 isn’t about personal optimization for competitive advantage—that’s part of the problem.",
        "cn": "“HUMAN 3.0”并非旨在通过个人优化来获取竞争优势——这恰恰是问题的一部分。"
      },
      {
        "en": "It’s about developing the multidimensional capacities necessary to participate in humanity’s phase transition.",
        "cn": "这关乎培养参与人类阶段性转型所需的多维度能力。"
      },
      {
        "en": "Every person who develops real sovereignty, wisdom, and integration contributes to the possibility of a viable future.",
        "cn": "每一个发展出真正的主权、智慧和整体性的人，都在为创造一个充满希望的未来贡献力量。"
      },
      {
        "en": "We’re in a race between human development and civilizational collapse.",
        "cn": "我们正处于人类发展与文明崩溃之间的赛跑之中。"
      },
      {
        "en": "This guide provides a practical framework for that development.",
        "cn": "本指南为此项发展提供了一个切实可行的框架。"
      },
      {
        "en": "Human development is not linear progress in isolated domains but an interconnected evolution across four fundamental dimensions of existence.",
        "cn": "人类的发展并非孤立领域中的线性进步，而是贯穿存在四大基本维度的相互关联的演进。"
      },
      {
        "en": "Most suffering stems from partial development—excellence in one area while others atrophy.",
        "cn": "大多数痛苦源于发展不均衡——某个领域表现卓越，而其他领域却日渐萎缩。"
      },
      {
        "en": "HUMAN 3.0 provides a map for systematic problem-solving across all life domains, creating integrated development where each dimension supports rather than sacrifices the others.",
        "cn": "《HUMAN 3.0》为跨所有生活领域的系统性问题解决提供了蓝图，从而实现综合发展，使各个维度相互支持，而非相互牺牲。"
      },
      {
        "en": "Performance Foundation: Steven Kotler’s research with the Flow Research Collective has studied thousands of high performers from diverse fields.",
        "cn": "《表现力基础》：史蒂文·科特勒与“心流研究集体”合作开展的研究，对来自不同领域的数千名高绩效者进行了深入研究。"
      },
      {
        "en": "While specific performance improvements vary widely by domain and measurement method, his work consistently shows that flow states significantly enhance performance.",
        "cn": "虽然具体表现的提升因领域和测量方法的不同而差异很大，但他的研究始终表明，心流状态能显著提升表现。"
      },
      {
        "en": "McKinsey’s research found that executives report being up to 5x more productive in flow.",
        "cn": "麦肯锡的研究发现，高管们表示，在进入“心流”状态时，其工作效率最高可达平时的5倍。"
      },
      {
        "en": "DARPA-funded research on accelerated learning showed substantial improvements in skill acquisition speed.",
        "cn": "由美国国防高级研究计划局（DARPA）资助的关于加速学习的研究表明，技能掌握速度有了显著提高。"
      },
      {
        "en": "Creative problem-solving tasks show marked improvement in flow states, though exact percentages depend on the specific study and metrics used.",
        "cn": "在解决创造性问题的任务中，进入“心流状态”的比例显著提高，不过具体百分比取决于具体的研究及所采用的衡量标准。"
      },
      {
        "en": "Most importantly, Kotler’s identification of flow triggers provides a systematic approach to accessing these states rather than leaving them to chance.",
        "cn": "最重要的是，科特勒对“心流”触发因素的识别，为进入这些状态提供了一种系统的方法，而不是将它们交给运气。"
      },
      {
        "en": "His emphasis on the “challenge-skills sweet spot” – where challenge slightly exceeds current ability – aligns with Human 3.0’s phase system and Csikszentmihalyi’s original flow model.",
        "cn": "他所强调的“挑战与技能的黄金平衡点”——即挑战程度略高于当前能力——与《人类3.0》的阶段体系以及契克森米哈赖的原始“心流”模型相契合。"
      },
      {
        "en": "Developmental Psychology Validation: The Human 3.0 level system aligns with multiple validated developmental frameworks.",
        "cn": "发展心理学验证：“人类3.0”分级体系与多个经过验证的发展框架相一致。"
      },
      {
        "en": "Clare Graves’ research spanning 30 years and thousands of subjects, which became Spiral Dynamics, demonstrates that human consciousness evolves through predictable stages from survival-based (Beige/Purple) through conformist (Blue) to achievement (Orange) to integral (Yellow/Turquoise).",
        "cn": "克莱尔·格雷夫斯历时30年、涵盖数千名受试者的研究——即“螺旋动力学”理论——表明，人类意识会按照可预测的阶段从生存型（米色/紫色）演进到顺从型（蓝色），再到成就型（橙色），最终达到整体型（黄色/绿松石色）。"
      },
      {
        "en": "Susanne Cook-Greuter’s 9 stages of ego development, based on Jane Loevinger’s 50+ years of sentence completion test data from over 10,000 subjects, confirms that only 5% of adults reach autonomous stages (Level 3.0 equivalent) and less than 1% reach unitive stages (Level 4.0).",
        "cn": "苏珊娜·库克-格鲁特（Susanne Cook-Greuter）提出的自我发展九阶段理论，基于简·洛文格（Jane Loevinger）50多年间对超过10,000名受试者进行的句子补全测试数据，证实只有5%的成年人能达到自主阶段（相当于3.0级），而达到合一阶段的则不到1% （4.0级）。"
      },
      {
        "en": "Maslow’s hierarchy, though often misrepresented as rigid, actually showed through his studies of self-actualizing individuals that higher needs emerge naturally once lower needs are reasonably satisfied – not perfectly met but “good enough.” These convergent findings from independent research streams validate that human development follows predictable patterns,",
        "cn": "马斯洛的需求层次理论虽然常被误解为僵化，但他通过对自我实现个体的研究实际上表明，一旦较低层次的需求得到合理满足——并非完美满足，而是“足够好”——更高层次的需求就会自然而然地涌现。来自独立研究领域的这些趋同发现证实，人类发展遵循可预测的模式，"
      },
      {
        "en": "that higher stages are genuinely more complex (not just different), and that integrated development across domains is both possible and measurable.",
        "cn": "即更高阶段确实更为复杂（而不仅仅是不同），而且跨领域的综合发展既可行又可衡量。"
      },
      {
        "en": "The Problem-as-Path Philosophy: Problems are the limits on your potential.",
        "cn": "“问题即道路”哲学：问题是你潜能的局限。"
      },
      {
        "en": "When you solve problems and remove your limits, you become more complex.",
        "cn": "当你解决问题并突破自身局限时，你会变得更加复杂。"
      },
      {
        "en": "This is the fundamental mechanism of development.",
        "cn": "这就是发展的根本机制。"
      },
      {
        "en": "Every problem solved reveals the next problem, creating an infinite game of growth.",
        "cn": "每一个问题的解决都会揭示下一个问题，从而形成一场无限的成长游戏。"
      },
      {
        "en": "Problems aren’t obstacles to happiness; they’re the source of it.",
        "cn": "问题并不是幸福的障碍，而是幸福的源泉。"
      },
      {
        "en": "The quality of your life is determined by the quality of problems you’re solving.",
        "cn": "你生活质量的高低，取决于你所解决的问题的质量。"
      },
      {
        "en": "The Anti-Vision Principle: Your anti-vision—the life you don’t want—often provides clearer initial direction than positive vision.",
        "cn": "“反愿景原则”：你的“反愿景”——即你不想要的生活——往往比积极的愿景更能为你提供更清晰的初步方向。"
      },
      {
        "en": "Start by identifying what you absolutely refuse to accept, then work backward to solutions.",
        "cn": "首先确定你绝对无法接受的事情，然后倒推寻找解决方案。"
      },
      {
        "en": "Metacrisis Connection: The rivalrous dynamics driving our civilization toward collapse are perpetuated by partial development.",
        "cn": "“元危机”关联：推动我们的文明走向崩溃的竞争性动态，正因片面发展而持续存在。"
      },
      {
        "en": "High-achieving but emotionally immature leaders make catastrophic decisions.",
        "cn": "成绩斐然但情感上不成熟的领导者会做出灾难性的决策。"
      },
      {
        "en": "Spiritually advanced but systemically naive people can’t scale solutions.",
        "cn": "在精神层面很成熟但在系统层面却很天真的人，无法将解决方案推广到更大范围。"
      },
      {
        "en": "Physically optimized but cognitively captured individuals spread misinformation.",
        "cn": "那些身体状况良好但思维受困的人会传播虚假信息。"
      },
      {
        "en": "Only integrated development can break these patterns.",
        "cn": "只有综合发展才能打破这些模式。"
      },
      {
        "en": "The Autotelic Personality Solution: Csikszentmihalyi discovered that individuals with “autotelic personalities” – those who can transform any situation into an opportunity for flow – naturally develop across domains.",
        "cn": "“自足型人格”的解决方案：奇克森特米哈伊发现，“自足型人格”者——即那些能够将任何情况转化为进入“心流”状态机会的人——会在各个领域中自然而然地发展起来。"
      },
      {
        "en": "Autotelic literally means “self-directed” or “having purpose in itself.” These individuals don’t need external rewards; they find intrinsic satisfaction in growth itself.",
        "cn": "“Autotelic”字面意思是“自我导向”或“具有内在目的”。这类人不需要外部奖励；他们从成长本身中获得内在的满足感。"
      },
      {
        "en": "This personality type can be cultivated and represents the antidote to single-domain fixation.",
        "cn": "这种性格类型是可以培养的，也是克服单一领域固化的良方。"
      },
      {
        "en": "The Material-Immaterial Bridge: Material is a portal into the immaterial.",
        "cn": "“物质与非物质之桥”：物质是通向非物质世界的门户。"
      },
      {
        "en": "Starting with “superficial” goals (money, fitness, status) isn’t wrong—it’s often the only entry point.",
        "cn": "从“肤浅”的目标（金钱、健康、地位）入手并没有错——这往往是唯一的切入点。"
      },
      {
        "en": "Like lifting weights, you start for vanity, stay for therapy, and develop philosophical mastery.",
        "cn": "就像举重一样，起初是为了虚荣，后来是为了疗愈，最终则达到了哲学境界。"
      },
      {
        "en": "Judge the starting point and you eliminate the journey.",
        "cn": "若只关注起点，便无从谈起这段旅程。"
      },
      {
        "en": "Metacrisis Relevance: Single-domain excellence creates the very imbalances driving civilizational crisis.",
        "cn": "与“元危机”的相关性：单一领域的卓越恰恰会造成导致文明危机的失衡。"
      },
      {
        "en": "Wall Street traders optimizing for profit destroy the biosphere.",
        "cn": "华尔街交易员为了追求利润而进行的优化行为正在破坏生物圈。"
      },
      {
        "en": "Spiritual teachers preaching transcendence while ignoring economic systems enable continued extraction.",
        "cn": "那些宣扬超越却忽视经济体系的灵性导师，助长了剥削的持续存在。"
      },
      {
        "en": "We need models that develop all dimensions simultaneously.",
        "cn": "我们需要能够同时发展所有维度的模型。"
      },
      {
        "en": "Metacrisis Relevance: Exponential technology is one of the three generator functions.",
        "cn": "与“元危机”的相关性：指数级技术是三大生成函数之一。"
      },
      {
        "en": "Models that don’t account for AI, social media manipulation, and other exponential tech cannot navigate our current reality.",
        "cn": "那些未将人工智能、社交媒体操纵及其他呈指数级发展的技术纳入考虑的模型，无法应对我们当前的现实。"
      },
      {
        "en": "We need frameworks that help us maintain sovereignty while using these powerful tools.",
        "cn": "我们需要一些框架，帮助我们在使用这些强大工具的同时维护主权。"
      },
      {
        "en": "Modern life demands simultaneous excellence across domains.",
        "cn": "现代生活要求人们在各个领域同时表现出色。"
      },
      {
        "en": "You can’t meditate away bankruptcy, supplement away loneliness, or hustle away existential dread.",
        "cn": "你无法通过冥想摆脱破产，无法靠补充营养驱散孤独，也无法靠拼命工作消除存在主义的焦虑。"
      },
      {
        "en": "Problems in one quadrant cascade into others.",
        "cn": "一个象限出现的问题会连锁反应到其他象限。"
      },
      {
        "en": "Solutions in one quadrant unlock others.",
        "cn": "一个象限中的解决方案将开启其他象限。"
      },
      {
        "en": "The Unignorability of Money: A truth most developmental models avoid: money determines almost every action in modern life, whether conscious or not.",
        "cn": "金钱不可忽视：这是大多数发展模型都避而不谈的一个事实：无论是有意识还是无意识，金钱几乎决定了现代生活的每一项行动。"
      },
      {
        "en": "Demonizing money doesn’t free you from its influence, it traps you into the very company you despise.",
        "cn": "将金钱妖魔化并不能让你摆脱它的影响，反而会让你深陷于你所鄙视的处境之中。"
      },
      {
        "en": "The path is through, not around: develop financial capacity to free attention for higher development.",
        "cn": "道路在于直通，而非绕行：提升财务能力，从而腾出精力追求更高层次的发展。"
      },
      {
        "en": "Metacrisis Application: The interconnected nature of global crises mirrors the interconnected nature of personal development.",
        "cn": "“元危机”应用：全球危机的相互关联性，恰如个人发展的相互关联性。"
      },
      {
        "en": "Climate change affects economy affects mental health affects relationships affects ability to respond to climate change.",
        "cn": "气候变化影响经济，经济影响心理健康，心理健康影响人际关系，人际关系又影响应对气候变化的能力。"
      },
      {
        "en": "Similarly, improving physical health increases mental clarity enables better decisions creates resources for further development.",
        "cn": "同样，改善身体健康能增强思维清晰度，从而有助于做出更明智的决策，并为进一步发展创造条件。"
      },
      {
        "en": "Each iteration increases capacity for handling complexity.",
        "cn": "每次迭代都会增强处理复杂性的能力。"
      },
      {
        "en": "A Level 3 individual doesn’t have fewer problems—they have more interesting problems.",
        "cn": "3级的人并不是遇到的问题更少——而是遇到的问题更有趣。"
      },
      {
        "en": "The Complexity Formula: Csikszentmihalyi’s research provides the mathematical foundation: Complexity = Differentiation + Integration.",
        "cn": "复杂性公式：契克森米哈赖的研究为此提供了数学基础：复杂性 = 差异化 + 整合。"
      },
      {
        "en": "Each problem-solving cycle increases differentiation (new skills, perspectives) and requires integration (connecting new capacities with existing ones).",
        "cn": "每一个问题解决周期都会促进差异化（新技能、新视角），同时也需要整合（将新能力与现有能力相结合）。"
      },
      {
        "en": "This formula explains why Level 3 individuals handle greater complexity – they’ve developed more differentiated skills AND integrated them into a coherent whole.",
        "cn": "该公式解释了为什么第3级人员能够应对更复杂的任务——他们不仅培养了更细致的技能，还将这些技能整合成了一个有机整体。"
      },
      {
        "en": "Nature’s Compass: The navigation between secure and insecure, known and unknown, that drives all development.",
        "cn": "自然的指南针：在“安全”与“不安全”、“已知”与“未知”之间穿行，这正是推动一切发展的动力。"
      },
      {
        "en": "Like a ship heading toward a lighthouse in a storm, we progress through trial and error, constantly course-correcting toward our destination.",
        "cn": "就像一艘在风暴中驶向灯塔的船，我们通过反复尝试和失败不断前进，不断调整航向，朝着目的地前进。"
      },
      {
        "en": "Metacrisis Framework: Humanity is in the Chaos phase at civilizational scale.",
        "cn": "“元危机”框架：从文明层面来看，人类正处于“混沌”阶段。"
      },
      {
        "en": "Our complicated technological civilization has created complexity beyond our current capacity to manage.",
        "cn": "我们复杂的技术文明所造成的复杂性，已经超出了我们目前的管理能力。"
      },
      {
        "en": "The solution isn’t returning to simplicity (impossible with 8 billion people) but evolving to a higher order that can handle this complexity—what Schmachtenberger calls the “third attractor.”",
        "cn": "解决之道并非回归简单（在80亿人口的情况下这根本不可能），而是向更高层次演进，以应对这种复杂性——施马赫滕贝格将其称为“第三吸引子”。"
      },
      {
        "en": "Instead of becoming world-class in one area while remaining infantile in others, HUMAN 3.0 advocates for synchronized development—not through forced balance but through strategic problem-solving that creates natural integration.",
        "cn": "“HUMAN 3.0”主张的是各领域同步发展，而不是在某一领域达到世界一流水平的同时，其他领域却仍停留在初级阶段——这种同步发展并非通过强行平衡来实现，而是通过战略性的问题解决，从而形成自然的融合。"
      },
      {
        "en": "The Developmental Arc: Human consciousness evolves through interaction with techno-economic conditions.",
        "cn": "发展轨迹：人类意识通过与技术经济条件的互动而演进。"
      },
      {
        "en": "Each individual’s growth through Human 3.0 levels recapitulates humanity’s 200,000-year journey—what took millennia collectively can be traversed in decades individually.",
        "cn": "每个人通过“人类3.0”各阶段的成长，重现了人类20万年的发展历程——人类集体历经数千年才走过的路，个人只需数十年即可走完。"
      },
      {
        "en": "The Axial Age Insight (800-200 BCE): Buddha, Socrates, Confucius, and Lao Tzu demonstrated Level 3.0 consciousness was possible even within agrarian societies—proving individual liberation could transcend collective conditions.",
        "cn": "“轴心时代”的洞见（公元前800—200年）：佛陀、苏格拉底、孔子和老子证明，即使在农业社会中，3.0级意识也是可能的——这证明了个体的解脱可以超越集体的局限。"
      },
      {
        "en": "The Current Transition Crisis: We’re between worlds—Industrial/Informational consciousness created the metacrisis through rivalrous dynamics, while Integral-Planetary consciousness remains rare (perhaps 5% at Level 3.0, less than 1% at Level 4.0).",
        "cn": "当前的转型危机：我们正处于两个世界之间——工业/信息意识通过竞争性动态引发了元危机，而整体-行星意识仍属罕见（在3.0级中约占5%，在4.0级中不足1%）。"
      },
      {
        "en": "Most humanity remains at Blue/traditional (Level 1.0) or Orange/modern (Level 2.0), creating our “culture wars.”",
        "cn": "大多数人类仍停留在蓝色/传统（1.0级）或橙色/现代（2.0级）阶段，这导致了我们的“文化战争”。"
      },
      {
        "en": "Why This Matters Now: Previous consciousness transitions happened unconsciously over centuries.",
        "cn": "为何这在当下尤为重要：以往的意识转型都是在几个世纪的时间里无意识地发生的。"
      },
      {
        "en": "The metacrisis demands we consciously evolve within single lifetimes.",
        "cn": "“元危机”要求我们在单次生命周期内有意识地进化。"
      },
      {
        "en": "We have the maps (developmental psychology), tools (flow triggers, channels), and urgency (existential risk) to accelerate development.",
        "cn": "我们拥有加速发展的蓝图（发展心理学）、工具（流动触发点、渠道）以及紧迫感（生存风险）。"
      },
      {
        "en": "Individual growth isn’t personal improvement—it’s participating in humanity’s phase transition.",
        "cn": "个人的成长并非个人进步——而是参与人类的相变。"
      },
      {
        "en": "The four fundamental domains/perspectives of human existence that must be developed in parallel.",
        "cn": "人类存在的四个基本领域/视角，必须同步发展。"
      },
      {
        "en": "These quadrants provide a complete map of human experience – interior/exterior and individual/collective.",
        "cn": "这四个象限勾勒出了人类体验的完整图景——内在与外在、个体与集体。"
      },
      {
        "en": "Neurobiological Basis: Modern neuroscience reveals the Mind quadrant operates through specific brain networks.",
        "cn": "神经生物学基础：现代神经科学揭示，“心智”象限是通过特定的大脑网络来运作的。"
      },
      {
        "en": "During peak mental performance, we see transient hypofrontality – the prefrontal cortex downregulates, reducing self-criticism and enabling breakthrough insights.",
        "cn": "在思维表现达到巅峰时，我们会观察到一过性前额叶功能减弱——前额叶皮层活动减弱，从而减少自我批判，并促成突破性的洞见。"
      },
      {
        "en": "This is accompanied by a cascade of neurochemicals: dopamine (pattern recognition), norepinephrine (focus), and anandamide (lateral connections).",
        "cn": "与此同时，一系列神经化学物质随之释放：多巴胺（模式识别）、去甲肾上腺素（专注力）和阿南达胺（侧向连接）。"
      },
      {
        "en": "The Writing Connection: Writing is the meta-skill for Mind quadrant development.",
        "cn": "写作的关联：写作是“思维”象限发展的元技能。"
      },
      {
        "en": "It forces clarity, reveals gaps in understanding, and creates external memory for complex thoughts.",
        "cn": "它能促使思路清晰，揭示理解中的不足，并为复杂的思考建立外部记忆。"
      },
      {
        "en": "“Writing is how you explore idea space when pure thinking falls flat.” The act of writing literally rewires neural pathways, strengthening metacognition and abstract reasoning.",
        "cn": "“当纯粹的思考陷入僵局时，写作便是探索思想空间的方式。”写作这一行为从字面上来说会重塑神经通路，从而增强元认知和抽象推理能力。"
      },
      {
        "en": "Flow Triggers for Mind Development: Research identifies specific triggers that enhance mental performance: clear goals (knowing what to think about), immediate feedback (testing ideas quickly), and the challenge-skill balance (problems just beyond current capability).",
        "cn": "促进思维发展的“心流”触发因素：研究发现，以下具体因素能够提升思维表现：明确的目标（知道该思考什么）、即时反馈（快速检验想法）以及挑战与技能之间的平衡（难度略高于当前能力的问题）。"
      },
      {
        "en": "High-quality cognitive work happens when challenge exceeds skill by approximately 4%.",
        "cn": "当挑战程度比技能水平高出约4%时，就能产生高质量的认知工作。"
      },
      {
        "en": "Metacrisis Relevance: The Mind quadrant in our age must develop what Schmachtenberger calls “sovereignty”—the ability to think independently despite narrative warfare, algorithmic manipulation, and information overwhelm.",
        "cn": "与“元危机”的相关性：当今时代的“思维”象限必须发展施马赫滕贝格所说的“主权”——即在叙事战、算法操纵和信息过载的情况下仍能独立思考的能力。"
      },
      {
        "en": "Without developed Mind quadrant, you become a vector for misinformation, perpetuate harmful narratives, and make decisions that externalize harm to others.",
        "cn": "如果“心智”象限没有得到发展，你就会成为虚假信息的传播者，助长有害的叙事，并做出将伤害转嫁给他人、使他人受损的决定。"
      },
      {
        "en": "The Embodiment Research: Flow studies began with athletes and physical performers.",
        "cn": "《身体化研究：心流研究》最初是从运动员和肢体表演者入手的。"
      },
      {
        "en": "Rock climbers, dancers, and surgeons showed that the body serves as a gateway to optimal consciousness.",
        "cn": "攀岩者、舞者和外科医生都证明，身体是通往最佳意识状态的门户。"
      },
      {
        "en": "Deep embodiment – full physical engagement – triggers a neurochemical cascade including endorphins (pain relief) and anandamide (bliss), explaining why physical practice accelerates development in all quadrants.",
        "cn": "深度身心合一——即全身心的投入——会触发一系列神经化学反应，包括内啡肽（缓解疼痛）和阿南达胺（带来极乐感），这解释了为何身体练习能加速所有维度的成长。"
      },
      {
        "en": "Performance Metrics: Steven Kotler’s research documents that flow states improve physical performance by up to 500% through enhanced reaction time, pattern recognition, and motor learning.",
        "cn": "绩效指标：史蒂文·科特勒的研究表明，心流状态通过提升反应速度、模式识别能力和运动学习能力，可将身体表现提高多达500%。"
      },
      {
        "en": "This isn’t just about athletics – it applies to any physical skill from surgery to craftsmanship.",
        "cn": "这不仅仅关乎体育运动——它适用于从外科手术到手工艺的任何身体技能。"
      },
      {
        "en": "Metacrisis Relevance: The Body quadrant represents the human biological substrate that our technological civilization is consuming.",
        "cn": "与“元危机”的相关性：“身体”象限代表着我们技术文明正在消耗的人类生物基质。"
      },
      {
        "en": "A neglected Body quadrant makes you fragile to coming disruptions and disconnects you from the somatic wisdom needed to navigate complexity.",
        "cn": "如果忽视了身体的某个象限，你会变得容易受到即将到来的干扰的影响，并会与应对复杂局面所需的躯体智慧脱节。"
      },
      {
        "en": "The Meaning-Making Framework: Csikszentmihalyi’s research reveals that meaning isn’t found but created through engaged action.",
        "cn": "“意义构建框架”：契克森米哈赖的研究表明，意义并非被发现的，而是通过全身心投入的行动所创造的。"
      },
      {
        "en": "His concept of “vital engagement” – deep involvement in activities that connect to something beyond the self – provides the scientific basis for Spirit quadrant development.",
        "cn": "他提出的“充满活力的参与”这一概念——即深度参与那些与自我之外的事物相联结的活动——为“精神象限”的发展提供了科学依据。"
      },
      {
        "en": "When we engage in activities that serve purposes beyond ourselves, specific neurochemicals like oxytocin (bonding) and serotonin (satisfaction) reinforce the behavior.",
        "cn": "当我们从事那些超越自身利益的活动时，某些特定的神经化学物质（如催产素（促进情感联结）和血清素（带来满足感））会强化这种行为。"
      },
      {
        "en": "Group Flow Dynamics: Research on team flow identifies 10 specific triggers for collective transcendence, including shared goals, equal participation, and familiar communication.",
        "cn": "群体流动动力学：关于团队流动的研究指出了10个引发集体超越的具体诱因，包括共同目标、平等参与和熟悉的沟通方式。"
      },
      {
        "en": "These findings validate ancient spiritual practices of communal ritual and modern community building approaches.",
        "cn": "这些研究结果印证了古代集体仪式等精神实践以及现代社区建设方法的有效性。"
      },
      {
        "en": "The Levels of Purpose Framework: Spirit development progresses through predictable stages:",
        "cn": "“目标层次框架”：灵性发展会经历一系列可预测的阶段："
      },
      {
        "en": "This progression can’t be skipped—each level provides foundation for the next.",
        "cn": "这个学习过程不能跳过——每个级别都为下一个级别奠定了基础。"
      },
      {
        "en": "Metacrisis Relevance: The Spirit quadrant addresses what Schmachtenberger calls the “wisdom crisis”—we have the power of gods without the love and wisdom of gods.",
        "cn": "与“元危机”的相关性：《精神》象限探讨了施马赫滕贝格所称的“智慧危机”——我们拥有神一般的力量，却缺乏神一般的爱与智慧。"
      },
      {
        "en": "Without Spirit development, technological power becomes destructive.",
        "cn": "如果缺乏精神层面的发展，技术力量就会变得具有破坏性。"
      },
      {
        "en": "With it, we develop the wisdom to wield exponential technology beneficially.",
        "cn": "凭借它，我们能够培养出将指数级技术用于造福人类的智慧。"
      },
      {
        "en": "The Impossible Achievement Framework: Kotler’s formula for achieving “impossible” goals – Motivation × Learning × Creativity × Flow – provides scientific backing for Vocation quadrant development.",
        "cn": "“不可能的成就框架”：科特勒实现“不可能”目标的公式——动力 × 学习 × 创造力 × 心流——为“职业象限”的发展提供了科学依据。"
      },
      {
        "en": "His research shows that stacking these multipliers creates exponential rather than linear growth, explaining how some individuals achieve 10x or 100x results.",
        "cn": "他的研究表明，将这些倍增因素叠加起来会产生指数级增长，而非线性增长，这解释了为何有些人能取得10倍甚至100倍的成果。"
      },
      {
        "en": "Intrinsic Motivation Research: Both Csikszentmihalyi and modern performance science show that after basic needs are met (roughly $75,000/year in the US), extrinsic motivators lose effectiveness.",
        "cn": "内在动机研究：无论是契克森米哈赖还是现代绩效科学都表明，在基本需求得到满足后（在美国约为每年75,000美元），外在激励因素的效果就会减弱。"
      },
      {
        "en": "The shift to intrinsic drivers – curiosity, passion, purpose, autonomy, and mastery – becomes essential for sustained high performance.",
        "cn": "向内在驱动力——好奇心、热情、目标感、自主性和精通——的转变，对于持续保持高绩效至关重要。"
      },
      {
        "en": "The Self-Monetization Principle: Instead of “choosing a niche” externally, you become the niche by solving your own problems and selling the solutions.",
        "cn": "“自我变现原则”：与其从外部“选择一个细分市场”，不如通过解决自身问题并销售解决方案，让自己成为那个细分市场。"
      },
      {
        "en": "This ensures authentic value creation aligned with personal development.",
        "cn": "这确保了与个人发展相契合的、真正的价值创造。"
      },
      {
        "en": "Your unique identity and experience become your competitive advantage.",
        "cn": "您独特的身份和经历将成为您的竞争优势。"
      },
      {
        "en": "The Labor Theory Fallacy: Hard work alone doesn’t create value.",
        "cn": "“劳动价值论”的谬误：仅靠辛勤劳动并不能创造价值。"
      },
      {
        "en": "Value comes from solving meaningful problems for others.",
        "cn": "价值源于为他人解决有意义的问题。"
      },
      {
        "en": "The amount of money you make correlates directly with the level of problems you solve and your ability to inspire people to care about your solution.",
        "cn": "你的收入与所解决问题的难度以及你激励他人关注你的解决方案的能力直接相关。"
      },
      {
        "en": "Metacrisis Relevance: The Vocation quadrant must evolve from extraction to regeneration, from rivalry to collaboration.",
        "cn": "与“元危机”的相关性：“职业”象限必须从“榨取”转向“再生”，从“竞争”转向“协作”。"
      },
      {
        "en": "Current economic systems are primary drivers of the metacrisis.",
        "cn": "当前的经济体系是这场“元危机”的主要驱动因素。"
      },
      {
        "en": "Transforming how we create and distribute value is essential for civilizational transition.",
        "cn": "改变我们创造和分配价值的方式，对于文明转型至关重要。"
      },
      {
        "en": "The predictable stages of consciousness development that apply across all quadrants, from conformist through individualist to integrated/synthesist consciousness.",
        "cn": "适用于所有象限的、可预测的意识发展阶段，从顺从型意识到个人主义型意识，再到整合型/综合型意识。"
      },
      {
        "en": "The foundational level where we follow inherited scripts, rely on external authority, and see the world in binary terms.",
        "cn": "基础层面，即我们遵循代代相传的模式，依赖外部权威，并以非黑即白的二元思维看待世界。"
      },
      {
        "en": "The Assignment Life: At Level 1.0, life consists of completing assignments given by others—school assigns learning, employers assign work, society assigns values.",
        "cn": "“任务人生”：在1.0阶段，生活就是完成他人布置的任务——学校布置学习任务，雇主布置工作任务，社会则赋予价值观。"
      },
      {
        "en": "“You work on these assignments without struggle or conscious thought, leading to a mechanical and replaceable role in a society filled to the brim with people who try to prove their happiness to hide their internal misery.”",
        "cn": "“你完成这些任务时既不费力也不需刻意思考，结果在这样一个社会中扮演着机械而可替代的角色——这个社会里到处都是试图证明自己幸福以掩饰内心痛苦的人。”"
      },
      {
        "en": "Developmental Origin: Childhood conditioning that was never questioned.",
        "cn": "发展起源：童年时期形成的、从未被质疑过的思维定式。"
      },
      {
        "en": "The scripts, beliefs, and behaviors inherited from family, culture, and early environment.",
        "cn": "从家庭、文化和早期环境中继承而来的行为模式、信念和行为。"
      },
      {
        "en": "This level isn’t “bad”—it’s foundational.",
        "cn": "这个水平并不“差”——它是基础性的。"
      },
      {
        "en": "Evolutionary Psychology Perspective: Research shows the human brain defaults to mild anxiety – an adaptive trait for survival.",
        "cn": "进化心理学视角：研究表明，人类大脑默认状态是轻微焦虑——这是一种有利于生存的适应性特征。"
      },
      {
        "en": "Level 1 consciousness remains in this default state, using conformity and external rules to manage anxiety.",
        "cn": "第一级意识始终处于这种默认状态，通过顺从和外部规则来应对焦虑。"
      },
      {
        "en": "Flow states are rare because the challenge-skill balance is externally imposed rather than internally regulated.",
        "cn": "“心流”状态之所以罕见，是因为挑战与技能之间的平衡是由外部强加的，而非由内部调节的。"
      },
      {
        "en": "Evolutionary Function: Creates stable foundation for development.",
        "cn": "进化功能：为发展奠定坚实基础。"
      },
      {
        "en": "Provides security, belonging, and structure necessary for survival.",
        "cn": "提供生存所需的安全感、归属感和秩序。"
      },
      {
        "en": "Like childhood, it’s a necessary stage that becomes problematic only when extended indefinitely.",
        "cn": "就像童年一样，这是一个必要的阶段，只有当它无限期地延续下去时，才会变得棘手。"
      },
      {
        "en": "Metacrisis Relationship: Level 1.0 consciousness perpetuates the metacrisis unconsciously:",
        "cn": "元危机关系：1.0级意识在无意识中延续着元危机："
      },
      {
        "en": "This level can’t comprehend systemic solutions.",
        "cn": "这个层面无法理解系统性解决方案。"
      },
      {
        "en": "Attempts to explain the metacrisis result in overwhelm or fundamentalist responses.",
        "cn": "试图解释“元危机”的努力往往导致人们感到不知所措，或引发原教旨主义式的反应。"
      },
      {
        "en": "Development to Level 2 is prerequisite for meaningful contribution to solutions.",
        "cn": "达到2级是能够为解决方案做出有意义贡献的先决条件。"
      },
      {
        "en": "The rebellion against conformity that develops personal agency, critical thinking, and achievement orientation.",
        "cn": "那种反抗从众心理、从而培养个人主动性、批判性思维和成就导向的精神。"
      },
      {
        "en": "The Agency Shift: This level marks the shift from employee to entrepreneur mindset—not necessarily in profession but in consciousness.",
        "cn": "“思维转变”：这一阶段标志着从雇员思维向企业家思维的转变——这种转变未必体现在职业上，而是在意识层面。"
      },
      {
        "en": "You stop accepting assignments and start creating your own goals.",
        "cn": "你不再接受任务，而是开始制定自己的目标。"
      },
      {
        "en": "You take full responsibility for outcomes, recognizing that “if you don’t create a product to sell, you will be forced to sell a product for someone else, or you will become the product.”",
        "cn": "你要对结果承担全部责任，并认识到：“如果你不创造自己的产品来销售，你就不得不替别人销售产品，否则你自己就会成为产品。”"
      },
      {
        "en": "Developmental Origin: The rebellion against Level 1 constraints.",
        "cn": "发育起源：对第1级约束的反抗。"
      },
      {
        "en": "Often triggered by recognizing the limitations, hypocrisies, or failures of inherited systems.",
        "cn": "通常是由认识到既定体系的局限性、虚伪之处或失败所引发的。"
      },
      {
        "en": "The teenager who realizes parents aren’t perfect, extended to all life domains.",
        "cn": "那个意识到父母并非完美无缺的青少年，这一认识延伸到了生活的方方面面。"
      },
      {
        "en": "The Autotelic Shift: Level 2 marks the beginning of autotelic personality development.",
        "cn": "“自足性转变”：第2级标志着自足性人格发展的开始。"
      },
      {
        "en": "Individuals start finding intrinsic satisfaction in challenges.",
        "cn": "人们开始从挑战中获得内在的满足感。"
      },
      {
        "en": "Flow research shows this shift correlates with increased dopamine receptor density and improved attention regulation.",
        "cn": "流研究表明，这种转变与多巴胺受体密度的增加以及注意力的调节能力提升有关。"
      },
      {
        "en": "The ability to self-generate rewarding experiences reduces dependence on external validation.",
        "cn": "能够自主创造令人满足的体验，可以减少对外部认可的依赖。"
      },
      {
        "en": "The Status Game: Level 2 is driven by status needs, which Koe validates: “You don’t start making more because you want to change the world.",
        "cn": "《地位游戏：第2级》的核心驱动力是地位需求，科伊对此予以了肯定：“你赚得更多，并不是因为你想改变世界。"
      },
      {
        "en": "You start because you want to survive.",
        "cn": "你之所以开始，是因为你想活下去。"
      },
      {
        "en": "Once that purpose is actualized, you make more because you want to be accepted and perceived as valuable.”",
        "cn": "“一旦实现了这一目标，你就会做得更多，因为你想被接纳，并被视为有价值的人。”"
      },
      {
        "en": "Evolutionary Function: Develops individual agency, critical thinking, and personal power.",
        "cn": "发展功能：培养个体的自主性、批判性思维和个人能力。"
      },
      {
        "en": "Creates capacity for innovation, entrepreneurship, and cultural evolution.",
        "cn": "为创新、创业和文化演进创造条件。"
      },
      {
        "en": "The necessary individuation before genuine integration.",
        "cn": "在实现真正融合之前，必须先完成个体化。"
      },
      {
        "en": "Metacrisis Relationship: Level 2.0 can see problems but solutions often make things worse:",
        "cn": "“元危机”关系：2.0级能够发现问题，但解决方案往往会使情况变得更糟："
      },
      {
        "en": "This level understands the predicament intellectually but can’t transcend the competitive success paradigm.",
        "cn": "这一层面的理解仅停留在理性层面，虽然在理智上理解了这种困境，却无法超越“竞争成功”的范式。"
      },
      {
        "en": "Their solutions tend to be “doing the same thing better” rather than fundamental restructuring.",
        "cn": "他们的解决方案往往是“把同样的事情做得更好”，而不是进行根本性的重组。"
      },
      {
        "en": "The very success drive that enabled Level 2 development becomes barrier to Level 3.",
        "cn": "正是那种推动第二阶段发展的成功动力，却成了第三阶段发展的障碍。"
      },
      {
        "en": "The integration of previous levels into a higher-order consciousness that can hold paradox, create new frameworks, and design anti-rivalrous systems.",
        "cn": "将前几个层次整合到一种更高层次的意识中，这种意识能够容纳悖论、构建新的框架，并设计出非竞争性系统。"
      },
      {
        "en": "The Creator Economy: At Level 3, you embody the Creator—not a “content creator,” but fundamental value creation.",
        "cn": "创作者经济：在第3级，你就是“创作者”的化身——不是“内容创作者”，而是根本性的价值创造者。"
      },
      {
        "en": "You solve your own problems and distribute solutions.",
        "cn": "你自己解决问题，并分享解决方案。"
      },
      {
        "en": "Your work becomes your life’s work (Calling, not just Career).",
        "cn": "你的工作将成为你毕生的事业（是“使命”，而不仅仅是“职业”）。"
      },
      {
        "en": "Developmental Origin: The integration of Levels 1 and 2.",
        "cn": "发育起源：第1级与第2级的整合。"
      },
      {
        "en": "Recognizes truth and limitation in both conformity and individuality.",
        "cn": "既认识到顺从与个性中的真理，也认识到其中的局限性。"
      },
      {
        "en": "Often emerges after significant success and failure in both modes.",
        "cn": "通常是在这两种模式中都经历了重大的成功和失败之后才出现的。"
      },
      {
        "en": "Complexity Mastery: Level 3 individuals embody Csikszentmihalyi’s complexity formula at its highest expression.",
        "cn": "复杂性掌握：第3级的人士将契克森米哈赖的复杂性公式诠释到了极致。"
      },
      {
        "en": "They’ve differentiated extensively (multiple skills, perspectives, domains) AND integrated these into a coherent whole.",
        "cn": "他们进行了广泛的差异化（涵盖多种技能、视角和领域），并将这些内容整合成一个有机整体。"
      },
      {
        "en": "Brain imaging shows increased connectivity between normally separate networks, enabling the “holographic” perception where parts reflect the whole.",
        "cn": "脑成像显示，原本相互独立的神经网络之间的连接性增强，从而产生了“全息”般的感知，即部分能够反映整体。"
      },
      {
        "en": "The Flow-Complexity Spiral: At this level, flow states catalyze complexity growth, which enables deeper flow, creating an upward spiral.",
        "cn": "“流动-复杂性螺旋”：在这个层面上，流动状态会催化复杂性的增长，而复杂性的增长又促使流动状态进一步深化，从而形成一个向上螺旋。"
      },
      {
        "en": "These individuals can access what Kotler calls “macro-flow” – extended periods of peak performance lasting days or weeks.",
        "cn": "这些人能够进入科特勒所说的“宏流”状态——即持续数天或数周的高峰表现期。"
      },
      {
        "en": "The Interest Cycle Mastery: Level 3 individuals consciously navigate the development cycle:",
        "cn": "《兴趣周期精通指南》：第3级的人能够有意识地驾驭发展周期："
      },
      {
        "en": "Digital Leverage Enabled: Level 3 often manifests in the digital world as individuals who build audiences, create products, and generate impact without traditional corporate structures.",
        "cn": "数字化赋能：在数字世界中，第三层级通常表现为那些无需依赖传统企业架构，便能积累受众、打造产品并产生影响力的个人。"
      },
      {
        "en": "They become “one-person media companies” modeling integrated development while solving problems at scale.",
        "cn": "他们成为“一人媒体公司”，在解决大规模问题的同时，践行一体化发展模式。"
      },
      {
        "en": "Evolutionary Function: Creates new possibilities for human development.",
        "cn": "进化功能：为人类发展开辟新的可能性。"
      },
      {
        "en": "Serves as bridge between levels, translator between worldviews, and creator of new structures.",
        "cn": "既是不同层级之间的桥梁，也是不同世界观之间的翻译者，更是新结构的创造者。"
      },
      {
        "en": "This is the minimum level for designing third attractor solutions.",
        "cn": "这是设计第三吸引子解所需的最低水平。"
      },
      {
        "en": "Can work within existing systems while building alternatives.",
        "cn": "既能在现有体系内开展工作，又能同时构建替代方案。"
      },
      {
        "en": "Understands that individual and collective development are inseparable.",
        "cn": "认识到个人发展与集体发展密不可分。"
      },
      {
        "en": "Creates contexts where rivalrous actors can discover collaboration.",
        "cn": "营造一种环境，使处于竞争关系中的各方能够发现合作的机会。"
      },
      {
        "en": "The rare post-integral consciousness where individual and collective boundaries dissolve, and one operates as an expression of evolutionary force itself.",
        "cn": "一种罕见的“后整体”意识状态，其中个体与集体的界限消融，人本身成为进化力量的体现。"
      },
      {
        "en": "Developmental Origin: Emerges after extensive time at Level 3, often catalyzed by profound spiritual opening or civilizational perspective shift.",
        "cn": "发展起源：在第三阶段经历较长时间后出现，通常由深刻的灵性觉醒或文明视角的转变所触发。"
      },
      {
        "en": "Recognizes development itself as cosmic process.",
        "cn": "将发展本身视为一种宇宙进程。"
      },
      {
        "en": "Beyond Purpose to Evolution: At this level, purpose transcends even conscious contribution.",
        "cn": "超越“目的”迈向“进化”：在这个层面上，“目的”甚至超越了有意识的贡献。"
      },
      {
        "en": "You become a vessel for evolutionary force itself.",
        "cn": "你会成为进化力量本身的载体。"
      },
      {
        "en": "Solutions emerge spontaneously through you rather than from you.",
        "cn": "解决方案是通过你自然而然地浮现出来的，而不是由你主动产生的。"
      },
      {
        "en": "These individuals are rare but crucial—they hold the template for where humanity is heading.",
        "cn": "这类人虽然罕见，却至关重要——他们为人类的未来指明了方向。"
      },
      {
        "en": "Their very existence demonstrates possibility and creates morphic field for others’ development.",
        "cn": "他们的存在本身就证明了可能性，并为他人的发展创造了形态场。"
      },
      {
        "en": "The three-phase process through which all developmental transitions occur within each level – from dissonance through uncertainty to discovery.",
        "cn": "每个发展阶段内所有发展性转变所经历的三阶段过程——从不和谐，到不确定，再到发现。"
      },
      {
        "en": "Understanding these phases helps navigate the often uncomfortable process of growth.",
        "cn": "了解这些阶段，有助于我们顺利度过成长过程中那些常常令人感到不适的阶段。"
      },
      {
        "en": "The uncomfortable but necessary state where current patterns no longer satisfy and something new wants to emerge.",
        "cn": "一种令人不适却又不可或缺的状态：当现有的模式已无法令人满意，而某种新事物正渴望涌现。"
      },
      {
        "en": "You’ve “gotten your taste” of your level.",
        "cn": "你已经“领略”了该关卡的滋味。"
      },
      {
        "en": "Psychological Dynamics: The psyche preparing for transformation.",
        "cn": "心理动力学：心灵正在为转变做准备。"
      },
      {
        "en": "Old structures beginning to dissolve.",
        "cn": "旧的结构开始瓦解。"
      },
      {
        "en": "The Struggle Phase: This maps to what Kotler identifies as the “struggle phase” of the flow cycle – the necessary frustration that primes the nervous system for breakthrough.",
        "cn": "“挣扎阶段”：这对应于科特勒所指出的“心流循环”中的“挣扎阶段”——即为突破而激发神经系统所必需的挫败感。"
      },
      {
        "en": "Neurobiologically, struggle releases cortisol and norepinephrine, creating the pressure needed for pattern recognition and insight.",
        "cn": "从神经生物学角度来看，挣扎会释放皮质醇和去甲肾上腺素，从而产生模式识别和洞察力所需的压力。"
      },
      {
        "en": "The Anti-Vision Activation: This is when anti-vision becomes most powerful.",
        "cn": "“反视界激活”：此时，“反视界”的力量达到巅峰。"
      },
      {
        "en": "You become acutely aware of what you don’t want: “A job I hate.",
        "cn": "你会非常清楚地意识到自己不想要什么：“一份我讨厌的工作。"
      },
      {
        "en": "A partner I can’t stop arguing with.” This negative clarity often precedes positive vision.",
        "cn": "“一个我总忍不住和他争吵的伴侣。”这种负面的清醒往往是积极愿景的前奏。"
      },
      {
        "en": "Lost Phase Recognition: This corresponds to the “Lost” phase in the interest cycle—that disorienting period where old interests fade but new ones haven’t emerged.",
        "cn": "“迷失”阶段的识别：这对应于兴趣周期中的“迷失”阶段——即旧的兴趣逐渐消退，而新的兴趣尚未涌现的、令人迷失方向的时期。"
      },
      {
        "en": "It’s not failure; it’s preparation.",
        "cn": "这并非失败，而是准备。"
      },
      {
        "en": "Channel Access: This is the only phase where Channels naturally open.",
        "cn": "通道开启：这是通道自然开启的唯一阶段。"
      },
      {
        "en": "The discomfort creates seeking energy that, when focused, becomes obsessive learning/building.",
        "cn": "这种不适感催生了探索的动力，当这种动力得到集中时，便会转化为一种执着的学习与创造。"
      },
      {
        "en": "Metacrisis Relevance: Civilizational dissonance is creating mass individual dissonance.",
        "cn": "与“元危机”的相关性：文明层面的认知失调正在引发大规模的个体认知失调。"
      },
      {
        "en": "The feeling that “something is deeply wrong” is accurate—it’s the metacrisis registering in consciousness.",
        "cn": "那种“事情出了大问题”的感觉是准确的——这是“元危机”在意识中引发的反应。"
      },
      {
        "en": "This discomfort, when channeled, becomes the energy for transformation.",
        "cn": "这种不适，一旦得到引导，就会转化为推动转变的能量。"
      },
      {
        "en": "Those who medicate it (through distraction, consumption, or ideology) remain stuck.",
        "cn": "那些试图用（转移注意力、消费或意识形态）来麻痹自己的人，依然无法摆脱困境。"
      },
      {
        "en": "The liminal space between old and new identities where maximum transformation potential exists alongside maximum vulnerability.",
        "cn": "新旧身份之间的过渡空间，这里既蕴藏着最大的蜕变潜力，也存在着最大的脆弱性。"
      },
      {
        "en": "You must take a step into the unknown.",
        "cn": "你必须迈出一步，走向未知。"
      },
      {
        "en": "Psychological Dynamics: The liminal space between identities.",
        "cn": "心理动力学：身份之间的临界空间。"
      },
      {
        "en": "Highest growth potential, highest failure risk.",
        "cn": "增长潜力最大，失败风险最高。"
      },
      {
        "en": "The Release Mechanism: Flow science shows that breakthrough requires “transient hypofrontality” – temporarily releasing conscious control.",
        "cn": "释放机制：流动科学表明，突破需要“暂时的额叶功能减弱”——即暂时释放有意识的控制。"
      },
      {
        "en": "Phase X.2 uncertainty forces this release.",
        "cn": "由于Phase X.2存在不确定性，因此不得不发布此版本。"
      },
      {
        "en": "The prefrontal cortex, exhausted from trying to maintain old patterns, finally lets go, allowing new configurations to emerge.",
        "cn": "前额叶皮层在竭力维持旧有模式的过程中耗尽了精力，最终放手，从而让新的模式得以涌现。"
      },
      {
        "en": "The Interested Phase: This maps to becoming “interested” in the development cycle—when curiosity emerges from confusion.",
        "cn": "“感兴趣”阶段：这对应于开发周期中的“感兴趣”阶段——即当困惑中萌发好奇心之时。"
      },
      {
        "en": "You start experimenting with different topics, techniques, and solutions until you become fully aware you can solve the problem.",
        "cn": "你开始尝试不同的主题、技巧和解决方案，直到你完全意识到自己能够解决这个问题。"
      },
      {
        "en": "Nature’s Compass Navigation: This is “one foot in the unknown”—dancing between secure and insecure, not so deep you’re anxious, not so shallow you’re bored.",
        "cn": "“自然罗盘”导航法：这就像是“一脚踏入未知”——在安全与不安全之间游走，既不会因水太深而感到焦虑，也不会因水太浅而感到无聊。"
      },
      {
        "en": "Trial and error becomes your guide.",
        "cn": "试错将成为你的指引。"
      },
      {
        "en": "Metacrisis Relevance: We’re in civilizational uncertainty—between stories, between systems.",
        "cn": "与“元危机”的相关性：我们正处于文明的不确定性之中——处于各种叙事之间、各种体系之间。"
      },
      {
        "en": "The old is dying, the new not yet born.",
        "cn": "旧的正在消亡，新的尚未诞生。"
      },
      {
        "en": "This phase is where maximum transformation occurs but also where regression temptation is highest.",
        "cn": "这一阶段是转变最为显著的时期，但也是退步的诱惑最大的时期。"
      },
      {
        "en": "Learning to navigate uncertainty is perhaps the most crucial skill for our time.",
        "cn": "学会应对不确定性，或许是我们这个时代最重要的技能。"
      },
      {
        "en": "Those who can tolerate not knowing can discover genuinely new solutions.",
        "cn": "那些能够容忍未知的人，才能发现真正崭新的解决方案。"
      },
      {
        "en": "The crystallization of new patterns, abilities, and identity at a higher level of complexity.",
        "cn": "在更高层次的复杂性中，新的模式、能力和身份的形成。"
      },
      {
        "en": "Psychological Dynamics: New identity consolidating.",
        "cn": "心理动态：新身份正在确立。"
      },
      {
        "en": "Worldview stabilizing at higher complexity.",
        "cn": "世界观在更高复杂度水平上趋于稳定。"
      },
      {
        "en": "The Neurochemical Reward: Discovery triggers the full neurochemical cascade identified in flow research: dopamine (reward), norepinephrine (focus), endorphins (pleasure), anandamide (lateral thinking), serotonin (satisfaction), and oxytocin (bonding).",
        "cn": "神经化学奖励：发现会触发“心流”研究中已确认的完整神经化学级联反应：多巴胺（奖励）、去甲肾上腺素（专注）、内啡肽（愉悦）、阿南达米德（发散思维）、血清素（满足）以及催产素（情感联结）。"
      },
      {
        "en": "This powerful cocktail reinforces the new pattern, making it sustainable.",
        "cn": "这种强有力的组合巩固了新的模式，使其得以持续。"
      },
      {
        "en": "The Obsessed Phase: This corresponds to the “obsessed” phase where you dive deep into your discovery.",
        "cn": "痴迷阶段：这对应于“痴迷”阶段，此时你会深入探索自己的发现。"
      },
      {
        "en": "“You can’t stop learning and building toward your goal.",
        "cn": "“你不能停止学习，也不能停止朝着目标努力。”"
      },
      {
        "en": "You start to realize that your problem wasn’t as shallow as you thought.”",
        "cn": "“你开始意识到，你的问题并没有你想象的那么肤浅。”"
      },
      {
        "en": "Value Creation Emergence: This is when you naturally begin creating value for others.",
        "cn": "价值创造的萌发：这就是你自然而然地开始为他人创造价值的时候。"
      },
      {
        "en": "“The secret is to cultivate a skillset and mindset so impactful to your life that you can’t help but share it with others.”",
        "cn": "“秘诀在于培养一套技能和思维方式，它们对你的生活影响如此深远，以至于你情不自禁地想要与他人分享。”"
      },
      {
        "en": "Once that cycle ends, a new one begins, and you will feel lost once more.",
        "cn": "一旦这个循环结束，新的循环便会开始，而你又会感到迷失。"
      },
      {
        "en": "This is the spiral nature of development—each completion leads to new beginning at higher level.",
        "cn": "这就是发展的螺旋式特征——每一次完成都会引领我们迈向更高层次的新起点。"
      },
      {
        "en": "The three components that must be developed within each phase – theoretical understanding, practical application, and integrated mastery.",
        "cn": "每个阶段都必须培养的三个方面——理论理解、实践应用和综合掌握。"
      },
      {
        "en": "These represent horizontal development within vertical stages (phases are vertical development).",
        "cn": "这些代表了垂直阶段内的水平发展（而各阶段则属于垂直发展）。"
      },
      {
        "en": "The Learning Stack: Kotler’s research identifies an optimal learning sequence: growth mindset → truth filters → reading methodology → public testing → iteration.",
        "cn": "学习体系：科特勒的研究指出了一个最佳的学习顺序：成长型思维 → 真理过滤器 → 阅读方法论 → 公开测试 → 迭代。"
      },
      {
        "en": "This stack accelerates knowledge acquisition by 200-300% compared to traditional methods.",
        "cn": "与传统方法相比，该技术栈可将知识获取速度提高200%至300%。"
      },
      {
        "en": "Writing as Knowledge Development: “Writing is how you solidify understanding of your studies, mold your thoughts in physical form.” The act of writing forces clarity and reveals knowledge gaps immediately.",
        "cn": "写作作为知识发展：“写作是巩固学习理解、将思想具象化的方式。”写作这一行为迫使人们理清思路，并能立即揭示知识上的不足。"
      },
      {
        "en": "The 10,000 Hour Rule Revisited: While Gladwell popularized 10,000 hours for mastery, flow research shows this can be compressed to 5,000 hours with deliberate practice in flow states.",
        "cn": "重新审视“一万小时定律”：虽然格拉德威尔将“一万小时”的概念推广为通晓某项技能的标准，但关于“心流”的研究表明，通过在心流状态下进行有意识的练习，这一时间可以缩短至5,000小时。"
      },
      {
        "en": "The key is maintaining the challenge-skill balance at the edge of capability, what Csikszentmihalyi calls the “flow channel.”",
        "cn": "关键在于在能力边界上保持挑战与技能的平衡，即奇克森特米哈伊所说的“心流通道”。"
      },
      {
        "en": "Public Building Principle: Building or writing in public accelerates experience through immediate feedback.",
        "cn": "公开创作原则：在公众面前进行创作或写作，能通过即时反馈加速经验积累。"
      },
      {
        "en": "You can’t hide behind theory when your work is visible.",
        "cn": "当你的作品公之于众时，你就不能再躲在理论后面了。"
      },
      {
        "en": "This forces rapid iteration and improvement.",
        "cn": "这促使我们进行快速迭代和改进。"
      },
      {
        "en": "Metacrisis Application: Experience with dysfunctional systems without understanding their generator functions leads to reproducing the same problems in new forms.",
        "cn": "元危机应用：在不理解系统生成功能的情况下，仅凭对失调系统的经验，会导致以新的形式重蹈覆辙。"
      },
      {
        "en": "Many who’ve experienced corporate toxicity create equally toxic startups.",
        "cn": "许多曾经历过企业毒性文化的人，最终创建了同样充满毒性的初创公司。"
      },
      {
        "en": "Experience alone doesn’t create wisdom—it needs reflection and framework to become transformative.",
        "cn": "仅凭经验并不能产生智慧——只有通过反思和建立思维框架，经验才能带来蜕变。"
      },
      {
        "en": "The Creativity Connection: Csikszentmihalyi’s Systems Model shows that true skill (beyond mere competence) requires interaction between Person × Domain × Field.",
        "cn": "《创造力的联系》：契克森米哈赖的系统模型表明，真正的技能（超越了单纯的能力）需要“个人 × 领域 × 领域”之间的相互作用。"
      },
      {
        "en": "You need personal capability, domain knowledge, AND field validation.",
        "cn": "你需要具备个人能力、领域知识，以及实地验证。"
      },
      {
        "en": "This explains why some highly skilled individuals never achieve recognition – they’ve neglected the field component.",
        "cn": "这解释了为什么有些能力出众的人却始终得不到认可——他们忽视了实践这一环节。"
      },
      {
        "en": "The Lever-Moving Focus: True skill means identifying and executing on the highest-leverage actions.",
        "cn": "“杠杆式行动”的焦点：真正的技能在于识别并执行杠杆效应最大的行动。"
      },
      {
        "en": "“Every day, you need priority tasks that move the lever toward your projects, goals, and vision.”",
        "cn": "“每天，你都需要一些优先任务，这些任务能推动你朝着项目、目标和愿景迈进。”"
      },
      {
        "en": "Metacrisis Application: The skills needed for navigating civilizational transition are different from those that created success in the old paradigm.",
        "cn": "“元危机”应用：应对文明转型所需的技能，与在旧范式下取得成功所需的技能不同。"
      },
      {
        "en": "Anti-rivalrous collaboration, systems thinking, regenerative design—these aren’t taught in traditional education.",
        "cn": "非竞争性协作、系统思维、再生设计——这些在传统教育中并未教授。"
      },
      {
        "en": "Developing these skills requires intentional practice in contexts that reward cooperation over competition.",
        "cn": "要培养这些技能，需要在那些更重视合作而非竞争的环境中进行有意识的练习。"
      },
      {
        "en": "Meta-skills (learning to learn, adapting to change, holding complexity) become more valuable than specific technical skills.",
        "cn": "元技能（学会学习、适应变化、应对复杂性）比具体的技术技能更为重要。"
      },
      {
        "en": "Pattern: 80+ hour weeks, living at office, relationships through work only",
        "cn": "生活模式：每周工作80多个小时，几乎住在办公室里，人际关系仅限于工作圈"
      },
      {
        "en": "Transformation Path: Delegate 20% → invest in Body → discover Spirit → integrate Mind",
        "cn": "转变之路：授权20% → 投资于身体 → 探索精神 → 整合心灵"
      },
      {
        "en": "Costs: Financial instability, ungrounded theories, implementation failure",
        "cn": "代价：财务不稳定、缺乏依据的理论、实施失败"
      },
      {
        "en": "Transformation Path: Choose one practice → commit 90 days → ground in Vocation → strengthen Body",
        "cn": "蜕变之路：选择一项修行 → 坚持90天 → 在天职中扎根 → 强健体魄"
      },
      {
        "en": "Transformation Path: Ship something imperfect → learn from feedback → connect with others → embody knowledge",
        "cn": "转型路径：推出不完美的产品 → 从反馈中学习 → 与他人建立联系 → 将知识付诸实践"
      },
      {
        "en": "Pattern: Training 3+ hours daily, macro counting, recovery optimization",
        "cn": "方案：每天训练3小时以上，计算宏量营养素，优化恢复"
      },
      {
        "en": "Transformation Path: Train others → study methodology → explore meaning → create value",
        "cn": "转型路径：培训他人 → 研究方法论 → 探索意义 → 创造价值"
      },
      {
        "en": "Pattern: No consistent practice, random experiments, constant starting over",
        "cn": "模式：没有固定的做法，随意尝试，不断从头再来"
      },
      {
        "en": "Transformation Path: Pick ONE quadrant → 90 day commitment → build foundation → expand slowly",
        "cn": "转型路径：选择一个象限 → 90天承诺 → 打好基础 → 稳步拓展"
      },
      {
        "en": "Transformation Path: Apply excellence methodology to weakest quadrant → find synergies → integrate gradually",
        "cn": "转型路径：将卓越方法论应用于最薄弱的象限 → 发掘协同效应 → 逐步整合"
      },
      {
        "en": "Strengths: Disciplined practice, embodied presence, service orientation",
        "cn": "优势：有条不紊的实践、全身心的投入、以服务为导向"
      },
      {
        "en": "Weaknesses: Financial struggle, intellectual simplicity, market naivety",
        "cn": "缺点：经济拮据、思维简单、对市场缺乏了解"
      },
      {
        "en": "Weaknesses: Physical fragility, financial instability, execution failure",
        "cn": "弱点：身体虚弱、财务不稳、执行不力"
      },
      {
        "en": "Strengths: Powerful execution, strategic dominance, resource abundance",
        "cn": "优势：强大的执行力、战略优势、丰富的资源"
      },
      {
        "en": "Development Path: Add Mind for systems thinking and complexity navigation",
        "cn": "发展路径：培养系统思维与应对复杂性问题的能力"
      },
      {
        "en": "Development Path: Choose specialization areas while maintaining integration",
        "cn": "发展路径：在保持整体协调的同时选择专业领域"
      },
      {
        "en": "Extended periods of accelerated development where normal limits dissolve and rapid transformation occurs.",
        "cn": "一段时期内发展加速，正常界限逐渐消失，并发生急速转变。"
      },
      {
        "en": "Channels are like developmental wormholes – high-risk, high-reward periods of intensive growth.",
        "cn": "渠道就像是发展中的“虫洞”——这是高风险、高回报的快速增长期。"
      },
      {
        "en": "The Obsession Framework: Channels embody the “obsessed” phase at its peak—”You dive deeper into that crevice of reality.",
        "cn": "《痴迷框架》：频道体现了“痴迷”阶段达到顶峰时的状态——“你更深入地潜入现实的那个缝隙之中。”"
      },
      {
        "en": "You can’t stop learning and building toward your goal.” This state can last months, creating exponential development.",
        "cn": "“你不能停止学习，也不能停止朝着目标迈进。”这种状态可能持续数月，从而带来指数级的成长。"
      },
      {
        "en": "The Macro-Flow Phenomenon: While Channels are distinct from flow states, they share characteristics with what Kotler calls “macro-flow” – extended periods where multiple flow states chain together.",
        "cn": "“宏观心流现象”：虽然“心流通道”与“心流状态”有所不同，但它们与科特勒所说的“宏观心流”具有共同特征——即多个心流状态连续串联起来的较长时间段。"
      },
      {
        "en": "A Channel might contain hundreds of individual flow experiences over months, creating sustained transformation.",
        "cn": "一个渠道可能在数月内包含数百种不同的体验，从而带来持续的转变。"
      },
      {
        "en": "The key difference: Channels involve fundamental identity reorganization, while flow states can occur within existing identity structures.",
        "cn": "关键区别在于：通道涉及根本性的身份重组，而流动状态则可能在现有的身份结构中发生。"
      },
      {
        "en": "General Flow Triggers: Kotler’s complete trigger list can intentionally activate Channels:",
        "cn": "一般流程触发器：科特勒的完整触发器列表可有意触发渠道："
      },
      {
        "en": "The Interest-Based Entry: Channels often emerge from following genuine interest: “The secret is to try everything until you find that one thing that you can’t pull yourself away from.”",
        "cn": "基于兴趣的切入点：兴趣往往源于对真正感兴趣事物的探索：“诀窍在于尝试一切，直到找到那件让你欲罢不能的事情。”"
      },
      {
        "en": "The Nature of Glitches: Glitches are mechanisms that can force rapid development by breaking through normal consciousness constraints.",
        "cn": "故障的本质：故障是一种能够突破正常意识限制、从而推动快速发展机制。"
      },
      {
        "en": "Like exploiting bugs in video game code, they bypass normal progression rules—with corresponding risks.",
        "cn": "就像利用电子游戏代码中的漏洞一样，他们绕过了正常的进度规则——这伴随着相应的风险。"
      },
      {
        "en": "Core Principle: Reality has “exploits” that allow rapid advancement, but using them without proper foundation is like taking steroids without training—destructive rather than developmental.",
        "cn": "核心原则：现实中存在一些能够让人快速进步的“捷径”，但如果在没有打好基础的情况下使用它们，就如同在没有训练的情况下服用类固醇——这不仅无助于成长，反而会带来破坏。"
      },
      {
        "en": "The Neuroscience of Glitches: These interventions work by dramatically altering neurochemistry beyond normal ranges.",
        "cn": "“故障”的神经科学：这些干预措施的作用机制在于将神经化学物质的水平剧烈改变至正常范围之外。"
      },
      {
        "en": "Psychedelics flood the brain with serotonin analogues, creating neuroplasticity windows.",
        "cn": "致幻剂会向大脑释放大量血清素类似物，从而开启神经可塑性窗口。"
      },
      {
        "en": "Extreme sports spike all flow neurochemicals simultaneously.",
        "cn": "极限运动会同时使所有神经化学物质的水平急剧上升。"
      },
      {
        "en": "While powerful, they can damage receptor sites and regulation mechanisms if misused.",
        "cn": "虽然它们功效显著，但如果使用不当，可能会损伤受体位点和调节机制。"
      },
      {
        "en": "Historical Precedent: William James experimented with nitrous oxide to access altered states.",
        "cn": "历史先例：威廉·詹姆斯曾通过实验使用一氧化二氮来进入改变的意识状态。"
      },
      {
        "en": "The difference now: we understand the mechanisms and risks through neuroscience, allowing more informed choices.",
        "cn": "如今的不同之处在于：我们通过神经科学理解了其作用机制和风险，从而能够做出更明智的选择。"
      },
      {
        "en": "Metacrisis Context: The entire technological age could be seen as humanity using a civilizational glitch—gaining godlike power without developing godlike wisdom.",
        "cn": "“元危机”背景：整个技术时代可以被视为人类利用了一种文明层面的失误——获得了神一般的力量，却未能发展出神一般的智慧。"
      },
      {
        "en": "Individual glitches mirror this pattern.",
        "cn": "个别故障也呈现出这种模式。"
      },
      {
        "en": "The question isn’t whether to use them but how to use them wisely—if at all.",
        "cn": "问题不在于是否使用它们，而在于如何明智地使用它们——如果真的要使用的话。"
      },
      {
        "en": "AI represents the first Glitch that simultaneously affects all quadrants.",
        "cn": "AI 是首个同时影响所有象限的“故障”。"
      },
      {
        "en": "It’s becoming the foundation of all creation: “Writing is the meta-skill…",
        "cn": "它正逐渐成为一切创作的基础：“写作是一种元技能……"
      },
      {
        "en": "With advances in LLMs and artificial intelligence tools, code has begun to take the shape of natural language.”",
        "cn": "“随着大型语言模型（LLMs）和人工智能工具的进步，代码已开始呈现出自然语言的形态。”"
      },
      {
        "en": "Metacrisis Relevance: AI is the ultimate expression of exponential technology outpacing wisdom.",
        "cn": "与“元危机”的相关性：人工智能是指数级技术发展超越人类智慧的终极体现。"
      },
      {
        "en": "It offers unprecedented development acceleration but also unprecedented risk of sovereignty loss.",
        "cn": "它既带来了前所未有的发展加速，同时也带来了前所未有的主权丧失风险。"
      },
      {
        "en": "Learning to use AI while maintaining human agency is perhaps the defining challenge of our time.",
        "cn": "在学习使用人工智能的同时保持人类的主体性，这或许是我们这个时代最关键的挑战。"
      },
      {
        "en": "Those who master this balance gain massive advantage; those who fail become appendages of machine intelligence.",
        "cn": "能够掌握这种平衡的人将获得巨大的优势；而未能做到的人则会沦为机器智能的附庸。"
      },
      {
        "en": "Each improvement makes the next easier.",
        "cn": "每一次进步都会让下一次进步变得更加容易。"
      },
      {
        "en": "Small gains compound across quadrants.",
        "cn": "各象限的小幅增长相互叠加。"
      },
      {
        "en": "Without economic foundation, other development becomes nearly impossible.",
        "cn": "如果没有经济基础，其他方面的发展几乎就无法实现。"
      },
      {
        "en": "“Money is often the one thing holding people back from reaching their next level of personal development.”",
        "cn": "“金钱往往是阻碍人们迈向个人发展新阶段的唯一因素。”"
      },
      {
        "en": "Before assessing where you are, clarify where you refuse to end up.",
        "cn": "在评估自己目前所处的位置之前，先弄清楚自己绝不愿最终落脚的地方。"
      },
      {
        "en": "The anti-vision provides immediate clarity when positive vision remains unclear.",
        "cn": "当积极愿景尚不明确时，反向愿景能立即带来清晰的认识。"
      },
      {
        "en": "Every solution reveals the next problem.",
        "cn": "每一个解决方案都会揭示下一个问题。"
      },
      {
        "en": "This isn’t a bug but the feature that drives evolution.",
        "cn": "这并非一个漏洞，而是推动进化的特性。"
      },
      {
        "en": "“Your purpose is the inception of your suffering, and you have the option to choose what you suffer for.”",
        "cn": "“你的目的就是你痛苦的开端，而你可以选择为了什么而受苦。”"
      },
      {
        "en": "The Hierarchy of Needs Connection: This maps to Maslow’s hierarchy, which both Csikszentmihalyi and Kotler reference.",
        "cn": "与需求层次理论的关联：这与马斯洛的需求层次理论相吻合，契克森米哈赖和科特勒都曾提及该理论。"
      },
      {
        "en": "Flow states become accessible only after basic security needs are met.",
        "cn": "只有在基本安全需求得到满足之后，才能进入心流状态。"
      },
      {
        "en": "Trying to develop higher capacities while in survival mode is neurobiologically impossible – the amygdala hijack prevents prefrontal cortex function.",
        "cn": "在生存模式下试图发展更高层次的能力在神经生物学上是不可能的——杏仁核劫持会阻碍前额叶皮层的功能。"
      },
      {
        "en": "Metacrisis Problem-Solving: Always ask: Does this solution create positive-sum dynamics?",
        "cn": "“元危机”问题解决：始终要问：这个解决方案是否会产生正和动态？"
      },
      {
        "en": "Does it address generator functions?",
        "cn": "它是否涉及生成器函数？"
      },
      {
        "en": "Does it enable others’ development?",
        "cn": "它能否促进他人的发展？"
      },
      {
        "en": "Instead of designing an ideal lifestyle then forcing yourself to follow it, solve the problems preventing natural integration.",
        "cn": "与其设计一种理想的生活方式，然后强迫自己去遵循，不如解决那些阻碍自然融入的问题。"
      },
      {
        "en": "Development emerges from intelligent problem-solving, not forced balance.",
        "cn": "发展源于明智地解决问题，而非强行寻求平衡。"
      },
      {
        "en": "What’s the ONE thing that, if solved, would unlock multiple quadrants?",
        "cn": "如果解决了哪一件事，就能同时打开多个领域的大门？"
      },
      {
        "en": "Don’t revolutionize everything.",
        "cn": "不要对一切都进行彻底的变革。"
      },
      {
        "en": "Find the smallest change that creates breathing room.",
        "cn": "找出能带来喘息之机的最小改变。"
      },
      {
        "en": "As the first problem loosens its grip, redirect freed resources to the next limitation.",
        "cn": "当第一个问题不再构成制约时，将释放出的资源重新分配到下一个制约因素上。"
      },
      {
        "en": "This creates an upward spiral where solving each problem provides resources for the next.",
        "cn": "这形成了一个良性循环，解决每一个问题都能为下一个问题提供资源。"
      },
      {
        "en": "Often, solving one problem reveals that the “next” problem wasn’t what you thought.",
        "cn": "很多时候，解决了一个问题后，才会发现“下一个”问题其实并非你所想的那样。"
      },
      {
        "en": "You build the business to have more time, only to discover you have low energy—the real constraint was Body, not Vocation.",
        "cn": "你创办企业本是为了拥有更多时间，却发现自己精力不济——真正的制约因素是“身体”，而非“事业”。"
      },
      {
        "en": "The mark of a free individual is that they do many things throughout their life.",
        "cn": "一个自由之人的标志在于，他一生中会做很多事情。"
      },
      {
        "en": "This requires them to learn how to learn, how to think, and how to earn.",
        "cn": "这要求他们学会如何学习、如何思考以及如何赚钱。"
      },
      {
        "en": "Writing checks all three boxes.”",
        "cn": "“这完全符合这三项要求。”"
      },
      {
        "en": "Flow Trigger Integration: This stack systematically activates multiple flow triggers: gratitude (risk/reward balance), movement (embodiment), learning (novelty), work prep (clear goals), connection (social triggers), reflection (immediate feedback).",
        "cn": "“心流触发器”整合：该体系会系统性地激活多种心流触发器：感恩（风险与回报的平衡）、运动（身体体验）、学习（新奇感）、工作准备（明确的目标）、联结（社交触发因素）、反思（即时反馈）。"
      },
      {
        "en": "The sequence primes all major neurochemical systems for optimal daily performance.",
        "cn": "该流程能激活所有主要神经化学系统，从而确保日常表现达到最佳状态。"
      },
      {
        "en": "Recovery Protocol: Based on flow research showing that recovery is active, not passive.",
        "cn": "恢复方案：基于“心流”研究，该研究表明恢复是主动的，而非被动的。"
      },
      {
        "en": "The evening stack facilitates memory consolidation (review), reduces anxiety (preparation), and triggers parasympathetic recovery (relaxation).",
        "cn": "晚间组合有助于记忆巩固（复习）、缓解焦虑（准备）并促进副交感神经系统的恢复（放松）。"
      },
      {
        "en": "For the first time in history, individuals have access to the same distribution power that once required entire corporations.",
        "cn": "在历史上首次，个人能够获得曾经需要整个企业才能拥有的分发能力。"
      },
      {
        "en": "The internet has democratized the means of production and distribution, allowing anyone with WiFi to reach millions.",
        "cn": "互联网使生产和分销手段民主化，让任何拥有Wi-Fi的人都能触达数百万受众。"
      },
      {
        "en": "What used to require printing presses, broadcast towers, or retail networks now requires only a laptop and authentic value creation.",
        "cn": "过去需要印刷机、广播塔或零售网络才能实现的事情，如今只需一台笔记本电脑和真正的价值创造即可。"
      },
      {
        "en": "This technological shift has made pursuing your life’s work not just possible but practical:",
        "cn": "这一技术变革使得追求毕生事业不仅成为可能，而且变得切实可行："
      },
      {
        "en": "Life is Problem-Solving: Every solution reveals the next problem.",
        "cn": "生活就是解决问题：每一个解决方案都会揭示下一个问题。"
      },
      {
        "en": "This is not a bug but the feature that drives evolution.",
        "cn": "这并非一个漏洞，而是推动进化的特性。"
      },
      {
        "en": "Problems are the limits on your potential—solving them expands who you can become.",
        "cn": "问题是你潜能的局限——解决这些问题，能拓展你未来可能成为的样子。"
      },
      {
        "en": "Integration Over Balance: Don’t force balance through willpower.",
        "cn": "整合重于平衡：不要靠意志力强行追求平衡。"
      },
      {
        "en": "Solve problems systematically until integration emerges naturally.",
        "cn": "有条不紊地解决问题，直到整合自然而然地形成。"
      },
      {
        "en": "Development is Fractal: The same patterns appear at every scale—individual, relationship, organization, society.",
        "cn": "发展具有分形性：相同的模式会出现在各个层面——个人、人际关系、组织、社会。"
      },
      {
        "en": "Transcend and Include: Higher levels don’t abandon lower capabilities but integrate them with greater choice and wisdom.",
        "cn": "超越与包容：更高的层次并非抛弃较低的能力，而是以更广阔的选择和更深邃的智慧将其融入其中。"
      },
      {
        "en": "Reality Has Levels: What’s true at one level may be false at another.",
        "cn": "现实具有层次性：在一个层面上成立的真理，在另一个层面上可能就是谬误。"
      },
      {
        "en": "Consciousness Creates Reality: As consciousness develops, the reality you inhabit literally changes.",
        "cn": "意识创造现实：随着意识的发展，你所身处的现实也会发生实质性的变化。"
      },
      {
        "en": "The Quality of Life Equation: Csikszentmihalyi’s fundamental insight – “The quality of life depends on what we do with consciousness” – underlies all these principles.",
        "cn": "“生活质量方程式”：契克森米哈赖的基本洞见——“生活质量取决于我们如何运用意识”——是所有这些原则的基础。"
      },
      {
        "en": "How we invest attention (psychic energy) literally determines our experienced reality.",
        "cn": "我们如何投入注意力（心理能量），实际上决定了我们所体验到的现实。"
      },
      {
        "en": "Everything is Connected: Change in one quadrant inevitably affects others.",
        "cn": "万物相连：一个象限的变化必然会影响其他象限。"
      },
      {
        "en": "Growth Requires Death: Each level transition requires ego death.",
        "cn": "成长离不开死亡：每次层级的跨越都需要经历“自我之死”。"
      },
      {
        "en": "Resistance to dying is resistance to growth.",
        "cn": "抗拒死亡就是抗拒成长。"
      },
      {
        "en": "The neuroscience of flow states reveals why—the prefrontal cortex (seat of ego/self) must downregulate for new patterns to emerge.",
        "cn": "“心流状态”的神经科学揭示了其中的原因——前额叶皮层（自我意识的中心）必须降低活性，新的模式才能出现。"
      },
      {
        "en": "The Map is Not Territory: Human 3.0 is a model, not reality.",
        "cn": "“地图并非疆域”：《人类3.0》是一个模型，而非现实。"
      },
      {
        "en": "Use it when useful, discard when not.",
        "cn": "有用时就用，没用时就扔。"
      },
      {
        "en": "The Game is Infinite: There’s no final level, no ultimate achievement.",
        "cn": "游戏是无穷无尽的：没有最终关卡，也没有终极成就。"
      },
      {
        "en": "The joy is in playing, not winning.",
        "cn": "乐趣在于参与，而非获胜。"
      },
      {
        "en": "The ultimate development is becoming fully autotelic—finding intrinsic reward in the process itself.",
        "cn": "最终的发展阶段是完全成为“为自身而存在”——在过程本身中找到内在的满足感。"
      },
      {
        "en": "Material as Portal: Don’t reject material pursuits—they’re often the only entry point to immaterial development.",
        "cn": "物质作为门户：不要排斥对物质的追求——它们往往是通向非物质发展的唯一切入点。"
      },
      {
        "en": "Like fitness, you start for vanity, stay for therapy, develop philosophical mastery.",
        "cn": "就像健身一样，起初是为了虚荣，后来是为了疗愈，最终则达到了哲学境界。"
      },
      {
        "en": "Anti-Vision Clarity: Sometimes knowing what you DON’T want provides clearer direction than positive vision.",
        "cn": "“反愿景”的清晰性：有时，明确自己“不想要什么”，比积极的愿景更能提供更清晰的方向。"
      },
      {
        "en": "Start with what you refuse to accept.",
        "cn": "从你无法接受的事情开始。"
      },
      {
        "en": "Agency Over Assignment: The fundamental choice is whether to live by others’ goals or create your own.",
        "cn": "自主性与任务分配：根本的选择在于，是按照他人的目标生活，还是创造属于自己的目标。"
      },
      {
        "en": "Shift from employee to entrepreneur mindset, regardless of profession.",
        "cn": "无论从事什么职业，都要从员工思维转变为创业者思维。"
      },
      {
        "en": "Writing as Thinking: Writing isn’t just communication—it’s how you develop thought itself.",
        "cn": "写作即思考：写作不仅仅是交流——它是发展思维本身的方式。"
      },
      {
        "en": "It’s the meta-skill for the future.",
        "cn": "这是未来的核心技能。"
      },
      {
        "en": "You Are the Niche: Don’t find a market, become one by solving your own problems.",
        "cn": "你就是那个利基市场：不要去寻找市场，而是通过解决自身的问题来成为那个市场。"
      },
      {
        "en": "Your unique identity is your competitive advantage.",
        "cn": "您独特的身份就是您的竞争优势。"
      },
      {
        "en": "Work Evolution is Natural: Job → Career → Calling isn’t forced progression but natural evolution when you solve the right problems.",
        "cn": "工作的演变是自然而然的：工作→职业→使命，这并非强行推进，而是在解决正确的问题时自然而然的演变。"
      },
      {
        "en": "Money as Energy: Money isn’t evil—it’s neutral energy.",
        "cn": "金钱即能量：金钱并非邪恶——它是一种中性的能量。"
      },
      {
        "en": "Demonizing it ensures you remain its slave rather than its master.",
        "cn": "将其妖魔化，只会让你继续成为它的奴隶，而非它的主人。"
      },
      {
        "en": "Purpose Creates Profit: When you solve meaningful problems for others, profit follows naturally.",
        "cn": "“目的创造利润”：当你为他人解决有意义的问题时，利润自然会随之而来。"
      },
      {
        "en": "Value creation and personal development are inseparable.",
        "cn": "价值创造与个人发展密不可分。"
      },
      {
        "en": "Nature’s Compass: Navigate by dancing between boredom and anxiety, secure and insecure, known and unknown.",
        "cn": "自然的指南针：在无聊与焦虑、安全与不安、已知与未知之间游走，以此指引方向。"
      },
      {
        "en": "Interest-Based Education: Lost → Interested → Obsessed → Repeat.",
        "cn": "基于兴趣的教育：失去兴趣 → 产生兴趣 → 着迷 → 循环往复。"
      },
      {
        "en": "This cycle, not curriculum, drives real learning.",
        "cn": "正是这个循环，而非课程，推动了真正的学习。"
      },
      {
        "en": "Individual: Become multidimensionally developed—not perfect, but integrated.",
        "cn": "个人：实现多维发展——并非追求完美，而是追求全面发展。"
      },
      {
        "en": "Create a life where work is play, relationships nourish, health is default, and meaning is abundant.",
        "cn": "创造一种生活：工作如游戏，人际关系充满滋养，健康是常态，而意义无处不在。"
      },
      {
        "en": "Develop an autotelic personality—finding intrinsic satisfaction in growth itself.",
        "cn": "培养一种“为自身而活”的人格——从成长本身中获得内在的满足感。"
      },
      {
        "en": "Collective: Enable others’ development through modeling, teaching, and creating structures.",
        "cn": "集体：通过以身作则、传授知识和建立机制，促进他人的发展。"
      },
      {
        "en": "Build communities and systems that support human flourishing.",
        "cn": "构建能够促进人类全面发展的社区和体系。"
      },
      {
        "en": "Contribute to cultural evolution through individual complexity growth.",
        "cn": "通过个体复杂性的增长，为文化演化做出贡献。"
      },
      {
        "en": "Evolutionary: Participate consciously in human evolution.",
        "cn": "进化：有意识地参与人类进化。"
      },
      {
        "en": "Push the boundaries of what’s possible.",
        "cn": "突破可能性的边界。"
      },
      {
        "en": "Leave the world more developed than you found it.",
        "cn": "让这个世界比你初来时更加繁荣。"
      },
      {
        "en": "Achieve “impossible” goals that advance the entire species.",
        "cn": "实现那些推动整个人类进步的“不可能”目标。"
      },
      {
        "en": "Civilizational: Contribute to humanity’s successful navigation of the metacrisis.",
        "cn": "文明层面：助力人类成功应对元危机。"
      },
      {
        "en": "Help create the third attractor—a civilization that is anti-rivalrous, regenerative, and wise.",
        "cn": "共同打造第三种吸引子——一个非竞争性、具有再生能力且充满智慧的文明。"
      },
      {
        "en": "We stand at the most significant transition in human history.",
        "cn": "我们正处于人类历史上最为重大的转折点。"
      },
      {
        "en": "The shift from Industrial/Informational to Integral-Planetary consciousness must happen in decades, not millennia.",
        "cn": "从工业/信息意识向整体-行星意识的转变必须在几十年内实现，而不是几千年。"
      },
      {
        "en": "Individual development isn’t just personal growth—it’s participating in humanity’s evolution.",
        "cn": "个人发展不仅仅是个人成长——更是参与人类的进化。"
      },
      {
        "en": "Every person who develops real sovereignty, wisdom, and integration contributes to the possibility of a viable future.",
        "cn": "每一个发展出真正的主权、智慧和内在统一的人，都在为创造一个充满希望的未来贡献力量。"
      },
      {
        "en": "The choice is simple but not easy: Remain at Level 1.0 following assignments until obsolescence, or develop toward Level 3.0+ creating anti-rivalrous value.",
        "cn": "选择很简单，但并不容易：是继续维持在1.0级，在完成各项任务后一直使用到过时为止，还是朝着3.0+级发展，创造非竞争性价值。"
      },
      {
        "en": "You’re either part of the problem or part of the solution.",
        "cn": "你要么是问题的一部分，要么是解决方案的一部分。"
      },
      {
        "en": "You’re either consuming substrate or creating regeneratively.",
        "cn": "你要么是在消耗基质，要么是在进行再生。"
      },
      {
        "en": "You’re either following assignments or generating agency.",
        "cn": "你要么是在完成任务，要么是在发挥主动性。"
      },
      {
        "en": "The only question is whether you’ll use them.",
        "cn": "唯一的问题是，你是否会使用它们。"
      },
      {
        "en": "Your anti-vision—the life you refuse to accept—is calling you toward your vision—the life you’re meant to create.",
        "cn": "你所抗拒的“非愿景”——即你拒绝接受的那种生活——正在引领你走向你的“愿景”——即你注定要创造的那种生活。"
      },
      {
        "en": "The problems you face aren’t obstacles; they’re the exact curriculum for your development.",
        "cn": "你面临的问题并非障碍；它们恰恰是你成长的必修课。"
      },
      {
        "en": "Solve the problem in front of you.",
        "cn": "解决眼前的问题。"
      },
      {
        "en": "Share the solution with others.",
        "cn": "将解决方案分享给其他人。"
      },
      {
        "en": "Repeat until you’ve become who you’re meant to be.",
        "cn": "不断重复，直到你成为你注定要成为的那个人。"
      },
      {
        "en": "Remember: “Your purpose is the inception of your suffering, and you have the option to choose what you suffer for.”",
        "cn": "请记住：“你的目标就是你痛苦的起点，而你可以选择为了什么而受苦。”"
      },
      {
        "img": "assets/covers/gr-a-complete-knowledge-base-of-human-3-0-1.jpg",
        "cap": ""
      },
      {
        "en": "Future-proof yourself with 2-4 premium guides, prompts, and strategies per month.",
        "cn": "每月获取 2 至 4 份优质指南、提示和策略，为未来做好准备。"
      },
      {
        "img": "assets/covers/gr-a-complete-knowledge-base-of-human-3-0-2.jpg",
        "cap": ""
      },
      {
        "en": "Find meaning, reinvent yourself, and create your ideal future.",
        "cn": "寻找人生意义，重塑自我，创造你理想中的未来。"
      },
      {
        "img": "assets/covers/gr-a-complete-knowledge-base-of-human-3-0-3.jpg",
        "cap": ""
      },
      {
        "en": "I am an author, creator, and founder.",
        "cn": "我是一名作家、创作者和创始人。"
      },
      {
        "en": "As a previous brand advisor for influencers and creators, I now teach writing, discovering your life’s work, and making a creative income.",
        "cn": "作为曾担任网红和内容创作者的品牌顾问，我现在主要教授写作、探索人生志业以及通过创意工作创造收入。"
      },
      {
        "en": "I dive deep into human potential, lifestyle design, and one-person businesses to give you a unique, digestible way of improving your life.",
        "cn": "我深入探讨人类潜能、生活方式设计以及个人创业，旨在为你提供一种独特且易于理解的生活改善之道。"
      },
      {
        "en": "Join 120,000+ changing their life with theory and practice about the mind, the internet, and the future.",
        "cn": "加入超过12万人的行列，通过关于心灵、互联网和未来的理论与实践，改变你的人生。"
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
    "cover": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "gradient": "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
    "coverImg": "assets/covers/gr-greg-brockman-inside-the-72-hours-that-almost-.jpg",
    "paras": [
      {
        "en": "Greg Brockman is the co-founder and President of OpenAI, the company behind ChatGPT and GPT-5.",
        "cn": "格雷格·布罗克曼是OpenAI的联合创始人兼总裁，该公司正是ChatGPT和GPT-5的开发者。"
      },
      {
        "en": "He was the first engineer at Stripe before leaving in 2015 to help start OpenAI.",
        "cn": "他是Stripe的第一位工程师，后于2015年离职，协助创立了OpenAI。"
      },
      {
        "en": "In this rare conversation, Greg goes inside the moments that built, and nearly broke, the most important AI company in the world.",
        "cn": "在这场难得的对话中，格雷格深入剖析了那些既造就了这家全球最重要的AI公司，又险些将其摧毁的关键时刻。"
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
        "en": "Greg explains how the original Napa offsite produced the three-step technical plan OpenAI has followed for a decade and the real reason OpenAI had to abandon its pure nonprofit structure.",
        "cn": "格雷格解释了最初那次在纳帕举行的闭门会议如何制定出了OpenAI过去十年一直遵循的三步技术计划，以及OpenAI不得不放弃其纯非营利组织结构的真正原因。"
      },
      {
        "en": "He then walks through the 72 hours after Sam Altman was fired: where he was when he got the board call, why he quit the same day, how the “Phoenix” backup company was designed at Sam’s house the next morning, and the moment Ilya Sutskever’s tweet changed everything.",
        "cn": "随后，他详细讲述了萨姆·阿尔特曼被解雇后的72小时：他接到董事会电话时身在何处，为何当天就辞职，次日清晨在萨姆家中是如何构思出“凤凰”这一备用方案的，以及伊利亚·苏茨克维尔的那条推文如何改变了一切。"
      },
      {
        "en": "From there, the conversation turns forward: whether we’re in a global AI race, how much of OpenAI’s own code is now written by AI (“it’s hard to know what percent is not “), why OpenAI stopped showing reasoning traces, what a compute-constrained world means for who gets access to AGI, and Greg’s answer to the question everyone is really asking: What happens to your job?",
        "cn": "随后，话题转向了未来：我们是否正处于一场全球人工智能竞赛之中，OpenAI 当前有多少代码是由人工智能编写的（“很难说有多少百分比不是由 AI 编写的”），OpenAI 为何停止展示推理轨迹，在计算资源受限的世界中，谁能获得通用人工智能（AGI）的访问权限，以及格雷格对大家真正关心的问题给出的答案：你的工作会怎样？"
      },
      {
        "en": "Head over to the Members Only area to access transcripts and other Member Only content.",
        "cn": "请前往“会员专区”，查看文字记录及其他仅限会员的内容。"
      },
      {
        "en": "David Baszucki is the co-founder and CEO of Roblox, a platform built around a simple idea: give people the tools and incentives to create …",
        "cn": "大卫·巴祖基（David Baszucki）是Roblox的联合创始人兼首席执行官，该平台基于一个简单的理念：为用户提供创作所需的工具和激励……"
      },
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
      },
      {
        "en": "Rockefeller became the richest man the world had ever known by thinking differently about business, competition, and family.",
        "cn": "洛克菲勒之所以能成为有史以来最富有的人，是因为他对商业、竞争和家庭有着与众不同的见解。"
      },
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
      },
      {
        "en": "Farnam Street participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising commissions by linking to Amazon.",
        "cn": "Farnam Street 参与了亚马逊服务有限责任公司（Amazon Services LLC）的联盟计划，该计划是一项联盟广告计划，旨在通过网站链接至亚马逊，为网站提供赚取广告佣金的途径。"
      }
    ]
  },
  {
    "id": "gr-roblox-ceo-how-to-make-better-decisions-by-fix",
    "cat": "成长",
    "title": "Roblox CEO: How to Make Better Decisions by Fixing Yourself First",
    "titleZh": "Roblox 首席执行官：如何通过先完善自己来做出更好的决策",
    "source": "Farnam Street · 2026-08-13",
    "date": "2026-08-13",
    "minutes": 3,
    "url": "https://fs.blog/knowledge-project-podcast/david-baszucki/",
    "cover": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "gradient": "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    "coverImg": "assets/covers/gr-roblox-ceo-how-to-make-better-decisions-by-fix.jpg",
    "paras": [
      {
        "en": "David Baszucki is the co-founder and CEO of Roblox, a platform built around a simple idea: give people the tools and incentives to create together.",
        "cn": "大卫·巴祖基是Roblox的联合创始人兼首席执行官，该平台基于一个简单的理念：为用户提供工具和激励，让他们能够共同进行创作。"
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
        "en": "In this short conversation, he shares how a health decision saved his son’s life and how it changed how he eats, why bureaucracy compounds unless you actively destroy it, monitoring your mind before making decisions, and why the best products often improve by removing complexity.",
        "cn": "在这段简短的对话中，他讲述了一个健康决策如何挽救了儿子的生命，以及这如何改变了他自己的饮食习惯；解释了为何官僚主义会不断累积——除非你主动打破它；探讨了在做出决策前如何观察自己的思维状态；并阐述了为何最好的产品往往通过消除复杂性而得到改进。"
      },
      {
        "en": "+ Members get the longer, extended version of this conversation, with additional content not included in the public release.",
        "cn": "+ 会员可获取本次对话的加长版，其中包含公开版本中未收录的额外内容。"
      },
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
      },
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
      },
      {
        "en": "Head over to the Members Only area to access transcripts and other Member Only content.",
        "cn": "请前往“会员专区”，查看文字记录及其他仅限会员的内容。"
      },
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
      },
      {
        "en": "Rockefeller became the richest man the world had ever known by thinking differently about business, competition, and family.",
        "cn": "洛克菲勒之所以能成为有史以来最富有的人，是因为他对商业、竞争和家庭有着与众不同的见解。"
      },
      {
        "en": "It drifts there one comfortable lie at a time.",
        "cn": "它就这样一次又一次地飘向那里，每个谎言都让人感到舒适。"
      },
      {
        "en": "Kaz Nejatian took over Opendoor when it was just months away from …",
        "cn": "当Opendoor距离……仅剩几个月时，卡兹·内贾蒂安接手了该公司……"
      },
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
      },
      {
        "en": "Farnam Street participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising commissions by linking to Amazon.",
        "cn": "Farnam Street 参与了亚马逊服务有限责任公司（Amazon Services LLC）的联盟计划，该计划是一项联盟广告计划，旨在通过网站链接至亚马逊，为网站提供赚取广告佣金的途径。"
      }
    ]
  },
  {
    "id": "gr-the-mindset-behind-building-a-great-little-bus",
    "cat": "成长",
    "title": "The Mindset Behind Building a Great Little Business | Brad Jacobs",
    "titleZh": "打造一家优秀的小企业的思维方式 | 布拉德·雅各布斯",
    "source": "Farnam Street · 2026-07-30",
    "date": "2026-07-30",
    "minutes": 2,
    "url": "https://fs.blog/knowledge-project-podcast/brad-jacobs-2/",
    "cover": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "gradient": "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
    "coverImg": "assets/covers/gr-the-mindset-behind-building-a-great-little-bus.jpg",
    "paras": [
      {
        "en": "This summer, I’m revisiting one of my favorite episodes.",
        "cn": "今年夏天，我打算重温我最喜欢的其中一集。"
      },
      {
        "en": "If you haven’t heard it, now is the time.",
        "cn": "如果你还没听过，现在正是时候。"
      },
      {
        "en": "If you have, it’s a classic and worth listening to again.",
        "cn": "如果你听过的话，这是一部经典之作，值得再次聆听。"
      },
      {
        "img": "assets/covers/gr-the-mindset-behind-building-a-great-little-bus-1.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-the-mindset-behind-building-a-great-little-bus-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-the-mindset-behind-building-a-great-little-bus-3.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-the-mindset-behind-building-a-great-little-bus-4.jpg",
        "cap": ""
      },
      {
        "en": "Brad Jacobs has built eight billion-dollar companies, completed more than 500 acquisitions, and created extraordinary returns for shareholders over four decades.",
        "cn": "布拉德·雅各布斯在四十多年间创立了八家市值达10亿美元的公司，完成了500多起收购，并为股东创造了非凡的回报。"
      },
      {
        "en": "Few people understand how great businesses are built better than he does.",
        "cn": "很少有人比他更了解如何打造伟大的企业。"
      },
      {
        "en": "This conversation is about the principles behind that success.",
        "cn": "这次对话探讨的是这一成功背后的原则。"
      },
      {
        "en": "Brad explains how he spots trends before they become obvious, why psychology matters as much as strategy, and how he thinks about acquisitions, hiring, capital allocation, decision-making, and building organizations that consistently outperform.",
        "cn": "布拉德阐述了他是如何在趋势显而易见之前就将其捕捉到的，为什么心理学与战略同样重要，以及他是如何思考并购、招聘、资本配置、决策，以及如何打造能够持续表现优异的组织。"
      },
      {
        "en": "He also shares lessons from therapy, meditation, and decades of leadership that changed how he manages people and makes decisions.",
        "cn": "他还分享了从心理治疗、冥想以及数十年的领导经验中汲取的经验教训，这些经历改变了他管理团队和做出决策的方式。"
      },
      {
        "en": "Head over to the Members Only area to access transcripts and other Member Only content.",
        "cn": "请前往“会员专区”，查看文字记录及其他仅限会员的内容。"
      },
      {
        "en": "David Baszucki is the co-founder and CEO of Roblox, a platform built around a simple idea: give people the tools and incentives to create …",
        "cn": "大卫·巴祖基（David Baszucki）是Roblox的联合创始人兼首席执行官，该平台基于一个简单的理念：为用户提供创作所需的工具和激励……"
      },
      {
        "en": "Rockefeller became the richest man the world had ever known by thinking differently about business, competition, and family.",
        "cn": "洛克菲勒之所以能成为有史以来最富有的人，是因为他对商业、竞争和家庭有着与众不同的见解。"
      },
      {
        "en": "It drifts there one comfortable lie at a time.",
        "cn": "它就这样一次又一次地飘向那里，每个谎言都让人感到舒适。"
      },
      {
        "en": "Kaz Nejatian took over Opendoor when it was just months away from …",
        "cn": "当Opendoor距离……仅剩几个月时，卡兹·内贾蒂安接手了该公司……"
      },
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
      },
      {
        "en": "Farnam Street participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising commissions by linking to Amazon.",
        "cn": "Farnam Street 参与了亚马逊服务有限责任公司（Amazon Services LLC）的联盟计划，该计划是一项联盟广告计划，旨在通过网站链接至亚马逊，为网站提供赚取广告佣金的途径。"
      }
    ]
  },
  {
    "id": "gr-listening-is-the-silencing-of-the-mind",
    "cat": "成长",
    "title": "Listening Is the Silencing of the Mind",
    "titleZh": "倾听即是让心静下来",
    "source": "More To That · 2026-04-16",
    "date": "2026-04-16",
    "minutes": 12,
    "url": "https://moretothat.com/listening-is-the-silencing-of-the-mind/",
    "cover": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "gradient": "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
    "coverImg": "assets/covers/gr-listening-is-the-silencing-of-the-mind.jpg",
    "paras": [
      {
        "en": "When you’re having a conversation with someone, we imagine it to look something like this.",
        "cn": "当你与某人交谈时，我们想象中的场景大概是这样的。"
      },
      {
        "img": "assets/covers/gr-listening-is-the-silencing-of-the-mind-1.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-listening-is-the-silencing-of-the-mind-2.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-listening-is-the-silencing-of-the-mind-3.jpg",
        "cap": ""
      },
      {
        "img": "assets/covers/gr-listening-is-the-silencing-of-the-mind-4.jpg",
        "cap": ""
      },
      {
        "en": "We equate conversation with the words that are spoken, but much of the dialogue is actually happening in your own mind.",
        "cn": "我们往往将对话等同于说出口的话语，但实际上，对话的很大一部分是在你自己的脑海中进行的。"
      },
      {
        "en": "When you listen to someone in this way, you’re scanning for the most compelling thing to respond to, knowing that your chance to speak will be coming up soon.",
        "cn": "当你以这种方式倾听他人时，你会在寻找最值得回应的内容，因为你知道自己很快就会有机会发言。"
      },
      {
        "en": "And once you’ve identified that interesting point, you begin to formulate your response to it, effectively tuning out whatever the person says after that.",
        "cn": "一旦你找到了这个有趣的切入点，你就会开始构思如何回应，从而实际上对对方之后说的话充耳不闻。"
      },
      {
        "en": "This is what I call Impulsive Listening, where your desire to listen is driven by the impulse to reply.",
        "cn": "这就是我所说的“冲动式倾听”，即你的倾听意愿是由回复的冲动所驱动的。"
      },
      {
        "en": "It’s when the volume of your own thoughts is louder than the words that may be spoken by the other, which puts you at the center of the conversation the whole way through.",
        "cn": "那就是当你内心的思绪比对方可能说出的话更响亮时，这让你在整个对话过程中始终处于中心位置。"
      },
      {
        "en": "Impulsive Listening is what causes anxiety throughout any given conversation.",
        "cn": "“冲动式倾听”正是导致任何一次对话中产生焦虑的原因。"
      },
      {
        "en": "When you’re so focused on what you’re going to say next, you feel like the spotlight is always on you, regardless of who’s talking.",
        "cn": "当你过于专注于接下来要说什么时，无论谁在说话，你都会觉得聚光灯总是照在你身上。"
      },
      {
        "en": "You’re often processing the person’s current point while formulating your reply to their previous point, and this deluge of thought nullifies your ability to be present.",
        "cn": "你往往一边处理对方当前提出的观点，一边构思对之前观点的回应，而这股思绪的洪流会让你无法保持当下。"
      },
      {
        "en": "So the key is to tame this impulse to reply.",
        "cn": "因此，关键在于克制这种想要回复的冲动。"
      },
      {
        "en": "But how do we go about doing that?",
        "cn": "但我们该如何着手去做呢？"
      },
      {
        "en": "After all, isn’t the very nature of conversation to respond to what another person has said?",
        "cn": "说到底，对话的本质不正是对他人所说的话作出回应吗？"
      },
      {
        "en": "Isn’t the game of ping-pong the most apt way to describe the flow of a good conversation?",
        "cn": "乒乓球比赛难道不是描述一场精彩对话的节奏最贴切的方式吗？"
      },
      {
        "en": "There is truth to this analogy, but one thing that’s worth asking is the following:",
        "cn": "这个比喻确实有其道理，但值得思考的一点是："
      },
      {
        "en": "If you sit with this question long enough, you’ll find that it’s not necessarily the back-and-forth nature of a conversation that makes it great.",
        "cn": "如果你花足够长的时间思考这个问题，就会发现，一场对话之所以精彩，并不一定在于它那种一问一答的性质。"
      },
      {
        "en": "It’s not the sustained rally of point-after-point that makes it compelling.",
        "cn": "让它引人入胜的，并不是那种接二连三、持续不断的连胜。"
      },
      {
        "en": "Rather, what makes a conversation feel worthwhile is if it expanded your mind.",
        "cn": "相反，让一次对话显得有意义的，在于它能否开阔你的视野。"
      },
      {
        "en": "It’s when you learned something interesting, felt something deep, or laughed heartily throughout.",
        "cn": "那就是当你学到了有趣的东西、产生了深刻的感触，或者从头到尾开怀大笑的时候。"
      },
      {
        "en": "In other words, a great conversation materializes when you give yourself the space to receive what the other has said, and your reaction happens then and there.",
        "cn": "换句话说，当你给自己留出空间去接纳对方所说的话，并且能当场做出回应时，一场精彩的对话便自然而然地发生了。"
      },
      {
        "en": "You’re not mentally bookmarking a statement to address for later, and you’re not trying to craft an intelligible remark to sound smart.",
        "cn": "你并不是在心里把某句话记下来以便稍后回应，也不是为了显得聪明而刻意构思一句通顺的评论。"
      },
      {
        "en": "We may understand this in theory, but it’s difficult to put into practice because we find silence discomforting.",
        "cn": "我们虽然在理论上能理解这一点，但要付诸实践却很难，因为我们觉得沉默让人感到不自在。"
      },
      {
        "en": "One of the immediate triggers of social anxiety is the “awkward silence,” and our desire to avoid it is perhaps the leading cause of Impulsive Listening.",
        "cn": "社交焦虑的直接诱因之一是“尴尬的沉默”，而我们想要避免这种沉默的愿望，或许正是“冲动式倾听”的主要原因。"
      },
      {
        "en": "We desperately want to have a response ready so that we don’t have to deal with the elevated heart rate that can accompany the absence of sound.",
        "cn": "我们迫切希望准备好相应的应对措施，这样就不用面对因缺乏声音而可能引发的心率加快了。"
      },
      {
        "en": "Well, the first thing you’ll realize when you sit with this question is that it depends on context.",
        "cn": "嗯，当你思考这个问题时，首先会意识到，这要看具体情况而定。"
      },
      {
        "en": "Silence on a meditation retreat isn’t just a requisite, it’s desired.",
        "cn": "在静修期间保持沉默不仅是一项要求，更是大家所期望的。"
      },
      {
        "en": "The same goes for when you take a walk in nature.",
        "cn": "在自然中散步时也是如此。"
      },
      {
        "en": "By giving yourself the space to still your mind, you allow clarity to seep in, one light ray at a time.",
        "cn": "通过给自己留出静心沉思的空间，你会让清明之光一缕一缕地渗入心间。"
      },
      {
        "en": "When you seek clarity within the scope of a conversation, you don’t expect it to be found in the absence of words.",
        "cn": "当你在对话中寻求清晰时，不会指望在无言之中找到它。"
      },
      {
        "en": "Rather, you look for them within the arrangement of the words themselves.",
        "cn": "相反，你应该在词语本身的排列组合中寻找它们。"
      },
      {
        "en": "It’s through the stream of dialogue that you expect clarity to flow its way through you.",
        "cn": "正是通过对话的流动，你才期待清晰之感能流经你的身心。"
      },
      {
        "en": "And because we place so much value on what is spoken, we judge the value of our contribution by the words we speak.",
        "cn": "正因为我们如此重视言语，所以我们会根据自己说出的话来评判自己所做贡献的价值。"
      },
      {
        "en": "The question of self-worth is at the center of all this, even if it’s subtle.",
        "cn": "自我价值的问题是这一切的核心，尽管它表现得并不明显。"
      },
      {
        "en": "If you have nothing to say in a conversation, you feel tense because a narrative of disapproval starts filling your mind.",
        "cn": "如果在交谈中无话可说，你会感到紧张，因为脑海中开始充斥着一种“不被认可”的想法。"
      },
      {
        "en": "Anxiety is most noticeable in the person that can’t allow silence to persist.",
        "cn": "焦虑在那些无法忍受沉默持续存在的人身上表现得最为明显。"
      },
      {
        "en": "Even a second of silence can be unbearable to some, and they’ll need to say something to alleviate the discomfort that may be arising in their mind and body.",
        "cn": "对某些人来说，哪怕只是一秒钟的沉默也难以忍受，他们需要说点什么来缓解心中和身体里可能产生的不适感。"
      },
      {
        "en": "For this person, real listening is an impossibility.",
        "cn": "对于此人而言，真正地倾听是不可能的。"
      },
      {
        "en": "In order to truly listen, we need to reframe our interpretation of silence.",
        "cn": "要想真正地倾听，我们需要重新审视对沉默的理解。"
      },
      {
        "en": "Instead of viewing it as a marker of a flat conversation, we need to see it as a signal of a point that is being internalized.",
        "cn": "我们不应将其视为对话停滞的标志，而应将其视为该观点正在被内化的信号。"
      },
      {
        "en": "As a way of communicating that you were truly listening to their point, which is why you now need a moment to process and formulate a response.",
        "cn": "这是为了向对方表明，你确实在认真倾听他们的观点，因此现在需要片刻时间来消化并组织回答。"
      },
      {
        "en": "When you’re meeting someone for the first time (or when you don’t know the other person that well), silence will likely have the opposite effect.",
        "cn": "当你第一次与某人见面时（或者当你不太了解对方时），沉默很可能适得其反。"
      },
      {
        "en": "Oftentimes, the other person may interpret your silence as an indicator that you weren’t listening to what they were saying.",
        "cn": "很多时候，对方可能会把你的沉默理解为没在听他说话的迹象。"
      },
      {
        "en": "That’s because when you don’t know someone well, you’re reliant upon dialogue to make up for that gap in shared experience.",
        "cn": "这是因为，当你对某人不太了解时，你只能依靠对话来弥补双方共同经历上的差距。"
      },
      {
        "en": "And when the dialogue isn’t flowing back-and-forth, it feels like there’s not much in common between you after all.",
        "cn": "而当对话无法自然地来回进行时，就会让人觉得你们之间果然没什么共同点。"
      },
      {
        "en": "That’s why anxiety tends to be higher when you’re with people you don’t know.",
        "cn": "这就是为什么当你和陌生人在一起时，焦虑感往往会更强。"
      },
      {
        "en": "The words you speak hold more weight, and the absence of them makes you feel like you’re dropping the ball on this interaction.",
        "cn": "你所说的话分量更重，而若不说话，你会觉得自己在这次互动中失了分寸。"
      },
      {
        "en": "Given this dynamic, it’s hard to truly listen to what the other is saying, and to override the impulse to latch onto a statement and formulate a response right away.",
        "cn": "鉴于这种动态，很难真正倾听对方在说什么，也很难克制住那种抓住对方的一句话就立刻构思回应的冲动。"
      },
      {
        "en": "In these situations, it’s important to ease into the silence.",
        "cn": "在这种情况下，重要的是要慢慢适应沉默。"
      },
      {
        "en": "You want to be fully present and listen to everything they’re saying, but to also let them know that you’re processing things shortly afterward.",
        "cn": "你既要全神贯注地倾听对方说的每一句话，也要让他们知道，你会在稍后对这些内容进行消化。"
      },
      {
        "en": "That way your silence isn’t misinterpreted as indifference.",
        "cn": "这样一来，你的沉默就不会被误解为冷漠。"
      },
      {
        "en": "One way I do this is to simply let the other person know that I need a moment to think through what was said.",
        "cn": "我做到这一点的一种方法，就是简单地告诉对方，我需要一点时间来仔细思考刚才说的话。"
      },
      {
        "en": "I could either be explicit about it:",
        "cn": "我也可以直接说明这一点："
      },
      {
        "en": "It’s remarkable how something so simple changes the texture of silence.",
        "cn": "如此简单的事物竟能改变寂静的质感，这真是令人惊叹。"
      },
      {
        "en": "By prefacing that you need a moment, you’re indicating that (1) you were really listening, and that (2) this silent period shouldn’t be awkward.",
        "cn": "通过先说“我需要片刻时间”，你既表明了（1）你一直在认真倾听，也表明（2）这段沉默的间隙不应显得尴尬。"
      },
      {
        "en": "This makes the silence feel welcome, and opens up the breathing room required to process the dialogue in a mindful manner.",
        "cn": "这让人感到沉默是件好事，并为以正念的方式消化对话提供了必要的喘息空间。"
      },
      {
        "en": "So what about people you do know well?",
        "cn": "那么，对于你很熟悉的人呢？"
      },
      {
        "en": "How can you ensure that you’re listening to them with full presence of mind?",
        "cn": "你该如何确保自己全神贯注地倾听他们呢？"
      },
      {
        "en": "What I find most interesting about close relationships is how we tend to take them for granted.",
        "cn": "关于亲密关系，我觉得最有趣的一点是，我们往往会把它们视为理所当然。"
      },
      {
        "en": "That the more comfortable you are with someone, the more permission you give yourself to put your brain on auto-pilot and tune out at any given moment.",
        "cn": "你和某人相处得越自在，就越会允许自己在任何时候让大脑进入自动驾驶模式，将外界隔绝在外。"
      },
      {
        "en": "Think of the quintessential image of a family having dinner at a restaurant, where everyone is on their phones:",
        "cn": "试想一下这样一幅典型的画面：一家人在餐厅共进晚餐，却人人都低头玩手机："
      },
      {
        "en": "Or how it becomes okay to zone out during a conversation you’re having with your partner:",
        "cn": "或者，为什么在和伴侣交谈时走神会变得可以接受："
      },
      {
        "en": "Things that we’d never do when we meet someone for the first time become commonplace for the people we see all the time.",
        "cn": "那些在初次见面时我们绝不会做的事，对于经常见面的人来说却成了家常便饭。"
      },
      {
        "en": "In one sense, that’s why close relationships are so precious.",
        "cn": "从某种意义上说，这就是亲密关系如此珍贵的原因。"
      },
      {
        "en": "You can let your guard down and occupy a rare space where mannerisms and norms don’t govern it.",
        "cn": "你可以放下戒备，置身于一个难得的空间，在那里，举止和规范不再起主导作用。"
      },
      {
        "en": "But on the other hand, it’s easy to get complacent and miss every opportunity to get to know one another better.",
        "cn": "但另一方面，人们很容易因此而自满，从而错失每一个加深彼此了解的机会。"
      },
      {
        "en": "Just because you know someone well doesn’t mean that you’ve uncovered everything there is to know.",
        "cn": "仅仅因为你很了解某人，并不意味着你已经完全了解了他的一切。"
      },
      {
        "en": "Every human being possesses an incredibly nuanced and fascinating mind, and even if you’ve known one another for decades, there is always more terrain to cover.",
        "cn": "每个人都拥有一颗极其丰富且引人入胜的心灵，即使彼此相识数十年，也总有更多值得探索的领域。"
      },
      {
        "en": "So when it comes to the people you know well, the art of listening is to reinvigorate your interest in learning more about them.",
        "cn": "因此，对于你熟悉的人来说，倾听的艺术在于重新激发你进一步了解他们的兴趣。"
      },
      {
        "en": "To not take the silence for granted, and to view it as an indicator for you to ask questions and to allow dialogue to take center stage once again.",
        "cn": "不要把沉默视为理所当然，而应将其视为一个信号，促使你去提出问题，并让对话再次成为焦点。"
      },
      {
        "en": "For example, I’ve known my wife for close to a decade now.",
        "cn": "例如，我和我妻子相识至今已有近十年了。"
      },
      {
        "en": "We’ve shared thousands of meals together, and I’m not going to sit here and tell you that each one was full of mind-blowing dialogue that uncovered some core element of who we are.",
        "cn": "我们一起共进过数千顿饭，但我不会坐在这里告诉你，每一顿饭都充满了令人惊叹的对话，揭示了我们本质的某些核心要素。"
      },
      {
        "en": "There were plenty of unremarkable meals where we just watched TV together or sat in silence while we were thinking our own thoughts.",
        "cn": "有很多平淡无奇的饭局，我们只是一起看电视，或者默默坐着，各自沉浸在自己的思绪中。"
      },
      {
        "en": "But there have also been many, many meals where we asked each other a bunch of questions, spoke about our greatest fears, and celebrated our small triumphs.",
        "cn": "但也有许多、许多次用餐时光，我们互相询问了许多问题，谈论过各自最大的恐惧，也共同庆祝过那些微小的成就。"
      },
      {
        "en": "With each of these conversations, we learned a bit more about one another, and understood that one life contains multitudes.",
        "cn": "通过每一次这样的交谈，我们对彼此都有了更深的了解，并意识到一个生命中蕴含着无数的可能性。"
      },
      {
        "en": "Neither me nor my wife are the same person we were 10 years ago, and it’s only through consistent dialogue where we realize how much our worldviews have changed, and how we’re attempting to align ours together over time.",
        "cn": "无论是我还是我妻子，都已不再是10年前的那个自己了，正是通过持续的交流，我们才意识到彼此的世界观发生了多大的变化，以及我们如何随着时间的推移，努力让彼此的世界观趋于一致。"
      },
      {
        "en": "The art of listening isn’t just about taking in what the other person is saying.",
        "cn": "倾听的艺术不仅仅在于接受对方所说的话。"
      },
      {
        "en": "It’s also about reassuring the other person that you haven’t extinguished the flame of curiosity when it comes to your bond.",
        "cn": "这同时也意味着要让对方放心，你对你们之间关系的兴趣之火并未熄灭。"
      },
      {
        "en": "That you’re not going to be complacent.",
        "cn": "你不会自满。"
      },
      {
        "en": "That you’re not going to be okay with treating silence as a given, despite the privilege you have of being comfortable with it.",
        "cn": "尽管你拥有能够从容面对沉默的特权，但你不能理所当然地认为沉默是理所当然的。"
      },
      {
        "en": "Listening is the silencing of the mind, but it’s also being aware of when it’s time to speak again.",
        "cn": "倾听意味着让思绪沉静下来，但也意味着要意识到何时该再次开口。"
      },
      {
        "en": "It’s about listening without the desire to respond, but giving space to process those words so you can respond in a thoughtful manner.",
        "cn": "这指的是倾听时不急于回应，而是留出空间来消化对方的话，以便能经过深思熟虑后再作回应。"
      },
      {
        "en": "Ultimately, to listen is to be compassionate.",
        "cn": "归根结底，倾听就是一种慈悲。"
      },
      {
        "en": "And when conversation becomes a vehicle for kindness, you will notice just how powerful each one can be.",
        "cn": "而当对话成为传递善意的载体时，你就会发现，每一次对话都蕴含着多么强大的力量。"
      }
    ]
  },
  {
    "id": "gr-tales-from-the-island-of-illness",
    "cat": "成长",
    "title": "Tales From the Island of Illness",
    "titleZh": "《疾病之岛的故事》",
    "source": "More To That · 2025-07-22",
    "date": "2025-07-22",
    "minutes": 18,
    "url": "https://moretothat.com/tales-from-the-island-of-illness/",
    "cover": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "gradient": "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)",
    "coverImg": "assets/covers/gr-tales-from-the-island-of-illness.jpg",
    "paras": [
      {
        "img": "assets/covers/gr-tales-from-the-island-of-illness-1.jpg",
        "cap": ""
      },
      {
        "en": "There’s a feeling of isolation that accompanies an illness of any kind, which only broadens the scope of your suffering.",
        "cn": "任何疾病都会带来一种孤独感，这只会加剧你的痛苦。"
      },
      {
        "en": "Since all physiological changes are localized to your body or mind, it often feels like no one is experiencing these mishaps but you.",
        "cn": "由于所有生理变化都仅发生在你的身体或内心，因此你常常会觉得，除了你自己，没有人会经历这些不顺心的事。"
      },
      {
        "en": "You start thinking that everyone else must be getting along just fine, and that you’re the lone exception in a world full of healthy and vibrant people.",
        "cn": "你会开始觉得，其他人肯定都过得很好，而在这个充满健康活力的世界里，只有你是个例外。"
      },
      {
        "img": "assets/covers/gr-tales-from-the-island-of-illness-2.jpg",
        "cap": ""
      },
      {
        "en": "The truth is that there are many, many people on that island of illness with you.",
        "cn": "事实上，在那座“疾病之岛”上，还有许多、许多人与你同在。"
      },
      {
        "en": "You just don’t realize it because sick people tend to navigate their conditions quietly, speaking of it only with their caretakers and loved ones.",
        "cn": "你只是没有意识到这一点，因为病人往往会默默应对自己的病情，只向照顾者和亲人提及此事。"
      },
      {
        "en": "People that you meet at the store or gym might be struggling with a chronic health issue, but the odds of you hearing about it are low.",
        "cn": "你在商店或健身房遇到的人，可能正饱受某种慢性健康问题的困扰，但你得知此事的可能性很小。"
      },
      {
        "en": "This doesn’t change the fact that they are on that island with you, but the absence of that knowledge leads to the assumption that they are in pristine health while you are not.",
        "cn": "这并不改变他们与你同在那个岛上的事实，但正因为不知道这一点，才会让人误以为他们身体非常健康，而你却并非如此。"
      },
      {
        "img": "assets/covers/gr-tales-from-the-island-of-illness-3.jpg",
        "cap": ""
      },
      {
        "en": "It is for this reason that I am creating this piece.",
        "cn": "正是出于这个原因，我才创作了这件作品。"
      },
      {
        "en": "I was initially hesitant to write about my personal health issues because they have always remained a private matter, but since having the above realization, I felt compelled to discuss them more openly.",
        "cn": "起初，我曾犹豫是否要写下自己的健康问题，因为这些一直都是私事；但自从有了上述领悟后，我感到有必要更坦率地谈谈这些话题。"
      },
      {
        "en": "Readers of my work likely haven’t given any thought to my health, and that’s not due to some cold species of indifference.",
        "cn": "读过我作品的读者可能从未关心过我的健康状况，但这并非出于某种冷漠无情的态度。"
      },
      {
        "en": "It’s because I’ve never publicly discussed it before, and when one’s health isn’t mentioned, the assumption is that everything is fine.",
        "cn": "这是因为我以前从未公开谈论过这件事，而当人们不提及一个人的健康状况时，通常会认为一切都很好。"
      },
      {
        "en": "The truth, however, is that I dwell on the very island that you may also inhabit.",
        "cn": "然而，事实是，我居住的正是你可能也居住的那座岛屿。"
      },
      {
        "en": "And if knowing this helps you feel a little less alone, then it will have been worth it for me to disclose my struggles.",
        "cn": "如果知道这一点能让你感觉不那么孤单，那么我坦诚分享自己的挣扎就值得了。"
      },
      {
        "en": "While I have nothing to offer in the form of medical advice, I have learned a thing or two about what it takes to navigate this island with a sound mind.",
        "cn": "虽然我无法提供任何医疗建议，但我确实学到了一些关于如何在这座岛上保持头脑清醒的诀窍。"
      },
      {
        "en": "After all, managing the biological symptoms of illness is a big part of the picture, but the other part is about strengthening the psychological frame that is used to endure it.",
        "cn": "毕竟，控制疾病的生理症状固然是治疗的重要组成部分，但另一部分则在于增强承受病痛所需的心理韧性。"
      },
      {
        "en": "The latter is where I hope this essay finds its use.",
        "cn": "我希望这篇文章能在后者方面发挥作用。"
      },
      {
        "en": "My initial foray into chronic illness began on December 2019 when I was meditating in my room.",
        "cn": "我与慢性病初次打交道始于2019年12月，当时我正在自己的房间里打坐。"
      },
      {
        "en": "It was nighttime, everything was dark, and it was just me, a cushion, and my mind.",
        "cn": "那时已是深夜，四周一片漆黑，只有我、一个靠垫和我的思绪。"
      },
      {
        "en": "If anything, the reason I remember its onset so clearly was because how sparse my environment was at the time.",
        "cn": "要说原因的话，我之所以对它的起始阶段记忆如此深刻，正是因为当时周围的环境是如此空旷。"
      },
      {
        "en": "A few minutes into the session, I began to hear a high-pitched buzzing in my right ear.",
        "cn": "治疗开始几分钟后，我开始听到右耳里传来一阵高频率的嗡嗡声。"
      },
      {
        "en": "Imagine it sounding like the electrical interference that emanates from power lines, only pitched a few octaves higher.",
        "cn": "试想一下，那声音就像是从输电线中传出的电气干扰声，只是音高高了几个八度。"
      },
      {
        "en": "I first thought there was a loose wire in my room that was producing the noise, but I couldn’t find anything of the sort.",
        "cn": "起初我以为是房间里有根电线松了，才发出了那种声音，但我没找到任何此类情况。"
      },
      {
        "en": "This sound was all-consuming, and I was deeply distressed.",
        "cn": "这声音令人心神俱碎，我感到无比痛苦。"
      },
      {
        "en": "I somehow managed to fall asleep that night, but when I woke up, I was horrified to notice that it was still there.",
        "cn": "那天晚上我总算睡着了，但醒来时，我惊恐地发现它还在那里。"
      },
      {
        "en": "It didn’t matter what ear exercises I did or what remedies I tried, the noise wouldn’t dissipate.",
        "cn": "无论我做什么样的听力训练，还是尝试什么样的方法，那种噪音都始终不肯消失。"
      },
      {
        "en": "The next few weeks consisted of doctor’s visits, medication, herbs, acupuncture, and anything I felt would help alleviate this condition (known as tinnitus).",
        "cn": "接下来的几周里，我忙着看医生、吃药、服用草药、做针灸，以及尝试任何我觉得有助于缓解这种症状（即耳鸣）的方法。"
      },
      {
        "en": "Nothing worked, and as the weeks transitioned to months, it dawned on me that this wasn’t going away.",
        "cn": "无论怎么做都没用，随着几周渐渐变成了几个月，我才恍然意识到，这个问题不会自行消失。"
      },
      {
        "en": "Fast forward to today, and that high-pitched noise is just as present now as it was five years ago.",
        "cn": "快进到今天，那种尖锐的噪音依然和五年前一样存在。"
      },
      {
        "en": "Tinnitus took away one of the things I appreciated most about life: silence.",
        "cn": "耳鸣夺走了我最珍视的生活之一：寂静。"
      },
      {
        "en": "Every meditation session is now accompanied by oscillations in high-end frequencies, and every night before I sleep, I turn on a sound machine to mask it.",
        "cn": "现在每次冥想时都会伴随着高频振荡，而且每晚睡前，我都会打开一台声音机来掩盖这种声音。"
      },
      {
        "en": "When I write, I play music to help anchor my attention.",
        "cn": "写作时，我会放点音乐来帮助集中注意力。"
      },
      {
        "en": "When I read, I often do the same.",
        "cn": "我读书时，也经常这样做。"
      },
      {
        "en": "To say that tinnitus has required adjustments is an understatement, but thanks to mental training and the passage of time, I’ve been able to cultivate equanimity alongside it.",
        "cn": "说耳鸣让我不得不做出调整，这还算轻描淡写；但多亏了心理训练和时间的流逝，我得以在与耳鸣共处的同时培养出泰然自若的心态。"
      },
      {
        "en": "I go to Korea every year to visit my parents, and each visit is generally characterized by happy memories and abundant photos.",
        "cn": "我每年都会去韩国看望父母，每次探亲通常都会留下美好的回忆和大量照片。"
      },
      {
        "en": "So when my wife, daughter, brother, and I boarded the plane this past summer to Seoul, we didn’t anticipate that anything would be different.",
        "cn": "因此，当去年夏天我和妻子、女儿、弟弟一起登上飞往首尔的飞机时，我们并没有预料到会有什么不同。"
      },
      {
        "en": "About a week after we arrived, I started experiencing something that was more distressing than my tinnitus.",
        "cn": "我们抵达大约一周后，我开始出现一种比耳鸣更令人痛苦的症状。"
      },
      {
        "en": "For reasons that are still mysterious, I began to feel fullness in both of my ears, accompanied by piercing headaches that made me want to lay down whenever possible.",
        "cn": "出于至今仍是个谜的原因，我开始感到双耳有胀满感，还伴随着刺痛般的头痛，这让我一有机会就想躺下休息。"
      },
      {
        "en": "The fullness also made my hearing muffled, which only added to the disorienting nature of my newfound predicament.",
        "cn": "这种饱胀感还让我的听觉变得模糊不清，这更增添了我所处的新困境带来的迷失感。"
      },
      {
        "en": "These were sensations I’d never felt before, and my ears were the eye of the hurricane that was producing them.",
        "cn": "这些是我从未体验过的感觉，而我的耳朵正是引发这些感觉的“飓风眼”。"
      },
      {
        "en": "As if this weren’t enough, a few days later I began to hear unpleasant crackling sounds whenever I would swallow or make certain movements with my jaw.",
        "cn": "仿佛这还不够似的，几天后，每当我吞咽或做某些下颌动作时，就开始听到令人不适的咔哒声。"
      },
      {
        "en": "In addition, my tinnitus seemed to be spiking in volume, which only amplified the stress that I was already under.",
        "cn": "此外，我的耳鸣似乎变得越来越响，这更让我本就承受的压力雪上加霜。"
      },
      {
        "en": "This combination of ear fullness, headaches, crackling noises, and heightened tinnitus was all happening at once, and it made that initial week feel like an utter pit of despair.",
        "cn": "耳朵胀满、头痛、噼啪声以及加剧的耳鸣这些症状同时出现，让那最初的一周感觉仿佛坠入了绝望的深渊。"
      },
      {
        "en": "Shortly after the onset of these symptoms, I began a treatment regimen in Korea from a doctor that specialized in hearing conditions.",
        "cn": "这些症状出现后不久，我就在韩国开始接受一位听力疾病专科医生的治疗。"
      },
      {
        "en": "I had 6 weeks left in the country, and decided to dedicate 3 days each week to receiving treatment in the hopes that my symptoms would either reduce or retreat during that time.",
        "cn": "我在该国还剩6周时间，于是决定每周抽出3天接受治疗，希望在此期间我的症状能有所缓解或消失。"
      },
      {
        "en": "While the doctor tried his best, the results were mixed.",
        "cn": "尽管医生已尽了最大努力，但结果却喜忧参半。"
      },
      {
        "en": "The headaches abated and the crackling in my left ear decreased, but the sensations of fullness along with the crackling and tinnitus in my right ear remained.",
        "cn": "头痛缓解了，左耳的噼啪声也减轻了，但右耳的胀满感以及噼啪声和耳鸣仍然存在。"
      },
      {
        "en": "There was a slight ray of improvement, but the cloud of disappointment hovered over us as I embraced and waved goodbye to my parents at the end of my stay.",
        "cn": "虽然情况略有好转，但当我在逗留结束时拥抱父母并向他们挥手告别时，失望的阴云仍笼罩着我们。"
      },
      {
        "en": "When I got back to Los Angeles, I knew that the prospect of a solution was even dimmer.",
        "cn": "回到洛杉矶后，我意识到问题的解决前景变得更加渺茫了。"
      },
      {
        "en": "Western medicine offers little in the way of ear-related symptoms, as the approach is localized entirely to what they can see in the ear canal itself.",
        "cn": "西医在治疗与耳朵相关的症状方面收效甚微，因为其治疗方法完全局限于耳道内肉眼可见的病变。"
      },
      {
        "en": "In these moments, it’s easy to feel frustrated and to grow increasingly frantic in the search for a cure.",
        "cn": "在这些时刻，人们很容易感到沮丧，并在寻找疗法的过程中变得越来越焦躁。"
      },
      {
        "en": "After all, this behavior is perfectly justifiable for anyone on the island of illness, as every inhabitant is unified by the desire to get off it.",
        "cn": "毕竟，对于身处“疾病之岛”的任何人来说，这种行为都是完全可以理解的，因为岛上每个居民都怀着同一种愿望——想要离开这里。"
      },
      {
        "en": "Every sick person attempts to build a bridge that will take them to the land of good health, and the question they ask themselves is a matter of when it’ll be built.",
        "cn": "每个病人都在努力搭建一座通往健康之地的桥梁，而他们自问的问题是：这座桥何时才能建成。"
      },
      {
        "en": "But having been on the island myself, I wonder if this is the right question to ask.",
        "cn": "但我自己去过那个岛，不禁怀疑这到底是不是该问的问题。"
      },
      {
        "en": "Not because I don’t want to get better (that would certainly be nice), but because it ignores the reality of my day-to-day experience.",
        "cn": "并不是因为我不想变得更好（那当然很好），而是因为这忽略了我日常生活的现实。"
      },
      {
        "en": "If I’m so focused on the question of when I’ll be restored to pristine health, then my attention will be diverted away from what I’m currently experiencing.",
        "cn": "如果我过于关注“何时才能恢复如初”这个问题，那么我的注意力就会从当下正在经历的事情上转移开。"
      },
      {
        "en": "I will always be focused on some imagined future state, which will seem more favorable than whatever the present moment contains.",
        "cn": "我总是会将注意力集中在某种想象中的未来状态上，这种状态看起来会比当下所处的任何境况都要美好。"
      },
      {
        "en": "The issue, however, is that today is the only day that matters because it’s the only day I’ll ever truly experience.",
        "cn": "然而，问题在于，今天才是唯一重要的日子，因为这是我唯一真正能亲身经历的一天。"
      },
      {
        "en": "Tomorrow is nothing but a projection of my hopes and fears, and fixating on it means that I’ll always be living within the confines of my own thoughts.",
        "cn": "明天不过是我希望与恐惧的投影，而一味执着于它，就意味着我将永远困在自己思绪的牢笼里。"
      },
      {
        "en": "I understood this when I dealt with my tinnitus back in 2019, and I was forced to re-learn this lesson in the summer of 2024 as well.",
        "cn": "2019年我应对耳鸣时就明白了这一点，而在2024年夏天，我也不得不再次领悟这一道理。"
      },
      {
        "en": "I couldn’t wait for contentment to arrive on some future date; I had to cultivate it now, even when my body was being gripped by precarious forces.",
        "cn": "我无法坐等未来某一天的满足感降临；我必须现在就开始培养这种满足感，即使那时我的身体正被某种不稳定的力量所掌控。"
      },
      {
        "en": "The island may not be the most comfortable of all places, but there were still plenty of things worth celebrating here.",
        "cn": "这座岛或许不是最舒适的地方，但这里依然有许多值得庆祝的事情。"
      },
      {
        "en": "One thing I did since the onset of my symptoms was to continue my routine of meditating, journaling, and exercising each day.",
        "cn": "自从出现症状以来，我坚持做的一件事就是每天照常进行冥想、写日记和锻炼。"
      },
      {
        "en": "There were many days where this was incredibly difficult to do, but it was critical that I did it anyway.",
        "cn": "虽然有许多天做到这一点非常困难，但我无论如何都必须坚持下去。"
      },
      {
        "en": "This is because these things have historically stabilized my mind, and I wanted to use that history to my advantage by applying it in the present moment.",
        "cn": "这是因为这些事情在过去一直能让我保持内心的平静，而我想利用这段经历，将其应用到当下，从而从中获益。"
      },
      {
        "en": "As a result, there were some mornings that felt peaceful despite the sensations in my ears, and this helped me realize that I was capable of accessing contentment, even if that contact was brief.",
        "cn": "因此，尽管耳朵里总有些异样感，但有些早晨我依然感到心平气和，这让我意识到，即使这种感觉只是转瞬即逝，我依然能够获得内心的满足。"
      },
      {
        "en": "As long as the capability was there, I knew that its duration could be extended over time.",
        "cn": "只要具备这种能力，我就知道它的持续时间可以随着时间的推移而延长。"
      },
      {
        "en": "Another thing was to continue engaging with my family and community.",
        "cn": "另一件事是继续与家人和社区保持联系。"
      },
      {
        "en": "When you’re sick, the initial impulse is to shut yourself off from the world and retreat into your own mind.",
        "cn": "生病时，人的第一反应往往是与世隔绝，退入自己的内心世界。"
      },
      {
        "en": "Being sick is both physically and emotionally draining, and the last thing you want is to present this depleted version of yourself to anybody.",
        "cn": "生病不仅会让人身心俱疲，而且你最不愿做的，就是让别人看到自己这副疲惫不堪的样子。"
      },
      {
        "en": "This is understandable, but you must remember that you are withdrawing access to contentment by doing this.",
        "cn": "这可以理解，但你必须记住，这样做会让你失去获得满足感的机会。"
      },
      {
        "en": "No pill can make up for the warmth you’ll feel when you open yourself up to your loved ones, and this warmth is what you need most when you’re feeling unwell.",
        "cn": "没有任何药物能替代你向亲人敞开心扉时所感受到的温暖，而这种温暖正是你在身体不适时最需要的。"
      },
      {
        "en": "Being in Korea during this time was a blessing because I was able to see my family everyday, whether I was feeling up to it or not.",
        "cn": "这段时间能在韩国真是件幸事，因为无论我心情好坏，每天都能见到家人。"
      },
      {
        "en": "And on the topic of community, I made it a point to continue working on my creative endeavors.",
        "cn": "说到社区的话题，我特意继续投入到自己的创作中。"
      },
      {
        "en": "For example, I had a number of consulting calls scheduled over the summer, and my initial thought was to cancel them all as I dwelled on the island.",
        "cn": "例如，我原本计划在整个夏天进行几通咨询电话，但当时我正沉浸在岛上的生活里，起初的想法是把这些电话全都取消。"
      },
      {
        "en": "But then I asked myself why I would do this, and all roads pointed back to fear.",
        "cn": "但随后我问自己为什么要这么做，所有线索都指向了恐惧。"
      },
      {
        "en": "I was worried that my condition made me a shell of myself, and that I might no longer be able to adequately help my clients.",
        "cn": "我担心自己的状况让我变得形同虚设，可能再也无法充分地帮助我的客户了。"
      },
      {
        "en": "When I realized this, I immediately did the opposite.",
        "cn": "当我意识到这一点时，我立刻做了相反的事。"
      },
      {
        "en": "I confirmed all the calls I had, reviewed my notes, and showed up for every single one like I always did.",
        "cn": "我确认了所有预约的电话，复习了笔记，并像往常一样准时出席了每一场活动。"
      },
      {
        "en": "What’s interesting is that during one of the sessions, a long-standing client said it was one of the best sessions we’d ever had.",
        "cn": "有趣的是，在其中一次咨询中，一位长期客户表示，这是我们迄今为止进行过的最棒的咨询之一。"
      },
      {
        "en": "This only confirmed what I already knew: that all the fears I had were driven by false assumptions, and that I would test it through experience to reveal their deceptive nature.",
        "cn": "这只是印证了我早已知道的事实：我所有的恐惧都源于错误的假设，而我将通过亲身经历来验证这一点，从而揭示这些假设的欺骗性。"
      },
      {
        "en": "With that said, I’m fortunate that my condition isn’t life-threatening, and that I’m able to use my limbs and operate my mind.",
        "cn": "话虽如此，我很幸运，我的病情并不危及生命，而且我还能活动四肢，思维也清晰。"
      },
      {
        "en": "Not everyone on the island can say that, and I recognize the inequitable distribution of illnesses that pervade it.",
        "cn": "岛上并非每个人都能这么说，我也意识到疾病在岛上普遍存在的不平等分布现象。"
      },
      {
        "en": "But if you happen to have access to your physical and mental faculties, then the way you frame your predicament is of utmost importance.",
        "cn": "但如果你恰好身心健全，那么你如何看待自己的困境就显得至关重要。"
      },
      {
        "en": "You can either succumb to the winds of worry and fear, or you can build the confidence required to navigate whatever arises.",
        "cn": "你可以选择屈服于忧虑和恐惧的漩涡，也可以培养起应对任何突发状况所需的信心。"
      },
      {
        "en": "Ultimately, confidence is an exercise in weathering uncertainty, which happens to be the defining characteristic of this island.",
        "cn": "归根结底，自信就是一种应对不确定性的历练，而这恰恰是这座岛屿的鲜明特征。"
      },
      {
        "en": "Everyday, you have to face the reality of a cold and unresponsive terrain.",
        "cn": "每天，你都不得不面对这片寒冷而冷漠的土地。"
      },
      {
        "en": "“Will my ear symptoms ever subside?",
        "cn": "“我的耳朵不适症状会好转吗？”"
      },
      {
        "en": "Are they going to persist like my tinnitus?",
        "cn": "它们会像我的耳鸣一样持续下去吗？"
      },
      {
        "en": "Is this just the beginning of a further decline in my ears?”",
        "cn": "“这难道只是我听力进一步下降的开始吗？”"
      },
      {
        "en": "To be confident is to accept that sole answer, and to continue engaging in the meaningful activities of life.",
        "cn": "自信，就是接受这个唯一的答案，并继续投身于生活中那些有意义的活动。"
      },
      {
        "en": "In my case, exercising each day adds to that edifice of confidence.",
        "cn": "就我而言，每天锻炼都能为这份自信增添一砖一瓦。"
      },
      {
        "en": "Playing with my daughter despite my discomforts is yet another example.",
        "cn": "尽管身体不适，我还是陪女儿玩耍，这又是一个例子。"
      },
      {
        "en": "Writing this very essay also has a similar effect.",
        "cn": "撰写这篇随笔本身也产生了类似的效果。"
      },
      {
        "en": "The truth is, I don’t know what the next year holds for my condition (let alone the next hour), so it seems unhelpful for me to dwell on what the future has in store.",
        "cn": "说实话，我不知道明年我的病情会如何（更别说接下来的一小时了），所以一味纠结未来会怎样，对我来说似乎没什么帮助。"
      },
      {
        "en": "All that matters is how I can make the most of the moment I currently inhabit, which has the effect of dissolving my concerns about what may happen later.",
        "cn": "唯一重要的是，我该如何充分利用当下这一刻，这反而消解了我对未来可能发生之事的担忧。"
      },
      {
        "en": "And as the sharpness of worry dissipates, the breadth of equanimity has the space to take its place.",
        "cn": "随着忧虑的尖锐感逐渐消散，从容的宽广便有了腾身而出的空间。"
      },
      {
        "en": "As someone who recently published a book on trusting yourself, I can confirm that this mindset has been incredibly helpful during this time.",
        "cn": "作为一位最近出版了关于“相信自己”的书籍的人，我可以肯定地说，这种心态在这段时间里起到了极大的帮助。"
      },
      {
        "en": "In fact, I found myself reading The Inner Compass at particularly challenging moments to remind myself of what it means to build confidence in the face of uncertainty.",
        "cn": "事实上，我发现自己在特别艰难的时刻会翻阅《内心的指南针》，以此提醒自己，在面对不确定性时建立自信意味着什么。"
      },
      {
        "en": "Authors often say they write the book they need to read, and this was no exception.",
        "cn": "作家们常说，他们写的是自己需要读的那本书，这本书也不例外。"
      },
      {
        "en": "In one of the chapters, I describe my adventures with tinnitus, but wrote it months before the onset of last summer’s symptoms.",
        "cn": "在其中一章里，我描述了自己与耳鸣抗争的经历，但这段内容其实是在去年夏天症状出现前的几个月就写好的。"
      },
      {
        "en": "Regardless, the central message of the chapter still stands, which is on the inevitability of pain and the way we respond to it.",
        "cn": "无论如何，本章的核心观点依然成立，即痛苦是不可避免的，以及我们应对痛苦的方式。"
      },
      {
        "en": "Despite knowing that death is inevitable, we are somehow convinced that our bodies will remain healthy until that day.",
        "cn": "尽管明知死亡是不可避免的，但我们不知为何却坚信，自己的身体会一直保持健康，直到那一天。"
      },
      {
        "en": "This is a product of subtle conditioning, whether it’s in the form of lofty promises or distorted beliefs that are dispensed by others.",
        "cn": "这是潜移默化影响的结果，无论这种影响是以他人所宣扬的空洞承诺，还是扭曲的观念的形式呈现。"
      },
      {
        "en": "The truth, of course, is that all of nature follows a decay function, and none of us are immune.",
        "cn": "当然，事实是，整个自然界都遵循一种衰减规律，而我们谁也无法幸免。"
      },
      {
        "en": "So the thing to consider is if you can accept the pain that accompanies the human body, while also reducing the suffering using the power of the human mind.",
        "cn": "因此，需要考虑的是：你能否既接受人体所伴随的痛苦，又能借助人类心灵的力量来减轻这种痛苦。"
      },
      {
        "en": "For some of you, the island may seem like a distant place.",
        "cn": "对你们中的一些人来说，这座岛屿可能显得遥不可及。"
      },
      {
        "en": "For others, it may seem closer.",
        "cn": "对其他人来说，这可能显得更近一些。"
      },
      {
        "en": "But in the end, it will one day be home for all of us.",
        "cn": "但归根结底，总有一天，这里将成为我们所有人的家。"
      },
      {
        "en": "The question is whether you can make it feel like home when that day arrives.",
        "cn": "问题在于，当那一天到来时，你能否让这里让人有宾至如归的感觉。"
      },
      {
        "en": "Fortunately, you can prepare an answer long before that question is asked.",
        "cn": "幸运的是，你可以在这个问题被提出之前很久就做好准备。"
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
    "id": "gr-stop-explaining-yourself-to-your-ai-with-alex-",
    "cat": "成长",
    "title": "Stop explaining yourself to your AI with Alex Green, cofounder of Littlebird",
    "titleZh": "与 Littlebird 联合创始人亚历克斯·格林一起，别再向你的 AI 解释自己了",
    "source": "Ness Labs · 2026-03-26",
    "date": "2026-03-26",
    "minutes": 15,
    "url": "https://nesslabs.com/littlebird-featured-tool?utm_source=rss&utm_medium=rss&utm_campaign=littlebird-featured-tool",
    "cover": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "gradient": "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
    "coverImg": "assets/covers/gr-stop-explaining-yourself-to-your-ai-with-alex-.jpg",
    "paras": [
      {
        "en": "Welcome to this edition of our Tools for Thought series, where we interview founders on a mission to help us think better and work smarter.",
        "cn": "欢迎阅读本期“思考工具”系列，我们将采访那些致力于帮助我们更好地思考、更聪明地工作的创始人。"
      },
      {
        "en": "Alex Green is the cofounder and chief product & technology officer of Littlebird, an AI assistant designed to close the gap between your memory and your computer.",
        "cn": "亚历克斯·格林是 Littlebird 的联合创始人兼首席产品与技术官，Littlebird 是一款旨在弥合人脑记忆与计算机之间差距的人工智能助手。"
      },
      {
        "en": "By giving AI the ability to see what you see, Littlebird helps you work faster without breaking your flow.",
        "cn": "通过让人工智能看到你所看到的内容，Littlebird 能帮助你更快地工作，同时不打断你的工作节奏。"
      },
      {
        "en": "In this interview, we discussed the potential of a true general AI assistant, why context is king, how to use AI as a thought partner in all sorts of personal and professional situations, as well as some of the most powerful use cases Alex has seen, and much more.",
        "cn": "在本次访谈中，我们探讨了真正通用人工智能助手的潜力、为何“上下文”至关重要、如何在各种个人和职业场景中将人工智能作为思维伙伴，以及亚历克斯所见过的最具影响力的应用案例等诸多内容。"
      },
      {
        "img": "assets/covers/gr-stop-explaining-yourself-to-your-ai-with-alex--1.jpg",
        "cap": ""
      },
      {
        "en": "Hi Alex, thank you for joining us.",
        "cn": "嗨，亚历克斯，感谢你加入我们。"
      },
      {
        "en": "Let’s start with a philosophical question.",
        "cn": "让我们先从一个哲学问题开始吧。"
      },
      {
        "en": "At its best, how do you envision AI helping humans focus on impact?",
        "cn": "在最理想的情况下，你认为人工智能将如何帮助人类专注于产生影响？"
      },
      {
        "en": "AI models are genuinely incredible, but they have no idea what you’re working on.",
        "cn": "AI模型确实非常了不起，但它们根本不知道你在做什么。"
      },
      {
        "en": "So you end up spending ten minutes copying and pasting context into a chat window just to get a useful answer.",
        "cn": "结果你不得不花十分钟把上下文复制粘贴到聊天窗口里，就为了得到一个有用的答案。"
      },
      {
        "en": "You’re doing prep work for a tool that’s supposed to save you time.",
        "cn": "你正在为一款本该帮你节省时间的工具做准备工作。"
      },
      {
        "en": "And meanwhile, every app and platform you use is optimized to keep you engaged, not to help you accomplish what you actually set out to do.",
        "cn": "与此同时，你使用的每一款应用和平台都经过优化，旨在让你持续使用，而不是帮助你完成你原本真正想做的事情。"
      },
      {
        "en": "The vision I keep coming back to is that AI should work for you.",
        "cn": "我一直秉持的愿景是：人工智能应该为你服务。"
      },
      {
        "en": "At its best, it sits between you and the constant flood of information—the Slack messages, the emails, the meeting notes, the browser tabs—and shows you what actually matters right now so you can focus on the work that requires your judgment and creativity.",
        "cn": "在最佳状态下，它能置身于你与源源不断的信息洪流之间——无论是 Slack 消息、电子邮件、会议记录还是浏览器标签页——并向你展示当下真正重要的内容，让你能够专注于那些需要你运用判断力和创造力的工作。"
      },
      {
        "en": "Littlebird helps users build a memory of everything you do.",
        "cn": "Littlebird 帮助用户记录生活中的一切。"
      },
      {
        "en": "Can you talk about how the idea for the product first came together?",
        "cn": "你能谈谈这个产品的创意最初是如何形成的吗？"
      },
      {
        "en": "The problem we kept hitting was this disconnect between how AI works and how people actually work.",
        "cn": "我们不断遇到的问题，正是人工智能的工作原理与人们实际的工作方式之间存在的脱节。"
      },
      {
        "en": "Your work doesn’t live in one place.",
        "cn": "你的作品并不局限于某一个地方。"
      },
      {
        "en": "It’s scattered across Slack, Google Docs, emails, websites, meeting notes.",
        "cn": "这些内容散落在 Slack、Google Docs、电子邮件、网站和会议记录中。"
      },
      {
        "en": "But every AI tool either operates in a silo (great at one thing like summarizing a meeting but blind to everything else) or it’s a blank canvas that knows nothing about you until you spend a few minutes getting it up to speed.",
        "cn": "但每款人工智能工具要么是孤立运行的（擅长某一项任务，比如总结会议内容，却对其他事情一无所知），要么就像一张空白画布，在你花几分钟时间让它熟悉情况之前，它对你一无所知。"
      },
      {
        "en": "What was missing was an AI that has the full context of your work.",
        "cn": "缺失的正是能够全面掌握你工作背景的人工智能。"
      },
      {
        "en": "Your projects, your priorities, the decisions you’ve made, the conversations you’ve had.",
        "cn": "你的项目、你的优先事项、你做出的决定、你进行的对话。"
      },
      {
        "en": "An AI that doesn’t need to be “caught up” because it’s been paying attention all along.",
        "cn": "一种无需“赶上”的AI，因为它一直都在关注。"
      },
      {
        "en": "So we built Littlebird to work quietly in the background, seeing what you see on your screen and creating a secure memory of your work.",
        "cn": "因此，我们开发了 Littlebird，让它在后台静默运行，实时捕捉您屏幕上的内容，并生成您工作内容的安全备份。"
      },
      {
        "en": "When you need to recall something or create something new, the context is already there.",
        "cn": "当你需要回忆某件事或创造新事物时，相关背景已经存在了。"
      },
      {
        "en": "It’s like working with an assistant who’s been in all your meetings, read all your documents, and knows what you’re trying to accomplish, without you having to explain any of it.",
        "cn": "这就像是与一位助理共事，他参加过你所有的会议，读过你所有的文件，并且清楚你想达成什么目标，而你无需向他解释任何事情。"
      },
      {
        "img": "assets/covers/gr-stop-explaining-yourself-to-your-ai-with-alex--2.jpg",
        "cap": ""
      },
      {
        "en": "I don’t think anyone else has successfully built a general AI assistant, so I reject the premise.",
        "cn": "我认为还没有人成功开发出通用人工智能助手，因此我不同意这一前提。"
      },
      {
        "en": "We’ve built Littlebird to be a full “second mind.” The idea is to have as much context about your life as possible in one place, accessible to collaborate with AI.",
        "cn": "我们打造 Littlebird 的初衷，是将其打造成一个完整的“第二大脑”。其理念在于将您生活中的尽可能多的背景信息汇聚于一处，以便与人工智能进行协作。"
      },
      {
        "en": "But to get at what I think the question is really asking: the biggest issue with existing tools is that even the smartest model gives you generic output if it doesn’t know what you’re working on.",
        "cn": "但要说出我认为这个问题真正想问的是什么：现有工具最大的问题在于，即使是最智能的模型，如果它不知道你在做什么，给出的也只是通用结果。"
      },
      {
        "en": "You can work around this by manually feeding it information, but then you’re spending time doing prep work, and you’re also having to decide what’s relevant, which is its own kind of work.",
        "cn": "你可以通过手动输入信息来解决这个问题，但这样一来，不仅要花时间做准备工作，还得判断哪些信息是相关的，这本身也算是一项工作。"
      },
      {
        "en": "And everything’s disconnected, even though your actual work is deeply interconnected.",
        "cn": "而且一切都彼此脱节，尽管你实际的工作之间有着密切的联系。"
      },
      {
        "en": "The document you’re writing relates to a meeting from last week, which relates to an email thread, which relates to a project goal.",
        "cn": "你正在撰写的这份文件与上周的一次会议有关，而该会议又与一封电子邮件的讨论串有关，该讨论串则与一个项目目标有关。"
      },
      {
        "en": "Littlebird already knows the context from everything you’ve seen, discussed, and worked on.",
        "cn": "Littlebird 已经通过你所看到、讨论和处理过的一切了解了相关背景。"
      },
      {
        "en": "So when you ask it something, it has the full picture.",
        "cn": "因此，当你向它提问时，它就能全面掌握情况。"
      },
      {
        "en": "You say “draft a proposal for [client]” and it already knows who the client is, what you’ve discussed with them, and what materials exist that it can build from.",
        "cn": "你只需说“为[客户]起草一份提案”，它就已经知道客户是谁、你与客户讨论过什么，以及有哪些现有材料可以作为基础。"
      },
      {
        "en": "Littlebird works quietly in the background—it’s an AI that has read everything you have and remembers it.",
        "cn": "Littlebird 在后台默默工作——它是一款人工智能，读过你读过的所有内容，并且都牢记于心。"
      },
      {
        "en": "You’re responding to emails in Gmail, coordinating with your team in Slack, taking a Zoom call, browsing a few articles.",
        "cn": "你正在Gmail里回复邮件，在Slack上与团队协调工作，参加Zoom视频会议，同时浏览几篇文章。"
      },
      {
        "en": "In the past, all that context would disappear the moment you closed the tab or moved on.",
        "cn": "过去，一旦你关闭标签页或转到其他页面，所有这些上下文信息就会立即消失。"
      },
      {
        "en": "Say you’re heading into a client call.",
        "cn": "假设你正准备参加一次客户电话会议。"
      },
      {
        "en": "Littlebird transcribes the conversation in real time and afterwards summarizes everything: key points, decisions, and next steps—so nothing falls through the cracks.",
        "cn": "Littlebird 会实时转录对话内容，并在会后对所有内容进行总结：要点、决策和后续步骤——确保没有任何细节被遗漏。"
      },
      {
        "en": "That shift alone changes how you show up.",
        "cn": "仅这一转变，就足以改变你的表现方式。"
      },
      {
        "en": "Instead of splitting your attention between listening and note-taking, you can be present in conversations.",
        "cn": "这样一来，你就无需在倾听和做笔记之间分心，而是能够全身心投入到对话中。"
      },
      {
        "en": "You ask better questions and engage with the people in the room instead of with your notes app.",
        "cn": "你会提出更好的问题，并与在场的人互动，而不是盯着你的笔记应用。"
      },
      {
        "en": "After the call wraps, you ask Littlebird to draft a follow-up email.",
        "cn": "电话会议结束后，你让Littlebird起草一封跟进邮件。"
      },
      {
        "en": "You don’t need to explain who the client is or what was discussed.",
        "cn": "你不必说明客户是谁，也不必说明讨论了什么内容。"
      },
      {
        "en": "Littlebird pulls from what it knows and drafts something that actually sounds like you.",
        "cn": "Littlebird 会根据它掌握的信息，起草出真正符合你风格的内容。"
      },
      {
        "en": "Then you move on to one of the action items from that call.",
        "cn": "然后，你继续处理那次电话会议中确定的一项待办事项。"
      },
      {
        "en": "You start a new chat: “Draft a project brief for the website redesign.” Littlebird already knows the scope because it saw the initial proposal you sent last week, the feedback the client shared over email, and the inspiration sites you bookmarked that morning.",
        "cn": "你发起了一条新聊天消息：“起草一份网站改版项目简报。”Littlebird 已经了解项目范围，因为它看到了你上周发送的初步提案、客户通过电子邮件反馈的意见，以及你当天早上收藏的参考网站。"
      },
      {
        "en": "It gives you a starting point grounded in your actual work; something that reflects the real decisions and conversations behind the project.",
        "cn": "它为你提供了一个立足于实际工作的起点；这个起点反映了项目背后真实的决策和对话。"
      },
      {
        "en": "You’re also always in control of what Littlebird sees.",
        "cn": "此外，您还可以随时控制 Littlebird 所看到的内容。"
      },
      {
        "en": "You can pause context collection at any time, exclude specific apps or domains, or delete data that’s already been collected.",
        "cn": "您可以随时暂停上下文数据收集，排除特定应用或域名，或删除已收集的数据。"
      },
      {
        "en": "We think about data control as foundational, not an afterthought.",
        "cn": "我们认为数据控制是基础，而不是事后才考虑的事。"
      },
      {
        "en": "If people don’t trust the tool, they won’t use it honestly, and then it can’t actually help them.",
        "cn": "如果人们不信任这个工具，他们就不会诚实地使用它，那样的话，它实际上就无法帮助他们。"
      },
      {
        "img": "assets/covers/gr-stop-explaining-yourself-to-your-ai-with-alex--3.jpg",
        "cap": ""
      },
      {
        "en": "Who is using Littlebird today and what are some of the main ways they’re using it?",
        "cn": "目前有哪些人在使用 Littlebird？他们主要通过哪些方式使用它？"
      },
      {
        "en": "Our users are busy knowledge workers whose work spans a bunch of different tools and conversations throughout the day: founders, freelancers, marketers, consultants, developers.",
        "cn": "我们的用户是一群忙碌的知识工作者，他们每天的工作涉及多种不同的工具和沟通渠道：创始人、自由职业者、市场营销人员、顾问、开发人员。"
      },
      {
        "en": "What they share isn’t a job title, it’s a frustration that a lot of people feel but haven’t quite named yet: the hardest part of knowledge work isn’t the actual thinking.",
        "cn": "他们共同之处并非职位头衔，而是许多人都有这种感受却尚未明确说出的挫败感：知识型工作的最难之处并不在于实际的思考。"
      },
      {
        "en": "Finding what you need, remembering what was said, reconstructing context that existed in your head two days ago but has since been buried under fifty other things.",
        "cn": "找到你需要的东西，记住别人说过的话，重构两天前还存在于脑海中、但如今已被其他五十件事掩埋的上下文。"
      },
      {
        "en": "Recall is usually the entry point.",
        "cn": "回调通常是切入点。"
      },
      {
        "en": "Things like “What did we agree on in that call last Thursday?” or “Where did I see that article about market sizing?” get instant answers without the scavenger hunt.",
        "cn": "像“上周四那通电话里我们达成了什么共识？”或者“那篇关于市场规模的文章我是在哪里看到的？”这类问题，都能立即得到答案，无需费劲去翻找。"
      },
      {
        "en": "Pretty quickly, most users start leaning on Littlebird as a drafting partner.",
        "cn": "很快，大多数用户就开始将Littlebird作为起草助手来依赖了。"
      },
      {
        "en": "Because it already knows the context behind their work, they can go from “I need to write this” to a strong first draft in minutes—one that reflects the actual details of their projects and the language they use.",
        "cn": "由于系统已经了解他们工作的背景，他们只需几分钟就能从“我需要写这个”直接完成一份内容扎实的初稿——这份初稿既反映了他们项目的实际细节，也符合他们惯用的表达方式。"
      },
      {
        "en": "That matters enormously if you’re someone who spends half your day writing and communicating.",
        "cn": "如果你每天有一半时间都花在写作和沟通上，这一点就显得尤为重要。"
      },
      {
        "en": "We also hear a lot from users that Littlebird has changed how they experience meetings.",
        "cn": "我们还经常听到用户反馈，Littlebird 改变了他们参加会议的体验。"
      },
      {
        "en": "When you’re not frantically trying to capture everything, you can actually listen.",
        "cn": "当你不再忙着拼命记录一切时，你其实可以静下心来倾听。"
      },
      {
        "en": "That one hits differently than a productivity metric.",
        "cn": "这一点与生产力指标带来的感受截然不同。"
      },
      {
        "en": "It’s about the quality of how you spend your time, not just the quantity.",
        "cn": "关键在于你如何利用时间，而不仅仅是时间的长短。"
      },
      {
        "en": "A few stand out because they’re only possible when the tool actually knows what you’ve been working on.",
        "cn": "其中有几项功能尤为突出，因为只有当工具真正了解你一直在处理什么时，这些功能才可能实现。"
      },
      {
        "en": "Before any important conversation, most people scramble through old notes and email threads trying to piece together where things stand.",
        "cn": "在进行任何重要对话之前，大多数人都会匆忙翻阅旧笔记和邮件往来，试图理清当前的状况。"
      },
      {
        "en": "With Littlebird, you just ask: “Prep me for my 2 pm.” It pulls from everything relevant (e.g. past calls, email threads, shared documents) and gives you a rundown in seconds.",
        "cn": "使用 Littlebird，您只需说一句：“帮我准备下午2点的会议。”它会调取所有相关信息（例如以往的通话记录、邮件往来、共享文档），并在几秒钟内为您提供一份简要概述。"
      },
      {
        "en": "People notice when you remember the details.",
        "cn": "当你记得细节时，别人会注意到。"
      },
      {
        "en": "That kind of trust compounds over time, and it’s hard to put a number on how much that’s worth.",
        "cn": "这种信任会随着时间的推移而日益加深，其价值之高难以用数字来衡量。"
      },
      {
        "en": "Whether it’s a project, a trip, or a new initiative, Littlebird already knows what you’ve been researching and thinking about.",
        "cn": "无论是项目、旅行还是新计划，Littlebird 早已知道你一直在研究和思考什么。"
      },
      {
        "en": "One example I love: a user asked Littlebird to outline a three-day Lisbon itinerary based on flights and articles they’d been browsing the day before.",
        "cn": "我特别喜欢的一个例子是：一位用户请 Littlebird 根据他前一天浏览过的航班信息和文章，为他规划一份为期三天的里斯本行程。"
      },
      {
        "en": "It gave them a plan built from their own research and preferences, ready to use right away.",
        "cn": "这为他们提供了一份基于自身研究和偏好制定的计划，可以立即付诸实践。"
      },
      {
        "en": "That’s only possible because Littlebird was paying attention when they were doing the research.",
        "cn": "这之所以能实现，是因为Littlebird在进行研究时一直非常专注。"
      },
      {
        "en": "The third is Routines, which are automated briefings you can set up to run on a schedule.",
        "cn": "第三项是“例行任务”，即您可以设置按计划运行的自动化简报。"
      },
      {
        "en": "A lot of our users have a weekly report that runs every Monday morning covering priorities, what happened the previous week, and anything that needs attention.",
        "cn": "我们很多用户每周一早上都会生成一份周报，内容涵盖当周重点事项、上周发生的情况以及需要关注的事项。"
      },
      {
        "en": "It’s become how a lot of them start the week—like having a chief of staff who writes you a memo before you’ve had coffee.",
        "cn": "这已经成了他们中许多人开启新的一周的方式——就像有个幕僚长在你还没喝上咖啡之前就给你写了一份备忘录。"
      },
      {
        "img": "assets/covers/gr-stop-explaining-yourself-to-your-ai-with-alex--4.jpg",
        "cap": ""
      },
      {
        "en": "Honestly, I don’t really think about it as a separate tool anymore.",
        "cn": "说实话，我现在已经不再把它当作一个独立的工具来看待了。"
      },
      {
        "en": "I use it all day as a thought partner—for learning about unfamiliar concepts, doing research, getting a second opinion on tricky situations, prioritizing, and tracking tasks.",
        "cn": "我整天都把它当作一个“思考伙伴”——用来了解陌生的概念、进行研究、在棘手的情况下寻求第二意见、确定优先级以及跟踪任务。"
      },
      {
        "en": "But the thing I rely on most is getting a quick read on where different projects stand.",
        "cn": "但我最依赖的是快速掌握各个项目的进展情况。"
      },
      {
        "en": "As a co-founder running product and engineering, I’m constantly context-switching, and before I jump into a conversation or meeting, I’ll ask Littlebird for a status update on whatever we’re about to discuss.",
        "cn": "作为负责产品和工程的联合创始人，我需要不断切换工作状态；在加入讨论或会议之前，我都会向 Littlebird 查询即将讨论事项的最新进展。"
      },
      {
        "en": "I also use Meeting Notes heavily.",
        "cn": "我也经常使用“会议笔记”功能。"
      },
      {
        "en": "I have a lot of syncs throughout the week, and at some point the individual conversations blur together.",
        "cn": "这一周我有很多同步安排，到后来，各项对话就混在一起了。"
      },
      {
        "en": "Being able to ask “what themes have come up in my team conversations this week?” or “are there any recurring blockers?” is genuinely useful.",
        "cn": "能够提出“本周团队讨论中出现了哪些主题？”或“是否有反复出现的阻碍因素？”这类问题，确实非常有用。"
      },
      {
        "en": "It helps me see patterns I’d miss if I were just relying on my own memory.",
        "cn": "这有助于我发现一些仅凭记忆可能忽略的规律。"
      },
      {
        "en": "Our goal is to build a universal assistant, and I think Littlebird already does a pretty good job of fulfilling that promise.",
        "cn": "我们的目标是打造一款万能助手，而我认为Littlebird在实现这一目标方面已经做得相当不错了。"
      },
      {
        "en": "Looking ahead, how do you see Littlebird evolving over the next few years?",
        "cn": "展望未来，您认为Littlebird在未来几年内将如何发展？"
      },
      {
        "en": "We’re still very early, and there’s a lot of room to go deeper on what we’ve already built before chasing the next thing.",
        "cn": "我们仍处于非常早期的阶段，在着手下一项工作之前，还有很大的空间可以进一步深化我们已经构建的内容。"
      },
      {
        "en": "Beyond that, we’re thinking a lot about how Littlebird can be more proactive.",
        "cn": "除此之外，我们还在深入思考如何让Littlebird变得更加主动。"
      },
      {
        "en": "Right now, you ask and it answers.",
        "cn": "现在，你一问，它就回答。"
      },
      {
        "en": "There’s a future where it brings you things before you ask.",
        "cn": "未来，它会在你开口之前就为你送上所需之物。"
      },
      {
        "en": "“Here’s what you need to know before your 2 pm,” or “this email from last week is probably relevant to what you’re working on right now.” More like a great collaborator tapping you on the shoulder at exactly the right moment.",
        "cn": "“这是你在下午2点之前需要了解的内容”，或者“上周这封邮件可能与你当前的工作有关”。这就像一位出色的合作伙伴在恰到好处的时候轻轻拍了拍你的肩膀。"
      },
      {
        "en": "We’re building something that is truly an extension of your mind, something that helps you achieve your highest goals, focus, and cut through the noise.",
        "cn": "我们正在打造一款真正能延伸您思维的工具，它能帮助您实现最高目标、保持专注，并过滤掉干扰。"
      },
      {
        "en": "Thank you so much for your time, Alex!",
        "cn": "亚历克斯，非常感谢你抽出时间！"
      },
      {
        "en": "Where can people learn more about Littlebird?",
        "cn": "大家可以在哪里了解更多关于Littlebird的信息？"
      },
      {
        "en": "You can download and get started for free on our website, or follow our updates on X, LinkedIn, and Instagram.",
        "cn": "您可以在我们的网站上免费下载并开始使用，或者在 X、LinkedIn 和 Instagram 上关注我们的最新动态。"
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
    "id": "gr-how-to-fix-your-entire-life-in-1-day",
    "cat": "成长",
    "title": "How to fix your entire life in 1 day",
    "titleZh": "如何在一天内彻底改变你的人生",
    "source": "Dan Koe · 2026-01-13",
    "date": "2026-01-13",
    "minutes": 36,
    "url": "http://localhost:8123/.tmp/oneoff/essay.html",
    "cover": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "gradient": "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
    "coverImg": "assets/covers/gr-how-to-fix-your-entire-life-in-1-day.jpg",
    "paras": [
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
      },
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
      },
      {
        "en": "However, as much as I think new years resolutions are stupid, it’s always wise to reflect on the life you hate so you can launch yourself toward something that much better, as we will discuss.",
        "cn": "不过，尽管我觉得新年决心很蠢，但正如我们将要讨论的那样，反思自己讨厌的生活总是明智之举，这样你才能朝着更美好的未来迈进。"
      },
      {
        "en": "Human nature is a b*tch, and the worst feeling is when you make a promise to yourself and can’t help but break it.",
        "cn": "人性真是个婊子，最糟糕的感觉莫过于对自己许下承诺，却又情不自禁地违背了它。"
      },
      {
        "en": "You start to feel helpless, and if you don’t know what you’re doing, you may continue the cycle for years on end: always wanting to change, but never being able to.",
        "cn": "你会开始感到无助，如果不知道该怎么做，这种循环可能会持续好几年：总是想改变，却始终无法做到。"
      },
      {
        "en": "So whether you want to start the business, transform your body, or take the risk toward a more meaningful life without quitting after 2 weeks, I want to share 7 ideas you probably haven’t heard before on behavior change, psychology, and productivity so you can do just that in 2026.",
        "cn": "因此，无论你是想创业、塑造身材，还是愿意冒险追求更有意义的生活（而不是两周后就半途而废），我都想与你分享7个关于行为改变、心理学和效率提升的见解——这些内容你可能从未听过——希望你能借此在2026年实现这些目标。"
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
        "en": "All I ask is that you dedicate your full attention to this.",
        "cn": "我只希望你能全神贯注地做这件事。"
      },
      {
        "en": "If you get bored skip to the next section and go back to fill in the blanks if you need to.",
        "cn": "如果你觉得无聊，可以跳到下一节，如有需要，再回来填空。"
      },
      {
        "en": "When it comes to New Year’s resolutions, people only focus on one of the two requirements for success:",
        "cn": "说到新年决心，人们往往只关注成功所需的两个条件中的一个："
      },
      {
        "en": "Changing your actions to make progress toward the goal (least important, second order)",
        "cn": "调整自己的行为，以朝着目标迈进（重要性最低，次要）"
      },
      {
        "en": "Changing who you are so that your behavior naturally follows (most important, first order)",
        "cn": "改变自己的本质，从而让行为自然而然地随之改变（最重要，首要任务）"
      },
      {
        "en": "Most people set a surface-level goal, hype themselves up to remain disciplined for the first few weeks, then go back to their old ways without much struggle, because they were trying to build a great life on a rotting foundation.",
        "cn": "大多数人只会设定一个肤浅的目标，在前几周靠自我激励来保持自律，随后便毫不费力地故态复萌，因为他们试图在腐朽的地基上建造美好的人生。"
      },
      {
        "en": "It can be a bodybuilder with a great physique, a founder/CEO worth hundreds of millions, or a charismatic dude who can chat up a group without a shred of anxiety entering his mind space.",
        "cn": "他可能是身材健美的健美运动员，身家数亿的创始人/CEO，也可能是那位能从容不迫地与一群人畅谈、心中毫无焦虑的魅力型人物。"
      },
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
        "cn": "健美运动员必须拼命训练，才能吃得不那么健康。"
      },
      {
        "en": "The CEO has to force themself to lie in bed past their alarm clock, and they hate every second of it.",
        "cn": "这位首席执行官不得不强迫自己躺在床上，直到闹钟响了之后，而他讨厌这每一秒。"
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
      },
      {
        "en": "If you want a specific outcome in life, you must have the lifestyle that creates that outcome long before you reach it.",
        "cn": "如果你想在生活中获得特定的结果，就必须在达到那个结果之前很久，就养成能够带来这种结果的生活方式。"
      },
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
        "cn": "如果你找到的理由，其吸引力比将你束缚在旧习惯中的那种更强，那么你就会直接回到原点，届时你只能遗憾地承认，自己浪费了永远无法挽回的资源：时间。"
      },
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
        "en": "You say you want to “become financially free” and “get healthy,” but your actions show otherwise for a reason.",
        "cn": "你说你想“实现财务自由”和“保持健康”，但你的行为却表明事实并非如此，这自有其原因。"
      },
      {
        "en": "And it goes a lot deeper than you think.",
        "cn": "而且，这远比你想象的要深得多。"
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
        "en": "If you want to change who you are, you must understand how the mind works so that you can start to reprogram it.",
        "cn": "如果你想改变自己，就必须了解思维的运作方式，这样才能开始对其进行重新编程。"
      },
      {
        "en": "The first step to understanding the mind is to understand that all behavior is goal-oriented.",
        "cn": "理解心灵的第一步，是认识到所有行为都是以目标为导向的。"
      },
      {
        "en": "When you think about it, this is kinda obvious, but when we dig into it, most people don’t want to hear it.",
        "cn": "仔细想想，这其实挺显而易见的，但一旦深入探讨，大多数人却不愿听。"
      },
      {
        "en": "Those ones are clear, but most of the time, your goals are unconscious.",
        "cn": "这些目标很明确，但大多数时候，你的目标是潜意识的。"
      },
      {
        "en": "You may not realize that when you sit on the couch in the middle of the day, you are trying to burn time before your next responsibility, as one simple example.",
        "cn": "你可能没有意识到，比如，当你大白天坐在沙发上时，其实是在试图打发时间，好让自己在接下来要处理的事情之前能喘口气——这只是一个简单的例子。"
      },
      {
        "en": "On an even more unconscious and complex level, you pursue goals that can harm you, but you justify your actions in a way that is socially acceptable and doesn’t make you seem like a loser.",
        "cn": "在更深层、更复杂的潜意识层面，你会追求那些可能伤害自己的目标，但你会以一种社会上能被接受、且不会让你显得像个失败者的方式来为自己的行为辩解。"
      },
      {
        "en": "As an example, if you can’t stop procrastinating your work, you may justify it with the fact that you “lack discipline,” but in reality, you are attempting to achieve a goal like you always are.",
        "cn": "举个例子，如果你总是拖延工作，可能会以“缺乏自律”为借口来为自己开脱，但实际上，你和往常一样，仍在努力实现某个目标。"
      },
      {
        "en": "In this case, that goal could be to protect yourself from the judgment that comes from finishing and sharing your work.",
        "cn": "在这种情况下，这个目标可能是为了避免因完成并分享自己的作品而招致的评判。"
      },
      {
        "en": "If you say you want to quit your dead-end job, but stay in it without any real reason, you may start to think you don’t have enough courage, or that you were never really a “risk taker,” but the truth is that you are pursuing the goal of safety, predictability, and an excuse to not look like a failure to everyone else in your life who also works a dead-end job.",
        "cn": "如果你嘴上说想辞掉这份死胡同般的工作，却又在没有正当理由的情况下继续留任，你可能会开始认为自己不够勇敢，或者觉得自己从来就不是一个“敢于冒险的人”，但事实是，你追求的不过是安全感、可预测性，以及一个借口——这样在生活中那些同样从事死胡同工作的人眼中，你就不会显得像个失败者。"
      },
      {
        "img": "assets/covers/gr-how-to-fix-your-entire-life-in-1-day-4.jpg",
        "cap": ""
      },
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
        "en": "A goal is a projection into the future that acts as a lens of perception which allows you to notice information, ideas, and resources that aid in you achieving that goal.",
        "cn": "目标是对未来的展望，它如同一个认知的透镜，让你能够注意到有助于实现该目标的信息、想法和资源。"
      },
      {
        "en": "Now let’s dig a bit deeper, because if you don’t understand this, it only becomes more difficult to get out.",
        "cn": "现在让我们深入探讨一下，因为如果你不理解这一点，想要摆脱困境只会变得更加困难。"
      },
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
      },
      {
        "en": "Here’s how you’ve become who you are today, and how you will become who you will be tomorrow.",
        "cn": "这就是你如何成为今天的自己，以及你将如何成为明天的自己。"
      },
      {
        "en": "This is the anatomy of identity:",
        "cn": "这就是身份的构成："
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
        "en": "Your identity shapes new goals, restarting the cycle, and if that identity is disadvantageous toward a good life, this gets bad very quick",
        "cn": "你的身份会塑造新的目标，从而重新启动这一循环；如果这种身份不利于过上美好生活，情况就会很快变得糟糕。"
      },
      {
        "en": "The unfortunate reality is that you must break the cycle between steps 6 and 7, but this process starts when you are a child.",
        "cn": "不幸的是，现实情况是，你必须打破第6步和第7步之间的循环，但这个过程早在你还是孩子的时候就已经开始了。"
      },
      {
        "en": "You are dependent on your parents to teach you how to survive.",
        "cn": "你依赖父母教你如何生存。"
      },
      {
        "en": "And since the way most people teach is through reward and punishment, unless you adopt their beliefs and values, you will be punished.",
        "cn": "而且，由于大多数人都是通过奖惩的方式来教育他人的，因此，除非你接受他们的信念和价值观，否则就会受到惩罚。"
      },
      {
        "en": "You don’t actually think for yourself until you see through this.",
        "cn": "除非看透这一点，否则你其实并没有真正独立思考。"
      },
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
        "cn": "你的父母——除非他们自己打破了这种模式——否则他们都是受到工业时代那些被文化所接受的成功观念的影响。"
      },
      {
        "en": "They also carry the best and worst conditioning from their parents and their parents’ parents.",
        "cn": "他们还继承了父母乃至祖父母身上最好的和最差的性格特质。"
      },
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
      },
      {
        "en": "If you are heavily identified with a political ideology (by the process we talked about just before), you will feel threatened when someone challenges your beliefs.",
        "cn": "如果你（通过我们刚才讨论过的过程）对某种政治意识形态产生了强烈的认同感，那么当有人质疑你的信念时，你就会感到受到威胁。"
      },
      {
        "en": "You feel, emotionally, like you were just slapped in the face.",
        "cn": "从情感上来说，你感觉就像刚被人扇了一巴掌。"
      },
      {
        "en": "Since most people don’t analyze their emotions for truth, you tend to get stuck in echo chambers and double down on claims that harm yourself and others.",
        "cn": "由于大多数人不会深入剖析自己的情绪以探求真相，因此人们往往会陷入“回音室”，并愈发坚持那些既伤害自己又伤害他人的说法。"
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
        "en": "When you’re born, you’re like a little survival sponge that absorbs whatever beliefs you can (which are heavily dictated by your culture) so that you can feel safe and secure.",
        "cn": "人一出生，就像一块小小的“生存海绵”，会尽可能地吸收各种信念（这些信念在很大程度上受文化影响），以此获得安全感。"
      },
      {
        "en": "And if you don’t be careful, your mind may crystalize and it may make it difficult to live a meaningful life.",
        "cn": "而且，如果你不加小心，你的思维可能会固化，这可能会让你难以过上有意义的生活。"
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
        "en": "Impulsive — No separation between impulse and action.",
        "cn": "冲动——冲动与行动之间没有界限。"
      },
      {
        "en": "A toddler hits when angry because the feeling and the behavior are the same thing.",
        "cn": "幼儿生气时会打人，因为这种情绪和这种行为本质上是同一回事。"
      },
      {
        "en": "Self-Protective — The world is dangerous and you learn to look out for yourself.",
        "cn": "自我保护——这个世界充满危险，你学会了保护自己。"
      },
      {
        "en": "A kid learns to hide report cards, lie about chores, and figure out what adults want to hear.",
        "cn": "一个孩子学会了藏起成绩单、撒谎说自己做了家务，以及揣摩大人想听什么。"
      },
      {
        "en": "Conformist — You are your group and its rules feel like reality itself.",
        "cn": "顺从者——你就是你所在的群体，而该群体的规则在你看来就是现实本身。"
      },
      {
        "en": "Someone who genuinely cannot fathom why anyone would vote differently than their family or group.",
        "cn": "指那些真心无法理解，为什么有人会投出与自己的家人或群体不同的票的人。"
      },
      {
        "en": "Self-Aware — You notice you have an inner life that doesn’t match the exterior.",
        "cn": "自我觉察——你意识到自己的内心世界与外表并不一致。"
      },
      {
        "en": "Sitting in church and realizing you’re not sure you believe what everyone around you seems to believe, but not knowing what to do with that feeling yet.",
        "cn": "坐在教堂里，突然意识到自己并不确定是否相信周围每个人似乎都相信的东西，却又不知道该如何面对这种感觉。"
      },
      {
        "en": "Conscientious — You build your own system of principles and hold yourself accountable to them.",
        "cn": "尽责——你建立起自己的一套原则体系，并恪守这些原则。"
      },
      {
        "en": "Leaving your family’s religion after careful study and adopting a personal philosophy you can defend, or building a career plan with clear milestones because you believe the right effort yields the right results.",
        "cn": "经过深思熟虑后，放弃家族的宗教信仰，转而接受一种自己能够捍卫的个人哲学；或者制定一份包含明确里程碑的职业规划，因为你相信付出应有的努力就会收获相应的成果。"
      },
      {
        "en": "Individualist — You see that your principles were shaped by context and start holding them more loosely.",
        "cn": "个人主义者——你意识到自己的原则是由具体情境所塑造的，于是开始对这些原则持更开放的态度。"
      },
      {
        "en": "Realizing your political views have more to do with where you grew up than objective truth, or noticing that your ambitious career goals were really about earning your father’s approval.",
        "cn": "意识到自己的政治观点更多取决于成长环境，而非客观真理；或者发现自己那些雄心勃勃的职业目标，其实只是为了赢得父亲的认可。"
      },
      {
        "en": "Strategist — You work with systems while aware of your own involvement in them.",
        "cn": "战略家——你在与系统打交道的同时，也意识到自己身处其中。"
      },
      {
        "en": "Leading an organization while actively questioning your own blind spots, or engaging in politics knowing your perspective is partial and shaped by bias you can’t fully see.",
        "cn": "在领导一个组织的同时，积极审视自身的盲点；或者在参与政治活动时，明知自己的视角存在偏颇，且受到自己无法完全察觉的偏见所影响。"
      },
      {
        "en": "Construct-Aware — You see all frameworks, including your identity, as useful fictions.",
        "cn": "“构造觉知”——你将所有框架，包括你的身份认同，都视为有用的虚构。"
      },
      {
        "en": "Holding your spiritual beliefs with metaphorically not literally, knowing the map is not the territory, or watching yourself play the role of “founder” or “thought leader” with a kind of gentle amusement.",
        "cn": "以比喻而非字面意义来对待自己的精神信仰，明白“地图并非领土”，或者带着一种温和的幽默感，观察自己扮演“创始人”或“思想领袖”的角色。"
      },
      {
        "en": "Unitive — Separation between self and life dissolves.",
        "cn": "合一——自我与生命之间的隔阂消融。"
      },
      {
        "en": "Work, rest, and play feel like the same thing.",
        "cn": "工作、休息和娱乐感觉都是一回事。"
      },
      {
        "en": "There’s no one left who needs to become something, just presence responding to what arises.",
        "cn": "已经没有人需要成为什么了，只有当下的存在，对所生起的一切作出回应。"
      },
      {
        "en": "For most people reading this, I would assume you hover between 4 and 8, which is a huge gap.",
        "cn": "对于正在阅读本文的大多数人来说，我猜你们的分数大概在4到8之间，这中间的差距可不小。"
      },
      {
        "en": "Those closer to 8 are reading this are doing so to either learn something or pass time.",
        "cn": "那些年龄接近8岁、正在阅读本文的人，要么是为了学点东西，要么是为了打发时间。"
      },
      {
        "en": "Those closer to 4 are really looking for a change.",
        "cn": "那些分数接近4的人，其实是在寻求改变。"
      },
      {
        "en": "You feel like you are meant for more, but you can’t make sense of everything yet, because there’s obviously a lot at play.",
        "cn": "你觉得自己注定能成就更大的事业，但目前还无法理清头绪，因为显然有太多因素在起作用。"
      },
      {
        "en": "The good thing is, it doesn’t really matter what stage you are in, because moving through any of them follows a pattern.",
        "cn": "好在，无论你处于哪个阶段其实都无所谓，因为跨越任何一个阶段都遵循着一种规律。"
      },
      {
        "en": "The only real test of intelligence is if you get what you want out of life.",
        "cn": "衡量智力的唯一真正标准，在于你能否从生活中获得自己想要的东西。"
      },
      {
        "en": "One ingredient is opportunity (which many people like to mistake as “privilege” - because they the other ingredients).",
        "cn": "其中一个要素是机会（许多人常将其误认为“特权”——因为他们缺乏其他要素）。"
      },
      {
        "en": "If you have high agency but low opportunity, it doesn’t matter how likely you are to act toward a goal, because it isn’t a goal that will bear much fruit.",
        "cn": "如果你拥有较高的自主性但机会较少，那么你为实现目标采取行动的可能性有多大并不重要，因为这并不是一个能带来丰硕成果的目标。"
      },
      {
        "en": "If you have opportunity and agency but low intelligence, then you will never be fully able to benefit from that opportunity.",
        "cn": "如果你拥有机会和自主权，但智力较低，那么你就永远无法充分利用这些机会。"
      },
      {
        "en": "First, we’ve talked about agency before here.",
        "cn": "首先，我们之前在这里已经讨论过“能动性”这一概念。"
      },
      {
        "en": "In terms of opportunity, I can’t tell you to change your physical location, but if you don’t see the abundance of digital opportunity right in front of you, I don’t know what to tell you.",
        "cn": "说到机遇，我不能建议你改变地理位置，但如果你连眼前这些数不胜数的数字化机遇都视而不见，那我真不知道该怎么跟你说才好了。"
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
        "en": "So, if Naval’s definition of intelligence is getting what you want out of life, understanding cybernetics helps you do that much faster.",
        "cn": "因此，如果纳瓦尔对“智慧”的定义是实现人生目标，那么了解控制论就能帮助你更快地实现这一目标。"
      },
      {
        "en": "You can judge intelligence based on the system’s ability to iterate and persist with trial and error.",
        "cn": "可以根据系统在试错过程中进行迭代和坚持的能力来判断其智能水平。"
      },
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
      },
      {
        "en": "Acting, sensing, comparing, and understanding the system from a meta-perspective is fundamental to high intelligence.",
        "cn": "从元视角出发，对系统进行操作、感知、比较和理解，是高智力的基础。"
      },
      {
        "en": "High intelligence is the ability to iterate, persist, and understand the big picture.",
        "cn": "高智商是指具备迭代、坚持和把握全局的能力。"
      },
      {
        "en": "The mark of low intelligence is the inability to learn from your mistakes.",
        "cn": "智商低的一个标志就是无法从错误中吸取教训。"
      },
      {
        "en": "Low-intelligence people get stuck on problems rather than solving them.",
        "cn": "智商低的人往往会陷入问题的泥潭，而不是去解决问题。"
      },
      {
        "en": "Like a writer who fails to build a readership and quits because they lack the ability to try new things, experiment, and figure out a process that works for them (to think that there isn’t an effective process you can create is verifiably false, no matter your limiting beliefs, hence being low intelligence.)",
        "cn": "就像一位作家，因为无法建立读者群而放弃写作，原因在于他缺乏尝试新事物、进行实验并摸索出适合自己的方法的能力（认为自己无法创造出有效的方法，这一观点是经得起验证的谬误，无论你抱有怎样的自我设限的信念，因此这反映出智力水平低下。）"
      },
      {
        "en": "High intelligence is realizing any problem can be solved on a large enough timescale.",
        "cn": "高智商意味着意识到，只要时间跨度足够长，任何问题都能得到解决。"
      },
      {
        "en": "The reality is that you can achieve any goal you set your mind to.",
        "cn": "事实上，只要你下定决心，任何目标都能实现。"
      },
      {
        "en": "This isn’t something that can be disproven within reason.",
        "cn": "这并非在合理范围内能够被证伪的事情。"
      },
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
      },
      {
        "en": "When I talk about “goals,” and as I will continue repeating, I am not speaking from the typical lens of self-help, although that’s a helpful lens to adopt at times.",
        "cn": "当我谈论“目标”时——而且我今后也会不断重申这一点——我并不是从典型的自我帮助视角出发，尽管这种视角有时确实很有帮助。"
      },
      {
        "en": "I am speaking from the lens of teleology or the Greek kosmos – that everything serves a purpose.",
        "cn": "我是从目的论或希腊语中的“kosmos”（即万物皆有其目的）这一视角来谈的。"
      },
      {
        "en": "That everything is a part of a greater whole.",
        "cn": "万物都是一个更大整体的一部分。"
      },
      {
        "en": "You can try to “enjoy the journey,” but if you pursue the wrong goal, you will not enjoy it.",
        "cn": "你可以试着“享受这段旅程”，但如果追求的是错误的目标，你就无法享受其中。"
      },
      {
        "en": "For most people, those goals are assigned to them.",
        "cn": "对大多数人来说，这些目标是别人为他们设定的。"
      },
      {
        "en": "Programmed like lines of code in your psyche.",
        "cn": "像代码行一样被编程到你的潜意识中。"
      },
      {
        "en": "The best periods of my life always came after a period of getting absolutely fed up with the lack of progress I was making.",
        "cn": "我人生中最美好的时光，总是出现在我对自己的停滞不前感到彻底厌倦之后。"
      },
      {
        "en": "How do you reach profound insights and truths that change the trajectory of your life?",
        "cn": "如何获得能够改变人生轨迹的深刻见解和真理？"
      },
      {
        "en": "Something that so few people do, and you can tell by how they speak or give their thoughts on a specific topic.",
        "cn": "这是极少有人会做的事，从他们说话的方式或对某个具体话题的看法中就能看出来。"
      },
      {
        "en": "Questioning is thinking, and very few people do it.",
        "cn": "质疑就是思考，而能做到这一点的人寥寥无几。"
      },
      {
        "en": "I want to give you a comprehensive protocol that you can use every year to reset your life and launch into a season of intense progress.",
        "cn": "我想向你提供一套全面的方案，你可以每年使用它来重置生活，并开启一段飞速进步的时期。"
      },
      {
        "en": "This protocol helps you ask the right questions.",
        "cn": "本协议可帮助您提出正确的问题。"
      },
      {
        "en": "These questions will cover the macro to the micro: where you want to be, what you need to do to get there, and what you can do immediately to start moving the needle toward that reality.",
        "cn": "这些问题将涵盖从宏观到微观的各个层面：你希望达到什么目标，为了实现这一目标需要做什么，以及你可以立即采取哪些行动来推动这一目标的实现。"
      },
      {
        "en": "This will require one full day to complete, so I recommend you follow along with the exact protocol.",
        "cn": "这需要一整天才能完成，因此我建议你严格按照该流程操作。"
      },
      {
        "en": "You will need a pen, paper, and an open mind.",
        "cn": "你需要一支笔、一张纸和一颗开放的心。"
      },
      {
        "en": "When I observe patterns in people who successfully flip their identity, it happens fast after a build up of tension.",
        "cn": "当我观察那些成功转换身份的人的模式时，发现这种转变往往是在紧张情绪逐渐积累之后迅速发生的。"
      },
      {
        "en": "Specifically, I’ve noticed 3 phases that people then to go through.",
        "cn": "具体来说，我注意到人们通常会经历以下三个阶段。"
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
        "cn": "因此，我们制定这一方案的目标，是帮助你达到“认知失调”的状态，在不确定性中找到方向，并发现自己真正想要实现的目标，直到这种清晰感如此强烈，以至于干扰再也无法动摇你的决心。"
      },
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
      },
      {
        "en": "I cannot guarantee that this will work for everyone, because I cannot guarantee that everyone reading this is in the right chapter of their own story that would make these points impactful.",
        "cn": "我无法保证这对每个人都有效，因为我无法保证每位阅读本文的人都正处于自己人生故事中那个能让这些观点产生深远影响的阶段。"
      },
      {
        "en": "You can’t place the climax at the start of the book and expect it to be interesting.",
        "cn": "你不能把高潮放在书的开头，还指望它会引人入胜。"
      },
      {
        "en": "First we must create a new frame, or lens of perception, for your mind to operate from.",
        "cn": "首先，我们必须为你的思维建立一个新的框架，或者说一种新的认知视角，作为其运作的基础。"
      },
      {
        "en": "This is like creating a new shell, leaving your old one, and slowly growing into it over time.",
        "cn": "这就像是创造一个新的外壳，抛开旧的，然后随着时间的推移慢慢适应它。"
      },
      {
        "en": "It won’t feel like it fits at first.",
        "cn": "起初可能会觉得不太合适。"
      },
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
      },
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
      },
      {
        "en": "What do you complain about repeatedly but never actually change?",
        "cn": "你总是在抱怨什么，却始终没有真正改变？"
      },
      {
        "en": "Write down the three complaints you’ve voiced most often in the past year.",
        "cn": "请写下过去一年里你最常提到的三条抱怨。"
      },
      {
        "en": "For each complaint: What would someone who watched your behavior (not your words) conclude that you actually want?",
        "cn": "对于每项投诉：如果有人只观察你的行为（而非言语），他会得出什么结论，认为你真正想要的是什么？"
      },
      {
        "en": "What truth about your current life would be unbearable to admit to someone you deeply respect?",
        "cn": "关于你当前的生活，有什么真相是你无法向自己深为敬重的人坦白的？"
      },
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
      },
      {
        "en": "If absolutely nothing changes for the next five years, describe an average Tuesday.",
        "cn": "如果未来五年一切都保持不变，请描述一个普通的星期二。"
      },
      {
        "en": "What’s the first thing you think about?",
        "cn": "你首先会想到什么？"
      },
      {
        "en": "What do you do between 9am and 6pm?",
        "cn": "上午9点到下午6点之间，你都在做什么？"
      },
      {
        "en": "What do people say about you when you’re not in the room?",
        "cn": "当你不在场时，大家会怎么评价你？"
      },
      {
        "en": "You’re at the end of your life.",
        "cn": "你已到了生命的尽头。"
      },
      {
        "en": "What did you never let yourself feel, try, or become?",
        "cn": "你曾经不曾允许自己去感受、尝试或成为什么？"
      },
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
      },
      {
        "en": "What identity would you have to give up to actually change?",
        "cn": "为了真正改变，你必须放弃怎样的身份？"
      },
      {
        "en": "(”I am the type of person who...”) What would it cost you socially to no longer be that person?",
        "cn": "（“我属于那种……的人”）如果不再做那样的人，你在社交方面会付出什么代价？"
      },
      {
        "en": "What is the most embarrassing reason you haven’t changed?",
        "cn": "你至今仍未改变的最尴尬的原因是什么？"
      },
      {
        "en": "The one that makes you sound weak, scared, or lazy rather than reasonable?",
        "cn": "那种让你听起来显得软弱、胆怯或懒惰，而不是合情合理的那种？"
      },
      {
        "en": "If your current behavior is a form of self-protection, what exactly are you protecting?",
        "cn": "如果你的当前行为是一种自我保护，那么你究竟在保护什么呢？"
      },
      {
        "en": "And what is that protection costing you?",
        "cn": "那么，这种保护要让你付出多少代价呢？"
      },
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
      },
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
      },
      {
        "en": "What would you have to believe about yourself for that life to feel natural rather than forced?",
        "cn": "你必须对自己抱有什么样的信念，才能让那种生活感觉自然而然，而不是勉强为之？"
      },
      {
        "en": "Write the identity statement: “I am the type of person who...”",
        "cn": "写下这段自我认同陈述：“我是一个……的人。”"
      },
      {
        "en": "What is one thing you would do this week if you were already that person?",
        "cn": "如果你已经是那样的人了，这周你会做的一件事是什么？"
      },
      {
        "en": "Frankly, that’s not going to happen if you don’t break the current unconscious patterns that are keeping you the same.",
        "cn": "坦白说，如果你不打破那些让你停滞不前的现有潜意识模式，这种情况是不会发生的。"
      },
      {
        "en": "Throughout the day, I want you to contemplate on everything you journaled in part one.",
        "cn": "今天一整天，我希望你能仔细思考你在第一部分日记中写下的所有内容。"
      },
      {
        "en": "Beyond that, I don’t want you to forget to contemplate.",
        "cn": "除此之外，我不希望你忘记静心思考。"
      },
      {
        "en": "You aren’t going to change by doing the same thing for the rest of your life.",
        "cn": "如果你一辈子都做着同样的事情，你就无法改变自己。"
      },
      {
        "en": "You need to consciously force a pattern break.",
        "cn": "你需要有意识地打破这种模式。"
      },
      {
        "en": "Take the time right now to create reminders or calendar events in your phone.",
        "cn": "现在就花点时间在手机上设置提醒或日历事件吧。"
      },
      {
        "en": "Include the question in the reminder or event so that you can immediately start thinking about it.",
        "cn": "将问题添加到提醒或事件中，这样你就可以立即开始思考这个问题。"
      },
      {
        "en": "The more random and non-conflicting with your schedule there are, the better.",
        "cn": "这类安排越随机、与你的日程安排冲突越少，就越好。"
      },
      {
        "en": "1:30pm: If someone filmed the last two hours, what would they conclude I want from my life?",
        "cn": "下午1:30：如果有人录下了过去这两个小时，他们会得出什么结论，认为我的人生追求是什么？"
      },
      {
        "en": "7:30pm: What did I do today out of identity protection rather than genuine desire?",
        "cn": "晚上7:30：今天我做了哪些事，是出于保护个人身份的目的，而不是出于真正的意愿？"
      },
      {
        "en": "(Hint: it’s most things you do)",
        "cn": "（提示：这几乎就是你所做的所有事情）"
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
        "en": "What’s the smallest version of the person I want to become that I could be tomorrow?",
        "cn": "明天，我能成为的、最接近我理想中的那个自己，究竟是什么样子的？"
      },
      {
        "en": "If you followed that process, I would be surprised if you didn’t have at least one profound insight that could alter the course of your life.",
        "cn": "如果你按照那个流程操作，如果最终没有获得至少一个足以改变你人生轨迹的深刻见解，我反而会感到惊讶。"
      },
      {
        "en": "Now, we need to make those known, integrate them into who we are, and act on them to begin solidifying our journey to a new level of mind.",
        "cn": "现在，我们需要让这些理念广为人知，将其融入我们的内在，并付诸行动，从而开始巩固我们迈向更高精神境界的旅程。"
      },
      {
        "en": "The internal pattern or belief that has been running the show.",
        "cn": "一直主导着一切的内在模式或信念。"
      },
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
      },
      {
        "en": "Write a single sentence that captures what you’re building toward, knowing it will evolve.",
        "cn": "请用一句话概括你正在努力实现的目标，同时要明白这个目标会不断演变。"
      },
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
      },
      {
        "en": "One-year lens: What would have to be true in one year for you to know you’ve broken the old pattern?",
        "cn": "“一年之期”：一年后，必须满足哪些条件，你才能确定自己已经打破了旧的模式？"
      },
      {
        "en": "One-month lens: What would have to be true in one month for the one-year lens to remain possible?",
        "cn": "“一个月视角”：为了让“一年视角”仍然可行，一个月内必须满足什么条件？"
      },
      {
        "en": "Daily lens: What are 2-3 actions you can timeblock tomorrow that the person you’re becoming would simply do?",
        "cn": "每日反思：明天你可以安排2-3项时间块任务，这些任务是“正在成为的你”一定会去做的？"
      },
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
      },
      {
        "en": "Now, it may be helpful to organize all of your insights into one coherent plan.",
        "cn": "现在，将所有见解整理成一个连贯的计划可能会有所帮助。"
      },
      {
        "en": "Pull out a new page and write down these 6 components:",
        "cn": "翻到新的一页，写下以下6个要素："
      },
      {
        "en": "Anti-vision – What is the bane of my existence, or the life I never want to experience again?",
        "cn": "“反视界”——这究竟是我生命的祸根，还是我再也不愿经历的那种生活？"
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
      },
      {
        "en": "Daily levers – What are the priority, needle-moving tasks that bring my project closer to completion?",
        "cn": "每日关键举措——哪些是能推动项目向完成迈进、且具有优先级且能产生实质性影响的任务？"
      },
      {
        "en": "Constraints – What am I not willing to sacrifice to achieve my vision from the ground up?",
        "cn": "限制条件——为了从零开始实现我的愿景，有哪些是我不愿意牺牲的？"
      },
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
      },
      {
        "en": "Because games are the poster child for obsession, enjoyment, and flow states.",
        "cn": "因为游戏正是痴迷、乐趣和心流状态的典型代表。"
      },
      {
        "en": "They have all the components that lead to focus and clarity, so if we reverse engineer what those components are, we can live in a state of deeper enjoyment, less distractions, and more success.",
        "cn": "它们具备所有有助于集中注意力、保持思维清晰的关键要素，因此，如果我们反向推导出这些要素，就能进入一种享受更深、分心更少、成功更多的状态。"
      },
      {
        "en": "Your anti-vision is what’s at stake.",
        "cn": "你的“反愿景”才是关键所在。"
      },
      {
        "en": "What happens if you lose or give up.",
        "cn": "如果你失败或放弃了，会发生什么？"
      },
      {
        "en": "Your 1 month project is the boss fight.",
        "cn": "你这个为期1个月的项目就是与BOSS的对决。"
      },
      {
        "en": "How you gain XP and acquire loot.",
        "cn": "如何获得经验值和战利品。"
      },
      {
        "en": "Your daily levers are the quests.",
        "cn": "任务就是你每天的动力来源。"
      },
      {
        "en": "The daily process that unlocks new opportunities.",
        "cn": "这一日常流程能带来新的机遇。"
      },
      {
        "en": "Your constraints are the rules.",
        "cn": "你的限制就是规则。"
      },
      {
        "en": "The limitations that encourage creativity.",
        "cn": "那些激发创造力的限制。"
      },
      {
        "en": "All of these act as a concentric set of circles, like a forcefield, that guard your mind from distractions and shiny objects.",
        "cn": "所有这些就像一组同心圆，如同一个力场，保护你的思维免受干扰和诱惑的侵扰。"
      },
      {
        "en": "The more you play the game, the stronger this force becomes, and soon enough it becomes who you are, and you wouldn’t have it any other way.",
        "cn": "你玩得越多，这种力量就越发强大，很快它就成了你的一部分，而你也会乐在其中，别无他求。"
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
        "sentences": [
          {
            "en": "Later, the artist changed into an all-black monochrome look (sweater, trousers, shoes) for the Gemma Chan x Bloomingdale’s x Cultured Dinner, while Holmes kept her Calvin Klein fit on.",
            "cn": "随后，这位艺人换上了一身全黑的单色装扮（毛衣、长裤、鞋子），出席了Gemma Chan × Bloomingdale’s × Cultured晚宴，而霍姆斯则继续身着Calvin Klein的装扮。"
          }
        ]
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
