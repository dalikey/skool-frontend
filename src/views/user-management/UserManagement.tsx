import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useGetAllUsersQuery } from '../../api/user/userApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import FormDialog from '../../components/dialog/FormDialog';
import { UserModel } from '../../models/userModels';
import RegistrationTable from './RegistrationTable';
import UserTable from './UserTable';

const getIsActiveValue = (tab: number): boolean | null => {
    if (tab === 1) {
        return null;
    }

    return tab === 0 ? true : false;
};

const UserManagement = () => {
    const [tab, setTab] = useState<number>(1);

    const { data, isLoading } = useGetAllUsersQuery({
        isActive: getIsActiveValue(tab),
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <FormDialog />
            <ConfirmDialog />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                >
                    <Tab label='GEBRUIKERS' />
                    <Tab label='REGISTRATIES' />
                    <Tab label='INACTIEF' />
                </Tabs>
            </Box>
            {tab === 1 ? (
                <RegistrationTable isLoading={isLoading} users={data?.result}/>
            ) : (
                <UserTable isLoading={isLoading} users={data?.result as UserModel[]}/>
            )}
        </Paper>
    );
};

export default UserManagement;
