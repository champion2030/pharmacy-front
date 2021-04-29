import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'id', label: 'id Района'},
    {id: 'name_of_area', label: 'Район'},
]

const QueryWithConditionForGroupsTableHead = () => {

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

export default QueryWithConditionForGroupsTableHead;
