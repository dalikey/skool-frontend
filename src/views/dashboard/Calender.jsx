import { Paper } from '@mui/material';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    DayView,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { useMediaQuery } from '@mui/material';
import Appointment from './Appointment';
import AppointmentContent from './AppointmentContent';
import { useState } from 'react';
import AppointmentHeader from './AppointmentHeader';

const Calender = ({ timestamps }) => {
    const [visible, setVisible] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:1260px)');

    const getHeader = (props) => {
        return (
            <AppointmentHeader
                {...props}
                toggleVisibilty={() => setVisible((prev) => !prev)}
            />
        );
    };

    return (
        <Paper
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                height: '90vh',
                paddingTop: 2,
                paddingX: 1,
            }}
        >
            <Scheduler data={timestamps} locale='nl-NL' firstDayOfWeek={1}>
                <ViewState
                    defaultCurrentDate={new Date()}
                    currentViewName={isSmallScreen ? 'Day' : 'Week'}
                />
                <WeekView startDayHour={5} endDayHour={21} cellDuration={60} />
                <DayView startDayHour={5} endDayHour={21} cellDuration={60} />
                <Toolbar />
                <DateNavigator />
                <TodayButton messages={{ today: 'Vandaag' }} />
                <Appointments appointmentComponent={Appointment} />
                <AppointmentTooltip
                    showCloseButton
                    visible={visible}
                    onVisibilityChange={() => setVisible((prev) => !prev)}
                    headerComponent={getHeader}
                    contentComponent={AppointmentContent}
                />
            </Scheduler>
        </Paper>
    );
};

export default Calender;
