import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, Toolbar, Typography} from "@material-ui/core";
import SecondRequestTableHead from "./SecondRequestTableHead";
import {getSecondRequestFirstPart, getSecondRequestSecondPart} from "../../../actions/getRequests";
import {setCurrentPageSecondRequest} from "../../../reducers/requestTableReducer";
import TablePagination from "@material-ui/core/TablePagination";
import SecondRequestSecondPartTableHead from "./SecondRequestSecondPartTableHead";

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

const SecondRequestTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const pharmaciesInEachArea = useSelector(state => state.requestsReducer.pharmaciesInEachArea)
    const currentPageSecondRequest = useSelector(state => state.requestsReducer.currentPageSecondRequest)
    const totalCountSecondRequest = useSelector(state => state.requestsReducer.totalCountSecondRequest)
    const secondRequestSecondPart = useSelector(state => state.requestsReducer.secondRequestSecondPart)
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getSecondRequestSecondPart())
        dispatch(getSecondRequestFirstPart(currentPageSecondRequest, rowsPerPage))
    }, [dispatch, currentPageSecondRequest, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageSecondRequest(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageSecondRequest(1))
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Grid container align="center" justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Количество аптек каждого типа собственности в каждом районе
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Table className={classes.table}>
                    <SecondRequestTableHead/>
                    <TableBody>
                        {
                            pharmaciesInEachArea.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{item.count}</TableCell>
                                            <TableCell>{item.name_of_property}</TableCell>
                                            <TableCell>{item.name_of_area}</TableCell>
                                        </TableRow>
                                    )
                                }
                            )
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50]}
                    component="div"
                    count={totalCountSecondRequest}
                    rowsPerPage={rowsPerPage}
                    page={currentPageSecondRequest - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <Toolbar>
                    <Grid container align="center" justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Количество аптек конкретного типа собственности по городу в целом
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Table className={classes.table}>
                    <SecondRequestSecondPartTableHead/>
                    <TableBody>
                        {
                            secondRequestSecondPart.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{item.count}</TableCell>
                                            <TableCell>{item.name_of_property}</TableCell>
                                        </TableRow>
                                    )
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
};

export default SecondRequestTable;
