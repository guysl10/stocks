import {Component} from "@angular/core";
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {LocalStorageService} from 'src/app/shared/services/localstorage.service';
import {eFormItemType, IFormItem} from 'src/app/shared/shared/form.types';
import {AuthService} from '../shared/auth.service';
import {get} from 'lodash';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormGroup: FormGroup = this.formBuilder.group({});
  errorMessage: string;
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;
  loginFormItems: Array<IFormItem> = [
    {label: 'Email', name: 'email', type: eFormItemType.EMAIL, required: true},
    {label: 'Password', name: 'password', type: eFormItemType.PASSWORD, required: true}
  ];

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  async login() {
    try {
      this.isFormSubmitted = true;
      if (this.loginFormGroup.valid) {
        this.isLoading = true;
        const loginResponse = await this.authService.login(this.loginFormGroup.value);
        this.localStorage.setJSON('userInfo', loginResponse);
        this.localStorage.set('accessToken', loginResponse.accessToken);
        this.localStorage.set('refreshToken', loginResponse.refreshToken);
        this.router.navigate(["/dashboard"]);
      }
    } catch (exception) {
      this.errorMessage = get(exception, 'error.message') || 'Unknown error in login';
    }
    this.isLoading = false;
  }
}
