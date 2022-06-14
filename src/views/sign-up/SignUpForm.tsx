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
    AlertProps,
    Alert as MuiAlert,
    Snackbar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useState, MouseEvent, forwardRef, SyntheticEvent } from 'react';
import { SignUpSchema } from '../../schemas/authSchemas';
import { RegistrationModel } from '../../models/authModels';
import { useRegisterMutation } from '../../api/auth/authApi';

interface ShowPasswordValues {
    password: boolean;
    passwordConfirm: boolean;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SignUpForm = () => {
    const [register, { data, isSuccess, isError, isLoading }] =
        useRegisterMutation();

    const handleSignUp = (values: RegistrationModel): void => {
        register(values);
    };

    const [open, setOpen] = useState(false);

    console.log('Down');
    console.log(isSuccess);
    console.log(isError);
    console.log(data);
    const handleClick = () => {
        if (data === null) setOpen(true);
    };

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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
                        Registratie kan niet succesvol worden voltooid. Probeer
                        het later nog een keer.
                    </FormHelperText>
                )}
                <Button
                    disabled={isLoading}
                    onClick={handleClick}
                    type='submit'
                    variant='contained'
                    sx={{ my: '16px' }}
                >
                    Registreren
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity='success'
                        sx={{ width: '100%' }}
                    >
                        Registratie voltooid, wacht op de eigenaar om u te
                        accepteren
                    </Alert>
                </Snackbar>
                <Link href='/sign-in'>Heb je al een account?</Link>
            </Stack>
        </form>
    );
};

export default SignUpForm;
