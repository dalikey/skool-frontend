import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import ProfileBox from './ProfileBox';

interface HeaderProps {
    drawerWidth: number;
    toggleDrawer: () => void;
}

const Header = ({ drawerWidth, toggleDrawer }: HeaderProps) => {

    const { pathname } = useLocation();

    return (
        <AppBar
            color='transparent'
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    edge='start'
                    onClick={toggleDrawer}
                    sx={{ mr: 2, display: { md: 'none'} }}
                > 
                    <MenuIcon />
                </IconButton>
                <Typography variant='h5' noWrap component='div'>
                { pathname.substring(1, pathname.length).toUpperCase() }
                </Typography>
                <ProfileBox/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;