import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'formOfIssue', label: 'Форма выпуска'},
    {id: 'pharmacological_group', label: 'Фармакологическая группа'},
    {id: 'firm_name', label: 'Название фирмы'},
    {id: 'medicine_name', label: 'Название лекарства'},
    {id: 'instruction', label: 'Инструкция'},
    {id: 'barcode', label: 'Штрих код'},
    {id: 'count', label: 'Количество поставок'},
]

const FirstRequestTableHead = () => {

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

export default FirstRequestTableHead;
