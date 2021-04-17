import { cloneDeep } from 'lodash';
import PRODUCT_SEARCH_ACTIONS from './product-search.action-types';

const initialState = {
    productSearchFilter: {
        color: [],
        size: [],
        fromPrice: 0,
        toPrice: 0,
        q: '',
    },
    searchResponseParams: {
        upperPriceLimit: 0,
        lowerPriceLimit: 0,
        totalSearchResults: 0,
    },
};

export default function productSearchReducer(state = cloneDeep(initialState), action) {
    switch (action.type) {
        case PRODUCT_SEARCH_ACTIONS.UPDATE_FILTER: {
            return { ...state, productSearchFilter: { ...state.productSearchFilter, ...action.payload } };
        }
        case PRODUCT_SEARCH_ACTIONS.CLEAR_FILTER: {
            return {
                ...state,
                productSearchFilter: { ...cloneDeep(initialState.productSearchFilter), ...action.payload },
            };
        }
        case PRODUCT_SEARCH_ACTIONS.UPDATE_SEARCH_RESPONSE_PARAMS: {
            return {
                ...state,
                searchResponseParams: { ...state.searchResponseParams, ...action.payload },
            };
        }
        default:
            return state;
    }
}
