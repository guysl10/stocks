import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { FindInPage } from '@material-ui/icons';
import ProductGridItem from '../ProductGridItem/ProductGridItem';
import classes from './ProductGrid.module.scss';
import { Product } from '../../shared/product.type';
import Loader from '../../../shared/components/Loader';
import { sleep } from '../../../shared/utils';

interface IProdductGridProps{
  gridService: ({ page }: {page: number})=> Promise<any>,
  triggerChange?: any,
  gridWithSearchPanel?: boolean
}

function NoProductFound() {
  return (
      <Grid container style={{ height: 400 }} justify="center" alignItems="center">
        <Grid item style={{ textAlign: 'center' }}>
          <FindInPage style={{ fontSize: 100, color: '#af6565' }} />
          <Typography variant="h2">No Product Found ...</Typography>
          <Typography variant="h5">
            Sorry, we are not able to find the product you are looking for ...
          </Typography>
        </Grid>
      </Grid>
  );
}

interface IProductResponse {
  records: Array<Product>,
  page: number,
  totalPages: number
}
export default function ProductGrid({ gridService, triggerChange, gridWithSearchPanel }:
                                        IProdductGridProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [productResponse, setProductResponse] = useState<IProductResponse>({
    page: 1,
    totalPages: 1,
    records: [],
  });
  const cartItems = useSelector((state) => state.cartState.cartItems);

  const setProductsData = (responseData) => {
    const tempProducts = cloneDeep(responseData.records);
    tempProducts.forEach((product) => {
      const foundCartItem = cartItems.find((record) => record.productId === product._id);
      if (foundCartItem) {
        // eslint-disable-next-line no-param-reassign
        product.quantity = foundCartItem.quantity;
      }
    });
    let newProducts = tempProducts;
    if (responseData.page !== 1) {
      newProducts = [...productList, ...tempProducts];
    }
    setProductList(newProducts);
  };

  const getProductsRecords = async ({ page }) => {
    try {
      setIsLoading(true);
      await sleep(4000);
      const response = await gridService({ page });
      setProductResponse(response);
      setProductsData(response);
    } catch (e) {
      // Do nothing
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getProductsRecords({ page: 1 });
  }, [triggerChange]);

  useEffect(() => {
    setProductsData(productResponse);
  }, [cartItems]);

  const onLoadMore = () => {
    getProductsRecords({ page: productResponse.page + 1 });
  };

  return (
      productList.length > 0
          ? (
              <>
                {/* If there is product length > 0 then show the list of the products */}
                <Grid container className={`${classes.gridContainer} ${gridWithSearchPanel ? classes.withSearch : ''}`}>
                  <Grid
                      item
                      container
                      spacing={4}
                      justify="flex-start"
                  >
                    {productList.map((product) => (
                        <ProductGridItem product={product} key={product._id} />
                    ))}
                  </Grid>
                </Grid>
                { /* If all the pages are visited then do not show load more option */ }
                {productResponse.totalPages <= productResponse.page ? null : (
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.loadMoreContainer}
                    >
                      { /* If loading more data then show the loading indicator
               with the smaller height then main loader */ }
                      {!isLoading ? <Button onClick={onLoadMore}>Load More</Button>
                          : <Loader height={100} />}
                    </Grid>
                )}
              </>
          ) : (
              <>
                { /* If there is product length == 0 then show either
           loader or no product found message */ }
                { isLoading
                    ? <Loader />
                    : <NoProductFound />}
              </>
          )
  );
}

ProductGrid.defaultProps = { triggerChange: '', gridWithSearchPanel: false };
