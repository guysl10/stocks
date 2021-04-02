import React from 'react';
import {
  Grid, Typography, IconButton, Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import classes from './CartItem.module.scss';
import { ICartItem } from '../../shared/cart.type';
import AddRemoveButton from '../../../products/components/AddRemoveButton/AddRemoveButton';
import { updateCartItemQuantity } from '../../redux/cart.action';
import { removeCartItemService } from '../../shared/cartService';

export default function CartItem({ cartItem }: {cartItem: ICartItem}) {
  const dispatch = useDispatch();

  const removeItem = async (product) => {
    dispatch(updateCartItemQuantity({
      quantity: 0,
      product,
    }));
    await removeCartItemService({ productId: product._id });
  };
  
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
          <AddRemoveButton cartItem={cartItem} />
          <Divider orientation="vertical" flexItem />
          <Typography>
            <IconButton aria-label="delete" onClick={() => removeItem(cartItem.product)}>
              <DeleteIcon />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}