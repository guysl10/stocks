import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {get, merge, each} from 'lodash';
import {Router} from '@angular/router';
import {LocalStorageService} from './localstorage.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppUtil} from './app-util.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public loadingCount = 0;
  public loadingStatus = new EventEmitter();
  private headers: any = {};
  user: any;

  constructor(private http: HttpClient,
              private appUtil: AppUtil,
              private router: Router,
              private localStorage: LocalStorageService) {
  }

  callAPI({
            search = {}, showErrorMessage = true, headers, method = 'GET',
            showLoader = true, url, body,
            successMessage, errorMessage,
          }: any) {
    if (showLoader) {
      this.setLoader();
    }
    const searchParams = this.setSearchParams(search);
    return Observable.create((subscriber) => {
      this.callHttpAPI({method, url, body, headers, searchParams})
        // tslint:disable-next-line:max-line-length
        .subscribe((response) => this.handleSubscribe({
            res: response,
            subscriber,
            successMessage,
            showLoader,
            errorMessage,
            showErrorMessage
          }),
          (err) => {
            console.log(err);
            if (get(err, 'error.error.name') === 'TokenExpired'
              || get(err, 'error.error.name') === 'InvalidToken') {
              this.generateTokenByRefreshToken()
                .subscribe((res: any) => {
                    this.setNewTokens(res);
                    this.callHttpAPI({method, url, body, headers, searchParams})
                      // tslint:disable-next-line:max-line-length
                      .subscribe(res1 => this.handleSubscribe({
                          res: res1,
                          subscriber,
                          successMessage,
                          showLoader,
                          errorMessage,
                          showErrorMessage
                        }),
                        // tslint:disable-next-line:max-line-length
                        secondCallError => this.handleError({
                          err: secondCallError,
                          errorMessage,
                          showErrorMessage,
                          subscriber,
                          showLoader
                        }));
                  }
                  , tokenError => {
                    this.logout();
                    this.router.navigate(['/login']);
                    this.handleError({err: tokenError, errorMessage, showErrorMessage, subscriber, showLoader});
                  });
            } else {
              this.handleError({err, errorMessage, showErrorMessage, subscriber, showLoader});
            }
          });
    });
  }

  private setNewTokens(res) {
    this.localStorage.set('accessToken', res.data.accessToken);
    this.localStorage.set('refreshToken', res.data.refreshToken);
    this.localStorage.setJSON('userInfo', res.data.userInfo);
    this.headers.accessToken = 'Bearer ' + this.localStorage.get('accessToken');
  }

  private logout() {
    this.localStorage.remove('userInfo');
    this.localStorage.remove('accessToken');
    this.localStorage.remove('refreshToken');
  }

  private generateTokenByRefreshToken() {
    const headers = {...this.headers};
    const url = '/api/v1/getNewAccessTokenFromRefreshToken';
    if (!DataService._checkLoginUrls(url)) {
      headers.refreshToken = this.getRefreshTokenFromLocalStorage();
    }
    return this.callHttpAPI({url, method: 'get', headers});
  }

  private callHttpAPI({method, url, body, searchParams, headers}: any) {
    if (!DataService._checkLoginUrls(url)) {
      this.headers.accessToken = this.getAccessTokenFromLocalStorage();
    }
    headers = new HttpHeaders(merge(headers, this.headers));
    return this.http
      .request(method, "http://localhost:9001" + url, {body, headers, params: searchParams});
  }

  private handleSubscribe({res, subscriber, successMessage, showLoader, errorMessage, showErrorMessage}) {
    const data = (typeof res === 'string') ? JSON.parse(res) : res;
    if (res.status === 'error') {
      this.handleError({err: {error: res}, errorMessage, showErrorMessage, subscriber, showLoader});
    } else {
      this.handleAPISuccess({subscriber, successMessage, data});
      subscriber.complete();
      if (showLoader) {
        this.removeLoader();
      }
    }
  }

  private handleError({err, errorMessage, showErrorMessage, subscriber, showLoader}) {
    if (get(err, 'error.error.Name') === 'JsonWebTokenError') {
      this.logout();
    }
    errorMessage = showErrorMessage ? (get(err, 'error.error.Message') || errorMessage || 'Something went wrong.') : null;
    if (errorMessage) {
      this.appUtil.showNotification({message: errorMessage, type: 'error'});
    }
    subscriber.error(err.error);
    if (showLoader) {
      this.removeLoader();
    }
  }

  private handleAPISuccess({successMessage, subscriber, data}) {
    if (successMessage) {
      this.appUtil.showNotification({message: successMessage, type: 'success'});
    }
    subscriber.next(data && data.data);
  }

  private setSearchParams(search): HttpParams {
    let searchParams: HttpParams = new HttpParams();
    if (this.localStorage.get('userInfo')) {
      this.user = this.localStorage.getJSON('userInfo');
      // search.email = this.user.name;
    }
    search = {...search, _dc: Math.random()};
    each(search, (value, key) => searchParams = searchParams.set(key, encodeURIComponent(value)));
    return searchParams;
  }

  public removeLoader() {
    if (this.loadingCount) {
      this.loadingCount--;
    }
    if (this.loadingCount === 0) {
      this.loadingStatus.emit(false);
    }
  }

  public setLoader() {
    this.loadingStatus.emit(true);
    this.loadingCount++;
  }

  private getAccessTokenFromLocalStorage() {
    return (this.localStorage.get('accessToken')) ? 'Bearer ' + this.localStorage.get('accessToken') : '';
  }

  private getRefreshTokenFromLocalStorage() {
    return (this.localStorage.get('refreshToken')) ? this.localStorage.get('refreshToken') : '';
  }

  private static _checkLoginUrls(Url) {
    return Url.indexOf('/login') > -1 || Url.indexOf('/set-password') > -1 || Url.indexOf('forgot-password') > -1;
  }
}
