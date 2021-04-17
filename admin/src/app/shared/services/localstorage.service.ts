import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  setJSON(key: string, value: any) {
    let jsonValue = {};
    try {
      jsonValue = JSON.stringify(value);
    } catch (e) {
    }
    this.set(key, jsonValue);
  }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  getJSON(key: string): any {
    let returnValue = {};
    try {
      returnValue = JSON.parse(localStorage.getItem(key));
    } catch (e) {
    }
    return returnValue;
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }
}
