const BaseModel = require('../base-model');
const userRoles = require('../users/user-roles');
const { USER_ONLINE_STATES } = require('./user.constants');

class User extends BaseModel {
  constructor() {
    super();
    this.model = this.getSchema({
      schemaName: 'User',
      params: {
        name: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        role: { type: String },
        password: { type: String },
        active: { type: Boolean },
        onlineState: { type: String, enum: [USER_ONLINE_STATES.OFFLINE, USER_ONLINE_STATES.ONLINE], default: USER_ONLINE_STATES.OFFLINE },
        resetPasswordToken: { type: String },
        resetPasswordExpiresAt: { type: Number },
        ...this.defaultParams
      },
      options: { collection: 'users' }
    });
    this.setDefaultUserRoles();
  }

  setDefaultUserRoles() {
    this.model.DEFAULT_USER_ROLES = userRoles;
  }
}

module.exports = new User().model;
