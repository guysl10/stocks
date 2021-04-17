const BaseModel = require('../base-model');
const { productSizes, productColors } = require('./product-constants');
class Product extends BaseModel {
  constructor() {
    super();
    this.model = this.getSchema({
      schemaName: 'Product',
      params: {
        name: { type: String },
        isHomePageProduct: { type: Boolean, default: false },
        size: { type: String, enum: productSizes },
        color: { type: String, enum: productColors },
        price: { type: Number },
        imageUrl: { type: String },
        shortDescription: { type: String },
        longDescription: { type: String },
        ...this.defaultParams
      },
      options: { collection: 'products' }
    });
  }
}

module.exports = new Product().model;
