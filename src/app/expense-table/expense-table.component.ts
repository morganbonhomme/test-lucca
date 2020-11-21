import { ExpenseService } from '../services/expense.service';
import { ExpensesDataSource } from './../services/expenses.datasource';
import { Expense } from './../model/expense';
import { Component, OnInit } from '@angular/core';
import { Currency } from '../model/currency';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {

  dataSource: ExpensesDataSource;

  displayedColumns: string[] = ['id', 'purchasedOn', 'nature', 'originalAmount', 'originalCurrency', 'convertedAmount', 'convertedCurrency', 'comment', 'createdAt', 'lastModifiedAt'];

  constructor(private expenseService: ExpenseService) {}

    ngOnInit() {
        this.dataSource = new ExpensesDataSource(this.expenseService);
        this.dataSource.loadExpenses();
    }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
}

}