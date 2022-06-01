import { Button, Stack, TextField, Link, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import { CredentialsModel } from '../../models/authModels';
import { useLoginMutation } from '../../api/auth/authApi';

const SignInForm = () => {
    const [login, { isError }] = useLoginMutation();

    const handleSignIn = (values: CredentialsModel) => {
        login(values);
    };

    const formik = useFormik({
        initialValues: {
            emailAddress: '',
            password: '',
        },
        onSubmit: handleSignIn,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                {isError && (
                    <FormHelperText error={true}>
                        E-mailadres en wachtwoord komen niet overeen
                    </FormHelperText>
                )}
                <TextField
                    id='emailAddress'
                    name='emailAddress'
                    label='E-mailadres'
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
                <Link href='#'>Wachtwoord vergeten?</Link>
                <Button
                    disabled={formik.isSubmitting}
                    type='submit'
                    variant='contained'
                >
                    Aanmelden
                </Button>
                <Link href='sign-up'>Account aanmaken</Link>
            </Stack>
        </form>
    );
};

export default SignInForm;
