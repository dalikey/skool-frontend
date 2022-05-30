import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    emailAddress: Yup.string().email('Incorrect e-mailadres').required('Verplicht'),
    password: Yup.string()
        .required('Verplicht')
        .min(8, 'Minimum van 8 karakters'),
});

export const SignUpSchema = LoginSchema.concat(
    Yup.object({
        repeatedPassword: Yup.string()
            .required('Verplicht')
            .oneOf(
                [Yup.ref('password'), null],
                'Wachtwoorden komen niet overeen'
            ),
    })
);
