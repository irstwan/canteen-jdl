import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { ScanPageComponent } from './scan-page/scan-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    ScanPageComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatSidenavModule
  ]
})
export class TransactionModule { }
