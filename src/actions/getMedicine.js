import axios from "axios";
import {setAllMedicine, setIsFetching, setMedicine} from "../reducers/medicineTableReducer";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getMedicines = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const medicines = await axios.get(API_URL + `getMedicine?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setMedicine(medicines.data))
    }
}

export const getAllMedicines = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const medicines = await axios.get(API_URL + `getAllMedicine`);
        dispatch(setAllMedicine(medicines.data))
    }
}

export const deleteMedicine = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteMedicine/${id}`)
    const medicines = await axios.get(API_URL + `getMedicine?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    dispatch(setMedicine(medicines.data))
}

export const getCurrentMedicine = async (id, setMedicineName, setFormOfIssue, setPharmacologicalGroup, setManufacturerFirm, setBarcode, setInstruction) => {
    const medicine = await axios.get(API_URL + `getCurrentMedicine/${id}`)
    setMedicineName(medicine.data.medicine_name)
    setFormOfIssue(medicine.data.form_of_issue_id)
    setPharmacologicalGroup(medicine.data.pharmacological_group_id)
    setManufacturerFirm(medicine.data.manufacture_firm_id)
    setBarcode(medicine.data.barcode)
    setInstruction(medicine.data.instruction)
}

export const updateCurrentMedicine = (form_of_issue_id, pharmacological_group_id, manufacture_firm_id, medicine_name, instruction, barcode, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedMedicine = axios.put(API_URL + `updateMedicine/${id}`, {
        form_of_issue_id,
        pharmacological_group_id,
        manufacture_firm_id,
        medicine_name,
        instruction,
        barcode
    })
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
    dispatch(setIsFetching(true))
    const newMedicine = axios.post(API_URL + `createMedicine`, {
        form_of_issue_id,
        pharmacological_group_id,
        manufacture_firm_id,
        medicine_name,
        instruction,
        barcode
    })
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
};