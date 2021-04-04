import {SET_CURRENT_PAGE, SET_IS_FETCHING, SET_MEDICINE} from "../actions/types";

const defaultState = {
    medicines: [],
    totalCount: 0,
    currentPage: 1,
    isFetching: true
}

export default function medicineReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MEDICINE:
            return {
                ...state,
                medicines: action.payload.medicines,
                totalCount: action.payload.totalCount,
                isFetching: false
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
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

export const setMedicine = (medicines) => ({type: SET_MEDICINE, payload: medicines})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page})