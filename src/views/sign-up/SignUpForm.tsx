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
import { CredentialsModel } from '../../models/CredentialsModel';
import { SignUpSchema } from '../../schemas/credentialsSchemas';

type SignUpModel = CredentialsModel & { repeatedPassword: string };

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

    const handleSignUp = (values: SignUpModel): void => {
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
