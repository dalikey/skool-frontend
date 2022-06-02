import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocalStorage } from '../../app/useLocalStorage';
import { CredentialsModel } from '../../models/authModels';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
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
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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
                {user.firstName + ' ' + user.lastName}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {user.firstName + ' ' + user.lastName}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {user.firstName + ' ' + user.lastName}
            </TabPanel>
        </Box>
    );
};

export default ApproveUser;
