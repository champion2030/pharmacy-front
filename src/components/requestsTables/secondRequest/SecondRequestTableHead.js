import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'count', label: 'Количество аптек'},
    {id: 'name_of_property', label: 'Тип собственности'},
    {id: 'name_of_area', label: 'Район'}
]

const SecondRequestTableHead = () => {

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

export default SecondRequestTableHead;
