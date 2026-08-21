import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-100',
    sky: 'bg-sky-500/10 text-sky-600 border-sky-100',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-100',
    rose: 'bg-rose-500/10 text-rose-600 border-rose-100',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between group">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{value}</h3>
        {subtext && <p className="text-xs font-medium text-slate-400 mt-1">{subtext}</p>}
      </div>
      {Icon && (
        <div className={`p-3.5 rounded-2xl border ${colorMap[color] || colorMap.indigo} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
