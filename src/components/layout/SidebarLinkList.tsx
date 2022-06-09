import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../../assets/logo.png';
import {Work} from "@mui/icons-material";

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

    const adminLinks: LinkItem[] = [
        {
            path: '/gebruikersbeheer',
            text: 'Gebruikersbeheer',
            icon: <SupervisedUserCircleIcon />,
        },
        {
            path: '/shiftbeheer',
            text: 'Shiftbeheer',
            icon: <Work/>
        },
    ];

    const { pathname } = useLocation();

    return (
        <Box>
            <Box pt='15px' pl={2}>
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
                            <ListItemButton sx={{pl: 2}} disableGutters>
                                <ListItemIcon
                                    sx={{
                                        minWidth: '40px',
                                        color:
                                            pathname === link.path
                                                ? 'primary.main'
                                                : 'black',
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
                                                : 'black',
                                    }}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            {role === 'owner' && (
                <>
                    <Box mt={5} pl={2}>
                        <Typography variant='subtitle1' color='secondary'>
                            Admin
                        </Typography>
                        <Divider variant='middle' sx={{ ml: 0 }} />
                    </Box>
                    <List>
                        {adminLinks.map((link) => (
                            <ListItem key={link.text} disablePadding>
                                <Link
                                    to={link.path}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        width: '100%',
                                    }}
                                >
                                    <ListItemButton sx={{pl: 2}} disableGutters>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: '40px',
                                                color:
                                                    pathname === link.path
                                                        ? 'primary.main'
                                                        : 'black',
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
                                                        : 'black',
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
};

export default SidebarLinkList;
