import { ExpenseService } from './expense.service';
import { Expense } from './../model/expense';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class ExpensesDataSource implements DataSource<Expense> {
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private expenseService: ExpenseService) {}

  connect(collectionViewer: CollectionViewer): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.expensesSubject.complete();
    this.loadingSubject.complete();
  }

  loadExpenses() {
    this.loadingSubject.next(true);

    this.expenseService
      .getExpenses()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((expenses) => this.expensesSubject.next(expenses));
  }
}
