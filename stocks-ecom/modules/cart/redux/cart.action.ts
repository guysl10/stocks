import { Product } from '../../products/shared/product.type';
import { ICartItem } from '../shared/cart.type';
import CART_ACTIONS from './cart.action-types';

export const updateCartItemQuantity = (cartData: {quantity: number, product: Product}) => ({
  type: CART_ACTIONS.UPDATE_QUANTITY,
  payload: cartData,
});

export const updateCartItems = (cartItems: Array<ICartItem>) => ({
  type: CART_ACTIONS.UPDATE_CART_ITEMS,
  payload: cartItems,
});