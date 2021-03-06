import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../actions/message";
import {createNewType} from "../../actions/getTypesOfProperty";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const TypeOfPropertyFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const {message} = useSelector(state => state.message);
    const [typeOfProperty, setTypeOfProperty] = useState('')
    const [typeOfPropertyDirty, setTypeOfPropertyDirty] = useState(false)
    const [typeOfPropertyError, setTypeOfPropertyError] = useState('Тип собственности не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (typeOfPropertyError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [typeOfPropertyError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [dispatch, active]);

    const bluerHandler = (e) => {
        setTypeOfPropertyDirty(true)
    }

    const formOfIssueHandler = (e) => {
        setTypeOfProperty(e.target.value)
        if (e.target.value.length === 0) {
            setTypeOfPropertyError('Тип собственности не может быть пустым!')
        } else if (e.target.value.length < 4 || e.target.value.length > 20) {
            setTypeOfPropertyError('Тип собственности должен быть от 3 до 20 символов!')
        } else {
            setTypeOfPropertyError("")
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewType(typeOfProperty))
            .then(() => {
                setSuccessful(true);
                setTypeOfProperty("")
                setTypeOfPropertyError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const handleReset = (e) => {
        e.preventDefault()
        setTypeOfProperty("")
        setTypeOfPropertyError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Тип собственности"
                    name="typeOfProperty"
                    value={typeOfProperty}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => formOfIssueHandler(e)}
                />
                {(typeOfPropertyError && typeOfPropertyDirty) &&
                <div style={{color: 'red'}}>{typeOfPropertyError}</div>}

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

export default TypeOfPropertyFormWindow;