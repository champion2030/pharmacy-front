import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, Toolbar, Typography} from "@material-ui/core";
import {getDateFistRequest, getDateSecondRequest} from "../../../actions/getRequests";
import ManufacturerFirmTableHeadRequest from "./ManufacturerFirmTableHeadRequest";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPageDateFirstRequest, setCurrentPageDateSecondRequest} from "../../../reducers/requestTableReducer";
import DateFnsUtils from "@date-io/date-fns";
import Moment from "react-moment";
import '../../commonComponents/LoadingAnimation.css'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        marginBottom: 25
    },
    toolBar: {
        marginTop: 20
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
    }
}))

const DateRequests = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const dateFirstRequest = useSelector(state => state.requestsReducer.dateFirstRequest)
    const totalCountDateFirstRequest = useSelector(state => state.requestsReducer.totalCountDateFirstRequest)
    const currentPageDateFirstRequest = useSelector(state => state.requestsReducer.currentPageDateFirstRequest)
    const isFetchingDateFirstRequest = useSelector(state => state.requestsReducer.isFetchingDateFirstRequest)

    const [selectedDateSecondRequest, setSelectedDateSecondRequest] = useState(new Date())
    const [rowsPerPageSecondRequest, setRowsPerPageSecondRequest] = useState(5);
    const dateSecondRequest = useSelector(state => state.requestsReducer.dateSecondRequest)
    const totalCountDateSecondRequest = useSelector(state => state.requestsReducer.totalCountDateSecondRequest)
    const currentPageDateSecondRequest = useSelector(state => state.requestsReducer.currentPageDateSecondRequest)
    const isFetchingDateSecondRequest = useSelector(state => state.requestsReducer.isFetchingDateSecondRequest)

    useEffect(() => {
        dispatch(getDateFistRequest(selectedDate, currentPageDateFirstRequest, rowsPerPage))
    }, [dispatch, currentPageDateFirstRequest, rowsPerPage, selectedDate])

    useEffect(() => {
        dispatch(getDateSecondRequest(selectedDateSecondRequest, currentPageDateSecondRequest, rowsPerPageSecondRequest))
    }, [dispatch, currentPageDateSecondRequest, rowsPerPageSecondRequest, selectedDateSecondRequest])

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageDateFirstRequest(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageDateFirstRequest(1))
    };

    const handleDateChangeSecondRequest = (date) => {
        setSelectedDateSecondRequest(date)
    };

    const handleChangePageSecondRequest = (event, newPage) => {
        dispatch(setCurrentPageDateSecondRequest(newPage + 1))
    };

    const handleChangeRowsPerPageSecondRequest = (event) => {
        setRowsPerPageSecondRequest(+event.target.value);
        dispatch(setCurrentPageDateSecondRequest(1))
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Toolbar>
                        <Grid container align="center" justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <Typography variant="h6">
                                    Фирмы основанные раньше чем заданная дата
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    helperText="Год открытия"
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline1"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </MuiPickersUtilsProvider>
                {
                    isFetchingDateFirstRequest === false
                        ?
                        <Table className={classes.table}>
                            <ManufacturerFirmTableHeadRequest/>
                            <TableBody>
                                {
                                    dateFirstRequest.map(item =>
                                        (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.country}</TableCell>
                                                <TableCell>{item.firm_name}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{item.address}</TableCell>
                                                <TableCell>
                                                    <Moment format="DD/MM/YYYY" add={{hours: 3}}>
                                                        {item.year_open}
                                                    </Moment>
                                                </TableCell>
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
                    rowsPerPageOptions={[5, 10, 50]}
                    component="div"
                    count={totalCountDateFirstRequest}
                    rowsPerPage={rowsPerPage}
                    page={currentPageDateFirstRequest - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <Paper className={classes.pageContent}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Toolbar>
                        <Grid container align="center" justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <Typography variant="h6">
                                    Фирмы основанные позже чем заданная дата
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    helperText="Год открытия"
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline2"
                                    value={selectedDateSecondRequest}
                                    onChange={handleDateChangeSecondRequest}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </MuiPickersUtilsProvider>
                {
                    isFetchingDateSecondRequest === false
                        ?
                        <Table className={classes.table}>
                            <ManufacturerFirmTableHeadRequest/>
                            <TableBody>
                                {
                                    dateSecondRequest.map(item =>
                                        (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.country}</TableCell>
                                                <TableCell>{item.firm_name}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{item.address}</TableCell>
                                                <TableCell>
                                                    <Moment format="DD/MM/YYYY" add={{hours: 3}}>
                                                        {item.year_open}
                                                    </Moment>
                                                </TableCell>
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
                    rowsPerPageOptions={[5, 10, 50]}
                    component="div"
                    count={totalCountDateSecondRequest}
                    rowsPerPage={rowsPerPageSecondRequest}
                    page={currentPageDateSecondRequest - 1}
                    onChangePage={handleChangePageSecondRequest}
                    onChangeRowsPerPage={handleChangeRowsPerPageSecondRequest}
                />
            </Paper>
        </div>
    )
};

export default DateRequests;
