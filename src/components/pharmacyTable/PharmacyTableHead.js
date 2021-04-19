import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'name', label: 'Название аптеки'},
    {id: 'name_of_area', label: 'Район'},
    {id: 'name_of_property', label: 'Тип собственности'},
    {id: 'telephone', label: 'Телефон'},
    {id: 'address', label: 'Адресс'},
    {id: 'actions', label: 'Действия', disableSorting: true}
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
