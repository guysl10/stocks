import React from 'react';
import classes from './Input.module.scss';

interface IInputProps {
  value: string,
  onChange: (value: string) => void,
  fieldRef: any,
}

export default function Input({
  value, onChange, fieldRef, ...props
}: IInputProps) {
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
