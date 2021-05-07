import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'count', label: 'Количество поставок'},
    {id: 'firm_name', label: 'Название фирмы'}
]

const FinalRequestWithoutConditionTableHead = () => {

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

export default FinalRequestWithoutConditionTableHead;

