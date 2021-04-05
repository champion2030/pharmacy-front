import axios from "axios";
import {setPharmacies, setIsFetching} from "../reducers/pharmacyTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getPharmacies = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const pharmacies = await axios.get(API_URL + `getPharmacy?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setPharmacies(pharmacies.data))
    }
}

export const deletePharmacy = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deletePharmacy/${id}`)
    const pharmacies = await axios.get(API_URL + `getPharmacy?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    dispatch(setPharmacies(pharmacies.data))
}
