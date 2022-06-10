import { TableRow, TableCell, IconButton, Collapse } from '@mui/material';
import {ReactElement, ReactNode, useState } from 'react';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import Row from './Row';
import React from 'react';

interface CollabsibleRowProps {
    children: ReactNode;
    innerContent: JSX.Element;
}

const CollapsibleRow = ({ children, innerContent }: CollabsibleRowProps) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
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
            <Row>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout={'auto'} unmountOnExit>
                        { innerContent}
                    </Collapse>
                </TableCell>
            </Row>
        </React.Fragment>
    );
};

export default CollapsibleRow;
