import {Button, Container, IconButton, Tab, TableCell, Tabs} from '@mui/material';
import {
    RetrievedWorkshopShiftModel,
} from '../../models/workshopShiftModels';
import {
    useCancelParticipationMutation,
    useConfirmEnrollmentMutation, useDoneParticipationMutation,
    useRejectEnrollmentMutation
} from '../../api/shift/shiftApi';

import Table from "../../components/table/Table";
import Row from "../../components/table/Row";
import { Check, Clear, PersonAdd} from "@mui/icons-material";
import {useState} from "react";
import {formDialog} from "../../components/dialog/FormDialog";
import NonExistingUserForm from "./NonExistingUserForm";
import ConfirmDialog, {confirmDialog} from "../../components/dialog/ConfirmDialog";

interface ShiftRegistrationsProps {
    shift: RetrievedWorkshopShiftModel;
}


const ShiftRegistrations = ({ shift }: ShiftRegistrationsProps) => {
    const [tab, setTab] = useState<number>(0);

    const [confirmEnrollment] = useConfirmEnrollmentMutation();

    const [rejectEnrollment] = useRejectEnrollmentMutation();

    const [cancelParticipation] = useCancelParticipationMutation();

    const [doneParticipation] = useDoneParticipationMutation();

    const handleClickActivate = (workshopShift: RetrievedWorkshopShiftModel | undefined): void => {
        if (workshopShift !== undefined) {
        formDialog(
            'Gebruiker toevoegen',
            <NonExistingUserForm shift={shift}></NonExistingUserForm>
        );

    }
    };

    const handleApproveCandidate = (user) => {
        if (shift && user) {
            confirmDialog('Kandidaat bevestigen',
                `Weet u zeker dat u ${user.firstName} ${user.lastName} wilt goedkeuren voor deze workshop?`,
                () => {
                    confirmEnrollment({id: shift._id, user_id: user._id});
                })
        }
    }

    const handleRejectCandidate = (user) => {
        if (shift) {
            confirmDialog('Kandidaat afkeuren',
                `Weet u zeker dat u ${user.firstName} ${user.lastName} wilt afkeuren voor deze workshop?`,
                () => {
                    rejectEnrollment({id: shift._id, user_id: user._id});
                })
        }
    }

    const handleCancelParticipant = (user) => {
        if (shift && user) {
            confirmDialog('Participatie annuleren',
                `Weet u zeker dat u ${user.firstName} ${user.lastName} wilt weghalen bij deze workshop?`,
                () => {
                    cancelParticipation({id: shift._id, user_id: user._id});
                })
        }
    }

    const handleDoneParticipant = (user) => {
        if (shift && user) {
            confirmDialog('Participatie afronden',
                `Weet u zeker dat u de status van ${user.firstName} ${user.lastName} op voldaan wilt zetten?`,
                () => {
                    doneParticipation({id: shift._id, user_id: user._id});
                })
        }
    }


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Container>
            <ConfirmDialog/>
            <Tabs
                value={tab}
                onChange={handleChange}
                aria-label='basic tabs example'>
                <Tab label='Kandidaten' />
                <Tab label='Participanten' />
            </Tabs>
            {tab === 0 ?
                <Table columns={["Naam", "E-mail", "Acties"]} isLoading={false}>
                    {shift?.candidateUsers && shift?.candidateUsers.map((user) => (
                        <Row>
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{user.emailAddress}</TableCell>
                            <TableCell align='right'>
                                <IconButton
                                    aria-label='accept'
                                    color='success'
                                    onClick={() => handleApproveCandidate(user)}
                                >
                                    <Check/>
                                </IconButton>
                                <IconButton
                                    aria-label='deny'
                                    color='error'
                                    onClick={() => handleRejectCandidate(user)}
                                >
                                    <Clear/>
                                </IconButton>
                            </TableCell>
                        </Row>
                    ))}
                    {shift?.candidateUsers.length === 0 &&
                        <Row>
                            <TableCell>Er zijn geen kandidaten voor deze workshop!</TableCell>
                        </Row>
                    }
                </Table>
                :
                <Table columns={["Naam", "E-Mail", "Acties"]} isLoading={false}>
                    {shift?.participantUsers && shift?.participantUsers.map((user) => (
                    <Row>
                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                        <TableCell>{user.emailAddress}</TableCell>
                        <TableCell align='right'>
                            <IconButton
                                aria-label='accept'
                                color='success'
                                onClick={() => handleDoneParticipant(user)}
                            >
                                <Check/>
                            </IconButton>
                            <IconButton
                                aria-label='deny'
                                color='error'
                                onClick={() => handleCancelParticipant(user)}
                            >
                                <Clear/>
                            </IconButton>
                        </TableCell>
                    </Row>
                        ))}
                    {shift?.participants && shift?.participants.map((user) => (
                        user.firstName &&
                        <Row>
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{user.emailAddress}</TableCell>
                            <TableCell align='right'>
                                <IconButton
                                    aria-label='accept'
                                    color='success'
                                    onClick={() => handleDoneParticipant(user)}
                                >
                                    <Check/>
                                </IconButton>
                                <IconButton
                                    aria-label='deny'
                                    color='error'
                                    onClick={() => handleCancelParticipant(user)}
                                >
                                    <Clear/>
                                </IconButton>
                            </TableCell>
                        </Row>
                    ))

                    }
                    {shift?.participantUsers.length === 0 &&
                        <Row>
                            <TableCell>Er zijn geen participanten in deze workshop!</TableCell>
                        </Row>
                    }
                </Table>
            }
            <Button
                variant='contained'
                component='label'
                sx={{ my: '16px' }}
                onClick={() => handleClickActivate(shift)}
            >
                <PersonAdd />
                Participant toevoegen
            </Button>
        </Container>
    );
};

export default ShiftRegistrations;
