import React, { useState } from 'react';
import { 
  FaBookOpen, 
  FaTriangleExclamation, 
  FaInfo, 
  FaChevronDown, 
  FaHandHoldingDollar, 
  FaSkullCrossbones, 
  FaCalculator, 
  FaUsers, 
  FaScaleBalanced,
  FaCircleCheck
} from 'react-icons/fa6';
import { FaQuran } from 'react-icons/fa';

const Guide = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const inheritanceData = [
    { title: "১-২. স্বামী (২ অবস্থা)", heir: "স্বামী", logic: "সন্তানহীনতায় ১/২, সন্তান থাকলে ১/৪", ibarat: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِن لَّمْ يَكُن لَّهُنَّ وَلَدٌ ۚ فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ", source: "সূরা নিসা: ১২" },
    { title: "৩-৪. স্ত্রী (২ অবস্থা)", heir: "স্ত্রী", logic: "সন্তানহীনতায় ১/৪, সন্তান থাকলে ১/৮", ibarat: "وَلَهُنَّ ٱلرُّبُعُ مِمَّا تَرَكۡتُمۡ إِن لَّمۡ يَكُن لَّكُمۡ وَلَدٌ فَإِن كَانَ لَكُمۡ وَلَدٌ فَلَهُنَّ ٱلثُّمُنُ مِمَّا تَرَكۡتُمۚ ", source: "সূরা নিসা: ১২" },
    { title: "৫-৭. পিতা (৩ অবস্থা)", heir: "পিতা", logic: "১/৬ (সন্তান থাকলে), আসাবা (সন্তান না থাকলে), ১/৬ + আসাবা (শুধু কন্যা থাকলে)", ibarat: "وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ... والثالثة: السدس والعصوبة معاً وذلك عند وجود الابنة", source: "সূরা নিসা: ১১, সিরাজী: ৩" },
    { title: "৮-১০. মাতা (৩ অবস্থা)", heir: "মাতা", logic: "১/৬, ১/৩ অথবা ১/৩ (অবশিষ্টাংশ)", ibarat: "فَإِن لَّمْ يَكُن لَّهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ... فثُلثُ ما بَقِيَ في الغرَّاوين", source: "সূরা নিসা: ১১, আলমগীরী" },
    { title: "১১-১২. কন্যা (২ অবস্থা)", heir: "কন্যা", logic: "একাকী ১/২, একাধিক ২/৩ (পুত্র না থাকলে)", ibarat: "فَإِن كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِن كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ", source: "সূরা নিসা: ১১" },
    { title: "১৩-১৫. দাদা (৩ অবস্থা)", heir: "দাদা", logic: "পিতার অবর্তমানে পিতার মতো (১/৬, আসাবা, ১/৬+আসাবা)", ibarat: "وأما الجد الصحيح فله أحوال ثلاثة كالأب عند عدمه إلا في مسألة الغراوين", source: "সিরাজী: ৪" },
    { title: "১৬. দাদি ও নানি (১ অবস্থা)", heir: "দাদি/নানি", logic: "সর্বাবস্থায় ১/৬ (মা জীবিত না থাকলে)", ibarat: "وأما الجدات فلهن السدس لواحدة كانت أو أكثر", source: "সিরাজী: ১২" },
    { title: "১৭-১৯. সহোদর বোন (৩ অবস্থা)", heir: "সহোদর বোন", logic: "একাকী ১/২, একাধিক ২/৩, অথবা আসাবা", ibarat: "فَلَهَا نِصْفُ مَا تَرَكَ... اجْعَلُوا الأَخَوَاتِ مَعَ الْبَنَاتِ عَصَبَةً", source: "সূরা নিসা: ১৭৬, বুখারী" },
    { title: "২০-২২. বৈপিত্রেয় ভাই/বোন (৩ অবস্থা)", heir: "বৈপিত্রেয় ভাই/বোন", logic: "একাকী ১/৬, একাধিক ১/৩, অথবা বঞ্চিত", ibarat: "فَلِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ... فَإِن كَانُوا أَكْثَرَ مِن ذَٰلِكَ فَهُمْ شُرَكَاءُ فِي الثُّلُثِ", source: "সূরা নিসা: ১২" },
    { title: "২৩. সাধারণ আসাবা (১ অবস্থা)", heir: "আসাবা", logic: "জাবিল ফুরুজের পর অবশিষ্ট সব অংশ পুরুষরা পান", ibarat: "أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا، فَمَا بَقِيَ فَهُوَ لأَوْلَى رَجُلٍ ذَكَرٍ", source: "সহিহ বুখারী: ৬৭৩২" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-bengali pb-20">
      <main className="max-w-7xl mx-auto px-4 pt-12">
        
        {/* হেডার */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
             উত্তরাধিকার নির্দেশিকা ও বন্টন নীতি
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* বাম কলাম: হকসমূহ ও অবস্থা */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* সম্পদ বন্টনের হকসমূহ */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <FaCircleCheck className="text-emerald-600 text-2xl" />
                <h2 className="text-2xl font-bold text-slate-800">সম্পদ বন্টনের সঠিক ক্রম</h2>
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, title: "কাফন-দাফন", desc: "মৃত ব্যক্তির সম্পদ থেকে প্রথমে দাফন-কাফনের প্রয়োজনীয় খরচ মেটাতে হবে।" },
                  { id: 2, title: "ঋণ পরিশোধ", desc: "মৃত ব্যক্তির কোনো ঋণ থাকলে তা পরিশোধ করতে হবে (মানুষের পাওনা বা জাকাত)।" },
                  { id: 3, title: "অসিয়ত পূরণ", desc: "মৃত ব্যক্তি অসিয়ত করে গেলে তা মোট সম্পদের ১/৩ অংশের মধ্য থেকে পূরণ করতে হবে।" },
                  { id: 4, title: "ওয়ারিশদের অংশ", desc: "সব ধাপ শেষ হওয়ার পর অবশিষ্ট সম্পদ ওয়ারিশদের মধ্যে বন্টন করতে হবে।" }
                ].map((item) => (
                  <div key={item.id} className="flex gap-4 p-5 rounded-2xl bg-[#f0f9f4] border border-[#e1f2e8]">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* মীরাসের ২৩টি অবস্থা (Accordion) */}
              <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md">
                    <FaQuran />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">কে কত অংশ পায়? (২৩ অবস্থা)</h2>
                </div>

                <div className="space-y-3">
                  {inheritanceData.map((item, index) => (
                    <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                      <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-50 transition-all"
                      >
                        <span className="font-bold text-gray-700 text-sm md:text-base">{item.title}</span>
                        <FaChevronDown className={`text-emerald-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openIndex === index && (
                        <div className="p-4 bg-emerald-50/30 border-t border-emerald-50">
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2 justify-between items-center">
                              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                অংশ: {item.logic}
                              </span>
                              <span className="text-[10px] text-gray-400 font-semibold">{item.source}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-emerald-100">
                              <p className="arabic-text text-right text-emerald-950 leading-relaxed text-lg">
                                {item.ibarat}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
          </div>

          {/* ডান কলাম: প্রকারভেদ, বঞ্চনা নীতি, সমন্বয় */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* ১. ওয়ারিশের শ্রেণীবিভাগ (বিন্দু স্টাইলে) */}
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FaUsers className="text-emerald-600" size={18} />
                ওয়ারিশের শ্রেণীবিভাগ
              </h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <h3 className="font-bold text-emerald-800 text-sm mb-2 flex justify-between items-center">
                    জাবিল ফুরুজ
                                      </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    যাদের অংশ পবিত্র কুরআনে নির্দিষ্ট করা হয়েছে (যেমন: মা, বাবা, স্ত্রী, স্বামী)। মোট ১২ জন এই শ্রেণির অন্তর্ভুক্ত।
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-amber-50/30 border border-amber-100">
                  <h3 className="font-bold text-amber-800 text-sm mb-2">আসাবা (অবশিষ্টভোগী)</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    নির্ধারিত অংশীদারদের দেওয়ার পর যারা অবশিষ্ট সম্পদ পান (যেমন: ছেলে, ভাই)। এরা কখনো সম্পদ বেশি পান, আবার কখনো কিছুই পান না।
                  </p>
                </div>
              </div>
            </section>

            {/* ২. বঞ্চনা নীতি (ডার্ক গ্রিন কার্ড) */}
            <section className="bg-[#064e3b] text-white p-8 rounded-[2rem] shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FaTriangleExclamation className="text-emerald-400" />
                <h2 className="text-lg font-bold">বঞ্চনা নীতি (Exclusion)</h2>
              </div>
              <div className="space-y-4 text-sm">
                {[
                  { title: "বাবা থাকলে", result: "দাদা বঞ্চিত" },
                  { title: "মা থাকলে", result: "দাদি/নানি বঞ্চিত" },
                  { title: "ছেলে থাকলে", result: "নাতি বঞ্চিত" },
                  { title: "পুত্র থাকলে", result: "পুত্রের পুত্র বঞ্চিত" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-emerald-800/50 pb-2">
                    <span className="opacity-80">{item.title}</span>
                    <span className="font-bold">{item.result}</span>
                  </div>
                ))}
                <p className='flex text-[11px] text-emerald-500 italic justify-center'>কাছের ওয়ারিশ থাকলে দূরের ওয়ারিশরা বঞ্চিত হন। এটি একটি সাধারণ নিয়ম।</p>
              </div>
            </section>

            {/* ৩. আউল ও রদ (ডান পাশে) */}
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                <FaCalculator className="text-slate-400" size={18} />
                গাণিতিক সমন্বয়
              </h2>
              <div className="space-y-5">
                <div className="relative pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-full">
                  <h4 className="text-emerald-700 font-bold text-[13px] mb-1">আউল কী?</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    যখন ওয়ারিশদের মোট পাওনা অংশ ১-এর বেশি হয়ে যায় (সম্পদ কম কিন্তু দাবিদার বেশি), তখন সবার অংশ আনুপাতিক হারে কমিয়ে সমন্বয় করা হয়। আমাদের ক্যালকুলেটর এটি অটোমেটিক করে থাকে।
                  </p>
                </div>
                <div className="relative pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-slate-300 before:rounded-full">
                  <h4 className="text-slate-800 font-bold text-[13px] mb-1">রদ কী?</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    যখন ওয়ারিশদের নির্ধারিত অংশ দেওয়ার পর সম্পদ উদ্বৃত্ত থাকে কিন্তু কোনো 'আসাবা' থাকে না, তখন সেই বাড়তি সম্পদ নির্ধারিত অংশীদারদের মধ্যে পুনরায় বন্টন করা হয়।
                  </p>
                </div>
              </div>
            </section>

            {/* ৪. বিশেষ দ্রষ্টব্য */}
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
                <FaInfo className="text-blue-500" /> বিশেষ দ্রষ্টব্য
              </h2>
              <p className="text-[11px] text-neutral-700 leading-relaxed">এই ক্যালকুলেটরটি <strong>হানাফি মাযহাবের</strong> ফারায়েজ আইনের ওপর ভিত্তি করে তৈরি। শরীয়াহর অন্য কোনো মাযহাবে সামান্য ভিন্নতা থাকতে পারে।</p>
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-emerald-600 italic text-[11px] text-slate-600 mt-4">
                "ফারায়েজ শিক্ষা করো এবং মানুষকে তা শেখাও। কারণ এটি জ্ঞানের অর্ধেক।" - আল হাদিস
              </div>
            </section>

            {/* ৫. অযোগ্যতা */}
            <section className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100">
              <h2 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-3">
                <FaSkullCrossbones className="text-red-600" /> অযোগ্যতার কারণ
              </h2>
              <ul className="space-y-2 text-[11px] text-red-700/80 font-medium leading-relaxed">
                <li>• মৃত ব্যক্তিকে হত্যাকারী তার উত্তরাধিকার পায় না।</li>
                <li>• ভিন্ন ধর্মাবলম্বীরা মীরাস পায় না।</li>
              </ul>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Guide;