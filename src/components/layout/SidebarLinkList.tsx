import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../../assets/logo.png';

interface LinkItem {
    path: string;
    text: string;
    icon: JSX.Element;
}

const LinkList = () => {
    const links: LinkItem[] = [
        {
            path: '/dashboard',
            text: 'Dashboard',
            icon: <DashboardIcon />,
        },
        {
            path: '/workshops',
            text: 'Workshops',
            icon: <SchoolIcon />,
        },
        {
            path: '/profiel',
            text: 'Profiel',
            icon: <PersonIcon />,
        },
    ];

    const { pathname } = useLocation();

    return (
        <>
            <Box pt='15px' textAlign='center' pr='15px'>
                <img width='150px' src={Logo} alt='logo' />
            </Box>
            <List>
                {links.map((link) => (
                    <ListItem key={link.text} disablePadding>
                        <Link
                            to={link.path}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                width: '100%',
                            }}
                        >
                            <ListItemButton sx={{ pl: '20px' }} disableGutters>
                                <ListItemIcon
                                    sx={{
                                        minWidth: '40px',
                                        color:
                                            pathname === link.path
                                                ? 'primary.main'
                                                : 'light',
                                    }}
                                >
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={link.text}
                                    sx={{
                                        color:
                                            pathname === link.path
                                                ? 'primary.main'
                                                : 'light',
                                    }}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default LinkList;
