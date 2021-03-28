import { updateLoginRegisterDialogState } from '../../layout/components/Layout/redux/layout.action';
import API from '../../shared/API';
import { removeUserData, setUserData } from '../redux/auth.action';
import localStorage from '../../shared/storage/LocalStorage';
import STORAGE_KEYS from '../../shared/storage/storageKeys';

export const loginService = async (loginData, dispatch) => {
  try {
    const response = await API({
      url: '/v1/login',
      body: loginData,
      method: 'post',
      showAPIError: true,
      errorMessage: 'Error in user login.',
    });
    const userData = { email: response.email };
    dispatch(setUserData(userData));
    dispatch(updateLoginRegisterDialogState(false));
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
    localStorage.setJSONItem(STORAGE_KEYS.USER_KEY, userData);
  } catch (e) {
    // console.error('Error in login', e);
  }
};

export const signUpService = async (signUpData, dispatch) => {
  try {
    await API({
      url: '/v1/register',
      method: 'post',
      body: signUpData,
      showAPIError: true,
      errorMessage: 'Error in sign up.',
    });
    await loginService({ email: signUpData.email, password: signUpData.password }, dispatch);
  } catch (e) {
    // console.error('error in sign up', e);
  }
};

export const logoutService = async (dispatch) => {
  try {
    await API({
      url: '/v1/logout',
      hideErrorMessage: true,
    });
  } catch (e) {
    console.error('Error in logout', e);
  } finally {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_KEY);
    dispatch(removeUserData());
  }
};