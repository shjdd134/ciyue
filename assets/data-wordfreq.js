/* 词阅 WordLens —— 常见词表（自动生成，请勿手改；运行 node tools/build-wordfreq.mjs 重新生成）
 *
 * COMMON_WORDS：ECDICT 当代语料词频 frq ≤ 2500 的单词，已剔除 4082 个学习词。
 * 用途：判断「不在学习词表里的词」对四级读者算不算常见词 —— 命中即视为大概率认识，
 * 不命中即视为超出四级范围的陌生词。见 assets/app.js 的 computeArticleMetrics()。
 * 词库换代后必须重跑，否则排除表过期。
 * 共 242 词。
 */
window.COMMON_WORDS = (() => {
  const set = Object.create(null);
  for (const w of "a about above according ad administrator after again against all ally along also always am among analyst and another any apparently arab around as at attorney barely be because before behind being below beneath beside between beyond both buck but by can carefully ceo championship coalition competitive concerned congressional constantly cop could coverage creation currently democrat designer do during each enforcement entirely environmental equally essentially evaluation even ever every except existing few fewer fishing for from fully funding go grab greatest growing guy have he her here hi him his historic housing how i if in including increased increasing inside interested intervention into investigator investor involved involvement iraqi israeli it its judgment just legislation like literally lots many marketing may me might mine more most mr mrs ms much must my n't near negotiation neighborhood never no none nor not nothing of off often oh ok on once only onto opposition or other others our out outside over participation particularly past payment perfectly personality planning pm presidential priority producer prosecutor rating regime regional remaining retirement sales sexual shall she should significantly since so some sometimes spending still such suicide supporter supposed surprised tablespoon teaspoon terms than thanks that the their them then therapy there these they this those through throughout to too toward tv typically under united until up upon us very voter vs we what when where which while who whom whose why will with within without would yet you your".split(" ")) set[w] = 1;
  return set;
})();
