import { Grid, Divider, Stack, Typography, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import ProfileWorkshopStatusCards from '../../components/dashboard/ProfileWorkshopStatusCards';
import { useGetPersonalProfileQuery } from '../../api/user/userApi';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import ProfileForm from './ProfileForm';
import { UserProfileModel } from '../../models/userModels';

interface UserTableProps {
    users?: UserProfileModel[];
}

const Profile = ({ users }: UserTableProps) => {
    const { data } = useGetPersonalProfileQuery();

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
                            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={'Coffee'}
                            loading='lazy'
                        />
                        <Typography>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                            >
                                {/* {user?.firstName + ' ' + user?.lastName} */}
                            </Typography>
                            {/* {user?.role} */}
                        </Typography>
                        <Stack direction='row' spacing={40}>
                            <EditIcon onClick={openProfileForm} />
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{ my: '16px' }}
                            >
                                Een bestand toevoegen
                            </Button>
                        </Stack>
                    </Stack>
                    <br />
                    <Divider></Divider>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='h6' gutterBottom component='div'>
                            Workshops
                        </Typography>
                        <Stack direction='row' spacing={2}>
                            <ProfileWorkshopStatusCards />
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    Workshops <br />
                    Workshops <br />
                    Workshops <br />
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
