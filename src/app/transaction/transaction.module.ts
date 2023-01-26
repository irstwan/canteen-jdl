import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransactionRoutingModule} from './transaction-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SellComponent} from './sell/sell.component';
import {SharedModule} from '../shared/shared.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    SellComponent
  ],
  exports: [
    SellComponent
  ],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        FormsModule,
        SharedModule,
        MatSlideToggleModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule
    ]
})
export class TransactionModule {
}
