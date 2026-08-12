import React, { useState } from 'react';
import { FaQuran, FaBookOpen, FaSearch, FaCopy, FaCheck } from 'react-icons/fa';

const QuranReferences = () => {
  const [selectedAyah, setSelectedAyah] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const ayahs = [
    {
      id: 1,
      surah: 'সূরা নিসা',
      ayahNumber: '৭',
      arabic: 'لِلرِّجَالِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ وَلِلنِّسَاءِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ مِمَّا قَلَّ مِنْهُ أَوْ كَثُرَ ۚ نَصِيبًا مَفْرُوضًا',
      bangla: 'পিতা-মাতা ও আত্মীয়-স্বজন যা রেখে যায়, তাতে পুরুষদের অংশ রয়েছে এবং পিতা-মাতা ও আত্মীয়-স্বজন যা রেখে যায়, তাতে নারীদেরও অংশ রয়েছে; তা অল্প হোক কিংবা বেশি - এটি একটি নির্ধারিত অংশ।',
      tafsir: 'এই আয়াতে আল্লাহ তাআলা স্পষ্ট করেছেন যে উত্তরাধিকারে পুরুষ ও নারী উভয়েরই অধিকার আছে। জাহেলিয়াতের যুগে নারীদের উত্তরাধিকার থেকে বঞ্চিত করা হতো। ইসলাম এই অবিচার দূর করেছে এবং সম্পদের পরিমাণ যাই হোক না কেন, নারী-পুরুষ উভয়ের জন্য নির্ধারিত অংশ বাধ্যতামূলক করেছে।',
      heirs: ['সকল ওয়ারিশ'],
      category: 'মূলনীতি',
      explanation: 'এটি ফারায়েজের ভিত্তি আয়াত যা সকলের অধিকার নিশ্চিত করে।'
    },
    {
      id: 2,
      surah: 'সূরা নিসা',
      ayahNumber: '১১',
      arabic: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ ۚ فَإِنْ كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِنْ كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ ۚ وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِنْ كَانَ لَهُ وَلَدٌ ۚ فَإِنْ لَمْ يَكُنْ لَهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ ۚ فَإِنْ كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ',
      bangla: 'আল্লাহ তোমাদের সন্তানদের সম্পর্কে নির্দেশ দিচ্ছেন: এক পুত্রের অংশ দুই কন্যার অংশের সমান। যদি শুধুমাত্র কন্যা হয় এবং দুইয়ের অধিক হয়, তবে তারা পাবে পরিত্যক্ত সম্পত্তির দুই তৃতীয়াংশ। আর যদি একজন কন্যা হয়, তবে তার জন্য অর্ধেক। মৃত ব্যক্তির সন্তান থাকলে তার পিতামাতার প্রত্যেকে পাবে ছয় ভাগের এক ভাগ। আর যদি তার সন্তান না থাকে এবং পিতামাতাই ওয়ারিশ হয়, তবে মাতা পাবে তিন ভাগের এক ভাগ। আর যদি তার ভাই-বোন থাকে, তবে তার মাতা পাবে ছয় ভাগের এক ভাগ।',
      tafsir: 'এই আয়াতে সন্তান ও পিতামাতার অংশ নির্ধারণ করা হয়েছে। পুত্র কন্যার দ্বিগুণ পায় কারণ ইসলামে পুরুষের উপর পরিবার ভরণপোষণের দায়িত্ব। কন্যা একক হলে ১/২, দুই বা ততোধিক হলে ২/৩। পিতামাতা প্রত্যেকে ১/৬ পায় যখন সন্তান থাকে। মা ১/৩ পায় যখন সন্তান নেই এবং ভাই-বোন ২ জনের কম থাকে।',
      heirs: ['ছেলে', 'মেয়ে', 'বাবা', 'মা'],
      category: 'সন্তান ও পিতামাতা',
      explanation: 'ফারায়েজের সবচেয়ে গুরুত্বপূর্ণ আয়াত - অধিকাংশ ওয়ারিশের অংশ এতে আছে।'
    },
    {
      id: 3,
      surah: 'সূরা নিসা',
      ayahNumber: '১২',
      arabic: 'وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِنْ لَمْ يَكُنْ لَهُنَّ وَلَدٌ ۚ فَإِنْ كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ ۚ وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِنْ لَمْ يَكُنْ لَكُمْ وَلَدٌ ۚ فَإِنْ كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُمْ ۚ وَإِنْ كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِنْهُمَا السُّدُسُ ۚ فَإِنْ كَانُوا أَكْثَرَ مِنْ ذَٰلِكَ فَهُمْ شُرَكَاءُ فِي الثُّلُثِ',
      bangla: 'তোমাদের স্ত্রীরা যা রেখে যায় তার অর্ধেক তোমাদের, যদি তাদের সন্তান না থাকে। যদি তাদের সন্তান থাকে, তবে তোমাদের জন্য চার ভাগের এক ভাগ। আর তোমরা যা রেখে যাও তার চার ভাগের এক ভাগ তাদের, যদি তোমাদের সন্তান না থাকে। যদি তোমাদের সন্তান থাকে, তবে তাদের জন্য আট ভাগের এক ভাগ। আর যদি কোন পুরুষ বা নারী কালালাহ হিসেবে উত্তরাধিকারী হয় এবং তার এক ভাই বা বোন থাকে, তবে তাদের প্রত্যেকের জন্য ছয় ভাগের এক ভাগ। যদি তারা এর অধিক হয়, তবে তারা তিন ভাগের এক ভাগে অংশীদার।',
      tafsir: 'এই আয়াতে স্বামী-স্ত্রীর অংশ এবং বৈপিত্রীয় ভাই-বোনের অংশ নির্ধারিত হয়েছে। স্বামী সন্তান না থাকলে ১/২, থাকলে ১/৪ পায়। স্ত্রী সন্তান না থাকলে ১/৪, থাকলে ১/৮ পায়। কালালাহ অর্থ এমন ব্যক্তি যার পিতা বা সন্তান নেই। বৈপিত্রীয় ভাই-বোন একাকী হলে ১/৬, একাধিক হলে ১/৩ পায়।',
      heirs: ['স্বামী', 'স্ত্রী', 'বৈপিত্রীয় ভাই', 'বৈপিত্রীয় বোন'],
      category: 'স্বামী-স্ত্রী',
      explanation: 'স্বামী-স্ত্রীর অংশ এবং বৈপিত্রীয় ভাই-বোনের বিশেষ নিয়ম এতে আছে।'
    },
    {
      id: 4,
      surah: 'সূরা নিসা',
      ayahNumber: '১৭৬',
      arabic: 'يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ ۚ إِنِ امْرُؤٌ هَلَكَ لَيْسَ لَهُ وَلَدٌ وَلَهُ أُخْتٌ فَلَهَا نِصْفُ مَا تَرَكَ ۚ وَهُوَ يَرِثُهَا إِنْ لَمْ يَكُنْ لَهَا وَلَدٌ ۚ فَإِنْ كَانَتَا اثْنَتَيْنِ فَلَهُمَا الثُّلُثَانِ مِمَّا تَرَكَ ۚ وَإِنْ كَانُوا إِخْوَةً رِجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ',
      bangla: 'তারা তোমার কাছে ফতোয়া চায়। বল, আল্লাহ তোমাদের কালালাহ সম্পর্কে ফতোয়া দিচ্ছেন: যদি কোনো ব্যক্তি মারা যায় যার সন্তান নেই কিন্তু তার এক বোন আছে, তবে সে যা রেখে গেছে তার অর্ধেক তার জন্য। আর সে (ভাই) তার (বোনের) উত্তরাধিকারী হবে যদি তার সন্তান না থাকে। যদি দুই বোন হয়, তবে তাদের জন্য সে যা রেখে গেছে তার দুই তৃতীয়াংশ। আর যদি তারা ভাই-বোন হয় পুরুষ ও নারী, তবে পুরুষের জন্য দুই নারীর অংশের সমান।',
      tafsir: 'এই আয়াত সহোদর ও বৈমাত্রীয় ভাই-বোনের অংশ বর্ণনা করে যখন পিতা ও সন্তান উভয়ই নেই। এক বোন হলে ১/২, দুই বা ততোধিক হলে ২/৩। ভাই-বোন একসাথে থাকলে ভাই বোনের দ্বিগুণ পায় (২:১ অনুপাত)। এই আয়াতে "কালালাহ" শব্দ দ্বিতীয়বার ব্যবহৃত হয়েছে যা আয়াত ১২-এর চেয়ে ভিন্ন ধরনের ভাই-বোন বোঝায়।',
      heirs: ['সহোদর ভাই', 'সহোদর বোন', 'বৈমাত্রীয় ভাই', 'বৈমাত্রীয় বোন'],
      category: 'ভাই-বোন',
      explanation: 'সহোদর ও বৈমাত্রীয় ভাই-বোনের বিস্তারিত অংশ এই আয়াতে আছে।'
    }
  ];

  const filteredAyahs = ayahs.filter(ayah =>
    ayah.surah.includes(searchTerm) ||
    ayah.bangla.includes(searchTerm) ||
    ayah.heirs.some(h => h.includes(searchTerm)) ||
    ayah.category.includes(searchTerm)
  );

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-8 md:p-12 rounded-[2rem] shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FaQuran size={32} className="text-emerald-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                কুরআনে উত্তরাধিকার
              </h1>
              <p className="text-emerald-100/80 text-sm mt-1">
                মীরাস সংক্রান্ত সম্পূর্ণ আয়াত ও তাফসীর
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 mt-6">
            <p className="text-sm text-emerald-50 leading-relaxed">
              <strong>গুরুত্ব:</strong> রাসূলুল্লাহ (ﷺ) বলেছেন: "তোমরা ফারায়েজ শিখো এবং মানুষকে শেখাও। 
              কারণ এটি জ্ঞানের অর্ধেক।" (সুনানে তিরমিযী: ২০৯৬)
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="আয়াত, ওয়ারিশ বা ক্যাটাগরি খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'মোট আয়াত', value: '৪', color: 'emerald' },
            { label: 'সূরা', value: '১', color: 'teal' },
            { label: 'জাবিল ফুরুজ', value: '১২', color: 'blue' },
            { label: 'ক্যাটাগরি', value: '৪', color: 'amber' }
          ].map((stat, i) => (
            <div key={i} className={`bg-${stat.color}-50 p-4 rounded-xl border border-${stat.color}-100`}>
              <div className={`text-2xl font-bold text-${stat.color}-700`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ayah Cards */}
        <div className="space-y-6">
          {filteredAyahs.map((ayah) => (
            <div
              key={ayah.id}
              className={`bg-white rounded-[2rem] shadow-sm border transition-all ${
                selectedAyah === ayah.id ? 'border-emerald-500 shadow-lg' : 'border-gray-100'
              }`}
            >
              {/* Card Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 rounded-t-[2rem] transition-colors"
                onClick={() => setSelectedAyah(selectedAyah === ayah.id ? null : ayah.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">
                      {ayah.ayahNumber}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{ayah.surah}: {ayah.ayahNumber}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                          {ayah.category}
                        </span>
                        {ayah.heirs.map((heir, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                            {heir}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(ayah.arabic + '\n\n' + ayah.bangla, ayah.id);
                    }}
                    className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    {copiedId === ayah.id ? (
                      <FaCheck className="text-emerald-600" />
                    ) : (
                      <FaCopy className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Arabic Text */}
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 mb-4">
                  <p className="arabic-text text-right text-amber-900 leading-loose">
                    {ayah.arabic}
                  </p>
                </div>

                {/* Bangla Translation */}
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <p className="text-emerald-900 text-justify leading-relaxed">
                    <strong>অনুবাদ:</strong> {ayah.bangla}
                  </p>
                </div>
              </div>

              {/* Expanded Content */}
              {selectedAyah === ayah.id && (
                <div className="p-6 pt-0 border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
                  {/* Tafsir */}
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FaBookOpen className="text-blue-600" />
                      <h4 className="font-bold text-blue-900">সংক্ষিপ্ত তাফসীর</h4>
                    </div>
                    <p className="text-blue-900 text-justify leading-relaxed text-sm">
                      {ayah.tafsir}
                    </p>
                  </div>

                  {/* Explanation */}
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4">
                    <p className="text-purple-900 text-sm">
                      <strong>ব্যাখ্যা:</strong> {ayah.explanation}
                    </p>
                  </div>

                  {/* Related Heirs */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">সংশ্লিষ্ট ওয়ারিশ:</h4>
                    <div className="flex flex-wrap gap-2">
                      {ayah.heirs.map((heir, i) => (
                        <span key={i} className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                          {heir}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAyahs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-gray-500">অন্য শব্দ দিয়ে খুঁজে দেখুন</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaBookOpen className="text-amber-600" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">তাফসীর সূত্র</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                এই পেজের তাফসীর তাফসীরে ইবনে কাসীর, তাফসীরে জালালাইন এবং মাআরিফুল কুরআন থেকে সংকলিত। 
                বিস্তারিত জানতে নির্ভরযোগ্য তাফসীর গ্রন্থ দেখুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranReferences;
