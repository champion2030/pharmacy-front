import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'pharmacologicalGroup', label: 'Pharmacological Group'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const PharmacologicalGroupTableHead = () => {

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

export default PharmacologicalGroupTableHead;
