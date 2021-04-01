import { Grid } from '@material-ui/core';
import React from 'react';
import ProductGrid from '../ProductGrid/ProductGrid';

function ProductSearch() {
  return (
    <Grid container>
      <Grid item xs={3}>
        Here we need to set the product search filters
      </Grid>
      <Grid item xs={9}>
        <ProductGrid />
      </Grid>
    </Grid>
  );
}

export default ProductSearch;