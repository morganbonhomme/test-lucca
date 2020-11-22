import { ExpenseFormComponent } from './../expense-form/expense-form.component';
import { ExpenseService } from '../services/expense.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css'],
})
export class ExpenseTableComponent implements OnInit {
  expenses$;
  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenses$ = this.expenseService.getExpenses();
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
