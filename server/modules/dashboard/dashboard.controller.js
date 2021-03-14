const BaseController = require('../base-controller');
const dashboard = require('./dashboard');

class DashboardsController extends BaseController {
  constructor(app) {
    super();
    this.router.get('/get-counts', this.apiHandler(dashboard.getCounts.bind(dashboard), { role: this.userRoles.ADMIN }));
    this.router.get('/get-daily-order-counts', this.apiHandler(dashboard.getDailyOrderCounts.bind(dashboard), { role: this.userRoles.ADMIN }));
    app.use('/api/v1/dashboard', this.router);
  }
}

module.exports = DashboardsController;
