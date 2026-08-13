import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#1a4731', '#c9a84c', '#2d6a4f', '#e4b55e', '#40916c', '#f0c87a', '#52b788', '#b7941e'];

// Bengali number converter
const toBengaliNumber = (num) => {
  if (num === null || num === undefined || num === '') return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
};

const InheritanceChart = ({ results }) => {
  // Convert Bengali numerals to English for calculation
  const bengaliToEnglish = (str) => {
    const bengaliDigits = '০১২৩৪৫৬৭৮৯';
    const englishDigits = '0123456789';
    return str.split('').map(char => {
      const index = bengaliDigits.indexOf(char);
      return index !== -1 ? englishDigits[index] : char;
    }).join('');
  };

  // Responsive radius based on screen width
  const getRadius = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 90 : 110;
    }
    return 110;
  };

  // Prepare data for chart
  const chartData = results
    .filter(r => r.taka && r.taka !== '০')
    .map(r => {
      const amountStr = bengaliToEnglish(r.taka.replace(/,/g, ''));
      const value = parseFloat(amountStr) || 0;
      return {
        name: r.name,
        value: value,
        percentage: r.share || ''
      };
    })
    .filter(d => d.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="bg-white border border-[#e2ddd5] rounded-xl p-8 text-center">
        <p className="text-gray-500 text-sm">কোনো ডাটা নেই চার্ট দেখানোর জন্য</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-sm border border-[#e2ddd5]">
          <p className="font-bold text-[#1a4731] text-sm mb-1">{payload[0].name}</p>
          <p className="text-[#1a4731] font-semibold text-sm">
            {toBengaliNumber(payload[0].value.toLocaleString('bn-BD'))} টাকা
          </p>
          {payload[0].payload.percentage && (
            <p className="text-gray-500 text-xs mt-1">
              অংশ: {payload[0].payload.percentage}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5 bg-[#f7f5f0] px-3 py-1.5 rounded-lg">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700 font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Don't show label if too small
    if (percent < 0.08) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
        className="pointer-events-none"
      >
        {toBengaliNumber(`${(percent * 100).toFixed(0)}`)}%
      </text>
    );
  };

  return (
    <div className="bg-white border border-[#e2ddd5] rounded-xl p-4 md:p-6 shadow-sm overflow-hidden">
      <h3 className="font-bold text-[#1a4731] text-sm md:text-base mb-4 md:mb-6 text-center flex items-center justify-center gap-2">
        <svg className="w-5 h-5 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        বন্টন চার্ট
      </h3>

      <div className="w-full h-[320px] sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%" className="print:hidden">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={getRadius()}
            innerRadius={0}
            fill="#1a4731"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {chartData.map((item, index) => (
          <div key={index} className="bg-[#f7f5f0] border border-[#e2ddd5] p-3 rounded-xl">
            <div
              className="w-2.5 h-2.5 rounded-sm mb-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="text-xs text-gray-500 mb-1">{item.name}</div>
            <div className="font-bold text-[#1a4731] text-sm">{toBengaliNumber(item.value.toLocaleString('bn-BD'))} ৳</div>
            {item.percentage && (
              <div className="text-xs text-gray-400 mt-0.5">{item.percentage}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InheritanceChart;
