import { TableRow, TableCell } from '@mui/material';

interface CollabsibleRowProps {
    data: any;
}

const Row = ({ data }: CollabsibleRowProps) => {
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {Object.keys(data).map((key) => (
                    <TableCell>
                        {data[key]}
                    </TableCell>
                ))}
            </TableRow>
        </>
    );
};

export default Row;
