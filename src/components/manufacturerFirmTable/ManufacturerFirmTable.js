import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, IconButton, InputAdornment, lighten, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar, Tooltip, Typography} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPageFirm} from "../../reducers/manufacturerFirmTableReducer";
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import ManufacturerFirmTableHead from "./ManufacturerFirmTableHead";
import {deleteFirm, deleteGroupOfFirms, getDeleteFirmInfo, getFirms} from "../../actions/getManufacturerFirm";
import Notification from "../commonComponents/Notification";
import {NavLink} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Moment from 'react-moment';
import ConfirmDeleteDialogFirm from "./ConfirmDeleteDialogFirm";
import '../commonComponents/LoadingAnimation.css'
import clsx from "clsx";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import ConfirmDeleteDialogCommon from "../commonComponents/ConfirmDeleteDialogCommon";

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
    },
    root1: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.1),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    icons: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
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
    const [selected, setSelected] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [confirmDialogCommon, setConfirmDialogCommon] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const isFetchingFirm = useSelector(state => state.manufacturerFirmReducer.isFetchingFirm)

    useEffect(() => {
        dispatch(getFirms(value, currentPageFirm, rowsPerPage))
    }, [currentPageFirm, dispatch, rowsPerPage, value])

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            let newSelecteds = manufacturerFirms.map((n) => n.id)
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

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        if (selected.indexOf(id) !== -1) {
            let newSelected = selected
            newSelected.splice(selected.indexOf(id), 1)
            setSelected(newSelected)
        }
        dispatch(deleteFirm(id, value, currentPageFirm, rowsPerPage))
        setNotify({
            isOpen: true,
            message: 'Удалено успешно',
            type: 'error'
        })
    }

    const onDeleteGroupOfFirms = () => {
        setConfirmDialogCommon({
            ...confirmDialogCommon,
            isOpen: false
        })
        dispatch(deleteGroupOfFirms(selected, value, currentPageFirm, rowsPerPage))
        setSelected([])
        setNotify({
            isOpen: true,
            message: 'Удалено успешно',
            type: 'error'
        })
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleChangePage = (event, newPage) => {
        dispatch(setCurrentPageFirm(newPage + 1))
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        dispatch(setCurrentPageFirm(1))
    };

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

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar
                    className={clsx(classes.root1, {
                        [classes.highlight]: selected.length > 0,
                    })}
                >
                    {selected.length > 0 ? (
                        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                            {selected.length} selected
                        </Typography>
                    ) : (
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            Фирма производитель
                        </Typography>
                    )}

                    {selected.length > 0 ?
                        <div className={classes.icons}>
                            <Tooltip title="Cancel">
                                <IconButton
                                    aria-label="cancel"
                                    onClick={() => {setSelected([])}}
                                >
                                    <CancelIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                        setConfirmDialogCommon({
                                            isOpen: true,
                                            title: 'Вы уверены что хотите удалить эти записи?',
                                            subTitle: "Вы не сможете отменить это действие",
                                            onConfirm: () => {
                                                onDeleteGroupOfFirms()
                                            }
                                        })
                                    }}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        : (
                            <Tooltip title="Filter list">
                                <IconButton aria-label="filter list">
                                    <FilterListIcon/>
                                </IconButton>
                            </Tooltip>
                        )}
                </Toolbar>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Поиск фирмы"
                        className={classes.searchInput}
                        value={value}
                        onChange={(event) => {
                            dispatch(setCurrentPageFirm(1))
                            setValue(event.target.value)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <NavLink to={`/addNewFirm`}>
                        <Controls.Button
                            text="Добавить новую"
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            className={classes.newButton}
                        />
                    </NavLink>
                </Toolbar>
                {
                    isFetchingFirm === false
                        ?
                        <Table className={classes.table}>
                            <ManufacturerFirmTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={totalCount}
                            />
                            <TableBody>
                                {
                                    manufacturerFirms.map(item =>
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
                                                            dispatch(getDeleteFirmInfo(item.id))
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: 'Вы уверены что хотите удалить эту запись?',
                                                                subTitle: "Вы не сможете отменить это действие",
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
                        :
                        <div className="fetching">

                        </div>
                }
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50, 200]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={currentPageFirm - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDeleteDialogFirm
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <ConfirmDeleteDialogCommon
                confirmDialog={confirmDialogCommon}
                setConfirmDialog={setConfirmDialogCommon}
            />
        </div>
    )
};

export default ManufacturerFirmTable;
