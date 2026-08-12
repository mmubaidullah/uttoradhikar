/**
 * ইসলামী উত্তরাধিকার (ফারায়েজ) হিসাব করার pure function
 * হানাফি মাযহাবের মূলনীতি অনুসারে
 */

/**
 * মূল ক্যালকুলেশন ফাংশন
 * @param {Object} waris - ওয়ারিশদের অবস্থা
 * @returns {Array} - বন্টন ফলাফল
 */
export const calculateInheritance = (waris) => {
  let res = [];
  let base = 24; // LCM হিসাবের জন্য বেস

  // হেল্পার ভ্যারিয়েবল
  const hasChildren =
    waris.putro > 0 ||
    waris.konna > 0 ||
    waris.putro_putro > 0 ||
    waris.putro_konna > 0;
  
  const hasMaleDescendant = waris.putro > 0 || waris.putro_putro > 0;
  
  const totalSiblings =
    waris.shohodor_bhai +
    waris.shohodor_bon +
    waris.boimatreyo_bhai +
    waris.boimatreyo_bon +
    waris.boipitreyo_bhai +
    waris.boipitreyo_bon;

  // ============================================
  // ১. বাবা ও দাদা (জাবিল ফুরুজ হিসেবে নির্ধারিত অংশ)
  // ============================================
  if (waris.pita && hasChildren) {
    res.push({ name: "বাবা", n: 1, d: 6 });
  } else if (!waris.pita && waris.dada && hasChildren) {
    res.push({ name: "দাদা", n: 1, d: 6 });
  }

  // ============================================
  // ২. বৈপিত্রীয় ভাই/বোন (জাবিল ফুরুজ)
  // ============================================
  if (!hasChildren && !waris.pita && !waris.dada) {
    let bpbCount = waris.boipitreyo_bhai + waris.boipitreyo_bon;
    if (bpbCount > 0) {
      res.push({
        name: "বৈপিত্রীয় ভাই/বোন",
        n: 1,
        d: bpbCount === 1 ? 6 : 3,
      });
    }
  }

  // ============================================
  // ৩. স্বামী বা স্ত্রী
  // ============================================
  if (waris.shami) {
    res.push({ name: "স্বামী", n: 1, d: hasChildren ? 4 : 2 });
  } else if (waris.stri > 0) {
    // একাধিক স্ত্রীর ক্ষেত্রে সবাই মিলে ভাগ করবে
    const totalShare = hasChildren ? 8 : 4;
    const sharePerWife = totalShare * waris.stri;
    res.push({ 
      name: waris.stri > 1 ? `স্ত্রী (${waris.stri} জন)` : "স্ত্রী", 
      n: 1, 
      d: sharePerWife 
    });
  }

  // ============================================
  // ৪. কন্যা ও নাতনি (পুত্র না থাকলে)
  // ============================================
  if (waris.putro === 0) {
    // কন্যার অংশ
    if (waris.konna > 0) {
      res.push({
        name: "মেয়ে",
        n: waris.konna === 1 ? 1 : 2,
        d: waris.konna === 1 ? 2 : 3,
      });
    }
    
    // পুত্রের মেয়ে (নাতনি) - শর্ত: পুত্রের পুত্র না থাকা
    if (waris.putro_konna > 0 && waris.putro_putro === 0) {
      if (waris.konna === 0) {
        // কন্যা না থাকলে নাতনি সম্পূর্ণ অংশ পায়
        res.push({
          name: "পুত্রের মেয়ে",
          n: waris.putro_konna === 1 ? 1 : 2,
          d: waris.putro_konna === 1 ? 2 : 3,
        });
      } else if (waris.konna === 1) {
        // একটি কন্যা থাকলে নাতনি ১/৬ পায়
        res.push({ name: "পুত্রের মেয়ে", n: 1, d: 6 });
      }
      // দুই বা ততোধিক কন্যা থাকলে নাতনি বঞ্চিত হয় (যদি না আসাবা হয়)
    }
  }

  // ============================================
  // ৫. সহোদর বোন (জাবিল ফুরুজ হিসেবে)
  // ============================================
  if (
    !hasChildren &&
    !hasMaleDescendant &&
    !waris.pita &&
    !waris.dada &&
    waris.shohodor_bhai === 0
  ) {
    if (waris.shohodor_bon > 0) {
      res.push({
        name: "সহোদর বোন",
        n: waris.shohodor_bon === 1 ? 1 : 2,
        d: waris.shohodor_bon === 1 ? 2 : 3,
      });
    }
  }

  // ============================================
  // ৬. বৈমাত্রীয় বোন (জাবিল ফুরুজ হিসেবে)
  // ============================================
  if (
    !hasMaleDescendant &&
    !waris.pita &&
    !waris.dada &&
    waris.boimatreyo_bhai === 0 &&
    waris.shohodor_bhai === 0 &&
    waris.konna === 0 &&
    waris.putro_konna === 0
  ) {
    // সহোদর বোন না থাকলে
    if (waris.shohodor_bon === 0) {
      if (waris.boimatreyo_bon > 0) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          n: waris.boimatreyo_bon === 1 ? 1 : 2,
          d: waris.boimatreyo_bon === 1 ? 2 : 3,
        });
      }
    }
    // একজন মাত্র সহোদর বোন থাকলে (সে ১/২ পাওয়ার পর এরা ১/৬ পাবে)
    else if (waris.shohodor_bon === 1 && waris.boimatreyo_bon > 0) {
      res.push({
        name: "বৈমাত্রীয় বোন",
        n: 1,
        d: 6,
      });
    }
  }

  // ============================================
  // ৭. মা (তিনটি অবস্থা)
  // ============================================
  if (waris.mata) {
    let n = 1,
      d = 6;
    let label = "";

    // সন্তান না থাকলে এবং ভাই-বোন ২ জনের কম থাকলে
    if (!hasChildren && totalSiblings < 2) {
      // গারাভাইন মাসআলা (উমারিয়া) - স্বামী/স্ত্রী ও পিতা থাকলে
      if (waris.pita && (waris.shami || waris.stri > 0)) {
        n = 1;
        d = waris.shami ? 6 : 4;
        label = " (অবশিষ্টাংশের ১/৩)";
      } else {
        // সাধারণভাবে ১/৩
        n = 1;
        d = 3;
      }
    }

    res.push({
      name: "মা",
      n,
      d,
      extraLabel: label,
    });
  }

  // ============================================
  // ৮. নানি ও দাদি (১/৬ ভাগ করে)
  // ============================================
  if (waris.nani && !waris.mata) {
    if (waris.dadi && !waris.pita) {
      // দাদিও আছে এবং বাবা নেই, তাই দুজনে মিলে ১/৬ (১/১২ করে)
      res.push({ name: "নানি", n: 0.5, d: 6 });
    } else {
      // নানি একাই ১/৬
      res.push({ name: "নানি", n: 1, d: 6 });
    }
  }

  if (waris.dadi && !waris.mata && !waris.pita) {
    if (waris.nani) {
      // নানিও আছে, তাই দুজনে মিলে ১/৬ (১/১২ করে)
      res.push({ name: "দাদি", n: 0.5, d: 6 });
    } else {
      // দাদি একাই ১/৬
      res.push({ name: "দাদি", n: 1, d: 6 });
    }
  }

  // ============================================
  // ৯. আসাবা (অবশিষ্টাংশ ভোগী) নির্ধারণ
  // ============================================
  let currentFixedNumerator = res.reduce(
    (acc, s) => acc + (base / s.d) * s.n,
    0
  );
  let asabaList = [];

  // আসাবা নির্বাচনের ক্রম:
  // ১. ছেলে (মেয়েও আসাবা হয়ে যায় ২:১ অনুপাতে)
  if (waris.putro > 0) {
    asabaList.push({ name: "ছেলে", w: 2, c: waris.putro });
    if (waris.konna > 0) {
      asabaList.push({ name: "মেয়ে", w: 1, c: waris.konna });
    }
  }
  // ২. পুত্রের পুত্র (নাতি)
  else if (waris.putro_putro > 0) {
    asabaList.push({ name: "পুত্রের পুত্র", w: 2, c: waris.putro_putro });
    if (waris.putro_konna > 0) {
      asabaList.push({ name: "পুত্রের মেয়ে", w: 1, c: waris.putro_konna });
    }
  }
  // ৩. বাবা (আসাবা হিসেবে অবশিষ্ট পায়)
  else if (waris.pita) {
    asabaList.push({ name: "বাবা", w: 1, c: 1 });
  }
  // ৪. দাদা
  else if (waris.dada) {
    asabaList.push({ name: "দাদা", w: 1, c: 1 });
  }
  // ৫. কন্যা ও সহোদর বোন একসাথে (বোন আসাবা হয়ে যায়)
  else if (
    (waris.konna > 0 || waris.putro_konna > 0) &&
    waris.shohodor_bon > 0 &&
    waris.shohodor_bhai === 0 &&
    waris.putro === 0 &&
    waris.putro_putro === 0
  ) {
    asabaList.push({ name: "সহোদর বোন", w: 1, c: waris.shohodor_bon });
  }
  // ৬. সহোদর ভাই-বোন
  else if (!waris.pita && !waris.dada && !hasMaleDescendant) {
    if (waris.shohodor_bhai > 0) {
      asabaList.push({ name: "সহোদর ভাই", w: 2, c: waris.shohodor_bhai });
      if (waris.shohodor_bon > 0) {
        asabaList.push({ name: "সহোদর বোন", w: 1, c: waris.shohodor_bon });
      }
    }
    // ৭. বৈমাত্রীয় ভাই-বোন
    else if (waris.boimatreyo_bhai > 0) {
      asabaList.push({ name: "বৈমাত্রীয় ভাই", w: 2, c: waris.boimatreyo_bhai });
      if (waris.boimatreyo_bon > 0) {
        asabaList.push({ name: "বৈমাত্রীয় বোন", w: 1, c: waris.boimatreyo_bon });
      }
    }
    // ৮. দূরবর্তী আসাবা (চেইন অনুযায়ী)
    else {
      const asabaChain = [
        { k: "shohodor_bhai_putro", n: "সহোদর ভাইয়ের পুত্র" },
        { k: "boimatreyo_bhai_putro", n: "বৈমাত্রীয় ভাইয়ের পুত্র" },
        { k: "chacha", n: "চাচা" },
        { k: "boimatreyo_chacha", n: "বৈমাত্রীয় চাচা" },
        { k: "chachat_bhai", n: "চাচাত ভাই" },
        { k: "boimatreyo_chachat_bhai", n: "বৈমাত্রীয় চাচাত ভাই" },
      ];
      
      for (let item of asabaChain) {
        if (waris[item.k] > 0) {
          asabaList.push({ name: item.n, w: 1, c: waris[item.k] });
          break;
        }
      }
    }
  }

  // ============================================
  // ১০. আউল ও রাদ্দ (Awl & Radd) সমন্বয়
  // ============================================
  let effectiveBase =
    currentFixedNumerator > base ? currentFixedNumerator : base;
  let remaining =
    asabaList.length > 0 ? effectiveBase - currentFixedNumerator : 0;

  // রাদ্দ: আসাবা নেই এবং সম্পদ উদ্বৃত্ত থাকলে
  if (asabaList.length === 0 && currentFixedNumerator < base) {
    let raddHolders = res.filter(
      (s) => s.name !== "স্বামী" && !s.name.startsWith("স্ত্রী")
    );
    
    if (raddHolders.length > 0) {
      let raddTotalNum = raddHolders.reduce(
        (acc, s) => acc + (base / s.d) * s.n,
        0
      );
      let surplus = base - currentFixedNumerator;
      
      res = res.map((s) => {
        if (s.name === "স্বামী" || s.name.startsWith("স্ত্রী")) return s;
        return {
          ...s,
          extra: (((base / s.d) * s.n) / raddTotalNum) * surplus,
        };
      });
    }
  }

  // ============================================
  // ১১. ফাইনাল রেজাল্ট তৈরি
  // ============================================
  let finalRes = res.map((s) => ({
    name: s.name,
    share:
      s.n + "/" + s.d + (s.extraLabel || "") + (s.extra ? " (রাদ্দ সহ)" : ""),
    num: (base / s.d) * s.n + (s.extra || 0),
  }));

  // ============================================
  // ১২. আসাবা বন্টন ও ডুপ্লিকেট রোধ
  // ============================================
  if (asabaList.length > 0) {
    let totalW = asabaList.reduce((acc, a) => acc + a.w * a.c, 0);

    asabaList.forEach((a) => {
      if (a.c > 0) {
        let asabaNum = (remaining / totalW) * a.w;

        // চেক: এই নাম কি আগে থেকেই তালিকায় আছে?
        let existingIdx = finalRes.findIndex((r) => r.name === a.name);

        if (existingIdx !== -1) {
          // জাবিল ফুরুজ + আসাবা একসাথে
          finalRes[existingIdx].num += asabaNum;
          if (asabaNum > 0.001) {
            finalRes[existingIdx].share += " + অবশিষ্ট (আসাবা)";
          }
        } else if (asabaNum > 0.001) {
          // নতুন এন্ট্রি
          finalRes.push({
            name: a.name,
            share:
              currentFixedNumerator === 0
                ? "সম্পূর্ণ (আসাবা)"
                : "অবশিষ্ট (আসাবা)",
            num: asabaNum,
          });
        }
      }
    });
  }

  return { results: finalRes, effectiveBase };
};

/**
 * সম্পদ ফরম্যাট করা
 * @param {string} assetValue - সম্পদের মূল্য
 * @param {number} shareNum - অংশের সংখ্যা
 * @param {number} effectiveBase - ইফেক্টিভ বেস
 * @returns {string} - ফরম্যাট করা মূল্য
 */
export const formatAsset = (assetValue, shareNum, effectiveBase) => {
  const toBengaliNumber = (n) =>
    n ? n.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]) : "০";

  let v = parseFloat(assetValue);
  if (!v) return "০.০০";
  return toBengaliNumber(((shareNum / effectiveBase) * v).toFixed(2));
};

/**
 * ইনপুট ভ্যালিডেশন
 * @param {Object} waris - ওয়ারিশদের অবস্থা
 * @param {Object} assets - সম্পদের তালিকা
 * @returns {Object} - { isValid, errors }
 */
export const validateInputs = (waris, assets) => {
  const errors = [];

  // কমপক্ষে একজন ওয়ারিশ থাকতে হবে
  const hasAnyWaris = Object.entries(waris).some(([key, value]) => {
    if (typeof value === "boolean") return value;
    return value > 0;
  });

  if (!hasAnyWaris) {
    errors.push("কমপক্ষে একজন ওয়ারিশ নির্বাচন করুন");
  }

  // কমপক্ষে একটি সম্পদ থাকতে হবে
  const hasAnyAsset = Object.values(assets).some(
    (val) => val && parseFloat(val) > 0
  );

  if (!hasAnyAsset) {
    errors.push("কমপক্ষে একটি সম্পদের মূল্য দিন");
  }

  // নেগেটিভ সম্পদ চেক
  Object.entries(assets).forEach(([key, value]) => {
    if (value && parseFloat(value) < 0) {
      errors.push(`${key} এর মূল্য ঋণাত্মক হতে পারবে না`);
    }
  });

  // স্ত্রী সর্বোচ্চ ৪ জন
  if (waris.stri > 4) {
    errors.push("ইসলামী আইন অনুযায়ী সর্বোচ্চ ৪ জন স্ত্রী হতে পারে");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
