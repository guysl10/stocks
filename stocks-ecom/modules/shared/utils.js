import { template } from 'lodash';
import { showNotification } from './components/Notification/redux/notification.action';
import { NOTIFICATION_TYPES } from './constants';

let store = null;

export const setUtilStore = (storeArg) => { store = storeArg; };

export const showMessage = ({ type, message }) => {
  if (store && store.dispatch) {
    store.dispatch(showNotification({ type, message }));
  }
};

export const message = {
  error: (msg, props) => showMessage({
    type: NOTIFICATION_TYPES.ERROR,
    message: msg,
    ...{ ...props, duration: 10000 },
  }),
  success: (msg, props) => showMessage({
    type: NOTIFICATION_TYPES.SUCCESS,
    message: msg,
    ...props,
  }),
  warn: (msg, props) => showMessage({
    type: NOTIFICATION_TYPES.WARNING,
    message: msg,
    ...props,
  }),
  info: (msg, props) => showMessage({ type: NOTIFICATION_TYPES.INFO, message: msg, ...props }),
};

export const getRandomString = (length = 16) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const toCapitalCase = (string) => {
  if (!string) {
    return string;
  }
  return string[0].toUpperCase() + string.slice(1);
};

export const sleep = (timeout = 3000) => new Promise((resolve) => {
  setTimeout(() => resolve(), timeout);
});

export const toFixed = (floatValue) => {
  if (!isNaN(parseFloat(floatValue))) {
    const roundedString = parseFloat(floatValue).toFixed(2);
    return Number(roundedString);
  }
  return 0;
};

export const scrollTop = () => {
  window.document.body.scrollTop = 0; // For Safari
  window.document.documentElement.scrollTop = 0; // For
};

export const toFixedString = (floatValue) => {
  if (!isNaN(parseFloat(floatValue))) {
    return floatValue.toFixed(2);
  }
  return '0.00';
};

export const toFixedNumber = (number) => Number(Number(number).toFixed(2));

export const parseNumber = (numberValue) => {
  const parsedNumber = Number(numberValue);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

export const getFullAddress = ({
                                 address1, address2, city, state, zip, country,
                               }) => `${address1 ? `${address1}` : ''}${address2 ? `, ${address2}` : ''}${city ? `, ${city}` : ''}${state ? `, ${state}` : ''}${zip ? `, ${zip}` : ''}${country ? `, ${country}` : ''}`;

const updatedAlias = (name) => String(name || '')
  .replace(/[^a-zA-Z0-9-]+/g, '-')
  .replace(/-+/g, '-')
  .replace(/-+$/g, '');

export const updateAlias = ({
                              newValue, oldValue, form, fieldName,
                            }) => {
  const oldUrlAliasValue = form.getFieldValue(fieldName);
  const oldUrlAliasFromProduct = updatedAlias(oldValue);
  if (!newValue && !oldValue) {
    return;
  }
  if (oldUrlAliasValue === oldUrlAliasFromProduct || !oldUrlAliasValue) {
    form.setFields([{ name: fieldName, value: updatedAlias(newValue) }]);
    form.validateFields([fieldName]);
  }
  if (!newValue && oldValue) {
    form.setFields([{ name: fieldName, value: '' }]);
    form.validateFields([fieldName]);
  }
};

export const getLabelValue = ({ labelKey, option }) => {
  try {
    if (typeof labelKey === 'function') {
      return labelKey(option);
    }
    return labelKey.indexOf('${') > -1 ? template(labelKey)(option) : option[labelKey];
  } catch (e) {
    return '';
  }
};

export const isFalsyValueWithoutZero = (value) => !value && value !== 0;

export const renderMoney = (value) => {
  let returnValue = '$0.00';
  try {
    if (value) {
      returnValue = value < 0 ? `-$${Math.abs(value)}` : `$${value.toFixed(2)}`;
    }
  } catch (e) {}
  return returnValue;
};

export const forEachAsyncParallel = async (data, iteratee, limit = 20) => {
  const collection = [...data];
  const { length } = collection;
  let output = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length / limit; i++) {
    // eslint-disable-next-line no-underscore-dangle,no-await-in-loop
    output = [...output,
      // eslint-disable-next-line no-await-in-loop
      ...await Promise.all(__getForEachItretee(collection.splice(0, limit), iteratee))];
  }
  return output;
};

export const noop = () => {};

// eslint-disable-next-line no-underscore-dangle
const __getForEachItretee = (collection, iteratee) => {
  const collectionFunctions = [];
  for (let i = 0; i < collection.length; i += 1) {
    collectionFunctions.push(iteratee.call(this, collection[i]));
  }
  return collectionFunctions;
};

export const isNullUndefined = (value) => value === undefined || value === null;

export const downloadFile = (fileURL, fileName = null) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', fileURL, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(this.response);
    const tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
};

export const stringExistsInArray = ({ array, string, ignoreCase = false }) => {
  let returnValue = false;
  array.forEach((item) => {
    if (ignoreCase) {
      if (item.toLowerCase() === string.toLowerCase()) {
        returnValue = true;
      }
    } else if (item === string) {
      returnValue = true;
    }
  });
  return returnValue;
};

export const isMobileOrTablet = () => {
  try {
    return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
};

export const isSameObjectValue = ({ obj1, obj2 }) => JSON.stringify(obj1) === JSON.stringify(obj2);
