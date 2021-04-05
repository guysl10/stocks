import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {DataService} from './data.service';
import {LocalStorageService} from './localstorage.service';
import {AuthService} from '../../auth/shared/auth.service';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: any;
  route: any;

  constructor(private authService: AuthService,
              private router: Router,
              private dataService: DataService, private localStorage: LocalStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.route = route;
    const url = state.url;
    return this.checkLogin(url);
  }


  private checkLogin(url: string) {
    return this.isUserExists()
      .pipe(map((userExists) => this.navigateAfterUserExistance(userExists, url)));
  }

  private navigateAfterUserExistance(userExists, url) {
    let returnValue = true;
    if (!userExists && !AuthGuard.isLoginUrls(url)) {
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      returnValue = false;
    }
    if (userExists) {
      if (AuthGuard.isLoginUrls(url) ||
        (this.route.data && this.route.data.ACCESS_TOKEN && !this.checkAuthorization(this.route.data.ACCESS_TOKEN))) {
        this.navigateToHome();
        returnValue = false;
      }
    }
    return returnValue;
  }

  private navigateToHome() {
    this.router.navigate(['/dashboard']);
  }

  private static isLoginUrls(Url) {
    return Url.indexOf('/login') > -1;
  }

  private isUserExists(): Observable<boolean> {
    return Observable.create((subscriber) => {
      return this.dataService.callAPI({url: `/api/v1/checkLogin`, showErrorMessage: false})
        .subscribe((user) => {
          if (user) {
            this.localStorage.setJSON('userInfo', user);
            subscriber.next(true);
          } else {
            subscriber.next(false);
          }
          subscriber.complete();
        }, () => {
          subscriber.next(false);
          subscriber.complete();
        });
    });
  }

  checkAuthorization(token) {
    const userInfo = this.localStorage.getJSON('userInfo');
    if (userInfo) {
      return userInfo.Role.Tokens.indexOf(token) > -1;
    } else {
      return false;
    }
  }
}
