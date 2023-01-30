import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IncomeStatementComponent} from './income-statement/income-statement.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    InventoryComponent,
    IncomeStatementComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    AdminRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
