import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {OrderService} from './order-service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolve implements Resolve<any> {
  constructor(private orderService: OrderService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      return await this.orderService.getOrder(route.params.orderId);
    } catch (e) {
      await this.router.navigate(['/orders']);
    }
  }
}
