import API from '../../shared/API';

// eslint-disable-next-line import/prefer-default-export
export const productSearchService = async (queryParams) => {
  const updatedQueryString = {};
  Object.keys(queryParams).forEach((key) => {
    updatedQueryString[key] = queryParams[key] ? queryParams[key].toString() : '';
  });
  /* eslint-disable no-return-await */
  return await API({
    url: '/v1/products/search',
    errorMessage: 'Error in getting the product search result.',
    queryParams: updatedQueryString,
  });
};
