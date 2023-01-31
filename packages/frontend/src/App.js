import { Box, CssBaseline } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import { AppBarWrapper } from './components/AppBarWrapper';
import { DrawerWrapper } from './components/DrawerWrapper';
import { Map } from './components/Map';
const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        flexBasis: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginTop: '80px',
        overflow: 'hidden',
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

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
            <Main open={open}>
                <Map />
            </Main>
        </Box>
    );
}

export default App;
