import {Box, Collapse, IconButton, TableCell, Typography } from '@mui/material';
import Row from '../../components/table/Row';
import CollapsibleRow from '../../components/table/CollapsibleRow';
import Table from '../../components/table/Table';
import { Delete, Edit } from '@mui/icons-material';
import { WorkshopModel } from '../../models/workshopModels';
import { WorkshopShiftModel } from '../../models/workshopShiftModels';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';

interface ShiftTableProps {
    isLoading: boolean;
    shifts?: WorkshopShiftModel[];
}


const ShiftTable = ({ isLoading, shifts }: ShiftTableProps) => {




    return (
        <Table
            columns={['Naam', 'Beschrijving', 'Benodigde materialen']}
            isLoading={isLoading}
        >
            {shifts &&
                shifts.map((workshop) => (
                        <CollapsibleRow key={workshop.workshopId}
                                        innerContent={
                                            <Typography>Je moeder is een plopkoek</Typography>
                                        }
                        >
                            <TableCell>{workshop.maximumParticipants}</TableCell>
                            <TableCell>{workshop.location.city}</TableCell>
                            <TableCell>{workshop.location.country}</TableCell>
                        </CollapsibleRow>
                ))}
            {shifts?.length === 0 && (
                <Row>
                    <TableCell>Er zijn geen workshops beschikbaar.</TableCell>
                </Row>
            )}
        </Table>
    );
};

export default ShiftTable;
