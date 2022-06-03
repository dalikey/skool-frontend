import { Box, Tabs, Tab, Paper, TableCell } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useGetAllUsersQuery } from '../../api/user/userApi';
import CollapsibleRow from '../../components/table/CollapsibleRow';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';

function a11yProps(index: number) {
    return {
        'id': `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState<number>(2);

    const handleChange = (e: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const { data, isSuccess } = useGetAllUsersQuery({
        isActive: activeTab === 2 ? null : Boolean(activeTab),
    });

    console.log(Boolean(activeTab))

    return (
        <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    aria-label='user management table'
                >
                    <Tab label='GEBRUIKERS' {...a11yProps(1)} />
                    <Tab label='REGISTRATIES' {...a11yProps(2)} />
                    <Tab label='INACTIEF' {...a11yProps(0)} />
                </Tabs>
            </Box>
            <Box>
                {isSuccess && data?.result && (
                    <Table
                        columns={[
                            'Voornaam',
                            'Achternaam',
                            'E-mailadres',
                            'Rol',
                        ]}
                    >
                        {data.result.map((user) => (
                            <Row>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.emailAddress}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.isActive}</TableCell>
                            </Row>
                        ))}
                    </Table>
                )}
            </Box>
        </Paper>
    );
};

export default UserManagement;
