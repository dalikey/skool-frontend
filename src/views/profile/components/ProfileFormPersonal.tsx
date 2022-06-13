import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Avatar,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useLocalStorage } from '../../../app/useLocalStorage';
import ProfilePicture from '../../../assets/no_profile_picture.jpg';
import { CredentialsModel } from '../../../models/authModels';

interface ProfileFormPersonalProps {
    formik: any;
}

const ProfileFormPersonal = ({ formik }: ProfileFormPersonalProps) => {
    const [user] = useLocalStorage<CredentialsModel>('user');
    return (
        <>
            <Grid
                item
                container
                xs={12}
                columnSpacing={2}
                alignItems='center'
                justifyContent='center'
            >
                <Grid item md={4}>
                    <Avatar
                        alt='Profile picture'
                        src={ProfilePicture}
                        sx={{
                            width: 150,
                            height: 150,
                        }}
                    />
                </Grid>
                <Grid item container md={8} rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id='emailAddress'
                            name='emailAddress'
                            label='E-mailadres'
                            value={formik.values.emailAddress ?? ''}
                            onChange={formik.handleChange}
                            variant='standard'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id='firstName'
                            name='firstName'
                            label='Voornaam'
                            value={formik.values.firstName ?? ''}
                            onChange={formik.handleChange}
                            variant='standard'
                            disabled={user?.role !== 'owner'}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id='lastName'
                            name='lastName'
                            label='Achternaam'
                            value={formik.values.lastName ?? ''}
                            onChange={formik.handleChange}
                            variant='standard'
                            disabled={user?.role !== 'owner'}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label='Geboortedatum'
                                mask=''
                                value={formik.values.dateOfBirth ?? null}
                                inputFormat='dd/MM/yyyy'
                                onChange={(value) =>
                                    formik.setFieldValue(
                                        'dateOfBirth',
                                        Date.parse(value)
                                    )
                                }
                                renderInput={(params) => (
                                    <TextField
                                        variant='standard'
                                        size='small'
                                        fullWidth
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant='standard' fullWidth>
                    <InputLabel id='gender-input'>Gender</InputLabel>
                    <Select
                        id='gender'
                        name='gender'
                        value={formik.values.gender ?? ''}
                        onChange={formik.handleChange}
                        label='Gender'
                    >
                        <MenuItem value={'m'}>Man</MenuItem>
                        <MenuItem value={'f'}>Vrouw</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id='mobileNumber'
                    name='mobileNumber'
                    label='Telefoonnummer'
                    value={formik.values.mobileNumber ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant='standard' fullWidth>
                    <InputLabel id='nationality-input'>
                        Nationaliteit
                    </InputLabel>
                    <Select
                        id='nationality'
                        name='nationality'
                        value={(formik.values.nationality ?? '').toLowerCase()}
                        onChange={formik.handleChange}
                        label='Nationaliteit'
                    >
                        <MenuItem value={'nl'}>Nederlands</MenuItem>
                        <MenuItem value={'be'}>Belgisch</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id='countryOfOrigin'
                    name='countryOfOrigin'
                    label='Land van herkomst'
                    value={formik.values.countryOfOrigin ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id='passwordInfo.password'
                    name='passwordInfo.password'
                    label='Nieuw wachtwoord'
                    type='password'
                    value={formik.values.passwordInfo.password ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id='passwordInfo.confirmPassword'
                    name='passwordInfo.confirmPassword'
                    label='Bevestig nieuw wachtwoord'
                    type='password'
                    value={formik.values.passwordInfo.confirmPassword ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
        </>
    );
};

export default ProfileFormPersonal;
