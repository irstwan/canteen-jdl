import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScanPageComponent} from '../shared/scan-page/scan-page.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path : '', component : ScanPageComponent},
  {path : 'scan', component : ScanPageComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
