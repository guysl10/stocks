import React from 'react';
import {
  Grid, Typography, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classes from './CartItem.module.scss';
import { ICartItem } from '../../shared/cart.type';
import AddRemoveButton from '../../../products/components/AddRemoveButton/AddRemoveButton';

export default function CartItem({ cartItem }: {cartItem: ICartItem}) {
  return (
    <Grid
      item
      container
      justify="space-between"
      className={classes.cartItem}
    >
      <Grid container item className={classes.productContainer}>
        <Grid item className={classes.imageContainer}>
          <Grid
            container
            alignItems="center"
            justify="center"
          >
            <img
              src={cartItem.product.imageUrl}
              alt="Product Img"
            />
          </Grid>
        </Grid>
        <Grid className={classes.productTitle} item alignContent="center">
          <Typography className={classes.productName}>
            {cartItem.product.name}
          </Typography>
          <br />
          <Typography className={classes.productSize}>
            Size:
            {' '}
            {cartItem.product.size}
          </Typography>
        </Grid>
      </Grid>
      <Typography className={classes.productPrice}>
        $
        {cartItem.productPrice}
      </Typography>
      <AddRemoveButton value={cartItem.quantity} />
      <Typography className={classes.productTotal}>
        $
        {cartItem.cartItemTotal}
      </Typography>
      <Typography>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Typography>
    </Grid>
  );
}