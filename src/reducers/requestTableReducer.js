import {
    SET_CURRENT_PAGE_SECOND_REQUEST, SET_CURRENT_PAGE_THIRD_REQUEST,
    SET_MEDICINE_BY_AREA,
    SET_MEDICINE_BY_PHARMACY,
    SET_SECOND_REQUEST,
    SET_THIRD_REQUEST
} from "../actions/types";

const defaultState = {
    medicineByPharmacy: [],
    medicineByArea: [],

    pharmaciesInEachArea: [],
    currentPageSecondRequest: 1,
    totalCountSecondRequest: 0,

    thirdRequest: [],
    currentPageThirdRequest: 1,
    totalCountThirdRequest: 0
}

export default function requestsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MEDICINE_BY_PHARMACY:
            return {
                ...state,
                medicineByPharmacy: action.payload,
            }
        case SET_MEDICINE_BY_AREA:
            return {
                ...state,
                medicineByArea: action.payload,
            }
        case SET_SECOND_REQUEST:
            return {
                ...state,
                pharmaciesInEachArea: action.payload.requestResult,
                totalCountSecondRequest: action.payload.totalCount
            }
        case SET_CURRENT_PAGE_SECOND_REQUEST:
            return {
                ...state,
                currentPageSecondRequest: action.payload
            }
        case SET_THIRD_REQUEST:
            return {
                ...state,
                thirdRequest: action.payload.requestResult,
                totalCountThirdRequest: action.payload.totalCount
            }
        case SET_CURRENT_PAGE_THIRD_REQUEST:
            return {
                ...state,
                currentPageThirdRequest: action.payload
            }
        default:
            return state
    }
}

export const setMedicineByPharmacy = (medicineByPharmacy) => ({type: SET_MEDICINE_BY_PHARMACY, payload: medicineByPharmacy})
export const setMedicineByArea = (medicineByArea) => ({type: SET_MEDICINE_BY_AREA, payload: medicineByArea})
export const setSecondRequest = (secondRequest) => ({type: SET_SECOND_REQUEST, payload: secondRequest})
export const setCurrentPageSecondRequest = (currentPageSecondRequest) => ({type: SET_CURRENT_PAGE_SECOND_REQUEST, payload: currentPageSecondRequest})
export const setThirdRequest = (thirdRequest) => ({type: SET_THIRD_REQUEST, payload: thirdRequest})
export const setCurrentPageThirdRequest = (currentPageThirdRequest) => ({type: SET_CURRENT_PAGE_THIRD_REQUEST, payload: currentPageThirdRequest})