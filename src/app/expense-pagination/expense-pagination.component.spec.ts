import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePaginationComponent } from './expense-pagination.component';

describe('ExpensePaginationComponent', () => {
  let component: ExpensePaginationComponent;
  let fixture: ComponentFixture<ExpensePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
