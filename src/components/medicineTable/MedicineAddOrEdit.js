import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField,} from "@material-ui/core";
import {useParams} from "react-router-dom"
import Controls from "../controls/Controls";
import {clearMessage} from "../../actions/message";
import {getAllFirms} from "../../actions/getManufacturerFirm";
import {createNewMedicine, getCurrentMedicine, updateCurrentMedicine} from "../../actions/getMedicine";
import {getForms} from "../../actions/getFormsOfIssue";
import {getGroups} from "../../actions/getPharmacologicalGroups";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MedicineAddOrEdit = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {id, action} = useParams()
    const [medicineName, setMedicineName] = useState('')
    const [formOfIssue, setFormOfIssue] = useState('')
    const [pharmacologicalGroup, setPharmacologicalGroup] = useState('')
    const [manufacturerFirm, setManufacturerFirm] = useState('')
    const [barcode, setBarcode] = useState('')
    const [instruction, setInstruction] = useState('')
    const [successful, setSuccessful] = useState(false);
    const {message} = useSelector(state => state.message);
    const allManufacturerFirms = useSelector(state => state.manufacturerFirmReducer.allManufacturerFirms)
    const groups = useSelector(state => state.pharmacologicalGroupReducer.groups)
    const forms = useSelector(state => state.formOfIssueReducer.forms)
    const [openManufacturerFirms, setOpenManufacturerFirms] = useState(false);
    const [openGroups, setOpenGroups] = useState(false);
    const [openForms, setOpenForms] = useState(false);


    useEffect(() => {
        if (Number(id) !== 0) {
            getCurrentMedicine(id, setMedicineName, setFormOfIssue, setPharmacologicalGroup, setManufacturerFirm, setBarcode, setInstruction)
        }
        if (action !== 'see') {
            dispatch(getForms())
            dispatch(getGroups())
            dispatch(getAllFirms())
        }
        dispatch(clearMessage())
    }, [dispatch, id, action])

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'formOfIssue':
                setFormOfIssue(e.target.value)
                break
            case 'pharmacologicalGroup':
                setPharmacologicalGroup(e.target.value)
                break
            case 'manufacturerFirm':
                setManufacturerFirm(e.target.value)
                break
            default:
                break
        }
    };

    const handleCloseFormOfIssue = () => {setOpenForms(false)}
    const handleOpenFormOfIssue = () => {setOpenForms(true)}
    const handleClosePharmacologicalGroup = () => {setOpenGroups(false)}
    const handleOpenPharmacologicalGroup = () => {setOpenGroups(true)}
    const handleCloseManufacturerFirms = () => {setOpenManufacturerFirms(false)}
    const handleOpenManufacturerFirms = () => {setOpenManufacturerFirms(true)}

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
            dispatch(createNewMedicine(formOfIssue, pharmacologicalGroup, manufacturerFirm, medicineName, instruction, barcode))
                .then(() => {
                    setSuccessful(true);
                    props.history.goBack()
                })
                .catch(() => {
                    setSuccessful(false);
                });
        } else {
            dispatch(updateCurrentMedicine(formOfIssue, pharmacologicalGroup, manufacturerFirm, medicineName, instruction, barcode, id))
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
                            helperText="Medicine name"
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
                            helperText="Barcode"
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            name="instruction"
                            style = {{width: 400}}
                            value={instruction || ""}
                            onChange={e => onChangeInstruction(e)}
                            helperText="Instruction"
                            multiline
                            rows={6}
                            rowsMax={6}
                            disabled={action === 'see'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Form of issue</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openForms}
                                name="formOfIssue"
                                onClose={handleCloseFormOfIssue}
                                onOpen={handleOpenFormOfIssue}
                                value={formOfIssue || ''}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                disabled={action === 'see'}
                            >
                                {forms.map((form) => (
                                    <MenuItem key={form.id} value={form.id}>
                                        {form.form_of_issue}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Pharmacological group</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openGroups}
                                name="pharmacologicalGroup"
                                onClose={handleClosePharmacologicalGroup}
                                onOpen={handleOpenPharmacologicalGroup}
                                value={pharmacologicalGroup || ''}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                disabled={action === 'see'}
                            >
                                {groups.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        {group.pharmacological_group}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Manufacturer firm</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openManufacturerFirms}
                                name="manufacturerFirm"
                                onClose={handleCloseManufacturerFirms}
                                onOpen={handleOpenManufacturerFirms}
                                value={manufacturerFirm || ''}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                disabled={action === 'see'}
                            >
                                {allManufacturerFirms.map((firms) => (
                                    <MenuItem key={firms.id} value={firms.id}>
                                        {firms.firm_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        text="Submit"
                        disabled={action === 'see'}
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={() => props.history.goBack()}
                    />
                </div>
            </Grid>
        </Paper>
    )
};

export default MedicineAddOrEdit;