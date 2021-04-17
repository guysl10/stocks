import { combineReducers } from 'redux';
import notificationReducer from '../../modules/shared/components/Notification/redux/notification.reducer';
import layoutReducer from '../../modules/layout/components/Layout/redux/layout.reducer';
import authReducer from '../../modules/auth/redux/auth.reducer';
import cartReducer from '../../modules/cart/redux/cart.reducer';
import productSearchReducer from '../../modules/products/components/ProductSearch/redux/product-search.reducer';

export default combineReducers({
  notificationState: notificationReducer,
  layoutState: layoutReducer,
  productSearchState: productSearchReducer,
  authState: authReducer,
  cartState: cartReducer,
});
