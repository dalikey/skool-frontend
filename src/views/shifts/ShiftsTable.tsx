import { TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import CollapsibleRow from '../../components/table/CollapsibleRow';
import Table from '../../components/table/Table';
import {RetrievedWorkshopShiftModel} from '../../models/workshopShiftModels';
import ShiftDetails from "./ShiftDetails";

interface ShiftTableProps {
    isLoading: boolean;
    shifts?: RetrievedWorkshopShiftModel[];
    isParticipating: boolean
}

const ShiftTable = ({ isLoading, shifts, isParticipating }: ShiftTableProps) => {
    return (
        <Table
            columns={['Naam', 'Aantal medewerkers', 'Loon', 'Type', 'Plaats', 'Status', 'Datum', '']}
            isLoading={isLoading}
        >
            {shifts &&
                shifts.map((workshop) => (
                        <CollapsibleRow key={workshop.workshopId}
                                        innerContent={
                                            <ShiftDetails
                                                isParticipating={isParticipating}
                                                shift={workshop}
                                            />
                                        }
                        >

                                <TableCell>Workshopdocent {workshop.workshop.name}</TableCell>

                            <TableCell>{(workshop.participants.length)} / {workshop.maximumParticipants}</TableCell>
                            <TableCell>€ {workshop.total_Amount}</TableCell>
                            <TableCell>{workshop.targetAudience}</TableCell>
                            <TableCell>{workshop.location.city}</TableCell>
                            <TableCell>Beschikbaar</TableCell>
                            <TableCell>{new Date(workshop.date).toLocaleDateString('nl-NL')}</TableCell>
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

export default ShiftTable;
