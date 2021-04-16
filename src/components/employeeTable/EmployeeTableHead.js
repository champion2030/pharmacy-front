import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'pharmacy_id', label: 'Pharmacy id'},
    {id: 'pharmacy_name', label: 'Pharmacy name'},
    {id: 'name', label: 'Employee name'},
    {id: 'surname', label: 'Employee surname'},
    {id: 'patronymic', label: 'Employee patronymic'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const EmployeeTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.label}
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
}

export default EmployeeTableHead;
