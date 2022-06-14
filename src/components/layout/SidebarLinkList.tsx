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
import WorkIcon from '@mui/icons-material/Work';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Logo from '../../assets/logo.png';

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
            path: '/shifts',
            text: 'Diensten',
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
            path: '/workshopbeheer',
            text: 'Workshopbeheer',
            icon: <WorkIcon />,
        },
        {
            path: '/shiftbeheer',
            text: 'Shiftbeheer',
            icon: <EventNoteIcon/>
        },
        {
            path: '/klantenbeheer',
            text: 'Klantenbeheer',
            icon: <StoreRoundedIcon />,
        },
        {
            path: '/templatebeheer',
            text: 'Templatebeheer',
            icon: <StoreRoundedIcon/>
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
