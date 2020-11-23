import { ExpenseFormComponent } from './../expense-form/expense-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  page: number = 1;;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public clickedEvent: Event;

  onPageChanged(pageNumber) {
   this.page = pageNumber;
  }
}
 