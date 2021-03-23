import React from "react";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import classes from "../Cart.module.scss";

export interface ICart {
  product: {
    name: string;
    size: string;
  };
  productId: string;
  productPrice: number;
  quantity: number;
  cartItemTotal: number;
}
export default function Cart() {
  const arr = [1, 2];
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
          <Typography></Typography>
        </Grid>
        {arr.map(item => {
          return (
            <Grid
              container
              item
              justify="space-between"
              className={classes.cartItem}
            >
              <Grid container item className={classes.productContainer}>
                <Grid className={classes.imageContainer}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiZJz0qJq_d2SUYWm6OlzELTfYoeAGUOj6g&usqp=CAU"
                    alt="Product Img"
                  />
                </Grid>
                <Grid className={classes.productTitle}>
                  <Typography className={classes.productName}>
                    Set of Socks
                  </Typography>
                  <br />
                  <Typography className={classes.productSize}>
                    Size: Medium
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.productPrice}>$1.45</Typography>
              <Grid container item className={classes.quantityContainer}>
                <Button className={classes.quantityButton}>- </Button>
                <Typography>1</Typography>
                <Button className={classes.quantityButton}>+</Button>
              </Grid>
              <Typography className={classes.productTotal}>$1.45</Typography>
              <Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Typography>
            </Grid>
          );
        })}
        <Grid container item justify="flex-end">
          <Grid
            container
            item
            justify="space-between"
            className={classes.totalContainer}
          >
            <Typography>
              <b>Total:</b> <br /> 2 items
            </Typography>
            <Typography className={classes.totalAmount}>$16.45</Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            className={classes.createOrderButton}
            variant="contained"
            color="secondary"
          >
            Create Order
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}