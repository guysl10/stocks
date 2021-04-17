import API from '../../shared/API';

/* eslint-disable import/prefer-default-export */
export const getHomePageProducts = async (query) => API({
  url: '/v1/products/home-products',
  queryParams: { ...query },
  hideErrorMessage: true,
});