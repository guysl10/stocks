import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./shared/services/auth-guard.service";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: "login",
    loadChildren: () =>
      import("./auth/login/login.module").then(m => m.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "products",
    component: LayoutComponent,
    loadChildren: () =>
      import("./product/product.module").then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: LayoutComponent,
    loadChildren: () =>
      import("./user/user.module").then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: "orders",
    component: LayoutComponent,
    loadChildren: () =>
      import("./order/order.module").then(m => m.OrderModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
