import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

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

