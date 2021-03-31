import { createStyles, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: 'red',
  },
  button: {
    borderRadius: 20,
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
    },
  },
  quantityUpdator: {
    border: '2px solid #D1D1D1',
    borderRadius: 20,
    '& input': {
      border: 'none',
      width: 35,
      textAlign: 'center',
    },
    '& input:focus': {
      outline: 'none',
    },
    '& button': {
      minWidth: 40,
      padding: '9px 8px',
      color: theme.palette.primary.main,
    },
    '& button:hover': {
      background: 'none',
    },
  },
}));

export default useStyles;