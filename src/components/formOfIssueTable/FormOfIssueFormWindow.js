import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../actions/message";
import {createNewForm} from "../../actions/getFormsOfIssue";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const FormOfIssueFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();

    const {message} = useSelector(state => state.message);

    const [formOfIssue, setFormOfIssue] = useState('')

    const [formOfIssueDirty, setFormOfIssueDirty] = useState(false)

    const [formOfIssueError, setFormOfIssueError] = useState('Form Of Issue can not be empty')

    const [formValid, setFormValid] = useState(false)

    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (formOfIssueError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [formOfIssueError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [dispatch, active]);

    const bluerHandler = (e) => {
        setFormOfIssueDirty(true)
    }

    const formOfIssueHandler = (e) => {
        setFormOfIssue(e.target.value)
        if (e.target.value.length === 0) {
            setFormOfIssueError('This field is required!')
        } else if (e.target.value.length < 4 || e.target.value.length > 20) {
            setFormOfIssueError('The form of issue must be between 3 and 20 characters!')
        } else {
            setFormOfIssueError("")
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewForm(formOfIssue))
            .then(() => {
                setSuccessful(true);
                setFormOfIssue("")
                setFormOfIssueError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const handleReset = (e) => {
        e.preventDefault()
        setFormOfIssue("")
        setFormOfIssueError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Form Of Issue"
                    name="formOfIssue"
                    value={formOfIssue}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => formOfIssueHandler(e)}
                />
                {(formOfIssueError && formOfIssueDirty) && <div style={{color: 'red'}}>{formOfIssueError}</div>}

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

export default FormOfIssueFormWindow;