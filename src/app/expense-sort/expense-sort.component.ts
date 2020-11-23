import { DataDisplayed } from './../model/dataDisplayed';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-sort',
  templateUrl: './expense-sort.component.html',
  styleUrls: ['./expense-sort.component.css']
})
export class ExpenseSortComponent implements OnInit {

  thead = Object.entries(DataDisplayed).map(([key, value]) => ({ key, value }))
  constructor() { 

  }

  ngOnInit(): void {
  }

}
