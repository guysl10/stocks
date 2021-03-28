import NOTIFICATION_ACTIONS from './notification.action-types';

export const showNotification = ({ message, type }) => ({
  type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION,
  payload: { message, type },
});

export const removeAllNotifications = () => ({
  type: NOTIFICATION_ACTIONS.REMOVE_ALL_NOTIFICATIONS,
  payload: {},
});
