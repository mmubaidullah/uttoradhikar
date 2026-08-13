import { useState, useRef, useEffect } from "react";
import { FaPrint, FaCalculator, FaExclamationTriangle, FaUsers, FaRing, FaChild, FaUserFriends, FaSitemap, FaChevronDown, FaHeart } from "react-icons/fa";
import { calculateInheritance, distributeAssets, validateInputs } from "./inheritanceCalculations";
import InheritanceChart from "../components/InheritanceChart";

/* ── Bengali Number Converter ─────────────────────────────────────── */
const toBengaliNumber = (num) => {
  if (num === null || num === undefined || num === '') return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

const toEnglishNumber = (str) => {
  if (!str) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(str).replace(/[০-৯]/g, (digit) => bengaliDigits.indexOf(digit).toString());
};

/* ── Custom Unit Dropdown ─────────────────────────────────────────── */
const UnitSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // বাইরে click করলে বন্ধ হবে
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-28 flex-shrink-0">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-1 px-3 py-2 text-xs font-medium border border-[#e2ddd5] rounded-lg bg-[#fafaf8] text-gray-700 hover:border-[#1a4731] transition-colors"
      >
        <span className="truncate">{value}</span>
        <FaChevronDown
          size={9}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#e2ddd5] rounded-lg shadow-md z-20 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                opt === value
                  ? "bg-[#1a4731] text-white font-medium"
                  : "text-gray-700 hover:bg-[#f0f5f2]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const InheritanceCalculator = () => {
  const [waris, setWaris] = useState({
    // পিতামাতা ও দাদা-দাদি
    pita: false, dada: false, mata: false, dadi: false, nani: false,
    // স্বামী/স্ত্রী
    shami: false, stri: 0,
    // সন্তান ও নিম্নস্তর
    putro: 0, konna: 0,
    putro_putro: 0, putro_konna: 0,
    putro_putro_putro: 0, putro_putro_konna: 0,
    // ভাই-বোন
    shohodor_bhai: 0, shohodor_bon: 0,
    boimatreyo_bhai: 0, boimatreyo_bon: 0,
    boipitreyo_bhai: 0, boipitreyo_bon: 0,
    // ভাইয়ের বংশধর (আসাবা)
    shohodor_bhai_putro: 0, shohodor_bhai_putro_putro: 0,
    boimatreyo_bhai_putro: 0, boimatreyo_bhai_putro_putro: 0,
    // চাচা ও বংশধর (আসাবা)
    chacha: 0, boimatreyo_chacha: 0,
    chacha_putro: 0, boimatreyo_chacha_putro: 0,
    chacha_putro_putro: 0,
    // দাদার ভাই (আসাবা)
    dada_bhai: 0, dada_bhai_putro: 0,
    // জাবিল আরহাম
    konna_putro: 0, konna_konna: 0,
    nana: false,
    fufu: 0, mama: 0, khala: 0,
    shohodor_bon_putro: 0, shohodor_bon_konna: 0,
    boimatreyo_bon_putro: 0, boimatreyo_bon_konna: 0,
    boipitreyo_bhai_konna: 0,
    boipitreyo_bon_putro: 0, boipitreyo_bon_konna: 0,
  });

  const [assets, setAssets] = useState({
    taka: "",
    jomi: "", jomiUnit: "শতাংশ",
    shorno: "", shornoUnit: "ভরি",
    rupa: "",   rupaUnit: "ভরি",
  });

  const jomiUnits   = ["শতাংশ", "কাঠা", "বিঘা", "হাজারাংশ", "অযুতাংশ", "একর", "বর্গফুট", "বর্গমিটার"];
  const shornoUnits = ["ভরি", "আনা", "রতি", "গ্রাম", "তোলা"];
  const rupaUnits   = ["ভরি", "গ্রাম", "কেজি", "তোলা"];
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const [openGroups, setOpenGroups] = useState({ parents: true, spouse: true, children: true, siblings: false, asaba: false, arham: false });

  const bnNames = {
    // পিতামাতা
    pita: "পিতা", dada: "দাদা", mata: "মাতা", dadi: "দাদি", nani: "নানি",
    // স্বামী/স্ত্রী
    shami: "স্বামী", stri: "স্ত্রী",
    // সন্তান
    putro: "পুত্র", konna: "কন্যা",
    putro_putro: "পুত্রের পুত্র", putro_konna: "পুত্রের কন্যা",
    putro_putro_putro: "পুত্রের পুত্রের পুত্র", putro_putro_konna: "পুত্রের পুত্রের কন্যা",
    // ভাই-বোন
    shohodor_bhai: "সহোদর ভাই", shohodor_bon: "সহোদর বোন",
    boimatreyo_bhai: "বৈমাত্রীয় ভাই", boimatreyo_bon: "বৈমাত্রীয় বোন",
    boipitreyo_bhai: "বৈপিত্রীয় ভাই", boipitreyo_bon: "বৈপিত্রীয় বোন",
    // দূরবর্তী আসাবা
    shohodor_bhai_putro: "সহোদর ভাইয়ের পুত্র",
    shohodor_bhai_putro_putro: "সহোদর ভাইয়ের পুত্রের পুত্র",
    boimatreyo_bhai_putro: "বৈমাত্রীয় ভাইয়ের পুত্র",
    boimatreyo_bhai_putro_putro: "বৈমাত্রীয় ভাইয়ের পুত্রের পুত্র",
    chacha: "চাচা (সহোদর)", boimatreyo_chacha: "চাচা (বৈমাত্রীয়)",
    chacha_putro: "চাচার পুত্র", boimatreyo_chacha_putro: "বৈমাত্রীয় চাচার পুত্র",
    chacha_putro_putro: "চাচার পুত্রের পুত্র",
    dada_bhai: "দাদার ভাই", dada_bhai_putro: "দাদার ভাইয়ের পুত্র",
    // জাবিল আরহাম
    konna_putro: "কন্যার পুত্র", konna_konna: "কন্যার কন্যা",
    nana: "নানা",
    fufu: "ফুফু", mama: "মামা", khala: "খালা",
    shohodor_bon_putro: "সহোদর বোনের পুত্র", shohodor_bon_konna: "সহোদর বোনের কন্যা",
    boimatreyo_bon_putro: "বৈমাত্রীয় বোনের পুত্র", boimatreyo_bon_konna: "বৈমাত্রীয় বোনের কন্যা",
    boipitreyo_bhai_konna: "বৈপিত্রীয় ভাইয়ের কন্যা",
    boipitreyo_bon_putro: "বৈপিত্রীয় বোনের পুত্র", boipitreyo_bon_konna: "বৈপিত্রীয় বোনের কন্যা",
  };

  const groups = [
    { key: "parents",  label: "পিতামাতা ও দাদা-দাদি",  icon: FaUsers,       items: ["pita","dada","mata","dadi","nani"] },
    { key: "spouse",   label: "স্বামী / স্ত্রী",          icon: FaRing,        items: ["shami","stri"] },
    { key: "children", label: "সন্তান ও নিম্নস্তর",       icon: FaChild,       items: ["putro","konna","putro_putro","putro_konna","putro_putro_putro","putro_putro_konna"] },
    { key: "siblings", label: "ভাই-বোন",                  icon: FaUserFriends, items: ["shohodor_bhai","shohodor_bon","boimatreyo_bhai","boimatreyo_bon","boipitreyo_bhai","boipitreyo_bon"] },
    { key: "asaba",    label: "দূরবর্তী আসাবা",           icon: FaSitemap,     items: ["shohodor_bhai_putro","shohodor_bhai_putro_putro","boimatreyo_bhai_putro","boimatreyo_bhai_putro_putro","chacha","boimatreyo_chacha","chacha_putro","boimatreyo_chacha_putro","chacha_putro_putro","dada_bhai","dada_bhai_putro"] },
    { key: "arham",    label: "জাবিল আরহাম",              icon: FaHeart,       items: ["konna_putro","konna_konna","nana","fufu","mama","khala","shohodor_bon_putro","shohodor_bon_konna","boimatreyo_bon_putro","boimatreyo_bon_konna","boipitreyo_bhai_konna","boipitreyo_bon_putro","boipitreyo_bon_konna"] },
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
    setResults(distributeAssets(r, assets, base));
  };

  const hasVal = (k) => assets[k] && parseFloat(assets[k]) > 0;

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 px-4 print:py-2">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-8 print:mb-2">
          <div className="flex items-center gap-2 text-[#1a4731]/60 text-sm mb-2 print:hidden">
            <span>হোম</span>
            <span>/</span>
            <span className="text-[#1a4731] font-medium">ক্যালকুলেটর</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a4731] print:text-2xl print:text-center">উত্তরাধিকার ক্যালকুলেটর</h1>
          <p className="text-gray-600 mt-1.5 print:text-sm print:text-center">হানাফি মাযহাবের ফারায়েজ বিধান অনুযায়ী সম্পদ বন্টন</p>
        </div>

        {/* Notice bar */}
        <div className="flex items-start gap-3 bg-[#1a4731]/5 border border-[#1a4731]/15 rounded-lg px-4 py-3 mb-8 text-sm text-[#1a4731] print:hidden">
          <FaCalculator className="mt-0.5 flex-shrink-0" size={14} />
          <span>
            <strong>কীভাবে ব্যবহার করবেন:</strong> ওয়ারিশ নির্বাচন করুন, সম্পদের পরিমাণ লিখুন, তারপর হিসাব করুন বাটনে ক্লিক করুন।
            ফলাফল ব্যক্তিগত ব্যবহারের জন্য — আইনি বা পারিবারিক সিদ্ধান্তের আগে বিশেষজ্ঞ আলেম বা মুফতির পরামর্শ নিন।
          </span>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 print:hidden">
            <FaExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">

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

                {/* নগদ টাকা */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">নগদ টাকা (৳)</label>
                  <input
                    type="number" min="0" step="0.01"
                    value={assets.taka}
                    onChange={e => setAssets({ ...assets, taka: toEnglishNumber(e.target.value) })}
                    placeholder="০"
                    className="w-full px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731] text-gray-900 font-medium"
                  />
                </div>

                {/* জমি — পরিমাণ + unit dropdown */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">জমির পরিমাণ</label>
                  <div className="flex gap-2">
                    <input
                      type="number" min="0" step="0.001"
                      value={assets.jomi}
                      onChange={e => setAssets({ ...assets, jomi: toEnglishNumber(e.target.value) })}
                      placeholder="০"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731] text-gray-900 font-medium"
                    />
                    <UnitSelect
                      value={assets.jomiUnit}
                      onChange={v => setAssets({ ...assets, jomiUnit: v })}
                      options={jomiUnits}
                    />
                  </div>
                </div>

                {/* স্বর্ণ */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">স্বর্ণ</label>
                  <div className="flex gap-2">
                    <input
                      type="number" min="0" step="0.001"
                      value={assets.shorno}
                      onChange={e => setAssets({ ...assets, shorno: toEnglishNumber(e.target.value) })}
                      placeholder="০"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731] text-gray-900 font-medium"
                    />
                    <UnitSelect
                      value={assets.shornoUnit}
                      onChange={v => setAssets({ ...assets, shornoUnit: v })}
                      options={shornoUnits}
                    />
                  </div>
                </div>

                {/* রুপা */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">রুপা</label>
                  <div className="flex gap-2">
                    <input
                      type="number" min="0" step="0.001"
                      value={assets.rupa}
                      onChange={e => setAssets({ ...assets, rupa: toEnglishNumber(e.target.value) })}
                      placeholder="০"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731] text-gray-900 font-medium"
                    />
                    <UnitSelect
                      value={assets.rupaUnit}
                      onChange={v => setAssets({ ...assets, rupaUnit: v })}
                      options={rupaUnits}
                    />
                  </div>
                </div>

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
          <div className="mt-8 bg-white border border-[#e2ddd5] rounded-xl overflow-hidden print:mt-4 print:border-2">

            {/* Result header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#1a4731] text-white print:py-3">
              <h2 className="font-semibold print:text-lg">বন্টন ফলাফল</h2>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors no-print"
              >
                <FaPrint size={12} /> প্রিন্ট করুন
              </button>
            </div>

            {/* Waaris List - Only visible in print */}
            <div className="hidden print:block px-6 py-3 bg-[#f7f5f0] border-b border-[#e2ddd5]">
              <h3 className="font-semibold text-[#1a4731] text-sm mb-2">ওয়ারিশগণ:</h3>
              <p className="text-sm text-gray-700">
                {results.map(r => r.name).join(', ')}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e2ddd5] bg-[#f7f5f0]">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ওয়ারিশ</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">শরঈ অংশ</th>
                    {hasVal("taka")   && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">টাকা (৳)</th>}
                    {hasVal("jomi")   && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">জমি ({assets.jomiUnit})</th>}
                    {hasVal("shorno") && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">স্বর্ণ ({assets.shornoUnit})</th>}
                    {hasVal("rupa")   && <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">রুপা ({assets.rupaUnit})</th>}
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b border-[#e2ddd5]/60 hover:bg-[#f7f5f0] transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#1a4731]">{r.name}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs font-mono">{toBengaliNumber(r.share)}</td>
                      {hasVal("taka")   && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{toBengaliNumber(r.taka)}</td>}
                      {hasVal("jomi")   && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{toBengaliNumber(r.jomi)} <span className="text-xs text-gray-400 font-normal">{assets.jomiUnit}</span></td>}
                      {hasVal("shorno") && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{toBengaliNumber(r.shorno)} <span className="text-xs text-gray-400 font-normal">{assets.shornoUnit}</span></td>}
                      {hasVal("rupa")   && <td className="px-6 py-4 text-right font-semibold text-gray-900 font-mono">{toBengaliNumber(r.rupa)} <span className="text-xs text-gray-400 font-normal">{assets.rupaUnit}</span></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart - hidden in print */}
            <div className="px-6 pb-6 pt-2 border-t border-[#e2ddd5] print:hidden">
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
