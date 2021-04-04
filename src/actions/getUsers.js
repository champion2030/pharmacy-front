import axios from "axios";
import {setIsFetching, setUsers} from "../reducers/usersTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getUsers = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const users = await axios.get(API_URL + `users?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setUsers(users.data))
    }
};