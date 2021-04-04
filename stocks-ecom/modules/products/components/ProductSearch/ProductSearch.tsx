import { Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productSearchService } from '../../shared/productService';
import ProductGrid from '../ProductGrid/ProductGrid';
import ProductSearchFilter, { IFilterParams } from './ProductSearchFilter/ProductSearchFilter';
import classes from './ProductSearch.module.scss';
import MobileProductFilter from './MobileProductFilter/MobileProductFilter';
import { updateSearchResponseParams } from './redux/product-search.action';

function ProductSearch() {
  const [searchParams, setSearchParams] = useState<IFilterParams>();
  const productSearchFilter: IFilterParams = useSelector(
      (state) => state.productSearchState.productSearchFilter,
  );
  const dispatch = useDispatch();
  const debounceTimerRef = useRef<any>();

  const searchService = async (gridQueryParams) => {
    if (searchParams.q) {
      const response = await productSearchService({ ...gridQueryParams, ...searchParams });
      dispatch(updateSearchResponseParams({
        totalSearchResults: response.totalCount,
        upperPriceLimit: response.upperPriceLimit,
        lowerPriceLimit: response.lowerPriceLimit,
      }));
      return response;
    }
    return { records: [] };
  };

  const updateSearchParams = (updatedParams) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setSearchParams(updatedParams);
    }, 1000);
  };

  useEffect(() => {
    updateSearchParams(productSearchFilter);
  }, [productSearchFilter]);

  return (
      <Grid container spacing={3} className={classes.filterWrapper}>
        <Grid item className={classes.filterContainer}>
          <ProductSearchFilter />
        </Grid>
        <MobileProductFilter />
        <Grid item sm>
          <ProductGrid gridService={searchService} triggerChange={searchParams} gridWithSearchPanel />
        </Grid>
      </Grid>
  );
}

export default ProductSearch;
