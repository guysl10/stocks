import React from 'react';
import {
  Grid, Typography, IconButton, Divider
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
      className={classes.cartItem}
    >
      <Grid
        item
        container
        alignItems="center"
        justify="center"
        className={classes.imageContainer}
      >
        <img
          src={cartItem.product.imageUrl}
          alt="Product Img"
        />
      </Grid>
      <Grid xs className={classes.productDetails} item alignContent="center">
        <Typography className={classes.productName}>
          {cartItem.product.name}
        </Typography>
        <Typography className={classes.productSize}>
          Size:
          {' '}
          {cartItem.product.size}
        </Typography>
        <Typography className={classes.productTotal}>
          $
          {cartItem.cartItemTotal}
        </Typography>

        <Grid
          item
          alignItems="center"
          container
          className={classes.quantityContainer}
        >
          <AddRemoveButton value={cartItem.quantity} />
          <Divider orientation="vertical" flexItem />
          <Typography>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}