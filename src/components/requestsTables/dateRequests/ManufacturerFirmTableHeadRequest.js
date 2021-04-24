import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'country', label: 'Страна'},
    {id: 'firm_name', label: 'Название фирмы'},
    {id: 'email', label: 'Email'},
    {id: 'address', label: 'Адресс'},
    {id: 'year_open', label: 'Год открытия'},
]

const ManufacturerFirmTableHeadRequest = () => {
    return (
        <TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.label}
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
}

export default ManufacturerFirmTableHeadRequest;
