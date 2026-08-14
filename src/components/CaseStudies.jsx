import { useState } from 'react';
import { FaBook, FaUsers, FaCalculator, FaCheckCircle, FaLightbulb } from 'react-icons/fa';

const CaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: 1,
      title: 'সাধারণ পরিবার - স্বামী, ২ ছেলে, ১ মেয়ে',
      difficulty: 'সহজ',
      difficultyColor: 'green',
      scenario: {
        deceased: 'জনাব আবদুল্লাহ (মৃত)',
        assets: '১০,০০,০০০ টাকা',
        heirs: ['স্ত্রী - আমিনা', 'ছেলে - মুহাম্মদ', 'ছেলে - আহমদ', 'মেয়ে - ফাতিমা']
      },
      solution: {
        step1: {
          title: 'জাবিল ফুরুজ চিহ্নিত করা',
          content: 'স্ত্রী আমিনা একমাত্র জাবিল ফুরুজ। সন্তান থাকায় তিনি ১/৮ পাবেন।',
          calculation: '১০,০০,০০০ × ১/৮ = ১,২৫,০০০ টাকা'
        },
        step2: {
          title: 'আসাবা চিহ্নিত করা',
          content: 'বাকি ৩ জন (২ ছেলে, ১ মেয়ে) আসাবা হবে। অনুপাত ২:১ (ছেলে:মেয়ে)',
          calculation: 'অবশিষ্ট = ১০,০০,০০০ - ১,২৫,০০০ = ৮,৭৫,০০০ টাকা'
        },
        step3: {
          title: 'আসাবা বন্টন',
          content: 'মোট ভাগ = (২ ছেলে × ২) + (১ মেয়ে × ১) = ৫ ভাগ',
          calculation: [
            'প্রতি ভাগ = ৮,৭৫,০০০ ÷ ৫ = ১,৭৫,০০০',
            'প্রতি ছেলে = ১,৭৫,০০০ × ২ = ৩,৫০,০০০ টাকা',
            'মেয়ে = ১,৭৫,০০০ × ১ = ১,৭৫,০০০ টাকা'
          ]
        },
        finalDistribution: [
          { name: 'স্ত্রী (আমিনা)', share: '১/৮', amount: '১,২৫,০০০', percentage: '১২.৫%' },
          { name: 'ছেলে (মুহাম্মদ)', share: 'আসাবা', amount: '৩,৫০,০০০', percentage: '৩৫%' },
          { name: 'ছেলে (আহমদ)', share: 'আসাবা', amount: '৩,৫০,০০০', percentage: '৩৫%' },
          { name: 'মেয়ে (ফাতিমা)', share: 'আসাবা', amount: '১,৭৫,০০০', percentage: '১৭.৫%' }
        ],
        verification: 'মোট = ১,২৫,০০০ + ৩,৫০,০০০ + ৩,৫০,০০০ + ১,৭৫,০০০ = ১০,০০,০০০ ✓',
        lessons: [
          'স্ত্রী সন্তান থাকায় ১/৮ পেয়েছে',
          'ছেলে-মেয়ে একসাথে থাকলে ২:১ অনুপাত',
          'আসাবায় কোনো নির্ধারিত ভগ্নাংশ নেই, অবশিষ্ট সব পায়'
        ]
      }
    },
    {
      id: 2,
      title: 'শুধু মেয়ে - কোনো ছেলে নেই',
      difficulty: 'মাঝারি',
      difficultyColor: 'amber',
      scenario: {
        deceased: 'জনাবা খাদিজা (মৃত)',
        assets: '৬,০০,০০০ টাকা',
        heirs: ['স্বামী - ইউসুফ', 'মেয়ে - মারিয়াম', 'মেয়ে - আয়েশা', 'বাবা - আলী']
      },
      solution: {
        step1: {
          title: 'বেস নির্ণয়',
          content: 'স্বামী (১/৪), ২ মেয়ে (২/৩), বাবা (১/৬) = LCM(৪,৩,৬) = ১২',
          calculation: 'বেস = ১২'
        },
        step2: {
          title: 'জাবিল ফুরুজ হিসাব',
          content: 'প্রত্যেকের অংশ নির্ণয়',
          calculation: [
            'স্বামী = ১/৪ = ১২/৪ = ৩',
            '২ মেয়ে = ২/৩ = ১২/৩ × ২ = ৮',
            'বাবা = ১/৬ = ১২/৬ = ২',
            'মোট = ৩ + ৮ + ২ = ১৩'
          ]
        },
        step3: {
          title: 'আউল (Awl) হচ্ছে',
          content: 'মোট ১৩, কিন্তু বেস ১২। এটি আউল। বেস বাড়িয়ে ১৩ করা হবে।',
          calculation: 'নতুন বেস = ১৩'
        },
        step4: {
          title: 'চূড়ান্ত বন্টন',
          content: 'প্রতিটি অংশ × (৬,০০,০০০ ÷ ১৩)',
          calculation: [
            'স্বামী = ৬,০০,০০০ × ৩/১৩ = ১,৩৮,৪৬১.৫৪ টাকা',
            'প্রতি মেয়ে = ৬,০০,০০০ × ৪/১৩ = ১,৮৪,৬১৫.৩৮ টাকা',
            'বাবা = ৬,০০,০০০ × ২/১৩ = ৯২,৩০৭.৬৯ টাকা'
          ]
        },
        finalDistribution: [
          { name: 'স্বামী (ইউসুফ)', share: '৩/১৩', amount: '১,৩৮,৪৬২', percentage: '২৩.০৮%' },
          { name: 'মেয়ে (মারিয়াম)', share: '৪/১৩', amount: '১,৮৪,৬১৫', percentage: '৩০.৭৭%' },
          { name: 'মেয়ে (আয়েশা)', share: '৪/১৩', amount: '১,৮৪,৬১৫', percentage: '৩০.৭৭%' },
          { name: 'বাবা (আলী)', share: '২/১৩', amount: '৯২,৩০৮', percentage: '১৫.৩৮%' }
        ],
        verification: 'মোট = ১,৩৮,৪৬২ + ১,৮৪,৬১৫ + ১,৮৪,৬১৫ + ৯২,৩০৮ = ৬,০০,০০০ ✓',
        lessons: [
          'আউল হলে সবার অংশ আনুপাতিক কমে যায়',
          'শুধু মেয়ে থাকলে ২/৩ (২+ মেয়ে)',
          'বাবা ১/৬ পান যখন সন্তান থাকে',
          'স্বামী ১/৪ পান যখন সন্তান থাকে'
        ]
      }
    },
    {
      id: 3,
      title: 'রাদ্দ - সম্পদ উদ্বৃত্ত',
      difficulty: 'মাঝারি',
      difficultyColor: 'amber',
      scenario: {
        deceased: 'জনাব ইব্রাহীম (মৃত)',
        assets: '১২,০০,০০০ টাকা',
        heirs: ['মা - সালমা', 'মেয়ে - রুকাইয়া']
      },
      solution: {
        step1: {
          title: 'জাবিল ফুরুজ হিসাব',
          content: 'শুধু জাবিল ফুরুজ আছে, কোনো আসাবা নেই',
          calculation: [
            'মা = ১/৬ (সন্তান থাকায়)',
            'এক মেয়ে = ১/২',
            'মোট = ১/৬ + ১/২ = ১/৬ + ৩/৬ = ৪/৬ = ২/৩'
          ]
        },
        step2: {
          title: 'অবশিষ্ট আছে',
          content: 'মোট দেওয়া হয়েছে ২/৩, বাকি ১/৩ উদ্বৃত্ত',
          calculation: [
            'দেওয়া = ১২,০০,০০০ × ২/৩ = ৮,০০,০০০',
            'উদ্বৃত্ত = ১২,০০,০০০ - ৮,০০,০০০ = ৪,০০,০০০'
          ]
        },
        step3: {
          title: 'রাদ্দ (Radd) প্রয়োগ',
          content: 'কোনো আসাবা নেই, তাই জাবিল ফুরুজদের মধ্যে তাদের অংশ অনুপাতে ফেরত',
          calculation: [
            'মায়ের আসল অংশ = ১/৬',
            'মেয়ের আসল অংশ = ১/২ = ৩/৬',
            'অনুপাত = ১:৩',
            'উদ্বৃত্ত ৪,০০,০০০ কে ১:৩ ভাগ',
            'মা পাবে = ৪,০০,০০০ × ১/৪ = ১,০০,০০০',
            'মেয়ে পাবে = ৪,০০,০০০ × ৩/৪ = ৩,০০,০০০'
          ]
        },
        step4: {
          title: 'চূড়ান্ত বন্টন',
          content: 'আসল অংশ + রাদ্দ অংশ',
          calculation: [
            'মা = ২,০০,০০০ + ১,০০,০০০ = ৩,০০,০০০',
            'মেয়ে = ৬,০০,০০০ + ৩,০০,০০০ = ৯,০০,০০০'
          ]
        },
        finalDistribution: [
          { name: 'মা (সালমা)', share: '১/৬ + রাদ্দ', amount: '৩,০০,০০০', percentage: '২৫%' },
          { name: 'মেয়ে (রুকাইয়া)', share: '১/২ + রাদ্দ', amount: '৯,০০,০০০', percentage: '৭৫%' }
        ],
        verification: 'মোট = ৩,০০,০০০ + ৯,০০,০০০ = ১২,০০,০০০ ✓',
        lessons: [
          'রাদ্দ হয় যখন কোনো আসাবা নেই',
          'উদ্বৃত্ত সম্পদ আনুপাতিক ফেরত দেওয়া হয়',
          'স্বামী/স্ত্রী থাকলে তারা রাদ্দ পায় না',
          'এখানে স্বামী/স্ত্রী নেই, তাই মা-মেয়ে পেয়েছে'
        ]
      }
    },
    {
      id: 4,
      title: 'জটিল কেস - বাবা, মা, স্বামী (গারাভাইন)',
      difficulty: 'কঠিন',
      difficultyColor: 'red',
      scenario: {
        deceased: 'জনাবা জয়নব (মৃত, কোনো সন্তান নেই)',
        assets: '১৮,০০,০০০ টাকা',
        heirs: ['স্বামী - উমর', 'বাবা - হাসান', 'মা - খালিদা']
      },
      solution: {
        step1: {
          title: 'সাধারণ হিসাব (ভুল)',
          content: 'যদি সাধারণ নিয়মে হিসাব করা হয়',
          calculation: [
            'স্বামী = ১/২ (সন্তান নেই)',
            'মা = ১/৩ (সন্তান নেই, একাধিক ভাই-বোন নেই)',
            'বাবা = অবশিষ্ট = ১ - ১/২ - ১/৩ = ১/৬',
            'কিন্তু এটি ঠিক নয়! মায়ের দ্বিগুণ হওয়া উচিত বাবার।'
          ]
        },
        step2: {
          title: 'গারাভাইন মাসআলা',
          content: 'বিশেষ নিয়ম: মা পাবে "অবশিষ্টের ১/৩" (পুরো সম্পদের ১/৩ নয়)',
          calculation: [
            'স্বামী = ১/২ = ৯,০০,০০০',
            'অবশিষ্ট = ১৮,০০,০০০ - ৯,০০,০০০ = ৯,০০,০০০',
            'মা = অবশিষ্টের ১/৩ = ৯,০০,০০০ × ১/৩ = ৩,০০,০০০',
            'বাবা = অবশিষ্টের ২/৩ = ৯,০০,০০০ × ২/৩ = ৬,০০,০০০'
          ]
        },
        step3: {
          title: 'কেন এই বিশেষ নিয়ম?',
          content: 'হযরত উমর (রাঃ)-এর ফায়সালা: বাবার অংশ মায়ের দ্বিগুণ হওয়া উচিত (কুরআনের নীতি অনুসারে)',
          calculation: 'চেক: ৬,০০,০০০ ÷ ৩,০০,০০০ = ২:১ ✓'
        },
        finalDistribution: [
          { name: 'স্বামী (উমর)', share: '১/২', amount: '৯,০০,০০০', percentage: '৫০%' },
          { name: 'বাবা (হাসান)', share: 'অবশিষ্টের ২/৩', amount: '৬,০০,০০০', percentage: '৩৩.৩৩%' },
          { name: 'মা (খালিদা)', share: 'অবশিষ্টের ১/৩', amount: '৩,০০,০০০', percentage: '১৬.৬৭%' }
        ],
        verification: 'মোট = ৯,০০,০০০ + ৬,০০,০০০ + ৩,০০,০০০ = ১৮,০০,০০০ ✓',
        lessons: [
          'গারাভাইন = স্বামী/স্ত্রী + মা + বাবা (কোনো সন্তান নেই)',
          'মা "পুরো সম্পদের ১/৩" নয়, "অবশিষ্টের ১/৩" পায়',
          'এটি হযরত উমর (রাঃ)-এর ইজতিহাদ',
          'উদ্দেশ্য: বাবা-মায়ের ২:১ অনুপাত বজায় রাখা'
        ]
      }
    },
    {
      id: 5,
      title: 'ভাই-বোন সহ জটিল পরিবার',
      difficulty: 'কঠিন',
      difficultyColor: 'red',
      scenario: {
        deceased: 'জনাব রশিদ (মৃত)',
        assets: '২৪,০০,০০০ টাকা',
        heirs: ['স্ত্রী - নাজমা', 'মেয়ে - সুমাইয়া', 'মেয়ে - হাবিবা', 'সহোদর বোন - আসমা']
      },
      solution: {
        step1: {
          title: 'জাবিল ফুরুজ চিহ্নিত',
          content: 'স্ত্রী, ২ মেয়ে - এরা জাবিল ফুরুজ',
          calculation: [
            'স্ত্রী = ১/৮ (সন্তান থাকায়)',
            '২ মেয়ে = ২/৩ (২+ মেয়ে)',
            'বেস = LCM(৮, ৩) = ২৪'
          ]
        },
        step2: {
          title: 'বোন আসাবা হবে',
          content: 'মেয়েদের সাথে বোন "আসাবা বিল গাইর" হয়',
          calculation: [
            'স্ত্রী = ২৪ × ১/৮ = ৩',
            '২ মেয়ে = ২৪ × ২/৩ = ১৬',
            'মোট = ৩ + ১৬ = ১৯',
            'অবশিষ্ট = ২৪ - ১৯ = ৫ (বোন পাবে)'
          ]
        },
        step3: {
          title: 'টাকায় রূপান্তর',
          content: 'প্রতি অংশ = ২৪,০০,০০০ ÷ ২৪ = ১,০০,০০০',
          calculation: [
            'স্ত্রী = ৩ × ১,০০,০০০ = ৩,০০,০০০',
            'প্রতি মেয়ে = ৮ × ১,০০,০০০ = ৮,০০,০০০',
            'বোন = ৫ × ১,০০,০০০ = ৫,০০,০০০'
          ]
        },
        finalDistribution: [
          { name: 'স্ত্রী (নাজমা)', share: '১/৮', amount: '৩,০০,০০০', percentage: '১২.৫%' },
          { name: 'মেয়ে (সুমাইয়া)', share: '২/৩ ভাগে', amount: '৮,০০,০০০', percentage: '৩৩.৩৩%' },
          { name: 'মেয়ে (হাবিবা)', share: '২/৩ ভাগে', amount: '৮,০০,০০০', percentage: '৩৩.৩৩%' },
          { name: 'সহোদর বোন (আসমা)', share: 'আসাবা', amount: '৫,০০,০০০', percentage: '২০.৮৩%' }
        ],
        verification: 'মোট = ৩,০০,০০০ + ৮,০০,০০০ + ৮,০০,০০০ + ৫,০০,০০০ = ২৪,০০,০০০ ✓',
        lessons: [
          'মেয়ে থাকলে বোন "আসাবা বিল গাইর" হয়',
          'হাদিস: "اجْعَلُوا الأَخَوَاتِ مَعَ الْبَنَاتِ عَصَبَةً"',
          'বোন তার নির্ধারিত অংশ (১/২ বা ২/৩) পায় না',
          'বরং যা বাকি থাকে সব পায়'
        ]
      }
    }
  ];

  const difficultyStyle = (color) => {
    const styles = {
      green: 'bg-[#e8f0eb] text-[#1a4731]',
      amber: 'bg-amber-100 text-amber-700',
      red: 'bg-red-100 text-red-700'
    };
    return styles[color] || styles.green;
  };

  const currentCase = cases[selectedCase];

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaBook className="text-[#c9a84c]" size={22} />
            <h1 className="text-2xl font-bold text-[#1a4731]">কেস স্টাডি</h1>
          </div>
          <p className="text-gray-600 text-sm">বাস্তব উদাহরণ সহ ধাপে ধাপে সমাধান — {cases.length}টি কেস</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - Case Selector */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white border border-[#e2ddd5] rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e2ddd5]">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">কেস নির্বাচন</p>
              </div>
              {cases.map((caseItem, index) => (
                <button
                  key={caseItem.id}
                  onClick={() => setSelectedCase(index)}
                  className={`w-full px-4 py-3 text-left border-b border-[#e2ddd5] last:border-0 transition-colors ${
                    selectedCase === index
                      ? 'bg-[#e8f0eb]'
                      : 'hover:bg-[#f7f5f0]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      selectedCase === index ? 'bg-[#1a4731] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {caseItem.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium leading-snug ${selectedCase === index ? 'text-[#1a4731]' : 'text-gray-700'}`}>
                        {caseItem.title}
                      </p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${difficultyStyle(caseItem.difficultyColor)}`}>
                        {caseItem.difficulty}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Case Detail */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Case Title */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#1a4731] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {currentCase.id}
                </div>
                <div>
                  <h2 className="font-bold text-[#1a4731]">{currentCase.title}</h2>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-lg text-xs font-medium ${difficultyStyle(currentCase.difficultyColor)}`}>
                    {currentCase.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Scenario */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[#1a4731] text-sm mb-3 flex items-center gap-2">
                <FaUsers size={13} /> পরিস্থিতি
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700"><span className="font-medium">মৃত ব্যক্তি:</span> {currentCase.scenario.deceased}</p>
                <p className="text-gray-700"><span className="font-medium">মোট সম্পদ:</span> {currentCase.scenario.assets}</p>
                <div>
                  <p className="font-medium text-gray-700 mb-1.5">ওয়ারিশ:</p>
                  <ul className="space-y-1">
                    {currentCase.scenario.heirs.map((heir, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#1a4731] rounded-full flex-shrink-0"></span>
                        {heir}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Solution Steps */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[#1a4731] text-sm mb-4 flex items-center gap-2">
                <FaCalculator size={13} /> সমাধান প্রক্রিয়া
              </h3>

              <div className="space-y-3">
                {Object.keys(currentCase.solution).filter(key => key.startsWith('step')).map((key, index) => {
                  const step = currentCase.solution[key];
                  return (
                    <div key={key} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-[#1a4731] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        {index < Object.keys(currentCase.solution).filter(k => k.startsWith('step')).length - 1 && (
                          <div className="w-px flex-1 bg-[#e2ddd5] my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-3">
                        <h4 className="font-medium text-[#1a4731] text-sm mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{step.content}</p>
                        <div className="bg-[#f7f5f0] p-3 rounded-lg font-mono text-sm">
                          {Array.isArray(step.calculation) ? (
                            step.calculation.map((calc, i) => (
                              <div key={i} className="text-gray-700 mb-0.5">{calc}</div>
                            ))
                          ) : (
                            <div className="text-gray-700">{step.calculation}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Final Distribution */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[#1a4731] text-sm mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-[#1a4731]" size={13} /> চূড়ান্ত বন্টন
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e2ddd5]">
                      <th className="px-3 py-2 text-left text-gray-500 font-medium">ওয়ারিশ</th>
                      <th className="px-3 py-2 text-left text-gray-500 font-medium">অংশ</th>
                      <th className="px-3 py-2 text-left text-gray-500 font-medium">টাকা</th>
                      <th className="px-3 py-2 text-left text-gray-500 font-medium">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCase.solution.finalDistribution.map((item, i) => (
                      <tr key={i} className="border-b border-[#e2ddd5] last:border-0">
                        <td className="px-3 py-2 font-medium text-[#1a4731]">{item.name}</td>
                        <td className="px-3 py-2 text-gray-600">{item.share}</td>
                        <td className="px-3 py-2 font-mono font-bold text-[#1a4731]">{item.amount} ৳</td>
                        <td className="px-3 py-2 text-gray-500">{item.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 bg-[#f7f5f0] p-3 rounded-lg">
                <p className="text-[#1a4731] font-mono text-xs">
                  <strong>যাচাই:</strong> {currentCase.solution.verification}
                </p>
              </div>
            </div>

            {/* Lessons */}
            <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[#1a4731] text-sm mb-3 flex items-center gap-2">
                <FaLightbulb className="text-[#c9a84c]" size={13} /> শিক্ষণীয় বিষয়
              </h3>
              <ul className="space-y-2">
                {currentCase.solution.lessons.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CaseStudies;
