import {
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table as MuiTable,
    LinearProgress,
} from '@mui/material';
import { ReactNode } from 'react';

interface TableProps {
    children: ReactNode;
    columns: string[];
    isLoading: boolean;
}

const Table = ({ children, columns, isLoading }: TableProps) => {
    return (
        <TableContainer component={Paper}>
            <MuiTable aria-label='collapsible table'>
                <TableHead
                    sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}
                >
                    <TableRow>
                        {columns.map((title) => (
                            <TableCell key={title} sx={{ fontWeight: 'bold' }}>
                                {title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell padding='none' colSpan={100}>
                                <LinearProgress color='primary' />
                            </TableCell>
                        </TableRow>
                    )}
                    {children}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
