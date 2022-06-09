import * as Yup from 'yup';


export const WorkshopShiftSchema = Yup.object({
    clientId: Yup.string(),
    function: Yup.string().required('Verplicht'),
    maxAmountOfParticipants: Yup.number()
        .required('Verplicht'),
    details: Yup.string(),
    location: Yup.object(
        {
            address: Yup.string().required('Verplicht'),
            city: Yup.string().required('Verplicht'),
            postcode: Yup.string().required('Verplicht').matches(/[1-9]{4}[A-Z]{2}/, 'Geen geldige postcode'),
            country: Yup.string().required('Verplicht')
        }
    )
});
