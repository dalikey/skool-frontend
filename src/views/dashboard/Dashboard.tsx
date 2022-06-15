import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import { Grid } from '@mui/material';
import Calender from './Calender';
import { useEffect } from 'react';
import {
    WorkshopShiftModel,
    TimeStampModel,
} from '../../models/workshopShiftModels';
import DashboardSidebar from './DashboardSidebar';

interface FormattedTimeStamp {
    startDate: string;
    endDate: string;
    title: string;
    workshop: WorkshopShiftModel;
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
                workshop,
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
        <Grid container columnSpacing={2}>
            <Grid item xs={12} md={10}>
                {data && isSuccess && (
                    <Calender
                        timestamps={getFormattedTimestamps(data?.result ?? [])}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={2}>
                <DashboardSidebar />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
