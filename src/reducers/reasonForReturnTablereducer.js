import {SET_IS_FETCHING, SET_REASONS} from "../actions/types";

const defaultState = {
    reasons: [],
    isFetching: true
}

export default function reasonForReturnReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_REASONS:
            return {
                ...state,
                reasons: action.payload,
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

export const setReasons = (reasons) => ({type: SET_REASONS, payload: reasons})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
