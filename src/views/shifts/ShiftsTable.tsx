import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import CollapsibleRow from '../../components/table/CollapsibleRow';
import Table from '../../components/table/Table';
import { RetrievedWorkshopShiftModel } from '../../models/workshopShiftModels';
import ShiftDetails from './ShiftDetails';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useGetPersonalProfileQuery } from '../../api/user/userApi';
import FormDialog, { formDialog } from '../../components/dialog/FormDialog';
import ShiftFilterForm from './ShiftFilterForm';

interface ShiftTableProps {
    isLoading: boolean;
    shifts?: RetrievedWorkshopShiftModel[];
    isParticipating: boolean;
}

const ShiftTable = ({
    isLoading,
    shifts,
    isParticipating,
}: ShiftTableProps) => {
    const { data } = useGetPersonalProfileQuery();
    const user = data?.result;

    let workshopString, workshopPref, levelString, levelPref;
    if (user?.workshopPreferences) {
        workshopString = user?.workshopPreferences;
        workshopPref = workshopString.join('\r\n');
    }
    if (user?.levelPreferences) {
        levelString = user?.levelPreferences;
        levelPref = levelString.join('\r\n');
    }

    const openProfileForm = () => {
        if (data?.result) {
            formDialog(
                'Filteren',
                <ShiftFilterForm user={data.result} />
            );
        }
    };

    return (
        <>
            <FormDialog />
            <IconButton onClick={openProfileForm} color='primary'>
                <FilterListIcon></FilterListIcon>
            </IconButton>
            <Table
                columns={[
                    'Naam',
                    'Loon',
                    'Type',
                    'Plaats',
                    'Status',
                    'Datum',
                    '',
                ]}
                isLoading={isLoading}
            >
                {shifts &&
                    shifts.map((workshop) => (
                        <CollapsibleRow
                            key={workshop.workshopId}
                            innerContent={
                                <ShiftDetails
                                    isParticipating={isParticipating}
                                    shift={workshop}
                                />
                            }
                        >
                            <TableCell>
                                Workshopdocent {workshop.workshop.name}
                            </TableCell>

                            <TableCell>€ {workshop.total_Amount}</TableCell>
                            <TableCell>{workshop.targetAudience}</TableCell>
                            <TableCell>{workshop.location.city}</TableCell>
                            <TableCell>Beschikbaar</TableCell>
                            <TableCell>
                                {new Date(workshop.date).toLocaleDateString(
                                    'nl-NL'
                                )}
                            </TableCell>
                        </CollapsibleRow>
                    ))}
                {shifts?.length === 0 && (
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

export default ShiftTable;
