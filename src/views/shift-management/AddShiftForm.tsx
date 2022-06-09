import {
    Button,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Grow,
    CardContent,
    Card,
    MenuItem,
    Select,
    Divider,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { WorkshopShiftSchema } from '../../schemas/workshopShiftSchemas';
import { WorkshopShiftModel } from '../../models/workshopShiftModels';
import { useCreateShiftMutation } from '../../api/workshop/workshopApi';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import {DatePicker, DesktopDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { FieldArray } from 'formik';
import { DateTime } from 'luxon';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {format} from "date-fns";


const AddShiftForm = () => {
    const [createShift, { isSuccess, isError, isLoading }] =
        useCreateShiftMutation();

    const customers = [
        {
            _id: '35345256455653456',
            contact: {
                emailAddress: 'markland@example.com',
                phoneNumber: '+31612345678',
            },
            location: {
                street_houseNr: 'Gildelaan 1',
                postalcode: '4761NV',
                city: 'Zevenbergen',
                country: 'Nederland',
            },
            name: 'Markland College Zevenbergen',
        },
        {
            _id: '3245234532454353452',
            contact: {
                emailAddress: 'markland@example.com',
                phoneNumber: '+31612345678',
            },
            location: {
                street_houseNr: 'Gildelaan 1',
                postalcode: '4761NV',
                city: 'Zevenbergen',
                country: 'Nederland',
            },
            name: 'Markland College Oudenbosch',
        },
    ];

    const functies = [
        {
            _id: '1434523452345435345',
            name: 'Vloggen',
        },
        {
            _id: '435234523543245435',
            name: 'Breakdance',
        },
    ];

    const handleSaveWorkshop = (values: WorkshopShiftModel): void => {
        console.log(values);
        // register(values);
    };

    const formik = useFormik({
        initialValues: {
            clientId: '',
            workshopId: '',
            maximumParticipants: 10,
            extraInfo: '',
            location: {
                address: '',
                city: '',
                postcode: '',
                country: 'Nederland',
            },
            targetAudience: '',
            level: '',
            date: new Date(),
            availableUntil: new Date(),
            hourRate: 0,
            dayRate: 0,
            timestamps: [
                {
                    startTime: '',
                    endTime: '',
                },
            ],
        },
        validateOnChange: true,
        onSubmit: handleSaveWorkshop,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/sign-in');
        }
    }, [isSuccess, navigate]);
    return (

        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='80vh'
            width='100%'
        >
            <Grow in={true}>
                <Card sx={{ minWidth: '350px' }}>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={1}>
                                <FormControl variant={'standard'} fullWidth>
                                    <InputLabel>Klant</InputLabel>
                                    <Select
                                        id='clientId'
                                        name='clientId'
                                        label='Klant'
                                        value={formik.values.clientId}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.clientId &&
                                            Boolean(formik.errors.clientId)
                                        }
                                        variant='standard'
                                    >
                                        {customers.map((item) => (
                                            <MenuItem value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                        {functies.map((item) => (
                                            <MenuItem value={item._id}>
                                                Workshopdocent {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Divider></Divider>
                                <InputLabel>Werklocatie</InputLabel>
                                <Stack spacing={1} direction={'row'}>
                                    <TextField
                                        id='location.address'
                                        name='location.address'
                                        label='Adres'
                                        value={formik.values.location.address}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.location?.address &&
                                            Boolean(formik.errors.location?.address)
                                        }
                                        helperText={
                                            formik.touched.location?.address && formik.errors.location?.address
                                        }
                                    ></TextField>
                                    <TextField
                                        id='location.city'
                                        name='location.city'
                                        label='Stad'
                                        value={formik.values.location.city}
                                        onChange={formik.handleChange}
                                        helperText={
                                            formik.touched.location?.city && formik.errors.location?.city
                                        }
                                        error={
                                            formik.touched.location?.city &&
                                            Boolean(
                                                formik.errors.location?.city
                                            )
                                        }
                                    ></TextField>
                                </Stack>
                                <Stack spacing={1} direction={'row'}>
                                    <TextField
                                        id='location.postcode'
                                        name='location.postcode'
                                        label='Postcode'
                                        value={formik.values.location.postcode}
                                        onChange={formik.handleChange}
                                        helperText={
                                            formik.touched.location?.postcode && formik.errors.location?.postcode
                                        }
                                        error={
                                            formik.touched.location?.postcode &&
                                            Boolean(
                                                formik.errors.location?.postcode
                                            )
                                        }
                                    ></TextField>
                                    <FormControl variant={'filled'} fullWidth>
                                        <InputLabel>Land</InputLabel>
                                        <Select
                                            id='location.country'
                                            name='location.country'
                                            label='Land'
                                            value={formik.values.location.country}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.location?.country &&
                                                Boolean(
                                                    formik.errors.location?.country
                                                )
                                            }
                                        >
                                            <MenuItem value={'Nederland'}>
                                                Nederland
                                            </MenuItem>
                                            <MenuItem value={'België'}>
                                                België
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Divider></Divider>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label={'Datum'}
                                        inputFormat={'dd / MM / yyyy'}
                                        renderInput={(params) => (
                                            <TextField {...params}></TextField>
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
                                    <DatePicker
                                        label={'Beschikbaar tot'}
                                        inputFormat={'dd / MM / yyyy'}
                                        mask=''
                                        minDate={Date.now()}
                                        renderInput={(params) => (
                                            <TextField name={'availableUntil'} {...params}></TextField>
                                        )}
                                        onChange={(value) => formik.setFieldValue('availableUntil', new Date(value ?? ''))}
                                        value={formik.values.availableUntil ?? ''}
                                    ></DatePicker>
                                </LocalizationProvider>
                                <TextField
                                    id='maximumParticipants'
                                    name='maximumParticipants'
                                    label='Aantal medewerkers'
                                    type={'number'}
                                    value={formik.values.maximumParticipants}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.maximumParticipants &&
                                        Boolean(formik.errors.maximumParticipants)
                                    }
                                    helperText={
                                        formik.touched.maximumParticipants && formik.errors.maximumParticipants
                                    }
                                ></TextField>
                                <TextField
                                    id={'targetAudience'}
                                    name={'targetAudience'}
                                    label={'Doelgroep'}
                                    value={formik.values.targetAudience}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.targetAudience &&
                                        Boolean(formik.errors.targetAudience)
                                    }
                                    helperText={
                                        formik.touched.targetAudience && formik.errors.targetAudience
                                    }
                                ></TextField>
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
                                ></TextField>
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
                                        formik.touched.extraInfo && formik.errors.extraInfo
                                    }
                                ></TextField>
                                <Stack direction={'row'} spacing={1}>
                                    <TextField
                                        id='hourRate'
                                        name='hourRate'
                                        label='Uurloon'
                                        value={formik.values.hourRate}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.hourRate &&
                                            Boolean(formik.errors.hourRate)
                                        }
                                        helperText={
                                            formik.touched.hourRate && formik.errors.hourRate
                                        }
                                    ></TextField>
                                    <TextField
                                        id='dayRate'
                                        name='dayRate'
                                        label='Dagloon'
                                        value={formik.values.dayRate}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.dayRate &&
                                            Boolean(formik.errors.dayRate)
                                        }
                                        helperText={
                                            formik.touched.dayRate && formik.errors.dayRate
                                        }
                                    ></TextField>
                                </Stack>

                                <FormikProvider value={formik}>
                                    <FieldArray
                                        name='timestamps'
                                        render={({ remove, push }) => (
                                            <Stack spacing={1}>
                                                <Stack
                                                    direction={'row'}
                                                    spacing={1}
                                                >
                                                    <InputLabel>
                                                        Uren
                                                    </InputLabel>
                                                    <Button
                                                        onClick={() =>
                                                            push({
                                                                endHour: '',
                                                                startHour: '',
                                                            })
                                                        }
                                                    >
                                                        <Add></Add>
                                                    </Button>
                                                </Stack>
                                                {formik.values.timestamps
                                                    .length > 0 &&
                                                    formik.values.timestamps.map(
                                                        (timestamp, index) => (
                                                            <Stack
                                                                direction={
                                                                    'row'
                                                                }
                                                                spacing={1}
                                                            >
                                                                <TextField
                                                                    id={
                                                                        'startHour'
                                                                    }
                                                                    name={`timestamps.${index}.startTime`}

                                                                    label={
                                                                        'Start-tijd'
                                                                    }
                                                                ></TextField>
                                                                <TextField
                                                                    id={
                                                                        'endHour'
                                                                    }
                                                                    name={`timestamps.${index}.endTime`}
                                                                    label={
                                                                        'Eind-tijd'
                                                                    }

                                                                ></TextField>
                                                                { index !== 0 &&
                                                                    <Button
                                                                        onClick={() =>
                                                                            remove(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <Remove></Remove>
                                                                    </Button>}

                                                            </Stack>
                                                        )
                                                    )}
                                            </Stack>
                                        )}
                                    />
                                </FormikProvider>
                                <Button
                                    disabled={isLoading}
                                    type='submit'
                                    variant='contained'
                                    sx={{ my: '16px' }}
                                >
                                    Aanmaken
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Grow>
        </Box>
    );
};

export default AddShiftForm;
