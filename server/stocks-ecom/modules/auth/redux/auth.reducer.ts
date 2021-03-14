import LAYOUT_ACTIONS from './auth.action-types';

const initialState = {
  isUserLoggedIn: false,
  userDetails: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LAYOUT_ACTIONS.SET_USER_DETAILS: {
      return { ...state, userDetails: action.payload, isUserLoggedIn: true };
    }
    case LAYOUT_ACTIONS.REMOVE_USER_DETAILS: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
