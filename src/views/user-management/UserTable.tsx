import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Delete, Edit } from '@mui/icons-material';
import { UserModel } from '../../models/userModels';

interface UserTableProps {
    isLoading: boolean;
    users?: UserModel[];
}

const UserTable = ({ isLoading, users }: UserTableProps) => {
    return (
        <Table
            columns={['Voornaam', 'Achternaam', 'E-mailadres', 'Rol', 'Actief']}
            isLoading={isLoading}
        >
            {users &&
                users.map((user) => (
                    <Row key={user._id}>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.emailAddress}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.isActive}</TableCell>
                        <TableCell align='right'>
                            {user.isActive && (
                                <IconButton aria-label='edit' color='secondary'>
                                    <Edit />
                                </IconButton>
                            )}
                            <IconButton aria-label='delete' color='secondary'>
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
