import axios from "axios";
import {
    setAllEmployees, setCurrentEmployee,
    setCurrentPageEmployee, setEmployeeForCurrentPharmacy,
    setEmployees,
    setIsFetchingEmployee,
    setPotentialDataToDeleteByEmployee
} from "../reducers/employeeTableReducer";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getEmployees = (searchQuery, currentPage, perPage) => {
    if (searchQuery === ""){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetchingEmployee(true))
        const employees = await axios.get(API_URL + `getEmployee?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setEmployees(employees.data))
    }
}

export const getAllEmployees = () => {
    return async (dispatch) => {
        const employees = await axios.get(API_URL + `getAllEmployee`);
        dispatch(setAllEmployees(employees.data))
    }
}

export const getEmployeesForCurrentPharmacy = (id) => {
    return async (dispatch) => {
        const employees = await axios.get(API_URL + `getEmployeeForCurrentPharmacy/${id}`);
        dispatch(setEmployeeForCurrentPharmacy(employees.data))
    }
}

export const deleteEmployee = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingEmployee(true))
    await axios.delete(API_URL + `deleteEmployee/${id}`)
    const employees = await axios.get(API_URL + `getEmployee?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    if (currentPage > employees.data.totalPages && employees.data.totalPages !== 0){
        dispatch(setCurrentPageEmployee(employees.data.totalPages))
    }
    else if (employees.data.totalPages === 0){
        dispatch(setCurrentPageEmployee(1))
    }
    dispatch(setEmployees(employees.data))
}

export const getCurrentEmployee = (id) => {
    return (dispatch) => {
        dispatch(setIsFetchingEmployee(true))
        return axios
            .get(API_URL + `getCurrentEmployee/${id}`)
            .then(result => {
                dispatch(setCurrentEmployee(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateCurrentEmployee = (pharmacy_id, name, surname, patronymic, id) => (dispatch) => {
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
}

export const getDeleteEmployeeInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `deleteEmployeeInfo/${id}`);
    dispatch(setPotentialDataToDeleteByEmployee(info.data))
}

export const deleteGroupOfEmployee = (employeeId, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingEmployee(true))
    await axios.delete(API_URL + `deleteGroupOfEmployee`, {data: {employeeId: employeeId}})
    const employees = await axios.get(API_URL + `getEmployee?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    if (currentPage > employees.data.totalPages && employees.data.totalPages !== 0){
        dispatch(setCurrentPageEmployee(employees.data.totalPages))
    }
    else if (employees.data.totalPages === 0){
        dispatch(setCurrentPageEmployee(1))
    }
    dispatch(setEmployees(employees.data))
}
