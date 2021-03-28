import axios from "axios";
import {setAllUsers, setIsFetching, setUsers} from "../reducers/usersTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getUsers = (currentPage, perPage) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const users = await axios.get(API_URL + `users?page=${currentPage}&limit=${perPage}`);
        dispatch(setUsers(users.data))
    }
};

export const getAllUsers = () => {
    return async (dispatch) => {
        const users = await axios.get(API_URL + `allUsers`);
        dispatch(setAllUsers(users.data))
    }
};
