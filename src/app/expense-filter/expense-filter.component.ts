import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { start } from 'repl';

@Component({
  selector: 'app-expense-filter',
  templateUrl: './expense-filter.component.html',
  styleUrls: ['./expense-filter.component.css']
})
export class ExpenseFilterComponent implements OnInit {

  @Output() onFilterChanged = new EventEmitter<string>()
  startDate: string;

  constructor() {
   }

  ngOnInit(): void {
  }

  addNewFilter() {
    const startDate = new Date(this.startDate)
    this.onFilterChanged.emit(startDate.toISOString())
  }

}
