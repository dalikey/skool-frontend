import { TableRow, TableCell, IconButton, Collapse } from '@mui/material';
import { ReactNode, useState } from 'react';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import React from 'react';

interface CollabsibleRowProps {
    children: ReactNode;
    innerContent: JSX.Element;
}

const CollapsibleRow = ({ children, innerContent }: CollabsibleRowProps) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow hover={true} sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
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
            </TableRow>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0 }} colSpan={6}>
                    <Collapse in={open} timeout={'auto'} unmountOnExit>
                        { innerContent}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default CollapsibleRow;
