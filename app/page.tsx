import { getExpenses, getSummary, type Filters } from '@/lib/db';
import ExpenseForm from '@/components/expense-form';
import ExpenseList from '@/components/expense-list';
import SummaryCards from '@/components/summary';
import FilterBar from '@/components/filter-bar';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; from?: string; to?: string }>;
}) {
  const params = await searchParams;
  const filters: Filters = {};
  if (params.category) filters.category = params.category;
  if (params.from) filters.from = params.from;
  if (params.to) filters.to = params.to;

  const [expenses, summary] = await Promise.all([
    getExpenses(filters),
    getSummary(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              $
            </div>
            <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
          </div>
          <span className="text-xs font-semibold text-gray-400">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <SummaryCards summary={summary} />
        <ExpenseForm />
        <FilterBar
          currentCategory={params.category}
          currentFrom={params.from}
          currentTo={params.to}
        />
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gray-400 rounded-full" />
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Expenses
              </h2>
              {expenses.length > 0 && (
                <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {expenses.length} total
                </span>
              )}
            </div>
          </div>
          <ExpenseList expenses={expenses} />
        </div>
      </main>
    </div>
  );
}
