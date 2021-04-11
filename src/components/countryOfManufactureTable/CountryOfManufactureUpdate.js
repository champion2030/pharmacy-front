import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, TextField,} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {getCurrentCountry, updateCurrentCountry, updateCurrentInputCountry} from "../../actions/getCountriesOfManufacture";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}))

const CountryOfManufactureUpdate = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const country = useSelector(state => state.countryOfManufactureReducer.country)
    const {id} = useParams()
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);

    useEffect(() => {
        dispatch(getCurrentCountry(id))
        dispatch(clearMessage())
    }, [dispatch, id])

    const formOfIssueHandler = (e) => {
        dispatch(updateCurrentInputCountry(e.target.value))
    }

    const handleSubmit = (e) => {
        dispatch(updateCurrentCountry(country, id))
            .then(() => {
                setSuccessful(true);
                props.history.goBack()
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <Paper className={classes.pageContent}>
            <Grid container align="center" justify="center" alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        label="Country of manufacture"
                        name="country"
                        value={country}
                        onChange={e => formOfIssueHandler(e)}
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
                <Controls.Button
                    text="Submit"
                    type="Submit"
                    onClick={handleSubmit}
                />
                <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={() => props.history.goBack()}
                />
            </Grid>
        </Paper>
    )
};

export default CountryOfManufactureUpdate;
