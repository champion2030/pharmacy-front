import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../actions/message";
import {createNewCountry} from "../../actions/getCountriesOfManufacture";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const CountryOfManufactureFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();

    const {message} = useSelector(state => state.message);

    const [countryOfManufacture, setCountryOfManufacture] = useState('')

    const [countryOfManufactureDirty, setCountryOfManufactureDirty] = useState(false)

    const [countryOfManufactureError, setCountryOfManufactureError] = useState('Country of manufacture can not be empty')

    const [formValid, setFormValid] = useState(false)

    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (countryOfManufactureError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [countryOfManufactureError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [dispatch, active]);

    const bluerHandler = (e) => {
        setCountryOfManufactureDirty(true)
    }

    const formOfIssueHandler = (e) => {
        setCountryOfManufacture(e.target.value)
        if (e.target.value.length === 0) {
            setCountryOfManufactureError('This field is required!')
        } else if (e.target.value.length < 4 || e.target.value.length > 20) {
            setCountryOfManufactureError('The country must be between 3 and 20 characters!')
        } else {
            setCountryOfManufactureError("")
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewCountry(countryOfManufacture))
            .then(() => {
                setSuccessful(true);
                setCountryOfManufacture("")
                setCountryOfManufactureError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const handleReset = (e) => {
        e.preventDefault()
        setCountryOfManufacture("")
        setCountryOfManufactureError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Country of manufacture"
                    name="countryOfManufacture"
                    value={countryOfManufacture}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => formOfIssueHandler(e)}
                />
                {(countryOfManufactureError && countryOfManufactureDirty) &&
                <div style={{color: 'red'}}>{countryOfManufactureError}</div>}

                {!successful && message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <div>
                    <Controls.Button
                        text="Submit"
                        disabled={!formValid}
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={handleReset}
                    />
                </div>

            </Grid>
        </form>
    )
}

export default CountryOfManufactureFormWindow;