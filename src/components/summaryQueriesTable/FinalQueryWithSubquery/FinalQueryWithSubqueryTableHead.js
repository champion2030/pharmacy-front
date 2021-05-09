import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'cnt', label: 'Количество лекарств'},
    {id: 'country_of_manufacture', label: 'Страна производитель'},
    {id: 'firm_name', label: 'Название фирмы'},
    {id: 'email', label: 'Email'},
    {id: 'address', label: 'Адресс'},
    {id: 'year_open', label: 'Год открытия'}

]

const FinalQueryWithSubqueryTableHead = () => {

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

export default FinalQueryWithSubqueryTableHead;

