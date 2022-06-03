import { Card, CardContent, Box, Grow } from '@mui/material';
import ForgotPasswordForm from './ForgotPasswordForm';
import logo from '../../assets/logo.png';

const ForgotPassword = () => {
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
                        <ForgotPasswordForm />
                    </CardContent>
                </Card>
            </Grow>
        </Box>
    );
};

export default ForgotPassword;
