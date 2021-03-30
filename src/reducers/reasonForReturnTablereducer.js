import {SET_CURRENT_REASON_FOR_RETURN, SET_IS_FETCHING, SET_REASONS, UPDATE_INPUT_REASON_FOR_RETURN} from "../actions/types";

const defaultState = {
    reasons: [],
    isFetching: true,
    reason_for_return: ""
}

export default function reasonForReturnReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_REASONS:
            return {
                ...state,
                reasons: action.payload,
                isFetching: false
            }
        case SET_CURRENT_REASON_FOR_RETURN:
            return {
                ...state,
                reason_for_return: action.payload
            }
        case UPDATE_INPUT_REASON_FOR_RETURN:
            return {
                ...state,
                reason_for_return: action.payload
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
export const setCurrentReasonForReturn = (reason_for_return) => ({type: SET_CURRENT_REASON_FOR_RETURN, payload: reason_for_return})
export const updateInputReasonForReturn = (input) => ({type: UPDATE_INPUT_REASON_FOR_RETURN, payload: input})
