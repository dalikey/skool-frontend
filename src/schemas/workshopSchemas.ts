import * as Yup from 'yup';

export const WorkshopSchema = Yup.object({
    name: Yup.string().required('Verplicht'),
    content: Yup.string().required('Verplicht'),
});
