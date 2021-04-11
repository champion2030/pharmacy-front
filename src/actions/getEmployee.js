import axios from "axios";
import {setAllEmployees, setEmployees, setIsFetching} from "../reducers/employeeTableReducer";
import {SET_MESSAGE} from "./types";

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

export const getAllEmployees = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const employees = await axios.get(API_URL + `getAllEmployee`);
        dispatch(setAllEmployees(employees.data))
    }
}

export const deleteEmployee = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteEmployee/${id}`)
    const employees = await axios.get(API_URL + `getEmployee?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    dispatch(setEmployees(employees.data))
}

export const getCurrentEmployee = async (id, setName, setSurname, setPatronymic, setPharmacy) => {
    const employee = await axios.get(API_URL + `getCurrentEmployee/${id}`)
    setName(employee.data.name)
    setSurname(employee.data.surname)
    setPatronymic(employee.data.patronymic)
    setPharmacy(employee.data.pharmacy_id)
}

export const updateCurrentEmployee = (pharmacy_id, name, surname, patronymic, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedEmployee = axios.put(API_URL + `updateEmployee/${id}`, {
        pharmacy_id,
        name,
        surname,
        patronymic
    })
    return updatedEmployee.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Employee updated successful!",
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.error
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const createNewEmployee = (pharmacy_id, name, surname, patronymic) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newEmployee = axios.post(API_URL + `createEmployee`, {
        pharmacy_id,
        name,
        surname,
        patronymic
    })
    return newEmployee.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Employee created successful!",
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.error
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};
