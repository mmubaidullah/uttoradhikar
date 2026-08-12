import React, { useState } from "react";
import { FaFilePdf, FaPrint, FaCalculator, FaExclamationTriangle } from "react-icons/fa";
import { calculateInheritance, formatAsset, validateInputs } from "./inheritanceCalculations";
import InheritanceChart from "../components/InheritanceChart";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const [effectiveBase, setEffectiveBase] = useState(24);
  const [errors, setErrors] = useState([]);

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

  // ওয়ারিস গ্রুপিং
  const warisGroups = {
    parents: {
      title: "পিতামাতা",
      icon: "👪",
      items: ["pita", "dada", "mata", "dadi", "nani"],
    },
    spouse: {
      title: "স্বামী/স্ত্রী",
      icon: "💍",
      items: ["shami", "stri"],
    },
    children: {
      title: "সন্তান",
      icon: "👶",
      items: ["putro", "konna", "putro_putro", "putro_konna"],
    },
    siblings: {
      title: "ভাই-বোন",
      icon: "👥",
      items: [
        "shohodor_bhai",
        "shohodor_bon",
        "boimatreyo_bhai",
        "boimatreyo_bon",
        "boipitreyo_bhai",
        "boipitreyo_bon",
      ],
    },
    distant: {
      title: "দূরবর্তী",
      icon: "🌳",
      items: [
        "chacha",
        "boimatreyo_chacha",
        "shohodor_bhai_putro",
        "boimatreyo_bhai_putro",
        "chachat_bhai",
        "boimatreyo_chachat_bhai",
      ],
    },
  };

  const calculate = () => {
    setErrors([]);

    // ভ্যালিডেশন
    const validation = validateInputs(waris, assets);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // মূল হিসাব
    const { results: calculatedResults, effectiveBase: base } =
      calculateInheritance(waris);

    // সম্পদ ফরম্যাট
    const formattedResults = calculatedResults.map((r) => ({
      ...r,
      taka: formatAsset(assets.taka, r.num, base),
      jomi: formatAsset(assets.jomi, r.num, base),
      shorno: formatAsset(assets.shorno, r.num, base),
      rupa: formatAsset(assets.rupa, r.num, base),
    }));

    setResults(formattedResults);
    setEffectiveBase(base);
  };

  const hasValue = (key) => assets[key] && parseFloat(assets[key]) > 0;

  // PDF ডাউনলোড
  const downloadPDF = () => {
    const doc = new jsPDF();

    // শিরোনাম
    doc.setFontSize(18);
    doc.text("উত্তরাধিকার বন্টননামা", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text(`তারিখ: ${new Date().toLocaleDateString("bn-BD")}`, 105, 30, {
      align: "center",
    });

    // টেবিল তৈরি
    const tableData = results.map((r) => {
      const row = [r.name, r.share];
      if (hasValue("taka")) row.push(r.taka + " ৳");
      if (hasValue("jomi")) row.push(r.jomi + " শ.");
      if (hasValue("shorno")) row.push(r.shorno + " ভরি");
      if (hasValue("rupa")) row.push(r.rupa + " ভরি");
      return row;
    });

    const columns = ["ওয়ারিস", "অংশ"];
    if (hasValue("taka")) columns.push("টাকা");
    if (hasValue("jomi")) columns.push("জমি");
    if (hasValue("shorno")) columns.push("স্বর্ণ");
    if (hasValue("rupa")) columns.push("রুপা");

    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 40,
      styles: { font: "helvetica", fontSize: 10 },
      headStyles: { fillColor: [5, 150, 105] },
    });

    // ফুটনোট
    const finalY = doc.lastAutoTable.finalY || 40;
    doc.setFontSize(8);
    doc.text(
      "এই হিসাবটি হানাফি মাযহাবের ফারায়েজ আইন অনুযায়ী তৈরি।",
      105,
      finalY + 10,
      { align: "center" }
    );
    doc.text(
      "আইনি বা পারিবারিক ব্যবহারের আগে বিশেষজ্ঞের পরামর্শ নিন।",
      105,
      finalY + 15,
      { align: "center" }
    );

    doc.save("বন্টননামা.pdf");
  };

  // প্রিন্ট
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-8 md:p-12 rounded-[2rem] shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FaCalculator size={28} className="text-emerald-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                উত্তরাধিকার হিসাব করুন
              </h1>
              <p className="text-emerald-100/80 text-sm mt-1">
                হানাফি মাযহাবের ফারায়েজ আইন অনুযায়ী সম্পদ বন্টন
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 mt-6">
            <p className="text-sm text-emerald-50 leading-relaxed">
              <strong>নির্দেশনা:</strong> প্রথমে মৃত ব্যক্তির সম্পদের পরিমাণ লিখুন।
              তারপর জীবিত ওয়ারিশদের নির্বাচন করুন। সবশেষে "বন্টননামা তৈরি করুন"
              বাটনে ক্লিক করুন।
            </p>
          </div>
        </div>

        {/* এরর মেসেজ */}
        {errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6 animate-in slide-in-from-top-4">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-red-500 mt-1" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">সমস্যা পাওয়া গেছে:</h3>
                <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* সম্পদ ইনপুট */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-emerald-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            মৃত ব্যক্তির মোট সম্পদ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["taka", "jomi", "shorno", "rupa"].map((key) => (
              <div key={key} className="bg-gray-50 p-3 rounded-xl border">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  {bnNames[key]}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={assets[key]}
                  onChange={(e) =>
                    setAssets({ ...assets, [key]: e.target.value })
                  }
                  className="w-full bg-transparent font-bold outline-none text-gray-800"
                  placeholder="০"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ওয়ারিশ নির্বাচন - গ্রুপিং সহ */}
        <div className="space-y-6 mb-8">
          {Object.entries(warisGroups).map(([groupKey, group]) => (
            <div
              key={groupKey}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="text-2xl">{group.icon}</span>
                {group.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.items.map((key) => {
                  const isActive =
                    typeof waris[key] === "boolean"
                      ? waris[key]
                      : waris[key] > 0;
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
                          : "bg-white border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      <span className="text-[14px] font-bold text-emerald-900 leading-tight">
                        {bnNames[key]}
                      </span>
                      {typeof waris[key] === "number" && isActive && (
                        <input
                          type="number"
                          min="1"
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
            </div>
          ))}
        </div>

        {/* হিসাব বাটন */}
        <button
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <FaCalculator />
          বন্টননামা তৈরি করুন
        </button>

        {/* রেজাল্ট টেবিল */}
        {results.length > 0 && (
          <div className="mt-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            {/* প্রিন্ট/পিডিএফ বাটন */}
            <div className="flex gap-3 mb-6 no-print">
              <button
                onClick={downloadPDF}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <FaFilePdf /> PDF ডাউনলোড
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <FaPrint /> প্রিন্ট করুন
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[10px] text-gray-400 uppercase tracking-widest">
                    <th className="px-4 pb-2">ওয়ারিস</th>
                    <th className="px-4 pb-2">অংশ</th>
                    {hasValue("taka") && <th className="px-4 pb-2">টাকা</th>}
                    {hasValue("jomi") && <th className="px-4 pb-2">জমি</th>}
                    {hasValue("shorno") && <th className="px-4 pb-2">স্বর্ণ</th>}
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

              {/* Chart Visualization */}
              <div className="mt-8">
                <InheritanceChart results={results} />
              </div>

              {/* ডিসক্লেইমার */}
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
                      ক্যালকুলেটরটি আপনাকে নির্ভুল ধারণা দিতে সক্ষম। তবে পারিবারিক
                      বা আইনি প্রয়োজনে ব্যবহারের আগে আমরা অভিজ্ঞ মুফতি বা
                      বিশেষজ্ঞের মাধ্যমে হিসাবটি একবার যাচাই করে নেওয়ার পরামর্শ
                      দিই।
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
