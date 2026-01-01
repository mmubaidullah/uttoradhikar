import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-bengali">
      <main className="flex-grow pt-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          
          <h1 className="text-3xl font-black text-emerald-900 mb-10 text-center">আইনি তথ্যাবলি ও নীতিমালা</h1>

          <div className="space-y-12">
            
            {/* ১. সহায়তা */}
            <section>
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-emerald-500 rounded-full"></span> সহায়তা (Support)
              </h2>
              <p className="text-gray-600 text-justify leading-relaxed">
                উত্তরাধিকার বন্টন সংক্রান্ত কোনো হিসাব বুঝতে সমস্যা হলে বা ক্যালকুলেটর ব্যবহারে কোনো কারিগরি ত্রুটি দেখা দিলে আমাদের সাথে যোগাযোগ করতে পারেন। আমরা চেষ্টা করি দ্রুততম সময়ে আপনার জিজ্ঞাসার উত্তর দিতে। ইমেল: <span className="font-bold text-emerald-800">support@uttoradhikar.com</span>
              </p>
            </section>

            {/* ২. গোপনীয়তা নীতি */}
            <section>
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-emerald-500 rounded-full"></span> গোপনীয়তা নীতি (Privacy Policy)
              </h2>
              <p className="text-gray-600 text-justify leading-relaxed">
                আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই ক্যালকুলেটর ব্যবহারের সময় আপনি যে ব্যক্তিগত তথ্য বা মৃত ব্যক্তির সম্পদের বিবরণ ইনপুট দেন, তা আমরা আমাদের সার্ভারে সংরক্ষণ করি না। আপনার সেশন শেষ হওয়ার সাথে সাথেই তথ্যগুলো মুছে যায়। আমরা কোনো থার্ড-পার্টি প্রতিষ্ঠানের কাছে আপনার তথ্য শেয়ার করি না।
              </p>
            </section>

            {/* ৩. ব্যবহারের শর্তাবলী */}
            <section>
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-emerald-500 rounded-full"></span> ব্যবহারের শর্তাবলী (Terms of Use)
              </h2>
              <p className="text-gray-600 text-justify leading-relaxed">
                এই ওয়েবসাইটটি শুধুমাত্র শিক্ষামূলক এবং সাধারণ হিসাবের উদ্দেশ্যে ব্যবহার করা যাবে। কোনো অসৎ উদ্দেশ্য বা ভুল তথ্য প্রচারের জন্য এই প্ল্যাটফর্ম ব্যবহার করা আইনত দণ্ডনীয়। আমরা এই সিস্টেমের যেকোনো অংশ যেকোনো সময় পরিবর্তন বা পরিমার্জন করার অধিকার রাখি।
              </p>
            </section>

            {/* ৪. ডিসক্লেইমার */}
            <section className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-emerald-600 rounded-full"></span> ডিসক্লেইমার (Disclaimer)
              </h2>
              <p className="text-emerald-900/80 text-justify leading-relaxed text-sm">
                হানাফি ফরায়েজ আইনের গাণিতিক মূলনীতিতে তৈরি এই ক্যালকুলেটরটি আপনাকে একটি নির্ভুল ধারণা দিতে সক্ষম। তবে পারিবারিক বা আইনি প্রয়োজনে ব্যবহারের আগে অভিজ্ঞ মুফতি বা বিশেষজ্ঞের মাধ্যমে হিসাবটি যাচাই করে নেওয়া উত্তম। যান্ত্রিক কোনো ত্রুটির কারণে হিসাবের গরমিল হলে কর্তৃপক্ষ দায়ী থাকবে না।
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;