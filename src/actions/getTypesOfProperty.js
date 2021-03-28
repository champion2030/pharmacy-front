import axios from "axios";
import {setIsFetching} from "../reducers/typeOfPropertyTableReducer";
import {SET_MESSAGE} from "./types";
import {setTypes} from "../reducers/typeOfPropertyTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getTypes = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const types = await axios.get(API_URL + `getTypeOfProperty`);
        dispatch(setTypes(types.data))
    }
};

export const createNewType = (name_of_property) => (dispatch) => {
    dispatch(setIsFetching(true))
    const type = axios.post(API_URL + `createTypeOfProperty`, {name_of_property})
    return type.then(
        (response) => {
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

};
