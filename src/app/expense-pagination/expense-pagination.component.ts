import { ExpenseService } from './../services/expense.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-expense-pagination',
  templateUrl: './expense-pagination.component.html',
  styleUrls: ['./expense-pagination.component.css']
})
export class ExpensePaginationComponent implements OnInit {

  page: number = 1;
  totalPage$;
  @Output() onPageChanged = new EventEmitter<Number>();
  
  constructor(
    expenseService: ExpenseService
  ) { 
    expenseService.getTotalCountOfExpenses().subscribe(
      response => console.log(response.length)
    )
  }

  ngOnInit(): void {
  }


  incrementPage() {
    this.page += 1;
    this.onPageChanged.emit(this.page)
  }

  decrementPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
    this.onPageChanged.emit(this.page)
  }
}
