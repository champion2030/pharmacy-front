import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography,} from "@material-ui/core";
import {getQueryOnWrapUpQuery} from "../../../actions/getSummaryQueries";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {Autocomplete} from "@material-ui/lab";
import {getAllPharmacies} from "../../../actions/getPharmacy";
import QueryOnWrapUpQueryTableHead from "./QueryOnWrapUpQueryTableHead";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const QueryOnWrapUpQueryTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const queryOnWrapUpQuery = useSelector(state => state.summaryQueries.queryOnWrapUpQuery)
    const allPharmacies = useSelector(state => state.pharmacyReducer.allPharmacies)
    const [pharmacyId, setPharmacyId] = useState('')

    useEffect(() => {
        dispatch(getQueryOnWrapUpQuery(pharmacyId))
    }, [dispatch, pharmacyId])

    useEffect(() => {
        dispatch(getAllPharmacies())
    }, [dispatch])

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Самое дорогое лекарство поставленное в конкретную аптеку
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo3"
                            options={allPharmacies}
                            disableClearable
                            getOptionLabel={(option) => option.id + ' , ' + option.name}
                            style={{width: 300, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                setPharmacyId(newValue.id)
                            }}
                            renderInput={(params) =>
                                <TextField{...params} variant="outlined"/>}
                        />
                    </Grid>
                </Grid>

                <Table className={classes.table}>
                    <QueryOnWrapUpQueryTableHead/>
                    <TableBody>
                        <TableRow key={queryOnWrapUpQuery.id}>
                            <TableCell>{queryOnWrapUpQuery.medicine_name}</TableCell>
                            <TableCell>{queryOnWrapUpQuery.form_of_issue}</TableCell>
                            <TableCell>{queryOnWrapUpQuery.pharmacological_group}</TableCell>
                            <TableCell>{queryOnWrapUpQuery.firm_name}</TableCell>
                            <TableCell>{queryOnWrapUpQuery.supplier_price}<AttachMoneyIcon
                                fontSize="small"/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
};

export default QueryOnWrapUpQueryTable;
