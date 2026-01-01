import React, { useState, useEffect, useRef } from "react";

const AIResultView = ({ results, amount }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null); // টাইমার কন্ট্রোল করার জন্য

  // ১. বন্টননামার টেক্সট ফরম্যাট তৈরি করা
  const generateText = () => {
    let text = `ব ন্টননামা বিশ্লেষণ রিপোর্ট:\n`;
    text += `--------------------------------\n`;
    text += `মৃত ব্যক্তির মোট সম্পত্তি: ${amount.toLocaleString()} টাকা।\n\n`;

    if (results.wife > 0)
      text += `• সন্তান থাকায় স্ত্রী ১/৮ অংশ হিসেবে পাচ্ছেন: ${results.wife.toLocaleString()} টাকা।\n`;
    if (results.husband > 0)
      text += `• সন্তান থাকায় স্বামী ১/৪ অংশ হিসেবে পাচ্ছেন: ${results.husband.toLocaleString()} টাকা।\n`;
    if (results.mother > 0)
      text += `• মা নির্দিষ্ট অংশ ১/৬ হিসেবে পাচ্ছেন: ${results.mother.toLocaleString()} টাকা।\n`;
    if (results.father > 0)
      text += `• বাবা ১/৬ এবং অবশিষ্টাংশ হিসেবে পাচ্ছেন: ${results.father.toLocaleString()} টাকা।\n`;

    if (results.sonIndividual > 0 || results.daughterIndividual > 0) {
      text += `\n• অবশিষ্ট সম্পত্তি ছেলে ও মেয়েদের মধ্যে ২:১ অনুপাতে বন্টন:\n`;
      if (results.sonIndividual > 0)
        text += `  - প্রতিটি ছেলে পাবেন: ${results.sonIndividual.toLocaleString()} টাকা।\n`;
      if (results.daughterIndividual > 0)
        text += `  - প্রতিটি মেয়ে পাবেন: ${results.daughterIndividual.toLocaleString()} টাকা।\n`;
    }

    text += `\n--------------------------------\n`;
    text += `আলহামদুলিল্লাহ, শরঈ নিয়মানুযায়ী বন্টন সম্পন্ন হয়েছে।`;
    return text;
  };

  // ২. টাইপিং লজিক
  useEffect(() => {
    // আগের কোনো টাইপিং চলতে থাকলে তা বন্ধ করা এবং সব পরিষ্কার করা
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedText("");
    setIsFinished(false);

    const fullText = generateText();
    let index = 0;

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;

      if (index >= fullText.length) {
        clearInterval(intervalRef.current);
        setIsFinished(true);
      }
    }, 25); // ২০-৩০ মি.সে. গতি অক্ষরাকারে টাইপিংয়ের জন্য আদর্শ

    return () => clearInterval(intervalRef.current);
  }, [results, amount]); // যখনই নতুন ফলাফল আসবে, তখনই এটি শুরু হবে

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* টাইপিং উইন্ডো */}
      <div className="flex-1 bg-emerald-50 p-6 rounded-2xl shadow-2xl font-mono text-emerald-900 leading-relaxed whitespace-pre-wrap border-2 border-emerald-100 relative overflow-hidden">
        {/* গ্লাস ইফেক্ট বা ডেকোরেশন */}
        <div className="absolute top-0 right-0 p-2 opacity-20 text-xs">
                    
        </div>

        {displayedText}

        {!isFinished && (
          <span className="inline-block w-2 h-5 bg-emerald-500 animate-pulse ml-1 align-middle"></span>
        )}
      </div>

      {/* হাওয়ালা বা টিকা সেকশন */}
      {isFinished && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
            <h4 className="text-xs font-bold text-amber-700 uppercase mb-2 flex items-center gap-2">
              📜 শরঈ হাওয়ালা ও টিকা:
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed italic">
              "আল্লাহ তোমাদের সন্তানদের সম্পর্কে নির্দেশ দিচ্ছেন: এক পুত্রের অংশ
              দুই কন্যার অংশের সমান।" (সূরা নিসা: ১১)। সন্তান থাকলে স্ত্রীর অংশ
              ১/৮ (সূরা নিসা: ১২)। এই হিসাবটি জমহুর ওলামাদের মতানুযায়ী আসাবা
              বন্টন পদ্ধতিতে করা হয়েছে।
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
            >
              মুছুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIResultView;
