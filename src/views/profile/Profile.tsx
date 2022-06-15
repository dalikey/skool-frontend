import {
    Grid,
    Typography,
    IconButton,
    Avatar,
    Box,
    Button,
} from '@mui/material';
import {
    Edit,
    AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { useGetPersonalProfileQuery } from '../../api/user/userApi';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import ProfileForm from './ProfileForm';
import ProfilePicture from '../../assets/no_profile_picture.jpg';
import { useGetAllWorkshopsQuery } from '../../api/workshop/workshopApi';

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

    const { data:workshopData } = useGetAllWorkshopsQuery({ isActive: true });

    console.log(user);

    return (
        <Grid container spacing={2} border={1} borderColor='#f0f0f0' style={{color: 'black', backgroundColor: '#ffffff', paddingBottom: '15px', paddingRight: '50px'}}>
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
                    {/* {user?.location?.address} */}
                    adres 12
                </Typography>
                <Typography>
                    {/* {user?.location?.city} */}
                    stad
                </Typography>
                <Typography>
                    {/* {user?.location?.country} */}
                    land
                </Typography>
                <Typography>
                    {/* {user?.location?.postalCode} */}
                    1234AB
                </Typography>
                <Typography variant='subtitle1' color='secondary'>
                    Vervoersgegevens
                </Typography>
                <Typography>
                    {`Rijbewijs: ${user?.transport?.hasDriversLicense}`}
                </Typography>
                <Typography>
                    {`Auto: ${user?.transport?.hasVehicle}`}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography fontSize='25px' fontWeight='bold' paddingBottom={'15px'} paddingTop={'15px'}>
                    {user?.firstName} {user?.lastName}
                </Typography>
                <Typography>
                    {user?.gender}
                </Typography>
                <Typography>
                    {user?.emailAddress}
                </Typography>
                <Typography>
                    {(user?.dateOfBirth != null ? new Date(user?.dateOfBirth).toLocaleDateString('nl-NL') : 'Onbekend')}
                </Typography>
                <Typography>
                    {user?.mobileNumber}
                </Typography>
                <Box display='flex' sx={{ justifyContent: 'space-between'}}>
                    <Typography>
                        {`Land van herkomst: ${user?.countryOfOrigin}`}
                    </Typography>
                    <Typography>
                        {`Nationaliteit: ${user?.nationality}`}
                    </Typography>
                    <Typography>
                        {`Geboorteplaats: ${user?.placeOfBirth}`}
                    </Typography>
                </Box>
                <Typography variant='subtitle1' color='secondary'>
                    Persoonlijke gegevens
                </Typography>
                <Typography>
                    {`KvK: ${user?.kvkNumber}`}
                </Typography>
                <Typography>
                    {`IBAN: ${user?.paymentInfo?.IBAN}`}
                </Typography>
                <Typography>
                    {`BIC: ${user?.paymentInfo?.BIC}`}
                </Typography>
                <Typography>
                    {`Vat ID: ${user?.vatID}`}
                </Typography>
                <Typography>
                    {`Contract: ${user?.contractType}`}
                </Typography>
                <Typography variant='subtitle1' color='secondary'>
                    Workshopvoorkeuren
                </Typography>

                {workshopData?.result && workshopData.result.length > 0 && workshopData.result.filter((workshop) => (
                    user?.workshopPreferences?.includes(workshop._id)
                )).map(workshop => (
                    <div>{workshop.name}</div>
                ))}

                <Typography variant='subtitle1' color='secondary'>
                    Niveauvoorkeuren
                </Typography>

                {user?.levelPreferences != null && user?.levelPreferences?.length > 0 && user?.levelPreferences.map((level) => (
                    <Typography>
                        {level}
                    </Typography>
                ))}

                <Button
                    onClick={() => openProfileForm()}
                    aria-label='edit'
                    color='primary'>
                        <Edit />
                        Profiel bewerken
                </Button>
                <Button
                    // onClick={() => openProfileForm()}
                    aria-label='addFile'
                    color='primary'>
                        <AttachFileIcon />
                        Voeg een bestand toe
                </Button>
            </Grid>
        </Grid>
    );
};

export default Profile;
