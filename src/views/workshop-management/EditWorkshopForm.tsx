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
import { useUpdateWorkshopMutation } from '../../api/workshop/workshopApi';
import {WorkshopModel} from "../../models/workshopModels";

interface WorkshopFormProps {
    workshop: WorkshopModel
}

const WorkshopForm = ({workshop}: WorkshopFormProps) => {
    const { close } = useFormDialogStore();
    const [updateWorkshop] = useUpdateWorkshopMutation();

    const handleSubmit = (values) => {
        updateWorkshop(values);
        close();
    };

    const formik = useFormik({
        initialValues: {
            _id: workshop._id ?? '',
            name: workshop.name ?? '',
            content: workshop.content ?? '',
            materials: workshop.materials ?? [],
            isActive: workshop.isActive ?? true,
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
