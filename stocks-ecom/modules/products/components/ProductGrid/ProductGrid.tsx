import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import ProductGridItem from '../ProductGridItem/ProductGridItem';
import { Product } from '../../shared/product.type';
import classes from './ProductGrid.module.scss';

export default function ProductGrid() {
  const sampleProduct: Product = {
    name: 'Small Socks with the',
    quantity: 0,
    size: 'sm',
    price: 1233.22,
    color: 'red',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiZJz0qJq_d2SUYWm6OlzELTfYoeAGUOj6g&usqp=CAU',
    // imageUrl: 'https://contently.net/wp-content/uploads/2014/10/how-long-to-read.png',
    // imageUrl: 'https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3=s360-rw',
    sortDescription: 'sort Description',
    longDescription: 'long Description',
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const tempProductArray = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      const tmpProduct = { ...sampleProduct };
      if (i % 2 === 0) {
        tmpProduct.name += sampleProduct.name;
      }
      tempProductArray.push(tmpProduct);
    }
    setProducts(tempProductArray);
  }, []);


  return (
    <Grid container className={classes.gridContainer}>
      <Grid
        item
        container
        spacing={4}
        justify="center"
        // alignItems="stretch"
      >
        {products.map((product) => (
          <ProductGridItem product={product} />
        ))}
      </Grid>
    </Grid>
  );
}