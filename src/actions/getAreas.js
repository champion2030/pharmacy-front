import axios from "axios";
import {setIsFetching} from "../reducers/countryOfManufactureTableReducer";
import {SET_MESSAGE} from "./types";
import {setAreas} from "../reducers/areaTableReducer";

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
