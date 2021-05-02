import axios from "axios";
import {
    setCurrentDeliver,
    setCurrentPageDelivers,
    setDeliveries,
    setDeliversForCurrentPharmacy,
    setIsFetchingDeliveries
} from "../reducers/deliveriesTableReducer";
import {SET_MESSAGE} from "./types";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getDeliveries = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1) {
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetchingDeliveries(true))
        const deliveries = await axios.get(API_URL + `getDeliveries?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
        dispatch(setDeliveries(deliveries.data))
    }
}

export const deleteDeliver = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingDeliveries(true))
    await axios.delete(API_URL + `deleteDeliver/${id}`, {headers: authHeader()})
    const deliveries = await axios.get(API_URL + `getDeliveries?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
    if (currentPage > deliveries.data.totalPages && deliveries.data.totalPages !== 0) {
        dispatch(setCurrentPageDelivers(deliveries.data.totalPages))
    } else if (deliveries.data.totalPages === 0) {
        dispatch(setCurrentPageDelivers(1))
    }
    dispatch(setDeliveries(deliveries.data))
}

export const getCurrentDeliver = (id) => {
    return (dispatch) => {
        dispatch(setIsFetchingDeliveries(true))
        return axios
            .get(API_URL + `getCurrentDeliver/${id}`, {headers: authHeader()})
            .then(result => {
                dispatch(setCurrentDeliver(result.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateCurrentDeliver = (medicine_id, employee_id, cause_id, receipt_date, number_of_packages, presence_of_defect, supplier_price, pharmacy_price, expiry_start_date, expiration_date, id) => (dispatch) => {
    const updatedDeliver = axios.put(API_URL + `updateDeliver/${id}`, {
        medicine_id,
        employee_id,
        cause_id,
        receipt_date,
        number_of_packages,
        presence_of_defect,
        supplier_price,
        pharmacy_price,
        expiry_start_date,
        expiration_date
    }, {headers: authHeader()})
    return updatedDeliver.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Deliver updated successful!",
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

export const createNewDeliver = (medicine_id, employee_id, cause_id, receipt_date, number_of_packages, presence_of_defect, supplier_price, pharmacy_price, expiry_start_date, expiration_date) => (dispatch) => {
    const newDeliver = axios.post(API_URL + `createDeliver`, {
        medicine_id,
        employee_id,
        cause_id,
        receipt_date,
        number_of_packages,
        presence_of_defect,
        supplier_price,
        pharmacy_price,
        expiry_start_date,
        expiration_date
    }, {headers: authHeader()})
    return newDeliver.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Deliver created successful!",
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

export const getDeliversForCurrentPharmacy = (id, currentPage, perPage) => {
    return async (dispatch) => {
        dispatch(setIsFetchingDeliveries(true))
        const deliveries = await axios.get(API_URL + `getDeliveriesForCurrentPharmacy/${id}?page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
        dispatch(setDeliversForCurrentPharmacy(deliveries.data))
    }
}

export const deleteGroupOfDelivers = (deliversId, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetchingDeliveries(true))
    await axios.delete(API_URL + `deleteGroupOfDelivers`, {data: {deliversId: deliversId}, headers: authHeader()})
    const deliveries = await axios.get(API_URL + `getDeliveries?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`, {headers: authHeader()});
    if (currentPage > deliveries.data.totalPages && deliveries.data.totalPages !== 0) {
        dispatch(setCurrentPageDelivers(deliveries.data.totalPages))
    } else if (deliveries.data.totalPages === 0) {
        dispatch(setCurrentPageDelivers(1))
    }
    dispatch(setDeliveries(deliveries.data))
}