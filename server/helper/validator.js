const linkNameValidatorRegEx = new RegExp(/^[a-z](?:[a-z0-9_-]*[a-z0-9])?$/);
const emailExpressionRegEx = new RegExp('^[a-zA-Z0-9_\\w-\']([a-zA-Z0-9._+\\w-\'-]|)*@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
// eslint-disable-next-line no-useless-escape
const urlExpressionRegEx = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
const timeZoneOffsetRegEx = new RegExp(/^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/);
const imageFormats = ['JPG', 'JPEG', 'PNG', 'BMP'];
const moment = require('moment');
const passwordExpressionRegEx = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$&~]).{6,16}$');
const ObjectId = require('mongoose').Types.ObjectId;
const TimeStampLengthForSeconds = 10;
const TimeStampLengthForMiliSeconds = 13;

class Validator {

  isDomain(domain) {
    return linkNameValidatorRegEx.test(domain);
  }

  isEmail(email) {
    return emailExpressionRegEx.test(email);
  }

  isUrl(url) {
    return urlExpressionRegEx.test(url);
  }

  isDate(date) {
    return !!Date(date);
  }

  isValidDateRange(range) {
    try{
      if(!global.__lodash.isString(range)) {
        return false;
      }
      const dateRangeObj = JSON.parse(range);
      const startDate = parseInt(dateRangeObj.startDate);
      const endDate = parseInt(dateRangeObj.endDate);
      if(startDate < 0 || endDate < 0) {
        return false;
      }
      return true;
    } catch(e) {
      return false;
    }
  }

  isValidPhone(phoneNumber) {
    return /^([0-9]+)$/.test(phoneNumber) && phoneNumber.length === 15;
  }

  isUnixTimeStamp(date) {
    const unixDate = moment(date, 'X', true);
    const val = parseInt(date) / 1000000000 > 10;
    return unixDate.isValid() && val === false ?  true : false;
  }

  isImage(format) {
    if(global.__lodash.indexOf(imageFormats, global.__lodash.toUpper(format)) === -1) {
      return false;
    } else{
      return true;
    }
  }

  isNumber(number) {
    return !isNaN(Number(number));
  }

  isPositiveNonZeroInteger(number) {
    return Number.isInteger(number) && number > 0;
  }

  isFloat(number) {
    return !isNaN(Number(number));
  }

  isPositiveNonZeroFloat(number) {
    return !isNaN(Number(number)) && number > 0;
  }

  isString(string) {
    return global.__lodash.isString(string);
  }

  isValidPassword(password) {
    return passwordExpressionRegEx.test(password);
  }

  isArray(array) {
    return Array.isArray(array);
  }

  isUndefined(data) {
    return global.__lodash.isUndefined(data);
  }

  isBoolean(data) {
    return data === true || data === false;
  }

  isPositiveNumber(number) {
    return this.isNumber(number) && number > 0;
  }

  isValidMongoId(id) {
    return ObjectId.isValid(id);
  }

  isValidTimeStamp({ timeStamp, miliSecondFormat = true }) {
    const timeStampString = String(timeStamp);
    if(this.isNumber(timeStamp)) {
      return false;
    }
    if(!miliSecondFormat && timeStampString.length === TimeStampLengthForSeconds) {
      return false;
    }
    if(miliSecondFormat && timeStampString.length === TimeStampLengthForMiliSeconds) {
      return false;
    }
    return !moment(timeStamp, 'x').isValid();
  }

  isValidTimeZoneOffset(offset) {
    return timeZoneOffsetRegEx.test(offset);
  }
}



module.exports = new Validator();
