import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'checkbox', label: ''},
    {id: 'form_of_issue', label: 'Form of issue'},
    {id: 'pharmacological_group', label: 'Pharmacological group'},
    {id: 'firm_name', label: 'Firm name'},
    {id: 'medicine_name', label: 'Medicine name'},
    {id: 'instruction', label: 'Instruction'},
    {id: 'barcode', label: 'Barcode'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const MedicineTableHead = () => {

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

export default MedicineTableHead;
