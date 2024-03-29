import { Grid, TextField } from '@mui/material';

interface ProfileFormDetailsProps {
    formik: any;
}

const ProfileFormDetails = ({ formik }: ProfileFormDetailsProps) => {
    return (
        <Grid container mt={-4} rowSpacing={2}>
            <Grid item xs={12}>
                <TextField
                    id='kvkNumber'
                    name='kvkNumber'
                    label='KVK nummer'
                    value={formik.values.kvkNumber ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='vatID'
                    name='vatID'
                    label='VAT nummer'
                    value={formik.values.vatID ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='IBAN'
                    name='paymentInfo.IBAN'
                    label='IBAN'
                    value={formik.values.paymentInfo.IBAN ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='BIC'
                    name='paymentInfo.BIC'
                    label='BIC'
                    value={formik.values.paymentInfo.BIC ?? ''}
                    onChange={formik.handleChange}
                    variant='standard'
                    fullWidth
                />
            </Grid>
        </Grid>
    );
};

export default ProfileFormDetails;
