import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography,} from "@material-ui/core";
import '../../commonComponents/LoadingAnimation.css'
import {getQueryWithConditionForGroups} from "../../../actions/getSummaryQueries";
import QueryWithConditionForGroupsTableHead from "./QueryWithConditionForGroupsTableHead";
import Moment from "react-moment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {Autocomplete} from "@material-ui/lab";
import {getAllFirms} from "../../../actions/getManufacturerFirm";
import {setCurrentPageFinalQueryWithGroup} from "../../../reducers/summaryQueriesReducer";
import TablePagination from "@material-ui/core/TablePagination";

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

const QueryWithConditionForGroupsTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const queryWithConditionForGroups = useSelector(state => state.summaryQueries.queryWithConditionForGroups)
    const isFetchingQueryWithConditionForGroups = useSelector(state => state.summaryQueries.isFetchingQueryWithConditionForGroups)
    const currentPageFinalQueryWithGroup = useSelector(state => state.summaryQueries.currentPageFinalQueryWithGroup)
    const allManufacturerFirms = useSelector(state => state.manufacturerFirmReducer.allManufacturerFirms)
    const totalCountFinalQueryWithGroup = useSelector(state => state.summaryQueries.totalCountFinalQueryWithGroup)
    const [manufacturerFirmId, setManufacturerFirmId] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5);


    useEffect(() => {
        dispatch(getQueryWithConditionForGroups(currentPageFinalQueryWithGroup, rowsPerPage, manufacturerFirmId))
    }, [dispatch, rowsPerPage, manufacturerFirmId, currentPageFinalQueryWithGroup])

    useEffect(() => {
        dispatch(getAllFirms())
    }, [dispatch])

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageFinalQueryWithGroup(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageFinalQueryWithGroup(1))
    }

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Поставки и их количество для определённой фирмы
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
                </Grid>
                {
                    isFetchingQueryWithConditionForGroups === false
                        ?
                        <Table className={classes.table}>
                            <QueryWithConditionForGroupsTableHead/>
                            <TableBody>
                                {
                                    queryWithConditionForGroups.map(item =>
                                        (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.medicine_name}</TableCell>
                                                <TableCell>{item.full_name}</TableCell>
                                                <TableCell width="100">{item.reason_for_return}</TableCell>
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
                    count={totalCountFinalQueryWithGroup}
                    rowsPerPage={rowsPerPage}
                    page={currentPageFinalQueryWithGroup - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
};

export default QueryWithConditionForGroupsTable;
