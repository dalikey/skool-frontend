import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import ProfileBox from './ProfileBox';
import { CredentialsModel } from '../../models/authModels';

interface HeaderProps {
    drawerWidth: number;
    toggleDrawer: () => void;
    user: CredentialsModel | undefined;
}

const Header = ({ drawerWidth, toggleDrawer, user }: HeaderProps) => {
    const { pathname } = useLocation();

    const title = pathname.charAt(1).toUpperCase() + pathname.slice(2);

    return (
        <AppBar
            color='transparent'
            position='absolute'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                mt: 1,
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
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h4'
                        noWrap
                        component='div'
                        sx={{ flexGrow: 1, fontSize: '1.75rem', fontWeight: 'bold' }}
                    >
                        {title === '' ? 'Dashboard' : title }
                    </Typography>
                    <ProfileBox user={user}/>
                </Toolbar>
            </Box>
            <Divider variant='middle'></Divider>
        </AppBar>
    );
};

export default Header;
