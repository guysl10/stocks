mport { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

let localStoreVar = null;

export const configureStore = () => {
  localStoreVar = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  return localStoreVar;
};

export const getStore = () => {
  if (localStoreVar === null) {
    return configureStore();
  }
  return localStoreVar;
};