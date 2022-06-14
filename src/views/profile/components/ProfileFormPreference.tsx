import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography,
} from '@mui/material';
import { FieldArray, FormikContextType, FormikProvider } from 'formik';
import { useEffect } from 'react';
import { useGetAllWorkshopsQuery } from '../../../api/workshop/workshopApi';

interface ProfileFormProps {
    formik: FormikContextType<any>;
}

const ProfileFormPreference = ({ formik }: ProfileFormProps) => {
    const { data } = useGetAllWorkshopsQuery({ isActive: true });

    const levelPreferences: string[] = [
        'basisschool',
        'mavo',
        'havo',
        'vwo',
        'gymnasium',
        'hbo',
        'wo',
        'werkniveau',
    ];

    return (
        <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12}>
                <Grid container>
                    <Typography mt={-2} pb={1}>
                        Welke workshops kunt u geven?
                    </Typography>
                    <FormikProvider value={formik}>
                        <FieldArray
                            name='workshopPreferences'
                            render={({ remove, push }) => (
                                <>
                                    {data?.result &&
                                        data.result.length > 0 &&
                                        data.result.map((workshop, index) => (
                                            <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                key={index}
                                            >
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={formik.values.workshopPreferences.includes(
                                                                    workshop._id
                                                                )}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    e.target
                                                                        .checked
                                                                        ? push(
                                                                              workshop._id
                                                                          )
                                                                        : remove(
                                                                              formik.values.workshopPreferences.indexOf(
                                                                                  workshop._id
                                                                              )
                                                                          );
                                                                }}
                                                            />
                                                        }
                                                        label={workshop.name}
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        ))}
                                </>
                            )}
                        />
                    </FormikProvider>
                </Grid>
                <Grid container pt={2} pb={1}>
                    <Typography>
                        Op welke niveaus kunt u uw workshops geven?
                    </Typography>
                    <FormikProvider value={formik}>
                        <FieldArray
                            name='levelPreferences'
                            render={({ remove, push }) => (
                                <>
                                    {levelPreferences.map((level, index) => (
                                        <Grid item xs={12} md={6} key={level}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={formik.values.levelPreferences.includes(
                                                                level
                                                            )}
                                                            onChange={(e) =>
                                                                e.target.checked
                                                                    ? push(
                                                                          level
                                                                      )
                                                                    : remove(
                                                                          index
                                                                      )
                                                            }
                                                        />
                                                    }
                                                    label={level}
                                                />
                                            </FormGroup>
                                        </Grid>
                                    ))}
                                </>
                            )}
                        />
                    </FormikProvider>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfileFormPreference;
