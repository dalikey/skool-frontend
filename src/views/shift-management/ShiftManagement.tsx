import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import { AddShiftForm } from '../../views/shift-management/AddShiftForm';

const ShiftManagement = () => {
    const openShiftForm = () => {
        formDialog('Shift toevoegen', <AddShiftForm />);
    };

    return (
        <>
            <FormDialog />
            <Fab onClick={openShiftForm}>
                <Add></Add>
            </Fab>
        </>
    );
};

export default ShiftManagement;
