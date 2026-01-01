import React, { useState } from "react";

const InheritanceCalculator = () => {
  const [waris, setWaris] = useState({
    pita: false,
    dada: false,
    mata: false,
    dadi: false,
    nani: false,
    shami: false,
    stri: false,
    putro: 0,
    konna: 0,
    putro_putro: 0,
    putro_konna: 0,
    shohodor_bhai: 0,
    shohodor_bon: 0,
    boimatreyo_bhai: 0,
    boimatreyo_bon: 0,
    boipitreyo_bhai: 0,
    boipitreyo_bon: 0,
    chacha: 0,
    boimatreyo_chacha: 0,
    shohodor_bhai_putro: 0,
    boimatreyo_bhai_putro: 0,
    chachat_bhai: 0,
    boimatreyo_chachat_bhai: 0,
  });

  const [assets, setAssets] = useState({
    taka: "",
    jomi: "",
    shorno: "",
    rupa: "",
  });
  const [results, setResults] = useState([]);

  const bnNames = {
    pita: "বাবা",
    dada: "দাদা",
    mata: "মা",
    dadi: "দাদি",
    nani: "নানি",
    shami: "স্বামী",
    stri: "স্ত্রী",
    putro: "ছেলে",
    konna: "মেয়ে",
    putro_putro: "পুত্রের পুত্র",
    putro_konna: "পুত্রের মেয়ে",
    shohodor_bhai: "সহোদর ভাই",
    shohodor_bon: "সহোদর বোন",
    boimatreyo_bhai: "বৈমাত্রীয় ভাই",
    boimatreyo_bon: "বৈমাত্রীয় বোন",
    boipitreyo_bhai: "বৈপিত্রীয় ভাই",
    boipitreyo_bon: "বৈপিত্রীয় বোন",
    chacha: "চাচা",
    boimatreyo_chacha: "বৈমাত্রীয় চাচা",
    shohodor_bhai_putro: "সহোদর ভাইয়ের পুত্র",
    boimatreyo_bhai_putro: "বৈমাত্রীয় ভাইয়ের পুত্র",
    chachat_bhai: "চাচাত ভাই",
    boimatreyo_chachat_bhai: "বৈমাত্রীয় চাচাত ভাই",
    taka: "টাকা",
    jomi: "জমি",
    shorno: "স্বর্ণ",
    rupa: "রুপা",
  };

  const toBn = (n) =>
    n ? n.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]) : "০";

  const calculate = () => {
    let res = [];
    let base = 24;

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

    // --- ১. স্বামী বা স্ত্রী ---
    if (waris.shami) res.push({ name: "স্বামী", n: 1, d: hasChildren ? 4 : 2 });
    else if (waris.stri)
      res.push({ name: "স্ত্রী", n: 1, d: hasChildren ? 8 : 4 });

    // --- ২. মা, দাদি ও নানি (সংশোধিত বঞ্চনা নীতি) ---
    if (waris.mata) {
      res.push({
        name: "মা",
        n: 1,
        d: hasChildren || totalSiblings >= 2 ? 6 : 3,
      });
    } else {
      if (waris.nani && waris.dadi) {
        if (waris.pita) res.push({ name: "নানি", n: 1, d: 6 });
        else {
          res.push(
            { name: "নানি", n: 0.5, d: 6 },
            { name: "দাদি", n: 0.5, d: 6 }
          );
        }
      } else if (waris.nani) res.push({ name: "নানি", n: 1, d: 6 });
      else if (waris.dadi && !waris.pita)
        res.push({ name: "দাদি", n: 1, d: 6 });
    }

    // --- ৩. বাবা ও দাদা (নির্ধারিত অংশ) ---
    if (waris.pita && hasChildren) res.push({ name: "বাবা", n: 1, d: 6 });
    else if (!waris.pita && waris.dada && hasChildren)
      res.push({ name: "দাদা", n: 1, d: 6 });

    // --- ৪. কন্যা ও নাতনি ---
    if (waris.putro === 0) {
      if (waris.konna > 0)
        res.push({
          name: "মেয়ে",
          n: waris.konna === 1 ? 1 : 2,
          d: waris.konna === 1 ? 2 : 3,
        });
      if (waris.putro_konna > 0 && waris.putro_putro === 0) {
        if (waris.konna === 0)
          res.push({
            name: "পুত্রের মেয়ে",
            n: waris.putro_konna === 1 ? 1 : 2,
            d: waris.putro_konna === 1 ? 2 : 3,
          });
        else if (waris.konna === 1)
          res.push({ name: "পুত্রের মেয়ে", n: 1, d: 6 });
      }
    }

    // --- ৫. বৈপিত্রীয় ভাই/বোন ---
    if (!hasChildren && !waris.pita && !waris.dada) {
      let bpbCount = waris.boipitreyo_bhai + waris.boipitreyo_bon;
      if (bpbCount > 0)
        res.push({
          name: "বৈপিত্রীয় ভাই/বোন",
          n: 1,
          d: bpbCount === 1 ? 6 : 3,
        });
    }

    // --- ৬. আসাবা (অবশিষ্টাংশ ভোগী) লজিক ---
    let currentFixedNumerator = res.reduce(
      (acc, s) => acc + (base / s.d) * s.n,
      0
    );
    let asabaList = [];

    if (waris.putro > 0) {
      asabaList.push(
        { name: "ছেলে", w: 2, c: waris.putro },
        { name: "মেয়ে", w: 1, c: waris.konna }
      );
    } else if (waris.putro_putro > 0) {
      asabaList.push(
        { name: "পুত্রের পুত্র", w: 2, c: waris.putro_putro },
        { name: "পুত্রের মেয়ে", w: 1, c: waris.putro_konna }
      );
    } else if (waris.pita) {
      asabaList.push({ name: "বাবা", w: 1, c: 1 });
    } else if (waris.dada) {
      asabaList.push({ name: "দাদা", w: 1, c: 1 });
    } else if (
      (waris.konna > 0 || waris.putro_konna > 0) &&
      waris.shohodor_bon > 0 &&
      waris.shohodor_bhai === 0
    ) {
      asabaList.push({ name: "সহোদর বোন", w: 1, c: waris.shohodor_bon });
    } else if (!waris.pita && !waris.dada && !hasMaleDescendant) {
      if (waris.shohodor_bhai > 0) {
        asabaList.push(
          { name: "সহোদর ভাই", w: 2, c: waris.shohodor_bhai },
          { name: "সহোদর বোন", w: 1, c: waris.shohodor_bon }
        );
      } else if (waris.boimatreyo_bhai > 0) {
        asabaList.push(
          { name: "বৈমাত্রীয় ভাই", w: 2, c: waris.boimatreyo_bhai },
          { name: "বৈমাত্রীয় বোন", w: 1, c: waris.boimatreyo_bon }
        );
      } else {
        const chain = [
          { k: "shohodor_bhai_putro", n: "সহোদর ভাইয়ের পুত্র" },
          { k: "boimatreyo_bhai_putro", n: "বৈমাত্রীয় ভাইয়ের পুত্র" },
          { k: "chacha", n: "চাচা" },
          { k: "boimatreyo_chacha", n: "বৈমাত্রীয় চাচা" },
          { k: "chachat_bhai", n: "চাচাত ভাই" },
          { k: "boimatreyo_chachat_bhai", n: "বৈমাত্রীয় চাচাত ভাই" },
        ];
        for (let item of chain) {
          if (waris[item.k] > 0) {
            asabaList.push({ name: item.n, w: 1, c: waris[item.k] });
            break;
          }
        }
      }
    }

    // --- ৭. আউল ও রাদ্দ অ্যাডজাস্টমেন্ট ---
    let effectiveBase =
      currentFixedNumerator > base ? currentFixedNumerator : base;
    let remaining =
      asabaList.length > 0 ? effectiveBase - currentFixedNumerator : 0;

    if (asabaList.length === 0 && currentFixedNumerator < base) {
      let raddHolders = res.filter(
        (s) => s.name !== "স্বামী" && s.name !== "স্ত্রী"
      );
      if (raddHolders.length > 0) {
        let raddTotalNum = raddHolders.reduce(
          (acc, s) => acc + (base / s.d) * s.n,
          0
        );
        let surplus = base - currentFixedNumerator;
        res = res.map((s) => {
          if (s.name === "স্বামী" || s.name === "স্ত্রী") return s;
          return {
            ...s,
            extra: (((base / s.d) * s.n) / raddTotalNum) * surplus,
          };
        });
      }
    }

    let finalRes = res.map((s) => ({
      name: s.name,
      share: s.n + "/" + s.d + (s.extra ? " (রাদ্দ সহ)" : ""),
      num: (base / s.d) * s.n + (s.extra || 0),
    }));

    // ***********
    if (asabaList.length > 0) {
      let totalW = asabaList.reduce((acc, a) => acc + a.w * a.c, 0);
      asabaList.forEach((a) => {
        if (a.c > 0) {
          finalRes.push({
            name: a.name,
            share:
              currentFixedNumerator === 0
                ? "সম্পূর্ণ (আসাবা)"
                : "অবশিষ্ট (আসাবা)",
            num: (remaining / totalW) * a.w,
          });
        }
      });
    }

    const format = (val, shareNum) => {
      let v = parseFloat(val);
      if (!v) return "০.০০";
      return toBn(((shareNum / effectiveBase) * v).toFixed(2));
    };

    setResults(
      finalRes.map((r) => ({
        ...r,
        taka: format(assets.taka, r.num),
        jomi: format(assets.jomi, r.num),
        shorno: format(assets.shorno, r.num),
        rupa: format(assets.rupa, r.num),
      }))
    );
  };

  const hasValue = (key) => assets[key] && parseFloat(assets[key]) > 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-emerald-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["taka", "jomi", "shorno", "rupa"].map((key) => (
              <div key={key} className="bg-gray-50 p-3 rounded-xl border">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  {bnNames[key]}
                </label>
                <input
                  type="number"
                  value={assets[key]}
                  onChange={(e) =>
                    setAssets({ ...assets, [key]: e.target.value })
                  }
                  className="w-full bg-transparent font-bold outline-none"
                  placeholder="০"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {Object.keys(waris).map((key) => {
            const isActive =
              typeof waris[key] === "boolean" ? waris[key] : waris[key] > 0;
            return (
              <div
                key={key}
                onClick={() => {
                  if (key === "shami" && !waris.shami)
                    setWaris((p) => ({ ...p, shami: true, stri: false }));
                  else if (key === "stri" && !waris.stri)
                    setWaris((p) => ({ ...p, stri: true, shami: false }));
                  else
                    setWaris((p) => ({
                      ...p,
                      [key]:
                        typeof p[key] === "boolean"
                          ? !p[key]
                          : p[key] > 0
                          ? 0
                          : 1,
                    }));
                }}
                className={`p-3 h-[50px] rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isActive
                    ? "bg-emerald-50 border-emerald-600 shadow-sm"
                    : "bg-white border-gray-100"
                }`}
              >
                <span className="text-[14px] font-bold text-emerald-900 leading-tight">
                  {bnNames[key]}
                </span>
                {typeof waris[key] === "number" && isActive && (
                  <input
                    type="number"
                    value={waris[key]}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setWaris({
                        ...waris,
                        [key]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-10 border-0 bg-white/50 rounded text-center text-xs font-bold outline-none"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98]"
        >
          বন্টননামা তৈরি করুন
        </button>

        {results.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[10px] text-gray-400 uppercase tracking-widest">
                    <th className="px-4 pb-2">ওয়ারিস</th>
                    <th className="px-4 pb-2">অংশ</th>
                    {hasValue("taka") && <th className="px-4 pb-2">টাকা</th>}
                    {hasValue("jomi") && <th className="px-4 pb-2">জমি</th>}
                    {hasValue("shorno") && (
                      <th className="px-4 pb-2">স্বর্ণ</th>
                    )}
                    {hasValue("rupa") && <th className="px-4 pb-2">রুপা</th>}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {results.map((res, i) => (
                    <tr
                      key={i}
                      className="bg-gray-50/50 hover:bg-emerald-50/30 transition-colors"
                    >
                      <td className="px-4 py-4 rounded-l-xl font-bold text-emerald-700">
                        {res.name}
                      </td>
                      <td className="px-4 py-4 text-gray-500 font-medium">
                        {res.share}
                      </td>
                      {hasValue("taka") && (
                        <td className="px-4 py-4 font-mono font-bold text-gray-800">
                          {res.taka} ৳
                        </td>
                      )}
                      {hasValue("jomi") && (
                        <td className="px-4 py-4 font-bold text-gray-800">
                          {res.jomi} শ.
                        </td>
                      )}
                      {hasValue("shorno") && (
                        <td className="px-4 py-4 font-bold text-gray-800">
                          {res.shorno} ভরি
                        </td>
                      )}
                      {hasValue("rupa") && (
                        <td className="px-4 py-4 font-bold text-gray-800">
                          {res.rupa} ভরি
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="max-w-4xl mx-auto mt-12 p-6 bg-emerald-50 border-t-2 border-emerald-200 rounded-3xl">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 flex-shrink-0">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900 mb-1">
                      নির্ভরযোগ্যতা ও পরামর্শ
                    </h4>
                    <p className="text-justify text-sm text-emerald-800/70 leading-relaxed">
                      হানাফি ফারায়েজ আইনের গাণিতিক মূলনীতিতে তৈরি এই
                      ক্যালকুলেটরটি আপনাকে নির্ভুল ধারণা দিতে সক্ষম। তবে
                      পারিবারিক বা আইনি প্রয়োজনে ব্যবহারের আগে আমরা অভিজ্ঞ মুফতি
                      বা বিশেষজ্ঞের মাধ্যমে হিসাবটি একবার যাচাই করে নেওয়ার
                      পরামর্শ দিই।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InheritanceCalculator;
