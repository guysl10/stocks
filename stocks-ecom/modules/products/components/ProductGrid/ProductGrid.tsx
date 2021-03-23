import React from "react";
import classes from "./ProductGrid.module.scss";
import { Grid, Typography, Button } from "@material-ui/core";

export default function page() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={classes.pageContainer}>
      <Grid container>
        {arr.map(item => {
          return (
            <Grid justify="space-between" className={classes.socksContainer}>
              <div className={classes.imageContainer}>
                {" "}
                <img
                  className={classes.imgContainer}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiZJz0qJq_d2SUYWm6OlzELTfYoeAGUOj6g&usqp=CAU"
                  alt="Product Img"
                />
              </div>
              <Typography className={classes.socksName}>
                {" "}
                Black Socks
              </Typography>
              <Typography className={classes.socksSize}>
                Size: Small
              </Typography>{" "}
              <br />
              <Grid container justify="space-between" alignItems="center">
                <Typography className={classes.socksPrice}>$1.45</Typography>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}