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
import AwlRadd from "./components/AwlRadd";
import BangladeshLaw from "./components/BangladeshLaw";
import Munasakha from "./components/Munasakha";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f7f5f0]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<InheritanceCalculator />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/quran" element={<QuranReferences />} />
            <Route path="/hadith" element={<HadithCollection />} />
            <Route path="/special-cases" element={<SpecialCases />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/awl-radd" element={<AwlRadd />} />
            <Route path="/bangladesh-law" element={<BangladeshLaw />} />
            <Route path="/munasakha" element={<Munasakha />} />
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