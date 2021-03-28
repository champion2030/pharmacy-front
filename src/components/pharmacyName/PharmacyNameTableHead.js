import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'pharmacyName', label: 'Pharmacy name'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const PharmacyNameTableHead = () => {

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

export default PharmacyNameTableHead;
