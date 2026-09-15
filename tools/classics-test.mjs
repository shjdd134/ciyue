#!/usr/bin/env node
/* 明星经典图集回归：目标人物优先，但仍经过同一组硬门槛。 */

import assert from "node:assert/strict";
import { buildPool } from "./lib-classics.mjs";

const entry = (person, slug, early, figs = 8) => ({
  person,
  slug,
  group: "female",
  m: { early, figs, words: 120, readWords: 420, title: slug.replaceAll("-", " ") },
});

const { pool } = buildPool([
  entry("audrey hepburn", "vintage-audrey-hepburn", 25, 12),
  entry("monica bellucci", "young-monica-bellucci", 10, 6),
  entry("sophie marceau", "sophie-marceau-through-the-years", 8, 6),
], { minEarly: 8, minFigs: 6, minWords: 80, minRead: 300 });

assert.equal(pool[0].person, "monica bellucci");
assert.equal(pool[1].person, "sophie marceau");
assert.equal(pool.length, 3);
console.log("classics-test: 3/3 passed");
