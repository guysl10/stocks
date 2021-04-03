import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import ProductGridItem from '../ProductGridItem/ProductGridItem';
import classes from './ProductGrid.module.scss';
import AsyncDataLoadComponent from '../../../shared/components/AsyncDataLoadComponent';
import { Product } from '../../shared/product.type';

interface IProdductGridProps{
  gridService: ()=> Promise<any>
}

function ProductGridWithData({ products }: {products: Array<Product>}) {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const [productsWithCartCounts, setProductsWithCartCounts] = useState([]);

  useEffect(() => {
    const tempProducts = cloneDeep(products);
    tempProducts.forEach((product) => {
      const foundCartItem = cartItems.find((record) => record.productId === product._id);
      if (foundCartItem) {
        // eslint-disable-next-line no-param-reassign
        product.quantity = foundCartItem.quantity;
      }
    });
    setProductsWithCartCounts(tempProducts);
  }, [cartItems]);

  return (
    <Grid container className={classes.gridContainer}>
      <Grid
        item
        container
        spacing={4}
        justify="center"
      >
        {productsWithCartCounts.map((product) => (
          <ProductGridItem product={product} key={product._id} />
        ))}
      </Grid>
    </Grid>
  );
}

export default function ProductGrid({ gridService }: IProdductGridProps) {
  return (
    <AsyncDataLoadComponent asyncService={gridService}>
      {({ records: products }) => <ProductGridWithData products={products} />}
    </AsyncDataLoadComponent>
  );
}