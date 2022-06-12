import {
    Grid,
    Divider,
    Stack,
    Typography,
    Button,
    IconButton,
} from '@mui/material';
import {
    Edit as EditIcon,
    AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { useGetPersonalProfileQuery } from '../../api/user/userApi';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import ProfileForm from './ProfileForm';
import ProfilePicture from '../../assets/no_profile_picture.jpg';

const Profile = () => {
    const { data } = useGetPersonalProfileQuery();
    const user = data?.result;

    let workshopString, workshopPref, levelString, levelPref;
    if (user?.workshopPreferences) {
        workshopString = user?.workshopPreferences;
        workshopPref = workshopString.join('\r\n');
    }
    if (user?.levelPreferences) {
        levelString = user?.levelPreferences;
        levelPref = levelString.join('\r\n');
    }

    const openProfileForm = () => {
        if (data?.result) {
            formDialog('Profiel bewerken', <ProfileForm user={data.result} />);
        }
    };

    return (
        <>
            <FormDialog />
            <Grid container spacing={3} alignItems='stretch'>
                <Grid item xs={12}>
                    <Stack direction='row' spacing={2}>
                        <img
                            src={ProfilePicture}
                            alt='Profile picture'
                            style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                                marginTop: '12px',
                            }}
                        />
                        <Stack direction='column'>
                            <Stack direction='row'>
                                <Typography
                                    variant='h6'
                                    style={{ marginTop: '4px' }}
                                    component='div'
                                >
                                    {user?.firstName + ' ' + user?.lastName}
                                </Typography>
                                <IconButton
                                    onClick={openProfileForm}
                                    color='primary'
                                >
                                    <EditIcon />
                                </IconButton>
                            </Stack>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    Geboorteplaats: {user?.countryOfOrigin}
                                    <br /> Geboortedatum:{' '}
                                    {user?.dateOfBirth?.toString().slice(0, 10)}
                                    <br />
                                    Nationaliteit: {user?.countryOfOrigin}
                                    <br />
                                    Land van herkomst: {user?.countryOfOrigin}
                                    <br />
                                    E-mailadres: {user?.emailAddress}
                                </Grid>
                                <Grid item xs={4}>
                                    Opleiding niveau: {'\r\n'}
                                    {levelPref}
                                    <br />
                                    Kvk nummer: {user?.kvkNumber}
                                    <br />
                                    Vat ID: {user?.vatID}
                                    <br />
                                    Workshop voorkeuren: {'\r\n'}
                                    {workshopPref}
                                </Grid>{' '}
                            </Grid>
                        </Stack>
                    </Stack>
                    <Button
                        variant='contained'
                        component='label'
                        sx={{ my: '16px' }}
                    >
                        <AttachFileIcon />
                        Een bestand toevoegen
                        <input type='file' hidden />
                    </Button>
                    <br />
                    <Divider></Divider>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
