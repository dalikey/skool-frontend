import { Paper, Grid, Typography, Avatar, Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useGetPersonalProfileQuery } from '../../api/user/userApi';
import ProfilePicture from '../../assets/no_profile_picture.jpg';

const DashboardSidebar = () => {
    const { data: userData } = useGetPersonalProfileQuery();

    const user = userData?.result;

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
            <Grid container rowSpacing={2}>
                <Grid
                    item
                    xs={12}
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Avatar
                        alt='Profile picture'
                        src={ProfilePicture}
                        sx={{
                            width: 150,
                            height: 150,
                        }}
                    />
                    <Typography variant='h5' fontWeight='bold' pt={1}>{`${
                        user?.firstName ?? ''
                    } ${user?.lastName ?? ''}`}</Typography>
                    <Divider variant='middle' sx={{ width: '100%', pt: 1.5 }} />
                </Grid>
                <Grid container item pl={3} rowSpacing={1} columnSpacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Diensten</Typography>
                    </Grid>
                    <Grid item xs={2} display='flex' justifyContent='center'>
                        <Typography variant='subtitle1' fontWeight='bold'>
                            25
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='subtitle1'>Beschikbaar</Typography>
                    </Grid>
                    <Grid item xs={2} display='flex' justifyContent='center'>
                        <Typography variant='subtitle1' fontWeight='bold'>
                            5
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='subtitle1'>
                            In afwachting
                        </Typography>
                    </Grid>
                    <Grid item xs={2} display='flex' justifyContent='center'>
                        <Typography variant='subtitle1' fontWeight='bold'>
                            2
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='subtitle1'>Gepland</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DashboardSidebar;
