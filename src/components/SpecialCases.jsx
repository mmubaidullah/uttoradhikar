import { useState } from 'react';
import { FaUserSecret, FaBaby, FaTransgender, FaExclamationTriangle, FaBook, FaCalculator, FaCalendar, FaChild, FaRing, FaMale, FaCheckCircle, FaHospital, FaMicroscope, FaUserMd, FaPhone, FaLandmark } from 'react-icons/fa';

const SpecialCases = () => {
  const [selectedCase, setSelectedCase] = useState('mafqud');

  const cases = {
    mafqud: {
      id: 'mafqud',
      title: 'মাফকুদ - নিখোঁজ ব্যক্তি',
      icon: <FaUserSecret size={18} />,
      definition: 'যে ব্যক্তির জীবিত বা মৃত অবস্থা সম্পর্কে কোনো খবর নেই এবং তার অবস্থান অজানা, তাকে মাফকুদ (নিখোঁজ ব্যক্তি) বলা হয়।',
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
        'মাফকুদের সম্পত্তি আটকে রাখা হবে - কোনো বন্টন হবে না',
        'তার স্ত্রী ইদ্দত পালন করবে না (কারণ তালাক বা মৃত্যু নিশ্চিত নয়)',
        'তার স্ত্রী পুনর্বিবাহ করতে পারবে না (হানাফি মাযহাব)',
        'আদালতের মাধ্যমে মৃত ঘোষণা করতে হবে'
      ],
      procedure: [
        { title: 'আদালতে আবেদন', details: 'পরিবারের সদস্য বা ওয়ারিশরা দেওয়ানি আদালতে আবেদন করবেন মাফকুদকে মৃত ঘোষণার জন্য।' },
        { title: 'তদন্ত', details: 'আদালত তদন্ত করবে - পুলিশ রিপোর্ট, সাক্ষ্য-প্রমাণ, সর্বশেষ দেখা যাওয়ার তারিখ ইত্যাদি।' },
        { title: 'বিজ্ঞপ্তি', details: 'পত্রিকায় বিজ্ঞাপন দিয়ে মাফকুদকে খোঁজা হবে। নির্দিষ্ট সময় (সাধারণত ৩-৬ মাস) অপেক্ষা করা হবে।' },
        { title: 'মৃত্যু ঘোষণা', details: 'সব প্রমাণ বিবেচনা করে বিচারক মাফকুদকে মৃত ঘোষণা করবেন এবং তারিখ নির্ধারণ করবেন।' },
        { title: 'সম্পত্তি বন্টন', details: 'মৃত্যু ঘোষণার তারিখ অনুযায়ী ওয়ারিশদের মধ্যে সম্পত্তি বন্টন হবে।' }
      ],
      returnCase: {
        title: 'যদি মাফকুদ ফিরে আসে',
        points: [
          'সে তার সম্পত্তি ফিরে পাবে (যদি এখনও থাকে)',
          'ইতিমধ্যে বিক্রি/ব্যবহৃত সম্পত্তি ফেরত দিতে হবে না',
          'স্ত্রী যদি পুনর্বিবাহ করে থাকে তবে প্রথম বিয়ে বাতিল (হানাফি মাযহাব অনুযায়ী বিতর্কিত)',
          'নতুন করে উত্তরাধিকার হিসাব হবে না'
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
      icon: <FaBaby size={18} />,
      definition: 'মৃত ব্যক্তির মৃত্যুর সময় যদি তার স্ত্রী গর্ভবতী থাকে, তবে সেই গর্ভস্থ সন্তান ওয়ারিশ হিসেবে গণ্য হবে - যদি সে জীবিত জন্ম নেয়।',
      conditions: [
        { title: 'গর্ভকাল পূর্ণ হওয়া', details: 'মৃত্যুর সময় কমপক্ষে ৬ মাস গর্ভকাল সম্পন্ন হতে হবে। এরচেয়ে কম হলে ওয়ারিশ হবে না।', icon: <FaCalendar /> },
        { title: 'জীবিত জন্ম', details: 'শিশুকে জীবিত জন্ম নিতে হবে। জন্মের পর যদি কাঁদে বা নড়াচড়া করে তাহলে জীবিত বলে গণ্য হবে। মৃত জন্মালে ওয়ারিশ হবে না।', icon: <FaChild /> },
        { title: 'বৈবাহিক সম্পর্ক', details: 'মৃত ব্যক্তির সাথে মায়ের বৈধ বিবাহ থাকতে হবে। বিবাহ বিচ্ছেদ হলে ইদ্দতের মধ্যে জন্ম নিতে হবে।', icon: <FaRing /> },
        { title: 'পিতৃত্ব নিশ্চিত', details: 'শিশুর পিতৃত্ব মৃত ব্যক্তির হতে হবে। লিয়ান (অভিযোগ) হলে ওয়ারিশ হবে না।', icon: <FaMale /> }
      ],
      calculationSteps: [
        { step: '১', title: 'উভয় অবস্থা হিসাব করুন', description: 'প্রথমে ধরে নিন শিশুটি ছেলে, হিসাব করুন। তারপর ধরে নিন মেয়ে, আবার হিসাব করুন।' },
        { step: '২', title: 'তুলনা করুন', description: 'দুই হিসাবে গর্ভস্থ সন্তান এবং অন্যান্য ওয়ারিশরা কত পাচ্ছে তা দেখুন।' },
        { step: '৩', title: 'কম অংশ দিন', description: 'যে অবস্থায় প্রত্যেকে কম পাচ্ছে, সেই অনুযায়ী এখনই বন্টন করুন।' },
        { step: '৪', title: 'পার্থক্য আটকে রাখুন', description: 'দুই হিসাবের পার্থক্য যতটুকু, ততটুকু আটকে রাখুন।' },
        { step: '৫', title: 'জন্মের পর চূড়ান্ত বন্টন', description: 'শিশু জন্মের পর তার লিঙ্গ অনুযায়ী চূড়ান্ত হিসাব করে আটকানো অংশ বন্টন করুন।' }
      ],
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
          immediate: 'স্ত্রী ৩,০০,০০০ | প্রতি মেয়ে ৪,২০,০০০',
          hold: '৫,৬০,০০০ টাকা আটকে রাখুন',
          after: 'জন্মের পর লিঙ্গ অনুযায়ী চূড়ান্ত বন্টন'
        }
      },
      specialNotes: [
        'যমজ হলে: দুইজনকেই ওয়ারিশ ধরে হিসাব করতে হবে',
        'একাধিক স্ত্রী গর্ভবতী: প্রত্যেকের জন্য আলাদা হিসাব',
        'মৃত জন্ম: আটকানো সম্পদ অন্যদের মধ্যে পুনঃবন্টন',
        'বিকলাঙ্গ শিশু: পূর্ণ অধিকার পাবে'
      ],
      references: [
        { book: 'সিরাজী', page: '৯৮' },
        { book: 'শরহে সিরাজী', page: '১২৫' },
        { book: 'হিদায়া', volume: '৪', page: '৫৩৫' }
      ]
    },

    khunsa: {
      id: 'khunsa',
      title: 'খুনসা - তৃতীয় লিঙ্গ',
      icon: <FaTransgender size={18} />,
      definition: 'যে ব্যক্তির মধ্যে পুরুষ ও নারী উভয় লিঙ্গের বৈশিষ্ট্য বিদ্যমান থাকে, তাকে খুনসা (خنثى) বলা হয়।',
      types: [
        {
          name: 'খুনসা গায়রে মুশকিল',
          description: 'যার লিঙ্গ চিহ্নিত করা সম্ভব - একটি লিঙ্গের বৈশিষ্ট্য প্রবল',
          ruling: 'প্রবল বৈশিষ্ট্য অনুযায়ী পুরুষ বা নারী হিসেবে ওয়ারিশ হবে',
          signs: ['প্রস্রাবের ধরন', 'দাড়ি/স্তন বৃদ্ধি', 'মাসিক/স্বপ্নদোষ', 'কণ্ঠস্বর', 'শারীরিক গঠন']
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
          'পুরুষ ধরে সম্পূর্ণ হিসাব করুন',
          'নারী ধরে সম্পূর্ণ হিসাব করুন',
          'খুনসা যে অবস্থায় কম পাচ্ছে সেটা দিন',
          'পার্থক্য অন্য ওয়ারিশদের মধ্যে বন্টন'
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
          'খুনসা': '৪,০০,০০০ টাকা (যেটায় কম)',
          'মা': '২,০০,০০০ টাকা',
          'বাবা': '৬,০০,০০০ টাকা (পার্থক্য পেলেন)'
        }
      },
      modernContext: {
        title: 'আধুনিক চিকিৎসা ও বাংলাদেশ',
        medical: [
          'চিকিৎসা পরীক্ষা: ক্রোমোজোম টেস্ট, হরমোন লেভেল',
          'Ultrasound ও MRI দিয়ে internal organs পরীক্ষা',
          'বিশেষজ্ঞ ডাক্তারের মতামত গ্রহণযোগ্য'
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
        'জাতীয় আইনি সহায়তা: ১৬৪৩০',
        'ফ্যামিলি কোর্টে মামলা করা যায়',
        'BLAST, Ain o Salish Kendra - বিনামূল্যে আইনি সহায়তা',
        'হিজড়া কল্যাণ ট্রাস্ট - সামাজিক সহায়তা'
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

  const tabButtons = [
    { id: 'mafqud', label: 'মাফকুদ', icon: <FaUserSecret size={13} /> },
    { id: 'haml', label: 'হামল', icon: <FaBaby size={13} /> },
    { id: 'khunsa', label: 'খুনসা', icon: <FaTransgender size={13} /> }
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaExclamationTriangle className="text-[#c9a84c]" size={20} />
            <h1 className="text-2xl font-bold text-[#1a4731]">বিশেষ মাসআলা</h1>
          </div>
          <p className="text-gray-600 text-sm">জটিল ও দুর্লভ উত্তরাধিকার পরিস্থিতি — বিশেষজ্ঞ পরামর্শ প্রয়োজন</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-8">
          {tabButtons.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCase(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                selectedCase === tab.id
                  ? 'bg-[#1a4731] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-[#e2ddd5]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="space-y-5">

          {/* Definition */}
          <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FaBook className="text-[#c9a84c]" size={14} />
              <h2 className="font-bold text-[#1a4731] text-sm">সংজ্ঞা</h2>
            </div>
            <blockquote className="border-l-2 border-[#1a4731] pl-4">
              <p className="text-gray-700 text-sm leading-relaxed italic">{selectedCaseData.definition}</p>
            </blockquote>
          </div>

          {/* Mafqud Content */}
          {selectedCase === 'mafqud' && (
            <>
              {/* Types */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4">প্রকারভেদ</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedCaseData.types.map((type, i) => (
                    <div key={i} className="border border-[#e2ddd5] rounded-lg p-4">
                      <h4 className="font-medium text-[#1a4731] text-sm mb-2">{type.name}</h4>
                      <p className="text-gray-600 text-xs mb-3">{type.description}</p>
                      <div className="bg-[#f7f5f0] rounded p-2 text-xs">
                        <p className="text-gray-500">অপেক্ষার সময়</p>
                        <p className="font-bold text-[#1a4731]">{type.waiting}</p>
                        <p className="text-gray-500 mt-1">{type.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ruling */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-3">শরয়ী হুকুম</h3>
                <ul className="space-y-2">
                  {selectedCaseData.ruling.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Procedure - vertical timeline */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4">আদালতি প্রক্রিয়া</h3>
                <div className="space-y-0">
                  {selectedCaseData.procedure.map((proc, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-[#1a4731] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        {i < selectedCaseData.procedure.length - 1 && (
                          <div className="w-px flex-1 bg-[#e2ddd5] my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-medium text-[#1a4731] text-sm mb-1">{proc.title}</h4>
                        <p className="text-gray-600 text-xs">{proc.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return Case */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-3">{selectedCaseData.returnCase.title}</h3>
                <ul className="space-y-2">
                  {selectedCaseData.returnCase.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bangladesh Law */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-3 flex items-center gap-2">
                  <FaLandmark className="text-[#c9a84c]" size={13} />
                  বাংলাদেশী আইন
                </h3>
                <p className="text-xs font-medium text-[#1a4731] mb-2">{selectedCaseData.bangladeshLaw.act}</p>
                <ul className="space-y-1.5">
                  {selectedCaseData.bangladeshLaw.sections.map((section, i) => (
                    <li key={i} className="text-gray-600 text-xs flex items-start gap-1.5">
                      <span className="text-[#c9a84c] font-bold flex-shrink-0">§</span>
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Haml Content */}
          {selectedCase === 'haml' && (
            <>
              {/* Conditions */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4">শর্তাবলী</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedCaseData.conditions.map((cond, i) => (
                    <div key={i} className="border border-[#e2ddd5] rounded-lg p-4">
                      <div className="w-8 h-8 bg-[#1a4731]/8 rounded-lg flex items-center justify-center text-[#1a4731] mb-2">
                        {cond.icon}
                      </div>
                      <h4 className="font-medium text-[#1a4731] text-sm mb-1">{cond.title}</h4>
                      <p className="text-gray-600 text-xs">{cond.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation Method */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4 flex items-center gap-2">
                  <FaCalculator size={13} /> হিসাব পদ্ধতি (দুই অবস্থায় হিসাব)
                </h3>
                <div className="space-y-0">
                  {selectedCaseData.calculationSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 bg-[#1a4731] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        {i < selectedCaseData.calculationSteps.length - 1 && (
                          <div className="w-px flex-1 bg-[#e2ddd5] my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-medium text-[#1a4731] text-sm mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-xs">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4">{selectedCaseData.example.title}</h3>
                <div className="bg-[#f7f5f0] p-3 rounded-lg mb-4 font-mono text-xs text-gray-700 whitespace-pre-wrap">
                  {selectedCaseData.example.scenario}
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  {selectedCaseData.example.calculations.map((calc, i) => (
                    <div key={i} className="border border-[#e2ddd5] rounded-lg p-4">
                      <h4 className="font-medium text-[#1a4731] text-xs mb-3">{calc.assumption}</h4>
                      <div className="space-y-2">
                        {calc.distribution.map((dist, j) => (
                          <div key={j} className="flex justify-between text-xs">
                            <div>
                              <span className="font-medium text-gray-700">{dist.heir}</span>
                              <span className="text-gray-500 ml-1">({dist.share})</span>
                            </div>
                            <span className="font-mono font-bold text-[#1a4731]">{dist.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#e8f0eb] border-l-2 border-[#1a4731] p-3 rounded-r-lg">
                  <h4 className="font-bold text-[#1a4731] text-xs mb-2 flex items-center gap-1.5">
                    <FaCheckCircle size={11} /> সিদ্ধান্ত
                  </h4>
                  <p className="text-xs text-[#1a4731] mb-1"><strong>এখনই:</strong> {selectedCaseData.example.decision.immediate}</p>
                  <p className="text-xs text-[#1a4731] mb-1"><strong>আটকে:</strong> {selectedCaseData.example.decision.hold}</p>
                  <p className="text-xs text-[#1a4731]"><strong>পরে:</strong> {selectedCaseData.example.decision.after}</p>
                </div>
              </div>

              {/* Special Notes */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-3">বিশেষ দ্রষ্টব্য</h3>
                <ul className="space-y-2">
                  {selectedCaseData.specialNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <FaExclamationTriangle className="text-[#c9a84c] flex-shrink-0 mt-0.5" size={11} />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Khunsa Content */}
          {selectedCase === 'khunsa' && (
            <>
              {/* Types */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4">প্রকারভেদ</h3>
                <div className="space-y-3">
                  {selectedCaseData.types.map((type, i) => (
                    <div key={i} className="border border-[#e2ddd5] rounded-lg p-4">
                      <h4 className="font-medium text-[#1a4731] mb-1">{type.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                      <div className="bg-[#f7f5f0] p-3 rounded-lg text-xs mb-2">
                        <span className="font-medium text-gray-600">হুকুম:</span>{' '}
                        <span className="text-[#1a4731]">{type.ruling}</span>
                      </div>
                      {type.signs && (
                        <div className="flex flex-wrap gap-1.5">
                          {type.signs.map((sign, j) => (
                            <span key={j} className="bg-[#1a4731]/8 text-[#1a4731] px-2 py-0.5 rounded text-xs">
                              {sign}
                            </span>
                          ))}
                        </div>
                      )}
                      {type.method && (
                        <p className="text-xs text-gray-500 mt-2"><strong>পদ্ধতি:</strong> {type.method}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation Rules */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-3">{selectedCaseData.calculationRules.title}</h3>
                <blockquote className="border-l-2 border-[#c9a84c] pl-3 mb-4">
                  <p className="text-gray-600 text-sm italic">{selectedCaseData.calculationRules.principle}</p>
                </blockquote>
                <ol className="space-y-2">
                  {selectedCaseData.calculationRules.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="w-5 h-5 bg-[#1a4731] text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Example */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4">বাস্তব উদাহরণ</h3>
                <div className="bg-[#f7f5f0] p-3 rounded-lg mb-4 font-mono text-xs text-gray-700 whitespace-pre-wrap">
                  {selectedCaseData.example.scenario}
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  {selectedCaseData.example.calculations.map((calc, i) => (
                    <div key={i} className="border border-[#e2ddd5] rounded-lg p-4">
                      <h4 className="font-medium text-[#1a4731] text-xs mb-3">{calc.case}</h4>
                      <div className="space-y-1.5">
                        {calc.shares.map((share, j) => (
                          <div key={j} className="flex justify-between text-xs">
                            <span className="font-medium text-gray-700">{share.heir}</span>
                            <span className="font-mono text-[#1a4731]">{share.share} = {share.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#e8f0eb] border-l-2 border-[#1a4731] p-3 rounded-r-lg">
                  <h4 className="font-bold text-[#1a4731] text-xs mb-2 flex items-center gap-1.5">
                    <FaCheckCircle size={11} /> চূড়ান্ত বন্টন
                  </h4>
                  {Object.entries(selectedCaseData.example.conclusion).map(([key, value]) => (
                    <p key={key} className="text-xs text-[#1a4731] mb-0.5">
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>
              </div>

              {/* Modern Context */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4">{selectedCaseData.modernContext.title}</h3>

                <div className="mb-4">
                  <h4 className="font-medium text-[#1a4731] text-xs mb-2">চিকিৎসা পরীক্ষা</h4>
                  <div className="space-y-1.5">
                    {selectedCaseData.modernContext.medical.map((item, i) => {
                      const icons = [FaHospital, FaMicroscope, FaUserMd];
                      const Icon = icons[i];
                      return (
                        <p key={i} className="text-gray-600 text-xs flex items-start gap-2">
                          <Icon className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="border border-[#e2ddd5] rounded-lg p-4">
                  <h4 className="font-medium text-[#1a4731] text-sm mb-3">{selectedCaseData.modernContext.bangladesh.title}</h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p><span className="font-medium text-[#1a4731]">স্বীকৃতি:</span> {selectedCaseData.modernContext.bangladesh.recognition}</p>
                    <p><span className="font-medium text-[#1a4731]">জাতীয় পরিচয়পত্র:</span> {selectedCaseData.modernContext.bangladesh.nid}</p>
                    <p><span className="font-medium text-[#1a4731]">অধিকার:</span> {selectedCaseData.modernContext.bangladesh.rights}</p>
                    <p><span className="font-medium text-[#1a4731]">উত্তরাধিকার:</span> {selectedCaseData.modernContext.bangladesh.inheritance}</p>
                  </div>
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-2">
                    <p className="text-xs text-amber-800"><strong>চ্যালেঞ্জ:</strong> {selectedCaseData.modernContext.bangladesh.challenge}</p>
                  </div>
                </div>
              </div>

              {/* Legal Support */}
              <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-3 flex items-center gap-2">
                  <FaPhone size={12} /> আইনি সহায়তা
                </h3>
                <ul className="space-y-2">
                  {selectedCaseData.legalSupport.map((support, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                      {support}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* References - shown for all */}
          <div className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-[#1a4731] text-xs mb-3 uppercase tracking-wide">রেফারেন্স</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCaseData.references.map((ref, i) => (
                <span key={i} className="bg-[#f7f5f0] border border-[#e2ddd5] px-3 py-1 rounded-lg text-xs text-gray-600">
                  {ref.book || ref.paper}
                  {ref.volume && ` খণ্ড ${ref.volume}`}
                  {ref.page && ` পৃ. ${ref.page}`}
                </span>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>গুরুত্বপূর্ণ:</strong> এই মাসআলাগুলো অত্যন্ত জটিল। কোনো সিদ্ধান্ত নেওয়ার আগে অভিজ্ঞ মুফতি বা ইসলামী আইনবিদের পরামর্শ নিন।
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SpecialCases;
