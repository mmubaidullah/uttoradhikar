/**
 * মুনাসাখা হিসাব
 * ══════════════════════════════════════════════════════════════
 * মুনাসাখা: একজন ওয়ারিশ তার অংশ বুঝে পাওয়ার আগে মারা যায়।
 * তার অংশ তার নিজের ওয়ারিশদের মধ্যে বন্টন হয়।
 *
 * পদ্ধতি (হানাফি — সিরাজী ও আলমগীরী):
 *  ১. প্রথম মৃতের মীরাস হিসাব করো → প্রতিটির অংশ (p/q আকারে)
 *  ২. যদি কোনো ওয়ারিশ ইতিমধ্যে মারা গেছে, তার অংশকে তার
 *     নিজের মীরাসের ক্রমে ভাগ করো
 *  ৩. সব কিছু একই common base-এ আনো (LCM পদ্ধতি)
 *  ৪. চূড়ান্ত জীবিত ব্যক্তিরা কে কত পায় তা দেখাও
 * ══════════════════════════════════════════════════════════════
 */

import { calculateInheritance } from "./inheritanceCalculations";

/**
 * GCD / LCM
 */
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => (a / gcd(a, b)) * b;

/**
 * একটি মীরাসের ফলাফল থেকে num/effectiveBase আকারে ratio তৈরি
 */
const getShares = (warisObj) => {
  const { results, effectiveBase } = calculateInheritance(warisObj);
  return results.map(r => ({
    name:  r.name,
    share: r.share,
    num:   r.num,
    base:  effectiveBase,
  }));
};

/**
 * মুনাসাখা মূল হিসাব ফাংশন
 *
 * @param {Array} stages - প্রতিটি মৃতের তথ্য
 *   [{ name: "আবুল করিম", waris: {...} }, ...]
 *   প্রথম index = প্রথম মৃত ব্যক্তি
 *
 * @returns {Object} {
 *   stageResults: প্রতিটি স্তরের হিসাব,
 *   finalShares:  চূড়ান্ত জীবিত ব্যক্তিদের অংশ (num/totalBase)
 *   totalBase:    common denominator
 * }
 */
export const calculateMunasakha = (stages) => {
  if (!stages || stages.length === 0) return null;

  // প্রথম স্তর
  const stage0 = getShares(stages[0].waris);
  const stageResults = [{ ...stages[0], shares: stage0, base: stage0[0]?.base || 24 }];

  // চূড়ান্ত: প্রতিটি জীবিত ব্যক্তির নাম → total numerator (একই base-এ)
  // শুরুতে প্রথম স্তরের ফলাফল দিয়ে শুরু
  let common = stageResults[0].base;
  // mapping: name → num (common base-এ)
  let currentMap = {};
  stage0.forEach(r => {
    currentMap[r.name] = r.num; // base = common
  });

  // ২য় স্তর থেকে পরবর্তীতে
  for (let i = 1; i < stages.length; i++) {
    const stage = stages[i];
    const deceased = stage.name; // এই ব্যক্তি আগের স্তরে ওয়ারিশ ছিলেন

    // আগের map-এ এই ব্যক্তি আছে কিনা
    if (!(deceased in currentMap)) continue; // এই নামে কেউ নেই — skip

    const deceasedNum  = currentMap[deceased]; // তার আগের অংশের numerator
    const deceasedBase = common;               // আগের common base

    // তার নিজের মীরাস হিসাব করো
    const ownShares = getShares(stage.waris);
    const ownBase   = ownShares[0]?.base || 24;

    stageResults.push({ ...stage, shares: ownShares, base: ownBase });

    if (ownShares.length === 0) {
      // তার কোনো ওয়ারিশ নেই → তার অংশ বাইতুল মালে বা বাকিদের রাদ্দে
      delete currentMap[deceased];
      continue;
    }

    // নতুন common base:
    // আগের সম্পদ = deceasedNum / deceasedBase (পূর্ণ base-এর অংশ)
    // তার নিজের ওয়ারিশরা পাবে: ownShares[j].num / ownBase × deceasedNum / common
    // সব এক base-এ আনতে: new_common = lcm(common, ownBase)
    const newCommon = lcm(common, ownBase);
    const scalePrev = newCommon / common;
    const scaleOwn  = newCommon / ownBase;

    // আগের সবার অংশ scale করো
    const newMap = {};
    Object.entries(currentMap).forEach(([name, num]) => {
      if (name !== deceased) {
        newMap[name] = (newMap[name] || 0) + num * scalePrev;
      }
    });

    // deceased-এর অংশ তার ওয়ারিশদের মধ্যে ভাগ করো
    const deceasedScaled = deceasedNum * scalePrev; // নতুন base-এ তার অংশ
    ownShares.forEach(r => {
      const portion = (r.num / ownBase) * deceasedScaled;
      newMap[r.name] = (newMap[r.name] || 0) + portion;
    });

    common    = newCommon;
    currentMap = newMap;
  }

  // currentMap-এ এখন প্রতিটি জীবিত ব্যক্তির numerator (common base-এ)
  const finalShares = Object.entries(currentMap)
    .filter(([, num]) => num > 0.0001)
    .map(([name, num]) => ({ name, num, base: common }));

  // যাচাই: মোট = common হওয়া উচিত
  const total = finalShares.reduce((a, r) => a + r.num, 0);

  return {
    stageResults,
    finalShares,
    totalBase: common,
    totalCheck: Math.abs(total - common) < 0.1, // floating point tolerance
  };
};
