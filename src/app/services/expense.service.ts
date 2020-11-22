import { Expense } from '../model/expense';
import { Input } from './../model/input';
import { CurrencyService } from './currency.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Currency } from '../model/currency';

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

  transformInputToExpense(inputExpense: Input): Expense {
    const convertedAmount = this.getEuroValue(
      inputExpense.originalAmount.amount,
      inputExpense.originalAmount.currency
    );
    return {
      ...inputExpense,
      id: null,
      createdAt: new Date(Date.now()),
      lastModifiedAt: new Date(Date.now()),
      convertedAmount: {
        amount: convertedAmount,
        currency: Currency.EUR,
      },
    };
  }

  saveExpense(data, inputExpense: Input) {
    if (!data) {
      return this.createExpense(inputExpense);
    } else {
      return this.updateExpense(data.id, inputExpense)
    }
  }


  createExpense(inputExpense: Input) {
    const dataExpense = this.transformInputToExpense(inputExpense);
    return this.http
      .post<Expense>(this.expenseURL, dataExpense, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getExpenses(): Observable<Expense[]> {
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
