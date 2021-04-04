import React from 'react'
import {TableHead, TableRow, TableCell} from '@material-ui/core'

const headCells = [
    {id: 'checkbox', label: ''},
    {id: 'medicine_name', label: 'Medicine name'},
    {id: 'name', label: 'Employee name'},
    {id: 'reason_for_return', label: 'Reason for return'},
    {id: 'receipt_date', label: 'Receipt date'},
    {id: 'number_of_packages', label: 'Number of packages'},
    {id: 'presence_of_defect', label: 'Presence of defect'},
    {id: 'supplier_price', label: 'Supplier price'},
    {id: 'pharmacy_price', label: 'Pharmacy price'},
    {id: 'expiry_start_date', label: 'Expiry start date'},
    {id: 'expiration_date', label: 'Expiration date'},
    {id: 'batch_number', label: 'Batch number'},
    {id: 'actions', label: 'Actions', disableSorting: true}
]

const DeliveriesTableHead = () => {

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

export default DeliveriesTableHead;
