import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import InheritanceCalculator from "./logic/Logic";
import About from "./components/About";
import Guide from "./components/Guide";
import { Footer } from "./components/Footer";
import Terms from "./components/Terms";
import QuranReferences from "./components/QuranReferences";
import HadithCollection from "./components/HadithCollection";
import SpecialCases from "./components/SpecialCases";
import FAQ from "./components/FAQ";
import CaseStudies from "./components/CaseStudies";

function App() {
  return (
    <Router>
      <div className="min-h-screen font-bengali flex flex-col relative">
        {/* এই ডিভটি পুরো ব্যাকগ্রাউন্ড হ্যান্ডেল করবে */}
        <div className="mesh-background"></div>

        <Navbar />

        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<InheritanceCalculator />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/quran" element={<QuranReferences />} />
            <Route path="/hadith" element={<HadithCollection />} />
            <Route path="/special-cases" element={<SpecialCases />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<InheritanceCalculator />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;