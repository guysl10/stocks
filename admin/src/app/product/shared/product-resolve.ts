import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {ProductService} from './product-service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolve implements Resolve<any> {
  constructor(private productService: ProductService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      return await this.productService.getProduct(route.params.productId);
    } catch (e) {
      await this.router.navigate(['/products']);
    }
  }
}
