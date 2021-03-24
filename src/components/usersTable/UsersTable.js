import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, getUsers} from "../../actions/getUsers";
import {
    InputAdornment,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Toolbar
} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import UsersTableHead from "./UsersTableHead";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPage} from "../../reducers/usersTable";
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import UserFormWindow from "./UserFormWindow";
import ConfirmDialog from "../ConfirmDialog";
import UniversalModalWindow from "../ModalWindow/UniversalModalWindow";


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

const UsersTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)
    let currentPage = useSelector(state => state.userReducer.currentPage)
    let totalCount = useSelector(state => state.userReducer.totalCount)
    let allUsers = useSelector(state => state.userReducer.allUsers)
    const [value, setValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalActive, setModalActive] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})


    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPage(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPage(1))
    };

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    useEffect(() => {
        dispatch(getUsers(currentPage, rowsPerPage))
    }, [currentPage, dispatch, rowsPerPage, modalActive])


    useEffect(() => {
        dispatch(getAllUsers())
    }, [modalActive])


    const filteredUsers = allUsers.filter(user => {
        return user.username.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Search Employees"
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
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        className={classes.newButton}
                        onClick={() => setModalActive(true)}
                    />
                </Toolbar>

                <Table className={classes.table}>
                    <UsersTableHead/>
                    <TableBody>
                        {
                            !value
                                ?
                                users.map(item =>
                                    (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.username}</TableCell>
                                            <TableCell>{item.email}</TableCell>

                                            <TableCell>
                                                <Controls.ActionButton
                                                    color="primary"
                                                    // onClick={() => {
                                                    //     openInPopup(item)
                                                    // }}
                                                >
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                                <Controls.ActionButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Are you sure to delete this record?',
                                                            subTitle: "You can't undo this operation",
                                                            onConfirm: () => {
                                                                onDelete(item.id)
                                                                alert(1)
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <CloseIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) :
                                filteredUsers.map(item =>
                                    (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.username}</TableCell>
                                            <TableCell>{item.email}</TableCell>

                                            <TableCell>
                                                <Controls.ActionButton
                                                    color="primary"
                                                    // onClick={() => {
                                                    //     openInPopup(item)
                                                    // }}
                                                >
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Controls.ActionButton>
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
                {
                    !value ?
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 50]}
                            component="div"
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={currentPage - 1}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> :
                        null
                }
            </Paper>
            <UniversalModalWindow active={modalActive}>
                <UserFormWindow active={modalActive} setActive={setModalActive}/>
            </UniversalModalWindow>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
};

export default UsersTable;
