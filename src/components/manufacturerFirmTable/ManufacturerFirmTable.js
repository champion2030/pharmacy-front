import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPageFirm} from "../../reducers/manufacturerFirmTableReducer";
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "../controls/Checkbox";
import ManufacturerFirmTableHead from "./ManufacturerFirmTableHead";
import {deleteFirm, getFirms} from "../../actions/getManufacturerFirm";
import ConfirmDialog from "../commonComponents/ConfirmDialog";
import Notification from "../commonComponents/Notification";
import {NavLink} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Moment from 'react-moment';

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

const ManufacturerFirmTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const manufacturerFirms = useSelector(state => state.manufacturerFirmReducer.manufacturerFirms)
    let currentPageFirm = useSelector(state => state.manufacturerFirmReducer.currentPageFirm)
    let totalCount = useSelector(state => state.manufacturerFirmReducer.totalCount)
    const [value, setValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    useEffect(() => {
        dispatch(getFirms(value, currentPageFirm, rowsPerPage))
    }, [currentPageFirm, dispatch, rowsPerPage])

    useEffect(() => {
        dispatch(setCurrentPageFirm(1))
        dispatch(getFirms(value, currentPageFirm, rowsPerPage))
    }, [value])

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteFirm(id, value, currentPageFirm, rowsPerPage))
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageFirm(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageFirm(1))
    };

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Search firms"
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
                    <NavLink to={`/currentFirm/${0}/addNew`}>
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            className={classes.newButton}
                        />
                    </NavLink>
                </Toolbar>

                <Table className={classes.table}>
                    <ManufacturerFirmTableHead/>
                    <TableBody>
                        {
                            manufacturerFirms.map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox//checked={isItemSelected}//inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.country}</TableCell>
                                        <TableCell>{item.firm_name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>
                                            <Moment format="DD/MM/YYYY" add={{hours: 3}}>
                                                {item.year_open}
                                            </Moment>
                                        </TableCell>
                                        <TableCell>
                                            <NavLink to={`/currentFirm/${item.id}/see`}>
                                                <Controls.ActionButton color="primary">
                                                    <VisibilityIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </NavLink>
                                            <NavLink to={`/currentFirm/${item.id}/edit`}>
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
                    page={(currentPageFirm - 1) > Math.ceil(totalCount / rowsPerPage) ? currentPageFirm - 2 : currentPageFirm - 1}
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

export default ManufacturerFirmTable;
