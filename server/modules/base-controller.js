const { EXCEPTIONS } = require('../helper/exceptions');
const userRoles = require('./users/user-roles');

class BaseController {
  constructor() {
    // eslint-disable-next-line new-cap
    this.router = global.express.Router();
    this.userRoles = userRoles;
  }

  apiHandler(method, { role } = {}) {
    return async (req, res, next)=>{
      try{
        if(role && global.__lodash.get(req, 'user.role') !== role) {
          throw new global.Exception(EXCEPTIONS.AuthorizationFailed);
        }
        const result = await method(req, res, next);
        res.sendResponse(result || {});
      } catch(error) {
        res.sendError(this.getException({ error, message: 'Unexpected error.' }));
      }
    };
  }

  nextHandler(method) {
    return async (req, res, next)=>{
      try{
        await method(req, res, next);
        next();
      } catch(error) {
        res.sendError(this.getException({ error, message: 'Unexpected error.' }));
      }
    };
  }

  getException({ error, message }) {
    if (error instanceof global.Exception) {
      return error;
    } else if (error && error.name === 'SequelizeDatabaseError') {
      console.error(error);
      return new global.Exception(EXCEPTIONS.DBError, message);
    } else {
      console.error(error);
      console.error(error.stack);
      return new global.Exception(EXCEPTIONS.UnKnownError, message);
    }
  }
}

module.exports = BaseController;
