import axios from "axios";
import {setIsFetching} from "../reducers/countryOfManufactureTableReducer";
import {SET_MESSAGE} from "./types";
import {setReasons} from "../reducers/reasonForReturnTablereducer";

const API_URL = "http://localhost:8080/api/";

export const getReasons = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const reasons = await axios.get(API_URL + `getReasonForReturn`);
        dispatch(setReasons(reasons.data))
    }
};

export const createNewReason = (reason_for_return) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newReason = axios.post(API_URL + `createReasonForReturn`, {reason_for_return})
    return newReason.then(
        (response) => {
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
    await axios.delete(API_URL + `deleteReasonForReturn/${id}`)
}
