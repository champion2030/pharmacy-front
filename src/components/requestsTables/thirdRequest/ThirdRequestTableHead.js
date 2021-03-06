import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'count', label: 'Количество возвратов'},
    {id: 'sum', label: 'Сумма возвратов'},
    {id: 'firm_name', label: 'Название фирмы'}
]

const ThirdRequestTableHead = () => {

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

export default ThirdRequestTableHead;
