import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar, Typography} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import ThirdRequestTableHead from "./ThirdRequestTableHead";
import {setCurrentPageThirdRequest} from "../../../reducers/requestTableReducer";
import {getThirdRequest} from "../../../actions/getRequests";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {Search} from "@material-ui/icons";
import '../../commonComponents/LoadingAnimation.css'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        marginBottom: 25
    },
    searchInput: {
        width: '75%'
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

const ThirdRequestTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const thirdRequest = useSelector(state => state.requestsReducer.thirdRequest)
    let currentPageThirdRequest = useSelector(state => state.requestsReducer.currentPageThirdRequest)
    let totalCountThirdRequest = useSelector(state => state.requestsReducer.totalCountThirdRequest)
    const isFetchingRequest = useSelector(state => state.requestsReducer.isFetchingRequest)
    const [value, setValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(getThirdRequest(value, currentPageThirdRequest, rowsPerPage))
    }, [dispatch, currentPageThirdRequest, rowsPerPage])

    useEffect(() => {
        dispatch(setCurrentPageThirdRequest(1))
        dispatch(getThirdRequest(value, currentPageThirdRequest, rowsPerPage))
    }, [value])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageThirdRequest(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageThirdRequest(1))
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={3}>
                        <Typography variant="h6">
                            Определить сколько было возвратов лекарств и на какую сумму по каждому производителю
                            лекарств
                        </Typography>
                    </Grid>
                </Grid>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Поиск поставок"
                        className={classes.searchInput}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                    />
                </Toolbar>
                {
                    isFetchingRequest === false
                        ?
                        <Table className={classes.table}>
                            <ThirdRequestTableHead/>
                            <TableBody>
                                {
                                    thirdRequest.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{item.count}</TableCell>
                                                    <TableCell>{item.sum}<AttachMoneyIcon fontSize="small"/></TableCell>
                                                    <TableCell>{item.firm_name}</TableCell>
                                                </TableRow>
                                            )
                                        }
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
                    count={totalCountThirdRequest}
                    rowsPerPage={rowsPerPage}
                    page={currentPageThirdRequest - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
};

export default ThirdRequestTable;
