const ProductModel = require('../products/product.model');
const BaseModule = require('../base-module');
const OrderModel = require('../orders/order.model');
const UserModel = require('../users/user.model');

class Dashboard extends BaseModule {
  constructor() {
    super();
  }

  async getCounts({ query: { startDate, endDate } }) {
    this.validateDateRange({ startDate, endDate });
    const query = { createdAt: { $gte: Number(startDate), $lte: Number(endDate) } };
    const totalOrders = await OrderModel.countDocuments(query);
    const totalOrderData = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: new Date(Number(startDate)), $lte: new Date(Number(endDate)) } } },
      { $group: { _id: 1, count: { $sum: '$totalAmount' } } }
    ]);
    let totalOrderAmount = totalOrderData && totalOrderData[0] ? totalOrderData[0].count : 0;
    totalOrderAmount = this.utils.convertToMoney(totalOrderAmount);
    const newProducts = await ProductModel.countDocuments(query);
    const newUsers = await UserModel.countDocuments(query);
    return { totalOrders, totalOrderAmount, newProducts, newUsers };
  }

  async getDailyOrderCounts({ query: { startDate, endDate, timezone } }) {
    if(!this.validator.isValidTimeZoneOffset(timezone)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide timezone offset.');
    }
    this.validateDateRange({ startDate, endDate });
    return await OrderModel.aggregate([
      { $match: { createdAt: { $gte: new Date(Number(startDate)), $lte: new Date(Number(endDate)) } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } },
      { $project: { '_id': 0, 'date': '$_id', count: 1 } }
    ]);
  }
}
module.exports = new Dashboard();
