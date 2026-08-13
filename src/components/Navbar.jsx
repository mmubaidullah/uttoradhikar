import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaBalanceScale } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const location = useLocation();
  const p = location.pathname;

  const isActive = (path) => p === path;

  const eduLinks = [
    { to: "/guide",          label: "বন্টন গাইড" },
    { to: "/quran",          label: "কুরআনের আয়াত" },
    { to: "/hadith",         label: "হাদিস সংকলন" },
    { to: "/awl-radd",       label: "আউল ও রাদ্দ" },
    { to: "/munasakha",      label: "মুনাসাখা" },
    { to: "/case-studies",   label: "কেস স্টাডি" },
    { to: "/special-cases",  label: "বিশেষ মাসআলা" },
    { to: "/bangladesh-law", label: "বাংলাদেশী আইন" },
    { to: "/faq",            label: "প্রশ্নোত্তর" },
  ];

  const isEduActive = eduLinks.some(l => p === l.to);

  const linkCls = (active) =>
    `text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
      active
        ? "text-[#1a4731] bg-[#e8f0eb]"
        : "text-gray-600 hover:text-[#1a4731] hover:bg-gray-50"
    }`;

  return (
    <nav className="bg-white border-b border-[#e2ddd5] sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#1a4731] rounded-lg flex items-center justify-center flex-shrink-0">
              <FaBalanceScale className="text-[#c9a84c]" size={18} />
            </div>
            <div className="leading-none">
              <span className="text-[#1a4731] font-bold text-lg block leading-tight">
                উত্তরাধিকার
              </span>
              <span className="text-[#c9a84c] text-[9px] tracking-[0.15em] uppercase font-medium">
                ফারায়েজ ক্যালকুলেটর
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/"      className={linkCls(isActive("/"))}>ক্যালকুলেটর</Link>
            <Link to="/about" className={linkCls(isActive("/about"))}>পরিচিতি</Link>

            {/* Education dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setEduOpen(true)}
              onMouseLeave={() => setEduOpen(false)}
            >
              <button className={`${linkCls(isEduActive)} flex items-center gap-1`}>
                শিক্ষামূলক
                <FaChevronDown
                  size={10}
                  className={`transition-transform duration-200 ${eduOpen ? "rotate-180" : ""}`}
                />
              </button>

              {eduOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#e2ddd5] rounded-lg shadow-lg py-1 animate-in">
                  {eduLinks.map(l => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setEduOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(l.to)
                          ? "text-[#1a4731] bg-[#e8f0eb] font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#1a4731]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/terms" className={linkCls(isActive("/terms"))}>শর্তাবলী</Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"
            aria-label="মেনু"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#e2ddd5] animate-in">
          <div className="max-w-7xl mx-auto px-4 py-2 space-y-0.5">
            <Link to="/"      onClick={() => setIsOpen(false)} className={`block ${linkCls(isActive("/"))}`}>ক্যালকুলেটর</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={`block ${linkCls(isActive("/about"))}`}>পরিচিতি</Link>

            <div className="pt-3 pb-1">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
                শিক্ষামূলক
              </p>
              {eduLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  className={`block ${linkCls(isActive(l.to))}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link to="/terms" onClick={() => setIsOpen(false)} className={`block ${linkCls(isActive("/terms"))}`}>শর্তাবলী</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
