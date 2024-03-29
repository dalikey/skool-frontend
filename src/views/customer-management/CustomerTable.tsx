import { IconButton, TableCell } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { formDialog } from '../../components/dialog/FormDialog';
import CustomerForm from './CustomerForm';
import Row from '../../components/table/Row';
import Table from '../../components/table/Table';
import { CustomerModel } from '../../models/customerModels';
import { confirmDialog } from '../../components/dialog/ConfirmDialog';
import { useDeleteCustomerMutation } from '../../api/customer/customerApi';

interface CustomerTableProps {
    isLoading: boolean;
    customers?: CustomerModel[];
}

const CustomerTable = ({ isLoading, customers }: CustomerTableProps) => {
    const openCustomerForm = (customer: CustomerModel): void => {
        formDialog('Klant bewerken', <CustomerForm customer={customer} />);
    };

    const [deleteCustomer] = useDeleteCustomerMutation();

    const handleClickDelete = (customer: CustomerModel): void => {
        confirmDialog(
            'Klant verwijderen',
            `Weet u zeker dat u de klant "${customer.name} ${customer.location.city}" wilt verwijderen?`,
            () => deleteCustomer(customer._id)
        );
    };

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
                            <IconButton
                                aria-label='edit'
                                color='secondary'
                                onClick={() => openCustomerForm(customer)}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                aria-label='delete'
                                color='secondary'
                                onClick={() => handleClickDelete(customer)}
                            >
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
