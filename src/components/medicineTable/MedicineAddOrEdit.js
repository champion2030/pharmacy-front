import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, TextField,} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {getAllFirms} from "../../actions/getManufacturerFirm";
import {createNewMedicine, getCurrentMedicine, updateCurrentMedicine} from "../../actions/getMedicine";
import {getForms} from "../../actions/getFormsOfIssue";
import {getGroups} from "../../actions/getPharmacologicalGroups";
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

const MedicineAddOrEdit = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {id, action} = useParams()
    const [medicineName, setMedicineName] = useState('')
    const [formOfIssueId, setFormOfIssueId] = useState('')
    const [formOfIssue, setFormOfIssue] = useState('')
    const [pharmacologicalGroupId, setPharmacologicalGroupId] = useState('')
    const [pharmacologicalGroup, setPharmacologicalGroup] = useState('')
    const [manufacturerFirmId, setManufacturerFirmId] = useState('')
    const [manufacturerFirm, setManufacturerFirm] = useState('')
    const [barcode, setBarcode] = useState('')
    const [instruction, setInstruction] = useState('')
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);
    const allManufacturerFirms = useSelector(state => state.manufacturerFirmReducer.allManufacturerFirms)
    const groups = useSelector(state => state.pharmacologicalGroupReducer.groups)
    const forms = useSelector(state => state.formOfIssueReducer.forms)

    useEffect(() => {
        if (Number(id) !== 0) {
            getCurrentMedicine(id, setMedicineName, setFormOfIssueId, setFormOfIssue, setPharmacologicalGroupId, setPharmacologicalGroup, setManufacturerFirmId, setManufacturerFirm, setBarcode, setInstruction)
        }
        if (action !== 'see') {
            dispatch(getForms())
            dispatch(getGroups())
            dispatch(getAllFirms())
        }
        dispatch(clearMessage())
    }, [dispatch, id, action])

    const onChangeMedicineName = (e) => {
        const MedicineName = e.target.value;
        setMedicineName(MedicineName)
    };

    const onChangeBarcode = (e) => {
        const barcode = e.target.value;
        setBarcode(barcode);
    };

    const onChangeInstruction = (e) => {
        const instruction = e.target.value;
        setInstruction(instruction);
    };

    const handleSubmit = () => {
        if (Number(id) === 0) {
            dispatch(createNewMedicine(formOfIssueId, pharmacologicalGroupId, manufacturerFirmId, medicineName, instruction, barcode))
                .then(() => {
                    setSuccessful(true);
                    props.history.goBack()
                })
                .catch(() => {
                    setSuccessful(false);
                });
        } else {
            dispatch(updateCurrentMedicine(formOfIssueId, pharmacologicalGroupId, manufacturerFirmId, medicineName, instruction, barcode, id))
                .then(() => {
                    setSuccessful(true);
                    props.history.goBack()
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return (
        <Paper className={classes.pageContent}>
            <Grid container align="center" justify="center" alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="medicineName"
                        value={medicineName || ""}
                        onChange={e => onChangeMedicineName(e)}
                        helperText="Название лекарства"
                        disabled={action === 'see'}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="barcode"
                        type="number"
                        value={barcode || ""}
                        onChange={e => onChangeBarcode(e)}
                        helperText="Штрих-код"
                        disabled={action === 'see'}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        name="instruction"
                        style={{width: 400}}
                        value={instruction || ""}
                        onChange={e => onChangeInstruction(e)}
                        helperText="Инструкция"
                        multiline
                        rows={6}
                        rowsMax={6}
                        disabled={action === 'see'}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        id="combo-box-demo1"
                        options={forms}
                        disableClearable
                        disabled={action === 'see'}
                        getOptionLabel={(option) => option.form_of_issue}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {
                            setFormOfIssueId(newValue.id)
                            setFormOfIssue(newValue.form_of_issue)
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={action === 'addNew' ? "Форма выпуска" : formOfIssue}
                                variant="outlined"
                            />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        id="combo-box-demo2"
                        options={groups}
                        disableClearable
                        disabled={action === 'see'}
                        getOptionLabel={(option) => option.pharmacological_group}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {
                            setPharmacologicalGroupId(newValue.id)
                            setPharmacologicalGroup(newValue.pharmacological_group)
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={action === 'addNew' ? "Фармакологическая группа" : pharmacologicalGroup}
                                variant="outlined"
                            />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        id="combo-box-demo3"
                        options={allManufacturerFirms}
                        disableClearable
                        disabled={action === 'see'}
                        getOptionLabel={(option) => option.firm_name}
                        style={{width: 300, marginBottom: 20}}
                        onChange={(event, newValue) => {
                            setManufacturerFirmId(newValue.id)
                            setManufacturerFirm(newValue.firm_name)
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={action === 'addNew' ? "Фирма производитель" : manufacturerFirm}
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
                        text="Добавить/Обновить"
                        disabled={action === 'see'}
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

export default MedicineAddOrEdit;