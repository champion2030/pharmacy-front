import axios from "axios";
import {setCurrentPharmacologicalGroup, setGroups,
    setPotentialDataToDeleteByPharmacologicalGroup,
    updateInputPharmacologicalGroup
} from "../reducers/pharmacologicalGroupTableReducer";
import {SET_MESSAGE} from "./types";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getGroups = () => {
    return async (dispatch) => {
        const groups = await axios.get(API_URL + `getPharmacologicalGroup`, {headers: authHeader()});
        dispatch(setGroups(groups.data))
    }
};

export const createNewGroup = (pharmacological_group) => (dispatch) => {
    const group = axios.post(API_URL + `createPharmacologicalGroup`, {pharmacological_group}, {headers: authHeader()})
    return group.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Group created successful!",
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

export const deletePharmacologicalGroup = (id) => async (dispatch) => {
    await axios.delete(API_URL + `deletePharmacologicalGroup/${id}`, {headers: authHeader()})
    const groups = await axios.get(API_URL + `getPharmacologicalGroup`, {headers: authHeader()});
    dispatch(setGroups(groups.data))
}

export const getCurrentPharmacologicalGroup = (id) => {
    return async (dispatch) => {
        const form = await axios.get(API_URL + `getCurrentPharmacologicalGroup/${id}`, {headers: authHeader()});
        dispatch(setCurrentPharmacologicalGroup(form.data.pharmacological_group))
    }
};

export const updateCurrentInputPharmacologicalGroup = (input) => {
    return async (dispatch) => {
        dispatch(updateInputPharmacologicalGroup(input))
    }
};

export const updateCurrentPharmacologicalGroup = (pharmacological_group, id) => (dispatch) => {
    const updatedGroup = axios.put(API_URL + `updatePharmacologicalGroup/${id}`, {pharmacological_group}, {headers: authHeader()})
    return updatedGroup.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Group updated successful!",
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

export const getDeletePharmacologicalGroupInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `getDeletePharmacologicalGroupInfo/${id}`, {headers: authHeader()});
    dispatch(setPotentialDataToDeleteByPharmacologicalGroup(info.data))
}