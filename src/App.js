import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/Register";
import Profile from "./components/Profile";
import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";
import {history} from "./helpers/history";
import UsersTable from "./components/usersTable/UsersTable";
import {CssBaseline, createMuiTheme, ThemeProvider, AppBar, Typography, IconButton, Toolbar, makeStyles, Drawer, Divider, List, ListItem, ListItemText, Badge} from '@material-ui/core';
import SignIn from "./components/Login";
import FormOfIssueTable from "./components/formOfIssueTable/FormOfIssueTable";
import PharmacologicalGroupTable from "./components/pharmacologicalGroupTable/PharmacologicalGroupTable";
import CountryOfManufactureTable from "./components/countryOfManufactureTable/CountryOfManufactureTable";
import TypeOfPropertyTable from "./components/typeOfPropertyTable/TypeOfPropertyTable";
import PharmacyNameTable from "./components/pharmacyName/PharmacyNameTable";
import AreaTable from "./components/areaTable/AreaTable";
import ReasonForReturnTable from "./components/reasonForReturnTable/ReasonForReturnTable";
import AreaUpdate from "./components/areaTable/AreaUpdate";
import CountryOfManufactureUpdate from "./components/countryOfManufactureTable/CountryOfManufactureUpdate";
import FormOfIssueUpdate from "./components/formOfIssueTable/FormOfIssueUpdate";
import PharmacologicalGroupUpdate from "./components/pharmacologicalGroupTable/PharmacologicalGroupUpdate";
import PharmacyNameUpdate from "./components/pharmacyName/PharmacyNameUpdate";
import ReasonForReturnUpdate from "./components/reasonForReturnTable/ReasonForReturnUpdate";
import TypeOfPropertyUpdate from "./components/typeOfPropertyTable/TypeOfPropertyUpdate";
import ManufacturerFirmTable from "./components/manufacturerFirmTable/ManufacturerFirmTable";
import MedicineTable from "./components/medicineTable/MedicineTable";
import PharmacyTable from "./components/pharmacyTable/PharmacyTable";
import EmployeeTable from "./components/employeeTable/EmployeeTable";
import DeliveriesTable from "./components/deliveriesTable/DeliveriesTable";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from "clsx";
import {AccountCircle} from "@material-ui/icons";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ManufactureFirmAddOrEdit from "./components/manufacturerFirmTable/ManufactureFirmAddOrEdit";
import MedicineAddOrEdit from "./components/medicineTable/MedicineAddOrEdit";
import PharmacyAddOrEdit from "./components/pharmacyTable/PharmacyAddOrEdit";
import EmployeeAddOrEdit from "./components/employeeTable/EmployeeAddOrEdit";
import DeliveriesAddOrEdit from "./components/deliveriesTable/DeliveriesAddOrEdit";
import FirstRequestTable from "./components/requestsTables/firstRequest/FirstRequestTable";
import SecondRequestTable from "./components/requestsTables/secondRequest/SecondRequestTable";
import ThirdRequestTable from "./components/requestsTables/thirdRequest/ThirdRequestTable";

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

const drawerWidth = 240;

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


const App = () => {

    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        });
    }, [dispatch]);

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <CssBaseline/>
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
                    }}>
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
                    </List>
                </Drawer>

                <main>
                    <div className={classes.drawerHeader}/>
                    <Switch>
                        <Route exact path={["/", "/users"]} component={UsersTable}/>
                        <Route path="/login" component={SignIn}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/users" component={UsersTable}/>
                        <Route path="/formOfIssue" component={FormOfIssueTable}/>
                        <Route path="/pharmacologicalGroup" component={PharmacologicalGroupTable}/>
                        <Route path="/countryOfManufacture" component={CountryOfManufactureTable}/>
                        <Route path="/typeOfProperty" component={TypeOfPropertyTable}/>
                        <Route path="/pharmacyName" component={PharmacyNameTable}/>
                        <Route path="/area" component={AreaTable}/>
                        <Route path="/reasonForReturn" component={ReasonForReturnTable}/>
                        <Route path="/manufacturerFirms" component={ManufacturerFirmTable}/>
                        <Route path="/medicines" component={MedicineTable}/>
                        <Route path="/pharmacy" component={PharmacyTable}/>
                        <Route path="/employee" component={EmployeeTable}/>
                        <Route path="/deliveries" component={DeliveriesTable}/>
                        <Route path="/currentArea/:id" component={AreaUpdate}/>
                        <Route path="/currentCountry/:id" component={CountryOfManufactureUpdate}/>
                        <Route path="/currentFormOfIssue/:id" component={FormOfIssueUpdate}/>
                        <Route path="/currentPharmacologicalGroup/:id" component={PharmacologicalGroupUpdate}/>
                        <Route path="/currentPharmacyName/:id" component={PharmacyNameUpdate}/>
                        <Route path="/currentReasonForReturn/:id" component={ReasonForReturnUpdate}/>
                        <Route path="/currentTypeOfProperty/:id" component={TypeOfPropertyUpdate}/>
                        <Route path="/currentFirm/:id/:action" component={ManufactureFirmAddOrEdit}/>
                        <Route path="/currentMedicine/:id/:action" component={MedicineAddOrEdit}/>
                        <Route path="/currentPharmacy/:id/:action" component={PharmacyAddOrEdit}/>
                        <Route path="/currentEmployee/:id/:action" component={EmployeeAddOrEdit}/>
                        <Route path="/currentDeliver/:id/:action" component={DeliveriesAddOrEdit}/>
                        <Route path="/firstRequest" component={FirstRequestTable}/>
                        <Route path="/secondRequest" component={SecondRequestTable}/>
                        <Route path="/thirdRequest" component={ThirdRequestTable}/>
                        <Redirect to="/"/>
                    </Switch>
                </main>
                <CssBaseline/>
            </Router>
        </ThemeProvider>
    );
};

export default App;
