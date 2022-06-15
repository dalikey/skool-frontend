import { Paper, Grid, Typography, Avatar } from '@mui/material';
import { useGetAllShiftsQuery } from '../../api/shift/shiftApi';
import { useGetPersonalProfileQuery } from '../../api/user/userApi';
import ProfilePicture from '../../assets/no_profile_picture.jpg';

const DashboardSidebar = ({ isSmall }) => {
    const { data: userData } = useGetPersonalProfileQuery();
    const user = userData?.result;

    const { data } = useGetAllShiftsQuery({
        isActive: false,
    });

    return (
        <Paper
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                height: '100%',
                paddingTop: 2,
                paddingX: 1,
            }}
        >
            <Grid container rowSpacing={3}>
                <Grid
                    item
                    xs={4}
                    xl={12}
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Avatar
                        alt='Profile picture'
                        src={ProfilePicture}
                        sx={{
                            width: 125,
                            height: 125,
                        }}
                    />
                    <Typography variant='h5' fontWeight='bold' pt={1}>{`${
                        user?.firstName ?? ''
                    } ${user?.lastName ?? ''}`}</Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={8}
                    xl={12}
                    pl={3}
                    rowSpacing={1}
                    columnSpacing={2}
                >
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
                <Grid
                    container
                    item
                    xs={8}
                    xl={12}
                    pl={3}
                    rowSpacing={1}
                    columnSpacing={2}
                >
                    <Grid item xs={12}>
                        <Typography variant='h6' pb={1}>
                            Aankomend
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        rowSpacing={1}
                        xs={8}
                        xl={12}
                        pl={2}
                        columnSpacing={2}
                    >
                        {data &&
                            data.result &&
                            data.result.map((workshop) => (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1'>
                                            Workshopdocent Vloggen
                                        </Typography>
                                        <Typography variant='subtitle2'>
                                            {new Date(
                                                workshop.date
                                            ).toLocaleDateString('nl-NL')}
                                        </Typography>
                                    </Grid>
                                </>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DashboardSidebar;
