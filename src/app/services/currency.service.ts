import { Currency } from '../model/currency';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  convertToEuro(inputAmount: number, currency: Currency): number {
    let convertedAmount: number;
    switch (currency) {
      case Currency.CHF:
        convertedAmount = inputAmount * 2;
        break;
      case Currency.GBP:
        convertedAmount = inputAmount * 200;
        break;
      case Currency.USD:
        convertedAmount = inputAmount * 20000;
        break;
      default:
        return inputAmount;
    }
    return convertedAmount
  }
}
