import { IconButton, TableCell } from '@mui/material';
import {
    useActivateWorkshopMutation,
    useDeactivateWorkshopMutation,
} from '../../api/workshop/workshopApi';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Clear, Check } from '@mui/icons-material';
import { confirmDialog } from '../../components/dialog/ConfirmDialog';
import { WorkshopModel } from '../../models/workshopModels';

interface WorkshopTableProps {
    isLoading: boolean;
    workshops?: WorkshopModel[];
}

const RegistrationTable = ({ isLoading, workshops }: WorkshopTableProps) => {
    const [activateWorkshop, { isLoading: isActivateLoading }] =
        useActivateWorkshopMutation();
    const [deactivateWorkshop, { isLoading: isDeactiveLoading }] =
        useDeactivateWorkshopMutation();

    const handleClickActivate = (workshop: WorkshopModel): void => {
        confirmDialog(
            'Registratie goedkeuren',
            `Weet u zeker dat u de registratie van ${workshop.name} wilt goedkeuren?`,
            () => activateWorkshop(workshop._id)
        );
    };

    const handleClickDeactivate = (workshop: WorkshopModel): void => {
        confirmDialog(
            'Registratie afkeuren',
            `Weet u zeker dat u de registratie van ${workshop.name} wilt afkeuren?`,
            () => deactivateWorkshop(workshop._id)
        );
    };

    return (
        <Table
            columns={['Naam', 'Beschrijving', 'Benodigde materialen']}
            isLoading={isLoading || isActivateLoading || isDeactiveLoading}
        >
            {workshops &&
                workshops.map((workshop) => (
                    <Row key={workshop._id}>
                        <TableCell>{workshop.name}</TableCell>
                        <TableCell>{workshop.content}</TableCell>
                        <TableCell>{workshop.materials}</TableCell>
                        <TableCell align='right'>
                            <IconButton
                                aria-label='accept'
                                color='success'
                                onClick={() => handleClickActivate(workshop)}
                            >
                                <Check />
                            </IconButton>
                            <IconButton
                                aria-label='deny'
                                color='error'
                                onClick={() => handleClickDeactivate(workshop)}
                            >
                                <Clear />
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

export default RegistrationTable;
