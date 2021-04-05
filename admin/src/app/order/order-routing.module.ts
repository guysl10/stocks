import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderResolve} from './shared/order-resolve';
import {ViewOrderComponent} from './view-order/view-order.component';

const customerRoute: Routes = [
  {path: "", redirectTo: "/orders/list", pathMatch: "full"},
  {path: "list", component: OrderListComponent},
  {
    path: ":orderId", component: ViewOrderComponent,
    resolve: {order: OrderResolve},
  }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoute)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
