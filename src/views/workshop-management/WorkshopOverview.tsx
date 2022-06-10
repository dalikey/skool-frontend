import { Stack, IconButton, Paper } from '@mui/material';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import WorkshopForm from './WorkshopForm';
import WorkshopTable from './WorkshopsTable';
import AddIcon from '@mui/icons-material/Add';

const WorkshopOverview = () => {
    const openWorkshopForm = () => {
        formDialog('Profiel bewerken', <WorkshopForm />);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <FormDialog />

            <Stack direction='row'>
                <WorkshopTable isLoading={false} />
                <IconButton color='primary' sx={{ padding: 2 }}>
                    <AddIcon onClick={openWorkshopForm}>Add</AddIcon>
                </IconButton>
            </Stack>
        </Paper>
    );
};

export default WorkshopOverview;
