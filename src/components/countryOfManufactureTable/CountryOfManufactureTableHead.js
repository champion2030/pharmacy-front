import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'countryOfManufacture', label: 'Country of manufacture'},
    {id: 'actions', label: 'Actions', disableSorting: true}
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
