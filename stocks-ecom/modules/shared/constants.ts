import axios from 'axios';
import { isEmpty, get } from 'lodash';
import { API_END_POINT, API_STATUSES, SERVER_API_HOST } from './constants';
import { message } from './utils';
import appCache from './storage/cache';
import { getStore } from '../../redux/store';

const { dispatch } = getStore();
const byPassAuthAPIs = ['/authenticate'];

const API_CACHE_PREFIX = 'API_CACHE';
const getKeyFromPath = ({ path, queryParams }) => `${API_CACHE_PREFIX}_${path}_${JSON.stringify(queryParams)}`;

const getAPICacheData = ({ path, queryParams }) => {
  const cachedData = appCache.getJSONItem(getKeyFromPath({ path, queryParams }));
  return isEmpty(cachedData) ? null : cachedData;
};

const setAPIDataToCache = ({ path, queryParams, data }) => {
  appCache.setJSONItem({
    key: getKeyFromPath({ path, queryParams }),
    value: data,
  });
};

const handle401Error = async ({ exception }) => {
  // try {
  // eslint-disable-next-line no-use-before-define
  // const {userInfo, accessToken, refreshToken} = await callAPI({
  //   method: 'put',
  //   url: '/refreshToken',
  //   hideErrorMessage: true,
  //   showLoading: true,
  //   headers: {refreshtoken: `Bearer ${getItem(REFRESH_TOKEN)}`}
  // });
  // setUserData({userInfo, accessToken, refreshToken, dispatch: getStore().dispatch});
  // eslint-disable-next-line no-use-before-define
  // return await callAPI(apiData);
  throw exception;
  // } catch (error) {
  //   // getStore().dispatch(logout());
  //   throw error;
  // }
};

const handleAPIError = async ({
                                exception, url, apiData, hideErrorMessage,
// eslint-disable-next-line consistent-return
                              }) => {
  const { throwException = true, errorMessage, showAPIError } = apiData;
  if (exception.response && (exception.response.status === 401 || exception.response.status === 403)
    && url !== '/checkLogin' && url !== '/employee' && url !== '/authenticate' && url !== '/refreshToken') {
    try {
      return await handle401Error({ exception });
    } catch (e) {
      message.error(exception.message || 'Something went wrong.');
      if (throwException) {
        throw exception;
        // throw new HttpError(exception.message, exception.status, exception.json);
      }
    }
  } else {
    if (!hideErrorMessage) {
      let errMessage = errorMessage;
      if (showAPIError) {
        errMessage = get(exception, 'response.data.message');
      }
      message.error(errMessage || exception.message || 'Something went wrong.');
    }
    if (throwException) {
      throw exception;
      // throw new HttpError(exception.message, exception.status, exception.json);
    }
  }
};

export interface IAPIOptions {
  url: string,
  method?: string,
  queryParams?: object,
  formData?: object,
  body?: any,
  cache?: boolean,
  headers?: any,
  successMessage?: string,
  fromServer?: boolean,
  hideErrorMessage?: boolean,
  errorMessage?: string
}

const API = async (apiData: IAPIOptions): Promise<any> => {
  const {
    url,
    method,
    queryParams = {},
    formData,
    body,
    cache,
    headers = {},
    successMessage,
    fromServer,
    hideErrorMessage,
  } = apiData;
  try {
    let apiUrl = `/${url}`.replace(/\/\//g, '/');
    let response;
    // const accessToken = getItem(ACCESS_TOKEN);
    const accessToken = '';
    let requestHeaders = headers;
    if (byPassAuthAPIs.indexOf(url) === -1) {
      requestHeaders = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json, text/plain',
      };
    }
    if (fromServer) {
      apiUrl = `${SERVER_API_HOST}${API_END_POINT}${apiUrl}`;
    } else {
      // DO append the API end point only if the url is not the service url
      apiUrl = `${API_END_POINT}${apiUrl}`;
    }
    console.log(apiUrl);
    if (cache && getAPICacheData({ path: apiUrl, queryParams })) {
      response = getAPICacheData({ path: apiUrl, queryParams });
    } else {
      response = await axios.request({
        method: method || 'GET',
        url: apiUrl,
        data: formData || body,
        params: queryParams,
        headers: requestHeaders,
      });
      if (cache) {
        setAPIDataToCache({ path: apiUrl, queryParams, data: response });
      }
    }
    if (successMessage) {
      message.success(successMessage);
    }
    return response.data.data;
  } catch (exception) {
    // eslint-disable-next-line no-return-await
    return await handleAPIError({
      exception, url, apiData, hideErrorMessage,
    });
  }
};

API.get = (url, options) => API({ url, method: 'get', ...options });
API.put = (url, body, options) => API({
  url, body, method: 'put', ...options,
});
API.patch = (url, body, options) => API({
  url, body, method: 'patch', ...options,
});
API.post = (url, body, options) => API({
  url, body, method: 'post', ...options,
});
API.delete = (url, body, options) => API({
  url, body, method: 'delete', ...options,
});

export const dispatchAPILoading = ({ actionType }) => {
  dispatch({
    type: actionType,
    payload: { status: API_STATUSES.LOADING, data: null },
  });
};

export const dispatchAPIError = ({ actionType }) => {
  dispatch({
    type: actionType,
    payload: { status: API_STATUSES.ERROR, data: null },
  });
};

export const dispatchAPISuccess = ({ actionType, apiResponse }) => {
  dispatch({
    type: actionType,
    payload: { status: API_STATUSES.SUCCESS, data: apiResponse },
  });
};

export const callAPIWithRedux = async ({
                                         actionType, apiData, handleError, processResponse,
// eslint-disable-next-line consistent-return
                                       }) => {
  try {
    dispatchAPILoading({ actionType });
    let apiResponse = await API(apiData);
    apiResponse = processResponse ? processResponse(apiResponse) : apiResponse;
    dispatchAPISuccess({ actionType, apiResponse });
    return apiResponse;
  } catch (e) {
    dispatchAPIError({ actionType });
    if (!handleError) {
      throw e;
    }
  }
};

export default API;
