import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';

function ProductSearchCount() {
    const { totalSearchResults } = useSelector(
        (state) => state.productSearchState.searchResponseParams,
    );
    const { q } = useSelector((state) => state.productSearchState.productSearchFilter);
    return (
        <Grid container direction="row">
            <Typography>
                <b>
                    {q}
                    {' '}
                    -
                    &nbsp;
                </b>
            </Typography>
            <Typography>
                {totalSearchResults}
                {' '}
                Items Found
            </Typography>
        </Grid>
    );
}

export default ProductSearchCount;
