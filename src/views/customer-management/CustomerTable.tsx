import { IconButton, TableCell } from '@mui/material';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { Delete, Edit } from '@mui/icons-material';
import { CustomerModel } from '../../models/customerModels';

interface CustomerTableProps {
    isLoading: boolean;
    customers?: CustomerModel[];
}

const CustomerTable = ({ isLoading, customers }: CustomerTableProps) => {
    return (
        <Table
            columns={[
                'Naam',
                'E-mailadress',
                'Telefoonnummer',
                'Adres',
                'logo',
            ]}
            isLoading={isLoading}
        >
            {customers &&
                customers.map((customer) => (
                    <Row key={customer._id}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.contact.emailAddress}</TableCell>
                        <TableCell>{customer.contact.phoneNumber}</TableCell>
                        <TableCell>
                            {customer.location.address}, <br />
                            {customer.location.postalCode}{' '}
                            {customer.location.city} <br />
                            {customer.location.country}
                        </TableCell>
                        <TableCell align='right'>
                            <IconButton aria-label='edit' color='secondary'>
                                <Edit />
                            </IconButton>
                            <IconButton aria-label='delete' color='secondary'>
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </Row>
                ))}
            {customers?.length === 0 && (
                <Row>
                    <TableCell>Er zijn geen klanten.</TableCell>
                </Row>
            )}
        </Table>
    );
};

export default CustomerTable;
