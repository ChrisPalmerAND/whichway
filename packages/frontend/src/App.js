import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { AppBarWrapper } from './components/AppBarWrapper';
import { DrawerWrapper } from './components/DrawerWrapper';
import { MainWrapper } from './components/MainWrapper';
import { Map } from './components/Map';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHouse,
    faPoundSign,
    faCarSide,
    faBicycle,
    faTrainSubway,
    faPersonWalking,
    faBus,
} from '@fortawesome/free-solid-svg-icons';

library.add(faHouse, faPoundSign, faCarSide, faBicycle, faTrainSubway, faPersonWalking, faBus);
const drawerWidth = 320;

function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

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
                drawerWidth={drawerWidth}
            />
            <MainWrapper open={open} drawerWidth={drawerWidth}>
                <Map />
            </MainWrapper>
        </Box>
    );
}

export default App;
