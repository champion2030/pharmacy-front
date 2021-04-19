import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import React from "react";
import {Route} from "react-router";

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const {user: currentUser} = useSelector((state) => state.auth);

    return (
        <Route {...rest} render={
            props => {
                if (currentUser) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to="/unauthorized"/>
                }
            }
        } />
    )
}

export default ProtectedRoute;