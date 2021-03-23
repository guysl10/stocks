import AUTH_ACTIONS from './auth.action-types';

export const setUserData = (userData) => ({
  type: AUTH_ACTIONS.SET_USER_DETAILS,
  payload: userData,
});

export const removeUserData = () => ({ type: AUTH_ACTIONS.REMOVE_USER_DETAILS });
