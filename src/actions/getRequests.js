import axios from "axios";
import {
    setMedicineByTown,
    setMedicineByPharmacy,
    setSecondRequestFirstPart,
    setThirdRequest,
    setSecondRequestSecondPart,
    setIsFetchingRequest
} from "../reducers/requestTableReducer";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getMedicineByPharmacy = (pharmacy_id) => (dispatch) => {
    const requestResult = axios.post(API_URL + `firstRequestPartOne`, {pharmacy_id})
    return requestResult.then(
        (result) => {
            dispatch(setMedicineByPharmacy(result.data))
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

export const getMedicineByArea = () => {
    return async (dispatch) => {
        const requestResult = await axios.get(API_URL + `firstRequestPartTwo`, );
        dispatch(setMedicineByTown(requestResult.data))
    }
};

export const getSecondRequestFirstPart = (currentPage, perPage) => {
    return async (dispatch) => {
        const requestResult = await axios.get(API_URL + `secondRequestFirstPart?page=${currentPage}&limit=${perPage}`);
        dispatch(setSecondRequestFirstPart(requestResult.data))
    }
}

export const getSecondRequestSecondPart = () => {
    return async (dispatch) => {
        const requestResult = await axios.get(API_URL + `secondRequestSecondPart`);
        dispatch(setSecondRequestSecondPart(requestResult.data))
    }
}

export const getThirdRequest = (searchQuery, currentPage, perPage) => {
    if (searchQuery === ""){
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetchingRequest(true))
        const requestResult = await axios.get(API_URL + `thirdRequest?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setThirdRequest(requestResult.data))
    }
}