import { Divider, Grid, Typography } from '@mui/material';

const AppointmentContent = ({ appointmentData }) => {
    const workshop = appointmentData.workshop;

    return (
        <Grid container paddingX={2} rowSpacing={1}>
            <Grid item xs={12}>
                <Typography
                    variant='subtitle1'
                    color='rgba(0, 0, 0, 0.54)'
                    mt={-1}
                >
                    {`${new Date(workshop.date).toLocaleDateString(
                        'nl-NL'
                    )} - Aantal: ${workshop.candidates.length} / ${
                        workshop.maximumParticipants
                    }`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
                    Klant
                </Typography>
                <Divider />
                <Typography py={1}>
                    {workshop.client.name} <br />
                    {workshop.client.contact.emailAddress} <br />
                    {`Tel: ${workshop.client.contact.phoneNumber}`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
                    Adres
                </Typography>
                <Divider />
                <Typography py={1}>
                    {`${workshop.location.address} - ${workshop.location.city}`}{' '}
                    <br />
                    {`${workshop.location.postalCode} - ${workshop.location.country}`}{' '}
                    <br />
                </Typography>
            </Grid>
            {workshop.extraInfo !== '' && (
                <Grid item xs={12}>
                    <Typography variant='h6' sx={{ fontSize: '1.125rem' }}>
                        Extra
                    </Typography>
                    <Divider />
                    <Typography py={1}>{workshop.extraInfo}</Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default AppointmentContent;
