import axios from "axios";
import {setIsFetching} from "../reducers/pharmacyNameTableReducer";
import {SET_MESSAGE} from "./types";
import {setNames} from "../reducers/pharmacyNameTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getNames = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const names = await axios.get(API_URL + `getPharmacyName`);
        dispatch(setNames(names.data))
    }
};

export const createNewName = (name) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newName = axios.post(API_URL + `createPharmacyName`, {name})
    return newName.then(
        (response) => {
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

};
