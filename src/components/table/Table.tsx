import {
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table as MuiTable,
} from '@mui/material';
import { ReactNode } from 'react';

interface TableProps {
    children: ReactNode;
    columns: string[];
}

const Table = ({ children, columns }: TableProps) => {
    return (
        <TableContainer component={Paper}>
            <MuiTable aria-label='collapsible table'>
                <TableHead
                    sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
                >
                    <TableRow>
                        {columns.map((title) => (
                            <TableCell key={title}>{title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{children}</TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
