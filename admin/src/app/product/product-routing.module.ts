import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddEditProductComponent} from './add-edit-product/add-edit-product.component';
import {ProductResolve} from './shared/product-resolve';
import {ProductListComponent} from "./product-list/product-list.component";

const customerRoute: Routes = [
  {path: "", redirectTo: "/products/list", pathMatch: "full"},
  {path: "list", component: ProductListComponent},
  {path: "add-product", component: AddEditProductComponent},
  {
    path: ":productId/edit", component: AddEditProductComponent,
    resolve: {product: ProductResolve},
  }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoute)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
