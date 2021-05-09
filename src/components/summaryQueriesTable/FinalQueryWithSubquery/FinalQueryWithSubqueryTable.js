import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, Typography,} from "@material-ui/core";
import '../../commonComponents/LoadingAnimation.css'
import {getFinalQueryWithSubquery} from "../../../actions/getSummaryQueries";
import {setCurrentPageFinalQueryWithSubquery} from "../../../reducers/summaryQueriesReducer";
import TablePagination from "@material-ui/core/TablePagination";
import FinalQueryWithSubqueryTableHead from "./FinalQueryWithSubqueryTableHead";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
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

const FinalQueryWithSubqueryTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const finalQueryWithSubquery = useSelector(state => state.summaryQueries.finalQueryWithSubquery)
    const isFetchingFinalQueryWithSubquery = useSelector(state => state.summaryQueries.isFetchingFinalQueryWithSubquery)
    const currentPageFinalQueryWithSubquery = useSelector(state => state.summaryQueries.currentPageFinalQueryWithSubquery)
    const totalCountFinalQueryWithSubquery = useSelector(state => state.summaryQueries.totalCountFinalQueryWithSubquery)
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getFinalQueryWithSubquery(currentPageFinalQueryWithSubquery, rowsPerPage))
    }, [dispatch, rowsPerPage, currentPageFinalQueryWithSubquery])


    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageFinalQueryWithSubquery(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageFinalQueryWithSubquery(1))
    }

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Производители с количеством лекарст больше среднего
                        </Typography>
                    </Grid>
                </Grid>
                {
                    isFetchingFinalQueryWithSubquery === false
                        ?
                        <Table className={classes.table}>
                            <FinalQueryWithSubqueryTableHead/>
                            <TableBody>
                                {
                                    finalQueryWithSubquery.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{item.cnt}</TableCell>
                                                    <TableCell>{item.country_of_manufacture}</TableCell>
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
                    count={totalCountFinalQueryWithSubquery}
                    rowsPerPage={rowsPerPage}
                    page={currentPageFinalQueryWithSubquery - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
};

export default FinalQueryWithSubqueryTable;
