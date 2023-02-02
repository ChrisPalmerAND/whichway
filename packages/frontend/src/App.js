import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBicycle,
    faBus,
    faCarSide,
    faHouse,
    faPersonWalking,
    faTrainSubway,
} from '@fortawesome/free-solid-svg-icons';
import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { AppBarWrapper } from './components/AppBarWrapper';
import { DrawerWrapper } from './components/DrawerWrapper';
import { MainWrapper } from './components/MainWrapper';
import { Map } from './components/Map';

import { faBed, faPoundSign } from '@fortawesome/free-solid-svg-icons';

library.add(
    faHouse,
    faBed,
    faPoundSign,
    faCarSide,
    faBicycle,
    faTrainSubway,
    faPersonWalking,
    faBus
);
const drawerWidth = 320;

function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    // eslint-disable-next-line no-unused-vars
    const [rentValues, setRentValues] = React.useState([350, 1250]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
            <CssBaseline />
            <AppBarWrapper
                handleDrawerOpen={handleDrawerOpen}
                open={open}
                drawerWidth={drawerWidth}
            />
            <DrawerWrapper
                open={open}
                theme={theme}
                handleDrawerClose={handleDrawerClose}
                rentValues={rentValues}
                setRentValues={setRentValues}
                drawerWidth={drawerWidth}
            />
            <MainWrapper open={open} drawerWidth={drawerWidth}>
                <Map rentValues={rentValues} />
            </MainWrapper>
        </Box>
    );
}

export default App;
