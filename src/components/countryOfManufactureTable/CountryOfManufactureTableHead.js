import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'countryOfManufacture', label: 'Страна производитель'},
    {id: 'actions', label: 'Действия', disableSorting: true}
]

const CountryOfManufactureTableHead = () => {

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

export default CountryOfManufactureTableHead;
