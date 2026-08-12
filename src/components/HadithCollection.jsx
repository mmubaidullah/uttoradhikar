import { useState } from 'react';
import { FaBookmark, FaSearch, FaStar, FaChevronDown } from 'react-icons/fa';

const HadithCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const hadiths = [
    {
      id: 1,
      title: 'ফারায়েজ শিক্ষার গুরুত্ব',
      arabic: 'تَعَلَّمُوا الْفَرَائِضَ وَعَلِّمُوهَا النَّاسَ فَإِنَّهَا نِصْفُ الْعِلْمِ وَهُوَ يُنْسَى وَهُوَ أَوَّلُ شَيْءٍ يُنْتَزَعُ مِنْ أُمَّتِي',
      bangla: 'তোমরা ফারায়েজ (উত্তরাধিকার বিধান) শিখো এবং মানুষকে শেখাও। কারণ এটি জ্ঞানের অর্ধেক এবং এটি ভুলে যাওয়া হবে এবং এটিই প্রথম জিনিস যা আমার উম্মত থেকে উঠিয়ে নেওয়া হবে।',
      source: 'সুনানে ইবনে মাজাহ: ২৭১৯, সুনানে তিরমিযী: ২০৯৬',
      grade: 'হাসান',
      narrator: 'আবু হুরাইরা (রাঃ)',
      explanation: 'এই হাদিস থেকে বোঝা যায় ফারায়েজ শিক্ষা করা কতটা গুরুত্বপূর্ণ। রাসূলুল্লাহ (ﷺ) এটিকে জ্ঞানের অর্ধেক বলেছেন এবং সতর্ক করেছেন যে ভবিষ্যতে এই জ্ঞান হারিয়ে যাবে।',
      masala: ['ফারায়েজ শিক্ষা ফরজে কিফায়া', 'সমাজে বিশেষজ্ঞ থাকা আবশ্যক'],
      category: 'গুরুত্ব',
      importance: 5
    },
    {
      id: 2,
      title: 'আসাবা - অবশিষ্টাংশ ভোগী',
      arabic: 'أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا فَمَا بَقِيَ فَهُوَ لأَوْلَى رَجُلٍ ذَكَرٍ',
      bangla: 'নির্ধারিত অংশগুলো তাদের হকদারদের দিয়ে দাও। এরপর যা অবশিষ্ট থাকে তা সবচেয়ে নিকটবর্তী পুরুষ আত্মীয়ের জন্য।',
      source: 'সহিহ বুখারী: ৬৭৩২, সহিহ মুসলিম: ১৬১৫',
      grade: 'সহিহ',
      narrator: 'ইবনে আব্বাস (রাঃ)',
      explanation: 'এটি আসাবা (অবশিষ্টাংশ ভোগী) সিস্টেমের মূল হাদিস। প্রথমে জাবিল ফুরুজ (নির্ধারিত অংশীদার) তাদের অংশ পাবে, তারপর যা বাকি থাকবে তা আসাবা পাবে। আসাবা হলো পুরুষ আত্মীয় যারা নিকটতম থেকে দূরবর্তী ক্রম অনুসারে অগ্রাধিকার পায়।',
      masala: ['পুত্র প্রথম আসাবা', 'বাবা দ্বিতীয় আসাবা', 'দাদা তৃতীয় আসাবা', 'ভাই চতুর্থ আসাবা'],
      category: 'আসাবা',
      importance: 5
    },
    {
      id: 3,
      title: 'মেয়েদের সাথে বোনদের আসাবা',
      arabic: 'اجْعَلُوا الأَخَوَاتِ مَعَ الْبَنَاتِ عَصَبَةً',
      bangla: 'কন্যাদের সাথে বোনদের আসাবা (অবশিষ্টাংশভোগী) বানাও।',
      source: 'সহিহ বুখারী: ৬৭৩৬',
      grade: 'সহিহ',
      narrator: 'ইবনে মাসউদ (রাঃ)',
      explanation: 'সাধারণত বোনেরা জাবিল ফুরুজ (নির্ধারিত অংশ) পায়। কিন্তু যখন কন্যা (মেয়ে) থাকে এবং কোনো ছেলে নেই, তখন বোনেরা আসাবা হয়ে যায় এবং অবশিষ্ট সম্পদ পায়। এটি একটি বিশেষ নিয়ম যা শুধু এই পরিস্থিতিতে প্রযোজ্য।',
      masala: ['মেয়ে + সহোদর বোন = বোন আসাবা হয়', 'এতে বোন নির্ধারিত অংশ পায় না', 'অবশিষ্ট সব পায়'],
      category: 'আসাবা',
      importance: 4
    },
    {
      id: 4,
      title: 'হত্যাকারী বঞ্চিত',
      arabic: 'لَيْسَ لِلْقَاتِلِ مِيرَاثٌ',
      bangla: 'হত্যাকারীর জন্য উত্তরাধিকার নেই।',
      source: 'সুনানে আবু দাউদ: ২৮৭৫, সুনানে নাসাঈ: ৪৮৬৯',
      grade: 'সহিহ',
      narrator: 'আবু হুরাইরা (রাঃ)',
      explanation: 'যে ব্যক্তি তার আত্মীয়কে হত্যা করে, সে উক্ত ব্যক্তির সম্পদের ওয়ারিশ হতে পারবে না - এমনকি সে নিকটাত্মীয় হলেও। এটি একটি দণ্ডমূলক বিধান যাতে মানুষ দ্রুত সম্পদ পাওয়ার জন্য হত্যা না করে। ইচ্ছাকৃত বা ভুলবশত উভয় ধরনের হত্যা এতে অন্তর্ভুক্ত (হানাফি মাযহাব অনুযায়ী)।',
      masala: ['ইচ্ছাকৃত হত্যা - বঞ্চিত', 'অনিচ্ছাকৃত হত্যা - বঞ্চিত (হানাফি)', 'আত্মরক্ষায় হত্যা - মতভেদ আছে'],
      category: 'বঞ্চনা',
      importance: 5
    },
    {
      id: 5,
      title: 'ধর্ম ভিন্নতায় বঞ্চনা',
      arabic: 'لَا يَرِثُ الْمُسْلِمُ الْكَافِرَ وَلَا الْكَافِرُ الْمُسْلِمَ',
      bangla: 'মুসলিম কাফেরের ওয়ারিশ হয় না এবং কাফের মুসলিমের ওয়ারিশ হয় না।',
      source: 'সহিহ বুখারী: ৬৭৬৪, সহিহ মুসলিম: ১৬১৪',
      grade: 'সহিহ',
      narrator: 'উসামা ইবনে যায়েদ (রাঃ)',
      explanation: 'ইসলামে উত্তরাধিকার পাওয়ার জন্য উভয়ের ধর্ম একই হতে হবে। মুসলিম পিতা অমুসলিম সন্তানের সম্পদে ওয়ারিশ হবে না, এবং অমুসলিম পিতা মুসলিম সন্তানের সম্পদে ওয়ারিশ হবে না। তবে অসিয়ত (Will) এর মাধ্যমে ১/৩ পর্যন্ত দেওয়া যায়।',
      masala: ['মুসলিম→অমুসলিম: ওয়ারিশ নয়', 'অমুসলিম→মুসলিম: ওয়ারিশ নয়', 'অসিয়ত করা যায় (১/৩ পর্যন্ত)'],
      category: 'বঞ্চনা',
      importance: 5
    },
    {
      id: 6,
      title: 'ঋণ পরিশোধ প্রথম',
      arabic: 'لَا وَصِيَّةَ لِوَارِثٍ إِلَّا بِإِذْنِ الْوَرَثَةِ',
      bangla: 'ওয়ারিশদের অনুমতি ছাড়া ওয়ারিশদের জন্য অসিয়ত নেই।',
      source: 'সুনানে তিরমিযী: ২১২০, সুনানে ইবনে মাজাহ: ২৭১৩',
      grade: 'হাসান',
      narrator: 'আমর ইবনুল আস (রাঃ)',
      explanation: 'মৃত ব্যক্তির সম্পদ থেকে প্রথমে তার দাফন-কাফনের খরচ, তারপর ঋণ পরিশোধ করতে হবে। এরপর অসিয়ত (যদি থাকে) পূরণ করতে হবে - তবে তা মোট সম্পদের ১/৩-এর বেশি হতে পারবে না। সবশেষে অবশিষ্ট সম্পদ ওয়ারিশদের মধ্যে বন্টন হবে।',
      masala: ['১. দাফন খরচ', '২. ঋণ পরিশোধ', '৩. অসিয়ত (১/৩ পর্যন্ত)', '৪. ওয়ারিশদের অংশ'],
      category: 'পূর্বশর্ত',
      importance: 5
    },
    {
      id: 7,
      title: 'অসিয়ত সীমা',
      arabic: 'الثُّلُثُ وَالثُّلُثُ كَثِيرٌ',
      bangla: 'এক তৃতীয়াংশ, এবং এক তৃতীয়াংশও অনেক।',
      source: 'সহিহ বুখারী: ২৭৪৪, সহিহ মুসলিম: ১৬২৮',
      grade: 'সহিহ',
      narrator: 'সাদ ইবনে আবি ওয়াক্কাস (রাঃ)',
      explanation: 'রাসূলুল্লাহ (ﷺ) সাদ (রাঃ)-কে বলেছিলেন যে অসিয়ত সর্বোচ্চ ১/৩ পর্যন্ত করা উচিত এবং তাও অনেক। এর বেশি করলে ওয়ারিশদের অধিকার ক্ষুণ্ণ হয়। ১/৩-এর বেশি অসিয়ত শুধুমাত্র ওয়ারিশদের সম্মতিতে কার্যকর হবে।',
      masala: ['সর্বোচ্চ সীমা: ১/৩', '১/৩-এর বেশি: ওয়ারিশদের সম্মতি লাগবে', 'কম করা উত্তম'],
      category: 'অসিয়ত',
      importance: 4
    },
    {
      id: 8,
      title: 'পুত্রের অংশ দ্বিগুণ',
      arabic: 'لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ',
      bangla: 'পুরুষের জন্য দুই নারীর অংশের সমান।',
      source: 'সূরা নিসা: ১১ (কুরআন)',
      grade: 'কুরআন',
      narrator: 'আল্লাহর বাণী',
      explanation: 'এটি কুরআনের আয়াত যা হাদিসেও বর্ণিত হয়েছে। পুত্র কন্যার দ্বিগুণ পায় কারণ ইসলামে পুরুষের উপর পরিবার ভরণপোষণ, মোহরানা দেওয়া ও যুদ্ধে অংশগ্রহণের দায়িত্ব আছে। নারী তার সম্পদ সম্পূর্ণ নিজের জন্য রাখতে পারে।',
      masala: ['ছেলে-মেয়ে একসাথে: ২:১', 'শুধু মেয়ে: তাদের নির্ধারিত অংশ', 'শুধু ছেলে: পুরো সম্পদ'],
      category: 'নির্ধারিত অংশ',
      importance: 5
    },
    {
      id: 9,
      title: 'মায়ের সম্মান',
      arabic: 'إِنَّ اللَّهَ يُوصِيكُمْ بِأُمَّهَاتِكُمْ',
      bangla: 'নিশ্চয়ই আল্লাহ তোমাদের মায়েদের ব্যাপারে তোমাদের উপদেশ দিচ্ছেন।',
      source: 'সহিহ বুখারী: ৫৯৭১',
      grade: 'সহিহ',
      narrator: 'আবু হুরাইরা (রাঃ)',
      explanation: 'মা হলো সবচেয়ে সম্মানিত ব্যক্তি এবং ফারায়েজেও তার বিশেষ স্থান আছে। মা সবসময় নির্ধারিত অংশ পায় - বঞ্চিত হয় না। সন্তান থাকলে ১/৬, না থাকলে ১/৩ (কিছু ক্ষেত্রে অবশিষ্টের ১/৩)।',
      masala: ['সন্তান থাকলে: ১/৬', 'সন্তান না থাকলে: ১/৩', 'গারাভাইন মাসআলায়: অবশিষ্টের ১/৩'],
      category: 'নির্ধারিত অংশ',
      importance: 5
    },
    {
      id: 10,
      title: 'ন্যায়বিচার',
      arabic: 'اعْدِلُوا بَيْنَ أَوْلَادِكُمْ',
      bangla: 'তোমরা তোমাদের সন্তানদের মধ্যে ইনসাফ কর।',
      source: 'সুনানে আবু দাউদ: ৩৫৪৪',
      grade: 'সহিহ',
      narrator: 'নুমান ইবনে বশীর (রাঃ)',
      explanation: 'জীবদ্দশায় সন্তানদের মধ্যে দান-হাদিয়াতে ন্যায়বিচার করা আবশ্যক। তবে মৃত্যুর পর উত্তরাধিকার আল্লাহর নির্ধারিত নিয়ম অনুযায়ী হবে। কেউ জীবিত অবস্থায় কাউকে বেশি দিয়ে রাখলে তা অন্যায়।',
      masala: ['জীবদ্দশায় দান: সমান হতে হবে', 'মৃত্যুর পর: শরীয়াহ অনুযায়ী', 'অন্যায় করলে পাপ হবে'],
      category: 'ন্যায়বিচার',
      importance: 4
    }
  ];

  const categories = [
    { id: 'all', name: 'সব', count: hadiths.length },
    { id: 'গুরুত্ব', name: 'গুরুত্ব', count: hadiths.filter(h => h.category === 'গুরুত্ব').length },
    { id: 'আসাবা', name: 'আসাবা', count: hadiths.filter(h => h.category === 'আসাবা').length },
    { id: 'বঞ্চনা', name: 'বঞ্চনা', count: hadiths.filter(h => h.category === 'বঞ্চনা').length },
    { id: 'নির্ধারিত অংশ', name: 'নির্ধারিত অংশ', count: hadiths.filter(h => h.category === 'নির্ধারিত অংশ').length },
    { id: 'পূর্বশর্ত', name: 'পূর্বশর্ত', count: hadiths.filter(h => h.category === 'পূর্বশর্ত').length },
    { id: 'অসিয়ত', name: 'অসিয়ত', count: hadiths.filter(h => h.category === 'অসিয়ত').length },
  ];

  const filteredHadiths = hadiths.filter(hadith => {
    const matchesCategory = selectedCategory === 'all' || hadith.category === selectedCategory;
    const matchesSearch = hadith.title.includes(searchTerm) ||
                          hadith.bangla.includes(searchTerm) ||
                          hadith.explanation.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const gradeStyle = (grade) => {
    if (grade === 'সহিহ') return 'bg-[#1a4731]/8 text-[#1a4731]';
    if (grade === 'হাসান') return 'bg-amber-100 text-amber-700';
    return 'bg-[#1a4731]/8 text-[#1a4731]';
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#1a4731]/60 text-sm mb-6">
          <span>হোম</span>
          <span>/</span>
          <span className="text-[#1a4731] font-medium">হাদিস সংকলন</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaBookmark className="text-[#c9a84c]" size={22} />
            <h1 className="text-2xl font-bold text-[#1a4731]">হাদিস সংকলন</h1>
          </div>
          <p className="text-gray-600 text-sm">মীরাস সংক্রান্ত সহিহ হাদিসসমূহ — বিস্তারিত ব্যাখ্যাসহ</p>
        </div>

        {/* Search */}
        <div className="bg-white border border-[#e2ddd5] rounded-xl p-4 mb-4 shadow-sm">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="হাদিস খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#e2ddd5] rounded-lg text-sm focus:outline-none focus:border-[#1a4731] bg-white"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1a4731] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-[#e2ddd5]'
              }`}
            >
              {cat.name}
              <span className={`ml-1.5 text-xs ${selectedCategory === cat.id ? 'text-white/70' : 'text-gray-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Hadith Cards */}
        <div className="space-y-4">
          {filteredHadiths.map((hadith) => (
            <div key={hadith.id} className="bg-white border border-[#e2ddd5] rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-[#1a4731] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {hadith.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1a4731] text-base mb-2">{hadith.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#1a4731]/8 text-[#1a4731] px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {hadith.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${gradeStyle(hadith.grade)}`}>
                        {hadith.grade}
                      </span>
                      <span className="flex items-center gap-0.5">
                        {Array(hadith.importance).fill(0).map((_, i) => (
                          <FaStar key={i} className="text-amber-400" size={11} />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arabic */}
                <div className="bg-[#f7f5f0] p-5 rounded-lg mb-4">
                  <p className="arabic-text text-right text-[#1a4731] leading-loose">
                    {hadith.arabic}
                  </p>
                </div>

                {/* Bangla Translation */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  <span className="font-medium text-[#1a4731]">অনুবাদ:</span> {hadith.bangla}
                </p>

                {/* Source */}
                <div className="flex items-start gap-2 mb-4 text-xs text-gray-500">
                  <span className="font-medium text-[#1a4731]">সূত্র:</span>
                  <span>{hadith.source}</span>
                  <span>·</span>
                  <span>{hadith.narrator}</span>
                </div>

                {/* Explanation */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 text-justify">
                  {hadith.explanation}
                </p>

                {/* Masala */}
                <div className="border-t border-[#e2ddd5] pt-3">
                  <p className="text-xs font-medium text-[#1a4731] mb-2">সংশ্লিষ্ট মাসআলা:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {hadith.masala.map((m, i) => (
                      <span key={i} className="bg-[#f7f5f0] text-gray-600 px-2.5 py-1 rounded-lg text-xs">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHadiths.length === 0 && (
          <div className="text-center py-12 bg-white border border-[#e2ddd5] rounded-xl">
            <FaBookmark className="text-gray-300 mx-auto mb-4" size={48} />
            <h3 className="font-bold text-[#1a4731] mb-1">কোনো হাদিস পাওয়া যায়নি</h3>
            <p className="text-gray-600 text-sm">অন্য ক্যাটাগরি বা শব্দ ব্যবহার করুন</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default HadithCollection;
