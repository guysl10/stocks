import {Injectable} from '@angular/core';
import {DataService} from '../../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private dataService: DataService) {
  }

  async getProductData(search) {
    return await this.dataService.callAPI({
      url: '/api/v1/products', search
    }).toPromise();
  }

  async deleteProduct(productId) {
    return await this.dataService.callAPI({
      url: `/api/v1/products/${productId}`,
      method: 'delete',
      successMessage: 'Product deleted successfully.',
      showMessageError: true,
      errorMessage: 'Error in deleting the product.'
    }).toPromise();
  }

  async addProduct(productData) {
    return await this.dataService.callAPI({
      url: `/api/v1/products`,
      method: 'post',
      body: productData,
      successMessage: 'Product created successfully.',
      errorMessage: 'Error in creating the product.'
    }).toPromise();
  }

  async getProduct(productId) {
    return await this.dataService.callAPI({
      url: `/api/v1/products/${productId}`,
      method: 'get',
      errorMessage: 'Error in getting product details.'
    }).toPromise();
  }

  async updateProduct(productId, productData) {
    return await this.dataService.callAPI({
      url: `/api/v1/products/${productId}`,
      method: 'put',
      body: productData,
      errorMessage: 'Error in updating product details.',
      successMessage: 'Product updated successfully.'
    }).toPromise();
  }

}
