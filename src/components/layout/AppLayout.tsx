import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from './Drawer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../app/useLocalStorage';
import { CredentialsModel } from '../../models/authModels';
import { useEffect } from 'react';

const AppLayout = () => {
    const [user] = useLocalStorage<CredentialsModel>('user');

    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.token) {
            navigate('/sign-in');
        }
    }, [user, navigate]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer />
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#F9F9F9',
                    minHeight: '100vh',
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;
