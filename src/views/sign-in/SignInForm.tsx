import { Button, Stack, TextField, Link, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { CredentialsModel } from '../../models/authModels';
import { useLoginMutation } from '../../api/auth/authApi';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const [login, { isSuccess, isError, isLoading }] = useLoginMutation();

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

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
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
                {isError && (
                    <FormHelperText error={true}>
                        E-mailadres en wachtwoord komen niet overeen
                    </FormHelperText>
                )}
                <Link href='#'>Wachtwoord vergeten?</Link>
                <Button disabled={isLoading} type='submit' variant='contained'>
                    Aanmelden
                </Button>
                <Link href='sign-up'>Account aanmaken</Link>
            </Stack>
        </form>
    );
};

export default SignInForm;
