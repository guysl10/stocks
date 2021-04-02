import { Grid, Typography } from '@material-ui/core';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import React from 'react';

function Error() {
  return (
    <Grid container style={{ height: 400 }} justify="center" alignItems="center">
      <Grid item style={{ textAlign: 'center' }}>
        <ErrorRoundedIcon style={{ fontSize: 100, color: '#af6565' }} />
        <Typography variant="h2">Something Wrong here...</Typography>
        <Typography variant="h5">
          Sorry, we are having some technical issues
          {' '}
          <br />
          Try to refresh the page.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Error;
