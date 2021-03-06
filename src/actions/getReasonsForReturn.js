import axios from "axios";
import {setIsFetching} from "../reducers/countryOfManufactureTableReducer";
import {SET_MESSAGE} from "./types";
import {
    setCurrentReasonForReturn,
    setPotentialDataToDeleteByReasonForReturn,
    setReasons,
    updateInputReasonForReturn
} from "../reducers/reasonForReturnTablereducer";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getReasons = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const reasons = await axios.get(API_URL + `getReasonForReturn`, {headers: authHeader()});
        dispatch(setReasons(reasons.data))
    }
};

export const createNewReason = (reason_for_return) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newReason = axios.post(API_URL + `createReasonForReturn`, {reason_for_return}, {headers: authHeader()})
    return newReason.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Reason created successful!",
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

export const deleteReasonForReturn = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteReasonForReturn/${id}`, {headers: authHeader()})
    const reasons = await axios.get(API_URL + `getReasonForReturn`, {headers: authHeader()});
    dispatch(setReasons(reasons.data))
}


export const getCurrentReasonForReturn = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const name = await axios.get(API_URL + `getCurrentReasonForReturn/${id}`, {headers: authHeader()});
        dispatch(setCurrentReasonForReturn(name.data.reason_for_return))
    }
};

export const updateCurrentInputReasonForReturn = (input) => {
    return async (dispatch) => {
        dispatch(updateInputReasonForReturn(input))
    }
};

export const updateCurrentReasonForReturn = (reason_for_return, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedReason = axios.put(API_URL + `updateReasonForReturn/${id}`, {reason_for_return}, {headers: authHeader()})
    return updatedReason.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Reason updated successful!",
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

export const getDeleteReasonForReturnInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `deleteReasonForReturnInfo/${id}`, {headers: authHeader()});
    dispatch(setPotentialDataToDeleteByReasonForReturn(info.data))
}