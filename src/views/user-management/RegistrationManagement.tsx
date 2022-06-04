import { Box, IconButton, Paper, TableCell } from '@mui/material';
import {
    useActivateUserMutation,
    useGetAllUsersQuery,
} from '../../api/user/userApi';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Clear, Check } from '@mui/icons-material';
import ConfirmDialog, {
    confirmDialog,
} from '../../components/dialog/ConfirmDialog';
import { RegistrationModel } from '../../models/userModels';

const RegistrationManagement = () => {
    const { data: users, isLoading: isListLoading } = useGetAllUsersQuery({
        isActive: null,
    });

    const [activateUser, { isLoading: isActivateLoading }] =
        useActivateUserMutation();
    const [deactivateUser, { isLoading: isDeactiveLoading }] =
        useActivateUserMutation();

    const handleClickActivate = (user: RegistrationModel): void => {
        confirmDialog(
            'Registratie goedkeuren',
            `Weet u zeker dat u de registratie van ${user.firstName} ${user.lastName} wilt goedkeuren?`,
            () => activateUser(user._id)
        );
    };

    const handleClickDeactivate = (user: RegistrationModel): void => {
        confirmDialog(
            'Registratie afkeuren',
            `Weet u zeker dat u de registratie van ${user.firstName} ${user.lastName} wilt afkeuren?`,
            () => deactivateUser(user._id)
        );
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <ConfirmDialog />
            <Box>
                <Table
                    columns={['Voornaam', 'Achternaam', 'E-mailadres']}
                    isLoading={
                        isListLoading || isActivateLoading || isDeactiveLoading
                    }
                >
                    {(users?.result ?? []).map((user) => (
                        <Row key={user._id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.emailAddress}</TableCell>
                            <TableCell align='right'>
                                <IconButton
                                    aria-label='accept'
                                    color='success'
                                    onClick={() => handleClickActivate(user)}
                                >
                                    <Check />
                                </IconButton>
                                <IconButton
                                    aria-label='deny'
                                    color='error'
                                    onClick={() => handleClickDeactivate(user)}
                                >
                                    <Clear />
                                </IconButton>
                            </TableCell>
                        </Row>
                    ))}
                </Table>
            </Box>
        </Paper>
    );
};

export default RegistrationManagement;
