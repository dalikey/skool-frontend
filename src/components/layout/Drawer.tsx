import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 225;

const Drawer = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen((open) => !open);
    };

    return (
        <>
            <Header
                drawerWidth={drawerWidth}
                toggleDrawer={handleDrawerToggle}
            />
            <Sidebar
                drawerWidth={drawerWidth}
                toggleDrawer={handleDrawerToggle}
                isOpen={open}
            />
        </>
    );
};

export default Drawer;
