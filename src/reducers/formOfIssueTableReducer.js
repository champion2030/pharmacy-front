import {SET_FORMS, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    forms: [],
    isFetching: true
}

export default function formOfIssueReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FORMS:
            return {
                ...state,
                forms: action.payload,
                isFetching: false
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export const setForms = (forms) => ({type: SET_FORMS, payload: forms})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
