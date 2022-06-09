import { Button, DialogActions, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import { UserProfileModel } from '../../models/userModels';
import ProfileFormPersonal from './components/ProfileFormPersonal';
import Accordion from '../../components/accordion/Accordion';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ProfileFormAddress from './components/ProfileFormAddress';
import ProfileFormPreference from './components/ProfileFormPreference';
import ProfileFormDetails from './components/ProfileFormDetails';
import PaymentIcon from '@mui/icons-material/Payment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ProfileFormTransport from './components/ProfileFormTransport';
import { UserUpdateSchema } from '../../schemas/userSchemas';
import { useUpdateUserProfileMutation } from '../../api/user/userApi';

interface ProfileFormProps {
    user: UserProfileModel;
}

interface PasswordBody {
    passwordInfo: {
        password: string;
        passwordConfirm: string;
        currentPassword: string;
    }
}

type ProfileFormValues = UserProfileModel & PasswordBody;

const ProfileForm = ({ user }: ProfileFormProps) => {
    const { close } = useFormDialogStore();

    const [updateUser] = useUpdateUserProfileMutation();

    const handleSubmit = (values): void => {
        updateUser(values);
        close();
    };

    const formik = useFormik({
        initialValues: user as ProfileFormValues,
        validateOnChange: false,
        validationSchema: UserUpdateSchema,
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '1000px' }}>
            <Grid container columnSpacing={4} alignItems='flex-start'>
                <Grid item container md={6} rowSpacing={1} columnSpacing={2}>
                    <ProfileFormPersonal formik={formik} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Accordion title='Adres' icon={<FmdGoodIcon />}>
                        <ProfileFormAddress formik={formik} />
                    </Accordion>
                    <Accordion title='Voorkeuren' icon={<ThumbUpIcon />}>
                        <ProfileFormPreference formik={formik} />
                    </Accordion>
                    <Accordion title='Transport' icon={<DirectionsCarIcon />}>
                        <ProfileFormTransport formik={formik} />
                    </Accordion>
                    <Accordion title='Gegevens' icon={<PaymentIcon />}>
                        <ProfileFormDetails formik={formik} />
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <DialogActions>
                        <DialogActions
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {' '}
                            <TextField
                                id='passwordInfo.currentPassword'
                                name='passwordInfo.currentPassword'
                                label='Huidig wachtwoord'
                                type='password'
                                value={
                                    formik.values.passwordInfo
                                        .currentPassword ?? ''
                                }
                                onChange={formik.handleChange}
                                variant='standard'
                                sx={{ mt: -2 }}
                                error={
                                    formik.touched.passwordInfo
                                        ?.currentPassword &&
                                    Boolean(
                                        formik.errors.passwordInfo
                                            ?.currentPassword
                                    )
                                }
                                helperText={
                                    formik.touched.passwordInfo
                                        ?.currentPassword &&
                                    formik.errors.passwordInfo?.currentPassword
                                }
                            />
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
