import { Button, Grid, Typography } from '@mui/material';
import { RetrievedWorkshopShiftModel } from '../../models/workshopShiftModels';
import {
    useSignInWorkshopMutation,
    useSignOutWorkshopMutation,
} from '../../api/shift/shiftApi';

import ConfirmDialog, {
    confirmDialog,
} from '../../components/dialog/ConfirmDialog';
import { CredentialsModel } from '../../models/authModels';
import { useLocalStorage } from '../../app/useLocalStorage';

interface ShiftDetailsProps {
    shift?: RetrievedWorkshopShiftModel;
    isParticipating?: boolean;
}

const ShiftDetails = ({ shift, isParticipating }: ShiftDetailsProps) => {
    const [signInWorkshop] = useSignInWorkshopMutation();

    const [signOutWorkshop] = useSignOutWorkshopMutation();

    const handleClickActivate = (
        workshopShift: RetrievedWorkshopShiftModel | undefined
    ): void => {
        if (workshopShift !== undefined) {
            confirmDialog(
                'Registratie bevestigen',
                `Weet u zeker dat u zich wilt inschrijven voor Workshopdocent ${workshopShift.workshop.name}?`,
                () => {
                    signInWorkshop(workshopShift._id);
                    setTimeout(() => window.location.reload(), 50);
                }
            );
        }
    };

    const [user] = useLocalStorage<CredentialsModel>('user');

    const handleClickDeActivate = (
        workshopShift: RetrievedWorkshopShiftModel | undefined
    ): void => {
        if (workshopShift !== undefined && user !== undefined) {
            confirmDialog(
                'Uitschrijven bevestigen',
                `Weet u zeker dat u zich wilt uitschrijven voor Workshopdocent ${workshopShift.workshop.name}?`,
                () => {
                    signOutWorkshop({
                        id: workshopShift._id,
                        user_id: user._id,
                    });
                    setTimeout(() => window.location.reload(), 50);
                }
            );
        }
    };

    return (
        <Grid container width='100%' p={3}>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>
                    Workshopdocent {shift?.workshop.name}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant={'h5'}>Datum & Workshoprondes</Typography>
                <Typography variant={'h6'}>
                    {new Date(shift?.date ?? '').toLocaleDateString('nl-NL')}{' '}
                </Typography>
                {shift?.timestamps &&
                    shift?.timestamps.map((timestamp) => (
                        <Typography key={timestamp.title}>
                            <span style={{ fontWeight: 'bold' }}>
                                {`${timestamp.title ?? ''}    `}
                            </span>
                            {timestamp.startTime} - {timestamp.endTime}
                        </Typography>
                    ))}
            </Grid>
            <Grid item xs={12} p={1}>
                <Typography variant={'h5'}>Onderwerp</Typography>
                <Typography>{shift?.workshop.content}</Typography>
            </Grid>
            <Grid item xs={12} p={1}>
                <Typography variant={'h5'}>Materiaal</Typography>
                <ul>
                    {shift?.workshop.materials &&
                        shift?.workshop.materials.map((material) => (
                            <li>{material}</li>
                        ))}
                    {shift?.workshop.materials.length === 0 && (
                        <li>Geen extra materiaal benodigd!</li>
                    )}
                </ul>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <iframe
                    title={'Location in Maps'}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCh26TeMpBSqb0qfOZwxcr_MMKDvGdUxF4&q=${shift?.location.address}, ${shift?.location.city}`}
                ></iframe>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>Adres</Typography>
                <Typography>
                    {shift?.location.address} <br />
                    {shift?.location.postalCode} {shift?.location.city} <br />
                    {shift?.location.country}
                </Typography>
            </Grid>
            {!isParticipating && (
                <Grid item xs={12} md={6} p={1}>
                    <ConfirmDialog />
                    <Button
                        variant='contained'
                        onClick={() => handleClickActivate(shift)}
                    >
                        Inschrijven
                    </Button>
                </Grid>
            )}

            {isParticipating && (
                <Grid item xs={12} md={6} p={1}>
                    <ConfirmDialog />
                    <Button
                        variant='contained'
                        onClick={() => handleClickDeActivate(shift)}
                    >
                        Uitschrijven
                    </Button>
                </Grid>
            )}
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>
                    Loon: € {shift?.total_Amount}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ShiftDetails;
