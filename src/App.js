import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/Register";
import Profile from "./components/Profile";
import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";
import {history} from "./helpers/history";
import UsersTable from "./components/usersTable/UsersTable";
import {CssBaseline, createMuiTheme, ThemeProvider} from '@material-ui/core';
import SignIn from "./components/Login";
import FormOfIssueTable from "./components/formOfIssueTable/FormOfIssueTable";


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

const App = () => {

    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

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
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            Pharmacy
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/users"} className="nav-link">
                                    UsersTable
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/formOfIssue"} className="nav-link">
                                    FormOfIssueTable
                                </Link>
                            </li>

                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link" onClick={logOut}>
                                        LogOut
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div>
                        <Switch>
                            <Route exact path={["/", "/users"]} component={UsersTable}/>
                            <Route exact path="/login" component={SignIn}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/users" component={UsersTable}/>
                            <Route exact path="/formOfIssue" component={FormOfIssueTable}/>
                        </Switch>
                        <CssBaseline/>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
