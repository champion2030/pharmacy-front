import axios from "axios";
import {setPharmacies, setIsFetching, setAllPharmacies} from "../reducers/pharmacyTableReducer";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getPharmacies = (searchQuery, currentPage, perPage) => {
    if (searchQuery === 1) {
        searchQuery = "default"
    }
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const pharmacies = await axios.get(API_URL + `getPharmacy?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
        dispatch(setPharmacies(pharmacies.data))
    }
}

export const getAllPharmacies = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const pharmacies = await axios.get(API_URL + `getAllPharmacy`);
        dispatch(setAllPharmacies(pharmacies.data))
    }
}

export const deletePharmacy = (id, searchQuery, currentPage, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deletePharmacy/${id}`)
    const pharmacies = await axios.get(API_URL + `getPharmacy?searchQuery=${searchQuery}&page=${currentPage}&limit=${perPage}`);
    dispatch(setPharmacies(pharmacies.data))
}

export const getCurrentPharmacy = async (id, setPharmacyNameId, setPharmacyName, setAreaId, setArea, setTypeOfPropertyId, setTypeOfProperty, setTelephone, setAddress) => {
    const pharmacy = await axios.get(API_URL + `getCurrentPharmacy/${id}`)
    setPharmacyNameId(pharmacy.data.name_id)
    setPharmacyName(pharmacy.data.name)
    setAreaId(pharmacy.data.area_id)
    setArea(pharmacy.data.name_of_area)
    setTypeOfPropertyId(pharmacy.data.type_of_property_id)
    setTypeOfProperty(pharmacy.data.name_of_property)
    setTelephone(pharmacy.data.telephone)
    setAddress(pharmacy.data.address)
}

export const updateCurrentPharmacy = (name_id, area_id, type_of_property_id, telephone, address, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedPharmacy = axios.put(API_URL + `updatePharmacy/${id}`, {
        name_id,
        area_id,
        type_of_property_id,
        telephone,
        address
    })
    return updatedPharmacy.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Pharmacy updated successful!",
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

export const createNewPharmacy = (name_id, area_id, type_of_property_id, telephone, address) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newPharmacy = axios.post(API_URL + `createPharmacy`, {
        name_id,
        area_id,
        type_of_property_id,
        telephone,
        address
    })
    return newPharmacy.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Pharmacy created successful!",
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
