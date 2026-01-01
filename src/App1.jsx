import React, { useState } from "react";

const InheritanceCalculator = () => {
  // আপনার দেওয়া ধারাবাহিকতা ও সহজ ভেরিয়েবল নাম
  const [waris, setWaris] = useState({
    pita: false,
    dada: false,
    boimatreyo_bhai: 0,
    boimatreyo_bon: 0,
    shami: false,
    stri: false,
    konna: 0,
    putro_konna: 0,
    shohodor_bon: 0,
    boipitreyo_bon: 0,
    mata: false,
    dadi: false,
    nani: false,
    // অতিরিক্ত (লজিক মিলানোর জন্য প্রয়োজনীয়)
    putro: 0,
    putro_putro: 0,
    shohodor_bhai: 0,
    boipitreyo_bhai: 0,
    chacha: 0,
    shohodor_bhai_putro: 0,
    boimatreyo_bhai_putro: 0,
    chachat_bhai: 0,
    chachat_bhai_putro: 0,
    boimatreyo_chachat_bhai: 0,
    boimatreyo_chachat_bhai_putro: 0,
    boimatreyo_chacha: 0,
  });

  const [assets, setAssets] = useState({
    taka: "",
    jomi: "",
    shorno: "",
    rupa: "",
  });
  const [results, setResults] = useState([]);

  const calculate = () => {
    let res = [];

    // প্রাথমিক কন্ডিশন চেক
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

    // ১. বাবা (Pita)
    if (waris.pita) {
      if (hasMaleDescendant)
        res.push({ name: "বাবা", share: "১/৬", status: "নির্ধারিত" });
      else if (waris.konna > 0 || waris.putro_konna > 0)
        res.push({ name: "বাবা", share: "১/৬ + আসাবা", status: "মিশ্র" });
      else
        res.push({ name: "বাবা", share: "সম্পূর্ণ (আসাবা)", status: "আসাবা" });
    }

    // ২. দাদা (Dada)
    if (waris.dada) {
      if (waris.pita)
        res.push({ name: "দাদা", share: "বঞ্চিত", status: "বাবা জীবিত" });
      else if (hasMaleDescendant)
        res.push({ name: "দাদা", share: "১/৬", status: "নির্ধারিত" });
      else if (waris.konna > 0 || waris.putro_konna > 0)
        res.push({ name: "দাদা", share: "১/৬ + আসাবা", status: "মিশ্র" });
      else
        res.push({ name: "দাদা", share: "সম্পূর্ণ (আসাবা)", status: "আসাবা" });
    }

    // ৩. বৈপিত্রিয় ভাই ও বোন (Maternal Siblings)
    const totalBoipitreyo = waris.boipitreyo_bhai + waris.boipitreyo_bon;

    if (totalBoipitreyo > 0) {
      if (waris.pita || waris.dada || hasChildren) {
        res.push({
          name: "বৈপিত্রিয় ভাই/বোন",
          share: "বঞ্চিত",
          status: "পিতা, দাদা বা সন্তান জীবিত থাকায় বঞ্চিত",
        });
      } else if (totalBoipitreyo === 1) {
        res.push({
          name: "বৈপিত্রিয় ভাই/বোন",
          share: "১/৬",
          status: "নির্ধারিত (একজন)",
        });
      } else if (totalBoipitreyo >= 2) {
        res.push({
          name: "বৈপিত্রিয় ভাই/বোন",
          share: "১/৩",
          status: "নির্ধারিত (২ বা ততোধিক)",
        });
      }
    }

    // ৪. স্বামী (Shami)
    if (waris.shami) {
      res.push({
        name: "স্বামী",
        share: hasChildren ? "১/৪" : "১/২",
        status: "নির্ধারিত",
      });
    }

    // ৫. স্ত্রী (Stri)
    if (waris.stri) {
      res.push({
        name: "স্ত্রী",
        share: hasChildren ? "১/৮" : "১/৪",
        status: "নির্ধারিত",
      });
    }

    // ৬. মেয়ে (Konna)
    if (waris.konna > 0) {
      if (waris.putro > 0)
        res.push({
          name: "মেয়ে",
          share: "অবশিষ্ট (১:২)",
          status: "আসাবা বি গাইরিহি",
        });
      else
        res.push({
          name: "মেয়ে",
          share: waris.konna === 1 ? "১/২" : "২/৩",
          status: "নির্ধারিত",
        });
    }

    // ৭. ছেলের মেয়ে (Putro Konna) - ৬টি অবস্থা
    if (waris.putro_konna > 0) {
      if (waris.putro > 0) {
        res.push({
          name: "ছেলের মেয়ে",
          share: "বঞ্চিত",
          status: "পুত্র জীবিত",
        });
      } else if (waris.putro_putro > 0) {
        res.push({
          name: "ছেলের মেয়ে",
          share: "অবশিষ্ট",
          status: "আসাবা (পুত্রের পুত্রের সাথে ২:১)",
        });
      } else if (waris.konna >= 2) {
        res.push({
          name: "ছেলের মেয়ে",
          share: "বঞ্চিত",
          status: "২ বা ততোধিক কন্যা জীবিত",
        });
      } else if (waris.konna === 1) {
        res.push({
          name: "ছেলের মেয়ে",
          share: "১/৬",
          status: "তাকমিলাতুস সুলুসাইন",
        });
      } else if (waris.konna === 0 && waris.putro_konna === 1) {
        res.push({ name: "ছেলের মেয়ে", share: "১/২", status: "নির্ধারিত" });
      } else if (waris.konna === 0 && waris.putro_konna >= 2) {
        res.push({
          name: "ছেলের মেয়ে",
          share: "২/৩",
          status: "নির্ধারিত (যৌথ)",
        });
      }
    }

    // ৮. সহোদর বোন (Shohodor Bon) - ৫টি অবস্থা
    if (waris.shohodor_bon > 0) {
      if (waris.pita || waris.dada || hasMaleDescendant) {
        res.push({
          name: "সহোদর বোন",
          share: "বঞ্চিত",
          status: "পিতা, দাদা বা পুরুষ বংশধর জীবিত",
        });
      } else if (waris.shohodor_bhai > 0) {
        res.push({
          name: "সহোদর বোন",
          share: "অবশিষ্ট",
          status: "সহোদর ভাইয়ের সাথে আসাবা (২:১)",
        });
      } else if (waris.konna > 0 || waris.putro_konna > 0) {
        res.push({
          name: "সহোদর বোন",
          share: "অবশিষ্ট",
          status: "কন্যা/নাতনির উপস্থিতিতে আসাবা হয়েছে",
        });
      } else if (waris.shohodor_bon === 1) {
        res.push({
          name: "সহোদর বোন",
          share: "১/২",
          status: "নির্ধারিত",
        });
      } else if (waris.shohodor_bon >= 2) {
        res.push({
          name: "সহোদর বোন",
          share: "২/৩",
          status: "নির্ধারিত (যৌথ)",
        });
      }
    }

    // ৯. বৈমাত্রীয় বোন (Step Sister) - ছবির ৭টি অবস্থা অনুযায়ী
    if (waris.boimatreyo_bon > 0) {
      if (
        waris.putro > 0 ||
        waris.putro_putro > 0 ||
        waris.pita ||
        waris.dada ||
        waris.shohodor_bhai > 0
      ) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          share: "বঞ্চিত",
          status: "পিতা, দাদা, পুত্র বা সহোদর ভাই জীবিত",
        });
      } else if (waris.shohodor_bon >= 2 && waris.boimatreyo_bhai === 0) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          share: "বঞ্চিত",
          status: "২ বা ততোধিক সহোদর বোন জীবিত",
        });
      } else if (waris.boimatreyo_bhai > 0) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          share: "অবশিষ্ট",
          status: "বৈমাত্রীয় ভাইয়ের সাথে আসাবা",
        });
      } else if (waris.konna > 0 || waris.putro_konna > 0) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          share: "অবশিষ্ট",
          status: "কন্যা বা নাতনির উপস্থিতিতে আসাবা",
        });
      } else if (waris.shohodor_bon === 1) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          share: "১/৬",
          status: "তাকমিলাতুস সুলুসাইন (২/৩ পূর্ণ করতে)",
        });
      } else if (waris.boimatreyo_bon === 1) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          share: "১/২",
          status: "নির্ধারিত অংশ",
        });
      } else if (waris.boimatreyo_bon >= 2) {
        res.push({
          name: "বৈমাত্রীয় বোন",
          share: "২/৩",
          status: "নির্ধারিত (যৌথ)",
        });
      }
    }

    // ১০. মা (Mata) - ৩ অবস্থা
    if (waris.mata) {
      if (hasChildren || totalSiblings >= 2)
        res.push({ name: "মা", share: "১/৬", status: "নির্ধারিত" });
      else if (
        waris.pita &&
        (waris.shami || waris.stri) &&
        !hasChildren &&
        totalSiblings < 2
      )
        res.push({
          name: "মা",
          share: "বাকি অংশের ১/৩",
          status: "উমারিয়াতাইন",
        });
      else res.push({ name: "মা", share: "১/৩", status: "নির্ধারিত" });
    }

    // ১১. দাদি ও নানি (Dadi-Nani)
    if (waris.dadi) {
      res.push({
        name: "দাদি",
        share: waris.mata || waris.pita ? "বঞ্চিত" : "১/৬",
        status: "নির্ধারিত",
      });
    }
    if (waris.nani) {
      res.push({
        name: "নানি",
        share: waris.mata ? "বঞ্চিত" : "১/৬",
        status: waris.mata ? "মা জীবিত থাকায় বঞ্চিত" : "নির্ধারিত",
      });
    }

    // --- অতিরিক্ত আসাবা চেক (যদি পুত্র বা ভাই সরাসরি থাকে) ---
    if (waris.putro > 0) {
      res.push({ name: "পুত্র", share: "অবশিষ্ট", status: "আসাবা" });
    } else if (waris.putro_putro > 0 && waris.putro === 0) {
      res.push({ name: "পুত্রের পুত্র", share: "অবশিষ্ট", status: "আসাবা" });
    } else if (waris.shohodor_bhai > 0 && !hasMaleDescendant && !waris.pita) {
      res.push({ name: "সহোদর ভাই", share: "অবশিষ্ট", status: "আসাবা" });
    }

    // আসাবা চেইন নির্ধারণ (যাদের কোড বাকি ছিল)
    // আসাবা পাওয়া শুরু হবে যদি উপরের মূল আসাবারা কেউ না থাকে
    let asabaFound =
      hasMaleDescendant ||
      waris.pita ||
      waris.dada ||
      waris.shohodor_bhai > 0 ||
      waris.boimatreyo_bhai > 0;

    // যদি উপরের কেউ না থাকে তবেই নিচের ক্রমানুসারে সম্পদ যাবে
    if (!asabaFound) {
      if (waris.shohodor_bhai_putro > 0) {
        res.push({
          name: "সহোদর ভাইয়ের পুত্র",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      } else if (waris.boimatreyo_bhai_putro > 0) {
        res.push({
          name: "বৈমাত্রীয় ভাইয়ের পুত্র",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      } else if (waris.chacha > 0) {
        res.push({
          name: "সহোদর চাচা",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      } else if (waris.boimatreyo_chacha > 0) {
        res.push({
          name: "বৈমাত্রীয় চাচা",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      } else if (waris.chachat_bhai > 0) {
        res.push({
          name: "সহোদর চাচাত ভাই",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      } else if (waris.boimatreyo_chachat_bhai > 0) {
        res.push({
          name: "বৈমাত্রীয় চাচাত ভাই",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      } else if (waris.chachat_bhai_putro > 0) {
        res.push({
          name: "সহোদর চাচাত ভাইয়ের পুত্র",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      } else if (waris.boimatreyo_chachat_bhai_putro > 0) {
        res.push({
          name: "বৈমাত্রীয় চাচাত ভাইয়ের পুত্র",
          share: "অবশিষ্ট",
          status: "আসাবা হিসেবে",
        });
        asabaFound = true;
      }
    }
    setResults(res);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl border border-slate-200">
        <div className="bg-emerald-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">উত্তরাধিকার ক্যালকুলেটর</h1>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ইনপুট সেকশন আপনার ধারাবাহিকতা অনুযায়ী */}
          <div className="space-y-4">
            <h3 className="font-bold text-emerald-800 border-b pb-2">
              গ্রুপ ১: বাবা থেকে স্বামী
            </h3>
            <Checkbox
              label="বাবা"
              checked={waris.pita}
              onChange={(v) => setWaris({ ...waris, pita: v })}
            />
            <Checkbox
              label="দাদা"
              checked={waris.dada}
              onChange={(v) => setWaris({ ...waris, dada: v })}
            />
            <NumberInput
              label="বৈমাত্রিয় ভাই"
              value={waris.boimatreyo_bhai}
              onChange={(v) => setWaris({ ...waris, boimatreyo_bhai: v })}
            />
            <NumberInput
              label="বৈমাত্রিয় বোন"
              value={waris.boimatreyo_bon}
              onChange={(v) => setWaris({ ...waris, boimatreyo_bon: v })}
            />
            <Checkbox
              label="স্বামী"
              checked={waris.shami}
              disabled={waris.stri}
              onChange={(v) => setWaris({ ...waris, shami: v, stri: false })}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-emerald-800 border-b pb-2">
              গ্রুপ ২: স্ত্রী থেকে বোন
            </h3>
            <Checkbox
              label="স্ত্রী"
              checked={waris.stri}
              disabled={waris.shami}
              onChange={(v) => setWaris({ ...waris, stri: v, shami: false })}
            />
            <NumberInput
              label="মেয়ে"
              value={waris.konna}
              onChange={(v) => setWaris({ ...waris, konna: v })}
            />
            <NumberInput
              label="ছেলের মেয়ে"
              value={waris.putro_konna}
              onChange={(v) => setWaris({ ...waris, putro_konna: v })}
            />
            <NumberInput
              label="সহোদর বোন"
              value={waris.shohodor_bon}
              onChange={(v) => setWaris({ ...waris, shohodor_bon: v })}
            />
            <NumberInput
              label="বৈপিত্রিয় বোন"
              value={waris.boipitreyo_bon}
              onChange={(v) => setWaris({ ...waris, boipitreyo_bon: v })}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-emerald-800 border-b pb-2">
              গ্রুপ ৩: মা থেকে নানি
            </h3>
            <Checkbox
              label="মা"
              checked={waris.mata}
              onChange={(v) => setWaris({ ...waris, mata: v })}
            />
            <Checkbox
              label="দাদি"
              checked={waris.dadi}
              onChange={(v) => setWaris({ ...waris, dadi: v })}
            />
            <Checkbox
              label="নানি"
              checked={waris.nani}
              onChange={(v) => setWaris({ ...waris, nani: v })}
            />
            <NumberInput
              label="ছেলে"
              value={waris.putro}
              onChange={(v) => setWaris({ ...waris, putro: v })}
            />
            <NumberInput
              label="পুত্রের পুত্র (নাতি)"
              value={waris.putro_putro}
              onChange={(v) => setWaris({ ...waris, putro_putro: v })}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-emerald-800 border-b pb-2">
              গ্রুপ ৪: অন্যান্য আসাবাগণ
            </h3>
            <NumberInput
              label="সহোদর ভাই"
              value={waris.shohodor_bhai}
              onChange={(v) => setWaris({ ...waris, shohodor_bhai: v })}
            />
            <NumberInput
              label="বৈপিত্রীয় ভাই"
              value={waris.boipitreyo_bhai}
              onChange={(v) => setWaris({ ...waris, boipitreyo_bhai: v })}
            />
            <NumberInput
              label="চাচা"
              value={waris.chacha}
              onChange={(v) => setWaris({ ...waris, chacha: v })}
            />

            <NumberInput
              label="সহোদর ভাইয়ের পুত্র"
              value={waris.shohodor_bhai_putro}
              onChange={(v) => setWaris({ ...waris, shohodor_bhai_putro: v })}
            />
            <NumberInput
              label="বৈমাত্রীয় ভাইয়ের পুত্র"
              value={waris.boimatreyo_bhai_putro}
              onChange={(v) => setWaris({ ...waris, boimatreyo_bhai_putro: v })}
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-emerald-800 border-b pb-2">
              গ্রুপ ৪: দূরবর্তী আসাবাগণ
            </h3>
            <NumberInput
              label="চাচাত ভাই"
              value={waris.chachat_bhai}
              onChange={(v) => setWaris({ ...waris, chachat_bhai: v })}
            />
            <NumberInput
              label="বৈমাত্রীয় চাচা"
              value={waris.boimatreyo_chacha}
              onChange={(v) => setWaris({ ...waris, boimatreyo_chacha: v })}
            />
            <NumberInput
              label="চাচাত ভাইয়ের পুত্র"
              value={waris.chachat_bhai_putro}
              onChange={(v) => setWaris({ ...waris, chachat_bhai_putro: v })}
            />
            <NumberInput
              label="বৈমাত্রীয় চাচাত ভাই"
              value={waris.boimatreyo_chachat_bhai}
              onChange={(v) =>
                setWaris({ ...waris, boimatreyo_chachat_bhai: v })
              }
            />
            <NumberInput
              label="বৈমাত্রীয় চাচাত ভাইয়ের পুত্র"
              value={waris.boimatreyo_chachat_bhai_putro}
              onChange={(v) =>
                setWaris({ ...waris, boimatreyo_chachat_bhai_putro: v })
              }
            />
          </div>
        </div>

        <div className="p-8 border-t bg-slate-50">
          <button
            onClick={calculate}
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full h-14 text-xl shadow-lg"
          >
            হিসাব করুন
          </button>

          {results.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 shadow-md bg-white">
              <table className="table w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-4">ওয়ারিস</th>
                    <th className="p-4">অংশ</th>
                    <th className="p-4">মন্তব্য</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-emerald-50 transition-colors"
                    >
                      <td className="p-4 font-bold">{r.name}</td>
                      <td className="p-4 text-emerald-700 font-bold">
                        {r.share}
                      </td>
                      <td className="p-4 text-sm italic">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// UI Helpers
const Checkbox = ({ label, checked, onChange, disabled }) => (
  <label
    className={`flex items-center justify-between p-3 rounded-lg border border-slate-200 transition-all ${
      disabled ? "opacity-20" : "hover:bg-emerald-50 cursor-pointer"
    }`}
  >
    <span className="font-medium text-slate-700">{label}</span>
    <input
      type="checkbox"
      className="checkbox checkbox-emerald checkbox-sm"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
  </label>
);

const NumberInput = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
    <span className="font-medium text-slate-700">{label}</span>
    <input
      type="number"
      min="0"
      className="input input-bordered input-sm w-16 text-center font-bold"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
    />
  </div>
);

export default InheritanceCalculator;
