import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, TextField} from "@material-ui/core";
import {NavLink, useParams} from "react-router-dom"
import Controls from "../../controls/Controls";
import {clearMessage} from "../../../actions/message";
import {getCurrentPharmacy, updateCurrentPharmacy} from "../../../actions/getPharmacy";
import {getTypes} from "../../../actions/getTypesOfProperty";
import {getNames} from "../../../actions/getPharmacyNames";
import {getAreas} from "../../../actions/getAreas";
import {Autocomplete} from "@material-ui/lab";
import {getDeliversForCurrentPharmacy} from "../../../actions/getDeliveries";
import {DataGrid} from '@material-ui/data-grid';
import AddIcon from "@material-ui/icons/Add";
import '../../commonComponents/LoadingAnimation.css'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
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

const columns = [
    {field: 'medicine_name', headerName: 'Название лекарства', width: 250},
    {field: 'full_name', headerName: 'Сотрудник', width: 250},
    {field: 'reason_for_return', headerName: 'Причина возврата', width: 350},
    {field: 'receipt_date', headerName: 'Дата поступления', width: 250},
    {field: 'number_of_packages', headerName: 'Количество упаковок', width: 190},
    {field: 'presence_of_defect', headerName: 'Наличие деффекта', width: 170},
    {field: 'supplier_price', headerName: 'Цена (производитель)', width: 150},
    {field: 'pharmacy_price', headerName: 'Цена (аптека)', width: 170},
    {field: 'expiry_start_date', headerName: 'Начало строка годности', width: 250},
    {field: 'expiration_date', headerName: 'Конец срока годности', width: 250},
    {field: 'batch_number', headerName: 'Номер партии', width: 150},
]

const PharmacyViewOrEdit = (props) => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const {id, action} = useParams()
    const [pharmacyNameId, setPharmacyNameId] = useState('')
    const [pharmacyName, setPharmacyName] = useState('')
    const [areaId, setAreaId] = useState('')
    const [area, setArea] = useState('')
    const [typeOfPropertyId, setTypeOfPropertyId] = useState('')
    const [typeOfProperty, setTypeOfProperty] = useState('')
    const [telephone, setTelephone] = useState('')
    const [address, setAddress] = useState('')
    const types = useSelector(state => state.typesOfPropertyReducer.types)
    const names = useSelector(state => state.pharmacyNameReducer.names)
    const areas = useSelector(state => state.areaReducer.areas)
    const deliversForCurrentPharmacy = useSelector(state => state.deliveriesReducer.deliversForCurrentPharmacy)
    const {message} = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false)
    const currentPharmacy = useSelector(state => state.pharmacyReducer.currentPharmacy)
    const isFetchingPharmacy = useSelector(state => state.pharmacyReducer.isFetchingPharmacy)

    useEffect(() => {
        dispatch(getCurrentPharmacy(id))
        if (action !== 'see') {
            dispatch(getTypes())
            dispatch(getNames())
            dispatch(getAreas())
        }
        if (action === 'see') {
            dispatch(getDeliversForCurrentPharmacy(id))
        }
        dispatch(clearMessage())
    }, [dispatch, id, action])

    useEffect(() => {
        if (isFetchingPharmacy === false) {
            setPharmacyNameId(currentPharmacy.name_id)
            setPharmacyName(currentPharmacy.name)
            setAreaId(currentPharmacy.area_id)
            setArea(currentPharmacy.name_of_area)
            setTypeOfPropertyId(currentPharmacy.type_of_property_id)
            setTypeOfProperty(currentPharmacy.name_of_property)
            setTelephone(currentPharmacy.telephone)
            setAddress(currentPharmacy.address)
        }
    }, [isFetchingPharmacy, currentPharmacy])

    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address)
    };

    const onChangeTelephone = (e) => {
        const telephone = e.target.value;
        setTelephone(telephone);
    };

    const handleSubmit = () => {
        dispatch(updateCurrentPharmacy(pharmacyNameId, areaId, typeOfPropertyId, telephone, address, id))
            .then(() => {
                setSuccessful(true);
                props.history.goBack()
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <div>
            {
                isFetchingPharmacy === false
                    ?
                    <Paper className={classes.pageContent}>
                        <Grid container align="center" justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    name="address"
                                    value={address || ""}
                                    onChange={e => onChangeAddress(e)}
                                    helperText="Адресс"
                                    disabled={action === 'see'}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    name="telephone"
                                    value={telephone || ""}
                                    onChange={e => onChangeTelephone(e)}
                                    helperText="Телефон"
                                    disabled={action === 'see'}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="combo-box-demo1"
                                    options={names}
                                    disableClearable
                                    disabled={action === 'see'}
                                    getOptionLabel={(option) => option.name}
                                    style={{width: 300, marginBottom: 20}}
                                    onChange={(event, newValue) => {
                                        setPharmacyNameId(newValue.id)
                                        setPharmacyName(newValue.name)
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={pharmacyName}
                                            variant="outlined"
                                            helperText="азвание аптеки"
                                        />}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="combo-box-demo2"
                                    options={areas}
                                    disableClearable
                                    disabled={action === 'see'}
                                    getOptionLabel={(option) => option.name_of_area}
                                    style={{width: 300, marginBottom: 20}}
                                    onChange={(event, newValue) => {
                                        setAreaId(newValue.id)
                                        setArea(newValue.name_of_area)
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={area}
                                            variant="outlined"
                                            helperText="Район"
                                        />}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="combo-box-demo3"
                                    options={types}
                                    disableClearable
                                    disabled={action === 'see'}
                                    getOptionLabel={(option) => option.name_of_property}
                                    style={{width: 300, marginBottom: 20}}
                                    onChange={(event, newValue) => {
                                        setTypeOfPropertyId(newValue.id)
                                        setTypeOfProperty(newValue.name_of_property)
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={typeOfProperty}
                                            variant="outlined"
                                            helperText="Тип собственности"
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
                                    text="Обновить"
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
                        {

                            action === 'see'
                                ?
                                <div>
                                    <Grid container align="center" justify="center" alignItems="center">
                                        <NavLink to={`/newDeliverForCurrentPharmacy/${id}`}>
                                            <Controls.Button
                                                text="Добавить новую"
                                                variant="outlined"
                                                startIcon={<AddIcon/>}
                                            />
                                        </NavLink>
                                    </Grid>

                                    <DataGrid
                                        rows={deliversForCurrentPharmacy}
                                        columns={columns}
                                        pageSize={5}
                                        autoHeight={true}
                                        disableSelectionOnClick={true}
                                        rowsPerPageOptions={[5, 10, 50]}/>
                                </div>
                                :
                                null
                        }
                    </Paper>
                    :
                    <div className="fetching">

                    </div>
            }
        </div>
    )
}

export default PharmacyViewOrEdit;