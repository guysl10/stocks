import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Typography, Button,
} from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useRouter } from 'next/router';
import classes from './Cart.module.scss';
import CartItem from '../CartItem/CartItem';
import { clearCartService, createOrderFromCartService, getCartDetailService } from '../../shared/cartService';
import AsyncDataLoadComponent from '../../../shared/components/AsyncDataLoadComponent';
import { message, scrollTop } from '../../../shared/utils';
import UserLoginPageGuard from '../../../shared/components/UserLoginPageGuard';

export default function Cart() {
  const { cartItems, totalProducts, totalAmount } = useSelector((state) => state.cartState);  const dispatch = useDispatch();

  const router = useRouter();

  const clearCart = async () => {
    await clearCartService(dispatch);
  };

  const createOrderFromCart = async () => {
    await createOrderFromCartService(dispatch);
    message.success('Order is created successfully.');
    router.push('/');
    scrollTop();
  };

    return (
    <div className={classes.cartContainer}>
    <UserLoginPageGuard />
    <AsyncDataLoadComponent asyncService={() => getCartDetailService(dispatch)}>
        {() => (
          <Grid container>
            {cartItems.length
              ? (
                <>
                  <Grid container item justify="space-between" className={classes.header}>
                    <Typography variant="h5"> Your Cart</Typography>
                    <Button className={classes.button} variant="outlined" onClick={clearCart}>
                      Clear Cart
                    </Button>
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
                        {totalProducts}
                        {' '}
                        items
                      </Typography>
                      <Typography className={classes.totalAmount}>
                        $
                        {totalAmount}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container justify="flex-end">
                    <Button
                      onClick={createOrderFromCart}
                      className={classes.createOrderButton}
                      variant="contained"
                      color="primary"
                    >
                      Create Order
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid container item justify="center" alignItems="center" className={classes.emptyCart}>
                  <Grid item className={classes.emptyCartInner}>
                    <LocalMallIcon className={classes.cartIcon} />
                    <br />
                    <Typography style={{ fontSize: 35 }}>
                      Your cart is empty
                    </Typography>
                    <br />
                    <Link href="/">
                      <Button variant="contained" color="primary">
                        Shop Now
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              )}
          </Grid>
        )}
      </AsyncDataLoadComponent>        
    </div>
  );
}