import {
    Button,
    Link,
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormHelperText, Dialog, Grow, CardContent, Card, MenuItem, Select, Divider
} from '@mui/material';
import {InsertPageBreak, Visibility, VisibilityOff} from '@mui/icons-material';
import { useFormik } from 'formik';
import React, { useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import {WorkshopShiftSchema} from "../../schemas/workshopShiftSchemas";
import {WorkshopShiftModel} from "../../models/workshopShiftModels";
import {useCreateShiftMutation} from "../../api/workshop/workshopApi";
import {render} from "react-dom";
import Row from "../../components/table/Row";

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
            name: 'Markland College Zevenbergen'
        },
    ]

    const handleSaveWorkshop = (values: WorkshopShiftModel): void => {
        // register(values);
    };

    const formik = useFormik({
        initialValues: {
            clientId: '',
            function: '',
            maxAmountOfParticipants: 10,
            details: '',
            location: {
                address: '',
                city: '',
                postcode: '',
                country: 'Nederland'
            }
        },
        validationSchema: WorkshopShiftSchema,
        validateOnChange: false,
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
                                        <MenuItem key={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                                <Divider></Divider>
                                <InputLabel>Werklocatie</InputLabel>
                                <Stack spacing={1} direction={"row"}>
                                    <TextField
                                        id='location.address'
                                        name='location.address'
                                        label='Adres'
                                    ></TextField>
                                    <TextField
                                        id='location.city'
                                        name='location.city'
                                        label='Stad'
                                        >
                                    </TextField>
                                </Stack>
                                <Stack spacing={1} direction={"row"}>
                                    <TextField
                                        id='location.postcode'
                                        name='location.postcode'
                                        label='Postcode'
                                        error={
                                            formik.touched.location?.postcode &&
                                            Boolean(formik.errors.location?.postcode)
                                        }
                                        ></TextField>
                                    <Select
                                        id='location.country'
                                        name='location.country'
                                        label='Land'
                                        >
                                        <MenuItem value={"Nederland"}>
                                            Nederland
                                        </MenuItem>
                                        <MenuItem value={"België"}>
                                            België
                                        </MenuItem>
                                    </Select>
                                </Stack>
                                <Divider></Divider>
                                <TextField
                                    id='maxAmountOfParticipants'
                                    name='maxAmountOfParticipants'
                                    label="Aantal medewerkers"
                                    type={"number"}>
                                </TextField>
                                <TextField
                                    id='details'
                                    name='details'
                                    label="Extra info"
                                    >
                                </TextField>
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
