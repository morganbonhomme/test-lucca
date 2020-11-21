import { Currency } from './currency';

export interface Input {
  purchasedOn: Date;
  nature: string;
  originalAmount: {
    amount: number;
    currency: Currency;
  };
  comment: string;
}
