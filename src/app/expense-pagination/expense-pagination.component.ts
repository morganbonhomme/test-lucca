import { ExpenseService } from './../services/expense.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-expense-pagination',
  templateUrl: './expense-pagination.component.html',
  styleUrls: ['./expense-pagination.component.css'],
})
export class ExpensePaginationComponent {
  
  pageNumber: number = 1;
  totalPage;

  @Output() onPageChanged = new EventEmitter<Number>();

  constructor(private expenseService: ExpenseService) {
    this.getNumberOfPage()
  }

  getNumberOfPage() {
    this.expenseService
    .getTotalCountOfExpenses()
    .pipe(take(1))
    .subscribe((resp) => (this.totalPage = Math.ceil(resp.length / 10)));
  }

  changePage(delta) {
    this.pageNumber += delta;
    this.onPageChanged.emit(this.pageNumber);
  }
  
  incrementPage() {
    this.changePage(1);
  }
  
  decrementPage() {
    this.changePage(-1);
  }

}
