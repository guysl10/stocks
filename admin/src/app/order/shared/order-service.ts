import {Injectable} from '@angular/core';
import {DataService} from '../../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private dataService: DataService) {
  }

  async getOrderData(search) {
    return await this.dataService.callAPI({
      url: '/api/v1/orders', search
    }).toPromise();
  }

  async deleteOrder(orderId) {
    return await this.dataService.callAPI({
      url: `/api/v1/orders/${orderId}`,
      method: 'delete',
      successMessage: 'Order deleted successfully.',
      errorMessage: 'Error in deleting the order.'
    }).toPromise();
  }

  async addOrder(orderData) {
    return await this.dataService.callAPI({
      url: `/api/v1/orders`,
      method: 'post',
      body: orderData,
      successMessage: 'Order created successfully.',
      errorMessage: 'Error in creating the order.'
    }).toPromise();
  }

  async getOrder(orderId) {
    return await this.dataService.callAPI({
      url: `/api/v1/orders/${orderId}`,
      method: 'get',
      errorMessage: 'Error in getting order details.'
    }).toPromise();
  }

  async updateOrder(orderId, orderData) {
    return await this.dataService.callAPI({
      url: `/api/v1/orders/${orderId}`,
      method: 'put',
      body: orderData,
      errorMessage: 'Error in updating order details.',
      successMessage: 'Order updated successfully.'
    }).toPromise();
  }

}
