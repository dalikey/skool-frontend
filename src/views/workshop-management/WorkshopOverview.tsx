import { Paper } from '@mui/material';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import WorkshopForm from './WorkshopForm';

const WorkshopOverview = () => {
    const openWorkshopForm = () => {
        console.log('cunt')
        formDialog('Profiel bewerken', <WorkshopForm />);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <FormDialog />
            <button onClick={openWorkshopForm}>Add</button>
            {/* <WorkshopTable  /> */}
        </Paper>
    );
};

export default WorkshopOverview;
