import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'expenses.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    amount     REAL    NOT NULL,
    category   TEXT    NOT NULL,
    note       TEXT    DEFAULT '',
    date       TEXT    NOT NULL,
    created_at TEXT    DEFAULT (datetime('now'))
  )
`);

export type Expense = {
  id: number;
  amount: number;
  category: string;
  note: string;
  date: string;
  created_at: string;
};

export type ExpenseInput = {
  amount: number;
  category: string;
  note: string;
  date: string;
};

export type Summary = {
  total: number;
  thisMonth: number;
  byCategory: { category: string; total: number; count: number }[];
};

export type Filters = {
  category?: string;
  from?: string;
  to?: string;
};

export function getExpenses(filters?: Filters): Expense[] {
  let sql = 'SELECT * FROM expenses WHERE 1=1';
  const params: (string | number)[] = [];

  if (filters?.category) {
    sql += ' AND category = ?';
    params.push(filters.category);
  }
  if (filters?.from) {
    sql += ' AND date >= ?';
    params.push(filters.from);
  }
  if (filters?.to) {
    sql += ' AND date <= ?';
    params.push(filters.to);
  }

  sql += ' ORDER BY date DESC, created_at DESC';

  const stmt = db.prepare(sql);
  return stmt.all(...params) as Expense[];
}

export function addExpense(input: ExpenseInput): Expense {
  const stmt = db.prepare(
    'INSERT INTO expenses (amount, category, note, date) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(input.amount, input.category, input.note, input.date);
  const row = db.prepare('SELECT * FROM expenses WHERE id = ?').get(result.lastInsertRowid) as Expense;
  return row;
}

export function deleteExpense(id: number): void {
  db.prepare('DELETE FROM expenses WHERE id = ?').run(id);
}

export function getSummary(): Summary {
  const totalRow = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM expenses').get() as { total: number };
  const monthRow = db.prepare(
    "SELECT COALESCE(SUM(amount), 0) as total FROM expenses WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')"
  ).get() as { total: number };
  const byCategory = db.prepare(
    'SELECT category, SUM(amount) as total, COUNT(*) as count FROM expenses GROUP BY category ORDER BY total DESC'
  ).all() as { category: string; total: number; count: number }[];

  return { total: totalRow.total, thisMonth: monthRow.total, byCategory };
}
