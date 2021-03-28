import {
  createStyles,
  Dialog, Grid, IconButton, Tab, Tabs,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { updateLoginRegisterDialogState } from '../../layout/components/Layout/redux/layout.action';
import SignUp from './SignUp';
import Login from './Login';

const useStyles = makeStyles(() => createStyles({
  dialogContainer: {
    borderRadius: 20,
    maxWidth: 450,
    // padding: 20,
  },
  tabContainer: {
    '& .MuiTabs-root': {
      paddingBottom: 20,
    },
    '& .MuiTab-root': {
      textTransform: 'none',
      borderBottom: '1px solid gray',
      fontSize: 21,
      fontWeight: 'normal',
    },
    '& .MuiTabs-indicator': {
      height: 1,
    },
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '& .MuiButtonBase-root.MuiButton-contained': {
      borderRadius: 30,
      paddingLeft: 25,
      paddingRight: 25,
    },
    padding: 30,
  },
  closeContainer: {
    '& button': {
      zIndex: 1000,
    },
    marginBottom: -60,
    paddingRight: 5,
  },
}));

function LoginRegisterDialog() {
  const classes = useStyles();
  const dialogIsOpen = useSelector((state) => state.layoutState.loginRegisterDialogState) || false;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const handleClose = () => {
    dispatch(updateLoginRegisterDialogState(false));
  };

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <Dialog
      open={dialogIsOpen}
      onClose={handleClose}
      classes={{ paper: classes.dialogContainer }}
    >
      <Grid justify="flex-end" container className={classes.closeContainer}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <div className={classes.tabContainer}>
        <Tabs
          value={activeTab}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        {activeTab === 0 ? <Login /> : <SignUp />}
      </div>
    </Dialog>
  );
}

export default LoginRegisterDialog;