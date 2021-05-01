import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, FormControlLabel, Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {clearMessage} from "../../../actions/message";
import {getAllEmployees} from "../../../actions/getEmployee";
import {getAllMedicines} from "../../../actions/getMedicine";
import {getReasons} from "../../../actions/getReasonsForReturn";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createNewDeliver} from "../../../actions/getDeliveries";
import {SET_MESSAGE} from "../../../actions/types";
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

const AddNewDeliver = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const [medicineId, setMedicineId] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [causeId, setCauseId] = useState(null)
    const [cause, setCause] = useState(null)
    const [receiptDate, setReceiptDate] = useState(new Date())
    const [numberOfPackages, setNumberOfPackages] = useState()
    const [presentOfDefect, setPresentOfDefect] = useState(false)
    const [supplierPrice, setSupplierPrice] = useState()
    const [pharmacyPrice, setPharmacyPrice] = useState()
    const [expiryStartDate, setExpiryStartDate] = useState(new Date())
    const [expirationDate, setExpirationDate] = useState(new Date())
    const reasons = useSelector(state => state.reasonForReturnReducer.reasons)
    const allMedicines = useSelector(state => state.medicineReducer.allMedicines)
    const allEmployees = useSelector(state => state.employeeReducer.allEmployees)
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);

    useEffect(() => {
        dispatch(getAllMedicines())
        dispatch(getAllEmployees())
        dispatch(getReasons())
        dispatch(clearMessage())
    }, [dispatch])

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
            dispatch({type: SET_MESSAGE, payload: "Выберите причину возврата!"})
            setSuccessful(false);
        } else {
            dispatch(createNewDeliver(medicineId, employeeId, causeId ? causeId : null, receiptDate, numberOfPackages, presentOfDefect, supplierPrice, pharmacyPrice, expiryStartDate, expirationDate))
                .then(() => {
                    setSuccessful(true);
                    props.history.goBack()
                })
                .catch(() => {
                    setSuccessful(false);
                });
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
                            getOptionLabel={(option) => option.medicine_name}
                            style={{width: 300, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                setMedicineId(newValue.id)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label={"Название лекарства"}
                                    variant="outlined"
                                />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo2"
                            options={allEmployees}
                            disableClearable
                            getOptionLabel={(option) => option.full_name}
                            style={{width: 300, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                setEmployeeId(newValue.id)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label={"Сотрудник"}
                                    variant="outlined"
                                />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo3"
                            options={reasons}
                            disableClearable
                            disabled={!presentOfDefect}
                            getOptionLabel={(option) => option.reason_for_return}
                            style={{width: 500, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                setCauseId(newValue.id)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label={!presentOfDefect ? "Причина возврата" : cause}
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
                            helperText="Дата поступления в аптеку"
                            id="date-picker-inline1"
                            value={receiptDate}
                            onChange={handleChangeReceiptDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="numberOfPackages"
                            type="number"
                            value={numberOfPackages || ""}
                            onChange={e => onChangeNumberOfPackages(e)}
                            helperText="Количество упаковок"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={presentOfDefect}
                                    label="Наличие деффекта"
                                    onChange={handleChangePresentOfDefect}
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />}
                            label="Наличие деффекта"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="supplierPrice"
                            type="number"
                            value={supplierPrice || ""}
                            onChange={e => onChangeSupplierPrice(e)}
                            helperText="Цена упаковки(производитель)"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="pharmacyPrice"
                            type="number"
                            value={pharmacyPrice || ""}
                            onChange={e => onChangePharmacyPrice(e)}
                            helperText="Цена упаковки(аптека)"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            helperText="Начало срока годности"
                            margin="normal"
                            id="date-picker-inline2"
                            value={expiryStartDate}
                            onChange={handleChangeExpiryStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            helperText="Конец срока годности"
                            id="date-picker-inline3"
                            value={expirationDate}
                            onChange={handleChangeExpirationDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
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
                        text="Добавить"
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Отмена"
                        color="default"
                        onClick={() => props.history.goBack()}
                    />
                </div>
            </Grid>
        </Paper>
    )
}

export default AddNewDeliver;