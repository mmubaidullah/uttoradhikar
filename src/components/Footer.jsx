import { Link } from 'react-router-dom';
import SiteLogo from './SiteLogo';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a4731] text-white no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <SiteLogo size={34} variant="light" />
              <span className="font-bold text-lg text-white">উত্তরাধিকার</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              ইসলামী শরীয়াহ ও হানাফি মাযহাব অনুযায়ী সম্পদ বন্টনের নির্ভরযোগ্য ডিজিটাল হিসাবক।
            </p>
            <div className="mt-4 text-xs text-[#c9a84c] italic">
              "ফারায়েজ শিক্ষা করো — এটি জ্ঞানের অর্ধেক"
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">পেজসমূহ</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/",               label: "ক্যালকুলেটর" },
                { to: "/guide",          label: "বন্টন গাইড" },
                { to: "/case-studies",   label: "কেস স্টাডি" },
                { to: "/bangladesh-law", label: "বাংলাদেশী আইন" },
                { to: "/faq",            label: "প্রশ্নোত্তর" },
                { to: "/about",          label: "পরিচিতি" },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">ইসলামী রেফারেন্স</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/quran",         label: "কুরআনের আয়াত" },
                { to: "/hadith",        label: "হাদিস সংকলন" },
                { to: "/awl-radd",      label: "আউল ও রাদ্দ" },
                { to: "/special-cases", label: "বিশেষ মাসআলা" },
                { to: "/terms",         label: "শর্তাবলী" },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            © {year} উত্তরাধিকার ক্যালকুলেটর। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-white/30 text-xs">
            প্রযুক্তির সুফল পৌঁছে যাক উম্মাহর আঙিনায়।
          </p>
        </div>
      </div>
    </footer>
  );
};
