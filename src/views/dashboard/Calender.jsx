import { Paper } from '@mui/material';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Appointment from './Appointment';
import { useMediaQuery } from '@mui/material';

const Calender = ({ timestamps }) => {
    const isSmallScreen = useMediaQuery('(max-width:1300px)');

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
            <Scheduler data={timestamps} locale='nl-NL' firstDayOfWeek={1}>
                <ViewState
                    defaultCurrentDate={new Date()}
                    currentViewName={isSmallScreen ? 'Day' : 'Week'}
                />
                <WeekView startDayHour={6} endDayHour={21} cellDuration={60} />
                <DayView startDayHour={6} endDayHour={21} cellDuration={60} />
                <Toolbar />
                <DateNavigator />
                <TodayButton messages={{ today: 'Vandaag' }} />
                <Appointments appointmentComponent={Appointment} />
            </Scheduler>
        </Paper>
    );
};

export default Calender;
