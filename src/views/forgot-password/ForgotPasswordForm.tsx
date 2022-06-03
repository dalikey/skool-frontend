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
                    <Link to='/sign-in'>
                        <Button type='submit' variant='contained'>
                            Annuleren
                        </Button>
                    </Link>
                    {'\t'}
                    <Link to='/sign-in'>
                        <Button type='submit' variant='contained'>
                            Verzenden
                        </Button>
                    </Link>
                </div>
            </Stack>
        </form>
    );
};

export default ForgotPasswordForm;
