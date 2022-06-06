import { Card, CardContent, Box, Grow } from '@mui/material';
import SignUpForm from './SignUpForm';
import logo from '../../assets/logo.png';

const SignUp = () => {
    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='80vh'
            width='100%'
        >
            <Grow in={true}>
                <Card sx={{ width: '350px' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <img src={logo} alt='Skool workshop logo' width='55%' />
                        <SignUpForm />
                    </CardContent>
                </Card>
            </Grow>
        </Box>
    );
};

export default SignUp;
