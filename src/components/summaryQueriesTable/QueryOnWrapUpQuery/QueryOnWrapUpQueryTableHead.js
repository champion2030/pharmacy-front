import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'medicine_name', label: 'Название лекарства'},
    {id: 'name', label: 'Форма выпуска'},
    {id: 'reason_for_return', label: 'Фармакологическая группа'},
    {id: 'receipt_date', label: 'Название фирмы'},
    {id: 'number_of_packages', label: 'Цена(производитель)'}
]

const QueryOnWrapUpQueryTableHead = () => {

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

export default QueryOnWrapUpQueryTableHead;

