/**
 * ══════════════════════════════════════════════════════════════
 * Munasakhah Calculation Engine - Exact Fraction Arithmetic
 * باب المناسخة - Hanafi Madhhab
 * ══════════════════════════════════════════════════════════════
 * 
 * Classical Reference:
 * "ولو صار بعض الأنصباء ميراثا قبل القسمة... فالأصل فيه أن تصحح 
 * مسألة الميت الأول، وتعطي سهام كل وارث من التصحيح، ثم تصحيح 
 * مسألة الثاني، وتنظر بين ما في يده من التصحيح الأول وبين 
 * التصحيح الثاني ثلاثة أحوال:
 * - استقام: إن استقام ما في يده... فلاحاجة إلى الضرب
 * - موافقة: إن كان بينهما موافقة فاضرب وفق التصحيح
 * - مبايئة: إن كان بينهما مبايئة فاضرب كل التصحيح"
 */

import { Fraction, gcd, lcm, commonDenominator, sumFractions } from './fractionMath';
import { calculateInheritance } from './inheritanceCalculations';

/**
 * @typedef {Object} HeirShare
 * @property {string} name - Heir name (e.g., "ছেলে", "মেয়ে")
 * @property {Fraction} share - Exact fraction of inheritance
 * @property {string} relationship - Relationship to deceased
 */

/**
 * @typedef {Object} StageResult
 * @property {number} stageIndex - 0-based stage number
 * @property {string} deceasedName - Name of deceased person
 * @property {string} deceasedHeirName - Which heir died (null for stage 0)
 * @property {number} tashih - Tas'hih (base) for this stage
 * @property {number} sahm - Share held by deceased from previous stage
 * @property {string} method - استقام, موافقة, or مبايئة
 * @property {number} wafq - GCD value (for موافقة)
 * @property {number} multiplier - Multiplier applied to previous base
 * @property {HeirShare[]} heirs - Heirs with exact fractions
 * @property {number} newBase - New global base after this stage
 */

/**
 * @typedef {Object} MunasakhahResult
 * @property {StageResult[]} stages - Step-by-step calculation
 * @property {Map<string, Fraction>} finalShares - Aggregated shares per heir
 * @property {number} finalBase - Final global base (الجامعة)
 * @property {boolean} isValid - Whether total equals base
 * @property {string[]} warnings - Any calculation warnings
 */

/**
 * Determine the reduction method (استقام, موافقة, مبايئة)
 * @param {number} sahm - Share held by deceased
 * @param {number} tashih - Tas'hih of deceased's own inheritance
 * @returns {{method: string, wafq: number, multiplier: number, heirMultiplier: number}}
 */
const determineMethod = (sahm, tashih) => {
  // استقام (Istiqam): Direct division - sahm divides evenly by tashih
  if (sahm % tashih === 0) {
    return {
      method: "استقام (ইস্তিকাম)",
      wafq: tashih,
      multiplier: 1, // No multiplication of previous base needed
      heirMultiplier: sahm / tashih,
    };
  }

  // موافقة (Muwafaqah): Partial agreement - GCD exists
  const g = gcd(sahm, tashih);
  if (g > 1) {
    return {
      method: `موافقة (মুওয়াফাকা) — وفق: ${g}`,
      wafq: g,
      multiplier: tashih / g, // Multiply previous base by reduced tashih
      heirMultiplier: sahm / g, // Heirs get reduced sahm
    };
  }

  // مبايئة (Mubayanah): Complete difference - multiply fully
  return {
    method: "مبايئة (মুবায়ানা)",
    wafq: 1,
    multiplier: tashih, // Multiply previous base by full tashih
    heirMultiplier: sahm, // Heirs get full sahm
  };
};

/**
 * Calculate one stage of inheritance using exact fractions
 * @param {Object} warisObj - Waris selection object
 * @returns {{heirs: HeirShare[], tashih: number}}
 */
const calculateStageWithFractions = (warisObj) => {
  const { results, effectiveBase } = calculateInheritance(warisObj);
  
  const heirs = results
    .filter(r => r.name !== "বাইতুল মাল") // Exclude Bayt al-Mal
    .map(r => ({
      name: r.name,
      share: new Fraction(Math.round(r.num * 1000), effectiveBase * 1000), // Avoid floating point
      relationship: r.share,
    }));

  return {
    heirs,
    tashih: effectiveBase,
  };
};

/**
 * Main Munasakhah Calculation Engine
 * @param {Array} stages - Array of {name, waris, deceasedHeirName}
 * @returns {MunasakhahResult}
 */
export const calculateMunasakhahExact = (stages) => {
  if (!stages || stages.length === 0) {
    return {
      stages: [],
      finalShares: new Map(),
      finalBase: 0,
      isValid: false,
      warnings: ["No stages provided"],
    };
  }

  const stageResults = [];
  const warnings = [];

  // ═════════════════════════════════════════════════════════════
  // Stage 0: First Deceased (تصحيح الأولى)
  // ═════════════════════════════════════════════════════════════
  const stage0 = calculateStageWithFractions(stages[0].waris);
  
  if (stage0.heirs.length === 0) {
    warnings.push("প্রথম মৃত ব্যক্তির কোনো ওয়ারিশ নেই");
    return {
      stages: [{
        stageIndex: 0,
        deceasedName: stages[0].name,
        deceasedHeirName: null,
        tashih: stage0.tashih,
        sahm: stage0.tashih,
        method: "কোনো ওয়ারিশ নেই",
        wafq: 0,
        multiplier: 1,
        heirs: [],
        newBase: stage0.tashih,
      }],
      finalShares: new Map(),
      finalBase: stage0.tashih,
      isValid: false,
      warnings,
    };
  }

  let globalBase = stage0.tashih;
  
  // Track each heir's accumulated share (as exact fraction of globalBase)
  // Map<heirName, Fraction>
  const heirShares = new Map();
  
  stage0.heirs.forEach(heir => {
    // Convert fraction to numerator in terms of globalBase
    const numerator = Math.round((heir.share.num / heir.share.den) * globalBase);
    heirShares.set(heir.name, new Fraction(numerator, globalBase));
  });

  stageResults.push({
    stageIndex: 0,
    deceasedName: stages[0].name,
    deceasedHeirName: null,
    tashih: stage0.tashih,
    sahm: stage0.tashih,
    method: "মূল মাসআলা (تصحيح الأولى)",
    wafq: 0,
    multiplier: 1,
    heirs: stage0.heirs,
    newBase: globalBase,
  });

  // ═════════════════════════════════════════════════════════════
  // Stages 1..N: Subsequent Deaths
  // ═════════════════════════════════════════════════════════════
  for (let i = 1; i < stages.length; i++) {
    const stage = stages[i];
    const deceasedHeirName = stage.deceasedHeirName;

    // Find the deceased heir in current pool
    if (!heirShares.has(deceasedHeirName)) {
      warnings.push(`স্তর ${i + 1}: "${deceasedHeirName}" খুঁজে পাওয়া যায়নি`);
      continue;
    }

    // Get deceased's current share (as fraction of globalBase)
    const deceasedFraction = heirShares.get(deceasedHeirName);
    const deceasedSahm = Math.round(deceasedFraction.num); // Numerator = sahm in globalBase

    // Remove deceased from pool
    heirShares.delete(deceasedHeirName);

    // Calculate deceased's own inheritance
    const ownInheritance = calculateStageWithFractions(stage.waris);
    const ownTashih = ownInheritance.tashih;

    if (ownInheritance.heirs.length === 0) {
      warnings.push(`স্তর ${i + 1}: "${stage.name}" এর কোনো ওয়ারিশ নেই`);
      stageResults.push({
        stageIndex: i,
        deceasedName: stage.name,
        deceasedHeirName,
        tashih: ownTashih,
        sahm: deceasedSahm,
        method: "কোনো ওয়ারিশ নেই",
        wafq: 0,
        multiplier: 1,
        heirs: [],
        newBase: globalBase,
      });
      continue;
    }

    // ═════════════════════════════════════════════════════════════
    // Apply Three-Case Method (استقام, موافقة, مبايئة)
    // ═════════════════════════════════════════════════════════════
    const { method, wafq, multiplier, heirMultiplier } = determineMethod(deceasedSahm, ownTashih);

    // New global base
    const newGlobalBase = globalBase * multiplier;

    // Scale all existing heirs' shares
    const newHeirShares = new Map();
    for (const [name, fraction] of heirShares) {
      const newNum = fraction.num * multiplier;
      newHeirShares.set(name, new Fraction(newNum, newGlobalBase));
    }

    // Distribute deceased's share to their heirs
    ownInheritance.heirs.forEach(heir => {
      const portion = Math.round((heir.share.num / heir.share.den) * heirMultiplier * multiplier);
      
      // **Aggregation**: If heir already exists, add to their share
      if (newHeirShares.has(heir.name)) {
        const existing = newHeirShares.get(heir.name);
        const newNum = existing.num + portion;
        newHeirShares.set(heir.name, new Fraction(newNum, newGlobalBase));
      } else {
        newHeirShares.set(heir.name, new Fraction(portion, newGlobalBase));
      }
    });

    globalBase = newGlobalBase;
    heirShares.clear();
    for (const [name, fraction] of newHeirShares) {
      heirShares.set(name, fraction);
    }

    stageResults.push({
      stageIndex: i,
      deceasedName: stage.name,
      deceasedHeirName,
      tashih: ownTashih,
      sahm: deceasedSahm,
      method,
      wafq,
      multiplier,
      heirs: ownInheritance.heirs,
      newBase: globalBase,
    });
  }

  // ═════════════════════════════════════════════════════════════
  // Validation: Check if total equals base
  // ═════════════════════════════════════════════════════════════
  let total = 0;
  for (const fraction of heirShares.values()) {
    total += fraction.num;
  }

  const isValid = Math.abs(total - globalBase) < 1;

  if (!isValid) {
    warnings.push(`মোট অসঙ্গতি: ${total} ≠ ${globalBase}`);
  }

  return {
    stages: stageResults,
    finalShares: heirShares,
    finalBase: globalBase,
    isValid,
    warnings,
  };
};
