import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'checkbox', label: ''},
    {id: 'country', label: 'Country'},
    {id: 'firm_name', label: 'Firm Name'},
    {id: 'email', label: 'Email'},
    {id: 'address', label: 'Address'},
    {id: 'year_open', label: 'Year open'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const ManufactureFirmTableHead = () => {

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

export default ManufactureFirmTableHead;
