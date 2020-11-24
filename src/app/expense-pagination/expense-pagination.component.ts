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

  @Input() totalNumberOfPage;

  @Output() onPageChanged = new EventEmitter<Number>();

  constructor(private expenseService: ExpenseService) {
  }

  ngOnChanges() {
    if (this.totalNumberOfPage === 0) {
      this.totalNumberOfPage = 1;
    }
    if (this.pageNumber > this.totalNumberOfPage && this.totalNumberOfPage !== null) {
      this.pageNumber = this.totalNumberOfPage
    }
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
