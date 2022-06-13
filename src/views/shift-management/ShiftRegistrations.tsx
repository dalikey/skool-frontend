import {Button, Container, IconButton, Tab, TableCell, Tabs} from '@mui/material';
import {
    RetrievedWorkshopShiftModel,
} from '../../models/workshopShiftModels';
import {
    useCancelParticipationMutation,
    useConfirmEnrollmentMutation,
    useRejectEnrollmentMutation,
    useSignInWorkshopMutation
} from '../../api/shift/shiftApi';

import Table from "../../components/table/Table";
import Row from "../../components/table/Row";
import { Check, Clear, PersonAdd} from "@mui/icons-material";
import {useState} from "react";
import {formDialog} from "../../components/dialog/FormDialog";
import NonExistingUserForm from "./NonExistingUserForm";
import ConfirmDialog, {confirmDialog} from "../../components/dialog/ConfirmDialog";
import {useLocalStorage} from "../../app/useLocalStorage";
import {CredentialsModel} from "../../models/authModels";

interface ShiftRegistrationsProps {
    shift: RetrievedWorkshopShiftModel;
    isParticipating?: boolean
}


const ShiftRegistrations = ({ shift, isParticipating }: ShiftRegistrationsProps) => {
    const [tab, setTab] = useState<number>(0);

    const [signInWorkshop] =
        useSignInWorkshopMutation();

    const [confirmEnrollment] = useConfirmEnrollmentMutation();

    const [rejectEnrollment] = useRejectEnrollmentMutation();

    const [cancelParticipation] = useCancelParticipationMutation();

    const [user] = useLocalStorage<CredentialsModel>('user');

    const handleClickActivate = (workshopShift: RetrievedWorkshopShiftModel | undefined): void => {
        if (workshopShift !== undefined) {
        formDialog(
            'Gebruiker toevoegen',
            <NonExistingUserForm shift={shift}></NonExistingUserForm>
        );

    }
    };

    const handleApproveCandidate = () => {
        if (shift && user) {
            confirmDialog('Kandidaat bevestigen',
                `Weet u zeker dat u ${user.firstName} ${user.lastName} wilt goedkeuren voor deze workshop?`,
                () => {
                    confirmEnrollment({id: shift._id, user_id: user._id});
                })
        }
    }

    const handleRejectCandidate = () => {
        if (shift && user) {
            confirmDialog('Kandidaat afkeuren',
                `Weet u zeker dat u ${user.firstName} ${user.lastName} wilt afkeuren voor deze workshop?`,
                () => {
                    rejectEnrollment({id: shift._id, user_id: user._id});
                })
        }
    }

    const handleCancelCandidate = () => {
        if (shift && user) {
            confirmDialog('Participatie annuleren',
                `Weet u zeker dat u ${user.firstName} ${user.lastName} wilt weghalen bij deze workshop?`,
                () => {
                    cancelParticipation({id: shift._id, user_id: user._id});
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
                                    onClick={handleApproveCandidate}
                                >
                                    <Check/>
                                </IconButton>
                                <IconButton
                                    aria-label='deny'
                                    color='error'
                                    onClick={handleRejectCandidate}
                                >
                                    <Clear/>
                                </IconButton>
                            </TableCell>
                        </Row>
                    ))}
                </Table>
                :
                <Table columns={["Naam", "E-Mail", "Acties"]} isLoading={false}>
                    {shift?.participantUsers && shift?.participantUsers.map((user) => (
                    <Row>
                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                    </Row>
                        ))}
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
