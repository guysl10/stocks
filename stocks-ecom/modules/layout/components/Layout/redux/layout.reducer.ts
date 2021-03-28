import LAYOUT_ACTIONS from './layout.action-types';

const initialState = {
  feedbackOpenState: false,
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case LAYOUT_ACTIONS.UPDATE_FEEDBACK_DIALOG_STATE: {
      return { ...state, feedbackOpenState: action.payload };
    }
    default:
      return state;
  }
}
