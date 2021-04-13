import axios from "axios";
import {
    setCurrentPageDelivers,
    setDeliveries,
    setDeliversForCurrentPharmacy,
    setIsFetching
} from "../reducers/deliveriesTableReducer";
import {SET_MESSAGE} from "./types";

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

export const deleteDeliver = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteDeliver/${id}`)
    const deliveries = await axios.get(API_URL + `getDeliveries?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    if (currentPage > deliveries.data.totalPages && deliveries.data.totalPages !== 0){
        dispatch(setCurrentPageDelivers(deliveries.data.totalPages))
    }
    else if (deliveries.data.totalPages === 0){
        dispatch(setCurrentPageDelivers(1))
    }
    dispatch(setDeliveries(deliveries.data))
}

export const getCurrentDeliver = async (id, setMedicineId, setMedicineName, setEmployeeId, setEmployeeFullName, setCauseId, setCause, setReceiptDate, setNumberOfPackages, setPresentOfDefect, setSupplierPrice, setPharmacyPrice, setExpiryStartDate, setExpirationDate, setBatchNumber) => {
    const deliver = await axios.get(API_URL + `getCurrentDeliver/${id}`)
    setMedicineId(deliver.data.medicine_id)
    setMedicineName(deliver.data.medicine_name)
    setEmployeeId(deliver.data.employee_id)
    setEmployeeFullName(deliver.data.employee_full_name)
    setCauseId(deliver.data.cause_id)
    setCause(deliver.data.reason_for_return)
    setReceiptDate(deliver.data.receipt_date)
    setNumberOfPackages(deliver.data.number_of_packages)
    setPresentOfDefect(deliver.data.presence_of_defect)
    setSupplierPrice(deliver.data.supplier_price)
    setPharmacyPrice(deliver.data.pharmacy_price)
    setExpiryStartDate(deliver.data.expiry_start_date)
    setExpirationDate(deliver.data.expiration_date)
    setBatchNumber(deliver.data.batch_number)
}

export const updateCurrentDeliver = (medicine_id, employee_id, cause_id, receipt_date, number_of_packages, presence_of_defect, supplier_price, pharmacy_price, expiry_start_date, expiration_date, id) => (dispatch) => {
    dispatch(setIsFetching(true))
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
    })
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
    dispatch(setIsFetching(true))
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
    })
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
        console.log(1)
        dispatch(setIsFetching(true))
        const deliveries = await axios.get(API_URL + `getDeliveriesForCurrentPharmacy/${id}?page=${currentPage}&limit=${perPage}`);
        dispatch(setDeliversForCurrentPharmacy(deliveries.data))
    }
}

