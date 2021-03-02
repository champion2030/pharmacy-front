import React from "react";



const User = (props) => {
    const user = props.user

    return (
        <div className="user">
            {user.id}
            {user.username}
            {user.email}
        </div>
    );
};

export default User;