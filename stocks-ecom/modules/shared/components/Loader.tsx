import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

function Loader() {
  return (
    <Grid container style={{ height: 400 }} justify="center" alignItems="center">
      <CircularProgress />
    </Grid>
  );
}

export default Loader;
