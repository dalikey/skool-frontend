import { Button, Stack, TextField, Link } from '@mui/material';
import { useFormik } from 'formik';
import { CredentialsModel } from '../../models/CredentialsModel';
import { SignUpSchema } from '../../schemas/credentialsSchemas';

type SignUpModel = CredentialsModel & { repeatedPassword: string };

const SignUpForm = () => {
    const handleSignUp = (values: SignUpModel) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            emailAddress: '',
            password: '',
            repeatedPassword: '',
        },
        validationSchema: SignUpSchema,
        validateOnChange: false,
        onSubmit: handleSignUp,
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
                <TextField
                    id='repeatedPassword'
                    name='repeatedPassword'
                    label='Herhaal wachtwoord'
                    value={formik.values.repeatedPassword}
                    error={
                        formik.touched.repeatedPassword &&
                        Boolean(formik.errors.repeatedPassword)
                    }
                    helperText={
                        formik.touched.repeatedPassword &&
                        formik.errors.repeatedPassword
                    }
                    onChange={formik.handleChange}
                    variant='standard'
                    type='password'
                />
                <Button
                    disabled={formik.isSubmitting}
                    type='submit'
                    variant='contained'
                >
                    Registreren
                </Button>
                <Link href='sign-in'>Al een bestaande klant?</Link>
            </Stack>
        </form>
    );
};

export default SignUpForm;
