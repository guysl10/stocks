const BaseController = require('../base-controller');
const user = require('./user');

class UsersController extends BaseController {
  constructor(app) {
    super();
    this.router.post('', this.apiHandler(user.createUser.bind(user), { role: this.userRoles.ADMIN }));
    this.router.get('', this.apiHandler(user.getUserList.bind(user), { role: this.userRoles.ADMIN }));
    this.router.get('/:userId', this.apiHandler(user.getUser.bind(user), { role: this.userRoles.ADMIN }));
    this.router.put('/:userId', this.apiHandler(user.editUser.bind(user), { role: this.userRoles.ADMIN }));
    this.router.delete('/:userId', this.apiHandler(user.deleteUser.bind(user), { role: this.userRoles.ADMIN }));
    app.use('/api/v1/users', this.router);
  }
}

module.exports = UsersController;
