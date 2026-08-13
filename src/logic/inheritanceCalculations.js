/**
 * ══════════════════════════════════════════════════════════════════
 * ইসলামী উত্তরাধিকার (ফারায়েজ) — হানাফি মাযহাব
 * সূত্র: সিরাজী, ফতোয়ায়ে আলমগীরী, রদ্দুল মুহতার, হিদায়া
 * ══════════════════════════════════════════════════════════════════
 *
 * স্তরবিন্যাস:
 *  ১. জাবিল ফুরুজ (নির্ধারিত অংশ)
 *  ২. আসাবা নাসাবিয়া (রক্তের অবশিষ্টাংশভোগী)
 *  ৩. জাবিল আরহাম (রেহেমি আত্মীয়) — তানযিল পদ্ধতিতে
 *  ৪. বাইতুল মাল
 *
 * মূল সংশোধনসমূহ (v3):
 *  - দাদা থাকলে সহোদর/বৈমাত্রীয় ভাই-বোন সম্পূর্ণ বঞ্চিত (হানাফি)
 *  - putro_putro থাকলে putro_konna ফুরুজে নয়, আসাবায় ২:১
 *  - জাবিল আরহামে তানযিল পদ্ধতি (মূল আত্মীয়ের অংশ অনুপাতে)
 * ══════════════════════════════════════════════════════════════════
 */

// Bengali number converter
const toBengaliNumber = (num) => {
  if (num === null || num === undefined || num === '') return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

export const calculateInheritance = (waris) => {
  let res  = [];
  const base = 24; // working base — আউলে পরে বাড়বে

  // ─────────────────────────────────────────────────────────────
  // হেল্পার: উপস্থিতি পরীক্ষা
  // ─────────────────────────────────────────────────────────────
  const v = (k) => (waris[k] || 0); // safe getter

  const hasChildren =
    v("putro") > 0 || v("konna") > 0 ||
    v("putro_putro") > 0 || v("putro_konna") > 0 ||
    v("putro_putro_putro") > 0;

  // পুরুষ বংশধর (আসাবা ক্রম ও হাজব উভয়ের জন্য)
  const hasMaleDesc =
    v("putro") > 0 || v("putro_putro") > 0 || v("putro_putro_putro") > 0;

  const totalSiblings =
    v("shohodor_bhai") + v("shohodor_bon") +
    v("boimatreyo_bhai") + v("boimatreyo_bon") +
    v("boipitreyo_bhai") + v("boipitreyo_bon");

  // সহোদর/বৈমাত্রীয় ভাই-বোন — হানাফিতে দাদা থাকলে এরা বঞ্চিত
  const hasSiblings =
    v("shohodor_bhai") > 0 || v("shohodor_bon") > 0 ||
    v("boimatreyo_bhai") > 0 || v("boimatreyo_bon") > 0;

  // দাদা ভাই-বোনকে হাজব করেন কিনা (হানাফি মাযহাব)
  const dadaBlocksSiblings = !waris.pita && waris.dada;

  // ═══════════════════════════════════════════════════════════════
  // ধাপ ১ — জাবিল ফুরুজ
  // ═══════════════════════════════════════════════════════════════

  // ── বাবা ────────────────────────────────────────────────────
  if (waris.pita) {
    if (hasChildren) {
      // সন্তান থাকলে বাবা ১/৬ ফুরুজ + বাকি আসাবা
      res.push({ name: "বাবা", n: 1, d: 6, role: "furuz+asaba" });
    }
    // সন্তান না থাকলে বাবা শুধু আসাবা (ধাপ ২-এ)
  }

  // ── দাদা (বাবার অবর্তমানে) ─────────────────────────────────
  else if (waris.dada) {
    if (hasChildren) {
      // সন্তান থাকলে দাদা ১/৬ + আসাবা
      res.push({ name: "দাদা", n: 1, d: 6, role: "furuz+asaba" });
    }
    // দাদা থাকলে ভাই-বোন সম্পূর্ণ বঞ্চিত → ধাপ ২-এ দাদা আসাবা
  }

  // ── বৈপিত্রীয় ভাই/বোন ─────────────────────────────────────
  // শর্ত: সন্তান নেই, বাবা/দাদা নেই
  if (!hasChildren && !waris.pita && !waris.dada) {
    const bpCount = v("boipitreyo_bhai") + v("boipitreyo_bon");
    if (bpCount > 0) {
      const onlyOne = bpCount === 1;
      const nm = onlyOne
        ? (v("boipitreyo_bhai") > 0 ? "বৈপিত্রীয় ভাই" : "বৈপিত্রীয় বোন")
        : "বৈপিত্রীয় ভাই/বোন";
      res.push({ name: nm, n: 1, d: onlyOne ? 6 : 3 });
    }
  }

  // ── স্বামী / স্ত্রী ─────────────────────────────────────────
  if (waris.shami) {
    res.push({ name: "স্বামী", n: 1, d: hasChildren ? 4 : 2 });
  } else if (v("stri") > 0) {
    const d = (hasChildren ? 8 : 4) * v("stri");
    res.push({
      name: v("stri") > 1 ? `স্ত্রী (${toBengaliNumber(v("stri"))} জন)` : "স্ত্রী",
      n: 1, d,
    });
  }

  // ── কন্যা ───────────────────────────────────────────────────
  // শর্ত: কোনো পুত্র নেই
  if (v("putro") === 0 && v("konna") > 0) {
    res.push({
      name: "মেয়ে",
      n: v("konna") === 1 ? 1 : 2,
      d: v("konna") === 1 ? 2 : 3,
    });
  }

  // ── পুত্রের কন্যা (নাতনি) ────────────────────────────────
  // Bug fix: putro_putro থাকলে নাতনি ফুরুজে নয়, আসাবায় যাবে
  // putro_putro না থাকলে নাতনি স্বাভাবিক ফুরুজ পায়
  if (
    v("putro") === 0 &&
    v("putro_putro") === 0 &&  // ← BUG FIX: নাতি থাকলে ফুরুজ নয়
    v("putro_putro_putro") === 0 &&
    v("putro_konna") > 0
  ) {
    if (v("konna") === 0) {
      res.push({
        name: "পুত্রের কন্যা",
        n: v("putro_konna") === 1 ? 1 : 2,
        d: v("putro_konna") === 1 ? 2 : 3,
      });
    } else if (v("konna") === 1) {
      // ১ কন্যা ১/২ নিয়েছে → নাতনি ১/৬ পাবে (২/৩ পূর্ণ করতে)
      res.push({ name: "পুত্রের কন্যা", n: 1, d: 6 });
    }
    // ২+ কন্যা → নাতনি বঞ্চিত (যদি না পুত্রের পুত্র তাকে আসাবা করে)
  }

  // ── সহোদর বোন (ফুরুজ হিসেবে) ───────────────────────────
  // Bug fix: দাদা থাকলে সহোদর বোন ফুরুজও পাবে না
  if (
    !hasChildren && !hasMaleDesc &&
    !waris.pita && !waris.dada &&   // ← দাদা থাকলে বঞ্চিত
    v("shohodor_bhai") === 0 &&
    v("shohodor_bon") > 0
  ) {
    res.push({
      name: "সহোদর বোন",
      n: v("shohodor_bon") === 1 ? 1 : 2,
      d: v("shohodor_bon") === 1 ? 2 : 3,
    });
  }

  // ── বৈমাত্রীয় বোন (ফুরুজ হিসেবে) ─────────────────────
  {
    const canFuruz =
      !hasChildren && !hasMaleDesc &&
      !waris.pita && !waris.dada &&  // ← দাদা থাকলে বঞ্চিত
      v("shohodor_bhai") === 0 && v("boimatreyo_bhai") === 0 &&
      v("konna") === 0 && v("putro_konna") === 0;

    if (canFuruz && v("boimatreyo_bon") > 0) {
      if (v("shohodor_bon") === 0) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          n: v("boimatreyo_bon") === 1 ? 1 : 2,
          d: v("boimatreyo_bon") === 1 ? 2 : 3,
        });
      } else if (v("shohodor_bon") === 1) {
        // ১ সহোদর বোন ১/২ পেয়েছে → বৈমাত্রীয় বোন ১/৬
        res.push({ name: "বৈমাত্রীয় বোন", n: 1, d: 6 });
      }
    }
  }

  // ── মা ───────────────────────────────────────────────────
  if (waris.mata) {
    let n = 1, d = 6, label = "";
    if (!hasChildren && totalSiblings < 2) {
      // গারাভাইন / উমারিয়া মাসআলা
      if (waris.pita && (waris.shami || v("stri") > 0)) {
        d = waris.shami ? 6 : 4;
        label = " (অবশিষ্টের ১/৩)";
      } else {
        d = 3;
      }
    }
    res.push({ name: "মা", n, d, extraLabel: label });
  }

  // ── দাদি ও নানি ─────────────────────────────────────────
  const hasDadi = !waris.mata && !waris.pita && waris.dadi;
  const hasNani = !waris.mata && waris.nani;

  if (hasDadi && hasNani) {
    res.push({ name: "দাদি", n: 0.5, d: 6 });
    res.push({ name: "নানি", n: 0.5, d: 6 });
  } else {
    if (hasDadi) res.push({ name: "দাদি", n: 1, d: 6 });
    if (hasNani) res.push({ name: "নানি", n: 1, d: 6 });
  }

  // ═══════════════════════════════════════════════════════════════
  // ধাপ ২ — আসাবা নির্ধারণ
  // ═══════════════════════════════════════════════════════════════
  let asabaList = [];

  // ২.১ পুত্র (+ কন্যা ২:১)
  if (v("putro") > 0) {
    asabaList.push({ name: "ছেলে", w: 2, c: v("putro") });
    if (v("konna") > 0)
      asabaList.push({ name: "মেয়ে", w: 1, c: v("konna") });
  }
  // ২.২ পুত্রের পুত্র (+ পুত্রের কন্যা ২:১) — Bug fix এখানে
  else if (v("putro_putro") > 0) {
    asabaList.push({ name: "পুত্রের পুত্র", w: 2, c: v("putro_putro") });
    if (v("putro_konna") > 0)
      asabaList.push({ name: "পুত্রের কন্যা", w: 1, c: v("putro_konna") });
  }
  // ২.৩ পুত্রের পুত্রের পুত্র
  else if (v("putro_putro_putro") > 0) {
    asabaList.push({ name: "পুত্রের পুত্রের পুত্র", w: 2, c: v("putro_putro_putro") });
    if (v("putro_putro_konna") > 0)
      asabaList.push({ name: "পুত্রের পুত্রের কন্যা", w: 1, c: v("putro_putro_konna") });
  }
  // ২.৪ বাবা (সন্তান না থাকলে আসাবা)
  else if (waris.pita && !hasChildren) {
    asabaList.push({ name: "বাবা", w: 1, c: 1 });
  }
  // ২.৫ দাদা (বাবা না থাকলে)
  // Bug fix: দাদা আসাবা হলে ভাই-বোন বঞ্চিত — তাই else if দিয়ে আলাদা
  else if (waris.dada && !waris.pita && !hasChildren) {
    asabaList.push({ name: "দাদা", w: 1, c: 1 });
    // ভাই-বোন দাদার দ্বারা হাজব — asabaList এ আর যুক্ত হবে না
  }
  else if (!waris.pita && !waris.dada && !hasMaleDesc) {
    // ২.৬ কন্যা/নাতনি + সহোদর বোন → বোন আসাবা বিল গাইর
    if (
      (v("konna") > 0 || v("putro_konna") > 0) &&
      v("shohodor_bon") > 0 && v("shohodor_bhai") === 0
    ) {
      asabaList.push({ name: "সহোদর বোন", w: 1, c: v("shohodor_bon") });
    }
    // ২.৭ কন্যা/নাতনি + বৈমাত্রীয় বোন (সহোদর না থাকলে) → আসাবা
    else if (
      (v("konna") > 0 || v("putro_konna") > 0) &&
      v("boimatreyo_bon") > 0 &&
      v("shohodor_bhai") === 0 && v("shohodor_bon") === 0
    ) {
      asabaList.push({ name: "বৈমাত্রীয় বোন", w: 1, c: v("boimatreyo_bon") });
    }
    // ২.৮ সহোদর ভাই (+ বোন ২:১)
    else if (v("shohodor_bhai") > 0) {
      asabaList.push({ name: "সহোদর ভাই", w: 2, c: v("shohodor_bhai") });
      if (v("shohodor_bon") > 0)
        asabaList.push({ name: "সহোদর বোন", w: 1, c: v("shohodor_bon") });
    }
    // ২.৯ বৈমাত্রীয় ভাই (+ বোন ২:১)
    else if (v("boimatreyo_bhai") > 0) {
      asabaList.push({ name: "বৈমাত্রীয় ভাই", w: 2, c: v("boimatreyo_bhai") });
      if (v("boimatreyo_bon") > 0)
        asabaList.push({ name: "বৈমাত্রীয় বোন", w: 1, c: v("boimatreyo_bon") });
    }
    else {
      // ২.১০ দূরবর্তী আসাবা চেইন
      const chain = [
        { k: "shohodor_bhai_putro",        n: "সহোদর ভাইয়ের পুত্র" },
        { k: "shohodor_bhai_putro_putro",   n: "সহোদর ভাইয়ের পুত্রের পুত্র" },
        { k: "boimatreyo_bhai_putro",       n: "বৈমাত্রীয় ভাইয়ের পুত্র" },
        { k: "boimatreyo_bhai_putro_putro", n: "বৈমাত্রীয় ভাইয়ের পুত্রের পুত্র" },
        { k: "chacha",                      n: "চাচা (সহোদর)" },
        { k: "boimatreyo_chacha",           n: "চাচা (বৈমাত্রীয়)" },
        { k: "chacha_putro",                n: "চাচার পুত্র" },
        { k: "boimatreyo_chacha_putro",     n: "বৈমাত্রীয় চাচার পুত্র" },
        { k: "chacha_putro_putro",          n: "চাচার পুত্রের পুত্র" },
        { k: "dada_bhai",                   n: "দাদার ভাই" },
        { k: "dada_bhai_putro",             n: "দাদার ভাইয়ের পুত্র" },
      ];
      for (const item of chain) {
        if (v(item.k) > 0) {
          asabaList.push({ name: item.n, w: 1, c: v(item.k) });
          break;
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // ধাপ ৩ — আউল / রাদ্দ সমন্বয়
  // ═══════════════════════════════════════════════════════════════
  let currentFixed = res.reduce((acc, s) => acc + (base / s.d) * s.n, 0);
  let effectiveBase = currentFixed > base ? currentFixed : base;
  let remaining     = asabaList.length > 0 ? effectiveBase - currentFixed : 0;

  // রাদ্দ: আসাবা নেই, উদ্বৃত্ত আছে — স্বামী/স্ত্রী বাদে বাকিদের মধ্যে
  if (asabaList.length === 0 && currentFixed < base) {
    const rHolders = res.filter(
      s => s.name !== "স্বামী" && !s.name.startsWith("স্ত্রী")
    );
    if (rHolders.length > 0) {
      const rTotal  = rHolders.reduce((a, s) => a + (base / s.d) * s.n, 0);
      const surplus = base - currentFixed;
      res = res.map(s => {
        if (s.name === "স্বামী" || s.name.startsWith("স্ত্রী")) return s;
        return { ...s, extra: ((base / s.d) * s.n / rTotal) * surplus };
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // ধাপ ৪ — ফাইনাল রেজাল্ট (ফুরুজ)
  // ═══════════════════════════════════════════════════════════════
  let finalRes = res.map(s => ({
    name:  s.name,
    share: `${s.n}/${s.d}${s.extraLabel || ""}${s.extra ? " + রাদ্দ" : ""}`,
    num:   (base / s.d) * s.n + (s.extra || 0),
  }));

  // আসাবা বন্টন
  if (asabaList.length > 0) {
    const totalW = asabaList.reduce((a, x) => a + x.w * x.c, 0);
    asabaList.forEach(a => {
      if (!a.c) return;
      const shareNum = (remaining / totalW) * a.w;
      // Add count to name if multiple - in Bengali
      const displayName = a.c > 1 ? `${a.name} (${toBengaliNumber(a.c)} জন)` : a.name;
      const idx = finalRes.findIndex(r => r.name === displayName);
      if (idx !== -1) {
        finalRes[idx].num += shareNum;
        if (shareNum > 0.001) finalRes[idx].share += " + অবশিষ্ট";
      } else if (shareNum > 0.001) {
        finalRes.push({
          name:  displayName,
          share: currentFixed === 0 ? "সম্পূর্ণ" : "অবশিষ্ট",
          num:   shareNum,
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // ধাপ ৫ — জাবিল আরহাম (তানযিল পদ্ধতি)
  // হানাফি: ফুরুজ বা আসাবা না থাকলে (বা শুধু স্বামী/স্ত্রী থাকলে)
  // ═══════════════════════════════════════════════════════════════
  const distributed = finalRes.reduce((a, r) => a + r.num, 0);
  const onlySpouse  = finalRes.length > 0 &&
    finalRes.every(r => r.name === "স্বামী" || r.name.startsWith("স্ত্রী"));
  const noHeirs     = finalRes.length === 0;

  if (noHeirs || onlySpouse) {
    const surplus = onlySpouse ? (effectiveBase - distributed) : effectiveBase;

    /**
     * তানযিল পদ্ধতি:
     * জাবিল আরহাম তার মৃত আত্মীয়ের (যার মাধ্যমে আসছে) অংশ পায়।
     * একই মৃত আত্মীয়ের একাধিক সন্তান থাকলে নিজেদের মধ্যে ভাগ।
     *
     * বর্গ ও তাদের "মূল আত্মীয়" (যার তানযিলে অংশ পাবে):
     *  বর্গ ১: কন্যার সন্তান → মূল: কন্যা
     *  বর্গ ২: নানা → মূল: মা
     *  বর্গ ৩: ফুফু/মামা/খালা → মূল: বাবা বা মা
     *  বর্গ ৪: বোনের সন্তান → মূল: সংশ্লিষ্ট বোন
     */

    // প্রতিটি "গ্রুপ" = একই মূল আত্মীয়ের মাধ্যমে আসা আরহামরা
    const arhamGroups = [];

    // বর্গ ১ — কন্যার সন্তান (মূল: কন্যা, শেয়ার ১/২ বা ২/৩)
    {
      const sons  = v("konna_putro");
      const daus  = v("konna_konna");
      const total = sons + daus;
      if (total > 0) {
        // মূল কন্যার অংশ যা হতো: ১টি থাকলে ১/২
        // তানযিল: পুত্র ২:১ কন্যা
        arhamGroups.push({ priority: 1, weight: base / 2, members: [
          ...(sons > 0 ? [{ name: "কন্যার পুত্র" + (sons > 1 ? ` (${sons}জন)` : ""), w: 2, c: sons }] : []),
          ...(daus > 0 ? [{ name: "কন্যার কন্যা" + (daus > 1 ? ` (${daus}জন)` : ""), w: 1, c: daus }] : []),
        ]});
      }
    }

    // বর্গ ২ — নানা (মূল: মা, শেয়ার ১/৬ বা ১/৩)
    if (waris.nana) {
      arhamGroups.push({ priority: 2, weight: base / 3, members: [
        { name: "নানা", w: 1, c: 1 },
      ]});
    }

    // বর্গ ৩ — ফুফু, মামা, খালা (মূল: বাবা বা মা)
    {
      const fufu  = v("fufu");
      const mama  = v("mama");
      const khala = v("khala");
      // ফুফু মূল: বাবার অংশ থেকে (সন্তান না থাকলে বাবা সম্পূর্ণ পেতেন)
      // সরলীকরণ: একই অগ্রাধিকারে সমান
      if (fufu + mama + khala > 0) {
        const grp = [];
        if (fufu  > 0) grp.push({ name: "ফুফু"  + (fufu  > 1 ? ` (${fufu}জন)` : ""),  w: 1, c: fufu });
        if (mama  > 0) grp.push({ name: "মামা"  + (mama  > 1 ? ` (${mama}জন)` : ""),  w: 1, c: mama });
        if (khala > 0) grp.push({ name: "খালা"  + (khala > 1 ? ` (${khala}জন)` : ""), w: 1, c: khala });
        // মোট heads
        arhamGroups.push({ priority: 3, weight: surplus, isSharedEqually: true, members: grp });
      }
    }

    // বর্গ ৪ — বোনের সন্তান
    {
      const grp = [];
      if (v("shohodor_bon_putro")    > 0) grp.push({ name: "সহোদর বোনের পুত্র",       w: 1, c: v("shohodor_bon_putro")    });
      if (v("shohodor_bon_konna")    > 0) grp.push({ name: "সহোদর বোনের কন্যা",       w: 1, c: v("shohodor_bon_konna")    });
      if (v("boimatreyo_bon_putro")  > 0) grp.push({ name: "বৈমাত্রীয় বোনের পুত্র",  w: 1, c: v("boimatreyo_bon_putro")  });
      if (v("boimatreyo_bon_konna")  > 0) grp.push({ name: "বৈমাত্রীয় বোনের কন্যা",  w: 1, c: v("boimatreyo_bon_konna")  });
      if (v("boipitreyo_bhai_konna") > 0) grp.push({ name: "বৈপিত্রীয় ভাইয়ের কন্যা", w: 1, c: v("boipitreyo_bhai_konna") });
      if (v("boipitreyo_bon_putro")  > 0) grp.push({ name: "বৈপিত্রীয় বোনের পুত্র",  w: 1, c: v("boipitreyo_bon_putro")  });
      if (v("boipitreyo_bon_konna")  > 0) grp.push({ name: "বৈপিত্রীয় বোনের কন্যা",  w: 1, c: v("boipitreyo_bon_konna")  });
      if (grp.length > 0)
        arhamGroups.push({ priority: 4, weight: surplus, isSharedEqually: true, members: grp });
    }

    // সর্বোচ্চ অগ্রাধিকারের গ্রুপ খোঁজা
    if (arhamGroups.length > 0) {
      const minPri = Math.min(...arhamGroups.map(g => g.priority));
      const active = arhamGroups.filter(g => g.priority === minPri);

      // উদ্বৃত্ত সম্পদ active গ্রুপের মধ্যে ভাগ
      const totalGroupWeight = active.reduce((a, g) => a + (g.isSharedEqually ? 1 : 1), 0);
      const perGroup = surplus / active.length;

      active.forEach(grp => {
        const totalW = grp.members.reduce((a, m) => a + m.w * m.c, 0);
        grp.members.forEach(m => {
          if (m.c > 0) {
            finalRes.push({
              name:  m.name,
              share: "জাবিল আরহাম",
              num:   (perGroup / totalW) * m.w * m.c,
            });
          }
        });
      });
    } else if (noHeirs) {
      // কোনো ওয়ারিশ নেই
      finalRes.push({ name: "বাইতুল মাল", share: "কোনো ওয়ারিশ নেই", num: effectiveBase });
    }
  }

  return { results: finalRes, effectiveBase };
};

// ══════════════════════════════════════════════════════════════════
// Largest Remainder Method
// ══════════════════════════════════════════════════════════════════
export const distributeAssets = (results, assets, effectiveBase) => {
  const toBn = n => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

  const distribute = (assetValue, nums, base, decimals = 2) => {
    const val = parseFloat(assetValue);
    if (!val || val <= 0) return nums.map(() => "০." + "০".repeat(decimals));
    const SCALE = Math.pow(10, decimals);
    const total = Math.round(val * SCALE);
    const exact   = nums.map(n => (n / base) * total);
    const floored = exact.map(Math.floor);
    const rem     = total - floored.reduce((a, b) => a + b, 0);
    exact
      .map((e, i) => ({ i, f: e - floored[i] }))
      .sort((a, b) => b.f - a.f)
      .slice(0, rem)
      .forEach(({ i }) => floored[i]++);
    return floored.map(u => toBn((u / SCALE).toFixed(decimals)));
  };

  const nums = results.map(r => r.num);
  return results.map((r, i) => ({
    ...r,
    taka:   distribute(assets.taka,   nums, effectiveBase, 2)[i],
    jomi:   distribute(assets.jomi,   nums, effectiveBase, 3)[i],
    shorno: distribute(assets.shorno, nums, effectiveBase, 3)[i],
    rupa:   distribute(assets.rupa,   nums, effectiveBase, 3)[i],
  }));
};

// ══════════════════════════════════════════════════════════════════
// ভ্যালিডেশন
// ══════════════════════════════════════════════════════════════════
export const validateInputs = (waris, assets) => {
  const errors = [];
  const hasAnyWaris = Object.entries(waris).some(([, val]) =>
    typeof val === "boolean" ? val : val > 0
  );
  if (!hasAnyWaris) errors.push("কমপক্ষে একজন ওয়ারিশ নির্বাচন করুন");

  const hasAnyAsset = Object.entries(assets).some(
    ([k, val]) => !k.endsWith("Unit") && val && parseFloat(val) > 0
  );
  if (!hasAnyAsset) errors.push("কমপক্ষে একটি সম্পদের পরিমাণ দিন");

  Object.entries(assets).forEach(([k, val]) => {
    if (!k.endsWith("Unit") && val && parseFloat(val) < 0)
      errors.push("সম্পদের পরিমাণ ঋণাত্মক হতে পারবে না");
  });

  if ((waris.stri || 0) > 4)
    errors.push("ইসলামী আইন অনুযায়ী সর্বোচ্চ ৪ জন স্ত্রী হতে পারে");

  return { isValid: errors.length === 0, errors };
};
