const BaseModule = require('../base-module');
const AccessTokenModel = require('./acess-tokens.model');
const moment = require('moment');
const utils = require('../../helper/utils');
const UserModel = require('../users/user.model');
const userController = require('../users/user');
const cartController = require('../carts/cart');
const passwordManager = require('./password-manager');
const userReturnFields = { email: 1, name: 1, role: 1 };
const { USER_ONLINE_STATES } = require('../users/user.constants');
const APIWithoutAuth = [
  'POST /api/v1/login',
  'POST /api/v1/admin-login',
  'GET /api/v1/products/home-products',
  'GET /api/v1/getNewAccessTokenFromRefreshToken',
  'GET /api/v1/logout',
  'POST /api/v1/register',
  'GET /api/v1/products/search'
];
class Auth extends BaseModule {

  async login(req) {
    const { email, password } = req.body;
    this.__validateEmailPassword({ email, password });
    const user = await this.__getUser({ email, password, role: this.userRoles.ECOM_USER || this.userRoles.ADMIN });
    const accessTokenRecord = await this.__getAccessToken(user);
    userController.setUserOnlineState({ userId: user._id, state: USER_ONLINE_STATES.ONLINE });
    const userDetails =  await this.__validateAccessTokenAndGetUser(accessTokenRecord.accessToken);
    const userCartDetails = await cartController.getUserCartDetails({ params: { userId: user._id } });
    return { ...userDetails, userCart: userCartDetails };
  }

  async adminLogin(req) {
    const { email, password } = req.body;
    this.__validateEmailPassword({ email, password });
    const user = await this.__getAdmin({ email, password, role: this.userRoles.ADMIN });
    const accessTokenRecord = await this.__getAccessToken(user);
    return await this.__validateAccessTokenAndGetUser(accessTokenRecord.accessToken);
  }

  async logout(req) {
    const accessToken = this.__getAccessTokenFromHeader(req);
    const accessTokenRecord = await AccessTokenModel.findOne({ accessToken });
    const userRecord = await UserModel.findOne({ _id: accessTokenRecord.user });
    await AccessTokenModel.findOneAndRemove({ accessToken });
    if(userRecord) {
      userController.setUserOnlineState({ userId: userRecord._id, state: USER_ONLINE_STATES.OFFLINE });
    }
    return {};
  }

  async validateToken(req) {
    if(this.doIgnoreAuth(req)) {
      return;
    }
    const accessToken = this.__getAccessTokenFromHeader(req);
    req.user = await this.__validateAccessTokenAndGetUser(accessToken);
  }

  __matchUrl(url, req) {
    const urlParts = url.split('/');
    const path = req.originalUrl.replace(/\/$/, '');
    for(let i = 0; i < urlParts.length; i++) {
      urlParts[i] = urlParts[i].indexOf(':') === 0 ? '[^/]+' :  urlParts[i];
    }
    url = urlParts.join('/');
    const urlRegEx = new RegExp('^' + url + '$', 'i');
    return urlRegEx.test(req.method.toLowerCase() + ' ' + path.split('?')[0]);
  }

  doIgnoreAuth(req) {
    let foundUrl;
    for(const url of APIWithoutAuth) {
      foundUrl = this.__matchUrl(url.toLowerCase(), req);
      if(foundUrl) {
        break;
      }
    }
    return foundUrl;
  }

  async __getAccessToken(user) {
    const accessTokenInstance = (await AccessTokenModel.create({
      user: user._id,
      accessToken: utils.__getRandomToken(),
      refreshToken: utils.__getRandomToken(),
      ...this.__getUpdatedTokenTime()
    })).toJSON();
    delete accessTokenInstance.User;
    return accessTokenInstance;
  }

  __getUpdatedTokenTime() {
    return {
      accessTokenExpiresAt: moment().utc().add(1, 'hours').unix(),
      refreshTokenExpiresAt: moment().utc().add(7, 'days').unix()
    };
  }

  async __getUser({ email, password }) {
    password = passwordManager.encryptPassword(password);
    const user = await UserModel.findOne({ email, password }, userReturnFields).lean();
    if (!user) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Email or password does not match.');
    }
    return user;
  }

  async __getAdmin({ email, password, role }) {
    password = passwordManager.encryptPassword(password);
    const user = await UserModel.findOne({ email, password, role }, userReturnFields).lean();
    if (!user) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Email or password does not match.');
    }
    return user;
  }

  __validateEmailPassword({ email, password }) {
    if (!this.validator.isEmail(email)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid email.');
    }
    if (!this.validator.isString(password)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid password.');
    }
  }

  async checkLogin(req) {
    const userCartDetails = await cartController.getUserCartDetails({ params: { userId: req.user._id } });
    return { ...req.user, userCart: userCartDetails };
  }

  async getNewAccessTokenFromRefreshToken(req) {
    const refreshToken = req.headers.refreshtoken;
    const accessToken = await AccessTokenModel.findOne({ refreshToken });
    const currentDate = moment().utc().unix();
    if(!accessToken || accessToken.refreshTokenExpiresAt < currentDate) {
      throw new this.Exception(this.EXCEPTIONS.AuthenticationFailed);
    }
    const newAccessToken = utils.__getRandomToken();
    await accessToken.updateOne({ ...this.__getUpdatedTokenTime(), accessToken: newAccessToken });
    return await this.__validateAccessTokenAndGetUser(newAccessToken);
  }

  __getAccessTokenFromHeader(req) {
    const authHeader = req.headers.accesstoken;
    if(!authHeader) {
      throw new this.Exception(this.EXCEPTIONS.AuthenticationFailed);
    }
    return authHeader.replace('Bearer ', '');
  }

  async __validateAccessTokenAndGetUser(accessToken) {
    const accessTokenRecord = await AccessTokenModel.findOne({ accessToken });
    const currentDate = moment().utc().unix();
    if(!accessTokenRecord) {
      throw new this.Exception(this.EXCEPTIONS.InvalidToken);
    }
    if(accessTokenRecord.accessTokenExpiresAt < currentDate) {
      throw new this.Exception(this.EXCEPTIONS.TokenExpired);
    }
    const user = await UserModel.findById(accessTokenRecord.user, userReturnFields).lean();
    if(!user) {
      throw new this.Exception(this.EXCEPTIONS.AuthenticationFailed);
    }
    await accessTokenRecord.updateOne(this.__getUpdatedTokenTime());
    return { ...accessTokenRecord.toJSON(), ...user };
  }

  async __validateReqistrationData(req) {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    if (!this.validator.isEmail(email)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid email.');
    }
    if (!this.validator.isString(password)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide password.');
    }
    if (!this.validator.isString(firstName)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide first name.');
    }
    if (!this.validator.isString(lastName)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide last name.');
    }
    if (!this.validator.isString(confirmPassword)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide confirm password.');
    }
    if(password !== confirmPassword) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Password not matched with confirm password.');
    }
    const foundEmail = await UserModel.findOne({ email });
    if(foundEmail) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Email is already in use.');
    }
  }

  async register(req) {
    await this.__validateReqistrationData(req);
    const user = new UserModel({ ...req.body, password: passwordManager.encryptPassword(req.body.password), role: this.userRoles.ECOM_USER });
    await user.save();
  }
}

module.exports = new Auth();
