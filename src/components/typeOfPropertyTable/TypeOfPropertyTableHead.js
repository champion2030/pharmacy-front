import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'typeOfProperty', label: 'Type of Property'},
    {id: 'actions', label: 'Actions', disableSorting: true}
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
