import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FormikContextType } from 'formik';

interface ProfileFormAdminProps {
    formik: FormikContextType<any>;
}

const ProfileFormAdmin = ({ formik }: ProfileFormAdminProps) => {
    return (
        <Grid container spacing={2} mt={-4}>
            <Grid item md={6}>
                <FormControl variant='standard' fullWidth>
                    <InputLabel id='role-input'>Rol</InputLabel>
                    <Select
                        id='role'
                        name='role'
                        value={(formik.values.role ?? '').toLowerCase()}
                        onChange={formik.handleChange}
                        label='Rol'
                    >
                        <MenuItem value={'user'}>Gebruiker</MenuItem>
                        <MenuItem value={'admin'}>Admin</MenuItem>
                        <MenuItem value={'owner'}>Eigenaar</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={6}>
                <TextField
                    id='hourRate'
                    name='hourRate'
                    label='Uurloon'
                    type='number'
                    value={formik.values.hourRate ?? 0}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
        </Grid>
    );
};

export default ProfileFormAdmin;
