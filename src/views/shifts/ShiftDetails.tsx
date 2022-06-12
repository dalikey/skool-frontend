import { Button, Grid, Typography } from '@mui/material';
import {
    RetrievedWorkshopShiftModel,
} from '../../models/workshopShiftModels';
import { useSignInWorkshopMutation } from '../../api/workshop/workshopApi';

import ConfirmDialog, {
    confirmDialog,
} from '../../components/dialog/ConfirmDialog';

interface ShiftDetailsProps {
    shift?: RetrievedWorkshopShiftModel;
    isParticipating?: boolean
}



const ShiftDetails = ({ shift, isParticipating }: ShiftDetailsProps) => {
    const [signInWorkshop] =
        useSignInWorkshopMutation();

    const handleClickActivate = (workshopShift: RetrievedWorkshopShiftModel | undefined): void => {
        if (workshopShift !== undefined) {
        confirmDialog(
            'Registratie bevestigen',
            `Weet u zeker dat u zich wilt inschrijven voor Workshopdocent ${workshopShift.workshop.name}?`,
            () => {signInWorkshop(workshopShift._id); setTimeout(() => window.location.reload(),50) ;}
        );

    }
    };

    return (
        <Grid container width='100%' p={3}>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>Workshopdocent {shift?.workshop.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant={'h5'}>Datum & Tijdschema</Typography>
                <Typography variant={'h6'}>
                    {new Date(shift?.date ?? '').toLocaleDateString('nl-NL')}{' '}
                </Typography>
                {shift?.timestamps && shift?.timestamps.map((timestamp) => (
                    <Typography>{timestamp.startTime} - {timestamp.endTime}</Typography>
                ))}
            </Grid>
            <Grid item xs={12} p={1}>
                <Typography variant={'h5'}>Onderwerp</Typography>
                <Typography>
                    {shift?.workshop.content}
                </Typography>
            </Grid>
            <Grid item xs={12} p={1}>
                <Typography
                variant={'h5'}>
                    Materiaal
                </Typography>
                <Typography>
                    {shift?.workshop.materials ?? 'Geen extra materiaal benodigd!'}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <iframe title={'Location in Maps'} src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCh26TeMpBSqb0qfOZwxcr_MMKDvGdUxF4&q=${shift?.location.address}, ${shift?.location.city}`}></iframe>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>Adres</Typography>
                <Typography>
                    {shift?.location.address} <br />
                    {shift?.location.postalCode} {shift?.location.city} <br />
                    {shift?.location.country}
                </Typography>
            </Grid>
            {!isParticipating &&
                <Grid item xs={12} md={6} p={1}>

                    <ConfirmDialog/>
                    <Button
                        variant='contained'
                        onClick={() => handleClickActivate(shift)}
                    >
                        Inschrijven
                    </Button>
                </Grid>
            }

            {/*{isParticipating &&
                <Grid item xs={12} md={6} p={1}>

                    <ConfirmDialog/>
                    <Button
                        variant='contained'
                        onClick={() => handleClickDeActivate(shift)}
                    >
                        Uitschrijven
                    </Button>
                </Grid>
            }*/}
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>
                    Loon: € {shift?.total_Amount}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ShiftDetails;
