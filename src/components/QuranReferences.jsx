import { useState } from 'react';
import { FaQuran, FaBookOpen, FaSearch, FaCopy, FaCheck, FaChevronDown } from 'react-icons/fa';

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
    <div className="min-h-screen bg-[#f7f5f0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaQuran className="text-[#c9a84c]" size={24} />
            <h1 className="text-2xl font-bold text-[#1a4731]">কুরআনে উত্তরাধিকার</h1>
          </div>
          <p className="text-gray-600 text-sm">মীরাস সংক্রান্ত সম্পূর্ণ আয়াত ও তাফসীর — সূরা নিসা</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-[#e2ddd5] rounded-xl p-4 mb-6 shadow-sm">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="আয়াত, ওয়ারিশ বা ক্যাটাগরি খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#e2ddd5] rounded-lg text-sm focus:outline-none focus:border-[#1a4731] bg-white"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: 'মোট আয়াত', value: '৪' },
            { label: 'সূরা', value: '১' },
            { label: 'জাবিল ফুরুজ', value: '১২' },
            { label: 'ক্যাটাগরি', value: '৪' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-[#e2ddd5] rounded-xl p-4 shadow-sm text-center">
              <div className="text-xl font-bold text-[#1a4731]">{stat.value}</div>
              <div className="text-gray-600 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ayah Cards */}
        <div className="space-y-4">
          {filteredAyahs.map((ayah) => (
            <div
              key={ayah.id}
              className={`bg-white border rounded-xl shadow-sm transition-all ${
                selectedAyah === ayah.id ? 'border-[#1a4731]' : 'border-[#e2ddd5]'
              }`}
            >
              {/* Card Header — always visible */}
              <div
                className="p-5 cursor-pointer"
                onClick={() => setSelectedAyah(selectedAyah === ayah.id ? null : ayah.id)}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-9 h-9 bg-[#1a4731] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {ayah.ayahNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a4731] text-base">
                        {ayah.surah}: আয়াত {ayah.ayahNumber}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-[#1a4731]/8 text-[#1a4731] px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {ayah.category}
                        </span>
                        {ayah.heirs.map((heir, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs">
                            {heir}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(ayah.arabic + '\n\n' + ayah.bangla, ayah.id);
                      }}
                      className="p-2 hover:bg-[#f7f5f0] rounded-lg transition-colors"
                      title="কপি করুন"
                    >
                      {copiedId === ayah.id ? (
                        <FaCheck className="text-[#1a4731]" size={13} />
                      ) : (
                        <FaCopy className="text-gray-400" size={13} />
                      )}
                    </button>
                    <FaChevronDown
                      className={`text-gray-400 transition-transform ${selectedAyah === ayah.id ? 'rotate-180' : ''}`}
                      size={14}
                    />
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="bg-[#f7f5f0] p-5 rounded-lg mb-3">
                  <p className="arabic-text text-right text-[#1a4731] leading-loose text-lg">
                    {ayah.arabic}
                  </p>
                </div>

                {/* Bengali Translation */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="font-medium text-[#1a4731]">অনুবাদ:</span> {ayah.bangla}
                </p>
              </div>

              {/* Expanded Content */}
              {selectedAyah === ayah.id && (
                <div className="px-5 pb-5 border-t border-[#e2ddd5]">
                  <div className="pt-4 space-y-4">
                    {/* Tafsir */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FaBookOpen className="text-[#c9a84c]" size={14} />
                        <h4 className="font-bold text-[#1a4731] text-sm">সংক্ষিপ্ত তাফসীর</h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        {ayah.tafsir}
                      </p>
                    </div>

                    {/* Explanation */}
                    <blockquote className="border-l-2 border-[#c9a84c] pl-4 py-1">
                      <p className="text-gray-600 text-sm italic">{ayah.explanation}</p>
                    </blockquote>

                    {/* Related Heirs */}
                    <div>
                      <h4 className="font-medium text-[#1a4731] text-sm mb-2">সংশ্লিষ্ট ওয়ারিশ:</h4>
                      <div className="flex flex-wrap gap-2">
                        {ayah.heirs.map((heir, i) => (
                          <span key={i} className="bg-[#e8f0eb] text-[#1a4731] px-3 py-1 rounded-lg text-xs font-medium">
                            {heir}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAyahs.length === 0 && (
          <div className="text-center py-12 bg-white border border-[#e2ddd5] rounded-xl">
            <FaQuran className="text-gray-300 mx-auto mb-4" size={48} />
            <h3 className="font-bold text-[#1a4731] mb-1">কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-gray-600 text-sm">অন্য শব্দ দিয়ে খুঁজে দেখুন</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-[#1a4731]/8 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaBookOpen className="text-[#1a4731]" size={14} />
            </div>
            <div>
              <h4 className="font-bold text-[#1a4731] text-sm mb-1">তাফসীর সূত্র</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
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
