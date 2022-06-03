import {
    Button,
    Link,
    Stack,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useState, MouseEvent, useEffect } from 'react';
import { SignUpSchema } from '../../schemas/authSchemas';
import { RegistrationModel } from '../../models/authModels';
import { useRegisterMutation } from '../../api/auth/authApi';
import { useNavigate } from 'react-router-dom';

interface ShowPasswordValues {
    password: boolean;
    passwordConfirm: boolean;
}

const ConfirmPasswordForm = () => {
    const [showPasswordValues, setShowPasswordValues] =
        useState<ShowPasswordValues>({
            password: false,
            passwordConfirm: false,
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

    const [register, { isSuccess, isError, isLoading }] = useRegisterMutation();

    const handleSignUp = (values: RegistrationModel): void => {
        register(values);
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: SignUpSchema,
        validateOnChange: false,
        onSubmit: handleSignUp,
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
                    <InputLabel htmlFor='passwordConfirm'>
                        Herhaal wachtwoord
                    </InputLabel>
                    <Input
                        id='passwordConfirm'
                        name='passwordConfirm'
                        autoComplete='on'
                        type={
                            showPasswordValues.passwordConfirm
                                ? 'text'
                                : 'password'
                        }
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.passwordConfirm &&
                            Boolean(formik.errors.passwordConfirm)
                        }
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    name='passwordConfirm'
                                    aria-label='toggle password visibility'
                                    onClick={handleShowPassword}
                                >
                                    {showPasswordValues.passwordConfirm ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText error={formik.touched.passwordConfirm}>
                        {formik.errors.passwordConfirm}
                    </FormHelperText>
                </FormControl>
                {isError && (
                    <FormHelperText error={true} sx={{ textAlign: 'center' }}>
                        Wachtwoord wijzigen kan niet succesvol worden voltooid.
                        Probeer het later nog een keer.
                    </FormHelperText>
                )}
                <Button
                    disabled={isLoading}
                    type='submit'
                    variant='contained'
                    sx={{ my: '16px' }}
                >
                    Wachtwoord wijzigen
                </Button>
                <Link href='/sign-in'>Inloggen?</Link>
            </Stack>
        </form>
    );
};

export default ConfirmPasswordForm;
