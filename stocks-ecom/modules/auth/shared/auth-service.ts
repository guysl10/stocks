import { clearCartAction, updateCartDetails } from '../../cart/redux/cart.action';
import { updateLoginRegisterDialogState } from '../../layout/components/Layout/redux/layout.action';
import API from '../../shared/API';
import { removeUserStorageData, setUserDataToStorage } from './auth-storage';

export const loginService = async (loginData, dispatch) => {
  try {
    const response = await API({
      url: '/v1/login',
      body: loginData,
      method: 'post',
      showAPIError: true,
    });
    dispatch(updateLoginRegisterDialogState(false));
	setUserDataToStorage(response, dispatch);
  } catch (e) {
  }
};

export const signUpService = async (signUpData, dispatch) => {
  try {
    await API({
      url: '/v1/register',
      method: 'post',
      body: signUpData,
      showAPIError: true,
    });
    await loginService({ email: signUpData.email, password: signUpData.password }, dispatch);
  } catch (e) {
  }
};

export const logoutService = async (dispatch) => {
  try {
    await API({
      url: '/v1/logout',
      hideErrorMessage: true,
    });
  } catch (e) {
  } finally {
  dispatch(clearCartAction());
	removeUserStorageData(dispatch);
  }
};

export const checkLogin = async (dispatch) => {
  try {
    const response = await API({
      url: '/v1/checkLogin',
      hideErrorMessage: true,
    });
    setUserDataToStorage(response, dispatch);
  } catch (e) {
    removeUserStorageData(dispatch);
  }
};