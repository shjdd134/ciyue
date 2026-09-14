/* 词阅 WordLens —— 来源健康度（自动生成，请勿手改）
 * RSS/正文连续失败 3 次熔断，连续成功 3 次恢复；图片失败只做降级记录。
 * 评分版本：v2
 */

const DATA_SOURCE_HEALTH = {
  "Sky Sports": {
    "url": "https://www.skysports.com/rss/11095",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 160,
      "lastAt": "2026-09-14T00:32:38.442Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 958,
      "lastAt": "2026-09-14T00:32:48.764Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:32:48.764Z"
  },
  "FourFourTwo": {
    "url": "https://www.fourfourtwo.com/feeds.xml",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 108,
      "lastAt": "2026-09-14T00:32:38.565Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 28,
      "lastAt": "2026-09-14T00:32:49.689Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 5,
      "lastAt": "2026-09-14T00:35:30.707Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:35:30.707Z"
  },
  "Opta Analyst": {
    "url": "https://theanalyst.com/feed",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 85,
      "lastAt": "2026-09-14T00:32:38.657Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 10,
      "lastAt": "2026-09-14T00:32:50.068Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 61,
      "lastAt": "2026-09-14T00:35:34.762Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:35:34.762Z"
  },
  "TechCrunch AI": {
    "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 89,
      "lastAt": "2026-09-14T00:32:38.752Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 14,
      "lastAt": "2026-09-14T00:32:50.324Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 14,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 14,
      "lastAt": "2026-09-14T00:35:35.678Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 5,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:35:35.678Z"
  },
  "AI News": {
    "url": "https://www.artificialintelligence-news.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 202,
      "lastLatencyMs": 562,
      "lastAt": "2026-09-14T00:32:39.315Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:32:39.315Z"
  },
  "Dan Koe": {
    "url": "https://letters.thedankoe.com/feed",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 239,
      "lastAt": "2026-09-14T00:32:39.554Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 243,
      "lastAt": "2026-09-14T00:32:53.504Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:32:53.504Z"
  },
  "Farnam Street": {
    "url": "https://fs.blog/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 244,
      "lastAt": "2026-09-14T00:32:39.800Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 41,
      "lastAt": "2026-09-14T00:32:54.273Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 177,
      "lastAt": "2026-09-14T00:35:27.732Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 10,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:35:27.732Z"
  },
  "More To That": {
    "url": "https://moretothat.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 115,
      "lastAt": "2026-09-14T00:32:39.916Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 392,
      "lastAt": "2026-09-14T00:32:57.673Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 8,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:32:57.673Z"
  },
  "Ness Labs": {
    "url": "https://nesslabs.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 420,
      "lastAt": "2026-09-14T00:32:40.338Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 44,
      "lastAt": "2026-09-14T00:33:30.941Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 8,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:33:30.941Z"
  },
  "Aeon": {
    "url": "https://aeon.co/feed.rss",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 143,
      "lastAt": "2026-09-14T00:32:40.482Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 45,
      "lastAt": "2026-09-14T00:33:31.812Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:33:31.812Z"
  },
  "Psyche": {
    "url": "https://psyche.co/feed",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 267,
      "lastAt": "2026-09-14T00:32:40.749Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 35,
      "lastAt": "2026-09-14T00:33:32.700Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:33:32.700Z"
  },
  "The Guardian": {
    "url": "https://www.theguardian.com/film/rss",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 584,
      "lastAt": "2026-09-14T00:32:41.334Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 169,
      "lastAt": "2026-09-14T00:33:36.455Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 21,
      "lastAt": "2026-09-14T00:35:32.083Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:35:32.083Z"
  },
  "Vanity Fair": {
    "url": "https://www.vanityfair.com/feed/rss",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 124,
      "lastAt": "2026-09-14T00:32:41.461Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 197,
      "lastAt": "2026-09-14T00:33:40.858Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:33:40.858Z"
  },
  "Rolling Stone": {
    "url": "https://www.rollingstone.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 99,
      "lastAt": "2026-09-14T00:32:41.562Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 13,
      "lastAt": "2026-09-14T00:33:41.061Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 9,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:33:41.061Z"
  },
  "ELLE": {
    "url": "https://www.elle.com/rss/all.xml/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 167,
      "lastAt": "2026-09-14T00:32:41.730Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 384,
      "lastAt": "2026-09-14T00:33:48.490Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:33:48.490Z"
  },
  "Harper's Bazaar": {
    "url": "https://www.harpersbazaar.com/rss/all.xml/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 286,
      "lastAt": "2026-09-14T00:32:42.018Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 108,
      "lastAt": "2026-09-14T00:33:58.837Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 74,
      "lastAt": "2026-09-14T00:35:33.754Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 6,
      "disabled": false
    },
    "updatedAt": "2026-09-14T00:35:33.754Z"
  }
};
