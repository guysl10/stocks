import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './AddRemoveButton.style';

function AddRemoveButton({ value, onChange }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(value || 0);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className={classes.root}>
      {!quantity ? (
        <Button
          className={classes.button}
          onClick={increment}
          variant="outlined"
          color="primary"
        >
          Buy Now
        </Button>
      ) : (
        <Grid className={classes.quantityUpdator}>
          <Button
            onClick={decrement}
            disableRipple
            disableFocusRipple
          >
            <img src="images/Minus.png" alt="add" />
          </Button>
          <input value={quantity} onChange={onChangeQuantity} />
          <Button
            onClick={increment}
            disableRipple
            disableFocusRipple
          >
            <img src="images/Plus.png" alt="remove" />
          </Button>
        </Grid>
      )}
    </div>
  );
}

export default AddRemoveButton;