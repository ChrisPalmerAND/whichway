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

library.add(faHouse, faCarSide, faBicycle, faTrainSubway, faPersonWalking, faBus);
const drawerWidth = 320;

function App() {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
            <CssBaseline />
            <AppBarWrapper theme={theme} drawerWidth={drawerWidth} />
            <DrawerWrapper theme={theme} drawerWidth={drawerWidth} />
            <MainWrapper drawerWidth={drawerWidth}>
                <Map />
            </MainWrapper>
        </Box>
    );
}

export default App;
