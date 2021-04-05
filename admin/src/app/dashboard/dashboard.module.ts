import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {FormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardOrdersChartComponent} from './dashboard-orders-chart/dashboard-orders-chart.component';
import {ChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardOrdersChartComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class DashboardModule {
}
