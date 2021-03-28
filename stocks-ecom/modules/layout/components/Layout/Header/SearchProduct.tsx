import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #969197',
    borderRadius: 4,
    width: 400,
    [theme.breakpoints.down(960)]: {
      width: 300,
    },
  },
  [theme.breakpoints.down(950)]: {
      width: '100%',
    },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
}));

function SearchProduct() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchProduct;
