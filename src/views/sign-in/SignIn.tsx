import { Card, CardContent, Box, Grow } from '@mui/material';
import SignInForm from './SignInForm';
import logo from '../../assets/logo.png';

const SignIn = () => {
    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='80vh'
            width='100%'
        >
            <Grow in={true}>
                <Card sx={{ minWidth: '350px' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <img src={logo} alt='Skool workshop logo' width='55%' />
                        <SignInForm />
                    </CardContent>
                </Card>
            </Grow>
        </Box>
    );
};

export default SignIn;
