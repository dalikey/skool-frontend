import { Button, FormHelperText, Stack, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSendEmailMutation } from '../../api/auth/authApi';
import { EmailModel } from '../../models/authModels';
import { useFormik } from 'formik';
import { useEffect } from 'react';

const ForgotPasswordForm = () => {
    const [sendEmail, { isSuccess, isError, isLoading }] =
        useSendEmailMutation();

    const handleSendEmail = (values: EmailModel): void => {
        sendEmail(values);
    };

    const formik = useFormik({
        initialValues: {
            emailAddress: '',
        },
        onSubmit: handleSendEmail,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/sign-in');
        }
    }, [isSuccess, navigate]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                Voer uw e-mailadres in om een herstel wachtwoord e-mail te
                ontvangen.
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
                <div>
                    <Button
                        component={Link}
                        to={'/sign-in'}
                        type='submit'
                        variant='contained'
                    >
                        Annuleren
                    </Button>
                    {'\t'}
                    <Button
                        disabled={isLoading}
                        type='submit'
                        variant='contained'
                    >
                        Verzenden
                    </Button>
                </div>
            </Stack>
            {isError && (
                <FormHelperText error={true} sx={{ textAlign: 'center' }}>
                    Mail kan niet succesvol worden verzonden. Probeer het later
                    nog een keer.
                </FormHelperText>
            )}
        </form>
    );
};

export default ForgotPasswordForm;
