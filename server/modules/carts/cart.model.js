const BaseModel = require('../base-model');
class Cart extends BaseModel {
  constructor() {
    super();
    const cartItemSchema = new global.Mongoose.Schema({
      productId: { type: String, ref: 'Product' },
      productPrice: { type: Number },
      quantity: { type: Number },
      cartItemTotal: { type: Number },
    });
    this.model = this.getSchema({
      schemaName: 'Cart',
      params: {
        userId: { type: String },
        totalAmount: { type: Number },
        totalProducts: { type: Number },
        cartItems: [{ type: cartItemSchema }],
        ...this.defaultParams
      },
      options: { collection: 'carts' }
    });
  }
}

module.exports = new Cart().model;
