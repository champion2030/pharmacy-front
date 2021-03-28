import axios from "axios";
import {setGroups, setIsFetching} from "../reducers/pharmacologicalGroupTableReducer";
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
        (response) => {
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

};
