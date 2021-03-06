import axios from "axios";
import {
    setCurrentPharmacyName,
    setIsFetching,
    setPotentialDataToDeleteByPharmacyName,
    updateInputPharmacyName
} from "../reducers/pharmacyNameTableReducer";
import {SET_MESSAGE} from "./types";
import {setNames} from "../reducers/pharmacyNameTableReducer";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getNames = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const names = await axios.get(API_URL + `getPharmacyName`, {headers: authHeader()});
        dispatch(setNames(names.data))
    }
};

export const createNewName = (name) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newName = axios.post(API_URL + `createPharmacyName`, {name}, {headers: authHeader()})
    return newName.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Name created successful!",
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

export const deletePharmacyName = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deletePharmacyName/${id}`, {headers: authHeader()})
    const names = await axios.get(API_URL + `getPharmacyName`, {headers: authHeader()});
    dispatch(setNames(names.data))
}

export const getCurrentPharmacyName = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const name = await axios.get(API_URL + `getCurrentPharmacyName/${id}`, {headers: authHeader()});
        dispatch(setCurrentPharmacyName(name.data.name))
    }
};

export const updateCurrentInputPharmacyName = (input) => {
    return async (dispatch) => {
        dispatch(updateInputPharmacyName(input))
    }
};

export const updateCurrentPharmacyName = (name, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedName = axios.put(API_URL + `updatePharmacyName/${id}`, {name}, {headers: authHeader()})
    return updatedName.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Name updated successful!",
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

export const getDeletePharmacyNameInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `deletePharmacyNameInfo/${id}`, {headers: authHeader()});
    dispatch(setPotentialDataToDeleteByPharmacyName(info.data))
}
