import { Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { CredentialsModel } from '../../models/CredentialsModel';

type SignInModel = CredentialsModel & { repeatedPassword: string };

const SignInForm = () => {
    const handleSignIn = (values: SignInModel) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            emailAddress: '',
            password: '',
            repeatedPassword: '',
        },
        onSubmit: handleSignIn,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    id='emailAddress'
                    name='emailAddress'
                    label='Email adres'
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    variant='standard'
                />
                <TextField
                    id='password'
                    name='password'
                    label='Wachtwoord'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    variant='standard'
                    type='password'
                />
                <Button
                    disabled={formik.isSubmitting}
                    type='submit'
                    variant='contained'
                >
                    Aanmelden
                </Button>
            </Stack>
        </form>
    );
};

export default SignInForm;
