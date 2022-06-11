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
    hourRate: Yup.number(),
    dayRate: Yup.number(),
    location: Yup.object({
        address: Yup.string().required('Verplicht'),
        city: Yup.string().required('Verplicht'),
        postalCode: Yup.string()
            .required('Verplicht')
            .matches(/\d{4}\s[A-Z]{2}/, 'Geen geldige postcode'),
        country: Yup.string().required('Verplicht'),
    }).required('Verplicht'),
    timestamps: Yup.array().of(
        Yup.object({
            startTime: Yup.string().required('Verplicht'),
            endTime: Yup.string().required('Verplicht'),
        })
    ),
});
