import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import React from 'react';
import RangeSlider from './Slider';
/* eslint-disable react/prop-types */
export const DrawerWrapper = ({
    rentValues,
    setRentValues,
    open,
    theme,
    handleDrawerClose,
    drawerWidth,
}) => {
    const [openFilters, setOpenFilter] = React.useState(true);
    const [openInfo, setOpenInfo] = React.useState(false);

    const handleClickFilters = () => {
        setOpenFilter(!openFilters);
    };
    const handleClickInfo = () => {
        setOpenInfo(!openInfo);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose} align="right">
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                // subheader={
                //     <ListSubheader component="div" id="nested-list-subheader">
                //         Nested List Items
                //     </ListSubheader>
                // }
            >
                <ListItemButton onClick={handleClickFilters}>
                    <ListItemIcon>
                        <TuneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Filters" />
                    {openFilters ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openFilters} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 5 }}>
                            <RangeSlider rentValues={rentValues} setRentValues={setRentValues} />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={handleClickInfo}>
                    <ListItemIcon>
                        <InfoOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Info" />
                    {openInfo ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openInfo} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            justifyContent: 'center',
                            margin: '5px',
                        }}
                    >
                        <Typography variant="h4">Not sure where to live?</Typography>
                        <Typography paragraph>
                            To get started, click the incredibly small polygon icon. Then click
                            several times on the map to create and area of where you might like to
                            live.
                        </Typography>
                        <Typography paragraph>
                            Once you have finished drawing, you see will house icons. Click on any
                            to read more details.
                        </Typography>
                    </Box>
                </Collapse>
            </List>
        </Drawer>
    );
};
