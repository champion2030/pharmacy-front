import {
    GET_POTENTIAL_DATA_TO_DELETE_BY_PHARMACY,
    SET_ALL_PHARMACIES,
    SET_CURRENT_PAGE_PHARMACY,
    SET_IS_FETCHING_PHARMACY,
    SET_PHARMACIES
} from "../actions/types";

const defaultState = {
    pharmacies: [],
    allPharmacies: [],
    totalCount: 0,
    currentPagePharmacy: 1,
    isFetchingPharmacy: true,
    potentialDataToDeleteByPharmacy: {
        employee: 0,
        deliveries: 0
    }
}

export default function pharmacyReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PHARMACIES:
            return {
                ...state,
                pharmacies: action.payload.pharmacies,
                totalCount: action.payload.totalCount,
                isFetchingPharmacy: false
            }
        case SET_ALL_PHARMACIES:
            return {
                ...state,
                allPharmacies: action.payload,
            }
        case SET_CURRENT_PAGE_PHARMACY:
            return {
                ...state,
                currentPagePharmacy: action.payload
            }
        case SET_IS_FETCHING_PHARMACY:
            return {
                ...state,
                isFetchingPharmacy: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_PHARMACY:
            return {
                ...state,
                potentialDataToDeleteByPharmacy: action.payload
            }
        default:
            return state
    }
}

export const setPharmacies = (pharmacies) => ({type: SET_PHARMACIES, payload: pharmacies})
export const setIsFetchingPharmacy = (bool) => ({type: SET_IS_FETCHING_PHARMACY, payload: bool})
export const setCurrentPagePharmacy = (page) => ({type: SET_CURRENT_PAGE_PHARMACY, payload: page})
export const setAllPharmacies = (allPharmacies) => ({type: SET_ALL_PHARMACIES, payload: allPharmacies})
export const setPotentialDataToDeleteByPharmacy = (potentialDataToDeleteByPharmacy) => ({
    type: GET_POTENTIAL_DATA_TO_DELETE_BY_PHARMACY,
    payload: potentialDataToDeleteByPharmacy
})
