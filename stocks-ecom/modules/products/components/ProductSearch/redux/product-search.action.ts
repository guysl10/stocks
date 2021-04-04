import PRODUCT_SEARCH_ACTIONS from './product-search.action-types';

export const updateProductFilter = (updatedFilter: any) => {
    console.trace('update is called');
    return ({
        type: PRODUCT_SEARCH_ACTIONS.UPDATE_FILTER,
        payload: updatedFilter,
    });
};

export const clearProductFilter = ({ fromPrice, toPrice }) => ({
    type: PRODUCT_SEARCH_ACTIONS.CLEAR_FILTER,
    payload: { fromPrice, toPrice },
});

export const updateSearchResponseParams = (updatedParams) => ({
    type: PRODUCT_SEARCH_ACTIONS.UPDATE_SEARCH_RESPONSE_PARAMS,
    payload: updatedParams,
});
