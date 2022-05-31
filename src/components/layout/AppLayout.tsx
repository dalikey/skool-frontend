import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from './Drawer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer />
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;
