import { ExpenseService } from '../services/expense.service';
import { Currency } from './../model/currency';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
})
export class ExpenseFormComponent {
  constructor(
    private expenseService: ExpenseService
  ) {}

  currencies = Object.keys(Currency).filter((key) => isNaN(+key));

  expenseForm = new FormGroup({
    purchasedOn: new FormControl('', Validators.required),
    nature: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),

    originalAmount: new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      currency: new FormControl('', Validators.required),
    }),
  });

  onSubmit() {
    this.expenseService.saveExpense(this.expenseForm.value).subscribe();
    this.expenseService.getExpenses().subscribe();
  }

  getErrorMessage() {
    console.log(this.expenseForm.hasError);
  }

}
