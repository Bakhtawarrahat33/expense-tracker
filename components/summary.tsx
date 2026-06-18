import type { Summary } from '@/lib/db';

const cards = [
  { label: 'Total Expenses', color: 'border-l-blue-500 bg-blue-50/50', icon: '💰' },
  { label: 'This Month', color: 'border-l-emerald-500 bg-emerald-50/50', icon: '📅' },
  { label: 'Top Category', color: 'border-l-amber-500 bg-amber-50/50', icon: '🏷️' },
  { label: 'Avg / Day', color: 'border-l-purple-500 bg-purple-50/50', icon: '📊' },
];

export default function SummaryCards({ summary }: { summary: Summary }) {
  const topCat = summary.byCategory[0];
  const days = Math.max(1, new Date().getDate());
  const avgPerDay = summary.thisMonth / days;

  const items = [
    { value: summary.total, key: 'total' },
    { value: summary.thisMonth, key: 'month' },
    { value: topCat?.total ?? 0, label: topCat?.category, key: 'top' },
    { value: avgPerDay, key: 'avg' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div
          key={item.key}
          className={`rounded-xl border border-gray-200 shadow-sm p-5 ${cards[i].color} border-l-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg">{cards[i].icon}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{cards[i].label}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${item.value.toFixed(2)}</p>
          {item.key === 'top' && topCat && (
            <p className="text-xs font-semibold text-gray-500 mt-0.5">{topCat.count} expense{topCat.count !== 1 ? 's' : ''}</p>
          )}
          {item.key === 'avg' && (
            <p className="text-xs font-semibold text-gray-500 mt-0.5">{days} day{days > 1 ? 's' : ''}</p>
          )}
        </div>
      ))}
    </div>
  );
}
