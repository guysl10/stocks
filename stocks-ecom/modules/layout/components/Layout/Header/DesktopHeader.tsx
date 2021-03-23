import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import SearchProduct from './SearchProduct';
import classes from './Header.module.scss';
import { IHeaderItem } from './header.type';

interface IDesktopHeaderPros {
  headerMenu: Array<IHeaderItem>
}

export default function DesktopHeader({ headerMenu } :IDesktopHeaderPros) {
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.desktopHeader}>
      <Grid item container className={classes.leftContent}>
        <Grid item>
          <Link href="/">
            <img src="/images/header-icon.png" alt="app logo" />
          </Link>
        </Grid>
        <Grid item>
          <SearchProduct />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3} alignItems="center">
          {headerMenu.map((menuItem) => (
            <Grid item key={menuItem.title} className={!menuItem.display ? 'hidden' : ''}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Button
                onClick={menuItem.onClick}
                component="button"
                color="inherit"
              >
                {menuItem.icon}
                {' '}
                {menuItem.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
