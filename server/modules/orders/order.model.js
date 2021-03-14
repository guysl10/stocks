const BaseModel = require('../base-model');

class Order extends BaseModel {
  constructor() {
    super();
    const orderItemSchema = new global.Mongoose.Schema({
      productId: { type: String, ref: 'Product' },
      productPrice: { type: Number },
      quantity: { type: Number },
      orderItemTotal: { type: Number },
    });
    this.model = this.getSchema({
      schemaName: 'Order',
      params: {
        orderId: { type: Number },
        userId: { type: String, ref: 'User' },
        totalAmount: { type: Number },
        totalCarts: { type: Number },
        orderItems: [{ type: orderItemSchema }],
        ...this.defaultParams
      },
      options: { collection: 'orders' }
    });
  }
}

module.exports = new Order().model;