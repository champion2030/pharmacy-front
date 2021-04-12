import {SET_ALL_FIRMS, SET_CURRENT_PAGE_FIRM, SET_FIRMS, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    manufacturerFirms: [],
    allManufacturerFirms: [],
    totalCount: 0,
    currentPageFirm: 1,
    isFetching: true
}

export default function manufacturerFirmReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FIRMS:
            return {
                ...state,
                manufacturerFirms: action.payload.manufacturerFirms,
                totalCount: action.payload.totalCount,
                isFetching: false
            }
        case SET_ALL_FIRMS:
            return {
                ...state,
                allManufacturerFirms: action.payload,
                isFetching: false
            }
        case SET_CURRENT_PAGE_FIRM:
            return {
                ...state,
                currentPageFirm: action.payload
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

export const setFirms = (manufacturerFirms) => ({type: SET_FIRMS, payload: manufacturerFirms})
export const setAllFirms = (allManufacturerFirms) => ({type: SET_ALL_FIRMS, payload: allManufacturerFirms})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPageFirm = (page) => ({type: SET_CURRENT_PAGE_FIRM, payload: page})
