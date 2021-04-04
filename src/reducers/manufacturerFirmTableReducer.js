import {SET_CURRENT_PAGE, SET_FIRMS, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    manufacturerFirms: [],
    totalCount: 0,
    currentPage: 1,
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

export const setFirms = (manufacturerFirms) => ({type: SET_FIRMS, payload: manufacturerFirms})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page})