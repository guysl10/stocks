import React, { useEffect, useState } from 'react';
import {
  Grid, Typography, Button,
} from '@material-ui/core';
import classes from './Cart.module.scss';
import CartItem from '../CartItem/CartItem';
import { ICartItem } from '../../shared/cart.type';

export default function Cart() {
const sampleCartItem = {
    product: {
      name: 'test xyz',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiZJz0qJq_d2SUYWm6OlzELTfYoeAGUOj6g&usqp=CAU',
      size: 'sm',
    },
    productId: '123',
    productPrice: 12.335,
    quantity: 12,
    cartItemTotal: 12,
  };
  const [orderTotal, setOrderTotal] = useState(0);
  const [cartItems, setCartItems] = useState<Array<ICartItem>>([]);

  useEffect(() => {
    const tempCartArray = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      const tmpProduct = { ...sampleCartItem };
      if (i % 2 === 0) {
        tmpProduct.name += sampleCartItem.name;
      }
      tmpProduct.productId += i;
      tempCartArray.push(tmpProduct);
    }
    setCartItems(tempCartArray);
  });
    return (
    <div className={classes.cartContainer}>
      <Grid container>
        <Grid container item justify="space-between" className={classes.header}>
          <Typography variant="h5"> Your Cart</Typography>
          <Button className={classes.button} variant="outlined">
            Clear Cart
          </Button>
        </Grid>
        <Grid
          container
          item
          justify="space-between"
          className={classes.listTitle}
        >
          <Typography className={classes.productContainer}>Product</Typography>
          <Typography>Price</Typography>
          <Typography>Quantity</Typography>
          <Typography>Total</Typography>
          <Typography/>
        </Grid>
       {cartItems.map((cartItem) => (
          <CartItem key={cartItem.productId} cartItem={cartItem} />
        ))}
        <Grid container item justify="flex-end">
          <Grid
            container
            item
            justify="space-between"
            className={classes.totalContainer}
          >
            <Typography>
              <b>Total:</b>
              {' '}
              <br />
              {' '}
              {cartItems.length}
              {' '}
              items
            </Typography>
            <Typography className={classes.totalAmount}>
              $
              {orderTotal}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            className={classes.createOrderButton}
            variant="contained"
            color="primary"
          >
            Create Order
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}