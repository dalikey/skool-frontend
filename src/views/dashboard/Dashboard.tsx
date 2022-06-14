import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import { Grid } from '@mui/material';
import Calender from './Calender';
import { useEffect } from 'react';
import { WorkshopShiftModel, TimeStampModel } from '../../models/workshopShiftModels';

interface FormattedTimeStamp {
    startDate: string;
    endDate: string;
    title: string;
}

const getFormattedTimestamps = (workshops): FormattedTimeStamp[] => {
    const timestamps: FormattedTimeStamp[] = [];
    workshops.forEach((workshop: any) => {
        const date = workshop.date.split('T')[0];
        workshop.timestamps.forEach((timestamp: TimeStampModel) => {
            timestamps.push({
                startDate: `${date}T${timestamp.startTime}`,
                endDate: `${date}T${timestamp.endTime}`,
                title: timestamp.title,
            });
        });
    });
    return timestamps;
};

const Dashboard = () => {
    const { data, isSuccess } = useGetAllShiftsQuery({
        isActive: false,
    });

    return (
        <Grid container>
            <Grid item md={9.5}>
                {data && isSuccess && <Calender timestamps={getFormattedTimestamps(data?.result ?? [])} />}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
