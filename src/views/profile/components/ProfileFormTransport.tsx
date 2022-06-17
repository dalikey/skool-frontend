import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
} from '@mui/material';

interface ProfileFormTransportProps {
    formik: any;
}

const ProfileFormTransport = ({ formik }: ProfileFormTransportProps) => {
    return (
        <Grid container mt={-2}>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel
                        id='hasDriversLicense'
                        name='transport.hasDriversLicense'
                        control={
                            <Checkbox
                                checked={
                                    formik.values.transport.hasDriversLicense ??
                                    false
                                }
                                onChange={formik.handleChange}
                            />
                        }
                        label='Heeft u een geldig rijbewijs?'
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel
                        id='hasVehicle'
                        name='transport.hasVehicle'
                        control={
                            <Checkbox
                                checked={
                                    formik.values.transport.hasVehicle ?? false
                                }
                                onChange={formik.handleChange}
                            />
                        }
                        label='Heeft u een vervoersmiddel?'
                    />
                </FormGroup>
            </Grid>
        </Grid>
    );
};

export default ProfileFormTransport;
