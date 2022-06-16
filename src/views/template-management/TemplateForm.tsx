import {
    Button, FormControl,
    FormHelperText,
    Grid, InputLabel, MenuItem, Select,
    TextField,
} from '@mui/material';
import { useFormik} from 'formik';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import {TemplateModel} from "../../models/templateModels";
import {TemplateSchema} from "../../schemas/templateSchemas";
import {useCreateTemplateMutation, useUpdateTemplateMutation} from "../../api/template/templateApi";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Accordion from "../../components/accordion/Accordion";
import {QuestionMarkRounded} from "@mui/icons-material";

interface TemplateFormProps {
    template?: TemplateModel;
    triggers?: string[]
}



const TemplateForm = ({ template, triggers }: TemplateFormProps) => {
    const { close } = useFormDialogStore();
    const [createTemplate, { isError, isLoading }] =
        useCreateTemplateMutation();
    const [updateWorkshop] = useUpdateTemplateMutation();

    const handleCreateTemplate = (values): void => {
        if (template) {
            updateWorkshop(values);
        } else {
            createTemplate(values);
        }
        close();
    };


    const formik = useFormik({
        initialValues:
            {
              _id: template?._id ?? '',
              title: template?.title ?? '',
              content: template?.content ?? '',
              trigger: template?.trigger ?? '',
                  },
        validationSchema: TemplateSchema,
        validateOnChange: false,
        onSubmit: handleCreateTemplate,
    });

    const onChange = (thing) => {
        formik.setFieldValue('content', thing);
    }

    return (
        <form onSubmit={formik.handleSubmit} style={{ width: '900px' }}>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id='title'
                        name='title'
                        label='Titel'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                        variant='standard'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant={'standard'} fullWidth>
                        <InputLabel>Trigger</InputLabel>
                        <Select
                            id='trigger'
                            name='trigger'
                            label='Trigger'
                            value={formik.values.trigger}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.trigger &&
                                Boolean(formik.errors.trigger)
                            }
                            variant='standard'
                        >
                            {triggers?.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <ReactQuill placeholder={'Inhoud'} theme={'snow'} onChange={onChange} value={formik.values.content}></ReactQuill>
                </Grid>
                <Grid item xs={12}>
                    <Accordion title={'Variabelen'} icon={<QuestionMarkRounded/>}>
                        <ul>
                            <li>{'{name}: Voor & Achternaam'}</li>
                            <li>{'{url}: Link naar relevante pagina (alleen van toepassing bij gebruikersactivatie & wachtwoord vergeten)'}</li>
                            <li>{'{functie}: Naam van workshop'}</li>
                            <li>{'{klant}: Naam van klant'}</li>
                            <li>{'{date}: Datum van workshop'}</li>
                            <li>{'{arrivalTime}: Tijd van aanvang'}</li>
                            <li>{'{startTime}: Starttijd van eerste ronde'}</li>
                            <li>{'{endTime}: Eindtijd van laatste ronde'}</li>
                            <li>{'{workshop}: Naam van te geven workshop'}</li>
                        </ul>
                            </Accordion>
                </Grid>

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

export default TemplateForm;
