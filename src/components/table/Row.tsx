import { TableRow } from '@mui/material';
import { ReactNode } from 'react';

interface CollabsibleRowProps {
    children: ReactNode;
}

const CollapsibleRow = ({ children }: CollabsibleRowProps) => {
    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {children}
        </TableRow>
    );
};

export default CollapsibleRow;
