import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventoryComponent} from './inventory/inventory.component';
import {IncomeStatementComponent} from './income-statement/income-statement.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent
  },
  {
    path: 'income-statement',
    component: IncomeStatementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
