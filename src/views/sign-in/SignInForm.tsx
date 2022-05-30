import { Button, Stack, TextField, Link } from '@mui/material';
import { useFormik } from 'formik';
import { CredentialsModel } from '../../models/CredentialsModel';
import { SignInSchema } from '../../schemas/credentialsSchemas';

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
        validationSchema: SignInSchema,
        validateOnChange: false,
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
                    id='password'
                    name='password'
                    label='Wachtwoord'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
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
