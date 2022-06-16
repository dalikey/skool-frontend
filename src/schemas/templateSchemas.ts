import * as Yup from 'yup';

export const TemplateSchema = Yup.object({
    title: Yup.string().required('Verplicht'),
    content: Yup.string().required('Verplicht'),
    trigger: Yup.string().required('Verplicht')
});
