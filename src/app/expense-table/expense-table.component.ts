import { ExpenseFormComponent } from './../expense-form/expense-form.component';
import { ExpenseService } from '../services/expense.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css'],
})
export class ExpenseTableComponent implements OnInit, OnDestroy {
  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) {}

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'purchasedOn',
    'comment',
    'nature',
    'originalAmount',
    'originalCurrency',
    'convertedAmount',
  ];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  openDialog(row) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      this.getExpenses();
    });
  }

  ngOnDestroy() {}
}
