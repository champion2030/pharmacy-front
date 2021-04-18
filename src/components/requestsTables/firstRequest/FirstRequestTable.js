import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Search} from "@material-ui/icons";
import {getAreas} from "../../../actions/getAreas";
import {getAllPharmacies} from "../../../actions/getPharmacy";
import {Autocomplete} from "@material-ui/lab";
import {getMedicineByArea, getMedicineByPharmacy} from "../../../actions/getRequests";
import FirstRequestTableHead from "./FirstRequestTableHead";

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
    const medicineByArea = useSelector(state => state.requestsReducer.medicineByArea)
    const allPharmacies = useSelector(state => state.pharmacyReducer.allPharmacies)
    const areas = useSelector(state => state.areaReducer.areas)
    const [pharmacyId, setPharmacyId] = useState('')
    const [areaId, setAreaId] = useState('')


    useEffect(() => {
        dispatch(getAreas())
        dispatch(getAllPharmacies())
    }, [dispatch])

    function getFirstPartRequest() {
        dispatch(getMedicineByPharmacy(pharmacyId))
    }

    function getSecondPartRequest() {
        dispatch(getMedicineByArea(areaId))
    }

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Grid container align="center" justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <Autocomplete
                                id="combo-box-demo3"
                                options={allPharmacies}
                                disableClearable
                                getOptionLabel={(option) => option.id + ' , ' + option.name}
                                style={{width: 300, marginBottom: 20}}
                                onChange={(event, newValue) => {setPharmacyId(newValue.id)}}
                                renderInput={(params) =>
                                    <TextField{...params} variant="outlined"/>}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controls.Button
                                text="Search"
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
                <Toolbar className={classes.toolBar}>
                    <Grid container align="center" justify="center" alignItems="center">
                        <Grid item xs={3}>
                    <Autocomplete
                        id="combo-box-demo2"
                        options={areas}
                        disableClearable
                        getOptionLabel={(option) => option.name_of_area}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {setAreaId(newValue.id)}}
                        renderInput={(params) => <TextField{...params} variant="outlined"/>}
                    />
                        </Grid>
                        <Grid item xs={3}>
                    <Controls.Button
                        text="Search"
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
                            medicineByArea.map(item =>
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
