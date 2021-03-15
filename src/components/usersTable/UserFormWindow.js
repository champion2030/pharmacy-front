import {colors, Grid, makeStyles, TextField} from "@material-ui/core";
import Controls from "../controls/Controls";
import React, {useEffect, useState} from "react";

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

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [usernameDirty, setUsernameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [usernameError, setUsernameError] = useState('Username should not be empty')
    const [emailError, setEmailError] = useState('Email should not be empty')
    const [passwordError, setPasswordError] = useState('Password should not be empty')


    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if (e.target.value.length === 0) {
            setUsernameError('Username should not be empty')
        } else if (e.target.value.length < 4) {
            setUsernameError('Username should be 4 and more letters')
        } else {
            setUsernameError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e.target.value.length === 0) {
            setEmailError('Email should not be empty')
        } else if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Email is not correct')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length === 0) {
            setPasswordError('Password should not be empty')
        } else if (e.target.value.length < 5) {
            setPasswordError('Password should be more then 5 letters')
        } else {
            setPasswordError('')
        }
    }

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


    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername("")
        setEmail("")
        setPassword("")
        setUsernameError("")
        setEmailError("")
        setPasswordError("")

    };

    const handleReset = (e) => {
        e.preventDefault();
        setUsername("")
        setEmail("")
        setPassword("")
        setUsernameError("")
        setEmailError("")
        setPasswordError("")
    };

    function checkEmpty() {
        if (username.length === 0) {
            setUsernameDirty(true)
            setUsernameError("Username should not be empty")
            return false
        } else if (email.length === 0) {
            setEmailDirty(true)
            setEmailError("Email should not be empty")
            return false
        }
        else if (password.length === 0) {
            setPasswordDirty(true)
            setPasswordError("Password should not be empty")
            return false
        }
        return true
    }


    return (
        <form className={classes.root}>
            <Grid>
                <TextField
                    variant="outlined"
                    label="Username"
                    name="username"
                    onBlur={e => bluerHandler(e)}
                    value={username}
                    onChange={e => usernameHandler(e)}
                />
                {(usernameDirty && usernameError) && <div style={{color: 'red'}}>{usernameError}</div>}

                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    onBlur={e => bluerHandler(e)}
                    value={email}
                    onChange={e => emailHandler(e)}
                />
                {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}

                <TextField
                    variant="outlined"
                    label="Password"
                    name="password"
                    onBlur={e => bluerHandler(e)}
                    value={password}
                    onChange={e => passwordHandler(e)}
                />
                {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}

                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                        onClick={e => {
                            if (!checkEmpty()) {
                                e.preventDefault();
                            } else {
                                handleSubmit(e)
                                setActive(false)
                            }
                        }}
                    />
                    <Controls.Button
                        text="Reset"
                        type="reset"
                        color="default"
                        onClick={e => {
                            handleReset(e)
                            setActive(false)
                        }}
                    />
                </div>

            </Grid>
        </form>
    )

}

export default UserFormWindow;