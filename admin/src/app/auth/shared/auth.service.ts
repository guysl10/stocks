import {Injectable} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor(private dataService: DataService, private localStorage: LocalStorageService) {
  }

  async login({email, password}) {
    return await this.dataService.callAPI({
      url: '/api/v1/admin-login',
      showErrorMessage: false,
      body: {email, password},
      method: 'post'
    }).toPromise();
  }

  async logout() {
    return await this.dataService.callAPI({
      url: '/api/v1/logout',
      showErrorMessage: false,
    }).toPromise();
  }
}
