import axios from "axios";
import {setCurrentPage, setUsers} from "../reducers/usersTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getUsers = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        const users = await axios.get(API_URL + `users?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setUsers(users.data))
    }
}

export const deleteUser = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    await axios.delete(API_URL + `deleteUser/${id}`)
    const users = await axios.get(API_URL + `users?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    if (currentPage > users.data.totalPages && users.data.totalPages !== 0) {
        dispatch(setCurrentPage(users.data.totalPages))
    } else if (users.data.totalPages === 0) {
        dispatch(setCurrentPage(1))
    }
    dispatch(setUsers(users.data))
}