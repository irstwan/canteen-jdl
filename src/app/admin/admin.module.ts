import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IncomeStatementComponent} from './income-statement/income-statement.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { SalesReportPeritemComponent } from './sales-report-peritem/sales-report-peritem.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';


@NgModule({
  declarations: [
    InventoryComponent,
    IncomeStatementComponent,
    SalesReportPeritemComponent,
    SalesHistoryComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    AdminRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'id'},
  ]
})
export class AdminModule { }
