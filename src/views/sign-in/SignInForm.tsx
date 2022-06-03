import {
    Button,
    Stack,
    TextField,
    Link,
    FormHelperText,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { CredentialsModel, LoginModel } from '../../models/authModels';
import { useLoginMutation } from '../../api/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocalStorage } from '../../app/useLocalStorage';
import { SignInSchema } from '../../schemas/authSchemas';

const SignInForm = () => {
    const [user, setUser] = useLocalStorage<CredentialsModel>('user');
    const [login, { data, isSuccess, isError, isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const handleSignIn = (values: LoginModel): void => {
        login(values);
    };

    const formik = useFormik({
        initialValues: {
            emailAddress: '',
            password: '',
        },
        validationSchema: SignInSchema,
        validateOnChange: false,
        onSubmit: handleSignIn,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess && data && data.result) {
            setUser(data.result);
        }
    }, [isSuccess, data, setUser]);

    useEffect(() => {
        if (user && user.token) {
            navigate('/');
        }
    }, [user, navigate]);

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
                    error={
                        formik.touched.emailAddress &&
                        Boolean(formik.errors.emailAddress)
                    }
                    helperText={
                        formik.touched.emailAddress &&
                        formik.errors.emailAddress
                    }
                />
                <FormControl variant='standard'>
                    <InputLabel htmlFor='password'>Wachtwoord</InputLabel>
                    <Input
                        id='password'
                        name='password'
                        autoComplete='on'
                        type={showPassword ? 'text' : 'password'}
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
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? (
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
                {isError && (
                    <FormHelperText error={true}>
                        E-mailadres en wachtwoord komen niet overeen
                    </FormHelperText>
                )}
                <Link href='wachtwoord-vergeten'>Wachtwoord vergeten?</Link>
                <Button disabled={isLoading} type='submit' variant='contained'>
                    Aanmelden
                </Button>
                <Link href='sign-up'>Account aanmaken</Link>
            </Stack>
        </form>
    );
};

export default SignInForm;
