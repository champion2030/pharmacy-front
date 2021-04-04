import axios from "axios";
import {setIsFetching, setMedicine} from "../reducers/medicineTableReducer";

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

export const deleteMedicine = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteMedicine/${id}`)
}
