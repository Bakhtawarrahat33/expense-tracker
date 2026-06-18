import { createExpense } from '@/lib/actions';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

export default function ExpenseForm() {
  const today = new Date().toISOString().split('T')[0];

  return (
    <form action={createExpense} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 bg-blue-600 rounded-full" />
        <h2 className="text-lg font-bold text-gray-900">Add Expense</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Amount *
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            required
            placeholder="0.00"
            className="w-full rounded-lg border-2 border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full rounded-lg border-2 border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          >
            <option value="" className="font-normal">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="font-semibold">
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Date *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={today}
            className="w-full rounded-lg border-2 border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Note
          </label>
          <input
            id="note"
            name="note"
            type="text"
            placeholder="e.g. Lunch, Groceries, Gas..."
            className="w-full rounded-lg border-2 border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>
      <div className="mt-5">
        <button
          type="submit"
          className="w-full sm:w-auto px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          + Add Expense
        </button>
      </div>
    </form>
  );
}
