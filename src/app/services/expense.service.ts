import { Expense } from '../model/expense';
import { Input } from './../model/input';
import { CurrencyService } from './currency.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(
        `Error status: ${error.status}, ` + `Error message: ${error.message}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

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
      return this.updateExpense(data.id, dataExpense);
    }
  }

  createExpense(inputExpense: Input) {
    return this.http
      .post<Expense>(this.expenseURL, inputExpense, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createURL(page: number, startDate: string): string {
    // Get the total count of expenses to show pagination when no filter
    let expenseURL = this.expenseURL;

    // Get the total count of expenses to show pagination when there is a filter
    if (page === null && startDate !== null) {
      expenseURL = `${this.expenseURL}?purchasedOn=since,${startDate}`;
    }

    // Get expenses to show by page for the table when no filter
    if (page !== null && startDate === null) {
      expenseURL = `${this.expenseURL}?_page=${page}&_limit=10`;
    }

    // Get expenses to show by page for the table when there is a filter
    if (page !== null && startDate !== null) {
      expenseURL = `${this.expenseURL}?_page=${page}&_limit=10&purchasedOn=since,${startDate}`;
    }
    return expenseURL;
  }

  getExpenses(page: number, startDate: string): Observable<Expense[]> {
    const URL = this.createURL(page, startDate);
    return this.http.get<Expense[]>(URL).pipe(catchError(this.handleError));
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
