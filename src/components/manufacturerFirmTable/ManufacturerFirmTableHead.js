import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'country', label: 'Country'},
    {id: 'firm_name', label: 'Firm Name'},
    {id: 'email', label: 'Email'},
    {id: 'address', label: 'Address'},
    {id: 'year_open', label: 'Year open'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const ManufactureFirmTableHead = (props) => {
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

export default ManufactureFirmTableHead;
