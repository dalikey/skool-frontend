import { Button, DialogActions, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import { UserProfileModel } from '../../models/userModels';

interface ProfileFormProps {
    user: UserProfileModel;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
    const { close } = useFormDialogStore();

    const handleSubmit = (values): void => {
        close();
    };

    const formik = useFormik({
        initialValues: user,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '1280px' }}>
            <Grid container width='100%'>
                <Grid item md={6}>
                    <Grid container columnSpacing={4} rowSpacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id='emailAddress'
                                name='emailAddress'
                                label='E-mailadres'
                                value={formik.values.emailAddress}
                                onChange={formik.handleChange}
                                variant='standard'
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                id='firstName'
                                name='firstName'
                                label='Voornaam'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                id='lastName'
                                name='lastName'
                                label='Achternaam'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6}></Grid>
                <Grid item md={12}>
                    <DialogActions>
                        <DialogActions>
                            <Button onClick={close}>Annuleren</Button>
                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                autoFocus
                            >
                                Bevestigen
                            </Button>
                        </DialogActions>
                    </DialogActions>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProfileForm;
