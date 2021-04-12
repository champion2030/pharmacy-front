import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {getAllEmployees} from "../../actions/getEmployee";
import {getAllMedicines} from "../../actions/getMedicine";
import {getReasons} from "../../actions/getReasonsForReturn";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createNewDeliver, getCurrentDeliver, updateCurrentDeliver} from "../../actions/getDeliveries";
import {SET_MESSAGE} from "../../actions/types";
import {Autocomplete} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    buttons: {
        marginTop: "30px"
    },
    formControl: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        minWidth: 230,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}))

const DeliveriesAddOrEdit = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {id, action} = useParams()
    const [medicineId, setMedicineId] = useState('')
    const [medicineName, setMedicineName] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [employeeFullName, setEmployeeFullName] = useState('')
    const [causeId, setCauseId] = useState(null)
    const [cause, setCause] = useState(null)
    const [receiptDate, setReceiptDate] = useState(new Date())
    const [numberOfPackages, setNumberOfPackages] = useState()
    const [presentOfDefect, setPresentOfDefect] = useState(false)
    const [supplierPrice, setSupplierPrice] = useState()
    const [pharmacyPrice, setPharmacyPrice] = useState()
    const [expiryStartDate, setExpiryStartDate] = useState(new Date())
    const [expirationDate, setExpirationDate] = useState(new Date())
    const [batchNumber, setBatchNumber] = useState()
    const reasons = useSelector(state => state.reasonForReturnReducer.reasons)
    const allMedicines = useSelector(state => state.medicineReducer.allMedicines)
    const allEmployees = useSelector(state => state.employeeReducer.allEmployees)
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);

    useEffect(() => {
        if (Number(id) !== 0) {
            getCurrentDeliver(id, setMedicineId, setMedicineName, setEmployeeId, setEmployeeFullName, setCauseId, setCause, setReceiptDate, setNumberOfPackages, setPresentOfDefect, setSupplierPrice, setPharmacyPrice, setExpiryStartDate, setExpirationDate, setBatchNumber)
        } if (action !== 'see') {
            dispatch(getAllMedicines())
            dispatch(getAllEmployees())
            dispatch(getReasons())
        }
        dispatch(clearMessage())
    }, [dispatch, id, action])

    const handleChangeReceiptDate = (date) => {
        setReceiptDate(date)
    };
    const handleChangeExpiryStartDate = (date) => {
        setExpiryStartDate(date)
    };
    const handleChangeExpirationDate = (date) => {
        setExpirationDate(date)
    };

    const handleChangePresentOfDefect = (event) => {
        if (!event.target.checked) {
            setCause(null)
            setCauseId(null)
        }
        setPresentOfDefect(event.target.checked);
    };

    const onChangeNumberOfPackages = (e) => {
        setNumberOfPackages(e.target.value)
    };

    const onChangeSupplierPrice = (e) => {
        setSupplierPrice(e.target.value)
    };

    const onChangePharmacyPrice = (e) => {
        setPharmacyPrice(e.target.value)
    };

    const handleSubmit = () => {
        if (presentOfDefect && cause == null) {
            dispatch({type: SET_MESSAGE, payload: "Choose reason for return!"})
            setSuccessful(false);
        } else {
            if (Number(id) === 0) {
                dispatch(createNewDeliver(medicineId, employeeId, causeId ? causeId : null, receiptDate, numberOfPackages, presentOfDefect, supplierPrice, pharmacyPrice, expiryStartDate, expirationDate))
                    .then(() => {
                        setSuccessful(true);
                        props.history.goBack()
                    })
                    .catch(() => {
                        setSuccessful(false);
                    });
            } else {
                dispatch(updateCurrentDeliver(medicineId, employeeId, causeId ? causeId : null, receiptDate, numberOfPackages, presentOfDefect, supplierPrice, pharmacyPrice, expiryStartDate, expirationDate, id))
                    .then(() => {
                        setSuccessful(true);
                        props.history.goBack()
                    })
                    .catch(() => {
                        setSuccessful(false);
                    });
            }
        }
    }

    return (
        <Paper className={classes.pageContent}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo1"
                            options={allMedicines}
                            disableClearable
                            disabled={action === 'see'}
                            getOptionLabel={(option) => option.medicine_name}
                            style={{width: 300, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                setMedicineId(newValue.id)
                                setMedicineName(newValue.medicine_name)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label={action === 'addNew' ? "Medicine name" : medicineName}
                                    variant="outlined"
                                />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo2"
                            options={allEmployees}
                            disableClearable
                            disabled={action === 'see'}
                            getOptionLabel={(option) => option.full_name}
                            style={{width: 300, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                    setEmployeeId(newValue.id)
                                    setEmployeeFullName(newValue.full_name)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label={action === 'addNew' ? "Employee name" : employeeFullName}
                                    variant="outlined"
                                />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo3"
                            options={reasons}
                            disableClearable
                            disabled={action === 'see' || !presentOfDefect}
                            getOptionLabel={(option) => option.reason_for_return}
                            style={{width: 500, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                    setCauseId(newValue.id)
                                    setCause(newValue.reason_for_return)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label={action === 'addNew' || !presentOfDefect ? "Reason for return" : cause}
                                    variant="outlined"
                                />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline1"
                            value={receiptDate}
                            onChange={handleChangeReceiptDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="numberOfPackages"
                            type="number"
                            value={numberOfPackages || ""}
                            onChange={e => onChangeNumberOfPackages(e)}
                            helperText="Number of packages"
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Checkbox
                            checked={presentOfDefect}
                            label="Present of defect"
                            onChange={handleChangePresentOfDefect}
                            inputProps={{'aria-label': 'primary checkbox'}}
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="supplierPrice"
                            type="number"
                            value={supplierPrice || ""}
                            onChange={e => onChangeSupplierPrice(e)}
                            helperText="Supplier price"
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="pharmacyPrice"
                            type="number"
                            value={pharmacyPrice || ""}
                            onChange={e => onChangePharmacyPrice(e)}
                            helperText="Pharmacy price"
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline2"
                            value={expiryStartDate}
                            onChange={handleChangeExpiryStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline3"
                            value={expirationDate}
                            onChange={handleChangeExpirationDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            disabled={action === 'see'}
                        />
                    </Grid>
                    {action === 'see' ?
                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                name="batchNumber"
                                value={batchNumber || ""}
                                helperText="Batch number"
                                disabled
                            />
                        </Grid>
                        :
                        null
                    }
                </Grid>
            </MuiPickersUtilsProvider>
            {!successful && message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
            <Grid container align="center" justify="center" alignItems="center">
                <div className={classes.buttons}>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                        disabled={action === 'see'}
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={() => props.history.goBack()}
                    />
                </div>
            </Grid>
        </Paper>
    )
};

export default DeliveriesAddOrEdit;