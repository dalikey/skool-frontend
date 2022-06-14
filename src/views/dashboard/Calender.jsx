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

const Calender = ({ timestamps }) => {

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
                <ViewState defaultCurrentDate={new Date()} />
                <WeekView startDayHour={6} endDayHour={21} cellDuration={60} />
                <Toolbar />
                <DateNavigator />
                <TodayButton messages={{today: 'Vandaag'}}/>
                <Appointments appointmentComponent={Appointment} />
            </Scheduler>
        </Paper>
    );
};

export default Calender;
