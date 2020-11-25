import { Currency } from '../model/currency';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})


export class CurrencyService {

  exchangeRates;
  constructor(
    private http: HttpClient
  ) {}

  convertToEuro(inputAmount: number, currency: Currency): number {
 
    let convertedAmount: number;
    switch (currency) {
      case Currency.CHF:
        convertedAmount = inputAmount * 0.92;
        break;
      case Currency.GBP:
        convertedAmount = inputAmount * 1.12;
        break;
      case Currency.USD:
        convertedAmount = inputAmount * 0.84;
        break;
      default:
        return inputAmount;
    }
    return convertedAmount
  }
}
