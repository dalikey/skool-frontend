import {
    Grid,
    Divider,
    Stack,
    Typography,
    Button,
    IconButton,
    Avatar,
} from '@mui/material';
import {
    Edit,
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

    console.log(user);

    return (
        <Grid container spacing={2}>
            <FormDialog />
            <Grid item xs={12} md={4}>
                <Avatar
                    alt='Profile picture'
                    src={ProfilePicture}
                    sx={{
                        width: 150,
                        height: 150,
                    }}
                />
                <Typography variant='subtitle1' color='secondary'>
                    Adresgegevens
                </Typography>
                <Typography>
                    {user?.location?.address}
                </Typography>
                <Typography>
                    {user?.location?.city}
                </Typography>
                <Typography>
                    {user?.location?.country}
                </Typography>
                <Typography>
                    {user?.location?.postalCode}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography fontSize='20px' fontWeight='bold'>
                    {user?.firstName} {user?.lastName}
                </Typography>
                <Typography>
                    {user?.gender}
                </Typography>
                <Typography>
                    {user?.emailAddress}
                </Typography>
                <Typography>
                    {`${user?.dateOfBirth?.toString()}`}
                </Typography>
                <Typography>
                    {user?.mobileNumber}
                </Typography>
                <Typography>
                    {user?.countryOfOrigin}
                </Typography>
                <Typography>
                    {user?.nationality}
                </Typography>
                <Typography>
                    {user?.placeOfBirth}
                </Typography>
                <IconButton
                    onClick={() => openProfileForm()}
                    aria-label='edit'
                    color='primary'>
                        <Edit />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default Profile;
