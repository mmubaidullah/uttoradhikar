import { useState } from 'react';
import { FaChevronDown, FaBookOpen, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Guide = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const heirs = [
    { title: "স্বামী", shares: "সন্তান না থাকলে ১/২, থাকলে ১/৪", source: "সূরা নিসা: ১২", arabic: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ" },
    { title: "স্ত্রী", shares: "সন্তান না থাকলে ১/৪, থাকলে ১/৮", source: "সূরা নিসা: ১২", arabic: "وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ" },
    { title: "পিতা", shares: "সন্তান থাকলে ১/৬ + কখনো আসাবা; না থাকলে সম্পূর্ণ আসাবা", source: "সূরা নিসা: ১১", arabic: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُ وَلَدٌ" },
    { title: "মাতা", shares: "সন্তান বা দুইয়ের বেশি ভাই-বোন থাকলে ১/৬; না থাকলে ১/৩ (বা অবশিষ্টের ১/৩)", source: "সূরা নিসা: ১১", arabic: "فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ" },
    { title: "কন্যা", shares: "একজন: ১/২ | দুই বা বেশি: ২/৩ (পুত্র না থাকলে)", source: "সূরা নিসা: ১১", arabic: "فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ" },
    { title: "পুত্র", shares: "আসাবা — নির্ধারিত অংশ নেই, অবশিষ্ট সম্পদ পায়", source: "সূরা নিসা: ১১", arabic: "لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ" },
    { title: "দাদা", shares: "পিতার অবর্তমানে পিতার মতো নিয়ম প্রযোজ্য", source: "সিরাজী", arabic: "" },
    { title: "দাদি / নানি", shares: "মায়ের অবর্তমানে ১/৬ (উভয় থাকলে ভাগ করে)", source: "সিরাজী: ১২", arabic: "" },
    { title: "সহোদর বোন", shares: "একজন: ১/২ | একাধিক: ২/৩ | কন্যার সাথে: আসাবা", source: "সূরা নিসা: ১৭৬", arabic: "فَلَهَا نِصْفُ مَا تَرَكَ" },
    { title: "বৈপিত্রীয় ভাই/বোন", shares: "একজন: ১/৬ | একাধিক: ১/৩ (পুরুষ-নারী সমান)", source: "সূরা নিসা: ১২", arabic: "فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ" },
    { title: "সহোদর / বৈমাত্রীয় ভাই", shares: "আসাবা — জাবিল ফুরুজের পর অবশিষ্ট পায়", source: "বুখারী: ৬৭৩২", arabic: "فَمَا بَقِيَ فَهُوَ لِأَوْلَى رَجُلٍ ذَكَرٍ" },
  ];

  const exclusions = [
    { when: "পিতা জীবিত",       blocked: "দাদা বঞ্চিত হন" },
    { when: "মাতা জীবিত",       blocked: "দাদি ও নানি বঞ্চিত হন" },
    { when: "পুত্র জীবিত",       blocked: "পুত্রের পুত্র (নাতি) বঞ্চিত" },
    { when: "সহোদর ভাই জীবিত", blocked: "বৈমাত্রীয় ভাই বঞ্চিত" },
    { when: "পুত্র/পিতা জীবিত", blocked: "চাচা/ভাই সহ দূরবর্তীরা বঞ্চিত" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-bold text-[#1a4731] mb-2">বন্টন গাইড</h1>
        <p className="text-gray-600 mb-8">ফারায়েজের মূলনীতি ও ওয়ারিশদের অংশের বিবরণ</p>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main — অংশ তালিকা */}
          <div className="lg:col-span-2 space-y-4">

            {/* সম্পদ বন্টনের ক্রম */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e2ddd5] flex items-center gap-3">
                <FaBookOpen className="text-[#1a4731]" size={16} />
                <h2 className="font-semibold text-gray-900">সম্পদ বন্টনের সঠিক ক্রম</h2>
              </div>
              <div className="divide-y divide-[#e2ddd5]">
                {[
                  { n: "১", t: "কাফন-দাফন",     d: "মৃত ব্যক্তির সম্পদ থেকে প্রথমে দাফন-কাফনের খরচ মেটাতে হবে।" },
                  { n: "২", t: "ঋণ পরিশোধ",     d: "মৃত ব্যক্তির যে কোনো ঋণ (মানুষের পাওনা, বকেয়া যাকাত) পরিশোধ করতে হবে।" },
                  { n: "৩", t: "অসিয়ত পূরণ",   d: "অসিয়ত থাকলে মোট সম্পদের সর্বোচ্চ ১/৩ থেকে পূরণ করতে হবে। ওয়ারিশদের জন্য অসিয়ত করা যায় না।" },
                  { n: "৪", t: "ওয়ারিশদের অংশ", d: "উপরোক্ত তিনটি ধাপ শেষ হওয়ার পর অবশিষ্ট সম্পদ ওয়ারিশদের মধ্যে বিধান অনুযায়ী বন্টন হবে।" },
                ].map(s => (
                  <div key={s.n} className="flex gap-4 px-6 py-4">
                    <div className="w-7 h-7 rounded-full bg-[#1a4731] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {s.n}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{s.t}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ওয়ারিশদের অংশ — accordion */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e2ddd5]">
                <h2 className="font-semibold text-gray-900">ওয়ারিশদের অংশ</h2>
                <p className="text-xs text-gray-500 mt-0.5">বিস্তারিত দেখতে ক্লিক করুন</p>
              </div>
              <div className="divide-y divide-[#e2ddd5]">
                {heirs.map((h, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#f7f5f0] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900 text-sm">{h.title}</span>
                        <span className="text-xs text-gray-400 hidden sm:block">{h.source}</span>
                      </div>
                      <FaChevronDown
                        size={11}
                        className={`text-gray-400 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openIndex === i && (
                      <div className="px-6 pb-5 bg-[#f7f5f0] border-t border-[#e2ddd5]">
                        <div className="mt-4 space-y-3">
                          <div className="inline-flex items-center gap-2 bg-[#1a4731]/8 text-[#1a4731] text-xs font-medium px-3 py-1.5 rounded-md">
                            {h.shares}
                          </div>
                          {h.arabic && (
                            <div className="bg-white border border-[#e2ddd5] rounded-lg p-4">
                              <p className="arabic-text text-right text-gray-800 mb-2">{h.arabic}</p>
                              <p className="text-[10px] text-gray-400 text-right">{h.source}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* বঞ্চনা নীতি */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#e2ddd5] flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-500" size={14} />
                <h3 className="font-semibold text-gray-900 text-sm">বঞ্চনা নীতি</h3>
              </div>
              <div className="divide-y divide-[#e2ddd5]">
                {exclusions.map((e, i) => (
                  <div key={i} className="px-5 py-3">
                    <p className="text-xs text-gray-500 mb-0.5">{e.when} হলে</p>
                    <p className="text-xs font-medium text-[#1a4731]">{e.blocked}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
                <p className="text-xs text-amber-700">নিকটবর্তী ওয়ারিশ থাকলে দূরবর্তীরা বঞ্চিত হন — এটি সাধারণ নীতি।</p>
              </div>
            </div>

            {/* আউল ও রাদ্দ */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#e2ddd5]">
                <h3 className="font-semibold text-gray-900 text-sm">গাণিতিক সমন্বয়</h3>
              </div>
              <div className="px-5 py-4 space-y-4">
                <div className="border-l-2 border-[#1a4731] pl-4">
                  <h4 className="text-sm font-semibold text-[#1a4731] mb-1">আউল</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    মোট অংশ ১-এর বেশি হলে সবার অংশ আনুপাতিকভাবে কমিয়ে সমন্বয় করা হয়।
                  </p>
                </div>
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">রাদ্দ</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    আসাবা না থাকায় সম্পদ উদ্বৃত্ত হলে নির্ধারিত অংশীদারদের মধ্যে ফেরত দেওয়া হয়।
                    স্বামী/স্ত্রী রাদ্দ পান না।
                  </p>
                </div>
              </div>
            </div>

            {/* অযোগ্যতা */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#e2ddd5] flex items-center gap-2">
                <FaInfoCircle className="text-red-500" size={14} />
                <h3 className="font-semibold text-gray-900 text-sm">অযোগ্যতার কারণ</h3>
              </div>
              <div className="px-5 py-4 space-y-2">
                <p className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  হত্যাকারী মৃত ব্যক্তির উত্তরাধিকার পায় না
                </p>
                <p className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  ভিন্ন ধর্মাবলম্বী ব্যক্তি মুসলিমের মীরাস পায় না
                </p>
              </div>
            </div>

            {/* হাদিস */}
            <div className="bg-[#1a4731] text-white rounded-xl p-5">
              <p className="arabic-text text-right text-sm leading-loose mb-3">
                تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا النَّاسَ
              </p>
              <p className="text-white/70 text-xs text-right">
                "ফারায়েজ শিক্ষা করো এবং মানুষকে শেখাও।" — রাসূলুল্লাহ ﷺ
              </p>
              <p className="text-[#c9a84c] text-xs text-right mt-1">সুনানে ইবনে মাজাহ: ২৭১৯</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
