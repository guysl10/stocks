import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

function Loader({ height }: {height?: number}) {
  return (
    <Grid container style={{ height }} justify="center" alignItems="center">
      <CircularProgress />
    </Grid>
  );
}
Loader.defaultProps = { height: 400 };

export default Loader;
