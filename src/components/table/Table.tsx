import {
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table as MuiTable,
} from '@mui/material';
import CollapsibleRow from './CollapsibleRow';

interface TableProps {
    data: any[];
    columns: string[];
    isCollapsible: boolean;
}

const Table = ({ data, columns, isCollapsible }: TableProps) => {
    return (
        <TableContainer component={Paper}>
            <MuiTable aria-label='collapsible table'>
                <TableHead>
                    <TableRow>
                        {columns.map((title) => (
                            <TableCell>{title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) =>
                        isCollapsible ? (
                            <CollapsibleRow key={i} data={row} />
                        ) : (
                            <CollapsibleRow key={i} data={row} />
                        )
                    )}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
