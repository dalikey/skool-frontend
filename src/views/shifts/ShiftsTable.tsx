import { alpha } from '@mui/material/styles';
import {
    Box,
    FormControlLabel,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { RetrievedWorkshopShiftModel } from '../../models/workshopShiftModels';
import {useState, MouseEvent, ChangeEvent, useEffect} from 'react';
import ShiftDetails from './ShiftDetails';
import CollapsibleRow from '../../components/table/CollapsibleRow';
import {formDialog} from "../../components/dialog/FormDialog";
import FilterForm from "./FilterForm";



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (typeof orderBy === "string") {
        if (orderBy.includes('.')) {
            for (const key of orderBy.split('.')) {
                a = a[key];
                b = b[key];
            }
            if (b < a) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
            return 0;
        } else {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
        }
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(order: Order, orderBy: Key):
    (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'workshop.name',
        numeric: false,
        disablePadding: false,
        label: 'Naam',
    },
    {
        id: 'total_Amount',
        numeric: true,
        disablePadding: false,
        label: 'Loon',
    },
    {
        id: 'targetAudience',
        numeric: false,
        disablePadding: false,
        label: 'Doelgroep',
    },
    {
        id: 'level',
        numeric: false,
        disablePadding: false,
        label: 'Niveau',
    },
    {
        id: 'location.city',
        numeric: false,
        disablePadding: false,
        label: 'Plaats',
    },
];

interface ShiftsTableProps {
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    filterFunc: any
}

function ShiftsTableHead(props: ShiftsTableProps) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        filterFunc
    } = props;
    const createSortHandler =
        (property: string) => (event: MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const openForm = () => {
        formDialog("Filteren", <FilterForm filterFunc={filterFunc}></FilterForm>);
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell><Tooltip title='Filter list'>
                    <IconButton color='primary'
                                sx={{ padding: 2, marginLeft: 'auto' }}
                                onClick={() => {openForm()}}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip></TableCell>
            </TableRow>
        </TableHead>
    );
}

interface ShiftTableProps {
    isLoading: boolean;
    shifts?: RetrievedWorkshopShiftModel[];
    isParticipating: boolean;
}

const ShiftTable = ({isLoading, shifts, isParticipating,}: ShiftTableProps) => {


    const filter = (values): RetrievedWorkshopShiftModel[] | undefined => {
        if (values) {
            const filteredShifts: RetrievedWorkshopShiftModel[] = [];
                shifts?.forEach((shift) => {
                    let shouldAdd = true;
                    for (let key in values) {
                        console.log(key);
                        if (values[key] === '') {
                            continue
                        }
                        let retrievedValue: any = shift;
                        if (key.includes('.')) {
                            for (const subKey of key.split('.')) {
                                try {
                                    retrievedValue = retrievedValue[subKey];
                                } catch (err) {
                                    console.log(err)
                                }

                            }
                        } else {
                            retrievedValue = retrievedValue[key];
                        }

                        if (retrievedValue === '') {
                            continue
                        }
                        console.log(`${values[key]} === ${retrievedValue}`)
                        if (Array.isArray(retrievedValue)) {
                            shouldAdd = !!retrievedValue.includes(values[key]);
                        } else shouldAdd = values[key] === retrievedValue;
                    }
                    console.log(shouldAdd + " " + shift.workshop.name)
                    if (shouldAdd) {
                        filteredShifts.push(shift);
                    }
                })
            console.log(filteredShifts)
            return filteredShifts;

        }
        return shifts;
    }


    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>('workshop.name');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<RetrievedWorkshopShiftModel[]>(() => filter(undefined) ?? []);


    useEffect(() => {
        if (loading) {
            if (!isLoading) {
                setLoading(false);
                changeFilter(undefined)
            }
        }
    }, [loading, isLoading])



    const changeFilter = (values) => {
        console.log(values);
        setRows(filter(values) ?? []);
        console.log(rows);
    }

    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: string
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.workshop.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // @ts-ignore
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                        size={dense ? 'small' : 'medium'}
                    >
                        <ShiftsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            filterFunc={changeFilter}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}

                            {

                                rows.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )

                                    .sort(getComparator(order, orderBy))
                                .map((row, index) => {
                                    return (
                                        <CollapsibleRow
                                            innerContent={ <ShiftDetails
                                                isParticipating={
                                                    isParticipating
                                                }
                                                shift={row}
                                            />}
                                            key={row._id}
                                        >
                                            <TableCell>{row.workshop.name}</TableCell>
                                            <TableCell>{row.total_Amount}</TableCell>
                                            <TableCell>{row.targetAudience}</TableCell>
                                            <TableCell>{row.level}</TableCell>
                                            <TableCell>{row.location.city}</TableCell>
                                        </CollapsibleRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ShiftTable;
