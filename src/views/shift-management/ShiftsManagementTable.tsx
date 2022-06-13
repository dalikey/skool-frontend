import {IconButton, TableCell} from '@mui/material';
import Row from '../../components/table/Row';
import CollapsibleRow from '../../components/table/CollapsibleRow';
import Table from '../../components/table/Table';
import {RetrievedWorkshopShiftModel, WorkshopShiftModel} from '../../models/workshopShiftModels';
import ShiftDetails from "../shifts/ShiftDetails";
import {Delete, Edit, PersonAddAlt} from "@mui/icons-material";
import {formDialog} from "../../components/dialog/FormDialog";
import AddShiftForm from "./AddShiftForm";

interface ShiftManagementTableProps {
    isLoading: boolean;
    shifts?: RetrievedWorkshopShiftModel[];
}

const ShiftsManagementTable = ({ isLoading, shifts }: ShiftManagementTableProps) => {

    const openShiftFormEdit = (shift: RetrievedWorkshopShiftModel) => {
        formDialog('Shift aanassenn', <AddShiftForm shift={shift} />);
    };

    return (
        <Table
            columns={['Naam', 'Aantal medewerkers', 'Loon', 'Type', 'Plaats', 'Status', 'Datum', '']}
            isLoading={isLoading}
        >
            {shifts &&
                shifts.map((workshop) => (
                        <Row key={workshop.workshopId}>
                            <TableCell>Workshopdocent {workshop.workshop.name}</TableCell>
                            <TableCell>{(workshop.participants.length)} / {workshop.maximumParticipants}</TableCell>
                            <TableCell>€ {workshop.total_Amount}</TableCell>
                            <TableCell>{workshop.targetAudience}</TableCell>
                            <TableCell>{workshop.location.city}</TableCell>
                            <TableCell>Beschikbaar</TableCell>
                            <TableCell>{new Date(workshop.date).toLocaleDateString('nl-NL')}</TableCell>
                            <TableCell>
                                <>
                                    <IconButton
                                        aria-label='share'
                                        color='secondary'
                                    >
                                        <PersonAddAlt />
                                    </IconButton>
                                    <IconButton
                                        aria-label='edit'
                                        color='secondary'
                                        onClick={() => {openShiftFormEdit(workshop)}}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        aria-label='delete'
                                        color='secondary'

                                    >
                                        <Delete />
                                    </IconButton>
                                </>
                            </TableCell>
                        </Row>
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
