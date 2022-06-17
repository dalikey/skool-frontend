import * as Yup from 'yup';

export const WorkshopShiftSchema = Yup.object({
    clientId: Yup.string().required('Verplicht'),
    workshopId: Yup.string().required('Verplicht'),
    maximumParticipants: Yup.number().required('Verplicht'),
    extraInfo: Yup.string(),
    targetAudience: Yup.string().required('Verplicht'),
    level: Yup.string().required('Verplicht'),
    date: Yup.date().required('Verplicht'),
    availableUntil: Yup.date().required('Verplicht'),
    dayRate: Yup.number(),
    location: Yup.object({
        address: Yup.string().required('Verplicht'),
        city: Yup.string().required('Verplicht'),
        postalCode: Yup.string()
            .required('Verplicht')
            .matches(/\d{4}[A-Z]{2}/, 'Geen geldige postcode'),
        country: Yup.string().required('Verplicht'),
    }).required('Verplicht'),
    timestamps: Yup.array().of(
        Yup.object({
            startTime: Yup.string().required('Verplicht').matches(/\d{2}:\d{2}/),
            endTime: Yup.string().required('Verplicht').matches(/\d{2}:\d{2}/),
        })
    ),
});
