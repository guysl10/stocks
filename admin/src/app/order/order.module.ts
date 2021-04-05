import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderRoutingModule} from "./order-routing.module";
import {SharedModule} from '../shared/shared.module';
import {ViewOrderComponent} from './view-order/view-order.component';

@NgModule({
  declarations: [
    OrderListComponent, ViewOrderComponent
  ],
  imports: [OrderRoutingModule, CommonModule, SharedModule]
})
export class OrderModule {
}
