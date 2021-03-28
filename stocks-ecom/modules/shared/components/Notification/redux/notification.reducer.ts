import NOTIFICATION_ACTIONS from './notification.action-types';

const initialState = {
  notification: {},
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.SHOW_NOTIFICATION: {
      return { ...state, notification: action.payload };
    }
    case NOTIFICATION_ACTIONS.REMOVE_ALL_NOTIFICATIONS: {
      return { ...state, notification: [] };
    }
    default:
      return state;
  }
}
