import {SET_ALL_PHARMACIES, SET_CURRENT_PAGE_PHARMACY, SET_IS_FETCHING, SET_PHARMACIES} from "../actions/types";

const defaultState = {
    pharmacies: [],
    allPharmacies: [],
    totalCount: 0,
    currentPagePharmacy: 1,
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
        case SET_ALL_PHARMACIES:
            return {
                ...state,
                allPharmacies: action.payload,
                isFetching: false
            }
        case SET_CURRENT_PAGE_PHARMACY:
            return {
                ...state,
                currentPagePharmacy: action.payload
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
export const setCurrentPagePharmacy = (page) => ({type: SET_CURRENT_PAGE_PHARMACY, payload: page})
export const setAllPharmacies = (allPharmacies) => ({type: SET_ALL_PHARMACIES, payload: allPharmacies})
