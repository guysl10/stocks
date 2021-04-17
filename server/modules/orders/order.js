const OrderModel = require('./order.model');
const BaseModule = require('../base-module');
const CartModel = require('../carts/cart.model');

class Order extends BaseModule {
  constructor() {
    super();
  }

  async __validateOrderData({body: {userId}}) {
    const cart = await CartModel.findOne({userId}).lean();
    if (!cart) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Cart is empty for the user.');
    }
    delete cart._id;
    return cart;
  }

  async createOrder(req) {
    const cart = await this.__validateOrderData(req);
    const lastOrderData = await OrderModel.aggregate(
      [{$group: {_id: '', orderId: {$max: '$orderId'}}}]
    );
    const lastOrderId = ((lastOrderData && lastOrderData[0]) || {orderId: 0}).orderId;
    const order = new OrderModel({
      orderId: (lastOrderId + 1), ...cart,
      orderItems: cart.cartItems, ...this.getDefaultCreateFields(req)
    });
    await CartModel.find({userId: cart.userId}).remove().exec();
    await order.save();
    return order;
  }

  async __getOrder(req) {
    const order = await OrderModel.findOne({_id: req.params.orderId}).populate('orderItems.productId');
    if (!order) {
      throw new this.Exception(this.EXCEPTIONS.ObjectNotFound, 'Order not found.');
    }
    return order;
  }

  async getOrder(req) {
    return await this.__getOrder(req);
  }

  async deleteOrder(req) {
    await this.__getOrder(req);
    await OrderModel.remove({_id: req.params.orderId});
  }


  async getOrdersByQuery(query) {
    const orders = await OrderModel.find(query).populate('orderItems.productId');
    return orders
  }

  async getOrderList({query}) {
    const searchQuery = {};
    if (query.orderId) {
      searchQuery.orderId = query.orderId;
    }
    if (query.totalAmount) {
      searchQuery.totalAmount = query.totalAmount;
    }
    const orderData = await this.getRecordList({query, searchQuery, dbModel: OrderModel});
    orderData.records.forEach((record, index) => {
      orderData.records[index] = {...record, user: record.userId, userId: record.userId._id};
      orderData.records[index].orderItems.forEach((item, itemIndex) => {
        orderData.records[index].orderItems[itemIndex] = {
          ...item,
          product: item.productId,
          productId: item.productId._id
        };
      });
    });
    return orderData;
  }
}

module.exports = new Order();
