import { Expense } from '../model/expense';
import { Input } from './../model/input';
import { CurrencyService } from './currency.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Currency } from '../model/currency';
import * as helper from '../helpers/expenses.helper';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(
    private http: HttpClient,
    private currencyService: CurrencyService
  ) {}

  expenseURL = 'http://localhost:3000/api/expenseItems';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(
        `Error status: ${error.status}, ` + `Error message: ${error.message}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  // LOGIC
  getEuroValue(inputAmount: number, currency: Currency): number {
    let newAmount = this.currencyService.convertToEuro(inputAmount, currency);
    return newAmount;
  }

  transformInput(inputExpense: Input) {
    const convertedAmount = this.getEuroValue(
      inputExpense.originalAmount.amount,
      inputExpense.originalAmount.currency
    );
    return {
      purchasedOn: inputExpense.purchasedOn,
      originalAmount: {
        amount: inputExpense.originalAmount.amount,
        currency: inputExpense.originalAmount.currency,
      },
      comment: helper.capitalize(inputExpense.comment.trim()),
      nature: helper.capitalize(inputExpense.nature.trim()),
      convertedAmount: {
        amount: convertedAmount,
        currency: Currency.EUR,
      },
    };
  }

  saveExpense(data, inputExpense: Input) {
    const dataExpense = this.transformInput(inputExpense);
    if (!data) {
      return this.createExpense(dataExpense);
    } else {
      return this.updateExpense(data.id, dataExpense)
    }
  }

  createExpense(inputExpense: Input) {
    return this.http
      .post<Expense>(this.expenseURL, inputExpense, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getExpenses(page: number): Observable<Expense[]> {
    return this.http
      .get<Expense[]>(`${this.expenseURL}?_page=${page}&_limit=10`)
      .pipe(catchError(this.handleError));
  }

  getTotalCountOfExpenses(): Observable<Expense[]> {
    return this.http
      .get<Expense[]>(this.expenseURL)
      .pipe(catchError(this.handleError));
  }

  getExpense(id: string): Observable<Expense> {
    return this.http
      .get<Expense>(`${this.expenseURL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateExpense(id: string, inputExpense): Observable<Expense> {
    return this.http
      .put<Expense>(`${this.expenseURL}/${id}`, inputExpense)
      .pipe(catchError(this.handleError));
  }

  deleteExpense(id: string) {
    return this.http
      .delete<Expense>(`${this.expenseURL}/${id}`)
      .pipe(catchError(this.handleError));
  }

}
