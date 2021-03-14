const BaseModule = require('../base-module');
const ProductModel = require('../products/product.model');
const UserModel = require('../users/user.model');
const CartModel = require('./cart.model');

class Cart extends BaseModule {
  constructor() {
    super();
  }

  async __validateAndGetProduct(productId) {
    if(!this.validator.isValidMongoId(productId)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid product id.');
    }
    const product = await ProductModel.findOne({ _id: productId });
    if(!product) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Product not found.');
    }
    return product;
  }

  async __validateAddUpdateCartItem(req) {
    const { userId, productId, quantity } = req.body;
    if(!this.validator.isValidMongoId(userId)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid user id.');
    }
    if(!this.validator.isValidMongoId(productId)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid product id.');
    }
    if(!this.validator.isPositiveNonZeroInteger(quantity)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid quantity.');
    }
    const user = await UserModel.findOne({ _id: userId });
    if(!user) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'User not found.');
    }
    const product = await ProductModel.findOne({ _id: productId });
    if(!product) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Product not found.');
    }
    return product;
  }

  async addItemToCart(req) {
    const product = await this.__validateAddUpdateCartItem(req);
    const { userId, productId, quantity } = req.body;
    const userCart = await CartModel.findOne({ userId: userId });
    const productPrice = product.price;
    const cartItemTotal = this.utils.convertToMoney(product.price * quantity);
    const cartItem = { productId, productPrice, quantity, cartItemTotal };
    /** If there is a cart item found for the user then do the following */
    if(userCart) {
      /** If the item is already exists in the cart, then first remove the item and then add the item with the proper quantity */
      const foundCartItem = userCart.cartItems.find(item=>item.productId === productId);
      if(foundCartItem) {
        await this.__removeItemFromCart({ userId, cartItem: foundCartItem });
      }
      await CartModel.update({ userId }, {
        $inc: {
          totalProducts: quantity, totalAmount: cartItemTotal
        },
        $push: { cartItems: cartItem }
      });

    } else {
      const newCart = new CartModel({
        userId, totalProducts: quantity, totalAmount: cartItemTotal,
        cartItems: [cartItem]
      });
      await newCart.save();
    }
    return CartModel.findOne({ userId });
  }

  async __removeItemFromCart({ userId, cartItem: { quantity, cartItemTotal, productId } }) {
    await CartModel.update({ userId }, {
      $inc: {
        totalProducts: quantity * -1, totalAmount: cartItemTotal *  -1
      },
      $pull: { cartItems: {  productId } }
    });
  }

  async __deleteEmptyCart({ userId }) {
    const cart = await CartModel.findOne({ userId });
    if(cart.cartItems.length === 0) {
      await CartModel.findOneAndDelete({ userId });
      return {};
    }
    return cart;
  }

  async clearCart({ body: { userId } }) {
    if(!this.validator.isValidMongoId(userId)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid user id.');
    }
    await CartModel.findOneAndDelete({ userId });
  }

  async getUserCartDetails({ params: { userId } }) {
    if(!this.validator.isValidMongoId(userId)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid user id.');
    }
    let cartData = await CartModel.findOne({ userId }).populate('cartItems.productId').lean();
    if(cartData) {
      cartData.cartItems.forEach((item)=>{
        item.product = item.productId;
        item.productId = item.product._id;
      });
    } else {
      cartData = {
        userId, totalAmount: 0, totalProducts: 0, cartItems: []
      };
    }
    return cartData;
  }

  async __validateCartAndCartItemData({ body: { userId, productId } }) {
    if(!this.validator.isValidMongoId(userId)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid user id.');
    }
    if(!this.validator.isValidMongoId(productId)) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Please provide valid product id.');
    }
    const cart = await CartModel.findOne({ userId });
    if(!cart) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Cart is empty for this user.');
    }
    const cartItem = cart.cartItems.find((item)=>item.productId === productId);
    if(!cartItem) {
      throw new this.Exception(this.EXCEPTIONS.ValidationError, 'Cart item not found for this user.');
    }
    return { cartItem, userId, cart };
  }

  async removeCartItem(req) {
    const { cartItem, userId } = await this.__validateCartAndCartItemData(req);
    await this.__removeItemFromCart({ userId, cartItem });
    return await this.__deleteEmptyCart({ userId });
  }

  async updateItemQuantity(req) {
    const { userId, productId } = req.body;
    await this.__validateAddUpdateCartItem(req);
    const cart = await CartModel.findOne({ userId });
    if(!cart) {
      return this.addItemToCart(req);
    }
    const cartItem = cart.cartItems.find((item)=>item.productId === productId);
    if(!cartItem) {
      return this.addItemToCart(req);
    }
    const oldQuantity = cartItem.quantity;
    const newQuantity = req.body.quantity;
    const quantityDifference = newQuantity - oldQuantity;
    const priceDifference = quantityDifference * cartItem.productPrice;
    const updatedtotal = this.utils.convertToMoney(cart.totalAmount + priceDifference);
    const updatedItemTotal = this.utils.convertToMoney(cartItem.cartItemTotal + priceDifference);
    console.log(updatedItemTotal, updatedtotal);
    //There is no changes in the quantity so return as it is.
    if(quantityDifference === 0) {
      return cart;
    }
    await CartModel.update({
      userId,
      'cartItems.productId': cartItem.productId
    }, {
      $set: {
        totalAmount: updatedtotal,
        'cartItems.$.cartItemTotal': updatedItemTotal
      },
      $inc: {
        totalProducts: quantityDifference,
        'cartItems.$.quantity': quantityDifference
      },
    });
    return CartModel.findOne({ userId });
  }

}
module.exports = new Cart();
