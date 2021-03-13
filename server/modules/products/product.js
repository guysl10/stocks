const ProductModel = require('./product.model');
const BaseModule = require('../base-module');
const { productSizes, productColors } = require('./product-constants');

class Product extends BaseModule {
  constructor() {
    super();
  }

  async __validateProductData(req) {
    const { name, color, size, price, imageUrl, sortDescription, longDescription } = req.body;
    if (!this.validator.isString(name)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid name.');
    }
    if (!productColors.includes(color)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid color.');
    }
    if (!productSizes.includes(size)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid size.');
    }
    if (!this.validator.isUrl(imageUrl)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid image url.');
    }
    if (!this.validator.isPositiveNonZeroFloat(price)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid price value.');
    }
    if (!this.validator.isString(sortDescription)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid sort description.');
    }
    if (!this.validator.isString(longDescription)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid long description.');
    }
  }

  async createProduct(req) {
    await this.__validateProductData(req);
    const product = new ProductModel({ ...req.body, ...this.getDefaultCreateFields(req) });
    await product.save();
    return product;
  }

  async __getProduct(req) {
    const product = await ProductModel.findOne({ _id: req.params.productId });
    if(!product) {
      throw new this.Exception(this.EXCEPTIONS.ObjectNotFound, 'Product not found.');
    }
    return product;
  }

  async getProduct(req) {
    return await this.__getProduct(req);
  }

  async getProducts(req) {
    return await ProductModel.findOne({ _id: req.params.productId });
  }

  async editProduct(req) {
    await this.__getProduct(req);
    await this.__validateProductData(req);
    await ProductModel.update({ _id: req.params.productId }, { ...req.body, ...this.getDefaultUpdateFields(req) });
  }

  async deleteProduct(req) {
    await this.__getProduct(req);
    await ProductModel.remove({ _id: req.params.productId });
  }

  async getProductList({ query }) {
    const searchQuery = {};
    if(query.color) {
      searchQuery.color = query.color;
    }
    if(query.size) {
      searchQuery.size = query.size;
    }
    if(query.price) {
      searchQuery.price = query.price;
    }
    if(query.name) {
      searchQuery.name = new RegExp(query.name, 'i');
    }
    return await this.getRecordList({ query, searchQuery, dbModel: ProductModel });
  }

  async getHomeProducts({ query }) {
    return await this.getRecordList({ query, searchQuery: { isHomePageProduct: true }, dbModel: ProductModel });
  }

  async getUpperLowerPriceLimitForSearchQuery({ searchQuery }) {
    const upperPriceLimitRecord = (await ProductModel.find(searchQuery).sort({ price: -1 }).limit(1))[0];
    const lowerPriceLimitRecord = (await ProductModel.find(searchQuery).sort({ price: 1 }).limit(1))[0];
    const upperPriceLimit = upperPriceLimitRecord ? upperPriceLimitRecord.price : 0;
    const lowerPriceLimit = lowerPriceLimitRecord ? lowerPriceLimitRecord.price : 0;
    return { upperPriceLimit, lowerPriceLimit };
  }

  async searchProducts({ query }) {
    const { q, color, size, fromPrice, toPrice } = query;
    const searchQuery = {};
    if(q) {
      searchQuery.name = new RegExp(q, 'i');
    }
    if(color) {
      searchQuery.color = { $in: color.split(',') };
    }
    if(size) {
      searchQuery.size = { $in: size.split(',') };
    }
    if(fromPrice && toPrice) {
      searchQuery.price = { $gte: fromPrice, $lte: toPrice };
    }
    const response = await this.getRecordList({ query, searchQuery, dbModel: ProductModel });
    const { upperPriceLimit, lowerPriceLimit } = await this.getUpperLowerPriceLimitForSearchQuery({ searchQuery });
    return { ...response, upperPriceLimit, lowerPriceLimit };
  }
}
module.exports = new Product();
