import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPageDelivers} from "../../reducers/deliveriesTableReducer";
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import ConfirmDialog from "../commonComponents/ConfirmDialog";
import Notification from "../commonComponents/Notification";
import DeliveriesTableHead from "./DeliveriesTableHead";
import {deleteDeliver, getDeliveries} from "../../actions/getDeliveries";
import {NavLink} from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Moment from "react-moment";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CommonTableToolbar from "../commonComponents/CommonToolBar";
import MedicineTableHead from "../medicineTable/MedicineTableHead";

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
    }
}))

const DeliveriesTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const deliveries = useSelector(state => state.deliveriesReducer.deliveries)
    let currentPageDelivers = useSelector(state => state.deliveriesReducer.currentPageDelivers)
    let totalCount = useSelector(state => state.deliveriesReducer.totalCount)
    const [value, setValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = React.useState([]);
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        if(selected.indexOf(id) !== -1) {
            let newSelected = selected
            newSelected.splice(selected.indexOf(id), 1)
            setSelected(newSelected)
        }
        dispatch(deleteDeliver(id, value, currentPageDelivers, rowsPerPage))
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            let newSelecteds = deliveries.map((n) => n.id)
            let arr = []
            newSelecteds.forEach((item) => {
                if (selected.indexOf(item) === -1) {
                    arr.push(item)
                }
            })
            arr.push.apply(arr, selected)
            setSelected(arr);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageDelivers(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageDelivers(1))
    };

    useEffect(() => {
        dispatch(getDeliveries(value, currentPageDelivers, rowsPerPage))
    }, [currentPageDelivers, dispatch, rowsPerPage])

    useEffect(() => {
        dispatch(setCurrentPageDelivers(1))
        dispatch(getDeliveries(value, currentPageDelivers, rowsPerPage))
    }, [value])

    return (
        <div>
            <Paper className={classes.pageContent}>
                <CommonTableToolbar numSelected={selected.length} tableName={'Delivers'}/>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Search deliver"
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
                    <NavLink to={`/currentDeliver/${0}/addNew`}>
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            className={classes.newButton}
                        />
                    </NavLink>
                </Toolbar>

                <Table className={classes.table}>
                    <DeliveriesTableHead
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={totalCount}
                    />
                    <TableBody>
                        {
                            deliveries.map(item =>
                                (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected(item.id)}
                                        tabIndex={-1}
                                        key={item.id}
                                        selected={isSelected(item.id)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, item.id)}
                                                checked={isSelected(item.id)}
                                                inputProps={{'aria-labelledby': item.id}}
                                            />
                                        </TableCell>
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
                                        <TableCell>{item.supplier_price}<AttachMoneyIcon fontSize="small"/></TableCell>
                                        <TableCell>{item.pharmacy_price}<AttachMoneyIcon fontSize="small"/></TableCell>
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
                                        <TableCell>
                                            <NavLink to={`/currentDeliver/${item.id}/see`}>
                                                <Controls.ActionButton color="primary">
                                                    <VisibilityIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </NavLink>
                                            <NavLink to={`/currentDeliver/${item.id}/edit`}>
                                                <Controls.ActionButton color="primary">
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </NavLink>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => {
                                                            onDelete(item.id)
                                                        }
                                                    })
                                                }}
                                            >
                                                <CloseIcon fontSize="small"/>
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50, totalCount]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={currentPageDelivers - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
};

export default DeliveriesTable;
