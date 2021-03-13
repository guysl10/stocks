const UserModel = require('./user.model');
const BaseModule = require('../base-module');
const passwordManager = require('../auth/password-manager');

class User extends BaseModule {
  constructor() {
    super();
  }

  async __validateUserData(req) {
    const { email, firstName, lastName, password } = req.body;
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
    let foundEmail;
    if(req.params.userId) {
      foundEmail = await UserModel.findOne({ email, _id: { $ne: req.params.userId } });
    } else {
      foundEmail = await UserModel.findOne({ email });
    }
    if(foundEmail) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Email is already in use.');
    }
  }

  async createUser(req) {
    await this.__validateUserData(req);
    const user = new UserModel({
      ...req.body,
      role: this.userRoles.ECOM_USER,
      password: passwordManager.encryptPassword(req.body.password),
      ...this.getDefaultCreateFields(req)
    });
    await user.save();
    return user;
  }

  async __getUser(req) {
    const user = await UserModel.findOne({ _id: req.params.userId }).lean();
    if(!user) {
      throw new this.Exception(this.EXCEPTIONS.ObjectNotFound, 'User not found.');
    }
    return user;
  }

  async getUser(req) {
    return await this.__getUser(req);
  }

  async editUser(req) {
    const oldUserData = await this.__getUser(req);
    let newPassword = req.body.password;
    if(oldUserData.password !== newPassword) {
      newPassword = passwordManager.encryptPassword(newPassword);
    }
    await this.__validateUserData(req);
    await UserModel.update({ _id: req.params.userId }, { ...req.body, password: newPassword, ...this.getDefaultUpdateFields(req) });
  }

  async deleteUser(req) {
    await this.__getUser(req);
    await UserModel.remove({ _id: req.params.userId });
  }

  async getUserList({ query }) {
    const searchQuery = { role: this.userRoles.ECOM_USER };
    if(query.firstName) {
      searchQuery.firstName = new RegExp(query.firstName, 'i');
    }
    if(query.lastName) {
      searchQuery.lastName = new RegExp(query.lastName, 'i');
    }
    if(query.onlineState) {
      searchQuery.onlineState = new RegExp(query.onlineState, 'i');
    }
    if(query.email) {
      searchQuery.email = new RegExp(query.email, 'i');
    }
    return await this.getRecordList({ query, searchQuery, dbModel: UserModel });
  }

  async setUserOnlineState({ userId, state }) {
    try{
      if(!this.io) {
        this.initIo();
      }
      this.io.sockets.emit('user-status', { userId, state });
      await UserModel.updateOne({ _id: userId }, { $set: { onlineState: state } });
    } catch(e) {
      console.error('Error in seting the user online state', e);
    }
  }
}
module.exports = new User();
