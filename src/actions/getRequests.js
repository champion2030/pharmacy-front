import axios from "axios";
import {
    setMedicineByTown,
    setMedicineByPharmacy,
    setSecondRequestFirstPart,
    setThirdRequest,
    setSecondRequestSecondPart,
    setIsFetchingRequest,
    setDateFirstRequest,
    setIsFetchingDateFirstRequest,
    setCurrentPageDateFirstRequest,
    setDateSecondRequest, setIsFetchingDateSecondRequest, setCurrentPageDateSecondRequest
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

export const getDateFistRequest = (date, currentPage, perPage) => {
    return async (dispatch) => {
        dispatch(setIsFetchingDateFirstRequest(true))
        const requestResult = await axios.post(API_URL + `dateFirstRequest?page=${currentPage}&limit=${perPage}`, {date});
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0){
            dispatch(setDateFirstRequest(requestResult.data.totalPages))
        }
        else if (requestResult.data.totalPages === 0){
            dispatch(setCurrentPageDateFirstRequest(1))
        }
        dispatch(setDateFirstRequest(requestResult.data))
    }
}

export const getDateSecondRequest = (date, currentPage, perPage) => {
    return async (dispatch) => {
        dispatch(setIsFetchingDateSecondRequest(true))
        const requestResult = await axios.post(API_URL + `dateSecondRequest?page=${currentPage}&limit=${perPage}`, {date});
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0){
            dispatch(setDateSecondRequest(requestResult.data.totalPages))
        }
        else if (requestResult.data.totalPages === 0){
            dispatch(setCurrentPageDateSecondRequest(1))
        }
        dispatch(setDateSecondRequest(requestResult.data))
    }
}