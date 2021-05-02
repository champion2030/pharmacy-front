import axios from "axios";
import {setCurrentPage, setUsers} from "../reducers/usersTableReducer";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getUsers = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        const users = await axios.get(API_URL + `users?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
        dispatch(setUsers(users.data))
    }
}

export const deleteUser = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    await axios.delete(API_URL + `deleteUser/${id}`, {headers: authHeader()})
    const users = await axios.get(API_URL + `users?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
    if (currentPage > users.data.totalPages && users.data.totalPages !== 0) {
        dispatch(setCurrentPage(users.data.totalPages))
    } else if (users.data.totalPages === 0) {
        dispatch(setCurrentPage(1))
    }
    dispatch(setUsers(users.data))
}