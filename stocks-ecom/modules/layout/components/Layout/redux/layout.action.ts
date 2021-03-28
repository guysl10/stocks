import LAYOUT_ACTIONS from './layout.action-types';

// eslint-disable-next-line import/prefer-default-export
export const updateFeedbackDialogState = (dialogState: boolean) => ({
  type: LAYOUT_ACTIONS.UPDATE_FEEDBACK_DIALOG_STATE,
  payload: dialogState,
});
