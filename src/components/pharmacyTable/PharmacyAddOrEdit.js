import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {createNewPharmacy, getCurrentPharmacy, updateCurrentPharmacy} from "../../actions/getPharmacy";
import {getTypes} from "../../actions/getTypesOfProperty";
import {getNames} from "../../actions/getPharmacyNames";
import {getAreas} from "../../actions/getAreas";
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

const PharmacyAddOrEdit = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {id, action} = useParams()
    const [pharmacyNameId, setPharmacyNameId] = useState('')
    const [pharmacyName, setPharmacyName] = useState('')
    const [areaId, setAreaId] = useState('')
    const [area, setArea] = useState('')
    const [typeOfPropertyId, setTypeOfPropertyId] = useState('')
    const [typeOfProperty, setTypeOfProperty] = useState('')
    const [telephone, setTelephone] = useState('')
    const [address, setAddress] = useState('')
    const types = useSelector(state => state.typesOfPropertyReducer.types)
    const names = useSelector(state => state.pharmacyNameReducer.names)
    const areas = useSelector(state => state.areaReducer.areas)
    const {message} = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (Number(id) !== 0) {
            getCurrentPharmacy(id, setPharmacyNameId, setPharmacyName, setAreaId, setArea, setTypeOfPropertyId, setTypeOfProperty, setTelephone, setAddress)
        }
        if (action !== 'see') {
            dispatch(getTypes())
            dispatch(getNames())
            dispatch(getAreas())
        }
        dispatch(clearMessage())
    }, [dispatch, id, action])

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
            dispatch(createNewPharmacy(pharmacyNameId, areaId, typeOfPropertyId, telephone, address))
                .then(() => {
                    setSuccessful(true);
                    props.history.goBack()
                })
                .catch(() => {
                    setSuccessful(false);
                });
        } else {
            dispatch(updateCurrentPharmacy(pharmacyNameId, areaId, typeOfPropertyId, telephone, address, id))
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
                    <Autocomplete
                        id="combo-box-demo1"
                        options={names}
                        disableClearable
                        disabled={action === 'see'}
                        getOptionLabel={(option) => option.name}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {
                            setPharmacyNameId(newValue.id)
                            setPharmacyName(newValue.name)
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={action === 'addNew' ? "Pharmacy name" : pharmacyName}
                                variant="outlined"
                            />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        id="combo-box-demo2"
                        options={areas}
                        disableClearable
                        disabled={action === 'see'}
                        getOptionLabel={(option) => option.name_of_area}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {
                            setAreaId(newValue.id)
                            setArea(newValue.name_of_area)
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={action === 'addNew' ? "Area" : area}
                                variant="outlined"
                            />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        id="combo-box-demo3"
                        options={types}
                        disableClearable
                        disabled={action === 'see'}
                        getOptionLabel={(option) => option.name_of_property}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {
                            setTypeOfPropertyId(newValue.id)
                            setTypeOfProperty(newValue.name_of_property)
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={action === 'addNew' ? "Type of property" : typeOfProperty}
                                variant="outlined"
                            />}
                    />
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