const auth = require('./auth/auth');
const BaseController = require('./base-controller');
class Module extends BaseController {
  constructor(app, io) {
    super();
    this.app = app;
    this.io = io;
    this.authenticateUser();
    this.initAPIs();
  }

  authenticateUser() {
    this.app.use('/api/*', this.nextHandler(auth.validateToken.bind(auth)));
  }

  initAPIs() {
    const fs = require('fs');
    const path = require('path');
    const folder = __dirname;
    fs.readdirSync(folder).filter((file) => {
      const stats = fs.statSync(path.join(folder, file));
      return (file.indexOf('.') !== 0 && stats.isDirectory());
    }).forEach((dir) => {
      fs.readdirSync(path.join(folder, dir)).filter((file) => {
        const stats = fs.statSync(path.join(folder, dir, file));
        return (file.indexOf('.') !== 0 && !stats.isDirectory() &&
        file.endsWith('.controller.js'));
      }).forEach((file) => {
        try {
          const TmpAPI = require(path.join(folder, dir, file));
          new TmpAPI(this.app, this.io);
        }catch(e) {
          console.error('Error in init api', path.join(folder, dir, file));
          console.error(e);
        }
      });
    });
  }
}

module.exports = Module;
