import { Add } from '@mui/icons-material';
import { Box, IconButton, Paper, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useGetAllCustomersQuery } from '../../api/customer/customerApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import { CustomerModel } from '../../models/customerModels';
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

const CustomerManagement = () => {
    const [tab, setTab] = useState<number>(0);

    const { data, isLoading } = useGetAllCustomersQuery();

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const handleClickCreate = () => {
        formDialog('Klant aanmaken', <CustomerForm />);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmDialog />
            <FormDialog />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                >
                    <Tab label='KLANTEN' />
                    <IconButton
                        onClick={() => handleClickCreate()}
                        aria-label='add'
                        color='primary'
                        sx={{ padding: 2, marginLeft: 'auto' }}
                    >
                        <Add>Add</Add>
                    </IconButton>
                </Tabs>
            </Box>
            <CustomerTable
                isLoading={isLoading}
                customers={data?.result as CustomerModel[]}
            />
        </Paper>
    );
};

export default CustomerManagement;
