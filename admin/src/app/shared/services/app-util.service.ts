import {Injectable} from '@angular/core';
import * as Noty from 'noty';

@Injectable({
  providedIn: 'root'
})
export class AppUtil {
  modelRefArray: Array<any> = [];

  getRandomId(length?: number) {
    length = length || 30;
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  isSameObjectValue({obj1, obj2}) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  parseJSON(data) {
    let returnData = {};
    try {
      returnData = JSON.parse(data);
    } catch (e) {

    }
    return returnData;
  }

  stringifyJSON(data) {
    let returnData = {};
    try {
      returnData = JSON.stringify(data);
    } catch (e) {

    }
    return returnData;
  }

  showNotification({message, type, timeout = 5000}) {
    new Noty({
      text: message,
      type: type,
      layout: 'topRight',
      theme: 'mint',
      timeout: timeout,
      progressBar: true,
      closeWith: ['click']
    }).show();
  }
}

