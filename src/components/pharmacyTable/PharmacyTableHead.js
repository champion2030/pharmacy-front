import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'checkbox', label: ''},
    {id: 'name', label: 'Pharmacy name'},
    {id: 'name_of_area', label: 'Name of area'},
    {id: 'name_of_property', label: 'Name of property'},
    {id: 'telephone', label: 'Telephone'},
    {id: 'address', label: 'Address'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const PharmacyTableHead = () => {

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

export default PharmacyTableHead;
