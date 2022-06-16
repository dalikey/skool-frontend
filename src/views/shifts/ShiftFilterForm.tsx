import { Button, Checkbox, Grid, TextField } from '@mui/material';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import { UserProfileModel } from '../../models/userModels';
import { useUpdateUserProfileMutation } from '../../api/user/userApi';
interface ProfileFormProps {
    user: UserProfileModel;
}

const ShiftFilterForm = ({ user }: ProfileFormProps) => {
    const { close } = useFormDialogStore();
    const [updateUser] = useUpdateUserProfileMutation();

    const handleSubmit = (values): void => {
        updateUser(values);
        close();
    };

    return (
        // <form style={{ maxWidth: '1000px' }}>
        <form style={{ width: '500px' }}>
            <Grid
                container
                columnSpacing={4}
                rowSpacing={2}
                alignItems='flex-start'
            >
                <Grid item xs={12}>
                    <Grid container alignItems='center'>
                        <Grid
                            item
                            md={12}
                            display='flex'
                            justifyContent='flex-end'
                        >
                            <Checkbox defaultChecked />
                            <Checkbox />
                            <Button onClick={close}>Annuleren</Button>
                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                autoFocus
                            >
                                Bevestigen
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default ShiftFilterForm;
