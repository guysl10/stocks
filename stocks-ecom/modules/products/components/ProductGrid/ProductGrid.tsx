import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import ProductGridItem from '../ProductGridItem/ProductGridItem';
import { Product } from '../../shared/product.type';
import classes from './ProductGrid.module.scss';

interface IProdductGridProps{
  gridService: ()=> Promise<any>
}

function Loading() {
  return (
    <Grid container style={{ height: 400 }} justify="center" alignItems="center">
      <CircularProgress />
    </Grid>
  );
}

export default function ProductGrid({ gridService }: IProdductGridProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const productData = (await gridService()).records;
      setProducts(productData);
      setIsLoading(false);
    })(); 
  }, []);


  return (
    <Grid container className={classes.gridContainer}>
      {!isLoading ? (
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
      ) : <Loading />}
    </Grid>
  );
}