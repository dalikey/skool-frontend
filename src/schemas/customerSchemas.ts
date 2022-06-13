import * as Yup from 'yup';

export const CustomerSchema = Yup.object({
    name: Yup.string().required('Verplicht'),
    phoneNumber: Yup.string().required('Verplicht'),
    emailAddress: Yup.string()
        .email('Incorrect e-mailadres')
        .required('Verplicht'),
    address: Yup.string().required('Verplicht'),
    city: Yup.string().required('Verplicht'),
    postalCode: Yup.string()
        .required('Verplicht')
        .min(4, 'Incorrecte postcode')
        .max(6, 'Incorrecte postcode')
        .matches(/^[0-9]{4}(?:[A-Z]{2})?$/, 'Ongeldige postcode'),
    country: Yup.string().required('Verplicht'),
});
