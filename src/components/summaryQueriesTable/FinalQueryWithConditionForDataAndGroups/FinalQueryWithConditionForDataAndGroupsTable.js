import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Grid, lighten, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography,} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import Moment from "react-moment";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import '../../commonComponents/LoadingAnimation.css'
import {setCurrentPageFinalQueryWithDataAndGroup,} from "../../../reducers/summaryQueriesReducer";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FinalQueryWithConditionForDataAndGroupsTableHead from "./FinalQueryWithConditionForDataAndGroupsTableHead";
import {Autocomplete} from "@material-ui/lab";
import {getAllFirms} from "../../../actions/getManufacturerFirm";
import {getFinalQueryWithDataAndGroups} from "../../../actions/getSummaryQueries";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        bottom: '8px'
    },
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    },
    root1: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.1),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    icons: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    }
}))

const FinalQueryWithConditionForDataAndGroupsTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const allManufacturerFirms = useSelector(state => state.manufacturerFirmReducer.allManufacturerFirms)
    const finalQueryWithDataAndGroup = useSelector(state => state.summaryQueries.finalQueryWithDataAndGroup)
    const currentPageFinalQueryWithDataAndGroup = useSelector(state => state.summaryQueries.currentPageFinalQueryWithDataAndGroup)
    const totalCountFinalQueryWithDataAndGroup = useSelector(state => state.summaryQueries.totalCountFinalQueryWithDataAndGroup)
    const isFetchingFinalQueryWithDataAndGroup = useSelector(state => state.summaryQueries.isFetchingFinalQueryWithDataAndGroup)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startDate, setStartDate] = useState(new Date('2012-01-01'))
    const [finishDate, setFinishDate] = useState(new Date())
    const [manufacturerFirmId, setManufacturerFirmId] = useState('')

    useEffect(() => {
        dispatch(getFinalQueryWithDataAndGroups(currentPageFinalQueryWithDataAndGroup, rowsPerPage, startDate, finishDate, manufacturerFirmId))
    }, [currentPageFinalQueryWithDataAndGroup, dispatch, rowsPerPage, startDate, finishDate, manufacturerFirmId])

    useEffect(() => {
        dispatch(getAllFirms())
    }, [dispatch])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageFinalQueryWithDataAndGroup(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageFinalQueryWithDataAndGroup(1))
    }

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleFinishDateChange = (date) => {
        setFinishDate(date)
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container align="center" justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Поставки и их количество за определённый промежуток времени для конкретного производителя
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                id="combo-box-demo3"
                                options={allManufacturerFirms}
                                disableClearable
                                getOptionLabel={(option) => option.firm_name}
                                style={{width: 300, marginBottom: 20}}
                                onChange={(event, newValue) => {
                                    setManufacturerFirmId(newValue.id)
                                }}
                                renderInput={(params) =>
                                    <TextField{...params} variant="outlined"/>}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <KeyboardDatePicker
                                disableToolbar
                                helperText="Начальная дата"
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline1"
                                value={startDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <KeyboardDatePicker
                                disableToolbar
                                helperText="Конечная дата"
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline2"
                                value={finishDate}
                                onChange={handleFinishDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
                {
                    isFetchingFinalQueryWithDataAndGroup === false
                        ?
                        <Table className={classes.table}>
                            <FinalQueryWithConditionForDataAndGroupsTableHead/>
                            <TableBody>
                                {
                                    finalQueryWithDataAndGroup.map(item =>
                                        (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.medicine_name}</TableCell>
                                                <TableCell>{item.full_name}</TableCell>
                                                <TableCell width="350">{item.reason_for_return}</TableCell>
                                                <TableCell>
                                                    <Moment format="DD/MM/YYYY" add={{hours: 3}}>
                                                        {item.receipt_date}
                                                    </Moment>
                                                </TableCell>
                                                <TableCell>{item.number_of_packages}</TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                        disabled
                                                        checked={item.presence_of_defect || false}
                                                        inputProps={{'aria-label': 'disabled checked checkbox'}}
                                                    />
                                                </TableCell>
                                                <TableCell>{item.supplier_price}<AttachMoneyIcon
                                                    fontSize="small"/></TableCell>
                                                <TableCell>{item.pharmacy_price}<AttachMoneyIcon
                                                    fontSize="small"/></TableCell>
                                                <TableCell>
                                                    <Moment format="DD/MM/YYYY" add={{hours: 3}}>
                                                        {item.expiry_start_date}
                                                    </Moment>
                                                </TableCell>
                                                <TableCell>
                                                    <Moment format="DD/MM/YYYY" add={{hours: 3}}>
                                                        {item.expiration_date}
                                                    </Moment>
                                                </TableCell>
                                                <TableCell>{item.batch_number}</TableCell>
                                            </TableRow>
                                        )
                                    )
                                }
                            </TableBody>

                        </Table>
                        :
                        <div className="fetching">

                        </div>
                }
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50, 200]}
                    component="div"
                    count={totalCountFinalQueryWithDataAndGroup}
                    rowsPerPage={rowsPerPage}
                    page={currentPageFinalQueryWithDataAndGroup - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
};

export default FinalQueryWithConditionForDataAndGroupsTable;
