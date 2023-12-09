
import React, { useState, useEffect } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TopAiringAnime from './cards';
import { TextField } from '@mui/material';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [topAiringAnime, setTopAiringAnime] = useState([]);
    const [search, setSearch] = useState("");
    console.log("search: ", search);
    const [filteredAnime, setFilteredAnime] = useState([]);
    console.log("filteredAnime: ", filteredAnime);
    const fetchTopAiringAnime = async () => {
        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setTopAiringAnime(data.data.slice(0, 10));
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error fetching top airing anime:', error);
        }
    };

    const filteredResults = () => {
        const results = topAiringAnime.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredAnime(results);
    }

    useEffect(() => {
        fetchTopAiringAnime();
    }, []);

    useEffect(() => {
        filteredResults();
    }, [search, topAiringAnime]);





    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ color: 'black', backgroundColor: 'white' }}>
                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <Box display="flex" alignItems="center">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div" sx={{ fontFamily: 'sans-serif', fontSize: '22px' }}>
                                Top Anime
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" alignItems="center">
                            <TextField type='search' size='small' value={search} onChange={(e) => setSearch(e.target.value)} />

                        </Box>
                    </Box>
                </Toolbar>

            </AppBar>
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Popular', 'Favorite', 'Upcoming'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />

                <TopAiringAnime topAiringAnime={topAiringAnime} filteredAnime={filteredAnime} />
            </Main>
        </Box>
    );
}
