import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPagePharmacy} from "../../reducers/pharmacyTableReducer";
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "../controls/Checkbox";
import ConfirmDialog from "../commonComponents/ConfirmDialog";
import Notification from "../commonComponents/Notification";
import PharmacyTableHead from "./PharmacyTableHead";
import {deletePharmacy, getPharmacies} from "../../actions/getPharmacy";
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
        right: '10px'
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

const PharmacyTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const pharmacies = useSelector(state => state.pharmacyReducer.pharmacies)
    let currentPagePharmacy = useSelector(state => state.pharmacyReducer.currentPagePharmacy)
    let totalCount = useSelector(state => state.pharmacyReducer.totalCount)
    const [value, setValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deletePharmacy(id, value, currentPagePharmacy, rowsPerPage))
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPagePharmacy(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPagePharmacy(1))
    };

    useEffect(() => {
        if (value !== '') dispatch(setCurrentPagePharmacy(1))
        dispatch(getPharmacies(value, currentPagePharmacy, rowsPerPage))
    }, [currentPagePharmacy, dispatch, rowsPerPage, value])

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Search pharmacy"
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
                    <NavLink to={`/currentPharmacy/${0}/addNew`}>
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            className={classes.newButton}
                        />
                    </NavLink>
                </Toolbar>

                <Table className={classes.table}>
                    <PharmacyTableHead/>
                    <TableBody>
                        {
                            pharmacies.map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox//checked={isItemSelected}//inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.name_of_area}</TableCell>
                                        <TableCell>{item.name_of_property}</TableCell>
                                        <TableCell>{item.telephone}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>
                                            <NavLink to={`/currentPharmacy/${item.id}/see`}>
                                                <Controls.ActionButton color="primary">
                                                    <VisibilityIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </NavLink>
                                            <NavLink to={`/currentPharmacy/${item.id}/edit`}>
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
                    page={currentPagePharmacy - 1}
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

export default PharmacyTable;
