import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { FormikContextType } from 'formik';

interface ProfileFormAdminProps {
    formik: FormikContextType<any>;
}

const ProfileFormAdmin = ({ formik }: ProfileFormAdminProps) => {
    return (
        <Grid container spacing={2} mt={-4}>
            <Grid item xs={12}>
                <FormControl variant='standard' fullWidth>
                    <InputLabel id='role-input'>
                        Rol
                    </InputLabel>
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
        </Grid>
    );
};

export default ProfileFormAdmin;
