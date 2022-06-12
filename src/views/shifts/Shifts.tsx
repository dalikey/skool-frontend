import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import ConfirmDialog from '../../components/dialog/ConfirmDialog';
import {RetrievedWorkshopShiftModel} from '../../models/workshopShiftModels';
import ShiftTable from './ShiftsTable';
import {CredentialsModel} from "../../models/authModels";
import {useLocalStorage} from "../../app/useLocalStorage";

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

    const enrolledShifts: RetrievedWorkshopShiftModel[] = [];
    const availableShifts: RetrievedWorkshopShiftModel[] = [];

    const [user] = useLocalStorage<CredentialsModel>('user');

    // @ts-ignore
    data?.result?.forEach((shift) => {
        const userIds = shift.candidates.map((candidate) => (
            candidate.userId
        ))
        if (userIds.includes(user?._id)) {
            enrolledShifts.push(shift);
        } else {
            availableShifts.push(shift);
        }
    })

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
                    isParticipating={false}
                    shifts={availableShifts as RetrievedWorkshopShiftModel[]}
                />
            ) : (<ShiftTable
                isLoading={isLoading}
                isParticipating={true}
                shifts={enrolledShifts as RetrievedWorkshopShiftModel[]}
            />)
            }
        </Paper>
    );
};

export default Shifts;
