import {
    useGetAllPersonalShiftsQuery,
    useGetAllShiftsQuery,
} from '../../api/shift/shiftApi';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Calender from './Calender';
import {
    WorkshopShiftModel,
    TimeStampModel,
} from '../../models/workshopShiftModels';
import DashboardSidebar from './DashboardSidebar';
import { useLocalStorage } from '../../app/useLocalStorage';
import { UserModel } from '../../models/userModels';

interface FormattedTimeStamp {
    startDate: string;
    endDate: string;
    title: string;
    workshop: WorkshopShiftModel;
    isPlanned: boolean;
}

const getFormattedTimestamps = (workshops, id): FormattedTimeStamp[] => {
    const timestamps: FormattedTimeStamp[] = [];
    workshops.forEach((workshop: any) => {
        const date = workshop.date.split('T')[0];
        const isPlanned = workshop.participants.some((participant) => participant.userId === id);
        workshop.timestamps.forEach((timestamp: TimeStampModel) => {
            timestamps.push({
                startDate: `${date}T${timestamp.startTime}`,
                endDate: `${date}T${timestamp.endTime}`,
                title: timestamp.title,
                isPlanned,
                workshop,
            });
        });
    });
    return timestamps;
};

const Dashboard = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const [currentUser] = useLocalStorage<UserModel>('user');

    const { data, isSuccess } = useGetAllPersonalShiftsQuery();

    return (
        <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            direction={isSmallScreen ? 'column-reverse' : 'row'}
        >
            <Grid item xs={12} xl={10}>
                {data && isSuccess && (
                    <Calender
                        isSmall={isSmallScreen}
                        timestamps={getFormattedTimestamps((data?.result ?? []), currentUser?._id)}
                    />
                )}
            </Grid>
            <Grid item xs={12} xl={2}>
                <DashboardSidebar
                    upComingWorkshops={(data?.result ?? []).filter((shift) =>
                        shift.participants.some(
                            (user) => user.userId === currentUser?._id
                        )
                    )}
                    isSmall={isSmallScreen}
                />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
