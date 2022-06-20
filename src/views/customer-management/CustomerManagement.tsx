import { Add } from '@mui/icons-material';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useGetAllCustomersQuery } from '../../api/customer/customerApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import { CustomerModel } from '../../models/customerModels';
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

const CustomerManagement = () => {
    const openCustomerForm = () => {
        formDialog('Klant aanmaken', <CustomerForm />);
    };

    const { data, isLoading } = useGetAllCustomersQuery();

    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmDialog />
            <FormDialog />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={0} aria-label='basic tabs example'>
                    <Tab label='KLANTEN' />
                    <Tab
                        onClick={() => openCustomerForm()}
                        aria-label='add'
                        sx={{ padding: 2, marginLeft: 'auto' }}
                        icon={<Add color='primary' />}
                    />
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
