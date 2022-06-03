import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import ProfileBox from './ProfileBox';
import { CredentialsModel } from '../../models/authModels';
import { useLocalStorage } from '../../app/useLocalStorage';

interface HeaderProps {
    drawerWidth: number;
    toggleDrawer: () => void;
}

const Header = ({ drawerWidth, toggleDrawer }: HeaderProps) => {
    const [user] = useLocalStorage<CredentialsModel>('user');
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
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={toggleDrawer}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h5'
                        noWrap
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        {pathname.substring(1, pathname.length).toUpperCase()}
                    </Typography>
                    {user && (
                        <ProfileBox
                            firstName={user.firstName}
                            lastName={user.lastName}
                        />
                    )}
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default Header;
