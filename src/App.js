import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.module.css";
import styles from './App.module.css'
import {clearMessage} from "./actions/message";
import {history} from "./helpers/history";
import {createMuiTheme, CssBaseline, makeStyles, ThemeProvider} from '@material-ui/core';
import AppBarPharmacy from "./components/AppBarPharmacy/AppBarPharmacy";
import Content from "./components/Content/Content";

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

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

    const dispatch = useDispatch();
    const classes = useStyles();
    const [showScroll, setShowScroll] = useState(false)

    useEffect(() => {
        history.listen(() => {
            dispatch(clearMessage());
        });
    }, [dispatch]);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    window.addEventListener('scroll', checkScrollTop)
    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <CssBaseline/>
                <AppBarPharmacy/>
                <main>
                    <div className={classes.drawerHeader}/>
                    <div className={styles.top_scroll} onClick={scrollTop}
                         style={{height:2000, display:showScroll ? 'flex': 'none'}}
                    >
                        <p>Up ↑</p>
                    </div>
                    <Content/>
                </main>
                <CssBaseline/>
            </Router>
        </ThemeProvider>
    );
};

export default App;
