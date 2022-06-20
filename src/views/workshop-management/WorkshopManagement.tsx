import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useGetAllWorkshopsQuery } from '../../api/workshop/workshopApi';
import { WorkshopModel } from '../../models/workshopModels';
import WorkshopTable from './WorkshopsTable';
import { formDialog } from '../../components/dialog/FormDialog';
import WorkshopForm from './WorkshopForm';
import AddIcon from '@mui/icons-material/Add';

const getIsActiveValue = (tab: number): boolean | null => {
    return tab === 0 ? true : false;
};

const WorkshopManagement = () => {
    const openWorkshopForm = () => {
        formDialog('Workshop toevoegen', <WorkshopForm />);
    };

    const [tab] = useState<number>(0);

    const { data, isLoading } = useGetAllWorkshopsQuery({
        isActive: getIsActiveValue(tab),
    });

    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={0} aria-label='basic tabs example'>
                        <Tab label='WORKSHOPS' />
                        <Tab
                            onClick={() => openWorkshopForm()}
                            aria-label='add'
                            sx={{ padding: 2, marginLeft: 'auto' }}
                            icon={<AddIcon color='primary' />}
                        />
                    </Tabs>
                </Box>
                <WorkshopTable
                    isLoading={isLoading}
                    workshops={data?.result as WorkshopModel[]}
                />
            </Paper>
        </>
    );
};

export default WorkshopManagement;
