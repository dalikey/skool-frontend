import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Delete, Edit } from '@mui/icons-material';
import { WorkshopModel } from '../../models/workshopModels';

interface WorkshopTableProps {
    isLoading: boolean;
    workshops?: WorkshopModel[];
}

const WorkshopTable = ({ isLoading, workshops }: WorkshopTableProps) => {
    return (
        <Table
            columns={['', 'Naam', 'Beschrijving', 'Benodigde materialen']}
            isLoading={isLoading}
        >
            {workshops &&
                workshops.map((workshop) => (
                    <Row key={workshop._id}>
                        <TableCell>
                            <img
                                src={workshop.imageUrl}
                                alt='Geen afbeelding beschikbaar'
                                width='100'
                                height='100'
                            />
                        </TableCell>
                        <TableCell>{workshop.name}</TableCell>
                        <TableCell>{workshop.description}</TableCell>
                        <TableCell>{workshop.materials}</TableCell>
                        <TableCell align='right'>
                            {workshop.isActive && (
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
            {workshops?.length === 0 && (
                <Row>
                    <TableCell>Er zijn geen workshops beschikbaar.</TableCell>
                </Row>
            )}
        </Table>
    );
};

export default WorkshopTable;
