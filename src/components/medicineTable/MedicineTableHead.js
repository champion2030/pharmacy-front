import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'form_of_issue', label: 'Форма выпуска'},
    {id: 'pharmacological_group', label: 'Фармакологическая группа'},
    {id: 'firm_name', label: 'Название фирмы'},
    {id: 'medicine_name', label: 'Название лекарства'},
    {id: 'instruction', label: 'Инструкция'},
    {id: 'barcode', label: 'Штрих код'},
    {id: 'actions', label: 'Действия', disableSorting: true}
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
