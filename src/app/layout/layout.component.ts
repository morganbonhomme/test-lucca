import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  pageNumber: number = 1;
  constructor(public dialog: MatDialog) {}

  onPageChanged(pageNumber) {
    this.pageNumber = pageNumber;
  }
}
