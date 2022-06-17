import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Grow,
    MenuItem,
    Select,
    Box,
    InputAdornment,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { FormikProvider, useFormik } from 'formik';
import { WorkshopShiftSchema } from '../../schemas/workshopShiftSchemas';
import {
    RetrievedWorkshopShiftModel,
    WorkshopShiftModel,
} from '../../models/workshopShiftModels';
import { useGetAllWorkshopsQuery } from '../../api/workshop/workshopApi';
import { useGetAllCustomersQuery } from '../../api/customer/customerApi';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { FieldArray } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    useCreateShiftMutation,
    useEditShiftMutation,
} from '../../api/shift/shiftApi';
import { useFormDialogStore } from '../../components/dialog/FormDialog';
import { Fragment } from 'react';

interface AddShiftFormProps {
    shift?: RetrievedWorkshopShiftModel;
}

export const AddShiftForm = ({ shift }: AddShiftFormProps) => {
    const { close } = useFormDialogStore();

    const { data: customers } = useGetAllCustomersQuery();

    const { data: functions } = useGetAllWorkshopsQuery({ isActive: true });

    const [createShift, { isLoading: createIsLoading }] =
        useCreateShiftMutation();

    const [editShift, { isLoading: editIsLoading }] = useEditShiftMutation();

    const handleSaveWorkshop = (values: WorkshopShiftModel): void => {
        if (shift && shift._id) {
            editShift(values);
        } else {
            createShift(values);
        }
        close();
    };

    const formik = useFormik({
        initialValues: {
            _id: shift?._id ?? '',
            clientId: shift?.clientId ?? '',
            workshopId: shift?.workshopId ?? '',
            maximumParticipants: shift?.maximumParticipants ?? 0,
            extraInfo: shift?.extraInfo ?? '',
            location: {
                address: shift?.location.address ?? '',
                city: shift?.location.city ?? '',
                postalCode: shift?.location.postalCode ?? '',
                country: shift?.location.country ?? 'Nederland',
            },
            targetAudience: shift?.targetAudience ?? '',
            level: shift?.level ?? '',
            date: shift?.date ?? new Date(),
            availableUntil: shift?.availableUntil ?? new Date(),
            dayRate: shift?.dayRate ?? 0,
            timestamps: shift?.timestamps ?? [
                {
                    startTime: '',
                    endTime: '',
                    title: '',
                },
            ],
        },
        validationSchema: WorkshopShiftSchema,
        validateOnChange: true,
        onSubmit: handleSaveWorkshop,
    });

    const handleCustomerChange = (value) => {
        customers?.result?.forEach((customerEntry) => {
            if (customerEntry._id === value.target.value) {
                formik.setFieldValue(
                    'location.address',
                    customerEntry.location.address
                );
                formik.setFieldValue(
                    'location.postalCode',
                    customerEntry.location.postalCode
                );
                formik.setFieldValue(
                    'location.city',
                    customerEntry.location.city
                );
                formik.setFieldValue(
                    'location.country',
                    customerEntry.location.country
                );
            }
        });
        formik.handleChange(value);
    };

    return (
        <Grow in={true}>
            <form onSubmit={formik.handleSubmit} style={{ maxWidth: '1000px' }}>
                <Grid
                    container
                    columnSpacing={4}
                    rowSpacing={2}
                    alignItems='flex-start'
                >
                    <Grid
                        container
                        item
                        md={6}
                        rowSpacing={1}
                        columnSpacing={2}
                        alignItems='flex-start'
                    >
                        <Grid item xs={12} md={6}>
                            <FormControl variant={'standard'} fullWidth>
                                <InputLabel>Klant</InputLabel>
                                <Select
                                    id='clientId'
                                    name='clientId'
                                    label='Klant'
                                    value={formik.values.clientId}
                                    onChange={handleCustomerChange}
                                    error={
                                        formik.touched.clientId &&
                                        Boolean(formik.errors.clientId)
                                    }
                                    variant='standard'
                                >
                                    {customers?.result?.map((item) => (
                                        <MenuItem
                                            value={item._id}
                                            key={item._id}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant={'standard'} fullWidth>
                                <InputLabel>Functie</InputLabel>
                                <Select
                                    id='workshopId'
                                    name='workshopId'
                                    label='Functie'
                                    value={formik.values.workshopId}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.workshopId &&
                                        Boolean(formik.errors.workshopId)
                                    }
                                    variant='standard'
                                >
                                    {functions?.result?.map((item) => (
                                        <MenuItem
                                            value={item._id}
                                            key={item._id}
                                        >
                                            Workshopdocent {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='location.address'
                                name='location.address'
                                label='Adres'
                                variant='standard'
                                value={formik.values.location.address}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.location?.address &&
                                    Boolean(formik.errors.location?.address)
                                }
                                helperText={
                                    formik.touched.location?.address &&
                                    formik.errors.location?.address
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='location.city'
                                name='location.city'
                                label='Stad'
                                variant='standard'
                                value={formik.values.location.city}
                                onChange={formik.handleChange}
                                helperText={
                                    formik.touched.location?.city &&
                                    formik.errors.location?.city
                                }
                                error={
                                    formik.touched.location?.city &&
                                    Boolean(formik.errors.location?.city)
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='location.postalCode'
                                name='location.postalCode'
                                label='Postcode'
                                variant='standard'
                                fullWidth
                                value={formik.values.location.postalCode}
                                onChange={formik.handleChange}
                                helperText={
                                    formik.touched.location?.postalCode &&
                                    formik.errors.location?.postalCode
                                }
                                error={
                                    formik.touched.location?.postalCode &&
                                    Boolean(formik.errors.location?.postalCode)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant={'standard'} fullWidth>
                                <InputLabel>Land</InputLabel>
                                <Select
                                    id='location.country'
                                    name='location.country'
                                    label='Land'
                                    value={formik.values.location.country}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.location?.country &&
                                        Boolean(formik.errors.location?.country)
                                    }
                                >
                                    <MenuItem value={'Nederland'}>
                                        Nederland
                                    </MenuItem>
                                    <MenuItem value={'België'}>België</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label='Datum'
                                    inputFormat='dd / MM / yyyy'
                                    renderInput={(params) => (
                                        <TextField
                                            variant='standard'
                                            size='small'
                                            fullWidth
                                            {...params}
                                        />
                                    )}
                                    mask=''
                                    minDate={Date.now()}
                                    onChange={(value) =>
                                        formik.setFieldValue(
                                            'date',
                                            new Date(value ?? '')
                                        )
                                    }
                                    value={formik.values.date}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label='Beschikbaar tot'
                                    inputFormat='dd / MM / yyyy'
                                    mask=''
                                    minDate={Date.now()}
                                    renderInput={(params) => (
                                        <TextField
                                            variant='standard'
                                            size='small'
                                            fullWidth
                                            {...params}
                                        />
                                    )}
                                    onChange={(value) =>
                                        formik.setFieldValue(
                                            'availableUntil',
                                            new Date(value ?? '')
                                        )
                                    }
                                    value={formik.values.availableUntil ?? ''}
                                />
                            </Grid>
                        </LocalizationProvider>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='maximumParticipants'
                                name='maximumParticipants'
                                label='Aantal medewerkers'
                                type='number'
                                inputProps={{
                                    inputProps: {
                                        min: 1,
                                    },
                                }}
                                value={formik.values.maximumParticipants}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.maximumParticipants &&
                                    Boolean(formik.errors.maximumParticipants)
                                }
                                helperText={
                                    formik.touched.maximumParticipants &&
                                    formik.errors.maximumParticipants
                                }
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='targetAudience'
                                name='targetAudience'
                                label='Doelgroep'
                                value={formik.values.targetAudience}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.targetAudience &&
                                    Boolean(formik.errors.targetAudience)
                                }
                                helperText={
                                    formik.touched.targetAudience &&
                                    formik.errors.targetAudience
                                }
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id={'level'}
                                name={'level'}
                                label={'Niveau'}
                                value={formik.values.level}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.level &&
                                    Boolean(formik.errors.level)
                                }
                                helperText={
                                    formik.touched.level && formik.errors.level
                                }
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='dayRate'
                                name='dayRate'
                                label='Dagloon'
                                type='number'
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            €
                                        </InputAdornment>
                                    ),
                                }}
                                value={formik.values.dayRate}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.dayRate &&
                                    Boolean(formik.errors.dayRate)
                                }
                                helperText={
                                    formik.touched.dayRate &&
                                    formik.errors.dayRate
                                }
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='extraInfo'
                                name='extraInfo'
                                label='Extra info'
                                value={formik.values.extraInfo}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.extraInfo &&
                                    Boolean(formik.errors.extraInfo)
                                }
                                helperText={
                                    formik.touched.extraInfo &&
                                    formik.errors.extraInfo
                                }
                                variant='standard'
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <FormikProvider value={formik}>
                            <FieldArray
                                name='timestamps'
                                render={({ remove, push }) => (
                                    <Grid item xs={12}>
                                        <Box
                                            display='flex'
                                            justifyContent='space-between'
                                            alignItems='center'
                                        >
                                            <Typography>Workshoprondes</Typography>
                                            <IconButton
                                                onClick={() =>
                                                    push({
                                                        endHour: '',
                                                        startHour: '',
                                                    })
                                                }
                                            >
                                                <Add color='primary' />
                                            </IconButton>
                                        </Box>
                                        <Grid
                                            container
                                            columnSpacing={2}
                                            rowSpacing={1}
                                        >
                                            {formik.values.timestamps.length >
                                                0 &&
                                                formik.values.timestamps.map(
                                                    (timestamp, index) => (
                                                        <Fragment key={index}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                display='flex'
                                                                justifyContent='space-between'
                                                                alignItems='center'
                                                            >
                                                                <TextField
                                                                    id={`timestamps.${index}.title`}
                                                                    name={`timestamps.${index}.title`}
                                                                    label={
                                                                        'Omschrijving'
                                                                    }
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .timestamps[
                                                                            index
                                                                        ].title
                                                                    }
                                                                    onChange={
                                                                        formik.handleChange
                                                                    }
                                                                    variant='standard'
                                                                    fullWidth
                                                                />
                                                                {index !==
                                                                    0 && (
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            remove(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <Delete />
                                                                    </IconButton>
                                                                )}
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <TextField
                                                                    id={`timestamps.${index}.startTime`}
                                                                    name={`timestamps.${index}.startTime`}
                                                                    label={
                                                                        'Starttijd'
                                                                    }
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .timestamps[
                                                                            index
                                                                        ]
                                                                            .startTime
                                                                    }
                                                                    onChange={
                                                                        formik.handleChange
                                                                    }
                                                                    variant='standard'
                                                                    fullWidth
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={6}
                                                            >
                                                                <TextField
                                                                    id={`timestamps.${index}.endTime`}
                                                                    name={`timestamps.${index}.endTime`}
                                                                    label={
                                                                        'Eindtijd'
                                                                    }
                                                                    value={
                                                                        formik
                                                                            .values
                                                                            .timestamps[
                                                                            index
                                                                        ]
                                                                            .endTime
                                                                    }
                                                                    onChange={
                                                                        formik.handleChange
                                                                    }
                                                                    variant='standard'
                                                                    fullWidth
                                                                />
                                                            </Grid>
                                                        </Fragment>
                                                    )
                                                )}
                                        </Grid>
                                    </Grid>
                                )}
                            />
                        </FormikProvider>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Button
                            onClick={close}
                            variant='text'
                            sx={{ my: '16px' }}
                        >
                            Annuleren
                        </Button>
                        {shift?._id ? (
                            <Button
                                disabled={editIsLoading}
                                type='submit'
                                variant='contained'
                                sx={{ my: '16px' }}
                            >
                                Aanpassen
                            </Button>
                        ) : (
                            <Button
                                disabled={createIsLoading}
                                type='submit'
                                variant='contained'
                                sx={{ my: '16px' }}
                            >
                                Aanmaken
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </form>
        </Grow>
    );
};

export default AddShiftForm;
