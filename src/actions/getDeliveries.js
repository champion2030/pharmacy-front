import axios from "axios";
import {setCurrentPage, setDeliveries, setIsFetching} from "../reducers/deliveriesTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getDeliveries = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const deliveries = await axios.get(API_URL + `getDeliveries?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setDeliveries(deliveries.data))
    }
}

export const deleteDeliver = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteDeliver/${id}`)
}
