import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {createNewPharmacy, getCurrentPharmacy, updateCurrentPharmacy} from "../../actions/getPharmacy";
import {getTypes} from "../../actions/getTypesOfProperty";
import {getNames} from "../../actions/getPharmacyNames";
import {getAreas} from "../../actions/getAreas";

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

const PharmacyAddOrEdit = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {id, action} = useParams()
    const [pharmacyName, setPharmacyName] = useState('')
    const [area, setArea] = useState('')
    const [typeOfProperty, setTypeOfProperty] = useState('')
    const [telephone, setTelephone] = useState('')
    const [address, setAddress] = useState('')
    const types = useSelector(state => state.typesOfPropertyReducer.types)
    const names = useSelector(state => state.pharmacyNameReducer.names)
    const areas = useSelector(state => state.areaReducer.areas)
    const {message} = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);
    const [openTypesOfProperty, setOpenTypesOfProperty] = useState(false);
    const [openPharmacyNames, setOpenPharmacyNames] = useState(false);
    const [openArea, setOpenArea] = useState(false);


    useEffect(() => {
        if (Number(id) !== 0) {
            getCurrentPharmacy(id, setPharmacyName, setArea, setTypeOfProperty, setTelephone, setAddress)
        }
        if (action !== 'see') {
            dispatch(getTypes())
            dispatch(getNames())
            dispatch(getAreas())
        }
        dispatch(clearMessage())
    }, [dispatch, id, action])

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'pharmacyName':
                setPharmacyName(e.target.value)
                break
            case 'area':
                setArea(e.target.value)
                break
            case 'typeOfProperty':
                setTypeOfProperty(e.target.value)
                break
            default:
                break
        }
    };

    const handleCloseTypesOfProperty = () => {setOpenTypesOfProperty(false)}
    const handleOpenTypesOfProperty = () => {setOpenTypesOfProperty(true)}
    const handleClosePharmacyNames = () => {setOpenPharmacyNames(false)}
    const handleOpenPharmacyNames = () => {setOpenPharmacyNames(true)}
    const handleCloseArea = () => {setOpenArea(false)}
    const handleOpenArea = () => {setOpenArea(true)}

    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address)
    };

    const onChangeTelephone = (e) => {
        const telephone = e.target.value;
        setTelephone(telephone);
    };

    const handleSubmit = () => {
        if (Number(id) === 0) {
            dispatch(createNewPharmacy(pharmacyName, area, typeOfProperty, telephone, address))
                .then(() => {
                    setSuccessful(true);
                    props.history.goBack()
                })
                .catch(() => {
                    setSuccessful(false);
                });
        } else {
            dispatch(updateCurrentPharmacy(pharmacyName, area, typeOfProperty, telephone, address, id))
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
            <Grid container align="center" justify="center" alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="address"
                        value={address || ""}
                        onChange={e => onChangeAddress(e)}
                        helperText="Address"
                        disabled={action === 'see'}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="telephone"
                        value={telephone || ""}
                        onChange={e => onChangeTelephone(e)}
                        helperText="Telephone"
                        disabled={action === 'see'}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Pharmacy name</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openPharmacyNames}
                            name="pharmacyName"
                            onClose={handleClosePharmacyNames}
                            onOpen={handleOpenPharmacyNames}
                            value={pharmacyName || ''}
                            onChange={handleChange}
                            MenuProps={MenuProps}
                            disabled={action === 'see'}
                        >
                            {names.map((name) => (
                                <MenuItem key={name.id} value={name.id}>
                                    {name.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Area</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openArea}
                            name="area"
                            onClose={handleCloseArea}
                            onOpen={handleOpenArea}
                            value={area || ''}
                            onChange={handleChange}
                            MenuProps={MenuProps}
                            disabled={action === 'see'}
                        >
                            {areas.map((area) => (
                                <MenuItem key={area.id} value={area.id}>
                                    {area.name_of_area}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Type of property</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openTypesOfProperty}
                            name="typeOfProperty"
                            onClose={handleCloseTypesOfProperty}
                            onOpen={handleOpenTypesOfProperty}
                            value={typeOfProperty || ''}
                            onChange={handleChange}
                            MenuProps={MenuProps}
                            disabled={action === 'see'}
                        >
                            {types.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name_of_property}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
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

export default PharmacyAddOrEdit;