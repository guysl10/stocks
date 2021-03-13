const BaseController = require('../base-controller');
const cart = require('./cart');

class CartsController extends BaseController {
  constructor(app) {
    super();
    this.router.post('/add-item', this.apiHandler(cart.addItemToCart.bind(cart)));
    this.router.delete('/remove-item', this.apiHandler(cart.removeCartItem.bind(cart)));
    this.router.put('/update-item-quantity', this.apiHandler(cart.updateItemQuantity.bind(cart)));
    this.router.delete('/clear-cart', this.apiHandler(cart.clearCart.bind(cart)));
    this.router.get('/:userId', this.apiHandler(cart.getUserCartDetails.bind(cart)));
    app.use('/api/v1/carts', this.router);
  }
}

module.exports = CartsController;
