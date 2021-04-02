import API from '../../shared/API';

/* eslint-disable import/prefer-default-export */
export const getHomePageProducts = async () => API({
  url: '/v1/products/home-products',
  hideErrorMessage: true,
});