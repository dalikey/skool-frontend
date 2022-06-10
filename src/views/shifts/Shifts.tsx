import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import { useGetAllWorkshopsQuery } from '../../api/workshop/workshopApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import { WorkshopShiftModel } from '../../models/workshopShiftModels';
import ShiftTable from './ShiftsTable';

const getIsActiveValue = (tab: number): boolean | null => {
    return tab === 0 ? true : false;
};

const Shifts = () => {
    const [tab, setTab] = useState<number>(1);

    const { data, isLoading } = useGetAllShiftsQuery({
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
            <ShiftTable
                isLoading={isLoading}
                shifts={data?.result as WorkshopShiftModel[]}
            />
        </Paper>
    );
};

export default Shifts;
