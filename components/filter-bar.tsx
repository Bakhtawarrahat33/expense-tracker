'use client';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

export default function FilterBar({
  currentCategory,
  currentFrom,
  currentTo,
}: {
  currentCategory?: string;
  currentFrom?: string;
  currentTo?: string;
}) {
  const hasFilters = !!(currentCategory || currentFrom || currentTo);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-gray-400 rounded-full" />
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Filters</h2>
        {hasFilters && (
          <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
            Active
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[140px]">
          <label htmlFor="filter-category" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            id="filter-category"
            name="category"
            defaultValue={currentCategory || ''}
            className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            onChange={(e) => {
              const url = new URL(window.location.href);
              if (e.target.value) url.searchParams.set('category', e.target.value);
              else url.searchParams.delete('category');
              window.location.href = url.toString();
            }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label htmlFor="filter-from" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            From
          </label>
          <input
            id="filter-from"
            name="from"
            type="date"
            defaultValue={currentFrom || ''}
            className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            onChange={(e) => {
              const url = new URL(window.location.href);
              if (e.target.value) url.searchParams.set('from', e.target.value);
              else url.searchParams.delete('from');
              window.location.href = url.toString();
            }}
          />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label htmlFor="filter-to" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            To
          </label>
          <input
            id="filter-to"
            name="to"
            type="date"
            defaultValue={currentTo || ''}
            className="w-full rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            onChange={(e) => {
              const url = new URL(window.location.href);
              if (e.target.value) url.searchParams.set('to', e.target.value);
              else url.searchParams.delete('to');
              window.location.href = url.toString();
            }}
          />
        </div>
        {hasFilters && (
          <a
            href="/"
            className="inline-flex items-center gap-1 px-4 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            ✕ Clear
          </a>
        )}
      </div>
    </div>
  );
}
