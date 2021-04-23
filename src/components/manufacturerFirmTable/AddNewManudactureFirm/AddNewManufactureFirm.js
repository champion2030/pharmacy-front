import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, TextField,} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {Autocomplete} from "@material-ui/lab";
import {getCountries} from "../../../actions/getCountriesOfManufacture";
import {clearMessage} from "../../../actions/message";
import {createNewFirm} from "../../../actions/getManufacturerFirm";
import Controls from "../../controls/Controls";

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

const AddNewManufactureFirm = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const [countryOfManufactureId, setCountryOfManufactureId] = useState('')
    const [firm, setFirm] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);
    const countries = useSelector(state => state.countryOfManufactureReducer.countries)

    useEffect(() => {
        dispatch(getCountries())
        dispatch(clearMessage())
    }, [dispatch])

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };

    const onChangeFirmName = (e) => {
        const firmName = e.target.value;
        setFirm(firmName)
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address);
    };

    const handleSubmit = () => {
        dispatch(createNewFirm(countryOfManufactureId, firm, email, address, selectedDate))
            .then(() => {
                setSuccessful(true);
                props.history.goBack()
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    return (
        <Paper className={classes.pageContent}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={3}>
                        <Autocomplete
                            id="combo-box-demo1"
                            options={countries}
                            disableClearable
                            getOptionLabel={(option) => option.country}
                            style={{width: 300, marginBottom: 20}}
                            onChange={(event, newValue) => {
                                setCountryOfManufactureId(newValue.id)
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label={"Страна производитель"}
                                    variant="outlined"
                                />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="firmName"
                            value={firm}
                            onChange={e => onChangeFirmName(e)}
                            helperText="Название фирмы"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="email"
                            value={email}
                            onChange={e => onChangeEmail(e)}
                            helperText="Email"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="address"
                            value={address}
                            onChange={e => onChangeAddress(e)}
                            helperText="Адресс"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={handleDateChange}
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

export default AddNewManufactureFirm;