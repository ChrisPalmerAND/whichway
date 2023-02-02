import { styled } from '@mui/material/styles';
import React from 'react';
import { AppContext } from '../context';

export const MainWrapper = ({ drawerWidth, children }) => {
    const [state] = React.useContext(AppContext);
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
    return <Main open={state.open}>{children}</Main>;
};
