import * as React from 'react';
import { useLocalStorage } from '../../app/useLocalStorage';
import { CredentialsModel } from '../../models/authModels';
import {
    Tab,
    Tabs,
    Typography,
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
} from '@mui/material';
import {
    Check as CheckIcon,
    Delete as DeleteIcon,
    Restore as RestoreIcon,
} from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const ApproveUser = () => {
    const [user] = useLocalStorage<CredentialsModel>('user', {} as any);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                >
                    <Tab label='Alle gebruikers' {...a11yProps(0)} />
                    <Tab label='Geaccepteerde gebruikers' {...a11yProps(1)} />
                    <Tab label='Geweigerde gebruikers' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            {user.firstName + ' ' + user.lastName}
                        </Typography>
                        <Typography variant='body2'>Placeholder</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained'>
                            {<CheckIcon />}
                        </Button>
                        <Button size='small' variant='contained'>
                            {<DeleteIcon />}
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            {user.firstName + ' ' + user.lastName}
                        </Typography>
                        <Typography variant='body2'>Placeholder</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained'>
                            {<CheckIcon />}
                        </Button>
                        <Button size='small' variant='contained'>
                            {<DeleteIcon />}
                        </Button>
                    </CardActions>
                </Card>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            {user.firstName + ' ' + user.lastName}
                        </Typography>
                        <Typography variant='body2'>Placeholder</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained'>
                            {<RestoreIcon />}
                        </Button>
                    </CardActions>
                </Card>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            {user.firstName + ' ' + user.lastName}
                        </Typography>
                        <Typography variant='body2'>Placeholder</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' variant='contained'>
                            {<RestoreIcon />}
                        </Button>
                    </CardActions>
                </Card>
            </TabPanel>
        </Box>
    );
};

export default ApproveUser;
