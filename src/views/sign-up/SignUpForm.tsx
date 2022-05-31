import {
    Button,
    Link,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useState, MouseEvent } from 'react';
import { SignUpSchema } from '../../schemas/signUpSchema';

interface SignUpValues {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    repeatedPassword?: string;
}

interface ShowPasswordValues {
    password: boolean;
    repeatedPassword: boolean;
}

const SignUpForm = () => {
    const [showPasswordValues, setShowPasswordValues] =
        useState<ShowPasswordValues>({
            password: false,
            repeatedPassword: false,
        });

    const handleShowPassword = (e: MouseEvent<HTMLButtonElement>): void => {
        setShowPasswordValues((showPasswordValues: ShowPasswordValues) => ({
            ...showPasswordValues,
            [e.currentTarget.name]: Boolean(
                !showPasswordValues[
                    e.currentTarget.name as keyof ShowPasswordValues
                ]
            ),
        }));
    };

    const handleSignUp = (values: SignUpValues): void => {
        delete values.repeatedPassword;
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
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
                <FormControl variant='standard'>
                    <InputLabel htmlFor='password'>Wachtwoord</InputLabel>
                    <Input
                        id='password'
                        name='password'
                        autoComplete='on'
                        type={showPasswordValues.password ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    name='password'
                                    aria-label='toggle password visibility'
                                    onClick={handleShowPassword}
                                >
                                    {showPasswordValues.password ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error={formik.touched.password}>
                        {formik.errors.password}
                    </FormHelperText>
                </FormControl>
                <FormControl variant='standard'>
                    <InputLabel htmlFor='repeatedPassword'>
                        Herhaal wachtwoord
                    </InputLabel>
                    <Input
                        id='repeatedPassword'
                        name='repeatedPassword'
                        autoComplete='on'
                        type={
                            showPasswordValues.repeatedPassword
                                ? 'text'
                                : 'password'
                        }
                        value={formik.values.repeatedPassword}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.repeatedPassword &&
                            Boolean(formik.errors.repeatedPassword)
                        }
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    name='repeatedPassword'
                                    aria-label='toggle password visibility'
                                    onClick={handleShowPassword}
                                >
                                    {showPasswordValues.repeatedPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error={formik.touched.repeatedPassword}>
                        {formik.errors.repeatedPassword}
                    </FormHelperText>
                </FormControl>
                <Button
                    disabled={formik.isSubmitting}
                    type='submit'
                    variant='contained'
                    sx={{ my: '16px' }}
                >
                    Registreren
                </Button>
                <Link href='/sign-in'>Heb je al een account?</Link>
            </Stack>
        </form>
    );
};

export default SignUpForm;
