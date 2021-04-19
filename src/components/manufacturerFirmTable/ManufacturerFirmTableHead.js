import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'country', label: 'Страна'},
    {id: 'firm_name', label: 'Название фирмы'},
    {id: 'email', label: 'Email'},
    {id: 'address', label: 'Адресс'},
    {id: 'year_open', label: 'Год открытия'},
    {id: 'actions', label: 'Действия', disableSorting: true}
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
