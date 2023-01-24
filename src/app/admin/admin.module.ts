import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
