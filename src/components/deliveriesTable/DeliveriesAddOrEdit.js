import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField} from "@material-ui/core";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const DeliveriesAddOrEdit = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {id, action} = useParams()
    const [medicine, setMedicine] = useState('')
    const [employee, setEmployee] = useState('')
    const [cause, setCause] = useState('')
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
    const [openReasonsForReturn, setOpenReasonsForReturn] = useState(false);
    const [openMedicine, setOpenMedicine] = useState(false);
    const [openEmployees, setOpenEmployees] = useState(false);


    useEffect(() => {
        if (Number(id) !== 0) {
            getCurrentDeliver(id, setMedicine, setEmployee, setCause, setReceiptDate, setNumberOfPackages, setPresentOfDefect, setSupplierPrice, setPharmacyPrice, setExpiryStartDate, setExpirationDate, setBatchNumber)
        }
        if (action !== 'see') {
            dispatch(getAllMedicines())
            dispatch(getAllEmployees())
            dispatch(getReasons())
        }
        dispatch(clearMessage())
    }, [dispatch, id, action])

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'medicine':
                setMedicine(e.target.value)
                break
            case 'employees':
                setEmployee(e.target.value)
                break
            case 'reasonForReturn':
                setCause(e.target.value)
                break
            default:
                break
        }
    };

    const handleCloseMedicine = () => {setOpenMedicine(false)}
    const handleOpenMedicine = () => {setOpenMedicine(true)}
    const handleCloseEmployees = () => {setOpenEmployees(false)}
    const handleOpenEmployees = () => {setOpenEmployees(true)}
    const handleCloseReasonsForReturn = () => {setOpenReasonsForReturn(false)}
    const handleOpenReasonsForReturn = () => {setOpenReasonsForReturn(true)}

    const handleChangeReceiptDate = (date) => {setReceiptDate(date)};
    const handleChangeExpiryStartDate = (date) => {setExpiryStartDate(date)};
    const handleChangeExpirationDate = (date) => {setExpirationDate(date)};

    const handleChangePresentOfDefect = (event) => {
        if (!event.target.checked) setCause('')
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
        if (presentOfDefect && cause == null){
            dispatch({type: SET_MESSAGE, payload: "Choose reason for return!"})
            setSuccessful(false);
        } else {
            if (Number(id) === 0) {
                dispatch(createNewDeliver(medicine, employee, cause ? cause : null, receiptDate, numberOfPackages, presentOfDefect, supplierPrice, pharmacyPrice, expiryStartDate, expirationDate))
                    .then(() => {
                        setSuccessful(true);
                        props.history.goBack()
                    })
                    .catch(() => {
                        setSuccessful(false);
                    });
            } else {
                dispatch(updateCurrentDeliver(medicine, employee, cause ? cause : null, receiptDate, numberOfPackages, presentOfDefect, supplierPrice, pharmacyPrice, expiryStartDate, expirationDate, id))
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
                            <InputLabel id="demo-controlled-open-select-label">Medicine</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openMedicine}
                                name="medicine"
                                onClose={handleCloseMedicine}
                                onOpen={handleOpenMedicine}
                                value={medicine || ''}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                disabled={action === 'see'}
                            >
                                {allMedicines.map((medicine) => (
                                    <MenuItem key={medicine.id} value={medicine.id}>
                                        {medicine.medicine_name}
                                    </MenuItem>
                                ))}
                            </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Employees</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openEmployees}
                                name="employees"
                                onClose={handleCloseEmployees}
                                onOpen={handleOpenEmployees}
                                value={employee || ''}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                disabled={action === 'see'}
                            >
                                {allEmployees.map((employee) => (
                                    <MenuItem key={employee.id} value={employee.id}>
                                        {employee.full_name}, {employee.pharmacy_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Reason for return</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openReasonsForReturn}
                                name="reasonForReturn"
                                onClose={handleCloseReasonsForReturn}
                                onOpen={handleOpenReasonsForReturn}
                                value={cause || ''}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                disabled={action === 'see' || !presentOfDefect}
                            >
                                {reasons.map((reason) => (
                                    <MenuItem key={reason.id} value={reason.id}>
                                        {reason.reason_for_return}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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


