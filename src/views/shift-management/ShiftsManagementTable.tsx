import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import CollapsibleRow from '../../components/table/CollapsibleRow';
import Table from '../../components/table/Table';
import {RetrievedWorkshopShiftModel} from '../../models/workshopShiftModels';
import {Delete, Edit} from "@mui/icons-material";
import {formDialog} from "../../components/dialog/FormDialog";
import AddShiftForm from "./AddShiftForm";
import ConfirmDialog, {confirmDialog} from "../../components/dialog/ConfirmDialog";
import {useDeleteShiftMutation} from "../../api/shift/shiftApi";
import ShiftRegistrations from "./ShiftRegistrations";

interface ShiftManagementTableProps {
    isLoading: boolean;
    shifts?: RetrievedWorkshopShiftModel[];
}

const ShiftsManagementTable = ({
    isLoading,
    shifts,
}: ShiftManagementTableProps) => {
    const [deleteShift] = useDeleteShiftMutation();

    const openShiftFormEdit = (shift: RetrievedWorkshopShiftModel) => {
        formDialog('Shift Aanpassen', <AddShiftForm shift={shift} />);
    };

    const openShiftDeleteConfirmation = (
        shift: RetrievedWorkshopShiftModel
    ): void => {
        console.log(shift);
        confirmDialog(
            `Shift Verwijderen`,
            `Weet u zeker dat u de shift ${shift.workshop.name} op ${new Date(
                shift.date
            ).toLocaleDateString()} wilt verwijderen?`,
            () => deleteShift(shift._id)
        );
    };

    return (
        <Table
            columns={['Naam', 'Aantal medewerkers', 'Type', 'Plaats', 'Status', 'Datum', '']}
            isLoading={isLoading}
        >
            <ConfirmDialog />
            {shifts &&
                shifts.map((workshop) => (
                <CollapsibleRow key={workshop.workshopId}
                                innerContent={<ShiftRegistrations shift={workshop}></ShiftRegistrations>}
                >

                    <TableCell>Workshopdocent {workshop.workshop.name}</TableCell>
                    <TableCell>{(workshop.participants.length)} / {workshop.maximumParticipants}</TableCell>
                    <TableCell>{workshop.targetAudience}</TableCell>
                    <TableCell>{workshop.location.city}</TableCell>
                    <TableCell>Beschikbaar</TableCell>
                    <TableCell>{new Date(workshop.date).toLocaleDateString('nl-NL')}</TableCell>
                    <TableCell>
                        <>
                            <IconButton
                                aria-label='edit'
                                color='secondary'
                                onClick={() => {
                                    openShiftFormEdit(workshop)
                                }}
                            >
                                <Edit/>
                            </IconButton>
                            <IconButton
                                aria-label='delete'
                                color='secondary'
                                onClick={() => {
                                    openShiftDeleteConfirmation(workshop)
                                }}
                            >
                                <Delete/>
                            </IconButton>
                        </>
                    </TableCell>
                </CollapsibleRow>
                ))}
            {shifts?.length === 0 && (
                <Row>
                    <TableCell>Er zijn geen workshops beschikbaar.</TableCell>
                </Row>
            )}
        </Table>
    );
};

export default ShiftsManagementTable;
