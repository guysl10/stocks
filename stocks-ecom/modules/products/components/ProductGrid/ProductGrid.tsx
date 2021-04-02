import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import ProductGridItem from '../ProductGridItem/ProductGridItem';
import { Product } from '../../shared/product.type';
import classes from './ProductGrid.module.scss';
import Loader from '../../../shared/components/Loader';
import AsyncDataLoadComponent from '../../../shared/components/AsyncDataLoadComponent';

interface IProdductGridProps{
  gridService: ()=> Promise<any>
}

export default function ProductGrid({ gridService }: IProdductGridProps) {
  return (
    <AsyncDataLoadComponent asyncService={gridService}>
      {({ records: products }) => (
        <Grid container className={classes.gridContainer}>
          <Grid
            item
            container
            spacing={4}
            justify="center"
          >
            {products.map((product) => (
              <ProductGridItem product={product} key={product._id} />
            ))}
          </Grid>
        </Grid>
      )}
    </AsyncDataLoadComponent>
  );
}