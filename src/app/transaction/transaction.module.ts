import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
  ],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        MatSidenavModule,
        FormsModule
    ]
})
export class TransactionModule { }
