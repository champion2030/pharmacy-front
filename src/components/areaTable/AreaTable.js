import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles, Paper, Table, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import UniversalModalWindow from "../ModalWindow/UniversalModalWindow";
import AreaTableHead from "./AreaTableHead";
import {deleteArea, getAreas, getDeleteAreaInfo} from "../../actions/getAreas";
import AreaFormWindow from "./AreaFormWindow";
import Notification from "../commonComponents/Notification";
import {NavLink} from "react-router-dom";
import ConfirmDeleteDialogArea from "./ConfirmDeleteDialogArea";

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

const AreaTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const areas = useSelector(state => state.areaReducer.areas)
    const [modalActive, setModalActive] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteArea(id))
        setNotify({
            isOpen: true,
            message: 'Удалено успешно',
            type: 'error'
        })
    }

    useEffect(() => {
        dispatch(getAreas())
    }, [dispatch, modalActive])

    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Button
                        text="Добавить новый"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        className={classes.newButton}
                        onClick={() => setModalActive(true)}
                    />
                </Toolbar>
                <Table className={classes.table}>
                    <AreaTableHead/>
                    <TableBody>
                        {
                            areas.map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name_of_area}</TableCell>

                                        <TableCell>
                                            <NavLink to={`/currentArea/${item.id}`}>
                                                <Controls.ActionButton color="primary">
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </NavLink>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    dispatch(getDeleteAreaInfo(item.id))
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
            </Paper>
            <UniversalModalWindow active={modalActive}>
                <AreaFormWindow active={modalActive} setActive={setModalActive}/>
            </UniversalModalWindow>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDeleteDialogArea
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
};

export default AreaTable;
