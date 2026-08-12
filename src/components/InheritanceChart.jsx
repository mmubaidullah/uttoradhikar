import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#0d9488', '#14b8a6', '#2dd4bf'];

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

  // Prepare data for chart
  const chartData = results
    .filter(r => r.taka && r.taka !== '০') // Exclude those with 0 amount
    .map(r => {
      const amountStr = bengaliToEnglish(r.taka.replace(/,/g, ''));
      const value = parseFloat(amountStr) || 0;
      
      return {
        name: r.name,
        value: value,
        percentage: r.share || ''
      };
    })
    .filter(d => d.value > 0); // Only include positive values

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 text-center">
        <p className="text-gray-500">কোনো ডাটা নেই চার্ট দেখানোর জন্য</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-emerald-100">
          <p className="font-bold text-gray-800 mb-2">{payload[0].name}</p>
          <p className="text-emerald-600 font-semibold">
            {payload[0].value.toLocaleString('bn-BD')} টাকা
          </p>
          {payload[0].payload.percentage && (
            <p className="text-gray-600 text-sm mt-1">
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
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for very small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-8 rounded-2xl border-2 border-emerald-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        বন্টন চার্ট
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={150}
            fill="#8884d8"
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

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {chartData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
            <div 
              className="w-3 h-3 rounded-full mb-2" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="text-xs text-gray-600 mb-1">{item.name}</div>
            <div className="font-bold text-gray-800">{item.value.toLocaleString('bn-BD')} ৳</div>
            {item.percentage && (
              <div className="text-xs text-gray-500 mt-1">{item.percentage}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InheritanceChart;
