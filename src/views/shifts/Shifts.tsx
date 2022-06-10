import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import {RetrievedWorkshopShiftModel} from '../../models/workshopShiftModels';
import ShiftTable from './ShiftsTable';

const getIsActiveValue = (tab: number): boolean | null => {
    return tab === 0;
};

const Shifts = () => {
    const [tab, setTab] = useState<number>(0);

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
                    <Tab label='BESCHIKBARE WORKSHOPS' />
                    <Tab label='AANGEMELDDE WORKSHOPS' />
                </Tabs>
            </Box>
            {tab === 0 ? (
                <ShiftTable
                    isLoading={isLoading}
                    shifts={data?.result as RetrievedWorkshopShiftModel[]}
                />
            ) : (<ShiftTable
                isLoading={isLoading}
                //shifts={myShifts as RetrievedWorkshopShiftModel[]}
            />)
            }
        </Paper>
    );
};

export default Shifts;
