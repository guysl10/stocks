const BaseController = require('../base-controller');
const auth = require('./auth');

/**
 * @class AuthController
 * @description Class manage to sales employees manage APIs
 */
class AuthController extends BaseController {
  constructor(app) {
    super();
    app.post('/api/v1/login', this.apiHandler(auth.login.bind(auth)));
    app.post('/api/v1/admin-login', this.apiHandler(auth.adminLogin.bind(auth)));
    app.get('/api/v1/checkLogin', this.apiHandler(auth.checkLogin.bind(auth)));
    app.get('/api/v1/getNewAccessTokenFromRefreshToken', this.apiHandler(auth.getNewAccessTokenFromRefreshToken.bind(auth)));
    app.get('/api/v1/logout', this.apiHandler(auth.logout.bind(auth)));
    app.post('/api/v1/register', this.apiHandler(auth.register.bind(auth)));
  }
}

module.exports = AuthController;
