import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles, Paper, TextField,} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {
    getCurrentReasonForReturn,
    updateCurrentInputReasonForReturn,
    updateCurrentReasonForReturn
} from "../../actions/getReasonsForReturn";

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

const ReasonForReturnUpdate = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles();
    const reason_for_return = useSelector(state => state.reasonForReturnReducer.reason_for_return)
    const {id} = useParams()
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);


    useEffect(() => {
        dispatch(getCurrentReasonForReturn(id))
        dispatch(clearMessage())
    }, [dispatch, id])

    const formOfIssueHandler = (e) => {
        dispatch(updateCurrentInputReasonForReturn(e.target.value))
    }

    const handleSubmit = (e) => {
        dispatch(updateCurrentReasonForReturn(reason_for_return, id))
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
                    label="Reason for return"
                    name="reasonForReturn"
                    value={reason_for_return}
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

export default ReasonForReturnUpdate;
