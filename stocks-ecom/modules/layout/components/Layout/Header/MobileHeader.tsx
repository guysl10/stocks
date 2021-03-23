import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import Link from '@material-ui/core/Link';
import styles from './Header.module.scss';
import Button from '../../../../shared/components/Button';
import { IHeaderItem } from './header.type';

const Transition = React.forwardRef((
  // eslint-disable-next-line react/require-default-props
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
  // eslint-disable-next-line react/jsx-props-no-spreading
) => <Slide direction="right" ref={ref} {...props} />);

export default function MobileHeader({ headerMenu } :
                                       {headerMenu: Array<IHeaderItem>}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openMenu = () => {
    setOpen(true);
  };

  const handleMenuClick = (clickMethod) => {
    handleClose();
    clickMethod();
  };

  return (
    <div className={styles.mobileHeader}>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <Grid container>
          <Button onClick={handleClose} plain className={styles.closeButton}>
            <CloseIcon />
          </Button>
        </Grid>
        <List component="nav" aria-label="main mailbox folders">
          {headerMenu.map(({
                             title, onClick, display, icon,
                           }) => (
            <ListItem button onClick={() => handleMenuClick(onClick)} key={title} className={!display ? 'hidden' : ''}>
              {icon}
              &nbsp;&nbsp;
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Grid container justify="space-between" alignItems="center" className={styles.mobileHeaderContainer}>
        <Button onClick={openMenu} plain className={styles.moreButton}>
          <img src="/images/mobile-side-menu.svg" alt="more options" className={styles.moreIcon} />
        </Button>
        <Link href="/">
          <img src="/images/header-icon.png" alt="app logo" className={styles.appIcon} />
        </Link>
        <Grid item />
      </Grid>
    </div>
  );
}
