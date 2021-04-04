import axios from "axios";
import {setEmployees, setIsFetching} from "../reducers/employeeTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getEmployees = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const employees = await axios.get(API_URL + `getEmployee?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setEmployees(employees.data))
    }
}

export const deleteEmployee = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteEmployee/${id}`)
}
