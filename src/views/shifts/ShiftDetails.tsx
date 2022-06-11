import { Button, Grid, Typography } from '@mui/material';
import {
    RetrievedWorkshopShiftModel,
    WorkshopShiftModel,
} from '../../models/workshopShiftModels';
import { useSignInWorkshopMutation } from '../../api/workshop/workshopApi';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import ConfirmDialog, {
    confirmDialog,
} from '../../components/dialog/ConfirmDialog';

interface ShiftDetailsProps {
    shift?: RetrievedWorkshopShiftModel;
}

const ShiftDetails = ({ shift }: ShiftDetailsProps) => {
    const [signInWorkshop, { isLoading: isActivateLoading }] =
        useSignInWorkshopMutation();
    const { close } = useFormDialogStore();

    const handleClickActivate = (workshopShift: WorkshopShiftModel): void => {
        confirmDialog(
            'Registratie goedkeuren',
            `Weet u zeker dat u zich wilt inschrijven voor ${workshopShift.workshopId}?`,
            () => signInWorkshop(workshopShift.clientId)
        );
    };

    return (
        <Grid container width='100%' p={3}>
            <Grid item xs={12} md={6} p={1}>
                {/* <Typography variant="h5">Workshopdocent {shift?.workshop[0].name}</Typography> */}
                <Typography variant='h5'>Workshopdocent Graffiti</Typography>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography>
                    {new Date(shift?.date ?? '').toLocaleDateString('nl-NL')}{' '}
                    13:00 - 15:00
                </Typography>
            </Grid>
            <Grid item xs={12} p={1}>
                <Typography>Onderwerp - type</Typography>
            </Grid>
            <Grid item xs={12} p={1}>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    dolor laborum, voluptates expedita eum ab facere in maxime
                    eveniet perferendis deleniti placeat, magnam necessitatibus
                    quas deserunt. Distinctio asperiores quo eligendi!Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Non dolor
                    laborum, voluptates expedita eum ab facere in maxime eveniet
                    perferendis deleniti placeat, magnam necessitatibus quas
                    deserunt. Distinctio asperiores quo eligendi!Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Non dolor
                    laborum, voluptates expedita eum ab facere in maxime eveniet
                    perferendis deleniti placeat, magnam necessitatibus quas
                    deserunt. Distinctio asperiores quo eligendi!
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography>GOOGLE MAPS IMPLEMENTATIE</Typography>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>Adres</Typography>
                <Typography>
                    {shift?.location.address} <br />
                    {shift?.location.postalCode} {shift?.location.city} <br />
                    {shift?.location.country}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <ConfirmDialog />
                <Button
                    variant='contained'
                    // onClick={() => handleClickActivate(shift)}
                >
                    Inschrijven
                </Button>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
                <Typography variant='h5'>
                    Loon: € {shift?.total_Amount}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ShiftDetails;
