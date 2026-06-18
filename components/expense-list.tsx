import type { Expense } from '@/lib/db';
import ExpenseItem from './expense-item';

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <span className="text-5xl">📭</span>
        <p className="text-lg font-semibold text-gray-500 mt-3">No expenses found</p>
        <p className="text-sm mt-1">Add your first expense above or adjust the filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="py-3.5 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="py-3.5 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="py-3.5 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Note</th>
            <th className="py-3.5 px-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="py-3.5 px-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map((expense, i) => (
            <ExpenseItem key={expense.id} expense={expense} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
