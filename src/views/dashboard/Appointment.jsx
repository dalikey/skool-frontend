import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { Grid } from '@mui/material';

const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: '#f49700',
            borderRadius: '8px',
        }}
    >
        <Grid container>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    </Appointments.Appointment>
);

export default Appointment;
