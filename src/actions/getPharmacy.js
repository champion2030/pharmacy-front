import axios from "axios";
import {
    setPharmacies,
    setIsFetchingPharmacy,
    setAllPharmacies,
    setCurrentPagePharmacy,
    setPotentialDataToDeleteByPharmacy, setCurrentPharmacy
} from "../reducers/pharmacyTableReducer";
import {SET_MESSAGE} from "./types";
import {setCurrentMedicine, setIsFetchingMedicine} from "../reducers/medicineTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getPharmacies = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1) {
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetchingPharmacy(true))
        const pharmacies = await axios.get(API_URL + `getPharmacy?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setPharmacies(pharmacies.data))
    }
}

export const getAllPharmacies = () => {
    return async (dispatch) => {
        const pharmacies = await axios.get(API_URL + `getAllPharmacy`);
        dispatch(setAllPharmacies(pharmacies.data))
    }
}

export const deletePharmacy = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingPharmacy(true))
    await axios.delete(API_URL + `deletePharmacy/${id}`)
    const pharmacies = await axios.get(API_URL + `getPharmacy?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    if (currentPage > pharmacies.data.totalPages && pharmacies.data.totalPages !== 0){
        dispatch(setCurrentPagePharmacy(pharmacies.data.totalPages))
    }
    else if (pharmacies.data.totalPages === 0){
        dispatch(setCurrentPagePharmacy(1))
    }
    dispatch(setPharmacies(pharmacies.data))
}

export const getCurrentPharmacy = (id) => {
    return (dispatch) => {
        dispatch(setIsFetchingPharmacy(true))
        return axios
            .get(API_URL + `getCurrentPharmacy/${id}`)
            .then(result => {
                dispatch(setCurrentPharmacy(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateCurrentPharmacy = (name_id, area_id, type_of_property_id, telephone, address, id) => (dispatch) => {
    const updatedPharmacy = axios.put(API_URL + `updatePharmacy/${id}`, {
        name_id,
        area_id,
        type_of_property_id,
        telephone,
        address
    })
    return updatedPharmacy.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Pharmacy updated successful!",
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

export const createNewPharmacy = (name_id, area_id, type_of_property_id, telephone, address) => (dispatch) => {
    const newPharmacy = axios.post(API_URL + `createPharmacy`, {
        name_id,
        area_id,
        type_of_property_id,
        telephone,
        address
    })
    return newPharmacy.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Pharmacy created successful!",
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

export const getDeletePharmacyInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `deletePharmacyInfo/${id}`);
    dispatch(setPotentialDataToDeleteByPharmacy(info.data))
}
