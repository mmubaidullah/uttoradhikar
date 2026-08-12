import React, { useState } from 'react';
import { FaUserSecret, FaBaby, FaTransgender, FaExclamationTriangle, FaBook, FaCalculator } from 'react-icons/fa';

const SpecialCases = () => {
  const [selectedCase, setSelectedCase] = useState('mafqud');

  const cases = {
    mafqud: {
      id: 'mafqud',
      title: 'মাফকুদ - নিখোঁজ ব্যক্তি',
      icon: <FaUserSecret size={40} />,
      color: 'blue',
      definition: 'যে ব্যক্তির জীবিত বা মৃত অবস্থা সম্পর্কে কোনো খবর নেই এবং তার অবস্থান অজানা, তাকে মাফকুদ (نيخوج ব্যক্তি) বলা হয়।',
      types: [
        {
          name: 'যুদ্ধে নিখোঁজ',
          description: 'যুদ্ধ, প্রাকৃতিক দুর্যোগ বা বিপজ্জনক পরিস্থিতিতে নিখোঁজ',
          waiting: '৪ বছর',
          reason: 'মৃত্যুর সম্ভাবনা বেশি'
        },
        {
          name: 'সাধারণ নিখোঁজ',
          description: 'স্বাভাবিক পরিস্থিতিতে নিখোঁজ (ভ্রমণ, ব্যবসা ইত্যাদি)',
          waiting: '৯০-১০০ বছর বা বিচারকের সিদ্ধান্ত',
          reason: 'জীবিত থাকার সম্ভাবনা বেশি'
        }
      ],
      ruling: [
        '১. মাফকুদের সম্পত্তি আটকে রাখা হবে - কোনো বন্টন হবে না',
        '২. তার স্ত্রী ইদ্দত পালন করবে না (কারণ তালাক বা মৃত্যু নিশ্চিত নয়)',
        '৩. তার স্ত্রী পুনর্বিবাহ করতে পারবে না (হানাফি মাযহাব)',
        '৪. আদালতের মাধ্যমে মৃত ঘোষণা করতে হবে'
      ],
      procedure: [
        {
          step: 'ধাপ ১',
          title: 'আদালতে আবেদন',
          details: 'পরিবারের সদস্য বা ওয়ারিশরা দেওয়ানি আদালতে আবেদন করবেন মাফকুদকে মৃত ঘোষণার জন্য।'
        },
        {
          step: 'ধাপ ২',
          title: 'তদন্ত',
          details: 'আদালত তদন্ত করবে - পুলিশ রিপোর্ট, সাক্ষ্য-প্রমাণ, সর্বশেষ দেখা যাওয়ার তারিখ ইত্যাদি।'
        },
        {
          step: 'ধাপ ৩',
          title: 'বিজ্ঞপ্তি',
          details: 'পত্রিকায় বিজ্ঞাপন দিয়ে মাফকুদকে খোঁজা হবে। নির্দিষ্ট সময় (সাধারণত ৩-৬ মাস) অপেক্ষা করা হবে।'
        },
        {
          step: 'ধাপ ৪',
          title: 'মৃত্যু ঘোষণা',
          details: 'সব প্রমাণ বিবেচনা করে বিচারক মাফকুদকে মৃত ঘোষণা করবেন এবং তারিখ নির্ধারণ করবেন।'
        },
        {
          step: 'ধাপ ৫',
          title: 'সম্পত্তি বন্টন',
          details: 'মৃত্যু ঘোষণার তারিখ অনুযায়ী ওয়ারিশদের মধ্যে সম্পত্তি বন্টন হবে।'
        }
      ],
      returnCase: {
        title: 'যদি মাফকুদ ফিরে আসে',
        points: [
          '✓ সে তার সম্পত্তি ফিরে পাবে (যদি এখনও থাকে)',
          '✓ ইতিমধ্যে বিক্রি/ব্যবহৃত সম্পত্তি ফেরত দিতে হবে না',
          '✓ স্ত্রী যদি পুনর্বিবাহ করে থাকে তবে প্রথম বিয়ে বাতিল (হানাফি মাযহাব অনুযায়ী বিতর্কিত)',
          '✓ নতুন করে উত্তরাধিকার হিসাব হবে না'
        ]
      },
      bangladeshLaw: {
        act: 'The United Nations (Declaration of Death of Missing Persons) Act, 1956',
        sections: [
          'Section 3: আদালত নিখোঁজ ব্যক্তিকে মৃত ঘোষণা করতে পারে',
          'Section 4: বিচারক পরিস্থিতি অনুযায়ী মৃত্যুর তারিখ নির্ধারণ করবেন',
          'Section 5: মৃত্যু সার্টিফিকেট জারি হবে'
        ]
      },
      references: [
        { book: 'হিদায়া', volume: '৪', page: '৫৪২' },
        { book: 'ফতোয়ায়ে আলমগীরী', volume: '৬', page: '৪৪৭' },
        { book: 'রদ্দুল মুহতার', volume: '৬', page: '৪৫৮' }
      ]
    },

    haml: {
      id: 'haml',
      title: 'হামল - গর্ভস্থ সন্তান',
      icon: <FaBaby size={40} />,
      color: 'pink',
      definition: 'মৃত ব্যক্তির মৃত্যুর সময় যদি তার স্ত্রী গর্ভবতী থাকে, তবে সেই গর্ভস্থ সন্তান ওয়ারিশ হিসেবে গণ্য হবে - যদি সে জীবিত জন্ম নেয়।',
      conditions: [
        {
          title: '১. গর্ভকাল পূর্ণ হওয়া',
          details: 'মৃত্যুর সময় কমপক্ষে ৬ মাস গর্ভকাল সম্পন্ন হতে হবে। এরচেয়ে কম হলে ওয়ারিশ হবে না।',
          icon: '📅'
        },
        {
          title: '২. জীবিত জন্ম',
          details: 'শিশুকে জীবিত জন্ম নিতে হবে। জন্মের পর যদি কাঁদে বা নড়াচড়া করে তাহলে জীবিত বলে গণ্য হবে। মৃত জন্মালে ওয়ারিশ হবে না।',
          icon: '👶'
        },
        {
          title: '৩. বৈবাহিক সম্পর্ক',
          details: 'মৃত ব্যক্তির সাথে মায়ের বৈধ বিবাহ থাকতে হবে। বিবাহ বিচ্ছেদ হলে ইদ্দতের মধ্যে জন্ম নিতে হবে।',
          icon: '💍'
        },
        {
          title: '৪. পিতৃত্ব নিশ্চিত',
          details: 'শিশুর পিতৃত্ব মৃত ব্যক্তির হতে হবে। লিয়ান (অভিযোগ) হলে ওয়ারিশ হবে না।',
          icon: '👨‍👦'
        }
      ],
      calculationMethod: {
        title: 'হিসাব পদ্ধতি (দুই অবস্থায় হিসাব)',
        steps: [
          {
            step: '১',
            title: 'উভয় অবস্থা হিসাব করুন',
            description: 'প্রথমে ধরে নিন শিশুটি ছেলে, হিসাব করুন। তারপর ধরে নিন মেয়ে, আবার হিসাব করুন।'
          },
          {
            step: '২',
            title: 'তুলনা করুন',
            description: 'দুই হিসাবে গর্ভস্থ সন্তান এবং অন্যান্য ওয়ারিশরা কত পাচ্ছে তা দেখুন।'
          },
          {
            step: '৩',
            title: 'কম অংশ দিন',
            description: 'যে অবস্থায় প্রত্যেকে কম পাচ্ছে, সেই অনুযায়ী এখনই বন্টন করুন। এতে কারো অধিকার ক্ষুণ্ণ হবে না।'
          },
          {
            step: '৪',
            title: 'পার্থক্য আটকে রাখুন',
            description: 'দুই হিসাবের পার্থক্য যতটুকু, ততটুকু আটকে রাখুন।'
          },
          {
            step: '৫',
            title: 'জন্মের পর চূড়ান্ত বন্টন',
            description: 'শিশু জন্মের পর তার লিঙ্গ অনুযায়ী চূড়ান্ত হিসাব করে আটকানো অংশ বন্টন করুন।'
          }
        ]
      },
      example: {
        title: 'বাস্তব উদাহরণ',
        scenario: 'মোট সম্পদ: ২৪,০০,০০০ টাকা\nওয়ারিশ: স্ত্রী + ২ মেয়ে + গর্ভস্থ সন্তান',
        calculations: [
          {
            assumption: 'অবস্থা ১: গর্ভস্থ সন্তান ছেলে',
            distribution: [
              { heir: 'স্ত্রী', share: '১/৮', amount: '৩,০০,০০০ টাকা' },
              { heir: 'প্রতি মেয়ে', share: 'আসাবা (২:১)', amount: '৪,২০,০০০ টাকা' },
              { heir: 'ছেলে', share: 'আসাবা (২:১)', amount: '৮,৪০,০০০ টাকা' }
            ]
          },
          {
            assumption: 'অবস্থা ২: গর্ভস্থ সন্তান মেয়ে',
            distribution: [
              { heir: 'স্ত্রী', share: '১/৮', amount: '৩,০০,০০০ টাকা' },
              { heir: 'প্রতি মেয়ে (৩জন)', share: '২/৩ ভাগে', amount: '৫,২৫,০০০ টাকা' },
              { heir: 'রাদ্দ', share: 'অবশিষ্ট', amount: '২৫,০০০ টাকা' }
            ]
          }
        ],
        decision: {
          immediate: 'এখনই দিন: স্ত্রী ৩,০০,০০০ | প্রতি মেয়ে ৪,২০,০০০',
          hold: 'আটকে রাখুন: ৫,৬০,০০০ টাকা',
          after: 'জন্মের পর: লিঙ্গ অনুযায়ী চূড়ান্ত বন্টন'
        }
      },
      specialNotes: [
        '⚠️ যমজ হলে: দুইজনকেই ওয়ারিশ ধরে হিসাব করতে হবে',
        '⚠️ একাধিক স্ত্রী গর্ভবতী: প্রত্যেকের জন্য আলাদা হিসাব',
        '⚠️ মৃত জন্ম: আটকানো সম্পদ অন্যদের মধ্যে পুনঃবন্টন',
        '⚠️ বিকলাঙ্গ শিশু: পূর্ণ অধিকার পাবে'
      ],
      references: [
        { book: 'সিরাজী', page: '৯৮' },
        { book: 'শরহে সিরাজী', page: '১২৫' },
        { book: 'হিদায়া', volume: '৪', page: '৫৩৫' }
      ]
    },

    khunsa: {
      id: 'khunsa',
      title: 'খুনসা - তৃতীয় লিঙ্গ/হার্মাফ্রোডাইট',
      icon: <FaTransgender size={40} />,
      color: 'purple',
      definition: 'যে ব্যক্তির মধ্যে পুরুষ ও নারী উভয় লিঙ্গের বৈশিষ্ট্য বিদ্যমান থাকে, তাকে খুনসা (خنثى) বলা হয়।',
      types: [
        {
          name: 'খুনসা গায়রে মুশকিল',
          description: 'যার লিঙ্গ চিহ্নিত করা সম্ভব - একটি লিঙ্গের বৈশিষ্ট্য প্রবল',
          ruling: 'প্রবল বৈশিষ্ট্য অনুযায়ী পুরুষ বা নারী হিসেবে ওয়ারিশ হবে',
          signs: [
            'প্রস্রাবের ধরন',
            'দাড়ি/স্তন বৃদ্ধি',
            'মাসিক/স্বপ্নদোষ',
            'কণ্ঠস্বর',
            'শারীরিক গঠন'
          ]
        },
        {
          name: 'খুনসা মুশকিল',
          description: 'যার লিঙ্গ নির্ণয় করা অসম্ভব - উভয় বৈশিষ্ট্য সমান বা কোনোটিই স্পষ্ট নয়',
          ruling: 'উভয় লিঙ্গের মধ্যে যেটায় কম পায়, সেই অনুযায়ী ওয়ারিশ হবে',
          method: 'দুই অবস্থায় হিসাব করে minimum দেওয়া'
        }
      ],
      calculationRules: {
        title: 'হিসাব নিয়ম (খুনসা মুশকিল)',
        principle: 'যে অবস্থায় খুনসা এবং অন্য ওয়ারিশরা কম পায়, সেই অনুযায়ী বন্টন করা হয়। এতে কারো অধিকার লঙ্ঘন হয় না।',
        steps: [
          '১. পুরুষ ধরে সম্পূর্ণ হিসাব করুন',
          '২. নারী ধরে সম্পূর্ণ হিসাব করুন',
          '৩. খুনসা যে অবস্থায় কম পাচ্ছে সেটা দিন',
          '৪. পার্থক্য অন্য ওয়ারিশদের মধ্যে বন্টন'
        ]
      },
      example: {
        scenario: 'মোট সম্পদ: ১২,০০,০০০ টাকা\nওয়ারিশ: মা + বাবা + খুনসা সন্তান',
        calculations: [
          {
            case: 'যদি পুরুষ হয়',
            shares: [
              { heir: 'মা', share: '১/৬', amount: '২,০০,০০০' },
              { heir: 'বাবা', share: '১/৬', amount: '২,০০,০০০' },
              { heir: 'ছেলে (আসাবা)', share: 'অবশিষ্ট', amount: '৮,০০,০০০' }
            ]
          },
          {
            case: 'যদি নারী হয়',
            shares: [
              { heir: 'মা', share: '১/৬', amount: '২,০০,০০০' },
              { heir: 'বাবা', share: '১/৬+আসাবা', amount: '৬,০০,০০০' },
              { heir: 'মেয়ে', share: '১/২', amount: '৪,০০,০০০' }
            ]
          }
        ],
        conclusion: {
          khunsa: '৪,০০,০০০ টাকা (যেটায় কম)',
          mother: '২,০০,০০০ টাকা',
          father: '৬,০০,০০০ টাকা (পার্থক্য পেলেন)'
        }
      },
      modernContext: {
        title: 'আধুনিক চিকিৎসা ও বাংলাদেশ',
        medical: [
          '🏥 চিকিৎসা পরীক্ষা: ক্রোমোজোম টেস্ট, হরমোন লেভেল',
          '🔬 Ultrasound ও MRI দিয়ে internal organs পরীক্ষা',
          '⚕️ বিশেষজ্ঞ ডাক্তারের মতামত গ্রহণযোগ্য'
        ],
        bangladesh: {
          title: 'বাংলাদেশ প্রেক্ষাপট',
          recognition: '২০১৩ সালে হিজড়াদের "তৃতীয় লিঙ্গ" হিসেবে স্বীকৃতি',
          nid: 'জাতীয় পরিচয়পত্রে "অন্যান্য" অপশন চালু',
          rights: 'ভোটাধিকার, শিক্ষা ও চাকরিতে কোটা সুবিধা',
          inheritance: 'ইসলামী আইন অনুযায়ী উত্তরাধিকার পাবে (উপরের নিয়ম অনুসারে)',
          challenge: 'বাস্তবে অনেক পরিবার তাদের বঞ্চিত করে - আইনি সহায়তা নিতে হবে'
        }
      },
      legalSupport: [
        '📞 জাতীয় আইনি সহায়তা: ১৬৪৩০',
        '🏛️ ফ্যামিলি কোর্টে মামলা করা যায়',
        '👥 BLAST, Ain o Salish Kendra - বিনামূল্যে আইনি সহায়তা',
        '📋 হিজড়া কল্যাণ ট্রাস্ট - সামাজিক সহায়তা'
      ],
      references: [
        { book: 'ফতোয়ায়ে আলমগীরী', volume: '৬', page: '৪৪৮' },
        { book: 'হিদায়া', volume: '৪', page: '৫৪৫' },
        { book: 'রদ্দুল মুহতার', volume: '৬', page: '৫০৮' },
        { paper: 'YPSA Bangladesh Research (2021): Inheritance Rights of Hijra' }
      ]
    }
  };

  const selectedCaseData = cases[selectedCase];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-8 md:p-12 rounded-[2rem] shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <FaExclamationTriangle size={32} className="text-purple-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                বিশেষ মাসআলা
              </h1>
              <p className="text-purple-100/80 text-sm mt-1">
                জটিল ও দুর্লভ উত্তরাধিকার পরিস্থিতি
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 mt-6">
            <p className="text-sm text-purple-50 leading-relaxed">
              <strong>গুরুত্বপূর্ণ:</strong> এই মাসআলাগুলো অত্যন্ত জটিল এবং বিশেষজ্ঞ মুফতির পরামর্শ অত্যাবশ্যক। 
              এখানে শুধু সাধারণ ধারণা দেওয়া হয়েছে।
            </p>
          </div>
        </div>

        {/* Case Selector */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {Object.values(cases).map((caseItem) => (
            <button
              key={caseItem.id}
              onClick={() => setSelectedCase(caseItem.id)}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                selectedCase === caseItem.id
                  ? `border-${caseItem.color}-500 bg-${caseItem.color}-50 shadow-lg`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 bg-${caseItem.color}-100 rounded-xl flex items-center justify-center mb-4 text-${caseItem.color}-600`}>
                {caseItem.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{caseItem.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{caseItem.definition}</p>
            </button>
          ))}
        </div>

        {/* Selected Case Content */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
          {/* Definition */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 bg-${selectedCaseData.color}-100 rounded-xl flex items-center justify-center text-${selectedCaseData.color}-600`}>
                <FaBook size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">সংজ্ঞা</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify bg-gray-50 p-6 rounded-xl">
              {selectedCaseData.definition}
            </p>
          </div>

          {/* Dynamic Content Based on Case */}
          {selectedCase === 'mafqud' && (
            <>
              {/* Types */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">প্রকারভেদ</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCaseData.types.map((type, i) => (
                    <div key={i} className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-2">{type.name}</h4>
                      <p className="text-sm text-blue-800 mb-3">{type.description}</p>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-xs text-gray-600">অপেক্ষার সময়:</p>
                        <p className="font-bold text-blue-700">{type.waiting}</p>
                        <p className="text-xs text-gray-500 mt-2">{type.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ruling */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">শরয়ী হুকুম</h3>
                <div className="space-y-2">
                  {selectedCaseData.ruling.map((rule, i) => (
                    <div key={i} className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
                      <span className="text-emerald-600 font-bold text-lg">✓</span>
                      <p className="text-emerald-900">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">আদালতি প্রক্রিয়া</h3>
                <div className="relative">
                  {selectedCaseData.procedure.map((proc, i) => (
                    <div key={i} className="flex gap-4 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        {i < selectedCaseData.procedure.length - 1 && (
                          <div className="w-1 h-full bg-blue-200 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h4 className="font-bold text-gray-800 mb-2">{proc.title}</h4>
                        <p className="text-gray-600 text-sm">{proc.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return Case */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedCaseData.returnCase.title}</h3>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 space-y-2">
                  {selectedCaseData.returnCase.points.map((point, i) => (
                    <p key={i} className="text-amber-900">{point}</p>
                  ))}
                </div>
              </div>

              {/* Bangladesh Law */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">বাংলাদেশী আইন</h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3">{selectedCaseData.bangladeshLaw.act}</h4>
                  <ul className="space-y-2">
                    {selectedCaseData.bangladeshLaw.sections.map((section, i) => (
                      <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="text-blue-600 font-bold">§</span>
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {selectedCase === 'haml' && (
            <>
              {/* Conditions */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">শর্তাবলী</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCaseData.conditions.map((cond, i) => (
                    <div key={i} className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                      <div className="text-4xl mb-3">{cond.icon}</div>
                      <h4 className="font-bold text-pink-900 mb-2">{cond.title}</h4>
                      <p className="text-sm text-pink-800">{cond.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation Method */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaCalculator className="text-pink-600" size={24} />
                  <h3 className="text-xl font-bold text-gray-800">{selectedCaseData.calculationMethod.title}</h3>
                </div>
                <div className="space-y-4">
                  {selectedCaseData.calculationMethod.steps.map((step, i) => (
                    <div key={i} className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl border border-pink-100">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-pink-600 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedCaseData.example.title}</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">{selectedCaseData.example.scenario}</pre>
                  </div>
                  
                  {selectedCaseData.example.calculations.map((calc, i) => (
                    <div key={i} className="mb-4">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                          {i + 1}
                        </span>
                        {calc.assumption}
                      </h4>
                      <div className="space-y-2">
                        {calc.distribution.map((dist, j) => (
                          <div key={j} className="bg-white p-3 rounded-lg flex justify-between items-center">
                            <div>
                              <span className="font-bold text-gray-800">{dist.heir}</span>
                              <span className="text-gray-500 text-sm ml-2">({dist.share})</span>
                            </div>
                            <span className="font-bold text-blue-600">{dist.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-600 mt-6">
                    <h4 className="font-bold text-green-900 mb-2">✓ সিদ্ধান্ত:</h4>
                    <p className="text-sm text-green-800 mb-1"><strong>এখনই:</strong> {selectedCaseData.example.decision.immediate}</p>
                    <p className="text-sm text-green-800 mb-1"><strong>আটকে:</strong> {selectedCaseData.example.decision.hold}</p>
                    <p className="text-sm text-green-800"><strong>পরে:</strong> {selectedCaseData.example.decision.after}</p>
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">বিশেষ দ্রষ্টব্য</h3>
                <div className="space-y-2">
                  {selectedCaseData.specialNotes.map((note, i) => (
                    <div key={i} className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                      <p className="text-amber-900">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedCase === 'khunsa' && (
            <>
              {/* Types */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">প্রকারভেদ</h3>
                <div className="space-y-4">
                  {selectedCaseData.types.map((type, i) => (
                    <div key={i} className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                      <h4 className="font-bold text-purple-900 mb-2 text-lg">{type.name}</h4>
                      <p className="text-purple-800 mb-3">{type.description}</p>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm font-bold text-gray-700 mb-2">হুকুম:</p>
                        <p className="text-purple-700">{type.ruling}</p>
                      </div>
                      {type.signs && (
                        <div className="mt-4">
                          <p className="text-sm font-bold text-gray-700 mb-2">চিহ্ন নির্ণয়ের মাধ্যম:</p>
                          <div className="flex flex-wrap gap-2">
                            {type.signs.map((sign, j) => (
                              <span key={j} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                                {sign}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {type.method && (
                        <div className="mt-4 bg-purple-100 p-3 rounded-lg">
                          <p className="text-sm text-purple-800"><strong>পদ্ধতি:</strong> {type.method}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation Rules */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedCaseData.calculationRules.title}</h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <p className="text-purple-900 mb-4 text-justify"><strong>মূলনীতি:</strong> {selectedCaseData.calculationRules.principle}</p>
                  <div className="space-y-2">
                    {selectedCaseData.calculationRules.steps.map((step, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg flex items-start gap-3">
                        <span className="text-purple-600 font-bold">{i + 1}.</span>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Example */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">বাস্তব উদাহরণ</h3>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">{selectedCaseData.example.scenario}</pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {selectedCaseData.example.calculations.map((calc, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-blue-900 mb-3">{calc.case}</h4>
                        <div className="space-y-2">
                          {calc.shares.map((share, j) => (
                            <div key={j} className="text-sm">
                              <span className="font-bold text-gray-800">{share.heir}:</span>
                              <span className="text-gray-600 ml-2">{share.share} = {share.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-bold text-green-900 mb-2">✓ চূড়ান্ত বন্টন:</h4>
                    {Object.entries(selectedCaseData.example.conclusion).map(([key, value]) => (
                      <p key={key} className="text-sm text-green-800">
                        <strong className="capitalize">{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modern Context */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedCaseData.modernContext.title}</h3>
                
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100 mb-4">
                  <h4 className="font-bold text-teal-900 mb-3">চিকিৎসা পরীক্ষা</h4>
                  <div className="space-y-2">
                    {selectedCaseData.modernContext.medical.map((item, i) => (
                      <p key={i} className="text-teal-800 text-sm">{item}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-900 mb-3 text-lg">{selectedCaseData.modernContext.bangladesh.title}</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">স্বীকৃতি:</p>
                      <p className="text-green-800 font-medium">{selectedCaseData.modernContext.bangladesh.recognition}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">জাতীয় পরিচয়পত্র:</p>
                      <p className="text-green-800 font-medium">{selectedCaseData.modernContext.bangladesh.nid}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">অধিকার:</p>
                      <p className="text-green-800 font-medium">{selectedCaseData.modernContext.bangladesh.rights}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">উত্তরাধিকার:</p>
                      <p className="text-green-800 font-medium">{selectedCaseData.modernContext.bangladesh.inheritance}</p>
                    </div>
                    <div className="bg-amber-100 p-4 rounded-lg border-l-4 border-amber-600">
                      <p className="text-sm text-amber-800"><strong>চ্যালেঞ্জ:</strong> {selectedCaseData.modernContext.bangladesh.challenge}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Support */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">আইনি সহায়তা</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedCaseData.legalSupport.map((support, i) => (
                    <div key={i} className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-blue-900 text-sm">{support}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* References */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📚 রেফারেন্স</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {selectedCaseData.references.map((ref, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-800 font-medium">
                    {ref.book || ref.paper}
                    {ref.volume && ` - খণ্ড ${ref.volume}`}
                    {ref.page && `, পৃষ্ঠা ${ref.page}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
            <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
              <FaExclamationTriangle className="text-red-600" />
              গুরুত্বপূর্ণ সতর্কতা
            </h4>
            <p className="text-red-800 text-sm leading-relaxed">
              এই মাসআলাগুলো অত্যন্ত জটিল এবং প্রতিটি ক্ষেত্রে বিশেষ পরিস্থিতি ভিন্ন হতে পারে। 
              কোনো সিদ্ধান্ত নেওয়ার আগে <strong>অভিজ্ঞ মুফতি বা ইসলামী আইনবিদের সাথে পরামর্শ করুন</strong>। 
              এই তথ্যগুলো শুধুমাত্র সাধারণ জ্ঞানের জন্য এবং আইনি পরামর্শ হিসেবে গণ্য নয়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCases;
