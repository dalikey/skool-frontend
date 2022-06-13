import {
    Appointments,
  } from '@devexpress/dx-react-scheduler-material-ui';

const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: '#f49700',
            borderRadius: '8px',
        }}
    >
        {children}
    </Appointments.Appointment>
);

export default Appointment;