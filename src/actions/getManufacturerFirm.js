import axios from "axios";
import {
    setAllFirms, setCurrentFirm, setCurrentPageFirm, setFirms, setIsFetchingFirm, setPotentialDataToDeleteByFirm
} from "../reducers/manufacturerFirmTableReducer";
import {SET_MESSAGE} from "./types";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getFirms = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1) {
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetchingFirm(true))
        const firms = await axios.get(API_URL + `getManufacturerFirm?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
        dispatch(setFirms(firms.data))
    }
}

export const getAllFirms = () => {
    return async (dispatch) => {
        const firms = await axios.get(API_URL + `getAllManufacturerFirm`, {headers: authHeader()});
        dispatch(setAllFirms(firms.data))
    }
}

export const deleteFirm = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingFirm(true))
    await axios.delete(API_URL + `deleteManufacturerFirm/${id}`, {headers: authHeader()})
    const firms = await axios.get(API_URL + `getManufacturerFirm?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
    if (currentPage > firms.data.totalPages && firms.data.totalPages !== 0) {
        dispatch(setCurrentPageFirm(firms.data.totalPages))
    } else if (firms.data.totalPages === 0) {
        dispatch(setCurrentPageFirm(1))
    }
    dispatch(setFirms(firms.data))
}

export const getCurrentFirm = (id) => {
    return (dispatch) => {
        dispatch(setIsFetchingFirm(true))
        return axios
            .get(API_URL + `getCurrentManufacturerFirm/${id}`, {headers: authHeader()})
            .then(result => {
                dispatch(setCurrentFirm(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateCurrentFirm = (country_of_manufacture_id, firm_name, email, address, year_open, id) => (dispatch) => {
    const updatedFirm = axios.put(API_URL + `updateManufacturerFirm/${id}`, {
        country_of_manufacture_id,
        firm_name,
        email,
        address,
        year_open
    }, {headers: authHeader()})
    return updatedFirm.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Firm updated successful!",
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

export const createNewFirm = (country_of_manufacture_id, firm_name, email, address, year_open) => (dispatch) => {
    const newFirm = axios.post(API_URL + `createManufacturerFirm`, {
        country_of_manufacture_id,
        firm_name,
        email,
        address,
        year_open
    }, {headers: authHeader()})
    return newFirm.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Firm created successful!",
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

export const getDeleteFirmInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `deleteManufacturerFirmInfo/${id}`, {headers: authHeader()});
    dispatch(setPotentialDataToDeleteByFirm(info.data))
}

export const deleteGroupOfFirms = (firmsId, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingFirm(true))
    await axios.delete(API_URL + `deleteGroupOfFirms`, {data: {firmsId: firmsId}, headers: authHeader()})
    const firms = await axios.get(API_URL + `getManufacturerFirm?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
    if (currentPage > firms.data.totalPages && firms.data.totalPages !== 0) {
        dispatch(setCurrentPageFirm(firms.data.totalPages))
    } else if (firms.data.totalPages === 0) {
        dispatch(setCurrentPageFirm(1))
    }
    dispatch(setFirms(firms.data))
}