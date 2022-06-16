import * as Yup from "yup";

export const NonExistingUserSchema = Yup.object({
    userId: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    emailAddress: Yup.string()
        .email('Incorrect e-mailadres'),
    hourRate: Yup.number().required('Verplicht')
});