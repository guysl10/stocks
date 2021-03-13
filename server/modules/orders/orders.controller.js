const BaseController = require('../base-controller');
const order = require('./order');

class OrdersController extends BaseController {
  constructor(app) {
    super();
    this.router.post('', this.apiHandler(order.createOrder.bind(order)));
    this.router.get('', this.apiHandler(order.getOrderList.bind(order)));
    this.router.delete('/:orderId', this.apiHandler(order.deleteOrder.bind(order)));
    this.router.get('/:orderId', this.apiHandler(order.getOrder.bind(order)));
    app.use('/api/v1/orders', this.router);
  }
}

module.exports = OrdersController;