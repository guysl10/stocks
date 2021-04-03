import STORAGE_KEYS from '../../shared/storage/storageKeys';
import { removeUserData, setUserData } from '../redux/auth.action';
import localStorage from '../../shared/storage/LocalStorage';
import { updateCartDetails } from '../../cart/redux/cart.action';

export const setUserDataToStorage = (response, dispatch) => {
  const userData = { email: response.email, userId: response._id };
  localStorage.setJSONItem(STORAGE_KEYS.USER_KEY, userData);
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
  if (response.userCart) {
    dispatch(updateCartDetails(response.userCart));
  }
  dispatch(setUserData(userData));
};

export const removeUserStorageData = (dispatch) => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_KEY);
  dispatch(removeUserData());
};