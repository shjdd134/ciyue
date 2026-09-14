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
      "lastLatencyMs": 1396,
      "lastAt": "2026-09-13T12:41:53.390Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 900,
      "lastAt": "2026-09-13T12:44:41.294Z",
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
    "updatedAt": "2026-09-13T12:44:41.294Z"
  },
  "FourFourTwo": {
    "url": "https://www.fourfourtwo.com/feeds.xml",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 19175,
      "lastAt": "2026-09-13T12:42:12.577Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 2,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 4136,
      "lastAt": "2026-09-13T12:45:43.401Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 12,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 260,
      "lastAt": "2026-09-13T12:48:04.185Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 1,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:48:04.185Z"
  },
  "Opta Analyst": {
    "url": "https://theanalyst.com/feed",
    "rss": {
      "ok": false,
      "lastStatus": 0,
      "lastLatencyMs": 25014,
      "lastAt": "2026-09-13T12:43:16.871Z",
      "consecutiveFailures": 1,
      "consecutiveSuccesses": 0,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 725,
      "lastAt": "2026-09-13T12:39:01.178Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 12,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 2072,
      "lastAt": "2026-09-13T12:28:58.418Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 7,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:43:16.871Z"
  },
  "TechCrunch AI": {
    "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1405,
      "lastAt": "2026-09-13T12:43:18.276Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 167,
      "lastAt": "2026-09-13T12:45:44.374Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 573,
      "lastAt": "2026-09-13T12:48:13.884Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 10,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:48:13.884Z"
  },
  "AI News": {
    "url": "https://www.artificialintelligence-news.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1763,
      "lastAt": "2026-09-13T12:43:20.040Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 247,
      "lastAt": "2026-09-13T12:45:47.550Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 299,
      "lastAt": "2026-09-13T12:49:35.023Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 6,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:49:35.023Z"
  },
  "Dan Koe": {
    "url": "https://letters.thedankoe.com/feed",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1433,
      "lastAt": "2026-09-13T12:43:21.474Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 307,
      "lastAt": "2026-09-13T12:45:49.531Z",
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
    "updatedAt": "2026-09-13T12:45:49.531Z"
  },
  "Farnam Street": {
    "url": "https://fs.blog/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1127,
      "lastAt": "2026-09-13T12:43:22.602Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1079,
      "lastAt": "2026-09-13T12:45:53.559Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 535,
      "lastAt": "2026-09-13T12:47:56.832Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 20,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:47:56.832Z"
  },
  "More To That": {
    "url": "https://moretothat.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1006,
      "lastAt": "2026-09-13T12:43:26.760Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 696,
      "lastAt": "2026-09-13T12:45:59.271Z",
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
    "updatedAt": "2026-09-13T12:45:59.271Z"
  },
  "Ness Labs": {
    "url": "https://nesslabs.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1802,
      "lastAt": "2026-09-13T12:43:28.563Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 236,
      "lastAt": "2026-09-13T12:46:01.178Z",
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
    "updatedAt": "2026-09-13T12:46:01.178Z"
  },
  "Aeon": {
    "url": "https://aeon.co/feed.rss",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 2055,
      "lastAt": "2026-09-13T12:43:30.619Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 97,
      "lastAt": "2026-09-13T12:46:02.078Z",
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
    "updatedAt": "2026-09-13T12:46:02.078Z"
  },
  "Psyche": {
    "url": "https://psyche.co/feed",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 754,
      "lastAt": "2026-09-13T12:43:31.374Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 104,
      "lastAt": "2026-09-13T12:46:02.841Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 589,
      "lastAt": "2026-09-13T12:47:52.167Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 8,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:47:52.167Z"
  },
  "The Guardian": {
    "url": "https://www.theguardian.com/film/rss",
    "rss": {
      "ok": false,
      "lastStatus": 0,
      "lastLatencyMs": 10705,
      "lastAt": "2026-09-13T12:44:06.916Z",
      "consecutiveFailures": 4,
      "consecutiveSuccesses": 0,
      "disabled": true
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
    "updatedAt": "2026-09-13T12:44:06.916Z"
  },
  "Vanity Fair": {
    "url": "https://www.vanityfair.com/feed/rss",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 824,
      "lastAt": "2026-09-13T12:44:07.740Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 264,
      "lastAt": "2026-09-13T12:46:04.704Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 624,
      "lastAt": "2026-09-13T12:48:13.096Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 2,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:48:13.096Z"
  },
  "Rolling Stone": {
    "url": "https://www.rollingstone.com/feed/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 569,
      "lastAt": "2026-09-13T12:44:08.310Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 176,
      "lastAt": "2026-09-13T12:46:05.787Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 16,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 346,
      "lastAt": "2026-09-13T12:48:18.031Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 3,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:48:18.031Z"
  },
  "ELLE": {
    "url": "https://www.elle.com/rss/all.xml/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 2879,
      "lastAt": "2026-09-13T12:44:11.190Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 686,
      "lastAt": "2026-09-13T12:46:43.837Z",
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
    "updatedAt": "2026-09-13T12:46:43.837Z"
  },
  "Harper's Bazaar": {
    "url": "https://www.harpersbazaar.com/rss/all.xml/",
    "rss": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 4116,
      "lastAt": "2026-09-13T12:44:38.586Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 4,
      "disabled": false
    },
    "article": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 650,
      "lastAt": "2026-09-13T12:47:14.685Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 7,
      "disabled": false
    },
    "image": {
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 236,
      "lastAt": "2026-09-13T12:49:31.530Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 6,
      "disabled": false
    },
    "updatedAt": "2026-09-13T12:49:31.530Z"
  },
  "Vogue US": {
    "url": "",
    "rss": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
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
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1918,
      "lastAt": "2026-09-14T13:14:27.149Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 123,
      "disabled": false
    },
    "updatedAt": "2026-09-14T13:14:27.149Z"
  },
  "British Vogue": {
    "url": "",
    "rss": {
      "ok": null,
      "lastStatus": null,
      "lastLatencyMs": null,
      "lastAt": "",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 0,
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
      "ok": true,
      "lastStatus": 200,
      "lastLatencyMs": 1486,
      "lastAt": "2026-09-14T13:13:54.191Z",
      "consecutiveFailures": 0,
      "consecutiveSuccesses": 17,
      "disabled": false
    },
    "updatedAt": "2026-09-14T13:13:54.191Z"
  }
};
