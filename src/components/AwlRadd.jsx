import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaCalculator, FaBook, FaCheckCircle } from 'react-icons/fa';

const AwlRadd = () => {
  const [selectedTab, setSelectedTab] = useState('awl');

  const awlExamples = [
    {
      title: '৬ থেকে ৭ (সহজ উদাহরণ)',
      heirs: [
        { name: 'স্বামী', originalShare: '১/২', originalParts: '৩/৬' },
        { name: 'সহোদর বোন', originalShare: '১/২', originalParts: '৩/৬' }
      ],
      calculation: {
        base: 6,
        total: 6,
        awlBase: 6,
        isAwl: false,
        explanation: 'এটি আউল নয় কারণ মোট ৬, বেসও ৬'
      }
    },
    {
      title: '৬ থেকে ৭ (আউল)',
      heirs: [
        { name: 'স্বামী', originalShare: '১/২', originalParts: '৩/৬', awlParts: '৩/৭' },
        { name: '২ সহোদর বোন', originalShare: '২/৩', originalParts: '৪/৬', awlParts: '৪/৭' }
      ],
      calculation: {
        base: 6,
        total: 7,
        awlBase: 7,
        isAwl: true,
        explanation: 'মোট ৭ হয়ে গেছে, কিন্তু বেস ৬। তাই বেস বাড়িয়ে ৭ করা হলো।'
      }
    },
    {
      title: '১২ থেকে ১৩ (জটিল)',
      heirs: [
        { name: 'স্বামী', originalShare: '১/৪', originalParts: '৩/১২', awlParts: '৩/১৩' },
        { name: '২ মেয়ে', originalShare: '২/৩', originalParts: '৮/১২', awlParts: '৮/১৩' },
        { name: 'বাবা', originalShare: '১/৬', originalParts: '২/১২', awlParts: '২/১৩' }
      ],
      calculation: {
        base: 12,
        total: 13,
        awlBase: 13,
        isAwl: true,
        explanation: '৩ + ৮ + ২ = ১৩, কিন্তু বেস ১২। আউল হলো, বেস ১৩।'
      }
    }
  ];

  const raddExamples = [
    {
      title: 'মা + মেয়ে (রাদ্দ)',
      scenario: 'মা ১/৬, এক মেয়ে ১/২ = মোট ২/৩। বাকি ১/৩ উদ্বৃত্ত।',
      heirs: [
        { name: 'মা', originalShare: '১/৬', originalAmount: '১,০০,০০০', raddAmount: '১,৫০,০০০', total: '২,৫০,০০০' },
        { name: 'মেয়ে', originalShare: '১/২', originalAmount: '৩,০০,০০০', raddAmount: '৪,৫০,০০০', total: '৭,৫০,০০০' }
      ],
      totalAssets: '৬,০০,০০০',
      raddMethod: 'অনুপাত ১:৩ (মা:মেয়ে)',
      surplus: '২,০০,০০০',
      explanation: 'উদ্বৃত্ত ২,০০,০০০ টাকা ১:৩ অনুপাতে ভাগ: মা ৫০,০০০, মেয়ে ১,৫০,০০০'
    },
    {
      title: 'স্ত্রী + মা (রাদ্দ নেই)',
      scenario: 'স্ত্রী ১/৪, মা ১/৩ = মোট ৭/১২। বাকি ৫/১২ উদ্বৃত্ত। কিন্তু রাদ্দ হবে না।',
      heirs: [
        { name: 'স্ত্রী', originalShare: '১/৪', originalAmount: '৩,০০,০০০', raddAmount: '০', total: '৩,০০,০০০' },
        { name: 'মা', originalShare: '১/৩', originalAmount: '৪,০০,০০০', raddAmount: '০', total: '৪,০০,০০০' }
      ],
      totalAssets: '১২,০০,০০০',
      raddMethod: 'রাদ্দ প্রযোজ্য নয়',
      surplus: '৫,০০,০০০',
      explanation: 'স্বামী/স্ত্রী থাকলে তারা রাদ্দ পায় না। উদ্বৃত্ত বাইতুল মালে যাবে।'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#1a4731]/60 text-sm mb-6">
          <span>হোম</span>
          <span>/</span>
          <span className="text-[#1a4731] font-medium">আউল ও রাদ্দ</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaCalculator className="text-[#c9a84c]" size={22} />
            <h1 className="text-2xl font-bold text-[#1a4731]">আউল ও রাদ্দ</h1>
          </div>
          <p className="text-gray-600 text-sm">বিশেষ হিসাব পদ্ধতির বিস্তারিত ব্যাখ্যা ও উদাহরণ</p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setSelectedTab('awl')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              selectedTab === 'awl'
                ? 'bg-[#1a4731] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-[#e2ddd5]'
            }`}
          >
            <FaArrowUp size={13} />
            আউল (Awl)
          </button>
          <button
            onClick={() => setSelectedTab('radd')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              selectedTab === 'radd'
                ? 'bg-[#1a4731] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-[#e2ddd5]'
            }`}
          >
            <FaArrowDown size={13} />
            রাদ্দ (Radd)
          </button>
        </div>

        {/* Awl Content */}
        {selectedTab === 'awl' && (
          <div className="space-y-5">
            {/* Definition */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FaBook className="text-[#c9a84c]" size={16} />
                <h2 className="font-bold text-[#1a4731]">আউল (عول) কী?</h2>
              </div>
              <blockquote className="border-l-2 border-[#1a4731] pl-4 mb-3">
                <p className="text-gray-700 text-sm leading-relaxed text-justify">
                  <strong>আউল</strong> শব্দের অর্থ "বৃদ্ধি" বা "বাড়ানো"। ফারায়েজে আউল বলা হয় যখন সব জাবিল ফুরুজের নির্ধারিত অংশ যোগ করলে ১ (পূর্ণ সম্পদ) এর বেশি হয়ে যায়।
                </p>
              </blockquote>
              <p className="text-gray-600 text-sm bg-[#f7f5f0] px-4 py-2 rounded-lg">
                <strong>উদাহরণ:</strong> স্বামী ১/২ + দুই বোন ২/৩ = ৩/৬ + ৪/৬ = ৭/৬ (১-এর বেশি!)
              </p>
            </div>

            {/* Historical note */}
            <div className="border-l-4 border-[#c9a84c] bg-white rounded-xl p-5 shadow-sm border border-[#e2ddd5]">
              <div className="flex items-center gap-2 mb-2">
                <FaBook className="text-[#c9a84c]" size={14} />
                <h3 className="font-bold text-[#1a4731] text-sm">ঐতিহাসিক প্রেক্ষাপট</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                আউল-এর সমাধান প্রথম দেন <strong>হযরত আলী (রাঃ)</strong>, হযরত উমর (রাঃ)-এর খিলাফতকালে।
              </p>
              <p className="text-gray-600 text-sm">
                ঘটনা: একজন মহিলা মারা গেছে, ওয়ারিশ ছিল স্বামী + দুই সহোদর বোন। হযরত উমর (রাঃ) হযরত আলী (রাঃ)-কে জিজ্ঞাসা করলেন। তিনি বললেন: "বেস বাড়িয়ে দিন, সবার অংশ আনুপাতিক কমবে।"
              </p>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#1a4731]">বাস্তব উদাহরণ</h3>
              {awlExamples.map((example, index) => (
                <div key={index} className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                  <h4 className="font-bold text-[#1a4731] mb-4 text-sm">{example.title}</h4>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e2ddd5]">
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">ওয়ারিশ</th>
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">অংশ</th>
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">বেস-এ</th>
                          {example.calculation.isAwl && (
                            <th className="px-3 py-2 text-left text-gray-500 font-medium">আউল-এ</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {example.heirs.map((heir, i) => (
                          <tr key={i} className="border-b border-[#e2ddd5] last:border-0">
                            <td className="px-3 py-2 font-medium text-[#1a4731]">{heir.name}</td>
                            <td className="px-3 py-2 text-gray-600">{heir.originalShare}</td>
                            <td className="px-3 py-2 font-mono text-gray-700">{heir.originalParts}</td>
                            {example.calculation.isAwl && (
                              <td className="px-3 py-2 font-mono font-bold text-[#1a4731]">{heir.awlParts}</td>
                            )}
                          </tr>
                        ))}
                        <tr className="border-t-2 border-[#e2ddd5]">
                          <td className="px-3 py-2 font-bold text-[#1a4731]">মোট</td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2 font-mono font-bold text-gray-700">{example.calculation.total}/{example.calculation.base}</td>
                          {example.calculation.isAwl && (
                            <td className="px-3 py-2 font-mono font-bold text-[#1a4731]">{example.calculation.awlBase}/{example.calculation.awlBase}</td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`flex items-start gap-2 p-3 rounded-lg text-sm ${example.calculation.isAwl ? 'bg-amber-50 border-l-2 border-amber-400' : 'bg-[#e8f0eb] border-l-2 border-[#1a4731]'}`}>
                    {example.calculation.isAwl ? (
                      <FaArrowUp className="text-amber-600 flex-shrink-0 mt-0.5" size={12} />
                    ) : (
                      <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={12} />
                    )}
                    <span className={example.calculation.isAwl ? 'text-amber-800' : 'text-[#1a4731]'}>
                      <strong>{example.calculation.isAwl ? 'আউল হয়েছে:' : 'আউল হয়নি:'}</strong> {example.calculation.explanation}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Points */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[#1a4731] mb-3 text-sm">মূল পয়েন্ট</h3>
              <ul className="space-y-2">
                {[
                  'আউল হলে সবার অংশ আনুপাতিক কমে যায়',
                  'বেস সংখ্যা বৃদ্ধি করে সমাধান করা হয়',
                  'কোনো ওয়ারিশ সম্পূর্ণ বঞ্চিত হয় না',
                  'সাহাবীদের ইজমা অনুযায়ী এটি সঠিক পদ্ধতি'
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={12} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Radd Content */}
        {selectedTab === 'radd' && (
          <div className="space-y-5">
            {/* Definition */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FaBook className="text-[#c9a84c]" size={16} />
                <h2 className="font-bold text-[#1a4731]">রাদ্দ (رد) কী?</h2>
              </div>
              <blockquote className="border-l-2 border-[#1a4731] pl-4 mb-3">
                <p className="text-gray-700 text-sm leading-relaxed text-justify">
                  <strong>রাদ্দ</strong> শব্দের অর্থ "ফেরত দেওয়া"। ফারায়েজে রাদ্দ বলা হয় যখন জাবিল ফুরুজদের অংশ দেওয়ার পর সম্পদ উদ্বৃত্ত থাকে এবং কোনো আসাবা নেই।
                </p>
              </blockquote>
              <p className="text-gray-600 text-sm bg-[#f7f5f0] px-4 py-2 rounded-lg">
                <strong>উদাহরণ:</strong> মা ১/৬ + এক মেয়ে ১/২ = ১/৬ + ৩/৬ = ৪/৬। বাকি ২/৬ কী হবে?
              </p>
            </div>

            {/* Conditions */}
            <div className="border-l-4 border-[#c9a84c] bg-white rounded-xl p-5 shadow-sm border border-[#e2ddd5]">
              <h3 className="font-bold text-[#1a4731] text-sm mb-3">রাদ্দের শর্ত</h3>
              <ol className="space-y-2">
                {[
                  'জাবিল ফুরুজ থাকতে হবে',
                  'কোনো আসাবা থাকবে না',
                  'স্বামী/স্ত্রী রাদ্দ পায় না (তারা থাকলে তাদের ছাড়া বাকিদের মধ্যে রাদ্দ)',
                  'উদ্বৃত্ত সম্পদ আনুপাতিক ভাগ হবে'
                ].map((cond, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="text-[#1a4731] font-bold flex-shrink-0">{i + 1}.</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#1a4731]">বাস্তব উদাহরণ</h3>
              {raddExamples.map((example, index) => (
                <div key={index} className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                  <h4 className="font-bold text-[#1a4731] mb-2 text-sm">{example.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{example.scenario}</p>

                  <div className="bg-[#f7f5f0] rounded-lg p-3 mb-4 text-sm space-y-1">
                    <p className="text-gray-700"><span className="font-medium">মোট সম্পদ:</span> {example.totalAssets} টাকা</p>
                    <p className="text-gray-700"><span className="font-medium">উদ্বৃত্ত:</span> {example.surplus} টাকা</p>
                    <p className="text-gray-700"><span className="font-medium">রাদ্দ পদ্ধতি:</span> {example.raddMethod}</p>
                  </div>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e2ddd5]">
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">ওয়ারিশ</th>
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">অংশ</th>
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">আসল</th>
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">রাদ্দ</th>
                          <th className="px-3 py-2 text-left text-gray-500 font-medium">মোট</th>
                        </tr>
                      </thead>
                      <tbody>
                        {example.heirs.map((heir, i) => (
                          <tr key={i} className="border-b border-[#e2ddd5] last:border-0">
                            <td className="px-3 py-2 font-medium text-[#1a4731]">{heir.name}</td>
                            <td className="px-3 py-2 text-gray-600">{heir.originalShare}</td>
                            <td className="px-3 py-2 font-mono text-gray-700">{heir.originalAmount}</td>
                            <td className="px-3 py-2 font-mono text-[#1a4731]">{heir.raddAmount}</td>
                            <td className="px-3 py-2 font-mono font-bold text-[#1a4731]">{heir.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-l-2 border-[#1a4731] pl-3 bg-[#e8f0eb] py-2 pr-3 rounded-r-lg">
                    <p className="text-[#1a4731] text-sm">
                      <strong>ব্যাখ্যা:</strong> {example.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Points */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[#1a4731] mb-3 text-sm">মূল পয়েন্ট</h3>
              <ul className="space-y-2">
                {[
                  'রাদ্দ মানে উদ্বৃত্ত ফেরত দেওয়া',
                  'শুধু জাবিল ফুরুজদের মধ্যে (আসাবা না থাকলে)',
                  'স্বামী/স্ত্রী রাদ্দ পায় না',
                  'আনুপাতিক হিসাবে ভাগ হয়'
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={12} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AwlRadd;
