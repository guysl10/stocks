import { remove, find, cloneDeep } from 'lodash';
import { toFixedNumber } from '../../shared/utils';
import { ICartItem } from '../shared/cart.type';
import CART_ACTIONS from './cart.action-types';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalProducts: 0,
};

const getTotalItemsAndPrice = (cartItems) => {
  let totalAmount = 0;
  let totalProducts = 0;
  cartItems.forEach((item) => {
    totalProducts += item.quantity;
    totalAmount += item.cartItemTotal;
  });
  return { totalAmount, totalProducts };
};

export default function cartReducer(state = cloneDeep(initialState), action) {
  switch (action.type) {
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { quantity, product } = action.payload;
      const newCartItems: Array<ICartItem> = cloneDeep(state.cartItems);
      if (quantity === 0) {
        remove(newCartItems, { productId: product._id });
      } else {
        const existedCartItem = find(newCartItems, { productId: product._id });
        if (!existedCartItem) {
          newCartItems.push({
            quantity,
            productId: product._id,
            productPrice: product.price,
            cartItemTotal: toFixedNumber(product.price * quantity),
            product,
          });
        } else {
          existedCartItem.quantity = quantity;
          existedCartItem.cartItemTotal = toFixedNumber(product.price * quantity);
        }
      }
      
      return { ...state, ...getTotalItemsAndPrice(newCartItems), cartItems: newCartItems };
    }
    case CART_ACTIONS.UPDATE_CART_DETAILS: {
      const cartDetails = action.payload;
      return {
        ...state,
        cartItems: cartDetails.cartItems,
        totalAmount: cartDetails.totalAmount,
        totalProducts: cartDetails.totalProducts,
      };
    }
    case CART_ACTIONS.CLEAR_CART: {
      return cloneDeep(initialState);
    }
    default:
      return state;
  }
}