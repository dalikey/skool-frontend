import { Box, Paper, Tab, Tabs, IconButton } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
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

    const [tab, setTab] = useState<number>(1);

    const { data, isLoading } = useGetAllWorkshopsQuery({
        isActive: getIsActiveValue(tab),
    });

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tab}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab label='ACTIEVE WORKSHOPS' />
                        <Tab label='INACTIEVE WORKSHOPS' />
                        <IconButton
                            onClick={openWorkshopForm}
                            color='primary'
                            sx={{ padding: 2, marginLeft: 'auto' }}
                        >
                            <AddIcon>Add</AddIcon>
                        </IconButton>
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
