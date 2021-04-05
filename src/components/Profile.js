import React from "react";
import {Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

const Profile = () => {
    const {user: currentUser} = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/login"/>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.data.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.data.accessToken.substring(0, 20)} ...{" "}
                {currentUser.data.accessToken.substr(currentUser.data.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.data.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.data.email}
            </p>
        </div>
    );
};

export default Profile;
