import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  addNewFilter(event) {
    const startDate = new Date(this.startDate)
    this.onFilterChanged.emit(startDate.toISOString())
  }

  removeFilter() {
    this.startDate = null;
    this.onFilterChanged.emit(null)
  }

}
