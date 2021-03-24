import axios from "axios";
import {setForms, setIsFetching} from "../reducers/formOfIssueTable";
import {SET_MESSAGE} from "./types";

const API_URL = "http://localhost:8080/api/";

export const getForms = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const forms = await axios.get(API_URL + `getFormOfIssue`);
        dispatch(setForms(forms.data))
    }
};

export const createNewForm = (form_of_issue) => (dispatch) => {
    dispatch(setIsFetching(true))
    const form = axios.post(API_URL + `createFormOfIssue`, {form_of_issue})
    return form.then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Form created successful!",
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
