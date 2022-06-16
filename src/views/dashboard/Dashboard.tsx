import { useGetAllPersonalShiftsQuery } from '../../api/shift/shiftApi';
import { Grid } from '@mui/material';
import Calender from './Calender';
import {
    WorkshopShiftModel,
    TimeStampModel,
    RetrievedWorkshopShiftModel,
} from '../../models/workshopShiftModels';
import { useLocalStorage } from '../../app/useLocalStorage';
import { UserModel } from '../../models/userModels';
import DashboardHeader from './DashboardHeader';

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
        const isPlanned = workshop.participants.some(
            (participant) => participant.userId === id
        );
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

const getUpcomingShift = (shifts: RetrievedWorkshopShiftModel[]): RetrievedWorkshopShiftModel | undefined => {
    const sortedShifts = [...shifts].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return sortedShifts[0];
};

const Dashboard = () => {
    const [currentUser] = useLocalStorage<UserModel>('user');

    const { data, isSuccess } = useGetAllPersonalShiftsQuery();

    return (
        <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12}>
                <DashboardHeader upcomingShift={getUpcomingShift(data?.result ?? [])} />
            </Grid>
            <Grid item xs={12}>
                {data && isSuccess && (
                    <Calender
                        timestamps={getFormattedTimestamps(
                            data?.result ?? [],
                            currentUser?._id
                        )}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
