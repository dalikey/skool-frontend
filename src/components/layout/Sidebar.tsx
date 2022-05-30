import { Box, Drawer } from '@mui/material';
import SidebarLinkList from './SidebarLinkList';

interface SidebarProps {
    drawerWidth: number;
    toggleDrawer: () => void;
    isOpen: boolean;
}

const Sidebar = ({ drawerWidth, toggleDrawer, isOpen }: SidebarProps) => {
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='temporary'
                open={isOpen}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    'display': { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                <SidebarLinkList />
            </Drawer>
            <Drawer
                variant='permanent'
                sx={{
                    'display': { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
                open
            >
                <SidebarLinkList />
            </Drawer>
        </Box>
    );
};

export default Sidebar;
