import {SET_CURRENT_PAGE, SET_IS_FETCHING, SET_PHARMACIES} from "../actions/types";

const defaultState = {
    pharmacies: [],
    totalCount: 0,
    currentPage: 1,
    isFetching: true
}

export default function pharmacyReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PHARMACIES:
            return {
                ...state,
                pharmacies: action.payload.pharmacies,
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

export const setPharmacies = (pharmacies) => ({type: SET_PHARMACIES, payload: pharmacies})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page})