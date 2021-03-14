const crypto = require('crypto');
const BaseModule = require('../base-module');

class PasswordManager extends BaseModule {
  encryptPassword(password) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
module.exports = new PasswordManager();
