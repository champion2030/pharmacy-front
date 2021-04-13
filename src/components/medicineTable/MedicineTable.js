import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPageMedicine} from "../../reducers/medicineTableReducer";
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "../controls/Checkbox";
import ConfirmDialog from "../commonComponents/ConfirmDialog";
import Notification from "../commonComponents/Notification";
import MedicineTableHead from "./MedicineTableHead";
import {deleteMedicine, getMedicines} from "../../actions/getMedicine";
import {NavLink} from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

const MedicineTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const medicines = useSelector(state => state.medicineReducer.medicines)
    let currentPageMedicine = useSelector(state => state.medicineReducer.currentPageMedicine)
    let totalCount = useSelector(state => state.medicineReducer.totalCount)
    const [value, setValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteMedicine(id, value, currentPageMedicine, rowsPerPage))
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageMedicine(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageMedicine(1))
    };

    useEffect(() => {
        dispatch(getMedicines(value, currentPageMedicine, rowsPerPage))
    }, [currentPageMedicine, dispatch, rowsPerPage])

    useEffect(() => {
        dispatch(setCurrentPageMedicine(1))
        dispatch(getMedicines(value, currentPageMedicine, rowsPerPage))
    }, [value])

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Search medicine"
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
                    <NavLink to={`/currentMedicine/${0}/addNew`}>
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            className={classes.newButton}
                        />
                    </NavLink>
                </Toolbar>
                <Table className={classes.table}>
                    <MedicineTableHead/>
                    <TableBody>
                        {
                            medicines.map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox//checked={isItemSelected}//inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.form_of_issue}</TableCell>
                                        <TableCell>{item.pharmacological_group}</TableCell>
                                        <TableCell>{item.firm_name}</TableCell>
                                        <TableCell>{item.medicine_name}</TableCell>
                                        <TableCell width="500">{item.instruction}</TableCell>
                                        <TableCell>{item.barcode}</TableCell>
                                        <TableCell>
                                            <NavLink to={`/currentMedicine/${item.id}/see`}>
                                                <Controls.ActionButton color="primary">
                                                    <VisibilityIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </NavLink>
                                            <NavLink to={`/currentMedicine/${item.id}/edit`}>
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
                    rowsPerPageOptions={[5, 10, 50]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={currentPageMedicine - 1}
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

export default MedicineTable;
