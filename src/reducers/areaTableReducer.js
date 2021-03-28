import {SET_AREAS, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    areas: [],
    isFetching: true
}

export default function areaReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_AREAS:
            return {
                ...state,
                areas: action.payload,
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

export const setAreas = (areas) => ({type: SET_AREAS, payload: areas})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
