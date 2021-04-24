import {
    SET_CURRENT_PAGE_DATE_FIRST_REQUEST, SET_CURRENT_PAGE_DATE_SECOND_REQUEST,
    SET_CURRENT_PAGE_SECOND_REQUEST,
    SET_CURRENT_PAGE_THIRD_REQUEST,
    SET_DATE_FIRST_REQUEST,
    SET_DATE_SECOND_REQUEST,
    SET_IS_FETCHING_DATE_FIRST_REQUEST,
    SET_IS_FETCHING_DATE_SECOND_REQUEST,
    SET_IS_FETCHING_REQUEST,
    SET_MEDICINE_BY_PHARMACY,
    SET_MEDICINE_BY_TOWN,
    SET_SECOND_REQUEST_FIRST_PART,
    SET_SECOND_REQUEST_SECOND_PART,
    SET_THIRD_REQUEST
} from "../actions/types";

const defaultState = {
    medicineByPharmacy: [],
    medicineByTown: [],

    pharmaciesInEachArea: [],
    currentPageSecondRequest: 1,
    totalCountSecondRequest: 0,

    secondRequestSecondPart: [],

    thirdRequest: [],
    currentPageThirdRequest: 1,
    totalCountThirdRequest: 0,
    isFetchingRequest: true,

    dateFirstRequest: [],
    currentPageDateFirstRequest: 1,
    totalCountDateFirstRequest: 0,
    isFetchingDateFirstRequest: true,

    dateSecondRequest: [],
    currentPageDateSecondRequest: 1,
    totalCountDateSecondRequest: 0,
    isFetchingDateSecondRequest: true,

}

export default function requestsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MEDICINE_BY_PHARMACY:
            return {
                ...state,
                medicineByPharmacy: action.payload,
            }
        case SET_MEDICINE_BY_TOWN:
            return {
                ...state,
                medicineByTown: action.payload,
            }
        case SET_SECOND_REQUEST_FIRST_PART:
            return {
                ...state,
                pharmaciesInEachArea: action.payload.requestResult,
                totalCountSecondRequest: action.payload.totalCount
            }
        case SET_SECOND_REQUEST_SECOND_PART:
            return {
                ...state,
                secondRequestSecondPart: action.payload,
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
                totalCountThirdRequest: action.payload.totalCount,
                isFetchingRequest: false
            }
        case SET_CURRENT_PAGE_THIRD_REQUEST:
            return {
                ...state,
                currentPageThirdRequest: action.payload
            }
        case SET_IS_FETCHING_REQUEST:
            return {
                ...state,
                isFetchingRequest: action.payload
            }
        case SET_DATE_FIRST_REQUEST:
            return {
                ...state,
                dateFirstRequest: action.payload.requestResult,
                totalCountDateFirstRequest: action.payload.totalCount,
                isFetchingDateFirstRequest: false
            }
        case SET_IS_FETCHING_DATE_FIRST_REQUEST:
            return {
                ...state,
                isFetchingDateFirstRequest: action.payload
            }
        case SET_CURRENT_PAGE_DATE_FIRST_REQUEST:
            return {
                ...state,
                currentPageDateFirstRequest: action.payload
            }
        case SET_DATE_SECOND_REQUEST:
            return {
                ...state,
                dateSecondRequest: action.payload.requestResult,
                totalCountDateSecondRequest: action.payload.totalCount,
                isFetchingDateSecondRequest: false
            }
        case SET_IS_FETCHING_DATE_SECOND_REQUEST:
            return {
                ...state,
                isFetchingDateSecondRequest: action.payload
            }
        case SET_CURRENT_PAGE_DATE_SECOND_REQUEST:
            return {
                ...state,
                currentPageDateSecondRequest: action.payload
            }
        default:
            return state
    }
}

export const setMedicineByPharmacy = (medicineByPharmacy) => ({type: SET_MEDICINE_BY_PHARMACY, payload: medicineByPharmacy})
export const setMedicineByTown = (medicineByTown) => ({type: SET_MEDICINE_BY_TOWN, payload: medicineByTown})
export const setSecondRequestFirstPart = (secondRequestFirstPart) => ({type: SET_SECOND_REQUEST_FIRST_PART, payload: secondRequestFirstPart})
export const setSecondRequestSecondPart = (secondRequestSecondPart) => ({type: SET_SECOND_REQUEST_SECOND_PART, payload: secondRequestSecondPart})
export const setCurrentPageSecondRequest = (currentPageSecondRequest) => ({type: SET_CURRENT_PAGE_SECOND_REQUEST, payload: currentPageSecondRequest})
export const setThirdRequest = (thirdRequest) => ({type: SET_THIRD_REQUEST, payload: thirdRequest})
export const setCurrentPageThirdRequest = (currentPageThirdRequest) => ({type: SET_CURRENT_PAGE_THIRD_REQUEST, payload: currentPageThirdRequest})
export const setIsFetchingRequest = (bool) => ({type: SET_IS_FETCHING_REQUEST, payload: bool})

export const setDateFirstRequest = (dateFirstRequest) => ({type: SET_DATE_FIRST_REQUEST, payload: dateFirstRequest})
export const setIsFetchingDateFirstRequest = (bool) => ({type: SET_IS_FETCHING_DATE_FIRST_REQUEST, payload: bool})
export const setCurrentPageDateFirstRequest = (currentPageDateFirstRequest) => ({type: SET_CURRENT_PAGE_DATE_FIRST_REQUEST, payload: currentPageDateFirstRequest})

export const setDateSecondRequest = (dateSecondRequest) => ({type: SET_DATE_SECOND_REQUEST, payload: dateSecondRequest})
export const setIsFetchingDateSecondRequest = (bool) => ({type: SET_IS_FETCHING_DATE_SECOND_REQUEST, payload: bool})
export const setCurrentPageDateSecondRequest = (currentPageDateSecondRequest) => ({type: SET_CURRENT_PAGE_DATE_SECOND_REQUEST, payload: currentPageDateSecondRequest})