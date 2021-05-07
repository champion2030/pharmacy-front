import {AppBar, Badge, createMuiTheme, Divider, Drawer, IconButton, List, ListItem, ListItemText, makeStyles, ThemeProvider, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import {AccountCircle} from "@material-ui/icons";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import React, {useState} from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/auth";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#333996",
            light: '#3c44b126'
        },
        secondary: {
            main: "#f83245",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
})

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        minHeight: 0,
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    toolbar: {
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        marginTop: 9
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

const AppBarPharmacy = () => {

    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const logOut = () => {
        dispatch(logout());
    }

    return (
        <ThemeProvider theme={theme}>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Аптеки
                        </Typography>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            {currentUser ? (
                                <div>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        color="secondary"
                                        component={Link}
                                        to={"/profile"}
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={logOut}
                                        component={Link}
                                        to={"/login"}>
                                        <Badge color="secondary">
                                            <ExitToAppTwoToneIcon/>
                                        </Badge>
                                    </IconButton>
                                </div>
                            ) : (
                                <div>
                                    <IconButton
                                        color="secondary"
                                        component={Link}
                                        to={"/login"}>
                                        <Badge color="secondary">
                                            <VpnKeyIcon/>
                                        </Badge>
                                    </IconButton>

                                    <IconButton
                                        color="secondary"
                                        component={Link}
                                        to={"/register"}>
                                        <Badge color="secondary">
                                            <HowToRegIcon/>
                                        </Badge>
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onClick={handleDrawerClose}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {currentUser && (
                        <ListItem button component={Link} to="/profile">
                            <ListItemText primary={"Профиль"}/>
                        </ListItem>
                    )}
                    <Divider/>
                    <ListItem button component={Link} to="/users">
                        <ListItemText primary={"Пользователи"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/formOfIssue">
                        <ListItemText primary={"Формы выпуска"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/pharmacologicalGroup">
                        <ListItemText primary={"Фармакологические группы"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/area">
                        <ListItemText primary={"Районы"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/reasonForReturn">
                        <ListItemText primary={"Причины возврата"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/pharmacyName">
                        <ListItemText primary={"Названия аптек"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/typeOfProperty">
                        <ListItemText primary={"Типы собственности"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/countryOfManufacture">
                        <ListItemText primary={"Страны производители"}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button component={Link} to="/manufacturerFirms">
                        <ListItemText primary={"Фирмы производители"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/medicines">
                        <ListItemText primary={"Лекарства"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/pharmacy">
                        <ListItemText primary={"Аптеки"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/employee">
                        <ListItemText primary={"Сотрудники"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/deliveries">
                        <ListItemText primary={"Поставки"}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button component={Link} to="/firstRequest">
                        <ListItemText primary={"Первый запрос"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/secondRequest">
                        <ListItemText primary={"Второй запрос"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/thirdRequest">
                        <ListItemText primary={"Трейтий запрос"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/dateRequests">
                        <ListItemText primary={"Запросы на дату"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/queryWithDataCondition">
                        <ListItemText primary={"Итоговый запрос с уловием на данные"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/queryWithConditionForGroups">
                        <ListItemText primary={"Итоговый запрос с уловием на группы"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/finalQueryWithConditionForGroupsAndData">
                        <ListItemText primary={"Итоговый запрос с уловием на группы и данные"}/>
                    </ListItem>
                    <ListItem button component={Link} to="/finalQueryWithoutCondition">
                        <ListItemText primary={"Итоговый запрос без условия"}/>
                    </ListItem>
                </List>
            </Drawer>
        </ThemeProvider>
    )
}
export default AppBarPharmacy;
