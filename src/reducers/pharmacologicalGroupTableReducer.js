import {SET_GROUPS, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    groups: [],
    isFetching: true
}

export default function pharmacologicalFormsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_GROUPS:
            return {
                ...state,
                groups: action.payload,
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

export const setGroups = (groups) => ({type: SET_GROUPS, payload: groups})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
