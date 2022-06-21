import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { RetrievedWorkshopShiftModel } from '../../models/workshopShiftModels';
import {
    useGetAllPersonalShiftsQuery,
    useGetAllShiftsQuery,
} from '../../api/shift/shiftApi';
import { useLocalStorage } from '../../app/useLocalStorage';
import { UserModel } from '../../models/userModels';

interface DashboardHeaderProps {
    upcomingShift: RetrievedWorkshopShiftModel | undefined;
}

const DashboardHeader = ({ upcomingShift }: DashboardHeaderProps) => {
    const [user] = useLocalStorage<UserModel>('user');
    const { data: personalData } = useGetAllPersonalShiftsQuery();
    const { data: allShiftsData } = useGetAllShiftsQuery({ isActive: true });

    const enrolledShifts: RetrievedWorkshopShiftModel[] = [];
    const availableShifts: RetrievedWorkshopShiftModel[] = [];

    // @ts-ignore
    (allShiftsData?.result ?? []).forEach((shift) => {
        const candidateUserIds = shift.candidates.map(
            (candidate) => candidate.userId
        );
        const participantUserIds = shift.participants.map(
            (participant) => participant.userId
        );
        if (
            candidateUserIds.includes(user?._id) ||
            participantUserIds.includes(user?._id)
        ) {
            enrolledShifts.push(shift);
        } else {
            availableShifts.push(shift);
        }
    });

    const openCount = availableShifts.length;
    const pendingCount = enrolledShifts.length;
    const confirmedCount = (personalData?.result ?? []).filter((shift) =>
        shift.participants.some((u) => u.userId === user?._id)
    ).length;

    return (
        <Grid container spacing={2}>
            <Grid item lg={7} xs={12}>
                <Paper
                    sx={{
                        backgroundColor: '#fff',
                        px: 2,
                        py: 1,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Grid container columnSpacing={1} rowSpacing={1}>
                        <Grid item xs={12} lg={6}>
                            <Stack spacing={1}>
                                <Box display='flex'>
                                    <Typography
                                        variant='subtitle1'
                                        fontWeight='bold'
                                    >
                                        {upcomingShift?.workshop?.name ?? ''}
                                    </Typography>
                                    <Typography
                                        variant='subtitle1'
                                        color='rgba(0, 0, 0, 0.54)'
                                        pl={2}
                                    >
                                        {upcomingShift?.date
                                            ? new Date(
                                                  upcomingShift?.date
                                              ).toLocaleDateString('nl-NL')
                                            : ''}
                                    </Typography>
                                </Box>
                                <Typography>Materialen</Typography>
                                {(upcomingShift?.workshop?.materials ?? [])
                                    .length > 0 ? (
                                    upcomingShift?.workshop?.materials.map(
                                        (material: string, i) => (
                                            <Typography variant='body2' key={i}>
                                                {material}
                                            </Typography>
                                        )
                                    )
                                ) : (
                                    <Typography variant='body2'>
                                        Geen extra materialen vereist.
                                    </Typography>
                                )}
                            </Stack>
                        </Grid>
                        <Grid container item xs={12} lg={6}>
                            <Grid item xs={12} textAlign='center'>
                                <iframe
                                    title='Location in Maps'
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCh26TeMpBSqb0qfOZwxcr_MMKDvGdUxF4&q=${upcomingShift?.location.address}, ${upcomingShift?.location.city}`}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item lg={5} xs={12}>
                <Paper
                    sx={{
                        backgroundColor: '#fff',
                        px: 2,
                        py: 3,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Typography variant='subtitle1' fontWeight='bold'>
                        Diensten
                    </Typography>
                    <Divider />
                    <Box
                        width='100%'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        height='100%'
                    >
                        <Box textAlign='center'>
                            <Box>
                                <Typography fontWeight='bold'>
                                    {openCount}
                                </Typography>
                            </Box>
                            <Typography fontWeight='bold'>
                                Openstaand
                            </Typography>
                        </Box>
                        <Box textAlign='center' px={5}>
                            <Box>
                                <Typography fontWeight='bold'>
                                    {pendingCount}
                                </Typography>
                            </Box>
                            <Typography fontWeight='bold'>Aangemeld</Typography>
                        </Box>
                        <Box textAlign='center'>
                            <Box>
                                <Typography fontWeight='bold'>
                                    {confirmedCount}
                                </Typography>
                            </Box>
                            <Typography fontWeight='bold'>Bevestigd</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DashboardHeader;
