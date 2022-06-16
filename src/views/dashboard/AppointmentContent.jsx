import { Divider, Grid, Typography } from '@mui/material';

const AppointmentContent = ({ appointmentData }) => {
    const { workshop: shift } = appointmentData;

    return (
        <Grid container paddingX={2} rowSpacing={1}>
            <Grid item xs={12}>
                <Typography
                    variant='subtitle1'
                    color='rgba(0, 0, 0, 0.54)'
                    mt={-1}
                >
                    {`${
                        shift?.date
                            ? new Date(shift.date).toLocaleDateString(
                                  'nl-NL'
                              )
                            : 'Onbekend'
                    } - Aantal: ${(shift?.participants ?? []).length} / ${
                        shift?.maximumParticipants ?? 1
                    }`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
                    Klant
                </Typography>
                <Divider />
                <Typography py={1}>
                    {shift?.client?.name ?? ''} <br />
                    {shift?.client?.contact?.emailAddress ?? ''} <br />
                    {`Tel: ${shift?.client?.contact?.phoneNumber ?? ''}`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
                    Adres
                </Typography>
                <Divider />
                <Typography py={1}>
                    {`${shift?.location?.address ?? ''} - ${
                        shift?.location?.city ?? ''
                    }`}{' '}
                    <br />
                    {`${shift?.location?.postalCode ?? ''} - ${
                        shift?.location?.country ?? ''
                    }`}{' '}
                    <br />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>Materialen</Typography>
                <Divider />
                {shift?.workshop?.materials.length > 0 ? (
                    shift?.workshop?.materials.map((material, i) => (
                        <Typography variant='body2' key={i}>
                            {material}
                        </Typography>
                    ))
                ) : (
                    <Typography variant='body2'>
                        Geen extra materialen vereist.
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <Typography>Medewerkers</Typography>
                <Divider />
                {shift?.participantUsers.length > 0 ? (
                    shift?.participantUsers.map((user, i) => (
                        <Typography variant='body2' key={i}>
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                    ))
                ) : (
                    <Typography variant='body2'>
                        Er zijn geen medewerkers
                    </Typography>
                )}
            </Grid>
            {shift?.extraInfo !== '' && (
                <Grid item xs={12}>
                    <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
                        Extra
                    </Typography>
                    <Divider />
                    <Typography py={1}>{shift?.extraInfo ?? ''}</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default AppointmentContent;
