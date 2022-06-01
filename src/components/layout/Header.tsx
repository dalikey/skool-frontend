import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    drawerWidth: number;
    toggleDrawer: () => void;
}

const Header = ({ drawerWidth, toggleDrawer }: HeaderProps) => {
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
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' noWrap component='div'>
                    Responsive draw
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
