import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../actions/message";
import {createNewArea} from "../../actions/getAreas";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const AreaFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const {message} = useSelector(state => state.message);
    const [area, setArea] = useState('')
    const [areaDirty, setAreaDirty] = useState(false)
    const [areaError, setAreaError] = useState('Поле не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (areaError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [areaError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [dispatch, active]);

    const bluerHandler = (e) => {
        setAreaDirty(true)
    }

    const formOfIssueHandler = (e) => {
        setArea(e.target.value)
        if (e.target.value.length === 0) {
            setAreaError('Поле не может быть пустым!')
        } else if (e.target.value.length < 4 || e.target.value.length > 20) {
            setAreaError('Длина района должна быть от 3 до 20 символов!')
        } else {
            setAreaError("")
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewArea(area))
            .then(() => {
                setSuccessful(true);
                setArea("")
                setAreaError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const handleReset = (e) => {
        e.preventDefault()
        setArea("")
        setAreaError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Район"
                    name="area"
                    value={area}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => formOfIssueHandler(e)}
                />
                {(areaError && areaDirty) && <div style={{color: 'red'}}>{areaError}</div>}

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

export default AreaFormWindow;