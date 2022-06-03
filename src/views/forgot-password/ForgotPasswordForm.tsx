import { Button, Stack, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    return (
        <form>
            <Stack spacing={2}>
                Voer uw e-mailadres in om een herstel wachtwoord e-mail te
                ontvangen.
                <TextField
                    id='emailAddress'
                    name='emailAddress'
                    label='E-mailadres'
                    variant='standard'
                />
                <div>
                    <Button
                        component={Link}
                        to={'/sign-in'}
                        type='submit'
                        variant='contained'
                    >
                        Annuleren
                    </Button>
                    {'\t'}
                    <Button
                        component={Link}
                        to={'/sign-in'}
                        type='submit'
                        variant='contained'
                    >
                        Verzenden
                    </Button>
                </div>
            </Stack>
        </form>
    );
};

export default ForgotPasswordForm;
