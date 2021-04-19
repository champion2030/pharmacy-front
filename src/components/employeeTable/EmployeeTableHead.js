import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'pharmacy_id', label: 'id Аптеки'},
    {id: 'pharmacy_name', label: 'Названи аптеки'},
    {id: 'name', label: 'Имя сотрудника'},
    {id: 'surname', label: 'Фамилия сотрудника'},
    {id: 'patronymic', label: 'Отчество сотрудника'},
    {id: 'actions', label: 'Действия', disableSorting: true}
]

const EmployeeTableHead = (props) => {
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

export default EmployeeTableHead;
