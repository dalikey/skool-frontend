import { TableRow, TableCell, IconButton } from '@mui/material';
import { useState } from 'react';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'

interface CollabsibleRowProps {
    data: any;
}

const CollapsibleRow = ({ data }: CollabsibleRowProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUp />
                        ) : (
                            <KeyboardArrowDown />
                        )}
                    </IconButton>
                </TableCell>
                {Object.keys(data).map((key) => (
                    <TableCell>
                        {data[key]}
                    </TableCell>
                ))}
            </TableRow>
        </>
    );
};

export default CollapsibleRow;
