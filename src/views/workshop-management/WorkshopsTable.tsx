import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Delete, Edit, Share } from '@mui/icons-material';
import { WorkshopModel } from '../../models/workshopModels';
import NonExistingUserForm from './NonExistingUserForm';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';

interface WorkshopTableProps {
    isLoading: boolean;
    workshops?: WorkshopModel[];
}

const WorkshopTable = ({ isLoading, workshops }: WorkshopTableProps) => {
    const openNonExistingUserForm = () => {
        formDialog('Nieuwe gebruiker toevoegen', <NonExistingUserForm />);
    };

    return (
        <Table
            columns={['Naam', 'Beschrijving', 'Benodigde materialen']}
            isLoading={isLoading}
        >
            {workshops &&
                workshops.map((workshop) => (
                    <Row key={workshop._id}>
                        <TableCell>{workshop.name}</TableCell>
                        <TableCell>{workshop.content}</TableCell>
                        <TableCell>{workshop.materials}</TableCell>
                        <TableCell align='right'>
                            {workshop.isActive && (
                                <>
                                    <FormDialog />
                                    <IconButton
                                        aria-label='share'
                                        color='secondary'
                                        onClick={openNonExistingUserForm}
                                    >
                                        <Share />
                                    </IconButton>
                                    <IconButton
                                        aria-label='edit'
                                        color='secondary'
                                    >
                                        <Edit />
                                    </IconButton>
                                </>
                            )}
                            <IconButton aria-label='delete' color='secondary'>
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </Row>
                ))}
            {workshops?.length === 0 && (
                <Row>
                    <TableCell>Er zijn geen workshops beschikbaar.</TableCell>
                </Row>
            )}
        </Table>
    );
};

export default WorkshopTable;
