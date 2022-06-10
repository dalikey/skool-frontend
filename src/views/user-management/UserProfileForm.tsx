import {
    Grid,
    TextField,
    Button,
    DialogActions,
    CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} from '../../api/user/userApi';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import { UserUpdateSchema } from '../../schemas/userSchemas';
import Accordion from '../../components/accordion/Accordion';
import ProfileFormAddress from '../profile/components/ProfileFormAddress';
import ProfileFormDetails from '../profile/components/ProfileFormDetails';
import ProfileFormPersonal from '../profile/components/ProfileFormPersonal';
import ProfileFormPreference from '../profile/components/ProfileFormPreference';
import ProfileFormTransport from '../profile/components/ProfileFormTransport';
import ProfileFormAdmin from '../profile/components/ProfileFormAdmin';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PaymentIcon from '@mui/icons-material/Payment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { defaultUserProfile } from '../../models/userModels';
import LockIcon from '@mui/icons-material/Lock';

interface UserProfileFormProps {
    id: string;
}

const UserProfileForm = ({ id }: UserProfileFormProps) => {
    const { close } = useFormDialogStore();

    const [updateUser] = useUpdateUserProfileMutation();
    const { data, isSuccess, isLoading } = useGetUserProfileQuery(id);

    const handleSubmit = (values): void => {
        updateUser(values);
        close();
    };

    const formik = useFormik({
        initialValues: {
            ...defaultUserProfile,
            ...data?.result,
            passwordInfo: {
                password: '',
                confirmPassword: '',
                currentPassword: '',
            },
        },
        enableReinitialize: true,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    return (
        <>
            {isSuccess && data && (
                <form
                    onSubmit={formik.handleSubmit}
                    style={{ maxWidth: '1000px' }}
                >
                    <Grid
                        container
                        columnSpacing={4}
                        rowSpacing={2}
                        alignItems='flex-start'
                    >
                        <Grid
                            item
                            container
                            md={6}
                            rowSpacing={1}
                            columnSpacing={2}
                        >
                            <ProfileFormPersonal formik={formik} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Accordion title='Adres' icon={<FmdGoodIcon />}>
                                <ProfileFormAddress formik={formik} />
                            </Accordion>
                            <Accordion
                                title='Voorkeuren'
                                icon={<ThumbUpIcon />}
                            >
                                <ProfileFormPreference formik={formik} />
                            </Accordion>
                            <Accordion
                                title='Transport'
                                icon={<DirectionsCarIcon />}
                            >
                                <ProfileFormTransport formik={formik} />
                            </Accordion>
                            <Accordion title='Gegevens' icon={<PaymentIcon />}>
                                <ProfileFormDetails formik={formik} />
                            </Accordion>
                            <Accordion title='Admin' icon={<LockIcon />}>
                                <ProfileFormAdmin formik={formik} />
                            </Accordion>
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                </form>
            )}
            {isLoading && <CircularProgress color='primary' />}
        </>
    );
};

export default UserProfileForm;
