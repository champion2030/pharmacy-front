import React from 'react'
import {TableHead, TableRow, TableCell, Checkbox} from '@material-ui/core'

const headCells = [
    {id: 'medicine_name', label: 'Название лекарства'},
    {id: 'name', label: 'Сотрудник'},
    {id: 'reason_for_return', label: 'Прична возврата'},
    {id: 'receipt_date', label: 'Дата поставки'},
    {id: 'number_of_packages', label: 'Количество упаковок'},
    {id: 'presence_of_defect', label: 'Наличие деффекта'},
    {id: 'supplier_price', label: 'Цена (производитель)'},
    {id: 'pharmacy_price', label: 'Цена (аптека)'},
    {id: 'expiry_start_date', label: 'Начало срока годности'},
    {id: 'expiration_date', label: 'Конец срока годности'},
    {id: 'batch_number', label: 'Номер партии'},
    {id: 'actions', label: 'Действия', disableSorting: true}
]

const DeliveriesTableHead = (props) => {
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

export default DeliveriesTableHead;
