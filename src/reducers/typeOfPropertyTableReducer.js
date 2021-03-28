import {SET_IS_FETCHING, SET_TYPES} from "../actions/types";

const defaultState = {
    types: [],
    isFetching: true
}

export default function typesOfPropertyReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TYPES:
            return {
                ...state,
                types: action.payload,
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

export const setTypes = (types) => ({type: SET_TYPES, payload: types})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
