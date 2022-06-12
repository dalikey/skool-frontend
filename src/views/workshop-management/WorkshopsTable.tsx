import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Delete, Edit, PersonAddAlt } from '@mui/icons-material';
import { WorkshopModel } from '../../models/workshopModels';
import NonExistingUserForm from './NonExistingUserForm';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import EditWorkshopForm from './EditWorkshopForm';
import ConfirmDialog, {
    confirmDialog,
} from '../../components/dialog/ConfirmDialog';
import { useDeleteWorkshopMutation } from '../../api/workshop/workshopApi';

interface WorkshopTableProps {
    isLoading: boolean;
    workshops?: WorkshopModel[];
}

const WorkshopTable = ({ isLoading, workshops }: WorkshopTableProps) => {
    const [deleteWorkshop] = useDeleteWorkshopMutation();

    const openNonExistingUserForm = () => {
        formDialog('Nieuwe gebruiker toevoegen', <NonExistingUserForm />);
    };

    const openEditWorkshopForm = (): void => {
        formDialog('Workshop bewerken', <EditWorkshopForm />);
    };

    const handleClickDelete = (workshop: WorkshopModel): void => {
        confirmDialog(
            'Workshop verwijderen',
            `Weet u zeker dat u deze workshop "${workshop.name}" wilt verwijderen?`,
            () => deleteWorkshop(workshop._id)
        );
    };

    return (
        <>
            <FormDialog />
            <ConfirmDialog />
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
                                        <IconButton
                                            aria-label='share'
                                            color='secondary'
                                            onClick={openNonExistingUserForm}
                                        >
                                            <PersonAddAlt />
                                        </IconButton>
                                        <IconButton
                                            aria-label='edit'
                                            color='secondary'
                                            onClick={openEditWorkshopForm}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </>
                                )}
                                <IconButton
                                    aria-label='delete'
                                    color='secondary'
                                    onClick={() => handleClickDelete(workshop)}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </Row>
                    ))}
                {workshops?.length === 0 && (
                    <Row>
                        <TableCell>
                            Er zijn geen workshops beschikbaar.
                        </TableCell>
                    </Row>
                )}
            </Table>
        </>
    );
};

export default WorkshopTable;
