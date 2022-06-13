import { Paper } from '@mui/material';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Appointment from './Appointment';

const schedulerData = [
    {
        startDate: '2022-06-13T09:45',
        endDate: '2022-06-13T11:00',
        title: 'Meeting',
    },
    {
        startDate: '2022-06-14T13:45',
        endDate: '2022-06-14T16:00',
        title: 'Meeting',
    },
];

const Calender = () => {
    return (
        <Paper
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                height: '85vh',
                paddingTop: 2,
                paddingX: 1,
            }}
        >
            <Scheduler data={schedulerData} locale='nl-NL' firstDayOfWeek={1}>
                <ViewState defaultCurrentDate={new Date()} />
                <WeekView startDayHour={6} endDayHour={21} cellDuration={60} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments appointmentComponent={Appointment} />
            </Scheduler>
        </Paper>
    );
};

export default Calender;
