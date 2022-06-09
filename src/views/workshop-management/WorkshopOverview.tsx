import { Box, Paper, Tab, Tabs } from '@mui/material';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';

const WorkshopOverview = () => {
    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmDialog />
            <button>Add</button>
            {/* <WorkshopTable  /> */}
        </Paper>
    );
};

export default WorkshopOverview;