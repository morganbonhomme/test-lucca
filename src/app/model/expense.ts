import { Currency } from './currency';

export interface Expense {
  id: string
  purchasedOn: Date;
  nature: string;
  originalAmount: {
    amount: number;
    currency: Currency;
  };
  convertedAmount: {
    amount: number;
    currency: Currency;
  };
  comment: string;
  createdAt: Date,
  lastModifiedAt: Date
}
