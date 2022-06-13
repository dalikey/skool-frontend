import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import { Grid } from '@mui/material';
import Calender from './Calender';

const Dashboard = () => {
    const { data } = useGetAllShiftsQuery({
        isActive: true,
    });

    console.log(data);

    return (
        <Grid container>
            <Grid item md={9.5}>
                <Calender />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
