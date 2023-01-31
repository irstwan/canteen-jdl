import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventoryComponent} from './inventory/inventory.component';
import {IncomeStatementComponent} from './income-statement/income-statement.component';
import {SalesReportPeritemComponent} from './sales-report-peritem/sales-report-peritem.component';
import {SalesHistoryComponent} from './sales-history/sales-history.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'master-data',
        component: InventoryComponent
      },
      {
        path: 'income-statement',
        component: IncomeStatementComponent
      },
      {
        path: 'sales-report-peritem',
        component: SalesReportPeritemComponent
      },
      {
        path: 'sales-history',
        component: SalesHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
