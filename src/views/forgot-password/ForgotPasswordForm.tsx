import { Button, Stack, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    return (
        <form>
            <Stack spacing={2}>
                Voer je e-mailadres in om je account te zoeken.
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
                            Zoeken
                        </Button>
                    </Link>
                </div>
            </Stack>
        </form>
    );
};

export default ForgotPasswordForm;
