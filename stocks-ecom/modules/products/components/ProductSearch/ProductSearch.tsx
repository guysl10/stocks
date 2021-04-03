import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  AccordionSummary
} from "@material-ui/core";
import React from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import classes from "./ProductSearch.module.scss";

function ProductSearch() {
  return (
    <Grid container>
      <Grid item xs={3} className={classes.filterContainer}>
        <Grid container direction="row" className={classes.filePath}>
          <Typography>
            <b>Home ></b>
          </Typography>
          <Typography className={classes.cart}> Cart</Typography>
        </Grid>
        <Grid container direction="row" className={classes.itemName}>
          <Typography>
            <b>Children Socks -</b>
          </Typography>
          <Typography>XXX Items Found</Typography>
        </Grid>
        <Grid container justify="space-between" className={classes.filter}>
          <Grid>
            <Typography>
              <b>Filters</b>
            </Typography>
          </Grid>
          <Grid>
            <Typography className={classes.filterClear}>CLear All</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.sizeContainer}>
          <Typography>
            <b>Size</b>
          </Typography>
          <Grid container direction="row">
            <FormControlLabel
              control={<Checkbox />}
              label="XS"
              color="primary"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="L"
              color="primary"
            />
          </Grid>
          <Grid container direction="row">
            <FormControlLabel
              control={<Checkbox />}
              label="S"
              color="primary"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="XL"
              color="primary"
            />
          </Grid>
          <Grid container direction="row">
            <FormControlLabel
              control={<Checkbox />}
              label="M"
              color="primary"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="XXL"
              color="primary"
            />
         </Grid>
        </Grid>
        <Grid className={classes.colorContainer}>
          <Typography>
            <b>Colors</b>
          </Typography>
          <Grid justify="space-evenly">
            <div className={classes.black}></div>
            <div className={classes.yellow}></div>
            <div className={classes.blue}></div>
            <div className={classes.pink}></div>
            <div className={classes.green}></div>
            <div className={classes.red}></div>
            <div className={classes.purple}></div>
            <div className={classes.grey}></div>
          </Grid>
        </Grid>
        <Grid className={classes.priceContainer}>
          <Typography>
            <b>Price</b>
          </Typography>
          <Grid container direction="row" className={classes.priceRange}>
            <Typography className={classes.range}>
              <b>Price Range:</b>
            </Typography>
            <Typography className={classes.price}>$0 - $200</Typography>
          </Grid>
          <Slider className={classes.slider} />
        </Grid>
      </Grid>
      <Grid item xs={9}>
      </Grid>
    </Grid>
  );
}

export default ProductSearch;