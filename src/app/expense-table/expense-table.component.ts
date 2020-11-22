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

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css'],
})

export class ExpenseTableComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) {}

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'purchasedOn',
    'comment',
    'nature',
    // 'originalAmount',
    // 'originalCurrency',
    // 'convertedAmount',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getExpenses();
    this.dataSource.sort = this.sort;

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  getExpenses() {
    this.expenseService.getExpenses().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  openDialog(row = null) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      this.getExpenses();
    });
  }

  ngOnDestroy() {}
}
