import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaCalculator, FaBook, FaLightbulb } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-br from-cyan-800 to-blue-900 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FaCalculator size={32} className="text-cyan-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                আউল ও রাদ্দ
              </h1>
              <p className="text-cyan-100/80 text-sm mt-1">
                বিশেষ হিসাব পদ্ধতির বিস্তারিত ব্যাখ্যা
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl font-black text-red-200 mb-1">
                <FaArrowUp className="inline" /> আউল
              </div>
              <div className="text-sm text-cyan-100">অংশ বেশি হলে বেস বৃদ্ধি</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl font-black text-green-200 mb-1">
                <FaArrowDown className="inline" /> রাদ্দ
              </div>
              <div className="text-sm text-cyan-100">সম্পদ বাকি থাকলে ফেরত</div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('awl')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${
              selectedTab === 'awl'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaArrowUp className="inline mr-2" />
            আউল (Awl)
          </button>
          <button
            onClick={() => setSelectedTab('radd')}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all ${
              selectedTab === 'radd'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaArrowDown className="inline mr-2" />
            রাদ্দ (Radd)
          </button>
        </div>

        {/* Awl Content */}
        {selectedTab === 'awl' && (
          <div className="space-y-6">
            {/* Definition */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBook className="text-red-600" />
                আউল (عول) কী?
              </h2>
              <div className="bg-red-50 p-5 rounded-xl">
                <p className="text-gray-800 leading-relaxed text-justify mb-3">
                  <strong>আউল</strong> শব্দের অর্থ "বৃদ্ধি" বা "বাড়ানো"। ফারায়েজে আউল বলা হয় যখন সব জাবিল ফুরুজের নির্ধারিত অংশ যোগ করলে ১ (পূর্ণ সম্পদ) এর বেশি হয়ে যায়।
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>উদাহরণ:</strong> স্বামী ১/২ + দুই বোন ২/৩ = ৩/৬ + ৪/৬ = ৭/৬ (১-এর বেশি!)
                </p>
              </div>
            </div>

            {/* History */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-amber-900 mb-3">📜 ঐতিহাসিক প্রেক্ষাপট</h3>
              <p className="text-amber-800 leading-relaxed mb-2">
                আউল-এর সমাধান প্রথম দেন <strong>হযরত আলী (রাঃ)</strong>, হযরত উমর (রাঃ)-এর খিলাফতকালে।
              </p>
              <p className="text-amber-700 text-sm">
                ঘটনা: একজন মহিলা মারা গেছে, ওয়ারিশ ছিল স্বামী + দুই সহোদর বোন। হযরত উমর (রাঃ) হযরত আলী (রাঃ)-কে জিজ্ঞাসা করলেন। তিনি বললেন: "বেস বাড়িয়ে দিন, সবার অংশ আনুপাতিক কমবে।"
              </p>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">বাস্তব উদাহরণ</h3>
              {awlExamples.map((example, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100">
                  <h4 className="text-lg font-bold text-red-700 mb-4">{example.title}</h4>
                  
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-red-50">
                          <th className="px-4 py-2 text-left text-sm">ওয়ারিশ</th>
                          <th className="px-4 py-2 text-left text-sm">অংশ</th>
                          <th className="px-4 py-2 text-left text-sm">বেস-এ</th>
                          {example.calculation.isAwl && (
                            <th className="px-4 py-2 text-left text-sm">আউল-এ</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {example.heirs.map((heir, i) => (
                          <tr key={i} className="border-t">
                            <td className="px-4 py-2 font-bold">{heir.name}</td>
                            <td className="px-4 py-2 text-gray-600">{heir.originalShare}</td>
                            <td className="px-4 py-2 font-mono">{heir.originalParts}</td>
                            {example.calculation.isAwl && (
                              <td className="px-4 py-2 font-mono text-red-600 font-bold">{heir.awlParts}</td>
                            )}
                          </tr>
                        ))}
                        <tr className="border-t-2 border-gray-300 font-bold">
                          <td className="px-4 py-2">মোট</td>
                          <td className="px-4 py-2"></td>
                          <td className="px-4 py-2 text-red-600">{example.calculation.total}/{example.calculation.base}</td>
                          {example.calculation.isAwl && (
                            <td className="px-4 py-2 text-green-600">{example.calculation.awlBase}/{example.calculation.awlBase}</td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${example.calculation.isAwl ? 'bg-red-50 border-l-4 border-red-500' : 'bg-green-50 border-l-4 border-green-500'}`}>
                    <p className={`text-sm ${example.calculation.isAwl ? 'text-red-800' : 'text-green-800'}`}>
                      <strong>{example.calculation.isAwl ? '⚠️ আউল হয়েছে:' : '✓ আউল হয়নি:'}</strong> {example.calculation.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Points */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-blue-600" />
                মূল পয়েন্ট
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>আউল হলে <strong>সবার অংশ আনুপাতিক কমে যায়</strong></span>
                </li>
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>বেস সংখ্যা বৃদ্ধি করে সমাধান করা হয়</span>
                </li>
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>কোনো ওয়ারিশ সম্পূর্ণ বঞ্চিত হয় না</span>
                </li>
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>সাহাবীদের ইজমা অনুযায়ী এটি সঠিক পদ্ধতি</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Radd Content */}
        {selectedTab === 'radd' && (
          <div className="space-y-6">
            {/* Definition */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBook className="text-green-600" />
                রাদ্দ (رد) কী?
              </h2>
              <div className="bg-green-50 p-5 rounded-xl">
                <p className="text-gray-800 leading-relaxed text-justify mb-3">
                  <strong>রাদ্দ</strong> শব্দের অর্থ "ফেরত দেওয়া"। ফারায়েজে রাদ্দ বলা হয় যখন জাবিল ফুরুজদের অংশ দেওয়ার পর সম্পদ উদ্বৃত্ত থাকে এবং কোনো আসাবা নেই।
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>উদাহরণ:</strong> মা ১/৬ + এক মেয়ে ১/২ = ১/৬ + ৩/৬ = ৪/৬। বাকি ২/৬ কী হবে?
                </p>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">📋 রাদ্দের শর্ত</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-purple-800">
                  <span className="text-purple-600 font-bold">১.</span>
                  <span>জাবিল ফুরুজ থাকতে হবে</span>
                </li>
                <li className="flex items-start gap-2 text-purple-800">
                  <span className="text-purple-600 font-bold">২.</span>
                  <span>কোনো আসাবা থাকবে না</span>
                </li>
                <li className="flex items-start gap-2 text-purple-800">
                  <span className="text-purple-600 font-bold">৩.</span>
                  <span><strong>স্বামী/স্ত্রী রাদ্দ পায় না</strong> (তারা থাকলে তাদের ছাড়া বাকিদের মধ্যে রাদ্দ)</span>
                </li>
                <li className="flex items-start gap-2 text-purple-800">
                  <span className="text-purple-600 font-bold">৪.</span>
                  <span>উদ্বৃত্ত সম্পদ আনুপাতিক ভাগ হবে</span>
                </li>
              </ul>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">বাস্তব উদাহরণ</h3>
              {raddExamples.map((example, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100">
                  <h4 className="text-lg font-bold text-green-700 mb-2">{example.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{example.scenario}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>মোট সম্পদ:</strong> {example.totalAssets} টাকা
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>উদ্বৃত্ত:</strong> {example.surplus} টাকা
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>রাদ্দ পদ্ধতি:</strong> {example.raddMethod}
                    </p>
                  </div>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-green-50">
                          <th className="px-3 py-2 text-left">ওয়ারিশ</th>
                          <th className="px-3 py-2 text-left">অংশ</th>
                          <th className="px-3 py-2 text-left">আসল</th>
                          <th className="px-3 py-2 text-left">রাদ্দ</th>
                          <th className="px-3 py-2 text-left">মোট</th>
                        </tr>
                      </thead>
                      <tbody>
                        {example.heirs.map((heir, i) => (
                          <tr key={i} className="border-t">
                            <td className="px-3 py-2 font-bold">{heir.name}</td>
                            <td className="px-3 py-2">{heir.originalShare}</td>
                            <td className="px-3 py-2 font-mono">{heir.originalAmount}</td>
                            <td className="px-3 py-2 font-mono text-green-600">{heir.raddAmount}</td>
                            <td className="px-3 py-2 font-mono font-bold text-blue-600">{heir.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm text-green-800">
                      <strong>ব্যাখ্যা:</strong> {example.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Points */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-blue-600" />
                মূল পয়েন্ট
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>রাদ্দ মানে <strong>উদ্বৃত্ত ফেরত দেওয়া</strong></span>
                </li>
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>শুধু জাবিল ফুরুজদের মধ্যে (আসাবা না থাকলে)</span>
                </li>
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>স্বামী/স্ত্রী রাদ্দ পায় না</span>
                </li>
                <li className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>আনুপাতিক হিসাবে ভাগ হয়</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwlRadd;
