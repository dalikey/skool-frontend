import {
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';

interface LinkItem {
    path: string;
    text: string;
    icon: JSX.Element;
}

interface SidebarLinkListProps {
    role: string | undefined;
}

const SidebarLinkList = ({ role }: SidebarLinkListProps) => {
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

    const ownerLinks: LinkItem[] = [
        {
            path: '/gebruikers-beheer',
            text: 'Gebruikersbeheer',
            icon: <SupervisedUserCircleIcon />,
        },
    ];

    const { pathname } = useLocation();

    return (
        <>
            <Toolbar sx={{ ml: '10px' }} disableGutters>
                <img
                    width='150px'
                    src='https://skoolworkshop.nl/wp-content/uploads/2020/06/Skool-Workshop_Logo.png'
                    alt='logo'
                />
            </Toolbar>
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
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{
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
            {role === 'owner' && (
                <List>
                    {ownerLinks.map((link) => (
                        <ListItem key={link.text} disablePadding>
                            <Link
                                to={link.path}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    width: '100%',
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon
                                        sx={{
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
            )}
        </>
    );
};

export default SidebarLinkList;
