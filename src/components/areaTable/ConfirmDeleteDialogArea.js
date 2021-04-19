import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton } from '@material-ui/core'
import Controls from "../controls/Controls";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function ConfirmDeleteDialogArea(props) {
    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()

    const potentialDataToDeleteByArea = useSelector((state) => state.areaReducer.potentialDataToDeleteByArea)

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
                <Typography variant="subtitle2">
                    При удалении данного района из данных таблиц удалится: <br/>
                    Из таблицы Аптека: {potentialDataToDeleteByArea.pharmacy} записей <br/>
                    Из таблицы Сотрудники: {potentialDataToDeleteByArea.employee} записей <br/>
                    Из таблицы Поставки: {potentialDataToDeleteByArea.deliveries} записей<br/>
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="Нет"
                    color="default"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
                <Controls.Button
                    text="Да"
                    color="secondary"
                    onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}
