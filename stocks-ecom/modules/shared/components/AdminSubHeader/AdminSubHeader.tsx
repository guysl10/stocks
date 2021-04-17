import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => createStyles({
  adminSubHeader: {
    marginTop: -20,
  },
  backButton: {

  },
}));

interface IAdminSubHeaderProps {
  header: string,
  rightActionButtonText?: string,
  onRightActionButtonClick?: ()=> void | undefined,
  enableBackButton?: boolean
}

function AdminSubHeader({
  header,
  onRightActionButtonClick,
  rightActionButtonText,
  enableBackButton,
}: IAdminSubHeaderProps) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      <Grid
        container
        className={classes.adminSubHeader}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container alignItems="center">
            {enableBackButton ? (
              <Grid item>
                <Button onClick={() => router.back()} className={classes.backButton}>
                  <ArrowBackIosIcon />
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <h2>{header}</h2>
            </Grid>
          </Grid>
        </Grid>
        {rightActionButtonText ? (
          <Grid item>
            <Button onClick={onRightActionButtonClick} color="primary" variant="contained">
              {rightActionButtonText}
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <Divider />
      <div style={{ padding: 10 }} />
    </>
  );
}

AdminSubHeader.defaultProps = {
  onRightActionButtonClick: undefined,
  enableBackButton: false,
  rightActionButtonText: '',
};

export default AdminSubHeader;
