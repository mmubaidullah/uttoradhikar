import { useState, useMemo } from 'react';
import { FaQuestionCircle, FaSearch, FaBook, FaCheckCircle, FaGraduationCap, FaBullseye, FaPuzzlePiece, FaLightbulb, FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const faqData = {
    basic: [
      {
        id: 'b1',
        q: 'ফারায়েজ কাকে বলে?',
        a: 'ফারায়েজ (الفرائض) হলো ইসলামী উত্তরাধিকার আইন, যেখানে মৃত ব্যক্তির সম্পদ তার ওয়ারিশদের মধ্যে শরীয়াহ অনুযায়ী বন্টন করা হয়। কুরআন ও হাদিসে নির্ধারিত নিয়ম অনুসরণ করে প্রত্যেক ওয়ারিশের প্রাপ্য অংশ নির্ণয় করা হয়।',
        ref: 'সূরা নিসা: ১১-১২, ১৭৬',
        importance: 5
      },
      {
        id: 'b2',
        q: 'জাবিল ফুরুজ কারা?',
        a: 'জাবিল ফুরুজ (ذوي الفروض) হলো সেই ওয়ারিশ যাদের অংশ কুরআন-হাদিসে নির্ধারিত আছে। মোট ১২ জন: ৪ পুরুষ (স্বামী, বাবা, দাদা, বৈপিত্রীয় ভাই) এবং ৮ নারী (স্ত্রী, মা, দাদি, নানি, মেয়ে, পুত্রের মেয়ে, সহোদর বোন, বৈমাত্রীয় বোন, বৈপিত্রীয় বোন)।',
        ref: 'সিরাজী, শরহে সিরাজী',
        importance: 5
      },
      {
        id: 'b3',
        q: 'আসাবা কাদের বলা হয়?',
        a: 'আসাবা (عصبة) মানে অবশিষ্টাংশ ভোগী। জাবিল ফুরুজদের অংশ দেওয়ার পর যা বাকি থাকে তা আসাবারা পায়। সাধারণত পুরুষ আত্মীয়রা আসাবা হয়। যেমন: ছেলে, পিতা, ভাই, চাচা ইত্যাদি।',
        ref: 'সহিহ বুখারী: ৬৭৩২',
        importance: 5
      },
      {
        id: 'b4',
        q: 'বঞ্চনা (মাহরূমিয়াত) কী?',
        a: 'বঞ্চনা মানে কোনো ওয়ারিশ থাকা সত্ত্বেও তাকে উত্তরাধিকার না দেওয়া। ৩টি প্রধান কারণ: (১) মৃত ব্যক্তিকে হত্যা করা, (২) ধর্ম ভিন্ন হওয়া (মুসলিম-অমুসলিম), (৩) দাসত্ব (এখন নেই)। এছাড়া hijab (পর্দা) বঞ্চনা - কাছের ওয়ারিশ থাকলে দূরের ওয়ারিশ বঞ্চিত।',
        ref: 'সহিহ বুখারী: ৬৭৬৪ (ধর্ম), সহিহ মুসলিম: ১৬১৪ (হত্যা)',
        importance: 5
      },
      {
        id: 'b5',
        q: 'মৃত ব্যক্তির ঋণ থাকলে কী হবে?',
        a: 'ঋণ পরিশোধ সবার আগে। ক্রম: (১) কাফন-দাফনের খরচ, (২) ঋণ পরিশোধ, (৩) অসিয়ত (যদি থাকে, সর্বোচ্চ ১/৩), (৪) ওয়ারিশদের বন্টন। ঋণ পরিশোধের আগে কোনো বন্টন হবে না।',
        ref: 'সুনানে তিরমিযী: ২০৯২',
        importance: 5
      },
      {
        id: 'b6',
        q: 'অসিয়ত (Will) কতটুকু করা যায়?',
        a: 'সর্বোচ্চ মোট সম্পদের ১/৩ অংশ অসিয়ত করা যায়। এর বেশি করতে চাইলে সব ওয়ারিশের সম্মতি লাগবে। ওয়ারিশদের জন্য অসিয়ত করা যায় না (তবে অন্য ওয়ারিশরা সম্মতি দিলে বৈধ)।',
        ref: 'সহিহ বুখারী: ২৭৪৪, সুনানে তিরমিযী: ২১২০',
        importance: 4
      },
      {
        id: 'b7',
        q: 'পুত্র ও কন্যার অংশের অনুপাত কত?',
        a: 'পুত্র ও কন্যা একসাথে থাকলে পুত্র দ্বিগুণ পায়। অর্থাৎ ২:১ অনুপাতে। উদাহরণ: ২ ছেলে + ১ মেয়ে = মোট ৫ ভাগ (প্রতি ছেলে ২ ভাগ, মেয়ে ১ ভাগ)।',
        ref: 'সূরা নিসা: ১১',
        importance: 5
      },
      {
        id: 'b8',
        q: 'স্বামী কতটুকু পায়?',
        a: 'সন্তান বা পুত্রের সন্তান থাকলে স্বামী পায় ১/৪ অংশ। না থাকলে পায় ১/২ অংশ।',
        ref: 'সূরা নিসা: ১২',
        importance: 5
      },
      {
        id: 'b9',
        q: 'স্ত্রী কতটুকু পায়?',
        a: 'সন্তান বা পুত্রের সন্তান থাকলে স্ত্রী পায় ১/৮ অংশ। না থাকলে পায় ১/৪ অংশ। একাধিক স্ত্রী থাকলে এই অংশ সবার মধ্যে সমান ভাগ হবে।',
        ref: 'সূরা নিসা: ১২',
        importance: 5
      },
      {
        id: 'b10',
        q: 'মা কতটুকু পায়?',
        a: 'মায়ের অংশ তিন রকম: (১) সন্তান বা একাধিক ভাই-বোন থাকলে ১/৬, (২) এগুলো না থাকলে ১/৩, (৩) গারাভাইন মাসআলায় অবশিষ্টের ১/৩।',
        ref: 'সূরা নিসা: ১১',
        importance: 5
      }
    ],
    specific: [
      {
        id: 's1',
        q: 'বাবা কখন আসাবা হয়?',
        a: 'বাবা সবসময় ওয়ারিশ হয়। পুত্র বা পুত্রের পুত্র থাকলে বাবা ১/৬ পায় (জাবিল ফুরুজ)। না থাকলে বাবা ১/৬ + বাকি সব (আসাবা)।',
        ref: 'সূরা নিসা: ১১',
        importance: 4
      },
      {
        id: 's2',
        q: 'দাদা কখন ওয়ারিশ হয়?',
        a: 'বাবা না থাকলে দাদা বাবার মতো ওয়ারিশ হয়। বাবা থাকলে দাদা বঞ্চিত (hijab)।',
        ref: 'সিরাজী, হিদায়া',
        importance: 3
      },
      {
        id: 's3',
        q: 'মেয়ে থাকলে পুত্রের মেয়ে কী পাবে?',
        a: 'এক মেয়ে থাকলে পুত্রের মেয়ে ১/৬ পায়। দুই বা তার বেশি মেয়ে থাকলে পুত্রের মেয়ে বঞ্চিত হয় (তবে তার সাথে পুত্রের পুত্র থাকলে আসাবা হবে)।',
        ref: 'সহিহ বুখারী: ৬৭৩৬',
        importance: 4
      },
      {
        id: 's4',
        q: 'ভাই কখন বঞ্চিত হয়?',
        a: 'সহোদর/বৈমাত্রীয় ভাই বঞ্চিত হয় যখন: (১) পুত্র থাকে, (২) পুত্রের পুত্র থাকে, (৩) বাবা থাকে। বৈপিত্রীয় ভাই এদের সাথে মা থাকলেও বঞ্চিত।',
        ref: 'সিরাজী',
        importance: 3
      },
      {
        id: 's5',
        q: 'বোন কখন আসাবা হয়?',
        a: 'বোন দুইভাবে আসাবা: (১) ভাই-এর সাথে (২:১ অনুপাতে), (২) মেয়ে বা পুত্রের মেয়ের সাথে (আসাবা বিল গাইর)। এক্ষেত্রে বোন যা বাকি থাকে সব পায়।',
        ref: 'সহিহ বুখারী: ৬৭৩৬',
        importance: 4
      },
      {
        id: 's6',
        q: 'নানা-নানি কি ওয়ারিশ হয়?',
        a: 'শুধু নানি ওয়ারিশ হয় (মা না থাকলে), ১/৬ অংশ পায়। নানা কখনো ওয়ারিশ হয় না।',
        ref: 'সুনানে তিরমিযী: ২১০০',
        importance: 3
      },
      {
        id: 's7',
        q: 'দাদা-দাদি একসাথে থাকলে?',
        a: 'দাদা ও দাদি দুইজনই ওয়ারিশ হবে (বাবা-মা না থাকলে)। দাদি ১/৬ পাবে, দাদা বাবার মতো হিসাব।',
        ref: 'হিদায়া',
        importance: 3
      },
      {
        id: 's8',
        q: 'চাচা কখন ওয়ারিশ হয়?',
        a: 'চাচা ওয়ারিশ হয় যখন কোনো নিকট আসাবা না থাকে (পুত্র, পিতা, দাদা, ভাই, ভাতিজা সবাই নেই)। আসাবা হিসেবে সব পায়।',
        ref: 'সিরাজী - আসাবার ক্রম',
        importance: 2
      },
      {
        id: 's9',
        q: 'একাধিক স্ত্রী থাকলে কীভাবে ভাগ হবে?',
        a: 'স্ত্রীর মোট অংশ (১/৪ বা ১/৮) সব স্ত্রীর মধ্যে সমান ভাগ হবে। যেমন: ৩ স্ত্রী, অংশ ১/৮ = প্রতিজন পাবে ১/২৪।',
        ref: 'ইজমা',
        importance: 4
      },
      {
        id: 's10',
        q: 'হত্যাকারী কেন বঞ্চিত?',
        a: 'ইচ্ছাকৃত হত্যাকারী ওয়ারিশ হওয়ার যোগ্যতা হারায়। কারণ কেউ নিজের অপরাধের মাধ্যমে লাভবান হতে পারে না। তবে ভুলবশত হত্যায় মতভেদ আছে।',
        ref: 'সুনানে আবু দাউদ: ২৮৭৫, সুনানে ইবনে মাজাহ: ২৭৩৫',
        importance: 4
      }
    ],
    complex: [
      {
        id: 'c1',
        q: 'আউল (Awl) কী?',
        a: 'আউল (عول) মানে বৃদ্ধি। যখন সব জাবিল ফুরুজের অংশ যোগ করলে ১-এর বেশি হয়, তখন আউল হয়। সমাধান: বেসিস সংখ্যা বাড়িয়ে সবার অংশ আনুপাতিক কমানো। যেমন: ৬→৭, ১২→১৩।',
        ref: 'হযরত উমর (রাঃ)-এর সমাধান, হিদায়া: ৪/৪৫৬',
        importance: 3
      },
      {
        id: 'c2',
        q: 'রাদ্দ (Radd) কী?',
        a: 'রাদ্দ (رد) মানে ফেরত দেওয়া। যখন জাবিল ফুরুজের অংশের পর সম্পদ বাকি থাকে এবং কোনো আসাবা নেই, তখন স্বামী/স্ত্রী ছাড়া বাকি জাবিল ফুরুজদের অংশ অনুপাতে ফেরত দেওয়া হয়।',
        ref: 'হিদায়া: ৪/৪৬২, ফতোয়ায়ে আলমগীরী',
        importance: 3
      },
      {
        id: 'c3',
        q: 'গারাভাইন মাসআলা কী?',
        a: 'স্বামী/স্ত্রী + মা + বাবা (কোনো সন্তান নেই)। বিশেষত্ব: মা সাধারণত ১/৩ পায়, কিন্তু এখানে "অবশিষ্টের ১/৩" পায়। কারণ হযরত উমর (রাঃ)-এর ফায়সালা - বাবার অংশ মায়ের দ্বিগুণ হওয়া উচিত।',
        ref: 'হিদায়া: ৪/৪৩৮, ফতোয়ায়ে আলমগীরী: ৬/৪৪২',
        importance: 3
      },
      {
        id: 'c4',
        q: 'মাফকুদ (নিখোঁজ) ব্যক্তির সম্পদ?',
        a: 'যার জীবিত/মৃত অবস্থা অজানা, তার সম্পদ আটকে রাখা হয়। যুদ্ধে নিখোঁজ: ৪ বছর অপেক্ষা। সাধারণ: ৯০ বছর বা আদালতের সিদ্ধান্ত। আদালত মৃত ঘোষণার পর বন্টন।',
        ref: 'হিদায়া: ৪/৫৪২, Declaration of Death Act 1956 (Bangladesh)',
        importance: 2
      },
      {
        id: 'c5',
        q: 'গর্ভস্থ সন্তান কি ওয়ারিশ হবে?',
        a: 'হ্যাঁ, শর্ত: (১) মৃত্যুর সময় গর্ভে ছিল, (২) জীবিত জন্ম নেয়, (৩) ৬ মাস গর্ভকাল পূর্ণ। হিসাব: ছেলে ও মেয়ে দুই অবস্থায় হিসাব করে যেটায় কম পায় সেটা এখনই দেওয়া, বাকি আটকে রাখা।',
        ref: 'সিরাজী: পৃ. ৯৮, শরহে সিরাজী: ১২৫',
        importance: 2
      },
      {
        id: 'c6',
        q: 'খুনসা (হার্মাফ্রোডাইট) এর অংশ?',
        a: 'লিঙ্গ নির্ণয় অসম্ভব হলে (খুনসা মুশকিল): পুরুষ ও নারী দুই অবস্থায় হিসাব করে যেটায় কম পায় সেটা দেওয়া। বাংলাদেশে ২০১৩ সালে তৃতীয় লিঙ্গ স্বীকৃতি পেয়েছে।',
        ref: 'ফতোয়ায়ে আলমগীরী: ৬/৪৪৮, হিদায়া: ৪/৫৪৫',
        importance: 1
      },
      {
        id: 'c7',
        q: 'লিয়ান হলে সন্তানের অবস্থা?',
        a: 'লিয়ান (স্ত্রীর বিরুদ্ধে অভিযোগ) হলে সন্তানের বংশ পিতা থেকে বিচ্ছিন্ন হয়। সন্তান শুধু মায়ের দিক থেকে ওয়ারিশ হবে, পিতার দিক থেকে নয়।',
        ref: 'সূরা নূর: ৬-৯, হিদায়া',
        importance: 1
      },
      {
        id: 'c8',
        q: 'একসাথে মৃত্যু হলে (Simultaneous Death)?',
        a: 'প্লেন ক্র্যাশ/দুর্ঘটনায় একসাথে মারা গেলে এবং কে আগে মরেছে জানা না থাকলে - একে অপরের ওয়ারিশ হবে না। তৃতীয় জীবিত ওয়ারিশরা প্রত্যেকের সম্পদ আলাদাভাবে পাবে।',
        ref: 'ফতোয়ায়ে আলমগীরী: ৬/৪৫১',
        importance: 1
      }
    ],
    modern: [
      {
        id: 'm1',
        q: 'ব্যাংক লোন/ঋণ থাকলে?',
        a: 'সব ধরনের ঋণ (ব্যাংক লোন, ক্রেডিট কার্ড, ব্যক্তিগত ঋণ) সবার আগে পরিশোধ করতে হবে। ঋণ পরিশোধের পর যা বাকি থাকবে তা-ই বন্টন হবে।',
        ref: 'সুনানে তিরমিযী: ২০৯২',
        importance: 5
      },
      {
        id: 'm2',
        q: 'ব্যাংক একাউন্ট কীভাবে ট্রান্সফার?',
        a: 'ওয়ারিশ সার্টিফিকেট নিয়ে ব্যাংকে আবেদন করুন। প্রয়োজন: মৃত্যু সনদ, NID, ওয়ারিশ প্রমাণপত্র। ব্যাংক নিজস্ব ফরম পূরণ করতে দেবে। সময়: ১-৩ মাস।',
        ref: 'Bangladesh Bank Guidelines',
        importance: 4
      },
      {
        id: 'm3',
        q: 'জমি নামজারি কীভাবে করবো?',
        a: 'ধাপ: (১) ওয়ারিশ সার্টিফিকেট, (২) জমির দলিল, (৩) সর্বশেষ খাজনা রশিদ, (৪) ওয়ারিশদের NID নিয়ে ভূমি অফিসে দরখাস্ত। ফি: জমির মূল্যের ১-২%। সময়: ৬-১২ মাস।',
        ref: 'Land Transfer Act, DC Office Guidelines',
        importance: 4
      },
      {
        id: 'm4',
        q: 'ক্রিপ্টোকারেন্সি কীভাবে বন্টন?',
        a: 'ক্রিপ্টো সম্পদ হিসেবে গণ্য। মৃত্যুর দিনের মার্কেট মূল্য অনুযায়ী টাকায় রূপান্তর করে হিসাব। তবে ওয়ালেট অ্যাক্সেস (Private Key) প্রয়োজন। না থাকলে উদ্ধার অসম্ভব।',
        ref: 'Contemporary Fiqh Council Fatwa, Darul Ifta Birmingham 2020',
        importance: 3
      },
      {
        id: 'm5',
        q: 'শেয়ার বাজারের শেয়ার?',
        a: 'শেয়ার সম্পদ হিসেবে বন্টন হবে। মৃত্যুর দিনের বাজার মূল্য অনুযায়ী হিসাব। CDBL-এ BO Account ট্রান্সফার প্রক্রিয়া আছে। ওয়ারিশ সার্টিফিকেট + মৃত্যু সনদ লাগবে।',
        ref: 'CDBL Guidelines, SEC Regulations',
        importance: 3
      },
      {
        id: 'm6',
        q: 'জীবন বীমার টাকা (Life Insurance)?',
        a: 'মতভেদ আছে। অধিকাংশ আলেমের মতে: নমিনি নির্ধারিত থাকলে সে পাবে (অসিয়তের মতো, ১/৩ সীমার মধ্যে)। না থাকলে ওয়ারিশদের মধ্যে বন্টন। তবে সুদভিত্তিক বীমা হারাম।',
        ref: 'ফতোয়া: ইসলামিক ফাউন্ডেশন বাংলাদেশ',
        importance: 3
      },
      {
        id: 'm7',
        q: 'পেনশন ফান্ড বন্টন?',
        a: 'সরকারি পেনশন: নমিনি থাকলে তাকে দেওয়া হয় (তবে শরীয়াহ অনুযায়ী ওয়ারিশদের মধ্যে বন্টন করা উচিত)। প্রভিডেন্ট ফান্ড: নমিনি পায়, তবে ওয়ারিশদের হক আছে।',
        ref: 'Pension Rules, Fatwa',
        importance: 3
      },
      {
        id: 'm8',
        q: 'বিদেশে সম্পত্তি থাকলে?',
        a: 'বিদেশের সম্পত্তিও ইসলামী আইন অনুযায়ী বন্টন করা উচিত। তবে সেই দেশের আইন মানতে হবে (যদি তারা ইসলামী আইন না মানে)। সমাধান: ওয়ারিশরা নিজেরা সমঝোতায় শরীয়াহ মতে ভাগ করতে পারে।',
        ref: 'International Inheritance Law, Fiqh Council',
        importance: 2
      },
      {
        id: 'm9',
        q: 'ব্যবসায়িক কোম্পানির শেয়ার?',
        a: 'প্রাইভেট লিমিটেড/পাবলিক লিমিটেড কোম্পানির শেয়ার সম্পদ। মৃত্যুর সময় শেয়ারের Fair Market Value অনুযায়ী বন্টন। RJSC-তে শেয়ার ট্রান্সফার করতে হবে।',
        ref: 'Companies Act 1994',
        importance: 2
      },
      {
        id: 'm10',
        q: 'ডিজিটাল সম্পদ (Domain, Social Media, YouTube)?',
        a: 'ডিজিটাল সম্পদ যদি আয় করে (YouTube monetization, Domain lease) তবে সম্পদ হিসেবে বন্টন হবে। মূল্যায়ন: বাজার মূল্য বা ভবিষ্যৎ আয়ের PV (Present Value)। তবে অ্যাক্সেস পাওয়া জটিল।',
        ref: 'Contemporary Fiqh - Digital Assets (2020+)',
        importance: 2
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'সবগুলো', icon: <FaBook size={12} />, count: Object.values(faqData).flat().length },
    { id: 'basic', name: 'মৌলিক', icon: <FaGraduationCap size={12} />, count: faqData.basic.length },
    { id: 'specific', name: 'নির্দিষ্ট', icon: <FaBullseye size={12} />, count: faqData.specific.length },
    { id: 'complex', name: 'জটিল', icon: <FaPuzzlePiece size={12} />, count: faqData.complex.length },
    { id: 'modern', name: 'আধুনিক', icon: <FaLightbulb size={12} />, count: faqData.modern.length }
  ];

  const allFAQs = useMemo(() => {
    const combined = [...faqData.basic, ...faqData.specific, ...faqData.complex, ...faqData.modern];
    let filtered = selectedCategory === 'all' ? combined : faqData[selectedCategory];
    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [selectedCategory, searchTerm]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#1a4731]/60 text-sm mb-6">
          <span>হোম</span>
          <span>/</span>
          <span className="text-[#1a4731] font-medium">সচরাচর জিজ্ঞাসা</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaQuestionCircle className="text-[#c9a84c]" size={22} />
            <h1 className="text-2xl font-bold text-[#1a4731]">সচরাচর জিজ্ঞাসা (FAQ)</h1>
          </div>
          <p className="text-gray-600 text-sm">উত্তরাধিকার সংক্রান্ত গুরুত্বপূর্ণ প্রশ্নোত্তর — দলিলসহ</p>
        </div>

        {/* Search */}
        <div className="bg-white border border-[#e2ddd5] rounded-xl p-4 mb-4 shadow-sm">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="প্রশ্ন বা উত্তরে সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#e2ddd5] rounded-lg text-sm focus:outline-none focus:border-[#1a4731] bg-white"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#1a4731] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-[#e2ddd5]'
              }`}
            >
              {cat.icon}
              {cat.name}
              <span className={`text-xs ${selectedCategory === cat.id ? 'text-white/70' : 'text-gray-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        {allFAQs.length === 0 ? (
          <div className="bg-white border border-[#e2ddd5] rounded-xl p-12 text-center">
            <FaQuestionCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">কোনো প্রশ্ন পাওয়া যায়নি</p>
            <p className="text-gray-400 text-sm mt-1">অন্য ক্যাটাগরি বা সার্চ টার্ম চেষ্টা করুন</p>
          </div>
        ) : (
          <div className="bg-white border border-[#e2ddd5] rounded-xl shadow-sm divide-y divide-[#e2ddd5]">
            {allFAQs.map((faq, index) => (
              <div key={faq.id}>
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-start gap-3 hover:bg-[#f7f5f0] transition-colors"
                >
                  <div className="w-7 h-7 bg-[#1a4731]/8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#1a4731] text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1a4731] text-sm leading-relaxed">
                      {faq.q}
                    </h3>
                  </div>
                  <FaChevronDown
                    className={`text-gray-400 flex-shrink-0 mt-1 transition-transform ${expandedId === faq.id ? 'rotate-180' : ''}`}
                    size={13}
                  />
                </button>

                {expandedId === faq.id && (
                  <div className="px-5 pb-5 ml-10">
                    <div className="pt-1 pb-3">
                      <p className="text-gray-600 text-sm leading-relaxed text-justify">
                        {faq.a}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 border-l-2 border-[#c9a84c] pl-3">
                      <FaBook className="text-[#c9a84c] flex-shrink-0 mt-0.5" size={11} />
                      <p className="text-xs text-gray-500">{faq.ref}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Note */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold">গুরুত্বপূর্ণ:</span> এই তথ্যগুলো শুধুমাত্র সাধারণ জ্ঞানের জন্য।
            বাস্তব ক্ষেত্রে প্রয়োগের আগে অবশ্যই যোগ্য আলেমের পরামর্শ নিন।
          </p>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
