import { Box, Drawer } from '@mui/material';
import SidebarLinkList from './SidebarLinkList';

interface SidebarProps {
    drawerWidth: number;
    toggleDrawer: () => void;
    isOpen: boolean;
    role: string | undefined;
}

const Sidebar = ({ drawerWidth, toggleDrawer, isOpen, role }: SidebarProps) => {
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
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                <SidebarLinkList role={role}/>
            </Drawer>
            <Drawer
                variant='permanent'
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
                open
            >
                <SidebarLinkList role={role}/>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
