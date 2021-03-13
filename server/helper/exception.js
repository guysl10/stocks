const  util = require('util');
const { EXCEPTION_MESSAGES } = require('./exceptions.js');

class Exception {
  constructor(errorName, params) {
    Error.captureStackTrace(this, Exception);
    this.errorName = errorName;
    this.params = params;
    this.code = EXCEPTION_MESSAGES[errorName]['code'];
    this.httpCode = EXCEPTION_MESSAGES[errorName]['httpCode'];
    this.errorMessage = EXCEPTION_MESSAGES[errorName]['message'];

    if(params !== undefined && params != null && typeof params !== 'string') {
      for(const key in params) {
        if(params[key]) {
          const regExp = new RegExp('{' + key + '}', 'g');
          this.errorMessage = this.errorMessage.replace(regExp, params[key]);
        }
      }
    }else if(params !== undefined) {
      this.errorMessage = params;
    }
    this.stack_trace = this.stack;
    switch(EXCEPTION_MESSAGES[errorName]['log']) {
      case 'log':
        console.log(this);
        break;
      case 'error':
        console.error(this);
        break;
    }
  }

  getError() {
    return {
      'code': this.code,
      'name': this.errorName,
      'message': this.errorMessage
    };
  }
}
util.inherits(Exception, Error);

module.exports = Exception;
