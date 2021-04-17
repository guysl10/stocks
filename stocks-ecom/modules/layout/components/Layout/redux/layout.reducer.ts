import LAYOUT_ACTIONS from './layout.action-types';

const initialState = {
  loginRegisterState: false,
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case LAYOUT_ACTIONS.UPDATE_LOGIN_REGISTER_DIALOG_STATE: {
      return { ...state, loginRegisterDialogState: action.payload };
    }
    default:
      return state;
  }
}
