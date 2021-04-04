/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    Slider,
    Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { remove } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PRODUCT_COLORS, PRODUCT_SIZES } from '../../../shared/product.constants';
import ProductSearchCount from '../ProductSearchCount';
import classes from './ProductSearchFilter.module.scss';
import { clearProductFilter, updateProductFilter } from '../redux/product-search.action';

export interface IFilterParams {
    color: Array<string>,
    size: Array<string>,
    fromPrice?: number,
    q: string,
    toPrice?: number
}

export interface IProductSearchFilterParams {
    onFilterOkay?: ()=>void,
}

const PriceStyledSlider = withStyles({
    root: {
        color: 'black',
        height: 8,
        marginTop: 20,
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -7,
        marginLeft: -6,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
    },
})(Slider);

function ProductSearchFilter({ onFilterOkay }: IProductSearchFilterParams) {
    const [priceSliderValue, setPriceSliderValue] = useState<Array<number>>([0, 0]);
    const router = useRouter();
    const filterParams = useSelector((state) => state.productSearchState.productSearchFilter);
    const { lowerPriceLimit, upperPriceLimit } = useSelector(
        (state) => state.productSearchState.searchResponseParams,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (router.query.q && filterParams.q !== router.query.q?.toString()) {
            dispatch(updateProductFilter({ q: router.query.q?.toString() }));
        }
    }, [router.query.q]);

    useEffect(() => {
        setPriceSliderValue([lowerPriceLimit, upperPriceLimit]);
    }, [upperPriceLimit, lowerPriceLimit]);

    useEffect(() => {
        //  If the slider value is not same as upper and lower limit then only set the parameters.
        if (priceSliderValue[0] !== 0 || priceSliderValue[1] !== 0) {
            if (lowerPriceLimit !== priceSliderValue[0] || upperPriceLimit !== priceSliderValue[1]) {
                dispatch(updateProductFilter({
                    fromPrice: priceSliderValue[0],
                    toPrice: priceSliderValue[1],
                }));
            }
        }
    }, [priceSliderValue]);

    const clearFilter = () => {
        dispatch(clearProductFilter({ fromPrice: lowerPriceLimit, toPrice: upperPriceLimit }));
    };

    const handleSizeChange = (event, newSize) => {
        const isChecked = event.target.checked;
        const newSizeFilters = [...filterParams.size];
        if (isChecked) {
            newSizeFilters.push(newSize);
        } else {
            remove(newSizeFilters, (size) => size === newSize);
        }
        dispatch(updateProductFilter({ size: newSizeFilters }));
    };

    const handleColorChange = (newColor) => {
        const newColorFilters = [...filterParams.color];
        const isColorSelected = newColorFilters.includes(newColor);
        if (isColorSelected) {
            remove(newColorFilters, (color) => color === newColor);
        } else {
            newColorFilters.push(newColor);
        }
        dispatch(updateProductFilter({ color: newColorFilters }));
    };

    const handlePriceRangeChange = (event, newValue) => {
        setPriceSliderValue(newValue);
    };

    const getPriceSliderMarks = () => {
        if (upperPriceLimit === 0 && lowerPriceLimit === 0) {
            return [];
        }
        return [
            { value: lowerPriceLimit, label: lowerPriceLimit },
            { value: upperPriceLimit, label: upperPriceLimit },
        ];
    };

    return (
        <Grid item container className={classes.filterContainer}>
            <div className={classes.productSearchCount}>
                <ProductSearchCount />
            </div>
            <Grid container justify="space-between" className={classes.filter}>
                <Grid>
                    <Typography className={classes.filterTitle}>
                        Filters
                    </Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.filterClear} onClick={clearFilter}>
                        Clear All
                    </Typography>
                </Grid>
            </Grid>
            <Grid className={classes.sizeContainer}>
                <Typography className={classes.filterTitle}>
                    Size
                </Typography>
                {PRODUCT_SIZES.map((size) => (
                    <FormControlLabel
                        key={size}
                        control={(
                            <Checkbox
                                checked={filterParams.size.includes(size)}
                                onChange={(event) => handleSizeChange(event, size)}
                                color="primary"
                            />
                        )}
                        label={size}
                    />
                ))}
            </Grid>
            <Grid className={classes.colorFilterContainer}>
                <Typography className={classes.filterTitle}>
                    Colors
                </Typography>
                <Grid container spacing={1}>
                    {PRODUCT_COLORS.map((color) => (
                        <Grid item key={color}>
                            <div
                                onClick={() => handleColorChange(color)}
                                className={`${classes.colorContainer} ${filterParams.color.includes(color) ? classes.active : ''}`}
                            >
                                <div className={`${classes.color} ${classes[color.toLowerCase()]}`} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid className={classes.priceFilterContainer}>
                <Typography className={classes.filterTitle}>
                    Price
                </Typography>
                <Grid container direction="row" className={classes.priceRange}>
                    <Typography className={classes.range}>
                        Price Range :&nbsp;
                    </Typography>
                    <Typography className={classes.price}>
                        $
                        {priceSliderValue[0]}
                        {' '}
                        - $
                        {priceSliderValue[1]}
                    </Typography>
                </Grid>
                <PriceStyledSlider
                    marks={getPriceSliderMarks()}
                    value={priceSliderValue}
                    onChange={handlePriceRangeChange}
                    min={lowerPriceLimit}
                    step={0.1}
                    max={upperPriceLimit}
                />
            </Grid>
            <Grid>
                <Button className={classes.done} variant="contained" color="primary" onClick={onFilterOkay}>
                    Ok
                </Button>
            </Grid>
        </Grid>
    );
}
ProductSearchFilter.defaultParams = { onFilterOkay: () => {} };

export default ProductSearchFilter;
