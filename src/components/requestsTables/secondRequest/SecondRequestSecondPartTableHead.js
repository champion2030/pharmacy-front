import {TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";

const headCellsSecondPart = [
    {id: 'count', label: 'Количество аптек'},
    {id: 'name_of_property', label: 'Тип собственности'},
]

const SecondRequestSecondPartTableHead = () => {

    return (
        <TableHead>
            <TableRow>
                {
                    headCellsSecondPart.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.label}
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
}

export default SecondRequestSecondPartTableHead;