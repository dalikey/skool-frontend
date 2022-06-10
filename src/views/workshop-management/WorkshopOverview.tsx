import { Paper } from '@mui/material';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import WorkshopForm from './WorkshopForm';

const WorkshopOverview = () => {
    const openWorkshopForm = () => {
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
