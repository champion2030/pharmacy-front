import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'checkbox', label: ''},
    {id: 'pharmacy_id', label: 'Pharmacy id'},
    {id: 'pharmacy_name', label: 'Pharmacy name'},
    {id: 'name', label: 'Employee name'},
    {id: 'surname', label: 'Employee surname'},
    {id: 'patronymic', label: 'Employee patronymic'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const EmployeeTableHead = () => {

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

export default EmployeeTableHead;
