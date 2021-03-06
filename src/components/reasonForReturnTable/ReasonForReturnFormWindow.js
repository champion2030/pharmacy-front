import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../actions/message";
import {createNewReason} from "../../actions/getReasonsForReturn";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const ReasonForReturnFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const {message} = useSelector(state => state.message);
    const [reasonForReturn, setReasonForReturn] = useState('')
    const [reasonForReturnDirty, setReasonForReturnDirty] = useState(false)
    const [reasonForReturnError, setReasonForReturnError] = useState('Причина возврата не может быть пустой')
    const [formValid, setFormValid] = useState(false)
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (reasonForReturnError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [reasonForReturnError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [dispatch, active]);

    const bluerHandler = (e) => {
        setReasonForReturnDirty(true)
    }

    const formOfIssueHandler = (e) => {
        setReasonForReturn(e.target.value)
        if (e.target.value.length === 0) {
            setReasonForReturnError('Причина возврата не может быть пустой!')
        } else if (e.target.value.length < 4 || e.target.value.length > 50) {
            setReasonForReturnError('Причина возврата должно быть от 3 до 50 символов!')
        } else {
            setReasonForReturnError("")
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewReason(reasonForReturn))
            .then(() => {
                setSuccessful(true);
                setReasonForReturn("")
                setReasonForReturnError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const handleReset = (e) => {
        e.preventDefault()
        setReasonForReturn("")
        setReasonForReturnError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Причина возврата"
                    name="reasonForReturn"
                    value={reasonForReturn}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => formOfIssueHandler(e)}
                />
                {(reasonForReturnError && reasonForReturnDirty) &&
                <div style={{color: 'red'}}>{reasonForReturnError}</div>}

                {!successful && message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <div>
                    <Controls.Button
                        text="Добавить"
                        disabled={!formValid}
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Отмена"
                        color="default"
                        onClick={handleReset}
                    />
                </div>
            </Grid>
        </form>
    )
}

export default ReasonForReturnFormWindow;