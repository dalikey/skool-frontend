import * as Yup from 'yup';

export const UserUpdateSchema = Yup.object({
    passwordInfo: Yup.object().shape({
        password: Yup.string()
            .min(8, 'Minimum van 8 karakters')
            .matches(/[A-Z]+/, 'Minimaal 1 hoofdletter')
            .matches(/[1-9]+/, 'Minimaal 1 cijfer'),
        passwordConfirm: Yup.string()
            .min(8, 'Minimum van 8 karakters')
            .oneOf(
                [Yup.ref('password'), null],
                'Wachtwoorden komen niet overeen'
            ),
    }),
});
