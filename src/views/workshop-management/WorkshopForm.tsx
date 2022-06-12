import {
    Box,
    Button,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateWorkshopMutation } from '../../api/workshop/workshopApi';

const WorkshopForm = () => {
    const [createWorkshop] = useCreateWorkshopMutation();
    const { close } = useFormDialogStore();

    const handleSubmit = (values) => {
        createWorkshop(values);
        close();
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            content: '',
            materials: [],
            isActive: true,
        },
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ width: '300px' }}>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name='name'
                        label='Naam'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        variant='standard'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name='content'
                        label='Content'
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        variant='standard'
                        fullWidth
                    />
                </Grid>
                <FormikProvider value={formik}>
                    <FieldArray
                        name='materials'
                        render={({ remove, push }) => (
                            <Grid item xs={12}>
                                <Box
                                    display='flex'
                                    justifyContent='space-between'
                                >
                                    <Typography>Materialen</Typography>
                                    <IconButton onClick={() => push('')}>
                                        <AddIcon color='primary' />
                                    </IconButton>
                                </Box>
                                {formik.values.materials &&
                                    formik.values.materials.length > 0 &&
                                    formik.values.materials.map(
                                        (material, index) => (
                                            <Box
                                                display='flex'
                                                justifyContent='space-between'
                                                pt={2}
                                                key={index}
                                            >
                                                <TextField
                                                    name={`materials.${index}`}
                                                    value={material}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    variant='standard'
                                                    fullWidth
                                                />
                                                <IconButton
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    <DeleteIcon fontSize='small' />
                                                </IconButton>
                                            </Box>
                                        )
                                    )}
                            </Grid>
                        )}
                    />
                </FormikProvider>
                <Grid item xs={12} display='flex' justifyContent='flex-end'>
                    <Button onClick={close}>Annuleren</Button>
                    <Button variant='contained' type='submit'>
                        Bevestig
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default WorkshopForm;
