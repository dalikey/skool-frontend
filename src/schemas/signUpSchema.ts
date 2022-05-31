import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    firstName: Yup.string().required('Verplicht'),
    lastName: Yup.string().required('Verplicht'),
    emailAddress: Yup.string()
        .email('Incorrect e-mailadres')
        .required('Verplicht'),
    password: Yup.string()
        .required('Verplicht')
        .min(8, 'Minimum van 8 karakters'),
    repeatedPassword: Yup.string()
        .required('Verplicht')
        .min(8, 'Minimum van 8 karakters')
        .oneOf([Yup.ref('password'), null], 'Wachtwoorden komen niet overeen'),
});
