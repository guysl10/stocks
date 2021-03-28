import React from 'react';
import classes from './Password.module.scss';

export default function Password(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input {...props} className={classes.input} type="password" />;
}
