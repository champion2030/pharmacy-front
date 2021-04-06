import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField,
    useTheme
} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {getCurrentFirm, updateCurrentFirm} from "../../actions/getManufacturerFirm";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getCountries} from "../../actions/getCountriesOfManufacture";

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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ManufactureFirmAddOrEdit = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles();
    const {id} = useParams()
    const [countryOfManufacture, setCountryOfManufacture] = useState([]);
    const [firm, setFirm] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);
    const countries = useSelector(state => state.countryOfManufactureReducer.countries)

    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setCountryOfManufacture(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

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


    useEffect(() => {
        if (id !== 0) {
            getCurrentFirm(id, setCountryOfManufacture, setFirm, setEmail, setAddress, setSelectedDate)
        }
        dispatch(getCountries())
        dispatch(clearMessage())
    }, [dispatch, id])

    const handleSubmit = () => {
        if (id === 0) {

        } else {
            dispatch(updateCurrentFirm(countryOfManufacture, firm, email, address, selectedDate, id))
                .then(() => {
                    setSuccessful(true);
                    props.history.goBack()
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return (
        <Paper className={classes.pageContent}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3} align="center" justify="center" alignItems="center">
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Country of manufacture</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={countryOfManufacture}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="firmName"
                            value={firm}
                            onChange={e => onChangeFirmName(e)}
                            helperText="Firm name"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            label="Email"
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
                            helperText="Address"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
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

            <Grid align="center" justify="center" alignItems="center">
                <div className={classes.buttons}>
                    <Controls.Button
                        type="submit"
                        text="Submit"
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

export default ManufactureFirmAddOrEdit;
