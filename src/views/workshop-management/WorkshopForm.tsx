import {
    Box,
    Button,
    FormHelperText,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import {
    useUpdateWorkshopMutation,
    useCreateWorkshopMutation,
} from '../../api/workshop/workshopApi';
import { WorkshopModel } from '../../models/workshopModels';
import { WorkshopSchema } from '../../schemas/workshopSchemas';

interface WorkshopFormProps {
    workshop?: WorkshopModel;
}

const WorkshopForm = ({ workshop }: WorkshopFormProps) => {
    const { close } = useFormDialogStore();
    const [createWorkshop, { isError, isLoading }] =
        useCreateWorkshopMutation();
    const [updateWorkshop] = useUpdateWorkshopMutation();

    const handleCreateWorkshop = (values): void => {
        if (workshop) {
            updateWorkshop(values);
        } else {
            createWorkshop(values);
        }
        close();
    };

    const formik = useFormik({
        initialValues:
            workshop != null
                ? {
                      ...workshop,
                  }
                : {
                      name: '',
                      content: '',
                      materials: [],
                  },
        validationSchema: WorkshopSchema,
        validateOnChange: false,
        onSubmit: handleCreateWorkshop,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ width: '300px' }}>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id='name'
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
                        id='content'
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
                                        <Add color='primary' />
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
                                                    id={`materials.${index}`}
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
                                                    <Delete fontSize='small' />
                                                </IconButton>
                                            </Box>
                                        )
                                    )}
                            </Grid>
                        )}
                    />
                </FormikProvider>

                {isError && (
                    <FormHelperText error={true} sx={{ textAlign: 'center' }}>
                        Workshop kan niet worden aangemaakt. Probeer het later
                        nog een keer.
                    </FormHelperText>
                )}
                <Grid item xs={12} display='flex' justifyContent='flex-end'>
                    <Button onClick={close}>Annuleren</Button>
                    <Button
                        disabled={isLoading}
                        type='submit'
                        variant='contained'
                    >
                        Bevestig
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default WorkshopForm;
