import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../actions/message";
import {createNewName} from "../../actions/getPharmacyNames";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const PharmacyNameFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const {message} = useSelector(state => state.message);
    const [pharmacyName, setPharmacyName] = useState('')
    const [pharmacyNameDirty, setPharmacyNameDirty] = useState(false)
    const [pharmacyNameError, setPharmacyNameError] = useState('Название аптеки не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (pharmacyNameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [pharmacyNameError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [dispatch, active]);

    const bluerHandler = (e) => {
        setPharmacyNameDirty(true)
    }

    const formOfIssueHandler = (e) => {
        setPharmacyName(e.target.value)
        if (e.target.value.length === 0) {
            setPharmacyNameError('Название аптеки не может быть пустым!')
        } else if (e.target.value.length < 4 || e.target.value.length > 20) {
            setPharmacyNameError('Название аптеки должно быть от 3 до 20 символов!')
        } else {
            setPharmacyNameError("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewName(pharmacyName))
            .then(() => {
                setSuccessful(true);
                setPharmacyName("")
                setPharmacyNameError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const handleReset = (e) => {
        e.preventDefault()
        setPharmacyName("")
        setPharmacyNameError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Название аптеки"
                    name="pharmacyName"
                    value={pharmacyName}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => formOfIssueHandler(e)}
                />
                {(pharmacyNameError && pharmacyNameDirty) && <div style={{color: 'red'}}>{pharmacyNameError}</div>}
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

export default PharmacyNameFormWindow;