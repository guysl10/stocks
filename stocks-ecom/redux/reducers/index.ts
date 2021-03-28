import { combineReducers } from 'redux';
import notificationReducer from '../../modules/shared/components/Notification/redux/notification.reducer';
import layoutReducer from '../../modules/layout/components/Layout/redux/layout.reducer';
import authReducer from '../../modules/auth/redux/auth.reducer';

export default combineReducers({
  notificationState: notificationReducer,
  layoutState: layoutReducer,
  authState: authReducer,
});