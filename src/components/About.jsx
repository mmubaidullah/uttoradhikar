import { FaBullseye, FaShieldAlt, FaUsers, FaCode, FaEnvelope } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f0] py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#1a4731]/60 text-sm mb-6">
          <span>হোম</span><span>/</span>
          <span className="text-[#1a4731] font-medium">পরিচিতি</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#1a4731] text-white rounded-2xl px-8 py-12 md:px-14 md:py-16 mb-8 relative overflow-hidden">
          {/* subtle pattern */}
          <div className="absolute right-0 top-0 w-72 h-72 border-[60px] border-white/5 rounded-full -mr-24 -mt-24" />
          <div className="absolute right-24 bottom-0 w-40 h-40 border-[40px] border-[#c9a84c]/10 rounded-full -mb-16" />
          <div className="relative max-w-2xl">
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
              আমাদের সম্পর্কে
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-5">
              সঠিক বন্টন,<br />নিশ্চিত ইনসাফ।
            </h1>
            <p className="text-white/70 leading-relaxed text-base max-w-xl">
              প্রযুক্তির মাধ্যমে ইসলামি উত্তরাধিকার বিধান প্রতিটি মানুষের কাছে
              সহজলভ্য করার লক্ষ্যে আমাদের এই প্ল্যাটফর্ম তৈরি।
            </p>
          </div>
        </div>

        {/* Two column - goal & reliability */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="bg-white border border-[#e2ddd5] rounded-xl p-7">
            <div className="w-10 h-10 bg-[#1a4731]/8 rounded-lg flex items-center justify-center mb-4">
              <FaBullseye className="text-[#1a4731]" size={18} />
            </div>
            <h2 className="font-bold text-gray-900 mb-3">আমাদের লক্ষ্য</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              পারিবারিক সম্পদ বন্টনে জটিলতার কারণে অনেক সময় ভুল হয়। আমাদের এই হিসাবক
              সেই জটিলতা দূর করে পারিবারিক বিরোধ কমাতে সহায়তা করে।
              শরীয়াহ সম্মত বন্টন সবার জন্য সহজ করাই আমাদের উদ্দেশ্য।
            </p>
          </div>
          <div className="bg-white border border-[#e2ddd5] rounded-xl p-7">
            <div className="w-10 h-10 bg-[#1a4731]/8 rounded-lg flex items-center justify-center mb-4">
              <FaShieldAlt className="text-[#1a4731]" size={18} />
            </div>
            <h2 className="font-bold text-gray-900 mb-3">নির্ভরযোগ্যতা</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              এই সিস্টেম <strong>হানাফি মাযহাবের</strong> ফারায়েজ আইনের উপর ভিত্তি করে
              তৈরি। জাবিল ফুরুজ, আসাবা, আউল এবং রাদ্দ — সব ক্ষেত্র
              সঠিকভাবে প্রোগ্রাম করা হয়েছে।
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white border border-[#e2ddd5] rounded-xl p-8 mb-5">
          <h2 className="font-bold text-gray-900 mb-6 text-lg">কেন ব্যবহার করবেন</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: FaCode,      title: "স্বয়ংক্রিয় হিসাব",   desc: "জটিল বঞ্চনা ও সমন্বয় নিয়ম অটোমেটিক প্রয়োগ হয়। আউল ও রাদ্দও হিসাব হয় সঠিকভাবে।" },
              { icon: FaUsers,     title: "সহজ ইন্টারফেস",       desc: "সরল ডিজাইনে যে কেউ সহজে ব্যবহার করতে পারবেন। মোবাইলেও সমানভাবে কাজ করে।" },
              { icon: FaShieldAlt, title: "বিনামূল্যে",           desc: "নিবন্ধন ছাড়াই সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়। কোনো তথ্য সংরক্ষণ হয় না।" },
            ].map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-9 h-9 bg-[#1a4731]/8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <f.icon className="text-[#1a4731]" size={15} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1a4731] rounded-xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-bold text-white mb-1">পরামর্শ বা মন্তব্য আছে?</h3>
            <p className="text-white/60 text-sm">এই প্ল্যাটফর্ম উন্নত করতে আপনার মতামত জানান।</p>
          </div>
          <a
            href="mailto:info@uttoradhikar.com"
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8963e] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex-shrink-0"
          >
            <FaEnvelope size={13} />
            যোগাযোগ করুন
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;
