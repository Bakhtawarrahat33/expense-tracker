import { removeExpense } from '@/lib/actions';
import type { Expense } from '@/lib/db';

const CATEGORY_COLORS: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-sky-100 text-sky-700',
  Utilities: 'bg-gray-100 text-gray-700',
  Entertainment: 'bg-purple-100 text-purple-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Other: 'bg-teal-100 text-teal-700',
};

export default function ExpenseItem({ expense, index }: { expense: Expense; index: number }) {
  const deleteWithId = removeExpense.bind(null, expense.id);
  const colorClass = CATEGORY_COLORS[expense.category] || 'bg-blue-100 text-blue-700';

  return (
    <tr className={`transition-colors hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
      <td className="py-3.5 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">{expense.date}</td>
      <td className="py-3.5 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClass}`}>
          {expense.category}
        </span>
      </td>
      <td className="py-3.5 px-4 text-sm font-semibold text-gray-700 max-w-xs truncate">{expense.note || <span className="text-gray-300 font-normal">—</span>}</td>
      <td className="py-3.5 px-4 text-sm font-bold text-gray-900 text-right whitespace-nowrap">
        ${expense.amount.toFixed(2)}
      </td>
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <form action={deleteWithId}>
          <button
            type="submit"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            ✕ Delete
          </button>
        </form>
      </td>
    </tr>
  );
}
