import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  pageNumber: number = 1;
  dateFilter: string;

  constructor(public dialog: MatDialog) {}

  onPageChanged(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  onFilterChanged(startDate: string) {
    this.dateFilter = startDate;
  }
}
