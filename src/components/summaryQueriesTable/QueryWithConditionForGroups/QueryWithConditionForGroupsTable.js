import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, Typography,} from "@material-ui/core";
import '../../commonComponents/LoadingAnimation.css'
import {getQueryWithConditionForGroups} from "../../../actions/getSummaryQueries";
import QueryWithConditionForGroupsTableHead from "./QueryWithConditionForGroupsTableHead";

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

    useEffect(() => {
        dispatch(getQueryWithConditionForGroups())
    }, [dispatch])

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Grid container align="center" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Вывод районов где количество аптек больше среднего количества аптек в городе
                        </Typography>
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
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.name_of_area}</TableCell>
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
            </Paper>
        </div>
    )
};

export default QueryWithConditionForGroupsTable;
