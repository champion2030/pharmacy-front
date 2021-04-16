import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'name', label: 'Pharmacy name'},
    {id: 'name_of_area', label: 'Name of area'},
    {id: 'name_of_property', label: 'Name of property'},
    {id: 'telephone', label: 'Telephone'},
    {id: 'address', label: 'Address'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const PharmacyTableHead = (props) => {
    const {onSelectAllClick, numSelected, rowCount} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
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

export default PharmacyTableHead;
