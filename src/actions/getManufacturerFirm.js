import axios from "axios";
import {setFirms, setIsFetching} from "../reducers/manufacturerFirmTableReducer";

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
