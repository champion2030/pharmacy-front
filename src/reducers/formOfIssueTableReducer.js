import {
    GET_POTENTIAL_DATA_TO_DELETE_BY_FORM_OF_ISSUE,
    SET_CURRENT_FORM,
    SET_FORMS,
    SET_IS_FETCHING,
    UPDATE_INPUT_FORM
} from "../actions/types";

const defaultState = {
    forms: [],
    isFetching: true,
    form_of_issue: "",
    potentialDataToDeleteByFormOfIssue: {
        medicine: 0,
        deliveries: 0
    }
}

export default function formOfIssueReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FORMS:
            return {
                ...state,
                forms: action.payload,
                isFetching: false
            }
        case SET_CURRENT_FORM:
            return {
                ...state,
                form_of_issue: action.payload
            }
        case UPDATE_INPUT_FORM:
            return {
                ...state,
                form_of_issue: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_FORM_OF_ISSUE:
            return {
                ...state,
                potentialDataToDeleteByFormOfIssue: action.payload
            }
        default:
            return state
    }
}

export const setForms = (forms) => ({type: SET_FORMS, payload: forms})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentFormOfIssue = (formOfIssue) => ({type: SET_CURRENT_FORM, payload: formOfIssue})
export const updateInputFormOfIssue = (input) => ({type: UPDATE_INPUT_FORM, payload: input})
export const setPotentialDataToDeleteByFormOfIssue = (potentialDataToDeleteByFormOfIssue) => ({type: GET_POTENTIAL_DATA_TO_DELETE_BY_FORM_OF_ISSUE, payload: potentialDataToDeleteByFormOfIssue})

