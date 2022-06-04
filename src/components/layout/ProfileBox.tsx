import { Logout, Settings } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import { useState, MouseEvent, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileBox = () => {
    const [user] = useLocalStorage<CredentialsModel>('user', {} as any);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/sign-in');
    };

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link href='/profiel' underline='none'>
                    <MenuItem>
                        <Avatar /> {user.firstName + ' ' + user.lastName}
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Instellingen
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Uitloggen
                </MenuItem>
            </Menu>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Tooltip title='Account instellingen'>
                    <ListItem disablePadding onClick={handleClick}>
                        <IconButton
                            size='small'
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                {user.firstName.charAt(0)}
                                {user.lastName.charAt(0)}
                            </Avatar>
                        </IconButton>
                    </ListItem>
                </Tooltip>
            </Box>
        </>
    );
};

export default ProfileBox;
