import { Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { useFormDialogStore } from '../../components/dialog/FormDialog';

interface FilterFormProps {
    filterFunc: any
}

interface FilterModel {
    targetAudience: string,
    workshop: {
        "name": string
    },
    level: string
}

const FilterForm = ({filterFunc}: FilterFormProps) => {
    console.log('ewa')
    const { close } = useFormDialogStore();

    const callForm = (values: FilterModel): void => {
        filterFunc(values)
        close();
    };

    const formik = useFormik({
        initialValues: {
            targetAudience: '',
            workshop: {
                name: ''
            },
            level: '',
        },
        onSubmit: callForm,
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
                <TextField
                    id='targetAudience'
                    name='targetAudience'
                    label='Doelgroep'
                    value={formik.values.targetAudience}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.targetAudience &&
                        Boolean(formik.errors.targetAudience)
                    }
                    helperText={
                        formik.touched.targetAudience && formik.errors.targetAudience
                    }
                    variant='standard'
                />
                <TextField
                    id='level'
                    name='level'
                    label='Niveau'
                    value={formik.values.level}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.level &&
                        Boolean(formik.errors.level)
                    }
                    helperText={
                        formik.touched.level && formik.errors.level
                    }
                    variant='standard'
                />
                <TextField
                    id='workshop.name'
                    name='workshop.name'
                    label='Workshop'
                    value={formik.values.workshop?.name}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.workshop?.name &&
                        Boolean(formik.errors.workshop?.name)
                    }
                    helperText={
                        formik.touched.workshop?.name &&
                        formik.errors.workshop?.name
                    }
                    variant='standard'
                />
                <Stack direction='row' spacing={2}>
                    <Button onClick={close}>Annuleren</Button>
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{ my: '16px' }}
                    >
                        Opslaan
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};

export default FilterForm;
