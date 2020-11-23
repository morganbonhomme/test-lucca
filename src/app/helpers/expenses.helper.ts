import { Expense } from './../model/expense';

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const flatAPIdata = (expense: Expense) => {
  return {
    id: expense.id,
    purchasedOn: expense.purchasedOn,
    nature: expense.nature,
    originalAmount: expense.originalAmount.amount,
    originalCurrency: expense.originalAmount.currency,
    convertedAmount: expense.convertedAmount.amount,
    convertedCurreny: expense.convertedAmount.currency,
    comment: expense.comment,
    createdAt: expense.createdAt,
    lastModifiedAt: expense.lastModifiedAt,
  };
};
