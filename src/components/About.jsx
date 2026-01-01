import React from 'react';
import { FaBullseye, FaShieldAlt, FaUsers, FaCode } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-bengali">
      <main className="flex-grow pt-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* হিরো সেকশন - আকর্ষণীয় ব্যানার */}
          <div className="relative bg-gradient-to-br from-emerald-800 to-teal-900 rounded-[2rem] p-10 md:p-16 text-white mb-12 shadow-2xl overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                সঠিক বন্টন, <br/><span className="text-emerald-300">নিশ্চিত ইনসাফ।</span>
              </h1>
              <p className="text-emerald-50/80 text-lg leading-relaxed">
                আমাদের লক্ষ্য হলো প্রযুক্তির মাধ্যমে ইসলামি উত্তরাধিকার আইন বা ফারায়েজ বন্টনকে প্রতিটি মানুষের হাতের মুঠোয় পৌঁছে দেওয়া। গাণিতিক নির্ভুলতা আর শরীয়াহর সমন্বয়ে তৈরি এই প্ল্যাটফর্ম।
              </p>
            </div>
            {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
            
            {/* লক্ষ্য ও নির্ভরযোগ্যতা গ্রিড */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <section>
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <FaBullseye size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">আমাদের লক্ষ্য</h2>
                <p className="text-gray-600 leading-relaxed text-justify">
                  পারিবারিক সম্পদ বন্টনের ক্ষেত্রে অনেক সময় হিসাবের জটিলতায় ভুল হয়ে যায়। আমাদের এই ক্যালকুলেটরটি সেই জটিলতাকে দূর করে স্বচ্ছতা আনতে সাহায্য করে। আমরা চাই শরীয়াহ সম্মত বন্টন প্রক্রিয়াকে সবার জন্য সহজ এবং বিতর্কহীন করতে।
                </p>
              </section>

              <section>
                <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <FaShieldAlt size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">নির্ভরযোগ্যতা</h2>
                <p className="text-gray-600 leading-relaxed text-justify">
                  এই সিস্টেমটি মূলত <strong>হানাফি মাযহাবের</strong> ফারায়েজ আইনের ওপর ভিত্তি করে তৈরি। এতে <strong>জাবিল ফুরুজ, আসাবা, আউল এবং রাদ্দ</strong>-এর মতো জটিল গাণিতিক বিষয়গুলো অত্যন্ত সূক্ষ্মভাবে প্রোগ্রাম করা হয়েছে যাতে কোনো ভুল হওয়ার অবকাশ না থাকে।
                </p>
              </section>
            </div>

            <hr className="border-gray-50 mb-16" />

            {/* কোর ফিচার সেকশন */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-800 mb-2">কেন আমাদের ব্যবহার করবেন?</h2>
              <p className="text-gray-500">বিশেষ কিছু বৈশিষ্ট্য যা আমাদের ক্যালকুলেটরকে আলাদা করে</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <FaCode className="text-emerald-600" />, 
                  title: "স্মার্ট অ্যালগরিদম", 
                  desc: "জটিল বঞ্চনা নীতিগুলো অটোমেটিক চেক করে নির্ভুল রেজাল্ট দেয়।" 
                },
                { 
                  icon: <FaUsers className="text-emerald-600" />, 
                  title: "ইউজার ফ্রেন্ডলি", 
                  desc: "খুবই সহজ ইন্টারফেস, যা যে কেউ সহজেই ব্যবহার করতে পারবেন।" 
                },
                { 
                  icon: <FaShieldAlt className="text-emerald-600" />, 
                  title: "নিরাপদ ও ফ্রি", 
                  desc: "কোনো রেজিস্ট্রেশন ছাড়াই সম্পূর্ণ বিনামূল্যে হিসাব করা যায়।" 
                }
              ].map((item, index) => (
                <div key={index} className="p-8 bg-gray-50 rounded-[1.5rem] border border-gray-100 hover:bg-emerald-50 transition-all group duration-300">
                  <div className="mb-4 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* কন্টাক্ট অ্যাকশন কার্ড */}
            <div className="mt-20 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-[1.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-100/50">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">আপনার কি কোনো পরামর্শ আছে?</h3>
                <p className="text-emerald-700/70">এই প্ল্যাটফর্মটিকে আরও উন্নত করতে আপনার মতামত আমাদের জানান।</p>
              </div>
              <a 
                href="mailto:support@uttoradhikar.com" 
                className="bg-emerald-800 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 hover:shadow-xl transition-all active:scale-95"
              >
                যোগাযোগ করুন
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default About;