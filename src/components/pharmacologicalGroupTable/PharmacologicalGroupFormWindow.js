import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage} from "../../actions/message";
import {createNewGroup} from "../../actions/getPharmacologicalGroups";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const PharmacologicalGroupFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const {message} = useSelector(state => state.message);
    const [pharmacologicalGroup, setPharmacologicalGroup] = useState('')
    const [pharmacologicalGroupDirty, setPharmacologicalGroupDirty] = useState(false)
    const [pharmacologicalGroupError, setPharmacologicalGroupError] = useState('Фармакологическая группа не может быть пустой')
    const [formValid, setFormValid] = useState(false)
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (pharmacologicalGroupError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [pharmacologicalGroupError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [dispatch, active]);

    const bluerHandler = (e) => {
        setPharmacologicalGroupDirty(true)
    }

    const formOfIssueHandler = (e) => {
        setPharmacologicalGroup(e.target.value)
        if (e.target.value.length === 0) {
            setPharmacologicalGroupError('Фармакологическая группа не может быть пустой!')
        } else if (e.target.value.length < 4 || e.target.value.length > 35) {
            setPharmacologicalGroupError('Фармакологическая группа должна быть от 3 до 20 символов!')
        } else {
            setPharmacologicalGroupError("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewGroup(pharmacologicalGroup))
            .then(() => {
                setSuccessful(true);
                setPharmacologicalGroup("")
                setPharmacologicalGroupError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    const handleReset = (e) => {
        e.preventDefault()
        setPharmacologicalGroup("")
        setPharmacologicalGroupError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Фармакологическая группа"
                    name="pharmacologicalGroup"
                    value={pharmacologicalGroup}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => formOfIssueHandler(e)}
                />
                {(pharmacologicalGroupError && pharmacologicalGroupDirty) &&
                <div style={{color: 'red'}}>{pharmacologicalGroupError}</div>}

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

export default PharmacologicalGroupFormWindow;