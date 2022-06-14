import { Button, Stack, TextField, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { NonExistingModel } from '../../models/authModels';
import { useAddNonExistingMutation } from '../../api/shift/shiftApi';
import { useNavigate } from 'react-router-dom';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import {RetrievedWorkshopShiftModel} from "../../models/workshopShiftModels";

interface NonExistingUserFormProps {
    shift: RetrievedWorkshopShiftModel
}

const NonExistingUserForm = ({ shift }: NonExistingUserFormProps) => {
    const { close } = useFormDialogStore();

    const [addNonExisting, { isSuccess, isError, isLoading }] =
        useAddNonExistingMutation();

    const handleNonExistingUser = (values: NonExistingModel): void => {
        addNonExisting({ id: shift._id, body: values });
        close();
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            hourRate: 0
        },
        onSubmit: handleNonExistingUser,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/sign-in');
        }
    }, [isSuccess, navigate]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
                <TextField
                    id='firstName'
                    name='firstName'
                    label='Voornaam'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                    }
                    helperText={
                        formik.touched.firstName && formik.errors.firstName
                    }
                    variant='standard'
                />
                <TextField
                    id='lastName'
                    name='lastName'
                    label='Achternaam'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                    }
                    helperText={
                        formik.touched.lastName && formik.errors.lastName
                    }
                    variant='standard'
                />
                <TextField
                    id='emailAddress'
                    name='emailAddress'
                    label='E-mailadres'
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.emailAddress &&
                        Boolean(formik.errors.emailAddress)
                    }
                    helperText={
                        formik.touched.emailAddress &&
                        formik.errors.emailAddress
                    }
                    variant='standard'
                />
                <TextField
                    id='phoneNumber'
                    name='phoneNumber'
                    label='Telefoonnummer'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    variant='standard'
                />
                <TextField
                    id='hourRate'
                    name='hourRate'
                    label='Uurtarief'
                    value={formik.values.hourRate}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.hourRate &&
                        Boolean(formik.errors.hourRate)
                    }
                    helperText={
                        formik.touched.hourRate &&
                        formik.errors.hourRate
                    }
                    variant='standard'
                />
                {isError && (
                    <FormHelperText error={true} sx={{ textAlign: 'center' }}>
                        Registratie kan niet succesvol worden voltooid. Probeer
                        het later nog een keer.
                    </FormHelperText>
                )}
                <Stack direction='row' spacing={2}>
                    <Button onClick={close}>Annuleren</Button>
                    <Button
                        disabled={isLoading}
                        type='submit'
                        variant='contained'
                        sx={{ my: '16px' }}
                    >
                        Registreren
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};

export default NonExistingUserForm;
