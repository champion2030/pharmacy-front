import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Toolbar
} from "@material-ui/core";
import Controls from "../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import ConfirmDialog from "../commonComponents/ConfirmDialog";
import UniversalModalWindow from "../ModalWindow/UniversalModalWindow";
import ReasonForReturnTableHead from "./ReasonForReturnTableHead";
import {deleteReasonForReturn, getReasons} from "../../actions/getReasonsForReturn";
import ReasonForReturnFormWindow from "./ReasonForReturnFormWindow";
import Notification from "../commonComponents/Notification";
import {NavLink} from "react-router-dom";


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

const ReasonForReturnTable = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const reasons = useSelector(state => state.reasonForReturnReducer.reasons)
    const [modalActive, setModalActive] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteReasonForReturn(id))
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    useEffect(() => {
        dispatch(getReasons())
    }, [dispatch, modalActive, reasons])


    return (
        <div>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        className={classes.newButton}
                        onClick={() => setModalActive(true)}
                    />
                </Toolbar>

                <Table className={classes.table}>
                    <ReasonForReturnTableHead/>
                    <TableBody>
                        {
                            reasons.map(item =>
                                (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.reason_for_return}</TableCell>

                                        <TableCell>
                                            <NavLink to={`/currentReasonForReturn/${item.id}`}>
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
            </Paper>
            <UniversalModalWindow active={modalActive}>
                <ReasonForReturnFormWindow active={modalActive} setActive={setModalActive}/>
            </UniversalModalWindow>
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

export default ReasonForReturnTable;
