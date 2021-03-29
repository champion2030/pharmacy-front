import axios from "axios";
import {setIsFetching} from "../reducers/countryOfManufactureTableReducer";
import {SET_MESSAGE} from "./types";
import {setAreas, setCurrentArea, updateInput} from "../reducers/areaTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getAreas = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const areas = await axios.get(API_URL + `getArea`);
        dispatch(setAreas(areas.data))
    }
};

export const createNewArea = (name_of_area) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newArea = axios.post(API_URL + `createArea`, {name_of_area})
    return newArea.then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Area created successful!",
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

export const deleteArea = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteArea/${id}`)
}

export const getCurrentArea = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const area = await axios.get(API_URL + `getCurrentArea/${id}`);
        dispatch(setCurrentArea(area.data.name_of_area))
    }
};

export const updateCurrentInput = (input) => {
    return async (dispatch) => {
        dispatch(updateInput(input))
    }
};

export const updateCurrentArea = (name_of_area, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedArea = axios.put(API_URL + `updateArea/${id}`, {name_of_area})
    return updatedArea.then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Area updated successful!",
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
