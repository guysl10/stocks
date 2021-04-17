import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserListComponent} from "./user-list/user-list.component";
import {UserRoutingModule} from "./user-routing.module";
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    AddEditUserComponent
  ],
  imports: [UserRoutingModule, CommonModule, SharedModule]
})
export class UserModule {
}
