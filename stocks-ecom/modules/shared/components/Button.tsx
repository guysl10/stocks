import React from 'react';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

interface ButtonProperties extends ButtonProps{
  plain?: boolean,
  style?: object,
  loading?: boolean,
}

export default function Button({
                                 plain, style, loading, children, ...props
                               }: ButtonProperties) {
  let buttonStyle = style;
  if (plain) {
    buttonStyle = { ...buttonStyle, backgroundColor: 'transparent' };
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiButton {...props} style={buttonStyle}>
      {children}
      &nbsp;
      {loading ? <CircularProgress size={18} /> : null}
    </MuiButton>
  );
}

Button.defaultProps = { style: {}, plain: false, loading: false };
