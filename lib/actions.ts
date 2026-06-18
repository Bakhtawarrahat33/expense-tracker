'use server';

import { revalidatePath } from 'next/cache';
import { addExpense, deleteExpense, type ExpenseInput } from './db';

export async function createExpense(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string);
  const category = formData.get('category') as string;
  const note = (formData.get('note') as string) || '';
  const date = formData.get('date') as string;

  const input: ExpenseInput = { amount, category, note, date };
  addExpense(input);
  revalidatePath('/');
}

export async function removeExpense(id: number) {
  deleteExpense(id);
  revalidatePath('/');
}
