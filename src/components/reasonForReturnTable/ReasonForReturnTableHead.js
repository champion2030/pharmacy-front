import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'reasonForReturn', label: 'Прична возврата'},
    {id: 'actions', label: 'Действия', disableSorting: true}
]

const ReasonForReturnTableHead = () => {

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

export default ReasonForReturnTableHead;
