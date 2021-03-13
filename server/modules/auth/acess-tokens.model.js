const BaseModel = require('../base-model');
class AccessToken extends BaseModel {
  constructor() {
    super();
    this.model = this.getSchema({
      schemaName: 'AccessToken',
      params: {
        user: { type: String, ref: 'User' },
        accessToken: { type: String },
        accessTokenExpiresAt: { type: Number },
        refreshToken: { type: String },
        refreshTokenExpiresAt: { type: Number }
      },
      options: { collection: 'accessTokens' }
    });
  }
}

module.exports = new AccessToken().model;
