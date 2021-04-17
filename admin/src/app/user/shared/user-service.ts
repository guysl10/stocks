import {Injectable} from '@angular/core';
import {DataService} from '../../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private dataService: DataService) {
  }

  async getUserData(search) {
    return await this.dataService.callAPI({
      url: '/api/v1/users', search
    }).toPromise();
  }

  async deleteUser(userId) {
    return await this.dataService.callAPI({
      url: `/api/v1/users/${userId}`,
      method: 'delete',
      successMessage: 'User deleted successfully.',
      showMessageError: true,
      errorMessage: 'Error in deleting the user.'
    }).toPromise();
  }

  async addUser(userData) {
    return await this.dataService.callAPI({
      url: `/api/v1/users`,
      method: 'post',
      body: userData,
      successMessage: 'User created successfully.',
      errorMessage: 'Error in creating the user.'
    }).toPromise();
  }

  async getUser(userId) {
    return await this.dataService.callAPI({
      url: `/api/v1/users/${userId}`,
      method: 'get',
      errorMessage: 'Error in getting user details.'
    }).toPromise();
  }

  async updateUser(userId, userData) {
    return await this.dataService.callAPI({
      url: `/api/v1/users/${userId}`,
      method: 'put',
      body: userData,
      errorMessage: 'Error in updating user details.',
      successMessage: 'User updated successfully.'
    }).toPromise();
  }

}
