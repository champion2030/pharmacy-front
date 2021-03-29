import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles, Paper, TextField,} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {
    getCurrentCountry,
    updateCurrentCountry,
    updateCurrentInputCountry
} from "../../actions/getCountriesOfManufacture";
import formOfIssueReducer from "../../reducers/formOfIssueTableReducer";
import {
    getCurrentFormOfIssue,
    updateCurrentFormOfIssue,
    updateCurrentInputFormOfIssue
} from "../../actions/getFormsOfIssue";
import pharmacologicalGroupReducer from "../../reducers/pharmacologicalGroupTableReducer";
import {
    getCurrentPharmacologicalGroup,
    updateCurrentInputPharmacologicalGroup, updateCurrentPharmacologicalGroup
} from "../../actions/getPharmacologicalGroups";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    items: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))

const PharmacologicalGroupUpdate = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles();
    const pharmacological_group = useSelector(state => state.pharmacologicalGroupReducer.pharmacological_group)
    const {id} = useParams()
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);


    useEffect(() => {
        dispatch(getCurrentPharmacologicalGroup(id))
        dispatch(clearMessage())
    }, [])

    const formOfIssueHandler = (e) => {
        dispatch(updateCurrentInputPharmacologicalGroup(e.target.value))
    }

    const handleSubmit = (e) => {
        dispatch(updateCurrentPharmacologicalGroup(pharmacological_group, id))
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
            <div className={classes.items}>
                <TextField
                    variant="outlined"
                    label="Form of issue"
                    name="formOfIssue"
                    value={pharmacological_group}
                    onChange={e => formOfIssueHandler(e)}
                />
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
                        type="Submit"
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={() => props.history.goBack()}
                    />
                </div>
            </div>
        </Paper>
    )
};

export default PharmacologicalGroupUpdate;
