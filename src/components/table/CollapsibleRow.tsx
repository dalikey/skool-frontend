import { TableRow, TableCell, IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import Row from './Row';

interface CollabsibleRowProps {
    children: ReactNode;
}

const CollapsibleRow = ({ children }: CollabsibleRowProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Row>
            {children}
            <TableCell>
                <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            </TableCell>
        </Row>
    );
};

export default CollapsibleRow;
