import React from 'react';
import classes from './Input.module.scss';

export default function Input({ value, onChange, ...props }) {
  return (
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={classes.input}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
