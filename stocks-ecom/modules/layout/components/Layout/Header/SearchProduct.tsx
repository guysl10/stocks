import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';

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
    [theme.breakpoints.down(950)]: {
      width: '100%',
    },
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
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>();

  useEffect(() => {
    setSearchValue(router.query.q && decodeURIComponent(router.query.q.toString()));
  }, [router.query]);

  const gotoSearchPage = () => {
    if (searchValue) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const onInputValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onPressEnter = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      gotoSearchPage();
    }
  };

  return (
      <div className={classes.root}>
        <InputBase
            className={classes.input}
            value={searchValue}
            onKeyUp={onPressEnter}
            onChange={onInputValueChange}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton className={classes.iconButton} aria-label="search" onClick={gotoSearchPage}>
          <SearchIcon />
        </IconButton>
      </div>
  );
}

export default SearchProduct;
