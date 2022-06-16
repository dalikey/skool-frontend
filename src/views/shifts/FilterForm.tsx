import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from '@mui/material';
import { useFormik } from 'formik';

import { useFormDialogStore } from '../../components/dialog/FormDialog';
import {useGetAllWorkshopsQuery} from "../../api/workshop/workshopApi";

interface FilterFormProps {
    filterFunc: any
}

interface FilterModel {
    targetAudience: string,
    workshop_name?: string,
    level: string
}

const FilterForm = ({filterFunc}: FilterFormProps) => {
    const { close } = useFormDialogStore();

    const {data} = useGetAllWorkshopsQuery({isActive: true});

    const callForm = (values: FilterModel): void => {
        values['workshop.name'] = values.workshop_name;
        delete values['workshop_name'];
        try {
            filterFunc(values)
        } catch (err) {
            console.log(err);
        }
        close();
    };

    const formik = useFormik({
        initialValues: {
            targetAudience: '',
            workshop_name: '',
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
                <FormControl>
                    <InputLabel>Workshop</InputLabel>
                    <Select
                        id='workshop_name'
                        name='workshop_name'
                        label='Workshop'
                        value={formik.values['workshop_name']}
                        onChange={formik.handleChange}
                        error={
                            formik.touched['workshop_name'] &&
                            Boolean(formik.errors['workshop_name'])
                        }
                        variant='standard'
                    >
                        {data?.result && data.result.map((workshop) => (
                            <MenuItem value={workshop.name} key={workshop.name}>{workshop.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
