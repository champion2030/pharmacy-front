import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, TextField,} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";

import {
    getCurrentFormOfIssue,
    updateCurrentFormOfIssue,
    updateCurrentInputFormOfIssue
} from "../../actions/getFormsOfIssue";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}))

const FormOfIssueUpdate = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles();
    const form_of_issue = useSelector(state => state.formOfIssueReducer.form_of_issue)
    const {id} = useParams()
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);


    useEffect(() => {
        dispatch(getCurrentFormOfIssue(id))
        dispatch(clearMessage())
    }, [dispatch, id])

    const formOfIssueHandler = (e) => {
        dispatch(updateCurrentInputFormOfIssue(e.target.value))
    }

    const handleSubmit = () => {
        dispatch(updateCurrentFormOfIssue(form_of_issue, id))
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
                        label="Form of issue"
                        name="formOfIssue"
                        value={form_of_issue}
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

export default FormOfIssueUpdate;
