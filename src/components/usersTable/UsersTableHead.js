import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'fullName', label: 'User Name'},
    {id: 'email', label: 'Email Address'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const UsersTableHead = () => {

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

export default UsersTableHead;
