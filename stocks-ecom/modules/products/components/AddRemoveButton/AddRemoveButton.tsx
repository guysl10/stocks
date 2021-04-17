import { Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Product } from '../../shared/product.type';
import useStyles from './AddRemoveButton.style';
import { updateCartItemQuantity } from '../../../cart/redux/cart.action';
import { updateCartItemQuantityService } from '../../../cart/shared/cartService';
import { ICartItem } from '../../../cart/shared/cart.type';
import { updateLoginRegisterDialogState } from '../../../layout/components/Layout/redux/layout.action';

function AddRemoveButton({ product, cartItem }: {product?: Product, cartItem?: ICartItem}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.authState.isUserLoggedIn);
  const [quantity, setQuantity] = useState(product?.quantity || cartItem?.quantity || 0);

  useEffect(() => {
    setQuantity(product?.quantity || cartItem?.quantity || 0);
  }, [product, cartItem]);

  const updateQuantity = async (newQuantity) => {
    const productRecord = product || cartItem.product;
    setQuantity(newQuantity);
    dispatch(updateCartItemQuantity({
      quantity: newQuantity,
      product: productRecord,
    }));
    await updateCartItemQuantityService({ productId: productRecord._id, quantity: newQuantity });
  };
  
  const increment = () => {
    if (!isUserLoggedIn) {
      return dispatch(updateLoginRegisterDialogState(true));
    }
    updateQuantity(quantity + 1);
  };

  const decrement = () => {
    updateQuantity(quantity - 1);
  };

  const onChangeQuantity = (event) => {
    const qty = Number(event.target.value);
    if (qty && qty > 0 && Number.isInteger(qty)) {
      updateQuantity(qty);
    }
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
AddRemoveButton.defaultProps = { product: null, cartItem: null };
export default AddRemoveButton;