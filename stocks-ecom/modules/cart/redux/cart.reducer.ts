import { remove, find, cloneDeep } from 'lodash';
import { toFixedNumber } from '../../shared/utils';
import { ICartItem } from '../shared/cart.type';
import CART_ACTIONS from './cart.action-types';

const initialState = {
  cartItems: [],
};

export default function cartReducer(state = initialState, action) {
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
      return { ...state, cartItems: newCartItems };
    }
    case CART_ACTIONS.UPDATE_CART_ITEMS: {
      return { ...state, cartItems: action.payload };
    }
    default:
      return state;
  }
}