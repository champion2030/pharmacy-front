import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'form_of_issue', label: 'Form of issue'},
    {id: 'pharmacological_group', label: 'Pharmacological group'},
    {id: 'firm_name', label: 'Firm name'},
    {id: 'medicine_name', label: 'Medicine name'},
    {id: 'instruction', label: 'Instruction'},
    {id: 'barcode', label: 'Barcode'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const MedicineTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
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
