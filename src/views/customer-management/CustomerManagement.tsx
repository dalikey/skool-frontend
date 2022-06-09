import { Add } from '@mui/icons-material';
import { Box, IconButton, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useGetAllCustomersQuery } from '../../api/customer/customerApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import { CustomerModel } from '../../models/customerModels';
import CustomerTable from './CustomerTable';

const CustomerManagement = () => {
    const [tab, setTab] = useState<number>(1);

    const { data, isLoading } = useGetAllCustomersQuery();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <IconButton aria-label="add" color="primary">
                <Add />
              </IconButton>
            <ConfirmDialog />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                >
                    <Tab label='KLANTEN' />
                    <Tab label='INACTIEF' />
                </Tabs>
            </Box>
            {tab === 1 ? (
                <CustomerTable isLoading={isLoading} customers={data?.result as CustomerModel[]}/>
            ) : (
                <CustomerTable isLoading={isLoading} customers={data?.result as CustomerModel[]}/>
            )}
        </Paper>
    );
};

export default CustomerManagement;
