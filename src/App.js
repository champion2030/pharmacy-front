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
import {
    CssBaseline,
    createMuiTheme,
    ThemeProvider,
    AppBar,
    Typography,
    IconButton,
    Toolbar,
    makeStyles, Drawer, Divider, List, ListItem, ListItemText, Breadcrumbs, Badge
} from '@material-ui/core';
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
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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
                            Pharmacy
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
                                <ListItemText primary={"Profile"}/>
                            </ListItem>
                        )}
                        <ListItem button component={Link} to="/users">
                            <ListItemText primary={"Users"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/formOfIssue">
                            <ListItemText primary={"Form of issue"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/pharmacologicalGroup">
                            <ListItemText primary={"Pharmacological group"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/area">
                            <ListItemText primary={"Area"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/reasonForReturn">
                            <ListItemText primary={"Reason for return"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/pharmacyName">
                            <ListItemText primary={"Pharmacy name"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/typeOfProperty">
                            <ListItemText primary={"Type of property"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/countryOfManufacture">
                            <ListItemText primary={"Country of manufacture"}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button component={Link} to="/manufacturerFirms">
                            <ListItemText primary={"Manufacturer firms"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/medicines">
                            <ListItemText primary={"Medicine"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/pharmacy">
                            <ListItemText primary={"Pharmacy"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/employee">
                            <ListItemText primary={"Employee"}/>
                        </ListItem>
                        <ListItem button component={Link} to="/deliveries">
                            <ListItemText primary={"Deliveries"}/>
                        </ListItem>
                    </List>
                </Drawer>

                <main>
                    <div className={classes.drawerHeader}/>
                    <Switch>
                        <Route exact path={["/", "/users"]} component={UsersTable}/>
                        <Route exact path="/login" component={SignIn}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/users" component={UsersTable}/>
                        <Route exact path="/formOfIssue" component={FormOfIssueTable}/>
                        <Route exact path="/pharmacologicalGroup" component={PharmacologicalGroupTable}/>
                        <Route exact path="/countryOfManufacture" component={CountryOfManufactureTable}/>
                        <Route exact path="/typeOfProperty" component={TypeOfPropertyTable}/>
                        <Route exact path="/pharmacyName" component={PharmacyNameTable}/>
                        <Route exact path="/area" component={AreaTable}/>
                        <Route exact path="/reasonForReturn" component={ReasonForReturnTable}/>
                        <Route exact path="/manufacturerFirms" component={ManufacturerFirmTable}/>
                        <Route exact path="/medicines" component={MedicineTable}/>
                        <Route exact path="/pharmacy" component={PharmacyTable}/>
                        <Route exact path="/employee" component={EmployeeTable}/>
                        <Route exact path="/deliveries" component={DeliveriesTable}/>
                        <Route exact path="/currentArea/:id" component={AreaUpdate}/>
                        <Route exact path="/currentCountry/:id" component={CountryOfManufactureUpdate}/>
                        <Route exact path="/currentFormOfIssue/:id" component={FormOfIssueUpdate}/>
                        <Route exact path="/currentPharmacologicalGroup/:id" component={PharmacologicalGroupUpdate}/>
                        <Route exact path="/currentPharmacyName/:id" component={PharmacyNameUpdate}/>
                        <Route exact path="/currentReasonForReturn/:id" component={ReasonForReturnUpdate}/>
                        <Route exact path="/currentTypeOfProperty/:id" component={TypeOfPropertyUpdate}/>
                        <Redirect to="/"/>
                    </Switch>
                </main>
                <CssBaseline/>
            </Router>
        </ThemeProvider>
    );
};

export default App;
