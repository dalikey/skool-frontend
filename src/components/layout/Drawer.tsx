import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocalStorage } from '../../app/useLocalStorage';
import { CredentialsModel } from '../../models/authModels';

const drawerWidth = 225;

const Drawer = () => {
    const [user] = useLocalStorage<CredentialsModel>('user');
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen((open) => !open);
    };

    return (
        <>
            <Header
                drawerWidth={drawerWidth}
                toggleDrawer={handleDrawerToggle}
                user={user}
            />
            <Sidebar
                drawerWidth={drawerWidth}
                toggleDrawer={handleDrawerToggle}
                isOpen={open}
                role={user?.role}
            />
        </>
    );
};

export default Drawer;
