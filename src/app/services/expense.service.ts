import { Input } from './../model/input';
import { CurrencyService } from './currency.service';
import { Expense } from '../model/expense';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Currency } from '../model/currency';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient,
    private currencyService: CurrencyService
    ) {}

  private expenseURL = 'http://localhost:3000/api/expenseItems';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // LOGIC 
  getEuroValue(inputAmount: number, currency: Currency): number {
    let newAmount = this.currencyService.convertToEuro(inputAmount, currency)
    return newAmount;
  }

  transformInputToExpense(inputExpense: Input): Expense {
    const convertedAmount = this.getEuroValue(inputExpense.originalAmount.amount, inputExpense.originalAmount.currency)
    return {
      ...inputExpense,
      id: '3',
      createdAt: new Date(Date.now()),
      lastModifiedAt: new Date(Date.now()),
      convertedAmount: {
        amount: convertedAmount,
        currency: Currency.EUR
    },
    };
  }

  // HTTP CLIENT

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.expenseURL)
    .pipe(
      catchError(this.handleError<Expense[]>('getExpenses', []))
    );
  }



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  saveExpense(inputExpense: Input) {
    const dataExpense = this.transformInputToExpense(inputExpense);

    return this.http
      .post(this.expenseURL, dataExpense, this.httpOptions)
      .pipe(catchError(this.handleError<Expense>('add expense')

      ))
      ;
  }
}
