import { ExpenseService } from '../services/expense.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css'],
})
export class ExpenseTableComponent implements OnInit, OnDestroy{

  constructor(
    private expenseService: ExpenseService,
    ) {}

  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'purchasedOn',
    'comment',
    'nature',
    'originalAmount',
    'originalCurrency',
    'convertedAmount'
  ];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses().subscribe(
      response => {
        this.dataSource.data = response
      }
    )
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row.id);
  }

  ngOnDestroy() {
  }

  
}
