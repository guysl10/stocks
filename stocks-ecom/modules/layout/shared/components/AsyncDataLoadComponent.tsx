import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
import React, { useEffect, useState } from 'react';
import API, { IAPIOptions } from '../API';
import { API_STATUSES } from '../constants';
import Loader from './Loader';
import Error from './Error';

interface IAsyncDataLoadComponentProps {
  children: React.ReactNode,
  onError?: (e: any)=>void,
  showSkeleton?: boolean,
  loadingView?: React.ReactNode,
  errorView?: React.ReactNode,
  asyncService?: ()=>Promise<any>,
  triggerChange?: string,
  apiConfig?: IAPIOptions
}

function AsyncDataLoadComponent({
                                  children,
                                  onError,
                                  showSkeleton,
                                  loadingView,
                                  errorView,
                                  asyncService,
                                  triggerChange,
                                  apiConfig,
                                }: IAsyncDataLoadComponentProps) {
  const [apiState, setApiState] = useState({ status: 'loading', data: {} });

  const getAPIData = async () => {
    try {
      setApiState({ status: API_STATUSES.LOADING, data: {} });
      let data;
      if (asyncService) {
        data = await asyncService();
      } else {
        data = await API({ hideErrorMessage: true, ...apiConfig });
      }
      setApiState({ status: API_STATUSES.SUCCESS, data });
    } catch (e) {
      console.error(e);
      setApiState({ status: API_STATUSES.ERROR, data: {} });
      if (onError) {
        onError(e);
      }
    }
  };

  useEffect(() => {
    if (apiConfig || asyncService) {
      (() => getAPIData())();
    }
  }, [apiConfig, triggerChange]);

  return (
    <>
      {apiState.status === API_STATUSES.LOADING
        ? loadingView || (showSkeleton ? <Skeleton /> : <Loader />)
        : null}
      {/* eslint-disable-next-line no-nested-ternary */}
      {apiState.status === API_STATUSES.SUCCESS
        ? (typeof children === 'function' ? children(apiState.data) : { children })
        : null}
      {apiState.status === API_STATUSES.ERROR
        ? errorView || <Error />
        : null}
    </>
  );
}

AsyncDataLoadComponent.defaultProps = {
  onError: undefined, showSkeleton: false, loadingView: null, errorView: null, asyncService: undefined, triggerChange: '', apiConfig: null,
};

export default AsyncDataLoadComponent;
