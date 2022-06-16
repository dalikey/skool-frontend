import {Box, IconButton, Paper, Tab, Tabs} from '@mui/material';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import { AddShiftForm } from '../../views/shift-management/AddShiftForm';
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import ShiftsManagementTable from "../shift-management/ShiftsManagementTable";
import {RetrievedWorkshopShiftModel} from "../../models/workshopShiftModels";
import { useGetAllShiftsAdminQuery } from "../../api/shift/shiftApi";
import AddIcon from "@mui/icons-material/Add";

const ShiftManagement = () => {
    const openShiftForm = () => {
        formDialog('Shift toevoegen', <AddShiftForm />);
    };

    const { data, isLoading } = useGetAllShiftsAdminQuery({
        isActive: true,
    });

    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmDialog />
            <FormDialog />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={0}>
                    <Tab label='ALLE DIENSTEN' />
                    <IconButton
                        onClick={openShiftForm}
                        color='primary'
                        sx={{ padding: 2, marginLeft: 'auto' }}
                    >
                        <AddIcon>Add</AddIcon>
                    </IconButton>
                </Tabs>

            </Box>
                <ShiftsManagementTable
                    isLoading={isLoading}
                    shifts={data?.result as RetrievedWorkshopShiftModel[]}
                />

        </Paper>
    );
};

export default ShiftManagement;
