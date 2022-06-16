import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { Grid } from '@mui/material';

const Appointment = ({ children, style, ...restProps }) => {
    const { data } = restProps;

    return (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: data.isPlanned ? '#f49700' : '#fbdfb2',
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
};

export default Appointment;
