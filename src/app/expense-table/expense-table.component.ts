import { DataDisplayed } from './../model/dataDisplayed';
import { Expense } from './../model/expense';
import { ExpenseFormComponent } from './../expense-form/expense-form.component';
import { ExpenseService } from '../services/expense.service';
import {
  Component,
  Input
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Observable } from "rxjs";


@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css'],
})

export class ExpenseTableComponent {

  @Input() pageNumber: number;

  thead = Object.entries(DataDisplayed).map(([key, value]) => ({ key, value }))
  expenses$;

  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) {
    this.getExpenses();
  }

  ngOnChanges() {
    this.getExpenses();
  }

  getExpenses(): Observable<Expense[]> {
   return this.expenses$ = this.expenseService.getExpenses(this.pageNumber);
  }

  openDialog(row = null) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, { data: row });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((_) => {
        this.getExpenses();
      });
  }
}
