import { ExpenseService } from '../services/expense.service';
import { Currency } from './../model/currency';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
})

export class ExpenseFormComponent {

  title: String = 'Ajouter une note de frais';
  tomorrow = new Date();
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

  constructor(
    private expenseService: ExpenseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tomorrow.setDate(this.tomorrow.getDate());

    if (data) {
      this.title = 'Modifier une note de frais';
      this.expenseForm.patchValue({
        purchasedOn: data.purchasedOn,
        nature: data.nature,
        originalAmount: {
          amount: data.originalAmount.amount,
          currency: data.originalAmount.currency,
        },
        comment: data.comment,
      });
    }
  }

  onSubmit() {
    this.expenseService
      .saveExpense(this.data, this.expenseForm.value)
      .pipe(take(1))
      .subscribe();
  }

  onDelete() {
    this.expenseService
      .deleteExpense(this.data.id)
      .pipe(take(1))
      .subscribe();
  }
}
