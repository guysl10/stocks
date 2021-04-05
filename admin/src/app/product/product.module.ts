import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductRoutingModule} from "./product-routing.module";
import {AddEditProductComponent} from './add-edit-product/add-edit-product.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    AddEditProductComponent
  ],
  imports: [ProductRoutingModule, CommonModule, SharedModule]
})
export class ProductModule {
}
