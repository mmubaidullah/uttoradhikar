/**
 * মুনাসাখা হিসাব — হানাফি মাযহাব (সিরাজী, ফতোয়ায়ে আলমগীরী)
 * ══════════════════════════════════════════════════════════════
 * مسألة المناسخة:
 * যখন একজন ওয়ারিশ সম্পদ বুঝে পাওয়ার আগে মারা যায়, তখন তার অংশ
 * তার নিজের ওয়ারিশদের মধ্যে বন্টিত হয়।
 *
 * পদ্ধতি (باب المناسخة থেকে):
 *  ১. প্রথম মৃতের মাসআলা সহীহ করো (تصحيح الأولى)
 *  ২. দ্বিতীয় মৃতের মাসআলা সহীহ করো (تصحيح الثانية)
 *  ৩. প্রথম ও দ্বিতীয়ের মধ্যে সম্পর্ক দেখো:
 *     - استقام (ইস্তিকাম): প্রথমের সহম দ্বিতীয়ের উপর বিভাজ্য → গুণের দরকার নেই
 *     - موافقة (মুওয়াফাকা): তাদের মধ্যে সাধারণ ভাগফল (وفق) আছে → وفق দিয়ে গুণ
 *     - مبايئة (মুবায়ানা): সম্পূর্ণ ভিন্ন → পূর্ণ সংখ্যা দিয়ে গুণ
 *  ৪. প্রথম স্তরের অংশ × ضرب (গুণক)
 *     দ্বিতীয় স্তরের অংশ × মৃত ব্যক্তির সহম (বা وفق)
 * ══════════════════════════════════════════════════════════════
 */

import { calculateInheritance } from "./inheritanceCalculations";

/**
 * গসাগু (GCD) ও লসাগু (LCM)
 */
const gcd = (a, b) => {
  a = Math.round(a);
  b = Math.round(b);
  return b === 0 ? a : gcd(b, a % b);
};
const lcm = (a, b) => {
  const g = gcd(a, b);
  return (a / g) * b;
};

/**
 * একটি মীরাসের ফলাফল থেকে num/effectiveBase আকারে ratio তৈরি
 */
const getShares = (warisObj) => {
  const { results, effectiveBase } = calculateInheritance(warisObj);
  return {
    shares: results.map(r => ({
      name:  r.name,
      share: r.share,
      num:   Math.round(r.num * 1000) / 1000, // round to avoid floating point issues
      base:  effectiveBase,
    })),
    base: effectiveBase,
  };
};

/**
 * মুনাসাখা মূল হিসাব ফাংশন — ফিকহী পদ্ধতি
 *
 * @param {Array} stages - প্রতিটি মৃতের তথ্য
 *   [{
 *     name: "আবুল করিম",
 *     waris: {...},
 *     deceasedHeirName: null (প্রথম স্তরে) বা "ছেলে" (পরবর্তী স্তরে),
 *     relationshipLabel: null বা "পুত্র হিসেবে মৃত"
 *   }, ...]
 *
 * @returns {Object} {
 *   stageResults: প্রতিটি স্তরের হিসাব,
 *   finalShares:  চূড়ান্ত জীবিত ব্যক্তিদের অংশ (num/totalBase)
 *   totalBase:    common denominator,
 *   method: ব্যবহৃত পদ্ধতির বিবরণ
 * }
 */
export const calculateMunasakha = (stages) => {
  if (!stages || stages.length === 0) return null;

  // প্রথম মৃত ব্যক্তির মাসআলা (تصحيح الأولى)
  const first = getShares(stages[0].waris);
  
  // বাইতুল মাল বাদ দেওয়া (এটি ওয়ারিশ নয়, রাষ্ট্রীয় কোষাগার)
  const firstSharesFiltered = first.shares.filter(s => s.name !== "বাইতুল মাল");
  
  // যদি কোনো ওয়ারিশ না থাকে (শুধু বাইতুল মাল), মুনাসাখা প্রযোজ্য নয়
  if (firstSharesFiltered.length === 0) {
    return {
      stageResults: [{
        ...stages[0],
        shares: first.shares,
        base: first.base,
        method: "কোনো ওয়ারিশ নেই — সম্পদ বাইতুল মালে",
      }],
      finalShares: first.shares,
      totalBase: first.base,
      totalCheck: true,
      method: "হানাফি — مسألة بيت المال",
    };
  }
  
  const stageResults = [{
    ...stages[0],
    shares: first.shares,
    base: first.base,
    method: "মূল মাসআলা",
  }];

  // Working base শুরু
  let masterBase = first.base;
  
  // প্রতিটি ওয়ারিশের বর্তমান অংশ tracking (masterBase-এর উপর ভিত্তি করে)
  let heirShares = {};
  firstSharesFiltered.forEach(h => {
    heirShares[h.name] = h.num;
  });

  // পরবর্তী স্তরসমূহ (মৃত ওয়ারিশদের)
  for (let i = 1; i < stages.length; i++) {
    const stage = stages[i];
    const deceasedName = stage.deceasedHeirName || stage.name;

    // এই মৃত ওয়ারিশের বর্তমান সহম
    if (!heirShares[deceasedName] || heirShares[deceasedName] <= 0) {
      // এই নামে কেউ নেই — skip
      stageResults.push({
        ...stage,
        shares: [],
        base: 0,
        method: "ত্রুটি: মৃত ওয়ারিশ খুঁজে পাওয়া যায়নি",
      });
      continue;
    }

    const deceasedSahm = heirShares[deceasedName]; // মূল base-এ তার অংশ

    // তার নিজের মীরাস হিসাব (تصحيح الثانية বা الثالثة...)
    const ownInheritance = getShares(stage.waris);
    const ownBase = ownInheritance.base;

    // ═══════════════════════════════════════════════════════════
    // তিন প্রকার সম্পর্ক নির্ধারণ (باب المناسخة)
    // ═══════════════════════════════════════════════════════════
    let method = "";
    let multiplier = 1; // মূল base-এর সাথে গুণ করতে হবে
    let heirMultiplier = 1; // নতুন ওয়ারিশদের অংশে গুণ

    // ১. استقام (Istiqām): মৃত ব্যক্তির সহম তার নিজের base দ্বারা বিভাজ্য
    if (deceasedSahm % ownBase === 0) {
      method = "استقام (ইস্তিকাম) — সরাসরি বিভাজন, গুণের প্রয়োজন নেই";
      multiplier = 1;
      heirMultiplier = deceasedSahm / ownBase;
    }
    // ২. موافقة (Muwāfaqah): সাধারণ ভাগফল (وفق) আছে
    else {
      const g = gcd(deceasedSahm, ownBase);
      if (g > 1) {
        method = `موافقة (মুওয়াফাকা) — وفق: ${g}, আংশিক গুণ`;
        const wafq = ownBase / g;
        multiplier = wafq;
        heirMultiplier = deceasedSahm / g;
      }
      // ৩. مبايئة (Mubāyanah): সম্পূর্ণ ভিন্ন, পূর্ণ গুণ প্রয়োজন
      else {
        method = `مبايئة (মুবায়ানা) — সম্পূর্ণ গুণ`;
        multiplier = ownBase;
        heirMultiplier = deceasedSahm;
      }
    }

    // নতুন master base
    const newMasterBase = masterBase * multiplier;

    // পুরাতন সবার অংশ scale up
    const newHeirShares = {};
    Object.entries(heirShares).forEach(([name, sahm]) => {
      if (name !== deceasedName) {
        newHeirShares[name] = sahm * multiplier;
      }
      // মৃত ব্যক্তিকে remove
    });

    // মৃত ব্যক্তির অংশ তার নিজের ওয়ারিশদের মধ্যে বন্টন
    const ownSharesFiltered = ownInheritance.shares.filter(h => h.name !== "বাইতুল মাল");
    
    ownSharesFiltered.forEach(h => {
      const portion = (h.num / ownBase) * heirMultiplier * multiplier;
      newHeirShares[h.name] = (newHeirShares[h.name] || 0) + portion;
    });

    masterBase = newMasterBase;
    heirShares = newHeirShares;

    stageResults.push({
      ...stage,
      shares: ownInheritance.shares,
      base: ownBase,
      method,
      multiplier,
      deceasedSahm,
    });
  }

  // চূড়ান্ত বন্টন
  const finalShares = Object.entries(heirShares)
    .filter(([, num]) => num > 0.001)
    .map(([name, num]) => ({
      name,
      num: Math.round(num * 1000) / 1000,
      base: masterBase,
    }));

  // যাচাই
  const total = finalShares.reduce((a, r) => a + r.num, 0);
  const isValid = Math.abs(total - masterBase) < 1;

  return {
    stageResults,
    finalShares,
    totalBase: masterBase,
    totalCheck: isValid,
    method: "হানাফি — باب المناسخة",
  };
};
