import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Delete, Edit } from '@mui/icons-material';
import { UserModel } from '../../models/userModels';
import { formDialog } from '../../components/dialog/FormDialog';
import AdminProfileForm from './UserProfileForm';
import { confirmDialog } from '../../components/dialog/ConfirmDialog';
import { useDeleteUserMutation } from '../../api/user/userApi';

interface UserTableProps {
    isLoading: boolean;
    users?: UserModel[];
}

const UserTable = ({ isLoading, users }: UserTableProps) => {
    const [deleteUser] = useDeleteUserMutation();

    const openProfileForm = (id: string): void => {
        formDialog('Profiel bewerken', <AdminProfileForm id={id} />);
    };

    const handleClickDelete = (user: UserModel): void => {
        confirmDialog(
            'Registratie goedkeuren',
            `Weet u zeker dat u de gebruiker "${user.firstName} ${user.lastName}" wilt verwijderen?`,
            () => deleteUser(user._id)
        );
    };

    return (
        <Table
            columns={['Voornaam', 'Achternaam', 'E-mailadres', 'Rol']}
            isLoading={isLoading}
        >
            {users &&
                users.map((user) => (
                    <Row key={user._id}>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.emailAddress}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell align='right'>
                            {user.isActive && (
                                <IconButton
                                    aria-label='edit'
                                    color='secondary'
                                    onClick={() => openProfileForm(user._id)}
                                >
                                    <Edit />
                                </IconButton>
                            )}
                            <IconButton
                                aria-label='delete'
                                color='secondary'
                                onClick={() => handleClickDelete(user)}
                            >
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </Row>
                ))}
            {users?.length === 0 && (
                <Row>
                    <TableCell>Er zijn geen gebruikers.</TableCell>
                </Row>
            )}
        </Table>
    );
};

export default UserTable;
