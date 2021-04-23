import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Toolbar} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import TablePagination from "@material-ui/core/TablePagination";
import {setCurrentPageMedicine} from "../../reducers/medicineTableReducer";
import {Search} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Notification from "../commonComponents/Notification";
import MedicineTableHead from "./MedicineTableHead";
import {deleteMedicine, getDeleteMedicineInfo, getMedicines} from "../../actions/getMedicine";
import {NavLink} from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommonTableToolbar from "../commonComponents/CommonToolBar";
import ConfirmDeleteDialogMedicine from "./ConfirmDeleteDialogMedicine";
import '../commonComponents/LoadingAnimation.css'

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
    const [selected, setSelected] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const isFetchingMedicine = useSelector(state => state.medicineReducer.isFetchingMedicine)

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
        dispatch(deleteMedicine(id, value, currentPageMedicine, rowsPerPage))
        setNotify({
            isOpen: true,
            message: 'Удалено успешно',
            type: 'error'
        })
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            let newSelecteds = medicines.map((n) => n.id)
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
                <CommonTableToolbar numSelected={selected.length} tableName={'Лекарства'}/>
                <Toolbar>
                    <TextField
                        variant="outlined"
                        label="Искать лекарства"
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
                    <NavLink to={`/addNewMedicine`}>
                        <Controls.Button
                            text="Добавить новое"
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            className={classes.newButton}
                        />
                    </NavLink>
                </Toolbar>
                {
                    isFetchingMedicine === false
                        ?
                        <Table className={classes.table}>
                            <MedicineTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={totalCount}
                            />
                            <TableBody>
                                {
                                    medicines.map(item =>
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
                                                            dispatch(getDeleteMedicineInfo(item.id))
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
                    page={currentPageMedicine - 1}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDeleteDialogMedicine
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
};

export default MedicineTable;
