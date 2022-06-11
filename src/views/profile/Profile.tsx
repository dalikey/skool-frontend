import { Grid, Divider, Stack, Typography, Button } from '@mui/material';
import {
    Edit as EditIcon,
    AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { useGetPersonalProfileQuery } from '../../api/user/userApi';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import ProfileForm from './ProfileForm';

const Profile = () => {
    const { data } = useGetPersonalProfileQuery();
    const user = data?.result;

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
                            style={{
                                height: 150,
                                width: 150,
                                borderRadius: 25,
                            }}
                            src={`https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg`}
                            srcSet={`https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg&dpr=2 2x`}
                            alt={'Coffee'}
                            loading='lazy'
                        />
                        <Stack direction='column'>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                            >
                                {user?.firstName + ' ' + user?.lastName} <br />
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    Geboorteplaats: {user?.placeOfBirth}
                                    <br /> Geboortedatum:{' '}
                                    {user?.dateOfBirth?.toString().slice(0, 10)}
                                    <br />
                                    Nationaliteit: {user?.nationality}
                                    <br />
                                    Land van herkomst: {user?.countryOfOrigin}
                                    <br />
                                    Telefoonnummer: {user?.mobileNumber}
                                    <br />
                                    E-mailadres: {user?.emailAddress}
                                </Grid>
                                <Grid item xs={6}>
                                    Opleiding niveau: {user?.levelPreference}
                                    <br />
                                    Contract type: {user?.contractType}
                                    <br />
                                    Kvk nummer: {user?.kvkNumber}
                                    <br />
                                    Vat ID: {user?.vatID}
                                    <br />
                                    Workshop voorkeuren:{' '}
                                    {user?.workshopPreferences}{' '}
                                </Grid>
                            </Grid>
                        </Stack>
                        <EditIcon onClick={openProfileForm} />
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
