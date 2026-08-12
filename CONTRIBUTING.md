# অবদান গাইডলাইন 🤝

উত্তরাধিকার ক্যালকুলেটর প্রজেক্টে অবদান রাখার জন্য ধন্যবাদ! এই ডকুমেন্টে আপনি কীভাবে অবদান রাখতে পারবেন তার নির্দেশনা পাবেন।

## 📋 কন্ট্রিবিউশনের ধরন

আপনি বিভিন্নভাবে অবদান রাখতে পারেন:

### 🐛 বাগ রিপোর্ট
- ক্যালকুলেশনে ভুল পেলে
- UI/UX সমস্যা পেলে
- পারফরম্যান্স ইস্যু লক্ষ্য করলে

### ✨ ফিচার রিকোয়েস্ট
- নতুন ফিচার প্রস্তাব
- বিদ্যমান ফিচার উন্নতি
- UI/UX পরিবর্তন

### 📝 ডকুমেন্টেশন
- কোড ডকুমেন্টেশন
- README উন্নতি
- টিউটোরিয়াল তৈরি

### 💻 কোড কন্ট্রিবিউশন
- বাগ ফিক্স
- নতুন ফিচার যুক্ত করা
- কোড রিফ্যাক্টরিং

## 🚀 শুরু করার আগে

1. **ইস্যু চেক করুন**: GitHub issues দেখুন কেউ ইতিমধ্যে কাজ করছে কিনা
2. **ডিসকাশন তৈরি করুন**: বড় পরিবর্তনের জন্য আগে আলোচনা করুন
3. **শরীয়াহ অনুযায়ী**: ফারায়েজ লজিক পরিবর্তনে বিশেষ সতর্কতা

## 📝 কোড স্ট্যান্ডার্ড

### JavaScript/React
```javascript
// ✅ ভালো
const calculateShare = (heirs) => {
  // পরিষ্কার নামকরণ
  const totalHeirs = heirs.length;
  return totalHeirs > 0 ? asset / totalHeirs : 0;
};

// ❌ খারাপ
const calc = (h) => {
  const t = h.length;
  return t > 0 ? a / t : 0;
};
```

### নামকরণ কনভেনশন
- **Component**: PascalCase (`InheritanceCalculator.jsx`)
- **Function**: camelCase (`calculateShare`)
- **Constant**: UPPER_SNAKE_CASE (`MAX_HEIRS`)
- **বাংলা variable**: transliteration (`waris`, `mata`, `pita`)

### কমেন্ট
```javascript
// ✅ বাংলায় ব্যাখ্যা দিন যেখানে প্রয়োজন
// মায়ের অংশ: সন্তান থাকলে ১/৬, না থাকলে ১/৩
const motherShare = hasChildren ? 1/6 : 1/3;

// ❌ অপ্রয়োজনীয় কমেন্ট এড়িয়ে চলুন
// set x to 5
const x = 5;
```

## 🔄 Pull Request প্রসেস

### 1. Fork & Clone
```bash
# Fork করুন GitHub থেকে
git clone https://github.com/YOUR_USERNAME/uttoradhikar.git
cd uttoradhikar
npm install
```

### 2. ব্র্যাঞ্চ তৈরি করুন
```bash
# Feature branch
git checkout -b feature/add-new-heir-type

# Bug fix branch
git checkout -b fix/calculation-error

# Documentation branch
git checkout -b docs/update-readme
```

### 3. পরিবর্তন করুন
- ছোট, focused commits করুন
- Descriptive commit messages লিখুন
- Tests যোগ করুন (যদি প্রযোজ্য হয়)

```bash
git add .
git commit -m "feat: নতুন বৈমাত্রীয় চাচা লজিক যুক্ত করা হয়েছে"
```

### 4. Testing
```bash
# Development server চালান
npm run dev

# Build test করুন
npm run build
npm run preview
```

### 5. Push & PR
```bash
git push origin feature/add-new-heir-type
```

তারপর GitHub-এ যান এবং Pull Request তৈরি করুন।

## 📋 PR Template

আপনার PR-এ নিচের তথ্য দিন:

```markdown
## পরিবর্তনের বিবরণ
<!-- কী পরিবর্তন করা হয়েছে -->

## পরিবর্তনের কারণ
<!-- কেন এই পরিবর্তন প্রয়োজন ছিল -->

## টেস্টিং
- [ ] Local development server-এ টেস্ট করা হয়েছে
- [ ] Production build টেস্ট করা হয়েছে
- [ ] বিভিন্ন ব্রাউজারে চেক করা হয়েছে
- [ ] মোবাইলে responsive চেক করা হয়েছে

## স্ক্রিনশট (যদি UI পরিবর্তন থাকে)
<!-- Before/After স্ক্রিনশট -->

## চেকলিস্ট
- [ ] Code লিন্ট পাস করেছে
- [ ] কমিট মেসেজ descriptive
- [ ] Documentation আপডেট করা হয়েছে (যদি প্রয়োজন হয়)
```

## 🧮 ফারায়েজ লজিক পরিবর্তন

ক্যালকুলেশন লজিক পরিবর্তনের জন্য **বিশেষ সতর্কতা**:

### আবশ্যক
1. **শরয়ী রেফারেন্স**: কুরআন/হাদিসের রেফারেন্স দিন
2. **Test Cases**: বিভিন্ন scenario টেস্ট করুন
3. **Edge Cases**: special cases বিবেচনা করুন
4. **Expert Review**: সম্ভব হলে Islamic scholar-এর মতামত নিন

### Example
```javascript
// ✅ সঠিক পদ্ধতি
/**
 * মায়ের অংশ হিসাব (সূরা নিসা: ১১)
 * - সন্তান না থাকলে: ১/৩
 * - সন্তান থাকলে: ১/৬
 * - ২+ ভাই-বোন থাকলে: ১/৬
 * 
 * Special case (Umariyyah):
 * স্বামী + মা + বাবা = মা পায় অবশিষ্টের ১/৩
 */
const calculateMotherShare = (heirs) => {
  // Implementation with clear logic
};
```

## 🎨 UI/UX পরিবর্তন

### Design Principles
- **বাংলা Typography**: Hind Siliguri ফন্ট ব্যবহার করুন
- **Accessibility**: WCAG 2.1 AA standard মেনে চলুন
- **Responsive**: Mobile-first approach
- **Color Scheme**: Emerald green theme বজায় রাখুন

### Tailwind CSS
```jsx
// ✅ Tailwind utilities ব্যবহার করুন
<div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">

// ❌ Inline styles এড়িয়ে চলুন
<div style={{ backgroundColor: '#f0fdfa', padding: '1rem' }}>
```

## 📚 কমিট মেসেজ কনভেনশন

```bash
feat: নতুন ফিচার যুক্ত
fix: বাগ ফিক্স
docs: ডকুমেন্টেশন পরিবর্তন
style: কোড ফরম্যাটিং (logic পরিবর্তন নয়)
refactor: কোড রিফ্যাক্টরিং
test: টেস্ট যুক্ত বা আপডেট
chore: build/config পরিবর্তন
```

**উদাহরণ:**
```bash
feat: পুত্রের মেয়ের জন্য বঞ্চনা লজিক যুক্ত করা হয়েছে
fix: আসাবা বন্টনে ডুপ্লিকেট এন্ট্রি সমস্যা সমাধান
docs: README-তে installation স্টেপ আপডেট
```

## ❓ প্রশ্ন বা সাহায্য প্রয়োজন?

- **GitHub Issues**: প্রশ্ন করুন বা সমস্যা রিপোর্ট করুন
- **Email**: support@uttoradhikar.com
- **Discussion**: GitHub Discussions ব্যবহার করুন

## 🙏 ধন্যবাদ

আপনার সময় ও প্রচেষ্টার জন্য ধন্যবাদ! প্রতিটি অবদান এই প্রজেক্টকে আরও ভালো করে তোলে।

---

**জাযাকাল্লাহু খাইরান** 🤲
