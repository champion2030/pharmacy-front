import axios from "axios";
import {
    setCurrentFormOfIssue,
    setForms,
    setIsFetching, setPotentialDataToDeleteByFormOfIssue,
    updateInputFormOfIssue
} from "../reducers/formOfIssueTableReducer";
import {SET_MESSAGE} from "./types";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getForms = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const forms = await axios.get(API_URL + `getFormOfIssue`, {headers: authHeader()});
        dispatch(setForms(forms.data))
    }
};

export const createNewForm = (form_of_issue) => (dispatch) => {
    dispatch(setIsFetching(true))
    const form = axios.post(API_URL + `createFormOfIssue`, {form_of_issue}, {headers: authHeader()})
    return form.then(
        () => {
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

export const deleteFormOfIssue = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteFormOfIssue/${id}`, {headers: authHeader()})
    const forms = await axios.get(API_URL + `getFormOfIssue`, {headers: authHeader()});
    dispatch(setForms(forms.data))
}

export const getCurrentFormOfIssue = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const form = await axios.get(API_URL + `getCurrentFormOfIssue/${id}`, {headers: authHeader()});
        dispatch(setCurrentFormOfIssue(form.data.form_of_issue))
    }
};

export const updateCurrentInputFormOfIssue = (input) => {
    return async (dispatch) => {
        dispatch(updateInputFormOfIssue(input))
    }
};

export const updateCurrentFormOfIssue = (form_of_issue, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedForm = axios.put(API_URL + `updateFormOfIssue/${id}`, {form_of_issue}, {headers: authHeader()})
    return updatedForm.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Form updated successful!",
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

export const getDeleteFormOfIssueInfo = (id) => async (dispatch) => {
    const info = await axios.get(API_URL + `getDeleteFormOfIssueInfo/${id}`, {headers: authHeader()});
    dispatch(setPotentialDataToDeleteByFormOfIssue(info.data))
}