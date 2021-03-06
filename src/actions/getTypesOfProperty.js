import axios from "axios";
import {
    setCurrentTypeOfProperty,
    setIsFetching,
    setPotentialDataToDeleteByTypeOfProperty,
    updateInputTypeOfProperty
} from "../reducers/typeOfPropertyTableReducer";
import {SET_MESSAGE} from "./types";
import {setTypes} from "../reducers/typeOfPropertyTableReducer";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getTypes = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const types = await axios.get(API_URL + `getTypeOfProperty`, {headers: authHeader()});
        dispatch(setTypes(types.data))
    }
};

export const createNewType = (name_of_property) => (dispatch) => {
    dispatch(setIsFetching(true))
    const type = axios.post(API_URL + `createTypeOfProperty`, {name_of_property}, {headers: authHeader()})
    return type.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Type created successful!",
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

export const deleteTypeOfProperty = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteTypeOfProperty/${id}`, {headers: authHeader()})
    const types = await axios.get(API_URL + `getTypeOfProperty`, {headers: authHeader()});
    dispatch(setTypes(types.data))
}

export const getCurrentTypeOfProperty = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const name = await axios.get(API_URL + `getCurrentTypeOfProperty/${id}`, {headers: authHeader()});
        dispatch(setCurrentTypeOfProperty(name.data.name_of_property))
    }
};

export const updateCurrentInputTypeOfProperty = (input) => {
    return async (dispatch) => {
        dispatch(updateInputTypeOfProperty(input))
    }
};

export const updateCurrentTypeOfProperty = (name_of_property, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedType = axios.put(API_URL + `updateTypeOfProperty/${id}`, {name_of_property}, {headers: authHeader()})
    return updatedType.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Type updated successful!",
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

export const getDeleteTypeOfPropertyInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `deleteTypeOfPropertyInfo/${id}`, {headers: authHeader()});
    dispatch(setPotentialDataToDeleteByTypeOfProperty(info.data))
}
