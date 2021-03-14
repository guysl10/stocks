const BaseController = require('../base-controller');
const product = require('./product');

class ProductsController extends BaseController {
  constructor(app) {
    super();
    this.router.post('', this.apiHandler(product.createProduct.bind(product), { role: this.userRoles.ADMIN }));
    this.router.get('', this.apiHandler(product.getProductList.bind(product), { role: this.userRoles.ADMIN }));
    this.router.get('/home-products', this.apiHandler(product.getHomeProducts.bind(product)));
    this.router.get('/search', this.apiHandler(product.searchProducts.bind(product)));
    this.router.get('/:productId', this.apiHandler(product.getProduct.bind(product), { role: this.userRoles.ADMIN }));
    this.router.put('/:productId', this.apiHandler(product.editProduct.bind(product), { role: this.userRoles.ADMIN }));
    this.router.delete('/:productId', this.apiHandler(product.deleteProduct.bind(product), { role: this.userRoles.ADMIN }));
    app.use('/api/v1/products', this.router);
  }
}

module.exports = ProductsController;
