import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

interface AddressFormPersonalProps {
    formik: any;
}

const ProfileFormAddress = ({ formik }: AddressFormPersonalProps) => {
    return (
        <Grid container spacing={2} mt={-4}>
            <Grid item xs={12} md={6}>
                <TextField
                    id='address'
                    name='location.address'
                    label='Adres'
                    value={formik.values.location.address ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id='city'
                    name='location.city'
                    label='Stad'
                    value={formik.values.location.city ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id='postalCode'
                    name='location.postalCode'
                    label='Postcode'
                    value={formik.values.location.postalCode ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant='standard' fullWidth>
                    <InputLabel id='country-input'>Land</InputLabel>
                    <Select
                        id='country'
                        name='location.country'
                        value={formik.values.location.country ?? ''}
                        onChange={formik.handleChange}
                        label='Land'
                    >
                        <MenuItem value={'nl'}>Nederland</MenuItem>
                        <MenuItem value={'be'}>België</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default ProfileFormAddress;
