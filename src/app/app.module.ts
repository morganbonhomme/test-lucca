import { SideDrawerComponent } from './side-drawer/side-drawer.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './submodules/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExpenseTableComponent,
    ExpenseFormComponent,
    SideDrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
