import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBalanceScale, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-emerald-950 text-white pt-10 pb-5 no-print">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* ব্র্যান্ড সেকশন */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6 group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
              <FaBalanceScale size={20} />
            </div>
            <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              উত্তরাধিকার
            </h3>
          </div>
          <p className="text-sm text-emerald-100/60 leading-relaxed mb-6">
            ইসলামী শরীয়াহ ও হানাফি মাযহাবের মূলনীতি অনুযায়ী সঠিক ও নির্ভরযোগ্য সম্পদ বন্টনের আধুনিক ডিজিটাল প্ল্যাটফর্ম।
          </p>
        </div>
        
        {/* কুইক লিঙ্কস - নেভিগেশন */}
        <div>
          <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-8">পেজসমূহ</h4>
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink to="/" className={({isActive}) => `text-sm transition-all duration-300 hover:text-emerald-300 ${isActive ? 'text-emerald-400 font-bold' : 'text-emerald-100/70'}`}>
                ক্যালকুলেটর
              </NavLink>
            </li>
            <li>
              <NavLink to="/guide" className={({isActive}) => `text-sm transition-all duration-300 hover:text-emerald-300 ${isActive ? 'text-emerald-400 font-bold' : 'text-emerald-100/70'}`}>
                বন্টন গাইড
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({isActive}) => `text-sm transition-all duration-300 hover:text-emerald-300 ${isActive ? 'text-emerald-400 font-bold' : 'text-emerald-100/70'}`}>
                আমাদের সম্পর্কে
              </NavLink>
            </li>
          </ul>
        </div>

        {/* আইনি নীতিমালা */}
        <div>
          <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-8">সহায়তা</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="/terms" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-all font-medium">গোপনীয়তা নীতি</a></li>
            <li><a href="/terms" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-all font-medium">ব্যবহারের শর্তাবলী</a></li>
            <li><a href="/terms" className="text-sm text-emerald-100/70 hover:text-emerald-300 transition-all font-medium">ডিসক্লেইমার</a></li>
          </ul>
        </div>

        {/* কন্টাক্ট ও সোশ্যাল */}
        <div>
          <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-8">যোগাযোগ</h4>
          <div className="flex items-center gap-3 text-emerald-100/70 mb-6 group cursor-pointer">
            <FaEnvelope className="text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm group-hover:text-white transition-colors">support@uttoradhikar.com</span>
          </div>
          
          <div className="flex gap-4">
            {[ 
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" } 
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link} 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-100 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-500"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* কপিরাইট ও সিস্টেম স্ট্যাটাস */}
      <div className="max-w-6xl mx-auto px-6 mt-5 pt-4 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-[12px] text-emerald-100/40 font-medium tracking-wide">
            &copy; ২০২৫ উত্তরাধিকার ক্যালকুলেটর | সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
};