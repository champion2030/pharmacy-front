import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import '../../commonComponents/LoadingAnimation.css'
import FinalRequestWithoutConditionTableHead from "./FinalRequestWithoutConditionTableHead";
import {setCurrentPageFinalRequestWithoutCondition} from "../../../reducers/summaryQueriesReducer";
import {getFinalRequestWithoutCondition} from "../../../actions/getSummaryQueries";

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

const FinalRequestWithoutConditionTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const finalRequestWithoutCondition = useSelector(state => state.summaryQueries.finalRequestWithoutCondition)
    let currentPageFinalRequestWithoutCondition = useSelector(state => state.summaryQueries.currentPageFinalRequestWithoutCondition)
    let totalCountFinalRequestWithoutCondition = useSelector(state => state.summaryQueries.totalCountFinalRequestWithoutCondition)
    const isFetchingFinalRequestWithoutCondition = useSelector(state => state.summaryQueries.isFetchingFinalRequestWithoutCondition)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(getFinalRequestWithoutCondition(currentPageFinalRequestWithoutCondition, rowsPerPage))
    }, [dispatch, currentPageFinalRequestWithoutCondition, rowsPerPage])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageFinalRequestWithoutCondition(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageFinalRequestWithoutCondition(1))
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Количество поставок для каждого производителя
                        </Typography>
                    </Grid>
                </Grid>
                {
                    isFetchingFinalRequestWithoutCondition === false
                        ?
                        <Table className={classes.table}>
                            <FinalRequestWithoutConditionTableHead/>
                            <TableBody>
                                {
                                    finalRequestWithoutCondition.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{item.count}</TableCell>
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
                    count={totalCountFinalRequestWithoutCondition}
                    rowsPerPage={rowsPerPage}
                    page={currentPageFinalRequestWithoutCondition - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
};

export default FinalRequestWithoutConditionTable;
