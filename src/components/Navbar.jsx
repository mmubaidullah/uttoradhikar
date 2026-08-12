import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaBalanceScale } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // অ্যাক্টিভ লিঙ্ক স্টাইল (নিচে আন্ডারলাইন সহ)
  const activeLinkStyle = ({ isActive }) => 
    `relative py-2 px-1 text-sm font-bold transition-all duration-300 flex flex-col items-center group
    ${isActive ? 'text-white' : 'text-emerald-100/70 hover:text-white'}`;

  return (
    <nav className="bg-[#064e3b] text-white shadow-2xl sticky top-0 z-50 border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* লোগো সেকশন - ই-কার সমস্যার সমাধান সহ */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white text-emerald-900 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-all duration-500">
              <FaBalanceScale size={20} />
            </div>
            <div className="flex flex-col py-1">
              <span className="text-2xl font-black tracking-tight leading-normal drop-shadow-sm">
                উত্তরাধিকার
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold -mt-1 opacity-80">
                ডিজিটাল ফারায়েজ
              </span>
            </div>
          </Link>

          {/* ডেস্কটপ মেনু */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>ক্যালকুলেটর</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/guide" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>বন্টন গাইড</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/quran" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>কুরআন</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/hadith" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>হাদিস</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/special-cases" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>বিশেষ মাসআলা</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/faq" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>FAQ</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/case-studies" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>কেস স্টাডি</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>

            <NavLink to="/about" className={activeLinkStyle}>
              {({ isActive }) => (
                <>
                  <span>আমাদের সম্পর্কে</span>
                  <span className={`h-1 bg-emerald-400 rounded-full transition-all duration-300 ${isActive ? 'w-full mt-1 shadow-[0_0_8px_#34d399]' : 'w-0'}`}></span>
                </>
              )}
            </NavLink>
          </div>

          {/* মোবাইল মেনু বাটন */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন */}
      <div className={`md:hidden absolute w-full bg-emerald-900 border-t border-white/5 transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-6 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">ক্যালকুলেটর</Link>
          <Link to="/guide" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">বন্টন গাইড</Link>
          <Link to="/quran" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">কুরআন</Link>
          <Link to="/hadith" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">হাদিস</Link>
          <Link to="/special-cases" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">বিশেষ মাসআলা</Link>
          <Link to="/case-studies" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">কেস স্টাডি</Link>
          <Link to="/faq" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">FAQ</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-bold hover:text-emerald-400 transition-colors">আমাদের সম্পর্কে</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
