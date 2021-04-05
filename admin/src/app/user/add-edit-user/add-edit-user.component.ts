import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {eFormItemType, IFormItem} from 'src/app/shared/shared/form.types';
import {UserService} from '../shared/user-service';
import {pick} from 'lodash';

@Component({
  selector: "app-add-edit-user",
  templateUrl: "./add-edit-user.component.html"
})
export class AddEditUserComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  isFormSubmitted = false;
  isEdit = false;
  isLoading = false;
  userId;
  userFormGroup: FormGroup = this.formBuilder.group({});
  userFormItems: Array<IFormItem> = [
    {label: 'Email', name: 'email', type: eFormItemType.EMAIL, required: true},
    {label: 'First Name', name: 'firstName', type: eFormItemType.TEXT, required: true},
    {label: 'Last Name', name: 'lastName', type: eFormItemType.TEXT, required: true},
    {label: 'Password', name: 'password', type: eFormItemType.PASSWORD, required: true},
  ];

  ngOnInit() {
    this.isEdit = this.route.snapshot.params.userId;
    if (this.isEdit) {
      this.userId = this.route.snapshot.data.user._id;
      setTimeout(() => {
        const userFormValue = pick(this.route.snapshot.data.user, ['firstName', 'lastName', 'email', 'password']);
        this.userFormGroup.setValue(userFormValue);
      }, 200);
    }
  }

  async addEditUser() {
    this.isFormSubmitted = true;
    if (this.isLoading || !this.userFormGroup.valid) {
      return;
    }
    try {
      this.isFormSubmitted = true;
      this.isLoading = true;
      const userData = this.userFormGroup.value;
      if (!this.isEdit) {
        await this.userService.addUser(userData);
      } else {
        await this.userService.updateUser(this.userId, userData);
      }
      await this.router.navigateByUrl('/users');
    } catch (e) {
      console.error(e);
      // Do nothing
    } finally {
      this.isLoading = false;
    }
  }
}
