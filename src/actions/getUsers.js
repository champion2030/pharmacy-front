import axios from "axios";
import {setUsers} from "../reducers/usersTable";

const API_URL = "http://localhost:8080/api/";

export const getUsers = () => {
    return async (dispatch) => {
        const users = await axios.get(API_URL + "users");
        dispatch(setUsers(users.data))
    }
};
