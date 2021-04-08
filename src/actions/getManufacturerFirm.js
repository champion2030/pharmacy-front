import axios from "axios";
import {setFirms, setIsFetching} from "../reducers/manufacturerFirmTableReducer";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getFirms = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const firms = await axios.get(API_URL + `getManufacturerFirm?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setFirms(firms.data))
    }
}

export const deleteFirm = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteManufacturerFirm/${id}`)
    const firms = await axios.get(API_URL + `getManufacturerFirm?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    dispatch(setFirms(firms.data))
}

export const getCurrentFirm = async (id, setCountryOfManufacture, setFirm, setEmail, setAddress, setSelectedDate) => {
    const firm = await axios.get(API_URL + `getCurrentManufacturerFirm/${id}`)
    setCountryOfManufacture(firm.data.country_of_manufacture_id)
    setFirm(firm.data.firm_name)
    setEmail(firm.data.email)
    setAddress(firm.data.address)
    setSelectedDate(firm.data.year_open)
    console.log(firm.data)
}

export const updateCurrentFirm = (country_of_manufacture_id, firm_name, email, address, year_open, id) => (dispatch) => {
    // const dateChange = new Date(year_open);
    // const isoDate = dateChange.toISOString();
    // year_open = isoDate.substr(0, 10)
    console.log(year_open)
    dispatch(setIsFetching(true))
    const updatedFirm = axios.put(API_URL + `updateManufacturerFirm/${id}`, {country_of_manufacture_id, firm_name, email, address, year_open, id})
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
    const newFirm = axios.post(API_URL + `createManufacturerFirm`, {country_of_manufacture_id, firm_name, email, address, year_open})
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
