import { useState } from "react";
import { FaFilePdf, FaPrint, FaCalculator, FaExclamationTriangle, FaUsers, FaRing, FaChild, FaUserFriends, FaSitemap, FaChevronDown } from "react-icons/fa";
import { calculateInheritance, formatAsset, validateInputs } from "./inheritanceCalculations";
import InheritanceChart from "../components/InheritanceChart";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InheritanceCalculator = () => {
  const [waris, setWaris] = useState({
    pita: false, dada: false, mata: false, dadi: false, nani: false,
    shami: false, stri: 0,
    putro: 0, konna: 0, putro_putro: 0, putro_konna: 0,
    shohodor_bhai: 0, shohodor_bon: 0,
    boimatreyo_bhai: 0, boimatreyo_bon: 0,
    boipitreyo_bhai: 0, boipitreyo_bon: 0,
    chacha: 0, boimatreyo_chacha: 0,
    shohodor_bhai_putro: 0, boimatreyo_bhai_putro: 0,
    chachat_bhai: 0, boimatreyo_chachat_bhai: 0,
  });

  const [assets, setAssets] = useState({ taka: "", jomi: "", shorno: "", rupa: "" });
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const [openGroups, setOpenGroups] = useState({ parents: true, spouse: true, children: true, siblings: false, distant: false });

  const bnNames = {
    pita: "পিতা", dada: "দাদা", mata: "মাতা", dadi: "দাদি", nani: "নানি",
    shami: "স্বামী", stri: "স্ত্রী",
    putro: "পুত্র", konna: "কন্যা", putro_putro: "পুত্রের পুত্র", putro_konna: "পুত্রের কন্যা",
    shohodor_bhai: "সহোদর ভাই", shohodor_bon: "সহোদর বোন",
    boimatreyo_bhai: "বৈমাত্রীয় ভাই", boimatreyo_bon: "বৈমাত্রীয় বোন",
    boipitreyo_bhai: "বৈপিত্রীয় ভাই", boipitreyo_bon: "বৈপিত্রীয় বোন",
    chacha: "চাচা", boimatreyo_chacha: "বৈমাত্রীয় চাচা",
    shohodor_bhai_putro: "সহোদর ভাইয়ের পুত্র", boimatreyo_bhai_putro: "বৈমাত্রীয় ভাইয়ের পুত্র",
    chachat_bhai: "চাচাতো ভাই", boimatreyo_chachat_bhai: "বৈমাত্রীয় চাচাতো ভাই",
    taka: "নগদ টাকা", jomi: "জমি (শতাংশ)", shorno: "স্বর্ণ (ভরি)", rupa: "রুপা (ভরি)",
  };

  const groups = [
    { key: "parents",  label: "পিতামাতা ও দাদা-দাদি",  icon: FaUsers,       items: ["pita","dada","mata","dadi","nani"] },
    { key: "spouse",   label: "স্বামী / স্ত্রী",          icon: FaRing,        items: ["shami","stri"] },
    { key: "children", label: "সন্তান",                   icon: FaChild,       items: ["putro","konna","putro_putro","putro_konna"] },
    { key: "siblings", label: "ভাই-বোন",                  icon: FaUserFriends, items: ["shohodor_bhai","shohodor_bon","boimatreyo_bhai","boimatreyo_bon","boipitreyo_bhai","boipitreyo_bon"] },
    { key: "distant",  label: "দূরবর্তী আত্মীয়",          icon: FaSitemap,     items: ["chacha","boimatreyo_chacha","shohodor_bhai_putro","boimatreyo_bhai_putro","chachat_bhai","boimatreyo_chachat_bhai"] },
  ];

  const toggle = (key) => {
    if (typeof waris[key] === "boolean") {
      if (key === "shami") setWaris(p => ({ ...p, shami: !p.shami, stri: p.shami ? p.stri : 0 }));
      else setWaris(p => ({ ...p, [key]: !p[key] }));
    } else {
      if (key === "stri" && waris.stri === 0) setWaris(p => ({ ...p, stri: 1, shami: false }));
      else if (key === "shami" && !waris.shami) setWaris(p => ({ ...p, shami: true, stri: 0 }));
      else setWaris(p => ({ ...p, [key]: p[key] > 0 ? 0 : 1 }));
    }
  };

  const adjust = (key, delta) => {
    const max = key === "stri" ? 4 : 20;
    setWaris(p => {
      const v = Math.max(1, Math.min(max, p[key] + delta));
      return { ...p, [key]: v };
    });
  };

  const calculate = () => {
    setErrors([]);
    const v = validateInputs(waris, assets);
    if (!v.isValid) { setErrors(v.errors); return; }
    const { results: r, effectiveBase: base } = calculateInheritance(waris);
    setResults(r.map(x => ({
      ...x,
      taka:   formatAsset(assets.taka,   x.num, base),
      jomi:   formatAsset(assets.jomi,   x.num, base),
      shorno: formatAsset(assets.shorno, x.num, base),
      rupa:   formatAsset(assets.rupa,   x.num, base),
    })));
  };

  const hasVal = (k) => assets[k] && parseFloat(assets[k]) > 0;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("উত্তরাধিকার বন্টননামা", 105, 20, { align: "center" });
    doc.setFontSize(9);
    doc.text(`তারিখ: ${new Date().toLocaleDateString("bn-BD")}`, 105, 28, { align: "center" });
    const cols = ["ওয়ারিশ", "অংশ"];
    if (hasVal("taka"))   cols.push("টাকা");
    if (hasVal("jomi"))   cols.push("জমি");
    if (hasVal("shorno")) cols.push("স্বর্ণ");
    if (hasVal("rupa"))   cols.push("রুপা");
    doc.autoTable({
      head: [cols],
      body: results.map(r => {
        const row = [r.name, r.share];
        if (hasVal("taka"))   row.push(r.taka + " ৳");
        if (hasVal("jomi"))   row.push(r.jomi + " শ.");
        if (hasVal("shorno")) row.push(r.shorno + " ভরি");
        if (hasVal("rupa"))   row.push(r.rupa + " ভরি");
        return row;
      }),
      startY: 35,
      headStyles: { fillColor: [26, 71, 49] },
    });
    const y = doc.lastAutoTable.finalY || 40;
    doc.setFontSize(8);
    doc.text("এই হিসাব হানাফি মাযহাবের ফারায়েজ আইন অনুযায়ী। আইনি ব্যবহারের আগে বিশেষজ্ঞের পরামর্শ নিন।", 105, y + 12, { align: "center" });
    doc.save("বন্টননামা.pdf");
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#1a4731]/60 text-sm mb-2">
            <span>হোম</span>
            <span>/</span>
            <span className="text-[#1a4731] font-medium">ক্যালকুলেটর</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a4731]">উত্তরাধিকার হিসাবক</h1>
          <p className="text-gray-600 mt-1.5">হানাফি মাযহাবের ফারায়েজ বিধান অনুযায়ী সম্পদ বন্টন</p>
        </div>

        {/* Notice bar */}
        <div className="flex items-start gap-3 bg-[#1a4731]/5 border border-[#1a4731]/15 rounded-lg px-4 py-3 mb-8 text-sm text-[#1a4731]">
          <FaCalculator className="mt-0.5 flex-shrink-0" size={14} />
          <span>
            প্রথমে সম্পদের পরিমাণ লিখুন, তারপর ওয়ারিশ নির্বাচন করুন এবং হিসাব করুন।
            ফলাফল পরিবারিক বা আইনি ব্যবহারের আগে আলেমের পরামর্শ নিন।
          </span>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
            <FaExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Waris Selection */}
          <div className="lg:col-span-2 space-y-4">

            {groups.map(({ key, label, icon: Icon, items }) => {
              const isOpen = openGroups[key];
              const activeCount = items.filter(k => typeof waris[k] === "boolean" ? waris[k] : waris[k] > 0).length;
              return (
                <div key={key} className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenGroups(p => ({ ...p, [key]: !p[key] }))}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1a4731]/8 rounded-lg flex items-center justify-center">
                        <Icon className="text-[#1a4731]" size={14} />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{label}</span>
                      {activeCount > 0 && (
                        <span className="bg-[#1a4731] text-white text-xs px-2 py-0.5 rounded-full">
                          {activeCount}
                        </span>
                      )}
                    </div>
                    <FaChevronDown
                      size={12}
                      className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#e2ddd5] px-5 py-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {items.map(k => {
                          const isNum = typeof waris[k] === "number";
                          const active = isNum ? waris[k] > 0 : waris[k];
                          const max = k === "stri" ? 4 : 20;
                          return (
                            <div
                              key={k}
                              onClick={() => toggle(k)}
                              className={`
                                relative rounded-lg border cursor-pointer transition-all select-none
                                ${active
                                  ? "border-[#1a4731] bg-[#1a4731]/5"
                                  : "border-[#e2ddd5] bg-white hover:border-[#1a4731]/40"}
                              `}
                            >
                              {/* active indicator */}
                              {active && (
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#1a4731]" />
                              )}

                              <div className="px-3 py-2.5">
                                <span className={`text-sm font-medium block ${active ? "text-[#1a4731]" : "text-gray-700"}`}>
                                  {bnNames[k]}
                                </span>

                                {/* Counter - only when active and numeric */}
                                {isNum && active && (
                                  <div
                                    className="flex items-center gap-1.5 mt-2"
                                    onClick={e => e.stopPropagation()}
                                  >
                                    <button
                                      onClick={() => adjust(k, -1)}
                                      className="w-6 h-6 rounded border border-[#e2ddd5] bg-white text-gray-600 hover:bg-gray-50 text-sm font-bold leading-none flex items-center justify-center"
                                    >−</button>
                                    <input
                                      type="number"
                                      min={1}
                                      max={max}
                                      value={waris[k]}
                                      onFocus={e => e.target.select()}
                                      onChange={e => {
                                        const v = parseInt(e.target.value) || 1;
                                        setWaris(p => ({ ...p, [k]: Math.min(max, Math.max(1, v)) }));
                                      }}
                                      className="w-10 h-6 border border-[#e2ddd5] rounded text-center text-sm font-semibold text-[#1a4731] bg-white outline-none focus:border-[#1a4731]"
                                    />
                                    <button
                                      onClick={() => waris[k] < max && adjust(k, 1)}
                                      disabled={waris[k] >= max}
                                      className={`w-6 h-6 rounded border text-sm font-bold leading-none flex items-center justify-center
                                        ${waris[k] >= max
                                          ? "border-gray-200 bg-gray-50 text-gray-300"
                                          : "border-[#e2ddd5] bg-white text-gray-600 hover:bg-gray-50"}`}
                                    >+</button>
                                    {k === "stri" && (
                                      <span className="text-[10px] text-gray-400 ml-0.5">সর্বোচ্চ ৪</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Assets + Calculate */}
          <div className="space-y-4">

            {/* Asset Inputs */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-[#e2ddd5]">
                মৃত ব্যক্তির সম্পদ
              </h2>
              <div className="space-y-3">
                {["taka","jomi","shorno","rupa"].map(k => (
                  <div key={k}>
                    <label className="block text-xs text-gray-500 mb-1">{bnNames[k]}</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={assets[k]}
                      onChange={e => setAssets({ ...assets, [k]: e.target.value })}
                      placeholder="০"
                      className="w-full px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731] text-gray-900 font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculate}
              className="w-full bg-[#1a4731] hover:bg-[#2d6a4f] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FaCalculator size={14} />
              বন্টন হিসাব করুন
            </button>

            {/* Quick note */}
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              কমপক্ষে একটি সম্পদ ও একজন ওয়ারিশ দিন
            </p>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">

            {/* Result header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#1a4731] text-white">
              <h2 className="font-semibold">বন্টন ফলাফল</h2>
              <div className="flex gap-2 no-print">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  <FaFilePdf size={12} /> PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  <FaPrint size={12} /> প্রিন্ট
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e2ddd5] bg-[#f7f5f0]">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ওয়ারিশ</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">শরঈ অংশ</th>
                    {hasVal("taka")   && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">টাকা (৳)</th>}
                    {hasVal("jomi")   && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">জমি</th>}
                    {hasVal("shorno") && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">স্বর্ণ</th>}
                    {hasVal("rupa")   && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">রুপা</th>}
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b border-[#e2ddd5]/60 hover:bg-[#f7f5f0] transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#1a4731]">{r.name}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs font-mono">{r.share}</td>
                      {hasVal("taka")   && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{r.taka}</td>}
                      {hasVal("jomi")   && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{r.jomi}</td>}
                      {hasVal("shorno") && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{r.shorno}</td>}
                      {hasVal("rupa")   && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{r.rupa}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart */}
            <div className="px-6 pb-6 pt-2 border-t border-[#e2ddd5]">
              <InheritanceChart results={results} />
            </div>

            {/* Disclaimer */}
            <div className="mx-6 mb-6 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800 leading-relaxed">
              <strong>দ্রষ্টব্য:</strong> এই হিসাব হানাফি মাযহাবের ফারায়েজ বিধান অনুযায়ী করা হয়েছে।
              পারিবারিক বা আইনি ক্ষেত্রে ব্যবহারের আগে বিশেষজ্ঞ আলেম বা মুফতির পরামর্শ নেওয়া আবশ্যক।
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InheritanceCalculator;
