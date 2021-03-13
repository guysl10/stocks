const moment = require('moment');
const uuid = require('uuid/v4');
const randomString = require('randomstring');
class Utils {

  static parseBoolean(value) {
    if(value === true) {
      return true;
    }
    if(value === false) {
      return false;
    }
    if (value === 'true') {
      return true;
    }
    if(value === 'false') {
      return false;
    }
    return null;
  }

  static parseJSON(stringValue, defaultValue) {
    let returnValue = defaultValue || {};
    try{
      returnValue = JSON.parse(stringValue);
    } catch(e) {
    }
    return returnValue;
  }

  static stringifyJSON(stringValue, defaultValue) {
    let returnValue = defaultValue || '';
    try{
      returnValue = JSON.stringify(stringValue);
    } catch(e) {
    }
    return returnValue;
  }

  static getRandomString(length = 16) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static matchUrl(url, path, method) {
    const urls = url.split('/');
    path = path.replace(/\/$/, '');
    global.__lodash.forEach(urls, function (urlPart, index) {
      urls[index] = urlPart.indexOf(':') === 0 ? '[^\\/]+' : urlPart;
    });
    url = urls.join('/');
    const urlRegEx = new RegExp('^' + url + '$');
    return urlRegEx.test(method + ' ' + path);
  }

  static displayDate(date) {
    return moment(date).add(7, 'hours');
  }

  static getDayName(value) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const getDay = new Date(value).getDay();
    return days[getDay];
  }

  static __getRandomToken() {
    return randomString.generate(7) + '-' +
      randomString.generate(4) + uuid() + '-' + randomString.generate(4) +
      '-' + randomString.generate(7);
  }

  static convertToMoney(floatValue) {
    return Number(floatValue.toFixed(2));
  }
}

module.exports = Utils;
