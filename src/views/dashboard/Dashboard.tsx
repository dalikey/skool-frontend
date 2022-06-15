import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Calender from './Calender';
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
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const { data, isSuccess } = useGetAllShiftsQuery({
        isActive: false,
    });

    return (
        <Grid container columnSpacing={2} rowSpacing={2} direction={(isSmallScreen) ? 'column-reverse' : 'row'}>
            <Grid item xs={12} xl={10}>
                {data && isSuccess && (
                    <Calender
                        isSmall={isSmallScreen}
                        timestamps={getFormattedTimestamps(data?.result ?? [])}
                    />
                )}
            </Grid>
            <Grid item xs={12} xl={2}>
                <DashboardSidebar isSmall={isSmallScreen}/>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
