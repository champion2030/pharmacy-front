import {Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../actions/auth";
import {clearMessage} from "../../actions/message";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

const UserFormWindow = ({active, setActive}) => {
    const classes = useStyles()

    const dispatch = useDispatch();
    const {message} = useSelector(state => state.message);


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [usernameDirty, setUsernameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [usernameError, setUsernameError] = useState('Username can not be empty')
    const [emailError, setEmailError] = useState('Email can not be empty')
    const [passwordError, setPasswordError] = useState('Password can not be empty')

    const [formValid, setFormValid] = useState(false)

    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (emailError || usernameError || passwordError){
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, usernameError])

    useEffect(() => {
        dispatch(clearMessage());
        setFormValid(false)
    }, [active]);

    const bluerHandler = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsernameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }


    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if (e.target.value.length === 0) {
            setUsernameError('This field is required!')
        } else if (e.target.value.length < 4 || e.target.value.length > 20) {
            setUsernameError('The username must be between 3 and 20 characters!')
        } else {
            setUsernameError("")
        }

    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value.length === 0) {
            setEmailError('This field is required!')
        } else if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('This is not a valid email.')
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length === 0) {
            setPasswordError('This field is required!')
        } else if (e.target.value.length < 5 || e.target.value.length > 40) {
            setPasswordError('The password must be between 6 and 40 characters!')
        } else {
            setPasswordError("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(register(username, email, password))
            .then(() => {
                setSuccessful(true);
                setUsername("")
                setEmail("")
                setPassword("")
                setUsernameError("")
                setEmailError("")
                setPasswordError("")
                setFormValid(false)
                setActive(false)
            })
            .catch(() => {
                setSuccessful(false);
            });


    };

    const handleReset = (e) => {
        e.preventDefault();
        setUsername("")
        setEmail("")
        setPassword("")
        setUsernameError("")
        setEmailError("")
        setPasswordError("")
        setActive(false)
    };

    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Username"
                    name="username"
                    value={username}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => usernameHandler(e)}
                />
                {(usernameError && usernameDirty) && <div style={{color: 'red'}}>{usernameError}</div>}

                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={email}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => emailHandler(e)}

                />
                {(emailError && emailDirty) && <div style={{color: 'red'}}>{emailError}</div>}

                <TextField
                    variant="outlined"
                    label="Password"
                    name="password"
                    value={password}
                    onBlur={event => bluerHandler(event)}
                    onChange={e => passwordHandler(e)}
                />
                {(passwordError && passwordDirty) && <div style={{color: 'red'}}>{passwordError}</div>}

                { !successful && message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}


                <div>
                    <Controls.Button
                        text="Submit"
                        disabled={!formValid}
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={handleReset}
                    />
                </div>

            </Grid>
        </form>
    )

}

export default UserFormWindow;