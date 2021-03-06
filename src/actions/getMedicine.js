import axios from "axios";
import {
    setAllMedicine, setCurrentMedicine,
    setCurrentPageMedicine,
    setIsFetchingMedicine,
    setMedicine,
    setPotentialDataToDeleteByMedicine
} from "../reducers/medicineTableReducer";
import {SET_MESSAGE} from "./types";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getMedicines = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1) {
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetchingMedicine(true))
        const medicines = await axios.get(API_URL + `getMedicine?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
        dispatch(setMedicine(medicines.data))
    }
}

export const getAllMedicines = () => {
    return async (dispatch) => {
        const medicines = await axios.get(API_URL + `getAllMedicine`, {headers: authHeader()});
        dispatch(setAllMedicine(medicines.data))
    }
}

export const deleteMedicine = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingMedicine(true))
    await axios.delete(API_URL + `deleteMedicine/${id}`, {headers: authHeader()})
    const medicines = await axios.get(API_URL + `getMedicine?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
    if (currentPage > medicines.data.totalPages && medicines.data.totalPages !== 0) {
        dispatch(setCurrentPageMedicine(medicines.data.totalPages))
    } else if (medicines.data.totalPages === 0) {
        dispatch(setCurrentPageMedicine(1))
    }
    dispatch(setMedicine(medicines.data))
}

export const getCurrentMedicine = (id) => {
    return (dispatch) => {
        dispatch(setIsFetchingMedicine(true))
        return axios
            .get(API_URL + `getCurrentMedicine/${id}`, {headers: authHeader()})
            .then(result => {
                dispatch(setCurrentMedicine(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateCurrentMedicine = (form_of_issue_id, pharmacological_group_id, manufacture_firm_id, medicine_name, instruction, barcode, id) => (dispatch) => {
    const updatedMedicine = axios.put(API_URL + `updateMedicine/${id}`, {
        form_of_issue_id,
        pharmacological_group_id,
        manufacture_firm_id,
        medicine_name,
        instruction,
        barcode
    }, {headers: authHeader()})
    return updatedMedicine.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Medicine updated successful!",
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

export const createNewMedicine = (form_of_issue_id, pharmacological_group_id, manufacture_firm_id, medicine_name, instruction, barcode) => (dispatch) => {
    const newMedicine = axios.post(API_URL + `createMedicine`, {
        form_of_issue_id,
        pharmacological_group_id,
        manufacture_firm_id,
        medicine_name,
        instruction,
        barcode
    }, {headers: authHeader()})
    return newMedicine.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Medicine created successful!",
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

export const getDeleteMedicineInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `deleteMedicineInfo/${id}`, {headers: authHeader()});
    dispatch(setPotentialDataToDeleteByMedicine(info.data))
}

export const deleteGroupOfMedicine = (medicineId, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingMedicine(true))
    await axios.delete(API_URL + `deleteGroupOfMedicine`, {data: {medicineId: medicineId}, headers: authHeader()})
    const medicines = await axios.get(API_URL + `getMedicine?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
    if (currentPage > medicines.data.totalPages && medicines.data.totalPages !== 0) {
        dispatch(setCurrentPageMedicine(medicines.data.totalPages))
    } else if (medicines.data.totalPages === 0) {
        dispatch(setCurrentPageMedicine(1))
    }
    dispatch(setMedicine(medicines.data))
}