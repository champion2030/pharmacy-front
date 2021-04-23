import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, TextField,} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {clearMessage} from "../../../actions/message";
import {getAllPharmacies} from "../../../actions/getPharmacy";
import {createNewEmployee} from "../../../actions/getEmployee";
import {Autocomplete} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    buttons: {
        marginTop: "30px"
    },
    formControl: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        minWidth: 230,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}))

const AddNewEmployee = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [pharmacyId, setPharmacyId] = useState('')
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);
    const allPharmacies = useSelector(state => state.pharmacyReducer.allPharmacies)

    useEffect(() => {
        dispatch(getAllPharmacies())
        dispatch(clearMessage())
    }, [dispatch])

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name)
    };

    const onChangeSurname = (e) => {
        const surname = e.target.value;
        setSurname(surname);
    };

    const onChangePatronymic = (e) => {
        const patronymic = e.target.value;
        setPatronymic(patronymic);
    };

    const handleSubmit = () => {
        dispatch(createNewEmployee(pharmacyId, name, surname, patronymic))
            .then(() => {
                setSuccessful(true);
                props.history.goBack()
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    return (
        <Paper className={classes.pageContent}>
            <Grid container align="center" justify="center" alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="name"
                        value={name || ""}
                        onChange={e => onChangeName(e)}
                        helperText="Имя сотрудника"
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="surname"
                        value={surname || ""}
                        onChange={e => onChangeSurname(e)}
                        helperText="Фамилия сотрудника"
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="patronymic"
                        value={patronymic || ""}
                        onChange={e => onChangePatronymic(e)}
                        helperText="Отчество сотрудника"
                    />
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        id="combo-box-demo3"
                        options={allPharmacies}
                        disableClearable
                        getOptionLabel={(option) => option.id + ' , ' + option.name}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {
                            setPharmacyId(newValue.id)
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={"Аптека"}
                                variant="outlined"
                            />}
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
                <div className={classes.buttons}>
                    <Controls.Button
                        type="submit"
                        text="Добавить"
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Отмена"
                        color="default"
                        onClick={() => props.history.goBack()}
                    />
                </div>
            </Grid>
        </Paper>
    )
};

export default AddNewEmployee;