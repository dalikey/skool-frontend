import {
    Button,
    Stack,
    TextField,
    FormControl,
    InputLabel,
 Grow, CardContent, Card, MenuItem, Select, Divider
} from '@mui/material';
import {Add, InsertPageBreak, Visibility, VisibilityOff} from '@mui/icons-material';
import { useFormik } from 'formik';
import React, { useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import {WorkshopShiftSchema} from "../../schemas/workshopShiftSchemas";
import {WorkshopShiftModel} from "../../models/workshopShiftModels";
import {useCreateShiftMutation} from "../../api/workshop/workshopApi";
import {render} from "react-dom";
import Row from "../../components/table/Row";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import {DateTimePicker, DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";

const AddShiftForm = () => {

    const [createShift, { isSuccess, isError, isLoading }] = useCreateShiftMutation();
    const customers = [
        {
            _id: '35345256455653456',
            contact: {
                emailAddress: 'markland@example.com',
                phoneNumber: '+31612345678'
            },
            location: {
                street_houseNr: 'Gildelaan 1',
                postalcode: '4761NV',
                city: 'Zevenbergen',
                country: 'Nederland'
            },
            name: 'Markland College Zevenbergen'
        },
        {   _id: '3245234532454353452',
            contact: {
                emailAddress: 'markland@example.com',
                phoneNumber: '+31612345678'
            },
            location: {
                street_houseNr: 'Gildelaan 1',
                postalcode: '4761NV',
                city: 'Zevenbergen',
                country: 'Nederland'
            },
            name: 'Markland College Oudenbosch'
        },
    ]

    const functies = [
        {
            "_id": "1434523452345435345",
            "name": "Vloggen"
        },
        {
            "_id": "435234523543245435",
            "name": "Breakdance"
        }
    ]


    const handleSaveWorkshop = (values: WorkshopShiftModel): void => {
        // register(values);
    };

    const handleChangeClient = () => {}

    const formik = useFormik({
        initialValues: {
            clientId: '',
            workshopId: '',
            maximumParticipants: 10,
            details: '',
            location: {
                address: '',
                city: '',
                postcode: '',
                country: 'Nederland'
            },
            targetAudience: 'School',
            level: '',
            date: new Date(),
            availableUntil: new Date(),
            hourRate: 0,
            dayRate: 0,
            timestamps: []

        },
        validationSchema: WorkshopShiftSchema,
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
            width='100%'>
            <Grow in={true}>
                <Card sx={{minWidth: '350px'}}>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={1}>
                                <FormControl variant={"standard"} fullWidth>
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
                                        variant='standard'>
                                        {customers.map(item => (
                                            <MenuItem value={item._id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant={"standard"} fullWidth>
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
                                        {functies.map(item => (
                                            <MenuItem value={item._id}>Workshopdocent {item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Divider></Divider>
                                <InputLabel>Werklocatie</InputLabel>
                                <Stack spacing={1} direction={"row"}>
                                    <TextField
                                        id='location.address'
                                        name='address'
                                        label='Adres'
                                    ></TextField>
                                    <TextField
                                        id='location.city'
                                        name='city'
                                        label='Stad'
                                        >
                                    </TextField>
                                </Stack>
                                <Stack spacing={1} direction={"row"}>
                                    <TextField
                                        id='location.postcode'
                                        name='postcode'
                                        label='Postcode'
                                        error={
                                            formik.touched.location?.postcode &&
                                            Boolean(formik.errors.location?.postcode)
                                        }
                                        ></TextField>
                                    <FormControl variant={"standard"} fullWidth>
                                    <InputLabel>Land</InputLabel>
                                    <Select
                                        id='location.country'
                                        name='country'
                                        label='Land'
                                        >
                                        <MenuItem value={"Nederland"}>
                                            Nederland
                                        </MenuItem>
                                        <MenuItem value={"België"}>
                                            België
                                        </MenuItem>
                                    </Select>
                                    </FormControl>
                                </Stack>
                                <Divider></Divider>
                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                    <DesktopDatePicker
                                        label={"Datum"}
                                        inputFormat={"dd-MM-yyyy"}
                                        renderInput={(params) => <TextField {...params}></TextField>}
                                     onChange={formik.handleChange} value={new Date()}></DesktopDatePicker>
                                </LocalizationProvider>
                                <TextField
                                    id='maximumParticipants'
                                    name='maximumParticipants'
                                    label="Aantal medewerkers"
                                    type={"number"}>
                                </TextField>
                                <TextField
                                    id={'targetAudience'}
                                    name={'targetAudience'}
                                    label={'Doelgroep'}
                                ></TextField>
                                <TextField
                                    id={'level'}
                                    name={'level'}
                                    label={'Niveau'}
                                ></TextField>
                                <TextField
                                    id='details'
                                    name='details'
                                    label="Extra info"
                                    >
                                </TextField>
                                <Stack direction={"row"} spacing={1}>
                                    <TextField
                                        id='hourRate'
                                        name='hourRate'
                                        label='Uurloon'
                                        >
                                    </TextField>
                                    <TextField
                                        id='dayRate'
                                        name='dayRate'
                                        label='Dagloon'
                                    >
                                    </TextField>
                                </Stack>
                                <InputLabel>
                                    Blokuren
                                </InputLabel>
                                <Stack direction={"row"} spacing={1}>
                                    <TextField></TextField>
                                    <TextField></TextField>
                                    <Button
                                    >
                                        <Add></Add>
                                    </Button>
                                </Stack>
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
