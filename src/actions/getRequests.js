import axios from "axios";
import {setMedicineByArea, setMedicineByPharmacy, setSecondRequest, setThirdRequest} from "../reducers/requestTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getMedicineByPharmacy = (pharmacy_id) => {
    return async (dispatch) => {
        const requestResult = await axios.post(API_URL + `firstRequestPartOne`, {pharmacy_id});
        dispatch(setMedicineByPharmacy(requestResult.data))
    }
};

export const getMedicineByArea = (area_id) => {
    return async (dispatch) => {
        const requestResult = await axios.post(API_URL + `firstRequestPartTwo`, {area_id});
        dispatch(setMedicineByArea(requestResult.data))
    }
};

export const getSecondRequest = (currentPage, perPage) => {
    return async (dispatch) => {
        const requestResult = await axios.get(API_URL + `secondRequest?page=${currentPage}&limit=${perPage}`);
        dispatch(setSecondRequest(requestResult.data))
    }
};

export const getThirdRequest = (currentPage, perPage) => {
    return async (dispatch) => {
        const requestResult = await axios.get(API_URL + `thirdRequest?page=${currentPage}&limit=${perPage}`);
        dispatch(setThirdRequest(requestResult.data))
    }
};