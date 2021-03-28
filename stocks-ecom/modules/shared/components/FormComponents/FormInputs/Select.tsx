import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

/** Select style */
const useStyles = makeStyles(() => createStyles({
  root: {
    width: '100%',
  },
}));
/** Select style ends */

export interface ISelectFieldProps{
  options: Array<any>,
  optionValueKey: string,
  optionLabelKey: string
}

function Select({
                  value, onChange, fieldProps: { options, optionValueKey, optionLabelKey },
                }: ISelectProps) {
  const classes = useStyles();
  return (
    <select value={value} onChange={onChange} className={classes.root}>
      {options.map((option) => (
        <option value={option[optionValueKey]} key={option[optionValueKey]}>
          {option[optionLabelKey]}
        </option>
      ))}
    </select>
  );
}

export default Select;
