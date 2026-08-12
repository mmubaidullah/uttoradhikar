# 🚀 এখনই শুরু করার পরিকল্পনা

## 📋 Phase 1.1 - প্রথম ১৫ দিনে করণীয়

এই ফিচারগুলো এখনই যুক্ত করা সম্ভব এবং সবচেয়ে বেশি প্রভাব ফেলবে।

---

## ✅ Week 1: দলিল ও রেফারেন্স (Content)

### Day 1-2: কুরআনিক রেফারেন্স পেজ

```bash
# নতুন ফাইল তৈরি করুন
src/components/QuranReferences.jsx
```

**যা যুক্ত করবেন:**

```jsx
// Structure
- সূরা নিসা: ১১ (সন্তানদের অংশ)
- সূরা নিসা: ১২ (স্বামী-স্ত্রী, পিতামাতা)
- সূরা নিসা: ১৭৬ (কালালাহ)

// প্রতিটিতে:
আরবি আয়াত
বাংলা অনুবাদ
সংক্ষিপ্ত তাফসির
কোন ওয়ারিশ এতে আছে
```

**Content Source:**
- Quran.com API
- tanzil.net
- Al-Quran Bangla Translation

---

### Day 3-4: হাদিস সংকলন পেজ

```bash
src/components/HadithCollection.jsx
```

**১০টি মূল হাদিস যুক্ত করুন:**

1. **ফারায়েজ শিখো** (বুখারী: ৬৭৩২)
2. **আসাবা** (বুখারী: ৬৭৩২) 
3. **মেয়েদের সাথে বোন** (বুখারী: ৬৭৩৬)
4. **হত্যাকারী বঞ্চিত** (মুসলিম: ১৬১৪)
5. **ভিন্ন ধর্ম বঞ্চিত** (বুখারী: ৬৭৬৪)
6. **ঋণ পরিশোধ প্রথম** (তিরমিযী: ২০৯২)
7. **অসিয়ত সীমা ১/৩** (তিরমিযী: ২১২০)
8. **পুত্রের অংশ দ্বিগুণ** (মুসলিম: ১৬১৬)
9. **মায়ের সম্মান** (বুখারী: ৫৯৭১)
10. **ন্যায়বিচার** (আবু দাউদ: ২৮৭৫)

**Format:**
```markdown
### হাদিস নং: ১
**আরবি:** [মূল হাদিস]
**বাংলা:** [অনুবাদ]
**সূত্র:** সহিহ বুখারী: ৬৭৩২
**ব্যাখ্যা:** [২-৩ লাইন]
**সংশ্লিষ্ট মাসআলা:** [লিস্ট]
```

---

### Day 5-7: বিশেষ মাসআলা (Special Cases) পেজ

```bash
src/components/SpecialCases.jsx
```

**৩টি জরুরি মাসআলা:**

#### ১. মাফকুদ (নিখোঁজ)
```jsx
<section>
  <h2>মাফকুদ - নিখোঁজ ব্যক্তি</h2>
  
  <div className="definition">
    সংজ্ঞা: যার জীবিত/মৃত অবস্থা অজানা
  </div>
  
  <div className="ruling">
    <h3>হুকুম:</h3>
    - যুদ্ধে নিখোঁজ: ৪ বছর অপেক্ষা
    - সাধারণ নিখোঁজ: ৯০ বছর বা বিচারকের সিদ্ধান্ত
    - বাংলাদেশ আইন: Declaration of Death Act, 1956
  </div>
  
  <div className="procedure">
    <h3>সম্পদ বন্টন পদ্ধতি:</h3>
    ১. সম্পদ আটকে রাখা হবে
    ২. আদালতে আবেদন করতে হবে
    ৩. মৃত ঘোষণার পর বন্টন
    ৪. ফিরে এলে পুনঃসমন্বয়
  </div>
  
  <div className="reference">
    <strong>রেফারেন্স:</strong>
    - হিদায়া: ৪/৫৪২
    - ফতোয়ায়ে আলমগীরী: ৬/৪৪৭
  </div>
</section>
```

#### ২. হামল (গর্ভস্থ সন্তান)
```jsx
<section>
  <h2>হামল - গর্ভস্থ সন্তান</h2>
  
  <div className="condition">
    শর্ত:
    - মৃত্যুর সময় গর্ভে থাকতে হবে
    - জীবিত জন্ম নিতে হবে
    - ৬ মাস গর্ভকাল পূর্ণ হতে হবে
  </div>
  
  <div className="calculation">
    <h3>হিসাব পদ্ধতি:</h3>
    ১. ছেলে ও মেয়ে দুই অবস্থায় হিসাব করুন
    ২. যেটায় কম পায় সেটা এখনই দিন
    ৩. বাকিটা আটকে রাখুন
    ৪. জন্মের পর চূড়ান্ত বন্টন
  </div>
  
  <div className="example">
    <h3>উদাহরণ:</h3>
    মোট সম্পদ: ২৪ ল ক্ষ টাকা
    ওয়ারিশ: স্ত্রী + ২ মেয়ে + গর্ভস্থ সন্তান
    
    অবস্থা ১ (ছেলে হলে): স্ত্রী=৩, মেয়ে=৪ করে, ছেলে=৮
    অবস্থা ২ (মেয়ে হলে): স্ত্রী=৩, মেয়ে প্রতি=৫
    
    এখনই দিন: ছোট অংশ (অবস্থা ১)
    আটকে রাখুন: পার্থক্য
  </div>
  
  <div className="reference">
    <strong>রেফারেন্স:</strong>
    - সিরাজী: পৃ. ৯৮
    - শরহে সিরাজী: পৃ. ১২৫
  </div>
</section>
```

#### ৩. খুনসা (হার্মাফ্রোডাইট)
```jsx
<section>
  <h2>খুনসা - তৃতীয় লিঙ্গ</h2>
  
  <div className="types">
    <h3>প্রকার:</h3>
    - খুনসা গায়রে মুশকিল: লিঙ্গ নির্ণয় সম্ভব
    - খুনসা মুশকিল: লিঙ্গ নির্ণয় অসম্ভব
  </div>
  
  <div className="solution">
    <h3>সমাধান (মুশকিল):</h3>
    ১. পুরুষ ও নারী উভয় হিসাবে হিসাব করুন
    ২. যেটায় কম পায় সেটা দিন
    ৩. বাকিটা অন্য ওয়ারিশদের মধ্যে বন্টন
  </div>
  
  <div className="bangladesh">
    <h3>বাংলাদেশ প্রেক্ষাপট:</h3>
    - ২০১৩: হিজড়া "তৃতীয় লিঙ্গ" স্বীকৃতি
    - জাতীয় পরিচয়পত্রে "অন্যান্য" অপশন
    - আইনি অধিকার: সীমিত
  </div>
  
  <div className="reference">
    <strong>রেফারেন্স:</strong>
    - ফতোয়ায়ে আলমগীরী: ৬/৪৪৮
    - হিদায়া: ৪/৫৪৫
    - Research: YPSA Bangladesh (2021)
  </div>
</section>
```

---

## ✅ Week 2: Interactive Features

### Day 8-10: Step-by-Step Calculation

```bash
src/components/CalculationSteps.jsx
```

**ফিচার:**

```jsx
// Logic.jsx তে যুক্ত করুন
const [showSteps, setShowSteps] = useState(false);
const [calculationSteps, setCalculationSteps] = useState([]);

// calculate() ফাংশনে track করুন
const steps = [];

// Step 1: Input Summary
steps.push({
  title: "১. ইনপুট সারসংক্ষার",
  content: `মোট সম্পদ: ${assets.taka} টাকা
  ওয়ারিশ: ${getHeirs List()}`
});

// Step 2: Exclusion Check
steps.push({
  title: "২. বঞ্চনা চেক",
  content: getExclusionList()
});

// Step 3: Dhawil Furud
steps.push({
  title: "৩. জাবিল ফুরুজ হিসাব",
  calculations: res.map(r => ({
    name: r.name,
    formula: `${r.n}/${r.d} = ${base}/${r.d} × ${r.n} = ${(base/r.d)*r.n}`,
    amount: formatAmount(...)
  }))
});

// Step 4: Asaba
// Step 5: Awl/Radd
// Step 6: Final Distribution
```

---

### Day 11-12: Charts & Visualization

```bash
npm install recharts
```

```jsx
// src/components/InheritanceChart.jsx
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

export const InheritanceChart = ({ results }) => {
  const data = results.map(r => ({
    name: r.name,
    value: parseFloat(r.taka.replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d)))
  }));

  return (
    <div className="chart-container">
      <h3>বন্টন চার্ট</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
```

---

### Day 13-14: FAQ Section

```bash
src/components/FAQ.jsx
```

**১০০ টি FAQ - ক্যাটাগরি অনুযায়ী:**

```jsx
const faqData = {
  basic: [
    {
      q: "ফারায়েজ কাকে বলে?",
      a: "ফারায়েজ হলো ইসলামী উত্তরাধিকার আইন, যেখানে মৃত ব্যক্তির সম্পদ তার ওয়ারিশদের মধ্যে শরীয়াহ অনুযায়ী বন্টন করা হয়।",
      ref: "সূরা নিসা: ১১-১২"
    },
    {
      q: "কতজন জাবিল ফুরুজ আছে?",
      a: "মোট ১২ জন: ৪ পুরুষ (স্বামী, বাবা, দাদা, বৈপিত্রীয় ভাই) এবং ৮ নারী (স্ত্রী, মা, দাদি, নানি, মেয়ে, পুত্রের মেয়ে, সহোদর বোন, বৈমাত্রীয় বোন, বৈপিত্রীয় বোন)",
      ref: "সিরাজী"
    }
    // ... আরো ২৩টি বেসিক প্রশ্ন
  ],
  
  specific: [
    // ৩০টি নির্দিষ্ট প্রশ্ন
  ],
  
  complex: [
    // ২৫টি জটিল প্রশ্ন
  ],
  
  modern: [
    {
      q: "ক্রিপ্টোকারেন্সি কীভাবে বন্টন হবে?",
      a: "ক্রিপ্টোকারেন্সি সম্পদ হিসেবে গণ্য হবে। মৃত্যুর দিনের মার্কেট মূল্য অনুযায়ী টাকায় রূপান্তর করে হিসাব করতে হবে। ওয়ালেট অ্যাক্সেস প্রয়োজন।",
      ref: "ফতোয়া: Darul Ifta Birmingham, 2020"
    }
    // ... আরো ১৯টি আধুনিক প্রশ্ন
  ]
};

// Search functionality
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');

const filteredFAQs = useMemo(() => {
  // Filter logic
}, [searchTerm, selectedCategory]);
```

---

### Day 15: Testing & Deployment

```bash
# Test all new features
npm run dev

# Check responsiveness
# Test PDF download with new content
# Check all links
# Verify references

# Build
npm run build

# Deploy to Netlify
netlify deploy --prod
```

---

## 📚 Content Sources (এখনই ব্যবহার করুন)

### ১. কুরআন
- **Quran.com API**: https://api.quran.com/api/v4/
- **Tanzil**: http://tanzil.net/trans/bn.bengali
- **Tafsir**: Ibn Kathir (English), তাফসীরে জালালাইন (বাংলা)

### ২. হাদিস
- **Sunnah.com**: https://sunnah.com/
- **Hadithbd.com**: বাংলা হাদিস
- **IslamicFinder**: https://www.islamicfinder.org/

### ৩. ফিকহ
- **Shamela.ws**: https://shamela.ws/ (আরবি)
- **IslamQA.info**: https://islamqa.info/bn
- **Archive.org**: বাংলা ইসলামী বই

### ৪. বাংলাদেশী আইন
- **BDLaws**: http://bdlaws.minlaw.gov.bd/
- **BLAST**: http://blast.org.bd/

---

## 🎨 Design Guidelines (নতুন পেজের জন্য)

### Layout Structure:
```jsx
<div className="page-container">
  {/* Hero Section */}
  <section className="hero bg-gradient-to-br from-emerald-800 to-teal-900">
    <h1>পেজ শিরোনাম</h1>
    <p>সংক্ষিপ্ত বিবরণ</p>
  </section>

  {/* Navigation/Tabs */}
  <nav className="sticky-tabs">
    <button>ট্যাব ১</button>
    <button>ট্যাব ২</button>
  </nav>

  {/* Content */}
  <main className="content-area">
    {/* Cards for each section */}
    <div className="reference-card">
      <h3>শিরোনাম</h3>
      <div className="arabic">আরবি টেক্সট</div>
      <div className="translation">বাংলা</div>
      <div className="explanation">ব্যাখ্যা</div>
      <div className="reference">রেফারেন্স</div>
    </div>
  </main>
</div>
```

### Color Palette:
```css
--primary: #059669 (emerald-600)
--primary-dark: #047857 (emerald-700)
--primary-light: #10b981 (emerald-500)
--secondary: #0d9488 (teal-600)
--accent: #f59e0b (amber-500)
--text: #1f2937 (gray-800)
--bg: #f8fafc (slate-50)
```

---

## 📝 Content Writing Tips

### আরবি টেক্সট:
```html
<p className="arabic-text" dir="rtl">
  أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا
</p>
```

### রেফারেন্স Format:
```jsx
<div className="reference-box">
  <FaBookOpen className="icon" />
  <div>
    <strong>রেফারেন্স:</strong>
    <ul>
      <li>সূরা নিসা: ১১</li>
      <li>সহিহ বুখারী: ৬৭৩২</li>
      <li>হিদায়া: ৪/৪৩৮</li>
    </ul>
  </div>
</div>
```

---

## ✅ Checklist (১৫ দিন পর)

- [ ] কুরআন রেফারেন্স পেজ (৪টি আয়াত)
- [ ] হাদিস সংকলন (১০টি হাদিস)
- [ ] বিশেষ মাসআলা (৩টি কেস)
- [ ] Step-by-step calculation
- [ ] Pie chart visualization
- [ ] FAQ section (২৫+ প্রশ্ন minimum)
- [ ] সব পেজ responsive
- [ ] Print/PDF কাজ করছে
- [ ] No console errors
- [ ] Build successful

---

## 🎯 Next Steps (১৬-৩০ দিন)

1. বাকি FAQ যুক্ত (মোট ১০০)
2. ৫টি কেস স্টাডি
3. আউল/রাদ্দ ব্যাখ্যা পেজ
4. বাংলাদেশী আইন সেকশন
5. ওসিয়ত গাইড

---

**মনে রাখবেন:**
- প্রতিটি দলিলের সূত্র উল্লেখ করুন
- বাংলা ভাষায় সহজবোধ্য করুন
- মোবাইলে টেস্ট করুন
- শরীয়াহ মতে সঠিক কিনা যাচাই করুন

**আল্লাহ তাওফিক দিন! আমীন।** 🤲
