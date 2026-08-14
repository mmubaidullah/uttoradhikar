import { FaShieldAlt, FaFileAlt, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';

const Terms = () => {
  const sections = [
    {
      id: 1,
      icon: FaEnvelope,
      title: "সহায়তা",
      subtitle: "Support",
      content: (
        <p className="text-sm text-gray-600 leading-relaxed">
          ক্যালকুলেটর ব্যবহারে কোনো সমস্যা বা কারিগরি ত্রুটি দেখা দিলে আমাদের সাথে যোগাযোগ করুন।
          আমরা যথাসাধ্য দ্রুত সাড়া দেওয়ার চেষ্টা করি।
          <br /><br />
          ইমেল:{" "}
          <a href="mailto:office.inshirahbd@gmail.com" className="text-[#1a4731] font-medium hover:underline">
            office.inshirahbd@gmail.com
          </a>
        </p>
      ),
    },
    {
      id: 2,
      icon: FaShieldAlt,
      title: "গোপনীয়তা নীতি",
      subtitle: "Privacy Policy",
      content: (
        <p className="text-sm text-gray-600 leading-relaxed">
          আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।
          হিসাব করার সময় আপনি যে সম্পদের তথ্য বা ওয়ারিশের বিবরণ ইনপুট দেন,
          তা আমাদের কোনো সার্ভারে সংরক্ষিত হয় না।
          ব্রাউজার ট্যাব বন্ধ হওয়ার সাথে সাথেই সব তথ্য মুছে যায়।
          কোনো তৃতীয় পক্ষের সাথে আপনার তথ্য শেয়ার করা হয় না।
        </p>
      ),
    },
    {
      id: 3,
      icon: FaFileAlt,
      title: "ব্যবহারের শর্তাবলী",
      subtitle: "Terms of Use",
      content: (
        <div className="text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            এই ওয়েবসাইট শুধুমাত্র শিক্ষামূলক ও সাধারণ হিসাবের উদ্দেশ্যে ব্যবহার করা যাবে।
          </p>
          <ul className="space-y-2 pl-2">
            {[
              "কোনো অসৎ উদ্দেশ্যে এই প্ল্যাটফর্ম ব্যবহার করা যাবে না।",
              "হিসাবের ফলাফল পারিবারিক বা আইনি বিষয়ে চূড়ান্ত দলিল হিসেবে গণ্য হবে না।",
              "আমরা যেকোনো সময় সিস্টেমের যেকোনো অংশ পরিবর্তন করার অধিকার রাখি।",
              "এই শর্তাবলী পরিবর্তন হলে ওয়েবসাইটে জানানো হবে।",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#1a4731] mt-1 flex-shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-bold text-[#1a4731] mb-2">আইনি তথ্যাবলি ও নীতিমালা</h1>
        <p className="text-gray-500 mb-8 text-sm">সর্বশেষ হালনাগাদ: জানুয়ারি ২০২৫</p>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.id} className="bg-white border border-[#e2ddd5] rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e2ddd5]">
                <div className="w-8 h-8 bg-[#1a4731]/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <s.icon className="text-[#1a4731]" size={14} />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-sm leading-none mb-0.5">{s.title}</h2>
                  <span className="text-xs text-gray-400">{s.subtitle}</span>
                </div>
              </div>
              <div className="px-6 py-5">{s.content}</div>
            </div>
          ))}

          {/* Disclaimer — highlighted */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-amber-200">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-amber-600" size={14} />
              </div>
              <div>
                <h2 className="font-semibold text-amber-900 text-sm leading-none mb-0.5">ডিসক্লেইমার</h2>
                <span className="text-xs text-amber-600">Disclaimer</span>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                এই ক্যালকুলেটরটি হানাফি মাযহাবের ফারায়েজ বিধানের গাণিতিক নীতিতে তৈরি।
                পারিবারিক বা আইনি প্রয়োজনে ব্যবহারের আগে অভিজ্ঞ মুফতি বা ফারায়েজ বিশেষজ্ঞের
                পরামর্শ নেওয়া আবশ্যক। যান্ত্রিক ত্রুটিজনিত কোনো গরমিলের জন্য কর্তৃপক্ষ
                দায়বদ্ধ থাকবে না।
              </p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          এই নীতিমালা সম্পর্কে কোনো প্রশ্ন থাকলে{" "}
          <a href="mailto:office.inshirahbd@gmail.com" className="text-[#1a4731] hover:underline">
            office.inshirahbd@gmail.com
          </a>{" "}
          এ যোগাযোগ করুন।
        </p>
      </div>
    </div>
  );
};

export default Terms;
