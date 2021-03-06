import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'formOfIssue', label: 'Форма выпуска'},
    {id: 'actions', label: 'Действия', disableSorting: true}
]

const FormOfIssueTableHead = () => {

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

export default FormOfIssueTableHead;
