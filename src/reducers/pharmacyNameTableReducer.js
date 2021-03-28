import {SET_IS_FETCHING, SET_NAMES} from "../actions/types";

const defaultState = {
    names: [],
    isFetching: true
}

export default function pharmacyNameReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_NAMES:
            return {
                ...state,
                names: action.payload,
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

export const setNames = (names) => ({type: SET_NAMES, payload: names})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
