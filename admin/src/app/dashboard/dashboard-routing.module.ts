import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';

const customerRoute: Routes = [
  {path: "", component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(customerRoute)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
