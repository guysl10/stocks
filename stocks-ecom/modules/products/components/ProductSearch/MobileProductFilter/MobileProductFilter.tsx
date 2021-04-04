import {
    Dialog, Grid, IconButton, Slide, useMediaQuery,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ProductSearchCount from '../ProductSearchCount';
import ProductSearchFilter from '../ProductSearchFilter/ProductSearchFilter';
import classes from './MobileProductFilter.module.scss';

const Transition = React.forwardRef((
    // eslint-disable-next-line react/require-default-props
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
    // eslint-disable-next-line react/jsx-props-no-spreading
) => <Slide direction="right" ref={ref} {...props} />);

function MobileProductFilter() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const isTablet = useMediaQuery('(min-width:974px)');

    useEffect(() => {
        if (isTablet) {
            handleClose();
        }
    }, [isTablet]);

    return (
        <Grid item className={classes.mobileFilterContainer}>
            <Grid item container alignItems="center" justify="space-between">
                <Grid item sm>
                    <ProductSearchCount />
                </Grid>
                <IconButton className={classes.filterIcon} onClick={() => setOpen(true)}>
                    <img src="/images/filter.svg" alt="filter" />
                </IconButton>
            </Grid>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Grid container>
                    <IconButton onClick={handleClose} className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <ProductSearchFilter onFilterOkay={handleClose} />
            </Dialog>
        </Grid>
    );
}

export default MobileProductFilter;
