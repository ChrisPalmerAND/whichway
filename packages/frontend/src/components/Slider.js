import CurrencyPoundOutlinedIcon from '@mui/icons-material/CurrencyPoundOutlined';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import * as React from 'react';
import { AppContext } from '../context';

function valuetext(rentValues) {
    return `£ ${rentValues}`;
}

const marks = [
    {
        value: 0,
        label: '£0',
    },
    {
        value: 500,
        label: '£500',
    },
    {
        value: 1000,
        label: '£1000',
    },
    {
        value: 2000,
        label: '£2000',
    },
];

export default function RangeSlider() {
    const [state, dispatch] = React.useContext(AppContext);
    const handleChange = (event, newValue) => {
        dispatch({ type: 'setRent', value: newValue });

        console.log('newValue', state.rent);
    };

    return (
        <Box sx={{ width: 250, justifyContent: 'right' }}>
            <Typography id="input-slider" gutterBottom>
                Rent
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <CurrencyPoundOutlinedIcon />
                </Grid>
                <Grid item xs>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={state.rent}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        marks={marks}
                        step={25}
                        min={0}
                        max={2000}
                        defaultValue={[0, 2000]}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
