import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from './user-service';

@Injectable({
  providedIn: 'root'
})
export class UserResolve implements Resolve<any> {
  constructor(private userService: UserService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      return await this.userService.getUser(route.params.userId);
    } catch (e) {
      await this.router.navigate(['/users']);
    }
  }
}
