import { DataDisplayed } from './../model/dataDisplayed';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  pageNumber = 1;
  startDate = null;
  dataSelected = null;
  sortedType = null;
  totalNumberOfPage = null;

  constructor(public dialog: MatDialog) {}

  onPageChanged(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  onFilterChanged(startDate: string) {
    this.pageNumber = 1;
    this.startDate = startDate;
  }

  onDataSelected(dataSelected: string) {
    this.dataSelected = dataSelected;
    this.pageNumber = 1
  }

  onTotalNumberOfPageChanged(totalNumberOfPage: number) {
    this.totalNumberOfPage = totalNumberOfPage;
}
}

