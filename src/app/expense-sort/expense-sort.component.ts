import { DataDisplayed } from './../model/dataDisplayed';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expense-sort',
  templateUrl: './expense-sort.component.html',
  styleUrls: ['./expense-sort.component.css'],
})
export class ExpenseSortComponent {
  @Output() onDataSelected = new EventEmitter<string>();

  dataDisplayed = Object.entries(DataDisplayed).map(([key, value]) => ({
    key,
    value,
  }));
  constructor() {}

  selectData(data) {
    this.onDataSelected.emit(data)
  }
}
