import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/getUsers";
import User from "./user";


const UsersTable = () => {
    const {user: currentUser} = useSelector((state) => state.auth);

    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <div className="container">

            {currentUser ? (
                <div>
                    {users.map(user =>
                        <User user={user}/>)}
                </div>
            ) : (
                <div>
                    <h1>PLEASE LOG IN</h1>
                </div>
            )}
        </div>
    );
};

export default UsersTable;
