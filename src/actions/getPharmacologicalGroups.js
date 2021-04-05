import axios from "axios";
import {
    setCurrentPharmacologicalGroup,
    setGroups,
    setIsFetching,
    updateInputPharmacologicalGroup
} from "../reducers/pharmacologicalGroupTableReducer";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getGroups = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const groups = await axios.get(API_URL + `getPharmacologicalGroup`);
        dispatch(setGroups(groups.data))
    }
};

export const createNewGroup = (pharmacological_group) => (dispatch) => {
    dispatch(setIsFetching(true))
    const group = axios.post(API_URL + `createPharmacologicalGroup`, {pharmacological_group})
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
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deletePharmacologicalGroup/${id}`)
    const groups = await axios.get(API_URL + `getPharmacologicalGroup`);
    dispatch(setGroups(groups.data))
}

export const getCurrentPharmacologicalGroup = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const form = await axios.get(API_URL + `getCurrentPharmacologicalGroup/${id}`);
        dispatch(setCurrentPharmacologicalGroup(form.data.pharmacological_group))
    }
};

export const updateCurrentInputPharmacologicalGroup = (input) => {
    return async (dispatch) => {
        dispatch(updateInputPharmacologicalGroup(input))
    }
};

export const updateCurrentPharmacologicalGroup = (pharmacological_group, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedGroup = axios.put(API_URL + `updatePharmacologicalGroup/${id}`, {pharmacological_group})
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
};