import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useGetAllWorkshopsQuery } from '../../api/workshop/workshopApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import { WorkshopModel } from '../../models/workshopModels';
import WorkshopTable from './WorkshopsTable';

const getIsActiveValue = (tab: number): boolean | null => {
    return tab === 0 ? true : false;
};

const WorkshopManagement = () => {
    const [tab, setTab] = useState<number>(1);

    const { data, isLoading } = useGetAllWorkshopsQuery({
        isActive: getIsActiveValue(tab),
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmDialog />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                >
                    <Tab label='ACTIEVE WORKSHOPS' />
                    <Tab label='INACTIEVE WORKSHOPS' />
                </Tabs>
            </Box>
            <WorkshopTable
                isLoading={isLoading}
                workshops={data?.result as WorkshopModel[]}
            />
        </Paper>
    );
};

export default WorkshopManagement;