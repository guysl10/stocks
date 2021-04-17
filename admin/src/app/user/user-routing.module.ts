import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';
import {UserResolve} from './shared/user-resolve';
import {UserListComponent} from "./user-list/user-list.component";

const customerRoute: Routes = [
  {path: "", redirectTo: "/users/list", pathMatch: "full"},
  {path: "list", component: UserListComponent},
  {path: "add-user", component: AddEditUserComponent},
  {
    path: ":userId/edit", component: AddEditUserComponent,
    resolve: {user: UserResolve},
  }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoute)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
