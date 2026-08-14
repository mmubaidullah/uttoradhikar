import { useState } from 'react';
import { FaGavel, FaFileAlt, FaUniversity, FaClipboardList, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle, FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';

const BangladeshLaw = () => {
  const [selectedTab, setSelectedTab] = useState('acts');

  const tabs = [
    { id: 'acts', name: 'আইন ও বিধান', icon: <FaGavel size={13} /> },
    { id: 'certificate', name: 'ওয়ারিশ সার্টিফিকেট', icon: <FaFileAlt size={13} /> },
    { id: 'namjari', name: 'নামজারি', icon: <FaClipboardList size={13} /> },
    { id: 'contacts', name: 'যোগাযোগ', icon: <FaPhone size={13} /> }
  ];

  const acts = [
    {
      title: 'Muslim Personal Law (Shariat) Application Act, 1937',
      sections: [
        {
          section: 'Section 2',
          title: 'মীরাসের ক্ষেত্রে শরীয়তের প্রয়োগ',
          content: 'মুসলিমদের উত্তরাধিকার বিষয়ে Muslim Personal Law (Shariat) প্রযোজ্য হবে। কোনো প্রথা বা রীতি শরীয়াহ বিরোধী হলে তা বাতিল বলে গণ্য হবে।'
        }
      ],
      importance: 'মূল আইন - সব মুসলিম উত্তরাধিকারের ভিত্তি'
    },
    {
      title: 'Muslim Family Laws Ordinance, 1961',
      sections: [
        {
          section: 'Section 4',
          title: 'বিয়ে নিবন্ধন',
          content: 'বিয়ে নিবন্ধন বাধ্যতামূলক। নিবন্ধন ছাড়া উত্তরাধিকার দাবিতে জটিলতা হতে পারে।'
        },
        {
          section: 'Section 7',
          title: 'তালাক নোটিশ',
          content: 'তালাক Union Parishad/Municipality-তে নোটিশ দিতে হবে। নোটিশ ছাড়া তালাক বৈধ কিন্তু শাস্তিযোগ্য।'
        }
      ],
      importance: 'পারিবারিক বিষয়ে রেজিস্ট্রেশন'
    },
    {
      title: 'Succession Act, 1925',
      sections: [
        {
          section: 'Section 2(b)',
          title: 'মুসলিমদের জন্য প্রযোজ্য নয়',
          content: 'এই আইন মুসলিমদের উত্তরাধিকারে প্রযোজ্য নয়। মুসলিমরা Muslim Personal Law অনুসরণ করবে।'
        }
      ],
      importance: 'তুলনামূলক জ্ঞান - অমুসলিমদের জন্য'
    },
    {
      title: 'Registration Act, 1908',
      sections: [
        {
          section: 'Section 17',
          title: 'সম্পত্তি রেজিস্ট্রেশন বাধ্যতামূলক',
          content: '১০০ টাকার বেশি মূল্যের সম্পত্তি হস্তান্তর রেজিস্ট্রেশন করতে হবে।'
        },
        {
          section: 'Section 54',
          title: 'নামজারি দলিল',
          content: 'উত্তরাধিকার সূত্রে প্রাপ্ত সম্পত্তি নামজারির জন্য দলিল জমা দিতে হবে।'
        }
      ],
      importance: 'সম্পত্তি হস্তান্তরে প্রয়োজনীয়'
    }
  ];

  const certificateSteps = [
    {
      step: '১',
      title: 'প্রয়োজনীয় কাগজপত্র সংগ্রহ',
      documents: [
        'মৃত ব্যক্তির মৃত্যু সনদ',
        'মৃত ব্যক্তির জাতীয় পরিচয়পত্র (যদি থাকে)',
        'ওয়ারিশদের জাতীয় পরিচয়পত্র',
        'জন্ম নিবন্ধন (নাবালক সন্তানের জন্য)',
        'বিয়ের সার্টিফিকেট (স্ত্রীর জন্য)',
        'সম্পত্তির দলিল (জমি/বাড়ির)',
        'ওয়ারিশদের ছবি (পাসপোর্ট সাইজ)',
        '২ জন সাক্ষীর তথ্য (NID সহ)'
      ],
      tips: 'সব কাগজ ফটোকপি করে রাখুন। আসল কাগজ হারানোর ঝুঁকি আছে।'
    },
    {
      step: '২',
      title: 'আবেদন দাখিল',
      process: [
        'স্থানীয় Union Parishad/Municipality/City Corporation-এ যান',
        'Chairman/Mayor-এর অফিসে আবেদন ফরম নিন',
        'ফরম পূরণ করুন (সব ওয়ারিশের তথ্য)',
        'কাগজপত্র সংযুক্ত করুন',
        'নির্ধারিত ফি জমা দিন (৫০-২০০ টাকা)',
        'রশিদ নিয়ে রাখুন'
      ],
      duration: '১-২ দিন',
      tips: 'সকালে যান, কম ভিড় থাকে। সব কাগজ সাথে রাখুন।'
    },
    {
      step: '৩',
      title: 'যাচাই প্রক্রিয়া',
      process: [
        'Chairman/Mayor কাগজপত্র যাচাই করবেন',
        'সাক্ষীদের সাক্ষ্য নেওয়া হবে',
        'প্রয়োজনে গ্রামের মানুষের কাছে জিজ্ঞাসা',
        'ওয়ারিশদের সাক্ষাৎকার হতে পারে',
        'সব তথ্য মিলে গেলে সার্টিফিকেট প্রস্তুত'
      ],
      duration: '৭-১৫ দিন',
      tips: 'Chairman-কে সঠিক মোবাইল নম্বর দিন। ডাক আসলে দ্রুত যান।'
    },
    {
      step: '৪',
      title: 'সার্টিফিকেট গ্রহণ',
      process: [
        'নির্ধারিত দিনে অফিসে যান',
        'রশিদ দেখান',
        'সার্টিফিকেট যাচাই করুন',
        'সব ওয়ারিশের নাম আছে কিনা দেখুন',
        'ভুল থাকলে সাথে সাথে বলুন',
        'সার্টিফিকেট গ্রহণ করুন'
      ],
      duration: '১ দিন',
      tips: 'অন্তত ৫টি কপি করে নিন। বিভিন্ন জায়গায় লাগবে।'
    }
  ];

  const namjariProcess = [
    {
      type: 'জমির নামজারি',
      authority: 'উপজেলা ভূমি অফিস (Assistant Commissioner - Land)',
      steps: [
        'ওয়ারিশ সার্টিফিকেট নিয়ে ভূমি অফিসে যান',
        'নামজারি আবেদন ফরম পূরণ করুন',
        'জমির দলিল, খাজনা রশিদ জমা দিন',
        'নির্ধারিত ফি দিন (জমির মূল্যের ১-২%)',
        'তদন্ত সম্পন্ন হবে',
        'নামজারি খতিয়ান পাবেন'
      ],
      duration: '৬-১২ মাস',
      cost: 'জমির মূল্যের ১-২% + রেজিস্ট্রেশন ফি',
      documents: [
        'ওয়ারিশ সার্টিফিকেট',
        'মৃত্যু সনদ',
        'পূর্ববর্তী দলিল',
        'সর্বশেষ খাজনা রশিদ',
        'CS/SA/RS খতিয়ান কপি',
        'ওয়ারিশদের NID'
      ]
    },
    {
      type: 'বাড়ি/ফ্ল্যাট নামজারি',
      authority: 'RAJUK/City Corporation/Paurashava',
      steps: [
        'ওয়ারিশ সার্টিফিকেট নিয়ে সংশ্লিষ্ট অফিসে যান',
        'হোল্ডিং ট্যাক্স রশিদ আপডেট করুন',
        'মিউটেশন আবেদন করুন',
        'রেজিস্ট্রি দলিল জমা দিন',
        'নতুন হোল্ডিং ট্যাক্স পাবেন'
      ],
      duration: '৩-৬ মাস',
      cost: '৫,০০০-২০,০০০ টাকা (এলাকা ভেদে)',
      documents: [
        'ওয়ারিশ সার্টিফিকেট',
        'মৃত্যু সনদ',
        'পূর্বের হোল্ডিং ট্যাক্স রশিদ',
        'বাড়ির দলিল',
        'ওয়ারিশদের NID'
      ]
    },
    {
      type: 'ব্যাংক একাউন্ট',
      authority: 'সংশ্লিষ্ট ব্যাংক শাখা',
      steps: [
        'ওয়ারিশ সার্টিফিকেট + মৃত্যু সনদ নিয়ে ব্যাংকে যান',
        'ব্যাংকের ফরম পূরণ করুন',
        'সব ওয়ারিশের NID + ছবি জমা দিন',
        'নমিনি থাকলে নমিনির তথ্য',
        'Account close করে টাকা তুলুন বা ট্রান্সফার করুন'
      ],
      duration: '১-৩ মাস',
      cost: 'সাধারণত কোনো খরচ নেই',
      documents: [
        'ওয়ারিশ সার্টিফিকেট',
        'মৃত্যু সনদ',
        'ওয়ারিশদের NID',
        'ব্যাংক পাসবুক/চেক বুক',
        'নমিনি ফরম (যদি থাকে)'
      ]
    }
  ];

  const contacts = [
    {
      category: 'আইনি সহায়তা',
      services: [
        {
          name: 'জাতীয় আইনি সহায়তা প্রদান সংস্থা',
          phone: '১৬৪৩০ (Toll Free)',
          address: 'Supreme Court Premises, Dhaka',
          service: 'বিনামূল্যে আইনি পরামর্শ',
          hours: 'সকাল ৯টা - বিকাল ৫টা (রবিবার বন্ধ)'
        },
        {
          name: 'Bangladesh Legal Aid and Services Trust (BLAST)',
          phone: '০২-৯৮৮৮৭৮৭',
          address: 'House 6/5, Block D, Lalmatia, Dhaka',
          service: 'আইনি সহায়তা ও মামলা পরিচালনা',
          hours: 'সকাল ১০টা - বিকাল ৬টা'
        },
        {
          name: 'Ain o Salish Kendra (ASK)',
          phone: '০২-৫৮৩১৬৫১৪',
          address: 'House 18, Road 10, Dhanmondi, Dhaka',
          service: 'মানবাধিকার ও আইনি সহায়তা',
          hours: 'সকাল ৯টা - বিকাল ৫টা'
        }
      ]
    },
    {
      category: 'ভূমি অফিস',
      services: [
        {
          name: 'ঢাকা জেলা ভূমি অফিস',
          phone: '০২-৯৫৬৬৩৪১',
          address: 'Deputy Commissioner Office, Dhaka',
          service: 'জমির নামজারি, খতিয়ান',
          hours: 'সকাল ৯টা - বিকাল ৩টা'
        },
        {
          name: 'অনলাইন ভূমি সেবা',
          phone: '১৬১২২',
          website: 'land.gov.bd',
          service: 'খতিয়ান যাচাই, অনলাইন আবেদন',
          hours: '২৪/৭'
        }
      ]
    },
    {
      category: 'বিচার বিভাগ',
      services: [
        {
          name: 'ফ্যামিলি কোর্ট',
          phone: 'স্থানীয় কোর্ট',
          address: 'জেলা জজ কোর্ট',
          service: 'পারিবারিক বিরোধ নিষ্পত্তি',
          hours: 'সকাল ১০টা - বিকাল ৪টা'
        },
        {
          name: 'দেওয়ানি আদালত',
          phone: 'স্থানীয় কোর্ট',
          address: 'জেলা জজ কোর্ট',
          service: 'উত্তরাধিকার মামলা',
          hours: 'সকাল ১০টা - বিকাল ৪টা'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaGavel className="text-[#c9a84c]" size={22} />
            <h1 className="text-2xl font-bold text-[#1a4731]">বাংলাদেশী আইন ও প্রক্রিয়া</h1>
          </div>
          <p className="text-gray-600 text-sm">উত্তরাধিকার সংক্রান্ত আইন, ওয়ারিশ সার্টিফিকেট ও নামজারি</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                selectedTab === tab.id
                  ? 'bg-[#1a4731] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-[#e2ddd5]'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Acts Tab */}
        {selectedTab === 'acts' && (
          <div className="space-y-4">
            {acts.map((act, index) => (
              <div key={index} className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-[#1a4731]/8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaGavel className="text-[#1a4731]" size={14} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a4731] text-sm mb-0.5">{act.title}</h3>
                    <p className="text-xs text-gray-500">{act.importance}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {act.sections.map((section, i) => (
                    <div key={i} className="bg-[#f7f5f0] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#1a4731] text-white px-2 py-0.5 rounded text-xs font-medium">
                          {section.section}
                        </span>
                        <h4 className="font-medium text-[#1a4731] text-sm">{section.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Tab */}
        {selectedTab === 'certificate' && (
          <div className="space-y-4">
            {certificateSteps.map((step, index) => (
              <div key={index} className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1a4731] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a4731] text-sm">{step.title}</h3>
                    {step.duration && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <FaClock size={11} /> সময়: {step.duration}
                      </p>
                    )}
                  </div>
                </div>

                {step.documents && (
                  <div className="mb-4">
                    <h4 className="font-medium text-[#1a4731] text-sm mb-2 flex items-center gap-1.5">
                      <FaClipboardList size={12} /> প্রয়োজনীয় কাগজপত্র
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-1.5">
                      {step.documents.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.process && (
                  <div className="mb-4">
                    <h4 className="font-medium text-[#1a4731] text-sm mb-2 flex items-center gap-1.5">
                      <FaFileAlt size={12} /> প্রক্রিয়া
                    </h4>
                    <ol className="space-y-1.5">
                      {step.process.map((proc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#1a4731] font-bold flex-shrink-0">{i + 1}.</span>
                          {proc}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800 flex items-start gap-2">
                    <FaLightbulb className="text-amber-600 flex-shrink-0 mt-0.5" size={12} />
                    <span><strong>টিপস:</strong> {step.tips}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Namjari Tab */}
        {selectedTab === 'namjari' && (
          <div className="space-y-4">
            {namjariProcess.map((item, index) => (
              <div key={index} className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-[#1a4731]/8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaUniversity className="text-[#1a4731]" size={14} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a4731] text-sm">{item.type}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.authority}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#f7f5f0] rounded-lg p-3">
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                      <FaClock size={11} /> সময়
                    </p>
                    <p className="font-medium text-[#1a4731] text-sm">{item.duration}</p>
                  </div>
                  <div className="bg-[#f7f5f0] rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">খরচ</p>
                    <p className="font-medium text-[#1a4731] text-sm">{item.cost}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-[#1a4731] text-sm mb-2">ধাপসমূহ</h4>
                  <ol className="space-y-1.5">
                    {item.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-[#1a4731] text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium text-[#1a4731] text-sm mb-2 flex items-center gap-1.5">
                    <FaClipboardList size={12} /> কাগজপত্র
                  </h4>
                  <div className="grid md:grid-cols-2 gap-1.5">
                    {item.documents.map((doc, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contacts Tab */}
        {selectedTab === 'contacts' && (
          <div className="space-y-4">
            {contacts.map((category, index) => (
              <div key={index} className="bg-white border border-[#e2ddd5] rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1a4731] text-sm mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#c9a84c]" size={14} />
                  {category.category}
                </h3>

                <div className="space-y-3">
                  {category.services.map((service, i) => (
                    <div key={i} className="border border-[#e2ddd5] rounded-lg p-4">
                      <h4 className="font-medium text-[#1a4731] text-sm mb-2">{service.name}</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaPhone className="text-[#1a4731] flex-shrink-0" size={11} />
                          {service.phone}
                        </p>
                        {service.address && (
                          <p className="text-gray-600 flex items-start gap-2">
                            <FaMapMarkerAlt className="text-[#1a4731] flex-shrink-0 mt-0.5" size={11} />
                            {service.address}
                          </p>
                        )}
                        {service.website && (
                          <p className="text-gray-600 text-xs">
                            ওয়েবসাইট:{' '}
                            <a href={`https://${service.website}`} className="text-[#1a4731] underline">
                              {service.website}
                            </a>
                          </p>
                        )}
                        <p className="text-gray-500 text-xs">{service.service} · {service.hours}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Warning Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-bold text-amber-800 text-sm mb-3 flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-600" size={14} />
                জরুরি নোট
              </h3>
              <ul className="space-y-1.5 text-sm text-amber-800">
                {[
                  'অফিসে যাওয়ার আগে ফোনে যোগাযোগ করে নিশ্চিত হয়ে নিন',
                  'সব কাগজপত্রের ফটোকপি সাথে রাখুন',
                  'সরকারি ছুটির দিন চেক করে নিন',
                  'কোনো দালালের কাছে যাবেন না, নিজে করুন'
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold flex-shrink-0">•</span>
                    {note}
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

export default BangladeshLaw;
