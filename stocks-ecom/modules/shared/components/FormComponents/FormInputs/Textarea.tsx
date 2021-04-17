import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { IFieldProps } from '../FormItem';

/** Text Area style */
const useStyles = makeStyles(() => createStyles({
  root: {
    width: '100%',
  },
}));
/** Text Area style ends */

function Textarea({ value, onChange }) {
  const classes = useStyles();
  return (
    <textarea value={value} onChange={onChange} className={classes.root} />
  );
}

export default Textarea;
