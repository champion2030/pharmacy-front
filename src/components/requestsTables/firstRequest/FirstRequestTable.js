import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar, Typography} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Search} from "@material-ui/icons";
import {getAllPharmacies} from "../../../actions/getPharmacy";
import {Autocomplete} from "@material-ui/lab";
import {getMedicineByArea, getMedicineByPharmacy} from "../../../actions/getRequests";
import FirstRequestTableHead from "./FirstRequestTableHead";
import {clearMessage} from "../../../actions/message";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        marginBottom: 25
    },
    toolBar: {
        marginTop: 20
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

const FirstRequestTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const medicineByPharmacy = useSelector(state => state.requestsReducer.medicineByPharmacy)
    const medicineByTown = useSelector(state => state.requestsReducer.medicineByTown)
    const allPharmacies = useSelector(state => state.pharmacyReducer.allPharmacies)
    const [pharmacyId, setPharmacyId] = useState('')
    const {message} = useSelector(state => state.message);

    useEffect(() => {
        dispatch(getAllPharmacies())

    }, [dispatch])

    function getFirstPartRequest() {
        dispatch(getMedicineByPharmacy(pharmacyId))
            .then(() => {
                dispatch(clearMessage())
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getSecondPartRequest() {
        dispatch(getMedicineByArea())
    }

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Grid container align="center" justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Топ 5 лекарств поставляемых в конкретную аптеку
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
                        <Grid item xs={3}>
                            <Controls.Button
                                text="Найти"
                                variant="outlined"
                                startIcon={<Search/>}
                                className={classes.newButton}
                                onClick={() => getFirstPartRequest()}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
                <Table className={classes.table}>
                    <FirstRequestTableHead/>
                    <TableBody>
                        {
                            medicineByPharmacy.map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.form_of_issue}</TableCell>
                                        <TableCell>{item.pharmacological_group}</TableCell>
                                        <TableCell>{item.firm_name}</TableCell>
                                        <TableCell>{item.medicine_name}</TableCell>
                                        <TableCell width={600}>{item.instruction}</TableCell>
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell>{item.count}</TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}


                <Toolbar className={classes.toolBar}>
                    <Grid container align="center" justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Топ 5 лекарств поставляемых по всему городу
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Controls.Button
                                text="Найти"
                                variant="outlined"
                                startIcon={<Search/>}
                                className={classes.newButton}
                                onClick={() => getSecondPartRequest()}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
                <Table className={classes.table}>
                    <FirstRequestTableHead/>
                    <TableBody>
                        {
                            medicineByTown.map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.form_of_issue}</TableCell>
                                        <TableCell>{item.pharmacological_group}</TableCell>
                                        <TableCell>{item.firm_name}</TableCell>
                                        <TableCell>{item.medicine_name}</TableCell>
                                        <TableCell width={600}>{item.instruction}</TableCell>
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell>{item.count}</TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
};

export default FirstRequestTable;
