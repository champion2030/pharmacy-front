import {IconButton, lighten, makeStyles, Toolbar, Tooltip, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from "clsx";
import CancelIcon from '@material-ui/icons/Cancel';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
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
}));

const CommonTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {numSelected, tableName} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {tableName}
                </Typography>
            )}

            {numSelected > 0 ?
                <div className={classes.icons}>
                    <Tooltip title="Cancel">
                        <IconButton
                            aria-label="cancel"
                            onClick={() => console.log(1)}
                        >
                            <CancelIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
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
    );
}

export default CommonTableToolbar;