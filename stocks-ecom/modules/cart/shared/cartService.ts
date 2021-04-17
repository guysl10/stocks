import API from '../../shared/API';
import localStorage from '../../shared/storage/LocalStorage';
import STORAGE_KEYS from '../../shared/storage/storageKeys';
import { clearCartAction, updateCartDetails } from '../redux/cart.action';


export const removeCartItemService = async ({ productId }) => {
  const { userId } = localStorage.getJSONItem(STORAGE_KEYS.USER_KEY);
  await API({
    url: '/v1/carts/remove-item',
    method: 'delete',
    errorMessage: 'Error in updating cart details',
    showAPIError: true,
    body: { productId, userId },
  });
};

export const updateCartItemQuantityService = async ({ productId, quantity }) => {
  const { userId } = localStorage.getJSONItem(STORAGE_KEYS.USER_KEY);
  if (quantity) {
    await API({
      url: '/v1/carts/update-item-quantity',
      method: 'put',
      errorMessage: 'Error in updating cart details',
      showAPIError: true,
      body: { productId, quantity, userId },
    });
  } else {
    removeCartItemService({ productId });
  }
};

export const getCartDetailService = async (dispatch) => {
  const { userId } = localStorage.getJSONItem(STORAGE_KEYS.USER_KEY);
  // eslint-disable-next-line no-return-await
  const cartDetails = await API({ url: `/v1/carts/${userId}`, hideErrorMessage: true });
  dispatch(updateCartDetails(cartDetails));
};

export const clearCartService = async (dispatch) => {
  const { userId } = localStorage.getJSONItem(STORAGE_KEYS.USER_KEY);
  // eslint-disable-next-line no-return-await
  await API({ url: '/v1/carts/clear-cart', method: 'delete', body: { userId } });
  dispatch(clearCartAction());
};

export const createOrderFromCartService = async (dispatch) => {
  const { userId } = localStorage.getJSONItem(STORAGE_KEYS.USER_KEY);
  // eslint-disable-next-line no-return-await
  await API({ url: '/v1/orders', method: 'post', body: { userId } });
  dispatch(clearCartAction());
};