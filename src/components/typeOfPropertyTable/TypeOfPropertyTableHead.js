import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'typeOfProperty', label: 'Тип собственности'},
    {id: 'actions', label: 'Действия', disableSorting: true}
]

const TypeOfPropertyTableHead = () => {

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

export default TypeOfPropertyTableHead;
