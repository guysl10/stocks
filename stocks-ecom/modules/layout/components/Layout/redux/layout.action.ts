import LAYOUT_ACTIONS from './layout.action-types';

// eslint-disable-next-line import/prefer-default-export
export const updateLoginRegisterDialogState = (dialogState: boolean) => ({
  type: LAYOUT_ACTIONS.UPDATE_LOGIN_REGISTER_DIALOG_STATE,
  payload: dialogState,
});
