import axios from "axios";
import {setAllFirms, setCurrentPageFirm, setFirms, setIsFetching} from "../reducers/manufacturerFirmTableReducer";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getFirms = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1) {
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const firms = await axios.get(API_URL + `getManufacturerFirm?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setFirms(firms.data))
    }
}

export const getAllFirms = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const firms = await axios.get(API_URL + `getAllManufacturerFirm`);
        dispatch(setAllFirms(firms.data))
    }
}

export const deleteFirm = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteManufacturerFirm/${id}`)
    const firms = await axios.get(API_URL + `getManufacturerFirm?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    if (currentPage > firms.data.totalPages && firms.data.totalPages !== 0){
        dispatch(setCurrentPageFirm(firms.data.totalPages))
    }
    else if (firms.data.totalPages === 0){
        dispatch(setCurrentPageFirm(1))
    }
    dispatch(setFirms(firms.data))
}

export const getCurrentFirm = async (id, setCountryOfManufactureId, setCountryOfManufacture, setFirm, setEmail, setAddress, setSelectedDate) => {
    const firm = await axios.get(API_URL + `getCurrentManufacturerFirm/${id}`)
    setCountryOfManufactureId(firm.data.country_of_manufacture_id)
    setCountryOfManufacture(firm.data.country)
    setFirm(firm.data.firm_name)
    setEmail(firm.data.email)
    setAddress(firm.data.address)
    setSelectedDate(firm.data.year_open)
}

export const updateCurrentFirm = (country_of_manufacture_id, firm_name, email, address, year_open, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedFirm = axios.put(API_URL + `updateManufacturerFirm/${id}`, {
        country_of_manufacture_id,
        firm_name,
        email,
        address,
        year_open
    })
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
    dispatch(setIsFetching(true))
    const newFirm = axios.post(API_URL + `createManufacturerFirm`, {
        country_of_manufacture_id,
        firm_name,
        email,
        address,
        year_open
    })
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
};
