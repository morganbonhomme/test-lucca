import { DataDisplayed } from './../model/dataDisplayed';
import { Expense } from './../model/expense';
import { ExpenseFormComponent } from './../expense-form/expense-form.component';
import { ExpenseService } from '../services/expense.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css'],
})
export class ExpenseTableComponent implements OnInit {
  @Input() pageNumber;
  @Input() startDate;
  @Input() dataSelected;

  @Output() onTotalNumberOfPageChanged = new EventEmitter<number>();

  thead = Object.entries(DataDisplayed).map(([key, value]) => ({ key, value }));
  expenses$;
  totalNumberOfPage: number;

  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getTotalCountOfExpenses();
    
  }

  ngOnChanges() {
    this.getExpenses();
    this.getTotalCountOfExpenses();
  }

  getExpenses() {
    return this.expenses$ = this.expenseService.getExpenses(
      this.pageNumber,
      this.startDate
    );
  }

  getTotalCountOfExpenses() {
    return this.expenseService
      .getExpenses(null, this.startDate)
      .pipe()
      .subscribe( resp => {
        this.totalNumberOfPage = Math.ceil(resp.length / 10);
        this.onTotalNumberOfPageChanged.emit(this.totalNumberOfPage);
      }
      );

      
  }

  openDialog(row = null) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, { data: row });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((_) => {
        this.getExpenses();
        this.getTotalCountOfExpenses();
      this.onTotalNumberOfPageChanged.emit(this.totalNumberOfPage);

      });
  }
}
