import { useState, useRef, useEffect } from "react";
import {
  FaPlus, FaTrash, FaCalculator, FaChevronDown, FaChevronRight,
  FaPrint, FaInfoCircle, FaUsers, FaRing, FaChild,
  FaUserFriends, FaSitemap, FaHeart
} from "react-icons/fa";
import { calculateMunasakha } from "../logic/munasakhaCalculations";
import { distributeAssets } from "../logic/inheritanceCalculations";

// ─────────────────────────────────────────────────────────────────
// Bengali number converter
// ─────────────────────────────────────────────────────────────────
const toBn = n => {
  if (n === null || n === undefined || n === '') return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, d => bengaliDigits[parseInt(d)]);
};

// ─────────────────────────────────────────────────────────────────
// Custom unit dropdown (same as Logic.jsx)
// ─────────────────────────────────────────────────────────────────
const UnitSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative w-28 flex-shrink-0">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-1 px-3 py-2 text-xs font-medium border border-[#e2ddd5] rounded-lg bg-[#fafaf8] text-gray-700 hover:border-[#1a4731] transition-colors"
      >
        <span className="truncate">{value}</span>
        <FaChevronDown size={9} className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#e2ddd5] rounded-lg shadow-md z-20 overflow-hidden">
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors ${opt === value ? "bg-[#1a4731] text-white font-medium" : "text-gray-700 hover:bg-[#f0f5f2]"}`}
            >{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// ওয়ারিশ নির্বাচন — simplified (same groups as Logic.jsx)
// ─────────────────────────────────────────────────────────────────
const EMPTY_WARIS = () => ({
  pita: false, dada: false, mata: false, dadi: false, nani: false,
  shami: false, stri: 0,
  putro: 0, konna: 0, putro_putro: 0, putro_konna: 0,
  putro_putro_putro: 0, putro_putro_konna: 0,
  shohodor_bhai: 0, shohodor_bon: 0,
  boimatreyo_bhai: 0, boimatreyo_bon: 0,
  boipitreyo_bhai: 0, boipitreyo_bon: 0,
  shohodor_bhai_putro: 0, shohodor_bhai_putro_putro: 0,
  boimatreyo_bhai_putro: 0, boimatreyo_bhai_putro_putro: 0,
  chacha: 0, boimatreyo_chacha: 0,
  chacha_putro: 0, boimatreyo_chacha_putro: 0, chacha_putro_putro: 0,
  dada_bhai: 0, dada_bhai_putro: 0,
  konna_putro: 0, konna_konna: 0, nana: false,
  fufu: 0, mama: 0, khala: 0,
  shohodor_bon_putro: 0, shohodor_bon_konna: 0,
  boimatreyo_bon_putro: 0, boimatreyo_bon_konna: 0,
  boipitreyo_bhai_konna: 0, boipitreyo_bon_putro: 0, boipitreyo_bon_konna: 0,
});

const BN_NAMES = {
  pita:"পিতা", dada:"দাদা", mata:"মাতা", dadi:"দাদি", nani:"নানি",
  shami:"স্বামী", stri:"স্ত্রী",
  putro:"পুত্র", konna:"কন্যা", putro_putro:"পুত্রের পুত্র", putro_konna:"পুত্রের কন্যা",
  putro_putro_putro:"পুত্রের পুত্রের পুত্র", putro_putro_konna:"পুত্রের পুত্রের কন্যা",
  shohodor_bhai:"সহোদর ভাই", shohodor_bon:"সহোদর বোন",
  boimatreyo_bhai:"বৈমাত্রীয় ভাই", boimatreyo_bon:"বৈমাত্রীয় বোন",
  boipitreyo_bhai:"বৈপিত্রীয় ভাই", boipitreyo_bon:"বৈপিত্রীয় বোন",
  shohodor_bhai_putro:"সহোদর ভাইয়ের পুত্র", shohodor_bhai_putro_putro:"সহোদর ভাইয়ের পুত্রের পুত্র",
  boimatreyo_bhai_putro:"বৈমাত্রীয় ভাইয়ের পুত্র", boimatreyo_bhai_putro_putro:"বৈমাত্রীয় ভাইয়ের পুত্রের পুত্র",
  chacha:"চাচা (সহোদর)", boimatreyo_chacha:"চাচা (বৈমাত্রীয়)",
  chacha_putro:"চাচার পুত্র", boimatreyo_chacha_putro:"বৈমাত্রীয় চাচার পুত্র", chacha_putro_putro:"চাচার পুত্রের পুত্র",
  dada_bhai:"দাদার ভাই", dada_bhai_putro:"দাদার ভাইয়ের পুত্র",
  konna_putro:"কন্যার পুত্র", konna_konna:"কন্যার কন্যা", nana:"নানা",
  fufu:"ফুফু", mama:"মামা", khala:"খালা",
  shohodor_bon_putro:"সহোদর বোনের পুত্র", shohodor_bon_konna:"সহোদর বোনের কন্যা",
  boimatreyo_bon_putro:"বৈমাত্রীয় বোনের পুত্র", boimatreyo_bon_konna:"বৈমাত্রীয় বোনের কন্যা",
  boipitreyo_bhai_konna:"বৈপিত্রীয় ভাইয়ের কন্যা",
  boipitreyo_bon_putro:"বৈপিত্রীয় বোনের পুত্র", boipitreyo_bon_konna:"বৈপিত্রীয় বোনের কন্যা",
};

const GROUPS = [
  { key:"parents",  label:"পিতামাতা ও দাদা-দাদি", icon:FaUsers,       items:["pita","dada","mata","dadi","nani"] },
  { key:"spouse",   label:"স্বামী / স্ত্রী",         icon:FaRing,        items:["shami","stri"] },
  { key:"children", label:"সন্তান ও নিম্নস্তর",      icon:FaChild,       items:["putro","konna","putro_putro","putro_konna","putro_putro_putro","putro_putro_konna"] },
  { key:"siblings", label:"ভাই-বোন",                 icon:FaUserFriends, items:["shohodor_bhai","shohodor_bon","boimatreyo_bhai","boimatreyo_bon","boipitreyo_bhai","boipitreyo_bon"] },
  { key:"asaba",    label:"দূরবর্তী আসাবা",          icon:FaSitemap,     items:["shohodor_bhai_putro","shohodor_bhai_putro_putro","boimatreyo_bhai_putro","boimatreyo_bhai_putro_putro","chacha","boimatreyo_chacha","chacha_putro","boimatreyo_chacha_putro","chacha_putro_putro","dada_bhai","dada_bhai_putro"] },
  { key:"arham",    label:"জাবিল আরহাম",             icon:FaHeart,       items:["konna_putro","konna_konna","nana","fufu","mama","khala","shohodor_bon_putro","shohodor_bon_konna","boimatreyo_bon_putro","boimatreyo_bon_konna","boipitreyo_bhai_konna","boipitreyo_bon_putro","boipitreyo_bon_konna"] },
];

// ─────────────────────────────────────────────────────────────────
// ওয়ারিশ নির্বাচন উইজেট
// ─────────────────────────────────────────────────────────────────
const WarisSelector = ({ waris, onChange }) => {
  const [open, setOpen] = useState({ parents: true, spouse: true, children: false, siblings: false, asaba: false, arham: false });

  const set = (key, val) => onChange({ ...waris, [key]: val });

  const toggle = (key) => {
    const cur = waris[key];
    if (typeof cur === "boolean") {
      if (key === "shami") onChange({ ...waris, shami: !cur, stri: cur ? waris.stri : 0 });
      else if (key === "stri") return; // numeric only
      else set(key, !cur);
    } else {
      if (key === "stri" && cur === 0) onChange({ ...waris, stri: 1, shami: false });
      else if (key === "shami" && !waris.shami) onChange({ ...waris, shami: true, stri: 0 });
      else set(key, cur > 0 ? 0 : 1);
    }
  };

  const adjust = (key, delta) => {
    const max = key === "stri" ? 4 : 20;
    set(key, Math.max(1, Math.min(max, (waris[key] || 0) + delta)));
  };

  return (
    <div className="space-y-2">
      {GROUPS.map(({ key, label, icon: Icon, items }) => {
        const activeCount = items.filter(k => typeof waris[k] === "boolean" ? waris[k] : waris[k] > 0).length;
        return (
          <div key={key} className="border border-[#e2ddd5] rounded-xl overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setOpen(p => ({ ...p, [key]: !p[key] }))}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon className="text-[#1a4731]" size={13} />
                <span className="font-medium text-gray-900 text-sm">{label}</span>
                {activeCount > 0 && (
                  <span className="bg-[#1a4731] text-white text-[10px] px-1.5 py-0.5 rounded-full">{activeCount}</span>
                )}
              </div>
              <FaChevronDown size={10} className={`text-gray-400 transition-transform ${open[key] ? "rotate-180" : ""}`} />
            </button>

            {open[key] && (
              <div className="border-t border-[#e2ddd5] px-4 py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {items.map(k => {
                    const isNum    = typeof waris[k] === "number";
                    const isActive = isNum ? waris[k] > 0 : waris[k];
                    const max      = k === "stri" ? 4 : 20;
                    return (
                      <div key={k}
                        onClick={() => toggle(k)}
                        className={`relative rounded-lg border cursor-pointer transition-all select-none ${isActive ? "border-[#1a4731] bg-[#1a4731]/5" : "border-[#e2ddd5] bg-white hover:border-[#1a4731]/40"}`}
                      >
                        {isActive && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#1a4731]" />}
                        <div className="px-3 py-2">
                          <span className={`text-xs font-medium block ${isActive ? "text-[#1a4731]" : "text-gray-700"}`}>{BN_NAMES[k]}</span>
                          {isNum && isActive && (
                            <div className="flex items-center gap-1 mt-1.5" onClick={e => e.stopPropagation()}>
                              <button onClick={() => adjust(k, -1)}
                                className="w-5 h-5 rounded border border-[#e2ddd5] bg-white text-gray-600 hover:bg-gray-50 text-xs flex items-center justify-center">−</button>
                              <input type="number" min={1} max={max} value={waris[k]}
                                onFocus={e => e.target.select()}
                                onChange={e => {
                                  const p = parseInt(e.target.value) || 1;
                                  set(k, Math.min(max, Math.max(1, p)));
                                }}
                                className="w-8 h-5 border border-[#e2ddd5] rounded text-center text-xs font-semibold text-[#1a4731] bg-white outline-none focus:border-[#1a4731]"
                              />
                              <button onClick={() => waris[k] < max && adjust(k, 1)}
                                disabled={waris[k] >= max}
                                className={`w-5 h-5 rounded border text-xs flex items-center justify-center ${waris[k] >= max ? "border-gray-200 bg-gray-50 text-gray-300" : "border-[#e2ddd5] bg-white text-gray-600 hover:bg-gray-50"}`}>+</button>
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
  );
};

// ─────────────────────────────────────────────────────────────────
// Main Munasakha Component
// ─────────────────────────────────────────────────────────────────
const Munasakha = () => {
  const [stages, setStages] = useState([
    { id: 1, name: "", waris: EMPTY_WARIS(), open: true },
  ]);
  const [assets, setAssets] = useState({
    taka: "", jomi: "", jomiUnit: "শতাংশ",
    shorno: "", shornoUnit: "ভরি",
    rupa: "", rupaUnit: "ভরি",
  });
  const [result, setResult]   = useState(null);
  const [errors, setErrors]   = useState([]);

  const jomiUnits   = ["শতাংশ","কাঠা","বিঘা","হাজারাংশ","অযুতাংশ","একর","বর্গফুট","বর্গমিটার"];
  const shornoUnits = ["ভরি","আনা","রতি","গ্রাম","তোলা"];
  const rupaUnits   = ["ভরি","গ্রাম","কেজি","তোলা"];

  const addStage = () => {
    setStages(p => [...p, { id: Date.now(), name: "", waris: EMPTY_WARIS(), open: true }]);
  };

  const removeStage = (id) => {
    if (stages.length <= 1) return;
    setStages(p => p.filter(s => s.id !== id));
  };

  const updateStage = (id, field, val) => {
    setStages(p => p.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const hasVal = k => assets[k] && parseFloat(assets[k]) > 0;

  const calculate = () => {
    setErrors([]);
    const errs = [];
    stages.forEach((s, i) => {
      if (!s.name.trim()) errs.push(`${i + 1} নম্বর মৃত ব্যক্তির নাম দিন`);
      const hasAnyWaris = Object.entries(s.waris).some(([, v]) =>
        typeof v === "boolean" ? v : v > 0
      );
      if (!hasAnyWaris) errs.push(`${s.name || (i + 1) + " নম্বর"} ব্যক্তির কমপক্ষে একজন ওয়ারিশ নির্বাচন করুন`);
    });
    if (!["taka","jomi","shorno","rupa"].some(k => hasVal(k)))
      errs.push("কমপক্ষে একটি সম্পদের পরিমাণ দিন");
    if (errs.length > 0) { setErrors(errs); return; }

    const calc = calculateMunasakha(stages.map(s => ({ name: s.name, waris: s.waris })));
    if (!calc) { setErrors(["হিসাব করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"]); return; }

    // asset distribute
    const { finalShares, totalBase, stageResults, totalCheck } = calc;
    const distributed = distributeAssets(finalShares, assets, totalBase);

    setResult({ ...calc, distributed, totalCheck });
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#1a4731]/60 text-sm mb-6">
          <span>হোম</span><span>/</span>
          <span className="text-[#1a4731] font-medium">মুনাসাখা</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1a4731]">মুনাসাখা ক্যালকুলেটর</h1>
          <p className="text-gray-600 mt-1.5 text-sm">একজন ওয়ারিশ অংশ বুঝে পাওয়ার আগে মারা গেলে তার অংশের পুনর্বণ্টন</p>
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 bg-[#1a4731]/5 border border-[#1a4731]/15 rounded-lg px-4 py-3 mb-6 text-sm text-[#1a4731]">
          <FaInfoCircle className="mt-0.5 flex-shrink-0" size={14} />
          <div>
            <strong>কীভাবে ব্যবহার করবেন:</strong> প্রথম মৃত ব্যক্তির নাম ও তার ওয়ারিশ দিন।
            যদি কোনো ওয়ারিশ সম্পদ বুঝে পাওয়ার আগে মারা যায়,
            "মৃত ওয়ারিশ যুক্ত করুন" বাটনে ক্লিক করে তার নাম ও তার ওয়ারিশ দিন।
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((e, i) => <li key={i} className="flex items-start gap-2"><span className="mt-0.5">•</span>{e}</li>)}
            </ul>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT: Stages */}
          <div className="lg:col-span-2 space-y-4">
            {stages.map((stage, idx) => (
              <div key={stage.id} className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
                {/* Stage Header */}
                <div className="flex items-center gap-3 px-5 py-3 bg-[#f7f5f0] border-b border-[#e2ddd5]">
                  <div className="w-7 h-7 rounded-full bg-[#1a4731] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {toBn(String(idx + 1))}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">
                      {idx === 0 ? "প্রধান মৃত ব্যক্তি" : "মৃত ওয়ারিশ"}
                    </p>
                    <input
                      type="text"
                      value={stage.name}
                      onChange={e => updateStage(stage.id, "name", e.target.value)}
                      placeholder={`নাম লিখুন...`}
                      className="w-full bg-transparent font-semibold text-gray-900 text-sm outline-none placeholder-gray-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateStage(stage.id, "open", !stage.open)}
                      className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {stage.open
                        ? <FaChevronDown size={12} className="text-gray-500" />
                        : <FaChevronRight size={12} className="text-gray-500" />}
                    </button>
                    {stages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStage(stage.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Waris Selector */}
                {stage.open && (
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-3">
                      {idx === 0
                        ? "এই ব্যক্তির মৃত্যুর সময়ের জীবিত ওয়ারিশ নির্বাচন করুন"
                        : `"${stage.name || "এই ব্যক্তি"}"-এর নিজের ওয়ারিশ নির্বাচন করুন`
                      }
                    </p>
                    <WarisSelector
                      waris={stage.waris}
                      onChange={w => updateStage(stage.id, "waris", w)}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Stage Button */}
            <button
              type="button"
              onClick={addStage}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#1a4731]/30 rounded-xl text-sm text-[#1a4731] hover:border-[#1a4731] hover:bg-[#1a4731]/5 transition-all"
            >
              <FaPlus size={12} />
              মৃত ওয়ারিশ যুক্ত করুন
            </button>
          </div>

          {/* RIGHT: Assets + Calculate */}
          <div className="space-y-4">
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-[#e2ddd5]">
                মৃত ব্যক্তির মোট সম্পদ
              </h2>
              <div className="space-y-3">
                {/* টাকা */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">নগদ টাকা (৳)</label>
                  <input type="number" min="0" step="0.01" value={assets.taka}
                    onChange={e => setAssets({ ...assets, taka: e.target.value })}
                    placeholder="০"
                    className="w-full px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731]"
                  />
                </div>
                {/* জমি */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">জমির পরিমাণ</label>
                  <div className="flex gap-2">
                    <input type="number" min="0" step="0.001" value={assets.jomi}
                      onChange={e => setAssets({ ...assets, jomi: e.target.value })}
                      placeholder="০"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731]"
                    />
                    <UnitSelect value={assets.jomiUnit} onChange={v => setAssets({ ...assets, jomiUnit: v })} options={jomiUnits} />
                  </div>
                </div>
                {/* স্বর্ণ */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">স্বর্ণ</label>
                  <div className="flex gap-2">
                    <input type="number" min="0" step="0.001" value={assets.shorno}
                      onChange={e => setAssets({ ...assets, shorno: e.target.value })}
                      placeholder="০"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731]"
                    />
                    <UnitSelect value={assets.shornoUnit} onChange={v => setAssets({ ...assets, shornoUnit: v })} options={shornoUnits} />
                  </div>
                </div>
                {/* রুপা */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">রুপা</label>
                  <div className="flex gap-2">
                    <input type="number" min="0" step="0.001" value={assets.rupa}
                      onChange={e => setAssets({ ...assets, rupa: e.target.value })}
                      placeholder="০"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-[#e2ddd5] rounded-lg bg-[#fafaf8] focus:outline-none focus:border-[#1a4731]"
                    />
                    <UnitSelect value={assets.rupaUnit} onChange={v => setAssets({ ...assets, rupaUnit: v })} options={rupaUnits} />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-[#1a4731] hover:bg-[#2d6a4f] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FaCalculator size={14} />
              মুনাসাখা হিসাব করুন
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-4">

            {/* প্রতিটি স্তরের হিসাব */}
            {result.stageResults.map((stage, idx) => (
              <div key={idx} className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 bg-[#f7f5f0] border-b border-[#e2ddd5]">
                  <div className="w-6 h-6 rounded-full bg-[#1a4731]/20 text-[#1a4731] text-xs font-bold flex items-center justify-center">
                    {toBn(String(idx + 1))}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{stage.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {idx === 0 ? "— প্রধান মৃত, মূল সম্পদ" : "— মৃত ওয়ারিশ, অংশ পুনর্বণ্টন"}
                    </span>
                  </div>
                </div>

                {stage.shares.length === 0 ? (
                  <p className="px-5 py-3 text-sm text-gray-500">কোনো ওয়ারিশ নেই</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e2ddd5] bg-[#fafaf8]">
                          <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500">ওয়ারিশ</th>
                          <th className="text-left px-5 py-2.5 text-xs font-semibold text-gray-500">শরঈ অংশ</th>
                          <th className="text-right px-5 py-2.5 text-xs font-semibold text-gray-500">শতকরা</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stage.shares.map((r, i) => (
                          <tr key={i} className="border-b border-[#e2ddd5]/60 hover:bg-[#f7f5f0] transition-colors">
                            <td className="px-5 py-3 font-semibold text-[#1a4731]">{r.name}</td>
                            <td className="px-5 py-3 text-gray-500 text-xs font-mono">{r.share}</td>
                            <td className="px-5 py-3 text-right text-gray-700 font-mono">
                              {toBn(((r.num / r.base) * 100).toFixed(2))}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {/* চূড়ান্ত বন্টন */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-[#1a4731] text-white">
                <h2 className="font-semibold text-sm">চূড়ান্ত বন্টন — সমস্ত জীবিত ওয়ারিশ</h2>
                <button onClick={() => window.print()}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors no-print">
                  <FaPrint size={11} /> প্রিন্ট করুন
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e2ddd5] bg-[#f7f5f0]">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ওয়ারিশ</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">শতকরা</th>
                      {hasVal("taka")   && <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">টাকা</th>}
                      {hasVal("jomi")   && <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">জমি ({assets.jomiUnit})</th>}
                      {hasVal("shorno") && <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">স্বর্ণ ({assets.shornoUnit})</th>}
                      {hasVal("rupa")   && <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">রুপা ({assets.rupaUnit})</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {result.distributed.map((r, i) => (
                      <tr key={i} className="border-b border-[#e2ddd5]/60 hover:bg-[#f7f5f0] transition-colors">
                        <td className="px-5 py-4 font-semibold text-[#1a4731]">{r.name}</td>
                        <td className="px-5 py-4 text-right font-mono text-gray-700">
                          {toBn(((r.num / result.totalBase) * 100).toFixed(2))}%
                        </td>
                        {hasVal("taka")   && <td className="px-5 py-4 text-right font-semibold font-mono text-gray-900">{r.taka}</td>}
                        {hasVal("jomi")   && <td className="px-5 py-4 text-right font-semibold font-mono text-gray-900">{r.jomi}</td>}
                        {hasVal("shorno") && <td className="px-5 py-4 text-right font-semibold font-mono text-gray-900">{r.shorno}</td>}
                        {hasVal("rupa")   && <td className="px-5 py-4 text-right font-semibold font-mono text-gray-900">{r.rupa}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Disclaimer */}
              <div className="mx-5 mb-5 mt-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800 leading-relaxed">
                <strong>দ্রষ্টব্য:</strong> মুনাসাখার হিসাব অত্যন্ত জটিল। এই ক্যালকুলেটর হানাফি মাযহাবের
                সরলীকৃত পদ্ধতি অনুসরণ করে। বাস্তব আইনি বা পারিবারিক ব্যবহারের আগে অবশ্যই
                বিশেষজ্ঞ মুফতির পরামর্শ নিন।
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Munasakha;
